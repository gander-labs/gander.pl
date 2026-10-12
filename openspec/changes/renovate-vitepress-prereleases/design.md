## Context

`renovate.json` extends a shared automerge preset and has rules for majors, Node, `@types/node` and a `vitepress <2` cap. Renovate's defaults skip stable→unstable updates and versions above `latest`. npm dist-tags for `vitepress`: `latest` = 1.6.4, `next` = 2.0.0-alpha.20. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Renovate opens a PR for the first 2.x alpha and keeps following 2.x releases, including the eventual stable.

**Non-Goals:**
- Performing the upgrade itself (see `upgrade-vitepress-2`).
- Enabling pre-releases for any other package.

## Decisions

- **`ignoreUnstable: false` + `respectLatest: false` for `vitepress`.** Documented Renovate options for permanent pre-release updates. Alternative `followTag: "next"`: simpler, but if `next` stops moving after 2.0.0 stable, Renovate would stop proposing updates.
- **Keep the existing major rule** (separate PR, no automerge, label, 7-day age) rather than a dedicated rule, so behaviour stays uniform.
- **Remove the cap rule instead of loosening it.** Its own description says to remove it after migrating.

## Risks / Trade-offs

- [Many alpha PRs (about 20 alphas so far)] → 7-day minimum release age and manual merge; can add a schedule or grouping later.
- [Alpha breaks the build] → nothing automerges; Cloudflare preview build fails the PR check.
- [Rule stays after stable 2.x ships] → harmless; may be removed later.
- [Overlap with `upgrade-vitepress-2`] → apply one change first, then make the other a no-op for the shared lines.

## Open Questions

- Whether to add a schedule/grouping if alpha PR volume turns out to be noisy.
