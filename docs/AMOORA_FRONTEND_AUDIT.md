# Amoora — Frontend Audit

> Read-only investigation. No site code was modified.
> Audited commit: `1a360d1` (“Initial commit: Amoora marketing site”).
> Date: 2026-05-31. Auditor: Claude Code.

This is the marketing/product website for **Amoora**, a productized commission-free
ordering platform for Swedish restaurants (clone-per-client model), by Lynkrr AB.
Below is a full structural, content, design, and build-state breakdown with file/line
references throughout.

---

## TL;DR verdict

A **static, hand-built multi-page HTML site** — no framework, no build step, no
backend. Visually it is **polished and design-mature**: a coherent coral/ink/cream
brand, a real design-token system, custom CSS (~2,500 lines), tasteful animations,
two working live calculators, and genuinely good Swedish marketing copy with a
complete EN translation layer.

But it is **not production-ready**, for three concrete reasons:

1. **The primary conversion form (the contact/demo booking form) is broken** — a
   JavaScript error kills its submit handler, so submissions go nowhere and the
   confirmation never fires. See [§7 / Bug #1](#bug-1--contact-form-is-non-functional-critical).
2. **All five blog pages and the blog index are structurally corrupted** — a full
   `<footer>` is pasted into the middle of the content area, the `<main>` is never
   closed, and the blog hero is missing. See [§7 / Bug #2](#bug-2--blog-pages-have-a-footer-injected-into-the-body-high).
3. **There is no backend.** Every form is a façade (console.log / alert / fake
   toast / redirect). Stripe, Supabase, Resend, etc. are named in copy only — nothing
   is wired. See [§6](#part-6--backend--integration-touchpoints).

Plus a scatter of dead `href="#"` links, a sitemap that points at filenames that
don’t exist, a 1.1 MB hero image, and Tailwind loaded from CDN but barely used.

**Fix first:** the contact form (it’s the whole point of the site), then the blog
templates, then wire forms to a real backend.

---

## Part 1 — Stack & structure

### Framework / build / language
- **No framework.** Plain HTML5, multi-page (MPA). One `.html` file per route.
- **No build tool, no bundler, no `package.json`, no `node_modules`.** Deploys by
  uploading the folder as-is (README confirms: Vercel or any static host, “No build
  step required”).
- **Language: vanilla JavaScript** (`js/main.js`, 1,703 lines) — no TypeScript, no
  dependencies.
- **Styling: two parallel systems** (see [§4](#part-4--branding--design-system)):
  - Hand-written CSS in `css/style.css` (2,514 lines) — this is where ~95% of the
    actual styling lives.
  - **Tailwind via CDN** (`<script src="https://cdn.tailwindcss.com">`, e.g.
    `index.html:34`) with a brand config block (`index.html:35-60`). In practice
    almost no Tailwind utility classes appear in the markup — the CDN is loaded on
    every page but mostly unused. **Tailwind’s own docs say the CDN build is not for
    production** (performance + flash-of-unstyled-content).
- **Lots of inline styles**: `style="..."` attributes are used heavily for one-off
  layout (e.g. `kontakt.html:105-156`, `raknare.html:48-205`, all of `404.html`).
  This is the main styling-consistency weakness.

### Folder structure
```
amoora/
├── index.html                       # Home (764 lines)
├── sa-fungerar-det.html             # How it works (488)
├── raknare.html                     # Calculator (276)
├── priser.html                      # Pricing (458)
├── kontakt.html                     # Contact / demo booking (315)
├── blogg.html                       # Blog index (251)  ⚠ structurally broken
├── blogg-1-dolda-kostnaden.html     # Blog post 1 (218) ⚠ structurally broken
├── blogg-2-foodora-vs-wolt-jamforelse.html   (213) ⚠
├── blogg-3-digitalisera-pizzeria-vecka.html  (210) ⚠
├── blogg-4-roi-amoora.html          (213) ⚠
├── blogg-5-matmoms-capri-blue.html  (213) ⚠
├── 404.html                         # Custom 404 (24)
├── sitemap.xml                      # ⚠ URLs don’t match real filenames
├── robots.txt                       # Allows all, points at sitemap
├── README.md                        # Good — documents stack, brand, pages
├── _audit.js                        # Dev-only i18n parity checker (see below)
├── .gitignore
├── css/
│   └── style.css                    # 2,514 lines — the real design system
├── js/
│   └── main.js                      # 1,703 lines (≈1,080 of which are translations)
└── assets/images/                   # logos, favicon, 4 product screenshots
```

- **`_audit.js`** (root) is a **Node.js dev utility**, not part of the site. It loads
  `I18N` from `main.js` in a `vm` sandbox and reports SV/EN key gaps and per-page
  missing keys. Harmless, but it shouldn’t ship to production (it’s in the web root).

### Routing — SPA or MPA?
**Multi-page (MPA).** Every nav link is a real `.html` file; navigation is full page
loads. No client-side router. Consequence: see the i18n note in [§3](#language) — the
chosen language **does not persist across page loads**.

### Dependencies
No `package.json`. Runtime “dependencies” are all third-party CDN/`<link>` includes:
- `https://cdn.tailwindcss.com` — Tailwind (CDN; see caveat above).
- `https://fonts.googleapis.com` / `fonts.gstatic.com` — Space Grotesk + Inter
  (`index.html:29-31`).
- Nothing heavy or unusual; no analytics, no tag manager, no cookie banner.

---

## Part 2 — Page & route inventory

All pages share the same header (logo, 5-item nav, SV|EN toggle, “Boka demo” CTA,
hamburger) and a 5-column footer. CTAs almost universally point to `kontakt.html`.

### `/index.html` — Home
Hero, Foodora comparison, features, how-it-works, viral engine, pricing teaser, social
proof, stats, final CTA.
| # | Section (line) | Contents | CTAs → |
|---|---|---|---|
| 1 | Hero `:125` | H1 “Noll provision. Äg ditt eget system.”, sub, trust line, device mockup | “Boka gratis demo” → `kontakt.html`; “Se Capri Blue live” → `#referens` |
| 2 | Problem/Solution `:200` (dark) | Foodora-vs-Amoora compare cards | — |
| 3 | Calculator promo `:259` | Coral band “Spara 30%…” | “Öppna räknaren” → `raknare.html` |
| 4 | Features bento `:269` | 7 feature cards | — |
| 5 | How it works `:348` | 4 steps | “Se hur det fungerar i detalj” → `sa-fungerar-det.html` |
| 6 | Viral engine `:389` | “Drivs av Amoora” receipt mock | — |
| 7 | Urgency band `:437` | 6% matmoms-through-2027 message | — |
| 8 | Pricing teaser `:451` | 3 plan cards (25k/35k/45k) | “Boka demo” ×3 → `kontakt.html`; “Se fullständiga priser” → `priser.html` |
| 9 | Social proof `:517` | Reference case (Capri Blue), logo marquee, 3 testimonials | **“Se Capri Blue live” → `href="#"` (dead, `:535`)** |
| 10 | Stats band `:646` (dark) | Animated counters 0% / 360 000 kr / 100% / 7 | — |
| 11 | Final CTA `:670` (coral) | Email capture form | submit → `kontakt.html?email=…`; phone `tel:` |

### `/sa-fungerar-det.html` — How it works
Hero + 3 promise stats → 5-step onboarding (clone template, Supabase DB, design page,
buy Sunmi terminal, test/launch) → 6-feature grid → 4-step customer flow (dark) →
viral section → hardware (Sunmi) → support band → 3-item FAQ → final CTA email form.
CTAs → `kontakt.html`, `priser.html`, `priser.html#faq`, `index.html#referens`.

### `/raknare.html` — Calculator (live, working)
Hero → interactive calculator (3 scenario presets, 2 range sliders, advanced
commission % toggle) → live results (yearly loss, payback days, “freedom date”,
equivalents in ovens/employees/vacations, 3-bar chart Foodora/Wolt/Amoora) → “email me
the result” form → trust cards → coral final CTA. Calculator logic in
`main.js:1299` (`initCalculator`). Constants: Amoora year-1 = **40 940 kr**, annual =
**5 940 kr** (`main.js:1326-1327`).

### `/priser.html` — Pricing
Hero → 3 plan cards (System/Plus/Pro) with include/exclude lists → Klarna band →
savings calculator (single revenue input, `main.js:1464` `initSavingsCalculator`) →
12-row plan comparison table → “added costs” (Sunmi ~3 200 kr, Stripe fees) →
12-question FAQ accordion → coral final CTA. **Dead link:** Klarna “läs mer”
`href="#"` (~`:223`). Plan CTAs → `kontakt.html`.

### `/kontakt.html` — Contact / demo booking
Hero (trust badges) → two-column: **booking form** (left) + contact cards / “what
happens after you book” / trust signals (right) → FAQ redirect → phone/email CTA.
**The form is the site’s primary conversion path and it is broken — see [§7 Bug #1].**

### `/blogg.html` — Blog index ⚠
Intended: hero + filter chips + article grid (5 posts) + newsletter band + social
follow. **Actually broken** — the blog hero (`:90`) contains a pasted-in `<footer>`
(`:91-151`) instead of the hero heading; article cards appear orphaned afterward
(`:152+`). See [§7 Bug #2].

### `/blogg-1..5-*.html` — Blog posts ⚠
Five SEO articles (Awareness / Comparison / Guide / Economy / Case-study). Post 1
(`blogg-1-dolda-kostnaden.html`) has **real, substantive Swedish prose** (`:96-111`):
intro, two `<h2>` (“Provisionsfällan”, “Varför eget system är bättre”), a list, a
blockquote. **All five share the same structural corruption** (footer injected at body
level, no `</main>`). Titles:
1. Den dolda kostnaden med Foodora (Awareness)
2. Foodora vs Wolt — jämförelse (Comparison)
3. Digitalisera din pizzeria på en vecka (Guide)
4. Räkna ut din ROI (Economy)
5. Matmoms-fönstret / Capri Blue (Case study)

### `/404.html` — Not found
Tiny (24 lines), fully inline-styled, centered card with logo, “404 — Sidan finns
inte”, and two CTAs → `index.html` / `kontakt.html`. Clean and works. Not
internationalized (hardcoded Swedish).

---

## Part 3 — Content inventory

### Language
**Bilingual: Swedish (default) + English.** No Arabic.
- Mechanism: `data-i18n` / `data-i18n-html` / `data-i18n-placeholder` /
  `data-i18n-aria` attributes resolved against the `I18N` dictionary in
  `main.js:9-1091`. SV is the source language; EN is a full parallel translation.
- The dictionary is large and **near-complete**: nav, hero, features, how-it-works,
  viral, pricing, the full calculator, the full pricing page (incl. 12 FAQ Q&As),
  contact, “how it works”, testimonials, footer.
- ⚠ **Language choice is in-memory only and NOT persisted** (`main.js:1094`,
  comment: “NOT persisted”). Because this is an MPA, switching to EN and clicking any
  link **resets the page to Swedish.** EN is effectively unusable for browsing.
- ⚠ **Blog article bodies are hardcoded Swedish** (e.g. `blogg-1:96-111`) with no
  `data-i18n` — so blog content never translates. The `_audit.js` tool exists
  precisely to catch SV/EN key gaps, implying i18n parity is actively maintained for
  everything except the blog.
- Minor: duplicate key `sa_fungerar.hero.sub` (`main.js:276-277`); the SV block has
  `priser.faq.a12` and `ref.label` jammed onto one line (`main.js:500`). Valid JS,
  just messy.

### Copy quality
Real, professional, conversion-oriented Swedish copy throughout — **not lorem ipsum.**
The value prop is consistent and sharp: *own your system, zero commission, one-time
cost, live in ~7 days, every receipt says “Drivs av Amoora.”*

### Pricing (as stated in markup)
- **Amoora System** — 25 000 kr + moms, + från 495 kr/mån
- **Amoora Plus** — 35 000 kr + moms (“Mest populär”)
- **Amoora Pro** — 45 000 kr + moms
- Klarna split: System fr. 2 084/mån, Plus 2 917/mån, Pro 3 750/mån (12 mån)
- Add-ons: Sunmi terminal ~3 200 kr one-time; Stripe ~1,5 % + 1,80 kr/txn
- Stats band claims: 0 % provision, **360 000 kr** saved/yr (typical pizzeria),
  100 % of direct revenue, 7 days to launch.

### FAQ
- `priser.html`: **12 Q&As** (fully translated SV/EN, `main.js:476-499` / `1015-1039`).
- `sa-fungerar-det.html`: 3 Q&As. `kontakt.html`: 3 Q&As.

### Testimonials / social proof — **honest placeholders**
- 3 testimonials (Marco B. / Sara L. / Ahmed K.) each carry a **“Exempel” / “Sample”
  tag** (`index.html:587`, `proof.sample`) — explicitly flagged as not-real. Good.
- Logo marquee (Bella Napoli, Pizzeria Sole, Kebab House, Trattoria Roma, Sushi Nord,
  Burgaren — `index.html:569-581`) are **fictional**, presented as plain text, no
  logos.
- The only named real reference is **Capri Blue Pizzeria** (“first customer, live
  now”) — but the “See Capri Blue live” button is a dead `href="#"` (`index.html:535`),
  so there’s no actual live link yet.

### Footer / legal
5 columns (Brand, Produkt, Blogg, Resurser, Kontakt) + bottom bar “© 2026 Amoora.
Alla rättigheter förbehållna.” Phone +46 10 185 00 01, email info@amoora.se, IG
@amoora.se, FB amooraapp. **“Integritetspolicy” and “Villkor” are `href="#"`
everywhere — the privacy policy and terms pages do not exist**, yet the contact form
asks users to consent to a privacy policy (`kontakt.html:153`).

---

## Part 4 — Branding & design system

### Source of truth — **partly tokenized, but defined twice**
Design tokens exist (good), but they live in **two places that must be kept in sync
by hand**:
1. **CSS custom properties** — `css/style.css:9-48` (`:root`). This is the real
   source; almost all CSS references `var(--coral)` etc.
2. **Tailwind config** — repeated in every page’s inline `<script>`
   (`index.html:35-60` and identical copies in priser/kontakt/sa-fungerar/blogg/posts).

So the same hex values are duplicated across the `:root` block **and** N inline
Tailwind configs. Change a brand color → must edit it in ~8 places. Plus many
hardcoded hex/inline styles (e.g. `404.html`, various `style="background:var(--coral)"`
overrides). **Not a single source of truth.**

### Colors
| Token | Hex | Defined |
|---|---|---|
| coral | `#EA7056` | `:root` + every tailwind config |
| coral-dark | `#D85B40` | same |
| coral-soft | `#FBE4DD` | same |
| ink | `#1C1B1A` | same |
| ink-soft | `#2B2A28` | same |
| cream | `#FFF9F6` | same |
| white | `#FFFFFF` | `:root` |
| gray / graytext | `#6B6764` | same |
| border / bordersoft | `#EFE9E5` | same |

Note a small naming inconsistency: CSS uses `--gray`/`--border`; Tailwind config uses
`graytext`/`bordersoft`. Inline styles reference both `var(--graytext)` and
`var(--gray)` / `var(--bordersoft)` and even `var(--cream-bg)` (`kontakt.html:162`)
**which is not defined** — a latent “undefined variable” style bug.

### Typography
- **Display/headings:** Space Grotesk (400–700). **Body:** Inter (400–700). Loaded
  from Google Fonts.
- Fluid type scale via `clamp()` (`style.css:22-27`): `--hero-h1` 2.75→5rem,
  `--section-h2` 2→3.25rem, `--card-h3` 1.375rem, body 1rem, label 0.8125rem.

### Spacing / radius / shadow conventions
- Radii (`style.css:30-33`): card 24px, button 14px, small 12px, pill 999px.
- Shadows (`:36-38`): `--shadow-soft`, `--shadow-lift`, `--shadow-coral`.
- Layout: `--container` 1200px, `--gutter` 24px, `--bento-gap` 20px.
- Motion: `--ease` cubic-bezier(.22,1,.36,1), `--dur` 200ms.
- Section rhythm via `clamp(4rem,8vw,7rem)` padding.

### Logo & favicon
- `assets/images/logo-full.png` (25 KB), `logo-text.png` (18 KB) — raster PNG (no SVG
  logo).
- `assets/images/favicon.svg` (1 KB) — a clean inline SVG: coral→peach gradient
  rounded square with a stylized white card mark. Good, scalable.

### Visual style
Modern conversion-optimized SaaS landing page: warm cream background, coral accent,
near-black ink text, rounded “bento” cards, soft shadows, CSS-drawn device/receipt/
browser mockups (no screenshots needed for those), a logo marquee, scroll-reveal fade-
ups, and animated stat counters. Cohesive and contemporary — the design work is the
strongest part of this codebase.

---

## Part 5 — Components & assets

### “Components”
There’s no component system (no framework, no includes/partials). **Every page
re-inlines the full header + footer markup**, so the nav/footer are copy-pasted ~11
times. This is exactly why the blog footer corruption ([§7 Bug #2]) and the
sitemap/link drift happen — there’s no shared template to fix in one place.

Reusable *CSS* patterns (the de-facto component library) include: `.btn`
(`.btn-primary` / `-secondary` / `-ghost-light` / `-outline` / `-block` / `-sm`),
`.bento-card`, `.price-card`, `.compare-card`, `.testimonial`, `.step`, `.calculator-*`,
`.ref-browser`, `.receipt-card`, `.device-laptop` / `.device-phone`, `.marquee`,
`.fade-up`, `.eyebrow`, `.section-head`.

### Images
| File | Size | Notes |
|---|---|---|
| `amoora-system-01-hero.png` | **1.1 MB** | ⚠ Very heavy; not actually used as `<img>` in index hero (hero uses CSS mockups) — only referenced as OG image. |
| `amoora-system-02-menu.png` | 190 KB | Used in blog cards |
| `amoora-system-03-cart.png` | 242 KB | Blog cards |
| `amoora-system-04-checkout.png` | 105 KB | Blog cards |
| `logo-full.png` | 25 KB | Header/footer logo |
| `logo-text.png` | 18 KB | Unused? (not referenced in the pages reviewed) |
| `favicon.svg` | 1 KB | Favicon |

No `srcset`/responsive images, no `loading="lazy"`, no WebP/AVIF, no width/height on
most `<img>` (CLS risk). The 1.1 MB OG PNG should be compressed.

### Animations / interactivity
- Scroll-reveal via `IntersectionObserver` (`main.js:1202` `initScrollReveal`),
  respects `prefers-reduced-motion`.
- Animated counters, easeOutCubic (`main.js:1234`).
- Mobile drawer, sticky-header shadow on scroll, smooth anchor scrolling
  (`main.js:1144` `initNavigation`).
- Two live calculators (raknare + priser savings) with a per-second “you’ve lost X kr
  since opening this page” ticker (`main.js:1391`).
- Copy-link buttons for blog share (`main.js:1281`).
- Marquee + CSS hover transitions.
All animation code defensively checks for `prefers-reduced-motion` and falls back when
`IntersectionObserver` is missing. Solid.

### Forms (and where submissions go — spoiler: nowhere)
| Form | File | Handler | Result |
|---|---|---|---|
| Final CTA email | index, sa-fungerar | `main.js:1520` `initCtaForm` | Redirects to `kontakt.html?email=…`. No storage. |
| Contact / demo booking | kontakt | inline `:298-313` **+** `main.js:1535` `initContactForm` | **BROKEN — see Bug #1.** Intended: console.log + `alert()`. No backend. |
| Calculator “email result” | raknare | `main.js:1443` | Shows a fake success/error **toast**. Email is discarded. |
| Savings calc | priser | `main.js:1464` | Pure client-side math; no submit. |
| Newsletter | blogg | (relies on `main.js`) | No backend. |

Contact form fields (`kontakt.html:110-157`): name (required), email (required),
phone (optional), **plan radios** system/plus/pro/unsure (system pre-checked), message
(required), privacy consent checkbox (required). Note: even the *intended* inline
handler only reads name/email/phone/message — it **ignores the selected plan and the
consent checkbox.**

---

## Part 6 — Backend / integration touchpoints

**There is no backend. The site is 100% static frontend.** Verified across all HTML
and `main.js`:
- **No `fetch()`, no XHR, no API endpoints, no env vars, no secrets/keys** anywhere.
- **Supabase / Stripe / Vercel / Klarna / Sunmi / Logiscenter** appear **only as
  marketing prose** (e.g. `sa-fungerar-det` onboarding steps, `priser` FAQ). No SDKs,
  no client libraries, no config. Nothing is integrated.
- **No Resend / email service, no Google Maps, no analytics, no tag manager, no cookie
  consent.**
- Hardcoded URLs are limited and benign: the production domain `https://amoora.se/`
  (canonical/OG/sitemap), Google Fonts, Tailwind CDN, and the IG/FB social profiles.
- Phone `tel:+46101850001` and `mailto:info@amoora.se` are the only working
  “contact” paths.

Implication: until a backend (or a form service like Formspree/Resend/a Supabase
function) is added, **the site cannot capture a single lead** except via phone/email.

---

## Part 7 — State of build

### What’s finished and good
- Home, How-it-works, Calculator, Pricing pages: complete, polished, on-brand.
- Both calculators work and are genuinely well done.
- i18n SV/EN dictionary is comprehensive (minus persistence + blog bodies).
- SEO basics: per-page `<title>`/description/keywords, canonical, **Open Graph +
  Twitter cards on every page**, `robots.txt`, `sitemap.xml`.
- Accessibility is above average: `aria-label`s, `.sr-only`, `:focus-visible`
  outlines, `aria-live` regions on calculators, `prefers-reduced-motion` everywhere,
  semantic landmarks.

### Bugs & gaps (ordered by severity)

#### Bug #1 — Contact form is non-functional (CRITICAL)
The demo-booking form is the site’s main goal, and it doesn’t work:
- `kontakt.html:299` runs `document.getElementById('bookDemoBtn').addEventListener(...)`,
  but **no element with `id="bookDemoBtn"` exists on the page** (verified — the only
  occurrence is that line). `getElementById` returns `null`, so `.addEventListener`
  throws a `TypeError`, which **aborts the entire inline `<script>` before the submit
  handler at `:303` is ever registered.**
- Net effect: submitting the form triggers a **native browser submission** (GET to
  `kontakt.html` with query params), the page reloads, the data goes nowhere, and the
  intended `alert('Tack…')` never appears.
- Meanwhile `main.js:1535` `initContactForm()` targets selector
  **`.contact-booking-form`**, but the actual form’s class is **`.contact-form`**
  (`kontakt.html:110`). So that function hits `if (!form) return;` (`:1538`) and does
  nothing. **All of its validation, field-error UI, submit-enable logic, and
  `#contactSuccess` panel (~140 lines) are dead code on this page** — and the
  `#contactSuccess`, `#contactRestaurant`, `#contactCity`, `#contactRevenue` elements
  it references don’t exist in the HTML. There’s clear drift between an older,
  richer intended form and the shipped one.
- **Fix:** remove/guard the `bookDemoBtn` line; reconcile the two handlers (pick one);
  align selectors and field IDs; and wire submission to a real endpoint.

#### Bug #2 — Blog pages have a `<footer>` injected into the body (HIGH)
On `blogg.html` the blog-hero section opens at `:90` and is **immediately filled with
a complete `<footer class="site-footer">` (`:91-151`)** — the hero heading/intro is
missing — followed by orphaned article-card markup (`:152+`). The same corruption is
in the posts: `blogg-1-dolda-kostnaden.html` opens `<main>` at `:87`, renders the
article, then drops a full footer **inside the content `<section>`** at `:112-172`,
and **`</main>` is never emitted** (a second `</footer>` appears at `:214`). All five
posts share this. Result: blog pages render a footer in the middle/top of the body and
have invalid, unclosed structure. **Fix:** rebuild the blog templates (and ideally
introduce a shared header/footer include to stop the copy-paste rot).

#### Bug #3 — Sitemap points at non-existent URLs (MEDIUM, SEO)
`sitemap.xml:15-29` lists `blogg-1.html` … `blogg-5.html`, but the real files are
`blogg-1-dolda-kostnaden.html`, `blogg-2-foodora-vs-wolt-jamforelse.html`, etc. **All
five blog sitemap entries 404.** Also missing `raknare.html` from the sitemap. Sitemap
entries have no `<lastmod>`/`<priority>` (minor).

#### Bug #4 — Dead links throughout (MEDIUM)
- “Integritetspolicy” and “Villkor” → `href="#"` on every page (footer + bottom bar),
  yet the contact form requires consent to a privacy policy that doesn’t exist.
- “Se Capri Blue live” → `href="#"` (`index.html:535`) — the headline proof point and
  a hero CTA target (`#referens` scrolls to the same dead button).
- Klarna “Läs mer” → `href="#"` (`priser.html` ~`:223`).

#### Bug #5 — Performance / asset hygiene (LOW–MEDIUM)
- Tailwind CDN loaded on every page but barely used → ship cost + FOUC for no benefit.
  Either adopt Tailwind properly (build step + purge) or drop it and keep `style.css`.
- 1.1 MB hero PNG (OG image); no image compression, `srcset`, `lazy`, or width/height.
- `_audit.js` sits in the web root (dev tool shouldn’t deploy).
- Undefined CSS var `--cream-bg` (`kontakt.html:162`) and the `--gray`/`--graytext`
  naming split.

### Responsiveness
**Appears responsive** (not verified in a live browser). `style.css` has a full set of
breakpoints — `@media (max-width: 1024 / 980 / 880 / 720 / 640 / 600px)` (e.g.
`:909, :918, :1584, :1939, :1945, :1950, :2493, :2506`) plus a mobile hamburger drawer
and fluid `clamp()` type. Grids collapse to single column at the small breakpoints.
The heavy use of inline styles on `kontakt.html` and `raknare.html` is where mobile
layout is most likely to need a real-device check (e.g. the fixed 2-column grid at
`kontakt.html:105`).

### Dead / drifted code
- `main.js` `initContactForm()` (~140 lines) — unused (wrong selector; see Bug #1).
- `logo-text.png` — not referenced by any reviewed page.
- Duplicate i18n key + cramped lines in `main.js` (cosmetic).

---

## Summary — what to act on, in order

1. **Fix the contact form (Bug #1).** It’s the entire conversion funnel and it’s
   currently dead. Then **give all forms a real backend** (Supabase function, Resend,
   or a form service) — right now no lead can be captured except by phone/email.
2. **Rebuild the blog templates (Bug #2)** — index + all 5 posts have a footer pasted
   into the body and unclosed `<main>`. While doing it, factor out a shared
   header/footer so this class of bug can’t recur across 11 hand-maintained copies.
3. **Fix `sitemap.xml` (Bug #3)** to use real filenames and add `raknare.html`.
4. **Create privacy policy + terms pages and fix all `href="#"` dead links (Bug #4)** —
   especially the “Se Capri Blue live” proof CTA and the consent link the form depends
   on.
5. **Persist the language choice** (localStorage + read on load) and add `data-i18n`
   to blog bodies, or EN is effectively broken site-wide.
6. **Asset/build cleanup (Bug #5):** decide on Tailwind (proper build or remove),
   compress the 1.1 MB hero image, add `loading="lazy"`/dimensions, remove `_audit.js`
   from the deploy, and consolidate design tokens to one source.

**Bottom line:** the design and copy are strong and most of the marketing pages are
genuinely good. The site is held back by a broken primary form, corrupted blog
templates, and the complete absence of a backend — all fixable, and worth fixing
before any new feature work.
