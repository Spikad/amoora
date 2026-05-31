// notify-onboarding — receives the client intake form (onboarding.html).
// Inserts into `onboarding_submissions` (service role) + Resend notifications.
// File uploads happen client-side to the private `onboarding` bucket; this
// function receives the resulting storage paths/URLs as plain fields.
import {
  corsHeaders,
  esc,
  isEmail,
  json,
  sendEmail,
  serviceClient,
  TEAM_EMAIL,
} from "../_shared/util.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  if (b.company || b.website_url) return json({ ok: true }); // honeypot

  if (!isEmail(b.email)) return json({ error: "invalid_email" }, 400);
  if (!b.restaurant_name) return json({ error: "restaurant_name_required" }, 400);

  const row = {
    restaurant_name: b.restaurant_name ?? null,
    org_nr: b.org_nr ?? null,
    contact_person: b.contact_person ?? null,
    contact_role: b.contact_role ?? null,
    email: b.email,
    phone: b.phone ?? null,
    address: b.address ?? null,
    postal_code: b.postal_code ?? null,
    city: b.city ?? null,
    plan: b.plan ?? null,
    addons: b.addons ?? [],
    logo_url: b.logo_url ?? null,
    brand_color: b.brand_color ?? null,
    use_default_colors: b.use_default_colors ?? false,
    photo_urls: b.photo_urls ?? [],
    brand_notes: b.brand_notes ?? null,
    domain_choice: b.domain_choice ?? null,
    domain_value: b.domain_value ?? null,
    existing_web: b.existing_web ?? null,
    social: b.social ?? {},
    menu_link: b.menu_link ?? null,
    menu_urls: b.menu_urls ?? [],
    menu_notes: b.menu_notes ?? null,
    opening_hours: b.opening_hours ?? {},
    offer_pickup: b.offer_pickup ?? false,
    offer_delivery: b.offer_delivery ?? false,
    delivery_radius: b.delivery_radius ?? null,
    vat_handling: b.vat_handling ?? null,
    terminal_delivery_address: b.terminal_delivery_address ?? null,
    has_stripe: b.has_stripe ?? null,
    klarna_interest: b.klarna_interest ?? false,
    payout_notes: b.payout_notes ?? null,
    other: b.other ?? null,
  };

  const supabase = serviceClient();
  const { data, error } = await supabase
    .from("onboarding_submissions")
    .insert(row)
    .select("id")
    .single();
  if (error) {
    console.error("onboarding insert failed", error);
    return json({ error: "db_error" }, 500);
  }

  const teamHtml = `
    <h2>Ny onboarding-inlämning</h2>
    <ul>
      <li><strong>Restaurang:</strong> ${esc(row.restaurant_name)} (${esc(row.org_nr)})</li>
      <li><strong>Kontakt:</strong> ${esc(row.contact_person)} — ${esc(row.contact_role)}</li>
      <li><strong>E-post:</strong> ${esc(row.email)} · <strong>Tel:</strong> ${esc(row.phone)}</li>
      <li><strong>Adress:</strong> ${esc(row.address)}, ${esc(row.postal_code)} ${esc(row.city)}</li>
      <li><strong>Plan:</strong> ${esc(row.plan)} · <strong>Add-ons:</strong> ${esc(JSON.stringify(row.addons))}</li>
      <li><strong>Domän:</strong> ${esc(row.domain_choice)} — ${esc(row.domain_value)}</li>
      <li><strong>Meny:</strong> ${esc(row.menu_link)} (${esc((row.menu_urls as unknown[]).length)} filer)</li>
      <li><strong>Upphämtning:</strong> ${row.offer_pickup ? "ja" : "nej"} · <strong>Leverans:</strong> ${row.offer_delivery ? "ja" : "nej"}</li>
      <li><strong>Moms:</strong> ${esc(row.vat_handling)}</li>
      <li><strong>Stripe:</strong> ${esc(row.has_stripe)} · <strong>Klarna:</strong> ${row.klarna_interest ? "ja" : "nej"}</li>
      <li><strong>Övrigt:</strong> ${esc(row.other)}</li>
    </ul>
    <p>Logga + meny + foton finns i Supabase Storage (bucket <code>onboarding</code>) — öppna i adminpanelen.</p>
    <p>Inlämnings-ID: ${esc(data.id)}</p>`;
  await sendEmail(TEAM_EMAIL, `Ny onboarding: ${row.restaurant_name}`, teamHtml);

  const confirmHtml = `
    <h2>Tack — vi har tagit emot dina uppgifter!</h2>
    <p>Hej ${esc(row.contact_person) || "där"},</p>
    <p>Vi har fått allt vi behöver för att börja bygga ditt system för
    <strong>${esc(row.restaurant_name)}</strong>. Vårt team går igenom uppgifterna
    och hör av sig inom kort med nästa steg. Har du frågor under tiden når du oss
    på <a href="mailto:info@amoora.se">info@amoora.se</a>.</p>
    <p>Vänliga hälsningar,<br>Amoora — en produkt av Lynkrr AB</p>`;
  await sendEmail(row.email as string, "Vi bygger ditt Amoora-system", confirmHtml);

  return json({ ok: true, id: data.id });
});
