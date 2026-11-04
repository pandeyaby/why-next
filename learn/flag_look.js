/* Flagship – drawing what I observe (ages 4–5): real thing on the left, my drawing on the right. Count legs, rub out
   made-up parts, colour by looking back, use a magnifier, pick the looking drawing. Every drag has a button twin. */
(()=>{
const bp=g=>g.beginPath(),ink=g=>{g.fillStyle=INK;g.fill()};
const RED='#dc2626',INK='#111827',SHELL='#a16207',BODY='#a8a29e',YEL='#facc15',LEAF='#16a34a';
const PAINTS=[['yellow',YEL],['green',LEAF],['blue','#2563eb'],['red',RED]];
const PARTS=[['petals',0],['stem',1],['leaf',1]];
const BITS=[['stripes',[.0,.05]],['wings',[-.05,-.5]],['feelers',[-.7,-.45]]];
const PAIRS=[{q:'Which one is a real spider?',good:0,slip:'Count the legs. A real spider has 8 legs, and no smiley face.'},
 {q:'Which one is a real worm?',good:1,slip:'A real worm has no eyes and no smile. Look at the rings on its body.'},
 {q:'Which one is a real ladybird?',good:0,slip:'A real ladybird has 6 legs and black spots. Count them.'}];
VIS.reg('flaglook',c=>{let A,row,quiz,qi=-1,inRow=0;c.fig.classList.add('young');const L={};
const view=()=>['legs','snail','paint','lens','pick','quiz'][A.step];
const note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const em=n=>Math.round(n*(A.narrow?1:1.15));
function say(g,s,x,y,n,w,k){g.font=`${w||800} ${em(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(s,x,y,A.W-12)}
function frame(g,r,col,lw){g.fillStyle=col;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const upd=()=>{note(L.said);A.redraw()};
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const realR=()=>({x:8,y:A.H*.13,w:A.W/2-12,h:A.H*.6});
const mineR=()=>({x:A.W/2+4,y:A.H*.13,w:A.W/2-12,h:A.H*.6});
const mid=r=>[r.x+r.w/2,r.y+r.h/2,Math.min(r.w,r.h)*.3];
function panels(g,labelR,labelM){const C=A.col,r=realR(),m=mineR();frame(g,r,'#e3f6e8');g.fillStyle='#ffffff';A.paint.rrect(m.x,m.y,m.w,m.h,14);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;A.paint.rrect(m.x,m.y,m.w,m.h,14);g.stroke();
 say(g,labelR||'👀 Real',r.x+r.w/2,r.y-14,12);say(g,labelM||'✏️ My drawing',m.x+m.w/2,m.y-14,12)}
function ladybird(g,x,y,s,o){g.lineCap='round';g.strokeStyle=INK;g.lineWidth=Math.max(2,s*.07);
 for(let k=0;k<(o.legs||0);k++){const side=k%2?1:-1,j=Math.floor(k/2),yy=y-s*.35+j*s*.38;bp(g);g.moveTo(x+side*s*.8,yy);g.lineTo(x+side*s*1.25,yy+s*.15);g.stroke();
  if(o.nums&&k<o.nums){g.font=`800 ${Math.round(s*.32)}px system-ui`;g.fillStyle=INK;g.textAlign='center';g.fillText(String(k+1),x+side*s*1.45,yy+s*.2)}}
 bp(g);g.arc(x,y-s*.85,s*.42,Math.PI,0);ink(g);
 bp(g);g.arc(x,y,s*.9,0,7);g.fillStyle=o.pencil?A.alpha(RED,.75):RED;g.fill();g.lineWidth=2;g.strokeStyle=INK;g.stroke();
 bp(g);g.moveTo(x,y-s*.9);g.lineTo(x,y+s*.9);g.stroke();
 const sp=[[-.45,-.35],[.45,-.35],[-.5,.25],[.5,.25],[-.25,.6],[.25,.6],[0,-.75]];for(let k=0;k<(o.spots==null?7:o.spots);k++){bp(g);g.arc(x+sp[k][0]*s,y+sp[k][1]*s,s*.14,0,7);ink(g)}}
function snail(g,x,y,s,o){g.lineCap='round';g.strokeStyle=INK;g.lineWidth=2;
 if(o.legs)for(let k=0;k<4;k++){bp(g);g.moveTo(x-s*.7+k*s*.45,y+s*.45);g.lineTo(x-s*.75+k*s*.45,y+s*.8);g.lineWidth=3;g.stroke()}
 g.lineWidth=2;g.fillStyle=o.pencil?A.alpha(BODY,.6):BODY;A.paint.rrect(x-s*1.1,y+s*.05,s*2.2,s*.45,s*.22);g.fill();g.stroke();
 [[.8,-.75,1],[.65,-.35,.6]].forEach(([dx,dy,len])=>{bp(g);g.moveTo(x+s*.85,y+s*.1);g.lineTo(x+s*(.85+dx*.5*len),y+s*dy);g.stroke();bp(g);g.arc(x+s*(.85+dx*.5*len),y+s*dy,s*.06,0,7);ink(g)});
 bp(g);g.arc(x-s*.1,y-s*.25,s*.6,0,7);g.fillStyle=o.pencil?A.alpha(SHELL,.6):SHELL;g.fill();g.stroke();
 bp(g);for(let t=0;t<12;t+=.2){const r=s*.55*(1-t/13);g.lineTo(x-s*.1+Math.cos(t)*r,y-s*.25+Math.sin(t)*r)}g.stroke();
 if(o.smile){bp(g);g.arc(x+s*.85,y+s*.2,s*.16,.2,Math.PI-.2);g.lineWidth=3;g.stroke();bp(g);g.arc(x+s*.78,y+s*.12,s*.05,0,7);g.arc(x+s*.95,y+s*.12,s*.05,0,7);ink(g)}}
function flower(g,x,y,s,col){const pc=col[0]||'#ffffff',sc=col[1]||'#ffffff',lc=col[2]||'#ffffff';g.lineWidth=2;g.strokeStyle=INK;
 bp(g);g.moveTo(x,y);g.lineTo(x,y+s*1.6);g.lineWidth=Math.max(5,s*.14);g.strokeStyle=INK;g.stroke();g.lineWidth=Math.max(3,s*.09);g.strokeStyle=sc;g.stroke();
 g.lineWidth=2;g.strokeStyle=INK;bp(g);g.ellipse(x+s*.38,y+s*1.05,s*.4,s*.16,-.5,0,7);g.fillStyle=lc;g.fill();g.stroke();
 for(let k=0;k<5;k++){const a=k*Math.PI*2/5-Math.PI/2;bp(g);g.arc(x+Math.cos(a)*s*.42,y+Math.sin(a)*s*.42,s*.3,0,7);g.fillStyle=pc;g.fill();g.stroke()}
 bp(g);g.arc(x,y,s*.2,0,7);g.fillStyle='#f97316';g.fill();g.stroke()}
function bee(g,x,y,s,o){g.lineWidth=2;g.strokeStyle=INK;g.lineCap='round';
 if(o.wings){g.fillStyle='rgba(186,230,253,.85)';[[-.25,-.62],[.2,-.6]].forEach(([dx,dy])=>{bp(g);g.ellipse(x+dx*s,y+dy*s,s*.32,s*.2,-.3,0,7);g.fill();g.stroke()})}
 bp(g);g.ellipse(x,y,s*.75,s*.45,0,0,7);g.fillStyle=YEL;g.fill();g.stroke();
 if(o.stripes){g.save();bp(g);g.ellipse(x,y,s*.75,s*.45,0,0,7);g.clip();g.fillStyle=INK;[-.2,.15,.5].forEach(dx=>g.fillRect(x+dx*s,y-s*.5,s*.15,s));g.restore()}
 bp(g);g.arc(x-s*.78,y-s*.05,s*.22,0,7);ink(g);
 if(o.feelers)[-.25,.05].forEach(d=>{bp(g);g.moveTo(x-s*.85,y-s*.2);g.quadraticCurveTo(x-s*1.05,y-s*(.55+d),x-s*(.95+d),y-s*.62);g.stroke()})}
function spider(g,x,y,s,legs,face){g.strokeStyle=INK;g.lineWidth=2.5;g.lineCap='round';for(let k=0;k<legs;k++){const side=k%2?1:-1,j=Math.floor(k/2),n=legs/2,a=-.7+j*1.4/(n-1||1);
  bp(g);g.moveTo(x,y);g.lineTo(x+side*s*.8,y+a*s*.5);g.lineTo(x+side*s*1.05,y+a*s*.5+s*.35);g.stroke()}
 bp(g);g.arc(x,y,s*.35,0,7);ink(g);if(face){g.strokeStyle='#ffffff';g.lineWidth=2;bp(g);g.arc(x,y+s*.03,s*.18,.3,Math.PI-.3);g.stroke()}}
function worm(g,x,y,s,face){g.lineCap='round';g.strokeStyle=INK;g.lineWidth=s*.34;bp(g);g.moveTo(x-s,y);g.bezierCurveTo(x-s*.4,y-s*.5,x+s*.2,y+s*.5,x+s,y-s*.1);g.stroke();
 g.strokeStyle='#f9a8d4';g.lineWidth=s*.26;g.stroke();g.strokeStyle=INK;g.lineWidth=1.5;for(let k=1;k<8;k++){const t=k/8,bx=(1-t)**3*(x-s)+3*(1-t)**2*t*(x-s*.4)+3*(1-t)*t*t*(x+s*.2)+t**3*(x+s),by=(1-t)**3*y+3*(1-t)**2*t*(y-s*.5)+3*(1-t)*t*t*(y+s*.5)+t**3*(y-s*.1);bp(g);g.moveTo(bx-s*.04,by-s*.12);g.lineTo(bx+s*.04,by+s*.12);g.stroke()}
 if(face){[[.95,-.2],[1.1,-.15]].forEach(([dx,dy])=>{bp(g);g.arc(x+dx*s-s*.1,y+dy*s,s*.07,0,7);g.fillStyle='#fff';g.fill();g.stroke()});bp(g);g.arc(x+s*.92,y-s*.02,s*.1,.2,Math.PI-.2);g.stroke()}}
const swatchR=i=>{const gap=8,w=(A.W-gap*5)/4;return{x:gap+i*(w+gap),y:A.H*.79,w,h:A.H*.17}};
const pairR=i=>{const gap=10,w=(A.W-gap*3)/2;return{x:gap+i*(w+gap),y:A.H*.2,w,h:A.H*.6}};
function scene(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){say(g,'Look. Draw. Look again.',W/2,H*.2,18);const[x,y,s]=mid({x:W*.3,y:H*.35,w:W*.4,h:H*.5});ladybird(g,x,y,s,{legs:6});return}
 if(v==='legs'){panels(g);const[rx,ry,rs]=mid(realR()),[mx,my,ms]=mid(mineR());ladybird(g,rx,ry,rs,{legs:6,nums:L.count});ladybird(g,mx,my,ms,{legs:L.legs,pencil:1});
  say(g,`Real: ${L.count?L.count+' counted':'tap to count'}   Mine: ${L.legs} leg${L.legs===1?'':'s'}`,W/2,H*.82,13);say(g,L.said||'',W/2,H*.93,12,700);return A.fx.draw(g)}
 if(v==='snail'){panels(g);const[rx,ry,rs]=mid(realR()),[mx,my,ms]=mid(mineR());snail(g,rx,ry,rs,{});snail(g,mx,my,ms,{pencil:1,legs:!L.gone.includes('legs'),smile:!L.gone.includes('smile')});
  say(g,`Rubbed out: ${L.gone.length} of 2 made-up things`,W/2,H*.82,13);say(g,L.said||'',W/2,H*.93,12,700);return A.fx.draw(g)}
 if(v==='paint'){panels(g);const r=realR(),m=mineR();flower(g,r.x+r.w/2,r.y+r.h*.32,Math.min(r.w,r.h)*.26,[YEL,LEAF,LEAF]);flower(g,m.x+m.w/2,m.y+m.h*.32,Math.min(m.w,m.h)*.26,L.cols);
  PAINTS.forEach(([n,col],i)=>{const q=swatchR(i);g.fillStyle=col;A.paint.rrect(q.x,q.y,q.w,q.h,12);g.fill();g.lineWidth=L.brush===i?5:2;g.strokeStyle=A.col.tx;A.paint.rrect(q.x,q.y,q.w,q.h,12);g.stroke();
   g.font=`800 ${em(12)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=i<2?'#111827':'#ffffff';g.fillText((L.brush===i?'✓ ':'')+n,q.x+q.w/2,q.y+q.h/2)});
  say(g,L.said||'Pick a colour, then tap a part of your flower.',W/2,H*.05,12,700);return A.fx.draw(g)}
 if(v==='lens'){panels(g);const r=realR(),m=mineR(),[rx,ry,rs]=mid(r),[mx,my,ms]=mid(m),tiny=rs*.55;bee(g,rx,ry,tiny,{wings:1,stripes:1,feelers:1});
  bee(g,mx,my,ms*.9,{wings:L.found.includes('wings'),stripes:L.found.includes('stripes'),feelers:L.found.includes('feelers')});
  const lr=Math.min(r.w,r.h)*.3,lx=L.lx,ly=L.ly;g.save();bp(g);g.arc(lx,ly,lr,0,7);g.fillStyle='#e3f6e8';g.fill();g.clip();g.translate(lx,ly);g.scale(2.4,2.4);g.translate(-lx,-ly);bee(g,rx,ry,tiny,{wings:1,stripes:1,feelers:1});g.restore();
  g.lineWidth=6;g.strokeStyle=A.col.tx;bp(g);g.arc(lx,ly,lr,0,7);g.stroke();bp(g);g.moveTo(lx+lr*.7,ly+lr*.7);g.lineTo(lx+lr*1.25,ly+lr*1.25);g.lineWidth=10;g.stroke();
  say(g,`Found ${L.found.length} of 3 small things`,W/2,H*.82,13);say(g,L.said||'Drag the magnifier over the real bee.',W/2,H*.93,12,700);return A.fx.draw(g)}
 if(v==='pick'){if(L.round<PAIRS.length){const P=PAIRS[L.round];say(g,P.q,W/2,H*.08,15);[0,1].forEach(i=>{const r=pairR(i),true_=i===P.good,[x,y,s]=mid(r);frame(g,r,L.wrong===i?'#fde2e2':'#eef6fb',3);
   if(L.round===0)spider(g,x,y,s,true_?8:6,!true_);if(L.round===1)worm(g,x,y,s*1.1,!true_);if(L.round===2)ladybird(g,x,y,s*.8,true_?{legs:6}:{legs:4,spots:0});say(g,i?'Right one':'Left one',r.x+r.w/2,r.y+r.h-16,12,0,INK)})}
  else say(g,'You picked every looking drawing!',W/2,H*.4,16);say(g,L.said||'',W/2,H*.9,12,700);return A.fx.draw(g)}}
function countReal(){if(L.count>=6)return;L.count++;A.sound.tick();note(`Leg ${L.count}.`+(L.count===6?' The real ladybird has 6 legs.':''));A.redraw();keys()}
function addLeg(d){const n=L.legs+d;if(n<0)return;if(n>6){A.sound.miss();L.said='Too many! Look back at the real one and count.';upd();return}
 L.legs=n;A.sound.pop();L.said=n===6?'6 legs, just like the real one!':`Your drawing has ${n} leg${n===1?'':'s'}.`;upd();keys();L.want()}
function rub(part){if(L.gone.includes(part))return;if(part==='shell'||part==='feelers'){A.sound.miss();L.said=`The real snail has ${part==='shell'?'a shell':'feelers'}. Keep it!`;upd();return}
 L.gone.push(part);A.sound.pop();L.said=part==='legs'?'Rubbed out! A real snail has no legs. It slides on one foot.':'Rubbed out! A real snail has no smiley mouth.';upd();keys();L.want()}
function brush(i){L.brush=i;A.sound.tick();L.said=`You picked ${PAINTS[i][0]}. Now tap a part.`;upd();keys()}
function colour(k){if(L.brush<0){L.said='Pick a colour first.';upd();return}const[name,need]=PARTS[k];
 if(L.brush!==need){A.sound.miss();L.said=`Look back: the real ${name} ${name==='petals'?'are':'is'} ${PAINTS[need][0]}.`;upd();return}
 L.cols[k]=PAINTS[need][1];A.sound.pop();L.said=`Yes, ${name} ${PAINTS[need][0]}, like the real one.`;upd();keys();L.want()}
function spotAt(i){const r=realR(),[rx,ry,rs]=mid(r),t=rs*.55,o=BITS[i][1];return[rx+o[0]*t,ry+o[1]*t]}
function lensTo(x,y){L.lx=x;L.ly=y;const lr=Math.min(realR().w,realR().h)*.3;BITS.forEach(([name],i)=>{const[sx,sy]=spotAt(i);if(Math.hypot(sx-x,sy-y)<lr*.55&&!L.found.includes(name)){L.found.push(name);A.sound.pop();
  L.said=`You found the ${name}! Add them to your drawing.`;note(L.said);keys();L.want()}});A.redraw()}
function lookAt(i){const[x,y]=spotAt(i);lensTo(x,y)}
function choose(i){if(L.round>=PAIRS.length)return;const P=PAIRS[L.round];if(i!==P.good){L.wrong=i;A.sound.miss();L.said=P.slip;upd();return}
 L.wrong=-1;L.round++;A.sound.pop();L.said='Yes! That one shows what is really there.';upd();keys();L.want()}
function keys(){if(!row)return;row.innerHTML='';const v=view(),B=(t,fn,l,pressed)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);if(pressed!=null)b.setAttribute('aria-pressed',String(pressed));b.onclick=fn};
 if(v==='legs'){if(L.count<6)B('👀 Count a real leg',countReal,'Count the next leg on the real ladybird');B('✏️ Add a leg',()=>addLeg(1),'Add a leg to my drawing');if(L.legs)B('Rub out a leg',()=>addLeg(-1),'Rub out a leg from my drawing')}
 if(v==='snail')['legs','smile','shell','feelers'].forEach(p=>{if(!L.gone.includes(p))B('Rub out '+p,()=>rub(p),'Rub out the '+p+' on my drawing')});
 if(v==='paint'){PAINTS.forEach(([n],i)=>B(n,()=>brush(i),'Pick '+n,L.brush===i));PARTS.forEach(([n],k)=>{if(L.cols[k]==null)B('Colour '+n,()=>colour(k),'Colour the '+n+' of my flower')})}
 if(v==='lens')BITS.forEach(([n],i)=>{if(!L.found.includes(n))B('🔍 Look at the '+n,()=>lookAt(i),'Move the magnifier to the '+n)});
 if(v==='pick'&&L.round<PAIRS.length){B('Left one',()=>choose(0),'Pick the left drawing');B('Right one',()=>choose(1),'Pick the right drawing')}}
function grab(p){const v=view();
 if(v==='legs'){if(inside(p,realR()))countReal();else if(inside(p,mineR()))addLeg(1);return false}
 if(v==='snail'&&inside(p,mineR())){const[mx,my,ms]=mid(mineR());rub(p.y>my+ms*.4?'legs':p.x>mx+ms*.5?(p.y<my?'feelers':'smile'):'shell');return false}
 if(v==='paint'){const i=PAINTS.findIndex((x,j)=>inside(p,swatchR(j)));if(i>=0){brush(i);return false}const m=mineR();if(inside(p,m)){const[mx]=mid(m),s=Math.min(m.w,m.h)*.26,fy=m.y+m.h*.32;colour(p.y<fy+s*.75?0:p.x>mx+s*.1?2:1)}return false}
 if(v==='lens'){lensTo(p.x,p.y);return true}
 if(v==='pick')[0,1].forEach(i=>{if(inside(p,pairR(i)))choose(i)});return false}
function drag(p){if(view()==='lens'){const r=realR();lensTo(Math.max(r.x,Math.min(r.x+r.w,p.x)),Math.max(r.y,Math.min(r.y+r.h,p.y)))}}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list){const me=(L.run=(L.run||0)+1);let j=0;(function step(){if(me!==L.run||j>=list.length)return;const[f,ms]=list[j++];f();setTimeout(step,A.reduced()?40:ms)})()}
function fresh(){const r=(L.run||0)+1;Object.keys(L).forEach(k=>delete L[k]);const R=realR();Object.assign(L,{run:r,want:()=>{},count:0,legs:0,gone:[],brush:-1,cols:[null,null,null],found:[],lx:R.x+R.w*.8,ly:R.y+R.h*.82,round:0,wrong:-1,said:''})}
const steps=[
{h:'Count, then draw',p:'Look at the real ladybird. Count its legs. Give your drawing the same number.',predict:{q:'How many legs does a ladybird have?',opts:['6','4, like a dog','8, like a spider'],ans:0},task:'Give your drawing 6 legs',
 show:()=>{steps[0].go();auto([0,1,2,3,4,5].map(()=>[countReal,220]).concat([0,1,2,3,4,5].map(()=>[()=>addLeg(1),220])))},
 go:()=>{fresh();note('Tap the real ladybird to count its legs. Tap your drawing to add a leg.');keys();L.want=ready(0,()=>L.legs===6,'Look, count, then draw. Your drawing matches the real one.')}},
{h:'Only what is there',p:'This snail drawing has 2 made-up things. Look at the real snail. Rub them out.',predict:{q:'Does a snail have legs?',opts:['No, it slides on one foot','Yes, four legs','Yes, lots of legs'],ans:0},task:'Rub out the 2 made-up things',
 show:()=>{steps[1].go();auto([[()=>rub('legs'),500],[()=>rub('smile'),500]])},
 go:()=>{fresh();note('Tap a part of the drawing that is not on the real snail.');keys();L.want=ready(1,()=>L.gone.length>=2,'A looking drawing shows only what is really there.')}},
{h:'Colour it true',p:'Look back at the real flower. Pick the same colours for your drawing.',predict:{q:'You forget what colour the stem is. What should you do?',opts:['Look back at the real flower','Pick my favourite colour','Leave it white'],ans:0},task:'Colour all 3 parts like the real flower',
 show:()=>{steps[2].go();auto([[()=>brush(0),350],[()=>colour(0),350],[()=>brush(1),350],[()=>colour(1),350],[()=>colour(2),350]])},
 go:()=>{fresh();note('Pick a colour, then colour the petals, the stem and the leaf.');keys();L.want=ready(2,()=>L.cols.every(x=>x),'You looked back to check the colours, so your drawing is true.')}},
{h:'Look closer',p:'Some things are too small to see at first. Drag the magnifier over the real bee.',predict:{q:'Your bee drawing looks done. What next?',opts:['Look again for more details','Stop, it is finished','Add things from my head'],ans:0},task:'Find 3 small things with the magnifier',
 show:()=>{steps[3].go();auto(BITS.map((b,i)=>[()=>lookAt(i),550]))},
 go:()=>{fresh();note('Drag the magnifier over the real bee to find small things.');keys();L.want=ready(3,()=>L.found.length>=3,'Looking again, up close, found stripes, wings and feelers to add.')}},
{h:'Which is a looking drawing?',p:'One drawing shows what is really there. One is made up. Pick the real one.',task:'Pick the looking drawing 3 times',
 show:()=>{steps[4].go();auto(PAIRS.map(P=>[()=>choose(P.good),450]))},
 go:()=>{fresh();note('Which drawing shows what is really there? Pick left or right.');keys();L.want=ready(4,()=>L.round>=PAIRS.length,'Count legs, look for eyes and spots, and draw what you see.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>L.want()});
const QS=[['You want to draw a snail. Where should you look?',[['At the real snail','ok'],['At a cartoon snail','cartoon'],['Nowhere, I draw from my head','head']]],
 ['How many legs does a ladybird have?',[['6','ok'],['4','four'],['8','eight']]],
 ['Your leaf drawing looks done. What is a good next step?',[['Look again and add a detail','ok'],['Add a smiley face','face'],['Stop looking','stop']]],
 ['The real flower has yellow petals. What colour should yours be?',[['Yellow','ok'],['My favourite colour','fav'],['Any colour','any']]],
 ['What helps you see tiny things on a bug?',[['A magnifying glass','ok'],['Shutting my eyes','shut'],['Looking from far away','far']]],
 ['Does a real snail have legs?',[['No, it slides on one foot','ok'],['Yes, four legs','fourlegs'],['Yes, lots of legs','lotslegs']]]];
function slip(t){let m='Look at the real thing, then draw what you see.';
 if(t==='cartoon')m='A cartoon snail is made up. Look at a real one.';
 if(t==='head')m='From your head you guess. Look at the real snail.';
 if(t==='four')m='4 legs is a dog or a cat. Count again: a ladybird has 6.';
 if(t==='eight')m='8 legs is a spider. A ladybird has 6 legs.';
 if(t==='face')m='Real leaves have no faces. Draw only what is there.';
 if(t==='stop')m='Look again! You will find more to add, like the lines on a leaf.';
 if(t==='fav')m='Use the real colour. Look back: the petals are yellow.';
 if(t==='any')m='Not any colour. Look back and copy the real one.';
 if(t==='shut')m='You cannot see with your eyes shut. A magnifier makes things bigger.';
 if(t==='far')m='Far away, small things are harder to see. Get close, or use a magnifier.';
 if(t==='fourlegs')m='Look at the real snail: no legs. It slides on one big foot.';
 if(t==='lotslegs')m='That is a centipede! A snail has no legs at all.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>mark(t)});note('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inRow++;A.win()}else{inRow=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+inRow+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw:scene,onStep:A=>{quiz.hidden=A.step!==5;row.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down:grab,move:drag,up:()=>{}});keys()}});
A.start()})})();
