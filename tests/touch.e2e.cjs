// Touch e2e: on a phone profile, every draggable visual (each lesson whose picture has a drag handle, and the
// card sorter) is dragged with real touch events and must react; swiping over a picture still scrolls the page;
// pinch-zoom is allowed; and lesson controls are at least 44 × 44 px.
const path = require('path'), assert = require('assert');
const { chromium, devices } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=5';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 30).join('\n      ')) } }
async function touchDrag(cdp, x, y, dx, dy, dy2 = 0) {
  const pt = (X, Y) => [{ x: X, y: Y, id: 1, radiusX: 4, radiusY: 4, force: 1 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(x, y) });
  for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(x + dx * i / 8, y + dy * i / 8) });
  for (let i = 1; i <= 8 && dy2; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(x + dx, y + dy + dy2 * i / 8) });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
}
(async () => {
  const browser = await chromium.launch(), ctx = await browser.newContext({ ...devices['iPhone 13'] }), p = await ctx.newPage(), cdp = await ctx.newCDPSession(p); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' || (m.type() === 'warning' && /visual failed/.test(m.text()))) errors.push(m.text()) });
  // batch reels come from jsDelivr; serve them from the local part clones when present so slow CDN loads don't shift timing
  const PJ = require('../learn/reels/parts.json'), fs = require('fs'), RP = '/workspace/why-next-reels-parts/';
  await p.route(/cdn\.jsdelivr\.net\/gh\/pandeyaby\/why-next@(\w+)\/([^/?]+)$/, r => { const [, sha, f] = r.request().url().match(/@(\w+)\/([^/?]+)$/), k = Object.values(PJ).find(v => v.sha === sha), fp = k && RP + k.branch + '/' + f;
    return fp && fs.existsSync(fp) ? r.fulfill({ path: fp }) : r.continue() });
  await p.goto(URL);await p.waitForFunction("window.WN_WARM"); const ids = await p.evaluate(() => Object.keys(LEARN.L)); const dragged = [], none = [];
  await test('every draggable visual responds to a touch drag', async () => {
    const bad = [];
    for (const id of ids) {
      await p.evaluate(id => select(id), id); await p.waitForSelector('#vbox .vis'); await p.waitForTimeout(80);
      const snap = () => p.$eval('#vbox .vis', v => v.querySelector('.vis-desc').textContent + v.querySelector('svg, .vis-sort')?.innerHTML);
      let h = null; for (const c of await p.$$('#vbox svg [style*="touch-action: none"]')) if (await c.isVisible()) { h = c; break } const card = await p.$('#vbox .vis-sort .vis-card');
      if (!h && !card) { none.push(id); continue }
      if (await p.evaluate(id => /"mode":"combine"/.test(JSON.stringify(LEARN.L[id].visual)), id)) { none.push(id); continue } // counters in 'combine' mode are tap-only by design
      const el = h || card; await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(50);
      const before = await snap(), r = await el.boundingBox();
      if (h) { let after = before;
        for (const [dx, dy] of [[60, 0], [0, -50], [-90, 40], [0, 90]]) { const q = await h.boundingBox(); await touchDrag(cdp, q.x + q.width / 2, q.y + q.height / 2, dx, dy); after = await snap(); if (after !== before) break }
        // the picture is pan-y, so a drag that starts straight down can turn into a page scroll; a real finger
        // usually starts a little sideways, which keeps the gesture on the handle (sideways first, then down)
        if (after === before) { const q = await h.boundingBox(); await touchDrag(cdp, q.x + q.width / 2, q.y + q.height / 2, 30, 0, 100); after = await snap() }
        if (after === before) bad.push(`${id} (${await p.$eval('#vbox .vis', e => e.dataset.vtype)})`); else dragged.push(id) }
      else { const binEl = await p.$('#vbox .vis-bin'); await card.evaluate(e => e.scrollIntoView({ block: 'start' })); await p.evaluate(() => scrollBy(0, -60)); await p.waitForTimeout(50); const bin = await binEl.boundingBox(); const r2 = await card.boundingBox(); if (r2) Object.assign(r, r2); await touchDrag(cdp, r.x + r.width / 2, r.y + r.height / 2, bin.x + bin.width / 2 - r.x - r.width / 2, bin.y + 30 - r.y - r.height / 2);
        const moved = await p.$eval('#vbox .vis-bin', b => b.querySelectorAll('.vis-card').length); if (!moved) bad.push(id + ' (sorter) ' + JSON.stringify([r, bin])); else dragged.push(id) }
    }
    console.log(`      touch-dragged ${dragged.length} visuals; ${none.length} have no drag (buttons/sliders only)`); assert.deepStrictEqual(bad, []);
  });
  await test('swiping up over a picture scrolls the page', async () => {
    await p.evaluate(() => select('mt_iHEB0g_nCc')); await p.waitForSelector('#vbox .vis-svg'); const s = await p.$('#vbox .vis-svg'); await s.scrollIntoViewIfNeeded();
    const pos = () => p.evaluate(() => scrollY + [...document.querySelectorAll('*')].reduce((a, e) => a + e.scrollTop, 0));
    await p.evaluate(() => scrollTo(0, 0)); await s.scrollIntoViewIfNeeded(); const r = await s.boundingBox(), y0 = await pos();
    await touchDrag(cdp, Math.round(r.x + 30), Math.round(r.y + r.height / 2), 0, -150); await p.waitForTimeout(300);
    assert.ok((await pos()) > y0 + 50, 'page did not scroll');
  });
  await test('pinch-zoom is allowed (no maximum-scale or user-scalable=no)', async () => { const m = await p.getAttribute('meta[name=viewport]', 'content'); assert.ok(!/user-scalable\s*=\s*no|maximum-scale/.test(m), m) });
  await test('lesson controls are at least 44 × 44 px', async () => {
    const small = [];
    for (const id of ids.filter((_, i) => i % 7 === 0)) { await p.evaluate(id => select(id), id); await p.waitForSelector('#vbox .vis'); await p.waitForTimeout(700);
      small.push(...await p.$$eval('.learn button, .learn input, .learn select, .learn .vis-card', es => es.filter(e => { const q = e.getBoundingClientRect(); return q.width && (q.width < 44 || q.height < 44) && !e.closest('svg') && !e.classList.contains('vis-el') }).map(e => (e.textContent || e.className).trim().slice(0, 20)))) }
    assert.deepStrictEqual([...new Set(small)], []);
  });
  await test('no console errors or failed visuals', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures + ' touch test(s) failed'); process.exit(1) } console.log('all touch e2e tests passed');
})();
