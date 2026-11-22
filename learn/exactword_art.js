/* Data and drawings for flagexactword (words for things I see, ages 3–4; Development Matters 2021 Communication and
   Language 3–4 "use a wider range of vocabulary"; Reception "learn new vocabulary" and "use new vocabulary through the
   day"; ELG Speaking). Slips it targets: overextension (every four-legged animal is "dog", Clark 1973), underextension
   (a small dog is "not a dog"), refusing a second name for one thing (mutual exclusivity, Markman 1989: "it's a robin,
   not a bird"), mixing near words (sock and shoe), and naming one member when the group word is wanted. */
const EXW=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
/* text, cards and floor shared by every scene */
function kit(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function words(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){rows.push(line);line=w}else line=t}rows.push(line);
  const lh=px(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||K.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(16,b.h/3));g.fill();
  g.lineWidth=state?4:2;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
 function ground(t){A.ctx.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);A.ctx.fillRect(0,0,A.W,A.H)}
 function tally(t,n,of){words(`${t}: ${n} of ${of}`,A.W/2,A.H*.955,13,{c:A.col.tx,b:700})}
 return{px,words,card,ground,tally}}
/* ---------- the things to name ---------- */
/* 1. clothes: the word card asks for one; clue = what tells it apart from the near word */
const CLO=[{k:'hat',clue:'A hat goes on your head.'},{k:'sock',clue:'A sock is soft. It goes on your foot first.'},
 {k:'shoe',clue:'A shoe goes on over your sock, for walking outside.'},{k:'coat',clue:'A coat goes on over your top, to keep you warm.'}];
const ORDER=['sock','hat','shoe','coat'];
/* 2. is it a dog? y = yes; say = the sound that names it */
const DOGS=[{k:'dog',t:'dog',y:true,say:'woof'},{k:'cat',t:'cat',y:false,say:'miaow'},{k:'cow',t:'cow',y:false,say:'moo'},
 {k:'pup',t:'small dog',y:true,say:'yip'},{k:'sheep',t:'sheep',y:false,say:'baa'},{k:'horse',t:'horse',y:false,say:'neigh'}];
/* 3. the group word for three things; why = what all three have in common */
const SETS=[{w:'food',ks:['apple','banana','bread'],why:'We eat them.'},{w:'toys',ks:['ball','teddy','blocks'],why:'We play with them.'},
 {w:'animals',ks:['cat','cow','duck'],why:'They are alive, they move and they eat.'},{w:'clothes',ks:['sock','hat','coat'],why:'We wear them.'}];
const GROUPS=['food','toys','animals','clothes'];
/* 4. a grown-up offers a more exact word */
const EXACT=[{say:'Look! A robin.',want:'robin',ks:['duck','robin','owl'],kind:'bird',clue:'A robin is a small bird with a red front.'},
 {say:'That is a daisy.',want:'daisy',ks:['tulip','sunflower','daisy'],kind:'flower',clue:'A daisy is a small flower: white petals, yellow middle.'},
 {say:'See the digger?',want:'digger',ks:['digger','bus','fire'],kind:'machine',clue:'A digger has a long arm and a bucket for digging.'}];
/* 5. find it in the park: where each thing is, as fractions of the scene */
const PARK={robin:[.2,.2],duck:[.72,.5],digger:[.26,.74],bus:[.75,.82],ball:[.5,.56],dog:[.18,.47],owl:[.48,.16]};
const FIND=['robin','digger','duck','ball','dog'];
const NAME={pup:'small dog',fire:'fire engine'};
const DESC=['A word card and four clothes. Drag the word onto the picture it names, or tap the picture.',
 'An animal card and two boxes: Dog and Not a dog. Drag the card, or tap a box.',
 'Three pictures and four group words. Drag the word that fits all three onto them, or tap it.',
 'A grown-up says a more exact word. Drag it onto the picture it names, or tap the picture.',
 'A park picture. A word says what to find. Tap that thing in the park.','Challenge.'];
const DONE=['You named the clothes. Sock and shoe are near words, but each has its own name.',
 'Lots of animals have four legs. Only a dog is a dog, and a small dog is a dog too.',
 'A group word covers all of them: food, toys, animals, clothes.',
 'A robin is a bird too. One thing can have a group word and a more exact word.',
 'The exact word helped you find the right one.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'It has four legs and says miaow. What is it?',a:'A cat',o:[['A dog','over'],['A cow','over']]},
 {q:'Gran says, "Look, a robin!" Is a robin a bird?',a:'Yes, a robin is a bird',o:[['No, it is a robin','only'],['No, birds are big','only']]},
 {q:'Apple, banana, bread. Which word goes with all three?',a:'Food',o:[['Apple','one'],['Toys','group']]},
 {q:'It is soft and goes on your foot first. What is it?',a:'A sock',o:[['A shoe','near'],['A hat','near']]},
 {q:'This dog is very small. Is it a dog?',a:'Yes, a small dog is a dog',o:[['No, dogs are big','under'],['No, it is too small','under']]},
 {q:'Two birds are in the park. Which word helps Dad find the right one?',a:'Robin',o:[['Bird','vague'],['Thing','vague']]}];
/* ---------- pictures, flat shapes ---------- */
const P={};
function pic(g,k,x,y,s){g.save();g.translate(x,y);g.lineWidth=Math.max(1.5,s*.03);g.strokeStyle='#1f2937';g.lineJoin='round';(P[k]||P.ball)(g,s);g.restore()}
const fs=(g,c)=>{g.fillStyle=c;g.fill();g.stroke()},circ=(g,x,y,r,c)=>{g.beginPath();g.arc(x,y,r,0,7);fs(g,c)},
 ell=(g,x,y,a,b,c)=>{g.beginPath();g.ellipse(x,y,a,b,0,0,7);fs(g,c)},rect=(g,x,y,w,h,c)=>{g.beginPath();g.rect(x,y,w,h);fs(g,c)},
 poly=(g,pts,s,c)=>{g.beginPath();pts.forEach(([a,b],i)=>i?g.lineTo(a*s,b*s):g.moveTo(a*s,b*s));g.closePath();fs(g,c)},dot=(g,x,y,r)=>{g.beginPath();g.arc(x,y,r,0,7);g.fillStyle='#1f2937';g.fill()};
P.sock=(g,s)=>{poly(g,[[-.14,-.4],[.12,-.4],[.12,.12],[.34,.22],[.3,.4],[-.06,.4],[-.14,.28]],s,'#3b82f6');rect(g,-.14*s,-.4*s,.26*s,.1*s,'#ffffff')};
P.hat=(g,s)=>{g.beginPath();g.arc(0,.12*s,.34*s,Math.PI,0);g.closePath();fs(g,'#dc2626');rect(g,-.38*s,.08*s,.76*s,.14*s,'#fde68a');circ(g,0,-.26*s,.08*s,'#fde68a')};
P.coat=(g,s)=>{poly(g,[[-.2,-.34],[.2,-.34],[.42,.06],[.32,.12],[.22,-.06],[.22,.4],[-.22,.4],[-.22,-.06],[-.32,.12],[-.42,.06]],s,'#16a34a');
 [-.1,.06,.22].forEach(v=>circ(g,0,v*s,.03*s,'#fde68a'))};
P.shoe=(g,s)=>{poly(g,[[-.36,-.12],[-.1,-.12],[0,0],[.34,.08],[.38,.22],[-.36,.22]],s,'#92400e');rect(g,-.38*s,.2*s,.78*s,.07*s,'#1f2937')};
/* four-legged animals share a body; head, ears, coat and tail tell them apart */
function quad(g,s,o){const c=o.c;g.lineWidth=Math.max(1.5,s*.025);[-.2,-.08,.1,.22].forEach(x=>rect(g,x*s,.08*s,.06*s,.26*s,o.leg||c));
 if(o.tail)o.tail(g,s);ell(g,0,.04*s,.3*s,.15*s,c);if(o.coat)o.coat(g,s);const hx=.3*s,hy=(o.hy||-.14)*s;
 if(o.neck)poly(g,[[.18,-.04],[.26,hy/s-.02],[.36,hy/s+.04],[.28,.06]],s,c);ell(g,hx,hy,(o.hw||.13)*s,(o.hh||.12)*s,o.face||c);if(o.ears)o.ears(g,s,hx,hy);
 dot(g,hx+.05*s,hy-.02*s,.025*s);if(o.snout)o.snout(g,s,hx,hy)}
P.dog=(g,s)=>quad(g,s,{c:'#b45309',ears:(g,s,x,y)=>{ell(g,x-.08*s,y+.04*s,.04*s,.09*s,'#78350f')},tail:(g,s)=>poly(g,[[-.28,-.02],[-.42,-.22],[-.36,-.24],[-.24,-.06]],s,'#b45309'),snout:(g,s,x,y)=>dot(g,x+.12*s,y+.02*s,.03*s)});
P.pup=(g,s)=>{g.scale(.72,.72);g.translate(0,.12*s);quad(g,s,{c:'#f8fafc',coat:(g,s)=>ell(g,.02*s,0,.1*s,.08*s,'#b45309'),ears:(g,s,x,y)=>ell(g,x-.08*s,y+.04*s,.04*s,.09*s,'#b45309'),
 tail:(g,s)=>poly(g,[[-.28,-.02],[-.4,-.18],[-.34,-.2],[-.24,-.06]],s,'#f8fafc'),snout:(g,s,x,y)=>dot(g,x+.12*s,y+.02*s,.03*s)})};
P.cat=(g,s)=>quad(g,s,{c:'#94a3b8',hh:.11,ears:(g,s,x,y)=>{poly(g,[[x/s-.1,y/s-.06],[x/s-.07,y/s-.2],[x/s-.01,y/s-.1]],s,'#94a3b8');poly(g,[[x/s+.02,y/s-.1],[x/s+.08,y/s-.2],[x/s+.11,y/s-.06]],s,'#94a3b8')},
 tail:(g,s)=>{g.beginPath();g.moveTo(-.28*s,0);g.quadraticCurveTo(-.5*s,-.1*s,-.4*s,-.36*s);g.lineWidth=s*.05;g.strokeStyle='#64748b';g.stroke();g.lineWidth=Math.max(1.5,s*.025);g.strokeStyle='#1f2937'},
 snout:(g,s,x,y)=>{g.beginPath();g.moveTo(x+.06*s,y+.05*s);g.lineTo(x+.22*s,y+.02*s);g.moveTo(x+.06*s,y+.07*s);g.lineTo(x+.22*s,y+.09*s);g.stroke()}});
P.cow=(g,s)=>quad(g,s,{c:'#f8fafc',hw:.12,hh:.13,coat:(g,s)=>{ell(g,-.1*s,0,.08*s,.06*s,'#1f2937');ell(g,.12*s,.07*s,.06*s,.05*s,'#1f2937')},
 ears:(g,s,x,y)=>{poly(g,[[x/s-.08,y/s-.1],[x/s-.12,y/s-.22],[x/s-.03,y/s-.12]],s,'#fde68a');poly(g,[[x/s+.03,y/s-.12],[x/s+.08,y/s-.22],[x/s+.08,y/s-.1]],s,'#fde68a')},
 snout:(g,s,x,y)=>ell(g,x+.05*s,y+.08*s,.08*s,.05*s,'#fbcfe8')});
P.sheep=(g,s)=>quad(g,s,{c:'#f1f5f9',leg:'#1f2937',face:'#1f2937',hh:.1,coat:(g,s)=>[-.2,-.06,.08,.2,-.13,.02,.15].forEach((x,i)=>circ(g,x*s,(i<4?-.08:.08)*s,.09*s,'#f8fafc')),
 ears:(g,s,x,y)=>ell(g,x-.1*s,y,.06*s,.03*s,'#1f2937')});
P.horse=(g,s)=>quad(g,s,{c:'#9a3412',hy:-.3,hw:.14,hh:.08,neck:1,ears:(g,s,x,y)=>poly(g,[[x/s-.06,y/s-.06],[x/s-.04,y/s-.16],[x/s,y/s-.07]],s,'#9a3412'),
 tail:(g,s)=>poly(g,[[-.28,-.04],[-.44,.2],[-.36,.24],[-.26,.04]],s,'#451a03'),coat:(g,s)=>poly(g,[[.17,-.06],[.22,-.32],[.27,-.32],[.24,-.06]],s,'#451a03')});
P.apple=(g,s)=>{circ(g,0,.06*s,.3*s,'#dc2626');rect(g,-.02*s,-.34*s,.04*s,.12*s,'#78350f');ell(g,.1*s,-.28*s,.09*s,.04*s,'#16a34a')};
P.banana=(g,s)=>{g.beginPath();g.arc(0,-.2*s,.46*s,.5,2.64);g.arc(0,-.36*s,.46*s,2.5,.64,true);g.closePath();fs(g,'#facc15')};
P.bread=(g,s)=>{g.beginPath();g.moveTo(-.36*s,.3*s);g.lineTo(-.36*s,-.06*s);g.arc(0,-.06*s,.36*s,Math.PI,0);g.lineTo(.36*s,.3*s);g.closePath();fs(g,'#d97706');
 [-.14,0,.14].forEach(x=>{g.beginPath();g.moveTo(x*s-.05*s,-.22*s);g.lineTo(x*s+.05*s,-.08*s);g.stroke()})};
P.ball=(g,s)=>{circ(g,0,0,.32*s,'#f97316');g.beginPath();g.moveTo(-.32*s,0);g.lineTo(.32*s,0);g.moveTo(0,-.32*s);g.lineTo(0,.32*s);g.stroke()};
P.teddy=(g,s)=>{circ(g,-.18*s,-.28*s,.09*s,'#a16207');circ(g,.18*s,-.28*s,.09*s,'#a16207');circ(g,0,.18*s,.2*s,'#a16207');circ(g,0,-.14*s,.2*s,'#a16207');
 ell(g,0,-.07*s,.08*s,.06*s,'#fde68a');dot(g,-.07*s,-.18*s,.025*s);dot(g,.07*s,-.18*s,.025*s);dot(g,0,-.09*s,.025*s)};
P.blocks=(g,s)=>{[['A',-.36,.04,'#3b82f6'],['B',0,.04,'#facc15'],['C',-.18,-.32,'#ef4444']].forEach(([t,x,y,c])=>{rect(g,x*s,y*s,.34*s,.34*s,c);
 g.fillStyle='#1f2937';g.font=`900 ${Math.round(s*.22)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,(x+.17)*s,(y+.17)*s)})};
P.duck=(g,s)=>{ell(g,-.02*s,.12*s,.3*s,.16*s,'#f8fafc');circ(g,.2*s,-.14*s,.12*s,'#166534');poly(g,[[.3,-.16],[.44,-.12],[.3,-.08]],s,'#f97316');dot(g,.22*s,-.17*s,.022*s);
 poly(g,[[-.18,.04],[.08,.04],[-.04,.18]],s,'#94a3b8')};
P.robin=(g,s)=>{g.scale(.8,.8);ell(g,0,.04*s,.24*s,.2*s,'#92400e');ell(g,.08*s,.08*s,.13*s,.14*s,'#f97316');circ(g,.16*s,-.18*s,.11*s,'#92400e');
 ell(g,.2*s,-.12*s,.06*s,.06*s,'#f97316');poly(g,[[.26,-.2],[.36,-.17],[.26,-.14]],s,'#1f2937');dot(g,.18*s,-.21*s,.02*s);poly(g,[[-.2,0],[-.4,-.1],[-.38,.06]],s,'#78350f');
 [-.02,.08].forEach(x=>{g.beginPath();g.moveTo(x*s,.22*s);g.lineTo(x*s,.36*s);g.stroke()})};
P.owl=(g,s)=>{ell(g,0,.04*s,.26*s,.34*s,'#a16207');poly(g,[[-.2,-.24],[-.16,-.4],[-.06,-.26]],s,'#a16207');poly(g,[[.06,-.26],[.16,-.4],[.2,-.24]],s,'#a16207');
 ell(g,0,.14*s,.16*s,.18*s,'#fde68a');circ(g,-.1*s,-.14*s,.08*s,'#ffffff');circ(g,.1*s,-.14*s,.08*s,'#ffffff');dot(g,-.1*s,-.14*s,.035*s);dot(g,.1*s,-.14*s,.035*s);
 poly(g,[[-.03,-.06],[.03,-.06],[0,.02]],s,'#f97316')};
P.digger=(g,s)=>{rect(g,-.4*s,.2*s,.5*s,.12*s,'#1f2937');rect(g,-.38*s,-.08*s,.44*s,.28*s,'#facc15');rect(g,-.3*s,-.3*s,.2*s,.22*s,'#bae6fd');
 g.lineWidth=s*.06;g.strokeStyle='#ca8a04';g.beginPath();g.moveTo(.04*s,-.02*s);g.lineTo(.26*s,-.32*s);g.lineTo(.38*s,.06*s);g.stroke();g.lineWidth=Math.max(1.5,s*.03);g.strokeStyle='#1f2937';
 poly(g,[[.3,.04],[.46,.04],[.42,.2],[.3,.16]],s,'#78716c')};
P.bus=(g,s)=>{rect(g,-.44*s,-.22*s,.88*s,.4*s,'#2563eb');[-.36,-.16,.04,.24].forEach(x=>rect(g,x*s,-.16*s,.14*s,.14*s,'#e0f2fe'));circ(g,-.26*s,.2*s,.08*s,'#1f2937');circ(g,.26*s,.2*s,.08*s,'#1f2937')};
P.fire=(g,s)=>{rect(g,-.44*s,-.1*s,.88*s,.28*s,'#dc2626');rect(g,.18*s,-.28*s,.26*s,.2*s,'#dc2626');rect(g,.24*s,-.24*s,.14*s,.1*s,'#e0f2fe');
 rect(g,-.4*s,-.2*s,.52*s,.06*s,'#e5e7eb');circ(g,-.26*s,.2*s,.08*s,'#1f2937');circ(g,.26*s,.2*s,.08*s,'#1f2937')};
function petals(g,s,n,r,len,c,mid){g.beginPath();g.moveTo(0,.06*s);g.lineTo(0,.44*s);g.lineWidth=s*.04;g.strokeStyle='#15803d';g.stroke();g.lineWidth=Math.max(1.5,s*.03);g.strokeStyle='#1f2937';
 for(let i=0;i<n;i++){const a=i*2*Math.PI/n;g.beginPath();g.ellipse(Math.cos(a)*r*s,-.12*s+Math.sin(a)*r*s,len*s,len*.45*s,a,0,7);fs(g,c)}circ(g,0,-.12*s,mid*s,mid>.1?'#78350f':'#facc15')}
P.daisy=(g,s)=>{g.scale(.8,.8);g.translate(0,.1*s);petals(g,s,10,.13,.08,'#ffffff',.06)};
P.sunflower=(g,s)=>petals(g,s,12,.2,.11,'#facc15',.13);
P.tulip=(g,s)=>{g.beginPath();g.moveTo(0,0);g.lineTo(0,.44*s);g.lineWidth=s*.04;g.strokeStyle='#15803d';g.stroke();g.lineWidth=Math.max(1.5,s*.03);g.strokeStyle='#1f2937';
 poly(g,[[-.16,-.32],[-.08,-.2],[0,-.34],[.08,-.2],[.16,-.32],[.16,-.06],[0,.04],[-.16,-.06]],s,'#e11d48')};
P.gran=(g,s)=>{circ(g,0,0,.36*s,'#fed7aa');g.beginPath();g.arc(0,-.16*s,.34*s,3.3,6.1);fs(g,'#e5e7eb');dot(g,-.12*s,-.02*s,.035*s);dot(g,.12*s,-.02*s,.035*s);g.beginPath();g.arc(0,.1*s,.12*s,.3,2.8);g.stroke()};
const name=k=>NAME[k]||k;
return{box,inside,kit,pic,name,CLO,ORDER,DOGS,SETS,GROUPS,EXACT,PARK,FIND,DESC,DONE,QS}})();
