// Rank topics that have no hand-written lesson by how many later topics they unblock.
// Prints JSON: [{id, name, subject, ages, downstream, reels}], best first. Non-maths topics get a 1.25x boost
// because maths already has most of the flagships. Usage: node scripts/pipeline/rank.cjs [limit]
const path = require('path'), { chromium } = require('playwright');
const VIEWER = 'file://' + path.resolve(__dirname, '../../out/viewer.html');
(async () => {
  const limit = +(process.argv[2] || 40), browser = await chromium.launch(), page = await browser.newPage();
  await page.goto(VIEWER); await page.waitForFunction('window.WN_WARM');
  const ranked = await page.evaluate(limit => {
    const downstreamCount = id => { const seen = new Set(), stack = [id];
      while (stack.length) for (const e of POST.get(stack.pop()) || []) if (!seen.has(e.t)) { seen.add(e.t); stack.push(e.t) }
      return seen.size };
    const reelIds = new Set((window.WN_REELS_LAZY || {}).ids || Object.keys(window.WN_REELS || {}));
    return DATA.nodes.filter(n => n.new && !LEARN.has(n.id)).map(n => {
      const down = downstreamCount(n.id), maths = /math/i.test(n.s || '');
      return { id: n.id, name: n.n, subject: n.s, ages: (n.a || []).join('-'), downstream: down, reels: reelIds.has(n.id), score: down * (maths ? 1 : 1.25) } })
      .sort((a, b) => b.score - a.score).slice(0, limit) }, limit);
  console.log(JSON.stringify(ranked, null, 1)); await browser.close() })();
