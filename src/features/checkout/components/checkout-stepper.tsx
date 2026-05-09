"use client";

import { cn } from "@/lib/utils";
import { CheckoutStep } from "../store/checkout.store";

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: "summary", label: "Licencia" },
  { id: "auth", label: "Cuenta" },
  { id: "payment", label: "Pago" },
];

const STEP_ORDER: CheckoutStep[] = [
  "summary",
  "auth",
  "payment",
  "confirmation",
];

type Props = {
  currentStep: CheckoutStep;
};

export function CheckoutStepper({ currentStep }: Props) {
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((step, index) => {
        const stepIndex = STEP_ORDER.indexOf(step.id);
        const isCompleted = currentIndex > stepIndex;
        const isActive = currentIndex === stepIndex;

        return (
          <div
            key={step.id}
            className="flex items-center flex-1 last:flex-none"
          >
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                  isCompleted && "bg-amber-400 text-zinc-950",
                  isActive &&
                    "bg-zinc-800 text-amber-400 ring-2 ring-amber-400/40",
                  !isCompleted &&
                    !isActive &&
                    "bg-zinc-900 text-zinc-600 border border-zinc-800",
                )}
              >
                {isCompleted ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-[11px] tracking-wider uppercase font-medium transition-colors duration-300",
                  isActive
                    ? "text-amber-400"
                    : isCompleted
                      ? "text-zinc-400"
                      : "text-zinc-700",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-3 mb-5 relative overflow-hidden bg-zinc-800">
                <div
                  className="absolute inset-y-0 left-0 bg-amber-400/60 transition-all duration-500"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
