/* Flagship: the brain controls the body (ages 5–7; NC England Y1–Y2 animals including humans, NGSS 1-LS1-1 and 4-LS1-2 senses
   and responses). Find the boss of the body, send sense messages up nerves to the brain, put sense → brain → muscles in order,
   drag a message from the brain to the right muscles, and pick what the brain still does at night. Tap or drag, or use the buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#fff7ed',edge:'#1e293b',sel:'#1d4ed8',
 skin:'#fde7d4',skinE:'#9a3412',brain:'#f9a8d4',brainE:'#9d174d',nerve:'#b45309',zap:'#facc15',night:'#1e293b',nightTx:'#f8fafc',shirt:'#bfdbfe',pants:'#c7d2fe'};
const N=NERVEART,FIX=['Something flying is something you see.','A ring is a sound.','A smell goes up your nose.','Sour is a taste.','Soft is something you feel.'];
VIS.reg('flagnerve',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.15));
const txt=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function wrap(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?12:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function words(s,x,y,w,h,n,col){const L=wrap(s,w-12,n),lh=z(n)+3;L.forEach((r,i)=>txt(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col))}
function banner(s,won){const L=wrap(s,A.W-40,14),lh=z(14)+4,h=Math.max(z(34),L.length*lh+12);box(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,10);
 L.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,14,won?K.ok:K.ink));return 8+h}
function note(){if(!G.msg)return 0;const L=wrap((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-8;
 box(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,10);L.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink));return h}
const say=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- the child figure: returns where each part is, for taps and for message dots ---- */
function figure(cx,top,h,lit){const r=h*.12,hy=top+r,tw=h*.26,t0=top+2*r+h*.02,t1=t0+h*.34,P={};
 const on=k=>lit&&lit.has(k);
 X.lineCap='round';X.strokeStyle=K.skinE;X.lineWidth=Math.max(6,h*.05);
 const sh=[cx-tw/2,t0+h*.04],hand=[cx-tw/2-h*.15,t0+h*.3],sh2=[cx+tw/2,t0+h*.04],hand2=[cx+tw/2+h*.15,t0+h*.3];
 [[sh,hand],[sh2,hand2]].forEach(([a,b])=>{X.strokeStyle=on('arm')?K.sel:K.skinE;X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke()});
 const hipL=[cx-tw*.25,t1],footL=[cx-tw*.38,top+h*.98],hipR=[cx+tw*.25,t1],footR=[cx+tw*.38,top+h*.98];
 [[hipL,footL],[hipR,footR]].forEach(([a,b])=>{X.strokeStyle=on('leg')?K.sel:'#3730a3';X.beginPath();X.moveTo(a[0],a[1]);X.lineTo(b[0],b[1]);X.stroke()});
 box(cx-tw/2,t0,tw,t1-t0,on('chest')||on('tummy')?'#dbeafe':K.shirt,'#1e3a8a',2,h*.05);
 [hand,hand2].forEach(p=>{X.fillStyle=on('skin')?K.zap:K.skin;X.strokeStyle=K.skinE;X.lineWidth=2;X.beginPath();X.arc(p[0],p[1],h*.04,0,7);X.fill();X.stroke()});
 if(G.nerves){X.setLineDash([5,4]);X.strokeStyle=K.nerve;X.lineWidth=2.5;X.beginPath();X.moveTo(cx,hy);X.lineTo(cx,t1);
  [[cx,t0+h*.05,hand],[cx,t0+h*.05,hand2],[cx,t1,footL],[cx,t1,footR]].forEach(([x,y,p])=>{X.moveTo(x,y);X.lineTo(p[0],p[1])});X.stroke();X.setLineDash([])}
 X.fillStyle=K.skin;X.strokeStyle=K.skinE;X.lineWidth=2;X.beginPath();X.arc(cx,hy,r,0,7);X.fill();X.stroke();
 [-1,1].forEach(s=>{X.beginPath();X.ellipse(cx+s*r*1.02,hy+r*.12,r*.16,r*.26,0,0,7);X.fillStyle=on('ears')?K.zap:K.skin;X.fill();X.stroke()});
 X.fillStyle=on('head')||G.brainOn?K.brain:'#fbcfe8';X.strokeStyle=K.brainE;X.beginPath();X.ellipse(cx,hy-r*.38,r*.7,r*.42,0,0,7);X.fill();X.stroke();
 X.beginPath();for(let k=-1;k<=1;k++){X.moveTo(cx+k*r*.3,hy-r*.7);X.quadraticCurveTo(cx+k*r*.3+r*.12,hy-r*.38,cx+k*r*.3,hy-r*.1)}X.stroke();
 [-1,1].forEach(s=>{X.fillStyle=on('eyes')?K.zap:'#ffffff';X.beginPath();X.arc(cx+s*r*.36,hy+r*.2,r*.13,0,7);X.fill();X.stroke();X.fillStyle=K.ink;X.beginPath();X.arc(cx+s*r*.36,hy+r*.2,r*.06,0,7);X.fill()});
 X.fillStyle=on('nose')?K.zap:K.skinE;X.beginPath();X.arc(cx,hy+r*.45,r*.08,0,7);X.fill();
 X.strokeStyle=on('tongue')||on('face')?'#be123c':K.skinE;X.lineWidth=3;X.beginPath();X.arc(cx,hy+r*.55,r*.25,.2*Math.PI,.8*Math.PI);X.stroke();
 X.fillStyle=K.brainE;X.font=`800 ${z(10)}px system-ui,sans-serif`;
 P.brain=[cx,hy-r*.38];P.eyes=[cx-r*.36,hy+r*.2];P.ears=[cx+r*1.02,hy+r*.12];P.nose=[cx,hy+r*.45];P.tongue=[cx,hy+r*.7];P.face=[cx+r*.3,hy+r*.6];P.skin=hand;P.arm=hand2;P.leg=footR;P.spine=[cx,t0+h*.05];P.hip=[cx,t1];
 P.hit={head:{x:cx-r,y:top,w:2*r,h:2*r},chest:{x:cx-tw/2,y:t0,w:tw,h:(t1-t0)/2},tummy:{x:cx-tw/2,y:t0+(t1-t0)/2,w:tw,h:(t1-t0)/2},
  arm:{x:hand[0]-h*.07,y:t0,w:h*.12,h:h*.38},arm2:{x:hand2[0]-h*.05,y:t0,w:h*.12,h:h*.38},leg:{x:cx-tw*.5,y:t1,w:tw,h:top+h-t1}};
 return P}
/* a message dot travels along a list of points */
function zap(path,done){G.dot={path,t:0};A.tween(G.dot,{t:1},A.reduced()?1:700,'io',()=>{G.dot=null;done&&done();A.redraw()})}
function drawDot(){if(!G.dot)return;const p=G.dot.path,n=p.length-1,u=G.dot.t*n,i=Math.min(n-1,Math.floor(u)),f=u-i,x=p[i][0]+(p[i+1][0]-p[i][0])*f,y=p[i][1]+(p[i+1][1]-p[i][1])*f;
 X.fillStyle=K.zap;X.strokeStyle=K.nerve;X.lineWidth=2;X.beginPath();X.arc(x,y,z(8),0,7);X.fill();X.stroke()}
const upPath=k=>{const P=G.P;if(!P)return null;return k==='skin'?[P.skin,P.spine,P.brain]:[P[k],P.brain]};
const downPath=k=>{const P=G.P;if(!P)return null;return k==='face'?[P.brain,P.face]:k==='leg'?[P.brain,P.spine,P.hip,P.leg]:[P.brain,P.spine,P.arm]};
/* ---- step 0: find the boss ---- */
function tapPart(k){if(G.won)return;const [nm,line]=N.PARTS[k];G.lit=new Set([k]);
 if(k==='head'){G.won=true;G.brainOn=true;G.bad=false;G.msg='Found it! '+line;A.sound.pop()}else{G.bad=false;G.msg=nm+': '+line;A.sound.tick()}sync()}
/* ---- step 1: senses send messages up ---- */
function sense(k){if(G.won||G.busy)return;const ev=N.SENSES[G.ev];if(k!==ev[0])return miss(`Not your ${N.SENSES.find(s=>s[0]===k)[1].toLowerCase()}. ${FIX[G.ev]}`);
 G.busy=true;G.lit=new Set([k]);G.bad=false;G.msg=ev[3];A.sound.pop();const path=upPath(k),next=()=>{G.busy=false;G.brainOn=true;G.ev++;if(G.ev===N.SENSES.length){G.won=true;G.msg='All five senses send messages to the brain.'}sync()};
 if(path)zap(path,next);else next();sync()}
/* ---- step 2: sense, brain, muscles in order ---- */
function place(card){if(G.won)return;const L=N.LOOPS[G.loop],want=G.row.length;G.pick=null;
 if(card!==want)return miss(N.LOOPTIP[want]);G.row.push(card);A.sound.tick();G.lit=new Set([['eyes','ears'][G.loop],'head',['skin','leg'][G.loop]].slice(0,want+1));G.bad=false;
 G.msg=['First the sense notices.','Then the brain decides.','Then the muscles move.'][want];
 if(G.row.length===3){if(G.loop===0){G.loop=1;G.row=[];G.msg='Sense, then brain, then muscles. Try one more.'}else{G.won=true;G.msg='Every time: a sense notices, the brain decides, muscles move.'}A.sound.pop()}sync()}
/* ---- step 3: send a message down to the muscles ---- */
function send(k){if(G.won||G.busy)return;const job=N.JOBS[G.job];if(k!==job[1])return miss(`That message went to the ${k}. ${job[2]}`);
 G.busy=true;G.lit=new Set([k==='leg'?'leg':k==='arm'?'arm':'face']);G.bad=false;G.msg=`Brain → nerves → ${k} muscles: ${job[0].toLowerCase()}!`;A.sound.pop();
 const fin=()=>{G.busy=false;G.job++;if(G.job===N.JOBS.length){G.won=true;G.msg='Nerves carry the brain’s messages to every muscle, super fast.'}sync()};const p=downPath(k);if(p)zap(p,fin);else fin();sync()}
/* ---- step 4: the brain at night ---- */
function night(i){if(G.won||G.got.has(i))return;const [s,yes,why]=N.NIGHT[i];if(!yes)return miss(why+' Find what the brain still does.');
 G.got.add(i);A.sound.pop();G.bad=false;G.msg=`Yes: asleep, your brain ${s.toLowerCase()}.`;if(G.got.size===3){G.won=true;G.msg='Your brain never switches off. It keeps you breathing, warm and dreaming.'}sync()}
/* ---- layout: figure on the left, controls on the right ---- */
const kind=()=>['boss','sense','loop','send','night','quiz'][A.step];
function tiles(list,top,bottom,fill){const x=A.W*.5,w=A.W*.5-14,gap=z(6),n=list.length,h=Math.min(z(52),(bottom-top-gap*(n-1))/n);
 return list.map((s,i)=>{const r={x,y:top+i*(h+gap),w,h,i};fill(r,s,i);return r})}
function draw(){const bg=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillStyle=bg;X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind(),heads={boss:['Who is the boss of your body? Tap to find out.','Your brain is the boss!'],sense:['Your senses tell the brain what is going on.','Five senses, one boss.'],
  loop:['Put the cards in order: 1, 2, 3.','A sense notices. The brain decides. Muscles move.'],send:['Send the message from the brain to the right muscles.','Nerves carry messages fast.'],
  night:['Night time. What does your brain still do?','Your brain works all night.'],quiz:['Senses → brain → nerves → muscles.','']};
 const t=banner(heads[k][G.won?1:0]||heads[k][0],G.won),fb=G.msg?z(54):z(10),bot=A.H-fb-z(8);
 if(k==='night'){box(14,t+z(6),A.W*.5-24,bot-t-z(6),K.night,null);txt('Zzz',A.W*.25,t+z(24),16,K.nightTx,'center',900);X.fillStyle='#fde68a';X.beginPath();X.arc(A.W*.42,t+z(26),z(10),0,7);X.fill()}
 const fh=Math.min(bot-t-z(36),(A.W*.25-16)/.33),fx=A.W*.25;G.P=figure(fx,t+z(30),fh,G.lit);drawDot();
 if(k==='boss'){G.hits=G.P.hit;words(G.won?'The brain sits inside the skull. It thinks, feels and tells the body what to do.':'Tap the head, chest, tummy, arms or legs.',A.W*.5,t+z(10),A.W*.5-14,bot-t-z(20),14,K.dim)}
 if(k==='sense'){const ev=N.SENSES[Math.min(G.ev,4)],y0=t+z(8);if(!G.won){box(A.W*.5,y0,A.W*.5-14,z(48),'#fef9c3',K.edge,2);words(ev[2],A.W*.5,y0,A.W*.5-14,z(48),14,K.ink)}
  G.tiles=tiles(N.SENSES,y0+z(56),bot,(r,s,i)=>{const lit=G.lit&&G.lit.has(s[0]);box(r.x,r.y,r.w,r.h,lit?'#fef3c7':K.card,lit?K.nerve:K.edge,lit?3:2);words(s[1],r.x,r.y,r.w,r.h,15,K.ink)})}
 if(k==='loop'){const L=N.LOOPS[Math.min(G.loop,1)],y0=t+z(8),sh=z(48),gap=z(6);G.slots=[0,1,2].map(j=>{const r={x:A.W*.5,y:y0+j*(sh+gap),w:A.W*.5-14,h:sh};const f=G.row[j];
   box(r.x,r.y,r.w,r.h,f==null?'#f8fafc':K.okBg,f==null?'#64748b':K.ok,2);if(f==null)txt(String(j+1),r.x+r.w/2,r.y+r.h/2,16,K.dim);else words(L[f],r.x,r.y,r.w,r.h,12,K.ok);return r});
  const cy=y0+3*(sh+gap)+z(8),order=[2,0,1];G.cards=[];if(!G.won)order.forEach((f,j)=>{if(G.row.includes(f))return;const r={x:A.W*.5,y:cy+G.cards.length*(sh+gap),w:A.W*.5-14,h:sh,i:f};G.cards.push(r);
   const d=G.drag&&G.drag.i===f,on=G.pick===f,px=d?G.drag.x-r.w/2:r.x,py=d?G.drag.y-r.h/2:r.y;box(px,py,r.w,r.h,on?'#dbeafe':K.card,on?K.sel:K.edge,on?3:2);words(L[f],px,py,r.w,r.h,12,K.ink)})}
 if(k==='send'){const y0=t+z(8);if(!G.won){box(A.W*.5,y0,A.W*.5-14,z(48),'#fef9c3',K.edge,2);words('Job: '+N.JOBS[Math.min(G.job,2)][0],A.W*.5,y0,A.W*.5-14,z(48),15,K.ink)}
  G.tiles=tiles([['leg','Legs'],['arm','Arms'],['face','Face']],y0+z(56),Math.min(bot,y0+z(56)+3*z(58)),(r,s)=>{box(r.x,r.y,r.w,r.h,K.card,K.edge,2);words('Send to: '+s[1],r.x,r.y,r.w,r.h,14,K.ink)});
  if(!G.won&&!G.dot){const b=G.P.brain,d=G.drag;X.fillStyle=K.zap;X.strokeStyle=K.nerve;X.lineWidth=2;X.beginPath();X.arc(d?d.x:b[0],d?d.y:b[1],z(11),0,7);X.fill();X.stroke()}}
 if(k==='night')G.tiles=tiles(N.NIGHT,t+z(8),bot,(r,s,i)=>{const got=G.got.has(i);box(r.x,r.y,r.w,r.h,got?K.okBg:K.card,got?K.ok:K.edge,got?3:2);words((got?'✓ ':'')+s[0],r.x,r.y,r.w,r.h,13,got?K.ok:K.ink)});
 if(k==='quiz')words('Eyes, ears, nose, tongue and skin send messages up. The brain sends messages down to muscles.',A.W*.5,t+z(10),A.W*.5-14,bot-t-z(20),13,K.dim);
 note();A.fx.draw(X)}
let start=null;
function down(p){const k=kind();start=p;
 if(k==='boss'){const h=G.hits||{},key=Object.keys(h).find(q=>inR(p,h[q]));if(key){tapPart(key==='arm2'?'arm':key);return true}}
 if(k==='sense'){const r=(G.tiles||[]).find(q=>inR(p,q));if(r){sense(N.SENSES[r.i][0]);return true}
  const P=G.P,near=['eyes','ears','nose','tongue','skin'].find(q=>P&&Math.hypot(p.x-P[q][0],p.y-P[q][1])<z(16));if(near){sense(near);return true}}
 if(k==='loop'&&!G.won){const r=(G.cards||[]).find(q=>inR(p,q));if(r){G.pick=r.i;G.drag={i:r.i,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='send'&&!G.won){const b=G.P&&G.P.brain;if(b&&Math.hypot(p.x-b[0],p.y-b[1])<z(26)){G.drag={x:p.x,y:p.y};return true}const r=(G.tiles||[]).find(q=>inR(p,q));if(r){send(['leg','arm','face'][r.i]);return true}}
 if(k==='night'){const r=(G.tiles||[]).find(q=>inR(p,q));if(r){night(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag,k=kind(),tap=start&&Math.hypot(p.x-start.x,p.y-start.y)<10;G.drag=null;if(!d)return A.redraw();
 if(k==='loop'){if(tap||G.slots.some(s=>inR(p,s)))place(d.i);else{G.pick=null;A.redraw()}return}
 if(k==='send'){const h=G.P.hit,P=G.P,face=Math.hypot(p.x-P.face[0],p.y-P.face[1])<z(30);const part=face||inR(p,h.head)?'face':inR(p,h.leg)?'leg':inR(p,h.arm)||inR(p,h.arm2)?'arm':null;if(part&&!tap)send(part);else A.redraw()}}
function sync(){const k=kind();let d='Challenge.';
 if(k==='boss')d=G.won?'Brain found inside the head.':'A child’s body. Parts to tap: head, chest, tummy, arms, legs.';
 if(k==='sense')d=G.won?'All five senses done.':`Happening now: ${N.SENSES[G.ev][2]}. ${G.ev} of 5 done.`;
 if(k==='loop')d=`Story ${G.loop+1} of 2. Cards placed: ${G.row.map(f=>N.LOOPS[G.loop][f]).join(', ')||'none'}.`;
 if(k==='send')d=G.won?'All three jobs done.':`Job: ${N.JOBS[G.job][0]}. Drag the message from the brain, or pick a button.`;
 if(k==='night')d=`Found ${G.got.size} of 3 things the brain does at night.`;
 say((G.msg?G.msg+' ':'')+d);btns();G.after()}
function btns(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(k==='boss'&&!G.won)['head','chest','tummy','arm','leg'].forEach(q=>b('Tap: '+N.PARTS[q][0],()=>tapPart(q)));
 if(k==='sense'&&!G.won)N.SENSES.forEach(s=>b('Message from: '+s[1],()=>sense(s[0])));
 if(k==='loop'&&!G.won)N.LOOPS[G.loop].forEach((s,f)=>{if(!G.row.includes(f))b('Next card: '+s,()=>place(f))});
 if(k==='send'&&!G.won)[['leg','Legs'],['arm','Arms'],['face','Face']].forEach(([q,s])=>b('Send to: '+s,()=>send(q)));
 if(k==='night'&&!G.won)N.NIGHT.forEach((s,i)=>{if(!G.got.has(i))b('Pick: '+s[0],()=>night(i))});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?40:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,lit:null,brainOn:false,nerves:A.step>=1,dot:null,ev:0,loop:0,row:[],pick:null,drag:null,job:0,busy:false,got:new Set()})}
const steps=[
{h:'The boss of your body',p:'Your body has one boss. It thinks, it feels, and it tells every part what to do. Where is it?',
predict:{q:'Where is the boss of your body?',opts:['In your tummy','In your head','In your heart'],ans:1},
task:'Tap the body to find the boss',show:()=>{steps[0].go();play([()=>tapPart('chest'),()=>tapPart('head')],600)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'The brain, inside your skull.')}},
{h:'Senses send messages',p:'Your eyes, ears, nose, tongue and skin are your senses. They notice things. Then they send a message up thin wires called nerves to your brain.',
predict:{q:'A bell rings. Which part tells your brain?',opts:['Your eyes','Your ears','Your tongue'],ans:1},
task:'Send all 5 sense messages to the brain',show:()=>{steps[1].go();play(N.SENSES.map(s=>()=>sense(s[0])),800)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Senses tell the brain.')}},
{h:'The brain decides',p:'When a message comes in, your brain thinks and decides what to do. Then it tells your muscles to move.',
predict:{q:'Can your hands catch a ball all by themselves?',opts:['Yes, hands think for themselves','No, the brain tells them','Only if the ball is big'],ans:1},
task:'Put both stories in order',show:()=>{steps[2].go();play([0,1,2,0,1,2].map(f=>()=>place(f)),450)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Sense, brain, muscles.')}},
{h:'Nerves carry messages',p:'Nerves go from your brain, down your back, to every part of you. The brain sends messages along them to tell muscles to move.',
predict:{q:'How fast do messages zoom along nerves?',opts:['Slower than a snail','Faster than a car','They take all day'],ans:1},
task:'Send the message for all 3 jobs',show:()=>{steps[3].go();play(N.JOBS.map(j=>()=>send(j[1])),1000)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Brain to muscles, along nerves.')}},
{h:'Asleep, but still working',p:'At night you rest. Your brain does not switch off. It keeps some jobs going all night long.',
predict:{q:'What does your brain do when you fall asleep?',opts:['It switches off','It keeps working','It falls out'],ans:1},
task:'Find the 3 things your brain does at night',show:()=>{steps[4].go();play([0,1,2].map(i=>()=>night(i)),450)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'It keeps working.')}},
{h:'Challenge',p:'',go:()=>{reset();G.nerves=true;ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=N.bank[qi%N.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});say('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=N.WHYM[tag]||'Think: sense, brain, nerves, muscles.';
 if(tag==='self')m='Hands do not decide. Your eyes see, your brain decides, and nerves tell your hand to move.';
 if(tag==='blood')m='Blood carries food and air. Brain messages zoom along nerves.';
 if(tag==='sleep')m='Your brain never switches off. At night it keeps you breathing and warm.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Brain and body lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
