import { createClient } from "@/lib/supabase/server";
import { SupabaseAuthProvider } from "./providers/supabase.provider";
import { IAuthProvider } from "./core/auth.types";

export async function getAuthService(): Promise<IAuthProvider> {
  const supabase = await createClient();
  return new SupabaseAuthProvider(supabase);
}
