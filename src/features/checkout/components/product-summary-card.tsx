"use client";

import Image from "next/image";
import { Music, Package, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductItem, PricingPlan } from "../store/checkout.store";

type Props = {
  product: ProductItem;
  selectedPlan: PricingPlan | null;
};

// Icono según tipo de producto
function ProductIcon({ type }: { type: ProductItem["type"] }) {
  const icons = {
    beat: Music,
    sample_pack: Package,
    service: Wrench,
  };
  const Icon = icons[type];
  return <Icon className="w-6 h-6 text-zinc-600" />;
}

// Badge de tipo de producto
const TYPE_LABELS: Record<ProductItem["type"], string> = {
  beat: "Beat",
  sample_pack: "Sample Pack",
  service: "Servicio",
};

export function ProductSummaryCard({ product, selectedPlan }: Props) {
  return (
    <div className="sticky top-8">
      {/* Cover art */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/60 mb-5">
        {product.coverUrl ? (
          <Image
            src={product.coverUrl}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 380px"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <ProductIcon type={product.type} />
            <span className="text-zinc-700 text-xs tracking-widest uppercase">
              {TYPE_LABELS[product.type]}
            </span>
          </div>
        )}

        {/* Overlay gradient en la parte inferior */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950/80 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-widest uppercase font-medium px-2 py-1 rounded-md bg-zinc-950/70 text-zinc-400 border border-zinc-800/60 backdrop-blur-sm">
            {TYPE_LABELS[product.type]}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-100 leading-tight mb-1">
          {product.title}
        </h2>
        {product.subtitle && (
          <p className="text-sm text-zinc-500">{product.subtitle}</p>
        )}

        {/* Metadata chips — BPM, key, formato, etc. */}
        {Object.keys(product.metadata).length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(product.metadata).map(([key, value]) => (
              <span
                key={key}
                className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400"
              >
                <span className="text-zinc-600 mr-1.5 uppercase text-[10px]">
                  {key}
                </span>
                {value}
              </span>
            ))}
          </div>
        )}
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
