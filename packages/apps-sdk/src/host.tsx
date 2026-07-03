import * as React from "react";
import {
  PROTOCOL,
  PROTOCOL_VERSION,
  isFlowposMessage,
  type AppContext,
  type HostToAppMessage,
  type Theme,
} from "./protocol";

export interface UseInstalledAppFrameOptions {
  /** The installed app's entry URL, e.g. "https://apps.example.com/embed". */
  src: string;
  /** Everything the app needs except theme, which tracks the host's own live theme. */
  context: AppContext;
  /** The host's current resolved theme — pass tenant-dashboard's own theme state through. */
  theme: Theme;
  minHeight?: number;
  onNavigate?: (path: string) => void;
  onClose?: () => void;
}

export interface UseInstalledAppFrame {
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  height: number;
  isReady: boolean;
}

/**
 * Host side of the handshake. Validates every inbound message against both
 * the app's own origin (derived from `src`) and `event.source` (the specific
 * iframe's window, not just any frame on the page) before trusting it —
 * postMessage has no built-in sender authentication, so both checks matter.
 */
export function useInstalledAppFrame(
  options: UseInstalledAppFrameOptions,
): UseInstalledAppFrame {
  const { src, context, theme, minHeight = 480, onNavigate, onClose } = options;

  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(minHeight);
  const [isReady, setIsReady] = React.useState(false);

  const appOrigin = React.useMemo(() => new URL(src).origin, [src]);
  const contextRef = React.useRef(context);
  contextRef.current = context;

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== appOrigin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (!isFlowposMessage(event.data)) return;

      switch (event.data.type) {
        case "ready": {
          setIsReady(true);
          const initMessage: HostToAppMessage = {
            source: PROTOCOL,
            version: PROTOCOL_VERSION,
            type: "init",
            payload: { ...contextRef.current, theme },
          };
          iframeRef.current?.contentWindow?.postMessage(initMessage, appOrigin);
          break;
        }
        case "resize":
          setHeight(Math.max(minHeight, event.data.payload.height));
          break;
        case "navigate":
          onNavigate?.(event.data.payload.path);
          break;
        case "close":
          onClose?.();
          break;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appOrigin, minHeight, onNavigate, onClose]);

  // Broadcast live theme toggles (e.g. the user flips dark mode) after the
  // initial handshake — the embedded app re-applies the `.dark` class, which
  // resolves correctly because it loaded the same @flowposltd/design-tokens CSS.
  React.useEffect(() => {
    if (!isReady) return;
    const themeMessage: HostToAppMessage = {
      source: PROTOCOL,
      version: PROTOCOL_VERSION,
      type: "theme-change",
      payload: { theme },
    };
    iframeRef.current?.contentWindow?.postMessage(themeMessage, appOrigin);
  }, [theme, isReady, appOrigin]);

  return { iframeRef, height, isReady };
}

export interface InstalledAppFrameProps
  extends Omit<UseInstalledAppFrameOptions, "onNavigate" | "onClose"> {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  onNavigate?: (path: string) => void;
  onClose?: () => void;
}

/**
 * Drop-in iframe wrapper for an installed app. Sandboxed to the minimum an
 * embedded web app needs: script execution, same-origin storage/cookies for
 * its own domain, form submission, and popups (e.g. OAuth to a third-party
 * API) — deliberately no top-level navigation, so the app can never redirect
 * the whole dashboard away.
 */
export function InstalledAppFrame({
  src,
  context,
  theme,
  minHeight = 480,
  title,
  className,
  style,
  onNavigate,
  onClose,
}: InstalledAppFrameProps) {
  const { iframeRef, height } = useInstalledAppFrame({
    src,
    context,
    theme,
    minHeight,
    onNavigate,
    onClose,
  });

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      className={className}
      style={{ width: "100%", border: 0, height, ...style }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
