// Phone layout: on iPhone 13 and a 360x640 Android viewport, in both themes, the Guide launcher never covers lesson content,
// a 7-step lab fits without clipping, and the launcher still opens the guide.
const path = require('path'), assert = require('assert'), { chromium, devices } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
const PHONES = { 'iPhone 13': devices['iPhone 13'], 'Android 360x640': { viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 10).join('\n      ')) } }
// What the Guide tab overlaps right now: canvases, buttons, inputs, images, and any line of text.
const overlaps = () => {
  const fab = document.getElementById('gdFab'), f = fab.getBoundingClientRect(), d = document.getElementById('detail'), hit = [];
  const touches = r => r.width > 0 && r.left < f.right && r.right > f.left && r.top < f.bottom && r.bottom > f.top;
  d.querySelectorAll('canvas,button,input,select,textarea,a[href],summary,img').forEach(e => { if (touches(e.getBoundingClientRect())) hit.push(e.tagName + '.' + e.className) });
  const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT), rg = document.createRange();
  for (let n; (n = w.nextNode());) { if (!n.nodeValue.trim()) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (touches(r)) { hit.push('text:' + n.nodeValue.trim().slice(0, 30)); break } }
  return { hit, box: [Math.round(f.left), Math.round(f.top), Math.round(f.width), Math.round(f.height)], vw: innerWidth };
};
(async () => {
  const browser = await chromium.launch();
  for (const [phone, opts] of Object.entries(PHONES)) {
    const ctx = await browser.newContext(opts), p = await ctx.newPage(), errors = []; p.on('pageerror', e => errors.push(e.message));
    await p.goto(URL); await p.waitForFunction('window.WN_WARM');
    for (const theme of ['dark', 'light']) {
      const cur = await p.evaluate(() => document.documentElement.dataset.theme || 'dark');
      if ((theme === 'light') !== (cur === 'classic' || cur === 'light')) await p.click('#themeBtn');
      const open = async id => { await p.evaluate(id => select(id), id); await p.waitForSelector('.vis.flag .fl-cv', { timeout: 10000 }); await p.waitForTimeout(500) };
      for (const [id, name] of [['mt_q8uN41TdjS', 'wave diagrams (7 steps)'], ['mt_dx_t8RtPt5', 'covalent bonding'], ['mt_LxK9OKZQZX', 'wave rope']])
        await test(`${phone}, ${theme}: ${name}: Guide tab covers nothing and the lab is not clipped at any step`, async () => {
          await open(id); const steps = await p.$$eval('.fl-dots > *', d => d.length);
          for (let s = 0; s < steps; s++) {
            await p.evaluate(s => document.querySelector('.fl-cv').__A.go(s), s);
            await p.evaluate(() => document.querySelector('.fl-cv').scrollIntoView({ block: 'center' })); await p.waitForTimeout(650);
            const o = await p.evaluate(overlaps); assert.deepStrictEqual(o.hit, [], `step ${s}: Guide tab at ${o.box} overlaps`);
            assert.ok(o.box[0] + o.box[2] <= o.vw + 1, 'Guide tab is on screen');
            const clip = await p.evaluate(() => { const f = document.querySelector('.vis.flag'); return [f.scrollWidth, f.clientWidth, document.documentElement.scrollWidth, innerWidth] });
            assert.ok(clip[0] <= clip[1] + 1, `step ${s}: lab clipped ${clip[0]}>${clip[1]}`); assert.ok(clip[2] <= clip[3] + 1, `step ${s}: page scrolls sideways`) } });
      await test(`${phone}, ${theme}: Guide tab opens and closes the guide; its name stays for screen readers`, async () => {
        await open('mt_q8uN41TdjS'); assert.match(await p.getAttribute('#gdFab', 'aria-label'), /guide/i);
        const size = await p.$eval('#gdFab', f => { const r = f.getBoundingClientRect(); return [r.width, r.height] }); assert.ok(size[0] >= 24 && size[1] >= 44, 'target size ' + size);
        await p.click('#gdFab'); assert.ok(await p.isVisible('#guide'), 'guide opens'); await p.click('#guide .gd-x'); assert.ok(await p.isVisible('#gdFab'), 'tab returns') });
    }
    await test(`${phone}: no page errors`, async () => assert.deepStrictEqual(errors, []));
    await ctx.close();
  }
  await browser.close(); if (failures) { console.log(failures, 'failed'); process.exit(1) } console.log('phone layout ok') })();
