/* End-to-end test for the Learn feature in out/viewer.html (headless Chromium via Playwright, plus axe-core).
   Run: npm ci && npx playwright install --only-shell chromium && node tests/learn.e2e.cjs
   Set SHOTS=dir to also save desktop and mobile screenshots. */
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html');
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message) } }

async function page(browser, vp, mobile, q = '?seed=42') {
  const ctx = await browser.newContext({ viewport: vp, isMobile: !!mobile, hasTouch: !!mobile, deviceScaleFactor: mobile ? 2 : 1 });
  const p = await ctx.newPage(); p.errors = [];
  p.on('pageerror', e => p.errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errors.push(m.text()) });
  await p.goto(URL + q); return p;
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
  await test('10-12 + algebra: age-10 lessons are reachable directly, with at least 3 suggestions', async () => {
    await profile(p, '10-12', 'algebra');
    const nx = await nextNodes(p);
    assert.ok(nx.length >= 3, 'fewer than 3 suggestions: ' + nx.map(n => n.n).join(', '));
    assert.ok(nx.every(n => n.a[0] >= 10), nx.map(n => `${n.n} ${n.a}`).join(', '));
    const withLesson = await p.evaluate(ids => ids.filter(i => LEARN.has(i)).length, nx.map(n => n.id));
    assert.ok(withLesson >= 3, `only ${withLesson} suggestions have lessons`);
    console.log('      next:', nx.map(n => n.n).join(' | '));
  });
  await test('lesson flow: hint on a wrong answer, practice, mastery check, persisted after reload', async () => {
    const id = 'mt_jHgRQ4hR0g';
    await p.evaluate(id => select(id), id);
    const cur = await p.evaluate(() => LEARN_PANEL.cur());
    const firstMc = cur.p.findIndex(x => x.type === 'mc');
    for (const [k, it] of cur.p.entries()) await answer(p, 'p', it, k === firstMc);
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
  await test('same seed gives the same practice; "New practice questions" gives fresh ones', async () => {
    const b = await page(browser, { width: 1000, height: 800 }), c = await page(browser, { width: 1000, height: 800 });
    const get = q => q.$$eval('#pbox .qp', x => x.map(e => e.textContent).join('|'));
    for (const q of [b, c]) await q.evaluate(() => select('mt_XLP1IM3Qbb'));
    assert.strictEqual(await get(b), await get(c), 'seeded pages differ');
    const seen = new Set([await get(b)]);
    for (let i = 0; i < 4; i++) { await b.click('[data-act=newp]'); seen.add(await get(b)) }
    assert.ok(seen.size >= 3, `only ${seen.size} distinct practice sets`);
    await b.context().close(); await c.context().close();
  });
  await test('order item can be reordered by pointer drag', async () => {
    await p.evaluate(() => select('mt_WcfaSfVT33'));
    const it = await p.evaluate(() => LEARN_PANEL.cur().p.find(x => x.type === 'order'));
    const q = `#p-${it.id} .ord li`, before = await p.$$eval(q, l => l.map(x => x.dataset.v));
    await p.$eval(`#p-${it.id}`, e => e.scrollIntoView({ block: 'center' }));
    const lis = await p.$$(q), last = await lis[lis.length - 1].boundingBox(), first = await lis[0].boundingBox();
    await p.mouse.move(last.x + 20, last.y + last.height / 2); await p.mouse.down();
    await p.mouse.move(first.x + 20, first.y + 2, { steps: 12 }); await p.mouse.up();
    const after = await p.$$eval(q, l => l.map(x => x.dataset.v));
    assert.strictEqual(after[0], before[before.length - 1], `drag did not move item: ${before} -> ${after}`);
  });
  await test('spaced review: a mastered topic comes back for a 2-question refresh after a few days', async () => {
    const id = 'mt_jHgRQ4hR0g';
    const due = await p.evaluate(id => LEARN.prog(id).review.due, id);
    await p.goto(URL + '?seed=3&today=' + due);
    await profile(p, '13-15', 'algebra');
    assert.match(await p.textContent('#learnHome'), /Quick review/);
    await p.evaluate(id => select(id), id);
    const r = await p.evaluate(() => LEARN_PANEL.cur().r);
    assert.strictEqual(r.length, 2);
    for (const it of r) await answer(p, 'r', it);
    assert.match(await p.textContent('#rres'), /Still got it/);
    const rv = await p.evaluate(id => LEARN.prog(id).review, id);
    assert.ok(rv.step === 1 && rv.due > due, JSON.stringify(rv));
    await p.goto(URL + '?seed=42');
  });
  await test('topics without a lesson show "Lessons coming" with a verified link', async () => {
    await p.evaluate(() => select(DATA.nodes.find(n => n.n === 'Solving quadratics by factorising').id));
    assert.match(await p.textContent('#learn'), /Lessons coming/); assert.ok(await p.$('#learn a[href^="https://www.bbc.co.uk/bitesize/"]'));
  });
  await test('axe: desktop, lesson open', async () => { await p.evaluate(() => select('mt_jHgRQ4hR0g')); await axe(p, 'desktop') });
  if (process.env.SHOTS) {
    await p.evaluate(() => { LEARN.clear('mt_aZENxGikHn'); select('mt_aZENxGikHn') });
    { const c = await p.evaluate(() => LEARN_PANEL.cur().p); await answer(p, 'p', c[0]) }
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
    { const c = await m.evaluate(() => LEARN_PANEL.cur().p); await answer(m, 'p', c[0]) } await m.evaluate(() => document.getElementById('learn').scrollIntoView());
    await m.screenshot({ path: path.join(process.env.SHOTS, 'whynext-learn-mobile.png') });
  }
  await test('no console or page errors', async () => { assert.deepStrictEqual([...p.errors, ...m.errors], []) });
  await browser.close();
  console.log(failures ? `${failures} failed` : 'all learn e2e tests passed'); process.exit(failures ? 1 : 0);
})();
