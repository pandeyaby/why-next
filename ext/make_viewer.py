"""Generate out/viewer.html: single-file viewer of the secondary extension subgraph."""
import json
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
          "ev": by[i].get("evidence", []), "st": by[i].get("standards", []), "new": i in newset}
         for i in sorted(keep, key=lambda i: (by[i]["subject"], by[i]["domain"], by[i]["ageRangeStart"], by[i]["name"]))]
edges = [{"t": e["topicId"], "p": e["prerequisiteId"], "h": e["strength"] == "hard", "r": e["reason"]}
         for e in D if e["topicId"] in keep and e["prerequisiteId"] in keep]
data = json.dumps({"nodes": nodes, "edges": edges}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
html = open("ext/viewer_template.html").read().replace("/*__DATA__*/null", data)
open("out/viewer.html", "w").write(html)
print("viewer:", len(nodes), "nodes (", len(newset), "new )", len(edges), "edges")
