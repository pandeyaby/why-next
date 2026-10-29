/* Flagship – vocabulary for understanding others (ages 5–8): drop facts about Mia and Raj into a Venn diagram to find
   what is similar and what is different; sort replies to Leo's dropped ice cream into empathy (feeling with) and sympathy
   (feeling sorry for); sit in each seat round a picture block to see that perspective depends on where you are; give
   swing turns so it is fair; bring Sofi into the class community with caring, kind actions; then a word challenge. */
(()=>{const mn=Math.min,hy=Math.hypot;
const FACTS=[['🎂','is 7',2],['🍕','loves pizza',0],['🏏','plays cricket',1],['🐶','has a dog',2],['👓','wears glasses',0],['🗣️','speaks 2 languages',1]];
const ZONE=['only Mia','both: similar','only Raj'];
const SAYS=[['“I’d be sad too. Want some of mine?”',0],['“Oh dear, poor you.”',1],['“That looks hard. Are you OK?”',0],['“What a shame.” (and walks on)',1]];
const SEATS=[['Ava','🐱','a cat'],['Ben','🐶','a dog'],['Cleo','⭐','a star']];
const KIDS=['Zara','Tom','Isla'];
const ACTS=[['👋 Say hi and learn her name',1,'Sofi smiles. Using her name says “you matter here”.'],['😂 Laugh at how she talks',0,'Laughing at her makes Sofi feel she does not belong. Kind words pull people in.'],['🗺️ Show her where things are',1,'Sofi knows where to go now. Caring means helping before she has to ask.'],['🙈 Wait for her to ask',0,'Sofi is shy and new. Waiting leaves her outside. Inclusion means inviting her in.']];
VIS.reg('flagothers',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,want:()=>{},fact:0,put:[],bad:-1,say:0,said:[],me:-1,sat:{},turns:[],acts:[],hand:null};
const now=()=>['venn','feel','seat','turns','join','quiz'][A.step];
function voice(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const k=n=>Math.round(n*(A.narrow?1:1.15));
function T(g,t,x,y,n,col,w,al){g.font=`${w||700} ${k(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke()}
const hit=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// Venn: two circles; zone from horizontal position inside them
const ring=i=>({x:A.W*(i?.62:.38),y:A.H*.36,r:mn(A.W*.26,A.H*.3)});
const zoneAt=p=>{const a=hy(p.x-ring(0).x,p.y-ring(0).y)<ring(0).r,b=hy(p.x-ring(1).x,p.y-ring(1).y)<ring(1).r;return a&&b?2:a?0:b?1:-1};
const spot=(z,j)=>({x:z===2?A.W*.5:z===0?A.W*.24:A.W*.76,y:A.H*.26+j*k(26)});
const card=()=>({x:A.W*.2,y:A.H*.76,w:A.W*.6,h:A.H*.16});
const bubble=()=>({x:A.W*.12,y:A.H*.4,w:A.W*.76,h:A.H*.18});
const pan=i=>({x:8+i*(A.W/2),y:A.H*.64,w:A.W/2-16,h:A.H*.33});
const table=()=>({x:A.W*.5,y:A.H*.36}),chair=i=>[{x:A.W*.5,y:A.H*.66},{x:A.W*.5,y:A.H*.08},{x:A.W*.84,y:A.H*.36}][i];
const kidAt=i=>({x:A.W*(.2+i*.3),y:A.H*.7});
const ringJ=()=>({x:A.W*.5,y:A.H*.3,r:mn(A.W*.3,A.H*.24)}),act=i=>A.narrow?{x:8,y:A.H*.6+i*A.H*.1,w:A.W-16,h:A.H*.085}:{x:8+(i%2)*(A.W/2),y:A.H*.64+Math.floor(i/2)*A.H*.17,w:A.W/2-16,h:A.H*.14};
function draw(A){const{ctx:g,W,H,col:C}=A,v=now();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){T(g,'empathy · sympathy · perspective',W/2,H*.32,15,C.tx,800);T(g,'similar · different · fair',W/2,H*.5,15,C.tx,800);T(g,'kind · care · community',W/2,H*.68,15,C.tx,800);return}
 if(v==='venn'){[0,1].forEach(i=>{const R=ring(i);g.fillStyle=A.alpha(i?C.cy:C.pk,.16);g.beginPath();g.arc(R.x,R.y,R.r,0,7);g.fill();g.strokeStyle=S.bad===i?C.rd:C.tx;g.lineWidth=S.bad===i?3:1.5;g.stroke()});
  T(g,'👧 Mia',W*.2,H*.06,13,C.tx,800);T(g,'👦 Raj',W*.8,H*.06,13,C.tx,800);T(g,'similar',W/2,H*.06,11,C.tx,800);
  S.put.forEach(([i,z],j)=>{const q=spot(z,S.put.filter((x,m)=>m<j&&x[1]===z).length);T(g,FACTS[i][0],q.x,q.y,18)});
  if(S.fact<FACTS.length){let r=card();if(S.hand)r={...r,x:S.hand.x-r.w/2,y:S.hand.y-r.h/2};box(g,r,A.alpha(C.or,.3),C.tx);T(g,FACTS[S.fact][0]+' '+FACTS[S.fact][1],r.x+r.w/2,r.y+r.h/2,13,C.tx,800);
   if(!S.hand)T(g,`Who ${FACTS[S.fact][1]}? Drag me.`,W/2,H*.71,11,C.tx,600)}}
 if(v==='feel'){T(g,'🍦💥 Leo dropped his ice cream. 😢',W/2,H*.08,14,C.tx,800);
  ['🫶 Empathy: I feel WITH you','😔 Sympathy: I feel SORRY FOR you'].forEach((t,i)=>{const r=pan(i);box(g,r,A.alpha(i?C.vi:C.gr,.13),S.bad===i?C.rd:C.tx,S.bad===i?3:1.5);T(g,t.slice(0,2),r.x+r.w/2,r.y+k(16),18);T(g,t.slice(3).split(':')[0],r.x+r.w/2,r.y+k(38),12,C.tx,800);T(g,t.split(': ')[1],r.x+r.w/2,r.y+k(56),10,C.tx,600);
   T(g,`${S.said.filter(x=>x===i).length} here`,r.x+r.w/2,r.y+r.h-k(14),10,C.tx,600)});
  if(S.say<SAYS.length){let r=bubble();if(S.hand)r={...r,x:S.hand.x-r.w/2,y:S.hand.y-r.h/2};box(g,r,A.alpha(C.cy,.2),C.tx);T(g,SAYS[S.say][0],r.x+r.w/2,r.y+r.h/2,12,C.tx,700)}else T(g,'All sorted!',W/2,H*.48,15,C.gr,800)}
 if(v==='seat'){const t=table();g.fillStyle=A.alpha(C.am,.35);g.beginPath();g.ellipse(t.x,t.y,W*.22,H*.14,0,0,7);g.fill();g.fillStyle=A.alpha(C.tx,.9);g.fillRect(t.x-k(14),t.y-k(14),k(28),k(28));
  T(g,'🐱',t.x,t.y+k(30),18);T(g,'🐶',t.x,t.y-k(30),18);T(g,'⭐',t.x+k(34),t.y,18);
  SEATS.forEach(([n],i)=>{const p=chair(i),me=S.me===i;g.fillStyle=A.alpha(me?C.or:C.cy,me?.6:.25);g.beginPath();g.arc(p.x,p.y,k(22),0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=S.sat[i]?3:1.5;g.stroke();T(g,me?'🧒':'🪑',p.x,p.y,16);T(g,n,p.x+(i===2?0:k(40)),p.y+(i===2?k(32):0),11,C.tx,800)});
  if(S.hand){g.fillStyle=A.alpha(C.or,.7);g.beginPath();g.arc(S.hand.x,S.hand.y,k(20),0,7);g.fill();T(g,'🧒',S.hand.x,S.hand.y,16)}else if(S.me<0)T(g,'🧒 drag me to a seat',W*.2,H*.92,11,C.tx,700);
  if(S.me>=0){const[n,e,w]=SEATS[S.me];box(g,{x:8,y:H*.8,w:W-16,h:H*.17},A.alpha(C.vi,.14),C.vi);T(g,`From ${n}’s seat you see ${w} ${e}`,W/2,H*.885,13,C.tx,800)}}
 if(v==='turns'){T(g,'🛝 Swing',W/2,H*.12,16,C.tx,800);const n=S.turns.length;T(g,`Turns given: ${n} of 6`,W/2,H*.24,12,C.tx,700);
  KIDS.forEach((nm,i)=>{const p=kidAt(i),c=S.turns.filter(x=>x===i).length;g.fillStyle=A.alpha(S.bad===i?C.rd:C.cy,.2);g.beginPath();g.arc(p.x,p.y,k(34),0,7);g.fill();g.strokeStyle=S.bad===i?C.rd:C.tx;g.lineWidth=2;g.stroke();
   T(g,['👧🏾','👦','👧'][i],p.x,p.y-k(4),24);T(g,nm,p.x,p.y+k(48),12,C.tx,800);T(g,'⭐'.repeat(c)||'no turn yet',p.x,p.y+k(66),11,C.tx,600)});
  if(n)T(g,`${KIDS[S.turns[n-1]]} is on the swing`,W/2,H*.38,13,C.gr,800)}
 if(v==='join'){const R=ringJ(),near=S.acts.filter(i=>ACTS[i][1]).length;g.fillStyle=A.alpha(C.gr,.15);g.beginPath();g.arc(R.x,R.y,R.r,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  T(g,'Class 2 community',R.x,R.y-R.r*.62,11,C.tx,800);T(g,'🧒👧🧑🏽👦',R.x,R.y-R.r*.2,20);const sx=R.x+R.r*(1.35-near*.6),sy=R.y+R.r*.3;T(g,near>=2?'👧🏻😊':'👧🏻',mn(W-20,sx),sy,22);T(g,'Sofi',mn(W-20,sx),sy+k(20),11,C.tx,800);
  ACTS.forEach(([t],i)=>{if(S.acts.includes(i)&&ACTS[i][1]&&!(S.hand&&S.hand.i===i))return;let r=act(i);if(S.hand&&S.hand.i===i)r={...r,x:S.hand.x-r.w/2,y:S.hand.y-r.h/2};box(g,r,A.alpha(S.bad===i?C.rd:C.or,.25),S.bad===i?C.rd:C.tx);T(g,t,r.x+r.w/2,r.y+r.h/2,11,C.tx,700)})}
 A.fx.draw(g)}
const bad=t=>{A.sound.miss();voice(t);keys();A.redraw()},good=t=>{A.sound.pop();voice(t);keys();A.redraw();S.want()};
function place(z){S.hand=null;if(S.fact>=FACTS.length||z<0)return A.redraw();const[e,t,ok]=FACTS[S.fact];
 if(z!==ok){S.bad=z===2?2:z;return bad(ok===2?`Both of them ${t}. Something you share goes in the middle: it is similar.`:`Only ${ok?'Raj':'Mia'} ${t}. It goes on ${ok?'Raj':'Mia'}’s side: it is a difference.`)}
 S.bad=-1;S.put.push([S.fact,z]);S.fact++;good(ok===2?`${e} Both ${t}: similar.`:`${e} Only ${ok?'Raj':'Mia'} ${t}: different.`)}
function sortSay(b){S.hand=null;if(S.say>=SAYS.length||b<0)return A.redraw();const[t,ok]=SAYS[S.say];
 if(b!==ok){S.bad=b;return bad(ok?`${t} feels sorry for Leo from outside. That is sympathy, not empathy.`:`${t} imagines Leo’s feeling and stays with him. That is empathy: feeling with him.`)}
 S.bad=-1;S.said.push(b);S.say++;good(ok?`Sympathy: ${t}`:`Empathy: ${t}`)}
function sit(i){S.hand=null;if(i<0)return A.redraw();S.me=i;S.sat[i]=1;good(`From ${SEATS[i][0]}’s seat you see ${SEATS[i][2]}. Same block, different perspective.`)}
function turn(i){const c=KIDS.map((_,j)=>S.turns.filter(x=>x===j).length),lo=Math.min(...c);if(S.turns.length>=6)return;
 if(c[i]>lo){S.bad=i;return bad(`${KIDS[i]} has had ${c[i]} turn${c[i]>1?'s':''}, but ${KIDS[c.indexOf(lo)]} has had ${lo}. Fair means everyone gets a go before anyone gets more.`)}
 S.bad=-1;S.turns.push(i);good(`${KIDS[i]} has a turn. Fair: everyone waits the same.`)}
function doAct(i){S.hand=null;if(i<0||S.acts.includes(i))return A.redraw();const[,ok,m]=ACTS[i];if(!ok){S.bad=i;return bad(m)}S.bad=-1;S.acts.push(i);good(m)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=now(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='venn'&&S.fact<FACTS.length){c.el('p',{class:'fl-tk'},ctl,`${FACTS[S.fact][0]} Who ${FACTS[S.fact][1]}?`);B('👧 Only Mia',()=>place(0));B('🤝 Both: similar',()=>place(2));B('👦 Only Raj',()=>place(1))}
 if(v==='feel'&&S.say<SAYS.length){B('🫶 Empathy',()=>sortSay(0));B('😔 Sympathy',()=>sortSay(1))}
 if(v==='seat')SEATS.forEach(([n],i)=>B('🪑 Sit in '+n+'’s seat',()=>sit(i)));
 if(v==='turns'&&S.turns.length<6)KIDS.forEach((n,i)=>B('🛝 Turn for '+n,()=>turn(i)));
 if(v==='join')ACTS.forEach(([t],i)=>{if(!(S.acts.includes(i)&&ACTS[i][1]))B(t,()=>doAct(i),'Try: '+t.slice(3))});A.redraw()}
function down(p){const v=now();
 if(v==='venn'&&S.fact<FACTS.length&&hit(p,card())){S.hand={x:p.x,y:p.y};return true}
 if(v==='feel'&&S.say<SAYS.length&&hit(p,bubble())){S.hand={x:p.x,y:p.y};return true}
 if(v==='seat'){const m=S.me>=0?chair(S.me):{x:A.W*.2,y:A.H*.92};if(hy(p.x-m.x,p.y-m.y)<k(40)||S.me<0&&p.y>A.H*.84){S.hand={x:p.x,y:p.y};return true}const i=[0,1,2].find(i=>hy(p.x-chair(i).x,p.y-chair(i).y)<k(30));if(i!=null)sit(i);return false}
 if(v==='turns'){const i=[0,1,2].find(i=>hy(p.x-kidAt(i).x,p.y-kidAt(i).y)<k(40));if(i!=null)turn(i);return false}
 if(v==='join'){const i=ACTS.findIndex((_,i)=>!(S.acts.includes(i)&&ACTS[i][1])&&hit(p,act(i)));if(i>=0){S.hand={i,x:p.x,y:p.y};return true}}return false}
function move(p){if(S.hand){S.hand.x=p.x;S.hand.y=p.y;A.redraw()}}
function up(p){const v=now();if(!S.hand)return;
 if(v==='venn')return place(zoneAt(p));
 if(v==='feel')return sortSay([0,1].find(i=>hit(p,pan(i)))??-1);
 if(v==='seat')return sit([0,1,2].find(i=>hy(p.x-chair(i).x,p.y-chair(i).y)<k(40))??-1);
 if(v==='join'){const R=ringJ();return doAct(hy(p.x-R.x,p.y-R.y)<R.r*1.3?S.hand.i:-1)}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const auto=(fs,ms)=>{const t=++S.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(t===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const wipe=()=>{S.tok++;Object.assign(S,{want:()=>{},fact:0,put:[],bad:-1,say:0,said:[],me:-1,sat:{},turns:[],acts:[],hand:null})};
const steps=[
{h:'Similar and different',p:'Similar means alike in some way. Different means not the same. Drag each fact into the circles: Mia’s side, Raj’s side, or the middle if both share it.',
 predict:{q:'Mia and Raj are different in lots of ways. Can they be similar too?',opts:['No, different means not alike at all','Yes, people can be both'],ans:1},task:'Place all six facts',
 show:()=>{steps[0].go();auto(FACTS.map(f=>()=>place(f[2])),450)},go:()=>{wipe();voice('Drag the fact into Mia’s circle, Raj’s circle, or the middle.');keys();S.want=fin(0,()=>S.fact>=6,'Two people can be similar and different at the same time.')}},
{h:'Empathy or sympathy?',p:'Empathy is feeling WITH someone: you imagine their feeling and stay. Sympathy is feeling SORRY FOR them. Drag each reply into a box.',
 predict:{q:'Is feeling sorry for Leo the same as empathy?',opts:['Yes, it is the same','No, empathy is feeling with him'],ans:1},task:'Sort all four replies',
 show:()=>{steps[1].go();auto(SAYS.map(s=>()=>sortSay(s[1])),500)},go:()=>{wipe();voice('Leo dropped his ice cream. Drag the reply to empathy or sympathy.');keys();S.want=fin(1,()=>S.say>=4,'Empathy says: I can imagine how you feel, and I am here.')}},
{h:'Perspective',p:'A picture block has a different picture on each side. Drag yourself into each seat. What you see depends on where you sit.',
 predict:{q:'Ava sees a cat. Ben sits on the other side. What does Ben see?',opts:['A cat, like Ava','Something different'],ans:1},task:'Sit in all three seats',
 show:()=>{steps[2].go();auto([0,1,2].map(i=>()=>sit(i)),600)},go:()=>{wipe();voice('Drag yourself to Ava’s, Ben’s or Cleo’s seat.');keys();S.want=fin(2,()=>Object.keys(S.sat).length>=3,'Your perspective is how things look from where you are.')}},
{h:'Fair turns',p:'Fair means everyone gets an equal chance. Tap who goes on the swing next. Give six turns, fairly.',task:'Give six fair turns',
 show:()=>{steps[3].go();auto([0,1,2,0,1,2].map(i=>()=>turn(i)),400)},go:()=>{wipe();voice('Tap Zara, Tom or Isla to give a turn on the swing.');keys();S.want=fin(3,()=>S.turns.length>=6,'Two turns each: that is fair.')}},
{h:'Community and belonging',p:'A community is a group of people who share a place, like a class. Sofi is new. Drag kind, caring actions into the circle so she belongs.',task:'Bring Sofi into the class',
 show:()=>{steps[4].go();auto([0,2].map(i=>()=>doAct(i)),600)},go:()=>{wipe();voice('Drag an action into the class circle.');keys();S.want=fin(4,()=>S.acts.filter(i=>ACTS[i][1]).length>=2,'Sofi belongs now. Inclusion means everyone is part of the community.')}},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Mo says, “I’d be scared too. I’ll come with you.” That is…',[['empathy','ok'],['sympathy','sym'],['fair','fair']]],
 ['Ella and Kai both love drawing. In that way they are…',[['similar','ok'],['different','diff'],['a community','comm']]],
 ['Jo sees a duck in the picture. Sam, on the other side, sees a frog. This shows…',[['perspective','ok'],['empathy','emp'],['sympathy','sym2']]],
 ['Everyone gets one go before anyone has two. That is…',[['fair','ok'],['kind','kind'],['similar','sim']]],
 ['The people in your street who help each other are a…',[['community','ok'],['perspective','persp'],['fair','fair2']]],
 ['Ava helps a little boy find his mum. She is showing…',[['care','ok'],['perspective','persp2'],['different','diff2']]]];
function why(tag){let m='Think about what the word means.';
 if(tag==='sym')m='Sympathy is feeling sorry for someone. Mo imagines the fear and stays with them: that is empathy.';
 if(tag==='fair')m='Fair is about equal chances. Imagining someone’s fear and staying with them is empathy.';
 if(tag==='diff')m='Different means not the same. Both loving drawing is something they share: similar.';
 if(tag==='comm')m='A community is a group who share a place. Liking the same thing makes them similar.';
 if(tag==='emp')m='Empathy is about feelings. Seeing a different picture from where you sit is perspective.';
 if(tag==='sym2')m='Sympathy is feeling sorry for someone. Seeing different things from different sides is perspective.';
 if(tag==='kind')m='Kind is being gentle and helpful. Equal goes for everyone is the word fair.';
 if(tag==='sim')m='Similar means alike. Equal chances for everyone is fair.';
 if(tag==='persp')m='Perspective is how things look from one place. People who share a street and help each other are a community.';
 if(tag==='fair2')m='Fair is about equal chances. A group of people who share a place is a community.';
 if(tag==='persp2')m='Perspective is a point of view. Helping someone who needs it shows care.';
 if(tag==='diff2')m='Different means not the same. Looking after someone who needs help shows care.';
 return m}
function pose(){ask++;const[q,ops]=QS[ask%QS.length],r0=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(r0).concat(ops.slice(0,r0)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>judge(tag)});voice('Challenge: '+q);A.redraw()}
function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
