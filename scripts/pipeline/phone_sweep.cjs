// Phone sweep: every lesson (and every lab step) on iPhone 13 + 360x640 Android, dark + light.
// Reports horizontal overflow, clipped text, the Guide launcher covering content, and blank/unfinished lessons.
// Usage: NODE_PATH=$PWD/node_modules node scripts/pipeline/phone_sweep.cjs [--only=id1,id2] [--vp=iphone,android] [--out=/workspace/sweep.json]
const fs = require('fs'), path = require('path'), { chromium, devices } = require('playwright');
const ROOT = path.resolve(__dirname, '../..'), VIEWER = 'file://' + ROOT + '/out/viewer.html?seed=3';
const arg = (k, d) => (process.argv.find(a => a.startsWith('--' + k + '=')) || '').slice(k.length + 3) || d;
const VPS = { iphone: devices['iPhone 13'], android: { viewport: { width: 360, height: 640 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
const lessons = fs.readdirSync(ROOT + '/learn/lessons').filter(f => f.endsWith('.json')).map(f => ({ file: f, ...JSON.parse(fs.readFileSync(ROOT + '/learn/lessons/' + f)) }));
const only = arg('only', ''); const picks = lessons.filter(l => !only || only.split(',').includes(l.topicId) || only.split(',').some(o => l.file.includes(o)));

// Runs inside the page: returns a list of {kind, where, note} problems for the current lesson state.
function audit() {
  const out = [], vw = innerWidth, d = document.getElementById('detail'), fab = document.getElementById('gdFab');
  const desc = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
  const vis = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' };
  const scroller = e => { for (let n = e; n && n !== d; n = n.parentElement) { const s = getComputedStyle(n); if (/(auto|scroll)/.test(s.overflowX) && n.scrollWidth > n.clientWidth) return true } return false };
  if (document.documentElement.scrollWidth > vw + 1) out.push({ kind: 'doc-hscroll', where: 'html', note: document.documentElement.scrollWidth + '>' + vw });
  d.querySelectorAll('*').forEach(e => {
    if (!vis(e) || e.closest('.sr-only,.vh') || (e.closest('svg') && e.tagName !== 'svg')) return;  // shapes inside an svg are clipped by the svg itself
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    if (!scroller(e) && (r.right > vw + 1.5 || r.left < -1.5) && !e.closest('.reel,.reels')) out.push({ kind: 'overflow-x', where: desc(e), note: Math.round(r.left) + '..' + Math.round(r.right) });
    if (/(hidden|clip)/.test(s.overflowX) && e.tagName !== 'CANVAS' && e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0) out.push({ kind: 'clipped-x', where: desc(e), note: e.scrollWidth + '>' + e.clientWidth });
    if (/(hidden|clip)/.test(s.overflowY) && e.tagName !== 'CANVAS' && e.scrollHeight > e.clientHeight + 3 && e.clientHeight > 0 && e.textContent.trim() && !e.closest('svg')) out.push({ kind: 'clipped-y', where: desc(e), note: e.scrollHeight + '>' + e.clientHeight });
  });
  if (fab && !fab.hidden) {
    const f = fab.getBoundingClientRect(), hit = [];
    const box = r => r.left < f.right && r.right > f.left && r.top < f.bottom && r.bottom > f.top && r.width > 0;
    d.querySelectorAll('canvas,button,input,select,textarea,a[href],summary,img,.reel').forEach(e => { if (vis(e) && box(e.getBoundingClientRect())) hit.push(desc(e)) });
    const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT), rg = document.createRange();
    for (let n; (n = w.nextNode());) { if (!n.nodeValue.trim() || !n.parentElement || !vis(n.parentElement)) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (box(r)) { hit.push('text:' + n.nodeValue.trim().slice(0, 24)); break } }
    if (hit.length) out.push({ kind: 'fab-covers', where: hit.slice(0, 3).join(' | '), note: fab.dataset.spot || '' });
  }
  return out;
}
// Runs inside the page: is the lesson complete and non-blank?
function completeness(expectLab) {
  const out = [], d = document.getElementById('detail'), txt = d.innerText;
  if (/Loading (the lab|details)/.test(txt)) out.push({ kind: 'blank', where: 'detail', note: 'still shows a loading placeholder' });
  const heads = [...d.querySelectorAll('h3.lsub')].map(h => h.textContent);
  if (!heads.some(h => /Understand/.test(h))) out.push({ kind: 'blank', where: 'detail', note: 'no "Understand it" section' });
  if (!heads.some(h => /Practi[sc]e/.test(h))) out.push({ kind: 'blank', where: 'detail', note: 'no Practise section' });
  if (!heads.some(h => /Mastery/.test(h))) out.push({ kind: 'blank', where: 'detail', note: 'no Mastery section' });
  if (!d.querySelector('p.key')) out.push({ kind: 'blank', where: 'detail', note: 'no key idea' });
  if (txt.length < 1200) out.push({ kind: 'blank', where: 'detail', note: 'only ' + txt.length + ' characters of text' });
  if (/\b(TODO|TBD|lorem ipsum|coming soon|placeholder)\b/i.test(txt)) out.push({ kind: 'blank', where: 'detail', note: 'placeholder wording: ' + (txt.match(/\b(TODO|TBD|lorem ipsum|coming soon|placeholder)\b/i) || [])[0] });
  if (expectLab && !d.querySelector('.vis canvas, .vis svg, .vbox canvas, .vbox svg')) out.push({ kind: 'blank', where: 'lab', note: 'lab canvas did not render' });
  d.querySelectorAll('canvas').forEach(c => { try { const x = c.getContext('2d'); if (!x || !c.width) return; const px = x.getImageData(0, 0, c.width, c.height).data, seen = new Set(); for (let i = 0; i < px.length; i += 4 * 97) seen.add(px[i] + ',' + px[i + 1] + ',' + px[i + 2] + ',' + px[i + 3]); if (seen.size < 4) out.push({ kind: 'blank', where: 'canvas', note: 'canvas has ' + seen.size + ' colours' }) } catch (e) { } });
  return out;
}
(async () => {
  const b = await chromium.launch(), res = [], seen = new Set(); let n = 0;
  for (const vp of arg('vp', 'iphone,android').split(',')) {
    const ctx = await b.newContext(VPS[vp]), p = await ctx.newPage(); p.on('pageerror', e => res.push({ vp, kind: 'js-error', where: 'page', note: String(e).slice(0, 120) }));
    await p.goto(VIEWER); await p.waitForFunction('window.WN_WARM'); await p.addInitScript('');
    for (const theme of ['dark', 'light']) {
      const cur = await p.evaluate(() => document.documentElement.dataset.theme || 'dark'), isLight = cur === 'classic' || cur === 'light';
      if ((theme === 'light') !== isLight) await p.click('#themeBtn');
      for (const L of picks) {
        const tag = { vp, theme, id: L.topicId, file: L.file.replace('.json', '') }, add = (list, step) => list.forEach(f => { const key = [vp, theme, L.topicId, f.kind, f.where].join('|'); if (!seen.has(key)) { seen.add(key); res.push({ ...tag, step, ...f }) } });
        try {
          await p.evaluate(id => select(id), L.topicId);
          await p.waitForFunction(() => document.querySelector('#detail .lhead') && !/Loading (the lab|details)/.test(document.getElementById('detail').innerText), null, { timeout: 12000 }).catch(() => { });
          await p.waitForTimeout(450);
          add(await p.evaluate(completeness, !!L.lab), -1);
          const steps = await p.evaluate(() => { const c = document.querySelector('.fl-cv'); return c && c.__A ? document.querySelectorAll('.fl-dots > *').length : 0 });
          for (let s = 0; s < Math.max(1, steps); s++) {
            if (steps) { await p.evaluate(s => document.querySelector('.fl-cv').__A.go(s), s); await p.waitForTimeout(160) }
            // look at the page at the top, at the lab, and at the bottom: the launcher moves as the page scrolls
            for (const where of steps ? ['lab'] : ['top', 'mid', 'end']) {
              await p.evaluate(w => { const d = document.getElementById('detail'), lab = document.querySelector('.fl-cv'); if (w === 'lab' && lab) lab.scrollIntoView({ block: 'center' }); else window.scrollTo(0, w === 'top' ? d.offsetTop : w === 'mid' ? document.body.scrollHeight / 2 : document.body.scrollHeight) }, where);
              await p.waitForTimeout(520);
              add(await p.evaluate(audit), steps ? s : where);
            }
          }
        } catch (e) { add([{ kind: 'sweep-error', where: 'select', note: String(e).slice(0, 120) }], -1) }
        if (++n % 20 === 0) console.error('..', vp, theme, n, 'findings', res.length);
      }
    }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(arg('out', '/workspace/sweep.json'), JSON.stringify(res, null, 1));
  const by = {}; res.forEach(r => { const k = r.kind; (by[k] = by[k] || new Set()).add(r.file) });
  console.log('lessons', picks.length, 'findings', res.length); Object.entries(by).forEach(([k, v]) => console.log(' ', k, v.size, 'lessons'));
  process.exit(res.length ? 1 : 0);
})();
