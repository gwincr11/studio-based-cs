# Repository guide

The presentation is at the repository root. The independent Flask + React
application is in `starter/`; read `starter/AGENTS.md` before changing it.
Do not mix the presentation's npm dependencies with the starter's packages.

- Slides: `npm run build` and `npm test` from the repository root.
- Starter: run its `script/lint`, `script/typecheck`, `script/test`, and
  `script/test-e2e` from `starter/`.
- Shared environment: `.devcontainer/`, `.vscode/mcp.json`, and
  `.github/workflows/starter.yml`.
- Deployment: root `render.yaml` deploys only `starter/`.

Use the planning, plan-review, refactoring, and browser-testing helpers when
requested. Make focused changes, keep meaningful checks enabled, and report
failures explicitly. Do not commit `.env` files or real participant data.
