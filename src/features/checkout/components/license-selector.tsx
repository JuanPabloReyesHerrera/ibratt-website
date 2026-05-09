"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingPlan } from "../store/checkout.store";

type Props = {
  plans: PricingPlan[];
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
};

const BADGE_STYLES: Record<string, string> = {
  Popular: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "Best Value": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Exclusive: "bg-zinc-800 text-zinc-400 border-zinc-700",
};

export function LicenseSelector({ plans, selectedPlanId, onSelect }: Props) {
  return (
    <div className="space-y-3">
      {plans.map((plan) => {
        const isSelected = selectedPlanId === plan.id;

        return (
          <button
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className={cn(
              "w-full text-left rounded-xl border p-4 transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
              isSelected
                ? "border-amber-400/50 bg-amber-400/5"
                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2.5">
                  {/* Radio indicator */}
                  <div
                    className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200",
                      isSelected
                        ? "border-amber-400 bg-amber-400"
                        : "border-zinc-700",
                    )}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                    )}
                  </div>

                  <span className="font-medium text-zinc-100 text-sm">
                    {plan.label}
                  </span>

                  {plan.badge && (
                    <span
                      className={cn(
                        "text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded-md border",
                        BADGE_STYLES[plan.badge] ??
                          "bg-zinc-800 text-zinc-400 border-zinc-700",
                      )}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-1.5">
                      <Check
                        className={cn(
                          "w-3 h-3 flex-shrink-0",
                          isSelected ? "text-amber-400" : "text-zinc-700",
                        )}
                      />
                      <span className="text-xs text-zinc-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: price */}
              <div className="text-right flex-shrink-0">
                <span
                  className={cn(
                    "text-xl font-semibold transition-colors duration-200",
                    isSelected ? "text-amber-400" : "text-zinc-400",
                  )}
                >
                  ${plan.price.toFixed(2)}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
