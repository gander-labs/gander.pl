## Purpose

Defines which dependency updates Renovate proposes for this repository and how they are gated, so that major and pre-release updates are always reviewed by a human.

## ADDED Requirements

### Requirement: VitePress updates are not capped
Renovate configuration SHALL NOT restrict `vitepress` to a maximum major version.

#### Scenario: Major version available
- **WHEN** a higher major of `vitepress` is published and older than the minimum release age
- **THEN** Renovate opens a PR for it

### Requirement: VitePress pre-releases are eligible
Renovate SHALL consider pre-release versions of `vitepress` (including those ahead of the `latest` dist-tag) as update candidates, and SHALL NOT apply this to other packages.

#### Scenario: Only alpha of the new major exists
- **WHEN** the repo is on stable `vitepress` 1.x and `2.0.0-alpha.N` is the newest 2.x release
- **THEN** Renovate opens a PR updating to that alpha

#### Scenario: Unrelated package
- **WHEN** another dependency publishes a pre-release
- **THEN** Renovate does not propose it

### Requirement: Major updates need review
Major `vitepress` updates SHALL be raised as separate PRs, labelled `major-update`, without automerge, and only after the 7-day minimum release age.

#### Scenario: Major PR raised
- **WHEN** Renovate opens a PR for a major `vitepress` update
- **THEN** it has the `major-update` label and is not automerged
