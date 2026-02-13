"use client";

import { useState } from "react";

export interface PromoCodeFieldProps {
  onApply?: (code: string) => void;
}

export default function PromoCodeField({ onApply }: PromoCodeFieldProps) {
  const [code, setCode] = useState("");

  return (
    <div className="flex w-full max-w-sm items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900">
      <input
        value={code}
        onChange={(event) => setCode(event.target.value)}
        placeholder="Promo code"
        className="flex-1 rounded-xl bg-neutral-100 px-3 py-2 text-sm outline-none dark:bg-neutral-800"
      />
      <button
        type="button"
        onClick={() => onApply?.(code.trim())}
        className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white"
      >
        Apply
      </button>
    </div>
  );
}
