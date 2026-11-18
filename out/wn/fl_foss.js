/* Flagship: how fossils form (ages 7-8; NC Y3 Rocks "describe in simple terms how fossils are formed when things that
   have lived are trapped within rock"). Bury a shell, pile sediment layers, wait millions of years for rock, dig the
   fossil out, then sort shell / bone / leaf / footprint fossils. Every tap has a button twin. */
(()=>{
VIS.reg('flagfoss',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['bury','layers','rock','dig','sort','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function ground(){const g=A.ctx,C=A.col,W=A.W,H=A.H,base=H*.78;
 g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 g.fillStyle=A.alpha(C.or,.35);g.fillRect(0,base,W,H-base);
 /* sediment layers from bottom up */
 const cols=[A.alpha(C.or,.55),A.alpha(C.am,.45),A.alpha(C.cy,.4),A.alpha(C.vi,.35),A.alpha(C.gr,.4)];
 for(let i=0;i<S.layers;i++){const y=base-(i+1)*S.layerH;g.fillStyle=cols[i%cols.length];g.fillRect(W*.08,y,W*.84,S.layerH+1);g.strokeStyle=A.alpha(C.tx,.25);g.strokeRect(W*.08,y,W*.84,S.layerH)}
 if(S.buried){const y=base-S.layerH*.55;g.fillStyle=C.tx;g.beginPath();g.ellipse(W*.5,y,22,12,0,0,7);g.fill();T('🐚',W*.5,y,18)}
 if(S.rocked){g.fillStyle=A.alpha(C.tx,.12);g.fillRect(W*.08,base-S.layers*S.layerH,W*.84,S.layers*S.layerH);T('Rock',W*.5,base-S.layers*S.layerH*.5,14,{c:C.mu})}
 if(S.dug){T('Fossil!',W*.5,H*.22,22,{w:900,c:C.gr});g.fillStyle=A.alpha(C.gr,.2);g.beginPath();g.ellipse(W*.5,H*.4,40,22,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T('🐚',W*.5,H*.4,28)}
}
function drawSort(){const g=A.ctx,C=A.col,W=A.W,H=A.H;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 T('Sort each find: fossil or not?',W/2,H*.08,A.narrow?13:16,{w:800});
 const items=S.sortItems,i=S.sortIdx;if(i<items.length){T(items[i][0],W/2,H*.38,40);T(items[i][1],W/2,H*.55,A.narrow?14:17)}
 else T('All sorted!',W/2,H*.4,20,{c:C.gr});
 T(`Find ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,W,H);T('Living thing dies and is buried',W/2,H*.28,A.narrow?13:16);T('Layers of mud or sand pile up',W/2,H*.44,A.narrow?13:16);T('Over millions of years it turns to rock',W/2,H*.6,A.narrow?13:16);T('The shape left in the rock is a fossil',W/2,H*.76,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){drawSort();A.fx.draw(g);return}
 ground();
 if(k==='bury')T(S.buried?'Buried under the mud':'Tap the shell to bury it in the mud',W/2,H*.1,A.narrow?13:15,{w:800});
 if(k==='layers')T(S.layers>=4?'Thick layers of sediment':'Add layers of mud and sand on top',W/2,H*.1,A.narrow?13:15,{w:800});
 if(k==='rock')T(S.rocked?'Soft mud has become hard rock':'Wait millions of years for rock to form',W/2,H*.1,A.narrow?13:15,{w:800});
 if(k==='dig')T(S.dug?'The shell shape is preserved as a fossil':'Dig carefully into the rock',W/2,H*.1,A.narrow?13:15,{w:800});
 A.fx.draw(g)}
function bury(){if(S.buried)return;S.buried=1;S.layers=1;A.sound.tick();say('The shell is buried in soft mud.');A.redraw();S.check()}
function addLayer(){if(S.layers>=4)return;S.layers++;A.sound.tick();say('Layer '+S.layers+' of sediment piled on.');A.redraw();S.check()}
function makeRock(){if(S.rocked)return;S.rocked=1;A.sound.pop();say('Millions of years later the mud is hard rock. The shell shape is trapped inside.');A.redraw();S.check()}
function dig(){if(S.dug)return;S.dug=1;A.sound.win();say('You found a fossil: the shell shape left in the rock.');A.redraw();S.check()}
function sortPick(yes){if(S.sortIdx>=S.sortItems.length)return;const want=S.sortItems[S.sortIdx][2];
 if(yes!==want){A.sound.miss();say(want?'That IS a fossil: a living thing left its shape in rock.':'Not a fossil. Fossils come from living things trapped in rock, not from plastic or metal.');return}
 S.sortIdx++;A.sound.tick();say(S.sortIdx>=S.sortItems.length?'All sorted. Fossils are shapes of living things in rock.':'Yes. Next find.');A.redraw();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{buried:0,layers:0,layerH:28,rocked:0,dug:0,sortIdx:0,sortItems:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*320))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='bury'&&!S.buried)btn('Bury the shell',bury,'Bury the shell in the mud');
 if(k==='layers'&&S.layers<4)btn('Add a sediment layer',addLayer,'Pile on another layer of mud or sand');
 if(k==='rock'&&!S.rocked)btn('Wait millions of years',makeRock,'Let the mud turn into rock over millions of years');
 if(k==='dig'&&!S.dug)btn('Dig out the fossil',dig,'Dig carefully into the rock to find the fossil');
 if(k==='sort'&&S.sortIdx<S.sortItems.length){btn('Fossil',()=>sortPick(1),'This find is a fossil');btn('Not a fossil',()=>sortPick(0),'This find is not a fossil')}}
function down(p){const k=kind();if(k==='chal')return false;
 if(k==='bury'){bury();return true}if(k==='layers'){addLayer();return true}if(k==='rock'){makeRock();return true}
 if(k==='dig'){dig();return true}if(k==='sort'){sortPick(p.x<A.W/2?1:0);return true}return false}
const steps=[
{h:'Bury it',p:'A living thing dies and sinks into soft mud or sand. That is the first step towards a fossil.',
 predict:{q:'What must happen first for a fossil to form?',opts:['it is buried in mud or sand','it is left in the sun','it is painted'],ans:0},
 task:'Bury the shell in the mud',show:()=>auto(0,[bury]),
 go:()=>{reset({layers:0});say('Tap the shell to bury it.');controls();S.check=finish(0,()=>S.buried,'Buried. Soft mud covers the shell.')}},
{h:'Pile on layers',p:'More mud and sand settle on top, year after year. Thick layers of sediment build up.',
 predict:{q:'What piles on top of the buried shell?',opts:['layers of mud and sand','fresh air','plastic'],ans:0},
 task:'Add 4 sediment layers',show:()=>auto(1,[addLayer,addLayer,addLayer,addLayer]),
 go:()=>{reset({buried:1,layers:0});say('Add layers of sediment on top.');controls();S.check=finish(1,()=>S.layers>=4,'Four layers of sediment now cover the shell.')}},
{h:'Turn to rock',p:'Over millions of years the soft mud is squashed and hardens into rock. The shell shape is trapped inside.',
 predict:{q:'How long does fossil rock usually take to form?',opts:['millions of years','one week','one day'],ans:0},
 task:'Wait for the mud to become rock',show:()=>auto(2,[makeRock]),
 go:()=>{reset({buried:1,layers:4});say('Wait millions of years.');controls();S.check=finish(2,()=>S.rocked,'The mud is now rock. The shell shape is still inside.')}},
{h:'Find the fossil',p:'Dig into the rock. The shape left by the living thing is the fossil.',
 task:'Dig out the fossil',show:()=>auto(3,[dig]),
 go:()=>{reset({buried:1,layers:4,rocked:1});say('Dig carefully.');controls();S.check=finish(3,()=>S.dug,'The fossil is the preserved shape in the rock.')}},
{h:'Fossil or not?',p:'Fossils come from living things: shells, bones, leaves, footprints. A plastic toy or a metal coin is not a fossil.',
 predict:{q:'Which of these is a fossil?',opts:['a shell shape in rock','a plastic dinosaur toy','a shiny new coin'],ans:0},
 task:'Sort 4 finds as fossil or not',show:()=>auto(4,[()=>sortPick(1),()=>sortPick(1),()=>sortPick(0),()=>sortPick(1)]),
 go:()=>{reset({sortItems:[['🐚','Shell shape in rock',1],['🦴','Bone in rock',1],['🪙','Metal coin',0],['🍃','Leaf imprint in rock',1]],sortIdx:0});say('Sort each find.');controls();S.check=finish(4,()=>S.sortIdx>=4,'Fossils are shapes of living things trapped in rock.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['What is a fossil?',[['a shape of a living thing in rock','ok'],['any old stone','stone'],['a plastic model','toy']]],
 ['First step in making a fossil?',[['bury the living thing in mud or sand','ok'],['leave it in the sun','sun'],['paint it','paint']]],
 ['Sediment layers are made of…',[['mud and sand that settle','ok'],['melted plastic','plas'],['fresh leaves only','leaf']]],
 ['Mud becomes rock over…',[['millions of years','ok'],['one afternoon','day'],['ten minutes','min']]],
 ['A footprint in rock can be a fossil because…',[['an animal once stood there','ok'],['someone drew it yesterday','draw'],['it is made of metal','metal']]],
 ['A plastic dinosaur toy is not a fossil because…',[['it was never a living thing trapped in rock','ok'],['it is the wrong colour','col'],['fossils cannot look like dinosaurs','look']]],
 ['Why dig carefully into fossil rock?',[['so you do not break the shape inside','ok'],['rock is edible','eat'],['fossils melt in air','melt']]]];
function why(t){let m='A fossil is the shape of a living thing trapped in rock over a very long time.';
 if(t==='stone')m='Not every old stone is a fossil. The stone must hold the shape of something that once lived.';
 if(t==='toy')m='Plastic toys are made by people. Fossils form when real living things are buried and turned to rock.';
 if(t==='sun')m='Left in the sun, a body usually rots or is eaten. Burial under mud or sand protects the shape.';
 if(t==='paint')m='Painting does not make a fossil. Burial, layers and deep time do.';
 if(t==='plas')m='Sediment is natural mud and sand that settle in water or wind, not plastic.';
 if(t==='leaf')m='Leaves can become fossils, but sediment layers are the mud and sand that bury them.';
 if(t==='day'||t==='min')m='Turning soft mud into hard rock takes millions of years, not minutes or days.';
 if(t==='draw')m='A fossil footprint was pressed by a real animal long ago, then buried and turned to rock.';
 if(t==='metal')m='Metal objects are not fossils. Fossils come from living things.';
 if(t==='col')m='Colour does not decide it. Fossils must come from living things trapped in rock.';
 if(t==='look')m='Some fossils are of dinosaurs. The point is they were once alive and then trapped in rock.';
 if(t==='eat')m='Rock is not food. Dig carefully so the fragile fossil shape stays whole.';
 if(t==='melt')m='Fossils do not melt in air. They are rock, but they can crack if you hit them hard.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Fossil controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
