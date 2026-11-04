/* Flagship: sunlight warms things up (ages 5-6). Put one stone in the sun and one in the shade and wait until midday,
   compare a dark and a white can, feel sand and water at midday, drag the sun across the sky to warm and cool a
   slide, then build a roof that keeps a dog's water bowl cool. Words, not numbers; every drag has a big button too. */
(()=>{
const LV=[['cool','#1d4ed8'],['warm','#b45309'],['hot','#b91c1c']],lvl=q=>q<1?0:q<2?1:2;
const SETS=[[{n:'Stone 1',f:'#57534e',a:.7,s:'stone'},{n:'Stone 2',f:'#57534e',a:.7,s:'stone'}],
 [{n:'Dark can',f:'#111827',a:.75,s:'can'},{n:'White can',f:'#f8fafc',a:.3,s:'can'}],
 [{n:'Sand',f:'#a16207',a:.7,s:'tray'},{n:'Water',f:'#0369a1',a:.2,s:'tub'}]];
const ROOFS=[['Umbrella',.92,'#b91c1c'],['Cardboard',.9,'#92400e'],['Net',.5,'#334155'],['Clear plastic',.05,'']];
VIS.reg('flagsun',c=>{let A,ctl,qbox,qi=-1,run=0;const S={};
const st=()=>A.step,say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const beep=k=>A.sound[k](),again=()=>{A.redraw();buttons()};
function word(t,x,y,px,fill,weight){const g=A.ctx;g.font=`${weight||800} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=fill||A.col.tx;g.fillText(t,x,y,A.W-12)}
const pill=(t,x,y,bg)=>A.paint.label(t,x,y,{bg,font:`800 ${A.narrow?13:14}px system-ui,sans-serif`});
/* ---- the yard: sky, sun, tree and its patch of shade ---- */
function yard(){const W=A.W,H=A.H,gy=H*.48,r=Math.min(W,H)*.065;return{gy,sun:{x:W*.12,y:H*.12,r},tree:{x:W*.8,y:H*.19,r:Math.min(W*.16,H*.17)},
 shade:{x:W*.78,y:gy+(H-gy)*.29,rx:W*.19,ry:(H-gy)*.25},basket:{x:W*.2,y:H-(H-gy)*.3,w:W*.6,h:(H-gy)*.3-6},size:Math.min(56,W*.13)}}
function spot(o,Y){if(o.drag)return{x:o.px,y:o.py};const row=Y.gy+(A.H-Y.gy)*.26,k=S.items.filter(q=>q.at===o.at).indexOf(o);
 if(o.at==='sun')return{x:A.W*(k?.42:.18),y:row};if(o.at==='shade')return{x:A.W*(k?.88:.69),y:row};return{x:A.W*(k?.64:.36),y:Y.basket.y+Y.basket.h/2}}
function sky(g,gy,C){g.fillStyle=C.dark?'#0c4a6e':'#bae6fd';g.fillRect(0,0,A.W,gy);g.fillStyle=C.dark?'#14532d':'#86efac';g.fillRect(0,gy,A.W,A.H-gy)}
function sunAt(g,x,y,r){g.strokeStyle='#f59e0b';g.lineWidth=3;for(let i=0;i<8;i++){const t=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(t)*r*1.25,y+Math.sin(t)*r*1.25);g.lineTo(x+Math.cos(t)*r*1.6,y+Math.sin(t)*r*1.6);g.stroke()}A.paint.ball(x,y,r,'#facc15')}
function rays(g,from,to,stop){g.save();g.strokeStyle='rgba(250,204,21,.85)';g.lineWidth=2.5;g.setLineDash([7,6]);g.beginPath();g.moveTo(from.x,from.y);g.lineTo(to.x,stop==null?to.y:stop);g.stroke();g.restore()}
function thing(g,o,p,sz){const C=A.col;g.fillStyle=o.f;g.strokeStyle=C.dark?'#e5e7eb':'#1f2937';g.lineWidth=2;g.beginPath();
 if(o.s==='stone')g.ellipse(p.x,p.y,sz*.55,sz*.38,0,0,7);else if(o.s==='can')A.paint.rrect(p.x-sz*.3,p.y-sz*.5,sz*.6,sz,8);
 else if(o.s==='tray'){g.moveTo(p.x-sz*.6,p.y-sz*.25);g.lineTo(p.x+sz*.6,p.y-sz*.25);g.lineTo(p.x+sz*.45,p.y+sz*.3);g.lineTo(p.x-sz*.45,p.y+sz*.3);g.closePath()}
 else A.paint.rrect(p.x-sz*.45,p.y-sz*.35,sz*.9,sz*.7,10);g.fill();g.stroke()}
/* the warmth bar beside each thing: it only ever says cool, warm or hot */
function bar(g,x,y,h,q){const C=A.col;A.paint.rrect(x,y,11,h,5);g.fillStyle=C.pn;g.fill();g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=1.5;g.stroke();
 const f=Math.min(1,q/3.4),L=LV[lvl(q)];if(f>0){A.paint.rrect(x+2,y+h-2-(h-4)*Math.max(f,.08),7,(h-4)*Math.max(f,.08),3);g.fillStyle=L[1];g.fill()}}
function scene(g,C){const Y=yard();sky(g,Y.gy,C);sunAt(g,Y.sun.x,Y.sun.y,Y.sun.r);
 g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(Y.shade.x,Y.shade.y,Y.shade.rx,Y.shade.ry,0,0,7);g.fill();
 g.fillStyle='#78350f';g.fillRect(Y.tree.x-8,Y.tree.y,16,Y.shade.y-Y.tree.y);A.paint.ball(Y.tree.x,Y.tree.y,Y.tree.r,'#15803d');
 A.paint.rrect(Y.basket.x,Y.basket.y,Y.basket.w,Y.basket.h,14);g.fillStyle=A.alpha(C.pn,.85);g.fill();g.setLineDash([6,5]);g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=2;g.stroke();g.setLineDash([]);
 if(!S.items.some(o=>o.at==='basket'))word('Basket',A.W/2,Y.basket.y+Y.basket.h/2,13,C.mu,700);
 pill(S.h===12?"12 o'clock: midday":`${S.h} o'clock`,A.W/2,16,C.dark?'#1e3a8a':'#1e40af');
 S.items.forEach(o=>{const p=spot(o,Y);if(o.at==='sun'&&!o.drag)rays(g,Y.sun,p)});
 S.items.forEach(o=>{const p=spot(o,Y),z=Y.size;thing(g,o,p,z);bar(g,p.x+z*.62,p.y-z*.45,z*.9,o.q);
  const L=LV[lvl(o.q)];pill(o.n,p.x,p.y+z*.6+10,'#374151');if(S.h>8&&o.at!=='basket')pill(L[0],p.x,p.y+z*.6+34,L[1])})}
/* ---- step 3: the sun crosses the sky; the slide warms and cools ---- */
const hourOf=a=>Math.round(6+14*a),heatOf=a=>3.4*Math.max(0,Math.sin(Math.PI*Math.pow(a,1.25)));
function partOf(a){const h=hourOf(a);return h<11?'Morning':h<13?'Midday':h<17?'Afternoon':'Evening'}
function arcPos(a){const gy=A.H*.62;return{x:A.W*(.08+.84*a),y:gy-(gy-A.H*.1)*Math.sin(Math.PI*a),gy}}
function sky2(g,C){const P=arcPos(S.a),gy=P.gy;sky(g,gy,C);g.strokeStyle=A.alpha(C.tx,.35);g.setLineDash([4,6]);g.lineWidth=2;g.beginPath();for(let i=0;i<=40;i++){const q=arcPos(i/40);i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y)}g.stroke();g.setLineDash([]);
 const sx=A.W*.45,sy=gy+(A.H-gy)*.5,sw=Math.min(A.W*.36,170);rays(g,P,{x:sx,y:sy-20});
 g.strokeStyle=C.dark?'#e5e7eb':'#1f2937';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(sx-sw/2,sy-34);g.lineTo(sx-sw/2,sy+30);g.moveTo(sx-sw/2,sy-34);g.lineTo(sx+sw/2,sy+26);g.stroke();
 g.strokeStyle='#be185d';g.lineWidth=9;g.beginPath();g.moveTo(sx-sw/2+4,sy-30);g.lineTo(sx+sw/2,sy+24);g.stroke();
 sunAt(g,P.x,P.y,Math.min(A.W,A.H)*.06);const q=heatOf(S.a),L=LV[lvl(q)],bx=A.W*.86;bar(g,bx,gy+8,(A.H-gy)-40,q);
 pill(`Slide: ${L[0]}`,A.W*.78,A.H-18,L[1]);pill(`${partOf(S.a)}, ${hourOf(S.a)>12?hourOf(S.a)-12:hourOf(S.a)} o'clock`,A.W/2,16,C.dark?'#1e3a8a':'#1e40af')}
/* ---- step 4: a roof on posts over the dog's bowl ---- */
function cards(){const n=ROOFS.length,gap=8,w=(A.W-gap*(n+1))/n,h=40;return ROOFS.map((r,i)=>({i,x:gap+i*(w+gap),y:A.H-h-6,w,h}))}
function bowlAt(){const gy=A.H*.45;return{gy,x:A.W*.42,y:gy+(A.H-gy)*.42,roofY:gy-6,w:Math.min(A.W*.5,230)}}
function build(g,C){const B=bowlAt(),Y=yard(),R=S.roof>=0?ROOFS[S.roof]:null;sky(g,B.gy,C);sunAt(g,Y.sun.x,Y.sun.y,Y.sun.r);
 rays(g,Y.sun,{x:B.x,y:B.y-12},R&&R[1]>.4?B.roofY:null);
 g.fillStyle='#78350f';[-1,1].forEach(k=>g.fillRect(B.x+k*B.w/2-4,B.roofY,8,B.y-B.roofY+18));
 if(R){A.paint.rrect(B.x-B.w/2-10,B.roofY-14,B.w+20,18,6);g.fillStyle=R[2]||'rgba(255,255,255,.35)';g.fill();g.strokeStyle=C.dark?'#e5e7eb':'#1f2937';g.lineWidth=2;g.stroke();
  if(R[0]==='Net'){g.strokeStyle='#cbd5e1';g.lineWidth=1;for(let x=B.x-B.w/2;x<B.x+B.w/2;x+=10){g.beginPath();g.moveTo(x,B.roofY-14);g.lineTo(x+6,B.roofY+4);g.stroke()}}
  if(R[1]>.4){g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(B.x,B.y+14,B.w*.48,16,0,0,7);g.fill()}}
 thing(g,{f:'#0369a1',s:'tub'},{x:B.x,y:B.y},Math.min(64,A.W*.15));bar(g,B.x+Math.min(64,A.W*.15)*.62,B.y-28,52,S.bq);
 const L=LV[lvl(S.bq)];pill(S.tried?`Dog's water: ${L[0]}`:"Dog's water",B.x,B.y+46,S.tried?L[1]:'#374151');pill(R?`Roof: ${R[0]}`:'No roof yet',A.W/2,16,C.dark?'#1e3a8a':'#1e40af');
 cards().forEach(k=>{const r=ROOFS[k.i];A.paint.rrect(k.x,k.y,k.w,k.h,10);g.fillStyle=r[2]||(C.dark?'#475569':'#e2e8f0');g.fill();g.lineWidth=S.roof===k.i?4:1.5;g.strokeStyle=S.roof===k.i?(C.dark?'#fde047':'#111827'):A.alpha(C.tx,.6);g.stroke();
  word(A.narrow?r[0].split(' ')[0]:r[0],k.x+k.w/2,k.y+k.h/2+1,A.narrow?11:13,r[2]?'#fff':(C.dark?'#fff':'#111827'))})}
function draw(A){const g=A.ctx,C=A.col,s=st();if(s<3||s===5)scene(g,C);if(s===3)sky2(g,C);if(s===4)build(g,C);A.fx.draw(g)}
/* ---- actions ---- */
function reset(keep){S.h=8;S.items.forEach(o=>{o.q=0;if(!keep)o.at='basket'});S.felt=[]}
function put(i,where){if(st()>2)return;const o=S.items[i];if(!o)return;const was=S.h>8;
 if(S.items.filter(q=>q!==o&&q.at===where).length>=2)where='basket';o.at=where;reset(1);beep('pop');
 say(`${o.n} is ${where==='basket'?'back in the basket':'in the '+where}.`+(was?" New test: the clock goes back to 8 o'clock.":''));again()}
function rule(){const s=st(),at=S.items.map(o=>o.at);if(at.includes('basket'))return'Put both things out of the basket first.';
 if(s===0&&at[0]===at[1])return'Put one stone in the sun and one in the shade. Then we can see what the sun does.';
 if(s===1&&at.includes('shade'))return'Put both cans in the sun. Then only the colour is different.';
 if(s===2&&at.includes('shade'))return'Put both in the sun. Then only the stuff is different.';return''}
function wait(){if(st()>2)return;if(S.h>=12){say('It is midday already. Move a thing to start a new test.');return}const r=rule();if(r){beep('miss');say(r);return}
 S.h++;S.items.forEach(o=>o.q+=(o.at==='sun'?o.a:0)+.1);beep('tick');let m=`${S.h} o'clock. `+S.items.map(o=>`${o.n} is ${LV[lvl(o.q)][0]}`).join('. ')+'.';
 if(S.h===12){const s=st();if(s===0){const x=S.items.find(o=>o.at==='shade');m=`Midday! The stone in the sun is hot. The stone in the shade is ${LV[lvl(x.q)][0]}: the tree blocked the sunlight, but warm air still warmed it a little.`}
  if(s===1)m='Midday! The dark can is hot, and the white can is only warm. Dark things take in more sunlight.';if(s===2)m='Midday! Now feel them: tap the sand and the water.'}
 say(m);again();S.want()}
function feel(i){if(st()!==2)return;const o=S.items[i];if(S.h<12){say('Wait until midday first, then feel.');return}if(!S.felt.includes(i))S.felt.push(i);beep('pop');
 say(o.s==='tray'?'Ouch! The sand feels hot. Sand warms up fast.':'The water feels just a bit warm. Water warms up slowly.');again();S.want()}
function setSun(a){if(st()!==3)return;S.a=Math.max(0,Math.min(1,a));const p=partOf(S.a);if(!S.seen.includes(p)){S.seen.push(p)}
 if(p!==S.lastPart){S.lastPart=p;beep('tick');const L=LV[lvl(heatOf(S.a))][0];say(p==='Morning'?`Morning: the sun is low. The slide is ${L}.`:p==='Midday'?`Midday: the sun is high. The slide is ${L}.`:p==='Afternoon'?`Afternoon: the slide has had sun all day. It is ${L}.`:`Evening: the sun is low again. The slide is cooling. It is ${L}.`)}A.redraw();S.want()}
function roof(i){if(st()!==4)return;S.roof=i;S.bq=0;S.tried=0;beep('pop');say(i<0?'The roof is off.':`You put ${ROOFS[i][0].toLowerCase()} on the posts. Now wait until midday.`);again()}
function noon(){if(st()!==4)return;const R=S.roof>=0?ROOFS[S.roof]:null,block=R?R[1]:0;S.bq=4*(.6*(1-block)+.1);S.tried=1;let m;
 if(!R)m='No roof: the sunlight warmed the water all morning. Now it is hot.';
 else if(block<.2){m='The clear plastic let the sunlight through, so the water still got hot. A roof must block the light.';beep('miss')}
 else if(block<.8){m='The net blocked some sunlight, so the water is warm. Try a roof that blocks more.';beep('miss')}
 else{m=`The ${R[0].toLowerCase()} blocked the sunlight and made shade. The water stayed cool!`;S.good=1;beep('pop')}
 say(m);again();S.want()}
/* ---- pointer: drag things, drag the sun, tap a card ---- */
const inBox=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function zone(p){const Y=yard(),dx=(p.x-Y.shade.x)/Y.shade.rx,dy=(p.y-Y.shade.y)/Y.shade.ry;if(dx*dx+dy*dy<=1.2)return'shade';if(p.y>Y.gy&&p.y<Y.basket.y)return'sun';return'basket'}
function down(p){const s=st();
 if(s<3){const Y=yard();const i=S.items.findIndex(o=>{const q=spot(o,Y);return Math.hypot(p.x-q.x,p.y-q.y)<Y.size*.75});if(i<0)return false;
  if(s===2&&S.h===12){feel(i);return false}S.hold={i,x0:p.x,y0:p.y};return true}
 if(s===3){S.slide=1;setSun((p.x/A.W-.08)/.84);return true}
 if(s===4){const k=cards().find(k=>inBox(p,k));if(k){S.carry=k.i;return true}}return false}
function move(p){if(S.hold){const o=S.items[S.hold.i];if(Math.hypot(p.x-S.hold.x0,p.y-S.hold.y0)>8){o.drag=1;o.px=p.x;o.py=p.y;A.redraw()}}else if(S.slide)setSun((p.x/A.W-.08)/.84)}
function up(p){if(S.hold){const o=S.items[S.hold.i];if(o.drag){o.drag=0;put(S.hold.i,zone(p))}S.hold=null}
 if(S.carry!=null){const k=cards()[S.carry];if(!p||inBox(p,k)||p.y<bowlAt().y+40)roof(S.carry);S.carry=null}S.slide=0}
function buttons(){if(!ctl)return;ctl.innerHTML='';const s=st(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(s<3){S.items.forEach((o,i)=>{if(o.at!=='sun')add(`${o.n} → sun`,()=>put(i,'sun'),`Put ${o.n} in the sun`);if(o.at!=='shade'&&s===0)add(`${o.n} → shade`,()=>put(i,'shade'),`Put ${o.n} in the shade`)});
  add('Wait 1 hour ⏱',wait,'Wait one hour');if(s===2)S.items.forEach((o,i)=>add(`Feel the ${o.n.toLowerCase()} ✋`,()=>feel(i)))}
 if(s===3)[['Morning',.14],['Midday',.43],['Afternoon',.57],['Evening',.86]].forEach(([t,a])=>add(t,()=>setSun(a),`Move the sun to ${t.toLowerCase()}`));
 if(s===4){ROOFS.forEach((r,i)=>add(r[0],()=>roof(i),`Use ${r[0].toLowerCase()} as the roof`));add('Wait until midday ☀',noon);add('Take the roof off',()=>roof(-1))}}
const ok=(n,cond,msg)=>()=>{if(st()===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,list,gap){steps[n].go();const id=++run;list.forEach((f,j)=>setTimeout(()=>{if(id===run)f()},A.reduced()?25*(j+1):(j+1)*(gap||360)))}
function begin(n){run++;for(const k in S)delete S[k];Object.assign(S,{want:()=>{},h:8,felt:[],items:(SETS[n]||SETS[0]).map(o=>Object.assign({at:'basket',q:0},o)),a:.14,seen:[],lastPart:'',roof:-1,bq:0,tried:0,good:0,hold:null,carry:null,slide:0})}
const W4=()=>[wait,wait,wait,wait];
const steps=[
{h:'Sun or shade?',p:'Sunlight warms the things it shines on. Under a tree there is shade: the leaves block the sunlight. Put one stone in each place and wait until midday.',
 predict:{q:'Which stone will get warmer?',opts:['The one in the sun','The one in the shade','Both the same'],ans:0},task:'Put one stone in the sun, one in the shade, and wait until midday',
 show:()=>play(0,[()=>put(0,'sun'),()=>put(1,'shade'),...W4()]),
 go:()=>{begin(0);say('Drag a stone to the sunny grass or into the shade. Or use the buttons.');buttons();S.want=ok(0,()=>S.h===12,'The sunlight warmed the stone it shone on.')}},
{h:'Dark or light?',p:'The sun shines on both cans the same. But dark colours take in more of the sunlight, so they warm up more.',
 predict:{q:'Which can will get warmer in the sun?',opts:['The dark can','The white can','Both the same'],ans:0},task:'Put both cans in the sun and wait until midday',
 show:()=>play(1,[()=>put(0,'sun'),()=>put(1,'sun'),...W4()]),
 go:()=>{begin(1);say('Put both cans in the sun.');buttons();S.want=ok(1,()=>S.h===12,'Same sun, but the dark can got hotter.')}},
{h:'Sand and water',p:'At the beach the sand can burn your feet while the sea still feels cool. Sand warms up fast. Water warms up slowly.',
 predict:{q:'Which warms up faster in the sun?',opts:['Sand','Water','Both the same'],ans:0},task:'Put the sand and the water in the sun, wait until midday, then feel both',
 show:()=>play(2,[()=>put(0,'sun'),()=>put(1,'sun'),...W4(),()=>feel(0),()=>feel(1)]),
 go:()=>{begin(2);say('Put the sand and the water in the sun.');buttons();S.want=ok(2,()=>S.felt.length===2,'The sand got hot, but the water was only warm.')}},
{h:'The sun moves',p:'In the morning the sun is low. At midday it is high. The ground warms all day while the sun shines, and it cools in the evening.',
 predict:{q:'When is the slide hottest?',opts:['Early morning','In the middle of the day','Late evening'],ans:1},task:'Drag the sun from morning to midday to evening',
 show:()=>play(3,[()=>setSun(.14),()=>setSun(.3),()=>setSun(.43),()=>setSun(.57),()=>setSun(.72),()=>setSun(.86)],420),
 go:()=>{begin(3);setSun(.14);buttons();S.want=ok(3,()=>['Morning','Midday','Evening'].every(p=>S.seen.includes(p)),'The slide warmed while the sun was high and cooled as it sank.')}},
{h:'Build a shade',p:'Shade does not make things cold. It just blocks the sunlight. Build a roof on the posts that keeps the dog\u2019s water cool.',
 predict:{q:'Will a clear plastic roof keep the water cool?',opts:['Yes: it is a roof','No: sunlight goes through it','Yes, if it is big'],ans:1},task:'Pick a roof and wait until midday. Keep the water cool',
 show:()=>play(4,[()=>roof(3),noon,()=>roof(0),noon],700),
 go:()=>{begin(4);say('Drag a roof card onto the posts, or tap a roof button.');buttons();S.want=ok(4,()=>S.good,'A roof that blocks sunlight makes shade.')}},
{h:'Challenge',p:'',go:()=>{begin(0);S.items[0].at='sun';S.items[1].at='shade';quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A ball sits in the sun. Another sits in the shade. Which gets warmer?',[['the one in the sun','ok'],['the one in the shade','coldshade'],['both the same','same']]],
 ['What does sunlight do to the ground?',[['it warms it','ok'],['it cools it','cools'],['nothing: it only gives light','light']]],
 ['Which T-shirt gets hotter in the sun?',[['the black one','ok'],['the white one','white'],['both the same','samecol']]],
 ['When is the sand hottest?',[['in the middle of the day','ok'],['early in the morning','low'],['at night','night']]],
 ['Which roof keeps the water cool?',[['an umbrella','ok'],['clear plastic','clear'],['a net with big holes','net']]],
 ['Sand and water sit in the sun all morning. Which feels hotter?',[['the sand','ok'],['the water','water'],['both the same','samestuff']]],
 ['Why is it cooler under a tree?',[['the leaves block the sunlight','ok'],['the tree makes cold air','coldshade'],['trees are wet','wet']]]];
function why(t){let m='Think about where the sunlight lands.';
 if(t==='coldshade')m='Shade does not make cold. It only blocks the sunlight, so the sunny one warms more.';
 if(t==='same')m='The sun shines on one ball and not the other, so they warm up differently.';
 if(t==='cools')m='Sunlight warms things. The ground gets cool when the sun goes down.';
 if(t==='light')m='Sunlight gives warmth as well as light. Feel a sunny wall on a cold day.';
 if(t==='white')m='White sends more of the sunlight away. Dark colours take more in and get hotter.';
 if(t==='samecol')m='The sun is the same, but the colour is not. The dark shirt takes in more sunlight.';
 if(t==='low')m='In the morning the sun is low and the sand has not had long to warm.';
 if(t==='night')m='At night there is no sunlight, so the sand cools down.';
 if(t==='clear')m='Clear plastic lets the sunlight through, so the water still warms up.';
 if(t==='net')m='A net lets lots of sunlight through its holes. It only blocks some.';
 if(t==='water')m='Water warms up slowly. The sand warms up fast and feels hotter.';
 if(t==='samestuff')m='They had the same sun, but sand warms up faster than water.';
 if(t==='wet')m='It is the shade that keeps it cooler: the leaves stop the sunlight.';
 return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=(qi+1)%3;qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');[...ops.slice(r),...ops.slice(0,r)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>answer(t)});say('Challenge: '+q);A.redraw()}
let inRow=0;function answer(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){inRow++;A.win()}else{inRow=0;beep('miss')}fb.innerHTML=(good?`✓ Yes! ${inRow} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qbox.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=c.el('div',{class:'fl-chal'},A.below);begin(0);A.gest({down,move,up});buttons()}});
A.start()})})();
