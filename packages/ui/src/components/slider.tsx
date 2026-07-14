import * as React from "react";
import { cn } from "../lib/cn";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-body-3 text-content-secondary font-medium flex items-center justify-between mb-5">
          <span>{label}</span>
          <span className="ml-inner text-body-3 text-content-tertiary font-mono">{value}px</span>
        </label>
      )}
      <div className="relative w-full flex items-center mt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={cn(
            // Track
            "w-full h-2 rounded-full bg-muted-foreground/30 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary transition-all",
            // Thumb (centered, more)
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:-mt-1",
            "[&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:-mt-1",
            "[&::-ms-thumb]:w-6 [&::-ms-thumb]:h-6 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-white [&::-ms-thumb]:border-2 [&::-ms-thumb]:border-primary [&::-ms-thumb]:shadow-md [&::-ms-thumb]:transition-all [&::-ms-thumb]:-mt-1",
            // Remove default focus outline
            "focus:outline-none",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};
