// send-onboarding-link — admin-only. Emails the client the onboarding link and
// records onboarding_link_sent_at on the contract.
import {
  corsHeaders, esc, json, renderEmail, requireAdmin, sendEmail, serviceClient,
} from "../_shared/util.ts";

const ONBOARDING_URL = "https://amoora.se/onboarding.html";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const admin = await requireAdmin(req);
  if (!admin) return json({ error: "unauthorized" }, 401);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }

  const id = String(b.contract_id ?? "");
  if (!id) return json({ error: "contract_id_required" }, 400);

  const supabase = serviceClient();
  const { data: row, error } = await supabase
    .from("contracts").select("*").eq("id", id).maybeSingle();
  if (error) { console.error("onb-link fetch", error); return json({ error: "db_error" }, 500); }
  if (!row) return json({ error: "not_found" }, 404);
  if (!row.contact_email) return json({ error: "no_email" }, 400);

  const html = renderEmail({
    preheader: "Nästa steg — fyll i din onboarding så börjar vi bygga.",
    badge: "Nästa steg",
    title: "Dags att starta — fyll i din onboarding 🚀",
    intro: `Hej ${esc(row.contact_name) || "där"},<br>tack för att du signerade! Nästa steg är att fylla i ett kort onboarding-formulär så vi får allt vi behöver för att börja bygga <strong>${esc(row.restaurant_name)}</strong>.`,
    bodyHtml: `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A4744;">Det tar cirka 10 minuter. Du kan ladda upp logga, meny och bilder direkt i formuläret.</p>`,
    cta: { label: "Fyll i onboarding", url: ONBOARDING_URL },
    footnote: "Har du frågor? Svara på det här mejlet så hjälper vi dig.",
  });
  const sent = await sendEmail(row.contact_email, "Nästa steg — din Amoora-onboarding", html);

  await supabase.from("contracts")
    .update({ onboarding_link_sent_at: new Date().toISOString() })
    .eq("id", id);

  return json({ ok: true, emailed: sent });
});
