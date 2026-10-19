# Learn (prototype, not published)

Interactive lessons inside `out/viewer.html`. Clicking a topic opens a Learn panel: a kid or grown-up explanation, 3–5 practice items (multiple choice, numeric, or order/drag) with hints and instant feedback, and a short mastery check. A local profile (name, age band, goal, "comfortable up to age") and per-topic progress live only in the browser's `localStorage` (`whynext.learn.v1`). There are no accounts and no backend.

- `lessons/*.json`: one lesson per topic, validated against `lesson.schema.json`.
- `goals.json`: profile goals and their target topics. `resources.json`: free links shown for topics without a lesson. Each link was fetched and its title checked on `verifiedOn`.
- `learn_core.js` (profile, progress, "learn next"), `learn_panel.js` (panel UI), `learn.css`: bundled into the viewer by `ext/make_viewer.py`.
- `validate_lessons.py`: schema and content checks, plus a check that `out/viewer.html` bundles the current lessons. It is run by `scripts/check_all.sh` and CI.

**Learn next** means a topic that isn't done yet and whose hard prerequisites are all mastered or known. When a goal is set, only topics on the way to it are suggested, and topics with a lesson come first.

Content status: the lessons were written and checked by the author, but no teacher has reviewed them yet.
