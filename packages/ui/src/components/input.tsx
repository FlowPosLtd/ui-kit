import * as React from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { INPUT_STYLES } from "../styles/input.styles";
import { ErrorIcon } from "../icons/ErrorIcon";

const inputVariants = cva(INPUT_STYLES.base, {
  variants: {
    variant: {
      default: INPUT_STYLES.variants.default,
      success: INPUT_STYLES.variants.success,
      error: INPUT_STYLES.variants.error,
    },
    size: {
      sm: INPUT_STYLES.sizes.sm,
      md: INPUT_STYLES.sizes.md,
      lg: INPUT_STYLES.sizes.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

export interface InputProps
  extends
    Omit<React.ComponentProps<"input">, "type" | "size">,
    VariantProps<typeof inputVariants> {
  error?: string;
  success?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  required?: boolean;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size = "sm",
      type = "text",
      error,
      success,
      leftIcon,
      rightIcon,
      label,
      required,
      showSuccessIcon = true,
      showErrorIcon = true,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const computedVariant = error ? "error" : success ? "success" : variant;

    const hasSuccessIcon = success && showSuccessIcon && !isPassword;
    const hasErrorIcon = error && showErrorIcon && !isPassword;
    const hasRightContent =
      rightIcon || isPassword || hasSuccessIcon || hasErrorIcon;

    return (
      <div>
        {label && (
          <label className="block text-body-2 font-medium text-content-secondary mb-1">
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                disabled ? "text-muted-foreground/50" : "text-muted-foreground",
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              inputVariants({ variant: computedVariant, size }),
              disabled && INPUT_STYLES.disabled,
              leftIcon && "pl-10",
              hasRightContent && "pr-10",
              className,
            )}
            {...props}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-inner">
            {hasSuccessIcon && (
              <Check className="h-5 w-5 text-field-success-icon" />
            )}
            {hasErrorIcon && (
              <ErrorIcon size={20} className="text-field-error-icon" />
            )}
            {isPassword && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((p) => !p)}
                disabled={disabled}
                className={cn(
                  "transition-colors",
                  disabled
                    ? "text-muted-foreground/50"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
            {!isPassword && !hasSuccessIcon && !hasErrorIcon && rightIcon && (
              <div
                className={cn(
                  "transition-colors",
                  disabled
                    ? "text-muted-foreground/50"
                    : "text-muted-foreground",
                )}
              >
                {rightIcon}
              </div>
            )}
          </div>
        </div>

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

Input.displayName = "Input";
export { Input, inputVariants };
