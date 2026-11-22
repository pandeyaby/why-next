/* Flagship – writing labels and captions (ages 4–5; Development Matters 2021, Reception Writing). Put labels by
   their things, build a label sound by sound, sort labels from captions, build a caption with a capital and a full
   stop, check a robot's labels. Data and pictures: learn/label_art.js. */
(()=>{const {NAME,PLACE,BUILD,SORT,CAP,CAPTILES,ROBOT,DESC,DONE,TXT,QS}=LABEL;
VIS.reg('flaglabel',c=>{let A,pad,box,pics,qi=-1,tok=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',GOOD='#047857',BAD='#b91c1c',RIM='#64748b',PEN='#1d4ed8',F='px system-ui,sans-serif';
const now=()=>['place','build','sort','cap','robot','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.15);
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const near=(p,q,d)=>Math.hypot(p.x-q.x,p.y-q.y)<=d;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fefce8',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function note(t,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${F}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${F}`;w=g.measureText(t).width+24}
 const h=n+16;g.fillStyle='#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,11);g.fill();g.lineWidth=o.ok||o.no?3:1.4;g.strokeStyle=o.ok?GOOD:o.no?BAD:RIM;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.used?'#e2e8f0':o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.no||o.ok||o.sel?3.5:1.6;g.strokeStyle=o.no?BAD:o.ok?GOOD:o.sel?PEN:RIM;g.stroke();let n=big(o.n||19);g.font=`${o.w||800} ${n}${F}`;
 while(g.measureText(t).width>r.w-10&&n>9){n--;g.font=`${o.w||800} ${n}${F}`}g.fillStyle=o.used?'#475569':INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
/* a label card sitting under a thing, with a line up to it */
function stuck(t,x,y,u,col){const g=A.ctx;g.font=`800 ${big(17)}${F}`;const w=Math.max(54,g.measureText(t).width+20),h=big(30),ly=y+u*.95;
 g.strokeStyle=col||INK;g.lineWidth=2.5;g.beginPath();g.moveTo(x,ly);g.lineTo(x,y+u*.6);g.stroke();card({x:x-w/2,y:ly,w,h},t,{n:17,ok:col===GOOD,no:col===BAD})}
/* ---------- 1. put each label by its thing ---------- */
const spot=k=>{const u=Math.min(A.W*.13,A.H*.17,66);return{x:A.W*(.2+.3*k),y:A.H*.34,u}};
const home=i=>{const w=Math.min(110,(A.W-40)/3),h=Math.min(A.H*.13,52);return{x:A.W/2+(i-1)*(w+10)-w/2,y:A.H-h-8,w,h}};
function drawPlace(){const s=S.a;paper();note(s.left()?'Put each label by the thing it names':'All 3 labels are in the right place',A.H*.07,{n:13,ok:!s.left(),no:!!s.bad});
 PLACE.forEach((k,j)=>{const P=spot(j);pics[k](P.x,P.y,P.u)});
 s.cards.forEach((q,i)=>{if(q.at>=0){const P=spot(q.at);stuck(q.w,P.x,P.y,P.u,GOOD)}else if(s.drag&&s.drag.i===i){const r=home(i);card({x:s.drag.x-r.w/2,y:s.drag.y-r.h/2,w:r.w,h:r.h},q.w,{sel:1})}else card(home(i),q.w,{sel:s.sel===i,no:s.bad===q.w})})}
function placeCard(i,j){const s=S.a,q=s.cards[i];if(!q||q.at>=0)return;s.sel=-1;
 if(PLACE[j]!==q.w){s.bad=q.w;A.sound.miss();return say(`This label says "${q.w}". That is the ${NAME[PLACE[j]]}. A label goes next to the thing it names.`)}
 q.at=j;s.bad='';A.sound.pop();say(`Yes: "${q.w}" is next to the ${NAME[q.w]}.`+(s.left()?' Next label.':''))}
function pickCard(i){const s=S.a;if(s.cards[i].at>=0)return;s.sel=i;s.bad='';say(`This card says "${s.cards[i].w}". Now tap the ${s.cards[i].w}, or drag it there.`)}
/* ---------- 2. build a label, one letter for each sound ---------- */
const slotR=k=>{const n=3,w=Math.min(64,A.W*.15),x0=A.W*.58-(n*w+(n-1)*8)/2;return{x:x0+k*(w+8),y:A.H*.3,w,h:w}};
const keyR=()=>{const n=5,gap=8,w=Math.min(72,(A.W-16-gap*(n-1))/n),h=Math.min(A.H*.15,58),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y:A.H-h-8,w,h}))};
function drawBuild(){const s=S.b;paper();if(s.r>=BUILD.length){note('Labels written: dog and hat',A.H*.1,{ok:1});pics.dog(A.W*.3,A.H*.45,A.H*.14);pics.hat(A.W*.7,A.H*.45,A.H*.14);stuck('dog',A.W*.3,A.H*.45,A.H*.14,GOOD);stuck('hat',A.W*.7,A.H*.45,A.H*.14,GOOD);return}
 const B=BUILD[s.r];note(`Say it slowly: ${B.w.split('').join(' - ')}. Tap a letter for each sound`,A.H*.07,{n:12,no:!!s.bad});
 pics[B.w](A.W*.2,A.H*.36,Math.min(A.W*.16,A.H*.2));
 for(let k=0;k<3;k++){const r=slotR(k);card(r,s.got[k]||'',{ok:k<s.got.length,n:26})}
 const K=keyR();B.tiles.forEach((t,i)=>card(K[i],t,{n:26,no:s.bad===t,w:700}));card(K[4],'✓ Done',{n:15})}
function tapLetter(t){const s=S.b;if(s.r>=BUILD.length)return;const B=BUILD[s.r],want=B.w[s.got.length],seg=B.w.split('').join('-');
 if(t!==want){s.bad=t;A.sound.miss();return say(B.w.includes(t)?`You can hear "${t}" in ${B.w}, but not yet. Say it slowly: ${seg}. Which sound comes ${s.got.length?'next':'first'}?`:`There is no "${t}" sound in ${B.w}. Say it slowly: ${seg}.`)}
 s.got+=t;s.bad='';A.sound.pop();if(s.got.length<B.w.length)return say(`Yes, "${t}". Keep going: ${seg}.`);
 const w=B.w;s.r++;s.got='';say(`Yes: ${seg} makes ${w}. One letter for each sound.`+(s.r<BUILD.length?' Next picture.':''))}
function doneWord(){const s=S.b;if(s.r>=BUILD.length)return;const B=BUILD[s.r];s.bad='';A.sound.miss();
 say(s.got.length?`You wrote "${s.got}". Keep listening: ${B.w} has ${B.w.length} sounds, ${B.w.split('').join('-')}.`:`Say ${B.w} slowly first, then tap a letter for each sound.`)}
/* ---------- 3. label or caption? ---------- */
const binR=k=>{const w=Math.min(200,(A.W-30)/2),h=Math.min(A.H*.24,96);return{k,x:k?A.W/2+6:A.W/2-w-6,y:A.H-h-8,w,h}};
const midR=()=>{const w=Math.min(300,A.W*.8),h=Math.min(A.H*.16,60);return{x:(A.W-w)/2,y:A.H*.28,w,h}};
function drawSort(){const s=S.c,g=A.ctx;paper();const done=s.i>=SORT.length;note(done?'All 6 cards sorted':'Label or caption? Drag the card to a box',A.H*.07,{n:13,ok:done,no:!!s.bad});if(done)note('3 labels and 3 captions',A.H*.3,{n:15});
 [0,1].forEach(k=>{const r=binR(k);g.fillStyle=A.alpha(k?'#7c3aed':'#0e7490',.12);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=2;g.strokeStyle=k?'#6d28d9':'#0e7490';g.stroke();
  card({x:r.x+8,y:r.y+6,w:r.w-16,h:r.h*.42},k?'Caption':'Label',{n:16});g.font=`600 ${big(11)}${F}`;g.fillStyle=A.col.tx;g.textAlign='center';g.fillText(k?'a sentence':'one naming word',r.x+r.w/2,r.y+r.h*.76);
  g.fillText(`${s.n[k]} in here`,r.x+r.w/2,r.y+r.h*.93)});
 if(!done){const m=midR(),d=s.drag;card(d?{x:d.x-m.w/2,y:d.y-m.h/2,w:m.w,h:m.h}:m,SORT[s.i][0],{sel:!!d,no:!!s.bad,n:SORT[s.i][1]?16:22})}}
function sortTo(k){const s=S.c;if(s.i>=SORT.length)return;const [t,ans]=SORT[s.i];s.drag=null;
 if(k!==ans){s.bad=t;A.sound.miss();return say(ans?`"${t}" is a whole sentence about the picture, with a capital and a full stop. That makes it a caption.`:`"${t}" is one word that names a thing. That makes it a label.`)}
 s.n[k]++;s.i++;s.bad='';A.sound.pop();say(`Yes: "${t}" is a ${k?'caption':'label'}.`+(s.i<SORT.length?' Next card.':''))}
/* ---------- 4. build a caption ---------- */
const capR=i=>{const per=4,row=Math.floor(i/per),col=i%per,n=row?3:4,w=Math.min(84,(A.W-20-8*(per-1))/per),h=Math.min(A.H*.12,48);
 return{x:(A.W-(n*w+(n-1)*8))/2+col*(w+8),y:A.H-(2-row)*(h+8),w,h}};
function drawCap(){const s=S.d,g=A.ctx;paper();const done=s.got.length>=CAP.length;note(done?'Caption made':'Tap the words in order to make the caption',A.H*.07,{n:13,ok:done,no:s.bad>=0});
 const u=Math.min(A.W*.09,A.H*.11);pics.sun(A.W*.68,A.H*.25,u);pics.dog(A.W*.38,A.H*.32,u*1.1);
 const line=s.got.map(i=>CAPTILES[i]).join(' ').replace(' .','.');g.strokeStyle=RIM;g.lineWidth=1.5;g.beginPath();g.moveTo(A.W*.1,A.H*.58);g.lineTo(A.W*.9,A.H*.58);g.stroke();
 g.font=`800 ${big(19)}${F}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='alphabetic';g.fillText(line||'…',A.W/2,A.H*.56);
 CAPTILES.forEach((t,i)=>card(capR(i),t,{used:s.got.includes(i),no:s.bad===i,n:20}))}
function tapWord(i){const s=S.d;if(s.got.length>=CAP.length||s.got.includes(i))return;const t=CAPTILES[i],want=CAP[s.got.length];
 if(t!==want){s.bad=i;A.sound.miss();
  if(want==='The'&&t==='the')return say('A caption starts with a capital letter. Use the big T: The.');
  if(t==='.')return say('The full stop goes at the very end, after the last word.');
  if(t==='The')return say('Only the first word gets a capital letter here. Use the small t: the.');
  return say(`Say it: The dog is in the sun. Which word comes after "${CAP[s.got.length-1]||'the start'}"?`)}
 s.got.push(i);s.bad=-1;A.sound.pop();say(s.got.length<CAP.length?`"${t}". Next word.`:'Yes: The dog is in the sun. A capital at the start and a full stop at the end.')}
/* ---------- 5. check the robot ---------- */
const judgeR=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2),h=Math.min(A.H*.15,58);return{k,x:A.W/2+(k?6:-w-6),y:A.H-h-8,w,h}});
function drawRobot(){const s=S.e,g=A.ctx;paper();if(s.i>=ROBOT.length){note(`All ${ROBOT.length} checked`,A.H*.14,{ok:1});note('Wrong place, first sound only, no capital or full stop',A.H*.34,{n:12});return}
 const R=ROBOT[s.i];note(`Robot's work ${s.i+1} of ${ROBOT.length}: right, or a slip?`,A.H*.07,{n:13,no:s.bad>=0});
 const u=Math.min(A.W*.1,A.H*.12),X=[A.W*.3,A.W*.7];R.two.forEach((k,j)=>pics[k](X[j],A.H*.33,u));
 if(R.cap){g.font=`700 ${big(17)}${F}`;g.fillStyle=A.col.tx;g.textAlign='center';g.fillText(R.cap,A.W/2,A.H*.66)}else stuck(R.lab,X[R.at],A.H*.33,u,PEN);
 judgeR().forEach(r=>card(r,r.k?'✗ Slip':'✓ Right',{no:s.bad===r.k,n:17}))}
function judge(k){const s=S.e;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];if((k===0)!==R.ok){s.bad=k;A.sound.miss();return say('Look again. '+R.fix)}
 s.bad=-1;s.i++;A.sound.pop();say((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
/* ---------- pointer ---------- */
function draw(){const k=now();if(k==='quiz'){paper();note('Challenge',A.H*.2,{ok:1});note('Labels name things. Captions tell about the picture.',A.H*.5,{n:12});return}
 ({place:drawPlace,build:drawBuild,sort:drawSort,cap:drawCap,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='place'){const s=S.a,i=s.cards.findIndex((q,i)=>q.at<0&&inside(p,home(i)));if(i>=0){pickCard(i);s.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const j=PLACE.findIndex((_,j)=>near(p,spot(j),spot(j).u*1.1));if(j>=0&&s.sel>=0)placeCard(s.sel,j);return false}
 if(k==='build'){const K=keyR().find(r=>inside(p,r));if(K){if(K.i===4)doneWord();else if(S.b.r<BUILD.length)tapLetter(BUILD[S.b.r].tiles[K.i])}return false}
 if(k==='sort'){const s=S.c;if(s.i<SORT.length&&inside(p,midR())){s.drag={x:p.x,y:p.y};A.redraw();return true}const b=[0,1].find(q=>inside(p,binR(q)));if(b!=null)sortTo(b);return false}
 if(k==='cap'){const i=CAPTILES.findIndex((_,i)=>inside(p,capR(i)));if(i>=0)tapWord(i);return false}
 if(k==='robot'){const v=judgeR().find(r=>inside(p,r));if(v)judge(v.k)}return false}
function move(p){const k=now(),d=k==='place'?S.a.drag:k==='sort'?S.c.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const k=now();
 if(k==='place'){const s=S.a,d=s.drag;if(!d)return;s.drag=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<12)return A.redraw();
  const j=PLACE.findIndex((_,j)=>near(p,spot(j),spot(j).u*1.3));if(j>=0)placeCard(d.i,j);else{s.sel=d.i;A.redraw()}return}
 if(k==='sort'){const s=S.c;if(!s.drag)return;const b=[0,1].find(q=>inside(p,binR(q)));s.drag=null;if(b!=null)sortTo(b);else A.redraw()}}
function reset(){tok++;for(const k in S)delete S[k];
 Object.assign(S,{a:{cards:['cat','sun','tree'].map(w=>({w,at:-1})),sel:-1,bad:'',drag:null,left(){return this.cards.some(q=>q.at<0)}},
  b:{r:0,got:'',bad:''},c:{i:0,n:[0,0],bad:'',drag:null},d:{got:[],bad:-1},e:{i:0,bad:-1},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctrls();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();say(DESC[i]);S.check=finish(i,ok,DONE[i])}
/* Show me: play [wait ms, action] pairs; a restart cancels the rest */
function demo(i,list){steps[i].go();const my=tok;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(my===tok)f()},t)})}
function ctrls(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='place'){const s=S.a;if(s.sel<0)s.cards.forEach((q,i)=>{if(q.at<0)B(`🏷️ ${q.w}`,()=>pickCard(i),`Pick the label ${q.w}`)});else PLACE.forEach((w,j)=>B(`Put by the ${w}`,()=>placeCard(s.sel,j)))}
 if(k==='build'&&S.b.r<BUILD.length){BUILD[S.b.r].tiles.forEach(t=>B(t,()=>tapLetter(t),`Letter ${t}`));B('✓ Done',doneWord,'I have finished the label')}
 if(k==='sort'&&S.c.i<SORT.length){B('Label',()=>sortTo(0),'Put it in Label');B('Caption',()=>sortTo(1),'Put it in Caption')}
 if(k==='cap'&&S.d.got.length<CAP.length)CAPTILES.forEach((t,i)=>{if(!S.d.got.includes(i))B(t,()=>tapWord(i),t==='.'?'full stop':`word ${t}`)})
 if(k==='robot'&&S.e.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
const steps=[
{h:'Label it',p:TXT[0],predict:{q:'What is a label?',opts:['A long story about the picture','One word that names a thing'],ans:1},task:'Put all 3 labels by their things',
 show:()=>demo(0,PLACE.map((w,j)=>[300,()=>{const i=S.a.cards.findIndex(q=>q.w===w);pickCard(i);setTimeout(()=>placeCard(i,j),120)}])),go:()=>begin(0,()=>!S.a.left())},
{h:'Sound it out',p:TXT[1],predict:{q:'To write the label "dog", what do you do?',opts:['Write the first letter, d','Say d-o-g and write a letter for each sound'],ans:1},task:'Write the labels dog and hat',
 show:()=>demo(1,BUILD.flatMap(B=>B.w.split('').map(t=>[220,()=>tapLetter(t)]))),go:()=>begin(1,()=>S.b.r>=BUILD.length)},
{h:'Label or caption',p:TXT[2],predict:{q:'"The dog is in the sun." Is it a label or a caption?',opts:['A label','A caption'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(2,SORT.map(([,a])=>[260,()=>sortTo(a)])),go:()=>begin(2,()=>S.c.i>=SORT.length)},
{h:'Make a caption',p:TXT[3],task:'Make the caption',
 show:()=>demo(3,CAP.map(w=>[220,()=>tapWord(CAPTILES.indexOf(w))])),go:()=>begin(3,()=>S.d.got.length>=CAP.length)},
{h:'Check the robot',p:TXT[4],predict:{q:'The robot wrote "d" for dog. Is that a good label?',opts:['Yes, d is enough','No, dog has 3 sounds: d-o-g'],ans:1},task:'Check all 5',
 show:()=>demo(4,ROBOT.map(R=>[380,()=>judge(R.ok?0:1)])),go:()=>begin(4,()=>S.e.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='A label is one word next to the thing it names. A caption is a sentence about the picture.';
 if(t==='story')m='A label is not a story. It is one word that names a thing, like "dog".';
 if(t==='where')m='A label goes next to the thing it names, with a line to it, so we know what it is.';
 if(t==='label')m='"cat" is one naming word, so it is a label. A caption is a sentence about the picture.';
 if(t==='caps')m='A caption is a sentence: it starts with a capital letter and ends with a full stop.';
 if(t==='first')m='Say the word slowly and write a letter for every sound you hear, not just the first one.';
 if(t==='copy')m='Listen to the sounds in the word, then write a letter for each one. Any letters will not say the word.';
 if(t==='order')m='The capital letter comes first and the full stop comes at the end.';
 if(t==='dotlabel')m='A label is one naming word. It does not need a full stop. Captions get full stops.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:X=>{box.hidden=X.step!==5;pad.hidden=X.step===5;ctrls()},
 init:X=>{A=X;pics=LABEL.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Labels and captions lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrls()}}).start()})})();
