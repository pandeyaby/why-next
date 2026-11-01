/* Flagship – isotopes (ages 14–16, AQA GCSE Chemistry 4.1.1): sort nuclide pairs by atomic number, find neutron number N = A − Z,
   sort what isotopes share (electron arrangement, chemistry) from what differs (mass), balance a beam to find relative atomic mass
   from % abundance, then run it backwards to find an abundance. Button twins for every drag. */
(()=>{
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹',SUB='₀₁₂₃₄₅₆₇₈₉',dg=(n,s)=>String(n).replace(/\d/g,d=>s[d]),sy=([a,z,x])=>dg(a,SUP)+dg(z,SUB)+x;
const SORTS=[{bins:['Isotopes of one element','Different elements'],cards:[[[12,6,'C'],[14,6,'C'],0],[[14,6,'C'],[14,7,'N'],1],[[1,1,'H'],[2,1,'H'],0],
  [[40,18,'Ar'],[40,20,'Ca'],1],[[35,17,'Cl'],[37,17,'Cl'],0],[[23,11,'Na'],[24,12,'Mg'],1]]},
 {bins:['Same for ¹²C and ¹⁴C','Different'],cards:[['Number of protons',0],['Mass number',1],['Electron arrangement 2,4',0],['Number of neutrons',1],['Reacts with O₂ to give CO₂',0],['Mass of one atom',1]]}];
const NEU=[[14,6,'C'],[37,17,'Cl'],[238,92,'U']];
const BAL=[{x:'Cl',m:[35,37],a:75,lo:34,hi:38},{x:'B',m:[10,11],a:20,lo:9.5,hi:11.5},{x:'Cu',m:[63,65],a:69,lo:62,hi:66}];
const AB=[{x:'Br',m:[79,81],ar:79.9,a:55,lo:78,hi:82},{x:'Ga',m:[69,71],ar:69.8,a:60,lo:68,hi:72},{x:'Li',m:[6,7],ar:6.9,a:10,lo:5.5,hi:7.5}];
VIS.reg('flagisot',c=>{let A,ui,chal,qn=-1,tok=0,run=0;
const blank=()=>({want:()=>{},won:0,r:0,bad:-1,done:[],pick:-1,grab:null,ans:-1,piv:0,a:50}),S=blank();
const part=()=>['iso','neu','same','bal','abun','quiz'][A.step],fast=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const rd=()=>A.redraw(),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},tk=()=>A.sound.tick();
const goal=()=>({iso:1,neu:3,same:1,bal:3,abun:3}[part()]||9),over=()=>S.won>=goal(),R=()=>Math.min(S.r,2);
const SO=()=>SORTS[part()==='iso'?0:1],lab=cd=>typeof cd[0]==='string'?cd[0]:sy(cd[0])+'  and  '+sy(cd[1]),B0=()=>part()==='bal'?BAL[R()]:AB[R()];
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function L(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function tile(g,r,how){const C=A.col;g.fillStyle=how==='ok'?A.alpha(C.gr,.24):(C.dark?'#172033':'#f8fafc');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.strokeStyle=how==='no'?C.rd:how==='ok'?C.gr:how==='on'?C.vi:C.tx;g.lineWidth=how?4:1.8;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
/* nuclear notation: mass number A top-left, atomic number Z bottom-left */
function nuc(g,[a,z,x],cx,cy,n){g.font=`800 ${fs(n)}px system-ui`;const w=g.measureText(x).width;L(g,x,cx+w*.15,cy,n);g.textAlign='right';
 g.font=`700 ${fs(n*.5)}px system-ui`;g.fillText(a,cx-w*.38,cy-n*.42);g.fillText(z,cx-w*.38,cy+n*.42)}
/* ---- card sorts (steps 1 and 3) ---- */
const left=()=>SO().cards.map((c,j)=>j).filter(j=>!S.done.includes(j));
function binRects(){const n=SO().bins.length,w=(A.W-24-(n-1)*10)/n,h=Math.min(A.H*.16,78);return SO().bins.map((t,k)=>({x:12+k*(w+10),y:A.H-h-10,w,h}))}
function cardRect(k){const pos=left().indexOf(k),w=Math.min(A.W-24,440),h=Math.min(A.H*.1,46);
 if(S.grab&&S.grab.k===k&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};return{x:(A.W-w)/2,y:12+pos*(h+7),w,h}}
function drawSort(g){const so=SO();binRects().forEach((r,k)=>{tile(g,r,S.bad===k?'no':'');L(g,so.bins[k],r.x+r.w/2,r.y+r.h*.35,12);
  L(g,`${S.done.filter(j=>so.cards[j][so.cards[j].length-1]===k).length} cards`,r.x+r.w/2,r.y+r.h*.72,11,A.col.mu,700)});
 left().sort((a,b)=>(S.grab&&S.grab.k===a)-(S.grab&&S.grab.k===b)).forEach(k=>{const r=cardRect(k);tile(g,r,S.pick===k?'on':'');L(g,lab(so.cards[k]),r.x+r.w/2,r.y+r.h/2,15)});
 if(!left().length)L(g,'All sorted ✓',A.W/2,A.H*.35,18,A.col.gr)}
function why(cd,b){if(part()==='iso'){const[p,q]=cd;return p[1]===q[1]?`Both have Z = ${p[1]}, so both are element ${p[2]}: isotopes. Only the neutron number differs.`:
  `Z is ${p[1]} and ${q[1]}: different proton numbers, so different elements${p[0]===q[0]?', even with the same mass number':''}.`}
 return cd[1]?`${cd[0]} differs: ¹⁴C has 8 neutrons, ¹²C has 6.`:`${cd[0]} is the same: both have 6 protons and 6 electrons.`}
function put(k,b){const cd=SO().cards[k],want=cd[cd.length-1];S.pick=-1;if(b!==want){S.bad=b;A.sound.miss();say('Not quite. '+why(cd,b));setTimeout(()=>{S.bad=-1;rd()},fast()?10:900);return rd()}
 S.done.push(k);tk();say('Yes. '+why(cd,b));if(!left().length){S.won=1;A.win();say(part()==='iso'?'All sorted. Same atomic number means same element; isotopes differ only in neutrons.':'All sorted. Same protons and electrons, so the same chemistry; extra neutrons change only the mass.');S.want()}ui();rd()}
function nextCard(){const l=left();if(!l.length)return;S.pick=l[(l.indexOf(S.pick)+1)%l.length];tk();say(`Picked: ${lab(SO().cards[S.pick])}. Which box?`);rd()}
/* ---- neutron number ---- */
const nopts=()=>{const[a,z]=NEU[R()],o=[a-z,a,z,a+z],r=S.r%4;return o.slice(r).concat(o.slice(0,r))};
function optRects(){const w=(A.W-34)/2,h=Math.min(A.H*.12,56);return[0,1,2,3].map(k=>({x:12+(k%2)*(w+10),y:A.H*.62+(k>>1)*(h+10),w,h}))}
function drawNeu(g){const C=A.col,n=NEU[R()],[a,z]=n,x0=A.W*.1,bw=A.W*.8,y=A.H*.38,h=A.H*.1,zw=bw*z/a;nuc(g,n,A.W/2,A.H*.15,46);
 L(g,`A = ${a} particles in the nucleus`,A.W/2,y-h*.7,13,C.tx,700);g.fillStyle=A.alpha(C.rd,.75);g.fillRect(x0,y,zw,h);g.fillStyle=C.dark?'#475569':'#cbd5e1';g.fillRect(x0+zw,y,bw-zw,h);
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x0,y,bw,h);L(g,`Z = ${z}`,x0+zw/2,y+h*1.45,12,C.tx,700);L(g,S.ans>=0?`N = ${a-z}`:'N = ?',x0+zw+(bw-zw)/2,y+h/2,16,C.dark?'#fff':'#0f172a');
 optRects().forEach((r,k)=>{const v=nopts()[k];tile(g,r,S.bad===k?'no':S.ans===k?'ok':'');L(g,String(v),r.x+r.w/2,r.y+r.h/2,20)})}
function pickN(k){if(part()!=='neu'||over()||S.ans>=0)return;const[a,z]=NEU[R()],v=nopts()[k];let m='';
 if(v===a-z){S.ans=k;rd();A.sound.pop();S.won++;say(`Yes: N = A − Z = ${a} − ${z} = ${a-z} neutrons.`+(S.won<3?' Next nuclide…':''));
  return setTimeout(()=>{if(part()!=='neu')return;if(S.won<3){S.r++;S.ans=-1}ui();rd();S.want()},fast()?20:900)}
 if(v===a)m='That is the mass number A, protons plus neutrons. Take Z away.';else if(v===z)m='That is the atomic number Z, the protons. Neutrons are A − Z.';else m='Adding counts the protons twice. Neutrons are A − Z.';
 S.bad=k;A.sound.miss();say(m);setTimeout(()=>{S.bad=-1;rd()},fast()?10:900);rd()}
/* ---- beam balance: Ar is where the beam balances ---- */
const arOf=b=>(b.a*b.m[0]+(100-b.a)*b.m[1])/100,X=v=>{const b=B0();return A.W*.1+(v-b.lo)/(b.hi-b.lo)*A.W*.8};
const T=()=>{const b=B0();return part()==='bal'?arOf(b):b.ar},bal=()=>part()==='bal'?Math.abs(S.piv-T())<.051:S.a===B0().a;
function drawBal(g){const C=A.col,b=B0(),ab=part()==='abun',a=ab?S.a:b.a,piv=ab?b.ar:S.piv,y=A.H*.52,px=X(piv),ok=bal();
 const tq=(a*(b.m[0]-piv)+(100-a)*(b.m[1]-piv))/100,ang=ok?0:Math.sign(tq)*Math.max(.05,Math.min(.22,Math.abs(tq)*.5/(b.hi-b.lo)));
 L(g,ab?`${b.x}: Ar = ${b.ar}. Set the % abundance.`:`${b.x}: ${b.a}% ${dg(b.m[0],SUP)+b.x}, ${100-b.a}% ${dg(b.m[1],SUP)+b.x}`,A.W/2,A.H*.07,15);
 g.save();g.translate(px,y);g.rotate(ang);g.translate(-px,-y);g.fillStyle=C.tx;g.fillRect(A.W*.08,y-4,A.W*.84,8);
 for(let v=Math.ceil(b.lo);v<=b.hi;v++){g.fillRect(X(v)-1,y+4,2,8);L(g,String(v),X(v),y+20,11,C.mu,700)}
 b.m.forEach((m,k)=>{const p=k?100-a:a,h=Math.max(4,p/100*A.H*.3),w=Math.min(A.W*.15,64);g.fillStyle=k?'#2563eb':'#db2777';g.fillRect(X(m)-w/2,y-4-h,w,h);
  L(g,`${dg(m,SUP)}${b.x}`,X(m),y-14-h-fs(18),15);L(g,p+'%',X(m),y-16-h,13)});g.restore();
 g.fillStyle=ok?C.gr:C.vi;g.beginPath();g.moveTo(px,y+6);g.lineTo(px-18,y+40);g.lineTo(px+18,y+40);g.fill();
 L(g,ok?`Balanced ✓  Ar = ${T().toFixed(1)}`:ab?'Tilted: change the abundance':`Pivot at ${S.piv.toFixed(1)}`,A.W/2,y+62,15,ok?C.gr:C.tx);
 if(ab){const x0=A.W*.1,w=A.W*.8,yb=A.H*.86,h=26;g.fillStyle='#db2777';g.fillRect(x0,yb,w*a/100,h);g.fillStyle='#2563eb';g.fillRect(x0+w*a/100,yb,w*(1-a/100),h);
  g.fillStyle=C.tx;g.fillRect(x0+w*a/100-3,yb-8,6,h+16);L(g,'drag the split',A.W/2,yb+h+14,11,C.mu,700)}
 else L(g,'Drag the ▲ pivot along the beam',A.W/2,A.H*.9,12,C.mu,700)}
function setB(v){if(over())return;const b=B0();if(part()==='bal')S.piv=Math.round(Math.max(b.lo,Math.min(b.hi,v))*10)/10;else S.a=Math.max(0,Math.min(100,Math.round(v/5)*5));rd()}
function tryB(){if(over()||!bal())return;const b=B0(),ab=part()==='abun';A.sound.pop();S.won++;
 say(ab?`Balanced: (${b.a} × ${b.m[0]} + ${100-b.a} × ${b.m[1]}) ÷ 100 = ${b.ar}, so ${b.a}% is ${dg(b.m[0],SUP)+b.x}.`:`Balanced: (${b.a} × ${b.m[0]} + ${100-b.a} × ${b.m[1]}) ÷ 100 = ${arOf(b).toFixed(2)}, so Ar = ${arOf(b).toFixed(1)}.`);
 setTimeout(()=>{if(part()!==(ab?'abun':'bal'))return;if(S.won<3){S.r++;fresh()}ui();rd();S.want()},fast()?20:1100)}
function fresh(){S.done=[];S.pick=-1;S.ans=-1;S.grab=null;S.a=50;const b=part()==='bal'&&BAL[R()];if(b)S.piv=(b.lo+b.hi)/2}
function draw(A){const g=A.ctx,m=part();if(m==='iso'||m==='same')drawSort(g);else if(m==='neu')drawNeu(g);else if(m==='bal'||m==='abun')drawBal(g);
 else{nuc(g,[14,6,'C'],A.W/2,A.H*.4,52);L(g,'N = A − Z  ·  Ar = weighted mean',A.W/2,A.H*.58,15)}}
function down(p){const m=part();if(over())return false;
 if(m==='iso'||m==='same'){const b=binRects().findIndex(r=>hit(p,r));if(b>=0&&S.pick>=0){put(S.pick,b);return false}const k=left().find(j=>hit(p,cardRect(j)));if(k!=null){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='neu'){const k=optRects().findIndex(r=>hit(p,r));if(k>=0)pickN(k);return false}
 if(m==='bal'||m==='abun'){S.grab={};move(p);return true}return false}
function move(p){const m=part(),G=S.grab;if(!G)return;const b=B0();
 if(m==='bal')return setB(b.lo+(p.x-A.W*.1)/(A.W*.8)*(b.hi-b.lo));if(m==='abun')return setB((p.x-A.W*.1)/(A.W*.8)*100);
 if(G.x!=null||Math.hypot(p.x-G.x0,p.y-G.y0)>8){G.x=p.x;G.y=p.y;rd()}}
function up(p){const m=part(),G=S.grab;S.grab=null;if(!G)return;if(m==='bal'||m==='abun')return tryB();
 if(G.x==null){S.pick=G.k;tk();say(`Picked: ${lab(SO().cards[G.k])}. Now tap a box.`);return rd()}const b=binRects().findIndex(r=>hit(p,r));if(b>=0)return put(G.k,b);rd()}
const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},fast()?j*40+30:(j+1)*(gap||250)))}
const reset=()=>{tok++;Object.assign(S,blank());if(A)fresh()},begin=(n,t,k,msg)=>{reset();say(t);ui();S.want=when(n,()=>S.won>=k,msg)};
const solveB=()=>{const b=B0();setB(part()==='bal'?arOf(b):b.a);tryB()};
const steps=[
{h:'Same element?',p:'Isotopes are atoms of the same element (same atomic number Z) with different numbers of neutrons. Sort each pair of nuclides.',
 predict:{q:'¹⁴₆C and ¹⁴₇N have the same mass number. Are they isotopes?',opts:['Yes: same mass number','No: different atomic number'],ans:1},task:'Sort all 6 pairs',
 show:()=>{steps[0].go();auto(SORTS[0].cards.map((c,k)=>()=>put(k,c[2])),260)},go:()=>begin(0,'Drag each pair to a box, or tap it then tap a box.',1,'Isotopes share Z; mass number alone tells you nothing about the element.')},
{h:'Count the neutrons',p:'In nuclear notation the mass number A sits on top and the atomic number Z below. Neutron number N = A − Z.',
 predict:{q:'How many neutrons are in ¹⁴₆C?',opts:['14','8','20'],ans:1},task:'Find N for 3 nuclides',
 show:()=>{steps[1].go();auto([0,1,2].map(()=>()=>pickN(nopts().indexOf(NEU[R()][0]-NEU[R()][1]))),1000)},go:()=>begin(1,'Tap the neutron number.',3,'N = A − Z: the mass number counts protons and neutrons together.')},
{h:'Same chemistry?',p:'Isotopes have the same number of protons and electrons, so the same electron arrangement. Sort what is the same and what differs.',
 predict:{q:'Does ¹⁴C burn in oxygen to make CO₂ like ¹²C?',opts:['Yes: same electrons','No: heavier atoms react differently'],ans:0},task:'Sort all 6 cards',
 show:()=>{steps[2].go();auto(SORTS[1].cards.map((c,k)=>()=>put(k,c[1])),260)},go:()=>begin(2,'Same for both isotopes, or different?',1,'Chemical reactions depend on electrons, so isotopes react the same way.')},
{h:'Balance the beam',p:'Relative atomic mass Ar is the weighted mean mass of an element\'s isotopes. Drag the pivot to where the beam balances.',
 predict:{q:'Chlorine is 75% ³⁵Cl and 25% ³⁷Cl. Where does the beam balance?',opts:['At 36, halfway','Nearer 35','Nearer 37'],ans:1},task:'Balance 3 elements',
 show:()=>{steps[3].go();auto([0,1,2].map(()=>solveB),1300)},go:()=>begin(3,'Drag the pivot.',3,'Ar = (% × mass + % × mass) ÷ 100, pulled towards the commoner isotope.')},
{h:'Find the abundance',p:'Now work backwards: the pivot sits at the known Ar. Drag the split until the beam balances.',
 predict:{q:'Bromine has ⁷⁹Br and ⁸¹Br, and Ar = 79.9. Which is more common?',opts:['⁷⁹Br','⁸¹Br','Equal amounts'],ans:0},task:'Balance 3 elements',
 show:()=>{steps[4].go();auto([0,1,2].map(()=>solveB),1300)},go:()=>begin(4,'Drag the split bar.',3,'Ar below the midpoint means the lighter isotope is commoner.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['How many neutrons are in ²³₁₁Na?',[['12','ok'],['23','A'],['11','Z'],['34','sum']]],
 ['Which pair are isotopes?',[['³⁵₁₇Cl and ³⁷₁₇Cl','ok'],['⁴⁰₁₈Ar and ⁴⁰₂₀Ca','sameA'],['¹⁶₈O and ¹⁶₈O²⁻','ion']]],
 ['An element is 90% mass 20 and 10% mass 22. What is Ar?',[['20.2','ok'],['21','mid'],['21.8','swap']]],
 ['Why do ¹²C and ¹⁴C react in the same way?',[['Same electron arrangement','ok'],['Same number of neutrons','neut'],['Same mass','mass']]]];
function because(t){let m='Check Z for the element, N = A − Z, and Ar as a weighted mean.';
 if(t==='A')m='23 is the mass number A. Take away Z: 23 − 11 = 12.';if(t==='Z')m='11 is the atomic number, the protons. N = 23 − 11 = 12.';if(t==='sum')m='Never add A and Z. N = A − Z = 12.';
 if(t==='sameA')m='Same mass number, but Z is 18 and 20: two different elements.';if(t==='ion')m='Those differ in electrons, not neutrons: that is an ion, not an isotope.';
 if(t==='mid')m='21 is a plain mean. Weight it: (90 × 20 + 10 × 22) ÷ 100 = 20.2.';if(t==='swap')m='You weighted the wrong way round. 90% is mass 20, so Ar is near 20: 20.2.';
 if(t==='neut')m='They have 6 and 8 neutrons. It is the 6 electrons, arranged 2,4, that decide reactions.';if(t==='mass')m='Their masses differ (12 and 14). Reactions depend on electrons, which are the same.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);rd()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct.':'✗ '+because(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
let ctl;ui=()=>{if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(m==='quiz'||over())return;
 if(m==='iso'||m==='same'){B('Pick a card ▶',nextCard);SO().bins.forEach((t,b)=>B('Put in: '+t,()=>{if(S.pick<0)nextCard();if(S.pick>=0)put(S.pick,b)}))}
 if(m==='neu')nopts().forEach((v,k)=>B(`N = ${v}`,()=>pickN(k)));
 if(m==='bal'){B('◀ 0.1',()=>{setB(S.piv-.1);tryB()},'Move pivot left 0.1');B('0.1 ▶',()=>{setB(S.piv+.1);tryB()},'Move pivot right 0.1');B('◀◀ 0.5',()=>{setB(S.piv-.5);tryB()},'Move pivot left 0.5');B('0.5 ▶▶',()=>{setB(S.piv+.5);tryB()},'Move pivot right 0.5')}
 if(m==='abun'){const b=B0();B(`− 5% ${dg(b.m[0],SUP)+b.x}`,()=>{setB(S.a-5);tryB()});B(`+ 5% ${dg(b.m[0],SUP)+b.x}`,()=>{setB(S.a+5);tryB()})}};
A=FK.shell(c,{steps,ratio:.7,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ui()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ui()}});
A.start()})})();
