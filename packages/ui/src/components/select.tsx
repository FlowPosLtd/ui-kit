import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { AlertCircle, Check, ChevronDown, ChevronUp } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { SELECT_STYLES } from "../styles/input.styles";

const selectTriggerVariants = cva(SELECT_STYLES.trigger.base, {
  variants: {
    variant: {
      default: SELECT_STYLES.trigger.variants.default,
      success: SELECT_STYLES.trigger.variants.success,
      error: SELECT_STYLES.trigger.variants.error,
    },
    size: {
      sm: SELECT_STYLES.trigger.sizes.sm,
      md: SELECT_STYLES.trigger.sizes.md,
      lg: SELECT_STYLES.trigger.sizes.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  error?: string;
  success?: string;
  label?: string;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      variant,
      size = "sm",
      error,
      success,
      label,
      showSuccessIcon = true,
      showErrorIcon = true,
      disabled,
      ...props
    },
    ref,
  ) => {
    const computedVariant = error ? "error" : success ? "success" : variant;

    const hasSuccessIcon = success && showSuccessIcon;
    const hasErrorIcon = error && showErrorIcon;

    return (
      <div>
        {label && (
          <label className="block text-body-2 font-medium text-foreground mb-inner">
            {label}
          </label>
        )}

        <SelectPrimitive.Trigger
          ref={ref}
          disabled={disabled}
          className={cn(
            selectTriggerVariants({ variant: computedVariant, size }),
            disabled && SELECT_STYLES.trigger.disabled,
            (hasSuccessIcon || hasErrorIcon) && "pr-10",
            className,
          )}
          {...props}
        >
          <div className="flex items-center gap-inner flex-1 overflow-hidden">
            {children}
          </div>

          <div className="flex items-center gap-inner shrink-0">
            {hasSuccessIcon && (
              <Check className="h-5 w-5 text-field-success-icon" />
            )}
            {hasErrorIcon && (
              <AlertCircle className="h-5 w-5 text-field-error-icon" />
            )}
            <SelectPrimitive.Icon asChild>
              <ChevronDown className={SELECT_STYLES.icon} />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>

        {error && (
          <p className="mt-1.5 text-body-3 tracking-[-0.04em] leading-[1.5] text-field-error-text">
            {error}
          </p>
        )}
        {success && !error && (
          <p className="mt-1.5 text-body-3 tracking-[-0.04em] leading-[1.5] text-field-success-text">
            {success}
          </p>
        )}
      </div>
    );
  },
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(SELECT_STYLES.scrollButton, className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(SELECT_STYLES.scrollButton, className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        SELECT_STYLES.content,
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          SELECT_STYLES.viewport.base,
          position === "popper" && SELECT_STYLES.viewport.popper,
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(SELECT_STYLES.label, className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(SELECT_STYLES.item, className)}
    {...props}
  >
    <span className={SELECT_STYLES.itemIndicator}>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(SELECT_STYLES.separator, className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
};
