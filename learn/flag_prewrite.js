/* Flagship – Pre-writing shapes: lines, circles and crosses (English, Handwriting & Transcription, ages 3-4;
   DfE Development Matters 2021 Physical Development, EYFS 2024 ELG Fine Motor Skills, Beery VMI norms). The child
   draws with a finger: rain lines down from a cloud, roads across from a car to a flag, round balls that start at the
   top, go round to the left and join up, and window crosses whose lines meet in the middle. Every stroke is judged on
   where it starts, which way it goes and whether it gets to the end, and a wrong start gets its own reply. Then the
   child watches Pip the pencil draw and says right way or wrong way, and finishes a picture with the four shapes.
   Data and drawings: prewrite_art.js. */
(()=>{const P=PWS;
VIS.reg('flagprewrite',c=>{c.fig.classList.add('young');
let A,ctl,chal,qi=-1,epoch=0,ink=null,busy=false,drag=null,cards=[],gaps=[],pills=[];const S={};
const KEYS=['down','across','round','cross','spot','picture','chal'],key=()=>KEYS[A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,far=P.far;
const NEED={down:3,across:3,round:2,cross:2};
/* the strip at the top has a fixed height, so the drawing places never move while the child draws */
const topH=()=>A.narrow?112:96,tol=()=>Math.max(30,A.W*.07),head=(t,m)=>P.head(A,t,m,topH()-12);
function say(msg,bad){S.msg=msg;S.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();S.ping()}
/* ---- where each shape goes on the canvas ---- */
function places(){const k=key(),y0=topH(),W=A.W,H=A.H,out=[];
 if(k==='down')for(let i=0;i<3;i++){const x=W*(i+1)/4;out.push({a:{x,y:y0+74},b:{x,y:H-40}})}
 if(k==='across')for(let i=0;i<3;i++){const y=y0+28+(H-y0-40)*(i+.5)/3;out.push({a:{x:70,y},b:{x:W-56,y}})}
 if(k==='round'||k==='cross'){const room=H-y0-20;if(A.narrow){const R=Math.min(W*.25,room/5.4);[.25,.75].forEach(f=>out.push({x:W/2,y:y0+10+room*f,R}))}
  else{const R=Math.min(W/6.8,room/2.9);[.29,.71].forEach(f=>out.push({x:W*f,y:y0+10+room/2,R}))}}
 return out}
function judge(pts){const k=key(),spots=places();if(pts.length<3)return;S.miss=null;
 if(k==='down'||k==='across'){const free=spots.map((t,i)=>i).filter(i=>!S.made[i]);if(!free.length)return;
  const mid=pts[Math.floor(pts.length/2)],i=free.reduce((m,j)=>{const t=spots[j],d=far(mid,{x:(t.a.x+t.b.x)/2,y:(t.a.y+t.b.y)/2});return d<m.d?{i:j,d}:m},{i:free[0],d:1e9}).i;
  const v=P.lineVerdict(pts,spots[i].a,spots[i].b,tol());if(v!=='ok'){S.miss=pts;A.sound.miss();return say(P.LINE_SAY[k][v],true)}
  S.made[i]=pts;A.sound.pop();const n=S.made.filter(Boolean).length;return say(`${P.LINE_SAY[k].ok} ${n} of 3.`,false)}
 const free=spots.map((t,i)=>i).filter(i=>!S.made[i]||(k==='cross'&&!S.made[i].h));if(!free.length)return;
 const i=free.reduce((m,j)=>{const d=far(pts[Math.floor(pts.length/2)],spots[j]);return d<m.d?{i:j,d}:m},{i:free[0],d:1e9}).i,t=spots[i];
 if(k==='round'){const v=P.roundVerdict(pts,t,tol());if(v!=='ok'){S.miss=pts;A.sound.miss();return say(P.ROUND_SAY[v],true)}S.made[i]=pts;A.sound.pop();return say(`${P.ROUND_SAY.ok} ${S.made.filter(Boolean).length} of 2.`,false)}
 crossStroke(pts,t,i)}
/* a cross: the line down first, then a line across that meets it in the middle */
function crossStroke(pts,t,i){const s=pts[0],e=pts[pts.length-1],flat=Math.abs(e.x-s.x)>Math.abs(e.y-s.y),got=S.made[i]||{};
 const miss=m=>{S.miss=pts;A.sound.miss();say(m,true)};
 if(!got.v){if(flat)return miss('Draw the line down first, from the top. The line across comes next.');
  const v=P.lineVerdict(pts,{x:t.x,y:t.y-t.R},{x:t.x,y:t.y+t.R},tol());if(v!=='ok')return miss(v==='back'?'You pushed up from the bottom. Start the line down at the top.':v==='short'?'Keep going, all the way down.':'Start at the green dot at the top and go straight down.');
  S.made[i]={v:pts};A.sound.pop();return say('Line down. Now a line across that meets it in the middle.',false)}
 if(!flat)return miss('This window already has its line down. Now go across, from the left.');
 const y=pts.reduce((q,p)=>q+p.y,0)/pts.length;
 if(y<t.y-t.R*.45)return miss('Your line across is at the top, so it makes a T. A cross meets in the middle.');
 if(y>t.y+t.R*.45)return miss('Your line across is at the bottom, so it makes an L shape. A cross meets in the middle.');
 if(s.x>e.x)return miss('You went across from the right. Start on the left, at the green dot.');
 if(s.x>t.x-t.R*.4||e.x<t.x+t.R*.4)return miss('Make the line across longer, so it goes right through the line down.');
 got.h=pts;S.made[i]=got;A.sound.pop();say(`A cross! ${S.made.filter(m=>m&&m.h).length} of 2.`,false)}
function play(pts,ms,then){const e=epoch;busy=true;ink=[pts[0]];A.redraw();pts.slice(1).forEach((p,j)=>setTimeout(()=>{if(e!==epoch)return;ink.push(p);A.redraw()},(j+1)*ms/pts.length));
 setTimeout(()=>{if(e!==epoch)return;ink=null;busy=false;judge(pts);then&&then()},ms+30)}
function chain(list){const e=epoch;let t=0;list.forEach(f=>{setTimeout(()=>{if(e===epoch)f()},t);t+=420})}
function nextFree(){const sp=places();return sp.findIndex((_,i)=>!S.made[i]||(key()==='cross'&&!S.made[i].h))}
function auto(kind,how){if(busy)return;const i=nextFree();if(i<0)return;const t=places()[i],k=key();
 if(k==='cross'){const got=S.made[i]||{};return play(P.pathFor(got.v?'h':'v',t,how||(got.v?'mid':'')),320)}
 play(P.pathFor(kind,t,how),k==='round'?460:300)}
/* ---- step 5: is Pip drawing it the right way? ---- */
function playClip(){S.t=0;A.tween(S,{t:1},900,'io')}
function verdict(says){const C=P.CLIPS[S.ci];if(S.ci>=P.CLIPS.length)return;
 if(says!==C.ok){A.sound.miss();return say(C.ok?`Look again: Pip drew ${C.say}. That is the right way.`:C.why,true)}
 A.sound.pop();const was=C.ok?`Yes, ${C.say} is the right way.`:`Yes, wrong way. ${C.why}`;S.ci++;if(S.ci<P.CLIPS.length)playClip();say(`${was} ${S.ci} of ${P.CLIPS.length}.`,false)}
/* ---- step 6: finish the picture ---- */
function place(part,shape){if(S.put[part])return;const R=P.PARTS[part];
 if(P.SHAPES[shape].k!==R.k){S.wrongCard=shape;A.sound.miss();return say(R.no,true)}
 S.put[part]=true;S.pick=null;S.wrongCard=null;A.sound.pop();say(`${P.SHAPES[shape].name} for ${R.name}. ${Object.keys(S.put).length} of 4.`,false)}
/* ---- drawing ---- */
const crayonCol=k=>({down:'#2563eb',across:'#c2410c',round:'#ea580c',cross:'#7c3aed'})[k];
function drawStrokes(){const g=A.ctx,dk=A.col.dark,k=key(),sp=places(),n=S.made.filter(m=>m&&(k!=='cross'||m.h)).length,fin=n===NEED[k];
 head(fin?P.DONE[A.step]:S.msg||P.TXT[A.step],fin?'ok':S.bad?'no':'');
 if(k==='down'){P.cloud(g,A.W/2,topH()+34,A.W*.78,dk);sp.forEach((t,i)=>{P.puddle(g,t.b.x,t.b.y+16,56,dk);if(S.made[i])return P.crayon(g,S.made[i],crayonCol(k),9);P.dotted(g,dk,()=>{g.moveTo(t.a.x,t.a.y);g.lineTo(t.b.x,t.b.y)});P.arrowHead(g,t.b.x,t.b.y-4,Math.PI/2,'#64748b');P.startDot(g,t.a.x,t.a.y,dk)})}
 if(k==='across')sp.forEach((t,i)=>{g.fillStyle=dk?'#334155':'#e2e8f0';P.rr(g,t.a.x-14,t.a.y-22,t.b.x-t.a.x+28,44,10);g.fill();P.car(g,34,t.a.y+4,dk);P.flag(g,t.b.x+20,t.b.y+6,dk);
  if(S.made[i])return P.crayon(g,S.made[i],crayonCol(k),9);P.dotted(g,dk,()=>{g.moveTo(t.a.x,t.a.y);g.lineTo(t.b.x,t.b.y)});P.arrowHead(g,t.b.x-2,t.b.y,0,'#64748b');P.startDot(g,t.a.x,t.a.y,dk)});
 if(k==='round')sp.forEach((t,i)=>{if(S.made[i]){P.ball(g,t.x,t.y,t.R*.9);return P.crayon(g,S.made[i],'#7c2d12',7)}P.dotted(g,dk,()=>g.arc(t.x,t.y,t.R,0,7));
  g.save();g.strokeStyle='#64748b';g.lineWidth=4;g.beginPath();g.arc(t.x,t.y,t.R+18,-Math.PI/2-.2,-Math.PI/2-.9,true);g.stroke();g.restore();P.arrowHead(g,t.x+Math.cos(-Math.PI/2-.9)*(t.R+18),t.y+Math.sin(-Math.PI/2-.9)*(t.R+18),-Math.PI/2-.9-Math.PI/2,'#64748b');P.startDot(g,t.x,t.y-t.R,dk)});
 if(k==='cross')sp.forEach((t,i)=>{const got=S.made[i]||{},w=t.R*2.25;g.fillStyle=dk?'#1e293b':'#fef3c7';P.rr(g,t.x-w/2,t.y-w/2,w,w,10);g.fill();g.strokeStyle='#92400e';g.lineWidth=6;g.stroke();
  if(got.h)g.fillStyle=dk?'#0c4a6e':'#bae6fd',P.rr(g,t.x-w/2+6,t.y-w/2+6,w-12,w-12,6),g.fill();
  if(got.v)P.crayon(g,got.v,crayonCol(k),9);else{P.dotted(g,dk,()=>{g.moveTo(t.x,t.y-t.R);g.lineTo(t.x,t.y+t.R)});P.startDot(g,t.x,t.y-t.R,dk)}
  if(got.h)P.crayon(g,got.h,crayonCol(k),9);else if(got.v){P.dotted(g,dk,()=>{g.moveTo(t.x-t.R,t.y);g.lineTo(t.x+t.R,t.y)});P.startDot(g,t.x-t.R,t.y,dk)}});
 if(S.miss)P.crayon(g,S.miss,'rgba(220,38,38,.55)',7);if(ink)P.crayon(g,ink,crayonCol(k),9)}
function drawSpot(){const g=A.ctx,dk=A.col.dark,fin=S.ci>=P.CLIPS.length;head(fin?P.DONE[4]:S.msg||'Watch Pip. Right way or wrong way?',fin?'ok':S.bad?'no':'');pills=[];if(fin)return;
 const pts=P.clipPts(P.CLIPS[S.ci],A.W,A.H,topH()),n=Math.max(2,Math.round(pts.length*S.t));let seg=[],tip=pts[0];
 pts.slice(0,n).forEach(p=>{if(!p){P.crayon(g,seg,'#7c3aed',9);seg=[];return}seg.push(p);tip=p});P.crayon(g,seg,'#7c3aed',9);if(pts[0])P.startDot(g,pts[0].x,pts[0].y,dk);P.pip(g,tip.x,tip.y,dk);
 const w=(A.W-36)/2,h=66,y=A.H-h-14;[['Right way',true],['Wrong way',false]].forEach(([lab,v],j)=>{const r={x:12+j*(w+12),y,w,h,v};pills.push(r);g.fillStyle=v?(dk?'#14532d':'#dcfce7'):(dk?'#7f1d1d':'#fee2e2');P.rr(g,r.x,r.y,w,h,18);g.fill();
  g.strokeStyle=v?P.GOOD:P.BAD;g.lineWidth=3;g.stroke();g.font=`800 ${A.narrow?19:22}px system-ui,sans-serif`;g.fillStyle=dk?P.PALE:P.INK;g.textAlign='center';g.textBaseline='middle';g.fillText((v?'\u2713 ':'\u2717 ')+lab,r.x+w/2,y+h/2)})}
function drawPicture(){const g=A.ctx,dk=A.col.dark,done=Object.keys(S.put).length,fin=done===4,y0=topH(),W=A.W;head(fin?P.DONE[5]:S.msg||`Drag a shape to each dotted part. (${done} of 4)`,fin?'ok':S.bad?'no':'');
 const rows=A.narrow?2:1,cardH=58,cy=A.H-rows*(cardH+10)-6,sh=cy-y0-10,hx=W*.5,hw=Math.min(W*.44,sh*.95),hy=y0+sh*.38,hh=sh*.36,ground=hy+hh;
 P.house(g,W,hx,hw,hy,hh,ground,cy,dk);
 const ws=Math.max(48,Math.min(hw*.34,hh*.6)),R=Math.min(34,sh*.11),spots=[{x:W-16-2*R-20,y:y0+10,w:2*R+20,h:2*R+20},{x:12,y:y0+40,w:Math.min(W*.24,hx-hw/2-22),h:sh*.4},{x:hx-hw*.4,y:hy+hh*.2,w:ws,h:ws},{x:hx+hw*.12-10,y:ground+4,w:Math.min(W*.3,hw*.6),h:Math.max(46,cy-ground-14)}];
 P.cloud(g,spots[1].x+spots[1].w/2,y0+26,spots[1].w*.95,dk);gaps=spots.map((r,i)=>({...r,i}));
 gaps.forEach(r=>{const k=P.PARTS[r.i].k,cx=r.x+r.w/2,yy=r.y+r.h/2;if(S.put[r.i]){if(k==='round')P.sun(g,cx,yy,R*.7,dk);if(k==='down')for(let j=0;j<3;j++)P.crayon(g,[{x:r.x+r.w*(j+1)/4,y:r.y+8},{x:r.x+r.w*(j+1)/4,y:r.y+r.h-8}],'#2563eb',6);
   if(k==='cross'){g.fillStyle=dk?'#0c4a6e':'#bae6fd';g.fillRect(r.x,r.y,r.w,r.h);P.icon(g,'cross',cx,yy,r.w/2,'#7c3aed');g.strokeStyle='#92400e';g.lineWidth=4;g.strokeRect(r.x,r.y,r.w,r.h)}if(k==='across')P.crayon(g,[{x:r.x+4,y:yy},{x:r.x+r.w-4,y:yy}],'#c2410c',10);return}
  const over=drag&&inside(drag,r);g.save();g.setLineDash([6,6]);g.strokeStyle=over?P.PICK:(dk?'#e2e8f0':'#334155');g.lineWidth=over?4:2.5;P.rr(g,r.x,r.y,r.w,r.h,10);g.stroke();g.restore();
  g.font='800 22px system-ui,sans-serif';g.fillStyle=dk?P.PALE:P.INK;g.textAlign='center';g.textBaseline='middle';g.fillText('?',cx,yy)});
 cards=[];const cw=(W-16-(rows===2?10:30))/(rows===2?2:4);P.SHAPES.forEach((Sh,j)=>{const r={j,x:8+(rows===2?j%2:j)*(cw+(rows===2?10:10)),y:cy+(rows===2?Math.floor(j/2):0)*(cardH+10),w:cw,h:cardH};
  if(Object.keys(S.put).some(pi=>P.PARTS[pi].k===Sh.k))return;if(drag&&drag.j===j)return;cards.push(r);P.chip(g,r,Sh.name,S.wrongCard===j?'no':S.pick===j?'sel':'',dk,Sh.k)});
 if(drag)P.chip(g,{x:drag.x-cw/2,y:drag.y-cardH/2,w:cw,h:cardH},P.SHAPES[drag.j].name,'sel',dk,P.SHAPES[drag.j].k)}
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=key();
 if(k==='chal'){head('Challenge: lines, circles and crosses','ok');const s=Math.min(36,A.W/14),y=topH()+60;['down','across','round','cross'].forEach((q,j)=>P.icon(g,q,A.W*(j+1)/5,y,s,['#2563eb','#c2410c','#ea580c','#7c3aed'][j]));return}
 if(k==='spot')drawSpot();else if(k==='picture')drawPicture();else drawStrokes();A.fx.draw(g)}
/* ---- pointer ---- */
function down(p){const k=key();if(NEED[k]){if(busy)return false;ink=[p];S.miss=null;A.redraw();return true}
 if(k==='spot'){const r=pills.find(q=>inside(p,q));if(r)verdict(r.v);return false}
 if(k==='picture'){if(S.pick!=null){const gp=gaps.find(q=>inside(p,q));if(gp){place(gp.i,S.pick);return false}}const cd=cards.find(q=>inside(p,q));if(cd){drag={j:cd.j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
function move(p){if(ink&&!busy){ink.push(p);A.redraw()}else if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){const k=key();if(NEED[k]&&ink&&!busy){const pts=ink;ink=null;if(pts.length<3||far(pts[0],pts[pts.length-1])<8&&pts.length<6)return say('Press on the green dot and slide your finger along the dotted line.',false);return judge(pts)}
 if(!drag)return;const h=drag;drag=null;const tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10,gp=gaps.find(q=>inside(p,q));
 if(gp&&!tap)return place(gp.i,h.j);if(tap){S.pick=h.j;return say(`Picked ${P.SHAPES[h.j].name}. Now tap the part that needs it.`,false)}A.redraw()}
function wipe(){epoch++;ink=null;busy=false;drag=null;for(const k in S)delete S[k];Object.assign(S,{made:[],miss:null,ci:0,t:1,put:{},pick:null,wrongCard:null,msg:null,bad:false,ping:()=>{}})}
function open(i,over){wipe();c.say(P.DESC[i]);A.cv.setAttribute('aria-label',P.DESC[i]);if(key()==='spot')playClip();
 S.ping=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(P.DONE[i]+A.reveal(i))};pads();A.redraw()}
/* ---- buttons: the same choices as the canvas, for anyone who cannot drag ---- */
function pads(){if(!ctl)return;ctl.innerHTML='';const k=key(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};const i=NEED[k]?nextFree():-1;
 if(k==='down'&&i>=0){b('Start at the top',()=>auto('line',''),`Rain line ${i+1}: start at the top and go down`);b('Start at the bottom',()=>auto('line','back'),`Rain line ${i+1}: start at the bottom and go up`)}
 if(k==='across'&&i>=0){b('Start by the car',()=>auto('line',''),`Road ${i+1}: start on the left by the car and go across`);b('Start by the flag',()=>auto('line','back'),`Road ${i+1}: start on the right by the flag`)}
 if(k==='round'&&i>=0){b('Top, round to the left',()=>auto('round',''),`Ball ${i+1}: start at the top and go round to the left`);b('Top, round to the right',()=>auto('round','cw'),`Ball ${i+1}: start at the top and go round to the right`);b('Stop half way',()=>auto('round','gap'),`Ball ${i+1}: stop half way round`)}
 if(k==='cross'&&i>=0){const got=S.made[i]||{};if(!got.v){b('Line down from the top',()=>auto(),`Window ${i+1}: line down from the top`);b('Line across first',()=>{const t=places()[i];play(P.pathFor('h',t,'mid'),300)},`Window ${i+1}: line across first`)}
  else{b('Across in the middle',()=>auto('h','mid'),`Window ${i+1}: line across in the middle`);b('Across at the top',()=>auto('h','top'),`Window ${i+1}: line across at the top`);b('Across at the bottom',()=>auto('h','low'),`Window ${i+1}: line across at the bottom`)}}
 if(k==='spot'&&S.ci<P.CLIPS.length){b('\u2713 Right way',()=>verdict(true),`Pip drew ${P.CLIPS[S.ci].say}: right way`);b('\u2717 Wrong way',()=>verdict(false),`Pip drew ${P.CLIPS[S.ci].say}: wrong way`);b('Watch again',playClip,'Watch Pip draw it again')}
 if(k==='picture'){const pi=P.PARTS.findIndex((_,j)=>!S.put[j]);if(pi>=0)P.SHAPES.forEach((Sh,j)=>{if(!Object.keys(S.put).some(q=>P.PARTS[q].k===Sh.k))b(Sh.name,()=>place(pi,j),`Put the ${Sh.name.toLowerCase()} on ${P.PARTS[pi].name}`)})}}
/* ---- challenge ---- */
function slipMsg(tag){let m='Lines start at the top or on the left. A circle starts at the top and goes round to the left.';
 if(tag==='bottom')m='Starting at the bottom means pushing the pencil up. Lines down and circles start at the top.';
 if(tag==='middle')m='Start at the very top, not part way, so the pencil goes all the way down or round.';
 if(tag==='rtl')m='We go across from the left to the right, the same way we read and write.';
 if(tag==='down')m='That is a line down. The question asks about going across or round.';
 if(tag==='cw')m='Round to the right is the other way. c, a, o and d all start at the top and go round to the left.';
 if(tag==='tee'||tag==='ell')m='If the lines meet at an end you get a T or an L. In a cross the line across goes through the middle of the line down.';
 if(tag==='gap')m='A ball with a gap is not finished. Keep going round until you join up at the start.';
 return m}
function ask(){qi++;const Q=P.QS[qi%P.QS.length],all=[[Q.a,'ok'],...Q.o],r=(qi+1)%3,order=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>mark(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(tag,a){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
/* ---- steps ---- */
const strokes=k=>()=>S.made.filter(m=>m&&(k!=='cross'||m.h)).length>=NEED[k];
const PLAN=[
{h:'Line down',p:P.TXT[0],predict:{q:'Rain falls from the cloud. Where does a line down start?',opts:['At the top','At the bottom'],ans:0},task:'Draw 3 rain lines, from the top down',
 show:()=>{PLAN[0].go();chain([0,1,2].map(()=>()=>auto('line','')))},go:()=>open(0,strokes('down'))},
{h:'Line across',p:P.TXT[1],predict:{q:'The car is on the left. Where does a line across start?',opts:['On the right, by the flag','On the left, by the car'],ans:1},task:'Draw 3 roads, from the car to the flag',
 show:()=>{PLAN[1].go();chain([0,1,2].map(()=>()=>auto('line','')))},go:()=>open(1,strokes('across'))},
{h:'Circle',p:P.TXT[2],predict:{q:'A circle starts at the top. Which way does it go?',opts:['Round to the right','Round to the left, like c'],ans:1},task:'Draw 2 balls: start at the top, go round to the left, join up',
 show:()=>{PLAN[2].go();chain([()=>auto('round',''),()=>{},()=>auto('round','')])},go:()=>open(2,strokes('round'))},
{h:'Cross',p:P.TXT[3],predict:{q:'Where do the two lines of a cross meet?',opts:['At the top, like T','In the middle','At the bottom, like L'],ans:1},task:'Draw a cross in 2 windows',
 show:()=>{PLAN[3].go();chain([()=>auto(),()=>auto('h','mid'),()=>auto(),()=>auto('h','mid')])},go:()=>open(3,strokes('cross'))},
{h:'Right way?',p:P.TXT[4],task:'Say right way or wrong way for all 7 of Pip\u2019s drawings',
 show:()=>{PLAN[4].go();chain(P.CLIPS.map(C=>()=>verdict(C.ok)))},go:()=>open(4,()=>S.ci>=P.CLIPS.length)},
{h:'Finish the picture',p:P.TXT[5],task:'Put a shape on all 4 dotted parts',
 show:()=>{PLAN[5].go();chain(P.PARTS.map((R,i)=>()=>place(i,P.SHAPES.findIndex(Sh=>Sh.k===R.k))))},go:()=>open(5,()=>Object.keys(S.put).length===4)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>S.ping()});
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.4,draw,onStep:X=>{chal.hidden=X.step!==6;ctl.hidden=X.step===6;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Pre-writing shapes lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
