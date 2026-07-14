import * as React from "react";
import { cn } from "../lib/cn";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";

interface SidePanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  width?: string;
  children: React.ReactNode;
}

const SidePanel = ({
  open,
  onOpenChange,
  title,
  description,
  width = "sm:max-w-[360px]",
  children,
}: SidePanelProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn("flex flex-col p-0", width)} data-side-panel="true">
        <SheetHeader className="px-6 pt-6 pb-section border-b border-border shrink-0">
          <SheetTitle className="!text-heading-2 font-semibold">
            {title}
          </SheetTitle>
          {description && (
            <SheetDescription className="!text-body-1 !font-medium text-content-tertiary">
              {description}
            </SheetDescription>
          )}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

const SidePanelBody = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto px-6 py-5", className)} {...props}>
    {children}
  </div>
);

const SidePanelFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("px-6 py-section border-t border-border shrink-0", className)}
    {...props}
  >
    {children}
  </div>
);

export { SidePanel, SidePanelBody, SidePanelFooter };
