# worker-observability Specification

## Purpose

Defines which runtime telemetry the deployed Worker emits to Cloudflare, so its behavior and errors can be inspected without changing the Worker code.

## Requirements

### Requirement: Logs are collected and persisted
The deployed Worker SHALL have observability enabled, with invocation logs on and logs persisted to the Cloudflare observability platform at a 100% sampling rate.

#### Scenario: Page request
- **WHEN** a visitor requests an HTML page handled by the Worker
- **THEN** an invocation log for that request is available in the Cloudflare dashboard

### Requirement: Traces are collected and persisted
The deployed Worker SHALL emit traces, persisted at a 100% sampling rate.

#### Scenario: Trace lookup
- **WHEN** a request is handled by the Worker
- **THEN** its trace can be found in the Cloudflare dashboard

### Requirement: Issues are enabled
The deployed Worker SHALL have real-time Issues enabled.

#### Scenario: Runtime error
- **WHEN** the Worker throws an unhandled error
- **THEN** it is reported as an Issue for the Worker

### Requirement: Query strings are not redacted
Request URLs in logs and traces SHALL keep their query strings.

#### Scenario: Request with query string
- **WHEN** a request URL contains a query string
- **THEN** the log shows the full URL including the query string
