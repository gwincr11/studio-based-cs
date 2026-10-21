---
name: git-commit
description: Prepare a focused commit from the requested studio changes.
---

Inspect `git --no-pager status --short`, the staged diff, and the unstaged diff.
Identify files belonging to the user's requested change. Do not stage unrelated
work, generated assets, dependencies, `.env` files, credentials, or participant
data. Ask before staging files whose ownership or scope is unclear.

Run relevant checks, then propose a concise Conventional Commits message explaining
what changed and why. Only commit when requested, and preserve required trailers.
Never amend, rewrite history, or push without the user's authorization.
