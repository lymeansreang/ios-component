"use client";

import { useState } from "react";

export interface LikeButtonAnimatedProps {
  initialLiked?: boolean;
  initialCount?: number;
}

export default function LikeButtonAnimated({
  initialLiked = false,
  initialCount = 120,
}: LikeButtonAnimatedProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  return (
    <button
      type="button"
      onClick={() => {
        setLiked((prevLiked) => {
          setCount((prevCount) => (prevLiked ? prevCount - 1 : prevCount + 1));
          return !prevLiked;
        });
      }}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm"
    >
      <svg
        className={`h-5 w-5 transition-transform duration-200 ${liked ? "scale-110 text-red-500" : "text-neutral-500"}`}
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
      </svg>
      <span className="font-medium">{count}</span>
    </button>
  );
}
