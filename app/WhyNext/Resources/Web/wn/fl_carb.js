/* Flagship – carbonyls (16–18): δ+/δ− on C=O, slide C=O along C₃ (propanal/propanone), build from names,
   sort –CHO vs –CO– formulas, send a nucleophile to the δ+ carbon. */
(()=>{const ST=['meth','eth','prop','but','pent'],SUB='₀₁₂₃₄₅₆₇₈₉',sb=n=>String(n).split('').map(d=>SUB[d]).join('');
 const nm=(n,p)=>{if(n===1)return'methanal';if(p===1||p===n)return ST[n-1]+'anal';const q=Math.min(p,n+1-p);return n<5?ST[n-1]+'anone':ST[n-1]+'an-'+q+'-one'};
 const fam=(n,p)=>n===1||p===1||p===n?'aldehyde':'ketone',fml=n=>'C'+(n>1?sb(n):'')+'H'+sb(2*n)+'O';
 const TG=[['butanone',4,'C=O inside a 4-carbon chain'],['pentan-3-one',5,'C=O on the middle carbon of 5'],['ethanal',2,'C=O at the end of a 2-carbon chain']];
 const SF=[['CH₃CHO',0],['CH₃COCH₃',1],['HCHO',0],['CH₃CH₂COCH₃',1],['CH₃CH₂CH₂CHO',0],['CH₃COCH₂CH₂CH₃',1]],DEAL=[0,1,3,2,5,4];
VIS.reg('flagcarbonyl',c=>{let A,pad,chal,read;
 const S={ch:[-1,-1],pk:-1,p3:1,seen:[],n:3,p:1,tg:0,bin:[[],[]],dk:0,nu:0,hold:0,at:null,it:-1,msg:'',fn:()=>{},tok:0};
 const kind=()=>['pol','slide','build','sort','nuc','quiz'][A.step];
 const on=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
 function txt(x,s,X,Y,w,lh,max){const o=[];let r='';for(const t of s.split(' ')){const q=r?r+' '+t:t;if(r&&x.measureText(q).width>w){o.push(r);r=t}else r=q}o.push(r);o.slice(0,max||9).forEach((l,i)=>x.fillText(l,X,Y+i*lh));return Math.min(o.length,max||9)}
 function card(x,b,fill,edge,w){x.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,11);x.fill();x.strokeStyle=edge;x.lineWidth=w||1.3;x.stroke()}
 const F=(n,s)=>`${n} ${s||(A.narrow?13:14)}px system-ui`;
 function atom(x,X,Y,r,l,col,C){A.paint.ball(X,Y,r,col);x.fillStyle=C.bg;x.font=F(800,r>15?15:12);x.textAlign='center';x.textBaseline='middle';x.fillText(l,X,Y+1);x.textBaseline='alphabetic'}
 function geoM(n,cy){const sp=Math.min(78,(A.W-60)/Math.max(n,2)),cx=A.W/2;return{sp,cy,r:Math.min(18,sp*.27),X:i=>cx+(i-(n-1)/2)*sp}}
 function mol(x,n,p,cy,C,num){const g=geoM(n,cy),oy=cy-g.sp*.95;x.strokeStyle=A.alpha(C.tx,.7);x.lineWidth=3;
  for(let i=0;i<n-1;i++){x.beginPath();x.moveTo(g.X(i),cy);x.lineTo(g.X(i+1),cy);x.stroke()}
  if(p){const X=g.X(p-1);[-5,5].forEach(d=>{x.beginPath();x.moveTo(X+d,cy-g.r);x.lineTo(X+d,oy+g.r);x.stroke()});atom(x,X,oy,g.r+2,'O',C.rd,C)}
  for(let i=0;i<n;i++){const X=g.X(i),h=4-(n>1?(i&&i<n-1?2:1):0)-(p===i+1?2:0);atom(x,X,cy,g.r,'C',C.tx,C);
   x.fillStyle=h<3&&p===i+1?C.am:C.mu;x.font=F(700,13);x.textAlign='center';if(h)x.fillText('H'+(h>1?sb(h):''),X,cy+g.r+18);
   if(num&&p){const q=fam(n,p)==='aldehyde'?(p===1||n===1?i+1:n-i):(p<=n+1-p?i+1:n-i);x.fillStyle=A.alpha(C.vi,.9);x.font=F(800,11);x.fillText(q,X,cy+g.r+34)}}
  return[...Array(n)].map((_,i)=>({i,x:g.X(i)-g.sp/2,y:oy-g.r-6,w:g.sp,h:cy-oy+g.r*2+30}))}
 const nb=()=>({m:{x:12,y:A.H-62,w:56,h:50},p:{x:A.W-68,y:A.H-62,w:56,h:50}});
 const bins=()=>{const w=(A.W-22)/2,h=A.H*.5;return[{i:0,x:8,y:34,w,h},{i:1,x:14+w,y:34,w,h}]},deck=()=>({x:A.W*.2,y:A.H*.5+52,w:A.W*.6,h:A.H*.5-70});
 const pc=()=>({o:{x:A.W*.25,y:A.H*.42},c:{x:A.W*.25,y:A.H*.42+72},e1:{x:A.W*.75-34,y:A.H*.42+72},e2:{x:A.W*.75+34,y:A.H*.42+72},nu:{x:A.W/2,y:A.H-46}});
 const hitP=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<(r||30);
 function draw(A){const{ctx:x,W,H,col:C}=A,k=kind();x.fillStyle=A.mix(C.pn,C.cy,.05);x.fillRect(0,0,W,H);x.textAlign='left';
  const head=t=>{x.fillStyle=C.tx;x.font=F(800,A.narrow?15:17);x.textAlign='left';x.fillText(t,10,24)};
  if(k==='pol'){head('Share the electrons: where are δ+ and δ−?');const cX=W*.36,oX=W*.64,y=H*.42;
   if(S.ch[0]===0&&S.ch[1]===1){const g=x.createRadialGradient(oX-10,y,4,oX-30,y,W*.3);g.addColorStop(0,A.alpha(C.rd,.35));g.addColorStop(1,A.alpha(C.rd,0));x.fillStyle=g;x.fillRect(0,y-90,W,180)}
   x.strokeStyle=A.alpha(C.tx,.75);x.lineWidth=4;[-7,7].forEach(d=>{x.beginPath();x.moveTo(cX,y+d);x.lineTo(oX,y+d);x.stroke()});atom(x,cX,y,30,'C',C.tx,C);atom(x,oX,y,32,'O',C.rd,C);
   x.font=F(600,12);x.fillStyle=C.mu;x.textAlign='center';x.fillText('electronegativity 2.55',cX,y+52);x.fillText('3.44',oX,y+52);
   [0,1].forEach(a=>{const v=S.ch[a];if(v>=0){x.fillStyle=v?C.rd:C.cy;x.font=F(800,24);x.fillText(v?'δ−':'δ+',a?oX:cX,y-44)}});
   [0,1].forEach(t=>{if(S.ch.includes(t))return;const b=tag(t),P=S.hold&&S.pk===t&&S.at?{...b,x:S.at.x-b.w/2,y:S.at.y-b.h/2}:b;card(x,P,A.mix(C.pn,t?C.rd:C.cy,S.pk===t?.3:.12),t?C.rd:C.cy,S.pk===t?2.5:1.5);
    x.fillStyle=C.tx;x.font=F(800,22);x.textAlign='center';x.fillText(t?'δ−':'δ+',P.x+P.w/2,P.y+P.h/2+8)})}
  if(k==='slide'){head('Tap a carbon to move the C=O');mol(x,3,S.p3,H*.5,C,1);x.textAlign='center';x.fillStyle=C.tx;x.font=F(800,A.narrow?18:20);x.fillText(nm(3,S.p3),W/2,H*.5+76);
   x.fillStyle=fam(3,S.p3)==='aldehyde'?C.am:C.vi;x.font=F(700);x.fillText(fam(3,S.p3)+' · '+fml(3),W/2,H*.5+98);
   x.fillStyle=C.mu;x.font=F(600,12);x.fillText('made: '+(['aldehyde','ketone'].map(f=>(S.seen.includes(f)?'✓ ':'○ ')+f).join('   ')),W/2,H-16)}
  if(k==='build'){const t=TG[S.tg];head(t?'Build: '+t[0]:'All three built');mol(x,S.n,S.p,H*.48,C,1);x.textAlign='center';x.fillStyle=C.tx;x.font=F(800,A.narrow?16:18);x.fillText('You built: '+(S.p?nm(S.n,S.p):'an alkane, no C=O'),W/2,H*.48+74);
   const B=nb();[[B.m,'− C'],[B.p,'+ C']].forEach(([b,l])=>{card(x,b,A.mix(C.pn,C.cy,.15),C.cy,1.6);x.fillStyle=C.tx;x.font=F(800,16);x.fillText(l,b.x+b.w/2,b.y+31)});
   x.fillStyle=C.mu;x.font=F(600,12);x.fillText(S.n+' carbons · tap a carbon for C=O',W/2,H-30);x.fillText('done: '+S.tg+' of 3',W/2,H-12)}
  if(k==='sort'){head('Aldehyde or ketone?');bins().forEach(b=>{card(x,b,A.mix(C.pn,b.i?C.vi:C.am,.1),b.i?C.vi:C.am,1.8);x.fillStyle=b.i?C.vi:C.am;x.font=F(800);x.textAlign='left';x.fillText(b.i?'KETONE –CO–':'ALDEHYDE –CHO',b.x+10,b.y+20);
    let y=b.y+46;x.fillStyle=C.tx;x.font=F(700,A.narrow?13:15);S.bin[b.i].forEach(j=>{x.fillText(SF[j][0],b.x+10,y);y+=24})});
   const j=DEAL[S.dk];if(j!=null){const D=deck(),P=S.hold&&S.at?{...D,x:S.at.x-D.w/2,y:S.at.y-D.h/2}:D;card(x,P,A.mix(C.pn,C.cy,.18),C.cy,2);x.fillStyle=C.tx;x.font=F(800,A.narrow?17:20);x.textAlign='center';x.fillText(SF[j][0],P.x+P.w/2,P.y+P.h/2+7)}
   else{x.fillStyle=C.gr;x.font=F(700);x.textAlign='left';x.fillText('All six sorted.',12,H-24)}}
  if(k==='nuc'){head('Where does the nucleophile bond?');const P=pc();x.strokeStyle=A.alpha(C.tx,.75);x.lineWidth=3;
   [-5,5].forEach(d=>{x.beginPath();x.moveTo(P.c.x+d,P.c.y);x.lineTo(P.o.x+d,P.o.y);x.stroke();x.beginPath();x.moveTo(P.e1.x,P.e1.y+d);x.lineTo(P.e2.x,P.e2.y+d);x.stroke()});
   atom(x,P.o.x,P.o.y,20,'O',C.rd,C);atom(x,P.c.x,P.c.y,19,'C',C.tx,C);atom(x,P.e1.x,P.e1.y,19,'C',C.tx,C);atom(x,P.e2.x,P.e2.y,19,'C',C.tx,C);
   x.font=F(800,16);x.textAlign='center';x.fillStyle=C.rd;x.fillText('δ−',P.o.x+34,P.o.y+6);x.fillStyle=C.cy;x.fillText('δ+',P.c.x+34,P.c.y+6);
   x.fillStyle=C.mu;x.font=F(600,12);x.fillText('C=O (carbonyl)',P.c.x,P.c.y+42);x.fillText('C=C (alkene)',W*.75,P.c.y+42);
   if(S.nu){x.strokeStyle=C.gr;x.lineWidth=2.5;x.beginPath();x.moveTo(P.nu.x-20,P.nu.y-18);x.quadraticCurveTo(W/2-10,P.c.y+10,P.c.x+22,P.c.y+10);x.stroke();
    x.beginPath();x.moveTo(P.c.x-14,(P.c.y+P.o.y)/2);x.quadraticCurveTo(P.c.x-46,(P.c.y+P.o.y)/2-10,P.o.x-18,P.o.y);x.stroke();x.fillStyle=C.gr;x.font=F(700,12);x.fillText('C=O electrons move onto O',P.c.x+10,P.o.y-30)}
   const Q=S.hold&&S.at?S.at:P.nu;if(!S.nu||S.hold){A.paint.ball(Q.x,Q.y,24,C.vi);x.fillStyle=C.bg;x.font=F(800,13);x.fillText(':CN⁻',Q.x,Q.y+5)}else{x.fillStyle=C.gr;x.font=F(800,14);x.fillText('CN bonds to the δ+ carbon',W/2,H-16)}}
  if(k==='quiz'&&S.q){card(x,{x:10,y:10,w:W-20,h:H-20},A.mix(C.pn,C.cy,.08),A.alpha(C.cy,.5));x.fillStyle=C.tx;x.font=F(700,A.narrow?15:17);x.textAlign='left';const n=txt(x,S.q[0],26,42,W-52,22,6);
   mol(x,3,1,H*.62,C,0);x.textAlign='left';x.fillStyle=C.mu;x.font=F(600,12);x.fillText('O pulls C=O electrons: C is δ+, O is δ−',26,H-26)}
  A.fx.draw(x)}
 const tag=t=>({x:t?A.W*.56:A.W*.16,y:A.H-78,w:A.W*.28,h:56});
 function tell(m){S.msg=m||'';const k=kind();let t=m||'';
  if(k==='pol')t+=' Carbon: '+(S.ch[0]<0?'no tag':S.ch[0]?'δ−':'δ+')+'. Oxygen: '+(S.ch[1]<0?'no tag':S.ch[1]?'δ−':'δ+')+'.';
  if(k==='slide')t+=` C=O on carbon ${S.p3} of 3: ${nm(3,S.p3)}, a ${fam(3,S.p3)}, ${fml(3)}.`;
  if(k==='build')t+=` ${S.n} carbons, C=O ${S.p?'on carbon '+S.p+': '+nm(S.n,S.p):'not placed'}.`+(TG[S.tg]?' Target: '+TG[S.tg][0]+'.':'');
  if(k==='sort')t+=` Aldehydes: ${S.bin[0].length}. Ketones: ${S.bin[1].length}.`+(DEAL[S.dk]!=null?' Next: '+SF[DEAL[S.dk]][0]:'');
  A.cv.setAttribute('aria-label',t.trim()||'Carbonyl lab');c.say(t);if(read)read.textContent=m||'';btns();A.redraw();S.fn()}
 function place(t,a){if(S.ch.includes(t))return;S.pk=-1;if(S.ch[a]>=0)return tell((a?'Oxygen':'Carbon')+' already has a tag.');
  if(t===a){S.ch[a]=t;A.sound.pop();tell(a?'δ− on O: oxygen (3.44) pulls the shared electrons towards itself.':'δ+ on C: its electrons are pulled away towards oxygen.')}
  else{A.sound.miss();tell(t?'Carbon is less electronegative (2.55), so it loses its share of the electrons. It cannot be δ−.':'Oxygen (3.44) pulls the electrons harder, so it gains negative charge. It cannot be δ+.')}}
 function slide(i){S.p3=i+1;const f=fam(3,S.p3);if(!S.seen.includes(f))S.seen.push(f);A.sound.tick();
  tell(S.p3===3?'Carbon 3 is an end too, so this is still propanal. We number from the end nearest the C=O.':S.p3===2?'C=O inside the chain, with a carbon on each side: a ketone, propanone. Same formula C₃H₆O, a different compound.':'C=O at the end: that carbon also holds an H, so –CHO, an aldehyde. Propanal.')}
 function bld(i){if(!TG[S.tg])return;S.p=i+1;A.sound.tick();chk()}
 function len(d){if(!TG[S.tg])return;S.n=Math.max(1,Math.min(5,S.n+d));if(S.p>S.n)S.p=0;A.sound.tick();chk()}
 function chk(){const t=TG[S.tg];if(!t)return;if(S.p&&nm(S.n,S.p)===t[0]){S.tg++;A.win();const msg='Yes: '+t[0]+'. ';if(TG[S.tg]){S.n=3;S.p=0}return tell(msg+(TG[S.tg]?'Next: '+TG[S.tg][0]+'.':'All three built.'))}
  if(!S.p)return tell('Now tap a carbon to put the C=O on it.');const b=nm(S.n,S.p);
  tell(`That is ${b}. ${t[0]} needs ${t[2]}.`)}
 function sort(b){const j=DEAL[S.dk];if(j==null)return;if(SF[j][1]===b){S.bin[b].push(j);S.dk++;A.sound.pop();tell(b?'–CO– with carbon on both sides: a ketone.':'–CHO: the C=O carbon also holds an H, so it is an aldehyde.')}
  else{A.sound.miss();tell(b?'Look at the end: CHO means C=O at the end with an H on it. That is an aldehyde.':'CO sits between two carbon groups, so no H is on the C=O carbon. That is a ketone.')}}
 function nuc(w){if(S.nu)return;if(w==='c'){S.nu=1;A.win();tell('The lone pair on CN⁻ is drawn to the δ+ carbon. The C=O electrons move onto O. This is nucleophilic addition.')}
  else{A.sound.miss();tell(w==='o'?'Oxygen is δ−. A negative ion is pushed away from it, not drawn in.':'C=C is not polar: both carbons pull equally, so there is no δ+ carbon to attract a nucleophile.')}}
 function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':l||null},pad,t).onclick=f};
  if(k==='pol')[[0,0,'δ+ on C'],[0,1,'δ+ on O'],[1,0,'δ− on C'],[1,1,'δ− on O']].forEach(([t,a,l])=>{if(!S.ch.includes(t))b(l,()=>place(t,a),'Put '+l.replace('C','carbon').replace(' O',' oxygen'))});
  if(k==='slide')[0,1,2].forEach(i=>b('C=O on C'+(i+1),()=>slide(i),'Put the C=O on carbon '+(i+1)));
  if(k==='build'&&TG[S.tg]){b('− carbon',()=>len(-1),'Remove a carbon');b('+ carbon',()=>len(1),'Add a carbon');for(let i=0;i<S.n;i++)b('C=O on C'+(i+1),()=>bld(i),'Put the C=O on carbon '+(i+1))}
  if(k==='sort'&&DEAL[S.dk]!=null){b('Aldehyde',()=>sort(0),'Sort as aldehyde: '+SF[DEAL[S.dk]][0]);b('Ketone',()=>sort(1),'Sort as ketone: '+SF[DEAL[S.dk]][0])}
  if(k==='nuc'&&!S.nu){b('To carbonyl C',()=>nuc('c'),'Send CN minus to the carbon of C=O');b('To carbonyl O',()=>nuc('o'),'Send CN minus to the oxygen of C=O');b('To alkene C',()=>nuc('e'),'Send CN minus to a carbon of C=C')}}
 const fin=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m+A.reveal(n))};
 const seq=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},j*ms))};
 const wipe=()=>{S.tok++;S.fn=()=>{};S.ch=[-1,-1];S.pk=-1;S.p3=1;S.seen=[];S.n=3;S.p=0;S.tg=0;S.bin=[[],[]];S.dk=0;S.nu=0;S.msg=''};
 const steps=[
  {h:'The polar C=O',p:'Carbon and oxygen share the electrons in C=O, but not equally. Drag δ+ and δ− onto the right atoms, or use the buttons.',
   predict:{q:'Which atom in C=O carries the slight negative charge, δ−?',opts:['Carbon: it has more bonds','Oxygen: it pulls the shared electrons harder'],ans:1},
   task:'Place δ+ and δ−',show:()=>seq([()=>place(0,0),()=>place(1,1)],700),go:()=>{wipe();S.fn=fin(0,()=>S.ch[0]===0&&S.ch[1]===1,'Oxygen is more electronegative, so C=O is polar: Cδ+ and Oδ−.')}},
  {h:'Aldehyde or ketone?',p:'Same three carbons, same formula. Tap a carbon to move the C=O and watch the name and family.',
   predict:{q:'Move the C=O from carbon 1 to carbon 2. What changes?',opts:['Nothing: same formula, same compound','The family: still C₃H₆O, but now a ketone'],ans:1},
   task:'Make an aldehyde and a ketone',show:()=>seq([()=>slide(1),()=>slide(0)],900),go:()=>{wipe();S.fn=fin(1,()=>S.seen.length===2,'C=O at the end is an aldehyde (–al). C=O inside the chain is a ketone (–one). They are isomers.')}},
  {h:'Build from the name',p:'Read the name, then build it: set the chain length with + and −, and tap a carbon for the C=O.',
   predict:{q:'Can a 2-carbon chain make a ketone?',opts:['Yes: ethanone','No: a ketone needs a carbon on each side of the C=O'],ans:1},
   task:'Build all three',show:()=>seq([()=>len(1),()=>bld(1),()=>len(1),()=>len(1),()=>bld(2),()=>len(-1),()=>bld(0)],550),go:()=>{wipe();S.fn=fin(2,()=>S.tg>=3,'Stem counts carbons, –al or –one gives the family, and a number shows where C=O sits when there is a choice.')}},
  {h:'Read the formula',p:'Condensed formulas hide the C=O. CHO at the end means aldehyde; CO between carbons means ketone. Drag each card, or tap a box.',
   task:'Sort all six formulas',show:()=>seq(DEAL.map(j=>()=>sort(SF[j][1])),600),go:()=>{wipe();S.fn=fin(3,()=>S.dk>=6,'CHO is never a ketone, and CO in the middle is never an aldehyde.')}},
  {h:'Why δ+ matters',p:'A nucleophile brings a lone pair and looks for a δ+ atom. Drag :CN⁻ to the atom it bonds to, or use the buttons.',
   predict:{q:'CN⁻ meets a C=O. Which atom does it bond to?',opts:['Oxygen: it looks like the reactive atom','Carbon: the δ+ atom'],ans:1},
   task:'Send CN⁻ to the right atom',show:()=>seq([()=>nuc('c')],400),go:()=>{wipe();S.fn=fin(4,()=>S.nu===1,'The δ+ carbon is why carbonyls react with nucleophiles, and why alkenes do not.')}},
  {h:'Challenge',p:'',go:()=>{S.tok++;S.fn=()=>{};pose()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.fn()});
 const QB=[['Why is the carbon in C=O δ+?',['Oxygen is more electronegative and pulls the electrons away'],[['Carbon is more electronegative','pol'],['Carbon has four bonds','pol']]],
  ['CH₃CH₂CHO and CH₃COCH₃ share the formula C₃H₆O. Which is the ketone?',['CH₃COCH₃, propanone'],[['CH₃CH₂CHO, propanal','fam'],['Both, same formula','fam']]],
  ['Name CH₃COCH₂CH₂CH₃.',['pentan-2-one'],[['pentan-4-one','num'],['pentanal','fam']]],
  ['What is the smallest possible ketone?',['propanone, 3 carbons'],[['ethanone, 2 carbons','small'],['methanone, 1 carbon','small']]],
  ['Which formula is an aldehyde?',['CH₃CH₂CH₂CHO'],[['CH₃COCH₂CH₃','form'],['CH₃CH₂OH','form']]],
  ['A nucleophile attacks a ketone. Which atom does it bond to?',['The δ+ carbonyl carbon'],[['The δ− oxygen','nuc'],['A CH₃ carbon','nuc']]],
  ['Why does butanone need no number, but pentan-2-one does?',['In a 4-carbon chain the only ketone position is carbon 2'],[['Butanone is an aldehyde','fam'],['Numbers are only for chains over 5','num']]]];
 let qn=-1,row=0;
 function pose(){qn++;const[q,[key],wr]=QB[qn%QB.length],o=[key,...wr.map(w=>w[0])],r=qn%3,op=o.slice(r).concat(o.slice(0,r));S.q=[q,key];
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  op.forEach(w=>{c.el('button',{type:'button',class:'lbtn sm'},chal.querySelector('.fl-pick'),w).onclick=()=>check(w)});A.cv.setAttribute('aria-label','Challenge: '+q);c.say('Challenge: '+q);A.redraw()}
 function check(w){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const[,[key],wr]=QB[qn%QB.length],ok=w===key,tag=(wr.find(x=>x[0]===w)||[])[1];let m;
  if(ok)m='Right.';else if(tag==='pol')m='Electronegativity decides it: O is 3.44, C is 2.55, so the electrons sit nearer O and C is left δ+.';
  else if(tag==='fam')m='Same formula, different families. Look for C=O at the end (–CHO, aldehyde) or inside the chain (–CO–, ketone).';
  else if(tag==='num')m='Number from the end nearest the C=O and use the lowest number. Add one only when the C=O could sit in more than one place.';
  else if(tag==='small')m='A ketone needs a carbon on each side of C=O. With 1 or 2 carbons the C=O is always at an end, so you get an aldehyde.';
  else if(tag==='form')m='CHO at the end marks an aldehyde. CO between two carbons is a ketone, and OH is an alcohol.';
  else m='A nucleophile gives a lone pair to a δ+ atom. The δ− oxygen repels it; the carbonyl carbon attracts it.';
  const fb=chal.querySelector('.fl-fb');if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${row}.`:` Answer: ${key}`} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function down(p){const k=kind();if(k==='quiz')return false;
  if(k==='pol'){const t=[0,1].find(t=>!S.ch.includes(t)&&on(p,tag(t)));if(t!=null){S.pk=t;S.hold=1;S.at=p;A.redraw();return true}
   if(S.pk>=0){const y=A.H*.42;if(hitP(p,{x:A.W*.36,y},44))place(S.pk,0);else if(hitP(p,{x:A.W*.64,y},44))place(S.pk,1)}return false}
  if(k==='slide'){const h=mol(A.ctx,3,S.p3,A.H*.5,A.col,0).find(b=>on(p,b));if(h)slide(h.i);A.redraw();return false}
  if(k==='build'){const B=nb();if(on(p,B.m))len(-1);else if(on(p,B.p))len(1);else{const h=mol(A.ctx,S.n,S.p,A.H*.48,A.col,0).find(b=>on(p,b));if(h)bld(h.i)}A.redraw();return false}
  if(k==='sort'){if(on(p,deck())&&DEAL[S.dk]!=null){S.hold=1;S.at=p;return true}const b=bins().find(b=>on(p,b));if(b)sort(b.i);return false}
  if(k==='nuc'&&!S.nu&&hitP(p,pc().nu,34)){S.hold=1;S.at=p;return true}return false}
 function move(p){if(S.hold){S.at=p;A.redraw()}}
 function up(p){if(!S.hold)return;S.hold=0;p=p||S.at;const k=kind();
  if(k==='pol'){const y=A.H*.42;if(hitP(p,{x:A.W*.36,y},44))place(S.pk,0);else if(hitP(p,{x:A.W*.64,y},44))place(S.pk,1);else{A.redraw();tell('Holding '+(S.pk?'δ−':'δ+')+'. Tap or drop it on an atom.')}}
  else if(k==='sort'){const b=bins().find(b=>on(p,b));if(b)sort(b.i);else A.redraw()}
  else if(k==='nuc'){const P=pc();if(hitP(p,P.c))nuc('c');else if(hitP(p,P.o))nuc('o');else if(hitP(p,P.e1)||hitP(p,P.e2))nuc('e');else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;btns();A.cv.setAttribute('aria-label',steps[A.step].p||'Challenge')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Carbonyl lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});btns()}});
 A.start()})})();
