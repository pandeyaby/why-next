/* Flagship – giving clear instructions (English, Speaking & Listening, ages 4-5; Development Matters 2021 Reception
   C&L, EYFS ELG Speaking). A robot makes a jam sandwich and does exactly what it hears: pick the card that starts with a
   doing word (facts, likes and questions make it do nothing), get ready only what the steps use, choose the exact words
   (vague ones make it put bread on its head), tap the steps in an order that works, then build whole instructions from
   a doing word, a thing and a place and watch the robot act them out. Data and drawings: sayhow_art.js. */
(()=>{const D=SAY;
VIS.reg('flagsayhow',c=>{let A,P,pad,cq,qn=-1,run=0;const S={};c.fig.classList.add('young');
const MODES=['boss','kit','exact','order','build','quiz'],mode=()=>MODES[A.step];
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const MIX=[2,0,3,1];
let CARDS=[];
function stage(y0,frac){const h=(A.H-y0-8)*frac;return{x:8,y:y0,w:A.W-16,h}}
function table(r,st){const g=A.ctx;g.fillStyle=A.col.dark?'#0c4a6e':'#e0f2fe';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.save();g.beginPath();A.paint.rrect(r.x,r.y,r.w,r.h,12);g.clip();D.scene(g,r,st,A.col.dark);g.restore()}
function rowCards(list,y,h,mark){const gp=10,n=list.length,cols=A.narrow&&n>2?1:n,rows=Math.ceil(n/cols),w=(A.W-16-gp*(cols-1))/cols,hh=Math.min(h/rows-gp,96);
 return list.map((t,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:y+Math.floor(i/cols)*(hh+gp),w,h:hh};P.card(r,t,mark?mark(i):{});return r})}
/* ---------- 1. a doing word first ---------- */
const bossOpts=i=>{const R=D.BOSS[i],all=[[R.a,'ok'],...R.o],k=i%3;return all.slice(k).concat(all.slice(0,k))};
function pickBoss(j){const b=S.bs;if(b.i>=D.BOSS.length)return;const [t,tag]=bossOpts(b.i)[j];
 if(tag==='ok'){b.st=Object.assign({},D.BOSS[b.i].did);b.no=-1;b.i++;A.sound.pop();return say(`\u201C${t}\u201D starts with a doing word. The robot did it!`,false)}
 b.no=j;b.st=Object.assign({},b.st,{silly:tag==='ask'?'wait':'none'});A.sound.miss();
 say(tag==='ask'?'That is a question. The robot just waits. Tell it what to do!':tag==='like'?'That says what you like. The robot does nothing. Start with a doing word.':tag==='fact'?'That tells a fact. The robot does nothing. Start with a doing word.':'That tells what happened before. Say what to do now.',true)}
function drawBoss(){const b=S.bs,ok=b.i>=D.BOSS.length,y0=P.strip(ok?D.DONE[0]:`Which one tells the robot what to do? (${b.i+1} of 3)`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 const r=stage(y0,.42);table(r,b.st);if(ok){CARDS=[];return}D.emo(A.ctx,D.BOSS[b.i].e,r.x+r.w-30,r.y+28,30);
 CARDS=rowCards(bossOpts(b.i).map(x=>x[0]),r.y+r.h+10,A.H-r.y-r.h-18,i=>({no:b.no===i}))}
/* ---------- 2. get ready ---------- */
function pickKit(i){const k=S.kt,x=D.KIT[i];if(k.got.includes(i))return;if(!x.ok){k.no=i;A.sound.miss();return say(`A ${x.t.toLowerCase()}? We do not need a ${x.t.toLowerCase()} to make a sandwich. Only get what the steps use.`,true)}
 k.got.push(i);k.no=-1;A.sound.pop();say(`${x.t}: yes, we need it. ${k.got.length} of 4.`,false)}
function drawKit(){const k=S.kt,ok=k.got.length>=4,y0=P.strip(ok?D.DONE[1]:`What do we need for a jam sandwich? Found ${k.got.length} of 4.`,ok?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const cols=4,gp=8,w=(A.W-16-gp*3)/cols,h=Math.min((A.H-y0-8)/2-gp,w*1.15);
 CARDS=D.KIT.map((x,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:y0+Math.floor(i/cols)*(h+gp),w,h};P.card(r,'',{ok:k.got.includes(i),no:k.no===i});D.emo(g,x.e,r.x+w/2,r.y+h*.42,Math.min(w,h)*.42);P.text(x.t,r.x+w/2,r.y+h*.84,15,'center','#0f172a');return r})}
/* ---------- 3. say exactly ---------- */
const exOpts=i=>{const R=D.EXACT[i];return i%2?[[R.x,1],[R.v,0]]:[[R.v,0],[R.x,1]]};
function pickExact(j){const e=S.ex;if(e.i>=D.EXACT.length)return;const R=D.EXACT[e.i],[,good]=exOpts(e.i)[j];
 if(good){e.st=Object.assign({},R.did);e.no=-1;e.i++;A.sound.pop();return say('Clear words! The robot knew just what to do.',false)}
 e.no=j;e.st=Object.assign({},e.st,{silly:R.silly});A.sound.miss();say(R.why,true)}
function drawExact(){const e=S.ex,ok=e.i>=D.EXACT.length,y0=P.strip(ok?D.DONE[2]:`Tap the clear one. (${e.i+1} of 3)`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 const r=stage(y0,.5);table(r,e.st);if(ok){CARDS=[];return}CARDS=rowCards(exOpts(e.i).map(x=>x[0]),r.y+r.h+10,A.H-r.y-r.h-18,i=>({no:e.no===i}))}
/* ---------- 4. in order ---------- */
function pickStep(j){const o=S.od,s=MIX[j];if(o.n>=4||o.done.includes(s))return;
 if(s===o.n){o.done.push(s);o.n++;o.no=-1;o.st={base:o.n>=1,jam:o.n>=2,top:o.n>=3,eaten:o.n>=4};A.sound.pop();return say(o.n>=4?'Yum! The robot ate it.':`Step ${o.n}: done.`,false)}
 o.no=j;o.st=Object.assign({},o.st,{silly:D.SILLY_OF[s]});A.sound.miss();say(D.OOPS[s],true)}
function drawOrder(){const o=S.od,ok=o.n>=4,y0=P.strip(ok?D.DONE[3]:`Tap the steps in order. Next: step ${o.n+1}.`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 const r=stage(y0,.42);table(r,o.st);const gp=10,w=(A.W-16-gp)/2,hh=Math.min((A.H-r.y-r.h-18)/2-gp,90);
 CARDS=MIX.map((s,j)=>{const c2={i:j,x:8+(j%2)*(w+gp),y:r.y+r.h+10+Math.floor(j/2)*(hh+gp),w,h:hh},k=o.done.indexOf(s);P.card(c2,(k>=0?`${k+1}. `:'')+D.STEPS[s],{ok:k>=0,no:o.no===j});return c2})}
/* ---------- 5. build a whole instruction ---------- */
function tile(row,i){const b=S.bd;if(b.g>=D.GOALS.length)return;b.pick[row]=i;b.no=null;A.sound.tick();if(b.pick.every(x=>x!=null))go();else{say(`\u201C${words()}\u201D`,false)}}
const words=()=>S.bd.pick.map((x,r)=>x==null?'\u2026':D.ROWS[r][x]).join(' ');
function go(){const b=S.bd,G=D.GOALS[b.g],[v,t,p]=b.pick,said=words()+'.';
 if(v===G.w[0]&&t===G.w[1]&&p===G.w[2]){b.st=Object.assign({},G.did);b.g++;b.pick=[null,null,null];A.sound.pop();return say(`\u201C${said}\u201D The robot did it just right!${b.g<D.GOALS.length?' Now make: '+D.GOALS[b.g].t.toLowerCase()+'.':''}`,false)}
 const part=v!==G.w[0]?'doing word':t!==G.w[1]?'thing':'place';b.no=part;
 b.st=Object.assign({},b.st,{silly:p===2?'floor':t===1&&p===0?'platejam':v===0&&t===1?'jar':'none'});A.sound.miss();
 b.pick=[null,null,null];say(`The robot did just what you said: \u201C${said}\u201D We wanted ${G.t.toLowerCase()}. Change the ${part}.`,true)}
function drawBuild(){const b=S.bd,ok=b.g>=D.GOALS.length,G=D.GOALS[Math.min(b.g,D.GOALS.length-1)];
 const y0=P.strip(ok?D.DONE[4]:`Make: ${G.t.toLowerCase()} (${b.g+1} of 2). Tap a doing word, a thing and a place.`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 const r=stage(y0,.36);table(r,b.st);if(ok){CARDS=[];return}const top=r.y+r.h+10,gp=8,rh=Math.min((A.H-top-8)/3-gp,74);CARDS=[];
 D.ROWS.forEach((row,ri)=>{const w=(A.W-16-gp*(row.length-1))/row.length;row.forEach((t,i)=>{const c2={row:ri,i,x:8+i*(w+gp),y:top+ri*(rh+gp),w,h:rh};P.card(c2,t,{sel:b.pick[ri]===i,n:16});CARDS.push(c2)})})}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f0f9ff';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){const y0=P.strip('Challenge: clear instructions','ok');table(stage(y0,1),{base:1,jam:1,top:1});return}
 ({boss:drawBoss,kit:drawKit,exact:drawExact,order:drawOrder,build:drawBuild})[m]();A.fx.draw(g)}
function down(p){const m=mode(),r=CARDS.find(q=>on(p,q));if(!r)return false;
 if(m==='boss')pickBoss(r.i);if(m==='kit')pickKit(r.i);if(m==='exact')pickExact(r.i);if(m==='order')pickStep(r.i);if(m==='build')tile(r.row,r.i);return false}
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{bs:{i:0,no:-1,st:{}},kt:{got:[],no:-1},ex:{i:0,no:-1,st:{}},od:{n:0,done:[],no:-1,st:{}},bd:{g:0,pick:[null,null,null],no:null,st:{}},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
const watch=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=watch(i,ok);controls();A.redraw()}
function play(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='boss'&&S.bs.i<D.BOSS.length)bossOpts(S.bs.i).forEach(([t],j)=>B(t,()=>pickBoss(j),`Tell the robot: ${t}`));
 if(m==='kit')D.KIT.forEach((x,i)=>{if(!S.kt.got.includes(i))B(x.t,()=>pickKit(i),`We need: ${x.t}`)});
 if(m==='exact'&&S.ex.i<D.EXACT.length)exOpts(S.ex.i).forEach(([t],j)=>B(t,()=>pickExact(j),`Say: ${t}`));
 if(m==='order')MIX.forEach((s,j)=>{if(!S.od.done.includes(s)&&S.od.n<4)B(D.STEPS[s],()=>pickStep(j),`Next step: ${D.STEPS[s]}`)});
 if(m==='build'&&S.bd.g<D.GOALS.length)D.ROWS.forEach((row,ri)=>row.forEach((t,i)=>B(t,()=>tile(ri,i),`Choose: ${t}`)))}
const steps=[
{h:'Doing words',p:D.TXT[0],predict:{q:'Which one tells the robot what to do?',opts:['I like bread','Put the bread on the plate'],ans:1},task:'Tap the card that tells the robot what to do, 3 times',
 show:()=>play(0,D.BOSS.map((_,i)=>[600,()=>pickBoss(bossOpts(i).findIndex(x=>x[1]==='ok'))])),go:()=>begin(0,()=>S.bs.i>=D.BOSS.length)},
{h:'Get ready',p:D.TXT[1],task:'Find the 4 things we need',
 show:()=>play(1,D.KIT.map((x,i)=>x.ok?[450,()=>pickKit(i)]:null).filter(Boolean)),go:()=>begin(1,()=>S.kt.got.length>=4)},
{h:'Say it exactly',p:D.TXT[2],predict:{q:'You say \u201CPut it there.\u201D What will the robot do?',opts:['Put the bread on the plate','Not know what or where'],ans:1},task:'Pick the clear words 3 times',
 show:()=>play(2,D.EXACT.map((_,i)=>[650,()=>pickExact(exOpts(i).findIndex(x=>x[1]))])),go:()=>begin(2,()=>S.ex.i>=D.EXACT.length)},
{h:'Steps in order',p:D.TXT[3],predict:{q:'Can the steps go in any order?',opts:['Yes, any order','No, the robot does them in the order I say'],ans:1},task:'Tap the 4 steps in order',
 show:()=>play(3,[0,1,2,3].map(s=>[550,()=>pickStep(MIX.indexOf(s))])),go:()=>begin(3,()=>S.od.n>=4)},
{h:'Make it yourself',p:D.TXT[4],task:'Build 2 instructions the robot gets right',
 show:()=>play(4,D.GOALS.flatMap(G=>G.w.map((x,r)=>[450,()=>tile(r,x)]))),go:()=>begin(4,()=>S.bd.g>=D.GOALS.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Start with a doing word, say exactly what and where, and say the steps in order.';
 if(t==='like')m='\u201CI like bread\u201D says what you like. It does not tell the robot to do anything. Start with a doing word.';
 if(t==='ask')m='A question makes the robot wait. An instruction tells it what to do, with a doing word first.';
 if(t==='guess')m='A robot cannot guess. It does just what you say, so say what and where.';
 if(t==='need')m='Get ready only what the steps use: bread, jam, a spoon and a plate.';
 if(t==='order')m='Bread goes on the plate first. Jam next, then the top, and you eat it last.';
 if(t==='exact')m='\u201CPut jam on\u201D does not say how much or where. \u201CSpread jam on the bread\u201D does.';
 if(t==='fix')m='When the robot gets it wrong, find the step and fix the words. Say where to put the jam.';
 return m}
function ask(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function reply(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=D.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Robot instructions lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down});controls()}}).start()})})();
