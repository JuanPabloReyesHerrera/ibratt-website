/**
 * Tipos del módulo de contacto.
 * Compartidos entre el formulario, la server action y los canales directos.
 */

// Asuntos disponibles en el selector del formulario
export type ContactSubject =
  | "licensing"
  | "collaboration"
  | "custom_beat"
  | "mixing_mastering"
  | "general";

// Datos que captura el formulario
export interface ContactFormData {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
}

// Estado del ciclo de vida del envío
export type ContactFormStatus = "idle" | "loading" | "success" | "error";

export interface ContactFormState {
  status: ContactFormStatus;
  message?: string;
}

// Canal de contacto directo (WhatsApp, Instagram, etc.)
// Construido en ContactSection a partir de siteConfig
export interface ContactChannel {
  id: string;
  label: string;
  handle: string;
  url: string;
  className?: string;
}
