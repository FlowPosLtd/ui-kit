import * as React from "react";
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
 * Visual language ported from the order/onboarding stepper in tenant-dashboard
 * (OnboardingLayout.tsx): bg-primary/border-primary active circle, bg-primary/90
 * done circle, bg-white/60 border-border/60 upcoming circle, ✓ for done steps.
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
          isHorizontal ? "items-center gap-inner" : "flex-col",
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
                "flex",
                isHorizontal ? "items-center gap-inner flex-1" : "flex-row items-start gap-inner",
                !isHorizontal && !isLast && "pb-inner",
              )}
            >
              <div
                className={cn(
                  "flex",
                  isHorizontal
                    ? "items-center flex-1"
                    : "flex-col items-center self-stretch",
                )}
              >
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={clickable ? () => onStepClick?.(i) : undefined}
                  className={cn(
                    "flex items-center justify-center w-7 h-7 shrink-0 rounded-full text-body-3 font-semibold border transition-colors",
                    isActive && "bg-primary text-primary-foreground border-primary",
                    isDone && "bg-primary/90 text-primary-foreground border-primary/90",
                    !isActive && !isDone && "bg-white/60 text-foreground/50 border-border/60",
                    clickable
                      ? "cursor-pointer hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      : "disabled:cursor-default",
                  )}
                >
                  {isDone ? "✓" : i + 1}
                </button>
                {!isLast && (
                  <div
                    className={cn(
                      "transition-colors",
                      isHorizontal ? "flex-1 h-px ml-inner" : "w-px flex-1 my-1",
                      isDone ? "bg-primary/60" : "bg-border",
                    )}
                  />
                )}
              </div>

              <div className={cn(!isHorizontal && !isLast && "pb-section")}>
                <span
                  className={cn(
                    "text-body-2 font-medium transition-colors",
                    isActive ? "text-content-primary" : "text-foreground/50",
                    clickable && "cursor-pointer",
                  )}
                  onClick={clickable ? () => onStepClick?.(i) : undefined}
                >
                  {step.label}
                </span>
                {step.description && (
                  <p className="text-body-3 text-content-tertiary">{step.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  },
);
Stepper.displayName = "Stepper";

export { Stepper };
