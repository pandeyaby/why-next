/* Flagship – testing an idea with examples and non-examples (ages 7–9; EEF 2021 metacognition guidance; Frayer model;
   Tennyson and Park 1980 matched non-examples; Winston 1970 near misses). Scenes: sort triangles from near misses,
   name what each near miss lacks, split must-have features from ones that do not matter, sort mammals including
   whale, bat and penguin, and break then fix a bird rule with counter-examples. Data in learn/nonex_art.js. */
(()=>{const {SHAPES,FEATS,ANIMALS,BIRDS,FIXES,DESC,DONE,QS}=NEX;
VIS.reg('flagnonex',c=>{let A,row,box,turn=-1,ver=0;const N={};
const INKC='#1f2937',YESC='#166534',NOC2='#b91c1c',RIMC='#71717a',ONC='#9333ea',PX='px system-ui,sans-serif';
const sc=()=>['shapes','near','feats','animals','rule','quiz'][A.step];
const up=v=>A.narrow?v:Math.round(v*1.14);
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.07:.4);g.fillRect(0,0,A.W,A.H)}
function say2(t,x,y,v,col,w){const g=A.ctx;g.font=`${w||800} ${up(v)}${PX}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function chip(t,y,o){o=o||{};const g=A.ctx;let v=up(o.v||14);g.font=`800 ${v}${PX}`;let w=g.measureText(t).width+26;
 while(w>A.W-8&&v>10){v--;g.font=`800 ${v}${PX}`;w=g.measureText(t).width+26}
 const h=v+15,x0=Math.max(4,(A.W-w)/2);g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,8);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YESC:o.no?NOC2:RIMC;g.stroke();
 g.fillStyle=INKC;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function panel(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?NOC2:o.ok?YESC:o.on?ONC:RIMC;g.stroke()}
function lines(t,x,y,w,v){const g=A.ctx;g.font=`800 ${up(v)}${PX}`;const ws=t.split(' '),out=[];let cur='';ws.forEach(wd=>{const nx=cur?cur+' '+wd:wd;if(g.measureText(nx).width>w-10&&cur){out.push(cur);cur=wd}else cur=nx});out.push(cur);
 const lh=up(v)+3;out.forEach((ln,i)=>{g.fillStyle=INKC;g.textAlign='center';g.textBaseline='middle';g.fillText(ln,x,y+(i-(out.length-1)/2)*lh)})}
function layout(n,cols,y0,h,maxW){const gap=8,w=Math.min(maxW||150,(A.W-16-gap*(cols-1))/cols),x0=(A.W-(w*cols+gap*(cols-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
/* draw a shape from unit points into a square */
function shape(S,cx,cy,s){const g=A.ctx,P=S.p.map(([u,v])=>[cx+(u-.5)*s,cy+(v-.5)*s]);g.lineWidth=Math.max(2.5,s*.05);g.strokeStyle='#4338ca';g.fillStyle='rgba(99,102,241,.18)';g.lineJoin='round';g.beginPath();
 if(S.d==='open'){const at=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t],q=at(P[0],P[1],.2),e=at(P[2],P[0],.76);g.moveTo(q[0],q[1]);g.lineTo(P[1][0],P[1][1]);g.lineTo(P[2][0],P[2][1]);g.lineTo(e[0],e[1]);g.stroke();return}
 g.moveTo(P[0][0],P[0][1]);for(let k=1;k<P.length;k++){if(S.d==='curve'&&k===1)g.quadraticCurveTo(cx+s*.5,cy-s*.25,P[1][0],P[1][1]);else g.lineTo(P[k][0],P[k][1])}g.closePath();g.fill();g.stroke()}
/* generic two-box sort used by scenes 1, 3 and 4 */
const SORTS={shapes:{list:SHAPES,names:['Triangle','Not a triangle'],ok:i=>SHAPES[i].ok?0:1},feats:{list:FEATS,names:['Must have','Does not matter'],ok:i=>FEATS[i][2]?0:1},animals:{list:ANIMALS,names:['Mammal','Not a mammal'],ok:i=>ANIMALS[i].ok?0:1}};
const twoBins=()=>[0,1].map(k=>{const w=(A.W-30)/2;return{k,x:10+k*(w+10),y:A.H*.12,w,h:A.H*.32}});
const sortR=k=>k==='feats'?layout(6,2,A.H*.5,Math.min(A.H*.13,54),220):layout(6,3,A.H*.5,Math.min(A.H*.2,90),150);
function sortState(k){return k==='shapes'?N.a:k==='feats'?N.c:N.d}
function drawSort(k){const S=SORTS[k],s=sortState(k),g=A.ctx;bg();
 twoBins().forEach(b=>{g.fillStyle=b.k?(A.col.dark?'#3f1d1d':'#ffe4e6'):(A.col.dark?'#123524':'#dcfce7');A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=s.hot===b.k?4:2;g.strokeStyle=s.hot===b.k?ONC:RIMC;g.stroke();
  say2(S.names[b.k],b.x+b.w/2,b.y+16,13,A.col.dark?'#f8fafc':INKC);
  const inside=s.put.filter(i=>S.ok(i)===b.k);inside.forEach((i,j)=>{if(k==='shapes'){const cols=3,sz=Math.min(b.w/cols-6,b.h*.32);shape(SHAPES[i],b.x+(j%cols+.5)*b.w/cols,b.y+38+sz/2+Math.floor(j/cols)*(sz+6),sz)}
   else say2(k==='feats'?FEATS[i][0]:ANIMALS[i].n,b.x+b.w/2,b.y+36+j*up(15),11,A.col.dark?'#f8fafc':INKC,700)})});
 const done=s.put.length>=S.list.length;chip(done?'All sorted':'Drag each card into a box, or tap it then a box',A.H*.045,{ok:done,v:12});
 sortR(k).forEach(r=>{if(s.put.includes(r.i)||(N.drag&&N.drag.i===r.i))return;sortCard(k,r,r.i,{no:s.bad===r.i,on:s.pick===r.i})});
 if(N.drag){const d=N.drag,r=sortR(k)[d.i];sortCard(k,{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},d.i,{on:1})}}
function sortCard(k,r,i,o){panel(r,o);if(k==='shapes')shape(SHAPES[i],r.x+r.w/2,r.y+r.h/2,Math.min(r.w,r.h)*.8);else lines(k==='feats'?FEATS[i][0]:ANIMALS[i].n,r.x+r.w/2,r.y+r.h/2,r.w,k==='feats'?12:15)}
function place(k,i,b){const S=SORTS[k],s=sortState(k);if(s.put.includes(i))return;s.pick=null;
 if(S.ok(i)!==b){s.bad=i;A.sound.miss();return note(missWhy(k,i))}
 s.put.push(i);s.bad=-1;A.sound.pop();note(hitWhy(k,i)+(s.put.length>=S.list.length?' All sorted.':` ${s.put.length} of 6.`))}
function missWhy(k,i){if(k==='shapes'){const S=SHAPES[i];return S.ok?`It is ${S.n}. Turned or stretched, 3 straight sides that close up still make a triangle.`:`It is ${S.n}: a near miss. It looks close, but it ${S.miss==='closed'?'is not closed':S.miss==='straight'?'has a curved side':'has 4 sides'}.`}
 if(k==='feats'){const F=FEATS[i];return F[2]?`Take away "${F[0].toLowerCase()}" and you get a near miss, so it is a must-have.`:`Some triangles are not ${F[1]==='up'?'pointing up':F[1]==='equal'?'equal-sided':'big'}, and they are still triangles. It does not matter.`}
 const An=ANIMALS[i];return An.why||(An.ok?`A ${An.n.toLowerCase()} feeds its babies milk, so it is a mammal.`:`A ${An.n.toLowerCase()} does not feed its babies milk.`)}
function hitWhy(k,i){if(k==='shapes')return `Yes: ${SHAPES[i].n}.`;if(k==='feats')return `Yes: ${FEATS[i][0].toLowerCase()} ${FEATS[i][2]?'is a must-have':'does not matter'}.`;const An=ANIMALS[i];return `Yes: ${An.n}${An.near?', a near miss for looks':''}.`}
/* 2. what does the near miss lack? */
const NEAR=SHAPES.map((s,i)=>i).filter(i=>SHAPES[i].miss),PICKS=[['Closed, no gaps','closed'],['Sides are straight','straight'],['Exactly 3 sides','three'],['Points upwards','up']];
const pickR=()=>layout(4,2,A.H*.6,Math.min(A.H*.15,60),220);
function drawNear(){const s=N.b;bg();if(s.r>=NEAR.length){chip('Each near miss broke one must-have',A.H*.12,{ok:1});NEAR.forEach((i,j)=>shape(SHAPES[i],A.W*(.2+j*.3),A.H*.42,Math.min(A.W*.22,110)));return}
 const S=SHAPES[NEAR[s.r]];chip(`Near miss ${s.r+1} of 3: what is it missing?`,A.H*.06,{v:13});shape(S,A.W/2,A.H*.33,Math.min(A.W*.38,A.H*.36));
 pickR().forEach(r=>{panel(r,{no:s.bad===r.i});lines(PICKS[r.i][0],r.x+r.w/2,r.y+r.h/2,r.w,12)})}
function lacks(j){const s=N.b;if(s.r>=NEAR.length)return;const S=SHAPES[NEAR[s.r]],want=S.miss,got=PICKS[j][1];
 if(got!==want){s.bad=j;A.sound.miss();return note(got==='up'?'Which way it points never matters. Look at its sides and corners.':`It ${got==='closed'?'is closed':got==='straight'?'has straight sides':'has 3 sides'}. Find the must-have it breaks.`)}
 s.bad=-1;A.sound.pop();s.r++;note(`Yes: ${S.n} is not ${want==='closed'?'closed':want==='straight'?'all straight':'3-sided'}.`)}
/* 5. break the rule, then fix it */
const birdR=()=>layout(4,4,A.H*.26,Math.min(A.H*.2,80),130),fixR=()=>layout(3,1,A.H*.55,Math.min(A.H*.11,44),340);
function drawRule(){const s=N.e,g=A.ctx;bg();chip(s.fixed?'New rule: a bird is an animal with feathers':'Rule: "A bird is an animal that flies."',A.H*.06,{v:13,ok:s.fixed});
 chip(s.found.length<2?`Tap the cards that break the rule (${s.found.length} of 2)`:s.fixed?'It fits every card':'Now pick a better rule',A.H*.15,{v:12});
 birdR().forEach(r=>{const B=BIRDS[r.i],f=s.found.includes(r.i);panel(r,{ok:f,no:s.bad===r.i});lines(B.n,r.x+r.w/2,r.y+r.h*.32,r.w,14);
  say2(B.flies?'flies':'cannot fly',r.x+r.w/2,r.y+r.h*.62,11,'#374151',700);say2(B.feathers?'feathers':'fur',r.x+r.w/2,r.y+r.h*.82,11,'#374151',700)});
 if(s.found.length>=2&&!s.fixed)fixR().forEach(r=>{panel(r,{no:s.badFix===r.i});lines(FIXES[r.i][0],r.x+r.w/2,r.y+r.h/2,r.w,12)})}
function breaks(i){const s=N.e;if(s.found.includes(i)||s.found.length>=2)return;const B=BIRDS[i],bird=B.feathers;
 if(B.flies===1&&bird){s.bad=i;A.sound.miss();return note(`${B.n} flies and is a bird. It fits the rule, so it does not break it.`)}
 s.found.push(i);s.bad=-1;A.sound.pop();note(B.flies?`${B.n} flies but is not a bird: the rule lets a non-example in.`:`${B.n} is a bird that cannot fly: the rule shuts an example out.`)}
function fix(j){const s=N.e;if(s.found.length<2||s.fixed)return;if(!FIXES[j][1]){s.badFix=j;A.sound.miss();return note(/flies/.test(FIXES[j][0])?'That is the old rule. The bat still gets in and the penguin is still left out.':'A bat has wings too, so this rule still lets the bat in.')}
 s.fixed=true;s.badFix=-1;A.sound.pop();note('Feathers fits robin, eagle and penguin, and keeps the bat out.')}
function draw(){const k=sc();if(k==='quiz'){bg();chip('Challenge',A.H*.2,{ok:1});chip('Examples, non-examples and near misses',A.H*.5,{v:13});return}
 if(k==='near')drawNear();else if(k==='rule')drawRule();else drawSort(k);A.fx.draw(A.ctx)}
function down(p){const k=sc();
 if(k==='near'){const r=pickR().find(r=>isIn(p,r));if(r)lacks(r.i);return false}
 if(k==='rule'){const r=birdR().find(r=>isIn(p,r));if(r)return breaks(r.i),false;if(N.e.found.length>=2){const f=fixR().find(r=>isIn(p,r));if(f)fix(f.i)}return false}
 const s=sortState(k),r=sortR(k).find(r=>isIn(p,r)&&!s.put.includes(r.i));if(r){N.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const b=twoBins().find(b=>isIn(p,b));if(b&&s.pick!=null)place(k,s.pick,b.k);return false}
function move(p){const d=N.drag;if(!d)return;d.x=p.x;d.y=p.y;const s=sortState(sc()),b=twoBins().find(b=>isIn(p,b));s.hot=b?b.k:-1;A.redraw()}
function lift(p){const d=N.drag;if(!d)return;N.drag=null;const k=sc(),s=sortState(k);s.hot=-1;const b=twoBins().find(b=>isIn(p,b));if(b)return place(k,d.i,b.k);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){s.pick=d.i;return note('Picked. Now tap a box.')}A.redraw()}
function wipe(){ver++;for(const k in N)delete N[k];const srt=()=>({put:[],bad:-1,hot:-1,pick:null});Object.assign(N,{a:srt(),b:{r:0,bad:-1},c:srt(),d:srt(),e:{found:[],bad:-1,fixed:false,badFix:-1},drag:null,check:()=>{}})}
function note(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();N.check()}
const whenOk=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){wipe();note(DESC[i]);N.check=whenOk(i,ok,DONE[i])}
function replay(i,acts,ms){steps[i].go();const v0=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v0===ver)f()},ms*(j+1)))}
const label=(k,i)=>k==='shapes'?SHAPES[i].n:k==='feats'?FEATS[i][0]:ANIMALS[i].n;
function keys(){if(!row)return;row.innerHTML='';const k=sc(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(SORTS[k]){const S=SORTS[k],s=sortState(k);S.list.forEach((_,i)=>{if(!s.put.includes(i))[0,1].forEach(b=>B(`${label(k,i)} → ${S.names[b]}`,()=>place(k,i,b)))})}
 if(k==='near'&&N.b.r<NEAR.length)PICKS.forEach((p,j)=>B(p[0],()=>lacks(j),`It is missing: ${p[0]}`));
 if(k==='rule'){if(N.e.found.length<2)BIRDS.forEach((b,i)=>{if(!N.e.found.includes(i))B(`${b.n} breaks the rule`,()=>breaks(i))});else if(!N.e.fixed)FIXES.forEach((f,j)=>B(f[0],()=>fix(j)))}}
const steps=[
{h:'Triangle or not?',p:'Sort the shapes. Some are triangles in odd positions; some are near misses that only look close.',
 predict:{q:'A triangle is turned upside down. Is it still a triangle?',opts:['No, triangles point up','Yes, turning does not change it'],ans:1},task:'Sort all 6 shapes',
 show:()=>replay(0,SHAPES.map((S,i)=>()=>place('shapes',i,S.ok?0:1)),450),
 go:()=>enter(0,()=>N.a.put.length>=6)},
{h:'Near misses',p:'A near miss is nearly an example but misses one thing that matters. Tap what each one is missing.',task:'Name what all 3 are missing',
 show:()=>replay(1,NEAR.map(i=>()=>lacks(PICKS.findIndex(p=>p[1]===SHAPES[i].miss))),600),
 go:()=>enter(1,()=>N.b.r>=NEAR.length)},
{h:'Must have?',p:'Use your examples and near misses. Which features must every triangle have, and which do not matter?',
 predict:{q:'Must a triangle have sides of the same length?',opts:['Yes, all its sides match','No, only some triangles do'],ans:1},task:'Sort all 6 features',
 show:()=>replay(2,FEATS.map((F,i)=>()=>place('feats',i,F[2]?0:1)),450),
 go:()=>enter(2,()=>N.c.put.length>=6)},
{h:'Mammal or not?',p:'Same tool, new idea. A mammal feeds its babies milk. Watch for near misses that look like something else.',
 predict:{q:'A whale lives in the sea like a fish. Is it a mammal?',opts:['No, it lives in water','Yes, it feeds its baby milk'],ans:1},task:'Sort all 6 animals',
 show:()=>replay(3,ANIMALS.map((An,i)=>()=>place('animals',i,An.ok?0:1)),450),
 go:()=>enter(3,()=>N.d.put.length>=6)},
{h:'Break the rule',p:'Test a rule with examples and non-examples. Find the cards that break it, then pick a better rule.',task:'Find 2 rule-breakers and fix the rule',
 show:()=>replay(4,[()=>breaks(1),()=>breaks(2),()=>fix(0)],700),
 go:()=>enter(4,()=>N.e.fixed)},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>N.check()});
function slip(t){let m='Test the idea with examples, non-examples and near misses.';
 if(t==='proto')m='Do not judge by the usual picture. Turned, stretched or uneven, it still counts if it has the must-haves.';
 if(t==='nearmiss')m='That is a near miss: it looks close but breaks one must-have.';
 if(t==='surface')m='Looks and where it lives can fool you. Check the must-have feature instead.';
 if(t==='one')m='One example cannot prove a rule. Look for a non-example that has the same feature.';
 if(t==='loose')m='That card fits the rule and is a bird. Look for one that flies but is not a bird.';
 if(t==='nonex')m='Non-examples show where an idea stops, so they help you find the must-haves.';
 return m}
function next(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:S=>{box.hidden=S.step!==5;row.hidden=S.step===5;keys()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Examples and non-examples lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up:lift});keys()}}).start()})})();
