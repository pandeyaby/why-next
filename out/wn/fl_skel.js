/* Flagship 76 – skeletal formulae (ages 16–18): every corner and line end is a carbon, hydrogens on carbon are implied
(4 minus the bonds drawn), draw pentane as a zig-zag on a dot lattice, put OH and C=C onto a skeleton and watch the
molecular formula change, then match structural formulae to skeletons (a flipped zig-zag is the same molecule). */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot,SUB='₀₁₂₃₄₅₆₇₈₉',dn=n=>String(n).replace(/\d/g,d=>SUB[d]);
// molecule: p = carbon lattice points [col,row], b = [i,j,order], oh = carbon indices carrying OH
const M=(p,b,oh)=>({p,b,oh:oh||[]}),chain=pts=>pts.slice(1).map((q,i)=>[i,i+1,1]);
const ZZ=n=>Array.from({length:n},(_,i)=>[i,i%2?0:1]);
const PENT=M(ZZ(5),chain(ZZ(5))),MB=M([[0,1],[1,0],[2,1],[3,0],[1,-1]],[[0,1,1],[1,2,1],[2,3,1],[1,4,1]]);
const BUT=()=>M(ZZ(4),chain(ZZ(4))),FLIP=M([[0,0],[1,1],[2,0],[3,1]],chain(ZZ(4))),ISO=M([[0,1],[1,0],[2,1],[1,-1]],[[0,1,1],[1,2,1],[1,3,1]]);
const PROP=M(ZZ(3),chain(ZZ(3))),B1OL=M(ZZ(4),chain(ZZ(4)),[3]),B2OL=M(ZZ(4),chain(ZZ(4)),[1]),P1OL=M(ZZ(3),chain(ZZ(3)),[2]);
const bonds=(m,i)=>m.b.reduce((s,[a,c,o])=>s+(a===i||c===i?o:0),0)+(m.oh.includes(i)?1:0);
const hOn=(m,i)=>4-bonds(m,i),nC=m=>m.p.length,nH=m=>m.p.reduce((s,_,i)=>s+hOn(m,i),0)+m.oh.length;
const formula=m=>`C${dn(nC(m))}H${dn(nH(m))}`+(m.oh.length?'O'+(m.oh.length>1?dn(m.oh.length):''):'');
const MATCH=[['CH₃CH(CH₃)CH₃',[M(ZZ(4),chain(ZZ(4))),ISO,PROP],1,'2-methylpropane: three carbons on one central carbon make a branch.'],
['CH₃CH₂CH₂CH₂OH',[B2OL,P1OL,B1OL],2,'Butan-1-ol: four carbons, OH on an end carbon.'],
['Which is also butane, CH₃CH₂CH₂CH₃?',[MB,FLIP,ISO],1,'Flipping the zig-zag does not change the molecule. Still four carbons in a row.']];
const WRONG=['','',''];
VIS.reg('flagskel',c=>{let A,pad,chal,read;
const S={seen:[],hi:0,hset:[],path:[],mol:BUT(),r4:0,mi:0,mok:0,bad:null,hold:null,dp:null,p0:null,zones:[],want:()=>{},run:0,Q:null,msg:''};
const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
const mode=()=>['carbons','hydrogens','draw','groups','match','quiz'][A.step];
const Z=z=>A.narrow?z:z+2,tint=(k,a)=>A.alpha(k,a);
const tx=(x,t,X,Y,z,k,w,al)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
const rect=(x,R,k,thick,a)=>{x.fillStyle=tint(k,a||.12);A.paint.rrect(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=k;x.lineWidth=thick?4:2;x.stroke()};
const zone=(R,id)=>S.zones.push({R,id}),inside=(p,R)=>R.r?hy(p.x-R.x,p.y-R.y)<R.r:p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h;
const at=p=>{for(let i=S.zones.length-1;i>=0;i--)if(inside(p,S.zones[i].R))return S.zones[i].id;return null};
const miss=t=>{A.sound.miss();say(t);A.redraw()};
// map a molecule into a box; returns screen points
function place(m,B){const xs=m.p.map(q=>q[0]),ys=m.p.map(q=>q[1]),x0=mn(...xs),x1=mx(...xs),y0=mn(...ys),y1=mx(...ys);
const s=mn((B.w-40)/mx(1,x1-x0),(B.h-40)/mx(1,(y1-y0)*.85),80),cx=B.x+B.w/2-(x0+x1)/2*s,cy=B.y+B.h/2-(y0+y1)/2*s*.85;return m.p.map(q=>({x:cx+q[0]*s,y:cy+q[1]*s*.85}))}
function skel(x,m,B,o={}){const C=A.col,P=place(m,B),lw=o.lw||4;x.lineCap='round';x.strokeStyle=o.col||C.tx;
m.b.forEach(([a,b,ord],k)=>{const p=P[a],q=P[b];x.lineWidth=lw;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();
if(ord===2){const dx=q.x-p.x,dy=q.y-p.y,L=hy(dx,dy),nx=-dy/L*9,ny=dx/L*9,sh=.18;x.beginPath();x.moveTo(p.x+nx+dx*sh,p.y+ny+dy*sh);x.lineTo(q.x+nx-dx*sh,q.y+ny-dy*sh);x.stroke()}
if(o.bondZones)zone({x:(p.x+q.x)/2,y:(p.y+q.y)/2,r:24},'bond'+k)});
m.oh.forEach(i=>{const p=P[i],up=m.p[i][1]>0?1:-1,q={x:p.x+(i?20:-20),y:p.y+up*34};x.lineWidth=lw;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y+(up>0?-8:8));x.stroke();tx(x,'OH',q.x,q.y+up*4,15,C.rd,900)});
if(o.atomZones)P.forEach((p,i)=>zone({x:p.x,y:p.y,r:26},'c'+i));return P}
const dot=(x,p,k,label)=>{x.fillStyle=k;x.beginPath();x.arc(p.x,p.y,13,0,7);x.fill();if(label)tx(x,label,p.x,p.y,11,'#fff',900)};
const stage=()=>({x:10,y:A.H*.14,w:A.W-20,h:A.H*.5});
function carbV(x){const C=A.col,P=skel(x,PENT,stage(),{atomZones:1});S.seen.forEach((i,k)=>dot(x,P[i],C.gr,'C'));if(S.bad!=null&&S.bad[0]==='c')dot(x,P[+S.bad.slice(1)],C.rd,'');
tx(x,'Tap every carbon: each corner and each line end',A.W/2,A.H*.07,13,C.mu);const n=S.seen.length;
tx(x,n>=5?'5 carbons: C₅. The lines are C–C bonds.':`Carbons found: ${n}`,A.W/2,A.H*.72,16,n>=5?C.gr:C.tx,900);if(n>=5)tx(x,'4 lines join 5 carbons. Count points, not lines.',A.W/2,A.H*.82,13,C.mu,700)}
function hydV(x){const C=A.col,m=MB,P=skel(x,m,stage(),{atomZones:1});
P.forEach((p,i)=>{const set=S.hset[i];if(set!=null)tx(x,set===1?'H':'H'+dn(set),p.x+(i===1?26:0),p.y+(i===1?14:m.p[i][1]>0?24:-24),14,C.gr,900);if(i===S.hi&&S.hset.length<5)dot(x,p,C.or,'?')});
const done=S.hset.filter(v=>v!=null).length>=5;tx(x,'Each carbon makes 4 bonds. H = 4 − lines drawn.',A.W/2,A.H*.07,13,C.mu);
if(!done){const L=bonds(m,S.hi);tx(x,`Orange carbon: ${L} line${L>1?'s':''} drawn. How many H?`,A.W/2,A.H*.7,14,C.tx,800);
const g=10,w=(A.W-4*g)/3,h=mn(56,A.H*.12);[1,2,3].forEach((v,j)=>{const R={x:g+j*(w+g),y:A.H-h-12,w,h};zone(R,'h'+v);rect(x,R,S.bad==='h'+v?C.rd:C.vi,S.bad==='h'+v);tx(x,v+' H',R.x+w/2,R.y+h/2,17,C.tx,900)})}
else{tx(x,`Molecular formula: ${formula(m)}`,A.W/2,A.H*.74,18,C.gr,900);tx(x,'Same C₅H₁₂ as pentane, but branched: an isomer.',A.W/2,A.H*.84,13,C.mu,700)}}
const lat=i=>{const cols=6,g=(A.W-60)/(cols-1);return{x:30+(i>>1)*g,y:A.H*(i%2?.26:.5)}};
function drawV(x){const C=A.col;for(let i=0;i<12;i++){const p=lat(i);zone({x:p.x,y:p.y,r:28},'d'+i);x.fillStyle=tint(C.mu,.45);x.beginPath();x.arc(p.x,p.y,7,0,7);x.fill()}
x.strokeStyle=C.tx;x.lineWidth=5;x.lineCap='round';x.beginPath();S.path.forEach((i,k)=>{const p=lat(i);k?x.lineTo(p.x,p.y):x.moveTo(p.x,p.y)});x.stroke();
S.path.forEach(i=>{const p=lat(i);x.fillStyle=C.cy;x.beginPath();x.arc(p.x,p.y,9,0,7);x.fill()});if(S.bad&&S.bad[0]==='d'){const p=lat(+S.bad.slice(1));dot(x,p,C.rd,'')}
const n=S.path.length;tx(x,'Tap dots to draw a zig-zag: up, down, up…',A.W/2,A.H*.07,13,C.mu);
tx(x,`Carbons (points): ${n}   Lines: ${mx(0,n-1)}`,A.W/2,A.H*.66,16,n===5?C.gr:C.tx,900);tx(x,n===5?'Pentane, C₅H₁₂: 5 points, 4 lines.':'Goal: pentane, 5 carbons',A.W/2,A.H*.76,14,n===5?C.gr:C.mu,800);
const R={x:A.W*.3,y:A.H-mn(52,A.H*.11)-10,w:A.W*.4,h:mn(52,A.H*.11)};zone(R,'clear');rect(x,R,C.mu,0,.08);tx(x,'Start again',R.x+R.w/2,R.y+R.h/2,14,C.tx,800)}
const R4=[['Drag OH onto a carbon to make butan-2-ol','oh',1],['Drag the = onto a bond to make but-1-ene','db',0]];
function grpV(x){const C=A.col;if(S.r4>=2){const a=B2OL,b=BE();skel(x,a,{x:10,y:A.H*.1,w:A.W-20,h:A.H*.3},{});tx(x,'Butan-2-ol: '+formula(a),A.W/2,A.H*.43,15,C.tx,900);skel(x,b,{x:10,y:A.H*.48,w:A.W-20,h:A.H*.3},{});tx(x,'But-1-ene: '+formula(b),A.W/2,A.H*.81,15,C.tx,900);return tx(x,'Groups are drawn in; the carbons stay as corners.',A.W/2,A.H*.92,13,C.gr,800)}
const t=R4[S.r4];tx(x,t[0],A.W/2,A.H*.07,13,C.tx,800);const P=skel(x,S.mol,{x:10,y:A.H*.14,w:A.W-20,h:A.H*.44},{atomZones:t[1]==='oh',bondZones:t[1]==='db'});
P.forEach((p,i)=>tx(x,String(i+1),p.x,p.y+(S.mol.p[i][1]>0?20:-20),11,C.mu,700));
tx(x,`Molecular formula: ${formula(S.mol)}`,A.W/2,A.H*.66,17,C.tx,900);
const T=S.hold==='tok'&&S.dp?{x:S.dp.x-40,y:S.dp.y-26,w:80,h:52}:{x:A.W/2-40,y:A.H-64,w:80,h:52};zone({x:A.W/2-40,y:A.H-64,w:80,h:52},'tok');rect(x,T,t[1]==='oh'?C.rd:C.vi,S.hold==='tok',.2);tx(x,t[1]==='oh'?'OH':'=',T.x+40,T.y+26,20,C.tx,900);
if(S.msg)tx(x,S.msg,A.W/2,A.H*.75,12,C.mu,700)}
function matV(x){const C=A.col;if(S.mok>=3){const h=(A.H*.78)/3;MATCH.forEach((q,j)=>{const m=q[1][q[2]],y=A.H*.04+j*h;skel(x,m,{x:A.W*.3,y,w:A.W*.68,h:h-8},{lw:3});tx(x,j===2?'CH₃(CH₂)₂CH₃':q[0],A.W*.16,y+h/2,11,C.tx,800)});return tx(x,'Structural and skeletal formulae now match up.',A.W/2,A.H*.9,13,C.gr,800)}
const q=MATCH[S.mi];tx(x,q[0],A.W/2,A.H*.07,17,C.tx,900);tx(x,'Tap the skeleton that matches',A.W/2,A.H*.15,12,C.mu);
const h=(A.H*.8-20)/3;q[1].forEach((m,j)=>{const R={x:14,y:A.H*.2+j*(h+6),w:A.W-28,h};zone(R,'opt'+j);rect(x,R,S.bad==='opt'+j?C.rd:C.cy,S.bad==='opt'+j,.06);skel(x,m,{x:R.x+30,y:R.y,w:R.w-60,h:R.h},{lw:3});tx(x,String.fromCharCode(65+j),R.x+14,R.y+14,13,C.mu,900)})}
function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();S.zones=[];x.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.35);x.fillRect(0,0,W,H);
const f={carbons:carbV,hydrogens:hydV,draw:drawV,groups:grpV,match:matV}[v];if(f)f(x);else if(S.Q&&S.Q.mol)skel(x,S.Q.mol,{x:20,y:A.H*.15,w:A.W-40,h:A.H*.6},{});else{x.textAlign='center';x.textBaseline='middle';x.fillStyle=tint(C.cy,.5);x.font=`900 ${mn(W,H)*.14}px system-ui`;x.fillText(S.Q?S.Q.big:'⌇',W/2,H/2)}A.fx.draw(x)}
function tapC(i){if(S.seen.includes(i)||S.seen.length>=5)return;S.bad=null;S.seen.push(i);A.sound.tick();report(i===0||i===4?'A line end is a carbon.':'A corner is a carbon.')}
function tapBlank(){if(mode()==='carbons'&&S.seen.length<5)miss('Carbons sit at corners and line ends, not along the middle of a line.')}
function setH(v){if(S.hset.length>=5&&S.hset.every(z=>z!=null))return;const want=hOn(MB,S.hi);if(v!==want){S.bad='h'+v;const L=bonds(MB,S.hi);return miss(v===4-L+1?`It has ${L} lines, so 4 − ${L} = ${want}, not ${v}.`:`Count the lines at this carbon: ${L}. Then H = 4 − ${L} = ${want}.`)}
S.bad=null;S.hset[S.hi]=v;A.sound.pop();S.hi=MB.p.findIndex((_,i)=>S.hset[i]==null);if(S.hi<0)S.hi=0;report()}
function dotTap(i){const n=S.path.length;if(n>=5)return;if(n){const l=S.path[n-1];if(i>>1!==(l>>1)+1||i%2===l%2){S.bad='d'+i;return miss((i>>1)===(l>>1)?'Go to the next column, not straight up or down.':i%2===l%2?'A straight run hides the carbon. Zig-zag: switch row each time.':'Join the next dot along. Skip none.')}}
S.bad=null;S.path.push(i);A.sound.tick();report()}
function clearPath(){S.path=[];S.bad=null;report()}
function dropTok(id){if(S.r4>=2||id==null)return A.redraw();const t=R4[S.r4];
if(t[1]==='oh'){if(id[0]!=='c')return A.redraw();const i=+id.slice(1);if(i===0||i===3){S.msg='';return miss('OH on an end carbon makes butan-1-ol. Butan-2-ol needs it on a middle carbon.')}
S.mol.oh=[i];S.msg=(i===2?'Counted from the right, that is carbon 2. ':'')+'That carbon now has 1 H, not 2. One O added: C₄H₁₀O.'}
else{if(id.slice(0,4)!=='bond')return A.redraw();const k=+id.slice(4);if(k===1)return miss('A double bond on the middle bond makes but-2-ene. But-1-ene needs it on an end bond.');S.mol.b[k][2]=2;S.msg=(k===2?'Counted from the right, that is bond 1. ':'')+'Each carbon of C=C loses an H: C₄H₈.'}
A.sound.pop();const r=S.run;report();setTimeout(()=>{if(r!==S.run)return;S.r4++;S.mol=BUT();S.msg='';report()},A.reduced()?10:900)}
function pick(j){if(S.mok>=3)return;const q=MATCH[S.mi];if(j!==q[2]){S.bad='opt'+j;const m=q[1][j];return miss(`That skeleton is ${formula(m)} with ${nC(m)} carbons${m.p.some((_,i)=>bonds(m,i)-(m.oh.includes(i)?1:0)>2)?', branched':''}${m.oh.length?', OH on carbon '+(m.oh[0]+1):''}. Check carbons, branches and where the group sits.`)}
S.bad=null;S.mok++;S.mi=mn(2,S.mok);A.sound.pop();report(q[3])}
function report(msg){const v=mode();let t;
if(v==='carbons')t=`Pentane skeleton: a zig-zag of 4 lines. Carbons found: ${S.seen.length} of 5.`;
else if(v==='hydrogens'){const set=S.hset.filter(z=>z!=null).length;t=set>=5?`All carbons done: ${formula(MB)}.`:`Carbon ${S.hi+1} has ${bonds(MB,S.hi)} lines. ${set} of 5 carbons done.`}
else if(v==='draw')t=`Zig-zag drawn: ${S.path.length} carbons, ${mx(0,S.path.length-1)} lines.`;
else if(v==='groups')t=S.r4>=2?'Both groups placed.':`${R4[S.r4][0]}. Formula now ${formula(S.mol)}.`;
else if(v==='match')t=S.mok>=3?'All three matched.':`${MATCH[S.mi][0]}. Options: `+MATCH[S.mi][1].map((m,j)=>String.fromCharCode(65+j)+' '+formula(m)).join(', ');
else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
const K=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
if(v==='carbons')PENT.p.forEach((_,i)=>K(i===0||i===4?`Line end ${i?2:1}`:`Corner ${i}`,()=>tapC(i),S.seen.includes(i)||S.seen.length>=5,`Mark carbon at ${i===0||i===4?'line end':'corner '+i}`));
if(v==='hydrogens'&&S.hset.filter(z=>z!=null).length<5)[1,2,3].forEach(n=>K(n+' H',()=>setH(n),0,`Carbon ${S.hi+1} has ${n} hydrogen${n>1?'s':''}`));
if(v==='draw'){const n=S.path.length,l=S.path[n-1];if(n<5){const nx=n?((l>>1)+1)*2+(l%2?0:1):1;K(n?'Add next carbon (zig-zag)':'Start the chain',()=>dotTap(nx));K('Add carbon in a straight line',()=>dotTap(n?((l>>1)+1)*2+(l%2):0),!n)}K('Start again',clearPath)}
if(v==='groups'&&S.r4<2){const t=R4[S.r4];if(t[1]==='oh')[0,1,2,3].forEach(i=>K(`OH on carbon ${i+1}`,()=>dropTok('c'+i)));else [0,1,2].forEach(k=>K(`= on bond ${k+1}–${k+2}`,()=>dropTok('bond'+k)))}
if(v==='match'&&S.mok<3)[0,1,2].forEach(j=>K('Skeleton '+String.fromCharCode(65+j),()=>pick(j)));A.redraw()}
const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.msg=''};
const steps=[
{h:'Where are the carbons?',p:'A skeletal formula draws only the carbon chain as lines. No C is written. Find every carbon.',
predict:{q:'In a skeletal formula, where are the carbon atoms?',opts:['Only where a C is written','At every corner and line end'],ans:1},task:'Tap all five carbons in pentane',
show:()=>{steps[0].go();later([0,1,2,3,4].map(i=>()=>tapC(i)),300)},go:()=>{reset();S.seen=[];report();S.want=fin(0,()=>S.seen.length>=5,()=>'Corners and ends are carbons; the lines are bonds.')}},
{h:'Hidden hydrogens',p:'H atoms on carbon are not drawn. Each carbon has 4 bonds, so H = 4 − the lines at that carbon.',
predict:{q:'An end carbon of a zig-zag has one line. How many H does it carry?',opts:['1','3'],ans:1},task:'Give every carbon its hydrogens',
show:()=>{steps[1].go();later(MB.p.map((_,i)=>()=>setH(hOn(MB,S.hi))),350)},go:()=>{reset();S.hset=[];S.hi=0;report();S.want=fin(1,()=>S.hset.filter(z=>z!=null).length>=5,()=>'Ends carry 3 H, chain middles 2, a branch point 1: C₅H₁₂.')}},
{h:'Draw pentane',p:'Draw a chain on the dots. Each new carbon goes one column along and switches row, making a zig-zag.',
predict:{q:'How many lines does the skeleton of pentane (5 carbons) have?',opts:['5','4'],ans:1},task:'Draw a five-carbon zig-zag',
show:()=>{steps[2].go();later([1,2,5,6,9].map(i=>()=>dotTap(i)),300)},go:()=>{reset();S.path=[];report();S.want=fin(2,()=>S.path.length===5,()=>'Five points, four lines: that is pentane.')}},
{h:'Add a group',p:'Atoms other than C and H are written in, joined by a line. A double line is a C=C bond.',task:'Make butan-2-ol, then but-1-ene',
show:()=>{steps[3].go();later([()=>dropTok('c1'),()=>{},()=>{},()=>dropTok('bond0')],400)},go:()=>{reset();S.r4=0;S.mol=BUT();report();S.want=fin(3,()=>S.r4>=2,()=>'OH on carbon 2 gives C₄H₁₀O; C=C at bond 1 gives C₄H₈.')}},
{h:'Match the formula',p:'Read the structural formula, then find its skeleton. Count carbons, look for branches and groups.',task:'Match three formulae',
show:()=>{steps[4].go();later(MATCH.map(q=>()=>pick(q[2])),450)},go:()=>{reset();S.mi=0;S.mok=0;report();S.want=fin(4,()=>S.mok>=3,()=>'A branch, a group position or a flip: only the first two change the molecule.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});void WRONG;
const QZ={ends:['A zig-zag has 3 corners and 2 line ends. How many carbons?','⌇',[['5','ok'],['3','corners'],['4','lines']]],
hyd:['A carbon in the middle of an unbranched chain carries how many H?','H',[['2','ok'],['4','four'],['0, none are drawn','none']]],
form:['An unbranched zig-zag of 6 carbons. Molecular formula?','C₆',[['C₆H₁₄','ok'],['C₆H₁₂','ch2'],['C₆H₆','h6']]],
oh:['A zig-zag of 3 carbons with OH on an end carbon. What is it?','OH',[['Propan-1-ol','ok'],['Propan-2-ol','prop2'],['Butan-1-ol','ohc']]],
flip:['Two 4-carbon zig-zags, one drawn upside down. Same molecule?','⇅',[['Yes, both are butane','ok'],['No, the shape is different','flip'],['No, they are isomers','iso']]],
db:['What does a double line in a skeletal formula show?','=',[['A C=C double bond','ok'],['Two carbons side by side','twoc'],['A bond to hydrogen','hbond']]]};
const BE=()=>{const m=BUT();m.b[0][2]=2;return m},QM={ends:()=>M(ZZ(5),chain(ZZ(5))),hyd:()=>M(ZZ(5),chain(ZZ(5))),form:()=>M(ZZ(6),chain(ZZ(6))),oh:()=>P1OL,flip:()=>FLIP,db:BE};
let qn=-1,stars=0;
function ask(){qn++;const K=Object.keys(QZ),k=K[qn%K.length],rot=qn%3,[q,big,ops]=QZ[k];S.Q={big,mol:QM[k]()};
chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const r=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
switch(tag){case 'ok':m='Correct.';break;
case 'corners':m='Line ends are carbons too: 3 corners + 2 ends = 5.';break;
case 'lines':m='That counts lines (bonds). Carbons are the points: one more than the lines.';break;
case 'four':m='Two of its four bonds go to carbons, so only 2 are H.';break;
case 'none':m='Hydrogens on carbon are implied, not absent. Work them out: 4 − 2 = 2.';break;
case 'ch2':m='CₙH₂ₙ is an alkene or a ring. An unbranched alkane is CₙH₂ₙ₊₂: C₆H₁₄.';break;
case 'h6':m='C₆H₆ is benzene, a ring. A chain of 6 single-bonded carbons has 14 H.';break;
case 'prop2':m='Propan-2-ol has the OH on the middle carbon. An end carbon is carbon 1.';break;
case 'ohc':m='The O is not a carbon. Count only corners and ends: 3, so it is propan-1-ol.';break;
case 'flip':m='Flipping or rotating a zig-zag does not change the bonds. Same molecule.';break;
case 'iso':m='Isomers have different bonding. Here the bonding is identical: both are butane.';break;
case 'twoc':m='One line joins two carbons. A second line means a double bond.';break;
default:m='Bonds to H are never drawn on carbon in skeletal formulae.'}
const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
function down(p){const v=mode(),id=at(p);S.p0=p;S.dp=null;S.hold=null;
if(v==='groups'){if(id==='tok'){S.hold='tok';return true}if(id)dropTok(id);return false}
if(id==null){tapBlank();return false}
if(v==='carbons'&&id[0]==='c')tapC(+id.slice(1));else if(v==='hydrogens'&&id[0]==='h')setH(+id.slice(1));
else if(v==='draw'){if(id==='clear')clearPath();else if(id[0]==='d')dotTap(+id.slice(1))}else if(v==='match'&&id.startsWith('opt'))pick(+id.slice(3));return false}
function up(p){const k=S.hold;S.hold=null;S.dp=null;if(k!=='tok')return A.redraw();const far=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;
if(!far){S.msg='Drag the token onto the skeleton.';return A.redraw()}const id=at(p);dropTok(id==='tok'?null:id)}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
A.start()})})();
