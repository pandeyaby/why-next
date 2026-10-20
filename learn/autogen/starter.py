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
import lesson_checks as LC
from readability import fk_grade, TARGETS
MIN_QUALITY = 65   # = 25th percentile of the hand-written lessons under the same scorer (quality.py)
from tune import tune
import quality as QS
ARCH = {"Mathematics": MATH[:2] + MATH2[:1] + MATH[2:] + MATH2[1:] + MATH3 + MATH4 + MATH5, "Science": SCI + SCI2 + OTHER[:5]}
from arch_eng import ENG
OTHERS = ENG + [a for a in OTHER[5:] if a["name"] != "english"]   # the strand archetypes replace the old one-size English archetype

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
    if not out: out = [a for a in OTHERS if re.search(a["dom"], t["domain"], re.I)] or [OTHERS[-1]] if t["subject"] not in ARCH else [pool[-1]]
    return out

STOP = set("which their there these those about using through between within without other another after before where while because could would should explain describe identify understand recognise recognize including".split())
ABBR = [("e.g.", "e·g·"), ("i.e.", "i·e·"), ("etc.", "etc·"), ("vs.", "vs·")]
def clause(desc, n=16):
    for a, b in ABBR: desc = desc.replace(a, b)
    s = re.split(r"(?<=[.;:])\s|,\s(?=and |or |which |so )", desc.strip())[0].rstrip(".;:")
    w = s.split(); r = " ".join(w[:n]) + ("…" if len(w) > n else "")
    for a, b in ABBR: r = r.replace(b, a)
    return r
def objective(desc):
    s = clause(desc, 22); return s[0].lower() + s[1:] if s else s
def key_term(desc, name):
    words = re.findall(r"[A-Za-z][a-z]{6,}", desc)
    first = desc.split()[0] if desc.split() else ""
    for w in sorted(words, key=len, reverse=True):
        if w == first: continue
        if w.lower() not in STOP and w.lower() not in name.lower(): return w
    return None

def mcu(prompt, ch, hint, ex):
    """Multiple choice only when every choice is different (case-insensitive)."""
    return mc(prompt, ch, hint, ex) if len({c.strip().lower() for c in ch}) == len(ch) and all(ch) else None
def closure(u, edges, key):
    seen, st = set(), [u]
    while st:
        x = st.pop()
        for e in edges.get(x, []):
            y = e[key]
            if y not in seen: seen.add(y); st.append(y)
    return seen
def form(w):
    """Rough word class from the ending, so cloze distractors fit the sentence grammatically."""
    w = w.lower()
    for suf, f in (("ing", "ing"), ("tion", "noun"), ("sion", "noun"), ("ment", "noun"), ("ness", "noun"), ("ity", "noun"), ("ly", "adv"), ("ed", "ed"), ("ous", "adj"), ("ive", "adj"), ("al", "adj"), ("able", "adj"), ("ies", "pl"), ("s", "pl")):
        if w.endswith(suf): return f
    return "noun"
def topic_items(t, by, pre, post, sib, rng):
    """Questions built from this topic's own data. Each returns (practice?, item)."""
    out, nm = [], t["name"]
    anc = {by[x]["name"] for x in closure(t["id"], pre, "prerequisiteId")}; desc_ = {by[x]["name"] for x in closure(t["id"], post, "topicId")}
    others = [s for s in sib if s["id"] != t["id"] and clause(s["description"]) != clause(t["description"])]
    rng.shuffle(others)
    sents = [x for x in re.split(r"(?<=\.)\s+", t["description"]) if len(x.split()) >= 6]
    if len(others) >= 2 and len(sents) >= 2:   # uses a sentence the key idea does not show, so it cannot be matched by copying
        out.append(("m", mcu(f"Which topic is this about: '{clause(sents[1], 16)}'?", [nm, others[0]["name"], others[1]["name"]], "Think about what this topic covers.", f"That is part of '{nm}'.")))
    hard = [e for e in pre.get(t["id"], []) if e["strength"] == "hard"] or pre.get(t["id"], [])
    later = [by[e["topicId"]]["name"] for e in post.get(t["id"], [])]
    far = [s["name"] for s in others if s["ageRangeStart"] > t["ageRangeStart"]] + later
    if hard:
        p = by[hard[0]["prerequisiteId"]]["name"]; d = [x for x in dict.fromkeys(far) if x not in (p, nm) and x not in anc][:2]
        if len(d) == 2:
            out.append(("p", mcu(f"Which topic should you learn before '{nm}'?", [p, d[0], d[1]], "What does this topic build on?", f"'{nm}' builds on '{p}'.")))
        reasons = [e["reason"] for s in others[:6] for e in pre.get(s["id"], [])][:4]
        r0 = hard[0].get("reason") or ""
        rs = [clause(x, 14) for x in reasons if clause(x, 14) != clause(r0, 14)]
        if r0 and len(rs) >= 2:
            out.append(("m", mcu(f"Why does '{nm}' build on '{p}'?", [clause(r0, 14), rs[0], rs[1]], "Think about what you need first.", f"Because: {clause(r0, 14)}.")))
    if later:
        d = [by[e["prerequisiteId"]]["name"] for e in pre.get(t["id"], [])][:1] + [s["name"] for s in others if s["name"] not in later][:2]
        d = [x for x in dict.fromkeys(d) if x not in later and x != nm and x not in desc_][:2]
        if len(d) == 2: out.append(("m", mcu(f"Which topic does '{nm}' help you learn next?", [later[0], d[0], d[1]], "What comes after this topic?", f"'{nm}' leads on to '{later[0]}'.")))
    k = key_term(t["description"], nm)
    if k:
        terms = [key_term(s["description"], s["name"]) for s in others[:8]]
        terms = [x for x in dict.fromkeys(terms) if x and x.lower() != k.lower() and form(x) == form(k) and x[0].isupper() == k[0].isupper()][:2]
        gap = clause(re.sub(re.escape(k), "_____", t["description"], count=1), 22)
        if len(terms) == 2 and "_____" in gap:
            out.append(("m", mcu(f"Fill the gap: '{gap}'", [k, terms[0], terms[1]], "Which word fits the topic?", f"The missing word is '{k}'.")))
    return [(k, x) for k, x in out if x]

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
def worked_for(a, t, tu, prereq, later):
    if tu.get("worked"): w = tu["worked"]; return (w[0], list(w[1]))
    ss = [x for x in re.split(r"(?<=\.)\s+", t["description"]) if len(x.split()) >= 5]
    steps = ([f"Start from what you know: {prereq}."] if prereq else []) + [f"The new idea: {clause(t['description'], 18)}."] + ([f"In more detail: {clause(ss[1], 18)}."] if len(ss) > 1 else []) + list(a["worked"][1][:1]) + ([f"Next, this helps with: {later}."] if later else [])
    return (f"{a['worked'][0]}, for '{t['name']}'", steps)
def build(t, a, by, pre, post, sib, seed, minimal=False):
    rng = random.Random(seed); aud = "family" if t["ageRangeStart"] <= 7 else "learner"
    tu = tune(a, t, random.Random(seed * 7 + 1))
    strong = t["subject"] == "Mathematics" or bool(a["kw"] and re.search(a["kw"], t["name"], re.I))
    if not strong or minimal: tu = {"vis": tu.get("vis", {})}   # numbers and applied questions only when the archetype clearly fits this topic
    pr = [by[e["prerequisiteId"]]["name"] for e in pre.get(t["id"], [])][:1]; lt = [by[e["topicId"]]["name"] for e in post.get(t["id"], [])][:1]
    link = (f"It builds on {pr[0]}" + (f" and leads to {lt[0]}." if lt else ".")) if pr else (f"It leads to {lt[0]}." if lt else "")
    ex, specific = explain(a, t, aud, tu, link, rng, minimal); ti = topic_items(t, by, pre, post, sib, rng)
    app = tu.get("applied", [])
    prac = [dict(x) for x in a["p"]] + app[:1] + [x for k, x in ti if k == "p"]
    pool = [dict(x) for x in a["m"]] + app[1:] + [x for k, x in ti if k == "m"]
    while len(prac) < 3 and pool: prac.append(pool.pop(0))
    extra = [x for x in a["p"]] + [x for k, x in ti if k == "p"]
    while len(pool) < 7 and extra:
        v = dict(extra.pop(0)); v["prompt"] = "Quick check: " + v["prompt"]; pool.append(v)
    for x in prac[:6 - len(pool)] if len(pool) < 6 else []:
        v = dict(x); v["prompt"] = "Recap: " + v["prompt"]; pool.append(v)
    prac = prac[:5]
    for i, it in enumerate(prac): it["id"] = f"p{i+1}"
    for i, it in enumerate(pool): it["id"] = f"m{i+1}"
    w = worked_for(a, t, tu, pr[0] if pr else None, lt[0] if lt else None)
    if minimal: w = (t["name"], [x for x in w[1] if a["worked"][1][0] != x] or w[1])
    vis = json.loads(json.dumps(a["vis"])); vis["opts"].update(tu.get("vis", {}))
    les = {"topicId": t["id"], "title": t["name"], "audience": aud, "keyIdea": clause(t["description"], 24) + ".",
           "explain": ex, "worked": {"title": w[0], "steps": w[1]},
           "familyTip": ("Try the lab together, then ask: what changed, and why?" if aud == "family" else "Explain the key idea to someone else in two sentences, then try a challenge in the lab."),
           "practice": prac, "mastery": {"passMark": min(3, max(2, len(pool) - 4)), "draw": min(4, max(3, len(pool) - 3)), "pool": pool}, "status": "auto-starter", "visual": vis}
    return les, dict(specific=specific, n_topic=len(ti))

def rubric(les, a, meta, errs, maxsim=0.0):
    return 0 if errs else QS.score(les, les["title"], maxsim)[0]
LAB_TYPES = {"problab", "statlab", "numzoom", "graphlab", "geolab", "matrixlab", "gaslab", "reactlab", "wavelab", "forcelab", "ecolab", "balance", "plot", "area", "particles", "coords", "fracbar", "longdiv", "longmul", "array", "tenframe", "counters", "matlab", "separate", "circuit", "atom", "energy", "tiles", "expo", "vectors", "thermo", "percent", "placevalue", "squares"}

def check(les, a):
    LC.errors.clear(); LC.check_lesson("auto-starter", les)
    errs = list(LC.errors)
    if a["numeric"] is False: errs = [e for e in errs if "parameterised" not in e]
    return errs

def main():
    lim = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else 10 ** 9
    by, keep, pre, post = load(); memo = {}
    hand = {json.load(open(f))["topicId"] for f in glob.glob("learn/lessons/*.json")}
    todo = sorted((by[i] for i in keep if i not in hand), key=lambda t: priority(t, len(descendants(t["id"], post, memo))))[:lim]
    bydom = collections.defaultdict(list)
    for i in keep: bydom[(by[i]["subject"], by[i]["domain"])].append(by[i])
    out, rep, rejected = collections.defaultdict(dict), [], 0; seen = collections.defaultdict(list); dups = 0; sims = []
    for t in todo:
        best = None
        for k, a in enumerate([c for c in candidates(t)[:3] for _ in range(2)]):
            les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + k)
            errs = check(les, a); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for o in seen[t["domain"]]] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]; dups += 1
            q = rubric(les, a, meta, errs, ms)
            if errs and not best: best = (q, les, a["name"], errs)
            if not errs and (not best or q > best[0]): best = (q, les, a["name"], [])
            if q >= MIN_QUALITY: break
            rejected += 1
        if best[3] and all("near-duplicate" in e for e in best[3]):   # last resort: drop the shared archetype text, keep only this topic's own
            a = candidates(t)[0]; les, meta = build(t, a, by, pre, post, bydom[(t["subject"], t["domain"])], hash(t["id"]) % 9973 + 99, True)
            errs = check(les, a); sh = QS.shingles(les); ms = max([QS.sim(sh, o) for o in seen[t["domain"]]] or [0])
            if ms > QS.DUP: errs = errs + [f"near-duplicate of a sibling lesson (similarity {ms:.2f})"]
            else: best = (rubric(les, a, meta, errs, ms), les, a["name"], errs)
        q, les, an, errs = best
        if errs: rep.append((t["id"], t["name"], an, q, errs[:2])); continue
        les["quality"] = q; seen[t["domain"]].append(QS.shingles(les)); sims.append(max([QS.sim(QS.shingles(les), o) for o in seen[t["domain"]][:-1]] or [0]))
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
