## Why

The Worker (`gander-pl-next`) runs on every page request to attach security headers, but there is no record of what it does: no invocation logs, traces or error reports. Cloudflare Workers Observability can provide these through `wrangler.jsonc`, with nothing to change in the Worker code.

## What Changes

- Add an `observability` block to `wrangler.jsonc`: observability enabled, 100% head sampling, query strings not redacted, persisted logs with invocation logs, persisted traces, and real-time Issues enabled.
- Document the setting in `CLAUDE.md`.
- The pasted example had top-level `"enabled": false`; it is set to `true` here (chosen by the user) so the sub-settings take effect.

## Capabilities

### New Capabilities
- `worker-observability`: Which logs, traces and issue reporting the deployed Worker exposes in Cloudflare.

### Modified Capabilities

## Impact

- `wrangler.jsonc`, `CLAUDE.md`.
- After the next deploy (push to the Cloudflare-connected repo), Workers Observability shows logs, traces and Issues for `gander-pl-next`.
- Data volume and plan limits: 100% sampling of page requests, persisted. Query strings are logged unredacted; acceptable for a public docs site with no secrets in URLs.
