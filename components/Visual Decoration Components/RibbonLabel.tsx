"use client";

export interface RibbonLabelProps {
  text?: string;
}

export default function RibbonLabel({ text = "Featured" }: RibbonLabelProps) {
  return (
    <div className="relative inline-flex">
      <span className="bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">{text}</span>
      <span className="h-0 w-0 border-l-[8px] border-r-0 border-t-[12px] border-l-rose-700 border-t-transparent" />
    </div>
  );
}
