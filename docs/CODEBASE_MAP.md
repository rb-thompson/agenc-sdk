# SDK Codebase Map

This file maps the full `agenc-sdk` repo for developers and AI agents.

## Top-Level Layout

```text
agenc-sdk/
  src/                         package source
  src/__tests__/               vitest coverage for each major module
  src/utils/                   small support helpers
  src/types/                   local ambient type declarations
  docs/api-baseline/           checked-in API snapshot
  examples/private-task-demo/  curated runnable example
  scripts/                     baseline and pack-smoke automation
  .github/workflows/           CI and publish automation
  README.md
  CHANGELOG.md
  package.json
```

## Source Map

### Package entrypoints

- `src/index.ts` - public barrel for the package
- `src/spl-token.ts` - internal SPL-token helper subpath exported as `@tetsuo-ai/sdk/internal/spl-token`

### Domain modules

- `src/proofs.ts` - proof payload construction and hash derivation
- `src/prover.ts` - prover transport configuration and errors
- `src/proof-validation.ts` - client-side preflight checks for private completion payloads
- `src/tasks.ts` - task create/claim/complete/cancel helpers and PDAs
- `src/queries.ts` - read-side query helpers and replay-oriented filters
- `src/agents.ts` - agent lifecycle helpers
- `src/disputes.ts` - dispute lifecycle helpers
- `src/state.ts` - protocol state helpers
- `src/protocol.ts` - protocol admin and zk-config helpers
- `src/governance.ts` - governance helpers
- `src/skills.ts` - skill and marketplace-facing helpers
- `src/bids.ts` - marketplace bid models and validation helpers
- `src/tokens.ts` - token-task helpers layered on top of task flows
- `src/client.ts` - `PrivacyClient` convenience wrapper
- `src/errors.ts` - error decoding and protocol error metadata
- `src/version.ts` - protocol-version compatibility helpers
- `src/process-identity.ts` - process identity snapshot helpers
- `src/logger.ts` - logging utilities
- `src/anchor-utils.ts` - lower-level Anchor helpers
- `src/constants.ts` - public IDs, PDA seeds, size constants, and compute-budget recommendations
- `src/validation.ts` - input validation helpers
- `src/nullifier-cache.ts` - replay/nullifier support cache

### Support files

- `src/__tests__/*.test.ts` - module-by-module package contract tests
- `src/utils/numeric.ts` - numeric helper functions
- `src/utils/pda.ts` - PDA utility helpers
- `src/types/privacycash.d.ts` - optional module typing for the live-payment example path

## Scripts And Automation

- `scripts/check-api-baseline.mjs` - compare or regenerate `docs/api-baseline/sdk.json`
- `scripts/pack-smoke.mjs` - build-and-pack smoke test for the publishable npm package
- `.github/workflows/ci.yml` - build, typecheck, test, baseline check, and pack smoke
- `.github/workflows/publish.yml` - release-triggered publish after the same verification gates

## Repo Ownership Boundaries

- This repo owns the public `@tetsuo-ai/sdk` TypeScript package and its release docs.
- Protocol truth lives in `agenc-protocol`.
- Plugin ABI truth lives in `agenc-plugin-kit`.
- Runtime/product implementation truth lives in `agenc-core`.
- Proving service and private admin tooling live in `agenc-prover`.

## Start Here By Change Type

- Export or API change: `src/index.ts`, then [MODULE_INDEX.md](./MODULE_INDEX.md)
- New task/proof/query helper: matching `src/*.ts` module plus `src/__tests__/`
- Example change: `examples/private-task-demo/`
- Release or packaging change: `scripts/`, `.github/workflows/`, and [MAINTAINER_GUIDE.md](./MAINTAINER_GUIDE.md)

