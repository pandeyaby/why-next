/* Flagship – bond energies and energy change (ages 15–17; AQA GCSE Chemistry 4.5.1.3; NGSS HS-PS1-4). Mean bond energies, kJ/mol. */
(()=>{
const BE={'H–H':436,'Cl–Cl':243,'H–Cl':432,'C–H':413,'O=O':498,'C=O':805,'O–H':464,'N≡N':945,'N–H':391,'H–I':299,'I–I':151};
/* bond, made?, count, why */
const COUNT=[['C–H',0,4,'CH₄ has 4 C–H bonds'],['O=O',0,2,'2 O₂ molecules, one O=O each'],['C=O',1,2,'CO₂ is O=C=O: 2 double bonds'],['O–H',1,4,'2 H₂O, each with 2 O–H bonds']];
/* equation, broken, made, ΔH, wrong answers */
const RX=[['H₂ + Cl₂ → 2HCl',[['H–H',1],['Cl–Cl',1]],[['H–Cl',2]],-185,[[185,'flip'],[247,'times']]],
 ['N₂ + 3H₂ → 2NH₃',[['N≡N',1],['H–H',3]],[['N–H',6]],-93,[[93,'flip'],[1080,'times']]],
 ['2HI → H₂ + I₂',[['H–I',2]],[['H–H',1],['I–I',1]],11,[[-11,'flip'],[-288,'times']]]];
const tot=list=>list.reduce((a,[b,n])=>a+n*BE[b],0);
/* lines, first wrong line, fix */
const SLIP=[[['Broken: H–H + Cl–Cl = 436 + 243 = 679','Made: H–Cl = 432','ΔH = 679 − 432 = +247 kJ/mol'],1,'2HCl means 2 H–Cl made: 864, ΔH = −185.'],
 [['Broken: N≡N + 3 H–H = 945 + 1308 = 2253','Made: 6 N–H = 6 × 391 = 2346','ΔH = 2346 − 2253 = +93 kJ/mol'],2,'ΔH = broken − made: 2253 − 2346 = −93.'],
 [['Broken: 2 H–I = 2 × 299 = 598','Made: H–H + I–I = 436 + 151 = 587','ΔH = +11 kJ/mol, so exothermic'],2,'+11 means energy taken in: endothermic.']];
VIS.reg('flagbonde',c=>{let A,dock,cbox,qq=-1,run=0;
const W={};
const DK='#0f172a',GO='#047857',STOP='#b91c1c',RIM='#64748b',PULL='#1d4ed8',PANEL='#fff';
const IN_=()=>A.col.dark?'#fb923c':'#c2410c',OUT_=()=>A.col.dark?'#22d3ee':'#0e7490',u=v=>Math.round(v*(A.narrow?.94:1.08)),ft=(v,w)=>`${w||700} ${u(v)}px system-ui,sans-serif`;
const zone=()=>['make','count','sum','ladder','slip','quiz'][A.step],hitR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const no=()=>A.sound.miss(),yes=()=>A.sound.pop(),mid=(g,a)=>{g.textAlign=a||'center';g.textBaseline='middle'},free=()=>W.make.broke.hh&&W.make.broke.cc;
const ln=(a,b,c2,d,col,w)=>{const g=A.ctx;g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(a,b);g.lineTo(c2,d);g.stroke()},left=k=>W[k].n<{count:COUNT,sum:RX,lad:RX,slip:SLIP}[k].length;
const sgn=v=>(v>0?'+':v<0?'−':'')+Math.abs(v);
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok){const g=A.ctx;g.font=ft(15,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=u(15)+16;g.fillStyle=ok?'#d1fae5':PANEL;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,8);g.fill();g.lineWidth=ok?2.5:1.5;g.strokeStyle=ok?GO:RIM;g.stroke();
 g.fillStyle=DK;mid(g);g.fillText(t,A.W/2,y+1,w-20)}
function slab(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||PANEL;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=o.edge?3.5:1.6;g.strokeStyle=o.edge||RIM;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||DK;g.font=ft(o.n||17,o.w||800);mid(g,o.left?'left':'center');g.fillText(t,o.left?r.x+10:r.x+r.w/2,r.y+r.h/2+1,r.w-14)}
function txt(t,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=ft(n||14,600);mid(g);g.fillText(t,A.W/2,y,A.W-12)}
function atom(x,y,el,hot){const g=A.ctx,r=u(el==='H'?17:22);g.fillStyle=el==='H'?'#f1f5f9':'#bbf7d0';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.lineWidth=hot?3.5:1.8;g.strokeStyle=hot?PULL:'#334155';g.stroke();
 g.fillStyle=DK;g.font=ft(el==='H'?15:14,800);mid(g);g.fillText(el,x,y+1)}
/* ---- 1: break and make (H₂ + Cl₂ → 2HCl) ---- */
function atoms(){const s=W.make,y=A.H*.36,L=A.W*.27,R=A.W*.73,d=u(26),g2=u(52),out=[];
 const hs=[[L-(s.broke.hh?g2:d),y],[L+(s.broke.hh?g2:d),y]],cs=[[R-(s.broke.cc?g2:d),y],[R+(s.broke.cc?g2:d),y]];
 hs.forEach((p,i)=>out.push({x:p[0],y:p[1],el:'H',i}));cs.forEach((p,i)=>out.push({x:p[0],y:p[1],el:'Cl',i:i+2}));
 s.pair.forEach((cl,hi)=>{if(cl!=null){const h=out[hi],c2=out[cl];h.x=c2.x-u(32);h.y=c2.y+u(48);c2.y=c2.y+u(48);}});return out}
const molBox=k=>{const y=A.H*.36,x=k?A.W*.73:A.W*.27;return{x:x-u(70),y:y-u(30),w:u(140),h:u(60)}};
function drawMake(){const s=W.make,g=A.ctx;back();const fin=s.pair.every(v=>v!=null);tag(fin?'2HCl made: more out than in':'H₂ + Cl₂ → 2HCl: break, then make',A.H*.07,fin);
 const at=atoms(),bd=(a,b,col)=>ln(at[a].x,at[a].y,at[b].x,at[b].y,col,4);
 const ink=A.col.dark?'#cbd5e1':'#334155';if(!s.broke.hh)bd(0,1,ink);if(!s.broke.cc)bd(2,3,ink);s.pair.forEach((cl,hi)=>{if(cl!=null)bd(hi,cl,OUT_())});
 at.forEach(a=>{const d=W.hold;if(d&&d.i===a.i)return;atom(a.x,a.y,a.el)});const d=W.hold;if(d)atom(d.x,d.y,'H',1);
 txt(!free()?'Tap a molecule to pull its bond apart':fin?`Net: ${s.inn} in − ${s.out} out = ${sgn(s.inn-s.out)} kJ/mol`:'Drag a free H onto a free Cl to make H–Cl',A.H*.58,14);
 txt(`in: ${s.inn} kJ breaking`,A.H*.72,14,IN_());txt(`out: ${s.out} kJ making`,A.H*.8,14,OUT_())}
function brk(k){const s=W.make,key=k?'cc':'hh',b=k?'Cl–Cl':'H–H';if(s.broke[key])return say(`${b} is already broken.`);
 s.broke[key]=1;s.inn+=BE[b];yes();say(`${b} broken: ${BE[b]} kJ/mol taken in. Breaking always needs energy.`)}
function mk(hi,cl){const s=W.make;if(!free()){no();return say('Break H–H and Cl–Cl first, so the atoms are free to bond.')}
 if(s.pair[hi]!=null||s.pair.includes(cl))return say('Use a free H and a free Cl.');
 s.pair[hi]=cl;s.out+=BE['H–Cl'];yes();const fin=s.pair.every(v=>v!=null);
 say(`H–Cl made: ${BE['H–Cl']} kJ/mol given out.`+(fin?` In ${s.inn}, out ${s.out}. More out than in, so ΔH = ${sgn(s.inn-s.out)} kJ/mol: exothermic.`:' One more to make.'))}
function mkNext(){const s=W.make;if(!s.broke.hh)return brk(0);if(!s.broke.cc)return brk(1);const hi=s.pair.findIndex(v=>v==null);if(hi<0)return;mk(hi,[2,3].find(c=>!s.pair.includes(c)))}
/* ---- 2: count the bonds ---- */
const tiles=()=>{const w=Math.min(u(64),(A.W-50)/4),h=u(56);return[1,2,3,4].map((v,j)=>({x:A.W/2-(4*w+30)/2+j*(w+10),y:A.H*.74,w,h,v}))};
function drawCount(){const s=W.count,g=A.ctx;back();tag(s.n>=COUNT.length?'CH₄ + 2O₂ → CO₂ + 2H₂O: all counted':'CH₄ + 2O₂ → CO₂ + 2H₂O',A.H*.07,s.n>=COUNT.length);
 const rh=u(34);COUNT.forEach((q,i)=>{const y=A.H*.17+i*(rh+6),r={x:14,y,w:A.W-28,h:rh},cur=i===s.n,done=i<s.n;
  slab(r,`${q[1]?'made':'broken'}  ${q[0]} (${BE[q[0]]})  × ${done?q[2]:cur?'?':'…'}`+(done?` = ${q[2]*BE[q[0]]}`:''),{left:1,n:14,bg:done?(q[1]?'#cffafe':'#ffedd5'):PANEL,edge:cur?(s.bad?STOP:PULL):null,ink:DK})});
 if(s.n>=COUNT.length){const inn=4*413+2*498,out=2*805+4*464;txt(`${inn} in, ${out} out`,A.H*.66,15);txt(`ΔH = ${inn} − ${out} = ${sgn(inn-out)} kJ/mol`,A.H*.78,17);return}
 txt(`How many ${COUNT[s.n][0]} bonds are ${COUNT[s.n][1]?'made':'broken'}?`,A.H*.66,15);tiles().forEach(r=>slab(r,String(r.v),{n:22,bg:'#e0e7ff',ink:'#3730a3',edge:s.bad===r.v?STOP:null}))}
function count(v){const s=W.count;if(s.n>=COUNT.length)return;const [b,side,n,why]=COUNT[s.n];
 if(v!==n){s.bad=v;no();return say(`Not ${v}. ${why}: ${n} ${b} ${side?'made':'broken'}.`)}
 s.n++;s.bad=null;yes();say(`${n} × ${b} = ${n*BE[b]} kJ/mol ${side?'given out':'taken in'}.`+(s.n>=COUNT.length?' Broken 2648, made 3466: ΔH = −818 kJ/mol.':''))}
/* ---- 3: ΔH = broken − made ---- */
const sumOpts=n=>{const q=RX[n],all=[q[3],q[4][0][0],q[4][1][0]],k=n%3;return all.slice(k).concat(all.slice(0,k))};
const ansBox=()=>({x:A.W/2-u(90),y:A.H*.5,w:u(180),h:u(50)});
function cards(n){const L=sumOpts(n),w=Math.min(u(120),(A.W-36)/3),h=u(52);return L.map((v,j)=>({x:A.W/2-(3*w+16)/2+j*(w+8),y:A.H*.74,w,h,v,j}))}
function drawSum(){const s=W.sum;back();if(s.n>=RX.length){tag('All 3 found: ΔH = broken − made',A.H*.07,1);RX.forEach((q,i)=>txt(`${q[0]}: ${sgn(q[3])} kJ/mol, ${q[3]<0?'exothermic':'endothermic'}`,A.H*(.25+i*.17),15));return}
 const q=RX[s.n];tag(`Reaction ${s.n+1} of 3: ${q[0]}`,A.H*.07);
 const ls=L=>L.map(([b,k])=>`${k>1?k+' × ':''}${b} ${BE[b]}`).join(' + ')+` = ${tot(L)}`;txt('broken: '+ls(q[1]),A.H*.2,14);txt('made: '+ls(q[2]),A.H*.3,14);txt('ΔH = broken − made',A.H*.4,15);
 slab(ansBox(),'ΔH = ?',{bg:A.col.dark?'#1e293b':'#f1f5f9',ink:A.col.tx,edge:s.bad!=null?STOP:RIM});const d=W.hold;
 cards(s.n).forEach(r=>slab(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,sgn(r.v),{n:19,bg:'#fef3c7',ink:'#92400e',edge:d&&d.j===r.j?PULL:null}))}
function sum(v){const s=W.sum;if(s.n>=RX.length)return;const q=RX[s.n],b=tot(q[1]),m=tot(q[2]);
 if(v!==q[3]){s.bad=v;no();const why=(q[4].find(x=>x[0]===v)||[0,''])[1];
  return say(why==='flip'?`That is made − broken. ΔH = broken − made = ${b} − ${m} = ${sgn(q[3])}.`:`A bond was counted once, not as often as the equation says: ${b} − ${m} = ${sgn(q[3])}.`)}
 s.n++;s.bad=null;yes();say(`${q[0]}: ΔH = ${b} − ${m} = ${sgn(q[3])} kJ/mol, ${q[3]<0?'exothermic: more given out making bonds':'endothermic: more taken in breaking bonds'}.`+(s.n>=RX.length?' All 3 found.':''))}
/* ---- 4: energy ladder ---- */
function rng(n){const t=tot(RX[n][1]);return[Math.min(0,RX[n][3])-t*.12,t*1.08,A.H*.16,A.H*.84]}
const scale=n=>{const[lo,hi,y0,y1]=rng(n);return e=>y1-(e-lo)/(hi-lo)*(y1-y0)},unscale=(n,y)=>{const[lo,hi,y0,y1]=rng(n);return lo+(y1-y)/(y1-y0)*(hi-lo)};
function drawLadder(){const s=W.lad,g=A.ctx;back();if(s.n>=RX.length){tag('All 3 placed',A.H*.07,1);txt('Below reactants: exothermic. Above: endothermic.',A.H*.4,15);return}
 const q=RX[s.n],Y=scale(s.n),top=tot(q[1]),m=tot(q[2]),X=f=>A.W*f;tag(`Reaction ${s.n+1} of 3: drag the products level`,A.H*.07);
 const lvl=(xa,xb,e,col,l)=>{ln(xa,Y(e),xb,Y(e),col,4);g.fillStyle=A.col.tx;g.font=ft(12,700);g.textAlign='center';g.textBaseline='bottom';g.fillText(l,(xa+xb)/2,Y(e)-3,xb-xa)};
 lvl(X(.08),X(.4),0,A.col.tx,'reactants 0');lvl(X(.3),X(.7),top,RIM,`separate atoms ${top}`);
 const ar=(x,a,b,col,l,al)=>{ln(x,Y(a),x,Y(b),col,2.5);g.fillStyle=col;g.font=ft(12,800);g.textAlign=al;g.fillText(l,x+(al==='left'?4:-4),(Y(a)+Y(b))/2)};
 ar(X(.33),0,top,IN_(),`+${top} in`,'left');ar(X(.67),top,s.e,OUT_(),`−${m} out`,'right');
 lvl(X(.6),X(.92),s.e,s.bad?STOP:PULL,`products ${sgn(Math.round(s.e))}`);g.fillStyle=PULL;g.beginPath();g.arc(X(.9),Y(s.e),u(12),0,7);g.fill()}
function setL(e){const s=W.lad;if(s.n>=RX.length)return;s.e=e;s.bad=0;A.redraw();A.cv.setAttribute('aria-label',`Products level ${sgn(Math.round(e))} kJ/mol for ${RX[s.n][0]}`)}
function chk(){const s=W.lad;if(s.n>=RX.length)return;const q=RX[s.n],top=tot(q[1]),m=tot(q[2]),tol=Math.max(20,top*.03),e=Math.round(s.e);
 if(Math.sign(e)!==Math.sign(q[3])||Math.abs(e-q[3])>tol){s.bad=1;no();return say(e>q[3]?`Too high. From the atoms at ${top}, come down all ${m} kJ given out: ${sgn(q[3])}.`:`Too low. Only ${m} kJ is given out: ${top} − ${m} = ${sgn(q[3])}.`)}
 s.n++;s.e=s.n<RX.length?tot(RX[s.n][1])*.5:0;s.bad=0;yes();say(`${q[0]}: products at ${sgn(q[3])}, ${q[3]<0?'below':'above'} the reactants, so ${q[3]<0?'exothermic':'endothermic'}.`+(s.n>=RX.length?' All 3 placed.':''))}
/* ---- 5: spot the slip ---- */
function lines(n){const h=u(46),w=A.W-24;return SLIP[n][0].map((t,i)=>({x:12,y:A.H*.2+i*(h+10),w,h,t,i}))}
function drawSlip(){const s=W.slip;back();if(s.n>=SLIP.length){tag('All 3 slips caught',A.H*.07,1);txt('Count every bond. ΔH = broken − made.',A.H*.3,15);txt('Negative: exothermic. Positive: endothermic.',A.H*.45,15);return}
 tag(`Answer ${s.n+1} of 3: tap the wrong line`,A.H*.07);lines(s.n).forEach(r=>slab(r,r.t,{left:1,n:14,w:700,bg:s.bad===r.i?'#ffe4e6':PANEL,edge:s.bad===r.i?STOP:null}));if(s.prev)txt(s.prev,A.H*.78,13)}
function slip(i){const s=W.slip;if(s.n>=SLIP.length)return;const [ls,k,fix]=SLIP[s.n];
 if(i!==k){s.bad=i;no();return say(i<k?'That line is right. Check the next one.':'That follows from an earlier slip. Find the first wrong line.')}
 s.n++;s.bad=null;s.prev=fix;yes();say(fix+(s.n>=SLIP.length?' All 3 caught.':''))}
function draw(){const k=zone();if(k==='quiz'){back();tag('Challenge',A.H*.25,1);tag('ΔH = bonds broken − bonds made',A.H*.55);return}
 ({make:drawMake,count:drawCount,sum:drawSum,ladder:drawLadder,slip:drawSlip})[k]();A.fx.draw(A.ctx)}
function down(p){const k=zone();
 if(k==='make'){const s=W.make;if(!s.broke.hh&&hitR(p,molBox(0))){brk(0);return false}if(!s.broke.cc&&hitR(p,molBox(1))){brk(1);return false}
  const h=atoms().find(a=>a.el==='H'&&s.pair[a.i]==null&&Math.hypot(p.x-a.x,p.y-a.y)<u(30));if(h){W.hold={i:h.i,x:p.x,y:p.y};return true}return false}
 if(k==='count'&&left('count')){const r=tiles().find(r=>hitR(p,r));if(r)count(r.v);return false}
 if(k==='sum'&&left('sum')){const r=cards(W.sum.n).find(r=>hitR(p,r));if(r){W.hold={j:r.j,x:p.x,y:p.y};return true}return false}
 if(k==='ladder'&&left('lad')){const Y=scale(W.lad.n);if(p.x>A.W*.5&&Math.abs(p.y-Y(W.lad.e))<u(36)){W.hold={lad:1};return true}return false}
 if(k==='slip'&&left('slip')){const r=lines(W.slip.n).find(r=>hitR(p,r));if(r)slip(r.i)}return false}
function move(p){const d=W.hold;if(!d)return;if(d.lad){setL(unscale(W.lad.n,p.y));return}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=W.hold;if(!d)return;W.hold=null;const k=zone();
 if(k==='make'){const s=W.make,cl=atoms().find(a=>a.el==='Cl'&&!s.pair.includes(a.i)&&Math.hypot(p.x-a.x,p.y-a.y)<u(40));if(cl)mk(d.i,cl.i);else{A.redraw();if(!free())mk(d.i,2)}return}
 if(k==='sum'){const r=cards(W.sum.n)[d.j];if(hitR(p,ansBox())||p.y<A.H*.66||hitR(p,r))sum(r.v);else A.redraw();return}
 if(k==='ladder')chk()}
function reset(){run++;for(const k in W)delete W[k];Object.assign(W,{make:{broke:{hh:0,cc:0},pair:[null,null],inn:0,out:0},count:{n:0},sum:{n:0},lad:{n:0,e:tot(RX[0][1])*.5},slip:{n:0},hold:null,gate:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.gate()}
function enter(i,desc,ok,msg){reset();say(desc);W.gate=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keys(){if(!dock)return;dock.innerHTML='';const k=zone(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='make'){const s=W.make;if(!s.broke.hh)b('Break H–H',()=>brk(0));if(!s.broke.cc)b('Break Cl–Cl',()=>brk(1));if(s.pair.some(v=>v==null))b('Make H–Cl',()=>free()?mkNext():mk(0,2))}
 if(k==='count'&&left('count'))[1,2,3,4].forEach(v=>b(String(v),()=>count(v),`${v} ${COUNT[W.count.n][0]} bonds`));
 if(k==='sum'&&left('sum'))sumOpts(W.sum.n).forEach(v=>b(sgn(v),()=>sum(v),`ΔH is ${sgn(v)} kJ per mol`));
 if(k==='ladder'&&left('lad')){[[-100,'−100'],[-10,'−10'],[10,'+10'],[100,'+100']].forEach(([d,t])=>b(t,()=>setL(W.lad.e+d),`Move products ${t} kJ`));b('Check level',chk)}
 if(k==='slip'&&left('slip'))SLIP[W.slip.n][0].forEach((t,i)=>b(`Line ${i+1}`,()=>slip(i),`Line ${i+1} is wrong: ${t}`))}
const steps=[
{h:'Break, then make',p:'Pulling a bond apart takes energy in. Joining atoms into a new bond gives energy out. Tap each molecule to break it, then drag H atoms onto Cl atoms.',
predict:{q:'Breaking a bond: does it take energy in or give it out?',opts:['Gives energy out','Takes energy in'],ans:1},task:'Make 2 H–Cl bonds',
show:()=>auto(0,[mkNext,mkNext,mkNext,mkNext],650),
go:()=>enter(0,'Tap a molecule to break its bond.',()=>W.make.pair.every(v=>v!=null),'Breaking takes energy in. Making gives energy out.')},
{h:'Count every bond',p:'Count every bond broken in the reactants and every bond made in the products. Big numbers in front of molecules count too.',
predict:{q:'Burning methane gives out energy. Where does it come from?',opts:['Breaking the bonds in methane','Making strong bonds in CO₂ and H₂O'],ans:1},task:'Count all 4 kinds of bond',
show:()=>auto(1,COUNT.map(q=>()=>count(q[2])),600),
go:()=>enter(1,'How many C–H bonds are broken?',()=>W.count.n>=COUNT.length,'The new bonds are stronger in total.')},
{h:'ΔH = broken − made',p:'ΔH = energy in breaking bonds − energy out making bonds. Negative: exothermic. Positive: endothermic. Drag the right ΔH into the box.',
predict:{q:'Making the bonds gives out more than breaking takes in. The reaction is\u2026',opts:['endothermic','exothermic'],ans:1},task:'Find ΔH for all 3',
show:()=>auto(2,RX.map(q=>()=>sum(q[3])),700),
go:()=>enter(2,'H₂ + Cl₂ → 2HCl. Drag the right ΔH into the box.',()=>W.sum.n>=RX.length,'ΔH = broken − made, with the sign kept.')},
{h:'Energy ladder',p:'Breaking every bond lifts the reactants to separate atoms. Making the new bonds brings you down to the products. Drag the blue products line, or use the buttons.',task:'Place all 3 products',
show:()=>auto(3,RX.flatMap(q=>[()=>setL(q[3]),chk]),500),
go:()=>enter(3,'H₂ + Cl₂ → 2HCl. Drag the products line and let go.',()=>W.lad.n>=RX.length,'Up by broken, down by made.')},
{h:'Spot the slip',p:'Each worked answer has one mistake. Tap the first line that goes wrong.',task:'Catch all 3 slips',
show:()=>auto(4,SLIP.map(q=>()=>slip(q[1])),650),
go:()=>enter(4,'H₂ + Cl₂ → 2HCl. Tap the first wrong line.',()=>W.slip.n>=SLIP.length,'Check counts, then the sign.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.gate()});
const QS=[
{q:'Breaking a bond\u2026',a:'takes in energy',o:[['gives out energy','breakout'],['needs no energy','free']]},
{q:'Bonds broken: 1200 kJ/mol. Bonds made: 1500 kJ/mol. ΔH?',a:'−300 kJ/mol, exothermic',o:[['+300 kJ/mol, endothermic','flip'],['−2700 kJ/mol','add']]},
{q:'Why is burning methane exothermic?',a:'Making new bonds gives out more than breaking old ones takes in.',o:[['Breaking its bonds releases energy.','breakout'],['Fuel stores energy that leaks out.','store']]},
{q:'ΔH is positive. On an energy diagram the products are\u2026',a:'above the reactants',o:[['below the reactants','up'],['level with the reactants','level']]},
{q:'Why does a bond-energy ΔH differ a little from the measured one?',a:'Bond energies are averages over many compounds.',o:[['Mass is lost.','mass'],['Bonds have no fixed energy.','free']]}];
function miss(t){let m='ΔH = bonds broken − bonds made.';
 switch(t){case 'breakout':m='Breaking always takes energy in. Energy comes out when bonds form.';break;
 case 'free':m='Every bond needs energy to break, and bond energies are measured.';break;
 case 'flip':m='Sign swapped. ΔH = broken − made = 1200 − 1500 = −300.';break;
 case 'add':m='Do not add them. Subtract: broken − made.';break;
 case 'store':m='Energy is not stored in the fuel. It is released because the bonds made are stronger.';break;
 case 'level':m='Level means ΔH = 0.';break;
 case 'up':m='Positive ΔH: energy taken in, so the products sit above.';break;
 case 'mass':m='Mass is conserved. Table values are averages, not this molecule.';break}
 return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 cbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=cbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){cbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+miss(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':miss(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{cbox.hidden=B.step!==5;dock.hidden=B.step===5;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bond energy buttons'},w);cbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
