"use client";

import { useState } from "react";

export interface QuantitySelectorProps {
  initial?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export default function QuantitySelector({
  initial = 1,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const [qty, setQty] = useState(initial);

  const update = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900">
      <button type="button" onClick={() => update(qty - 1)} className="h-7 w-7 rounded-lg bg-neutral-100 text-sm dark:bg-neutral-800">-</button>
      <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
      <button type="button" onClick={() => update(qty + 1)} className="h-7 w-7 rounded-lg bg-neutral-100 text-sm dark:bg-neutral-800">+</button>
    </div>
  );
}
