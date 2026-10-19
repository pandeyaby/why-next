# Learn (prototype, not published)

Interactive lessons inside `out/viewer.html`. Clicking a topic opens a Learn panel: a kid or grown-up explanation, 3–5 practice items (multiple choice, numeric, or order/drag) with hints and instant feedback, and a mastery check: 4 questions drawn from a pool of 7, with fresh random numbers in the parameterised ones, so a retry can't be memorised. Pass with 3 of 4. A local profile (name, age band, goal, "assume I know up to age", which defaults from the age band) and per-topic progress live only in the browser's `localStorage` (`whynext.learn.v1`). There are no accounts and no backend.

- `lessons/*.json`: one lesson per topic, validated against `lesson.schema.json`.
- `goals.json`: profile goals and their target topics. `resources.json`: free links shown for topics without a lesson. Each link was fetched and its title checked on `verifiedOn`.
- `learn_core.js` (profile, progress, "learn next"), `learn_panel.js` (panel UI), `learn.css`: bundled into the viewer by `ext/make_viewer.py`.
- `validate_lessons.py`: schema and content checks, plus a check that `out/viewer.html` bundles the current lessons. It is run by `scripts/check_all.sh` and CI.

**Learn next** means a topic that isn't done yet and whose hard prerequisites are all mastered or known. "Known" comes from the learner marking a topic, or is assumed from the age band (`goals.json` → `bands`). For learners aged 10 and over, early-years skills such as handwriting are skipped (`skipFromBand10`). When a goal is set, only topics on the way to it are suggested, ranked by how many prerequisite links separate them from the goal.

**Two slices.** Lessons 01–15 (`audience: family`) go from counting to fractions to first algebra, and are written for a grown-up exploring them with a child. Lessons 16–25 (`audience: learner`) take a 10–16-year-old from order of operations to solving word problems with linear equations, and speak to the learner directly.

**Parameterised items** have `params` (integer ranges), an optional `where` filter, and `{a}` / `{=expr}` placeholders. Expressions are limited to a small whitelist. The validator enumerates every combination and checks that the answer is exact, the choices are distinct, and the explanation states the answer.

**Tests:** `npm ci && npx playwright install --only-shell chromium && npm run test:learn` runs `tests/learn.e2e.cjs` (headless Chromium plus an axe-core scan). It also runs as the `learn-e2e` job in CI.

Content status: the lessons were written and checked by the author, but no teacher has reviewed them yet.
