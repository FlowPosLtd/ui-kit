import type { ReactNode } from "react";
import { Button, type ButtonProps } from "./button";

interface ToggleOption<T> {
  label: ReactNode;
  value: T;
}

interface ToggleButtonGroupProps<T> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: ButtonProps["size"];
  className?: string;
  selectedVariant?: ButtonProps["variant"];
}

export function ToggleButtonGroup<T extends string | number | boolean>({
  options,
  value,
  onChange,
  size = "sm",
  className = "",
  selectedVariant = "default",
}: ToggleButtonGroupProps<T>) {
  return (
    <div className={`flex items-center gap-1 border rounded p-1 ${className}`}>
      {options.map((option) => (
        <Button
          key={String(option.value)}
          type="button"
          size={size}
          variant={value === option.value ? selectedVariant : "ghost"}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
