"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ContactFormData, ContactFormState } from "../core/contact";
import { sendContactEmail } from "../actions/contact.actions";

/**
 * Formulario de contacto con validación y feedback visual por estado.
 * Se resetea automáticamente tras un envío exitoso.
 */

// Opciones del selector de asunto
const SUBJECT_OPTIONS: Array<{
  value: ContactFormData["subject"];
  label: string;
}> = [
  { value: "licensing", label: "Licensing / Beats" },
  { value: "collaboration", label: "Collaboration" },
  { value: "custom_beat", label: "Custom Beat Request" },
  { value: "mixing_mastering", label: "Mixing & Mastering" },
  { value: "general", label: "General Inquiry" },
];

const INITIAL_FIELDS: ContactFormData = {
  name: "",
  email: "",
  subject: "general",
  message: "",
};

// Clases base que replican el estilo del componente Input de shadcn
const fieldBase = cn(
  "flex w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm",
  "ring-offset-background placeholder:text-muted-foreground/50",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
);

export function ContactForm() {
  const [fields, setFields] = useState<ContactFormData>(INITIAL_FIELDS);
  const [formState, setFormState] = useState<ContactFormState>({
    status: "idle",
  });

  // Actualiza el campo correspondiente al evento de cambio
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState({ status: "loading" });

    const result = await sendContactEmail(fields);
    setFormState(result);

    // Resetear el formulario solo si el envío fue exitoso
    if (result.status === "success") {
      setFields(INITIAL_FIELDS);
    }
  }

  const isPending = formState.status === "loading";
  const isSuccess = formState.status === "success";
  const isDisabled = isPending || isSuccess;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fila: Nombre + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs text-muted-foreground">
            Name <span className="text-foreground/50">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={fields.name}
            onChange={handleChange}
            placeholder="Leonardo Linares (ejemplo)"
            autoComplete="name"
            required
            disabled={isDisabled}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs text-muted-foreground">
            Email <span className="text-foreground/50">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="leonardolinares@gmail.com (ejemplo)"
            autoComplete="email"
            required
            disabled={isDisabled}
          />
        </div>
      </div>

      {/* Selector de asunto */}
      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-xs text-muted-foreground">
          Subject
        </Label>
        <select
          id="subject"
          name="subject"
          value={fields.subject}
          onChange={handleChange}
          disabled={isDisabled}
          className={cn(fieldBase, "h-9 py-0 cursor-pointer")}
        >
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Textarea de mensaje */}
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs text-muted-foreground">
          Message <span className="text-foreground/50">*</span>
        </Label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell me about your project, collab idea, or what you're looking for..."
          rows={5}
          required
          disabled={isDisabled}
          className={cn(fieldBase, "py-2 resize-none min-h-[120px]")}
        />
      </div>

      {/* Banner de feedback: éxito o error */}
      {(formState.status === "success" || formState.status === "error") && (
        <div
          role="alert"
          className={cn(
            "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
            formState.status === "success"
              ? "border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
              : "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
          )}
        >
          {formState.status === "success" ? (
            <CheckCircle2 className="mt-px size-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-px size-4 shrink-0" />
          )}
          <span>{formState.message}</span>
        </div>
      )}

      {/* Botón de envío */}
      <Button type="submit" disabled={isDisabled} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Sending…
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle2 className="mr-2 size-4" />
            Message Sent
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
