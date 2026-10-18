# Why Next?

**A family-friendly learning map for ages 11–18: what to learn next, and why.**

Why Next? breaks secondary-school maths and science into 826 small, concrete topics. Each one is linked to the topics it builds on, and every link carries a one-sentence reason saying what is reused. Pick something your child is learning and you can see what comes before it, what it unlocks, and why.

> **Credit:** Builds on the Marble Skill Taxonomy v1 © Generative Spark, Inc. (github.com/withmarbleapp/os-taxonomy), used under ODbL 1.0 (database) and CC BY-SA 4.0 (content); this derived dataset is released under the same terms and is not affiliated with or endorsed by Generative Spark, Inc.

Status: draft (`whynext-0.6`). Topics, age bands and links were written and self-reviewed but have not yet been checked by a teacher or subject expert. See [`out/REVIEW.md`](out/REVIEW.md).

## What's here
| Path | What it is |
|---|---|
| [`out/viewer.html`](out/viewer.html) | Single-file interactive viewer. It works offline, so just open it in a browser |
| [`out/README.md`](out/README.md) | Full documentation: scope, method, standards policy, validation, example chains, known gaps |
| [`out/REVIEW.md`](out/REVIEW.md) | Review log, with every finding and fix |
| `out/topics.ext.json`, `out/dependencies.ext.json`, `out/clusters.ext.json`, `out/standards.ext.json` | The Why Next? additions: 826 topics, 2031 prerequisite links, 61 parent-facing cluster summaries, and 24 NGSS high-school codes (codes only) |
| [`out/id-map.json`](out/id-map.json) | Mapping back to the original upstream topic ids. All 1590 upstream ids are kept verbatim. For each Why Next? topic it lists the upstream topics it links to directly and all upstream topics among its prerequisites |
| `out/merged/data/` | The full merged dataset (upstream v1 + Why Next?: 2416 topics, 5252 links, 244 clusters) in the upstream file layout, with its own `manifest.json` and checksums |
| `data/`, `schema/`, `scripts/validate.mjs` | The upstream v1 dataset, schemas and validator, unchanged |
| `ext/` | Sources: topic definitions (`src_*.py`), the build script and the viewer generator |
| [`UPSTREAM_README.md`](UPSTREAM_README.md), [`UPSTREAM_CITATION.cff`](UPSTREAM_CITATION.cff) | The original upstream README and citation, kept for reference |

## Open the viewer
Download or clone the repo and open `out/viewer.html` in any modern browser. Choose a topic on the left to see its prerequisite chain with the reason for each link, the cluster summary for its subject and age, and the topics it unlocks.

## Validate
Requires Node 18+ (no dependencies).
```
node scripts/validate.mjs                      # upstream v1 data in data/
(cd out/merged && node scripts/validate.mjs)   # merged Why Next? dataset
```
To rebuild everything from the sources (Python 3; `jsonschema` for the schema check):
```
python3 ext/build.py && python3 ext/check_schema.py && python3 ext/make_viewer.py
```

## Licences
Why Next? is a derived database and adapted content, released under the same licences as its upstream source:
- **Database** (structure, ids, links, topic↔standard links): Open Database License 1.0. See [`LICENSE`](LICENSE).
- **Text** (names, descriptions, evidence, prompts, reasons, cluster summaries): CC BY-SA 4.0. See [`LICENSE-CONTENT`](LICENSE-CONTENT).
- **Curriculum standards** keep their own upstream terms. NGSS is included as codes only. See [`PROVENANCE.md`](PROVENANCE.md) and the licence section of [`out/README.md`](out/README.md).

Why Next? additions © Abhinav Pandey, under the same licences.
