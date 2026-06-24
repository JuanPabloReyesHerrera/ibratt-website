import Image from "next/image";
import { Overlay } from "@/shared/components";
import { PlayButton } from "@/shared/components";
import { MetaChip } from "./meta-chip";
import type { Beat, BeatLicensePlan } from "@/features/beats/core";

type BeatCardProps = {
  beat: Beat;
  selectedPlan: BeatLicensePlan | null;
};

export function BeatCard({ beat, selectedPlan }: BeatCardProps) {
  return (
    <div className="sticky top-8 animate-in fade-in slide-in-from-left-50 duration-500">
      {/* Cover art */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 mb-5">
        {beat.cover ? (
          <Image
            src={beat.cover}
            alt={beat.name}
            fill
            className="object-cover"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-700 text-xs tracking-widest uppercase">
              Sin portada
            </span>
          </div>
        )}

        {/* Overlay gradient en la parte inferior */}
        <Overlay
          to="t"
          from="from-black"
          via="to-80%"
          toColor="to-transparent"
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-widest uppercase font-medium px-2 py-1 rounded-md bg-zinc-950/70 text-zinc-400 border border-zinc-800/60 backdrop-blur-sm">
            BEAT
          </span>
        </div>
        <div className="dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <PlayButton isPlaying="" size={22} svgSize={16} variant="outline" />
        </div>
      </div>

      {/* Beat info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-100 leading-tight mb-1">
          {beat.name}
        </h2>

        {/* Metadata chips — BPM, key, formato, etc. */}

        <div className="flex flex-wrap gap-2 mt-3">
          {beat.bpm && <MetaChip label="BPM" value={String(beat.bpm)} />}
          {beat.key && <MetaChip label="Key" value={beat.key} />}
          {beat.genre && <MetaChip label="Genre" value={beat.genre} />}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800/60 mb-5" />

      {/* Order summary */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-500">Licencia</span>
          <span className="text-zinc-300 font-medium">
            {selectedPlan ? selectedPlan.label : "—"}
          </span>
        </div>

        {selectedPlan && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-500">Precio</span>
            <span className="text-amber-400 font-semibold text-base">
              ${selectedPlan.price.toFixed(2)}
            </span>
          </div>
        )}

        {/* Deliverables */}
        {selectedPlan?.deliverables && selectedPlan.deliverables.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800/60">
            <p className="text-[11px] tracking-wider uppercase text-zinc-600 mb-2">
              Recibirás
            </p>
            <div className="space-y-1.5">
              {selectedPlan.deliverables.map((file) => (
                <div
                  key={file}
                  className="flex items-center gap-2 text-xs text-zinc-400"
                >
                  <div className="w-1 h-1 rounded-full bg-amber-400/60" />
                  {file}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
