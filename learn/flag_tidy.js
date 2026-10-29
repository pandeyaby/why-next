/* Flagship – tidying up and helping out (ages 3–4): put each thing back in its own home (toy box, shelf, peg; hiding it
   under the sofa is not tidy), clear the floor so Teddy can walk to the door without tripping, set out one cup for each
   person, feed Pip the dog (dog food and water, never chocolate) and offer to help with a job that is the right size.
   Challenge on the usual slips: hidden means tidy, tidying is only a grown-up's job, piling two cups in one place,
   sharing human treats with a pet, picking a big or sharp job, walking away from a spill. */
(()=>{
const HOMES=[['🧺','Toy box'],['📚','Shelf'],['🪝','Coat peg'],['🛋️','Under sofa']];
const THINGS=[['🧸','teddy',0],['📕','book',1],['🧥','coat',2],['🧱','blocks',0],['🧢','hat',2],['📗','story book',1]];
const FLOOR=[['🚗','car',.3],['🧩','puzzle',.48],['⚽','ball',.64],['🦖','dinosaur',.8]];
const SEATS=[['👩','Mum'],['👴','Grandad'],['👧','Mia'],['🧒','Sam']];
const PET=[['🥣','dog food',1],['💧','water',1],['🍫','chocolate',0]];
const JOBS=[['🛍️','Dad has lots of shopping bags.',[['Can I help? I can carry the bread.','ok'],['I will carry the heaviest bag.','heavy'],['Not my job. I keep playing.','mine']]],
 ['🥕','Gran is making soup.',[['Can I help wash the carrots?','ok'],['I will chop with the sharp knife.','knife'],['I shout "I am hungry!"','shout']]],
 ['🧃','Your friend spilled juice.',[['I get a cloth and help wipe.','ok'],['I laugh at the mess.','laugh'],['I walk away.','away']]]];
VIS.reg('flagtidy',c=>{let A,pad,quiz,qn=-1,run1=0;c.fig.classList.add('young');
const B={tok:0,want:()=>{},i:0,bad:-1,got:[],walk:0,trip:-1,cups:[0,0,0,0],fed:[],j:0,helped:0,drag:null,shake:0,last:''};
const mode=()=>['home','path','cups','pet','offer','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.12:1.3));
function word(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-14)}
function box(g,r,tint,edge,lw){g.fillStyle=tint;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const homes=()=>HOMES.map((_,k)=>({x:8+(k%2)*(A.W/2),y:A.H*(.5+Math.floor(k/2)*.24),w:A.W/2-16,h:A.H*.21}));
const held=()=>({x:A.W*.34,y:A.H*.05,w:A.W*.32,h:A.H*.38});
const pathY=()=>A.H*.62, toyAt=k=>({x:A.W*FLOOR[k][2],y:pathY()});
const seatAt=k=>({x:A.W*(.2+k*.2),y:A.H*.3});
const bowl=()=>({x:A.W*.55,y:A.H*.55,w:A.W*.3,h:A.H*.25});
const petItem=k=>({x:A.W*(.16+k*.22)-A.W*.08,y:A.H*.06,w:A.W*.18,h:A.H*.26});
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(m==='quiz'){word(g,'🧺 Helping hands! 🙌',W/2,H*.4,20,C.tx,800);word(g,'Tidy up. Help out.',W/2,H*.58,15);return}
 if(m==='home'){homes().forEach((r,k)=>{box(g,r,A.alpha(k===3?C.rd:C.cy,.12),B.bad===k?C.rd:C.tx,B.bad===k?4:2);word(g,HOMES[k][0],r.x+r.w/2,r.y+r.h*.36,22);word(g,HOMES[k][1],r.x+r.w/2,r.y+r.h*.76,12,C.tx,800)});
  if(B.i<THINGS.length){const t=THINGS[B.i],r=held(),d=B.drag,x=d?d.x:r.x+r.w/2,y=d?d.y:r.y+r.h*.42;if(!d)box(g,r,A.alpha(C.or,.14));word(g,t[0],x+Math.sin(B.shake*30)*B.shake*20,y,40);if(!d)word(g,t[1],r.x+r.w/2,r.y+r.h*.84,12,C.tx,800)}
  else word(g,'All put away!',W/2,H*.24,18,C.tx,800);word(g,'Put away '+B.i+' of '+THINGS.length,W/2,H*.47,11,C.tx,600)}
 if(m==='path'){const y=pathY();g.fillStyle=A.alpha(C.or,.16);g.fillRect(W*.08,y-H*.09,W*.86,H*.18);g.strokeStyle=A.alpha(C.tx,.4);g.setLineDash([8,6]);g.lineWidth=2;g.beginPath();g.moveTo(W*.1,y);g.lineTo(W*.9,y);g.stroke();g.setLineDash([]);
  word(g,'🚪',W*.93,y-H*.2,34);FLOOR.forEach((t,k)=>{if(!B.got.includes(k)){const p=toyAt(k);word(g,t[0],p.x,p.y,26);if(B.trip===k){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(p.x,p.y,H*.08,0,7);g.stroke()}}});
  word(g,'🧺',W*.12,H*.2,30);word(g,B.got.length+' in the box',W*.12,H*.32,11,C.tx,700);const tx=W*(.1+B.walk*.78);word(g,B.trip>=0?'🤕':'🧸',tx,y-H*.16,30);
  word(g,B.walk>=1?'Teddy got to the door!':B.trip>=0?'Ouch! Teddy tripped.':'Clear the path for Teddy',W/2,H*.92,13,C.tx,800)}
 if(m==='cups'){const t={x:W*.08,y:H*.4,w:W*.84,h:H*.16};box(g,t,A.alpha(C.or,.2));SEATS.forEach((s,k)=>{const p=seatAt(k);word(g,s[0],p.x,p.y-H*.08,28);word(g,s[1],p.x,p.y+H*.03,11,C.tx,700);
   const n=B.cups[k];for(let u=0;u<n;u++)word(g,'🥤',p.x+(u-(n-1)/2)*22,H*.48,20);if(B.bad===k){g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(p.x,H*.48,24,0,7);g.stroke()}});
  const left=4-B.cups.reduce((a,b)=>a+Math.min(b,1),0);word(g,'🥤',B.drag?B.drag.x:W/2,B.drag?B.drag.y:H*.76,30);word(g,left?left+' more to get a cup':'Everyone has a cup!',W/2,H*.92,13,C.tx,800)}
 if(m==='pet'){PET.forEach((t,k)=>{const r=petItem(k);if(B.fed.includes(k))return;box(g,r,A.alpha(t[2]?C.gr:C.vi,.12),B.bad===k?C.rd:C.tx,B.bad===k?4:2);word(g,t[0],r.x+r.w/2,r.y+r.h*.4,26);word(g,t[1],r.x+r.w/2,r.y+r.h*.8,10,C.tx,700)});
  const b=bowl();word(g,B.fed.length>=2?'🐶':'🐕',W*.24,H*.62,46);box(g,b,A.alpha(C.cy,.14),C.tx);word(g,'Pip\'s bowls',b.x+b.w/2,b.y+b.h*.25,11,C.tx,800);
  B.fed.forEach((k,u)=>word(g,PET[k][0],b.x+b.w*(.3+u*.4),b.y+b.h*.66,22));if(B.drag)word(g,PET[B.drag.k][0],B.drag.x,B.drag.y,28);
  word(g,B.fed.length>=2?'Pip is happy!':'Food and water for Pip',W/2,H*.93,13,C.tx,800)}
 if(m==='offer'){const s=JOBS[B.j%3];box(g,{x:W*.1,y:H*.06,w:W*.8,h:H*.5},A.alpha(C.cy,.1));word(g,s[0],W/2,H*.24,44);word(g,s[1],W/2,H*.46,13,C.tx,800);
  for(let h=0;h<3;h++)word(g,h<B.helped?'❤️':'🤍',W*(.38+h*.12),H*.68,22);word(g,B.last||'How can you help?',W/2,H*.86,12,C.tx,700)}
 A.fx.draw(g)}
const no=t=>{A.sound.miss();say(t);A.redraw()},yes=t=>{A.sound.pop();say(t);pads();A.redraw();B.want()};
const wobble=()=>{B.shake=.4;A.tween(B,{shake:0},A.reduced()?1:500,'out')};
function putAway(k){B.drag=null;if(B.i>=THINGS.length)return A.redraw();const[e,n,h]=THINGS[B.i];
 if(k===3){B.bad=3;wobble();return no(`Hidden is not tidy. Under the sofa, nobody can find the ${n}. Put it in its home.`)}
 if(k!==h){B.bad=k;wobble();return no(`The ${n} does not live there. ${e} goes to the ${HOMES[h][1].toLowerCase()}.`)}
 B.bad=-1;B.i++;yes(`Yes! The ${n} is home in the ${HOMES[h][1].toLowerCase()}.`)}
function pick(k){if(B.got.includes(k)||B.walk>=1)return;B.got.push(k);B.trip=-1;A.sound.tick();say(`The ${FLOOR[k][1]} goes in the toy box.`);pads();A.redraw()}
function walk(){if(B.walk>=1)return;const left=FLOOR.map((_,k)=>k).filter(k=>!B.got.includes(k));
 if(left.length){B.trip=left[0];B.walk=(FLOOR[left[0]][2]-.1)/.78-.04;wobble();return no(`Ouch! Teddy tripped on the ${FLOOR[left[0]][1]}. Toys on the floor can trip us. Tidy them up.`)}
 B.trip=-1;A.tween(B,{walk:1},A.reduced()?1:700,'io');setTimeout(()=>yes('Teddy walks to the door. A tidy floor keeps everyone safe.'),A.reduced()?20:720)}
function cup(k){B.drag=null;if(B.cups.every(n=>n>=1))return A.redraw();if(B.cups[k]>=1){B.bad=k;return no(`${SEATS[k][1]} has a cup already. One cup for each person.`)}
 B.bad=-1;B.cups[k]=1;const left=B.cups.filter(n=>!n).length;yes(left?`A cup for ${SEATS[k][1]}. ${left} more.`:'One cup each. Snack time!')}
function feed(k){B.drag=null;if(B.fed.includes(k)||B.fed.length>=2)return A.redraw();
 if(!PET[k][2]){B.bad=k;wobble();return no('No! Chocolate makes dogs very poorly. Pip has dog food and water only.')}
 B.bad=-1;B.fed.push(k);yes(B.fed.length>=2?'Food and water. Pip wags her tail!':`Yes, ${PET[k][1]} for Pip. What else does she need?`)}
function offer(tag){if(B.helped>=3)return;const s=JOBS[B.j%3];if(tag!=='ok'){const m={heavy:'That bag is too heavy for you. Pick a small job, like the bread.',mine:'Helping is everyone\'s job. Ask "Can I help?"',knife:'Sharp knives are for grown-ups. Washing carrots is a good job for you.',shout:'Shouting does not help Gran. Ask "Can I help?"',laugh:'Laughing can make your friend sad. Help them wipe it up.',away:'Walking away leaves the mess. Get a cloth and help.'}[tag];B.last='Try again!';return no(m)}
 B.helped++;B.last=s[2][0][0];yes(B.helped>=3?'Three helping jobs! Helping makes things better for everyone.':'Kind helping! Thank you.');if(B.helped<3){const t=B.tok;setTimeout(()=>{if(t===B.tok){B.j++;B.last='';pads();A.redraw()}},A.reduced()?20:700)}}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='home'&&B.i<THINGS.length){const n=THINGS[B.i][1];HOMES.forEach(([e,h],k)=>K(e+' '+h,()=>putAway(k),'Put the '+n+' in: '+h))}
 if(m==='path'&&B.walk<1){FLOOR.forEach(([e,n],k)=>{if(!B.got.includes(k))K(e+' Pick up',()=>pick(k),'Pick up the '+n)});K('🚶 Walk',walk,'Teddy walks to the door')}
 if(m==='cups'&&!B.cups.every(n=>n>=1))SEATS.forEach(([e,n],k)=>K(e+' '+n,()=>cup(k),'Give '+n+' a cup'));
 if(m==='pet'&&B.fed.length<2)PET.forEach(([e,n],k)=>{if(!B.fed.includes(k))K(e+' '+n,()=>feed(k),'Give Pip '+n)});
 if(m==='offer'&&B.helped<3&&B.last!==JOBS[B.j%3][2][0][0]){const r=B.j%3;JOBS[B.j%3][2].slice(r).concat(JOBS[B.j%3][2].slice(0,r)).forEach(([s,t])=>K(s,()=>offer(t)))}}
function down(p){const m=mode();if(m==='home'&&B.i<THINGS.length&&inR(p,held())){B.drag={x:p.x,y:p.y};return true}
 if(m==='path'){for(let k=0;k<FLOOR.length;k++){const q=toyAt(k);if(!B.got.includes(k)&&Math.hypot(p.x-q.x,p.y-q.y)<A.H*.1){pick(k);return false}}if(p.x<A.W*.25&&p.y<pathY())walk();return false}
 if(m==='cups'&&Math.hypot(p.x-A.W/2,p.y-A.H*.76)<A.H*.12){B.drag={x:p.x,y:p.y};return true}
 if(m==='pet'){for(let k=0;k<3;k++)if(!B.fed.includes(k)&&inR(p,petItem(k))){B.drag={x:p.x,y:p.y,k};return true}}return false}
function move(p){if(!B.drag)return;B.drag.x=p.x;B.drag.y=p.y;A.redraw()}
function up(p){const d=B.drag,m=mode();if(!d)return;
 if(m==='home'){const hh=homes();for(let k=0;k<4;k++)if(inR(p,hh[k]))return putAway(k)}
 if(m==='cups'){for(let k=0;k<4;k++){const q=seatAt(k);if(Math.abs(p.x-q.x)<A.W*.1&&p.y<A.H*.6)return cup(k)}}
 if(m==='pet'&&inR(p,bowl()))return feed(d.k);B.drag=null;A.redraw()}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const t=++B.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===B.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{B.tok++;Object.assign(B,{want:()=>{},i:0,bad:-1,got:[],walk:0,trip:-1,cups:[0,0,0,0],fed:[],j:0,helped:0,drag:null,shake:0,last:''})};
const steps=[
{h:'Where does it live?',p:'Every toy has a home. Drag each thing to its home, or tap a button.',
 predict:{q:'Toys pushed under the sofa. Is that tidy?',opts:['Yes, I can not see them','No, toys go back to their home'],ans:1},task:'Put all 6 away',
 show:()=>{steps[0].go();play(THINGS.map(t=>()=>putAway(t[2])),330)},
 go:()=>{reset();say('Where does the teddy live?');pads();B.want=fin(0,()=>B.i>=THINGS.length,'Things go back to their own home, so we can find them next time.')}},
{h:'Why tidy up?',p:'Teddy wants to walk to the door. Tap the toys to put them away. Then tap Walk.',
 predict:{q:'Toys are all over the floor. What can happen?',opts:['Nothing at all','Someone can trip and fall'],ans:1},task:'Get Teddy to the door',
 show:()=>{steps[1].go();play([0,1,2,3].map(k=>()=>pick(k)).concat([walk]),330)},
 go:()=>{reset();say('Toys on the floor. Can Teddy get to the door?');pads();B.want=fin(1,()=>B.walk>=1,'We tidy up so no one trips.')}},
{h:'Set out the cups',p:'It is snack time. Drag a cup to each person, or tap their button.',task:'One cup for each person',
 show:()=>{steps[2].go();play([0,1,2,3].map(k=>()=>cup(k)),330)},
 go:()=>{reset();say('Four people. Give each one a cup.');pads();B.want=fin(2,()=>B.cups.every(n=>n===1),'One cup for each person. Setting the table helps the whole family.')}},
{h:'Feed the pet',p:'Pip the dog is hungry. Drag what Pip needs into her bowls.',
 predict:{q:'Can Pip have some of your chocolate?',opts:['Yes, as a treat','No, it makes dogs ill'],ans:1},task:'Give Pip food and water',
 show:()=>{steps[3].go();play([()=>feed(0),()=>feed(1)],380)},
 go:()=>{reset();say('Pip is hungry. What does she need?');pads();B.want=fin(3,()=>B.fed.length>=2,'Pets need their own food and fresh water. A grown-up helps us get it right.')}},
{h:'Can I help?',p:'Someone needs a hand. Pick a kind job that is the right size for you.',task:'Help 3 times',
 show:()=>{steps[4].go();const o=()=>offer('ok'),w=()=>{};play([o,w,w,o,w,w,o],330)},
 go:()=>{reset();say('Dad has lots of bags. How can you help?');pads();B.want=fin(4,()=>B.helped>=3,'Ask "Can I help?" and pick a small, safe job.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>B.want()});
const QS=[['Tidy-up time! Where do the blocks go?',[['In the toy box','ok'],['Under the sofa','hide'],['Leave them on the floor','floor']]],
 ['Why do we tidy the floor?',[['So no one trips','ok'],['Tidying is only for grown-ups','adult'],['There is no reason','nowhy']]],
 ['Three friends come for snack. How many cups?',[['3 cups, one each','ok'],['1 cup for everyone','one'],['2 cups in one place','pile']]],
 ['What can a dog eat?',[['Dog food','ok'],['Chocolate','choc'],['Sweets','sweet']]],
 ['Mum is cooking. Which job is for you?',[['Washing the potatoes','ok'],['Using the sharp knife','knife'],['Lifting the hot pan','hot']]],
 ['Your friend spills paint. What do you do?',[['Help wipe it up','ok'],['Walk away','away'],['Laugh at them','laugh']]]];
function why(t){let m='Put things back in their home, and help with small, safe jobs.';
 if(t==='hide')m='Hidden is not tidy. Blocks live in the toy box.';
 if(t==='floor')m='Blocks on the floor can trip someone. Put them in the toy box.';
 if(t==='adult')m='Everyone can help tidy, even little ones. It is a job for all of us.';
 if(t==='nowhy')m='Toys on the floor can make someone trip. Tidying keeps us safe.';
 if(t==='one')m='Each person needs their own cup. Three friends, three cups.';
 if(t==='pile')m='Two cups in one place leaves someone with none. One cup each.';
 if(t==='choc')m='Chocolate makes dogs very poorly. Dogs eat dog food.';
 if(t==='sweet')m='Sweets are not good for dogs. Dogs eat dog food.';
 if(t==='knife')m='Sharp knives are for grown-ups. Washing potatoes is a job for you.';
 if(t==='hot')m='Hot pans can burn. Pick a cool, safe job like washing.';
 if(t==='away')m='Walking away leaves the mess. Help wipe it up.';
 if(t==='laugh')m='Laughing can make your friend sad. Help instead.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run1++;A.win()}else{run1=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run1+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
