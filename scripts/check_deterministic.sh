#!/bin/sh
# Rebuild the website twice and fail if the output differs from what is committed
# or between runs. Catches non-deterministic builds and forgotten rebuilds.
set -eu
cd "$(git rev-parse --show-toplevel)"
GEN="index.html site/index.html site/data/demo.json site/data/stats.json"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
export WHYNEXT_SINGLE_FILE="$TMP/why-next-site.html"
python3 site/build/build_site.py >/dev/null
for f in $GEN; do cp "$f" "$TMP/$(echo "$f" | tr / _).1"; done
cp "$WHYNEXT_SINGLE_FILE" "$TMP/single.1"
python3 site/build/build_site.py >/dev/null
for f in $GEN; do
  cmp -s "$f" "$TMP/$(echo "$f" | tr / _).1" || { echo "not deterministic: $f differs between two builds" >&2; exit 1; }
done
cmp -s "$WHYNEXT_SINGLE_FILE" "$TMP/single.1" || { echo "not deterministic: single-file HTML differs between two builds" >&2; exit 1; }
if ! git diff --quiet -- $GEN; then
  echo "generated files are out of date; run python3 site/build/build_site.py and commit:" >&2
  git diff --stat -- $GEN >&2; exit 1
fi
echo "deterministic build OK (two builds identical and match the committed files)"
