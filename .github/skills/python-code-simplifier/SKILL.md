---
name: python-code-simplifier
description: Simplify recently changed Flask starter Python code without changing behavior.
---

Read `starter/AGENTS.md` and inspect the requested diff. Keep scope to the changed
Python code and directly dependent call sites. Prefer clear names, small functions,
early returns, precise annotations, SQLAlchemy models, and Pydantic validation.
Preserve HTTP status codes, database behavior, and explicit error reporting.
Do not replace errors with silent defaults or remove meaningful checks.

Run `script/lint`, `script/typecheck`, and `script/test` from `starter/`. For
user-facing changes also run `script/test-e2e`. Report significant changes and
any checks that could not be completed.
