# Reference JavaScript (read-only snapshots)

`infer.js` and `soften.js` are verbatim snapshots of `site/assets/infer.js` and `site/assets/soften.js`
from the website draft (branch `site-draft`, working copy as of 2026-10-18 15:22 PDT;
infer.js sha256 `be80d45e2c0b752313dd5ba5bd015b4c3ebececa37795b98cf2bd315c7acc174`).

They are not shipped in the app. They are the source of truth that the Swift port in
`WhyNextCore` is tested against:

- `../make_golden.cjs` runs them over the app's bundled data and writes the expected results
  that `swift test` compares against (all 6 subjects x 27 answer combinations, plus text softening).
- `../check_site_parity.cjs` runs `infer.js` over the site's `demo.json` and over the app bundle
  and checks that both give the same topics (compared by name, since node numbers differ).

If the site's inference changes, copy the new files here, run `node app/tools/make_golden.cjs`,
then make `swift test` pass again by updating `Inference.swift`.
