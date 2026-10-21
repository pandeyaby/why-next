"""Quality scorer (0–100) shared by starter and hand-written lessons, plus the near-duplicate detector.
Calibrated against the hand-written lessons: see `python3 learn/autogen/quality.py` for their distribution."""
import re, glob, json, sys
LABS = {"problab", "statlab", "numzoom", "graphlab", "geolab", "matrixlab", "gaslab", "reactlab", "wavelab", "forcelab", "ecolab", "platelab", "celllab", "cyclelab", "chainlab", "bodylab", "flagderiv", "flagplace", "flagfrac", "flagneg", "flageq", "flagline", "flagarea", "flagatom", "flagacid", "flagstate", "flagprob", "flagpyth"}
STOP = set("the and for with that this from into your what when how are you can use using about their them they its has have will make made more most than then each".split())
def words(s): return re.findall(r"[a-z0-9]+", s.lower())
def body(les):
    w = les.get("worked") or {}
    return " ".join(les["explain"]["adult"] + [w.get("title", "")] + w.get("steps", []))
def shingles(les, k=3):
    w = words(body(les)); return {" ".join(w[i:i + k]) for i in range(len(w) - k + 1)}
def sim(a, b): return len(a & b) / max(1, len(a | b))
DUP = 0.55
def applied(it):
    p = it["prompt"]; return p.startswith("Sam worked") or len(words(p)) >= 14 or bool(re.search(r"\b(box|boxes|shop|cost|share|friends|cart|metres|grams|litres|students|trial|throws|recipe)\b", p, re.I))
def giveaways(les):
    """mc items whose right answer is copied from the key idea or explanation (the learner can just match words)."""
    txt = " ".join([les["keyIdea"]] + les["explain"]["adult"] + les["explain"]["kid"]).lower(); n = 0
    for it in les["practice"] + les["mastery"]["pool"]:
        if it["type"] == "mc":
            c = it["choices"][it["answer"]].lower().rstrip(".…")
            if len(c.split()) >= 5 and c in txt: n += 1
    return n
def score(les, name, maxsim=0.0):
    sc, why = 0, {}
    v = [les["visual"]["type"]] + ([les["lab"]["type"]] if "lab" in les else [])
    why["lab"] = 15 if set(v) & LABS else 10
    w = les.get("worked")
    st = " ".join(w["steps"]) if w else ""
    # full marks for a concrete example: numbers, or (for non-numeric subjects) a quoted or specific case of ≥3 steps and ≥30 words
    why["worked"] = 0 if not w else 15 if len(w["steps"]) >= 3 and (re.search(r"\d", st) or len(st.split()) >= 30) and not all(re.match(r"(Start from what you know|Next, this helps with|The new idea|In more detail|Check: explain)", x) for x in w["steps"]) else 9 if len(w["steps"]) >= 3 else 5
    nw = [x for x in words(name) if len(x) >= 4 and x not in STOP]
    txt = set(words(body(les) + " " + les["keyIdea"] + " " + " ".join(i["prompt"] for i in les["practice"] + les["mastery"]["pool"])))
    why["specific"] = round(20 * (sum(x in txt or x.rstrip("s") in txt for x in nw) / len(nw) if nw else 0.5))
    why["unique"] = round(15 * max(0.0, min(1.0, 1 - maxsim / DUP)))
    items = les["practice"] + les["mastery"]["pool"]
    np_ = sum("params" in i for i in items); na = sum(applied(i) for i in items)
    why["questions"] = (8 if np_ >= 3 else 4 if np_ else 0) + (9 if na >= 2 else 5 if na else 0) + (4 if len(items) >= 9 else 2) + (4 if len({i["type"] for i in items}) > 1 else 1)
    why["readable"] = 10
    why["giveaway"] = -5 * giveaways(les)
    return max(0, sum(why.values())), why
if __name__ == "__main__":
    S = []
    for f in sorted(glob.glob("learn/lessons/*.json")):
        d = json.load(open(f)); S.append((score(d, d["title"])[0], f.split("/")[-1]))
    q = sorted(s for s, _ in S); print(f"hand-written: n={len(q)} mean={sum(q) / len(q):.0f} p25={q[len(q) // 4]} median={q[len(q) // 2]} min={q[0]} max={q[-1]}")
    if "-v" in sys.argv: print(sorted(S)[:10])
