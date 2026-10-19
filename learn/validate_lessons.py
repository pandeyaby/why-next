"""Validate learn/ lesson data: JSON schema plus content checks, and that out/viewer.html bundles the current lessons.

Run from the repo root: python3 learn/validate_lessons.py
"""
import glob, json, math, os, subprocess, sys, tempfile
import jsonschema

errors = []
def err(f, msg): errors.append(f"{f}: {msg}")

schema = json.load(open("learn/lesson.schema.json"))
topics = {t["id"]: t for t in json.load(open("out/merged/data/topics.json"))["topics"]}
deps = json.load(open("out/merged/data/dependencies.json"))["dependencies"]
files = sorted(glob.glob("learn/lessons/*.json"))
if not files: err("learn/lessons", "no lesson files")
seen_topics = {}
for f in files:
    try: d = json.load(open(f, encoding="utf-8"))
    except json.JSONDecodeError as e: err(f, f"invalid JSON: {e}"); continue
    try: jsonschema.validate(d, schema)
    except jsonschema.ValidationError as e: err(f, f"schema: {e.message[:200]} at {list(e.absolute_path)}"); continue
    tid = d["topicId"]
    if tid not in topics: err(f, f"topicId {tid} is not in the merged dataset")
    if tid in seen_topics: err(f, f"topicId {tid} already has a lesson in {seen_topics[tid]}")
    seen_topics[tid] = f
    items = d["practice"] + d["mastery"]["items"]
    ids = [i["id"] for i in items]
    if len(ids) != len(set(ids)): err(f, "duplicate item ids")
    if any(not i["id"].startswith("p") for i in d["practice"]) or any(not i["id"].startswith("m") for i in d["mastery"]["items"]):
        err(f, "practice ids must start with p and mastery ids with m")
    if d["mastery"]["passMark"] > len(d["mastery"]["items"]): err(f, "passMark exceeds number of mastery items")
    prompts = [i["prompt"] for i in items]
    if len(prompts) != len(set(prompts)): err(f, "duplicate prompts")
    for i in items:
        where = f"item {i['id']}"
        if i["type"] == "mc" and not 0 <= i["answer"] < len(i["choices"]): err(f, f"{where}: answer index out of range")
        if i["type"] == "numeric" and not math.isfinite(i["answer"]): err(f, f"{where}: answer not finite")
        if i["hint"].strip() == i["explain"].strip(): err(f, f"{where}: hint repeats the explanation")
    if os.path.basename(f) != os.path.basename(f).lower(): err(f, "file names must be lower case")

for name, key in (("resources", "resources"), ("goals", "goals")):
    d = json.load(open(f"learn/{name}.json"))
    for r in d[key]:
        if name == "resources" and not r["url"].startswith("https://"): err(f"learn/{name}.json", f"non-https url {r['url']}")
        if name == "goals" and r["target"] and r["target"] not in topics: err(f"learn/{name}.json", f"unknown target {r['target']}")

# the single-file viewer must bundle exactly the current lessons
if not errors:
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "viewer.html")
        subprocess.run([sys.executable, "ext/make_viewer.py"], check=True, stdout=subprocess.DEVNULL, env={**os.environ, "WHYNEXT_VIEWER_OUT": out})
        if open(out, "rb").read() != open("out/viewer.html", "rb").read():
            err("out/viewer.html", "out of date; run python3 ext/make_viewer.py and commit")

if errors:
    print("\n".join("FAIL " + e for e in errors)); sys.exit(1)
n = sum(len(json.load(open(f))["practice"]) + len(json.load(open(f))["mastery"]["items"]) for f in files)
print(f"lessons OK: {len(files)} lessons, {n} items, viewer bundle up to date")
