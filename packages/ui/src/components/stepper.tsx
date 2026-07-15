import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: StepperStep[];
  /** 0-indexed. Steps before this are done, this one is active, the rest are upcoming. */
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  /** Called with the step index when a clickable step is activated. Omit to render a static (non-interactive) stepper. */
  onStepClick?: (index: number) => void;
  /** Override which steps can be clicked. Defaults to done + current steps (i <= currentStep), matching tenant-dashboard's StepTabs. */
  isStepClickable?: (index: number) => boolean;
}

/**
 * Ported 1:1 from tenant-dashboard's order-flow stepper (src/components/shared/StepTabs.tsx):
 * green check circle for done steps, ring/shadow highlighted primary circle for the
 * active step, muted numbered circle for upcoming steps, label centered underneath.
 */
const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      orientation = "horizontal",
      onStepClick,
      isStepClickable,
      className,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <ol
        ref={ref}
        className={cn(
          "flex",
          isHorizontal
            ? "items-start min-w-max px-1 pt-2 pb-1"
            : "flex-col",
          className,
        )}
        {...props}
      >
        {steps.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          const isLast = i === steps.length - 1;
          const clickable =
            !!onStepClick && (isStepClickable ? isStepClickable(i) : i <= currentStep);

          return (
            <li
              key={step.label}
              className={cn(
                "flex items-start",
                isHorizontal
                  ? "flex-1 min-w-0 first:flex-initial"
                  : "flex-row flex-1 gap-inner",
                !isHorizontal && !isLast && "pb-inner",
              )}
            >
              <button
                type="button"
                onClick={() => clickable && onStepClick?.(i)}
                disabled={!clickable}
                className={cn(
                  "group flex select-none shrink-0",
                  isHorizontal
                    ? "flex-col items-center gap-1"
                    : "flex-row items-center gap-inner",
                  clickable ? "cursor-pointer" : "cursor-default",
                )}
              >
                <span
                  className={cn(
                    "relative flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-body-3 font-semibold transition-all duration-200",
                    isActive &&
                      "bg-primary text-primary-foreground shadow-[0_0_0_4px_hsl(var(--primary)/0.12)] ring-1 ring-primary",
                    isDone && "bg-content-success text-white group-hover:scale-105",
                    !isActive && !isDone && "bg-muted text-content-tertiary border border-border",
                  )}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
                </span>

                <span
                  className={cn(
                    "text-body-3 font-medium transition-colors px-1",
                    isHorizontal ? "whitespace-nowrap" : "text-left",
                    isActive
                      ? "text-content-primary"
                      : isDone
                        ? "text-content-secondary group-hover:text-content-primary"
                        : "text-content-tertiary",
                  )}
                >
                  {step.label}
                  {step.description && (
                    <span className="block text-content-tertiary font-normal">
                      {step.description}
                    </span>
                  )}
                </span>
              </button>

              {!isLast && (
                <div
                  aria-hidden
                  className={cn(
                    "transition-colors duration-300",
                    isHorizontal
                      ? "flex-1 h-px mx-2 mt-[14px] min-w-[24px]"
                      : "w-px flex-1 my-1 ml-[13px]",
                    isDone ? "bg-content-success" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  },
);
Stepper.displayName = "Stepper";

export { Stepper };
