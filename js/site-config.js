/* ==========================================================================
   AMOORA — runtime config
   Safe to expose in the browser. The Supabase publishable (anon) key is
   designed to be public; all data access is locked down with RLS + Edge
   Functions (see supabase/migrations + supabase/functions).
   ========================================================================== */
window.AMOORA_CONFIG = {
  SUPABASE_URL: "https://yjudyrytavaudtlqiqvn.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_IUidL_R1tl2WwYEF19yK6Q_CxK5MJBz",
  FUNCTIONS_BASE: "https://yjudyrytavaudtlqiqvn.supabase.co/functions/v1",
  STORAGE_BUCKET: "onboarding",

  PHONE: "+46 10 185 00 01",
  PHONE_TEL: "+46101850001",
  TEAM_EMAIL: "info@amoora.se",
  WHATSAPP_URL: "https://wa.me/46101850001", // placeholder number per brief

  // Live ordering site of our first reference restaurant. Opens in a new tab.
  CAPRI_BLUE_URL: "https://www.capribluepizzeria.se/",
  // Screenshot of Capri Blue's real homepage, shown in the reference card on
  // the homepage. Paste the path once the file is in assets/ (e.g.
  // "assets/images/capri-blue-screenshot.png"). While empty, a tasteful
  // branded placeholder is shown inside the browser frame.
  CAPRI_BLUE_SCREENSHOT: "assets/images/capri-blue-screenshot.png",

  // ---- HOMEPAGE MEDIA ---------------------------------------------------
  // Paste the final hosted URLs here when ready (MP4/WebM, ideally a CDN).
  // While empty, the homepage shows a tasteful branded fallback — never a
  // broken player. Autoplay requires the file to be muted + web-optimised.
  //
  // Full-bleed hero background video (homepage):
  HERO_VIDEO_URL: "assets/WebHero.mp4",
  // "Så fungerar det" hero background image (restaurant vibe). Paste the path
  // once the file is in assets/ (e.g. "assets/images/sa-fungerar-hero.jpg").
  // While empty, a branded ink+coral gradient fallback is shown.
  HERO_IMAGE: "",
  // The three product-surface cards under "Allt din restaurang behöver".
  // Until a URL is set, each card shows its poster + "Video kommer snart".
  CARD_VIDEOS: {
    ordering: "", // Kundupplevelse & beställning
    admin: "",    // Admin-panel
    kitchen: ""   // Köks-app på terminalen
  }
};
