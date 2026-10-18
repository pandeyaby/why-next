// Checks that the website demo data and the app bundle give the same inference results.
// Node numbers differ between the two files, so results are compared by topic name.
// Usage: node app/tools/check_site_parity.cjs /path/to/site/data/demo.json
const fs = require('fs'), path = require('path'), vm = require('vm');
const site = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const app = JSON.parse(fs.readFileSync(path.join(__dirname, '../WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json'), 'utf8'));
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'reference/infer.js'), 'utf8'), ctx);
const infer = ctx.WhyNextInfer, opts = ['yes', 'some', 'no'];
const view = (d, ai, ans) => {
  const r = infer(d, ai, ans), n = i => d.nodes[i].n;
  return JSON.stringify({ level: r.level, c: r.confirmed.map(n), e: r.estimated.map(n).sort(),
    u: r.upNext.map(u => [n(u.i), u.flag, u.from && n(u.from.p), u.from && u.from.r]), uc: r.upNextCount,
    cu: r.comingUp.map(c => [n(c.i), n(c.via.p), c.via.r]) });
};
let same = 0, diff = 0;
site.areas.forEach((a, ai) => {
  const aj = app.areas.findIndex(x => x.id === a.id);
  for (const x of opts) for (const y of opts) for (const z of opts) {
    const s = view(site, ai, [x, y, z]), p = view(app, aj, [x, y, z]);
    if (s === p) same++; else { diff++; if (diff <= 5) console.log('DIFF', a.id, x, y, z, '\n site', s, '\n app ', p); }
  }
});
console.log(`site vs app: ${same} identical, ${diff} different`);
process.exit(diff ? 1 : 0);
