"use client";

import { useState } from "react";

export interface ChatInputToolbarProps {
  onSend?: (message: string) => void;
}

export default function ChatInputToolbar({ onSend }: ChatInputToolbarProps) {
  const [value, setValue] = useState("");

  const send = () => {
    const message = value.trim();
    if (!message) return;
    onSend?.(message);
    setValue("");
  };

  return (
    <div className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2">
      <button type="button" className="rounded-xl px-2 py-1.5 text-base text-neutral-500">＋</button>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Message"
        className="flex-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm outline-none"
      />
      <button type="button" className="rounded-xl px-2 py-1.5 text-base text-neutral-500">😊</button>
      <button type="button" onClick={send} className="rounded-xl bg-blue-500 px-3 py-1.5 text-sm font-medium text-white">
        Send
      </button>
    </div>
  );
}
