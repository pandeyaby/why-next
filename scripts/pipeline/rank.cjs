// Rank topics that have no hand-written lesson, balancing coverage across age bands and subjects.
// Prints JSON: [{id, name, subject, ages, downstream, reels, score}], best first. Usage: node scripts/pipeline/rank.cjs [limit]
// Each pick goes to the (age band x subject) cell with the fewest flagship lessons so far, so every band from
// 2-4 to 16-18 and every subject (Maths, Science, English, Learning to Learn, Personal & Social) fills evenly.
// Inside a cell the most foundational topic wins: fewest hard prerequisites still without a lesson, then the
// youngest starting age, then the most later topics unblocked. Bands use the topic's lower age.
// Age mix (Abhinav, Oct 27 2026): the list comes in groups of three. Slots 1 and 2 of every group go to ages 2-11
// (bands 2-4, 5-7, 7-11) and only slot 3 may be any band, so at least 2 of every 3 picks are for ages 2-11 and at most
// 1 of every 3 is for 16-18. A run that builds the top 2-3 queued topics therefore always holds to that rule.
// Topics marked "skipped" in learn/pipeline/queue.json (they overlap an existing lesson) are left out of the pool, so they
// neither get re-picked nor count as covering their cell.
const path = require('path'), fs = require('fs'), { chromium } = require('playwright');
const QUEUE = path.resolve(__dirname, '../../learn/pipeline/queue.json');
const SKIP = (() => { try { return (JSON.parse(fs.readFileSync(QUEUE, 'utf8')).skipped || []).map(s => s.topic) } catch (e) { return [] } })();
const VIEWER = 'file://' + path.resolve(__dirname, '../../out/viewer.html');
(async () => {
  const limit = +(process.argv[2] || 40), browser = await chromium.launch(), page = await browser.newPage();
  await page.goto(VIEWER); await page.waitForFunction('window.WN_WARM');
  const ranked = await page.evaluate(([limit, skipIds]) => {
    const skip = new Set(skipIds);
    const downstreamCount = id => { const seen = new Set(), stack = [id];
      while (stack.length) for (const e of POST.get(stack.pop()) || []) if (!seen.has(e.t)) { seen.add(e.t); stack.push(e.t) }
      return seen.size };
    const band = n => { const a = (n.a || [18])[0]; return a < 5 ? '2-4' : a < 7 ? '5-7' : a < 11 ? '7-11' : a < 14 ? '11-14' : a < 16 ? '14-16' : '16-18' };
    const cell = n => band(n) + '|' + (n.s || '');
    const reelIds = new Set((window.WN_REELS_LAZY || {}).ids || Object.keys(window.WN_REELS || {}));
    const have = {}, size = {};
    DATA.nodes.forEach(n => { size[cell(n)] = (size[cell(n)] || 0) + 1; if (LEARN.has(n.id)) have[cell(n)] = (have[cell(n)] || 0) + 1 });
    // favour the cell with the smallest share of its topics covered, so big and small cells fill at the same rate
    const share = k => (have[k] || 0) / (size[k] || 1);
    // maths/science candidates are the empty ("new") topics; the other subjects have no flagship lessons yet at all
    const pool = DATA.nodes.filter(n => !LEARN.has(n.id) && !skip.has(n.id) && (n.new || !/math|science/i.test(n.s || ''))).map(n => {
      const unmet = (PRE.get(n.id) || []).filter(e => e.h && !LEARN.has(e.p)).length;
      return { n, unmet, down: downstreamCount(n.id) } });
    const out = [], young = x => (x.n.a || [18])[0] < 11, senior = x => (x.n.a || [18])[0] >= 16;
    while (out.length < limit && pool.length) {
      pool.sort((x, y) => share(cell(x.n)) - share(cell(y.n)) || x.unmet - y.unmet
        || (x.n.a || [18])[0] - (y.n.a || [18])[0] || y.down - x.down);
      // slots 1-2 of each group of three: best 2-11 topic (else best non-16-18); slot 3: best of any band
      const slot = out.length % 3;
      let i = slot < 2 ? pool.findIndex(young) : 0;
      if (i < 0) i = pool.findIndex(x => !senior(x));
      if (i < 0) i = 0;
      const { n, unmet, down } = pool.splice(i, 1)[0], k = cell(n);
      out.push({ id: n.id, name: n.n, subject: n.s, ages: (n.a || []).join('-'), downstream: down, reels: reelIds.has(n.id),
        score: -Math.round(share(k) * 1000) / 1000, cell: k, unmet });
      have[k] = (have[k] || 0) + 1 }
    return out }, [limit, SKIP]);
  console.log(JSON.stringify(ranked, null, 1)); await browser.close() })();
