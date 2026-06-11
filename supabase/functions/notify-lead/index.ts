// notify-lead — public endpoint for contact form, email CTAs, calculator.
// Inserts a row into `leads` (service role) and sends Resend notifications.
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

const ALLOWED_SOURCES = ["contact_form", "email_cta", "calculator", "newsletter"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot — bots fill hidden fields. Pretend success, store nothing.
  if (body.company || body.website_url) return json({ ok: true });

  const source = String(body.source ?? "contact_form");
  if (!ALLOWED_SOURCES.includes(source)) return json({ error: "invalid_source" }, 400);

  const email = body.email;
  if (!isEmail(email)) return json({ error: "invalid_email" }, 400);

  // contact_form requires consent to be stored.
  if (source === "contact_form" && body.consent !== true) {
    return json({ error: "consent_required" }, 400);
  }

  const row = {
    source,
    name: (body.name as string) ?? null,
    email,
    phone: (body.phone as string) ?? null,
    restaurant_name: (body.restaurant_name as string) ?? null,
    city: (body.city as string) ?? null,
    plan_interest: (body.plan_interest as string) ?? null,
    message: (body.message as string) ?? null,
  };

  const supabase = serviceClient();
  const { data, error } = await supabase.from("leads").insert(row).select("id").single();
  if (error) {
    console.error("leads insert failed", error);
    return json({ error: "db_error" }, 500);
  }

  // Emails are best-effort — never block the user on email delivery.
  const labels: Record<string, string> = {
    contact_form: "Demobokning",
    email_cta: "E-post-CTA",
    calculator: "Räknare",
    newsletter: "Nyhetsbrev",
  };
  const label = labels[source] ?? source;
  const teamHtml = renderEmail({
    preheader: `Ny lead: ${row.restaurant_name ?? row.email} (${label})`,
    badge: label,
    title: "Ny lead har kommit in 🎉",
    intro: "En ny förfrågan väntar på uppföljning. Detaljerna finns nedan.",
    bodyHtml: detailTable([
      ["Namn", esc(row.name)],
      ["E-post", mailLink(row.email)],
      ["Telefon", esc(row.phone)],
      ["Restaurang", esc(row.restaurant_name)],
      ["Stad", esc(row.city)],
      ["Plan", esc(row.plan_interest)],
      ["Meddelande", esc(row.message)],
    ]),
    cta: { label: "Svara på leadet", url: `mailto:${row.email}` },
    footnote: `Lead-ID: ${esc(data.id)}`,
  });
  await sendEmail(TEAM_EMAIL, `Ny lead: ${label}`, teamHtml);

  if (source === "contact_form" || source === "email_cta") {
    const confirmHtml = renderEmail({
      preheader: "Tack för din förfrågan — vi hör av oss inom 1 arbetsdag.",
      title: "Tack för din förfrågan!",
      intro: `Hej ${esc(row.name) || "där"},<br>vi har tagit emot din förfrågan och återkommer inom <strong>1 arbetsdag</strong> med förslag på tider för en kort demo.`,
      bodyHtml:
        `<p style="margin:0;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;font-size:15px;line-height:1.65;color:#4A4744;">Under tiden — räkna på hur mycket din restaurang kan spara med Amoora jämfört med matjättarnas avgifter.</p>`,
      cta: { label: "Räkna på din besparing", url: "https://amoora.se/raknare.html" },
      secondaryCta: { label: "Se hur Amoora fungerar →", url: "https://amoora.se/sa-fungerar-det.html" },
      footnote: "Du får detta mejl eftersom du fyllde i ett formulär på amoora.se. Har du frågor? Svara bara på det här mejlet.",
    });
    await sendEmail(email, "Tack — vi hör av oss inom 1 arbetsdag", confirmHtml);
  }

  return json({ ok: true, id: data.id });
});
