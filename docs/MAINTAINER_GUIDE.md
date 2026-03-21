# SDK Maintainer Guide

This file maps the local validation and release flow for `agenc-sdk`.

## Local Setup

```bash
npm install --no-fund
```

## Core Commands

```bash
npm run build
npm run typecheck
npm run test
npm run api:baseline:check
npm run pack:smoke
```

These are the same gates enforced by `.github/workflows/ci.yml` and `publish.yml`.

## When To Run What

- Source change: `npm run typecheck` and `npm run test`
- Export change or public type change: `npm run build` and `npm run api:baseline:check`
- Packaging or publish-surface change: `npm run pack:smoke`
- Release candidate: run the full sequence above in order

## API Baseline Workflow

- Check for drift: `npm run api:baseline:check`
- Regenerate after intentional API change: `npm run api:baseline:generate`
- Review the diff in `docs/api-baseline/sdk.json`

Do not regenerate the baseline to hide accidental export drift. The baseline should only move after the public API change is understood and intentional.

## Pack Smoke

`npm run pack:smoke` verifies the tarball that npm would publish, not just the repo checkout. Use it when changing:

- `package.json` exports or files
- the README or changelog
- build output wiring
- subpath exports such as `internal/spl-token`

## Publish Flow

`publish.yml` runs on release publication or manual dispatch and re-runs:

```bash
npm run build
npm run typecheck
npm run test
npm run api:baseline:check
npm run pack:smoke
```

Only after those pass does the workflow publish with provenance.

## Version Sync Checklist

When cutting a release, keep these aligned:

- `package.json` version
- `src/version.ts` -> `SDK_PACKAGE_VERSION`
- `CHANGELOG.md`
- any release notes or README references that mention the current package version

