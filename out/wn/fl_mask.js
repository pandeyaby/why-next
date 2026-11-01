/* Flagship – hidden and masked feelings (ages 7–9): check face, body and voice against "I'm fine", lift a smile mask,
   sort why people hide feelings, keep or share, and order a kind check-in. Button twins throughout. */
(()=>{
const FRIENDS=[{n:'Ola',say:"I'm fine.",fine:0,mood:'sad',hug:1,col:'#f9a8d4',clues:[['Mouth down, eyes on the floor'],['Arms wrapped tight round her'],['Voice quiet and flat']]},
 {n:'Raj',say:"I'm fine!",fine:1,mood:'grin',hug:0,col:'#93c5fd',clues:[['Big smile, eyes crinkle'],['Loose arms, waving'],['Voice bright and chatty']]},
 {n:'Bea',say:"It doesn't matter.",fine:0,mood:'tear',hug:0,fist:1,col:'#fcd34d',clues:[['Teary eyes'],['Fists squeezed tight'],['Voice shaky, then silent']]}];
const SPOT=['face','body','voice'];
const MASKS=[['Mia','Her best friend missed her party. Mia smiles at everyone.','sad',['Sad','Excited','Angry'],'#c4b5fd'],
 ['Leo','Kids joke about his old shoes. Leo laughs along.','hurt',['Embarrassed','Happy','Bored'],'#86efac'],
 ['Ada','At the giant slide she says: I\'m not scared!','scared',['Scared','Proud','Sleepy'],'#fdba74']];
const SORTS=[{bins:['So others do not worry','Embarrassed or to fit in','To be polite'],cards:[['Gran knits Sam an itchy jumper. He says: I love it!',2],['Dad is ill. Nia says she is fine.',0],
  ['Kai loses and grins so no one teases him.',1],['Ola says the scary film was great, like her friends.',1],['Mum is stressed. Ben says school was fine.',0],['Zoe tells her host the dinner is nice.',2]]},
 {bins:['Fine to keep private for now','Share with a trusted grown-up'],cards:[['A bit let down by a present',0],['Sad every day for two weeks',1],['Someone keeps hurting me',1],
  ['Grumpy at breakfast, gone by lunch',0],['Told to keep a secret that scares me',1],['Bit sad my team lost today',0]]}];
const WHY=[['Hiding it so a loved one does not worry.','Hiding it so no one laughs or leaves them out.','Being kind to the giver or host.'],
 ['Small feelings that pass are OK to keep private.','Big, long or unsafe feelings need a trusted grown-up.']];
const STEPS=['Notice the clues','Ask gently, just you two','Listen, do not push','Worried? Tell a trusted grown-up'],TRAPS=[['Tell the whole class','class'],['Say: you are lying!','liar']];
VIS.reg('flagmask',c=>{let A,ui,chal,qn=-1,tok=0,run=0;
const top=k=>!!(S.grab&&S.grab.k===k),blank=()=>({want:()=>{},won:0,r:0,bad:-1,seen:[],lens:null,judge:-1,lift:0,named:-1,done:[],pick:-1,grab:null,ord:0}),S=blank();
const part=()=>['look','mask','why','share','check','quiz'][A.step],fast=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const rd=()=>A.redraw(),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const over=()=>S.won>=goal(),goal=()=>({look:3,mask:3,why:1,share:1,check:2}[part()]||9);
const R=()=>Math.min(S.r,2),F=()=>FRIENDS[R()],M=()=>MASKS[R()],SO=()=>SORTS[part()==='why'?0:1];
function L(g,t,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function wrap(g,t,x,y,n,mw,col){g.font=`700 ${fs(n)}px system-ui`;const ws=t.split(' '),ls=[];let cur='';ws.forEach(w=>{const nx=cur?cur+' '+w:w;if(g.measureText(nx).width>mw&&cur){ls.push(cur);cur=w}else cur=nx});ls.push(cur);
 ls.forEach((l,i)=>L(g,l,x,y+(i-(ls.length-1)/2)*fs(n)*1.25,n,col))}
function tile(g,r,how){const C=A.col;g.fillStyle=how==='ok'?A.alpha(C.gr,.24):(C.dark?'#1e1b4b':'#faf5ff');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=how==='no'?C.rd:how==='ok'?C.gr:how==='on'?C.vi:C.tx;g.lineWidth=how?4.5:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const tk=()=>A.sound.tick(),hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* a person: head with a mood face, a body that can hug itself or make fists */
function person(g,x,y,s,f,mood){const ink='#111';g.fillStyle=f.col;A.paint.rrect(x-s*.75,y+s*.95,s*1.5,s*1.6,s*.5);g.fill();
 g.strokeStyle=ink;g.lineWidth=Math.max(3,s*.12);g.lineCap='round';g.beginPath();
 if(f.hug){g.moveTo(x-s*.7,y+s*1.4);g.quadraticCurveTo(x,y+s*1.9,x+s*.7,y+s*1.4)}else if(f.fist){g.moveTo(x-s*.75,y+s*1.2);g.lineTo(x-s*1.05,y+s*2.1);g.moveTo(x+s*.75,y+s*1.2);g.lineTo(x+s*1.05,y+s*2.1)}
 else{g.moveTo(x-s*.75,y+s*1.2);g.lineTo(x-s*1.3,y+s*.5);g.moveTo(x+s*.75,y+s*1.2);g.lineTo(x+s*1.3,y+s*.5)}g.stroke();
 if(f.fist){g.fillStyle=ink;[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*1.05,y+s*2.15,s*.16,0,7);g.fill()})}
 A.paint.ball(x,y,s*.85,'#fde2c4');g.fillStyle=ink;const down=mood==='sad'||mood==='tear'||mood==='hurt'||mood==='scared';
 [-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.3,y-s*.05+(down&&mood!=='scared'?s*.08:0),s*(mood==='scared'?.13:.08),0,7);g.fill()});
 g.beginPath();if(mood==='grin')g.arc(x,y+s*.15,s*.38,.3,2.84);else if(mood==='scared'){g.ellipse(x,y+s*.42,s*.14,s*.18,0,0,7)}else if(mood==='flat'){g.moveTo(x-s*.25,y+s*.42);g.lineTo(x+s*.25,y+s*.42)}else g.arc(x,y+s*.62,s*.3,3.7,5.7);g.stroke();
 if(mood==='tear'){g.fillStyle='#38bdf8';g.beginPath();g.ellipse(x+s*.34,y+s*.25,s*.07,s*.12,0,0,7);g.fill()}
 if(mood==='hurt'){g.fillStyle='rgba(239,68,68,.35)';[-1,1].forEach(k=>{g.beginPath();g.arc(x+k*s*.5,y+s*.25,s*.15,0,7);g.fill()})}}
/* ---- 1. look past the words ---- */
const who=()=>({x:A.W/2,y:A.H*.24,s:Math.min(A.W,A.H)*.1});
function spots(){const w=who();return[{x:w.x,y:w.y},{x:w.x,y:w.y+w.s*1.7},{x:w.x+w.s*2.6,y:w.y-w.s*.9}]}
function judgeRects(){const w=Math.min((A.W-36)/2,200),h=Math.min(A.H*.12,58);return[0,1].map(k=>({x:A.W/2-w-6+k*(w+12),y:A.H*.84,w,h}))}
function drawLook(g){const C=A.col,f=F(),w=who();person(g,w.x,w.y,w.s,f,f.mood);L(g,f.n,w.x-w.s*2.3,w.y+w.s*1.6,15);
 const b={x:w.x+w.s*1.3,y:w.y-w.s*1.5,w:Math.min(A.W*.34,150),h:w.s*1.2};tile(g,b,'');L(g,'💬 '+f.say,b.x+b.w/2,b.y+b.h/2,15);
 spots().forEach((p,k)=>{if(S.seen.includes(k)){g.strokeStyle=C.vi;g.lineWidth=4;g.beginPath();g.arc(p.x,p.y,w.s*.95,0,7);g.stroke()}else{g.fillStyle=C.vi;g.beginPath();g.arc(p.x,p.y,fs(15),0,7);g.fill();L(g,'?',p.x,p.y,16,'#fff',900)}});
 S.seen.forEach((k,j)=>{L(g,`${['😶','🧍','🔊'][k]} ${f.clues[k][0]}`,A.W/2,A.H*.56+j*fs(22),13,C.tx,700)});
 if(S.lens){g.strokeStyle=C.tx;g.lineWidth=5;g.beginPath();g.arc(S.lens.x,S.lens.y,w.s*.9,0,7);g.stroke()}
 if(S.seen.length<3)L(g,'Drag the 🔍 over each ?, or tap it.',A.W/2,A.H*.9,12,C.mu,700);
 else judgeRects().forEach((r,k)=>{tile(g,r,S.bad===k?'no':S.judge===k?'ok':'');L(g,k?'Maybe not fine':'Really fine',r.x+r.w/2,r.y+r.h/2,15)})}
function peek(k){if(part()!=='look'||S.seen.includes(k)||over())return;S.seen.push(k);tk();say(`${SPOT[k]}: ${F().clues[k][0]}.`+(S.seen.length===3?' Do the clues match the words?':''));ui();rd()}
function judge(k){if(part()!=='look'||S.seen.length<3||S.judge>=0)return;const f=F(),right=f.fine?0:1;
 if(k!==right)return slip(f.fine?`${f.n}'s face, body and voice match the words. Not everyone who says fine is hiding.`:`${f.n}'s words say fine, but face, body and voice do not. ${f.n} may be hiding a feeling.`,k);
 S.judge=k;rd();setTimeout(()=>score(f.fine?`Yes. ${f.n}'s clues match: really fine.`:`Yes. The clues do not match, so ${f.n} may be hiding a feeling.`),fast()?20:480)}
/* ---- 2. lift the mask ---- */
const maskY=()=>who().y-S.lift*who().s*2.4;
function feelRects(){const w=Math.min((A.W-40)/3,150),h=Math.min(A.H*.12,56);return[0,1,2].map(k=>({x:A.W/2-1.5*w-10+k*(w+10),y:A.H*.82,w,h}))}
function drawMask(g){const C=A.col,[n,t,mood,ops,col]=M(),w=who();person(g,w.x,w.y+w.s*.3,w.s,{col},mood);L(g,n,w.x-w.s*2.3,w.y+w.s*1.9,15);
 if(S.lift<1){const y=maskY()+w.s*.3;g.fillStyle='#fef9c3';g.strokeStyle='#111';g.lineWidth=3;g.beginPath();g.ellipse(w.x,y,w.s*.95,w.s*.9,0,0,7);g.fill();g.stroke();
  g.fillStyle='#111';[-1,1].forEach(k=>{g.beginPath();g.ellipse(w.x+k*w.s*.32,y-w.s*.1,w.s*.13,w.s*.08,0,0,7);g.fill()});g.beginPath();g.arc(w.x,y+w.s*.1,w.s*.42,.3,2.84);g.stroke();
  g.beginPath();g.moveTo(w.x+w.s*.9,y);g.lineTo(w.x+w.s*1.4,y+w.s*1.2);g.stroke()}
 wrap(g,t,A.W/2,A.H*.6,14,A.W-30,C.tx);if(S.lift<1)L(g,'Drag the smile mask up.',A.W/2,A.H*.72,12,C.mu,700);
 else{L(g,'What does '+n+' feel inside?',A.W/2,A.H*.73,14);feelRects().forEach((r,k)=>{tile(g,r,S.bad===k?'no':S.named===k?'ok':'');L(g,ops[k],r.x+r.w/2,r.y+r.h/2,14)})}}
function lift(){if(part()!=='mask'||S.lift>=1||over())return;A.sound.pop();A.tween(S,{lift:1},fast()?1:450,'out',()=>{ui();rd()});say(`Under the smile, ${M()[0]} feels different.`)}
function name(k){if(part()!=='mask'||S.lift<1||S.named>=0)return;const[n,,,ops]=M();if(k)return slip(k===1&&S.r===1?`Laughing along is not the same as happy. Look at ${n}'s red cheeks and sad mouth.`:`${ops[k]}? Look at ${n}'s real face, not the mask.`,k);
 S.named=0;rd();setTimeout(()=>score(`Yes, ${n} feels ${ops[0].toLowerCase()} inside. The smile was a mask.`),fast()?20:480)}
/* ---- 3 and 4. sort cards into boxes ---- */
const left=()=>SO().cards.map((c,j)=>j).filter(j=>!S.done.includes(j));
function binRects(){const n=SO().bins.length,gap=8,w=(A.W-gap*(n+1))/n,h=A.H*.22;return SO().bins.map((b,k)=>({x:gap+k*(w+gap),y:A.H*.76,w,h}))}
function cardRect(k){const pos=left().indexOf(k),w=Math.min(A.W-24,460),h=Math.min(A.H*.1,52);
 if(S.grab&&S.grab.k===k&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};return{x:(A.W-w)/2,y:A.H*.03+pos*(h+7),w,h}}
function drawSort(g){const C=A.col,so=SO();binRects().forEach((r,k)=>{tile(g,r,S.bad===10+k?'no':S.pick>=0?'on':'');wrap(g,so.bins[k],r.x+r.w/2,r.y+r.h/2,12,r.w-10,C.tx);});
 left().sort((a,b)=>top(a)-top(b)).forEach(k=>{const r=cardRect(k);tile(g,r,S.bad===k?'no':S.pick===k?'on':'');wrap(g,so.cards[k][0],r.x+r.w/2,r.y+r.h/2,12,r.w-14,C.tx)})}
function put(k,b){const m=part();if((m!=='why'&&m!=='share')||S.done.includes(k)||over())return;S.pick=-1;S.grab=null;const so=SO(),[t,want]=so.cards[k],why=WHY[m==='why'?0:1];
 if(b!==want)return slip(`Not quite. ${why[want]}`,10+b);S.done.push(k);tk();if(S.done.length===so.cards.length)return score(m==='why'?'All sorted. People hide feelings for kind and worried reasons.':'All sorted. Big, long or unsafe feelings need a trusted grown-up.');
 say(`Yes: ${so.bins[b]}. ${why[want]}`);ui();rd()}
function nextCard(){const l=left();if(!l.length)return;S.pick=l[(l.indexOf(S.pick)+1)%l.length];tk();say(`Picked: ${SO().cards[S.pick][0]} Which box?`);rd()}
/* ---- 5. kind check-in order ---- */
const isS=o=>typeof o==='number',OPTS=[3,0,'t0',2,1,'t1'];
function optRects(){const w=Math.min((A.W-30)/2,260),h=Math.min(A.H*.11,54);return OPTS.map((o,j)=>({x:A.W/2-w-5+(j%2)*(w+10),y:A.H*.5+Math.floor(j/2)*(h+8),w,h}))}
function drawCheck(g){const C=A.col;L(g,S.r?'Kai says "whatever" and sits alone at lunch.':'Ola says "I\'m fine" but looks sad.',A.W/2,A.H*.05,14);
 STEPS.forEach((s,k)=>{const y=A.H*.12+k*A.H*.085,r={x:A.W*.06,y,w:A.W*.88,h:A.H*.07};tile(g,r,k<S.ord?'ok':'');L(g,k<S.ord?`${k+1}. ${s}`:`${k+1}. …`,A.W/2,y+r.h/2,13)});
 optRects().forEach((r,j)=>{const o=OPTS[j],used=isS(o)&&o<S.ord;if(used)return;tile(g,r,S.bad===j?'no':'');wrap(g,isS(o)?STEPS[o]:TRAPS[+o[1]][0],r.x+r.w/2,r.y+r.h/2,12,r.w-12,C.tx)})}
function choose(j){if(part()!=='check'||over())return;const o=OPTS[j];if(typeof o!=='number')return slip(because(TRAPS[+o[1]][1]),j);if(o<S.ord)return;
 if(o!==S.ord)return slip(o===3?'Telling a grown-up comes last, if you are still worried.':'Not yet. Go in order: notice, ask, listen, tell.',j);
 S.ord++;tk();if(S.ord>=4)return score('A kind check-in: notice, ask gently, listen, and tell a trusted grown-up if you are worried.');say(`Step ${S.ord}: ${STEPS[o]}. What next?`);ui();rd()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,m=part();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(m==='quiz'){L(g,'🙂 ➜ 🎭 ➜ 💬',W/2,H*.42,28,C.tx,400);L(g,'Words, face, body, voice: do they match?',W/2,H*.62,15);return}
 if(over()){L(g,{look:'Check the clues, not just words.',mask:'A smile can hide a feeling.',why:'People hide feelings for many reasons.',share:'Share big feelings.',check:'Notice. Ask. Listen. Tell.'}[m],W/2,H/2,15);return A.fx.draw(g)}
 ({look:drawLook,mask:drawMask,why:drawSort,share:drawSort,check:drawCheck})[m](g);A.fx.draw(g)}
function slip(t,k){A.sound.miss();S.bad=k;say(t);setTimeout(()=>{S.bad=-1;rd()},fast()?10:950);rd()}
function fresh(){Object.assign(S,{seen:[],lens:null,judge:-1,lift:0,named:-1,done:[],pick:-1,grab:null,ord:0})}
function score(t){S.won++;S.r++;A.sound.pop();if(S.won<goal()){fresh();say(t+' Here is the next one.')}else say(t);ui();rd();S.want()}
function down(p){const m=part();if(over())return false;
 if(m==='look'){if(S.seen.length>=3){const k=judgeRects().findIndex(r=>hit(p,r));if(k>=0)judge(k);return false}S.lens={x:p.x,y:p.y};lensAt(p);return true}
 if(m==='mask'){if(S.lift>=1){const k=feelRects().findIndex(r=>hit(p,r));if(k>=0)name(k);return false}const w=who();if(Math.hypot(p.x-w.x,p.y-w.y-w.s*.3)<w.s*1.4){S.grab={y0:p.y};return true}return false}
 if(m==='why'||m==='share'){const b=binRects().findIndex(r=>hit(p,r));if(b>=0&&S.pick>=0){put(S.pick,b);return false}const k=left().find(j=>hit(p,cardRect(j)));if(k!=null){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='check'){const j=optRects().findIndex(r=>hit(p,r));if(j>=0)choose(j)}return false}
function lensAt(p){const k=spots().findIndex(s=>Math.hypot(p.x-s.x,p.y-s.y)<who().s*.8);if(k>=0)peek(k);rd()}
function move(p){const m=part();if(m==='look'&&S.lens){S.lens={x:p.x,y:p.y};return lensAt(p)}if(m==='mask'&&S.grab){S.lift=Math.max(0,Math.min(1,(S.grab.y0-p.y)/(who().s*2)));if(S.lift>.6){S.grab=null;lift()}return rd()}
 const G=S.grab;if(G&&(G.x!=null||Math.hypot(p.x-G.x0,p.y-G.y0)>8)){G.x=p.x;G.y=p.y;rd()}}
function up(p){const m=part(),G=S.grab;S.grab=null;if(m==='look'){S.lens=null;return rd()}if(m==='mask'){if(!G)return;if(S.lift<.05)return lift();if(S.lift<1)A.tween(S,{lift:0},fast()?1:200);return}
 if(!G)return;if(G.x==null){S.pick=G.k;tk();say(`Picked: ${SO().cards[G.k][0]} Now tap a box.`);return rd()}const b=binRects().findIndex(r=>hit(p,r));if(b>=0)return put(G.k,b);rd()}
const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},fast()?j*40+30:(j+1)*(gap||250)))}
const reset=()=>{tok++;Object.assign(S,blank());if(A)fresh()},begin=(n,t,k,msg)=>{reset();say(t);ui();S.want=when(n,()=>S.won>=k,msg)};
const steps=[
{h:'Words and clues',p:'Words can say one thing while the body says another. Check face, body and voice.',predict:{q:'Ola says "I\'m fine" and stares at the floor. Is she fine?',opts:['Yes, she said so','Maybe not: check her clues'],ans:1},task:'Check 3 friends',
 show:()=>{steps[0].go();auto([0,1,2].flatMap(()=>[()=>peek(0),()=>peek(1),()=>peek(2),()=>judge(F().fine?0:1),rd,rd]),260)},go:()=>begin(0,'Drag the magnifier over each question mark.',3,'When clues and words do not match, a feeling may be hidden.')},
{h:'Lift the mask',p:'A smile can be a mask. Drag it up, look at the real face, then name the feeling.',predict:{q:'Leo laughs while kids joke about his shoes. How does Leo feel?',opts:['Happy, he is laughing','Hurt or embarrassed inside'],ans:1},task:'Lift 3 masks and name the feeling',
 show:()=>{steps[1].go();auto([0,1,2].flatMap(()=>[lift,()=>name(0)]),700)},go:()=>begin(1,'Drag the smile mask up.',3,'The outside does not always show the inside.')},
{h:'Why hide it?',p:'People hide feelings for different reasons. Drag each card to its reason.',task:'Sort all 6 cards',
 show:()=>{steps[2].go();auto(SORTS[0].cards.map((c,k)=>()=>put(k,c[1])),260)},go:()=>begin(2,'Why is each person hiding a feeling?',1,'Hiding a feeling is common, and often kind.')},
{h:'Keep or share?',p:'Small feelings can stay private. Big, long or unsafe ones need a trusted grown-up.',predict:{q:'Rae has felt sad for two weeks and hides it. What is best?',opts:['Keep hiding, it will go','Tell a trusted grown-up'],ans:1},task:'Sort all 6 cards',
 show:()=>{steps[3].go();auto(SORTS[1].cards.map((c,k)=>()=>put(k,c[1])),260)},go:()=>begin(3,'Keep it private, or share it?',1,'Sharing a big feeling with a trusted grown-up helps.')},
{h:'Check in kindly',p:'A friend says fine, but the clues say no. Tap the kind steps in order.',task:'Do 2 kind check-ins',
 show:()=>{steps[4].go();auto(Array.from({length:8},()=>()=>choose(OPTS.indexOf(S.ord))),300)},go:()=>begin(4,'What do you do first?',2,'You cannot make someone share, but you can show you care.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Sam says "I\'m fine" but sits quiet and alone. What could be true?',[['Sam might be hiding a feeling','ok'],['Sam is fine, he said so','words'],['Sam is being rude','rude']]],
 ['Raj smiles, laughs, chats and says he is fine. What is likely?',[['He really is fine','ok'],['He must be hiding sadness','always'],['He is acting','acting']]],
 ['Someone hurts you and says: keep it secret. What do you do?',[['Tell a trusted grown-up','ok'],['Hide it and smile','hide'],['Wait until it stops','wait']]],
 ['A friend looks sad but says "fine". What is a kind first step?',[['Ask gently, just you two','ok'],['Say: you are lying','liar'],['Tell the whole class','class']]]];
function because(t){let m='Check face, body and voice; share big feelings.';
 if(t==='words')m='Words are one clue. Quiet and alone do not match fine, so check in.';if(t==='rude')m='Hiding a feeling is not rude. Lots of people do it.';
 if(t==='always')m='When face, body and voice match the words, they are likely fine.';if(t==='acting')m='His clues all match. Not everyone who says fine is hiding.';
 if(t==='hide')m='Hurting is never a secret to keep. Tell a trusted grown-up.';if(t==='wait')m='It may not stop. Tell a trusted grown-up now.';
 if(t==='liar')m='That makes people hide more. Ask kindly instead.';if(t==='class')m='That would embarrass them. Ask quietly, just you two.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);rd()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You read the clues.':'✗ '+because(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
let ctl;ui=()=>{if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(m==='quiz'||over())return;
 if(m==='look'){if(S.seen.length<3)SPOT.forEach((s,k)=>{if(!S.seen.includes(k))B(`🔍 Check the ${s}`,()=>peek(k))});else{B('Really fine',()=>judge(0));B('Maybe not fine',()=>judge(1))}}
 if(m==='mask'){if(S.lift<1)B('Lift the mask ⬆',lift);else M()[3].forEach((o,k)=>B(o,()=>name(k)))}
 if(m==='why'||m==='share'){B('Pick a card ▶',nextCard);SO().bins.forEach((t,b)=>B('Put in: '+t,()=>{if(S.pick<0)nextCard();if(S.pick>=0)put(S.pick,b)}))}
 if(m==='check')OPTS.forEach((o,j)=>{if(isS(o)&&o<S.ord)return;B(isS(o)?STEPS[o]:TRAPS[+o[1]][0],()=>choose(j))})};
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ui()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ui()}});
A.start()})})();
