"use client";
import { getPlansForProduct } from "@/features/checkout/store/checkout.store";
import {
  CheckoutAuthStep,
  PaymentForm,
  OrderConfirmation,
} from "@/features/checkout/components";
import { Button } from "@/components/ui";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { ProductSummaryCard } from "./product-summary-card";
import { LoginForm } from "@/features/auth/components/login-form";

import { useRouter } from "next/navigation";
import HeaderBack from "@/shared/components/header-back";

type CheckoutProps = {
  productId: string;
  licenseId: string;
};

export function Checkout({ productId, licenseId }: CheckoutProps) {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const router = useRouter();

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

  function handlePaymentSubmit() {
    // TODO: llamar a la payment action real
    // Por ahora simula una orden exitosa
    // setStep("confirmation");
  }

  // function handleClear() {
  //   clearCheckout();
  //   router.push("/beats");
  // }

  // ─── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top nav */}
      <HeaderBack />

      {/* Main layout */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16">
          {/* ── Left: product card (sticky en desktop) ── */}
          <ProductSummaryCard />

          {/* ── Right: checkout flow ── */}
          <div className="">
            {/* ── Paso 2: Auth ── */}
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {/* <CheckoutAuthStep
                  mode={authMode}
                  onModeChange={setAuthMode}
                  onSuccess={handleAuthSuccess}
                /> */}
              <LoginForm />
            </div>
            {/* ── Paso 3: Pago ── */}

            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <PaymentForm total={total()} onSubmit={handlePaymentSubmit} />
            </div>

            {/* ── Paso 4: Confirmación ── */}
            {/* {currentStep === "confirmation" && order && (
              <div className="animate-in fade-in zoom-in-95 duration-500">
                <OrderConfirmation order={order} onClear={handleClear} />
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
