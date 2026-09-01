# Chrono — Temporal Decision Workspace

**Replay the past. Understand the present. Rehearse and forecast the future.**

Chrono turns your project into a timeline of immutable events. Boards, diffs, scenarios, forecasts, and AI explanations are all projections of the same event stream — so every answer about your project comes with evidence, not memory.

> **Pre-launch.** Links marked `[PLACEHOLDER]` go live at deployment. Visuals below are illustrative pre-launch renders.

**[Launch the app →](https://[PLACEHOLDER-HOST])** · **[Try the live demo →](https://[PLACEHOLDER-HOST]/demo)** · **[Status →](https://[PLACEHOLDER-STATUS-HOST])**

![Chrono workspace — Temporal Rail over a live board](assets/hero.png)

## Why time is the missing dimension

Project tools show you *now*. But the decisions you actually make are about time:

- *"Why did the launch slip two weeks?"* — Chrono replays the exact sequence of estimate revisions and scope changes that caused it.
- *"What if we add two engineers?"* — Chrono rehearses it in a scenario branch before you commit.
- *"Can we still make the date?"* — Chrono projects it deterministically, with the critical path and the risk in days.

## See it working

### Replay & Compare — hold plans to evidence

Scrub the Temporal Rail to any moment and see the board exactly as it was. Compare any two points in time with a structured, event-level diff: what was added, re-prioritized, re-estimated, and when.

![Replay a past state and compare it with today](assets/replay-compare.png)

### Forecast — dates you can defend

A deterministic projection engine: topological order, capacity-aware working days, critical path, risk rating. Same input, same output — reproducible in front of your board, auditable by your auditors.

![Deterministic forecast with critical path and risk rating](assets/forecast.png)

### Scenarios — rehearse before you commit

Branch off main, test staffing or scope changes in isolation, compare the branch against main, and apply it back as replayed commands when you're satisfied. Main is untouched until you say so.

### AI explain — answers with receipts

Ask *"why did the launch move?"* and get an answer grounded in the event trail, every claim linked to the events that prove it. Works with any OpenAI-compatible provider; degrades to deterministic analysis without a key.

### Built for real teams

- Four views: Board, Table, Calendar, Dependency canvas
- Realtime collaboration with presence (SSE)
- Offline mode: edits queue locally and sync idempotently when you're back
- Trash with restore, per-task activity history derived from the event log

## Who it's for

| Role | Gets |
| --- | --- |
| Product Manager | "what changed and why" with an auditable trail |
| Engineering Manager | capacity-aware forecasts instead of gut dates |
| Product Lead | plan changes held to evidence, compared across time |
| Tech Lead | dependency-aware scenarios for staffing and scope |
| Founder | a defensible delivery picture without status meetings |

## Pricing

Subscriptions are metered per **workspace**, per **seat**, and by **usage** (event volume and AI explanations). Illustrative tiers — final pricing at launch:

| | Starter | Growth | Scale |
| --- | --- | --- | --- |
| Workspaces | 1 | 5 | Unlimited |
| Seats | 3 included | 10 included | Custom |
| Event history | 90 days | Unlimited | Unlimited |
| Scenarios & Forecast | ✔ | ✔ | ✔ |
| AI explain | — | ✔ | ✔ |
| Self-host option | — | — | ✔ |

## Security & trust

- Session tokens stored SHA-256-hashed; `HttpOnly` + `SameSite=Lax` cookies, `Secure` in production
- Security headers on every response; same-origin enforcement on mutating APIs
- Per-IP and per-email auth rate limits; per-user API rate limits
- All input validated at the boundary; uniform error shapes; no existence leakage
- Event log is append-only and immutable — your audit trail is the product, not an add-on

## Get access

For early access, trials, source access, or security reports: **[PLACEHOLDER-EMAIL]**

---

Chrono — work isn't only about now.
