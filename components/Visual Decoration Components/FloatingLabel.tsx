"use client";

import { useState } from "react";

export interface FloatingLabelProps {
  label?: string;
}

export default function FloatingLabel({ label = "Email" }: FloatingLabelProps) {
  const [value, setValue] = useState("");
  return (
    <label className="relative block w-full max-w-sm">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder=" "
        className="peer w-full rounded-xl border border-neutral-300 bg-white px-4 pt-5 pb-2 text-sm outline-none dark:border-neutral-700 dark:bg-neutral-900"
      />
      <span className="pointer-events-none absolute left-3 rounded bg-white px-2 text-neutral-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:-top-2 peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs dark:bg-neutral-900">
        {label}
      </span>
    </label>
  );
}
