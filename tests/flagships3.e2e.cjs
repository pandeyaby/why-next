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
  }
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
