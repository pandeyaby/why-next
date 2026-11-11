/* Flagship – state symbols (ages 14–15; AQA GCSE Chemistry 4.2.2.2). Tag particle pictures, change temperature or
   dissolve to reach a target state, sort lab clues, label real equations, fix a wrong symbol. Not flagstate. */
(()=>{
const mn=Math.min,SYM=['(s)','(l)','(g)','(aq)'];
const ZOOM=[['copper metal','Cu','(s)','s'],['pure water','H₂O','(l)','l'],['oxygen','O₂','(g)','g'],['salt in water','NaCl','(aq)','aq']].map(([name,f,a,kind])=>({name,f,a,kind}));
const WA={f:'H₂O',mp:0,bp:100,lo:-50,hi:150},NA={f:'NaCl',mp:801,bp:1465,lo:0,hi:1000},GOAL=[{...WA,want:'(s)'},{...WA,want:'(g)'},{...NA,want:'(l)'},{...NA,want:'(aq)',sol:1}];
const CLUE=[['Bubbles fizz out of the acid','(g)'],['A white solid forms as two solutions mix','(s)'],['Crystals dissolve to give a blue solution','(aq)'],
['Lead bromide melted in a crucible','(l)'],['Ethanol at room temperature','(l)'],['Steam above a kettle at 105 °C','(g)']];
const EQN=[{say:'Magnesium ribbon fizzes away in dilute hydrochloric acid.',sp:[['Mg','(s)'],['2HCl','(aq)'],['MgCl₂','(aq)'],['H₂','(g)']],n:2},
{say:'Two clear solutions mix and a white solid forms.',sp:[['AgNO₃','(aq)'],['NaCl','(aq)'],['AgCl','(s)'],['NaNO₃','(aq)']],n:2},
{say:'Marble chips fizz in dilute hydrochloric acid.',sp:[['CaCO₃','(s)'],['2HCl','(aq)'],['CaCl₂','(aq)'],['H₂O','(l)'],['CO₂','(g)']],n:2}];
const WRONG=[{sp:[['2Na','(s)'],['2H₂O','(aq)'],['2NaOH','(aq)'],['H₂','(g)']],n:2,bad:1,fix:'(l)',why:'Water itself is a liquid: H₂O(l). It cannot be dissolved in itself.'},
{sp:[['Zn','(s)'],['CuSO₄','(l)'],['ZnSO₄','(aq)'],['Cu','(s)']],n:2,bad:1,fix:'(aq)',why:'This is copper sulfate solution: CuSO₄(aq). (l) would mean molten.'},
{sp:[['NaOH','(aq)'],['HCl','(aq)'],['NaCl','(aq)'],['H₂O','(aq)']],n:2,bad:3,fix:'(l)',why:'Water made in neutralisation is H₂O(l); the salt dissolved in it is (aq).'},
{sp:[['Pb(NO₃)₂','(aq)'],['2KI','(aq)'],['PbI₂','(aq)'],['2KNO₃','(aq)']],n:2,bad:2,fix:'(s)',why:'Lead iodide is the yellow precipitate, an insoluble solid: PbI₂(s).'}];
VIS.reg('flagstsym',c=>{let A,bar,qa,qi=-1,ver=0;const M={};const span=()=>GOAL[mn(M.h.k,3)];
const IK='#0f172a',PASS='#047857',FAIL='#b91c1c',GREY='#64748b',SC='#1e3a8a',SF='#dbeafe',LC='#0e7490',LF='#cffafe',GC='#a16207',GF='#fef9c3',AQC='#7e22ce',AQF='#f3e8ff',HOLD='#1d4ed8';
const TONE={'(s)':[SC,SF],'(l)':[LC,LF],'(g)':[GC,GF],'(aq)':[AQC,AQF]};
const fo=(n,w)=>`${w||700} ${n}px system-ui,sans-serif`,px=n=>A.narrow?n:Math.round(n*1.15),cm=g=>{g.textAlign='center';g.textBaseline='middle'};
const part=()=>['zoom','heat','clue','eqn','wrong','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const RR=(...a)=>A.paint.rrect(...a),okS=()=>A.sound.pop(),noS=()=>A.sound.miss();
function base(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function title(t,y,ok,n){const g=A.ctx;let s=px(n||13);g.font=fo(s,800);let w=g.measureText(t).width+24;while(w>A.W-10&&s>10){s--;g.font=fo(s,800);w=g.measureText(t).width+24}
const h=s+14,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';RR(x,y-h/2,w,h,7);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?PASS:GREY;g.stroke();g.fillStyle=IK;cm(g);g.fillText(t,x+w/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';RR(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=(o.ok||o.no||o.grab||o.cur)?3.5:1.8;
g.strokeStyle=o.ok?PASS:o.no?FAIL:o.grab?HOLD:o.cur?HOLD:GREY;if(o.dash)g.setLineDash([6,4]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||IK;const fs=o.s||Math.round(r.h*.44);g.font=fo(fs,800);cm(g);wrap(t,r.x+r.w/2,r.y+r.h/2+1,r.w-14,fs)}
function wrap(t,x,y,mw,fs){const g=A.ctx;let a='',L=[];t.split(' ').forEach(w=>{const tr=a?a+' '+w:w;if(g.measureText(tr).width>mw&&a){L.push(a);a=w}else a=tr});L.push(a);L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*fs*1.15,mw+6))}
function sKeys(y){const n=4,w=mn(px(84),(A.W-50)/n),x0=(A.W-(n*w+30))/2;return SYM.map((t,j)=>({t,x:x0+j*(w+10),y,w,h:px(50)}))}
function dKeys(y){const d=M.drag;sKeys(y).forEach((r,j)=>{const rr=d&&d.j===j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,[ink,bg]=TONE[r.t];tile(rr,r.t,{bg,ink,grab:d&&d.j===j,s:px(20)})})}
function dots(kind,box){const g=A.ctx,r=Math.max(5,mn(box.w,box.h)/16);let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
g.save();g.beginPath();RR(box.x,box.y,box.w,box.h,10);g.clip();g.fillStyle='#ffffff';g.fillRect(box.x,box.y,box.w,box.h);
const ball=(x,y,col,rr)=>{g.fillStyle=col;g.beginPath();g.arc(x,y,rr||r,0,7);g.fill();g.strokeStyle='#1f2937';g.lineWidth=1;g.stroke()};
if(kind==='s'){const st=r*2.1;for(let y=box.y+r*1.6;y<box.y+box.h-r;y+=st)for(let x=box.x+r*1.6;x<box.x+box.w-r;x+=st)ball(x,y,'#b45309')}
const aq=kind==='aq';if(kind==='l'||aq){for(let i=0;i<(aq?40:46);i++){const x=box.x+r+rnd()*(box.w-2*r),y=box.y+box.h*.32+rnd()*(box.h*.66-r);ball(x,y,aq?'#bae6fd':'#0284c7',aq?r*.85:r)}g.strokeStyle='#0284c7';g.lineWidth=2;g.beginPath();g.moveTo(box.x,box.y+box.h*.3);g.lineTo(box.x+box.w,box.y+box.h*.3);g.stroke()}
if(kind==='g'){for(let i=0;i<9;i++){const x=box.x+r*2+rnd()*(box.w-4*r),y=box.y+r*2+rnd()*(box.h-4*r);ball(x-r*.6,y,'#dc2626');ball(x+r*.6,y,'#dc2626')}}
if(aq)for(let i=0;i<5;i++){const x=box.x+box.w*(.15+i*.17),y=box.y+box.h*(.45+(i%2)*.25);ball(x,y,'#7c3aed',r*1.05);g.fillStyle='#ffffff';g.font=fo(Math.round(r*1.2),800);cm(g);g.fillText(i%2?'−':'+',x,y+1)}
g.restore();g.strokeStyle=GREY;g.lineWidth=1.5;RR(box.x,box.y,box.w,box.h,10);g.stroke()}
function zBox(){const w=mn(A.W*.62,px(260)),h=A.H*.42;return{x:A.W/2-w/2,y:A.H*.17,w,h}}
function drawZoom(){const s=M.z;base();if(s.k>=4){title('All 4 tagged',A.H*.07,1);ZOOM.forEach((q,j)=>title(`${q.name}: ${q.f}${q.a}`,A.H*(.24+j*.16),1,15));return}
const q=ZOOM[s.k],b=zBox();title(`${s.k+1} of 4: ${q.name}. Drag its symbol on.`,A.H*.07,0,12);dots(q.kind,b);
if(s.miss){const g=A.ctx;g.strokeStyle=FAIL;g.lineWidth=4;RR(b.x,b.y,b.w,b.h,10);g.stroke()}dKeys(A.H*.75)}
function tagZoom(t){const s=M.z;if(s.k>=4)return;const q=ZOOM[s.k];
if(t!==q.a){s.miss=1;noS();return say(q.kind==='aq'?'Runny, but (l) is a pure liquid. These ions are dissolved in water: (aq).':t==='(aq)'?'(aq) means dissolved in water. This is pure water: (l).':`Not ${t}. `+{s:'Fixed rows: solid, (s).',g:'Far apart: gas, (g).',l:'Close but jumbled: liquid, (l).'}[q.kind])}
s.k++;s.miss=0;okS();say(`${q.f}${q.a}. `+({s:'Fixed rows.',l:'Close, jumbled.',g:'Far apart.',aq:'Ions in water.'})[q.kind]+(s.k>=4?' All 4 tagged.':''))}
function stateOf(q,T,sol){if(sol)return'(aq)';return T<q.mp?'(s)':T<q.bp?'(l)':'(g)'}
function track(){return{x:30,y:A.H*.62,w:A.W-60,h:14}}
const tx=T=>{const t=track(),q=span();return t.x+(T-q.lo)/(q.hi-q.lo)*t.w},fromX=x=>{const t=track(),q=span();return Math.round(q.lo+Math.max(0,mn(1,(x-t.x)/t.w))*(q.hi-q.lo))};
function dBtn(){const w=mn(px(190),A.W*.6);return{x:A.W/2-w/2,y:A.H*.8,w,h:px(44)}}
function drawHeat(){const s=M.h,g=A.ctx;base();if(s.k>=4){title('All 4 targets reached',A.H*.07,1);['H₂O(s) below 0 °C','H₂O(g) above 100 °C','NaCl(l) above 801 °C','NaCl(aq) in water'].forEach((t,j)=>title(t,A.H*(.24+j*.16),1,15));return}
const q=GOAL[s.k],now=stateOf(q,s.T,s.sol),[ink,bg]=TONE[now];title(`Target ${s.k+1} of 4: make ${q.f}${q.want}`,A.H*.07,0,13);
const b={x:A.W/2-mn(A.W*.3,px(120)),y:A.H*.15,w:mn(A.W*.6,px(240)),h:A.H*.3};dots(now==='(aq)'?'aq':now==='(s)'?'s':now==='(l)'?'l':'g',b);
tile({x:A.W/2-px(70),y:b.y+b.h+8,w:px(140),h:px(34)},`${q.f}${now}`,{bg,ink,ok:now===q.want,s:px(17)});
const t=track();g.fillStyle='#e5e7eb';RR(t.x,t.y,t.w,t.h,7);g.fill();g.strokeStyle=GREY;g.lineWidth=1;g.stroke();
[[q.mp,'melts'],[q.bp<=q.hi?q.bp:null,'boils']].forEach(([v,l])=>{if(v==null)return;const x=tx(v);g.fillStyle=A.col.tx;g.fillRect(x-1,t.y-8,2,t.h+16);g.font=fo(px(11),700);cm(g);g.fillText(`${l} ${v} °C`,x,t.y-16)});
const kx=tx(s.sol?25:s.T);g.fillStyle=s.sol?'#9ca3af':HOLD;g.beginPath();g.arc(kx,t.y+t.h/2,px(13),0,7);g.fill();g.strokeStyle='#ffffff';g.lineWidth=3;g.stroke();
g.fillStyle=A.col.tx;g.font=fo(px(14),800);cm(g);g.fillText(s.sol?'dissolved at 25 °C':`${s.T} °C`,A.W/2,t.y+t.h+22);tile(dBtn(),s.sol?'Take out of water':'Dissolve in water',{bg:AQF,ink:AQC,s:px(15)})}
function setT(T){const s=M.h;if(s.k>=4)return;const q=span();s.sol=0;s.T=Math.max(q.lo,mn(q.hi,T));jHeat(false)}
function dissolve(){const s=M.h;if(s.k>=4)return;const q=GOAL[s.k];
if(q.f==='H₂O'){noS();return say('Water cannot dissolve in itself, so never H₂O(aq). Use the slider.')}
s.sol=!s.sol;s.T=25;jHeat(true)}
function jHeat(loud){const s=M.h,q=GOAL[s.k],now=stateOf(q,s.T,s.sol);
if(now!==q.want){if(loud||s.last!==now){s.last=now;say(`${q.f}${now} at ${s.T} °C. Not ${q.want} yet.`+(q.sol?' Heat cannot make (aq); that needs water.':''))}else A.redraw();return}
s.k++;s.last=null;s.T=25;s.sol=0;M.drag=null;okS();say(`${q.f}${q.want}. `+({'(aq)':'Dissolved in water: aqueous.','(l)':'Above 801 °C salt is molten: (l), not (aq).','(s)':'Below 0 °C: ice.','(g)':'Above 100 °C: steam.'})[q.want]+(s.k>=4?' All 4 reached.':''))}
function cBins(){const w=(A.W-30)/2,h=A.H*.18;return SYM.map((t,j)=>({t,x:10+(j%2)*(w+10),y:A.H*.5+Math.floor(j/2)*(h+8),w,h}))}
function cCard(){const w=mn(A.W-30,px(440)),h=px(64);return{x:A.W/2-w/2,y:A.H*.18,w,h}}
function drawClue(){const s=M.c,g=A.ctx;base();title(s.k>=6?'All 6 clues read':`Clue ${s.k+1} of 6: which state symbol?`,A.H*.07,s.k>=6,13);
cBins().forEach(r=>{const [ink,bg]=TONE[r.t];g.fillStyle=bg;RR(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();g.fillStyle=IK;g.font=fo(px(18),800);cm(g);
const n=CLUE.slice(0,s.k).filter(x=>x[1]===r.t).length;g.fillText(r.t+(n?`  ✓${n}`:''),r.x+r.w/2,r.y+r.h/2)});
if(s.k<6){const r=cCard(),d=M.drag,rr=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;tile(rr,CLUE[s.k][0],{grab:!!d,no:s.miss,s:px(14)})}}
function sortClue(t){const s=M.c;if(s.k>=6)return;const [txt,a]=CLUE[s.k];
if(t!==a){s.miss=1;noS();return say({'(s)':'A solid forming in a solution is an insoluble precipitate: (s).','(g)':'Bubbles and steam are gases: (g).','(aq)':'A solution means dissolved in water: (aq).','(l)':'Melted, or a pure liquid at that temperature: (l). (aq) needs water.'}[a])}
s.k++;s.miss=0;okS();say(`${txt}: ${a}.`+(s.k>=6?' All 6 read.':''))}
function eq(sp,n,pick){const t=sp.map((x,i)=>x[0]+(pick?pick(x,i):x[1]));return t.slice(0,n).join(' + ')+' → '+t.slice(n).join(' + ')}
function rows(sp){const n=sp.length,h=mn(px(42),(A.H*.6)/n-6),fw=mn(px(150),A.W*.4),sw=mn(px(84),A.W*.26),x0=A.W/2-(fw+sw+10)/2;
return sp.map((_,i)=>({f:{x:x0,y:A.H*.22+i*(h+6),w:fw,h},s:{x:x0+fw+10,y:A.H*.22+i*(h+6),w:sw,h}}))}
function scene(t,y){const g=A.ctx,fs=px(13);g.font=fo(fs,700);g.fillStyle=A.col.tx;cm(g);wrap(t,A.W/2,y,A.W-24,fs)}
function sTag(sp,n,R){const g=A.ctx;g.fillStyle=A.col.tx;g.font=fo(px(11),700);g.textAlign='right';g.textBaseline='middle';R.forEach((r,i)=>g.fillText(i<n?'reactant':'product',r.f.x-6,r.f.y+r.f.h/2))}
function drawEqn(){const s=M.e;base();if(s.k>=3){title('All 3 equations labelled',A.H*.07,1);EQN.forEach((q,j)=>title(eq(q.sp,q.n),A.H*(.26+j*.18),1,13));return}
const q=EQN[s.k],R=rows(q.sp);title(`Equation ${s.k+1} of 3: drag a symbol into each box`,A.H*.06,0,12);scene(q.say,A.H*.135);sTag(q.sp,q.n,R);
q.sp.forEach(([f,a],i)=>{tile(R[i].f,f,{s:px(17)});const done=i<s.i,[ink,bg]=TONE[a];tile(R[i].s,done?a:null,{dash:!done,cur:i===s.i,no:i===s.i&&s.miss,bg:done?bg:null,ink,s:px(17)})});dKeys(A.H*.86)}
function fillEqn(t){const s=M.e;if(s.k>=3)return;const q=EQN[s.k],[f,a]=q.sp[s.i];
if(t!==a){s.miss=1;noS();return say(f==='H₂O'?'Water itself is a liquid: H₂O(l), not (aq).':a==='(aq)'?`${f} is in solution here, so (aq).`:a==='(g)'?`${f} is the gas that fizzes off: (g).`:s.i>=q.n?`${f} is the white precipitate: (s).`:`${f} starts as a solid lump: (s).`)}
s.i++;s.miss=0;okS();if(s.i<q.sp.length)return say(`${f}${a}. Next: ${q.sp[s.i][0]}`);s.k++;s.i=0;say(eq(q.sp,q.n)+(s.k>=3?' All 3 done.':''))}
function drawWrong(){const s=M.w;base();if(s.k>=4){title('All 4 slips fixed',A.H*.07,1);WRONG.forEach((q,j)=>title(eq(q.sp,q.n,(x,i)=>i===q.bad?q.fix:x[1]),A.H*(.24+j*.16),1,13));return}
const q=WRONG[s.k],R=rows(q.sp);title(`${s.k+1} of 4: one state symbol is wrong. Tap it.`,A.H*.07,0,12);sTag(q.sp,q.n,R);
q.sp.forEach(([f,a],i)=>{tile(R[i].f,f,{s:px(17)});const [ink,bg]=TONE[a];tile(R[i].s,a,{bg,ink,no:s.miss===i,s:px(17)})})}
function tapWrong(i){const s=M.w;if(s.k>=4)return;const q=WRONG[s.k];
if(i!==q.bad){s.miss=i;noS();return say(`${q.sp[i][0]}${q.sp[i][1]} is right. Look for a pure liquid, a solution or a precipitate.`)}
s.k++;s.miss=null;okS();say(`${q.sp[i][0]}${q.sp[i][1]} → ${q.sp[i][0]}${q.fix}. ${q.why}`+(s.k>=4?' All 4 fixed.':''))}
function draw(){const k=part();if(k==='quiz'){base();title('Challenge',A.H*.2,1);title('(s)  (l)  (g)  (aq)',A.H*.5,0,20);return}
({zoom:drawZoom,heat:drawHeat,clue:drawClue,eqn:drawEqn,wrong:drawWrong})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
if((k==='zoom'&&M.z.k<4)||(k==='eqn'&&M.e.k<3)){const j=sKeys(k==='zoom'?A.H*.75:A.H*.86).findIndex(r=>on(p,r));if(j>=0){M.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='heat'&&M.h.k<4){if(on(p,dBtn())){dissolve();return false}const t=track();if(p.y>t.y-30&&p.y<t.y+t.h+30){M.drag={slider:1};setT(fromX(p.x));return true}return false}
if(k==='clue'&&M.c.k<6){if(on(p,cCard())){M.drag={x:p.x,y:p.y};return true}const b=cBins().find(r=>on(p,r));if(b)sortClue(b.t);return false}
if(k==='wrong'&&M.w.k<4){const i=rows(WRONG[M.w.k].sp).findIndex(r=>on(p,r.s)||on(p,r.f));if(i>=0)tapWrong(i)}return false}
function move(p){const d=M.drag;if(!d)return;if(d.slider){setT(fromX(p.x));return}d.x=p.x;d.y=p.y;A.redraw()}
function lift(p){const d=M.drag;if(!d)return;M.drag=null;const k=part();if(d.slider)return;
if(k==='zoom'){if(on(p,zBox())||on(p,sKeys(A.H*.75)[d.j]))tagZoom(SYM[d.j]);else A.redraw();return}
if(k==='eqn'){const R=rows(EQN[M.e.k].sp)[M.e.i];if(on(p,{x:R.s.x-30,y:R.s.y-24,w:R.s.w+60,h:R.s.h+48})||on(p,sKeys(A.H*.86)[d.j]))fillEqn(SYM[d.j]);else A.redraw();return}
const b=cBins().find(r=>on(p,r));if(b)sortClue(b.t);else A.redraw()}
function fresh(){ver++;for(const k in M)delete M[k];Object.assign(M,{z:{k:0},h:{k:0,T:25,sol:0},c:{k:0},e:{k:0,i:0},w:{k:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();M.check()}
function setup(i,desc,ok,msg){fresh();say(desc);M.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function replay(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function buttons(){if(!bar)return;bar.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
if(k==='zoom'&&M.z.k<4)SYM.forEach(t=>B(t,()=>tagZoom(t),`Tag ${ZOOM[M.z.k].name} as ${t}`));
if(k==='heat'&&M.h.k<4){const s=M.h;[[-100,'−100 °C'],[-10,'−10 °C'],[10,'+10 °C'],[100,'+100 °C']].forEach(([d,l])=>B(l,()=>setT((s.sol?25:s.T)+d),'Temperature '+l));B(s.sol?'Take out of water':'Dissolve in water',dissolve)}
if(k==='clue'&&M.c.k<6)SYM.forEach(t=>B(t,()=>sortClue(t),`Clue is ${t}`));
if(k==='eqn'&&M.e.k<3)SYM.forEach(t=>B(t,()=>fillEqn(t),`${EQN[M.e.k].sp[M.e.i][0]} is ${t}`));
if(k==='wrong'&&M.w.k<4)WRONG[M.w.k].sp.forEach(([f,a],i)=>B(f+a,()=>tapWrong(i),`Is ${f}${a} wrong?`))}
const steps=[
{h:'Zoom in',p:'(s) solid, (l) liquid, (g) gas, (aq) aqueous: dissolved in water. Look at the particles and drag on a symbol.',
predict:{q:'Salt dissolved in water: which symbol?',opts:['NaCl(l), it is runny','NaCl(aq), it is dissolved'],ans:1},task:'Tag all 4 pictures',
show:()=>replay(0,ZOOM.map(q=>()=>tagZoom(q.a)),700),
go:()=>setup(0,'Copper metal: rows of touching particles.',()=>M.z.k>=4,'Rows (s), jumbled (l), far apart (g), in water (aq).')},
{h:'Set the conditions',p:'The symbol depends on the conditions. Drag the temperature, or dissolve in water, to hit each target.',
predict:{q:'Sodium chloride at 900 °C: which symbol?',opts:['NaCl(s), salt is a solid','NaCl(l), it melts at 801 °C'],ans:1},task:'Reach all 4 targets',
show:()=>replay(1,[()=>setT(-20),()=>setT(120),()=>setT(900),()=>dissolve()],800),
go:()=>setup(1,'Water at 25 °C. Target: H₂O(s).',()=>M.h.k>=4,'Molten salt is (l); dissolved salt is (aq).')},
{h:'Read the clues',p:'Choose the symbol from what you see: fizzing, a precipitate, a solution or a melt.',task:'Sort all 6 clues',
show:()=>replay(2,CLUE.map(x=>()=>sortClue(x[1])),550),
go:()=>setup(2,'Clue: bubbles fizz out of the acid.',()=>M.c.k>=6,'Fizz (g), precipitate (s), solution (aq), melt (l).')},
{h:'Label the equation',p:'Every reactant and product gets a symbol. Read what happens, then fill each dashed box.',
predict:{q:'Marble in acid makes water. Its symbol?',opts:['H₂O(aq), it is in the solution','H₂O(l), water is a liquid'],ans:1},task:'Label all 3 equations',
show:()=>replay(3,EQN.flatMap(q=>q.sp.map(x=>()=>fillEqn(x[1]))),280),
go:()=>setup(3,'Magnesium in dilute acid. Rows: Mg, 2HCl, MgCl₂, H₂.',()=>M.e.k>=3,'Water is (l); solutions (aq).')},
{h:'Spot the slip',p:'Each equation has one wrong state symbol. Tap it.',task:'Fix all 4 equations',
show:()=>replay(4,WRONG.map(q=>()=>tapWrong(q.bad)),750),
go:()=>setup(4,'2Na(s), 2H₂O(aq), 2NaOH(aq), H₂(g).',()=>M.w.k>=4,'Water (l), solution (aq), precipitate (s).')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
const QS=[
{q:'What does (aq) mean?',a:'dissolved in water',o:[['any liquid','liquid'],['a gas in the air','gas']]},
{q:'Pure water at 25 °C is…',a:'H₂O(l)',o:[['H₂O(aq)','water'],['H₂O(g)','temp']]},
{q:'Copper(II) sulfate solution is…',a:'CuSO₄(aq)',o:[['CuSO₄(l)','liquid'],['CuSO₄(s)','solid']]},
{q:'Molten sodium chloride is…',a:'NaCl(l)',o:[['NaCl(aq)','molten'],['NaCl(s)','solid']]},
{q:'A precipitate forms. Its symbol is…',a:'(s)',o:[['(aq)','ppt'],['(l)','ppt']]},
{q:'CO₂ fizzing out of acid is…',a:'CO₂(g)',o:[['CO₂(aq)','fizz'],['CO₂(l)','fizz']]}];
function why(t){let m='Pure solid, liquid or gas, or dissolved in water?';
if(t==='liquid')m='(l) is a pure liquid, like water or molten salt. A solution is (aq).';
if(t==='gas')m='Gases are (g). aq is short for aqueous, from aqua, water.';
if(t==='water')m='Water cannot dissolve in itself. Pure water is H₂O(l).';
if(t==='temp')m='Water boils at 100 °C. At 25 °C it is H₂O(l).';
if(t==='solid')m='Crystals are (s), but dissolved they are (aq).';
if(t==='molten')m='Molten means melted, with no water: (l).';
if(t==='ppt')m='A precipitate is an insoluble solid: (s).';
if(t==='fizz')m='Bubbles that leave the mixture are a gas: (g).';
return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else noS();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{qa.hidden=B.step!==5;bar.hidden=B.step===5;buttons()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'State symbol buttons'},bx);qa=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up:lift});buttons()}}).start()})})();
