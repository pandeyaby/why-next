# Why Next?

**A family-friendly learning map for ages 11–18: what to learn next, and why.**

Why Next? breaks secondary-school maths and science into 826 small, concrete topics. Each one is linked to the topics it builds on, and every link carries a one-sentence reason saying what is reused. Pick something your child is learning and you can see what comes before it, what it unlocks, and why.

> **Credit:** Builds on the Marble Skill Taxonomy v1 © Generative Spark, Inc. (github.com/withmarbleapp/os-taxonomy), used under ODbL 1.0 (database) and CC BY-SA 4.0 (content); this derived dataset is released under the same terms and is not affiliated with or endorsed by Generative Spark, Inc.

Status: draft (`whynext-0.6`). Topics, age bands and links were written and self-reviewed but have not yet been checked by a teacher or subject expert. See [`out/REVIEW.md`](out/REVIEW.md).

**Website:** https://pandeyaby.github.io/why-next/ has a one-minute demo and kitchen-table ideas. The full map is at https://pandeyaby.github.io/why-next/out/viewer.html.

## What's here
| Path | What it is |
|---|---|
| `index.html`, [`site/`](site/README.md) | The website (GitHub Pages homepage). It is built from `site/src` and the merged data by `site/build/build_site.py` |
| [`out/viewer.html`](out/viewer.html) | Interactive viewer (fast split build: the page plus `out/wn/*.js`, detail text loaded on demand) |
| [`out/viewer-offline.html`](out/viewer-offline.html) | The same viewer in one file that works offline; just open it in a browser |
| [`out/README.md`](out/README.md) | Full documentation: scope, method, standards policy, validation, example chains, known gaps |
| [`out/REVIEW.md`](out/REVIEW.md) | Review log, with every finding and fix |
| `out/topics.ext.json`, `out/dependencies.ext.json`, `out/clusters.ext.json`, `out/standards.ext.json` | The Why Next? additions: 826 topics, 2031 prerequisite links, 61 parent-facing cluster summaries, and 24 NGSS high-school codes (codes only) |
| [`out/id-map.json`](out/id-map.json) | Mapping back to the original upstream topic ids. All 1590 upstream ids are kept verbatim. For each Why Next? topic it lists the upstream topics it links to directly and all upstream topics among its prerequisites |
| `out/merged/data/` | The full merged dataset (upstream v1 + Why Next?: 2416 topics, 5252 links, 244 clusters) in the upstream file layout, with its own `manifest.json` and checksums |
| `data/`, `schema/`, `scripts/validate.mjs` | The upstream v1 dataset, schemas and validator, unchanged |
| `ext/` | Sources: topic definitions (`src_*.py`), the build script and the viewer generator |
| [`UPSTREAM_README.md`](UPSTREAM_README.md), [`UPSTREAM_CITATION.cff`](UPSTREAM_CITATION.cff) | The original upstream README and citation, kept for reference |

## Contributing checks
- **One-time setup per clone:** `git config core.hooksPath .githooks`. This turns on the pre-commit hook, which blocks staged source files over about 20 KB (roughly 5,000 tokens). Data JSON, generated pages, the single-file HTML and binaries are exempt. Files that were already larger are listed in `.githooks/size-allowlist` and may not grow. The hook's error message explains how to split a file.
- **Run everything CI runs:** `sh scripts/check_all.sh`. This runs both validators, the schema check (needs `pip install jsonschema`), the 162-combination demo test and the deterministic-build check. CI runs the same steps on every push and pull request (`.github/workflows/validate.yml`).
- **Weekly tidy-up:** see [`JANITOR.md`](JANITOR.md). It only ever opens a PR and never merges.

## Open the viewer
Download or clone the repo and open `out/viewer.html` (or the single file `out/viewer-offline.html`) in any modern browser. Choose a topic on the left to see its prerequisite chain with the reason for each link, the cluster summary for its subject and age, and the topics it unlocks.

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

## Lessons and labs

Every one of the 1,568 topics has a lesson. 103 are hand-written (`learn/lessons/`). The other 1,465 are **starter lessons** built by
`python3 learn/autogen/starter.py --report` into `learn/auto/*.json`, and are labelled in the app as "Starter lesson … not yet reviewed by a teacher".

- **Archetypes** (`learn/autogen/arch_*.py`) supply a lab, explanations and question templates for a kind of topic (written multiplication, quadratics, acids, handwriting, friendship …).
- **Tuners** (`learn/autogen/tune*.py`) pick numbers, the worked example, lab settings and applied questions from the topic's own words, e.g. "2-digit by 1-digit" gives a 2-digit × 1-digit example.
- **Topic-data questions** come from the topic's description and prerequisite links. Recall-by-copying items are not used, and fill-the-gap distractors must match the missing word's form.
- **Checks**: each lesson passes the same schema, readability and item checks as the hand-written ones (`learn/lesson_checks.py`). A near-duplicate detector (`learn/autogen/quality.py`, word-trigram Jaccard ≤ 0.55 against siblings in the same domain) and a quality score (bar 65 = 25th percentile of the hand-written lessons; `python3 learn/autogen/quality.py`) reject weak drafts, which are regenerated.
- **Labs** (`learn/vis_lab*.js`): problab, statlab, numzoom, graphlab, geolab, matrixlab, gaslab, reactlab, wavelab, forcelab, ecolab. Each has Sandbox and 🎯 Challenge modes, an animated win and a short vibration (sound is off). A lesson can add a lab under its main visual with the optional `lab` field.
- Lessons load per domain (`out/wn/l<k>.js`) only when a topic is opened. `node tests/labs.e2e.cjs` checks challenge wins and axe in both themes.
- Phone preview of the split build: `python3 ext/make_preview.py <commit>` writes `out/preview.html`, which loads scripts from jsDelivr at that commit.

## Licences
Why Next? is a derived database and adapted content, released under the same licences as its upstream source:
- **Database** (structure, ids, links, topic↔standard links): Open Database License 1.0. See [`LICENSE`](LICENSE).
- **Text** (names, descriptions, evidence, prompts, reasons, cluster summaries): CC BY-SA 4.0. See [`LICENSE-CONTENT`](LICENSE-CONTENT).
- **Curriculum standards** keep their own upstream terms. NGSS is included as codes only. See [`PROVENANCE.md`](PROVENANCE.md) and the licence section of [`out/README.md`](out/README.md).

Why Next? additions © Abhinav Pandey, under the same licences.
