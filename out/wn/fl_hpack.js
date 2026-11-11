/* Flagship – designing a hand warmer or cold pack (ages 13–15; NGSS MS-PS1-6): test four dissolving solids, match
   briefs, run a one-variable fair test, tune the mass to a safe target, insulate. Model: 50 g water, no losses.
   Not reactlab (acid + alkali) or flagwarm (hot, warm and cold, ages 3–5). */
(()=>{
/* °C change per gram in 50 cm³ of water, from enthalpies of solution (CaCl2 −81.3, NH4NO3 +25.7, NH4Cl +14.8, NaCl +3.9 kJ/mol) */
const SOLIDS=[{n:'Calcium chloride',f:'CaCl₂',k:3.5},{n:'Ammonium nitrate',f:'NH₄NO₃',k:-1.54},{n:'Ammonium chloride',f:'NH₄Cl',k:-1.32},{n:'Sodium chloride',f:'NaCl',k:-0.32}];
const BRIEFS=[{q:'Hand warmer: it must warm up by at least 15 °C',ok:0,why:{1:'Ammonium nitrate is endothermic: it takes energy from the water, so it cools.',2:'Ammonium chloride is endothermic: the water got colder.',3:'Salt barely changes it (−1.6 °C), and the wrong way.'}},
 {q:'Cold pack for a sprain: the biggest drop for 5 g',ok:1,why:{0:'Calcium chloride is exothermic: it warms the water.',2:'It fell 6.6 °C; ammonium nitrate fell 7.7 °C.',3:'Salt only fell 1.6 °C: far too small.'}},
 {q:'Which solid is a poor choice for either pack?',ok:3,why:{0:'+17.5 °C makes a good warmer.',1:'−7.7 °C makes a good cold pack.',2:'−6.6 °C is enough for a cold pack.'}}];
const VARS=[['mass','Mass of solid',['5 g','10 g']],['water','Water',['50 cm³','100 cm³']],['cup','Cup',['foam cup','glass beaker']],['start','Start',['20 °C','30 °C']]];
const TARGETS=[{s:0,lo:40,hi:45,label:'Hand warmer: end between 40 and 45 °C'},{s:1,lo:0,hi:5,label:'Cold pack: end between 0 and 5 °C'}];
const DESIGNS=[{n:'Felt sleeve round the bag',k:.08,rise:24.5,why:''},{n:'Twice the water, same solid',k:.125,rise:12.25,why:'Twice the water shares the same energy, so the rise halves to about 12 °C.'},
 {n:'Thinner plastic bag',k:.4,rise:24.5,why:'A thinner bag lets energy escape faster: below 30 °C in about 2 minutes.'}];
const above30=d=>Math.log(d.rise/10)/d.k;                     // minutes until 20 + rise·e^(−kt) falls to 30 °C
const r1=v=>(Math.round(v*10)/10).toFixed(1).replace('-','−').replace(/\.0$/,''),sg=v=>(v>=0?'+':'')+r1(v);
VIS.reg('flaghpack',c=>{let A,ctl,quiz,qk=-1,tok=0;const S={};
function fresh(){tok++;Object.assign(S,{want:()=>{},won:0,j:0,bad:-1,lock:0,grab:0,tested:[],temp:20,sel:-1,b:{mass:0,water:1,cup:1,start:0},ran:0,mass:3,shown:[],tried:0})}
const stage=()=>['test','pick','fair','tune','keep','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function label(g,t,x,y,size,weight,align,col){g.font=`${weight||700} ${fs(size)}px system-ui,sans-serif`;g.textAlign=align||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function panel(g,r,stroke,lw){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=stroke||C.tx;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wait(fn,ms){const k=tok;setTimeout(()=>{if(k===tok)fn()},rm()?10:ms)}
function demo(list,gap){const k=++tok;list.forEach((fn,i)=>setTimeout(()=>{if(k===tok)fn()},rm()?i*40+30:(i+1)*(gap||400)))}
function wrong(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
/* jars of solid along the top, tapped to add or pick */
function jar(i){const w=(A.W-30)/4;return{x:8+i*(w+5),y:A.H*.06,w,h:A.H*.2}}
function drawJars(g,hi){const C=A.col;SOLIDS.forEach((s,i)=>{const r=jar(i),bad=S.bad===i;panel(g,r,bad?C.rd:hi===i?C.ac:C.ln,bad||hi===i?4:2);
 label(g,s.f,r.x+r.w/2,r.y+r.h*.3,A.narrow?13:15,900);s.n.split(' ').forEach((w,k)=>label(g,w,r.x+r.w/2,r.y+r.h*(.6+k*.2),A.narrow?9:11,700,'center',C.mu))})}
/* a cup with a thermometer: temp sets the liquid colour and the column */
function drawCup(g,x,y,w,h,t,cap){const C=A.col,top=y+h*.12;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x+w*.08,y+h);g.lineTo(x+w*.92,y+h);g.lineTo(x+w,y);g.stroke();
 const warm=Math.max(-1,Math.min(1,(t-20)/25));g.fillStyle=A.alpha(warm>=0?C.or:C.cy,.25+.5*Math.abs(warm));g.beginPath();g.moveTo(x+w*.02,top);g.lineTo(x+w*.09,y+h-2);g.lineTo(x+w*.91,y+h-2);g.lineTo(x+w*.98,top);g.fill();
 const tx=x+w+14,tb=y+h,tt=y-4,ty=v=>tb-(Math.max(-5,Math.min(50,v))+5)/55*(tb-tt);g.fillStyle=C.dark?'#0f172a':'#f8fafc';g.fillRect(tx-5,tt,10,tb-tt);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(tx-5,tt,10,tb-tt);
 g.fillStyle=C.rd;g.fillRect(tx-3,ty(t),6,tb-ty(t));[0,20,40].forEach(v=>{g.fillStyle=C.tx;g.fillRect(tx+5,ty(v)-1,5,2);label(g,String(v),tx+12,ty(v),9,700,'left',C.mu)});
 label(g,`${r1(t)} °C`,x+w/2,y+h*.55,A.narrow?16:20,900);if(cap)label(g,cap,x+w/2,y+h+16,11,800)}
/* step 1: test each solid */
function addSolid(i){if(stage()!=='test'||S.lock||S.won>=4)return;const s=SOLIDS[i];S.sel=i;S.temp=20;A.sound.tick();const end=20+5*s.k,k0=tok;
 const done=()=>{if(k0!==tok)return;if(!S.tested.includes(i)){S.tested.push(i);S.won=S.tested.length;A.sound.pop()}S.lock=0;
  say(`5 g ${s.n}: 20 °C to ${r1(end)} °C (${sg(5*s.k)} °C). ${s.k>0?'Exothermic: energy into the water.':'Endothermic: energy taken from the water.'}`);keys();A.redraw();S.want()};
 S.lock=1;say(`Adding 5 g of ${s.n}…`);A.tween(S,{temp:end},700,'out',done);keys()}
function drawTest(g){const C=A.col;drawJars(g,S.sel);drawCup(g,A.W*.08,A.H*.36,A.W*(A.narrow?.36:.3),A.H*.4,S.temp,S.sel<0?'50 cm³ water':`5 g ${SOLIDS[S.sel].f}`);
 const x0=A.W*(A.narrow?.58:.52);label(g,'Results for 5 g',x0,A.H*.36,12,900,'left');SOLIDS.forEach((s,i)=>{const y=A.H*(.45+i*.1),t=S.tested.includes(i);
  label(g,`${s.f}: ${t?sg(5*s.k)+' °C':'?'}`,x0,y,A.narrow?12:13,800,'left',t?(s.k>0?C.or:C.cy):C.mu);if(t)label(g,s.k>0?'exo':'endo',A.W-10,y,11,800,'right',C.mu)});
 label(g,`Tap a jar to add 5 g. ${S.won} of 4 tested`,A.W/2,A.H*.95,11,700,'center',C.mu)}
/* step 2: pick for a brief */
function choose(i){if(stage()!=='pick'||S.lock||S.won>=3)return;const b=BRIEFS[S.j];if(i!==b.ok)return wrong(b.why[i],i);S.won++;A.sound.pop();
 say(['Calcium chloride: +17.5 °C, exothermic.','Ammonium nitrate: −7.7 °C, the biggest drop.','Sodium chloride: only −1.6 °C, too small.'][S.j]);
 if(S.won<3){S.lock=1;wait(()=>{S.lock=0;S.j++;keys();A.redraw();say(BRIEFS[S.j].q)},800)}keys();A.redraw();S.want()}
function drawPick(g){const C=A.col;drawJars(g,-1);const r={x:12,y:A.H*.34,w:A.W-24,h:A.H*.18};panel(g,r,C.ac,3);label(g,S.won<3?BRIEFS[S.j].q:'All three briefs matched.',A.W/2,r.y+r.h/2,A.narrow?13:15,900);
 SOLIDS.forEach((s,i)=>label(g,`${s.f}  ${sg(5*s.k)} °C`,A.W*(i%2?.72:.28),A.H*(.66+Math.floor(i/2)*.1),A.narrow?12:13,800,'center',s.k>0?C.or:C.cy));label(g,'Results from the test: 5 g in 50 cm³ water',A.W/2,A.H*.92,11,700,'center',C.mu)}
/* step 3: fair test, change only one variable */
const rowR=k=>({x:A.W*.5,y:A.H*(.2+k*.13),w:A.W*.46,h:A.H*.11});
function toggle(k){if(stage()!=='fair'||S.ran)return;const key=VARS[k][0];S.b[key]=1-S.b[key];A.sound.tick();say(`Cup B ${VARS[k][1].toLowerCase()}: ${VARS[k][2][S.b[key]]}.`);keys();A.redraw()}
function runFair(){if(stage()!=='fair'||S.ran)return;const diff=VARS.filter(v=>S.b[v[0]]!==0);
 if(diff.length===0)return wrong('Nothing differs, so this tests nothing. Change the mass in cup B.','all');
 if(diff.length>1)return wrong(`${diff.map(v=>v[1]).join(' and ')} all differ, so you could not tell which caused the change.`,'all');
 if(diff[0][0]!=='mass')return wrong(`Only the ${diff[0][1].toLowerCase()} differs. Fair, but this test is about the mass.`,'all');
 S.ran=1;A.sound.pop();say('Fair test: 5 g gives +17.5 °C, 10 g gives +35 °C. Double the mass, double the rise.');keys();A.redraw();S.want()}
function drawFair(g){const C=A.col;label(g,'Cup A (fixed)',A.W*.25,A.H*.1,12,900);label(g,'Cup B: tap a row to change it',A.W*.73,A.H*.1,12,900);
 VARS.forEach((v,k)=>{const r=rowR(k),odd=S.b[v[0]]!==0;panel(g,r,odd?C.or:C.ln,odd?3:2);label(g,`${v[1]}: ${v[2][S.b[v[0]]]}`,r.x+r.w/2,r.y+r.h/2,A.narrow?11:13,800);
  label(g,`${v[1]}: ${v[2][0]}`,A.W*.25,r.y+r.h/2,A.narrow?11:13,700,'center',C.mu)});
 if(S.ran){label(g,'A: +17.5 °C        B: +35 °C',A.W/2,A.H*.82,15,900,'center',C.or);label(g,'Only the mass changed, so the mass caused the bigger rise.',A.W/2,A.H*.92,11,800)}
 else label(g,`${VARS.filter(v=>S.b[v[0]]!==0).length} thing(s) differ. Then tap Run test.`,A.W/2,A.H*.84,12,800,'center',S.bad==='all'?C.rd:C.mu)}
/* step 4: tune the mass to hit a safe target */
const sliderX=m=>A.W*.1+(m-1)/14*A.W*.8,massAt=x=>Math.max(1,Math.min(15,Math.round((x-A.W*.1)/(A.W*.8)*14+1)));
function setMass(m){if(stage()!=='tune'||S.lock||S.won>=2)return;m=Math.max(1,Math.min(15,m));if(m===S.mass)return;S.mass=m;A.sound.tick();say(`${m} g of ${SOLIDS[TARGETS[S.j].s].n}. Tap Test.`);keys();A.redraw()}
function tuneTest(){if(stage()!=='tune'||S.lock||S.won>=2)return;const t=TARGETS[S.j],s=SOLIDS[t.s],end=20+S.mass*s.k;S.temp=end;S.tried=1;
 if(end>t.hi)return wrong(t.s===0?`${r1(end)} °C is too hot: above about 45 °C a pack can burn skin. Use less solid.`:`${r1(end)} °C is not cold enough. Add more ammonium nitrate.`,'all');
 if(end<t.lo)return wrong(t.s===0?`${r1(end)} °C is not warm enough. Add more calcium chloride.`:`${r1(end)} °C is below 0 °C: the water could freeze and hurt skin. Use a little less.`,'all');
 S.won++;A.sound.pop();say(`${S.mass} g gives ${r1(end)} °C: on target.`);
 if(S.won<2){S.lock=1;wait(()=>{S.lock=0;S.j++;S.mass=3;S.temp=20;S.tried=0;keys();A.redraw()},800)}keys();A.redraw();S.want()}
function drawTune(g){const C=A.col,t=TARGETS[Math.min(S.j,1)],s=SOLIDS[t.s];label(g,S.won<2?t.label:'Both packs on target.',A.W/2,A.H*.06,13,900);
 drawCup(g,A.W*.12,A.H*.18,A.W*(A.narrow?.36:.28),A.H*.36,S.temp,`${S.mass} g ${s.f}`);
 const x0=A.W*(A.narrow?.62:.55);label(g,`${s.k>0?'+':'−'}${r1(Math.abs(s.k))} °C per g`,x0,A.H*.26,12,800,'left');label(g,S.tried?`Last test: ${r1(S.temp)} °C`:'Start: 20 °C',x0,A.H*.36,12,800,'left',S.bad==='all'?C.rd:C.tx);label(g,`Target: ${t.lo} to ${t.hi} °C`,x0,A.H*.46,12,800,'left',C.mu);
 const y=A.H*.75;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(sliderX(1),y);g.lineTo(sliderX(15),y);g.stroke();[1,5,10,15].forEach(m=>label(g,`${m} g`,sliderX(m),y+20,10,700));
 g.fillStyle=C.ac;g.beginPath();g.arc(sliderX(S.mass),y,12,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();label(g,'Drag the scoop to set the mass',A.W/2,A.H*.93,11,700,'center',C.mu)}
/* step 5: keep it warm longer */
const card=i=>({x:8,y:A.H*(.08+i*.13),w:A.W-16,h:A.H*.11}),GX=t=>A.W*.12+t/15*A.W*.82,GY=v=>A.H*.92-(v-15)/35*A.H*.42;
function design(i){if(stage()!=='keep'||S.won)return;if(!S.shown.includes(i))S.shown.push(i);const d=DESIGNS[i];
 if(i)return wrong(d.why,i);S.won=1;A.sound.pop();say(`Felt sleeve: above 30 °C for about ${Math.round(above30(d))} minutes. Trapped air is a poor conductor, so energy leaves more slowly.`);keys();A.redraw();S.want()}
function drawKeep(g){const C=A.col,cols=[C.gr,C.vi,C.or];DESIGNS.forEach((d,i)=>{const r=card(i);panel(g,r,S.bad===i?C.rd:S.shown.includes(i)?cols[i]:C.ln,S.bad===i||S.shown.includes(i)?3:2);label(g,d.n,r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,800)});
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(GX(0),GY(50));g.lineTo(GX(0),GY(15));g.lineTo(GX(15),GY(15));g.stroke();[0,5,10,15].forEach(t=>label(g,`${t} min`,GX(t),GY(15)+12,9,700));[20,30,40].forEach(v=>label(g,`${v}°`,GX(0)-4,GY(v),9,700,'right'));
 g.setLineDash([4,4]);g.strokeStyle=C.mu;g.beginPath();g.moveTo(GX(0),GY(30));g.lineTo(GX(15),GY(30));g.stroke();g.setLineDash([]);
 g.strokeStyle=C.mu;g.lineWidth=2;g.setLineDash([2,4]);g.beginPath();for(let t=0;t<=15;t+=.25){const v=20+24.5*Math.exp(-.25*t);t?g.lineTo(GX(t),GY(v)):g.moveTo(GX(t),GY(v))}g.stroke();g.setLineDash([]);label(g,'bare bag',GX(4),GY(20+24.5*Math.exp(-1))-10,9,800,'left',C.mu);
 S.shown.forEach(i=>{const d=DESIGNS[i];g.strokeStyle=cols[i];g.lineWidth=3;g.beginPath();for(let t=0;t<=15;t+=.25){const v=20+d.rise*Math.exp(-d.k*t);t?g.lineTo(GX(t),GY(v)):g.moveTo(GX(t),GY(v))}g.stroke()});
 label(g,'Tap the design that stays above 30 °C longest',A.W/2,A.H*.47,11,800,'center',C.mu)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#fff7ed',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){label(g,'Exothermic: energy out, temperature up',W/2,H*.38,15,900,'center',C.or);label(g,'Endothermic: energy in, temperature down',W/2,H*.58,15,900,'center',C.cy);return}
 ({test:drawTest,pick:drawPick,fair:drawFair,tune:drawTune,keep:drawKeep})[v](g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='test'&&S.won<4)SOLIDS.forEach((s,i)=>B(`Add ${s.f}`,()=>addSolid(i),`Add 5 g of ${s.n}`));
 if(v==='pick'&&S.won<3)SOLIDS.forEach((s,i)=>B(s.n,()=>choose(i)));
 if(v==='fair'&&!S.ran){VARS.forEach((x,k)=>B(`B: ${x[1].toLowerCase()}`,()=>toggle(k),`Change cup B ${x[1].toLowerCase()}`));B('Run test',runFair)}
 if(v==='tune'&&S.won<2){B('− 1 g',()=>setMass(S.mass-1),'One gram less');B('+ 1 g',()=>setMass(S.mass+1),'One gram more');B('Test',tuneTest)}
 if(v==='keep'&&!S.won)DESIGNS.forEach((d,i)=>B(d.n,()=>design(i)))}
function down(p){const v=stage();
 if(v==='test'||v==='pick'){const i=[0,1,2,3].find(i=>inside(p,jar(i)));if(i!=null)(v==='test'?addSolid:choose)(i);return false}
 if(v==='fair'){const k=[0,1,2,3].find(k=>inside(p,rowR(k)));if(k!=null)toggle(k);return false}
 if(v==='tune'){S.grab=1;move(p);return true}
 if(v==='keep'){const i=[0,1,2].find(i=>inside(p,card(i)));if(i!=null)design(i);return false}return false}
function move(p){if(S.grab&&stage()==='tune')setMass(massAt(p.x))}
function up(){S.grab=0}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const steps=[
{h:'Warm or cool?',p:'Tap a jar, or its button, to stir 5 g of it into 50 cm³ of water at 20 °C. Read the thermometer.',
 predict:{q:'Ammonium nitrate dissolves and the water gets colder. What happened to the energy?',opts:['The solid gave out cold','Energy moved from the water into the dissolving','No energy moved at all'],ans:1},task:'Test all 4 solids',
 show:()=>{steps[0].go();demo([0,1,2,3].map(i=>()=>addSolid(i)),950)},go:()=>{fresh();keys();say('50 cm³ of water at 20 °C. Tap a jar to add 5 g.');S.want=ready(0,()=>S.won>=4,'Temperature up: exothermic. Temperature down: endothermic.')}},
{h:'Pick for the job',p:'Use your results. Tap the solid that suits each brief.',task:'Match 3 briefs',
 show:()=>{steps[1].go();demo(BRIEFS.map(b=>()=>choose(b.ok)),1000)},go:()=>{fresh();keys();say(BRIEFS[0].q);S.want=ready(1,()=>S.won>=3,'Pick the process by the direction and the size of the change.')}},
{h:'Make it a fair test',p:'Does more solid give a bigger rise? Cup B must differ from cup A only in mass. Tap rows to change cup B, then run it.',
 predict:{q:'Use 10 g of calcium chloride instead of 5 g, in the same water. The temperature rise will…',opts:['stay the same','roughly double','halve'],ans:1},task:'Run a fair test',
 show:()=>{steps[2].go();demo([()=>toggle(1),()=>toggle(2),()=>toggle(0),runFair],500)},go:()=>{fresh();keys();say('Cup B differs in water and cup. Make the mass the only difference.');S.want=ready(2,()=>S.ran,'Change one variable, keep the rest the same, and the result means something.')}},
{h:'Hit the target',p:'Too little solid does little; too much can burn or freeze skin. Drag the scoop, then test.',task:'Tune both packs',
 show:()=>{steps[3].go();demo([()=>setMass(5),()=>setMass(6),()=>setMass(7),tuneTest,()=>0,()=>0,()=>setMass(8),()=>setMass(10),tuneTest],420)},go:()=>{fresh();keys();say('3 g of calcium chloride. Target 40 to 45 °C.');S.want=ready(3,()=>S.won>=2,'7 g gives 44.5 °C and 10 g gives 4.6 °C: the amount sets the size of the change.')}},
{h:'Keep it warm longer',p:'The warmer cools as energy spreads to the air. Tap a change to see its cooling curve.',
 predict:{q:'Wrap the pack in a felt sleeve. Compared with a bare bag it will…',opts:['release more energy','lose its energy to the air more slowly','get colder faster'],ans:1},task:'Find the best improvement',
 show:()=>{steps[4].go();demo([()=>design(0)],400)},go:()=>{fresh();keys();say('Three ways to change the warmer. Tap one.');S.want=ready(4,()=>S.won>=1,'Insulation slows the energy transfer to the surroundings, so the warmth lasts.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
const QS=[['Water drops from 20 °C to 12 °C as a solid dissolves. Is dissolving it exothermic or endothermic?',[['Endothermic: it took energy from the water','ok'],['Exothermic: it gave out cold','cold'],['Exothermic: the temperature changed','anychange']]],
 ['5 g of a solid raises the temperature by 6 °C. About how much will 10 g raise it in the same water?',[['About 12 °C','ok'],['About 6 °C','same'],['About 3 °C','half']]],
 ['To test whether the type of cup matters, what must you keep the same?',[['The solid, its mass, the water volume and the start temperature','ok'],['Only the solid','onevar'],['Nothing: change everything at once','all']]],
 ['In a reusable hand warmer, sodium acetate crystallises and gets warm. What kind of change is that?',[['Exothermic','ok'],['Endothermic','endo'],['No energy change','none']]],
 ['A cold pack only cools by 2 °C. Which change should help most?',[['Use more of the solid in the same water','ok'],['Use twice as much water','water'],['Start with warmer water','warmer']]]];
function why(t){let m='Rise: exothermic. Fall: endothermic.';
 if(t==='cold')m='Cold does not flow. The dissolving took energy from the water: endothermic.';
 if(t==='anychange')m='A fall means energy went into the change: endothermic.';
 if(t==='same')m='Twice the solid gives twice the energy, so about 12 °C.';if(t==='half')m='More solid gives more energy, not less: about 12 °C.';
 if(t==='onevar')m='Keep solid, mass, water volume and start temperature the same. Change only the cup.';if(t==='all')m='If everything changes, you cannot tell what caused the result.';
 if(t==='endo')m='It gets warm, so energy is given out: exothermic.';if(t==='none')m='It warms up, so energy is released: exothermic.';
 if(t==='water')m='More water spreads the same energy over more mass: a smaller change.';if(t==='warmer')m='Starting warmer does not help; more solid takes in more energy.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
