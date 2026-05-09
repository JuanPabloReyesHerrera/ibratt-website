"use client";

import { cn } from "@/lib/utils";
import { AuthMode } from "../store/checkout.store";

// Importa tus formularios existentes
import { LoginForm } from "@/features/auth/login-form";
import { SignUpForm } from "@/features/auth/signup-form";

type Props = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onSuccess: () => void; // Llama a esto cuando auth sea exitosa → avanza al siguiente paso
};

export function CheckoutAuthStep({ mode, onModeChange, onSuccess }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-1">
          {mode === "signup" ? "Crea tu cuenta" : "Inicia sesión"}
        </h3>
        <p className="text-sm text-zinc-500">
          {mode === "signup"
            ? "Necesitas una cuenta para guardar tus compras y descargar tus archivos."
            : "Accede a tu cuenta para continuar."}
        </p>
      </div>

      {/* Toggle signup / login */}
      <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 p-1 mb-6">
        {(["signup", "login"] as AuthMode[]).map((m) => (
          <button
            key={m}
            onClick={() => onModeChange(m)}
            className={cn(
              "flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200",
              mode === m
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-600 hover:text-zinc-400",
            )}
          >
            {m === "signup" ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        ))}
      </div>

      {/* Form */}
      {mode === "signup" ? (
        <SignUpForm onSuccess={onSuccess} />
      ) : (
        <LoginForm onSuccess={onSuccess} />
      )}
    </div>
  );
}
