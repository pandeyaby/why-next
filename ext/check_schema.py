"""JSON-schema check of extension + merged files against the repo's schema/*.json."""
import json, jsonschema, sys
pairs = [("out/topics.ext.json","topics"),("out/dependencies.ext.json","dependencies"),("out/standards.ext.json","curriculum-standards"),("out/clusters.ext.json","clusters"),
 ("out/merged/data/topics.json","topics"),("out/merged/data/dependencies.json","dependencies"),
 ("out/merged/data/curriculum-standards.json","curriculum-standards"),("out/merged/data/clusters.json","clusters")]
bad = 0
for f, s in pairs:
    try:
        jsonschema.validate(json.load(open(f)), json.load(open(f"schema/{s}.schema.json"))); print("OK  ", f)
    except jsonschema.ValidationError as e:
        bad += 1; print("FAIL", f, e.message[:300])
sys.exit(1 if bad else 0)
