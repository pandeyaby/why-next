#!/usr/bin/env python3
"""Build "Why Next?", the secondary (grades 6-12) learning map built on the upstream v1 taxonomy.

Reads the authored topics in ext/src_*.py, assigns deterministic ids, resolves
prerequisite references, writes out/*.ext.json and merged copies of the full
dataset, then runs structural checks. Usage:  python3 ext/build.py
"""
import base64, copy, hashlib, json, os, sys
from collections import defaultdict, deque

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")
OUT = os.path.join(ROOT, "out")
sys.path.insert(0, HERE)

import dsl  # noqa: E402
import src_matter, src_energy, src_algebra, src_functions, src_forces  # noqa: F401,E402
import src_waves, src_electricity, src_geometry, src_stats, src_calculus  # noqa: F401,E402  (wave 2)
import src_organic, src_hypothesis, src_matrices, src_series  # noqa: F401,E402  (wave 3)
import src_distributions, src_eigen, src_polar, src_aromatic, src_spectroscopy  # noqa: F401,E402  (wave 4)
import src_hyperbolic, src_conics, src_carbonyl, src_amino  # noqa: F401,E402  (wave 5)
import src_early_sci, src_early_psd, src_early_l2l, src_early_maths, src_early_found  # noqa: F401,E402  (wave 6: ages 2-4)
import src_teen_eng, src_teen_l2l, src_teen_psd  # noqa: F401,E402  (wave 6: secondary English, Learning to Learn, PSD)

EXT_VERSION = "whynext-0.6"
PROJECT_NAME = "Why Next?"
CREDIT_LINE = open(os.path.join(HERE, "CREDIT.txt"), encoding="utf-8").read().strip()
ID_NAMESPACE = "marble-os-taxonomy/secondary-ext/v1:"  # frozen: changing it would change every new topic id
CENTRALITY_SCALE = 731  # max (ancestors + descendants) in the v1 graph; see out/README.md

def load(name):
    with open(os.path.join(DATA, name), encoding="utf-8") as f:
        return json.load(f)

def dump(obj, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")

def make_id(key, taken):
    salt = 0
    while True:
        h = hashlib.sha256((ID_NAMESPACE + key + ("" if salt == 0 else f"#{salt}")).encode()).digest()
        tid = "mt_" + base64.urlsafe_b64encode(h).decode()[:10]
        if tid not in taken:
            return tid
        salt += 1

topics_v1 = load("topics.json")
deps_v1 = load("dependencies.json")
stds_v1 = load("curriculum-standards.json")
clusters_v1 = load("clusters.json")
manifest_v1 = load("manifest.json")

old_by_id = {t["id"]: t for t in topics_v1["topics"]}
taken = set(old_by_id)
keys = [t["key"] for t in dsl.TOPICS]
dup_keys = {k for k in keys if keys.count(k) > 1}
assert not dup_keys, f"duplicate keys: {dup_keys}"

key2id = {}
for t in dsl.TOPICS:
    key2id[t["key"]] = make_id(t["key"], taken)
    taken.add(key2id[t["key"]])

def resolve(ref):
    if ref.startswith("mt_"):
        if ref not in old_by_id:
            raise SystemExit(f"unknown existing id {ref}")
        return ref
    if ref not in key2id:
        raise SystemExit(f"unknown local key {ref}")
    return key2id[ref]

# ---------------------------------------------------------------- standards extension (NGSS HS, codes only)
NGSS_HS_CODES = [f"HS-PS1-{i}" for i in range(1, 9)] + [f"HS-PS2-{i}" for i in range(1, 7)] + [f"HS-PS3-{i}" for i in range(1, 6)] + [f"HS-PS4-{i}" for i in range(1, 6)]
ngss_hs = {
    "slug": "ngss-hs",
    "country": "US",
    "name": "Next Generation Science Standards (NGSS) High School — Physical Science (PS1–PS4)",
    "version": "2013",
    "sourceUrl": "https://www.nextgenscience.org/overview-dci#high-school",
    "textIncluded": False,
    "license": "Codes/identifiers only — verbatim standard text omitted; this source carries an upstream license that does not permit our redistribution of the full text. See PROVENANCE.md.",
    "topicCount": len(NGSS_HS_CODES),
    "topics": [{"key": f"ngss-hs:{c}", "code": c} for c in NGSS_HS_CODES],
}
standards_ext = {
    "note": ("Standards added by the secondary extension. Only NGSS high-school physical-science codes were missing from v1; "
             "every CCSS-Math and UK KS3 key used by the extension already exists in v1 curriculum-standards.json. "
             "NGSS is codes-only (see PROVENANCE.md). Codes verified against nextgenscience.org DCI arrangement pages "
             "HS-PS1, HS-PS2 and HS-PS3 on 2026-10-18 (re-checked for wave 3 on the same day), and HS-PS4 on 2026-10-18 (wave 2; re-checked for wave 4 on the same day): "
             "https://www.nextgenscience.org/dci-arrangement/hs-ps1-matter-and-its-interactions , "
             "https://www.nextgenscience.org/dci-arrangement/hs-ps2-motion-and-stability-forces-and-interactions , "
             "https://www.nextgenscience.org/dci-arrangement/hs-ps3-energy , "
             "https://www.nextgenscience.org/dci-arrangement/hs-ps4-waves-and-their-applications-technologies-information-transfer"),
    "codesOnlySources": ["ngss-hs"],
    "curriculumCount": 1,
    "curricula": [ngss_hs],
}

std_keys = {s["key"] for c in stds_v1["curricula"] for s in c["topics"]} | {s["key"] for s in ngss_hs["topics"]}

# ---------------------------------------------------------------- topics + edges
new_topics, new_edges = [], []
for t in dsl.TOPICS:
    tid = key2id[t["key"]]
    for s in t["standards"]:
        assert s in std_keys, f"{t['key']}: unknown standard {s}"
    new_topics.append({
        "id": tid, "type": t["type"], "subject": dsl.SUBJECT_BY_DOMAIN[t["domain"]], "domain": t["domain"],
        "name": t["name"], "description": t["description"], "ageRangeStart": t["a0"], "ageRangeEnd": t["a1"],
        "centrality": None, "evidence": t["evidence"], "assessmentPrompt": t["prompt"], "standards": t["standards"],
    })
    seen = set()
    for ref, s, reason in t["prereqs"]:
        pid = resolve(ref)
        assert pid not in seen, f"{t['key']}: duplicate prereq {ref}"
        seen.add(pid)
        new_edges.append({"topicId": tid, "prerequisiteId": pid, "strength": "hard" if s == "h" else "soft", "reason": reason})

# foundation edges (wave 6): v1 topics that build on the new ages 2-4 topics (see dsl.U)
FOUNDATION_MAX_START = 4
foundation_pairs = set()
for key, ref, s, reason in dsl.UNLOCKS:
    pid, tid = key2id[key], resolve(ref)
    assert tid in old_by_id, f"{key}: foundation edges must point at a v1 topic, got {ref}"
    new_edges.append({"topicId": tid, "prerequisiteId": pid, "strength": "hard" if s == "h" else "soft", "reason": reason})
    foundation_pairs.add((tid, pid))

all_topics = topics_v1["topics"] + new_topics
all_edges = deps_v1["dependencies"] + new_edges
by_id = {t["id"]: t for t in all_topics}
new_ids = {t["id"] for t in new_topics}

# centrality: the upstream v1 method, reproduced exactly (all 1590 v1 values):
#   centrality = (ancestors + descendants) / max over the graph of (ancestors + descendants)
# where ancestors/descendants count topics connected through prerequisite edges of either
# strength. Recomputed here on the merged graph for every topic; v1 files under data/ are
# untouched, and the merged copy carries the recomputed values (see out/README.md).
children = defaultdict(list); parents_all = defaultdict(list)
for e in all_edges:
    children[e["prerequisiteId"]].append(e["topicId"]); parents_all[e["topicId"]].append(e["prerequisiteId"])
def reach(i, nbr):
    seen, st = set(), [i]
    while st:
        for c in nbr[st.pop()]:
            if c not in seen:
                seen.add(c); st.append(c)
    return len(seen)
def centrality_counts(ids):
    return {i: reach(i, children) + reach(i, parents_all) for i in ids}
# sanity: the method must reproduce v1 on the v1 graph alone
_v1c, _v1p = defaultdict(list), defaultdict(list)
for e in deps_v1["dependencies"]:
    _v1c[e["prerequisiteId"]].append(e["topicId"]); _v1p[e["topicId"]].append(e["prerequisiteId"])
_v1k = {t["id"]: reach(t["id"], _v1c) + reach(t["id"], _v1p) for t in topics_v1["topics"]}
_v1max = max(_v1k.values())
CENTRALITY_V1_MAX_ABS_ERROR = max(abs(_v1k[t["id"]] / _v1max - t["centrality"]) for t in topics_v1["topics"])
assert _v1max == CENTRALITY_SCALE and CENTRALITY_V1_MAX_ABS_ERROR < 1e-12, CENTRALITY_V1_MAX_ABS_ERROR
cent_k = centrality_counts(by_id)
CENTRALITY_MERGED_MAX = max(cent_k.values())
merged_centrality = {i: k / CENTRALITY_MERGED_MAX for i, k in cent_k.items()}
for t in new_topics:
    t["centrality"] = merged_centrality[t["id"]]

# ---------------------------------------------------------------- checks
problems, report = [], {}
# 1 referential integrity + no old->new
for e in new_edges:
    if e["topicId"] not in by_id or e["prerequisiteId"] not in by_id: problems.append(f"dangling edge {e}")
    if e["topicId"] not in new_ids and not ((e["topicId"], e["prerequisiteId"]) in foundation_pairs
            and by_id[e["prerequisiteId"]]["ageRangeStart"] <= FOUNDATION_MAX_START):
        problems.append(f"old topic depends on new: {e}")
    if e["topicId"] == e["prerequisiteId"]: problems.append(f"self edge {e}")
pairs = [(e["topicId"], e["prerequisiteId"]) for e in all_edges]
if len(pairs) != len(set(pairs)): problems.append("duplicate edges in merged graph")
# 2 acyclicity (Kahn) on merged graph
indeg = defaultdict(int); nodes = set(by_id)
adj = defaultdict(list)
for e in all_edges:
    adj[e["prerequisiteId"]].append(e["topicId"]); indeg[e["topicId"]] += 1
q = deque(n for n in nodes if indeg[n] == 0); visited = 0
while q:
    n = q.popleft(); visited += 1
    for m in adj[n]:
        indeg[m] -= 1
        if indeg[m] == 0: q.append(m)
report["acyclic"] = visited == len(nodes)
if not report["acyclic"]: problems.append(f"cycle detected: {len(nodes) - visited} nodes in cycles")
# 3 duplicate names within (subject, domain), including clashes with v1
names = defaultdict(list)
for t in all_topics: names[(t["subject"], t["domain"], t["name"].strip().lower())].append(t["id"])
dups = [k for k, v in names.items() if len(v) > 1 and any(i in new_ids for i in v)]
report["duplicateNamesInvolvingNew"] = dups
if dups: problems.append(f"duplicate names: {dups}")
# 4 age monotonic along new edges (prereq start <= dependent start)
age_viol_hard = [e for e in new_edges if e["strength"] == "hard" and by_id[e["prerequisiteId"]]["ageRangeStart"] > by_id[e["topicId"]]["ageRangeStart"]]
age_viol_soft = [e for e in new_edges if e["strength"] == "soft" and by_id[e["prerequisiteId"]]["ageRangeStart"] > by_id[e["topicId"]]["ageRangeStart"]]
report["ageViolationsHard"] = len(age_viol_hard); report["ageViolationsSoft"] = len(age_viol_soft)
for e in age_viol_hard + age_viol_soft:
    problems.append(f"age: {by_id[e['topicId']]['name']} ({by_id[e['topicId']]['ageRangeStart']}) <- {by_id[e['prerequisiteId']]['name']} ({by_id[e['prerequisiteId']]['ageRangeStart']}) [{e['strength']}]")
# 5 every new node reaches an existing (v1) topic via prerequisite edges; also via hard edges only
parents = defaultdict(list); hard_parents = defaultdict(list)
for e in all_edges:
    parents[e["topicId"]].append(e["prerequisiteId"])
    if e["strength"] == "hard": hard_parents[e["topicId"]].append(e["prerequisiteId"])
def reaches_v1(i, par):
    seen, st = {i}, [i]
    while st:
        for p in par[st.pop()]:
            if p not in new_ids: return True
            if p not in seen: seen.add(p); st.append(p)
    return False
kids = defaultdict(list); hard_kids = defaultdict(list)
for e in all_edges:
    kids[e["prerequisiteId"]].append(e["topicId"])
    if e["strength"] == "hard": hard_kids[e["prerequisiteId"]].append(e["topicId"])
# a new topic is connected if it builds on v1 (ancestors) or, for the early-years foundation, if v1 builds on it
unreached = [by_id[i]["name"] for i in new_ids if not (reaches_v1(i, parents) or reaches_v1(i, kids))]
unreached_hard = [by_id[i]["name"] for i in new_ids if not (reaches_v1(i, hard_parents) or reaches_v1(i, hard_kids))]
report["unreachedPrimary"] = unreached; report["unreachedPrimaryHardOnly"] = unreached_hard
if unreached: problems.append(f"new topics not reaching v1 graph: {unreached}")
# 6 every new topic has evidence/prompt/placeholder; every new topic has >= 1 prereq
for t in new_topics:
    if not parents[t["id"]] and not (t["ageRangeStart"] <= FOUNDATION_MAX_START and kids[t["id"]]):
        problems.append(f"no prerequisites: {t['name']}")
    if "{{name}}" not in t["assessmentPrompt"]: problems.append(f"prompt placeholder missing: {t['name']}")
    if t["ageRangeStart"] > t["ageRangeEnd"]: problems.append(f"bad age range: {t['name']}")

bridge = [e for e in new_edges if e["prerequisiteId"] not in new_ids]
report["counts"] = {
    "topics": len(new_topics),
    "edges": len(new_edges),
    "edgesHard": sum(e["strength"] == "hard" for e in new_edges),
    "edgesSoft": sum(e["strength"] == "soft" for e in new_edges),
    "bridgeEdges": len(bridge),
    "bridgeEdgesHard": sum(e["strength"] == "hard" for e in bridge),
    "distinctV1TopicsBridgedTo": len({e["prerequisiteId"] for e in bridge}),
    "topicsWithStandards": sum(bool(t["standards"]) for t in new_topics),
    "topicStandardLinks": sum(len(t["standards"]) for t in new_topics),
    "byDomain": {}, "byType": {}, "byAgeStart": {},
}
for t in new_topics:
    for k, v in (("byDomain", f"{t['subject']} / {t['domain']}"), ("byType", t["type"]), ("byAgeStart", str(t["ageRangeStart"]))):
        report["counts"][k][v] = report["counts"][k].get(v, 0) + 1
report["counts"]["byAgeStart"] = dict(sorted(report["counts"]["byAgeStart"].items(), key=lambda kv: int(kv[0])))
report["problems"] = problems

# ---------------------------------------------------------------- write extension files
dump({"version": EXT_VERSION, "topicCount": len(new_topics), "topics": new_topics},
     os.path.join(OUT, "topics.ext.json"))
dump({"version": EXT_VERSION,
      "note": "`topicId` depends on `prerequisiteId`. Every topicId is a new extension topic; prerequisiteIds may be new or v1 topics.",
      "edgeCount": len(new_edges), "dependencies": new_edges}, os.path.join(OUT, "dependencies.ext.json"))
dump(standards_ext, os.path.join(OUT, "standards.ext.json"))

# ---------------------------------------------------------------- merged dataset (same layout as data/)
M = os.path.join(OUT, "merged", "data")
m_all_topics = []
for t in all_topics:
    t2 = dict(t); t2["centrality"] = merged_centrality[t["id"]]; m_all_topics.append(t2)
m_topics = {"version": EXT_VERSION, "topicCount": len(m_all_topics), "topics": m_all_topics}
m_deps = {"version": EXT_VERSION, "note": deps_v1.get("note"), "edgeCount": len(all_edges), "dependencies": all_edges}
m_stds = copy.deepcopy(stds_v1)
m_stds["codesOnlySources"] = sorted(set(m_stds.get("codesOnlySources", [])) | {"ngss-hs"})
m_stds["curricula"].append(ngss_hs)
m_stds["curriculumCount"] = len(m_stds["curricula"])
from clusters_ext import CLUSTERS  # noqa: E402
occupied = sorted({(t["subject"], t["domain"], t["ageRangeStart"]) for t in new_topics}, key=lambda k: (k[0], k[1], k[2]))
v1_cluster_keys = {(c["subject"], c["domain"], c["ageRangeStart"]) for c in clusters_v1["clusters"]}
ext_clusters = []
for subj, dom, age in occupied:
    if (dom, age) not in CLUSTERS: problems.append(f"missing cluster summary: {subj} / {dom} / {age}")
    elif (subj, dom, age) in v1_cluster_keys: problems.append(f"cluster clashes with v1: {subj} / {dom} / {age}")
    else: ext_clusters.append({"subject": subj, "domain": dom, "ageRangeStart": age, "summary": CLUSTERS[(dom, age)]})
unused = set(CLUSTERS) - {(d, a) for _, d, a in occupied}
if unused: problems.append(f"cluster summaries for unoccupied groups: {sorted(unused)}")
report["counts"]["clusters"] = len(ext_clusters)
report["centrality"] = {"method": "(ancestors + descendants) / max over graph", "v1MaxAbsError": CENTRALITY_V1_MAX_ABS_ERROR,
                        "v1Max": _v1max, "mergedMax": CENTRALITY_MERGED_MAX}
dump({"version": EXT_VERSION, "clusterCount": len(ext_clusters), "clusters": ext_clusters}, os.path.join(OUT, "clusters.ext.json"))
m_clusters = copy.deepcopy(clusters_v1)
m_clusters["version"] = EXT_VERSION
m_clusters["clusters"] += ext_clusters
m_clusters["clusterCount"] = len(m_clusters["clusters"])
for name, obj in (("topics.json", m_topics), ("dependencies.json", m_deps), ("curriculum-standards.json", m_stds), ("clusters.json", m_clusters)):
    dump(obj, os.path.join(M, name))
files = {}
for name in ("topics.json", "dependencies.json", "curriculum-standards.json", "clusters.json"):
    b = open(os.path.join(M, name), "rb").read()
    files[name] = {"bytes": len(b), "sha256": hashlib.sha256(b).hexdigest()}
by_subj = defaultdict(int)
for t in all_topics: by_subj[t["subject"]] += 1
m_manifest = copy.deepcopy(manifest_v1)
m_manifest.update({
    "dataset": PROJECT_NAME,
    "attribution": CREDIT_LINE,
    "taxonomyVersion": EXT_VERSION,
    "extension": {"name": "Why Next? secondary learning map (grades 6-12): Matter & Energy, Algebra, Forces & Motion, Functions & Modeling, Waves, Electricity & Circuits, Geometry & Trigonometry, Statistics & Probability, Calculus, Organic Chemistry, Hypothesis Testing, Matrices & Complex Numbers, Series, Poisson & t-tests, Eigenvalues & 3-D Vectors, Polar Coordinates, Aromatic Chemistry, Spectroscopy, Hyperbolic Functions, Conics, Carbonyl Chemistry, Amino Acids",
                  "baseDataset": manifest_v1["dataset"], "baseTaxonomyVersion": manifest_v1["taxonomyVersion"], "status": "draft, unpublished", "idMap": "id-map.json"},
    "codesOnlySources": m_stds["codesOnlySources"],
})
m_manifest["counts"].update({
    "topics": len(all_topics), "topicsBySubject": dict(sorted(by_subj.items())), "dependencies": len(all_edges),
    "curricula": m_stds["curriculumCount"], "curriculumStandards": sum(len(c["topics"]) for c in m_stds["curricula"]),
    "topicStandardLinks": sum(len(t["standards"]) for t in all_topics), "clusters": len(m_clusters["clusters"]),
})
m_manifest["files"] = files
m_manifest.pop("generatedAt", None)
dump(m_manifest, os.path.join(M, "manifest.json"))

# ---------------------------------------------------------------- id map back to the upstream v1 topic ids
new_by_id = {t["id"]: t for t in new_topics}
id_map = {
    "version": EXT_VERSION,
    "attribution": CREDIT_LINE,
    "note": ("Upstream v1 topic ids are kept verbatim in the merged data; no upstream id was renamed. "
             "Each Why Next? topic lists the upstream v1 topics it builds on directly (bridgeTo) and all upstream "
             "v1 topics among its prerequisite ancestors (upstreamAncestors)."),
    "upstreamTopicCount": len(topics_v1["topics"]),
    "upstreamTopics": [{"id": t["id"], "name": t["name"]} for t in topics_v1["topics"]],
    "whyNextTopics": [],
}
for t in new_topics:
    anc, st = set(), [t["id"]]
    while st:
        for p_ in parents_all[st.pop()]:
            if p_ not in anc:
                anc.add(p_); st.append(p_)
    id_map["whyNextTopics"].append({
        "id": t["id"], "key": next(k for k, v in key2id.items() if v == t["id"]), "name": t["name"],
        "bridgeTo": sorted(e["prerequisiteId"] for e in new_edges if e["topicId"] == t["id"] and e["prerequisiteId"] in old_by_id),
        "upstreamAncestors": sorted(a_ for a_ in anc if a_ in old_by_id),
    })
id_map["whyNextTopicCount"] = len(id_map["whyNextTopics"])
dump(id_map, os.path.join(OUT, "id-map.json"))

dump(report, os.path.join(OUT, "build-report.json"))
print(json.dumps({k: v for k, v in report.items() if k != "problems"}, indent=2, ensure_ascii=False))
if problems:
    print(f"\n✗ {len(problems)} problem(s):"); [print("  -", p) for p in problems]; sys.exit(1)
print("\n✓ extension checks passed")
