---
name: typescript-code-simplifier
description: Simplify recently changed starter React and TypeScript code without changing behavior.
---

Read `starter/AGENTS.md`. Inspect only the requested changes and dependent call
sites in `starter/frontend/`. Preserve interactions, API contracts, accessible
labels, loading states, and visible errors. Use `unknown` and guards for external
data instead of `any`. Keep state minimal and effects correctly cleaned up.
Do not introduce abstraction or dependencies without a concrete need.

Run `npm --prefix frontend run lint`, `npm --prefix frontend run typecheck`, and
`npm --prefix frontend test` from `starter/`. Run `script/test-e2e` for changed
interactions. Report significant changes and failures.
