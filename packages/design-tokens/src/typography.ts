type FontSizeEntry = [
  string,
  { lineHeight: string; letterSpacing: string; fontWeight: string },
];

export const typography = {
  fontFamily: {
    sans: [
      "Söhne",
      "Styrene A Web",
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Inter",
      "Geist Variable",
      "sans-serif",
    ] as string[],
    serif: [
      "Tiempos Text",
      "Copernicus",
      "Fraunces Variable",
      "ui-serif",
      "Georgia",
      "Cambria",
      "serif",
    ] as string[],
  },

  fontSize: {
    "heading-1": [
      "24px",
      { lineHeight: "1.2", letterSpacing: "-0.04em", fontWeight: "600" },
    ] as FontSizeEntry,
    "heading-2": [
      "20px",
      { lineHeight: "1.2", letterSpacing: "-0.04em", fontWeight: "600" },
    ] as FontSizeEntry,
    "heading-3": [
      "17px",
      { lineHeight: "1.2", letterSpacing: "-0.04em", fontWeight: "600" },
    ] as FontSizeEntry,
    "heading-4": [
      "14px",
      { lineHeight: "1.2", letterSpacing: "-0.04em", fontWeight: "500" },
    ] as FontSizeEntry,
    "heading-5": [
      "14px",
      { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" },
    ] as FontSizeEntry,
    "body-1": [
      "16px",
      { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" },
    ] as FontSizeEntry,
    "body-2": [
      "14px",
      { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" },
    ] as FontSizeEntry,
    "body-3": [
      "12px",
      { lineHeight: "1.5", letterSpacing: "0.005em", fontWeight: "400" },
    ] as FontSizeEntry,
    "btn-lg": [
      "16px",
      { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "500" },
    ] as FontSizeEntry,
    "btn-md": [
      "14px",
      { lineHeight: "1.2", letterSpacing: "-0.005em", fontWeight: "500" },
    ] as FontSizeEntry,
    "btn-sm": [
      "13px",
      { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" },
    ] as FontSizeEntry,
    "btn-xs": [
      "12px",
      { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" },
    ] as FontSizeEntry,
  },
} as const;
