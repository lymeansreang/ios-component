"use client";

export interface ShimmerLoaderProps {
  variant?: "line" | "card" | "avatar-line";
}

export default function ShimmerLoader({ variant = "line" }: ShimmerLoaderProps) {
  if (variant === "card") {
    return (
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <div className="h-32 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-2 p-3">
          <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    );
  }

  if (variant === "avatar-line") {
    return (
      <div className="flex w-full max-w-sm items-center gap-3">
        <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-1/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    );
  }

  return <div className="h-4 w-full max-w-sm animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />;
}
