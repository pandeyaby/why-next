// Offline check of the bundled web lessons: loads Resources/Web/index.html with the network off, opens all 12
// flagships and plays a reel with captions. Usage: NODE_PATH=<dir with playwright> node tools/check_offline_web.cjs <index.html>
const path = require('path'); const { chromium, devices } = require('playwright');
(async () => { const b = await chromium.launch(), ctx = await b.newContext({ ...devices['iPhone 13'], offline: true }), p = await ctx.newPage(), errs = [], net = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()) }); p.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) net.push(r.url()) });
  await p.addInitScript(() => { window.WN_TOPIC = 'mt_EDgw64OmfA' });
  await p.goto('file://' + path.resolve(process.argv[2]));
  await p.waitForSelector('.vis.flag .fl-cv', { timeout: 30000 }); await p.waitForSelector('.reel[data-f]');
  await p.tap('.reel-play'); await p.waitForFunction(() => { const v = document.querySelector('.reel video'); return v && v.readyState >= 3 }, null, { timeout: 30000 });
  const v = await p.$eval('.reel video', v => [v.currentSrc.split('/Web/')[1], v.readyState, v.textTracks.length, v.textTracks[0] && v.querySelector('track').src.slice(0,5)]);
  const FL = ['mt_AN2kJE6I0s','mt_P-VlHqNpca','mt_Z_Wu_77ybI','mt_Y5xC--f9Eh','mt_QhFEDyIwSO','mt_FbDKeLfBCo','mt_q0LJXMQe70','mt_RVK655t391','mt_EDgw64OmfA','mt_-c4Ca_nBzX','mt_1VmTUxBrNd','mt_1JFUNQDwAJ']; let ok = 0;
  for (const id of FL) { await p.evaluate(id => select(id), id); try { await p.waitForSelector('.vis.flag .fl-cv', { timeout: 15000 }); ok++ } catch (e) {} }
  const net2 = net.filter(u => !u.startsWith('blob:')); console.log(JSON.stringify({ video: v, flagshipsOpened: ok, networkRequests: net2, errors: errs })); await b.close(); if (ok !== 12 || net2.length || errs.length || v[1] < 3 || v[3] !== 'blob:') process.exit(1) })().catch(e => { console.log('ERR', e.message.split('\n')[0]); process.exit(1) });
