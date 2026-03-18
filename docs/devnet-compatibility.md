# Devnet Compatibility Report

Last updated: 2026-03-18

## Scope

This report documents stable behavioral drift between the current local SDK/source expectations and the AgenC program deployed on Solana devnet.

The drift was reproduced by running the deep devnet integration harness with funded creator and worker wallets:

```bash
CREATOR_WALLET=/path/to/creator.json \
WORKER_WALLET=/path/to/worker.json \
npm run test:devnet:deep
```

The deep harness lives at `/Users/pchmirenko/tmp/agenc-sdk-review-20260318/scripts/devnet-integration-deep.mjs`.

## Stable Drift Map

| Scenario | Expected Local Error | Observed Devnet Error | Notes |
| --- | --- | --- | --- |
| Register agent below minimum stake | `InsufficientStake` | `InsufficientFunds` | Reproduced across reruns. Suggests the deployed devnet program or error mapping does not match the current local expectation for low-stake registration. |
| Create task with past deadline | `InvalidInput` | `UpdateTooFrequent` | Even after waiting past the configured task creation cooldown, devnet still returns a cooldown-style error for this case before the expected deadline validation result. |
| Creator self-claims own task | `SelfTaskNotAllowed` | `ProposalUnauthorizedCancel` | Behavior rejects the action, but the decoded error name is unrelated to task claiming. This points to error-table drift. |
| Complete task without an initialized claim | `NotClaimed` | `AccountNotInitialized` | Devnet rejects the action at the missing claim-account layer instead of surfacing the higher-level semantic error expected by the current source. |
| Cancel task after successful completion | `InvalidStatusTransition` or `TaskCannotBeCancelled` | `AccountNotInitialized` | The action fails because the escrow account is already gone. The behavioral outcome is acceptable, but the surfaced error differs from the current local expectation. |

## Checks That Still Align

These scenarios matched the current SDK/source expectations on devnet:

- Claim with insufficient capabilities returns `InsufficientCapabilities`
- Deregistering a worker with an active task returns `AgentHasActiveTasks`
- Public happy path `register -> create -> claim -> complete` succeeds
- Final on-chain task state verifies as `Completed`
- Cleanup deregistration succeeds after task completion

## Harness Behavior

The deep devnet harness supports two modes:

- `compat`
  - Accepts the known devnet drift listed above
  - Logs each drift explicitly
  - Exits successfully if only known drift is observed

- `strict`
  - Fails on any semantic drift, including the known mappings above
  - Useful for checking whether devnet has caught up with current local expectations

Recommended commands:

```bash
# Developer-friendly: passes while still logging the known drift
npm run test:devnet:deep

# Strict: fails until devnet behavior matches local expectations
npm run test:devnet:deep:strict
```

## Interpretation

The public task lifecycle is working on devnet. The main compatibility problem is not the happy path. The drift appears in error naming, validation ordering, and lower-level account failures replacing higher-level semantic errors.

That points to one of these conditions:

1. The devnet-deployed program is older or otherwise different from the local source used to derive SDK expectations.
2. The runtime IDL or error map used by the SDK is newer than the deployed devnet program.
3. Some devnet code paths are surfacing framework-level Anchor account errors where the current local code expects protocol-level errors.
