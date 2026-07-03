import { cn } from "../lib/cn";

export const INPUT_STYLES = {
  base: cn(
    "flex w-full rounded px-[15px]",
    "text-body-1 font-normal tracking-[-0.04em] leading-[1.5]",
    "text-field-text",
    "placeholder:text-field-text-placeholder placeholder:font-normal placeholder:tracking-[-0.04em]",
    "focus-visible:outline-none",
    "transition-all duration-100 ease-out",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),

  variants: {
    default: cn(
      "bg-field-bg border-[1px] border-field-border",
      "hover:bg-field-hover",
      "active:bg-field-active active:border-field-border-active",
      "focus:bg-field-focus focus:border-field-border-focus",
      "focus:shadow-[0px_0px_0px_2px_var(--input-shadow-focus)]",
    ),
    success: cn(
      "bg-field-success-bg border-[1.2px] border-field-success-border",
    ),
    error: cn("bg-field-error-bg border-[1px] border-field-error-border"),
  },

  disabled: cn(
    "cursor-not-allowed bg-field-disabled border-field-border-disabled",
    "text-field-text-disabled opacity-100",
  ),

  sizes: {
    sm: "h-10 py-inner text-body-3",
    md: "h-12 py-grid text-body-2",
    lg: "h-14 py-[15px] text-body-1",
  },
} as const;

export const CHECKBOX_STYLES = {
  root: {
    base: cn(
      "peer shrink-0 rounded",
      "ring-offset-background",
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "transition-all duration-100 ease-out",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ),

    variants: {
      default: cn(
        "border border-field-border bg-field-bg",
        "hover:bg-field-hover hover:border-field-border-active",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        "data-[state=checked]:text-primary-foreground",
      ),
      success: cn(
        "border-[1.2px] border-field-success-border bg-field-success-bg",
        "data-[state=checked]:bg-success data-[state=checked]:border-success",
        "data-[state=checked]:text-success-foreground",
      ),
      error: cn(
        "border border-field-error-border bg-field-error-bg",
        "data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
        "data-[state=checked]:text-destructive-foreground",
      ),
    },

    disabled: cn(
      "cursor-not-allowed bg-field-disabled border-field-border-disabled",
      "data-[state=checked]:bg-field-disabled data-[state=checked]:border-field-border-disabled",
      "data-[state=checked]:text-field-text-disabled",
    ),

    sizes: {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    },
  },

  indicator: cn("flex items-center justify-center text-current"),

  icon: {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  },
} as const;
