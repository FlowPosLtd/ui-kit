# flowpos-ui

The shared design system and app-embedding SDK for the Flowpos platform.
Third-party developers building an installable "app" for tenant-dashboard use
this to make their app look and behave like a native part of the dashboard,
even though it's a separate project on a separate server.

**Requires Tailwind v4** (and React 18.3+ or 19). This library was originally
built against tenant-dashboard's old Tailwind v3 setup; tenant-dashboard has
since migrated to v4, so this does too — every real consumer (tenant-dashboard,
`appointments`) is on v4 now, and there's no reason to maintain two parallel
token formats going forward.

## Packages

| Package | Consumed by | What it's for |
|---|---|---|
| [`@flowpos/design-tokens`](./packages/design-tokens) | Everyone | A single Tailwind v4 CSS entry point (colors, typography, radius, animation) — plus the same values as optional raw JS. |
| [`@flowpos/ui`](./packages/ui) | Everyone | The React component library (Button, Card, Dialog, etc.) built on those tokens. |
| [`@flowpos/apps-sdk`](./packages/apps-sdk) | tenant-dashboard (`/host`) + app devs (`/app`) | The iframe runtime bridge: handshake, theme sync, auto-resize, auth handoff. |

## Running things

```bash
npm install          # from the repo root — installs and links all workspaces
npm run build         # builds all 3 packages (tsup → dist/ with ESM+CJS+d.ts)
npm run typecheck      # tsc --noEmit across all 3 packages
```

To actually **see** the components rendered in a browser, there's a small
playground app at [`apps/playground`](./apps/playground):

```bash
npm run build -w @flowpos/design-tokens -w @flowpos/ui   # build the libs first
npm run dev -w @flowpos/playground                        # http://localhost:5300
```

It renders every ported component (all button/badge variants, form controls,
tabs, dialog, tooltip, alerts) with a dark-mode toggle, so you can visually
confirm colors/typography match and that the Dialog/Tooltip open/close
animations work. There's no demo for the `apps-sdk` iframe handshake yet —
that needs two apps (a fake host + a fake embedded app) talking to each
other; ask if you want that scaffolded too.

## Why three packages, not one

- **`design-tokens` has no React dependency.** An app doesn't have to use
  `@flowpos/ui` at all to look correct — as long as it imports the one CSS
  file, its own custom markup already inherits the right colors and type
  scale via Tailwind classes.
- **`ui` depends on `design-tokens`, not the other way around.** Components
  are just Tailwind class names; they resolve correctly only once the
  consumer has `@flowpos/design-tokens/css` imported somewhere.
- **`apps-sdk` is unrelated to the other two.** It solves a different
  problem — getting an iframe on a different origin to behave like part of
  the page — and has separate entry points for the two sides of that
  relationship (`/app` for the embedded app, `/host` for tenant-dashboard).
  Splitting the entry points means an app's bundle never pulls in the
  iframe-hosting code it will never use, and vice versa.

## Quickstart for someone building an installable app

```bash
npm install @flowpos/design-tokens @flowpos/ui @flowpos/apps-sdk
```

**1. Make sure you're on Tailwind v4** with `@tailwindcss/vite` (or
`@tailwindcss/postcss`) already wired into your build — this library doesn't
set that up for you, it just plugs into it.

**2. Import one CSS file**, at your app's CSS entry point (e.g. `index.css`),
*before* your own styles:

```css
@import "@flowpos/design-tokens/css";

/* your own CSS/Tailwind utilities below */
```

That one file bootstraps Tailwind itself (`@import "tailwindcss"`), the
`tw-animate-css` and `@tailwindcss/typography` plugins, the `dark:` variant,
every color/typography/radius/animation token as a native `@theme` block, and
the light/dark CSS variable values — you do not need your own
`@import "tailwindcss"` anywhere, this replaces it. Do **not** wrap this
import in `@layer` or otherwise defer it — it needs to load as-is.

**3. Build your UI** with `@flowpos/ui` components, or your own markup using
the same Tailwind classes (`bg-primary`, `text-content-secondary`,
`text-heading-2`, etc.) — either way it now matches tenant-dashboard.

> **Important:** if you use `@flowpos/ui` components, tell Tailwind to scan
> the package's compiled output, not just your own `src` — add this to the
> *same* CSS file, relative to that file's own directory:
>
> ```css
> @source "./node_modules/@flowpos/ui/dist/**/*.js";
> ```
>
> Tailwind v4 doesn't scan `node_modules` by default, and `@flowpos/ui`'s
> classNames live in its compiled JS, not your source — without this line the
> components render completely unstyled. Get the relative path wrong (e.g.
> off by one directory level) and you get the same silent failure with no
> error; see `apps/playground/src/index.css` in this repo for a working,
> tested example, and don't just copy the number of `../` from there without
> checking your own file's location relative to `node_modules`.

**4. Complete the embed handshake** near your app's root:

```tsx
import { useFlowposApp } from "@flowpos/apps-sdk/app";

function App() {
  const { isEmbedded, isReady, context, theme } = useFlowposApp({
    allowedParentOrigins: [
      "https://app.flowpos.co.uk",
      "https://staging-app.flowpos.co.uk",
    ],
  });

  // Not embedded (e.g. local dev) — fall back to your own auth/UI.
  if (!isEmbedded) return <StandaloneApp />;

  // Embedded but the host hasn't sent context yet — show a loading state,
  // not your own header/nav (the host already renders the shell around you).
  if (!isReady || !context) return <EmbeddedLoadingState />;

  return <YourApp tenantId={context.tenantId} authToken={context.authToken} />;
}
```

That's it — no login screen, no mismatched colors, no double chrome. The
`theme` value flips live when the merchant toggles dark mode in
tenant-dashboard; height is reported automatically via `ResizeObserver`
unless you pass `autoResize: false`.

## Integrating on the tenant-dashboard (host) side

```tsx
import { InstalledAppFrame } from "@flowpos/apps-sdk/host";

<InstalledAppFrame
  src={installation.app.embed_url}
  title={installation.app.name}
  theme={resolvedTheme} // from tenant-dashboard's own theme provider
  context={{
    tenantId: tenant.id,
    userId: currentUser.id,
    authToken: shortLivedAppToken, // minted per-installation, per-session
  }}
  onNavigate={(path) => console.log("app wants to navigate to", path)}
  onClose={() => setAppModalOpen(false)}
/>
```

This isn't wired into the existing Apps marketplace UI yet (`AppDetailModal`,
`AppCard`, etc. only handle install/uninstall today) — that's the next step
once this package is published and the backend can mint the short-lived
per-installation token.

## Security notes worth keeping in mind

- **Origin checks are mandatory on both sides.** `useInstalledAppFrame`
  checks `event.origin` *and* `event.source` (so a message from an unrelated
  iframe on the same page can't be mistaken for the installed app).
  `useFlowposApp` checks `event.origin` against the `allowedParentOrigins`
  you pass in. Neither side trusts a message just because it arrived.
- **The auth token never goes in the iframe `src`.** Query params leak into
  browser history, server access logs, and the `Referer` header of any
  request the embedded page makes. It's only ever sent over `postMessage`,
  after the origin is confirmed.
- **The iframe sandbox is deliberately minimal**: `allow-scripts
  allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox`.
  Notably absent: top-level navigation — an installed app can never redirect
  the whole dashboard tab away.

## Repo layout

```
flowpos-ui/
  packages/
    design-tokens/   colors.ts, typography.ts, radius.ts, animations.ts
                      (optional raw JS values), css/theme.css (the real
                      integration point — @theme block + :root/.dark values)
    ui/               cn.ts, styles/*.styles.ts, components/*.tsx
    apps-sdk/         protocol.ts (shared), app.ts (embedded side),
                      host.tsx (tenant-dashboard side)
  apps/
    playground/       Vite app that renders every @flowpos/ui component —
                      the reference example for wiring Tailwind v4 up
                      correctly (vite.config.ts, src/index.css)
```

Each package builds independently with `tsup` (ESM + CJS + `.d.ts`) and is
wired together via npm workspaces — no extra monorepo tooling needed at this
size. `npm run build` at the root builds all three.

**If you add a workspace or bump React here:** pin `react`/`react-dom`
explicitly in the *root* `package.json`'s `devDependencies`, not just in each
package. Without a root-level pin, npm's dedup can hoist a stale version to
the workspace root while installing a different one nested inside each
package that has a narrower requirement — multiple React copies in the same
render tree causes "Invalid hook call" errors that only reproduce at runtime,
not at build/typecheck time. This bit the v3→v4 migration itself; `npm run
build` and `tsc` both passed while the playground silently rendered a blank
page. Verify with:
```bash
find . -type d -name react -path "*/node_modules/react" -not -path "*/node_modules/react-*"
```
— this should print exactly one path (the workspace root) after a fresh
`npm install`.

## Adding a component that isn't in `@flowpos/ui` yet

Only a core subset was ported initially (Button, Badge, Card, Input, Label,
Separator, Skeleton, Avatar, Tabs, Alert, Dialog, Checkbox, Switch,
Textarea, Tooltip). To add another one from tenant-dashboard's
`src/components/ui/`:

1. Copy the file into `packages/ui/src/components/`.
2. Replace the `@/lib/utils` import with `../lib/cn`.
3. If it pulls in a `*.styles.ts` constant, copy that into
   `packages/ui/src/styles/` too (only the parts it needs, not the whole
   file — several of tenant-dashboard's style files bundle constants for
   multiple components).
4. Add its Radix package (if any) to `dependencies` in `package.json`.
5. Re-export it from `src/index.ts`.
6. **If it positions itself with `left-[50%] top-[50%] translate-x-[-50%]
   translate-y-[-50%]` and also uses `slide-in-from-*`/`slide-out-to-*`
   entrance animation classes** (this pattern appears in tenant-dashboard's
   `dialog.tsx`/`alert-dialog.tsx`): drop the slide classes, keep only
   fade/zoom. Tailwind v4 moved `translate` to its own independent CSS
   property, separate from the legacy `transform` property
   `tw-animate-css`'s slide animation still uses — the two stack additively
   under v4 instead of composing like they did under v3, so the component
   visibly slides in from off-screen. This already bit `@flowpos/ui`'s own
   `dialog.tsx` once; see the comment there for the full explanation.
7. `npm run build -w @flowpos/ui`.

## Known deliberate deviation from tenant-dashboard's current code

- `colors.arning` (should be `warning`) — tenant-dashboard's own color
  tokens still have this typo as of this writing, and `theme.css` mirrors it
  faithfully rather than silently "fixing" it, since a silent fix here would
  mean this library's tokens quietly drift from tenant-dashboard's actual
  values. If tenant-dashboard fixes the typo, re-sync `theme.css` to match
  rather than fixing it here first.

## Versioning

Not wired up yet. For now, bump `version` in each package's `package.json`
manually. Once this has real external consumers, switch to
[Changesets](https://github.com/changesets/changesets) so version bumps and
changelogs are generated from PR-time changeset files instead of by hand.
