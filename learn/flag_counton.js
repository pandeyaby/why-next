/* Flagship – counting on to add (ages 4–5; Development Matters 2021 Reception "one more than"; NC Year 1 "add
   one-digit numbers"; Carpenter and Moser 1984, Fuson 1982: count all, count on, count on from the larger). Scenes: count
   on from a hidden jar, frog jumps on a track, start from the bigger number, a bus, fingers. Data: learn/counton_art.js. */
(()=>{const {TIN,TRACK,BIG,BUS,FING,WORD,QS}=CTON;
VIS.reg('flagcounton',c=>{let A,pad,quizEl,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',EDGE='#64748b',HOT='#7c3aed',JAR='#f59e0b',FONT='px system-ui,sans-serif';
const scene=()=>['jar','track','big','bus','hands','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.15);
const say=n=>`${n} (${WORD[n]})`,seq=(n,k)=>Array.from({length:k},(_,i)=>n+i+1).join(', ');
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.55);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+26}
 const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YES:o.no?NO:EDGE;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1)}
function tile(r,label,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.no?NO:o.ok?YES:o.on?HOT:EDGE;g.stroke();
 if(label!=null){g.fillStyle=INK;g.font=`900 ${Math.round(Math.min(r.h*.5,sz(o.n||20)))}${FONT}`;mid(g);g.fillText(String(label),r.x+r.w/2,r.y+r.h/2+1)}}
function emo(e,x,y,s){const g=A.ctx;g.font=`${Math.round(s)}${FONT}`;mid(g);g.fillStyle='#000';g.fillText(e,x,y)}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function row(n,y,h,maxW){const gap=8,w=Math.min(maxW||110,(A.W-20-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y,w,h}))}
/* 1. the jar: hold the first number, count on the rest */
const jarR=()=>{const w=Math.min(A.W*.36,170),h=A.H*.42;return{x:A.W*.27-w/2,y:A.H*.2,w,h}};
const carR=k=>{const n=Math.min(k,4),s=Math.min(A.W*.17,A.H*.2,80),x0=A.W*.56;return Array.from({length:k},(_,i)=>({i,x:x0+(i%2)*(s+10),y:A.H*.22+Math.floor(i/2)*(s+10),w:s,h:s}))};
function drawJar(){const s=S.a,g=A.ctx;wash();
 if(s.r>=TIN.length){tag('3 jars: start from the jar number',A.W/2,A.H*.1,{ok:1});TIN.forEach(([n,k],j)=>tag(`${n} … ${seq(n,k)}: ${n} and ${k} more is ${n+k}`,A.W/2,A.H*(.32+j*.18),{n:14}));return}
 const [n,k]=TIN[s.r],j=jarR();tag(s.won?`${n} and ${k} more is ${n+k}`:`Jar ${s.r+1} of 3: ${s.held?'tap each car outside':'tap the jar first'}`,A.W/2,A.H*.07,{n:13,ok:s.won});
 g.fillStyle=JAR;A.paint.rrect(j.x,j.y,j.w,j.h,18);g.fill();g.lineWidth=s.bad==='jar'?4:2;g.strokeStyle=s.bad==='jar'?NO:'#78350f';g.stroke();
 g.fillStyle='#ffffff';A.paint.rrect(j.x+j.w*.18,j.y+j.h*.25,j.w*.64,j.h*.5,12);g.fill();g.fillStyle=INK;g.font=`900 ${Math.round(j.h*.32)}${FONT}`;mid(g);g.fillText(String(n),j.x+j.w/2,j.y+j.h/2+2);
 g.fillStyle=A.col.tx;g.font=`800 ${sz(13)}${FONT}`;g.fillText(`${n} cars inside`,j.x+j.w/2,j.y+j.h+18);
 carR(k).forEach(r=>{const got=r.i<s.k;if(S.drag&&r.i===s.k)return;tile(r,null,{ok:got,no:s.bad==='car'&&!got,bg:got?'#d1fae5':'#ffffff'});emo('🚗',r.x+r.w/2,r.y+r.h*.42,r.h*.5);if(got){g.fillStyle=INK;g.font=`900 ${Math.round(r.h*.26)}${FONT}`;g.fillText(String(n+r.i+1),r.x+r.w/2,r.y+r.h*.82)}});
 if(S.drag){const r=carR(k)[s.k];tile({x:S.drag.x-r.w/2,y:S.drag.y-r.h/2,w:r.w,h:r.h},null,{on:1});emo('🚗',S.drag.x,S.drag.y-r.h*.08,r.h*.5)}
 const said=[s.held?String(n):'…'].concat(Array.from({length:s.k},(_,i)=>String(n+i+1)));tag('You say: '+said.join(', '),A.W/2,A.H*.86,{n:15,bg:'#fef9c3'})}
function holdJar(){const s=S.a;if(s.r>=TIN.length||s.won)return;const n=TIN[s.r][0];s.held=1;s.bad=null;A.sound.pop();tell(`${say(n)} in the jar. Keep ${n} in your head. Now tap a car.`)}
function addCar(){const s=S.a;if(s.r>=TIN.length)return;if(s.won)return nextJar();const [n,k]=TIN[s.r];
 if(!s.held){s.bad='jar';A.sound.miss();return tell(`Do not count the cars from one. Tap the jar first and say ${n}: that is how many are hiding.`)}
 s.k++;s.bad=null;A.sound.pop();if(s.k<k)return tell(`${n+s.k}.`);s.won=1;tell(`${n} … ${seq(n,k)}. ${n} and ${k} more is ${n+k}. Tap Next jar.`)}
function nextJar(){const s=S.a;s.r++;s.k=0;s.held=0;s.won=0;tell(s.r>=TIN.length?'All 3 jars done. Start from the number in the jar and count on.':`Jar ${s.r+1}: ${TIN[s.r][0]} cars inside. Tap the jar.`)}
/* 2. number track: count the jumps, not the squares */
const sqR=()=>{const per=A.narrow?5:10,gap=6,w=Math.min(64,(A.W-16-gap*(per-1))/per),h=Math.min(w*1.25,A.H*(A.narrow?.22:.3)),x0=(A.W-(w*per+gap*(per-1)))/2,y0=A.narrow?A.H*.24:A.H*.4;
 return Array.from({length:10},(_,i)=>({i,v:i+1,x:x0+(i%per)*(w+gap),y:y0+Math.floor(i/per)*(h+A.H*.12),w,h}))};
function drawTrack(){const s=S.b,g=A.ctx;wash();
 if(s.r>=TRACK.length){tag('Count the jumps, not the square you start on',A.W/2,A.H*.12,{ok:1});TRACK.forEach(([n,k],j)=>tag(`on ${n}, ${k} jumps → ${n+k}`,A.W/2,A.H*(.34+j*.17),{n:15}));return}
 const [n,k]=TRACK[s.r],sq=sqR(),at=n+s.j;tag(s.won?`${n} and ${k} more is ${n+k}`:`Frog ${s.r+1} of 3: on ${n}, jump ${k}. Jumps: ${s.j}`,A.W/2,A.H*.07,{n:13,ok:s.won});
 sq.forEach(r=>{tile(r,null,{ok:s.won&&r.v===at,no:s.bad===r.v,bg:r.v===n?'#fde68a':'#ffffff'});g.fillStyle=INK;g.font=`900 ${Math.round(Math.min(r.w*.42,sz(20)))}${FONT}`;mid(g);g.fillText(String(r.v),r.x+r.w/2,r.y+r.h*.3)});
 for(let i=0;i<s.j;i++){const a=sq[n+i-1],b=sq[n+i],ax=a.x+a.w/2,bx=b.x+b.w/2;g.strokeStyle=YES;g.lineWidth=3;g.beginPath();g.moveTo(ax,a.y-3);
  if(a.y===b.y)g.quadraticCurveTo((ax+bx)/2,a.y-A.H*.09,bx,b.y-3);else g.lineTo(bx,b.y-3);g.stroke();
  g.fillStyle=A.col.tx;g.font=`800 ${sz(12)}${FONT}`;g.textAlign='center';g.fillText(String(i+1),(ax+bx)/2,a.y===b.y?a.y-A.H*.07:(a.y+b.y)/2)}
 const f=sq[at-1];emo('🐸',f.x+f.w/2,f.y+f.h*.72,Math.min(f.w*.6,34));tag('Tap the square the frog jumps to',A.W/2,A.H*.92,{n:12})}
function hop(v){const s=S.b;if(s.r>=TRACK.length)return;if(s.won)return nextFrog();const [n,k]=TRACK[s.r],at=n+s.j;
 if(v===at){s.bad=v;A.sound.miss();return tell(`The frog is already on ${at}. That is not a jump. The first jump lands on ${at+1}.`)}
 if(v!==at+1){s.bad=v;A.sound.miss();return tell(`One jump at a time. From ${at} the next square is ${at+1}.`)}
 s.j++;s.bad=null;A.sound.pop();if(s.j<k)return tell(`Jump ${s.j}: ${at+1}.`);s.won=1;tell(`Jump ${k}: ${n+k}. On ${n}, ${k} jumps lands on ${n+k}. Tap Next frog.`)}
function nextFrog(){const s=S.b;s.r++;s.j=0;s.won=0;tell(s.r>=TRACK.length?'All 3 frogs landed. Count the jumps, not the square you start on.':`Frog ${s.r+1}: on ${TRACK[s.r][0]}, jump ${TRACK[s.r][1]}.`)}
/* 3. start from the bigger number */
const pileR=()=>row(2,A.H*.2,A.H*.4,170);
function dotsIn(r,n){const g=A.ctx,cols=n>4?3:2,s=Math.min(r.w/(cols+1),r.h*.16);g.fillStyle='#2563eb';for(let i=0;i<n;i++){g.beginPath();g.arc(r.x+r.w/2+((i%cols)-(cols-1)/2)*s*1.2,r.y+r.h*.55+(Math.floor(i/cols)-1)*s*1.2,s*.42,0,7);g.fill()}}
function drawBig(){const s=S.c;wash();
 if(s.r>=BIG.length){tag('Start from the bigger number: fewer counts',A.W/2,A.H*.12,{ok:1});BIG.forEach(([a,b],j)=>tag(`${b} … ${seq(b,a)} (${a} count${a>1?'s':''}, not ${b})`,A.W/2,A.H*(.34+j*.17),{n:14}));return}
 const pair=BIG[s.r];tag(`Add ${pair[0]} and ${pair[1]}: tap the number to start from`,A.W/2,A.H*.08,{n:13});
 pileR().forEach((r,j)=>{tile(r,null,{no:s.bad===j,ok:s.won&&j===1});const g=A.ctx;g.fillStyle=INK;g.font=`900 ${sz(30)}${FONT}`;mid(g);g.fillText(String(pair[j]),r.x+r.w/2,r.y+r.h*.18);dotsIn(r,pair[j])});
 if(s.line)tag(s.line,A.W/2,A.H*.78,{n:14,bg:'#fef9c3',ok:s.won,no:s.bad!=null})}
function startFrom(j){const s=S.c;if(s.r>=BIG.length)return;if(s.won)return nextPair();const [a,b]=BIG[s.r],from=j?b:a,add=j?a:b,run=seq(from,add);
 s.line=`${from} … ${run}`;
 if(!j){s.bad=0;A.sound.miss();return tell(`From ${a} you must count on ${b}: ${run}. That is ${b} count${b>1?'s':''}. Start from ${b}, the bigger number, instead.`)}
 s.bad=null;s.won=1;A.sound.pop();tell(`${b} … ${run}. Only ${a} count${a>1?'s':''}. ${a} and ${b} is ${a+b}, the same as ${b} and ${a}. Tap Next.`)}
function nextPair(){const s=S.c;s.r++;s.won=0;s.line='';tell(s.r>=BIG.length?'All 3 done. Start from the bigger number: it is quicker and the answer is the same.':`Add ${BIG[s.r][0]} and ${BIG[s.r][1]}. Which number do you start from?`)}
/* 4. the bus: say the total */
const keyR=()=>row(5,A.H*.64,A.H*.13,80).concat(row(5,A.H*.8,A.H*.13,80)).map((r,i)=>({...r,i,v:i+1}));
function drawBus(){const s=S.d,g=A.ctx;wash();
 if(s.r>=BUS.length){tag('3 buses: hold the number, count on',A.W/2,A.H*.12,{ok:1});BUS.forEach(([n,k],j)=>tag(`${n} on the bus, ${k} get on: ${n+k}`,A.W/2,A.H*(.34+j*.17),{n:15}));return}
 const [n,k]=BUS[s.r],bw=Math.min(A.W*.5,260),bx=A.W*.08,by=A.H*.16,bh=A.H*.3;tag(`Bus ${s.r+1} of 3: how many on the bus now?`,A.W/2,A.H*.06,{n:13});
 g.fillStyle='#dc2626';A.paint.rrect(bx,by,bw,bh,16);g.fill();g.fillStyle='#ffffff';A.paint.rrect(bx+bw*.15,by+bh*.18,bw*.7,bh*.5,10);g.fill();
 g.fillStyle=INK;g.font=`900 ${Math.round(bh*.36)}${FONT}`;mid(g);g.fillText(String(n),bx+bw/2,by+bh*.44);
 for(let i=0;i<k;i++)emo('🧍',bx+bw+24+i*Math.min(40,(A.W-bx-bw-40)/Math.max(1,k)),by+bh*.55,Math.min(44,A.H*.14));
 g.fillStyle=A.col.tx;g.font=`800 ${sz(12)}${FONT}`;g.fillText(`${k} waiting`,Math.min(A.W-40,bx+bw+28+(k-1)*16),by+bh+14);
 keyR().forEach(r=>tile(r,r.v,{n:20,no:s.bad===r.v}))}
function board(v){const s=S.d;if(s.r>=BUS.length)return;const [n,k]=BUS[s.r];
 if(v!==n+k){s.bad=v;A.sound.miss();return tell(v===n+k-1?`${v} is one short: you said ${n} for the first person getting on. Keep ${n} in your head; the first new one is ${n+1}.`:v===k?`${k} is only the people getting on. There are ${n} on the bus already: count on from ${n}.`:v===n?`${n} were on before. Count on the ${k} who get on.`:`Hold ${n} in your head, then count one more for each person: ${seq(n,k)}.`)}
 s.r++;s.bad=null;A.sound.pop();tell(`Yes: ${n} … ${seq(n,k)}. ${n+k} on the bus.`+(s.r>=BUS.length?' All 3 buses.':''))}
/* 5. fingers keep track of how many you add */
const fingR=()=>{const w=Math.min(A.W*.11,56),gap=10,x0=(A.W-(5*w+4*gap))/2;return Array.from({length:5},(_,i)=>({i,x:x0+i*(w+gap),y:A.H*.42,w,h:A.H*.3}))};
function drawHands(){const s=S.e,g=A.ctx;wash();
 if(s.r>=FING.length){tag('Your fingers count how many you add',A.W/2,A.H*.12,{ok:1});FING.forEach(([n,k],j)=>tag(`${n} in your head, ${k} fingers: ${n+k}`,A.W/2,A.H*(.34+j*.17),{n:15}));return}
 const [n,k]=FING[s.r],up=s.up;tag(`💭 ${n} in your head. Add ${k}: put up ${k} fingers`,A.W/2,A.H*.08,{n:13,ok:s.won});
 g.fillStyle='#fef9c3';g.beginPath();g.ellipse(A.W/2,A.H*.27,Math.min(A.W*.2,110),A.H*.09,0,0,7);g.fill();g.strokeStyle=EDGE;g.lineWidth=2;g.stroke();
 g.fillStyle=INK;g.font=`900 ${sz(22)}${FONT}`;mid(g);g.fillText([n].concat(Array.from({length:up},(_,i)=>n+i+1)).join(', '),A.W/2,A.H*.27);
 fingR().forEach(r=>{const on=r.i<up,h=on?r.h:r.h*.4;g.fillStyle=on?'#fdba74':'#fed7aa';A.paint.rrect(r.x,r.y+r.h-h,r.w,h,r.w/2);g.fill();g.lineWidth=on?3:1.5;g.strokeStyle=s.bad&&on?NO:on?YES:EDGE;g.stroke();
  if(on){g.fillStyle=INK;g.font=`900 ${sz(14)}${FONT}`;g.fillText(String(n+r.i+1),r.x+r.w/2,r.y+r.h-h+18)}});
 g.fillStyle='#fdba74';A.paint.rrect(fingR()[0].x-6,A.H*.72,fingR()[4].x+fingR()[4].w-fingR()[0].x+12,A.H*.14,20);g.fill();
 tag(s.won?`${n} and ${k} more is ${n+k}`:`Fingers up: ${up}`,A.W/2,A.H*.93,{n:13,ok:s.won,no:s.bad})}
function finger(d){const s=S.e;if(s.r>=FING.length||s.won)return;const [n,k]=FING[s.r];s.up=Math.max(0,Math.min(5,s.up+d));s.bad=s.up>k;A.sound.pop();
 tell(s.up>k?`That is ${s.up} fingers, but you only add ${k}. Put one down.`:s.up?`${n+s.up}. ${s.up} finger${s.up>1?'s':''} up.`:'No fingers up.')}
function checkHands(){const s=S.e;if(s.r>=FING.length)return;if(s.won){s.r++;s.up=0;s.won=0;s.bad=false;return tell(s.r>=FING.length?'All 3 done. Your fingers show how many you have counted on.':`${FING[s.r][0]} in your head. Add ${FING[s.r][1]}.`)}
 const [n,k]=FING[s.r];if(s.up!==k){s.bad=true;A.sound.miss();return tell(s.up<k?`Only ${s.up} up. You add ${k}, so keep going until ${k} fingers are up.`:`${s.up} fingers is too many. You add ${k}.`)}
 s.won=1;s.bad=false;A.sound.pop();tell(`${k} fingers up, and you said ${seq(n,k)}. ${n} and ${k} is ${n+k}. Tap Next.`)}
function draw(){const k=scene();if(k==='quiz'){wash();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('💭 Hold the number · count on',A.W/2,A.H*.5,{n:14});return}
 ({jar:drawJar,track:drawTrack,big:drawBig,bus:drawBus,hands:drawHands})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='jar'){if(within(p,jarR()))holdJar();else if(S.a.won)nextJar();else{const r=S.a.r<TIN.length&&carR(TIN[S.a.r][1]).find(r=>r.i>=S.a.k&&within(p,r));if(r){S.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
 if(k==='track'){const r=sqR().find(r=>within(p,r));if(r)hop(r.v);else if(S.b.won)nextFrog();return false}
 if(k==='big'){const r=pileR().find(r=>within(p,r));if(r)startFrom(r.i);return false}
 if(k==='bus'){const r=keyR().find(r=>within(p,r));if(r)board(r.v);return false}
 if(k==='hands'){const r=fingR().find(r=>within(p,{x:r.x-4,y:r.y,w:r.w+8,h:r.h+A.H*.14}));if(r)finger(r.i<S.e.up?-1:1);return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function drop(p){const d=S.drag;if(!d)return;S.drag=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<10||within(p,jarR()))addCar();else A.redraw()}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{a:{r:0,k:0,held:0,won:0,bad:null},b:{r:0,j:0,won:0,bad:null},c:{r:0,won:0,bad:null,line:''},d:{r:0,bad:null},e:{r:0,up:0,won:0,bad:false},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
const complete=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){reset();tell(desc);S.hook=complete(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='jar'&&S.a.r<TIN.length){if(S.a.won)B('Next jar →',nextJar);else{B('🫙 Say the jar number',holdJar,'Tap the jar: say how many are inside');B('🚗 Count a car',addCar,'Count on one car')}}
 if(k==='track'&&S.b.r<TRACK.length){if(S.b.won)B('Next frog →',nextFrog);else{const at=TRACK[S.b.r][0]+S.b.j;B(`🐸 Jump to ${at+1}`,()=>hop(at+1),`Jump the frog to ${at+1}`);B(`Stay on ${at}`,()=>hop(at),`Count the square the frog is on, ${at}`)}}
 if(k==='big'&&S.c.r<BIG.length){if(S.c.won)B('Next →',nextPair);else BIG[S.c.r].forEach((v,j)=>B(`Start from ${v}`,()=>startFrom(j)))}
 if(k==='bus'&&S.d.r<BUS.length)for(let v=1;v<=10;v++)B(String(v),()=>board(v),`${v} on the bus`);
 if(k==='hands'&&S.e.r<FING.length){if(!S.e.won){B('☝️ Finger up',()=>finger(1),'Put one more finger up');B('Finger down',()=>finger(-1),'Put one finger down')}B(S.e.won?'Next →':'✔ Check',checkHands,S.e.won?'Next':'Check my fingers')}}
const steps=[
{h:'Hide them in a jar',p:'The cars in the jar are hiding, so you cannot count them again. Tap the jar to say its number. Then drag or tap each car outside into the jar to count on.',
 task:'Count on for 3 jars',show:()=>auto(0,TIN.flatMap(([n,k])=>[()=>holdJar()].concat(Array.from({length:k},()=>()=>addCar()),[()=>nextJar()])),300),
 go:()=>open(0,'A jar with 5 cars inside, and 2 cars outside.',()=>S.a.r>=TIN.length,'You said the jar number, then one more number for each car. You never counted the hidden cars from one.')},
{h:'Frog on a track',p:'The frog sits on a number. Tap the square it jumps to, one jump at a time. Count the jumps, not the square it starts on.',
 predict:{q:'The frog is on 4. It jumps 3 times. Where does it land?',opts:['6','7'],ans:1},task:'Land 3 frogs',
 show:()=>auto(1,TRACK.flatMap(([n,k])=>Array.from({length:k},(_,i)=>()=>hop(n+i+1)).concat([()=>nextFrog()])),330),
 go:()=>open(1,'A number track from 1 to 10. The frog is on 4. It jumps 3.',()=>S.b.r>=TRACK.length,'On 4, 3 jumps lands on 7, not 6. The square you start on is not a jump.')},
{h:'Start from the bigger number',p:'Two groups to add. Tap the number you start from. Starting from the bigger one means fewer counts.',
 predict:{q:'Is 2 and 6 the same as 6 and 2?',opts:['No, 2 and 6 is less','Yes, both make 8'],ans:1},task:'Pick the bigger start 3 times',
 show:()=>auto(2,BIG.flatMap(()=>[()=>startFrom(1),()=>nextPair()]),600),
 go:()=>open(2,'Add 2 and 6. Two cards: 2 dots and 6 dots.',()=>S.c.r>=BIG.length,'2 and 6 makes 8, the same as 6 and 2. From 6 you only count 7, 8.')},
{h:'On the bus',p:'Some people are on the bus. More get on. Tap how many are on the bus now.',
 task:'Get 3 buses right',show:()=>auto(3,BUS.map(([n,k])=>()=>board(n+k)),650),
 go:()=>open(3,'A bus with 7 people. 2 more are waiting.',()=>S.d.r>=BUS.length,'7 … 8, 9. The first person getting on is 8, not 7.')},
{h:'Count on your fingers',p:'Keep the number in your head. Put up one finger for each number you add, and stop when you have added enough.',
 task:'Do 3 with your fingers',show:()=>auto(4,FING.flatMap(([n,k])=>Array.from({length:k},()=>()=>finger(1)).concat([()=>checkHands(),()=>checkHands()])),300),
 go:()=>open(4,'8 in your head. Add 2.',()=>S.e.r>=FING.length,'Your fingers tell you when to stop: 2 fingers for adding 2.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
function why(t){let m='Say the first number, then count on one more for each one you add.';
 if(t==='from')m='You said the first number again. Keep it in your head; the first new one is one more.';
 if(t==='all')m='That is only the ones you add. Start from the first number and count on.';
 if(t==='jump')m='The square you start on is not a jump. Count the jumps.';
 if(t==='small')m='You can, but it takes longer. Start from the bigger number.';
 if(t==='turn')m='The order does not change the total. 3 and 6 is 9, and 6 and 3 is 9.';
 if(t==='fingers')m='Your fingers count only the ones you add, not the number in your head.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizEl.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(t,a){quizEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:X=>{quizEl.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting on buttons'},w);quizEl=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:drop});buttons()}}).start()})})();
