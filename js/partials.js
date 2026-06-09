/* ==========================================================================
   AMOORA — shared header + footer partials (no build step)
   Stops the copy-paste footer rot that corrupted the blog pages (audit Bug #2).
   Usage: place
       <div data-amoora-header data-active="blog"></div>
       ... page ...
       <div data-amoora-footer></div>
   and include THIS script before js/main.js. It injects the markup on
   DOMContentLoaded so main.js's i18n / nav wiring picks it up afterwards.
   ========================================================================== */
(function () {
  const NAV = [
    { href: "index.html", key: "nav.home", label: "Hem", id: "home" },
    { href: "sa-fungerar-det.html", key: "nav.how", label: "Så fungerar det", id: "how" },
    { href: "raknare.html", key: "nav.raknare", label: "Räknare", id: "raknare" },
    { href: "priser.html", key: "nav.pricing", label: "Priser", id: "pricing" },
    { href: "kontakt.html", key: "nav.contact", label: "Kontakt", id: "contact" },
  ];

  function navItems(active, mobile) {
    return NAV.map(
      (n) =>
        `<li><a href="${n.href}" class="nav-link${n.id === active ? " is-active" : ""}" data-i18n="${n.key}">${n.label}</a></li>`
    ).join("");
  }

  function headerHTML(active) {
    return `
  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand" aria-label="Amoora — startsida">
        <img src="assets/images/logo-full.png" alt="Amoora" height="44" width="132">
      </a>
      <nav class="main-nav" aria-label="Huvudmeny"><ul>${navItems(active)}</ul></nav>
      <div class="header-actions">
        <div class="lang-toggle" role="group" aria-label="Språk / Language">
          <button type="button" class="lang-opt is-active" data-lang="sv" aria-pressed="true">SV</button>
          <span class="lang-sep" aria-hidden="true">|</span>
          <button type="button" class="lang-opt" data-lang="en" aria-pressed="false">EN</button>
        </div>
        <a href="kontakt.html" class="btn btn-primary btn-sm header-cta" data-i18n="cta.bookDemo">Boka demo</a>
        <button type="button" class="hamburger" aria-label="Öppna meny" aria-expanded="false" aria-controls="mobileDrawer"><span></span></button>
      </div>
    </div>
  </header>
  <div class="drawer-backdrop" aria-hidden="true"></div>
  <aside class="mobile-drawer" id="mobileDrawer" aria-label="Mobilmeny">
    <button type="button" class="drawer-close" aria-label="Stäng meny">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <nav aria-label="Mobil huvudmeny"><ul>${navItems(active)}</ul></nav>
    <div class="lang-toggle" role="group" aria-label="Språk / Language" style="margin-top:1.5rem;width:max-content;">
      <button type="button" class="lang-opt is-active" data-lang="sv" aria-pressed="true">SV</button>
      <span class="lang-sep" aria-hidden="true">|</span>
      <button type="button" class="lang-opt" data-lang="en" aria-pressed="false">EN</button>
    </div>
    <a href="kontakt.html" class="btn btn-primary btn-block" data-i18n="cta.bookDemo">Boka demo</a>
  </aside>`;
  }

  function footerHTML() {
    return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid footer-grid--5">
        <div class="footer-col footer-brand">
          <img src="assets/images/logo-full.png" alt="Amoora" height="40" width="120">
          <p class="footer-tagline" data-i18n="footer.tagline">Äg ditt eget beställningssystem. Noll provision.</p>
          <p class="footer-lynkrr" data-i18n="footer.lynkrr">En produkt av Lynkrr AB</p>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.product">Produkt</h4>
          <ul>
            <li><a href="index.html" data-i18n="nav.home">Hem</a></li>
            <li><a href="sa-fungerar-det.html" data-i18n="nav.how">Så fungerar det</a></li>
            <li><a href="raknare.html" data-i18n="nav.raknare">Räknare</a></li>
            <li><a href="priser.html" data-i18n="nav.pricing">Priser</a></li>
            <li><a href="kontakt.html" data-i18n="footer.demo">Boka demo</a></li>
          </ul>
        </div>
        <div class="footer-col footer-blog">
          <h4 style="border-bottom:4px solid var(--coral);display:inline-block;padding-bottom:6px;" data-i18n="footer.blog">Blogg</h4>
          <ul>
            <li><a href="blogg.html">Alla artiklar</a></li>
            <li><a href="blogg-1-dolda-kostnaden.html">Den dolda kostnaden</a></li>
            <li><a href="blogg-2-foodora-vs-wolt-jamforelse.html">Foodora vs Wolt</a></li>
            <li><a href="blogg-3-digitalisera-pizzeria-vecka.html">Digitalisera på en vecka</a></li>
            <li><a href="blogg-4-roi-amoora.html">Räkna ut din ROI</a></li>
            <li><a href="blogg-5-matmoms-capri-blue.html">Matmoms-fönstret</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 data-i18n="footer.resources">Resurser</h4>
          <ul>
            <li><a href="priser.html#faq" data-i18n="footer.faq">Vanliga frågor</a></li>
            <li><a href="onboarding.html" data-i18n="footer.onboarding">Onboarding</a></li>
            <li><a href="integritetspolicy.html" data-i18n="footer.privacy">Integritetspolicy</a></li>
            <li><a href="villkor.html" data-i18n="footer.terms">Villkor</a></li>
          </ul>
        </div>
        <div class="footer-col footer-contact">
          <h4 data-i18n="footer.contactTitle">Kontakt</h4>
          <a href="tel:+46101850001">+46 10 185 00 01</a>
          <a href="mailto:info@lynkrr.se">info@lynkrr.se</a>
          <div class="social-row">
            <a href="https://www.instagram.com/amoora.se/" target="_blank" rel="noopener" aria-label="Följ Amoora på Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>
            </a>
            <a href="https://www.facebook.com/amooraapp" target="_blank" rel="noopener" aria-label="Följ Amoora på Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span data-i18n="footer.rights">© 2026 Amoora. Alla rättigheter förbehållna.</span>
        <nav aria-label="Juridiskt">
          <a href="integritetspolicy.html" data-i18n="footer.privacy">Integritetspolicy</a>
          <a href="villkor.html" data-i18n="footer.terms">Villkor</a>
        </nav>
      </div>
    </div>
  </footer>`;
  }

  function inject() {
    const h = document.querySelector("[data-amoora-header]");
    if (h) h.outerHTML = headerHTML(h.getAttribute("data-active") || "");
    const f = document.querySelector("[data-amoora-footer]");
    if (f) f.outerHTML = footerHTML();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
