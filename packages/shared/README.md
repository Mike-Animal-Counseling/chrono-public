# @chrono/shared — public contract (snapshot)

Extracted type + validation layer from the private Chrono application. Published so
this repository reflects the real technology (TypeScript) and integrators can see the
shape of the domain without the engine implementation.

- `types.ts` — domain vocabulary, event taxonomy, and shared types.
- `schemas.ts` — Zod validation schemas for the command surface.

Not included (private): the event-sourcing command engine (`@chrono/domain`),
the deterministic forecast engine (`@chrono/forecast`), projections, and all
application / hosting code.

License: MIT.