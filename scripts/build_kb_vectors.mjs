#!/usr/bin/env node
/* Build-time lesson vectors for the Guide's lesson finder (api/_kb.js). Incremental: only lessons whose text changed
   (sha1 of the embedded text) are re-embedded, so a lesson-builder run costs a few cents at most.
   Also writes scripts/eval/fixtures/p1_query_vectors.json (each lesson's first practice question as a query) so the
   offline eval can check the hybrid finder in CI without calling the API. Needs WN_GEMINI_API_KEY.
   Cost: gemini-embedding-001 is $0.15 per 1M input tokens. Document text matches the keyword index in learn/guide_kb.js
   (title twice, key idea, explain, family tip, worked example, visual caption, mastery prompts and hints; no practice questions). */
import fs from 'node:fs'; import path from 'node:path'; import { createHash } from 'node:crypto';
import { EMBED_MODEL, EMBED_DIM, encode } from '../api/_kb.js';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'), DIR = path.join(ROOT, 'learn/lessons');
const OUT = path.join(ROOT, 'api/_kb_vectors.json'), QOUT = path.join(ROOT, 'scripts/eval/fixtures/p1_query_vectors.json');
const key = process.env.WN_GEMINI_API_KEY; const dry = process.argv.includes('--dry');
const strip = s => String(s || '').replace(/\{=?[^}]*\}/g, '3');
/* Same fields as learn/guide_kb.js (title twice, key idea, explain, plus extra()): family tip, worked example,
   visual caption, mastery prompts and hints. Practice questions stay out so the practice-question eval remains fair.
   The lesson builder's per-run indexing calls this script, so new lessons use the same document text. */
function extra(l) {
  const t = [l.familyTip]; const w = l.worked;
  if (w && typeof w === 'object') t.push(w.title, ...(Array.isArray(w.steps) ? w.steps : []));
  if (l.visual && typeof l.visual === 'object') t.push(l.visual.caption);
  const pool = l.mastery && Array.isArray(l.mastery.pool) ? l.mastery.pool : [];
  for (const m of pool) if (m && typeof m === 'object') t.push(m.prompt, m.hint);
  return t.filter(x => typeof x === 'string') }
export const docText = l => {
  const ex = l.explain && typeof l.explain === 'object' ? [].concat(l.explain.adult || [], l.explain.kid || []) : [];
  return strip([l.title, l.title, l.keyIdea, ...ex, ...extra(l)].filter(Boolean).join('\n')) };
const sha = s => createHash('sha1').update(EMBED_MODEL + EMBED_DIM + s).digest('hex').slice(0, 12);
const lessons = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')));
const read = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch (e) { return null } };
const old = new Map(((read(OUT) || {}).items || []).map(i => [i.id, i])), oldQ = new Map(((read(QOUT) || {}).items || []).map(i => [i.id, i]));
let usageTokens = 0;
async function embed(texts, task) { const out = [];
  for (let i = 0; i < texts.length; i += 100) {
    const batch = texts.slice(i, i + 100); let j, lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:batchEmbedContents`, { method: 'POST',
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify({ requests: batch.map(t => ({ model: 'models/' + EMBED_MODEL, content: { parts: [{ text: t }] }, taskType: task, outputDimensionality: EMBED_DIM })) }) });
      j = await r.json();
      if (j.embeddings && j.embeddings.length === batch.length) break;
      lastErr = 'embedding call failed: ' + JSON.stringify(j).slice(0, 300);
      j = null; if (attempt < 2) await new Promise(s => setTimeout(s, 1500 * (attempt + 1))) }
    if (!j) throw new Error(lastErr);
    const u = j.usageMetadata || {}; usageTokens += u.totalTokenCount || u.promptTokenCount || 0;
    out.push(...j.embeddings.map(e => e.values)) } return out }
const docs = lessons.map(l => ({ l, t: docText(l) })).map(d => ({ ...d, h: sha(d.t) })), todo = docs.filter(d => (old.get(d.l.topicId) || {}).h !== d.h);
const qs = lessons.filter(l => (l.practice || [])[0]).map(l => ({ id: l.topicId, t: strip(l.practice[0].prompt) })).map(q => ({ ...q, h: sha(q.t) })), qtodo = qs.filter(q => (oldQ.get(q.id) || {}).h !== q.h);
const chars = todo.reduce((a, d) => a + d.t.length, 0) + qtodo.reduce((a, q) => a + q.t.length, 0);
console.log(`${todo.length} lessons and ${qtodo.length} queries to embed, ~${Math.round(chars / 4)} tokens, ~$${(chars / 4 / 1e6 * 0.15).toFixed(4)}`);
if (dry || (!todo.length && !qtodo.length)) process.exit(0); if (!key) { console.log('WN_GEMINI_API_KEY not set'); process.exit(2) }
const dv = await embed(todo.map(d => d.t), 'RETRIEVAL_DOCUMENT'), qv = await embed(qtodo.map(q => q.t), 'RETRIEVAL_QUERY');
todo.forEach((d, i) => old.set(d.l.topicId, { id: d.l.topicId, h: d.h, v: encode(dv[i]) })); qtodo.forEach((q, i) => oldQ.set(q.id, { id: q.id, h: q.h, v: encode(qv[i]) }));
const items = docs.map(d => ({ id: d.l.topicId, title: d.l.title, keyIdea: String(d.l.keyIdea || '').slice(0, 300), h: d.h, v: old.get(d.l.topicId).v }));
fs.writeFileSync(OUT, JSON.stringify({ model: EMBED_MODEL, dim: EMBED_DIM, items }) + '\n');
fs.writeFileSync(QOUT, JSON.stringify({ model: EMBED_MODEL, dim: EMBED_DIM, items: qs.map(q => ({ id: q.id, h: q.h, v: oldQ.get(q.id).v })) }) + '\n');
const billed = usageTokens || Math.round(chars / 4);
console.log('wrote', path.relative(ROOT, OUT), fs.statSync(OUT).size, 'bytes;', path.relative(ROOT, QOUT), fs.statSync(QOUT).size, 'bytes');
console.log(`usage ${usageTokens ? usageTokens + ' API tokens' : 'no usage metadata, ~' + billed + ' tokens from chars/4'}; cost ~$${(billed / 1e6 * 0.15).toFixed(4)} at $0.15/1M`);
