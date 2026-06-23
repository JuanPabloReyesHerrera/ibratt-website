"use client";

import { usePlayerStore } from "@/features/audio-player/store/player-store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { type Beat } from "../core/beat.types";
import { useEffect, useState } from "react";
import { BEAT_LICENSE_PLANS, type BeatLicensePlan } from "../core/beat.license";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { useShallow } from "zustand/shallow";
import { BeatCard } from "./ui/beat-card";
import { LicenseSelector } from "./license-selector";

type BeatProps = {
  id: string;
};

export function Beat({ id }: BeatProps) {
  const { playlist } = usePlayerStore(
    useShallow((state) => ({
      playlist: state.playlist,
    })),
  );

  const beat = playlist.find((beat) => beat.id === id);
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedPlan, setSelectedPlan] = useState<BeatLicensePlan | null>(
    null,
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!beat) {
    return <p className="text-zinc-500 p-6">Beat no encontrado.</p>;
  }

  const handleContinue = () => {
    if (!selectedPlan) return;
    // Pasas el beatId y la licencia elegida al checkout por query params
    // (o por un store ligero si prefieres evitar la URL)
    addItem({
      productId: beat.id,
      licenseId: selectedPlan,
      name: beat.name,
      price: selectedPlan.price,
    });
    router.push(`/checkout?productId=${beat.id}&licenseId=${selectedPlan.id}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top nav */}
      <header className="border-b border-zinc-900 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>

          {/* Logo / brand */}
          <span className="text-zinc-600 text-sm tracking-widest uppercase font-medium">
            Ibratt
          </span>

          {/* Spacer para centrar el logo */}
          <div className="w-16" />
        </div>
      </header>

      {/* Main layout */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16">
          {/* ── Left: product card (sticky en desktop) ── */}
          <BeatCard beat={beat} selectedPlan={selectedPlan} />

          {/* ── Right: checkout flow ── */}
          <div className="relative bg-linear-to-t from-zinc-950 from-50% via-zinc-950 via-90%">
            {/* ── Paso 1: Elegir licencia ── */}
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-zinc-100 mb-1">
                  Elige tu licencia
                </h2>
                <p className="text-sm text-zinc-500">
                  Selecciona el tipo de uso que le darás a este beat.
                </p>
              </div>

              <LicenseSelector
                plans={BEAT_LICENSE_PLANS}
                selectedPlanId={selectedPlan?.id ?? null}
                onSelect={(planId) =>
                  setSelectedPlan(
                    BEAT_LICENSE_PLANS.find((p) => p.id === planId) ?? null,
                  )
                }
              />

              <Button
                onClick={handleContinue}
                disabled={!selectedPlan}
                className="w-full mt-6 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-6 text-base disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
