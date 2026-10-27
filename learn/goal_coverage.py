"""Goal-path coverage: every topic on a goal's prerequisite path that a learner in a given age band would still
have to learn (not assumed known, not skipped) must have a lesson. Mirrors goalDist/done() in learn_core.js.
Usage: python3 learn/goal_coverage.py [--list]   (exit 1 if a REQUIRED goal/band pair has a gap)"""
import json, glob, sys, collections
REQUIRED = [("fractions", "2-4"), ("algebra", "10-12"), ("algebra", "13-15"),
            ("calculus", "16-18"), ("calculus", "adult"), ("calculus", "grand"),
            ("integration", "16-18"), ("integration", "adult"), ("integration", "grand"),
            ("chemistry", "2-4"), ("chemistry", "10-12"), ("chemistry", "13-15"), ("chemistry", "16-18"), ("chemistry", "adult"), ("chemistry", "grand")]
T = {t["id"]: t for t in json.load(open("out/merged/data/topics.json"))["topics"]}
PRE = collections.defaultdict(list)
for e in json.load(open("out/merged/data/dependencies.json"))["dependencies"]:
    if e["strength"] == "hard": PRE[e["topicId"]].append(e["prerequisiteId"])
G = json.load(open("learn/goals.json"))
LES = {json.load(open(f))["topicId"] for f in glob.glob("learn/lessons/*.json")}
def path(goal, band):
    g = next(x for x in G["goals"] if x["id"] == goal); b = next(x for x in G["bands"] if x["id"] == band)
    sk = G["skipFromBand10"]; dist = {g["target"]: 0}; q = [g["target"]]
    for u in q:
        for p in PRE[u]:
            if p not in dist: dist[p] = dist[u] + 1; q.append(p)
    def done(i):
        t = T[i]
        return (not b.get("young") and (t["subject"] in sk["subjects"] or t["domain"] in sk.get("domains", []))) or t["ageRangeEnd"] <= b["assumeKnownUpTo"]
    return sorted((d, i) for i, d in dist.items() if not done(i))
if "--all" in sys.argv:
    for g in G["goals"]:
        if not g.get("target"): continue
        for b in G["bands"]:
            P = path(g["id"], b["id"]); m = [i for d, i in P if i not in LES]
            print(f"{g['id']:12} {b['id']:7} {len(P)-len(m):3}/{len(P):3} covered" + (f"  missing: {', '.join(T[i]['name'] for i in m[:6])}{' …' if len(m) > 6 else ''}" if m else ""))
    sys.exit(0)
bad = 0
for goal, band in REQUIRED:
    P = path(goal, band); miss = [(d, i) for d, i in P if i not in LES]
    print(f"goal {goal} / band {band}: {len(P)} topics to learn, {len(P)-len(miss)} with lessons, {len(miss)} without")
    for d, i in (P if "--list" in sys.argv else miss):
        print(f"  {'L' if i in LES else '-'} {d} {i} {T[i]['name']} ({T[i]['subject']}/{T[i]['domain']}, ages {T[i]['ageRangeStart']}-{T[i]['ageRangeEnd']})")
    bad += len(miss)
sys.exit(1 if bad else 0)
