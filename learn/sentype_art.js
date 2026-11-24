/* Data and canvas helpers for flagsentype (types of sentences: simple, compound, complex, compound-complex; ages
   11-14). Sources: DfE (2013) English programmes of study KS3 and the KS2 grammar glossary (main clause, subordinate
   clause, coordinating and subordinating conjunctions, relative clause); Common Core ELA L.7.1b 'choose among simple,
   compound, complex, and compound-complex sentences to signal differing relationships among ideas'; Crystal (2004)
   Rediscover Grammar; Purdue OWL 'Sentence types' and 'Comma splices'. Slips it targets: a long sentence must be
   complex; any 'and' makes a sentence compound (and joining two verbs or two subjects does not); a comma starts a new
   clause; 'then' or 'however' can join two main clauses with just a comma (a comma splice); 'because' and 'when'
   make a compound sentence; a relative clause (who, which) is not a clause; compound-complex just means 'very long'.
   Chunks: c = 'I' main (independent) clause, 'D' subordinate (dependent) clause, 'P' phrase (no verb of its own),
   'J' coordinating conjunction. */
const SNT=(()=>{
const TYPES=['Simple','Compound','Complex','Compound-complex'];
const typeOf=ch=>{const i=ch.filter(x=>x.c==='I').length,d=ch.filter(x=>x.c==='D').length;return i>=2&&d>=1?3:i>=2?1:d>=1?2:0};
const S=(...a)=>a.map(([t,c])=>({t,c}));
/* step 1: tap the main clauses */
const FIND=[S(['After the long, stormy night,','P'],['the tired villagers slowly walked home.','I']),
 S(['The rain stopped,','I'],['and','J'],['the children ran outside.','I']),
 S(['Because the bridge was closed,','D'],['we took the ferry,','I'],['but','J'],['it was late.','I'])];
const WHY={P:t=>`"${t}" has no verb of its own, so it is a phrase, not a clause. A comma does not start a new clause.`,
 D:t=>`"${t}" cannot stand alone: it starts with a subordinating conjunction, so it is a subordinate clause.`,
 J:t=>`"${t}" is a coordinating conjunction. It joins clauses but is not a clause itself.`};
/* step 2: sort by type. a = answer (index in TYPES); s = clause chunks for the reveal */
const SORT=[{t:'The enormous grey elephant with the torn ear trumpeted loudly across the dusty plain.',a:0,why:'one subject, one verb (trumpeted): long, but only one clause'},
 {t:'Tom and Priya laughed and cheered.',a:0,why:'one clause: "and" joins two subjects and two verbs, not two clauses'},
 {t:'I wanted to swim, but the pool was closed.',a:1,why:'two main clauses joined by "but"'},
 {t:'When the bell rang, everyone rushed to the door.',a:2,why:'one main clause and the subordinate clause "When the bell rang"',trap:[1,'"When" is a subordinating conjunction: "When the bell rang" cannot stand alone, so the sentence is complex, not compound.']},
 {t:'Maya, who hates spiders, screamed.',a:2,why:'one main clause and the relative clause "who hates spiders", which is a subordinate clause',trap:[0,'"Who hates spiders" has its own verb (hates). It is a relative clause, a kind of subordinate clause, so the sentence is complex, not simple.']},
 {t:'The bus was late, so we walked, although it was raining.',a:3,why:'two main clauses joined by "so", plus the subordinate clause "although it was raining"',trap:[1,'Compound is half right: "so" joins two main clauses. But "although it was raining" is a subordinate clause too, so it is compound-complex.']}];
/* step 3: join two simple sentences. ty = TYPES index or -1 for an error; ok = grammatical and makes sense */
const A1='The storm hit the coast',B1='the town lost power';
const JOIN=[{w:'and',s:`${A1}, and ${B1}.`,ty:1,ok:1,m:'Compound: "and" is a coordinating conjunction joining two main clauses, with a comma before it.'},
 {w:'so',s:`${A1}, so ${B1}.`,ty:1,ok:1,m:'Compound: "so" joins two main clauses and shows cause, then effect.'},
 {w:'but',s:`${A1}, but ${B1}.`,ty:1,ok:0,m:'Compound and correct grammar, but "but" signals a contrast, and losing power is what you would expect after a storm. Pick a joiner that fits the meaning.'},
 {w:'because',s:`${A1} because ${B1}.`,ty:2,ok:0,m:'Complex, but back to front: it says the power cut caused the storm. "Because" goes before the cause: The town lost power because the storm hit the coast.'},
 {w:'when',s:`When ${A1.toLowerCase()}, ${B1}.`,ty:2,ok:1,m:'Complex: "When the storm hit the coast" is a subordinate clause. It comes first, so a comma follows it.'},
 {w:'after',s:`The town lost power after ${A1.toLowerCase()}.`,ty:2,ok:1,m:'Complex: "after the storm hit the coast" is a subordinate clause at the end, so no comma is needed.'},
 {w:'then',s:`${A1}, then ${B1}.`,ty:-1,ok:0,m:'Comma splice. "Then" is an adverb, not a coordinating conjunction, so a comma and "then" cannot join two main clauses. Use "and then", a full stop or a semicolon.'},
 {w:'however',s:`${A1}, however ${B1}.`,ty:-1,ok:0,m:'Comma splice, and the wrong meaning. "However" is an adverb: use a semicolon before it ("; however,") and only for a contrast.'}];
/* step 4: move the subordinate clause */
const MOVE=[{main:'we stayed inside',sub:'because it was raining'},{main:'the crowd cheered',sub:'when the band walked on'}];
/* step 5: vary a paragraph. Each slot has options: text, type tags of its sentences, word counts */
const VARY=[[{t:'The wind howled. The waves rose.',ty:[0,0]},{t:'The wind howled, and the waves rose.',ty:[1]},{t:'As the wind howled, the waves rose higher.',ty:[2]}],
 [{t:'Ella ran to the boat. She untied the rope.',ty:[0,0]},{t:'Ella ran to the boat and untied the rope.',ty:[0]},{t:'Although her hands shook, Ella ran to the boat, and she untied the rope.',ty:[3]}],
 [{t:'The boat drifted slowly out to sea until it was gone.',ty:[2]},{t:'The boat drifted. It was gone.',ty:[0,0]}]];
const DESC=['A sentence split into chunks. Tap each chunk that is a main clause: it could stand alone as a sentence.',
 'One sentence at a time, and four boxes: Simple, Compound, Complex and Compound-complex. Drag the sentence to a box, or use the buttons.',
 'Two simple sentences and joining words. Tap a joining word to join them, and see the sentence type.',
 'A complex sentence with its subordinate clause in a box. Drag the box to the front or the end, and tap the gap to add or remove a comma.',
 'A paragraph in three parts, with a bar for each sentence showing its length. Tap a part to try a different version.'];
const TXT=['A main clause has a subject and a verb and can stand alone. Find them.','Count the clauses, then name the type.','Join two ideas. The joining word decides the type.','Move the subordinate clause. Does the type change?','Mix sentence types to control rhythm.'];
const DONE=['Main clauses can stand alone. Phrases have no verb of their own, and subordinate clauses depend on a main clause.',
 'Type depends on clauses, not length: 1 main = simple; 2+ main = compound; 1 main + subordinate = complex; 2+ main + subordinate = compound-complex.',
 'Coordinating conjunctions (and, but, or, so, yet) make compound sentences; subordinating conjunctions (because, when, after, although) make complex ones. The meaning has to fit.',
 'Still complex. A subordinate clause can move; when it comes first, a comma follows it.',
 'Varied types give the paragraph rhythm, and a short simple sentence at the end lands hard.'];
const QS=[{q:'"The tall, nervous boy in the blue coat waited outside the office." What type is it?',a:'Simple',o:[['Complex','long'],['Compound','long']]},
 {q:'"Sam and Ali swam and dived." What type is it?',a:'Simple',o:[['Compound','and'],['Compound-complex','and']]},
 {q:'"I was tired, then I fell asleep." What is wrong?',a:'It is a comma splice',o:[['Nothing, it is compound','splice'],['It needs "because"','because']]},
 {q:'"We left early because the road was icy." What type is it?',a:'Complex',o:[['Compound','because'],['Simple','because']]},
 {q:'"The dog, which was soaked, shook itself." What type is it?',a:'Complex',o:[['Simple','relative'],['Compound','relative']]},
 {q:'"If it snows, we will build a snowman, and Dad will make cocoa." What type is it?',a:'Compound-complex',o:[['Compound','cc'],['Complex','cc']]},
 {q:'"After lunch, the class went outside." How many clauses?',a:'One',o:[['Two','comma'],['Three','comma']]}];
/* ---------- canvas helpers ---------- */
function PEN(A){const MAIN='#047857',SUB='#b45309',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':'#0f172a';
 const FILL={I:'#dcfce7',D:'#fef3c7',P:'#e2e8f0',J:'#dbeafe',x:'#ffffff',no:'#fee2e2',sel:'#dbeafe'},EDGE={I:MAIN,D:SUB,P:RIM,J:'#1d4ed8',x:RIM,no:'#b91c1c',sel:'#1d4ed8'};
 function split(t,max,font){const c=g();c.font=font;const out=[];let cur='';for(const w of t.split(' ')){const nx=cur?cur+' '+w:w;if(cur&&c.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(16)}${F}`,L=split(t,A.W-34,font),lh=sz(16)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?MAIN:tone==='no'?'#b91c1c':RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(14)}${F}`,L2=split(note,A.W-34,f2).slice(0,4);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':'#b91c1c'):(dk()?'#86efac':MAIN);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(14)*1.3));y+=L2.length*sz(14)*1.3+6}return y}
 /* lay chunks out as chips that wrap; a long chunk wraps inside its own chip. Returns chip rectangles */
 function chips(list,x0,y0,maxW,o){o=o||{};const c=g(),n=sz(o.n||16),font=`700 ${n}${F}`,lh=n*1.3,pad=8,gap=6;c.font=font;let x=x0,y=y0,rowH=0;const out=[];
  list.forEach((k,i)=>{const L=split(k.t,maxW-2*pad,font),w=Math.min(maxW,Math.max(...L.map(s=>c.measureText(s).width))+2*pad),h=L.length*lh+2*pad-4;
   if(x>x0&&x+w>x0+maxW){x=x0;y+=rowH+gap;rowH=0}out.push({i,x,y,w,h,L});x+=w+gap;rowH=Math.max(rowH,h)});
  out.forEach(r=>{const k=list[r.i],st=k.state||'x';c.fillStyle=FILL[st];A.paint.rrect(r.x,r.y,r.w,r.h,9);c.fill();c.lineWidth=st==='x'?1.4:2.6;c.strokeStyle=EDGE[st];c.stroke();
   c.fillStyle='#0f172a';c.font=font;c.textAlign='left';c.textBaseline='top';r.L.forEach((s,j)=>c.fillText(s,r.x+pad,r.y+pad-1+j*lh))});
  out.bottom=out.length?Math.max(...out.map(r=>r.y+r.h)):y0;return out}
 function box(r,label,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);c.fill();c.lineWidth=o.no||o.ok||o.sel?3:1.5;c.strokeStyle=o.no?'#b91c1c':o.ok?MAIN:o.sel?'#1d4ed8':RIM;c.stroke();
  let n=sz(o.n||15),L;for(;;){L=split(label,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=11)break;n--}c.font=`800 ${n}${F}`;c.fillStyle='#0f172a';c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
 return{split,banner,chips,box,sz,fg,dk,MAIN,SUB,RIM,F}}
return{TYPES,typeOf,FIND,WHY,SORT,JOIN,MOVE,VARY,DESC,TXT,DONE,QS,PEN}})();
