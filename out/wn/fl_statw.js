/* Flagship – spelling the Years 3–4 statutory word list (ages 7–9; NC England English Appendix 1, Y3–4 word list and
   "spell further homophones / words that are often misspelt"). Say it in a spelling voice to catch the letter speech hides,
   find the hidden word, choose single or double letters, find the root word, then proofread a sentence. */
(()=>{
/* spelling voice: [word, index of the letter everyday speech skips, the letter, two decoys, how it is said in a spelling voice] */
const VOICE=[['February',3,'r',['u','e'],'Feb-ru-ar-y'],['library',3,'r',['e','u'],'li-brar-y'],['interest',3,'e',['a','i'],'in-ter-est'],
 ['different',4,'e',['a','i'],'dif-fer-ent'],['surprise',2,'r',['p','e'],'sur-prise'],['business',3,'i',['e','y'],'bus-i-ness']];
/* hidden words: [word, first index, last index, hook] */
const HIDE=[['believe',2,4,'Never believe a lie.'],['separate',3,6,'There is a rat in separate.'],['heart',1,3,'heart has an ear in it.'],
 ['island',2,5,'An island is land with water all round.'],['bicycle',2,6,'A bicycle is a cycle with two wheels.']];
/* one letter or two: [word, gap start, letter, 1 or 2 letters, what to say] */
const DUB=[['address',1,'d',2,'ad-dress'],['imagine',1,'m',1,'i-ma-gine'],['appear',1,'p',2,'ap-pear'],['calendar',2,'l',1,'cal-en-dar'],['opposite',1,'p',2,'op-po-site'],['occasion',1,'c',2,'oc-ca-sion']];
/* root words: [word, choices, right one, how it is built] */
const ROOT=[['favourite',['four','favour','rite'],1,'favour + ite'],['knowledge',['now','know','edge'],1,'know + ledge, so it keeps the silent k'],
 ['disappear',['pear','sap','appear'],2,'dis + appear, so one s and two p'],['heard',['hear','herd','ear'],0,'hear + d'],['actually',['ally','actual','all'],1,'actual + ly, so two l']];
/* proofread: [words, wrong index, right spelling, strategy] */
const FIX=[[['I','beleive','you.'],1,'believe','Hidden word: never believe a lie.'],[['Our','libary','is','shut.'],1,'library','Spelling voice: li-brar-y has two r.'],
 [['It','was','a','big','suprise.'],4,'surprise.','Spelling voice: sur-prise starts with sur.'],[['We','sat','in','seperate','groups.'],3,'separate','Hidden word: there is a rat in separate.'],[['It','will','probly','rain.'],2,'probably','Spelling voice: prob-ab-ly, and the root is probable.']];
VIS.reg('flagstatw',c=>{let A,g,row,qz,turn=-1,era=0;const S={};
const NAVY='#0f172a',PASS='#047857',FAIL='#be123c',TILEB='#ffffff',LINE='#64748b',GOLD='#fef3c7',GOLDT='#78350f',FOUND='#dbeafe',FOUNDT='#1e3a8a',FOCUS='#1d4ed8';
const px=n=>Math.round(n*(A.narrow?.95:1.08)),ft=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
const phase=()=>['voice','hide','dub','root','fix','quiz'][A.step],within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const SETS={voice:VOICE,hide:HIDE,dub:DUB,root:ROOT,fix:FIX},spent=k=>S[k].n>=SETS[k].length;
const err=()=>A.col.dark?'#fda4af':FAIL;
function ground(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function type(n,w,al){g.font=ft(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function tile(r,t,o){o=o||{};g.fillStyle=o.bg||TILEB;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.ring?3.5:1.4;g.strokeStyle=o.ring||LINE;g.stroke();
 if(t!=null){g.fillStyle=o.ink||NAVY;type(o.n||18,o.w||750);flowText(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||18)}}
/* centred text that wraps onto more lines when it is too wide */
function flowText(t,x,y,w,n){const out=[];let cur='';t.split(' ').forEach(q=>{const k=cur?cur+' '+q:q;if(g.measureText(k).width>w&&cur){out.push(cur);cur=q}else cur=k});out.push(cur);
 const lh=px(n)*1.25;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function banner(t,won){type(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=px(14)+14,y=A.H*.02;tile({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':TILEB,ring:won?PASS:null});g.fillStyle=NAVY;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function line(t,y,n,col){g.fillStyle=col||A.col.tx;type(n||15,650);flowText(t,A.W/2,y,A.W-26,n||15)}
function summary(t,L){ground();banner(t,1);L.forEach((s,i)=>tile({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:17,bg:'#ecfdf5'}))}
/* a row of letter boxes for word w, centred at height y; gap = [start, count] leaves a dashed hole */
function letters(w,y,gap){const n=w.length,cw=Math.min(px(38),(A.W-24)/(n+.5)),x0=A.W/2-cw*n/2;return [...w].map((ch,i)=>({ch,i,x:x0+i*cw+2,y,w:cw-4,h:px(50),hole:gap&&i>=gap[0]&&i<gap[0]+gap[1]}))}
function drawLetters(L,o){o=o||{};L.forEach(r=>{if(r.hole){g.strokeStyle=o.bad?FAIL:FOCUS;g.lineWidth=2;g.setLineDash([5,4]);g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([]);return}
 const on=o.mark&&o.mark(r.i);tile(r,r.ch,{n:22,w:800,bg:on?FOUND:TILEB,ink:on?FOUNDT:NAVY,ring:o.pick===r.i?FOCUS:o.wrong&&o.wrong(r.i)?FAIL:null})})}
/* step 1: spelling voice */
function vOpts(){const [, ,ch,dec]=VOICE[S.voice.n],all=[ch,...dec],k=S.voice.n%3,ord=all.slice(k).concat(all.slice(0,k)),w=Math.min(px(70),(A.W-40)/3),h=px(58),tot=3*w+20;
 return ord.map((t,j)=>({t,j,x:A.W/2-tot/2+j*(w+10),y:A.H*.7,w,h}))}
function drawVoice(){const s=S.voice;ground();if(spent('voice'))return summary('All 6 words spelt',['February, library, interest','different, surprise, business','Say it the way it is spelt.']);
 const [w,i]=VOICE[s.n];banner(`Word ${s.n+1} of 6: which letter do we skip when we talk?`);line('Drag the missing letter into the gap.',A.H*.18,15);
 drawLetters(letters(w,A.H*.32,[i,1]),{bad:s.bad!=null});if(s.msg)line(s.msg,A.H*.55,14,err());
 vOpts().forEach(r=>{const d=S.drag&&S.drag.t===r.t;tile(d?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r,r.t,{n:26,w:900,bg:GOLD,ink:GOLDT,ring:d?FOCUS:null})})}
function voice(t){const s=S.voice;if(spent('voice'))return;const [w,,ch,,say]=VOICE[s.n];let m;
 if(t===ch){s.n++;s.bad=null;s.msg='';A.sound.pop();return speak(`${w}. In a spelling voice it is ${say}, so you hear the ${ch} you skip when you talk.`)}
 s.bad=1;A.sound.miss();m=`Not ${t}. Say it slowly in a spelling voice: ${say}. Listen for the sound you usually skip.`;s.msg=m;speak(m)}
/* step 2: hidden words */
function drawHide(){const s=S.hide;ground();if(spent('hide'))return summary('All 5 hidden words found',HIDE.slice(0,4).map(q=>q[3]));
 const [w,a,b]=HIDE[s.n];banner(`Word ${s.n+1} of 5: find the small word hiding inside`);line(s.first==null?'Tap the first letter of the hidden word.':'Now tap its last letter.',A.H*.18,15);
 drawLetters(letters(w,A.H*.34),{pick:s.first,wrong:i=>s.bad&&s.bad.includes(i)});if(s.msg)line(s.msg,A.H*.66,14,err())}
function hide(i){const s=S.hide;if(spent('hide'))return;const [w,a,b,hook]=HIDE[s.n];let m;s.msg='';
 if(s.first==null){s.first=i;s.bad=null;A.sound.tick();return speak(`Starts at ${w[i]}. Now tap the last letter.`)}
 const lo=Math.min(s.first,i),hi=Math.max(s.first,i),got=w.slice(lo,hi+1);s.first=null;
 if(lo===a&&hi===b){s.n++;s.bad=null;A.sound.pop();return speak(`Found it! ${hook}`)}
 s.bad=[...Array(hi-lo+1)].map((_,k)=>lo+k);A.sound.miss();
 m=`${got} is not the helpful word here. Look for a word that helps you remember the hard part of ${w}.`;s.msg=m;speak(m)}
/* step 3: one letter or two */
function dOpts(){const [, ,ch]=DUB[S.dub.n],w=Math.min(px(96),(A.W-40)/2),h=px(58),flip=S.dub.n%2;return [1,2].map((k,j)=>({k,t:ch.repeat(k),x:A.W/2+((j+flip)%2?6:-w-6),y:A.H*.7,w,h}))}
function drawDub(){const s=S.dub;ground();if(spent('dub'))return summary('All 6 words checked',['Two: address, appear, opposite, occasion','One: imagine, calendar','Say it in a spelling voice to check.']);
 const [w,i,,k]=DUB[s.n];banner(`Word ${s.n+1} of 6: one letter or two?`);line('Drag one letter or two into the gap.',A.H*.18,15);
 drawLetters(letters(w,A.H*.32,[i,k]),{bad:s.bad!=null});if(s.msg)line(s.msg,A.H*.55,14,err());
 dOpts().forEach(r=>{const d=S.drag&&S.drag.k===r.k;tile(d?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r,r.t,{n:26,w:900,bg:GOLD,ink:GOLDT,ring:d?FOCUS:null})})}
function dub(k){const s=S.dub;if(spent('dub'))return;const [w,,ch,want,say]=DUB[s.n];let m;
 if(k===want){s.n++;s.bad=null;s.msg='';A.sound.pop();return speak(`${w}: ${want===2?'two':'one'} ${ch}. Say it: ${say}.`)}
 s.bad=1;A.sound.miss();m=want===2?`${w} has two ${ch} letters. You only hear one, so say it in a spelling voice: ${say}.`:`${w} has just one ${ch}. Not every letter in the middle is doubled: ${say}.`;s.msg=m;speak(m)}
/* step 4: the root word */
function rOpts(){const [,ch]=ROOT[S.root.n],h=px(56),gp=px(10);return ch.map((t,j)=>({t,j,x:14,w:A.W-28,h,y:A.H*.27+j*(h+gp)}))}
function drawRoot(){const s=S.root;ground();if(spent('root'))return summary('All 5 roots found',ROOT.slice(0,4).map(q=>`${q[0]} = ${q[3].split(',')[0]}`));
 const [w]=ROOT[s.n];banner(`Word ${s.n+1} of 5: which word is it built from?`);line(w,A.H*.165,26,A.col.tx);
 rOpts().forEach(r=>tile(r,r.t,{n:19,ring:s.bad===r.j?FAIL:null,bg:s.bad===r.j?'#ffe4e6':TILEB}));if(s.msg)line(s.msg,A.H*.91,14,err())}
function root(j){const s=S.root;if(spent('root'))return;const [w,ch,ok,how]=ROOT[s.n];let m;
 if(j===ok){s.n++;s.bad=null;s.msg='';A.sound.pop();return speak(`${w} = ${how}.`)}
 s.bad=j;A.sound.miss();m=w.includes(ch[j])?`${ch[j]} is inside ${w}, but ${w} is not built from it. Which word means nearly the same, plus an ending?`:`${ch[j]} sounds a bit like part of ${w}, but it is not spelt inside it.`;s.msg=m;speak(m)}
/* step 5: proofread */
function fChips(){const [W]=FIX[S.fix.n];type(20,750);const h=px(20)+px(20);let x=12,y=A.H*.3;return W.map((t,i)=>{const w=g.measureText(t).width+px(16);if(x+w>A.W-12&&x>12){x=12;y+=h+8}const r={t,i,x,y,w,h};x+=w+7;return r})}
function drawFix(){const s=S.fix;ground();if(spent('fix'))return summary('All 5 sentences fixed',FIX.slice(0,4).map(q=>q[0].map((t,i)=>i===q[1]?q[2]:t).join(' ')));
 banner(`Sentence ${s.n+1} of 5: tap the word that is spelt wrong`);
 fChips().forEach(r=>{const no=s.bad===r.i;g.fillStyle=no?'#ffe4e6':TILEB;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=no?3:1.3;g.strokeStyle=no?FAIL:LINE;g.stroke();g.fillStyle=NAVY;type(20,750);g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1)});
 if(s.msg)line(s.msg,A.H*.78,14,err())}
function fix(i){const s=S.fix;if(spent('fix'))return;const [W,k,good,how]=FIX[s.n];let m;
 if(i===k){s.n++;s.bad=null;s.msg='';A.sound.pop();return speak(`${W[k].replace('.','')} should be ${good.replace('.','')}. ${how}`)}
 s.bad=i;A.sound.miss();m=`“${W[i]}” is spelt right. Look for a list word: read each word slowly, the way it is spelt.`;s.msg=m;speak(m)}
/* pointer input */
function down(p){const k=phase();
 if(k==='hide'&&!spent('hide')){const r=letters(HIDE[S.hide.n][0],A.H*.34).find(r=>within(p,r));if(r)hide(r.i)}
 if(k==='root'&&!spent('root')){const r=rOpts().find(r=>within(p,r));if(r)root(r.j)}
 if(k==='fix'&&!spent('fix')){const r=fChips().find(r=>within(p,r));if(r)fix(r.i)}
 if(k==='voice'&&!spent('voice')){const r=vOpts().find(r=>within(p,r));if(r){S.drag={t:r.t,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='dub'&&!spent('dub')){const r=dOpts().find(r=>within(p,r));if(r){S.drag={k:r.k,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;if(!d)return;S.drag=null;if(p.y<A.H*.62){if(phase()==='voice')return voice(d.t);if(phase()==='dub')return dub(d.k)}A.redraw()}
function reset(){era++;for(const k in S)delete S[k];Object.assign(S,{voice:{n:0},hide:{n:0},dub:{n:0},root:{n:0},fix:{n:0},drag:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();S.check()}
function enter(i,first,ok,msg){reset();speak(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function replay(i,acts,ms){steps[i].go();const me=era;acts.forEach((f,j)=>setTimeout(()=>{if(me===era)f()},ms*(j+1)))}
function pads(){if(!row)return;row.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='voice'&&!spent('voice'))vOpts().forEach(r=>b(r.t,()=>voice(r.t),`Put ${r.t} in the gap`));
 if(k==='hide'&&!spent('hide'))[...HIDE[S.hide.n][0]].forEach((ch,i)=>b(ch,()=>hide(i),`${S.hide.first==null?'Hidden word starts at':'Hidden word ends at'} letter ${i+1}, ${ch}`));
 if(k==='dub'&&!spent('dub'))dOpts().sort((x,y)=>x.x-y.x).forEach(r=>b(r.t,()=>dub(r.k),r.k===2?`Two ${r.t[0]}s`:`One ${r.t}`));
 if(k==='root'&&!spent('root'))rOpts().forEach(r=>b(r.t,()=>root(r.j),`Built from ${r.t}`));
 if(k==='fix'&&!spent('fix'))FIX[S.fix.n][0].forEach((t,i)=>b(t,()=>fix(i),`${t} is spelt wrong`))}
const steps=[
{h:'Say it as it is spelt',p:'When we talk, we skip some sounds. Then we skip the letters too. Say the word slowly in a spelling voice, one beat at a time, to hear every letter.',
predict:{q:'How many r letters are in February?',opts:['one','two'],ans:1},task:'Spell all 6 words',
show:()=>replay(0,VOICE.map(q=>()=>voice(q[2])),600),go:()=>enter(0,'Drag the missing letter into the gap.',()=>spent('voice'),'A spelling voice finds the letters you skip.')},
{h:'Find the hidden word',p:'Some hard words have a small word inside. The small word can help you remember the hard part. Tap its first letter, then its last letter.',
predict:{q:'People often spell separate as seperate. What hides inside the real word?',opts:['a pear','a rat'],ans:1},task:'Find all 5 hidden words',
show:()=>replay(1,HIDE.flatMap(q=>[()=>hide(q[1]),()=>hide(q[2])]),420),go:()=>enter(1,'Tap the first letter of the hidden word.',()=>spent('hide'),'A word inside a word is a memory hook.')},
{h:'One letter or two?',p:'In some words you hear one sound but write two letters, as in address. Others have just one. Drag one letter or two into the gap.',
predict:{q:'You hear one d in address. How many d letters does it have?',opts:['one','two'],ans:1},task:'Check all 6 words',
show:()=>replay(2,DUB.map(q=>()=>dub(q[3])),600),go:()=>enter(2,'Drag one letter or two into the gap.',()=>spent('dub'),'Double letters are part of the word. Learn them.')},
{h:'Find the root word',p:'Many list words are a shorter word plus an ending. Find the root word and you can spell the start: favourite is favour plus ite.',task:'Find all 5 roots',
show:()=>replay(3,ROOT.map(q=>()=>root(q[2])),600),go:()=>enter(3,'Tap the word it is built from.',()=>spent('root'),'Find the root, then add the ending.')},
{h:'Check your writing',p:'Each sentence has one list word spelt the way it sounds. Find it. Then pick a trick that will help you next time.',task:'Fix all 5 sentences',
show:()=>replay(4,FIX.map(q=>()=>fix(q[1])),650),go:()=>enter(4,'Tap the word that is spelt wrong.',()=>spent('fix'),'Check the list words in everything you write.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which is spelt right?',a:'February',o:[['Febuary','That is how we say it, but the word has two r: Feb-ru-ar-y.'],['Febrary','There is a u after the first r: Feb-ru-ar-y.']]},
{q:'Which is spelt right?',a:'separate',o:[['seperate','Look for the rat: sep-a-rat-e. The middle letter is a.'],['seprate','Say all the beats: sep-a-rate.']]},
{q:'Which word has a double letter?',a:'appear',o:[['imagine','imagine has only one m: i-ma-gine.'],['calendar','calendar has only one l: cal-en-dar.']]},
{q:'Which is spelt right?',a:'believe',o:[['beleive','The hidden word is lie: never believe a lie.'],['belive','You need the e after the i: be-lie-ve.']]},
{q:'Which root word helps you spell knowledge?',a:'know',o:[['now','now sounds the same, but knowledge comes from know, so it starts with a silent k.'],['edge','edge is at the end, but the start comes from know.']]}];
function ask(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,''],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qz.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(m,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const k=phase();if(k==='quiz'){ground();banner('Challenge',1);['Say it in a spelling voice.','Find the hidden word.','One letter or two?','Find the root word.'].forEach((t,i)=>line(t,A.H*(.26+i*.15),18));return}
 ({voice:drawVoice,hide:drawHide,dub:drawDub,root:drawRoot,fix:drawFix})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{qz.hidden=B.step!==5;row.hidden=B.step===5;pads()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}}).start()})})();
