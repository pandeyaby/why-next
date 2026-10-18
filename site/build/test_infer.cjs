const fs = require('fs'), path = require('path'), vm = require('vm');
const demo = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/demo.json'), 'utf8'));
const ctx = {}; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/infer.js'), 'utf8'), ctx);
const infer = ctx.WhyNextInfer;
const opts = ['yes', 'some', 'no']; let empty = 0, total = 0; const verbose = process.argv[2];
demo.areas.forEach((a, ai) => {
  for (const x of opts) for (const y of opts) for (const z of opts) {
    const r = infer(demo, ai, [x, y, z]); total++;
    if (!r.upNext.length || !r.comingUp.length) { empty++; console.log('EMPTY', a.id, x, y, z, r.upNext.length, r.comingUp.length); }
    if (verbose && (verbose === 'all' || verbose === a.id)) {
      const n = i => demo.nodes[i].n + ' (' + demo.nodes[i].a.join('–') + ')';
      console.log(`\n${a.id} [${x},${y},${z}] mastered ${r.masteredCount}: ${r.mastered.slice(0, 3).map(n).join('; ')}` + (r.notes.length ? ' NOTE ' + r.notes.length : ''));
      r.upNext.forEach(u => console.log('  UP ', n(u.i), u.flag || '', '| from', u.from ? demo.nodes[u.from.p].n + ': ' + u.from.r : '-'));
      r.comingUp.forEach(c => console.log('  NEXT', n(c.i), '| via', demo.nodes[c.via.p].n + ': ' + c.via.r));
    }
  }
});
console.log(`combos ${total}, with an empty list ${empty}`);
