"""Generate the Why Next? viewer (new topics plus their upstream v1 ancestors).

out/viewer.html + out/wn/*.js: fast split build for the web (map first, detail chunks on demand).
out/viewer-offline.html: the same app in one file that works with no network.
"""
import glob
import hashlib
import html as _html
import json
import os
import re
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
LEARN_JS = ("learn_gen.js", "learn_core.js", "vis_core.js", "vis_number.js", "vis_algebra.js", "vis_calc.js", "vis_integ.js", "vis_chem.js", "vis_sci.js", "vis_num2.js", "vis_alg2.js", "vis_models.js", "vis_models2.js", "vis_world.js", "vis_lab1.js", "vis_lab2.js", "vis_lab3.js", "vis_lab4.js", "vis_lab5.js", "flag_kit.js", "flag_deriv.js", "flag_place.js", "flag_frac.js", "flag_neg.js", "flag_eq.js", "flag_line.js", "flag_pyth.js", "flag_prob.js", "flag_state.js", "flag_acid.js", "flag_atom.js", "flag_area.js", "flag_energy.js", "flag_circ.js", "flag_wave.js", "flag_nuc.js", "flag_shell.js", "flag_cov.js", "flag_unit.js", "flag_wread.js", "flag_sub.js", "flag_fact.js", "flag_exp.js", "flag_equiv.js", "flag_carbon.js", "flag_hydro.js", "flag_formula.js", "flag_alkane.js", "flag_homo.js", "flag_ptab.js", "flag_alkene.js", "flag_afrac.js", "flag_tangent.js", "flag_fgroup.js", "flag_noble.js", "flag_ion.js", "flag_chord.js", "flag_reveal.js", "flag_arc.js", "flag_rad.js", "flag_surd.js", "flag_grow.js", "flag_expg.js", "flag_name.js", "flag_alc.js", "flag_sim.js", "flag_trig.js", "flag_lmod.js", "flag_brw.js", "flag_exact.js", "flag_sqr.js", "flag_iso.js", "flag_hion.js", "flag_hal.js", "flag_cooh.js", "flag_gp1.js", "flag_print.js", "flag_feel.js", "flag_digit.js", "flag_help.js", "flag_grip.js", "flag_craft.js", "flag_pat.js", "flag_try.js", "flag_qw.js", "flag_mood.js", "flag_rule.js", "flag_trend.js", "flag_listen.js", "flag_check.js", "flag_wonder.js", "flag_skel.js", "flag_infer.js", "flag_ask.js", "flag_aloud.js", "flag_big.js", "flag_teach.js", "flag_sense.js", "flag_focus.js", "flag_mem.js", "flag_ai.js", "flag_exam.js", "flag_emo.js", "flag_fam.js", "flag_baby.js", "flag_evid.js", "flag_reg.js", "flag_plot.js", "flag_bounce.js", "flag_mentor.js", "flag_bard.js", "flag_wproc.js", "flag_cit.js", "flag_sigma.js", "flag_pyid.js", "flag_chlor.js", "flag_benz.js", "flag_orb.js", "flag_stress.js", "flag_ez.js", "flag_lens.js", "flag_well.js", "flag_pal.js", "learn_fx.js", "reels_ui.js", "learn_panel.js", "ux.js", "guide.js", "guide_copy.js", "guide_mood.js", "guide_live.js", "guide_dock.js")
learn_js = "".join(open(f"learn/{f}").read() for f in LEARN_JS)
# Flagship labs are big; the split build lazy-loads each one (plus the shared kit) the first time its lesson opens.
FLAGS = [f for f in LEARN_JS if f.startswith("flag_") and f != "flag_kit.js"]
flag_src = {f: open(f"learn/{f}").read() for f in ["flag_kit.js"] + FLAGS}
flag_type = {f: re.search(r"VIS\.reg\('([a-z0-9]+)'", flag_src[f]).group(1) for f in FLAGS}
VISB = [f for f in LEARN_JS if f.startswith("vis_") and f != "vis_core.js"]
vis_bundle = "".join(open(f"learn/{f}").read() for f in VISB)
learn_js_split = "".join(open(f"learn/{f}").read() for f in LEARN_JS if not f.startswith("flag_") and f not in VISB)
# reels: short vertical explainers (learn/reels/<topic>.mp4 + .vtt + .jpg) copied to out/reels, manifest inlined
import shutil as _sh
_rm = json.load(open("learn/reels/manifest.json")) if os.path.exists("learn/reels/manifest.json") else {}
# manifest: {topicId: [{"f": file stem, "t": title, "d": seconds, "n": order, "review"?: 1}, ...]}; any number of reels per topic
# "x": <k> = batch reel published by ext/reels_publish.py to orphan branch reels-part-<k> (parts.json pins its commit;
# served from jsDelivr, not stored on this branch). Files are checked in the local part clone when it exists.
_parts = json.load(open("learn/reels/parts.json")) if os.path.exists("learn/reels/parts.json") else {}
for _tid, _list in _rm.items():
    assert isinstance(_list, list) and _list, f"reels manifest: {_tid} needs a non-empty list"
    for _r in _list:
        if _r.get("x"):
            _p = _parts.get(str(_r["x"])); assert _p and _r["f"] in _p["files"] and _p.get("sha"), f"reel {_r['f']}: not published in part {_r['x']}"
            _d = f"/workspace/why-next-reels-parts/{_p['branch']}"
            if not os.path.isdir(_d): continue
        else: _d = "learn/reels"
        for _ext in (".mp4", ".vtt", ".jpg"):
            assert os.path.exists(f"{_d}/{_r['f']}{_ext}"), f"reels manifest: missing {_d}/{_r['f']}{_ext}"
        assert os.path.getsize(f"{_d}/{_r['f']}.mp4") < 2_000_000, f"reel {_r['f']}.mp4 must be under 2 MB"
os.makedirs("out/reels", exist_ok=True)
for _f in glob.glob("learn/reels/*"):
    if not _f.endswith(".json"): _sh.copy2(_f, "out/reels/" + os.path.basename(_f))
# Primary reel host: public Supabase Storage bucket "why-next-reels" (flat: <file>.mp4/.jpg/.vtt). jsDelivr parts stay as the fallback.
REEL_HOST = "https://etzqrmcwnxpbysnltdxt.supabase.co/storage/v1/object/public/why-next-reels/"
_reels = "window.WN_REELS=" + json.dumps(_rm, separators=(",", ":")) + ";window.WN_RHOST=" + json.dumps(REEL_HOST) + ";window.WN_RPARTS=" + json.dumps({k: f"https://cdn.jsdelivr.net/gh/pandeyaby/why-next@{v['sha']}/" for k, v in _parts.items()}, separators=(",", ":")) + ";\n"
learn_js = _reels + learn_js
css = "".join(open(f"learn/{f}").read() for f in ("learn.css", "vis.css", "fx.css", "theme.css", "touch.css", "guide.css", "ux.css"))

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
BODY = ("mastery", "practice", "explain", "familyTip", "keyIdea", "worked", "visual", "lab")  # loaded with the lesson body, not at startup
stubs, bodies = {}, [{} for _ in dom_keys]
for tid, les in lessons.items():
    st_ = {k: v for k, v in les.items() if k not in BODY}
    st_.update(_lz=1, np=len(les.get("practice", [])), md=(les.get("mastery") or {}).get("draw", 1))
    stubs[tid] = st_
    bodies[K[(by[tid]["subject"], by[tid]["domain"])]][tid] = {k: les[k] for k in BODY if k in les}
lb_js = [f"WN.lb({k},{J(c)});\n" if c else "" for k, c in enumerate(bodies)]
core["bv"] = [H(c) if c else 0 for c in lb_js]
learn_split = json.dumps({"lessons": stubs, "goals": json.load(open("learn/goals.json")), "resources": res["resources"], "resourcesVerified": res["verifiedOn"]}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
files = {"core.js": "window.WN_CORE=" + J(core) + ";\n" + open("ext/viewer_core.js").read(),
         "learn.js": "const LEARN_DATA=" + learn_split + ";\nwindow.WN_REELS_LAZY=" + J({"u": "reels.js?v=" + H(_reels), "ids": sorted(_rm)}) + ";\n" + "window.WN_LAZY=" + J({"vis": "vis.js?v=" + H(vis_bundle), "kit": "fl_kit.js?v=" + H(flag_src["flag_kit.js"]), **{flag_type[f]: f"fl_{f[5:-3]}.js?v=" + H(flag_src[f]) for f in FLAGS}}) + ";\n" + learn_js_split,
         "app.js": open("ext/viewer_app.js").read()}
nNew = sum(n["new"] for n in nodes)
nB = sum(1 for e in edges if by[e["t"]]["id"] in newset and e["p"] not in newset)
nNE = sum(1 for e in edges if e["t"] in newset)
shell = (open("ext/viewer_template.html").read().replace("/*__CREDIT__*/", credit).replace("/*__LEARN_CSS__*/", css)
         .replace('<span id="cnt"></span>', f'<span id="cnt">{nNew} topics.</span>')
         .replace('<p class="muted" id="stats"></p>', f'<p class="muted" id="stats">{nNew} Why Next? topics · {nNE} Why Next? edges ({nB} bridge edges into upstream v1) · {len(nodes) - nNew} upstream v1 ancestor topics shown for context.</p>'))
outdir = os.environ.get("WHYNEXT_VIEWER_DIR", "out")
os.makedirs(f"{outdir}/wn", exist_ok=True)
# Write every bundle first and delete only the bundles that are no longer produced. The old code deleted all of
# out/wn/*.js before rewriting, so any interrupted or concurrent build left the committed files missing.
_wn_files = dict(files, **{"vis.js": vis_bundle, "reels.js": _reels})
for name, text in _wn_files.items():
    open(f"{outdir}/wn/{name}", "w").write(text)
for f in glob.glob(f"{outdir}/wn/*.js"):
    if os.path.basename(f) not in _wn_files:
        os.remove(f)
for f, text in flag_src.items():
    open(f"{outdir}/wn/fl_{f[5:-3]}.js", "w").write(text)
for k, text in enumerate(chunk_js):
    open(f"{outdir}/wn/d{k}.js", "w").write(text)
for k, text in enumerate(lb_js):
    if text: open(f"{outdir}/wn/b{k}.js", "w").write(text)
for k, text in enumerate(les_js):
    if text: open(f"{outdir}/wn/l{k}.js", "w").write(text)
tags = "".join(f'<script defer src="wn/{n}?v={H(files[n])}"></script>' for n in ("core.js", "learn.js", "app.js"))
open(f"{outdir}/viewer.html", "w").write(shell.replace("/*__SCRIPTS__*/", tags))
# Offline build: batch reels ("x", served from the CDN) are left out so the file needs no network.
_reels_off = "window.WN_REELS=" + json.dumps({t: L for t, L in ((t, [r for r in L if not r.get('x')]) for t, L in _rm.items()) if L}, separators=(",", ":")) + ";\n"
# Offline build: the same scripts inlined into one file that works with no network.
inline = "".join(f"<script>{t}</script>" for t in ["window.WN_OFFLINE=1;" + files["core.js"], "".join(chunk_js), "".join(les_js), "const LEARN_DATA=" + learn + ";\n" + _reels_off + learn_js[len(_reels):], files["app.js"]])
open(f"{outdir}/viewer-offline.html", "w").write(shell.replace("/*__SCRIPTS__*/", inline))
print("viewer:", len(nodes), "nodes (", len(newset), "new )", len(edges), "edges,", len(clusters), "cluster summaries,", len(lessons), "lessons +", len(starters), "starter lessons,", len(chunks), "detail chunks")
