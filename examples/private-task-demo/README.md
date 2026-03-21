# Private Task Demo

This is the curated standalone SDK example for private-task payload construction and router-account derivation.

If you do not provide `PRIVATE_DEMO_AGENT_SECRET`, the demo derives a private
agent secret from the generated worker key for that run so nullifier derivation
still works without hard-coded shared defaults.

## What It Covers

- deterministic private payload construction
- verifier-router account derivation
- simulated submission timing
- optional live PrivacyCash payout path when a real private key is provided

## Run It

From the repo root:

```bash
npm install --no-fund
npm run start --workspace=@tetsuo-ai/private-task-demo -- --help
npm run start --workspace=@tetsuo-ai/private-task-demo
```

## Environment

- `HELIUS_API_KEY` - optional mainnet Helius key; if unset the example falls back to Solana devnet behavior
- `PRIVATE_DEMO_TASK_ID` - override the synthetic task id
- `PRIVATE_DEMO_SALT` - override the deterministic output salt
- `PRIVATE_DEMO_SUBMISSION_DELAY_MS` - simulated submission delay
- `PRIVATE_DEMO_PAYLOAD_SIM_DELAY_MS` - simulated payload-construction delay
- `PRIVATE_KEY` - enable the live PrivacyCash payment path instead of simulation mode
- `PRIVACYCASH_MODULE` - override the module name for the live-payment dependency

## Modes

- Default mode is simulation-only. It constructs payloads, derives accounts, and prints the expected flow without sending a live payout.
- If `PRIVATE_KEY` is set, the example enables the live PrivacyCash payment branch and expects a valid 64-byte secret key as either a JSON array or base64 string.

## Expected Output

You should see:

- the chosen config values
- derived router/verifier/binding/nullifier accounts
- the 260-byte seal and 192-byte journal sizing assumptions
- whether the flow stayed in simulation mode or entered the live-payment path

This example is for SDK orientation and smoke testing. It is not the source of truth for protocol semantics; those live in `agenc-protocol`.
