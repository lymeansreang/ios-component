"use client";

export interface BadgeProps {
  text?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

export default function Badge({ text = "NEW", tone = "default" }: BadgeProps) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-500 text-white"
      : tone === "warning"
      ? "bg-amber-500 text-white"
      : tone === "danger"
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClass}`}>{text}</span>;
}
