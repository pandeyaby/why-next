/* Data and drawings for flagsamediff (same and different: comparing two things; Learning to Learn, ages 4-5).
   Sources: DfE Development Matters (2021), Characteristics of Effective Learning ('Creating and thinking critically:
   making links and noticing patterns') and Reception Understanding the World ('compare and contrast characters from
   stories'); EYFS Statutory Framework (2024) ELGs Past and Present, People, Culture and Communities and The Natural
   World ('know some similarities and differences between ...'); Gentner (2010) 'Bootstrapping the mind: analogical
   processes and symbol systems' and Gentner and Namy (1999) on side-by-side comparison in young children. Slips it
   targets: glancing at the whole and calling two things simply 'different' (or 'the same'); thinking 'the same' means
   the same in every way; swapping both and but; putting a shared feature on one side only; stopping at big differences
   and missing a small one. */
const SDF=(()=>{
/* step 1: one feature at a time. v = what the left and right thing shows; same = 1 when it matches */
const PAIR1={l:['\u{1F408}','cat'],r:['\u{1F40E}','horse']};
const ROWS=[{f:'Legs',ic:'\u{1F43E}',v:['4 legs','4 legs'],same:1,no:'Count the legs. The cat has 4 and the horse has 4. That is the same.'},
 {f:'Size',ic:'\u{1F4CF}',v:['small','big'],same:0,no:'Look again. The cat is small, but the horse is big. That is different.'},
 {f:'Fur',ic:'\u{1F9F6}',v:['furry','furry'],same:1,no:'Feel with your eyes: both are furry. That part is the same.'},
 {f:'Sound',ic:'\u{1F50A}',v:['miaow','neigh'],same:0,no:'Listen: a cat says miaow, but a horse says neigh. Different sounds.'}];
/* step 2: both or but. w = the right word; pic = the pair */
const GAPS=[{pic:['\u{1F34E}','\u26BD'],pre:'',post:'are round.',w:'both',say:'Both are round.'},
 {pic:['\u{1F34E}','\u26BD'],pre:'The apple is red,',post:'the ball is black and white.',w:'but',say:'The apple is red, but the ball is black and white.'},
 {pic:['\u{1F697}','\u{1F68C}'],pre:'',post:'have wheels.',w:'both',say:'Both have wheels.'},
 {pic:['\u{1F697}','\u{1F68C}'],pre:'The car is short,',post:'the bus is long.',w:'but',say:'The car is short, but the bus is long.'}];
const WORD_NO={both:'Both tells us what is the SAME. These two are different here, so say but.',but:'But tells us what is DIFFERENT. These two match here, so say both.'};
/* step 3: three boxes. z 0 = only the duck, 1 = both, 2 = only the fish */
const PAIR3={l:['\u{1F986}','duck'],r:['\u{1F41F}','fish']};
const ZONES=['Only the duck','Both','Only the fish'];
const FEAT=[{t:'Has feathers',z:0,no:'Fish do not have feathers. Only the duck has feathers.'},
 {t:'Can swim',z:1,no:'Ducks can swim too! When both can do it, it goes in the middle.'},
 {t:'Has fins',z:2,no:'A duck has webbed feet, not fins. Only the fish has fins.'},
 {t:'Has eyes',z:1,no:'Look at both: the duck has eyes and the fish has eyes. That goes in Both.'},
 {t:'Has wings',z:0,no:'A fish has no wings. Only the duck has wings.'},
 {t:'Has scales',z:2,no:'A duck has feathers, not scales. Only the fish has scales.'}];
/* step 4: the same in one way. opts: [label, ok, reply when wrong]; but = how they differ */
const ONEWAY=[{p:['\u{1F353}','\u{1F692}'],n:['strawberry','fire engine'],o:[['Same colour',1],['Same size',0,'A strawberry is tiny, but a fire engine is huge.'],['Same shape',0,'A strawberry is not shaped like a fire engine.']],yes:'Both are red! Same colour, but a different size.'},
 {p:['\u26BD','\u{1F34A}'],n:['ball','orange'],o:[['Same colour',0,'The ball is black and white, but the orange is orange.'],['Both are food',0,'You can eat an orange, but not a ball!'],['Same shape',1]],yes:'Both are round! Same shape, but you can only eat the orange.'},
 {p:['\u{1F427}','\u{1F426}'],n:['penguin','bird'],o:[['Both can fly',0,'Penguins cannot fly. They swim instead.'],['Both have wings',1],['Same size',0,'A big penguin is much taller than this little bird.']],yes:'Both have wings! But only the bird can fly.'}];
/* step 5: spot the small difference. parts of a house; miss = the part changed on the right */
const PARTS=['roof','chimney','door','left window','right window','path'];
const SPOT=[{miss:'chimney',say:'Found it! The chimney is missing on the right house.'},
 {miss:'right window',say:'Found it! The right house has no window on that side.'},
 {miss:'door',say:'Found it! The door on the right has no handle. A tiny difference!'}];
const DESC=['A cat and a horse. One feature at a time, tap Same or Different.',
 'Two pictures and a sentence with a gap. Drag both or but into the gap, or tap a button.',
 'A duck and a fish. Drag each card into Only the duck, Both, or Only the fish.',
 'Two things that look different. Tap the way they are the same.',
 'Two houses that nearly match. Tap a part of the right house to check it against the left.'];
const TXT=['Do not just glance. Check one thing at a time: legs, size, fur, sound.','Say both for what is the same. Say but for what is different.',
 'Some things only one has. Some things both have. Those go in the middle.','Two things can be the same in one way and different in another.',
 'Some differences are tiny. Check one part at a time, left then right.'];
const DONE=['A cat and a horse: same legs and fur, but a different size and sound.','Both tells what is the same. But tells what is different.',
 'Feathers and wings: only the duck. Fins and scales: only the fish. Swimming and eyes: both.','Red like a fire engine, round like a ball: things can match in one way only.',
 'Checking part by part found even the tiny door handle.'];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'A cup and a mug. Which is true?',a:'Some things are the same, some are different',o:[['They are just different','whole'],['They are the same in every way','all']]},
 {q:'Which word tells us what is the same?',a:'both',o:[['but','word'],['or','word']]},
 {q:'A bee and a bird can both fly. Where does "can fly" go?',a:'In the middle: both',o:[['Only the bee','zone'],['Only the bird','zone']]},
 {q:'A red sock and a red hat. Are they the same?',a:'Same colour, but a different shape',o:[['Yes, the same in every way','all'],['No, not in any way','whole']]},
 {q:'Two teddies nearly match, but one has no bow. How do you find it?',a:'Check one part at a time',o:[['Look quickly at the whole teddy','whole'],['Only look for big changes','big']]},
 {q:'"The cat is small, ___ the horse is big." Which word goes in the gap?',a:'but',o:[['both','word'],['and both','word']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',LIGHT='#f1f5f9',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',F='px system-ui,sans-serif';
function pic(g,ch,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(ch,x,y)}
function box(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function lines(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
/* a tappable tile: o.state is 'ok', 'no', 'sel' or nothing */
function tile(g,r,label,o){o=o||{};const st=o.state;g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':st==='sel'?'#dbeafe':'#ffffff';box(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=st==='no'?NO:st==='ok'?OK:st==='sel'?SEL:EDGE;g.lineWidth=st?4:1.8;g.stroke();if(o.ic)pic(g,o.ic,r.x+r.w/2,r.y+r.h*.32,Math.min(r.h*.36,38));
 if(!label)return;let n=o.n||18,rows;do{rows=lines(g,label,r.w-14,`800 ${n}${F}`);if(rows.length*n*1.2<=(o.ic?r.h*.5:r.h-8))break;n--}while(n>12);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';const cy=o.ic?r.y+r.h*.72:r.y+r.h/2;rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,cy+(i-(rows.length-1)/2)*n*1.2))}
/* banner with the instruction and, under it, the last reply in green or red; returns the y below it */
function banner(A,text,tone,reply,bad){const g=A.ctx,dk=A.col.dark,s=A.narrow?17:18,f=`800 ${s}${F}`,rows=lines(g,text,A.W-36,f),lh=s*1.3,h=rows.length*lh+16;
 g.fillStyle=tone==='ok'?(dk?'#14532d':'#dcfce7'):tone==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');box(g,8,8,A.W-16,h,12);g.fill();
 g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:EDGE;g.lineWidth=tone?2.5:1.2;g.stroke();g.font=f;g.fillStyle=dk?LIGHT:INK;g.textAlign='left';g.textBaseline='top';rows.forEach((t,i)=>g.fillText(t,18,16+i*lh));
 let y=8+h+6;if(reply){const f2=`700 ${s-2}${F}`,r2=lines(g,reply,A.W-36,f2).slice(0,3);g.font=f2;g.fillStyle=bad?(dk?'#fca5a5':NO):(dk?'#86efac':OK);r2.forEach((t,i)=>g.fillText(t,18,y+i*(s-2)*1.3));y+=r2.length*(s-2)*1.3+6}return y}
/* the two things side by side, with their names under them */
function pair(A,y,h,L,R){const g=A.ctx,dk=A.col.dark;[[L,A.W*.27],[R,A.W*.73]].forEach(([p,x])=>{g.fillStyle=dk?'#1e293b':'#f8fafc';box(g,x-A.W*.2,y,A.W*.4,h,14);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();
 pic(g,p[0],x,y+h*.42,h*.55);if(p[1]){g.font=`800 16${F}`;g.fillStyle=dk?LIGHT:INK;g.textAlign='center';g.textBaseline='middle';g.fillText(p[1],x,y+h*.86)}});
 g.font=`900 22${F}`;g.fillStyle=dk?'#fbbf24':'#b45309';g.textAlign='center';g.textBaseline='middle';g.fillText('vs',A.W/2,y+h/2)}
/* a simple house drawn from parts; skip = the part to leave out or change; returns each part's rectangle */
function house(g,x,y,w,h,skip,dk){const P={},wall=dk?'#fde68a':'#fef3c7',edge=dk?'#f8fafc':'#334155';
 P.roof={x:x+w*.05,y:y+h*.12,w:w*.9,h:h*.3};P.chimney={x:x+w*.66,y:y,w:w*.13,h:h*.22};P.door={x:x+w*.4,y:y+h*.62,w:w*.2,h:h*.33};
 P['left window']={x:x+w*.14,y:y+h*.5,w:w*.2,h:h*.18};P['right window']={x:x+w*.66,y:y+h*.5,w:w*.2,h:h*.18};P.path={x:x+w*.36,y:y+h*.95,w:w*.28,h:h*.05};
 g.lineWidth=2.5;g.strokeStyle=edge;if(skip!=='chimney'){g.fillStyle='#9a3412';g.fillRect(P.chimney.x,P.chimney.y,P.chimney.w,P.chimney.h+h*.1);g.strokeRect(P.chimney.x,P.chimney.y,P.chimney.w,P.chimney.h+h*.1)}
 g.fillStyle='#b91c1c';g.beginPath();g.moveTo(x+w*.05,y+h*.42);g.lineTo(x+w*.5,y+h*.12);g.lineTo(x+w*.95,y+h*.42);g.closePath();g.fill();g.stroke();
 g.fillStyle=wall;g.fillRect(x+w*.1,y+h*.42,w*.8,h*.53);g.strokeRect(x+w*.1,y+h*.42,w*.8,h*.53);
 ['left window','right window'].forEach(k=>{if(skip===k)return;const r=P[k];g.fillStyle='#7dd3fc';g.fillRect(r.x,r.y,r.w,r.h);g.strokeRect(r.x,r.y,r.w,r.h);g.beginPath();g.moveTo(r.x+r.w/2,r.y);g.lineTo(r.x+r.w/2,r.y+r.h);g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke()});
 const d=P.door;g.fillStyle='#1d4ed8';g.fillRect(d.x,d.y,d.w,d.h);g.strokeRect(d.x,d.y,d.w,d.h);if(skip!=='door'){g.fillStyle='#facc15';g.beginPath();g.arc(d.x+d.w*.75,d.y+d.h*.55,Math.max(2.5,w*.018),0,7);g.fill()}
 g.fillStyle='#a8a29e';g.fillRect(P.path.x,P.path.y,P.path.w,P.path.h);return P}
return{PAIR1,ROWS,GAPS,WORD_NO,PAIR3,ZONES,FEAT,ONEWAY,PARTS,SPOT,DESC,TXT,DONE,QS,pic,box,lines,tile,banner,pair,house,INK,LIGHT}})();
