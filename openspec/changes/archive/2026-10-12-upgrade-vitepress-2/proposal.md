## Why

The site is on VitePress 1.6.4 and Renovate is blocked from offering 2.x. We want to move to VitePress 2 (currently alpha, a deliberate choice). The nonce-injection mechanism (regex rewriting of built HTML plus a runtime placeholder swap in the Worker) is tied to the shape of VitePress/Vite 5 output and would be fragile on Vite 8, so it is dropped rather than ported.

## What Changes

- Upgrade `vitepress` from `^1.6.4` to a 2.0.0-alpha release, pinned to the exact version.
- Remove the CSP nonce mechanism: `vite.html.cspNonce` and `transformHtml` in `.vitepress/config.ts`; body rewriting and nonce generation in `worker/index.js`.
- Simplify the `Content-Security-Policy-Report-Only` header: no `nonce-…`, no `strict-dynamic`, no VueUse style hash, no `require-trusted-types-for`, no `style-src-attr`. It stays `Report-Only`.
- Remove the `vitepress` `allowedVersions: "<2"` rule from `renovate.json` so higher versions can be proposed (majors stay separate PRs without automerge).
- Update `CLAUDE.md` and the comment in `wrangler.jsonc` to match.
- **BREAKING** (policy only): the CSP becomes weaker (`'unsafe-inline'` without nonce protection). Acceptable because it is report-only and the site is static.

## Capabilities

### New Capabilities
- `csp-headers`: Security headers the Worker sets on HTML responses (report-only CSP, reporting endpoint) and the guarantee that HTML bodies are served unmodified.

### Modified Capabilities

## Impact

- `package.json`, `package-lock.json` (vitepress and its transitive Vite 8 / Shiki 4 / VueUse 14 stack).
- `.vitepress/config.ts`, `worker/index.js`, `renovate.json`, `wrangler.jsonc`, `CLAUDE.md`.
- Cloudflare build: `npm run build:shallow` must still produce `.vitepress/dist` and keep `lastUpdated` working.
- Part of these file edits already exist uncommitted in the working tree.
