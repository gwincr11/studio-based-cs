# Studio Flask starter

A small working Flask + React Islands + PostgreSQL app, bundled with the course
slides. The message board demonstrates the browser-to-API-to-database round trip;
replace it with your team's solution to the other team's problem.

## Open in Codespaces

Fork this repository for your team, then use **Code > Codespaces > Create
codespace**. The root `.devcontainer/` installs Python 3.12, Node.js 22, PostgreSQL
16, GitHub CLI, Copilot CLI, dependencies, Chromium, and the pre-commit hooks.
Setup creates the development database, applies migrations, and builds the UI.
Codespaces usage and Copilot access are subject to your account's entitlements;
they are not unlimited free services.

In the Codespaces terminal:

```sh
./scripts/start-app
```

Open the port printed in the terminal (normally **5000**). If it is busy, the
server automatically tries the next port. Keep the development port private. The app loads
built assets through Flask, so there is only one app URL and no second browser
origin to configure. Slides are separate: from the repository root, run
`npm run dev -- --port 4317`.

## Run locally

Requires Python 3.12+, Node.js 22.12+, and a running PostgreSQL server with
`psql` and `createdb` on your PATH.

```sh
./scripts/setup
./scripts/start-app
```

Setup creates `.venv/` and `.env`, installs the locked npm dependencies, creates
the default local `studio_app` database if needed, applies migrations, and builds
React assets. The server starts at port 5000 and automatically tries higher ports
if it is occupied. Open the URL printed in the terminal. Use
`PORT=5050 ./scripts/start-app` to start the search at a different port, or `PORT=0` to
let the operating system choose an available port.

For a different PostgreSQL server, copy `.env.example` to `.env` and set
`DATABASE_URL` before running setup, or export it in the environment. Create the
database on that server first. Environment variables take precedence over `.env`.
No database password is required in the default Codespaces development setup.

Frontend edits need a rebuild and browser refresh. In a second terminal, run
`npm --prefix src/frontend run dev` from the repository root to rebuild on changes.
Restart `./scripts/start-app` after Python changes. The Flask debugger is off.

## Work with an agent

From `src/`, launch `copilot` and describe the other team's problem, chosen
idea, and acceptance criteria. Copilot authentication and any required subscription
are separate from installing the CLI. `AGENTS.md` describes the app and checks;
the root `.github/agents/` retains planning, plan-review, and refactoring roles,
alongside the existing slide-building agent.

Root `.github/skills/` contains Python and TypeScript simplification,
browser-testing, and commit helpers. `.vscode/mcp.json` configures a headless
Playwright MCP server for VS Code; approve its use when prompted. Automated
browser tests also work without MCP.

The harness is instructions + isolated dependencies + migrations + lint/type
checks + unit/component/browser tests + pre-commit hooks + CI. There is no
autonomous build loop, tutorial exercise, or prefilled implementation plan.

## Check your changes

Run from the repository root:

```sh
./scripts/lint
./scripts/typecheck
./scripts/test
cd src && npm exec -- playwright install chromium  # first local browser check only
cd .. && ./scripts/test-e2e
```

Backend tests use in-memory SQLite. Browser tests use a temporary, migrated
SQLite database and the real built React UI. The repository's starter CI also
applies migrations and checks model/schema consistency against PostgreSQL 16.

For model changes, run these commands from `src/`:

```sh
.venv/bin/flask --app src.app:create_app db migrate -m "describe the change"
# Review the generated migration.
.venv/bin/flask --app src.app:create_app db upgrade
.venv/bin/flask --app src.app:create_app db check
```

To install the repository's pre-commit hooks locally, run
`src/.venv/bin/pre-commit install` from the repository root.

## Deploy on Render

The root `render.yaml` deploys the Flask app and frontend from `src/`, with
repository-level scripts for setup and launch.

1. Push your team's fork to GitHub.
2. Create an external PostgreSQL database and copy its connection URL. A provider
   such as [Neon](https://neon.com/pricing) offers a free plan, subject to its
   current limits. Use the provider's required SSL settings in the URL.
3. In Render, create a **Blueprint** from your fork and select the root
   `render.yaml`. Supply `DATABASE_URL` when prompted.
4. Render builds the frontend, installs Flask dependencies, generates
   `FLASK_SECRET_KEY`, applies migrations at startup, and starts Gunicorn. Open
   the resulting HTTPS URL and try adding a message.

For manual Web Service setup, use these settings:

| Setting | Value |
| --- | --- |
| Root directory | Repository root |
| Runtime / compute | Python / Free |
| Build command | `pip install -r src/requirements.txt && npm --prefix src/frontend ci && npm --prefix src/frontend run build` |
| Start command | `bash scripts/start` |
| Health check | `/health` |
| Environment | `APP_ENV=production`, `DATABASE_URL`, `FLASK_SECRET_KEY` |

For manual setup, generate a secret with
`python3 -c 'import secrets; print(secrets.token_hex(32))'` and paste it into
Render's environment settings. Never commit it. Use Python 3.12+ and Node.js
22.12+. Production refuses to start without a database URL and secret.

[Render's free web services](https://render.com/docs/free) sleep after inactivity
and have usage limits. Its free PostgreSQL databases expire; the blueprint
therefore does not create one or provision any paid resource. External database
free-tier limits are separate. Local files are not durable on Render.

The message board is deliberately **public and unauthenticated**. Use sample
data only; do not enter personal, confidential, or stakeholder data. Add
authentication, authorization, abuse protection, and appropriate data handling
before turning a prototype into a real service.

## Source

Adapted from [gwincr11/ralph-wiggum-tutorial](https://github.com/gwincr11/ralph-wiggum-tutorial)
at commit `2310b403b7b3f6af985a886e50193edec0e76bf5`. Retains the Flask factory,
SQLAlchemy/Alembic foundation, React Islands architecture, agent roles, and
validation/environment patterns. The game, autonomous loop, loop prompts,
tutorial presentation, game specifications, and implementation plan are omitted.
