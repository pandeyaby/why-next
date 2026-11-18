/* Flagship: free fall (ages 14–16; NGSS HS-PS2-1; AQA GCSE Physics 4.5.6: acceleration of free fall g ≈ 9.8 m/s²,
   W = mg, F = ma). Drop two balls, a hammer and a feather in air and on the airless Moon, change the mass and watch a = W ÷ m
   stay 9.8, read the speed each second, then drag g until a line fits Moon drop data. Every drag or tap has a button. */
(()=>{
const G=9.8,GM=1.6,HM=2;
VIS.reg('flagfreefall',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',EDGE='#94a3b8',WHITE='#ffffff',GOOD='#047857',BAD='#b91c1c',NAVY='#1e3a8a',NOTE='#eef2ff',WON='#dcfce7',SKY='#e0f2fe',MOON='#e7e5e4',BALL='#1d4ed8',BALL2='#d97706',KNOB='#b45309';
const MODE=['balls','vac','mass','speed','moon','chal'],mode=()=>MODE[A.step];
const z=n=>Math.round(n*(A.narrow?1:1.1)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
function txt(s,x,y,n,col,al){Z.font=font(n);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-14)}
function wrap(s,max,n){Z.font=font(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw,rad){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?9:rad);Z.fill();if(edge){Z.strokeStyle=edge;Z.lineWidth=lw||2;Z.stroke()}}
function boxText(r,s,n,col){const L=wrap(s,r.w-12,n),lh=z(n)+4;L.forEach((l,i)=>txt(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function banner(s,ok){const r={x:10,y:8,w:A.W-20,h:A.H*(A.narrow?.1:.12)};box(r,ok?WON:NOTE,ok?GOOD:NAVY,2);boxText(r,s,13,ok?GOOD:INK)}
function note(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},WHITE,S.bad?BAD:GOOD,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const scene=()=>A.narrow?{x:14,y:A.H*.14,w:A.W-28,h:A.H*.52}:{x:16,y:A.H*.17,w:A.W*.58,h:A.H*.6};
const side=(lines)=>{const s=scene(),r=A.narrow?{x:14,y:s.y+s.h+8,w:A.W-28,h:z(20)*lines.length+10}:{x:A.W*.63,y:A.H*.17,w:A.W*.34,h:z(20)*lines.length+10};box(r,'#f8fafc',EDGE,2);lines.forEach((t,i)=>txt(t,r.x+r.w/2,r.y+5+z(20)*(i+.5),12));return r};
/* a drop from HM metres: object k distance fallen after time t */
function fallen(k,t){if(k==='feather'&&S.air)return Math.min(HM,.4*t);const g=S.air?G:GM;return Math.min(HM,.5*g*t*t)}
function drawDrop(objs){const s=scene();Z.fillStyle=S.air?SKY:'#1e293b';Z.fillRect(s.x,s.y,s.w,s.h);const gy=s.y+s.h-z(18);Z.fillStyle=S.air?'#86efac':MOON;Z.fillRect(s.x,gy,s.w,s.y+s.h-gy);
 txt(S.air?'Earth, in air':'Moon, no air',s.x+8,gy+(s.y+s.h-gy)/2,11,INK,'left');const top=s.y+z(34),span=gy-top;
 objs.forEach((o,j)=>{const x=s.x+s.w*(j?.7:.3),d=fallen(o.k,S.ft),y=top+span*d/HM;Z.fillStyle=o.col;
  if(o.k==='feather'){Z.save();Z.translate(x,y-z(8));Z.rotate(Math.sin(S.ft*4)*.4);Z.beginPath();Z.ellipse(0,0,z(5),z(14),0,0,7);Z.fill();Z.restore()}
  else if(o.k==='hammer'){Z.fillRect(x-z(3),y-z(26),z(6),z(22));Z.fillRect(x-z(12),y-z(10),z(24),z(10))}
  else{Z.beginPath();Z.arc(x,y-o.r,o.r,0,7);Z.fill()}
  txt(o.t,x,s.y+z(12),11,S.air?INK:WHITE)});
 txt(`t = ${S.ft.toFixed(2)} s`,s.x+s.w-8,gy+(s.y+s.h-gy)/2,11,INK,'right')}
const BALLS=[{k:'bowl',t:'7 kg ball',col:BALL,r:14},{k:'tennis',t:'58 g ball',col:BALL2,r:7}];
const HF=[{k:'hammer',t:'Hammer',col:'#334155'},{k:'feather',t:'Feather',col:'#d97706'}];
function drop(air){S.air=air;S.ft=0;S.falling=true;S.landed=false;A.sound.whoosh();S.msg='';refresh()}
function tick(dt){if(!S.falling)return false;S.ft+=dt*(A.reduced()?20:1);const hd=fallen('hammer',S.ft)>=HM;
 if(hd&&!S.landed){S.landed=true;landed()}if(fallen('feather',S.ft)>=HM&&hd||S.ft>6){S.falling=false}return true}
function landed(){const m=mode(),t=Math.sqrt(2*HM/(S.air?G:GM)).toFixed(2);
 if(m==='balls'){S.done0=true;right(`Both landed together after ${t} s. A heavier ball does not fall faster.`)}
 if(m==='vac'){S.seen[S.air?'air':'vac']=1;right(S.air?'The hammer landed first. Air pushes up on the feather\'s large, light surface, so it drifts.':`No air on the Moon: hammer and feather land together after ${t} s, as on Apollo 15 in 1971.`)}refresh()}
/* step 3: mass slider */
const MMAX=10;function trk(){const s=scene();return A.narrow?{x1:A.W*.14,x2:A.W*.86,y:s.y+s.h-z(14)}:{x1:s.x+z(30),x2:s.x+s.w-z(30),y:s.y+s.h-z(14)}}
function slider(v,min,max,lab){const T=trk(),u=(v-min)/(max-min);Z.strokeStyle=EDGE;Z.lineWidth=6;Z.lineCap='round';Z.beginPath();Z.moveTo(T.x1,T.y);Z.lineTo(T.x2,T.y);Z.stroke();Z.lineCap='butt';
 const kx=T.x1+(T.x2-T.x1)*u;Z.fillStyle=KNOB;Z.beginPath();Z.arc(kx,T.y,z(13),0,7);Z.fill();Z.strokeStyle=WHITE;Z.lineWidth=3;Z.stroke();txt(lab,(T.x1+T.x2)/2,T.y-z(22),12)}
function drawMass(){const ok=S.tried.size>=3,m=S.m,W=m*G,s=scene();banner(ok?'Bigger mass, bigger weight, same a: W ÷ m = 9.8 m/s² every time.':'Drag the knob to change the mass. Watch both bars.',ok);
 const bx=s.x+s.w*.18,bw=s.w*.22,base=s.y+s.h-z(60),top=s.y+z(28),sc=(base-top)/(MMAX*G);
 [[W,'Weight W = m × g',`${W.toFixed(1)} N`,BALL],[G,'Acceleration a = W ÷ m',`${G.toFixed(1)} m/s²`,BALL2]].forEach(([v,l,vl,col],j)=>{const x=bx+j*s.w*.42,h=j?(base-top)*.45:v*sc;Z.fillStyle=col;Z.fillRect(x,base-h,bw,h);Z.strokeStyle=INK;Z.lineWidth=2;Z.strokeRect(x,base-h,bw,h);txt(vl,x+bw/2,base-h-z(10),13);txt(l,x+bw/2,base+z(12),11)});
 slider(m,1,MMAX,`Mass ${m} kg`);side([`m = ${m} kg`,`W = ${m} × 9.8 = ${W.toFixed(1)} N`,`a = ${W.toFixed(1)} ÷ ${m} = 9.8 m/s²`])}
function setM(v){const nv=Math.max(1,Math.min(MMAX,Math.round(v)));if(nv!==S.m){S.m=nv;A.sound.tick()}S.tried.add(S.m);
 if(S.tried.size>=3)right(`Masses tried: ${[...S.tried].join(', ')} kg. The weight changed each time; the acceleration stayed 9.8 m/s².`);else{S.bad=false;S.msg=`${S.m} kg: weight ${(S.m*G).toFixed(1)} N, acceleration 9.8 m/s².`}refresh()}
/* step 4: speed each second */
function drawSpeed(){const ok=S.sec>=4,s=scene();banner(ok?'Speed rises 9.8 m/s each second, so each second covers more distance.':'Tap Next second to follow a dropped stone (no air resistance).',ok);
 Z.fillStyle=SKY;Z.fillRect(s.x,s.y,s.w*.4,s.h);const top=s.y+z(14),sc=(s.h-z(26))/(4.9*16);
 for(let t=0;t<=S.sec;t++){const y=top+4.9*t*t*sc,x=s.x+s.w*.2;Z.fillStyle=BALL;Z.globalAlpha=t===S.sec?1:.45;Z.beginPath();Z.arc(x,y,z(7),0,7);Z.fill();Z.globalAlpha=1;if(t!==1)txt(`${t} s`,x+z(14),y,11,INK,'left')}
 const tx=s.x+s.w*.46,rw=(s.w*.54)/3;['Time','Speed','Fallen'].forEach((h,j)=>txt(h,tx+rw*(j+.5),s.y+z(12),12,NAVY));
 for(let t=0;t<=4;t++){const y=s.y+z(36)+t*z(26);const v=(G*t).toFixed(1),d=(4.9*t*t).toFixed(1);[`${t} s`,t<=S.sec?`${v} m/s`:'?',t<=S.sec?`${d} m`:'?'].forEach((v2,j)=>txt(v2,tx+rw*(j+.5),y,12))}}
function nextSec(){if(S.sec>=4)return;S.sec++;A.sound.tick();if(S.sec>=4)right('After 4 s: 4 × 9.8 = 39.2 m/s. The distance is ½ × 9.8 × 4² = 78.4 m: each second it covers more ground than the last.');else{S.bad=false;S.msg=`After ${S.sec} s the speed is ${S.sec} × 9.8 = ${(G*S.sec).toFixed(1)} m/s.`}refresh()}
/* step 5: fit g to Moon data */
const DATA=[[1,1.6],[2,3.2],[3,4.8]];function drawMoon(){const ok=Math.abs(S.g-GM)<.01,s=scene();banner(ok?'Moon g ≈ 1.6 m/s²: the speed rises 1.6 m/s each second.':'Drag the knob until the line goes through the 3 Moon points.',ok);
 const ox=s.x+z(34),oy=s.y+s.h-z(64),gw=s.w-z(50),gh=oy-s.y-z(14),X=t=>ox+t/4*gw,Yv=v=>oy-v/12*gh;Z.strokeStyle=INK;Z.lineWidth=2;Z.beginPath();Z.moveTo(ox,s.y+z(10));Z.lineTo(ox,oy);Z.lineTo(ox+gw,oy);Z.stroke();
 for(let v=0;v<=12;v+=4)txt(v,ox-z(12),Yv(v),11,SOFT);for(let t=0;t<=4;t++)txt(t,X(t),oy+z(10),11,SOFT);txt('speed (m/s)',ox+z(40),s.y+z(8),11,SOFT);txt('time (s)',ox+gw-z(26),oy-z(10),11,SOFT);
 Z.strokeStyle=ok?GOOD:KNOB;Z.lineWidth=3;Z.beginPath();Z.moveTo(X(0),Yv(0));const te=Math.min(4,12/S.g);Z.lineTo(X(te),Yv(S.g*te));Z.stroke();
 DATA.forEach(([t,v])=>{Z.fillStyle=NAVY;Z.beginPath();Z.arc(X(t),Yv(v),z(5),0,7);Z.fill()});slider(S.g,.4,10,`g = ${S.g.toFixed(1)} m/s²`)}
function setG(v){S.g=Math.round(Math.max(.4,Math.min(10,v))*5)/5;A.sound.tick();if(Math.abs(S.g-GM)<.01)right('The line fits: v = 1.6 × t. About one sixth of Earth\'s 9.8 m/s², so things fall more slowly on the Moon.');else{S.bad=false;S.msg=S.g>GM?`g = ${S.g.toFixed(1)}: the line is too steep. After 3 s it predicts ${(3*S.g).toFixed(1)} m/s, but the data say 4.8.`:`g = ${S.g.toFixed(1)}: too shallow. After 3 s it predicts ${(3*S.g).toFixed(1)} m/s, not 4.8.`}refresh()}
/* pointer */
function down(p){const m=mode();if(m==='mass'||m==='moon'){const T=trk();if(Math.abs(p.y-T.y)<z(26)&&p.x>T.x1-z(26)&&p.x<T.x2+z(26)){S.drag=true;move(p);return true}return false}
 const s=scene();if(p.x>s.x&&p.x<s.x+s.w&&p.y>s.y&&p.y<s.y+s.h){if(m==='balls')drop(true);if(m==='vac')drop(!S.seen.air);if(m==='speed')nextSec();return true}return false}
function move(p){if(!S.drag)return;const T=trk(),u=Math.max(0,Math.min(1,(p.x-T.x1)/(T.x2-T.x1)));if(mode()==='mass'){const v=Math.round(1+u*(MMAX-1));if(v!==S.m){S.m=v;A.redraw()}}else{S.g=Math.round((.4+u*9.6)*5)/5;A.redraw()}}
function up(){if(!S.drag)return;S.drag=false;mode()==='mass'?setM(S.m):setG(S.g)}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const m=mode();if(m==='balls'){banner(S.done0?'Same height, same moment, same landing: mass does not change the fall.':'Tap the scene or Drop both to let go of both balls from 2 m.',S.done0);drawDrop(BALLS)}
 if(m==='vac'){const ok=S.seen.air&&S.seen.vac;banner(ok?'Air slows the feather, not its mass. With no air, all objects fall together.':'Drop the hammer and feather in air, then on the Moon.',ok);drawDrop(HF)}
 if(m==='mass')drawMass();if(m==='speed')drawSpeed();if(m==='moon')drawMoon();
 if(m==='chal'){banner('No air: every object falls at g ≈ 9.8 m/s², so v = 9.8 × t.');S.air=true;drawDrop(BALLS)}
 note();A.fx.draw(Z)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='balls'||m==='vac'){const o=m==='balls'?BALLS:HF;s=`${S.air?'Earth, in air':'Moon, no air'}. Time ${S.ft.toFixed(2)} s. `+o.map(x=>`${x.t} has fallen ${fallen(x.k,S.ft).toFixed(2)} of 2 m`).join('; ')+'.'}
 if(m==='mass')s=`Mass ${S.m} kg, weight ${(S.m*G).toFixed(1)} N, acceleration 9.8 m/s².`;
 if(m==='speed')s=`After ${S.sec} s: speed ${(G*S.sec).toFixed(1)} m/s, fallen ${(4.9*S.sec*S.sec).toFixed(1)} m.`;
 if(m==='moon')s=`Graph of speed against time with Moon data at 1, 2 and 3 s: 1.6, 3.2 and 4.8 m/s. Line for g = ${S.g.toFixed(1)} m/s².`;
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='balls')b('Drop both',()=>drop(true));if(m==='vac'){b('Drop in air',()=>drop(true));b('Drop on the Moon',()=>drop(false))}
 if(m==='mass'){b('− 1 kg',()=>setM(S.m-1),'Less mass');b('+ 1 kg',()=>setM(S.m+1),'More mass')}
 if(m==='speed')b('Next second',nextSec);if(m==='moon'){b('− 0.2',()=>setG(S.g-.2),'Make g smaller');b('+ 0.2',()=>setG(S.g+.2),'Make g bigger')}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const fresh=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},air:true,ft:0,falling:false,landed:false,done0:false,seen:{},m:1,tried:new Set(),sec:0,g:G,drag:false,msg:'',bad:false})};
const steps=[
{h:'Heavy and light',p:'A 7 kg bowling ball and a 58 g tennis ball are let go together from 2 m.',
predict:{q:'Which lands first?',opts:['They land together','The bowling ball, clearly first','The tennis ball'],ans:0},
task:'Drop both balls',show:()=>{steps[0].go();play([()=>drop(true)],200)},go:()=>{fresh();refresh();S.then=finish(0,()=>S.done0,'Mass does not decide how fast things fall.')}},
{h:'Hammer and feather',p:'In 1971 astronaut David Scott dropped a hammer and a feather on the Moon, where there is no air.',
predict:{q:'On the Moon, the hammer and the feather…',opts:['land together','hammer lands first','feather floats away'],ans:0},
task:'Drop them in air and on the Moon',show:()=>{steps[1].go();play([()=>drop(true),()=>drop(false)],900)},go:()=>{fresh();refresh();S.then=finish(1,()=>S.seen.air&&S.seen.vac,'Air resistance slows the feather, not its small mass.')}},
{h:'Why mass does not matter',p:'Weight is the pull of gravity: W = m × g. Newton\'s second law says a = F ÷ m.',
predict:{q:'Double the mass. The weight doubles. The acceleration…',opts:['stays 9.8 m/s²','doubles','halves'],ans:0},
task:'Try 3 different masses',show:()=>{steps[2].go();play([()=>setM(2),()=>setM(5),()=>setM(10)],330)},go:()=>{fresh();S.tried.add(1);refresh();S.then=finish(2,()=>S.tried.size>=3,'a = mg ÷ m = g.')}},
{h:'Faster every second',p:'An acceleration of 9.8 m/s² means the speed goes up by 9.8 m/s every second.',
predict:{q:'After 1 s the stone falls at 9.8 m/s. After 3 s it falls at…',opts:['29.4 m/s','9.8 m/s','88.2 m/s'],ans:0},
task:'Watch 4 seconds',show:()=>{steps[3].go();play([1,2,3,4].map(()=>nextSec),280)},go:()=>{fresh();refresh();S.then=finish(3,()=>S.sec>=4,'v = 9.8 × t.')}},
{h:'g on the Moon',p:'The slope of a speed–time graph is the acceleration. Find g from data measured on the Moon.',
task:'Fit the line to the Moon data',show:()=>{steps[4].go();play([()=>setG(5),()=>setG(GM)],400)},go:()=>{fresh();refresh();S.then=finish(4,()=>Math.abs(S.g-GM)<.01,'Moon g ≈ 1.6 m/s².')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['A 5 kg and a 1 kg steel ball are dropped together from 3 m. Which lands first?','They land together',[['The 5 kg ball','heavier'],['The 1 kg ball','lighter']]],
['A stone is dropped from rest. Ignoring air, how fast is it falling after 2 s?','19.6 m/s',[['9.8 m/s','constant'],['39.2 m/s','squared']]],
['Why does a heavy ball not fall faster than a light one?','Its bigger weight has more mass to speed up',[['Gravity pulls every object with the same force','sameForce'],['Heavy objects have no weight in free fall','noWeight']]],
['On Earth a feather falls slower than a hammer because…','air resistance is large compared with its weight',[['it is lighter, so gravity speeds it up less','featherLight'],['gravity does not act on feathers','noGravity']]],
['On the Moon g = 1.6 m/s². How fast is a dropped rock falling after 5 s?','8 m/s',[['49 m/s','earthG'],['1.6 m/s','constant2']]],
['What does an acceleration of 9.8 m/s² mean?','The speed rises by 9.8 m/s each second',[['It falls 9.8 m every second','distance'],['Its speed is always 9.8 m/s','constSpeed']]]];
function why(tag){let m='With no air, a = W ÷ m = g for every object, so v = g × t from rest.';
 if(tag==='heavier')m='The 5 kg ball has 5 times the weight but also 5 times the mass to speed up, so a = W ÷ m is 9.8 m/s² for both.';
 if(tag==='lighter')m='Less mass does not mean faster. Both steel balls have tiny air resistance, so both accelerate at 9.8 m/s².';
 if(tag==='constant')m='9.8 m/s is the speed after 1 s. The speed keeps rising: 2 × 9.8 = 19.6 m/s.';
 if(tag==='squared')m='Speed is g × t, not g × t². 9.8 × 2 = 19.6 m/s. The t² belongs to the distance.';
 if(tag==='sameForce')m='The force is not the same: weight W = m × g, so the heavy ball is pulled harder. It also has more mass, so a is the same.';
 if(tag==='noWeight')m='Objects in free fall still have weight. Weight is the only force on them, and it gives a = g.';
 if(tag==='featherLight')m='Gravity gives every mass the same acceleration. The feather is slowed by air, as the Moon drop shows.';
 if(tag==='noGravity')m='Gravity pulls the feather too: on the Moon it falls as fast as the hammer. On Earth, air holds it back.';
 if(tag==='earthG')m='49 m/s uses Earth\'s 9.8. On the Moon use 1.6: 1.6 × 5 = 8 m/s.';
 if(tag==='constant2')m='1.6 m/s is the speed after 1 s. After 5 s it is 5 × 1.6 = 8 m/s.';
 if(tag==='distance')m='m/s² is a change of speed per second, not metres per second. The distance fallen grows faster each second.';
 if(tag==='constSpeed')m='A constant speed has zero acceleration. In free fall the speed rises by 9.8 m/s every second.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+qq);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;A.every(tick);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Free fall lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
