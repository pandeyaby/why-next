/* Data and drawings for flaglost (If I get lost: stop, stay and ask a safe helper; Personal & Social, Responsible
   Decision-Making, ages 4-5). Sources: NCMEC KidSmartz 'If you get lost in a store' (do not wander looking for your
   grown-up; go to a checkout counter or a person who works there; never go out to the parking lot); Kidpower
   International guidance on getting lost (stay in one place and get help from a safe stranger, such as a person at a
   counter or a mother with children); PSHE Association Programme of Study (2020) KS1 Keeping safe; DfE Relationships
   Education guidance (2019) Being safe. Slips it targets: running off to look for the grown-up; going out to the car
   park, the gate or the road; hiding; asking a dog or nobody; giving no names; going off with someone who says they
   know where the grown-up is; running ahead or playing hide and seek in a busy place. */
const LST=(()=>{
/* step 1: the first move, in three places */
const FIRST=[{place:'shop',cue:'You are in the shop. You cannot see Mum.',ok:'Stop. Stay in the shop.',o:[['Run off to look for Mum','run'],['Go out to the car park','out']]},
 {place:'park',cue:'You are in the park. You cannot see Dad.',ok:'Stop. Stay in the park.',o:[['Hide in the bushes','hide'],['Go out of the gate to the road','out']]},
 {place:'zoo',cue:'You are at the zoo. You cannot see Gran.',ok:'Stop. Stay in the zoo.',o:[['Run to look for Gran','run'],['Go with a man who says, \u201CCome with me\u201D','go']]}];
/* step 2: who to ask, in the shop (x, y are fractions of the scene) */
const WHO=[{e:'\u{1F9D1}\u200D\u{1F4BC}',t:'Person at the till',s:'At the till',ok:1,x:.17,y:.3,till:1},{e:'\u{1F6AA}',t:'Door to the car park',s:'Car park door',ok:0,k:'out',x:.5,y:.3},{e:'\u{1F469}',e2:'\u{1F467}',t:'Mum with her child',s:'A mum and child',ok:1,x:.83,y:.3},
 {e:'\u{1F415}',t:'A dog',s:'A dog',ok:0,k:'dog',x:.17,y:.8},{e:'\u{1F46E}',t:'Police officer',s:'Police officer',ok:1,x:.5,y:.8},{e:'\u{1F4E6}',t:'Hide behind boxes',s:'Hide behind boxes',ok:0,k:'hide',x:.83,y:.8}];
/* step 3: what to tell the helper */
const TELL=[{t:'My name is Sam.',ok:1},{t:'I like red cars.',ok:0,k:'off'},{t:'I am with my mum, Ana.',ok:1},{t:'Say nothing and run off',ok:0,k:'run'},{t:'Show Mum\u2019s number on my wristband',ok:1},{t:'Go and look on my own',ok:0,k:'alone'}];
/* step 4: stay with the helper */
const STAY=[{cue:'A man says, \u201CCome to my car. I will find your mum.\u201D',ok:'No! I stay with the helper.',o:[['Go with him to his car','go'],['Run out to the car park','out']]},
 {cue:'The helper says, \u201CLet\u2019s wait here at the till. I will call your mum.\u201D',ok:'Wait with the helper',o:[['Run off to look','run'],['Hide under a shelf','hide']]},
 {cue:'A lady says, \u201CYour mum is outside. Come with me.\u201D',ok:'No! I stay inside with the helper.',o:[['Go outside with her','go'],['Go out on my own','out']]}];
/* step 5: be ready before a busy trip */
const READY=[{e:'\u231A',t:'Wristband with the phone number',ok:1},{e:'\u{1F3C3}',t:'Run on ahead of Mum',ok:0,k:'ahead'},{e:'\u{1F5E3}\uFE0F',t:'Say Mum\u2019s name: Ana',ok:1},
 {e:'\u{1F648}',t:'Play hide and seek in the shop',ok:0,k:'seek'},{e:'\u{1F4CD}',t:'Plan: if lost, go to the till',ok:1},{e:'\u{1F36C}',t:'Take sweets from anyone who asks',ok:0,k:'sweets'}];
const DESC=['A child alone in a busy place. Tap or use the buttons to choose the first thing to do, in 3 places.',
 'A shop with six things in it. Drag the child to a safe helper, or use the buttons. Find all 3 safe helpers.',
 'The helper asks the child who they are. Tap the 3 things that help the helper find Mum.',
 'People talk to the lost child. Choose what to do each time: stay with the helper, inside.',
 'Getting ready for a busy trip. Tap the 3 things that help if you get lost.'];
const TXT=['Lost? Stop. Stay inside.','Ask a safe helper.','Say who you are.','Stay with the helper.','Be ready before you go.'];
const DONE=['You stopped every time and stayed inside: in the shop, the park and the zoo.',
 'The person at the till, a mum with her child and a police officer are all safe helpers.',
 'Your name, your grown-up\u2019s name and the phone number help the helper find Mum fast.',
 'You stayed with the helper, inside, and did not go off with anyone. Here comes Mum!',
 'A wristband, Mum\u2019s name and a plan: you are ready for a busy day out.'];
const QS=[{q:'You cannot see Dad in the shop. What do you do first?',a:'Stop and stay in the shop',o:[['Run to look for him','run'],['Go out to the car park','out']]},
 {q:'Who is a safe helper in a shop?',a:'A person at the till',o:[['A dog by the door','dog'],['Nobody, just hide','hide']]},
 {q:'The helper asks, \u201CWho are you with?\u201D What do you say?',a:'My dad, Tom',o:[['I like trains','off'],['Nothing','run']]},
 {q:'A man says, \u201CCome with me, I know where your mum is.\u201D What do you do?',a:'Say no and stay with the helper',o:[['Go with him','go'],['Go out to look','out']]},
 {q:'You are lost in the park. Where do you stay?',a:'In the park, near a helper',o:[['Out on the road','out'],['Deep in the bushes','hide']]},
 {q:'Which helps if you get lost?',a:'A wristband with the phone number',o:[['Running on ahead','ahead'],['Playing hide and seek','seek']]},
 {q:'Who could help you at the zoo?',a:'A zoo keeper in uniform',o:[['A giraffe','dog'],['Someone outside the gate','out']]},
 {q:'Sam is lost and scared. Is it OK to cry and ask for help?',a:'Yes, then ask a safe helper',o:[['No, hide so no one sees','hide'],['No, run home alone','alone']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function box(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* the three places: a shop with shelves, a park with trees and a gate, a zoo with a fence and a giraffe */
function place(g,r,k,dk){const s=Math.min(r.w,r.h);
 if(k==='shop'){g.fillStyle=dk?'#1e3a8a':'#dbeafe';box(g,r.x,r.y,r.w,r.h,12);g.fill();g.fillStyle=dk?'#334155':'#f1f5f9';g.fillRect(r.x+8,r.y+r.h*.62,r.w-16,r.h*.38-8);
  ['#ef4444','#f59e0b','#22c55e','#3b82f6'].forEach((col,i)=>{const sx=r.x+r.w*(.06+i*.235);g.fillStyle='#94a3b8';g.fillRect(sx,r.y+r.h*.12,r.w*.18,r.h*.46);
   for(let j=0;j<3;j++){g.fillStyle=col;g.fillRect(sx+4,r.y+r.h*(.15+j*.14),r.w*.18-8,r.h*.08)}})}
 else if(k==='park'){g.fillStyle=dk?'#14532d':'#dcfce7';box(g,r.x,r.y,r.w,r.h,12);g.fill();g.fillStyle=dk?'#166534':'#86efac';g.fillRect(r.x+8,r.y+r.h*.62,r.w-16,r.h*.38-8);
  emo(g,'\u{1F333}',r.x+r.w*.14,r.y+r.h*.36,s*.32);emo(g,'\u{1F333}',r.x+r.w*.4,r.y+r.h*.3,s*.26);g.strokeStyle='#78350f';g.lineWidth=4;
  for(let i=0;i<5;i++){const gx=r.x+r.w*(.74+i*.045);g.beginPath();g.moveTo(gx,r.y+r.h*.3);g.lineTo(gx,r.y+r.h*.62);g.stroke()}}
 else{g.fillStyle=dk?'#422006':'#fef3c7';box(g,r.x,r.y,r.w,r.h,12);g.fill();g.fillStyle=dk?'#713f12':'#fde68a';g.fillRect(r.x+8,r.y+r.h*.62,r.w-16,r.h*.38-8);
  emo(g,'\u{1F992}',r.x+r.w*.2,r.y+r.h*.34,s*.32);g.strokeStyle='#64748b';g.lineWidth=3;g.beginPath();g.moveTo(r.x+8,r.y+r.h*.56);g.lineTo(r.x+r.w*.45,r.y+r.h*.56);g.stroke()}}
/* the lost child, with a question bubble, or a stop hand once they have stopped */
function kid(g,x,y,s,mood){emo(g,mood==='ok'?'\u{1F9D2}':'\u{1F622}',x,y,s);if(mood==='ok'){emo(g,'\u270B',x+s*.62,y-s*.35,s*.5)}
 else{g.fillStyle='#ffffff';g.strokeStyle=RIM;g.lineWidth=2;g.beginPath();g.arc(x+s*.62,y-s*.5,s*.26,0,7);g.fill();g.stroke();g.font=`800 ${Math.round(s*.34)}${FONT}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText('?',x+s*.62,y-s*.49)}}
/* a till counter under the shop worker, with a name badge */
function till(g,x,y,s){g.fillStyle='#475569';box(g,x-s*.6,y+s*.3,s*1.2,s*.34,6);g.fill();g.fillStyle='#fde047';box(g,x+s*.16,y-s*.02,s*.3,s*.18,3);g.fill()}
/* a speech bubble with wrapped words */
function bubble(g,x,y,w,t,n,dk){g.font=`700 ${n}${FONT}`;const words=String(t).split(' '),L=[];let line='';
 for(const wd of words){const nx=line?line+' '+wd:wd;if(line&&g.measureText(nx).width>w-20){L.push(line);line=wd}else line=nx}if(line)L.push(line);
 const h=L.length*n*1.25+16;g.fillStyle=dk?'#1e293b':'#ffffff';g.strokeStyle=RIM;g.lineWidth=2;box(g,x,y,w,h,12);g.fill();g.stroke();
 g.fillStyle=dk?'#f1f5f9':INK;g.textAlign='left';g.textBaseline='top';L.forEach((s,i)=>g.fillText(s,x+10,y+8+i*n*1.25));return h}
return{FIRST,WHO,TELL,STAY,READY,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,emo,box,place,kid,till,bubble}})();
