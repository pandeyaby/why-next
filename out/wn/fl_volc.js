/* Flagship: what is a volcano (ages 5–7; earth science: vent, crater, magma, lava, eruption, ash).
   Build a cutaway mountain, fill the pipe with magma, erupt lava down the slope, label crater and ash,
   sort magma vs lava, then a challenge that traps magma/lava mix-ups and "every mountain is a volcano". */
(()=>{
VIS.reg('flagvolc',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['build','magma','erupt','label','sort','mix','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function mountain(g){const W=A.W,H=A.H,C=A.col;
 g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.3);g.fillRect(0,0,W,H);
 g.fillStyle=A.alpha(C.or,.35);g.beginPath();g.moveTo(W*.1,H*.85);g.lineTo(W*.5,H*.2);g.lineTo(W*.9,H*.85);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 if(S.built){g.fillStyle=A.alpha(C.tx,.15);g.fillRect(W*.46,H*.28,W*.08,H*.5);g.strokeStyle=C.tx;g.strokeRect(W*.46,H*.28,W*.08,H*.5)}
 if(S.magma){g.fillStyle=A.alpha(C.or,.85);g.fillRect(W*.47,H*.35,W*.06,H*.4);T('magma',W*.28,H*.55,12,{c:C.mu})}
 if(S.lava){g.strokeStyle=C.or;g.lineWidth=8;g.beginPath();g.moveTo(W*.54,H*.32);g.lineTo(W*.78,H*.7);g.stroke();T('lava',W*.78,H*.62,12,{c:C.or})}
 if(S.crater){g.beginPath();g.ellipse(W*.5,H*.22,W*.08,H*.04,0,0,7);g.strokeStyle=C.tx;g.lineWidth=3;g.stroke();T('crater',W*.5,H*.12,13,{w:800})}
 if(S.ash){g.fillStyle=A.alpha(C.tx,.25);for(let i=0;i<8;i++){g.beginPath();g.arc(W*.35+i*W*.04,H*.1+(i%3)*8,4,0,7);g.fill()}T('ash',W*.72,H*.12,12,{c:C.mu})}
}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.3);g.fillRect(0,0,W,H);T('Magma under — lava out',W/2,H*.35,A.narrow?15:18,{w:900});T('Crater, ash, eruption',W/2,H*.55,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
  T('Magma or lava?',W/2,H*.08,A.narrow?15:18,{w:800});
  const items=S.sortItems||[],i=S.sortIdx||0;
  if(i<items.length){T(items[i][0],W/2,H*.4,A.narrow?14:17,{max:W*.9});T(items[i][1],W/2,H*.58,A.narrow?16:20,{w:800})}
  else T('All sorted!',W/2,H*.45,20,{c:C.gr});
  T(`Clue ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu});A.fx.draw(g);return}
 if(k==='mix'){g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,W,H);
  T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:15,{max:W*.84})});A.fx.draw(g);return}
 mountain(g);
 if(k==='build')T(S.built?'Cutaway pipe ready — the vent path':'Tap to show the pipe inside the mountain',W/2,H*.92,A.narrow?12:14,{c:C.mu});
 if(k==='magma')T(S.magma?'Magma fills the pipe under the ground':'Fill the pipe with magma',W/2,H*.92,A.narrow?12:14,{c:C.mu});
 if(k==='erupt')T(S.lava?'Lava flows on the surface':'Erupt — send lava down the slope',W/2,H*.92,A.narrow?12:14,{c:C.mu});
 if(k==='label')T((S.crater&&S.ash)?'Crater and ash labelled':'Label the crater, then the ash',W/2,H*.92,A.narrow?12:14,{c:C.mu});
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{built:0,magma:0,lava:0,crater:0,ash:0,sortItems:[],sortIdx:0,opts:[],picked:null,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function sortPick(which){if(S.sortIdx>=S.sortItems.length)return;const want=S.sortItems[S.sortIdx][2];
 if(which!==want){A.sound.miss();say(want==='magma'?'That clue is magma — still under the ground.':want==='lava'?'That clue is lava — on the surface.':'That is neither magma nor lava.');return}
 S.sortIdx++;A.sound.tick();say(S.sortIdx>=S.sortItems.length?'All sorted.':'Yes. Next clue.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='build')btn('Show the pipe (vent path)',()=>{S.built=1;A.sound.tick();say('The pipe is the path from deep rock to the top.');A.redraw();S.check()},'Show the vent pipe inside');
 if(kind()==='magma')btn('Fill with magma',()=>{S.magma=1;A.sound.pop();say('Magma is hot melted rock still under the ground.');A.redraw();S.check()},'Fill the pipe with magma');
 if(kind()==='erupt')btn('Erupt lava',()=>{S.lava=1;A.sound.win();say('Lava is magma that has reached the surface and flows down.');A.redraw();S.check()},'Send lava down the slope');
 if(kind()==='label'){btn('Label crater',()=>{S.crater=1;A.sound.tick();say('The crater is the bowl at the top.');A.redraw();S.check()},'Label the crater');
  btn('Label ash',()=>{S.ash=1;A.sound.tick();say('Ash is fine dusty rock shot into the air.');A.redraw();S.check()},'Label the ash')}
 if(kind()==='sort'&&S.sortIdx<S.sortItems.length){btn('Magma',()=>sortPick('magma'),'This clue is magma');btn('Lava',()=>sortPick('lava'),'This clue is lava');btn('Neither',()=>sortPick('neither'),'Neither magma nor lava')}
 if(kind()==='mix')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick sentence'))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='build'){S.built=1;A.redraw();S.check();return true}
 if(kind()==='magma'){S.magma=1;A.redraw();S.check();return true}
 if(kind()==='erupt'){S.lava=1;A.redraw();S.check();return true}
 if(kind()==='label'){if(p.y<A.H*.25){S.crater=1;say('Crater labelled.');}else{S.ash=1;say('Ash labelled.');}A.redraw();S.check();return true}
 if(kind()==='sort'){const third=A.W/3;sortPick(p.x<third?'magma':p.x<2*third?'lava':'neither');return true}
 return true}
function move(){}
function up(){}
const steps=[
{h:'Build the cutaway',p:'A volcano is a mountain with a pipe (vent path) from deep rock up to a hole at the top.',
 predict:{q:'What makes a mountain a volcano?',opts:['a vent path for melted rock','being the tallest hill','being made of plastic'],ans:0},
 task:'Show the pipe inside the mountain',show:()=>auto(0,[()=>{S.built=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Show the pipe inside.');controls();S.check=finish(0,()=>S.built,'The pipe is the vent path for magma.')}},
{h:'Fill with magma',p:'Magma is hot melted rock still under the ground, inside the pipe.',
 predict:{q:'Magma is melted rock…',opts:['under the ground','only in the sky','made of plastic'],ans:0},
 task:'Fill the pipe with magma',show:()=>auto(1,[()=>{S.built=1;S.magma=1;A.redraw();S.check()}]),
 go:()=>{reset({built:1});say('Fill the pipe with magma.');controls();S.check=finish(1,()=>S.magma,'Magma stays under the ground until it erupts.')}},
{h:'Erupt lava',p:'When magma comes out onto the surface, we call it lava. That flow is part of an eruption.',
 predict:{q:'Lava is…',opts:['magma on the surface','cold rain','shelf dust'],ans:0},
 task:'Erupt lava down the slope',show:()=>auto(2,[()=>{S.built=1;S.magma=1;S.lava=1;A.redraw();S.check()}]),
 go:()=>{reset({built:1,magma:1});say('Erupt lava down the slope.');controls();S.check=finish(2,()=>S.lava,'Lava is magma that reached the surface.')}},
{h:'Crater and ash',p:'The crater is the bowl at the top. Ash is fine dusty rock shot into the air in an eruption.',
 predict:{q:'The bowl at the top is the…',opts:['crater','fridge','river'],ans:0},
 task:'Label the crater and the ash',show:()=>auto(3,[()=>{S.built=1;S.magma=1;S.lava=1;S.crater=1;S.ash=1;A.redraw();S.check()}]),
 go:()=>{reset({built:1,magma:1,lava:1});say('Label crater and ash.');controls();S.check=finish(3,()=>S.crater&&S.ash,'Crater at the top; ash is fine rock from the eruption.')}},
{h:'Magma or lava?',p:'Same melted rock — different name. Under the ground: magma. On the surface: lava.',
 predict:{q:'Melted rock still inside the pipe is…',opts:['magma','lava','rain'],ans:0},
 task:'Sort 4 clues as magma, lava or neither',show:()=>auto(4,[()=>sortPick('magma'),()=>sortPick('lava'),()=>sortPick('neither'),()=>sortPick('lava')]),
 go:()=>{reset({sortItems:[['Inside the pipe, under the ground','hot melted rock','magma'],['Flowing down the outside slope','hot melted rock','lava'],['A cold stream beside the mountain','water','neither'],['Cooling in red streams on the surface','hot melted rock','lava']],sortIdx:0});say('Sort each clue.');controls();S.check=finish(4,()=>S.sortIdx>=4,'Magma below; lava above. Water is neither.')}},
{h:'True sentence',p:'Pick the sentence that matches the science.',
 predict:{q:'Which is true?',opts:['not every mountain is a volcano','every tall hill erupts','lava stays under the ground'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Not every mountain is a volcano','Lava is only under the ground','Ash is the same as shelf dust'],picked:null});say('Tap the true sentence.');controls();S.check=finish(5,()=>S.picked===0,'A volcano needs a vent for magma. Lava is on the surface; ash is erupted rock.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A volcano needs…',[['a vent for melted rock','ok'],['only to be tall','tall'],['to be a plastic toy','toy']]],
 ['Magma is…',[['melted rock under the ground','ok'],['melted rock only in the sky','sky'],['cold rain','rain']]],
 ['Lava is…',[['magma that reached the surface','ok'],['rock that never melts','never'],['shelf dust','dust']]],
 ['The crater is…',[['the bowl at the top','ok'],['a fridge','fridge'],['a river only','river']]],
 ['An eruption is when…',[['magma, ash or gas bursts out','ok'],['a toy falls over','fall'],['clouds make rain only','cloud']]],
 ['Ash from a volcano is…',[['fine dusty rock from the eruption','ok'],['dust from cleaning a shelf','shelf'],['melted chocolate','choc']]],
 ['Why is lava not called magma outside?',[['the name changes on the surface','ok'],['lava is colder than ice','ice'],['magma is a cartoon word','toon']]]];
function why(t){let m='Magma is under the ground. Lava is on the surface. A volcano needs a vent.';
 if(t==='tall'||t==='toy')m='Height or plastic is not enough. A volcano needs a vent path for melted rock.';
 if(t==='sky'||t==='rain')m='Magma is hot melted rock under the ground — not sky and not rain.';
 if(t==='never'||t==='dust')m='Lava is melted rock on the surface. Shelf dust is not lava.';
 if(t==='fridge'||t==='river')m='The crater is the bowl-shaped hole at the top of the volcano.';
 if(t==='fall'||t==='cloud')m='An eruption is magma, ash or gas bursting from the vent.';
 if(t==='shelf'||t==='choc')m='Volcanic ash is fine rock from the eruption, not house dust or food.';
 if(t==='ice'||t==='toon')m='We rename magma as lava when it reaches the surface. Both are real melted rock.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Volcano controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
