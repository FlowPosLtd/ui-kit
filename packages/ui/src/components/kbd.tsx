import { cn } from "../lib/cn";

export const Kbd = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <kbd
    className={cn(
      "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded",
      "border border-border bg-muted/70 text-content-secondary",
      "text-[11px] font-medium font-mono leading-none shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]",
      className,
    )}
  >
    {children}
  </kbd>
);
