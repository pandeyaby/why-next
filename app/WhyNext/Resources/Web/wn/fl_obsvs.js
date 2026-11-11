/* Flagship: Observation vs interpretation (ages 6–7; scientific inquiry).
   Sort see/hear facts from guesses; watch a jar and separate what you saw from what you think;
   reject “I saw it was angry”; match evidence to claims; then challenge.
   Distinct from asking questions (flagask) and feeling of not understanding (flaghuh). */
(()=>{
VIS.reg('flagobsvs',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','jar','angry','match','test','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Observe ≠ interpret',W/2,H*.35,A.narrow?15:18,{w:900});T('What you see · what you think',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){T('Observation or interpretation?',W/2,H*.08,A.narrow?13:15,{w:800});
  g.fillStyle=A.alpha(C.gr,.15);g.fillRect(W*.04,H*.18,W*.42,H*.5);g.fillStyle=A.alpha(C.or,.15);g.fillRect(W*.54,H*.18,W*.42,H*.5);
  T('I see / hear',W*.25,H*.25,13,{w:800});T('I think / guess',W*.75,H*.25,13,{w:800});
  T(S.card||'The ice is melting',W/2,H*.55,A.narrow?14:16,{w:800,max:W*.9});
  T(S.msg||'Tap a box for this clue',W/2,H*.88,12,{c:C.mu})}
 if(k==='jar'){T('Jar on the windowsill',W/2,H*.08,A.narrow?14:16,{w:800});
  g.fillStyle=A.alpha(C.cy,.35);g.fillRect(W*.35,H*.25,W*.3,H*.4);g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(W*.35,H*.25,W*.3,H*.4);
  g.fillStyle=A.alpha(C.am,.5);g.beginPath();g.ellipse(W*.5,H*.55,W*.1,H*.06,0,0,Math.PI*2);g.fill();
  T(S.msg||'Water drops on the inside. What did you SEE?',W/2,H*.88,A.narrow?11:13,{c:C.mu,max:W*.92})}
 if(k==='angry'){T('Dog barked. Kid says: “It was angry.”',W/2,H*.12,A.narrow?12:14,{w:800,max:W*.92});
  T('Is “angry” an observation?',W/2,H*.4,A.narrow?14:16);
  T(S.picked==null?'Yes or no?':'Picked: '+['No — that is a guess','Yes — I saw anger'][S.picked],W/2,H*.7,A.narrow?12:14,{c:C.mu,max:W*.9})}
 if(k==='match'){T('Match claim to evidence',W/2,H*.08,A.narrow?14:16,{w:800});
  T('Claim: the plant grew',W/2,H*.28,13);T(S.matched?'Evidence: height was 4 cm, now 7 cm ✓':'Pick the observation that supports it',W/2,H*.55,A.narrow?12:14,{c:C.mu,max:W*.9});
  T(S.msg||'',W/2,H*.85,12,{c:C.mu})}
 if(k==='test'){T('Which can you check by looking?',W/2,H*.1,A.narrow?13:15,{w:800,max:W*.92});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{card:'',msg:'',picked:null,matched:0,opts:[],n:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
const CARDS=[['The ice is melting',0],['The ice feels sad',1],['I hear a beep',0],['The machine is lonely',1]];
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){btn('I see / hear',()=>{const need=CARDS[S.n||0][1];if(need!==0){A.sound.miss();S.msg='That one is a guess — try the other box';say(S.msg);A.redraw();return}S.n=(S.n||0)+1;if(S.n>=CARDS.length){S.done=1;S.msg='Sorted!'}else{S.card=CARDS[S.n][0];S.msg='Next clue'}A.sound.tick();say(S.msg);A.redraw();S.check()},'Observation');btn('I think / guess',()=>{const need=CARDS[S.n||0][1];if(need!==1){A.sound.miss();S.msg='That one you can see or hear';say(S.msg);A.redraw();return}S.n=(S.n||0)+1;if(S.n>=CARDS.length){S.done=1;S.msg='Sorted!'}else{S.card=CARDS[S.n][0];S.msg='Next clue'}A.sound.tick();say(S.msg);A.redraw();S.check()},'Interpretation')}
 if(kind()==='jar'){btn('I see water drops',()=>{S.picked=0;S.msg='Yes — drops are what you see';A.sound.tick();say(S.msg);A.redraw();S.check()},'See drops');btn('The jar is homesick',()=>{S.picked=1;A.sound.miss();S.msg='Homesick is a guess, not what you see';say(S.msg);A.redraw()},'Guess')}
 if(kind()==='angry'){btn('No — that is a guess',()=>{S.picked=0;A.sound.tick();say('Angry is an interpretation');A.redraw();S.check()},'No');btn('Yes — I saw anger',()=>{S.picked=1;A.sound.miss();say('You saw a bark; angry is a guess');A.redraw()},'Yes')}
 if(kind()==='match'){btn('Height 4 cm → 7 cm',()=>{S.matched=1;S.msg='Observation supports the claim';A.sound.tick();say(S.msg);A.redraw();S.check()},'Height evidence');btn('Plants are happy',()=>{A.sound.miss();S.msg='Happy is not measurable here';say(S.msg);A.redraw()},'Happy guess')}
 if(kind()==='test'||kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='sort'){const left=p.x<A.W/2,need=CARDS[S.n||0][1],got=left?0:1;if(got!==need){A.sound.miss();return true}S.n=(S.n||0)+1;if(S.n>=CARDS.length)S.done=1;else S.card=CARDS[S.n][0];A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='jar'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='angry'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='match'){S.matched=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='test'||kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Sort the clues',p:'An observation is what you see, hear, or measure. An interpretation is a guess about why or what it means.',
 predict:{q:'“The ice is melting” is…',opts:['an observation','an interpretation','neither'],ans:0},
 task:'Sort 4 clues',show:()=>auto(0,[()=>{S.n=4;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({card:CARDS[0][0],n:0});say('Sort each clue.');controls();S.check=finish(0,()=>S.done,'Observations are what you sense; interpretations are guesses.')}},
{h:'What did you see?',p:'Water drops on the jar. That is what you see. “The jar misses home” is a story, not a sight.',
 predict:{q:'Water drops on the glass are…',opts:['an observation','proof the jar is sad','an interpretation of feelings'],ans:0},
 task:'Pick I see water drops',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('What did you see?');controls();S.check=finish(1,()=>S.picked===0,'Name what you saw, not a story about it.')}},
{h:'Angry is a guess',p:'You can observe a bark. Calling it “angry” adds a meaning you did not see.',
 predict:{q:'“The dog was angry” after a bark is…',opts:['an interpretation','a pure observation','a measurement'],ans:0},
 task:'Say no — that is a guess',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Is angry an observation?');controls();S.check=finish(2,()=>S.picked===0,'Feelings you assign are interpretations.')}},
{h:'Evidence for a claim',p:'Claim: the plant grew. Evidence: measured height from 4 cm to 7 cm. “Happy plant” is not evidence.',
 predict:{q:'Best evidence the plant grew?',opts:['height 4 cm then 7 cm','the plant looks proud','I feel it grew'],ans:0},
 task:'Pick height evidence',show:()=>auto(3,[()=>{S.matched=1;A.redraw();S.check()}]),
 go:()=>{reset({matched:0});say('Match claim to observation.');controls();S.check=finish(3,()=>S.matched,'Claims need observations as evidence.')}},
{h:'What can you check?',p:'Pick the statement you can check by looking or measuring.',
 predict:{q:'Which can you check by looking?',opts:['The leaf is green','The leaf is jealous','The leaf wants friends'],ans:0},
 task:'Tap the checkable one',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['The leaf is green','The leaf is jealous','The leaf wants friends'],picked:null});say('What can you check?');controls();S.check=finish(4,()=>S.picked===0,'Checkable statements are closer to observations.')}},
{h:'True idea',p:'Scientists separate what they observe from how they interpret it.',
 predict:{q:'Observation and interpretation…',opts:['are different and both useful','are the same thing','should never be written'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Observation and interpretation are different','Observation means guessing why','You should only write interpretations'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Keep see/hear facts separate from guesses.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['“The ice is melting” is…',[['an observation','ok'],['an interpretation','interp'],['neither','none']]],
 ['Water drops on glass are…',[['an observation','ok'],['proof the jar is sad','sad'],['a feeling','feel']]],
 ['“The dog was angry” is…',[['an interpretation','ok'],['a pure observation','obs'],['a measurement','meas']]],
 ['Best evidence a plant grew?',[['height 4 cm then 7 cm','ok'],['the plant looks proud','proud'],['I feel it grew','feel']]],
 ['Which can you check by looking?',[['The leaf is green','ok'],['The leaf is jealous','jel'],['The leaf wants friends','friends']]],
 ['Observation and interpretation…',[['are different and both useful','ok'],['are the same','same'],['should never be written','never']]],
 ['Why separate them?',[['so claims rest on what was sensed','ok'],['so you never guess','never'],['because observations are wrong','wrong']]]];
function why(t){let m='An observation is what you see, hear, or measure. An interpretation is a guess about meaning.';
 if(t==='interp'||t==='none'||t==='sad'||t==='feel')m='Melting ice and water drops are what you sense — not stories about feelings.';
 if(t==='obs'||t==='meas'||t==='proud')m='“Angry” or “proud” adds meaning you did not measure. Keep them labelled as guesses.';
 if(t==='jel'||t==='friends'||t==='same'||t==='never')m='Pick what you can check with senses or a ruler. Keep guesses separate.';
 if(t==='wrong')m='Both matter — but claims need observations underneath.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Observation vs interpretation controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
