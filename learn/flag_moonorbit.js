/* Flagship – the Moon's orbit and why it has phases (ages 7-9; NGSS 5-ESS1-2, NC Year 5 Earth and space). Space is seen
   from above with sunlight from the left: switch the Sun off and the Moon goes dark (it only reflects sunlight); drag
   the Moon once round Earth and count about 29.5 days; watch a 'seen from Earth' window turn the same half-lit ball
   into new, half and full moons; tap eight Moons that are all half lit; test the Earth's-shadow idea; then put seven
   Moon shapes in order. Data and drawings: moonorbit_art.js. Not flagmoonph (observing the shapes, ages 6-7). */
(()=>{const M=MOB;
VIS.reg('flagmoonorbit',c=>{let A,P,pad,cq,qn=-1,run=0,drag=null;const K={};
const MODES=['light','orbit','see','half','shadow','order','quiz'],mode=()=>MODES[A.step];
let L=null;
/* layout: the view from above, plus a 'seen from Earth' window beside it (wide) or under it (phone) */
function frame(t,tone,win){const y0=P.banner(t,tone,K.note,K.bad),x=8,w=A.W-16,h=A.H-y0-8;let d,v=null;
 if(!win)d={x,y:y0,w,h};else if(!A.narrow&&w>h*1.35){d={x,y:y0,w:w*.66,h};v={x:x+w*.68,y:y0,w:w*.32,h}}else{d={x,y:y0,w,h:h*.73};v={x,y:y0+h*.75,w,h:h*.25}}
 const R=Math.max(30,Math.min(d.w*.36,d.h/2-Math.max(9,d.h*.05)-26)),cx=d.x+d.w*.54,cy=d.y+d.h/2;L={d,v,R,cx,cy,er:Math.max(14,R*.2),mr:Math.max(9,R*.12)};return L}
function space(on){const g=A.ctx,dk=A.col.dark,{d,R,cx,cy,er}=L;g.fillStyle=dk?'#020617':'#0f172a';A.paint.rrect(d.x,d.y,d.w,d.h,10);g.fill();
 M.sunlight(g,d.x+Math.max(16,R*.22)*2+12,d.y+8,d.h-16,on,true);M.sunDisc(g,d.x+Math.max(16,R*.22)+4,cy,Math.max(16,R*.22),on,dk);
 g.strokeStyle='#64748b';g.setLineDash([5,5]);g.lineWidth=1.3;g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();g.setLineDash([]);
 M.ball(g,cx,cy,er,'#38bdf8','#1e3a8a',on);P.tag('Earth',cx,cy+er+16,12)}
function moonAt(e,on,hl){const g=A.ctx,p=M.at(L.cx,L.cy,L.R,e);M.ball(g,p.x,p.y,L.mr,M.LIT,'#334155',on);if(hl){g.strokeStyle='#f472b6';g.lineWidth=3;g.beginPath();g.arc(p.x,p.y,L.mr+5,0,7);g.stroke()}return p}
function window_(e,on){const v=L.v;if(!v)return;const g=A.ctx,dk=A.col.dark;g.fillStyle=dk?'#1e293b':'#f1f5f9';A.paint.rrect(v.x,v.y,v.w,v.h,10);g.fill();g.strokeStyle=M.RIM;g.lineWidth=1.2;g.stroke();
 const wide=v.w>v.h*1.6,r=Math.min(v.h*(wide?.36:.26),v.w*.28),mx=wide?v.x+v.h*.5+6:v.x+v.w/2,my=wide?v.y+v.h/2:v.y+v.h*.45;
 g.fillStyle='#020617';g.beginPath();g.arc(mx,my,r+8,0,7);g.fill();if(e!=null)M.phase(g,mx,my,r,e,true,on);
 const tx=wide?(v.x+v.h+(v.w-v.h)/2):v.x+v.w/2;P.tag('Seen from Earth',tx,wide?v.y+v.h*.3:v.y+16,12);
 if(e!=null)P.tag(on===false?'dark: no sunlight':M.NAME[M.kind(e)],tx,wide?v.y+v.h*.68:my+r+20,12,'#f472b6')}
/* ---------- 1. no light of its own ---------- */
function sun(){const s=K.lt;s.on=!s.on;if(!s.on)s.off=true;A.sound.tick();say(s.on?'Sunlight is back. The Moon shines again because the light bounces off it.':'The Sun is off. The Moon has gone dark: it has no light of its own.',false)}
function tapMoon(){const s=K.lt;s.tapped=true;A.sound.pop();say(s.on?'The side facing the Sun is bright. The far side is in the dark, like night on Earth.':'With the Sun off, no side is lit. The Moon only shines with sunlight.',false)}
function drawLight(){const s=K.lt,ok=s.off&&s.on;frame(ok?M.DONE[0]:s.on?'Tap the Sun to switch it off.':'The Sun is off. Tap it to switch it on again.',ok?'ok':K.bad?'no':'',true);space(s.on);const p=moonAt(60,s.on);P.tag('Moon',p.x,p.y-L.mr-14,12);window_(60,s.on)}
/* ---------- 2. once round Earth ---------- */
function turn(days){const o=K.ob;o.cum=Math.max(0,Math.min(360,o.cum+days*M.DAY));A.sound.tick();report()}
function report(){const o=K.ob,dd=Math.round(o.cum/M.DAY*2)/2;say(dd>=29?`Day ${dd}: the Moon is back where it started. One trip round takes about 29 and a half days.`:`Day ${dd}. The Moon has gone ${Math.round(o.cum/3.6)}% of the way round.`,false)}
function drawOrbit(){const o=K.ob,dd=Math.round(o.cum/M.DAY*2)/2,ok=dd>=29;frame(ok?M.DONE[1]:`Day ${dd} of the trip. Move the Moon all the way round.`,ok?'ok':K.bad?'no':'',false);space(true);
 const g=A.ctx,{cx,cy,R}=L;g.strokeStyle='#f472b6';g.lineWidth=4;g.beginPath();g.arc(cx,cy,R,Math.PI,Math.PI-Math.min(o.cum,359.9)*Math.PI/180,true);g.stroke();
 const p=moonAt(o.cum,true,true);P.tag(`Day ${dd}`,p.x,p.y-L.mr-16,13,'#f472b6')}
/* ---------- 3. what we see from Earth ---------- */
function look(e){const s=K.se;s.e=M.norm(e);const k=M.kind(s.e),gk=k==='lq'?'fq':k;if(['new','fq','full'].includes(gk)&&!s.got.includes(gk))s.got.push(gk);A.sound.tick();
 say(`${M.NAME[k][0].toUpperCase()+M.NAME[k].slice(1)}: from Earth we see ${M.LOOK[k]}.`,false)}
function drawSee(){const s=K.se,ok=s.got.length>=3;frame(ok?M.DONE[2]:`Found: ${s.got.map(k=>M.NAME[k].split(' (')[0]).join(', ')||'nothing yet'}. Find a new moon, a half moon and a full moon.`,ok?'ok':K.bad?'no':'',true);
 space(true);const g=A.ctx,q=M.at(L.cx,L.cy,L.R,s.e);g.strokeStyle='#f472b6';g.setLineDash([3,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(L.cx,L.cy);g.lineTo(q.x,q.y);g.stroke();g.setLineDash([]);moonAt(s.e,true,true);window_(s.e,true)}
/* ---------- 4 and 5. eight Moons ---------- */
const E8=[0,45,90,135,180,225,270,315];
function eight(sel,shadow){space(true);const g=A.ctx,{cx,cy,er,d}=L;
 if(shadow){g.fillStyle='rgba(148,163,184,.28)';g.fillRect(cx,cy-er,d.x+d.w-cx,er*2);P.tag('Earth\u2019s shadow',Math.min(d.x+d.w-50,cx+L.R*.55),cy-er-12,11)}
 E8.forEach((e,i)=>{const p=moonAt(e,true,sel===i),o=M.at(cx,cy,L.R+L.mr+13,e);P.tag(String(i+1),o.x,o.y,11)})}
function pickHalf(i){const h=K.hf,e=E8[i],k=M.kind(e),gr=M.GROUP[k];h.sel=i;if(!h.got.includes(gr))h.got.push(gr);A.sound.pop();
 say(`Moon ${i+1}: the Sun lights half of it, like every Moon here. From Earth we see ${M.LOOK[k]}, a ${M.NAME[k].split(' (')[0]}.`,false)}
function drawHalf(){const h=K.hf,n=['crescent','half','gibbous'].filter(x=>h.got.includes(x)).length,ok=n>=3;frame(ok?M.DONE[3]:`Looked at: ${h.got.join(', ')||'none yet'}. Find a crescent, a half moon and a gibbous Moon.`,ok?'ok':K.bad?'no':'',true);eight(h.sel,false);window_(h.sel==null?null:E8[h.sel],true)}
function pickShadow(i){const s=K.sh,e=E8[i],k=M.kind(e);s.sel=i;
 if(k!=='full'){A.sound.miss();return say(`Not Moon ${i+1}. It is ${k==='new'?'on the Sun\u2019s side of Earth':'off to the side'}, nowhere near Earth\u2019s shadow. Its dark part is just its own night side.`,true)}
 s.found=true;A.sound.pop();say('Yes: Moon 5, the full moon, is the only one in line with the shadow, and its tilted path usually misses even that.',false)}
function drawShadow(){const s=K.sh;frame(s.found?M.DONE[4]:'Tap the Moon that Earth\u2019s shadow could reach.',s.found?'ok':K.bad?'no':'',true);eight(s.sel,true);window_(s.sel==null?null:E8[s.sel],true)}
/* ---------- 6. a month in order ---------- */
function card(j){const o=K.od;if(o.n>=7||o.done.includes(j))return;const want=M.ORD[o.n],got=M.ORD[M.SH[j]];
 if(got!==want){o.bad=j;A.sound.miss();
  if(got>180&&want<=180)return say(`Card ${M.LET[j]} is lit on the left, so it is shrinking. Shrinking Moons come after full moon.`,true);
  return say(want<=180?`Not yet. Card ${M.LET[j]} has more lit than the next night. Before full moon the lit part grows a little each night.`:`Not yet. After full moon the lit part shrinks a little each night, so pick the one with more lit first.`,true)}
 o.bad=null;o.done.push(j);o.n++;A.sound.pop();say(`Card ${M.LET[j]}: ${M.NAME[M.kind(got)]}, about day ${Math.round(got/M.DAY)}.`,false)}
function cards(){const g=A.ctx,{d}=L,cols=4,cw=d.w/cols,ch=d.h/2,dk=A.col.dark,o=K.od;
 M.SH.forEach((s,j)=>{const col=j%cols,row=Math.floor(j/cols),x=d.x+col*cw+(row?cw/2:0),y=d.y+row*ch,r=Math.min(cw,ch)*.26;
  g.fillStyle=o.done.includes(j)?(dk?'#14532d':'#dcfce7'):o.bad===j?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#f1f5f9');A.paint.rrect(x+4,y+4,cw-8,ch-8,10);g.fill();g.strokeStyle=M.RIM;g.lineWidth=1.2;g.stroke();
  g.fillStyle='#020617';g.beginPath();g.arc(x+cw/2,y+ch*.46,r+5,0,7);g.fill();M.phase(g,x+cw/2,y+ch*.46,r,M.ORD[s],true,true);
  const k=o.done.indexOf(j);P.tag(k>=0?`${M.LET[j]}: ${k+1}`:M.LET[j],x+cw/2,y+ch*.86,12,k>=0?M.OK:M.RIM)});return{cw,ch,cols}}
function drawOrder(){const o=K.od,ok=o.n>=7;frame(ok?M.DONE[5]:`In order: ${o.done.map(j=>M.LET[j]).join(' ')||'none yet'}. Tap the shape for the next night (${o.n+1} of 7).`,ok?'ok':K.bad?'no':'',false);cards()}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#1e293b':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){frame('Challenge: the Moon\u2019s orbit and phases','ok',true);space(true);moonAt(90,true);window_(90,true);return}
 ({light:drawLight,orbit:drawOrbit,see:drawSee,half:drawHalf,shadow:drawShadow,order:drawOrder})[m]();A.fx.draw(g)}
function angleAt(p){return M.norm(Math.atan2(L.cy-p.y,p.x-L.cx)*180/Math.PI-180)}
function down(p){if(!L)return false;const m=mode();
 if(m==='light'){if(p.x<L.d.x+L.d.w*.18)sun();else{const q=M.at(L.cx,L.cy,L.R,60);if(Math.hypot(p.x-q.x,p.y-q.y)<L.mr*2.4)tapMoon()}return false}
 if(m==='orbit'||m==='see'){const e=m==='orbit'?K.ob.cum:K.se.e,q=M.at(L.cx,L.cy,L.R,e);if(Math.hypot(p.x-q.x,p.y-q.y)<L.mr*2.6){drag={last:angleAt(p)};return true}return false}
 if(m==='half'||m==='shadow'){let best=-1,bd=L.mr*2.4;E8.forEach((e,i)=>{const q=M.at(L.cx,L.cy,L.R,e),dd=Math.hypot(p.x-q.x,p.y-q.y);if(dd<bd){bd=dd;best=i}});if(best>=0)(m==='half'?pickHalf:pickShadow)(best);return false}
 if(m==='order'){const cw=L.d.w/4,ch=L.d.h/2,row=p.y<L.d.y+ch?0:1,col=Math.floor((p.x-L.d.x-(row?cw/2:0))/cw),j=row*4+col;if(col>=0&&col<4&&j<7&&p.y>=L.d.y)card(j);return false}return false}
function move(p){if(!drag||!L)return;const a=angleAt(p);let dl=M.norm(a-drag.last+180)-180;drag.last=a;const m=mode();
 if(m==='orbit'){if(dl<0&&K.ob.cum<=0)return;K.ob.cum=Math.max(0,Math.min(360,K.ob.cum+dl));A.redraw()}else{K.se.e=M.norm(K.se.e+dl);A.redraw()}}
function up(){if(!drag)return;drag=null;if(mode()==='orbit')report();else look(K.se.e)}
function fresh(){run++;drag=null;for(const k in K)delete K[k];Object.assign(K,{lt:{on:true,off:false,tapped:false},ob:{cum:0},se:{e:30,got:[]},hf:{sel:null,got:[]},sh:{sel:null,found:false},od:{n:0,done:[],bad:null},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(M.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(M.DESC[i]);A.cv.setAttribute('aria-label',M.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},pad,t).onclick=f};
 if(m==='light'){Bt(K.lt.on?'Sun off':'Sun on',sun,K.lt.on?'Switch the Sun off':'Switch the Sun on');Bt('Look at the Moon',tapMoon,'Look at which side of the Moon is lit')}
 if(m==='orbit'){Bt('+1 day',()=>turn(1),'Move the Moon on 1 day');Bt('+1 week',()=>turn(7),'Move the Moon on 1 week');Bt('Back 1 day',()=>turn(-1),'Move the Moon back 1 day')}
 if(m==='see'){Bt('+1 day',()=>look(K.se.e+M.DAY),'Move the Moon on 1 day');Bt('+3 days',()=>look(K.se.e+3*M.DAY),'Move the Moon on 3 days');Bt('Back 1 day',()=>look(K.se.e-M.DAY),'Move the Moon back 1 day')}
 if(m==='half')E8.forEach((e,i)=>Bt(`Moon ${i+1}`,()=>pickHalf(i),`Look at Moon ${i+1} from Earth`));
 if(m==='shadow'&&!K.sh.found)E8.forEach((e,i)=>Bt(`Moon ${i+1}`,()=>pickShadow(i),`Can Earth's shadow reach Moon ${i+1}?`));
 if(m==='order'&&K.od.n<7)M.SH.forEach((s,j)=>{if(!K.od.done.includes(j))Bt(`Card ${M.LET[j]}`,()=>card(j),`Card ${M.LET[j]}: ${M.LOOK[M.kind(M.ORD[s])]}`)})}
const steps=[
{h:'Does the Moon make light?',p:M.TXT[0],predict:{q:'If the Sun switched off, would the Moon still shine?',opts:['yes, it makes its own light','no, it would go dark'],ans:1},task:'Switch the Sun off, then on again',
 show:()=>demo(0,[[500,sun],[900,sun]]),go:()=>begin(0,()=>K.lt.off&&K.lt.on)},
{h:'Once round Earth',p:M.TXT[1],task:'Move the Moon all the way round Earth',
 show:()=>demo(1,[[400,()=>turn(7)],[400,()=>turn(7)],[400,()=>turn(7)],[400,()=>turn(7)],[400,()=>turn(1)],[400,()=>turn(1)]]),go:()=>begin(1,()=>K.ob.cum/M.DAY>=28.9)},
{h:'Seen from Earth',p:M.TXT[2],predict:{q:'Where is the Moon when we see a full moon?',opts:['between Earth and the Sun','on the far side of Earth from the Sun'],ans:1},task:'Find a new moon, a half moon and a full moon',
 show:()=>demo(2,[[450,()=>look(0)],[600,()=>look(90)],[600,()=>look(180)]]),go:()=>begin(2,()=>K.se.got.length>=3)},
{h:'Always half lit',p:M.TXT[3],predict:{q:'When we see a thin crescent, how much of the Moon does the Sun light?',opts:['just the thin crescent','half of it, as always'],ans:1},task:'Look at a crescent, a half moon and a gibbous Moon',
 show:()=>demo(3,[[450,()=>pickHalf(1)],[600,()=>pickHalf(2)],[600,()=>pickHalf(3)]]),go:()=>begin(3,()=>['crescent','half','gibbous'].every(x=>K.hf.got.includes(x)))},
{h:'Is it Earth\u2019s shadow?',p:M.TXT[4],predict:{q:'Is a half moon caused by Earth\u2019s shadow?',opts:['yes, the shadow covers half','no, the shadow is not there'],ans:1},task:'Find the Moon that Earth\u2019s shadow could reach',
 show:()=>demo(4,[[450,()=>pickShadow(2)],[900,()=>pickShadow(4)]]),go:()=>begin(4,()=>K.sh.found)},
{h:'A month in order',p:M.TXT[5],task:'Put the seven shapes in order',
 show:()=>demo(5,M.ORD.map(e=>[300,()=>card(M.SH.indexOf(M.ORD.indexOf(e)))])),go:()=>begin(5,()=>K.od.n>=7)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='The Moon is a round ball, always half lit by the Sun. Its shape is how much of that lit half faces us.';
 if(t==='own')m='The Moon makes no light. It shines because sunlight bounces off it. Switch the Sun off and it goes dark.';
 if(t==='shadow')m='Earth\u2019s shadow points away from the Sun, so it could only reach a full moon. A half moon is the Moon\u2019s own night side.';
 if(t==='half')m='The Sun always lights half the Moon. At a crescent, most of that lit half faces away from Earth.';
 if(t==='where')m='At new moon the Moon is between Earth and the Sun, so its lit half faces away. At full moon it is on the far side of Earth, so the lit half faces us.';
 if(t==='time')m='It takes about 29 and a half days to go from new moon round to new moon again, about a month.';
 if(t==='side')m='After full moon the lit part shrinks each night and moves to the left side, until new moon.';
 if(t==='shape')m='The Moon never changes shape. It is always a round ball. Only the part of its lit half we can see changes.';
 return m}
function ask(){qn++;const Q=M.QS[qn%M.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function reply(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.62,tall:1.4,draw,onStep:X=>{cq.hidden=X.step!==6;pad.hidden=X.step===6;controls()},
 init:X=>{A=X;P=M.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Moon orbit lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
