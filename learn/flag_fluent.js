/* Flagship – reading fluently (ages 5–7): scoop phrases, voice from the end mark, reread until the stops go, pick a book
   with 9 or 10 easy words in 10, find talking speed. Every drag or tap has a button twin. */
(()=>{
/* scoop: two phrases per line; the breath goes after the first */
const SCOOPS=[['The big dog','ran to the park.','Who? The big dog. What did it do? Ran to the park.'],
 ['After lunch,','we play in the sun.','The comma shows the breath.'],
 ['My little sister','sings in the bath.','Who? My little sister. What does she do? Sings in the bath.']];
const VOICES=[['🙂','Calm','stop at the end'],['🤔','Asking','voice goes up'],['🤩','Excited','strong voice']];
const MARKS=[['The cat is asleep.',0],['Is the cat asleep?',1],['We won the race!',2]];
const MARKWHY=['A full stop: say it calmly, then stop.','A question mark: you are asking, so your voice goes up.','An exclamation mark: say it with a strong voice.'];
/* reread: words sounded out once get easier the next time */
const PAGE='Pip sat in the shed with a fish and a frog.'.split(' ');
const STUCK=[[4,7,10],[10],[]];
const PARTS={'shed.':'sh-e-d','fish':'f-i-sh','frog.':'f-r-o-g'};
const BOOKS=[['🐻','Bear Gets Up',10],['🚀','Space Trip',6],['🐸','Frog Pond',9],['🏰','The Castle',5]];
const PACE=[['🐌','Snail','Too slow: one… word… at… a… time. You forget the start.'],
 ['🗣️','Talking','Talking speed! Smooth scoops, a stop at the full stop, and it makes sense.'],
 ['🚀','Rocket','Too fast! You raced past the stops. Did it make sense?']];
const LINE='The bus stopped. We got off, and ran home.'.split(' ');
VIS.reg('flagfluent',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const blank=()=>({k:0,n:0,wait:0,hook:()=>{},bad:-1,ok:0,drag:null,read:0,fp:0,stop:-1,parts:'',stops:[0,0,0],gliding:0,shelf:[],pace:-1,tried:[],hl:-1,quick:0,done:[]}),S=blank();
const part=()=>['scoop','voice','again','books','pace','quiz'][A.step];
const big=n=>Math.round(n*(A.narrow?1:1.2)),quick=()=>A.reduced()||S.quick;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let r='';t.split(' ').forEach(z=>{const q=r?r+' '+z:z;if(g.measureText(q).width>w&&r){rows.push(r);r=z}else r=q});rows.push(r);
 const lh=big(n)*1.25;rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*lh))}
function pic(g,e,x,y,s){g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* word tiles in rows that wrap */
function flow(words,top,n){const g=A.ctx;g.font=`800 ${big(n)}px system-ui,sans-serif`;const gap=big(n)*.55,h=big(n)*1.6,pad=big(n)*.35,maxW=A.W-24,R=[];let row=[],w=0;
 words.forEach((t,i)=>{const tw=g.measureText(t).width+pad*2;if(row.length&&w+gap+tw>maxW){R.push([row,w]);row=[];w=0}row.push({t,i,w:tw});w+=(row.length>1?gap:0)+tw});R.push([row,w]);
 const out=[];R.forEach(([r,rw],li)=>{let x=(A.W-rw)/2;r.forEach(o=>{out[o.i]={x,y:top+li*(h+big(n)*1.3),w:o.w,h,t:o.t,line:li};x+=o.w+gap})});return out}
function tile(g,r,fill,edge,lw){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const wordTop=()=>A.H*(A.narrow?.1:.12);
function scoopArc(g,a,b,col){if(!a||!b)return;const y=a.y+a.h+6,x0=a.x+4,x1=b.x+b.w-4;g.strokeStyle=col;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo((x0+x1)/2,y+26,x1,y);g.stroke()}
function scoops(g,T,ends,col){let s=0;ends.forEach(e=>{for(let i=s;i<=e;i++)if(i===e||T[i+1].line!==T[i].line){scoopArc(g,T[s],T[i],col);s=i+1}})}
const lineWords=()=>{const[a,b]=SCOOPS[S.k];return(a+' '+b).split(' ')};
const firstEnd=()=>SCOOPS[S.k][0].split(' ').length-1;
function shelves(){const w=(A.W-36)/2,h=big(70),y=A.H-h-12;return[{x:12,y,w,h},{x:24+w,y,w,h}]}
const bookBox=()=>{const w=Math.min(big(230),A.W-40),h=big(150);return{x:(A.W-w)/2,y:A.H*(A.narrow?.2:.12),w,h}};
function voiceCards(){const w=Math.min(big(150),(A.W-24-20)/3),h=big(78),y=A.H-h-14,x0=(A.W-(w*3+20))/2;return VOICES.map((v,j)=>({x:x0+j*(w+10),y,w,h}))}
const sentBox=()=>({x:16,y:A.H*(A.narrow?.12:.1),w:A.W-32,h:big(110)});
function dial(){const y=A.H-big(60),x0=A.W*.16,x1=A.W*.84;return{y,x0,x1,at:i=>x0+(x1-x0)*i/2}}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=part();
 if(v==='quiz'){write(g,'Read like you talk.',W/2,H*.45,W-40,17);return}
 if(v==='scoop'){const T=flow(lineWords(),wordTop(),24);T.forEach((r,i)=>tile(g,r,S.bad===i?A.mix(C.pn,C.rd,.2):C.pn,S.bad===i?C.rd:C.ln,S.bad===i?4:2));
  T.forEach(r=>write(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w+40,24,C.tx,800));
  if(S.ok){scoops(g,T,[firstEnd(),T.length-1],C.gr)}
  write(g,S.ok?'Read each scoop in one go.':'Tap the end of the first scoop.',W/2,H*(A.narrow?.66:.7),W-30,16,C.mu,600);
  pic(g,S.ok?'🗣️':'🤖',W/2,H*(A.narrow?.8:.86),big(44))}
 if(v==='voice'){const[t,want]=MARKS[S.k],b=sentBox();tile(g,b,S.ok?A.mix(C.pn,C.gr,.14):C.pn,S.drag&&S.drag.x!=null?C.vi:C.ln,S.drag?3:2);
  write(g,t.slice(0,-1),W/2-big(14),b.y+b.h*.42,b.w-80,26,C.tx,800);const m=t.slice(-1);g.font=`900 ${big(54)}px system-ui,sans-serif`;g.fillStyle=C.vi;g.textAlign='center';g.fillText(m,b.x+b.w-big(30),b.y+b.h*.45);
  if(S.ok)write(g,VOICES[want][0]+' '+VOICES[want][1]+': '+VOICES[want][2],W/2,b.y+b.h+big(36),W-30,18,C.tx,700);
  else write(g,'Which voice fits the end mark?',W/2,b.y+b.h+big(36),W-30,16,C.mu,600);
  voiceCards().forEach((r,j)=>{if(S.drag&&S.drag.j===j&&S.drag.x!=null)return;vcard(g,j,r)});
  if(S.drag&&S.drag.x!=null){const r=voiceCards()[0];vcard(g,S.drag.j,{x:S.drag.x-r.w/2,y:S.drag.y-r.h/2,w:r.w,h:r.h})}}
 if(v==='again'){const T=flow(PAGE,wordTop(),21);
  T.forEach((r,i)=>{const now=i===S.stop,done=i<S.fp;tile(g,r,now?A.mix(C.pn,C.am,.22):done?A.mix(C.pn,C.gr,.12):C.pn,now?C.am:C.ln,now?4:2);
   write(g,now&&S.parts?S.parts:r.t,r.x+r.w/2,r.y+r.h/2,r.w+60,21,C.tx,800)});
  const f=T[Math.min(PAGE.length-1,Math.floor(S.fp))];if(f&&S.read<3)pic(g,'👆',f.x+f.w/2,f.y+f.h+big(14),big(24));
  const by=H*(A.narrow?.6:.62),bh=big(26),full=W-big(150);for(let k=0;k<3;k++){const y=by+k*(bh+10);write(g,`Read ${k+1}`,big(40),y+bh/2,big(80),14,C.tx,700);
   if(k<S.read||(k===S.read&&S.fp>0)){const len=(PAGE.length+3*S.stops[k])/(PAGE.length+9)*full*(k<S.read?1:Math.min(1,S.fp/PAGE.length));g.fillStyle=k<S.read?C.cy:A.alpha(C.cy,.5);A.paint.rrect(big(84),y,Math.max(8,len),bh,8);g.fill();
    if(k<S.read)write(g,S.stops[k]?`${S.stops[k]} stop${S.stops[k]>1?'s':''}`:'smooth!',big(84)+len+big(34),y+bh/2,big(70),13,C.tx,700)}}
  if(S.read>=3)write(g,'Same page, fewer stops each time.',W/2,H-big(18),W-20,16,C.tx,700)}
 if(v==='books'){shelves().forEach((r,j)=>{tile(g,r,A.mix(C.pn,j?C.rd:C.gr,.12),j?C.rd:C.gr,2);write(g,j?'Too hard alone':'Just right ✓',r.x+r.w/2,r.y+r.h*.35,r.w-10,16,C.tx,800);
   write(g,S.shelf.filter(s=>s[1]===j).map(s=>BOOKS[s[0]][0]).join(' ')||' ',r.x+r.w/2,r.y+r.h*.72,r.w-10,18,C.tx)});
  if(S.k<BOOKS.length){const[e,name,ok]=BOOKS[S.k],b0=bookBox(),b=S.drag&&S.drag.x!=null?{...b0,x:S.drag.x-b0.w/2,y:S.drag.y-b0.h/2}:b0;
   tile(g,b,S.bad>=0?A.mix(C.pn,C.rd,.18):C.pn,S.bad>=0?C.rd:C.vi,3);pic(g,e,b.x+big(30),b.y+big(30),big(30));write(g,name,b.x+b.w/2+big(14),b.y+big(30),b.w-big(70),17,C.tx,800);
   const d=Math.min(big(9),(b.w-30)/24);for(let i=0;i<10;i++){const x=b.x+b.w/2+(i-4.5)*d*2.3,y=b.y+b.h*.62;g.beginPath();g.arc(x,y,d,0,7);if(i<ok){g.fillStyle=C.gr;g.fill()}else{g.strokeStyle=C.rd;g.lineWidth=3;g.stroke()}}
   write(g,`I can read ${ok} of 10 words`,b.x+b.w/2,b.y+b.h*.86,b.w-10,14,C.tx,600)}}
 if(v==='pace'){const T=flow(LINE,wordTop(),22);T.forEach((r,i)=>{const lit=S.hl>=0&&i<=S.hl;tile(g,r,lit?A.mix(C.pn,C.cy,.2):C.pn,lit?C.cy:C.ln,2);write(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w+40,22,C.tx,800)});
  const L=T[LINE.length-1];if(S.pace===1&&S.hl>=LINE.length-1)scoops(g,T,[2,5,8],C.gr);
  if(S.pace>=0&&S.hl>=LINE.length-1)pic(g,['🤖','🙂','❓'][S.pace],W/2,L.y+L.h+big(52),big(40));
  const d=dial();g.strokeStyle=C.mu;g.lineWidth=big(10);g.lineCap='round';g.beginPath();g.moveTo(d.x0,d.y);g.lineTo(d.x1,d.y);g.stroke();
  PACE.forEach((p,i)=>{const x=d.at(i);write(g,p[1]+(S.tried.includes(i)?' ✓':''),x,d.y+big(34),big(110),14,C.tx,700);g.fillStyle=C.pn;g.strokeStyle=C.ln;g.lineWidth=2;g.beginPath();g.arc(x,d.y,big(8),0,7);g.fill();g.stroke()});
  const kx=S.drag&&S.drag.kx!=null?S.drag.kx:d.at(Math.max(0,S.pace));g.fillStyle=A.mix(C.pn,C.vi,.25);g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.arc(kx,d.y,big(26),0,7);g.fill();g.stroke();
  pic(g,S.pace>=0?PACE[S.pace][0]:'👆',kx,d.y,big(30));if(S.pace<0&&!S.drag)write(g,'Drag the dial to a speed',W/2,d.y-big(44),W-20,14,C.mu,600)}
 A.fx.draw(g)}
function vcard(g,j,r){const C=A.col;tile(g,r,S.bad===j?A.mix(C.pn,C.rd,.18):C.pn,S.bad===j?C.rd:C.vi,S.bad===j?4:2.5);pic(g,VOICES[j][0],r.x+r.w/2,r.y+r.h*.34,big(28));write(g,VOICES[j][1],r.x+r.w/2,r.y+r.h*.76,r.w-8,15,C.tx,800)}
const oops=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:900);A.redraw()};
function deal(){Object.assign(S,{bad:-1,ok:0,drag:null,stop:-1,parts:''})}
function got(t,goal){S.n++;A.sound.pop();if(S.n<goal&&part()!=='again'){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;S.wait=0;S.k++;deal();say(t+' Next one.');keys();A.redraw()},quick()?5:900);say(t)}else{say(t);keys()}A.redraw();S.hook()}
/* step 1: the breath goes at the end of the first scoop */
function cut(i){if(part()!=='scoop'||S.n>=3||S.wait||S.ok)return;const w=lineWords(),[a,b,why]=SCOOPS[S.k];
 if(i===w.length-1)return oops('That is the end. Find the breath in the middle.',i);
 if(i!==firstEnd())return oops(`"${w.slice(0,i+1).join(' ')}" breaks up words that go together. ${why}`,i);
 S.ok=1;got(`${a}… ${b} Two scoops, like talking.`,3)}
/* step 2: the end mark sets the voice */
function voice(j){if(part()!=='voice'||S.n>=3||S.wait||S.ok)return;const[t,want]=MARKS[S.k];if(j!==want)return oops(`${VOICES[j][1]} does not fit ${t.slice(-1)}. ${MARKWHY[want]}`,j);
 S.ok=1;got(`${t} ${MARKWHY[want]}`,3)}
/* step 3: the finger stops at words that still need sounding out */
function glide(){if(part()!=='again'||S.read>=3||S.gliding||S.stop>=0)return;S.gliding=1;const st=STUCK[S.read],from=Math.floor(S.fp),to=st.find(i=>i>=from&&!S.done.includes(i));
 const end=to==null?PAGE.length:to;A.tween(S,{fp:end},quick()?1:Math.max(1,(end-from)*160),'io',()=>{S.gliding=0;if(to==null){endRead();return}S.stop=to;S.parts='';A.sound.miss();say(`Stuck on ${PAGE[to].replace('.','')}. Tap it.`);keys();A.redraw()})}
function sound(){if(S.stop<0)return;const i=S.stop;S.stops[S.read]++;S.done.push(i);S.parts=PARTS[PAGE[i]];A.sound.tick();say(`${S.parts}… ${PAGE[i].replace('.','')}.`);A.redraw();
 const r=run;setTimeout(()=>{if(r!==run)return;S.stop=-1;S.parts='';S.fp=i+1;keys();A.redraw();glide()},quick()?20:700)}
function endRead(){const k=S.read;S.read++;S.done=[];S.fp=0;const n=S.stops[k];A.sound.pop();
 if(S.read<3){say(`Read ${k+1}: ${n} stop${n===1?'':'s'}. Read it again.`);keys();A.redraw();return}
 S.n=3;say('Read 3: no stops! Rereading made it smooth and quick.');keys();A.redraw();S.hook()}
/* step 4: sort books by how many words you can read */
function shelve(j){if(part()!=='books'||S.k>=BOOKS.length||S.wait)return;const[,name,ok]=BOOKS[S.k],want=ok>=9?0:1;
 if(j!==want)return oops(want?`${10-ok} stops in 10 words is too many. The story gets lost. Share this one with a grown-up.`:`${ok} of 10 is just right: only ${10-ok} new word${10-ok===1?'':'s'} to work out.`,0);
 S.shelf.push([S.k,j]);S.n++;S.k++;S.drag=null;A.sound.pop();say(`${name}: ${ok} of 10. ${want?'Too hard to read alone.':'Just right!'}`);keys();A.redraw();S.hook()}
/* step 5: try each speed on the same line */
function pace(i){if(part()!=='pace'||S.wait)return;S.pace=i;if(!S.tried.includes(i))S.tried.push(i);S.hl=-1;const ms=[3200,1800,450][i];
 A.tween(S,{hl:LINE.length-1},quick()?1:ms,'io',()=>A.redraw());A.sound.tick();
 const left=PACE.filter((_,j)=>!S.tried.includes(j)).map(p=>p[1]);say(PACE[i][2]+(left.length?` Now try ${left.join(' and ')}.`:i===1?'':' Pick the best speed.'));
 if(S.tried.length===3&&i===1&&S.n<1){S.n=1;S.hook()}keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(v==='quiz')return;
 if(v==='scoop'&&!S.ok&&S.n<3)lineWords().slice(0,-1).forEach((w,i)=>B(w,()=>cut(i),`End scoop at ${w}`));
 if(v==='voice'&&!S.ok&&S.n<3)VOICES.forEach((x,j)=>B(x[0]+' '+x[1],()=>voice(j)));
 if(v==='again'&&S.read<3){if(S.stop>=0)B('Sound it out',sound,`Sound out ${PAGE[S.stop]}`);else if(!S.gliding)B(S.fp?'Keep reading ▶':`Read ${S.read+1} ▶`,glide)}
 if(v==='books'&&S.k<BOOKS.length){B('Just right ✓',()=>shelve(0));B('Too hard alone',()=>shelve(1))}
 if(v==='pace')PACE.forEach((p,i)=>B(p[0]+' '+p[1],()=>pace(i)))}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=part();if(S.wait)return false;
 if(v==='scoop'){const i=flow(lineWords(),wordTop(),24).findIndex(r=>hit(p,r));if(i>=0)cut(i)}
 if(v==='voice'&&!S.ok){const j=voiceCards().findIndex(r=>hit(p,r));if(j>=0){S.drag={j,x:null,x0:p.x,y0:p.y};return true}}
 if(v==='again'){const T=flow(PAGE,wordTop(),21);if(S.stop>=0&&hit(p,T[S.stop]))sound();else if(S.stop<0&&T.some(r=>hit(p,r)))glide()}
 if(v==='books'&&S.k<BOOKS.length&&hit(p,bookBox())){S.drag={x:null,x0:p.x,y0:p.y};return true}
 if(v==='pace'){const d=dial();if(Math.abs(p.y-d.y)<big(40)&&p.x>d.x0-big(30)&&p.x<d.x1+big(30)){S.drag={kx:p.x};A.redraw();return true}}return false}
function move(p){const d=S.drag;if(!d)return;if(part()==='pace'){const k=dial();d.kx=Math.max(k.x0,Math.min(k.x1,p.x));A.redraw();return}
 if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const v=part();
 if(v==='pace'){const k=dial();pace(Math.round((d.kx-k.x0)/(k.x1-k.x0)*2));return}
 if(v==='voice'){if(d.x==null||hit(p,sentBox()))voice(d.j);else A.redraw();return}
 if(v==='books'){if(d.x==null){A.redraw();return}const j=shelves().findIndex(r=>hit(p,{x:r.x,y:r.y-40,w:r.w,h:r.h+40}));if(j>=0)shelve(j);else A.redraw()}}
const finish=(n,goal,msg)=>()=>{if(A.step===n&&S.n>=goal&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f,gap,goal){const k=++run,tick=()=>{if(k!==run||S.n>=goal)return;f();setTimeout(tick,gap)};setTimeout(tick,30)}
const reset=()=>{run++;Object.assign(S,blank());if(A)deal()};
const steps=[
{h:'Scoop the words',p:'Do not read like a robot, one word at a time. Read in scoops: groups of words that go together. Tap the last word of the first scoop.',task:'Scoop 3 lines',
 show:()=>{steps[0].go();S.quick=1;auto(()=>cut(firstEnd()),120,3)},
 go:()=>{reset();say('Where does the first scoop end?');keys();S.hook=finish(0,3,'Scoops sound like talking: The big dog… ran to the park.')}},
{h:'The end mark sets the voice',p:'The mark at the end changes your voice. Drag a voice to the line, or tap it.',
 predict:{q:'"The cat is asleep." and "Is the cat asleep?" Same words. Do you read them the same way?',opts:['Yes, same words, same voice','No, the end mark changes my voice'],ans:1},task:'Give 3 lines the right voice',
 show:()=>{steps[1].go();S.quick=1;auto(()=>voice(MARKS[S.k][1]),120,3)},
 go:()=>{reset();say('Which voice fits the full stop?');keys();S.hook=finish(1,3,'The . ? and ! tell you how to say it.')}},
{h:'Read it again',p:'Read the same page 3 times. When your finger gets stuck, tap the word to sound it out.',
 predict:{q:'You read the same page 3 times. The third time is…',opts:['The same: same words','Slower: I am bored of it','Smoother, with fewer stops'],ans:2},task:'Read the page 3 times',
 show:()=>{steps[2].go();S.quick=1;auto(()=>{if(S.stop>=0)sound();else glide()},90,3)},
 go:()=>{reset();say('Press Read 1.');keys();S.hook=finish(2,3,'3 stops, then 1, then none. Rereading builds fluency.')}},
{h:'A just right book',p:'Count the words you can read in 10. 9 or 10 is just right for reading by yourself. Drag each book to a shelf.',
 predict:{q:'You get stuck on 4 words out of 10. The book is…',opts:['Just right: I can read most of it','Too hard to read alone'],ans:1},task:'Sort 4 books',
 show:()=>{steps[3].go();S.quick=1;auto(()=>shelve(BOOKS[S.k][2]>=9?0:1),120,4)},
 go:()=>{reset();say('Bear Gets Up: 10 of 10. Which shelf?');keys();S.hook=finish(3,4,'9 or 10 out of 10 is just right. Harder books: read with a grown-up.')}},
{h:'Talking speed',p:'Is faster better? Drag the dial to try each speed. Then pick the best one.',task:'Try all 3 speeds, then pick the best',
 show:()=>{steps[4].go();S.quick=1;[0,2,1].forEach((i,k)=>setTimeout(()=>pace(i),40+k*120))},
 go:()=>{reset();say('Drag the dial.');keys();S.hook=finish(4,1,'Not a race: read at talking speed, so it makes sense.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Which one sounds most like talking?',[['The big dog… ran to the park.','ok'],['The… big… dog… ran… to… the… park.','robot'],['Thebigdograntothepark.','race']]],
 ['A line ends with ?. What does your voice do?',[['It goes up, like asking','ok'],['Nothing','mark'],['It gets loud','bang']]],
 ['You get stuck on 5 words out of 10. The book is…',[['Too hard to read alone','ok'],['Just right','hard'],['Fine if I read fast','race']]],
 ['How do you get smoother at a new book?',[['Read it again and again','ok'],['Read it once, then a new one','once'],['Read it fast','race']]],
 ['Who reads best?',[['Mia: talking speed, with stops','ok'],['Leo: the fastest','race'],['Zoe: one word at a time','robot']]],
 ['"We won!" How do you read it?',[['With a big, happy voice','ok'],['Flat, like every other line','flat'],['Like a question','mark']]]];
function why(t){let m='Read like you talk.';
 if(t==='robot')m='One word at a time is robot reading. Scoop words that go together.';if(t==='race')m='Fast is not best. Too fast and you miss the stops and the sense.';
 if(t==='mark')m='? means asking, so your voice goes up. ! means a strong voice.';if(t==='bang')m='A loud, strong voice is for !. A ? is asking.';
 if(t==='hard')m='5 stops in 10 is too many. Just right is 9 or 10 out of 10.';if(t==='once')m='Reading it again makes it smoother each time.';
 if(t==='flat')m='! asks for a strong voice. Flat hides the feeling.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! That is fluent reading.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
