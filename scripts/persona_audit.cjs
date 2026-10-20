// Persona walk-through: every lesson as a 10-year-old, a 16-year-old and a grandparent, on phone/tablet
// profiles with touch. Logs small tap targets, jargon, missing instructions and unclear feedback.
// Usage: node scripts/persona_audit.cjs [out.json]
const path = require('path'), fs = require('fs');
const { chromium, devices } = require('playwright');
const URL = 'file://' + path.resolve(__dirname, '../out/viewer.html') + '?seed=3';
const P = { kid: { age: '10-12', dev: 'iPhone 13' }, teen: { age: '16-18', dev: 'Pixel 7' }, grand: { age: 'grand', dev: 'iPad (gen 7)' } };
const JARGON = { kid: /\b(coefficient|polynomial|parameter|denominator|numerator|integral|derivative|equivalent|correspondence|interpret|irrational)\b/i, grand: /\b(upstream|centrality|bridge edge|PROCEDURAL|CONCEPTUAL|ancestor|v1)\b/ };
const VERB = /\b(drag|tap|choose|pick|press|change|try|put|hold|step|split|slide|sort|count|shade|watch|move|use|read|tilt|play|build|heat|react|compare|find|turn|add|take|look|share|stir|open|mix|fold|test)\b/i;
(async () => {
  const b = await chromium.launch(), out = { personas: {} };
  for (const [who, cfg] of Object.entries(P)) {
    const ctx = await b.newContext({ ...devices[cfg.dev] }); await ctx.addInitScript(age => { localStorage.setItem('whynext.learn.v1', JSON.stringify({ name: '', age, goal: 'explore', knownUpTo: 'auto', level: 'auto', progress: {} })) }, cfg.age);
    const p = await ctx.newPage(); await p.goto(URL); const ids = await p.evaluate(() => Object.keys(LEARN.L)); const rep = { device: cfg.dev, small: {}, jargon: [], noVerb: [], feedback: [], lessons: ids.length };
    for (const id of ids) {
      await p.evaluate(id => select(id), id); await p.waitForSelector('#vbox .vis', { timeout: 5000 }).catch(() => {}); await p.waitForTimeout(600);
      const r = await p.evaluate(([jk, jg]) => {
        const sm = []; for (const e of document.querySelectorAll('#detail button, #detail input, #detail select, #detail summary, #detail [role=slider], #detail .vis-card')) {
          const q = e.getBoundingClientRect(); if (!q.width || getComputedStyle(e).visibility === 'hidden') continue; const inline = e.classList.contains('linkish') && e.closest('p,li,.why');
          const sl = e.closest('svg[data-slop]') && e.matches('[role=slider],.vis-handle') ? 2 * +e.closest('svg').dataset.slop : 0;
          if (!inline && (q.width + sl < 44 || q.height + sl < 44)) sm.push((e.getAttribute('aria-label') || e.textContent || e.className || e.tagName).trim().slice(0, 30) + ` (${Math.round(q.width)}×${Math.round(q.height)})`) }
        const dc = (document.querySelector('#detail .learn') || document.getElementById('detail')).cloneNode(true); dc.querySelectorAll('dfn.gl, details.teach, .sr').forEach(x => x.remove()); const txt = dc.textContent, cap = (document.querySelector('#vbox figcaption') || {}).textContent || '';
        const ac = document.getElementById('detail').cloneNode(true); ac.querySelectorAll('details.teach, .sr').forEach(x => x.remove()); const all = ac.textContent;
        return { sm, jk: (txt.match(new RegExp(jk, 'i')) || [])[0], jg: (all.match(new RegExp(jg)) || [])[0], cap, title: document.querySelector('#dcard h2').textContent } }, [JARGON.kid.source, JARGON.grand.source]);
      r.sm.forEach(s => { const k = s.replace(/ \(.*/, ''); rep.small[k] = (rep.small[k] || 0) + 1 });
      if (who === 'kid' && r.jk) rep.jargon.push(`${r.title}: “${r.jk}”`); if (who === 'grand' && r.jg) rep.jargon.push(`${r.title}: “${r.jg}”`);
      if (!VERB.test(r.cap)) rep.noVerb.push(`${r.title}: ${r.cap.trim().slice(0, 60)}`);
      const q = await p.$('.learn .qi'); if (q) { const mc = await q.$('.choice'); const ni = await q.$('.numin');
        if (ni) { await ni.fill('987654'); await (await q.$('button[data-act=check]')).tap() } else if (mc) { const cs = await q.$$('.choice'); await cs[cs.length - 1].tap(); const ck = await q.$('button[data-act=check]'); if (ck) await ck.tap() }
        const fb = await q.$eval('.fb', e => e.textContent.trim()).catch(() => ''); if (fb.length < 12) rep.feedback.push(`${r.title}: “${fb}”`) }
    }
    out.personas[who] = rep; await ctx.close();
  }
  await b.close(); const f = process.argv[2] || '/tmp/persona.json'; fs.writeFileSync(f, JSON.stringify(out, null, 1));
  for (const [w, r] of Object.entries(out.personas)) console.log(w, r.device, 'lessons', r.lessons, 'small targets', JSON.stringify(r.small), '\n jargon', r.jargon.length, r.jargon.slice(0, 8), '\n no action verb', r.noVerb, '\n weak feedback', r.feedback.slice(0, 5));
})();
