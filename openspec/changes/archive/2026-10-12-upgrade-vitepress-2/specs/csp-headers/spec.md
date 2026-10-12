## Purpose

Defines the security headers the Worker adds to HTML pages of the site and the guarantee that page content is served as built, so CSP violations can be monitored without blocking visitors.

## ADDED Requirements

### Requirement: Report-only CSP on HTML responses
The Worker SHALL add a `Content-Security-Policy-Report-Only` header and a `Reporting-Endpoints` header pointing at `https://csp.gander.tools/` to every response whose `Content-Type` is `text/html`. The policy MUST NOT depend on per-request nonces.

#### Scenario: HTML page
- **WHEN** a visitor requests a page that is served as `text/html`
- **THEN** the response carries both headers and the policy contains no `nonce-` source

#### Scenario: Non-HTML asset
- **WHEN** a request resolves to a non-HTML response
- **THEN** the response is returned without these headers

### Requirement: HTML body served unmodified
The Worker SHALL return the static asset body exactly as built, without reading or rewriting it.

#### Scenario: Built page contains no placeholders
- **WHEN** the site is built
- **THEN** no built HTML file contains a `{{CSP-NONCE}}` placeholder or a `nonce` attribute

### Requirement: Site works under the policy
Pages SHALL render and function (including dark-mode toggle and search) with no CSP violations reported against the report-only policy.

#### Scenario: Preview check
- **WHEN** a built page is opened in a browser against the policy
- **THEN** the console shows no CSP violation reports
