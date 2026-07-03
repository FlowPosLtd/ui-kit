import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { CHECKBOX_STYLES } from "../styles/input.styles";

const checkboxVariants = cva(CHECKBOX_STYLES.root.base, {
  variants: {
    variant: {
      default: CHECKBOX_STYLES.root.variants.default,
      success: CHECKBOX_STYLES.root.variants.success,
      error: CHECKBOX_STYLES.root.variants.error,
    },
    size: {
      sm: CHECKBOX_STYLES.root.sizes.sm,
      md: CHECKBOX_STYLES.root.sizes.md,
      lg: CHECKBOX_STYLES.root.sizes.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface CheckboxProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "checked">,
    VariantProps<typeof checkboxVariants> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  label?: string;
  description?: string;
  error?: string;
  success?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      variant,
      size = "md",
      checked,
      onCheckedChange,
      label,
      description,
      error,
      success,
      disabled,
      ...props
    },
    ref,
  ) => {
    const computedVariant = error ? "error" : success ? "success" : variant;
    const iconSize =
      CHECKBOX_STYLES.icon[(size ?? "md") as keyof typeof CHECKBOX_STYLES.icon];

    if (label || description || error || success) {
      return (
        <div className="flex items-start gap-grid">
          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              checkboxVariants({ variant: computedVariant, size }),
              disabled && CHECKBOX_STYLES.root.disabled,
              "mt-0.5",
              className,
            )}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            {...props}
          >
            <CheckboxPrimitive.Indicator className={CHECKBOX_STYLES.indicator}>
              {checked === "indeterminate" ? (
                <Minus className={iconSize} />
              ) : (
                <Check className={iconSize} />
              )}
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          <div className="flex flex-col gap-1">
            {label && (
              <label
                className={cn(
                  "text-body-2 font-medium cursor-pointer",
                  disabled ? "text-field-text-disabled" : "text-foreground",
                )}
                onClick={(e) => {
                  if (!disabled) {
                    e.preventDefault();
                    const newValue =
                      checked === "indeterminate"
                        ? true
                        : checked
                          ? false
                          : true;
                    onCheckedChange?.(newValue);
                  }
                }}
              >
                {label}
              </label>
            )}
            {description && !error && !success && (
              <p className="text-body-3 text-muted-foreground">{description}</p>
            )}
            {error && <p className="text-body-3 text-field-error-text">{error}</p>}
            {success && !error && (
              <p className="text-body-3 text-field-success-text">{success}</p>
            )}
          </div>
        </div>
      );
    }

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          checkboxVariants({ variant: computedVariant, size }),
          disabled && CHECKBOX_STYLES.root.disabled,
          className,
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={CHECKBOX_STYLES.indicator}>
          {checked === "indeterminate" ? (
            <Minus className={iconSize} />
          ) : (
            <Check className={iconSize} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
