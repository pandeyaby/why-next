/* Flagship: Analysing an unseen poem (ages 14–16). First-read under pressure: speaker, situation,
   tone; then imagery / form / sound → overall interpretation. Distinct from flagpoem (forms &
   performance ages 7–10) and flagtragic / flagbard (named texts). */
(()=>{
VIS.reg('flagunseen',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['read','speaker','tone','method','myth','order','chal'][A.step];
const POEM=['The street is quiet after rain.','A single window holds a light.','Someone waits, then turns away.'];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function poemBlock(g,W,H){const C=A.col;g.fillStyle=A.alpha(C.tx,.06);g.fillRect(W*.08,H*.18,W*.84,H*.42);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,H*.18,W*.84,H*.42);
 POEM.forEach((line,i)=>T(line,W/2,H*(.28+i*.12),A.narrow?12:14,{max:W*.78}))}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Unseen poem',W/2,H*.3,A.narrow?14:17,{w:900});T('gist → speaker/tone → methods → reading',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='read'){T(S.title||'First read: gist',W/2,H*.08,A.narrow?13:15,{w:800});poemBlock(g,W,H);
  T(S.gistOn?'Gist: someone waits in a quiet street, then leaves.':(S.msg||'Sum the poem in one sentence.'),W/2,H*.78,12,{c:C.mu,max:W*.92})}
 if(k==='speaker'){T(S.title||'Speaker & situation',W/2,H*.08,A.narrow?13:15,{w:800});poemBlock(g,W,H*.9);
  T(S.spOn?'Speaker notices a waiting figure; situation is after rain at night.':(S.msg||'Who speaks? What is happening?'),W/2,H*.78,12,{c:C.mu,max:W*.92})}
 if(k==='tone'){T(S.title||'Tone',W/2,H*.1,A.narrow?13:15,{w:800});
  ['lonely / subdued','angry rant','comic slapstick'].forEach((t,i)=>{const y=H*(.32+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.07,W*.8,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.1,y-H*.07,W*.8,H*.14);T(t,W/2,y,14,{max:W*.74})})}
 if(k==='method'){T(S.title||'Method → effect',W/2,H*.08,A.narrow?13:15,{w:800});
  T('"single window holds a light"',W/2,H*.28,A.narrow?13:15,{w:800});
  T(S.methOn?'Image of one lit window → isolation / waiting.':(S.msg||'Link a language choice to mood.'),W/2,H*.55,13,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{gistOn:0,spOn:0,methOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='read'){btn('Sum the gist',()=>{S.gistOn=1;S.msg='Quiet street; a wait; then turning away.';A.sound.tick();say(S.msg);A.redraw();S.check()},'State gist');
  btn('Reset',()=>{S.gistOn=0;A.redraw()},'Reset')}
 if(kind()==='speaker'){btn('Show speaker & situation',()=>{S.spOn=1;S.msg='Observer voice; after-rain night wait.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Speaker');
  btn('Reset',()=>{S.spOn=0;A.redraw()},'Reset')}
 if(kind()==='tone'){['lonely / subdued','angry rant','comic slapstick'].forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Tone '+t))}
 if(kind()==='method'){btn('Link image to mood',()=>{S.methOn=1;S.msg='One lit window suggests isolation.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Method effect');
  btn('Reset',()=>{S.methOn=0;A.redraw()},'Reset')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='read'){S.gistOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='speaker'){S.spOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='tone'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.25)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='method'){S.methOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'First-read gist',p:'On an unseen poem, start with a one-sentence gist: what happens? Do not hunt fancy techniques before you know the situation.',
 predict:{q:'Best first move on an unseen poem?',opts:['sum what happens in one or two sentences','list every metaphor before reading','ignore the title and last line'],ans:0},
 task:'Sum the poem in one sentence',show:()=>auto(0,[()=>{S.gistOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Gist',msg:'Say what the poem is about.'});say('Find the gist.');controls();S.check=finish(0,()=>!!S.gistOn,'Gist locked: wait, then leave.')}},
{h:'Speaker and situation',p:'Who seems to speak, and what is going on? Speaker is not always the poet. Situation anchors tone and later method comments.',
 predict:{q:'Speaker means…',opts:['the voice in the poem (not always the poet)','always the exam board','only the printer'],ans:0},
 task:'Show speaker and situation',show:()=>auto(1,[()=>{S.spOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Speaker',msg:'Name voice and situation.'});say('Speaker and situation.');controls();S.check=finish(1,()=>!!S.spOn,'Observer voice; after-rain wait.')}},
{h:'Tone',p:'Tone is the attitude in the voice — lonely, bitter, tender, ironic. Match tone to evidence in word choice and pacing, not to a random mood word.',
 predict:{q:'For this quiet after-rain wait, tone is closest to…',opts:['lonely / subdued','angry rant','comic slapstick'],ans:0},
 task:'Pick the fitting tone',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tone',picked:null});say('Choose the tone.');controls();S.check=finish(2,()=>S.picked===0,'Tone: lonely / subdued.')}},
{h:'Method to meaning',p:'Pick a concrete choice — image, sound, line break, form — and say how it shapes mood or meaning. Technique names without effect score poorly.',
 predict:{q:'A strong method comment…',opts:['links a choice to an effect on meaning/mood','only lists the word “metaphor”','copies the poem with no comment'],ans:0},
 task:'Link the lit-window image to mood',show:()=>auto(3,[()=>{S.methOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Method',msg:'Connect image to isolation.'});say('Method → effect.');controls();S.check=finish(3,()=>!!S.methOn,'Image supports isolation.')}},
{h:'Catch a mix-up',p:'Slips: feature-spotting with no effect; treating speaker as always the poet; inventing a plot the lines do not support.',
 predict:{q:'Which is the mix-up?',opts:['list techniques with no link to meaning','gist then speaker then methods','tone backed by word choice'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['list techniques with no link to meaning','gist then speaker then methods','tone backed by word choice'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Methods need an effect on meaning.')}},
{h:'Order the response',p:'Order under time pressure: gist → speaker/situation → tone → two methods with effects → short overall interpretation.',
 predict:{q:'Best order starts with…',opts:['gist of what happens','a random list of poetic devices','rewriting the poem as prose only'],ans:0},
 task:'Tap the best opening move',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Response order',opts:['gist of what happens','a random list of poetic devices','rewriting the poem as prose only'],picked:null});say('Pick the opening.');controls();S.check=finish(5,()=>S.picked===0,'Start with gist.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Best first move?',[['sum the gist','ok'],['list metaphors first','tech'],['skip the ending','skip']]],
 ['Speaker means…',[['voice in the poem','ok'],['always the poet','poet'],['the printer','skip']]],
 ['Tone here is closest to…',[['lonely / subdued','ok'],['angry rant','tone'],['comic slapstick','tone']]],
 ['Strong method comment…',[['choice → effect on mood','ok'],['only say metaphor','tech'],['copy lines only','skip']]],
 ['Which is the mix-up?',[['techniques with no meaning link','ok'],['gist then methods','true'],['tone from evidence','true']]],
 ['Open a timed response with…',[['gist','ok'],['device dump','tech'],['prose rewrite only','skip']]],
 ['Overall interpretation should…',[['tie methods to a clear reading','ok'],['ignore tone','tone'],['invent a new plot','skip']]]];
function why(t){let m='Gist → speaker/situation → tone → methods with effects → short overall reading.';
 if(t==='tech')m='Naming a technique is not enough. Say how the choice shapes mood or meaning.';
 if(t==='poet')m='Speaker is the voice in the poem. It is not automatically the poet.';
 if(t==='tone')m='Match tone to evidence in the lines — quiet wait is not an angry rant or slapstick.';
 if(t==='skip')m='Do not skip gist, invent plot, or only copy lines. Build a reading from what is there.';
 if(t==='true')m='That approach is sound — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Unseen poem controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
