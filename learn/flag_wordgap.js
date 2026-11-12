/* Flagship – spaces between words (ages 4–6; NC England Y1 "separation of words with spaces", Appendix 2; CCSS L.K.2 / RF.K.1c
   "words are separated by spaces in print"). Tap each word to count words (not letters), open finger spaces in squashed
   lines, close gaps that cut a word in two, write with a finger-space card, then check a note with both slips.
   Not flagstop (capitals and end marks) or flagcaps (letter formation). */
(()=>{
const COUNT=[['the','big','red','bus'],['a','cat','can','nap'],['we','like','jam']];
/* letters with no spaces, where the spaces must be (index of the letter after the gap), where they start */
const SQUASH=[{t:'mydogruns',want:[2,5],from:[]},{t:'wecanhop',want:[2,5],from:[]},{t:'thesunishot',want:[3,6,8],from:[]}];
const SPLITW=[{t:'thedogran',want:[3,6],from:[3,4,6]},{t:'wesatonamat',want:[2,5,7,8],from:[2,3,5,7,8]},{t:'abigfish',want:[1,4],from:[1,2,4]}];
const NOTE=[{t:'abigdog',want:[1,4],from:[1,2]},{t:'funinthesun',want:[3,5,8],from:[3,4,8]}];
const WRITE=[['we','can','jump'],['my','cat','is','fat']];
VIS.reg('flagwordgap',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const T={};
const INK='#1f2937',OKC='#047857',NOC='#b91c1c',EDGE='#64748b',HOLD='#1d4ed8',FIN='#fde68a',FINE='#92400e',TILE='#ffffff',LIT='#dbeafe';
const px=n=>Math.round(n*(A.narrow?1:1.25)),font=(n,w)=>`${w||800} ${px(n)}px system-ui,sans-serif`;
const kind=()=>['count','squash','split','write','note','quiz'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fefce8',A.col.dark?.05:.55);g.fillRect(0,0,A.W,A.H)}
function title(t,y,good){const g=A.ctx;let n=15;g.font=font(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=font(n)}
const w=g.measureText(t).width+28,h=px(n)+16,x=(A.W-w)/2;g.fillStyle=TILE;A.paint.rrect(x,y-h/2,w,h,10);g.fill();g.lineWidth=good?3:1.5;g.strokeStyle=good?OKC:EDGE;g.stroke();
g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.edge?4:2;g.strokeStyle=o.edge||EDGE;if(o.dash)g.setLineDash([5,4]);g.stroke();g.setLineDash([]);
if(t==null)return;g.fillStyle=o.ink||INK;g.font=o.f||font(22);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-4)}
/* a fingertip drawn as a rounded pad with a nail, so the space looks like a real finger space */
function finger(cx,cy,w,h){const g=A.ctx;g.fillStyle=FIN;A.paint.rrect(cx-w/2,cy-h/2,w,h,w/2);g.fill();g.strokeStyle=FINE;g.lineWidth=2;g.stroke();
g.fillStyle='#fff7ed';A.paint.rrect(cx-w*.28,cy-h/2+4,w*.56,h*.3,w*.2);g.fill();g.stroke()}
/* step 1: count the words */
function countRects(n){const ws=COUNT[n],g=A.ctx;g.font=font(24);const gap=px(26),wd=ws.map(w=>g.measureText(w).width+px(22)),tot=wd.reduce((a,b)=>a+b,0)+gap*(ws.length-1),k=Math.min(1,(A.W-16)/tot);
let x=(A.W-tot*k)/2;return wd.map(w=>{const r={x,y:A.H*.38,w:w*k,h:px(58)};x+=(w+gap)*k;return r})}
function drawCount(){const s=T.c;bg();if(s.n>=3){title('3 lines counted',A.H*.08,1);COUNT.forEach((ws,j)=>title(`${ws.join(' ')}: ${ws.length} words, ${ws.length-1} spaces`,A.H*(.3+j*.2),1));return}
title(`Line ${s.n+1} of 3: tap each word`,A.H*.08);const R=countRects(s.n),g=A.ctx;
COUNT[s.n].forEach((w,i)=>{tile(R[i],w,{fill:i<s.k?LIT:TILE,edge:i<s.k?HOLD:null});if(i<s.k){g.fillStyle=HOLD;g.beginPath();g.arc(R[i].x+R[i].w/2,R[i].y-px(16),px(13),0,7);g.fill();g.fillStyle='#fff';g.font=font(14);g.textAlign='center';g.textBaseline='middle';g.fillText(String(i+1),R[i].x+R[i].w/2,R[i].y-px(16)+1)}
if(i>0){const m=(R[i-1].x+R[i-1].w+R[i].x)/2;finger(m,R[i].y+R[i].h+px(22),Math.max(12,R[i].x-R[i-1].x-R[i-1].w-4),px(26))}});
g.fillStyle=A.col.tx;g.font=font(15,700);g.textAlign='center';g.fillText(`Words: ${s.k}`,A.W/2,A.H*.82)}
function tapWord(i){const s=T.c;if(s.n>=3)return;const ws=COUNT[s.n];
if(i!==s.k){A.sound.miss();return say(i<s.k?`You counted ${ws[i]} already. Tap the next word.`:`Go in order, left to right. Tap ${ws[s.k]} next.`)}
s.k++;A.sound.pop();if(s.k<ws.length)return say(`${ws[i]}: word ${s.k}.`);
const n=ws.length,L=ws.join('').length;s.n++;s.k=0;say(`${n} words, not ${L}. ${L} is the letters. The spaces split them into ${n} words.`+(s.n>=3?' All 3 lines counted.':''))}
/* steps 2, 3 and 5: letter tiles with gaps you open or close */
function lay(line,sp){const n=line.t.length,ns=sp.length,gap=3,u=Math.min(px(44),(A.W-16-gap*(n-1))/(n+.9*ns));let x=0;const xs=[];
for(let i=0;i<n;i++){if(sp.includes(i))x+=.9*u;xs.push(x);x+=u+gap}const tot=x-gap,x0=(A.W-tot)/2,y=A.H*.4,h=Math.max(u*1.25,px(44));
return{u,h,y,L:xs.map((v,i)=>({x:x0+v,y,w:u,h,ch:line.t[i]})),cut:i=>{const a=xs[i-1]+u,b=xs[i];return x0+(a+b)/2}}}
function drawLetters(line,sp,miss,head,doneTxt){bg();title(head,A.H*.08,!!doneTxt);const R=lay(line,sp);
R.L.forEach(r=>tile(r,r.ch,{f:font(Math.min(24,Math.max(14,R.u*.62/(A.narrow?1:1.25))))}));
sp.forEach(i=>finger(R.cut(i),R.y+R.h+px(20),Math.max(10,R.u*.7),px(24)));
if(miss!=null){const g=A.ctx,x=R.cut(miss);g.strokeStyle=NOC;g.lineWidth=4;g.beginPath();g.moveTo(x,R.y-8);g.lineTo(x,R.y+R.h+8);g.stroke()}
const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(15,700);g.textAlign='center';g.textBaseline='middle';g.fillText(doneTxt||'Tap between letters to add a space. Tap a space to close it.',A.W/2,A.H*.86,A.W-12)}
function words(line,sp){const out=[];let a=0;[...sp].sort((x,y)=>x-y).concat(line.t.length).forEach(b=>{out.push(line.t.slice(a,b));a=b});return out}
function wordAt(line,i){let a=0;for(const w of words(line,line.want)){if(i>a&&i<a+w.length)return[w,i-a];a+=w.length}return['',0]}
function toggle(set,i){const s=T[set],line=s.list[s.n];if(!line||i<1||i>=line.t.length)return;const has=s.sp.includes(i),need=line.want.includes(i);
if(has&&need){s.miss=i;A.sound.miss();const ws=words(line,line.want),k=ws.findIndex((w,j)=>ws.slice(0,j+1).join('').length===i);return say(`${ws[k]} and ${ws[k+1]} are two words. Keep that space.`)}
if(!has&&!need){s.miss=i;A.sound.miss();const [w,k]=wordAt(line,i);return say(`That cuts ${w} into ${w.slice(0,k)} and ${w.slice(k)}. Keep ${w} in one piece.`)}
s.sp=has?s.sp.filter(x=>x!==i):s.sp.concat(i);s.miss=null;A.sound.pop();
const fixed=s.sp.length===line.want.length&&line.want.every(x=>s.sp.includes(x));
if(!fixed)return say(has?'Closed. That gap was inside a word.':`Space added: ${words(line,s.sp).join(' ')}.`);
const said=line.t&&words(line,line.want).join(' ');s.n++;s.sp=s.n<s.list.length?[...s.list[s.n].from]:[];say(`${said}. Now each word stands alone.`+(s.n>=s.list.length?` All ${s.list.length} fixed.`:''))}
function nearestCut(p,line,sp){const R=lay(line,sp);if(p.y<R.y-px(40)||p.y>R.y+R.h+px(50))return-1;let best=-1,bd=1e9;for(let i=1;i<line.t.length;i++){const d=Math.abs(R.cut(i)-p.x);if(d<bd){bd=d;best=i}}return bd<=R.u?best:-1}
function drawSet(set,head,done){const s=T[set];if(s.n>=s.list.length){bg();title(done,A.H*.08,1);s.list.forEach((l,j)=>title(words(l,l.want).join(' '),A.H*(.3+j*.18),1));return}
drawLetters(s.list[s.n],s.sp,s.miss,`${head} ${s.n+1} of ${s.list.length}`)}
/* step 4: write with a finger-space card */
function wCards(){const w=Math.min(px(150),(A.W-36)/2),h=px(62);return[{x:A.W/2-w-8,y:A.H*.7,w,h},{x:A.W/2+8,y:A.H*.7,w,h}]}
function drawWrite(){const s=T.w;bg();if(s.n>=2){title('Both lines written',A.H*.08,1);WRITE.forEach((ws,j)=>title(ws.join(' '),A.H*(.32+j*.2),1));return}
const ws=WRITE[s.n],g=A.ctx;title(`Line ${s.n+1} of 2: write ${ws.join(' ')}`,A.H*.08);
const y=A.H*.42;g.strokeStyle=EDGE;g.lineWidth=2;g.beginPath();g.moveTo(14,y+px(26));g.lineTo(A.W-14,y+px(26));g.stroke();
g.font=font(26);g.textBaseline='alphabetic';g.textAlign='left';let x=20;s.parts.forEach(p=>{if(p==='_'){finger(x+px(14),y+px(8),px(18),px(26));x+=px(30)}else{g.fillStyle=A.col.tx;g.fillText(p,x,y+px(18));x+=g.measureText(p).width+(s.bad?1:2)}});
const C=wCards(),d=T.drag,nxt=ws[s.parts.filter(p=>p!=='_').length];
const put=(r,j)=>d&&d.j===j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;
tile(put(C[0],0),nxt,{fill:LIT,edge:d&&d.j===0?HOLD:(s.miss===0?NOC:null)});
const f=put(C[1],1);tile(f,null,{fill:'#fffbeb',edge:d&&d.j===1?HOLD:(s.miss===1?NOC:null)});finger(f.x+f.w*.25,f.y+f.h/2,px(20),px(30));g.fillStyle=INK;g.font=font(14);g.textAlign='center';g.textBaseline='middle';g.fillText('space',f.x+f.w*.62,f.y+f.h/2)}
function lineBox(){return{x:8,y:A.H*.28,w:A.W-16,h:A.H*.3}}
function addPart(j){const s=T.w;if(s.n>=2)return;const ws=WRITE[s.n],done=s.parts.filter(p=>p!=='_').length,last=s.parts[s.parts.length-1];
if(j===1){if(!s.parts.length||last==='_'){s.miss=1;A.sound.miss();return say(s.parts.length?'There is a space already. One finger space is enough. Now write the next word.':'Start with a word. A space goes after a word.')}
s.parts.push('_');s.miss=null;A.sound.pop();return say('Finger space down. Now the next word.')}
if(last&&last!=='_'){s.miss=0;A.sound.miss();return say(`Oops, ${last}${ws[done]} is squashed. Put a finger space first.`)}
s.parts.push(ws[done]);s.miss=null;A.sound.pop();if(done+1<ws.length)return say(`${ws[done]} written.`);s.n++;s.parts=[];say(`${ws.join(' ')}: ${ws.length} words, ${ws.length-1} finger spaces.`+(s.n>=2?' Both lines written.':''))}
function draw(){const k=kind();if(k==='quiz'){bg();title('Challenge',A.H*.25,1);title('my dog runs: 3 words, 2 spaces',A.H*.55);return}
({count:drawCount,squash:()=>drawSet('q','Line','All 3 opened'),split:()=>drawSet('x','Line','All 3 mended'),write:drawWrite,note:()=>drawSet('o','Note line','Note checked')})[k]();A.fx.draw(A.ctx)}
const setOf={squash:'q',split:'x',note:'o'};
function down(p){const k=kind();
if(k==='count'&&T.c.n<3){const i=countRects(T.c.n).findIndex(r=>inside(p,r));if(i>=0)tapWord(i);return false}
if(setOf[k]){const s=T[setOf[k]];if(s.n<s.list.length){const i=nearestCut(p,s.list[s.n],s.sp);if(i>0)toggle(setOf[k],i)}return false}
if(k==='write'&&T.w.n<2){const j=wCards().findIndex(r=>inside(p,r));if(j>=0){T.drag={j,x:p.x,y:p.y};return true}}return false}
function move(p){if(T.drag){T.drag.x=p.x;T.drag.y=p.y;A.redraw()}}
function up(p){const d=T.drag;if(!d)return;T.drag=null;if(inside(p,lineBox())||inside(p,wCards()[d.j]))addPart(d.j);else A.redraw()}
function reset(){run++;for(const k in T)delete T[k];Object.assign(T,{c:{n:0,k:0},q:{list:SQUASH,n:0,sp:[]},x:{list:SPLITW,n:0,sp:[...SPLITW[0].from]},o:{list:NOTE,n:0,sp:[...NOTE[0].from]},w:{n:0,parts:[]},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();T.check()}
function begin(i,desc,ok,msg){reset();say(desc);T.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function fixSteps(list){const out=[];list.forEach(l=>{l.from.filter(x=>!l.want.includes(x)).forEach(x=>out.push(x));l.want.filter(x=>!l.from.includes(x)).forEach(x=>out.push(x))});return out}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='count'&&T.c.n<3)COUNT[T.c.n].forEach((w,i)=>B(w,()=>tapWord(i),`Count the word ${w}`));
if(setOf[k]){const s=T[setOf[k]],line=s.list[s.n];if(line)for(let i=1;i<line.t.length;i++){const has=s.sp.includes(i);B(`${line.t.slice(Math.max(0,i-3),i)}|${line.t.slice(i,i+3)}`,()=>toggle(setOf[k],i),`${has?'Close':'Add'} a space between ${line.t[i-1]} and ${line.t[i]}, letter ${i}`)}}
if(k==='write'&&T.w.n<2){const ws=WRITE[T.w.n],nx=ws[T.w.parts.filter(p=>p!=='_').length];B(`Write ${nx}`,()=>addPart(0));B('Finger space',()=>addPart(1),'Add a finger space')}}
const steps=[
{h:'Spaces show the words',p:'A space is a gap. It shows where one word stops and the next one starts. Tap each word to count it.',
predict:{q:'the big red bus. How many words?',opts:['12','4'],ans:1},task:'Count all 3 lines',
show:()=>auto(0,COUNT.flatMap(ws=>ws.map((w,i)=>()=>tapWord(i))),330),
go:()=>begin(0,'Line: the big red bus. Four word cards.',()=>T.c.n>=3,'Count the words, not the letters.')},
{h:'Too squashed',p:'With no spaces the words run into each other. Tap between two letters to put a finger space there.',
predict:{q:'mydogruns. Is it easy to read?',opts:['Yes, it is fine','No, the words run together'],ans:1},task:'Open all 3 lines',
show:()=>auto(1,SQUASH.flatMap(l=>l.want.map(i=>()=>toggle('q',i))),480),
go:()=>begin(1,'Letters m y d o g r u n s, all squashed.',()=>T.q.n>=3,'my dog runs, we can hop, the sun is hot.')},
{h:'Not inside a word',p:'A space in the middle of a word breaks it. Tap the wrong gap to close it.',
predict:{q:'Which is right?',opts:['the d og ran','the dog ran'],ans:1},task:'Mend all 3 lines',
show:()=>auto(2,fixSteps(SPLITW).map(i=>()=>toggle('x',i)),700),
go:()=>begin(2,'Line: the d og ran. A gap cuts dog.',()=>T.x.n>=3,'A space goes between words, never inside one.')},
{h:'Write with a finger space',p:'When you write, put a finger down after each word. Drag a word, then a finger space, then the next word.',task:'Write both lines',
show:()=>auto(3,WRITE.flatMap(ws=>ws.flatMap((w,i)=>i?[()=>addPart(1),()=>addPart(0)]:[()=>addPart(0)])),400),
go:()=>begin(3,'Write we can jump. Cards: the next word, and a finger space.',()=>T.w.n>=2,'Word, finger, word: every word gets room.')},
{h:'Check the note',p:'This note has both slips. Add the missing space and close the wrong one.',task:'Fix both lines',
show:()=>auto(4,fixSteps(NOTE).map(i=>()=>toggle('o',i)),900),
go:()=>begin(4,'Note line: a b igdog. One gap is wrong and one is missing.',()=>T.o.n>=2,'Read it back: a big dog, fun in the sun.')},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.check()});
const QS=[
{q:'How many words? we can run',a:'3',o:[['9','letters'],['2','gaps']]},
{q:'Which one has the spaces right?',a:'my hat is red',o:[['myhat is red','squash'],['my h at is red','split']]},
{q:'Where does a space go?',a:'After a word, before the next',o:[['After every letter','every'],['Only at the end','end']]},
{q:'How do you make a space when you write?',a:'Put a finger down after the word',o:[['Write the words smaller','small'],['Start a new line','line']]},
{q:'a big dog has 3 words. How many spaces?',a:'2',o:[['3','same'],['7','letters2']]},
{q:'Which word is broken by a space?',a:'d og',o:[['the','fine'],['ran','fine2']]}];
function why(t){let m='Read it out loud and listen for each word.';
if(t==='letters')m='9 is the letters. Count the words: we, can, run. That is 3.';
if(t==='gaps')m='2 is the spaces. There is one more word than spaces: 3 words.';
if(t==='squash')m='myhat is squashed. my and hat are two words, so they need a space.';
if(t==='split')m='h at cuts hat in two. Keep hat in one piece.';
if(t==='every')m='A space after every letter breaks the words up. Spaces go between words.';
if(t==='end')m='The end of a sentence gets a full stop. Spaces go between the words.';
if(t==='small')m='Small words that touch are still squashed. Leave a finger space.';
if(t==='line')m='A new line is not needed. Just leave a finger space and go on.';
if(t==='same')m='The last word has no space after it. 3 words need 2 spaces.';
if(t==='letters2')m='7 is the letters. Spaces go between the 3 words: 2 spaces.';
if(t==='fine')m='the is a whole word. Look for a word that is cut into bits.';
if(t==='fine2')m='ran is a whole word. d and og are bits of dog.';
return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'right'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='right';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word space buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
