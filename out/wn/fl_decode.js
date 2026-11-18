/* Flagship – decoding unfamiliar words (ages 7–9; NC England Y3–4 word reading: morphology and etymology, Appendix 1
   Y3–4 exception words, ch from Greek and French). Drag a known root onto a long word, find a relative where a silent
   letter is heard, sort ch by origin, match an exception word to how it sounds, split off prefixes and suffixes.
   Not flagsight (tapping a tricky part, flashed sight words) and not flagblend (sounding out letter by letter). */
(()=>{
/* root inside: [word, root, decoys, link] */
const ROOT=[['knowledge','know',['now','ledge'],'knowledge is what you know, so the k is silent like know.'],
['heard','hear',['ear','head'],'heard is the past of hear: hear, heard.'],['weight','weigh',['eight','wig'],'weight is how much a thing weighs.'],
['eighth','eight',['height','the'],'eighth means number eight in a line.'],['disappear','appear',['pear','dish'],'dis + appear: to stop being seen.'],
['breathe','breath',['bath','tree'],'You breathe in a breath.']];
/* silent letter heard in a relative: [word, index of silent letter, right relative, decoys, why] */
const KIN=[['two',1,'twin',['too','tooth'],'two, twin, twice: the w was once said, and you still hear it in twin.'],
['sign',2,'signal',['sing','sight'],'sign, signal: you hear the g in signal.'],['bomb',3,'bombard',['bone','comb'],'bomb, bombard: the second b is said in bombard.'],
['muscle',3,'muscular',['mussel','music'],'muscle, muscular: the c says k in muscular.']];
/* ch by origin: 0 = Greek, ch says k; 1 = French, ch says sh */
const CH=[['chemist',0],['chef',1],['echo',0],['machine',1],['chorus',0],['brochure',1]];
const CHB=['ch says k (Greek)','ch says sh (French)'];
/* sounds like: [word, right respelling, wrong respelling, odd part] */
const SAY=[['island','eye-lund','iss-land','The s is silent.'],['women','wim-in','woe-men','The o says i.'],['busy','biz-ee','buss-ee','The u says i.'],
['heart','hart','heert','ea says ar here.'],['guard','gard','g-ward','The u is silent.'],['answer','an-ser','an-swer','The w is silent.']];
/* split: [word, split index, parts meaning] */
const CUT=[['disappear',3,'dis + appear: not seen any more.'],['bicycle',2,'bi + cycle: two wheels.'],['actually',6,'actual + ly.'],['therefore',5,'there + fore.']];
VIS.reg('flagdecode',c=>{let A,ctl,qbox,qn=-1,gen=0;const S={};
const INK='#111827',OK='#065f46',NO='#b91c1c',EDGE='#6b7280',HOLD='#1d4ed8',RT='#1e3a8a',RF='#dbeafe',GT='#713f12',GF='#fef3c7';
const font=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.2),ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const mode=()=>['root','kin','ch','say','cut','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const good=()=>A.sound.pop(),bad=()=>A.sound.miss();
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eff6ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok,n){const g=A.ctx;let s=sz(n||14);g.font=font(s);let w=g.measureText(t).width+26;while(w>A.W-10&&s>10){s--;g.font=font(s);w=g.measureText(t).width+26}
const h=s+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?OK:EDGE;g.stroke();g.fillStyle=INK;ctr(g);g.fillText(t,x+w/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=(o.ok||o.no||o.held)?4:2;
g.strokeStyle=o.ok?OK:o.no?NO:o.held?HOLD:EDGE;if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||INK;g.font=font(o.px||Math.round(r.h*.46));ctr(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function note(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(sz(n||14),700);ctr(g);g.fillText(t,A.W/2,y,A.W-14)}
const rot=(arr,k)=>arr.slice(k%arr.length).concat(arr.slice(0,k%arr.length));
function three(y){const w=Math.min(sz(120),(A.W-40)/3),h=sz(54),x0=(A.W-(3*w+20))/2;return[0,1,2].map(j=>({x:x0+j*(w+10),y,w,h}))}
function held(base,j,t,o){const d=S.drag,on=d&&d.j===j;tile(on?{...base,x:d.x-base.w/2,y:d.y-base.h/2}:base,t,{...o,held:on})}
/* step 1: drag the known root onto the long word */
const rootOpts=n=>{const q=ROOT[n];return rot([q[1],...q[2]],n)};
function wordBox(){const w=Math.min(A.W-30,sz(300)),h=sz(70);return{x:A.W/2-w/2,y:A.H*.3,w,h}}
function drawRoot(){const s=S.r;bg();if(s.n>=6){banner('All 6 roots found',A.H*.07,1);ROOT.forEach((q,j)=>banner(`${q[0]} ← ${q[1]}`,A.H*(.2+j*.12),1,15));return}
const q=ROOT[s.n];banner(`Word ${s.n+1} of 6: which word you know is inside?`,A.H*.07,0,13);tile(wordBox(),q[0],{bg:RF,ink:RT,no:s.miss,px:sz(30)});
note('Drag the known word onto the long word.',A.H*.58,13);rootOpts(s.n).forEach((t,j)=>held(three(A.H*.7)[j],j,t,{bg:GF,ink:GT,px:sz(20)}))}
function pickRoot(t){const s=S.r;if(s.n>=6)return;const q=ROOT[s.n];
if(t!==q[1]){s.miss=1;bad();return tell(q[0].includes(t)?`${t} is inside ${q[0]}, but it does not help the meaning. Look for a word that links to it.`:`${t} is not inside ${q[0]}. Look again.`)}
s.n++;s.miss=0;good();tell(q[3]+(s.n>=6?' All 6 found.':''))}
/* step 2: a silent letter you can hear in a relative */
const kinOpts=n=>{const q=KIN[n];return rot([q[2],...q[3]],n+1)};
function letterRow(w,y){const n=w.length,u=Math.min(sz(58),(A.W-30-8*(n-1))/n),x0=(A.W-(n*u+8*(n-1)))/2;return[...w].map((ch,i)=>({ch,r:{x:x0+i*(u+8),y,w:u,h:u}}))}
function drawKin(){const s=S.k;bg();if(s.n>=4){banner('All 4 hidden letters heard',A.H*.07,1);KIN.forEach((q,j)=>banner(`${q[0]} → ${q[2]}`,A.H*(.25+j*.16),1,16));return}
const q=KIN[s.n];banner(`Word ${s.n+1} of 4: where can you hear the silent ${q[0][q[1]]}?`,A.H*.07,0,13);
letterRow(q[0],A.H*.22).forEach((o,i)=>tile(o.r,o.ch,{dash:i===q[1],bg:i===q[1]?GF:null,ink:i===q[1]?GT:INK,px:Math.round(o.r.h*.55)}));
const tgt={x:A.W/2-sz(80),y:A.H*.48,w:sz(160),h:sz(46)};tile(tgt,null,{dash:1,no:s.miss});const g=A.ctx;g.fillStyle=INK;g.font=font(sz(12),700);ctr(g);g.fillText('relative goes here',tgt.x+tgt.w/2,tgt.y+tgt.h/2);
kinOpts(s.n).forEach((t,j)=>held(three(A.H*.72)[j],j,t,{bg:RF,ink:RT,px:sz(19)}))}
function kinTgt(){return{x:A.W/2-sz(80),y:A.H*.48,w:sz(160),h:sz(46)}}
function pickKin(t){const s=S.k;if(s.n>=4)return;const q=KIN[s.n];
if(t!==q[2]){s.miss=1;bad();return tell(t==='too'||t==='mussel'?`${t} sounds like ${q[0]} but is a different word. Find one where you hear the ${q[0][q[1]]}.`:`${t} looks a bit like ${q[0]}, but it is not from the same family.`)}
s.n++;s.miss=0;good();tell(q[4]+(s.n>=4?' All 4 heard.':''))}
/* step 3: sort ch by where the word came from */
function chBins(){const w=(A.W-30)/2,h=A.H*.38;return CHB.map((t,j)=>({t,j,x:10+j*(w+10),y:A.H*.54,w,h}))}
function chCard(){const w=Math.min(A.W-40,sz(220)),h=sz(58);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function drawCh(){const s=S.c,g=A.ctx;bg();banner(s.n>=6?'All 6 sorted':`Word ${s.n+1} of 6: how does ch sound?`,A.H*.07,s.n>=6,13);
chBins().forEach(r=>{g.fillStyle=GF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=GT;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=font(sz(14));g.textAlign='center';g.textBaseline='top';g.fillText(r.t,r.x+r.w/2,r.y+8,r.w-8);
g.font=font(sz(15),700);CH.slice(0,s.n).filter(v=>v[1]===r.j).forEach((v,i)=>g.fillText(v[0],r.x+r.w/2,r.y+sz(34)+i*sz(22),r.w-8))});
if(s.n<6){const b=chCard(),d=S.drag;tile(d&&d.card?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,CH[s.n][0],{held:!!(d&&d.card),no:s.miss,bg:RF,ink:RT,px:sz(24)})}}
function sortCh(j){const s=S.c;if(s.n>=6)return;const [w,k]=CH[s.n];
if(j!==k){s.miss=1;bad();return tell(k?`${w} came from French, so ch says sh, like ${w==='chef'?'machine':'chef'}.`:`${w} came from Greek, so ch says k, like ${w==='chemist'?'echo':'chemist'}.`)}
s.n++;s.miss=0;good();tell(`${w}: ch says ${k?'sh':'k'}.`+(s.n>=6?' All 6 sorted.':''))}
/* step 4: which respelling matches how the word is said */
const sayOpts=n=>n%2?[SAY[n][2],SAY[n][1]]:[SAY[n][1],SAY[n][2]];
function sayKeys(){const w=Math.min(sz(150),(A.W-36)/2),h=sz(58);return[{x:A.W/2-w-8,y:A.H*.66,w,h},{x:A.W/2+8,y:A.H*.66,w,h}]}
function drawSay(){const s=S.s;bg();if(s.n>=6){banner('All 6 matched',A.H*.07,1);SAY.forEach((q,j)=>banner(`${q[0]} sounds like ${q[1]}`,A.H*(.19+j*.13),1,15));return}
const q=SAY[s.n];banner(`Word ${s.n+1} of 6: which way is it said?`,A.H*.07,0,13);tile(wordBox(),q[0],{bg:RF,ink:RT,px:sz(32)});
note('Tap or drag the way it sounds.',A.H*.57,13);sayOpts(s.n).forEach((t,j)=>held(sayKeys()[j],j,t,{bg:GF,ink:GT,no:s.miss===t,px:sz(20)}))}
function pickSay(t){const s=S.s;if(s.n>=6)return;const q=SAY[s.n];
if(t!==q[1]){s.miss=t;bad();return tell(`${t} says every letter the usual way. ${q[0]} is an exception word: ${q[3]}`)}
s.n++;s.miss=null;good();tell(`${q[0]} sounds like ${q[1]}. ${q[3]}`+(s.n>=6?' All 6 matched.':''))}
/* step 5: tap the gap that splits off a prefix or suffix */
function cutLay(){const q=CUT[Math.min(S.u.n,3)],n=q[0].length,u=Math.min(sz(40),(A.W-24-6*(n-1))/n),x0=(A.W-(n*u+6*(n-1)))/2,y=A.H*.36;
return{L:[...q[0]].map((ch,i)=>({ch,r:{x:x0+i*(u+6),y,w:u,h:u*1.2}})),G:Array.from({length:n-1},(_,i)=>({i:i+1,r:{x:x0+i*(u+6)+u/2,y:y-10,w:u+6,h:u*1.2+20}}))}}
function drawCut(){const s=S.u,g=A.ctx;bg();if(s.n>=4){banner('All 4 split',A.H*.07,1);CUT.forEach((q,j)=>banner(q[2],A.H*(.25+j*.16),1,16));return}
const q=CUT[s.n],R=cutLay();banner(`Word ${s.n+1} of 4: tap the gap after the first part`,A.H*.07,0,13);note('Find a prefix (like dis) or a whole word you know.',A.H*.22,13);
R.L.forEach((o,i)=>tile(o.r,o.ch,{bg:i<q[1]&&s.done?GF:RF,ink:RT,px:Math.round(o.r.w*.62)}));
if(s.miss!=null){const r=R.G[s.miss-1].r;g.strokeStyle=NO;g.lineWidth=4;g.beginPath();g.moveTo(r.x+r.w/2,r.y);g.lineTo(r.x+r.w/2,r.y+r.h);g.stroke()}
note('Each gap between letters can be tapped.',A.H*.58,12);CUT.slice(0,s.n).forEach((d,j)=>banner(d[0].slice(0,d[1])+' | '+d[0].slice(d[1]),A.H*(.68+j*.09),1,13))}
function tapCut(i){const s=S.u;if(s.n>=4)return;const q=CUT[s.n];
if(i!==q[1]){s.miss=i;bad();const a=q[0].slice(0,i),b=q[0].slice(i);return tell(`${a} | ${b}: neither part is a word part you know. Try another gap.`)}
s.miss=null;s.n++;good();tell(`${q[0].slice(0,i)} | ${q[0].slice(i)}. ${q[2]}`+(s.n>=4?' All 4 split.':''))}
function draw(){const k=mode();if(k==='quiz'){bg();banner('Challenge',A.H*.2,1);banner('know → knowledge · ch → k or sh',A.H*.5,0,17);return}
({root:drawRoot,kin:drawKin,ch:drawCh,say:drawSay,cut:drawCut})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode(),grab=(rs)=>{const j=rs.findIndex(r=>inR(p,r));if(j>=0){S.drag={j,x:p.x,y:p.y};return true}return false};
if(k==='root'&&S.r.n<6)return grab(three(A.H*.7));
if(k==='kin'&&S.k.n<4)return grab(three(A.H*.72));
if(k==='ch'&&S.c.n<6){if(inR(p,chCard())){S.drag={card:1,x:p.x,y:p.y};return true}const b=chBins().find(r=>inR(p,r));if(b)sortCh(b.j);return false}
if(k==='say'&&S.s.n<6)return grab(sayKeys());
if(k==='cut'&&S.u.n<4){const gp=cutLay().G.find(o=>inR(p,o.r));if(gp)tapCut(gp.i)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
const pad=(r,m)=>({x:r.x-m,y:r.y-m,w:r.w+2*m,h:r.h+2*m});
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=mode();
if(k==='root'){if(inR(p,pad(wordBox(),20))||inR(p,three(A.H*.7)[d.j]))pickRoot(rootOpts(S.r.n)[d.j]);else A.redraw();return}
if(k==='kin'){if(inR(p,pad(kinTgt(),24))||inR(p,three(A.H*.72)[d.j]))pickKin(kinOpts(S.k.n)[d.j]);else A.redraw();return}
if(k==='ch'){const b=chBins().find(r=>inR(p,r));if(b)sortCh(b.j);else A.redraw();return}
if(k==='say'){if(inR(p,pad(wordBox(),20))||inR(p,sayKeys()[d.j]))pickSay(sayOpts(S.s.n)[d.j]);else A.redraw()}}
function wipe(){gen++;for(const k in S)delete S[k];Object.assign(S,{r:{n:0},k:{n:0},c:{n:0},s:{n:0},u:{n:0},drag:null,check:()=>{}})}
function tell(t){if(!t)return;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
function open(i,desc,ok,msg){wipe();tell(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='root'&&S.r.n<6)rootOpts(S.r.n).forEach(t=>B(t,()=>pickRoot(t),`${t} is inside ${ROOT[S.r.n][0]}`));
if(k==='kin'&&S.k.n<4)kinOpts(S.k.n).forEach(t=>B(t,()=>pickKin(t),`Hear it in ${t}`));
if(k==='ch'&&S.c.n<6)CHB.forEach((t,j)=>B(t,()=>sortCh(j),`${CH[S.c.n][0]}: ${t}`));
if(k==='say'&&S.s.n<6)sayOpts(S.s.n).forEach(t=>B(t,()=>pickSay(t),`${SAY[S.s.n][0]} sounds like ${t}`));
if(k==='cut'&&S.u.n<4){const w=CUT[S.u.n][0];for(let i=1;i<w.length;i++)B(`${w.slice(0,i)} | ${w.slice(i)}`,()=>tapCut(i),`Split after ${w.slice(0,i)}`)}}
const steps=[
{h:'A word you know inside',p:'A long word often has a word you know inside it. Find it, and the rest gets easier. Drag the known word onto the long word.',
predict:{q:'How do you say the start of knowledge?',opts:['k-now, saying the k','nol, the k is silent like in know'],ans:1},task:'Find all 6 roots',
show:()=>play(0,ROOT.map(q=>()=>pickRoot(q[1])),650),
go:()=>open(0,'The word knowledge. Choices: know, now, ledge.',()=>S.r.n>=6,'Spot the root, then read the rest.')},
{h:'Silent letters have family',p:'Some letters are silent now, but you can hear them in a word from the same family. Drag in that relative.',
predict:{q:'Why is there a w in two?',opts:['It is a spelling mistake','It is said in twin and twice'],ans:1},task:'Find all 4 relatives',
show:()=>play(1,KIN.map(q=>()=>pickKin(q[2])),700),
go:()=>open(1,'The word two. The w is silent. Choices: twin, too, tooth.',()=>S.k.n>=4,'A relative word shows why the silent letter is there.')},
{h:'Where ch came from',p:'In words from Greek, ch says k. In words from French, ch says sh. Drag each word to its box.',
predict:{q:'chef: how does the ch sound?',opts:['k, like chemist','sh, like in French'],ans:1},task:'Sort all 6 words',
show:()=>play(2,CH.map(v=>()=>sortCh(v[1])),600),
go:()=>open(2,'Card: chemist. Boxes: ch says k, or ch says sh.',()=>S.c.n>=6,'Greek ch says k. French ch says sh.')},
{h:'Exception words',p:'Exception words have a part that does not follow the usual rule. Pick how the word really sounds.',task:'Match all 6 words',
show:()=>play(3,SAY.map(q=>()=>pickSay(q[1])),650),
go:()=>open(3,'The word island. Choices: eye-lund or iss-land.',()=>S.s.n>=6,'Learn the odd part, read the rest as normal.')},
{h:'Split it up',p:'Split off a prefix, a suffix or a word you know, then read each part. Tap the gap.',task:'Split all 4 words',
show:()=>play(4,CUT.map(q=>()=>tapCut(q[1])),800),
go:()=>open(4,'The word disappear. Tap a gap between two letters.',()=>S.u.n>=4,'dis | appear, bi | cycle, actual | ly, there | fore.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which known word helps you read knowledge?',a:'know',o:[['now','sound'],['ledge','end']]},
{q:'machine came from French. How does its ch sound?',a:'sh',o:[['k','greek'],['ch, like chip','usual']]},
{q:'Which word helps explain the silent g in sign?',a:'signal',o:[['sing','looks'],['sight','gh']]},
{q:'How is island said?',a:'eye-lund',o:[['iss-land','every'],['is-land','every2']]},
{q:'Where does bicycle split?',a:'bi | cycle',o:[['bic | ycle','nopart'],['bicy | cle','nopart2']]},
{q:'echo came from Greek. How does its ch sound?',a:'k',o:[['sh','french'],['ch, like chip','usual2']]}];
function why(t){let m='Look for a part you know first.';
if(t==='sound')m='now sounds right, but know is the root: knowledge is what you know.';
if(t==='end')m='ledge is inside, but it does not help. know at the start gives the meaning.';
if(t==='greek')m='k is for Greek words like chemist. machine is French, so sh.';
if(t==='usual')m='ch like chip is the usual sound, but French words use sh.';
if(t==='looks')m='sing has the same letters but no link in meaning. signal is in the sign family.';
if(t==='gh')m='sight has a silent gh, not a g you can hear. Say signal: you hear the g.';
if(t==='every')m='That says every letter. island is an exception: the s is silent.';
if(t==='every2')m='is-land says the s. In island the s is silent: eye-lund.';
if(t==='nopart')m='bic is not a word part. bi means two, and cycle means wheel.';
if(t==='nopart2')m='bicy is not a word part. Split after bi: bi | cycle.';
if(t==='french')m='sh is for French words like chef. echo is Greek, so k.';
if(t==='usual2')m='ch like chip is the usual sound, but Greek words use k.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'right'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='right';if(ok)A.win();else bad();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:B=>{qbox.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word reading buttons'},bx);qbox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
