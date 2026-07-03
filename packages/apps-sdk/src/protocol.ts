/**
 * The wire format shared by the host (tenant-dashboard) and embedded apps.
 * Both sides import this file — it has zero React/DOM dependency so it's
 * safe to use for validation on either end.
 */

export const PROTOCOL = "flowpos.apps-sdk";
export const PROTOCOL_VERSION = 1;

export type Theme = "light" | "dark";

/**
 * Everything an embedded app needs to render as if it were tenant-dashboard
 * itself. `authToken` is short-lived and scoped to this session — it is only
 * ever sent over postMessage, never as an iframe `src` query param, because
 * query params leak into browser history, server access logs and the
 * Referer header of any request the embedded page makes.
 */
export interface AppContext {
  tenantId: string;
  tenantName?: string;
  userId: string;
  userName?: string;
  locale?: string;
  apiBaseUrl?: string;
  authToken: string;
}

interface BaseMessage {
  source: typeof PROTOCOL;
  version: typeof PROTOCOL_VERSION;
}

/** Host -> embedded app */
export type HostToAppMessage =
  | (BaseMessage & { type: "init"; payload: AppContext & { theme: Theme } })
  | (BaseMessage & { type: "theme-change"; payload: { theme: Theme } })
  | (BaseMessage & { type: "auth-refresh"; payload: { authToken: string } });

/** Embedded app -> host */
export type AppToHostMessage =
  | (BaseMessage & { type: "ready" })
  | (BaseMessage & { type: "resize"; payload: { height: number } })
  | (BaseMessage & { type: "navigate"; payload: { path: string } })
  | (BaseMessage & { type: "close" });

export type FlowposMessage = HostToAppMessage | AppToHostMessage;

export function isFlowposMessage(data: unknown): data is FlowposMessage {
  if (typeof data !== "object" || data === null) return false;
  const msg = data as Record<string, unknown>;
  return (
    msg.source === PROTOCOL &&
    msg.version === PROTOCOL_VERSION &&
    typeof msg.type === "string"
  );
}
