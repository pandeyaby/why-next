/* Flagship – hot, warm and cold (ages 3–4): sort things by how they feel (ice and snow are cold, a bath and baby milk are
   warm, fire and a teapot are hot), find the hot things in a kitchen that you must not touch, wait for hot cocoa to cool
   from hot to warm before drinking, carry an ice lolly into the sun or the freezer to see warmth melt it, and run a bath
   with the hot and cold taps until it is warm. The Challenge targets the common ideas that you can touch to check, that
   things left out get hotter, and that hot and warm are the same. */
(()=>{const SORT=[['🧊','Ice',2],['🔥','Fire',0],['🛁','Bath',1],['⛄','Snowman',2],['🫖','Teapot',0],['🍼','Milk',1]],
 BINS=[['🔥','Hot'],['🙂','Warm'],['❄️','Cold']],KITCHEN=[['🍳','Pan',1],['🍎','Apple',0],['🫖','Teapot',1],['🧸','Teddy',0],['🕯️','Candle',1],['🥄','Spoon',0]];
VIS.reg('flagwarm',c=>{let A,keys,box,n=-1,wins=0;c.fig.classList.add('young');
const T={};
const scene=()=>['sort','kitchen','cocoa','lolly','bath','quiz'][A.step];
const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=k=>Math.round(k*(A.narrow?1.05:1.2));
/* words sit in the theme text colour on soft tints so they read in light and dark themes */
function say2(g,s,x,y,k,w){g.font=`${w||700} ${sz(k)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function pane(g,r,col,a,warn,on){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=warn?4:on?3:2;g.strokeStyle=warn?A.col.rd:on?A.col.ac:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const tint=k=>[A.col.rd,A.col.am,A.col.cy][k];
const card=i=>{const w=(A.W-40)/3,h=A.H*.2;return{x:10+(i%3)*(w+10),y:A.H*.05+Math.floor(i/3)*(h+8),w,h}};
const bin=k=>{const w=(A.W-40)/3;return{x:10+k*(w+10),y:A.H*.56,w,h:A.H*.36}};
const thing=i=>{const w=(A.W-40)/3,h=A.H*.3;return{x:10+(i%3)*(w+10),y:A.H*.1+Math.floor(i/3)*(h+10),w,h}};
const sun=()=>({x:A.W*.04,y:A.H*.5,w:A.W*.36,h:A.H*.42}),ice=()=>({x:A.W*.6,y:A.H*.5,w:A.W*.36,h:A.H*.42});
/* a thermometer: taller red line means hotter */
function meter(g,t,max){const C=A.col,x=A.W*.82,y0=A.H*.12,h=A.H*.62,w=Math.max(16,A.W*.04),f=h*(t/max);
 g.fillStyle=A.alpha(C.tx,.08);A.paint.rrect(x,y0,w,h,w/2);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;A.paint.rrect(x,y0,w,h,w/2);g.stroke();
 g.fillStyle=C.rd;A.paint.rrect(x+3,y0+h-f,w-6,Math.max(4,f),w/2);g.fill();A.paint.ball(x+w/2,y0+h+w*.7,w*.8,C.rd);
 say2(g,'Hot',x-sz(26),y0+h*.12,11,700);say2(g,'Warm',x-sz(28),y0+h*.5,11,700);say2(g,'Cold',x-sz(26),y0+h*.88,11,700)}
const feel=(t,max)=>t/max>.68?'hot':t/max>.3?'warm':'cold';
function draw(A){const{ctx:g,W,H,col:C}=A,v=scene();g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){say2(g,'🔥 Hot',W*.22,H*.45,22,800);say2(g,'🙂 Warm',W*.5,H*.45,22,800);say2(g,'❄️ Cold',W*.78,H*.45,22,800);return}
 if(v==='sort'){SORT.forEach(([e,name,k],i)=>{if(T.placed[i]!=null||(T.grab&&T.grab.i===i))return;const r=card(i);pane(g,r,C.vi,.1,T.oops===i,T.pick===i);say2(g,e,r.x+r.w/2,r.y+r.h*.4,22);say2(g,name,r.x+r.w/2,r.y+r.h*.8,12,700)});
  BINS.forEach(([e,name],k)=>{const r=bin(k);pane(g,r,tint(k),.16,false,false);say2(g,e+' '+name,r.x+r.w/2,r.y+sz(14),13,800);
   SORT.forEach(([e2],i)=>{if(T.placed[i]===k){const j=SORT.filter((_,q)=>T.placed[q]===k&&q<i).length;say2(g,e2,r.x+r.w*(j?.7:.3),r.y+r.h*.62,22)}})});
  if(T.grab)say2(g,SORT[T.grab.i][0],T.grab.x,T.grab.y,26)}
 if(v==='kitchen'){KITCHEN.forEach(([e,name,hot],i)=>{const r=thing(i),f=T.found.includes(i);pane(g,r,f?C.rd:C.gr,f?.2:.08,T.oops===i,false);say2(g,e,r.x+r.w/2,r.y+r.h*.38,26);say2(g,f?'Hot!':name,r.x+r.w/2,r.y+r.h*.8,13,800)});
  say2(g,`Hot things found: ${T.found.length} of 3`,W/2,H*.92,12,700)}
 if(v==='cocoa'){const t=T.temp,steam=t>3;say2(g,'☕',W*.38,H*.45,48);if(steam){g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=2;for(let s=0;s<3;s++){g.beginPath();const x=W*.32+s*W*.06;g.moveTo(x,H*.3);g.quadraticCurveTo(x+12,H*.22,x,H*.14);g.stroke()}}
  meter(g,t,5);say2(g,{hot:'Hot! Too hot to drink.',warm:'Warm. Just right.',cold:'Cold now.'}[feel(t,5)],W*.38,H*.72,14,800);say2(g,`Waited: ${T.waits} times`,W*.38,H*.85,11,600)}
 if(v==='lolly'){const s=sun(),f=ice();pane(g,s,C.am,.18,false,false);pane(g,f,C.cy,.18,false,false);say2(g,'☀️ Sunny spot',s.x+s.w/2,s.y+sz(14),12,800);say2(g,'❄️ Freezer',f.x+f.w/2,f.y+sz(14),12,800);
  const L=T.lolly,p=T.grab?T.grab:L.at==='sun'?{x:s.x+s.w/2,y:s.y+s.h*.6}:L.at==='ice'?{x:f.x+f.w/2,y:f.y+f.h*.6}:{x:W/2,y:H*.22};
  if(L.melt<1)say2(g,'🍭',p.x,p.y-L.melt*20,30-L.melt*10);if(L.melt>0){g.fillStyle=A.alpha(C.pk,.55);g.beginPath();g.ellipse(p.x,p.y+22,12+L.melt*30,5+L.melt*6,0,0,7);g.fill()}
  say2(g,L.at==='sun'?(L.melt>=1?'It melted in the warm sun!':'Melting…'):L.at==='ice'?'Still hard and cold.':'Drag the lolly to a place',W/2,H*.08,13,800);
  say2(g,`Tried: ${T.tried.length} of 2 places`,W/2,H*.38,11,600)}
 if(v==='bath'){const r={x:W*.06,y:H*.4,w:W*.5,h:H*.42};pane(g,r,C.cy,.08+T.fill*.05,false,false);g.fillStyle=A.alpha(C.cy,.35);const wh=r.h*Math.min(1,T.fill/4);g.fillRect(r.x+3,r.y+r.h-wh,r.w-6,wh-3);
  say2(g,'🛁',r.x+r.w/2,r.y-sz(14),24);meter(g,T.heat,6);say2(g,`Bath ${Math.min(T.round+1,2)} of 2: `+{hot:'too hot!',warm:'warm, just right',cold:'too cold!'}[feel(T.heat,6)],W*.38,H*.12,13,800);
  say2(g,T.round>=2?'Both baths are warm!':'Tap a tap, then let a grown-up check',W*.38,H*.92,11,600)}
 A.fx.draw(g)}
const miss=(t,mark)=>{T.oops=mark;A.sound.miss();note(t);A.redraw()},hit=t=>{T.oops=null;A.sound.pop();note(t);btns();A.redraw();T.want()};
/* step 0 */
function place(i,k){T.grab=null;T.pick=null;if(i==null||T.placed[i]!=null)return A.redraw();const[,name,want]=SORT[i];
 if(k!==want){const m={0:'Fire is hot.',1:'A bath is warm: not hot, not cold.',2:'Ice is cold.',3:'A snowman is cold, made of snow.',4:'A teapot is hot. It can burn you.',5:'Baby milk is warm, not hot.'}[i];return miss(`Not ${BINS[k][1].toLowerCase()}. ${m}`,i)}
 T.placed[i]=k;T.oops=null;A.sound.tick();if(T.placed.filter(x=>x!=null).length<SORT.length){note(`${name}: ${BINS[k][1].toLowerCase()}.`);btns();return A.redraw()}hit('All sorted! Hot, warm and cold.')}
const nextCard=()=>SORT.findIndex((_,i)=>T.placed[i]==null);
/* step 1 */
function touch(i){if(T.found.length>=3)return;const[,name,hot]=KITCHEN[i];if(!hot)return miss(`The ${name.toLowerCase()} is not hot. It is safe. Find a hot thing.`,i);
 if(T.found.includes(i))return note('Found that one. Find another hot thing.');T.found.push(i);T.oops=null;A.sound.tick();if(T.found.length<3){note(`${name}: hot! Do not touch. Ask a grown-up.`);btns();return A.redraw()}hit('Pan, teapot and candle are hot. Do not touch. Ask a grown-up.')}
/* step 2 */
function wait(){if(T.temp>0)T.temp--;T.waits++;A.sound.tick();note(T.temp===0?'Oh no, it went cold. Hot things cool down if you wait a long time. Here is a new cup.':`It cooled a bit. It feels ${feel(T.temp,5)}.`);if(T.temp===0){T.temp=5;T.waits=0}btns();A.redraw()}
function sip(){const f=feel(T.temp,5);if(f==='hot')return miss('Too hot! It could burn your mouth. Wait a bit.',null);if(f==='cold')return miss('It is cold now. Hot cocoa is nicer warm.',null);if(T.drunk)return;T.drunk=1;hit('Yum! Warm, just right. Waiting made it cooler.')}
/* step 3 */
function putLolly(at){const L=T.lolly;T.grab=null;if(!at)return A.redraw();L.at=at;L.melt=0;A.sound.tick();if(!T.tried.includes(at))T.tried.push(at);
 if(at==='ice'){note('In the freezer it stays hard and cold.');btns();A.redraw();setTimeout(()=>{if(T.tried.length>=2)return hit('Cold kept the lolly hard. Warm sun melted it.');if(T.lolly.at!=='ice')return;T.lolly={at:null,melt:0};note('Now try the sunny spot.');btns();A.redraw()},A.reduced()?10:600);return}
 note('In the warm sun…');A.tween(L,{melt:1},A.reduced()?10:1000,'io',()=>{note('The warm sun melted the lolly!');if(T.tried.length>=2)return hit('Warm sun melted it. Cold kept it hard.');T.lolly={at:null,melt:0};btns();A.redraw()})}
/* step 4 */
const START=[0,6];
function tap(d){if(T.round>=2)return;T.heat=Math.max(0,Math.min(6,T.heat+d));T.fill=Math.min(4,T.fill+1);A.sound.tick();note(`${d>0?'Hot':'Cold'} water in. It feels ${feel(T.heat,6)}.`);btns();A.redraw()}
function check(){if(T.round>=2)return;const f=feel(T.heat,6);if(f==='hot')return miss('A grown-up checks with an elbow: too hot! Add cold water.',null);if(f==='cold')return miss('A grown-up checks: too cold! Add hot water.',null);
 T.round++;if(T.round<2){T.heat=START[1];T.fill=2;A.sound.pop();note('Warm! Now this bath is too hot. Make it warm.');btns();return A.redraw()}hit('Warm baths! Cold water cools. Hot water warms.')}
function btns(){if(!keys)return;keys.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(v==='sort'){const i=nextCard();if(i>=0)BINS.forEach(([e,nm],k)=>B(e+' '+nm,()=>place(i,k),`${SORT[i][1]} is ${nm.toLowerCase()}`))}
 if(v==='kitchen'&&T.found.length<3)KITCHEN.forEach(([e,nm],i)=>{if(!T.found.includes(i))B(e,()=>touch(i),`Is the ${nm.toLowerCase()} hot?`)});
 if(v==='cocoa'&&!T.drunk){B('⏳ Wait',wait,'Wait a little');B('☕ Drink',sip,'Drink the cocoa')}
 if(v==='lolly'&&T.tried.length<2&&!T.lolly.at){B('☀️ Sun',()=>putLolly('sun'),'Put the lolly in the sun');B('❄️ Freezer',()=>putLolly('ice'),'Put the lolly in the freezer')}
 if(v==='bath'&&T.round<2){B('🔴 Hot tap',()=>tap(1),'Add hot water');B('🔵 Cold tap',()=>tap(-1),'Add cold water');B('💪 Check',check,'A grown-up checks the bath with an elbow')}}
function down(p){const v=scene();
 if(v==='sort'){const i=SORT.findIndex((_,q)=>T.placed[q]==null&&within(p,card(q)));if(i>=0){T.grab={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const k=[0,1,2].find(q=>within(p,bin(q)));if(k!=null&&T.pick!=null)place(T.pick,k);return false}
 if(v==='kitchen'){const i=KITCHEN.findIndex((_,q)=>within(p,thing(q)));if(i>=0)touch(i);return false}
 if(v==='cocoa'){if(p.x<A.W*.6&&!T.drunk)sip();return false}
 if(v==='lolly'&&!T.lolly.at&&T.tried.length<2){T.grab={x:p.x,y:p.y};return true}
 if(v==='bath'&&p.x<A.W*.7)check();return false}
function move(p){if(T.grab){T.grab.x=p.x;T.grab.y=p.y;A.redraw()}}
function up(p){const g=T.grab,v=scene();if(!g)return;
 if(v==='sort'){if(Math.hypot(p.x-g.x0,p.y-g.y0)<12){T.pick=g.i;T.grab=null;note(`${SORT[g.i][1]}: now tap hot, warm or cold.`);return A.redraw()}const k=[0,1,2].find(q=>within(p,bin(q)));return place(k==null?null:g.i,k)}
 if(v==='lolly')putLolly(within(p,sun())?'sun':within(p,ice())?'ice':null)}
const ready=(s,test,msg)=>()=>{if(A.step===s&&test()&&(!steps[s].predict||A.pred[s]!=null))A.done(msg+A.reveal(s))};
const later=(fns,ms)=>{const k=++T.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===T.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{const t=(T.tok||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{tok:t,want:()=>{},placed:[],grab:null,pick:null,oops:null,found:[],temp:5,waits:0,drunk:0,lolly:{at:null,melt:0},tried:[],heat:START[0],fill:1,round:0})};
const steps=[
{h:'Hot, warm or cold?',p:'Touch with your eyes! Is it hot, warm or cold? Drag each one to a box.',task:'Sort all 6',
 show:()=>{steps[0].go();later(SORT.map(([,,k],i)=>()=>place(i,k)),220)},
 go:()=>{fresh();note('Drag the ice to a box, or tap it and tap a box.');btns();T.want=ready(0,()=>Object.keys(T.placed).length>=SORT.length,'Ice and snow are cold. A bath is warm. Fire is hot.')}},
{h:'Hot can hurt',p:'Hot things can burn. Some do not look hot. Tap the hot things.',predict:{q:'A pan is on the cooker. No steam. Is it safe to touch?',opts:['Yes','No, ask a grown-up'],ans:1},task:'Find the 3 hot things',
 show:()=>{steps[1].go();later([0,2,4].map(i=>()=>touch(i)),400)},
 go:()=>{fresh();note('Tap a hot thing.');btns();T.want=ready(1,()=>T.found.length>=3,'A hot pan can look the same as a cold one. Do not touch. Ask a grown-up.')}},
{h:'Cooling down',p:'The cocoa is too hot. Wait, and watch the red line. Drink it when it is warm.',predict:{q:'Hot cocoa sits on the table. What happens?',opts:['It gets cooler','It gets hotter'],ans:0},task:'Drink the cocoa when it is warm',
 show:()=>{steps[2].go();later([wait,wait,sip],500)},
 go:()=>{fresh();note('The cocoa is hot. The red line is tall.');btns();T.want=ready(2,()=>T.drunk,'Hot things left out cool down: hot, then warm, then cold.')}},
{h:'The ice lolly',p:'Drag the lolly to the sunny spot or the freezer. What happens?',predict:{q:'Where will the ice lolly melt?',opts:['In the warm sun','In the freezer'],ans:0},task:'Try both places',
 show:()=>{steps[3].go();later([()=>putLolly('ice'),()=>{T.lolly={at:null,melt:0};putLolly('sun')}],700)},
 go:()=>{fresh();note('Drag the lolly.');btns();T.want=ready(3,()=>T.tried.length>=2&&T.lolly.melt>=1||T.tried.length>=2&&T.lolly.at==='ice','Warm makes ice melt. Cold keeps it frozen.')}},
{h:'Bath time',p:'A bath should be warm. Use the hot tap and the cold tap. Then a grown-up checks.',task:'Make 2 baths warm',
 show:()=>{steps[4].go();later([()=>tap(1),()=>tap(1),()=>tap(1),check,()=>tap(-1),()=>tap(-1),()=>tap(-1),check],300)},
 go:()=>{fresh();note('This bath is too cold.');btns();T.want=ready(4,()=>T.round>=2,'Hot water makes it warmer. Cold water makes it cooler.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Which one is cold?',[['🧊 Ice','ok'],['☕ Hot drink','hot'],['🛁 Bath','warm']]],
 ['A pan is on the cooker. What do you do?',[['Ask a grown-up','ok'],['Touch it to check','touch'],['Pick it up','touch']]],
 ['Hot cocoa waits on the table. Then it is…',[['Cooler','ok'],['Hotter','hotter'],['Frozen ice','ice']]],
 ['What makes an ice lolly melt?',[['The warm sun','ok'],['The freezer','freezer'],['The dark','dark']]],
 ['The bath is too hot. What do you add?',[['Cold water','ok'],['Hot water','more'],['Bubbles','bubbles']]],
 ['Which is warm, not hot?',[['🍼 Baby milk','ok'],['🔥 Fire','fire'],['⛄ Snowman','snow']]]];
function tip(t){let m='Think: does it feel hot, warm or cold?';
 if(t==='hot')m='A hot drink is hot. Ice is the cold one.';
 if(t==='warm')m='A bath is warm. Ice is cold.';
 if(t==='touch')m='Never touch to check. A hot pan can burn. Ask a grown-up.';
 if(t==='hotter')m='Things left out cool down. The cocoa gets cooler, not hotter.';
 if(t==='ice')m='It cools to warm, then cold, but it does not turn to ice on a table.';
 if(t==='freezer')m='The freezer is cold. Cold keeps the lolly hard.';
 if(t==='dark')m='Dark is not warm. Warmth makes ice melt.';
 if(t==='more')m='Hot water makes it hotter. Add cold water to cool it.';
 if(t==='bubbles')m='Bubbles do not cool water. Add cold water.';
 if(t==='fire')m='Fire is hot, much hotter than warm.';
 if(t==='snow')m='A snowman is cold. Baby milk is warm.';
 return m}
function quiz(){n++;const[q,ops]=QS[n%QS.length],rot=n%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});note('Challenge: '+q);A.redraw()}
function grade(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+wins+'.':'✗ '+tip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;btns()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}});
A.start()})})();
