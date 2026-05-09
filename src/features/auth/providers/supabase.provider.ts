import { SupabaseClient } from "@supabase/supabase-js";
import { IAuthProvider, AuthResult, AuthUser } from "../core/auth.types";
import { LoginFormData, SignupFormData } from "../schemas/auth.schemas";

export class SupabaseAuthProvider implements IAuthProvider {
  constructor(private supabase: SupabaseClient) {}

  // ─── Sign Up ───────────────────────────────────────────────────────────────
  async signUp(data: SignupFormData): Promise<AuthResult<AuthUser>> {
    const { data: result, error } = await this.supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          phone: data.phone,
        },
      },
    });

    if (error) return { data: null, error: error.message };
    if (!result.user)
      return { data: null, error: "No se pudo crear la cuenta" };

    return {
      data: mapUser(result.user),
      error: null,
    };
  }

  // ─── Sign In ───────────────────────────────────────────────────────────────
  async signIn(data: LoginFormData): Promise<AuthResult<AuthUser>> {
    const { data: result, error } = await this.supabase.auth.signInWithPassword(
      {
        email: data.email,
        password: data.password,
      },
    );

    if (error) return { data: null, error: error.message };
    if (!result.user) return { data: null, error: "Credenciales inválidas" };

    return {
      data: mapUser(result.user),
      error: null,
    };
  }

  // ─── Sign Out ──────────────────────────────────────────────────────────────
  async signOut(): Promise<AuthResult> {
    const { error } = await this.supabase.auth.signOut();
    if (error) return { data: null, error: error.message };
    return { data: undefined, error: null };
  }

  // ─── Get current user ──────────────────────────────────────────────────────
  async getUser(): Promise<AuthResult<AuthUser>> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();
    if (error) return { data: null, error: error.message };
    if (!user) return { data: null, error: "No hay sesión activa" };
    return { data: mapUser(user), error: null };
  }

  // ─── Google OAuth ──────────────────────────────────────────────────────────
  async signInWithGoogle(
    redirectTo?: string,
  ): Promise<AuthResult<{ url: string }>> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          redirectTo ?? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) return { data: null, error: error.message };
    if (!data.url) return { data: null, error: "No se pudo iniciar OAuth" };

    return { data: { url: data.url }, error: null };
  }
}

// ─── Mapper ────────────────────────────────────────────────────────────────────
// Convierte el User de Supabase a tu AuthUser propio
// Si cambias de proveedor, solo cambias este mapper
function mapUser(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, string>;
}): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.full_name,
    phone: user.user_metadata?.phone,
    avatarUrl: user.user_metadata?.avatar_url,
  };
}
