/* Flagship – wondering and asking "why?" (ages 3–4): tap things in the garden to wonder about them, sort asking from
   telling, have a go at a guess before finding out, test things on a magnet instead of guessing, and pick how to
   find out (look, try it, or ask). Drag or tap on the canvas, or use the buttons. */
(()=>{
const SEEN=[['🐌','snail','Why does the snail have a shell?'],['🌈','rainbow','How does a rainbow get its colours?'],['🍂','leaf','Why do the leaves fall down?'],
 ['🐝','bee','Why does the bee go to the flowers?'],['🌙','moon','Why can I see the moon in the day?'],['🌧️','rain','Where does the rain go?']];
const SAY=[['Why is the sky blue?',0],['The sky is blue.',1],['How does a bird fly?',0],['A bird has wings.',1],['What if it snows?',0],['Snow is cold.',1]];
const GUESS=[['Where does the rain go?',[['🌱','into the ground',1],['🏞️','into rivers',1],['☁️','back up to the sky',1],['🤐','no idea, stop',0]],'All three happen! Rain soaks into the ground, runs into rivers, and the sun dries some back up.'],
 ['Why does the snail hide in its shell?',[['🛡️','to keep safe',1],['💧','to stay wet',1],['😴','to have a rest',1],['🤐','no idea, stop',0]],'Snails hide to stay safe and to stop drying out. They rest in there too.'],
 ['Why do some trees drop their leaves?',[['❄️','to get ready for winter',1],['🌬️','the wind blows them',1],['🍂','they are old',1],['🤐','no idea, stop',0]],'In autumn these trees let go of their old leaves to get ready for winter. The wind helps them fall.']];
const MAG=[['📎','paper clip',1,'It is made of steel.'],['FOIL','shiny foil',0,'Foil is shiny metal, but it is not iron or steel.'],['🧸','teddy',0,'A teddy is soft cloth.'],
 ['🥫','food tin',1,'A food tin is made of steel.'],['🪵','wood',0,'Wood is not a metal.'],['🧷','safety pin',1,'It is made of steel.'],['🥤','plastic cup',0,'Plastic does not stick.']];
const WAYS=[['🔍','Look'],['🧪','Try it'],['🙋','Ask or read']];
const Q=[['What is under this stone?',[0],'Lift it and look!'],['Does a ball roll faster down a steep slope?',[1],'Roll it and see!'],
 ['Why is the sky blue?',[2],'You cannot look or try to find this. Ask a grown-up or look in a book.'],['Will my toy boat float?',[1],'Put it in the water and see!'],
 ['How many spots does this ladybird have?',[0],'Look closely and count the spots.'],['Where do penguins live?',[2],'Penguins are far away, so ask a grown-up or look in a book.']];
VIS.reg('flagcurio',c=>{let A,pad,box,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const S={};function reset(more){gen++;Object.assign(S,{n:0,pile:[],shelf:[],grab:null,bad:-1,lit:-1,seen:[],turn:0,line:'',pick:-1,last:-1,then:()=>{}},more||{})}reset();
const mode=()=>['look','say','guess','mag','way','quiz'][A.step],need=()=>({look:3,say:4,guess:3,mag:5,way:4})[mode()]||99,quick=()=>A.reduced();
const fs=n=>Math.round(n*(A.narrow?1:1.12));
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,col,mw){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-16)}
function wrap(g,t,x,y,n,mw,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;const L=[];let cur='';
 t.split(' ').forEach(w=>{const k=cur?cur+' '+w:w;if(g.measureText(k).width>mw&&cur){L.push(cur);cur=w}else cur=k});L.push(cur);
 const lh=fs(n)*1.25;L.forEach((s,i)=>txt(g,s,x,y+(i-(L.length-1)/2)*lh,n,col,mw))}
function emo(g,e,x,y,s){if(e==='FOIL'){const w=s*1.1,h=s*.8;g.fillStyle=A.paint.lin(x-w/2,y-h/2,x+w/2,y+h/2,[[0,'#e5e7eb'],[.45,'#9ca3af'],[.55,'#f9fafb'],[1,'#6b7280']]);A.paint.rrect(x-w/2,y-h/2,w,h,6);g.fill();return}
 g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function tile(g,r,fill,edge,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=w||2;g.stroke()}
const inR=(p,r)=>p.x>=r.x-6&&p.x<=r.x+r.w+6&&p.y>=r.y-6&&p.y<=r.y+r.h+6;
const edge=()=>A.mix(A.col.tx,A.col.pn,.45),paper=()=>A.col.dark?'#1e293b':'#ffffff',tint=h=>A.mix(A.col.pn,h,A.col.dark?.18:.55);
const grid=(n,cols,y0,y1)=>{const rows=Math.ceil(n/cols),gw=(A.W-24-(cols-1)*10)/cols,gh=((y1-y0)*A.H-(rows-1)*10)/rows;
 return[...Array(n)].map((_,i)=>({x:12+(i%cols)*(gw+10),y:y0*A.H+Math.floor(i/cols)*(gh+10),w:gw,h:gh}))};
const dock=()=>{const w=Math.min(A.W*.9,460),h=A.H*.16;return{x:A.W/2-w/2,y:A.H*.83-h/2,w,h}};
const magnet=()=>{const w=Math.min(A.W*.42,220),h=A.H*.27;return{x:A.W/2-w/2,y:A.H*.03,w,h}};
const zones=()=>{const m=mode();return m==='say'?grid(2,2,.04,.64):m==='way'?grid(3,3,.04,.64):m==='mag'?[magnet(),...grid(2,2,.34,.64)]:[]};
const moved=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
function slip(g,label,r,bad,e){const C=A.col;tile(g,r,paper(),bad?C.rd:edge(),bad?4:2);
 if(e){emo(g,e,r.x+r.h*.5,r.y+r.h/2,r.h*.55);wrap(g,label,r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,15,r.w-r.h-12)}else wrap(g,label,r.x+r.w/2,r.y+r.h/2,15,r.w-14)}
function drawLook(g){const C=A.col;grid(6,3,.04,.62).forEach((r,i)=>{const on=S.seen.includes(i);tile(g,r,on?tint('#fde68a'):tint('#dcfce7'),i===S.lit?C.vi:edge(),i===S.lit?5:2);
  emo(g,SEEN[i][0],r.x+r.w/2,r.y+r.h*.42,Math.min(r.w*.42,r.h*.5,64));txt(g,SEEN[i][1],r.x+r.w/2,r.y+r.h*.85,13,C.tx,r.w-8);if(on)txt(g,'❓',r.x+r.w-16,r.y+18,15)});
 const b={x:12,y:A.H*.68,w:A.W-24,h:A.H*.28};tile(g,b,paper(),edge());wrap(g,S.line?'💭 '+S.line:'Tap a thing. What do you wonder?',A.W/2,b.y+b.h/2,16,b.w-20,S.line?C.tx:C.mu)}
function drawSay(g){const C=A.col;zones().forEach((r,i)=>{tile(g,r,tint(i?'#e0e7ff':'#fef3c7'),i===S.lit?C.vi:edge(),i===S.lit?5:2);txt(g,i?'💬 Telling':'❓ Asking',r.x+r.w/2,r.y+22,15,C.tx,r.w-8);
  S.shelf.filter(s=>s.at===i).forEach((s,j)=>txt(g,SAY[s.k][0],r.x+r.w/2,r.y+52+j*fs(20),12,C.tx,r.w-10))});
 const k=S.pile[0];if(k!=null)slip(g,SAY[k][0],moved(dock()),S.bad===k)}
function drawGuess(g){const C=A.col,G=GUESS[S.turn%3];wrap(g,'🤔 '+G[0],A.W/2,A.H*.08,17,A.W-24);
 grid(4,2,.17,.64).forEach((r,i)=>{const o=G[1][i],me=i===S.pick;tile(g,r,me?tint('#bbf7d0'):paper(),i===S.bad?C.rd:me||i===S.lit?C.vi:edge(),me||i===S.bad?4:2);
  emo(g,o[0],r.x+r.w/2,r.y+r.h*.38,Math.min(r.h*.42,r.w*.3,52));wrap(g,o[1],r.x+r.w/2,r.y+r.h*.8,13,r.w-10)});
 const b={x:12,y:A.H*.69,w:A.W-24,h:A.H*.27};tile(g,b,tint('#e0f2fe'),edge());wrap(g,S.pick>=0?'🔎 '+G[2]:'Tap your guess. Any guess is fine!',A.W/2,b.y+b.h/2,14,b.w-20,S.pick>=0?C.tx:C.mu)}
function drawMag(g){const C=A.col,[m,yes,no]=zones();tile(g,m,i0(),edge(),3);emo(g,'🧲',m.x+m.w/2,m.y+m.h*.45,Math.min(m.h*.62,70));txt(g,'Test it here',m.x+m.w/2,m.y+m.h*.88,13,C.tx,m.w-8);
 [[yes,'🧲 Sticks','#bbf7d0',0],[no,'🚫 Does not stick','#fecaca',1]].forEach(([r,l,h,at])=>{tile(g,r,tint(h),edge());txt(g,l,r.x+r.w/2,r.y+18,13,C.tx,r.w-8);
  S.shelf.filter(s=>s.at===at).forEach((s,j)=>emo(g,MAG[s.k][0],r.x+18+((j%4)+.3)*Math.min(44,(r.w-20)/4),r.y+r.h*.66,Math.min(30,r.h*.42)))});
 const k=S.pile[0];if(k!=null&&S.n<need())slip(g,MAG[k][1],moved(dock()),S.bad===k,MAG[k][0])}
const i0=()=>tint(S.last>=0&&MAG[S.last][2]?'#bbf7d0':'#f1f5f9');
function drawWay(g){const C=A.col;zones().forEach((r,i)=>{tile(g,r,tint(['#dcfce7','#fef3c7','#e0e7ff'][i]),i===S.lit?C.vi:edge(),i===S.lit?5:2);
  emo(g,WAYS[i][0],r.x+r.w/2,r.y+r.h*.3,Math.min(r.w*.4,r.h*.34,54));txt(g,WAYS[i][1],r.x+r.w/2,r.y+r.h*.6,13,C.tx,r.w-6);txt(g,'✓'.repeat(S.shelf.filter(s=>s.at===i).length),r.x+r.w/2,r.y+r.h*.84,16,C.dark?'#86efac':'#166534')});
 const k=S.pile[0];if(k!=null&&S.n<need())slip(g,Q[k][0],moved(dock()),S.bad===k)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='look')drawLook(g);if(m==='say')drawSay(g);if(m==='guess')drawGuess(g);if(m==='mag')drawMag(g);if(m==='way')drawWay(g);
 if(m==='quiz'){emo(g,'🤔',A.W/2,A.H*.38,Math.min(A.W*.24,110));txt(g,'Wonder. Guess. Find out.',A.W/2,A.H*.74,17,C.tx)}A.fx.draw(g)}
function flash(i){S.lit=i;const v=gen;setTimeout(()=>{if(v===gen){S.lit=-1;A.redraw()}},420)}
function oops(t){A.sound.miss();voice(t);A.redraw()}
function yes(t){S.n++;S.bad=-1;A.sound.pop();voice(t);controls();A.redraw();S.then()}
const soon=f=>{const v=gen;setTimeout(()=>{if(v===gen)f()},quick()?20:900)};
/* tap thing i in the garden */
function wonder(i){if(S.n>=3)return;flash(i);if(S.seen.includes(i))return voice(`You wondered about the ${SEEN[i][1]}. Tap a new thing.`);S.seen.push(i);S.line=SEEN[i][2];yes(`${SEEN[i][2]} Good wondering!`)}
/* put the waiting sentence in box i: 0 asking, 1 telling */
function sortSay(i){const k=S.pile[0];if(k==null||S.n>=4)return;flash(i);const s=SAY[k];
 if(s[1]!==i){S.bad=k;return oops(i?`“${s[0]}” wants an answer. It is asking. Look for why, how or what if.`:`“${s[0]}” tells you a thing. It is not asking.`)}
 S.shelf.push({k:S.pile.shift(),at:i});yes(i?`Yes. “${s[0]}” is telling.`:`Yes! “${s[0]}” is asking. Asking helps you find out.`)}
/* choose guess i */
function guess(i){const G=GUESS[S.turn%3];if(S.pick>=0||S.n>=3)return;flash(i);const o=G[1][i];
 if(!o[2]){S.bad=i;return oops('Have a go! Any guess is fine. A guess helps you start finding out.')}
 S.pick=i;S.bad=-1;yes(`Good guess: ${o[1]}! Now find out. ${G[2]}`);if(S.n<3)soon(()=>{S.turn++;S.pick=-1;controls();A.redraw()})}
/* drop the waiting thing on zone i: 0 the magnet, 1 or 2 a shelf */
function test(i){const k=S.pile[0];if(k==null||S.n>=5)return;flash(i);const t=MAG[k];
 if(i>0){S.bad=k;return oops(`Test it first! Put the ${t[1]} on the magnet and see.`)}
 S.last=k;S.shelf.push({k:S.pile.shift(),at:t[2]?0:1});
 yes(t[2]?`It sticks! ${t[3]} Magnets pull iron and steel.`:`No, the ${t[1]} does not stick. ${t[3]}`)}
/* drop the waiting question on way i */
function way(i){const k=S.pile[0];if(k==null||S.n>=4)return;flash(i);const q=Q[k];
 if(!q[1].includes(i)){S.bad=k;return oops(i===0?`Can you see that just by looking? ${q[2]}`:i===1?`Can you try that out? ${q[2]}`:`You can find this out yourself! ${q[2]}`)}
 S.shelf.push({k:S.pile.shift(),at:i});yes(`Yes! ${q[2]}`)}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=need())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='look')SEEN.forEach((s,i)=>{if(!S.seen.includes(i))B(s[0]+' '+s[1],`Wonder about the ${s[1]}`,()=>wonder(i))});
 if(m==='say'&&S.pile.length){const s=SAY[S.pile[0]][0];B('❓ Asking',`${s}: asking`,()=>sortSay(0));B('💬 Telling',`${s}: telling`,()=>sortSay(1))}
 if(m==='guess'&&S.pick<0)GUESS[S.turn%3][1].forEach((o,i)=>B(o[0]+' '+o[1],`Guess: ${o[1]}`,()=>guess(i)));
 if(m==='mag'&&S.pile.length){const t=MAG[S.pile[0]];B('🧲 Test it',`Test the ${t[1]} on the magnet`,()=>test(0))}
 if(m==='way'&&S.pile.length){const q=Q[S.pile[0]][0];WAYS.forEach((w,i)=>B(w[0]+' '+w[1],`${q} Find out: ${w[1]}`,()=>way(i)))}}
function down(p){const m=mode();if(m==='quiz'||S.n>=need())return false;
 if(m==='look'){const i=grid(6,3,.04,.62).findIndex(r=>inR(p,r));if(i>=0)wonder(i);return false}
 if(m==='guess'){const i=grid(4,2,.17,.64).findIndex(r=>inR(p,r));if(i>=0)guess(i);return false}
 if(S.pile.length&&inR(p,dock())){S.grab={x:null,x0:p.x,y0:p.y};return true}
 const i=zones().findIndex(r=>inR(p,r));if(i>=0&&S.pile.length)({say:sortSay,mag:test,way}[m])(i);return false}
function move(p){const d=S.grab;if(!d||(d.x==null&&Math.hypot(p.x-d.x0,p.y-d.y0)<=8))return;d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.grab;S.grab=null;if(!d)return;const i=zones().findIndex(r=>inR(p,r));
 if(d.x==null||i<0){voice(mode()==='mag'?'Drag it onto the magnet, or tap Test it.':'Drag the card into a box, or tap a button.');return A.redraw()}({say:sortSay,mag:test,way}[mode()])(i)}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},quick()?j*40+30:(j+1)*(gap||500)))}
const steps=[
{h:'I wonder…',p:'Look at the garden. Tap a thing. What do you wonder about it?',task:'Wonder about 3 things',
 show:()=>{steps[0].go();play([0,2,5].map(i=>()=>wonder(i)),700)},go:()=>{reset();voice('Tap a thing in the garden. What do you wonder?');controls();S.then=finish(0,()=>S.n>=3,'Why, how and what if are wonder words. You asked 3 questions!')}},
{h:'Asking or telling?',p:'Is it asking a question, or telling you a thing? Drag it to a box.',predict:{q:'You ask “Why?” again and again. Is that…',opts:['Silly. Stop asking.','Good. It helps you learn.'],ans:1},task:'Sort 4 cards',
 show:()=>{steps[1].go();play([0,1,2,3].map(()=>()=>sortSay(SAY[S.pile[0]][1])))},go:()=>{reset({pile:[0,1,2,3,4,5]});voice('Why is the sky blue? Asking or telling?');controls();S.then=finish(1,()=>S.n>=4,'Asking questions is how scientists find things out.')}},
{h:'Have a guess',p:'Before you find out, have a go. Tap your guess.',predict:{q:'Does your guess have to be right?',opts:['Yes, or it is no good','No. A guess helps you start.'],ans:1},task:'Make 3 guesses',
 show:()=>{steps[2].go();play([()=>guess(0),()=>guess(1),()=>guess(0)],1300)},go:()=>{reset();voice('Where does the rain go? Tap your guess.');controls();S.then=finish(2,()=>S.n>=3,'Guess first, then find out. Your guess does not have to be right.')}},
{h:'Try it and see',p:'Will it stick to the magnet? Guess, then drag it onto the magnet to find out.',predict:{q:'Will the magnet pick up the shiny foil?',opts:['Yes, it is shiny','No, it will not'],ans:1},task:'Test 5 things',
 show:()=>{steps[3].go();play([0,1,2,3,4].map(()=>()=>test(0)),700)},go:()=>{reset({pile:[0,1,2,3,4,5,6]});voice('Paper clip. Drag it onto the magnet.');controls();S.then=finish(3,()=>S.n>=5,'Trying it showed you. Only iron and steel things stuck, not all shiny things.')}},
{h:'How can we find out?',p:'Some answers you can see. Some you can try. Some you ask about. Drag each question to a way.',task:'Match 4 questions',
 show:()=>{steps[4].go();play([0,1,2,3].map(()=>()=>way(Q[S.pile[0]][1][0])),700)},go:()=>{reset({pile:[0,1,2,3,4,5]});voice('What is under this stone? How can we find out?');controls();S.then=finish(4,()=>S.n>=4,'Look, try it, or ask. Now you know three ways to find out.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QS=[['You see a snail. What is a good thing to do?',[['Ask: why has it got a shell?','ok'],['Walk past and say nothing','quiet'],['Say snails are boring','bore']]],
 ['Mia asks “Why?” lots and lots. Is that…',[['Good. It helps her learn.','ok'],['Silly. She should stop.','silly'],['Naughty.','naughty']]],
 ['Which one is asking?',[['How do fish breathe?','ok'],['Fish can swim.','tell'],['I like fish.','like']]],
 ['Will a magnet pick up shiny foil?',[['No, foil is not iron or steel','ok'],['Yes, it is shiny','shiny'],['Yes, all metal sticks','metal']]],
 ['Why is the sky blue? How can you find out?',[['Ask a grown-up or look in a book','ok'],['Try it in the bath','bath'],['Give up','give']]],
 ['Your guess was wrong. What now?',[['Find out the real answer','ok'],['Feel bad and stop guessing','sad'],['Never guess again','never']]]];
function why(t){let m='Look back at the lab: wonder, have a guess, then find out.';
 if(t==='quiet')m='Walking past is fine, but asking a question is how you find out new things.';
 if(t==='bore')m='Snails are full of things to wonder about. Ask a question!';
 if(t==='silly')m='Asking why is not silly. Each why helps you find out something new.';
 if(t==='naughty')m='Asking is not naughty. Grown-ups ask questions too.';
 if(t==='tell')m='“Fish can swim” tells you a thing. Asking starts with how, why or what.';
 if(t==='like')m='“I like fish” tells how you feel. It does not ask anything.';
 if(t==='shiny')m='Shiny does not mean it sticks. Foil did not stick in the lab.';
 if(t==='metal')m='Not all metal sticks. Magnets pull iron and steel, but not foil.';
 if(t==='bath')m='The bath cannot show you why the sky is blue. Ask a grown-up or look in a book.';
 if(t==='give')m='Do not give up! Ask a grown-up or look in a book.';
 if(t==='sad')m='A wrong guess is fine. It helps you start. Now find out!';
 if(t==='never')m='Keep guessing! Then find out if you were right.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
function mark(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Well done.':'✗ '+why(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
