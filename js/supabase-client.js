/* ES module — shared Supabase client for pages that need Auth/Storage/DB
   (onboarding.html, login.html, admin.html). Public marketing pages talk to
   Edge Functions over fetch() instead and do NOT need this. */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cfg = window.AMOORA_CONFIG || {};
export const SUPABASE_URL = cfg.SUPABASE_URL;
export const SUPABASE_ANON_KEY = cfg.SUPABASE_ANON_KEY;
export const FUNCTIONS_BASE = cfg.FUNCTIONS_BASE;
export const STORAGE_BUCKET = cfg.STORAGE_BUCKET || "onboarding";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
