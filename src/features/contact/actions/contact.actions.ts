"use server";

/**
 * Server action para enviar el formulario de contacto.
 *
 * Dos opciones de integración documentadas abajo:
 *   - Opción A: Resend (recomendado para Vercel)
 *   - Opción B: Guardar submission en Supabase
 *
 * Variables de entorno a agregar en .env:
 *   CONTACT_EMAIL=tu@email.com        ← dónde recibes los mensajes (server-only)
 *   RESEND_API_KEY=re_xxxx            ← si usas Resend
 */

import type { ContactFormData, ContactFormState } from "../core/contact";

// Texto legible para cada asunto del formulario
const SUBJECT_LABELS: Record<ContactFormData["subject"], string> = {
  licensing: "Licensing / Beats",
  collaboration: "Collaboration",
  custom_beat: "Custom Beat Request",
  mixing_mastering: "Mixing & Mastering",
  general: "General Inquiry",
};

export async function sendContactEmail(
  data: ContactFormData,
): Promise<ContactFormState> {
  // Validación en el servidor — no depender solo del cliente
  if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
    return {
      status: "error",
      message: "Please fill in all required fields.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  try {
    /**
     * ─── OPCIÓN A: Resend ──────────────────────────────────────────────────
     *
     * 1. pnpm add resend
     * 2. Agrega RESEND_API_KEY y CONTACT_EMAIL a .env
     * 3. Reemplaza el stub con:
     *
     * const { Resend } = await import("resend");
     * const resend = new Resend(process.env.RESEND_API_KEY);
     *
     * await resend.emails.send({
     *   from: "Contact Form <noreply@tudominio.com>",
     *   to: process.env.CONTACT_EMAIL!,
     *   replyTo: data.email,
     *   subject: `[${SUBJECT_LABELS[data.subject]}] — ${data.name}`,
     *   text: [
     *     `From: ${data.name} <${data.email}>`,
     *     `Subject: ${SUBJECT_LABELS[data.subject]}`,
     *     "",
     *     data.message,
     *   ].join("\n"),
     * });
     *
     * ─── OPCIÓN B: Guardar en Supabase ─────────────────────────────────────
     *
     * Crea una tabla `contact_submissions` con columnas:
     *   id, name, email, subject, message, created_at
     *
     * import { createClient } from "@/lib/supabase/server";
     *
     * const supabase = await createClient();
     * const { error } = await supabase.from("contact_submissions").insert({
     *   name: data.name,
     *   email: data.email,
     *   subject: data.subject,
     *   message: data.message,
     * });
     * if (error) throw error;
     *
     * ───────────────────────────────────────────────────────────────────────
     */

    // Stub de desarrollo — reemplazar con integración real
    await new Promise((r) => setTimeout(r, 600));
    console.log("[Contact] New submission:", {
      name: data.name,
      email: data.email,
      subject: SUBJECT_LABELS[data.subject],
      message: data.message,
    });

    return {
      status: "success",
      message: "Message sent! I'll get back to you within 24–48 hours.",
    };
  } catch (error) {
    console.error("[sendContactEmail] Error:", error);
    return {
      status: "error",
      message: "Something went wrong. Try again or reach out directly.",
    };
  }
}
