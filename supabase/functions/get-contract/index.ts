// get-contract — public, token-based. Returns the rendered contract for the
// signing page and marks it 'viewed' on first open. Never exposes personnummer.
import { corsHeaders, json, serviceClient } from "../_shared/util.ts";
import { PLANS, renderContractHtml, type ContractInput } from "../_shared/contract.ts";

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
  if (!token || token.length < 16) return json({ error: "invalid_token" }, 400);

  const supabase = serviceClient();
  const { data: row, error } = await supabase
    .from("contracts").select("*").eq("sign_token", token).maybeSingle();
  if (error) { console.error("get-contract db", error); return json({ error: "db_error" }, 500); }
  if (!row) return json({ error: "not_found" }, 404);

  if (row.status === "cancelled") return json({ error: "cancelled" }, 410);

  // Mark viewed on first open (don't downgrade a signed contract).
  if (row.status === "sent") {
    await supabase.from("contracts")
      .update({ status: "viewed", viewed_at: new Date().toISOString() })
      .eq("id", row.id).eq("status", "sent");
  }

  const input = toInput(row);
  const signed = row.status === "signed";
  const html = renderContractHtml(input, {
    signed,
    signerName: (row.signer_name as string) ?? "",
    signedAt: (row.signed_at as string) ?? "",
  });

  return json({
    ok: true,
    status: signed ? "signed" : "open",
    restaurant_name: row.restaurant_name,
    contact_name: row.contact_name,
    plan_name: PLANS[input.plan]?.name ?? input.plan,
    signer_name: signed ? row.signer_name : null,
    signed_at: signed ? row.signed_at : null,
    html,
  });
});
