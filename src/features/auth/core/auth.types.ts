import { LoginFormData, SignupFormData } from "../schemas/auth.schemas";

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatarUrl?: string;
};

export type AuthResult<T = void> =
  | { data: T; error: null }
  | { data: null; error: string };

export interface IAuthProvider {
  signUp(data: SignupFormData): Promise<AuthResult<AuthUser>>;
  signIn(data: LoginFormData): Promise<AuthResult<AuthUser>>;
  signOut(): Promise<AuthResult>;
  getUser(): Promise<AuthResult<AuthUser>>;
  signInWithGoogle(redirectTo?: string): Promise<AuthResult<{ url: string }>>;
}
