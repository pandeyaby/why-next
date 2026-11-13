/* Flagship – hyphens in prefixed words and compound modifiers (ages 10–11; NC England Y6 Appendix 2 hyphens, Y5–6 spelling):
   re-cover v recover, a hyphen when the prefix vowel meets the same vowel, hyphen placement that changes the picture,
   hyphens before a noun but not after it or after -ly, then find the slip. */
(()=>{
/* [sentence with ▢, joined word, hyphened word, 0 = joined is right / 1 = hyphen is right, meaning] */
const PAIR=[['The old sofa is torn, so we will ▢ it in new cloth.','recover','re-cover',1,'cover it again'],
 ['Gran had a cold, but she will soon ▢.','recover','re-cover',0,'get well again'],
 ['Mr Khan wants to ▢ and leave his job.','resign','re-sign',0,'give up a job'],
 ['You signed in pencil. Please ▢ the card in pen.','resign','re-sign',1,'sign it again'],
 ['Can you ▢ the story of your trip?','recount','re-count',0,'tell what happened'],
 ['The vote was very close, so they will ▢ every vote.','recount','re-count',1,'count it again']];
/* [prefix, root, needs a hyphen?, reason] */
const JOIN=[['re','enter',1,'re ends in e and enter starts with e: re-enter.'],['re','build',0,'b is not a vowel, so just join: rebuild.'],
 ['co','own',1,'co ends in o and own starts with o: co-own.'],['re','arrange',0,'e and a are different vowels, so join: rearrange.'],
 ['re','elect',1,'e meets e, so add a hyphen: re-elect.'],['mis','spell',0,'Two s letters are fine. Just join: misspell.']];
/* [words, meaning wanted, gap index for the hyphen or -1 for none] */
const PIC=[[['a','man','eating','shark'],'a shark that eats people',1],[['a','man','eating','shark'],'a man who is eating a fish called shark',-1],
 [['twenty','odd','people'],'about twenty people',0],[['twenty','odd','people'],'twenty people who are odd',-1],[['extra','large','eggs'],'eggs that are very big',0]];
/* [phrase, needs a hyphen, reason, hyphened form] */
const SPOT=[['a well known author',1,'well known comes before the noun author, so join it: a well-known author.','a well-known author'],
 ['The author is well known.',0,'well known comes after the noun, so no hyphen.',''],
 ['a brightly lit room',0,'brightly is an -ly adverb. No hyphen after an -ly adverb.',''],
 ['a ten year old girl',1,'ten year old is one describing word before girl: a ten-year-old girl.','a ten-year-old girl'],
 ['She is ten years old.',0,'ten years old comes after She, so no hyphens.',''],
 ['a part time job',1,'part time describes job and comes first: a part-time job.','a part-time job']];
/* [words, wrong word index, why] */
const SLIP=[[['Please','reenter','your','code.'],1,'e meets e, so it should be re-enter.'],
 [['We','will','re-build','the','tower.'],2,'No vowels meet, so join it: rebuild.'],
 [['The','hall','had','a','brightly-lit','stage.'],4,'No hyphen after an -ly adverb: brightly lit.'],
 [['The','chair','was','recovered','in','red','silk.'],3,'The chair got a new cover, so it was re-covered.']];
VIS.reg('flaghyph',c=>{let A,X,box,chal,qi=-1,gen=0;const S={};
const INK='#0f172a',CARD='#ffffff',EDGE='#64748b',OK='#047857',BAD='#be123c',PEN='#1d4ed8',ROSE='#fde2e7',SAGE='#dcfce7',SUN='#fef9c3',SKY='#e0f2fe';
const k=n=>Math.round(n*(A.narrow?.9:1.05)),font=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`,hit=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const ORDER=['pair','join','pic','spot','slip','quiz'],at=()=>ORDER[A.step],LIST={pair:PAIR,join:JOIN,pic:PIC,spot:SPOT,slip:SLIP},over=n=>S[n].i>=LIST[n].length;
const alarm=()=>A.col.dark?'#fda4af':BAD;
function paper(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function setF(n,w,al){X.font=font(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function wrapT(t,x,y,w,n){const out=[];let ln='';for(const word of String(t).split(' ')){const tr=ln?ln+' '+word:word;if(ln&&X.measureText(tr).width>w){out.push(ln);ln=word}else ln=tr}out.push(ln);
 const gap=k(n)*1.28;out.forEach((s,i)=>X.fillText(s,x,y+(i-(out.length-1)/2)*gap))}
function tile(r,t,o={}){X.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||EDGE;X.stroke();
 if(t!=null){X.fillStyle=o.fg||INK;setF(o.n||17,o.w||700);wrapT(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function banner(t,won){setF(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=k(14)+14,y=A.H*.02;tile({x:A.W/2-w/2,y,w,h},null,{bg:won?SAGE:CARD,ring:won?OK:null});X.fillStyle=INK;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){X.fillStyle=col||A.col.tx;setF(n||14,650);wrapT(t,A.W/2,y,A.W-28,n||14)}
function finale(t,L){paper();banner(t,1);L.forEach((s,i)=>tile({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* ---- 1: recover or re-cover ---- */
function pairR(){const [,a,b]=PAIR[S.pair.i],w=(A.W-36)/2,h=k(66);return[{v:0,t:a,x:12,y:A.H*.66,w,h},{v:1,t:b,x:24+w,y:A.H*.66,w,h}]}
function drawPair(){const s=S.pair;paper();if(over('pair'))return finale('All 6 sentences done',['recover = get well. re-cover = cover again.','resign = give up a job. re-sign = sign again.','recount = tell. re-count = count again.']);
 banner(`Sentence ${s.i+1} of 6: which word fits?`);tile({x:12,y:A.H*.13,w:A.W-24,h:A.H*.24},PAIR[s.i][0],{n:18,bg:SUN});
 note('Read it with each word. Which meaning makes sense?',A.H*.45,13);if(s.msg)note(s.msg,A.H*.56,13,alarm());
 pairR().forEach(r=>tile(r,r.t,{n:22,w:800,bg:s.bad===r.v?ROSE:SKY,ring:s.bad===r.v?BAD:null}))}
function pair(v){const s=S.pair;if(over('pair'))return;const [t,a,b,ok,mean]=PAIR[s.i],good=ok?b:a,wrong=ok?a:b;let m;
 if(v===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Yes: ${t.replace('▢',good)} ${good} means ${mean}.`)}
 s.bad=v;A.sound.miss();m=`${wrong} means something else here. This one needs ${mean}, so it is ${good}.`;s.msg=m;say(m)}
/* ---- 2: join or hyphen ---- */
function joinR(){const w=(A.W-36)/2,h=k(62);return[{v:0,t:'Just join',x:12,y:A.H*.68,w,h},{v:1,t:'Add a hyphen',x:24+w,y:A.H*.68,w,h}]}
function drawJoin(){const s=S.join;paper();if(over('join'))return finale('All 6 words built',['Same vowel meets same vowel: add a hyphen.','re-enter, co-own, re-elect','rebuild, rearrange, misspell: just join.']);
 const [pre,root]=JOIN[s.i];banner(`Word ${s.i+1} of 6: join or hyphen?`);
 setF(30,800);const wp=X.measureText(pre).width+k(26),wr=X.measureText(root).width+k(26),gw=k(34),tot=wp+gw+wr,x0=A.W/2-tot/2,y=A.H*.17,h=k(64);
 tile({x:x0,y,w:wp,h},pre,{n:30,w:800,bg:'#ede9fe',fg:'#3b0764'});tile({x:x0+wp+gw,y,w:wr,h},root,{n:30,w:800,bg:SKY});
 X.fillStyle=A.col.tx;setF(26,800);X.fillText(s.show!=null?(s.show?'-':'+'):'+',x0+wp+gw/2,y+h/2);
 const e=pre.slice(-1),f=root[0];note(`Last letter of the prefix: ${e}. First letter of the word: ${f}.`,A.H*.42,14);
 if(s.msg)note(s.msg,A.H*.55,13,alarm());joinR().forEach(r=>tile(r,r.t,{n:18,bg:s.bad===r.v?ROSE:r.v?SUN:SAGE,ring:s.bad===r.v?BAD:null}))}
function join(v){const s=S.join;if(over('join'))return;const [pre,root,ok,why]=JOIN[s.i];let m;
 if(v===ok){s.i++;s.msg='';s.bad=null;s.show=null;A.sound.pop();return say(`Right. ${why}`)}
 s.bad=v;A.sound.miss();if(v)m=`No hyphen needed. ${why}`;else m=`Joined it reads ${pre+root}, which is hard to read. ${why}`;s.msg=m;say(m)}
/* ---- 3: where does the hyphen go? ---- */
function picN(){const W=PIC[S.pic.i][0];let n=24;for(;n>15;n--){setF(n,800);if(W.reduce((a,w)=>a+X.measureText(w).width,0)+k(n*1.5)*(W.length-1)<=A.W-28)break}return n}
function picR(){const W=PIC[S.pic.i][0],n=picN();setF(n,800);const sp=k(n*1.5),ws=W.map(w=>X.measureText(w).width),tot=ws.reduce((a,b)=>a+b,0)+sp*(W.length-1);let x=A.W/2-tot/2;const y=A.H*.36,h=k(56),R=[];
 W.forEach((w,j)=>{R.push({w:true,j,t:w,x,y,ww:ws[j]});x+=ws[j];if(j<W.length-1){R.push({gap:j,x:x+2,y,w:sp-4,h});x+=sp}});return R}
function noneR(){const w=Math.min(A.W-24,k(220));return{x:A.W/2-w/2,y:A.H*.72,w,h:k(56)}}
function drawPic(){const s=S.pic;paper();if(over('pic'))return finale('All 5 meanings made',['man-eating shark: the shark eats people.','twenty-odd people: about twenty.','extra-large eggs: very big eggs.']);
 const [,mean]=PIC[s.i];banner(`Phrase ${s.i+1} of 5: make it mean…`);tile({x:12,y:A.H*.12,w:A.W-24,h:A.H*.15},mean,{n:17,bg:SUN});
 picR().forEach(r=>{if(r.gap!=null)tile(r,s.put===r.gap?'-':'',{n:26,w:900,bg:s.put===r.gap?(s.bad?ROSE:SAGE):CARD,ring:s.bad&&s.put===r.gap?BAD:A.col.dark?'#93c5fd':PEN});else{X.fillStyle=A.col.tx;setF(picN(),800);X.fillText(r.t,r.x+r.ww/2,r.y+k(28))}});
 note('Tap a gap to put a hyphen there, or tap No hyphen.',A.H*.56,13);if(s.msg)note(s.msg,A.H*.64,13,alarm());
 tile(noneR(),'No hyphen',{n:18,bg:s.bad&&s.put===-1?ROSE:SKY,ring:s.bad&&s.put===-1?BAD:null})}
function pic(g){const s=S.pic;if(over('pic'))return;const [W,mean,ok]=PIC[s.i];s.put=g;let m;
 if(g===ok){const shown=ok<0?W.join(' '):W.map((w,j)=>w+(j===ok?'-':j<W.length-1?' ':'')).join('');s.i++;s.msg='';s.bad=0;s.put=null;A.sound.pop();return say(`Yes: ${shown} means ${mean}.`)}
 s.bad=1;A.sound.miss();if(ok<0)m=`A hyphen joins ${W[g]} and ${W[g+1]} into one describing word. To mean ${mean}, leave the words apart.`;
 else if(g<0)m=`With no hyphen the words split up, so the meaning changes. Join ${W[ok]} and ${W[ok+1]}.`;
 else m=`That joins the wrong pair. ${W[ok]} and ${W[ok+1]} work together here.`;s.msg=m;say(m)}
/* ---- 4: hyphen or not? ---- */
function spotR(){const w=(A.W-36)/2,h=k(60);return[{v:1,t:'Needs a hyphen',x:12,y:A.H*.7,w,h},{v:0,t:'No hyphen',x:24+w,y:A.H*.7,w,h}]}
function drawSpot(){const s=S.spot;paper();if(over('spot'))return finale('All 6 phrases checked',['Hyphen when it comes before the noun.','No hyphen after the noun.','No hyphen after an -ly adverb.']);
 banner(`Phrase ${s.i+1} of 6: hyphen or not?`);tile({x:12,y:A.H*.14,w:A.W-24,h:A.H*.18},SPOT[s.i][0],{n:21,w:800,bg:SKY});
 note('Ask: do the words come before the noun they describe?',A.H*.42,13);if(s.msg)note(s.msg,A.H*.55,13,alarm());
 spotR().forEach(r=>tile(r,r.t,{n:17,bg:s.bad===r.v?ROSE:r.v?SUN:SAGE,ring:s.bad===r.v?BAD:null}))}
function spot(v){const s=S.spot;if(over('spot'))return;const [t,ok,why,fixd]=SPOT[s.i];let m;
 if(v===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(ok?`Yes: ${fixd}. ${why}`:`Yes, leave it. ${why}`)}
 s.bad=v;A.sound.miss();if(v)m=`Not here. ${why}`;else m=`It does need one. ${why}`;s.msg=m;say(m)}
/* ---- 5: find the slip ---- */
function slipR(){const W=SLIP[S.slip.i][0];setF(20,750);const R=[];let x=0,y=A.H*.22;const h=k(46),rows=[[]];
 W.forEach((t,j)=>{const w=X.measureText(t).width+k(18);if(x+w>A.W-24&&x>0){rows.push([]);x=0;y+=h+k(10)}rows[rows.length-1].push({t,j,x,y,w,h});x+=w+k(8)});
 rows.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>{q.x+=off;R.push(q)})});return R}
function drawSlip(){const s=S.slip;paper();if(over('slip'))return finale('All 4 slips fixed',['re-enter: e meets e.','rebuild: no vowels meet.','brightly lit: no hyphen after -ly adverbs.','re-covered: covered again.']);
 banner(`Sentence ${s.i+1} of 4: tap the word that is wrong`);slipR().forEach(r=>tile(r,r.t,{n:20,w:750,bg:s.bad===r.j?ROSE:CARD,ring:s.bad===r.j?BAD:null}));
 note('Only one word has a hyphen slip.',A.H*.6,13);if(s.msg)note(s.msg,A.H*.72,13,alarm())}
function slip(j){const s=S.slip;if(over('slip'))return;const [W,bad,why]=SLIP[s.i];let m;
 if(j===bad){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Found it. ${why}`)}
 s.bad=j;A.sound.miss();m=/-/.test(W[j])?`That hyphen is fine. Look for another word.`:`${W[j].replace('.','')} is fine. Look for a word with a prefix or a describing pair.`;s.msg=m;say(m)}
/* ---- pointer ---- */
function down(p){const n=at();if(n!=='quiz'&&over(n))return false;
 if(n==='pair'){const r=pairR().find(r=>hit(p,r));if(r)pair(r.v)}
 if(n==='join'){const r=joinR().find(r=>hit(p,r));if(r)join(r.v)}
 if(n==='pic'){const r=picR().find(r=>r.gap!=null&&hit(p,r,6));if(r)pic(r.gap);else if(hit(p,noneR()))pic(-1)}
 if(n==='spot'){const r=spotR().find(r=>hit(p,r));if(r)spot(r.v)}
 if(n==='slip'){const r=slipR().find(r=>hit(p,r,4));if(r)slip(r.j)}return false}
function reset(){gen++;for(const q in S)delete S[q];Object.assign(S,{pair:{i:0},join:{i:0},pic:{i:0},spot:{i:0},slip:{i:0},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();S.check()}
function open(i,first,ok,msg){reset();say(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function pads(){if(!box)return;box.innerHTML='';const n=at(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},box,t).onclick=f};if(n==='quiz'||over(n))return;
 if(n==='pair')pairR().forEach(r=>add(r.t,()=>pair(r.v),`Use ${r.t}`));
 if(n==='join'){const [pre,root]=JOIN[S.join.i];add(pre+root,()=>join(0),`Just join: ${pre+root}`);add(pre+'-'+root,()=>join(1),`Add a hyphen: ${pre}-${root}`)}
 if(n==='pic'){const W=PIC[S.pic.i][0];W.slice(0,-1).forEach((w,j)=>add(`${w}-${W[j+1]}`,()=>pic(j),`Hyphen between ${w} and ${W[j+1]}`));add('No hyphen',()=>pic(-1))}
 if(n==='spot')spotR().forEach(r=>add(r.t,()=>spot(r.v)));
 if(n==='slip')SLIP[S.slip.i][0].forEach((w,j)=>add(w.replace('.',''),()=>slip(j),`${w.replace('.','')} is wrong`))}
const steps=[
{h:'One hyphen, two words',p:'Some words look almost the same. One has a hyphen after the prefix re, one does not. Read each sentence with both and see which makes sense.',
predict:{q:'Do recover and re-cover mean the same thing?',opts:['yes, the hyphen is just style','no, the hyphen changes the meaning'],ans:1},task:'Fill all 6 sentences',
show:()=>play(0,PAIR.map(q=>()=>pair(q[3])),550),go:()=>open(0,'Pick the word that makes the sentence make sense.',()=>over('pair'),'The hyphen tells you which word it is.')},
{h:'When vowels meet',p:'A prefix such as re, co or mis goes on the front of a word. Sometimes it joins straight on, sometimes a hyphen joins it. Watch the two letters that meet.',
predict:{q:'re + arrange: does it need a hyphen?',opts:['yes, two vowels meet','no, e and a are different'],ans:1},task:'Build all 6 words',
show:()=>play(1,JOIN.map(q=>()=>join(q[2])),550),go:()=>open(1,'Look at the two letters that meet. Join, or add a hyphen?',()=>over('join'),'Same vowel twice: hyphen.')},
{h:'Hyphens change the picture',p:'Two words can work as one describing word. A hyphen glues them. Move it, or leave it out, and the meaning changes.',
predict:{q:'"a man eating shark" with no hyphen. Who is eating?',opts:['the shark is eating people','a man is eating shark'],ans:1},task:'Make all 5 meanings',
show:()=>play(2,PIC.map(q=>()=>pic(q[2])),650),go:()=>open(2,'Tap the gap where the hyphen goes, or No hyphen.',()=>over('pic'),'The hyphen shows which words go together.')},
{h:'Before the noun only',p:'A describing pair like well known can sit before its noun or after it. Find out when the hyphen goes in, and when it stays out.',
predict:{q:'"The author is well known." Does it need a hyphen?',opts:['yes, well-known always has one','no, it comes after the noun'],ans:1},task:'Check all 6',
show:()=>play(3,SPOT.map(q=>()=>spot(q[1])),550),go:()=>open(3,'Needs a hyphen, or no hyphen?',()=>over('spot'),'Before the noun: hyphen. After it: none.')},
{h:'Find the slip',p:'Use every rule at once. One word in each sentence has the wrong hyphen choice.',task:'Fix all 4',
show:()=>play(4,SLIP.map(q=>()=>slip(q[1])),650),go:()=>open(4,'Tap the word with the hyphen slip.',()=>over('slip'),'Every slip found.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'The roof leaks, so we will ▢ it with new tiles.',a:'re-cover',o:[['recover','recover means get well. The roof gets covered again.'],['re cover','A prefix is never a word on its own. Join it with a hyphen.']]},
{q:'Which word needs a hyphen?',a:'co-ordinate',o:[['reheat','e meets h, not a vowel. Just join: reheat.'],['rearrange','e and a are different vowels. Just join.']]},
{q:'Which one means a shark that eats people?',a:'a man-eating shark',o:[['a man eating shark','No hyphen: now a man is eating shark.'],['a man eating-shark','The hyphen must join man and eating.']]},
{q:'Which is punctuated right?',a:'The singer is well known.',o:[['The singer is well-known.','After the noun, leave out the hyphen.'],['a well known singer','Before the noun it needs one: a well-known singer.']]},
{q:'Which phrase is right?',a:'a brightly lit hall',o:[['a brightly-lit hall','brightly is an -ly adverb, and those never take a hyphen.'],['a bright-ly lit hall','Never split the -ly ending off.']]},
{q:'Your sister is eleven. She is…',a:'an eleven-year-old girl',o:[['an eleven year old girl','Three words make one describing word, so join them with hyphens.'],['an eleven-year old girl','All three words go together: eleven-year-old.']]}];
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>grade(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const n=at();if(n==='quiz'){paper();banner('Challenge',1);['re-cover: cover again. recover: get well.','re-enter, co-own: same vowel meets','well-known author / author is well known'].forEach((t,i)=>tile({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:17,bg:[SUN,SAGE,SKY][i]}));return}
 ({pair:drawPair,join:drawJoin,pic:drawPic,spot:drawSpot,slip:drawSlip})[n]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;box.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Hyphen buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});pads()}}).start()})})();
