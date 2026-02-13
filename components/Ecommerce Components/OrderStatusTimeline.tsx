"use client";

export interface OrderStatusTimelineProps {
  steps?: string[];
  progress?: number;
}

export default function OrderStatusTimeline({
  steps = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"],
  progress = 3,
}: OrderStatusTimelineProps) {
  return (
    <div className="w-full max-w-sm space-y-2">
      {steps.map((step, i) => {
        const done = i < progress;
        return (
          <div key={step} className="flex items-start gap-3">
            <div className="relative mt-0.5">
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                done ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"
              }`}>
                {done ? "✓" : i + 1}
              </span>
              {i < steps.length - 1 && <span className="absolute left-1/2 top-5 h-6 w-px -translate-x-1/2 bg-neutral-300 dark:bg-neutral-700" />}
            </div>
            <p className={`text-sm ${done ? "font-medium" : "text-neutral-500"}`}>{step}</p>
          </div>
        );
      })}
    </div>
  );
}
