// notify-onboarding — receives the client intake form (onboarding.html).
// Inserts into `onboarding_submissions` (service role) + Resend notifications.
// File uploads happen client-side to the private `onboarding` bucket; this
// function receives the resulting storage paths/URLs as plain fields.
import {
  corsHeaders,
  detailTable,
  esc,
  isEmail,
  json,
  mailLink,
  renderEmail,
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

  const menuFiles = (row.menu_urls as unknown[]).length;
  const teamHtml = renderEmail({
    preheader: `Ny onboarding: ${row.restaurant_name}`,
    badge: "Onboarding",
    title: "Ny onboarding-inlämning 🚀",
    intro: `<strong>${esc(row.restaurant_name)}</strong> har skickat in sina uppgifter. Dags att börja bygga.`,
    bodyHtml: detailTable([
      ["Restaurang", `${esc(row.restaurant_name)} (${esc(row.org_nr)})`],
      ["Kontakt", `${esc(row.contact_person)} — ${esc(row.contact_role)}`],
      ["E-post", mailLink(row.email as string)],
      ["Telefon", esc(row.phone)],
      ["Adress", `${esc(row.address)}, ${esc(row.postal_code)} ${esc(row.city)}`],
      ["Plan", esc(row.plan)],
      ["Add-ons", esc(JSON.stringify(row.addons))],
      ["Domän", `${esc(row.domain_choice)} — ${esc(row.domain_value)}`],
      ["Meny", `${esc(row.menu_link)} (${esc(menuFiles)} filer)`],
      ["Upphämtning", row.offer_pickup ? "Ja" : "Nej"],
      ["Leverans", row.offer_delivery ? "Ja" : "Nej"],
      ["Moms", esc(row.vat_handling)],
      ["Stripe", esc(row.has_stripe)],
      ["Klarna", row.klarna_interest ? "Ja" : "Nej"],
      ["Övrigt", esc(row.other)],
    ]) +
      `<p style="margin:20px 0 0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:1.6;color:#6B6764;">📎 Logga, meny och foton finns i Supabase Storage (bucket <code style="background:#FFF9F6;padding:2px 6px;border-radius:5px;">onboarding</code>) — öppna i adminpanelen.</p>`,
    footnote: `Inlämnings-ID: ${esc(data.id)}`,
  });
  await sendEmail(TEAM_EMAIL, `Ny onboarding: ${row.restaurant_name}`, teamHtml);

  const confirmHtml = renderEmail({
    preheader: "Tack — vi har tagit emot dina uppgifter och börjar bygga.",
    title: "Vi börjar bygga ditt system! 🛠️",
    intro: `Hej ${esc(row.contact_person) || "där"},<br>vi har fått allt vi behöver för att börja bygga systemet för <strong>${esc(row.restaurant_name)}</strong>.`,
    bodyHtml:
      `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A4744;">Vårt team går nu igenom dina uppgifter och hör av sig inom kort med nästa steg. Har du frågor under tiden når du oss direkt på <a href="mailto:info@amoora.se" style="color:#D85B40;text-decoration:none;">info@amoora.se</a>.</p>`,
    cta: { label: "Se hur det fungerar", url: "https://amoora.se/sa-fungerar-det.html" },
    footnote: "Tack för att du valde Amoora — en produkt av Lynkrr AB.",
  });
  await sendEmail(row.email as string, "Vi bygger ditt Amoora-system", confirmHtml);

  return json({ ok: true, id: data.id });
});
