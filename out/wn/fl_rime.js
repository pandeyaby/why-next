/* Flagship – onsets and rimes (ages 4–7): push an onset onto a rime and match the blended word to its picture, build
   the -ug word family from pictures, cut words into onset and rime (one letter, a digraph or a blend before the vowel),
   find the first, middle or last sound in a CVC word, then swap one phoneme to make a new word. Drag or tap; every
   move has a button twin. Vowel tiles are a different colour and carry a dot, so sounds can be told apart. */
(()=>{
const VOW='aeiou',BLEND=[['c','at','🐱','cat',['🐱','🎩','☀️']],['s','un','☀️','sun',['🐷','☀️','🐱']],['p','ig','🐷','pig',['🎩','🐱','🐷']]];
const PICS={'🐱':'cat','🎩':'hat','☀️':'sun','🐷':'pig'},FAM=[['b','🐛','bug'],['m','☕','mug'],['h','🤗','hug']],FAMON=['r','b','m','h'];
const CUT=[['dog',1,'d is the onset. The rime starts at the vowel, o: d + og.'],['ship',2,'s and h make one sound, sh. So the onset is sh: sh + ip.'],['frog',2,'f and r blend together before the vowel. The onset is fr: fr + og.']];
const SPOT=[['cat','middle',1],['dog','last',2],['sun','first',0],['pen','middle',1]],POS=['first','middle','last'];
const SWAP=[['cat','bat',0,'🦇'],['cat','cap',2,'🧢'],['pin','pen',1,'🖊️']],SWL=['b','p','e','o'];
VIS.reg('flagrime',c=>{let A,pad,qbox,qi=-1,ver=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,r:0,joined:0,slide:{k:0},drag:null,bad:-1,badT:'',pick:null,word:'',flash:-1}),S=fresh();
const mode=()=>['blend','fam','cut','spot','swap','quiz'][A.step],fast=()=>A.reduced(),need=()=>({blend:3,fam:3,cut:3,spot:4,swap:3}[mode()]||9);
const fz=n=>Math.round(n*(A.narrow?1:1.15)),tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function pic(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
/* a letter tile: consonants cream, vowels rose with a dot under the letter */
function tileL(g,ch,x,y,w,h,ring){const v=VOW.includes(ch[0]),C=A.col;g.fillStyle=v?(C.dark?'#4c0519':'#ffe4e6'):(C.dark?'#1e293b':'#fffbeb');A.paint.rrect(x,y,w,h,12);g.fill();
 g.strokeStyle=ring||(v?'#e11d48':C.mu);g.lineWidth=ring?5:2.5;A.paint.rrect(x,y,w,h,12);g.stroke();g.font=`800 ${Math.round(h*.52)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';
 g.fillStyle=C.tx;g.fillText(ch,x+w/2,y+h*.45);g.fillStyle=v?'#e11d48':C.mu;g.beginPath();g.arc(x+w/2,y+h*.84,v?5:3,0,7);g.fill()}
const tw=n=>Math.min((A.W-40)/Math.max(n,3),A.narrow?74:90),th=()=>Math.min(A.H*.2,88);
const rowX=(i,n,gap)=>{const w=tw(n),G=gap||8;return(A.W-(n*w+(n-1)*G))/2+i*(w+G)};
function trayBox(i,n){const w=Math.min((A.W-30)/n-10,84),h=Math.min(A.H*.17,78);return{x:(A.W-n*(w+10)+10)/2+i*(w+10),y:A.H*.8,w,h}}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1 onset + rime = word ---- */
function picBox(i){const w=Math.min(A.W*.26,120),h=Math.min(A.H*.2,96);return{x:A.W/2-1.5*w-12+i*(w+12),y:A.H*.62,w,h}}
function drawBlend(g){const[o,ri,,w,ch]=BLEND[S.r%3],W1=tw(4),H1=th(),y=A.H*.2,rx=A.W/2-W1*.1;
 for(let i=0;i<ri.length;i++)tileL(g,ri[i],rx+i*(W1+6),y,W1,H1);const ox0=A.W*.06,ox1=rx-W1-6,k=S.joined?1:S.slide.k;let ox=ox0+(ox1-ox0)*k,oy=y;
 if(S.drag&&S.drag.x!=null){ox=S.drag.x-W1/2;oy=S.drag.y-H1/2}tileL(g,o,ox,oy,W1,H1,S.joined?A.col.gr:A.col.vi);
 txt(g,S.joined?`${o} + ${ri} = ${w}`:'Push the first sound onto -'+ri,A.W/2,A.H*.5,15,S.joined?A.col.tx:A.col.mu);
 if(S.joined)ch.forEach((e,i)=>{const r=picBox(i);g.fillStyle=S.bad===i?A.alpha(A.col.rd,.25):A.alpha(A.col.mu,.12);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=S.bad===i?A.col.rd:A.col.mu;g.lineWidth=S.bad===i?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();pic(g,e,r.x+r.w/2,r.y+r.h/2,r.h*.6)})}
function join(){if(mode()!=='blend'||S.joined||S.slide.k>0||S.won>=need())return;const[o,ri,,w]=BLEND[S.r%3];A.sound.pop();const v=ver;
 A.tween(S.slide,{k:1},fast()?10:600,'out',()=>{if(v!==ver)return;S.joined=1;tell(`${o}, ${ri}: ${w}! Which picture is a ${w}?`);keys();A.redraw()});keys()}
function choosePic(i){if(mode()!=='blend'||!S.joined)return;const[,,e,w,ch]=BLEND[S.r%3];if(ch[i]!==e)return oops(`That is a ${PICS[ch[i]]}. Say it again slowly: ${w}. Which picture is a ${w}?`,i);done1(`Yes! ${w} is the ${w} picture.`)}
/* ---- 2 the -ug family ---- */
function drawFam(g){const[,e,w]=FAM[S.r%3],W1=tw(4),H1=th(),y=A.H*.3;pic(g,e,A.W/2,A.H*.12,Math.min(A.H*.16,64));
 const sx=A.W/2-W1*1.6;g.setLineDash([6,5]);g.strokeStyle=A.col.vi;g.lineWidth=3;A.paint.rrect(sx,y,W1,H1,12);g.stroke();g.setLineDash([]);if(S.word)tileL(g,S.word,sx,y,W1,H1,A.col.gr);
 tileL(g,'u',sx+W1+8,y,W1,H1);tileL(g,'g',sx+2*(W1+8),y,W1,H1);txt(g,`Make the word for the picture: _ug`,A.W/2,A.H*.62,14,A.col.mu,700);trayDraw(g,FAMON)}
function trayDraw(g,list){list.forEach((l,i)=>{let r=trayBox(i,list.length);if(S.drag&&S.drag.l===l&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};tileL(g,l,r.x,r.y,r.w,r.h,S.pick===l?A.col.vi:S.badT===l?A.col.rd:null)})}
function famPut(l){if(mode()!=='fam'||S.won>=need())return;const[on,,w]=FAM[S.r%3];S.pick=null;if(l!==on){S.badT=l;return oops(`${l} + ug says ${l}ug. We need ${w}. Listen to the first sound: ${on}.`)}
 S.word=l;A.sound.tick();A.redraw();const v=ver;setTimeout(()=>{if(v===ver)done1(`${l} + ug = ${w}. Same rime, new onset: a word family!`)},fast()?10:500)}
/* ---- 3 cut into onset and rime ---- */
function drawCut(g){const[w]=CUT[S.r%3],n=w.length,W1=tw(n),H1=th(),y=A.H*.28,G=22;
 for(let i=0;i<n;i++)tileL(g,w[i],rowX(i,n,G),y,W1,H1);for(let i=1;i<n;i++){const x=rowX(i,n,G)-G/2;g.strokeStyle=S.bad===i?A.col.rd:A.col.vi;g.lineWidth=S.bad===i?6:3;g.setLineDash([5,5]);g.beginPath();g.moveTo(x,y-14);g.lineTo(x,y+H1+14);g.stroke();g.setLineDash([]);pic(g,'✂️',x,y-26,20)}
 txt(g,'Tap where the onset ends and the rime begins.',A.W/2,A.H*.68,14,A.col.mu,700)}
function cutAt(i){if(mode()!=='cut'||S.won>=need())return;const[w,k,why]=CUT[S.r%3];if(i!==k){const on=w.slice(0,i),ri=w.slice(i);
 return oops(VOW.includes(on.slice(-1))?`${on} + ${ri} puts the vowel in the onset. The rime starts at the vowel.`:k>1&&i<k?`${why}`:`The rime starts at the vowel. ${why}`,i)}
 done1(`${w.slice(0,k)} + ${w.slice(k)}. ${why}`)}
/* ---- 4 first, middle, last ---- */
function drawSpot(g){const[w,pos]=SPOT[S.r%4],W1=tw(4),H1=th()*1.1,y=A.H*.3;txt(g,`Tap the ${pos} sound in ${w}`,A.W/2,A.H*.13,16);
 for(let i=0;i<3;i++){tileL(g,w[i],rowX(i,3,14),y,W1,H1,S.bad===i?A.col.rd:S.flash===i?A.col.gr:null);txt(g,POS[i],rowX(i,3,14)+W1/2,y+H1+20,12,A.col.mu,700)}}
function spot(i){if(mode()!=='spot'||S.won>=need())return;const[w,pos,k]=SPOT[S.r%4];if(i!==k)return oops(`${w[i]} is the ${POS[i]} sound. The ${pos} sound is ${pos==='middle'?'between the first and the last':pos==='first'?'the one you say first':'the one you say at the end'}.`,i);
 S.flash=i;A.sound.tick();A.redraw();const v=ver;setTimeout(()=>{if(v===ver){S.flash=-1;done1(`Yes: ${w[k]} is the ${pos} sound in ${w}.`)}},fast()?10:450)}
/* ---- 5 swap a sound ---- */
function drawSwap(g){const[w,t,,e]=SWAP[S.r%3],W1=tw(4),H1=th(),y=A.H*.3,cur=S.word||w;txt(g,`Change one sound: ${w} → ?`,A.W/2,A.H*.1,15);pic(g,e,A.W*.88,A.H*.1,Math.min(A.H*.12,46));
 for(let i=0;i<3;i++){tileL(g,cur[i],rowX(i,3,14),y,W1,H1,S.bad===i?A.col.rd:null);txt(g,POS[i],rowX(i,3,14)+W1/2,y+H1+18,12,A.col.mu,700)}
 txt(g,S.pick?`Now tap where ${S.pick} goes.`:'Drag a letter onto a sound.',A.W/2,A.H*.68,14,A.col.mu,700);trayDraw(g,SWL)}
function swapIn(l,i){if(mode()!=='swap'||S.won>=need())return;const[w,t,k]=SWAP[S.r%3],made=w.slice(0,i)+l+w.slice(i+1);S.pick=null;
 if(made===t){S.word=made;A.sound.pop();A.redraw();const v=ver;return setTimeout(()=>{if(v===ver)done1(`${w} → ${t}: you changed the ${POS[k]} sound.`)},fast()?10:500)}
 S.badT=l;oops(i!==k?`That makes ${made}. Say ${w}, then ${t}. The ${POS[k]} sound is the one that changes.`:`That makes ${made}, not ${t}. Right place: which sound does ${t} have there?`,i)}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){const w=tw(4),h=th();tileL(g,'c',W/2-w*1.6,H*.3,w,h);txt(g,'+',W/2-w*.4,H*.3+h/2,26);tileL(g,'a',W/2,H*.3,w,h);tileL(g,'t',W/2+w+6,H*.3,w,h);txt(g,'onset + rime',W/2,H*.7,15);return}
 if(S.won>=need()){txt(g,{blend:'Onset + rime = a word.',fam:'bug, mug, hug: one word family.',cut:'The rime starts at the vowel.',spot:'First, middle, last.',swap:'Change one sound, get a new word.'}[v],W/2,H/2,15);return A.fx.draw(g)}
 ({blend:drawBlend,fam:drawFam,cut:drawCut,spot:drawSpot,swap:drawSwap})[v](g);A.fx.draw(g)}
function oops(t,i){A.sound.miss();S.bad=i==null?-1:i;tell(t);setTimeout(()=>{S.bad=-1;S.badT='';A.redraw()},fast()?10:900);A.redraw()}
function done1(t){S.won++;S.r++;S.joined=0;S.slide={k:0};S.word='';S.pick=null;A.sound.pop();tell(S.won<need()?t+' Next one.':t);keys();A.redraw();S.want()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz'||S.won>=need())return;
 if(v==='blend'){const[o,ri,,,ch]=BLEND[S.r%3];if(!S.joined)B(`Push ${o} onto ${ri}`,join,`Push ${o} onto ${ri} and blend`);else ch.forEach((e,i)=>B(`${e} ${PICS[e]}`,()=>choosePic(i),`Picture: ${PICS[e]}`))}
 if(v==='fam')FAMON.forEach(l=>B(`${l} + ug`,()=>famPut(l),`Put ${l} in front of ug`));
 if(v==='cut'){const[w]=CUT[S.r%3];for(let i=1;i<w.length;i++)B(`${w.slice(0,i)} | ${w.slice(i)}`,()=>cutAt(i),`Cut ${w} into ${w.slice(0,i)} and ${w.slice(i)}`)}
 if(v==='spot'){const[w]=SPOT[S.r%4];POS.forEach((p,i)=>B(`${cap(p)}: ${w[i]}`,()=>spot(i),`The ${p} sound, ${w[i]}`))}
 if(v==='swap'){SWL.forEach(l=>B(`${l}`,()=>{S.pick=l;tell(`Picked ${l}. Now choose first, middle or last.`);keys();A.redraw()},`Pick the letter ${l}`));if(S.pick)POS.forEach((p,i)=>B(`${S.pick} → ${p}`,()=>swapIn(S.pick,i),`Put ${S.pick} in the ${p} place`))}}
const cap=s=>s[0].toUpperCase()+s.slice(1);
function down(p){const v=mode();if(v==='quiz'||S.won>=need())return false;
 if(v==='blend'){if(S.joined){const i=[0,1,2].find(i=>inR(p,picBox(i)));if(i!=null)choosePic(i);return false}if(p.x<A.W*.4&&p.y<A.H*.5){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='cut'){const[w]=CUT[S.r%3],n=w.length;let best=-1,bd=1e9;for(let i=1;i<n;i++){const d=Math.abs(p.x-(rowX(i,n,22)-11));if(d<bd){bd=d;best=i}}if(bd<tw(n)*.5&&p.y<A.H*.62)cutAt(best);return false}
 if(v==='spot'){for(let i=0;i<3;i++){const x=rowX(i,3,14);if(p.x>x&&p.x<x+tw(4)&&p.y>A.H*.25&&p.y<A.H*.62){spot(i);break}}return false}
 const list=v==='fam'?FAMON:SWL,i=list.findIndex((l,i)=>inR(p,trayBox(i,list.length)));if(i>=0){S.drag={l:list[i],x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='swap'&&S.pick){const k=[0,1,2].find(k=>{const x=rowX(k,3,14);return p.x>x&&p.x<x+tw(4)&&p.y>A.H*.25&&p.y<A.H*.6});if(k!=null)swapIn(S.pick,k)}return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag,v=mode();S.drag=null;if(!d)return A.redraw();
 if(v==='blend'){if(d.x==null||p.x>A.W*.3)join();else{tell('Push it all the way onto the rime.');A.redraw()}return}
 if(v==='fam'){if(d.x==null||p.y<A.H*.7)famPut(d.l);else A.redraw();return}
 if(v==='swap'){if(d.x==null){S.pick=d.l;tell(`Picked ${d.l}. Now tap the sound to change.`);keys();return A.redraw()}const k=[0,1,2].find(k=>{const x=rowX(k,3,14);return p.x>x-6&&p.x<x+tw(4)+6&&p.y<A.H*.66});if(k!=null)swapIn(d.l,k);else A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*60+30:(j+1)*(gap||400)))}
const wipe=()=>{ver++;Object.assign(S,fresh())};
const steps=[
{h:'Onset + rime',p:'The onset is the sound or sounds before the vowel. The rime is the vowel and the rest. Push the onset onto the rime, say it, then find the picture.',predict:{q:'Push c onto -at. What word do you hear?',opts:['cat','tac'],ans:0},task:'Blend 3 words',
 show:()=>{steps[0].go();play(BLEND.flatMap(b=>[join,()=>{},()=>choosePic(b[4].indexOf(b[2]))]),420)},go:()=>{wipe();tell('Push c onto at. Say it: c, at.');keys();S.want=ready(0,()=>S.won>=3,'Onset + rime makes the word.')}},
{h:'A word family',p:'Keep the rime -ug. Change the onset to make the word for each picture.',task:'Make 3 -ug words',
 show:()=>{steps[1].go();play(FAM.map(f=>()=>famPut(f[0])),650)},go:()=>{wipe();tell('Make the word for the bug picture: _ug.');keys();S.want=ready(1,()=>S.won>=3,'bug, mug, hug share the rime -ug.')}},
{h:'Cut it in two',p:'Cut each word into onset and rime. The rime always starts at the vowel.',predict:{q:'Cut ship into onset and rime.',opts:['s + hip','sh + ip'],ans:1},task:'Cut 3 words',
 show:()=>{steps[2].go();play(CUT.map(c=>()=>cutAt(c[1])),550)},go:()=>{wipe();tell('Where does dog split? Tap the cut.');keys();S.want=ready(2,()=>S.won>=3,'Onset before the vowel, rime from the vowel on.')}},
{h:'First, middle, last',p:'Say the word slowly. Tap the sound you hear first, in the middle, or last.',predict:{q:'What is the middle sound in cat?',opts:['t','a'],ans:1},task:'Find 4 sounds',
 show:()=>{steps[3].go();play(SPOT.map(s=>()=>spot(s[2])),600)},go:()=>{wipe();tell('Tap the middle sound in cat.');keys();S.want=ready(3,()=>S.won>=4,'Each sound has its place: first, middle, last.')}},
{h:'Change one sound',p:'Swap one sound to make the new word in the picture. Drag a letter onto a sound, or tap a letter and then a place.',task:'Make 3 new words',
 show:()=>{steps[4].go();play(SWAP.map(s=>()=>swapIn(s[1][s[2]],s[2])),650)},go:()=>{wipe();tell('Change one sound in cat to make bat.');keys();S.want=ready(4,()=>S.won>=3,'One new sound makes one new word.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['m + op makes which word?',[['mop','ok'],['pom','back'],['map','vowel']]],
 ['What is the onset in chin?',[['ch','ok'],['c','split'],['chi','toovow']]],
 ['What is the rime in frog?',[['og','ok'],['rog','blend'],['g','tail']]],
 ['What is the last sound in bed?',[['d','ok'],['b','firstpos'],['e','midpos']]],
 ['Change the first sound in hat to c. What word is it?',[['cat','ok'],['hac','wrongend'],['hut','wrongmid']]]];
function hint(t){let m='Say it slowly and listen.';
 if(t==='back')m='The onset comes first. m, then op: mop.';if(t==='vowel')m='The rime -op keeps its vowel o. Only the onset joins on: mop.';
 if(t==='split')m='c and h make one sound, ch. The onset is ch.';if(t==='toovow')m='The vowel i starts the rime, so it is not in the onset.';
 if(t==='blend')m='f and r blend together before the vowel, so fr is the onset. The rime is og.';if(t==='tail')m='The rime is the vowel and everything after it: og.';
 if(t==='firstpos')m='b is the first sound. The last sound is at the end: d.';if(t==='midpos')m='e is the middle sound. Listen at the end: d.';
 if(t==='wrongend')m='You changed the last sound. Change the first one: h to c gives cat.';if(t==='wrongmid')m='That changes the middle sound. Change the first sound: cat.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
let run=0;
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You heard it.':'✗ '+hint(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
