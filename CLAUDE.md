# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gander Site is a comprehensive VitePress-based technical documentation site featuring:
- Technical articles and code solutions
- Development guides and tutorials
- Tool-specific documentation and utilities
- Self-hosting guides and server configurations
- Pimcore CMS solutions and workflows
- Service integrations and API documentation

The site is built with modern web technologies, deployed as static assets on a Cloudflare Worker, and emphasizes security-first architecture with Content Security Policy implementation.

## Technology Stack

- **Static Site Generator**: VitePress for fast, modern documentation sites
- **Deployment Platform**: Cloudflare Workers (static assets) for global CDN and edge processing
- **Analytics**: Dual integration with Umami and Medama analytics platforms
- **Security**: Content Security Policy with nonce-based loading
- **Configuration Language**: TypeScript for type-safe configuration
- **Middleware**: Cloudflare Worker for server-side processing

## Prerequisites and Setup

- **Runtime**: [Node.js](https://nodejs.org/) (see `.nvmrc`; `engines.node` is `>=22`)
- **Installation**: Run `npm ci` to install dependencies

## Build System and Commands

This project uses [VitePress](https://vitepress.dev/):

- **Development server**: `npm run dev` - Starts VitePress dev server
- **Build for production**: `npm run build` - Builds the static site for deployment
- **Preview build**: `npm run preview` - Serves the built site locally for testing

## Architecture and Structure

### Core Structure
- **docs/**: Main content directory containing all markdown files
  - **index.md**: Homepage with project showcase and news
  - **solutions/**: Organized solutions by category (pimcore/, self-hosted/, services/)
  - **tools/**: Tool-specific guides and utilities
  - **utils/**: Utility documentation and helpers
  - **assets/**: Images and static assets
  - **public/**: Public assets (favicons, manifests)

### Configuration
- **.vitepress/config.ts**: Main VitePress configuration with:
  - Site metadata and SEO settings
  - Complex sidebar navigation structure
  - Analytics integration (Umami, Medama)
  - CSP (Content Security Policy) implementation
  - Custom head transformations for nonce injection

### Cloudflare Workers
- **wrangler.jsonc**: Worker config (`gander-pl`, static assets from `.vitepress/dist`, Worker runs first). Deploys are triggered by pushes to the Cloudflare-connected repo (Workers Builds, deploy command `npx wrangler deploy`), not manually.
- **CSP reports**: the CSP is `Report-Only`; violations are sent to the collector at `https://csp.gander.tools/` (a separate Worker that stores them in D1). This site only sets `Reporting-Endpoints` and `report-uri` in `worker/index.js`.
- **Worker routing**: `run_worker_first` limits the Worker to pages (CSP nonce); `/assets/*` and files with an extension are free static requests.
- **Build command**: `npm ci && npm run build`; Node version comes from `.nvmrc` / `NODE_VERSION`.
- **renovate.json**: majors are separate PRs without automerge; Node, `@types/node` and npm majors are normal major PRs (no cap). Bump `.nvmrc` and `NODE_VERSION` in Cloudflare together by hand when merging a Node major. `vitepress` has no version cap and may update to pre-releases (2.x is alpha).

### Middleware
- **worker/index.js**: Cloudflare Worker that wraps the static assets and:
  - Generates CSP nonces for security
  - Sets security headers including CSP reporting
  - Replaces nonce placeholders in HTML output

## Content Organization

The site follows a hierarchical structure visible in the VitePress config sidebar:
- **Services**: External service integrations
- **Self-Hosted**: Self-hosting solutions and configurations
- **Pimcore**: CMS-specific solutions and workflows
- **Tools/Projects**: Development tools and utilities
- **Utils**: General utility documentation
- **Outdated**: Legacy content maintained for reference

## Key Features

The site includes several important features:
- Clean, searchable documentation interface
- Hierarchical navigation structure with deep outline support
- Mobile-responsive design optimized for all devices
- SEO optimization with proper metadata and structure
- Analytics integration supporting both Umami and Medama platforms
- Security-first approach with comprehensive CSP implementation
- Environment-based configuration for all external integrations

## Environment and Security

The project implements strict Content Security Policy with:
- Nonce-based script and style loading for enhanced security
- CSP reporting to external endpoint for violation monitoring
- Environment-based analytics integration preventing hardcoded secrets
- Support for both Umami and Medama analytics platforms
- Comprehensive security headers via the Cloudflare Worker

## Development Workflow

### Development Notes
- Uses TypeScript for configuration
- Implements custom HTML transformations for security headers
- All external links and integrations are environment-variable driven
- Clean URLs enabled with dead link checking disabled for external references
- Deep outline navigation enabled for better content accessibility

### Deployment and Maintenance
- **Build Process**: Production builds are optimized for static hosting
- **Preview Testing**: Use `npm run preview` to test builds locally before deployment
- **Environment Variables**: All external integrations use environment variables for configuration, set as build variables in the Cloudflare Workers Builds settings (there is no `.env` file in the repo)
- **Content Updates**: Markdown files can be edited directly, changes are reflected after rebuild
- **Security Monitoring**: CSP violations are reported to external endpoint for monitoring
- **Analytics**: Both Umami and Medama analytics provide usage insights

## Content Creation Guidelines

### Article Generation Rules

**IMPORTANT**: All articles must follow these mandatory requirements:

1. **Language**: Always generate articles in **English** by default (unless explicitly requested otherwise)
2. **Format**: Use **Markdown** format with proper frontmatter structure
3. **Frontmatter**: Include proper YAML frontmatter with `title` and `description` fields
4. **Navigation**: Deduce and suggest the appropriate path in the VitePress sidebar structure (`.vitepress/config.ts`)

#### Frontmatter Template:
```yaml
---
title: "Article Title"
description: |
    Brief description of what this article covers, can span multiple lines
    and provide comprehensive overview of the content.
---
```

#### File Placement Strategy:
- **Tools & Utilities**: `docs/tools/[category]/filename.md`
- **Self-hosted Solutions**: `docs/solutions/self-hosted/filename.md`
- **Pimcore Solutions**: `docs/solutions/pimcore/filename.md`
- **Service Integrations**: `docs/solutions/services/filename.md`
- **General Utilities**: `docs/utils/filename.md`

### General Content Guidelines

When working with content in this repository:
- All documentation should be in markdown format
- Images and assets should be placed in the `docs/assets/` directory
- Follow the existing hierarchical structure for new content
- Use descriptive filenames and maintain consistent formatting
- External links should be verified and kept up to date

## Documentation Standards

### Shell Code Generation Rules

When preparing shell code for documentation, follow these compatibility guidelines:

#### Priority Order:
1. **Generate cross-compatible code** that works in both bash and fish shell when possible
2. **If cross-compatibility isn't feasible**, create separate code blocks labeled for each shell:
   - `bash` for bash-specific syntax
   - `fish` for fish shell-specific syntax
3. **For long commands**, use multi-line format with backslash (`\`) line continuation
4. **Always include documentation links** for shell commands used in code examples

#### Documentation Link Sources:
- **Standard Unix/Linux commands**: Use man7.org (e.g., `https://man7.org/linux/man-pages/man1/xargs.1.html`)
- **GitHub CLI commands**: Use official CLI manual (e.g., `https://cli.github.com/manual/gh_run_list`)
- **Tool-specific commands**: Use official documentation from the respective project

#### Examples:

**Cross-compatible (preferred):**
```shell
gh run list --status failure \
  --all \
  --json databaseId \
  --jq '.[].databaseId' | xargs -I{} gh run delete {}
```

📖 **Command Documentation**:
- [gh run list](https://cli.github.com/manual/gh_run_list) - GitHub CLI run list command
- [xargs](https://man7.org/linux/man-pages/man1/xargs.1.html) - Execute commands from standard input
- [jq](https://jqlang.github.io/jq/manual/) - JSON processor

**Shell-specific (when needed):**
```bash
# Bash
export MY_VAR="value"
source ~/.bashrc
```

```fish
# Fish
set -x MY_VAR "value"
source ~/.config/fish/config.fish
```

📖 **Command Documentation**:
- [export (bash)](https://man7.org/linux/man-pages/man1/bash.1.html) - Set environment variables
- [source (bash)](https://man7.org/linux/man-pages/man1/bash.1.html) - Execute commands from file
- [set (fish)](https://fishshell.com/docs/current/cmds/set.html) - Set or erase variables

### Technology Documentation Rules

When describing functions, methods, APIs, or features from specific technologies, frameworks, or tools, always include links to their official documentation:

#### Documentation Link Guidelines:
- **Database systems** (SurrealDB, PostgreSQL, Redis): Link to specific function/method pages
- **JavaScript/Node.js libraries**: Link to API documentation or method references
- **CLI tools**: Link to command-specific documentation
- **Web APIs**: Link to endpoint documentation
- **Framework features**: Link to feature-specific guides

#### Examples:

**SurrealDB Documentation:**
```javascript
// Using SurrealDB live queries
const live = await db.live('SELECT * FROM users');
```

📖 **SurrealDB Documentation**:
- [CLI start command](https://surrealdb.com/docs/surrealdb/cli/start) - Starting SurrealDB server
- [HTTP status endpoint](https://surrealdb.com/docs/surrealdb/integration/http#status) - Health check API
- [JavaScript SDK live method](https://surrealdb.com/docs/sdk/javascript/methods/live) - Real-time query subscriptions

**General Technology Documentation:**
```typescript
// Express.js middleware example
app.use(express.json());
app.get('/api/users', (req, res) => {
  res.json(users);
});
```

📖 **Express.js Documentation**:
- [express.json()](https://expressjs.com/en/api.html#express.json) - Body parser middleware
- [app.get()](https://expressjs.com/en/api.html#app.get) - Route handler method
- [res.json()](https://expressjs.com/en/api.html#res.json) - JSON response method

**PHP/Symfony Documentation:**
```yaml
# config/packages/framework.yaml
framework:
    ide: 'phpstorm://open?file=%%f&line=%%l'
```

📖 **Symfony Documentation**:
- [Framework configuration](https://symfony.com/doc/current/reference/configuration/framework.html#ide) - IDE integration settings

#### Documentation Source Priority:
1. **Official project documentation** (primary source)
2. **Official API references** (for specific methods/functions)
3. **Official guides/tutorials** (for broader concepts)
4. **Community-maintained docs** (only if official docs unavailable)
