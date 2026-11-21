/* Flagship – shadows through the day and the year (ages 10–11; NGSS 5-ESS1-2, NC 2013 Year 5 Earth and space). Scenes:
   look down on a stick and move the sun round the south side of the sky until the shadow reaches a flag (a shadow points
   away from the sun); raise and lower the sun in a side view to make shadows 2 m, 1 m and 0.5 m long (higher sun,
   shorter shadow); scrub through a March day and plot the shadow length every 2 hours to see the U-shaped chart; read
   the time of day from a shadow's direction; compare the midday shadow in June, March and December; check claims.
   Sun positions are computed for 51.5° N in sun time (learn/sunpath_art.js). Distinct from flagshadow (ages 4–5, a
   torch and a teddy make a shadow) and flagshine (sunlight warms things): this lab is about the sun's daily path. */
(()=>{const D=SUNP,DEG=Math.PI/180;
/* where the sun is at sun time t (hours) when its declination is dec: altitude, and bearing (0 = north, 90 = east) */
function sunAt(t,dec){const la=D.LAT*DEG,de=dec*DEG,h=15*(t-12)*DEG;
 const alt=Math.asin(Math.sin(la)*Math.sin(de)+Math.cos(la)*Math.cos(de)*Math.cos(h));
 const fromSouth=Math.atan2(Math.sin(h),Math.cos(h)*Math.sin(la)-Math.tan(de)*Math.cos(la));
 return{alt:alt/DEG,bear:(180+fromSouth/DEG+360)%360}}
const shadowM=alt=>D.STICK_M/Math.tan(alt*DEG);
const clock=t=>{const h=Math.floor(t),m=Math.round((t-h)*60);return`${h>12?h-12:h}${m?':'+String(m).padStart(2,'0'):''} ${t<12?'am':t<12.5?'noon':'pm'}`};
const pointName=b=>['north','north-east','east','south-east','south','south-west','west','north-west'][Math.round(((b%360)+360)%360/45)%8];
VIS.reg('flagsunpath',c=>{let A,pad,chal,qn=-1,gen=0,grab=null;const S={};
const SKY='#eff6ff',LAWN='#dcfce7',INK='#0f172a',SUN='#f59e0b',DARK='#334155',OK='#15803d',NO='#b91c1c',RIM='#94a3b8',PX='px system-ui,sans-serif';
const sceneOf=()=>['top','height','day','read','year','claims','chal'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.15);
function ground(top){const g=A.ctx;g.fillStyle=SKY;g.fillRect(0,0,A.W,A.H);if(top!=null){g.fillStyle=LAWN;g.fillRect(0,top,A.W,A.H-top)}}
/* a white rounded label that shrinks until it fits */
function pill(t,x,y,o){o=o||{};const g=A.ctx;let f=sz(o.n||13);g.font=`700 ${f}${PX}`;while(g.measureText(t).width+20>A.W-8&&f>10){f--;g.font=`700 ${f}${PX}`}
 const w=g.measureText(t).width+20,h=f+13,l=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();
 g.lineWidth=o.ok||o.no?3:1.3;g.strokeStyle=o.ok?OK:o.no?NO:RIM;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function line(a,b,col,w,dash){const g=A.ctx;g.setLineDash(dash||[]);g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke();g.setLineDash([])}
function blob(p,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(p.x,p.y,r,0,Math.PI*2);g.fill()}
function sunIcon(p){const g=A.ctx,r=sz(13);g.strokeStyle=SUN;g.lineWidth=3;for(let k=0;k<8;k++){const a=k*Math.PI/4;line({x:p.x+Math.cos(a)*r*1.3,y:p.y+Math.sin(a)*r*1.3},{x:p.x+Math.cos(a)*r*1.8,y:p.y+Math.sin(a)*r*1.8},SUN,3)}blob(p,r,SUN);blob(p,r*.55,'#fde68a')}
/* looking down: north at the top, east on the right; a bearing turns clockwise from north */
const toward=(O,b,r)=>({x:O.x+r*Math.sin(b*DEG),y:O.y-r*Math.cos(b*DEG)});
function compass(O,r){const g=A.ctx;g.strokeStyle=RIM;g.lineWidth=1.5;g.setLineDash([5,6]);g.beginPath();g.arc(O.x,O.y,r,0,Math.PI*2);g.stroke();g.setLineDash([]);
 [['N',0],['E',90],['S',180],['W',270]].forEach(([t,b])=>{const p=toward(O,b,r+sz(16));g.fillStyle=INK;g.font=`800 ${sz(15)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,p.x,p.y)})}
function stickFromAbove(O,bear,len){const tip=toward(O,bear,len);line(O,tip,DARK,sz(9));blob(O,sz(8),'#92400e');blob(O,sz(4),'#fbbf24');return tip}
/* 1. sun round the stick: the shadow points the opposite way */
const topO=()=>({x:A.W/2,y:A.H*.53}),topR=()=>Math.min(A.W*.34,A.H*.32);
function drawTop(){const s=S.top,O=topO(),r=topR();ground(0);A.ctx.fillStyle=LAWN;A.ctx.beginPath();A.ctx.arc(O.x,O.y,r,0,Math.PI*2);A.ctx.fill();compass(O,r);
 if(s.i>=D.FLAGS.length){pill('All 3 flags reached',A.W/2,A.H*.08,{ok:1});return}
 const F=D.FLAGS[s.i],fp=toward(O,F.to,r*.72);pill(`Flag ${s.i+1} of 3: make the shadow point ${F.name}`,A.W/2,A.H*.07,{n:13});
 line(fp,{x:fp.x,y:fp.y-sz(26)},'#7c2d12',3);A.ctx.fillStyle='#dc2626';A.ctx.beginPath();A.ctx.moveTo(fp.x,fp.y-sz(26));A.ctx.lineTo(fp.x+sz(16),fp.y-sz(20));A.ctx.lineTo(fp.x,fp.y-sz(14));A.ctx.fill();
 stickFromAbove(O,(s.b+180)%360,r*.72);sunIcon(toward(O,s.b,r));pill(`sun in the ${pointName(s.b)}`,A.W/2,A.H*.95,{n:12})}
function sunTo(b){const s=S.top;if(s.i>=D.FLAGS.length)return;s.b=Math.max(90,Math.min(270,Math.round(b/22.5)*22.5));const F=D.FLAGS[s.i],shade=(s.b+180)%360;
 if(shade===F.to){s.i++;grab=null;A.sound.pop();return say(`The sun is in the ${pointName(s.b)}, so the shadow points ${F.name}, the opposite way.`+(s.i<3?' Next flag.':''))}
 if(s.b===F.to){A.sound.miss();return say(`The sun is next to the flag, so the shadow points away from it. Put the sun on the opposite side.`)}
 A.cv.setAttribute('aria-label',`Sun in the ${pointName(s.b)}. Shadow points ${pointName(shade)}.`);A.redraw()}
/* 2 and 5. side view: sun on the left, 1 m stick, shadow on the right, one light ray grazing the top of the stick */
function side(alt,o){o=o||{};const g=A.ctx,gy=A.H*(o.gy||.78),k=Math.min(A.H*.26,A.W*.64/3.9),bx=A.W*.2,top={x:bx,y:gy-k},L=shadowM(alt),tip={x:bx+L*k,y:gy};
 g.fillStyle=LAWN;g.fillRect(0,gy,A.W,A.H-gy);line({x:bx,y:gy+2},{x:Math.min(A.W,tip.x),y:gy+2},DARK,sz(8));
 const ux=-Math.cos(alt*DEG),uy=-Math.sin(alt*DEG),reach=Math.min((bx-sz(26))/-ux,(top.y-sz(30))/-uy),sun={x:top.x+ux*reach,y:top.y+uy*reach};
 line(sun,tip,'#facc15',2,[8,6]);line({x:bx,y:gy},top,'#92400e',sz(6));sunIcon(sun);
 g.fillStyle=INK;g.font=`700 ${sz(11)}${PX}`;g.textAlign='center';g.textBaseline='top';for(let m=0;m<=3;m++){const x=bx+m*k;if(x>A.W-8)break;line({x,y:gy+8},{x,y:gy+16},INK,1.5);g.fillText(m+' m',x,gy+18)}
 pill(`stick 1 m · sun ${Math.round(alt)}° high · shadow ${L.toFixed(1)} m`,A.W/2,A.H*.94,{n:12,ok:o.ok});return sun}
function drawHeight(){const s=S.height;ground();side(s.alt,{ok:s.i>=D.LENGTHS.length});
 pill(s.i>=D.LENGTHS.length?'All 3 shadows made':`Shadow ${s.i+1} of 3: make it ${D.LENGTHS[s.i]} m long`,A.W/2,A.H*.07,{n:13,ok:s.i>=D.LENGTHS.length})}
function altTo(a){const s=S.height;if(s.i>=D.LENGTHS.length)return;s.alt=Math.max(15,Math.min(75,15+Math.round((a-15)/3)*3));const L=shadowM(s.alt),want=D.LENGTHS[s.i];
 if(L.toFixed(1)!==want.toFixed(1)){A.cv.setAttribute('aria-label',`Sun ${s.alt} degrees high. Shadow ${L.toFixed(1)} m.`);return A.redraw()}
 s.i++;grab=null;A.sound.pop();say(`The sun is ${s.alt}° high and the shadow is ${want} m.`+(s.i<3?' Next length.':' The higher the sun, the shorter the shadow.'))}
/* 3. a March day: scrub the time, the shadow tip moves, and each 2-hour mark goes on the chart */
const chartBox=()=>({x0:A.W*.14,x1:A.W*.94,y0:A.H*.6,y1:A.H*.9});
function drawDay(){const s=S.day,g=A.ctx,O={x:A.W/2,y:A.H*.3},k=Math.min(A.W*.42/2.9,A.H*.2/1.7),P=sunAt(s.t,0),B=chartBox();ground(0);
 g.fillStyle=LAWN;g.fillRect(0,A.H*.06,A.W,A.H*.46);g.fillStyle=INK;g.font=`800 ${sz(13)}${PX}`;g.textAlign='left';g.textBaseline='top';g.fillText('N ↑',8,A.H*.07);
 s.got.forEach((L,j)=>{if(L!=null){const Q=sunAt(D.TIMES[j],0);blob(toward(O,(Q.bear+180)%360,L*k),sz(5),'#64748b')}});
 stickFromAbove(O,(P.bear+180)%360,shadowM(P.alt)*k);sunIcon(toward(O,P.bear,A.H*.17));pill(`${clock(s.t)} · shadow ${shadowM(P.alt).toFixed(1)} m`,A.W/2,A.H*.035,{n:12});
 line({x:B.x0,y:B.y1},{x:B.x1,y:B.y1},INK,2);line({x:B.x0,y:B.y0},{x:B.x0,y:B.y1},INK,2);g.font=`700 ${sz(10)}${PX}`;g.textAlign='center';g.textBaseline='top';
 const X=t=>B.x0+(t-8)/8*(B.x1-B.x0),Y=m=>B.y1-m/3.5*(B.y1-B.y0);D.TIMES.forEach(t=>g.fillText(clock(t).replace(' noon',''),X(t),B.y1+4));
 g.textAlign='right';g.textBaseline='middle';[1,2,3].forEach(m=>g.fillText(m+' m',B.x0-4,Y(m)));line({x:X(s.t),y:B.y0},{x:X(s.t),y:B.y1},SUN,2,[4,4]);
 const pts=s.got.map((L,j)=>L==null?null:{x:X(D.TIMES[j]),y:Y(L)});for(let j=1;j<pts.length;j++)if(pts[j]&&pts[j-1])line(pts[j-1],pts[j],'#2563eb',2);pts.forEach(p=>p&&blob(p,sz(6),'#2563eb'))}
function timeTo(t){const s=S.day;s.t=Math.max(8,Math.min(16,Math.round(t*2)/2));const j=D.TIMES.indexOf(s.t),L=shadowM(sunAt(s.t,0).alt);
 if(j<0||s.got[j]!=null){A.cv.setAttribute('aria-label',`${clock(s.t)}: shadow ${L.toFixed(1)} m long, pointing ${pointName((sunAt(s.t,0).bear+180)%360)}.`);return A.redraw()}
 s.got[j]=L;A.sound.pop();const n=s.got.filter(v=>v!=null).length;say(`${clock(s.t)}: ${L.toFixed(1)} m, plotted.`+(n<5?` ${5-n} to go.`:' Long, short, long: the chart makes a U.'))}
/* 4. read the shadow: which part of the day? */
const choices=()=>{const w=Math.min(150,(A.W-40)/3);return['morning','midday','afternoon'].map((a,j)=>({a,x:A.W/2+(j-1.5)*w+(j-1)*8,y:A.H*.8,w,h:Math.min(56,A.H*.13)}))};
function drawRead(){const s=S.read,O={x:A.W/2,y:A.H*.45},r=Math.min(A.H*.24,A.W*.36);ground(0);A.ctx.fillStyle=LAWN;A.ctx.fillRect(0,A.H*.14,A.W,A.H*.62);compass(O,r);
 if(s.i>=D.READ.length){pill('All 5 shadows read',A.W/2,A.H*.07,{ok:1});return}const P=sunAt(D.READ[s.i].t,0);
 pill(`Shadow ${s.i+1} of 5: morning, midday or afternoon?`,A.W/2,A.H*.07,{n:13});stickFromAbove(O,(P.bear+180)%360,Math.min(shadowM(P.alt),3.2)/3.2*r*.95);
 choices().forEach(b=>{const g=A.ctx;g.fillStyle=s.miss===b.a?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.miss===b.a?3:1.4;g.strokeStyle=s.miss===b.a?NO:RIM;g.stroke();
  g.fillStyle=INK;g.font=`800 ${sz(14)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.a[0].toUpperCase()+b.a.slice(1),b.x+b.w/2,b.y+b.h/2)})}
function readAs(a){const s=S.read;if(s.i>=D.READ.length)return;const R=D.READ[s.i];let m;
 if(R.a==='morning')m='This shadow points to the west side, so the sun is on the east side. The sun is in the east in the morning.';
 else if(R.a==='afternoon')m='This shadow points to the east side, so the sun is on the west side. That happens in the afternoon.';
 else m='This shadow is short and points due north, so the sun is due south and at its highest: midday.';
 if(a!==R.a){s.miss=a;A.sound.miss();return say('Not quite. '+m)}s.miss=null;s.i++;A.sound.pop();say('Yes. '+m+(s.i<5?' Next shadow.':''))}
/* 5. midday through the year */
function drawYear(){const s=S.year,M=D.MONTHS[s.m],alt=sunAt(12,M.dec).alt;ground();side(alt,{gy:.62});pill(`Midday in ${M.m}`,A.W/2,A.H*.06,{n:14});
 const g=A.ctx,k=Math.min(A.W*.5/3.8,40);D.MONTHS.forEach((Q,j)=>{if(!s.seen[j])return;const L=shadowM(sunAt(12,Q.dec).alt),y=A.H*(.74+j*.055);g.fillStyle=INK;g.font=`700 ${sz(11)}${PX}`;g.textAlign='right';g.textBaseline='middle';
  g.fillText(Q.m,A.W*.26,y);g.fillStyle='#475569';g.fillRect(A.W*.28,y-5,L*k,10);g.textAlign='left';g.fillText(L.toFixed(1)+' m',A.W*.29+L*k,y)})}
function monthTo(j){const s=S.year;s.m=j;const M=D.MONTHS[j],P=sunAt(12,M.dec),fresh=!s.seen[j];s.seen[j]=true;if(fresh)A.sound.pop();
 say(`${M.m} at midday: the sun is ${Math.round(P.alt)}° high and the shadow is ${shadowM(P.alt).toFixed(1)} m.`+(s.seen.every(Boolean)?' The winter midday shadow is the longest.':''))}
/* 6. right or wrong */
const verdictBoxes=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(j=>({j,t:j?'✗ Wrong':'✓ Right',x:A.W/2+(j?6:-w-6),y:A.H*.68,w,h:Math.min(A.H*.16,58)}))};
function drawClaims(){const s=S.claims,g=A.ctx;ground(A.H*.86);if(s.i>=D.CLAIMS.length){pill('All 6 claims checked',A.W/2,A.H*.15,{ok:1});return}
 const C=D.CLAIMS[s.i];blob({x:A.W/2,y:A.H*.17},sz(20),'#fcd34d');blob({x:A.W/2-sz(7),y:A.H*.16},sz(3),INK);blob({x:A.W/2+sz(7),y:A.H*.16},sz(3),INK);
 pill(C.say,A.W/2,A.H*.38,{n:12});pill(`Claim ${s.i+1} of 6: right or wrong?`,A.W/2,A.H*.53,{n:12});
 verdictBoxes().forEach(b=>{g.fillStyle=s.miss===b.j?'#fee2e2':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.lineWidth=s.miss===b.j?3:1.4;g.strokeStyle=s.miss===b.j?NO:RIM;g.stroke();g.fillStyle=INK;g.font=`800 ${sz(16)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(b.t,b.x+b.w/2,b.y+b.h/2)})}
function verdict(j){const s=S.claims;if(s.i>=D.CLAIMS.length)return;const C=D.CLAIMS[s.i];if((j===0)!==C.ok){s.miss=j;A.sound.miss();return say((C.ok?'Look again: it is right. ':'Look again: it is wrong. ')+C.fix)}
 s.miss=-1;s.i++;A.sound.pop();say((C.ok?'Yes, right. ':'Yes, wrong. ')+C.fix)}
function draw(){const k=sceneOf();if(k==='chal'){ground(A.H*.7);sunIcon({x:A.W*.2,y:A.H*.3});pill('Challenge',A.W/2,A.H*.3,{ok:1});pill('Find the sun, then look the other way',A.W/2,A.H*.5,{n:13});return}
 ({top:drawTop,height:drawHeight,day:drawDay,read:drawRead,year:drawYear,claims:drawClaims})[k]();A.fx.draw(A.ctx)}
/* pointer: drag the sun (scenes 1, 2), scrub time (3); tap boxes (4, 6) */
const inBox=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function onDown(p){const k=sceneOf();grab=null;
 if(k==='read'){const b=choices().find(q=>inBox(p,q));if(b)readAs(b.a);return false}
 if(k==='claims'){const b=verdictBoxes().find(q=>inBox(p,q));if(b)verdict(b.j);return false}
 grab=k;onMove(p);return k==='top'||k==='height'||k==='day'}
function onMove(p){if(grab==='top'){const O=topO();sunTo(((Math.atan2(p.x-O.x,O.y-p.y)/DEG)+360)%360)}
 else if(grab==='height'){const gy=A.H*.78,k=Math.min(A.H*.26,A.W*.64/3.9);altTo(Math.atan2(gy-k-p.y,A.W*.2-p.x)/DEG)}
 else if(grab==='day'){const B=chartBox();timeTo(8+(p.x-B.x0)/(B.x1-B.x0)*8)}}
function reset(){gen++;grab=null;for(const k in S)delete S[k];Object.assign(S,{top:{i:0,b:157.5},height:{i:0,alt:36},day:{t:9,got:D.TIMES.map(()=>null)},read:{i:0,miss:null},year:{m:1,seen:[false,false,false]},claims:{i:0,miss:-1},hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.hook()}
/* every canvas action has a button twin under the canvas */
function buttons(){if(!pad)return;pad.innerHTML='';const k=sceneOf(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='top'&&S.top.i<3){add('◀ Sun towards east',()=>sunTo(S.top.b-22.5),'Move the sun towards the east');add('Sun towards west ▶',()=>sunTo(S.top.b+22.5),'Move the sun towards the west')}
 if(k==='height'&&S.height.i<3){add('Sun lower',()=>altTo(S.height.alt-3),'Lower the sun by 3 degrees');add('Sun higher',()=>altTo(S.height.alt+3),'Raise the sun by 3 degrees')}
 if(k==='day'){add('1 hour earlier',()=>timeTo(S.day.t-1));add('1 hour later',()=>timeTo(S.day.t+1))}
 if(k==='read'&&S.read.i<5)['Morning','Midday','Afternoon'].forEach(t=>add(t,()=>readAs(t.toLowerCase())));
 if(k==='year')D.MONTHS.forEach((M,j)=>add(M.m,()=>monthTo(j),'Show midday in '+M.m));
 if(k==='claims'&&S.claims.i<6){add('✓ Right',()=>verdict(0),'The claim is right');add('✗ Wrong',()=>verdict(1),'The claim is wrong')}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){reset();say(D.DESC[i]);S.hook=finish(i,ok,D.DONE[i])}
function play(i,acts,ms){steps[i].go();const mine=gen;acts.forEach((f,j)=>setTimeout(()=>{if(mine===gen)f()},ms*(j+1)))}
const steps=[
{h:'Where does the shadow fall?',p:'You are looking down on a stick in a field, with north at the top. In the UK the sun moves across the south side of the sky. Drag the sun round the ring and watch the shadow.',
 predict:{q:'The sun is in the east. Which way does the stick\'s shadow point?',opts:['East, towards the sun','West, away from the sun','Nowhere, it is under the stick'],ans:1},task:'Reach all 3 flags',
 show:()=>play(0,D.FLAGS.map(F=>()=>sunTo((F.to+180)%360)),600),go:()=>enter(0,()=>S.top.i>=D.FLAGS.length)},
{h:'Higher sun, shorter shadow',p:'Now look from the side. The dashed line is a ray of sunlight that just misses the top of the stick. Drag the sun up or down and watch the shadow.',
 predict:{q:'The sun climbs higher in the sky. What happens to the shadow?',opts:['It gets longer','It gets shorter','It stays the same'],ans:1},task:'Make all 3 shadow lengths',
 show:()=>play(1,[27,45,63].map(a=>()=>altTo(a)),600),go:()=>enter(1,()=>S.height.i>=D.LENGTHS.length)},
{h:'Track a whole day',p:'A day in March. Drag along the chart, or use the buttons, to move the time. At each 2-hour mark the shadow length goes on the chart. The grey dots show where the tip of the shadow was.',
 predict:{q:'When will the shadow be shortest?',opts:['At 8 am','Around 12 noon','At 4 pm'],ans:1},task:'Plot all 5 times',
 show:()=>play(2,D.TIMES.map(t=>()=>timeTo(t)),450),go:()=>enter(2,()=>S.day.got.every(v=>v!=null))},
{h:'Read the shadow',p:'A shadow tells you where the sun is: it is on the opposite side. Is it morning, midday or afternoon?',task:'Read all 5 shadows',
 show:()=>play(3,D.READ.map(R=>()=>readAs(R.a)),500),go:()=>enter(3,()=>S.read.i>=D.READ.length)},
{h:'Summer and winter',p:'At midday the sun is due south and highest. But how high it gets changes through the year. Pick each month and compare the midday shadows.',
 predict:{q:'At midday, when is a stick\'s shadow longest?',opts:['In June','In December','It is the same all year'],ans:1},task:'Look at all 3 months',
 show:()=>play(4,[0,1,2].map(j=>()=>monthTo(j)),600),go:()=>enter(4,()=>S.year.seen.every(Boolean))},
{h:'Right or wrong?',p:'A child makes claims about shadows. Is each one right, or wrong?',task:'Check all 6 claims',
 show:()=>play(5,D.CLAIMS.map(C=>()=>verdict(C.ok?0:1)),450),go:()=>enter(5,()=>S.claims.i>=D.CLAIMS.length)},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
function nextQ(){qn++;const Q=D.QS[qn%D.QS.length],opts=[[Q.a,'ok'],...Q.o],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>answer(tag,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),right=tag==='ok';if(right)A.win();else A.sound.miss();
 const why=D.SLIP[tag]||D.SLIP.other;fb.innerHTML=(right?`✓ Yes: ${a}.`:'✗ '+why)+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(right?'Yes.':why)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:x=>{chal.hidden=x.step!==6;pad.hidden=x.step===6;buttons()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Shadows lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down:onDown,move:onMove,up:()=>{grab=null}});buttons()}}).start()})})();
