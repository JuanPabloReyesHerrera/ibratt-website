import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LoadingSkeleton } from "@/shared/components";

type BeatCoverProps = {
  href: string;
  cover: string;
  alt: string;
  size?: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 70;
};

const sizeClass = {
  12: "size-12",
  14: "size-14",
  16: "size-16",
  18: "size-18",
  20: "size-20",
  22: "size-22",
  24: "size-24",
  70: "size-70",
};
const sizesMap = {
  12: "48px",
  14: "56px",
  16: "64px",
  18: "72px",
  20: "80px",
  22: "88px",
  24: "96px",
  70: "280px",
};
export function BeatCover({ href, cover, alt, size = 12 }: BeatCoverProps) {
  return (
    <Link
      href={href}
      className="block hover:scale-105 transition-transform active:scale-90 group"
    >
      {/* Contenedor con tamaño fijo */}
      <div
        className={cn(
          "relative border border-foreground rounded-2xl overflow-hidden",
          sizeClass[size],
        )}
      >
        {cover ? (
          <Image
            className="object-cover transition-transform group-hover:scale-110"
            src={cover}
            alt={alt}
            fill // El componente ocupa todo el div padre
            sizes={sizesMap[size]} // Ayuda a Next.js a optimizar el tamaño
            priority={size > 18} // Tip opcional: Prioriza la carga si es una portada grande (ej. Hero/Header)
            loading="eager"
          />
        ) : (
          <LoadingSkeleton />
        )}
      </div>
    </Link>
  );
}
