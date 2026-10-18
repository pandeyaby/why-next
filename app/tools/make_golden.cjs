// Writes WhyNextCore/Tests/WhyNextCoreTests/Fixtures/golden.json: the website's inference
// (reference/infer.js) and text softening (reference/soften.js) run over the app's bundled data.
// Usage: node app/tools/make_golden.cjs
const fs = require('fs'), path = require('path'), vm = require('vm');
const APP = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(APP, 'WhyNextCore/Sources/WhyNextCore/Resources/whynext-data.json'), 'utf8'));
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'reference/infer.js'), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'reference/soften.js'), 'utf8'), ctx);
const infer = ctx.WhyNextInfer, soften = ctx.WhyNextSoften;
const opts = ['yes', 'some', 'no'];
const cases = [];
data.areas.forEach((a, ai) => {
  for (const x of opts) for (const y of opts) for (const z of opts) {
    const r = infer(data, ai, [x, y, z]);
    cases.push({
      area: a.id, answers: [x, y, z], level: r.level,
      confirmed: r.confirmed, estimated: r.estimated, masteredCount: r.masteredCount,
      upNext: r.upNext.map(u => ({ i: u.i, flag: u.flag, from: u.from ? u.from.p : null, reason: u.from ? u.from.r : null })),
      upNextAll: r.upNextAll, upNextCount: r.upNextCount,
      comingUp: r.comingUp.map(c => ({ i: c.i, via: c.via.p, reason: c.via.r })),
      comingUpAll: r.comingUpAll,
      notes: r.notes.map(n => ({ earlier: n.earlier, later: n.later })),
      baseline: r.baseline, baselineCovered: r.baselineCovered,
    });
  }
});
// Text softening: the app shows plain text, so strip the HTML the site adds (tooltips) and unescape.
const plain = h => h.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const texts = new Set();
data.reasons.forEach(s => texts.add(s));
data.clusters.forEach(c => texts.add(c.s));
data.kitchen.forEach(k => { texts.add(k.s); k.ev.forEach(e => texts.add(e)); });
data.areas.forEach(a => Object.values(a.topics).forEach(t => { texts.add(t.desc); if (t.ev) texts.add(t.ev); }));
['KS3 students meet this', 'from KS2', 'in KS4.', 'an upper KS2 idea', 'In Year 9 and Year 10', 'the KS3 curriculum', 'by US KS4'].forEach(s => texts.add(s));
// "out"/"outNoSentence" are left out when equal to the input, to keep the fixture small.
const soft = [...texts].sort().map(s => {
  const o = { in: s }, a = plain(soften(s)), b = plain(soften(s, { sentence: false }));
  if (a !== s) o.out = a;
  if (b !== s) o.outNoSentence = b;
  return o;
});
const out = path.join(APP, 'WhyNextCore/Tests/WhyNextCoreTests/Fixtures/golden.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ inference: cases, soften: soft }) + '\n');
const changed = soft.filter(s => s.out !== undefined).length;
console.log(`golden.json: ${cases.length} inference cases, ${soft.length} texts (${changed} changed by softening)`);
