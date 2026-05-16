/**
 * SUPABASE AUTH PROVIDER
 *
 * Implementación del proveedor de autenticación usando Supabase.
 * Características:
 * - Sign Up: registro con email, contraseña, nombre y teléfono
 * - Sign In: login con email y contraseña
 * - Sign Out: cierre de sesión
 * - Get User: obtiene usuario actual de la sesión
 * - Google OAuth: autenticación con Google (redirect)
 * - Mapper: convierte User de Supabase a AuthUser normalizado
 *
 * Patrón: implementa IAuthProvider para ser intercambiable con otros proveedores
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { IAuthProvider, AuthResult, AuthUser } from "../core/auth.types";
import { LoginFormData, SignupFormData } from "../schemas/auth.schemas";

export class SupabaseAuthProvider implements IAuthProvider {
  constructor(private supabase: SupabaseClient) {}

  /**
   * Sign Up
   * Crea una nueva cuenta con email, contraseña, nombre y teléfono.
   * Los datos adicionales (name, phone) se guardan en user_metadata de Supabase.
   */
  async signUp(data: SignupFormData): Promise<AuthResult<AuthUser>> {
    const { data: result, error } = await this.supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // Metadatos adicionales almacenados en user_metadata
        data: {
          full_name: data.name,
          phone: data.phone,
        },
      },
    });

    // Si hay error de Supabase, retorna error
    if (error) return { data: null, error: error.message };

    // Si no se creó el usuario (caso raro), retorna error
    if (!result.user)
      return { data: null, error: "No se pudo crear la cuenta" };

    // Mapea el usuario de Supabase a AuthUser normalizado
    return {
      data: mapUser(result.user),
      error: null,
    };
  }

  /**
   * Sign In
   * Inicia sesión con email y contraseña.
   */
  async signIn(data: LoginFormData): Promise<AuthResult<AuthUser>> {
    const { data: result, error } = await this.supabase.auth.signInWithPassword(
      {
        email: data.email,
        password: data.password,
      },
    );

    // Si hay error (credenciales inválidas, etc.)
    if (error) return { data: null, error: error.message };

    // Si no se obtuvo usuario
    if (!result.user) return { data: null, error: "Credenciales inválidas" };

    return {
      data: mapUser(result.user),
      error: null,
    };
  }

  /**
   * Sign Out
   * Cierra la sesión actual eliminando el token.
   */
  async signOut(): Promise<AuthResult> {
    const { error } = await this.supabase.auth.signOut();
    if (error) return { data: null, error: error.message };
    return { data: undefined, error: null };
  }

  /**
   * Get User
   * Obtiene el usuario actualmente autenticado desde la sesión.
   * Retorna null si no hay sesión activa.
   */
  async getUser(): Promise<AuthResult<AuthUser>> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error) return { data: null, error: error.message };
    if (!user) return { data: null, error: "No hay sesión activa" };

    return { data: mapUser(user), error: null };
  }

  /**
   * Sign In With Google
   * Inicia OAuth con Google y retorna la URL de redirección.
   * El usuario debe ser redirigido a esta URL para completar el flujo.
   */
  async signInWithGoogle(
    redirectTo?: string,
  ): Promise<AuthResult<{ url: string }>> {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Usa URL de callback personalizada o por defecto NEXT_PUBLIC_SITE_URL
        redirectTo:
          redirectTo ?? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) return { data: null, error: error.message };
    if (!data.url) return { data: null, error: "No se pudo iniciar OAuth" };

    return { data: { url: data.url }, error: null };
  }
}

/**
 * mapUser
 * Mapper que convierte User de Supabase a AuthUser normalizado.
 * Abstrae los detalles de Supabase del resto de la aplicación.
 *
 * Ventaja: si cambias de proveedor (Firebase, Auth0, etc.),
 * solo cambias este mapper, el resto de la app sigue igual.
 */
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
