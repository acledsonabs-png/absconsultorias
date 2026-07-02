import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://epcnujsdoxnwkbeemxyv.supabase.co";
const SUPABASE_ANON_KEY = "COLE_SUA_ANON_KEY_AQUI";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === "COLE_SUA_ANON_KEY_AQUI") {
  throw new Error("Configure a SUPABASE_ANON_KEY em supabase.js.");
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
