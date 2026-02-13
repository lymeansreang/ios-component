"use client";

export interface StoryCircleProps {
  src?: string;
  username?: string;
  seen?: boolean;
}

export default function StoryCircle({
  src = "/globe.svg",
  username = "username",
  seen = false,
}: StoryCircleProps) {
  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <div
        className={`rounded-full p-[2px] ${
          seen
            ? "bg-neutral-300 dark:bg-neutral-700"
            : "bg-gradient-to-tr from-fuchsia-500 via-orange-500 to-yellow-400"
        }`}
      >
        <img
          src={src}
          alt={username}
          className="h-14 w-14 rounded-full border-2 border-white dark:border-neutral-950 object-cover"
        />
      </div>
      <span className="max-w-[64px] truncate text-[11px] text-neutral-600 dark:text-neutral-300">
        {username}
      </span>
    </div>
  );
}
