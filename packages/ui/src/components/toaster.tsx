import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Toast, ToastProvider, ToastViewport } from "./toast";

type ToastVariant =
  | "default"
  | "success"
  | "destructive"
  | "warning"
  | null
  | undefined;

function getIcon(variant: ToastVariant) {
  switch (variant) {
    case "success":
      return (
        <CheckCircle2 className="h-4 w-4 text-tag-success-text shrink-0" />
      );
    case "destructive":
      return <XCircle className="h-4 w-4 text-destructive shrink-0" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />;
    default:
      return <Info className="h-4 w-4 text-primary shrink-0" />;
  }
}

export interface ToasterProps {
  /** Extra classes for the viewport — use to nudge it below a fixed banner (e.g. a staging-environment strip). */
  viewportClassName?: string;
}

export function Toaster({ viewportClassName }: ToasterProps = {}) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant, ...props }) {
        const message = description ?? title;
        return (
          <Toast key={id} variant={variant} {...props}>
            {getIcon(variant as ToastVariant)}
            <span className="text-body-2 text-content-primary truncate">
              {message}
            </span>
          </Toast>
        );
      })}
      <ToastViewport className={viewportClassName} />
    </ToastProvider>
  );
}
