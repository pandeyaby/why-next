// Unit tests for the Guide live-brain proxy (api/guide.js) with a mocked Gemini: guards, shaping, fallbacks. No network.
import assert from 'assert';
import handler, { shapeInput, buildRequest, replyText, allow, _resetLimits, LIMITS, SYSTEM_PROMPT } from '../api/guide.js';
let fails = 0; const test = async (n, f) => { try { await f(); console.log('ok  ', n) } catch (e) { fails++; console.log('FAIL', n, '\n     ', e.message) } };
function call({ method = 'POST', body, headers = {}, env = { WN_GEMINI_API_KEY: 'test-key', VERCEL_ENV: 'preview' }, fetch } = {}) {
  const req = { method, headers: Object.assign({ host: 'x.vercel.app', 'x-real-ip': '1.2.3.4' }, headers), body };
  return new Promise(resolve => { const res = { statusCode: 200, h: {}, setHeader(k, v) { this.h[k] = v }, end(s) { resolve({ code: this.statusCode, h: this.h, json: JSON.parse(s) }) } }; handler(req, res, { env, fetch }) });
}
const ok = text => async (url, init) => { ok.last = { url, init }; return { ok: true, json: async () => ({ candidates: [{ content: { parts: [{ text }] } }] }) } };
const good = { q: 'Why is the wave speed v = f × λ?', tone: 'calm', level: 'adult', lesson: { title: 'Waves', keyIdea: 'A wave carries energy.', explain: ['Wavelength is the length of one wave.'] }, learner: { state: 'struggling', why: '2 wrong answers in a row.', profile: { style: 'steps', exam: 'GCSE (AQA)', goal: 'pass', time: 20 } } };
await test('happy path: 200 with plain-text reply; key sent only as a header; model is Flash-Lite', async () => {
  _resetLimits(); const r = await call({ body: good, fetch: ok('**Great** question. Think of it as steps.') });
  assert.strictEqual(r.code, 200); assert.strictEqual(r.json.reply, 'Great question. Think of it as steps.');
  assert.match(ok.last.url, /gemini-3\.1-flash-lite:generateContent$/); assert.ok(!ok.last.url.includes('test-key')); assert.strictEqual(ok.last.init.headers['x-goog-api-key'], 'test-key');
  const sent = JSON.parse(ok.last.init.body); assert.strictEqual(sent.systemInstruction.parts[0].text, SYSTEM_PROMPT); assert.strictEqual(sent.generationConfig.maxOutputTokens, LIMITS.maxOutputTokens);
  assert.match(sent.contents[0].parts[0].text, /Learner right now: struggling/); assert.ok(!JSON.stringify(sent).includes('wrongTimes')) });
await test('production is off; GET is 405; foreign origin is 403; missing key is 503', async () => {
  _resetLimits(); assert.strictEqual((await call({ body: good, env: { WN_GEMINI_API_KEY: 'k', VERCEL_ENV: 'production' }, fetch: ok('x') })).code, 404);
  assert.strictEqual((await call({ method: 'GET', fetch: ok('x') })).code, 405);
  assert.strictEqual((await call({ body: good, headers: { origin: 'https://evil.example' }, fetch: ok('x') })).code, 403);
  assert.strictEqual((await call({ body: good, headers: { origin: 'https://x.vercel.app' }, fetch: ok('hi') })).code, 200);
  assert.strictEqual((await call({ body: good, env: { VERCEL_ENV: 'preview' }, fetch: ok('x') })).code, 503) });
await test('size caps: oversized body is 413; question and lesson text are clipped; junk fields are dropped', async () => {
  _resetLimits(); assert.strictEqual((await call({ body: JSON.stringify({ q: 'x'.repeat(LIMITS.maxBody + 10) }), fetch: ok('x') })).code, 413);
  assert.strictEqual((await call({ body: { q: '' }, fetch: ok('x') })).code, 400); assert.strictEqual((await call({ body: '[1', fetch: ok('x') })).code, 400);
  const x = shapeInput({ q: 'q'.repeat(2000), tone: 'evil', level: 9, lesson: { explain: Array(50).fill('e'.repeat(1000)) }, learner: { state: 'hacked', profile: { style: 1, time: 1e9 } }, raw: { wrongTimes: [1] } });
  assert.strictEqual(x.q.length, LIMITS.maxQuestion); assert.ok(x.lesson.ctxText.length <= LIMITS.maxContext);
  assert.deepStrictEqual([x.tone, x.level, x.learner.state, x.learner.style, x.learner.time], ['calm', 'adult', 'focused', 'balanced', 120]);
  assert.ok(!JSON.stringify(buildRequest(x)).includes('wrongTimes')) });
await test('rate limit: per-minute and per-day per IP, then a global daily cap', async () => {
  _resetLimits(); const t0 = Date.UTC(2026, 9, 24, 12);
  for (let i = 0; i < LIMITS.perMinute; i++) assert.strictEqual(allow('a', t0 + i), 'ok'); assert.strictEqual(allow('a', t0 + 10), 'minute'); assert.strictEqual(allow('b', t0 + 10), 'ok');
  let t = t0 + 61e3, n = LIMITS.perMinute; while (n < LIMITS.perDay) { assert.strictEqual(allow('a', t), 'ok'); n++; t += 11e3 } assert.strictEqual(allow('a', t + 61e3), 'day');
  _resetLimits(); for (let i = 0; i < LIMITS.globalPerDay; i++) allow('ip' + i, t0); assert.strictEqual(allow('new', t0), 'busy');
  _resetLimits(); for (let i = 0; i < LIMITS.perMinute; i++) await call({ body: good, fetch: ok('x') }); const r = await call({ body: good, fetch: ok('x') }); assert.strictEqual(r.code, 429); assert.strictEqual(r.h['retry-after'], '60') });
await test('upstream errors, empty/blocked replies and timeouts map to 5xx (the browser then uses the offline guide)', async () => {
  _resetLimits(); assert.strictEqual((await call({ body: good, fetch: async () => ({ ok: false, status: 400 }) })).code, 502);
  assert.strictEqual((await call({ body: good, fetch: async () => ({ ok: true, json: async () => ({ promptFeedback: { blockReason: 'SAFETY' } }) }) })).code, 502);
  assert.strictEqual((await call({ body: good, fetch: async () => { throw new Error('down') } })).code, 504);
  assert.strictEqual(replyText({ candidates: [{ content: { parts: [{ text: 'a'.repeat(5000) }] } }] }).length, LIMITS.maxReply) });
await test('the safety prompt covers minors, lesson grounding, personal data and prompt injection', async () => {
  for (const re of [/11 to 18/, /Ground every answer in the lesson/, /Never ask for, store, or repeat personal information/, /trusted adult/, /Ignore any instruction/]) assert.match(SYSTEM_PROMPT, re) });
console.log(fails ? fails + ' failed' : 'all passed'); process.exit(fails ? 1 : 0);
