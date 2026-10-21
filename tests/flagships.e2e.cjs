// Flagship e2e (split from labs.e2e.cjs): real touch gestures, predictions, misconception feedback and axe for each flagship.
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
(async () => {
  const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1200, height: 900 } }); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.addInitScript(() => { try { localStorage.setItem('wn_drafts', '1') } catch (e) {} window.__buzz = []; Object.defineProperty(navigator, 'vibrate', { value: ms => (window.__buzz.push(ms), true), configurable: true }) });
  await p.goto(URL);
  {
  // touch helpers: synthetic touch PointerEvents in canvas units (cv.__A exposes the kit API)
  const touch = (pts, id = 1) => p.evaluate(([pts, id]) => { const cv = document.querySelector('.fl-cv'), A = cv.__A, r = cv.getBoundingClientRect(), k = r.width / A.W, ky = r.height / A.H;
    const ev = (t, x, y, i) => cv.dispatchEvent(new PointerEvent(t, { pointerId: i, pointerType: 'touch', isPrimary: i === 1, clientX: r.left + x * k, clientY: r.top + y * ky, bubbles: true, cancelable: true }));
    pts.forEach(([x, y], j) => ev(j ? 'pointermove' : 'pointerdown', x, y, id)); const l = pts[pts.length - 1]; ev('pointerup', l[0], l[1], id) }, [pts, id]);
  const line = (x0, y0, x1, y1, n = 12) => Array.from({ length: n + 1 }, (_, i) => [x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n]);
  const A = f => p.evaluate(f);
  const nextOn = async () => assert.ok(!(await p.$eval('.fl-nav button:last-child', b => b.disabled)), 'Next should unlock after the gesture');
  const next = () => p.click('.fl-nav button:last-child');
  const pick = async i => { await p.click(`.fl-pred button:nth-child(${i + 1})`); await p.waitForTimeout(150) };
  const WH = () => A(() => { const A = document.querySelector('.fl-cv').__A; return [A.W, A.H] });
  const axeFlag = async () => { if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
    for (let k = 0; k < 2; k++) { const r = await p.evaluate(() => axe.run('.vis.flag', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
      assert.deepStrictEqual(r.violations.map(v => v.id + ': ' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(', ')), []); await p.click('#themeBtn'); await p.waitForTimeout(200) } };
  const open = async id => { await p.evaluate(id => select(id), id); await p.waitForSelector('.vis.flag .fl-cv', { timeout: 10000 }); await p.waitForTimeout(300) };
  await test('flagship (derivative): touch-drag Q, pinch zoom, pick the limit, misconception feedback, axe', async () => {
    await open('mt_Y5xC--f9Eh'); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), 'hook needs a prediction first');
    let [W0, H0] = await WH(); await touch([[W0 / 2, H0 / 2]]); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), 'tap ignored before predicting');
    await pick(1); await touch([[W0 / 2, H0 / 2]]); await nextOn(); await next(); await p.waitForTimeout(900);
    assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), 'step locked until learner acts');
    const q = () => A(() => { const A = document.querySelector('.fl-cv').__A; return [A.X(A.s.t0 + A.s.h), A.X(3), A.X(A.s.t0 + .02), A.H / 2] });
    let [xq, x3, , y] = await q(); await touch(line(xq, y, x3, y)); await nextOn(); await next(); await p.waitForTimeout(700);
    for (let i = 0; i < 3 && await p.$eval('.fl-nav button:last-child', b => b.disabled); i++) { const [a, , c, y] = await q(); await touch(line(a, y, c, y)) } await nextOn(); await next(); await p.waitForTimeout(700);
    await p.evaluate(() => { const cv = document.querySelector('.fl-cv'), r = cv.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const ev = (t, x, i) => cv.dispatchEvent(new PointerEvent(t, { pointerId: i, pointerType: 'touch', clientX: x, clientY: cy, bubbles: true }));
      ev('pointerdown', cx - 10, 1); ev('pointerdown', cx + 10, 2); for (let d = 12; d < 160; d += 6) { ev('pointermove', cx - d, 1); ev('pointermove', cx + d, 2) } ev('pointerup', cx, 1); ev('pointerup', cx, 2) });
    assert.ok(await A(() => document.querySelector('.fl-cv').__A.s.z >= 10), 'pinch zoomed'); await nextOn(); await next();
    await p.click('.fl-pick button:text-is("9.8 m/s")'); assert.match(await p.textContent('.fl-why'), /since the start/);
    await p.click('.fl-pick button:text-is("19.6 m/s")'); assert.match(await p.textContent('.fl-task'), /spot on/); await nextOn(); await next(); await p.waitForTimeout(400);
    [W0, H0] = await WH(); const gx = await A(() => document.querySelector('.fl-cv').__A.X(.8)); await touch(line(gx, H0 * .8, gx, H0 * .4)); assert.ok(await A(() => document.querySelector('.fl-cv').__A.s.gmoved === 1), 'curve drag changed gravity'); await next();
    const t = await p.evaluate(() => +document.querySelector('.fl-chal b').textContent.match(/[\d.]+/)[0]);
    await p.fill('.fl-in', String(Math.round(4.9 * t * t / t * 100) / 100)); await p.click('.fl-chal .lbtn'); assert.match(await p.textContent('.fl-fb'), /since the start/);
    await p.fill('.fl-in', String(Math.round(98 * t) / 10)); await p.click('.fl-chal .lbtn'); assert.match(await p.textContent('.fl-fb'), /✓/); await axeFlag();
  });
  await test('flagship (place value): touch-drag digits for ×10, ×100, ÷100; Show me fallback; "add a zero" misconception; axe', async () => {
    await open('mt_EDgw64OmfA'); let [W0, H0] = await WH(); await pick(1); await touch([[W0 * .44, H0 * .7]]); await p.waitForTimeout(2200); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(1); await touch([[W0 / 2, H0 / 2]]); assert.match(await A(() => document.querySelector('.fl-cv').getAttribute('aria-label')), /3 tens, 9 ones/); await touch([[W0 / 2, H0 / 2]]); await p.waitForTimeout(2200);
    assert.match(await A(() => document.querySelector('.fl-cv').getAttribute('aria-label')), /4 tens, 0 ones/); assert.match(await p.textContent('.fl-task'), /spot on/); await nextOn(); await next(); await p.waitForTimeout(400);
    const g = () => A(() => { const A = document.querySelector('.fl-cv').__A; return [A.W / 2, A.g.top + A.g.th / 2, A.g.cw] });
    const val = () => A(() => document.querySelector('.fl-cv').getAttribute('aria-label'));
    let [x, y, cw] = await g(); await touch(line(x, y, x - cw, y)); await p.waitForTimeout(800); assert.match(await val(), /3 ones, 5 tenths/); await nextOn(); await next(); await p.waitForTimeout(300);
    [x, y, cw] = await g(); await touch(line(x, y, x - cw, y)); await p.waitForTimeout(800); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), '×10 is not ×100');
    await touch(line(x, y, x - cw, y)); await p.waitForTimeout(800); await nextOn(); await next(); await p.waitForTimeout(300);
    await p.click('.fl-show'); await p.waitForTimeout(900); assert.match(await val(), /3 tenths, 5 hundredths/); await nextOn(); await next(); await next();
    const ck = await A(() => document.querySelector('.fl-cv').__A.pst.c); [x, y, cw] = await g();
    await touch(line(x, y, x + Math.sign(ck.k) * cw, y)); await p.waitForTimeout(1000); assert.match(await p.textContent('.fl-fb'), /smaller|bigger/);
    await p.click('.fl-r'); if (String(ck.n).includes('.')) { await p.click('.fl-z'); assert.match(await p.textContent('.fl-fb'), /changes nothing/) }
    await touch(line(x, y, x - ck.k * cw, y)); await p.waitForTimeout(1000); assert.match(await p.textContent('.fl-fb'), /✓/); await axeFlag();
  });
  await test('flagship (fractions): knife swipes cut and slice the bar, tap removes a cut, "add the same" misconception, axe', async () => {
    await open('mt_FbDKeLfBCo'); await next(); await p.waitForTimeout(400);
    const g = () => A(() => { const A = document.querySelector('.fl-cv').__A; return [A.g.bx, A.g.by, A.g.bw, A.g.bh, A.f.n, A.f.d, A.f.k] });
    let [bx, by, bw, bh] = await g(); await touch(line(bx + bw * .2, by, bx + bw * .2, by + bh)); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), 'off-centre cut rejected');
    await touch(line(bx + bw / 2, by - 5, bx + bw / 2, by + bh + 5)); assert.deepStrictEqual((await g()).slice(4), [1, 2, 1]); await nextOn(); await next(); await p.waitForTimeout(300);
    assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled)); await pick(1); await touch(line(bx - 5, by + bh / 2, bx + bw + 5, by + bh / 2)); assert.deepStrictEqual((await g()).slice(4), [1, 2, 2]); assert.match(await p.textContent('.fl-task'), /spot on/); await nextOn(); await next(); await p.waitForTimeout(300);
    for (let i = 0; i < 2; i++) await touch(line(bx - 5, by + bh * .3, bx + bw + 5, by + bh * .3)); assert.deepStrictEqual((await g()).slice(4), [1, 2, 4]); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(0); await touch([[bx + bw / 2, by + bh / 2]]); assert.deepStrictEqual((await g()).slice(4), [3, 4, 1]); await nextOn(); await next(); await p.waitForTimeout(300);
    [bx, by, bw, bh] = await g(); const kx = bx + bw * 2 / 3; await touch(line(kx, by + bh + 16, bx + bw * .99, by + bh + 16)); assert.deepStrictEqual((await g()).slice(4), [3, 3, 1], 'knob drag shades all');
    await touch(line(bx + bw * .1, by - 8, bx + bw * .1, by + bh + 8)); assert.deepStrictEqual((await g()).slice(4, 6), [3, 4], 'vertical swipe adds a column'); await next();
    const [n, d, D] = await A(() => document.querySelector('.fl-chal b').textContent.match(/(\d+)\/(\d+) = \?\/(\d+)/).slice(1).map(Number));
    await p.fill('.fl-in', String(n + D - d)); await p.click('.fl-chal .lbtn'); assert.match(await p.textContent('.fl-fb'), /added/);
    await p.fill('.fl-in', String(n * D / d)); await p.click('.fl-chal .lbtn'); assert.match(await p.textContent('.fl-fb'), /✓/); await axeFlag();
  });
  await test('flagship (negative numbers): predict, tap the sunset, drag the thermometer through zero, sandbox markers, wrong-way feedback, axe', async () => {
    await open('mt_RVK655t391'); let [W0, H0] = await WH(); await pick(0); await touch([[W0 / 2, H0 * .2]]); await p.waitForTimeout(3200); await nextOn(); assert.match(await p.textContent('.fl-task'), /now you know/); await next(); await p.waitForTimeout(300);
    const ng = () => A(() => { const A = document.querySelector('.fl-cv').__A, g = A.ng.g; return { x: g.x, t: A.ng.st.t, y: [-15, 15].map(v => g.y(v)) } });
    const yv = (o, v) => o.y[0] + (v + 15) / 30 * (o.y[1] - o.y[0]);
    const dragTo = async v => { const o = await ng(); await touch(line(o.x, yv(o, o.t), o.x, yv(o, v), 16)) };
    assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled)); await dragTo(-2); await nextOn(); assert.match(await p.textContent('.fl-task'), /5 hops/); await next(); await p.waitForTimeout(300);
    await pick(0); await dragTo(-7); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(1); await dragTo(3); assert.match(await p.textContent('.fl-task'), /\+7/); await nextOn(); await next(); await p.waitForTimeout(300);
    let o = await ng(); await touch(line(o.x, yv(o, -6), o.x, yv(o, 2), 16)); assert.match(await A(() => document.querySelector('.fl-cv').getAttribute('aria-label')), /Start marker 2 °C/); await next(); await p.waitForTimeout(300);
    const q = await A(() => document.querySelector('.fl-cv').__A.ng.st.c); await dragTo(q.a - q.d); assert.match(await p.textContent('.fl-fb'), /wrong way/);
    await dragTo(q.ans); assert.match(await p.textContent('.fl-fb'), /✓/); await axeFlag();
  });
  await test('flagship (equations): drag cubes to the bin tips the beam, balanced removals, swipe to share, bags on both sides, one-sided-move feedback, axe', async () => {
    await open('mt_QhFEDyIwSO'); await pick(1);
    const item = (side, k) => p.evaluate(([side, k]) => { const { st, g, slots } = document.querySelector('.fl-cv').__A.eq, s = side ? st.R : st.L, it = slots(s, g.pans[side]).filter(o => o.k === k).pop(); return [it.x, it.y, g.bin.x, g.bin.y] }, [side, k]);
    const bin = async (side, k) => { const [x, y, bx, by] = await item(side, k); await touch(line(x, y, bx, by, 14)); await p.waitForTimeout(80) };
    const eq = () => A(() => document.querySelector('.fl-cv').getAttribute('aria-label'));
    await bin(0, 'u'); assert.match(await eq(), /Tipped/); await nextOn(); await next(); await p.waitForTimeout(300);
    for (let i = 0; i < 3; i++) { await bin(0, 'u'); await bin(1, 'u') } assert.match(await eq(), /Balanced: 2x = 8/); await nextOn(); await next(); await p.waitForTimeout(300);
    let [W0, H0] = await WH(); await touch(line(W0 / 2, H0 * .35, W0 / 2, H0 * .85)); await p.waitForTimeout(1200); assert.match(await eq(), /Balanced: x = 4/); assert.match(await p.textContent('.fl-task'), /spot on/); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(2); await bin(0, 'x'); await bin(1, 'x'); await bin(0, 'u'); await bin(1, 'u'); assert.match(await eq(), /Balanced: 2x = 8/); await touch(line(W0 / 2, H0 * .35, W0 / 2, H0 * .85)); await p.waitForTimeout(1200); await nextOn(); await next(); await p.waitForTimeout(300);
    await touch(line(W0 * .3, H0 * .08, W0 * .25, H0 * .45)); assert.match(await eq(), /1 mystery bags/); await next(); await p.waitForTimeout(300);
    const q = await A(() => { const s = document.querySelector('.fl-cv').__A.eq.st; return { L: { ...s.L }, R: { ...s.R } } });
    await bin(q.L.u ? 0 : 1, q.L.u ? 'u' : 'x'); assert.match(await p.textContent('.fl-fb'), /changed only one side/);
    await p.click('.fl-chal [data-a="r"]');
    for (let i = 0; i < 30 && !(await p.$('.fl-fb .linkish')); i++) await A(() => { const A = document.querySelector('.fl-cv').__A, { st } = A.eq, wt = q => q.x * st.X + q.u, bal = wt(st.L) === wt(st.R), b = s => document.querySelector(`.fl-chal [data-a="${s}"]`);
      const last = st.log[st.log.length - 1]; if (!bal && last) return b((1 - last[0]) + last[1]).click(); if (st.L.x && st.R.x) return b('0x').click(); const xs = st.L.x ? 0 : 1, S = [st.L, st.R]; if (S[xs].u) return b(xs + 'u').click(); b('s').click() }).then(() => p.waitForTimeout(1000));
    assert.match(await p.textContent('.fl-fb'), /✓ x = /); await axeFlag();
  });
  await test('flagship (straight lines): drag the taxi to plot fares, drag c and m handles, rival line, negative gradient, test points, misconception feedback, axe', async () => {
    await open('mt_q0LJXMQe70'); await pick(1);
    const G = () => A(() => { const { g, st } = document.querySelector('.fl-cv').__A.g6(), H = document.querySelector('.fl-cv').__A.H; return { x: [0, 4, 5].map(v => g.X(v)), Y: [-2, 20].map(v => g.Y(v)), m: st.m, c: st.c, H, t: st.target } });
    const Y = (o, v) => o.Y[0] + (v + 2) / 22 * (o.Y[1] - o.Y[0]);
    const setC = async v => { const o = await G(); await touch(line(o.x[0], Y(o, o.c), o.x[0], Y(o, v), 12)) };
    const setM = async m => { const o = await G(); await touch(line(o.x[1], Y(o, 4 * o.m + o.c), o.x[1], Y(o, 4 * m + o.c), 12)) };
    let o = await G(); await touch(line(o.x[0], o.H * .44, o.x[2], o.H * .44, 16)); assert.match(await p.textContent('.fl-task'), /spot on/); await nextOn(); await next(); await p.waitForTimeout(300);
    await setC(3); await nextOn(); await next(); await p.waitForTimeout(300); await setM(2); assert.match(await p.textContent('.fl-task'), /2x \+ 3/); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(1); await setC(5); await setM(1); assert.match(await p.textContent('.fl-task'), /cross at 2 km/); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(1); await setC(6); await setM(-1); await nextOn(); await next(); await p.waitForTimeout(300);
    o = await G(); await setC(2); await touch([[o.x[2], Y(o, 7)]]); assert.match(await A(() => document.querySelector('.fl-cv').getAttribute('aria-label')), /crosses the y-axis at 2/); await next(); await p.waitForTimeout(300);
    o = await G(); const t = o.t; await setC(t.c); await setM(-t.m || 1); assert.match(await p.textContent('.fl-fb'), /wrong way|gradient|steepness|c is right/);
    await setM(t.m); assert.match(await p.textContent('.fl-fb'), /✓/); await axeFlag();
  });
  }
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
