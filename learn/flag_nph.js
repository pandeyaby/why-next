/* Flagship – expanded noun phrases (ages 6–7). Drag describing words (adjectives) in front of a noun and watch the
   picture line-up shrink until only the starred one is left: adjectives describe AND specify. Then build phrases in
   the right order (determiner, adjectives, noun), put the comma between two describing words, swap a vague word for
   a precise one, and find the whole noun phrase inside a sentence. */
(()=>{
/* line-ups: noun, the things [size, colour, pattern], index of the starred one, word tiles [word, kind, slot] */
const LINE=[{noun:'cat',kind:'cat',set:[['big','black',''],['small','black',''],['big','ginger',''],['small','ginger','']],star:3,
  tiles:[['big','a',0],['small','a',0],['black','a',1],['ginger','a',1],['sleeps','v']]},
 {noun:'hat',kind:'hat',set:[['tall','red',''],['tall','blue',''],['short','red',''],['short','blue','']],star:1,
  tiles:[['short','a',0],['blue','a',1],['tall','a',0],['jumps','v'],['red','a',1]]},
 {noun:'ball',kind:'ball',set:[['big','red','spotty'],['big','red','striped'],['small','red','striped'],['big','blue','striped']],star:1,
  tiles:[['striped','a',2],['small','a',0],['red','a',1],['rolls','v'],['big','a',0],['blue','a',1],['spotty','a',2]]}];
const PAINT={black:'#27272a',ginger:'#ea7a1a',red:'#dc2626',blue:'#2563eb'};
/* order rounds: the words in the right order and what kind each is (d determiner, a adjective, n noun) */
const ORD=[[['the','d'],['fluffy','a'],['cat','n']],[['a','d'],['red','a'],['kite','n']],[['the','d'],['big','a'],['brown','a'],['bear','n']]];
/* comma rounds: four words; the comma goes after word 1 (between the two describing words) */
const COMMA=[['the','old','creaky','door'],['a','tiny','shivering','kitten'],['the','cold','wet','grass']];
/* precise words: [picture, noun, [[word, tag]]] */
const EXACT=[['🐕','dog',[['nice','vague'],['enormous','ok'],['tiny','wrong']]],['🐭','mouse',[['tiny','ok'],['good','vague'],['giant','wrong']]],
 ['👑','crown',[['dull','wrong'],['lovely','vague'],['sparkly','ok']]]];
/* find the phrase: [word, in the noun phrase?, kind] */
const FIND=[[['The',1,'d'],['tiny,',1,'a'],['shivering',1,'a'],['kitten',1,'n'],['hid.',0,'v']],[['A',1,'d'],['big',1,'a'],['red',1,'a'],['bus',1,'n'],['stopped.',0,'v']],
 [['We',0,'o'],['saw',0,'v'],['the',1,'d'],['old,',1,'a'],['creaky',1,'a'],['door.',1,'n']]];
VIS.reg('flagnph',c=>{let A,pad,quiz,qn=-1,tk=0,row=0;c.fig.classList.add('young');
const blank=()=>({hook:()=>{},n:0,k:0,lock:0,adj:[],built:[],gapBad:-1,picked:[],bad:-1,drag:null,sel:-1}),S=blank();
const mode=()=>['which','order','comma','exact','find','quiz'][A.step];
const big=n=>Math.round(n*(A.narrow?1:1.15)),quick=()=>A.reduced();
const read=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const out=[];let cur='';
 t.split(' ').forEach(z=>{const q=cur?cur+' '+z:z;if(g.measureText(q).width>w&&cur){out.push(cur);cur=z}else cur=q});out.push(cur);out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*big(n)*1.2))}
/* the line-up pictures */
function thing(g,kind,[size,colour,pat],x,y,u,dim){g.save();g.globalAlpha=dim?.16:1;const s=u*({big:1,tall:1,small:.62,short:.62}[size]||1),col=PAINT[colour];g.lineWidth=2;g.strokeStyle=A.col.tx;
 if(kind==='cat'){const b=y+u*.5;g.fillStyle=col;g.beginPath();g.ellipse(x,b-s*.35,s*.42,s*.34,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(x+s*.3,b-s*.8,s*.24,0,7);g.fill();g.stroke();
  g.beginPath();g.moveTo(x+s*.12,b-s*.95);g.lineTo(x+s*.16,b-s*1.18);g.lineTo(x+s*.3,b-s*1.02);g.moveTo(x+s*.38,b-s*1.02);g.lineTo(x+s*.5,b-s*1.18);g.lineTo(x+s*.52,b-s*.92);g.fill();g.stroke();
  g.beginPath();g.moveTo(x-s*.4,b-s*.4);g.quadraticCurveTo(x-s*.8,b-s*.5,x-s*.6,b-s*.95);g.lineWidth=s*.08;g.strokeStyle=col;g.stroke()}
 if(kind==='hat'){const b=y+u*.5,h=s*({tall:1.05,short:.5}[size]);g.fillStyle=col;g.fillRect(x-u*.32,b-h-u*.08,u*.64,h);g.strokeRect(x-u*.32,b-h-u*.08,u*.64,h);g.beginPath();g.ellipse(x,b-u*.08,u*.55,u*.11,0,0,7);g.fill();g.stroke()}
 if(kind==='ball'){const r=s*.42,cy=y+u*.5-r;g.fillStyle=col;g.beginPath();g.arc(x,cy,r,0,7);g.fill();g.stroke();g.save();g.beginPath();g.arc(x,cy,r,0,7);g.clip();g.fillStyle='#fff';
  if(pat==='spotty')[[-.4,-.3],[.35,-.2],[0,.35],[-.25,.5],[.5,.45]].forEach(([a,b2])=>{g.beginPath();g.arc(x+a*r,cy+b2*r,r*.16,0,7);g.fill()});
  if(pat==='striped')[-.45,0,.45].forEach(a=>g.fillRect(x-r,cy+a*r-r*.09,r*2,r*.18));g.restore()}g.restore()}
function star(g,x,y,s){g.fillStyle='#f59e0b';g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?s*.45:s;g.lineTo(x+q*Math.cos(a),y+q*Math.sin(a))}g.closePath();g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}
/* layout */
function strip(n,y,h,max){const{W}=A,gap=8,w=Math.min((W-16-gap*(n-1))/n,max||150),x0=(W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
function tiles2(n,y,h){if(n<=4||!A.narrow)return strip(n,y,h,130);const a=Math.ceil(n/2);return strip(a,y,h*.47,130).concat(strip(n-a,y+h*.53,h*.47,130))}
const tileRects=()=>{const L=LINE[S.k],base=tiles2(L.tiles.length,A.H*.66,A.H*.3);return base.map((r,i)=>S.drag&&S.drag.i===i&&S.drag.x!=null?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r)};
const phraseBox=()=>({x:10,y:A.H*.45,w:A.W-20,h:A.H*.15});
const ordRects=()=>strip(ORD[S.k].length,A.H*.66,A.H*.2),slotRects=()=>strip(ORD[S.k].length,A.H*.36,A.H*.18);
const commaWords=()=>strip(4,A.H*.42,A.H*.2,140),gapAt=j=>{const r=commaWords();return{x:(r[j].x+r[j].w+r[j+1].x)/2,y:r[j].y+r[j].h/2}};
const exactRects=()=>strip(3,A.H*.62,A.H*.3),findRects=()=>tiles2(FIND[S.k].length,A.H*.4,A.H*.42);
function chip(g,t,r,st){const C=A.col,bg=st==='good'?A.alpha(C.gr,.22):st==='bad'?A.alpha(C.rd,.2):C.dark?'#1e293b':'#eef2ff';g.fillStyle=bg;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='bad'?C.rd:st==='good'?C.gr:st==='hot'?C.vi:C.mu;g.lineWidth=st&&st!=='dim'?4:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();words(g,t,r.x+r.w/2,r.y+r.h/2,r.w-8,15,st==='dim'?C.mu:C.tx,800)}
const match=it=>S.adj.every(w=>it.includes(w)),left=()=>LINE[S.k].set.filter(match).length,phrase=()=>{const L=LINE[S.k],ws=S.adj.slice().sort((a,b)=>slotOf(a)-slotOf(b));return['the',...ws,L.noun].join(' ')};
const slotOf=w=>(LINE[S.k].tiles.find(t=>t[0]===w)||[])[2]||0;
function drawWhich(g){const L=LINE[S.k],{W,H}=A,n=L.set.length,u=Math.min(W/n*.6,H*.22),C=A.col;
 L.set.forEach((it,i)=>{const x=W*(i+.5)/n,y=H*.17;thing(g,L.kind,it,x,y,u,!match(it));if(i===L.star)star(g,x,H*.05,big(11))});
 const P=phraseBox();g.fillStyle=A.alpha(C.vi,.1);A.paint.rrect(P.x,P.y,P.w,P.h,14);g.fill();g.strokeStyle=C.vi;g.lineWidth=2.5;A.paint.rrect(P.x,P.y,P.w,P.h,14);g.stroke();
 words(g,phrase(),W/2,P.y+P.h/2,P.w-16,19,C.tx,800);tileRects().forEach((r,i)=>{const[t]=L.tiles[i];if(!S.adj.includes(t))chip(g,t,r,S.bad===i?'bad':S.sel===i?'hot':'')})}
function drawOrder(g){const R=ORD[S.k],sl=slotRects(),C=A.col;words(g,'Build the noun phrase:',A.W/2,A.H*.08,A.W-20,15);words(g,'which word comes first?',A.W/2,A.H*.17,A.W-20,13,C.mu);
 sl.forEach((r,j)=>{g.setLineDash([6,5]);g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([]);if(S.built[j]!=null)chip(g,R[S.built[j]][0],r,'good')});
 ordRects().forEach((r,j)=>{const i=S.deck[j];if(!S.built.includes(i))chip(g,R[i][0],r,S.bad===j?'bad':'')})}
function drawComma(g){const ws=COMMA[S.k],C=A.col;words(g,'Tap the gap where the comma goes.',A.W/2,A.H*.12,A.W-20,15);
 commaWords().forEach((r,j)=>chip(g,ws[j]+(S.lock&&j===1?',':''),r,''));for(let j=0;j<3;j++){const p=gapAt(j);g.fillStyle=S.gapBad===j?C.rd:A.alpha(C.vi,.7);g.beginPath();g.arc(p.x,p.y+A.H*.14,big(11),0,7);g.fill();words(g,'^',p.x,p.y+A.H*.145,30,12,'#ffffff',900)}}
function drawExact(g){const[pic,noun,ops]=EXACT[S.k];g.font=`${Math.round(A.H*.26)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(pic,A.W/2,A.H*.24);
 words(g,`the ___ ${noun}`,A.W/2,A.H*.5,A.W-20,18,A.col.tx,800);exactRects().forEach((r,j)=>chip(g,ops[j][0],r,S.bad===j?'bad':''))}
function drawFind(g){const F=FIND[S.k];words(g,'Tap every word in the noun phrase.',A.W/2,A.H*.12,A.W-20,15);findRects().forEach((r,j)=>chip(g,F[j][0],r,S.picked.includes(j)?'good':S.bad===j?'bad':''))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){thing(g,'cat',['big','ginger',''],W/2,H*.25,H*.22);words(g,'the big ginger cat',W/2,H*.5,W-30,20,C.tx,800);words(g,'the + describing words + noun',W/2,H*.7,W-30,15);return}
 if(S.n>=3){words(g,{which:'Each describing word picks out one thing more.',order:'the or a, then describing words, then the noun.',comma:'A comma goes between two describing words.',exact:'Pick the word that tells you most.',find:'The noun phrase is the noun and all its describing words.'}[v],W/2,H*.45,W-30,17);return A.fx.draw(g)}
 ({which:drawWhich,order:drawOrder,comma:drawComma,exact:drawExact,find:drawFind})[v](g);A.fx.draw(g)}
const oops=(t,j,key)=>{A.sound.miss();S[key||'bad']=j==null?-1:j;read(t);setTimeout(()=>{S[key||'bad']=-1;A.redraw()},quick()?10:900);A.redraw()};
function setup(){S.adj=[];S.built=[];S.picked=[];S.lock=0;S.sel=-1;S.drag=null;const v=mode();if(v==='order'){const n=ORD[S.k].length;S.deck=[...Array(n).keys()].reverse();if(S.k===1)S.deck=[1,2,0]}}
function scored(t){S.n++;A.sound.pop();const k=S.k;if(S.n<3){S.wait=1;read(t);setTimeout(()=>{if(S.k!==k)return;S.wait=0;S.k++;setup();read(t+' Next one.');buttons();A.redraw()},quick()?5:600)}else{read(t);buttons()}A.redraw();S.hook()}
function addAdj(i){if(mode()!=='which'||S.n>=3||S.wait)return;const L=LINE[S.k],[w,kind]=L.tiles[i],want=L.set[L.star];S.sel=-1;if(S.adj.includes(w))return;
 if(kind==='v')return oops(`${w} is a doing word (a verb). A noun phrase needs describing words.`,i);
 if(!want.includes(w)){const same=L.tiles.find(t=>t[2]===L.tiles[i][2]&&want.includes(t[0]));return oops(`The ${w} ${L.noun}? Look at the star. It is ${same?same[0]:'not '+w}.`,i)}
 S.adj.push(w);A.sound.tick();if(left()===1)return scored(`"${phrase()}". Now only one ${L.noun} fits!`);read(`"${phrase()}". ${left()} ${L.noun}s still fit. Add another describing word.`);buttons();A.redraw()}
function place(j){if(mode()!=='order'||S.n>=3||S.wait)return;const R=ORD[S.k],i=S.deck[j];if(S.built.includes(i))return;const want=S.built.length;
 if(i!==want)return oops(R[i][1]==='n'?`${R[i][0]} is the noun, the thing. It goes last.`:want===0?`Start with "${R[0][0]}". Describing words come after it.`:`Not yet. "${R[want][0]}" comes next.`,j);
 S.built.push(i);A.sound.tick();if(S.built.length===R.length)return scored(`"${R.map(r=>r[0]).join(' ')}". The noun comes last.`);read(`${R.map(r=>r[0]).slice(0,S.built.length).join(' ')} ... what next?`);A.redraw()}
function gap(j){if(mode()!=='comma'||S.n>=3||S.wait)return;const ws=COMMA[S.k];if(j===0)return oops(`No comma after "${ws[0]}". It goes between the two describing words.`,j,'gapBad');
 if(j===2)return oops(`No comma before the noun "${ws[3]}". Put it between ${ws[1]} and ${ws[2]}.`,j,'gapBad');S.lock=1;scored(`${ws[0]} ${ws[1]}, ${ws[2]} ${ws[3]}. You could say ${ws[1]} and ${ws[2]}, so the comma goes there.`)}
function choose(j){if(mode()!=='exact'||S.n>=3||S.wait)return;const[,noun,ops]=EXACT[S.k],[w,tag]=ops[j];
 if(tag==='vague')return oops(`"${w}" does not say what the ${noun} looks like. Pick a word you can see in the picture.`,j);if(tag==='wrong')return oops(`"${w}"? Look again. That is not what this ${noun} is like.`,j);scored(`"the ${w} ${noun}". Now we can picture it!`)}
function tapWord(j){if(mode()!=='find'||S.n>=3||S.wait||S.picked.includes(j))return;const F=FIND[S.k],[w,inP,kind]=F[j];
 if(!inP)return oops(kind==='v'?`"${w.replace('.','')}" is a doing word. It is not in the noun phrase.`:`"${w}" is not part of the noun phrase. Find the noun and its describing words.`,j);
 S.picked.push(j);A.sound.tick();const need=F.filter(f=>f[1]).length;if(S.picked.length===need)return scored(`Noun phrase: ${F.filter(f=>f[1]).map(f=>f[0].replace(/[.,]/g,'')).join(' ')}.`);read(`Yes, "${w.replace(/[.,]/g,'')}". Find the rest.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(v==='quiz'||S.n>=3)return;
 if(v==='which')LINE[S.k].tiles.forEach(([w],i)=>{if(!S.adj.includes(w))B(w,()=>addAdj(i),`Add the word ${w}`)});
 if(v==='order')S.deck.forEach((i,j)=>B(ORD[S.k][i][0],()=>{place(j);buttons()},`Place the word ${ORD[S.k][i][0]}`));
 if(v==='comma'){const w=COMMA[S.k];[0,1,2].forEach(j=>B(`${w[j]} , ${w[j+1]}`,()=>gap(j),`Comma between ${w[j]} and ${w[j+1]}`))}
 if(v==='exact')EXACT[S.k][2].forEach(([w],j)=>B(w,()=>choose(j)));
 if(v==='find')FIND[S.k].forEach(([w],j)=>B(w.replace(/[.,]/g,''),()=>tapWord(j),`Word: ${w.replace(/[.,]/g,'')}`))}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=mode();if(S.n>=3)return false;
 if(v==='which'){const i=tileRects().findIndex((r,j)=>!S.adj.includes(LINE[S.k].tiles[j][0])&&hit(p,r));if(i>=0){S.drag={i,x:null,x0:p.x,y0:p.y};return true}if(hit(p,phraseBox())&&S.sel>=0)addAdj(S.sel);return false}
 if(v==='order'){const j=ordRects().findIndex(r=>hit(p,r));if(j>=0)place(j)}
 if(v==='comma'){for(let j=0;j<3;j++){const q=gapAt(j);if(Math.abs(p.x-q.x)<A.W*.07&&Math.abs(p.y-q.y)<A.H*.22)return gap(j),false}}
 if(v==='exact'){const j=exactRects().findIndex(r=>hit(p,r));if(j>=0)choose(j)}
 if(v==='find'){const j=findRects().findIndex(r=>hit(p,r));if(j>=0)tapWord(j)}return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null){S.sel=d.i;A.sound.tick();read(`Holding "${LINE[S.k].tiles[d.i][0]}". Tap the phrase to add it.`);return A.redraw()}const P=phraseBox();if(p.y<P.y+P.h+20)addAdj(d.i);else A.redraw()}
const fin=(n,msg)=>()=>{if(A.step===n&&S.n>=3&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(fns,gap){const k=++tk;fns.forEach((f,j)=>setTimeout(()=>{if(k===tk&&f)f()},quick()?j*60+30:(j+1)*gap))}
const restart=()=>{tk++;Object.assign(S,blank());if(A)setup()};
const needs=k=>{const L=LINE[k];return L.set[L.star].filter(w=>w&&L.set.filter(it=>!it.includes(w)).length).map(w=>L.tiles.findIndex(t=>t[0]===w))};
const steps=[
{h:'Which one?',p:'Drag describing words onto "the cat" until only the star one fits. Or tap a word button.',task:'Pick out 3 things',
 show:()=>{steps[0].go();play([0,1,2].flatMap(k=>needs(k).map(i=>()=>addAdj(i)).concat([0,0])),400)},
 go:()=>{restart();read('the cat. Which cat? Four cats fit.');buttons();S.hook=fin(0,'Describing words (adjectives) tell us which one.')}},
{h:'Word order',p:'Tap the words in order to build the noun phrase.',predict:{q:'Where does the describing word go?',opts:['after the noun: the cat fluffy','before the noun: the fluffy cat'],ans:1},task:'Build 3 phrases',
 show:()=>{steps[1].go();play([0,1,2].flatMap(k=>ORD[k].map((_,i)=>()=>place(S.deck.indexOf(i))).concat([0,0])),300)},
 go:()=>{restart();read('Build: the fluffy cat.');buttons();S.hook=fin(1,'the or a, then describing words, then the noun.')}},
{h:'Two describing words',p:'Two describing words? Put a comma between them.',predict:{q:'Where does the comma go?',opts:['the, old creaky door','the old, creaky door'],ans:1},task:'Place 3 commas',
 show:()=>{steps[2].go();play([0,1,2].map(()=>()=>gap(1)),1000)},
 go:()=>{restart();read('the old creaky door. Where does the comma go?');buttons();S.hook=fin(2,'Put the comma between the two describing words.')}},
{h:'Best word',p:'Look at the picture. Pick the word that tells you most.',predict:{q:'Which is better: "a nice dog" or "an enormous dog"?',opts:['a nice dog','an enormous dog'],ans:1},task:'Pick 3 words',
 show:()=>{steps[3].go();play([0,1,2].map(()=>()=>choose(EXACT[S.k][2].findIndex(o=>o[1]==='ok'))),1000)},
 go:()=>{restart();read('the ___ dog. Which word?');buttons();S.hook=fin(3,'Precise words help the reader picture it.')}},
{h:'Find the phrase',p:'Tap every word in the noun phrase. Leave out the doing word.',task:'Find 3 phrases',
 show:()=>{steps[4].go();play([0,1,2].flatMap(k=>FIND[k].map((f,j)=>f[1]?()=>tapWord(j):null).filter(Boolean).concat([0,0])),300)},
 go:()=>{restart();read('The tiny, shivering kitten hid. Find the noun phrase.');buttons();S.hook=fin(4,'The noun phrase is the noun and its describing words.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Which is an expanded noun phrase?',[['the fluffy white rabbit','ok'],['the rabbit hops','verb'],['rabbit fluffy the','order']]],
 ['Where does the comma go?',[['a tiny, shivering kitten','ok'],['a, tiny shivering kitten','comma'],['a tiny shivering, kitten','comma']]],
 ['Which tells you most about the box?',[['the heavy, wooden box','ok'],['the nice box','vague'],['the box','plain']]],
 ['Which word is the noun in "the old green bus"?',[['bus','ok'],['green','adj'],['the','det']]],
 ['Which describing word fits a mouse?',[['tiny','ok'],['giant','wrong'],['good','vague']]]];
function hint(t){let m='A noun phrase is the, then describing words, then the noun.';
 if(t==='verb')m='Hops is a doing word. That makes a sentence, not a noun phrase.';if(t==='order')m='The words are in the wrong order. Say: the fluffy cat, not cat fluffy the.';
 if(t==='comma')m='The comma goes between the two describing words, not after a or before the noun.';if(t==='vague')m='Nice and good do not say what it looks like. Pick a word you can picture.';
 if(t==='plain')m='Just "the box" has no describing words. Add some to tell us more.';if(t==='adj')m='Green is a describing word. The noun is the thing: bus.';
 if(t==='det')m='The is a little pointing word (a determiner). The noun is the thing: bus.';if(t==='wrong')m='Giant does not fit a mouse. Mice are tiny.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>judge(t)});read('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! That is it.':'✗ '+hint(t)}${ok?` In a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
