/* Flagship – split digraphs and magic e (ages 5–7; NC Y1 phonics a–e, e–e, i–e, o–e, u–e; CCSS RF.1.3c final -e).
   Drag the e to the end of cap, kit, hop and cub and hear the vowel say its name; tap the two letters that make one
   sound across the gap; count sounds, not letters; find the word in a sentence that is missing its e; sort short
   vowels from long ones. Big letter tiles, very few words. Not flagvowel (vowel teams) or flagdgraph (consonants). */
(()=>{
const VOW='aeiou',NAMEOF={a:'ay',e:'ee',i:'eye',o:'oh',u:'you'},SHORT={a:'a as in apple',i:'i as in it',o:'o as in on',u:'u as in up',e:'e as in egg'};
const ADD=[['cap','cape'],['kit','kite'],['hop','hope'],['cub','cube']];
const JOIN=[{w:'cake',v:1},{w:'bike',v:1},{w:'rope',v:1},{w:'tune',v:1},{w:'these',v:2}];
const CNT=[{w:'cake',n:3,parts:['c','a–e','k']},{w:'bike',n:3,parts:['b','i–e','k']},{w:'slide',n:4,parts:['s','l','i–e','d']},{w:'home',n:3,parts:['h','o–e','m']}];
const FIX=[{t:['I','fly','my','kit','.'],bad:3,good:'kite',why:'A kit is a set of things. To fly it, you need kite, with i saying its name.'},
{t:['The','dog','has','a','bon','.'],bad:4,good:'bone',why:'Bon needs the e. Then o says its name: bone.'},
{t:['I','hop','it','is','sunny','.'],bad:1,good:'hope',why:'Hop means jump. Add the e and o says its name: hope.'}];
const PILE=[['tap',0],['tape',1],['pin',0],['pine',1],['not',0],['note',1],['cut',0],['cute',1]];
VIS.reg('flagmagice',c=>{let A,pad,quiz,qi=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',EDGE='#64748b',VC='#7c2d12',VFILL='#ffedd5',EFILL='#ede9fe',EC='#5b21b6',FONT='system-ui,sans-serif';
const fnt=(n,w)=>`${w||800} ${n}px ${FONT}`,big=n=>A.narrow?n:Math.round(n*1.25),mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const stage=()=>['add','join','count','fix','sort','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const yes=()=>A.sound.pop(),no=()=>A.sound.miss();
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fdf2f8',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=fnt(n);let w=g.measureText(t).width+26;while(w>A.W-10&&n>10){n--;g.font=fnt(n);w=g.measureText(t).width+26}
const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.good?3:1.5;g.strokeStyle=o.good?GOOD:EDGE;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1)}
function tileAt(r,ch,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.good||o.bad||o.lift?4:2;
g.strokeStyle=o.good?GOOD:o.bad?BAD:o.lift?'#1d4ed8':EDGE;if(o.hole)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(!ch)return;g.fillStyle=o.ink||INK;g.font=fnt(o.n||Math.round(r.h*.58),800);mid(g);g.fillText(ch,r.x+r.w/2,r.y+r.h/2+2)}
function row(n,y,side){const gap=A.narrow?8:12,s=Math.min(side||big(62),(A.W-24-gap*(n-1))/n),x0=(A.W-(n*s+(n-1)*gap))/2;return[...Array(n)].map((_,i)=>({x:x0+i*(s+gap),y,w:s,h:s}))}
function arc(a,b,col){const g=A.ctx,x1=a.x+a.w/2,x2=b.x+b.w/2,y=a.y-6,lift=Math.min(60,(x2-x1)*.45);g.strokeStyle=col||EC;g.lineWidth=4;g.beginPath();g.moveTo(x1,y);g.bezierCurveTo(x1,y-lift,x2,y-lift,x2,y);g.stroke();
g.fillStyle=col||EC;g.beginPath();g.moveTo(x2,y+2);g.lineTo(x2-7,y-9);g.lineTo(x2+7,y-9);g.fill()}
function letterFill(ch,on){return VOW.includes(ch)?(on?VFILL:'#fff7ed'):null}
/* step 1: drag e to the end */
function addRects(){const s=S.a,w=ADD[Math.min(s.k,3)][0];const r=row(w.length+1,A.H*.3,big(66));return{letters:r.slice(0,w.length),hole:r[w.length],e:{x:A.W/2-big(33),y:A.H*.66,w:big(66),h:big(66)},front:{x:r[0].x-big(30),y:r[0].y,w:big(26),h:r[0].h}}}
function drawAdd(){const s=S.a,g=A.ctx;paper();
if(s.k>=4){tag('4 new words',A.W/2,A.H*.09,{good:1});ADD.forEach((p,j)=>tag(`${p[0]}  →  ${p[1]}`,A.W/2,A.H*(.26+j*.16),{n:18,good:1}));return}
const [w]=ADD[s.k],R=addRects();tag(`Word ${s.k+1} of 4: put the e on the end`,A.W/2,A.H*.09,{n:13});
[...w].forEach((ch,i)=>tileAt(R.letters[i],ch,{fill:letterFill(ch),ink:VOW.includes(ch)?VC:INK}));tileAt(R.hole,null,{hole:1,bad:s.miss==='hole'});
if(s.miss==='front')tileAt(R.front,null,{hole:1,bad:1});
const d=S.drag,er=d?{...R.e,x:d.x-R.e.w/2,y:d.y-R.e.h/2}:R.e;tileAt(er,'e',{fill:EFILL,ink:EC,lift:!!d});
g.fillStyle=A.col.tx;g.font=fnt(big(14),700);mid(g);const v=[...w].find(ch=>VOW.includes(ch));g.fillText(`Now: ${v} says ${SHORT[v]}`,A.W/2,A.H*.92)}
function putE(where){const s=S.a;if(s.k>=4)return;const [w,nw]=ADD[s.k];
if(where!=='end'){s.miss='front';no();return say(`e at the start makes e${w}. That is not a word. The magic e goes at the very end.`)}
const v=[...w].find(ch=>VOW.includes(ch));s.k++;s.miss=null;yes();say(`${w} + e = ${nw}. The e jumps back over one letter and makes ${v} say its name, ${NAMEOF[v]}.`+(s.k>=4?' All 4 done.':''))}
/* step 2: tap the two letters that make one sound */
function joinRects(){const w=JOIN[Math.min(S.j.k,4)].w;return row(w.length,A.H*.4,big(64))}
function drawJoin(){const s=S.j;paper();
if(s.k>=5){tag('All 5 joined',A.W/2,A.H*.09,{good:1});JOIN.forEach((q,j)=>{const v=q.w[q.v];tag(`${q.w}:  ${v}–e`,A.W/2,A.H*(.24+j*.14),{n:16,good:1})});return}
const q=JOIN[s.k],R=joinRects();tag(`Word ${s.k+1} of 5: tap the 2 letters that make 1 sound`,A.W/2,A.H*.09,{n:13});
[...q.w].forEach((ch,i)=>{const got=s.got.includes(i);tileAt(R[i],ch,{good:got,bad:s.miss===i,fill:got?(ch==='e'&&i===q.w.length-1?EFILL:VFILL):null,ink:got?(i===q.w.length-1?EC:VC):INK})});
if(s.got.length===2)arc(R[q.v],R[q.w.length-1]);tag(`Found ${s.got.length} of 2`,A.W/2,A.H*.86,{n:12,good:s.got.length===2})}
function tapJoin(i){const s=S.j;if(s.k>=5)return;const q=JOIN[s.k],last=q.w.length-1,ch=q.w[i];if(s.got.includes(i))return;
if(i!==q.v&&i!==last){s.miss=i;no();return say(VOW.includes(ch)?`This e sits next to another vowel. Find the vowel that has one letter after it, then the end e.`:`${ch} makes its own sound. Find the vowel, then the e at the end.`)}
s.got.push(i);s.miss=null;yes();if(s.got.length<2)return say(`${ch}: yes. Now find its partner.`);
const v=q.w[q.v];s.k++;s.got=[];say(`${v} and e work as a team with a letter in between. That is the split digraph ${v}–e in ${q.w}.`+(s.k>=5?' All 5 done.':''))}
/* step 3: count the sounds */
const NUMS=[2,3,4,5];
function numRects(){const n=NUMS.length,w=Math.min(big(70),(A.W-40)/n-10),x0=(A.W-(n*w+(n-1)*12))/2;return NUMS.map((v,i)=>({v,x:x0+i*(w+12),y:A.H*.68,w,h:w}))}
function drawCount(){const s=S.n,g=A.ctx;paper();
if(s.k>=4){tag('All 4 counted',A.W/2,A.H*.09,{good:1});CNT.forEach((q,j)=>tag(`${q.w}: ${q.parts.join('  ·  ')}  =  ${q.n} sounds`,A.W/2,A.H*(.26+j*.16),{n:15,good:1}));return}
const q=CNT[s.k],R=row(q.w.length,A.H*.26,big(58));tag(`Word ${s.k+1} of 4: how many sounds?`,A.W/2,A.H*.09,{n:13});
[...q.w].forEach((ch,i)=>tileAt(R[i],ch,{fill:letterFill(ch),ink:VOW.includes(ch)?VC:INK}));
g.fillStyle=A.col.tx;g.font=fnt(big(13),700);mid(g);g.fillText(`${q.w.length} letters`,A.W/2,R[0].y+R[0].h+20);
numRects().forEach(r=>tileAt(r,String(r.v),{bad:s.miss===r.v}))}
function pickCount(v){const s=S.n;if(s.k>=4)return;const q=CNT[s.k];
if(v!==q.n){s.miss=v;no();return say(v===q.w.length?`${v} is the number of letters. The vowel and the end e make one sound, so count them once.`:v<q.n?`Too few. Say it slowly: ${q.parts.join(', ')}.`:`Too many. The end e has no sound of its own.`)}
s.k++;s.miss=null;yes();say(`${q.parts.join(', ')}: ${q.n} sounds, ${q.w.length} letters.`+(s.k>=4?' All 4 done.':''))}
/* step 4: which word needs its e? */
function fixRects(){const L=FIX[Math.min(S.f.k,2)].t,g=A.ctx,n=big(22);g.font=fnt(n,700);const h=n+26,sp=8;const ws=L.map(t=>Math.max(t==='.'?30:54,g.measureText(t).width+22));
const tot=ws.reduce((a,b)=>a+b,0)+sp*(ws.length-1),sc=Math.min(1,(A.W-16)/tot);let x=(A.W-tot*sc)/2;return ws.map(w=>{const r={x,y:A.H*.36,w:w*sc,h};x+=(w+sp)*sc;return r})}
function drawFix(){const s=S.f;paper();
if(s.k>=3){tag('All 3 fixed',A.W/2,A.H*.09,{good:1});['I fly my kite.','The dog has a bone.','I hope it is sunny.'].forEach((t,j)=>tag(t,A.W/2,A.H*(.3+j*.18),{n:18,good:1}));return}
const L=FIX[s.k],R=fixRects();tag(`Line ${s.k+1} of 3: one word needs a magic e. Tap it.`,A.W/2,A.H*.09,{n:13});
L.t.forEach((t,i)=>tileAt(R[i],t,{bad:s.miss===i,n:Math.round(R[i].h*.5)}));tag('Read it out loud. Does it make sense?',A.W/2,A.H*.82,{n:12})}
function tapFix(i){const s=S.f;if(s.k>=3)return;const L=FIX[s.k];if(L.t[i]==='.')return;
if(i!==L.bad){s.miss=i;no();return say(`${L.t[i]} is right. Find the word that should have a long vowel sound.`)}
s.k++;s.miss=null;yes();say(`${L.t[i]} → ${L.good}. ${L.why}`+(s.k>=3?' All 3 fixed.':''))}
/* step 5: sort short and long */
function bins(){const w=(A.W-30)/2,h=A.H*.32;return[{x:10,y:A.H*.62,w,h},{x:20+w,y:A.H*.62,w,h}]}
function card(){const w=Math.min(big(150),A.W*.5),h=big(64);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawSort(){const s=S.s,g=A.ctx;paper();tag(s.k>=8?'All 8 sorted':`Card ${s.k+1} of 8: drag it to a box`,A.W/2,A.H*.09,{n:13,good:s.k>=8});
bins().forEach((r,j)=>{g.fillStyle=j?'#f5f3ff':'#f0fdf4';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=j?EC:GOOD;g.lineWidth=2.5;g.stroke();
g.fillStyle=INK;g.font=fnt(big(14));g.textAlign='center';g.textBaseline='top';g.fillText(j?'Long: says its name':'Short sound',r.x+r.w/2,r.y+8);
const got=PILE.slice(0,s.k).filter(x=>x[1]===j).map(x=>x[0]);g.font=fnt(big(16),700);g.fillText(got.join('  '),r.x+r.w/2,r.y+r.h*.5,r.w-10)});
if(s.k<8){const r=card(),d=S.drag;tileAt(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,PILE[s.k][0],{bad:s.miss,lift:!!d,n:big(30)})}}
function sortIt(j){const s=S.s;if(s.k>=8)return;const [w,b]=PILE[s.k],v=[...w].find(ch=>VOW.includes(ch));
if(j!==b){s.miss=1;no();return say(b?`${w} ends in e, so ${v} says its name, ${NAMEOF[v]}. It is long.`:`${w} has no e on the end, so ${v} is short: ${SHORT[v]}.`)}
s.k++;s.miss=0;yes();say((b?`Long. ${w}: the e makes ${v} say ${NAMEOF[v]}.`:`Short. ${w}: ${SHORT[v]}.`)+(s.k>=8?' All 8 sorted.':''))}
function draw(){const k=stage();if(k==='quiz'){paper();tag('Challenge',A.W/2,A.H*.2,{good:1});tag('cap + e = cape',A.W/2,A.H*.52,{n:20});return}
({add:drawAdd,join:drawJoin,count:drawCount,fix:drawFix,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
if(k==='add'&&S.a.k<4){const R=addRects();if(hit(p,R.e)){S.drag={x:p.x,y:p.y};return true}if(hit(p,R.hole))putE('end');return false}
if(k==='join'&&S.j.k<5){const i=joinRects().findIndex(r=>hit(p,r));if(i>=0)tapJoin(i);return false}
if(k==='count'&&S.n.k<4){const r=numRects().find(r=>hit(p,r));if(r)pickCount(r.v);return false}
if(k==='fix'&&S.f.k<3){const i=fixRects().findIndex(r=>hit(p,r));if(i>=0)tapFix(i);return false}
if(k==='sort'&&S.s.k<8){if(hit(p,card())){S.drag={x:p.x,y:p.y};return true}const b=bins().findIndex(r=>hit(p,r));if(b>=0)sortIt(b)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=stage();
if(k==='add'){const R=addRects();if(hit(p,{x:R.hole.x-14,y:R.hole.y-14,w:R.hole.w+28,h:R.hole.h+28}))putE('end');else if(p.x<R.letters[0].x+R.letters[0].w/2&&p.y<R.hole.y+R.hole.h+20)putE('front');else A.redraw();return}
const b=bins().findIndex(r=>hit(p,r));if(b>=0)sortIt(b);else A.redraw()}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{a:{k:0},j:{k:0,got:[]},n:{k:0},f:{k:0},s:{k:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,desc,ok,msg){reset();say(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='add'&&S.a.k<4){const w=ADD[S.a.k][0];B(`e at the end: ${w}_`,()=>putE('end'),`Put e at the end of ${w}`);B(`e at the start: _${w}`,()=>putE('front'),`Put e at the start of ${w}`)}
if(k==='join'&&S.j.k<5)[...JOIN[S.j.k].w].forEach((ch,i)=>{if(!S.j.got.includes(i))B(ch,()=>tapJoin(i),`Letter ${i+1}: ${ch}`)});
if(k==='count'&&S.n.k<4)NUMS.forEach(v=>B(`${v} sounds`,()=>pickCount(v)));
if(k==='fix'&&S.f.k<3)FIX[S.f.k].t.forEach((t,i)=>{if(t!=='.')B(t,()=>tapFix(i),`Does ${t} need an e?`)});
if(k==='sort'&&S.s.k<8){B('Short sound',()=>sortIt(0));B('Long: says its name',()=>sortIt(1))}}
const steps=[
{h:'Add the magic e',p:'Drag the e to the end of the word. Listen to the vowel in the middle change.',
predict:{q:'Put an e on the end of kit. What does the i say now?',opts:['i as in it, the same as before','i says its name: kite'],ans:1},task:'Make all 4 new words',
show:()=>auto(0,ADD.map(()=>()=>putE('end')),700),
go:()=>begin(0,'Letters c a p, an empty box at the end, and an e tile to drag.',()=>S.a.k>=4,'The e at the end makes the vowel say its name. The e itself stays quiet.')},
{h:'Two letters, one sound',p:'In cake, a and e make one sound, but the k sits between them. This is a split digraph. Tap the 2 letters that work together.',
task:'Join the team in all 5 words',show:()=>auto(1,JOIN.flatMap(q=>[()=>tapJoin(q.v),()=>tapJoin(q.w.length-1)]),420),
go:()=>begin(1,'Letters c a k e. Tap the vowel and the e that make one sound.',()=>S.j.k>=5,'a–e, i–e, o–e, u–e and e–e: the vowel and the end e split round one letter.')},
{h:'Count the sounds',p:'Count sounds, not letters. The vowel and the end e are one sound together.',
predict:{q:'How many sounds are in cake?',opts:['4, one for each letter','3: c, a–e, k'],ans:1},task:'Count the sounds in all 4 words',
show:()=>auto(2,CNT.map(q=>()=>pickCount(q.n)),700),
go:()=>begin(2,'Letters c a k e. Buttons: 2, 3, 4 or 5 sounds.',()=>S.n.k>=4,'The split digraph is one sound, so a word has fewer sounds than letters.')},
{h:'Which word needs an e?',p:'Each line has one word that should have a magic e. Read it out loud and tap that word.',task:'Fix all 3 lines',
show:()=>auto(3,FIX.map(L=>()=>tapFix(L.bad)),800),
go:()=>begin(3,'I fly my kit. Each word is a tile.',()=>S.f.k>=3,'Without the e, kit, bon and hop say something else, or nothing at all.')},
{h:'Short or long?',p:'No e on the end: the vowel is short. A magic e on the end: the vowel says its name. Drag each word to a box.',
predict:{q:'Where does tape go?',opts:['Short sound, like tap','Long: a says its name'],ans:1},task:'Sort all 8 words',
show:()=>auto(4,PILE.map(x=>()=>sortIt(x[1])),500),
go:()=>begin(4,'Word card tap. Boxes: Short sound, Long: says its name.',()=>S.s.k>=8,'tap tape, pin pine, not note, cut cute: the e changes the vowel.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Add e to pin. What word do you get?',a:'pine',o:[['pin-ee','loud'],['pen','swap']]},
{q:'How many sounds are in cake?',a:'3',o:[['4','letters'],['2','skip']]},
{q:'Which word has a split digraph?',a:'rope',o:[['rod','short'],['road','side']]},
{q:'In tune, which 2 letters make one sound?',a:'u and e',o:[['t and n','cons'],['n and e','near']]},
{q:'Which word has a long a, saying its name?',a:'tape',o:[['tap','short'],['top','swap']]},
{q:'What sound does the e at the end of kite make?',a:'None, it is quiet',o:[['ee, like in see','loud'],['e as in egg','loud']]}];
function why(t){let m='The e at the end makes the vowel say its name.';
if(t==='loud')m='The end e is quiet. It does not say a sound. It makes the vowel say its name.';
if(t==='swap')m='The vowel letter stays the same. Only its sound changes, to its name.';
if(t==='letters')m='That counts letters. a and e make one sound: c, a–e, k is 3 sounds.';
if(t==='skip')m='c and k are sounds too: c, a–e, k.';
if(t==='short')m='No e on the end, so the vowel stays short.';
if(t==='side')m='In road, o and a sit side by side. A split digraph has a letter between: r, o–e, p.';
if(t==='cons')m='t and n are consonants. Find the vowel and the end e.';
if(t==='near')m='The e works with the vowel u. It jumps back over the n.';
return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Magic e buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
