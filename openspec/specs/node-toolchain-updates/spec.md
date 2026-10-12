# node-toolchain-updates Specification

## Purpose

Defines which Node, `@types/node` and npm versions Renovate may propose and which Node versions the project accepts, so toolchain upgrades are proposed automatically but merged by a human.

## Requirements

### Requirement: Node and @types/node majors are proposed
Renovate configuration SHALL NOT disable `node` major updates for `.nvmrc` and SHALL NOT cap `@types/node` to a maximum version.

#### Scenario: New Node major released
- **WHEN** a new stable Node major is available and older than the minimum release age
- **THEN** Renovate opens a PR for it, as a separate major PR without automerge

#### Scenario: New @types/node major released
- **WHEN** a higher major of `@types/node` is published
- **THEN** Renovate opens a PR for it

### Requirement: npm version can be bumped
Renovate configuration SHALL NOT block updates of the npm version in `packageManager`.

#### Scenario: New npm release
- **WHEN** a new npm version is published and older than the minimum release age
- **THEN** Renovate may open a PR updating `packageManager`

### Requirement: Node engine has no upper bound
`package.json` SHALL declare a minimum Node version for `engines.node` without an upper bound.

#### Scenario: Install on a newer Node
- **WHEN** `npm ci` runs on a Node version at or above the minimum
- **THEN** the install does not fail because of `engines`

### Requirement: Majors stay reviewed
Major updates for these packages SHALL still be raised as separate PRs without automerge and after the minimum release age.

#### Scenario: Major PR raised
- **WHEN** Renovate opens a PR for a Node or `@types/node` major
- **THEN** it is labelled `major-update` and is not automerged
