import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "🚨 خطأ: تأكد من إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY إلى ملف .env"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
