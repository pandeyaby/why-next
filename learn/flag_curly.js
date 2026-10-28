/* Flagship – curly arrows and reaction mechanisms (ages 16–18): drag arrows from electron pairs (bonds, π bonds, lone
   pairs) to where the pair goes. Break H–Br heterolytically, draw both arrows for HBr + ethene, close the carbocation with
   bromide's lone pair, choose the propene route through the more stable carbocation (Markovnikov), then do Br2 + ethene
   with an induced dipole. Wrong arrows say exactly why: tail on an atom, wrong end of a dipole, a carbon with four bonds. */
(()=>{const mn=Math.min,mx=Math.max;
 // scene: atoms {id:[label,x,y]}, bonds [a,b,order], sources {id:[name,x,y]} (arrow tails), arrows needed [[src,atom]]
 const SC={
  split:{at:{H:['H',.32,.55],Br:['Br',.68,.55]},bd:[['H','Br',1]],src:{hb:['H–Br bond',.5,.55]},need:[['hb','Br']],dl:{H:'δ+',Br:'δ−'},end:'→ H⁺ + Br⁻ : heterolytic fission. Br keeps both electrons.'},
  add:{at:{C1:['H₂C',.12,.55],C2:['CH₂',.35,.55],H:['H',.62,.55],Br:['Br',.86,.55]},bd:[['C1','C2',2],['H','Br',1]],src:{pi:['π bond',.235,.55],hb:['H–Br bond',.74,.55]},need:[['pi','H'],['hb','Br']],dl:{H:'δ+',Br:'δ−'},end:'→ CH₃–CH₂⁺ (carbocation) + Br⁻'},
  cat:{at:{C1:['H₃C',.15,.62],C2:['CH₂',.4,.62],Br:['Br',.78,.36]},bd:[['C1','C2',1]],src:{lp:['lone pair',.71,.45],cc:['C–C bond',.275,.62]},need:[['lp','C2']],ch:{C2:'+',Br:'−'},end:'→ CH₃CH₂Br, bromoethane'},
  br2:{at:{C1:['H₂C',.12,.55],C2:['CH₂',.35,.55],B1:['Br',.62,.55],B2:['Br',.86,.55]},bd:[['C1','C2',2],['B1','B2',1]],src:{pi:['π bond',.235,.55],bb:['Br–Br bond',.74,.55]},need:[['pi','B1'],['bb','B2']],dl:{B1:'δ+',B2:'δ−'},end:'→ CH₂Br–CH₂⁺ + Br⁻'},
  br2b:{at:{C1:['BrH₂C',.17,.62],C2:['CH₂',.42,.62],Br:['Br',.78,.36]},bd:[['C1','C2',1]],src:{lp:['lone pair',.71,.45],cc:['C–C bond',.295,.62]},need:[['lp','C2']],ch:{C2:'+',Br:'−'},end:'→ CH₂BrCH₂Br, 1,2-dibromoethane'}};
 const WHY={'hb>H':'Br is more electronegative (δ−), so it keeps the bonding pair. An arrow to H would make H⁻ and Br⁺.',
  'pi>Br':'The π electrons are electron-rich. They are drawn to the δ+ H, not the δ− Br.',
  'pi>B2':'The π bond repels the electrons in Br₂, so the NEAR Br becomes δ+. Aim at the near Br.',
  'bb>B1':'The Br–Br pair moves away from the π bond, to the far Br, which leaves as Br⁻.',
  'lp>C1':'That carbon already has four bonds. The C⁺ has only three, and an empty spot for the pair.',
  'lp>Br':'An arrow ends where the pair goes. Bromide\u2019s pair goes to C⁺ to make a new C–Br bond.',
  'cc':'Breaking C–C would split the molecule. The new bond\u2019s pair comes from bromide\u2019s lone pair.',
  'pi>C':'The π pair moves to a new atom: the δ+ atom it will bond to, not back onto its own carbon.',
  atom:'Arrows start at electrons: a bond or a lone pair. An atom such as H or C⁺ has no spare pair to give.',
  other:'An arrow ends where the pair goes: the atom that takes it, or the atom it bonds to.'};
 const PROP=[['H₂C',.15],['CH',.42],['CH₃',.69]];
VIS.reg('flagcurly',c=>{let A,pad,chal,read;
 const K={sc:'split',drawn:[],from:'',pull:null,pp:-1,gen:0,want:()=>{}};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const now=()=>['mech','mech','mech','prop','mech','quiz'][A.step];
 const z=v=>A.narrow?v:v+3,P=(fx,fy)=>({x:fx*A.W,y:fy*A.H});
 const ink=(x,t,X,Y,s,k,w)=>{x.font=`${w||700} ${z(s)}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)};
 const S=()=>SC[K.sc],done=()=>S().need.every(n=>K.drawn.some(d=>d[0]===n[0]&&d[1]===n[1]));
 const ap=id=>{const a=S().at[id];return P(a[1],a[2])},sp=id=>{const s=S().src[id];return P(s[1],s[2])};
 function arrow(x,a,b,k){const mxp=(a.x+b.x)/2,myp=(a.y+b.y)/2,dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,bend=mn(70,L*.45);
  let nx=dy/L,ny=-dx/L;if(ny>0){nx=-nx;ny=-ny}const q={x:mxp+nx*bend,y:myp+ny*bend},qd=Math.hypot(b.x-q.x,b.y-q.y)||1,e={x:b.x-(b.x-q.x)/qd*16,y:b.y-(b.y-q.y)/qd*16};
  x.strokeStyle=k;x.fillStyle=k;x.lineWidth=3;x.beginPath();x.moveTo(a.x,a.y);x.quadraticCurveTo(q.x,q.y,e.x,e.y);x.stroke();
  const ang=Math.atan2(e.y-q.y,e.x-q.x),h=12;x.beginPath();x.moveTo(e.x+Math.cos(ang)*4,e.y+Math.sin(ang)*4);x.lineTo(e.x-Math.cos(ang-.45)*h,e.y-Math.sin(ang-.45)*h);x.lineTo(e.x-Math.cos(ang+.45)*h,e.y-Math.sin(ang+.45)*h);x.closePath();x.fill()}
 function mol(x){const C=A.col,s=S();
  s.bd.forEach(([a,b,o])=>{const p=ap(a),q=ap(b),gap=A.W*.05;x.strokeStyle=C.tx;x.lineWidth=2.5;for(let i=0;i<o;i++){const off=o>1?(i?7:-7):0;x.beginPath();x.moveTo(p.x+gap,p.y+off);x.lineTo(q.x-gap,q.y+off);x.stroke()}});
  Object.entries(s.at).forEach(([id,[l]])=>{const p=ap(id);ink(x,l,p.x,p.y,18,C.tx,800);
   if(s.dl&&s.dl[id])ink(x,s.dl[id],p.x,p.y-A.H*.1,13,C.tx,700);
   if(s.ch&&s.ch[id]){const cx=p.x+A.W*.06,cy=p.y-A.H*.07;x.strokeStyle=C.tx;x.lineWidth=2;x.beginPath();x.arc(cx,cy,10,0,7);x.stroke();ink(x,s.ch[id],cx,cy,13,C.tx,900)}});
  if(s.src.lp){const p=sp('lp');x.fillStyle=C.tx;[-6,6].forEach(d=>{x.beginPath();x.arc(p.x+d,p.y+d*.3,3,0,7);x.fill()})}
  Object.entries(s.src).forEach(([id,[n]])=>{const p=sp(id),on=K.from===id;x.strokeStyle=on?C.am:A.alpha(C.cy,.9);x.lineWidth=on?4:2;x.setLineDash([4,3]);x.beginPath();x.arc(p.x,p.y,mx(16,A.W*.035),0,7);x.stroke();x.setLineDash([]);
   ink(x,n,p.x,p.y+A.H*.12,10,C.tx,600)});
  K.drawn.forEach(([a,b])=>arrow(x,sp(a),ap(b),C.pk));if(K.pull)arrow(x,sp(K.pull.s),K.pull,A.alpha(C.pk,.6));
  if(done())ink(x,s.end,A.W/2,A.H*.9,13,C.tx,800);else ink(x,`Arrows: ${K.drawn.length} of ${s.need.length}`,A.W/2,A.H*.9,12,C.tx,600)}
 function tryArrow(s,t){K.pull=null;K.from='';if(done())return;const n=S().need;
  if(n.some(q=>q[0]===s&&q[1]===t)){if(!K.drawn.some(d=>d[0]===s&&d[1]===t))K.drawn.push([s,t]);A.sound.pop();
   if(done()){if(K.sc==='br2'){const g=K.gen;tell('Both arrows right. Here is the carbocation; now finish it.');return setTimeout(()=>{if(g===K.gen){K.sc='br2b';K.drawn=[];tell()}},700)}
    return tell('Mechanism step complete: '+S().end)}return tell('Good arrow. One more to go.')}
  A.sound.miss();const key=s==='cc'?'cc':WHY[s+'>'+t]?s+'>'+t:s==='pi'&&/^C/.test(t)?'pi>C':'other';tell('✗ '+WHY[key])}
 // ---- propene: which carbon gets the H? ----
 function propV(x){const C=A.col,Y=A.H*.3;PROP.forEach(([l,f],i)=>{ink(x,l,f*A.W,Y,18,C.tx,800);if(i<2){const ring=K.pp===i;x.strokeStyle=ring?C.am:A.alpha(C.cy,.9);x.lineWidth=ring?4:2;x.setLineDash([4,3]);x.beginPath();x.arc(f*A.W,Y,mx(22,A.W*.05),0,7);x.stroke();x.setLineDash([])}});
  x.strokeStyle=C.tx;x.lineWidth=2.5;[-6,6].forEach(o=>{x.beginPath();x.moveTo(A.W*.21,Y+o);x.lineTo(A.W*.36,Y+o);x.stroke()});x.beginPath();x.moveTo(A.W*.48,Y);x.lineTo(A.W*.62,Y);x.stroke();
  ink(x,'Tap the carbon that the H⁺ joins',A.W/2,A.H*.1,13,C.tx,700);if(K.pp<0)return;
  const sec=K.pp===0,lab=sec?'H₃C–CH⁺–CH₃ : secondary':'⁺H₂C–CH₂–CH₃ : primary';ink(x,lab,A.W/2,A.H*.5,14,C.tx,800);
  const bx=A.W*.15,bw=A.W*.7,by=A.H*.6;x.strokeStyle=C.tx;x.lineWidth=2;x.strokeRect(bx,by,bw,16);x.fillStyle=sec?C.gr:C.rd;x.fillRect(bx,by,bw*(sec?2:1)/3,16);
  ink(x,`Alkyl groups pushing electrons onto C⁺: ${sec?2:1}`,A.W/2,by+A.H*.08,11,C.tx,600);ink(x,sec?'Major product: 2-bromopropane':'Minor product: 1-bromopropane',A.W/2,A.H*.86,14,C.tx,900)}
 function pickC(i){K.pp=i;A.sound[i===0?'pop':'miss']();tell(i===0?'H⁺ joins the CH₂ end, so the positive charge sits on the middle carbon: a secondary carbocation, more stable, so 2-bromopropane is the major product.':'✗ H⁺ on the middle carbon leaves a primary carbocation, held up by only one alkyl group. It is less stable, so 1-bromopropane is only the minor product.')}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=now();x.fillStyle=A.mix(C.pn,'#f5f3ff',C.dark?.05:.45);x.fillRect(0,0,W,H);
  if(v==='mech')mol(x);else if(v==='prop')propV(x);else ink(x,K.Q||'↷',W/2,H/2,60,C.tx,400);A.fx.draw(x)}
 function tell(msg){const v=now();let t;
  if(v==='mech'){const s=S();t=done()?s.end:`Draw ${s.need.length-K.drawn.length} more arrow${s.need.length-K.drawn.length>1?'s':''}. Electron pairs: ${Object.values(s.src).map(q=>q[0]).join(', ')}. Atoms: ${Object.values(s.at).map(q=>q[0]).join(', ')}.`+(K.from?` From: ${s.src[K.from][0]}.`:'')}
  else if(v==='prop')t=K.pp<0?'Propene, H₂C=CH–CH₃. Which carbon does H⁺ join?':'';else t='Challenge time.';
  say((msg?msg+' ':'')+t);refresh();K.want()}
 function refresh(){if(!A||!pad)return;pad.innerHTML='';const v=now();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
  if(v==='mech'&&!done()){const s=S();if(!K.from)Object.entries(s.src).forEach(([id,[n]])=>B('From: '+n,()=>{K.from=id;A.sound.tick();tell()},`Start an arrow at the ${n}`));
   else{Object.entries(s.at).forEach(([id,[l]])=>B('↷ to '+l,()=>tryArrow(K.from,id),`Arrow head on ${l}`));B('✕ Cancel',()=>{K.from='';tell()})}}
  if(v==='prop')[['H⁺ joins H₂C (end)',0],['H⁺ joins CH (middle)',1]].forEach(([n,i])=>B(n,()=>pickC(i)));A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const later=(fs,gap)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},j*gap))};
 const load=sc=>{K.gen++;K.want=()=>{};K.sc=sc;K.drawn=[];K.from='';K.pull=null;K.pp=-1};
 const steps=[
  {h:'What an arrow means',p:'A curly arrow shows a PAIR of electrons moving. The tail sits on the pair: a bond or a lone pair. The head shows where the pair goes. Break H–Br so that Br takes both electrons.',
   predict:{q:'Where does a curly arrow\u2019s tail start?',opts:['On the atom that moves','On a pair of electrons'],ans:1},task:'Draw the arrow that breaks H–Br',
   show:()=>{steps[0].go();later([()=>tryArrow('hb','Br')],300)},go:()=>{load('split');tell();K.want=ok(0,done,()=>'The arrow starts on the bond and ends on Br: heterolytic fission.')}},
  {h:'HBr meets ethene',p:'The C=C π bond is rich in electrons. HBr is polar: H is δ+. Draw both arrows of the first step.',
   predict:{q:'Which atom of HBr accepts the pair from the π bond?',opts:['Br, the δ− end','H, the δ+ end'],ans:1},task:'Draw both arrows: π bond to H, and H–Br to Br',
   show:()=>{steps[1].go();later([()=>tryArrow('pi','H'),()=>tryArrow('hb','Br')],500)},go:()=>{load('add');tell();K.want=ok(1,done,()=>'HBr is the electrophile: it accepts the π pair through its δ+ H.')}},
  {h:'Close the carbocation',p:'Now there is a carbocation, CH₃CH₂⁺, and a bromide ion with lone pairs. Draw the arrow that makes the C–Br bond.',task:'Draw the arrow from bromide to the carbocation',
   show:()=>{steps[2].go();later([()=>tryArrow('lp','C2')],300)},go:()=>{load('cat');tell();K.want=ok(2,done,()=>'Br⁻ is the nucleophile: its lone pair forms the new bond to C⁺.')}},
  {h:'Which carbocation?',p:'Propene is not symmetrical. H⁺ can join either end of the C=C. The more stable carbocation forms faster and gives the major product.',
   predict:{q:'Propene + HBr: what is the major product?',opts:['1-bromopropane','2-bromopropane'],ans:1},task:'Find the route to the major product',
   show:()=>{steps[3].go();later([()=>pickC(0)],300)},go:()=>{load('add');K.pp=-1;tell();K.want=ok(3,()=>K.pp===0,()=>'Tertiary > secondary > primary: alkyl groups push electrons onto C⁺ and stabilise it.')}},
  {h:'Your turn: bromine',p:'Br₂ is non-polar. As it nears the π bond, its electrons are pushed away, so the near Br becomes δ+. Draw the whole mechanism.',
   predict:{q:'Br₂ has no permanent dipole. Can it still be an electrophile?',opts:['No, it is non-polar','Yes, the π bond induces a dipole'],ans:1},task:'Draw all three arrows to make 1,2-dibromoethane',
   show:()=>{steps[4].go();later([()=>tryArrow('pi','B1'),()=>tryArrow('bb','B2'),()=>{},()=>tryArrow('lp','C2')],520)},go:()=>{load('br2');tell();K.want=ok(4,()=>K.sc==='br2b'&&done(),()=>'Same pattern: π pair to the δ+ end, bond pair to the δ− end, then lone pair to C⁺.')}},
  {h:'Challenge',p:'',go:()=>{load('add');quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['What does a curly arrow show?','↷',[['A pair of electrons moving','ok'],['An atom moving','atom'],['One electron moving','one']]],
  ['Where must the tail of a curly arrow start?','✏️',[['On a bond or a lone pair','ok'],['On a positive atom','plus'],['On any atom','any']]],
  ['In HBr + ethene, what is the electrophile?','⚡',[['HBr, through its δ+ H','ok'],['The bromide ion','brm'],['Ethene','eth']]],
  ['Which carbocation is the most stable?','🏗️',[['Tertiary','ok'],['Secondary','sec'],['Primary','prim']]],
  ['Propene + HBr gives mainly…','🧪',[['2-bromopropane','ok'],['1-bromopropane','minor'],['Propane','h2']]],
  ['In the second step, the bromide ion acts as…','🎯',[['A nucleophile','ok'],['An electrophile','elec'],['A catalyst','cat']]]];
 let qn=-1,row=0;
 function quiz(){qn++;const[q,pic,ops]=QZ[qn%QZ.length],r=qn%3;K.Q=pic;
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>grade(tag)});say('Challenge: '+q);A.redraw()}
 function grade(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Correct.';break;
   case 'atom':m='Atoms follow the electrons, but the arrow tracks the electron pair, not the atom.';break;
   case 'one':m='A single electron uses a half-headed (fish-hook) arrow, as in radical substitution.';break;
   case 'plus':m='A positive atom has no spare pair to give. The tail goes on the electrons.';break;
   case 'any':m='Only electrons can move in an arrow. Start on a bond or a lone pair.';break;
   case 'brm':m='Br⁻ donates a lone pair to C⁺ in step two, so it is a nucleophile.';break;
   case 'eth':m='Ethene\u2019s π bond donates the pair. The species that accepts it, HBr, is the electrophile.';break;
   case 'sec':m='Secondary beats primary, but three alkyl groups stabilise C⁺ more than two.';break;
   case 'prim':m='A primary carbocation has only one alkyl group to push electrons in. It is the least stable.';break;
   case 'minor':m='1-bromopropane forms through the less stable primary carbocation, so it is the minor product.';break;
   case 'h2':m='Adding HBr adds H and Br across the C=C, not H₂.';break;
   case 'elec':m='Br⁻ gives a lone pair, so it is a nucleophile, not an electron-pair acceptor.';break;
   default:m='Bromide ends up in the product, so it is used up, not a catalyst.'}
  const good=tag==='ok';if(good){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` In a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 const grab=26;
 function nearest(p,obj,f){let best='',d=1e9;Object.keys(obj).forEach(id=>{const q=f(id),e=Math.hypot(p.x-q.x,p.y-q.y);if(e<d){d=e;best=id}});return d<mx(grab,A.W*.07)?best:''}
 function down(p){const v=now();
  if(v==='prop'){PROP.slice(0,2).forEach(([l,f],i)=>{if(Math.hypot(p.x-f*A.W,p.y-A.H*.3)<mx(26,A.W*.06))pickC(i)});return false}
  if(v!=='mech'||done())return false;const s=nearest(p,S().src,sp);if(s){K.pull={s,x:p.x,y:p.y};return true}
  const a=nearest(p,S().at,ap);if(a){if(K.from)tryArrow(K.from,a);else{A.sound.miss();tell('✗ '+WHY.atom)}}return false}
 function move(p){if(K.pull){K.pull.x=p.x;K.pull.y=p.y;A.redraw()}}
 function up(p){const d=K.pull;if(!d)return;const a=nearest(p,S().at,ap);if(a)tryArrow(d.s,a);else{K.pull=null;if(Math.hypot(p.x-sp(d.s).x,p.y-sp(d.s).y)<20){K.from=d.s;tell('Arrow tail set. Now tap the atom where the pair goes.')}else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;refresh()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move,up});refresh()}});
 A.start()})})();
