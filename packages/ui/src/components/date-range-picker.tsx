import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Calendar, X } from "lucide-react";
import { cn } from "../lib/cn";
import { DATE_RANGE_PICKER_STYLES as S } from "../styles/input.styles";

export interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  value: DateRange | null;
  onChange: (range: DateRange) => void;
  onClear?: () => void;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  align?: "start" | "end";
  labelClassName?: string;
}

function formatDisplayDate(isoLocal: string): string {
  if (!isoLocal) return "";
  const [datePart, timePart] = isoLocal.split("T");
  const [year, month, day] = datePart.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const dateStr = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  if (timePart) return `${dateStr}, ${timePart}`;
  return dateStr;
}

function formatRangeLabel(range: DateRange | null): string | null {
  if (!range?.from || !range?.to) return null;
  return `${formatDisplayDate(range.from)} - ${formatDisplayDate(range.to)}`;
}

export function DateRangePicker({
  value,
  onChange,
  onClear,
  placeholder = "Select date range",
  size = "md",
  disabled = false,
  className,
  align = "start",
  labelClassName,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState<{
    bottom: number;
    left: number;
    right: number;
    width: number;
  } | null>(null);

  const [draft, setDraft] = useState<DateRange>({
    from: value?.from ?? "",
    to: value?.to ?? "",
  });

  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDraft({ from: value?.from ?? "", to: value?.to ?? "" });
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
        setDraft({ from: value?.from ?? "", to: value?.to ?? "" });
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

  const isInvalidRange = !!(draft.from && draft.to && draft.from >= draft.to);

  const handleApply = () => {
    if (draft.from && draft.to && !isInvalidRange) {
      onChange(draft);
    }
    setOpen(false);
  };

  const handleClear = () => {
    setDraft({ from: "", to: "" });
    onClear?.();
    setOpen(false);
  };

  const label = formatRangeLabel(value);

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
            data-date-range-portal="true"
            style={{
              position: "fixed",
              bottom: popoverPos.bottom,
              ...(align === "end"
                ? { right: popoverPos.right }
                : { left: popoverPos.left }),
              width: Math.max(popoverPos.width, 320),
              zIndex: 9999,
            }}
            className={cn(S.popover)}
          >
            <div className="flex items-center justify-between mb-section">
              <span className={S.sectionLabel} style={{ marginBottom: 0 }}>
                Date Range
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setDraft({ from: value?.from ?? "", to: value?.to ?? "" });
                }}
                className="inline-flex items-center justify-center w-6 h-6 rounded text-content-secondary hover:text-content-primary hover:bg-field-hover transition-colors duration-100 focus-visible:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-section">
              <label className={S.sectionLabel}>From</label>
              <input
                type="datetime-local"
                value={draft.from}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, from: e.target.value }))
                }
                className={S.nativeInput}
              />
            </div>

            <div>
              <label className={S.sectionLabel}>To</label>
              <input
                type="datetime-local"
                value={draft.to}
                min={draft.from || undefined}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, to: e.target.value }))
                }
                className={cn(
                  S.nativeInput,
                  isInvalidRange && "border-destructive focus:border-destructive",
                )}
              />
              {isInvalidRange && (
                <p className="mt-1.5 text-[11px] text-destructive">
                  "To" must be after "From"
                </p>
              )}
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
                disabled={!draft.from || !draft.to || isInvalidRange}
                className={cn(
                  S.applyButton,
                  (!draft.from || !draft.to || isInvalidRange) &&
                    "opacity-50 cursor-not-allowed",
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
