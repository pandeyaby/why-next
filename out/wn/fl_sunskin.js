/* Flagship – staying safe in the sun (Personal & Social, Responsible Decision-Making, ages 6-7; DfE 2019 Health
   Education, NHS sun safety, WHO UV Index guide, EPA SunWise shadow rule). Drag the sun across a summer day and watch
   the child's shadow against a ruler as tall as the child (short shadow, strong UV: go to the shade); try clouds, a
   breeze and the pool while a heat meter falls and the UV meter stays up; drag a hat, a T-shirt and sunglasses onto the
   child (a cap, a vest top and a swimsuit leave skin bare); tap the bare skin to put sun cream on; then decide when to
   put more on. Distinct from flagsunsafe (looking at the Sun, eyes) and flagsun (sunlight warms things). Data and
   drawings: sunskin_art.js. */
(()=>{const K=SK;
VIS.reg('flagsunskin',c=>{let A,pad,chq,round=-1,ver=0,hold=null;const V={};c.fig.classList.add('young');
const PHASE=['shadow','cool','dress','cream','day','quiz'],ph=()=>PHASE[A.step];
const night=()=>A.col.dark,fg=()=>night()?'#f8fafc':K.INK,pt=n=>Math.round(A.narrow?n:n*1.1);
const inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
let TAPS=[],SUN=null,DROP=null,BODY=null;
const rotate=(ok,wr,k)=>{const L=[[ok,'ok'],...wr],s=(k+1)%L.length;return L.slice(s).concat(L.slice(0,s))};
/* message strip */
function strip(t,tone){const g=A.ctx,f=`800 ${pt(16)}${K.FONT}`;g.font=f;const R=K.wrap(g,t,A.W-34),lh=pt(16)*1.3,h=R.length*lh+14;
 g.fillStyle=tone==='ok'?(night()?'#14532d':'#dcfce7'):tone==='no'?(night()?'#7f1d1d':'#fee2e2'):(night()?'#0f172a':'#ffffff');K.rr(g,8,8,A.W-16,h,12);g.fill();g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?K.OK:tone==='no'?K.NO:K.RIM;g.stroke();
 g.fillStyle=fg();g.textAlign='left';g.textBaseline='top';R.forEach((r,i)=>g.fillText(r,17,15+i*lh));let y=h+12;const n=A.narrow?2:1;
 if(V.note){g.font=`700 ${pt(14)}${K.FONT}`;g.fillStyle=V.wrong?(night()?'#fca5a5':K.NO):(night()?'#86efac':K.OK);K.wrap(g,V.note,A.W-34).slice(0,n).forEach((r,i)=>g.fillText(r,17,y+i*pt(14)*1.3))}return y+n*pt(14)*1.3+6}
function tile(b,t,e,mark){const g=A.ctx;g.fillStyle=mark==='no'?'#fee2e2':mark==='ok'?'#dcfce7':'#ffffff';K.rr(g,b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=mark?4:1.8;g.strokeStyle=mark==='no'?K.NO:mark==='ok'?K.OK:K.RIM;g.stroke();
 if(e)K.emo(g,e,b.x+b.w/2,b.y+b.h*.36,Math.min(b.w,b.h)*.36);let n=pt(15),R;for(;;){g.font=`800 ${n}${K.FONT}`;R=K.wrap(g,t,b.w-12);if(R.length*n*1.2<=(e?b.h*.42:b.h-8)||n<=11)break;n--}
 g.fillStyle=K.INK;g.textAlign='center';g.textBaseline='middle';const cy=e?b.y+b.h*.76:b.y+b.h/2;R.forEach((s,i)=>g.fillText(s,b.x+b.w/2,cy+(i-(R.length-1)/2)*n*1.2))}
function cells(n,top,cols,maxH){const gap=9,rows=Math.ceil(n/cols),w=(A.W-16-gap*(cols-1))/cols,h=Math.max(46,Math.min((A.H-top-8)/rows-gap,maxH));return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- step 1: the shadow rule ---- */
function setT(t){const Z=V.sh;Z.t=Math.max(0,Math.min(1,t));Z.seen[K.uvWord(Z.t)]=1;A.redraw();buttons();V.goal()}
function toShade(on){const Z=V.sh;Z.shade=on;if(!on)return note('Out in the sun again.',false);
 if(K.uvWord(Z.t)!=='strong')return note(`At ${K.clock(Z.t)} your shadow is longer than you: the sun is lower and weaker. Shade is still nice, but find the time your shadow is short.`,false);
 A.sound.pop();note('Shadow shorter than you, so you went to the shade. That is the shadow rule!',false)}
function paintShadow(){const Z=V.sh,g=A.ctx,strong=K.uvWord(Z.t)==='strong',ok=strong&&Z.shade;
 const y0=strip(ok?K.DONE[0]:`${K.clock(Z.t)}: the UV is ${K.uvWord(Z.t)}. Drag the sun. Is your shadow shorter than you?`,ok?'ok':V.wrong?'no':''),r={x:8,y:y0,w:A.W-16,h:A.H-y0-8},base=r.y+r.h*.86;K.sky(g,r,night());
 const sx=r.x+r.w*(.08+.84*Z.t),sy=base-r.h*.12-(r.h*.62)*Math.sin(Math.PI*Z.t),sr=Math.min(r.w,r.h)*.06;K.sun(g,sx,sy,sr);SUN={x:sx,y:sy,r:sr*2.4};
 const tx=r.x+r.w*.8,kh=r.h*.3;K.tree(g,tx,base,r.h*.42);const kx=Z.shade?tx-r.w*.02:r.x+r.w*.42,len=Math.min(kh*3,kh*K.ratio(Z.t)),dir=sx<kx?1:-1;
 g.fillStyle=night()?'rgba(0,0,0,.8)':'rgba(15,23,42,.4)';g.beginPath();g.moveTo(kx-kh*.08,base);g.lineTo(kx+dir*len,base-kh*.03);g.lineTo(kx+dir*len,base+kh*.05);g.lineTo(kx+kh*.08,base+kh*.06);g.fill();
 if(!Z.shade){g.strokeStyle=night()?'#fde047':'#a16207';g.lineWidth=3;g.setLineDash([6,4]);g.beginPath();g.moveTo(kx,base+kh*.16);g.lineTo(kx+dir*kh,base+kh*.16);g.stroke();g.setLineDash([]);
  g.font=`700 ${pt(12)}${K.FONT}`;g.fillStyle=night()?'#fde047':'#713f12';g.textAlign=dir>0?'left':'right';g.textBaseline='top';g.fillText('as tall as you',kx+dir*4,base+kh*.2)}
 K.kid(g,kx,base,kh,{},[]);const m=`UV ${K.uvWord(Z.t)}`;g.font=`800 ${pt(14)}${K.FONT}`;const mw=g.measureText(m).width+18;g.fillStyle=strong?'#7e22ce':'#ffffff';K.rr(g,r.x+8,r.y+8,mw,pt(14)+12,9);g.fill();g.fillStyle=strong?'#ffffff':K.INK;g.textAlign='left';g.textBaseline='middle';g.fillText(m,r.x+17,r.y+14+pt(14)/2);
 TAPS=[{i:'shade',x:tx-r.h*.25,y:base-r.h*.65,w:r.h*.5,h:r.h*.65}]}
/* ---- step 2: cool is not the same as safe ---- */
function tryIt(i){const Z=V.co,x=K.TRY[i];Z.on=i;if(!Z.done.includes(i))Z.done.push(i);A.sound.tick();note(x.m,false)}
function paintCool(){const Z=V.co,g=A.ctx,all=Z.done.length>=3,x=Z.on<0?null:K.TRY[Z.on];const y0=strip(all?K.DONE[1]:`Try all 3 and watch the meters: ${Z.done.length} of 3.`,all?'ok':''),r={x:8,y:y0,w:A.W-16,h:A.H-y0-8};
 K.sky(g,r,night(),x&&x.k==='cloud');const base=r.y+r.h*.86,kh=r.h*.36,kx=r.x+r.w*.34,sx=r.x+r.w*.2,sy=r.y+r.h*.18;K.sun(g,sx,sy,Math.min(r.w,r.h)*.06);
 if(x&&x.k==='cloud'){K.cloud(g,sx+r.w*.06,sy+r.h*.04,r.h*.14,night());K.cloud(g,r.x+r.w*.55,r.y+r.h*.15,r.h*.1,night())}
 if(x&&x.k==='pool'){g.fillStyle='#38bdf8';K.rr(g,kx-kh*.55,base-kh*.42,kh*1.1,kh*.5,8);g.fill()}
 K.kid(g,kx,base,kh,{},[]);if(x&&x.k==='wind'){g.strokeStyle=night()?'#e2e8f0':'#475569';g.lineWidth=2.5;for(let k=0;k<3;k++){g.beginPath();g.moveTo(kx+kh*.5,base-kh*(.8-k*.2));g.quadraticCurveTo(kx+kh*.8,base-kh*(.9-k*.2),kx+kh*1.1,base-kh*(.8-k*.2));g.stroke()}}
 const uv=x?x.uv:1,heat=x?x.heat:1;for(let k=0;k<Math.round(9*uv);k++){const px=sx+(kx-sx)*(k+1)/10,py=sy+(base-kh*.9-sy)*(k+1)/10;g.fillStyle='#a855f7';g.beginPath();g.arc(px,py,4,0,7);g.fill()}
 [['Hot',heat,'#ef4444'],['UV',uv,'#7e22ce']].forEach(([lab,v,col],j)=>{const mx=r.x+r.w*(.68+j*.15),mh=r.h*.5,my=r.y+r.h*.18;g.fillStyle=night()?'#334155':'#ffffff';K.rr(g,mx,my,r.w*.09,mh,8);g.fill();g.strokeStyle=K.RIM;g.lineWidth=1.5;g.stroke();
  g.fillStyle=col;K.rr(g,mx+3,my+mh*(1-v)+3,r.w*.09-6,mh*v-6,6);g.fill();g.font=`800 ${pt(14)}${K.FONT}`;g.fillStyle=fg();g.textAlign='center';g.textBaseline='top';g.fillText(lab,mx+r.w*.045,my+mh+6)});
 TAPS=[]}
/* ---- step 3: drag clothes onto the child ---- */
function wear(i){const Z=V.dr,x=K.WEAR[i];if(Z.on.includes(i))return;if(!x.ok){Z.miss=i;A.sound.miss();return note(slip(x.k),true)}
 Z.on.push(i);Z.miss=-1;A.sound.pop();note(Z.on.length>=3?'Covered up!':`${x.t}: good. ${Z.on.length} of 3.`,false)}
function paintDress(){const Z=V.dr,g=A.ctx,all=Z.on.length>=3,y0=strip(all?K.DONE[2]:`Drag 3 things that protect you onto the child: ${Z.on.length} of 3.`,all?'ok':V.wrong?'no':''),bw=A.narrow?A.W*.36:A.W*.3;
 const box={x:8,y:y0,w:bw,h:A.H-y0-8};g.fillStyle=night()?'#1e293b':'#e0f2fe';K.rr(g,box.x,box.y,box.w,box.h,14);g.fill();BODY=box;const w={};Z.on.forEach(i=>w[K.WEAR[i].on]=1);K.kid(g,box.x+box.w/2,box.y+box.h*.92,Math.min(box.h*.8,box.w*2),w,[]);
 TAPS=cellsIn(6,{x:box.x+box.w+8,y:y0,w:A.W-box.w-24,h:A.H-y0-8},2);TAPS.forEach((b,i)=>{if(Z.on.includes(i))return;const at=hold&&hold.i===i?{...b,x:hold.x-b.w/2,y:hold.y-b.h/2}:b;tile(at,K.WEAR[i].t,K.WEAR[i].e,Z.miss===i?'no':'')})}
function cellsIn(n,r,cols){const gap=8,rows=Math.ceil(n/cols),w=(r.w-gap*(cols-1))/cols,h=Math.min((r.h-gap*(rows-1))/rows,120);return Array.from({length:n},(_,i)=>({i,x:r.x+(i%cols)*(w+gap),y:r.y+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- step 4: sun cream on bare skin ---- */
function dab(k){const Z=V.cr;if(Z.got.includes(k))return;Z.got.push(k);A.sound.pop();const s=K.SPOTS.find(p=>p.k===k);note(Z.got.length>=5?'Every bare patch has sun cream.':`${s.t}: done. ${Z.got.length} of 5.`,false)}
function paintCream(){const Z=V.cr,g=A.ctx,all=Z.got.length>=5,y0=strip(all?K.DONE[3]:`Tap the bare skin to put sun cream on: ${Z.got.length} of 5.`,all?'ok':V.wrong?'no':''),r={x:8,y:y0,w:A.W-16,h:A.H-y0-8};
 g.fillStyle=night()?'#1e293b':'#e0f2fe';K.rr(g,r.x,r.y,r.w,r.h,14);g.fill();const kh=Math.min(r.h*.9,r.w*1.6),kx=r.x+r.w/2,base=r.y+r.h*.96,top=base-kh,u=kh/10;K.kid(g,kx,base,kh,{hat:1,top:1,specs:1},Z.got);
 const at=p=>({x:kx+(p.x-.5)*u*4.4,y:top+p.y*kh});TAPS=K.SPOTS.map(p=>{const q=at(p),s=Math.max(22,u*.9);return{i:p.k,x:q.x-s,y:q.y-s,w:2*s,h:2*s}}).concat(K.COVERED.map(p=>{const q=at(p),s=u*1.1;return{i:'cov:'+p.t,x:q.x-s,y:q.y-s*.6,w:2*s,h:1.2*s}}));
 K.SPOTS.forEach(p=>{if(Z.got.includes(p.k))return;const q=at(p);g.strokeStyle=night()?'#fde047':'#b45309';g.lineWidth=2.5;g.setLineDash([4,3]);g.beginPath();g.arc(q.x,q.y,Math.max(14,u*.6),0,7);g.stroke();g.setLineDash([])})}
/* ---- step 5: through the day ---- */
function pick(j){const Z=V.dy;if(Z.k>=3||Z.wait)return;const R=K.DAY[Z.k],[,tag]=rotate(R.ok,R.o,Z.k)[j];if(tag!=='ok'){Z.miss=j;A.sound.miss();return note(slip(tag),true)}
 Z.miss=-1;Z.wait=true;A.sound.pop();note(`Yes: ${R.ok}.`,false);const v0=ver;setTimeout(()=>{if(v0!==ver)return;Z.wait=false;Z.k++;note(Z.k>=3?'A safe day in the sun!':'Later that day...',false)},750)}
function paintDay(){const Z=V.dy,g=A.ctx,all=Z.k>=3,R=K.DAY[Math.min(Z.k,2)],y0=strip(all?K.DONE[4]:`${R.at}. ${R.cue} (${Z.k+1} of 3)`,all?'ok':V.wrong?'no':''),r={x:8,y:y0,w:A.W-16,h:(A.H-y0)*.46};
 K.sky(g,r,night());K.sun(g,r.x+r.w*.5,r.y+r.h*.25,Math.min(r.w,r.h)*.09);g.fillStyle='#38bdf8';K.rr(g,r.x+r.w*.06,r.y+r.h*.8,r.w*.4,r.h*.16,6);g.fill();K.kid(g,r.x+r.w*.62,r.y+r.h*.95,r.h*.62,{hat:1,top:1,specs:1},[]);
 const lvl=all?1:Z.wait?1:R.cream;g.fillStyle=night()?'#334155':'#ffffff';K.rr(g,r.x+r.w*.78,r.y+r.h*.12,r.w*.18,r.h*.2,6);g.fill();g.fillStyle=lvl<.5?'#dc2626':'#0891b2';K.rr(g,r.x+r.w*.78+3,r.y+r.h*.12+3,(r.w*.18-6)*lvl,r.h*.2-6,4);g.fill();
 g.font=`800 ${pt(12)}${K.FONT}`;g.fillStyle=fg();g.textAlign='center';g.textBaseline='top';g.fillText('sun cream',r.x+r.w*.87,r.y+r.h*.35);
 if(all){TAPS=[];return}const opts=rotate(R.ok,R.o,Z.k);TAPS=cells(3,r.y+r.h+10,A.narrow?1:3,80);TAPS.forEach((b,i)=>tile(b,opts[i][0],null,Z.miss===i?'no':''))}
/* ---- wiring ---- */
const PAINT={shadow:paintShadow,cool:paintCool,dress:paintDress,cream:paintCream,day:paintDay};
function draw(){const g=A.ctx;g.fillStyle=night()?'#0f172a':'#f0f9ff';g.fillRect(0,0,A.W,A.H);if(ph()==='quiz'){const y0=strip('Challenge: safe in the sun','ok'),r={x:8,y:y0,w:A.W-16,h:A.H-y0-8};K.sky(g,r,night());K.sun(g,r.x+r.w*.2,r.y+r.h*.2,r.h*.08);K.kid(g,r.x+r.w*.55,r.y+r.h*.9,r.h*.6,{hat:1,top:1,specs:1},K.SPOTS.map(s=>s.k));return}PAINT[ph()]();A.fx.draw(g)}
function down(p){const m=ph();if(m==='shadow'){if(SUN&&Math.hypot(p.x-SUN.x,p.y-SUN.y)<SUN.r){hold={sun:1};return true}if(inside(p,TAPS[0]))toShade(!V.sh.shade);return false}
 if(m==='dress'){const b=TAPS.find(q=>inside(p,q)&&!V.dr.on.includes(q.i));if(b){hold={i:b.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(m==='cream'){const b=TAPS.find(q=>inside(p,q));if(!b)return false;if(String(b.i).startsWith('cov:')){A.sound.miss();note(slip('covered'),true)}else dab(b.i);return false}
 if(m==='day'){const b=TAPS.find(q=>inside(p,q));if(b)pick(b.i)}return false}
function move(p){if(!hold)return;if(hold.sun){const r=A.W-16;setT((p.x-8-r*.08)/(r*.84));return}hold.x=p.x;hold.y=p.y;A.redraw()}
function up(p){if(!hold)return;const h=hold;hold=null;if(h.sun){note(`${K.clock(V.sh.t)}: shadow ${K.ratio(V.sh.t)<1?'shorter':'longer'} than you.`,false);return}
 if(inside(p,BODY)||Math.hypot(p.x-h.x0,p.y-h.y0)<10)wear(h.i);else A.redraw()}
function fresh(){ver++;hold=null;for(const k in V)delete V[k];Object.assign(V,{sh:{t:.1,shade:false,seen:{}},co:{on:-1,done:[]},dr:{on:[],miss:-1},cr:{got:[]},dy:{k:0,miss:-1,wait:false},note:null,wrong:false,goal:()=>{}})}
function note(t,bad){V.note=t;V.wrong=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();V.goal()}
function open(i,met){fresh();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);V.goal=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function demo(i,list,gap){steps[i].go();const v0=ver;list.reduce((t,f)=>{t+=gap;setTimeout(()=>{if(v0===ver)f()},t);return t},0)}
function buttons(){if(!pad)return;pad.innerHTML='';const m=ph(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='shadow'){b('\u2190 Earlier',()=>{setT(V.sh.t-.1);note(`${K.clock(V.sh.t)}: the UV is ${K.uvWord(V.sh.t)}.`,false)},'Move the sun earlier in the day');b('Later \u2192',()=>{setT(V.sh.t+.1);note(`${K.clock(V.sh.t)}: the UV is ${K.uvWord(V.sh.t)}.`,false)},'Move the sun later in the day');b(V.sh.shade?'Back out in the sun':'Go into the shade',()=>toShade(!V.sh.shade))}
 if(m==='cool')K.TRY.forEach((x,i)=>b(x.t,()=>tryIt(i)));
 if(m==='dress'&&V.dr.on.length<3)K.WEAR.forEach((x,i)=>{if(!V.dr.on.includes(i))b(x.t,()=>wear(i),`Put on: ${x.t}`)});
 if(m==='cream'&&V.cr.got.length<5){K.SPOTS.forEach(s=>{if(!V.cr.got.includes(s.k))b(s.t,()=>dab(s.k),`Sun cream on: ${s.t}`)});b('T-shirt',()=>{A.sound.miss();note(slip('covered'),true)},'Sun cream on the T-shirt')}
 if(m==='day'&&V.dy.k<3){const R=K.DAY[V.dy.k];rotate(R.ok,R.o,V.dy.k).forEach(([t],j)=>b(t,()=>pick(j),`${R.at}: ${t}`))}}
const steps=[
{h:'The shadow rule',p:K.TXT[0],predict:{q:'When is the sun strongest?',opts:['In the morning, when the sun is low','In the middle of the day, when your shadow is short'],ans:1},task:'Find when your shadow is shorter than you, then go to the shade',
 show:()=>demo(0,[()=>setT(.3),()=>setT(.45),()=>toShade(true)],700),go:()=>open(0,()=>K.uvWord(V.sh.t)==='strong'&&V.sh.shade)},
{h:'Cool but not safe',p:K.TXT[1],predict:{q:'It is cloudy and cool. Can your skin still burn?',opts:['No, it is not hot','Yes, UV still gets through'],ans:1},task:'Try clouds, a breeze and the pool',
 show:()=>demo(1,[0,1,2].map(i=>()=>tryIt(i)),900),go:()=>open(1,()=>V.co.done.length>=3)},
{h:'Cover up',p:K.TXT[2],task:'Drag 3 things that protect you onto the child',show:()=>demo(2,K.WEAR.map((x,i)=>x.ok?()=>wear(i):null).filter(Boolean),700),go:()=>open(2,()=>V.dr.on.length>=3)},
{h:'Sun cream',p:K.TXT[3],task:'Put sun cream on 5 bare patches',show:()=>demo(3,K.SPOTS.map(s=>()=>dab(s.k)),500),go:()=>open(3,()=>V.cr.got.length>=5)},
{h:'Put more on',p:K.TXT[4],predict:{q:'Sun cream went on at 10. You swim and dry with a towel. Is it still working well?',opts:['Yes, it lasts all day','No, put more on'],ans:1},task:'Choose what to do 3 times',
 show:()=>demo(4,K.DAY.map((R,k)=>()=>pick(rotate(R.ok,R.o,k).findIndex(x=>x[1]==='ok'))),1000),go:()=>open(4,()=>V.dy.k>=3)},
{h:'Challenge',p:'',go:()=>{fresh();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.goal()});
/* the reply names each slip */
function slip(tag){let m='Shade when your shadow is short, cover up, sun cream on bare skin, and put more on.';
 if(tag==='cool')m='Feeling cool does not mean safe. UV, not heat, burns skin, and it gets through clouds and breezes.';
 if(tag==='cap')m='A cap shades your face but leaves your ears and neck in the sun. Pick a wide brim.';
 if(tag==='vest')m='A vest top leaves your shoulders bare, and shoulders burn fast. Pick sleeves.';
 if(tag==='swim')m='A swimsuit leaves lots of skin bare. Cover up with a T-shirt when you are out of the water.';
 if(tag==='covered')m='Clothes already cover that skin. Sun cream goes on the bare skin.';
 if(tag==='wait'||tag==='allday')m='Sun cream wears off. Put more on every 2 hours, and after swimming or drying with a towel.';
 if(tag==='face')m='The face is only one patch. Ears, neck, arms, legs and feet need it too.';
 if(tag==='hatonly')m='A hat helps, but it does not cover your arms and legs. Put more sun cream on too.';
 if(tag==='sunrun'||tag==='dry')m='When your shadow is short, rest in the shade and drink water now, not later.';
 return m}
function quizNext(){round++;const Q=K.QS[round%K.QS.length],opts=rotate(Q.a,Q.o,round);
 chq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chq.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),good=t==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quizNext;c.say(good?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:X=>{chq.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sun safety lab buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
