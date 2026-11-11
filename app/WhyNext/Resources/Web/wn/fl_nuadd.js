/* Flagship – nucleophilic addition to C=O (ages 17–18): CN⁻/H⁻ to the δ+ carbon, the two curly arrows, protonate and
   name (CN adds a carbon; NaBH₄ gives an alcohol), attack the flat C=O from both faces (racemic, not for propanone),
   then sort electrophiles for C=C from nucleophiles for C=O. */
(()=>{
const MOL={propanal:['CH₃CH₂','H'],propanone:['CH₃','CH₃'],ethanal:['CH₃','H']};
const HIT=[['propanal','CN'],['propanone','CN'],['ethanal','H']];
const FINISH=[['propanal','CN','KCN, then dilute acid',[['2-hydroxybutanenitrile','ok'],['2-hydroxypropanenitrile','count'],['propan-1-ol','reag']]],
 ['propanone','H','NaBH₄, then water',[['propan-2-ol','ok'],['propan-1-ol','prim'],['propanal','redox']]],
 ['ethanal','CN','KCN, then dilute acid',[['2-hydroxypropanenitrile','ok'],['2-hydroxyethanenitrile','count'],['ethanol','reag']]]];
const SORT=[['Br₂',0],['HBr (δ+ H)',0],['CN⁻',1],['H⁻ (from NaBH₄)',1],['H₂SO₄ (δ+ H)',0],[':NH₃',1]];
const ZN=['attacks C=C (electrophile)','attacks C=O carbon (nucleophile)'];
VIS.reg('flagnuadd',c=>{let A,ctl,chal,qn=-1,streak=0;
const S={run:0,k:0,arrows:[],prot:0,tally:[0,0],placed:[],drag:null,bad:'',msg:'',want:()=>{}};
const kind=()=>['hit','arrow','finish','face','sort','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function lab(g,t,x,y,n,col,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
// atom positions for a carbonyl drawn with C at the middle
function geo(){const W=A.W,H=A.H,u=Math.min(W/6.5,H/5.2),cx=W*.58,cy=H*.5;return{u,C:{x:cx,y:cy},O:{x:cx,y:cy-u*1.25},R1:{x:cx-u*1.35,y:cy+u*.55},R2:{x:cx+u*1.35,y:cy+u*.55},Nu:{x:cx,y:cy+u*1.3},NC:{x:W*.13,y:cy-u*.1},NN:{x:W*.13-u*.95,y:cy-u*.1}}}
const box=(g,r,col)=>{A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=A.alpha(col,.2);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()};
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
function bond(g,a,b,n,col){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L,s=13;g.strokeStyle=col||A.col.tx;g.lineWidth=2.5;
 for(let i=0;i<n;i++){const o=(i-(n-1)/2)*6;g.beginPath();g.moveTo(a.x+ux*s-uy*o,a.y+uy*s+ux*o);g.lineTo(b.x-ux*s-uy*o,b.y-uy*s+ux*o);g.stroke()}}
function pair(g,x,y,vert){g.fillStyle=A.col.tx;[-4,4].forEach(d=>{g.beginPath();g.arc(x+(vert?0:d),y+(vert?d:0),2.6,0,7);g.fill()})}
function curly(g,a,b,col,bend){const mx=(a.x+b.x)/2-(b.y-a.y)*(bend||.35),my=(a.y+b.y)/2+(b.x-a.x)*(bend||.35);g.strokeStyle=col;g.lineWidth=2.5;g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(mx,my,b.x,b.y);g.stroke();
 const t=Math.atan2(b.y-my,b.x-mx);g.fillStyle=col;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x-12*Math.cos(t-.4),b.y-12*Math.sin(t-.4));g.lineTo(b.x-12*Math.cos(t+.4),b.y-12*Math.sin(t+.4));g.closePath();g.fill()}
// mode: 'co' carbonyl, 'alk' alkoxide with Nu, 'oh' product
function mol(g,name,mode,nu){const P=geo(),[r1,r2]=MOL[name],C=A.col;bond(g,P.C,P.O,mode==='co'?2:1);bond(g,P.C,P.R1,1);bond(g,P.C,P.R2,1);if(mode!=='co')bond(g,P.C,P.Nu,1);
 lab(g,'C',P.C.x,P.C.y,18,C.tx,800);lab(g,mode==='co'?'O':mode==='alk'?'O⁻':'OH',P.O.x,P.O.y,18,C.tx,800);lab(g,r1,P.R1.x-f(6),P.R1.y+4,15,C.tx,700,'right');lab(g,r2,P.R2.x+f(4),P.R2.y+4,15,C.tx,700,'left');
 if(mode!=='co')lab(g,nu==='CN'?'C≡N':'H',P.Nu.x,P.Nu.y+4,16,C.tx,800);
 if(mode==='co'){lab(g,'δ+',P.C.x+f(20),P.C.y-f(12),13,C.tx,800);lab(g,'δ−',P.O.x+f(22),P.O.y,13,C.tx,800);pair(g,P.O.x-f(18),P.O.y,1)}
 if(mode==='alk')pair(g,P.O.x-f(20),P.O.y,1)}
const chipAt=()=>({x:A.W*.13,y:A.H*.2});
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind(),P=geo();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){[['Nu⁻ attacks the δ+ carbon',.3],['π pair moves onto O, then O⁻ takes H⁺',.45],['planar C=O: attack from both faces',.6],['→ racemic mixture',.72]].forEach(([t,y])=>lab(g,t,W/2,H*y,15,C.tx,800));return}
 const head={hit:`Reaction ${Math.min(S.k+1,3)} of 3`,arrow:`Arrows drawn: ${S.arrows.length} of 2`,finish:`Product ${Math.min(S.k+1,3)} of 3`,face:`${S.k?'propanone':'propanal'} + CN⁻: ${S.tally[0]} from above, ${S.tally[1]} from below`,sort:`Sorted ${S.placed.length} of 6`}[v];lab(g,head,10,f(12),12,C.tx,700,'left');
 if(v==='hit'&&S.k<3){const[m,nu]=HIT[S.k];mol(g,m,'co');const p=S.drag&&S.drag.x!=null?S.drag:chipAt();box(g,{x:p.x-f(30),y:p.y-f(17),w:f(60),h:f(34)},C.vi);lab(g,':'+nu+'⁻',p.x,p.y,16,C.tx,800);lab(g,m,W*.58,H-f(30),13,C.tx,700)}
 if(v==='arrow'){if(S.arrows.length<2){mol(g,'propanal','co');lab(g,'C',P.NC.x,P.NC.y,18,C.tx,800);lab(g,'N',P.NN.x,P.NN.y,18,C.tx,800);bond(g,P.NN,P.NC,3);lab(g,'⁻',P.NC.x+f(10),P.NC.y-f(14),18,C.tx,800);pair(g,P.NC.x+f(16),P.NC.y,1);pair(g,P.NN.x-f(16),P.NN.y,1);
   S.arrows.forEach(a=>curly(g,TAIL()[a[0]],P[a[1]],C.gr));if(S.drag&&S.drag.x!=null)curly(g,TAIL()[S.drag.t],S.drag,C.or,.25);
   Object.values(TAIL()).forEach(t=>{g.strokeStyle=A.alpha(C.or,.8);g.lineWidth=1.5;g.setLineDash([3,3]);g.beginPath();g.arc(t.x,t.y,f(13),0,7);g.stroke();g.setLineDash([])})}
  else{mol(g,'propanal','alk','CN');lab(g,'alkoxide intermediate',W/2,H-f(30),13,C.tx,700)}}
 if(v==='finish'&&S.k<3){const[m,nu,r]=FINISH[S.k];mol(g,m,S.prot?'oh':'alk',nu);lab(g,r,10,f(32),12,C.tx,700,'left');if(!S.prot){const p=S.drag&&S.drag.x!=null?S.drag:{x:W*.85,y:H*.2};lab(g,'H⁺',p.x,p.y,20,C.tx,900);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,f(18),0,7);g.stroke()}
  else names().forEach((r,i)=>{box(g,r,S.bad===String(i)?C.rd:C.vi);lab(g,order()[i][0],r.x+r.w/2,r.y+r.h/2,12,C.tx,700)})}
 if(v==='face'){const y=H*.52,w=W*.55;g.fillStyle=A.alpha(C.cy,.18);g.beginPath();g.moveTo(W/2-w/2,y+f(22));g.lineTo(W/2-w/2+f(50),y-f(22));g.lineTo(W/2+w/2,y-f(22));g.lineTo(W/2+w/2-f(50),y+f(22));g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  lab(g,'C',W/2,y,17,C.tx,800);lab(g,'O',W/2+w*.32,y-f(8),15,C.tx,800);lab(g,S.k?'CH₃':'H',W/2-w*.3,y-f(6),13,C.tx,700);lab(g,S.k?'CH₃':'C₂H₅',W/2+w*.05,y+f(14),13,C.tx,700);
  lab(g,'▼ attack from above',W/2,H*.2,13,C.tx,700);lab(g,'▲ attack from below',W/2,H*.86,13,C.tx,700);
  const tot=S.tally[0]+S.tally[1];if(tot){const bw=W*.18;[0,1].forEach(i=>{const h=(H*.5)*S.tally[i]/Math.max(20,tot);g.fillStyle=A.alpha(i?C.pk:C.gr,.55);g.fillRect(i?W-bw-10:10,H*.82-h,bw,h);lab(g,S.k?'same product':'enantiomer '+(i+1),i?W-bw/2-10:10+bw/2,H*.86,11,C.tx,700)})}
  if(S.drag&&S.drag.x!=null)lab(g,':CN⁻',S.drag.x,S.drag.y,16,C.tx,800)}
 if(v==='sort'){zones().forEach((z,i)=>{box(g,z,i?C.gr:C.or);lab(g,ZN[i],z.x+z.w/2,z.y+f(12),11,C.tx,800);
   S.placed.filter(j=>SORT[j][1]===i).forEach((j,n)=>lab(g,SORT[j][0],z.x+z.w/2,z.y+f(30)+n*f(15),11,C.tx,600))});
  SORT.forEach((s,j)=>{if(S.placed.includes(j))return;let r=card(j);if(S.drag&&S.drag.j===j&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};box(g,r,C.vi);lab(g,s[0],r.x+r.w/2,r.y+r.h/2,12,C.tx,700)})}
 if(S.msg)lab(g,S.msg,W/2,H-f(10),12,C.tx,800);A.fx.draw(g)}
const TAIL=()=>{const P=geo();return{lpC:{x:P.NC.x+f(16),y:P.NC.y},lpN:{x:P.NN.x-f(16),y:P.NN.y},pi:{x:P.C.x+f(3),y:(P.C.y+P.O.y)/2},lpO:{x:P.O.x-f(18),y:P.O.y}}};
const order=()=>{const o=FINISH[Math.min(S.k,2)][3],t=S.k%3;return o.slice(t).concat(o.slice(0,t))};
const names=()=>[0,1,2].map(i=>({x:10+i*(A.W-20)/3,y:A.H-f(66),w:(A.W-20)/3-6,h:f(40)}));
const zones=()=>[0,1].map(i=>({x:10+i*(A.W-20)/2,y:f(26),w:(A.W-20)/2-6,h:f(118)}));
const card=j=>{const w=(A.W-30)/2,h=f(34);return{x:10+(j%2)*(w+10),y:f(160)+Math.floor(j/2)*(h+8),w,h}};
const no=(t,short,b)=>{S.bad=b||'';A.sound.miss();S.msg=short;say(t);ctrl();A.redraw()};
const yes=(t,short)=>{S.bad='';A.sound.pop();S.msg=short;say(t);ctrl();A.redraw()};
function attack(atom){if(kind()!=='hit'||S.k>=3)return;S.drag=null;const[m,nu]=HIT[S.k];
 if(atom==='O')return no(`The O is δ− and already electron-rich, so the negative ${nu}⁻ is repelled. Find the δ+ atom.`,'Repelled by δ− O!');
 if(atom!=='C')return no(`That ${atom==='R2'&&MOL[m][1]==='H'?'hydrogen':'carbon'} is not polarised: no δ+ there. The C=O carbon carries the δ+ charge.`,'No δ+ there');
 S.k++;yes(`${nu}⁻ donates its lone pair to the δ+ carbon of ${m}. Oxygen pulls the C=O electrons, leaving that carbon electron-poor.`,'✓ δ+ carbon');if(S.k>=3)S.want()}
function arrow(t,h){if(kind()!=='arrow'||S.arrows.length>=2)return;S.drag=null;const key=t+'>'+h;
 if(S.arrows.some(a=>a[0]===t))return no('That arrow is already drawn.','Already drawn');
 if(key==='lpC>C'||key==='pi>O'){S.arrows.push([t,h]);if(S.arrows.length<2)return yes(key==='pi>O'?'The π pair moves onto the more electronegative oxygen. Now the attack.':'The carbon lone pair of cyanide attacks the δ+ carbon: a new C–C bond. Now the π bond.','✓ 1 of 2');
  yes('Both arrows: the new C–C bond forms as the π pair moves onto O, giving the alkoxide intermediate with O⁻.','✓ Alkoxide formed');return S.want()}
 if(key==='lpN>C')return no('Cyanide attacks through carbon, not nitrogen. That is why the product has a new C–C bond and a longer chain.','Wrong end of CN⁻');
 if(key==='pi>C')return no('The π pair does not go to carbon. It moves onto the oxygen, which is more electronegative.','π pair goes to O');
 if(t==='lpO')return no('Oxygen’s lone pairs stay put here. The pairs that move are cyanide’s lone pair and the C=O π bond.','O lone pair stays');
 no('An arrow runs from an electron pair to the atom that pair ends up on.','Check the arrow')}
function protonate(atom){if(kind()!=='finish'||S.k>=3||S.prot)return;S.drag=null;
 if(atom!=='O')return no('H⁺ is taken by the O⁻: its lone pair forms the new O–H bond. The carbon already has four bonds.','H⁺ goes to O⁻');S.prot=1;yes('The O⁻ lone pair picks up H⁺, giving an OH group. Now name the product.','Name it!')}
function name(i){if(kind()!=='finish'||!S.prot||S.k>=3)return;const[n,t]=order()[i];
 const why={count:'Count again: cyanide adds a carbon, and the nitrile carbon counts in the chain.',reag:'That would need hydride (NaBH₄). With KCN the product keeps the C≡N, so it is a hydroxynitrile.',prim:'Propanone is a ketone, so reduction gives a secondary alcohol: the OH is on carbon 2.',redox:'NaBH₄ adds hydride to the carbon. The product is an alcohol, not another carbonyl.'}[t];
 if(t!=='ok')return no(why,'Not that name',String(i));S.k++;S.prot=0;yes(`${n}. ${S.k<3?'Next one.':''}`,'✓ '+n);if(S.k>=3)S.want()}
function face(i,n){if(kind()!=='face'||S.k>=2)return;S.drag=null;for(let j=0;j<(n||1);j++)S.tally[i==null?Math.random()<.5?0:1:i]++;A.sound.tick();const tot=S.tally[0]+S.tally[1];
 if(tot<20){S.msg=`${tot} molecules`;say(`${S.tally[0]} attacked from above, ${S.tally[1]} from below.`);return A.redraw()}
 const t=S.k?`Propanone: both faces give the same product, 2-hydroxy-2-methylpropanenitrile. Two CH₃ groups, so no chiral carbon.`:`About half attack from each face of the flat C=O, so the two enantiomers form in equal amounts: a racemic mixture with no optical activity.`;
 S.k++;S.tally=[0,0];yes(t,S.k<2?'Now try propanone':'✓ Done');if(S.k>=2)S.want()}
function sort(j,z){if(kind()!=='sort')return;S.drag=null;const[s,want]=SORT[j];
 if(z!==want)return no(want?`${s} is electron-rich: it is a nucleophile that attacks the δ+ carbon of C=O. The C=C bond would repel it.`:`${s} is an electrophile. It needs the electron-rich π bond of C=C; the C=O carbon is already δ+.`,'Other side');
 S.placed.push(j);yes(`${s}: ${ZN[want]}.`,'Sorted');if(S.placed.length>=6)S.want()}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='hit'&&S.k<3)[['C','the δ+ carbonyl carbon'],['O','the δ− oxygen'],['R1','the carbon of '+MOL[HIT[S.k][0]][0]],['R2','the '+MOL[HIT[S.k][0]][1]+' group']].forEach(([a,l])=>B('Attack '+l,()=>attack(a)));
 if(v==='arrow'&&S.arrows.length<2)[['lpC','C','cyanide C lone pair → carbonyl C'],['lpN','C','cyanide N lone pair → carbonyl C'],['pi','O','C=O π bond → O'],['pi','C','C=O π bond → C'],['lpO','C','O lone pair → C']].forEach(([t,h,l])=>B(l,()=>arrow(t,h),'Draw arrow: '+l));
 if(v==='finish'&&S.k<3){if(!S.prot){B('H⁺ to O⁻',()=>protonate('O'));B('H⁺ to the carbon',()=>protonate('C'))}else order().forEach(([n],i)=>B(n,()=>name(i),'Product: '+n))}
 if(v==='face'&&S.k<2){B('Attack from above',()=>face(0));B('Attack from below',()=>face(1));B('Run 20 random attacks',()=>face(null,20))}
 if(v==='sort')SORT.forEach(([s],j)=>{if(!S.placed.includes(j)){B(s+' → C=C',()=>sort(j,0),`${s} attacks C=C`);B(s+' → C=O',()=>sort(j,1),`${s} attacks the C=O carbon`)}});
 A.redraw()}
function down(p){const v=kind(),P=geo(),r=f(26);
 if(v==='hit'&&near(p,chipAt(),f(32))){S.drag={x:null,y:null};return true}
 if(v==='arrow'){const T=TAIL(),t=Object.keys(T).find(k=>near(p,T[k],f(18)));if(t){S.drag={t,x:null,y:null};return true}if(near(p,P.C,r)||near(p,P.O,r))no('Arrows start on electrons: a lone pair or a bond, never on a bare atom.','Start on an electron pair');return false}
 if(v==='finish'){if(S.prot){names().forEach((b,i)=>{if(p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h)name(i)});return false}if(near(p,{x:A.W*.85,y:A.H*.2},f(28))){S.drag={x:null,y:null};return true}return false}
 if(v==='face'){if(p.y<A.H*.42)face(0);else if(p.y>A.H*.62)face(1);return false}
 if(v==='sort'){const j=SORT.findIndex((s,j)=>!S.placed.includes(j)&&(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h)(card(j)));if(j>=0){S.drag={j,x:null,y:null};return true}}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=kind(),P=geo();if(!d)return;S.drag=null;if(d.x==null){A.redraw();return}const at=['C','O','R1','R2','Nu'].find(k=>near(p,P[k],f(30)));
 if(v==='hit'){if(at)attack(at);else A.redraw()}if(v==='arrow'){if(at==='C'||at==='O')arrow(d.t,at);else no('Drop the arrow head on the atom the pair moves to.','Drop on an atom')}
 if(v==='finish'){if(at)protonate(at);else A.redraw()}if(v==='sort'){const z=zones().findIndex(z=>p.x>z.x&&p.x<z.x+z.w&&p.y>z.y&&p.y<z.y+z.h);if(z>=0)sort(d.j,z);else A.redraw()}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*40+30:(j+1)*420))}
const reset=()=>{S.run++;Object.assign(S,{k:0,arrows:[],prot:0,tally:[0,0],placed:[],drag:null,bad:'',msg:'',want:()=>{}})};
const go=(n,ok,t,msg)=>()=>{reset();say(t);ctrl();S.want=fin(n,ok,msg)};
const steps=[
{h:'Where does the nucleophile go?',p:'Drag the nucleophile onto the atom it attacks. Watch the δ+ and δ− labels.',predict:{q:'Why does CN⁻ attack the carbonyl carbon?',opts:['That carbon is electron-rich','O pulls electrons, so C is δ+'],ans:1},task:'Attack 3 carbonyls',
 show:()=>{steps[0].go();chain([0,1,2].map(()=>()=>attack('C')))},go:go(0,()=>S.k>=3,'Drag the nucleophile to an atom.','Nucleophiles attack the δ+ carbonyl carbon.')},
{h:'Draw the arrows',p:'Drag from an electron pair (dotted circle) to the atom it moves to. Two arrows make the alkoxide.',predict:{q:'Where do the C=O π electrons go?',opts:['Onto the carbon','Onto the oxygen'],ans:1},task:'Draw both arrows',
 show:()=>{steps[1].go();chain([()=>arrow('lpC','C'),()=>arrow('pi','O')])},go:go(1,()=>S.arrows.length>=2,'Drag from an electron pair to an atom.','Lone pair to δ+ C; π pair onto O.')},
{h:'Protonate and name',p:'Drag H⁺ to the right atom, then tap the product’s name.',predict:{q:'Propanal (3 carbons) + CN⁻, then H⁺. How many carbons in the product?',opts:['3','4'],ans:1},task:'Make 3 products',
 show:()=>{steps[2].go();chain([0,1,2].flatMap(()=>[()=>protonate('O'),()=>name(order().findIndex(o=>o[1]==='ok'))]))},go:go(2,()=>S.k>=3,'Drag H plus to an atom.','CN⁻ gives a hydroxynitrile with one more carbon; H⁻ gives an alcohol.')},
{h:'Which face?',p:'The C=O group is flat. Tap above or below to attack, or run 20 random attacks.',predict:{q:'Propanal + HCN gives…',opts:['one enantiomer','a 50:50 racemic mixture'],ans:1},task:'Attack 20 propanal and 20 propanone',
 show:()=>{steps[3].go();chain([()=>face(null,20),()=>face(null,20)])},go:go(3,()=>S.k>=2,'Tap above or below the flat C=O.','A flat C=O is attacked equally from both faces.')},
{h:'C=C or C=O?',p:'Sort each attacker by the bond it attacks.',task:'Sort all 6',
 show:()=>{steps[4].go();chain(SORT.map((s,j)=>()=>sort(j,s[1])))},go:go(4,()=>S.placed.length>=6,'Drag each attacker to a box.','Electron-rich C=C takes electrophiles; δ+ C=O carbon takes nucleophiles.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['In ethanal + CN⁻, which atom does CN⁻ attack?',[['the δ+ carbonyl carbon','ok'],['the δ− oxygen','O'],['the CH₃ carbon','R']]],
 ['Where does the first curly arrow start?',[['the lone pair on the carbon of CN⁻','ok'],['the carbonyl carbon','atom'],['the lone pair on the N of CN⁻','N']]],
 ['Butanone + KCN, then dilute acid. How many carbons in the product?',[['5','ok'],['4','count'],['3','lose']]],
 ['Why is the product of propanal + HCN not optically active?',[['equal amounts of both enantiomers form','ok'],['it has no chiral carbon','nochiral'],['only one enantiomer forms','one']]],
 ['Which reagent turns propanone into propan-2-ol?',[['NaBH₄ (hydride ion)','ok'],['KCN','kcn'],['Br₂','br']]]];
function slip(t){let m='Think about where the electrons are and where they go.';
 if(t==='O')m='The O is δ− and electron-rich: a negative nucleophile is repelled.';
 if(t==='R')m='The CH₃ carbon is not polarised. Only the C=O carbon is δ+.';
 if(t==='atom')m='Arrows start on electrons, never on an atom. The first one starts on cyanide’s lone pair.';
 if(t==='N')m='Cyanide attacks through carbon, which is why a new C–C bond forms.';
 if(t==='count')m='Cyanide adds a carbon: butanone (4) becomes a 5-carbon hydroxynitrile.';
 if(t==='lose')m='Addition loses no carbon. The chain grows by one.';
 if(t==='nochiral')m='The product does have a chiral carbon (H, OH, CN, C₂H₅). Both enantiomers form equally.';
 if(t==='one')m='The C=O is flat, so attack from each face is equally likely: you get both.';
 if(t==='kcn')m='KCN adds C≡N, giving a hydroxynitrile, not an alcohol.';
 if(t==='br')m='Br₂ is an electrophile for C=C. It does not reduce C=O.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+slip(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
