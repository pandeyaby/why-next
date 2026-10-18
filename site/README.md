# Why Next? marketing site (DRAFT)

A static, dependency-free draft of the Why Next? marketing page. It is not deployed anywhere.

- `index.html`: the built page. It loads `assets/styles.css`, `assets/infer.js`, `assets/app.js`, and `data/demo.json` (lazy-loaded when the reader nears the demo).
- `src/index.html`: the template. Numbers and examples are filled in from the data at build time.
- `build/build_data.py`: builds `data/demo.json` and `data/stats.json` from `../out/merged/data`. Every topic, reason, prompt, summary and number comes from the dataset.
- `build/build_site.py`: runs the data build, writes `index.html`, and also writes a single self-contained file to `/workspace/why-next-site.html`.
- `build/test_infer.cjs`: runs the demo inference for every answer combination (6 subjects × 27) and checks that no result list comes back empty.

```
python3 site/build/build_site.py
node site/build/test_infer.cjs          # or: node site/build/test_infer.cjs algebra
cd site && python3 -m http.server 8000  # then open http://localhost:8000
```

There are no external requests, fonts, cookies or trackers. The page works from any static host, for example GitHub Pages under `/site`, or Vercel.
