// Theme e2e: 2052 is the default, the Classic toggle switches and persists, both pass axe (WCAG 2 AA),
// and reduced motion stops the flowing edges and parallax.
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=5';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 6).join('\n      ')) } }
async function axe(p, label) {
  await p.waitForTimeout(600); if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  const r = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
  const v = r.violations.map(x => `${x.id} (${x.nodes.length}): ${x.nodes[0].target.join(' ')}`); assert.deepStrictEqual(v, [], label + ': ' + v.join('; '));
}
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } }), p = await ctx.newPage(); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.goto(URL); await p.evaluate(() => select('mt_Vn2yQGKnvi'));
  await test('2052 theme is the default, with flowing map edges', async () => {
    assert.strictEqual(await p.getAttribute('html', 'data-theme'), '2052');
    await p.waitForSelector('.wn-map line.ge'); assert.notStrictEqual(await p.$eval('.wn-map line.ge', e => getComputedStyle(e).animationName), 'none');
  });
  await test('2052 theme passes axe with a lesson open', async () => axe(p, '2052'));
  await test('Classic toggle switches, is announced, and persists after reload', async () => {
    await p.click('#themeBtn'); assert.strictEqual(await p.getAttribute('html', 'data-theme'), 'classic'); assert.strictEqual(await p.getAttribute('#themeBtn', 'aria-pressed'), 'true');
    assert.strictEqual(await p.$eval('body', e => getComputedStyle(e).backgroundColor), 'rgb(248, 250, 252)');
    await p.reload(); assert.strictEqual(await p.getAttribute('html', 'data-theme'), 'classic'); await p.evaluate(() => select('mt_Vn2yQGKnvi'));
  });
  await test('Classic theme passes axe', async () => axe(p, 'classic'));
  await test('switching back restores 2052', async () => { await p.click('#themeBtn'); assert.strictEqual(await p.getAttribute('html', 'data-theme'), '2052') });
  await test('reduced motion: no flowing edges, no card animation, no tilt', async () => {
    const r = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage(); await r.goto(URL); await r.evaluate(() => select('mt_Vn2yQGKnvi')); await r.waitForSelector('.wn-map line.ge');
    assert.strictEqual(await r.$eval('.wn-map line.ge', e => getComputedStyle(e).animationName), 'none');
    assert.strictEqual(await r.$eval('.card', e => getComputedStyle(e).animationName), 'none');
    assert.strictEqual(await r.$eval('.wn-map', e => getComputedStyle(e).transform), 'none');
  });
  await test('mobile 2052: no overflow, passes axe', async () => {
    const m = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })).newPage(); await m.goto(URL); await m.evaluate(() => select('mt_iHEB0g_nCc'));
    assert.ok(!(await m.evaluate(() => document.documentElement.scrollWidth > innerWidth))); await axe(m, 'mobile 2052');
  });
  await test('no console errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close();
  if (failures) { console.log(failures + ' theme test(s) failed'); process.exit(1) } console.log('all theme e2e tests passed');
})();
