const fs = require('fs'), path = require('path'), vm = require('vm');
const demo = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/demo.json'), 'utf8'));
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/infer.js'), 'utf8'), ctx);
const infer = ctx.WhyNextInfer;
const opts = ['yes', 'some', 'no']; let empty = 0, total = 0, bad = 0; const verbose = process.argv[2];
demo.areas.forEach((a, ai) => {
  for (const x of opts) for (const y of opts) for (const z of opts) {
    const r = infer(demo, ai, [x, y, z]); total++;
    const tooOld = r.comingUp.filter(c => demo.nodes[c.i].a[0] > r.level + 2).length + r.upNext.filter(u => demo.nodes[u.i].a[0] > r.level + 1 && !u.flag).length;
    if (tooOld) { bad++; console.log('AGE CAP VIOLATION', a.id, x, y, z); }
    if (!r.upNext.length) { empty++; console.log('EMPTY', a.id, x, y, z, r.upNext.length, r.comingUp.length); }
    if (verbose && (verbose === 'all' || verbose === a.id)) {
      const n = i => demo.nodes[i].n + ' (' + demo.nodes[i].a.join('–') + ')';
      console.log(`\n${a.id} [${x},${y},${z}] L=${r.level} mastered ${r.masteredCount} (confirmed ${r.confirmed.length}, est ${r.estimated.length}): ${r.confirmed.slice(0, 3).map(n).join('; ')}` + (r.notes.length ? ' NOTE ' + r.notes.length : ''));
      r.upNext.forEach(u => console.log('  UP ', n(u.i), u.flag || '', '| from', u.from ? demo.nodes[u.from.p].n + ': ' + u.from.r : '-'));
      r.comingUp.forEach(c => console.log('  NEXT', n(c.i), '| via', demo.nodes[c.via.p].n + ': ' + c.via.r));
    }
  }
});
console.log(`combos ${total}, with an empty list ${empty}, age-cap violations ${bad}`);
