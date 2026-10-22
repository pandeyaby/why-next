// Flagships 13–15 (energy skate ramp, circuit bench, wave rope) and the guide: every task completes, the wave challenge
// gives misconception feedback, the guide answers from the open lesson, saves validated settings, and passes axe.
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
(async () => {
  const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1200, height: 900 } }); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.goto(URL); await p.waitForFunction('window.WN_WARM');
  const open = async id => { await p.evaluate(id => select(id), id); await p.waitForSelector('.vis.flag .fl-cv', { timeout: 10000 }); await p.waitForTimeout(300) };
  const axeOn = async sel => { if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
    for (let k = 0; k < 2; k++) { const r = await p.evaluate(s => axe.run(s, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }), sel);
      assert.deepStrictEqual(r.violations.map(v => v.id + ': ' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ')), []); await p.click('#themeBtn'); await p.waitForTimeout(200) } };
  /* Walk the lab: for each step with a task, lock a prediction, press "Show me" and expect the ✓. */
  const walk = async () => { const n = await p.$$eval('.fl-dots button, .fl-dots > *', d => d.length) || 6;
    for (let s = 0; s < n; s++) { await p.evaluate(s => document.querySelector('.fl-cv').__A.go(s), s); await p.waitForTimeout(150);
      const pr = await p.$('.fl-pred button'); if (pr) await pr.click();
      const sh = await p.$('.fl-show'); if (sh) { await sh.click(); await p.waitForFunction(() => /✓/.test((document.querySelector('.fl-task') || {}).textContent || ''), null, { timeout: 6000 }) } } };
  for (const [id, name] of [['mt_Jvg_r4yWaY', 'energy skate ramp'], ['mt_2bnXrfS4Iq', 'circuit bench'], ['mt_LxK9OKZQZX', 'wave rope'], ['mt_jg2oNKpNw9', 'atom builder']])
    await test(`flagship (${name}): every task completes with Show me, challenge present, axe in both themes`, async () => {
      await open(id); await walk(); assert.ok(await p.$('.fl-chal:not([hidden]) p'), 'challenge is shown'); await axeOn('.vis.flag') });
  await test('wave challenge: f = λ and f = v × λ get their own feedback; f = v ÷ λ wins', async () => {
    await open('mt_LxK9OKZQZX'); await p.evaluate(() => document.querySelector('.fl-cv').__A.go(5)); await p.waitForTimeout(200);
    const setF = f => p.$eval('.fl-ctl input[type=range]', (r, f) => { r.value = f; r.dispatchEvent(new Event('input', { bubbles: true })) }, f);
    const check = async () => { await p.click('.fl-chal .lbtn'); return p.textContent('.fl-chal .fl-fb') };
    // the first target (1 m) makes v × λ equal v ÷ λ, so win it and move on to the next one
    await setF(2); assert.match(await check(), /✓/); await p.click('.fl-chal .fl-fb button');
    const L = +(await p.textContent('.fl-chal p b')).match(/each wave is ([\d.]+) m/)[1]; assert.notStrictEqual(L, 1);
    await setF(L); assert.match(await check(), /same number as the wavelength/);
    await setF(2 * L); assert.match(await check(), /v × λ/);
    await setF(2 / L); assert.match(await check(), /✓/) });
  await test('guide: opens from the corner, answers from the lesson, keeps validated settings across a reload, axe', async () => {
    await open('mt_LxK9OKZQZX'); await p.click('#gdFab'); await p.waitForSelector('#guide:not([hidden])');
    await p.fill('.gd-in input', 'What is a wavelength?'); await p.press('.gd-in input', 'Enter');
    await p.waitForFunction(() => document.querySelectorAll('.gd-msg.bot').length >= 2);
    assert.match(await p.textContent('.gd-msg.bot:last-child'), /Wavelength is the length of one whole wave/);
    await p.click('.gd-set summary'); await p.selectOption('select[name=tone]', 'concise'); await p.selectOption('select[name=look]', 'cat');
    assert.strictEqual(await p.getAttribute('#guide', 'data-look'), 'cat');
    const bad = await p.evaluate(() => GUIDE.validSettings({ look: 'dragon', tone: 1, pace: 99, name: '<b>' + 'x'.repeat(40), colour: 'red' }));
    assert.deepStrictEqual([bad.look, bad.tone, bad.pace, bad.name.length, bad.colour], ['orb', 'calm', 1.4, 16, '#67e8f9']);
    await axeOn('#guide');
    await p.reload(); await p.waitForFunction('window.WN_WARM'); await p.waitForSelector('#guide:not([hidden])');
    assert.deepStrictEqual(await p.evaluate(() => [GUIDE.settings().tone, GUIDE.settings().look]), ['concise', 'cat']);
    await p.click('.gd-x'); assert.ok(await p.$eval('#guide', g => g.hidden)) });
  await test('reels: mirror list falls back fastly → raw GitHub; home has a reel strip; coming-soon pages list nearby lessons', async () => {
    const m = await p.evaluate(() => reelMirrors('https://cdn.jsdelivr.net/gh/o/r@abc123/reels/x.mp4'));
    assert.deepStrictEqual(m, ['https://cdn.jsdelivr.net/gh/o/r@abc123/reels/x.mp4', 'https://fastly.jsdelivr.net/gh/o/r@abc123/reels/x.mp4', 'https://raw.githubusercontent.com/o/r/abc123/reels/x.mp4']);
    assert.ok(await p.$('#homeReels'), 'home reel strip exists');
    await p.evaluate(() => select('mt_3BZFJQ69OK')); await p.waitForSelector('.soon-reels');
    assert.match(await p.textContent('#detail'), /Lessons you can do now, nearby|Meanwhile, lessons for a similar age/) });
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
