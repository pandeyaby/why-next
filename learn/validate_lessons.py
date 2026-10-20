"""Validate learn/ lesson data: JSON schema plus content checks, and that out/viewer.html bundles the current lessons.

Run from the repo root: python3 learn/validate_lessons.py
"""
import glob, itertools, json, math, os, re, subprocess, sys, tempfile
import jsonschema
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from lesson_checks import errors, err, check_lesson, fmt

schema = json.load(open("learn/lesson.schema.json"))
topics = {t["id"]: t for t in json.load(open("out/merged/data/topics.json"))["topics"]}
deps = json.load(open("out/merged/data/dependencies.json"))["dependencies"]
files = sorted(glob.glob("learn/lessons/*.json"))
if not files: err("learn/lessons", "no lesson files")
seen_topics = {}
for f in files:
    try: d = json.load(open(f, encoding="utf-8"))
    except json.JSONDecodeError as e: err(f, f"invalid JSON: {e}"); continue
    tid = d.get("topicId")
    if tid not in topics: err(f, f"topicId {tid} is not in the merged dataset")
    if tid in seen_topics: err(f, f"topicId {tid} already has a lesson in {seen_topics[tid]}")
    seen_topics[tid] = f
    check_lesson(f, d)

for name, key in (("resources", "resources"), ("goals", "goals"), ("goals", "bands")):
    d = json.load(open(f"learn/{name}.json"))
    for r in d[key]:
        if name == "resources" and not r["url"].startswith("https://"): err(f"learn/{name}.json", f"non-https url {r['url']}")
        if key == "goals" and r["target"] and r["target"] not in topics: err(f"learn/{name}.json", f"unknown target {r['target']}")

# the viewer (split build in out/viewer.html + out/wn/, and out/viewer-offline.html) must match a fresh build
if not errors:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([sys.executable, "ext/make_viewer.py"], check=True, stdout=subprocess.DEVNULL, env={**os.environ, "WHYNEXT_VIEWER_DIR": tmp})
        rel = lambda root: sorted(os.path.relpath(f, root) for f in glob.glob(f"{root}/viewer*.html") + glob.glob(f"{root}/wn/*.js"))
        if rel(tmp) != rel("out"):
            err("out/wn", "file list out of date; run python3 ext/make_viewer.py and commit")
        for f in rel(tmp):
            if not os.path.exists(f"out/{f}") or open(f"{tmp}/{f}", "rb").read() != open(f"out/{f}", "rb").read():
                err(f"out/{f}", "out of date; run python3 ext/make_viewer.py and commit"); break

if errors:
    print("\n".join("FAIL " + e for e in errors)); sys.exit(1)
ds = [json.load(open(f)) for f in files]
n = sum(len(d["practice"]) + len(d["mastery"]["pool"]) for d in ds)
g = sum(1 for d in ds for i in d["practice"] + d["mastery"]["pool"] if "params" in i)
print(f"lessons OK: {len(files)} lessons, {n} items ({g} parameterised), viewer bundle up to date")
