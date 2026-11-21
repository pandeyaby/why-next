/* Flagship – making up a story in play (ages 3–4; Development Matters 2021; small-world story play). Scenes: drag story
   words into the talk bubble and Teddy onto the play mat; drag each line to the toy who would say it; make something
   happen in the middle and drag the toy who can fix it to the tree; choose an ending; then mix who / where / oh no /
   end cards to make up two different stories of your own. Every drag has a tap-to-pick twin. Data in learn/playstory_art.js. */
(()=>{const {START,CAST,LINES,HAPPEN,HELP,ENDS,ROWS,FIX,DESC,DONE,QS}=PST;
VIS.reg('flagplaystory',c=>{let A,pad,quizBox,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#1e293b',GOOD='#047857',BAD='#b91c1c',RIM='#64748b',HOT='#7c3aed',FONT='px system-ui,sans-serif';
const SCENES=['begin','voice','problem','ending','invent','quiz'],scene=()=>SCENES[A.step];
const px=n=>Math.round(A.narrow?n:n*1.12);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const box=(x,y,w,h)=>({x,y,w,h}),mid=r=>({x:r.x+r.w/2,y:r.y+r.h/2});
/* words shrink to fit their space; long ones wrap onto two lines */
function write(s,x,y,n,o={}){const g=A.ctx;let k=px(n);const set=()=>g.font=`${o.wt||800} ${k}${FONT}`;set();while(o.max&&k>9&&g.measureText(s).width>o.max){k--;set()}
 g.fillStyle=o.ink||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}
function words(s,r,n){const p=s.split(' '),g=A.ctx;g.font=`800 ${px(n)}${FONT}`;if(p.length<4||g.measureText(s).width<r.w-16)return write(s,r.x+r.w/2,r.y+r.h/2,n,{max:r.w-12});const h=Math.ceil(p.length/2);
 write(p.slice(0,h).join(' '),r.x+r.w/2,r.y+r.h*.33,n,{max:r.w-12});write(p.slice(h).join(' '),r.x+r.w/2,r.y+r.h*.69,n,{max:r.w-12})}
/* card states: ok (green, ✓), no (red, ✗), hot (purple, picked or hovered); the text carries ✓ / ✗ so colour is not the only cue */
function card(r,st){const g=A.ctx,F={ok:['#d1fae5',GOOD],no:['#fee2e2',BAD],hot:['#ede9fe',HOT]}[st]||['#ffffff',RIM];
 g.fillStyle=F[0];A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(16,r.h/3));g.fill();g.lineWidth=st?4:2;g.strokeStyle=F[1];g.stroke()}
function banner(s,good){const g=A.ctx;let k=px(15);g.font=`800 ${k}${FONT}`;while(g.measureText(s).width>A.W-40&&k>10){k--;g.font=`800 ${k}${FONT}`}
 const w=g.measureText(s).width+26,r=box((A.W-w)/2,6,w,k+16);card(r,good?'ok':'');write(s,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.12))}
function floor(tint,t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,tint,A.col.dark?.12:t);g.fillRect(0,0,A.W,A.H)}
function mat(r,label){const g=A.ctx;g.fillStyle='#bbf7d0';A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.lineWidth=2;g.strokeStyle=GOOD;g.setLineDash([6,5]);g.stroke();g.setLineDash([]);
 if(label)write(label,r.x+r.w/2,r.y+r.h-14,11,{wt:700,ink:'#14532d',max:r.w-20})}
/* the story so far: start, oh no, the end */
function strip(fill){const w=(A.W-40)/3,names=['Start','Oh no!','The end'];names.forEach((n,i)=>{const r=box(10+i*(w+10),A.H*.9,w,A.H*.08);card(r,fill[i]?'ok':'');write((fill[i]?'✓ ':'')+n,r.x+r.w/2,r.y+r.h/2,12,{max:r.w-8})})}
/* ---------- each scene: pieces you drag, places you drop them ---------- */
const rows=(y,h)=>i=>box(A.W*.05,A.H*(y+i*(h+.02)),A.W*.9,A.H*h);
const row3=(y,h)=>i=>{const w=(A.W-40)/3;return box(10+i*(w+10),A.H*y,w,A.H*h)};
const SC={
 begin:{tint:'#fde68a',
  pieces:()=>[...START.filter(s=>!(s.good&&S.start)).map((s,i)=>({k:s.k,t:s.t,r:row3(.64,.13)(START.indexOf(s))})),...(S.teddy?[]:[{k:'teddy',t:'🧸 Teddy',r:box(A.W*.34,A.H*.81,A.W*.32,A.H*.13)}])],
  spots:()=>[{k:'bubble',n:'the talk bubble',r:box(A.W*.08,A.H*.12,A.W*.84,A.H*.13)},{k:'mat',n:'the play mat',r:box(A.W*.08,A.H*.29,A.W*.84,A.H*.3)}],
  paint(){const [b,m]=this.spots().map(q=>q.r);card(b,S.start?'ok':S.bad==='bubble'?'no':S.over==='bubble'?'hot':'');write(S.start?'🗣️ ✓ Once upon a time…':'🗣️ story words go here',b.x+b.w/2,b.y+b.h/2,15,{max:b.w-16,ink:S.start?INK:'#475569'});
   mat(m,'play mat');if(S.teddy)write('🧸',m.x+m.w/2,m.y+m.h*.42,40);else write('Teddy goes here',m.x+m.w/2,m.y+m.h*.42,13,{wt:700,ink:'#14532d'});
   banner(S.start&&S.teddy?'A story has started!':'Start the story',S.start&&S.teddy)},
  drop(pk,sk){if(pk==='teddy'){if(sk!=='mat'){S.bad=sk;return no('Teddy goes on the play mat. The talk bubble is for story words.')}S.teddy=1;return yes('Teddy is on the mat. Teddy can be in the story!')}
   const s=START.find(x=>x.k===pk);if(sk!=='bubble'){S.bad=sk;return no('Story words go in the talk bubble.')}if(!s.good){S.bad='bubble';return no(slip(s.slip))}
   S.start=1;yes('“Once upon a time…” These words tell everyone a story is starting.')}},
 voice:{tint:'#a5f3fc',
  pieces:()=>LINES.filter(l=>!S.said.includes(l.k)).map(l=>({k:l.k,t:l.t,r:row3(.68,.17)(LINES.indexOf(l))})),
  spots:()=>CAST.map((t,i)=>({k:t.k,n:t.n,r:row3(.14,.4)(i)})),
  paint(){this.spots().forEach((s,i)=>{const t=CAST[i],L=LINES.find(l=>l.who===t.k),got=S.said.includes(L.k);card(s.r,got?'ok':S.bad===t.k?'no':S.over===t.k?'hot':'');
   write(t.e,s.r.x+s.r.w/2,s.r.y+s.r.h*.32,34);write(t.n,s.r.x+s.r.w/2,s.r.y+s.r.h*.62,13,{max:s.r.w-8});if(got)words('✓ '+L.t,box(s.r.x,s.r.y+s.r.h*.7,s.r.w,s.r.h*.28),10)});
   banner(S.said.length>=3?'Every toy has a voice!':'What would each toy say?',S.said.length>=3)},
  drop(pk,sk){const L=LINES.find(l=>l.k===pk),T=CAST.find(t=>t.k===sk),R=CAST.find(t=>t.k===L.who);if(L.who!==sk){S.bad=sk;return no(`${T.n} would not say “${L.t}” ${R.n} is ${R.cue}, so ${R.n} says that.`)}
   S.said.push(pk);yes(`${T.n} says: “${L.t}”`+(S.said.length<3?` ${S.said.length} of 3.`:''))}},
 problem:{tint:'#fbcfe8',
  pieces:()=>S.ohno?HELP.filter(h=>!S.fixed).map((h,i)=>({k:h.k,t:h.e+' '+h.n,r:row3(.7,.15)(i)})):HAPPEN.map((h,i)=>({k:h.k,t:h.t,r:rows(.56,.09)(i)})),
  spots:()=>S.ohno?[{k:'tree',n:'the tree',r:box(A.W*.56,A.H*.12,A.W*.38,A.H*.48)}]:[{k:'middle',n:'the middle of the story',r:box(A.W*.08,A.H*.13,A.W*.84,A.H*.38)}],
  paint(){const s=this.spots()[0];if(!S.ohno){card(s.r,S.bad==='middle'?'no':S.over==='middle'?'hot':'');write('🧸 Teddy is on the mat.',s.r.x+s.r.w/2,s.r.y+s.r.h*.3,14,{max:s.r.w-16});write('What happens next?',s.r.x+s.r.w/2,s.r.y+s.r.h*.66,15,{max:s.r.w-16,ink:'#475569'})}
   else{const g=A.ctx;mat(box(A.W*.06,A.H*.12,A.W*.46,A.H*.48),'');write(S.fixed?'🧸🎩':'🧸😢',A.W*.29,A.H*.36,34);write(S.fixed?'Hat back!':'My hat!',A.W*.29,A.H*.53,13,{ink:'#14532d'});
    card(s.r,S.fixed?'ok':S.bad==='tree'?'no':S.over==='tree'?'hot':'');write('🌳',s.r.x+s.r.w/2,s.r.y+s.r.h*.55,Math.max(44,s.r.w*.42));if(!S.fixed)write('🎩',s.r.x+s.r.w*.62,s.r.y+s.r.h*.2,20);
    if(S.fixed)write('🐉',s.r.x+s.r.w*.25,s.r.y+s.r.h*.22,24);write(S.fixed?'✓ fixed':'hat up the tree',s.r.x+s.r.w/2,s.r.y+s.r.h*.9,12,{max:s.r.w-8})}
   strip([1,S.ohno,0]);banner(S.fixed?'Oh no… and then fixed!':S.ohno?'Who can get the hat?':'Make something happen',S.fixed)},
  drop(pk,sk){if(!S.ohno){const h=HAPPEN.find(x=>x.k===pk);if(!h.good){S.bad='middle';return no(slip(h.slip))}S.ohno=1;return yes('Oh no! Now the story has a problem. Who can help?')}
   const h=HELP.find(x=>x.k===pk);if(!h.good){S.bad='tree';return no(h.say)}S.fixed=1;yes(h.say)}},
 ending:{tint:'#ddd6fe',
  pieces:()=>S.end?[]:ENDS.map((e,i)=>({k:e.k,t:e.t,r:rows(.55,.095)(i)})),
  spots:()=>[{k:'endslot',n:'the end of the story',r:box(A.W*.08,A.H*.13,A.W*.84,A.H*.38)}],
  paint(){const s=this.spots()[0];card(s.r,S.end?'ok':S.bad==='endslot'?'no':S.over==='endslot'?'hot':'');write(S.end?'🐉🐭🧸🏠':'🐉🐭🧸',s.r.x+s.r.w/2,s.r.y+s.r.h*.36,30);
   write(S.end?'✓ They all go home for tea. The end.':'How does the story finish?',s.r.x+s.r.w/2,s.r.y+s.r.h*.76,14,{max:s.r.w-16});strip([1,1,S.end]);banner(S.end?'The end!':'Find an ending',S.end)},
  drop(pk){const e=ENDS.find(x=>x.k===pk);if(!e.good){S.bad='endslot';return no(slip(e.slip))}S.end=1;yes('“The end.” Now everyone knows the story is finished.')}}};
/* ---------- 5. make up your own ---------- */
const optR=(r,i)=>{const w=(A.W-40)/3;return box(10+i*(w+10),A.H*(.11+r*.15),w,A.H*.13)};
const tellR=()=>box(A.W*.2,A.H*.72,A.W*.6,A.H*.1);
function drawInvent(){floor('#bbf7d0',.4);ROWS.forEach((R,r)=>R.o.forEach(([e,t],i)=>{const q=optR(r,i);card(q,S.mix[r]===i?'hot':'');write(e,q.x+q.w/2,q.y+q.h*.36,18);write((S.mix[r]===i?'✓ ':'')+t,q.x+q.w/2,q.y+q.h*.74,11,{max:q.w-8})}));
 const t=tellR(),ready=S.mix.every(v=>v!=null);card(t,S.bad==='same'?'no':ready?'ok':'');write((S.bad==='same'?'✗ ':'')+'🗣️ Tell my story',t.x+t.w/2,t.y+t.h/2,15,{max:t.w-10});
 write(`Stories made up: ${S.told.length}`,A.W/2,A.H*.85,12,{ink:A.col.tx});if(S.last){const q=box(8,A.H*.885,A.W-16,A.H*.11);card(q,'ok');const p=S.last.split(' '),n=3,per=Math.ceil(p.length/n);for(let j=0;j<n;j++)write(p.slice(j*per,(j+1)*per).join(' '),A.W/2,q.y+q.h*(.22+j*.28),11,{max:q.w-14,wt:700})}
 banner(S.told.length>=2?'Two new stories!':'Make up a story',S.told.length>=2)}
function choose(r,i){S.mix[r]=i;S.bad='';A.sound.tick();say(`${ROWS[r].n}: ${ROWS[r].o[i][1]}.`)}
function tell(){if(S.mix.some(v=>v==null)){A.sound.miss();return say('Choose one card in every row first: who, where, an oh no, and an end.')}
 const key=S.mix.join(''),[who,where,oh,end]=S.mix.map((v,r)=>ROWS[r].o[v][1]);if(S.told.includes(key)){S.bad='same';A.sound.miss();return say(slip('one'))}
 S.told.push(key);S.bad='';const tale=`Once upon a time, ${who} was ${where}. Oh no, ${oh}! Then ${FIX[oh]}. They go ${end==='a big party'?'to a big party':end}. The end.`;
 S.last=tale;A.sound.pop();say(tale+(S.told.length<2?' Now change a card and make another one.':''))}
/* ---------- shared drag and tap engine ---------- */
function yes(m){S.bad='';A.sound.pop();say(m)}
function no(m){A.sound.miss();say(m)}
function draw(){const k=scene();if(k==='quiz'){floor('#fde68a',.35);banner('Challenge',1);write('Start · Voices · Oh no · The end',A.W/2,A.H*.5,15,{ink:A.col.tx,max:A.W-20});return}
 if(k==='invent'){drawInvent();A.fx.draw(A.ctx);return}
 const s=SC[k];floor(s.tint,.4);s.paint();s.pieces().forEach(p=>{const d=S.drag&&S.drag.k===p.k,r=d?box(S.drag.x-p.r.w/2,S.drag.y-p.r.h/2,p.r.w,p.r.h):p.r;card(r,S.pick===p.k||d?'hot':'');words(p.t,r,13)});A.fx.draw(A.ctx)}
function down(p){const k=scene();if(k==='invent'){for(let r=0;r<ROWS.length;r++)for(let i=0;i<3;i++)if(hit(p,optR(r,i)))return choose(r,i),false;if(hit(p,tellR()))tell();return false}
 const s=SC[k];if(!s)return false;const pc=s.pieces().find(q=>hit(p,q.r));if(pc){S.drag={k:pc.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const sp=s.spots().find(q=>hit(p,q.r));if(sp&&S.pick){const pk=S.pick;S.pick=null;s.drop(pk,sp.k)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;const sp=SC[scene()].spots().find(q=>hit(p,q.r));S.over=sp?sp.k:'';A.redraw()}
function up(p){if(!S.drag)return;const d=S.drag,s=SC[scene()];S.drag=null;S.over='';const sp=s.spots().find(q=>hit(p,q.r));
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){S.pick=d.k;const pc=s.pieces().find(q=>q.k===d.k);return say(`${pc.t} picked. Now tap where it goes.`)}
 if(sp)return s.drop(d.k,sp.k);A.redraw()}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{start:0,teddy:0,said:[],ohno:0,fixed:0,end:0,mix:[null,null,null,null],told:[],last:'',bad:'',over:'',pick:null,drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();say(DESC[i]);if(ok)S.check=finish(i,ok)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
/* every canvas action has a labelled button twin */
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='invent'){ROWS.forEach((R,r)=>R.o.forEach(([e,t],i)=>add(`${e} ${t}`,()=>choose(r,i),`${R.n}: ${t}`)));add('🗣️ Tell my story',tell);return}
 const s=SC[k];if(!s)return;if(!S.pick)s.pieces().forEach(q=>add(q.t,()=>{S.pick=q.k;say(`${q.t} picked. Now choose where it goes.`)},`Pick ${q.t}`));
 else s.spots().forEach(q=>add(`Put it on ${q.n}`,()=>{const pk=S.pick;S.pick=null;s.drop(pk,q.k)}))}
const steps=[
{h:'Once upon a time',p:'Play a story with your toys. Drag story words into the talk bubble. Then put Teddy on the play mat.',
 predict:{q:'Which words can start a story?',opts:['The end.','Once upon a time…'],ans:1},task:'Start the story and bring in Teddy',
 show:()=>demo(0,[()=>SC.begin.drop('once','bubble'),()=>SC.begin.drop('teddy','mat')],560),go:()=>enter(0,()=>S.start&&S.teddy)},
{h:'Give toys a voice',p:'In a play story, toys can talk! Drag each line to the toy who would say it.',
 predict:{q:'Mouse is tiny. How does Mouse talk?',opts:['A big ROAR','A tiny squeak'],ans:1},task:'Give all 3 toys a voice',
 show:()=>demo(1,LINES.map(l=>()=>SC.voice.drop(l.k,l.who)),520),go:()=>enter(1,()=>S.said.length>=3)},
{h:'Oh no!',p:'A story needs something to happen. Make it happen, then drag the toy who can fix it to the tree.',
 predict:{q:'Teddy just sits. Is that a story yet?',opts:['Yes, that is a story','No, something must happen'],ans:1},task:'Make something happen, then fix it',
 show:()=>demo(2,[()=>SC.problem.drop('ohno','middle'),()=>SC.problem.drop('dragon','tree')],600),go:()=>enter(2,()=>S.ohno&&S.fixed)},
{h:'The end',p:'Every story stops at an ending. Drag the ending that finishes this story.',task:'Give the story an ending',
 show:()=>demo(3,[()=>SC.ending.drop('home','endslot')],560),go:()=>enter(3,()=>S.end)},
{h:'My own story',p:'Now you make one up! Tap one card in each row, then tell it. Change a card and tell a new one.',
 predict:{q:'Is there only one right story?',opts:['Yes, just one','No, we can make up lots'],ans:1},task:'Make up 2 different stories',
 show:()=>demo(4,[()=>choose(0,1),()=>choose(1,2),()=>choose(2,0),()=>choose(3,1),tell,()=>choose(0,2),tell],420),go:()=>enter(4,()=>S.told.length>=2)},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* the feedback names the slip, so the child knows what to change */
function slip(t){let m='A story has a start, something that happens, and an end.';
 if(t==='order')m='“The end” is how a story stops. We need start words first: “Once upon a time…”';
 if(t==='nostart')m='“Tidy up time” is not story words. Story words tell everyone a story is starting: “Once upon a time…”';
 if(t==='voice')m='Think about the toy. A tiny mouse squeaks; a big dragon roars. Toys can talk in our story.';
 if(t==='nothing')m='Nothing is happening yet! A story needs an oh no, like a hat blowing up a tree.';
 if(t==='soon')m='Not the end yet. Nothing has happened! First make something happen.';
 if(t==='noend')m='And then… and then… never stops! A story needs an ending: “The end.”';
 if(t==='stop')m='Walking off leaves the toys in the middle. Finish the story first: they go home. The end.';
 if(t==='fix')m='Mouse is too tiny to reach up a tall tree. Choose a toy who can fly.';
 if(t==='one')m='That is the same story again. Change one card to make up a new story. There are lots of stories!';
 return m}
function quizNext(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],sh=(qi*2)%3,list=all.slice(sh).concat(all.slice(0,sh));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quizBox.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizNext;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.36,draw,onStep:X=>{quizBox.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Play story lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
