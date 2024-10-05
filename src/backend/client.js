import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.SUPABASE_PROJECT_URL;

const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error("supabaseKey is required.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);