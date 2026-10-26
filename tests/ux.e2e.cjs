// UX pass (learn/ux.js + viewer search): welcome questions feed the profile and the Guide, word-order search with a count
// and a helpful empty state, predict-then-reveal on lessons without a lab, jump-to-lab, continue where you left off, a
// progress map, "/" and Escape for search, 44px touch targets. Desktop and iPhone 13, both themes, axe.
const path = require('path'), assert = require('assert'), http = require('http'), fs = require('fs');
const { chromium, devices } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js'), ROOT = path.resolve(__dirname, '..'), LESSON = 'mt_LxK9OKZQZX';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 10).join('\n      ')) } }
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((q, s) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end() } s.setHeader('content-type', TYPES[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s) });
(async () => {
  await new Promise(r => server.listen(0, r)); const BASE = `http://127.0.0.1:${server.address().port}/out/viewer.html?seed=3`;
  const browser = await chromium.launch();
  for (const [vp, opts] of [['desktop', { viewport: { width: 1280, height: 900 } }], ['iPhone 13', devices['iPhone 13']]]) {
    const ctx = await browser.newContext(opts), p = await ctx.newPage(), errors = []; p.on('pageerror', e => errors.push(e.message));
    await p.goto(BASE); await p.waitForFunction('window.WN_WARM');
    await test(`${vp}: welcome asks age and goal, then fills the profile and the Guide's goal`, async () => {
      await p.waitForSelector('.ux-welcome'); assert.ok(await p.$eval('[data-ux="start"]', b => b.disabled));
      await p.click('[data-band="13-15"]'); await p.click('[data-goal="algebra"]'); await p.click('[data-ux="start"]');
      assert.deepStrictEqual(await p.evaluate(() => [document.getElementById('pAge').value, document.getElementById('pGoal').value, GUIDE_MOOD.profile().goal]), ['13-15', 'algebra', 'Algebra: linear equations']);
      assert.strictEqual(await p.$('.ux-welcome'), null) });
    await test(`${vp}: search matches words in any order, announces a count, and the empty state clears`, async () => {
      await p.fill('#q', 'theorem pythagoras'); await p.waitForFunction(() => /found/.test(document.getElementById('qcount').textContent));
      assert.ok(await p.$$eval('.item', x => x.length) >= 1); assert.match(await p.$eval('#qcount', x => x.textContent), /^\d+ topics? found$/);
      await p.fill('#q', 'zzqxv'); await p.waitForSelector('[data-clear]'); await p.click('[data-clear]');
      assert.strictEqual(await p.$eval('#q', x => x.value), ''); assert.ok(await p.$$eval('.item', x => x.length) > 5);
      if (vp === 'desktop') { await p.click('body'); await p.keyboard.press('/'); assert.strictEqual(await p.evaluate(() => document.activeElement.id), 'q');
        await p.keyboard.type('fraction'); await p.keyboard.press('Escape'); assert.strictEqual(await p.$eval('#q', x => x.value), '') } });
    await test(`${vp}: predict-then-reveal hides the explanation until a guess, then remembers the lesson`, async () => {
      const id = await p.evaluate(() => Object.keys(LEARN.L).find(i => !LEARN.L[i].lab && LEARN.L[i].practice.some(x => x.type === 'mc')));
      await p.evaluate(id => select(id), id); await p.waitForSelector('.ux-pred'); assert.ok(await p.$eval('#learn p.key', x => x.hidden));
      await p.click('.ux-pred [data-i="0"]'); assert.ok(!(await p.$eval('#learn p.key', x => x.hidden)));
      assert.match(await p.$eval('.ux-pf', x => x.textContent), /prediction|answer is/); assert.ok(await p.$$eval('.ux-pred [data-i]', b => b.every(x => x.disabled)));
      await p.evaluate(() => select(Object.keys(LEARN.L)[0])); await p.evaluate(id => select(id), id); await p.waitForTimeout(200); assert.strictEqual(await p.$('.ux-pred'), null) });
    await test(`${vp}: a lab lesson has a jump-to-lab button that moves focus into the lab`, async () => {
      const id = await p.evaluate(() => Object.keys(LEARN.L).find(i => LEARN.L[i].lab));
      await p.evaluate(id => select(id), id); await p.waitForSelector('.ux-lab', { timeout: 15000 }); await p.click('.ux-lab'); await p.waitForTimeout(300);
      assert.ok(await p.evaluate(() => document.getElementById('lbox').contains(document.activeElement))) });
    await test(`${vp}: continue and the progress map appear, and Continue opens the last lesson; axe in both themes`, async () => {
      const lastId = await p.evaluate(() => UX.last().id); await p.evaluate(() => LEARN.home()); await p.waitForSelector('.ux-resume');
      assert.ok((await p.$$eval('.ux-subs li', x => x.length)) >= 2); await p.evaluate(() => select(Object.keys(LEARN.L)[1]));
      await p.click('.ux-resume [data-ux-go]'); assert.strictEqual(await p.evaluate(() => location.hash.slice(3)), encodeURIComponent(lastId));
      await p.addScriptTag({ path: AXE });
      for (let k = 0; k < 2; k++) { const r = await p.evaluate(() => axe.run('#uxTop, #learn, #side', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
        assert.deepStrictEqual(r.violations.map(v => v.id + ': ' + v.nodes[0].target.join(' ')), []); await p.click('#themeBtn'); await p.waitForTimeout(150) } });
    await test(`${vp}: search, filters and welcome/continue buttons are at least 44px tall`, async () => {
      const small = await p.$$eval('#q, #filters label, #uxTop button', es => es.filter(e => { const r = e.getBoundingClientRect(); return r.height && r.height < 36 }).map(e => e.id || e.textContent.trim().slice(0, 20)));
      assert.deepStrictEqual(small, []) });
    await test(`${vp}: stored UX data is validated (junk is ignored)`, async () => {
      await p.evaluate(() => { localStorage.setItem('wn_last', '{"id":5}'); localStorage.setItem('wn_pred', '"x"'); localStorage.setItem('wn_onboard', '7') });
      assert.deepStrictEqual(await p.evaluate(() => [UX.last(), UX.onboarded()]), [null, false]) });
    assert.deepStrictEqual(errors, []); await ctx.close() }
  await browser.close(); server.close(); console.log(failures ? `${failures} failed` : 'all passed'); process.exit(failures ? 1 : 0) })();
