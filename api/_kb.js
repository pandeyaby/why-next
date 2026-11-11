/* Why Next? Guide lesson finder, server half: meaning-based (embedding) ranking fused with the browser's keyword ranking.
   The browser (learn/guide_kb.js, BM25) sends its top lesson ids; here the question gets one small Gemini embedding
   (gemini-embedding-001, 256 dims) and is compared with lesson vectors precomputed at build time
   (scripts/build_kb_vectors.mjs -> api/_kb_vectors.json, int8). Reciprocal rank fusion, embeddings weighted 1.3:1, k=1: with
   so small a k the top-2 is each ranker's best pick (embeddings first) unless both agree on a lesson, which then wins.
   The old k=10, 2:1 let the embedding ranker's 2nd-4th picks push out the keyword ranker's correct first pick.
   Any failure (no vectors, no key, slow or bad embedding call) returns null and the caller keeps the keyword result. */
import { readFileSync } from 'node:fs';
export const EMBED_MODEL = 'gemini-embedding-001', EMBED_DIM = 256, FUSE = { we: 1.3, wk: 1, k: 1, depth: 20 };
let store;
export function loadVectors(file = new URL('./_kb_vectors.json', import.meta.url)) {
  if (store !== undefined) return store;
  try { const j = JSON.parse(readFileSync(file, 'utf8')); store = { ...j, items: j.items.map(it => ({ ...it, vec: decode(it.v) })) } } catch (e) { store = null }
  return store }
export function _setVectors(s) { store = s ? { ...s, items: s.items.map(it => ({ ...it, vec: it.vec || decode(it.v) })) } : s }
export function decode(b64) { const b = Buffer.from(b64, 'base64'); const v = new Float32Array(b.length); let n = 0;
  for (let i = 0; i < b.length; i++) { v[i] = (b[i] > 127 ? b[i] - 256 : b[i]); n += v[i] * v[i] } n = Math.sqrt(n) || 1; for (let i = 0; i < v.length; i++) v[i] /= n; return v }
export function encode(vals) { const m = Math.max(...vals.map(Math.abs)) || 1; return Buffer.from(Int8Array.from(vals.map(x => Math.round(x / m * 127))).buffer).toString('base64') }
export function rankByVector(q, s = store) { let n = Math.hypot(...q) || 1; const qn = q.map(x => x / n);
  return s.items.map(it => { let d = 0; for (let i = 0; i < qn.length; i++) d += qn[i] * it.vec[i]; return [it.id, d] }).sort((a, b) => b[1] - a[1]).map(x => x[0]) }
/* Fuse two ranked id lists. Returns ids best first. */
export function fuse(embIds, kwIds, f = FUSE) { const S = new Map();
  embIds.slice(0, f.depth).forEach((id, r) => S.set(id, (S.get(id) || 0) + f.we / (f.k + r + 1)));
  (kwIds || []).slice(0, f.depth).forEach((id, r) => S.set(id, (S.get(id) || 0) + f.wk / (f.k + r + 1)));
  return [...S].sort((a, b) => b[1] - a[1]).map(x => x[0]) }
/* Same token rules as learn/guide_kb.js. If a lesson just outside the top 2 (ranks 3-4) shares two or more
   title words with the question, and the current top 2 share fewer, swap it into second place. */
const STOP = new Set(('a an the is are was were be been to of and or in on at for with what whats why how do does did done i im you your it its '+
 'this that these those my me can could would should about from as by not no yes so if then than there their they we our which who whom '+
 'am as be by go he if in is it me my no of oh ok on or so to up us we hi ya yo '+
 'when where will just like get got make makes made mean means thing things really very much many some any one two help please tell '+
 'explain show know want need use used using work works way lot also more most other into out up down over only same each every').split(' '));
const SYM = [[/²/g,' squared '],[/³/g,' cubed '],[/√/g,' root surd '],[/÷/g,' divide '],[/×/g,' multiply '],[/%/g,' percent '],[/°/g,' degrees '],[/π/g,' pi circle '],[/λ/g,' wavelength '],[/[θ]/g,' angle '],[/\d\s*\/\s*\d/g,' fraction '],[/\b[a-z]\s*\^\s*\d/gi,' power ']];
export function tokens(s){s=String(s||'').replace(/\{=?[^}]*\}/g,' ');for(const [r,t] of SYM)s=s.replace(r,t);return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').split(' ')
 .filter(w=>w.length>1&&!STOP.has(w)).map(w=>w.length>5?w.replace(/(ings|ing|ers|ies|es|ed|s)$/,''):w.length>3?w.replace(/s$/,''):w)}
export function titlePromote(ids, query, titleOf, depth = 4, minTok = 2) {
  if (!ids || ids.length < 3) return ids || [];
  const qtok = tokens(query), tok = id => tokens(titleOf(id) || '').filter(w => qtok.includes(w)).length;
  const topT = Math.max(tok(ids[0]), tok(ids[1] || ''));
  const cand = ids.slice(2, depth).filter(id => tok(id) >= minTok && tok(id) > topT);
  if (!cand.length) return ids;
  cand.sort((a, b) => tok(b) - tok(a));
  const w = cand[0];
  return [ids[0], w, ...ids.filter(x => x !== w && x !== ids[0])] }
/* Same gate as the browser: nothing when the open lesson is already in the top 3, else the top 2 others. */
export function gate(ids, openId, k = 2) { const top = ids.slice(0, 3); if (openId && top.includes(openId)) return []; return ids.filter(id => id !== openId).slice(0, k) }
export async function embedQuery(q, key, fetchFn = fetch, ms = 2500) { const ac = new AbortController(), t = setTimeout(() => ac.abort(), ms);
  try { const r = await fetchFn(`https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent`, { method: 'POST', signal: ac.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify({ content: { parts: [{ text: q }] }, taskType: 'RETRIEVAL_QUERY', outputDimensionality: EMBED_DIM }) });
    if (!r.ok) return null; const j = await r.json(); const v = j && j.embedding && j.embedding.values; return Array.isArray(v) && v.length === EMBED_DIM ? v : null }
  catch (e) { return null } finally { clearTimeout(t) } }
/* Related lessons for a question: [{title, keyIdea}] or null (use the browser's keyword result). */
export async function hybridRelated(q, kb, key, fetchFn = fetch) { const s = loadVectors(); if (!s || !key || !kb) return null;
  const qv = await embedQuery(q, key, fetchFn); if (!qv) return null;
  const by = new Map(s.items.map(it => [it.id, it]));
  const ids = gate(titlePromote(fuse(rankByVector(qv, s), kb.kw), q, id => (by.get(id) || {}).title), kb.open);
  return ids.map(id => by.get(id)).filter(Boolean).map(it => ({ title: it.title, keyIdea: it.keyIdea })) }
