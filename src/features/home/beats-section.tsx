import {
  UsagePolicies,
  BeatList,
  BeatsFilter,
} from "@/features/beats/components";
import { BackGroundImage } from "@/shared/components";
import Link from "next/link";

/**
 * BeatsLanding
 * Contenedor principal de la sección de beats.
 * Header editorial en Bebas Neue, reemplaza el <Button variant="link"> genérico.
 */
export function BeatsSection() {
  return (
    <div className="w-full h-main-content -mt-main-content flex flex-col">
      <div className="overlay-fade-b" />
      <div className="vignette-radial" />
      <div className="overlay-dim" />
      <div className="overlay-grain" />

      <div className="w-full h-full flex flex-col items-center justify-start z-10">
        {/* ── Header editorial ── */}
        <div className="flex flex-col items-center gap-2 pt-16 pb-8">
          <span
            className="text-[9px] tracking-[0.65em] uppercase font-semibold font-sans"
            style={{ color: "#D4A853" }}
          >
            Browse &amp; License
          </span>

          <Link href="/beats">
            <h2
              className="leading-none text-white uppercase transition-opacity duration-200 hover:opacity-75"
              style={{
                fontFamily: "'Bebas Neue', 'Anton', 'Impact', sans-serif",
                fontSize: "clamp(3rem, 12vw, 7rem)",
                letterSpacing: "0.04em",
              }}
            >
              Beats Catalog
            </h2>
          </Link>

          {/* Línea de acento gold */}
          <div
            className="w-12 h-px mt-1"
            style={{ background: "rgba(212,168,83,0.45)" }}
          />
        </div>

        <BeatsFilter />
        <BeatList />
      </div>
    </div>
  );
}
