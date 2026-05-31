# Amoora

> Restaurangernas egna beställningssystem — provisionsfri, egen design, helt din.
> Restaurants' own ordering system — commission-free, own design, fully yours.

A modern marketing website for **Amoora** — a commission-free ordering platform for Swedish restaurants, by Lynkrr AB.

## Live site

Production: https://amoora.se (placeholder — update when deployed)

## Tech stack

- HTML5 + semantic markup, static multi-page (no build step)
- Tailwind CSS (via CDN) + hand-written `css/style.css` design system
- Vanilla JavaScript (no frameworks)
- SE/EN i18n via `data-i18n` attributes; language persisted in `localStorage`
- **Backend:** Supabase (Postgres + RLS + Auth + Storage + Edge Functions)
- **Email:** Resend (via edge functions)
- Shared header/footer injected by `js/partials.js`; runtime config in `js/site-config.js`
- Schema.org Article markup on blog posts; Open Graph + Twitter Cards on every page

## Backend & setup

Lead capture, onboarding intake and the admin dashboard are powered by Supabase +
Resend. The frontend is wired and committed; provisioning the project is a one-time
manual step — **see [`SETUP.md`](SETUP.md)** (apply schema, deploy edge functions,
set `RESEND_API_KEY`, verify the domain, create your admin user).

- Public forms POST to edge functions `notify-lead` / `notify-onboarding` (no direct
  table access for the anon key — locked down with RLS).
- Admin dashboard: `/login.html` → `/admin.html` (allowlisted via the `admins` table).
- DB/Auth/Storage code lives in `supabase/` (migrations + functions).

## Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/index.html` | Hero, Foodora comparison, features, pricing teaser, social proof |
| How it works | `/sa-fungerar-det.html` | 5-step onboarding, features deep dive, customer flow, FAQ |
| Calculator | `/raknare.html` | Live sales calculator — variable Foodora/Wolt %, payback period, freedom date |
| Pricing | `/priser.html` | 3 plans, savings calculator, comparison table, FAQ accordion |
| Contact | `/kontakt.html` | Demo booking form (wired to Supabase + Resend) |
| Onboarding | `/onboarding.html` | Client intake form (post-signing); uploads to Storage |
| Login | `/login.html` | Supabase Auth login for staff |
| Admin | `/admin.html` | Leads + onboarding dashboard (admin-only) |
| Blog | `/blogg.html` | Article listing |
| Blog posts | `/blogg-1-...html` through `/blogg-5-...html` | 5 SEO-optimized articles |
| Legal | `/integritetspolicy.html`, `/villkor.html` | Privacy policy + terms |
| 404 | `/404.html` | Custom not-found page |

## Local development

This is a static site. To preview locally:

```bash
# Option 1: open directly in browser
open index.html   # macOS
start index.html  # Windows

# Option 2: simple HTTP server (Python 3)
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## Deployment

### Vercel (recommended)

```bash
npx vercel --prod
```

### Any static host

Upload the entire project root to any static hosting service (Netlify, Cloudflare Pages, GitHub Pages, etc.). No build step required.

## Project structure

```
amoora/
├── index.html
├── sa-fungerar-det.html
├── raknare.html
├── priser.html
├── kontakt.html
├── blogg.html
├── blogg-1-dolda-kostnaden.html
├── blogg-2-foodora-vs-wolt-jamforelse.html
├── blogg-3-digitalisera-pizzeria-vecka.html
├── blogg-4-roi-amoora.html
├── blogg-5-matmoms-capri-blue.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── logo-full.png
        ├── logo-text.png
        ├── favicon.svg
        ├── amoora-system-01-hero.png
        ├── amoora-system-02-menu.png
        ├── amoora-system-03-cart.png
        └── amoora-system-04-checkout.png
```

## Plans

- **Basic** — 24 999 kr + 549 kr/mån
- **Growth** — 39 999 kr + 549 kr/mån (most popular)
- **Premium** — 64 999 kr + 549 kr/mån

All prices excl. VAT. Payment via Klarna or Swish; 50% deposit on signing.

## Brand

- **Coral:** `#EA7056`
- **Ink:** `#1C1B1A`
- **Cream:** `#FFF9F6`
- **Heading font:** Space Grotesk
- **Body font:** Inter

## Social

- Instagram: [@amoora.se](https://www.instagram.com/amoora.se/)
- Facebook: [amooraapp](https://www.facebook.com/amooraapp)

## Contact

- Email: info@amoora.se
- Phone: +46 10 185 00 01

---

© 2026 Amoora. En produkt av Lynkrr AB. Alla rättigheter förbehållna.
