/* Flagship: The Five Oceans (ages 7–9; KS2 geography/ocean science).
   Name Pacific (largest), Atlantic, Indian, Southern, Arctic (smallest/coldest); tap them on a world map;
   sort size/cold facts; see all five as one connected global ocean; reject “five separate sealed seas”; challenge.
   Distinct from what-is-an-ocean habitat intro (flagocean). */
(()=>{
VIS.reg('flagoce5',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const OCEANS=[{n:'Pacific',x:.18,y:.48,note:'largest'},{n:'Atlantic',x:.42,y:.42,note:''},{n:'Indian',x:.62,y:.58,note:''},{n:'Southern',x:.5,y:.82,note:'around Antarctica'},{n:'Arctic',x:.5,y:.14,note:'smallest, coldest'}];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['map','name','size','cold','link','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function world(g,W,H){const{col:C}=A;g.fillStyle=A.alpha(C.cy,.35);g.fillRect(W*.05,H*.12,W*.9,H*.78);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,H*.12,W*.9,H*.78);
 g.fillStyle=A.alpha(C.gr,.45);[[.22,.4,.12,.2],[.38,.35,.1,.22],[.58,.45,.14,.18],[.72,.38,.1,.16],[.48,.7,.2,.1]].forEach(([x,y,w,h])=>{g.fillRect(W*x,H*y,W*w,H*h)})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Five named oceans',W/2,H*.35,A.narrow?15:17,{w:900});T('One connected global ocean',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='map'||k==='name'){T(k==='map'?'Tap oceans on the map':'Name each ocean',W/2,H*.08,A.narrow?13:15,{w:800});world(g,W,H);
  OCEANS.forEach((o,i)=>{const on=(S.found||[])[i];g.fillStyle=on?A.alpha(C.ac,.7):A.alpha(C.cy,.55);g.beginPath();g.arc(W*o.x,H*o.y,14,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();if(on)T(o.n,W*o.x,H*o.y-18,10,{w:700})});
  T(S.msg||`Found ${(S.found||[]).filter(Boolean).length}/5`,W/2,H*.95,12,{c:C.mu})}
 if(k==='size'){T('Which ocean is largest?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='cold'){T('Smallest and coldest?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='link'){T('One global ocean',W/2,H*.1,A.narrow?14:16,{w:800});world(g,W,H);
  g.strokeStyle=C.or;g.lineWidth=3;g.setLineDash([6,4]);g.beginPath();g.moveTo(W*.18,H*.48);g.lineTo(W*.42,H*.42);g.lineTo(W*.62,H*.58);g.lineTo(W*.5,H*.82);g.lineTo(W*.5,H*.14);g.stroke();g.setLineDash([]);
  T(S.msg||'Water flows between the five names',W/2,H*.95,12,{c:C.mu,max:W*.92})}
 if(k==='myth'){T('True or mix-up?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{found:[0,0,0,0,0],picked:null,msg:'',opts:[],linked:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*220))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function markNext(){const i=(S.found||[]).findIndex(x=>!x);if(i<0)return;S.found[i]=1;S.msg=`${OCEANS[i].n}${OCEANS[i].note?' — '+OCEANS[i].note:''}`;A.sound.tick();say(S.msg);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='map'||kind()==='name')btn('Find next ocean',()=>markNext(),'Mark the next ocean on the map');
 if(kind()==='size'||kind()==='cold'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='link')btn('Show they connect',()=>{S.linked=1;S.msg='Pacific, Atlantic, Indian, Southern, Arctic share water';A.sound.tick();say(S.msg);A.redraw();S.check()},'Connect the five oceans')}
function down(p){if(kind()==='chal')return false;
 if(kind()==='map'||kind()==='name'){markNext();return true}
 if(kind()==='size'||kind()==='cold'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='link'){S.linked=1;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Find five oceans',p:'Earth has five named oceans: Pacific, Atlantic, Indian, Southern, and Arctic. Tap to find each on the map.',
 predict:{q:'How many named oceans?',opts:['Five','Two','Twenty'],ans:0},
 task:'Find all five oceans',show:()=>auto(0,[()=>{S.found=[1,1,1,1,1];A.redraw();S.check()}]),
 go:()=>{reset({found:[0,0,0,0,0]});say('Find each ocean.');controls();S.check=finish(0,()=>(S.found||[]).every(Boolean),'Five named oceans on one planet.')}},
{h:'Say their names',p:'Practise the five names: Pacific, Atlantic, Indian, Southern, Arctic. Labels appear as you find them.',
 predict:{q:'Which name is an ocean?',opts:['Pacific','Sahara','Alps'],ans:0},
 task:'Label all five again',show:()=>auto(1,[()=>{S.found=[1,1,1,1,1];A.redraw();S.check()}]),
 go:()=>{reset({found:[0,0,0,0,0]});say('Name each ocean.');controls();S.check=finish(1,()=>(S.found||[]).every(Boolean),'Pacific, Atlantic, Indian, Southern, Arctic.')}},
{h:'Largest ocean',p:'The Pacific Ocean is the largest. It stretches farther than any other named ocean.',
 predict:{q:'The largest ocean is…',opts:['Pacific','Arctic','a pond'],ans:0},
 task:'Tap Pacific',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Pacific — the largest','Arctic — the largest','Atlantic — bigger than all land'],picked:null});say('Which is largest?');controls();S.check=finish(2,()=>S.picked===0,'Pacific is the largest ocean.')}},
{h:'Smallest and coldest',p:'The Arctic Ocean is the smallest and the coldest. It sits near the North Pole.',
 predict:{q:'Smallest and coldest ocean?',opts:['Arctic','Pacific','Indian'],ans:0},
 task:'Tap Arctic',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Arctic — smallest and coldest','Pacific — smallest','Indian — coldest at the equator'],picked:null});say('Which is smallest and coldest?');controls();S.check=finish(3,()=>S.picked===0,'Arctic is smallest and coldest.')}},
{h:'All connected',p:'The five names are regions of one continuous global ocean. Water can flow between them.',
 predict:{q:'The five oceans are…',opts:['connected as one ocean','sealed in five jars','only lakes'],ans:0},
 task:'Show the connection',show:()=>auto(4,[()=>{S.linked=1;A.redraw();S.check()}]),
 go:()=>{reset({linked:0});say('Show that the oceans connect.');controls();S.check=finish(4,()=>!!S.linked,'One global ocean with five names.')}},
{h:'Reject sealed-seas myth',p:'People name five oceans for places on the map — not because walls keep the water apart.',
 predict:{q:'True idea?',opts:['Five names, one connected ocean','Five oceans never share water','Oceans are only puddles'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Five names for one connected ocean','Five oceans sealed with walls','Oceans stop at every beach forever'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Names mark regions of one ocean.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['How many named oceans?',[['Five','ok'],['Two','two'],['Twenty','twenty']]],
 ['Largest ocean?',[['Pacific','ok'],['Arctic','arctic'],['a pond','pond']]],
 ['Smallest and coldest?',[['Arctic','ok'],['Pacific','pac'],['Indian','ind']]],
 ['The five oceans are…',[['Connected as one','ok'],['Sealed apart','seal'],['Only lakes','lake']]],
 ['Southern Ocean wraps…',[['Around Antarctica','ok'],['Only the Sahara','desert'],['Only city parks','park']]],
 ['Atlantic is…',[['A named ocean','ok'],['A mountain range','mtn'],['A desert','desert']]],
 ['Why five names?',[['Regions of one global ocean','ok'],['Five sealed jars of water','seal'],['Five puddles only','puddle']]]];
function why(t){let m='Earth has five named oceans that form one connected global ocean.';
 if(t==='two'||t==='twenty')m='Maps name five oceans: Pacific, Atlantic, Indian, Southern, Arctic.';
 if(t==='arctic'||t==='pond'||t==='pac'||t==='ind')m='Pacific is largest; Arctic is smallest and coldest.';
 if(t==='seal'||t==='lake'||t==='puddle')m='The names mark regions — water connects; they are not sealed jars or lakes.';
 if(t==='desert'||t==='park'||t==='mtn')m='Oceans are vast salt-water regions — not deserts, mountains, or parks.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Five oceans controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
