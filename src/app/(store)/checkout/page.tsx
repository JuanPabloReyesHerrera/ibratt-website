import { Checkout } from "@/features/checkout/components/checkout";

type CheckoutPageProps = {
  searchParams: Promise<{ productId: string; licenseId: string }>;
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { productId, licenseId } = await searchParams;

  return (
    <div>
      <Checkout productId={productId} licenseId={licenseId} />
    </div>
  );
}
