/* End-to-end test for the interactive visuals (learn/vis_*.js) in out/viewer.html: every lesson renders one,
   each visual type is driven by mouse, touch-style pointer drags or keyboard, hints highlight the visual,
   progress cues appear, reduced motion is respected, and axe finds no violations. Run: node tests/visual.e2e.cjs */
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=5';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 6).join('\n      ')) } }
const desc = p => p.textContent('#vbox .vis-desc');
const open = (p, id) => p.evaluate(id => select(id), id);
async function expectDesc(p, re) { await p.waitForFunction(r => new RegExp(r).test(document.querySelector('#vbox .vis-desc').textContent), re.source, { timeout: 4000 }).catch(() => {}); assert.match(await desc(p), re) }
const btn = (p, name) => p.click(`#vbox .vis-ctl button:text-is("${name}")`);
async function setRange(p, label, v) { await p.evaluate(([l, v]) => { const r = [...document.querySelectorAll('#vbox .vis-range')].find(x => x.textContent.includes(l)).querySelector('input'); r.value = v; r.dispatchEvent(new Event('input')) }, [label, v]) }
async function dragTo(p, sel, tx, ty) { const b = await p.locator(sel).first().boundingBox(); await p.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await p.mouse.down(); await p.mouse.move(tx, ty, { steps: 10 }); await p.mouse.up() }
async function axe(p, label) {
  if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
  const r = await p.evaluate(() => axe.run(document.getElementById('vbox'), { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] }));
  const v = r.violations.map(x => `${x.id} (${x.nodes.length}): ${x.nodes[0].target.join(' ')}`); assert.deepStrictEqual(v, [], `${label}: ` + v.join('; '));
}
const L = { counters: 'mt_WcfaSfVT33', tenframe: 'mt_dmNvjroCPT', array: 'mt_FX4a2Q8XXN', share: 'mt_LpSuPgL31x', fracbar: 'mt_FbDKeLfBCo', numline: 'mt_Kr3IyA6m-O', balance: 'mt_i9rJbuFO3p',
  bidmas: 'mt_jHgRQ4hR0g', longmul: 'mt_XLP1IM3Qbb', longdiv: 'mt_WsM4EmdOLe', plot: 'mt_Y5xC--f9Eh', rate: 'mt_lRy8j6tZXT', power: 'mt_lt75XjH3E2', particles: 'mt_ylruY6VhOf', atom: 'mt_Z_Wu_77ybI', ptable: 'mt_wfEfQuHOG-', balancer: 'mt_BXj4pfdhxO' };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } }), p = await ctx.newPage(); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.goto(URL);
  const ids = await p.evaluate(() => Object.fromEntries(Object.entries(LEARN.L).map(([id, l]) => [id, l.visual.type])));
  await test('the id map in this test points at lessons with the right visual type', async () => { for (const [t, id] of Object.entries(L)) assert.strictEqual(ids[id], t, id) });
  await test('every lesson renders a visual with a text description', async () => {
    assert.ok(Object.keys(ids).length >= 75, 'lesson count');
    for (const id of Object.keys(ids)) { await open(p, id); assert.ok(await p.$('#vbox figure.vis'), 'no visual for ' + id); assert.ok((await desc(p)).length > 20, 'empty description for ' + id) }
    assert.deepStrictEqual(errors, []);
  });
  await test('counters: tap one, drag another, both counted', async () => {
    await open(p, L.counters); await p.click('#vbox .vis-ctr >> nth=0'); await expectDesc(p, /1 of 5 counted/);
    const s = await p.locator('#vbox svg').boundingBox(); await dragTo(p, '#vbox .vis-ctr >> nth=3', s.x + s.width * .6, s.y + s.height * .8); await expectDesc(p, /2 of 5 counted/);
    await p.focus('#vbox .vis-ctr >> nth=4'); await p.keyboard.press('Enter'); await expectDesc(p, /3 of 5 counted/);
  });
  await test('ten-frame: add a red counter', async () => { await open(p, L.tenframe); await btn(p, '+ red'); await expectDesc(p, /4 \+ 4 = 8/) });
  await test('array: keyboard moves the distributive split', async () => { await open(p, L.array); await p.focus('#vbox [role=slider]'); await p.keyboard.press('ArrowRight'); await expectDesc(p, /3 × \(3 \+ 3\) = 3 × 3 \+ 3 × 3/) });
  await test('equal sharing: deal them all into equal groups', async () => { await open(p, L.share); await btn(p, 'Deal them all'); await expectDesc(p, /12 shared equally into 3 groups: 4 each/) });
  await test('fraction bars: shading 2/4 under 1/2 shows equivalence', async () => {
    await open(p, L.fracbar); for (const k of [1, 2]) await p.click(`#vbox [aria-label="Part ${k} of 4 (second bar)"]`); await expectDesc(p, /1\/2 = 2\/4: equivalent/);
  });
  await test('number line: arrow key moves the point and names the equivalent fraction', async () => { await open(p, L.numline); await p.focus('#vbox [role=slider]'); await p.keyboard.press('ArrowLeft'); await expectDesc(p, /2\/4.*Equivalent: 1\/2/) });
  await test('balance scale: inverse operations on both sides solve 2x + 3 = 11; one side only tips it', async () => {
    await open(p, L.balance); await btn(p, 'Take 1 from the left only'); await expectDesc(p, /tips/); await btn(p, 'Put it back');
    for (let i = 0; i < 3; i++) await btn(p, 'Take 1 from both sides'); await btn(p, 'Divide both sides by 2'); await expectDesc(p, /Solved: x = 4/);
  });
  await test('order of operations: steps highlight the next operation and reach the answer', async () => {
    await open(p, L.bidmas); const ex = await p.evaluate(() => LEARN.L[sel].visual.opts.expr); assert.ok(await p.$('#vbox mark.vis-hl'));
    for (let i = 0; i < 6; i++) { const b = p.locator('#vbox button:text-is("Next step")'); if (await b.isDisabled()) break; await b.click() }
    const want = await p.evaluate(e => Function('return ' + e.replace(/−/g, '-').replace(/×/g, '*').replace(/÷/g, '/'))(), ex); await expectDesc(p, new RegExp(`the answer is ${want}\\.`));
  });
  await test('long multiplication: rows appear one at a time, with the placeholder 0', async () => {
    await open(p, L.longmul); await btn(p, 'Next step'); await btn(p, 'Next step'); await expectDesc(p, /placeholder/); await btn(p, 'Next step'); await expectDesc(p, /34 × 26 = 884/);
  });
  await test('long division: steps reach the remainder', async () => {
    await open(p, L.longdiv); for (let i = 0; i < 8; i++) { const b = p.locator('#vbox button:text-is("Next step")'); if (await b.isDisabled()) break; await b.click() } await expectDesc(p, /432 ÷ 15 = 28 remainder 12/);
  });
  await test('tangent plotter: shrinking h turns the secant into the tangent; tangent point and limit respond to keys', async () => {
    await open(p, L.plot); await setRange(p, 'Shrink h', -200); await expectDesc(p, /almost the tangent: the gradient at x = 3 is 6/);
    await btn(p, 'Animate h → 0'); await expectDesc(p, /gradient at x = 3 is 6/);
    await open(p, 'mt_h07IxxUQwx'); await p.focus('#vbox [role=slider]'); await p.keyboard.press('ArrowRight'); await expectDesc(p, /x = 2, y = 4 and the gradient dy\/dx = 4/);
    await open(p, 'mt_P9vcHUW9CJ'); for (let i = 0; i < 12; i++) await btn(p, 'Halve the distance to 1'); await expectDesc(p, /limit is 2|closes in on 2/);
  });
  await test('rate of change: keyboard moves an end point and the average rate updates', async () => { await open(p, L.rate); await p.focus('#vbox [aria-label="End point"]'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await expectDesc(p, /15 ÷ 3 = 5\./) });
  await test('power rule: changing n updates the pattern', async () => { await open(p, L.power); await setRange(p, 'Power n', 2); await expectDesc(p, /y = x². At x = 1 the tangent's gradient is 2/) });
  await test('particles: heating makes a gas, and the canvas animates', async () => {
    await open(p, L.particles); await btn(p, 'Heat above boiling'); await expectDesc(p, /is a gas/);
    const a = await p.$eval('#vbox canvas', c => c.toDataURL()); await p.waitForTimeout(250); const b = await p.$eval('#vbox canvas', c => c.toDataURL()); assert.notStrictEqual(a, b, 'canvas is not animating');
    await btn(p, 'Cool below melting'); await expectDesc(p, /is a solid/);
  });
  await test('atom builder: adding a proton changes the element', async () => { await open(p, L.atom); await btn(p, '+ proton'); await expectDesc(p, /nitrogen \(N\).*ion with charge \+1/) });
  await test('periodic table: choosing sodium describes it', async () => { await open(p, L.ptable); await p.click('#vbox [aria-label="Sodium, 11"]'); await expectDesc(p, /Sodium \(Na\): atomic number 11.*group 1/) });
  await test('equation balancer: the right coefficients balance the scale', async () => {
    await open(p, L.balancer); await p.click('#vbox [aria-label="More O2"]'); await p.click('#vbox [aria-label="More H2O"]'); await expectDesc(p, /Balanced: every element/);
    assert.ok(await p.$('#vbox svg.vis-ok'), 'scale not level');
  });
  await test('a hint highlights the relevant part of the visual', async () => {
    await open(p, L.balance); await p.click('#p-p1 [data-act=hint]'); assert.ok(await p.$('#vbox .vis-cue'), 'no cue'); assert.match(await p.textContent('#p-p1 .fb'), /highlighted part/);
  });
  await test('progress ring appears after practice; next-step nodes glow on the map', async () => {
    const id = L.atom; await open(p, id); const it = await p.evaluate(() => LEARN_PANEL.cur().p[0]);
    if (it.type === 'mc') await p.click(`#p-${it.id} .choice[data-k="${it.answer}"]`); else { await p.fill(`#p-${it.id} input`, String(it.answer)); await p.click(`#p-${it.id} [data-act=check]`) }
    assert.ok(await p.$(`.item[data-id="${id}"] svg.pring`), 'no ring in the list'); assert.ok(await p.$('.lhead svg.pring'));
    await p.selectOption('#pAge', '13-15'); await p.selectOption('#pGoal', 'chemistry'); const nx = await p.evaluate(() => LEARN.nextList(1)[0].id); await open(p, 'mt_BXj4pfdhxO');
    const anim = await p.$eval(`.gn[data-id="${nx}"] circle`, c => getComputedStyle(c).animationName); assert.strictEqual(anim, 'fxglow');
  });
  await test('mastery shows a subtle celebration', async () => {
    const id = 'mt_dzgK92gM32'; await open(p, id); const m = await p.evaluate(() => LEARN_PANEL.cur().m);
    for (const it of m) { const q = `#m-${it.id}`; if (it.type === 'mc') await p.click(`${q} .choice[data-k="${it.answer}"]`); else { await p.fill(`${q} input`, String(it.answer)); await p.click(`${q} [data-act=check]`) } }
    assert.ok(await p.$('#mres.fx-win')); assert.ok(await p.$('#mres .fx-burst'));
  });
  await test('axe: no violations in any visual type', async () => { for (const [t, id] of Object.entries(L)) { await open(p, id); await axe(p, t) } });
  await test('no console or page errors', async () => { assert.deepStrictEqual(errors, []) });

  const rc = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' }), r = await rc.newPage(); await r.goto(URL);
  await test('reduced motion on mobile: particles hold still, no visual overflows, axe clean', async () => {
    await open(r, L.particles); const a = await r.$eval('#vbox canvas', c => c.toDataURL()); await r.waitForTimeout(300); assert.strictEqual(a, await r.$eval('#vbox canvas', c => c.toDataURL()));
    await r.click('#vbox button:text-is("Heat above boiling")'); assert.match(await desc(r), /gas/);
    for (const id of Object.values(L)) { await open(r, id); assert.ok(!(await r.evaluate(() => document.documentElement.scrollWidth > innerWidth)), 'overflow on ' + id) }
    await open(r, L.balance); await axe(r, 'mobile balance');
  });
  await browser.close();
  console.log(failures ? `${failures} failed` : 'all visual e2e tests passed'); process.exit(failures ? 1 : 0);
})();
