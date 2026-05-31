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

  // TODO: set to the real public Capri Blue ordering URL once live.
  // While empty, "Se Capri Blue live" links fall back to the contact page.
  CAPRI_BLUE_URL: ""
};
