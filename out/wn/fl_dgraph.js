/* Flagship – consonant digraphs (ages 4–7). Two letters, one sound: drag the sh, ch or th magnet into the gap and the
   picture decides the word (ship or chip), count sounds not letters (duck is d-u-ck), sort ph and wh words by the
   sound they make, finish words with ck or k and tch or ch, and hunt the pictures that start with sh (not s). */
(()=>{
const GAP=[{pic:'🚢',pre:'',post:'ip',ans:'sh',word:'ship'},{pic:'🍟',pre:'',post:'ip',ans:'ch',word:'chip'},{pic:'🛁',pre:'ba',post:'',ans:'th',word:'bath'}];
const MAG=['sh','ch','th'],SAYS={sh:'shh, like a quiet finger',ch:'ch, like a sneeze',th:'th, tongue between your teeth'};
const CNT=[{pic:'🦆',word:'duck',parts:['d','u','ck']},{pic:'💍',word:'ring',parts:['r','i','ng']},{pic:'🐤',word:'chick',parts:['ch','i','ck']}];
const SRT=[{pic:'📷',word:'photo',lead:'ph',bin:0},{pic:'🛞',word:'wheel',lead:'wh',bin:1},{pic:'🐬',word:'dolphin',lead:'ph',bin:0}];
const BIN=[['f','says f'],['w','says w'],['p','says p']];
const END=[{pic:'🦆',pre:'du',ans:'ck',opts:['ck','k'],word:'duck',why:{k:'u is a short vowel just before. After a short vowel, use ck: duck.'}},
 {pic:'🥛',pre:'mil',ans:'k',opts:['ck','k'],word:'milk',why:{ck:'l comes just before, not a vowel. After a consonant, just k: milk.'}},
 {pic:'🔥',pre:'ma',ans:'tch',opts:['tch','ch'],word:'match',why:{ch:'a is a short vowel just before. After a short vowel, use tch: match.'}}];
const HUNT=[['🐑','sheep',1],['🐍','snake',0],['🚢','ship',1],['🧀','cheese',0],['🐚','shell',1],['🎩','hat',0]];
const HWHY={snake:'Snake starts with s alone: sss. Sh needs s and h together.',cheese:'Cheese starts with ch, not sh.',hat:'Hat starts with h alone: a breath.'};
VIS.reg('flagdgraph',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({k:0,n:0,wait:0,ok:0,bad:-1,hold:null,hook:()=>{},got:[],quick:0}),S=fresh();
const mode=()=>['gap','count','sort','end','hunt','quiz'][A.step];
const u=n=>Math.round(n*(A.narrow?1:1.15)),quick=()=>A.reduced()||S.quick;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 String(t).split(' ').forEach(q=>{const v=s?s+' '+q:q;if(g.measureText(v).width>w&&s){L.push(s);s=q}else s=v});L.push(s);const h=u(n)*1.25;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
function pic(g,e,x,y,s){g.fillStyle='#000';g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function tile(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();if(dash)g.setLineDash([7,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const item=()=>({gap:GAP,count:CNT,sort:SRT,end:END}[mode()]||[])[S.k]||{};
const choices=()=>{const m=mode(),it=item();return m==='gap'?MAG:m==='count'?['2','3','4','5']:m==='sort'?BIN.map(b=>b[0]):m==='end'?it.opts:[]};
/* option cards along the bottom: magnets, numbers, bins or endings */
function slots(){const n=choices().length,big=mode()==='sort',w=Math.min(u(big?118:96),(A.W-24-(n-1)*12)/n),h=u(big?88:66),y=A.H-h-14,x0=(A.W-(w*n+12*(n-1)))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+12),y,w,h}))}
/* the word row: letter tiles with a gap (gap/end) or sound groups (count) */
function row(){const it=item(),m=mode();let cells=[];
 if(m==='gap')cells=[...it.pre].map(t=>({t})).concat([{t:S.ok?it.ans:'',gap:1,wide:1}]).concat([...it.post].map(t=>({t})));
 if(m==='end')cells=[...it.pre].map(t=>({t})).concat([{t:S.ok?it.ans:'',gap:1,wide:1}]);
 if(m==='count')cells=S.ok?it.parts.map(t=>({t,wide:t.length>1})):[...it.word].map(t=>({t}));
 if(m==='gap'&&!S.ok&&!it.pre)cells[0].first=1;
 const unit=cells.reduce((a,x)=>a+(x.wide?1.7:1),0)+.2*(cells.length-1),s=Math.min(u(62),(A.W-30)/unit),y=A.H*(A.narrow?.36:.36);let x=(A.W-unit*s)/2;
 return cells.map(c0=>{const w=s*(c0.wide?1.7:1),r={...c0,x,y,w,h:s*1.1,s};x+=w+s*.2;return r})}
const gapRect=()=>row().find(r=>r.gap);
const binRect=()=>{const w=Math.min(A.W-60,u(220)),h=u(64);return{x:(A.W-w)/2,y:A.H*(A.narrow?.38:.36),w,h}};
function cells(){const cols=3,w=(A.W-24-2*10)/cols,h=Math.min(u(110),(A.H*.72-10)/2),y0=A.H*.24;return HUNT.map((_,i)=>({x:12+(i%cols)*(w+10),y:y0+Math.floor(i/cols)*(h+10),w,h}))}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode(),it=item();
 if(m==='quiz'){write(g,'Two letters, one sound: sh, ch, th, ck, ng, ph, wh.',W/2,H*.45,W-40,17);return}
 if(m==='hunt'){write(g,'Tap the pictures that start with sh.',W/2,H*.1,W-30,18,C.tx,800);
  cells().forEach((r,i)=>{const h=HUNT[i],got=S.got.includes(i);tile(g,r,got?A.mix(C.pn,C.gr,.2):S.bad===i?A.mix(C.pn,C.rd,.2):C.pn,got?C.gr:S.bad===i?C.rd:C.ln,got||S.bad===i?4:2);
   pic(g,h[0],r.x+r.w/2,r.y+r.h*.42,Math.round(r.h*.5));if(got||S.bad===i)write(g,h[1],r.x+r.w/2,r.y+r.h*.84,r.w-6,14,C.tx,800)});A.fx.draw(g);return}
 const py=H*(A.narrow?.17:.17);g.fillStyle=A.alpha(C.cy,.12);g.beginPath();g.arc(W/2,py,u(48),0,7);g.fill();pic(g,it.pic,W/2,py,u(58));
 if(m==='sort'){const r=binRect(),d=S.hold,rr=d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;
  if(!S.ok){tile(g,rr,S.bad>=0?A.mix(C.pn,C.rd,.18):C.pn,S.bad>=0?C.rd:C.am,3);g.font=`800 ${u(30)}px system-ui,sans-serif`;
   const w=it.word,i=w.indexOf(it.lead),a=w.slice(0,i),b=w.slice(i+2),tw=q=>g.measureText(q).width,x0=rr.x+rr.w/2-tw(w)/2,yy=rr.y+rr.h/2;g.textAlign='left';g.textBaseline='middle';
   g.fillStyle=C.tx;g.fillText(a,x0,yy);g.fillStyle=C.vi;g.fillText(it.lead,x0+tw(a),yy);A.paint.rrect(x0+tw(a),yy+u(17),tw(it.lead),5,2);g.fill();g.fillStyle=C.tx;g.fillText(b,x0+tw(a+it.lead),yy);
   if(!d)write(g,'Drag the word to its sound',W/2,r.y+r.h+u(20),W-30,13,C.mu,600)}
  else write(g,`${it.word}: ${it.lead} says ${BIN[it.bin][0]}`,W/2,r.y+r.h/2,W-30,22,C.tx,800)}
 else{row().forEach(r=>{const lit=r.gap&&S.ok;tile(g,r,lit?A.mix(C.pn,C.gr,.2):r.gap?A.alpha(C.vi,.08):C.pn,r.gap?(lit?C.gr:C.vi):C.ln,r.gap?3:2,r.gap&&!S.ok);
   write(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w,Math.round(r.s*.5/(A.narrow?1:1.15)),C.tx,800);
   if(m==='count'&&S.ok){g.fillStyle=C.gr;const by=r.y+r.h+r.s*.25;if(r.t.length>1){A.paint.rrect(r.x+r.w*.2,by-4,r.w*.6,8,4);g.fill()}else{g.beginPath();g.arc(r.x+r.w/2,by,r.s*.1+2,0,7);g.fill()}}});
  if(m==='count')write(g,S.ok?`${it.word}: ${it.word.length} letters, ${it.parts.length} sounds`:`How many sounds in ${it.word}?`,W/2,H*(S.ok?.8:.64),W-30,16,C.tx,800)}
 if(!S.ok)slots().forEach((r,j)=>{const d=S.hold;if(d&&d.j===j&&d.x!=null)return;opt(g,r,j)});
 if(S.hold&&S.hold.x!=null&&S.hold.j!=null){const r=slots()[0];opt(g,{...r,x:S.hold.x-r.w/2,y:S.hold.y-r.h/2},S.hold.j)}
 A.fx.draw(g)}
function opt(g,r,j){const C=A.col,m=mode(),bad=S.bad===j&&m!=='sort';tile(g,r,bad?A.mix(C.pn,C.rd,.2):m==='sort'?A.mix(C.pn,[C.cy,C.vi,C.am][j],.12):C.pn,bad?C.rd:m==='sort'?[C.cy,C.vi,C.am][j]:C.vi,bad?4:2.5);
 if(m==='sort'){write(g,BIN[j][0],r.x+r.w/2,r.y+r.h*.38,r.w-6,30,C.tx,800);write(g,BIN[j][1],r.x+r.w/2,r.y+r.h*.78,r.w-6,13,C.tx,700)}else write(g,choices()[j],r.x+r.w/2,r.y+r.h/2,r.w-6,30,C.tx,800)}
const oops=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1000);A.redraw()};
function gotOne(t){S.n++;A.sound.pop();keys();if(S.n<3&&mode()!=='hunt'){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;Object.assign(S,{wait:0,k:S.k+1,ok:0});say(t+' Next one.');keys();A.redraw()},quick()?5:1200);say(t)}else{say(t);keys()}A.redraw();S.hook()}
/* every answer runs through here, from a drag, a tap on the canvas or a button */
function answer(j){const m=mode();if(m==='quiz'||S.n>=3||S.wait||S.ok)return;const it=item(),pick=choices()[j];
 if(m==='gap'){if(pick!==it.ans){const other=(it.pre||'')+pick+(it.post||'');return oops(`That spells ${other}. Look at the picture: it is a ${it.word}. ${it.ans} says ${SAYS[it.ans]}.`,j)}S.ok=1;return gotOne(`${it.ans} is one sound. ${[...it.pre].join('-')}${it.pre?'-':''}${it.ans}${it.post?'-':''}${[...it.post].join('-')}: ${it.word}!`)}
 if(m==='count'){const want=it.parts.length,got=+pick,tm=it.parts.filter(p=>p.length>1),team=tm.join(' and '),each=tm.length>1?'each two letters with one sound':'two letters with one sound';
  if(got!==want)return oops(got===it.word.length?`${it.word} has ${got} letters, but ${team} ${tm.length>1?'are':'is'} ${each}. Count sounds, not letters.`:`Say it slowly: ${it.parts.join('-')}. That is ${want} sounds.`,j);S.ok=1;return gotOne(`${it.parts.join('-')}: ${want} sounds. ${team} ${tm.length>1?'are one sound each':'is one sound'}.`)}
 if(m==='sort'){if(j!==it.bin)return oops(it.lead==='wh'?`wh says w, like in wheel. Not ${BIN[j][0]}.`:j===2?'Not p. p and h team up: ph says f, like in phone.':`ph says f, like in phone. Not ${BIN[j][0]}.`,0);S.ok=1;return gotOne(`${it.word}: ${it.lead} says ${BIN[it.bin][0]}.`)}
 if(m==='end'){if(pick!==it.ans)return oops(it.why[pick],j);S.ok=1;return gotOne(`${it.pre} + ${it.ans} = ${it.word}. ${it.ans==='k'?'A consonant comes before, so just k.':'A short vowel comes just before, so '+it.ans+'.'}`)}}
function tapHunt(i){if(mode()!=='hunt'||S.n>=3||S.got.includes(i))return;const h=HUNT[i];if(!h[2])return oops(HWHY[h[1]],i);S.got.push(i);gotOne(`${h[1]}: sh-${h[1].slice(2)}. It starts with sh.`)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(m==='quiz'||S.n>=3||S.ok)return;
 if(m==='hunt')HUNT.forEach((h,i)=>{if(!S.got.includes(i))B(h[0]+' '+h[1],()=>tapHunt(i),'Picture: '+h[1])});
 else choices().forEach((o,j)=>B(m==='sort'?o+' '+BIN[j][1]:o,()=>answer(j),m==='count'?o+' sounds':m==='sort'?'The word '+BIN[j][1]:'Use '+o))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const m=mode();if(m==='quiz'||S.wait||S.ok||S.n>=3)return false;
 if(m==='hunt'){const i=cells().findIndex(r=>inside(p,r));if(i>=0)tapHunt(i);return false}
 if(m==='sort'){if(inside(p,binRect())){S.hold={x:null,x0:p.x,y0:p.y};return true}const j=slots().findIndex(r=>inside(p,r));if(j>=0)answer(j);return false}
 const j=slots().findIndex(r=>inside(p,r));if(j<0)return false;if(m==='count'){answer(j);return false}S.hold={j,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.hold;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold;S.hold=null;if(!d)return;const m=mode();
 if(m==='sort'){if(d.x==null)return A.redraw();const j=slots().findIndex(r=>inside(p,{x:r.x,y:r.y-30,w:r.w,h:r.h+30}));if(j>=0)answer(j);else A.redraw();return}
 if(d.x==null)return answer(d.j);const r=gapRect();if(r&&inside(p,{x:r.x-20,y:r.y-25,w:r.w+40,h:r.h+50}))answer(d.j);else{say('Drop it in the empty box.');A.redraw()}}
const ready=(n,msg)=>()=>{if(A.step===n&&S.n>=3&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f){const k=++run,go=()=>{if(k!==run||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const clear=()=>{run++;Object.assign(S,fresh())};
const right=()=>{const m=mode(),it=item();if(m==='hunt')return HUNT.findIndex((h,i)=>h[2]&&!S.got.includes(i));if(m==='count')return choices().indexOf(String(it.parts.length));if(m==='sort')return it.bin;return choices().indexOf(it.ans)};
const showMe=i=>()=>{steps[i].go();S.quick=1;auto(()=>mode()==='hunt'?tapHunt(right()):answer(right()))};
const steps=[
{h:'Two letters, one sound',p:'s and h stick together to make one sound: sh. Look at the picture. Drag the right magnet into the empty box.',task:'Make 3 words',show:showMe(0),
 go:()=>{clear();say('Look at the ship. Which magnet makes ship?');keys();S.hook=ready(0,'sh, ch and th: two letters, one sound. Ship and chip only differ by one sound.')}},
{h:'Count the sounds',p:'Say the word slowly. Count the sounds, not the letters.',predict:{q:'Duck has 4 letters. How many sounds?',opts:['4, one for each letter','3: d-u-ck'],ans:1},task:'Count sounds in 3 words',show:showMe(1),
 go:()=>{clear();say('Duck. Say it slowly. How many sounds?');keys();S.hook=ready(1,'ck, ng and ch are each one sound. Count sounds, not letters.')}},
{h:'ph and wh',p:'Some teams make a surprise sound. Drag each word to the sound its team makes.',predict:{q:'Photo starts with p and h. What sound?',opts:['p, like in pig','f, like in fish'],ans:1},task:'Sort 3 words',show:showMe(2),
 go:()=>{clear();say('Photo. What sound does ph make?');keys();S.hook=ready(2,'ph says f, as in photo and dolphin. wh says w, as in wheel.')}},
{h:'ck or k? tch or ch?',p:'Listen to the sound just before the end. Drag the right ending into the box.',predict:{q:'Duck ends in a k sound. How do we spell it?',opts:['Just k: duk','ck: duck'],ans:1},task:'Finish 3 words',show:showMe(3),
 go:()=>{clear();say('Duck. Which ending?');keys();S.hook=ready(3,'Straight after a short vowel: ck and tch. After a consonant: k and ch.')}},
{h:'Sh hunt',p:'Say each picture. Tap the ones that start with sh.',predict:{q:'Snake starts with s. Does it start with sh?',opts:['Yes, sh has an s in it','No, s on its own says sss'],ans:1},task:'Find 3 sh pictures',show:showMe(4),
 go:()=>{clear();say('Find the pictures that start with sh.');keys();S.hook=ready(4,'Sheep, ship and shell start with sh. Snake starts with s on its own.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['How many sounds in shop?',[['3: sh-o-p','ok'],['4: s-h-o-p','apart'],['2: sh-p','skip']]],['What sound does ph make in phone?',[['f','ok'],['p','ph'],['h','ph']]],
 ['Which word is spelled right?',[['sock','ok'],['sok','ck'],['soc','ck']]],['Which word starts with sh?',[['shell','ok'],['sun','s'],['chin','swap']]],
 ['Which word ends with ng?',[['king','ok'],['kin','skip'],['kick','swap']]],['Which word is spelled right?',[['catch','ok'],['cach','tch'],['catsh','tch']]]];
function why(t){let m='Two letters can make one sound. Say the word slowly.';
 if(t==='apart')m='s and h make one sound, sh. Count sounds, not letters.';if(t==='skip')m='Say it slowly and keep every sound.';
 if(t==='ph')m='p and h team up. ph says f, like in phone and photo.';if(t==='ck')m='After a short vowel, the k sound at the end is spelled ck: sock, duck.';
 if(t==='s')m='s on its own says sss. sh needs s and h together.';if(t==='swap')m='Listen to the team: sh, ch and th all sound different.';
 if(t==='tch')m='Straight after a short vowel, the ch sound is spelled tch: catch, match.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! Two letters, one sound.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
