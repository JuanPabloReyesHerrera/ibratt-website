"use client";

import Link from "next/link";
import { CheckCircle, Download, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order } from "../store/checkout.store";

type Props = {
  order: Order;
  onClear: () => void;
};

export function OrderConfirmation({ order, onClear }: Props) {
  return (
    <div className="text-center py-4">
      {/* Icono de éxito */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-amber-400" />
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full bg-amber-400/10 animate-ping" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-zinc-100 mb-2">
        ¡Compra exitosa!
      </h3>
      <p className="text-sm text-zinc-500 mb-8 max-w-xs mx-auto">
        Recibirás un email con tu licencia y los archivos en{" "}
        <span className="text-zinc-300">{order.userEmail}</span>
      </p>

      {/* Order summary card */}
      <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-left mb-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-800">
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
            <Music className="w-5 h-5 text-zinc-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-zinc-100 truncate">
              {order.product.title}
            </p>
            <p className="text-xs text-zinc-600">{order.plan.label}</p>
          </div>
          <span className="text-amber-400 font-semibold ml-auto flex-shrink-0">
            ${order.total.toFixed(2)}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">Número de orden</span>
            <span className="text-zinc-400 font-mono">{order.id}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">Fecha</span>
            <span className="text-zinc-400">
              {order.createdAt.toLocaleDateString("es-CO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Deliverables */}
        {order.plan.deliverables && order.plan.deliverables.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <p className="text-[11px] uppercase tracking-wider text-zinc-600 mb-2">
              Archivos disponibles
            </p>
            <div className="space-y-1.5">
              {order.plan.deliverables.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-zinc-400">{file}</span>
                  {/* TODO: agregar URLs de descarga reales */}
                  <button className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                    <Download className="w-3 h-3" />
                    Descargar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold"
        >
          <Link href="/dashboard">Ir a mis compras</Link>
        </Button>

        <Button
          variant="ghost"
          onClick={onClear}
          asChild
          className="text-zinc-600 hover:text-zinc-400"
        >
          <Link href="/beats">Seguir comprando</Link>
        </Button>
      </div>
    </div>
  );
}
