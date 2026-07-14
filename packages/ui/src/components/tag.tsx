import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../lib/cn";
import { cva, type VariantProps } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full text-body-3 transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-tag-primary !text-content-white",
        secondary: "bg-tag-secondary text-secondary-foreground",
        success: "bg-tag-success text-success",
        destructive: "bg-tag-destructive text-destructive",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        muted: "bg-tag-disabled !text-content-secondary",
        product:
          "bg-tag-product-bg border border-tag-product-border text-tag-product-text",
      },
      size: {
        sm: "px-inner py-1 text-body-3",
        md: "px-2.5 py-1 text-body-3",
        lg: "px-grid py-1.5 text-body-3 w-[70px] h-[24px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface TagProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

export const Tag = ({
  className,
  variant,
  size,
  onRemove,
  children,
  ...props
}: TagProps) => {
  return (
    <span
      className={cn(
        tagVariants({ variant, size }),
        onRemove && "pr-1.5",
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 inline-flex items-center justify-center w-5 h-3.5 rounded hover:opacity-70 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};
