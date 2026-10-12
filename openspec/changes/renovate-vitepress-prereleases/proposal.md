## Why

Renovate should open PRs that move VitePress to 2.x, which is currently only published as alpha. Removing the `allowedVersions: "<2"` cap is not enough: by default Renovate never updates a stable version (1.6.4) to an unstable one (`2.0.0-alpha.N`) and ignores versions ahead of the `latest` dist-tag, so no PR would ever appear.

## What Changes

- Remove the `vitepress` `allowedVersions: "<2"` rule from `renovate.json`.
- Add a `vitepress` package rule with `ignoreUnstable: false` and `respectLatest: false` so pre-releases (alpha, beta, rc) and the later stable 2.x are all eligible.
- Keep existing behaviour: 7-day `minimumReleaseAge`, majors as separate PRs without automerge, `major-update` label.
- Drop the `vitepress` mention from the pinned-majors sentence in `CLAUDE.md` and document the pre-release rule.

## Capabilities

### New Capabilities
- `dependency-updates`: How Renovate proposes dependency updates for this repo, including which packages may move to pre-releases.

### Modified Capabilities

## Impact

- `renovate.json`, `CLAUDE.md`.
- Renovate will start opening a major-update PR for `vitepress` and then follow later pre-releases of 2.x. Each PR still needs manual review and merge.
- Related to change `upgrade-vitepress-2`, which also removes the cap; whichever lands second must not re-add or duplicate the rule.
