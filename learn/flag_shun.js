/* Flagship – suffixes and endings, Years 3–4 (ages 7–9; NC England 2013 English Appendix 1, Y3–4 spelling: -ly, -ous,
   -ation, /ʃən/ spelt -tion, -ssion, -sion, -cian, /ʒə/ -sure, /tʃə/ -ture, /ʒən/ -sion, /ɪ/ spelt y, /ʌ/ spelt ou).
   Pick the -ly rule for each root, tap the root letter that changes before -ous or -ation, post roots into the right
   /shun/ box by their last letters, drag the ending that matches a spoken sound, and fill the y or ou gap. */
(()=>{
/* root, which -ly rule, the adverb */
const LY=[['sad',0,'sadly'],['happy',1,'happily'],['gentle',2,'gently'],['basic',3,'basically'],['quiet',0,'quietly'],['angry',1,'angrily'],['simple',2,'simply'],['frantic',3,'frantically']];
const LYOP=['+ ly','y → ily','le → ly','ic → ically'];
/* root, ending, letter index that changes (-1 = none), what it becomes, the word, why */
const CHG=[['fame','ous',3,'','famous','drop the e before a vowel ending'],['poison','ous',-1,'','poisonous','nothing changes'],['vary','ous',3,'i','various','y turns to i'],
 ['inform','ation',-1,'','information','nothing changes'],['sense','ation',4,'','sensation','drop the e before a vowel ending'],['humour','ous',4,'','humorous','our turns to or'],['admire','ation',5,'','admiration','drop the e before a vowel ending']];
/* root, box (0 -tion, 1 -ssion, 2 -sion, 3 -cian), the word */
const SHUN=[['invent',0,'invention'],['express',1,'expression'],['extend',2,'extension'],['music',3,'musician'],['act',0,'action'],['discuss',1,'discussion'],
 ['comprehend',2,'comprehension'],['magic',3,'magician'],['hesitate',0,'hesitation'],['permit',1,'permission'],['tense',2,'tension'],['electric',3,'electrician']];
const SHUNB=[['-tion','ends t, te'],['-ssion','ends ss, mit'],['-sion','ends d, se'],['-cian','ends c, cs']],WHY=['ends in t or te','ends in ss or mit','ends in d or se','ends in c or cs'];
/* start, how it sounds, ending (0 -sure, 1 -ture, 2 -sion, 3 -cher) */
const SND=[['mea','mezh-uh',0],['crea','kree-chuh',1],['divi','di-vizh-un',2],['pic','pik-chuh',1],['trea','trezh-uh',0],['tea','tee-chuh',3],['televi','tel-uh-vizh-un',2],['furni','fur-ni-chuh',1],['plea','plezh-uh',0],['deci','di-sizh-un',2]];
const ENDS=['-sure','-ture','-sion','-cher'];
/* before, after, the right spelling, the tempting one, whole word */
const GAPW=[['m','th','y','i','myth'],['y','ng','ou','u','young'],['g','m','y','i','gym'],['t','ch','ou','u','touch'],['d','ble','ou','u','double'],['p','ramid','y','i','pyramid'],['c','ntry','ou','u','country'],['Eg','pt','y','i','Egypt']];
VIS.reg('flagshun',c=>{let A,pad,chal,qn=-1,gen=0;
const S={};
const INK='#111827',OK='#166534',BAD='#b91c1c',EDGE='#6b7280',HOLD='#1d4ed8',CARD='#fffbeb',LYC=['#e0e7ff','#3730a3'],ROOTC=['#fef9c3','#854d0e'],TILEC=['#ccfbf1','#115e59'];
const BOXC=[['#dbeafe','#1e40af'],['#fce7f3','#9d174d'],['#dcfce7','#166534'],['#ffedd5','#9a3412']];
const sz=v=>Math.round(v*(A.narrow?.95:1.12)),face=(v,w)=>`${w||800} ${sz(v)}px system-ui,sans-serif`;
const now=()=>['ly','chg','shun','snd','gap','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#f9fafb';g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok){const g=A.ctx;let n=15;g.font=face(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=face(n)}
 const w=g.measureText(t).width+24,h=sz(n)+15;g.fillStyle=ok?'#dcfce7':'#ffffff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,8);g.fill();g.lineWidth=ok?2.5:1.4;g.strokeStyle=ok?OK:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=o.ring?3.5:1.6;g.strokeStyle=o.ring||EDGE;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||INK;g.font=face(o.n||20,o.w||800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
function note(t,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=face(n||15,600);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-14)}
const carry=(r,j)=>{const h=S.hold;return h&&h.j===j?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};
const rootCard=()=>{const w=Math.min(A.W-50,sz(210));return{x:A.W/2-w/2,y:A.H*.15,w,h:sz(56)}};
/* ---- 1: which -ly rule? ---- */
function lyTiles(){const n=4,gp=6,w=Math.min(sz(118),(A.W-16-gp*3)/2),h=sz(50),y0=A.H*.58;return LYOP.map((t,j)=>({x:A.W/2+(j%2?gp/2:-w-gp/2),y:y0+Math.floor(j/2)*(h+gp),w,h,t,j}))}
function drawLy(){const s=S.ly;ground();if(s.n>=LY.length){banner('All 8 adverbs spelt',A.H*.07,1);LY.forEach((q,i)=>note(`${q[0]} → ${q[2]}`,A.H*(.17+i*.1),16));return}
 banner(`Word ${s.n+1} of 8: add -ly`,A.H*.07);if(s.last)note('Last one: '+s.last,A.H*.15+sz(70),14);tile(rootCard(),LY[s.n][0]+' + ly',{bg:ROOTC[0],fg:ROOTC[1],ring:s.bad!=null?BAD:null,n:26});
 note('Drag the rule onto the word',A.H*.48,13);lyTiles().forEach(r=>tile(carry(r,r.j),r.t,{bg:LYC[0],fg:LYC[1],n:17,ring:S.hold&&S.hold.j===r.j?HOLD:s.bad===r.j?BAD:null}))}
function ly(j){const s=S.ly;if(s.n>=LY.length)return;const [w,k,out]=LY[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say([`${w} ends in a plain letter, so just add ly: ${out}.`,`${w} ends in a consonant and y. Change y to i first: ${out}.`,`${w} ends in le. Swap le for ly: ${out}, not ${w}ly.`,`${w} ends in ic. Add ally: ${out}, not ${w}ly.`][k])}
 s.n++;s.bad=null;s.last=out;A.sound.pop();say(`${w} → ${out}.`+(s.n>=LY.length?' All 8 spelt.':''))}
/* ---- 2: does the root change? ---- */
function letterRow(q){const g=A.ctx,ls=q[0].split(''),w=Math.min(sz(44),(A.W-30-sz(96))/ls.length),h=sz(56),tot=ls.length*(w+4)+sz(96),x0=A.W/2-tot/2,y=A.H*.3;
 return{ls:ls.map((t,i)=>({x:x0+i*(w+4),y,w,h,t,i})),end:{x:x0+ls.length*(w+4)+6,y,w:sz(88),h,t:'+'+q[1]}}}
const keepBtn=()=>{const w=Math.min(A.W-40,sz(240));return{x:A.W/2-w/2,y:A.H*.62,w,h:sz(50)}};
function drawChg(){const s=S.chg;ground();if(s.n>=CHG.length){banner('All 7 words built',A.H*.07,1);CHG.forEach((q,i)=>note(`${q[0]} + ${q[1]} = ${q[4]}`,A.H*(.18+i*.11),16));return}
 const q=CHG[s.n],L=letterRow(q);banner(`Word ${s.n+1} of 7: does a letter change?`,A.H*.07);
 L.ls.forEach(r=>tile(r,r.t,{bg:ROOTC[0],fg:ROOTC[1],n:24,ring:s.bad===r.i?BAD:null}));tile(L.end,L.end.t,{bg:TILEC[0],fg:TILEC[1],n:19});
 note('Tap the letter that changes,',A.H*.5,13);tile(keepBtn(),'or tap: no change',{bg:'#f3f4f6',n:17,ring:s.bad===-1?BAD:null});if(s.last)note(s.last,A.H*.86,15)}
function chg(i){const s=S.chg;if(s.n>=CHG.length)return;const [w,e,k,to,out,why]=CHG[s.n];
 if(i!==k){s.bad=i;A.sound.miss();return say(k<0?`Nothing changes here: ${w} + ${e} = ${out}.`:i<0?`${w} + ${e} is not ${w}${e}. ${why[0].toUpperCase()+why.slice(1)}: ${out}.`:`Not that letter. ${why[0].toUpperCase()+why.slice(1)}: ${out}.`)}
 s.n++;s.bad=null;s.last=`${w} + ${e} = ${out} (${why})`;A.sound.pop();say(s.last+'.'+(s.n>=CHG.length?' All 7 built.':''))}
/* ---- 3: the /shun/ post boxes ---- */
function boxes(){const gp=6,w=(A.W-16-gp*3)/4,y=A.H*.45;return SHUNB.map((t,j)=>({x:8+j*(w+gp),y,w,h:A.H-y-8,j}))}
const shunCard=()=>{const w=Math.min(A.W-60,sz(200));return{x:A.W/2-w/2,y:A.H*.17,w,h:sz(54)}};
function drawShun(){const s=S.shun,g=A.ctx;ground();banner(s.n>=SHUN.length?'All 12 posted':`Root ${s.n+1} of 12: which ending?`,A.H*.07,s.n>=SHUN.length);
 boxes().forEach(b=>{const [bg,fg]=BOXC[b.j];g.fillStyle=bg;A.paint.rrect(b.x,b.y,b.w,b.h,9);g.fill();g.lineWidth=s.bad===b.j?4:2;g.strokeStyle=s.bad===b.j?BAD:fg;g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=face(16,800);g.fillText(SHUNB[b.j][0],b.x+b.w/2,b.y+6,b.w-4);g.font=face(11,600);g.fillText(SHUNB[b.j][1],b.x+b.w/2,b.y+sz(26),b.w-4);
  g.font=face(12,700);SHUN.slice(0,s.n).filter(q=>q[1]===b.j).forEach((q,i)=>g.fillText(q[2],b.x+b.w/2,b.y+sz(46)+i*sz(18),b.w-4))});
 if(s.n<SHUN.length){tile(carry(shunCard(),0),SHUN[s.n][0],{bg:CARD,n:24,ring:S.hold?HOLD:null});if(!S.hold)note('Look at the last letters, then drag',A.H*.17+sz(68),13)}}
function shun(j){const s=S.shun;if(s.n>=SHUN.length)return;const [w,k,out]=SHUN[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say(`${w} ${WHY[k]}, so it takes ${SHUNB[k][0]}: ${out}.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${w} → ${out}.`+(s.n>=SHUN.length?' All 12 posted.':''))}
/* ---- 4: match the sound ---- */
function endTiles(){const gp=6,w=Math.min(sz(84),(A.W-16-gp*3)/4),h=sz(52),tot=4*w+3*gp;return ENDS.map((t,j)=>({x:A.W/2-tot/2+j*(w+gp),y:A.H*.66,w,h,t,j}))}
const gapBox=()=>{const g=A.ctx;g.font=face(28);const q=SND[S.snd.n]||SND[0],wa=g.measureText(q[0]).width,w=sz(92),tot=wa+w+8,x0=A.W/2-tot/2;return{x:x0+wa+8,y:A.H*.28,w,h:sz(56),x0}};
function drawSnd(){const s=S.snd,g=A.ctx;ground();if(s.n>=SND.length){banner('All 10 endings matched',A.H*.07,1);SND.forEach((q,i)=>note(`${q[0]}${ENDS[q[2]].slice(1)}  (${q[1]})`,A.H*(.17+i*.08),15));return}
 const q=SND[s.n],b=gapBox();banner(`Word ${s.n+1} of 10: it sounds like "${q[1]}"`,A.H*.07);g.fillStyle=A.col.tx;g.font=face(28);g.textAlign='left';g.textBaseline='middle';g.fillText(q[0],b.x0,b.y+b.h/2);
 tile(b,'?',{bg:'#ffffff',ring:s.bad!=null?BAD:HOLD,n:24});note('zh sound: -sure or -sion.  ch sound: -ture or -cher.',A.H*.52,13);
 endTiles().forEach(r=>tile(carry(r,r.j),r.t,{bg:TILEC[0],fg:TILEC[1],n:18,ring:S.hold&&S.hold.j===r.j?HOLD:s.bad===r.j?BAD:null}));if(s.last)note(s.last,A.H*.88,15)}
function snd(j){const s=S.snd;if(s.n>=SND.length)return;const [st,say1,k]=SND[s.n],word=st+ENDS[k].slice(1);
 if(j!==k){s.bad=j;A.sound.miss();return say(k===3?`${word}: teach is a root word ending in ch, so just add er.`:k===2?`An ending that sounds like "zhun" is spelt -sion: ${word}.`:k===0?`"zhuh" at the end is spelt -sure: ${word}.`:`"chuh" at the end is usually -ture: ${word}. -cher is only for a root word ending in ch, like teach.`)}
 s.n++;s.bad=null;s.last=word;A.sound.pop();say(`${word}.`+(s.n>=SND.length?' All 10 matched.':''))}
/* ---- 5: y or ou ---- */
function gapParts(){const g=A.ctx,q=GAPW[S.gap.n];g.font=face(32);const a=g.measureText(q[0]).width,b=g.measureText(q[1]).width,w=sz(70),tot=a+w+b+12,x0=A.W/2-tot/2;
 return{x0,a,box:{x:x0+a+6,y:A.H*.26,w,h:sz(60)},bx:x0+a+w+12}}
function gapOpts(){const q=GAPW[S.gap.n],w=Math.min(sz(120),(A.W-30)/2),h=sz(56),two=S.gap.n%2?[q[3],q[2]]:[q[2],q[3]];return two.map((t,j)=>({x:A.W/2+(j?8:-w-8),y:A.H*.62,w,h,t,j}))}
function drawGap(){const s=S.gap,g=A.ctx;ground();if(s.n>=GAPW.length){banner('All 8 words fixed',A.H*.07,1);GAPW.forEach((q,i)=>note(`${q[4]}: ${q[2]} says /${q[2]==='y'?'i':'u'}/`,A.H*(.17+i*.1),16));return}
 const q=GAPW[s.n],P=gapParts();banner(`Word ${s.n+1} of 8: fill the gap`,A.H*.07);g.fillStyle=A.col.tx;g.font=face(32);g.textAlign='left';g.textBaseline='middle';
 g.fillText(q[0],P.x0,P.box.y+P.box.h/2);g.fillText(q[1],P.bx,P.box.y+P.box.h/2);tile(P.box,'?',{ring:s.bad!=null?BAD:HOLD,n:26});note(q[2]==='y'?'The gap says a short i, as in sit.':'The gap says a short u, as in cup.',A.H*.5,14);
 gapOpts().forEach(r=>tile(carry(r,r.j),r.t,{bg:LYC[0],fg:LYC[1],n:26,ring:S.hold&&S.hold.j===r.j?HOLD:s.bad===r.t?BAD:null}))}
function gapFill(v){const s=S.gap;if(s.n>=GAPW.length)return;const [a,b,ok,,word]=GAPW[s.n];
 if(v!==ok){s.bad=v;A.sound.miss();return say(ok==='y'?`${a}${v}${b} is how it sounds, but this word spells the short i with y: ${word}.`:`${a}${v}${b} is how it sounds, but this word spells the short u with ou: ${word}.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${word}.`+(s.n>=GAPW.length?' All 8 fixed.':''))}
function draw(){const k=now();if(k==='quiz'){ground();banner('Challenge',A.H*.25,1);banner('gently · famous · musician · treasure',A.H*.55);return}
 ({ly:drawLy,chg:drawChg,shun:drawShun,snd:drawSnd,gap:drawGap})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now(),take=j=>{S.hold={j,x:p.x,y:p.y};return true};
 if(k==='ly'&&S.ly.n<LY.length){const r=lyTiles().find(r=>hit(p,r));return r?take(r.j):false}
 if(k==='chg'&&S.chg.n<CHG.length){const L=letterRow(CHG[S.chg.n]),r=L.ls.find(r=>hit(p,r));if(r)chg(r.i);else if(hit(p,keepBtn()))chg(-1);return false}
 if(k==='shun'&&S.shun.n<SHUN.length){if(hit(p,shunCard()))return take(0);const b=boxes().find(r=>hit(p,r));if(b)shun(b.j);return false}
 if(k==='snd'&&S.snd.n<SND.length){const r=endTiles().find(r=>hit(p,r));return r?take(r.j):false}
 if(k==='gap'&&S.gap.n<GAPW.length){const r=gapOpts().find(r=>hit(p,r));return r?take(r.j):false}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){const h=S.hold;if(!h)return;S.hold=null;const k=now();
 if(k==='ly'){if(hit(p,rootCard())||hit(p,lyTiles()[h.j]))ly(h.j);else A.redraw();return}
 if(k==='shun'){const b=boxes().find(r=>hit(p,r));if(b)shun(b.j);else A.redraw();return}
 if(k==='snd'){if(p.y<A.H*.5||hit(p,endTiles()[h.j]))snd(h.j);else A.redraw();return}
 if(k==='gap'){const r=gapOpts()[h.j];if(p.y<A.H*.5||hit(p,r))gapFill(r.t);else A.redraw()}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{ly:{n:0},chg:{n:0},shun:{n:0},snd:{n:0},gap:{n:0},hold:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,desc,ok,msg){reset();say(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='ly'&&S.ly.n<LY.length)LYOP.forEach((t,j)=>b(t,()=>ly(j),`${LY[S.ly.n][0]}: ${t}`));
 if(k==='chg'&&S.chg.n<CHG.length){const q=CHG[S.chg.n];q[0].split('').forEach((t,i)=>b(t,()=>chg(i),`Change letter ${i+1}, ${t}, in ${q[0]}`));b('no change',()=>chg(-1),`${q[0]} does not change before ${q[1]}`)}
 if(k==='shun'&&S.shun.n<SHUN.length)SHUNB.forEach((t,j)=>b(t[0],()=>shun(j),`${SHUN[S.shun.n][0]} takes ${t[0]}`));
 if(k==='snd'&&S.snd.n<SND.length)ENDS.forEach((t,j)=>b(t,()=>snd(j),`${SND[S.snd.n][0]} plus ${t}`));
 if(k==='gap'&&S.gap.n<GAPW.length)gapOpts().forEach(r=>b(r.t,()=>gapFill(r.t),`Fill the gap in ${GAPW[S.gap.n][0]}_${GAPW[S.gap.n][1]} with ${r.t}`))}
const steps=[
{h:'Adding -ly',p:'-ly turns a describing word into a how word: sad, sadly. Most words just add ly. Three kinds change first: y after a consonant turns to i, le swaps to ly, and ic adds ally. Drag the right rule onto each word.',
predict:{q:'gentle + ly = ?',opts:['gentlely','gently'],ans:1},task:'Spell all 8 adverbs',
show:()=>play(0,LY.map(q=>()=>ly(q[1])),450),
go:()=>begin(0,'sad plus ly. Drag a rule onto the word.',()=>S.ly.n>=LY.length,'Look at how the root ends before you add -ly.')},
{h:'-ous and -ation',p:'-ous and -ation start with a vowel. So a final e drops (fame, famous) and y after a consonant turns to i (vary, various). our turns to or (humour, humorous). Some roots do not change at all.',task:'Build all 7 words',
show:()=>play(1,CHG.map(q=>()=>chg(q[2])),550),
go:()=>begin(1,'fame plus ous. Tap the letter that changes, or no change.',()=>S.chg.n>=CHG.length,'A vowel ending makes the e drop and the y turn to i.')},
{h:'Four ways to spell "shun"',p:'The end of invention, expression, extension and musician all sound like "shun". The last letters of the root tell you which one: t or te takes -tion, ss or mit takes -ssion, d or se takes -sion, c takes -cian.',
predict:{q:'music + "shun" = ?',opts:['musition','musician'],ans:1},task:'Post all 12 roots',
show:()=>play(2,SHUN.map(q=>()=>shun(q[1])),350),
go:()=>begin(2,'invent. Drag it to -tion, -ssion, -sion or -cian.',()=>S.shun.n>=SHUN.length,'-cian is for people with a skill: music, musician.')},
{h:'Match the sound',p:'A "zhuh" sound at the end is spelt -sure: measure. "zhun" is spelt -sion: division. "chuh" is usually -ture: picture. But if the root word ends in ch, just add er: teach, teacher.',
predict:{q:'teach + er sounds like "tee-chuh". Spell it.',opts:['teature','teacher'],ans:1},task:'Match all 10 endings',
show:()=>play(3,SND.map(q=>()=>snd(q[2])),400),
go:()=>begin(3,'mea, sounds like mezh-uh. Drag an ending into the gap.',()=>S.snd.n>=SND.length,'Say the word, listen to the end, then check for a root word.')},
{h:'y says i, ou says u',p:'In some words a short i sound is spelt y: myth, gym, Egypt. A short u sound can be spelt ou: young, touch, double. These words have to be learnt. Drag the right letters into each gap.',task:'Fix all 8 words',
show:()=>play(4,GAPW.map(q=>()=>gapFill(q[2])),450),
go:()=>begin(4,'m, gap, th. Drag y or i into the gap.',()=>S.gap.n>=GAPW.length,'myth, gym, young and touch look odd, so practise them.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which is spelt right?',a:'basically',o:[['basicly','ic'],['basicaly','ic']]},
{q:'Which is spelt right?',a:'famous',o:[['fameous','dropE'],['famus','ous']]},
{q:'electric + "shun" = ?',a:'electrician',o:[['electrition','cian'],['electrission','cian']]},
{q:'Which word ends in -sure?',a:'treasure',o:[['creasure','ture'],['divisure','sion']]},
{q:'Which is spelt right?',a:'happily',o:[['happyly','yi'],['happly','yi']]},
{q:'express + "shun" = ?',a:'expression',o:[['exprestion','ss'],['expresion','ss']]},
{q:'Which word is spelt right?',a:'young',o:[['yung','ou'],['yong','ou']]}];
function slip(t){let m='Check how the root ends before adding the ending.';
 switch(t){case 'ic':m='Words ending in ic add ally: basic, basically.';break;
 case 'dropE':m='-ous starts with a vowel, so the e of fame drops: famous.';break;
 case 'ous':m='The ending is always spelt -ous, even when it sounds like "us".';break;
 case 'cian':m='electric ends in c, so it takes -cian: electrician.';break;
 case 'ture':m='"chuh" is -ture: creature. "zhuh" is -sure: treasure.';break;
 case 'sion':m='"zhun" is spelt -sion: division.';break;
 case 'yi':m='happy ends in a consonant and y, so y turns to i: happily.';break;
 case 'ss':m='express ends in ss, so it takes -ssion: expression.';break;
 case 'ou':m='young spells its short u sound with ou.';break}
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
