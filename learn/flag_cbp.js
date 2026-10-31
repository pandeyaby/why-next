/* Flagship – physical properties of aldehydes and ketones (16–18). Buttons mirror every canvas action. */
(()=>{
const LAD=[[['butane, C₄H₁₀','Mr 58',-0.5],['propanal, CH₃CH₂CHO','Mr 58',48],['propan-1-ol, C₃H₇OH','Mr 60',97]],
 [['pentane, C₅H₁₂','Mr 72',36],['butanal, C₃H₇CHO','Mr 72',75],['butan-1-ol, C₄H₉OH','Mr 74',118]]],LMIX=[[1,2,0],[2,0,1]];
const FOR=['London only','London + dipole–dipole','London + dipole–dipole + hydrogen bonds'];
const MOL=[{f:'propanal',d:'CH₃CH₂CHO · polar C=O · every H on C',a:1},{f:'butane',d:'CH₃CH₂CH₂CH₃ · no polar bonds',a:0},
 {f:'propanone',d:'CH₃COCH₃ · polar C=O · every H on C',a:1},{f:'propan-1-ol',d:'CH₃CH₂CH₂OH · O–H group',a:2}];
const ALD=['methanal','ethanal','propanal','butanal','pentanal','hexanal'],BPT=[-19,20,48,75,103,131],SOL=[99,99,31,7,1.2,0.6];
const SEEK=[{q:'First aldehyde below 10 g per 100 mL of water?',n:4},{q:'First aldehyde that boils above 100 °C?',n:5}];
const THM=[['propane','C₃H₈ · Mr 44',-42],['ethanal','CH₃CHO · Mr 44',20],['ethanol','C₂H₅OH · Mr 46',78]],TORD=[1,2,0];
const fmt=v=>v<0?'−'+(-v):String(v);
VIS.reg('flagcbp',c=>{let A,ctl,box,ci=-1,tk=0;
const blank=()=>({want:()=>{},won:0,r:0,got:[],bad:-1,n:1,seek:0,drag:null,bond:0,spot:[]}),S=blank();
const part=()=>['ladder','forces','water','chain','therm','quiz'][A.step],quick=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?.96:1.1));
const RD=()=>A.redraw(),MU=()=>({col:A.col.mu,w:600}),B8={w:800},tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const goal=()=>({ladder:2,forces:4,water:2,chain:2,therm:3}[part()]||9);
function txt(g,t,x,y,n,o){o=o||{};g.font=`${o.w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function card(g,r,warn,good){const C=A.col;g.fillStyle=good?A.alpha(C.gr,.22):(C.dark?'#14202e':'#f4f8fb');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=warn?C.rd:good?C.gr:A.alpha(C.tx,.65);g.lineWidth=warn||good?4:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const inR=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,close=(p,q,d)=>Math.hypot(p.x-q.x,p.y-q.y)<d;
const line=(g,col,w,a,b,x,y)=>{g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(a,b);g.lineTo(x,y);g.stroke()};
/* ---- ladder: lowest boiling point first ---- */
const rungs=()=>{const h=A.H*.17;return[0,1,2].map(i=>({x:12,y:A.H*.2+i*(h+8),w:A.W-24,h}))};
function drawLadder(g){const C=A.col,set=LAD[Math.min(S.r,1)],mix=LMIX[Math.min(S.r,1)];txt(g,'Tap: lowest boiling point first',A.W/2,A.H*.06,13,{col:C.mu});
 txt(g,`Set ${Math.min(S.r,1)+1} of 2 · ${S.got.length} of 3 placed`,A.W/2,A.H*.13,12,MU());
 rungs().forEach((r,i)=>{const m=set[mix[i]],at=S.got.indexOf(mix[i]);card(g,r,S.bad===i,at>=0);txt(g,m[0],r.x+r.w/2,r.y+r.h*.36,14,B8);
  txt(g,at>=0?`${m[1]} · boils at ${fmt(m[2])} °C · ${['lowest','middle','highest'][at]}`:m[1],r.x+r.w/2,r.y+r.h*.7,12,{col:at>=0?C.tx:C.mu,w:600})})}
function rung(i){if(part()!=='ladder'||S.won>=goal())return;const k=Math.min(S.r,1),set=LAD[k],j=LMIX[k][i];if(S.got.includes(j))return tell('Already placed.');
 const need=S.got.length;if(j!==need){let m=`${set[j][0].split(',')[0]} is not next.`;
  if(j===0&&need>0)m='The alkane has only London forces, so it boils lowest.';
  else if(j===2)m='The alcohol’s O–H gives hydrogen bonds, so it boils highest.';
  else if(j===1&&need===0)m='The aldehyde’s polar C=O adds dipole–dipole forces. Something boils lower.';return oops(m,i)}
 S.got.push(j);A.sound.tick();if(S.got.length<3){tell(`${set[j][0].split(',')[0]} boils at ${fmt(set[j][2])} °C. Next?`);return RD()}
 S.got=[];S.won++;S.r++;A.sound.pop();tell(S.won<2?'Alkane, then aldehyde, then alcohol. Next set.':'Same pattern for Mr 72: London < dipole–dipole < hydrogen bonds.');keys();RD();S.want()}
/* ---- forces between its own molecules ---- */
const fbox=i=>({x:12,y:A.H*(.38+i*.18),w:A.W-24,h:A.H*.15});
function drawForces(g){const C=A.col,m=MOL[S.r%4];card(g,{x:12,y:A.H*.03,w:A.W-24,h:A.H*.29});txt(g,m.f,A.W/2,A.H*.12,24,B8);txt(g,m.d,A.W/2,A.H*.23,12,MU());
 FOR.forEach((f,i)=>{const r=fbox(i);card(g,r,S.bad===i);txt(g,f,r.x+r.w/2,r.y+r.h/2,A.narrow&&i===2?12:14,{w:700})})}
function force(i){if(part()!=='forces'||S.won>=goal())return;const m=MOL[S.r%4];
 if(i!==m.a){let msg;if(i===2&&m.a===1)msg=`${m.f} has O but no O–H: every H is on carbon, so no hydrogen bonds between its molecules.`;
  else if(i===0&&m.a===1)msg=`The C=O in ${m.f} is polar, so permanent dipole–dipole forces act too.`;
  else if(m.a===0)msg='Butane’s C–C and C–H bonds are almost non-polar. London forces only.';
  else msg='Propan-1-ol has H on O, so hydrogen bonds form between its molecules.';return oops(msg,i)}
 win(`${m.f}: ${FOR[i]}.`)}
/* ---- water bonds to the carbonyl O ---- */
function geo(){const{W,H}=A,u=Math.min(W,H)*.085,cx=W*.26,y=H*.36,ox=cx+u*1.7,wx=W*.76,wy=H*.62;
 return{u,cx,y,ox,wx,wy,h:{x:wx-u*1.15,y:wy-u*.55},t:[{k:'lp',x:ox+u*.6,y:y+u*.42},{k:'C',x:cx,y},{k:'R',x:cx-u*.95,y:y+u*1.15}]}}
function drawWater(g){const C=A.col,G=geo(),u=G.u,ald=S.r%2===1;
 txt(g,ald?'ethanal, CH₃CHO':'propanone, CH₃COCH₃',G.cx+u*.6,A.H*.08,15,B8);txt(g,'water',G.wx,G.wy+u*1.6,13,{col:C.mu,w:800});
 line(g,C.tx,3,G.cx,G.y,G.cx-u*.95,G.y-u*1.15);line(g,C.tx,3,G.cx,G.y,G.cx-u*.95,G.y+u*1.15);
 line(g,C.tx,3,G.cx,G.y-5,G.ox,G.y-5);line(g,C.tx,3,G.cx,G.y+5,G.ox,G.y+5);
 A.paint.ball(G.cx,G.y,u*.5,C.mu);txt(g,'C',G.cx,G.y,15,{col:'#fff',w:800});txt(g,'δ+',G.cx,G.y-u*.8,12);
 A.paint.ball(G.ox,G.y,u*.5,C.rd);txt(g,'O',G.ox,G.y,15,{col:'#fff',w:800});txt(g,'δ−',G.ox,G.y-u*.85,12);
 [[.6,-.42],[.6,.42]].forEach(([dx,dy])=>[-.09,.09].forEach(e=>{g.fillStyle=C.tx;g.beginPath();g.arc(G.ox+dx*u,G.y+dy*u+e*u,u*.07,0,7);g.fill()}));
 txt(g,'CH₃',G.cx-u*.95,G.y-u*1.4,13,B8);txt(g,ald?'H':'CH₃',G.cx-u*.95,G.y+u*1.4,13,B8);
 line(g,C.tx,3,G.wx,G.wy,G.h.x,G.h.y);line(g,C.tx,3,G.wx,G.wy,G.wx+u*.8,G.wy+u*.7);A.paint.ball(G.wx,G.wy,u*.45,C.rd);txt(g,'O',G.wx,G.wy,13,{col:'#fff',w:800});
 [[G.h.x,G.h.y],[G.wx+u*.8,G.wy+u*.7]].forEach(([x,y])=>{A.paint.ball(x,y,u*.3,A.mix(C.mu,'#ffffff',.35));txt(g,'H',x,y,11,{col:'#111',w:800})});txt(g,'δ+',G.h.x-u*.55,G.h.y-u*.35,12);
 G.t.forEach((t,i)=>{if(S.bad===i){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(t.x,t.y,u*.42,0,7);g.stroke()}});
 const end=S.bond?G.t[0]:S.drag;if(end){g.setLineDash([6,5]);line(g,S.bond?C.gr:C.or,3,G.h.x,G.h.y,end.x,end.y);g.setLineDash([]);if(S.bond)txt(g,'hydrogen bond',(G.h.x+end.x)/2+u*.4,(G.h.y+end.y)/2+u*.3,12,B8)}
 txt(g,`Drag water's δ+ H to what attracts it (${S.won} of 2)`,A.W/2,A.H*.9,12,MU())}
function aimAt(k){if(part()!=='water'||S.won>=goal()||S.bond)return;const i=geo().t.findIndex(t=>t.k===k),ald=S.r%2===1;
 if(k==='C')return oops('The carbonyl carbon is δ+, and so is the H. Like charges repel. Aim for the oxygen.',i);
 if(k==='R')return oops(ald?'That H is on carbon. It has no lone pair to attract water’s H.':'The CH₃ group is almost non-polar and has no lone pair.',i);
 S.bond=1;A.sound.pop();S.won++;tell(S.won<2?'Hydrogen bond from water’s H to a lone pair on the C=O oxygen. Next.':'Both carbonyls accept hydrogen bonds from water.');
 setTimeout(()=>{S.bond=0;S.r=S.won;RD()},quick()?10:900);keys();RD();S.want()}
/* ---- aldehyde chain length ---- */
const rail=()=>({a:A.W*.12,b:A.W*.88,y:A.H*.9}),nOf=x=>{const r=rail();return Math.max(1,Math.min(6,Math.round(1+5*(x-r.a)/(r.b-r.a))))};
function drawChain(g){const C=A.col,r=rail(),n=S.n,q=SEEK[Math.min(S.seek,1)];txt(g,S.won<2?q.q:'Both found.',A.W/2,A.H*.05,12.5,B8);
 const bw=(A.W-60)/6,base=A.H*.5;ALD.forEach((a,i)=>{const x=30+i*bw,on=i===n-1,h1=(BPT[i]+30)/170*A.H*.3,h2=Math.min(SOL[i],40)/40*A.H*.22;
  g.fillStyle=on?C.or:A.alpha(C.or,.35);g.fillRect(x+4,base-h1,bw/2-6,h1);g.fillStyle=on?C.cy:A.alpha(C.cy,.35);g.fillRect(x+bw/2,base-h2,bw/2-6,h2);
  txt(g,'C'+(i+1),x+bw/2,base+14,11,{col:on?C.tx:C.mu,w:on?800:600})});
 line(g,A.alpha(C.tx,.6),1.5,24,base,A.W-24,base);const y100=base-130/170*A.H*.3;g.setLineDash([4,4]);line(g,C.mu,1.5,24,y100,A.W-24,y100);g.setLineDash([]);txt(g,'100 °C',26,y100-10,10,{al:'left',col:C.mu});
 [[C.or,'boiling point',.12],[C.cy,'solubility',.58]].forEach(([k,t,x])=>{g.fillStyle=k;g.fillRect(A.W*x,A.H*.11-6,12,12);txt(g,t,A.W*x+18,A.H*.11,11,{al:'left'})});
 const s=SOL[n-1]>50?(n===1?'very soluble':'mixes fully'):SOL[n-1]+' g per 100 mL';
 txt(g,`${ALD[n-1]} · bp ${fmt(BPT[n-1])} °C · ${s}`,A.W/2,A.H*.62,13.5,B8);txt(g,`Mr ${14*n+16} · ${8*n+8} electrons · one polar C=O`,A.W/2,A.H*.69,12,MU());
 line(g,C.mu,4,r.a,r.y,r.b,r.y);A.paint.ball(r.a+(r.b-r.a)*(n-1)/5,r.y,13,C.or);txt(g,'drag: number of carbons',A.W/2,r.y-24,11,MU())}
function setC(n){if(part()!=='chain'||S.won>=goal())return;S.n=Math.max(1,Math.min(6,n));const i=S.n-1;tell(`${ALD[i]}: boils at ${BPT[i]} °C, ${SOL[i]>50?'very soluble':SOL[i]+' g per 100 mL'}.`);RD()}
function test(){if(part()!=='chain'||S.won>=goal())return;const q=SEEK[S.seek],n=S.n;
 if(n<q.n){const m=S.seek?`${ALD[n-1]} boils at ${BPT[n-1]} °C, below water. Add carbons: more electrons, stronger London forces.`:`${ALD[n-1]} still dissolves well: its C=O accepts hydrogen bonds from water. Add carbons.`;return oops(m)}
 if(n>q.n)return oops(`A shorter aldehyde qualifies too.`);S.seek++;S.won++;A.sound.pop();
 tell(S.won<2?'Butanal: the longer non-polar chain gets in the way of water. Next question.':'Pentanal, 103 °C: London forces grow with chain length.');keys();RD();S.want()}
/* ---- thermometer ---- */
const scale=v=>A.W*.1+(v+60)/160*A.W*.8,marks=()=>THM.map(m=>({x:scale(m[2])-26,y:A.H*.14,w:52,h:A.H*.24}));
function chip(){const r={x:A.W*.15,y:A.H*.64,w:A.W*.7,h:A.H*.18};return S.drag&&S.drag.x!=null?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r}
function drawTherm(g){const C=A.col,y=A.H*.46;marks().forEach(r=>line(g,C.mu,2,r.x+26,r.y+r.h,r.x+26,y));line(g,A.alpha(C.tx,.7),8,scale(-60),y,scale(100),y);
 [-40,0,25,50,100].forEach(v=>{line(g,C.mu,2,scale(v),y+8,scale(v),y+16);txt(g,v===25?'room':fmt(v),scale(v),y+28,10,MU())});
 marks().forEach((r,i)=>{const who=S.spot.indexOf(i);card(g,r,S.bad===i,who>=0);txt(g,fmt(THM[i][2])+' °C',r.x+r.w/2,r.y+16,11,B8);
  if(who>=0)txt(g,THM[i][0],r.x+r.w/2,r.y+r.h-14,10,B8)});
 if(S.won<3){const m=THM[TORD[S.won]],r=chip();card(g,r);txt(g,m[0],r.x+r.w/2,r.y+r.h*.36,15,B8);txt(g,m[1],r.x+r.w/2,r.y+r.h*.7,12,MU())}
 txt(g,'Drag the card to its boiling point',A.W/2,A.H*.08,12,MU())}
function pin(i){if(part()!=='therm'||S.won>=goal())return;const k=TORD[S.won],m=THM[k];if(S.spot[i]!=null)return oops('That mark is taken.',i);
 if(i!==k){let msg=`${m[0]} does not boil at ${fmt(THM[i][2])} °C.`;
  if(k===1&&i===2)msg='Ethanal has C=O but no O–H, so no hydrogen bonds between its molecules. It boils lower.';
  else if(k===1&&i===0)msg='Ethanal’s C=O adds dipole–dipole forces, so it boils above propane.';
  else if(k===2)msg='Ethanol’s O–H gives hydrogen bonds, the strongest force here. It boils highest.';
  else if(k===0)msg='Propane has only London forces, so it boils lowest.';return oops(msg,i)}
 S.spot[i]=k;win(`${m[0]} boils at ${fmt(m[2])} °C.`,1)}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'London < dipole–dipole < hydrogen bonds',W/2,H*.38,15,B8);txt(g,'C=O accepts H bonds from water',W/2,H*.5,14,{w:700});return}
 if(S.won>=goal()){txt(g,{ladder:'Alkane < carbonyl < alcohol',forces:'C=O: dipole–dipole, no self H bonds',water:'Water H-bonds to the C=O oxygen',chain:'Chain up: bp up, solubility down',therm:'−42 · 20 · 78 °C'}[v],W/2,H/2,15,B8);return A.fx.draw(g)}
 ({ladder:drawLadder,forces:drawForces,water:drawWater,chain:drawChain,therm:drawTherm})[v](g);A.fx.draw(g)}
function oops(t,b){A.sound.miss();S.bad=b==null?-1:b;tell(t);setTimeout(()=>{S.bad=-1;RD()},quick()?10:1000);RD()}
function win(t,keep){S.won++;if(!keep)S.r++;A.sound.pop();tell(S.won<goal()?t+' Next.':t);keys();RD();S.want()}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=part(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz'||S.won>=goal())return;
 if(v==='ladder'){const k=Math.min(S.r,1);LMIX[k].forEach((j,i)=>{if(!S.got.includes(j))K(LAD[k][j][0].split(',')[0],()=>rung(i),`Next: ${LAD[k][j][0]}`)})}
 if(v==='forces')FOR.forEach((f,i)=>K(f,()=>force(i)));
 if(v==='water'){K('To a lone pair on the C=O oxygen',()=>aimAt('lp'));K('To the C=O carbon',()=>aimAt('C'));K(S.r%2?'To the H on the carbonyl carbon':'To a CH₃ group',()=>aimAt('R'))}
 if(v==='chain'){K('− carbon',()=>setC(S.n-1),'Remove a carbon');K('+ carbon',()=>setC(S.n+1),'Add a carbon');K('This one',test,'This aldehyde answers the question')}
 if(v==='therm')THM.forEach((m,i)=>{if(S.spot[i]==null)K(`${fmt(m[2])} °C`,()=>pin(i),`Put ${THM[TORD[Math.min(S.won,2)]][0]} at ${fmt(m[2])} °C`)})}
function down(p){const v=part();if(S.won>=goal())return false;
 if(v==='ladder'){const i=rungs().findIndex(r=>inR(p,r));if(i>=0)rung(i)}
 if(v==='forces'){const i=[0,1,2].findIndex(i=>inR(p,fbox(i)));if(i>=0)force(i)}
 if(v==='water'){const G=geo();if(close(p,G.h,G.u*.9)){S.drag={x:p.x,y:p.y};RD();return true}const t=G.t.find(t=>close(p,t,G.u*.6));if(t)aimAt(t.k)}
 if(v==='chain'){if(Math.abs(p.y-rail().y)<40){S.drag={rail:1};setC(nOf(p.x));return true}}
 if(v==='therm'){if(inR(p,chip())){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}const i=marks().findIndex(r=>inR(p,r));if(i>=0)pin(i)}
 return false}
function move(p){const d=S.drag;if(!d)return;if(d.rail)return setC(nOf(p.x));if(d.x0==null||d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;RD()}}
function up(p){const d=S.drag,v=part();S.drag=null;if(!d||d.rail)return RD();
 if(v==='water'){const G=geo(),t=G.t.find(t=>close(p,t,G.u*.7));if(t)aimAt(t.k);else oops('Let go on what attracts the δ+ H.');return}
 if(v==='therm'){if(d.x==null){tell('Drag the card up to a mark, or tap the mark.');return RD()}const i=marks().findIndex(r=>p.x>r.x-10&&p.x<r.x+r.w+10&&p.y<A.H*.58);if(i>=0)pin(i);RD()}}
const fin=(n,msg)=>()=>{if(A.step===n&&S.won>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++tk;list.forEach((fn,j)=>setTimeout(()=>{if(k===tk)fn()},quick()?j*40+30:(j+1)*(gap||300)))}
const clean=()=>{tk++;Object.assign(S,blank())};
const steps=[
{h:'Same Mr, different boil',p:'Each set has almost the same Mr. Tap them from lowest to highest boiling point.',predict:{q:'Propanal and butane both have Mr 58. Does propanal boil higher?',opts:['No: same Mr, same forces','Yes: its polar C=O adds dipole–dipole forces'],ans:1},task:'Order 2 sets',
 show:()=>{steps[0].go();const f=[];[0,1].forEach(k=>[0,1,2].forEach(j=>f.push(()=>rung(LMIX[k].indexOf(j)))));play(f,280)},go:()=>{clean();tell('Which boils lowest?');keys();S.want=fin(0,'The polar C=O puts aldehydes between alkanes and alcohols.')}},
{h:'Forces between molecules',p:'Which forces act between molecules of each substance? Tap one.',predict:{q:'Can propanal molecules hydrogen bond to each other?',opts:['Yes: they contain oxygen','No: no H is bonded to the O'],ans:1},task:'Get 4 molecules right',
 show:()=>{steps[1].go();play(MOL.map(m=>()=>force(m.a)),300)},go:()=>{clean();tell('Propanal: which forces act?');keys();S.want=fin(1,'Aldehydes and ketones: London plus dipole–dipole, but no hydrogen bonds to each other.')}},
{h:'Why small ones dissolve',p:'Drag the δ+ H on water to the part of the carbonyl molecule that attracts it.',task:'Draw 2 hydrogen bonds',
 show:()=>{steps[2].go();play([()=>aimAt('lp'),()=>aimAt('lp')],1100)},go:()=>{clean();tell('Propanone and water. Drag the δ+ H.');keys();S.want=fin(2,'The C=O oxygen accepts a hydrogen bond from water.')}},
{h:'Chain length',p:'Slide from methanal (C1) to hexanal (C6). The bars show boiling point and solubility in water.',predict:{q:'As the aldehyde chain gets longer, solubility in water…',opts:['rises: stronger London forces','falls: more non-polar chain'],ans:1},task:'Answer both questions',
 show:()=>{steps[3].go();play([()=>setC(2),()=>setC(3),()=>setC(4),test,()=>setC(5),test],300)},go:()=>{clean();tell('Methanal: boils at −19 °C, very soluble.');keys();S.want=fin(3,'Longer chain: more London forces, less room for water.')}},
{h:'On the thermometer',p:'Propane, ethanal and ethanol have Mr 44 to 46. Put each at its boiling point.',task:'Place all 3',
 show:()=>{steps[4].go();play(TORD.map(k=>()=>pin(k)),400)},go:()=>{clean();tell('Where does ethanal boil?');keys();S.want=fin(4,'Ethanal sits between the alkane and the alcohol.')}},
{h:'Challenge',p:'',go:()=>{clean();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Propanal and butane both have Mr 58. Why does propanal boil higher?',[['Its polar C=O adds permanent dipole–dipole forces','ok'],['Propanal molecules hydrogen bond to each other','self'],['The C=O bond is stronger than a C–C bond','cov']]],
 ['Why does propan-1-ol boil higher than propanal?',[['Its O–H group gives hydrogen bonds between molecules','ok'],['It has a much larger Mr','mr'],['Propanal molecules have no dipole','nodip']]],
 ['Why does propanone mix with water?',[['Water’s δ+ H bonds to lone pairs on the C=O oxygen','ok'],['Propanone hydrogen bonds to itself','self'],['Propanone ionises in water','ion']]],
 ['Why is hexanal far less soluble in water than ethanal?',[['Its long non-polar chain cannot hydrogen bond with water','ok'],['Hexanal has no C=O group','noco'],['Hexanal has weaker London forces','weak']]],
 ['Ethanal boils at 20 °C. Methanal boils at −19 °C. Why the rise?',[['More electrons, so stronger London forces','ok'],['Ethanal forms hydrogen bonds to itself','self'],['Ethanal’s C=O is broken on boiling','brk']]]];
function why(t){let m='Name the forces between the molecules, then compare.';
 if(t==='self')m='No H is bonded to O in an aldehyde or ketone, so its molecules cannot hydrogen bond to each other.';
 if(t==='cov')m='Boiling does not break covalent bonds. It overcomes forces between molecules.';
 if(t==='mr')m='Mr 60 vs 58 is almost the same. The O–H hydrogen bonds make the gap.';
 if(t==='nodip')m='Propanal has a C=O dipole. The alcohol’s hydrogen bonds are stronger.';
 if(t==='ion')m='Propanone stays as molecules. It dissolves by accepting hydrogen bonds from water.';
 if(t==='noco')m='Hexanal still has a C=O. The long chain is the problem.';
 if(t==='weak')m='Hexanal has more electrons, so stronger London forces. Its chain is the problem.';
 if(t==='brk')m='The C=O stays intact. Only forces between molecules are overcome.';return m}
function next(){ci++;const[q,ops]=QS[ci%QS.length],r=ci%3;
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});tell('Challenge: '+q);RD()}
let streak=0;
function judge(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{box.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});keys()}});
A.start()})})();
