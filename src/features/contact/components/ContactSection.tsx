import { siteConfig } from "@/config/site";
import type { ContactChannel } from "../core/contact";
import { ContactForm } from "./ContactForm";
import { ContactChannelCard } from "./ContactChannelCard";
import { BackGroundImage } from "@/shared/components";

/**
 * Sección principal de contacto.
 *
 * Orquesta el formulario de email y los canales de contacto directo.
 * Toda la información de contacto viene de siteConfig — sin hardcoding aquí.
 *
 * Uso en app/:
 *   import { ContactSection } from "@/features/contact";
 *   <ContactSection />
 */

// Construye los canales desde siteConfig para desacoplar el UI de la config
function buildChannels(): ContactChannel[] {
  const { socialsMedia } = siteConfig;

  return [
    {
      id: "whatsapp",
      label: "WhatsApp",
      // Muestra el número si está configurado, si no un texto genérico
      handle: socialsMedia.whatsapp.number || "Send a message",
      url: socialsMedia.whatsapp.url,
      className: socialsMedia.whatsapp.className,
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: `@${socialsMedia.instagram.userId}`,
      url: socialsMedia.instagram.url.toString(),
      className: socialsMedia.instagram.className,
    },
  ];
}

export function ContactSection() {
  const channels = buildChannels();

  return (
    <div className="h-full w-full">
      <BackGroundImage
        imageSrc="/assets/contact-background.jpg"
        alt="contacto"
      />
      <div
        className={`fixed top-navbar w-full h-svh bg-linear-to-t from-black from-20% to-transparent `}
      />
      <section id="contact" className="relative lg:py-32 -mt-[100svh]">
        <div className="container mx-auto max-w-5xl p-6 bg-gray-950/30 backdrop-blur-lg lg:rounded-2xl shadow-2xl shadow-black">
          {/* Encabezado de sección */}
          <div className="mb-14">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s work together.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Licencias, colaboraciones, beats personalizados o simplemente
              quieres hablar de música, leo todos los mensajes y respondo en un
              plazo de 48 horas.
            </p>
          </div>

          {/* Layout: formulario (izquierda) + canales directos (derecha) */}
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_300px]">
            {/* Formulario de email */}
            <ContactForm />

            {/* Panel lateral de canales directos */}
            <div className="space-y-3 lg:sticky lg:top-24">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Or reach me directly
              </p>
              <div className="flex flex-col gap-3">
                {channels.map((channel) => (
                  <ContactChannelCard key={channel.id} channel={channel} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
