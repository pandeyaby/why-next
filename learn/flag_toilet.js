/* Flagship – using the toilet by myself (ages 3-4; PSED Managing Self): listen for the body's 'I need to go' feeling
   and go while it is little (holding on ends in an accident), put the toilet steps in order (flush and pants up may
   swap, but washing and drying always come last), wipe from front to back with a drag, sort what can be flushed (only
   wee, poo and toilet paper), and choose what helps after an accident. Data and drawings: toilet_art.js. */
(()=>{const L=LOO;
VIS.reg('flagtoilet',c=>{let A,P,ctl,chal,qn=-1,run=0;const S={};c.fig.classList.add('young');
const MODES=['feel','order','wipe','flush','oops','quiz'],mode=()=>MODES[A.step];
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#f0f9ff';g.fillRect(0,0,A.W,A.H)}
function tell(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
/* ---- 1. the feeling meter ---- */
let PLAYC=null,LOOC=null;
const level=()=>{const f=S.fe,k=L.AT[f.r%L.AT.length];return Math.max(0,Math.min(3,f.p-k+1))};
function keepPlaying(){const f=S.fe;if(f.won>=3)return;f.p++;const v=level();
 if(v>=3){A.sound.miss();f.p=0;f.r++;return tell('Oops, too late: a little accident. That is OK, it happens. Next time, go when the feeling is little.',true)}
 A.sound.tick();tell(v===0?'Playing. No feeling yet.':v===1?'Your body says: I need to go! What do you do?':'The feeling is big now. Hurry!',v===2)}
function goToilet(){const f=S.fe;if(f.won>=3)return;const v=level();
 if(v===0){A.sound.miss();return tell('No feeling yet. Keep playing, and your body will tell you.',true)}
 f.won++;f.p=0;f.r++;A.sound.pop();tell((v===1?'Yes! You went as soon as you felt it.':'Just in time! Next time, go sooner, when the feeling is little.')+` ${f.won} of 3.`,false)}
function drawFeel(){const f=S.fe,y0=P.head(f.won>=3?L.DONE[0]:`Got there in time: ${f.won} of 3`,f.won>=3?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx,v=level();
 const gap=10,w=(A.W-16-gap*2)/3,h=Math.min(A.H-y0-14,w*1.25);PLAYC={x:8,y:y0+4,w,h};LOOC={x:8+2*(w+gap),y:y0+4,w,h};
 P.tile(PLAYC,'Keep playing',{pic:'play',n:15});P.tile(LOOC,'Go to the toilet',{pic:'toilet',n:15,sel:v>=1&&f.won<3});
 const mx=8+w+gap,mh=h-30,seg=(mh-12)/3;g.fillStyle=A.col.dark?'#0f172a':'#ffffff';A.paint.rrect(mx,y0+4,w,h,12);g.fill();g.strokeStyle=P.RIM;g.lineWidth=1.6;g.stroke();
 const cols=['#facc15','#f97316','#dc2626'];for(let i=0;i<3;i++){const yy=y0+8+mh-(i+1)*seg;g.fillStyle=i<v?cols[i]:(A.col.dark?'#334155':'#e2e8f0');A.paint.rrect(mx+w*.3,yy,w*.4,seg-4,6);g.fill()}
 g.fillStyle=P.fg();g.font=`800 ${P.sz(13)}${P.F}`;g.textAlign='center';g.textBaseline='middle';P.lines(L.LVL[v],w-10,g.font).slice(0,2).forEach((t,i)=>g.fillText(t,mx+w/2,y0+h-18+i*14-(P.lines(L.LVL[v],w-10,g.font).length>1?7:0)))}
/* ---- 2. steps in order ---- */
let CARDS=[];
function pick(k){const o=S.or;if(o.done.length>=7||o.done.includes(k))return;o.drag=null;const s=L.STEPS.find(z=>z.k===k);
 if(!s.need.every(n=>o.done.includes(n))){o.wrong=k;A.sound.miss();return tell(L.NEED[k],true)}
 o.done.push(k);o.wrong=null;A.sound.pop();tell(`${s.t}: yes!`+(o.done.length<7?' What comes next?':''),false)}
function drawOrder(){const o=S.or,y0=P.head(o.done.length>=7?L.DONE[1]:`Toilet steps: ${o.done.length} of 7 done`,o.done.length>=7?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const sw=(A.W-16)/7,sh=Math.min(sw,56);for(let i=0;i<7;i++){const k=o.done[i],x=8+i*sw;g.fillStyle=k?'#dcfce7':(A.col.dark?'#0f172a':'#ffffff');A.paint.rrect(x+2,y0,sw-4,sh,8);g.fill();g.strokeStyle=k?P.OK:P.RIM;g.lineWidth=1.4;g.stroke();
  if(k)L.icon(g,k,x+sw/2,y0+sh/2,Math.min(sw-10,sh-8));else{g.fillStyle=P.fg();g.font=`800 ${P.sz(16)}${P.F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),x+sw/2,y0+sh/2)}}
 const left=L.STEPS.filter(s=>!o.done.includes(s.k)),top=y0+sh+10,n=A.narrow?3:4,rows=Math.ceil(left.length/n),gap=8,cw=(A.W-16-gap*(n-1))/n,ch=Math.min((A.H-top-8-gap*(rows-1))/Math.max(1,rows),cw*1.05);
 CARDS=o.done.length>=7?[]:left.map((s,i)=>({k:s.k,t:s.t,x:8+(i%n)*(cw+gap),y:top+Math.floor(i/n)*(ch+gap),w:cw,h:ch}));
 CARDS.forEach(r=>{const d=o.drag&&o.drag.k===r.k?o.drag:null;P.tile(d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:r,r.t,{pic:r.k,n:13,no:o.wrong===r.k,sel:!!d})})}
/* ---- 3. wipe front to back ---- */
let TRACK=null;
function wipe(dir){const w=S.wi;if(w.n>=L.WIPES)return;w.drag=null;
 if(dir==='short'){A.sound.tick();return tell('Wipe all the way along the line.',false)}
 if(dir!=='ftb'){w.bad=1;A.sound.miss();return tell('That was back to front. Wipe from the front to the back, so germs from your bottom stay away from where wee comes out.',true)}
 w.n++;w.bad=0;A.sound.pop();tell(`Front to back: yes! Paper in the toilet, then a fresh piece. ${w.n} of ${L.WIPES}.`,false)}
function drawWipe(){const w=S.wi,y0=P.head(w.n>=L.WIPES?L.DONE[2]:`Wipe front to back: ${w.n} of ${L.WIPES}`,w.n>=L.WIPES?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const h=A.H-y0-12,bw=Math.min(A.W-16,h*1.5),bx=(A.W-bw)/2;g.fillStyle='#ffffff';A.paint.rrect(bx,y0+2,bw,h,14);g.fill();g.strokeStyle=P.RIM;g.lineWidth=1.6;g.stroke();
 const ty=y0+2+h-48,cx=bx+bw/2,cy=y0+2+(ty-y0)*.55;L.side(g,cx,cy,bw*.6,(ty-y0-10)*.8);const x0=bx+bw*.14,x1=bx+bw*.86;TRACK={x0,x1,y:ty,top:y0+2,bot:y0+2+h};
 g.strokeStyle='#1d4ed8';g.lineWidth=4;g.setLineDash([10,8]);g.beginPath();g.moveTo(x1,ty);g.lineTo(x0+16,ty);g.stroke();g.setLineDash([]);g.fillStyle='#1d4ed8';g.beginPath();g.moveTo(x0,ty);g.lineTo(x0+16,ty-9);g.lineTo(x0+16,ty+9);g.closePath();g.fill();
 g.fillStyle='#0f172a';g.font=`800 ${P.sz(15)}${P.F}`;g.textBaseline='top';g.textAlign='right';g.fillText(A.narrow?'Front':'Front (tummy)',x1,ty+16);g.textAlign='left';g.fillText(A.narrow?'Back':'Back (bottom)',x0,ty+16);
 const px=w.drag?w.drag.x:x1;g.fillStyle='#ffffff';g.strokeStyle='#0f172a';g.lineWidth=2;A.paint.rrect(px-18,ty-14,36,28,5);g.fill();g.stroke();
 for(let i=0;i<L.WIPES;i++){g.fillStyle=i<w.n?P.OK:'#cbd5e1';g.beginPath();g.arc(bx+18+i*20,y0+20,7,0,7);g.fill()}}
/* ---- 4. can it be flushed? ---- */
let BOX=[],ITEM=null;
function sortTo(z){const f=S.fl,it=L.PS[f.i];if(!it)return;f.drag=null;
 if(z!==it.ok){f.wrong=z;A.sound.miss();return tell(it.ok?`${it.t} can go down the toilet. Only wee, poo and toilet paper are flushed.`:it.why,true)}
 f.i++;f.wrong=-1;A.sound.pop();tell((it.ok?`Yes, ${it.t.toLowerCase()} goes down the toilet.`:`Yes, ${it.t.toLowerCase()} never goes down the toilet.`)+(f.i<L.PS.length?' Next one.':''),false)}
function drawFlush(){const f=S.fl,it=L.PS[f.i],y0=P.head(it?`${f.i+1} of ${L.PS.length}: down the toilet?`:L.DONE[3],it?(S.bad?'no':''):'ok',S.note,S.bad);
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.3,140),by=A.H-bh-8;BOX=[[1,'Down the toilet','toilet'],[0,'In the bin','bin']].map(([z,t,pic],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};P.tile(r,t,{pic,n:17,no:f.wrong===z});return r});
 if(it){const w=Math.min(A.W*.42,200),h=Math.min(by-y0-12,w*1.05),d=f.drag;ITEM={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+2,w,h};P.tile(ITEM,it.t,{pic:it.k,n:16,sel:!!d})}else ITEM=null}
/* ---- 5. after an accident ---- */
let HELPC=[];
function helpPick(j){const a=S.oo,it=L.OOPS[j];if(a.got>=4||a.used.includes(j))return;a.drag=null;
 if(!it.ok){a.wrong=j;A.sound.miss();return tell(it.why,true)}a.used.push(j);a.got++;a.wrong=-1;A.sound.pop();tell(`${it.t}: that helps. ${a.got} of 4.`,false)}
function drawOops(){const a=S.oo,y0=P.head(a.got>=4?L.DONE[4]:`After an accident: find 4 things that help (${a.got} of 4)`,a.got>=4?'ok':S.bad?'no':'',S.note,S.bad);
 const n=A.narrow?2:3,rows=Math.ceil(L.OOPS.length/n),gap=8,cw=(A.W-16-gap*(n-1))/n,ch=Math.min((A.H-y0-8-gap*(rows-1))/rows,cw*.95);
 HELPC=L.OOPS.map((it,j)=>({j,x:8+(j%n)*(cw+gap),y:y0+2+Math.floor(j/n)*(ch+gap),w:cw,h:ch}));
 HELPC.forEach(r=>P.tile(r,L.OOPS[r.j].t,{pic:L.OOPS[r.j].k,n:14,ok:a.used.includes(r.j),no:a.wrong===r.j}))}
/* ---- input ---- */
function down(p){const m=mode();
 if(m==='feel'){if(inside(p,PLAYC))keepPlaying();else if(inside(p,LOOC))goToilet();return false}
 if(m==='order'){const r=CARDS.find(r=>inside(p,r));if(r){S.or.drag={k:r.k,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(m==='wipe'&&TRACK&&p.y>TRACK.top&&p.y<TRACK.bot&&S.wi.n<L.WIPES){S.wi.drag={x:p.x,x0:p.x};return true}
 if(m==='flush'){if(ITEM&&inside(p,ITEM)){S.fl.drag={x:p.x,y:p.y};return true}const b=BOX.find(r=>inside(p,r));if(b)sortTo(b.z);return false}
 if(m==='oops'){const r=HELPC.find(r=>inside(p,r));if(r)helpPick(r.j);return false}return false}
function move(p){const m=mode(),d=m==='order'?S.or.drag:m==='wipe'?S.wi.drag:m==='flush'?S.fl.drag:null;if(!d)return;d.x=p.x;if('y' in d)d.y=p.y;A.redraw()}
function up(p){const m=mode();
 if(m==='order'&&S.or.drag){const d=S.or.drag;S.or.drag=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<=12||p.y<A.H*.35)pick(d.k);else{A.redraw();tell('Drop the card at the top, in the steps row.',false)}}
 if(m==='wipe'&&S.wi.drag){const d=S.wi.drag,len=TRACK.x1-TRACK.x0,dx=p.x-d.x0;S.wi.drag=null;wipe(Math.abs(dx)<len*.45?'short':dx<0?'ftb':'btf')}
 if(m==='flush'&&S.fl.drag){S.fl.drag=null;const b=BOX.find(r=>inside(p,r));if(b)sortTo(b.z);else{A.redraw();tell('Drop it in a box.',false)}}}
/* ---- steps, buttons, challenge ---- */
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{fe:{p:0,r:0,won:0},or:{done:[],wrong:null,drag:null},wi:{n:0,bad:0,drag:null},fl:{i:0,wrong:-1,drag:null},oo:{used:[],got:0,wrong:-1},note:null,bad:false,check:()=>{}})}
function begin(i,isDone){fresh();c.say(L.DESC[i]);A.cv.setAttribute('aria-label',L.DESC[i]);
 S.check=()=>{if(A.step===i&&isDone()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(L.DONE[i]+A.reveal(i))};controls();A.redraw()}
function demo(i,list){steps[i].go();const my=run;list.reduce((t,f)=>{setTimeout(()=>{if(my===run)f()},t);return t+430},430)}
function controls(){if(!ctl)return;ctl.innerHTML='';const m=mode(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);b.onclick=f};
 if(m==='feel'&&S.fe.won<3){add('Keep playing',keepPlaying);add('Go to the toilet',goToilet)}
 if(m==='order'&&S.or.done.length<7)L.STEPS.forEach(s=>{if(!S.or.done.includes(s.k))add(s.t,()=>pick(s.k),`Next step: ${s.t}`)});
 if(m==='wipe'&&S.wi.n<L.WIPES){add('Wipe front to back',()=>wipe('ftb'));add('Wipe back to front',()=>wipe('btf'))}
 if(m==='flush'&&L.PS[S.fl.i]){const it=L.PS[S.fl.i];add('Down the toilet',()=>sortTo(1),`${it.t}: down the toilet`);add('In the bin',()=>sortTo(0),`${it.t}: in the bin`)}
 if(m==='oops'&&S.oo.got<4)L.OOPS.forEach((it,j)=>{if(!S.oo.used.includes(j))add(it.t,()=>helpPick(j),`After an accident: ${it.t}`)})}
const steps=[
{h:'My body tells me',p:L.TXT[0],predict:{q:'You need a wee, but your game is fun. What do you do?',opts:['Finish the game first','Go now, then play again'],ans:1},task:'Get to the toilet in time, 3 times',
 show:()=>demo(0,[keepPlaying,keepPlaying,goToilet,keepPlaying,goToilet,keepPlaying,keepPlaying,keepPlaying,goToilet]),go:()=>begin(0,()=>S.fe.won>=3)},
{h:'Steps in order',p:L.TXT[1],predict:{q:'Your hands look clean after the toilet. Do you still wash them?',opts:['No, they look clean','Yes, every time'],ans:1},task:'Do all 7 steps in order',
 show:()=>demo(1,['down','sit','wipe','flush','up','wash','dry'].map(k=>()=>pick(k))),go:()=>begin(1,()=>S.or.done.length>=7)},
{h:'Front to back',p:L.TXT[2],predict:{q:'Which way do you wipe?',opts:['Back to front','Front to back'],ans:1},task:'Wipe front to back 3 times',
 show:()=>demo(2,[1,2,3].map(()=>()=>wipe('ftb'))),go:()=>begin(2,()=>S.wi.n>=L.WIPES)},
{h:'What goes down?',p:L.TXT[3],predict:{q:'Can a wet wipe go down the toilet?',opts:['Yes, it is like paper','No, it goes in the bin'],ans:1},task:'Sort all 6 things',
 show:()=>demo(3,L.PS.map(it=>()=>sortTo(it.ok))),go:()=>begin(3,()=>S.fl.i>=L.PS.length)},
{h:'Accidents happen',p:L.TXT[4],predict:{q:'You have an accident. Are you naughty?',opts:['Yes, I am naughty','No, accidents happen'],ans:1},task:'Find the 4 things that help',
 show:()=>demo(4,[0,2,4,5].map(j=>()=>helpPick(j))),go:()=>begin(4,()=>S.oo.got>=4)},
{h:'Challenge',p:'',go:()=>{fresh();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Look again at the toilet steps.';
 if(t==='hold')m='Go when you first feel it. Holding on until the game ends can mean an accident. The game can wait.';
 if(t==='order')m='Keep the order: pants down, sit, wipe, flush, pants up, wash, dry.';
 if(t==='germs')m='Wash your hands every time. Germs are too small to see, so clean-looking hands can still have germs.';
 if(t==='wipe')m='Wipe from the front to the back. That keeps germs from your bottom away.';
 if(t==='flush')m='Only wee, poo and toilet paper go down the toilet. Wipes, paper towels and toys block the pipes.';
 if(t==='hide')m='Accidents are not naughty. Tell a grown-up, then change into clean pants.';
 return m}
function nextQ(){qn++;const Q=L.QS[qn%L.QS.length],opts=[[Q.a,'ok'],...Q.o],sh=qn%3,list=opts.slice(sh).concat(opts.slice(0,sh));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');list.forEach(([t,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,t).onclick=()=>answer(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function answer(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),right=tag==='ok',m=right?`Yes: ${a}.`:slip(tag);
 if(right)A.win();else A.sound.miss();fb.innerHTML=(right?'✓ ':'✗ ')+m+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(m)}
function draw(){bg();const m=mode();if(m==='quiz'){P.head('Challenge: using the toilet','ok');const s=Math.min(A.W*.3,A.H*.5);L.icon(A.ctx,'toilet',A.W*.3,A.H*.6,s);L.icon(A.ctx,'wash',A.W*.7,A.H*.6,s);return}
 ({feel:drawFeel,order:drawOrder,wipe:drawWipe,flush:drawFlush,oops:drawOops})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;controls()},
 init:X=>{A=X;P=L.PEN(A);const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Toilet lab buttons'},box);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
