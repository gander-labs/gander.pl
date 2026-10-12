## 1. Renovate configuration

- [x] 1.1 Remove the `vitepress` `allowedVersions: "<2"` rule from `renovate.json` and verify the file is valid JSON
- [x] 1.2 Add a `vitepress` package rule with `ignoreUnstable: false` and `respectLatest: false` and verify with `npx --package renovate renovate-config-validator renovate.json`
- [x] 1.3 Update the `renovate.json` sentence in `CLAUDE.md` (vitepress no longer pinned; pre-releases allowed for it) and verify no stale mention remains (`grep -n vitepress CLAUDE.md`)

## 2. Verify behaviour

- [ ] 2.1 After pushing, verify Renovate opens a `vitepress` PR to 2.x labelled `major-update`, not automerged, honouring the 7-day age (check the Dependency Dashboard or Renovate logs)
