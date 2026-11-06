/* Flagship: one-to-one counting (ages 4–6; EYFS/Y1: one-to-one correspondence).
   Tap each object once while saying number names, catch double-counts and skips,
   rebuild a fair count, keep last-number = how many, then challenge. Distinct from
   representing numerals with objects (flagrepnum) and counting to five (flagcount). */
(()=>{
VIS.reg('flagoto',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['tap','double','skip','rebuild','last','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,touched){const W=A.W,H=A.H,cols=Math.min(n,5),x0=W*.5-(cols-1)*W*.08,y=H*.42;
 for(let i=0;i<n;i++){const x=x0+(i%cols)*W*.16,yy=y+Math.floor(i/cols)*H*.16;g.beginPath();g.arc(x,yy,Math.min(W,H)*.055,0,7);
  g.fillStyle=touched&&touched[i]?A.alpha(A.col.ac,.85):A.alpha(A.col.cy,.55);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
  if(touched&&touched[i])T(String(touched[i]),x,yy,A.narrow?12:14,{c:A.col.tx,w:800})}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ecfdf5',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('One touch, one number',W/2,H*.32,A.narrow?14:17,{w:900});T('No skips. No double-counts.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='tap'){T('Tap each grape once',W/2,H*.1,A.narrow?15:18,{w:800});dots(g,S.n||4,S.touched);T(`Said: ${S.said||0} / ${S.n||4}`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
 if(k==='double'){T('Spot the double-count',W/2,H*.1,A.narrow?14:16,{w:800});dots(g,3,[1,2,2]);T(S.picked==null?'Which count is fair?':'Picked '+['fair 1-2-3','said 1-2-2 for three'][S.picked],W/2,H*.88,A.narrow?11:13,{c:C.mu})}
 if(k==='skip'){T('Spot the skip',W/2,H*.1,A.narrow?15:18,{w:800});dots(g,4,[1,2,null,3]);T(S.picked==null?'Which is the mistake?':'Picked '+['skipped middle','fair one-to-one'][S.picked],W/2,H*.88,A.narrow?11:13,{c:C.mu})}
 if(k==='rebuild'){T('Rebuild a fair count',W/2,H*.1,A.narrow?14:16,{w:800});dots(g,S.n||5,S.touched);T(`Touches: ${S.said||0} — need ${S.n||5}`,W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='last'){T('Last number = how many',W/2,H*.1,A.narrow?13:15,{w:800});dots(g,S.n||4,S.touched);T(S.picked==null?'What does the last number tell you?':'Picked '+['how many there are','only the colour'][S.picked],W/2,H*.9,A.narrow?11:13,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:4,said:0,touched:[],picked:null,opts:[],check:()=>{}},o||{});if(!S.touched)S.touched=[]}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tapNext(){const n=S.n||4;if(S.said>=n)return;S.said++;S.touched=S.touched.slice();S.touched[S.said-1]=S.said;A.sound.tick();say('Touched '+S.said);A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='tap'||kind()==='rebuild'){btn('Touch next once',()=>{tapNext()},'Touch the next object once');btn('Reset touches',()=>{S.said=0;S.touched=[];A.sound.tick();say('Reset');A.redraw();S.check()},'Clear all touches')}
 if(kind()==='double'){btn('Fair 1-2-3',()=>{S.picked=0;A.sound.tick();say('Fair one-to-one');A.redraw();S.check()},'Fair count');btn('Said 1-2-2',()=>{S.picked=1;A.sound.miss();say('Double-count — too big');A.redraw()},'Double-count mistake')}
 if(kind()==='skip'){btn('Skipped middle',()=>{S.picked=0;A.sound.tick();say('That is the skip');A.redraw();S.check()},'Spot the skip');btn('Fair one-to-one',()=>{S.picked=1;A.sound.miss();say('No — the middle was skipped');A.redraw()},'Not the fair count')}
 if(kind()==='last'){btn('How many there are',()=>{S.picked=0;A.sound.tick();say('Last number is the total');A.redraw();S.check()},'Last number = total');btn('Only the colour',()=>{S.picked=1;A.sound.miss();say('Colour is not the count');A.redraw()},'Wrong — colour')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='tap'||kind()==='rebuild'){tapNext();return true}
 if(kind()==='double'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='skip'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='last'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Tap once each',p:'One-to-one means each object gets exactly one number name. Touch once, say one number, move on.',
 predict:{q:'One-to-one counting means…',opts:['each object gets exactly one number name','saying numbers as fast as you can','counting the spaces between objects'],ans:0},
 task:'Touch all 4 grapes once',show:()=>auto(0,[()=>{S.said=4;S.touched=[1,2,3,4];A.redraw();S.check()}]),
 go:()=>{reset({n:4,said:0,touched:[]});say('Tap each grape once.');controls();S.check=finish(0,()=>S.said===4&&S.touched.filter(Boolean).length===4,'Four touches, four numbers — fair one-to-one.')}},
{h:'Catch a double-count',p:'If you say two numbers for the same object, the count becomes too big.',
 predict:{q:'Touching the same grape twice…',opts:['makes the count too big','keeps the count fair','means you must skip the next'],ans:0},
 task:'Pick the fair 1-2-3 count',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Which count is fair?');controls();S.check=finish(1,()=>S.picked===0,'Fair count is 1-2-3 — not two numbers on one grape.')}},
{h:'Catch a skip',p:'If you skip an object, it never gets a number name, so the total you say is too small.',
 predict:{q:'Skipping a grape…',opts:['makes the said total too small','makes the said total too big','does nothing'],ans:0},
 task:'Mark the skipped-middle mistake',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Find the skip.');controls();S.check=finish(2,()=>S.picked===0,'The middle grape was skipped — that breaks one-to-one.')}},
{h:'Rebuild fairly',p:'Start again. Touch each counter once until every object has one number.',
 predict:{q:'A fair count needs…',opts:['one touch and one number per object','two numbers for special objects','only counting the gaps'],ans:0},
 task:'Touch all 5 counters once',show:()=>auto(3,[()=>{S.said=5;S.touched=[1,2,3,4,5];A.redraw();S.check()}]),
 go:()=>{reset({n:5,said:0,touched:[]});say('Rebuild a fair count of five.');controls();S.check=finish(3,()=>S.said===5,'Five one-to-one touches rebuild a fair count.')}},
{h:'Last number rule',p:'After a fair count, the last number you say is how many objects there are.',
 predict:{q:'The last number you say…',opts:['tells how many objects there are','is always one more than the set','only names the colour'],ans:0},
 task:'Pick "how many there are"',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({n:4,said:4,touched:[1,2,3,4],picked:null});say('What does the last number mean?');controls();S.check=finish(4,()=>S.picked===0,'Last number = how many — that is cardinality.')}},
{h:'True sentence',p:'Pick the sentence that matches one-to-one counting.',
 predict:{q:'One-to-one counting is…',opts:['pairing each object with one number name','reciting numbers with no objects','counting gaps as if they were grapes'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Touch once, say one number, move on — no skips or doubles','Say two numbers for the same object','Count the empty spaces between objects'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'One touch, one number, every object — that is one-to-one.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['One-to-one counting means…',[['each object gets exactly one number name','ok'],['saying numbers as fast as you can','fast'],['counting the spaces between objects','gaps']]],
 ['If you touch the same grape twice…',[['your count becomes too big','ok'],['the count stays fair','fair'],['you must skip the next grape','mustskip']]],
 ['Skipping a grape in the middle…',[['makes the said total too small','ok'],['makes the said total too big','big'],['does not change anything','nothing']]],
 ['The last number you say…',[['tells how many objects there are','ok'],['is always one more than the set','plus'],['only names the colour','colour']]],
 ['A fair count needs…',[['one touch and one number per object','ok'],['two numbers for special objects','two'],['only counting the gaps','onlygaps']]],
 ['Why touch each object once?',[['so every object gets one number name','ok'],['to make counting louder','loud'],['so you can skip the last one','skiplast']]],
 ['Saying number names with no objects nearby…',[['is not counting a set one-to-one','ok'],['always finds how many toys you have','toys'],['fixes a double-count automatically','autofix']]]];
function why(t){let m='One-to-one means each object gets exactly one number name — touch once, say one word, move on.';
 if(t==='fast'||t==='loud'||t==='toys'||t==='autofix')m='Reciting numbers fast or with no objects is not one-to-one counting of a set.';
 if(t==='gaps'||t==='onlygaps')m='Count the objects themselves, not the empty spaces between them.';
 if(t==='fair'||t==='two'||t==='mustskip'||t==='big')m='A double-count makes the spoken total too big. Never give two numbers to one object.';
 if(t==='nothing'||t==='skiplast')m='A skip leaves an object without a number, so the total you say is too small.';
 if(t==='plus'||t==='colour')m='After a fair count, the last number is how many objects there are — not colour or +1.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'One-to-one controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
