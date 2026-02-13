"use client";

import { type ReactNode } from "react";

export interface GlassMorphCardProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function GlassMorphCard({
  title = "Glass Card",
  subtitle = "Frosted surface",
  children,
}: GlassMorphCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/35 bg-white/25 p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</p>
      <p className="text-xs text-neutral-600 dark:text-neutral-300">{subtitle}</p>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
