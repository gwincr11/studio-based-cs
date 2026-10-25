#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
scripts/setup
cd src
npm exec -- playwright install --with-deps chromium
