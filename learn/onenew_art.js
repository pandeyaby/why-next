/* Data, words and drawings for flagonenew (one new thing at a time, ages 9–11). Basis: cognitive load theory (Sweller
   1988; Sweller, van Merriënboer and Paas 2019): working memory holds only a few new elements at once, while things
   already learned well cost little; Pollock, Chandler and Sweller 2002: learn the parts on their own first, then
   combine them; Rosenshine 2012: new material in small steps with practice after each; LaBerge and Samuels 1974:
   fluent (automatic) skills free up attention for the next new thing. Slips it targets: more new things at once means
   faster learning; right once means ready (correct but slow is not yet fluent); making the goal itself easy instead of
   the parts around it; jumping two steps at once; and never adding the next new thing. */
const ONW=(()=>{
const rect=(x,y,w,h)=>({x,y,w,h}),hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ink(A,K){const sz=n=>Math.round(A.narrow?n:n*1.12);
 function txt(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
  const lines=[];let row='';String(s).split(' ').forEach(w=>{const t=row?row+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&row){lines.push(row);row=w}else row=t});lines.push(row);
  const lh=sz(n)*1.18;lines.forEach((t,i)=>g.fillText(t,x,y+(i-(lines.length-1)/2)*lh))}
 function tile(r,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(9,r.h/3));g.fill();
  g.lineWidth=state?3:1.4;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel,new:K.nw}[state]||K.rim;g.stroke()}
 function grid(n,cols,a,gap){gap=gap||7;const rows=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(rows-1))/rows;
  return Array.from({length:n},(_,i)=>rect(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 return{txt,tile,grid}}
/* 1. Kai already knows 2-digit take-away with no exchanging. Which parts of this page are new to him? n 1 = new */
const PAGE=[{t:'Exchanging a ten for ten ones',n:1,s:'exch'},{t:'The minus sign',n:0},{t:'4-digit numbers',n:1,s:'big'},{t:'Numbers up to 99',n:0},
 {t:'Sums hidden in long word stories',n:1,s:'story'},{t:'Writing the answer under the line',n:0}];
/* 2. strip the page back: each dial is new (1) or known (0); the method is the goal, so it stays new */
const DIAL=[{k:'Method',nw:'Exchanging',old:'—',goal:1},{k:'Numbers',nw:'4-digit',old:'2-digit'},{k:'Questions',nw:'Word stories',old:'Plain sums'},{k:'Clock',nw:'Race a timer',old:'No timer'}];
const TRY=[0,5,3,2,1];   /* a picture of the idea, not data: right answers out of 5 with that many new things */
/* 3. practice logs: score, out of, and whether it felt easy (quick) */
const LOGS=[{who:'Kai',goal:'Exchanging',add:'Add 4-digit numbers',of:5,days:[[2,0],[4,0],[5,0],[5,1],[5,1]]},
 {who:'Zara',goal:'The 7 times table',add:'Add a timer',of:10,days:[[6,0],[9,0],[10,0],[10,0],[10,1]]}];
/* 4. Mo learns a new piano tune: the stairs each add one new thing; ranks for stairs 1–4 */
const STAIR=[0,0,1,2];
const CARDS=[{t:'Right hand alone, slowly',r:0},{t:'Both hands, up to full speed',r:2,s:'speed'},{t:'Left hand alone, slowly',r:0},
 {t:'Both hands together, slowly',r:1,s:'both'},{t:'Full speed, both hands, and a new ending',r:9,s:'jump'}];
/* 5. sort: one new thing (0) or too much new at once (1) */
const SORT=[{t:'A new spelling rule, using words you can already read',k:0,s:'s1'},{t:'A new maths method with huge numbers and a timer',k:1,s:'s2'},
 {t:'A new swimming stroke in the shallow end',k:0,s:'s3'},{t:'A new board game explained in a language you are just learning',k:1,s:'s4'},
 {t:'The new 8 times table, with no timer at first',k:0,s:'s5'},{t:'A new song and a new dance to it, both on day one',k:1,s:'s6'},
 {t:'A new kind of book about a topic you know well',k:0,s:'s7'},{t:'Your first time cooking alone, with a new recipe',k:1,s:'s8'}];
const HELLO=['Kai can already take away 2-digit numbers. Tap each part of his new page that is new to him. Watch his thinking space.',
 'Turn dials to “known” until only one thing is new, then tap Try 5. Keep the thing Kai is learning.',
 'Drag the flag to the first day Kai was ready to add the next new thing, or use the day buttons.',
 'Mo is learning a new piano tune. Drag cards onto the stairs, bottom first. Each stair adds one new thing.',
 'One new thing, or too much new at once? Drag each card to a box, or tap a card then a box.','Challenge.'];
const GOT=['3 new things at once fill Kai’s thinking space. There is no room left to think about exchanging.',
 'With only exchanging new, Kai gets them right. The easy parts leave room to think about the new part.',
 'Ready means right and easy. Right but slow means he still has to think hard about every step. Wait until it is easy.',
 'Each stair adds one new thing: one hand, then the other, then both slowly, then speed.',
 'Keep one part new and the rest easy. When it feels easy, add the next new thing.'];
const ASK=[{q:'A page has a new method, new big numbers and a timer. Is that a quick way to learn the method?',a:'No, too many new things at once',o:[['Yes, more new things means more learning','more'],['Yes, if you try hard enough','effort']]},
 {q:'Lee is learning long division. Which part should stay new?',a:'The long division method',o:[['The numbers, made huge','goal'],['A new timer','goal']]},
 {q:'Ana got 10 out of 10 on her new 6 times table, but slowly. What next?',a:'Practise until it is easy, then add a timer',o:[['Add a timer now','slow'],['Stop practising it forever','stuck']]},
 {q:'Ben has learned a new swimming stroke and it now feels easy. What next?',a:'Add one new thing, like swimming further',o:[['Keep doing the easy width for ever','stuck'],['Add 3 new things at once','more']]},
 {q:'A new card game feels too much. What could help?',a:'Learn one rule first, with cards you know',o:[['Learn all 12 rules at once','more'],['Never play it','avoid']]},
 {q:'Practising with easy numbers is for babies. True?',a:'No, easy parts leave room for the new part',o:[['Yes, always use the hardest numbers','babyish'],['Yes, so skip the new part','goal']]},
 {q:'Mo can play the right hand alone, slowly. What is the next stair?',a:'Left hand alone, slowly',o:[['Both hands at full speed','jump'],['A new tune','jump']]}];
/* ---------- drawings ---------- */
function head(g,x,y,r,used,cap){g.save();g.fillStyle='#fde7d0';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#7c2d12';g.lineWidth=2;g.stroke();
 const slot=r*.5;for(let i=0;i<cap;i++){const a=-Math.PI*.85+i*(Math.PI*.7/(cap-1||1)),sx=x+Math.cos(a)*r*.52,sy=y+Math.sin(a)*r*.52+r*.18;
  g.fillStyle=i<used?(used>cap-1?'#dc2626':'#2563eb'):'#ffffff';g.beginPath();g.arc(sx,sy,slot*.38,0,7);g.fill();g.strokeStyle='#475569';g.lineWidth=1.2;g.stroke()}
 g.restore()}
function flag(g,x,y,s,c){g.save();g.fillStyle='#334155';g.fillRect(x-1.5,y-s,3,s);g.fillStyle=c||'#16a34a';g.beginPath();g.moveTo(x+1.5,y-s);g.lineTo(x+s*.75,y-s*.78);g.lineTo(x+1.5,y-s*.56);g.fill();g.restore()}
function keys(g,r){g.save();g.fillStyle='#ffffff';g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle='#334155';g.lineWidth=1;const n=14,w=r.w/n;
 for(let i=0;i<n;i++)g.strokeRect(r.x+i*w,r.y,w,r.h);g.fillStyle='#111827';for(let i=0;i<n-1;i++)if([0,1,3,4,5].includes(i%7))g.fillRect(r.x+(i+1)*w-w*.3,r.y,w*.6,r.h*.6);g.restore()}
return{rect,hit,ink,PAGE,DIAL,TRY,LOGS,STAIR,CARDS,SORT,HELLO,GOT,ASK,head,flag,keys}})();
