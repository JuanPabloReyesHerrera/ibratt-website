import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContactChannel } from "../core/contact";

interface ContactChannelCardProps {
  channel: ContactChannel;
}

/**
 * Tarjeta de canal de contacto directo.
 * El estilo visual (color de fondo, texto) viene del className en siteConfig —
 * sin colores hardcodeados aquí.
 */
export function ContactChannelCard({ channel }: ContactChannelCardProps) {
  return (
    <Link
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center justify-between rounded-xl px-5 py-4",
        "transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl",
        channel.className ?? "bg-muted text-foreground",
      )}
    >
      <div>
        {/* Label del canal (plataforma) */}
        <p className="text-xs font-medium uppercase tracking-[0.15em] opacity-70">
          {channel.label}
        </p>

        {/* Handle o número */}
        <p className="mt-0.5 text-lg font-bold tracking-tight">
          {channel.handle}
        </p>
      </div>

      {/* Indicador de enlace externo */}
      <ArrowUpRight className="size-5 opacity-70 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
