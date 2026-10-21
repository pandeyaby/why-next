"""Generate the Why Next? viewer (new topics plus their upstream v1 ancestors).

out/viewer.html + out/wn/*.js: fast split build for the web (map first, detail chunks on demand).
out/viewer-offline.html: the same app in one file that works with no network.
"""
import glob
import hashlib
import html as _html
import json
import os
T = json.load(open("out/merged/data/topics.json"))["topics"]
by = {t["id"]: t for t in T}
new = [t["id"] for t in json.load(open("out/topics.ext.json"))["topics"]]
newset = set(new)
D = json.load(open("out/merged/data/dependencies.json"))["dependencies"]
pre = {}
for e in D:
    pre.setdefault(e["topicId"], []).append(e)
# include all ancestors of new topics (so chains run back to primary)
keep, stack = set(new), list(new)
while stack:
    u = stack.pop()
    for e in pre.get(u, []):
        if e["prerequisiteId"] not in keep:
            keep.add(e["prerequisiteId"]); stack.append(e["prerequisiteId"])
nodes = [{"id": i, "n": by[i]["name"], "d": by[i]["domain"], "s": by[i]["subject"], "ty": by[i]["type"],
          "a": [by[i]["ageRangeStart"], by[i]["ageRangeEnd"]], "desc": by[i]["description"],
          "ev": by[i].get("evidence", []), "st": by[i].get("standards", []), "c": round(by[i]["centrality"], 3), "new": i in newset}
         for i in sorted(keep, key=lambda i: (by[i]["subject"], by[i]["domain"], by[i]["ageRangeStart"], by[i]["name"], i))]
edges = [{"t": e["topicId"], "p": e["prerequisiteId"], "h": e["strength"] == "hard", "r": e["reason"]}
         for e in D if e["topicId"] in keep and e["prerequisiteId"] in keep]
C = json.load(open("out/merged/data/clusters.json"))["clusters"]
clusters = {f"{c['subject']}|{c['domain']}|{c['ageRangeStart']}": c["summary"] for c in C}
credit = _html.escape(open("ext/CREDIT.txt", encoding="utf-8").read().strip())
# Learn: lessons, goals and verified resources from learn/, bundled so the viewer stays a single offline file
lessons = {}
for f in sorted(glob.glob("learn/lessons/*.json")):
    les = json.load(open(f, encoding="utf-8"))
    assert les["topicId"] in by, f
    lessons[les["topicId"]] = les
# Starter lessons (learn/autogen/starter.py) for every topic without a hand-written lesson; loaded per domain on demand
starters = {}
for f in sorted(glob.glob("learn/auto/*.json")):
    if os.path.basename(f).startswith("_"): continue
    for tid, les in json.load(open(f, encoding="utf-8")).items():
        if tid in keep and tid not in lessons: starters[tid] = les
missing = sorted(set(lessons) - keep)
assert not missing, f"lesson topics not in the viewer: {missing}"
res = json.load(open("learn/resources.json"))
learn = json.dumps({"lessons": lessons, "goals": json.load(open("learn/goals.json")), "resources": res["resources"],
                    "resourcesVerified": res["verifiedOn"]}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
LEARN_JS = ("learn_gen.js", "learn_core.js", "vis_core.js", "vis_number.js", "vis_algebra.js", "vis_calc.js", "vis_integ.js", "vis_chem.js", "vis_sci.js", "vis_num2.js", "vis_alg2.js", "vis_models.js", "vis_models2.js", "vis_world.js", "vis_lab1.js", "vis_lab2.js", "vis_lab3.js", "vis_lab4.js", "vis_lab5.js", "flag_kit.js", "flag_deriv.js", "flag_place.js", "flag_frac.js", "flag_neg.js", "flag_eq.js", "flag_line.js", "flag_pyth.js", "flag_prob.js", "flag_state.js", "learn_fx.js", "learn_panel.js")
learn_js = "".join(open(f"learn/{f}").read() for f in LEARN_JS)
# reels: short vertical explainers (learn/reels/<topic>.mp4 + .vtt + .jpg) copied to out/reels, manifest inlined
import shutil as _sh
_rm = json.load(open("learn/reels/index.json")) if os.path.exists("learn/reels/index.json") else {}
os.makedirs("out/reels", exist_ok=True)
for _f in glob.glob("learn/reels/*"):
    if not _f.endswith(".json"): _sh.copy2(_f, "out/reels/" + os.path.basename(_f))
learn_js = "window.WN_REELS=" + json.dumps(_rm, separators=(",", ":")) + ";\n" + learn_js
css = "".join(open(f"learn/{f}").read() for f in ("learn.css", "vis.css", "fx.css", "theme.css", "touch.css"))

# Split build: the page shell plus small cacheable scripts; per-domain detail chunks load on demand.
J = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
dom_keys = sorted({(n["s"], n["d"]) for n in nodes})
K = {sd: i for i, sd in enumerate(dom_keys)}
idx = {n["id"]: i for i, n in enumerate(nodes)}
sb, dm, ty = sorted({n["s"] for n in nodes}), sorted({n["d"] for n in nodes}), sorted({n["ty"] for n in nodes})
chunks = [{"n": [], "r": [], "c": {}} for _ in dom_keys]
for i, n in enumerate(nodes):
    chunks[K[(n["s"], n["d"])]]["n"].append([i, n["desc"], n["ev"], n["st"]])
for j, e in enumerate(edges):
    t = by[e["t"]]
    chunks[K[(t["subject"], t["domain"])]]["r"].append([j, e["r"]])
for key, summ in clusters.items():
    s_, d_, _ = key.split("|")
    if (s_, d_) in K:
        chunks[K[(s_, d_)]]["c"][key] = summ
chunk_js = [f"WN.chunk({k},{J(c)});\n" for k, c in enumerate(chunks)]
lchunks = [{} for _ in dom_keys]
for tid, les in starters.items():
    lchunks[K[(by[tid]["subject"], by[tid]["domain"])]][tid] = les
les_js = [f"WN.les({k},{J(c)});\n" if c else "" for k, c in enumerate(lchunks)]
H = lambda t: hashlib.sha1(t.encode()).hexdigest()[:10]
core = {"sb": sb, "dm": dm, "ty": ty, "v": [H(c) for c in chunk_js], "lv": [H(c) if c else 0 for c in les_js],
        "n": [[n["id"], n["n"], dm.index(n["d"]), sb.index(n["s"]), ty.index(n["ty"]), n["a"][0], n["a"][1], n["c"], int(n["new"]), K[(n["s"], n["d"])], 1 if n["id"] in lessons else 2 if n["id"] in starters else 0] for n in nodes],
        "e": [[idx[e["t"]], idx[e["p"]], int(e["h"])] for e in edges]}
files = {"core.js": "window.WN_CORE=" + J(core) + ";\n" + open("ext/viewer_core.js").read(),
         "learn.js": "const LEARN_DATA=" + learn + ";\n" + learn_js,
         "app.js": open("ext/viewer_app.js").read()}
nNew = sum(n["new"] for n in nodes)
nB = sum(1 for e in edges if by[e["t"]]["id"] in newset and e["p"] not in newset)
nNE = sum(1 for e in edges if e["t"] in newset)
shell = (open("ext/viewer_template.html").read().replace("/*__CREDIT__*/", credit).replace("/*__LEARN_CSS__*/", css)
         .replace('<span id="cnt"></span>', f'<span id="cnt">{nNew} topics.</span>')
         .replace('<p class="muted" id="stats"></p>', f'<p class="muted" id="stats">{nNew} Why Next? topics · {nNE} Why Next? edges ({nB} bridge edges into upstream v1) · {len(nodes) - nNew} upstream v1 ancestor topics shown for context.</p>'))
outdir = os.environ.get("WHYNEXT_VIEWER_DIR", "out")
os.makedirs(f"{outdir}/wn", exist_ok=True)
for f in glob.glob(f"{outdir}/wn/*.js"):
    os.remove(f)
for name, text in files.items():
    open(f"{outdir}/wn/{name}", "w").write(text)
for k, text in enumerate(chunk_js):
    open(f"{outdir}/wn/d{k}.js", "w").write(text)
for k, text in enumerate(les_js):
    if text: open(f"{outdir}/wn/l{k}.js", "w").write(text)
tags = "".join(f'<script defer src="wn/{n}?v={H(files[n])}"></script>' for n in ("core.js", "learn.js", "app.js"))
open(f"{outdir}/viewer.html", "w").write(shell.replace("/*__SCRIPTS__*/", tags))
# Offline build: the same scripts inlined into one file that works with no network.
inline = "".join(f"<script>{t}</script>" for t in [files["core.js"], "".join(chunk_js), "".join(les_js), files["learn.js"], files["app.js"]])
open(f"{outdir}/viewer-offline.html", "w").write(shell.replace("/*__SCRIPTS__*/", inline))
print("viewer:", len(nodes), "nodes (", len(newset), "new )", len(edges), "edges,", len(clusters), "cluster summaries,", len(lessons), "lessons +", len(starters), "starter lessons,", len(chunks), "detail chunks")
