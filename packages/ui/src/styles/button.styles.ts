import { cn } from "../lib/cn";

export const BUTTON_STYLES = {
  base: cn(
    "relative inline-flex items-center justify-center whitespace-nowrap",
    "transition-all duration-150 ease-out",
    "active:scale-[0.98] active:transition-none",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-100 disabled:active:scale-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),

  variants: {
    primary: cn(
      "bg-btn-primary-bg !text-btn-primary-text",
      "shadow-[0_1px_0_rgba(0,0,0,0.03)]",
      "hover:bg-btn-primary-hover-bg hover:!text-btn-primary-hover-text",
      "focus-visible:bg-btn-primary-focus-bg focus-visible:!text-btn-primary-focus-text",
      "focus-visible:ring-2 focus-visible:ring-btn-primary-focus-stroke/40 focus-visible:ring-offset-2",
      "disabled:bg-btn-primary-disabled-bg disabled:!text-btn-primary-disabled-text",
      "disabled:shadow-none",
    ),

    secondary: cn(
      "bg-btn-secondary-bg !text-btn-secondary-text",
      "border-[1px] border-btn-secondary-stroke",
      "hover:bg-btn-secondary-hover-bg hover:!text-btn-secondary-hover-text",
      "hover:border-btn-secondary-hover-stroke",
      "focus-visible:bg-btn-secondary-focus-bg focus-visible:!text-btn-secondary-focus-text",
      "focus-visible:border-btn-secondary-focus-stroke",
      "focus-visible:ring-2 focus-visible:ring-btn-secondary-focus-stroke/40 focus-visible:ring-offset-2",
      "disabled:bg-btn-secondary-disabled-bg disabled:!text-btn-secondary-disabled-text",
      "disabled:border-btn-secondary-disabled-stroke",
    ),

    tertiary: cn(
      "bg-btn-tertiary-bg !text-btn-tertiary-text",
      "border-[1px] border-btn-tertiary-stroke",
      "hover:bg-btn-tertiary-hover-bg hover:!text-btn-tertiary-hover-text",
      "hover:border-btn-tertiary-hover-stroke",
      "focus-visible:bg-btn-tertiary-focus-bg focus-visible:!text-btn-tertiary-focus-text",
      "focus-visible:border-btn-tertiary-focus-stroke",
      "focus-visible:ring-2 focus-visible:ring-btn-tertiary-focus-stroke/40 focus-visible:ring-offset-2",
      "disabled:bg-btn-tertiary-disabled-bg disabled:!text-btn-tertiary-disabled-text",
      "disabled:border-btn-tertiary-disabled-stroke",
    ),

    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",

    "destructive-outline": cn(
      "bg-transparent text-destructive",
      "border border-destructive",
      "hover:bg-destructive/10",
      "focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2",
      "disabled:text-destructive/50 disabled:border-destructive/40",
    ),
  },

  sizes: {
    lg: "h-11 rounded px-5 py-2.5 text-btn-lg gap-inner [&_svg]:h-5 [&_svg]:w-5",
    default:
      "h-10 rounded px-section py-inner text-btn-md gap-inner [&_svg]:h-[18px] [&_svg]:w-[18px]",
    md: "h-9 rounded px-section py-inner text-btn-sm gap-inner [&_svg]:h-4 [&_svg]:w-4",
    sm: "h-8 rounded px-grid py-1.5 text-btn-sm gap-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5",
    xs: "h-7 rounded px-2.5 py-1 text-btn-xs gap-1.5 [&_svg]:h-3 [&_svg]:w-3",
    icon: "h-9 w-9 rounded [&_svg]:h-[18px] [&_svg]:w-[18px]",
  },
} as const;
