"use client";

import QuantitySelector from "./QuantitySelector";

export interface CartItemCellProps {
  image?: string;
  title?: string;
  subtitle?: string;
  price?: string;
}

export default function CartItemCell({
  image = "/globe.svg",
  title = "Premium Wireless Headphones",
  subtitle = "Black / Standard",
  price = "$129.00",
}: CartItemCellProps) {
  return (
    <div className="flex w-full max-w-md gap-3 rounded-2xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
      <img src={image} alt={title} className="h-20 w-20 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="text-xs text-neutral-500">{subtitle}</p>
        <p className="text-sm font-bold">{price}</p>
      </div>
      <QuantitySelector initial={1} />
    </div>
  );
}
