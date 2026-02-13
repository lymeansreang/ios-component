"use client";

export interface CheckoutProgressStepperProps {
  steps?: string[];
  currentStep?: number;
}

export default function CheckoutProgressStepper({
  steps = ["Cart", "Address", "Payment", "Review"],
  currentStep = 2,
}: CheckoutProgressStepperProps) {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;
          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  done ? "bg-emerald-500 text-white" : active ? "bg-blue-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-neutral-800"
                }`}>
                  {index + 1}
                </span>
                <span className="text-[11px] text-neutral-500">{step}</span>
              </div>
              {index < steps.length - 1 && <div className="mx-2 h-[2px] flex-1 bg-neutral-200 dark:bg-neutral-800" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
