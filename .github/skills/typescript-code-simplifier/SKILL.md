---
name: typescript-code-simplifier
description: Simplify recently changed starter React and TypeScript code without changing behavior.
---

Read `src/AGENTS.md`. Inspect only the requested changes and dependent call
sites in `src/frontend/`. Preserve interactions, API contracts, accessible
labels, loading states, and visible errors. Use `unknown` and guards for external
data instead of `any`. Keep state minimal and effects correctly cleaned up.
Do not introduce abstraction or dependencies without a concrete need.

Run `npm --prefix src/frontend run lint`, `npm --prefix src/frontend run
typecheck`, and `npm --prefix src/frontend test` from the repository root. Run
`./scripts/test-e2e` for changed interactions. Report significant changes and
failures.
