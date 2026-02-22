import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    // Check if admin already exists
    const { data: existing } = await supabase.from("profiles").select("id").eq("email", "admin@elevatehub.com").maybeSingle();
    if (existing) {
      return new Response(JSON.stringify({ message: "Admin already exists", id: existing.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Create admin user
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: "admin@elevatehub.com",
      password: "ElevateAdmin2026!",
      email_confirm: true,
      user_metadata: { full_name: "Admin Rapha" },
    });

    if (error) throw error;

    // Upgrade role to admin
    await supabase.from("user_roles").update({ role: "admin" }).eq("user_id", user.user.id);

    return new Response(JSON.stringify({ message: "Admin created", id: user.user.id }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
