/* Flagship: Contact & Non-Contact Forces (ages 7-8, KS2 Y3). The gap between two objects: touch vs magnet at a distance. */
(()=>{
// model (illustrative): pull at gaps 0-5 cm; clip jumps at 3 cm
const PULL=[10,7,4.5,2.5,1.2,0.5],JUMP=3;
const SHEETS=[{k:'paper',gap:0.1,word:'a sheet of paper'},{k:'card',gap:0.3,word:'thin card'},{k:'thick book',gap:4,word:'a thick book'}];
const CARDS=[['kicking a ball',0],['a magnet pulling a pin',1],['friction slowing a sledge',0],['an apple falling to the ground',1],['pulling a door open',0],['two magnets pushing apart',1]];
VIS.reg('flaggapforce',c=>{let A,row,quiz,qi=-1;const S={};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const scene=()=>['touch','magnet','gap','sheet','sort','float','quiz'][A.step];
function write(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.light?500:700} ${px}px system-ui,sans-serif`;g.textAlign=o.at||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function reset(o){for(const k in S)delete S[k];Object.assign(S,{hand:0,ball:0,tries:{gap:false,touch:false},mag:0,jumped:false,meas:[],kind:'magnet',g:1,sheet:-1,held:{},ci:0,sorted:[],flip:false,flips:{a:false,r:false},press:0,pressed:false,msg:'',then:()=>{}},o||{});A.redraw()}
// ---------- pictures ----------
function bar(g,x,y,w,h){const C=A.col;g.fillStyle=C.rd;g.fillRect(x,y,w/2,h);g.fillStyle=C.cy;g.fillRect(x+w/2,y,w/2,h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);
 write('N',x+w/4,y+h/2,Math.min(16,h*.6),{ink:'#fff'});write('S',x+w*.75,y+h/2,Math.min(16,h*.6),{ink:'#fff'})}
function clip(g,x,y,s){g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x+s,y-s*.35);g.lineTo(x,y-s*.35);g.arc(x,y,s*.35,-Math.PI/2,Math.PI/2,true);g.lineTo(x+s*1.2,y+s*.35);g.arc(x+s*1.2,y+s*.05,s*.3,Math.PI/2,-Math.PI/2,true);g.lineTo(x+s*.25,y-s*.25);g.stroke()}
function arrowTo(g,x0,y0,x1,col,word,y1){y1=y1==null?y0:y1;const L=Math.hypot(x1-x0,y1-y0);if(L<5)return;const a=Math.atan2(y1-y0,x1-x0);g.strokeStyle=col;g.fillStyle=col;g.lineWidth=5;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1-11*Math.cos(a),y1-11*Math.sin(a));g.stroke();g.save();g.translate(x1,y1);g.rotate(a);g.beginPath();g.moveTo(0,0);g.lineTo(-15,-8);g.lineTo(-15,8);g.closePath();g.fill();g.restore();if(word)write(word,(x0+x1)/2,(y0+y1)/2-17,13,{ink:col})}
function ruler(g,x,y,cmPx,n,rev){const C=A.col,mu={ink:C.mu,light:true};g.strokeStyle=C.mu;g.lineWidth=1.5;g.beginPath();g.moveTo(x,y);g.lineTo(x+n*cmPx,y);g.stroke();for(let i=0;i<=n;i++){g.beginPath();g.moveTo(x+i*cmPx,y-5);g.lineTo(x+i*cmPx,y+5);g.stroke();write((rev?n-i:i)+'',x+i*cmPx,y+16,12,mu)}write('gap in cm',x+n*cmPx/2,y+34,12,mu)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=scene(),N=A.narrow,mu={ink:C.mu,light:true};g.fillStyle=A.mix(C.pn,C.cy,C.dark?.05:.06);g.fillRect(0,0,W,H);const hs=N?14:16,cmPx=Math.min(W*.11,70);
 if(k==='quiz'){write('Touching, or acting across a gap?',W/2,H*.42,N?15:18);write('Answer below',W/2,H*.56,13,mu);A.fx.draw(g);return}
 const floorY=H*.62;
 if(k==='touch'){write('Push the ball: with a gap, then touching',W/2,H*.07,hs);g.fillStyle=C.ln;g.fillRect(0,floorY,W,4);
  const bx=W*.55+S.ball,r=N?20:26,hx=W*.18+S.hand*(W*.55-r-W*.18);g.fillStyle=C.am;g.beginPath();g.arc(bx,floorY-r,r,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  g.fillStyle=A.mix(C.pn,'#f5c49b',.85);A.paint.rrect(hx-46,floorY-r*1.5,46,r*1.1,10);g.fill();g.stroke();write('hand',hx-23,floorY-r*1.95,12,{ink:C.mu});
  const gap=Math.max(0,(W*.55-r-hx)/cmPx),rolled=S.ball>4;write(rolled?'Touching, so the ball rolled away':gap<.05?'Touching':`Gap ${gap.toFixed(1)} cm`,W/2,H*.2,hs,{ink:rolled||gap<.05?C.gr:C.rd});
  write(S.msg,W/2,H*.86,13,mu)}
 if(k==='magnet'){write('Slide the magnet towards the clip',W/2,H*.07,hs);const cx=W*.78,mw=N?84:110,mh=N?30:36,gap=S.jumped?0:Math.max(0,S.mag);
  const mx=cx-gap*cmPx-mw;bar(g,mx,floorY-mh,mw,mh);const clipX=S.jumped?mx+mw+4:cx;clip(g,clipX,floorY-mh/2,N?20:26);
  if(!S.jumped&&gap<=5)arrowTo(g,cx-4,floorY-mh-22,cx-4-PULL[Math.round(gap)]*7,C.vi,'pull');
  ruler(g,cx-5*cmPx,floorY+26,cmPx,5,true);write(S.jumped?'The clip jumped across the gap!':`Gap ${gap.toFixed(0)} cm`,W/2,H*.2,hs,{ink:S.jumped?C.gr:C.tx});
  g.fillStyle=C.am;g.beginPath();g.arc(mx+mw/2,floorY-mh-18,12,0,7);g.fill();write('drag',mx+mw/2,floorY-mh-40,12,{ink:C.mu})}
 if(k==='gap'){write('How strong is each force at each gap?',W/2,H*.07,hs);const x0=W*.12,x1=W*.94,y0=H*.16,y1=H*.74,bw=(x1-x0)/6;
  g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0,y1);g.lineTo(x1,y1);g.stroke();
  for(let i=0;i<6;i++)write(i+' cm',x0+bw*(i+.5),y1+15,12,{light:true});write('gap',W/2,y1+34,12,{ink:C.mu});
  S.meas.forEach(m=>{const v=m.kind==='magnet'?PULL[m.g]:(m.g===0?10:0),h=(y1-y0)*v/10,off=m.kind==='magnet'?-.2:.2;g.fillStyle=m.kind==='magnet'?C.vi:C.am;g.fillRect(x0+bw*(m.g+.5+off)-bw*.18,y1-h,bw*.36,h);if(!v)write('0',x0+bw*(m.g+.5+off),y1-10,12,{ink:C.am})});
  g.fillStyle=C.vi;g.fillRect(x0+6,H*.88-6,12,12);write('magnet pull',x0+24,H*.88,12,{at:'left'});g.fillStyle=C.am;g.fillRect(W*.55,H*.88-6,12,12);write('hand push',W*.55+18,H*.88,12,{at:'left'});
  write(`Now testing: ${S.kind==='magnet'?'magnet pull':'hand push'} at ${S.g} cm`,W/2,H*.13,12,mu)}
 if(k==='sheet'){write('Can the magnet pull through it?',W/2,H*.07,hs);const wx=W*.5,top=H*.2,bot=H*.8;
  const sh=S.sheet>=0?SHEETS[S.sheet]:null,th=sh?Math.max(4,Math.min(W*.3,sh.gap*cmPx*.9)):0;
  bar(g,wx-th/2-(N?84:110)-2,H*.45,N?84:110,N?30:36);
  if(sh){g.fillStyle=sh.k==='thick book'?A.mix(C.pn,C.rd,.35):A.mix(C.pn,C.am,.35);g.fillRect(wx-th/2,top,th,bot-top);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(wx-th/2,top,th,bot-top);write(sh.k,wx,top-12,13)}
  const held=sh&&sh.gap<=JUMP;clip(g,wx+th/2+4,held?H*.45+(N?15:18):bot-10,N?20:26);
  write(!sh?'Choose something to put in the gap':held?`Held through ${sh.word}!`:`Too far: the clip drops`,W/2,H*.9,13,{ink:!sh?C.mu:held?C.gr:C.rd})}
 if(k==='sort'){write('Touching force or force at a distance?',W/2,H*.07,hs);const bw=W*.42,by=H*.5,bh=H*.4;
  [[W*.05,'contact','needs touching'],[W*.53,'non-contact','acts across a gap']].forEach(([x,t,s],i)=>{g.fillStyle=A.mix(C.pn,i?C.vi:C.am,.18);A.paint.rrect(x,by,bw,bh,14);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();write(t,x+bw/2,by+18,15);write(s,x+bw/2,by+38,12,mu);
   S.sorted.filter(j=>CARDS[j][1]===i).forEach((j,n)=>write('✓ '+CARDS[j][0],x+bw/2,by+60+n*20,12,{light:true,max:bw-10}))});
  if(S.ci<CARDS.length){g.fillStyle=C.pn;A.paint.rrect(W*.15,H*.17,W*.7,H*.15,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();write(CARDS[S.ci][0],W/2,H*.245,N?14:17,{max:W*.66})}
  write(S.msg,W/2,H*.41,12,mu)}
 if(k==='float'){write('Ring magnets on a pencil',W/2,H*.07,hs);const px=W/2,base=H*.86,rw=N?110:140,rh=N?24:28;
  g.fillStyle=A.mix(C.pn,C.am,.5);g.fillRect(px-6,H*.2,12,base-H*.2);
  const ring=(y,up)=>{g.fillStyle=up?C.rd:C.cy;g.fillRect(px-rw/2,y,rw,rh/2);g.fillStyle=up?C.cy:C.rd;g.fillRect(px-rw/2,y+rh/2,rw,rh/2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(px-rw/2,y,rw,rh);write(up?'N':'S',px+rw/2-14,y+rh/4,11,{ink:'#fff'});write(up?'S':'N',px+rw/2-14,y+rh*.75,11,{ink:'#fff'})};
  ring(base-rh,true);const gap=S.flip?0:Math.max(.6,2.2-S.press)*cmPx*.6,ty=base-rh*2-gap;ring(ty,!S.flip);
  if(!S.flip){arrowTo(g,px+rw/2+30,base-rh,px+rw/2+30,C.vi,'',ty+rh+2);write('push',px+rw/2+56,(ty+base)/2,12,{ink:C.vi})}
  write(S.flip?'Flipped: they pull together and snap shut':`Floating! Gap ${(gap/cmPx).toFixed(1)} cm`,W/2,H*.15,hs,{ink:S.flip?C.tx:C.gr});write(S.msg,W/2,H*.95,12,mu)}
 A.fx.draw(g)}
// ---------- actions ----------
function rollBall(){S.tries.touch=true;S.moving=true;A.tween(S,{ball:A.W*.3},A.reduced()?10:700,'out',()=>{S.moving=false;S.msg='Touching: the push moved the ball.';tell(S.msg);S.then()})}
function shove(touching){if(S.moving)return;S.moving=true;S.ball=0;const to=touching?1:.6;A.sound.whoosh();
 A.tween(S,{hand:to},A.reduced()?10:500,'out',()=>{if(touching)rollBall();
  else{S.tries.gap=true;S.moving=false;S.msg='With a gap the hand never reached the ball. Nothing moved.';tell(S.msg);A.sound.miss();setTimeout(()=>{S.hand=0;A.redraw()},A.reduced()?0:500);S.then()}})}
function slideMag(gap){if(S.jumped)return;S.mag=Math.max(0,Math.min(5,gap));const r=Math.round(S.mag);
 if(S.mag<=JUMP+.01&&S.mag>0.05){S.jumped=true;A.sound.pop();tell(`At ${r} cm the clip jumped across the gap without touching the magnet.`)}
 else if(S.mag<=.05){S.jumped=true;tell('That touched the clip. Start again and stop before it touches.');S.cheat=true}
 else tell(`Gap ${r} cm. A small pull, not enough to move the clip yet.`);A.redraw();S.then()}
function measure(){const m={kind:S.kind,g:S.g};if(!S.meas.some(x=>x.kind===m.kind&&x.g===m.g))S.meas.push(m);const v=m.kind==='magnet'?PULL[m.g]:(m.g===0?10:0);A.sound.tick();
 tell(`${m.kind==='magnet'?'Magnet pull':'Hand push'} at ${m.g} cm: ${v} out of 10.`);A.redraw();S.then()}
function useSheet(i){S.sheet=i;const sh=SHEETS[i];S.held[sh.k]=sh.gap<=JUMP;A.sound[sh.gap<=JUMP?'pop':'miss']();tell(sh.gap<=JUMP?`Through ${sh.word} the magnet still holds the clip.`:`${sh.word} makes the gap about ${sh.gap} cm: too far, so the clip falls.`);controls();A.redraw();S.then()}
function sortCard(bin){if(S.ci>=CARDS.length)return;const [name,ans]=CARDS[S.ci];
 if(bin===ans){S.sorted.push(S.ci);S.ci++;A.sound.pop();S.msg=`Yes: ${name} is ${ans?'non-contact':'a contact force'}.`}
 else{A.sound.miss();S.msg='Look again: '+(ans?(name.includes('apple')?'nothing touches the apple; gravity pulls it':'the magnet acts across the gap'):(name.includes('friction')?'friction needs surfaces rubbing':'it only works while touching'))}
 tell(S.msg);controls();A.redraw();S.then()}
function flipTop(){S.flip=!S.flip;S.press=0;S.flips[S.flip?'a':'r']=true;A.sound.tick();S.msg=S.flip?'Facing N to S, they attract and snap together.':'Facing N to N, they repel: the top ring floats.';tell(S.msg);A.redraw();S.then()}
function push(){if(S.flip){S.msg='They are stuck together. Flip the top ring first.';tell(S.msg);A.redraw();return}S.pressed=true;A.sound.tick();S.press=1.5;A.redraw();
 A.tween(S,{press:0},A.reduced()?10:700,'back',()=>{S.msg='Pushed down, it sprang back up: the push acts across the gap.';tell(S.msg);S.then()})}
function controls(){if(!row)return;row.innerHTML='';const k=scene();if(k==='quiz')return;const add=(t,f,lab,on)=>{const e=c.el('button',{type:'button',class:'lbtn'+(on?' mine':''),'aria-label':lab||t},row,t);if(on!=null)e.setAttribute('aria-pressed',String(!!on));e.onclick=f};
 if(k==='touch'){add('Push with a gap',()=>shove(false));add('Push touching',()=>shove(true))}
 if(k==='magnet'){add('← 1 cm closer',()=>slideMag(S.mag-1),'Move the magnet 1 cm closer');add('1 cm back →',()=>slideMag(S.mag+1),'Move the magnet 1 cm back');add('Start again',()=>{S.jumped=S.cheat=false;S.mag=5;tell('Magnet back at 5 cm.');A.redraw()})}
 if(k==='gap'){['magnet','hand'].forEach(z=>add(z==='hand'?'Hand':'Magnet',()=>{S.kind=z;controls();A.redraw()},'Test the '+z,S.kind===z));
  [-1,1].forEach(d=>add('Gap '+(d<0?'−':'+'),()=>{S.g=Math.max(0,Math.min(5,S.g+d));A.redraw();tell('Gap '+S.g+' cm')},d<0?'Make the gap smaller':'Make the gap bigger'));add('Measure',measure,'Measure the force at this gap')}
 if(k==='sheet')SHEETS.forEach((s,i)=>add(s.k,()=>useSheet(i),'Put '+s.word+' in the gap',S.sheet===i));
 if(k==='sort'&&S.ci<CARDS.length){add('Contact',()=>sortCard(0));add('Non-contact',()=>sortCard(1))}
 if(k==='float'){add('Flip the top ring',flipTop);add('Push it down',push,'Push the top ring down')}}
// canvas gestures
function down(p){const k=scene(),W=A.W,H=A.H;if(k==='quiz')return false;
 if(k==='touch'){S.grab={x:p.x};return true}
 if(k==='magnet'){S.grab={mag:true};return true}
 if(k==='gap'){const x0=W*.12,bw=(W*.82)/6,i=Math.floor((p.x-x0)/bw);if(i>=0&&i<6&&p.y>H*.16&&p.y<H*.8){S.g=i;measure();return true}return false}
 if(k==='sheet'){const i=p.x<W/3?0:p.x<2*W/3?1:2;useSheet(i);return true}
 if(k==='sort'){if(p.y>H*.45){sortCard(p.x<W/2?0:1);return true}return false}
 if(k==='float'){if(p.y<H*.55)flipTop();else push();return true}return false}
function move(p){if(!S.grab)return;const k=scene(),W=A.W,cmPx=Math.min(W*.11,70);
 if(k==='touch'){const r=A.narrow?20:26,span=W*.55-r-W*.18;S.hand=Math.max(0,Math.min(1,(p.x-W*.18)/span));const gap=(1-S.hand)*span/cmPx;
  if(S.hand>=.999&&!S.moving)rollBall();
  else if(gap>.8&&!S.moving){S.tries.gap=true;S.msg=`Gap ${gap.toFixed(1)} cm: the ball does not move.`}A.redraw()}
 if(k==='magnet'){const mw=A.narrow?84:110;slideMag(Math.round((W*.78-(p.x+mw/2))/cmPx))}}
function up(){S.grab=null;A.redraw()}
const cnt=k=>new Set(S.meas.filter(m=>m.kind===k).map(m=>m.g)).size;
const finish=(i,test,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&test())A.done(line()+A.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*450))}
const steps=[
{h:'A push needs touching',p:'A kick, a push or a pull only works while two things touch. Push the ball from a gap, then while touching.',
 predict:{q:'Your hand stops 2 cm from the ball. Will the ball move?',opts:['yes, if you push hard enough','no, the hand must touch it','yes, but only a little'],ans:1},
 task:'Push with a gap, then push touching',show:()=>play(0,[()=>shove(false),()=>{},()=>shove(true)]),
 go:()=>{reset();tell('Drag the hand or use the buttons.');controls();S.then=finish(0,()=>S.tries.gap&&S.tries.touch,()=>'The push only moved the ball when the hand touched it. That is a contact force.')}},
{h:'A magnet across a gap',p:'A magnet is different. Slide it slowly towards the clip and stop before it touches. Watch the pull arrow grow.',
 predict:{q:'Will the clip move before the magnet touches it?',opts:['no, magnets must touch to pull','yes, the pull acts across the gap','only if you shake the magnet'],ans:1},
 task:'Make the clip move without touching it',show:()=>play(1,[()=>slideMag(5),()=>slideMag(4),()=>slideMag(3)]),
 go:()=>{reset({mag:5});tell('Drag the magnet, or press 1 cm closer.');controls();S.then=finish(1,()=>S.jumped&&!S.cheat,()=>'The clip jumped across a 3 cm gap. A magnetic force is a non-contact force: it acts at a distance.')}},
{h:'Bigger gap, weaker pull',p:'Measure both forces at different gaps. A push is zero once there is any gap. A magnet\'s pull fades bit by bit.',
 predict:{q:'As the gap grows, the magnet\'s pull…',opts:['stops as soon as there is a gap','gets weaker bit by bit','gets stronger'],ans:1},
 task:'Measure the magnet at 3 gaps and the hand at 2 gaps',show:()=>play(2,[()=>{S.kind='magnet';S.g=0;measure()},()=>{S.g=2;measure()},()=>{S.g=4;measure()},()=>{S.kind='hand';S.g=0;measure()},()=>{S.g=2;measure();controls()}]),
 go:()=>{reset({kind:'magnet',g:1});tell('Pick magnet or hand and a gap, then measure, or tap the chart.');controls();S.then=finish(2,()=>cnt('magnet')>=3&&cnt('hand')>=2,()=>'The hand pushed only at 0 cm. The magnet still pulled at 2 and 4 cm, just more weakly.')}},
{h:'Through paper and card',p:'Put something between the magnet and the clip. Thin paper or card does not block the pull; a thick book makes the gap too big.',
 predict:{q:'Can a magnet hold a clip through thin card?',opts:['no, the card blocks it','yes, the pull acts through it','only if the card is wet'],ans:1},
 task:'Test paper, card and the thick book',show:()=>play(3,[()=>useSheet(0),()=>useSheet(1),()=>useSheet(2)]),
 go:()=>{reset({sheet:-1});tell('Choose paper, card or a thick book.');controls();S.then=finish(3,()=>Object.keys(S.held).length===3,()=>'Paper and card did not stop the pull. The book made the gap about 4 cm, too far for this magnet.')}},
{h:'Sort the forces',p:'Contact forces need touching: pushes, pulls, friction. Non-contact forces act across a gap: magnetism and gravity.',
 predict:{q:'Friction slowing a sledge is…',opts:['non-contact, because you cannot see it','contact, because the surfaces rub','not a force at all'],ans:1},
 task:'Sort all six forces',show:()=>play(4,CARDS.map(([,a])=>()=>sortCard(a))),
 go:()=>{reset({ci:0,sorted:[]});tell('Is it contact or non-contact? Tap a box or a button.');controls();S.then=finish(4,()=>S.ci>=CARDS.length,()=>'Kick, friction and pulling a door need touching. Magnets and gravity act at a distance.')}},
{h:'A magnet that floats',p:'Two ring magnets on a pencil. With like poles facing, the bottom one pushes the top one up across a gap. Flip it and they pull together.',
 predict:{q:'What holds the top ring up in the air?',opts:['nothing: it floats on air','the push of the bottom magnet across the gap','glue on the pencil'],ans:1},
 task:'Push the floating ring down, then flip it',show:()=>play(5,[push,()=>{},flipTop]),
 go:()=>{reset({flip:false});tell('Tap the top ring to flip it, or tap low down to push it.');controls();S.then=finish(5,()=>S.pressed&&S.flips.a,()=>'The repelling push held the ring up across a gap; flipped, the pull snapped them together. Both are non-contact.')}},
{h:'Challenge',p:'',go:()=>{reset();askNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QUIZ=[
 ['A magnet pulls a pin across a 2 cm gap. What kind of force is this?',[['non-contact','ok'],['contact','touch'],['no force, the pin just moved','nothing']]],
 ['You kick a football. What kind of force is the kick?',[['contact','ok'],['non-contact','far'],['gravity','grav']]],
 ['You move a magnet further away from a clip. What happens to its pull?',[['it gets weaker','ok'],['it gets stronger','strong'],['it stays exactly the same','same']]],
 ['An apple falls from a tree. Which force pulls it down?',[['gravity, a non-contact force','ok'],['friction, a contact force','fric'],['a push from the branch','touch']]],
 ['A sledge slows down on a gravel path. Which force slows it?',[['friction, a contact force','ok'],['magnetism, a non-contact force','far'],['gravity pushing it back','grav']]]];
function hint(t){let m='Contact forces need touching; magnetism and gravity act across a gap.';
 if(t==='touch')m='They never touched, so it is not a contact force. Magnetism acts across the gap.';
 if(t==='far')m='The foot and ball, or sledge and ground, are pressed together: a contact force.';
 if(t==='nothing')m='Things do not start moving by themselves. The magnet pulled it across the gap.';
 if(t==='strong')m='A magnet pulls hardest close up. The bigger the gap, the weaker its pull.';
 if(t==='same')m='The pull changes with the gap. In the lab it fell from 10 at 0 cm to 2.5 at 3 cm.';
 if(t==='grav')m='Gravity pulls things down towards the Earth, not back or sideways.';
 if(t==='fric')m='Friction needs surfaces rubbing. The falling apple touches nothing: gravity pulls it.';
 return m}
function askNext(){qi++;const Q=QUIZ[qi%QUIZ.length],turn=(qi+2)%3,opts=[...Q[1].slice(turn),...Q[1].slice(0,turn)];
 quiz.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(t)});tell('Challenge: '+Q[0]);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Right. Ask: are the two things touching, or is there a gap?':'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=askNext}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==6;row.hidden=A.step===6;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Force lab controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});controls()}});
A.start()})})();
