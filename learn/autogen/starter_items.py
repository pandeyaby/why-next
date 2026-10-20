"""Text helpers and topic-data questions for starter.py."""
import re
from items import mc
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

