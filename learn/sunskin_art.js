/* Data and drawings for flagsunskin (Staying safe in the sun; Personal & Social, Responsible Decision-Making, ages
   6-7). Sources: DfE (2019) Health Education statutory guidance, Health and prevention (safe and unsafe exposure to the
   sun, reducing the risk of sun damage); NHS 'Sunscreen and sun safety' (shade between 11am and 3pm in the UK from
   March to October; cover up with clothes, a wide-brimmed hat and sunglasses; SPF 30 or more with 4 or 5 star UVA;
   put more on after swimming or towel drying and about every 2 hours; take extra care with ears, neck, the backs of
   hands and the tops of feet); WHO (2002) Global Solar UV Index practical guide (thin cloud lets most UV through; UV is
   strongest around midday); US EPA SunWise shadow rule (a shadow shorter than you means strong UV). Slips it targets:
   'cloudy or cool means safe'; 'a breeze or the pool means no burn'; a cap that leaves ears and neck bare; a vest or
   swimsuit with bare shoulders; missing ears, neck, hands and feet; and thinking sun cream lasts all day. */
const SK=(()=>{
/* step 1: the day runs from 8 am (t=0) to 6 pm (t=1); highest sun about 60 degrees, as on a UK summer day */
const elev=t=>60*Math.sin(Math.PI*Math.max(0,Math.min(1,t)));
const clock=t=>{const h=8+Math.round(t*20)/2,H=Math.floor(h),m=h-H?':30':'';return `${H>12?H-12:H}${m} ${H>=12?'pm':'am'}`};
const ratio=t=>1/Math.tan(Math.max(8,elev(t))*Math.PI/180);
const uvWord=t=>{const e=elev(t);return e>45?'strong':e>30?'medium':'low'};
/* step 2: cloud, breeze and pool make you feel cooler, but the UV still reaches your skin */
const TRY=[{k:'cloud',t:'Bring clouds',m:'Cloudy and cooler, but most UV still gets through thin cloud.',heat:.55,uv:.85},
 {k:'wind',t:'Make a breeze',m:'The breeze makes you feel cool. The UV is just as strong.',heat:.5,uv:1},
 {k:'pool',t:'Jump in the pool',m:'Cool water, but UV still reaches you. Water and towels rub sun cream off too.',heat:.35,uv:.95}];
/* step 3: cover up */
const WEAR=[{e:'\u{1F452}',t:'Wide brim hat',ok:1,on:'hat'},{e:'\u{1F9E2}',t:'Cap',ok:0,k:'cap'},{e:'\u{1F455}',t:'T-shirt with sleeves',ok:1,on:'top'},
 {e:'\u{1F3BD}',t:'Vest top',ok:0,k:'vest'},{e:'\u{1F576}\uFE0F',t:'Sunglasses',ok:1,on:'specs'},{e:'\u{1FA71}',t:'Swimsuit only',ok:0,k:'swim'}];
/* step 4: sun cream on the skin that clothes do not cover (x, y as fractions of the body box) */
const SPOTS=[{k:'face',t:'Nose and cheeks',x:.5,y:.15},{k:'ears',t:'Ears',x:.26,y:.125},{k:'neck',t:'Neck',x:.5,y:.24},{k:'hands',t:'Backs of hands',x:.2,y:.56},{k:'legs',t:'Legs and tops of feet',x:.4,y:.88}];
const COVERED=[{t:'T-shirt',x:.5,y:.42},{t:'Hat',x:.5,y:.02}];
/* step 5: through the day */
const DAY=[{at:'11 am',cue:'You swam, then dried off with a towel.',ok:'Put more sun cream on',o:[['Wait until home time','wait'],['Put some on your face only','face']],cream:.25},
 {at:'1 pm',cue:'It is 2 hours since the sun cream went on.',ok:'Put more on now',o:[['No need, it lasts all day','allday'],['Just pull your hat down','hatonly']],cream:.4},
 {at:'2 pm',cue:'You feel hot and thirsty. Your shadow is short.',ok:'Drink water in the shade',o:[['Keep running in the sun','sunrun'],['Wait until home to drink','dry']],cream:1}];
const DESC=['A child in a park on a sunny day, with a tree for shade. Drag the sun across the sky, or use the buttons, and watch the shadow.',
 'A child in the sun with a heat meter and a UV meter. Try clouds, a breeze and the pool.',
 'A child and six things to wear. Drag the 3 that protect skin and eyes onto the child, or use the buttons.',
 'A child in a hat, T-shirt and sunglasses. Tap each patch of bare skin to put sun cream on it.',
 'A day at the pool. At each time, choose what to do.'];
const TXT=['Short shadow? Find shade.','Cool is not the same as safe.','Cover up.','Sun cream on bare skin.','Put more on.'];
const DONE=['When your shadow is shorter than you, the sun is strong: play in the shade.',
 'Clouds, a breeze and the pool feel cool, but UV still reaches your skin. You can burn without feeling hot.',
 'A wide-brimmed hat, a T-shirt with sleeves and sunglasses cover the most.',
 'Face, ears, neck, hands, legs and feet: sun cream goes on all the skin clothes do not cover.',
 'Put more on after swimming and every 2 hours, and drink water in the shade.'];
const QS=[{q:'It is cloudy and cool. Can you get sunburnt?',a:'Yes, UV gets through clouds',o:[['No, it is not hot','cool'],['Only if you feel hot','cool']]},
 {q:'Your shadow is shorter than you. What should you do?',a:'Play in the shade',o:[['Stay in the sun','sunrun'],['Wait for a cloud, then stay out','cool']]},
 {q:'Which hat protects your ears and neck best?',a:'A wide-brimmed hat',o:[['A cap','cap'],['No hat, just sun cream','hatonly']]},
 {q:'You have a T-shirt on. Where does the sun cream go?',a:'On the skin the T-shirt does not cover',o:[['Only on your face','face'],['On top of the T-shirt','covered']]},
 {q:'You swam and dried with a towel. What now?',a:'Put more sun cream on',o:[['Nothing, it lasts all day','allday'],['Wait until home time','wait']]},
 {q:'Which places do people often miss with sun cream?',a:'Ears, neck and tops of feet',o:[['The T-shirt','covered'],['Nowhere, one dab is enough','face']]},
 {q:'Which top is best on a sunny day?',a:'A T-shirt with sleeves',o:[['A vest top','vest'],['A swimsuit only','swim']]},
 {q:'There is a cool breeze at the beach. Is the UV weaker?',a:'No, the breeze just makes you feel cool',o:[['Yes, wind blows UV away','cool'],['Yes, so no sun cream','cool']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif',SKIN='#c68642',SKIN2='#8d5524';
function emo(g,e,x,y,s,a){g.save();if(a!=null)g.globalAlpha=a;g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y);g.restore()}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function wrap(g,t,max){const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
function sky(g,r,dk,grey){g.fillStyle=grey?(dk?'#334155':'#cbd5e1'):(dk?'#1e3a8a':'#bae6fd');rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.fillStyle=dk?'#166534':'#86efac';g.fillRect(r.x+1,r.y+r.h*.78,r.w-2,r.h*.22-1)}
function sun(g,x,y,s){g.fillStyle='#facc15';g.strokeStyle='#f59e0b';g.lineWidth=3;g.beginPath();g.arc(x,y,s,0,7);g.fill();for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*s*1.25,y+Math.sin(a)*s*1.25);g.lineTo(x+Math.cos(a)*s*1.6,y+Math.sin(a)*s*1.6);g.stroke()}}
function cloud(g,x,y,s,dk){g.fillStyle=dk?'#94a3b8':'#f8fafc';[[0,0,.5],[.45,.08,.38],[-.45,.1,.36],[.15,-.25,.36]].forEach(([dx,dy,k])=>{g.beginPath();g.arc(x+dx*s,y+dy*s,k*s,0,7);g.fill()})}
function tree(g,x,base,s){g.fillStyle='#78350f';g.fillRect(x-s*.08,base-s*.7,s*.16,s*.7);g.fillStyle='#15803d';g.beginPath();g.arc(x,base-s*.9,s*.5,0,7);g.arc(x-s*.35,base-s*.7,s*.32,0,7);g.arc(x+s*.35,base-s*.7,s*.32,0,7);g.fill()}
/* a child standing with feet at (x, base), height h; w = what they wear, cream = patches done */
function kid(g,x,base,h,w,cream){w=w||{};cream=cream||[];const u=h/10,top=base-h;
 g.fillStyle=SKIN;g.fillRect(x-u*.9,top+u*6.4,u*.7,u*3.4);g.fillRect(x+u*.2,top+u*6.4,u*.7,u*3.4);
 g.fillStyle='#1d4ed8';g.fillRect(x-u*1.1,top+u*5.4,u*2.2,u*1.6);
 g.fillStyle=w.top?'#f97316':SKIN;rr(g,x-u*1.2,top+u*2.6,u*2.4,u*3,u*.5);g.fill();
 g.fillStyle=w.top?'#f97316':SKIN;g.fillRect(x-u*2,top+u*2.8,u*.8,w.top?u*1.4:u*.8);g.fillRect(x+u*1.2,top+u*2.8,u*.8,w.top?u*1.4:u*.8);
 g.fillStyle=SKIN;g.fillRect(x-u*2,top+u*(w.top?4.2:3.6),u*.7,u*(w.top?1.4:2));g.fillRect(x+u*1.3,top+u*(w.top?4.2:3.6),u*.7,u*(w.top?1.4:2));
 g.fillStyle=SKIN2;g.beginPath();g.arc(x-u*1.65,top+u*5.8,u*.45,0,7);g.arc(x+u*1.65,top+u*5.8,u*.45,0,7);g.fill();
 g.fillStyle=SKIN;g.fillRect(x-u*.35,top+u*2.1,u*.7,u*.6);g.beginPath();g.arc(x,top+u*1.2,u*1.05,0,7);g.fill();g.beginPath();g.arc(x-u*1.05,top+u*1.25,u*.3,0,7);g.arc(x+u*1.05,top+u*1.25,u*.3,0,7);g.fill();
 g.fillStyle='#3f2a14';g.beginPath();g.arc(x,top+u*.9,u*1.05,Math.PI,0);g.fill();
 g.fillStyle=INK;g.beginPath();g.arc(x-u*.38,top+u*1.25,u*.12,0,7);g.arc(x+u*.38,top+u*1.25,u*.12,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=Math.max(1.5,u*.12);g.beginPath();g.arc(x,top+u*1.45,u*.35,.2*Math.PI,.8*Math.PI);g.stroke();
 g.fillStyle='#7c2d12';g.fillRect(x-u*.95,base-u*.35,u*.9,u*.35);g.fillRect(x+u*.05,base-u*.35,u*.9,u*.35);
 if(w.specs){g.fillStyle='#111827';g.beginPath();g.arc(x-u*.4,top+u*1.2,u*.3,0,7);g.arc(x+u*.4,top+u*1.2,u*.3,0,7);g.fill();g.fillRect(x-u*.4,top+u*1.12,u*.8,u*.12)}
 if(w.hat){g.fillStyle='#fde68a';g.strokeStyle='#a16207';g.lineWidth=2;g.beginPath();g.ellipse(x,top+u*.55,u*2.1,u*.42,0,0,7);g.fill();g.stroke();rr(g,x-u*.95,top-u*.45,u*1.9,u*1.05,u*.4);g.fill();g.stroke()}
 cream.forEach(k=>{const p=SPOTS.find(s=>s.k===k);if(!p)return;const px=x+(p.x-.5)*u*4.4,py=top+p.y*h;g.fillStyle='rgba(255,255,255,.85)';g.strokeStyle='#0369a1';g.lineWidth=1.5;g.beginPath();g.arc(px,py,u*.42,0,7);g.fill();g.stroke()})}
return{elev,clock,ratio,uvWord,TRY,WEAR,SPOTS,COVERED,DAY,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,emo,rr,wrap,sky,sun,cloud,tree,kid}})();
