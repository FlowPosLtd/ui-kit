import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-grid border py-1 text-body-3 font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary !text-primary-foreground",
        secondary: "border-transparent bg-secondary !text-content-secondary",
        destructive:
          "border-transparent bg-tag-destructive !text-tag-destructive-text",
        outline: "border-neutral-200 bg-transparent !text-foreground",

        "border-active":
          "bg-transparent border-neutral-200 !text-content-secondary",
        "border-inactive":
          "bg-transparent border-neutral-200 !text-content-tertiary",

        "status-success":
          "border-transparent bg-tag-success !text-tag-success-text",
        "status-warning":
          "border-transparent bg-amber-100 !text-amber-700 dark:bg-amber-900/30 dark:!text-amber-400",
        "status-danger":
          "border-transparent bg-tag-destructive !text-tag-destructive-text",
        "status-info": "border-transparent bg-info-bg !text-info-text",
        "status-neutral":
          "border-transparent bg-tag-disabled !text-content-disabled",

        tag: "bg-transparent border-neutral-200 !text-content-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  label?: string;
  dotColor?: string;
}

function Badge({
  className,
  variant,
  label,
  children,
  dotColor,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dotColor && (
        <span
          className={cn("mr-1.5 h-2 w-2 rounded-full shrink-0", dotColor)}
        />
      )}
      {label || children}
    </div>
  );
}

export { Badge, badgeVariants };
