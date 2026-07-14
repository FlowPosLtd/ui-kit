import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Tag } from "./tag";
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

export interface MultiSelectOption {
  value: string | number;
  label: string;
}

const multiSelectTriggerVariants = cva(MULTI_SELECT_STYLES.trigger.base, {
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

export interface MultiSelectProps extends VariantProps<
  typeof multiSelectTriggerVariants
> {
  options: MultiSelectOption[];
  selectedValues: (string | number)[];
  onSelectionChange: (values: (string | number)[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  label?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  showChips?: boolean;
  className?: string;
  triggerClassName?: string;
  onSearch?: (query: string) => void;
  isSearching?: boolean;
}

export function MultiSelect({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  label,
  error,
  success,
  disabled = false,
  showChips = true,
  size = "sm",
  variant,
  className,
  triggerClassName,
  onSearch,
  isSearching = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const computedVariant = error ? "error" : success ? "success" : variant;

  const selectedOptions = options.filter((opt) =>
    selectedValues.includes(opt.value),
  );

  const toggle = (value: string | number) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const remove = (value: string | number) => {
    onSelectionChange(selectedValues.filter((v) => v !== value));
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
              multiSelectTriggerVariants({ variant: computedVariant, size }),
              disabled && MULTI_SELECT_STYLES.trigger.disabled,
              triggerClassName,
            )}
          >
            <span
              className={cn(
                "truncate flex-1 text-left",
                selectedValues.length === 0 &&
                  MULTI_SELECT_STYLES.trigger.placeholder,
              )}
            >
              {selectedValues.length > 0
                ? `${selectedValues.length} ${selectedValues.length === 1 ? "option" : "options"} selected`
                : placeholder}
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
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label || String(option.value)}
                      onSelect={() => toggle(option.value)}
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

      {showChips && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-inner">
          {selectedOptions.map((option) => (
            <Tag
              key={option.value}
              variant="product"
              size="md"
              onRemove={disabled ? undefined : () => remove(option.value)}
            >
              {option.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
