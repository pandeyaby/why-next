// Rank topics that have no hand-written lesson, balancing coverage across age bands and subjects.
// Prints JSON: [{id, name, subject, ages, downstream, reels, score}], best first. Usage: node scripts/pipeline/rank.cjs [limit]
// Each pick goes to the (age band x subject) cell with the fewest flagship lessons so far, so every band from
// 2-4 to 16-18 and every subject (Maths, Science, English, Learning to Learn, Personal & Social) fills evenly.
// Inside a cell the most foundational topic wins: fewest hard prerequisites still without a lesson, then the
// youngest starting age, then the most later topics unblocked. Bands use the topic's lower age.
const path = require('path'), { chromium } = require('playwright');
const VIEWER = 'file://' + path.resolve(__dirname, '../../out/viewer.html');
(async () => {
  const limit = +(process.argv[2] || 40), browser = await chromium.launch(), page = await browser.newPage();
  await page.goto(VIEWER); await page.waitForFunction('window.WN_WARM');
  const ranked = await page.evaluate(limit => {
    const downstreamCount = id => { const seen = new Set(), stack = [id];
      while (stack.length) for (const e of POST.get(stack.pop()) || []) if (!seen.has(e.t)) { seen.add(e.t); stack.push(e.t) }
      return seen.size };
    const band = n => { const a = (n.a || [18])[0]; return a < 5 ? '2-4' : a < 7 ? '5-7' : a < 11 ? '7-11' : a < 14 ? '11-14' : a < 16 ? '14-16' : '16-18' };
    const cell = n => band(n) + '|' + (n.s || '');
    const reelIds = new Set((window.WN_REELS_LAZY || {}).ids || Object.keys(window.WN_REELS || {}));
    const have = {};
    DATA.nodes.forEach(n => { if (LEARN.has(n.id)) have[cell(n)] = (have[cell(n)] || 0) + 1 });
    // maths/science candidates are the empty ("new") topics; the other subjects have no flagship lessons yet at all
    const pool = DATA.nodes.filter(n => !LEARN.has(n.id) && (n.new || !/math|science/i.test(n.s || ''))).map(n => {
      const unmet = (PRE.get(n.id) || []).filter(e => e.h && !LEARN.has(e.p)).length;
      return { n, unmet, down: downstreamCount(n.id) } });
    const out = [];
    while (out.length < limit && pool.length) {
      pool.sort((x, y) => (have[cell(x.n)] || 0) - (have[cell(y.n)] || 0) || x.unmet - y.unmet
        || (x.n.a || [18])[0] - (y.n.a || [18])[0] || y.down - x.down);
      const { n, unmet, down } = pool.shift(), k = cell(n);
      out.push({ id: n.id, name: n.n, subject: n.s, ages: (n.a || []).join('-'), downstream: down, reels: reelIds.has(n.id),
        score: -(have[k] || 0), cell: k, unmet });
      have[k] = (have[k] || 0) + 1 }
    return out }, limit);
  console.log(JSON.stringify(ranked, null, 1)); await browser.close() })();
