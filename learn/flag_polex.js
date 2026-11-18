/* Flagship: brave polar explorers (ages 5–7; NC England KS1 history "lives of significant individuals" (Scott is a named
   example) and KS1 geography the South Pole; topic evidence: name Scott, Amundsen and Shackleton, tell the race to the Pole
   and the Endurance story). Drag the calendar to race two sledges, pack kit that works in the cold, put the Endurance story in
   order, sail the small boat for help, and sort what is brave and sensible. Every drag and tap has a button too. */
(()=>{
const {RACE,DATE,KIT,STORY,MIX,ACTS,BANK,WHY}=POLEXART;
const P={ink:'#111827',grey:'#374151',paper:'#fffdf8',line:'#1f2937',note:'#eff6ff',yes:'#166534',yesBg:'#dcfce7',no:'#9f1239',
 ice:'#e0f2fe',iceE:'#7dd3fc',sea:'#bfdbfe',seaE:'#1d4ed8',snow:'#f8fafc',am:'#b91c1c',sc:'#1e3a8a',wood:'#92400e',land:'#d6d3d1',flagW:'#ffffff'};
VIS.reg('flagpolex',c=>{let A,X,btns,ask,round=-1,run2=0,tm=0;const G={after:()=>{}};
const px=n=>Math.round(n*(A.narrow?1.08:1.16));
function speak(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function word(s,x,y,n,col,wt,al){X.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function wrapTo(s,w,n){X.font=`800 ${px(n)}px system-ui,sans-serif`;const rows=[];let cur='';String(s).split(' ').forEach(t=>{const tryit=cur?cur+' '+t:t;if(cur&&X.measureText(tryit).width>w){rows.push(cur);cur=t}else cur=tryit});rows.push(cur);return rows}
function box(x,y,w,h,fill,edge,lw,r){A.paint.rrect(x,y,w,h,r||14);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function boxText(s,R,n,col){const rows=wrapTo(s,R.w-px(16),n),lh=px(n)+5;rows.forEach((t,i)=>word(t,R.x+R.w/2,R.y+R.h/2+(i-(rows.length-1)/2)*lh,n,col))}
const hit=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function banner(s,won){const rows=wrapTo(s,A.W-48,16),lh=px(16)+4,h=Math.max(px(40),rows.length*lh+14);box(12,10,A.W-24,h,won?P.yesBg:P.note,won?P.yes:P.line,2);rows.forEach((t,i)=>word(t,A.W/2,10+h/2+(i-(rows.length-1)/2)*lh,16,won?P.yes:P.ink));return 10+h}
function said(){if(!G.msg)return 0;const rows=wrapTo((G.bad?'✗ ':'✓ ')+G.msg,A.W-48,14),lh=px(14)+5,h=rows.length*lh+12,y=A.H-h-10;box(12,y,A.W-24,h,'#ffffff',G.bad?P.no:P.yes,3);rows.forEach((t,i)=>word(t,A.W/2,y+6+lh*(i+.5),14,G.bad?P.no:P.ink));return h+14}
const oops=s=>{G.bad=true;G.msg=s;A.sound.miss();tell()};
const good=s=>{G.bad=false;G.msg=s;A.sound.pop()};
const part=()=>['race','kit','story','boat','acts','quiz'][A.step];
/* ---------- step 0: race to the Pole on a calendar ---------- */
const share=(d,a,b)=>Math.max(0,Math.min(1,(d-a)/(b-a)));
function setDay(d){if(G.won)return;G.day=Math.max(0,Math.min(RACE.last,Math.round(d)));const am=share(G.day,RACE.amStart,RACE.amEnd),sc=share(G.day,RACE.scStart,RACE.scEnd);
 G.bad=false;G.msg=`${DATE(G.day)}: Amundsen is ${am>=1?'at the Pole':Math.round(am*100)+'% of the way'}. Scott is ${G.day<RACE.scStart?'not started yet':sc>=1?'at the Pole':Math.round(sc*100)+'% of the way'}.`;
 if(am>=1&&!G.amSeen){G.amSeen=true;G.msg='14 December 1911: Amundsen and his dogs reach the South Pole first! He puts up a tent and a flag.';A.sound.pop()}
 if(sc>=1){G.won=true;G.msg='17 January 1912: Scott reaches the Pole about 5 weeks later. Amundsen\'s flag is already there. Sadly, Scott\'s team died on the way home.';A.sound.pop()}tell()}
function drawRace(t0,b0){const x0=px(16),w=A.W-2*px(16),polX=x0+w-px(40),laneH=Math.min(px(70),(b0-t0)*.24),lanes=[['Amundsen: dogs and skis',P.am,share(G.day,RACE.amStart,RACE.amEnd)],['Scott: ponies, then pulling by hand',P.sc,share(G.day,RACE.scStart,RACE.scEnd)]];
 box(x0,t0,w,laneH*2+px(30),P.snow,P.iceE,2);word('South Pole',polX,t0+px(12),13,P.ink,900);X.fillStyle=P.line;X.fillRect(polX-1,t0+px(22),3,laneH*2);
 lanes.forEach(([name,col,f],i)=>{const y=t0+px(26)+i*laneH,sx=x0+px(14)+f*(polX-x0-px(40));word(name,x0+px(10),y+px(10),12,P.grey,800,'left');
  X.strokeStyle=P.iceE;X.setLineDash([6,6]);X.beginPath();X.moveTo(x0+px(14),y+laneH*.62);X.lineTo(polX,y+laneH*.62);X.stroke();X.setLineDash([]);
  box(sx-px(4),y+laneH*.45,px(36),px(18),col,P.line,1.5,5);for(let k=0;k<(i?0:3);k++){X.fillStyle=P.grey;X.beginPath();X.arc(sx+px(44)+k*px(11),y+laneH*.6,px(4),0,7);X.fill()}
  if(f>=1){X.fillStyle=col;X.fillRect(polX+4,y+laneH*.25,px(18),px(12));X.fillStyle=P.line;X.fillRect(polX+2,y+laneH*.22,2,px(26))}});
 const cy=t0+laneH*2+px(50),cal={x:x0+px(10),y:cy,w:w-px(20),h:px(64)};G.calR=cal;box(cal.x,cal.y,cal.w,cal.h,'#ffffff',P.line,2);
 [['20 Oct',0,'left'],['1 Dec',42],['1 Jan',73],['17 Jan',89,'right']].forEach(([s,d,al])=>{const x=cal.x+px(12)+d/RACE.last*(cal.w-px(24));X.fillStyle=P.grey;X.fillRect(x-1,cal.y+px(6),2,px(10));word(s,al==='left'?x-px(6):al==='right'?x+px(6):x,cal.y+cal.h-px(12),11,P.grey,800,al)});
 const kx=cal.x+px(12)+G.day/RACE.last*(cal.w-px(24));box(kx-px(17),cal.y-px(10),px(34),px(36),P.am,P.line,2,10);word('drag',kx,cal.y+px(8),10,'#ffffff',900);
 word(`Day: ${DATE(G.day)}`,A.W/2,cal.y+cal.h+px(18),15,P.ink,900)}
/* ---------- steps 1 and 4: one card, two boxes ---------- */
const pile=()=>part()==='kit'?KIT:ACTS;
const sides=()=>part()==='kit'?['Helps in the cold','No help']:['Brave and sensible','Not a good idea'];
function drop(b){if(G.won)return;const D=pile(),card=D[G.at],want=card[1]?0:1;if(b!==want)return oops(card[2]);good(card[2]);G.at++;
 if(G.at>=D.length){G.won=true;G.msg=part()==='kit'?'Packed! Dogs, skis, fur, goggles and food stores helped explorers stay alive.':'Brave is not the same as careless. Brave explorers keep going, keep safe and help their team.'}tell()}
function drawPile(t0,b0){const S=sides(),bw=(A.W-px(40))/2,bh=Math.min(px(100),(b0-t0)*.38),by=b0-bh;
 G.sideR=S.map((n,i)=>{const R={x:px(14)+i*(bw+px(12)),y:by,w:bw,h:bh,i};box(R.x,R.y,R.w,R.h,i?'#fee2e2':P.yesBg,P.line,2.5);boxText(n,R,16,P.ink);return R});
 const D=pile();if(G.at<D.length){const cw=Math.min(A.W-px(40),px(380)),rows=wrapTo(D[G.at][0],cw-px(22),17),chh=rows.length*(px(17)+5)+px(30),home={x:(A.W-cw)/2,y:t0+(by-t0-chh)/2,w:cw,h:chh},d=G.drag;G.cardR=home;
  const R=d?{x:d.x-cw/2,y:d.y-chh/2,w:cw,h:chh}:home;box(R.x,R.y,R.w,R.h,'#ffffff',d?P.seaE:P.line,3);boxText(D[G.at][0],R,17,P.ink);word(`Card ${G.at+1} of ${D.length}`,A.W/2,Math.max(t0+px(8),home.y-px(12)),12,P.grey,800)}}
/* ---------- step 2: the Endurance story in order ---------- */
function pickStory(k){if(G.won||G.order.includes(k))return;const n=G.order.length;if(k!==n)return oops(n===0?'Start at the very beginning: the ship sails away.':`Not yet. First: "${STORY[n]}".`);
 G.order.push(k);good(`${n+1}. ${STORY[k]}.`);if(G.order.length===STORY.length){G.won=true;G.msg='The ship was lost, but every man came home. That took courage and a lot of endurance.'}tell()}
function drawStory(t0,b0){const n=STORY.length,gap=px(6),rh=Math.min(px(54),(b0-t0-gap*(n-1))/n),cw=(A.W-px(40))/2;G.storyR=[];
 MIX.forEach((k,j)=>{if(G.order.includes(k))return;const R={x:px(14),y:t0+j*(rh+gap),w:cw,h:rh,k};G.storyR.push(R);box(R.x,R.y,R.w,R.h,'#ffffff',P.line,2,12);boxText(STORY[k],R,13,P.ink)});

 for(let s=0;s<n;s++){const R={x:px(26)+cw,y:t0+s*(rh+gap),w:cw,h:rh},k=G.order[s];box(R.x,R.y,R.w,R.h,k!=null?P.yesBg:P.ice,k!=null?P.yes:P.iceE,2,12);boxText(k!=null?`${s+1}. ${STORY[k]}`:`${s+1}.`,R,13,k!=null?P.ink:P.grey)}}
/* ---------- step 3: sail for help, cross the mountains, go back ---------- */
function mapPts(t0,b0){const w=A.W,h=b0-t0;return{ei:{x:w*.16,y:t0+h*.3},sg:{x:w*.8,y:t0+h*.62},st:{x:w*.86,y:t0+h*.48}}}
function sail(f){if(G.won||G.leg!==0)return;G.f=Math.max(G.f,Math.min(1,f));G.bad=false;G.msg=`Day ${Math.max(1,Math.round(G.f*16))} of about 16 in the small boat. Huge waves!`;
 if(G.f>=1){G.leg=1;G.msg='They reach South Georgia! But the whaling station is over the mountains. Tap the mountains to climb.';A.sound.pop()}tell()}
function climb(){if(G.won||G.leg!==1)return;G.hills++;good(`Climb ${G.hills} of 3. They walk for about 36 hours with no sleep.`);if(G.hills>=3){G.leg=2;G.msg='The whaling station! Now go back for the men on Elephant Island: tap the island.'}tell()}
function rescue(){if(G.won)return;if(G.leg<2)return oops(G.leg===0?'First sail the boat to South Georgia to get help.':'First climb the mountains to the whaling station.');G.won=true;G.msg='On the fourth try a ship gets through the ice. All 28 men are saved!';tell()}
function drawBoat(t0,b0){const M=mapPts(t0,b0);G.M=M;box(px(12),t0,A.W-px(24),b0-t0,P.sea,P.seaE,2);
 X.fillStyle=P.flagW;X.beginPath();X.ellipse(M.ei.x,M.ei.y,px(42),px(24),0,0,7);X.fill();X.strokeStyle=P.line;X.lineWidth=2;X.stroke();word('Elephant Island',M.ei.x,M.ei.y+px(36),13,P.ink,900);
 X.fillStyle=P.land;X.beginPath();X.ellipse(M.sg.x,M.sg.y,px(56),px(26),-.3,0,7);X.fill();X.stroke();word('South Georgia',M.sg.x-px(10),M.sg.y+px(40),13,P.ink,900);
 G.hillR={x:M.sg.x-px(46),y:M.sg.y-px(46),w:px(80),h:px(52)};for(let k=0;k<3;k++){const hx=G.hillR.x+px(8)+k*px(24);X.fillStyle=k<G.hills?P.yesBg:'#ffffff';X.beginPath();X.moveTo(hx,M.sg.y);X.lineTo(hx+px(14),M.sg.y-px(36));X.lineTo(hx+px(28),M.sg.y);X.closePath();X.fill();X.stroke()}
 box(M.st.x-px(14),M.st.y-px(52),px(30),px(20),G.leg>=2?P.yesBg:'#ffffff',P.line,2,4);word('station',M.st.x,M.st.y-px(62),11,P.ink,800);
 X.strokeStyle=P.seaE;X.setLineDash([5,7]);X.beginPath();X.moveTo(M.ei.x,M.ei.y);X.lineTo(M.sg.x-px(40),M.sg.y);X.stroke();X.setLineDash([]);
 const bx=M.ei.x+(M.sg.x-px(40)-M.ei.x)*G.f,by=M.ei.y+(M.sg.y-M.ei.y)*G.f;G.boatR={x:bx-px(24),y:by-px(24),w:px(48),h:px(40)};
 X.fillStyle=P.wood;X.beginPath();X.moveTo(bx-px(20),by);X.lineTo(bx+px(20),by);X.lineTo(bx+px(12),by+px(10));X.lineTo(bx-px(12),by+px(10));X.closePath();X.fill();X.fillStyle='#ffffff';X.beginPath();X.moveTo(bx,by-px(22));X.lineTo(bx+px(14),by-px(2));X.lineTo(bx,by-px(2));X.closePath();X.fill();X.stroke();
 G.isleR={x:M.ei.x-px(46),y:M.ei.y-px(28),w:px(92),h:px(56)};if(G.won)word('All 28 saved',M.ei.x,M.ei.y,12,P.yes,900)}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':P.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=P.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const K=part(),T={race:['Drag the calendar. Who gets to the South Pole first?','The race is over.'],kit:['Will it help in the cold? Drag the card to a box.','Ready for the ice.'],
  story:['Tap the Endurance story in order. Start with number 1.','The whole story, in order.'],boat:['Drag the small boat to South Georgia to get help.','Everyone is safe.'],
  acts:['Brave and sensible, or not a good idea? Drag the card.','You know what brave means.'],quiz:['Remember the explorers.','']};
 const t=banner(G.won?T[K][1]:T[K][0],G.won),b=A.H-said()-px(6);
 if(K==='race')drawRace(t+px(10),b);if(K==='kit'||K==='acts')drawPile(t+px(10),b);if(K==='story')drawStory(t+px(8),b);if(K==='boat')drawBoat(t+px(8),b);
 if(K==='quiz'){const R={x:px(30),y:t+px(30),w:A.W-px(60),h:Math.min(px(150),b-t-px(60))};box(R.x,R.y,R.w,R.h,P.ice,P.line,2);boxText('Amundsen got to the South Pole first. Shackleton brought all his men home.',R,17,P.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let grab=null;
function calDay(p){const R=G.calR;return(p.x-R.x-px(12))/(R.w-px(24))*RACE.last}
function boatF(p){const M=G.M,ax=M.ei.x,bx=M.sg.x-px(40);return(p.x-ax)/(bx-ax)}
function down(p){const K=part();
 if(K==='race'&&G.calR&&hit(p,{x:G.calR.x,y:G.calR.y-px(14),w:G.calR.w,h:G.calR.h+px(20)})){grab='cal';setDay(calDay(p));return true}
 if((K==='kit'||K==='acts')&&!G.won){if(G.cardR&&hit(p,G.cardR)){grab='card';G.drag={x:p.x,y:p.y};A.redraw();return true}const R=(G.sideR||[]).find(q=>hit(p,q));if(R){drop(R.i);return true}}
 if(K==='story'){const R=(G.storyR||[]).find(q=>hit(p,q));if(R){pickStory(R.k);return true}}
 if(K==='boat'){if(G.leg===0&&hit(p,G.boatR)){grab='boat';return true}if(hit(p,G.hillR)){climb();return true}if(hit(p,G.isleR)){rescue();return true}}
 return false}
function move(p){if(grab==='cal')setDay(calDay(p));if(grab==='card'){G.drag={x:p.x,y:p.y};A.redraw()}if(grab==='boat')sail(boatF(p))}
function up(p){const g=grab;grab=null;if(g==='card'){G.drag=null;const R=(G.sideR||[]).find(q=>hit(p,q));if(R)drop(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function tell(){const K=part();let d='Challenge.';
 if(K==='race')d=`Calendar on ${DATE(G.day)}. Amundsen ${Math.round(share(G.day,RACE.amStart,RACE.amEnd)*100)}% of the way, Scott ${Math.round(share(G.day,RACE.scStart,RACE.scEnd)*100)}%.`;
 if(K==='kit'||K==='acts')d=G.won?'All cards sorted.':`Card ${G.at+1} of ${pile().length}: ${pile()[G.at][0]}. Boxes: ${sides().join(', ')}.`;
 if(K==='story')d=`Story so far: ${G.order.map(k=>STORY[k]).join(', then ')||'nothing yet'}.`;
 if(K==='boat')d=['Small boat at Elephant Island. Sail it to South Georgia.',`At South Georgia. Mountains climbed: ${G.hills} of 3.`,'At the whaling station. Go back to Elephant Island.'][G.leg]+(G.won?' All 28 men saved.':'');
 speak((G.msg?G.msg+' ':'')+d);keys();G.after()}
function keys(){if(!btns)return;btns.innerHTML='';const K=part(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},btns,t).onclick=()=>{fn();tell()}};
 if(!G.won){if(K==='race'){b('Back a week',()=>setDay(G.day-7));b('Forward a week',()=>setDay(G.day+7))}
  if(K==='kit'||K==='acts')sides().forEach((n,i)=>b(n,()=>drop(i)));
  if(K==='story')MIX.forEach(k=>{if(!G.order.includes(k))b(STORY[k],()=>pickStory(k))});
  if(K==='boat'){if(G.leg===0)b('Sail 4 days',()=>sail(G.f+.25));if(G.leg===1)b('Climb a mountain',climb);b('Go to Elephant Island',rescue)}}
 A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++run2;fns.forEach((f,j)=>setTimeout(()=>{if(id===run2){f();tell()}},(j+1)*(A.reduced()?50:ms)))};
function reset(){run2++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,day:0,amSeen:false,at:0,drag:null,order:[],f:0,leg:0,hills:0})}
const steps=[
{h:'The race to the South Pole',p:'In 1911 two teams raced to be first at the South Pole. Amundsen from Norway used dogs and skis. Scott from Britain used ponies, then his men pulled the sledges.',
predict:{q:'Who will get to the South Pole first?',opts:['Scott, with ponies','Amundsen, with dogs'],ans:1},
task:'Drag the calendar until both teams reach the Pole',show:()=>{steps[0].go();play([14,28,42,55,70,82,89].map(d=>()=>setDay(d)),420)},go:()=>{reset();tell();G.after=ok(0,()=>G.won,'Amundsen was first.')}},
{h:'Pack for the cold',p:'The South Pole is in Antarctica, the coldest place on Earth. The right kit kept explorers alive.',
predict:{q:'Which are better at pulling a sledge on deep snow?',opts:['Ponies, they are bigger','Dogs, they run on top of the snow'],ans:1},
task:'Sort all 8 cards',show:()=>{steps[1].go();play(KIT.map(k=>()=>drop(k[1]?0:1)),380)},go:()=>{reset();tell();G.after=ok(1,()=>G.won,'Packed.')}},
{h:'Shackleton\'s ship Endurance',p:'In 1914 Ernest Shackleton sailed to Antarctica in a wooden ship called Endurance. Then the sea froze around it.',
predict:{q:'Can sea ice break a big wooden ship?',opts:['No, the ship is too strong','Yes, the ice can crush it'],ans:1},
task:'Tap the 7 story cards in order',show:()=>{steps[2].go();play(STORY.map((s,k)=>()=>pickStory(k)),400)},go:()=>{reset();tell();G.after=ok(2,()=>G.won,'Story in order.')}},
{h:'Sailing for help',p:'Nobody lived on Elephant Island. So Shackleton and 5 men sailed a tiny boat across a wild sea to get help.',
predict:{q:'How many of Shackleton\'s men got home?',opts:['All of them','About half','None of them'],ans:0},
task:'Sail, climb, then go back for the men',show:()=>{steps[3].go();play([()=>sail(.25),()=>sail(.5),()=>sail(.75),()=>sail(1),climb,climb,climb,rescue],380)},go:()=>{reset();tell();G.after=ok(3,()=>G.won,'All 28 men saved.')}},
{h:'What makes an explorer brave?',p:'Courage means doing something hard even when you are scared. Endurance means keeping going for a long time.',
task:'Sort all 7 cards',show:()=>{steps[4].go();play(ACTS.map(k=>()=>drop(k[1]?0:1)),380)},go:()=>{reset();tell();G.after=ok(4,()=>G.won,'Brave and sensible.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function quiz(){round++;const [q,right,wrongs]=BANK[round%BANK.length],all=[[right,'ok'],...wrongs],r=round%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=ask.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});speak('Challenge: '+q);A.redraw()}
function mark(tag,right){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Think back to the story.';
 if(tag==='scott')m='Scott was second, about 5 weeks after Amundsen. He found Amundsen\'s tent and flag at the Pole.';
 if(tag==='ponies')m='Ponies were Scott\'s plan. Amundsen\'s dogs ran on top of the snow.';
 if(tag==='north')m='The North Pole is at the top. The South Pole is at the bottom, in icy Antarctica.';
 if(yes){tm++;A.win()}else{tm=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+right+'. In a row: '+tm+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.42,draw,onStep:B=>{ask.hidden=B.step!==5;btns.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Polar explorers lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
