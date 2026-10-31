/* Flagship – temperature and particle motion (12–13): heat a gas, freeze it to see a spread of speeds, match motion
   in solid, liquid and gas, split temperature from thermal energy, and bring hot and cold blocks to equilibrium. */
(()=>{
const MUL=[.32,.45,.55,.62,.7,.76,.82,.86,.9,.94,.97,1,1,1.03,1.06,1.1,1.13,1.17,1.21,1.25,1.3,1.35,1.41,1.48,1.56,1.66,1.8];
const STATES=[['Vibrate about fixed places, touching','Solid'],['Touching, but slide past each other','Liquid'],['Far apart, fast, in all directions','Gas']];
const POTS=[['Higher temperature',0],['Faster particles on average',0],['More particles',1],['More thermal energy stored in total',1],['Could melt more ice',1]];
const PAIRS=[[60,20],[90,30]],TMIN=-50,TMAX=120;
VIS.reg('flagtemp',c=>{let A,pad,qbox,qi=-1,ver=0;
const fresh=()=>({want:()=>{},won:0,r:0,T:20,hit:[0,0],P:[],frozen:0,picked:[],ci:0,bad:-1,drag:null,blk:{x:0},touch:0,Th:60,Tc:20,eq:0}),S=fresh();
const mode=()=>['heat','spread','states','pots','touch','quiz'][A.step],fast=()=>A.reduced(),need=()=>({heat:2,spread:3,states:3,pots:5,touch:2}[mode()]||9);
const fz=n=>Math.round(n*(A.narrow?1:1.12)),voice=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function lab(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-10)}
const K=t=>t+273,vScale=t=>Math.sqrt(K(t)/293);
const inB=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,box=()=>({x:A.W*.04,y:A.H*.1,w:A.W*.74,h:A.H*.66});
/* particles: fixed speed multipliers so every run shows the same spread; directions random */
function seed(n){const b=box();S.P=MUL.slice(0,n||MUL.length).map((m,i)=>{const a=Math.random()*6.283;return{x:b.x+12+Math.random()*(b.w-24),y:b.y+12+Math.random()*(b.h-24),dx:Math.cos(a),dy:Math.sin(a),m,i}})}
function stepGas(dt){const b=box(),base=Math.min(A.W,600)*.22*vScale(S.T);for(const p of S.P){p.x+=p.dx*p.m*base*dt;p.y+=p.dy*p.m*base*dt;
 if(p.x<b.x+7){p.x=b.x+7;p.dx=Math.abs(p.dx)}if(p.x>b.x+b.w-7){p.x=b.x+b.w-7;p.dx=-Math.abs(p.dx)}if(p.y<b.y+7){p.y=b.y+7;p.dy=Math.abs(p.dy)}if(p.y>b.y+b.h-7){p.y=b.y+b.h-7;p.dy=-Math.abs(p.dy)}}}
const heatCol=m=>m<.8?'#2563eb':m<1.2?'#a855f7':'#ea580c';
function drawGas(g){const b=box(),C=A.col;g.fillStyle=A.alpha(C.mu,.1);A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke();
 for(const p of S.P){const tail=p.m*vScale(S.T)*16;if(S.frozen){g.strokeStyle=heatCol(p.m);g.lineWidth=3;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-p.dx*tail,p.y-p.dy*tail);g.stroke()}
  A.paint.ball(p.x,p.y,7,heatCol(p.m));if(S.picked.includes(p.i)){g.strokeStyle=C.gr;g.lineWidth=4;g.beginPath();g.arc(p.x,p.y,13,0,7);g.stroke()}if(S.bad===p.i){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(p.x,p.y,13,0,7);g.stroke()}}
 thermo(g,A.W*.85,b.y,b.h,S.T);const ke=K(S.T)/K(TMAX),bx=b.x,by=b.y+b.h+14,bw=b.w;g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(bx,by,bw,14,7);g.fill();g.fillStyle=C.or;A.paint.rrect(bx,by,Math.max(8,bw*ke),14,7);g.fill();
 lab(g,`Average kinetic energy ∝ ${K(S.T)} K`,bx+bw/2,by+30,12,C.tx,700)}
function thermo(g,x,y,h,t){const C=A.col,w=Math.min(A.W*.06,30),f=(t-TMIN)/(TMAX-TMIN);g.fillStyle=A.alpha(C.mu,.2);A.paint.rrect(x,y,w,h,w/2);g.fill();g.strokeStyle=C.mu;g.lineWidth=2;A.paint.rrect(x,y,w,h,w/2);g.stroke();
 g.fillStyle=C.rd;A.paint.rrect(x+4,y+h-(h-8)*f-4,w-8,(h-8)*f,(w-8)/2);g.fill();lab(g,`${Math.round(t)} °C`,x+w/2,y+h+16,12,C.tx,800)}
/* ---- 1 heat it up ---- */
const GOALS=[[100,'Heat the gas to 100 °C or more'],[-20,'Now cool it to −20 °C or less']];
function setT(t){if(mode()!=='heat'&&mode()!=='spread')return;S.T=Math.max(TMIN,Math.min(TMAX,Math.round(t)));if(mode()!=='heat')return A.redraw();const k=S.won;
 if(k===0&&S.T>=100){S.won=1;A.sound.pop();voice(`${S.T} °C: faster on average, not bigger. ${GOALS[1][1]}.`);keys();A.redraw();return}
 if(k===1&&S.T<=-20){S.won=2;A.sound.pop();voice(`${S.T} °C: slower on average, but still moving. ${K(S.T)} K is well above absolute zero, 0 K.`);keys();A.redraw();return S.want()}
 voice(`${S.T} °C (${K(S.T)} K): average speed ×${vScale(S.T).toFixed(2)} of 20 °C.`);A.redraw()}
/* ---- 2 a spread of speeds ---- */
function freeze(){if(mode()!=='spread'||S.frozen)return;S.frozen=1;A.sound.tick();voice('Frozen at 100 °C. Long tail means fast, short tail slow. Tap a slow one.');keys();A.redraw()}
function pickP(i){if(mode()!=='spread'||!S.frozen||S.won>=need())return;const p=S.P.find(q=>q.i===i);if(!p||S.picked.includes(i))return;
 if(p.m>=.8){S.bad=i;A.redraw();return nope(p.m>1.2?'Long tail: one of the fastest. Look for a short tail.':'About average speed. Find a really short tail.')}
 S.picked.push(i);S.won++;A.sound.tick();voice(S.won>=need()?'Three slow particles in a gas at 100 °C. Temperature measures the average kinetic energy, not every particle.':`Yes, a slow one. ${need()-S.won} more.`);keys();A.redraw();S.want()}
const slowNext=()=>{const p=S.P.find(q=>q.m<.8&&!S.picked.includes(q.i));if(p)pickP(p.i)};
/* ---- 3 solid, liquid, gas ---- */
function stBox(k){const w=(A.W-40)/3;return{x:12+k*(w+8),y:A.H*.06,w,h:A.H*.48}}
function drawStates(g){const C=A.col,t=performance.now()/1000;['Solid','Liquid','Gas'].forEach((n,k)=>{const r=stBox(k);g.fillStyle=A.alpha(C.mu,.1);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=S.bad===k?C.rd:C.mu;g.lineWidth=S.bad===k?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();
  lab(g,n,r.x+r.w/2,r.y+r.h+14,13,C.tx,800);const R=Math.min(r.w/14,8);
  for(let i=0;i<16;i++){let x,y;if(k===0){x=r.x+r.w*(.2+(i%4)*.2)+Math.sin(t*19+i)*R*.35;y=r.y+r.h*(.4+Math.floor(i/4)*.16)+Math.cos(t*23+i*2)*R*.35}
   else if(k===1){const a=t*.9+i*.7;x=r.x+r.w*(.18+((i%4)*.21+.05*Math.sin(a))%0.84);y=r.y+r.h*(.52+Math.floor(i/4)*.12)+Math.sin(a*1.7)*R*.4}
   else{const u=(i*.137+t*(.35+(i%5)*.12))%1,v=(i*.311+t*(.27+(i%3)*.15))%1;x=r.x+R+Math.abs(1-2*u)*(r.w-2*R);y=r.y+R+Math.abs(1-2*v)*(r.h-2*R);if(i>7)continue}
   A.paint.ball(x,y,R,'#0891b2')}});
 if(S.ci<STATES.length){let r={x:A.W*.1,y:A.H*.68,w:A.W*.8,h:A.H*.18};if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(g,r,STATES[S.ci][0])}}
function card(g,r,t){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2.5;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();lab(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)}
function putState(k){if(mode()!=='states'||S.ci>=STATES.length)return;const[t,ans]=STATES[S.ci],n=['Solid','Liquid','Gas'][k];
 if(n!==ans)return nope(n==='Solid'?'Solid particles vibrate in place; they do not slide or fly apart.':n==='Liquid'?'Liquid particles stay touching and slide past each other.':'Gas particles are far apart. This card describes touching particles.',k);
 S.ci++;S.won++;A.sound.tick();voice(S.won>=need()?'All matched. Particles in every state move.':`Yes: ${ans}. Next card.`);keys();A.redraw();S.want()}
/* ---- 4 temperature or thermal energy ---- */
function pot(k){const w=Math.min(A.W*.42,230),h=A.H*.44;return{x:A.W/2-w-8+k*(w+16),y:A.H*.04,w,h}}
function drawPots(g){const C=A.col;[['☕','Cup of tea','80 °C, 0.25 litres'],['🛁','Bath','40 °C, 100 litres']].forEach(([e,n,d],k)=>{const r=pot(k);g.fillStyle=A.alpha(k?C.cy:C.rd,.12);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
  g.strokeStyle=S.bad===k?C.rd:C.mu;g.lineWidth=S.bad===k?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.font=`${Math.round(r.h*.32)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,r.x+r.w/2,r.y+r.h*.34);
  lab(g,n,r.x+r.w/2,r.y+r.h*.68,14,C.tx,800);lab(g,d,r.x+r.w/2,r.y+r.h*.86,12,C.tx,600)});
 if(S.ci<POTS.length){let r={x:A.W*.1,y:A.H*.6,w:A.W*.8,h:A.H*.18};if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(g,r,POTS[S.ci][0])}lab(g,`${S.ci} of ${POTS.length} sorted`,A.W/2,A.H*.9,12,C.mu,700)}
function putPot(k){if(mode()!=='pots'||S.ci>=POTS.length)return;const[t,ans]=POTS[S.ci];
 if(k!==ans)return nope(ans?`The bath is cooler but holds 400 times as much water: far more particles, so the bath: ${t.toLowerCase()}.`:`Temperature is average kinetic energy per particle. The cup is at 80 °C, so the cup: ${t.toLowerCase()}.`,k);
 S.ci++;S.won++;A.sound.tick();voice(S.won>=need()?'Temperature is about average energy per particle; thermal energy also depends on how much stuff there is.':`Yes: the ${ans?'bath':'cup'}. Next card.`);keys();A.redraw();S.want()}
/* ---- 5 thermal equilibrium ---- */
function blk(k){const w=Math.min(A.W*.3,170),h=A.H*.4,gap=S.touch?0:(A.W-2*w)*.5*(1-S.blk.x)+0;const mid=A.W/2;return k?{x:mid+gap/2,y:A.H*.16,w,h}:{x:mid-w-gap/2,y:A.H*.16,w,h}}
function drawTouch(g){const C=A.col,t=performance.now()/1000;[[0,S.Th],[1,S.Tc]].forEach(([k,T])=>{const r=blk(k),f=(T-0)/100;g.fillStyle=A.mix(C.dark?'#1e3a8a':'#bfdbfe',C.dark?'#7f1d1d':'#fecaca',Math.max(0,Math.min(1,f)));A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
  g.strokeStyle=C.tx;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();const amp=1.2+2.4*vScale(T)*(T/60);
  for(let i=0;i<12;i++){const x=r.x+r.w*(.2+(i%3)*.3)+Math.sin(t*20+i*3)*amp,y=r.y+r.h*(.2+Math.floor(i/3)*.2)+Math.cos(t*17+i)*amp;A.paint.ball(x,y,Math.min(r.w/14,7),'#64748b')}
  lab(g,`${T.toFixed(1)} °C`,r.x+r.w/2,r.y+r.h+18,14,C.tx,800)});
 lab(g,S.touch?(S.eq?'Same temperature: thermal equilibrium.':'Energy flows from hot to cold…'):'Drag the hot block onto the cold one.',A.W/2,A.H*.78,14,C.tx,700)}
function pushTogether(){if(mode()!=='touch'||S.touch||S.won>=need())return;A.sound.tick();const v=ver;A.tween(S.blk,{x:1},fast()?10:500,'out',()=>{if(v!==ver)return;S.touch=1;voice('Touching: fast particles in the hot block pass energy to slower ones.');keys()})}
function stepTouch(dt){if(!S.touch||S.eq)return;const m=(S.Th+S.Tc)/2,k=Math.min(1,dt*(fast()?50:3));S.Th+=(m-S.Th)*k;S.Tc+=(m-S.Tc)*k;
 if(S.Th-S.Tc<.2){S.Th=S.Tc=m;S.eq=1;S.won++;A.sound.pop();voice(`Both blocks are now ${m} °C. Energy flowed from hot to cold until the temperatures were equal.`);
  const v=ver;if(S.won<need())setTimeout(()=>{if(v!==ver)return;const[h,cc]=PAIRS[S.won];Object.assign(S,{Th:h,Tc:cc,touch:0,eq:0,blk:{x:0}});voice(`New pair: ${h} °C and ${cc} °C. Push them together.`);keys();A.redraw()},fast()?10:900);keys();S.want()}}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){lab(g,'hotter  =  faster on average',W/2,H*.42,18,C.tx,800);lab(g,'temperature ∝ average kinetic energy',W/2,H*.6,14,C.tx,600);return}
 if(v==='heat'||v==='spread')drawGas(g);else({states:drawStates,pots:drawPots,touch:drawTouch})[v](g);A.fx.draw(g)}
function nope(t,b){A.sound.miss();if(b!=null)S.bad=b;voice(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='heat'){B('🔥 Heat +20 °C',()=>setT(S.T+20),'Heat the gas by 20 degrees');B('❄️ Cool −20 °C',()=>setT(S.T-20),'Cool the gas by 20 degrees')}
 if(v==='spread'){if(!S.frozen)B('⏸ Freeze the gas',freeze,'Freeze the motion to compare speeds');else if(S.won<need())B('Pick a slow particle',slowNext,'Select the next slow particle')}
 if(v==='states'&&S.ci<STATES.length)['Solid','Liquid','Gas'].forEach((n,k)=>B(n,()=>putState(k),`Match the card to ${n}`));
 if(v==='pots'&&S.ci<POTS.length){B('☕ Cup, 80 °C',()=>putPot(0),'The cup of tea');B('🛁 Bath, 40 °C',()=>putPot(1),'The bath')}
 if(v==='touch'&&!S.touch&&S.won<need())B('Push the blocks together',pushTogether,'Push the hot block against the cold block')}
function thermHit(p){const b=box();return p.x>A.W*.8&&p.y>b.y-10&&p.y<b.y+b.h+10}
function tFromY(y){const b=box();return TMIN+(TMAX-TMIN)*(1-(y-b.y)/b.h)}
function down(p){const v=mode();
 if(v==='heat'){if(thermHit(p)){S.drag={th:1};setT(tFromY(p.y));return true}return false}
 if(v==='spread'){if(!S.frozen){freeze();return false}let best=null,bd=26;for(const q of S.P){const d=Math.hypot(q.x-p.x,q.y-p.y);if(d<bd){bd=d;best=q}}if(best)pickP(best.i);return false}
 if((v==='states'||v==='pots')&&p.y>A.H*.58){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='states'){const k=[0,1,2].find(k=>inB(p,stBox(k)));if(k!=null)putState(k);return false}
 if(v==='pots'){const k=[0,1].find(k=>inB(p,pot(k)));if(k!=null)putPot(k);return false}
 if(v==='touch'){if(!S.touch&&inB(p,blk(0))){S.drag={x0:p.x};return true}}return false}
function move(p){const d=S.drag;if(!d)return;const v=mode();if(d.th)return setT(tFromY(p.y));
 if(v==='touch'){S.blk.x=Math.max(0,Math.min(1,(p.x-d.x0)/(A.W*.25)));if(S.blk.x>=.95){S.drag=null;pushTogether()}return A.redraw()}
 if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag,v=mode();S.drag=null;if(!d||d.th)return;
 if(v==='touch'){if(!S.touch&&S.blk.x>.5)pushTogether();else if(!S.touch){S.blk.x=0;A.redraw()}return}
 if(d.x==null)return A.redraw();if(v==='states'){const k=[0,1,2].find(k=>{const r=stBox(k);return p.x>r.x&&p.x<r.x+r.w&&p.y<r.y+r.h+20});if(k!=null)putState(k)}
 if(v==='pots'){const k=[0,1].find(k=>{const r=pot(k);return p.x>r.x&&p.x<r.x+r.w&&p.y<r.y+r.h+20});if(k!=null)putPot(k)}A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*50+30:(j+1)*(gap||350)))}
const wipe=()=>{ver++;Object.assign(S,fresh())};
const steps=[
{h:'Heat it up',p:'Drag the thermometer or use the buttons. Watch the particles and the average kinetic energy bar.',predict:{q:'You heat a gas. What happens to its particles?',opts:['They get bigger','They move faster on average'],ans:1},task:'Heat to 100 °C, then cool to −20 °C',
 show:()=>{steps[0].go();play([...Array(4)].map(()=>()=>setT(S.T+20)).concat([...Array(6)].map(()=>()=>setT(S.T-20))),260)},go:()=>{wipe();seed();S.T=20;voice('Gas at 20 °C. Heat it to 100 °C.');keys();S.want=ready(0,()=>S.won>=2,'Hotter means faster particles on average; colder means slower, but still moving.')}},
{h:'A spread of speeds',p:'This gas is at 100 °C. Freeze it, then compare the tails: a long tail means fast. Tap three slow particles.',predict:{q:'In a gas at 100 °C, are all the particles fast?',opts:['Yes, all of them','No, there is a mix of speeds'],ans:1},task:'Find 3 slow particles',
 show:()=>{steps[1].go();play([freeze,slowNext,slowNext,slowNext],420)},go:()=>{wipe();seed();S.T=100;voice('Gas at 100 °C. Freeze it to compare speeds.');keys();S.want=ready(1,()=>S.won>=3,'Temperature measures the average kinetic energy of the particles.')}},
{h:'Solid, liquid, gas',p:'Watch how the particles move in each state. Drag each card to the state it describes, or use the buttons.',predict:{q:'In a cold solid, do the particles move?',opts:['No, they are still','Yes, they vibrate'],ans:1},task:'Match 3 cards',
 show:()=>{steps[2].go();play(STATES.map(([,n])=>()=>putState(['Solid','Liquid','Gas'].indexOf(n))),450)},go:()=>{wipe();voice('Match each card to a state.');keys();S.want=ready(2,()=>S.won>=3,'Particles in every state are always moving.')}},
{h:'Temperature or energy?',p:'A cup of tea at 80 °C and a bath at 40 °C. Sort each card: cup or bath?',task:'Sort 5 cards',
 show:()=>{steps[3].go();play(POTS.map(([,k])=>()=>putPot(k)),420)},go:()=>{wipe();voice('Cup or bath? Sort the first card: higher temperature.');keys();S.want=ready(3,()=>S.won>=5,'Temperature is the average per particle; thermal energy also depends on the amount.')}},
{h:'Hot meets cold',p:'Two blocks of the same metal and size. Drag the hot block onto the cold one and watch both thermometers.',predict:{q:'A 60 °C block touches a 20 °C block of the same metal and size. Where do they end up?',opts:['Both at 80 °C','Both at 40 °C','Both at 20 °C'],ans:1},task:'Bring 2 pairs to equilibrium',
 show:()=>{steps[4].go();play([pushTogether,...Array(10).fill(()=>{}),pushTogether],300)},go:()=>{wipe();S.Th=60;S.Tc=20;voice('60 °C and 20 °C. Drag the hot block onto the cold one.');keys();S.want=ready(4,()=>S.won>=2,'Energy moves from the hotter block to the cooler one until their temperatures are equal.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Food colouring spreads faster in hot water than cold. Why?',[['All the particles move faster, so the dye mixes in sooner','ok'],['Hot water particles are bigger','bigger'],['Heat pushes the dye downwards','push']]],
 ['What does a thermometer measure?',[['The average kinetic energy of the particles','ok'],['The total energy in the object','total'],['The speed of the fastest particle','fastest']]],
 ['Ice at −10 °C. What are its particles doing?',[['Vibrating about fixed positions','ok'],['Not moving at all','still'],['Flying about freely','gas']]],
 ['A spoon at 20 °C goes into soup at 70 °C. What happens?',[['Energy moves from soup to spoon until they reach the same temperature','ok'],['Cold moves from the spoon into the soup','cold'],['The spoon gets hotter than the soup','over']]],
 ['Which has the greater thermal energy store?',[['A swimming pool at 25 °C','ok'],['A sparkler at 1000 °C','spark'],['They have the same','same']]]];
function hint(t){let m='Think about how fast the particles move and how many there are.';
 if(t==='bigger')m='Particles do not grow when heated. They move faster, so the dye spreads sooner.';if(t==='push')m='Nothing pushes the dye. Faster random motion spreads it every way.';
 if(t==='total')m='Total energy also depends on the amount. Temperature is the average per particle.';if(t==='fastest')m='Speeds are spread out. Temperature reflects the average, not the fastest.';
 if(t==='still')m='Even in ice, particles vibrate. Motion is lowest at absolute zero, −273 °C.';if(t==='gas')m='In a solid, particles stay in fixed places and vibrate.';
 if(t==='cold')m='Cold does not flow. Energy flows from the hotter soup to the cooler spoon.';if(t==='over')m='Energy stops flowing when the temperatures are equal, so the spoon cannot overtake.';
 if(t==='spark')m='The sparkler is hotter but tiny. The pool has vastly more particles, so a far bigger store.';if(t==='same')m='Temperature is not total energy. The pool has a huge mass, so its store is bigger.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});voice('Challenge: '+q);A.redraw()}
let hits=0;
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){hits++;A.win()}else{hits=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+hint(t)}${ok?` Streak: ${hits}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();seed();A.gest({down,move,up});keys();
  A.every(dt=>{const v=mode();if((v==='heat'||v==='spread')&&!S.frozen&&S.P.length){stepGas(dt);return true}if(v==='states')return true;if(v==='touch'){stepTouch(dt);return true}return false})}});
A.start()})})();
