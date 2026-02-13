"use client";

export interface TagProps {
  label?: string;
}

export default function Tag({ label = "Design" }: TagProps) {
  return (
    <span className="inline-flex rounded-lg border border-neutral-200 bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
      {label}
    </span>
  );
}
