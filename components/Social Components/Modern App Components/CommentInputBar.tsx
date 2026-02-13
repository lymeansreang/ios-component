"use client";

import { useState } from "react";

export interface CommentInputBarProps {
  placeholder?: string;
  onSend?: (value: string) => void;
}

export default function CommentInputBar({
  placeholder = "Write a comment...",
  onSend,
}: CommentInputBarProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-xl bg-transparent px-2 py-1.5 text-sm outline-none"
      />
      <button
        type="button"
        onClick={() => {
          if (!value.trim()) return;
          onSend?.(value.trim());
          setValue("");
        }}
        className="rounded-xl bg-blue-500 px-3 py-1.5 text-sm font-medium text-white"
      >
        Send
      </button>
    </div>
  );
}
