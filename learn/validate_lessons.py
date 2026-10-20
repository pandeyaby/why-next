"""Validate learn/ lesson data: JSON schema plus content checks, and that out/viewer.html bundles the current lessons.

Run from the repo root: python3 learn/validate_lessons.py
"""
import glob, itertools, json, math, os, re, subprocess, sys, tempfile
import jsonschema
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from readability import fk_grade, TARGETS
from validate_visuals import check as check_visual

errors = []
SAFE = re.compile(r"^[a-z0-9+\-*/%(). <>=!&|]+$")
def ev(expr, env):
    """Python mirror of LEARN_GEN.ev in learn/learn_gen.js (same whitelist)."""
    if not SAFE.match(expr): raise ValueError(f"unsafe expression {expr!r}")
    py = re.sub(r"!(?!=)", " not ", expr.replace("&&", " and ").replace("||", " or "))
    return eval(py, {"__builtins__": {}}, dict(env))
def fmt(x):
    r = round(x * 100) / 100
    return ("−" if r < 0 else "") + (str(int(abs(r))) if abs(r) == int(abs(r)) else str(abs(r)))
def fill(s, env):
    s = re.sub(r"\{=([^}]+)\}", lambda m: fmt(ev(m.group(1), env)), s)
    return re.sub(r"\{([a-z])\}", lambda m: fmt(env[m.group(1)]) if m.group(1) in env else m.group(0), s)
def check_generated(f, where, it):
    """Enumerate every parameter combination and check each instance is a sound question."""
    if it["type"] == "order": err(f, f"{where}: order items cannot be parameterised"); return
    if not re.search(r"\{(=|[a-z]\})", it["prompt"]): err(f, f"{where}: parameterised prompt has no placeholder")
    keys = sorted(it["params"]); ranges = [range(it["params"][k][0], it["params"][k][1] + 1) for k in keys]
    if math.prod(len(r) for r in ranges) > 20000: err(f, f"{where}: parameter space too large"); return
    good = 0
    for combo in itertools.product(*ranges):
        env = dict(zip(keys, combo))
        try:
            if it.get("where") and not ev(it["where"], env): continue
            texts = [fill(it[k], env) for k in ("prompt", "hint", "explain")]
            if it["type"] == "numeric":
                a = ev(str(it["answer"]), env)
                if not math.isfinite(a) or abs(a - round(a, 2)) > 1e-9: err(f, f"{where}: answer {a} for {env} is not exact to 2 dp"); return
                if not re.search(r"(?<![0-9.])" + re.escape(fmt(a)) + r"(?![0-9])", texts[2]): err(f, f"{where}: explanation for {env} never states the answer {fmt(a)}"); return
            else:
                ch = [fill(c, env) for c in it["choices"]]; texts += ch
                if len(set(ch)) != len(ch): err(f, f"{where}: duplicate choices for {env}: {ch}"); return
            if any("{" in t for t in texts): err(f, f"{where}: unfilled placeholder for {env}"); return
        except ZeroDivisionError: err(f, f"{where}: division by zero for {env}"); return
        good += 1
    if good < 4: err(f, f"{where}: only {good} valid parameter combinations (need 4+ so retries differ)")
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
    pool = d["mastery"]["pool"]
    items = d["practice"] + pool
    ids = [i["id"] for i in items]
    if len(ids) != len(set(ids)): err(f, "duplicate item ids")
    if any(not i["id"].startswith("p") for i in d["practice"]) or any(not i["id"].startswith("m") for i in pool):
        err(f, "practice ids must start with p and mastery ids with m")
    if not d["mastery"]["passMark"] <= d["mastery"]["draw"] <= len(pool) - 3: err(f, "need passMark <= draw <= pool size - 3")
    if sum(1 for i in pool if "params" in i) < 2: err(f, "mastery pool needs at least 2 parameterised items")
    for problem in check_visual(d["visual"]): err(f, "visual " + problem)
    if sum(1 for i in d["practice"] if "params" in i) < 2: err(f, "practice needs at least 2 parameterised items so retries differ")
    for lv in ("kid", "adult"):
        g = fk_grade(" ".join(d["explain"][lv])); t = TARGETS[(d["audience"], lv)]
        if g > t + 0.5: err(f, f"{lv} explanation reads at FK grade {g:.1f}, target <= {t}")
    prompts = [i["prompt"] for i in items]
    if len(prompts) != len(set(prompts)): err(f, "duplicate prompts")
    for i in items:
        where = f"item {i['id']}"
        if i["type"] == "mc" and not 0 <= i["answer"] < len(i["choices"]): err(f, f"{where}: answer index out of range")
        if "params" in i: check_generated(f, where, i); continue
        if i["type"] == "numeric" and not isinstance(i["answer"], (int, float)): err(f, f"{where}: expression answer needs params")
        elif i["type"] == "numeric" and not math.isfinite(i["answer"]): err(f, f"{where}: answer not finite")
        elif i["type"] == "numeric" and not re.search(r"(?<![0-9.])" + re.escape(fmt(i["answer"])) + r"(?![0-9])", i["explain"]): err(f, f"{where}: explanation never states the answer")
        if i["hint"].strip() == i["explain"].strip(): err(f, f"{where}: hint repeats the explanation")
    if os.path.basename(f) != os.path.basename(f).lower(): err(f, "file names must be lower case")

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
