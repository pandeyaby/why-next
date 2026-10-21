# Janitor: weekly tidy pass

Once a week, a person or a coding agent does a small, boring clean-up of this repo. The point is to stop mess from building up, not to redesign anything.

## Rules
- **Only ever open a pull request. Never merge it, never push to `main`, never force-push.** A maintainer reviews and merges.
- One PR per week, on a branch named `janitor/YYYY-MM-DD`, with the title "Janitor: weekly tidy (YYYY-MM-DD)".
- No behaviour changes. The dataset (`data/`, `out/**/*.json`), topic content, reasons and age bands are out of scope. A janitor PR must not change any generated output except by rebuilding it unchanged.
- `sh scripts/check_all.sh` must pass before the PR is opened, and CI (`.github/workflows/validate.yml`) must be green.
- Keep it small: about 300 changed lines at most. Anything bigger becomes a note in the PR for a human to plan.
- If nothing needs doing, open no PR.

## What to look at
1. **Naming:** files, functions and CSS classes that no longer match what they do, such as leftover "draft" wording or old names from before the rebrand. Use the names in `README.md` and `site/README.md`.
2. **Dead files and code:** unused scripts, assets, CSS rules, functions and stale TODOs. Before deleting anything, prove it is unused with `rg` and a rebuild. Never delete data, licences, `UPSTREAM_*` files or the credit line.
3. **Duplicated helpers:** the same logic written twice. Known pair: the Key Stage softening in `site/assets/soften.js` and its Python mirror in `site/build/build_site.py`. Keep them in step, or note how they could share one source.
4. **Oversized files:** anything on `.githooks/size-allowlist` that could be split cleanly (see the pre-commit hook's advice). Split at most one per week, and remove it from the allowlist.
5. **Docs drift:** README commands, counts and paths that no longer match the repo.
6. **Temporary patches:** for every row in the `AGENTS.md` "Temporary patches" table, run its "How to check". If the patch is no longer needed, do not undo it in the janitor PR, because undoing it changes behaviour. List it under "Patches ready to remove" in the PR for a human. Flag any workaround you find in code (`rg -i "workaround|hack|temporary|until "`) that has no row.
7. **State model:** if `learn/learn_panel.js`, `learn/learn_core.js` or the app's `ReelRotation` changed this week, run `verify/run.sh` and confirm `docs/STATECHART.md` still matches.

## PR description template
```
Weekly janitor pass. No behaviour changes.
- Naming: …
- Dead code/files removed (with how I checked they were unused): …
- Duplication: …
- Split: …
- Temporary patches checked (T1…): still needed / ready to remove: …
Checks: sh scripts/check_all.sh passed locally.
Not done / for a human: …
```
