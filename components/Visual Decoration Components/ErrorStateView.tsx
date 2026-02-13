"use client";

export interface ErrorStateViewProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorStateView({
  title = "Something went wrong",
  message = "Please check your connection and try again.",
  onRetry,
}: ErrorStateViewProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/60 dark:bg-red-950/30">
      <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">!</div>
      <p className="text-sm font-semibold text-red-700 dark:text-red-300">{title}</p>
      <p className="mt-1 text-xs text-red-600 dark:text-red-400">{message}</p>
      <button type="button" onClick={onRetry} className="mt-3 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
        Retry
      </button>
    </div>
  );
}
