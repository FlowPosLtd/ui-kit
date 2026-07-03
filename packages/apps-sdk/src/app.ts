import { useCallback, useEffect, useRef, useState } from "react";
import {
  PROTOCOL,
  PROTOCOL_VERSION,
  isFlowposMessage,
  type AppContext,
  type AppToHostMessage,
  type Theme,
} from "./protocol";

export interface UseFlowposAppOptions {
  /**
   * Origins allowed to complete the handshake, e.g.
   * ["https://app.flowpos.co.uk", "https://staging-app.flowpos.co.uk"].
   * Required — without an origin check, any page that iframes your app could
   * impersonate the host and hand you a forged auth token.
   */
  allowedParentOrigins: string[];
  /**
   * Automatically observe `resizeTarget` (default: `document.body`) with a
   * ResizeObserver and report height changes to the host. Set to false to
   * call `reportHeight()` manually instead.
   */
  autoResize?: boolean;
  resizeTarget?: () => HTMLElement | null;
}

export interface UseFlowposApp {
  /** False when rendered standalone (not inside an iframe) — e.g. local dev. */
  isEmbedded: boolean;
  /** True once the host has completed the init handshake. */
  isReady: boolean;
  context: AppContext | null;
  theme: Theme;
  reportHeight: (element?: HTMLElement | null) => void;
  navigate: (path: string) => void;
  close: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Embedded-app side of the handshake. Call this once near your app's root.
 * When `isEmbedded` is false, `context` stays null and the app should fall
 * back to its own standalone auth — this is what lets a dev run the app
 * outside tenant-dashboard too.
 */
export function useFlowposApp(options: UseFlowposAppOptions): UseFlowposApp {
  const { allowedParentOrigins, autoResize = true, resizeTarget } = options;

  const isEmbedded =
    typeof window !== "undefined" && window.self !== window.top;

  const [context, setContext] = useState<AppContext | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const parentOriginRef = useRef<string | null>(null);

  const post = useCallback(
    (message: AppToHostMessage) => {
      if (!isEmbedded) return;
      const targetOrigin = parentOriginRef.current;
      // The only message sent before the origin is confirmed is "ready",
      // which carries no data — safe to broadcast with "*".
      window.parent.postMessage(message, targetOrigin ?? "*");
    },
    [isEmbedded],
  );

  useEffect(() => {
    if (!isEmbedded) return;

    function handleMessage(event: MessageEvent) {
      if (!allowedParentOrigins.includes(event.origin)) return;
      if (!isFlowposMessage(event.data)) return;

      switch (event.data.type) {
        case "init": {
          parentOriginRef.current = event.origin;
          const { theme: initTheme, ...appContext } = event.data.payload;
          setContext(appContext);
          setTheme(initTheme);
          applyTheme(initTheme);
          break;
        }
        case "theme-change":
          setTheme(event.data.payload.theme);
          applyTheme(event.data.payload.theme);
          break;
        case "auth-refresh":
          setContext((prev) =>
            prev ? { ...prev, authToken: event.data.payload.authToken } : prev,
          );
          break;
      }
    }

    window.addEventListener("message", handleMessage);
    post({ source: PROTOCOL, version: PROTOCOL_VERSION, type: "ready" });

    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmbedded, allowedParentOrigins.join(",")]);

  const reportHeight = useCallback(
    (element?: HTMLElement | null) => {
      const target = element ?? resizeTarget?.() ?? document.body;
      post({
        source: PROTOCOL,
        version: PROTOCOL_VERSION,
        type: "resize",
        payload: { height: target.scrollHeight },
      });
    },
    [post, resizeTarget],
  );

  useEffect(() => {
    if (!isEmbedded || !autoResize) return;
    const target = resizeTarget?.() ?? document.body;
    const observer = new ResizeObserver(() => reportHeight(target));
    observer.observe(target);
    reportHeight(target);
    return () => observer.disconnect();
  }, [isEmbedded, autoResize, resizeTarget, reportHeight]);

  const navigate = useCallback(
    (path: string) => {
      post({ source: PROTOCOL, version: PROTOCOL_VERSION, type: "navigate", payload: { path } });
    },
    [post],
  );

  const close = useCallback(() => {
    post({ source: PROTOCOL, version: PROTOCOL_VERSION, type: "close" });
  }, [post]);

  return {
    isEmbedded,
    isReady: context !== null,
    context,
    theme,
    reportHeight,
    navigate,
    close,
  };
}
