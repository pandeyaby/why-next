/* Data and pictures for flagdogsafe (staying safe around dogs, ages 4–5). Sources: Dogs Trust 'Be Dog Smart' guide
   (2022) and poster 'How to be safe around dogs' (2025): ask the owner before stroking, let the dog sniff your hand
   first, stroke gently, keep hands away from a dog's eyes, mouth and ears, dogs don't like hugs, leave a dog alone when
   it is eating, sleeping, resting or busy with a toy, no running, chasing or loud noises; Dogs Trust 'Dogs and
   children' (ABC: affection, busy, choice; let the dog choose to come to you and move away); Dogs Trust and RSPCA dog
   body language (yawning, lip licking, turning away, tail tucked, ears back, freezing, whale eye and growling mean a
   dog wants space; a wagging tail does not always mean a happy dog); The Kennel Club 'Become a tree' (stand still,
   fold your arms, tuck your chin, don't run, scream or stare, then walk away slowly and tell an adult). Slips it
   targets: running up to a dog, hugging, patting the head or face, thinking a wagging tail always means happy,
   disturbing a dog that is eating, sleeping or chewing, and running or screaming when a dog runs up. */
const DOGSAFE=(()=>{
const HELLO=[{t:'Ask the owner',n:0},{t:'Let it sniff my hand',n:1},{t:'Stroke its side gently',n:2},
 {t:'Run up to the dog',n:-1,why:'Running at a dog can scare it. Stop and ask the owner first.'},
 {t:'Give it a big hug',n:-2,why:'Most dogs do not like hugs. A hug makes a dog feel trapped.'}];
const MIX=[3,1,4,0,2];
const SPOTS=[{k:'side',t:'Side',ok:1},{k:'head',t:'Face',ok:0,why:'Keep your hands away from a dog\u2019s eyes, mouth and ears. Stroke its side.'},
 {k:'tail',t:'Tail',ok:0,why:'Never pull or grab a tail. It can hurt the dog. Stroke its side.'}];
const MOODS=[{t:'Wiggly body, soft face',f:{mouth:'open',tail:'wag',ears:'up'},ok:1},{t:'Yawning and looking away',f:{mouth:'yawn',ears:'back',look:'away'},ok:0},
 {t:'Bottom up, front down: play bow',f:{pose:'bow',mouth:'open',tail:'wag',ears:'up'},ok:1},{t:'Tail tucked, ears back',f:{tail:'tuck',ears:'back',mouth:'shut'},ok:0},
 {t:'Tail wagging but growling, teeth showing',f:{tail:'stiff',mouth:'teeth',ears:'up'},ok:0},{t:'Licking its lips, body stiff',f:{mouth:'lick',ears:'back',tail:'low'},ok:0}];
const MWHY=['A wiggly body and a soft, open mouth: this dog is happy. Still ask the owner first.','Yawning and turning away mean this dog is worried. Leave it alone.',
 'A play bow means the dog wants to play. Still ask the owner first.','A tucked tail and flat ears mean this dog is scared. Leave it alone.',
 'A wagging tail does not always mean happy. Growling and showing teeth mean stay away.','Licking its lips and going stiff mean this dog is worried. Leave it alone.'];
const DOGS=[{t:'Eating its dinner',f:{bowl:1,pose:'eat'},busy:1,why:'This dog is eating. Dogs can snap to keep their food safe. Leave it alone.'},
 {t:'Fast asleep',f:{pose:'sleep'},busy:1,why:'This dog is asleep. A dog woken up suddenly can get a fright. Let it sleep.'},
 {t:'Owner says: yes, you can',f:{mouth:'open',tail:'wag',ears:'up'},busy:0,why:'This dog is calm and its owner says yes. You can let it sniff your hand, then stroke its side.'},
 {t:'Chewing its toy',f:{toy:1,pose:'lie'},busy:1,why:'This dog is busy with its toy. Do not take it or reach in. Leave it alone.'}];
const TREE=[{k:'still',t:'Stand still',ok:1},{k:'run',t:'Run away',ok:0,why:'Do not run. A running child looks like a game of chase, so the dog runs after you.'},
 {k:'fold',t:'Fold my arms',ok:1},{k:'scream',t:'Scream',ok:0,why:'Do not scream. Loud noises make a dog more excited or scared. Be quiet like a tree.'},
 {k:'feet',t:'Look at my feet',ok:1},{k:'wave',t:'Wave my arms',ok:0,why:'Waving arms look like a game to a dog. Fold your arms like a tree.'}];
const DESC=['A girl, a dog and its owner in the park. Five cards are mixed up below. Tap the three right steps in order to say hello to the dog. Two cards are mistakes.',
 'A dog standing side on. Drag the hand along its side to stroke it, or use the buttons. Try its side, its face or its tail.',
 'A picture of a dog and two boxes: Happy to say hello, and Leave me alone. Look at the dog\u2019s body, then drag the card or use the buttons.',
 'Four dogs: one eating, one asleep, one with its owner, one chewing a toy. Tap each dog that you should leave alone.',
 'A dog you do not know runs up to a boy. Six cards are below. Tap the three that make him a tree.'];
const TXT=['Tap the steps to say hello to a dog, in order.','Give the dog gentle strokes. Where does it like them?','Look at the whole dog. Happy, or leave me alone?','Some dogs are busy. Find the dogs to leave alone.','A dog you do not know runs at you. Be a tree!'];
const DONE=['Ask the owner, let the dog sniff your hand, then stroke its side gently.','Gentle strokes on the side. Hands away from the face, and no hugs or tail pulling.',
 'Look at the whole dog. A wagging tail is not enough: yawning, licking lips, a tucked tail or growling mean leave me alone.',
 'Eating, sleeping or busy with a toy: leave it alone. Only say hello when the owner says yes.','Stand still, fold your arms, look at your feet. The dog gets bored and goes. Then walk away slowly and tell a grown-up.'];
const QS=[{q:'You see a dog you like. What do you do first?',a:'Ask the owner',o:[['Run up and stroke it','run'],['Give it a hug','hug']]},
 {q:'Where do you stroke a dog?',a:'Gently on its side',o:[['On its face','face'],['Pull its tail','tail']]},
 {q:'A dog is wagging its tail and growling. What does it want?',a:'To be left alone',o:[['To play with me','wag'],['A big hug','hug']]},
 {q:'A dog is eating its dinner. What do you do?',a:'Leave it alone',o:[['Stroke it while it eats','busy'],['Take its bowl','busy']]},
 {q:'A dog you do not know runs at you. What do you do?',a:'Stand still like a tree',o:[['Run away fast','run'],['Scream and wave','scream']]},
 {q:'A dog yawns and turns its head away. How does it feel?',a:'Worried',o:[['Sleepy, so I can stroke it','yawn'],['Happy to play','yawn']]},
 {q:'What does a dog do with your hand before you stroke it?',a:'Sniffs it',o:[['Licks your face','hug'],['Shakes it','sniff']]}];
/* pictures: a side-on dog with a body language face, a child, and the shared banner and card */
function SHAPES(A){const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif',sz=n=>A.narrow?n:Math.round(n*1.15);
 const g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const o=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(cur&&c.measureText(tr).width>max){o.push(cur);cur=w}else cur=tr}if(cur)o.push(cur);return o}
 function banner(t,tone,note,bad){const c=g(),font=`800 ${sz(15)}${F}`,L=wrap(t,A.W-34,font),lh=sz(15)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(13)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(13)*1.3));y+=L2.length*sz(13)*1.3+6}return y}
 function card(r,t,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?3.5:1.6;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();let n=sz(o.n||14),L;
  for(;;){L=wrap(t,r.w-12,`800 ${n}${F}`);if(L.length*n*1.2<=(o.top?r.h*.34:r.h-6)||n<=9)break;n--}c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';
  const y0=o.top?r.y+r.h-L.length*n*1.2/2-6:r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,y0+(i-(L.length-1)/2)*n*1.2))}
 /* a dog facing right; s is its body length. f: pose stand|bow|sleep|lie|eat, tail wag|tuck|stiff|low, ears up|back,
    mouth open|shut|teeth|yawn|lick, look away, bowl, toy. Returns hit boxes for head, body and tail. */
 function dog(x,y,s,f){f=f||{};const c=g(),u=s/2,pose=f.pose||'stand',low=pose==='sleep'||pose==='lie'||pose==='eat';c.save();c.lineWidth=2;c.strokeStyle='#422006';
  const body='#c2853d',dark='#7c4a1e',by=y-(low?u*.35:u*.75),fy=pose==='bow'?y-u*.4:by,hx=x+u*.95,hy=pose==='eat'?y-u*.25:pose==='sleep'?y-u*.35:pose==='bow'?y-u*.55:by-u*.45;
  c.fillStyle=dark;if(!low)[[-.65,by],[-.35,by],[.45,fy],[.7,fy]].forEach(([d,yy])=>{c.fillRect(x+d*u-u*.08,yy,u*.16,y-yy)});
  c.fillStyle=body;c.beginPath();c.moveTo(x-u*.85,by-u*.35);c.quadraticCurveTo(x,(by+fy)/2-u*.55,x+u*.85,fy-u*.35);c.lineTo(x+u*.85,fy+u*.2);c.quadraticCurveTo(x,(by+fy)/2+u*.45,x-u*.85,by+u*.2);c.closePath();c.fill();c.stroke();
  const tx=x-u*.85,ty=by-u*.2,t=f.tail||'low';c.strokeStyle=dark;c.lineWidth=Math.max(3,u*.12);c.lineCap='round';c.beginPath();c.moveTo(tx,ty);
  if(t==='wag'){c.quadraticCurveTo(tx-u*.35,ty-u*.2,tx-u*.3,ty-u*.6);c.stroke();c.lineWidth=2;c.strokeStyle='#64748b';[0,1].forEach(k=>{c.beginPath();c.arc(tx-u*.3,ty-u*.6,u*(.2+k*.12),-2.6,-1.6);c.stroke()})}
  else if(t==='stiff'){c.lineTo(tx-u*.15,ty-u*.7);c.stroke()}else if(t==='tuck'){c.quadraticCurveTo(tx-u*.15,ty+u*.4,tx+u*.25,ty+u*.45);c.stroke()}else{c.quadraticCurveTo(tx-u*.3,ty+u*.1,tx-u*.35,ty+u*.45);c.stroke()}
  c.lineWidth=2;c.strokeStyle='#422006';c.fillStyle=body;c.beginPath();c.arc(hx,hy,u*.38,0,7);c.fill();c.stroke();
  const away=f.look==='away',sx=away?-1:1;c.beginPath();c.ellipse(hx+sx*u*.38,hy+u*.1,u*.24,u*.16,0,0,7);c.fill();c.stroke();c.fillStyle='#111827';c.beginPath();c.arc(hx+sx*u*.6,hy+u*.04,u*.07,0,7);c.fill();
  c.fillStyle=dark;const ear=f.ears==='back';c.beginPath();if(ear){c.ellipse(hx-sx*u*.3,hy-u*.15,u*.22,u*.1,sx*.3,0,7)}else{c.ellipse(hx-sx*u*.05,hy-u*.42,u*.11,u*.22,sx*-.3,0,7)}c.fill();
  if(pose==='sleep'){c.strokeStyle='#111827';c.lineWidth=2;c.beginPath();c.arc(hx+sx*u*.12,hy-u*.05,u*.07,.2,2.9);c.stroke();c.fillStyle=fg();c.font=`800 ${Math.round(u*.32)}${F}`;c.fillText('z z',hx+u*.2,hy-u*.6)}
  else{c.fillStyle='#111827';c.beginPath();c.arc(hx+sx*u*.12,hy-u*.08,u*.06,0,7);c.fill()}
  const m=f.mouth||'shut',mx=hx+sx*u*.38,my=hy+u*.24;c.strokeStyle='#111827';c.lineWidth=2;
  if(m==='open'){c.fillStyle='#be123c';c.beginPath();c.ellipse(mx,my+u*.03,u*.12,u*.07,0,0,Math.PI);c.fill();c.fillStyle='#f472b6';c.beginPath();c.ellipse(mx,my+u*.12,u*.06,u*.08,0,0,7);c.fill()}
  else if(m==='teeth'){c.fillStyle='#ffffff';c.fillRect(mx-u*.15,my-u*.02,u*.3,u*.1);c.strokeRect(mx-u*.15,my-u*.02,u*.3,u*.1);for(let i=1;i<4;i++){c.beginPath();c.moveTo(mx-u*.15+i*u*.075,my-u*.02);c.lineTo(mx-u*.15+i*u*.075,my+u*.08);c.stroke()}c.fillStyle=fg();c.font=`800 ${Math.round(u*.26)}${F}`;c.fillText('grrr',hx+sx*u*.45,hy-u*.45)}
  else if(m==='yawn'){c.fillStyle='#7f1d1d';c.beginPath();c.ellipse(mx,my+u*.04,u*.1,u*.13,0,0,7);c.fill()}
  else if(m==='lick'){c.beginPath();c.moveTo(mx-u*.12,my);c.lineTo(mx+u*.08,my);c.stroke();c.fillStyle='#f472b6';c.beginPath();c.ellipse(mx+sx*u*.14,my-u*.06,u*.07,u*.05,0,0,7);c.fill()}
  else{c.beginPath();c.moveTo(mx-u*.12,my);c.lineTo(mx+u*.1,my);c.stroke()}
  if(f.bowl){c.fillStyle='#2563eb';c.beginPath();c.moveTo(hx+u*.15,y);c.lineTo(hx+u*.95,y);c.lineTo(hx+u*.8,y-u*.25);c.lineTo(hx+u*.3,y-u*.25);c.closePath();c.fill();c.fillStyle='#92400e';c.beginPath();c.ellipse(hx+u*.55,y-u*.27,u*.24,u*.06,0,0,7);c.fill()}
  if(f.toy){c.fillStyle='#dc2626';c.beginPath();c.arc(hx+u*.55,hy+u*.35,u*.14,0,7);c.fill();c.strokeStyle='#7f1d1d';c.stroke()}
  c.restore();return{head:{x:hx-u*.5,y:hy-u*.6,w:u*1.2,h:u*1.1},body:{x:x-u*.75,y:Math.min(by,fy)-u*.45,w:u*1.45,h:u*.85},tail:{x:tx-u*.55,y:ty-u*.75,w:u*.6,h:u*1.25}}}
 /* a child: pose stand|reach|fold|feet|run|wave */
 function child(x,y,h,pose,col){const c=g(),u=h/6;c.save();c.lineCap='round';c.lineWidth=Math.max(3,u*.45);c.strokeStyle=col||'#7c3aed';
  const hip=y-u*2.2,neck=y-u*4.4,hy=pose==='feet'?y-u*4.85:y-u*5.1;c.beginPath();c.moveTo(x,neck);c.lineTo(x,hip);c.stroke();
  c.strokeStyle='#334155';c.beginPath();if(pose==='run'){c.moveTo(x,hip);c.lineTo(x-u*1.2,y);c.moveTo(x,hip);c.lineTo(x+u*1.1,y-u*.4)}else{c.moveTo(x,hip);c.lineTo(x-u*.6,y);c.moveTo(x,hip);c.lineTo(x+u*.6,y)}c.stroke();
  c.strokeStyle='#d6a35c';c.beginPath();const sh=neck+u*.4;
  if(pose==='fold'||pose==='feet'){c.moveTo(x-u*.7,sh+u*.3);c.lineTo(x+u*.7,sh+u*.7);c.moveTo(x+u*.7,sh+u*.3);c.lineTo(x-u*.7,sh+u*.7)}
  else if(pose==='wave'){c.moveTo(x,sh);c.lineTo(x-u*1.1,sh-u*1.5);c.moveTo(x,sh);c.lineTo(x+u*1.1,sh-u*1.5)}
  else if(pose==='reach'){c.moveTo(x,sh);c.lineTo(x+u*1.8,sh+u*.7);c.moveTo(x,sh);c.lineTo(x-u*.5,hip)}
  else if(pose==='run'){c.moveTo(x,sh);c.lineTo(x-u*1.2,sh-u*.8);c.moveTo(x,sh);c.lineTo(x+u*1.2,sh+u*.3)}else{c.moveTo(x,sh);c.lineTo(x-u*.6,hip);c.moveTo(x,sh);c.lineTo(x+u*.6,hip)}c.stroke();
  c.fillStyle='#d6a35c';c.strokeStyle='#422006';c.lineWidth=2;c.beginPath();c.arc(x,hy,u*.75,0,7);c.fill();c.stroke();c.fillStyle='#111827';
  const ey=pose==='feet'?hy+u*.25:hy-u*.1;c.beginPath();c.arc(x-u*.28,ey,u*.09,0,7);c.arc(x+u*.28,ey,u*.09,0,7);c.fill();
  if(pose==='wave'||pose==='run'){c.beginPath();c.ellipse(x,hy+u*.35,u*.18,u*.22,0,0,7);c.fill()}c.restore()}
 function hand(x,y,u){const c=g();c.save();c.fillStyle='#d6a35c';c.strokeStyle='#422006';c.lineWidth=2;A.paint.rrect(x-u*.35,y-u*.25,u*.7,u*.5,u*.2);c.fill();c.stroke();
  for(let i=0;i<4;i++){A.paint.rrect(x-u*.33+i*u*.17,y-u*.5,u*.14,u*.3,u*.07);c.fill();c.stroke()}c.restore()}
 return{wrap,banner,card,dog,child,hand,sz,fg,dk,INK,OK,NO,RIM,F}}
return{HELLO,MIX,SPOTS,MOODS,MWHY,DOGS,TREE,DESC,TXT,DONE,QS,SHAPES}})();
