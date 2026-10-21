// Round-12 e2e: labs reach their win state in challenge mode (animated ✓, haptic tick, Next challenge), sandbox hides
// the goal, hand-written lessons show their new lab, starter lessons lazy-load theirs, and every lab passes axe
// (WCAG 2 AA, colour contrast included) in both themes.
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 12).join('\n      ')) } }
const LABS = ['problab', 'statlab', 'numzoom', 'graphlab', 'geolab', 'matrixlab', 'gaslab', 'reactlab', 'wavelab', 'forcelab', 'ecolab', 'platelab', 'celllab', 'cyclelab', 'chainlab', 'bodylab'];
(async () => {
  const browser = await chromium.launch(), p = await browser.newPage({ viewport: { width: 1200, height: 900 } }); const errors = [];
  p.on('pageerror', e => errors.push(e.message)); p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await p.addInitScript(() => { try { localStorage.setItem('wn_drafts', '1') } catch (e) {} window.__buzz = []; Object.defineProperty(navigator, 'vibrate', { value: ms => (window.__buzz.push(ms), true), configurable: true }) });
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
  {
  // touch helpers: synthetic touch PointerEvents in canvas units (cv.__A exposes the kit API)
  const touch = (pts, id = 1) => p.evaluate(([pts, id]) => { const cv = document.querySelector('.fl-cv'), A = cv.__A, r = cv.getBoundingClientRect(), k = r.width / A.W;
    const ev = (t, x, y, i) => cv.dispatchEvent(new PointerEvent(t, { pointerId: i, pointerType: 'touch', isPrimary: i === 1, clientX: r.left + x * k, clientY: r.top + y * k, bubbles: true, cancelable: true }));
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
  }
  await test('no console or page errors', async () => assert.deepStrictEqual(errors, []));
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) }
})();
