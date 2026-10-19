/* End-to-end test for the Learn feature in out/viewer.html (headless Chromium via Playwright, plus axe-core).
   Run: npm ci && npx playwright install --only-shell chromium && node tests/learn.e2e.cjs
   Set SHOTS=dir to also save desktop and mobile screenshots. */
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html');
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message) } }

async function page(browser, vp, mobile) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: !!mobile, hasTouch: !!mobile, deviceScaleFactor: mobile ? 2 : 1 });
  const p = await ctx.newPage(); p.errors = [];
  p.on('pageerror', e => p.errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errors.push(m.text()) });
  await p.goto(URL); return p;
}
async function profile(p, age, goal) { await p.selectOption('#pAge', age); await p.selectOption('#pGoal', goal) }
const nextNodes = p => p.evaluate(() => LEARN.nextList(6).map(n => ({ id: n.id, n: n.n, a: n.a, s: n.s, d: n.d })));
async function answer(p, pre, it, wrongFirst) {
  const q = `#${pre}-${it.id}`;
  if (it.type === 'mc') {
    if (wrongFirst) { await p.click(`${q} .choice[data-k="${(it.answer + 1) % it.choices.length}"]`); assert.match(await p.textContent(`${q} .fb`), /Hint/) }
    await p.click(`${q} .choice[data-k="${it.answer}"]`);
  } else if (it.type === 'numeric') { await p.fill(`${q} input`, String(it.answer)); await p.click(`${q} [data-act=check]`) }
  else {
    for (let i = 0; i < it.items.length; i++) for (let g = 0; g < 10; g++) {
      const cur = await p.$$eval(`${q} .ord li`, l => l.map(x => x.dataset.v)), k = cur.indexOf(it.items[i]);
      if (k <= i) break; await p.click(`${q} .ord li:nth-child(${k + 1}) [data-mv="-1"]`);
    }
    await p.click(`${q} [data-act=check]`);
  }
  assert.match(await p.textContent(`${q} .fb`), /Correct/, `${pre} ${it.id} not marked correct`);
}
async function axe(p, label) {
  await p.addScriptTag({ path: AXE });
  const r = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
  const v = r.violations.map(x => `${x.id} (${x.impact}, ${x.nodes.length}): ${x.nodes[0].target.join(' ')}`);
  assert.deepStrictEqual(v, [], `${label} axe violations:\n      ` + v.join('\n      '));
}

(async () => {
  const browser = await chromium.launch();
  const p = await page(browser, { width: 1280, height: 900 });

  await test('loads without errors and shows the profile', async () => {
    assert.ok(await p.$('#pAge')); assert.deepStrictEqual(p.errors, []);
  });
  await test('teen + algebra: learn-next skips early-years and quirk topics, ranked by distance to goal', async () => {
    await profile(p, '13-15', 'algebra');
    const nx = await nextNodes(p);
    assert.ok(nx.length >= 1, 'no suggestions');
    assert.ok(await p.evaluate(id => LEARN.has(id), nx[0].id), 'first pick has no lesson: ' + nx[0].n);
    for (const n of nx) { assert.ok(n.a[1] > 12, `${n.n} is below the assumed level`); assert.notStrictEqual(n.d, 'Handwriting & Transcription') }
    const d = await p.evaluate(ids => ids.map(i => LEARN.goalDist().get(i)), nx.map(n => n.id));
    assert.deepStrictEqual(d, d.slice().sort((a, b) => a - b), 'not sorted by distance: ' + d);
    console.log('      next:', nx.map(n => n.n).join(' | '));
  });
  await test('16-18 + algebra explains an empty path instead of showing nothing', async () => {
    await profile(p, '16-18', 'algebra'); assert.match(await p.textContent('#learnHome'), /assume you know/);
  });
  await test('adult + calculus starts at secondary level', async () => {
    await profile(p, 'adult', 'calculus');
    const nx = await nextNodes(p);
    assert.ok(nx.length && nx.every(n => n.a[0] >= 13), nx.map(n => `${n.n} ${n.a}`).join(', '));
    console.log('      next:', nx.map(n => n.n).join(' | '));
  });
  await test('10-12 + algebra starts at age-10 topics; mastering them unlocks the 10-16 lessons', async () => {
    await profile(p, '10-12', 'algebra');
    const nx = await nextNodes(p);
    assert.ok(nx.length && nx.every(n => n.a[0] >= 10), nx.map(n => `${n.n} ${n.a}`).join(', '));
    await p.evaluate(ids => ids.forEach(id => LEARN.setProg(id, { status: 'known' })), ['mt_8jFSnXxqQD', 'mt_XLP1IM3Qbb', 'mt_WsM4EmdOLe', 'mt_RXnyhCRYXA', 'mt_4WaKWECpcv']);
    const after = await nextNodes(p);
    assert.ok(await p.evaluate(id => LEARN.has(id), after[0].id), 'after: ' + after.map(n => n.n).join(', '));
    await p.evaluate(ids => ids.forEach(id => LEARN.clear(id)), ['mt_8jFSnXxqQD', 'mt_XLP1IM3Qbb', 'mt_WsM4EmdOLe', 'mt_RXnyhCRYXA', 'mt_4WaKWECpcv']);
    console.log('      after marking known:', after.map(n => n.n).join(' | '));
    console.log('      next:', nx.map(n => n.n).join(' | '));
  });
  await test('lesson flow: hint on a wrong answer, practice, mastery check, persisted after reload', async () => {
    const id = 'mt_jHgRQ4hR0g';
    await p.evaluate(id => select(id), id);
    const cur = await p.evaluate(() => LEARN_PANEL.cur());
    for (const [k, it] of cur.p.entries()) await answer(p, 'p', it, k === 3);
    for (const it of cur.m) await answer(p, 'm', it);
    assert.match(await p.textContent('#mres'), /mastered/);
    await p.reload();
    assert.ok(await p.evaluate(id => LEARN.mastered(id), id));
    assert.match(await p.$eval(`.item[data-id="${id}"]`, e => e.textContent), /mastered/);
  });
  await test('order item works with the keyboard buttons', async () => {
    await p.evaluate(() => select('mt_WcfaSfVT33'));
    const it = await p.evaluate(() => LEARN_PANEL.cur().p.find(x => x.type === 'order'));
    await answer(p, 'p', it);
  });
  await test('mastery retries draw different questions or numbers', async () => {
    const seen = new Set();
    for (let i = 0; i < 6; i++) { await p.evaluate(() => select('mt_QhFEDyIwSO')); seen.add(await p.$$eval('#mbox .qp', q => q.map(x => x.textContent).join('|'))) }
    assert.ok(seen.size >= 4, `only ${seen.size} distinct sets in 6 tries`);
  });
  await test('topics without a lesson show "Lessons coming" with a verified link', async () => {
    await p.evaluate(() => select(DATA.nodes.find(n => n.n === 'Solving quadratics by factorising').id));
    assert.match(await p.textContent('#learn'), /Lessons coming/); assert.ok(await p.$('#learn a[href^="https://www.bbc.co.uk/bitesize/"]'));
  });
  await test('axe: desktop, lesson open', async () => { await p.evaluate(() => select('mt_jHgRQ4hR0g')); await axe(p, 'desktop') });
  if (process.env.SHOTS) {
    await p.evaluate(() => { LEARN.clear('mt_aZENxGikHn'); select('mt_aZENxGikHn') });
    await p.click('#p-p1 .choice[data-k="0"]'); await p.click('#p-p2 .choice[data-k="1"]');
    await p.setViewportSize({ width: 1440, height: 1100 });
    await p.evaluate(() => document.querySelector('#learnHome h2').scrollIntoView());
    await p.screenshot({ path: path.join(process.env.SHOTS, 'whynext-learn-desktop.png') });
  }

  const m = await page(browser, { width: 390, height: 844 }, true);
  await test('mobile: no horizontal overflow and no axe violations', async () => {
    await profile(m, '13-15', 'algebra'); await m.evaluate(() => select('mt_aZENxGikHn'));
    assert.ok(!(await m.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'horizontal overflow');
    await axe(m, 'mobile');
  });
  if (process.env.SHOTS) {
    await m.click('#p-p1 .choice[data-k="0"]'); await m.evaluate(() => document.getElementById('learn').scrollIntoView());
    await m.screenshot({ path: path.join(process.env.SHOTS, 'whynext-learn-mobile.png') });
  }
  await test('no console or page errors', async () => { assert.deepStrictEqual([...p.errors, ...m.errors], []) });
  await browser.close();
  console.log(failures ? `${failures} failed` : 'all learn e2e tests passed'); process.exit(failures ? 1 : 0);
})();
