#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
starter/.venv/bin/pre-commit install
echo "Run cd starter && script/server to start Flask."
echo "Run npm run dev -- --port 4317 from the repository root to present the slides."
