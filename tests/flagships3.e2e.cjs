// Flagship e2e part 3 (flagships 10+): real touch gestures, predictions, misconception feedback and axe for each flagship.
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
  await p.goto(URL);await p.waitForFunction("window.WN_WARM");
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
  await test('flagship (acids): squeeze the lemon into cabbage juice, place liquids on the pH scale, neutralise drop by drop, dilution is not neutralisation, challenge feedback, axe', async () => {
    await open('mt_AN2kJE6I0s'); let [W, H] = await WH();
    const ac = () => A(() => { const A = document.querySelector('.fl-cv').__A; return { g: A.ac.geo(), pH: A.ac.pH(), st: { V: A.ac.st.V, n: A.ac.st.n, q: A.ac.st.q } } });
    const bot = k => p.evaluate(k => document.querySelector('.fl-cv').__A.ac.bot(k), k), settle = () => p.waitForFunction(() => !document.querySelector('.fl-cv').__A.ac.st.drops.length, null, { timeout: 4000 });
    const pour = async (k, times = 1) => { for (let i = 0; i < times; i++) { const [x, y] = await bot(k), o = await ac(); await touch(line(x, y, o.g.bx, o.g.by - o.g.bh * .6, 10)); await settle() } };
    await pick(0); let o = await ac(); await touch(line(o.g.bx + o.g.bw * .9, o.g.by - o.g.bh - 40, o.g.bx, o.g.by - o.g.bh * .5, 10)); await settle(); await nextOn(); assert.match(await p.textContent('.fl-task'), /an acid/); await next(); await p.waitForTimeout(300);
    const sc = await A(() => document.querySelector('.fl-cv').__A.ac.scl()), vals = [2, 3, 6.5, 7, 9, 10, 13];
    for (let i = 0; i < 7; i++) { const [x, y] = await p.evaluate(i => document.querySelector('.fl-cv').__A.ac.cardXY(i), i); await touch(line(x, y, sc.l + vals[i] / 14 * (sc.r - sc.l), sc.y - 20, 10)) }
    await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(0); await pour('alkali', 9); assert.ok((await ac()).pH < 3, 'still acidic after 9 drops'); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled));
    await pour('alkali'); await nextOn(); assert.match(await p.textContent('.fl-task'), /10 drops/); await next(); await p.waitForTimeout(300);
    await pick(1); await pour('water', 7); o = await ac(); assert.ok(o.pH < 3); await nextOn(); assert.match(await p.textContent('.fl-task'), /cannot neutralise/); await next(); await p.waitForTimeout(300);
    await next(); await p.waitForTimeout(300);
    o = await ac(); const need = o.st.n > 0 ? 'alkali' : 'acid', wrong = o.st.n > 0 ? 'acid' : 'alkali', k = Math.round(Math.abs(o.st.n) / .01);
    await pour(wrong); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /further from 7/);
    await p.click('.fl-chal [data-r]'); await pour('water'); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /only dilutes/);
    await pour(need, k + 1); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /Too far/);
    await pour(wrong); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /✓/); await axeFlag();
  });
  await test('flagship (atoms): zoom into gold, sort element/compound/mixture with O2 and air traps, build H2O and CO2, formula challenge feedback, axe', async () => {
    await open('mt_Z_Wu_77ybI'); let [W, H] = await WH();
    await pick(1); await touch(line(W / 2, H * .85, W / 2, H * .1, 16)); await touch(line(W / 2, H * .85, W / 2, H * .1, 16)); await nextOn(); assert.match(await p.textContent('.fl-task'), /spot on/); await next(); await p.waitForTimeout(300);
    const card = i => p.evaluate(i => document.querySelector('.fl-cv').__A.am.cardXY(i), i), bin = i => p.evaluate(i => document.querySelector('.fl-cv').__A.am.binR(i), i), drop = async (i, b) => { const [x, y] = await card(i), r = await bin(b); await touch(line(x, y, r.x + r.w / 2, r.y + r.h / 2, 10)) };
    await drop(1, 1); assert.match(await p.textContent('.fl-fb'), /only one type of atom, so it is an element/); await drop(5, 1); assert.match(await p.textContent('.fl-fb'), /mixture/);
    for (const [i, b] of [[0, 0], [1, 0], [2, 1], [3, 1], [4, 2], [5, 2]]) await drop(i, b); await nextOn(); await next(); await p.waitForTimeout(300);
    const tr = await A(() => { const A = document.querySelector('.fl-cv').__A; return { t: A.am.tray(), r: A.am.R() } }), T = e => tr.t.find(x => x[0] === e);
    const place = async (e, x, y) => { const t = T(e); await touch(line(t[1], t[2], x, y, 10)) };
    const cx = W / 2, cy = H * .6, r = tr.r;
    await pick(1); await place('O', cx, cy); await place('H', cx - r * 1.8, cy + r); await place('H', cx + r * 1.8, cy + r); await nextOn(); assert.match(await p.textContent('.fl-task'), /H₂O/); await next(); await p.waitForTimeout(300);
    await pick(0); await place('C', cx, cy); await place('O', cx - r * 2, cy); await place('O', cx + r * 2, cy); await nextOn(); await next(); await p.waitForTimeout(300);
    await next(); await p.waitForTimeout(300);
    const f = await A(() => document.querySelector('.fl-cv').__A.am.st.q.f), cnt = {}; f.replace(/([A-Z])(\d*)/g, (_, e, n) => { cnt[e] = (cnt[e] || 0) + (+n || 1) });
    const els = Object.entries(cnt), hub = els.find(([e]) => e !== 'H') || els[0];
    await place(hub[0], cx, cy); await place('H', cx, cy - r * 6 > H * .25 ? cy - r * 6 : H * .9); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /not all joined|You built/);
    await p.click('.fl-chal [data-clr]');
    // build: chain the non-H atoms in a row, then H atoms around
    const heavy = [], hs = []; els.forEach(([e, k]) => { for (let i = 0; i < k; i++) (e === 'H' ? hs : heavy).push(e) }); if (!heavy.length) heavy.push(hs.pop());
    const pos = heavy.map((e, i) => [cx + (i - (heavy.length - 1) / 2) * r * 2.1, cy]); for (let i = 0; i < heavy.length; i++) await place(heavy[i], ...pos[i]);
    const spots = []; pos.forEach(([x, y]) => [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dx, dy]) => spots.push([x + dx * r * 1.8, y + dy * r * 1.8])));
    const ok = []; for (const s of spots) { if (ok.length >= hs.length) break; const occupied = await p.evaluate(([x, y, r]) => document.querySelector('.fl-cv').__A.am.st.at.some(a => Math.hypot(a.x - x, a.y - y) < r), [s[0], s[1], r]); if (!occupied) { await place('H', ...s); ok.push(s) } }
    await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-chal .fl-fb'), /✓/, f); await axeFlag();
  });
  await test('flagship (area under a curve): drag time for rectangle and triangle distances, strips slider converges, negative area cancels, sandbox chips, limit challenge feedback, axe', async () => {
    await open('mt_P-VlHqNpca'); let [W, H] = await WH();
    const ar = () => A(() => { const A = document.querySelector('.fl-cv').__A; return { g: A.ar.geo(), st: { b: A.ar.st.b, n: A.ar.st.n, q: A.ar.st.q }, I: A.ar.integ() } });
    const toB = async b => { const o = await ar(); await touch(line(o.g.Xb, o.g.Y0, o.g.X0 + b * o.g.sx, o.g.Y0, 14)) };
    await pick(1); await toB(6); await nextOn(); assert.match(await p.textContent('.fl-task'), /60 m/); await next(); await p.waitForTimeout(300);
    await pick(1); await toB(6); assert.ok(Math.abs((await ar()).I - 36) < 1e-6); await nextOn(); assert.match(await p.textContent('.fl-task'), /36 m/); await next(); await p.waitForTimeout(300);
    await pick(0); const g = await A(() => { const A = document.querySelector('.fl-cv').__A, g = A.ar.geo(); return [A.W, A.H] }); const l = W < 520 ? 40 : 52, tx = l + 10, tw = W - l - 18 - 20, ty = (await A(() => { const A = document.querySelector('.fl-cv').__A; return A.H * .1 + 40 + (A.narrow ? 20 : 0) }));
    await touch(line(tx, ty, tx + tw * 8 / 49, ty, 8)); assert.ok(await p.$eval('.fl-nav button:last-child', b => b.disabled), '9 strips is not within 5%'); await touch(line(tx + tw * 8 / 49, ty, tx + tw * 30 / 49, ty, 12)); await nextOn(); assert.match(await p.textContent('.fl-task'), /settle on/); await next(); await p.waitForTimeout(300);
    await pick(0); await toB(4); await nextOn(); assert.match(await p.textContent('.fl-task'), /cancel/); await next(); await p.waitForTimeout(300);
    await p.click('button:text-is("y = 3")'); await toB(2); assert.ok(Math.abs((await ar()).I - 6) < 1e-6, 'sandbox chip switches to y = 3'); await next(); await p.waitForTimeout(300);
    const q = (await ar()).st.q, F = { x2: b => 2 * b, k3: b => 3, x1: b => b }[q.fn], hb = { x2: q.K / 2, k3: null, x1: q.K }[q.fn];
    if (hb != null && hb <= 8 && hb !== q.ans) { await toB(hb); assert.match(await p.textContent('.fl-chal .fl-fb'), /Area, not height/) } else { await toB(Math.min(8, q.ans + 1)); assert.match(await p.textContent('.fl-chal .fl-fb'), /too big/) }
    await toB(q.ans); assert.match(await p.textContent('.fl-chal .fl-fb'), /✓/); await axeFlag();
  });
  await test('reel catalogue: each visit rotates to an unseen reel (localStorage), "Another reel" swaps, all seen restarts', async () => {
    await p.evaluate(() => localStorage.removeItem('wn_reels_seen')); const fs = [], N = await p.evaluate(() => WN_REELS.mt_EDgw64OmfA.length);
    for (let i = 0; i < N; i++) { await p.evaluate(() => select('mt_Y5xC--f9Eh')); await p.waitForTimeout(200); await p.evaluate(() => select('mt_EDgw64OmfA')); await p.waitForSelector('.reel[data-f]'); fs.push(await p.$eval('.reel', e => e.dataset.f)) }
    assert.ok(N > 1); assert.strictEqual(new Set(fs).size, N, 'every visit shows an unseen reel: ' + fs); assert.match(await p.textContent('.reel figcaption'), new RegExp('of ' + N));
    const seen = await p.evaluate(() => JSON.parse(localStorage.getItem('wn_reels_seen')).mt_EDgw64OmfA); assert.strictEqual(seen.length, N);
    const f0 = await p.$eval('.reel', e => e.dataset.f); await p.click('.reel-next'); assert.notStrictEqual(await p.$eval('.reel', e => e.dataset.f), f0);
  });
  await test('reel memory survives corrupt storage (null, array, string, junk entries): no crash, every reel still shown once per cycle (verify/WhyNextState.tla)', async () => {
    const N = await p.evaluate(() => WN_REELS.mt_EDgw64OmfA.length);
    for (const bad of ['null', '[]', '"x"', '{"mt_EDgw64OmfA":"abc"}', '{"mt_EDgw64OmfA":{"a":1}}', '{"mt_EDgw64OmfA":[1,null]}', '{oops']) {
      await p.evaluate(b => localStorage.setItem('wn_reels_seen', b), bad); const fs = [];
      for (let i = 0; i < N; i++) { await p.evaluate(() => select('mt_Y5xC--f9Eh')); await p.waitForTimeout(120); await p.evaluate(() => select('mt_EDgw64OmfA')); await p.waitForSelector('.reel[data-f]'); fs.push(await p.$eval('.reel', e => e.dataset.f)) }
      assert.strictEqual(new Set(fs).size, N, bad + ': ' + fs);
      const seen = await p.evaluate(() => JSON.parse(localStorage.getItem('wn_reels_seen')).mt_EDgw64OmfA); assert.ok(Array.isArray(seen) && seen.length === N, bad);
    }
  });
  await test('lesson progress loads safely from corrupt storage and a junk best never poisons the score', async () => {
    for (const bad of ['{"progress":null}', '{"progress":[1]}', '{"progress":{"mt_EDgw64OmfA":"x","mt_AN2kJE6I0s":{"best":"NaN","status":"mastered"}}}', '[]', '{oops']) {
      const q = await browser.newPage(), errs = []; q.on('pageerror', e => errs.push(e.message));
      await q.addInitScript(b => { if (!sessionStorage.getItem('seeded')) { sessionStorage.setItem('seeded', '1'); localStorage.setItem('whynext.learn.v1', b) } }, bad);
      await q.goto(URL); await q.waitForFunction('window.WN_WARM');
      const r = await q.evaluate(() => { select('mt_EDgw64OmfA'); LEARN.setProg('mt_AN2kJE6I0s', {}); const b = LEARN.prog('mt_AN2kJE6I0s'); return { t: typeof LEARN.prog('mt_EDgw64OmfA'), best: b.best, st: b.status } });
      assert.deepStrictEqual(errs, [], bad); assert.strictEqual(r.t, 'object', bad); assert.ok(r.best === undefined || Number.isFinite(r.best), bad + ' best=' + r.best);
      await q.close();
    }
  });
  }
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
