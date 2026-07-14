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

export const SELECT_STYLES = {
  trigger: {
    base: cn(
      "flex w-full items-center justify-between rounded px-[15px]",
      "text-body-1 font-normal leading-[1.5]",
      "text-field-text",
      "focus-visible:outline-none",
      "transition-all duration-100 ease-out",
      "disabled:cursor-not-allowed",
      "[&>span]:line-clamp-1",
    ),

    variants: {
      default: cn(
        "bg-field-bg border-[1px] border-field-border",
        "hover:bg-field-hover",
        "data-[state=open]:bg-field-active data-[state=open]:border-field-border-active",
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
  },

  content: cn(
    "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border",
    "bg-popover border-field-border",
    "shadow-md",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  ),

  viewport: {
    base: "p-1",
    popper:
      "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
  },

  item: cn(
    "relative flex w-full cursor-default select-none items-center rounded",
    "py-inner pl-8 pr-inner my-0.5",
    "text-body-2 font-normal leading-[1.5]",
    "text-field-text",
    "outline-none",
    "hover:bg-field-hover",
    "focus:bg-field-focus",
    "data-[state=checked]:bg-field-active",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    "transition-colors duration-100",
  ),

  label: cn(
    "py-1.5 pl-8 pr-inner",
    "text-body-3 font-semibold leading-[1.5]",
    "text-muted-foreground",
  ),

  separator: cn("-mx-1 my-1 h-px bg-border"),

  scrollButton: cn(
    "flex cursor-default items-center justify-center py-1",
    "text-muted-foreground",
  ),

  icon: "h-4 w-4 opacity-50 transition-opacity",

  itemIndicator: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
} as const;

export const MULTI_SELECT_STYLES = {
  trigger: {
    base: cn(
      "flex w-full items-center justify-between rounded px-[15px]",
      "text-body-1 font-normal leading-[1.5]",
      "text-field-text",
      "focus-visible:outline-none",
      "transition-all duration-100 ease-out",
      "disabled:cursor-not-allowed",
      "[&>span]:line-clamp-1",
    ),

    variants: {
      default: cn(
        "bg-field-bg border-[1px] border-field-border",
        "hover:bg-field-hover",
        "focus:bg-field-focus focus:border-field-border-focus",
        "focus:shadow-[0px_0px_0px_2px_var(--input-shadow-focus)]",
        "data-[state=open]:bg-field-active data-[state=open]:border-field-border-active",
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

    placeholder: "text-field-text-placeholder",

    icon: "h-4 w-4 opacity-50 transition-opacity shrink-0",
  },

  item: cn(
    "relative flex w-full cursor-pointer select-none items-center rounded",
    "py-inner pl-8 pr-inner my-0.5",
    "text-body-2 font-normal leading-[1.5]",
    "text-field-text",
    "outline-none",
    "transition-colors duration-100",
    "hover:!bg-field-hover",
  ),

  itemChecked: "!bg-field-active",

  checkIcon: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
} as const;

export const DATE_RANGE_PICKER_STYLES = {
  trigger: cn(
    "inline-flex items-center gap-inner rounded px-[15px]",
    "text-body-2 font-normal leading-[1.5]",
    "text-field-text",
    "bg-field-hover border-[1px] border-field-border",
    "hover:bg-field-hover",
    "data-[state=open]:bg-field-active data-[state=open]:border-field-border-active",
    "data-[state=open]:shadow-[0px_0px_0px_2px_var(--input-shadow-focus)]",
    "focus-visible:outline-none",
    "transition-all duration-100 ease-out",
    "cursor-pointer select-none",
    "disabled:cursor-not-allowed disabled:bg-field-disabled disabled:border-field-border-disabled disabled:text-field-text-disabled",
  ),

  triggerSizes: {
    sm: "h-10",
    md: "h-12",
    lg: "h-14",
  },

  icon: cn("w-4 h-4 shrink-0 text-content-secondary"),

  label: cn("text-body-3 text-content-secondary"),

  placeholder: cn("text-body-2 text-field-text-placeholder"),

  separator: cn("text-field-text-placeholder mx-0.5"),

  popover: cn(
    "z-50 rounded border border-field-border bg-popover shadow-md p-section",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[side=bottom]:slide-in-from-top-2",
  ),

  nativeInput: cn(
    "flex w-full rounded px-[15px] h-10",
    "text-body-2 font-normal leading-[1.5]",
    "text-field-text",
    "bg-field-bg border-[1px] border-field-border",
    "hover:bg-field-hover",
    "focus:bg-field-focus focus:border-field-border-focus",
    "focus:shadow-[0px_0px_0px_2px_var(--input-shadow-focus)]",
    "focus-visible:outline-none",
    "transition-all duration-100 ease-out",
    "[color-scheme:light] dark:[color-scheme:dark]",
  ),

  sectionLabel: cn(
    "text-body-3 font-semibold text-content-secondary mb-1.5 block",
  ),

  footer: cn(
    "flex items-center justify-end gap-inner mt-section pt-grid border-t border-border",
  ),

  applyButton: cn(
    "h-9 px-section rounded text-body-3 font-semibold",
    "bg-primary text-primary-foreground",
    "hover:bg-primary/90",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  ),

  clearButton: cn(
    "h-9 px-section rounded text-body-3 font-normal",
    "bg-field-bg border border-field-border text-field-text",
    "hover:bg-field-hover",
    "transition-colors duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  ),
} as const;

export const PHONE_INPUT_STYLES = {
  wrapper: {
    base: cn(
      "flex w-full items-center rounded overflow-hidden",
      "text-body-1 font-normal leading-[1.5]",
      "transition-all duration-100 ease-out",
    ),
    variants: {
      default: cn(
        "bg-field-bg border-[1px] border-field-border",
        "hover:bg-field-hover",
        "focus-within:bg-field-focus focus-within:border-field-border-focus",
        "focus-within:shadow-[0px_0px_0px_2px_var(--input-shadow-focus)]",
      ),
      error: cn("bg-field-error-bg border-[1px] border-field-error-border"),
      success: cn(
        "bg-field-success-bg border-[1.2px] border-field-success-border",
      ),
    },
    disabled: cn(
      "cursor-not-allowed bg-field-disabled border-field-border-disabled",
      "text-field-text-disabled opacity-100",
    ),
    sizes: {
      sm: "h-10",
      md: "h-12",
      lg: "h-14",
    },
  },

  countryTrigger: {
    base: cn(
      "flex items-center gap-1.5 px-grid shrink-0",
      "border-r border-field-border",
      "hover:bg-field-hover transition-colors duration-100",
      "focus-visible:outline-none",
    ),
    disabled: "pointer-events-none opacity-50",
  },

  input: cn(
    "flex-1 h-full px-grid bg-transparent",
    "text-field-text placeholder:text-field-text-placeholder",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed",
  ),

  dialCode: "text-body-3 text-content-secondary font-medium",

  chevron: "w-3 h-3 text-content-tertiary shrink-0",
} as const;
