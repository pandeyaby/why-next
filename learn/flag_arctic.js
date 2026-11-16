/* Flagship: Inuit and Sami peoples (ages 7–9; topic evidence: name the Inuit (Canada, Alaska, Greenland) and Sami (northern
   Scandinavia) as Arctic Indigenous peoples, describe dog sleds, kayaks, skin clothing and snow houses, and explain that their
   knowledge of the land grew over thousands of years). Tap the Arctic lands each people call home, pick the right way to
   travel, use every part of a seal, dress a hunter for minus 30, build a snow house with a low tunnel, and sort true from
   not true about life today. Every tap and drag has a button too. */
(()=>{
const {PEOPLE,LANDS,LANDWHY,TRAVEL,BOXES,SEAL,WEAR,MYTH,BANK,WHY}=ARCTICART;
const Q={ink:'#111827',soft:'#374151',card:'#fffdf8',edge:'#1f2937',tip:'#eef2ff',ok:'#166534',okBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',
 sea:'#dbeafe',seaE:'#1e40af',land:'#e7e5e4',snow:'#f8fafc',block:'#e0f2fe',blockE:'#0369a1',fur:'#d6b98c',furE:'#78350f',lamp:'#f59e0b'};
VIS.reg('flagarctic',c=>{let A,X,bar,chal,qn=-1,seq=0,streak=0;const S={after:()=>{}};
const fs=n=>Math.round(n*(A.narrow?1.06:1.14));
function voice(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function txt(s,x,y,n,col,wt,al){X.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n){X.font=`800 ${fs(n)}px system-ui,sans-serif`;const out=[];let row='';for(const t of String(s).split(' ')){const nx=row?row+' '+t:t;if(row&&X.measureText(nx).width>w){out.push(row);row=t}else row=nx}out.push(row);return out}
function pill(x,y,w,h,fill,edge,lw,r){A.paint.rrect(x,y,w,h,r||12);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function inBox(s,R,n,col){const L=lines(s,R.w-fs(14),n),lh=fs(n)+4;L.forEach((t,i)=>txt(t,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,n,col))}
const on=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function head(s,won){const L=lines(s,A.W-44,15),lh=fs(15)+4,h=Math.max(fs(38),L.length*lh+12);pill(12,10,A.W-24,h,won?Q.okBg:Q.tip,won?Q.ok:Q.edge,2);L.forEach((t,i)=>txt(t,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,15,won?Q.ok:Q.ink));return 10+h}
function foot(){if(!S.msg)return 0;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-44,13),lh=fs(13)+5,h=L.length*lh+12,y=A.H-h-10;pill(12,y,A.W-24,h,'#ffffff',S.bad?Q.bad:Q.ok,3);L.forEach((t,i)=>txt(t,A.W/2,y+6+lh*(i+.5),13,S.bad?Q.bad:Q.ink));return h+14}
const wrong=s=>{S.bad=true;S.msg=s;A.sound.miss();tell()};
const right=s=>{S.bad=false;S.msg=s;A.sound.pop()};
const mode=()=>['map','travel','seal','wear','igloo','myth','quiz'][A.step];
/* ---------- step 0: tap the homelands ---------- */
function tapLand(i){if(S.won)return;const [name,who]=LANDS[i];if(S.found.includes(i))return;
 if(who<0)return wrong(LANDWHY.nobody);if(who!==S.who)return wrong(`${name} is a ${PEOPLE[who]} land. Find the ${PEOPLE[S.who]} lands first.`);
 S.found.push(i);right(`${name}: ${LANDWHY[who]}`);const left=LANDS.filter((l,k)=>l[1]===S.who&&!S.found.includes(k)).length;
 if(!left&&S.who===0){S.who=1;S.msg='All 3 Inuit lands found. Now find the 3 Sami lands.'}else if(!left){S.won=true;S.msg='Inuit and Sami peoples have lived in the Arctic for thousands of years. They are still there today.'}tell()}
function drawMap(t0,b0){const h=b0-t0,cx=A.W/2,cy=t0+h*.45,r=Math.min(A.W*.13,h*.17);X.fillStyle=Q.sea;X.beginPath();X.arc(cx,cy,r,0,7);X.fill();X.strokeStyle=Q.seaE;X.lineWidth=2;X.stroke();
 txt('Arctic Ocean',cx,cy-fs(9),12,Q.seaE,900);txt('North Pole ✕',cx,cy+fs(10),12,Q.ink,900);const bw=Math.min(fs(150),A.W*.3),bh=fs(52);S.landR=LANDS.map(([name,who,fx,fy],i)=>{
  const R={x:Math.max(14,Math.min(A.W-14-bw,fx*A.W-bw/2)),y:t0+fy*(h-bh),w:bw,h:bh,i},got=S.found.includes(i);pill(R.x,R.y,R.w,R.h,got?(who?'#fef3c7':Q.okBg):who<0?Q.snow:Q.land,got?Q.ok:Q.edge,got?3:2);
  inBox(got?`${name}: ${PEOPLE[who]}`:name,R,12,Q.ink);return R})}
/* ---------- steps 1, 2 and 5: one card, several boxes ---------- */
const deck=()=>({travel:TRAVEL,seal:SEAL,myth:MYTH})[mode()];
const bins=()=>BOXES[mode().toUpperCase()];
function place(b){if(S.won)return;const D=deck(),card=D[S.at];if(b!==card[1])return wrong(card[2]);right(card[2]);S.at++;
 if(S.at>=D.length){S.won=true;S.msg={travel:'Dog sleds on the ice, kayaks on the water, reindeer sleds on the snow.',seal:'Food, light, heat, clothes, boats and tools: one seal gave all of these.',myth:'Inuit and Sami are living peoples, with their own languages and ways of life.'}[mode()]}tell()}
function drawDeck(t0,b0){const B=bins(),n=B.length,cols=n===4&&A.narrow?2:n,rows=Math.ceil(n/cols),g=fs(8),bw=(A.W-28-g*(cols-1))/cols,bh=Math.min(fs(78),(b0-t0)*.22),top=b0-rows*bh-(rows-1)*g;
 S.binR=B.map((s,i)=>{const R={x:14+(i%cols)*(bw+g),y:top+Math.floor(i/cols)*(bh+g),w:bw,h:bh,i};pill(R.x,R.y,R.w,R.h,['#dcfce7','#dbeafe','#fef3c7','#fce7f3'][i],Q.edge,2.5);inBox(s,R,14,Q.ink);return R});
 const D=deck();if(S.won){const rows=D.flatMap(k=>lines(`${bins()[k[1]]}: ${k[0]}`,A.W-fs(40),11)),lh=fs(15),y0=t0+Math.max(fs(6),(top-t0-rows.length*lh)/2);rows.forEach((r,i)=>txt(r,A.W/2,y0+i*lh,11,Q.ink,800))}if(S.at<D.length){const cw=Math.min(A.W-36,fs(360)),L=lines(D[S.at][0],cw-fs(20),16),ch=L.length*(fs(16)+5)+fs(28),home={x:(A.W-cw)/2,y:t0+(top-t0-ch)/2,w:cw,h:ch},d=S.drag;S.cardR=home;
  const R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:home;pill(R.x,R.y,R.w,R.h,'#ffffff',d?Q.seaE:Q.edge,3);inBox(D[S.at][0],R,16,Q.ink);txt(`Card ${S.at+1} of ${D.length}`,A.W/2,Math.max(t0+fs(8),home.y-fs(12)),12,Q.soft,800)}}
/* ---------- step 3: dress for minus 30 ---------- */
const need=WEAR.filter(w=>w[1]).length;
function wear(i){if(S.won||S.worn.includes(i))return;const [item,warm,why]=WEAR[i];if(!warm)return wrong(why);S.worn.push(i);right(why);
 if(S.worn.length>=need){S.won=true;S.msg='Two fur layers, dry boots, mittens and goggles: ready for a day on the ice at minus 30 °C.'}tell()}
function drawWear(t0,b0){const g=fs(6),cols=2,ch=fs(46),rows=Math.ceil(WEAR.length/cols),top=b0-rows*ch-(rows-1)*g,cw=(A.W-28-g)/cols;
 const has=k=>S.worn.includes(k),fx=A.W*.32,fy=t0+fs(8),fh=Math.max(fs(60),top-fy-fs(14));
 X.lineWidth=2;X.strokeStyle=Q.edge;X.fillStyle=has(2)?Q.fur:has(0)?'#f5e1c0':'#fde68a';X.beginPath();X.ellipse(fx,fy+fh*.42,fh*.2,fh*.3,0,0,7);X.fill();X.stroke();
 X.fillStyle='#fcd9b6';X.beginPath();X.arc(fx,fy+fh*.12,fh*.1,0,7);X.fill();X.stroke();if(has(6)){X.fillStyle=Q.edge;X.fillRect(fx-fh*.08,fy+fh*.1,fh*.16,fh*.035)}
 X.fillStyle=has(3)?Q.furE:'#9ca3af';X.fillRect(fx-fh*.15,fy+fh*.76,fh*.12,fh*.16);X.fillRect(fx+fh*.03,fy+fh*.76,fh*.12,fh*.16);
 if(has(5)){X.fillStyle=Q.furE;X.beginPath();X.arc(fx-fh*.24,fy+fh*.5,fh*.05,0,7);X.arc(fx+fh*.24,fy+fh*.5,fh*.05,0,7);X.fill()}
 const tx=A.W*.66,tw=fs(26),ty=fy+fs(18),th=fh-fs(30),f=S.worn.length/need;pill(tx-tw/2,ty,tw,th,'#ffffff',Q.edge,2,10);X.fillStyle=f>=1?Q.ok:'#2563eb';X.fillRect(tx-tw/2+5,ty+th-5-(th-10)*f,tw-10,(th-10)*f);
 txt('Warm',tx+tw,ty+fs(6),12,Q.ok,900,'left');txt('Freezing',tx+tw,ty+th-fs(6),12,Q.soft,900,'left');txt('Outside: −30 °C',A.W/2,fy,12,Q.soft,900);
 S.wearR=WEAR.map(([s],i)=>{const R={x:14+(i%cols)*(cw+g),y:top+Math.floor(i/cols)*(ch+g),w:cw,h:ch,i};pill(R.x,R.y,R.w,R.h,has(i)?Q.okBg:'#ffffff',has(i)?Q.ok:Q.edge,2,10);inBox(s,R,12,Q.ink);return R})}
/* ---------- step 4: build a snow house ---------- */
const INSIDE=['Inside: as cold and windy as outside','Inside: out of the wind, but still very cold','Inside: the cold air sinks into the tunnel','Inside: warm enough to go above freezing by the bench'];
function addRing(){if(S.won)return;if(S.rings>=4)return wrong('The dome is closed. Now choose where the door goes.');S.rings++;right(S.rings<4?`Ring ${S.rings} of 4. Each ring of snow blocks leans in a bit more.`:'The dome is closed at the top. Where does the door go?');tell()}
function door(low){if(S.won)return;if(S.rings<4)return wrong('Build all 4 rings of snow blocks first.');if(S.door)return;
 if(!low)return wrong('Warm air rises. A door up high lets all the warm air escape.');S.door=1;right('A low tunnel. Cold air sinks into it and stays there, below the sleeping bench.');tell()}
function lamp(){if(S.won)return;if(!S.door)return wrong(S.rings<4?'Build the dome first.':'Put in the door first, or the warm air will escape.');S.won=true;
 S.msg='The qulliq lamp burns seal oil. With people inside too, it can be above freezing in the snow house while it is −30 °C outside.';tell()}
function drawIgloo(t0,b0){const gy=b0-fs(16),cx=A.W*.42,R=Math.min(A.W*.3,(gy-t0)*.82);X.fillStyle=Q.snow;X.fillRect(14,gy,A.W-28,fs(12));X.strokeStyle=Q.edge;X.lineWidth=2;X.beginPath();X.moveTo(14,gy);X.lineTo(A.W-14,gy);X.stroke();
 for(let k=0;k<S.rings;k++){const a0=Math.PI*(k/4)*.5,a1=Math.PI*((k+1)/4)*.5,n=10-k*2;for(let j=0;j<n;j++){const b0r=Math.PI*(j/n),b1r=Math.PI*((j+1)/n);X.beginPath();
  for(const [aa,bb] of [[a0,b0r],[a0,b1r],[a1,b1r],[a1,b0r]]){const x=cx-Math.cos(bb)*R*Math.cos(aa),y=gy-R*Math.sin(aa)*1.0;X.lineTo(x,y)}X.closePath();X.fillStyle=Q.block;X.fill();X.strokeStyle=Q.blockE;X.lineWidth=1.5;X.stroke()}}
 S.domeR={x:cx-R,y:gy-R,w:2*R,h:R};S.highR={x:cx-fs(26),y:gy-R*.86,w:fs(52),h:fs(36)};S.lowR={x:cx+R*.78,y:gy-fs(34),w:fs(80),h:fs(34)};
 if(S.rings>=4&&!S.door){pill(S.highR.x,S.highR.y,S.highR.w,S.highR.h,'#ffffff',Q.edge,2,8);txt('door here?',S.highR.x+S.highR.w/2,S.highR.y+S.highR.h/2,11,Q.ink);pill(S.lowR.x,S.lowR.y,S.lowR.w,S.lowR.h,'#ffffff',Q.edge,2,8);txt('tunnel here?',S.lowR.x+S.lowR.w/2,S.lowR.y+S.lowR.h/2,11,Q.ink)}
 if(S.door){X.fillStyle='#93c5fd';X.fillRect(cx+R*.7,gy-fs(26),fs(70),fs(26));X.strokeStyle=Q.edge;X.strokeRect(cx+R*.7,gy-fs(26),fs(70),fs(26));txt('cold air',cx+R*.7+fs(35),gy-fs(13),11,Q.ink,900)}
 S.lampR={x:cx-fs(30),y:gy-fs(44),w:fs(60),h:fs(40)};if(S.rings>=4){pill(S.lampR.x,S.lampR.y,S.lampR.w,S.lampR.h,S.won?Q.lamp:'#ffffff',Q.edge,2,8);txt(S.won?'lamp lit':'lamp',cx,gy-fs(24),11,Q.ink,900)}
 const lvl=S.won?3:S.door?2:S.rings>=4?1:0;lines(INSIDE[lvl],A.W-fs(40),13).forEach((t,i)=>txt(t,A.W/2,t0+fs(8)+i*fs(18),13,lvl===3?Q.ok:Q.soft,900))}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.card;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.card;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const K=mode(),T={map:[`Tap the lands where the ${PEOPLE[S.who||0]} live.`,'You found both homelands.'],travel:['How would you travel? Drag the card to a box.','You know how to get around.'],
  seal:['What was each part of the seal used for? Drag the card.','Nothing was wasted.'],wear:['It is −30 °C. Tap the clothes that keep you warm.','Dressed for the ice.'],
  igloo:['Build a snow house: tap the dome to add rings of snow blocks.','A warm snow house.'],myth:['True or not true? Drag the card to a box.','Myths busted.'],quiz:['Remember the Arctic peoples.','']};
 const t=head(S.won?T[K][1]:T[K][0],S.won),b=A.H-foot()-fs(6);
 if(K==='map')drawMap(t+fs(8),b);if(K==='travel'||K==='seal'||K==='myth')drawDeck(t+fs(10),b);if(K==='wear')drawWear(t+fs(8),b);if(K==='igloo')drawIgloo(t+fs(10),b);
 if(K==='quiz'){const R={x:fs(28),y:t+fs(26),w:A.W-fs(56),h:Math.min(fs(150),b-t-fs(50))};pill(R.x,R.y,R.w,R.h,Q.sea,Q.edge,2);inBox('Inuit and Sami peoples know the Arctic land, ice and animals. They learned it over thousands of years.',R,16,Q.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let held=null;
function down(p){const K=mode();
 if(K==='map'){const R=(S.landR||[]).find(q=>on(p,q));if(R){tapLand(R.i);return true}}
 if((K==='travel'||K==='seal'||K==='myth')&&!S.won){if(on(p,S.cardR)){held='card';S.drag={x:p.x,y:p.y};A.redraw();return true}const R=(S.binR||[]).find(q=>on(p,q));if(R){place(R.i);return true}}
 if(K==='wear'){const R=(S.wearR||[]).find(q=>on(p,q));if(R){wear(R.i);return true}}
 if(K==='igloo'){if(S.rings>=4&&!S.door&&on(p,S.lowR)){door(1);return true}if(S.rings>=4&&!S.door&&on(p,S.highR)){door(0);return true}if(S.rings>=4&&on(p,S.lampR)){lamp();return true}if(on(p,S.domeR)){addRing();return true}}
 return false}
function move(p){if(held==='card'){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const g=held;held=null;if(g==='card'){S.drag=null;const R=(S.binR||[]).find(q=>on(p,q));if(R)place(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function tell(){const K=mode();let d='Challenge.';
 if(K==='map')d=S.won?'All six homelands found.':`Looking for ${PEOPLE[S.who]} lands. Found: ${S.found.map(i=>LANDS[i][0]).join(', ')||'none yet'}. Lands on the map: ${LANDS.map(l=>l[0]).join(', ')}.`;
 if(K==='travel'||K==='seal'||K==='myth')d=S.won?'All cards sorted.':`Card ${S.at+1} of ${deck().length}: ${deck()[S.at][0]}. Boxes: ${bins().join(', ')}.`;
 if(K==='wear')d=`Wearing ${S.worn.length} of ${need} warm things: ${S.worn.map(i=>WEAR[i][0]).join(', ')||'nothing yet'}.`;
 if(K==='igloo')d=`Snow house: ${S.rings} of 4 rings built. ${S.door?'Low tunnel in. ':''}${INSIDE[S.won?3:S.door?2:S.rings>=4?1:0]}.`;
 voice((S.msg?S.msg+' ':'')+d);buttons();S.after()}
function buttons(){if(!bar)return;bar.innerHTML='';const K=mode(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},bar,t).onclick=()=>{fn();tell()}};
 if(!S.won){if(K==='map')LANDS.forEach((l,i)=>{if(!S.found.includes(i))b(l[0],()=>tapLand(i))});
  if(K==='travel'||K==='seal'||K==='myth')bins().forEach((n,i)=>b(n,()=>place(i)));
  if(K==='wear')WEAR.forEach((w,i)=>{if(!S.worn.includes(i))b(w[0],()=>wear(i))});
  if(K==='igloo'){if(S.rings<4)b('Add a ring of snow blocks',addRing);else if(!S.door){b('Door up high',()=>door(0));b('Low tunnel',()=>door(1))}else b('Light the lamp',lamp)}}
 A.redraw()}
const fin=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++seq;fns.forEach((f,j)=>setTimeout(()=>{if(id===seq){f();tell()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){seq++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,who:0,found:[],at:0,drag:null,worn:[],rings:0,door:0})}
const steps=[
{h:'Who lives in the Arctic?',p:'The Arctic is the cold land and sea around the North Pole. The Inuit live in Alaska, northern Canada and Greenland. The Sami live in the far north of Norway, Sweden and Finland.',
predict:{q:'Have people lived in the cold Arctic for a long time?',opts:['No, it is too cold to live there','Yes, for thousands of years'],ans:1},
task:'Tap the 3 Inuit lands, then the 3 Sami lands',show:()=>{steps[0].go();auto([0,1,2,3,4,5].map(i=>()=>tapLand(i)),420)},go:()=>{fresh();tell();S.after=fin(0,()=>S.won,'Both homelands found.')}},
{h:'Getting around',p:'There were no roads on the ice. Inuit used dog sleds and kayaks. Sami herders used sleds pulled by reindeer.',
task:'Sort all 6 trips',show:()=>{steps[1].go();auto(TRAVEL.map(k=>()=>place(k[1])),380)},go:()=>{fresh();tell();S.after=fin(1,()=>S.won,'Right way to travel every time.')}},
{h:'Nothing wasted',p:'A seal hunt fed a whole family. People showed respect for the animal by using almost every part of it.',
predict:{q:'After a seal hunt, how much of the seal was used?',opts:['Just the meat','Almost all of it'],ans:1},
task:'Sort all 4 parts of the seal',show:()=>{steps[2].go();auto(SEAL.map(k=>()=>place(k[1])),420)},go:()=>{fresh();tell();S.after=fin(2,()=>S.won,'Every part used.')}},
{h:'Dressing for minus 30',p:'In winter it can be −30 °C or colder. Inuit wore two caribou parkas: one with the fur facing in, one with the fur facing out.',
predict:{q:'Is a cotton T-shirt good for staying warm at −30 °C?',opts:['Yes, it is soft and cosy','No, damp cotton makes you cold'],ans:1},
task:'Put on the 5 things that keep you warm',show:()=>{steps[3].go();auto([0,2,3,5,6].map(i=>()=>wear(i)),380)},go:()=>{fresh();tell();S.after=fin(3,()=>S.won,'Warm and dry.')}},
{h:'Building a snow house',p:'On winter hunting trips, Inuit cut blocks of hard snow and built a snow house in about an hour. Snow is full of tiny pockets of air, so it keeps heat in.',
predict:{q:'Where should the door of a snow house go?',opts:['High up, like a window','Low down, in a tunnel'],ans:1},
task:'Build 4 rings, add the door, light the lamp',show:()=>{steps[4].go();auto([addRing,addRing,addRing,addRing,()=>door(1),lamp],380)},go:()=>{fresh();tell();S.after=fin(4,()=>S.won,'A warm snow house.')}},
{h:'Then and today',p:'Inuit and Sami live in the Arctic today. Many use snowmobiles and phones, and they still hunt, fish, herd reindeer and speak their own languages.',
task:'Sort all 6 cards',show:()=>{steps[5].go();auto(MYTH.map(k=>()=>place(k[1])),380)},go:()=>{fresh();tell();S.after=fin(5,()=>S.won,'True or not true, sorted.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function quiz(){qn++;const [q,good,bads]=BANK[qn%BANK.length],all=[[good,'ok'],...bads],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,good)});voice('Challenge: '+q);A.redraw()}
function judge(tag,good){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Look back at the lab.';
 if(tag==='inuit')m=`Greenland and Alaska are Inuit lands. The Sami live in the north of Norway, Sweden and Finland.`;
 if(tag==='rise')m=`Warm air rises and stays up by the bench. A low tunnel traps the cold air below.`;
 if(tag==='never')m=`People have lived in the Arctic for thousands of years. It is Antarctica that had no first people.`;
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+good+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:B=>{chal.hidden=B.step!==6;bar.hidden=B.step===6;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Arctic peoples lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
