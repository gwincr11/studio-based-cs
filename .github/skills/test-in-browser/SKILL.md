---
name: test-in-browser
description: Verify the Flask starter in a browser using the configured Playwright MCP server.
---

Read `starter/AGENTS.md`. Start `script/server` from `starter/` if the app is not
already running. Use the URL printed in the terminal (port 5000 or the next
available port) and verify its `/health` endpoint responds successfully.
Use the available session/process controls to manage the server; stop a helper
you started once the check is finished.

Use Playwright MCP accessibility snapshots to inspect the page, fill the input
labelled "Your message", activate "Add message", and confirm the message appears.
Refresh to verify persistence. Exercise error states relevant to the change and
check the browser console for failures. Use synthetic data only.

For repeatable automated coverage, run `script/test-e2e` from `starter/`. It builds
the real frontend and starts Flask with a temporary migrated database on port 5001.
Report observed results, not assumed success.
