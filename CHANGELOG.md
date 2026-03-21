# Changelog

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Added initial changelog + API baseline tooling. (#983)

### Deprecated
- `VERIFICATION_COMPUTE_UNITS` in `sdk/src/constants.ts` — use `RECOMMENDED_CU_COMPLETE_TASK_PRIVATE` instead. Removal planned for v2.0.0. (#983)

## [1.3.1] - 2026-03-20

### Changed
- Synced package metadata, release docs, and version references with the live `1.3.1` package cut.

## [1.3.0] - 2026-02-14

### Added
- SPL token escrow helpers (`deriveTokenEscrowAddress`, `getEscrowTokenBalance`).
- Marketplace bid types and helpers (`bids.ts`).
