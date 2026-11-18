/* Flagship: Water Transport in Plants (ages 7–8; NC Y3 Plants — investigate how water is transported within plants).
   Roots take water in → tubes in the stem carry it up → water reaches leaves (celery/dye model). Block the stem → upper
   parts dry. Distinct from flagpfunc (jobs of parts), flagsprout (needs water/light), flagplant (name parts). */
(()=>{
VIS.reg('flagxylem',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['roots','tubes','leaves','block','path','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function plant(g,W,H){const C=A.col,px=W*.38,gy=H*.7,lvl=S.level||0;
 g.fillStyle=A.alpha('#38bdf8',.35);g.fillRect(0,gy,W,H-gy); // water tray
 g.fillStyle=A.alpha(C.or,C.dark?.3:.35);g.fillRect(0,gy+8,W,H-gy-8);
 // roots
 g.strokeStyle=A.mix(C.or,'#3b2412',.4);g.lineWidth=3.5;
 [[0,.95],[-.75,.8],[.75,.8],[-.4,1.05],[.4,1.05]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(px,gy);g.lineTo(px+dx*42,gy+dy*34);g.stroke()});
 // stem with tubes
 g.strokeStyle=A.mix(C.gr,'#14532d',.15);g.lineWidth=14;g.beginPath();g.moveTo(px,gy);g.lineTo(px,H*.22);g.stroke();
 if(S.tubes){g.strokeStyle=A.alpha('#2563eb',.85);g.lineWidth=3;g.beginPath();g.moveTo(px-3,gy);g.lineTo(px-3,H*.22+(S.block?H*.2:0));g.stroke();
  g.beginPath();g.moveTo(px+3,gy);g.lineTo(px+3,H*.22+(S.block?H*.2:0));g.stroke()}
 // dye rising
 if(lvl>0){const top=gy-(gy-H*.22)*Math.min(1,lvl);g.fillStyle=A.alpha('#2563eb',.55);g.fillRect(px-5,top,10,gy-top)}
 // leaves
 [-1,1].forEach(s=>{g.fillStyle=S.dry?A.mix('#a3a3a3',C.gr,.4):A.mix(C.gr,'#14532d',.12);g.beginPath();g.ellipse(px+s*40,H*.36,30,15,s*-.45,0,7);g.fill();
  if(S.dyeLeaf&&!S.dry){g.fillStyle=A.alpha('#2563eb',.35);g.beginPath();g.ellipse(px+s*40,H*.36,18,9,s*-.45,0,7);g.fill()}});
 if(S.block){g.fillStyle=C.rd;g.fillRect(px-16,H*.48,32,10);T('BLOCK',px,H*.48+5,10,{c:'#fff',w:800})}
}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Water path: roots → stem tubes → leaves',W/2,H*.35,A.narrow?14:16,{w:900});T('Block the stem and the top dries',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='roots'||k==='tubes'||k==='leaves'||k==='block'){plant(g,W,H);T(S.title||'Water path',W/2,H*.07,A.narrow?13:15,{w:800});T(S.msg||'',W/2,H*.92,A.narrow?12:13,{c:C.mu,max:W*.92})}
 if(k==='path'||k==='myth'){T(S.title||'Think',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{level:0,tubes:0,dyeLeaf:0,block:0,dry:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*180))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='roots'){btn('Roots drink',()=>{S.level=.25;S.msg='Roots take water in from the soil.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show roots taking water');btn('Done',()=>S.check(),'Mark roots step done')}
 if(kind()==='tubes'){btn('Open stem tubes',()=>{S.tubes=1;S.level=.7;S.msg='Thin tubes in the stem carry water up.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show water rising in stem tubes');btn('Done',()=>S.check(),'Mark tubes step done')}
 if(kind()==='leaves'){btn('Reach the leaves',()=>{S.tubes=1;S.level=1;S.dyeLeaf=1;S.msg='Water reaches the leaves (like dye in celery).';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show water arriving in leaves');btn('Done',()=>S.check(),'Mark leaf step done')}
 if(kind()==='block'){btn('Block the stem',()=>{S.block=1;S.tubes=1;S.level=.35;S.dry=1;S.dyeLeaf=0;S.msg='Blocked stem: water cannot reach the top.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Block stem transport');btn('Clear block',()=>{S.block=0;S.dry=0;S.level=1;S.dyeLeaf=1;S.msg='Path open again.';A.redraw()},'Unblock the stem')}
 if(kind()==='path'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='roots'){S.level=.25;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='tubes'){S.tubes=1;S.level=.7;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='leaves'){S.tubes=1;S.level=1;S.dyeLeaf=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='block'){S.block=1;S.tubes=1;S.level=.35;S.dry=1;S.dyeLeaf=0;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='path'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Roots take water in',p:'Water transport starts underground. Roots take water in from the soil — that is the entry point for the path up the plant.',
 predict:{q:'Water first enters the plant through the…',opts:['roots','flowers','only the leaves'],ans:0},
 task:'Show roots taking water in',show:()=>auto(0,[()=>{S.level=.25;S.msg='Roots take water in.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Start of the water path',msg:'Tap to let roots drink.'});say('Show roots taking water in.');controls();S.check=finish(0,()=>S.level>=.2,'Roots are where water enters the plant.')}},
{h:'Stem tubes carry water',p:'Inside the stem are thin tubes (xylem). They are a pathway that carries water up from the roots toward the leaves.',
 predict:{q:'Water travels up the stem through…',opts:['thin tubes inside','empty air only','the flower petals'],ans:0},
 task:'Open the stem tubes and raise the water',show:()=>auto(1,[()=>{S.tubes=1;S.level=.7;S.msg='Tubes carry water up.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Tubes in the stem',level:.25,msg:'Tap to send water up the tubes.'});say('Show stem tubes carrying water.');controls();S.check=finish(1,()=>S.tubes&&S.level>=.6,'Stem tubes transport water upward.')}},
{h:'Water reaches leaves',p:'Like coloured water rising in a celery stick, water (and dissolved minerals) reaches the leaves so they can make food.',
 predict:{q:'When dye water rises in celery, it shows…',opts:['water travels up to the leaves','leaves drink soil directly','flowers absorb all water'],ans:0},
 task:'Let water reach the leaves',show:()=>auto(2,[()=>{S.tubes=1;S.level=1;S.dyeLeaf=1;S.msg='Water in the leaves.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Arrive at the leaves',level:.7,tubes:1,msg:'Tap to finish the path.'});say('Show water reaching the leaves.');controls();S.check=finish(2,()=>S.dyeLeaf&&S.level>=.95,'Water travels roots → stem tubes → leaves.')}},
{h:'Block the path',p:'If the stem is blocked or crushed, water cannot travel up. Leaves above the block dry out even if roots still sit in water.',
 predict:{q:'Block the stem. Leaves above the block…',opts:['dry out — water cannot pass','get extra water','make more roots'],ans:0},
 task:'Block the stem and watch the top dry',show:()=>auto(3,[()=>{S.block=1;S.tubes=1;S.level=.35;S.dry=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Blocked stem',level:1,tubes:1,dyeLeaf:1,msg:'Tap to block the stem.'});say('Block the water path.');controls();S.check=finish(3,()=>S.block&&S.dry,'A blocked stem stops water reaching the leaves.')}},
{h:'Order the path',p:'The transport path has an order: roots take water in, stem tubes carry it up, leaves receive it.',
 predict:{q:'Correct order is…',opts:['roots → stem tubes → leaves','leaves → roots → stem','flowers → roots → leaves'],ans:0},
 task:'Tap the correct water path',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which path is right?',opts:['roots → stem tubes → leaves','leaves → roots → stem','flowers → roots → leaves'],picked:null});say('Pick the water path order.');controls();S.check=finish(4,()=>S.picked===0,'Order: roots, then stem tubes, then leaves.')}},
{h:'Catch a mix-up',p:'A common mix-up is thinking leaves drink soil water on their own, or that water jumps to flowers without the stem.',
 predict:{q:'Which is the mix-up?',opts:['Leaves drink soil water with no stem path','Water rises through stem tubes','Roots take water in first'],ans:0},
 task:'Tap the mix-up',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Leaves drink soil with no stem path','Water rises through stem tubes','Roots take water in first'],picked:null});say('Find the mix-up.');controls();S.check=finish(5,()=>S.picked===0,'Water needs the stem pathway from roots to leaves.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Water first enters through…',[['roots','ok'],['flowers','flor'],['only leaves','leaf']]],
 ['Stem tubes mainly…',[['carry water up','ok'],['make all the food','food'],['store seeds','seed']]],
 ['Dye in celery shows…',[['water travels up to leaves','ok'],['leaves eat dye','eat'],['roots stop water','stop']]],
 ['Blocked stem means…',[['leaves above dry out','ok'],['more water rushes up','rush'],['flowers absorb soil','flor2']]],
 ['Correct path order…',[['roots → tubes → leaves','ok'],['leaves → roots → stem','rev'],['flower → root → leaf','flor3']]],
 ['Water transport needs…',[['a clear stem pathway','ok'],['only sunlight on petals','sun'],['soil eating by leaves','soil']]],
 ['Crush the stem mid-way…',[['water stops above the crush','ok'],['roots stop working forever','root'],['leaves make extra tubes','tube']]]];
function why(t){let m='Water path: roots take water in, stem tubes carry it up, leaves receive it.';
 if(t==='flor'||t==='flor2'||t==='flor3')m='Flowers are not the start of the water path. Roots take water in first.';
 if(t==='leaf'||t==='eat'||t==='soil')m='Leaves receive water via the stem; they do not drink soil water on their own.';
 if(t==='food'||t==='seed'||t==='sun')m='Stem tubes transport water; food-making is a leaf job, not the transport path.';
 if(t==='stop'||t==='rush'||t==='rev'||t==='root'||t==='tube')m='A block or crush stops upward flow above that point. Order stays roots → tubes → leaves.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Water transport controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
