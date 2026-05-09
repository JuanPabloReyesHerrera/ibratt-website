"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  useCheckoutStore,
  type ProductItem,
} from "@/features/checkout/store/checkout.store";

type Props = {
  product: ProductItem;
  label?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "ghost";
};

export function BuyButton({
  product,
  label,
  className,
  variant = "default",
}: Props) {
  const router = useRouter();
  const { setProduct, setStep } = useCheckoutStore();

  function handleBuy() {
    setProduct(product);
    setStep("summary"); // siempre empieza desde el principio
    router.push("/checkout");
  }

  return (
    <Button
      variant={variant}
      onClick={handleBuy}
      className={cn(
        variant === "default" &&
          "bg-amber-300 hover:bg-amber-300/80 text-zinc-950 font-semibold",
        className,
      )}
    >
      {label ?? <ShoppingCart className="w-4 h-4" />}
    </Button>
  );
}
