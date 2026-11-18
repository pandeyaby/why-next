/* Flagship: trends in properties of alkanes (ages 14-16; AQA GCSE Chemistry 4.7.1.2, OCR C6/C9, Edexcel 8). As chains get
   longer, London (intermolecular) forces get stronger, so boiling point and viscosity rise and flammability falls.
   Learners grow a chain and plot real boiling points, boil C5 vs C10 and see molecules leave whole, find which alkanes
   are gases at 20 °C, race two liquids, light three dishes, then put the explanation in causal order. */
(()=>{
const BP=[null,-162,-89,-42,-1,36,69,98,126,151,174,196,216,235,254,271,287,302,316,330,343];
const NAME=[null,'methane','ethane','propane','butane','pentane','hexane','heptane','octane','nonane','decane','undecane','dodecane','tridecane','tetradecane','pentadecane','hexadecane','heptadecane','octadecane','nonadecane','icosane'];
const VISC={5:.24,6:.30,8:.51,10:.92,12:1.38,16:3.0},FLASH={6:-22,10:46,16:135};
const LINK=['Longer chain','More surface contact between molecules','Stronger forces between molecules','More energy needed to pull molecules apart','Higher boiling point and viscosity, lower flammability'];
VIS.reg('flagalktr',c=>{let A,bar,cq,qk=-1,good=0;const K={};
const view=()=>['plot','boil','room','pour','burn','link','chal'][A.step];
function narrate(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function tx(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
function rect(r,fill,lw,edge){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fillStyle=fill;g.fill();g.lineWidth=lw||1.5;g.strokeStyle=edge||A.col.tx;g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* zig-zag carbon chain with n carbons from (x,y), bond length b */
function chain(n,x,y,b,col){const g=A.ctx,pts=[];for(let i=0;i<n;i++)pts.push([x+i*b*.87,y+(i%2?b*.5:0)]);g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();pts.forEach(([px,py],i)=>i?g.lineTo(px,py):g.moveTo(px,py));g.stroke();
 pts.forEach(([px,py])=>{g.fillStyle=col||A.col.tx;g.beginPath();g.arc(px,py,Math.max(3,b*.22),0,7);g.fill()});return pts}
/* ---------- graph of boiling point against chain length ---------- */
function gbox(){const r=view()==='room';return{x:A.W*.14,y:A.H*(r?.52:.42),w:A.W*.8,h:A.H*(r?.36:.44)}}
const gx=n=>{const b=gbox();return b.x+(n-1)/19*b.w},gy=t=>{const b=gbox();return b.y+b.h-(t+200)/560*b.h};
function graph(g,C,line){const b=gbox();g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x,b.y+b.h);g.lineTo(b.x+b.w,b.y+b.h);g.stroke();
 [-200,0,200].forEach(t=>{tx(String(t),b.x-6,gy(t),10,{al:'right',c:C.mu});g.strokeStyle=A.alpha(C.tx,.12);g.beginPath();g.moveTo(b.x,gy(t));g.lineTo(b.x+b.w,gy(t));g.stroke()});
 [1,5,10,15,20].forEach(n=>tx(String(n),gx(n),b.y+b.h+10,10,{c:C.mu}));tx('carbons in chain',b.x+b.w/2,b.y+b.h+24,11,{c:C.mu});tx('boiling point / °C',b.x,b.y-10,11,{al:'left',c:C.mu});
 if(line!=null){g.strokeStyle=C.rd;g.setLineDash([6,4]);g.lineWidth=2;g.beginPath();g.moveTo(b.x,gy(line));g.lineTo(b.x+b.w,gy(line));g.stroke();g.setLineDash([]);tx(`${Math.round(line)} °C`,b.x+b.w,gy(line)-10,11,{al:'right',c:C.tx,w:800})}
 K.seen.forEach(n=>{g.fillStyle=n===K.n&&view()==='plot'?C.am:C.ac;g.beginPath();g.arc(gx(n),gy(BP[n]),5,0,7);g.fill()})}
/* ---------- boiling: two molecules with intermolecular forces ---------- */
function boilPic(g,C){const n=K.n,b=Math.min(A.W*.6/(n*.87),22),x0=A.W*.08,apart=K.T>=BP[n]?Math.min(1,(K.T-BP[n])/40+.35):0;
 const top=chain(n,x0,A.H*.3-apart*A.H*.12,b,C.cy),bot=chain(n,x0,A.H*.3+b*1.3+apart*A.H*.12,b,C.vi);
 if(!apart){g.strokeStyle=C.am;g.setLineDash([3,3]);g.lineWidth=2;top.forEach(([px,py],i)=>{g.beginPath();g.moveTo(px,py+4);g.lineTo(bot[i][0],bot[i][1]-4);g.stroke()});g.setLineDash([])}
 tx(`${NAME[n]} C${n}H${2*n+2}: ${n} contacts`,A.W*.4,A.H*.08,13,{w:800});tx(apart?'Boiling: molecules move apart, whole. No C–C or C–H bond breaks.':'Liquid: dashed lines are forces between molecules.',A.W*.4,A.H*.62,11,{w:700,max:A.W*.76});
 const th=thermo();rect(th,A.alpha(C.tx,.06));const f=(K.T+200)/560;g.fillStyle=C.rd;g.fillRect(th.x+th.w*.3,th.y+th.h*(1-f),th.w*.4,th.h*f);tx(`${Math.round(K.T)} °C`,th.x+th.w/2,th.y+th.h+14,12,{w:800});
 tx(`boils at ${BP[n]} °C`,A.W*.4,A.H*.72,12,{c:C.mu});tx(`Boiled: ${['C5','C10'].filter(s=>K.boiled[s]).join(', ')||'none yet'}`,A.W*.4,A.H*.84,12,{w:800})}
function thermo(){return{x:A.W*.84,y:A.H*.12,w:A.W*.1,h:A.H*.66}}
/* ---------- room temperature tubes ---------- */
function tube(i){const n=i+1,cols=10,w=(A.W-24)/cols,row=Math.floor(i/cols);return{x:12+(i%cols)*w+2,y:A.H*(.11+row*.18),w:w-4,h:A.H*.15,n}}
function roomPic(g,C){for(let i=0;i<20;i++){const r=tube(i),n=r.n,st=K.shown?(BP[n]<20?'gas':n>=17?'solid':'liquid'):null;rect(r,st==='gas'?A.alpha(C.cy,.12):st==='liquid'?A.alpha(C.ac,.35):st==='solid'?A.alpha(C.mu,.5):A.alpha(C.tx,.05),K.bad===n?3:1.2);
  tx('C'+n,r.x+r.w/2,r.y+r.h*.3,11,{w:800});if(st)tx(st==='gas'?'gas':st==='liquid'?'liq':'sol',r.x+r.w/2,r.y+r.h*.72,10,{w:700})}
 graph(g,C,20);tx(K.msg||'Tap the shortest alkane that is a liquid at 20 °C.',A.W/2,A.H*.06,12,{w:800})}
/* ---------- viscosity race ---------- */
const RACES=[[6,16],[8,12]];
function pourPic(g,C){const pair=RACES[K.race]||RACES[RACES.length-1];pair.forEach((n,i)=>{const x=A.W*(.08+i*.47),w=A.W*.37,top=A.H*.18,h=A.H*.5,lvl=K.fo[i].v;
  rect({x,y:top,w,h:h*.42},A.alpha(C.tx,.05));g.fillStyle=A.alpha(C.am,.75);g.fillRect(x+3,top+h*.42*(lvl),w-6,h*.42*(1-lvl));
  rect({x:x+w*.3,y:top+h*.58,w:w*.4,h:h*.42},A.alpha(C.tx,.05));g.fillStyle=A.alpha(C.am,.75);const fill=lvl*h*.42;g.fillRect(x+w*.3+3,top+h-fill,w*.4-6,fill);
  if(lvl>0&&lvl<1){g.strokeStyle=C.am;g.lineWidth=Math.max(2,6-VISC[n]);g.beginPath();g.moveTo(x+w/2,top+h*.42);g.lineTo(x+w/2,top+h-fill);g.stroke()}
  tx(`${NAME[n]} C${n}`,x+w/2,top-14,12,{w:800});tx(K.time[i]!=null?`${K.time[i].toFixed(1)} s`:'',x+w/2,A.H*.76,14,{w:900})});
 tx(K.msg||'Tap Pour (or tap a funnel) to race the two liquids.',A.W/2,A.H*.9,12,{w:700});tx(`Races: ${K.race} of 2`,A.W/2,A.H*.05,12,{w:800})}
/* ---------- flammability ---------- */
const DISH=[6,10,16];
function dish(i){const w=A.W*.27;return{x:A.W*.05+i*(w+A.W*.05),y:A.H*.55,w,h:A.H*.14}}
function burnPic(g,C){DISH.forEach((n,i)=>{const r=dish(i),lit=K.lit[i];rect(r,A.alpha(C.mu,.2));tx(`C${n}`,r.x+r.w/2,r.y+r.h/2,13,{w:900});
  if(lit){const fh=[A.H*.3,A.H*.18,A.H*.08][i];g.fillStyle=A.alpha(C.or,.85);g.beginPath();g.moveTo(r.x+r.w*.2,r.y);g.quadraticCurveTo(r.x+r.w/2,r.y-fh*1.6,r.x+r.w*.8,r.y);g.fill();
   if(i){g.fillStyle=A.alpha(C.mu,.6);for(let k=0;k<i*3;k++){g.beginPath();g.arc(r.x+r.w*(.3+.15*(k%3)),r.y-fh-10-k*6,5+k,0,7);g.fill()}}}
  tx(lit?['lights at once','slow to light','hard to light, smoky'][i]:`flash point ${FLASH[n]} °C`,r.x+r.w/2,r.y+r.h+14,10,{w:700,max:r.w+8})});
 const m=K.match;tx('🔥',m.x,m.y,26);tx(K.msg||'Drag the match onto each dish.',A.W/2,A.H*.06,12,{w:800})}
/* ---------- causal order ---------- */
function linkRect(i){const h=Math.min(34,A.H*.13);return{x:A.W*.06,y:A.H*.1+i*(h+6),w:A.W*.88,h}}
function linkPic(g,C){K.deck.forEach((j,i)=>{const r=linkRect(i),placed=K.order.indexOf(j);rect(r,placed>=0?A.alpha(C.gr,.25):K.bad===j?A.alpha(C.rd,.25):C.pn,placed>=0?2:1.2);
  tx((placed>=0?(placed+1)+'. ':'')+LINK[j],r.x+r.w/2,r.y+r.h/2,12,{w:700,max:r.w-10})});tx(K.msg||'Tap the cards in cause → effect order.',A.W/2,A.H*.93,12,{w:800})}
function paint(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.25);g.fillRect(0,0,W,H);
 if(v==='plot'){const n=K.n,b=bond();chain(n,W*.08,H*.13,b,C.tx);tx(`${NAME[n]}, C${n}H${2*n+2}, boils at ${BP[n]} °C`,W/2,H*.32,13,{w:800});graph(g,C);tx('drag the chain end →',W*.92,H*.06,10,{al:'right',c:C.mu})}
 if(v==='boil')boilPic(g,C);if(v==='room')roomPic(g,C);if(v==='pour')pourPic(g,C);if(v==='burn')burnPic(g,C);if(v==='link')linkPic(g,C);
 if(v==='chal'){graph(g,C);tx('Longer chain: stronger forces between molecules',W/2,H*.2,14,{w:800})}
 A.fx.draw(g)}
/* ---------- actions ---------- */
function setN(n){if(view()!=='plot')return;n=Math.max(1,Math.min(20,n));if(n===K.n)return;K.n=n;if(!K.seen.includes(n))K.seen.push(n);A.sound.tick();narrate(`${NAME[n]}, ${n} carbons, boils at ${BP[n]} degrees.`);A.redraw();K.want()}
function pick(n){if(view()!=='boil')return;K.n=n;K.T=Math.min(K.T,BP[n]-30);A.sound.tick();narrate(`${NAME[n]}. Heat it to its boiling point.`);controls();A.redraw()}
function heat(t){if(view()!=='boil')return;K.T=Math.max(-200,Math.min(360,t));if(K.T>=BP[K.n]&&!K.boiled['C'+K.n]){K.boiled['C'+K.n]=1;A.sound.pop();narrate(`${NAME[K.n]} boils at ${BP[K.n]} degrees. Whole molecules separate.`);K.want()}A.redraw()}
function tapTube(n){if(view()!=='room'||K.done)return;if(n===5){K.done=1;K.shown=1;A.sound.pop();K.msg='Pentane boils at 36 °C, above 20 °C, so it is the first liquid.'}
 else{A.sound.miss();K.bad=n;setTimeout(()=>{K.bad=null;A.redraw()},A.reduced()?10:700);K.msg=BP[n]<20?`${NAME[n]} boils at ${BP[n]} °C, below 20 °C, so it is a gas.`:`${NAME[n]} is liquid, but a shorter chain is too. Look for the first boiling point above 20 °C.`}
 narrate(K.msg);controls();A.redraw();K.want()}
function pour(){if(view()!=='pour'||K.busy||K.race>=RACES.length)return;K.busy=1;const pair=RACES[K.race],r=K.run;K.fo=[{v:0},{v:0}];K.time=[null,null];K.msg='';A.sound.tick();
 pair.forEach((n,i)=>{const secs=2+VISC[n]*3;A.tween(K.fo[i],{v:1},A.reduced()?20:secs*150,'io',()=>{if(r!==K.run)return;K.time[i]=secs;
   if(K.time.every(t=>t!=null)){K.busy=0;K.race++;K.msg=`C${pair[1]} took longer: longer chains are more viscous.`;narrate(K.msg);controls();K.want();if(K.chain&&K.race<RACES.length)setTimeout(()=>{if(r===K.run)pour()},200)}A.redraw()})})}
function light(i){if(view()!=='burn'||K.lit[i])return;K.lit[i]=1;A.sound.pop();K.msg=['Hexane catches at once: short chains are volatile.','Decane is slower to catch and a little smoky.','Hexadecane is hard to light and burns with a smoky flame.'][i];narrate(K.msg);controls();A.redraw();K.want()}
function tapLink(j){if(view()!=='link'||K.order.includes(j))return;const want=K.order.length;if(j===want){K.order.push(j);A.sound.pop();K.msg=K.order.length===LINK.length?'Cause to effect: chain length → forces → energy → properties.':'Yes. What does that lead to?'}
 else{A.sound.miss();K.bad=j;setTimeout(()=>{K.bad=null;A.redraw()},A.reduced()?10:700);K.msg=j===4?'That is the final effect. Start with what changes first.':j>want?'Not yet: something has to cause that first.':'Already placed.'}narrate(K.msg);controls();A.redraw();K.want()}
/* ---------- buttons ---------- */
function controls(){if(!bar)return;bar.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||t},bar,t).onclick=f};
 if(v==='plot'){b('− carbon',()=>setN(K.n-1),'Remove one carbon');b('+ carbon',()=>setN(K.n+1),'Add one carbon')}
 if(v==='boil'){b('Pentane C5',()=>pick(5));b('Decane C10',()=>pick(10));b('Heat +20 °C',()=>heat(K.T+20),'Raise the temperature by 20 degrees')}
 if(v==='room'&&!K.done)[3,4,5,6].forEach(n=>b('C'+n,()=>tapTube(n),`Choose ${NAME[n]}`));
 if(v==='pour'&&K.race<RACES.length)b('Pour',pour,'Pour both liquids');
 if(v==='burn')DISH.forEach((n,i)=>{if(!K.lit[i])b('Light C'+n,()=>light(i),'Hold the match to C'+n)});
 if(v==='link')K.deck.forEach(j=>{if(!K.order.includes(j))b(LINK[j],()=>tapLink(j))})}
/* ---------- pointer ---------- */
function down(p){const v=view();
 if(v==='plot'){K.grab=1;dragChain(p);return true}
 if(v==='boil'){const th=thermo();if(p.x>th.x-20){K.grab=1;heat(-200+(1-(p.y-th.y)/th.h)*560);return true}return false}
 if(v==='room'){for(let i=0;i<20;i++)if(hit(p,tube(i)))tapTube(i+1);return false}
 if(v==='pour'){pour();return false}
 if(v==='burn'){if(Math.hypot(p.x-K.match.x,p.y-K.match.y)<40){K.grab=1;return true}return false}
 if(v==='link'){K.deck.forEach((j,i)=>{if(hit(p,linkRect(i)))tapLink(j)});return false}return false}
const bond=()=>Math.min(A.W*.84/(20*.87),26);
function dragChain(p){const b=bond();setN(Math.round((p.x-A.W*.08)/(b*.87))+1)}
function move(p){if(!K.grab)return;const v=view();if(v==='plot')dragChain(p);if(v==='boil'){const th=thermo();heat(-200+(1-(p.y-th.y)/th.h)*560)}
 if(v==='burn'){K.match={x:p.x,y:p.y};DISH.forEach((_,i)=>{if(hit(p,dish(i)))light(i)});A.redraw()}}
function up(){K.grab=0}
/* ---------- steps ---------- */
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function demo(i,acts,ms){steps[i].go();const r=K.run;acts.forEach((f,j)=>setTimeout(()=>{if(r===K.run)f()},A.reduced()?30*(j+1):(j+1)*(ms||400)))}
function clear(o){const run=(K.run||0)+1;for(const x in K)delete K[x];Object.assign(K,{run,want:()=>{},n:1,seen:[1],T:-40,boiled:{},shown:0,done:0,bad:null,race:0,fo:[{v:0},{v:0}],time:[null,null],busy:0,lit:[0,0,0],match:{x:A?A.W*.5:300,y:A?A.H*.3:100},order:[],deck:[2,0,4,1,3],grab:0,msg:''},o||{})}
const steps=[
{h:'Grow the chain',p:'Each step adds one CH₂ to the alkane. Plot the real boiling point for each chain length.',
 predict:{q:'As the chain gets longer, the boiling point…',opts:['rises','falls','stays the same'],ans:0},task:'Plot C1 to C8',
 show:()=>demo(0,[2,3,4,5,6,7,8].map(n=>()=>setN(n)),300),
 go:()=>{clear();narrate('Drag the chain end to add carbons.');controls();K.want=finish(0,()=>[1,2,3,4,5,6,7,8].every(n=>K.seen.includes(n)),'Boiling point rises with chain length: −162 °C for C1 to 126 °C for C8.')}},
{h:'What breaks?',p:'Heat pentane, then decane. Watch what separates when each one boils.',
 predict:{q:'When decane boils, what is overcome?',opts:['Forces between molecules','C–C and C–H bonds','Both'],ans:0},task:'Boil C5 and C10',
 show:()=>demo(1,[()=>heat(40),()=>pick(10),()=>heat(180)],600),
 go:()=>{clear({n:5,T:-40});narrate('Drag the thermometer up to heat pentane.');controls();K.want=finish(1,()=>K.boiled.C5&&K.boiled.C10,'Boiling separates whole molecules. Decane has more contact, so stronger forces and a higher boiling point.')}},
{h:'Gas or liquid at 20 °C?',p:'An alkane is a gas at room temperature if it boils below 20 °C.',
 predict:{q:'Which alkanes are gases at 20 °C?',opts:['C1 to C4','C1 to C10','Only methane'],ans:0},task:'Find the first liquid',
 show:()=>demo(2,[()=>tapTube(5)]),
 go:()=>{clear({seen:[...Array(20)].map((_,i)=>i+1)});narrate('Tap the shortest alkane that is a liquid at 20 degrees.');controls();K.want=finish(2,()=>K.done,'C1–C4 are gases, C5–C16 liquids, C17 and above waxy solids.')}},
{h:'Viscosity race',p:'Viscosity is how thick a liquid is, or how slowly it flows. Pour two alkanes at once.',
 predict:{q:'Which flows faster: hexane C6 or hexadecane C16?',opts:['Hexane','Hexadecane','The same'],ans:0},task:'Run 2 races',
 show:()=>demo(3,[()=>{K.chain=1;pour()}],300),
 go:()=>{clear();narrate('Tap Pour to race the two liquids.');controls();K.want=finish(3,()=>K.race>=2,'Longer chains have stronger forces between molecules, so they flow more slowly.')}},
{h:'Light it',p:'Flammability is how easily a fuel catches fire. Hold the match over each dish.',
 predict:{q:'Which catches fire most easily?',opts:['C6','C16','All the same'],ans:0},task:'Light all 3 dishes',
 show:()=>demo(4,[()=>light(0),()=>light(1),()=>light(2)]),
 go:()=>{clear();narrate('Drag the match onto each dish.');controls();K.want=finish(4,()=>K.lit.every(Boolean),'Short chains evaporate easily, so they light easily. Long chains are less flammable and smokier.')}},
{h:'Explain the trend',p:'Build the explanation from cause to effect. Each card leads to the next.',task:'Put 5 cards in order',
 show:()=>demo(5,[0,1,2,3,4].map(j=>()=>tapLink(j))),
 go:()=>{clear();narrate('Tap the cards in cause to effect order.');controls();K.want=finish(5,()=>K.order.length===5,'Chain length → contact → forces → energy → properties.')}},
{h:'Challenge',p:'',go:()=>{clear({seen:[1,4,5,8,10,16,20]});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
/* ---------- challenge ---------- */
const QS=[['Why does octane boil higher than pentane?',[['Stronger forces between its molecules','ok'],['Its C–C bonds are stronger','bonds'],['It has fewer hydrogen atoms','fewerH']]],
 ['What breaks when hexane boils?',[['Forces between molecules','ok'],['Covalent C–H bonds','bonds'],['The carbon chain','chain']]],
 ['Butane boils at −1 °C. At 20 °C it is…',[['A gas','ok'],['A liquid','liquid'],['A solid','solid']]],
 ['Which alkane is the most viscous?',[['C16H34','ok'],['C6H14','visc'],['C8H18','visc']]],
 ['Which alkane is the most flammable?',[['C5H12','ok'],['C12H26','flam'],['C20H42','flam']]],
 ['Pentane boils at 36 °C and heptane at 98 °C. Hexane, C6, boils at about…',[['69 °C','ok'],['20 °C','fall'],['150 °C','big']]],
 ['A longer alkane chain makes…',[['A higher boiling point, lower flammability','ok'],['A lower boiling point','fall'],['Higher flammability','flam']]]];
function reason(t){let m='Longer chains: more contact, stronger forces between molecules, more energy to separate them.';
 if(t==='bonds'||t==='chain')m='Boiling does not break covalent bonds. The molecules separate whole; only the weak forces between them are overcome.';
 if(t==='fewerH')m='Octane has more hydrogens (C8H18). The cause is chain length: more contact means stronger forces between molecules.';
 if(t==='liquid'||t==='solid')m='20 °C is above butane\u2019s boiling point of −1 °C, so it has already boiled: it is a gas.';
 if(t==='visc')m='Viscosity rises with chain length. Long chains attract each other more strongly, so they flow slowly.';
 if(t==='flam')m='Flammability falls as chains get longer. Short chains evaporate and catch fire easily.';
 if(t==='fall')m='The trend goes up, not down: each extra CH₂ raises the boiling point.';
 if(t==='big')m='Hexane sits between C5 and C7, so its boiling point is between 36 °C and 98 °C.';
 return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],sh=(qk*2+1)%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>score(t)});narrate('Challenge: '+q);A.redraw()}
function score(t){cq.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct. ${good} in a row.`:'✗ '+reason(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw:paint,onStep:A=>{cq.hidden=A.step!==6;bar.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Alkane lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});controls()}});
A.start()})})();
