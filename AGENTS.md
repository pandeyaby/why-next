# Agent rules for this repo

These rules are for coding agents and people working on Why Next. Weekly tidy-up rules are in [JANITOR.md](JANITOR.md). The statecharts for on-device state are in [docs/STATECHART.md](docs/STATECHART.md).

## Git
- Work on a non-`main` branch. Never push to `main` without the maintainer's explicit yes.
- Never force-push, never use `--no-verify`, and never touch the `origin` remote (the upstream taxonomy repo).
- Never print, log or commit a token. Scripts that run git with auth must strip the header from error output (see `ext/reels_publish.py`).
- Media never goes into the code tree. Reels are published to the `reels-part-N` orphan branches with `ext/reels_publish.py`, and each part must stay under 45 MB.

## Code standards (from the 2026-10-21 retro)
1. **Never trust stored data.** Anything read from `localStorage`, `@AppStorage` or a file can be null, an array, a string or junk. Check its shape on read, drop bad entries one by one, and never let one bad entry wipe the rest. Model new persisted state in `verify/` (skill: `.agents/skills/verify-state`).
2. **Persistence is a decision, so test it.** A storage choice such as `.nonPersistent()` or a key name changes what users keep. Leave a comment saying why, and add a check that state survives a reopen.
3. **Wait for explicit readiness signals.** Don't infer readiness from globals that may be `const` (for example, `LEARN` is not on `window`). Use `window.WN_WARM`, or add a proper event.
4. **Tests read counts from the data, never hard-code them.** For example, N comes from `WN_REELS`, not from a number in the test. Prefer `waitForSelector`/`waitForFunction` over fixed sleeps; fixed sleeps flake when the box is busy.
5. **Edit config files, don't overwrite them.** Append to `.gitignore` and similar files. A `cat >` on an existing file has already lost data once.
6. **A fix for a real bug comes with a test that fails without it.** Run that test on the old code once before you commit.
7. **Touch input on SVG needs `touchstart` `preventDefault`.** `touch-action` on SVG children is ignored. Use `holdPan` in `vis_core.js`, and test drags with a straight vertical gesture.
8. **Readable over terse in new code.** `learn_panel.js` is dense one-liners; new logic with more than one branch goes in a named function with a one-line comment.
9. **Every workaround gets a Temporary patches entry** (see below), in the same commit as the workaround.

## Temporary patches
Any workaround for an upstream bug, a third-party limit or a temporary condition **must** add an entry here, in the same commit, that says:
- what it is
- what to undo
- when to undo it
- how to check whether it is still needed

The weekly janitor pass re-checks every entry (JANITOR.md, item 6).

| # | Patch (where) | Why | Undo when | How to check | Added |
|---|---|---|---|---|---|
| T1 | **Reels on orphan branches** `reels-part-1/2/3`, served via jsDelivr `gh/pandeyaby/why-next@<sha>/` (`learn/reels/parts.json`, `ext/reels_publish.py`, `WN_RPARTS` in `ext/make_viewer.py`) | jsDelivr refuses GitHub packages over 50 MB (403). | jsDelivr lifts the limit, or reels move to a real media host (R2, S3 or Pages LFS). Then serve one base URL, drop `parts.json` and `"x"`, and delete the orphan branches. | `curl -sI https://cdn.jsdelivr.net/gh/pandeyaby/why-next@main/README.md`, then try a >50 MB test ref; check jsDelivr docs for "package size limit". | 2026-10-21 |
| T2 | **App opens a topic by polling** `typeof select==='function' && window.WN_WARM`, then calls `select(WN_TOPIC)` (SHIM in `app/tools/sync_content.py`, app-draft) | The viewer has no "ready" event or `?topic=` deep link. | The viewer emits a `wn:ready` event or supports `#topic=<id>`. Switch the shim to that and delete the poll. | `rg "wn:ready\|#topic=" learn ext`. If found, the poll can go. | 2026-10-21 |
| T3 | **Captions in the bundled web view** come from `reels/captions.js` (`WN_VTT`), and the shim rewrites `<track src>` to blob URLs (`sync_content.py`) | WKWebView blocks `<track>` loads from `file://`. | The app serves Web/ through a `WKURLSchemeHandler` (an `app://` scheme). Then the tracks load normally; delete `captions.js` and the rewrite. | In the app, remove the rewrite and open a reel: if captions still show, undo the patch. | 2026-10-21 |
| T4 | **Possible macOS sandbox issue**: WKWebView on macOS may need the `com.apple.security.network.client` entitlement (even for file:// pages its WebContent process may make network calls; external links open in the browser) | Untested on a real Mac: this box has no macOS. | Verified on a Mac. If lessons and reels work without it, close this entry. If not, add the entitlement in `project.yml` and record that here. | Build the macOS target in Xcode, open a lesson and play a reel; look for sandbox denials in Console.app. | 2026-10-21 |
| T5 | **Reel mirror fallback** `reelMirrors()` / `WN_reelImgErr` in `learn/learn_panel.js`: Supabase Storage (`REEL_HOST`, primary since 2026-10-22) → cdn.jsdelivr.net → fastly.jsdelivr.net → raw.githubusercontent.com | Reels depend on one third-party CDN (see T1). If it is blocked (school networks) or down, users see no reels. | Reels are served from the site itself or a real media host (see T1). Then drop the mirror list and the onerror retry. | `rg reelMirrors learn`. If WN_RPARTS no longer points at jsDelivr, the patch can go. | 2026-10-22 |
