## 1. Review existing working-tree edits

- [x] 1.1 Review the uncommitted edits to `.vitepress/config.ts`, `worker/index.js`, `renovate.json`, `wrangler.jsonc`, `CLAUDE.md` against the specs; confirm with `grep -ri nonce` that no nonce references remain outside `openspec/`
- [x] 1.2 Confirm `renovate.json` is valid JSON and has no `vitepress` rule (`node -e "JSON.parse(require('fs').readFileSync('renovate.json'))"`)

## 2. Upgrade VitePress

- [x] 2.1 Check `.nvmrc` satisfies Vite 8 (Node >=22.12) and fix if not
- [x] 2.2 Install the latest 2.0.0-alpha pinned exactly (`npm i -D -E vitepress@next`) and verify `npm ci` succeeds cleanly
- [x] 2.3 Run `npm run build` and fix any config/API errors; verify the build exits 0

## 3. Verify behaviour

- [x] 3.1 Verify built HTML has no `{{CSP-NONCE}}` or `nonce` (`grep -r "CSP-NONCE\|nonce" .vitepress/dist`)
- [x] 3.2 Verify "Last updated" renders with `npm run build:shallow` semantics (full git history) in a built page
- [x] 3.3 Run `npm run preview` and check navigation, search, dark-mode toggle and an analytics-enabled page; console shows no errors
- [x] 3.4 Run the Worker locally (`npx wrangler dev`) and verify HTML responses carry `Content-Security-Policy-Report-Only` and `Reporting-Endpoints` without `nonce-`, while assets do not

## 4. Wrap up

- [x] 4.1 Update `CLAUDE.md` if the upgrade changes any documented command or behaviour
- [ ] 4.2 Open a PR and verify the Cloudflare preview build passes and CSP reports stay empty
