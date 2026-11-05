/* Flagship: reading ×, ÷, and = symbols (ages 6–7; NC Y2 multiplication as equal groups/arrays,
   division as sharing/grouping, equals as same value). Match each sign, build an array, share equally,
   balance both sides of =, pick the sign for a story, then a challenge that traps ×/+, ÷/−, and "answer on the right". */
(()=>{
VIS.reg('flagsym',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['match','array','share','equal','story','mix','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function dots(g,n,cx,cy,r,col){const pos=[[-.6,-.5],[.6,-.5],[-.6,.5],[.6,.5],[0,0],[-1.1,0],[1.1,0],[0,-.9]];
 for(let i=0;i<n;i++){const[dx,dy]=pos[i]||[0,0];g.beginPath();g.arc(cx+dx*r*.5,cy+dy*r*.5,r*.22,0,7);g.fillStyle=col;g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke()}}
function drawArray(g,rows,cols){const W=A.W,H=A.H,C=A.col,gw=Math.min(W*.7,H*.45),ox=(W-gw)/2,oy=H*.32,cw=gw/Math.max(cols,1),ch=gw/Math.max(rows,1)*.7;
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const x=ox+c*cw+cw/2,y=oy+r*ch+ch/2;g.beginPath();g.arc(x,y,Math.min(cw,ch)*.28,0,7);g.fillStyle=C.ac;g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}}
function drawShare(g){const W=A.W,H=A.H,C=A.col,groups=S.groups,each=S.each,total=S.total;
 T(`${total} shared into ${groups} groups`,W/2,H*.1,A.narrow?14:17,{w:800});
 for(let i=0;i<groups;i++){const x=W*(.18+i*(.64/Math.max(groups-1,1)));g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.1,H*.28,W*.2,H*.42);
  const placed=Math.min(each, Math.max(0, S.placed - i*each));
  for(let j=0;j<placed;j++){g.beginPath();g.arc(x-W*.06+(j%3)*W*.06,H*.38+Math.floor(j/3)*H*.1,10,0,7);g.fillStyle=C.or;g.fill();g.strokeStyle=C.tx;g.stroke()}}
 T(S.placed>=total?`Each group has ${each}`:`Placed ${S.placed} of ${total}`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('× ÷ = — pick carefully',W/2,H*.32,A.narrow?16:20,{w:900});T('Equal groups, share, or same value?',W/2,H*.52,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='match'){T('Match each sign to its job',W/2,H*.1,A.narrow?15:18,{w:800});
  const jobs=[['×','equal groups'],['÷','share equally'],['=','same value']];
  jobs.forEach((j,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.matched&&S.matched[i]?A.alpha(C.gr,.25):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.07,W*.8,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.1,y-H*.07,W*.8,H*.14);T(j[0]+'  →  '+(S.matched&&S.matched[i]?j[1]:'？'),W/2,y,A.narrow?16:20,{w:800})});
  T(S.pick||'Tap a sign, then tap its job below',W/2,H*.92,A.narrow?12:14,{c:C.mu})}
 if(k==='array'){T(`${S.rows} × ${S.cols} array`,W/2,H*.1,A.narrow?16:19,{w:800});drawArray(g,S.rows,S.cols);T(`${S.rows} rows of ${S.cols} = ${S.rows*S.cols}`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
 if(k==='share')drawShare(g);
 if(k==='equal'){T('Make both sides equal',W/2,H*.1,A.narrow?15:18,{w:800});
  T(`${S.left}  =  ${S.right==null?'？':S.right}`,W/2,H*.42,A.narrow?22:28,{w:900});
  T(S.right==null?'Tap a number for the right side':(S.left===S.right?'Balanced — same value':'Not equal yet'),W/2,H*.7,A.narrow?13:15,{c:S.right!=null&&S.left===S.right?C.gr:C.mu})}
 if(k==='story'){T(S.story||'',W/2,H*.2,A.narrow?14:17,{w:800,max:W*.9});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.55;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.1,W*.24,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.1,W*.24,H*.2);T(t,x,y,A.narrow?22:28,{w:900})})}
 if(k==='mix'){T('Tap the true sentence',W/2,H*.12,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.32+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.07,W*.84,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,y-H*.07,W*.84,H*.14);T(t,W/2,y,A.narrow?14:17,{w:800})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{matched:[0,0,0],pick:null,rows:2,cols:3,total:8,groups:4,each:2,placed:0,left:6,right:null,story:'',opts:[],picked:null,lock:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='match'){[['×','equal groups',0],['÷','share equally',1],['=','same value',2]].forEach(([sg,job,i])=>{
  btn('Sign '+sg,()=>{S.pick=sg;say('Sign '+sg+' selected. Now pick its job.');A.redraw()},'Select sign '+sg);
  btn(job,()=>{if(S.pick!==sg){A.sound.miss();say('Pick sign '+sg+' first, or choose the matching job.');return}
   S.matched[i]=1;S.pick=null;A.sound.pop();say(sg+' means '+job+'.');A.redraw();S.check()},'Job: '+job)})}
 if(kind()==='array'){btn('Add a row',()=>{if(S.rows<4){S.rows++;A.sound.tick();say(S.rows+' rows of '+S.cols);A.redraw();S.check()}},'Add one row to the array');
  btn('Add a column',()=>{if(S.cols<4){S.cols++;A.sound.tick();say(S.rows+' rows of '+S.cols);A.redraw();S.check()}},'Add one column to the array');
  btn('Reset 1×1',()=>{S.rows=1;S.cols=1;say('Reset to 1 by 1');A.redraw();S.check()},'Reset the array')}
 if(kind()==='share'){btn('Place one counter',()=>{if(S.placed<S.total){S.placed++;A.sound.tick();say('Placed '+S.placed+' of '+S.total);A.redraw();S.check()}},'Place one shared counter');
  btn('Fill equal shares',()=>{S.placed=S.total;A.sound.pop();say('Each of '+S.groups+' groups has '+S.each);A.redraw();S.check()},'Fill all equal groups')}
 if(kind()==='equal'){[4,5,6,7,8,9].forEach(n=>btn(String(n),()=>{S.right=n;A.sound.tick();say('Right side '+n+(n===S.left?' — balanced':' — not equal'));A.redraw();S.check()},'Set right side to '+n))}
 if(kind()==='story'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick '+t))}
 if(kind()==='mix'){(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick '+t))}
}
function down(p){if(kind()==='chal')return false;S.drag=1;S.dx0=p.x;S.dy0=p.y;return true}
function move(p){if(!S.drag)return;
 if(kind()==='array'){const nr=Math.max(1,Math.min(4,Math.round((p.y-A.H*.25)/(A.H*.5)*4)));const nc=Math.max(1,Math.min(4,Math.round((p.x-A.W*.15)/(A.W*.7)*4)));
  if(nr!==S.rows||nc!==S.cols){S.rows=nr;S.cols=nc;A.redraw()}}
 if(kind()==='share'){const want=Math.max(0,Math.min(S.total,Math.round((p.x-A.W*.1)/(A.W*.8)*S.total)));if(want!==S.placed){S.placed=want;A.redraw()}}
 if(kind()==='story'||kind()==='mix'){/* tap handled on up via buttons; drag highlights */}}
function up(){if(kind()==='array')S.check();if(kind()==='share')S.check();S.drag=0}
const steps=[
{h:'Match the signs',p:'× means equal groups. ÷ means share equally. = means both sides have the same value.',
 predict:{q:'What does × mean?',opts:['equal groups','take away','write bigger digits'],ans:0},
 task:'Match ×, ÷ and = to their jobs',show:()=>auto(0,[()=>{S.matched=[1,1,1];A.redraw();S.check()}]),
 go:()=>{reset({matched:[0,0,0],pick:null});say('Match each sign to its job.');controls();S.check=finish(0,()=>S.matched.every(Boolean),'× groups, ÷ shares, = same value.')}},
{h:'Build an array',p:'An array shows equal rows. 2 × 3 is 2 rows of 3. That is equal groups.',
 predict:{q:'2 rows of 3 is written…',opts:['2 × 3','2 + 3','2 ÷ 3'],ans:0},
 task:'Build a 2-by-3 array',show:()=>auto(1,[()=>{S.rows=2;S.cols=3;A.redraw();S.check()}]),
 go:()=>{reset({rows:1,cols:1});say('Make 2 rows of 3.');controls();S.check=finish(1,()=>S.rows===2&&S.cols===3,'2 × 3 = 6. That is an array of equal groups.')}},
{h:'Share equally',p:'8 ÷ 4 means share 8 into 4 equal groups. Each group gets the same number.',
 predict:{q:'8 ÷ 4 means…',opts:['4 equal groups from 8','8 take away 4 once','stick 8 and 4'],ans:0},
 task:'Share 8 into 4 equal groups',show:()=>auto(2,[()=>{S.placed=8;A.redraw();S.check()}]),
 go:()=>{reset({total:8,groups:4,each:2,placed:0});say('Share 8 into 4 equal groups.');controls();S.check=finish(2,()=>S.placed>=8,'8 ÷ 4 = 2 in each group.')}},
{h:'Equals means same',p:'= means both sides match. 3 + 3 = 6 and also 6 = 3 + 3. The answer is not stuck on one side.',
 predict:{q:'Which is true?',opts:['6 = 2 × 3','6 = 2 + 3','6 = 2 ÷ 3'],ans:0},
 task:'Set the right side so 6 = 6',show:()=>auto(3,[()=>{S.right=6;A.redraw();S.check()}]),
 go:()=>{reset({left:6,right:null});say('Make both sides equal 6.');controls();S.check=finish(3,()=>S.right===6,'Both sides are 6. Equals means same value.')}},
{h:'Sign for a story',p:'Read the story. Pick × for equal groups, ÷ for sharing, = when both sides match.',
 predict:{q:'\"3 bags of 5\" needs which sign?',opts:['×','÷','−'],ans:0},
 task:'Pick the sign for \"2 plates share 10 grapes\"',show:()=>auto(4,[()=>{S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({story:'2 plates share 10 grapes fairly',opts:['×','÷','='],picked:null});say('Which sign fits this story?');controls();S.check=finish(4,()=>S.picked===1,'Sharing fairly uses ÷. 10 ÷ 2 = 5 each.')}},
{h:'True sentence',p:'Pick the sentence that uses the signs correctly.',
 predict:{q:'Which sentence is correct?',opts:['4 × 2 = 8','4 × 2 = 6','4 ÷ 2 = 8'],ans:0},
 task:'Tap the true number sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['4 × 2 = 8','4 + 2 = 8','4 ÷ 2 = 8'],picked:null});say('Tap the true sentence.');controls();S.check=finish(5,()=>S.picked===0,'4 × 2 = 8. Adding gives 6; dividing gives 2.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['2 × 3 means…',[['2 groups of 3','ok'],['2 + 3','add'],['23','stick']]],
 ['8 ÷ 2 means…',[['share 8 into 2 equal groups','ok'],['8 take away 2','sub'],['82','stick']]],
 ['= means…',[['both sides have the same value','ok'],['the answer must sit on the right','right'],['add both sides','add']]],
 ['3 rows of 4 is…',[['3 × 4','ok'],['3 + 4','add'],['3 ÷ 4','div']]],
 ['10 shared by 5 children uses…',[['÷','ok'],['×','mul'],['+','add']]],
 ['Why is 5 = 2 + 3 true?',[['both sides equal 5','ok'],['answers only go on the left','left'],['+ means multiply','mul']]],
 ['2 × 3 is not 5 because…',[['× is equal groups, not add','ok'],['3 is too big','big'],['2 is even','even']]]];
function why(t){let m='Check whether you need equal groups, sharing, or the same value.';
 if(t==='add')m='That used add (+). × is equal groups; ÷ is share; = checks matching values.';
 if(t==='sub')m='Taking away once is subtraction (−), not division. ÷ makes equal shares.';
 if(t==='stick')m='Do not stick digits together. Symbols change how you combine the numbers.';
 if(t==='right')m='Equals is not \"answer on the right\". 5 = 2 + 3 is true because both sides match.';
 if(t==='left')m='Equals does not force the total onto the left. Either side can hold a sum or product.';
 if(t==='div')m='Rows of equal size are multiply (×), not divide.';
 if(t==='mul')m='Sharing uses ÷. Multiply (×) builds equal groups; it does not share them out.';
 if(t==='big'||t==='even')m='Look at the sign, not only the size or parity of a number.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Symbol controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
