"use client";

import { type ReactNode } from "react";

export interface GradientContainerProps {
  children?: ReactNode;
}

export default function GradientContainer({ children }: GradientContainerProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 p-4 text-white shadow-lg">
      {children ?? <p className="text-sm font-semibold">Gradient Container</p>}
    </div>
  );
}
