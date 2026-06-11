// ───────────────────────────────────────────────────────────────────────────
// Amoora contract — SINGLE SOURCE OF TRUTH.
// `buildSections()` returns the contract as ordered, structured sections.
// `renderContractHtml()` renders those sections to branded HTML (signing page).
// The PDF generator (sign-contract) consumes the SAME sections, so the signed
// PDF and the on-screen contract are guaranteed identical.
// ───────────────────────────────────────────────────────────────────────────
import { esc } from "./util.ts";

// Brand tokens (mirror css/style.css).
const C = {
  coral: "#EA7056", coralDark: "#D85B40", coralSoft: "#FBE4DD",
  ink: "#1C1B1A", cream: "#FFF9F6", gray: "#6B6764", grayStrong: "#4A4744",
  border: "#EFE9E5", white: "#FFFFFF",
};
const FONT = "'Poppins','Helvetica Neue',Arial,sans-serif";

// ── Seller (Lynkrr AB) — from the user's spec ──────────────────────────────
export const SELLER = {
  name: "Lynkrr AB",
  orgNr: "559270-8639",
  fskatt: true,
  rep: "Omar Alzokani",
  repRole: "VD",
  email: "info@lynkrr.se",
  phone: "+46 10 185 00 01",
  brand: "Amoora",
  termsUrl: "https://amoora.se/villkor.html",
};

// ── Plans ──────────────────────────────────────────────────────────────────
type Plan = "basic" | "growth" | "premium";

const BASIC_INCLUDES = [
  "Komplett branded ordersystem (egen beställningssida)",
  "Onlinebetalning via Stripe (kort, Apple Pay, Google Pay)",
  "1 st SUNMI V3H-terminal, färdigkonfigurerad",
  "Leverans, avhämtning & dine-in",
  "Egen domän eller subdomän",
  "Menyuppläggning",
  "E-postbekräftelser till dina kunder",
  "Hosting, databas & underhåll",
  "Korrekt momshantering (6 %/12 %)",
  "E-postsupport inom 24h",
];
const GROWTH_ADDED = [
  "Broschyr-design (1 st A5, tryckfärdig)",
  "10 st QR-bordsskyltar",
  "Lanseringskampanj sociala medier (3 inlägg + 3 stories)",
  "Google My Business-optimering",
  "Google Ads-setup (1 kampanj; annonsbudget betalas separat till Google)",
  "Prioriterad support inom 12h",
];
const PREMIUM_ADDED = [
  "Filmdag på plats (1 dag)",
  "10 redigerade branded reels (levereras över 30 dagar)",
  "Månadsvis content-support i 3 mån (1 reel/mån)",
  "Telefonsupport med samma-dag-callback",
];

export const PLANS: Record<Plan, { name: string; price: number; includes: string[]; support: string }> = {
  basic: {
    name: "Amoora Basic",
    price: 24999,
    includes: BASIC_INCLUDES,
    support: "E-postsupport inom 24h.",
  },
  growth: {
    name: "Amoora Growth",
    price: 39999,
    includes: [...BASIC_INCLUDES, ...GROWTH_ADDED],
    support: "E-postsupport inom 24h samt prioriterad support inom 12h.",
  },
  premium: {
    name: "Amoora Premium",
    price: 64999,
    includes: [...BASIC_INCLUDES, ...GROWTH_ADDED, ...PREMIUM_ADDED],
    support: "Prioriterad support inom 12h samt telefonsupport med samma-dag-callback.",
  },
};

// ── Add-ons (the 5 standard tillval) ───────────────────────────────────────
export const ADDONS: Record<string, { label: string; price: number; from?: boolean }> = {
  extra_terminal:     { label: "Extra SUNMI V3H-terminal", price: 3999 },
  hosting_prepaid:    { label: "12 månader hosting förbetalt", price: 5490 },
  custom_integration: { label: "Anpassad integration", price: 9999, from: true },
  menu_migration:     { label: "Menymigrering från befintligt system", price: 4999 },
  training:           { label: "Utbildningssession på plats (2h)", price: 2999 },
};

// Map onboarding-form addon value strings → addon keys (wording differs).
export const ADDON_VALUE_TO_KEY: Record<string, string> = {
  "Extra SUNMI V3H-terminal": "extra_terminal",
  "12 mån hosting förbetalt": "hosting_prepaid",
  "Anpassad integration": "custom_integration",
  "Menymigrering": "menu_migration",
  "Utbildningssession på plats": "training",
};

const MOMS = 0.25;
const kr = (n: number) =>
  new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 2 }).format(Math.round(n * 100) / 100) + " kr";

export const PAYMENT_TERMS_LABEL: Record<string, string> = {
  bankgiro_14: "Betalning via bankgiro med 14 dagars betalningsvillkor.",
  bankgiro_7: "Betalning via bankgiro med 7 dagars betalningsvillkor.",
  klarna_7: "Betalning via Klarna med 7 dagars extra betalningsfrist.",
};

// ── Contract shape (subset of the DB row needed to render) ─────────────────
export interface ContractInput {
  id?: string;
  created_at?: string;
  restaurant_name?: string | null;
  contact_name?: string | null;
  contact_email?: string | null;
  org_nr?: string | null;
  plan: Plan;
  addons?: string[]; // array of addon keys
  installments?: number; // 1 | 2 | 3
  payment_terms?: string;
  monthly_fee_ex_moms?: number;
  admin_fee_per_installment_ex_moms?: number;
}

export interface Totals {
  plan_price_ex: number;
  addons: Array<{ key: string; label: string; price: number; from?: boolean }>;
  addons_total_ex: number;
  setup_ex: number;
  setup_moms: number;
  setup_inc: number;
  monthly_ex: number;
  monthly_moms: number;
  monthly_inc: number;
  installments: number;
  admin_fee_total_ex: number;
  schedule: Array<{ n: number; ex: number; moms: number; inc: number }>;
  total_ex: number;
  total_moms: number;
  total_inc: number;
}

// Compute the full price breakdown. Used by the modal (mirrored in JS), the
// stored `totals` jsonb, the contract render and the PDF — one formula.
export function computeTotals(c: ContractInput): Totals {
  const plan = PLANS[c.plan];
  const addonKeys = c.addons ?? [];
  const addons = addonKeys
    .filter((k) => ADDONS[k])
    .map((k) => ({ key: k, label: ADDONS[k].label, price: ADDONS[k].price, from: ADDONS[k].from }));
  const addons_total_ex = addons.reduce((s, a) => s + a.price, 0);

  const setup_ex = plan.price + addons_total_ex;
  const setup_moms = setup_ex * MOMS;
  const setup_inc = setup_ex + setup_moms;

  const monthly_ex = c.monthly_fee_ex_moms ?? 549;
  const monthly_moms = monthly_ex * MOMS;
  const monthly_inc = monthly_ex + monthly_moms;

  const n = c.installments === 2 || c.installments === 3 ? c.installments : 1;
  const adminFee = n > 1 ? (c.admin_fee_per_installment_ex_moms ?? 1000) : 0;
  const admin_fee_total_ex = adminFee * n;

  const schedule: Totals["schedule"] = [];
  for (let i = 1; i <= n; i++) {
    const ex = setup_ex / n + adminFee;
    schedule.push({ n: i, ex, moms: ex * MOMS, inc: ex * (1 + MOMS) });
  }
  const total_ex = setup_ex + admin_fee_total_ex;
  const total_moms = total_ex * MOMS;
  const total_inc = total_ex + total_moms;

  return {
    plan_price_ex: plan.price, addons, addons_total_ex,
    setup_ex, setup_moms, setup_inc,
    monthly_ex, monthly_moms, monthly_inc,
    installments: n, admin_fee_total_ex, schedule,
    total_ex, total_moms, total_inc,
  };
}

// ── Structured sections (the single source of truth) ───────────────────────
export type Block =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "kv"; rows: Array<[string, string]> };
export interface Section { title: string; blocks: Block[] }

function fmtDate(iso?: string): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return String(iso).slice(0, 10);
}

export function buildSections(c: ContractInput): Section[] {
  const plan = PLANS[c.plan];
  const t = computeTotals(c);
  const date = fmtDate(c.created_at);
  const isMarketing = c.plan === "growth" || c.plan === "premium";

  const sections: Section[] = [];

  // 1. Parties
  sections.push({
    title: "1. Avtalsparter",
    blocks: [
      { type: "p", text: `Detta avtal har ingåtts ${esc(date)} mellan nedanstående parter avseende leverans av beställningssystemet Amoora.` },
      {
        type: "kv",
        rows: [
          ["Leverantör", `${SELLER.name}, org.nr ${SELLER.orgNr}${SELLER.fskatt ? " (godkänd för F-skatt)" : ""}`],
          ["Företrädare", `${SELLER.rep}, ${SELLER.repRole}`],
          ["Kontakt", `${SELLER.email} · ${SELLER.phone}`],
          ["Kund", esc(c.restaurant_name ?? "—")],
          ["Org.nr", esc(c.org_nr ?? "—")],
          ["Kontaktperson", esc(c.contact_name ?? "—")],
          ["E-post", esc(c.contact_email ?? "—")],
        ],
      },
    ],
  });

  // 2. Scope / plan
  const addonLines = t.addons.map((a) => `${a.label} — ${a.from ? "från " : ""}${kr(a.price)} ex moms`);
  const scopeBlocks: Block[] = [
    { type: "p", text: `Kunden har valt <strong>${esc(plan.name)}</strong>. Följande ingår:` },
    { type: "list", items: plan.includes },
  ];
  if (addonLines.length) {
    scopeBlocks.push({ type: "p", text: "Valda tillägg (engångskostnader):" });
    scopeBlocks.push({ type: "list", items: addonLines });
  }
  scopeBlocks.push({
    type: "p",
    text: "Allt som inte uttryckligen anges ovan ingår inte i avtalet och offereras separat. Eventuella ändringar eller tillägg under projektets gång debiteras separat enligt överenskommelse.",
  });
  sections.push({ title: "2. Omfattning och vald plan", blocks: scopeBlocks });

  // 3. Price & payment
  const priceRows: Array<[string, string]> = [
    ["Engångskostnad (uppsättning)", `${kr(t.setup_ex)} ex moms`],
    ["Moms (25 %)", kr(t.setup_moms)],
    ["Engångskostnad inkl. moms", `${kr(t.setup_inc)}`],
    ["Månadsavgift", `${kr(t.monthly_ex)}/mån ex moms (${kr(t.monthly_inc)}/mån inkl. moms)`],
  ];
  const payBlocks: Block[] = [{ type: "kv", rows: priceRows }];

  if (t.installments > 1) {
    payBlocks.push({
      type: "p",
      text: `Engångskostnaden delas upp på <strong>${t.installments} betalningar</strong>. En administrationsavgift om ${kr(t.admin_fee_total_ex / t.installments)} ex moms tillkommer per delbetalning. Betalningsplan:`,
    });
    payBlocks.push({
      type: "list",
      items: t.schedule.map((s) => `Delbetalning ${s.n}: ${kr(s.ex)} ex moms (${kr(s.inc)} inkl. moms)`),
    });
    payBlocks.push({
      type: "kv",
      rows: [
        ["Totalt engångskostnad inkl. administrationsavgifter", `${kr(t.total_ex)} ex moms`],
        ["Totalt inkl. moms", kr(t.total_inc)],
      ],
    });
  } else {
    payBlocks.push({ type: "p", text: "Engångskostnaden betalas i en (1) betalning." });
  }

  if (c.payment_terms && PAYMENT_TERMS_LABEL[c.payment_terms]) {
    payBlocks.push({ type: "p", text: PAYMENT_TERMS_LABEL[c.payment_terms] });
  }
  payBlocks.push({
    type: "p",
    text: "Månadsavgiften avser hosting, drift, löpande uppdateringar, säkerhetsuppdateringar och support enligt vald plan. Stripes transaktionsavgifter tillkommer och betalas av kunden." +
      (isMarketing ? " Eventuell annonsbudget (t.ex. Google Ads) betalas separat direkt till respektive plattform." : ""),
  });
  sections.push({ title: "3. Pris och betalning", blocks: payBlocks });

  // 4. Delivery
  sections.push({
    title: "4. Leverans",
    blocks: [{
      type: "p",
      text: "Systemet levereras live inom 7 dagar från det att Lynkrr AB mottagit komplett underlag (varumärke, meny och nödvändig information). Förseningar som beror på att underlag saknas eller är ofullständigt förlänger leveranstiden i motsvarande mån.",
    }],
  });

  // 5. Hardware
  sections.push({
    title: "5. Hårdvara",
    blocks: [{
      type: "p",
      text: "1 st SUNMI V3H-terminal ingår, färdigkonfigurerad. Ytterligare terminaler kan beställas som tillval för 3 999 kr/st ex moms.",
    }],
  });

  // 6. Changes / scope creep
  sections.push({
    title: "6. Ändringar och tillägg",
    blocks: [{
      type: "p",
      text: "Ändringar, tillägg eller funktioner utöver det som uttryckligen ingår enligt punkt 2 offereras och debiteras separat. Inget arbete utöver den valda planen och valda tillägg utförs utan kundens godkännande.",
    }],
  });

  // 7. Binding agreement — custom service delivery, no refund concept.
  sections.push({
    title: "7. Bindande avtal",
    blocks: [{
      type: "p",
      text: "Engångskostnaden avser uppsättningsarbete som påbörjas efter signering och utförs specifikt för kunden. Avtalet är bindande vid signering och engångskostnaden är inte återbetalningsbar.",
    }],
  });

  // 8. Subscription & termination
  sections.push({
    title: "8. Abonnemang och uppsägning",
    blocks: [{
      type: "p",
      text: "Månadsavgiften löper tills vidare och kan sägas upp av endera parten med 30 dagars varsel. När uppsägningen träder i kraft stängs beställningssidan ner. Kunden äger sin data och kan exportera den i samband med avslut.",
    }],
  });

  // 9. Support
  sections.push({
    title: "9. Support",
    blocks: [{ type: "p", text: plan.support }],
  });

  // 10. Client responsibilities
  sections.push({
    title: "10. Kundens ansvar",
    blocks: [{
      type: "p",
      text: "Kunden ansvarar för att i tid tillhandahålla nödvändigt underlag (varumärke, meny, bilder och information) samt för att inneha ett eget Stripe-konto för att ta emot betalningar. Kunden äger sin data (kundregister, ordrar och statistik).",
    }],
  });

  // 11. General terms
  sections.push({
    title: "11. Övrigt",
    blocks: [{
      type: "p",
      text: `I övrigt gäller Lynkrr AB:s allmänna villkor (${SELLER.termsUrl}). På detta avtal tillämpas svensk rätt och eventuella tvister prövas av svensk allmän domstol.`,
    }],
  });

  return sections;
}

// ── HTML renderer (signing page) — built from the sections above ───────────
function renderBlock(b: Block): string {
  if (b.type === "p") {
    return `<p style="margin:0 0 12px;font-family:${FONT};font-size:14px;line-height:1.7;color:${C.grayStrong};">${b.text}</p>`;
  }
  if (b.type === "list") {
    const lis = b.items.map((i) =>
      `<li style="margin:0 0 7px;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.grayStrong};">${esc(i)}</li>`).join("");
    return `<ul style="margin:0 0 14px;padding-left:22px;">${lis}</ul>`;
  }
  // kv
  const rows = b.rows.map(([k, v]) => `
    <tr>
      <td style="padding:9px 14px;background:${C.cream};border-bottom:1px solid ${C.border};font-family:${FONT};font-size:12px;font-weight:600;color:${C.gray};width:42%;vertical-align:top;">${esc(k)}</td>
      <td style="padding:9px 14px;border-bottom:1px solid ${C.border};font-family:${FONT};font-size:14px;color:${C.ink};font-weight:500;vertical-align:top;">${v}</td>
    </tr>`).join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid ${C.border};border-radius:12px;overflow:hidden;margin:0 0 16px;">${rows}</table>`;
}

/**
 * Renders the contract body HTML (the part inside the signing page / PDF-equivalent
 * preview). `signed` adds the executed-signature footer instead of the pre-signed one.
 */
export function renderContractHtml(c: ContractInput, opts?: {
  signed?: boolean;
  signerName?: string;
  signedAt?: string;
}): string {
  const sections = buildSections(c);
  const body = sections.map((s) => `
    <section style="margin:0 0 26px;">
      <h2 style="margin:0 0 12px;font-family:${FONT};font-size:17px;font-weight:700;color:${C.ink};border-bottom:2px solid ${C.coralSoft};padding-bottom:6px;">${esc(s.title)}</h2>
      ${s.blocks.map(renderBlock).join("")}
    </section>`).join("");

  // Signature block — Lynkrr pre-signed; client side filled on sign.
  const sig = `
    <section style="margin:34px 0 0;padding-top:22px;border-top:2px solid ${C.border};">
      <h2 style="margin:0 0 18px;font-family:${FONT};font-size:17px;font-weight:700;color:${C.ink};">12. Underskrifter</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="50%" style="vertical-align:bottom;padding-right:14px;">
          <div style="font-family:'Dancing Script','Caveat',cursive;font-size:30px;color:${C.ink};line-height:1;">${esc(SELLER.rep)}</div>
          <div style="border-top:1px solid ${C.ink};margin-top:6px;padding-top:6px;font-family:${FONT};font-size:12px;color:${C.gray};">
            ${esc(SELLER.name)}<br>${esc(SELLER.rep)}, ${esc(SELLER.repRole)}<br>Org.nr ${esc(SELLER.orgNr)}
          </div>
        </td>
        <td width="50%" style="vertical-align:bottom;padding-left:14px;">
          ${opts?.signed
            ? `<div style="font-family:'Dancing Script','Caveat',cursive;font-size:30px;color:${C.ink};line-height:1;">${esc(opts.signerName ?? "")}</div>`
            : `<div style="height:38px;"></div>`}
          <div style="border-top:1px solid ${C.ink};margin-top:6px;padding-top:6px;font-family:${FONT};font-size:12px;color:${C.gray};">
            Kund${opts?.signed && opts.signedAt ? `<br>Signerat elektroniskt ${esc(String(opts.signedAt).slice(0, 16).replace("T", " "))}` : "<br>&nbsp;"}
          </div>
        </td>
      </tr></table>
      ${opts?.signed
        ? `<p style="margin:16px 0 0;font-family:${FONT};font-size:11px;color:${C.gray};">Detta avtal har signerats elektroniskt. Avtals-ID: ${esc(c.id ?? "")}.</p>`
        : ""}
    </section>`;

  return body + sig;
}
