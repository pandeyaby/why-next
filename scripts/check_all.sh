#!/bin/sh
# Every check CI runs, in the same order. Run locally before pushing.
set -eu
cd "$(git rev-parse --show-toplevel)"
echo "== upstream validator";  node scripts/validate.mjs
echo "== merged validator";    (cd out/merged && node scripts/validate.mjs)
echo "== schema check";        python3 ext/check_schema.py
echo "== demo 162-combo test"; node site/build/test_infer.cjs
echo "== deterministic build"; sh scripts/check_deterministic.sh
