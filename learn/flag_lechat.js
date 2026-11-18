/* Flagship: Shifting equilibrium, Le Chatelier's principle (ages 16–18; AQA A-level Chemistry 3.1.6.1, OCR A 3.2.3).
   N2 + 3H2 ⇌ 2NH3 (ΔH = −92 kJ/mol) solved exactly at constant volume. ln Kp is fitted through the ideal-gas
   values 1.64e-4 atm⁻² (400 °C) and 1.45e-5 atm⁻² (500 °C); Kc = Kp (RT)². */
(()=>{
const R=0.08206,lnK673=Math.log(1.64e-4),SLOPE=12617;
const Kp=T=>Math.exp(lnK673+SLOPE*(1/T-1/673)),Kc=T=>Kp(T)*Math.pow(R*T,2);
const Qc=(n,V)=>Math.pow(n.A/V,2)/((n.N/V)*Math.pow(n.H/V,3));
// constant-volume equilibrium: bisect for the extent x with Q(x) = Kc
function settle(n,V,T){const lk=Math.log(Kc(T)),f=x=>2*Math.log(n.A+2*x)+2*Math.log(V)-Math.log(n.N-x)-3*Math.log(n.H-3*x)-lk;
 let lo=-n.A/2+1e-9,hi=Math.min(n.N,n.H/3)-1e-9;for(let i=0;i<80;i++){const m=(lo+hi)/2;if(f(m)>0)hi=m;else lo=m}const x=(lo+hi)/2;return{N:n.N-x,H:n.H-3*x,A:n.A+2*x}}
const tot=n=>n.N+n.H+n.A,pres=(n,V,T)=>tot(n)*R*T/V,pctA=n=>100*n.A/tot(n);
// 1:3 feed at P atm: NH3 mole fraction y solves y/(1-y)² = P√(27Kp/256)
function yieldAt(Tc,P){const s=P*Math.sqrt(27*Kp(Tc+273)/256);return((2*s+1)-Math.sqrt(4*s+1))/(2*s)}
const rateAt=Tc=>Math.exp(-1e5/8.314*(1/(Tc+273)-1/723));   // model rate relative to 450 °C, Ea taken as 100 kJ/mol
const fmt=(v,d)=>v.toFixed(d==null?2:d);
VIS.reg('flaglechat',c=>{let A,pad,qa,qn=-1;const Z={};
const view=()=>['conc','temp','press','cat','haber','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const sm=()=>A.narrow?12:13,md=()=>A.narrow?13:15;
function ink(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||600} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
function lines(t,y,px){const g=A.ctx,out=[''];g.font=`600 ${px}px system-ui,sans-serif`;t.split(' ').forEach(w=>{const i=out.length-1,s=(out[i]+' '+w).trim();if(g.measureText(s).width>A.W-24&&out[i])out.push(w);else out[i]=s});out.slice(0,3).forEach((s,j)=>ink(s,A.W/2,y+j*(px+4),px))}
function fresh(o){for(const k in Z)delete Z[k];const T=723,V=1;Object.assign(Z,{T,V,n:settle({N:1,H:3,A:0},V,T),shown:null,note:'',did:{},drag:null,runs:[],pt:{T:550,P:100},after:()=>{}},o||{});Z.shown={...Z.n};A.redraw()}
// glide the drawn amounts to the new equilibrium
function shiftTo(target,msg,good){Z.n=target;Z.moving=true;A.tween(Z.shown,{N:target.N,H:target.H,A:target.A},A.reduced()?1:900,'io',()=>{Z.moving=false;tell(msg,good)})}
function tell(t,good){Z.note=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();speak(t);buttons();A.redraw();Z.after()}
/* ---------- layout ---------- */
function box(){const W=A.W,H=A.H;return A.narrow?{f:{x:16,y:H*.1,w:W*.42,h:H*.4},b:{x:W*.52,y:H*.1,w:W*.44,h:H*.36},q:{x:20,y:H*.6,w:W-40}}:{f:{x:20,y:H*.1,w:W*.3,h:H*.62},b:{x:W*.4,y:H*.1,w:W*.34,h:H*.5},q:{x:W*.4,y:H*.72,w:W*.56}}}
const thermo=()=>{const f=box().f;return{x:f.x+f.w+(A.narrow?10:18),y0:f.y+10,y1:f.y+f.h-10}};
const Tof=y=>{const t=thermo();return Math.round(350+200*(t.y1-y)/(t.y1-t.y0))},yOfT=Tc=>{const t=thermo();return t.y1-(Tc-350)/200*(t.y1-t.y0)};
const pistonY=()=>{const f=box().f;return f.y+f.h*(1-Z.V/2.2)};
function drawFlask(g){const C=A.col,B=box(),f=B.f,py=pistonY(),s=Z.shown;g.fillStyle=A.mix(C.pn,C.cy,C.dark?.12:.07);A.paint.rrect(f.x,py,f.w,f.y+f.h-py,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(f.x,f.y,f.w,f.h);
 g.fillStyle=C.mu;g.fillRect(f.x-4,py-8,f.w+8,8);g.fillRect(f.x+f.w/2-4,f.y-14,8,py-f.y+6);
 // 8 dots per mole, at fixed pseudo-random spots
 const put=(m,col,r,seed)=>{const k=Math.round(m*8);for(let i=0;i<k;i++){const u=(Math.sin((i+1)*12.9898+seed)*43758.5453)%1,v=(Math.sin((i+1)*78.233+seed)*12543.123)%1;g.fillStyle=col;g.beginPath();g.arc(f.x+8+Math.abs(u)*(f.w-16),py+8+Math.abs(v)*(f.y+f.h-py-16),r,0,7);g.fill()}};
 put(s.N,C.cy,4,1);put(s.H,C.mu,2.6,2);put(s.A,C.vi,5,3);
 ink(`${fmt(Z.V)} dm³ · ${Math.round(Z.T-273)} °C · ${Math.round(pres(s,Z.V,Z.T))} atm`,f.x+f.w/2,f.y+f.h+16,sm(),{max:f.w+60,col:C.mu})}
function drawBars(g){const C=A.col,b=box().b,s=Z.shown,cols=[['N₂',s.N,C.cy],['H₂',s.H,C.mu],['NH₃',s.A,C.vi]],bw=b.w/3-12,top=4;
 cols.forEach(([nm,v,col],j)=>{const x=b.x+j*(bw+12)+6,h=Math.min(1,v/top)*(b.h-34);g.fillStyle=col;g.fillRect(x,b.y+b.h-20-h,bw,h);ink(nm,x+bw/2,b.y+b.h-8,md(),{w:700});ink(fmt(v),x+bw/2,b.y+b.h-28-h,sm())});
 ink(`NH₃ = ${fmt(pctA(s),1)}% of the gas`,b.x+b.w/2,b.y-4,md(),{w:700,col:C.vi})}
// log Q/K gauge
function drawGauge(g){const C=A.col,q=box().q,r=Qc(Z.shown,Z.V)/Kc(Z.T),u=Math.max(0,Math.min(1,.5+Math.log10(r)/4)),y=q.y+14;
 g.fillStyle=A.alpha(C.mu,.18);A.paint.rrect(q.x,y-6,q.w,12,6);g.fill();g.fillStyle=C.gr;g.fillRect(q.x+q.w/2-1,y-10,2,20);
 g.fillStyle=Math.abs(u-.5)<.01?C.gr:C.am;g.beginPath();g.arc(q.x+u*q.w,y,8,0,7);g.fill();
 ink('Q < K: goes right →',q.x,y+20,sm(),{al:'left',col:C.mu});ink('← goes left: Q > K',q.x+q.w,y+20,sm(),{al:'right',col:C.mu});ink(`Kc = ${Kc(Z.T).toPrecision(2)}`,q.x+q.w/2,y-18,md(),{w:700})}
function drawThermo(g){const C=A.col,t=thermo(),y=yOfT(Z.T-273);g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(t.x-6,t.y0-6,12,t.y1-t.y0+12,6);g.stroke();g.fillStyle=C.rd;g.fillRect(t.x-3,y,6,t.y1-y+4);g.beginPath();g.arc(t.x,y,9,0,7);g.fill()}
function drawCat(g){const C=A.col,b={x:40,y:A.H*.12,w:A.W-60,h:A.H*.5};g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x,b.y+b.h);g.lineTo(b.x+b.w,b.y+b.h);g.stroke();
 ink('NH₃ %',b.x-6,b.y-10,12,{al:'left',col:C.mu});ink('time →',b.x+b.w-30,b.y+b.h+14,12,{col:C.mu});const eq=pctA(Z.n),Y=p=>b.y+b.h-p/40*b.h;
 g.setLineDash([5,4]);g.strokeStyle=C.gr;g.beginPath();g.moveTo(b.x,Y(eq));g.lineTo(b.x+b.w,Y(eq));g.stroke();g.setLineDash([]);ink(`equilibrium ${fmt(eq,1)}%`,b.x+b.w-4,Y(eq)-10,12,{al:'right',col:C.gr});
 Z.runs.forEach(run=>{g.strokeStyle=run.cat?C.vi:C.am;g.lineWidth=3;g.beginPath();for(let i=0;i<=run.u*100;i++){const t=i/100,p=eq*(1-Math.exp(-(run.cat?9:1.6)*t));i?g.lineTo(b.x+t*b.w,Y(p)):g.moveTo(b.x,Y(p))}g.stroke();
  ink(run.cat?'with iron catalyst':'no catalyst',b.x+b.w*(run.cat?.18:.62),Y(eq*(run.cat?.97:.75))+16,12,{w:700,col:run.cat?C.vi:C.am})})}
const map=()=>({x:44,y:A.H*.08,w:A.W-64,h:A.H*.56});const mx=Tc=>{const m=map();return m.x+(Tc-300)/300*m.w},my=P=>{const m=map();return m.y+m.h-(P-50)/300*m.h};
const ok=pt=>({y:yieldAt(pt.T,pt.P),r:rateAt(pt.T),P:pt.P});
function drawMap(g){const C=A.col,m=map();for(let i=0;i<30;i++)for(let j=0;j<20;j++){const T=300+i*10+5,P=50+j*15+7.5,y=yieldAt(T,P);g.fillStyle=A.alpha(C.vi,Math.min(.85,y*1.6));g.fillRect(mx(T-5),my(P+7.5),m.w/30+1,m.h/20+1)}
 g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(m.x,m.y,m.w,m.h);[300,400,500,600].forEach(T=>ink(T+'°',mx(T),m.y+m.h+12,11,{col:C.mu}));[50,150,250].forEach(P=>ink(String(P),m.x-16,my(P),11,{col:C.mu}));ink('atm',m.x-16,m.y+4,11,{col:C.mu});
 g.strokeStyle=C.rd;g.setLineDash([6,4]);g.beginPath();g.moveTo(m.x,my(250));g.lineTo(m.x+m.w,my(250));g.stroke();g.setLineDash([]);ink('cost limit 250 atm',m.x+m.w-4,my(250)-9,11,{al:'right',col:C.rd,w:700});
 const p=Z.pt,v=ok(p);g.fillStyle=C.am;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(mx(p.T),my(p.P),10,0,7);g.fill();g.stroke();
 ink(`${p.T} °C, ${p.P} atm → yield ${fmt(v.y*100,0)}%, rate ×${fmt(v.r,2)}`,A.W/2,m.y+m.h+30,md(),{w:700})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=view();if(!Z.n)return;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(k==='chal'){ink('N₂ + 3H₂ ⇌ 2NH₃   ΔH = −92 kJ/mol',W/2,H*.4,A.narrow?15:19,{w:700});ink('Answer below',W/2,H*.52,13,{col:C.mu});A.fx.draw(g);return}
 if(k==='cat')drawCat(g);else if(k==='haber')drawMap(g);else{drawFlask(g);drawBars(g);drawGauge(g);if(k==='temp')drawThermo(g)}
 if(Z.note)lines(Z.note,H*(k==='haber'?.78:k==='cat'?.72:A.narrow?.76:.86),md());A.fx.draw(g)}
/* ---------- actions ---------- */
function addN2(){if(Z.moving)return;Z.n={...Z.n,N:Z.n.N+1};Z.shown={...Z.n};Z.did.add=1;A.redraw();const t=settle(Z.n,Z.V,Z.T);
 tell('Added 1 mol N₂: Q is now below K.');setTimeout(()=>shiftTo(t,`Shifted right: H₂ fell to ${fmt(t.H)} mol and NH₃ rose to ${fmt(t.A)} mol, using up some of the added N₂. K did not change.`,true),A.reduced()?10:350)}
function condense(){if(Z.moving)return;Z.n={...Z.n,A:0.0001};Z.shown={...Z.n};Z.did.cool=1;A.redraw();const t=settle(Z.n,Z.V,Z.T);
 tell('NH₃ removed: Q is far below K.');setTimeout(()=>shiftTo(t,`Shifted right: ${fmt(t.A)} mol NH₃ formed again to replace it.`,true),A.reduced()?10:350)}
function heat(Tc){if(Z.moving)return;const was=pctA(Z.n);Z.T=Tc+273;if(Tc>=525)Z.did.hot=1;if(Tc<=375)Z.did.cold=1;const t=settle(Z.n,Z.V,Z.T);
 shiftTo(t,`${Tc} °C: Kc is now ${Kc(Z.T).toPrecision(2)}. NH₃ ${pctA(t)<was?'fell':'rose'} to ${fmt(pctA(t),1)}%. ${Tc>450?'Heating favours the endothermic backward reaction.':'Cooling favours the exothermic forward reaction.'}`,true)}
function squeeze(V){if(Z.moving)return;const was=pctA(Z.n);Z.V=Math.max(.4,Math.min(2,V));if(Z.V<=.55)Z.did.small=1;if(Z.V>=1.5)Z.did.big=1;const t=settle(Z.n,Z.V,Z.T);
 shiftTo(t,`${fmt(Z.V)} dm³, ${Math.round(pres(t,Z.V,Z.T))} atm: NH₃ ${pctA(t)>=was?'rose':'fell'} to ${fmt(pctA(t),1)}%. ${pctA(t)>=was?'More pressure: shift to fewer gas molecules (2 vs 4).':'Less pressure: shift to more gas molecules.'} K is unchanged.`,true)}
function race(cat){if(Z.runs.some(r=>r.cat===cat))return;const run={cat,u:0};Z.runs.push(run);A.tween(run,{u:1},A.reduced()?1:1200,'io',()=>{Z.did[cat?'cat':'plain']=1;
 tell(cat?'With iron it rises much faster but levels off at the same height: same yield, sooner.':'Without a catalyst it climbs slowly to the equilibrium line.',true)})}
function place(T,P){Z.pt={T:Math.max(300,Math.min(600,Math.round(T/5)*5)),P:Math.max(50,Math.min(350,Math.round(P/10)*10))};A.redraw();judgeMap(true)}
// name the failing condition: yield, rate or cost
function judgeMap(quiet){const v=ok(Z.pt);let m='';
 if(v.P>250)m=`${v.P} atm gives more NH₃, but the pipes and pumps cost too much. Stay under 250 atm.`;else if(v.y<.2)m=`Yield only ${fmt(v.y*100,0)}%: ${Z.pt.T>=450?'too hot, the equilibrium lies to the left':'too little pressure'}. Aim for 20% or more.`;
 else if(v.r<.5)m=`Yield ${fmt(v.y*100,0)}% is good, but at ${Z.pt.T} °C the rate is only ×${fmt(v.r,2)}: too slow, even with iron.`;
 if(m){Z.did.map=0;return quiet?(Z.note=m,speak(m),A.redraw()):tell(m,false)}Z.did.map=1;tell(`${Z.pt.T} °C and ${Z.pt.P} atm: ${fmt(v.y*100,0)}% at equilibrium, fast enough and affordable. Real plants use about 450 °C and 200 atm.`,true)}
function buttons(){if(!pad||!Z.n)return;pad.innerHTML='';const k=view();if(k==='chal')return;const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':lab||t},pad,t).onclick=f};
 if(k==='conc'){add('Add 1 mol N₂',addN2);add('Condense out the NH₃',condense)}
 if(k==='temp')[350,400,450,500,550].forEach(t=>add(t+' °C',()=>heat(t),`Set ${t} degrees Celsius`));
 if(k==='press'){add('Squeeze to 0.5 dm³',()=>squeeze(.5));add('Back to 1 dm³',()=>squeeze(1));add('Expand to 2 dm³',()=>squeeze(2))}
 if(k==='cat'){add('Start: no catalyst',()=>race(false));add('Start: with iron catalyst',()=>race(true))}
 if(k==='haber'){[[-25,0,'Cooler −25 °C'],[25,0,'Hotter +25 °C'],[0,50,'Pressure +50 atm'],[0,-50,'Pressure −50 atm']].forEach(([dT,dP,t])=>add(t,()=>place(Z.pt.T+dT,Z.pt.P+dP)));add('Check these conditions',()=>judgeMap(false))}}
// canvas: drag piston, thermometer or map point; tap the flask to add N2
function down(p){const k=view();if(k==='chal'||Z.moving)return false;const f=box().f;
 if(k==='press'&&p.x>f.x-10&&p.x<f.x+f.w+10&&Math.abs(p.y-pistonY())<30){Z.drag='piston';return true}
 if(k==='temp'){const t=thermo();if(Math.abs(p.x-t.x)<28&&p.y>t.y0-20&&p.y<t.y1+20){Z.drag='thermo';move(p);return true}}
 if(k==='haber'){const m=map();if(p.x>m.x&&p.x<m.x+m.w&&p.y>m.y&&p.y<m.y+m.h){Z.drag='pt';move(p);return true}}
 if(k==='conc'&&p.x>f.x&&p.x<f.x+f.w&&p.y>f.y&&p.y<f.y+f.h){addN2();return true}return false}
function move(p){const f=box().f;if(Z.drag==='piston'){Z.V=Math.max(.4,Math.min(2,2.2*(1-(p.y-f.y)/f.h)));Z.shown={...Z.n};A.redraw();speak(`Volume ${fmt(Z.V)} cubic decimetres`)}
 if(Z.drag==='thermo'){const T=Math.max(350,Math.min(550,Tof(p.y)));Z.Tdrag=T;Z.T=T+273;A.redraw();speak(`${T} degrees Celsius`)}
 if(Z.drag==='pt'){const m=map();Z.pt={T:Math.round((300+(p.x-m.x)/m.w*300)/5)*5,P:Math.round((50+(m.y+m.h-p.y)/m.h*300)/10)*10};A.redraw()}}
function up(){const d=Z.drag;Z.drag=null;if(d==='piston')squeeze(Z.V);if(d==='thermo')heat(Math.round(Z.Tdrag/25)*25);if(d==='pt')place(Z.pt.T,Z.pt.P)}
const finish=(i,test,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&test())A.done(line+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?40*(j+1):(j+1)*(gap||1300)))}
function open(i,hint,test,line){fresh();tell(hint);Z.after=finish(i,test,line)}
const steps=[
{h:'Change a concentration',p:'Le Chatelier: change a system at equilibrium and the position shifts to oppose the change. Add a reactant: Q drops below K, so the forward reaction runs until Q = K again.',
 predict:{q:'You add more N₂ to the equilibrium mixture. The position of equilibrium…',opts:['shifts left, to make room for the extra N₂','shifts right, using up some of the added N₂','does not move, because K stays the same'],ans:1},
 task:'Add N₂, then condense out the NH₃',show:()=>auto(0,[addN2,condense],1500),
 go:()=>open(0,'Tap the flask or the button to add N₂.',()=>Z.did.add&&Z.did.cool,'Adding a reactant or removing a product shifts the position right; K is unchanged.')},
{h:'Change the temperature',p:'The forward reaction is exothermic. Heating favours the endothermic direction (backward). Temperature is the only change that alters the value of K.',
 predict:{q:'You heat the mixture from 450 °C to 550 °C. The amount of NH₃ at equilibrium…',opts:['rises, because hotter reactions go faster','falls, because the endothermic backward reaction is favoured','stays the same, only the rate changes'],ans:1},
 task:'Drag the thermometer up to 550 °C, then down to 350 °C',show:()=>auto(1,[()=>heat(550),()=>heat(350)]),
 go:()=>open(1,'Drag the red thermometer, or tap a temperature.',()=>Z.did.hot&&Z.did.cold,'Hot: K smaller, less NH₃. Cold: K larger, more NH₃.')},
{h:'Change the pressure',p:'Squeezing the gas raises the pressure. The equilibrium shifts towards the side with fewer gas molecules: 4 on the left (1 N₂ + 3 H₂), 2 on the right.',
 predict:{q:'You halve the volume, so the pressure rises. The yield of NH₃…',opts:['rises: the shift is to fewer gas molecules','falls: more pressure pushes molecules apart','stays the same: K has not changed'],ans:0},
 task:'Drag the piston down to 0.5 dm³, then up to 2 dm³',show:()=>auto(2,[()=>squeeze(.5),()=>squeeze(2)]),
 go:()=>open(2,'Drag the piston, or use the buttons.',()=>Z.did.small&&Z.did.big,'High pressure, more NH₃; low pressure, less. K is the same throughout.')},
{h:'Add a catalyst',p:'Iron speeds up both directions by the same factor. Start a fresh 1 : 3 mix with and without iron.',
 predict:{q:'Adding an iron catalyst makes the equilibrium yield of NH₃…',opts:['bigger','the same, but reached sooner','smaller'],ans:1},
 task:'Start one run without and one with the catalyst',show:()=>auto(3,[()=>race(false),()=>race(true)],1400),
 go:()=>open(3,'Start a run.',()=>Z.did.cat&&Z.did.plain,'A catalyst changes how fast, not how far.')},
{h:'The Haber compromise',p:'Low temperature and high pressure give the most NH₃, but cold is slow and high pressure is costly. Find conditions good enough on all three.',
 predict:{q:'Low temperature gives the most NH₃. Why do plants run at about 450 °C?',opts:['the yield is higher when hot','at low temperature the rate is too slow','the catalyst only works below 200 °C'],ans:1},
 task:'Find conditions with yield ≥ 20%, rate ≥ ×0.5 and pressure ≤ 250 atm',show:()=>auto(4,[()=>place(450,200)],600),
 go:()=>open(4,'Drag the point, or use the buttons.',()=>Z.did.map,'A compromise: yield, rate and cost all count.')},
{h:'Challenge',p:'Predict the shift for these equilibria.',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.after()});
const QS=[
 ['2NO₂ (brown) ⇌ N₂O₄ (colourless), ΔH = −57 kJ/mol. You cool the mixture. It turns…',[['paler: the shift is right','ok'],['darker brown','temp'],['no change in colour','K']]],
 ['H₂(g) + I₂(g) ⇌ 2HI(g). You raise the pressure. The position…',[['does not move: 2 gas molecules each side','ok'],['shifts right','gas'],['shifts left','gas']]],
 ['N₂O₄ ⇌ 2NO₂ is endothermic in the forward direction. You heat it. The position…',[['shifts right: more NO₂','ok'],['shifts left','temp'],['does not move','K']]],
 ['You add a catalyst to an equilibrium mixture. The position…',[['does not move','ok'],['shifts right, more product','cat'],['shifts left, less product','cat']]],
 ['In the Haber process, NH₃ is removed as it forms. The equilibrium…',[['shifts right','ok'],['shifts left','conc'],['stays put, but K increases','Kconc']]],
 ['CaCO₃(s) ⇌ CaO(s) + CO₂(g) in a closed container. You raise the pressure. The position…',[['shifts left','ok'],['shifts right','gas'],['does not move, solids are not affected','gas']]],
 ['Why is the Haber process not run at 200 °C, where the yield is higher?',[['the rate would be far too slow','ok'],['the yield is higher at 450 °C','temp'],['there is no equilibrium at 200 °C','eq']]]];
function why(t){let m='Ask what was changed, then which direction opposes it.';
 if(t==='temp')m='Heating favours the endothermic direction and cooling favours the exothermic one. Check the sign of ΔH for the forward reaction.';
 if(t==='gas')m='Count gas molecules only, on each side. Higher pressure shifts towards fewer gas molecules; equal numbers means no shift.';
 if(t==='K')m='A temperature change does shift the position. It is the one change that alters K itself.';
 if(t==='Kconc')m='Concentration and pressure changes move the position but leave K unchanged at a fixed temperature. Only temperature changes K.';
 if(t==='cat')m='A catalyst speeds up both directions equally. Equilibrium is reached sooner, but the position and yield are unchanged.';
 if(t==='conc')m='Removing a product makes Q smaller than K, so the forward reaction runs until Q = K again: a shift to the right.';
 if(t==='eq')m='There is still an equilibrium at 200 °C, with more NH₃. It is just reached far too slowly to be useful.';
 return m}
function next(){qn++;const Q=QS[qn%QS.length],r=qn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn sm'},row,v).onclick=()=>mark(t)});speak('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),good=t==='ok';
 if(good)A.win();else A.sound.miss();fb.innerHTML=(good?'✓ Correct.':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{fresh();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
