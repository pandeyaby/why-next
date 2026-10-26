// In-browser gate for one lesson: on desktop and on a phone, every lab step with a task completes with "Show me",
// the challenge is shown, axe finds no WCAG 2.1 AA violations in either theme, and there are no console or page errors.
// Usage: node scripts/pipeline/walk.cjs <topicId>   (exit 0 = pass; prints one JSON line with the details)
const path = require('path'), { chromium, devices } = require('playwright');
const AXE = require.resolve('axe-core/axe.min.js'), VIEWER = 'file://' + path.resolve(__dirname, '../../out/viewer.html') + '?seed=3';
async function walkLab(page) {
  const steps = await page.$$eval('.fl-dots button, .fl-dots > *', d => d.length), done = [];
  for (let s = 0; s < steps; s++) {
    await page.evaluate(s => document.querySelector('.fl-cv').__A.go(s), s); await page.waitForTimeout(150);
    const pred = await page.$('.fl-pred button'); if (pred) await pred.click();
    const show = await page.$('.fl-show');
    if (show) { await show.click(); await page.waitForFunction(() => /✓/.test((document.querySelector('.fl-task') || {}).textContent || ''), null, { timeout: 6000 }); done.push(s) } }
  return { steps, tasks: done.length } }
async function axeBothThemes(page) {
  if (!(await page.evaluate(() => !!window.axe))) await page.addScriptTag({ path: AXE });
  const found = [];
  for (let k = 0; k < 2; k++) {
    const r = await page.evaluate(() => axe.run('.vis.flag', { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] }));
    found.push(...r.violations.map(v => v.id)); await page.click('#themeBtn'); await page.waitForTimeout(200) }
  return found }
async function checkOn(browser, contextOpts, id) {
  const ctx = await browser.newContext(contextOpts), page = await ctx.newPage(), errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) });
  await page.goto(VIEWER); await page.waitForFunction('window.WN_WARM');
  await page.evaluate(id => select(id), id); await page.waitForSelector('.vis.flag .fl-cv', { timeout: 10000 }); await page.waitForTimeout(300);
  const walk = await walkLab(page); await page.evaluate(s => document.querySelector('.fl-cv').__A.go(s), walk.steps - 1); await page.waitForTimeout(200);
  const challenge = !!(await page.$('.fl-chal:not([hidden]) p')), axe = await axeBothThemes(page);
  const practice = await page.$$eval('#detail .lq, #detail [data-item]', e => e.length).catch(() => 0);
  await ctx.close(); return { ...walk, challenge, axe, errors, practice } }
(async () => {
  const id = process.argv[2]; if (!id) { console.error('usage: walk.cjs <topicId>'); process.exit(2) }
  const browser = await chromium.launch(); const out = { id };
  try { out.desktop = await checkOn(browser, { viewport: { width: 1200, height: 900 } }, id); out.phone = await checkOn(browser, { ...devices['iPhone 13'] }, id) }
  catch (e) { out.crash = e.message.split('\n')[0] }
  await browser.close();
  const ok = !out.crash && ['desktop', 'phone'].every(k => { const r = out[k]; return r.steps >= 5 && r.tasks >= 3 && r.challenge && !r.axe.length && !r.errors.length });
  console.log(JSON.stringify({ ok, ...out })); process.exit(ok ? 0 : 1) })();
