// Live AI Guide (learn/guide_live.js) against a mocked /api/guide: opt-in toggle with a Google note, payload holds only
// coarse state (no raw signals), errors/429/offline fall back to the offline guide, never offered on file:// (the Mac app).
// Desktop and iPhone 13, both themes, axe.
const path = require('path'), assert = require('assert'), http = require('http'), fs = require('fs');
const { chromium, devices } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js'), ROOT = path.resolve(__dirname, '..'), LESSON = 'mt_LxK9OKZQZX';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 10).join('\n      ')) } }
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((q, s) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { s.statusCode = 404; return s.end() } s.setHeader('content-type', TYPES[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(s) });
const botCount = p => p.$$eval('.gd-msg.bot', m => m.length);
const waitBot = (p, n) => p.waitForFunction(n => document.querySelectorAll('.gd-msg.bot').length > n, n);
const lastBot = p => p.$$eval('.gd-msg.bot', m => m[m.length - 1].textContent);
async function ask(p, q) { const n = await botCount(p); await p.fill('.gd-in input', q); await p.press('.gd-in input', 'Enter'); await waitBot(p, n); return lastBot(p) }
(async () => {
  await new Promise(r => server.listen(0, r)); const BASE = `http://127.0.0.1:${server.address().port}/out/viewer.html?seed=3`;
  const browser = await chromium.launch();
  for (const [vp, opts] of [['desktop', { viewport: { width: 1280, height: 900 } }], ['iPhone 13', devices['iPhone 13']]]) {
    const ctx = await browser.newContext(opts), p = await ctx.newPage(), errors = []; p.on('pageerror', e => errors.push(e.message));
    let mode = 'ok', sent = null, calls = 0;
    await p.route('**/api/guide', async r => { calls++; sent = JSON.parse(r.request().postData());
      if (mode === 'ok') return r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ reply: 'Live: think of each wave as a step of length λ.' }) });
      if (mode === 'slow') return; return r.fulfill({ status: mode === 'rate' ? 429 : 502, body: '{}' }) });
    await p.goto(BASE); await p.waitForFunction('window.WN_WARM'); await p.evaluate(id => select(id), LESSON); await p.waitForSelector('#learnH');
    await p.evaluate(() => GUIDE.open()); await p.waitForSelector('#guide:not([hidden])');
    await test(`${vp}: Live AI is off by default; the toggle explains that messages go to Google`, async () => {
      assert.strictEqual(await p.evaluate(() => GUIDE_LIVE.isOn()), false); await p.$eval('.gd-set', d => { d.open = true });
      assert.match(await p.textContent('.gl-note'), /Google’s Gemini/); assert.ok(await p.$eval('.gl-badge', b => b.hidden));
      await ask(p, 'What is a wavelength?'); assert.strictEqual(calls, 0, 'no request while off') });
    await test(`${vp}: turned on, answers come from the server; only coarse state is sent`, async () => {
      await p.check('.gl-row input'); assert.ok(!(await p.$eval('.gl-badge', b => b.hidden)));
      document: { const t = await ask(p, 'Why does the wave get shorter?'); assert.match(t, /^Live: /) }
      assert.deepStrictEqual(Object.keys(sent.learner).sort(), ['profile', 'state', 'why']); assert.deepStrictEqual(Object.keys(sent.learner.profile).sort(), ['exam', 'goal', 'style', 'time']);
      assert.ok(!/wrongTimes|hintTimes|clicks|stepMs|rightTimes/.test(JSON.stringify(sent))); assert.match(sent.lesson.title, /\w/); assert.ok(sent.lesson.explain.length >= 1) });
    await test(`${vp}: server error, rate limit and a hung request all fall back to the offline guide`, async () => {
      mode = 'err'; assert.match(await ask(p, 'What is a wavelength?'), /Wavelength is the length of one whole wave.*built-in guide/);
      mode = 'rate'; assert.match(await ask(p, 'What is a wavelength?'), /built-in guide for a minute/);
      mode = 'slow'; const t0 = Date.now(); assert.match(await ask(p, 'What is a wavelength?'), /Wavelength/); assert.ok(Date.now() - t0 < 12000) });
    await test(`${vp}: offline falls back without a request; the choice survives a reload; axe in both themes`, async () => {
      mode = 'ok'; await ctx.setOffline(true); const c0 = calls; assert.match(await ask(p, 'What is a wavelength?'), /offline/); assert.strictEqual(calls, c0); await ctx.setOffline(false);
      await p.reload(); await p.waitForFunction('window.WN_WARM'); assert.strictEqual(await p.evaluate(() => GUIDE_LIVE.isOn()), true);
      await p.evaluate(() => GUIDE.open()); await p.waitForSelector('#guide:not([hidden]) .gl-row', { state: 'attached' }); await p.$eval('.gd-set', d => { d.open = true });
      if (!(await p.evaluate(() => !!window.axe))) await p.addScriptTag({ path: AXE });
      for (let k = 0; k < 2; k++) { const r = await p.evaluate(() => axe.run('#guide', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] })); assert.deepStrictEqual(r.violations.map(v => v.id + ': ' + v.nodes[0].target.join(' ')), []); await p.click('#themeBtn'); await p.waitForTimeout(150) }
      await p.uncheck('.gl-row input'); assert.strictEqual(await p.evaluate(() => GUIDE_LIVE.isOn()), false) });
    await test(`${vp}: no page errors`, async () => assert.deepStrictEqual(errors, []));
    await ctx.close();
  }
  await test('file:// (offline Mac app and offline copies): no Live AI toggle, offline brain only, even if storage says on', async () => {
    const ctx = await browser.newContext(), p = await ctx.newPage(); await p.goto('file://' + path.join(ROOT, 'out/viewer.html'));
    await p.waitForFunction('window.WN_WARM'); await p.evaluate(() => { localStorage.setItem('wn_guide_live', '1') }); await p.reload(); await p.waitForFunction('window.WN_WARM');
    await p.evaluate(() => GUIDE.open()); await p.waitForSelector('#guide:not([hidden])');
    assert.strictEqual(await p.$('.gl-row'), null); assert.deepStrictEqual(await p.evaluate(() => [GUIDE_LIVE.available(), GUIDE_LIVE.isOn()]), [false, true]);
    assert.match(await ask(p, 'What is a wavelength?'), /./); await ctx.close() });
  await browser.close(); server.close(); console.log(failures ? `${failures} failed` : 'all passed'); process.exit(failures ? 1 : 0);
})();
