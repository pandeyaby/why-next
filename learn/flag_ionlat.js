/* Flagship: Ionic bonding and lattices (ages 14–16; AQA GCSE Chemistry 4.2.1.2 ionic bonding, 4.2.1.3 ionic compounds,
   4.2.2.3 properties of ionic compounds). Move sodium's outer electron to chlorine, tap an ion to see it pulled by
   every neighbour (no NaCl "molecules"), build a lattice so opposite charges touch, count a 1:2 lattice to get MgCl₂,
   heat salt to 801 °C, and test solid, molten and dissolved salt in a circuit.
   Not flagion (forming single ions), flagcov (sharing electrons) or flagsimol (simple molecular substances). */
(()=>{
VIS.reg('flagionlat',c=>{let A,bar,quiz,qi=-1,ver=0;const L={};
const part=()=>['xfer','pull','build','ratio','melt','cond','quiz'][A.step];
function note(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-10)}
const on=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* one ion: a cation is small, an anion is larger (Na⁺ 102 pm, Cl⁻ 181 pm) */
function ion(x,y,kind,r,hl){const g=A.ctx,C=A.col,pos=kind>0,rr=r*(pos?.62:1);g.fillStyle=A.alpha(pos?C.vi:C.gr,hl?.85:.5);g.beginPath();g.arc(x,y,rr,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=hl?3:1.2;g.stroke();
 put(L.lab?L.lab[kind>0?0:1]:(pos?'Na⁺':'Cl⁻'),x,y,Math.max(10,rr*.62),{b:800})}
function atom(x,y,R,shells,name,col){const g=A.ctx,C=A.col;g.fillStyle=A.alpha(col,.6);g.beginPath();g.arc(x,y,R*.22,0,7);g.fill();put(name,x,y,A.narrow?12:14,{b:900});
 shells.forEach((n,k)=>{const r=R*(.42+k*.29);g.strokeStyle=A.alpha(C.tx,.45);g.lineWidth=1.2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();for(let e=0;e<n;e++){const a=e/Math.max(n,1)*6.283-1.57;g.fillStyle=C.tx;g.beginPath();g.arc(x+Math.cos(a)*r,y+Math.sin(a)*r,4,0,7);g.fill()}})}
const naX=()=>A.W*.27,clX=()=>A.W*.73,midY=()=>A.H*.42,big=()=>Math.min(A.W*.17,A.H*.28);
function drawXfer(){const C=A.col,R=big(),g=A.ctx;atom(naX(),midY(),R,L.moved?[2,8]:[2,8,0],'Na',C.vi);atom(clX(),midY(),R,L.moved?[2,8,8]:[2,8,7],'Cl',C.gr);
 if(!L.moved){const p=L.grab||{x:naX(),y:midY()-R*1.0};g.fillStyle=C.rd;g.beginPath();g.arc(p.x,p.y,8,0,7);g.fill();put('drag me',p.x,p.y-18,A.narrow?11:12,{ink:C.tx})}
 else{const r3=R*(.42+2*.29),a7=7/8*6.283-1.57;g.fillStyle=C.rd;g.beginPath();g.arc(clX()+Math.cos(a7)*r3,midY()+Math.sin(a7)*r3,5,0,7);g.fill();[[naX(),'+','2,8'],[clX(),'−','2,8,8']].forEach(([x,s,cfg])=>{g.strokeStyle=C.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x-R*1.05,midY()-R*1.05);g.lineTo(x-R*1.15,midY()-R*1.05);g.lineTo(x-R*1.15,midY()+R*1.05);g.lineTo(x-R*1.05,midY()+R*1.05);g.moveTo(x+R*1.05,midY()-R*1.05);g.lineTo(x+R*1.15,midY()-R*1.05);g.lineTo(x+R*1.15,midY()+R*1.05);g.lineTo(x+R*1.05,midY()+R*1.05);g.stroke();put(s,x+R*1.28,midY()-R*1.05,A.narrow?20:24,{b:900});put(cfg,x,midY()+R*1.25,A.narrow?12:13,{ink:C.mu})})}
 put(L.moved?'Na⁺ [2,8] and Cl⁻ [2,8,8]: both have full outer shells':'Na 2,8,1 and Cl 2,8,7',A.W/2,A.H*.9,A.narrow?13:15,{b:800})}
/* a square lattice: the ion at (i,j) is + when i+j is even */
const N=5,cell=()=>Math.min(A.W*.9,A.H*.78)/N,org=()=>({x:(A.W-cell()*N)/2,y:A.H*.08});
const at=(i,j)=>({x:org().x+(i+.5)*cell(),y:org().y+(j+.5)*cell()});
function drawPull(){const s=cell(),g=A.ctx,C=A.col;if(L.tap){const[a,b]=L.tap,p=at(a,b);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const i=a+dx,j=b+dy;if(i<0||j<0||i>=N||j>=N)return;const q=at(i,j);g.strokeStyle=C.rd;g.lineWidth=4;g.setLineDash([8,5]);g.beginPath();g.moveTo(p.x,p.y);g.lineTo(q.x,q.y);g.stroke();g.setLineDash([])})}
 for(let i=0;i<N;i++)for(let j=0;j<N;j++){const p=at(i,j);ion(p.x,p.y,(i+j)%2?-1:1,s*.42,L.tap&&L.tap[0]===i&&L.tap[1]===j)}
 put(L.tap?`${L.pulls} attractions on this ion (6 in the real 3-D crystal)`:'Tap an ion to see what attracts it',A.W/2,A.H*.95,A.narrow?13:15,{b:800})}
const G=3,gcell=()=>Math.min(A.W*.6,A.H*.62)/G,gorg=()=>({x:(A.W-gcell()*G)/2,y:A.H*.06}),gat=(i,j)=>({x:gorg().x+i*gcell(),y:gorg().y+j*gcell(),w:gcell(),h:gcell()});
const tray=k=>({x:A.W*(k?.56:.24),y:A.H*.78,w:A.W*.2,h:A.H*.17});
function drawBuild(){const C=A.col,s=gcell(),g=A.ctx;for(let i=0;i<G;i++)for(let j=0;j<G;j++){const r=gat(i,j),v=L.grid[j*G+i];g.strokeStyle=A.alpha(C.tx,.4);g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);if(v)ion(r.x+s/2,r.y+s/2,v,s*.42,L.bad===j*G+i)}
 [1,-1].forEach((k,n)=>{let r=tray(n);if(L.drag&&L.drag.k===k)r={...r,x:L.drag.x-r.w/2,y:L.drag.y-r.h/2};ion(r.x+r.w/2,r.y+r.h/2,k,r.h*.45,L.kind===k)});
 put(L.msg||'Drag Na⁺ or Cl⁻ into the empty squares',A.W/2,A.H*.72,A.narrow?12:14,{ink:C.tx,max:A.W*.95})}
const RAT=[[1,0,0],[0,1,0],[0,0,1]],FORMS=['MgCl','MgCl₂','Mg₂Cl'],fbox=i=>({x:A.W*(.05+i*.32),y:A.H*.8,w:A.W*.26,h:A.H*.13});
function drawRatio(){const s=Math.min(A.W/7,A.H*.17);for(let r=0;r<3;r++)for(let k=0;k<6;k++){const x=A.W/2+(k-2.5)*s,y=A.H*.12+r*s*1.05,m=(k+r)%3===1;ion(x,y,m?1:-1,s*.45,L.count&&m)}
 if(L.count)put('6 Mg²⁺ : 12 Cl⁻ is 1 : 2, so +12 and −12 cancel',A.W/2,A.H*.12+3*s*1.05,A.narrow?12:14,{b:800,max:A.W*.95});
 FORMS.forEach((f,i)=>{const r=fbox(i),C=A.col;A.ctx.fillStyle=L.pick===i?A.alpha(i===1?C.gr:C.rd,.35):A.alpha(C.tx,.06);A.paint.rrect(r.x,r.y,r.w,r.h,10);A.ctx.fill();A.ctx.strokeStyle=C.tx;A.ctx.lineWidth=1.5;A.ctx.stroke();put(f,r.x+r.w/2,r.y+r.h/2,A.narrow?18:22,{b:900})})}
const slideX=t=>A.W*.1+A.W*.8*t/1000;
function drawMelt(){const C=A.col,s=Math.min(A.W/8,A.H*.13),T=L.T,melt=T>=801,jig=T/1000*s*.18,g=A.ctx;
 for(let i=0;i<6;i++)for(let j=0;j<4;j++){const k=(i*7+j*13)%10/10-.5,x=A.W/2+(i-2.5)*s+(melt?k*s*2.4:Math.sin(L.ph+i+j*2)*jig),y=A.H*.12+j*s+(melt?((i*3+j*5)%7/7-.5)*s*1.6+s*.6:Math.cos(L.ph*1.3+i*2+j)*jig);ion(x,y,(i+j)%2?-1:1,s*.45)}
 const y=A.H*.83;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(slideX(0),y);g.lineTo(slideX(1000),y);g.stroke();g.strokeStyle=C.rd;g.lineWidth=2;g.beginPath();g.moveTo(slideX(801),y-12);g.lineTo(slideX(801),y+12);g.stroke();
 put('801 °C',slideX(801),y+A.H*.05,A.narrow?11:12,{ink:C.tx});put('0 °C',slideX(0),y+A.H*.05,A.narrow?11:12,{ink:C.mu});A.paint.ball(slideX(T),y,13,C.am);
 put(melt?`${T} °C: the lattice has broken up. Molten salt.`:`${T} °C: solid. The ions vibrate but stay in place.`,A.W/2,A.H*.69,A.narrow?13:15,{b:800,max:A.W*.95})}
const ST=['solid','molten','dissolved'];
function drawCond(){const C=A.col,g=A.ctx,s=Math.min(A.W*.6*.5/4,A.H*.12),x0=A.W*.2,x1=A.W*.8,y0=A.H*.2,y1=A.H*.62,lit=L.st>0;
 g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(x0,A.H*.06,x1-x0,y1-A.H*.06);g.fillStyle=A.mix(C.pn,'#94a3b8',.3);g.fillRect(x0+(x1-x0)*.25,y0,(x1-x0)*.5,y1-y0+A.H*.08);
 g.fillStyle=lit?'#facc15':A.alpha(C.tx,.15);g.beginPath();g.arc(A.W/2,A.H*.06,A.H*.045,0,7);g.fill();g.stroke();put(lit?'bulb on':'bulb off',A.W/2,A.H*.015+A.H*.1,A.narrow?11:12,{b:800});
 const cx0=x0+(x1-x0)*.25+s*.55,span=(x1-x0)*.5-s*1.1;for(let k=0;k<8;k++){const i=k%4,j=Math.floor(k/4),run=L.st?(k%2?-1:1)*L.drift+k*7:0,x=cx0+(((i*span/3+run)%span)+span)%span,y=y0+s*1.2+j*s*1.4+(L.st?Math.cos(L.ph+k)*s*.4:0);ion(x,y,(i+j)%2?-1:1,s*.48)}
 if(L.st===2)put('water',A.W/2,y1+A.H*.05,A.narrow?11:12,{ink:C.tx});
 put(`${ST[L.st]} salt: ${lit?'ions are free to move, so it conducts':'ions are fixed in place, so no current'}`,A.W/2,A.H*.8,A.narrow?13:15,{b:800,max:A.W*.95});put('tested: '+(L.tested.map(i=>ST[i]).join(', ')||'none'),A.W/2,A.H*.9,A.narrow?12:13,{ink:C.mu})}
function draw(Q){const C=Q.col,k=part();Q.ctx.fillStyle=Q.mix(C.pn,'#e0f2fe',C.dark?.06:.4);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({xfer:drawXfer,pull:drawPull,build:drawBuild,ratio:drawRatio,melt:drawMelt,cond:drawCond}[k]||(()=>{put('Ionic bonding',Q.W/2,Q.H*.36,Q.narrow?22:28,{b:900});put('electron transfer → oppositely charged ions → giant lattice',Q.W/2,Q.H*.55,Q.narrow?12:14,{ink:C.mu})}))();Q.fx.draw(Q.ctx)}
function setup(o){ver++;for(const k in L)delete L[k];Object.assign(L,{moved:false,grab:null,tap:null,pulls:0,grid:[0,0,0,0,1,0,0,0,0],kind:null,drag:null,bad:null,msg:'',count:false,pick:null,T:20,ph:0,st:0,tested:[],drift:0,lab:null,check:()=>{}},o||{})}
const passIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function demo(i,acts){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},A.reduced()?20*(j+1):260*(j+1)))}
function transfer(){L.moved=true;L.grab=null;A.sound.pop();note('Sodium gives its one outer electron to chlorine. Sodium becomes Na⁺ and chlorine becomes Cl⁻.');A.redraw();L.check()}
function tapIon(i,j){L.tap=[i,j];L.pulls=[[1,0],[-1,0],[0,1],[0,-1]].filter(([a,b])=>i+a>=0&&j+b>=0&&i+a<N&&j+b<N).length;A.sound.tick();
 note(`This ${(i+j)%2?'Cl⁻':'Na⁺'} is pulled by ${L.pulls} oppositely charged neighbours. No ion belongs to just one partner.`);A.redraw();L.check()}
/* place an ion in the 3×3 grid; a neighbour with the same charge repels, so the move is refused */
function place(idx,k){if(L.grid[idx])return;const i=idx%G,j=Math.floor(idx/G),same=[[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>{const x=i+a,y=j+b;return x>=0&&y>=0&&x<G&&y<G&&L.grid[y*G+x]===k});
 if(same){L.bad=idx;A.sound.miss();L.msg=`Two ${k>0?'Na⁺':'Cl⁻'} ions side by side repel. Put opposite charges next to each other.`}else{L.grid[idx]=k;L.bad=null;A.sound.pop();L.msg=L.grid.every(Boolean)?'Every ion touches only opposite charges.':''}
 note(L.msg||'Placed.');A.redraw();L.check()}
function nextFree(k){const i=L.grid.findIndex((v,n)=>!v&&((n%G+Math.floor(n/G))%2===0)===(k>0));if(i>=0)place(i,k)}
function pickForm(i){L.pick=i;i===1?A.sound.pop():A.sound.miss();note(i===1?'MgCl₂: one Mg²⁺ (2+) balances two Cl⁻ (1− each).':i===0?'MgCl leaves a charge of +1. The charges in the formula must add to zero.':'Mg₂Cl would be +4 and −1. Count the ions: twice as many Cl⁻ as Mg²⁺.');A.redraw();L.check()}
function heat(t){const v=Math.max(20,Math.min(1000,Math.round(t/10)*10));L.T=v===800?801:v;note(L.T>=801?`${L.T} °C. Salt melts at 801 °C: enough energy to overcome the strong attractions all through the lattice.`:`${L.T} °C. Still solid.`);A.redraw();L.check()}
function test(s){L.st=s;if(!L.tested.includes(s))L.tested.push(s);s?A.sound.pop():A.sound.miss();note(s?`${ST[s]} salt conducts: the ions can move and carry charge.`:'Solid salt does not conduct. It has ions, but they cannot move.');A.redraw();L.check()}
function controls(){if(!bar)return;bar.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},bar,t).onclick=f};
 if(k==='xfer'&&!L.moved)b('Move the electron to Cl',transfer);
 if(k==='pull'){b('Tap the middle ion',()=>tapIon(2,2));b('Tap a corner ion',()=>tapIon(0,0))}
 if(k==='build'){b('Add Na⁺',()=>nextFree(1),'Add a sodium ion to the next free square');b('Add Cl⁻',()=>nextFree(-1),'Add a chloride ion to the next free square')}
 if(k==='ratio'){if(!L.count)b('Count the ions',()=>{L.count=true;A.sound.tick();note('6 magnesium ions and 12 chloride ions: a 1 to 2 ratio.');A.redraw();controls()});FORMS.forEach((f,i)=>b(f,()=>pickForm(i),'Choose '+f))}
 if(k==='melt'){b('− 100 °C',()=>heat(L.T-100),'Cool by 100 degrees');b('+ 100 °C',()=>heat(L.T+100),'Heat by 100 degrees')}
 if(k==='cond')ST.forEach((s,i)=>b('Test '+s,()=>test(i)))}
function down(p){const k=part();if(k==='quiz')return false;
 if(k==='xfer'){if(L.moved)return false;L.grab={x:p.x,y:p.y};A.redraw();return true}
 if(k==='pull'){const s=cell(),o=org(),i=Math.floor((p.x-o.x)/s),j=Math.floor((p.y-o.y)/s);if(i<0||j<0||i>=N||j>=N)return false;tapIon(i,j);return true}
 if(k==='build'){const n=[1,-1].findIndex((_,m)=>on(p,tray(m)));if(n>=0){const kk=n?-1:1;L.kind=kk;L.drag={k:kk,x:p.x,y:p.y};A.redraw();return true}
  for(let idx=0;idx<G*G;idx++)if(on(p,gat(idx%G,Math.floor(idx/G)))&&L.kind){place(idx,L.kind);return true}return false}
 if(k==='ratio'){const i=[0,1,2].find(j=>on(p,fbox(j)));if(i==null)return false;pickForm(i);return true}
 if(k==='melt'&&p.y>A.H*.74){L.slide=true;heat((p.x-A.W*.1)/(A.W*.8)*1000);return true}
 if(k==='cond'){test((L.st+1)%3);return true}return false}
function move(p){if(L.grab){L.grab={x:p.x,y:p.y};A.redraw()}if(L.drag){L.drag.x=p.x;L.drag.y=p.y;A.redraw()}if(L.slide)heat((p.x-A.W*.1)/(A.W*.8)*1000)}
function up(p){L.slide=false;if(L.grab){const d=p&&Math.hypot(p.x-clX(),p.y-midY())<big()*1.2;L.grab=null;d?transfer():A.redraw();return}
 const d=L.drag;L.drag=null;if(!d||!p){A.redraw();return}for(let idx=0;idx<G*G;idx++)if(on(p,gat(idx%G,Math.floor(idx/G)))){place(idx,d.k);return}A.redraw()}
const steps=[
{h:'Electrons move from metal to non-metal',p:'Sodium (2,8,1) loses its one outer electron. Chlorine (2,8,7) gains it. Both now have full outer shells.',
 predict:{q:'After it gives away an electron, sodium is…',opts:['Na⁻, it changed','Na⁺, it lost a negative electron','still neutral'],ans:1},
 task:'Drag the outer electron onto chlorine',show:()=>demo(0,[transfer]),
 go:()=>{setup();note('A sodium atom and a chlorine atom.');controls();L.check=passIf(0,()=>L.moved,'Na⁺ and Cl⁻. Opposite charges attract: that attraction is the ionic bond.')}},
{h:'Attraction in every direction',p:'Ionic compounds form a giant lattice. Each ion is attracted to all the oppositely charged ions around it, not to one partner.',
 predict:{q:'One Na⁺ in salt is attracted to…',opts:['only its own Cl⁻ partner','every Cl⁻ next to it','no other ions'],ans:1},
 task:'Tap an ion in the middle of the lattice',show:()=>demo(1,[()=>tapIon(2,2)]),
 go:()=>{setup();note('A slice of a sodium chloride lattice.');controls();L.check=passIf(1,()=>L.pulls===4,'4 neighbours in this slice, 6 in the 3-D crystal. There are no NaCl molecules.')}},
{h:'Build a lattice',p:'Ions pack so that each one touches ions of the opposite charge. Like charges side by side would repel.',
 predict:{q:'Which pattern holds a lattice together?',opts:['Like charges in rows','Alternating + and −','Random'],ans:1},
 task:'Fill the grid so opposite charges touch',show:()=>demo(2,[1,3,5,7].map(i=>()=>place(i,-1)).concat([0,2,6,8].map(i=>()=>place(i,1)))),
 go:()=>{setup();note('A 3 by 3 grid with one Na⁺ in the middle.');controls();L.check=passIf(2,()=>L.grid.every(Boolean),'Alternating + and − in every direction: a giant ionic lattice.')}},
{h:'Formula from the ratio',p:'The formula gives the ratio of ions. The charges must add up to zero.',
 predict:{q:'Mg²⁺ and Cl⁻ make magnesium chloride. Its formula is…',opts:['MgCl','MgCl₂','Mg₂Cl'],ans:1},
 task:'Count the ions, then pick the formula',show:()=>demo(3,[()=>{L.count=true;A.redraw();controls()},()=>pickForm(1)]),
 go:()=>{setup({lab:['Mg²⁺','Cl⁻']});note('Part of a magnesium chloride lattice.');controls();L.check=passIf(3,()=>L.count&&L.pick===1,'1 Mg²⁺ : 2 Cl⁻, so MgCl₂.')}},
{h:'High melting point',p:'To melt salt you must overcome many strong electrostatic attractions. That needs a lot of energy.',
 predict:{q:'Sodium chloride melts at about…',opts:['100 °C','800 °C','room temperature'],ans:1},
 task:'Heat the salt until it melts',show:()=>demo(4,[()=>heat(500),()=>heat(801)]),
 go:()=>{setup();A.kick();note('Solid salt at 20 °C.');controls();L.check=passIf(4,()=>L.T>=801,'Salt melts at 801 °C. Strong attractions act all through the lattice.')}},
{h:'When does it conduct?',p:'A current needs charged particles that can move. In solid salt the ions are fixed; melted or dissolved, they move.',
 predict:{q:'Solid salt is made of ions. Does it conduct?',opts:['Yes, ions are charged','No, its ions cannot move','Only when cold'],ans:1},
 task:'Test solid, molten and dissolved salt',show:()=>demo(5,[()=>test(0),()=>test(1),()=>test(2)]),
 go:()=>{setup();note('Salt in a circuit with a bulb.');controls();A.kick();L.check=passIf(5,()=>L.tested.length===3,'Molten or dissolved: ions move, so it conducts. Solid: ions fixed, so it does not.')}},
{h:'Challenge',p:'',go:()=>{setup();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>L.check()});
const BANK=[['Sodium chloride is made of…',[['a giant lattice of ions','ok'],['NaCl molecules','pair'],['atoms sharing electrons','share']]],
 ['When sodium reacts with chlorine, sodium forms…',[['Na⁺','ok'],['Na⁻','sign'],['Na²⁺','sign']]],
 ['Magnesium oxide (Mg²⁺ and O²⁻) has the formula…',[['MgO','ok'],['MgO₂','ratio'],['Mg₂O','ratio']]],
 ['Calcium chloride (Ca²⁺ and Cl⁻) has the formula…',[['CaCl₂','ok'],['CaCl','ratio'],['Ca₂Cl','ratio']]],
 ['Why does sodium chloride have a high melting point?',[['many strong attractions in all directions','ok'],['its molecules are large','pair'],['its bonds are weak','weak']]],
 ['Solid sodium chloride does not conduct because…',[['its ions cannot move','ok'],['it has no charged particles','solid'],['its electrons are too big','solid']]],
 ['Molten sodium chloride conducts because…',[['its ions can move','ok'],['free electrons flow through it','elec'],['it shares electrons','share']]],
 ['Magnesium oxide melts higher than sodium chloride because…',[['its ions have larger charges','ok'],['it has more molecules','pair'],['its electrons are shared','share']]]];
function hint(t){let m='Think about the ions: their charges, and whether they can move.';
 if(t==='pair')m='There are no molecules in an ionic compound. Each ion is attracted to all its neighbours in a giant lattice.';
 if(t==='share')m='Sharing electrons is covalent bonding. In ionic bonding electrons are transferred from metal to non-metal.';
 if(t==='sign')m='A metal atom loses electrons, so it becomes positive. Group 1 loses one electron: 1+.';
 if(t==='ratio')m='Balance the charges so they add to zero, then write the ratio of ions.';
 if(t==='weak')m='Ionic bonds are strong. Many of them act in all directions, so melting needs a lot of energy.';
 if(t==='solid')m='Solid salt does have charged ions. They are fixed in the lattice, so they cannot carry a current.';
 if(t==='elec')m='Ionic compounds have no free electrons. The current is carried by moving ions.';
 return m}
function ask(){qi++;const[q,ops]=BANK[qi%BANK.length],sh=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn sm'},row,o).onclick=()=>score(t)});note('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?'✓ Correct.':'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:Q=>{quiz.hidden=Q.step!==6;bar.hidden=Q.step===6;controls()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ionic lattice controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);setup();A.gest({down,move,up});A.every(dt=>{const k=part();if(A.reduced()||(k!=='melt'&&k!=='cond'))return false;L.ph+=dt*(1+L.T/150);L.drift+=dt*20;return true});controls()}});
A.start()})})();
