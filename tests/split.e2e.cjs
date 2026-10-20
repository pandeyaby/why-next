/* End-to-end test for the split viewer build: out/viewer.html loads the map and lessons first and detail chunks
   (out/wn/d*.js) on demand; out/viewer-offline.html is one self-contained file. Run: node tests/split.e2e.cjs */
const path = require('path'), assert = require('assert');
const { chromium } = require('playwright');
const U = f => 'file://' + path.resolve(__dirname, '../out/' + f) + '?seed=5';
let failures = 0;
async function test(name, fn) { try { await fn(); console.log('ok  ', name) } catch (e) { failures++; console.log('FAIL', name, '\n     ', e.message.split('\n').slice(0, 6).join('\n      ')) } }
(async () => {
  const b = await chromium.launch(), p = await b.newPage(), reqs = [], errors = [];
  p.on('request', r => reqs.push(r.url())); p.on('pageerror', e => errors.push(e.message));
  await p.goto(U('viewer.html'));
  await test('split build: first topic renders with its details, loading only the chunks it needs', async () => {
    assert.ok(await p.$('#vbox figure.vis'), 'no lesson visual'); assert.doesNotMatch(await p.textContent('#dcard'), /Loading details/);
    const chunks = reqs.filter(u => /\/wn\/d\d+\.js/.test(u)).length, total = await p.evaluate(() => WN_CORE.v.length);
    assert.ok(chunks > 0 && chunks < total, `loaded ${chunks} of ${total} chunks`);
  });
  await test('split build: opening a topic in another domain fills in its description and chain', async () => {
    const id = await p.evaluate(() => DATA.nodes.find(n => n.desc == null && n.new).id); await p.evaluate(id => select(id), id);
    await p.waitForFunction(() => !/Loading details/.test(document.getElementById('dcard').textContent) && !/Loading details/.test(document.getElementById('dtree').textContent));
    assert.ok((await p.textContent('#dcard p')).length > 20);
  });
  await test('split build: search covers descriptions once every chunk has loaded', async () => {
    await p.fill('#q', 'x'); await p.waitForFunction(() => WN.all);
    const [id, word] = await p.evaluate(() => { for (const n of DATA.nodes) { if (!n.new) continue; const w = (n.desc.match(/[a-z]{9,}/g) || []).find(w => !n.n.toLowerCase().includes(w)); if (w) return [n.id, w] } });
    await p.fill('#q', word); assert.ok(await p.$(`#list .item[data-id="${id}"]`), `searching "${word}" should find it by description`); await p.fill('#q', '');
  });
  await test('no page errors', async () => assert.deepStrictEqual(errors, []));
  const o = await b.newPage(), oreq = [];
  o.on('request', r => oreq.push(r.url()));
  await o.goto(U('viewer-offline.html'));
  await test('offline build: one file, no extra requests, lessons and details work', async () => {
    assert.deepStrictEqual(oreq.filter(u => !u.includes('viewer-offline.html')), []);
    assert.ok(await o.$('#vbox figure.vis')); assert.ok(await o.evaluate(() => WN.has(WN_CORE.v.map((_, k) => k))));
  });
  await b.close(); console.log(failures ? `${failures} failed` : 'all split-build e2e tests passed'); process.exit(failures ? 1 : 0);
})();
