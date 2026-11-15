/* Flagship: force–extension graphs and the spring constant (ages 14–16; AQA GCSE Physics 4.5.3 "forces and elasticity",
   F = k e, required practical on force and extension; Edexcel 9–1 topic 15). Measure extension, not length; plot F
   against e; read k from the gradient of two springs; load past the limit of proportionality and the elastic limit; pick
   the load for a 5 cm stretch with k = 40 N/m. Every canvas tap or drag has a button twin. */
(()=>{
const C={ink:'#0f172a',mute:'#475569',edge:'#334155',white:'#ffffff',win:'#166534',winBg:'#dcfce7',err:'#9f1239',info:'#eff6ff',
 a:'#1d4ed8',b:'#c2410c',mass:'#64748b',mark:'#be123c'};
const L0=10,KA=25;
const ext=F=>F<=6?4*F:24+4*(F-6)+3*(F-6)*(F-6);
VIS.reg('flaghooke',c=>{let A,X,btns,chq,qn=-1,seq=0;const S={after:()=>{}};
const u=v=>Math.round(v*(A.narrow?1:1.1));
const write=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||C.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-14)};
function split(s,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const o=[];let l='';
 for(const t of String(s).split(' ')){const m=l?l+' '+t:t;if(l&&X.measureText(m).width>w){o.push(l);l=t}else l=m}o.push(l);return o}
function card(x,y,w,h,bg,ln,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(ln){X.lineWidth=lw||2;X.strokeStyle=ln;X.stroke()}}
function strip(s,won){const R=split(s,A.W-38,13),g=u(13)+4,h=Math.max(u(40),R.length*g+14);card(10,8,A.W-20,h,won?C.winBg:C.info,won?C.win:C.edge);
 R.forEach((t,i)=>write(t,A.W/2,8+h/2+(i-(R.length-1)/2)*g,13,won?C.win:C.ink));return 8+h}
const lowH=()=>S.say?split('✓ '+S.say,A.W-42,13).length*(u(13)+5)+24:u(10);
function low(){if(!S.say)return;const R=split((S.bad?'✗ ':'✓ ')+S.say,A.W-42,13),g=u(13)+5,h=R.length*g+10,y=A.H-h-8;
 card(10,y,A.W-20,h,C.white,S.bad?C.err:C.win,3);R.forEach((t,i)=>write(t,A.W/2,y+5+g*(i+.5),13,S.bad?C.err:C.ink))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{S.bad=true;S.say=s;A.sound.miss();sync()};
const right=s=>{S.bad=false;S.say=s;A.sound.pop();sync()};
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const cm=v=>(+v.toFixed(1)).toString();
/* ---- step 0: extension, not length ---- */
function load(d){if(S.won)return;S.F=Math.max(0,Math.min(5,S.F+d));A.sound.tick();S.bad=false;S.say=`${S.F} N hanging. Length ${cm(L0+ext(S.F))} cm.`;sync()}
function bracket(v){if(S.won)return;S.br=Math.max(0,Math.min(25,v));sync()}
function checkExt(){if(S.won)return;if(S.F!==3)return wrong(`Hang 3 N first (now ${S.F} N).`);const e=ext(3);
 if(Math.abs(S.br-(L0+e))<.6)return wrong(`That is ${cm(S.br)} cm, the whole length. Extension = length − original length = 22 − 10 = 12 cm. Start the bracket at the dotted line.`);
 if(Math.abs(S.br-e)>.6)return wrong(`The bracket shows ${cm(S.br)} cm. Make it reach from the dotted 10 cm line to the bottom of the spring.`);
 S.won=true;right('Extension = 22 cm − 10 cm = 12 cm. Force and extension are what Hooke’s law links, not force and length.')}
function rig(top){const rx=A.W*.38,px=rx+u(70),scale=(A.H-top-lowH()-u(70))/32,y0=top+u(26),len=(L0+ext(S.F))*scale;
 X.fillStyle='#fef3c7';X.fillRect(rx-u(22),y0,u(22),30*scale);X.strokeStyle=C.edge;X.lineWidth=1;X.strokeRect(rx-u(22),y0,u(22),30*scale);
 for(let v=0;v<=30;v++){const y=y0+v*scale;X.beginPath();X.moveTo(rx-(v%5?6:12),y);X.lineTo(rx,y);X.stroke();if(v%5===0)write(v,rx-u(30),y,10,C.mute,'right',600)}write('cm',rx-u(11),y0-u(10),10,C.mute);
 HKART.spring(X,px,y0,len,u(14));const hy=y0+len;card(px-u(18),hy,u(36),u(22),C.mass,C.edge,1.5,4);write(`${S.F} N`,px,hy+u(11),11,'#ffffff');
 X.setLineDash([5,5]);X.strokeStyle=C.mark;X.lineWidth=1.5;X.beginPath();X.moveTo(rx,y0+L0*scale);X.lineTo(px+u(66),y0+L0*scale);X.stroke();X.setLineDash([]);
 write('unloaded',rx+u(4),y0+L0*scale-u(8),10,C.mark,'left',600);return{rx,px,y0,scale}}
function drawExt(){const top=strip(S.won?'Extension is the increase in length: 22 cm − 10 cm = 12 cm.':'Hang 3 N. Then drag the red bracket (or use the buttons) to show the extension, and check.',S.won);
 const g=rig(top),bx=g.px+u(58),ya=g.y0+L0*g.scale,yb=ya+S.br*g.scale;S.geo=g;
 X.strokeStyle=C.mark;X.lineWidth=3;X.beginPath();X.moveTo(bx,ya);X.lineTo(bx,yb);X.moveTo(bx-8,ya);X.lineTo(bx+8,ya);X.moveTo(bx-8,yb);X.lineTo(bx+8,yb);X.stroke();
 X.fillStyle=C.mark;X.beginPath();X.arc(bx,yb,u(9),0,7);X.fill();write(`${cm(S.br)} cm`,bx+u(14),(ya+yb)/2,12,C.mark,'left');S.handle={x:bx-u(24),y:yb-u(24),w:u(48),h:u(48)}}
/* ---- step 1: plot F against e ---- */
const PB=()=>{const top=u(70),left=u(44);return{x:left,y:top+u(28),w:A.W-left-u(18),h:A.H-top-lowH()-u(100)}};
function plot(asLength){if(S.won)return;const F=S.pts.length,e=ext(F);
 if(asLength)return wrong(`Length ${cm(L0+e)} cm would put the line off the origin. Plot the extension, ${cm(e)} cm: with no load there is no extension.`);
 S.pts.push([e,F]);A.sound.tick();if(S.pts.length===6){S.won=true;return right('Six points on a straight line through the origin: extension is directly proportional to force.')}S.bad=false;S.say=`Plotted (${cm(e)} cm, ${F} N).`;sync()}
function tapGraph(p){const b=PB(),e=(p.x-b.x)/b.w*30,F=(b.y+b.h-p.y)/b.h*6,want=ext(S.pts.length);
 if(Math.abs(F-S.pts.length)>.4)return wrong(`Plot the rows in order. The next row is ${S.pts.length} N.`);
 if(Math.abs(e-(L0+want))<1.2)return plot(true);
 if(Math.abs(e-want)>1.2)return wrong(`That is at ${cm(e)} cm. The table says ${cm(want)} cm for ${S.pts.length} N.`);plot(false)}
function drawPlot(){const top=strip(S.won?'Straight line through the origin: F = k e. Double the force, double the extension.':`Plot force against extension. Tap the graph at the next row: ${S.pts.length<6?S.pts.length+' N, '+cm(ext(S.pts.length))+' cm':'done'}.`,S.won);
 const b=PB();HKART.axes(X,b,30,6,2,.5,'extension e / cm','force F / N',u(10));S.box=b;
 S.pts.forEach(([e,F])=>{X.fillStyle=C.a;X.beginPath();X.arc(b.x+b.w*e/30,b.y+b.h-b.h*F/6,u(5),0,7);X.fill()});
 if(S.won){X.strokeStyle=C.a;X.lineWidth=2;X.beginPath();X.moveTo(b.x,b.y+b.h);X.lineTo(b.x+b.w*24/30,b.y+b.h-b.h*6/6);X.stroke()}
 write(S.pts.map(([e,F])=>`${F}N:${cm(e)}cm`).join('  '),A.W/2,b.y+b.h+u(34),10,C.mute,'center',600)}
/* ---- step 2: gradient = k for two springs ---- */
const SPR=[{n:'A',k:25,col:C.a},{n:'B',k:50,col:C.b}],KOPT=[[25,'25 N/m'],[50,'50 N/m'],[.25,'0.25 N/m'],[4,'4 N/m']];
function slide(v){S.tri=Math.max(.02,Math.min(.2,v));sync()}
function pickK(k){if(S.won)return;const sp=SPR[S.si];
 if(k===sp.k/100)return wrong(`${(sp.k*S.tri).toFixed(1)} N ÷ ${cm(S.tri*100)} cm gives N per cm. Change the extension to metres: ${cm(S.tri*100)} cm = ${S.tri.toFixed(2)} m.`);
 if(k===100/sp.k)return wrong('That is extension ÷ force. With force on the vertical axis, gradient = rise ÷ run = force ÷ extension.');
 if(k!==sp.k)return wrong(`Read the triangle on spring ${sp.n}: ${(sp.k*S.tri).toFixed(1)} N ÷ ${S.tri.toFixed(2)} m.`);
 S.got.push(sp.k);A.sound.tick();if(S.si===1){S.won=true;return right('k_A = 25 N/m and k_B = 50 N/m. The steeper line is the stiffer spring: it needs more force for each metre of stretch.')}S.si=1;right('Spring A: k = 25 N/m. Now spring B.')}
function drawK(){const sp=SPR[S.si],top=strip(S.won?'Gradient of a force–extension graph = k. Steeper line = stiffer spring.':`Spring ${sp.n}: drag the triangle along its line, then pick k. Change cm to m first.`,S.won);
 const b={x:u(48),y:top+u(30),w:A.W-u(66),h:A.H-top-lowH()-u(150)};HKART.axes(X,b,20,10,2,1,'extension e / cm','force F / N',u(10));S.box=b;
 const P=(e,F)=>[b.x+b.w*e*100/20,b.y+b.h-b.h*F/10];
 SPR.forEach(s=>{const [x1,y1]=P(.2,s.k*.2);X.strokeStyle=s.col;X.lineWidth=s===sp?3.5:2;X.beginPath();X.moveTo(b.x,b.y+b.h);X.lineTo(x1,Math.max(b.y,y1));X.stroke();
  const [lx,ly]=P(s.k===50?.19:.19,Math.min(9.6,s.k*.19));write(s.n,Math.min(lx,b.x+b.w-6)-u(10),ly+(s.k===50?u(4):-u(10)),13,s.col)});
 if(!S.won){const [x0,y0]=P(0,0),[x1,y1]=P(S.tri,sp.k*S.tri);X.strokeStyle=C.mark;X.lineWidth=2;X.setLineDash([4,3]);X.beginPath();X.moveTo(x0,y0);X.lineTo(x1,y0);X.lineTo(x1,y1);X.stroke();X.setLineDash([]);
  X.fillStyle=C.mark;X.beginPath();X.arc(x1,y1,u(8),0,7);X.fill();write(`Δe = ${cm(S.tri*100)} cm = ${S.tri.toFixed(2)} m`,b.x+6,b.y+u(12),12,C.mark,'left');write(`ΔF = ${(sp.k*S.tri).toFixed(1)} N`,b.x+6,b.y+u(28),12,C.mark,'left');S.handle={x:x1-u(24),y:y1-u(24),w:u(48),h:u(48)}}
 const ky=b.y+b.h+u(42),kw=(A.W-28-18)/4;S.kHit=[];KOPT.forEach(([k,l],i)=>{const x=14+i*(kw+6);card(x,ky,kw,u(36),S.got.includes(k)?C.winBg:C.white,C.edge,1.5);write(l,x+kw/2,ky+u(18),12,C.ink);S.kHit.push({x,y:ky,w:kw,h:u(36),k})})}
/* ---- step 3: limit of proportionality and elastic limit ---- */
function pile(){if(S.won||S.F>=10)return;S.F++;A.sound.tick();S.bad=false;S.say=`${S.F} N: extension ${cm(ext(S.F))} cm${S.F>6?` (a straight line would give ${4*S.F} cm)`:''}.`;if(S.F===10)S.say+=' Now tap the last point that is still on the straight line.';sync()}
function markAt(F){if(S.won)return;if(S.F<10)return wrong('Keep loading up to 10 N first, so you can see the whole graph.');
 if(F>6)return wrong(`At ${F} N the point is already off the straight line: ${cm(ext(F))} cm, not ${4*F} cm.`);
 if(F<6)return wrong(`${F} N is still proportional. So are the points after it, up to 6 N. Find the last one on the line.`);
 S.won=true;S.F=0;right('Limit of proportionality: 6 N. After loading to 10 N and unloading, the spring stays 2 cm longer: it also went past its elastic limit.')}
function drawLimit(){const top=strip(S.won?'Up to 6 N, F = k e. Beyond the limit of proportionality the line curves; past the elastic limit the spring is stretched for good.':'Load the spring to 10 N, 1 N at a time. Then tap the last point on the straight line.',S.won);
 const b={x:u(44),y:top+u(28),w:A.W-u(62),h:A.H-top-lowH()-u(96)};HKART.axes(X,b,90,10,10,1,'extension e / cm','force F / N',u(10));S.box=b;S.dots=[];
 X.setLineDash([5,4]);X.strokeStyle='#94a3b8';X.lineWidth=1.5;X.beginPath();X.moveTo(b.x,b.y+b.h);X.lineTo(b.x+b.w*40/90,b.y);X.stroke();X.setLineDash([]);
 const n=S.won?10:S.F;for(let F=0;F<=n;F++){const x=b.x+b.w*ext(F)/90,y=b.y+b.h-b.h*F/10;X.fillStyle=F<=6?C.a:C.b;X.beginPath();X.arc(x,y,u(5),0,7);X.fill();S.dots.push({x:x-u(14),y:y-u(14),w:u(28),h:u(28),F})}
 if(S.won){const x=b.x+b.w*24/90,y=b.y+b.h-b.h*.6;X.strokeStyle=C.mark;X.lineWidth=2;X.beginPath();X.arc(x,y,u(10),0,7);X.stroke();write('limit',x+u(14),y+u(2),11,C.mark,'left');
  X.fillStyle=C.mark;X.beginPath();X.arc(b.x+b.w*2/90,b.y+b.h,u(5),0,7);X.fill();write('unloaded: 2 cm left',b.x+b.w*.4,b.y+b.h-u(14),11,C.mark,'left')}
 write('dotted: straight-line rule',A.W/2,b.y+b.h+u(34),10,C.mute,'center',600)}
/* ---- step 4: pick a load ---- */
function setLoad(d){if(S.won)return;S.F=Math.max(0,Math.min(4,+(S.F+d).toFixed(1)));A.sound.tick();const e=S.F/40*100;
 if(Math.abs(e-5)<1e-6){S.won=true;return right('F = k e = 40 N/m × 0.05 m = 2 N. Four 0.5 N weights stretch it exactly 5 cm.')}S.bad=false;S.say=`F = ${S.F} N, so e = F ÷ k = ${S.F} ÷ 40 = ${(S.F/40).toFixed(4).replace(/0+$/,'')} m = ${cm(e)} cm.`;sync()}
function drawLoad(){const top=strip(S.won?'Work in metres: 5 cm = 0.05 m, so F = 40 × 0.05 = 2 N.':'This spring has k = 40 N/m. Add 0.5 N weights (tap the hanger) until it stretches exactly 5 cm.',S.won);
 const x=A.W*.4,y0=top+u(34),sc=(A.H-top-lowH()-u(110))/16,len=(8+S.F/40*100)*sc;HKART.spring(X,x,y0,len,u(14));
 const n=Math.round(S.F/.5);for(let i=0;i<Math.max(1,n);i++){card(x-u(20),y0+len+i*u(12),u(40),u(11),n?C.mass:'#cbd5e1',C.edge,1,3)}S.hang={x:x-u(40),y:y0+len-u(10),w:u(80),h:u(12)*Math.max(1,n)+u(20)};
 X.setLineDash([5,5]);X.strokeStyle=C.mark;X.lineWidth=1.5;[8,13].forEach((v,i)=>{const y=y0+v*sc;X.beginPath();X.moveTo(x+u(26),y);X.lineTo(A.W-u(20),y);X.stroke();write(i?'target: +5 cm':'unloaded',A.W-u(20),y-u(9),10,C.mark,'right',600)});X.setLineDash([]);
 write(`load ${S.F} N · extension ${cm(S.F/40*100)} cm`,A.W/2,A.H-lowH()-u(24),14,C.a)}
/* ---- frame ---- */
const which=()=>['ext','plot','k','limit','load','quiz'][A.step];let drag=null;
function down(p){const w=which();
 if(w==='ext'&&over(p,S.handle)){drag='br';return true}
 if(w==='plot'&&over(p,S.box)){if(!S.won)tapGraph(p);return true}
 if(w==='k'){if(over(p,S.handle)){drag='tri';return true}const r=(S.kHit||[]).find(r=>over(p,r));if(r){pickK(r.k);return true}}
 if(w==='limit'){const d=(S.dots||[]).find(r=>over(p,r));if(d&&S.F>=10){markAt(d.F);return true}if(over(p,S.box)){pile();return true}}
 if(w==='load'&&over(p,S.hang)){setLoad(.5);return true}return false}
function move(p){if(drag==='br'&&S.geo){bracket(Math.round((p.y-S.geo.y0-L0*S.geo.scale)/S.geo.scale*2)/2)}
 if(drag==='tri'&&S.box){slide(Math.round((p.x-S.box.x)/S.box.w*20)/100)}}
function up(){if(drag==='br'&&which()==='ext'&&S.F===3)checkExt();drag=null}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const w=which();if(w==='ext')drawExt();if(w==='plot')drawPlot();if(w==='k')drawK();if(w==='limit')drawLimit();if(w==='load')drawLoad();
 if(w==='quiz'){strip('F = k e, with e in metres and k in N/m, up to the limit of proportionality.');write('k = gradient = ΔF ÷ Δe',A.W/2,A.H*.5,16,C.a)}
 low();A.fx.draw(X)}
function sync(){const w=which();let d='Challenge.';
 if(w==='ext')d=`Load ${S.F} N, spring length ${cm(L0+ext(S.F))} cm, bracket ${cm(S.br)} cm from the unloaded end.`;
 if(w==='plot')d=`Force–extension graph with ${S.pts.length} of 6 points: ${S.pts.map(([e,F])=>F+' N at '+cm(e)+' cm').join(', ')||'none'}.`;
 if(w==='k')d=`Spring ${SPR[S.si].n}. Triangle: extension ${cm(S.tri*100)} cm, force ${(SPR[S.si].k*S.tri).toFixed(1)} N.`;
 if(w==='limit')d=`Load ${S.F} N. Extensions so far: ${Array.from({length:S.F+1},(_,F)=>cm(ext(F))).join(', ')} cm.`;
 if(w==='load')d=`k = 40 N/m. Load ${S.F} N, extension ${cm(S.F/40*100)} cm.`;
 speak((S.say?S.say+' ':'')+d);keys();S.after()}
function keys(){if(!btns)return;btns.innerHTML='';const w=which(),add=(l,f,a)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':a||null},btns,l).onclick=f};
 if(w==='ext'&&!S.won){add('Add 1 N',()=>load(1));add('Remove 1 N',()=>load(-1));add('Bracket +0.5 cm',()=>bracket(S.br+.5));add('Bracket −0.5 cm',()=>bracket(S.br-.5));add('Check',checkExt,'Check the extension')}
 if(w==='plot'&&!S.won){add('Plot extension',()=>plot(false),'Plot the next point at its extension');add('Plot length',()=>plot(true),'Plot the next point at its total length')}
 if(w==='k'&&!S.won){add('Triangle bigger',()=>slide(+(S.tri+.02).toFixed(2)));add('Triangle smaller',()=>slide(+(S.tri-.02).toFixed(2)));KOPT.forEach(([k,l])=>add(l,()=>pickK(k),'k equals '+l))}
 if(w==='limit'&&!S.won){add('Add 1 N',pile,'Add 1 newton');if(S.F>=10)for(let F=4;F<=8;F++)add(`Limit at ${F} N`,()=>markAt(F))}
 if(w==='load'&&!S.won){add('Add 0.5 N',()=>setLoad(.5));add('Remove 0.5 N',()=>setLoad(-.5))}A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=++seq;fns.forEach((f,j)=>setTimeout(()=>{if(id===seq)f()},(j+1)*(A.reduced()?30:ms)))};
function zero(){seq++;Object.assign(S,{after:()=>{},won:false,say:'',bad:false,F:0,br:0,pts:[],si:0,tri:.08,got:[]})}
const steps=[
{h:'Extension',p:'Extension is how much longer the spring gets: new length minus original length.',
predict:{q:'A 10 cm spring is 22 cm long with 3 N on it. What is its extension?',opts:['12 cm','22 cm','3 cm'],ans:0},
task:'Hang 3 N and show the extension',show:()=>{steps[0].go();demo([()=>load(1),()=>load(1),()=>load(1),()=>bracket(12),checkExt],500)},go:()=>{zero();sync();S.after=ok(0,()=>S.won,'e = 12 cm.')}},
{h:'Plot the graph',p:'Force goes up the side and extension along the bottom. Plot each row of the table.',
predict:{q:'1 N stretches the spring 4 cm. How far does 5 N stretch it?',opts:['20 cm','14 cm','9 cm'],ans:0},
task:'Plot all six points',show:()=>{steps[1].go();demo(Array.from({length:6},()=>()=>plot(false)),420)},go:()=>{zero();sync();S.after=ok(1,()=>S.won,'A straight line through 0.')}},
{h:'Gradient = k',p:'The spring constant k is the force per metre of extension. On this graph it is the gradient.',
predict:{q:'Which spring is stiffer?',opts:['B, the steeper line','A, the shallower line','They are the same'],ans:0},
task:'Find k for spring A and spring B',show:()=>{steps[2].go();demo([()=>pickK(25),()=>pickK(50)],900)},go:()=>{zero();sync();S.after=ok(2,()=>S.won,'25 and 50 N/m.')}},
{h:'Too far',p:'Hooke’s law only works up to the limit of proportionality. Keep loading and watch.',
predict:{q:'Will the graph stay straight if you keep adding weight?',opts:['No: past a limit it curves','Yes: F = k e always works','It gets steeper'],ans:0},
task:'Load to 10 N and find the limit',show:()=>{steps[3].go();demo(Array.from({length:10},()=>pile).concat([()=>markAt(6)]),300)},go:()=>{zero();sync();S.after=ok(3,()=>S.won,'Limit at 6 N.')}},
{h:'Use F = k e',p:'Put the extension in metres, then multiply by k to find the force.',
task:'Stretch the spring exactly 5 cm',show:()=>{steps[4].go();demo([1,2,3,4].map(()=>()=>setLoad(.5)),600)},go:()=>{zero();sync();S.after=ok(4,()=>S.won,'2 N.')}},
{h:'Challenge',p:'',go:()=>{zero();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const BANK=HKART.bank;
function why(tag){let m='Use F = k e with e in metres. Extension is new length minus original length.';
 if(tag==='cmMetre')m='Convert centimetres to metres before using F = k e: 10 cm = 0.1 m. With k in N/m the extension must be in metres.';
 if(tag==='divide')m='F = k × e, so multiply. Dividing e by k gives a tiny number with the wrong units.';
 if(tag==='lengthNotExt')m='That is the new length. Extension = new length − original length.';
 if(tag==='forceNotExt')m='The force and the extension are different quantities. Measure the stretch in centimetres from the original length.';
 if(tag==='upsideDown')m='Gradient = rise ÷ run = force ÷ extension when force is on the vertical axis. 2 N ÷ 0.04 m = 50 N/m.';
 if(tag==='alwaysLinear')m='F = k e only holds up to the limit of proportionality. After that the extension grows faster and the graph curves.';
 if(tag==='stopsStretch')m='The spring keeps stretching, but more per newton than before, so the line curves away from straight.';
 if(tag==='stiffBackwards')m='A bigger k means more force for each metre of stretch, so the spring with k = 80 N/m is stiffer.';
 if(tag==='addNotScale')m='Below the limit extension is proportional to force: 6 N is 1.5 × 4 N, so the extension is 1.5 × 8 cm = 12 cm.';
 return m}
function quiz(){qn++;const [q,r,ws]=BANK[qn%BANK.length],all=[[r,'ok']].concat(ws),s=qn%3,ord=all.slice(s).concat(all.slice(0,s));
 chq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chq.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,r)});speak('Challenge: '+q);A.redraw()}
let st=0;
function judge(tag,r){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),good=tag==='ok';
 if(good){st++;A.win()}else{st=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+r+'. Streak: '+st+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{chq.hidden=B.step!==5;btns.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spring lab buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
