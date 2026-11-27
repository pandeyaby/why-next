/* Flagship – remembering where things are: look, say, check (Learning to Learn, ages 3-4; Development Matters 2021
   Characteristics of Effective Learning, Harvard Center on the Developing Child 2014 executive function activities,
   EEF Early Years evidence store, Gathercole and Alloway 2008). The learner plays hiding games: a quick peek against a
   good look under three cups, choosing the words that say the place (under the red cup, not over there), two toys
   kept apart through a count, putting things back where they were in a room and looking again to check, and giving
   each thing its own home so it is easy to find the next day. Data and drawings: looksay_art.js. */
(()=>{const K=LKS;
VIS.reg('flaglooksay',c=>{let A,tray,chal,qn=-1,tick=0,drag=null;const S={};c.fig.classList.add('young');
const STEPS=['look','say','two','room','home','quiz'],cur=()=>STEPS[A.step];
const inR=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const fs=n=>A.narrow?n:Math.round(n*1.1),dk=()=>A.col.dark;
let CUPR=[],TILES=[],SPOTS=[],BUBBLE=null;
/* Show me plays the same moves at a quicker pace */
const later=(ms,f)=>{const t0=tick;setTimeout(()=>{if(t0===tick)f()},S.auto?Math.round(ms*.35):ms)};
const turn=(list,k)=>{const s=(k+1)%list.length;return list.slice(s).concat(list.slice(0,s))};
function lines(t,max,font){const g=A.ctx;g.font=font;const out=[];let ln='';for(const w of String(t).split(' ')){const nx=ln?ln+' '+w:w;if(ln&&g.measureText(nx).width>max){out.push(ln);ln=w}else ln=nx}if(ln)out.push(ln);return out}
/* the instruction banner, and a fixed reply area under it so the cups never jump */
function banner(t,tone){const g=A.ctx,f=`800 ${fs(17)}${K.FONT}`,L=lines(t,A.W-34,f),lh=fs(17)*1.3,h=L.length*lh+14;
 g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');K.box(g,8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?K.OK:tone==='no'?K.NO:K.RIM;g.stroke();g.font=f;g.fillStyle=dk()?'#f1f5f9':K.INK;g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,15+i*lh));
 let y=h+14;const rows=A.narrow?3:2;if(S.say&&tone!=='quiz'&&!S.fin){const f2=`700 ${fs(15)}${K.FONT}`;g.font=f2;g.fillStyle=S.bad?(dk()?'#fca5a5':K.NO):(dk()?'#86efac':K.OK);lines(S.say,A.W-34,f2).slice(0,rows).forEach((r,i)=>g.fillText(r,17,y+i*fs(15)*1.3))}
 return y+rows*fs(15)*1.3+6}
/* tray tiles along the bottom: a row on a wide screen, a column on a phone */
function trayAt(n){const gap=8,cols=A.narrow?1:n,rows=Math.ceil(n/cols),h=A.narrow?46:58,w=(A.W-16-gap*(cols-1))/cols,top=A.H-8-rows*h-(rows-1)*gap;
 return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- the cup games (look, say, two) ---- */
const ROUNDS={look:K.LOOK,say:K.SAY,two:K.TWO};
const R=()=>ROUNDS[cur()][Math.min(S.k,ROUNDS[cur()].length-1)];
const toyAt=j=>{const r=R();if(cur()==='two')return r.a[1]===j?r.a[0]:r.b[1]===j?r.b[0]:null;return r.at===j?r.toy:null};
const sayings=()=>{const r=R(),C=K.CUPS[r.at];return turn([[`Under the ${C.n} cup`,'ok'],['Under a cup','which'],['Over there','vague']],S.k)};
function hide(){if(S.phase!=='look')return;S.up=[];S.phase=cur()==='two'?'count':'hidden';A.sound.pop();
 if(S.phase==='count'){S.count=3;const r=R(),one=()=>{S.count--;if(S.count>0){A.sound.tick();say(`${S.count}\u2026 Say it again: ${r.a[0]} under ${K.CUPS[r.a[1]].n}, ${r.b[0]} under ${K.CUPS[r.b[1]].n}.`,false);later(700,one)}else{S.phase='hidden';S.want='a';say(`Now find the ${r.a[0]}.`,false)}};
  say(`3\u2026 Say it while you wait: ${r.a[0]} under ${K.CUPS[r.a[1]].n}, ${r.b[0]} under ${K.CUPS[r.b[1]].n}.`,false);later(700,one);return}
 say(`Where is the ${R().toy}? Tap its cup.`,false)}
function startRound(){const r=R();S.phase='look';S.up=cur()==='two'?[r.a[1],r.b[1]]:[r.at];S.said=null;S.want=null;S.miss=null;S.hit=[];
 if(r.peek){S.up=[];S.phase='peekwait';say(`Tap Quick peek. The cup lifts for one blink!`,false)}else say(cur()==='say'?`Which words say where the ${r.toy} is? Drag them to the speech bubble.`:cur()==='two'?`Look at both toys. Then tap Hide.`:`Take a good look at the ${r.toy}. Tap Hide when you are ready.`,false)}
function doPeek(){if(S.phase!=='peekwait')return;S.up=[R().at];S.phase='look';A.sound.tick();say(`Quick peek! Where is the ${R().toy}?`,false);later(450,hide)}
function nextRound(){S.k++;if(S.k>=ROUNDS[cur()].length){S.fin=true;S.up=[];return say(K.DONE[A.step],false)}startRound()}
function tapCup(j){if(S.fin||S.wait)return;if(S.phase==='peekwait')return doPeek();if(S.phase==='look'){if(cur()==='say')return say('First pick the words that say where it is.',true);return hide()}
 if(S.phase==='count')return say('Wait for the count. Say the places again while you wait.',true);
 if(S.phase!=='hidden'||S.hit.includes(j))return;const r=R(),want=cur()==='two'?r[S.want][0]:r.toy,got=toyAt(j);
 if(got===want){S.hit.push(j);S.up=S.up.concat(j);S.miss=null;A.sound.pop();
  if(cur()==='two'&&S.want==='a'){S.want='b';return say(`Yes! Now find the ${r.b[0]}.`,false)}
  S.wait=true;say(`Yes! The ${want} was under the ${K.CUPS[j].n} cup.`,false);return later(1000,()=>{S.wait=false;nextRound()})}
 A.sound.miss();S.miss=j;S.up=S.up.concat(j);S.wait=true;say(why(got?'mix':r.peek?'peek':cur()==='two'?'empty2':cur()==='say'?'empty3':'empty'),true);
 later(1100,()=>{S.wait=false;S.up=S.up.filter(x=>x!==j);S.miss=null;A.redraw()})}
function pickSaying(i){if(cur()!=='say'||S.phase!=='look'||S.wait)return;const T=sayings()[i];
 if(T[1]!=='ok'){S.missT=i;A.sound.miss();return say(why(T[1]),true)}
 S.missT=null;S.said=T[0];S.wait=true;A.sound.pop();say(`Yes: ${T[0]}. Say it out loud. Now the cups go down.`,false);later(900,()=>{S.wait=false;hide()})}
function paintCups(){const r=R(),g=A.ctx,step=A.step,n=r.cups;
 const y0=banner(S.fin?K.DONE[step]:cur()==='say'?`Say where it is, then find it. (${Math.min(S.k+1,3)} of 3)`:cur()==='two'?`Two toys, four cups. (${Math.min(S.k+1,2)} of 2)`:(S.k?`Take a good long look, then find it.`:`A quick peek, then find it.`)+` (${Math.min(S.k+1,3)} of 3)`,S.fin?'ok':S.bad?'no':'');
 const tags=cur()==='say'&&S.phase==='look'&&!S.fin,trayTop=tags?trayAt(3)[0].y-10:A.H-10;let top=y0;
 if(cur()==='say'){const bh=A.narrow?50:56;BUBBLE={x:A.W*.12,y:top,w:A.W*.76,h:bh};g.fillStyle=dk()?'#1e293b':'#ffffff';g.strokeStyle=drag?'#1d4ed8':K.RIM;g.lineWidth=drag?4:2;K.box(g,BUBBLE.x,BUBBLE.y,BUBBLE.w,BUBBLE.h,22);g.fill();g.stroke();
  g.font=`800 ${fs(17)}${K.FONT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=S.said?(dk()?'#93c5fd':'#1d4ed8'):(dk()?'#cbd5e1':'#475569');g.fillText(S.said?`\u201C${S.said}\u201D`:'I say: \u2026',BUBBLE.x+BUBBLE.w/2,BUBBLE.y+BUBBLE.h/2,BUBBLE.w-16);top+=bh+10}else BUBBLE=null;
 if(cur()==='two'&&S.phase==='count'){g.font=`900 ${fs(30)}${K.FONT}`;g.fillStyle=dk()?'#fde68a':'#92400e';g.textAlign='center';g.textBaseline='top';g.fillText(String(S.count),A.W/2,top);top+=fs(36)}
 const gap=10,w=Math.min(130,(A.W-16-gap*(n-1))/n),h=Math.min(trayTop-top,w*1.35),x0=(A.W-(w*n+gap*(n-1)))/2;
 CUPR=Array.from({length:n},(_,j)=>({x:x0+j*(w+gap),y:top+(trayTop-top-h)/2,w,h}));
 CUPR.forEach((q,j)=>{const lift=S.fin||S.up.includes(j)?1:0;K.cup(g,q,K.CUPS[j],{lift,toy:toyAt(j)?K.TOYS[toyAt(j)]:null,empty:!toyAt(j),ok:S.hit.includes(j),no:S.miss===j,dark:dk()})});
 TILES=[];if(tags){const T=sayings();TILES=trayAt(3).map((q,i)=>({i,...q}));TILES.forEach((q,i)=>{if(drag&&drag.i===i)return;K.tile(g,q,T[i][0],{no:S.missT===i})});if(drag){const q=TILES[drag.i];K.tile(g,{x:drag.x-q.w/2,y:drag.y-q.h/2,w:q.w,h:q.h},T[drag.i][0],{sel:true})}}}
/* ---- the room and the homes (drag a thing to its place) ---- */
const PL=()=>cur()==='room'?K.ROOM:K.HOMES;
const order=()=>turn([0,1,2],cur()==='room'?0:1);
function ready(){if(S.phase!=='look')return;S.phase='place';A.sound.pop();say(cur()==='room'?'Where was each thing? Drag it back to its place.':'Put each thing in its own home.',false)}
function putThing(t,j){if(S.fin||S.wait||S.placed[t]!=null)return;const ok=t===j;S.sel=null;
 if(!ok){S.miss={t,j};A.sound.miss();return say(why(cur()==='room'?'room':'home'),true)}
 S.miss=null;S.placed[t]=j;A.sound.pop();const left=3-Object.keys(S.placed).length;
 if(left)return say(`Yes! The ${PL()[t].t} ${cur()==='room'?'went':'live'} ${cur()==='room'?PL()[t].n:'in '+PL()[t].n}. ${left} more.`,false);
 if(cur()==='room'){S.fin=true;return say(K.DONE[3],false)}
 S.wait=true;say('All tidy. Now it is the next day\u2026',false);later(1000,()=>{S.wait=false;S.phase='find';S.q=0;say(`Where are the ${PL()[S.ask[0]].t}? Tap the home.`,false)})}
function findHome(j){if(S.fin||S.wait||S.phase!=='find')return;const want=S.ask[S.q];
 if(j!==want){S.miss={t:-1,j};A.sound.miss();return say(why('home2'),true)}
 S.miss=null;A.sound.pop();S.found.push(want);S.q++;if(S.q>=3){S.fin=true;return say(K.DONE[4],false)}say(`Yes! Now where is the ${PL()[S.ask[S.q]].t}?`,false)}
function peek(){if(cur()!=='room'||S.phase!=='place'||S.fin)return;S.peek=true;A.sound.tick();say('Look again: check where each thing was.',false);later(1300,()=>{S.peek=false;A.redraw()})}
function pickThing(t){if(S.fin||S.wait||S.placed[t]!=null||S.phase!=='place')return;S.sel=t;A.sound.tick();say(`Holding the ${PL()[t].t}. Now tap where it goes.`,false)}
function tapSpot(j){if(S.phase==='look')return ready();if(S.phase==='find')return findHome(j);if(S.sel==null)return say('First pick a thing at the bottom.',true);putThing(S.sel,j)}
function paintPlaces(){const g=A.ctx,step=A.step,P=PL();
 const y0=banner(S.fin?K.DONE[step]:S.phase==='look'?(cur()==='room'?'Look where each thing is. Then tap Ready.':'Each thing has a home with its picture. Tap Ready.'):S.phase==='find'?`The next day: where are the ${P[S.ask[S.q]].t}?`:cur()==='room'?'Drag each thing back to where it was.':'Drag each thing to its home.',S.fin?'ok':S.bad?'no':'');
 const showTray=S.phase==='place'&&!S.fin,tr=trayAt(3),bottom=showTray?tr[0].y-10:A.H-10,gap=10,w=(A.W-16-2*gap)/3,h=Math.min(bottom-y0,w*1.25,190);
 SPOTS=[0,1,2].map(j=>({x:8+j*(w+gap),y:y0+(bottom-y0-h)/2,w,h}));
 SPOTS.forEach((q,j)=>{const tIn=Object.keys(S.placed).find(t=>S.placed[t]===j),show=cur()==='room'&&(S.phase==='look'||S.peek||S.fin),toy=tIn!=null&&(S.phase!=='find'||S.found.includes(j))?P[tIn].toy:show?P[j].toy:null;
  K.spot(g,q,P[j].pic,P[j].n,{toy,ok:S.found&&S.found.includes(j)||(S.fin&&cur()==='room'),no:S.miss&&S.miss.j===j,sel:S.sel!=null,dark:dk()})});
 TILES=[];if(showTray){const O=order();TILES=tr.map((q,i)=>({i:O[i],...q}));TILES.forEach(q=>{if(drag&&drag.i===q.i)return;K.tile(g,q,`the ${P[q.i].t}`,{pic:P[q.i].toy,sel:S.sel===q.i,used:S.placed[q.i]!=null,no:S.miss&&S.miss.t===q.i})});
  if(drag){const q=TILES.find(z=>z.i===drag.i);K.tile(g,{x:drag.x-q.w/2,y:drag.y-q.h/2,w:q.w,h:q.h},`the ${P[drag.i].t}`,{pic:P[drag.i].toy,sel:true})}}}
function draw(){const g=A.ctx;g.fillStyle=dk()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=cur();
 if(m==='quiz'){const y0=banner('Challenge: look, say, check','quiz'),n=3,gap=10,w=Math.min(110,(A.W-16-gap*2)/3),h=w*1.3,x0=(A.W-(w*n+gap*2))/2;for(let j=0;j<n;j++)K.cup(g,{x:x0+j*(w+gap),y:y0+10,w,h},K.CUPS[j],{lift:j===0?1:0,toy:j===0?K.TOYS.teddy:null,dark:dk()});return}
 if(m==='room'||m==='home')paintPlaces();else paintCups();A.fx.draw(g)}
/* ---- pointer: tap a cup or a place, drag a tile ---- */
function down(p){const t=TILES.find(b=>inR(p,b));if(t&&!S.fin){if(cur()!=='say'&&S.placed[t.i]!=null)return false;drag={i:t.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(cur()==='room'||cur()==='home'){const j=SPOTS.findIndex(b=>inR(p,b));if(j>=0)tapSpot(j);else if(S.phase==='look')ready();return false}
 const j=CUPR.findIndex(b=>inR(p,b));if(j>=0)tapCup(j);else if(S.phase==='peekwait')doPeek();else if(S.phase==='look'&&cur()!=='say')hide();return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const d=drag;drag=null;const tapped=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(cur()==='say'){if(tapped||inR(p,BUBBLE))return pickSaying(d.i);return A.redraw()}
 if(tapped)return pickThing(d.i);const j=SPOTS.findIndex(b=>inR(p,b));if(j>=0)putThing(d.i,j);else A.redraw()}
function clear(){tick++;drag=null;for(const k in S)delete S[k];Object.assign(S,{k:0,phase:'look',up:[],hit:[],miss:null,missT:null,said:null,want:null,count:0,placed:{},found:[],sel:null,peek:false,q:0,ask:[2,0,1],wait:false,fin:false,say:null,bad:false,goal:()=>{}})}
function say(t,bad){S.say=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.goal()}
function open(i){clear();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);S.goal=()=>{if(A.step===i&&S.fin&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};
 if(i<3)startRound();else say(i===3?'Look where each thing is. Then tap Ready.':'Each thing has a home with its picture. Tap Ready.',false)}
/* Show me: do the next right move again and again until the step is finished */
function auto(i){steps[i].go();S.auto=true;const t0=tick;let n=0;const go=()=>{if(t0!==tick||S.fin||n++>40)return;if(!S.wait){const m=cur();
  if(m==='look'||m==='say'||m==='two'){if(S.phase==='peekwait')doPeek();else if(S.phase==='look'){if(m==='say')pickSaying(sayings().findIndex(x=>x[1]==='ok'));else if(!R().peek)hide()}else if(S.phase==='hidden'){const r=R();tapCup(m==='two'?r[S.want][1]:r.at)}}
  else if(S.phase==='look')ready();else if(S.phase==='place'){const t=[0,1,2].find(x=>S.placed[x]==null);putThing(t,t)}else if(S.phase==='find')findHome(S.ask[S.q])}
  setTimeout(go,320)};setTimeout(go,320)}
/* every canvas move as a button too, for keyboards and switch users */
function keys(){if(!tray)return;tray.innerHTML='';const m=cur(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t);b.onclick=f};if(m==='quiz'||S.fin)return;
 if(m==='look'||m==='say'||m==='two'){if(S.phase==='peekwait')add('Quick peek',doPeek,'Quick peek: the cup lifts for one blink');else if(S.phase==='look'){if(m==='say')sayings().forEach(([t],i)=>add(`Say: ${t}`,()=>pickSaying(i)));else if(!R().peek)add('Hide the cups',hide)}
  else if(S.phase==='hidden')CUPR.forEach((_,j)=>{if(!S.hit.includes(j))add(`Lift the ${K.CUPS[j].n} cup`,()=>tapCup(j))});return}
 const P=PL();if(S.phase==='look')return add('Ready',ready);
 if(S.phase==='place'){order().forEach(t=>{if(S.placed[t]==null)add(`Pick the ${P[t].t}`,()=>pickThing(t))});if(S.sel!=null)P.forEach((q,j)=>add(`Put it ${m==='room'?q.n:'in '+q.n}`,()=>tapSpot(j)));if(m==='room')add('Look again',peek,'Look again to check where things were');return}
 if(S.phase==='find')P.forEach((q,j)=>add(`Look in ${q.n}`,()=>findHome(j)))}
const steps=[
{h:'Look first',p:K.TXT[0],predict:{q:'What helps you remember where the teddy is?',opts:['A quick peek','A good long look'],ans:1},task:'Find the toy under the cups 3 times',
 show:()=>auto(0),go:()=>open(0)},
{h:'Say where',p:K.TXT[1],predict:{q:'Which words help you find the key again?',opts:['Over there','Under the red cup'],ans:1},task:'Say where it is, then find it, 3 times',
 show:()=>auto(1),go:()=>open(1)},
{h:'Wait and keep it',p:K.TXT[2],task:'Find both toys after the count, 2 times',
 show:()=>auto(2),go:()=>open(2)},
{h:'Look again',p:K.TXT[3],task:'Put the shoes, the hat and the teddy back',
 show:()=>auto(3),go:()=>open(3)},
{h:'Same home',p:K.TXT[4],predict:{q:'Where are your shoes easier to find?',opts:['Wherever I left them','In the same home every day'],ans:1},task:'Tidy 3 things, then find them the next day',
 show:()=>auto(4),go:()=>open(4)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.goal()});
/* a reply for each slip */
function why(tag){let m='Look, say the place, then check.';
 if(tag==='peek')m='A quick peek is easy to forget. Next time, take a good long look before the cups go down.';
 if(tag==='empty')m='That cup is empty. Look at the cup the toy goes under, and say its colour.';
 if(tag==='empty3')m='That cup is empty. Say your words again: under the ... cup. Which colour did you say?';
 if(tag==='empty2')m='That cup is empty. Saying both places while you wait helps you keep them.';
 if(tag==='mix')m='That is the other toy! Say both: which toy is under which cup?';
 if(tag==='which')m='Which cup? There are four. Say its colour too: under the red cup.';
 if(tag==='vague')m='Over there could be anywhere. Say a place word and a thing: under the red cup.';
 if(tag==='room')m='Not there. Picture the room in your head, or tap Look again to check.';
 if(tag==='home')m='Look at the picture on each home. Each thing has its own home.';
 if(tag==='home2')m='Not in that home. Each thing lives in the home with its picture.';
 if(tag==='away')m='Looking away means you miss where it goes. Watch it, and say where it is.';
 if(tag==='guess')m='A guess is often wrong. Look where it goes while it is being hidden.';
 if(tag==='quit')m='Do not give up. Look again, think where you saw it, and check.';
 if(tag==='both')m='Two things need two places. Say both: key under red, cookie under blue.';
 if(tag==='homeq')m='Each thing has its own home. Then you know where to look every day.';
 return m}
function quiz(){qn++;const Q=K.QS[qn%K.QS.length],opts=turn([[Q.a,'ok'],...Q.o],qn);
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function check(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Hiding game buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
