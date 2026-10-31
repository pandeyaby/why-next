/* Flagship – day, night and the seasons (ages 4–5): sort the sun, moon, stars and a rainbow into the day sky or the
   night sky, drag the sun across the sky from morning to midday to evening until night falls, put my day in order
   (morning, afternoon, night), go round the seasons wheel (winter, spring, summer, autumn), then match each clue to
   its season. Drag on the picture, or tap the big buttons. */
(()=>{
const SKY=[['☀️','the sun',[0],'We see the sun in the day. At night it is shining on the other side of the world.'],
 ['⭐','the stars',[1],'Stars are there in the day too, but the bright sun hides them. We see them at night.'],
 ['🌈','a rainbow',[0],'A rainbow needs sunshine and rain, so we see it in the day.'],
 ['🌙','the moon',[0,1],'We see the moon best at night. Sometimes we can see it in the day too!']];
const TIMES=[['🌅','Morning'],['🌤️','Afternoon'],['🌙','Night']];
const MYDAY=[['⏰','Wake up and eat breakfast',0],['🛝','Play in the park after lunch',1],['🛁','Have a bath and put on pyjamas',2],['🛏️','Go to sleep in bed',2]];
const SEAS=[['❄️','Winter','cold'],['🌷','Spring','getting warmer'],['☀️','Summer','warm and sunny'],['🍂','Autumn','getting colder']];
const CLUES=[['⛄','Snow and frosty mornings',0],['🐣','New flowers and baby lambs',1],['🏖️','Hot sun and long, light days',2],['🍁','Leaves fall off the trees',3],['🧣','Wear a hat, scarf and gloves',0],['🧴','Sun cream and a sun hat',2]];
const STOPS=[['morning',.08,.3],['midday',.38,.62],['evening',.72,.97],['night',1.03,2]];
VIS.reg('flagsky',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,deck:[],placed:[],drag:null,sun:0,stage:0,wheel:1,hit:-1,bad:-1,note:''}),S=fresh();
const mode=()=>['sort','sun','day','wheel','match','quiz'][A.step],fast=()=>A.reduced();
const fz=n=>Math.round(n*(A.narrow?1:1.15)),say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({sort:4,sun:4,day:4,wheel:3,match:4}[mode()]||9);
function txt(g,t,x,y,n,col,wt,mw){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y-10&&p.y<r.y+r.h+10;
const tray=()=>({x:A.W/2,y:A.H*.86});
/* ---- day sky or night sky ---- */
const half=i=>({x:A.W/2*i+6,y:A.H*.04,w:A.W/2-12,h:A.H*.66});
/* ---- three times of day ---- */
const col3=i=>{const w=A.W/3;return{x:w*i+5,y:A.H*.04,w:w-10,h:A.H*.66}};
/* ---- seasons wheel: winter at the top, then round clockwise ---- */
const wc=()=>({x:A.W/2,y:A.H*.38,R:Math.min(A.W*.3,A.H*.27)});
function slot(i){const o=wc(),a=-Math.PI/2+i*Math.PI/2,w=Math.min(A.W*.26,124),h=A.H*.18;return{x:o.x+o.R*Math.cos(a)-w/2,y:o.y+o.R*Math.sin(a)-h/2,w,h,cx:o.x+o.R*Math.cos(a),cy:o.y+o.R*Math.sin(a)}}
const zones=()=>({sort:[0,1].map(half),day:[0,1,2].map(col3),wheel:[0,1,2,3].map(slot),match:[0,1,2,3].map(slot)}[mode()]||[]);
function card(g,item,p,state){const C=A.col,w=Math.min(A.W*.8,330),h=A.H*.12;const r={x:p.x-w/2,y:p.y-h/2,w,h};
 box(g,r,C.dark?'#1e293b':'#fff',state==='no'?C.rd:A.mix(C.tx,C.pn,.4),state==='no'?4:2);emo(g,item[0],r.x+h*.55,p.y,h*.6);txt(g,item[1],p.x+h*.3,p.y,14,C.tx,800,w-h*1.3)}
function tick(g,x,y){g.strokeStyle=A.col.dark?'#4ade80':'#15803d';g.lineWidth=4;g.beginPath();g.moveTo(x-7,y);g.lineTo(x-2,y+6);g.lineTo(x+8,y-7);g.stroke()}
function drawSort(g){const C=A.col;[0,1].forEach(i=>{const r=half(i),night=i===1;box(g,r,night?'#1e1b4b':'#bae6fd',i===S.hit?C.vi:A.mix(C.tx,C.pn,.5),i===S.hit?5:2);
  txt(g,night?'Night sky':'Day sky',r.x+r.w/2,r.y+22,16,night?'#f8fafc':'#0c4a6e');
  S.placed.filter(p=>p.at===i).forEach((p,j)=>{emo(g,SKY[p.k][0],r.x+r.w*(.25+.5*(j%2)),r.y+r.h*(.38+.3*Math.floor(j/2)),Math.min(r.w*.28,52))})});
 const k=S.deck[0];if(k!=null){const d=S.drag&&S.drag.x!=null?S.drag:tray();card(g,SKY[k],d,S.bad===k?'no':'')}}
/* the sun's path: s from 0 (sunrise, left) to 1 (sunset, right); past 1 it is under the ground and it is night */
const arc=()=>({cx:A.W/2,gy:A.H*.74,rx:A.W*.38,ry:A.H*.58});
function sunAt(s){const a=arc(),t=Math.min(s,1);return{x:a.cx-a.rx*Math.cos(Math.PI*t),y:a.gy-a.ry*Math.sin(Math.PI*t)+(s>1?(s-1)*A.H*.6:0)}}
const stopOf=s=>STOPS.findIndex(([,a,b])=>s>=a&&s<=b);
function drawSun(g){const C=A.col,a=arc(),h=S.sun>1?0:Math.sin(Math.PI*S.sun),night=S.sun>1.02;
 g.fillStyle=night?'#0f172a':A.mix('#fdba74','#7dd3fc',Math.min(1,h*1.6));g.fillRect(0,0,A.W,a.gy);
 if(night){for(let i=0;i<14;i++){const x=(i*97%A.W),y=(i*53%Math.round(a.gy*.8))+8;g.fillStyle='#fef9c3';g.beginPath();g.arc(x,y,2,0,7);g.fill()}emo(g,'🌙',A.W*.78,a.gy*.25,34)}
 g.setLineDash([5,6]);g.strokeStyle=night?'#cbd5e1':'#0c4a6e';g.lineWidth=1.5;g.beginPath();g.ellipse(a.cx,a.gy,a.rx,a.ry,0,Math.PI,2*Math.PI);g.stroke();g.setLineDash([]);
 if(!night){const p=sunAt(S.sun);A.paint.glow('#fde047',22);A.paint.ball(p.x,p.y,Math.min(A.W*.06,30),'#f59e0b');A.paint.noShadow()}
 g.fillStyle=C.dark?'#14532d':'#4d7c0f';g.fillRect(0,a.gy,A.W,A.H-a.gy);
 const hx=a.cx,hy=a.gy,hw=Math.min(A.W*.16,80);g.fillStyle='#fef3c7';g.fillRect(hx-hw/2,hy-hw*.7,hw,hw*.7);g.fillStyle='#b91c1c';g.beginPath();g.moveTo(hx-hw*.62,hy-hw*.7);g.lineTo(hx,hy-hw*1.15);g.lineTo(hx+hw*.62,hy-hw*.7);g.fill();
 g.fillStyle=night?'#facc15':'#1e3a8a';g.fillRect(hx-hw*.3,hy-hw*.5,hw*.22,hw*.2);g.fillRect(hx+hw*.08,hy-hw*.5,hw*.22,hw*.2);
 ['morning','midday','evening'].forEach((w,i)=>{const p=sunAt([.12,.5,.88][i]);txt(g,w,p.x,p.y+(i===1?44:-38),12,night?'#f8fafc':'#0c4a6e',800,90)});
 txt(g,night?'Night: it is dark':S.stage>0?'Drag the sun on':'Drag the sun up',A.W/2,a.gy+(A.H-a.gy)/2,14,'#fff')}
function drawCols(g){const C=A.col,fill=['#fed7aa','#bae6fd','#1e1b4b'];[0,1,2].forEach(i=>{const r=col3(i);box(g,r,fill[i],i===S.hit?C.vi:A.mix(C.tx,C.pn,.5),i===S.hit?5:2);
  emo(g,TIMES[i][0],r.x+r.w/2,r.y+24,26);txt(g,TIMES[i][1],r.x+r.w/2,r.y+52,13,i===2?'#f8fafc':'#0f172a',800,r.w-6);
  S.placed.filter(p=>p.at===i).forEach((p,j)=>emo(g,MYDAY[p.k][0],r.x+r.w/2,r.y+r.h*(.5+.22*j),Math.min(r.w*.3,40)))});
 const k=S.deck[0];if(k!=null){const d=S.drag&&S.drag.x!=null?S.drag:tray();card(g,MYDAY[k],d,S.bad===k?'no':'')}}
function drawWheel(g){const C=A.col,o=wc();g.strokeStyle=A.mix(C.tx,C.pn,.45);g.lineWidth=3;g.beginPath();g.arc(o.x,o.y,o.R,0,7);g.stroke();
 for(let i=0;i<4;i++){const a=-Math.PI/2+i*Math.PI/2+Math.PI/4,x=o.x+o.R*Math.cos(a),y=o.y+o.R*Math.sin(a),t=a+Math.PI/2;g.fillStyle=C.tx;g.beginPath();g.moveTo(x+9*Math.cos(t),y+9*Math.sin(t));g.lineTo(x+9*Math.cos(t+2.4),y+9*Math.sin(t+2.4));g.lineTo(x+9*Math.cos(t-2.4),y+9*Math.sin(t-2.4));g.fill()}
 txt(g,'round and round',o.x,o.y,12,C.mu,700,o.R*1.2);
 for(let i=0;i<4;i++){const r=slot(i),on=i<S.wheel,nx=mode()==='wheel'&&i===S.wheel;box(g,r,on?A.mix(C.pn,['#bfdbfe','#bbf7d0','#fde68a','#fed7aa'][i],C.dark?.25:.7):C.pn,i===S.hit?C.vi:nx?C.vi:A.mix(C.tx,C.pn,.5),i===S.hit||nx?4:2);
  if(on){emo(g,SEAS[i][0],r.cx,r.cy-r.h*.18,Math.min(r.h*.42,34));txt(g,SEAS[i][1],r.cx,r.cy+r.h*.26,13,C.tx,800,r.w-6)}else txt(g,nx?'next?':'?',r.cx,r.cy,15,C.mu)}
 const k=S.deck[0];if(k!=null){const d=S.drag&&S.drag.x!=null?S.drag:tray(),it=mode()==='wheel'?[SEAS[k][0],SEAS[k][1]]:CLUES[k];card(g,it,d,S.bad===k?'no':'')}
 if(mode()==='match')S.placed.forEach(p=>{const r=slot(p.at);tick(g,r.x+r.w-12,r.y+12)})}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#f0f9ff',C.dark?.04:.4);g.fillRect(0,0,W,H);const m=mode();
 if(m==='sort')drawSort(g);if(m==='sun')drawSun(g);if(m==='day')drawCols(g);if(m==='wheel'||m==='match'||m==='quiz'){S.wheel=m==='wheel'?S.wheel:4;drawWheel(g)}
 if(S.note&&m!=='sun')txt(g,S.note,W/2,H*.75,13,C.tx,700);A.fx.draw(g)}
function flash(i){S.hit=i;const v=ver;setTimeout(()=>{if(v===ver){S.hit=-1;A.redraw()}},420)}
function miss(t){A.sound.miss();say(t);A.redraw()}
/* drop the waiting card into zone i */
function put(i){const m=mode(),k=S.deck[0];if(k==null||S.won>=need())return;flash(i);
 if(m==='sort'){const it=SKY[k];if(!it[2].includes(i)){S.bad=k;return miss(i?`Not at night. ${it[3]}`:`Not in the day. ${it[3]}`)}ok(i,`Yes! ${it[3]}`)}
 if(m==='day'){const it=MYDAY[k];if(it[2]!==i){S.bad=k;return miss(it[2]===0?`${it[1]}: that is how the day starts, in the morning.`:it[2]===1?`${it[1]}: lunch is in the middle of the day, so this is the afternoon.`:`${it[1]}: we do that at the end of the day, at night, when it is dark.`)}ok(i,`Yes! ${TIMES[i][1]}: ${it[1].toLowerCase()}.`)}
 if(m==='wheel'){if(i!==S.wheel)return miss(`Put it in the next box, the one after ${SEAS[S.wheel-1][1].toLowerCase()}.`);if(k!==S.wheel){S.bad=k;const v=ver;setTimeout(()=>{if(v===ver&&S.deck[0]===k){S.deck.push(S.deck.shift());S.bad=-1;keys();A.redraw()}},fast()?10:900);return miss(`${SEAS[k][1]} does not come next. After ${SEAS[S.wheel-1][1].toLowerCase()} comes ${SEAS[S.wheel][1].toLowerCase()}.`)}
  S.wheel++;ok(i,S.wheel<4?`Yes! After ${SEAS[i-1][1].toLowerCase()} comes ${SEAS[i][1].toLowerCase()}.`:'Yes! Autumn, and then winter comes round again.')}
 if(m==='match'){const it=CLUES[k];if(it[2]!==i){S.bad=k;return miss(`${it[1]}? Not ${SEAS[i][1].toLowerCase()}. ${SEAS[i][1]} is ${SEAS[i][2]}. Think again.`)}ok(i,`Yes! ${it[1]}: that is ${SEAS[i][1].toLowerCase()}, when it is ${SEAS[i][2]}.`)}}
function ok(i,t){S.placed.push({k:S.deck.shift(),at:i});S.bad=-1;S.won++;A.sound.pop();say(t);keys();A.redraw();S.want()}
/* the sun step: move to s and check the next stop */
function moveSun(s){S.sun=Math.max(0,Math.min(1.12,s));const z=stopOf(S.sun);if(z>=0&&z===S.stage){S.stage++;S.won++;A.sound.pop();
  say(['Morning! The sun comes up low in the sky. That is sunrise.','Midday! The sun is high up in the sky.','Evening! The sun is low again. That is sunset.','Night! Our sky is dark. The sun did not go to sleep. It is shining on the other side of the world.'][z]);keys();S.want()}A.redraw()}
function jump(z){if(mode()!=='sun'||S.won>=need())return;if(z!==S.stage)return miss(['First comes morning, when the sun comes up.','After morning comes midday.','After midday comes evening.','After evening comes night.'][S.stage]);
 const[,a,b]=STOPS[z];const to=z===3?1.1:(a+b)/2,from=S.sun,v=ver;let t=0;const f=()=>{if(v!==ver)return;t+=fast()?1:.12;moveSun(from+(to-from)*Math.min(1,t));if(t<1)requestAnimationFrame(f)};f()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.won>=need())return;const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='sun')return STOPS.forEach(([w],z)=>B(['🌅','☀️','🌇','🌙'][z]+' '+w[0].toUpperCase()+w.slice(1),`Move the sun to ${w}`,()=>jump(z)));
 if(S.deck[0]==null)return;
 if(m==='sort')[['☀️ Day sky',0],['🌙 Night sky',1]].forEach(([t,i])=>B(t,`Put it in the ${t.slice(2).toLowerCase()}`,()=>put(i)));
 if(m==='day')TIMES.forEach(([e,n],i)=>B(e+' '+n,`Put it in ${n.toLowerCase()}`,()=>put(i)));
 if(m==='wheel')[1,2,3].filter(k=>S.deck.includes(k)).forEach(k=>B(SEAS[k][0]+' '+SEAS[k][1],`${SEAS[k][1]} goes next`,()=>{S.deck=[k,...S.deck.filter(x=>x!==k)];put(S.wheel)}));
 if(m==='match')SEAS.forEach(([e,n],i)=>B(e+' '+n,`It is ${n.toLowerCase()}`,()=>put(i)))}
function down(p){const m=mode();if(m==='quiz'||S.won>=need())return false;
 if(m==='sun'){const s=sunAt(S.sun);if(Math.hypot(p.x-s.x,p.y-s.y)<64||S.sun>1){S.drag={sun:1};return true}return false}
 if(m==='wheel'){const t=tray();if(Math.abs(p.y-t.y)<A.H*.08&&S.deck.length){S.drag={x:null,x0:p.x,y0:p.y};return true}return false}
 const t=tray();if(S.deck.length&&Math.abs(p.y-t.y)<A.H*.08&&Math.abs(p.x-t.x)<A.W*.42){S.drag={x:null,x0:p.x,y0:p.y};return true}
 const i=zones().findIndex(r=>inside(p,r));if(i>=0&&S.deck.length)put(i);return false}
function move(p){const d=S.drag;if(!d)return;if(d.sun){const a=arc();return moveSun((p.x-(a.cx-a.rx))/(2*a.rx))}if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d||d.sun)return A.redraw();const i=zones().findIndex(r=>inside(p,r));if(d.x==null||i<0){say('Drag the card up into a box, or tap a button.');return A.redraw()}put(i)}
const ready=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const wipe=(deck,note,extra)=>{ver++;Object.assign(S,fresh(),{deck,note:note||''},extra||{})};
const steps=[
{h:'Day sky or night sky?',p:'Here are things we can see in the sky. Drag each one to the day sky or the night sky.',predict:{q:'When can we see the stars?',opts:['In the day','At night'],ans:1},task:'Sort 4 sky things',
 show:()=>{steps[0].go();play([()=>put(0),()=>put(1),()=>put(0),()=>put(1)],450)},go:()=>{wipe([0,1,2,3],'');say('Day sky or night sky? Drag the sun.');keys();S.want=ready(0,()=>S.won>=4,'In the day we see the sun. At night we see the moon and stars.')}},
{h:'The sun across the sky',p:'Drag the sun from morning, up to midday, down to evening, and on until it is night.',predict:{q:'At night, where does the sun go?',opts:['It goes to sleep','It shines on the other side of the world'],ans:1},task:'Go from morning to night',
 show:()=>{steps[1].go();play([()=>jump(0),()=>jump(1),()=>jump(2),()=>jump(3)],700)},go:()=>{wipe([],'',{sun:0});say('The sun is just coming up. Drag it across the sky.');keys();S.want=ready(1,()=>S.won>=4,'The sun comes up in the morning, is high at midday, goes down in the evening, and then it is night.')}},
{h:'My day',p:'When do you do these things? Drag each card to morning, afternoon or night.',task:'Put 4 things in order',
 show:()=>{steps[2].go();play(MYDAY.map(d=>()=>put(d[2])),450)},go:()=>{wipe([0,1,2,3],'');say('When do you wake up? Drag the card.');keys();S.want=ready(2,()=>S.won>=4,'Morning comes first, then afternoon, then night. Then morning again!')}},
{h:'The seasons go round',p:'A year has four seasons. Winter is at the top. Which season comes next? Drag it to the next box.',predict:{q:'What comes after winter?',opts:['Summer','Spring'],ans:1},task:'Put 3 seasons in order',
 show:()=>{steps[3].go();play([1,2,3].map(k=>()=>{S.deck=[k,...S.deck.filter(x=>x!==k)];put(S.wheel)}),500)},go:()=>{wipe([2,3,1],'');say('Winter is first. Which season comes next?');keys();S.want=ready(3,()=>S.won>=3,'Winter, spring, summer, autumn, and round again to winter.')}},
{h:'What is it like?',p:'Each season has its own weather. Drag each card to its season.',task:'Match 4 cards',
 show:()=>{steps[4].go();play([0,1,2,3].map(k=>()=>put(CLUES[k][2])),450)},go:()=>{wipe([0,1,2,3,4,5],'');say('Snow and frosty mornings. Which season is that?');keys();S.want=ready(4,()=>S.won>=4,'Winter is cold. Spring brings flowers. Summer is warm. In autumn the leaves fall.')}},
{h:'Challenge',p:'',go:()=>{wipe([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What can we see in the sky at night?',[['The moon and stars','ok'],['A rainbow','rainbow'],['The sun','sunnight']]],
 ['Where does the sun go at night?',[['It shines on the other side of the world','ok'],['It goes to bed','sleep'],['It breaks','gone']]],
 ['What do we do in the morning?',[['Wake up and have breakfast','ok'],['Go to sleep in bed','night'],['Put on pyjamas','night']]],
 ['What comes after winter?',[['Spring','ok'],['Summer','skip'],['Winter again','again']]],
 ['Which season is cold, with frost or snow?',[['Winter','ok'],['Summer','hot'],['Spring','warmer']]]];
function hint(t){let m='Look back at the lab: the sky, the sun and the seasons wheel.';
 if(t==='rainbow')m='A rainbow needs sunshine and rain, so we see it in the day. At night we see the moon and stars.';
 if(t==='sunnight')m='At night our side of the world is dark. The sun is shining on the other side of the world.';
 if(t==='sleep')m='The sun is not alive, so it does not sleep. It is still shining, on the other side of the world.';
 if(t==='gone')m='The sun does not break. Every morning it comes up again.';
 if(t==='night')m='We do that at night, at the end of the day. In the morning we wake up.';
 if(t==='skip')m='Summer is two steps on. Spring comes first, after winter. Then summer.';
 if(t==='again')m='The seasons go round: winter, spring, summer, autumn. Then winter comes again.';
 if(t==='hot')m='Summer is the warm season. Winter is the cold one.';
 if(t==='warmer')m='In spring it gets warmer and flowers grow. Winter is the cold one.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes! Well done.':'✗ '+hint(t)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
