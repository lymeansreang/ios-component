"use client";

export interface TypingIndicatorProps {
  label?: string;
}

export default function TypingIndicator({ label = "Typing..." }: TypingIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2">
      <div className="flex items-center gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:120ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-500 [animation-delay:240ms]" />
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-300">{label}</span>
    </div>
  );
}
