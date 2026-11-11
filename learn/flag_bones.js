/* Flagship: bones and muscles (ages 5-7; NC Y1 body parts, Y3 skeletons and muscles for support, protection, movement).
   Flop without bones, build a skeleton, guard organs, bend an arm, sort bone or muscle. Not flagbody or flagheart. */
(()=>{const mn=Math.min,mx=Math.max;
const BONES=[['skull','Skull','head'],['ribs','Ribcage','chest'],['spine','Spine (backbone)','back'],['arms','Arm bones','arms'],['legs','Leg bones','legs']];
const PLACE={head:'Head',chest:'Chest',back:'Back',arms:'Arms',legs:'Legs'};
const GUARD=[['brain','The brain','skull','thinks and keeps you going'],['heart','The heart','ribs','pumps your blood'],['lungs','The lungs','ribs','breathe in air']];
const FACT=[['Hard and strong',0],['Pulls to make you move',1],['Gives your body its shape',0],['Gets short and fat when it works',1],['Keeps your brain safe',0],['Your heart is one of these',1]];
const FWHY=['Bones are hard. Muscles are soft and stretchy.','Muscles pull bones to move you. Bones cannot move alone.','Bones give you your shape. Without them you would flop.','A muscle gets short and fat as it pulls. Bones do not.','Your skull is a bone, a hard helmet for your brain.','Your heart is a muscle. It squeezes to pump blood.'];
VIS.reg('flagbones',c=>{let A,pad,quiz,qn=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NOPE='#b91c1c',RIM='#475569',PICK='#6d28d9',BONE='#f8fafc',BODY='#bfdbfe',SKIN='#1e40af',MUS='#e11d48';
const SF='system-ui,sans-serif',ft=(n,w)=>`${w||800} ${n}px ${SF}`,big=n=>A.narrow?n:Math.round(n*1.2);
const no=()=>A.sound.miss(),yes=()=>A.sound.pop(),lc=t=>t.toLowerCase(),kind=()=>['flop','build','guard','arm','sort','chal'][A.step];
const ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const R=(...a)=>A.paint.rrect(...a),inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H)}
function chip(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=ft(n);let w=g.measureText(t).width+22;while(w>A.W-10&&n>10){n--;g.font=ft(n);w=g.measureText(t).width+22}
const h=n+14,l=mx(5,mn(A.W-w-5,x-w/2));g.fillStyle='#fff';R(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?YES:o.bad?NOPE:RIM;g.stroke();ctr(g);g.fillStyle=INK;g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle='#fff';R(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.bad||o.on?4:2;g.strokeStyle=o.bad?NOPE:o.on?PICK:RIM;g.stroke();
let n=big(15);g.font=ft(n);const words=t.split(' ');let lines=[t];if(g.measureText(t).width>r.w-12&&words.length>1){const k=Math.ceil(words.length/2);lines=[words.slice(0,k).join(' '),words.slice(k).join(' ')]}
while(lines.some(s=>g.measureText(s).width>r.w-10)&&n>10){n--;g.font=ft(n)}ctr(g);g.fillStyle=INK;lines.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(lines.length-1)/2)*(n+3)))}
const fig=(cx,top,u)=>({cx,top,u,head:{x:cx,y:top+1.2*u,r:1.1*u},chest:{x:cx-1.5*u,y:top+2.6*u,w:3*u,h:2.3*u},belly:{x:cx-1.5*u,y:top+4.9*u,w:3*u,h:1.3*u},
arm:[[cx-1.6*u,top+2.8*u,cx-2.7*u,top+5.9*u],[cx+1.6*u,top+2.8*u,cx+2.7*u,top+5.9*u]],leg:[[cx-.8*u,top+6.2*u,cx-1*u,top+9.7*u],[cx+.8*u,top+6.2*u,cx+1*u,top+9.7*u]]});
const stage=()=>{const u=A.H*.088,cx=A.narrow?A.W*.32:A.W*.34;return fig(cx,A.H*.04,u)};
const bar=(a,b,c2,d,w,col,ed)=>{stick(a,b,c2,d,w*1.45,ed);stick(a,b,c2,d,w,col)};
function stick(x0,y0,x1,y1,w,col){const g=A.ctx;g.strokeStyle=col;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke()}
function skin(F){const g=A.ctx,u=F.u;const E=A.col.dark?'#93c5fd':SKIN;g.fillStyle=A.col.dark?'#1e3a8a':BODY;g.strokeStyle=E;g.lineWidth=2;
F.arm.concat(F.leg).forEach(a=>{const w=(a[1]>F.top+6*u?1.1:.85)*u;stick(a[0],a[1],a[2],a[3],w,E);stick(a[0],a[1],a[2],a[3],w-4,g.fillStyle)});
R(F.chest.x,F.chest.y,F.chest.w,F.chest.h+F.belly.h+.1*u,u*.6);g.fill();g.stroke();g.beginPath();g.arc(F.head.x,F.head.y,F.head.r,0,7);g.fill();g.stroke()}
function bone(F,k,o){o=o||{};const g=A.ctx,u=F.u,col=o.col||BONE,edge=o.edge||'#64748b';
if(k==='skull'){g.fillStyle=col;g.strokeStyle=edge;g.lineWidth=2;g.beginPath();g.arc(F.head.x,F.head.y-.08*u,.82*u,0,7);g.fill();g.stroke();g.fillStyle='#334155';[-1,1].forEach(s=>{g.beginPath();g.arc(F.head.x+s*.32*u,F.head.y-.05*u,.18*u,0,7);g.fill()})}
if(k==='spine'){for(let i=0;i<9;i++){const y=F.top+2.5*u+i*.42*u;g.fillStyle=col;g.strokeStyle=edge;g.lineWidth=1.5;R(F.cx-.22*u,y,.44*u,.32*u,4);g.fill();g.stroke()}}
if(k==='ribs'){for(let i=0;i<5;i++){const y=F.top+2.9*u+i*.42*u,w=(1.25-.05*i)*u;[-1,1].forEach(z=>bar(F.cx+z*.25*u,y,F.cx+z*w,y+.3*u,.11*u,col,edge))}}
if(k==='arms'||k==='legs')(k==='arms'?F.arm:F.leg).forEach(a=>{const mx2=(a[0]+a[2])/2,my=(a[1]+a[3])/2;[[a[0],a[1],mx2,my],[mx2,my,a[2],a[3]]].forEach(s=>{bar(s[0],s[1],s[2],s[3],.24*u,col,edge)})})}
const allBones=(F,o)=>['spine','ribs','skull','arms','legs'].forEach(k=>bone(F,k,o));
function drawFlop(){const s=S.f,g=A.ctx;bg();const F=stage(),foot=F.top+9.9*F.u;g.save();g.translate(F.cx,foot);g.scale(1+.45*s.v,1-.7*s.v);g.translate(-F.cx,-foot);skin(F);if(s.v<.05)allBones(F);g.restore();
if(s.v>.5){const G=fig(A.W*(A.narrow?.8:.76),A.H*.3,A.H*.05);chip('Bones out',G.cx,A.H*.22,{n:12});allBones(G)}
chip(s.v>.5?'No bones: floppy!':'Bones inside: standing tall',A.W/2,A.H*.95,{ok:s.v<.5&&s.back,bad:s.v>.5})}
function flop(out){const s=S.f;if(out===!!s.out)return;s.out=out;if(!out&&s.went)s.back=1;if(out)s.went=1;A.sound.whoosh();A.tween(s,{v:out?1:0},700,'out');
say(out?'With no bones, the body cannot hold its shape. It flops like jelly.':'Bones back in. The skeleton holds the body up.')}
const card=()=>{const w=A.narrow?A.W*.36:mn(200,A.W*.3),h=mn(84,A.H*.15);return{x:A.W-w-10,y:A.H*.13,w,h}};
function spot(F,p){const u=F.u;if(Math.hypot(p.x-F.head.x,p.y-F.head.y)<F.head.r*1.2)return'head';if(inR(p,F.chest))return'chest';if(inR(p,F.belly))return'back';
const near=L=>L.some(a=>{const t=mx(0,mn(1,((p.x-a[0])*(a[2]-a[0])+(p.y-a[1])*(a[3]-a[1]))/((a[2]-a[0])**2+(a[3]-a[1])**2)));return Math.hypot(p.x-(a[0]+t*(a[2]-a[0])),p.y-(a[1]+t*(a[3]-a[1])))<u*.9});
if(near(F.arm))return'arms';if(near(F.leg))return'legs';return null}
function drawBuild(){const s=S.b,g=A.ctx;bg();const F=stage();skin(F);s.at.forEach(k=>bone(F,BONES[k][0]));
if(s.k<5){const r=card(),d=S.drag;chip(`Bone ${s.k+1} of 5`,r.x+r.w/2,r.y-16,{n:11});tile(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,BONES[s.k][1],{bad:s.bad,on:!!d})}else chip('Skeleton built',A.W*.75,A.H*.12,{ok:1})}
function place(where){const s=S.b;if(s.k>=5)return;const [k,name,want]=BONES[s.k];
if(where!==want){s.bad=1;no();return say({skull:'The skull is the round bone in your head. It goes round your brain.',ribs:'The ribcage is in your chest. Feel your bumpy ribs.',spine:'The spine runs down the middle of your back. ',arms:'Arm bones go inside your arms.',legs:'Leg bones go inside your legs and hold you up.'}[k])}
s.at.push(s.k);s.k++;s.bad=0;yes();say(`Yes: the ${lc(name)} ${k==='arms'||k==='legs'?'go':'goes'} in the ${lc(PLACE[want])}.`+(s.k>=5?' Your skeleton is all your bones together.':''))}
const shields=()=>{const w=(A.W-40)/3,h=mn(70,A.H*.13);return['skull','ribs','legs'].map((k,i)=>({k,x:10+i*(w+10),y:A.H-h-8,w,h}))};
function organ(F,k,lit){const g=A.ctx,u=F.u;g.lineWidth=lit?4:1.5;g.strokeStyle=lit?PICK:'#7f1d1d';
if(k==='brain'){g.fillStyle='#f9a8d4';g.beginPath();g.ellipse(F.head.x,F.head.y-.15*u,.65*u,.48*u,0,0,7);g.fill();g.stroke()}
if(k==='heart'){g.fillStyle='#ef4444';g.beginPath();g.arc(F.cx+.25*u,F.top+3.9*u,.38*u,0,7);g.fill();g.stroke()}
if(k==='lungs'){g.fillStyle='#fda4af';[-1,1].forEach(s=>{g.beginPath();g.ellipse(F.cx+s*.75*u,F.top+3.6*u,.42*u,.8*u,0,0,7);g.fill();g.stroke()})}}
function drawGuard(){const s=S.g,g=A.ctx;bg();const F=fig(A.W/2,A.H*.03,A.H*.072);skin(F);['lungs','heart','brain'].forEach(k=>organ(F,k,s.k<3&&GUARD[s.k][0]===k));
s.done.forEach(i=>bone(F,GUARD[i][2],{col:'rgba(248,250,252,.85)'}));
if(s.k<3)chip(`What keeps ${lc(GUARD[s.k][1])} safe?`,A.W/2,A.H*.76,{n:13});else chip('Skull for the brain, ribcage for the heart and lungs',A.W/2,A.H*.76,{ok:1,n:12});
if(s.k<3)shields().forEach(r=>{const d=S.drag&&S.drag.k===r.k;tile(d?{...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2}:r,{skull:'Skull',ribs:'Ribcage',legs:'Leg bones'}[r.k],{bad:s.bad===r.k,on:d})})}
function guard(k){const s=S.g;if(s.k>=3)return;const [,name,want,job]=GUARD[s.k];
if(k!==want){s.bad=k;no();return say(k==='legs'?'Leg bones hold you up, but they are far from '+lc(name)+'.':k==='skull'?'The skull is up in your head. '+name+' is in your chest, inside the ribcage.':'The ribcage is in your chest. The brain is up in your head, inside the skull.')}
s.done.push(s.k);s.k++;s.bad=0;yes();say(`Yes: the ${want==='skull'?'skull':'ribcage'} keeps ${lc(name)} safe. ${name} ${job}.`)}
const AMAX=2.3,joint=()=>{const L=A.W*(A.narrow?.36:.28);return{s:{x:A.W*.08,y:A.H*.62},e:{x:A.W*.08+L,y:A.H*.62},L2:L*.95}};
const hand=a=>{const J=joint();return{x:J.e.x+J.L2*Math.cos(a),y:J.e.y-J.L2*Math.sin(a)}};
function muscle(x0,y0,x1,y1,fat,col,on){const g=A.ctx,mx2=(x0+x1)/2,my=(y0+y1)/2,d=Math.hypot(x1-x0,y1-y0)||1,nx=-(y1-y0)/d,ny=(x1-x0)/d;
g.fillStyle=col;g.strokeStyle=on?PICK:'#881337';g.lineWidth=on?4:2;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(mx2+nx*fat,my+ny*fat,x1,y1);g.quadraticCurveTo(mx2-nx*fat*.3,my-ny*fat*.3,x0,y0);g.fill();g.stroke()}
function drawArm(){const s=S.a,g=A.ctx,J=joint(),a=s.ang,H=hand(a),k=a/AMAX,u=A.H*.05;bg();
const fx=J.e.x+J.L2*.25*Math.cos(a),fy=J.e.y-J.L2*.25*Math.sin(a);
muscle(J.s.x+u*.6,J.s.y-u*.5,fx,fy-u*.1,-(u*.7+u*1.6*k),MUS,s.dir>0);
muscle(J.s.x+u*.6,J.s.y+u*.5,J.e.x-u*.2,J.e.y+u*.55,u*.7+u*1.4*(1-k),'#fb7185',s.dir<0);
bar(J.s.x,J.s.y,J.e.x,J.e.y,u*.4,BONE,'#64748b');bar(J.e.x,J.e.y,H.x,H.y,u*.36,BONE,'#64748b');
g.fillStyle='#fde68a';g.strokeStyle=RIM;g.lineWidth=2;g.beginPath();g.arc(H.x,H.y,u*.75,0,7);g.fill();g.stroke();g.beginPath();g.arc(J.e.x,J.e.y,u*.35,0,7);g.fillStyle='#e2e8f0';g.fill();g.stroke();
chip('Elbow',J.e.x,J.e.y+u*1.9,{n:11});chip('Drag the hand',H.x,H.y-u*1.4,{n:11});
chip(s.dir>0?'Front muscle pulls: short and fat':s.dir<0?'Back muscle pulls: arm goes straight':'Two muscles, one on each side',A.W/2,A.H*.07,{n:13,ok:s.bent&&s.straight});
chip(`Bent ${s.bent?'✓':'…'}   Straight again ${s.straight?'✓':'…'}`,A.W/2,A.H*.93,{n:12})}
function bend(to){const s=S.a,was=s.ang;s.ang=mx(0,mn(AMAX,to));if(Math.abs(s.ang-was)<.01)return;s.dir=s.ang>was?1:-1;let news='';
if(s.ang>=AMAX-.2&&!s.bent){s.bent=1;news='The front muscle pulled the arm bone up. It got short and fat. '}
if(s.bent&&s.ang<=.15&&!s.straight){s.straight=1;news='A muscle cannot push, so the back muscle pulled the arm straight again. '}
if(news)yes();say(news+(s.dir>0?'Bending: the front muscle is pulling.':'Straightening: the back muscle is pulling.'))}
const tray=()=>{const w=(A.W-30)/2,h=A.H*.38;return[0,1].map(i=>({i,x:10+i*(w+10),y:A.H*.58,w,h}))};
const top=()=>{const w=mn(250,A.W*.7),h=mn(90,A.H*.18);return{x:A.W/2-w/2,y:A.H*.12,w,h}};
function drawSort(){const s=S.s,g=A.ctx;bg();tray().forEach(b=>{g.fillStyle=b.i?'#ffe4e6':'#f1f5f9';R(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=b.i?MUS:RIM;g.lineWidth=2.5;g.stroke();
chip(b.i?'Muscle':'Bone',b.x+b.w/2,b.y+18,{n:14});g.font=`${big(26)}px ${SF}`;ctr(g);g.fillStyle='#000';g.fillText(b.i?'💪':'🦴',b.x+b.w/2,b.y+b.h*.45);
g.font=ft(big(13));g.fillStyle=INK;g.fillText(`${s.got[b.i]} cards`,b.x+b.w/2,b.y+b.h*.8)});
if(s.k<6){const r=top(),d=S.drag;chip(`Card ${s.k+1} of 6`,A.W/2,A.H*.05,{n:12});tile(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,FACT[s.k][0],{bad:s.bad,on:!!d})}else chip('All sorted',A.W/2,A.H*.3,{ok:1})}
function sortTo(i){const s=S.s;if(s.k>=6)return;const [t,want]=FACT[s.k];if(i!==want){s.bad=1;no();return say(FWHY[s.k])}
s.got[i]++;s.k++;s.bad=0;yes();say(`Yes, ${want?'muscle':'bone'}. ${FWHY[s.k-1]}`)}
function draw(){const k=kind();if(k==='chal'){bg();const F=stage();skin(F);allBones(F);chip('Challenge',A.W*.72,A.H*.3,{n:18});return}
({flop:drawFlop,build:drawBuild,guard:drawGuard,arm:drawArm,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=kind();
if(k==='flop'){const F=stage();if(p.x<F.cx+3*F.u){flop(!S.f.out)}return false}
if(k==='build'&&S.b.k<5){if(inR(p,card())){S.drag={x:p.x,y:p.y};return true}const w=spot(stage(),p);if(w)place(w);return false}
if(k==='guard'&&S.g.k<3){const r=shields().find(r=>inR(p,r));if(r){S.drag={k:r.k,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
if(k==='arm'){const H=hand(S.a.ang);if(Math.hypot(p.x-H.x,p.y-H.y)<A.H*.12){S.drag={};return true}return false}
if(k==='sort'&&S.s.k<6){if(inR(p,top())){S.drag={x:p.x,y:p.y};return true}const b=tray().find(b=>inR(p,b));if(b)sortTo(b.i)}return false}
function move(p){if(!S.drag)return;if(kind()==='arm'){const J=joint();bend(Math.atan2(J.e.y-p.y,p.x-J.e.x));return}S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=kind();
if(k==='build'){const w=spot(stage(),p);if(w)place(w);else A.redraw()}
if(k==='guard'){const F=fig(A.W/2,A.H*.03,A.H*.072),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;if(tap||p.y<F.top+6.4*F.u)guard(d.k);else A.redraw()}
if(k==='sort'){const b=tray().find(b=>inR(p,b));if(b)sortTo(b.i);else A.redraw()}
if(k==='arm')A.redraw()}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{f:{v:0,out:0,went:0,back:0},b:{k:0,at:[],bad:0},g:{k:0,done:[],bad:null},a:{ang:.05,dir:0,bent:0,straight:0},s:{k:0,got:[0,0],bad:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();S.hook()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){reset();say(desc);S.hook=when(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function pads(){if(!pad)return;pad.innerHTML='';const k=kind(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
if(k==='flop')B(S.f.out?'🦴 Put the bones back':'🫠 Take the bones out',()=>flop(!S.f.out));
if(k==='build'&&S.b.k<5)Object.keys(PLACE).forEach(w=>B(`${BONES[S.b.k][1]}: ${PLACE[w]}`,()=>place(w)));
if(k==='guard'&&S.g.k<3)[['skull','Skull'],['ribs','Ribcage'],['legs','Leg bones']].forEach(([v,t])=>B(`${t} for ${lc(GUARD[S.g.k][1])}`,()=>guard(v)));
if(k==='arm'){B('💪 Bend the arm',()=>bend(S.a.ang+.6));B('Straighten the arm',()=>bend(S.a.ang-.6))}
if(k==='sort'&&S.s.k<6)['Bone','Muscle'].forEach((t,i)=>B(`${FACT[S.s.k][0]}: ${t}`,()=>sortTo(i)))}
const steps=[
{h:'No bones, no shape',p:'Tap the body, or the button, to take the bones out. Then put them back.',
predict:{q:'With no bones inside, what would your body be like?',opts:['Just the same','Floppy, like jelly'],ans:1},task:'Take the bones out, then put them back',
show:()=>auto(0,[()=>flop(true),()=>flop(false)],900),
go:()=>begin(0,'A body standing tall, with its bones showing inside.',()=>S.f.back,'Bones hold your body up and give it its shape.')},
{h:'Build a skeleton',p:'All your bones together make your skeleton. Drag each bone to where it goes, or use the buttons.',task:'Put all 5 bones in place',
show:()=>auto(1,BONES.map(b=>()=>place(b[2])),600),
go:()=>begin(1,'An empty body. First bone: the skull.',()=>S.b.k>=5,'Skull, ribcage, spine, arm bones and leg bones make your skeleton.')},
{h:'Bones keep you safe',p:'Some bones are like a helmet or a cage. Drag the bone that keeps each part safe.',
predict:{q:'Why is your skull so hard?',opts:['To help you hear','To keep your brain safe'],ans:1},task:'Keep the brain, heart and lungs safe',
show:()=>auto(2,GUARD.map(t=>()=>guard(t[2])),700),
go:()=>begin(2,'A body with the brain, heart and lungs showing. Which bone keeps the brain safe?',()=>S.g.k>=3,'The skull keeps your brain safe. The ribcage keeps your heart and lungs safe.')},
{h:'Muscles pull',p:'Muscles are joined to bones. Drag the hand up to bend the arm, then down to make it straight.',
predict:{q:'When you bend your arm, what does the muscle do to the bone?',opts:['It pushes the bone','It pulls the bone'],ans:1},task:'Bend the arm all the way, then make it straight',
show:()=>auto(3,[1,2,3,4,5,6,7,8].map(j=>()=>bend(j<5?S.a.ang+.6:S.a.ang-.6)),350),
go:()=>begin(3,'An arm, straight out, with a front muscle on top and a back muscle under it.',()=>S.a.bent&&S.a.straight,'Muscles only pull. One muscle pulls to bend your arm, and another pulls to make it straight.')},
{h:'Bone or muscle?',p:'Read each card. Drag it to Bone or Muscle.',task:'Sort all 6 cards',
show:()=>auto(4,FACT.map(f=>()=>sortTo(f[1])),550),
go:()=>begin(4,'Card 1 of 6: hard and strong. Two boxes: Bone and Muscle.',()=>S.s.k>=6,'Bones are hard and give you shape. Muscles pull to move you.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[
{q:'What do your bones do?',a:'Hold you up and give you your shape',o:[['Pump your blood','pump'],['Pull to move you','pull']]},
{q:'Which bone keeps your brain safe?',a:'The skull',o:[['The ribcage','ribs'],['The spine','spine']]},
{q:'Which bones keep your heart safe?',a:'The ribcage',o:[['The skull','skull'],['The leg bones','legs']]},
{q:'How do muscles move your bones?',a:'They pull on them',o:[['They push them','push'],['Bones move by themselves','self']]},
{q:'What is your skeleton?',a:'All your bones together',o:[['One big bone','onebone'],['Only the bones in your head','head']]},
{q:'Is your heart a bone or a muscle?',a:'A muscle',o:[['A bone','heartbone'],['Neither, it is a cage','cage']]}];
function why(t){let m='Bones hold you up. Muscles pull bones to move you.';
if(t==='pump')m='Your heart pumps blood. Bones hold you up and give you your shape.';
if(t==='pull')m='Muscles pull to move you. Bones are the hard frame they pull on.';
if(t==='ribs')m='The ribcage is in your chest. The skull goes round your brain.';
if(t==='spine')m='The spine runs down your back. Your brain is in your head, inside the skull.';
if(t==='skull')m='The skull is in your head. Your heart is in your chest, inside the ribcage.';
if(t==='legs')m='Your heart is in your chest. The ribcage keeps it safe.';
if(t==='push')m='Muscles cannot push. They pull. Another muscle pulls the other way.';
if(t==='self')m='Bones cannot move on their own. Muscles joined to them pull to move them.';
if(t==='onebone')m='Your skeleton has more than 200 bones, all joined together.';
if(t==='head')m='Your skeleton is every bone, from your skull to your toes.';
if(t==='heartbone')m='Your heart is a soft muscle that squeezes to pump blood.';
if(t==='cage')m='The ribcage is bones round your heart. The heart is a muscle.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bones and muscles lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}}).start()})})();
