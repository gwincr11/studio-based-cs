#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm install -g @github/copilot
npm ci
scripts/bootstrap
cd src
npm exec -- playwright install --with-deps chromium
