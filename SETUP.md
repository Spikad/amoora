# Amoora — Manual setup (the bits only you can do)

Everything in the codebase is built and committed (branch `full-build-pass`).
The **only** remaining work is provisioning your Supabase project + Resend, because
those need credentials/OAuth I can't complete for you. Do the steps below once.

Supabase project ref: **`yjudyrytavaudtlqiqvn`** · URL: `https://yjudyrytavaudtlqiqvn.supabase.co`

> Note: the Supabase CLI on this machine is logged into a different account that
> can't see this project, and the MCP OAuth flow wasn't completed, so I couldn't
> apply anything automatically. The steps below are the turnkey version.

---

## 1. Apply the database schema (tables + RLS + storage)

**Easiest — SQL Editor (no CLI):**
1. Open the [SQL Editor](https://supabase.com/dashboard/project/yjudyrytavaudtlqiqvn/sql/new).
2. Paste the entire contents of **`supabase/APPLY_IN_SQL_EDITOR.sql`** and click **Run**.
   (It's idempotent — safe to re-run.)

**Or via CLI** (if you log in as an account with access to this project):
```bash
supabase login                      # opens browser
supabase link --project-ref yjudyrytavaudtlqiqvn
supabase db push                    # applies supabase/migrations/*
```

Verify: Table Editor should show `leads`, `onboarding_submissions`, `admins`, and
Storage should show a private bucket `onboarding`.

---

## 2. Deploy the edge functions

```bash
supabase functions deploy notify-lead --project-ref yjudyrytavaudtlqiqvn
supabase functions deploy notify-onboarding --project-ref yjudyrytavaudtlqiqvn
```
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically by the
edge runtime — you do **not** set those. `verify_jwt=false` is set (in
`supabase/config.toml`) because these are public form endpoints; they validate
input + use a honeypot, and write via the service role.

Function URLs (already wired into the frontend):
- `https://yjudyrytavaudtlqiqvn.supabase.co/functions/v1/notify-lead`
- `https://yjudyrytavaudtlqiqvn.supabase.co/functions/v1/notify-onboarding`

---

## 3. Set the Resend API key (secret)

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx --project-ref yjudyrytavaudtlqiqvn
```
Until this is set, forms still work and rows are still saved — emails are just
skipped (logged, not errored). After setting it, redeploy is **not** required.

---

## 4. Verify the `amoora.se` domain in Resend

Emails are sent from **`Amoora <noreply@amoora.se>`**. In the
[Resend dashboard](https://resend.com/domains): add domain `amoora.se`, then add the
DNS records it gives you (SPF `TXT`, DKIM `CNAME`/`TXT`, and the recommended DMARC
record) at your DNS provider. Wait for "Verified". Until then Resend will reject the
`from` address (the functions degrade gracefully, but no mail goes out).

---

## 5. Create your admin user + grant dashboard access

1. [Authentication → Users → Add user](https://supabase.com/dashboard/project/yjudyrytavaudtlqiqvn/auth/users)
   → create a user with your email + a password (tick "Auto Confirm User").
2. Copy that user's **UID**.
3. In the SQL Editor, run (replace both values):
```sql
insert into public.admins (id, email)
values ('PASTE-AUTH-USER-UID-HERE', 'you@amoora.se');
```
4. Log in at **`/login.html`** → you land on **`/admin.html`** (Bokningar/Leads +
   Onboardade kunder). Anyone not in `admins` is denied even if authenticated.

To add more admins later, repeat step 3 with their UID.

---

## 6. Optional / nice-to-have

- **Capri Blue live link:** set `CAPRI_BLUE_URL` in `js/site-config.js` to the real
  public ordering URL. While empty, "Se Capri Blue live" falls back to `/kontakt.html`.
- **WhatsApp number:** `js/site-config.js` `WHATSAPP_URL` and the priser.html button
  use `wa.me/46101850001` as a placeholder — swap for the real WhatsApp business number.
- **Step videos:** paste embed URLs into `STEP_VIDEOS` at the bottom of
  `sa-fungerar-det.html` (empty = "Video kommer snart" placeholder).
- **Hero PNG (1.1 MB):** `assets/images/amoora-system-01-hero.png` is only used as the
  social-share OG image (not rendered on-page), so it doesn't affect page load. To
  shrink it anyway (no image tool was available in my environment):
  `npx @squoosh/cli --webp auto assets/images/amoora-system-01-hero.png` or run it
  through squoosh.app / tinypng.com.
- **Deploy the site:** static host (Vercel `npx vercel --prod`, Netlify, Cloudflare
  Pages). No build step. Don't deploy `supabase/`, `docs/`, `SETUP.md`, `README.md` if
  you prefer — they're harmless but unnecessary on the web root.

---

## Quick smoke test after 1–5

1. `/kontakt.html` → submit the form → row appears in `leads` (source `contact_form`),
   you + the lead get email (once Resend is verified).
2. `/raknare.html` → "Skicka resultat" → row in `leads` (source `calculator`).
3. `/onboarding.html` → submit with a logo/menu file → row in `onboarding_submissions`,
   files in the `onboarding` storage bucket, visible via signed URLs in `/admin.html`.
