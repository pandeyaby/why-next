/* Flagship – patience and delayed gratification (ages 5–7; IB PYP PSPE self-management). Not flagwait (3–4, turns).
   Now-or-later choice, hide the treat, helpful tricks, patient words, wait or get help now. */
(()=>{
const TRICKS=[['Sing a song',1,'Singing keeps your mind busy.'],['Stare at the treat',0,'Looking at it makes you want it more.'],['Play with a toy',1,'Playing makes the time go faster.'],
['Keep asking “Now?”',0,'Asking again does not make it come sooner.'],['Count to 20',1,'Counting gives your mind a job.'],['Lick the treat',0,'Tasting it makes it very hard to stop.'],
['Take slow breaths',1,'Slow breaths help your body feel calm.'],['Poke at it',0,'Touching it keeps your mind on the treat.']];
const SCENE=[{at:'Ali is on the swing. You want a go.',o:[['Can I go next, please?',1],['Get off! My turn!',0,'Shouting can hurt, and Ali may not share.'],['Is it my go? My go? My go?',0,'Asking again does not stop the swing.']]},
{at:'Mum is on the phone. You want to tell her something.',o:[['Pull the phone away',0,'Mum needs to finish. That is grabbing.'],['Hand on her arm, then wait',1],['Shout “Mum! Mum! Mum!”',0,'Shouting makes it hard for Mum to listen.']]},
{at:'Zoe has the red car. You want it.',o:[['Grab the car',0,'Grabbing makes Zoe sad and starts a fight.'],['Cry and kick',0,'Kicking hurts. Big feelings are OK; use words.'],['Can I have it when you finish?',1]]}];
const CARDS=[['Your turn on the slide',0,'You can wait for this. Your turn will come.'],['You fell and your knee is bleeding',1,'You are hurt. Tell a grown-up now.'],['Dinner is nearly ready',0,'You can wait. It is coming soon.'],
['Someone is hurting you',1,'Do not wait. Tell a grown-up you trust right away.'],['A friend is talking',0,'Wait until your friend stops, then talk.'],['You feel very sick',1,'Being sick is not a wait time. Tell a grown-up now.']];
VIS.reg('flagpatient',c=>{let A,pad,quiz,qn=-1,ver=0;const W={};c.fig.classList.add('young');
const INK='#0f172a',OKC='#047857',BADC='#b91c1c',LINE='#64748b',SKY='#1d4ed8',BIS='#b45309',FAM='system-ui,sans-serif';
const font=(n,w)=>`${w||800} ${n}px ${FAM}`,up2=n=>A.narrow?n:Math.round(n*1.2),centre=g=>{g.textAlign='center';g.textBaseline='middle'};
const part=()=>['choose','hide','tricks','words','sort','chal'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const good=()=>A.sound.pop(),oops=()=>A.sound.miss();
function room(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=up2(o.n||14);g.font=font(n);let w=g.measureText(t).width+24;while(w>A.W-10&&n>10){n--;g.font=font(n);w=g.measureText(t).width+24}
const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?OKC:LINE;g.stroke();g.fillStyle=INK;centre(g);g.fillText(t,l+w/2,y+1)}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.ok||o.no||o.hold?3.5:1.5;g.strokeStyle=o.ok?OKC:o.no?BADC:o.hold?SKY:LINE;g.stroke();if(!t)return;
g.fillStyle=INK;let n=o.n||up2(15);g.font=font(n,700);const lines=[];let cur='';t.split(' ').forEach(wd=>{const tr=cur?cur+' '+wd:wd;if(g.measureText(tr).width>r.w-14&&cur){lines.push(cur);cur=wd}else cur=tr});lines.push(cur);
centre(g);const lh=n*1.2,y0=r.y+r.h/2-(lines.length-1)*lh/2;lines.forEach((ln,i)=>g.fillText(ln,r.x+r.w/2,y0+i*lh+1))}
function biscuit(x,y,r,bitten){const g=A.ctx;g.fillStyle='#fbbf24';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=BIS;g.lineWidth=2;g.stroke();g.fillStyle='#78350f';
[[-.35,-.2],[.3,-.3],[0,.25],[.35,.3],[-.3,.35]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*r,y+b*r,r*.1,0,7);g.fill()});if(bitten){g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.05:.45);g.beginPath();g.arc(x+r*.8,y-r*.6,r*.45,0,7);g.fill()}}
function meter(v,x,y,h,lab){const g=A.ctx,w=up2(26);g.fillStyle='#ffffff';A.paint.rrect(x,y,w,h,8);g.fill();g.strokeStyle=LINE;g.lineWidth=1.5;g.stroke();const f=Math.max(0,Math.min(1,v));
g.fillStyle=f>.6?'#dc2626':f>.3?'#f59e0b':'#10b981';A.paint.rrect(x+3,y+3+(h-6)*(1-f),w-6,(h-6)*f,5);g.fill();g.fillStyle=A.col.tx;g.font=font(up2(11),700);centre(g);g.fillText(lab,x+w/2,y+h+12)}
/* step 1: one now or two later */
function choiceR(){const w=Math.min(up2(150),(A.W-40)/2),h=up2(56),y=A.H*.72;return[{k:'now',x:A.W/2-w-8,y,w,h},{k:'wait',x:A.W/2+8,y,w,h}]}
function sandR(){const s=Math.min(up2(90),A.W*.26);return{x:A.W/2-s/2,y:A.H*.22,w:s,h:s*1.3}}
function drawChoose(){const s=W.c,g=A.ctx;room();note(s.tried.now&&s.tried.wait?'You tried both':'Try both: one now, or wait for two',A.W/2,A.H*.08,{n:13,ok:s.tried.now&&s.tried.wait});
const sr=sandR(),left=A.W*.18,right=A.W*.82,r=Math.min(up2(26),A.W*.07);
g.fillStyle=A.col.tx;g.font=font(up2(13),700);centre(g);g.fillText('Now',left,A.H*.2);g.fillText('Later',right,A.H*.2);
biscuit(left,A.H*.36,r,s.mode==='ate');if(s.mode==='got'){biscuit(right-r*.9,A.H*.36,r);biscuit(right+r*.9,A.H*.36,r)}else{g.strokeStyle=LINE;g.setLineDash([4,4]);g.lineWidth=2;g.beginPath();g.arc(right-r*.9,A.H*.36,r,0,7);g.stroke();g.beginPath();g.arc(right+r*.9,A.H*.36,r,0,7);g.stroke();g.setLineDash([])}
const f=s.sand/5;g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(sr.x,sr.y);g.lineTo(sr.x+sr.w,sr.y);g.lineTo(sr.x+sr.w/2,sr.y+sr.h/2);g.lineTo(sr.x+sr.w,sr.y+sr.h);g.lineTo(sr.x,sr.y+sr.h);g.lineTo(sr.x+sr.w/2,sr.y+sr.h/2);g.closePath();g.stroke();
g.fillStyle='#d97706';const top=(1-f)*(sr.h/2-6);if(top>1){g.beginPath();g.moveTo(sr.x+sr.w/2-top*sr.w/sr.h,sr.y+sr.h/2-top);g.lineTo(sr.x+sr.w/2+top*sr.w/sr.h,sr.y+sr.h/2-top);g.lineTo(sr.x+sr.w/2,sr.y+sr.h/2);g.fill()}
const bot=f*(sr.h/2-6);if(bot>1){g.fillRect(sr.x+6,sr.y+sr.h-bot-2,sr.w-12,bot)}
g.fillStyle=A.col.tx;g.font=font(up2(12),700);g.fillText(s.waiting?`Tap the timer: ${s.sand} of 5`:'Sand timer',A.W/2,sr.y+sr.h+16);
choiceR().forEach(b=>card(b,b.k==='now'?'Eat 1 now':'Wait for 2',{ok:s.tried[b.k],hold:s.waiting&&b.k==='wait'}))}
function pickNow(){const s=W.c;s.waiting=false;s.sand=0;s.mode='ate';s.tried.now=1;good();talk('You ate 1 biscuit now. Yum, but you only had 1.'+(s.tried.wait?'':' Now try waiting.'))}
function pickWait(){const s=W.c;if(s.waiting)return tapSand();s.waiting=true;s.sand=0;s.mode=null;good();talk('You chose to wait. Tap the sand timer 5 times. Each tap, the sand drops a little.')}
function tapSand(){const s=W.c;if(!s.waiting){oops();return talk('First choose: eat 1 now, or wait for 2.')}s.sand++;A.sound.tick();
if(s.sand<5)return talk(`Waiting... ${s.sand} of 5. You can do it.`);s.waiting=false;s.mode='got';s.tried.wait=1;good();talk('The sand ran out. You waited, so you got 2 biscuits, not 1.')}
/* step 2: out of sight */
function hideR(){const u=Math.min(up2(80),A.W*.22);return{bis:{x:A.W*.28-u/2,y:A.H*.3,w:u,h:u},drawer:{x:A.W*.72-u*.7,y:A.H*.3,w:u*1.4,h:u},cup:{x:A.W*.28-u/2,y:A.H*.68,w:u,h:u*.8},tab:{x:A.W*.72-u*.55,y:A.H*.68,w:u*1.1,h:u*.75}}}
function drawHide(){const s=W.h,g=A.ctx,R=hideR();room();const n=(s.cup?0:1)+(s.tab?0:1);note(n?`Hide ${n===2?'both things':'1 more thing'}: drag them`:'Both hidden',A.W/2,A.H*.08,{n:13,ok:!n});
meter(.2+n*.38,A.W-up2(26)-12,A.H*.2,A.H*.5,'Want');
if(!s.cup)biscuit(R.bis.x+R.bis.w/2,R.bis.y+R.bis.h/2,R.bis.w*.38);g.fillStyle=A.col.tx;g.font=font(up2(12),700);centre(g);g.fillText('Biscuit',R.bis.x+R.bis.w/2,R.bis.y-10);
g.fillStyle='#e2e8f0';A.paint.rrect(R.drawer.x,R.drawer.y,R.drawer.w,R.drawer.h,8);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle=INK;g.fillRect(R.drawer.x+R.drawer.w/2-14,R.drawer.y+R.drawer.h*.45,28,6);
g.fillStyle=A.col.tx;g.fillText(s.tab?'Drawer (tablet inside)':'Drawer',R.drawer.x+R.drawer.w/2,R.drawer.y-10);
const d=W.drag;const cupAt=s.cup?{...R.bis,y:R.bis.y+R.bis.h*.1,h:R.bis.h*.9}:d&&d.what==='cup'?{...R.cup,x:d.x-R.cup.w/2,y:d.y-R.cup.h/2}:R.cup;
g.fillStyle='#93c5fd';g.beginPath();g.moveTo(cupAt.x+cupAt.w*.12,cupAt.y);g.lineTo(cupAt.x+cupAt.w*.88,cupAt.y);g.lineTo(cupAt.x+cupAt.w,cupAt.y+cupAt.h);g.lineTo(cupAt.x,cupAt.y+cupAt.h);g.closePath();g.fill();g.strokeStyle=s.no==='cup'?BADC:INK;g.lineWidth=s.no==='cup'?3.5:2;g.stroke();
g.fillStyle=INK;g.font=font(up2(12),800);g.fillText('Cup',cupAt.x+cupAt.w/2,cupAt.y+cupAt.h/2);
if(!s.tab){const ta=d&&d.what==='tab'?{...R.tab,x:d.x-R.tab.w/2,y:d.y-R.tab.h/2}:R.tab;g.fillStyle='#1e293b';A.paint.rrect(ta.x,ta.y,ta.w,ta.h,8);g.fill();g.strokeStyle=s.no==='tab'?BADC:INK;g.lineWidth=s.no==='tab'?3.5:2;g.stroke();
g.fillStyle='#38bdf8';A.paint.rrect(ta.x+6,ta.y+6,ta.w-12,ta.h-12,4);g.fill();g.fillStyle=INK;g.font=font(up2(11),800);g.fillText('Tablet',ta.x+ta.w/2,ta.y+ta.h/2)}}
function hideIt(what,ok){const s=W.h;if(s[what])return;if(!ok){s.no=what;oops();return talk(what==='cup'?'Put the cup over the biscuit, so you cannot see it.':'Put the tablet in the drawer, so it is out of sight.')}
s[what]=1;s.no=null;good();talk((what==='cup'?'The biscuit is under the cup. You cannot see it, so the want feeling gets smaller.':'The tablet is in the drawer. Out of sight, it is easier to wait.')+(s.cup&&s.tab?' Both hidden.':''))}
/* step 3: tricks */
function trickR(){const cols=A.narrow?2:4,gap=10,w=(A.W-20-gap*(cols-1))/cols,h=Math.min(up2(58),A.H*.15);return TRICKS.map((t,i)=>({i,x:10+(i%cols)*(w+gap),y:A.H*.2+Math.floor(i/cols)*(h+gap),w,h}))}
function drawTricks(){const s=W.t;room();note(`Find the 4 tricks that help you wait: ${s.got.length} of 4`,A.W/2,A.H*.08,{n:13,ok:s.got.length===4});
trickR().forEach(r=>card(r,TRICKS[r.i][0],{ok:s.got.includes(r.i),no:s.no===r.i,fill:s.got.includes(r.i)?'#ecfdf5':s.no===r.i?'#fef2f2':null}))}
function tapTrick(i){const s=W.t;if(s.got.includes(i)||s.got.length>=4)return;const [t,ok,why]=TRICKS[i];
if(!ok){s.no=i;oops();return talk(`${t}: no. ${why}`)}s.got.push(i);s.no=null;good();talk(`${t}: yes! ${why}`+(s.got.length>=4?' You found all 4.':''))}
/* step 4: patient words */
function wordR(){const n=3,h=Math.min(up2(54),A.H*.14),w=Math.min(A.W-30,up2(360));return[0,1,2].map(i=>({i,x:A.W/2-w/2,y:A.H*.36+i*(h+10),w,h}))}
function drawWords(){const s=W.w;room();if(s.k>=3){note('All 3 scenes done',A.W/2,A.H*.08,{ok:1});SCENE.forEach((sc,j)=>note(sc.o.find(o=>o[1])[0],A.W/2,A.H*(.3+j*.18),{n:15,ok:1}));return}
const sc=SCENE[s.k];note(`Scene ${s.k+1} of 3: pick the patient way`,A.W/2,A.H*.08,{n:13});card({x:10,y:A.H*.16,w:A.W-20,h:A.H*.15},sc.at,{fill:'#fefce8',n:up2(15)});
wordR().forEach(r=>card(r,sc.o[r.i][0],{no:s.no===r.i,n:up2(15)}))}
function pickWord(i){const s=W.w;if(s.k>=3)return;const o=SCENE[s.k].o[i];if(!o[1]){s.no=i;oops();return talk(`Not that one. ${o[2]}`)}
s.k++;s.no=null;good();talk(`“${o[0]}”: kind and patient. You asked, and then you waited.`+(s.k>=3?' All 3 done.':''))}
/* step 5: wait or get help now */
function binR(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
function cardR(){const w=Math.min(up2(320),A.W-30),h=Math.min(up2(70),A.H*.17);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawSort(){const s=W.s,g=A.ctx;room();note(s.k>=6?'All 6 sorted':`Card ${s.k+1} of 6: drag it to a box`,A.W/2,A.H*.08,{n:13,ok:s.k>=6});
binR().forEach((r,j)=>{g.fillStyle=j?'#fef2f2':'#ecfdf5';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=j?BADC:OKC;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=font(up2(14));g.textAlign='center';g.textBaseline='top';
g.fillText(j?'Get help now':'I can wait',r.x+r.w/2,r.y+10);g.font=font(up2(24),900);g.fillText(String(CARDS.slice(0,s.k).filter(x=>x[1]===j).length),r.x+r.w/2,r.y+r.h*.5)});
if(s.k<6){const r=cardR(),d=W.drag;card(d&&d.what==='card'?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,CARDS[s.k][0],{no:s.no,hold:!!d,n:up2(16)})}}
function sortCard(j){const s=W.s;if(s.k>=6)return;const [t,b,why]=CARDS[s.k];if(j!==b){s.no=1;oops();return talk(b?`Stop and think. ${why}`:`You can wait for this one. ${why}`)}
s.k++;s.no=0;good();talk(why+(s.k>=6?' All 6 sorted.':''))}
function draw(){const k=part();if(k==='chal'){room();note('Challenge',A.W/2,A.H*.18,{ok:1});note('Hide it, keep busy, ask kindly',A.W/2,A.H*.5,{n:16});return}
({choose:drawChoose,hide:drawHide,tricks:drawTricks,words:drawWords,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
if(k==='choose'){const b=choiceR().find(r=>inside(p,r));if(b)(b.k==='now'?pickNow:pickWait)();else if(inside(p,sandR()))tapSand();return false}
if(k==='hide'){const R=hideR(),s=W.h;if(!s.cup&&inside(p,R.cup)){W.drag={what:'cup',x:p.x,y:p.y};return true}if(!s.tab&&inside(p,R.tab)){W.drag={what:'tab',x:p.x,y:p.y};return true}return false}
if(k==='tricks'){const r=trickR().find(r=>inside(p,r));if(r)tapTrick(r.i);return false}
if(k==='words'&&W.w.k<3){const r=wordR().find(r=>inside(p,r));if(r)pickWord(r.i);return false}
if(k==='sort'&&W.s.k<6){if(inside(p,cardR())){W.drag={what:'card',x:p.x,y:p.y};return true}const b=binR().findIndex(r=>inside(p,r));if(b>=0)sortCard(b)}return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;const R=hideR(),grow=r=>({x:r.x-16,y:r.y-16,w:r.w+32,h:r.h+32});
if(d.what==='cup')return hideIt('cup',inside(p,grow(R.bis)));if(d.what==='tab')return hideIt('tab',inside(p,grow(R.drawer)));
const b=binR().findIndex(r=>inside(p,r));if(b>=0)sortCard(b);else A.redraw()}
function clear(){ver++;for(const k in W)delete W[k];Object.assign(W,{c:{tried:{},sand:0,waiting:false,mode:null},h:{},t:{got:[]},w:{k:0},s:{k:0},drag:null,test:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();W.test()}
function setup(i,desc,ok,msg){clear();talk(desc);W.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},ms*(j+1)))}
function pads(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='choose'){B('Eat 1 now',pickNow);B(W.c.waiting?`Wait: tap the timer (${W.c.sand} of 5)`:'Wait for 2',pickWait)}
if(k==='hide'){if(!W.h.cup)B('Put the cup over the biscuit',()=>hideIt('cup',1));if(!W.h.tab)B('Put the tablet in the drawer',()=>hideIt('tab',1))}
if(k==='tricks'&&W.t.got.length<4)TRICKS.forEach(([t],i)=>{if(!W.t.got.includes(i))B(t,()=>tapTrick(i),`Does this help: ${t}?`)});
if(k==='words'&&W.w.k<3)SCENE[W.w.k].o.forEach(([t],i)=>B(t,()=>pickWord(i)));
if(k==='sort'&&W.s.k<6){B('I can wait',()=>sortCard(0));B('Get help now',()=>sortCard(1))}}
const steps=[
{h:'One now or two later?',p:'You can eat 1 biscuit now. Or you can wait for the sand timer, and then you get 2. Try both ways.',
predict:{q:'Which way gives you more biscuits?',opts:['Eat it now','Wait for the timer'],ans:1},task:'Try eating now, and try waiting',
show:()=>demo(0,[pickNow,pickWait,tapSand,tapSand,tapSand,tapSand,tapSand],450),
go:()=>setup(0,'1 biscuit now, a sand timer, 2 biscuits later. Buttons: Eat 1 now, Wait for 2.',()=>W.c.tried.now&&W.c.tried.wait,'Waiting can bring something better, when the grown-up keeps their promise.')},
{h:'Out of sight',p:'It is hard to wait when the treat is right in front of you. Drag the cup over the biscuit. Drag the tablet into the drawer.',
task:'Hide both things',show:()=>demo(1,[()=>hideIt('cup',1),()=>hideIt('tab',1)],900),
go:()=>setup(1,'A biscuit, a drawer, a cup and a tablet. The want meter is high.',()=>W.h.cup&&W.h.tab,'When you cannot see it, you want it less. Hiding it makes waiting easier.')},
{h:'Tricks that help',p:'Some things make a wait feel shorter. Some make it harder. Tap the 4 that help.',
predict:{q:'Kit stares at the cake the whole time. Does that make waiting easier?',opts:['Yes, it helps','No, it makes it harder'],ans:1},task:'Find all 4 helpers',
show:()=>demo(2,TRICKS.map((t,i)=>t[1]?()=>tapTrick(i):null).filter(Boolean),800),
go:()=>setup(2,'8 cards. Tap the ones that help you wait.',()=>W.t.got.length>=4,'Keep busy, keep calm: sing, play, count, breathe. Staring, asking and poking make it harder.')},
{h:'Patient words',p:'While you wait, you can still ask. Pick the kind way to ask, then wait.',task:'Do all 3 scenes',
show:()=>demo(3,SCENE.map(sc=>()=>pickWord(sc.o.findIndex(o=>o[1]))),900),
go:()=>setup(3,'Scene: Ali is on the swing. 3 ways to ask.',()=>W.w.k>=3,'Ask once, kindly, then wait. Grabbing and shouting do not help.')},
{h:'Wait, or get help now?',p:'Patience is for things that can wait. If you are hurt, sick or scared, tell a grown-up straight away. Drag each card to a box.',
predict:{q:'Your tummy hurts a lot. Should you just wait quietly?',opts:['Yes, be patient','No, tell a grown-up now'],ans:1},task:'Sort all 6 cards',
show:()=>demo(4,CARDS.map(x=>()=>sortCard(x[1])),650),
go:()=>setup(4,'Card: Your turn on the slide. Boxes: I can wait, Get help now.',()=>W.s.k>=6,'Wait for turns, treats and talking. Get help now when you are hurt, sick or scared.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
const QS=[
{q:'You are waiting for a treat. What helps most?',a:'Put it out of sight',o:[['Look at it all the time','stare'],['Hold it in your hand','hold']]},
{q:'Ben wants the swing. What should he say?',a:'Can I go next, please?',o:[['Get off, it is my turn!','grab'],['My go? My go? My go?','nag']]},
{q:'Mia fell and hurt her arm. What should she do?',a:'Tell a grown-up now',o:[['Wait quietly until later','hurt'],['Wait for her turn to talk','hurt']]},
{q:'Asking “Is it time?” again and again makes the wait...',a:'Feel longer',o:[['Go faster','nag'],['End now','nag']]},
{q:'Dad says, “Wait 5 minutes for the park.” What can you do?',a:'Play with a toy until then',o:[['Cry until he goes','cry'],['Stand by the door and stare','stare']]},
{q:'Why can waiting be worth it?',a:'You may get something better later',o:[['Because waiting is fun','fun'],['You always get it at once','soon']]}];
function why(t){let m='Hide it, keep busy, and ask kindly.';
if(t==='stare')m='Looking at it keeps your mind on it, so you want it more. Look away or hide it.';
if(t==='hold')m='Holding it makes it very hard to wait. Put it away.';
if(t==='grab')m='Shouting and grabbing can hurt people. Ask kindly, then wait.';
if(t==='nag')m='Asking again and again does not make it come sooner. It makes the wait feel longer.';
if(t==='hurt')m='When you are hurt, do not wait. Tell a grown-up straight away.';
if(t==='cry')m='Big feelings are OK, but crying will not make it come sooner.';
if(t==='fun')m='Waiting can be hard, and that is OK. It can bring something better.';
if(t==='soon')m='Waiting means it comes later, not at once.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const rowEl=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},rowEl,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else oops();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Waiting buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pads()}}).start()})})();
