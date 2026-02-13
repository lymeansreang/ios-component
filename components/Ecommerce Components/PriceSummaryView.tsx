"use client";

export interface PriceSummaryViewProps {
  subtotal?: number;
  shipping?: number;
  tax?: number;
}

const money = (value: number) => `$${value.toFixed(2)}`;

export default function PriceSummaryView({
  subtotal = 128,
  shipping = 8,
  tax = 9.52,
}: PriceSummaryViewProps) {
  const total = subtotal + shipping + tax;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-semibold">Price Summary</p>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between"><span className="text-neutral-500">Subtotal</span><span>{money(subtotal)}</span></div>
        <div className="flex items-center justify-between"><span className="text-neutral-500">Shipping</span><span>{money(shipping)}</span></div>
        <div className="flex items-center justify-between"><span className="text-neutral-500">Tax</span><span>{money(tax)}</span></div>
      </div>
      <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex items-center justify-between text-sm font-bold"><span>Total</span><span>{money(total)}</span></div>
    </div>
  );
}
