/* Flagship: capacity and volume (ages 5–6; Y1 measure: capacity with non-standard units & litres).
   Fill by counting cups, compare holds-more by cup count, record number+unit, reject "taller=more"
   and "capacity=how full now" myths, then challenge. Distinct from qualitative full/empty (flagheavy). */
(()=>{
VIS.reg('flagcups',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['fill','compare','record','fullnow','tall','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function jug(g,x,y,w,h,fill,col){g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);if(fill>0){g.fillStyle=A.alpha(col,.55);g.fillRect(x+2,y+h*(1-fill),w-4,h*fill-2)}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Capacity = how much it can hold',W/2,H*.32,A.narrow?13:16,{w:900});T('Count equal cups. Use litres too.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='fill'){T('Fill the jug with cups',W/2,H*.08,A.narrow?15:18,{w:800});
  jug(g,W*.35,H*.25,W*.3,H*.45,(S.n||0)/(S.want||4),C.cy);
  T(`${S.n||0} / ${S.want||4} cups`,W/2,H*.85,A.narrow?14:16,{c:C.mu});T('Same cup each time',W/2,H*.95,12,{c:C.mu})}
 if(k==='compare'){T('Which holds more?',W/2,H*.08,A.narrow?15:18,{w:800});
  jug(g,W*.15,H*.28,W*.25,H*.4,.9,C.ac);jug(g,W*.6,H*.28,W*.25,H*.4,.9,C.or);
  T(`A: ${S.ca||3} cups`,W*.27,H*.78,13);T(`B: ${S.cb||5} cups`,W*.72,H*.78,13);
  T(S.picked==null?'Pick A or B':('Picked '+S.picked),W/2,H*.92,13,{c:C.mu})}
 if(k==='record'){T('Record the capacity',W/2,H*.1,A.narrow?15:18,{w:800});
  T(`Jug holds ${S.want||4} cups`,W/2,H*.32,A.narrow?14:16);
  T(S.said?`${S.want} cups`:'Tap to write the measure',W/2,H*.55,A.narrow?16:20,{w:800});
  T(S.litre?'Also: about 1 litre for a big jug':'Mark litres when the jug is litre-sized',W/2,H*.78,A.narrow?12:14,{c:C.mu})}
 if(k==='fullnow'){T('Capacity is not "how full now"',W/2,H*.1,A.narrow?13:15,{w:800});
  jug(g,W*.2,H*.3,W*.25,H*.4,.3,C.cy);jug(g,W*.55,H*.3,W*.25,H*.4,.9,C.cy);
  T('Same jug size',W/2,H*.82,13,{c:C.mu});
  T(S.picked==null?'Which shows capacity better?':'Picked '+['half-full photo','how many cups when full'][S.picked],W/2,H*.92,A.narrow?11:13,{c:C.mu})}
 if(k==='tall'){T('Taller is not always more',W/2,H*.08,A.narrow?14:16,{w:800});
  jug(g,W*.18,H*.22,W*.15,H*.5,.95,C.vi);jug(g,W*.55,H*.35,W*.28,H*.35,.95,C.gr);
  T('Tall thin: 3 cups',W*.25,H*.82,12);T('Short wide: 5 cups',W*.69,H*.82,12);
  T(S.picked==null?'Who holds more?':'Picked '+S.picked,W/2,H*.94,13,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,want:4,ca:3,cb:5,picked:null,said:0,litre:0,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='fill'){btn('+ Pour one cup',()=>{if(S.n<S.want){S.n++;A.sound.tick();say(S.n+' cups');A.redraw();S.check()}},'Pour one cup in');btn('− Tip one out',()=>{if(S.n>0){S.n--;A.sound.tick();say(S.n+' cups');A.redraw();S.check()}},'Tip one cup out')}
 if(kind()==='compare'||kind()==='tall'){btn('Pick A',()=>{S.picked='A';A.sound.tick();say('Picked A');A.redraw();S.check()},'Pick A');btn('Pick B',()=>{S.picked='B';A.sound.tick();say('Picked B');A.redraw();S.check()},'Pick B')}
 if(kind()==='record'){btn('Write cup count',()=>{S.said=1;A.sound.tick();say(S.want+' cups');A.redraw();S.check()},'Record how many cups');btn('Mark litres',()=>{S.litre=1;A.sound.tick();say('About one litre');A.redraw();S.check()},'Mark litre unit')}
 if(kind()==='fullnow'){btn('Half-full photo',()=>{S.picked=0;A.sound.miss();say('How full now is not capacity.');A.redraw()},'How full now — not capacity');btn('Cups when full',()=>{S.picked=1;A.sound.tick();say('Capacity is how many when full');A.redraw();S.check()},'Capacity = cups when full')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='fill'){if(p.x>A.W/2){if(S.n<S.want)S.n++}else if(S.n>0)S.n--;A.redraw();S.check();return true}
 if(kind()==='compare'||kind()==='tall'){S.picked=p.x<A.W/2?'A':'B';A.redraw();S.check();return true}
 if(kind()==='record'){if(p.y<A.H/2)S.said=1;else S.litre=1;A.redraw();S.check();return true}
 if(kind()==='fullnow'){S.picked=p.x<A.W/2?0:1;if(S.picked===1){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Fill with cups',p:'Capacity is how much a container can hold. Measure it by counting how many equal cups fill it.',
 predict:{q:'To measure capacity with cups…',opts:['count equal cups that fill it','only look at how tall it is','guess without pouring'],ans:0},
 task:'Pour 4 cups to fill the jug',show:()=>auto(0,[()=>{S.n=4;A.redraw();S.check()}]),
 go:()=>{reset({n:0,want:4});say('Pour cups until the jug is full.');controls();S.check=finish(0,()=>S.n===4,'4 equal cups fill this jug — that is its capacity.')}},
{h:'Which holds more?',p:'Compare capacity by cup count. The container that takes more cups when full holds more.',
 predict:{q:'Holds more means…',opts:['takes more cups when full','is always taller','is half full right now'],ans:0},
 task:'Pick the jug that holds more (B)',show:()=>auto(1,[()=>{S.picked='B';A.redraw();S.check()}]),
 go:()=>{reset({ca:3,cb:5,picked:null});say('Which holds more?');controls();S.check=finish(1,()=>S.picked==='B','B takes 5 cups — greater capacity than A.')}},
{h:'Record the measure',p:'Write the capacity with a number and a unit — for example 4 cups. Big jugs may be about 1 litre.',
 predict:{q:'A capacity record needs…',opts:['a number and a unit','only a pretty drawing','the word empty alone'],ans:0},
 task:'Record the cup count and mark litres',show:()=>auto(2,[()=>{S.said=1;S.litre=1;A.redraw();S.check()}]),
 go:()=>{reset({want:4,said:0,litre:0});say('Write the measure and mark litres.');controls();S.check=finish(2,()=>S.said&&S.litre,'Recorded as 4 cups; litres name larger capacities.')}},
{h:'Full now ≠ capacity',p:'How full the jug is right now is not its capacity. Capacity is how much it can hold when filled.',
 predict:{q:'Capacity means…',opts:['how much it can hold when full','how full it looks this second','only the colour of the water'],ans:0},
 task:'Pick "cups when full" as capacity',show:()=>auto(3,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('What shows capacity?');controls();S.check=finish(3,()=>S.picked===1,'Capacity is the full amount — not a half-full snapshot.')}},
{h:'Taller ≠ more',p:'A tall thin jug can hold less than a short wide one. Measure with cups — do not trust height alone.',
 predict:{q:'A taller jug…',opts:['might hold less than a short wide one','always holds more','never needs measuring'],ans:0},
 task:'Pick the short wide jug (B) that holds more',show:()=>auto(4,[()=>{S.picked='B';A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Who holds more — tall thin or short wide?');controls();S.check=finish(4,()=>S.picked==='B','Short wide B holds 5 cups; tall thin A only 3.')}},
{h:'True sentence',p:'Pick the sentence that matches fair capacity measuring.',
 predict:{q:'Capacity is measured by…',opts:['counting equal cups (or litres) when full','only guessing from height','how splashy the pour looks'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Count equal cups when full; litres for bigger jugs','Taller always means greater capacity','How full now is the same as capacity'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Capacity = how much when full, measured in equal units.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Capacity means…',[['how much it can hold when full','ok'],['how full it is right now','now'],['only how tall it looks','tall']]],
 ['To measure with cups…',[['count equal cups that fill it','ok'],['use random different cups','random'],['never pour anything','never']]],
 ['Holds more means…',[['takes more cups when full','ok'],['is always taller','taller'],['is half empty now','half']]],
 ['A capacity record needs…',[['a number and a unit','ok'],['only a doodle','doodle'],['the word empty alone','empty']]],
 ['A tall thin jug…',[['might hold less than a short wide one','ok'],['always holds the most','most'],['cannot be measured','cant']]],
 ['Litres are…',[['units for larger capacities','ok'],['only used for length','length'],['the same as counting leaves','leaves']]],
 ['Why not trust height alone?',[['shape matters — measure with cups','ok'],['taller always wins','wins'],['cups never help','nohelp']]]];
function why(t){let m='Capacity is how much a container can hold when full — count equal cups or use litres.';
 if(t==='now'||t==='half'||t==='empty')m='How full it is right now is not capacity. Capacity is the full amount.';
 if(t==='tall'||t==='taller'||t==='most'||t==='wins')m='Taller does not always mean more. A short wide jug can hold more — measure with cups.';
 if(t==='random'||t==='never'||t==='nohelp'||t==='cant')m='Use the same cup size and pour until full. Counting equal cups measures capacity.';
 if(t==='doodle'||t==='length'||t==='leaves')m='Write a number with a unit (cups or litres). Litres are for capacity, not length.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Capacity controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
