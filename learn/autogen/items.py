"""Small builders for lesson items used by the starter-lesson archetypes."""
def num(prompt, answer, hint, explain, params=None, where=None):
    it = {"type": "numeric", "prompt": prompt, "answer": answer, "hint": hint, "explain": explain}
    if params: it["params"] = params
    if where: it["where"] = where
    return it
def mc(prompt, choices, hint, explain):
    return {"type": "mc", "prompt": prompt, "choices": choices, "answer": 0, "hint": hint, "explain": explain}
def V(_type, caption, **opts):
    return {"type": _type, "caption": caption, "opts": opts}
