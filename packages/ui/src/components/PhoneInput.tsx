import * as React from "react";
import { AsYouType, getCountryCallingCode } from "libphonenumber-js";
import { AlertCircle, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { PHONE_INPUT_STYLES } from "../styles/input.styles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";

const COUNTRY_NAMES: Record<string, string> = {
  GB: "United Kingdom",
};

const FLAG_EMOJI: Record<string, string> = Object.fromEntries(
  Object.keys(COUNTRY_NAMES).map((code) => [
    code,
    code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0))),
  ]),
);

const COUNTRIES = Object.entries(COUNTRY_NAMES)
  .map(([code, name]) => ({
    code,
    name,
    dialCode: `+${getCountryCallingCode(code as any)}`,
    flag: FLAG_EMOJI[code],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  defaultCountry?: string;
  label?: string;
  error?: string;
  success?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value = "",
      onChange,
      onBlur,
      defaultCountry = "GB",
      label,
      error,
      success,
      placeholder,
      disabled = false,
      size = "sm",
      className,
    },
    ref,
  ) => {
    const [selectedCountry, setSelectedCountry] =
      React.useState(defaultCountry);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value);

    const country =
      COUNTRIES.find((c) => c.code === selectedCountry) ??
      COUNTRIES.find((c) => c.code === "GB")!;
    const computedVariant: "default" | "error" | "success" = error
      ? "error"
      : success
        ? "success"
        : "default";
    const S = PHONE_INPUT_STYLES;

    React.useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleCountryChange = (code: string) => {
      setSelectedCountry(code);
      setOpen(false);
      if (inputValue) {
        const formatted = new AsYouType(code as any).input(
          inputValue.replace(/^\+\d+\s*/, ""),
        );
        setInputValue(formatted);
        onChange?.(formatted);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = new AsYouType(selectedCountry as any).input(
        e.target.value,
      );
      setInputValue(formatted);
      onChange?.(formatted);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-2 font-medium text-content-secondary mb-1">
            {label}
          </label>
        )}

        <div
          className={cn(
            S.wrapper.base,
            S.wrapper.variants[computedVariant],
            S.wrapper.sizes[size ?? "lg"],
            disabled && S.wrapper.disabled,
            className,
          )}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              disabled={disabled}
              className={cn(
                S.countryTrigger.base,
                S.wrapper.sizes[size ?? "lg"],
                disabled && S.countryTrigger.disabled,
              )}
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className={S.dialCode}>{country.dialCode}</span>
              <ChevronsUpDown className={S.chevron} />
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList className="max-h-60">
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {COUNTRIES.map((c) => (
                      <CommandItem
                        key={c.code}
                        value={`${c.name} ${c.dialCode}`}
                        onSelect={() => handleCountryChange(c.code)}
                        className={cn(
                          "flex items-center gap-inner cursor-pointer",
                          selectedCountry === c.code && "bg-field-active",
                        )}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="flex-1 text-body-3 truncate">
                          {c.name}
                        </span>
                        <span className="text-body-3 text-content-tertiary shrink-0">
                          {c.dialCode}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <input
            ref={ref}
            type="tel"
            inputMode="tel"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder ?? "XXX - XXXX - XXXX"}
            className={S.input}
          />

          {error && (
            <div className="pr-grid shrink-0">
              <AlertCircle className="h-5 w-5 text-field-error-icon" />
            </div>
          )}
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

PhoneInput.displayName = "PhoneInput";
export { PhoneInput };
