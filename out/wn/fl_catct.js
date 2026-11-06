/* Flagship: Sorting into categories (ages 5–6; CCSS K.MD.3).
   Classify into given categories, count each group, then order categories by count (most→least).
   Distinct from flagsort (pick own colour/size/shape rule, ages 3–4) and flagsortw (word categories). */
(()=>{
VIS.reg('flagcatct',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','count','order','again','myth','true','chal'][A.step];
const ITEMS=[{e:'🐶',c:0},{e:'🐱',c:0},{e:'🚗',c:1},{e:'🚌',c:1},{e:'🐶',c:0},{e:'✈️',c:1},{e:'🐱',c:0}];
const BINS=['Animals','Vehicles'];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function binRect(i){const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.55,w,h:A.H*.38}}
function chipRect(i){const w=Math.min(56,(A.W-40)/4);return{x:12+(i%4)*(w+8),y:A.H*.14+Math.floor(i/4)*(w+8),w,h:w}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Sort, count, order by count',W/2,H*.35,A.narrow?14:16,{w:900});T('Categories · tallies · most to least',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'||k==='again'){T(S.title||'Sort into the boxes',W/2,H*.06,A.narrow?13:15,{w:800});
  BINS.forEach((b,i)=>{const r=binRect(i);g.fillStyle=A.alpha(C.tx,.06);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);T(b,r.x+r.w/2,r.y+18,A.narrow?12:14,{w:800});
   const placed=(S.place||[]).map((p,j)=>p===i?j:-1).filter(j=>j>=0);placed.forEach((j,n)=>T((S.items||ITEMS)[j].e,r.x+24+n*28,r.y+r.h*.55,22))});
  (S.items||ITEMS).forEach((it,i)=>{if((S.place||[])[i]!=null)return;const r=chipRect(i);g.fillStyle=S.sel===i?A.alpha(C.ac,.35):A.alpha(C.pn,.95);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.h);T(it.e,r.x+r.w/2,r.y+r.h/2,22)});
  T(S.msg||'Tap a picture, then a box.',W/2,H*.5,A.narrow?12:13,{c:C.mu})}
 if(k==='count'){T('Count each category',W/2,H*.08,A.narrow?14:16,{w:800});
  BINS.forEach((b,i)=>{const y=H*(.28+i*.28);g.fillStyle=A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.1,W*.84,H*.2);T(`${b}: ${S.counts&&S.counts[i]!=null?S.counts[i]:'?'}`,W/2,y,A.narrow?16:18,{w:800})});
  T(S.msg||'Tap + to count.',W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='order'||k==='myth'||k==='true'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{items:ITEMS.slice(),place:Array(ITEMS.length).fill(null),sel:null,counts:[null,null],picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function placeSel(bin){if(S.sel==null)return;S.place[S.sel]=bin;S.sel=null;A.sound.tick();say(BINS[bin]);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'||kind()==='again'){BINS.forEach((b,i)=>btn('Put in '+b,()=>placeSel(i),'Place selected in '+b));btn('Auto-sort rest',()=>{(S.place||[]).forEach((p,i)=>{if(p==null)S.place[i]=S.items[i].c});A.redraw();S.check()},'Sort remaining items')}
 if(kind()==='count'){BINS.forEach((b,i)=>btn(b+' +1',()=>{S.counts[i]=(S.counts[i]||0)+1;S.msg=`${b}: ${S.counts[i]}`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Count one more in '+b));btn('Set correct counts',()=>{S.counts=[4,3];A.redraw();S.check()},'Fill correct tallies')}
 if(kind()==='order'||kind()==='myth'||kind()==='true')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='sort'||kind()==='again'){for(let i=0;i<(S.items||[]).length;i++){if(S.place[i]!=null)continue;const r=chipRect(i);if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h){S.sel=i;A.sound.tick();A.redraw();return true}}
  for(let i=0;i<2;i++){const r=binRect(i);if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h){placeSel(i);return true}}return true}
 if(kind()==='count'){const i=p.y<A.H*.45?0:1;S.counts[i]=(S.counts[i]||0)+1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='order'||kind()==='myth'||kind()==='true'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const allPlaced=()=>(S.place||[]).every(p=>p!=null)&& (S.place||[]).every((p,i)=>p===S.items[i].c);
const steps=[
{h:'Sort into categories',p:'The boxes are given: Animals and Vehicles. Put each picture in the matching category.',
 predict:{q:'A bus goes in…',opts:['Vehicles','Animals','Either box'],ans:0},
 task:'Sort every picture into a box',show:()=>auto(0,[()=>{S.place=S.items.map(it=>it.c);A.redraw();S.check()}]),
 go:()=>{reset({title:'Sort into Animals or Vehicles',msg:'Tap a picture, then a box.'});say('Sort into the given categories.');controls();S.check=finish(0,allPlaced,'You sorted into the given categories.')}},
{h:'Count each category',p:'After sorting, count how many are in each box. That tally tells you the size of each category.',
 predict:{q:'4 animals and 3 vehicles. Animals count is…',opts:['4','3','7'],ans:0},
 task:'Count animals and vehicles',show:()=>auto(1,[()=>{S.counts=[4,3];A.redraw();S.check()}]),
 go:()=>{reset({place:ITEMS.map(it=>it.c),counts:[null,null],msg:'Tap + for each group.'});say('Count each category.');controls();S.check=finish(1,()=>S.counts[0]===4&&S.counts[1]===3,'Count the members of each category.')}},
{h:'Order by count',p:'Sort the categories by how many: most to least. Here animals (4) come before vehicles (3).',
 predict:{q:'Most to least here is…',opts:['Animals then Vehicles','Vehicles then Animals','Same size'],ans:0},
 task:'Tap the most-to-least order',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Order categories by count',opts:['Animals (4) then Vehicles (3)','Vehicles (3) then Animals (4)','Skip counting — any order'],picked:null});say('Order by count.');controls();S.check=finish(2,()=>S.picked===0,'Order categories from most to least.')}},
{h:'Sort, count, order again',p:'New pile, same idea: put each item in its given category, count, then order by count.',
 predict:{q:'After sorting you should…',opts:['count each box','throw the boxes away','only look at colours'],ans:0},
 task:'Sort the pile again',show:()=>auto(3,[()=>{S.place=S.items.map(it=>it.c);A.redraw();S.check()}]),
 go:()=>{reset({title:'Sort this pile too',msg:'Categories stay Animals / Vehicles.'});say('Sort again, then we count.');controls();S.check=finish(3,allPlaced,'Classify, then count each category.')}},
{h:'Catch a mix-up',p:'Sorting into categories uses the given labels. It is not only “make any groups you like” without counting.',
 predict:{q:'K.MD.3 also asks you to…',opts:['count each category','ignore the counts','only sort by colour'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Sort but never count the groups','Sort into given boxes','Count and order by size'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'You must count — and can order by count.')}},
{h:'True sorting idea',p:'Classify into given categories, count each, and compare or order those counts.',
 predict:{q:'Sorting into categories means…',opts:['use given groups, then count','only invent a colour rule','never compare group sizes'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tap the true idea',opts:['Given categories + count each group','Only sort by your favourite colour','Counts do not matter'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Categories, counts, then order by count.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A bus goes in…',[['Vehicles','ok'],['Animals','anim'],['Either','either']]],
 ['4 animals, 3 vehicles. Animals = …',[['4','ok'],['3','three'],['7','seven']]],
 ['Most to least here…',[['Animals then Vehicles','ok'],['Vehicles first','veh'],['Same size','same']]],
 ['After sorting, next is…',[['count each box','ok'],['throw boxes away','throw'],['only use colours','colour']]],
 ['Which is a mix-up?',[['Sort but never count','ok'],['Use given boxes','boxes'],['Order by count','order']]],
 ['Categories skill means…',[['given groups + counts','ok'],['colour rule only','col'],['ignore sizes','ignore']]],
 ['3 red, 5 blue. Most is…',[['blue (5)','ok'],['red (3)','red'],['same','tie']]]];
function why(t){let m='Sort into the given categories, count each group, then order by those counts.';
 if(t==='anim'||t==='either')m='A bus is a vehicle — use the given category labels.';
 if(t==='three'||t==='seven'||t==='veh'||t==='same'||t==='tie'||t==='red')m='Count members in each box; order most to least using those tallies.';
 if(t==='throw'||t==='colour'||t==='col'||t==='ignore'||t==='boxes'||t==='order')m='Do not stop at sorting: count each category and compare the counts.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Category sorting controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
