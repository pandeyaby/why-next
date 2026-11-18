/* Flagship – saying please and thank you (ages 2–3; EYFS Development Matters PSED birth–3 and 3–4 "develop friendships
   with other children", "talk with others to solve conflicts", with "please" and "thank you" modelled by adults; Birth
   to 5 Matters PSED "making relationships"; EYFS ELG Building Relationships). Five hands-on scenes: sort asking moments
   (please) from getting moments (thank you), put two little stories in order (ask, get, thank), see how a friend feels
   when you grab, shout or ask kindly, hunt for thank-you moments that are help and not presents, and answer "not now"
   without treating please as a magic word. Not flagshare (taking turns) or flagfeel (naming feelings). Data in
   learn/please_art.js. */
(()=>{const {SORT,SAYS,WHY,STORY,SHOW,PALS,WAYS,MOOD,HUNT,HNO,ASKS,ODD,QS}=PLZ;
VIS.reg('flagplease',c=>{let A,keys,qbox,turn=-1,era=0;const S={};c.fig.classList.add('young');
const INK='#111827',OK='#047857',NO='#b91c1c',LINE='#6b7280',PICK='#7c3aed',F='px system-ui,sans-serif';
const where=()=>['sort','story','pals','hunt','reply','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.16);
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function label(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}
 const h=n+16,L=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(L,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ok||o.no||o.on?3:1.5;g.strokeStyle=o.ok?OK:o.no?NO:o.on?PICK:LINE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,L+w/2,y+1);return{x:L,y:y-h/2,w,h}}
function lines(t,max,g){const ws=t.split(' '),out=[''];ws.forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>max&&out[out.length-1])out.push(w);else out[out.length-1]=s});return out}
function card(r,e,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.dim?'#e5e7eb':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.ok?OK:o.no?NO:o.on?PICK:LINE;g.stroke();g.textAlign='center';g.textBaseline='middle';
 const big=Math.min(r.h*.36,r.w*.4);g.font=`${Math.round(big)}${F}`;g.fillStyle='#000';g.fillText(e,r.x+r.w/2,r.y+r.h*.32);
 const n=Math.round(Math.max(11,Math.min(sz(15),r.h*.14)));g.font=`800 ${n}${F}`;g.fillStyle=INK;const L=lines(t,r.w-10,g).slice(0,3);
 L.forEach((s,j)=>g.fillText(s,r.x+r.w/2,r.y+r.h*.7+(j-(L.length-1)/2)*(n+3),r.w-8));
 if(o.ok||o.no){g.fillStyle=o.ok?OK:NO;g.beginPath();g.arc(r.x+r.w-13,r.y+13,11,0,7);g.fill();g.fillStyle='#ffffff';g.font=`900 13${F}`;g.fillText(o.ok?'✓':'✗',r.x+r.w-13,r.y+14)}}
function grid(n,cols,top,bot){const gap=10,rows=Math.ceil(n/cols),w=Math.min(170,(A.W-gap*(cols+1))/cols),h=Math.min(w*1.05,(bot-top-gap*(rows-1))/rows),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bars(n,top,bot){const gap=10,h=Math.max(48,Math.min(70,(bot-top-gap*(n-1))/n)),w=Math.min(A.W-24,460);return Array.from({length:n},(_,j)=>({j,x:(A.W-w)/2,y:top+j*(h+gap),w,h}))}
function bar(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,r.h/2);g.fill();g.lineWidth=o.no?4:2;g.strokeStyle=o.no?NO:LINE;g.stroke();
 g.fillStyle=INK;g.font=`800 ${sz(15)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-16)}
/* 1. please or thank you */
function bub(k){const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.1,w,h:A.H*.3}}
const sortCards=()=>grid(6,3,A.H*.46,A.H*.98);
function drawSort(){const s=S.a,g=A.ctx;paper();
 SAYS.forEach(([e,t,why],k)=>{const r=bub(k);g.fillStyle=k?(A.col.dark?'#713f12':'#fde68a'):(A.col.dark?'#1e3a8a':'#bfdbfe');A.paint.rrect(r.x,r.y,r.w,r.h,22);g.fill();
  g.lineWidth=s.hot===k?4:2;g.strokeStyle=s.hot===k?PICK:LINE;g.stroke();g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.dark?'#f9fafb':INK;
  g.font=`900 ${sz(17)}${F}`;g.fillText(e+' '+t,r.x+r.w/2,r.y+r.h*.22,r.w-12);g.font=`700 ${sz(12)}${F}`;g.fillText('when '+why,r.x+r.w/2,r.y+r.h*.42,r.w-12);
  const ins=s.placed.filter(i=>SORT[i][2]===k);g.font=`${Math.round(Math.min(r.h*.24,r.w/4.4))}${F}`;g.fillStyle='#000';ins.forEach((i,j)=>g.fillText(SORT[i][0],r.x+r.w*(.25+j*.25),r.y+r.h*.75))});
 sortCards().forEach(r=>{if(s.placed.includes(r.i)||(S.drag&&S.drag.i===r.i))return;card(r,SORT[r.i][0],SORT[r.i][1],{no:s.bad===r.i,on:s.pick===r.i})});
 if(S.drag){const d=S.drag,r=sortCards()[d.i];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},SORT[d.i][0],SORT[d.i][1],{on:1})}
 label(s.placed.length>=6?'All 6 sorted':'Asking or getting?',A.W/2,A.H*.045,{n:13,ok:s.placed.length>=6})}
function put(i,k,live){const s=S.a;if(s.placed.includes(i))return;s.pick=null;
 if(SORT[i][2]!==k){s.bad=i;A.sound.miss();return say(`Not ${SAYS[k][1].toLowerCase()} this time. ${WHY[i]}`)}
 s.placed.push(i);s.bad=-1;A.sound.pop();say(WHY[i]+(s.placed.length>=6?' All 6 sorted: please when you ask, thank you when you get.':` ${s.placed.length} of 6.`))}
/* 2. ask, get, thank */
function slotR(j){const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.13,w,h:A.H*.36}}
const storyCards=()=>grid(3,3,A.H*.6,A.H*.97);
function drawStory(){const s=S.b,g=A.ctx;paper();
 if(s.r>=2){label('Both stories in order',A.W/2,A.H*.08,{n:14,ok:1});label('🙋 Ask with please → 🎁 Get it → 😊 Thank you',A.W/2,A.H*.4,{n:14});label('Thank you comes AFTER you get it',A.W/2,A.H*.66,{n:13,ok:1});return}
 const st=STORY[s.r];label(`Story ${s.r+1} of 2: what comes ${['first','next','last'][Math.min(2,s.got.length)]}?`,A.W/2,A.H*.05,{n:13});
 for(let j=0;j<3;j++){const r=slotR(j);if(j<s.got.length)card(r,st[j][0],st[j][1],{ok:1});else{g.setLineDash([7,6]);g.lineWidth=3;g.strokeStyle=A.col.dark?'#e5e7eb':'#374151';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.setLineDash([]);
  g.font=`900 ${sz(26)}${F}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(String(j+1),r.x+r.w/2,r.y+r.h/2)}}
 storyCards().forEach(r=>{const real=SHOW[r.i];if(s.got.includes(real)||(S.drag&&S.drag.i===r.i))return;card(r,st[real][0],st[real][1],{no:s.bad===real})});
 if(S.drag){const d=S.drag,r=storyCards()[d.i],x=st[SHOW[d.i]];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},x[0],x[1],{on:1})}}
function place(j){const s=S.b;if(s.r>=2)return;const real=SHOW[j],need=s.got.length;if(s.got.includes(real))return;
 if(real!==need){s.bad=real;A.sound.miss();return say(real===2?'Thank you comes after you get it. First, ask with please.':need===0?'First you ask. Find the card that says please.':'Next, you get it. Then you say thank you.')}
 s.got.push(real);s.bad=-1;A.sound.pop();
 if(s.got.length<3)return say(`${STORY[s.r][real][1]}. That is number ${need+1}.`);
 s.r++;s.got=[];say(s.r>=2?'Both stories done: ask with please, get it, then say thank you.':'Story 1 done. Now story 2: asking for help.')}
/* 3. how does my friend feel? */
const wayOrder=()=>{const k=S.c.r%3;return WAYS.slice(k).concat(WAYS.slice(0,k))};
const wayBars=()=>bars(3,A.H*.5,A.H*.97);
function drawPals(){const s=S.c,g=A.ctx;paper();
 if(s.r>=3){label('All 3 friends are smiling',A.W/2,A.H*.08,{n:14,ok:1});g.font=`${Math.round(A.H*.2)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';
  PALS.forEach((p,j)=>g.fillText(p[0],A.W*(.22+j*.28),A.H*.42));label('Kind words make friends happy',A.W/2,A.H*.75,{n:14,ok:1});return}
 const [e,name,thing,what]=PALS[s.r];label(`${name} has ${what}. You want it.`,A.W/2,A.H*.05,{n:13});
 g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.font=`${Math.round(A.H*.2)}${F}`;g.fillText(e,A.W*.4,A.H*.27);g.font=`${Math.round(A.H*.11)}${F}`;g.fillText(thing,A.W*.6,A.H*.31);
 if(s.mood){g.font=`${Math.round(A.H*.12)}${F}`;g.fillText(MOOD[s.mood],A.W*.4+A.H*.13,A.H*.15)}
 wayBars().forEach((r,j)=>{const w=wayOrder()[j];bar(r,w[0]+' '+w[1],{no:s.mood===w[2]})})}
function choose(tag){const s=S.c;if(s.r>=3)return;const [,name,,what]=PALS[s.r];
 if(tag!=='kind'){s.mood=tag;A.sound.miss();return say(tag==='grab'?`${name} feels sad. Grabbing takes it away. Try asking.`:`${name} feels cross. Shouting is not kind. Try asking.`)}
 s.r++;s.mood=null;A.sound.pop();say(`${name} smiles and gives you ${what}. Kind words, please, make ${name} happy. Now say thank you!`+(s.r>=3?' All 3 friends smiling.':''))}
/* 4. thank-you hunt */
const huntCards=()=>grid(6,3,A.H*.13,A.H*.98);
function drawHunt(){const s=S.d;paper();label(s.got.length>=4?'All 4 thank-you times found':`Thank-you times: ${s.got.length} of 4`,A.W/2,A.H*.05,{n:13,ok:s.got.length>=4});
 huntCards().forEach(r=>{const h=HUNT[r.i];card(r,h[0],h[1],{ok:s.got.includes(r.i),no:s.bad===r.i,dim:s.got.length>=4&&!h[2]})})}
function spot(i){const s=S.d;if(s.got.includes(i)||s.got.length>=4)return;const [,t,yes]=HUNT[i];
 if(!yes){s.bad=i;A.sound.miss();return say(HNO[t])}
 s.got.push(i);s.bad=-1;A.sound.pop();say(`${t}: say thank you.`+(i===1||i===3||i===5?' That is help, not a present, and help gets a thank you too.':'')+(s.got.length>=4?' All 4 found.':''))}
/* 5. please is not magic */
const replyOpts=()=>{const s=S.e,k=s.r%3,odd=[ODD[k],ODD[(k+1)%3]],all=[[ASKS[s.r][3],'ok'],...odd],z=s.r%3;return all.slice(z).concat(all.slice(0,z))};
const replyBars=()=>bars(3,A.H*.52,A.H*.97);
function drawReply(){const s=S.e,g=A.ctx;paper();
 if(s.r>=3){label('All 3 answered kindly',A.W/2,A.H*.08,{n:14,ok:1});label('Yes → Thank you!',A.W/2,A.H*.32,{n:14});label('Not now → Okay.',A.W/2,A.H*.5,{n:14});label('Wait → I will wait.',A.W/2,A.H*.68,{n:14});return}
 const [e,ask,rep]=ASKS[s.r];label(`Ask ${s.r+1} of 3`,A.W/2,A.H*.05,{n:12});
 g.font=`${Math.round(A.H*.1)}${F}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText('🧒',A.W*.12,A.H*.18);g.fillText('👩',A.W*.12,A.H*.38);
 label(`${e} ${ask}`,A.W*.55,A.H*.18,{n:15,bg:'#dbeafe'});label(rep,A.W*.55,A.H*.38,{n:15,bg:'#fef9c3'});
 replyBars().forEach((r,j)=>{const o=replyOpts()[j];bar(r,o[0],{no:s.bad===o[1]})})}
function reply(tag){const s=S.e;if(s.r>=3)return;
 if(tag!=='ok'){s.bad=tag;A.sound.miss();return say(tag==='magic'?'Please is kind words, not a magic word. Saying it louder does not change the answer.':tag==='cross'?'Crying and stamping does not help. Say okay, and you can ask again later.':'Grabbing is not kind, even after please. Say okay, or wait.')}
 const done=ASKS[s.r][3];s.r++;s.bad=null;A.sound.pop();say(`${done} That is a kind answer.`+(s.r>=3?' Please does not always mean yes, and that is okay.':''))}
function draw(){const k=where();if(k==='quiz'){paper();label('Challenge',A.W/2,A.H*.16,{ok:1});label('🙏 Please to ask · 💛 Thank you after',A.W/2,A.H*.5,{n:14});return}
 ({sort:drawSort,story:drawStory,pals:drawPals,hunt:drawHunt,reply:drawReply})[k]();A.fx.draw(A.ctx)}
function down(p){const k=where();
 if(k==='sort'){const r=sortCards().find(r=>inR(p,r)&&!S.a.placed.includes(r.i));if(r){S.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const b=[0,1].find(k=>inR(p,bub(k)));if(b!=null&&S.a.pick!=null)put(S.a.pick,b,1);return false}
 if(k==='story'&&S.b.r<2){const r=storyCards().find(r=>inR(p,r)&&!S.b.got.includes(SHOW[r.i]));if(r){S.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='pals'){const r=wayBars().find(r=>inR(p,r));if(r)choose(wayOrder()[r.j][2]);return false}
 if(k==='hunt'){const r=huntCards().find(r=>inR(p,r));if(r)spot(r.i);return false}
 if(k==='reply'&&S.e.r<3){const r=replyBars().find(r=>inR(p,r));if(r)reply(replyOpts()[r.j][1]);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;if(where()==='sort'){const h=[0,1].find(k=>inR(p,bub(k)));S.a.hot=h==null?-1:h}A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=where();
 if(k==='sort'){S.a.hot=-1;const b=[0,1].find(k=>inR(p,bub(k)));if(b!=null)return put(d.i,b,1);if(tap){S.a.pick=d.i;return say(`${SORT[d.i][1]}: picked. Now tap Please or Thank you.`)}A.redraw();return}
 if(k==='story'){if(tap||[0,1,2].some(j=>inR(p,slotR(j))))place(d.i);else A.redraw()}}
function reset(){era++;for(const k in S)delete S[k];Object.assign(S,{a:{placed:[],bad:-1,hot:-1,pick:null},b:{r:0,got:[],bad:-1},c:{r:0,mood:null},d:{got:[],bad:-1},e:{r:0,bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keypad();S.hook()}
const gate=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){reset();say(desc);S.hook=gate(i,ok,msg)}
function run(i,acts,ms){steps[i].go();const e0=era;acts.forEach((f,j)=>setTimeout(()=>{if(e0===era)f()},ms*(j+1)))}
function keypad(){if(!keys)return;keys.innerHTML='';const k=where(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='sort')SORT.forEach((x,i)=>{if(!S.a.placed.includes(i)){B(`${x[0]} ${x[1]} → 🙏`,()=>put(i,0,1),`${x[1]}: say please`);B(`${x[0]} ${x[1]} → 💛`,()=>put(i,1,1),`${x[1]}: say thank you`)}});
 if(k==='story'&&S.b.r<2)SHOW.forEach((real,j)=>{if(!S.b.got.includes(real)){const x=STORY[S.b.r][real];B(`${x[0]} ${x[1]}`,()=>place(j),`Put ${x[1]} next in the story`)}});
 if(k==='pals'&&S.c.r<3)wayOrder().forEach(w=>B(`${w[0]} ${w[1]}`,()=>choose(w[2])));
 if(k==='hunt'&&S.d.got.length<4)HUNT.forEach((h,i)=>{if(!S.d.got.includes(i))B(`${h[0]} ${h[1]}`,()=>spot(i),`${h[1]}: is it a thank-you time?`)});
 if(k==='reply'&&S.e.r<3)replyOpts().forEach(o=>B(o[0],()=>reply(o[1]),`Answer: ${o[0]}`))}
const steps=[
{h:'Please or thank you?',p:'Please is for asking. Thank you is for when you get something. Drag each picture to Please or Thank you, or tap it and then tap a bubble.',
 task:'Sort all 6 pictures',show:()=>run(0,[[0,0],[1,1],[2,0],[3,1],[4,0],[5,1]].map(([i,k])=>()=>put(i,k)),600),
 go:()=>open(0,'Two bubbles: Please and Thank you. Six pictures to sort.',()=>S.a.placed.length>=6,'I want milk, a go, the crayon: please. Gran, Dad and Sam gave or helped: thank you.')},
{h:'Ask, get, thank',p:'Put each little story in order. What happens first, next and last? Drag a card to the numbers, or tap it.',
 predict:{q:'When do you say thank you?',opts:['Before I get it','After I get it'],ans:1},task:'Put both stories in order',
 show:()=>run(1,[1,2,0,1,2,0].map(j=>()=>place(j)),650),
 go:()=>open(1,'Three empty boxes: 1, 2, 3. Three cards: Apple please, Mum gives it, Thank you.',()=>S.b.r>=2,'First you ask with please. Then you get it. Then you say thank you.')},
{h:'How does my friend feel?',p:'Your friend has something you want. Tap a way to get it. Watch your friend\'s face.',
 predict:{q:'If you grab the ball, how will Bear feel?',opts:['Fine, Bear will not mind','Sad'],ans:1},task:'Make all 3 friends smile',
 show:()=>run(2,[0,1,2].map(()=>()=>choose('kind')),700),
 go:()=>open(2,'Bear has the ball. Three ways: grab it, shout mine, or ask with please.',()=>S.c.r>=3,'Grabbing made Bear sad and shouting made Bear cross. Asking with please made all 3 friends smile.')},
{h:'Thank you for help',p:'Tap every time you would say thank you. Look out: help counts too, not just presents.',
 predict:{q:'Dad holds the door for you. It is not a present. Do you say thank you?',opts:['No, only for presents','Yes, for help too'],ans:1},task:'Find all 4 thank-you times',
 show:()=>run(3,[0,1,3,5].map(i=>()=>spot(i)),650),
 go:()=>open(3,'Six pictures. Which ones get a thank you?',()=>S.d.got.length>=4,'A present, the door, the plaster and the cereal all get a thank you. Help counts too.')},
{h:'Please is not magic',p:'You ask with please. A grown-up answers. Tap a kind thing to say back.',
 predict:{q:'You say please. Will the answer always be yes?',opts:['Yes, please is magic','No, sometimes it is not now'],ans:1},task:'Answer all 3 kindly',
 show:()=>run(4,[0,1,2].map(()=>()=>reply('ok')),700),
 go:()=>open(4,'You ask: Biscuit, please? Mum says: Not now. It is nearly dinner.',()=>S.e.r>=3,'Yes gets a thank you. Not now gets okay. Wait gets I will wait. Please is kind, not magic.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function why(t){let m='Think: are you asking for something, or did you just get something?';
 if(t==='order')m='Please is for asking. Thank you is for after you get it.';
 if(t==='grab')m='Grabbing or shouting makes a friend sad or cross. Ask with please, then wait.';
 if(t==='thing')m='Say thank you for help too, not just for presents.';
 if(t==='magic')m='Please is kind words, but it is not magic. Sometimes the answer is not now. Say okay.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:B=>{qbox.hidden=B.step!==5;keys.hidden=B.step===5;keypad()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Please and thank you buttons'},box);qbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keypad()}}).start()})})();
