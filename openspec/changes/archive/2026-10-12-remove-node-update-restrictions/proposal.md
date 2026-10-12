## Why

Renovate is blocked from proposing new Node majors (`node` major updates disabled) and from moving `@types/node` past 22, and `engines.node` rejects any Node outside `>=22 <23`. The result is that the Node toolchain can only be moved by hand. We want Renovate to propose these bumps, with npm handled the same way, and a human to decide when to merge them.

## What Changes

- `renovate.json`: remove the rule that disables `node` major updates, and the `@types/node` `allowedVersions: "<23"` cap.
- `package.json`: drop the upper bound of `engines.node` (`>=22 <23` becomes `>=22`).
- `CLAUDE.md`: replace the "pinned to their current major" wording; note that Node/`@types/node` majors now arrive as normal major PRs and that `.nvmrc` plus `NODE_VERSION` in Cloudflare must be kept in sync by hand.
- npm: confirm nothing blocks bumping `packageManager` (`npm@12.2.0`); no rule currently does, so no config change is expected.
- Out of scope (kept as is): `minimumReleaseAge` (7 days), and the rule that makes majors separate, non-automerged PRs with the `major-update` label.

## Capabilities

### New Capabilities
- `node-toolchain-updates`: Which Node, `@types/node` and npm versions Renovate may propose and which Node versions the project accepts.

### Modified Capabilities

## Impact

- `renovate.json`, `package.json`, `CLAUDE.md`.
- Renovate will open major PRs for `node` (`.nvmrc`) and `@types/node`; they are reviewed and merged manually.
- Merging a Node major PR does not change the Cloudflare build by itself: `NODE_VERSION` in Workers Builds settings is a manual step and is not covered by this repo.
