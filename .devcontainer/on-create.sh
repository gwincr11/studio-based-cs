#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm install -g @github/copilot
npm ci
starter/script/bootstrap
cd starter
npm exec -- playwright install --with-deps chromium
