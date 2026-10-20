// Round-12 e2e: labs reach their win state in challenge mode (animated ✓, haptic tick, Next challenge), sandbox hides
// the goal, hand-written lessons show their new lab, starter lessons lazy-load theirs, and every lab passes axe
// (WCAG 2 AA, colour contrast included) in both themes.
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
const LABS = ['problab', 'statlab', 'numzoom', 'graphlab', 'geolab', 'matrixlab', 'gaslab', 'reactlab', 'wavelab', 'forcelab', 'ecolab'];
(async () => {
  const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1200, height: 900 } }); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.addInitScript(() => { window.__buzz = []; Object.defineProperty(navigator, 'vibrate', { value: ms => (window.__buzz.push(ms), true), configurable: true }) });
  await p.goto(URL);
  const open = async (lab, sel) => { await p.evaluate(t => select(Object.keys(LEARN.L).find(id => LEARN.L[id].lab && LEARN.L[id].lab.type === t)), lab); await p.waitForSelector(sel, { timeout: 10000 }) };
  const btn = (box, label) => p.click(`${box} button:text-is("${label}")`);
  const won = async box => { await p.waitForFunction(b => /✓/.test(document.querySelector(b + ' .lab-goal').textContent), box, { timeout: 5000 }).catch(async e => { throw new Error('goal: ' + await p.textContent(box + ' .lab-goal') + ' / ' + await p.textContent(box + ' .vis-desc')) }); assert.ok(await p.$eval(box + ' figure, ' + box + ' .vis', e => e.closest('.vis, figure').classList.contains('lab-won') || !!document.querySelector('.lab-won'))) };
  await test('hand lesson (acids): lab appears below the visual; neutralise and hydrogen challenges can be won', async () => {
    await open('reactlab', '#lbox .lab-bar'); await btn('#lbox', '🎯 Challenge');
    for (let i = 0; i < 3; i++) await btn('#lbox', 'Add alkali');
    await won('#lbox'); assert.ok(await p.isVisible('#lbox button:text-is("Next challenge")'));
    assert.ok((await p.evaluate(() => window.__buzz)).includes(18), 'no haptic tick on a win');
    await btn('#lbox', 'Next challenge'); await btn('#lbox', 'Add acid'); await btn('#lbox', 'Add magnesium'); await btn('#lbox', 'Lit splint test'); await won('#lbox');
  });
  await test('graphlab: typing the right rule wins; sandbox hides the goal', async () => {
    await open('graphlab', '#lbox input[type=text]'); await btn('#lbox', '🎯 Challenge');
    const rule = await p.evaluate(() => { const l = LEARN.L[sel].lab.opts, [[x0, y0], [x1, y1]] = l.targets, m = (y1 - y0) / (x1 - x0); return `${m}*x+(${y0 - m * x0})` });
    await p.fill('#lbox input[type=text]', rule); await won('#lbox');
    await btn('#lbox', 'Sandbox'); assert.ok(!(await p.isVisible('#lbox .lab-goal')) || !/Challenge/.test(await p.textContent('#lbox .lab-goal')));
  });
  await test('starter lesson: probability lab lazy-loads and +1000 trials wins the first challenge', async () => {
    const ids = await p.evaluate(() => DATA.nodes.filter(n => !LEARN.L[n.id] && WN.flag(n.id) && /probab/i.test(n.n)).map(n => n.id)); let hit = false;
    for (const id of ids.slice(0, 8)) { await p.evaluate(id => select(id), id); await p.waitForSelector('#learn .worked', { timeout: 10000 }); if (await p.$('#vbox button:text-is("+1000")')) { hit = true; break } }
    assert.ok(hit, 'no probability starter with a problab'); await btn('#vbox', '🎯 Challenge'); await btn('#vbox', '+1000'); await won('#vbox');
    assert.match(await p.textContent('#learn'), /Worked example/);
  });
  for (const theme of ['2052', 'classic']) await test(`${theme} theme: all ${LABS.length} labs pass axe (incl. colour contrast) in challenge mode`, async () => {
    if ((await p.getAttribute('html', 'data-theme')) !== theme) await p.click('#themeBtn');
    if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
    for (const t of LABS) {
      await p.evaluate(t => { let h = document.getElementById('labt'); if (!h) { h = document.createElement('div'); h.id = 'labt'; document.getElementById('detail').prepend(h) } VIS.show(h, { type: t, caption: 'Lab test', opts: {} }) }, t);
      await p.click('#labt button:text-is("🎯 Challenge")'); await p.waitForTimeout(150);
      const r = await p.evaluate(() => axe.run('#labt', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
      assert.deepStrictEqual(r.violations.map(v => `${v.id}: ${v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ')}`), [], `${t} in ${theme}`);
    }
  });
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
