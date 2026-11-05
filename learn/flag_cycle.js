/* Flagship: drawing life cycle diagrams (ages 7-8; KS2 life cycles as circular diagrams with ordered stages and
   arrows). Build butterfly, frog and plant cycles, fix a missing arrow, and spot a stage in the wrong place.
   Every tap has a button twin. */
(()=>{
VIS.reg('flagcycle',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['butt','frog','plant','fix','sand','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function ring(cx,cy,r){const g=A.ctx,C=A.col,n=S.order.length;g.strokeStyle=A.alpha(C.tx,.25);g.lineWidth=2;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();
 for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;A.paint.rrect(x-36,y-18,72,36,10);const filled=S.placed[i];g.fillStyle=filled?A.alpha(C.gr,.3):A.alpha(C.tx,.06);g.fill();g.strokeStyle=filled?C.gr:A.alpha(C.tx,.4);g.lineWidth=filled?2.5:1.5;g.stroke();T(filled||'?',x,y,A.narrow?11:13,{w:800,max:70});
  if(S.arrows.has(i)){const a2=-Math.PI/2+((i+1)%n)*2*Math.PI/n,x2=cx+Math.cos(a2)*r,y2=cy+Math.sin(a2)*r,mx=(x+x2)/2,my=(y+y2)/2;g.strokeStyle=C.ac;g.lineWidth=2.5;g.beginPath();g.moveTo(x*0.3+x2*0.7,y*0.3+y2*0.7);g.lineTo(x2,y2);g.stroke();T('→',mx,my,14,{c:C.ac})}}}
function place(name){const i=S.next;if(i>=S.order.length)return;if(name!==S.order[i]){A.sound.miss();say('Next should be '+S.order[i]+', not '+name+'.');return}
 S.placed[i]=name;S.next++;A.sound.tick();say(name+' placed.'+(S.next<S.order.length?' Next?':' Cycle stages complete.'));A.redraw();S.check()}
function addArrow(){const need=[...Array(S.order.length).keys()].find(i=>!S.arrows.has(i));if(need==null)return;S.arrows.add(need);A.sound.tick();say('Arrow added. '+(S.arrows.size===S.order.length?'The cycle is closed.':''));A.redraw();S.check()}
function fixWrong(choice){if(choice===S.wrongAt){S.fixed=1;A.sound.tick();say('Yes: '+S.placed[S.wrongAt]+' was in the wrong place. Put '+S.order[S.wrongAt]+' there.');S.placed[S.wrongAt]=S.order[S.wrongAt];A.redraw();S.check();return}
 A.sound.miss();say('That stage is fine. Find the one that breaks the order.')}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.3);g.fillRect(0,0,W,H);const k=kind();
 if(k==='chal'){T('Life cycles go in a circle with arrows',W/2,H*.28,A.narrow?14:17);T('Butterfly: egg → larva → pupa → adult',W/2,H*.46,A.narrow?13:15);T('Frog: spawn → tadpole → froglet → adult',W/2,H*.62,A.narrow?13:15);T('Plant: seed → seedling → plant → flower',W/2,H*.78,A.narrow?13:15,{c:C.mu});A.fx.draw(g);return}
 ring(W/2,H*.42,Math.min(W,H)*.28);T(S.title||'',W/2,16,A.narrow?14:17,{w:900});
 if(k==='fix')T(S.fixed?'Fixed: stages are in order again':'Tap the stage that is in the wrong place',W/2,H*.88,A.narrow?12:14,{c:C.mu});
 else T('Place stages in order around the circle',W/2,H*.9,12,{c:C.mu});A.fx.draw(g)}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{placed:[],next:0,arrows:new Set(),fixed:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*280))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='fix'){S.order.forEach((_,i)=>btn('Wrong: slot '+(i+1)+' ('+(S.placed[i]||'?')+')',()=>fixWrong(i)));return}
 S.order.forEach(n=>{if(S.placed.includes(n))return;btn('Place '+n,()=>place(n))});
 if(S.next>=S.order.length&&S.arrows.size<S.order.length)btn('Add next arrow',addArrow,'Add the next arrow around the cycle')}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='fix'){/* nearest stage slot */ const cx=A.W/2,cy=A.H*.42,r=Math.min(A.W,A.H)*.28,n=S.order.length;let best=-1,bd=1e9;
  for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r,d=Math.hypot(p.x-x,p.y-y);if(d<bd){bd=d;best=i}}
  if(best>=0&&bd<50){fixWrong(best);return true}return false}
 if(S.next<S.order.length){place(S.order[S.next]);return true}
 if(S.arrows.size<S.order.length){addArrow();return true}return false}
const steps=[
{h:'Butterfly cycle',p:'Egg → larva (caterpillar) → pupa (chrysalis) → adult. Place the stages, then add arrows to close the circle.',
 predict:{q:'What comes after the caterpillar?',opts:['pupa (chrysalis)','egg','spawn'],ans:0},
 task:'Place all four butterfly stages and add the arrows',show:()=>auto(0,['egg','larva','pupa','adult'].map(n=>()=>place(n)).concat(Array(4).fill(addArrow))),
 go:()=>{reset({order:['egg','larva','pupa','adult'],placed:[],title:'Butterfly life cycle'});say('Build the butterfly cycle in order.');controls();S.check=finish(0,()=>S.placed.length===4&&S.arrows.size===4,'Egg → larva → pupa → adult, then back to eggs.')}},
{h:'Frog cycle',p:'Spawn → tadpole → froglet → adult frog. Same idea: stages in order on a circle with arrows.',
 predict:{q:'Frog spawn hatches into…',opts:['tadpoles','froglets','butterflies'],ans:0},
 task:'Place all four frog stages and close the cycle',show:()=>auto(1,['spawn','tadpole','froglet','adult'].map(n=>()=>place(n)).concat(Array(4).fill(addArrow))),
 go:()=>{reset({order:['spawn','tadpole','froglet','adult'],placed:[],title:'Frog life cycle'});say('Build the frog cycle in order.');controls();S.check=finish(1,()=>S.placed.length===4&&S.arrows.size===4,'Spawn → tadpole → froglet → adult frog.')}},
{h:'Plant cycle',p:'Seed → seedling → plant → flower. The flower leads to fruit and new seeds, so the cycle continues.',
 predict:{q:'Which plant stage comes first?',opts:['seed','flower','fruit'],ans:0},
 task:'Place all four plant stages and add the arrows',show:()=>auto(2,['seed','seedling','plant','flower'].map(n=>()=>place(n)).concat(Array(4).fill(addArrow))),
 go:()=>{reset({order:['seed','seedling','plant','flower'],placed:[],title:'Flowering plant life cycle'});say('Build the plant cycle in order.');controls();S.check=finish(2,()=>S.placed.length===4&&S.arrows.size===4,'Seed → seedling → plant → flower → new seeds.')}},
{h:'Fix the diagram',p:'One stage is in the wrong place. Find it so the order reads correctly around the circle.',
 predict:{q:'Egg → adult → pupa → larva is wrong because…',opts:['the stages are out of order','there are too many stages','frogs do not have eggs'],ans:0},
 task:'Tap the stage that is in the wrong place',show:()=>auto(3,[()=>fixWrong(1)]),
 go:()=>{reset({order:['egg','larva','pupa','adult'],placed:['egg','adult','pupa','larva'],next:4,arrows:new Set([0,1,2,3]),wrongAt:1,title:'Broken butterfly cycle'});say('One stage is wrong. Tap it.');controls();S.check=finish(3,()=>S.fixed,'The second stage should be larva, not adult.')}},
{h:'Sandbox: bird cycle',p:'Free play. A bird cycle is egg → chick → young bird → adult. Place the stages and close the arrows.',
 predict:{q:'A bird life cycle starts with…',opts:['an egg','a tadpole','a chrysalis'],ans:0},
 task:'Place four bird stages and add the arrows',show:()=>auto(4,['egg','chick','young','adult'].map(n=>()=>place(n)).concat(Array(4).fill(addArrow))),
 go:()=>{reset({order:['egg','chick','young','adult'],placed:[],title:'Bird life cycle'});say('Build a simple bird cycle.');controls();S.check=finish(4,()=>S.placed.length===4&&S.arrows.size===4,'Egg → chick → young → adult bird.')}},
{h:'Challenge',p:'',go:()=>{reset({order:[],placed:[]});next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['After caterpillar comes…',[['pupa (chrysalis)','ok'],['egg','egg'],['spawn','spawn']]],
 ['Why a circle?',[['offspring restart the stages','ok'],['animals are round','round'],['it is random','rand']]],
 ['Larva of a butterfly is a…',[['caterpillar','ok'],['chrysalis','pup'],['tadpole','tad']]],
 ['A froglet is…',[['a young frog with legs','ok'],['an egg in jelly','egg'],['a fish','fish']]],
 ['Plant stage that makes seeds?',[['flower (then fruit)','ok'],['seedling only','seed'],['root only','root']]],
 ['Mia draws egg → caterpillar → butterfly. Missing?',[['pupa, and the return to eggs','ok'],['nothing','none'],['a tadpole','tad']]],
 ['Adult → egg is valid because…',[['adults produce the next generation','ok'],['eggs are older than adults','old'],['arrows can go any way','rand']]]];
function why(t){let m='Keep stages in order and close the loop with arrows.';
 if(t==='egg')m='Eggs come first, not after the caterpillar. Next is the pupa.';
 if(t==='spawn')m='Spawn is for frogs, not butterflies.';
 if(t==='round'||t==='rand')m='The circle means offspring start the same stages again — not because shapes are round.';
 if(t==='pup')m='The chrysalis is the pupa. The larva is the caterpillar.';
 if(t==='tad')m='Tadpoles are frog stages, not butterfly stages.';
 if(t==='fish')m='A froglet is a tiny frog with legs, not a fish.';
 if(t==='seed'||t==='root')m='Seeds form after the flower is pollinated and becomes a fruit.';
 if(t==='none')m='Butterfly metamorphosis has four stages; she skipped the pupa and the return arrow.';
 if(t==='old')m='Adults are not younger than eggs; they produce them.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.55,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Life cycle controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset({order:[],placed:[]});
  A.gest({down:p=>down(p)});controls()}});
A.start()})})();
