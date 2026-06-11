// send-contract — admin-only. Creates a contract row, generates an unguessable
// sign link, and emails the client a branded "review & sign" message.
import {
  corsHeaders, isEmail, json, randomToken, renderEmail, requireAdmin,
  sendEmail, serviceClient,
} from "../_shared/util.ts";
import { computeTotals, PLANS, type ContractInput } from "../_shared/contract.ts";

const SITE = "https://amoora.se";
const PLANS_OK = ["basic", "growth", "premium"];
const TERMS_OK = ["bankgiro_14", "bankgiro_7", "klarna_7"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const admin = await requireAdmin(req);
  if (!admin) return json({ error: "unauthorized" }, 401);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }

  const plan = String(b.plan ?? "");
  if (!PLANS_OK.includes(plan)) return json({ error: "invalid_plan" }, 400);
  if (!isEmail(b.contact_email)) return json({ error: "invalid_email" }, 400);

  const installments = [1, 2, 3].includes(Number(b.installments)) ? Number(b.installments) : 1;
  const payment_terms = TERMS_OK.includes(String(b.payment_terms)) ? String(b.payment_terms) : "bankgiro_14";
  const addons = Array.isArray(b.addons) ? (b.addons as unknown[]).map(String) : [];

  const input: ContractInput = {
    restaurant_name: (b.restaurant_name as string) ?? null,
    contact_name: (b.contact_name as string) ?? null,
    contact_email: b.contact_email as string,
    org_nr: (b.org_nr as string) ?? null,
    plan: plan as ContractInput["plan"],
    addons,
    installments,
    payment_terms,
    monthly_fee_ex_moms: 549,
    admin_fee_per_installment_ex_moms: 1000,
  };
  const totals = computeTotals(input);
  const sign_token = randomToken(32);

  const row = {
    lead_id: (b.lead_id as string) ?? null,
    created_by: admin.email,
    restaurant_name: input.restaurant_name,
    contact_name: input.contact_name,
    contact_email: input.contact_email,
    org_nr: input.org_nr,
    plan,
    addons,
    setup_fee_ex_moms: totals.setup_ex,
    monthly_fee_ex_moms: 549,
    installments,
    admin_fee_per_installment_ex_moms: 1000,
    payment_terms,
    totals,
    status: "sent",
    sign_token,
  };

  const supabase = serviceClient();
  const { data, error } = await supabase.from("contracts").insert(row).select("id").single();
  if (error) {
    console.error("contract insert failed", error);
    return json({ error: "db_error" }, 500);
  }

  const sign_url = `${SITE}/signera.html?token=${sign_token}`;
  const kr = (n: number) => new Intl.NumberFormat("sv-SE").format(Math.round(n)) + " kr";
  const html = renderEmail({
    preheader: `Ditt avtal för ${PLANS[input.plan].name} är redo att signeras.`,
    badge: "Avtal",
    title: "Ditt avtal är redo att signeras",
    intro: `Hej ${input.contact_name || "där"},<br>här är avtalet för <strong>${PLANS[input.plan].name}</strong>. Granska och signera digitalt — det tar någon minut.`,
    bodyHtml:
      `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A4744;">Engångskostnad ${kr(totals.setup_ex)} ex moms (${kr(totals.setup_inc)} inkl. moms) + 549 kr/mån ex moms.</p>`,
    cta: { label: "Granska och signera avtal", url: sign_url },
    footnote: "Länken är personlig — dela den inte. Har du frågor? Svara på det här mejlet.",
  });
  await sendEmail(input.contact_email, "Ditt Amoora-avtal är redo att signeras", html);

  return json({ ok: true, id: data.id, sign_token, sign_url });
});
