/* Flagship 64 – persisting when it's hard (5–6): misses as clues (beanbag), practice shrinks wobbles (bike), keep-going
thoughts and "yet", a calm break before rebuilding a tower a new way. Challenge: mistakes, change, yet, breaks, practice, speed, ask. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot,RIDE=[4,3,2,1,0];
// thoughts: [text, 0 = keeps Pip going, 1 = makes Pip stop, the keep-going swap for a stop thought]
const THINK=[["This is hard, but I'm getting better.",0],["I'm no good at this.",1,"I'm not good at this yet."],["I can't do it yet.",0],
['I give up.',1,'I will take a break, then try again.'],['Let me try a different way.',0],["Everyone is better than me.",1,'I am learning at my own speed.']];
const BLK=[{n:'big',w:.34,c:'#3b82f6'},{n:'middle',w:.24,c:'#f59e0b'},{n:'small',w:.15,c:'#ec4899'}],TRAY=[2,0,1],FREE=[8,4,9,5,7];
VIS.reg('flagtry',c=>{let A,pad,chal,read;c.fig.classList.add('young');
const S={T:6,pow:3,shots:[],fly:null,inB:0,day:0,th:[],tc:0,pep:2,tw:[],tray:TRAY.slice(),cross:4,bal:0,grab:null,gp:null,glow:0,
want:()=>{},run:0,fi:0,last:'',Q:null};
const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a);
const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
const kind=()=>['toss','bike','talk','tower','toss','ask'][A.step];
const txt=(x,w,z,al)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle'};
function lines(x,t,w){const out=[];let cur='';for(const word of t.split(' ')){const k=cur?cur+' '+word:word;if(x.measureText(k).width>w&&cur){out.push(cur);cur=word}else cur=k}out.push(cur);return out}
// ---- toss geometry: power 1..10 maps to a spot on the grass; the bucket sits on one spot ----
const gy=()=>A.H*.8,x0=()=>58,unit=()=>(A.W-x0()-34)/10,spot=p=>x0()+p*unit(),bag=()=>({x:x0(),y:gy()-34});
function desc(){const k=kind();let t;
if(k==='toss'){const n=S.shots.length;t=S.inB?`In the bucket after ${n} ${n===1?'throw':'throws'}!`:n?`Throw ${n} landed ${S.shots[n-1]<S.T?'too short':'too far'}. Power is now ${S.pow}.`:`Power ${S.pow}. The bucket is on the grass ahead. Pull the beanbag back and let go.`}
else if(k==='bike')t=S.day>=5?'Pip can ride with no wobbles!':`Day ${S.day+1}. ${S.day?`After ${S.day} ${S.day===1?'day':'days'} of practice, Pip wobbles ${RIDE[S.day-1]} times.`:'Pip has not practised yet.'} Tap the next day to practise.`;
else if(k==='talk'){const d=S.th.length;t=d<THINK.length?`Pip thinks: "${THINK[S.tc][0]}" Does it keep Pip going, or make Pip stop? ${d} of ${THINK.length} sorted. Energy ${S.pep} of 6.`:'All six thoughts sorted. Pip is full of keep-going energy.'}
else if(k==='tower')t=S.tw.length===3?'The tower stands: big, middle, small!':`Cross meter ${S.cross} of 5. Tower: ${S.tw.length?S.tw.map(i=>BLK[i].n).join(', then '):'empty'}.`+(S.cross>=3?' Pip is too cross to build. Breathe first.':' Tap a block to stack it.');
else t='Challenge time.';
say(t);btns();S.want()}
// ---- drawing ----
function pip(x,X,Y,r,mood){const C=A.col;x.fillStyle=A.mix('#a7f3d0','#fca5a5',mn(1,mood/5));x.beginPath();x.ellipse(X,Y,r,r*.92,0,0,7);x.fill();
x.strokeStyle='#1f2937';x.lineWidth=mx(2,r*.07);x.lineCap='round';x.fillStyle='#1f2937';[-1,1].forEach(s=>{x.beginPath();x.arc(X+s*r*.33,Y-r*.18,r*.08,0,7);x.fill()});
const bend=(2.5-mood)*r*.12;x.beginPath();x.moveTo(X-r*.32,Y+r*.3);x.quadraticCurveTo(X,Y+r*.3+bend,X+r*.32,Y+r*.3);x.stroke();
if(mood>=4)[-1,1].forEach(s=>{x.beginPath();x.moveTo(X+s*r*.5,Y-r*.48);x.lineTo(X+s*r*.16,Y-r*.36);x.stroke()});txt(x,700,12);x.fillStyle=C.tx;x.fillText('Pip',X,Y+r+12)}
function drawToss(x){const C=A.col,g=gy(),u=unit();x.fillStyle=al(C.gr,.25);x.fillRect(0,g,A.W,A.H-g);
for(let p=1;p<=10;p++){x.fillStyle=al(C.tx,.25);x.fillRect(spot(p)-1,g+4,2,8)}
const bx=spot(S.T);x.fillStyle=C.vi;x.beginPath();x.moveTo(bx-u*.45,g-30);x.lineTo(bx+u*.45,g-30);x.lineTo(bx+u*.35,g);x.lineTo(bx-u*.35,g);x.closePath();x.fill();
txt(x,700,12);x.fillStyle='#fff';x.fillText('bucket',bx,g-15);
S.shots.forEach((p,i)=>{const sx=spot(p),last=i===S.shots.length-1;x.fillStyle=al(p===S.T?C.gr:C.rd,last?.95:.35);x.beginPath();x.arc(sx,g+20,last?8:6,0,7);x.fill();
if(last&&p!==S.T){txt(x,800,A.narrow?13:15);x.fillStyle=C.tx;x.fillText(p<S.T?'too short':'too far',sx,g+40)}});
pip(x,30,g-34,18,mn(4,S.shots.filter(p=>p!==S.T).length>3?3:1));
const b=bag();let at=b;if(S.fly){const f=S.fly,ex=spot(f.p);at={x:b.x+(ex-b.x)*f.t,y:b.y+(g-8-b.y)*f.t-Math.sin(Math.PI*f.t)*A.H*.42}}
else if(S.grab==='bag'&&S.gp){at=S.gp;x.strokeStyle=C.mu;x.setLineDash([5,5]);x.lineWidth=2;x.beginPath();x.moveTo(b.x,b.y);x.lineTo(at.x,at.y);x.stroke();x.setLineDash([])}
if(!S.inB||S.fly){x.fillStyle=C.or;rr(at.x-11,at.y-9,22,18,6);x.fill()}
const pw=mn(A.W*.42,190);txt(x,700,13,'left');x.fillStyle=C.tx;x.fillText(`Power ${S.pow}`,12,20);for(let i=0;i<10;i++){x.fillStyle=i<S.pow?C.or:al(C.tx,.12);x.fillRect(12+i*pw/10,32,pw/10-3,12)}}
const cal=i=>{const w=mn(64,(A.W-24)/5-8);return{x:12+i*(w+8),y:12,w,h:w*.8}};
function drawBike(x){const C=A.col;for(let i=0;i<5;i++){const r=cal(i),done=i<S.day,next=i===S.day;x.fillStyle=done?al(C.gr,.35):next?al(C.ac,.18+S.glow*.3):al(C.tx,.06);rr(r.x,r.y,r.w,r.h,10);x.fill();
x.strokeStyle=next?C.ac:al(C.tx,.25);x.lineWidth=next?3:1;x.stroke();txt(x,800,A.narrow?12:14);x.fillStyle=C.tx;x.fillText(`Day ${i+1}`,r.x+r.w/2,r.y+r.h*.35);if(done){txt(x,800,16);x.fillText('✓',r.x+r.w/2,r.y+r.h*.72)}}
const base=A.H*.86,ch=A.H*.36,bw=mn(34,(A.W*.45)/5-6),cx=A.W*.52;txt(x,700,12,'left');x.fillStyle=C.mu;x.fillText('Wobbles each day',cx,base-ch-28);
for(let i=0;i<5;i++){const h=i<S.day?mx(3,RIDE[i]/4*ch):0,X=cx+i*(bw+6);x.fillStyle=al(C.tx,.08);x.fillRect(X,base-ch,bw,ch);x.fillStyle=C.or;x.fillRect(X,base-h,bw,h);
if(i<S.day){txt(x,700,12);x.fillStyle=C.tx;x.fillText(String(RIDE[i]),X+bw/2,base-h-9)}}
const wob=S.day?RIDE[S.day-1]:4,px=A.W*.24,py=A.H*.7,ang=(wob/4)*.32;x.save();x.translate(px,py+30);x.rotate(ang);
x.strokeStyle=C.tx;x.lineWidth=3;[-26,26].forEach(o=>{x.beginPath();x.arc(o,0,15,0,7);x.stroke()});x.beginPath();x.moveTo(-26,0);x.lineTo(0,-22);x.lineTo(26,0);x.moveTo(0,-22);x.lineTo(16,-30);x.stroke();x.restore();
pip(x,px+ang*40,py-40,17,wob>2?3:1)}
const tzone=()=>{const w=(A.W-36)/2,h=A.H*.34;return[{x:12,y:A.H-h-10,w,h,n:'Keeps Pip going'},{x:24+w,y:A.H-h-10,w,h,n:'Makes Pip stop'}]};
const tcard=()=>{const w=mn(A.W*.62,280);return{x:A.W*.36,y:A.H*.1,w:mn(w,A.W*.62),h:66}};
function drawTalk(x){const C=A.col,pr=mn(30,A.W*.06);pip(x,pr+14,A.H*.22,pr,mx(0,4-S.pep));
const bw=16,bh=A.H*.3,bx=pr*2+30,by=A.H*.08;x.strokeStyle=C.tx;x.lineWidth=2;x.strokeRect(bx,by,bw,bh);x.fillStyle=C.gr;const f=S.pep/6*bh;x.fillRect(bx+2,by+bh-f+2,bw-4,mx(0,f-4));
txt(x,600,11);x.fillStyle=C.mu;x.fillText('energy',bx+bw/2,by+bh+10);
tzone().forEach((z,i)=>{x.fillStyle=al(i?C.rd:C.gr,.12);rr(z.x,z.y,z.w,z.h,14);x.fill();x.strokeStyle=i?C.rd:C.gr;x.lineWidth=2;x.stroke();
txt(x,800,A.narrow?13:16);x.fillStyle=C.tx;x.fillText(z.n,z.x+z.w/2,z.y+18);
S.th.filter(k=>THINK[k][1]===i).forEach((k,j)=>{txt(x,500,A.narrow?10:12);const s=i?THINK[k][2]:THINK[k][0];lines(x,(i?'→ ':'')+s,z.w-10).slice(0,2).forEach((l,n)=>x.fillText(l,z.x+z.w/2,z.y+40+j*(A.narrow?28:32)+n*13))})});
if(S.th.length<THINK.length){const r=tcard(),p=S.grab==='card'&&S.gp?{x:S.gp.x-r.w/2,y:S.gp.y-r.h/2}:r;x.fillStyle='#fff';A.paint.shadow(8,3,.22);x.beginPath();x.ellipse(p.x+r.w/2,p.y+r.h/2,r.w/2,r.h/2+6,0,0,7);x.fill();A.paint.noShadow();
x.strokeStyle=C.vi;x.lineWidth=2;x.stroke();txt(x,700,A.narrow?13:16);x.fillStyle='#111827';lines(x,THINK[S.tc][0],r.w-34).forEach((l,j,a)=>x.fillText(l,p.x+r.w/2,p.y+r.h/2+(j-(a.length-1)/2)*18))}}
const trayR=slot=>({x:12,y:A.H*.52+slot*40,w:BLK[S.tray[slot]].w*A.W*.9,h:32});
const towX=()=>A.W*.72,balR=()=>({x:A.W*.18,y:A.H*.32,r:20+S.bal*16});
function drawTower(x){const C=A.col,base=A.H*.9;x.fillStyle=al(C.tx,.15);x.fillRect(A.W*.5,base,A.W*.46,6);
let y=base;S.tw.forEach(i=>{const b=BLK[i],w=b.w*A.W*.9;y-=36;x.fillStyle=b.c;rr(towX()-w/2,y,w,34,6);x.fill()});
S.tray.forEach((i,slot)=>{if(S.tw.includes(i))return;const r=S.grab===slot&&S.gp?{...trayR(slot),x:S.gp.x-trayR(slot).w/2,y:S.gp.y-15}:trayR(slot);x.fillStyle=BLK[i].c;rr(r.x,r.y,r.w,r.h,6);x.fill();txt(x,700,12);x.fillStyle='#fff';x.fillText(BLK[i].n,r.x+r.w/2,r.y+15)});
const B=balR();x.fillStyle=al(C.cy,.55);x.beginPath();x.arc(B.x,B.y,B.r,0,7);x.fill();x.strokeStyle=C.cy;x.lineWidth=2;x.beginPath();x.moveTo(B.x,B.y+B.r);x.lineTo(B.x,B.y+B.r+24);x.stroke();
txt(x,700,12);x.fillStyle=C.tx;x.fillText('breathe',B.x,B.y);
pip(x,A.W*.42,A.H*.22,22,S.cross);txt(x,700,13,'left');x.fillStyle=C.tx;x.fillText('Cross meter',12,18);for(let i=0;i<5;i++){x.fillStyle=i<S.cross?(i<2?C.gr:i<3?C.or:C.rd):al(C.tx,.12);x.fillRect(12+i*24,30,20,12)}}
function draw(A){const{ctx:x,W,H,col:C}=A,k=kind();x.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.05:.4);x.fillRect(0,0,W,H);
if(k==='toss')drawToss(x);else if(k==='bike')drawBike(x);else if(k==='talk')drawTalk(x);else if(k==='tower')drawTower(x);else pip(x,W/2,H*.42,mn(W,H)*.2,S.Q?S.Q.mood:1);
if(S.glow>0&&k!=='bike'){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
// ---- actions ----
const reset=()=>{S.run++;S.want=()=>{};S.grab=null;S.Q=null};
const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
function setT(t,p){S.T=t;S.pow=p;S.shots=[];S.inB=0;S.fly=null;desc()}
function power(v){if(S.fly||S.inB)return;S.pow=mx(1,mn(10,v));A.sound.tick();desc()}
function toss(){if(S.fly||S.inB)return;const p=S.pow,prev=S.shots[S.shots.length-1];
if(prev===p){A.sound.miss();say(`Power ${p} again lands in the same place: ${p<S.T?'too short':'too far'}. Change something!`);return}
S.fly={p,t:0};A.sound.whoosh();A.tween(S.fly,{t:1},650,'io',()=>{S.fly=null;S.shots.push(p);
if(p===S.T){S.inB=1;A.sound.win();glow();desc();return}
A.sound.miss();const n=S.shots.length;say(`${p<S.T?'Too short':'Too far'}. That miss is a clue: throw ${p<S.T?'harder':'softer'}.`+(n>=3?' Keep going, you are getting closer.':''));btns()})}
function practise(){if(S.day>=5)return;S.day++;A.sound.pop();if(S.day===5)glow();desc()}
function skipDay(){if(S.day>=5)return;A.sound.miss();say(`No practice today, so Pip wobbles just as much as before. Skill grows only when Pip practises.`)}
function sortThink(z){if(S.th.length>=THINK.length)return;const k=S.tc,T=THINK[k];S.grab=null;
if(T[1]!==z){A.sound.miss();say(T[1]?`"${T[0]}" makes Pip want to stop. It says Pip can never do it. Try the other box.`:`"${T[0]}" helps Pip keep going: it says trying works. Try the other box.`);A.redraw();return}
S.th.push(k);S.tc=mn(THINK.length-1,S.th.length);S.pep=mn(6,S.pep+1);A.sound.pop();
if(T[1]){say(`Yes, that thought makes Pip stop. Pip swaps it for: "${T[2]}"`);btns();S.want();return}desc()}
function breathe(){if(S.cross<=0)return;S.cross--;S.bal=1;A.tween(S,{bal:0},A.reduced()?0:700,'out');A.sound.step();
say(S.cross>=3?`Breathe in... and out. Cross meter ${S.cross} of 5. Again.`:`Calm enough to try again. Cross meter ${S.cross} of 5. Now try a new way.`);btns();S.want()}
function stack(i){if(S.tw.includes(i)||S.tw.length===3)return;S.grab=null;
if(S.cross>=3){A.sound.miss();say('Pip is too cross to build well. Take a break: tap the balloon to breathe.');A.redraw();return}
const top=S.tw[S.tw.length-1];
if(top!=null&&BLK[i].w>BLK[top].w){S.tw=[];S.cross=mn(5,S.cross+1);A.sound.miss();say(`Crash! The ${BLK[i].n} block is wider than the ${BLK[top].n} one under it, so it tipped. Mistakes are clues: what should go at the bottom?`);btns();return}
S.tw.push(i);A.sound.pop();if(S.tw.length===3){S.cross=0;glow()}desc()}
function btns(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const k=kind();
const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
if(k==='toss'){const busy=!!S.fly||!!S.inB;B('− Softer',()=>power(S.pow-1),busy,'Throw softer');B('Harder +',()=>power(S.pow+1),busy,'Throw harder');B('Throw!',toss,busy,`Throw with power ${S.pow}`);
if(A.step===4)B('New bucket',()=>{S.fi=(S.fi+1)%FREE.length;setT(FREE[S.fi],2)});else B('Start again',()=>setT(6,3))}
if(k==='bike'){B(`Practise day ${mn(5,S.day+1)}`,practise,S.day>=5);B('Skip practice today',skipDay,S.day>=5);B('Start again',()=>{S.day=0;desc()})}
if(k==='talk'&&S.th.length<THINK.length){B('Keeps Pip going',()=>sortThink(0));B('Makes Pip stop',()=>sortThink(1))}
if(k==='tower'){B('Breathe in and out',breathe,S.cross<=0);S.tray.forEach(i=>B(`Stack the ${BLK[i].n} block`,()=>stack(i),S.tw.includes(i)||S.tw.length===3));B('Start again',()=>{S.tw=[];S.cross=4;desc()})}
A.redraw()}
const finish=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
const later=(fns,gap)=>{const r=S.run;fns.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*30:j*gap))};
const steps=[
{h:'A miss is a clue',p:'Help Pip get the beanbag in the bucket. Pull the beanbag back and let go, or use the btns.',
predict:{q:"Pip's first throw lands too short. What should Pip do next?",opts:['Throw the same way again','Throw a bit harder','Stop: Pip is bad at throwing'],ans:1},task:'Get the beanbag in the bucket',
show:()=>{setT(6,3);later([toss,()=>power(9),toss,()=>power(6),toss],760)},
go:()=>{reset();setT(6,3);S.want=finish(0,()=>S.inB,()=>`In after ${S.shots.length} throws. Each miss told Pip what to change.`)}},
{h:'Practice makes it easier',p:'Pip is learning to ride a bike. Tap the next day to practise. What happens to the wobbles?',
predict:{q:'Pip wobbles and falls off on day 1. What happens if Pip practises every day?',opts:['Pip will always fall: some kids just can\'t ride','Pip gets a bit steadier each day'],ans:1},task:'Practise for five days',
show:()=>{S.day=0;desc();later([practise,practise,practise,practise,practise],330)},
go:()=>{reset();S.day=0;desc();S.want=finish(1,()=>S.day>=5,()=>'Wobbly at first, steady after practice. Hard things get easier.')}},
{h:'Keep-going thoughts',p:'What Pip thinks changes what Pip does. Drag each thought to a box, or press a button.',
predict:{q:'Pip thinks "I can\'t do it." Which word makes it a keep-going thought?',opts:['never','yet','ever'],ans:1},task:'Sort all six thoughts',
show:()=>{S.th=[];S.tc=0;S.pep=2;desc();later(THINK.map(()=>()=>sortThink(THINK[S.tc][1])),300)},
go:()=>{reset();S.th=[];S.tc=0;S.pep=2;desc();S.want=finish(2,()=>S.th.length===THINK.length,()=>'"I can\'t do it yet" keeps you trying. "I give up" stops you.')}},
{h:'Break, not quit',p:"Pip's tower fell down again and Pip is cross. Help Pip calm down, then build it a new way.",
predict:{q:"Pip's tower keeps falling. Pip is very cross. What helps most?",opts:['Kick the blocks over','Stop building for ever','Take a calm break, then try a new way'],ans:2},task:'Calm Pip, then build the tower',
show:()=>{S.tw=[];S.cross=4;desc();later([breathe,breathe,()=>stack(0),()=>stack(1),()=>stack(2)],420)},
go:()=>{reset();S.tw=[];S.cross=4;desc();S.want=finish(3,()=>S.tw.length===3,()=>'A break calmed Pip down, and a new way (big at the bottom) worked.')}},
{h:'Your turn',p:'New bucket, new spot. Use each miss as a clue.',go:()=>{reset();setT(FREE[S.fi],2)}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
let qi=-1,stars=0;
const QZ={mistake:['You get a sum wrong. What does the mistake tell you?',2,[['What to fix next time','ok'],["That I'm bad at maths",'fixed'],['To hide my work','hide']]],
change:['Your throw went too far. What do you do next?',1,[['Throw softer','ok'],['Throw the same way again','same'],['Stop throwing','quit']]],
yet:['Which thought helps you keep going?',1,[["I can't do it yet.",'ok'],["I'm no good at this.",'fixed'],['Everyone is better than me.','compare']]],
break:['You tried lots and now you feel really cross. What helps?',4,[['Take a break and breathe, then try again','ok'],['Throw it on the floor','smash'],['Never try it again','quit']]],
practise:["Ana can't skip with a rope yet. What will help her most?",1,[['Practise a little every day','ok'],["Nothing: some kids just can't skip",'born'],['Try once, then stop','once']]],
speed:['Your friend did the puzzle first time. You did not. What is true?',2,[['People learn at different speeds','ok'],["I'm bad at puzzles",'compare'],['Copy my friend next time','copy']]],
ask:['You tried three different ways and you are still stuck. Now what?',3,[['Ask for a clue, then keep going','ok'],['Ask someone to do it for me','doit'],['Keep trying the same way','same']]]};
function quiz(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,mood,ops]=QZ[k];
S.Q={k,mood};chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});
say('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
switch(tag){case 'ok':m='Yes!';break;
case 'fixed':m='One mistake does not mean you are bad at it. Say "not yet", then fix it.';break;
case 'hide':m='Hiding a mistake hides the clue. Look at it to see what to change.';break;
case 'same':m='The same try gives the same result. Change something.';break;
case 'quit':m='Stopping means you never get there. Take a break if you need one, then try again.';break;
case 'compare':m='Comparing makes you want to stop. Everyone learns at their own speed.';break;
case 'smash':m='That makes things worse. Breathe and calm down first, then try a new way.';break;
case 'born':m='Skills grow with practice. Pip wobbled at first too.';break;
case 'once':m='One try is not enough. A little practice every day makes it easier.';break;
case 'copy':m='Copying skips the learning. Keep trying your own way, and ask for a clue if stuck.';break;
default:m='Then they do the learning, not you. Ask for a clue and finish it yourself.'}
const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;btns()},
init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
A.gest({down:p=>{const k=kind();S.gp=null;
if(k==='toss'){const b=bag();if(!S.fly&&!S.inB&&hy(p.x-b.x,p.y-b.y)<44){S.grab='bag';return true}return false}
if(k==='bike'){const r=cal(S.day);if(S.day<5&&hit(p,r))practise();return false}
if(k==='talk'){if(S.th.length<THINK.length&&hit(p,tcard())){S.grab='card';return true}return false}
if(k==='tower'){const B=balR();if(hy(p.x-B.x,p.y-B.y)<mx(30,B.r)){breathe();return false}
const slot=S.tray.findIndex((i,s)=>!S.tw.includes(i)&&hit(p,trayR(s)));if(slot>=0){S.grab=slot;S.g0=p;return true}}return false},
move:p=>{S.gp=p;if(S.grab==='bag'){const b=bag();S.pow=mx(1,mn(10,Math.round(hy(p.x-b.x,p.y-b.y)/14)));if(read)read.textContent=`Power ${S.pow}`}A.redraw()},
up:p=>{const g=S.grab;S.grab=null;S.gp=null;
if(g==='bag'){const b=bag();if(hy(p.x-b.x,p.y-b.y)>12)toss();else A.redraw()}
else if(g==='card'){const i=tzone().findIndex(z=>hit(p,{...z,y:z.y-24,h:z.h+24}));if(i>=0)sortThink(i);else A.redraw()}
else if(typeof g==='number'){if(p.x>A.W*.5||hy(p.x-S.g0.x,p.y-S.g0.y)<10)stack(S.tray[g]);else A.redraw()}}});
btns()}});
A.start()})})();
