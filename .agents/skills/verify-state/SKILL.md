---
name: verify-state
description: Model-check Why Next's on-device state (reel rotation memory and lesson progress) with TLA+/TLC. Use when changing reelPick/reelMark/reelSeen in learn/learn_panel.js, the progress store in learn/learn_core.js, or ReelRotation/ReelCard in the SwiftUI app.
---
# Verify on-device state

1. Read `docs/STATECHART.md`. If your change alters a transition, update the chart and `verify/WhyNextState.tla` in the same commit.
2. Run `verify/run.sh`. It needs Java and `tla2tools.jar`; set `TLA2TOOLS` to its path. Install them with `apt-get install default-jre-headless` and `curl -Lo tla2tools.jar https://github.com/tlaplus/tlaplus/releases/download/v1.8.0/tla2tools.jar`.
   - With `FIXED=TRUE`, all invariants must hold.
   - With `FIXED=FALSE`, the old code must still violate `NoCrash`, `BestNumeric` and `PractisedShows`. This proves the model can still see those bugs.
3. Any new violation is a real bug until shown otherwise. Fix the code, add an e2e test (`tests/flagships3.e2e.cjs`) or a Swift test (`WhyNextCore/Tests`), then rerun.

## Coverage record
- Modelled: picker pool, restart and skip; memory corruption (bad JSON, null, array, string, object, junk files); "i of N"; status transitions; best = max; the known toggle; corrupt progress (null, junk best).
- Not modelled: review scheduling dates (`reviewDone` intervals), several topics at once (each topic is independent), and storage quota failures (writes are try/catch and ignored).
- Model in sync with code as of the commit that adds this file (`learn_panel.js` / `learn_core.js` on visual-draft, 2026-10-21).
