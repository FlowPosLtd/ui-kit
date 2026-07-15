import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";
import { BUTTON_STYLES } from "../styles/button.styles";

const buttonVariants = cva(BUTTON_STYLES.base, {
  variants: {
    variant: {
      default: BUTTON_STYLES.variants.primary,
      secondary: BUTTON_STYLES.variants.secondary,
      tertiary: BUTTON_STYLES.variants.tertiary,
      destructive: BUTTON_STYLES.variants.destructive,
      "destructive-outline": BUTTON_STYLES.variants["destructive-outline"],
      ghost: BUTTON_STYLES.variants.ghost,
      link: BUTTON_STYLES.variants.link,
    },
    size: {
      lg: BUTTON_STYLES.sizes.lg,
      default: BUTTON_STYLES.sizes.default,
      md: BUTTON_STYLES.sizes.md,
      sm: BUTTON_STYLES.sizes.sm,
      xs: BUTTON_STYLES.sizes.xs,
      icon: BUTTON_STYLES.sizes.icon,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      disabled,
      label,
      icon,
      iconPosition = "left",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      // Slot requires exactly one child element to clone props onto — it can't
      // merge onto the loading-spinner + <span> wrapper below, so asChild bypasses
      // that structure entirely and renders `children` (e.g. a <Link>) directly.
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }), "relative")}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    const content = children || (
      <>
        {icon && iconPosition === "left" && icon}
        {label}
        {icon && iconPosition === "right" && icon}
      </>
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "relative")}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-2.5",
            loading && "invisible",
          )}
        >
          {content}
        </span>
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
