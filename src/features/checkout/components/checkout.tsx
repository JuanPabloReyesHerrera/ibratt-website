"use client";
import { useRouter } from "next/navigation";
import { getPlansForProduct } from "@/features/checkout/store/checkout.store";
import {
  CheckoutStepper,
  CheckoutAuthStep,
  PaymentForm,
  OrderConfirmation,
} from "@/features/checkout/components";
import { Button } from "@/components/ui";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { ArrowLeft } from "lucide-react";
import { ProductSummaryCard } from "./product-summary-card";

type CheckoutProps = {
  productId: string;
  licenseId: string;
};

export function Checkout({ productId, licenseId }: CheckoutProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  // Guard: si no hay producto, redirigir
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">
            No hay ningún producto seleccionado.
          </p>
          <Button
            variant="ghost"
            onClick={() => router.push("/beats")}
            className="text-amber-400 hover:text-amber-300"
          >
            Ver catálogo
          </Button>
        </div>
      </div>
    );
  }

  // const plans = getPlansForProduct(product.type);
  // const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? null;

  // ─── Handlers ─────────────────────────────────────────────────────────────────

  // function handleContinueFromSummary() {
  //   if (!selectedPlanId) return;
  //   setStep("auth");
  // }

  // function handleAuthSuccess() {
  //   setStep("payment");
  // }

  // function handlePaymentSubmit() {
  //   // TODO: llamar a la payment action real
  //   // Por ahora simula una orden exitosa
  //   setStep("confirmation");
  // }

  // function handleClear() {
  //   clearCheckout();
  //   router.push("/beats");
  // }

  // ─── Render ────────────────────────────────────────────────────────────────────
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
          <ProductSummaryCard />

          {/* ── Right: checkout flow ── */}
          {/* <div className="relative bg-linear-to-t from-black from-50% via-black via-90%">
            Stepper solo durante los pasos activos
            {currentStep !== "confirmation" && (
              <CheckoutStepper currentStep={currentStep} />
            )}

            ── Paso 2: Auth ──
            {currentStep === "auth" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <CheckoutAuthStep
                  mode={authMode}
                  onModeChange={setAuthMode}
                  onSuccess={handleAuthSuccess}
                />
              </div>
            )}

            ── Paso 3: Pago ──

            {currentStep === "payment" && selectedPlan && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <PaymentForm
                  total={selectedPlan.price}
                  onSubmit={handlePaymentSubmit}
                />
              </div>
            )}

            ── Paso 4: Confirmación ──
            {currentStep === "confirmation" && order && (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <OrderConfirmation order={order} onClear={handleClear} />
              </div>
            )}
          </div> */}
        </div>
      </main>
    </div>
  );
}
