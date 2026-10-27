/* Why Next? Guide, part 4: find the site's own lessons that fit a question, so the Live AI Guide can answer from them
   and point the learner to the right lesson. Runs on the device over lessons already loaded (LEARN.L); only up to two
   lesson titles and key ideas are added to the Live AI request. Technique from Cerebras' knowledge-base write-up: two
   rankers that cover each other's blind spots (a title match, and a rare-word BM25 over the lesson text), fused with
   reciprocal rank fusion (score = sum of 1 / (60 + rank)), so agreement between rankers beats one loud vote. */
const GUIDE_KB=(()=>{
const STOP=new Set(('a an the is are was were be been to of and or in on at for with what whats why how do does did done i im you your it its '+
 'this that these those my me can could would should about from as by not no yes so if then than there their they we our which who whom '+
 'am as be by go he if in is it me my no of oh ok on or so to up us we hi ya yo '+
 'when where will just like get got make makes made mean means thing things really very much many some any one two help please tell '+
 'explain show know want need use used using work works way lot also more most other into out up down over only same each every').split(' '));
/* Lower-case words of 2+ letters (so "pH" counts), minus stop words, with a light plural/ending trim so "plants" matches "plant". */
function tokens(s){return String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').split(' ')
 .filter(w=>w.length>1&&!STOP.has(w)).map(w=>w.length>5?w.replace(/(ings|ing|ers|ies|es|ed|s)$/,''):w.length>3?w.replace(/s$/,''):w)}
/* Build the index once per lesson set: per-lesson title and body tokens, document frequencies, average body length. */
let cache=null;
function index(L){if(cache&&cache.L===L)return cache;const docs=[],df=new Map();
 for(const [id,l] of Object.entries(L||{})){if(!l||typeof l!=='object')continue;const ex=l.explain&&typeof l.explain==='object'?[].concat(l.explain.adult||[],l.explain.kid||[]):[];
  const tt=tokens(l.title),bt=tokens([l.title,l.title,l.keyIdea,...ex].join(' '));docs.push({id,title:String(l.title||''),keyIdea:String(l.keyIdea||''),tt:new Set(tt),bt});
  for(const w of new Set(bt))df.set(w,(df.get(w)||0)+1)}
 const avg=docs.reduce((a,d)=>a+d.bt.length,0)/Math.max(1,docs.length);return cache={L,docs,df,avg,N:docs.length}}
const idf=(I,w)=>Math.log(1+(I.N-(I.df.get(w)||0)+.5)/((I.df.get(w)||0)+.5));
/* Ranker 1: how much of the question's rare vocabulary is in the lesson title. */
function byTitle(I,q){return I.docs.map(d=>({d,s:q.reduce((a,w)=>a+(d.tt.has(w)?idf(I,w):0),0)})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s)}
/* Ranker 2: BM25 (k1 1.2, b 0.75) over title, key idea and explanation. */
function byBody(I,q){return I.docs.map(d=>{let s=0;for(const w of q){const f=d.bt.filter(x=>x===w).length;if(f)s+=idf(I,w)*f*2.2/(f+1.2*(.25+.75*d.bt.length/I.avg))}return{d,s}}).filter(x=>x.s>0).sort((a,b)=>b.s-a.s)}
/* Top lessons for a question. A lesson must match at least one fairly rare word (idf >= 1.5), so "help me" finds nothing. */
function search(q,L,o={}){const I=index(L),k=o.k||2,qt=[...new Set(tokens(q))].filter(w=>idf(I,w)>=1.5);if(!qt.length)return[];
 const fused=new Map();for(const list of [byTitle(I,qt),byBody(I,qt)])list.slice(0,20).forEach((x,r)=>{if(x.d.id===o.skip)return;const e=fused.get(x.d.id)||{d:x.d,s:0};e.s+=1/(60+r+1);fused.set(x.d.id,e)});
 return [...fused.values()].sort((a,b)=>b.s-a.s).slice(0,k).map(e=>({id:e.d.id,title:e.d.title,keyIdea:e.d.keyIdea.slice(0,300)}))}
/* What to send with a question: nothing when the open lesson already fits (it is in the top 3), else the top 2 others.
   The first eval run showed the Guide plugging another lesson in most answers when it was always sent. */
function related(q,L,openId,k=2){const top=search(q,L,{k:3});if(openId&&top.some(t=>t.id===openId))return[];return top.filter(t=>t.id!==openId).slice(0,k)}
return{search,related,tokens}})();
if(typeof module!=='undefined'&&module.exports)module.exports=GUIDE_KB;
