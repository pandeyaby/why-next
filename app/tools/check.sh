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

echo "== 3c. offline lessons + reels bundle (tools/sync_content.py)"
python3 - <<'PY'
import json, os, re
W = 'WhyNext/Resources/Web'
if not os.path.exists(f'{W}/content.json'):
    print('skipped: no Resources/Web (run python3 tools/sync_content.py)'); raise SystemExit
c = json.load(open(f'{W}/content.json', encoding='utf-8'))
assert len(c['flagships']) == 12, c['flagships']
assert set(c['flagships']) <= set(c['lessons']), 'every flagship has a lesson'
html = open(f'{W}/index.html', encoding='utf-8').read()
assert 'WN_TOPIC' in html and 'WN_RPARTS' in html, 'app shim missing from index.html'
for src in re.findall(r'src="(wn/[^"?]+)', html): assert os.path.exists(f'{W}/{src}'), src
lazy = open(f'{W}/wn/learn.js', encoding='utf-8').read()
for f in set(re.findall(r'"((?:fl_|vis|reels|b\d|l\d|d\d)[\w]*\.js)\?v=', lazy)): assert os.path.exists(f'{W}/wn/{f}'), f
ids = set(n.get('i') for n in json.load(open('WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json', encoding='utf-8'))['nodes'])
assert set(c['flagships']) <= ids, 'flagship topics are on the map'
reels = [r for L in c['reels'].values() for r in L]
if os.path.isdir(f'{W}/reels'):
    for r in reels:
        for e in ('mp4', 'vtt', 'jpg'): assert os.path.exists(f"{W}/reels/{r['f']}.{e}"), r['f'] + '.' + e
        assert os.path.getsize(f"{W}/reels/{r['f']}.mp4") < 2_000_000, r['f']
        assert open(f"{W}/reels/{r['f']}.vtt", encoding='utf-8').read().startswith('WEBVTT'), r['f']
    assert os.path.exists(f'{W}/reels/captions.js')
    size = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(W) for f in fs)
    print(f"{len(c['lessons'])} lessons, 12 flagships, {len(reels)} reels with captions and posters; Web/ is {size / 1e6:.0f} MB")
else:
    print(f"{len(c['lessons'])} lessons, 12 flagships; reels not downloaded yet (run tools/sync_content.py without --no-reels)")
PY
if [ -n "${WEB_CHECK_NODE:-}" ] && [ -d WhyNext/Resources/Web/reels ]; then
  echo "== 3d. offline web bundle runs with the network off (Playwright, needs NODE_PATH with playwright)"
  node tools/check_offline_web.cjs WhyNext/Resources/Web/index.html
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
