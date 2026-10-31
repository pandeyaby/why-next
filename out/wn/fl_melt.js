/* Flagship – melting and freezing (ages 4–5): drag an ice cube to the sunny window and watch it melt, put a cup of
   water in the freezer and watch it freeze, race three ice lollies (sun, table, freezer), turn a puddle back into ice
   and melt it again, then choose warm or cold to do kitchen jobs. Drag a thing to a place, or tap a big button. */
(()=>{
const SPOTS=[{id:'sun',name:'Sunny window',word:'warm',heat:.35,ic:'☀️'},{id:'room',name:'Table',word:'not hot, not cold',heat:.1,ic:'🪑'},{id:'cold',name:'Freezer',word:'very cold',heat:-.4,ic:'❄️'}];
const JOBS=[{t:'Make ice cubes',k:'cup',m:1,need:'cold'},{t:'Melt butter for a cake',k:'butter',m:0,need:'sun'},{t:'Keep the ice lolly hard',k:'lolly',m:0,need:'cold'},{t:'Melt chocolate to dip fruit',k:'choc',m:0,need:'sun'}];
const NAME={ice:'ice cube',cup:'cup of water',lolly:'ice lolly',butter:'butter',choc:'chocolate'};
VIS.reg('flagmelt',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,items:[],drag:null,boost:1,flash:-1,froze:0,melted:0,job:0,note:''}),S=fresh();
const mode=()=>['melt','freeze','race','back','jobs','quiz'][A.step],fast=()=>A.reduced();
const fz=n=>Math.round(n*(A.narrow?1:1.15)),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({melt:2,freeze:2,race:1,back:1,jobs:3}[mode()]||9);
function word(g,t,x,y,n,col,wt,mw){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
/* zones: three big boxes across the top; the tray sits underneath */
const zone=i=>{const w=A.W/3;return{x:w*i+5,y:A.H*.05,w:w-10,h:A.H*.6,cx:w*i+w/2,cy:A.H*.4}};
const tray=()=>({x:A.W/2,y:A.H*.83});
const spotAt=p=>{for(let i=0;i<3;i++){const z=zone(i);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y&&p.y<z.y+z.h+10)return i}return -1};
function drawZone(g,i){const z=zone(i),s=SPOTS[i],C=A.col,tint={sun:'#fde68a',room:'#fed7aa',cold:'#bfdbfe'}[s.id];
 g.fillStyle=A.mix(C.pn,tint,C.dark?.2:.6);A.paint.rrect(z.x,z.y,z.w,z.h,14);g.fill();g.lineWidth=i===S.flash?5:2;g.strokeStyle=i===S.flash?C.vi:A.mix(C.tx,C.pn,.5);g.stroke();
 if(s.id==='sun'){A.paint.ball(z.x+z.w-22,z.y+22,13,'#f59e0b')}
 if(s.id==='room'){g.fillStyle=A.mix('#92400e',C.pn,C.dark?.2:0);g.fillRect(z.x+10,z.cy+30,z.w-20,7)}
 if(s.id==='cold'){g.strokeStyle=A.mix('#1d4ed8',C.tx,C.dark?.6:0);g.lineWidth=2;const x=z.x+z.w-22,y=z.y+22;for(let a=0;a<3;a++){const t=a*Math.PI/3;g.beginPath();g.moveTo(x-11*Math.cos(t),y-11*Math.sin(t));g.lineTo(x+11*Math.cos(t),y+11*Math.sin(t));g.stroke()}}
 word(g,s.name,z.cx,z.y+z.h-34,14,0,0,z.w-6);word(g,s.word,z.cx,z.y+z.h-14,12,C.mu,700,z.w-6)}
/* one thing: m is how much has melted, 0 = hard and frozen, 1 = all runny */
function thing(g,it,x,y){const R=Math.min(A.W*.075,A.H*.11,44),m=it.m,C=A.col,edge=C.dark?'#e0f2fe':'#0c4a6e';g.lineWidth=2.5;
 if(it.k!=='cup'&&m>.02){g.fillStyle=A.alpha(it.k==='choc'?'#7c2d12':it.k==='butter'?'#facc15':it.k==='lolly'?'#f97316':'#38bdf8',.55);g.beginPath();g.ellipse(x,y+R*.9,R*(.4+m*.9),R*(.12+m*.18),0,0,7);g.fill()}
 if(it.k==='ice'){const s=R*(1-m*.75);if(s>3){g.fillStyle='#e0f2fe';A.paint.rrect(x-s,y+R*.9-2*s,2*s,2*s,s*.25);g.fill();g.strokeStyle=edge;g.stroke();g.fillStyle='#fff';g.fillRect(x-s*.55,y+R*.9-1.7*s,s*.35,s*.35)}}
 if(it.k==='cup'){const w=R*1.1,h=R*1.7,top=y+R*.9-h;g.fillStyle=A.mix('#38bdf8','#e0f2fe',1-m);g.fillRect(x-w+3,top+h*.3,2*w-6,h*.7-3);
  if(m<.5){g.strokeStyle='#0c4a6e';g.lineWidth=1.5;g.beginPath();g.moveTo(x-w*.5,top+h*.45);g.lineTo(x,top+h*.7);g.lineTo(x+w*.4,top+h*.5);g.stroke()}
  g.strokeStyle=edge;g.lineWidth=3;g.strokeRect(x-w,top,2*w,h)}
 if(it.k==='lolly'){const s=1-m*.7,h=R*1.6*s,w=R*.7;g.fillStyle='#d6a35c';g.fillRect(x-4,y+R*.9-R*.7,8,R*.7);if(s>.32){g.fillStyle='#f97316';A.paint.rrect(x-w,y+R*.2-h,2*w,h,w*.8);g.fill();g.strokeStyle=edge;g.stroke()}}
 if(it.k==='butter'||it.k==='choc'){const s=1-m*.7,w=R*1.1,h=R*.9*s;g.fillStyle=it.k==='butter'?'#fde047':'#78350f';g.fillRect(x-w,y+R*.9-h,2*w,h);g.strokeStyle=edge;g.strokeRect(x-w,y+R*.9-h,2*w,h)}
 word(g,m>.95&&it.k!=='cup'?'runny':it.k==='cup'?(m<.05?'ice!':m>.95?'water':'freezing…'):m<.05?'hard':'melting…',x,y+R*1.35,12,C.tx,700,A.W/3-10)}
function posOf(it){if(S.drag&&S.drag.it===it&&S.drag.x!=null)return S.drag;if(it.at<0)return tray();return{x:zone(it.at).cx,y:zone(it.at).cy}}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#f0f9ff',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(mode()==='quiz'){[0,1,2].forEach(drawZone.bind(null,g));word(g,'Warm melts. Cold freezes.',W/2,H*.82,16);return}
 [0,1,2].forEach(i=>drawZone(g,i));S.items.forEach(it=>{const p=posOf(it);thing(g,it,p.x,p.y)});
 const job=mode()==='jobs'&&S.won<need()?JOBS[S.job%4].t:'';word(g,job||S.note,W/2,H*.7,14,C.tx);A.fx.draw(g)}
/* the clock: every placed thing warms or cools a little each frame */
function tick(dt){if(mode()==='quiz'||!A)return false;let busy=false;for(const it of S.items){if(it.at<0)continue;const h=SPOTS[it.at].heat*S.boost*(fast()?40:1);
 const m0=it.m;it.m=Math.max(0,Math.min(1,it.m+h*dt));if(h>0?it.m<1:it.m>0)busy=true;if(m0<1&&it.m>=1)event(it,'melt');if(m0>0&&it.m<=0)event(it,'freeze')}return busy}
function event(it,kind){const v=mode();A.sound.pop();
 if(v==='melt'&&kind==='melt'){S.won++;say(S.won<need()?'The warm sun melted the ice. Now it is water. Here is a new ice cube.':'Warm made the ice melt into water.');next('ice',0)}
 if(v==='freeze'&&kind==='freeze'){S.won++;say(S.won<need()?'The cold freezer froze the water. Now it is hard ice. Here is a new cup.':'Cold made the water freeze into ice.');next('cup',1)}
 if(v==='race'&&kind==='melt'&&SPOTS[it.at].id==='sun'){S.won=1;say('The sunny one melted first! The table one is still melting, and the freezer one stays hard.')}
 if(v==='back'){if(kind==='freeze'){S.froze=1;say('The puddle froze back into ice! Now melt it again in the sun.');back(it)}else if(S.froze){S.won=1;say('Melted again! Ice can turn to water and water can turn back to ice.')}}
 S.want();keys();A.redraw()}
function back(it){const v=ver;setTimeout(()=>{if(v===ver){it.at=-1;A.redraw()}},fast()?10:500)}
function next(k,m){const v=ver;setTimeout(()=>{if(v!==ver||S.won>=need())return;S.items=[{k,m,at:-1}];A.redraw()},fast()?10:700)}
/* put the waiting thing in a spot */
function put(i){const v=mode();if(v==='quiz'||S.won>=need()&&v!=='race')return;const it=S.items.find(t=>t.at<0);if(!it)return;S.flash=i;setTimeout(()=>{S.flash=-1;A.redraw()},400);const s=SPOTS[i];
 if(v==='jobs')return job(it,i);
 if(v==='race'&&S.items.some(t=>t.at===i))return miss('There is a lolly there already. Pick another place.');
 if(v==='back'&&!S.froze&&s.id!=='cold')return miss('It is already runny water. Warm cannot make it ice. Try the freezer.');
 if(v==='melt'&&s.id==='cold')miss('Brr! The freezer is very cold. Cold keeps ice hard. Try the sunny window.');
 else if(v==='melt'&&s.id==='room')say('On the table it melts, but slowly. The sunny window is warmer.');
 else if(v==='freeze'&&s.id!=='cold')miss(`The ${s.name.toLowerCase()} is not cold enough. Water needs the freezer to turn to ice.`);
 else say(`The ${NAME[it.k]} is in the ${s.name.toLowerCase()}. Watch!`);
 if(v==='freeze'&&s.id!=='cold'||v==='melt'&&s.id==='cold')return;it.at=i;A.sound.tick();keys();A.redraw();A.kick();S.want()}
function job(it,i){const j=JOBS[S.job%4],s=SPOTS[i];if(s.id==='room')return miss('The table is not very warm and not cold. Pick the sunny window or the freezer.');
 if(s.id!==j.need)return miss(j.need==='cold'?`Warm melts things. To ${j.t.toLowerCase()}, you need cold: the freezer.`:`Cold makes things hard. To melt it, you need warm: the sunny window.`);
 it.at=i;S.won++;A.sound.pop();say(`Yes! ${j.need==='cold'?'Cold':'Warm'} is right to ${j.t.toLowerCase()}.`);const v=ver;
 setTimeout(()=>{if(v!==ver)return;S.job++;if(S.won<need())S.items=[{k:JOBS[S.job%4].k,m:JOBS[S.job%4].m,at:-1}];keys();A.redraw()},fast()?10:900);S.want();keys();A.redraw()}
function miss(t){A.sound.miss();say(t);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode();if(v==='quiz'||S.won>=need()||!S.items.some(t=>t.at<0))return;
 SPOTS.forEach((s,i)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':`Put it in the ${s.name.toLowerCase()}`},pad,`${s.ic} ${s.name}`);b.onclick=()=>put(i)})}
function down(p){if(mode()==='quiz')return false;const it=S.items.find(t=>t.at<0),t=tray();if(it&&Math.hypot(p.x-t.x,p.y-t.y)<60){S.drag={it,x:null,y:null,x0:p.x,y0:p.y};return true}
 const i=spotAt(p);if(i>=0&&it)put(i);return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const i=spotAt(p);if(d.x==null||i<0){say('Drag it up into a place: sunny window, table or freezer.');return A.redraw()}put(i)}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=(items,note)=>{ver++;Object.assign(S,fresh(),{items:items.map(([k,m])=>({k,m,at:-1})),note:note||''})};
const boost=()=>{S.boost=4};
const steps=[
{h:'Ice in the sun',p:'Here is a hard ice cube. Drag it to a place, or tap a button. Where will it melt?',predict:{q:'An ice cube sits in a sunny window. What happens?',opts:['It stays ice','It melts into water'],ans:1},task:'Melt 2 ice cubes',
 show:()=>{steps[0].go();play([boost,()=>put(0),()=>{},()=>{},()=>{},()=>{},()=>{boost();put(0)}],350)},go:()=>{wipe([['ice',0]],'Drag the ice cube up');say('Here is an ice cube. Where will it melt?');keys();S.want=ready(0,()=>S.won>=2,'Warm made the ice melt into water.')}},
{h:'Water in the freezer',p:'Now a cup of water. Which place will turn it into hard ice?',predict:{q:'You put a cup of water in the freezer. Later it is…',opts:['Still runny water','Hard ice'],ans:1},task:'Freeze 2 cups of water',
 show:()=>{steps[1].go();play([boost,()=>put(2),()=>{},()=>{},()=>{},()=>{},()=>{boost();put(2)}],350)},go:()=>{wipe([['cup',1]],'Drag the cup up');say('Here is a cup of water. Where will it freeze?');keys();S.want=ready(1,()=>S.won>=2,'Cold made the water freeze into ice.')}},
{h:'Which melts first?',p:'Put one ice lolly in each place. Then watch which one melts first.',predict:{q:'Which ice lolly will melt first?',opts:['On the table','In the sunny window','In the freezer'],ans:1},task:'Put a lolly in all 3 places',
 show:()=>{steps[2].go();play([boost,()=>put(0),()=>put(1),()=>put(2)],250)},go:()=>{wipe([['lolly',0],['lolly',0],['lolly',0]],'');say('Three ice lollies. Put one in each place.');keys();S.want=ready(2,()=>S.won>=1&&S.items.every(t=>t.at>=0),'The warmest place melts it first. The freezer keeps it hard.')}},
{h:'Back to ice',p:'This ice cube melted into a puddle. Can you turn it back into ice? Then melt it again.',task:'Freeze the puddle, then melt it',
 show:()=>{steps[3].go();play([boost,()=>put(2),()=>{},()=>{},()=>{},()=>{boost();put(0)}],320)},go:()=>{wipe([['ice',1]],'');say('A puddle of melted ice. Can it become ice again?');keys();S.want=ready(3,()=>S.won>=1,'Melting and freezing go both ways: ice to water, water to ice.')}},
{h:'Warm or cold?',p:'Read the job. Do you need warm or cold? Put the thing in the right place.',task:'Do 3 jobs',
 show:()=>{steps[4].go();play(JOBS.slice(0,3).map(j=>()=>put(j.need==='cold'?2:0)),1000)},go:()=>{wipe([[JOBS[0].k,JOBS[0].m]],'');say('Job: '+JOBS[0].t+'. Warm or cold?');keys();S.want=ready(4,()=>S.won>=3,'Warm melts things. Cold freezes things.')}},
{h:'Challenge',p:'',go:()=>{wipe([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['An ice lolly is left in the hot sun. What happens?',[['It melts','ok'],['It gets harder','hard'],['Nothing at all','nothing']]],
 ['You want ice cubes. Where do you put the water?',[['In the freezer','ok'],['In the sunny window','warm'],['In a warm bath','warm']]],
 ['Ice melts into a puddle. Can it be ice again?',[['Yes, if it gets very cold','ok'],['No, never again','never'],['Yes, if it gets warm','warmice']]],
 ['Which ice cube melts first?',[['The one in the sun','ok'],['The one in the freezer','hard'],['They melt the same','same']]],
 ['A snowman melts. Why?',[['The day got warm','ok'],['It got too cold','cold'],['It got tired','tired']]]];
function hint(t){let m='Warm melts things. Cold freezes things.';
 if(t==='hard')m='Heat does not make ice harder. Warm makes ice melt and go runny.';
 if(t==='nothing')m='Watch the sun place in the lab. Ice in the warm sun melts into water.';
 if(t==='warm')m='Warm places melt ice. To make ice, water needs to get very cold, like in the freezer.';
 if(t==='never')m='Put the puddle in the freezer and it turns back into ice. It goes both ways.';
 if(t==='warmice')m='Warm makes ice melt. To turn water back into ice, it needs cold.';
 if(t==='same')m='In the race, the sunny one melted first. The warmer the place, the faster it melts.';
 if(t==='cold')m='Cold keeps snow hard. A snowman melts when the day gets warm.';
 if(t==='tired')m='Snow is not alive and does not get tired. Warm air melts the snow into water.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Warm melts and cold freezes.':'✗ '+hint(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.every(tick);A.gest({down,move,up});keys()}});
A.start()})})();
