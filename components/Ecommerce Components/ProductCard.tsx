"use client";

export interface ProductCardProps {
  image?: string;
  title?: string;
  price?: string;
  oldPrice?: string;
  onAddToCart?: () => void;
}

export default function ProductCard({
  image = "/globe.svg",
  title = "Premium Wireless Headphones",
  price = "$129.00",
  oldPrice = "$179.00",
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <img src={image} alt={title} className="h-44 w-full object-cover bg-neutral-100 dark:bg-neutral-800" />
      <div className="space-y-2 p-4">
        <p className="line-clamp-2 text-sm font-semibold text-neutral-900 dark:text-white">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-neutral-900 dark:text-white">{price}</span>
          <span className="text-xs text-neutral-400 line-through">{oldPrice}</span>
        </div>
        <button type="button" onClick={onAddToCart} className="w-full rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
