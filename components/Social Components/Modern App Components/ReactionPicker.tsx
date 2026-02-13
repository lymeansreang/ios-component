"use client";

import { useState } from "react";

export interface ReactionPickerProps {
  onSelect?: (emoji: string) => void;
  reactions?: string[];
}

export default function ReactionPicker({
  onSelect,
  reactions = ["👍", "❤️", "😂", "😮", "😢", "🔥"],
}: ReactionPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-2 py-1 shadow-sm">
      {reactions.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => {
            setSelected(emoji);
            onSelect?.(emoji);
          }}
          className={`rounded-full px-2 py-1 text-lg transition-transform hover:scale-110 ${
            selected === emoji ? "bg-neutral-100 dark:bg-neutral-800" : ""
          }`}
          aria-label={`React ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
