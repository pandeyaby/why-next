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

Types, 45 in all (code in `learn/vis_*.js`, core helpers in `learn/vis_core.js`):

| Area | Types |
|---|---|
| Number | `counters` (count / combine / takeaway), `tenframe`, `array` (optional distributive split), `share`, `fracbar` (bar or pie, optional compare bar), `numline` |
| Algebra | `balance` (equal / solve ax+b=c with inverse operations; tips when one side changes), `bidmas` (step highlighting), `longmul`, `longdiv` |
| Calculus | `plot` (eval, line, secant with h → 0, limit, tangent with optional normal, `equal` scales), `rate`, `power` |
| Chemistry | `particles` (canvas, temperature slider), `atom`, `ptable`, `balancer` (coefficients, atom tally, scale) |
| Integration | `area` (Riemann rectangles/trapezia, signed definite integral with draggable limits, fundamental theorem with the area function, antiderivative family + C, velocity–time displacement) |
| Science | `sorter` (drag or tap cards into boxes, then check), `phscale` (universal-indicator colours), `energy` (exo/endothermic profile with a thermometer) |
| Powers and polynomials | `expo` (exponent laws as factor tiles; `mode: ladder` to zero/negative powers; `mode: root` for fractional powers), `roots` (level line on y = x² or x³), `grid` (polynomial multiplication grid) |
| Models | `symbols` (+, − and = acting on counters), `sealed` (flask on a scale: atoms rearrange, mass stays; open it to let a gas in or out), `circuit` (bulb tester), `light` (torch, material, screen and light meter), `vlt` (vertical-line test on five graphs), `polyterms` (build a polynomial; names, degree, standard form), `tiles` (algebra tiles: flip to subtract, combine, zero pairs), `vectors` (draggable displacement arrows vs added distances) |
| More number | `placevalue` (digits slide on × 10 / ÷ 10), `percent` (hundred square; `mode: change` for multipliers), `thermo` (negative temperatures, change across zero), `journey` (distance–time graph with a walker), `formula` (substitute with sliders, optional rectangle picture), `coords`, `wholes` (a ÷ b as sharing) |
| Everyday materials (`vis_world.js`) | `states` (tilt a jar: solids keep shape, liquids pour, gases spread), `separate` (sieve, filter paper, evaporate, magnet on a mixture), `matlab` (bend / water / torch / scratch / shine tests; optional job such as an umbrella), `objects` (same object, different material), `squares` (n² square and n³ cube), `slopes` (parallel and perpendicular lines) |

`learn/validate_visuals.py` whitelists options per type and checks the content: solvable balance equations,
safe evaluable expressions and functions, sane long-division and multiplication operands, locked balancers that are balanced.

Accessibility and motion: every draggable point is also a keyboard slider (`role=slider`, arrows/Home/End); every
action has a button; pointer drags use pointer capture, so touch works. `prefers-reduced-motion` makes tweens instant,
freezes the particle sim to settled frames (it still repaints at once when the theme changes), and turns off the celebration burst and glow. The particle canvas pauses off-screen.

Cues: a hint or a wrong first answer highlights the relevant part of the visual (`VIS.cue`). Topics with a lesson show
a progress ring; next-step map nodes glow; mastery shows a small celebration. Tests: `tests/visual.e2e.cjs` (in `npm run test:learn`).

Touch: `learn/touch.css` loads last and makes every lesson control at least 44 × 44 px (the periodic table scrolls sideways
on touch screens so its cells can be 44 px). Pictures use `touch-action: pan-y pinch-zoom`, so a swipe over a picture
scrolls the page and pinch-zoom works; only drag handles and sorter cards take the finger. A press within 26 px of a
handle grabs it (`slop` in `vis_core.js`). `tests/touch.e2e.cjs` drags every draggable visual with real touch events on an
iPhone profile; `tests/world.e2e.cjs` covers the round-10 visuals, the paused particle re-theme and wrapped map labels.
`scripts/persona_audit.cjs` walks all lessons as a 10-year-old (iPhone), a 16-year-old (Pixel) and a grandparent (iPad)
and reports small targets, jargon, captions without an action and weak feedback.

## Loading (fast split build)

`ext/make_viewer.py` writes `out/viewer.html` (page shell and CSS, about 15 KB), `out/wn/core.js` (compact map),
`out/wn/learn.js` (lessons and visuals) and `out/wn/app.js`, all deferred, plus 46 per-domain detail chunks
`out/wn/d*.js` (descriptions, evidence, standards, link reasons, cluster notes). The page renders the map and the
first lesson after loading only the chunks that topic needs; other chunks load when a topic needs them, and all of
them load on the first search. Chunks are plain scripts, so the viewer works on GitHub Pages and from `file://`.
`out/viewer-offline.html` is the same app in one file. Measure with `node scripts/serve_static.cjs out` (gzip, like Pages) and Lighthouse.

`python3 learn/goal_coverage.py --list` lists every topic on a goal path for an age band and whether it has a lesson; `check_all.sh` fails if a required goal/band pair (now: integration, 16–18) has a gap.

## Reel catalogue

`learn/reels/manifest.json` maps a topic id to a list of reels: `{"mt_x": [{"f": "mt_x", "t": "Title", "d": 21, "n": 1, "review": 1}]}`.
Each reel needs `<f>.mp4` (vertical, under 2 MB), `<f>.vtt` captions and `<f>.jpg` poster. All reel files, including the first topic reels (mt_*), are published with `ext/reels_publish.py` (see below), so this branch holds only `manifest.json` and `parts.json` and stays under jsDelivr's 50 MB limit (about 46 MB).
Add as many reels per topic as you like: each visit shows one the learner has not seen yet (random, remembered in localStorage
`wn_reels_seen`), "Another reel ↻" swaps, and the rotation restarts once all are seen. `review: 1` shows "science check pending".

## Split-build loading (performance)
The web build (`out/viewer.html`) keeps the first load small: `learn.js` carries only lesson stubs (title, key idea, visual spec).
Lesson bodies (`wn/b<k>.js`), the visuals bundle (`wn/vis.js`), each flagship lab plus its kit (`wn/fl_*.js`) and the reel manifest
(`wn/reels.js`) load on demand; after the page has loaded, bodies and visuals are prefetched quietly (`window.WN_WARM` is set when done).
The offline single file still inlines everything.

### Batch reels (orphan branches `reels-part-<k>`)
The animated batch reels (b001…) are not stored on this branch. jsDelivr refuses packages over 50 MB, so
`python3 ext/reels_publish.py <dir>` (dir holds `b###.mp4/.jpg/.vtt`, each mp4 under 2 MB) pushes them to orphan branches
`reels-part-1`, `reels-part-2`, … of this repo, each kept under 45 MB. New reels fill the newest part and start the next
one when it is full. The script pins each part's commit in `learn/reels/parts.json` and sets `"x": <k>` on the manifest entry.
The viewer loads them from `https://cdn.jsdelivr.net/gh/pandeyaby/why-next@<part sha>/<f>` (`window.WN_RPARTS`). The offline
single file leaves them out. Local part clones live in `/workspace/why-next-reels-parts/`.

## Flagships 13–15 (hand-built, `visual-draft`)
- `flag_energy.js` (`flagenergy`, lesson 106 Energy stores and transfers): skate ramp; gravitational ↔ kinetic swap, friction → thermal, mass does not change speed; challenge: set the drop height for a target speed (h = v² ÷ 2g).
- `flag_circ.js` (`flagcirc`, lesson 107 Current and voltage): series loop with flowing charge; current is not used up, cells add voltage, bulbs share it, meters in series / parallel; challenge: build a target V and I.
- `flag_wave.js` (`flagwave`, lesson 108 Wave properties and types): wiggle a rope by hand (the bead stays put), λ vs f, measure λ with a ruler (v = f × λ), rope vs slinky; challenge: frequency for a target wavelength.
- `flag_nuc.js` (`flagnuc`, lesson 109 Atomic number and mass number): build atoms from protons, neutrons and electrons; isotopes (C-14), reading a nuclear symbol, ions (Na⁺); challenge: build a target atom or ion from its symbol, with feedback on common slips.
Tests: `tests/flagships4.e2e.cjs`.

## Guide (`guide.js`, `guide.css`)
A corner "✦ Guide" button opens a companion built on first open (nothing loads before that). SVG face with states idle /
listening / thinking / speaking / celebrating (CSS only; off under reduced motion; light card in classic). Type, or tap 🎤
where the browser has SpeechRecognition; "Speak out loud" uses speechSynthesis at the chosen pace. Settings (name, look orb /
cat / owl, colour, tone calm / playful / socratic / concise, pace, encouragement) are saved in `localStorage.wn_guide` and run
through `GUIDE.validSettings` on load. The built-in brain is offline and answers from the open lesson (key idea, kid / adult
explanations, the current question's hint, a quiz question, "what next"). `learn_panel.js` and `flag_kit.js` emit
`wn:learn` events (open, hint, right, wrong, mastered, labwin) that the guide uses for hints and cheering.
Plug in another brain with `GUIDE.useBrain({name, reply(ctx, text) => string | Promise<string>})`; `ctx` has lesson, topic,
level, tone and settings. None is wired: an LLM brain needs a server-side proxy (no key in the page) and a cost decision.
