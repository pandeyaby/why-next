// Screenshot a lesson's lab on a phone viewport at every step, with the Guide button visible.
// Usage: node scripts/pipeline/shot.cjs <topicId> <iphone|android|desktop> <dark|light> [prefix]   -> /workspace/shots/<prefix>-<n>.png
const path = require('path'), { chromium, devices } = require('playwright');
const VIEWER = 'file://' + path.resolve(__dirname, '../../out/viewer.html') + '?seed=3';
const VP = { iphone: devices['iPhone 13'], android: { viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, desktop: { viewport: { width: 1200, height: 800 } } };
(async () => {
  const [id, vp = 'iphone', theme = 'dark', prefix = id] = process.argv.slice(2);
  const b = await chromium.launch(), ctx = await b.newContext(VP[vp]), p = await ctx.newPage();
  await p.goto(VIEWER); await p.waitForFunction('window.WN_WARM');
  const cur = await p.evaluate(() => document.documentElement.dataset.theme || 'dark');
  if ((theme === 'light') !== (cur === 'classic' || cur === 'light')) await p.click('#themeBtn');
  await p.evaluate(id => select(id), id); await p.waitForSelector('.vis.flag .fl-cv', { timeout: 10000 }); await p.waitForTimeout(400);
  const n = await p.$$eval('.fl-dots button, .fl-dots > *', d => d.length);
  for (let s = 0; s < n; s++) {
    await p.evaluate(s => document.querySelector('.fl-cv').__A.go(s), s); await p.waitForTimeout(250);
    await p.evaluate(() => document.querySelector('.fl-cv').scrollIntoView({ block: 'center' })); await p.waitForTimeout(200);
    await p.screenshot({ path: `/workspace/shots/${prefix}-${s}.png` }) }
  await b.close(); console.log('steps', n) })();
