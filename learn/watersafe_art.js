/* Data, text helpers and drawings for flagwatersafe (water safety with a grown-up, ages 6–7; PSHE Association
   Programme of Study KS1 H29, H32, H36 keeping safe; RLSS UK and RNLI Water Safety Code: Stop and think, Stay together,
   Float, Call 999 or 112; RNLI Float to Live; RNLI beach flags; Swim England / RLSS pool rules). Slips it targets:
   "I swim well, so I can go in alone", "a friend counts as a grown-up", "calm water is safe", swimming outside the
   red and yellow flags or out of sight, running on a wet poolside, jumping in at the deep end, jumping in to rescue
   someone, and thrashing instead of floating. */
const WSF=(()=>{
const box=(x,y,w,h)=>({x,y,w,h}),inside=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function kit(A,K){const px=n=>Math.round(A.narrow?n:n*1.15);
 function words(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=o.c||K.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&line){rows.push(line);line=w}else line=t}rows.push(line);
  const lh=px(n)*1.22;rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function card(b,fill,state){const g=A.ctx;g.fillStyle=state==='ok'?'#d1fae5':state==='ko'?'#fee2e2':fill||K.card;A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(14,b.h/3));g.fill();
  g.lineWidth=state?4:2;g.strokeStyle={ok:K.ok,ko:K.ko,sel:K.sel}[state]||K.rim;g.stroke()}
 function chip(s,x,y,n,state){const g=A.ctx;g.font=`800 ${px(n)}px system-ui,sans-serif`;const w=g.measureText(s).width+px(14),h=px(n)*1.7;card(box(x-w/2,y-h/2,w,h),'#ffffff',state);words(s,x,y,n)}
 return{px,words,card,chip}}
/* 1. can I go in? y = yes, a trusted grown-up is watching */
const WHO=[{t:'Dad is with you and watching',y:true},{t:'A friend says jump in. No grown-up is there.',y:false,slip:'friend'},
 {t:'You swim well, but no grown-up is there',y:false,slip:'strong'},{t:'Mum and a lifeguard are watching',y:true},
 {t:'Your grown-up went to get ice cream',y:false,slip:'gone'},{t:'The lake looks calm. Nobody is with you.',y:false,slip:'calm'}];
/* 2. the beach: where to swim (x, y as fractions); ok = Gran can see you and lifeguards watch */
const SPOTS=[{x:.42,y:.62,ok:true,why:'Between the flags, close to Gran.'},{x:.08,y:.5,ok:false,slip:'rocks'},
 {x:.53,y:.47,ok:true,why:'Between the flags. The lifeguard is watching.'},{x:.45,y:.26,ok:false,slip:'far'},
 {x:.88,y:.58,ok:false,slip:'red'},{x:.32,y:.68,ok:true,why:'Shallow water between the flags.'}];
const DESC=['A card says who is at the pool. Two boxes: Go in and Wait. Drag the card, or tap a box.',
 'A beach with red and yellow flags, a red flag, rocks and deep water. Drag the swimmer to a place to swim.',
 'A pool with a wet floor. Drag the child slowly along the side to the steps. Running makes them slip.',
 'Sam is in trouble in the water. Shout for a grown-up, then drag the ring float to Sam.',
 'You fell in. Tap your head, arms and legs to lean back and spread out like a starfish.','Challenge.'];
const DONE=['Only go in when a trusted grown-up is with you and watching.','Swim between the red and yellow flags, where Gran and the lifeguard can see you.',
 'Walk on a wet floor. Go in at the shallow end.','Shout for help and throw something that floats. Never jump in.',
 'Lean back and float like a starfish. Then shout and wave for help.'];
const QS=[{q:'You swim well. Can you go in with no grown-up?',a:'No, wait for a grown-up',o:[['Yes, I am a strong swimmer','strong'],['Yes, if a friend comes','friend']]},
 {q:'Where do lifeguards watch at the beach?',a:'Between the red and yellow flags',o:[['By the red flag','red'],['Behind the rocks','rocks']]},
 {q:'A friend is in trouble in the water. What do you do first?',a:'Shout for a grown-up',o:[['Jump in','jump'],['Run home and hide','hide']]},
 {q:'There is a ring float, and a friend is in trouble. What do you do?',a:'Throw it to them',o:[['Swim out with it','jump'],['Keep it on the side','keep']]},
 {q:'You fall in. What helps you most?',a:'Lean back and float like a starfish',o:[['Kick and splash hard','thrash'],['Curl up tight','tuck']]},
 {q:'The floor by the pool is wet. How do you get to the steps?',a:'Walk',o:[['Run','run'],['Jump in at the deep end','deep']]}];
/* ---------- drawings ---------- */
const dot=(g,x,y,r,c)=>{g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=c;g.fill();g.stroke()};
function kid(g,x,y,s,c,o){o=o||{};g.save();g.translate(x,y);g.lineWidth=Math.max(2,s*.05);g.strokeStyle='#1f2937';
 if(o.slip)g.rotate(1.2);g.beginPath();g.moveTo(0,-.1*s);g.lineTo(0,.25*s);g.moveTo(0,.25*s);g.lineTo(-.15*s,.5*s);g.moveTo(0,.25*s);g.lineTo(.15*s,.5*s);
 g.moveTo(-.2*s,(o.wave?-.3:0)*s);g.lineTo(0,0);g.lineTo(.2*s,0);g.stroke();dot(g,0,-.24*s,.14*s,c||'#fed7aa');g.restore()}
function flag(g,x,y,s,top,bot){g.strokeStyle='#1f2937';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-s);g.stroke();g.fillStyle=top;g.fillRect(x,y-s,s*.5,s*.2);if(bot){g.fillStyle=bot;g.fillRect(x,y-s*.8,s*.5,s*.2)}g.strokeRect(x,y-s,s*.5,s*(bot?.4:.2))}
function ring(g,x,y,r){g.lineWidth=r*.45;g.strokeStyle='#ea580c';g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.strokeStyle='#ffffff';g.lineWidth=r*.45;
 for(let i=0;i<4;i++){g.beginPath();g.arc(x,y,r,i*1.57,i*1.57+.35);g.stroke()}g.lineWidth=1.5;g.strokeStyle='#1f2937';g.beginPath();g.arc(x,y,r*1.22,0,7);g.arc(x,y,r*.78,0,7,true);g.stroke()}
/* the floater seen from above: parts = [head back, left arm, right arm, left leg, right leg] */
function floater(g,x,y,s,on){g.save();g.translate(x,y);g.lineCap='round';g.strokeStyle='#1f2937';const limb=(ax,ay,bx,by)=>{g.lineWidth=s*.09;g.strokeStyle='#1f2937';g.beginPath();g.moveTo(ax*s,ay*s);g.lineTo(bx*s,by*s);g.stroke();
 g.lineWidth=s*.06;g.strokeStyle='#fdba74';g.stroke()};
 limb(-.08,-.18,on[1]?-.42:-.14,on[1]?-.42:.1);limb(.08,-.18,on[2]?.42:.14,on[2]?-.42:.1);limb(-.06,.16,on[3]?-.3:-.05,on[3]?.52:.52);limb(.06,.16,on[4]?.3:.05,on[4]?.52:.52);
 g.fillStyle='#2563eb';g.lineWidth=2;g.strokeStyle='#1f2937';g.beginPath();g.ellipse(0,0,.13*s,.24*s,0,0,7);g.fill();g.stroke();
 dot(g,0,-.33*s,.1*s,'#fed7aa');g.fillStyle='#1f2937';
 if(on[0]){g.strokeStyle='#ffffff';g.lineWidth=3;g.beginPath();g.arc(0,-.33*s,.15*s,2.6,3.7);g.stroke();g.beginPath();g.arc(0,-.33*s,.15*s,-.6,.5);g.stroke()}
 g.restore()}
return{box,inside,kit,kid,flag,ring,floater,WHO,SPOTS,DESC,DONE,QS}})();
