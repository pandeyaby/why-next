// "Learn next" badges: 'lesson' when a full lesson exists, 'video' when only a reel exists, 'coming soon' otherwise.
// Regression: reel-only topics used to say "lessons coming". Expected badges come from LEARN data and WN_REELS(_LAZY).
// Set SHOTS=dir to save an iPhone 13 screenshot of the list.
const path = require('path'), assert = require('assert');
const { chromium, devices } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=42';
(async () => {
  const browser = await chromium.launch(); let failures = 0;
  const ctx = await browser.newContext({ ...devices['iPhone 13'] }); const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL); await p.waitForFunction('window.WN_WARM');
  const ages = await p.$$eval('#pAge option', o => o.map(x => x.value).filter(Boolean));
  for (const age of ages) {
    await p.selectOption('#pAge', age);
    await p.waitForSelector('ol.nextl li');
    const rows = await p.$$eval('ol.nextl li', ls => ls.map(li => { const id = li.querySelector('[data-go]').dataset.go, t = li.querySelector('.tag').textContent;
      const R = window.WN_REELS, Z = window.WN_REELS_LAZY, reel = R ? !!(R[id] && R[id].length) : !!(Z && Z.ids.includes(id));
      return { id, t, reel } }));
    const has = await p.evaluate(ids => ids.map(id => LEARN.has ? LEARN.has(id) : null), rows.map(r => r.id));
    rows.forEach((r, i) => {
      try {
        assert.notStrictEqual(r.t, 'lessons coming', `${age} ${r.id}: old wording`);
        if (r.t === 'lesson') return;
        if (has[i] === true) throw new Error(`${age} ${r.id}: has lesson but shows ${r.t}`);
        assert.strictEqual(r.t, r.reel ? 'video' : 'coming soon', `${age} ${r.id}`);
      } catch (e) { failures++; console.log('FAIL', e.message) }
    });
    if (age === ages[0] && process.env.SHOTS) { await p.locator('#lnH').scrollIntoViewIfNeeded(); await p.locator("ol.nextl").first().screenshot({ path: path.join(process.env.SHOTS, "next_badges_phone.png") }) }
  }
  if (errs.length) { failures++; console.log('FAIL page errors', errs) }
  await browser.close(); console.log(failures ? `${failures} failed` : 'all passed'); process.exit(failures ? 1 : 0);
})();
