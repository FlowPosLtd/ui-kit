/**
 * Color tokens. Every value resolves through a CSS variable (see css/tokens.css)
 * so light/dark switching and future re-theming never require a JS/Tailwind rebuild.
 */
export const colors = {
  border: "hsl(var(--border))",
  skeleton: "hsl(var(--skeleton))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--color-neutral-900))",
  white: "hsl(var(--color-neutral-0))",

  neutral: {
    0: "hsl(var(--color-neutral-0))",
    50: "hsl(var(--color-neutral-50))",
    100: "hsl(var(--color-neutral-100))",
    200: "hsl(var(--color-neutral-200))",
    300: "hsl(var(--color-neutral-300))",
    400: "hsl(var(--color-neutral-400))",
    900: "hsl(var(--color-neutral-900))",
  },

  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary))",
    foreground: "hsl(var(--secondary-foreground))",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive))",
    foreground: "hsl(var(--destructive-foreground))",
  },
  muted: {
    DEFAULT: "hsl(var(--muted))",
    foreground: "hsl(var(--muted-foreground))",
  },
  accent: {
    DEFAULT: "hsl(var(--accent))",
    foreground: "hsl(var(--accent-foreground))",
  },
  popover: {
    DEFAULT: "hsl(var(--popover))",
    foreground: "hsl(var(--popover-foreground))",
  },
  card: {
    DEFAULT: "hsl(var(--card))",
    foreground: "hsl(var(--card-foreground))",
  },
  lightGray: {
    DEFAULT: "hsl(var(--color-neutral-100))",
  },

  tag: {
    primary: "hsl(var(--tag-primary))",
    "primary-hover": "hsl(var(--tag-primary-hover))",
    secondary: "hsl(var(--tag-secondary))",
    success: "hsl(var(--tag-success))",
    destructive: "hsl(var(--tag-destructive))",
    disabled: "hsl(var(--tag-disabled))",
    pink: "hsl(var(--tag-pink))",
    "success-text": "hsl(var(--tag-success-text))",
    "destructive-text": "hsl(var(--tag-destructive-text))",
    "product-bg": "hsl(var(--tag-product-bg))",
    "product-border": "hsl(var(--tag-product-border))",
    "product-text": "hsl(var(--tag-product-text))",
  },

  warning: {
    bg: "hsl(var(--color-warning-bg))",
    text: "hsl(var(--color-warning-text))",
  },

  info: {
    bg: "hsl(var(--color-info-bg))",
    text: "hsl(var(--color-info-text))",
  },

  orderStatus: {
    completed: {
      bg: "hsl(var(--color-success-bg))",
      text: "hsl(var(--color-success-text))",
    },
    delivered: {
      bg: "hsl(var(--color-success-bg))",
      text: "hsl(var(--color-success-text))",
    },
    preparing: {
      bg: "hsl(var(--color-warning-bg))",
      text: "hsl(var(--color-warning-text))",
    },
    pending: {
      bg: "hsl(var(--color-disabled-bg))",
      text: "hsl(var(--color-neutral-300))",
    },
    cancelled: {
      bg: "hsl(var(--color-error-bg))",
      text: "hsl(var(--color-error-text))",
    },
    ready: {
      bg: "hsl(var(--color-info-bg))",
      text: "hsl(var(--color-info-text))",
    },
    shipped: {
      bg: "hsl(var(--color-info-bg))",
      text: "hsl(var(--color-info-text))",
    },
  },

  order: {
    pending: "hsl(var(--color-order-pending))",
    confirmed: "hsl(var(--color-order-confirmed))",
    processing: "hsl(var(--color-order-processing))",
    onhold: "hsl(var(--color-order-onhold))",
    completed: "hsl(var(--color-order-completed))",
    cancelled: "hsl(var(--color-order-cancelled))",
    default: "hsl(var(--color-order-default))",
  },

  content: {
    primary: "hsl(var(--color-neutral-900))",
    secondary: "hsl(var(--color-neutral-400))",
    "pink-hover": "hsl(var(--color-pink-hover))",
    tertiary: "hsl(var(--color-neutral-300))",
    subtle: "hsl(var(--color-neutral-100))",
    white: "hsl(var(--color-neutral-0))",
    disabled: "hsl(var(--color-disabled-text))",
    success: "hsl(var(--color-success-text))",
    destructive: "hsl(var(--color-error-text))",
  },

  sidebar: {
    DEFAULT: "hsl(var(--sidebar-background))",
    foreground: "hsl(var(--sidebar-foreground))",
    primary: "hsl(var(--sidebar-primary))",
    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
    accent: "hsl(var(--sidebar-accent))",
    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
    border: "hsl(var(--sidebar-border))",
    ring: "hsl(var(--sidebar-ring))",
    item: {
      text: "hsl(var(--sidebar-item-text))",
      icon: "hsl(var(--sidebar-item-icon))",
      hover: "hsl(var(--sidebar-item-hover-bg))",
      active: {
        bg: "hsl(var(--sidebar-item-active-bg))",
        text: "hsl(var(--sidebar-item-active-text))",
        icon: "hsl(var(--sidebar-item-active-icon))",
      },
    },
    section: {
      label: "hsl(var(--sidebar-section-label))",
    },
  },

  btn: {
    primary: {
      bg: "hsl(var(--btn-primary-bg))",
      text: "hsl(var(--btn-primary-text))",
      stroke: "hsl(var(--btn-primary-stroke))",
      shadow: "hsl(var(--btn-primary-inner-shadow))",
      hover: {
        bg: "hsl(var(--btn-primary-bg-hover))",
        text: "hsl(var(--btn-primary-text-hover))",
      },
      focus: {
        bg: "hsl(var(--btn-primary-bg-focus))",
        text: "hsl(var(--btn-primary-text-focus))",
        stroke: "hsl(var(--btn-primary-stroke-focus))",
      },
      disabled: {
        bg: "hsl(var(--btn-primary-bg-disabled))",
        text: "hsl(var(--btn-primary-text-disabled))",
      },
    },
    secondary: {
      bg: "var(--btn-secondary-bg)",
      text: "hsl(var(--btn-secondary-text))",
      stroke: "hsl(var(--btn-secondary-stroke))",
      hover: {
        bg: "hsl(var(--btn-secondary-bg-hover))",
        text: "hsl(var(--btn-secondary-text-hover))",
        stroke: "hsl(var(--btn-secondary-stroke-hover))",
      },
      focus: {
        bg: "var(--btn-secondary-bg-focus)",
        text: "hsl(var(--btn-secondary-text-focus))",
        stroke: "hsl(var(--btn-secondary-stroke-focus))",
      },
      disabled: {
        bg: "hsl(var(--btn-secondary-bg-disabled))",
        text: "hsl(var(--btn-secondary-text-disabled))",
        stroke: "hsl(var(--btn-secondary-stroke-disabled))",
      },
    },
    tertiary: {
      bg: "hsl(var(--btn-tertiary-bg))",
      text: "hsl(var(--btn-tertiary-text))",
      stroke: "hsl(var(--btn-tertiary-stroke))",
      hover: {
        bg: "hsl(var(--btn-tertiary-bg-hover))",
        text: "hsl(var(--btn-tertiary-text-hover))",
        stroke: "hsl(var(--btn-tertiary-stroke-hover))",
      },
      focus: {
        bg: "hsl(var(--btn-tertiary-bg-focus))",
        text: "hsl(var(--btn-tertiary-text-focus))",
        stroke: "hsl(var(--btn-tertiary-stroke-focus))",
      },
      disabled: {
        bg: "hsl(var(--btn-tertiary-bg-disabled))",
        text: "hsl(var(--btn-tertiary-text-disabled))",
        stroke: "hsl(var(--btn-tertiary-stroke-disabled))",
      },
    },
  },

  field: {
    bg: "hsl(var(--input-bg))",
    hover: "hsl(var(--input-bg-hover))",
    active: "hsl(var(--input-bg-active))",
    focus: "hsl(var(--input-bg-focus))",
    disabled: "hsl(var(--input-bg-disabled))",
    border: "hsl(var(--input-border))",
    "border-active": "hsl(var(--input-border-active))",
    "border-focus": "hsl(var(--input-border-focus))",
    "border-disabled": "hsl(var(--input-border-disabled))",
    text: {
      DEFAULT: "hsl(var(--input-text))",
      placeholder: "hsl(var(--input-text-placeholder))",
      label: "hsl(var(--input-text-title))",
      disabled: "hsl(var(--input-text-disabled))",
    },
    success: {
      bg: "hsl(var(--input-bg-success))",
      border: "hsl(var(--input-border-success))",
      icon: "hsl(var(--input-icon-success))",
      text: "hsl(var(--input-text-success))",
    },
    error: {
      bg: "hsl(var(--input-bg-error))",
      border: "hsl(var(--input-border-error))",
      icon: "hsl(var(--input-icon-error))",
      text: "hsl(var(--input-text-error))",
    },
  },

  chart: {
    grid: "hsl(var(--chart-grid))",
    axis: {
      text: "hsl(var(--chart-axis-text))",
    },
    stroke: "hsl(var(--chart-stroke))",
    gradient: {
      start: "hsl(var(--chart-gradient-start))",
      end: "hsl(var(--chart-gradient-end))",
    },
    tooltip: {
      bg: "hsl(var(--chart-tooltip-bg))",
      border: "hsl(var(--chart-tooltip-border))",
      text: "hsl(var(--chart-tooltip-text))",
    },
  },
} as const;
