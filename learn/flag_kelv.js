/* Flagship – the Kelvin scale and absolute zero (ages 14–16; GCSE Physics particle model: gas temperature in kelvin,
   absolute zero −273 °C, K = °C + 273). Cool a gas on a twin °C / K thermometer until its particles reach their least
   possible motion; find readings on both scales and see that 1 °C and 1 K are the same step; convert cards both ways;
   extend a sealed gas's pressure–temperature line to zero pressure to find −273 °C; then double the particles' average
   kinetic energy by doubling kelvin, not Celsius. Every drag has button twins; the canvas label says each reading.
   Not flagtemp (particle motion and thermal equilibrium) or flagtherm (reading a thermometer, ages 5–7). */
(()=>{
const STOPS=[-273,-270,-250,-200,-196,-173,-150,-123,-100,-73,-50,-20,0,20,27,37,54,77,100,150,200,250,300,327];
const TOP=330,neg=v=>String(v).replace('-','−'),fC=c=>`${neg(c)} °C`,fK=c=>`${c+273} K`;
const FIND=[[100,'373 K: water boils'],[-196,'77 K: liquid nitrogen boils'],[37,'310 K: body temperature']];
const CONV=[['77 K in °C?',[['−196 °C',1],['350 °C','add'],['−77 °C','sign']]],['20 °C in K?',[['293 K',1],['253 K','sub'],['20 K','same']]],
 ['−40 °C in K?',[['233 K',1],['313 K','negadd'],['−313 K','negk']]],['0 K in °C?',[['−273 °C',1],['0 °C','zero'],['273 °C','add']]]];
const CWHY={add:'Going from K to °C you take 273 away, not add it.',sign:'Subtract 273 from the kelvin number: 77 − 273 = −196.',sub:'Going from °C to K you add 273: 20 + 273 = 293.',
 same:'The two scales have the same step size but different zeros, so the numbers differ by 273.',negadd:'−40 + 273 = 233. Adding 273 to −40 is not the same as 40 + 273.',
 negk:'The Kelvin scale has no negative values: its zero is the coldest possible.',zero:'0 °C is where water freezes, which is 273 K. 0 K is far colder.'};
const DBL=[[-173,-73],[-123,27],[27,327]];
VIS.reg('flagkelv',c=>{let A,ctl,quiz,qk=-1,tok=0,dots=[];
const init0=()=>({want:()=>{},won:0,c:20,c2:20,j:0,bad:-1,lock:0,grab:0,probe:90}),S=init0();
const stage=()=>['cool','scale','conv','line','dbl','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,wt,al,col){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function card(g,r,warn){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:C.tx;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const inR=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* particles: seeded positions, speed grows with √T(K) */
function seed(n){let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;return[...Array(n)].map(()=>({x:r(),y:r(),a:r()*6.28}))}
dots=seed(14);
const speed=c=>Math.sqrt((c+273)/300)*.35;
/* twin thermometer */
const TH=()=>({x:A.narrow?A.W*.2:A.W*.17,t:A.H*.1,b:A.H*.88}),ty=c=>{const t=TH();return t.b-(c+273)/(TOP+273)*(t.b-t.t)},toC=y=>{const t=TH();return(t.b-y)/(t.b-t.t)*(TOP+273)-273};
function nearest(c){let b=0;STOPS.forEach((s,i)=>{if(Math.abs(s-c)<Math.abs(STOPS[b]-c))b=i});return STOPS[b]}
function drawTherm(g,c){const C=A.col,t=TH(),w=16;g.fillStyle=C.dark?'#0f172a':'#f8fafc';A.paint.rrect(t.x-w/2,t.t-8,w,t.b-t.t+16,8);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 g.fillStyle=C.rd;g.fillRect(t.x-w/2+4,ty(c),w-8,t.b-ty(c)+4);
 [[-273,0],[-200,73],[-100,173],[0,273],[100,373],[200,473],[300,573]].forEach(([cc,k])=>{const y=ty(cc);g.fillStyle=C.tx;g.fillRect(t.x-w/2-8,y-1,8,2);g.fillRect(t.x+w/2,y-1,8,2);
  txt(g,neg(cc),t.x-w/2-12,y,10,700,'right');txt(g,String(k),t.x+w/2+12,y,10,700,'left')});
 txt(g,'°C',t.x-w/2-12,t.t-22,11,900,'right');txt(g,'K',t.x+w/2+12,t.t-22,11,900,'left');
 g.fillStyle=C.ac;g.beginPath();g.arc(t.x,ty(c),11,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}
function drawBox(g,c,r,label){const C=A.col,v=speed(c);card(g,r);g.save();g.beginPath();g.rect(r.x+2,r.y+2,r.w-4,r.h-4);g.clip();
 dots.forEach(d=>{const x=r.x+10+d.x*(r.w-20),y=r.y+10+d.y*(r.h-20);g.fillStyle=C.cy;g.beginPath();g.arc(x,y,6,0,7);g.fill();
  if(v>0){g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(d.a)*v*60,y+Math.sin(d.a)*v*60);g.stroke()}});g.restore();
 const k=c+273,bw=(r.w-20)*Math.min(1,k/600);txt(g,label||`${fC(c)} = ${fK(c)}`,r.x+r.w/2,r.y-14,13,900);
 g.fillStyle=A.alpha(C.or,.8);g.fillRect(r.x+10,r.y+r.h+10,bw,12);g.strokeStyle=C.tx;g.lineWidth=1;g.strokeRect(r.x+10,r.y+r.h+10,r.w-20,12);
 txt(g,k?`${r.w<260?'Avg KE':'Average kinetic energy'} ∝ ${k} K`:r.w<260?'Least possible KE':'Least possible kinetic energy',r.x+r.w/2,r.y+r.h+36,11,800)}
function tickDots(dt){if(rm()||!A)return false;const v=['cool','scale','dbl'].includes(stage())?speed(stage()==='dbl'?S.c2:S.c):0;if(!v)return false;
 dots.forEach(d=>{d.x+=Math.cos(d.a)*v*dt;d.y+=Math.sin(d.a)*v*dt;if(d.x<0||d.x>1){d.a=Math.PI-d.a;d.x=Math.max(0,Math.min(1,d.x))}if(d.y<0||d.y>1){d.a=-d.a;d.y=Math.max(0,Math.min(1,d.y))}});return true}
function setC(c,src){const v=stage();c=Math.max(-273,Math.min(TOP,c));if(v==='dbl'){if(c===S.c2)return;S.c2=c}else{if(c===S.c&&src!=='show')return;S.c=c}A.sound.tick();
 if(v==='cool'){say(c===-273?'−273 °C = 0 K: absolute zero. The particles have the least possible kinetic energy. Nothing can be colder.':`${fC(c)} = ${fK(c)}. Colder means slower particles.`);
  if(c===-273&&!S.won){S.won=1;A.sound.pop();S.want()}}
 if(v==='scale'){say(`${fC(c)} = ${fK(c)}.`);if(!S.lock&&S.won<3&&c===FIND[S.j][0]){S.won++;A.sound.pop();say(`Found it: ${fK(c)} = ${fC(c)}. Add 273 to go from °C to K.`);if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:700)}S.want()}}
 if(v==='dbl')say(`Box B: ${fC(S.c2)} = ${fK(S.c2)}. Box A: ${fK(DBL[S.j][0])}.`);keys();A.redraw()}
const step=d=>{const v=stage(),cur=v==='dbl'?S.c2:S.c,i=STOPS.indexOf(nearest(cur));if(v==='cool'&&cur===-273&&d<0)return miss('No lower stop: 0 K is the bottom of the Kelvin scale. Particles cannot have less than the least possible energy.',-1);setC(STOPS[Math.max(0,Math.min(STOPS.length-1,i+d))])};
/* convert cards */
const zone=k=>{const w=(A.W-36)/3;return{x:8+k*(w+10),y:A.H*.58,w,h:A.H*.26}};
function conv(k){if(stage()!=='conv'||S.won>=4||S.lock)return;const[q,ops]=CONV[S.j],o=ops[(k+S.j)%3];if(o[1]!==1)return miss(CWHY[o[1]],k);
 S.won++;A.sound.pop();say(`Yes: ${q.replace(' in',' =').replace('?','')} ${o[0]}.`);if(S.won<4){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:650)}keys();A.redraw();S.want()}
function drawConv(g){const C=A.col,[q,ops]=CONV[Math.min(S.j,3)],w=Math.min(A.W-30,420);card(g,{x:(A.W-w)/2,y:A.H*.1,w,h:A.H*.28});txt(g,q,A.W/2,A.H*.24,24,900);
 txt(g,'K = °C + 273     °C = K − 273',A.W/2,A.H*.47,13,800);[0,1,2].forEach(k=>{const z=zone(k);card(g,z,S.bad===k);txt(g,ops[(k+S.j)%3][0],z.x+z.w/2,z.y+z.h/2,A.narrow?15:18,900)});txt(g,`${Math.min(S.won,4)} of 4`,A.W/2,A.H*.93,12,800)}
/* pressure line */
const P=c=>100*(c+273)/273,GX=c=>A.W*.1+(c+300)/420*A.W*.84,GY=p=>A.H*.84-p/150*A.H*.7,fromX=x=>Math.round((x-A.W*.1)/(A.W*.84)*420-300);
function setProbe(c){if(stage()!=='line'||S.won)return;if(c<-273)return miss('Below −273 °C the line would give a negative pressure. A gas cannot push with less than nothing.',-1);
 S.probe=Math.min(90,c);A.sound.tick();if(Math.abs(S.probe+273)<=3){S.probe=-273;S.won=1;A.sound.pop();say('Zero pressure at −273 °C. That is absolute zero, 0 K: the particles have stopped hitting the walls.');S.want()}
 else say(`${fC(S.probe)}: pressure ${Math.round(P(S.probe))} kPa.`);keys();A.redraw()}
function drawLine(g){const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(GX(-300),GY(0));g.lineTo(GX(120),GY(0));g.moveTo(GX(0),GY(0));g.lineTo(GX(0),GY(150));g.stroke();
 [-273,-200,-100,0,100].forEach(c=>{g.fillRect(GX(c)-1,GY(0),2,6);txt(g,neg(c),GX(c),GY(0)+16,10,700)});[50,100,150].forEach(p=>txt(g,String(p),GX(0)-6,GY(p),10,700,'right'));
 txt(g,'Temperature (°C)',A.W*.5,A.H*.97,11,800);txt(g,'Pressure (kPa) of a sealed gas',A.W*.5,A.H*.06,12,900);
 g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();g.moveTo(GX(0),GY(P(0)));g.lineTo(GX(90),GY(P(90)));g.stroke();
 g.setLineDash([6,5]);g.strokeStyle=C.or;g.beginPath();g.moveTo(GX(0),GY(P(0)));g.lineTo(GX(S.probe),GY(P(S.probe)));g.stroke();g.setLineDash([]);
 [0,30,60,90].forEach(c=>{g.fillStyle=C.tx;g.beginPath();g.arc(GX(c),GY(P(c)),5,0,7);g.fill()});
 g.fillStyle=C.rd;g.beginPath();g.arc(GX(S.probe),GY(P(S.probe)),10,0,7);g.fill();txt(g,`${fC(S.probe)}, ${Math.round(P(S.probe))} kPa`,Math.max(80,Math.min(A.W-80,GX(S.probe))),GY(P(S.probe))-22,12,900)}
/* doubling */
function checkDbl(){if(stage()!=='dbl'||S.won>=3||S.lock)return;const[a,b]=DBL[S.j],ka=a+273,kb=S.c2+273;
 if(S.c2!==b)return miss(S.c2===2*a?`You doubled the Celsius number. Energy follows kelvin: ${ka} K × 2 = ${2*ka} K = ${fC(b)}.`:`Box B is ${kb} K, which is ${(kb/ka).toFixed(2)} times ${ka} K. You need exactly 2 times: ${2*ka} K.`,-1);
 S.won++;A.sound.pop();say(`Double: ${ka} K to ${kb} K, so the average kinetic energy doubles. In Celsius that is ${fC(a)} to ${fC(b)}.`);
 if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;S.c2=20;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
function drawDbl(g){const C=A.col,a=DBL[Math.min(S.j,2)][0],w=A.W*.38,h=A.H*(A.narrow?.44:.38);drawBox(g,a,{x:A.W*.06,y:A.H*.2,w,h},`A: ${fC(a)} = ${fK(a)}`);drawBox(g,S.c2,{x:A.W*.56,y:A.H*.2,w,h},`B: ${fC(S.c2)} = ${fK(S.c2)}`);
 txt(g,S.won<3?'Make B’s particles carry twice A’s average kinetic energy':'All three doubled in kelvin.',A.W/2,A.H*.06,13,900);txt(g,'Drag across the canvas or use Colder / Warmer',A.W/2,A.H*.94,11,700)}
/* shared */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'K = °C + 273',W/2,H*.36,20,900);txt(g,'0 K = −273 °C: absolute zero',W/2,H*.58,15,800);return}
 if(v==='cool'||v==='scale'){drawTherm(g,S.c);const x0=TH().x+70,r={x:x0,y:H*.2,w:W-x0-12,h:H*.42};drawBox(g,S.c,r);if(v==='scale')txt(g,S.won<3?`Find ${FIND[S.j][1]}`:'All three found.',x0+r.w/2,H*.88,13,900)}
 else if(v==='conv')drawConv(g);else if(v==='line')drawLine(g);else drawDbl(g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='cool'||v==='scale'||v==='dbl'){B('▼ Colder',()=>step(-1),'Colder');B('Warmer ▲',()=>step(1),'Warmer');if(v==='dbl'&&S.won<3)B('Check box B',checkDbl)}
 if(v==='conv'&&S.won<4)[0,1,2].forEach(k=>B(CONV[S.j][1][(k+S.j)%3][0],()=>conv(k)));
 if(v==='line'&&!S.won){B('◀ 10 °C colder',()=>setProbe(S.probe-10));B('◀ 1 °C',()=>setProbe(S.probe-1));B('1 °C ▶',()=>setProbe(S.probe+1))}}
function down(p){const v=stage();if(v==='cool'||v==='scale'||v==='dbl'){S.grab=1;move(p);return true}
 if(v==='line'){S.grab=1;move(p);return true}const k=[0,1,2].find(k=>inR(p,zone(k)));if(k!=null)conv(k);return false}
function move(p){if(!S.grab)return;const v=stage();if(v==='line')return setProbe(Math.max(-273,fromX(p.x)));if(v==='dbl')return setC(nearest((p.x/A.W)*(TOP+273)-273));setC(nearest(toC(p.y)))}
function up(){S.grab=0}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};
const steps=[
{h:'Cool it down',p:'Temperature tells you how fast a substance’s particles move on average. Drag the thermometer down, or tap Colder, and watch the particles in the box.',
 predict:{q:'Keep cooling a gas. How cold can it get?',opts:['There is no limit','About −273 °C, and no colder','0 °C, where water freezes'],ans:1},task:'Reach the coldest possible',
 show:()=>{steps[0].go();demo([-50,-150,-250,-273].map(t=>()=>setC(t,'show')),500)},go:()=>{clear();say('20 °C = 293 K. Drag the thermometer down.');keys();S.want=ready(0,()=>S.won>=1,'At −273 °C the particles have the least possible kinetic energy. This is absolute zero, 0 K.')}},
{h:'Two scales, same step',p:'The Kelvin scale starts at absolute zero, so 0 K = −273 °C. A step of 1 K is the same size as a step of 1 °C. Find each reading.',
 predict:{q:'A drink warms from 10 °C to 20 °C. How much did it warm in kelvin?',opts:['10 K','283 K','20 K'],ans:0},task:'Find 3 readings',
 show:()=>{steps[1].go();demo(FIND.map(f=>()=>setC(f[0],'show')),900)},go:()=>{clear();say('Find 373 K, where water boils.');keys();S.want=ready(1,()=>S.won>=3,'Same step size, different zero: K = °C + 273.')}},
{h:'Convert',p:'To go from °C to K, add 273. To go from K to °C, take 273 away. Tap the right answer.',task:'Convert 4 temperatures',
 show:()=>{steps[2].go();demo([0,1,2,3].map(()=>()=>conv([0,1,2].find(k=>CONV[S.j][1][(k+S.j)%3][1]===1))),750)},go:()=>{clear();say(CONV[0][0]);keys();S.want=ready(2,()=>S.won>=4,'There are no negative kelvin values.')}},
{h:'Where the line meets zero',p:'A sealed gas was heated and its pressure measured at 4 temperatures. Drag the red point down the line, or use the buttons, to where the pressure would be zero.',
 predict:{q:'Where will the line reach zero pressure?',opts:['0 °C','About −273 °C','It never reaches zero'],ans:1},task:'Find zero pressure',
 show:()=>{steps[3].go();demo([0,-100,-200,-260,-272].map(t=>()=>setProbe(t)),450)},go:()=>{clear();say('90 °C: pressure 133 kPa. Move the point down the line.');keys();S.want=ready(3,()=>S.won>=1,'Real gases turn liquid first, but the line points to −273 °C, absolute zero.')}},
{h:'Double the energy',p:'The average kinetic energy of gas particles is proportional to the temperature in kelvin. Set box B to twice box A’s energy, then check.',
 predict:{q:'A gas warms from 27 °C to 54 °C. Its particles’ average kinetic energy…',opts:['doubles','rises by only about 9%','falls'],ans:1},task:'Double it 3 times',
 show:()=>{steps[4].go();demo([()=>setC(-73,'show'),checkDbl,()=>setC(27,'show'),checkDbl,()=>setC(327,'show'),checkDbl],600)},go:()=>{clear();say('Box A: 100 K. Set box B.');keys();S.want=ready(4,()=>S.won>=3,'Double the kelvin, not the Celsius: 300 K to 327 K is only 9% more.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['Liquid nitrogen boils at 77 K. What is that in °C?',[['−196 °C','ok'],['350 °C','add'],['−77 °C','sign']]],['Why are there no negative temperatures on the Kelvin scale?',[['0 K is the least possible energy, so nothing is colder','ok'],['Scientists chose to skip them','choice'],['Negative kelvin are too cold to measure','tooc']]],
 ['A room warms by 5 °C. By how much does it warm in kelvin?',[['5 K','ok'],['278 K','addstep'],['−268 K','sign']]],['A gas at 200 K is heated until its particles have twice the average kinetic energy. New temperature?',[['400 K','ok'],['400 °C','unit'],['−146 °C','dblc']]],
 ['What happens to particle motion at absolute zero?',[['It reaches the least possible kinetic energy','ok'],['It moves fastest','fast'],['Water freezes','water']]]];
function why(t){let m='Use K = °C + 273, and remember 0 K is the bottom of the scale.';
 if(t==='add')m='From K to °C, take 273 away: 77 − 273 = −196 °C.';if(t==='sign')m='Not just a sign change: the scales differ by 273, so subtract or add 273.';
 if(t==='choice')m='It is not a choice. Kelvin starts at the coldest anything can be, so there is nothing below 0 K.';if(t==='tooc')m='Nothing can be colder than 0 K, so negative kelvin do not exist at all.';
 if(t==='addstep')m='A change of 5 °C is a change of 5 K. You only add 273 to a reading, not to a difference.';if(t==='unit')m='400 °C is 673 K, more than double. Double the kelvin number: 400 K, which is 127 °C.';
 if(t==='dblc')m='200 K is −73 °C, and doubling −73 °C gives −146 °C, which is colder. Double the kelvin: 400 K.';if(t==='fast')m='At absolute zero the particles have the least possible kinetic energy, not the most.';if(t==='water')m='Water freezes at 0 °C, which is 273 K. Absolute zero is −273 °C.';return m}
function ask(){qk++;const[q,raw]=QS[qk%QS.length],ops=raw,r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});A.every(tickDots);keys()}});
A.start()})})();
