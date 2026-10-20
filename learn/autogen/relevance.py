"""Off-topic check: every archetype question and the worked example must use vocabulary from the topic's own
domain (names and descriptions of all topics in that domain). Words common to many domains don't count, so a
volcano lesson can't pass with a fossil question, and a handwriting lesson can't pass with a nouns-and-verbs one."""
import re, collections
def stem(w):
    w = w.lower()
    for s in ("ations", "ation", "ings", "ing", "ies", "es", "ed", "s"):
        if len(w) > len(s) + 3 and w.endswith(s): return w[: -len(s)]
    return w
def toks(s): return {stem(w) for w in re.findall(r"[A-Za-z]{4,}", s)}
class Rel:
    def __init__(self, topics):
        dv = collections.defaultdict(set)
        for t in topics: dv[(t["subject"], t["domain"])] |= toks(t["name"] + " " + t["description"])
        df = collections.Counter(w for v in dv.values() for w in v); n = len(dv)
        self.generic = {w for w, c in df.items() if c > 0.25 * n}
        self.dv = {k: v - self.generic for k, v in dv.items()}
    def ok(self, text, t, extra=""):
        own = self.dv[(t["subject"], t["domain"])] | (toks(t["name"] + " " + t["description"] + " " + extra) - self.generic)
        w = toks(text) - self.generic
        return not w or bool(w & own), sorted(w)[:6]
    def check(self, les, t, arch_items, extra=""):
        """Returns a list of problems (empty if every borrowed item and the worked example fit this topic)."""
        bad = []
        for it in arch_items:
            txt = it["prompt"] + " " + (it["choices"][it["answer"]] if it["type"] == "mc" else "")
            ok, w = self.ok(re.sub(r"\{[^}]*\}", " ", txt), t, extra)
            if not ok: bad.append(f"off-topic question for this topic: '{it['prompt'][:60]}'")
        for st in [les["worked"]["title"]] + les["worked"]["steps"]:
            if re.match(r"(Start from what you know|Next, this helps with|The new idea|In more detail|Check: explain)", st): continue   # built from this topic's own links
            ok, _ = self.ok(re.sub(r"[‘'\"][^‘'\"]*[’'\"]", " ", st), t, extra)
            if not ok: bad.append(f"worked example step does not fit this topic: '{st[:60]}'")
        return bad
