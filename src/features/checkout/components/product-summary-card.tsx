import { Button } from "@/components/ui";
import { useCartStore } from "@/features/cart/store/useCartStore";
import { Check, Trash } from "lucide-react";

export function ProductSummaryCard() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);

  function handleRemoveItem(productId: string) {
    removeItem(productId);
  }

  return (
    <div className="sticky top-8 ">
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900/50 border border-zinc-800/60 mb-5 ">
        {items.map((item) => (
          <h1
            key={item.productId}
            className="text-white bg-zinc-950/90 border rounded-2xl p-4 m-2 shadow-sm shadow-zinc-500/20"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="font-medium text-zinc-100 text-sm">
                    {item.name}
                  </span>

                  {typeof item.licenseId === "object" &&
                    item.licenseId.badge && (
                      <span className="text-[10px] tracking-wider uppercase font-medium px-2 py-0.5 rounded-md border bg-zinc-800 text-zinc-400 border-zinc-700">
                        {item.licenseId.badge}
                      </span>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pl-6">
                  {typeof item.licenseId === "object" ? (
                    item.licenseId.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 flex-shrink-0 text-zinc-700" />
                        <span className="text-xs text-zinc-500 truncate">
                          {feature}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div>hola</div>
                  )}
                </div>
              </div>

              {/* Right: price */}
              <div className="text-right flex flex-col items-end gap-2">
                {typeof item.licenseId === "object" && (
                  <span className="text-xl font-semibold transition-colors duration-200 text-zinc-400">
                    ${item.licenseId.price.toFixed(2)}
                  </span>
                )}
                <Button
                  variant={"destructive"}
                  className="w-fit"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </h1>
        ))}
      </div>
    </div>
  );
}
