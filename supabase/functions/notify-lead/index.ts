// notify-lead — public endpoint for contact form, email CTAs, calculator.
// Inserts a row into `leads` (service role) and sends Resend notifications.
import {
  corsHeaders,
  esc,
  isEmail,
  json,
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
  const teamHtml = `
    <h2>Ny lead (${esc(labels[source] ?? source)})</h2>
    <ul>
      <li><strong>Namn:</strong> ${esc(row.name)}</li>
      <li><strong>E-post:</strong> ${esc(row.email)}</li>
      <li><strong>Telefon:</strong> ${esc(row.phone)}</li>
      <li><strong>Restaurang:</strong> ${esc(row.restaurant_name)}</li>
      <li><strong>Stad:</strong> ${esc(row.city)}</li>
      <li><strong>Plan:</strong> ${esc(row.plan_interest)}</li>
      <li><strong>Meddelande:</strong> ${esc(row.message)}</li>
    </ul>
    <p>Lead-ID: ${esc(data.id)}</p>`;
  await sendEmail(TEAM_EMAIL, `Ny lead: ${labels[source] ?? source}`, teamHtml);

  if (source === "contact_form" || source === "email_cta") {
    const confirmHtml = `
      <h2>Tack för din förfrågan!</h2>
      <p>Hej ${esc(row.name) || "där"},</p>
      <p>Vi har tagit emot din förfrågan och hör av oss inom 1 arbetsdag med
      förslag på tider för en kort demo. Under tiden får du gärna räkna på din
      besparing på <a href="https://amoora.se/raknare.html">amoora.se/raknare</a>.</p>
      <p>Vänliga hälsningar,<br>Amoora — en produkt av Lynkrr AB</p>`;
    await sendEmail(email, "Tack — vi hör av oss inom 1 arbetsdag", confirmHtml);
  }

  return json({ ok: true, id: data.id });
});
