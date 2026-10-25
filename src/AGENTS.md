# Flask starter

Run app commands from the repository root; the scripts in `scripts/` enter
`src/` automatically.

## Setup and run

- `scripts/setup`: installs isolated Python and Node dependencies, creates `.env`
  if needed, creates the default local PostgreSQL database, applies migrations,
  and builds the frontend. PostgreSQL must be running.
- `scripts/start-app`: builds frontend assets and serves Flask on the first available
  port starting at 5000 (or `PORT`). Open the URL printed in the terminal.
- `npm --prefix frontend run dev`: rebuilds assets while editing;
  refresh the Flask page to load changes.
- `.venv/bin/flask --app src.app:create_app db migrate -m "describe change"`:
  generate a migration after changing models. Review it, then run
  `.venv/bin/flask --app src.app:create_app db upgrade`.

## Validation

- `scripts/lint`: flake8 and ESLint.
- `scripts/typecheck`: strict mypy and TypeScript.
- `scripts/test`: pytest and Vitest.
- `scripts/test-e2e`: Playwright, including an isolated migrated SQLite database.
  Install Chromium first with `npm exec -- playwright install chromium`.
- `.venv/bin/flask --app src.app:create_app db check`: check models against the
  migrated PostgreSQL database. CI runs this with PostgreSQL 16.

## Structure

- Flask factory and configuration: `src/app/`.
- JSON endpoints: `src/app/controllers/`; Pydantic validation: `src/app/schemas/`.
- SQLAlchemy models: `src/app/models/`; Alembic migrations: `migrations/`.
- Jinja templates: `src/app/templates/`.
- React islands: `frontend/src/islands/`; entry point: `frontend/src/main.ts`.
- Backend, component, and browser tests: `tests/`, `frontend/tests/`, and `e2e/`.

Keep Python and TypeScript typed. Validate inputs on the server, surface failures
in the UI, and add focused tests when behavior changes. Never hide setup or
migration failures. Production must have `APP_ENV=production`, `DATABASE_URL`,
and a generated `FLASK_SECRET_KEY`; do not enable Flask's debugger on a public URL.
The sample message board is public and unauthenticated: use synthetic data only.
Add appropriate authentication and authorization before storing private data.

Root `.github/agents/` and `.github/skills/` provide the planning, review,
simplification, commit, and browser-testing helpers. They are explicit tools,
not an autonomous implementation loop.
