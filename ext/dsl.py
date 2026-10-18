"""Tiny authoring DSL for Why Next? (secondary learning map).

Each topic is declared with T(...). Prerequisite refs are either a local key
(defined somewhere in ext/src_*.py) or an existing upstream v1 id (starts with 'mt_').
"""
TOPICS = []

SUBJECT_BY_DOMAIN = {
    "Matter & Materials": "Science",
    "Energy": "Science",
    "Forces & Motion": "Science",
    "Algebra": "Mathematics",
    "Functions & Modeling": "Mathematics",
    # wave 2
    "Waves, Light & Sound": "Science",
    "Electricity & Circuits": "Science",
    "Geometry": "Mathematics",
    "Data & Statistics": "Mathematics",
    "Probability": "Mathematics",
    "Calculus": "Mathematics",
    # wave 3
    "Matrices & Complex Numbers": "Mathematics",
}

def std(code):
    if code.startswith("MS-"):
        return "ngss-ms:" + code
    if code.startswith("HS-"):
        return "ngss-hs:" + code
    if code.startswith("KS3."):
        return "uk-nc-2013:" + code
    return "ccss-math:" + code

def T(key, type_, domain, name, ages, description, evidence, prompt, standards=(), prereqs=()):
    a0, a1 = (int(x) for x in ages.split("-"))
    assert type_ in ("CONCEPTUAL", "PROCEDURAL", "REPRESENTATIONAL", "LANGUAGE", "META"), key
    assert domain in SUBJECT_BY_DOMAIN, (key, domain)
    assert "{{name}}" in prompt, key
    assert len(evidence) >= 2, key
    for p in prereqs:
        assert len(p) == 3 and p[1] in ("h", "s") and p[2], (key, p)
    TOPICS.append(dict(key=key, type=type_, domain=domain, name=name, a0=a0, a1=a1,
                       description=description, evidence=list(evidence), prompt=prompt,
                       standards=[std(s) for s in standards], prereqs=list(prereqs)))

C, P, R, L, M = "CONCEPTUAL", "PROCEDURAL", "REPRESENTATIONAL", "LANGUAGE", "META"
