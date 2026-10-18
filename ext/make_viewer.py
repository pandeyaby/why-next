"""Generate out/viewer.html: single-file Why Next? viewer (new topics plus their upstream v1 ancestors)."""
import html as _html
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
          "ev": by[i].get("evidence", []), "st": by[i].get("standards", []), "c": round(by[i]["centrality"], 3), "new": i in newset}
         for i in sorted(keep, key=lambda i: (by[i]["subject"], by[i]["domain"], by[i]["ageRangeStart"], by[i]["name"]))]
edges = [{"t": e["topicId"], "p": e["prerequisiteId"], "h": e["strength"] == "hard", "r": e["reason"]}
         for e in D if e["topicId"] in keep and e["prerequisiteId"] in keep]
C = json.load(open("out/merged/data/clusters.json"))["clusters"]
clusters = {f"{c['subject']}|{c['domain']}|{c['ageRangeStart']}": c["summary"] for c in C}
data = json.dumps({"nodes": nodes, "edges": edges, "clusters": clusters}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
credit = _html.escape(open("ext/CREDIT.txt", encoding="utf-8").read().strip())
html = open("ext/viewer_template.html").read().replace("/*__DATA__*/null", data).replace("/*__CREDIT__*/", credit)
open("out/viewer.html", "w").write(html)
print("viewer:", len(nodes), "nodes (", len(newset), "new )", len(edges), "edges,", len(clusters), "cluster summaries")
