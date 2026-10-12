## Context

`renovate.json` has a rule disabling `node` major bumps (comment: manual, together with `NODE_VERSION` in Cloudflare) and caps `@types/node` at `<23`. `package.json` has `engines.node: ">=22 <23"`; `.nvmrc` is `22.23.3`. The Cloudflare build reads `.nvmrc` / `NODE_VERSION`. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Renovate can propose Node, `@types/node` and npm bumps.
- `engines` no longer rejects newer Node.

**Non-Goals:**
- Changing `minimumReleaseAge` or the major-PR rule (the user kept them).
- Managing Cloudflare `NODE_VERSION` from the repo.

## Decisions

- **Delete the two rules instead of loosening them.** Their descriptions exist only to keep Node pinned; nothing else relies on them. Alternative: raise the cap to `<25` - rejected, it just moves the problem.
- **`engines.node` becomes `>=22`.** Keeps a floor (the code is tested on 22) and removes the ceiling that would fail `npm ci` after a Node bump. Alternative: delete `engines` - rejected, the floor is useful documentation.
- **No npm config change.** `packageManager` is already updatable (no rule matches it); verified in tasks rather than assumed.
- **Keep the existing major rule** so Node/`@types/node` majors are separate, reviewed PRs.

## Risks / Trade-offs

- [Node PR merged while Cloudflare `NODE_VERSION` is still old, or the reverse] → major PR body already tells to check `.nvmrc`/Cloudflare; document the manual step in `CLAUDE.md`.
- [Renovate proposes an odd/non-LTS Node] → Renovate's node versioning only offers stable releases by default; check the first PR.
- [`@types/node` ahead of the runtime] → PR build and review catch mismatches; keep `@types/node` major equal to the `.nvmrc` major when merging.
- [Lockfile or tooling incompatible with newer Node] → CI/Cloudflare preview build on the PR.
