# Chrono project status

Updated 2026-11-01. **Pre-launch; no public SaaS deployment is available.**
This repository contains product information and concept visuals, not deployable
application source. The product implementation is maintained privately.

## Current engineering work

The private hardening work keeps a modular Next.js application with PostgreSQL.
It supports evaluating one instance and running identical application replicas
with shared sessions, throttles, presence and committed-state synchronization.
The event log remains the basis for replay, comparison, scenarios and forecasts.

The private hosted-service work now includes verified-email signup and recovery,
team invitations and role management, durable transactional mail, owner billing
controls, workspace exports/deletion and operator configuration checks. Stripe
Checkout/Portal, subscription reconciliation and server-side plan limits are
implemented. Billing pauses preserve readable data and export access. Rejected
offline edits remain available for explicit recovery.

Local engineering evidence from this work includes:

- 203 unit/database regression tests; 2 optional dataset tests were skipped in
  that run and had passed separately during foundation work.
- A final standalone-package smoke with 93 two-process HTTP/SSE/SMTP/payment-
  contract checks, including shared sessions/updates, invitations, subscription
  state changes and permission/session revocation.
- A dataset exercise with 1,200 tasks, 600 updates and 400 dependency edges.
- Type checks, an optimized production build and a dependency audit with no known
  unresolved advisories at the recorded check.

These results describe local validation of the hardening work. They do not
certify a deployed service's security, uptime or user capacity. Linux container,
cloud deployment, actual email delivery, monitoring and restore validation are
separate release gates.

## Before opening the service

Real transactional-email delivery and Stripe test-mode checkout/lifecycle
acceptance remain required. The payment-contract fixture does not charge cards
or validate a real merchant account. No commercial price is announced here.
Operators must configure domain/HTTPS, mail, merchant account/price, customer
policies, hosting, database recovery and alerts, then complete Linux image,
staging and capacity acceptance before opening registration or charging users.

A service URL will be published only after deployment and acceptance. Concept
screenshots are illustrative; they are not screenshots of a currently operating
public SaaS. Private source, credentials and customer information are not copied
into this showcase.
