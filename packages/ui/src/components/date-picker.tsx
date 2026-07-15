import * as React from "react";
import { Calendar } from "lucide-react";
import { cn } from "../lib/cn";
import { INPUT_STYLES } from "../styles/input.styles";

export interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  /** Include a time component (datetime-local input) instead of date-only. */
  includeTime?: boolean;
  min?: string;
  max?: string;
}

/**
 * Single date field — a plain native <input type="date"> styled to match the
 * rest of the field system. Clicking anywhere in the field (not just the native
 * calendar glyph) opens the browser's own date picker via showPicker(), same
 * convention as every native date input.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder,
      size = "sm",
      disabled = false,
      className,
      includeTime = false,
      min,
      max,
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLInputElement>(null);

    const openPicker = () => {
      const el = innerRef.current;
      if (el && "showPicker" in el) {
        try {
          (el as HTMLInputElement & { showPicker: () => void }).showPicker();
        } catch {
          // showPicker() throws if the element isn't focused/visible in some browsers — ignore, native click still works.
        }
      }
    };

    return (
      <div className={cn("relative w-full", className)}>
        <Calendar className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 h-4 w-4 text-content-secondary" />
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          type={includeTime ? "datetime-local" : "date"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          onClick={openPicker}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          className={cn(
            INPUT_STYLES.base,
            INPUT_STYLES.variants.default,
            INPUT_STYLES.sizes[size],
            disabled && INPUT_STYLES.disabled,
            "pl-10 [color-scheme:light] dark:[color-scheme:dark]",
          )}
        />
      </div>
    );
  },
);
DatePicker.displayName = "DatePicker";
