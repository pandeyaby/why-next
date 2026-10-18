# Why Next? marketing site (DRAFT)

A static, dependency-free draft of the Why Next? marketing page. It is not deployed anywhere.

- `index.html`: the built page. It loads:
  - `assets/styles.css`
  - `assets/soften.js`
  - `assets/infer.js`
  - `assets/app.js`
  - `assets/fonts/fraunces-latin-wght.woff2` (Fraunces, SIL OFL 1.1; licence in `assets/fonts/Fraunces-OFL.txt`)
  - `data/demo.json`, lazy-loaded when the reader nears the demo
- `src/index.html`: the template. Numbers and examples are filled in from the data at build time.
- `build/build_data.py`: builds `data/demo.json` and `data/stats.json` from `../out/merged/data`. Every topic, reason, prompt, summary and number comes from the dataset.
- `build/build_site.py`: writes `index.html` and a single self-contained file to `/workspace/why-next-site.html`, with CSS, JS, font and data all inlined. Add `--noindex` to emit `<meta name="robots" content="noindex">`.
- `build/test_infer.cjs`: runs the demo for every answer combination (6 subjects × 27). It checks that there is always something up next, and that the age caps hold: up next is within about 1 year of the inferred level, coming up within about 2.

How the demo works:
- **Mastered** has two tiers:
  - *From your answers*: the "yes" topics and everything they depend on.
  - *Estimated*: earlier topics in the same strand that start younger than a "yes" topic, plus topics two or more years younger in the subject's other strands. Anything on or after a "not yet" or "getting there" topic is left out.
- The UI always shows the two tiers separately and calls the estimated tier an estimate.
- **Key Stages:** `soften.js` rewrites English Key Stage references (KS1–KS4) as ages for display only. The KS term and approximate US grades appear in a tooltip. The dataset is never changed.

```
python3 site/build/build_site.py
node site/build/test_infer.cjs          # or: node site/build/test_infer.cjs algebra
cd site && python3 -m http.server 8000  # then open http://localhost:8000
```

There are no external requests, cookies or trackers. The page works from any static host, for example GitHub Pages under `/site`, or Vercel.
