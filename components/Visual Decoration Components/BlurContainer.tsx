"use client";

import { type ReactNode } from "react";

export interface BlurContainerProps {
  children?: ReactNode;
}

export default function BlurContainer({ children }: BlurContainerProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      {children ?? <p className="text-sm text-neutral-800 dark:text-neutral-100">Blur Container</p>}
    </div>
  );
}
