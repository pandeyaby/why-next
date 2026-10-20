// Round-10 e2e: the new early-years / maths visuals respond to every control, the particle picture re-themes at once
// even when paused under reduced motion, and map labels show full (wrapped) names, never cut with "…".
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
(async () => {
  const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1200, height: 900 } }); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /visual failed/.test(m.text())) errors.push(m.text()) });
  await p.emulateMedia({ reducedMotion: 'reduce' }); await p.goto(URL);
  const byType = await p.evaluate(() => { const m = {}; for (const [id, l] of Object.entries(LEARN.L)) { const t = l.visual && l.visual.type; (m[t] = m[t] || []).push(id) } return m });
  for (const t of ['states', 'separate', 'matlab', 'objects', 'squares', 'slopes']) await test(`${t}: every control changes the explanation`, async () => {
    assert.ok(byType[t] && byType[t].length, 'no lesson uses ' + t);
    for (const id of byType[t]) {
      await p.evaluate(id => select(id), id); await p.waitForSelector('#vbox .vis-desc');
      const desc = () => p.$eval('#vbox .vis-desc', e => e.textContent.trim()); assert.ok((await desc()).length > 20, id + ' has no caption');
      const btns = await p.$$('#vbox .vis button:not(.vis-cue):not([data-act])'); const seen = new Set([await desc()]);
      for (const b of btns) { if (!(await b.isVisible()) || await b.isDisabled()) continue; await b.click(); seen.add(await desc()) }
      const r = await p.$('#vbox .vis input[type=range]'); if (r) { await r.focus(); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); seen.add(await desc()) }
      assert.ok(seen.size >= Math.min(3, btns.length + (r ? 1 : 0)), `${id}: only ${seen.size} different captions from ${btns.length} buttons`);
    }
  });
  await test('particle picture re-themes at once while paused with reduced motion', async () => {
    const id = byType.particles[0]; await p.evaluate(id => select(id), id); await p.waitForSelector('#vbox canvas'); await p.waitForTimeout(200);
    const px = () => p.$eval('#vbox canvas', c => [...c.getContext('2d').getImageData(2, 2, 1, 1).data].join());
    const a = await px(); await p.click('#themeBtn'); await p.waitForTimeout(60); const b = await px(); await p.click('#themeBtn'); await p.waitForTimeout(60); const c2 = await px();
    assert.notStrictEqual(a, b, 'canvas did not change with theme'); assert.strictEqual(a, c2, 'canvas did not return');
  });
  await test('map labels are full names, wrapped, never cut with …', async () => {
    const id = 'mt_9m2jSzGnvC'; await p.evaluate(id => select(id), id); await p.waitForSelector('svg text tspan');
    const r = await p.$$eval('svg text', ts => ts.filter(t => t.querySelector('tspan')).map(t => ({ s: t.textContent, n: t.querySelectorAll('tspan').length })));
    assert.ok(r.length > 3, 'no labels'); assert.ok(!r.some(x => /…/.test(x.s)), 'cut label'); assert.ok(r.some(x => x.n > 1), 'no wrapped labels');
  });
  await test('no console errors or failed visuals', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures + ' world test(s) failed'); process.exit(1) } console.log('all world e2e tests passed');
})();
