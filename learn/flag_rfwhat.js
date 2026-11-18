/* Flagship: What Is a Rainforest? (ages 5–7).
   Build hot+wet near the Equator; see daily rain grow tall thick trees; reject “hot means desert”
   and “rainforests are cold”; point Equator belt; then challenge.
   Distinct from multi-place compare (flagplaces) and animals-everywhere habitats (flaganwhere). */
(()=>{
VIS.reg('flagrfwhat',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['climate','rain','trees','equator','myth','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Rainforest = hot + wet',W/2,H*.32,A.narrow?14:17,{w:900});T('Near the Equator · rain most days · tall trees',W/2,H*.55,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='climate'){T('Build a rainforest climate',W/2,H*.09,A.narrow?13:15,{w:800});
  g.fillStyle=S.hot?A.alpha(C.am,.45):A.alpha(C.tx,.08);g.fillRect(W*.08,H*.28,W*.38,H*.36);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,H*.28,W*.38,H*.36);T('Hot ☀️',W*.27,H*.46,A.narrow?14:16);
  g.fillStyle=S.wet?A.alpha(C.cy,.45):A.alpha(C.tx,.08);g.fillRect(W*.54,H*.28,W*.38,H*.36);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.54,H*.28,W*.38,H*.36);T('Wet 🌧️',W*.73,H*.46,A.narrow?14:16);
  T(S.hot&&S.wet?'Hot and wet — rainforest weather':'Tap Hot and Wet',W/2,H*.86,A.narrow?12:14,{c:C.mu})}
 if(k==='rain'){T('How often does it rain?',W/2,H*.1,A.narrow?14:16,{w:800});
  T('🌧️'.repeat(S.days||0)||'…',W/2,H*.4,A.narrow?18:22);
  T(S.days>=5?'Almost every day':'Tap Add a rainy day',W/2,H*.7,A.narrow?13:15,{c:C.mu});
  T((S.days||0)+' rainy days this week',W/2,H*.88,12,{c:C.mu})}
 if(k==='trees'){T('Rain + warmth → tall thick trees',W/2,H*.1,A.narrow?13:15,{w:800});
  const h=S.grown?H*.55:H*.22;g.fillStyle=C.gr;g.fillRect(W*.22,H*.85-h,W*.12,h);g.fillRect(W*.46,H*.85-h*1.1,W*.12,h*1.1);g.fillRect(W*.70,H*.85-h*.9,W*.12,h*.9);
  g.fillStyle=A.alpha(C.gr,.7);g.beginPath();g.arc(W*.28,H*.85-h,28,0,7);g.arc(W*.52,H*.85-h*1.1,32,0,7);g.arc(W*.76,H*.85-h*.9,26,0,7);g.fill();
  T(S.grown?'Tall thick forest':'Tap Grow the trees',W/2,H*.92,A.narrow?12:14,{c:C.mu})}
 if(k==='equator'){T('Where are rainforests?',W/2,H*.1,A.narrow?14:16,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.ellipse(W/2,H*.48,W*.32,H*.28,0,0,7);g.stroke();
  g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(W*.18,H*.48);g.lineTo(W*.82,H*.48);g.stroke();
  T('Equator',W/2,H*.48-18,12,{c:C.rd});
  T(S.pointed?'Hot belt near the Equator':'Tap the Equator belt',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='myth'){T('Hot means desert?',W/2,H*.12,A.narrow?15:18,{w:800});
  T('A place can be hot AND wet',W/2,H*.4,A.narrow?14:16,{max:W*.9});
  T(S.picked==null?'Is every hot place a desert?':'Picked '+['no — rainforest is hot and wet','yes — hot always means desert'][S.picked],W/2,H*.7,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{hot:0,wet:0,days:0,grown:0,pointed:0,picked:null,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='climate'){btn('Hot',()=>{S.hot=1;A.sound.tick();say('Hot');A.redraw();S.check()},'Set hot');btn('Wet',()=>{S.wet=1;A.sound.tick();say('Wet');A.redraw();S.check()},'Set wet')}
 if(kind()==='rain'){btn('Add a rainy day',()=>{S.days=Math.min(7,(S.days||0)+1);A.sound.tick();say(S.days+' rainy days');A.redraw();S.check()},'Add rain')}
 if(kind()==='trees'){btn('Grow the trees',()=>{S.grown=1;A.sound.tick();say('Tall thick trees');A.redraw();S.check()},'Grow trees')}
 if(kind()==='equator'){btn('Point to Equator belt',()=>{S.pointed=1;A.sound.tick();say('Rainforests near the Equator');A.redraw();S.check()},'Equator')}
 if(kind()==='myth'){btn('No — rainforest is hot and wet',()=>{S.picked=0;A.sound.tick();say('Hot and wet, not desert');A.redraw();S.check()},'Not desert');btn('Yes — hot always means desert',()=>{S.picked=1;A.sound.miss();say('Deserts are hot and dry');A.redraw()},'Desert myth')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='climate'){if(p.x<A.W/2)S.hot=1;else S.wet=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='rain'){S.days=Math.min(7,(S.days||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='trees'||kind()==='equator'){S.grown=S.pointed=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Hot and wet',p:'A rainforest is hot and wet. You need both — not just heat.',
 predict:{q:'A rainforest climate is…',opts:['hot and wet','hot and dry','cold and dry'],ans:0},
 task:'Turn on Hot and Wet',show:()=>auto(0,[()=>{S.hot=1;A.redraw()},()=>{S.wet=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Build hot and wet.');controls();S.check=finish(0,()=>S.hot&&S.wet,'Rainforest weather is hot and wet.')}},
{h:'Rain most days',p:'It rains very often in a rainforest — almost every day. That is why plants grow so well.',
 predict:{q:'In a rainforest it rains…',opts:['almost every day','almost never','only once a year'],ans:0},
 task:'Add rainy days until almost every day',show:()=>auto(1,[()=>{S.days=5;A.redraw();S.check()}]),
 go:()=>{reset({days:0});say('How often does it rain?');controls();S.check=finish(1,()=>(S.days||0)>=5,'Rain almost every day feeds the forest.')}},
{h:'Tall thick trees',p:'Heat and lots of rain help trees grow tall and thick. That makes the rainforest look dense and green.',
 predict:{q:'Why do rainforest trees grow so tall?',opts:['lots of rain and warmth','because deserts are wet','because it is always cold'],ans:0},
 task:'Grow the tall thick trees',show:()=>auto(2,[()=>{S.grown=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Grow the forest.');controls();S.check=finish(2,()=>S.grown,'Rain and warmth grow tall thick trees.')}},
{h:'Near the Equator',p:'Rainforests sit in the hot belt near the Equator — the middle line around Earth.',
 predict:{q:'Rainforests are found…',opts:['near the Equator','only at the North Pole','only in icy Antarctica'],ans:0},
 task:'Point to the Equator belt',show:()=>auto(3,[()=>{S.pointed=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Where on Earth?');controls();S.check=finish(3,()=>S.pointed,'Rainforests grow near the Equator.')}},
{h:'Hot is not desert',p:'Deserts are hot and dry. Rainforests are hot and wet. Hot alone does not mean desert.',
 predict:{q:'Is every hot place a desert?',opts:['no — a rainforest is hot and wet','yes — hot always means desert','yes — rainforests are cold'],ans:0},
 task:'Pick no — rainforest is hot and wet',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Hot means desert?');controls();S.check=finish(4,()=>S.picked===0,'Hot and wet ≠ hot and dry desert.')}},
{h:'True sentence',p:'Pick the sentence that matches what a rainforest is.',
 predict:{q:'A rainforest is…',opts:['a thick tall forest that is hot and wet near the Equator','a cold icy forest','a dry sandy desert'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['A rainforest is a thick, tall forest that is hot and wet near the Equator','A rainforest is cold and icy','A rainforest is a hot dry desert'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Hot, wet, near the Equator, tall thick trees.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A rainforest climate is…',[['hot and wet','ok'],['hot and dry','dry'],['cold and dry','cold']]],
 ['In a rainforest it rains…',[['almost every day','ok'],['almost never','never'],['only once a year','year']]],
 ['Why do rainforest trees grow so tall?',[['lots of rain and warmth','ok'],['because deserts are wet','deswet'],['because it is always cold','cold2']]],
 ['Rainforests are found…',[['near the Equator','ok'],['only at the North Pole','pole'],['only in icy Antarctica','ant']]],
 ['Is every hot place a desert?',[['no — a rainforest is hot and wet','ok'],['yes — hot always means desert','always'],['yes — rainforests are cold','rfcold']]],
 ['A rainforest is…',[['a thick tall forest that is hot and wet near the Equator','ok'],['a cold icy forest','icy'],['a dry sandy desert','sand']]],
 ['Why learn about rainforests?',[['to know hot wet Equator forests with tall trees','ok'],['to mix them up with deserts','mix'],['to say they never get rain','norain']]]];
function why(t){let m='A rainforest is a thick, tall forest that is hot and wet near the Equator.';
 if(t==='dry'||t==='cold'||t==='always'||t==='rfcold'||t==='sand')m='Deserts are hot and dry. Rainforests are hot and wet — not cold, not dry.';
 if(t==='never'||t==='year'||t==='deswet'||t==='cold2')m='It rains almost every day. Rain and warmth grow tall thick trees.';
 if(t==='pole'||t==='ant'||t==='icy')m='Rainforests sit in the hot belt near the Equator, not at the poles.';
 if(t==='mix'||t==='norain')m='Remember: hot + wet + Equator + tall thick trees.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Rainforest controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
