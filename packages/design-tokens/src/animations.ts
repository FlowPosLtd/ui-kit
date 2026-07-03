export const animations = {
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" },
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" },
    },
    shimmer: {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
    routeFade: {
      "0%": { opacity: "0", transform: "translateY(4px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    "toast-aurora": {
      "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
      "50%": { transform: "translate3d(-15%, 10%, 0) scale(1.2)" },
    },
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out",
    shimmer: "shimmer 2.2s linear infinite",
    "toast-aurora": "toast-aurora 12s ease-in-out infinite",
  },
} as const;
