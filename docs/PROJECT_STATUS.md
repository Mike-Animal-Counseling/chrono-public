# Chrono project status

Updated 2026-10-31. **Pre-launch; no public SaaS deployment is available.**
This repository contains product information and concept visuals, not deployable
application source. The product implementation is maintained privately.

## Current engineering work

The private hardening work keeps a modular Next.js application with PostgreSQL.
It supports evaluating one instance and running identical application replicas
with shared sessions, throttles, presence and committed-state synchronization.
The event log remains the basis for replay, comparison, scenarios and forecasts.

Local engineering evidence from this work includes:

- 146 unit/database regression tests, plus 2 separately run dataset tests.
- A two-process production-package smoke with 51 HTTP/SSE checks, including client
  asset delivery, shared sessions/updates and permission/session revocation.
- A dataset exercise with 1,200 tasks, 600 updates and 400 dependency edges.
- Type checks, an optimized production build and a dependency audit with no known
  unresolved advisories at the recorded check.

These results describe local validation of the hardening work. They do not
certify a deployed service's security, uptime or user capacity. Linux container,
cloud deployment, actual email delivery, monitoring and restore validation are
separate release gates.

## Before opening the service

Verified-email onboarding, password recovery and team invitations must be
completed and exercised with real delivery. Paid plans require implemented
billing, entitlement and lifecycle behavior; they are not currently shipped.
Production also requires chosen hosting, HTTPS, database recovery, alerts,
staging/browser/load checks and clear user-data/support policies.

A service URL will be published only after deployment and acceptance. Concept
screenshots are illustrative; they are not screenshots of a currently operating
public SaaS. Private source, credentials and customer information are not copied
into this showcase.
