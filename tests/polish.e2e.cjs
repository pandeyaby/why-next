// Phone polish (2026-10-26 mobile-native + break-ui pass): inputs never trigger iOS zoom, no tap flash, hover lifts only
// for a real mouse, the page draws under the notch, worst-case names and searches never widen the page at 320px, and
// prefers-reduced-motion stops every animation.
const path = require('path'), assert = require('assert'), { chromium, devices } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 8).join('\n      ')) } }
const NARROW = { viewport: { width: 320, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const pageWidth = p => p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
(async () => {
  const browser = await chromium.launch();
  for (const theme of ['2052', 'classic']) {
    const ctx = await browser.newContext(devices['iPhone 13']); await ctx.addInitScript(t => { try { localStorage.setItem('whynext.theme', t) } catch (e) {} }, theme);
    const p = await ctx.newPage(); await p.goto(URL); await p.waitForFunction('window.WN_WARM');
    await test(`iPhone 13, ${theme}: every visible text input and select is at least 16px (no iOS zoom on focus)`, async () => {
      const small = await p.$$eval('input:not([type=checkbox]):not([type=radio]):not([type=range]),select,textarea', es => es.filter(e => e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.id || e.className));
      assert.deepStrictEqual(small, []) });
    await test(`iPhone 13, ${theme}: no tap flash; viewport-fit=cover; hover rules are gated to a fine pointer`, async () => {
      const r = await p.evaluate(() => { let hov = []; for (const sh of document.styleSheets) { let rs; try { rs = sh.cssRules } catch (e) { continue }
        const walk = (rs, ok) => { for (const x of rs) { if (x.media) { walk(x.cssRules, ok || /hover/.test(x.media.mediaText)); continue } if (x.selectorText && /:hover/.test(x.selectorText) && !ok) hov.push(x.selectorText) } }; walk(rs, false) }
        return { tap: getComputedStyle(document.documentElement).webkitTapHighlightColor, vp: document.querySelector('meta[name=viewport]').content, hov } });
      assert.strictEqual(r.tap, 'rgba(0, 0, 0, 0)'); assert.match(r.vp, /viewport-fit=cover/); assert.ok(!/user-scalable=no|maximum-scale/.test(r.vp), 'zoom stays allowed'); assert.deepStrictEqual(r.hov, []) });
    await ctx.close();
  }
  const ctx = await browser.newContext(NARROW), p = await ctx.newPage(); await p.goto(URL); await p.waitForFunction('window.WN_WARM');
  await test('320px: a 40-letter name with no spaces does not widen the page', async () => {
    await p.fill('#pName', 'W'.repeat(40)); await p.press('#pName', 'Enter'); await p.waitForFunction(() => /Hi W/.test(document.querySelector('.lhome summary').textContent));
    assert.strictEqual(await pageWidth(p), 0) });
  await test('320px: a long unbroken search word wraps in the no-results note', async () => {
    await p.fill('#q', 'W'.repeat(60)); await p.waitForSelector('#list .empty'); assert.strictEqual(await pageWidth(p), 0);
    const r = await p.$eval('#list .empty b', b => [b.getBoundingClientRect().right, document.getElementById('list').getBoundingClientRect().right]); assert.ok(r[0] <= r[1] + 1, JSON.stringify(r)) });
  await ctx.close();
  const rm = await browser.newContext(Object.assign({ reducedMotion: 'reduce' }, devices['iPhone 13'])), q = await rm.newPage(); await q.goto(URL); await q.waitForFunction('window.WN_WARM');
  await test('reduced motion: no animation runs longer than a frame', async () => {
    await q.evaluate(() => GUIDE.open()); await q.waitForTimeout(300);
    const long = await q.evaluate(() => document.getAnimations().filter(a => { const t = a.effect && a.effect.getComputedTiming(); return t && (t.iterations === Infinity || t.activeDuration > 20) }).map(a => a.animationName || a.transitionProperty || 'anim'));
    assert.deepStrictEqual(long, []) });
  await browser.close(); console.log(failures ? failures + ' failed' : 'all passed'); process.exit(failures ? 1 : 0);
})();
