"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthService } from "../auth.service";
import { LoginFormData, SignupFormData } from "../schemas/auth.schemas";
import { AuthResult, AuthUser } from "../core/auth.types";

// ─── Sign Up ───────────────────────────────────────────────────────────────────
export async function signupAction(
  data: SignupFormData,
): Promise<AuthResult<AuthUser>> {
  const auth = await getAuthService();
  const result = await auth.signUp(data);

  if (result.error) return result;

  revalidatePath("/", "layout");
  return result;
}

// ─── Sign In ───────────────────────────────────────────────────────────────────
export async function loginAction(
  data: LoginFormData,
): Promise<AuthResult<AuthUser>> {
  const auth = await getAuthService();
  const result = await auth.signIn(data);

  if (result.error) return result;

  revalidatePath("/", "layout");
  return result;
}

// ─── Sign Out ──────────────────────────────────────────────────────────────────
export async function signoutAction(): Promise<void> {
  const auth = await getAuthService();
  await auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

// ─── Google OAuth ──────────────────────────────────────────────────────────────
// Retorna la URL — el cliente hace el redirect (no podemos redirect() en OAuth)
export async function signInWithGoogleAction(
  redirectTo?: string,
): Promise<AuthResult<{ url: string }>> {
  const auth = await getAuthService();
  return auth.signInWithGoogle(redirectTo);
}
