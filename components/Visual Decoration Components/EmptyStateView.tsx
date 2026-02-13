"use client";

export interface EmptyStateViewProps {
  title?: string;
  message?: string;
}

export default function EmptyStateView({
  title = "Nothing here yet",
  message = "Start by creating your first item.",
}: EmptyStateViewProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-neutral-100 dark:bg-neutral-800" />
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-neutral-500">{message}</p>
    </div>
  );
}
