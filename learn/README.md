# Learn (prototype, not published)

Interactive lessons inside `out/viewer.html`. Clicking a topic opens a Learn panel: a kid or grown-up explanation, 3–5 practice items (multiple choice, numeric, or order/drag) with hints and instant feedback, and a mastery check: 4 questions drawn from a pool of 7, with fresh random numbers in the parameterised ones, so a retry can't be memorised. Pass with 3 of 4. A local profile (name, age band, goal, "assume I know up to age", which defaults from the age band) and per-topic progress live only in the browser's `localStorage` (`whynext.learn.v1`). There are no accounts and no backend.

- `lessons/*.json`: one lesson per topic, validated against `lesson.schema.json`.
- `goals.json`: profile goals and their target topics. `resources.json`: free links shown for topics without a lesson. Each link was fetched and its title checked on `verifiedOn`.
- `learn_core.js` (profile, progress, "learn next"), `learn_panel.js` (panel UI), `learn.css`: bundled into the viewer by `ext/make_viewer.py`.
- `validate_lessons.py`: schema and content checks, plus a check that the built viewer (`out/viewer.html`, `out/wn/`, `out/viewer-offline.html`) is up to date. It is run by `scripts/check_all.sh` and CI.

**Learn next** means a topic that isn't done yet and whose hard prerequisites are all mastered or known. "Known" comes from the learner marking a topic, or is assumed from the age band (`goals.json` → `bands`). For learners aged 10 and over, early-years skills such as handwriting are skipped (`skipFromBand10`). When a goal is set, only topics on the way to it are suggested, ranked by how many prerequisite links separate them from the goal.

**Two slices.** Lessons 01–15 (`audience: family`) go from counting to fractions to first algebra, and are written for a grown-up exploring them with a child. Lessons 16–25 (`audience: learner`) take a 10–16-year-old from order of operations to solving word problems with linear equations, and speak to the learner directly. Lessons 26–30 cover the age-10 bridge topics (long multiplication, long division with remainders, brackets, multi-step problems, writing number sentences), so the 10–12 + Algebra path has no gaps. Lessons 31–40 are a calculus slice (gradient → limits → first principles → power rule → tangents and normals), and 41–50 a chemistry slice (particles → atoms → mixtures → periodic table → conservation of mass → word and balanced equations). The Calculus and Chemistry goals target the end of each slice. Goal paths follow hard prerequisites only. When fewer than 3 topics on the goal path are ready, learn-next tops up with nearby topics that have lessons, marked "nearby".

**Parameterised items** have `params` (integer ranges), an optional `where` filter, and `{a}` / `{=expr}` placeholders. Expressions are limited to a small whitelist. The validator enumerates every combination and checks that the answer is exact, the choices are distinct, and the explanation states the answer.

**Fresh practice.** Every lesson has at least 2 parameterised practice items, and multiple-choice options are shown in a random order. "New practice questions" reshuffles and regenerates them.

**Spaced review.** Mastering a topic schedules a 2-question refresh 3 days later. Each pass pushes the next one out (7, 14, 30, then 60 days), and a miss brings it back the next day. Topics that are due appear under "Quick review". The schedule is stored only in `localStorage`.

**Order items** can be dragged with mouse, pen or touch (pointer events). The ↑/↓ buttons remain as the keyboard and fallback control.

**Determinism for tests.** `?seed=N` makes all randomness repeatable, and `?today=YYYY-MM-DD` fixes the date.

**Content review:** see `REVIEW.md`. `readability.py` holds the Flesch–Kincaid targets that the validator enforces.

**Tests:** `npm ci && npx playwright install --only-shell chromium && npm run test:learn` runs `tests/learn.e2e.cjs` (headless Chromium plus an axe-core scan). It also runs as the `learn-e2e` job in CI.

Content status: the lessons were written and checked by the author, but no teacher has reviewed them yet.

## Interactive visuals (`visual` field)

Every lesson has a required `visual`: `{ "type", "caption", "opts" }`. It renders above the tip as a
`figure.vis` with a "Try it" caption, controls and a live text description (`p.vis-desc`, `aria-live`)
that is the text alternative and updates after every action.

Types (code in `learn/vis_*.js`, core helpers in `learn/vis_core.js`):

| Area | Types |
|---|---|
| Number | `counters` (count / combine / takeaway), `tenframe`, `array` (optional distributive split), `share`, `fracbar` (bar or pie, optional compare bar), `numline` |
| Algebra | `balance` (equal / solve ax+b=c with inverse operations; tips when one side changes), `bidmas` (step highlighting), `longmul`, `longdiv` |
| Calculus | `plot` (eval, line, secant with h → 0, limit, tangent with optional normal, `equal` scales), `rate`, `power` |
| Chemistry | `particles` (canvas, temperature slider), `atom`, `ptable`, `balancer` (coefficients, atom tally, scale) |

`learn/validate_visuals.py` whitelists options per type and checks the content: solvable balance equations,
safe evaluable expressions and functions, sane long-division and multiplication operands, locked balancers that are balanced.

Accessibility and motion: every draggable point is also a keyboard slider (`role=slider`, arrows/Home/End); every
action has a button; pointer drags use pointer capture, so touch works. `prefers-reduced-motion` makes tweens instant,
freezes the particle sim to settled frames, and turns off the celebration burst and glow. The particle canvas pauses off-screen.

Cues: a hint or a wrong first answer highlights the relevant part of the visual (`VIS.cue`). Topics with a lesson show
a progress ring; next-step map nodes glow; mastery shows a small celebration. Tests: `tests/visual.e2e.cjs` (in `npm run test:learn`).
