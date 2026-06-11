// Shared helpers for Amoora edge functions.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// Service-role client — bypasses RLS. NEVER expose the key to the browser.
export function serviceClient() {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Unguessable random token (hex) for public contract sign links.
export function randomToken(bytes = 32): string {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validates the caller's JWT and confirms they are an admin (row in public.admins).
 * Returns { id, email } for admins, else null. Works with verify_jwt=false because
 * it independently validates the bearer token via the auth server.
 */
export async function requireAdmin(
  req: Request,
): Promise<{ id: string; email: string | null } | null> {
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const svc = serviceClient();
  const { data: { user }, error } = await svc.auth.getUser(token);
  if (error || !user) return null;
  const { data } = await svc.from("admins").select("id").eq("id", user.id).maybeSingle();
  if (!data) return null;
  return { id: user.id, email: user.email ?? null };
}

export function esc(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------------------------------------------------------------------------
// Branded email design system
// ---------------------------------------------------------------------------
// Amoora brand tokens (mirrors css/style.css :root).
const C = {
  coral: "#EA7056",
  coralDark: "#D85B40",
  coralSoft: "#FBE4DD",
  ink: "#1C1B1A",
  cream: "#FFF9F6",
  gray: "#6B6764",
  grayStrong: "#4A4744",
  border: "#EFE9E5",
  white: "#FFFFFF",
};
const FONT = "'Poppins','Helvetica Neue',Arial,sans-serif";

type Cta = { label: string; url: string };

/**
 * A label/value detail table for the team-notification emails.
 * `value` may contain trusted HTML (e.g. a mailto link) — escape upstream.
 * Rows with empty values are dropped automatically.
 */
export function detailTable(rows: Array<[string, string]>): string {
  const cells = rows
    .filter(([, v]) => v !== null && v !== undefined && String(v).trim() !== "")
    .map(([label, value]) => `
      <tr>
        <td style="padding:13px 18px;background-color:${C.cream};border-bottom:1px solid ${C.border};font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:${C.gray};width:40%;vertical-align:top;">${esc(label)}</td>
        <td style="padding:13px 18px;background-color:${C.white};border-bottom:1px solid ${C.border};font-family:${FONT};font-size:14px;line-height:1.5;color:${C.ink};font-weight:500;vertical-align:top;">${value}</td>
      </tr>`)
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border:1px solid ${C.border};border-radius:14px;overflow:hidden;">${cells}</table>`;
}

function button(cta: Cta): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px auto 0;"><tr>
    <td align="center" bgcolor="${C.coral}" style="border-radius:999px;">
      <a href="${cta.url}" style="display:inline-block;padding:15px 38px;font-family:${FONT};font-size:15px;font-weight:600;color:${C.white};text-decoration:none;border-radius:999px;">${esc(cta.label)}</a>
    </td>
  </tr></table>`;
}

/**
 * Wraps email content in the full branded Amoora shell (header logo, coral
 * accent, dark footer). `title`/`intro`/`bodyHtml` may contain trusted HTML.
 */
export function renderEmail(opts: {
  preheader: string;
  title: string;
  intro?: string;
  badge?: string;
  bodyHtml?: string;
  cta?: Cta;
  secondaryCta?: Cta;
  footnote?: string;
}): string {
  const { preheader, badge, title, intro, bodyHtml, cta, secondaryCta, footnote } = opts;
  return `<!DOCTYPE html>
<html lang="sv" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${C.cream};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.cream};">
  <tr><td align="center" style="padding:36px 14px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${C.white};border-radius:20px;overflow:hidden;box-shadow:0 10px 34px rgba(28,27,26,0.09);">
      <tr><td style="height:6px;background-color:${C.coral};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td align="center" style="padding:34px 44px 10px;">
        <img src="https://amoora.se/assets/images/logo-full.png" width="156" alt="Amoora" style="display:block;border:0;width:156px;max-width:58%;height:auto;">
      </td></tr>
      <tr><td style="padding:14px 44px 40px;">
        ${badge ? `<div style="text-align:center;margin:0 0 14px;"><span style="display:inline-block;padding:6px 16px;background-color:${C.coralSoft};color:${C.coralDark};font-family:${FONT};font-size:12px;font-weight:600;letter-spacing:.03em;text-transform:uppercase;border-radius:999px;">${esc(badge)}</span></div>` : ""}
        <h1 style="margin:0 0 14px;text-align:center;font-family:${FONT};font-size:25px;line-height:1.25;font-weight:700;color:${C.ink};">${title}</h1>
        ${intro ? `<p style="margin:0 0 26px;text-align:center;font-family:${FONT};font-size:15px;line-height:1.65;color:${C.grayStrong};">${intro}</p>` : ""}
        ${bodyHtml || ""}
        ${cta ? `<div style="text-align:center;margin:30px 0 6px;">${button(cta)}</div>` : ""}
        ${secondaryCta ? `<p style="margin:18px 0 0;text-align:center;font-family:${FONT};font-size:14px;color:${C.gray};"><a href="${secondaryCta.url}" style="color:${C.coralDark};text-decoration:underline;font-weight:500;">${esc(secondaryCta.label)}</a></p>` : ""}
        ${footnote ? `<p style="margin:30px 0 0;padding-top:20px;border-top:1px solid ${C.border};text-align:center;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.gray};">${footnote}</p>` : ""}
      </td></tr>
      <tr><td style="padding:26px 44px;background-color:${C.ink};" align="center">
        <p style="margin:0 0 6px;font-family:${FONT};font-size:14px;font-weight:600;color:${C.cream};">Amoora — smart beställning för din restaurang</p>
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:#9a938f;">En produkt av Lynkrr AB &nbsp;·&nbsp; <a href="https://amoora.se" style="color:${C.coral};text-decoration:none;">amoora.se</a> &nbsp;·&nbsp; <a href="mailto:info@amoora.se" style="color:${C.coral};text-decoration:none;">info@amoora.se</a></p>
      </td></tr>
    </table>
    <p style="margin:18px 0 0;font-family:${FONT};font-size:11px;color:#b8afaa;">© Amoora · Lynkrr AB</p>
  </td></tr>
</table>
</body>
</html>`;
}

// Coral link helper for inline use inside detail tables / intros.
export function mailLink(email: string): string {
  return `<a href="mailto:${esc(email)}" style="color:${C.coralDark};text-decoration:none;">${esc(email)}</a>`;
}

const FROM = "Amoora <noreply@amoora.se>";
// Team notification recipients — every lead/onboarding alert goes to all three.
const TEAM = ["omar@lynkrr.se", "aliaa@lynkrr.se", "nidal@lynkrr.se"];

/**
 * Sends an email via Resend. Fails GRACEFULLY: if RESEND_API_KEY is missing
 * or Resend errors, it logs and returns false instead of throwing — so a
 * missing key never 500s the user-facing request.
 */
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  attachments?: Array<{ filename: string; content: string }>, // content = base64
): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email:", subject);
    return false;
  }
  try {
    const payload: Record<string, unknown> = { from: FROM, to, subject, html };
    if (attachments && attachments.length) payload.attachments = attachments;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend threw", err);
    return false;
  }
}

export const TEAM_EMAIL = TEAM;
