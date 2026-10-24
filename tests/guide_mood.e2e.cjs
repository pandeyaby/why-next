// Guide learner model (learn/guide_mood.js): behaviour signals and mood check-ins change the inferred state, the Guide's
// face and its offers; "About me" requirements change the page; the profile survives a reload, is validated, can be
// turned off and reset. Desktop and iPhone 13, both themes, axe on the open Guide.
const path = require('path'), assert = require('assert');
const { chromium, devices } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
const LESSON = 'mt_LxK9OKZQZX';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
const VPS = { desktop: { viewport: { width: 1280, height: 900 } }, 'iPhone 13': devices['iPhone 13'] };
const emit = (p, d) => p.evaluate(d => document.dispatchEvent(new CustomEvent('wn:learn', { detail: d })), d);
const mood = p => p.getAttribute('#guide', 'data-mood');
const lastBot = p => p.$$eval('.gd-msg.bot', m => m[m.length - 1].textContent);
const botCount = p => p.$$eval('.gd-msg.bot', m => m.length);
const waitBot = (p, n, re) => p.waitForFunction(([n, re]) => { const m = document.querySelectorAll('.gd-msg.bot'); return m.length > n && new RegExp(re).test(m[m.length - 1].textContent) }, [n, re]);
const openDetails = (p, sel) => p.$eval(sel, d => { d.open = true });
async function axeOn(p, sel, label) {
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  const r = await p.evaluate(s => axe.run(s, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }), sel);
  assert.deepStrictEqual(r.violations.map(v => v.id + ': ' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ')), [], label);
}
async function fresh(browser, vp, extra = {}) {
  const ctx = await browser.newContext(Object.assign({}, VPS[vp], extra)), p = await ctx.newPage(); p.errors = [];
  p.on('pageerror', e => p.errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errors.push(m.text()) });
  return p;
}
async function openGuide(p) {
  await p.goto(URL); await p.waitForFunction('window.WN_WARM');
  await p.evaluate(id => select(id), LESSON); await p.waitForSelector('#learnH');
  await p.evaluate(() => GUIDE.open()); await p.waitForSelector('#guide:not([hidden]) .gm-now');
}
(async () => {
  const browser = await chromium.launch();
  for (const vp of Object.keys(VPS)) {
    const p = await fresh(browser, vp); await openGuide(p);
    await test(`${vp}: Guide shows a live state line and mood check-in; starts focused`, async () => {
      assert.strictEqual(await mood(p), 'focused'); assert.match(await p.textContent('.gm-now'), /Focused/);
      assert.strictEqual(await p.$$eval('.gm-mood', b => b.length), 6) });
    await test(`${vp}: two wrong answers → struggling face, gentle offer, and "Worked example" answers from the lesson`, async () => {
      await emit(p, { kind: 'open', id: LESSON }); await emit(p, { kind: 'wrong', id: LESSON }); await emit(p, { kind: 'wrong', id: LESSON });
      assert.strictEqual(await mood(p), 'struggling'); assert.match(await p.textContent('.gm-why'), /2 wrong answers in a row/);
      assert.strictEqual(await p.getAttribute('#gdFab', 'data-mood'), 'struggling');
      let n = await botCount(p); await p.click('.gm-offer .gd-chip:has-text("Worked example")'); await waitBot(p, n, 'Worked example|in steps');
      assert.match(await lastBot(p), /Answer:|1\./) });
    await test(`${vp}: rapid repeated clicks on one spot read as frustration; offers a break`, async () => {
      for (let i = 0; i < 7; i++) await p.click('#learnH', { delay: 0 });
      assert.strictEqual(await mood(p), 'frustrated'); assert.ok(await p.$('.gm-offer .gd-chip:has-text("Take a break")'));
      const n = await botCount(p); await p.click('.gm-offer .gd-chip:has-text("Take a break")'); await waitBot(p, n, 'stretch') });
    await test(`${vp}: a typed check-in ("this is boring") and a tapped one ("Great") change the state`, async () => {
      await p.evaluate(() => GUIDE_MOOD.reset()); await p.fill('.gd-in input', 'this is boring'); await p.press('.gd-in input', 'Enter');
      assert.strictEqual(await mood(p), 'bored'); assert.ok(await p.$('.gm-offer .gd-chip:has-text("Challenge me")'));
      const n = await botCount(p); await p.click('.gm-offer .gd-chip:has-text("Challenge me")'); await waitBot(p, n, '[Cc]hallenge');
      await p.click('.gm-mood[data-mood=great]'); assert.strictEqual(await mood(p), 'confident') });
    await test(`${vp}: three fast right answers with no hints → confident`, async () => {
      await p.evaluate(() => GUIDE_MOOD.reset()); for (let i = 0; i < 3; i++) await emit(p, { kind: 'right', id: LESSON });
      assert.strictEqual(await mood(p), 'confident'); assert.match(await p.textContent('.gm-why'), /3 right in a row/) });
    await test(`${vp}: "About me" requirements apply and persist; junk in storage is ignored field by field`, async () => {
      await openDetails(p, '.gm-you'); await p.selectOption('.gm-you select[name=style]', 'brief'); await p.selectOption('.gm-you select[name=exam]', 'GCSE (AQA)');
      await p.check('.gm-you input[name=largerText]'); await p.check('.gm-you input[name=reducedMotion]');
      assert.deepStrictEqual(await p.evaluate(() => [...document.documentElement.classList].filter(c => /^wn-(rm|lt)$/.test(c)).sort()), ['wn-lt', 'wn-rm']);
      const anim = await p.$eval('.gd-eyes', e => getComputedStyle(e).animationName); assert.strictEqual(anim, 'none');
      const n = await botCount(p); await p.fill('.gd-in input', 'explain'); await p.press('.gd-in input', 'Enter'); await waitBot(p, n, '.');
      const sent = (await lastBot(p)).split(/(?<=[.!?])\s+/).filter(Boolean).length; assert.ok(sent <= 2, 'brief style gives at most 2 sentences, got ' + sent);
      await p.reload(); await p.waitForFunction('window.WN_WARM');
      assert.deepStrictEqual(await p.evaluate(() => { const x = GUIDE_MOOD.profile(); return [x.style, x.exam, x.largerText, document.documentElement.classList.contains('wn-lt')] }), ['brief', 'GCSE (AQA)', true, true]);
      const v = await p.evaluate(() => GUIDE_MOOD.validProfile({ style: 'loud', exam: 'X', time: 7, goal: 5, adapt: 'no', largerText: 'yes', level: 'kid' }));
      assert.deepStrictEqual([v.style, v.exam, v.time, v.goal, v.adapt, v.largerText, v.level], ['balanced', '', 0, '', true, false, 'kid']);
      const s = await p.evaluate(() => GUIDE_MOOD.validStats({ right: -3, wrong: 'x', hints: 4, moods: [null, { m: 'bored', t: 1 }, { m: 'evil', t: 2 }], stepMs: [5, 'a', -1] }));
      assert.deepStrictEqual([s.right, s.wrong, s.hints, s.moods.length, s.stepMs], [0, 0, 4, 1, [5]]);
      await p.evaluate(() => localStorage.setItem('wn_learner', '[1,2]')); await p.reload(); await p.waitForFunction('window.WN_WARM');
      assert.strictEqual(await p.evaluate(() => GUIDE_MOOD.profile().style), 'balanced') });
    await test(`${vp}: "What I've learned" lists what is stored, and "Forget everything" clears it`, async () => {
      await p.evaluate(id => select(id), LESSON); await p.waitForSelector('#learnH'); await p.evaluate(() => GUIDE.open()); await p.waitForSelector('#guide:not([hidden]) .gm-learned');
      await openDetails(p, '.gm-you'); await p.fill('.gm-you input[name=goal]', 'Pass my physics mock'); await emit(p, { kind: 'hint', id: LESSON, hint: 'h', prompt: 'q' });
      await openDetails(p, '.gm-learned'); await p.evaluate(() => document.querySelector('.gm-learned').dispatchEvent(new Event('toggle'))); const t = await p.textContent('.gm-list'); assert.match(t, /Pass my physics mock/); assert.match(t, /Hints asked for: 1/); assert.match(await p.textContent('.gm-priv'), /stays on this device/);
      await axeOn(p, '#guide', vp + ' 2052 theme');
      await p.click('#themeBtn'); await p.waitForTimeout(200); await axeOn(p, '#guide', vp + ' classic theme'); await p.click('#themeBtn');
      await p.click('.gm-reset'); assert.strictEqual(await p.evaluate(() => (JSON.parse(localStorage.getItem('wn_learner') || '{"profile":{}}').profile.goal || '')), '');
      assert.strictEqual(await p.inputValue('.gm-you input[name=goal]'), '') });
    await test(`${vp}: "Adapt to how I'm doing" off stops tracking`, async () => {
      await openDetails(p, '.gm-you'); await p.uncheck('.gm-you input[name=adapt]');
      for (let i = 0; i < 3; i++) await emit(p, { kind: 'wrong', id: LESSON });
      assert.strictEqual(await mood(p), 'focused'); assert.match(await p.textContent('.gm-why'), /Adapting is off/);
      assert.strictEqual(await p.evaluate(() => JSON.parse(localStorage.getItem('wn_learner')).stats.wrong), 0);
      await p.check('.gm-you input[name=adapt]') });
    await test(`${vp}: no page errors`, async () => assert.deepStrictEqual(p.errors, []));
    await p.context().close();
  }
  await test('late at night after 25 minutes the Guide suggests winding down', async () => {
    const p = await fresh(browser, 'desktop'); await p.clock.install({ time: new Date(2026, 9, 24, 23, 5) }); await openGuide(p);
    await p.clock.fastForward('26:00'); await p.mouse.move(10, 10); await p.mouse.wheel(0, 10); await p.evaluate(() => GUIDE_MOOD.update());
    assert.strictEqual(await mood(p), 'tired'); assert.match(await p.textContent('.gm-why'), /late/); await p.context().close() });
  await browser.close(); console.log(failures ? `${failures} failed` : 'all passed'); process.exit(failures ? 1 : 0);
})();
