import * as React from "react";
import { cn } from "../lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded px-grid py-inner text-sm text-field-text",
            "bg-field-bg border-[1px] border-field-border shadow-[shadow:var(--shadow-input)]",
            "placeholder:text-field-text-placeholder placeholder:font-normal",
            "focus-visible:outline-none focus:bg-field-focus focus:border-field-border-focus",
            "focus:shadow-[shadow:0_0_0_3px_var(--input-shadow-focus),var(--shadow-input)]",
            "transition-all duration-100 ease-out",
            "disabled:cursor-not-allowed disabled:bg-field-disabled disabled:border-field-border-disabled disabled:text-field-text-disabled",
            error ? "border-destructive" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-body-2 text-destructive mt-1">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
