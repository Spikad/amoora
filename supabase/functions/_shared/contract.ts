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

// ── Sender registry — the contract's "Er kontakt" + signatory follow whoever
// sends it (derived from the logged-in admin email, never client input). ──────
export interface Sender { name: string; title: string }
export const SENDERS: Record<string, Sender> = {
  "omar@lynkrr.se": { name: "Omar Alzokani", title: "VD" },
  "nidal@lynkrr.se": { name: "Nidal Darwiche", title: "Sales Manager & IT Support" },
  "aliaa@lynkrr.se": { name: "Aliaa Abbas", title: "Sales Manager" },
};
export const DEFAULT_SENDER: Sender = { name: "Omar Alzokani", title: "VD" };

// Resolve a sender from an admin email (fallback: Omar Alzokani, VD).
export function senderFor(email?: string | null): Sender {
  return SENDERS[(email || "").toLowerCase().trim()] ?? DEFAULT_SENDER;
}
// Resolve the sender already stored on a contract (old rows fall back cleanly).
export function contractSender(c: ContractInput): Sender {
  return {
    name: c.sender_name || DEFAULT_SENDER.name,
    title: c.sender_title || DEFAULT_SENDER.title,
  };
}

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
  sender_name?: string | null;
  sender_title?: string | null;
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
  const sender = contractSender(c);

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
          ["Er kontakt", `${esc(sender.name)} — ${esc(sender.title)}`],
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

  // 4. Late payment (NEW)
  sections.push({
    title: "4. Dröjsmål med betalning",
    blocks: [
      { type: "p", text: "Vid försenad betalning utgår dröjsmålsränta enligt räntelagen (1975:635) samt lagstadgad påminnelseavgift och eventuella inkassokostnader." },
      { type: "p", text: "Om en betalning (delbetalning eller månadsavgift) är försenad med mer än 14 dagar efter skriftlig påminnelse har Lynkrr AB rätt att tillfälligt stänga av tjänsten till dess att full betalning erlagts. En sådan avstängning befriar inte kunden från betalningsskyldighet." },
      { type: "p", text: "Vid utebliven delbetalning förfaller samtliga återstående delbetalningar till omedelbar betalning." },
    ],
  });

  // 5. Delivery
  sections.push({
    title: "5. Leverans",
    blocks: [{
      type: "p",
      text: "Systemet levereras live inom 7 dagar från det att Lynkrr AB mottagit komplett underlag (varumärke, meny och nödvändig information). Förseningar som beror på att underlag saknas eller är ofullständigt förlänger leveranstiden i motsvarande mån.",
    }],
  });

  // 6. Hardware
  sections.push({
    title: "6. Hårdvara",
    blocks: [{
      type: "p",
      text: "1 st SUNMI V3H-terminal ingår, färdigkonfigurerad. Ytterligare terminaler kan beställas som tillval för 3 999 kr/st ex moms.",
    }],
  });

  // 7. Changes / scope creep
  sections.push({
    title: "7. Ändringar och tillägg",
    blocks: [{
      type: "p",
      text: "Ändringar, tillägg eller funktioner utöver det som uttryckligen ingår enligt punkt 2 offereras och debiteras separat. Inget arbete utöver den valda planen och valda tillägg utförs utan kundens godkännande.",
    }],
  });

  // 8. Intellectual property & licence of use (NEW — critical)
  sections.push({
    title: "8. Immateriella rättigheter och nyttjanderätt",
    blocks: [
      { type: "p", text: "Plattformen, källkoden, programvaran och designen samt alla immateriella rättigheter till dessa tillhör och förblir Lynkrr AB:s egendom. Källkoden överlämnas aldrig till kunden — varken under avtalstiden eller efter dess upphörande." },
      { type: "p", text: "Kunden erhåller en icke-exklusiv och icke överlåtbar nyttjanderätt till systemet så länge abonnemanget löper och betalningarna fullgörs." },
      { type: "p", text: "Kundens eget innehåll tillhör kunden: varumärke, logotyp, menyinnehåll samt kund- och orderdata. Kunden äger fullt ut sin beställningskanal, sina kundrelationer och sin data — helt utan provision. Det är den underliggande programvaran som upplåts med nyttjanderätt, inte säljs." },
      { type: "p", text: "Vid avtalets upphörande upphör nyttjanderätten till programvaran. Kundens data exporteras enligt §10." },
    ],
  });

  // 9. Binding agreement — custom service delivery, no refund concept.
  sections.push({
    title: "9. Bindande avtal",
    blocks: [{
      type: "p",
      text: "Engångskostnaden avser uppsättningsarbete som påbörjas efter signering och utförs specifikt för kunden. Avtalet är bindande vid signering och engångskostnaden är inte återbetalningsbar.",
    }],
  });

  // 10. Subscription & termination (updated)
  sections.push({
    title: "10. Abonnemang och uppsägning",
    blocks: [{
      type: "p",
      text: "Månadsavgiften löper tills vidare och kan sägas upp av endera parten med 30 dagars varsel. Uppsägning medför inte återbetalning av engångskostnaden. När uppsägningen träder i kraft stängs beställningssidan ner. Kunden äger sin data och kan exportera den inom 30 dagar från avtalets upphörande; därefter kan uppgifterna komma att raderas.",
    }],
  });

  // 11. Price adjustment (NEW)
  sections.push({
    title: "11. Prisjustering",
    blocks: [{
      type: "p",
      text: "Lynkrr AB får justera månadsavgiften med 60 dagars skriftligt varsel. Vid en höjning har kunden rätt att säga upp abonnemanget till den dag höjningen träder i kraft. Engångskostnaden återbetalas aldrig vid uppsägning (jfr §9).",
    }],
  });

  // 12. Support
  sections.push({
    title: "12. Support",
    blocks: [{ type: "p", text: plan.support }],
  });

  // 13. Client responsibilities
  sections.push({
    title: "13. Kundens ansvar",
    blocks: [{
      type: "p",
      text: "Kunden ansvarar för att i tid tillhandahålla nödvändigt underlag (varumärke, meny, bilder och information) samt för att inneha ett eget Stripe-konto för att ta emot betalningar. Kunden äger sin data (kundregister, ordrar och statistik).",
    }],
  });

  // 14. Personal data / GDPR (NEW)
  sections.push({
    title: "14. Personuppgifter (GDPR)",
    blocks: [
      { type: "p", text: "Lynkrr AB behandlar personuppgifter (bl.a. slutkunders ordrar och kontaktuppgifter) för kundens räkning och är personuppgiftsbiträde enligt dataskyddsförordningen (GDPR). Kunden är personuppgiftsansvarig för sina slutkunders personuppgifter." },
      { type: "p", text: "Behandlingen sker endast för att tillhandahålla tjänsten och med lämpliga tekniska och organisatoriska skyddsåtgärder. Anlitade underbiträden (t.ex. hosting och betalningar) finns inom EU/EES eller omfattas av en giltig överföringsmekanism." },
      { type: "p", text: "Vid avtalets upphörande raderas eller återlämnas personuppgifterna enligt §10. Behandlingen beskrivs närmare i Lynkrr AB:s integritetspolicy (amoora.se/integritetspolicy.html)." },
    ],
  });

  // 15. Limitation of liability (NEW)
  sections.push({
    title: "15. Ansvarsbegränsning",
    blocks: [
      { type: "p", text: "Lynkrr AB ansvarar inte för indirekt skada, följdskada, utebliven vinst, förlorad omsättning eller förlust av data, utöver vad som följer av tvingande lag. Lynkrr AB:s sammanlagda ansvar är begränsat till de avgifter som kunden erlagt under de senaste tolv (12) månaderna." },
      { type: "p", text: "Lynkrr AB ansvarar inte för avbrott eller fel som orsakas av tredjepartstjänster (t.ex. Stripe, hosting eller betalmetoder) eller av omständigheter utanför Lynkrr AB:s kontroll (force majeure)." },
    ],
  });

  // 16. General terms
  sections.push({
    title: "16. Övrigt",
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
  const sender = contractSender(c);
  const sigNum = sections.length + 1;
  const body = sections.map((s) => `
    <section style="margin:0 0 26px;">
      <h2 style="margin:0 0 12px;font-family:${FONT};font-size:17px;font-weight:700;color:${C.ink};border-bottom:2px solid ${C.coralSoft};padding-bottom:6px;">${esc(s.title)}</h2>
      ${s.blocks.map(renderBlock).join("")}
    </section>`).join("");

  // Signature block — Lynkrr side signed by the sender; client side filled on sign.
  const sig = `
    <section style="margin:34px 0 0;padding-top:22px;border-top:2px solid ${C.border};">
      <h2 style="margin:0 0 18px;font-family:${FONT};font-size:17px;font-weight:700;color:${C.ink};">${sigNum}. Underskrifter</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="50%" style="vertical-align:bottom;padding-right:14px;">
          <div style="font-family:'Dancing Script','Caveat',cursive;font-size:30px;color:${C.ink};line-height:1;">${esc(sender.name)}</div>
          <div style="border-top:1px solid ${C.ink};margin-top:6px;padding-top:6px;font-family:${FONT};font-size:12px;color:${C.gray};">
            ${esc(SELLER.name)}<br>${esc(sender.name)}, ${esc(sender.title)}<br>Org.nr ${esc(SELLER.orgNr)}
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
