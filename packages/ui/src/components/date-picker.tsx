import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "lucide-react";
import { cn } from "../lib/cn";
import { DATE_RANGE_PICKER_STYLES as S } from "../styles/input.styles";

interface DatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  align?: "start" | "end";
  labelClassName?: string;
  /** Include a time component (datetime-local input) instead of date-only. */
  includeTime?: boolean;
  min?: string;
  max?: string;
}

function formatDisplayDate(isoLocal: string, includeTime: boolean): string {
  if (!isoLocal) return "";
  const [datePart, timePart] = isoLocal.split("T");
  const [year, month, day] = datePart.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const dateStr = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (includeTime && timePart) return `${dateStr}, ${timePart}`;
  return dateStr;
}

/**
 * Single-date counterpart to DateRangePicker — same trigger/popover visual
 * language, but for pickers that only need one date (not a from/to range).
 */
export function DatePicker({
  value,
  onChange,
  onClear,
  placeholder = "Select date",
  size = "md",
  disabled = false,
  className,
  align = "start",
  labelClassName,
  includeTime = false,
  min,
  max,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{
    bottom: number;
    left: number;
    right: number;
    width: number;
  } | null>(null);

  const [draft, setDraft] = useState(value ?? "");

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  const updatePopoverPos = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPopoverPos({
      bottom: window.innerHeight - rect.top + 6,
      left: rect.left,
      right: window.innerWidth - rect.right,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePopoverPos();
    const handler = (e: MouseEvent) => {
      const path = e.composedPath();
      const inPopover =
        popoverRef.current &&
        (path.includes(popoverRef.current) ||
          popoverRef.current.contains(e.target as Node));
      const inTrigger =
        triggerRef.current &&
        (path.includes(triggerRef.current) ||
          triggerRef.current.contains(e.target as Node));
      if (!inPopover && !inTrigger) {
        setOpen(false);
        setDraft(value ?? "");
      }
    };

    document.addEventListener("click", handler);
    window.addEventListener("scroll", updatePopoverPos, true);
    window.addEventListener("resize", updatePopoverPos);
    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener("scroll", updatePopoverPos, true);
      window.removeEventListener("resize", updatePopoverPos);
    };
  }, [open, value, updatePopoverPos]);

  const handleApply = () => {
    if (draft) {
      onChange(draft);
    }
    setOpen(false);
  };

  const handleClear = () => {
    setDraft("");
    onClear?.();
    setOpen(false);
  };

  const label = value ? formatDisplayDate(value, includeTime) : null;

  return (
    <div className={cn("relative w-full", className)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        data-state={open ? "open" : "closed"}
        onClick={() => {
          if (!disabled) {
            updatePopoverPos();
            setOpen((v) => !v);
          }
        }}
        className={cn(S.trigger, S.triggerSizes[size], "w-full")}
      >
        <Calendar className={S.icon} />
        {label ? (
          <span className={cn(S.label, labelClassName)}>{label}</span>
        ) : (
          <span className={S.placeholder}>{placeholder}</span>
        )}
      </button>

      {open &&
        popoverPos &&
        createPortal(
          <div
            ref={popoverRef}
            data-state="open"
            data-date-picker-portal="true"
            style={{
              position: "fixed",
              bottom: popoverPos.bottom,
              ...(align === "end"
                ? { right: popoverPos.right }
                : { left: popoverPos.left }),
              width: Math.max(popoverPos.width, 260),
              zIndex: 9999,
            }}
            className={cn(S.popover)}
          >
            <div className="mb-section">
              <label className={S.sectionLabel}>Date</label>
              <input
                type={includeTime ? "datetime-local" : "date"}
                value={draft}
                min={min}
                max={max}
                onChange={(e) => setDraft(e.target.value)}
                className={S.nativeInput}
              />
            </div>

            <div className={S.footer}>
              <button
                type="button"
                onClick={handleClear}
                className={S.clearButton}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!draft}
                className={cn(
                  S.applyButton,
                  !draft && "opacity-50 cursor-not-allowed",
                )}
              >
                Apply
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
