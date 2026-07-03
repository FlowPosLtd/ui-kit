import { cn } from "../lib/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded bg-skeleton animate-shimmer",
        "bg-[length:200%_100%]",
        "bg-[linear-gradient(90deg,hsl(var(--skeleton))_0%,hsl(var(--skeleton))_30%,hsl(var(--primary)/0.18)_50%,hsl(var(--skeleton))_70%,hsl(var(--skeleton))_100%)]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
