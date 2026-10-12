## Context

`wrangler.jsonc` (JSONC with comments, Worker `gander-pl-next`, schema from `node_modules/wrangler/config-schema.json`) has no `observability` key. Wrangler's schema supports `enabled`, `head_sampling_rate`, `redact_query_string`, `logs`, `traces` and `issues`. Deploys happen by pushing to the Cloudflare-connected repo. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Logs, traces and Issues available for the Worker after the next deploy.

**Non-Goals:**
- Changing `worker/index.js` or adding custom log statements.
- Tuning sampling or retention.

## Decisions

- **Top-level `enabled: true`.** The pasted full example had `false`, which would make the other settings look active while telemetry is off. The user chose the full block with traces and issues on.
- **Everything at `head_sampling_rate: 1`.** Traffic to a docs site is low; full sampling is simplest. Reduce if limits or cost become a problem.
- **`redact_query_string: false`** as given; URLs here carry no secrets.
- **Single block in `wrangler.jsonc`**, next to `assets`, not a dashboard-only toggle, so the setting is versioned.

## Risks / Trade-offs

- [Plan limits or cost for persisted logs/traces] → watch the dashboard after deploy; lower `head_sampling_rate` if needed.
- [Traces / Issues keys unsupported by the deployed wrangler] → the installed schema contains them; verify with `npx wrangler deploy --dry-run`.
- [Query strings logged] → fine for this site; set `redact_query_string: true` if URLs ever carry tokens.
