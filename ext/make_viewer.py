"""Generate out/viewer.html: single-file Why Next? viewer (new topics plus their upstream v1 ancestors)."""
import glob
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
data = json.dumps({"nodes": nodes, "edges": edges, "clusters": clusters}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
credit = _html.escape(open("ext/CREDIT.txt", encoding="utf-8").read().strip())
# Learn: lessons, goals and verified resources from learn/, bundled so the viewer stays a single offline file
lessons = {}
for f in sorted(glob.glob("learn/lessons/*.json")):
    les = json.load(open(f, encoding="utf-8"))
    assert les["topicId"] in by, f
    lessons[les["topicId"]] = les
missing = sorted(set(lessons) - keep)
assert not missing, f"lesson topics not in the viewer: {missing}"
res = json.load(open("learn/resources.json"))
learn = json.dumps({"lessons": lessons, "goals": json.load(open("learn/goals.json")), "resources": res["resources"],
                    "resourcesVerified": res["verifiedOn"]}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
js = "".join(open(f"learn/{f}").read() for f in ("learn_gen.js", "learn_core.js", "learn_panel.js"))
html = (open("ext/viewer_template.html").read().replace("/*__DATA__*/null", data).replace("/*__CREDIT__*/", credit)
        .replace("/*__LESSONS__*/null", learn).replace("/*__LEARN_JS__*/", js).replace("/*__LEARN_CSS__*/", open("learn/learn.css").read()))
open(os.environ.get("WHYNEXT_VIEWER_OUT", "out/viewer.html"), "w").write(html)
print("viewer:", len(nodes), "nodes (", len(newset), "new )", len(edges), "edges,", len(clusters), "cluster summaries,", len(lessons), "lessons")
