/* Flagship – intermolecular forces (16–18). Buttons mirror every canvas action. */
(()=>{
const FORCES=['London forces','Permanent dipole–dipole','Hydrogen bonds'];
const MOLS=[{f:'Br₂',d:'Br–Br, no polar bonds',has:[1,0,0]},{f:'HCl',d:'Hᵟ⁺–Clᵟ⁻, polar molecule',has:[1,1,0]},
{f:'CO₂',d:'Oᵟ⁻=Cᵟ⁺=Oᵟ⁻, linear',has:[1,0,0]},{f:'H₂O',d:'Hᵟ⁺–Oᵟ⁻ bonds, bent, 2 lone pairs on O',has:[1,1,1]},
{f:'CH₃OCH₃',d:'methoxymethane: C–O–C, every H is on C',has:[1,1,0]}];
const WHYF={miss0:'London forces act between all molecules: moving electrons make temporary dipoles.',
co2:'C=O bonds are polar, but linear CO₂ cancels the dipoles.',
br2:'Br–Br is not polar: both atoms have the same electronegativity.',
hclH:'Hydrogen bonds need H on N, O or F. In HCl the H is on Cl, so none form.',
etherH:'Every H in methoxymethane is on C, not O, so no hydrogen bonds.',
miss1:'This molecule is polar, so dipole–dipole forces act too.',
miss2:'H on O plus lone pairs on O: hydrogen bonds form.',
noH:'No H on N, O or F here, so no hydrogen bonds.'};
const BP=[-162,-89,-42,-1,36,69,98,126],ALKN=['methane','ethane','propane','butane','pentane','hexane','heptane','octane'];
const HB=[{a:'H₂O',b:'H₂O',an:'O',bn:'O'},{a:'NH₃',b:'H₂O',an:'N',bn:'O'}];
const HYD=[['CH₄',-162,0,0],['SiH₄',-112,0,1],['GeH₄',-88,0,2],['SnH₄',-52,0,3],['NH₃',-33,1,0],['PH₃',-88,1,1],['AsH₃',-62,1,2],['SbH₃',-17,1,3],
['H₂O',100,2,0],['H₂S',-60,2,1],['H₂Se',-41,2,2],['H₂Te',-2,2,3],['HF',20,3,0],['HCl',-85,3,1],['HBr',-67,3,2],['HI',-35,3,3]];
const ODD=['NH₃','H₂O','HF'];
const PAIRS=[{q:'Which boils higher? (Mr 46 and 44)',a:['Ethanol, C₂H₅OH','78 °C'],b:['Propane, C₃H₈','−42 °C'],win:0,why:'Ethanol’s O–H gives hydrogen bonds; propane has only London forces.',slip:'Similar Mr, similar London forces. Ethanol’s hydrogen bonds make the gap.'},
{q:'Which boils higher? (both C₂H₆O, Mr 46)',a:['Methoxymethane, CH₃OCH₃','−24 °C'],b:['Ethanol, C₂H₅OH','78 °C'],win:1,why:'Same formula, but only ethanol has O–H, so only it hydrogen bonds.',slip:'Methoxymethane has O but no O–H, so no hydrogen bonds.'},
{q:'Which mixes with water?',a:['Hexane, C₆H₁₄','does not mix'],b:['Ethanol, C₂H₅OH','mixes fully'],win:1,why:'Ethanol hydrogen bonds with water, so it mixes.',slip:'Hexane cannot hydrogen bond with water, so the layers stay apart.'}];
VIS.reg('flagimf',c=>{let A,pad,quiz,qi=-1,gen=0;
const sg=(g,col,w,...p)=>{g.strokeStyle=col;g.lineWidth=w;g.beginPath();for(let i=0;i<p.length;i+=4){g.moveTo(p[i],p[i+1]);g.lineTo(p[i+2],p[i+3])}g.stroke()};
const dot=(g,x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,7);g.fill()},ring=(g,x,y,r,c)=>{g.strokeStyle=c;g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,7);g.stroke()},W8={w:800},sub=n=>String(n).replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
const R=()=>A.redraw(),BR=()=>{buttons();R()},no=(v,k)=>part()!==v||S.won>=k,B=(...a)=>A.paint.ball(...a),M6=()=>({col:A.col.mu,w:600});
const init0=()=>({want:()=>{},r:0,won:0,red:-1,tick:[0,0,0],n:1,branch:0,pull:null,line:null,hit:[],pick:-1}),S=init0();
const part=()=>['tick','chain','draw','plot','pair','quiz'][A.step];
const em=n=>Math.round(n*(A.narrow?.95:1.08)),RM=()=>A.reduced();
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function lab(g,t,x,y,n,o){o=o||{};g.font=`${o.w||700} ${em(n)}px system-ui`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-16)}
function hA(g,x,y,u){B(x,y,u*.32,A.mix(A.col.mu,'#ffffff',.3));lab(g,'H',x,y,11,{col:'#111',w:800})}
function tile(g,x,y,w,h,col,a,bad){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=bad?A.col.rd:col;g.lineWidth=bad?4:2.5;A.paint.rrect(x,y,w,h,12);g.stroke()}
const chipR=i=>{const{W,H}=A;return{x:12,y:H*(.36+i*.15),w:W-24,h:H*.12}};
function drawTick(g){const{W,H}=A,C=A.col,m=MOLS[S.r%5];tile(g,12,H*.03,W-24,H*.27,C.cy,.1);lab(g,m.f,W/2,H*.11,26,W8);lab(g,m.d,W/2,H*.22,12.5,M6());
FORCES.forEach((f,i)=>{const r=chipR(i),on=S.tick[i];tile(g,r.x,r.y,r.w,r.h,on?C.gr:C.mu,on?.25:.06,S.red===i);lab(g,(on?'☑ ':'☐ ')+f,W/2,r.y+r.h/2,15,{w:700})});
const r=chipR(3);tile(g,W*.3,r.y,W*.4,r.h,C.ac,.18);lab(g,'Check',W/2,r.y+r.h/2,15,W8)}
const track=()=>({x0:A.W*.1,x1:A.W*.9,y:A.H*.86});
const nAt=x=>{const t=track();return Math.max(1,Math.min(8,Math.round(1+7*(x-t.x0)/(t.x1-t.x0))))};
function drawChain(g){const{W,H}=A,C=A.col,n=S.n,t=track(),bp=S.branch?9.5:BP[n-1];
const yT=v=>H*.62-(v+170)/(300)*H*.5;g.setLineDash([5,5]);sg(g,C.mu,1.5,W*.06,yT(25),W*.94,yT(25));g.setLineDash([]);lab(g,'25 °C (room)',W*.94,yT(25)-em(9),11,{...M6(),al:'right'});
BP.forEach((v,i)=>{const x=t.x0+(t.x1-t.x0)*i/7;dot(g,x,yT(v),i===n-1?7:4,i===n-1&&!S.branch?C.or:A.alpha(C.tx,.35))});
if(S.branch){const x=t.x0+(t.x1-t.x0)*4/7;dot(g,x,yT(9.5),7,C.vi);lab(g,'branched',x+em(30),yT(9.5),11,{col:C.vi,w:700})}
const L=Math.min(26,(W*.8)/(n+1));let cx=W/2-L*(n-1)/2;for(let i=0;i<n;i++){const x=cx+i*L,y=H*.1+(i%2?L*.35:0);if(i){sg(g,C.tx,3,x-L,H*.1+((i-1)%2?L*.35:0),x,y)}
if(!(S.branch&&n===5&&i>2))B(x,y,8,C.mu)}
if(S.branch&&n===5){const x=cx+2*L,y=H*.1+L*.35;[[0,-1],[0,1],[1,0]].forEach(([dx,dy])=>{sg(g,C.tx,3,x,y,x+dx*L*.9,y+dy*L*.9);B(x+dx*L*.9,y+dy*L*.9,8,C.mu)})}
lab(g,`${S.branch?'2,2-dimethylpropane':ALKN[n-1]}  C${n>1?sub(n):''}H${sub(2*n+2)}  ·  ${8*n+2} electrons  ·  bp ${bp<0?'−'+(-bp):bp} °C`,W/2,H*.24,12.5,W8);
sg(g,C.mu,4,t.x0,t.y,t.x1,t.y);const hx=t.x0+(t.x1-t.x0)*(n-1)/7;B(hx,t.y,13,C.or);lab(g,'drag: number of carbons',W/2,t.y+em(20),11,M6())}
function hbGeo(){const{W,H}=A,ax=W*.27,bx=W*.72,y=H*.42,u=Math.min(W,H)*.09;return{ax,bx,y,u,start:{x:ax+u*1.3,y},
t:[{k:'lp',x:bx-u*1.05,y:y-u*.05},{k:'H',x:bx+u*.75,y:y-u*1.15},{k:'own',x:ax,y}]}}
function drawDraw(g){const{W,H}=A,C=A.col,P=HB[Math.min(S.r,1)],G=hbGeo(),u=G.u;
sg(g,C.tx,3,G.ax,G.y,G.start.x,G.y,G.ax,G.y,G.ax-u*.7,G.y-u*1.05,...(P.an==='N'?[G.ax,G.y,G.ax-u*.75,G.y+u]:[]));
B(G.ax,G.y,u*.55,P.an==='O'?C.rd:C.ac);lab(g,P.an,G.ax,G.y,15,{col:'#fff',w:800});lab(g,'δ−',G.ax-u*.1,G.y+u*.95,12,{col:C.tx});
[[G.start.x,G.y],[G.ax-u*.7,G.y-u*1.05]].concat(P.an==='N'?[[G.ax-u*.75,G.y+u*1]]:[]).forEach(([x,y])=>hA(g,x,y,u));
lab(g,'δ+',G.start.x,G.y-u*.6,12,{col:C.tx});lab(g,P.a,G.ax,G.y-u*1.75,13,{w:800,col:C.mu});
sg(g,C.tx,3,G.bx,G.y,G.bx+u*.75,G.y-u*1.15,G.bx,G.y,G.bx+u*.75,G.y+u*1.15);
B(G.bx,G.y,u*.55,C.rd);lab(g,'O',G.bx,G.y,15,{col:'#fff',w:800});[[G.bx+u*.75,G.y-u*1.15],[G.bx+u*.75,G.y+u*1.15]].forEach(([x,y])=>hA(g,x,y,u));
[[-.82,-.32],[-.82,.32]].forEach(([dx,dy])=>{g.fillStyle=C.tx;[-.08,.08].forEach(e=>{g.beginPath();g.arc(G.bx+dx*u+e*u,G.y+dy*u,u*.07,0,7);g.fill()})});lab(g,'lone pairs',G.bx-u*1.2,G.y+u*.9,11,M6());lab(g,P.b,G.bx,G.y-u*1.75,13,{w:800,col:C.mu});
G.t.forEach((t,i)=>{if(S.red===i){ring(g,t.x,t.y,u*.45,C.rd)}});
const ln=S.line||(S.pull?{x:S.pull.x,y:S.pull.y,ok:0}:null);if(ln){g.setLineDash([6,5]);sg(g,ln.ok?C.gr:C.or,3,G.start.x+u*.3,G.y,ln.x,ln.y);g.setLineDash([]);if(ln.ok)lab(g,'hydrogen bond',(G.start.x+ln.x)/2,G.y+u*.55,12,{col:C.gr,w:800})}
lab(g,`Drag from the δ+ H on ${P.a} to where it is attracted (${S.won} of 2)`,W/2,H*.84,12,M6())}
const plotXY=(p,gi)=>{const{W,H}=A;return{x:W*.14+W*.76*p/3,y:H*.78-(gi+170)/290*H*.66}};
function drawPlot(g){const{W,H}=A,C=A.col,cols=[C.mu,C.ac,C.rd,C.gr];
g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=1.5;g.beginPath();g.moveTo(W*.12,H*.1);g.lineTo(W*.12,H*.8);g.lineTo(W*.94,H*.8);g.stroke();
[-150,-100,-50,0,50,100].forEach(v=>{const y=plotXY(0,v).y;lab(g,String(v).replace('-','−'),W*.1,y,10,{...M6(),al:'right'})});
[2,3,4,5].forEach((p,i)=>lab(g,'Period '+p,plotXY(i,0).x,H*.84,10,M6()));lab(g,'boiling point / °C',W*.13,H*.05,10.5,{al:'left',col:C.mu,w:700});
[0,1,2,3].forEach(gr=>{const pts=HYD.filter(h=>h[2]===gr);g.strokeStyle=cols[gr];g.lineWidth=2.5;g.beginPath();pts.forEach((h,i)=>{const p=plotXY(h[3],h[1]);i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y)});g.stroke();
pts.forEach(h=>{const p=plotXY(h[3],h[1]),found=S.hit.includes(h[0]);dot(g,p.x,p.y,found?9:6,cols[gr]);if(found){ring(g,p.x,p.y,13,C.am)}
if(found||S.red===h[0])lab(g,h[0],p.x+em(16),p.y-em(10),11,{col:S.red===h[0]?C.rd:C.tx,w:800})});
lab(g,'Group '+(14+gr),W*.94,H*(.12+gr*.055),10.5,{al:'right',col:cols[gr],w:800})});
lab(g,`Tap the 3 hydrides that break their group's trend (${S.hit.length} of 3)`,W/2,H*.93,12,M6())}
const sideR=i=>{const{W,H}=A,w=(W-36)/2;return{x:12+i*(w+12),y:H*.2,w,h:H*.42}};
function drawPair(g){const{W,H}=A,C=A.col,P=PAIRS[Math.min(S.r,2)];lab(g,P.q,W/2,H*.09,14,W8);
[P.a,P.b].forEach((s,i)=>{const r=sideR(i),shown=S.pick>=0;tile(g,r.x,r.y,r.w,r.h,shown&&i===P.win?C.gr:C.ac,.12,S.red===i);s[0].split(', ').forEach((t,j)=>lab(g,t,r.x+r.w/2,r.y+r.h*(.22+j*.18),13,W8));if(shown)lab(g,s[1],r.x+r.w/2,r.y+r.h*.72,15,{w:800,col:i===P.win?C.gr:C.tx})});
lab(g,'Tap your answer',W/2,H*.72,12,M6())}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.45);g.fillRect(0,0,W,H);
if(v==='quiz')return;
({tick:drawTick,chain:drawChain,draw:drawDraw,plot:drawPlot,pair:drawPair})[v](g);A.fx.draw(g)}
const target=()=>({tick:5,chain:2,draw:2,plot:1,pair:3}[part()]||9);
const err=(t,i)=>{A.sound.miss();S.red=i==null?-1:i;voice(t);setTimeout(()=>{S.red=-1;R()},RM()?10:1000);R()};
function plus(t){S.won++;S.r++;A.sound.pop();S.tick=[0,0,0];S.line=null;S.pick=-1;voice(S.won<target()?t+' Next.':t);BR();if(S.won>=target())S.want()}
function flip(i){if(no('tick',5))return;S.tick[i]=S.tick[i]?0:1;A.sound.tick();voice(`${FORCES[i]} ${S.tick[i]?'ticked':'unticked'}.`);BR()}
function checkTick(){if(no('tick',5))return;const m=MOLS[S.r%5],t=S.tick;
if(!t[0])return err(WHYF.miss0,0);
if(t[1]&&!m.has[1])return err(m.f==='CO₂'?WHYF.co2:WHYF.br2,1);
if(t[2]&&!m.has[2])return err(m.f==='HCl'?WHYF.hclH:m.f==='CH₃OCH₃'?WHYF.etherH:WHYF.noH,2);
if(!t[1]&&m.has[1])return err(WHYF.miss1,1);if(!t[2]&&m.has[2])return err(WHYF.miss2,2);
plus(`${m.f}: ${FORCES.filter((f,i)=>m.has[i]).join(' + ')}.`)}
function solveTick(){const m=MOLS[S.r%5];S.tick=m.has.slice();BR()}
function setN(n){if(no('chain',2))return;S.n=Math.max(1,Math.min(8,n));S.branch=0;voice(`${ALKN[S.n-1]}: ${8*S.n+2} electrons, boils at ${BP[S.n-1]} °C.`);R()}
function liquidQ(){if(no('chain',1))return;const n=S.n;if(n<5)return err(`${ALKN[n-1]} boils at ${BP[n-1]} °C, so it is a gas at 25 °C. Add carbons.`);
if(n>5)return err(`${ALKN[n-1]} is liquid, but so is a shorter one.`);S.won++;A.sound.pop();voice('Pentane boils at 36 °C: the first liquid. Now branch it.');BR()}
function branchIt(){if(part()!=='chain'||S.won!==1)return;if(S.n!==5)return err('Go back to pentane, C₅H₁₂, to compare its branched isomer.');S.branch=1;S.won++;A.sound.pop();
voice('2,2-dimethylpropane boils at 9.5 °C: same electrons, less contact, weaker London forces.');BR();S.want()}
function aim(k){if(no('draw',2))return;const G=hbGeo(),i=G.t.findIndex(t=>t.k===k),P=HB[Math.min(S.r,1)];
if(k==='H')return err('That H is δ+ too, so they repel. Aim for a lone pair.',i);
if(k==='own')return err(`That is the covalent ${P.an}–H bond in its own molecule. Aim at the other molecule.`,i);
S.line={x:G.t[0].x,y:G.t[0].y,ok:1};A.sound.pop();S.won++;voice(S.won<2?`Hydrogen bond: ${P.an}–H···O, close to a straight line. Next.`:'Two hydrogen bonds drawn.');
setTimeout(()=>{S.line=null;S.r=S.won;R()},RM()?10:900);BR();if(S.won>=2)S.want()}
function hitPt(name){if(no('plot',1))return;if(name==null)name=ODD.find(o=>!S.hit.includes(o));if(S.hit.includes(name))return;
if(!ODD.includes(name)){const h=HYD.find(x=>x[0]===name);return err(h[0]==='CH₄'?'CH₄ fits its trend: no hydrogen bonds.':`${h[0]} fits its trend: more electrons, stronger London forces.`,name)}
S.hit.push(name);A.sound.tick();if(S.hit.length>=3)return plus('NH₃, H₂O and HF: H on N, O or F, so hydrogen bonds.');voice(`${name} is far above its trend: hydrogen bonds. Find the rest.`);R()}
function choose(i){if(no('pair',3))return;const P=PAIRS[Math.min(S.r,2)];if(i==null)i=P.win;if(i!==P.win)return err(P.slip,i);S.pick=i;R();plus(P.why)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),Bn=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
if(v==='quiz'||S.won>=target())return;
if(v==='tick'){FORCES.forEach((f,i)=>Bn((S.tick[i]?'☑ ':'☐ ')+f,()=>flip(i),`${f}: ${S.tick[i]?'ticked':'not ticked'}`));Bn('Check',checkTick)}
if(v==='chain'){Bn('− carbon',()=>setN(S.n-1),'Remove a carbon');Bn('+ carbon',()=>setN(S.n+1),'Add a carbon');if(S.won===0)Bn('Liquid at 25 °C?',liquidQ,'Is this the shortest alkane that is liquid at 25 °C?');if(S.won===1)Bn('Branch it',branchIt,'Show the branched isomer')}
if(v==='draw'){Bn('To a lone pair on the other O',()=>aim('lp'));Bn('To an H on the other molecule',()=>aim('H'));Bn('To its own atom',()=>aim('own'),'To the atom in its own molecule')}
if(v==='plot')HYD.forEach(h=>Bn(h[0],()=>hitPt(h[0]),`${h[0]}, boiling point ${h[1]} °C`));
if(v==='pair'){const P=PAIRS[Math.min(S.r,2)];[P.a,P.b].forEach((s,i)=>Bn(s[0],()=>choose(i)))}}
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
function down(p){const v=part();if(S.won>=target())return false;
if(v==='tick'){for(let i=0;i<3;i++){const r=chipR(i);if(p.y>r.y&&p.y<r.y+r.h)flip(i)}const r=chipR(3);if(p.y>r.y&&p.y<r.y+r.h)checkTick()}
if(v==='chain'){const t=track();if(Math.abs(p.y-t.y)<40){S.pull={chain:1};setN(nAt(p.x));return true}}
if(v==='draw'){const G=hbGeo();if(near(p,G.start,G.u*.9)){S.pull={x:p.x,y:p.y};R();return true}const t=G.t.find(t=>near(p,t,G.u*.6));if(t)aim(t.k)}
if(v==='plot'){const h=HYD.find(h=>near(p,plotXY(h[3],h[1]),18));if(h)hitPt(h[0])}
if(v==='pair'){[0,1].forEach(i=>{const r=sideR(i);if(p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h)choose(i)})}
return false}
function move(p){if(!S.pull)return;if(S.pull.chain)return setN(nAt(p.x));S.pull.x=p.x;S.pull.y=p.y;R()}
function up(p){const d=S.pull;S.pull=null;if(!d||d.chain)return R();const G=hbGeo(),t=G.t.find(t=>near(p,t,G.u*.7));if(t)aim(t.k);else err('Let go on what the δ+ H is attracted to.')}
const gate=(n,k,msg)=>()=>{if(A.step===n&&S.won>=k&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function seq(fns,gap){const k=++gen;fns.forEach((fn,j)=>setTimeout(()=>{if(k===gen)fn()},RM()?j*40+30:(j+1)*(gap||260)))}
const wipe=()=>{gen++;Object.assign(S,init0())};
const steps=[
{h:'Which forces act?',p:'Tick each force acting between the molecules, then press Check.',
predict:{q:'Do London forces act between polar molecules such as HCl?',opts:['No, only between non-polar molecules','Yes, between all molecules'],ans:1},task:'Get all 5 substances right',
show:()=>{steps[0].go();const f=[];MOLS.forEach(()=>{f.push(solveTick,checkTick)});seq(f,180)},go:()=>{wipe();voice('Which forces act between Br₂ molecules?');buttons();S.want=gate(0,5,'London always; dipole–dipole if polar; H bonds need H on N, O or F.')}},
{h:'Chain length',p:'Drag the track to change the carbons. Find the shortest alkane that is liquid at 25 °C, then branch it.',
predict:{q:'Pentane and 2,2-dimethylpropane are both C₅H₁₂. Which boils higher?',opts:['Same: same Mr and electrons','Pentane: more surface contact'],ans:1},task:'Find the first liquid alkane, then branch it',
show:()=>{steps[1].go();seq([()=>setN(2),()=>setN(3),()=>setN(4),()=>setN(5),liquidQ,branchIt],300)},go:()=>{wipe();voice('Methane, 10 electrons, boils at −162 °C.');buttons();S.want=gate(1,2,'More electrons and contact, stronger London forces.')}},
{h:'Draw a hydrogen bond',p:'Drag from the δ+ H to the place it is attracted to on the other molecule.',
predict:{q:'A hydrogen bond is…',opts:['a covalent O–H bond inside one molecule','an attraction from a δ+ H to a lone pair on another molecule'],ans:1},task:'Draw 2 hydrogen bonds',
show:()=>{steps[2].go();seq([()=>aim('lp'),()=>aim('lp')],1000)},go:()=>{wipe();voice('Water and water. Drag from the δ+ H.');buttons();S.want=gate(2,2,'δ+ H on N, O or F to a lone pair on another molecule.')}},
{h:'Odd ones out',p:'Hydride boiling points, groups 14 to 17. Each should rise down the group. Tap the points that break the trend.',
predict:{q:'Following the group 16 trend, does H₂O boil lowest?',opts:['Yes, at about −80 °C','No, it boils far higher'],ans:1},task:'Tap the 3 anomalies',
show:()=>{steps[3].go();seq(ODD.map(()=>()=>hitPt()),350)},go:()=>{wipe();voice('Find the three points above their trend.');buttons();S.want=gate(3,1,'NH₃, H₂O and HF break the trend: hydrogen bonds.')}},
{h:'Similar Mr, big gap',p:'Each pair has almost the same Mr. Tap the higher boiler, or the one that mixes.',task:'Get all 3 pairs right',
show:()=>{steps[4].go();seq([0,1,2].map(()=>()=>choose()),400)},go:()=>{wipe();voice(PAIRS[0].q);buttons();S.want=gate(4,3,'Hydrogen bonds explain both.')}},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Why does H₂O boil much higher than H₂S?',[['Hydrogen bonds form between H₂O molecules','ok'],['O–H covalent bonds are stronger than S–H','cov'],['H₂O has more electrons','elec']]],
['Which has hydrogen bonds between its own molecules?',[['Methanol, CH₃OH','ok'],['Methoxymethane, CH₃OCH₃','ether'],['Hydrogen chloride, HCl','hcl']]],
['Why does boiling point rise from F₂ to I₂?',[['More electrons, so stronger London forces','ok'],['The I–I bond is stronger','iibond'],['I₂ molecules are polar','polar']]],
['CO₂ has polar C=O bonds. Which forces act between CO₂ molecules?',[['Only London forces','ok'],['Permanent dipole–dipole forces','cancel'],['Hydrogen bonds','hbo']]],
['When water boils, what is overcome?',[['Hydrogen bonds and other forces between molecules','ok'],['The O–H covalent bonds','breakcov'],['Ionic bonds','ionic']]]];
function why(t){let m='Which forces act? Compare them.';
if(t==='cov')m='Boiling does not break covalent bonds. Water has hydrogen bonds between molecules.';
if(t==='elec')m='H₂S has more electrons (18 vs 10). Water wins by hydrogen bonds.';
if(t==='ether')m='Methoxymethane has no H on O, so no hydrogen bonds.';
if(t==='hcl')m='Cl is not N, O or F, so HCl has no hydrogen bonds.';
if(t==='iibond')m='Boiling does not break I–I bonds. More electrons, stronger London forces.';
if(t==='polar')m='Halogens are non-polar: only London forces act.';
if(t==='cancel')m='Linear CO₂: the C=O dipoles cancel.';
if(t==='hbo')m='CO₂ has no H, so no hydrogen bonds.';
if(t==='breakcov')m='Steam is still H₂O. Only the forces between molecules are overcome.';
if(t==='ionic')m='Water is molecular, not ionic.';
return m}
function pose(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});voice('Challenge: '+q);R()}
let chainOk=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
if(ok){chainOk++;A.win()}else{chainOk=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${chainOk}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});buttons()}});
A.start()})})();
