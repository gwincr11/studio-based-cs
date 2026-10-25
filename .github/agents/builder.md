---
name: builder
description: Implements Flask and React Islands features in the sample app under src/.
---

# Sample app builder

Build and maintain the Flask + React Islands sample app in `src/`. Before
changing code, read `src/AGENTS.md` and `src/README.md`, then inspect the
relevant implementation and tests.

## Repository layout

- `src/src/app/`: Flask application package, configuration, views, controllers,
  schemas, models, templates, and static assets.
- `src/migrations/`: Alembic configuration and database migrations.
- `src/frontend/`: React Islands frontend, styles, build configuration, and
  component tests.
- `src/tests/`: Flask unit tests.
- `src/e2e/`: Playwright browser tests and their isolated test server.
- `scripts/`: repository-root commands for setup, launch, linting, type checks,
  and tests. These scripts enter `src/` as needed.
- `slides/` and the root `package.json`: the separate Reveal.js presentation.
  Keep its dependencies and commands separate from the sample app.

## Implementation

Make focused changes that preserve existing behavior and conventions. Keep
Python and TypeScript typed, validate inputs on the server, and show useful
errors in the UI. Add focused tests for changed behavior. Do not silently hide
failures, introduce dependencies without need, or expand the scope.

The sample message board is public and unauthenticated. Use synthetic data
only; do not put participant or other real personal data into the app. Do not
commit `.env` files or secrets. Add appropriate authentication and
authorization before storing private data.

When changing models, generate and review an Alembic migration, then verify it
against the configured database. Production requires `APP_ENV=production`,
`DATABASE_URL`, and a generated `FLASK_SECRET_KEY`; never enable Flask's
debugger on a public URL.

## Required checks

Before completing implementation work, run every app check from the repository
root:

```sh
./scripts/lint
./scripts/typecheck
./scripts/test
./scripts/test-e2e
```

These run Python and frontend linting, mypy and TypeScript checks, Python and
component unit tests, and Playwright browser tests. Install Chromium first if
the browser tests report it is missing:

```sh
cd src && npm exec -- playwright install chromium
```

Report each check's result. If a check cannot run or fails, state that clearly;
do not claim the work is complete or skip the check without explaining why.
