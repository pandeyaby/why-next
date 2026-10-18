#!/usr/bin/env bash
# Everything that can be checked without Xcode (works on Linux and macOS).
#   app/tools/check.sh [path/to/out/merged/data] [path/to/site/data/demo.json]
set -euo pipefail
APP="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP"
DATA="${1:-$APP/../out/merged/data}"
SITE_DEMO="${2:-}"
BUNDLE=WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json

echo "== 1. data bundle is up to date and deterministic"
if [ -f "$DATA/topics.json" ]; then
  python3 tools/build_app_data.py --data "$DATA" --out /tmp/whynext-data.check.json >/dev/null
  cmp -s /tmp/whynext-data.check.json "$BUNDLE" && echo "bundle matches a fresh build" || { echo "bundle differs from a fresh build of $DATA (run tools/build_app_data.py)"; exit 1; }
else
  echo "skipped: no $DATA/topics.json (pass the merged data folder as the first argument)"
fi

echo "== 2. JSON and plist files parse"
python3 - <<'PY'
import json, glob, plistlib
files = ['WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json', 'WhyNextCore/Tests/WhyNextCoreTests/Fixtures/golden.json'] + glob.glob('WhyNext/Resources/Assets.xcassets/**/Contents.json', recursive=True)
for f in files: json.load(open(f, encoding='utf-8'))
for f in ['WhyNext/Info.plist', 'WhyNext/Resources/PrivacyInfo.xcprivacy', 'WhyNext/Resources/WhyNext-macOS.entitlements']: plistlib.load(open(f, 'rb'))
print(len(files), 'JSON files and 3 plists OK')
PY

echo "== 3. golden results from the website's JavaScript are current"
node tools/make_golden.cjs
git diff --quiet -- WhyNextCore/Tests/WhyNextCoreTests/Fixtures/golden.json 2>/dev/null && echo "golden.json unchanged" || echo "note: golden.json changed (commit it if the reference JS or data changed on purpose)"

if [ -n "$SITE_DEMO" ]; then
  echo "== 3b. same results as the website's own demo.json"
  node tools/check_site_parity.cjs "$SITE_DEMO"
fi

echo "== 4. Swift package builds and tests pass"
cd WhyNextCore
if [ "$(uname)" = "Linux" ]; then
  # Swift 6.1/6.2 Linux toolchains: libswiftObservation.so references a hidden runtime symbol; the
  # linker flag only affects the Linux test binary.
  swift test -Xlinker --allow-shlib-undefined
else
  swift test
fi
cd ..

echo "== 5. lint"
swift format lint --strict -r WhyNext WhyNextCore/Sources WhyNextCore/Tests && echo "swift-format: clean"
for f in $(find WhyNext -name '*.swift'); do swiftc -parse "$f"; done && echo "app sources parse"
echo "all checks passed"
