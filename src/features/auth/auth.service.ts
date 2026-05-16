/**
 * AUTH SERVICE FACTORY
 *
 * Factory que crea y retorna una instancia del proveedor de autenticación.
 * Características:
 * - Abstrae la creación del cliente Supabase
 * - Retorna la interfaz IAuthProvider (no la implementación concreta)
 * - Permite cambiar de proveedor sin afectar el resto de la app
 * - Async para soportar inicialización asíncrona del cliente
 *
 * Patrón: Dependency Injection + Factory Pattern
 */

import { createClient } from "@/lib/supabase/server";
import { SupabaseAuthProvider } from "./providers/supabase.provider";
import { IAuthProvider } from "./core/auth.types";

/**
 * getAuthService
 * Factory function que retorna el proveedor de autenticación inyectado.
 *
 * Flujo:
 * 1. Crea cliente Supabase (async)
 * 2. Instancia SupabaseAuthProvider con el cliente
 * 3. Retorna la interfaz IAuthProvider (desacoplado de implementación)
 *
 * Ventaja: Si cambias a Firebase o Auth0, solo cambias esta función
 * y el resto de la app sigue funcionando sin cambios.
 */
export async function getAuthService(): Promise<IAuthProvider> {
  const supabase = await createClient();
  return new SupabaseAuthProvider(supabase);
}
