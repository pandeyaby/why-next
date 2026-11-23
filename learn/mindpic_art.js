/* Data and pictures for flagmindpic (making a picture in my head, ages 7–9). Sources: Pressley (1976), J. Educ.
   Psychol. 68, 355–358: 8-year-olds taught to make a mental image of each part of a story answered more questions
   about it; Gambrell and Bales (1986), Reading Research Quarterly 21, 454–464: 9 to 11-year-old poor readers told to
   make mental images noticed more of what did not make sense; Hegarty and Kozhevnikov (1999), J. Educ. Psychol. 91,
   684–689: schematic images (where things are, how many) went with solving maths problems, pictorial images (how
   things look) did not; EEF (2021) Metacognition and self-regulated learning. Slips it targets: reading on without
   picturing, keeping the first picture when a new detail changes it, ignoring a picture that does not fit the words,
   picturing decorations instead of what matters, and counting posts instead of gaps. */
const MINDPIC=(()=>{
const ZONES={harbour:{end:{x:.76,y:.42,w:.22,h:.3,t:'at the end of the jetty'},roof:{x:.78,y:.16,w:.2,h:.26,t:'on the boat roof'},post:{x:.14,y:.06,w:.16,h:.26,t:'on the post'},
  under:{x:.36,y:.58,w:.3,h:.26,t:'under the jetty'},jetty:{x:.36,y:.18,w:.3,h:.25,t:'on the jetty'},sand:{x:0,y:.62,w:.2,h:.36,t:'on the sand'},sky:{x:.4,y:0,w:.3,h:.17,t:'in the sky'}},
 room:{desk:{x:.04,y:.3,w:.28,h:.22,t:'on the desk'},bed:{x:.54,y:.36,w:.4,h:.2,t:'on the bed'},underbed:{x:.54,y:.76,w:.4,h:.22,t:'under the bed'},
  door:{x:.33,y:0,w:.18,h:.2,t:'above the door'},window:{x:.68,y:.02,w:.24,h:.26,t:'by the window'},floor:{x:.04,y:.78,w:.28,h:.2,t:'on the floor'}}};
const BUILD={scene:'harbour',text:'A boat is tied at the end of the jetty. A cat sleeps on the roof of the boat. A gull stands on the post at the start of the jetty. A crab hides under the jetty, in the water.',
 pieces:[{k:'boat',want:'end',line:'A boat is tied at the end of the jetty.'},{k:'cat',want:'roof',needs:'boat',line:'A cat sleeps on the roof of the boat.'},
  {k:'gull',want:'post',line:'A gull stands on the post at the start of the jetty.'},{k:'crab',want:'under',line:'A crab hides under the jetty, in the water.'}]};
const NEWS=[{line:'The cat wakes up and jumps onto the jetty.',k:'cat',want:'jetty'},{line:'Two more gulls fly down and land on the boat roof.',k:'gulls',want:'roof',fresh:1},
 {line:'The tide goes out. The crab walks across the sand.',k:'crab',want:'sand'}];
const MEM={scene:'room',text:'In the bedroom, a lamp is on the desk. A cat sleeps on the bed. A red ball is under the bed. A clock hangs above the door.',
 pieces:[{k:'lamp',want:'desk',q:'Was the lamp on the desk, or on the floor?'},{k:'cat',want:'bed',q:'Where did the cat sleep?'},
  {k:'ball',want:'underbed',q:'Was the ball on the bed, or under it?'},{k:'clock',want:'door',q:'Was the clock above the door, or by the window?'}]};
const FIT=[{text:'The sun is above the house. A dog sleeps next to the tree.',pic:{house:.28,tree:.75,sun:.28,dog:.47},odd:'dog',yes:'The words say the dog sleeps next to the tree, but the picture has it next to the house.'},
 {text:'Two balls sit on the roof of the house. The tree is taller than the house.',pic:{house:.3,tree:.74,sun:.8,balls:3},odd:'balls',yes:'The words say two balls, but the picture shows three.'},
 {text:'A tall tree stands to the left of the house. The sun is above the tree.',pic:{house:.3,tree:.75,sun:.75},odd:'tree',yes:'The words say the tree is on the left of the house, but in the picture it is on the right.'}];
const PROB=[{k:'posts',q:'Five posts stand in a row, with 2 metres between each post and the next. How far is it from the first post to the last?',
  opts:[['8 m','ok'],['10 m','posts'],['5 m','one']],why:{posts:'10 m counts a gap for every post. Look at the picture: 5 posts make only 4 gaps, and 4 × 2 = 8 m.',one:'5 is the number of posts, not metres. Count the gaps between them: 4 gaps of 2 m.'},yes:'8 m: 5 posts make 4 gaps, and 4 gaps of 2 m is 8 m.'},
 {k:'line',q:'Ten children wait in a line. Sam is 4th from the front. How many children are behind Sam?',
  opts:[['6','ok'],['7','minus3'],['5','guess']],why:{minus3:'7 is 10 − 3, as if Sam were 3rd. Sam is 4th: 3 in front, Sam, then the rest.',guess:'Count the dots behind Sam in the picture: there are 6.'},yes:'6: 3 children in front of Sam, Sam, and 6 behind make 10.'}];
const DESC=['A harbour with a jetty, a post and some water. Under it, four word cards: boat, cat, gull and crab. Read the words and drag each card to the place they say.',
 'The same harbour picture. A new sentence changes something. Move the picture to fit each new sentence.',
 'Some words and a picture drawn by a robot. One part of the picture does not fit the words. Tap it.',
 'A word problem about posts in a row. First choose the picture that helps, then build it and answer.',
 'A short description of a bedroom. Read it and picture it. Then hide the words and put four things back in the room from memory.'];
const DONE=['Every card is where the words put it: the picture in your head came from the details in the words.',
 'You changed the picture each time a new sentence changed something, so it still matches the story.',
 'You caught all three mismatches. When your picture and the words do not fit, reread.',
 'Simple pictures solved both problems: 4 gaps of 2 m is 8 m, and 6 children stand behind Sam.',
 'You put the room back together from the picture in your head, not from the words.'];
const TXT=['Read the words. Picture the harbour, then drag each card where the words say: boat, cat, gull, crab.',
 'Read each new sentence. What changes? Move or add things so the picture fits again.',
 'Read the words, then look at the robot\u2019s picture. Tap the part that does not fit.',
 'Pick the picture that helps you count, build it, then answer. Show only what matters.',
 'Read the words and make a picture in your head. Tap Hide the words, then put each thing back.'];
const QS=[{q:'You read: "The fox crept under the gate." What should your picture show?',a:'The fox below the gate',o:[['The fox jumping over the gate','any'],['Just a fox, anywhere','any']]},
 {q:'The next sentence says the boat is blue, not red. What do you do?',a:'Change my picture to a blue boat',o:[['Keep my red boat','keep'],['Stop picturing','skip']]},
 {q:'Your picture does not fit what you just read. What is the best move?',a:'Reread and fix the picture',o:[['Read on and hope','ignore'],['Keep my picture anyway','keep']]},
 {q:'Which picture helps you solve a problem about 6 trees in a row?',a:'Six dots with gaps between them',o:[['A detailed drawing of leaves','fancy'],['A drawing of the park and the sky','fancy']]},
 {q:'Four lamp posts stand in a row, 5 m apart. How far from the first to the last?',a:'15 m',o:[['20 m','posts'],['4 m','posts']]},
 {q:'Why make a picture in your head while you read?',a:'It helps me understand and remember',o:[['It is only for fun','skip'],['To add things the words do not say','any']]},
 {q:'Which detail matters most for the picture of "the cat sat between two dogs"?',a:'Where the cat is',o:[['The colour of the dogs\u2019 collars','fancy'],['What the sky looks like','fancy']]}];
function SHAPES(A){const g=()=>A.ctx;
 const INK='#0f172a',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 /* words wrapped into a box at the top, so the picture can be checked against them */
 function page(t,y,o){o=o||{};const c=g(),pad=10,w=A.W-16;let n=sz(o.n||13);c.font=`700 ${n}${F}`;const lines=[];let cur='';
  t.split(' ').forEach(wd=>{const tr=cur?cur+' '+wd:wd;if(c.measureText(tr).width>w-2*pad&&cur){lines.push(cur);cur=wd}else cur=tr});if(cur)lines.push(cur);
  const h=lines.length*(n+5)+pad*1.4;c.fillStyle=o.fill||'#fffbeb';A.paint.rrect(8,y,w,h,10);c.fill();c.strokeStyle=o.ok?'#047857':o.no?'#b91c1c':'#b45309';c.lineWidth=o.ok||o.no?3:1.5;c.stroke();
  c.fillStyle=INK;c.textAlign='left';c.textBaseline='top';lines.forEach((l,i)=>c.fillText(l,8+pad,y+pad*.8+i*(n+5)));return h}
 function harbour(R,boat){const c=g();c.fillStyle='#bae6fd';c.fillRect(R.x,R.y,R.w,R.h);c.fillStyle='#38bdf8';c.fillRect(R.x,R.y+R.h*.5,R.w,R.h*.5);
  c.fillStyle='#fde68a';c.beginPath();c.moveTo(R.x,R.y+R.h*.55);c.quadraticCurveTo(R.x+R.w*.18,R.y+R.h*.6,R.x+R.w*.22,R.y+R.h);c.lineTo(R.x,R.y+R.h);c.fill();
  c.fillStyle='#92400e';c.fillRect(R.x+R.w*.2,R.y+R.h*.43,R.w*.58,R.h*.07);for(let i=0;i<4;i++)c.fillRect(R.x+R.w*(.3+i*.15),R.y+R.h*.5,R.w*.015,R.h*.22);
  c.fillStyle='#78350f';c.fillRect(R.x+R.w*.2,R.y+R.h*.3,R.w*.04,R.h*.42);if(boat){}}
 function room(R){const c=g();c.fillStyle='#fef3c7';c.fillRect(R.x,R.y,R.w,R.h);c.fillStyle='#d6d3d1';c.fillRect(R.x,R.y+R.h*.78,R.w,R.h*.22);
  c.fillStyle='#93c5fd';c.fillRect(R.x+R.w*.7,R.y+R.h*.05,R.w*.2,R.h*.22);c.strokeStyle='#475569';c.lineWidth=2;c.strokeRect(R.x+R.w*.7,R.y+R.h*.05,R.w*.2,R.h*.22);
  c.fillStyle='#a16207';c.fillRect(R.x+R.w*.36,R.y+R.h*.22,R.w*.12,R.h*.56);c.fillStyle='#92400e';c.fillRect(R.x+R.w*.05,R.y+R.h*.52,R.w*.26,R.h*.05);c.fillRect(R.x+R.w*.07,R.y+R.h*.57,R.w*.03,R.h*.21);c.fillRect(R.x+R.w*.26,R.y+R.h*.57,R.w*.03,R.h*.21);
  c.fillStyle='#7c3aed';c.fillRect(R.x+R.w*.54,R.y+R.h*.56,R.w*.4,R.h*.12);c.fillStyle='#e9d5ff';c.fillRect(R.x+R.w*.55,R.y+R.h*.52,R.w*.1,R.h*.05);c.fillStyle='#4c1d95';c.fillRect(R.x+R.w*.55,R.y+R.h*.68,R.w*.03,R.h*.1);c.fillRect(R.x+R.w*.9,R.y+R.h*.68,R.w*.03,R.h*.1)}
 /* small pictures of the things in the stories */
 function thing(k,x,y,u){const c=g();c.lineWidth=1.6;c.strokeStyle=INK;
  if(k==='boat'){c.fillStyle='#dc2626';c.beginPath();c.moveTo(x-u,y);c.lineTo(x+u,y);c.lineTo(x+u*.7,y+u*.5);c.lineTo(x-u*.7,y+u*.5);c.closePath();c.fill();c.stroke();c.fillStyle='#f8fafc';c.fillRect(x-u*.45,y-u*.45,u*.9,u*.45);c.strokeRect(x-u*.45,y-u*.45,u*.9,u*.45);return}
  if(k==='cat'){c.fillStyle='#f97316';c.beginPath();c.ellipse(x,y+u*.15,u*.5,u*.3,0,0,7);c.fill();c.stroke();c.beginPath();c.arc(x+u*.45,y-u*.15,u*.25,0,7);c.fill();c.stroke();
   c.beginPath();c.moveTo(x+u*.3,y-u*.3);c.lineTo(x+u*.35,y-u*.55);c.lineTo(x+u*.48,y-u*.38);c.moveTo(x+u*.5,y-u*.38);c.lineTo(x+u*.62,y-u*.55);c.lineTo(x+u*.66,y-u*.28);c.fill();c.stroke();return}
  if(k==='gull'||k==='gulls'){const n=k==='gulls'?2:1;for(let i=0;i<n;i++){const gx=x+(n>1?(i?u*.5:-u*.5):0),gy=y-u*.12;c.strokeStyle='#b45309';c.lineWidth=2;c.beginPath();c.moveTo(gx-u*.06,gy+u*.12);c.lineTo(gx-u*.06,y+u*.22);c.moveTo(gx+u*.08,gy+u*.12);c.lineTo(gx+u*.08,y+u*.22);c.stroke();c.strokeStyle=INK;c.lineWidth=1.6;c.fillStyle='#f8fafc';c.beginPath();c.ellipse(gx,gy,u*.34,u*.17,0,0,7);c.fill();c.stroke();c.fillStyle='#94a3b8';c.beginPath();c.ellipse(gx-u*.08,gy-u*.03,u*.2,u*.09,-.2,0,7);c.fill();c.stroke();c.fillStyle='#f8fafc';c.beginPath();c.arc(gx+u*.3,gy-u*.17,u*.13,0,7);c.fill();c.stroke();c.fillStyle=INK;c.beginPath();c.arc(gx+u*.33,gy-u*.19,u*.03,0,7);c.fill();c.fillStyle='#facc15';c.beginPath();c.moveTo(gx+u*.42,gy-u*.2);c.lineTo(gx+u*.6,gy-u*.15);c.lineTo(gx+u*.42,gy-u*.12);c.closePath();c.fill()}return}
  if(k==='crab'){c.strokeStyle='#7f1d1d';c.lineWidth=2;for(let i=-1;i<=1;i+=2)for(let j=0;j<3;j++){c.beginPath();c.moveTo(x+i*u*.3,y+u*.05*j);c.lineTo(x+i*u*.6,y+u*(.1+.12*j));c.stroke()}c.fillStyle='#ef4444';c.beginPath();c.ellipse(x,y,u*.38,u*.25,0,0,7);c.fill();c.stroke();return}
  if(k==='lamp'){c.fillStyle='#facc15';c.beginPath();c.moveTo(x-u*.35,y);c.lineTo(x+u*.35,y);c.lineTo(x+u*.2,y-u*.4);c.lineTo(x-u*.2,y-u*.4);c.closePath();c.fill();c.stroke();c.fillStyle='#334155';c.fillRect(x-u*.05,y,u*.1,u*.35);c.fillRect(x-u*.25,y+u*.35,u*.5,u*.08);return}
  if(k==='ball'){c.fillStyle='#dc2626';c.beginPath();c.arc(x,y,u*.3,0,7);c.fill();c.stroke();return}
  if(k==='clock'){c.fillStyle='#ffffff';c.beginPath();c.arc(x,y,u*.35,0,7);c.fill();c.stroke();c.beginPath();c.moveTo(x,y);c.lineTo(x,y-u*.25);c.moveTo(x,y);c.lineTo(x+u*.18,y);c.stroke()}}
 /* the robot's street picture for the does-it-fit rounds; returns where each part is so it can be tapped */
 function street(R,P){const c=g(),gy=R.y+R.h*.82,u=Math.min(R.w*.12,R.h*.21),parts={};c.fillStyle='#e0f2fe';c.fillRect(R.x,R.y,R.w,R.h);c.fillStyle='#86efac';c.fillRect(R.x,gy,R.w,R.h-(gy-R.y));
  const hx=R.x+R.w*P.house;c.fillStyle='#fca5a5';c.fillRect(hx-u*.8,gy-u*1.3,u*1.6,u*1.3);c.fillStyle='#b91c1c';c.beginPath();c.moveTo(hx-u,gy-u*1.3);c.lineTo(hx,gy-u*2.1);c.lineTo(hx+u,gy-u*1.3);c.closePath();c.fill();
  c.fillStyle='#78350f';c.fillRect(hx-u*.2,gy-u*.6,u*.4,u*.6);parts.house={x:hx-u,y:gy-u*2.1,w:2*u,h:u*2.1};
  const tx=R.x+R.w*P.tree;c.fillStyle='#92400e';c.fillRect(tx-u*.15,gy-u*1.4,u*.3,u*1.4);c.fillStyle='#16a34a';c.beginPath();c.arc(tx,gy-u*2,u*.8,0,7);c.fill();parts.tree={x:tx-u*.8,y:gy-u*2.8,w:1.6*u,h:u*2.8};
  const sx=R.x+R.w*P.sun,sy=R.y+R.h*.1;c.fillStyle='#facc15';c.beginPath();c.arc(sx,sy,u*.4,0,7);c.fill();c.strokeStyle='#a16207';c.lineWidth=2;c.stroke();parts.sun={x:sx-u*.5,y:sy-u*.5,w:u,h:u};
  if(P.dog!=null){const dx=R.x+R.w*P.dog;c.fillStyle='#a16207';c.beginPath();c.ellipse(dx,gy-u*.25,u*.4,u*.22,0,0,7);c.fill();c.beginPath();c.arc(dx+u*.38,gy-u*.4,u*.18,0,7);c.fill();parts.dog={x:dx-u*.5,y:gy-u*.65,w:u*1.1,h:u*.65}}
  if(P.balls){for(let i=0;i<P.balls;i++){c.fillStyle='#2563eb';c.beginPath();c.arc(hx-u*.4+i*u*.4,gy-u*1.55-(i%2)*u*.12,u*.17,0,7);c.fill()}parts.balls={x:hx-u*.65,y:gy-u*1.9,w:u*1.3,h:u*.5}}
  return parts}
 return{page,harbour,room,thing,street}}
return{ZONES,BUILD,NEWS,MEM,FIT,PROB,DESC,DONE,TXT,QS,SHAPES}})();
