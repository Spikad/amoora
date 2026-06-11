// sign-contract — public, token-based, SINGLE-USE. Validates the token, atomically
// claims the contract (rejects if already signed), generates the branded signed PDF,
// stores it in the private 'contracts' bucket, and emails both the client and the team.
import {
  corsHeaders, esc, json, renderEmail, sendEmail, serviceClient,
} from "../_shared/util.ts";
import { PLANS, type ContractInput } from "../_shared/contract.ts";
import { generateContractPdf } from "../_shared/pdf.ts";

const TEAM_NOTIFY = "info@lynkrr.se";
const PNR_RE = /^(\d{6}|\d{8})[-+]?\d{4}$/;

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function toInput(row: Record<string, unknown>): ContractInput {
  return {
    id: row.id as string,
    created_at: row.created_at as string,
    restaurant_name: (row.restaurant_name as string) ?? null,
    contact_name: (row.contact_name as string) ?? null,
    contact_email: (row.contact_email as string) ?? null,
    org_nr: (row.org_nr as string) ?? null,
    plan: row.plan as ContractInput["plan"],
    addons: Array.isArray(row.addons) ? (row.addons as string[]) : [],
    installments: (row.installments as number) ?? 1,
    payment_terms: (row.payment_terms as string) ?? undefined,
    monthly_fee_ex_moms: (row.monthly_fee_ex_moms as number) ?? 549,
    admin_fee_per_installment_ex_moms: (row.admin_fee_per_installment_ex_moms as number) ?? 1000,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "invalid_json" }, 400); }

  const token = String(b.token ?? "");
  const signer_name = String(b.signer_name ?? "").trim();
  const signer_personnummer = String(b.signer_personnummer ?? "").trim();
  if (!token || token.length < 16) return json({ error: "invalid_token" }, 400);
  if (signer_name.length < 2) return json({ error: "name_required" }, 400);
  if (!PNR_RE.test(signer_personnummer)) return json({ error: "invalid_personnummer" }, 400);

  const supabase = serviceClient();
  const { data: existing, error: fErr } = await supabase
    .from("contracts").select("*").eq("sign_token", token).maybeSingle();
  if (fErr) { console.error("sign fetch", fErr); return json({ error: "db_error" }, 500); }
  if (!existing) return json({ error: "not_found" }, 404);
  if (existing.status === "cancelled") return json({ error: "cancelled" }, 410);
  if (existing.status === "signed") return json({ error: "already_signed" }, 409);

  const signed_at = new Date().toISOString();

  // Atomic single-use claim: only succeeds if still unsigned.
  const { data: claimed, error: cErr } = await supabase
    .from("contracts")
    .update({ status: "signed", signed_at, signer_name, signer_personnummer })
    .eq("id", existing.id)
    .in("status", ["sent", "viewed"])
    .select("*")
    .maybeSingle();
  if (cErr) { console.error("sign claim", cErr); return json({ error: "db_error" }, 500); }
  if (!claimed) return json({ error: "already_signed" }, 409);

  const input = toInput(claimed);

  // Generate + store the signed PDF.
  let pdfPath: string | null = null;
  let pdfBytes: Uint8Array | null = null;
  try {
    pdfBytes = await generateContractPdf(input, { signerName: signer_name, signerPersonnummer: signer_personnummer, signedAt: signed_at });
    pdfPath = `${claimed.id}/amoora-avtal-${claimed.id}.pdf`;
    const { error: upErr } = await supabase.storage.from("contracts")
      .upload(pdfPath, pdfBytes, { contentType: "application/pdf", upsert: true });
    if (upErr) { console.error("pdf upload", upErr); pdfPath = null; }
    else await supabase.from("contracts").update({ signed_pdf_url: pdfPath }).eq("id", claimed.id);
  } catch (err) {
    console.error("pdf generation failed", err);
  }

  // Emails — best-effort. Attach the PDF when available.
  const attach = pdfBytes ? [{ filename: `Amoora-avtal-${claimed.id}.pdf`, content: toBase64(pdfBytes) }] : undefined;
  const planName = PLANS[input.plan]?.name ?? input.plan;

  const clientHtml = renderEmail({
    preheader: "Tack — ditt avtal är signerat. Din kopia är bifogad.",
    badge: "Signerat",
    title: "Tack — ditt avtal är signerat! ✍️",
    intro: `Hej ${esc(input.contact_name) || "där"},<br>vi har tagit emot din signering av avtalet för <strong>${esc(planName)}</strong>.`,
    bodyHtml: `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A4744;">En kopia av det signerade avtalet finns bifogat som PDF. Vi hör av oss inom kort med nästa steg.</p>`,
    footnote: `Avtals-ID: ${esc(claimed.id)} · Signerat ${esc(signed_at.slice(0, 16).replace("T", " "))}`,
  });
  await sendEmail(input.contact_email as string, "Ditt signerade Amoora-avtal", clientHtml, attach);

  const teamHtml = renderEmail({
    preheader: `Avtal signerat: ${input.restaurant_name}`,
    badge: "Avtal signerat",
    title: "Ett avtal har signerats 🎉",
    intro: `<strong>${esc(input.restaurant_name)}</strong> har signerat avtalet för ${esc(planName)}.`,
    bodyHtml: `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.6;color:#6B6764;">Signerat av ${esc(signer_name)} · ${esc(signed_at.slice(0, 16).replace("T", " "))}. Signerad PDF finns i adminpanelen (bucket <code>contracts</code>).</p>`,
    footnote: `Avtals-ID: ${esc(claimed.id)}`,
  });
  await sendEmail(TEAM_NOTIFY, `Avtal signerat: ${input.restaurant_name}`, teamHtml, attach);

  return json({ ok: true, signed_at, pdf_stored: !!pdfPath });
});
