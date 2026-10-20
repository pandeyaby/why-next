"""Starter-lesson pipeline: gives every topic in the map a real lesson.

For each topic without a hand-written lesson it picks the best-fitting archetype (a lab plus explanations, a worked
example and question templates; see arch_*.py), adds questions built from the topic's own data (its description,
prerequisites, the reasons on its links, and what it unlocks), validates the result with the same schema and content
checks as hand-written lessons, scores it with a quality rubric, and rejects / regenerates weak ones.

Usage (repo root): python3 learn/autogen/starter.py [--limit N] [--report]
Writes learn/auto/<subject-domain>.json (topicId -> lesson) in priority order (map traffic: foundations and goal-path gaps first)."""
import glob, json, os, re, sys, random, collections
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path[:0] = [HERE, os.path.dirname(HERE)]
from arch_math import MATH; from arch_math2 import MATH2; from arch_math3 import MATH3; from arch_math4 import MATH4; from arch_math5 import MATH5
from arch_sci import SCI; from arch_sci2 import SCI2; from arch_other import OTHER
from items import mc
from arch_eng2 import ENG2
from arch_sci3 import SCI3
from arch_sci4 import LIFE
from arch_sci5 import MORE
from arch_sci6 import INQ
import lesson_checks as LC
from readability import fk_grade, TARGETS
MIN_QUALITY = 65   # = 25th percentile of the hand-written lessons under the same scorer (quality.py)
from tune import tune
import quality as QS
from relevance import Rel
REL = [None]; NONMATH = [False]
BASE = lambda n: re.sub(r"\s*\((age )?\d+\+?\)$", "", n).strip().lower()   # "Fair testing (age 8+)" is the same topic as "Fair testing" at another age
ARCH = {"Mathematics": MATH[:2] + MATH2[:1] + MATH[2:] + MATH2[1:] + MATH3 + MATH4 + MATH5, "Science": SCI3 + LIFE + MORE + INQ + SCI + SCI2 + OTHER[:5]}
from arch_eng import ENG
from arch_applied import APPLIED
from arch_worked import pick as WB
OTHERS = ENG2 + ENG + [a for a in OTHER[5:] if a["name"] != "english"]   # the strand archetypes replace the old one-size English archetype

def load():
    T = json.load(open("out/merged/data/topics.json"))["topics"]; by = {t["id"]: t for t in T}
    new = {t["id"] for t in json.load(open("out/topics.ext.json"))["topics"]}
    D = json.load(open("out/merged/data/dependencies.json"))["dependencies"]; pre = collections.defaultdict(list); post = collections.defaultdict(list)
    for e in D: pre[e["topicId"]].append(e); post[e["prerequisiteId"]].append(e)
    keep, st = set(new), list(new)
    while st:
        u = st.pop()
        for e in pre[u]:
            if e["prerequisiteId"] not in keep: keep.add(e["prerequisiteId"]); st.append(e["prerequisiteId"])
    pre = {k: [e for e in v if e["prerequisiteId"] in keep] for k, v in pre.items()}; post = {k: [e for e in v if e["topicId"] in keep] for k, v in post.items()}
    return by, keep, pre, post

def descendants(u, post, memo):
    if u in memo: return memo[u]
    memo[u] = set(); s = set()
    for e in post.get(u, []): s.add(e["topicId"]); s |= descendants(e["topicId"], post, memo)
    memo[u] = s; return s

GAPS = re.compile(r"linear graph|plotting|coordinat|negative|sign rule|double bracket|expand|area of (triangle|parallelogram)|written (multiplication|division)|long (multiplication|division)|remainder|multiply|divid", re.I)
for _a in [x for v in ARCH.values() for x in v] + OTHERS:
    _a["m"] = _a["m"] + APPLIED.get(_a["name"], [])

def priority(t, nd):
    """Lower sorts first: goal-path gaps, then foundations (young ages), then by how many topics depend on it."""
    tier = 0 if GAPS.search(t["name"]) and t["ageRangeStart"] <= 15 else 1 if t["ageRangeStart"] <= 10 else 2
    return (tier, -nd, t["ageRangeStart"], t["name"])

def candidates(t):
    pool = ARCH.get(t["subject"], OTHERS) if t["subject"] in ARCH else OTHERS
    text = t["name"] + " " + t["description"]; out = []
    for a in pool:
        if a["dom"] and not re.search(a["dom"], t["domain"], re.I): continue
        if a["kw"] and not re.search(a["kw"], text, re.I): continue
        out.append(a)
    out.sort(key=lambda a: 0 if a["kw"] and re.search(a["kw"], t["name"], re.I) else 1 if a["kw"] else 2)   # archetypes named by the title first
    if not out: out = [a for a in OTHERS if re.search(a["dom"], t["domain"], re.I)] or [OTHERS[-1]] if t["subject"] not in ARCH else [pool[-1]]
    return out

from starter_items import *
from starter_items import clause, objective, key_term, mcu, closure, topic_items, form
VERBS = r"^(explain|describe|use|identify|compare|solve|find|calculate|recognise|recognize|know|understand|apply|interpret|plot|draw|read|write|count|measure|predict|investigate|classify|sort|name|give|show|work|add|subtract|multiply|divide|estimate|round|order|convert|choose|build|create|evaluate)\b"
def explain(a, t, aud, tu, link, rng, minimal=False):
    """Topic-first explanation: what this topic asks, one archetype idea (rotated so siblings differ), this topic's own example, and its link."""
    obj = objective(t["description"]); tgt = TARGETS[(aud, "adult")]; kt = TARGETS[(aud, "kid")]
    w0 = obj.split()[0] if obj.split() else ""
    first = f"This topic is about {obj}." if re.match(r"^(the|a|an|how|why|what|when|where|which|who|that|this|these|each|every|all|some|many|different|key|basic|simple|common|types?|ways?)$|.*(ing|s|tion|ment|ness|ity|al)$", w0) and not re.match(VERBS, obj) else f"This topic asks you to {obj}."
    base = list(a["adult"]); rng.shuffle(base)
    if minimal: base = base[:1]
    opts = [first] + base[:1] + ([tu["say"]] if tu.get("say") else []) + ([link] if link else []) + base[1:]
    adult = []
    for x in opts:
        if len(adult) >= 4: break
        if fk_grade(" ".join(adult + [x])) <= tgt + 0.5 or not adult and False: adult.append(x)
    if len(adult) < 2: adult = list(a["adult"])
    kid = list(a["kid"])
    if tu.get("say") and fk_grade(" ".join(kid + [tu["say"]])) <= kt + 0.5: kid.append(tu["say"])
    return {"kid": kid, "adult": adult}, first in adult
def worked_for(a, t, tu, prereq, later, seed=0, skip=0, strong=True):
    if tu.get("worked"): w = tu["worked"]; return (w[0], list(w[1]))
    b = WB(a["name"], t, seed, skip) if skip < 3 else None
    if b: return (b[0], list(b[1]))
    ss = [x for x in re.split(r"(?<=\.)\s+", t["description"]) if len(x.split()) >= 5]
    steps = ([f"Start from what you know: {prereq}."] if prereq else []) + [f"The new idea: {clause(t['description'], 18)}."] + ([f"In more detail: {clause(ss[1], 18)}."] if len(ss) > 1 else []) + ([f"Next, this helps with: {later}."] if later else [])
    return (t["name"], steps)   # no borrowed archetype example: tuned or bank examples only
def build(t, a, by, pre, post, sib, seed, minimal=False):
    rng = random.Random(seed); aud = "family" if t["ageRangeStart"] <= 7 else "learner"
    tu = tune(a, t, random.Random(seed * 7 + 1))
    first = re.split(r"(?<=\.)\s", t["description"])[0]
    strong = bool(a["kw"] and re.search(a["kw"], t["name"], re.I)) or (t["subject"] == "Mathematics" and (t["ageRangeStart"] < 14 and (not a["kw"] or bool(re.search(a["kw"], first, re.I))) or a["name"].split("-")[0].rstrip("s") in t["name"].lower())) or (a["name"] in ("waves", "forces", "energy") and bool(re.search(r"reflect|mirror|ray|pitch|loud|sound|hear|vibrat|weight|gravity|speed|distance|velocity|resultant|friction|momentum|spring|pressure|orbit|projectile|circular|slope|normal|specific heat|cooling|system|insulat", t["name"], re.I)))
    if strong and t["subject"] != "Mathematics" and t["ageRangeStart"] >= 15 and not (tu.get("worked") or WB(a["name"], t, seed)): strong = False   # basic science drills don't fit advanced topics
    LOOSE = t["subject"] != "Mathematics" or not strong   # loose fit: on-topic items only, no borrowed drills
    if not strong or minimal >= 2: tu = {"vis": tu.get("vis", {})}   # numbers and applied questions only when the archetype clearly fits this topic
    pr = [by[e["prerequisiteId"]]["name"] for e in pre.get(t["id"], [])][:1]; lt = [by[e["topicId"]]["name"] for e in post.get(t["id"], [])][:1]
    link = (f"It builds on {pr[0]}" + (f" and leads to {lt[0]}." if lt else ".")) if pr else (f"It leads to {lt[0]}." if lt else "")
    ex, specific = explain(a, t, aud, tu, link, rng, minimal); ti = topic_items(t, by, pre, post, sib, rng)
    app = tu.get("applied", [])
    if REL[0] and LOOSE:   # drop borrowed questions that don't use this topic's vocabulary
        a = dict(a, p=[x for x in a["p"] if not REL[0].check({"worked": {"title": "", "steps": []}}, t, [x])], m=[x for x in a["m"] if not REL[0].check({"worked": {"title": "", "steps": []}}, t, [x])])
    if not strong and t["subject"] != "Mathematics": a = dict(a, p=[], m=[])   # loose fit outside maths: no borrowed archetype items at all
    elif not strong: a = dict(a, p=[x for x in a["p"] if "params" not in x], m=[x for x in a["m"] if "params" not in x])   # no borrowed number drills when the archetype is only a loose fit
    prac = [dict(x) for x in a["p"]] + app[:1] + [x for k, x in ti if k == "p"]
    pool = [dict(x) for x in a["m"]] + app[1:] + [x for k, x in ti if k == "m"]
    while len(prac) < 3 and pool: prac.append(pool.pop(0))
    if REL[0] and LOOSE and len(pool) < 7:   # top up with on-topic items (they pass the vocabulary check) from sibling archetypes
        have = {x["prompt"] for x in prac + pool}
        bs = ARCH.get(t["subject"], OTHERS) if t["subject"] in ARCH else OTHERS
        for b in [b for b in bs if not b["dom"] or re.search(b["dom"], t["domain"], re.I)] + [b for b in bs if b["dom"] and not re.search(b["dom"], t["domain"], re.I)]:   # this topic's own domain first
            if b["dom"] and not re.search(b["dom"], t["domain"], re.I) and len(pool) >= 5: break
            for x in b["p"] + b["m"]:
                if len(pool) >= 7: break
                if x["prompt"] not in have and "params" not in x and not REL[0].check({"worked": {"title": "", "steps": []}}, t, [x]) and REL[0].ok(x["prompt"], t)[1]:
                    pool.append(dict(x)); have.add(x["prompt"]); a = dict(a, m=a["m"] + [x])
    extra = [x for x in a["p"]] + [x for k, x in ti if k == "p"]
    while len(pool) < 7 and extra:
        v = dict(extra.pop(0)); v["prompt"] = "Quick check: " + v["prompt"]; pool.append(v)
    for x in prac[:6 - len(pool)] if len(pool) < 6 else []:
        v = dict(x); v["prompt"] = "Recap: " + v["prompt"]; pool.append(v)
    txt = " ".join([clause(t["description"], 24)] + ex["adult"] + ex["kid"]).lower()
    give = lambda it: it["type"] == "mc" and len(it["choices"][it["answer"]].split()) >= 5 and it["choices"][it["answer"]].lower().rstrip(".…") in txt
    keep_ = [x for x in pool if not give(x)]
    if len(keep_) >= 7: pool = keep_                                   # drop questions whose answer is copied from the explanation
    for x in pool[:max(0, 3 - len(prac))]:
        v = dict(x); v["prompt"] = "Try this: " + v["prompt"]; prac.append(v)
    prac = prac[:5]
    for i, it in enumerate(prac): it["id"] = f"p{i+1}"
    for i, it in enumerate(pool): it["id"] = f"m{i+1}"
    w = worked_for(a, t, tu, pr[0] if pr else None, lt[0] if lt else None, seed, minimal if minimal == 3 else 1 if minimal else 0, strong)
    if REL[0] and LOOSE and not tu.get("worked") and not WB(a["name"], t, seed):
        w = (w[0] if not REL[0].check({"worked": {"title": w[0], "steps": []}}, t, []) else t["name"], [x for x in w[1] if not REL[0].check({"worked": {"title": "", "steps": [x]}}, t, [])])
    if len(w[1]) < 2: w = (t["name"], ([f"Start from what you know: {pr[0]}."] if pr else []) + [f"The new idea: {clause(t['description'], 18)}."] + ([f"Next, this helps with: {lt[0]}."] if lt else [f"Check: explain {t['name'].lower()} in your own words."]))
    if minimal and not (tu.get("worked") or (minimal < 3 and WB(a["name"], t, seed))): w = (t["name"], [x for x in w[1] if a["worked"][1][0] != x] or w[1])
    vis = json.loads(json.dumps(a["vis"])); vis["opts"].update(tu.get("vis", {}))
    les = {"topicId": t["id"], "title": t["name"], "audience": aud, "keyIdea": clause(t["description"], 24) + ".",
           "explain": ex, "worked": {"title": w[0], "steps": w[1]},
           "familyTip": ("Try the lab together, then ask: what changed, and why?" if aud == "family" else "Explain the key idea to someone else in two sentences, then try a challenge in the lab."),
           "practice": prac, "mastery": {"passMark": min(3, max(2, len(pool) - 4)), "draw": min(4, max(3, len(pool) - 3)), "pool": pool}, "status": "auto-starter", "visual": vis}
    ids = {id(x) for x in prac + pool}
    arch = [x for x in prac + pool if x["prompt"].split(": ", 1)[-1] in {y["prompt"] for y in a["p"] + a["m"]}]
    return les, dict(specific=specific, n_topic=len(ti), arch_items=arch, loose=LOOSE, tuned=bool(tu.get("worked")) or bool(WB(a["name"], t, seed)))

def rubric(les, a, meta, errs, maxsim=0.0):
    return 0 if errs else QS.score(les, les["title"], maxsim)[0]
LAB_TYPES = {"problab", "statlab", "numzoom", "graphlab", "geolab", "matrixlab", "gaslab", "reactlab", "wavelab", "forcelab", "ecolab", "balance", "plot", "area", "particles", "coords", "fracbar", "longdiv", "longmul", "array", "tenframe", "counters", "matlab", "separate", "circuit", "atom", "energy", "tiles", "expo", "vectors", "thermo", "percent", "placevalue", "squares"}

def check(les, a):
    LC.errors.clear(); LC.check_lesson("auto-starter", les)
    errs = list(LC.errors)
    if a["numeric"] is False or NONMATH[0]: errs = [e for e in errs if "parameterised" not in e]
    return errs

def main():
    lim = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else 10 ** 9
    by, keep, pre, post = load(); memo = {}; REL[0] = Rel([by[i] for i in keep])
    hand = {json.load(open(f))["topicId"] for f in glob.glob("learn/lessons/*.json")}
    todo = sorted((by[i] for i in keep if i not in hand), key=lambda t: priority(t, len(descendants(t["id"], post, memo))))[:lim]
    bydom = collections.defaultdict(list)
    for i in keep: bydom[(by[i]["subject"], by[i]["domain"])].append(by[i])
    out, rep, rejected = collections.defaultdict(dict), [], 0; seen = collections.defaultdict(list); dups = 0; sims = []
    for t in todo:
        best = None
        for k, a in enumerate([c for c in candidates(t)[:3] for _ in range(2)]):
            les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + k)
            NONMATH[0] = meta["loose"]; errs = check(les, a) + (REL[0].check(les if not meta.get("tuned") else dict(les, worked={"title": "", "steps": []}), t, meta["arch_items"]) if meta["loose"] else []); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]; dups += 1
            q = rubric(les, a, meta, errs, ms)
            if errs and not best: best = (q, les, a["name"], errs)
            if not errs and (not best or q > best[0]): best = (q, les, a["name"], [])
            if q >= MIN_QUALITY: break
            rejected += 1
        if best[3] and all("near-duplicate" in e for e in best[3]):   # last resort: drop the shared archetype text, keep only this topic's own
            a = candidates(t)[0]; les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + 99, True)
            NONMATH[0] = meta["loose"]; errs = check(les, a) + (REL[0].check(les if not meta.get("tuned") else dict(les, worked={"title": "", "steps": []}), t, meta["arch_items"]) if meta["loose"] else []); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]
            else: best = (rubric(les, a, meta, errs, ms), les, a["name"], errs)
            a = candidates(t)[0]; les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + 99, 2)
            NONMATH[0] = meta["loose"]; errs = check(les, a) + (REL[0].check(les if not meta.get("tuned") else dict(les, worked={"title": "", "steps": []}), t, meta["arch_items"]) if meta["loose"] else []); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]
            else: best = (rubric(les, a, meta, errs, ms), les, a["name"], errs)
        if best[3] and all("near-duplicate" in e for e in best[3]):   # last resort: drop the shared archetype text, keep only this topic's own
            a = candidates(t)[0]; les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + 99, True)
            NONMATH[0] = meta["loose"]; errs = check(les, a) + (REL[0].check(les if not meta.get("tuned") else dict(les, worked={"title": "", "steps": []}), t, meta["arch_items"]) if meta["loose"] else []); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]
            else: best = (rubric(les, a, meta, errs, ms), les, a["name"], errs)
            a = candidates(t)[0]; les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + 99, 3)
            NONMATH[0] = meta["loose"]; errs = check(les, a) + (REL[0].check(les if not meta.get("tuned") else dict(les, worked={"title": "", "steps": []}), t, meta["arch_items"]) if meta["loose"] else []); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]
            else: best = (rubric(les, a, meta, errs, ms), les, a["name"], errs)
        q, les, an, errs = best
        if errs: rep.append((t["id"], t["name"], an, q, errs[:2])); continue
        les["quality"] = q; sims.append(max([QS.sim(QS.shingles(les), o) for bn, o in seen[t["domain"]] if bn != BASE(t["name"])] or [0])); seen[t["domain"]].append((BASE(t["name"]), QS.shingles(les)))
        out[re.sub(r"[^a-z0-9]+", "-", (t["subject"] + "-" + t["domain"]).lower()).strip("-")][t["id"]] = les
        rep.append((t["id"], t["name"], an, q, []))
    os.makedirs("learn/auto", exist_ok=True)
    for f in glob.glob("learn/auto/*.json"): os.remove(f)
    for k, v in out.items():
        json.dump(v, open(f"learn/auto/{k}.json", "w"), ensure_ascii=False, indent=0, sort_keys=True)
    ok = [r for r in rep if not r[4]]; bad = [r for r in rep if r[4]]
    qs = [r[3] for r in ok]
    print(f"starter lessons: {len(ok)} written, {len(bad)} failed checks, {rejected} weak drafts rejected and regenerated; quality mean {sum(qs)/max(1,len(qs)):.0f}, "
          f"≥{MIN_QUALITY}: {sum(q >= MIN_QUALITY for q in qs)}, below: {sum(q < MIN_QUALITY for q in qs)}")
    print(f"near-duplicate drafts rejected: {dups}; max sibling similarity of written lessons: {max(sims or [0]):.2f}, mean {sum(sims)/max(1,len(sims)):.2f}")
    print("archetypes:", collections.Counter(r[2] for r in ok).most_common())
    for r in bad[:15]: print("FAIL", r[0], r[1], r[2], r[4])
    if "--report" in sys.argv:
        json.dump([dict(id=r[0], name=r[1], archetype=r[2], quality=r[3], errors=r[4]) for r in rep], open("learn/auto/_report.json", "w"), ensure_ascii=False, indent=0)
main()
