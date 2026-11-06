/* Flagship: reading +, −, and = symbols (ages 5–6; Y1 number sentences).
   Match plus/minus/equals, read a sentence aloud, catch “= means the answer box” myths, write a put-together sentence, then challenge.
   Distinct from ×÷= (flagsym), combining sets (flagaddtog), and take-away (flagtake). */
(()=>{
VIS.reg('flagpmeq',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['plus','minus','equal','read','trap','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function big(g,sym){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 T(S.title||'What does this sign mean?',W/2,H*.1,A.narrow?13:15,{w:800});
 g.fillStyle=A.alpha(C.ac,.25);g.beginPath();g.roundRect?g.roundRect(W*.3,H*.28,W*.4,H*.32,16):(g.fillRect(W*.3,H*.28,W*.4,H*.32));g.fill();
 g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(W*.3,H*.28,W*.4,H*.32);T(sym,W/2,H*.44,A.narrow?48:64,{w:900});
 T(S.msg||'',W/2,H*.78,A.narrow?13:15,{w:700});T(S.sub||'',W/2,H*.9,12,{c:C.mu})}
function drawRead(g){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.08:.35);g.fillRect(0,0,W,H);
 T('Read the number sentence',W/2,H*.1,A.narrow?13:15,{w:800});
 T(S.sent||'3 + 2 = 5',W/2,H*.4,A.narrow?22:28,{w:900});T(S.msg||'Say it in words',W/2,H*.7,14,{c:C.mu})}
function drawIdea(g){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
 (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
function draw(A){const{ctx:g}=A,k=kind();
 if(k==='chal'){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.35);g.fillRect(0,0,W,H);T('+  −  =',W/2,H*.32,A.narrow?28:36,{w:900});T('plus · minus · is the same as',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='read'||k==='trap')drawRead(g); else if(k==='idea')drawIdea(g); else big(g,S.sym||'+'); A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{done:0,msg:'',sub:'',sym:'+',sent:'3 + 2 = 5',picked:null,opts:[],title:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='plus'){btn('Plus means put together',()=>{S.done=1;S.msg='+ means put together / add';A.sound.tick();say(S.msg);A.redraw();S.check()},'Name the plus sign')}
 if(kind()==='minus'){btn('Minus means take away',()=>{S.done=1;S.msg='− means take away / subtract';A.sound.tick();say(S.msg);A.redraw();S.check()},'Name the minus sign')}
 if(kind()==='equal'){btn('Equals means the same as',()=>{S.done=1;S.msg='= means is the same as';A.sound.tick();say(S.msg);A.redraw();S.check()},'Name the equals sign')}
 if(kind()==='read'){btn('Say: three plus two equals five',()=>{S.done=1;S.msg='3 + 2 = 5 → three plus two equals five';A.sound.tick();say(S.msg);A.redraw();S.check()},'Read the sentence in words')}
 if(kind()==='trap'){btn('Myth: = only means answer box',()=>{S.msg='Myth — = means both sides are the same';A.sound.miss();A.redraw()},'Show the answer-box myth');btn('Truth: both sides the same',()=>{S.done=1;S.msg='5 = 3 + 2 is also fair — same value both sides';A.sound.tick();A.redraw();S.check()},'Treat equals as same value')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='plus'||kind()==='minus'||kind()==='equal'||kind()==='read'||kind()==='trap'){S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Plus sign',p:'The + sign means put together or add. 3 + 2 means three put with two.',
 predict:{q:'The + sign means…',opts:['put together / add','take away','the answer box only'],ans:0},
 task:'Name the plus sign',show:()=>auto(0,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({sym:'+',title:'Name the + sign'});say('Name the plus sign.');controls();S.check=finish(0,()=>S.done,'Plus means put together.')}},
{h:'Minus sign',p:'The − sign means take away or subtract. 5 − 2 means five take away two.',
 predict:{q:'The − sign means…',opts:['take away / subtract','put together','draw a line only'],ans:0},
 task:'Name the minus sign',show:()=>auto(1,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({sym:'−',title:'Name the − sign'});say('Name the minus sign.');controls();S.check=finish(1,()=>S.done,'Minus means take away.')}},
{h:'Equals sign',p:'The = sign means is the same as. Both sides have the same value.',
 predict:{q:'The = sign means…',opts:['is the same as','always put the answer on the right','take away'],ans:0},
 task:'Name the equals sign',show:()=>auto(2,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({sym:'=',title:'Name the = sign'});say('Name the equals sign.');controls();S.check=finish(2,()=>S.done,'Equals means the same as.')}},
{h:'Read a sentence',p:'Read number sentences in words: three plus two equals five.',
 predict:{q:'How do you read 4 + 1 = 5?',opts:['four plus one equals five','four take away one equals five','four answer-box five'],ans:0},
 task:'Read 3 + 2 = 5 in words',show:()=>auto(3,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({sent:'3 + 2 = 5'});say('Read the number sentence.');controls();S.check=finish(3,()=>S.done,'Three plus two equals five.')}},
{h:'Equals is not a box',p:'Some children think = means “write the answer here”. It really means both sides are the same. 5 = 3 + 2 is fair too.',
 predict:{q:'Is 5 = 2 + 3 a fair sentence?',opts:['yes — both sides are the same','no — the answer must sit on the right','no — equals only means take away'],ans:0},
 task:'Accept 5 = 3 + 2 as fair',show:()=>auto(4,[()=>{S.done=1;S.sent='5 = 3 + 2';A.redraw();S.check()}]),
 go:()=>{reset({sent:'5 = 3 + 2',msg:'Same value both sides?'});say('Equals means the same as.');controls();S.check=finish(4,()=>S.done,'Both sides the same — fair equals.')}},
{h:'True sentence',p:'Pick the sentence that matches +, − and =.',
 predict:{q:'In 6 − 1 = 5, the − means…',opts:['take away','put together','is the same as'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['+ put together, − take away, = the same as','= always means the answer box on the right','+ and − mean the same thing'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Plus, minus and equals each have their own job.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['The + sign means…',[['put together / add','ok'],['take away','take'],['the answer box only','box']]],
 ['The − sign means…',[['take away / subtract','ok'],['put together','put'],['draw a line only','line']]],
 ['The = sign means…',[['is the same as','ok'],['always answer on the right','right'],['take away','take2']]],
 ['Read 4 + 1 = 5',[['four plus one equals five','ok'],['four take away one equals five','taway'],['four answer-box five','abox']]],
 ['Is 5 = 2 + 3 fair?',[['yes — both sides the same','ok'],['no — answer must be on the right','right2'],['no — equals means take away','eqtake']]],
 ['In 6 − 1 = 5, − means…',[['take away','ok'],['put together','put2'],['is the same as','same']]],
 ['Why learn the three signs?',[['so number sentences can be read and written clearly','ok'],['so every sum hides the first number','hide'],['because = is only a decoration','deco']]]];
function why(t){let m='+ means put together. − means take away. = means is the same as.';
 if(t==='take'||t==='box'||t==='put'||t==='line')m='Do not mix the signs. Plus adds; minus takes away; equals is not a box.';
 if(t==='right'||t==='take2'||t==='right2'||t==='eqtake')m='Equals means both sides have the same value — left or right.';
 if(t==='taway'||t==='abox'||t==='put2'||t==='same')m='Read + as plus and − as minus. Equals is “the same as”, not take-away.';
 if(t==='hide'||t==='deco')m='The three signs let you read and write number sentences clearly.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Plus minus equals controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
