## Context

VitePress 1.6.4 / Vite 5. No custom theme; all customisation is in `.vitepress/config.ts` and `worker/index.js`. Nonces are currently injected by regex in `transformHtml` and the `{{CSP-NONCE}}` placeholder is replaced per request in the Worker. VitePress 2 alpha pulls Vite 8 (Rolldown), Shiki 4, VueUse 14, DocSearch 4. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Build and serve the site on VitePress 2 alpha with no behaviour regressions (nav, search, dark mode, `lastUpdated`, sitemap, analytics).
- A simpler Worker that only sets headers.

**Non-Goals:**
- Enforcing the CSP (stays report-only).
- Introducing a custom theme or restructuring the sidebar.

## Decisions

- **Drop nonces instead of porting the regexes.** The regexes depend on exact tag shapes in the generated HTML; Vite 8 may change them and the failure is silent. Alternative: re-verify and keep nonces - rejected by the user's decision. Consequence: `strict-dynamic` goes (it makes `'unsafe-inline'` ignored) and `script-src` keeps `'self' 'unsafe-inline'`.
- **Drop the VueUse style hash, Trusted Types and `style-src-attr`.** With `'unsafe-inline'` in `style-src` the hash is moot (a hash would even disable `unsafe-inline`); Trusted Types and `style-src-attr` were only there to complement the nonce setup. Can be re-added if reports show a need.
- **Worker stays.** Needed only to attach headers to pages; it now streams `response.body` without reading it.
- **Pin the exact alpha version in `package.json`** (assumption). Alphas can break between releases; Renovate can still propose newer ones now that the `<2` cap is gone. Alternative: `next` tag - rejected as non-reproducible.
- **Renovate:** remove only the vitepress cap; majors remain separate PRs without automerge.

## Risks / Trade-offs

- [Alpha instability] → exact pin, rollback by reverting the commit and restoring `^1.6.4`.
- [Weaker CSP] → report-only, static site; revisit enforcing later with a hash-based policy.
- [Vite 8 build differences (CSS/JS output, `base`, assets)] → compare `dist` and run preview before merging.
- [`build:shallow` / `lastUpdated` behaviour in v2] → check "Last updated" renders in the built output.
- [Node range] → Vite 8 needs 20.19+ / 22.12+; confirm `.nvmrc` satisfies it.
- [Peer deps in v2: optional `markdown-it-mathjax3`, `postcss`] → install must be clean under `npm ci`.

## Migration Plan

1. Work on a branch; verify locally (build, preview).
2. Open a PR; check the Cloudflare preview build and CSP reports.
3. Merge; rollback = revert the merge commit.
