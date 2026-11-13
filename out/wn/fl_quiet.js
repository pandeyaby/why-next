/* Flagship – silent letters (ages 9–10; NC England Y5–6 spelling appendix: words with silent letters, e.g. doubt,
   island, lamb, solemn, thistle, knight). Tap the letter you cannot hear, drag words into kn / wr / gn / mb families,
   find a relative where the letter is said (sign → signal), drag the missing letter into a gap, then fix the slip. */
(()=>{
/* [word, index of the silent letter, what you hear] */
const HEAR=[['knot',0,'not'],['wrap',0,'rap'],['lamb',3,'lam'],['gnat',0,'nat'],['listen',3,'lissen'],['autumn',5,'autum']];
const FAM=['kn','wr','gn','mb'];
/* [word, family index] */
const SORTW=[['knock',0],['wreck',1],['gnome',2],['comb',3],['wrist',1],['climb',3],['knit',0],['sign',2]];
/* [word, silent letter, choices, right choice, why] */
const KIN=[['sign','g',['signal','signing','sighed'],0,'In signal you say the g: sig-nal.'],
 ['muscle','c',['muscles','muscular','mussel'],1,'In muscular you say the c: mus-cu-lar.'],
 ['autumn','n',['autumns','autumnal','column'],1,'In autumnal you say the n: au-tum-nal.'],
 ['bomb','b',['bombard','bombing','balm'],0,'In bombard you say the b: bom-bard.'],
 ['crumb','b',['crumbs','crumble','crust'],1,'In crumble you say the b: crum-ble.'],
 ['hymn','n',['hymns','him','hymnal'],2,'In hymnal you say the n: hym-nal.']];
const LET=['k','w','g','b','n','t'];
/* [word with _, missing letter, whole word, clue] */
const GAP=[['_nife','k','knife','You cut with it.'],['_rong','w','wrong','Not right.'],['thum_','b','thumb','Your short, fat finger.'],
 ['autum_','n','autumn','The season when leaves fall.'],['_nash','g','gnash','Grind your teeth.'],['lis_en','t','listen','Use your ears.']];
/* [words, index of the wrong word, fix] */
const OOPS=[[['I','cut','my','thum','on','the','tin.'],3,'thumb has a silent b after the m.'],
 [['Please','rite','your','name','here.'],1,'write starts with a silent w: wr.'],
 [['The','brave','night','rode','a','horse.'],2,'A soldier on a horse is a knight: silent k and gh.'],
 [['I','have','no','dout','about','it.'],3,'doubt has a silent b, from the Latin dubitare.']];
VIS.reg('flagquiet',c=>{let A,X,keys,chal,qq=-1,ver=0,hold=null;const Q={};
const NAVY='#0f172a',SNOW='#ffffff',SLATE='#64748b',PASS='#047857',FAIL='#be123c',COBALT='#1d4ed8',ROUGE='#fde2e7',LEAF='#dcfce7',CORN='#fef9c3',MIST='#e0f2fe',LAV='#ede9fe',PEACH='#ffedd5';
const u=n=>Math.round(n*(A.narrow?.9:1.05)),ff=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`,over=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const PARTS=['hear','sort','kin','gap','oops','quiz'],part=()=>PARTS[A.step],ALL={hear:HEAR,sort:SORTW,kin:KIN,gap:GAP,oops:OOPS},gone=n=>Q[n].i>=ALL[n].length;
const pink=()=>A.col.dark?'#fda4af':FAIL;
function bg(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function fnt(n,w,al){X.font=ff(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function flow(t,x,y,w,n){const L=[];let cur='';for(const wd of String(t).split(' ')){const tr=cur?cur+' '+wd:wd;if(cur&&X.measureText(tr).width>w){L.push(cur);cur=wd}else cur=tr}L.push(cur);
 const lh=u(n)*1.28;L.forEach((s,i)=>X.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function box(r,t,o={}){X.fillStyle=o.bg||SNOW;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||SLATE;X.stroke();
 if(t!=null){X.fillStyle=o.fg||NAVY;fnt(o.n||17,o.w||700);flow(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function title(t,won){fnt(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=u(14)+14,y=A.H*.02;box({x:A.W/2-w/2,y,w,h},null,{bg:won?LEAF:SNOW,ring:won?PASS:null});X.fillStyle=NAVY;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function tell(t,y,n,col){X.fillStyle=col||A.col.tx;fnt(n||14,650);flow(t,A.W/2,y,A.W-28,n||14)}
function closing(t,L){bg();title(t,1);L.forEach((s,i)=>box({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
function tilesFor(word,y){const n=word.length,g=u(6),w=Math.min(u(56),(A.W-24-g*(n-1))/n),x0=A.W/2-(n*w+g*(n-1))/2;return[...word].map((ch,j)=>({ch,j,x:x0+j*(w+g),y,w,h:u(64)}))}
/* ---- 1: tap the letter you cannot hear ---- */
function drawHear(){const s=Q.hear;bg();if(gone('hear'))return closing('All 6 silent letters found',['knot, gnat: k and g before n','wrap: w before r. lamb: b after m','listen: silent t. autumn: silent n']);
 const [w,,said]=HEAR[s.i];title(`Word ${s.i+1} of 6: which letter is silent?`);tilesFor(w,A.H*.2).forEach(r=>box(r,r.ch,{n:28,w:800,bg:s.bad===r.j?ROUGE:s.ok===r.j?LEAF:MIST,ring:s.bad===r.j?FAIL:null}));
 tell(`Say it: it sounds like "${said}". Tap the letter you do not hear.`,A.H*.46,14);if(s.msg)tell(s.msg,A.H*.6,13,pink())}
function hear(j){const s=Q.hear;if(gone('hear'))return;const [w,ok,said]=HEAR[s.i];let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Yes: the ${w[ok]} in ${w} is silent. You write it, but you say "${said}".`)}
 s.bad=j;A.sound.miss();m=`You can hear the ${w[j]} in "${said}". Find the letter that makes no sound.`;s.msg=m;say(m)}
/* ---- 2: drag the word into its family ---- */
function famR(){const g=u(10),w=(A.W-24-g*3)/4,h=u(70);return FAM.map((t,j)=>({t,j,x:12+j*(w+g),y:A.H*.7,w,h}))}
function cardR(){const w=Math.min(A.W*.55,u(220));return{x:A.W/2-w/2,y:A.H*.2,w,h:u(70)}}
function drawSort(){const s=Q.sort;bg();if(gone('sort'))return closing('All 8 words sorted',['kn: knock, knit. wr: wreck, wrist','gn: gnome, sign','mb: comb, climb']);
 title(`Word ${s.i+1} of 8: drag it to its silent-letter family`);const r=cardR();box(hold?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,SORTW[s.i][0],{n:28,w:800,bg:PEACH,ring:hold?COBALT:null});
 tell('Which two letters hold the silent one?',A.H*.47,14);if(s.msg)tell(s.msg,A.H*.58,13,pink());
 famR().forEach(b=>box(b,b.t,{n:24,w:800,bg:s.bad===b.j?ROUGE:LAV,ring:s.bad===b.j?FAIL:null}))}
function sort(j){const s=Q.sort;if(gone('sort'))return;const [w,ok]=SORTW[s.i],f=FAM[ok];let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Yes: ${w} has ${f}. The ${f==='mb'?'b':f[0]} is silent.`)}
 s.bad=j;A.sound.miss();m=w.includes(FAM[j])?`${w} has ${FAM[j]}, but look again.`:`${w} has no ${FAM[j]}. Look for ${f==='mb'?'m and b together':'the letters before the sound you hear'}.`;s.msg=m;say(m)}
/* ---- 3: find the relative that says the letter ---- */
function kinR(){const ch=KIN[Q.kin.i][2],h=u(54);return ch.map((t,j)=>({t,j,x:12,y:A.H*(.5+j*.16),w:A.W-24,h}))}
function drawKin(){const s=Q.kin;bg();if(gone('kin'))return closing('All 6 word families found',['sign → signal, bomb → bombard','muscle → muscular, crumb → crumble','autumn → autumnal, hymn → hymnal']);
 const [w,l]=KIN[s.i];title(`Word ${s.i+1} of 6: where can you hear the ${l}?`);box({x:A.W/2-u(90),y:A.H*.13,w:u(180),h:u(58)},w,{n:28,w:800,bg:CORN});
 tell(`The ${l} in ${w} is silent. Pick the relative where you say it.`,A.H*.34,13);if(s.msg)tell(s.msg,A.H*.43,12,pink());
 kinR().forEach(r=>box(r,r.t,{n:20,w:750,bg:s.bad===r.j?ROUGE:MIST,ring:s.bad===r.j?FAIL:null}))}
function kin(j){const s=Q.kin;if(gone('kin'))return;const [w,l,ch,ok,why]=KIN[s.i],t=ch[j];let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Yes. ${why} That reminds you to write the ${l} in ${w}.`)}
 s.bad=j;A.sound.miss();if(t.startsWith(w))m=`${t} is the same word with an ending. The ${l} is still silent.`;else m=`${t} sounds a bit like ${w}, but it is not in its family.`;s.msg=m;say(m)}
/* ---- 4: drag the missing letter into the gap ---- */
function letR(){const g=u(8),n=LET.length,w=(A.W-24-g*(n-1))/n,h=u(60);return LET.map((t,j)=>({t,j,x:12+j*(w+g),y:A.H*.72,w,h}))}
function drawGap(){const s=Q.gap;bg();if(gone('gap'))return closing('All 6 words spelt',['knife, wrong, gnash','thumb, autumn','listen']);
 const [pat,,,clue]=GAP[s.i];title(`Word ${s.i+1} of 6: drag in the silent letter`);box({x:12,y:A.H*.12,w:A.W-24,h:u(46)},clue,{n:16,bg:CORN});
 tilesFor(pat,A.H*.28).forEach(r=>box(r,r.ch==='_'?'':r.ch,{n:28,w:800,bg:r.ch==='_'?SNOW:MIST,ring:r.ch==='_'?(A.col.dark?'#93c5fd':COBALT):null}));
 if(s.msg)tell(s.msg,A.H*.56,13,pink());else tell('Drag a letter into the empty box, or tap it.',A.H*.56,13);
 letR().forEach(r=>{const d=hold&&hold.j===r.j;box(d?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,r.t,{n:24,w:800,bg:s.bad===r.t?ROUGE:LAV,ring:s.bad===r.t?FAIL:d?COBALT:null})})}
function gap(t){const s=Q.gap;if(gone('gap'))return;const [pat,ok,whole]=GAP[s.i];let m;
 if(t===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Yes: ${whole}. The ${ok} is silent, but you still write it.`)}
 s.bad=t;A.sound.miss();m=`${pat.replace('_',t)} is not how it is spelt. Think of the silent-letter families: kn, wr, gn, mb, st, mn.`;s.msg=m;say(m)}
function holeR(){const r=tilesFor(GAP[Q.gap.i][0],A.H*.28);return r.find(q=>q.ch==='_')}
/* ---- 5: fix the slip ---- */
function rowR(W){fnt(20,750);const R=[];let x=0,y=A.H*.22;const h=u(46),rows=[[]];
 W.forEach((t,j)=>{const w=X.measureText(t).width+u(18);if(x+w>A.W-24&&x>0){rows.push([]);x=0;y+=h+u(10)}rows[rows.length-1].push({t,j,x,y,w,h});x+=w+u(8)});
 rows.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>{q.x+=off;R.push(q)})});return R}
function drawOops(){const s=Q.oops;bg();if(gone('oops'))return closing('All 4 slips fixed',['thumb: silent b','write: silent w','knight: silent k. doubt: silent b']);
 title(`Sentence ${s.i+1} of 4: tap the word that lost a letter`);rowR(OOPS[s.i][0]).forEach(r=>box(r,r.t,{n:20,w:750,bg:s.bad===r.j?ROUGE:SNOW,ring:s.bad===r.j?FAIL:null}));
 tell('One word is spelt the way it sounds and has lost its silent letter.',A.H*.6,13);if(s.msg)tell(s.msg,A.H*.72,13,pink())}
function oops(j){const s=Q.oops;if(gone('oops'))return;const [W,bad,why]=OOPS[s.i];let m;
 if(j===bad){s.i++;s.msg='';s.bad=null;A.sound.pop();return say(`Found it. ${why}`)}
 s.bad=j;A.sound.miss();m=`${W[j].replace('.','')} is spelt right. Which word looks too short for its sound?`;s.msg=m;say(m)}
/* ---- pointer ---- */
function down(p){const n=part();if(n!=='quiz'&&gone(n))return false;
 if(n==='hear'){const r=tilesFor(HEAR[Q.hear.i][0],A.H*.2).find(r=>over(p,r,3));if(r)hear(r.j)}
 if(n==='sort'){if(over(p,cardR())){hold={j:-1,x:p.x,y:p.y};A.redraw();return true}const b=famR().find(b=>over(p,b));if(b)sort(b.j)}
 if(n==='kin'){const r=kinR().find(r=>over(p,r));if(r)kin(r.j)}
 if(n==='gap'){const r=letR().find(r=>over(p,r));if(r){hold={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(n==='oops'){const r=rowR(OOPS[Q.oops.i][0]).find(r=>over(p,r,4));if(r)oops(r.j)}return false}
function move(p){if(!hold)return;hold.x=p.x;hold.y=p.y;A.redraw()}
function up(p){if(!hold)return;const h=hold;hold=null;const n=part();
 if(n==='sort'){const b=famR().find(b=>over(p,b,8));if(b)sort(b.j);else A.redraw()}
 if(n==='gap'){const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<8;if(tap||over(p,holeR(),20))gap(LET[h.j]);else A.redraw()}}
function reset(){ver++;hold=null;for(const q in Q)delete Q[q];Object.assign(Q,{hear:{i:0},sort:{i:0},kin:{i:0},gap:{i:0},oops:{i:0},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();Q.check()}
function arm(i,first,ok,msg){reset();say(first);Q.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function pads(){if(!keys)return;keys.innerHTML='';const n=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};if(n==='quiz'||gone(n))return;
 if(n==='hear'){const w=HEAR[Q.hear.i][0];[...w].forEach((ch,j)=>add(ch,()=>hear(j),`Letter ${j+1}, ${ch}, is silent`))}
 if(n==='sort'){const w=SORTW[Q.sort.i][0];FAM.forEach((f,j)=>add(f,()=>sort(j),`Put ${w} in the ${f} family`))}
 if(n==='kin')KIN[Q.kin.i][2].forEach((t,j)=>add(t,()=>kin(j)));
 if(n==='gap')LET.forEach(t=>add(t,()=>gap(t),`Put ${t} in the gap`));
 if(n==='oops')OOPS[Q.oops.i][0].forEach((w,j)=>add(w.replace('.',''),()=>oops(j),`${w.replace('.','')} is wrong`))}
const steps=[
{h:'Letters you cannot hear',p:'A silent letter is written but not said. Say each word out loud, then tap the letter that makes no sound.',
predict:{q:'In knot, can you hear the k?',opts:['yes, a soft k sound','no, it sounds like not'],ans:1},task:'Find all 6',
show:()=>demo(0,HEAR.map(q=>()=>hear(q[1])),550),go:()=>arm(0,'Say the word. Tap the letter you do not hear.',()=>gone('hear'),'Silent letters are written, not said.')},
{h:'Silent-letter families',p:'Silent letters often sit in the same pairs: k or g before n, w before r, and b after m. Drag each word to its family, or tap a button.',
predict:{q:'climb: which letter is silent?',opts:['the m','the b'],ans:1},task:'Sort all 8',
show:()=>demo(1,SORTW.map(q=>()=>sort(q[1])),500),go:()=>arm(1,'Drag the word to the family that holds its silent letter.',()=>gone('sort'),'kn, wr, gn and mb hide a silent letter.')},
{h:'Hear it in a relative',p:'Long ago many of these letters were said. In some related words you can still hear them. Find the relative that says the letter.',
predict:{q:'sign has a silent g. Is there a related word where you say the g?',opts:['no, that g is always silent','yes, there is one'],ans:1},task:'Find all 6',
show:()=>demo(2,KIN.map(q=>()=>kin(q[3])),600),go:()=>arm(2,'Pick the related word where you can hear the silent letter.',()=>gone('kin'),'A relative can remind you of the letter.')},
{h:'Put the letter back',p:'Now spell it. Each word has lost its silent letter. Drag the right letter into the gap.',task:'Spell all 6',
show:()=>demo(3,GAP.map(q=>()=>gap(q[1])),550),go:()=>arm(3,'Drag the silent letter into the gap.',()=>gone('gap'),'Every word spelt.')},
{h:'Find the slip',p:'Use what you know. One word in each sentence is spelt the way it sounds, and that is wrong.',task:'Fix all 4',
show:()=>demo(4,OOPS.map(q=>()=>oops(q[1])),650),go:()=>arm(4,'Tap the word that lost its silent letter.',()=>gone('oops'),'Every slip found.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Q.check()});
const QS=[
{q:'Which spelling is right?',a:'knee',o:[['nee','The word starts with a silent k: kn, as in knot.'],['kne','You need the silent k and two e letters: knee.']]},
{q:'Which word has a silent b?',a:'thumb',o:[['bump','You hear both b sounds in bump.'],['robin','You hear the b in robin.']]},
{q:'Which word helps you remember the g in sign?',a:'signal',o:[['signing','signing is sign with an ending, and the g is still silent.'],['sighed','sighed is a different word, not in the sign family.']]},
{q:'The b in doubt was added by…',a:'writers who linked it to Latin dubitare',o:[['people who always said it','Nobody said a b in doubt. It was added to show the Latin.'],['a printing mistake','It was added on purpose, to match the Latin.']]},
{q:'Which word is spelt right?',a:'wrist',o:[['rist','wrist starts with wr: the w is silent.'],['whrist','wrist has wr, not whr.']]},
{q:'Which family does gnome belong to?',a:'gn',o:[['kn','gnome starts with g, not k.'],['mb','The silent letter is at the start, before n.']]}];
function ask(){qq++;const T=QS[qq%QS.length],all=[[T.a,''],...T.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${T.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>judge(why,T.a)});c.say('Challenge: '+T.q);A.redraw()}
function judge(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const n=part();if(n==='quiz'){bg();title('Challenge',1);['kn, wr, gn, mb: a letter hides','sign → signal: hear it in a relative','write the letter you cannot hear'].forEach((t,i)=>box({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:17,bg:[CORN,LEAF,MIST][i]}));return}
 ({hear:drawHear,sort:drawSort,kin:drawKin,gap:drawGap,oops:drawOops})[n]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;keys.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Silent letter buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}}).start()})})();
