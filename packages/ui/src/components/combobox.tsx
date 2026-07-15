import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";
import { MULTI_SELECT_STYLES } from "../styles/input.styles";

export interface ComboboxOption {
  value: string | number;
  label: string;
}

const comboboxTriggerVariants = cva(MULTI_SELECT_STYLES.trigger.base, {
  variants: {
    variant: {
      default: MULTI_SELECT_STYLES.trigger.variants.default,
      error: MULTI_SELECT_STYLES.trigger.variants.error,
      success: MULTI_SELECT_STYLES.trigger.variants.success,
    },
    size: {
      sm: MULTI_SELECT_STYLES.trigger.sizes.sm,
      md: MULTI_SELECT_STYLES.trigger.sizes.md,
      lg: MULTI_SELECT_STYLES.trigger.sizes.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

export interface ComboboxProps extends VariantProps<
  typeof comboboxTriggerVariants
> {
  options: ComboboxOption[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  triggerClassName?: string;
  onSearch?: (query: string) => void;
  isSearching?: boolean;
}

/**
 * Single-select combobox with a search field — this is "MultiSelect, but one
 * value" for cases like Location/Status pickers that need type-to-filter
 * without the chip/checkbox UI multi-select implies.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  label,
  error,
  success,
  disabled = false,
  clearable = false,
  size = "sm",
  variant,
  className,
  triggerClassName,
  onSearch,
  isSearching = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const computedVariant = error ? "error" : success ? "success" : variant;

  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const handleSelect = (optionValue: string | number) => {
    onChange(value === optionValue && clearable ? null : optionValue);
    setOpen(false);
    setQuery("");
    onSearch?.("");
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    onSearch?.(val);
  };

  return (
    <div className={cn("space-y-grid", className)}>
      {label && (
        <label className="block text-body-2 font-medium text-foreground mb-inner">
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              comboboxTriggerVariants({ variant: computedVariant, size }),
              disabled && MULTI_SELECT_STYLES.trigger.disabled,
              triggerClassName,
            )}
          >
            <span
              className={cn(
                "truncate flex-1 text-left",
                !selectedOption && MULTI_SELECT_STYLES.trigger.placeholder,
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDown className={MULTI_SELECT_STYLES.trigger.icon} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0"
          align="start"
          side="bottom"
          avoidCollisions
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            <CommandInput
              placeholder={searchPlaceholder}
              value={query}
              onValueChange={handleQueryChange}
            />
            <CommandList className="max-h-[min(280px,45vh)] overflow-y-auto">
              <CommandEmpty>
                {isSearching ? "Searching..." : emptyMessage}
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label || String(option.value)}
                      onSelect={() => handleSelect(option.value)}
                      className={cn(
                        MULTI_SELECT_STYLES.item,
                        isSelected && MULTI_SELECT_STYLES.itemChecked,
                      )}
                    >
                      <span className={MULTI_SELECT_STYLES.checkIcon}>
                        <Check
                          className={cn(
                            "h-4 w-4 transition-opacity",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </span>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-body-3 tracking-[-0.04em] leading-[1.5] text-field-error-text">
          {error}
        </p>
      )}
      {success && !error && (
        <p className="text-body-3 tracking-[-0.04em] leading-[1.5] text-field-success-text">
          {success}
        </p>
      )}
    </div>
  );
}
