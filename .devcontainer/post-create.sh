#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
src/.venv/bin/pre-commit install
echo "Run scripts/start-app from the repository root to start Flask."
echo "Run npm run dev -- --port 4317 from the repository root to present the slides."
