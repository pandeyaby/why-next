// Flagship e2e part 2 (flagships 8+): real touch gestures, predictions, misconception feedback and axe for each flagship.
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
  await test('flagship (probability): flick the spinner, drag the red edge to 1/6 and 1/4, fill the bag to 2/6, place cards on the 0-1 line, 100 quick spins, tap-to-colour challenge feedback, axe', async () => {
    await open('mt_-c4Ca_nBzX'); let [W, H] = await WH();
    const pb = () => A(() => { const A = document.querySelector('.fl-cv').__A, g = A.pb.geo(); return { g, h: A.pb.handle(), st: A.pb.st } });
    const flick = async () => { const { g } = await pb(); const pts = Array.from({ length: 14 }, (_, i) => { const a = -Math.PI / 2 + i * .25; return [g.cx + g.R * .7 * Math.cos(a), g.cy + g.R * .7 * Math.sin(a)] }); await touch(pts); await p.waitForFunction(() => !document.querySelector('.fl-cv').__A.pb.st.w, null, { timeout: 6000 }) };
    await pick(0); for (let i = 0; i < 5; i++) { await flick(); } assert.strictEqual((await pb()).st.spins, 5); await nextOn(); assert.match(await p.textContent('.fl-task'), /1\/3 in the long run/); assert.match(await p.textContent('.fl-task'), /now you know/); await next(); await p.waitForTimeout(300);
    const edgeTo = async f => { const o = await pb(), a = o.st.phi + f * 2 * Math.PI; await touch(line(o.h[0], o.h[1], o.g.cx + o.g.R * Math.cos(a), o.g.cy + o.g.R * Math.sin(a), 12)) };
    await edgeTo(1 / 6); assert.strictEqual((await pb()).st.n, 6); await nextOn(); await next(); await p.waitForTimeout(300);
    await pick(1); await edgeTo(.25); await nextOn(); assert.match(await p.textContent('.fl-task'), /not colours/); await next(); await p.waitForTimeout(300);
    await pick(1); const bg = await A(() => { const A = document.querySelector('.fl-cv').__A; return A.pb.bagG() });
    for (const gr of [1, 1, 0, 0, 0, 0]) { const t = bg.tray.find(x => x[2] === gr); await touch(line(t[0], t[1], bg.bx, bg.by, 10)) }
    await nextOn(); assert.match(await p.textContent('.fl-task'), /2\/6 = 1\/3/); await next(); await p.waitForTimeout(300);
    const lg = await A(() => document.querySelector('.fl-cv').__A.pb.lineG()), vals = [1 / 6, 1 / 2, 0, 1, 1 / 4];
    for (let i = 0; i < 5; i++) { const [x, y] = await p.evaluate(i => document.querySelector('.fl-cv').__A.pb.cardXY(i), i); await touch(line(x, y, lg.l + vals[i] * (lg.r - lg.l), lg.y - 20, 10)) }
    await nextOn(); assert.match(await p.textContent('.fl-task'), /0 for a 7/); await next(); await p.waitForTimeout(300);
    await p.click('button:text-is("⚡ 100 quick spins")'); assert.strictEqual((await pb()).st.spins, 100); await next(); await p.waitForTimeout(300);
    const q = (await pb()).st.q, tapN = async k => { const o = await pb(); for (let i = 0; i < k; i++) { const a = o.st.phi + (i + .5) / q.n * 2 * Math.PI; await touch([[o.g.cx + o.g.R * .6 * Math.cos(a), o.g.cy + o.g.R * .6 * Math.sin(a)]]) } };
    await tapN(q.d); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-fb'), q.d === q.ans ? /✓/ : /bottom number/);
    if (q.d !== q.ans) { await p.click('.fl-chal [data-clr]'); await tapN(q.ans); await p.click('.fl-chal [data-ok]'); assert.match(await p.textContent('.fl-fb'), /✓/) }
    await axeFlag();
  });
  await test('flagship (states of matter): heat to melt, tilt a solid and a liquid, boil and lift the lid, sort with sand/honey traps, mystery-substance challenge feedback, axe', async () => {
    await open('mt_1JFUNQDwAJ'); let [W, H] = await WH();
    const sm = () => A(() => { const A = document.querySelector('.fl-cv').__A, g = A.sm.geo(); return { g, st: { T: A.sm.st.T, th: A.sm.st.th, jh: A.sm.st.jh, rng: A.sm.st.rng, sub: A.sm.st.sub, q: A.sm.st.q } } });
    const ty = (o, T) => o.g.t1 - (T - o.st.rng[0]) / (o.st.rng[1] - o.st.rng[0]) * (o.g.t1 - o.g.t0);
    const heat = async T => { const o = await sm(); await touch(line(o.g.tx, ty(o, o.st.T), o.g.tx, ty(o, T), 14)) };
    const tilt = async dx => { const o = await sm(); await touch(line(o.g.cx, o.g.cy - o.g.jh / 2, o.g.cx + dx, o.g.cy - o.g.jh / 2, 12)) };
    await pick(1); await heat(20); assert.ok((await sm()).st.T > 0); await nextOn(); assert.match(await p.textContent('.fl-task'), /spot on/); await next(); await p.waitForTimeout(300);
    await pick(0); await tilt(W * .35); assert.ok((await sm()).st.th >= 30); await nextOn(); assert.match(await p.textContent('.fl-task'), /keeps its shape/); await next(); await p.waitForTimeout(300);
    await pick(1); await tilt(-W * .35); await nextOn(); assert.match(await p.textContent('.fl-task'), /level/); await next(); await p.waitForTimeout(300);
    await pick(1); await heat(120); let o = await sm(); assert.ok(o.st.T > 100); await touch(line(o.g.cx, o.g.cy - o.g.jh - 12, o.g.cx, o.g.cy - o.g.jh * 1.8, 12)); await nextOn(); assert.match(await p.textContent('.fl-task'), /fill the whole jar/); await next(); await p.waitForTimeout(300);
    const card = i => p.evaluate(i => document.querySelector('.fl-cv').__A.sm.cardXY(i), i), bin = i => p.evaluate(i => document.querySelector('.fl-cv').__A.sm.binR(i), i), drop = async (i, b) => { const [x, y] = await card(i), r = await bin(b); await touch(line(x, y, r.x + r.w / 2, r.y + r.h / 2, 10)) };
    await drop(5, 1); assert.match(await p.textContent('.fl-fb'), /each grain is a tiny solid/); await drop(4, 0); assert.match(await p.textContent('.fl-fb'), /flows, just slowly|it flows/);
    for (const [i, b] of [[0, 0], [1, 1], [2, 2], [3, 0], [4, 1], [5, 0], [6, 2]]) await drop(i, b); await nextOn(); await next(); await p.waitForTimeout(300);
    await next(); await p.waitForTimeout(300);
    o = await sm(); const { m, b } = o.st.sub, want = o.st.q.want, mid = (m + b) / 2, wrong = want === 1 ? b + (o.st.rng[1] - b) / 2 : mid, right = [m - (m - o.st.rng[0]) / 2, mid, b + (o.st.rng[1] - b) / 2][want];
    await heat(wrong); assert.match(await p.textContent('.fl-chal .fl-fb'), want === 1 ? /Past its boiling point/ : want === 0 ? /has melted/ : /Melted is not the same as boiled/);
    await heat(right); assert.match(await p.textContent('.fl-chal .fl-fb'), /✓/); await axeFlag();
  });
  }
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
