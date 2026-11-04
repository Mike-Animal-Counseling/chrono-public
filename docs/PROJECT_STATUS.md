# Chrono project status

Updated 2026-11-03. **Pre-launch; no public SaaS deployment is available.**
This repository contains product information and concept visuals, not deployable
application source. The product implementation is maintained privately.

## People and AI workers

The new private implementation adds project-scoped AI workers alongside human
collaborators while preserving the temporal workspace. Tickets can be assigned
manually, or an optional scheduler can match available agent capacity and skills
to unowned work. Unfinished prerequisites block execution. Successful work
completes automatically by default; teams can opt into human review.

Twelve templates cover general assistance, product management, software
engineering, QA, writing, marketing, research, data analysis, customer support,
sales, operations and product design. Each defines specialty instructions,
suggested skills and deliverables. A profession name does not grant tools.

Built-in workers produce text from ticket context: drafts, analyses, plans,
code snippets and reviews of supplied material. They do not browse the web,
access repositories, run tests, send messages or modify external systems.
Owned/custom agents with those capabilities can use the separate external
connector. No dedicated third-party agent platform is claimed as integrated.

Customers can use a personal provider key or an operator-configured managed
allowance. Provider/model availability and the managed allowance require service
configuration; no commercial AI price or bundled real credential is announced.
Managed usage has workspace and global ceilings across replicas; in Stripe mode
it requires a currently verified paid workspace plan.
The managed allowance is bounded execution attempts, separate from existing
subscription-seat billing. Workers have reported progress, results, cancellation,
retry and execution history shared across application replicas.

The worker candidate passed its complete private Linux engineering workflow,
including the sustained workload, independent restore, image lifecycle checks
and all three strict image scans. Its local and exact-head Linux evidence is
recorded privately, separately from the accepted pre-worker baseline below.
Real provider quality, spending, tool integration and chosen-host agent capacity
still require acceptance before service launch.
Local worker-candidate checks passed 263 unit/database/connector regressions and
141 standalone two-process lifecycle/fault/worker assertions. Model output was
synthetic; this validates execution contracts rather than real AI quality.

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

The intended delivery is hosted: the operator configures infrastructure, email
and payments once. Customers use signup/invitations and the product interface;
they do not supply deployment secrets or manage application replicas.

Engineering evidence for the accepted pre-worker baseline includes:

- 239 unit/database regression tests passed with the large-data cases enabled
  and no skipped tests in that baseline's local run.
- A standalone-package smoke with 112 two-process HTTP/SSE/SMTP/payment-
  contract checks, including shared sessions/updates, invitations, subscription
  state changes and permission/session revocation.
- A dataset exercise with 1,200 tasks, 600 updates and 400 dependency edges.
- A five-minute full-view workload profile exercises 30 simultaneous users,
  1,200 tasks and per-user realtime streams, with explicit latency, memory,
  event-loop and convergence gates. The current profile includes the sidebar's
  exact date window and separate concurrent full-detail reads.
- Release automation includes independent event/projection checks, database
  dump/restore comparisons, non-root Linux runtime/managed/migration images,
  and strict HIGH/CRITICAL vulnerability gates with retained reports. It also
  supports weekly and manual validation.
- Type checks, an optimized production build and a dependency audit with no known
  unresolved advisories at the recorded check.

The accepted pre-worker release candidate passed its complete Linux engineering
workflow, including the selected sustained workload, independent restore,
image lifecycle checks and all three strict image scans. These are
repository/candidate checks with synthetic data, not a deployed
service's security, uptime or capacity certification. A release candidate must
pass the complete Linux workflow before deployment; chosen-host staging,
actual email/payment delivery, hosted recovery and alerts remain launch gates.

Recent hardening also preserves dirty drafts through collaboration conflicts,
bounds table rendering while retaining global search, makes historical dates
and evidence scope explicit, and keeps permission/session decisions in shared
storage. Rehearsal/forecast assumptions and read-only time contexts are visible
in the product.
The change-history dialog pages through the chosen event interval and supports
keyboard focus, Escape close, range validation and retry.

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
