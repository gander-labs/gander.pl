## 1. Renovate configuration

- [x] 1.1 Remove the `node` major-disable rule and the `@types/node` `allowedVersions` rule from `renovate.json`; verify valid JSON and `npx --package renovate renovate-config-validator renovate.json` passes
- [x] 1.2 Confirm no remaining rule matches `packageManager`/npm in a way that blocks updates (`grep -n "npm\|packageManager" renovate.json` shows none)

## 2. Project settings

- [x] 2.1 Change `engines.node` in `package.json` from `>=22 <23` to `>=22`; verify `npm ci` succeeds
- [x] 2.2 Update `CLAUDE.md` (renovate note and Node line): Node/`@types/node` majors are normal major PRs; `.nvmrc` and `NODE_VERSION` in Cloudflare are updated together by hand; verify with `grep -n -i "pinned" CLAUDE.md` that the old wording is gone

## 3. Verify behaviour

- [ ] 3.1 After merge, verify Renovate opens PRs for the Node/`@types/node` majors (if newer exist), labelled `major-update` and not automerged (Dependency Dashboard)
