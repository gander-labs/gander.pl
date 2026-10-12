## 1. Configuration

- [x] 1.1 Add the `observability` block (enabled, `head_sampling_rate` 1, `redact_query_string` false, logs with `invocation_logs` and `persist`, traces with `persist`, issues enabled) to `wrangler.jsonc`, and verify `npx wrangler deploy --dry-run` accepts it
- [x] 1.2 Mention observability in the Cloudflare Workers section of `CLAUDE.md` and verify with `grep -n -i observability CLAUDE.md`

## 2. Verify behaviour

- [ ] 2.1 After the next deploy, verify logs, traces and Issues appear for `gander-pl-next` in the Cloudflare dashboard after a page request
