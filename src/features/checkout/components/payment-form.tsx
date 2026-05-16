"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaymentData = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
};

type Props = {
  total: number;
  onSubmit: (data: PaymentData) => void;
  isLoading?: boolean;
};

// Formatea número de tarjeta: "1234 5678 9012 3456"
function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

// Formatea expiración: "MM/YY"
function formatExpiry(value: string) {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  return cleaned;
}

export function PaymentForm({ total, onSubmit, isLoading = false }: Props) {
  const [data, setData] = useState<PaymentData>({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
  });

  function handleSubmit() {
    // TODO: validar campos antes de llamar onSubmit
    onSubmit(data);
  }

  return (
    <div>
      {/* Header */}
      <div className="my-6 md:my-12">
        <h3 className="text-lg font-semibold text-zinc-100 mb-1">Pago</h3>
        <p className="text-sm text-zinc-500">
          Tus datos están protegidos con cifrado SSL.
        </p>
      </div>

      {/* Card preview strip */}
      <div className="rounded-xl bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 p-5 mb-6">
        <div className="flex items-center justify-between mb-8">
          <CreditCard className="w-7 h-7 text-zinc-500" />
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
            ))}
          </div>
        </div>
        <p className="font-mono text-zinc-300 text-sm tracking-widest mb-3">
          {data.cardNumber || "•••• •••• •••• ••••"}
        </p>
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            {data.cardHolder || "Nombre del titular"}
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            {data.expiry || "MM/YY"}
          </span>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4 mb-6">
        <div>
          <Label
            htmlFor="cardHolder"
            className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block"
          >
            Nombre del titular
          </Label>
          <Input
            id="cardHolder"
            placeholder="Como aparece en la tarjeta"
            value={data.cardHolder}
            onChange={(e) => setData({ ...data, cardHolder: e.target.value })}
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-amber-400/50"
          />
        </div>

        <div>
          <Label
            htmlFor="cardNumber"
            className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block"
          >
            Número de tarjeta
          </Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={data.cardNumber}
            onChange={(e) =>
              setData({ ...data, cardNumber: formatCardNumber(e.target.value) })
            }
            maxLength={19}
            className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-amber-400/50 font-mono tracking-wider"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label
              htmlFor="expiry"
              className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block"
            >
              Vencimiento
            </Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              value={data.expiry}
              onChange={(e) =>
                setData({ ...data, expiry: formatExpiry(e.target.value) })
              }
              maxLength={5}
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-amber-400/50 font-mono"
            />
          </div>
          <div>
            <Label
              htmlFor="cvv"
              className="text-xs text-zinc-500 uppercase tracking-wider mb-1.5 block"
            >
              CVV
            </Label>
            <Input
              id="cvv"
              placeholder="•••"
              value={data.cvv}
              onChange={(e) =>
                setData({
                  ...data,
                  cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                })
              }
              maxLength={4}
              type="password"
              className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus:border-amber-400/50 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-6 text-base transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
            Procesando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Pagar ${total.toFixed(2)}
          </span>
        )}
      </Button>

      <p className="text-center text-xs text-zinc-700 mt-3 flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        Pago seguro con cifrado SSL
      </p>
    </div>
  );
}
