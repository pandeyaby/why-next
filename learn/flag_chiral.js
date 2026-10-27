/* Flagship – chiral carbon atoms (ages 17–18): tap the carbon with four different groups in real molecules, build a
centre and break its chirality with one change, turn a 3D mirror image and fail to superimpose it, swap two groups to
make the other enantiomer, and mix enantiomers in a polarimeter until the rotation cancels. */
(()=>{
const MOLS=[{n:'Butan-2-ol',ch:['CH₃','CH','CH₂','CH₃'],sub:{1:'OH'},gr:[['H','H','H','C₃H₆OH'],['H','OH','CH₃','C₂H₅'],['H','H','CH₃','CH(OH)CH₃'],['H','H','H','C₃H₆OH']],c:1},
{n:'Propan-2-ol',ch:['CH₃','CH','CH₃'],sub:{1:'OH'},gr:[['H','H','H','CH(OH)CH₃'],['H','OH','CH₃','CH₃'],['H','H','H','CH(OH)CH₃']],c:-1},
{n:'Lactic acid',ch:['CH₃','CH','COOH'],sub:{1:'OH'},gr:[['H','H','H','CH(OH)COOH'],['H','OH','CH₃','COOH'],['=O','OH','CH(OH)CH₃']],c:1},
{n:'Pentan-3-ol',ch:['CH₃','CH₂','CH','CH₂','CH₃'],sub:{2:'OH'},gr:[['H','H','H','C₄H₈OH'],['H','H','CH₃','CH(OH)C₂H₅'],['H','OH','C₂H₅','C₂H₅'],['H','H','CH₃','CH(OH)C₂H₅'],['H','H','H','C₄H₈OH']],c:-1}];
const G=['H','OH','CH₃','C₂H₅'],CYC=['H','OH','CH₃','Cl','C₂H₅'],SLOT=['top','left','right','bottom'];
// tetrahedron: 0 up, 1 front-left, 2 front-right, 3 back
const V=[[0,1,0],[-.816,-.333,.471],[.816,-.333,.471],[0,-.333,-.943]];
const nrm=v=>{const l=Math.hypot(...v);return v.map(x=>x/l)};
const rot=(u,a,v)=>{const[c,s]=[Math.cos(a),Math.sin(a)],d=u[0]*v[0]+u[1]*v[1]+u[2]*v[2],x=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];return v.map((q,i)=>q*c+x[i]*s+u[i]*d*(1-c))};
const AX={T:[[0,1,0],2*Math.PI/3],F:[nrm([0,1.333,-.943]),Math.PI]};
const perm=k=>V.map(v=>{const w=rot(AX[k][0],AX[k][1],v);let b=0,e=9;V.forEach((q,j)=>{const d=Math.hypot(q[0]-w[0],q[1]-w[1],q[2]-w[2]);if(d<e){e=d;b=j}});return b});
const PM={T:perm('T'),F:perm('F')},turnArr=(m,k)=>{const o=[];m.forEach((g,i)=>o[PM[k][i]]=g);return o};
const fits=m=>m.filter((g,i)=>g===G[i]).length,key=m=>m.join('|');
function route(m){const seen={[key(m)]:''},Q=[m];while(Q.length){const s=Q.shift();if(fits(s)===4)return seen[key(s)];for(const k of'TF'){const t=turnArr(s,k);if(seen[key(t)]==null){seen[key(t)]=seen[key(s)]+k;Q.push(t)}}}return''}
function judge(g){if(g.length<4)return'only three groups: the C=O double bond counts as one, so it is not chiral.';
const d=g.find((x,i)=>g.indexOf(x)!==i);return d?`two groups are the same (${d} and ${d}), so it is not chiral.`:'four different groups, so it is chiral!'}
VIS.reg('flagchiral',c=>{let A,ctl,quiz;
const st={mi:0,pick:null,hit:[],slots:['H','H','OH','CH₃'],was:0,m:[],an:null,tried:{},best:0,sel:null,f:1,vis:{},gen:0,hook:()=>{}};
const part=()=>['spot','build','mirror','swap','light','quiz'][A.step];
const col=()=>A.col,px=v=>Math.round(v*(A.narrow?1.1:1.32));
function say(m){c.say(m);if(A)A.cv.setAttribute('aria-label',m)}
function write(g,s,x,y,size,o){o=o||{};g.font=`${o.w||700} ${px(size)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||col().tx;g.fillText(s,x,y)}
function box(g,x,y,w,h,stroke,fa,lw){g.fillStyle=col().pn;A.paint.rrect(x,y,w,h,10);g.fill();g.fillStyle=A.alpha(stroke,fa);A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=stroke;g.stroke()}
const gc=t=>({H:col().tx,OH:col().rd,'CH₃':col().cy,'C₂H₅':col().or,Cl:col().gr}[t]||col().vi);
// 1: spot the chiral carbon
const cell=i=>{const M=MOLS[st.mi],n=M.ch.length,w=Math.min(A.W*.92/n-8,px(74)),h=px(34),x0=A.W/2-(n*(w+8)-8)/2;return{x:x0+i*(w+8),y:A.H*.42,w,h}};
function paintSpot(g){const M=MOLS[st.mi];write(g,`${M.n} · molecule ${st.mi+1} of 4`,A.W/2,A.H*.08,11,{w:800});
M.ch.forEach((t,i)=>{const b=cell(i),p=st.pick===i;if(i){g.strokeStyle=col().tx;g.lineWidth=2;g.beginPath();g.moveTo(b.x-8,b.y+b.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()}
if(M.sub[i]){g.beginPath();g.moveTo(b.x+b.w/2,b.y);g.lineTo(b.x+b.w/2,b.y-px(22));g.stroke();write(g,M.sub[i],b.x+b.w/2,b.y-px(32),11,{c:col().tx})}
box(g,b.x,b.y,b.w,b.h,p?(i===M.c?col().gr:col().rd):col().vi,p?.22:.1,p?3.5:2);write(g,t,b.x+b.w/2,b.y+b.h/2,11)});
if(st.pick!=null){const gs=M.gr[st.pick];write(g,'Groups: '+gs.join(', '),A.W/2,A.H*.68,10,{w:800});write(g,'Carbon '+(st.pick+1)+': '+judge(gs).split(',')[0],A.W/2,A.H*.79,9,{w:600})}
else write(g,'Tap a carbon, or “None here”',A.W/2,A.H*.72,10,{w:600})}
// 2: build a centre
const slotB=i=>{const cx=A.W/2,cy=A.H*.47,d=Math.min(A.W*.3,A.H*.3),w=px(64),h=px(34),o=[[0,-d],[-d*1.3,0],[d*1.3,0],[0,d]][i];return{x:cx+o[0]-w/2,y:cy+o[1]-h/2,w,h}};
const diff=()=>new Set(st.slots).size;
function paintBuild(g){const cx=A.W/2,cy=A.H*.47;g.strokeStyle=col().tx;g.lineWidth=2.5;
st.slots.forEach((t,i)=>{const b=slotB(i);g.beginPath();g.moveTo(cx,cy);g.lineTo(b.x+b.w/2,b.y+b.h/2);g.stroke()});
A.paint.ball(cx,cy,px(18),'#475569');write(g,'C',cx,cy,13,{c:'#fff'});
st.slots.forEach((t,i)=>{const b=slotB(i);box(g,b.x,b.y,b.w,b.h,gc(t),.16,2.5);write(g,t,b.x+b.w/2,b.y+b.h/2,12)});
const k=diff();write(g,`Different groups: ${k} of 4 · ${k===4?'chiral ✓':'not chiral'}`,A.W/2,A.H*.93,11,{w:800,c:k===4?col().gr:col().tx});write(g,'Tap a group to change it',A.W/2,A.H*.06,9,{w:600})}
// 3 and 4: 3D mirror
const TL=-.44,view=v=>[v[0],v[1]*Math.cos(TL)-v[2]*Math.sin(TL),v[1]*Math.sin(TL)+v[2]*Math.cos(TL)];
function mol3(g,cx,cy,s,m,R,mine){const P=V.map(v=>view(R?R(v):v)),ord=[0,1,2,3].sort((a,b)=>P[a][2]-P[b][2]);
const atom=i=>{const p=P[i],x=cx+p[0]*s,y=cy-p[1]*s,r=s*.27*(1+p[2]*.12),t=m[i];
if(p[2]>.3){const a=Math.atan2(y-cy,x-cx),w=s*.09;g.fillStyle=col().tx;g.beginPath();g.moveTo(cx,cy);g.lineTo(x+Math.sin(a)*w,y-Math.cos(a)*w);g.lineTo(x-Math.sin(a)*w,y+Math.cos(a)*w);g.fill()}
else{g.strokeStyle=col().tx;g.lineWidth=2.5;if(p[2]<-.5)g.setLineDash([4,4]);g.beginPath();g.moveTo(cx,cy);g.lineTo(x,y);g.stroke();g.setLineDash([])}
const ok=mine&&!st.an&&t===G[i];g.fillStyle=A.mix(col().pn,gc(t),.28);g.beginPath();g.arc(x,y,r,0,7);g.fill();g.lineWidth=ok||st.sel===i&&mine?4:2;g.strokeStyle=st.sel===i&&mine?col().am:ok?col().gr:gc(t);g.stroke();
write(g,t,x,y,t.length>2?8:10);if(mine)st.hit.push({x,y,r:r+8,i})};
ord.filter(i=>P[i][2]<=0).forEach(atom);A.paint.ball(cx,cy,s*.16,'#475569');write(g,'C',cx,cy,9,{c:'#fff'});ord.filter(i=>P[i][2]>0).forEach(atom)}
function paintMirror(g){const s=Math.min(A.W*.17,A.H*.3);st.hit=[];
write(g,'Molecule',A.W*.25,A.H*.07,10,{w:800});write(g,'Mirror image · drag to turn',A.W*.75,A.H*.07,10,{w:800});
g.strokeStyle=A.alpha(col().cy,.7);g.setLineDash([6,6]);g.lineWidth=2;g.beginPath();g.moveTo(A.W/2,A.H*.13);g.lineTo(A.W/2,A.H*.82);g.stroke();g.setLineDash([]);
mol3(g,A.W*.25,A.H*.47,s,G);const a=st.an;mol3(g,A.W*.75,A.H*.47,s,st.m,a?v=>rot(AX[a.k][0],AX[a.k][1]*a.t,v):null,1);
const f=fits(st.m);write(g,`Lined up: ${a?'…':f} of 4`+(part()==='mirror'?` · ${Object.keys(st.tried).length} turns tried`:''),A.W/2,A.H*.92,11,{w:800,c:f===4&&!a?col().gr:col().tx})}
// 5: polarimeter
function paintLight(g){const y=A.H*.36,x0=A.W*.04,x1=A.W*.96,tb={x:A.W*.3,y:y-A.H*.13,w:A.W*.4,h:A.H*.26},ang=24*(2*st.f-1);
g.fillStyle=A.alpha(col().am,.5);g.fillRect(x0,y-3,x1-x0,6);box(g,tb.x,tb.y,tb.w,tb.h,col().cy,.08,2);
for(let i=0;i<20;i++){g.fillStyle=(i*13%20)/20<st.f?col().or:col().vi;g.beginPath();g.arc(tb.x+14+(i%5)/4*(tb.w-28)+(i%2?6:-6),tb.y+14+Math.floor(i/5)/3*(tb.h-28),px(4),0,7);g.fill()}
const arrow=(x,a,lab)=>{const r=A.H*.14,dx=Math.sin(a*Math.PI/180)*r,dy=Math.cos(a*Math.PI/180)*r;g.strokeStyle=col().tx;g.lineWidth=4;g.beginPath();g.moveTo(x-dx,y+dy);g.lineTo(x+dx,y-dy);g.stroke();write(g,lab,x,y+A.H*.22,9,{w:800})};
arrow(A.W*.15,0,'Light in');arrow(A.W*.85,ang,ang?`${Math.abs(ang)}° ${ang>0?'clockwise':'anticlockwise'}`:'No rotation');
const sb=bar();box(g,sb.x,sb.y,sb.w,sb.h,A.alpha(col().tx,.6),.05,1.5);g.fillStyle=A.alpha(col().or,.5);A.paint.rrect(sb.x+2,sb.y+2,(sb.w-4)*st.f,sb.h-4,8);g.fill();
const kx=sb.x+sb.w*st.f;g.fillStyle=col().am;g.beginPath();g.arc(kx,sb.y+sb.h/2,sb.h*.62,0,7);g.fill();
write(g,`(+) ${Math.round(st.f*100)}% · (−) ${Math.round(100-st.f*100)}%`,A.W/2,sb.y-px(12),10,{w:800});[['(+) form',col().or,.3],['(−) form',col().vi,.62]].forEach(([t,k,x])=>{g.fillStyle=k;g.beginPath();g.arc(A.W*x-px(34),A.H*.06,px(5),0,7);g.fill();write(g,t,A.W*x,A.H*.06,9)})}
const bar=()=>({x:A.W*.1,y:A.H*.84,w:A.W*.8,h:px(16)});
function draw(A){const g=A.ctx;g.fillStyle=A.mix(col().pn,'#ede9fe',col().dark?.05:.3);g.fillRect(0,0,A.W,A.H);const p=part();
if(p==='spot')paintSpot(g);if(p==='build')paintBuild(g);if(p==='mirror'||p==='swap')paintMirror(g);if(p==='light')paintLight(g);
if(p==='quiz'){write(g,'🫱 ⟷ 🫲',A.W/2,A.H*.42,28,{w:400});write(g,'Mirror images that never fit',A.W/2,A.H*.66,12)}A.fx.draw(g)}

// actions
function pick(i){const M=MOLS[st.mi];if(st.fin||st.lock)return;st.pick=i<0?null:i;const ok=i===M.c;
if(!ok){A.sound.miss();update(i<0?`Look again: one carbon in ${M.n} has four different groups.`:`Not this one. Carbon ${i+1} has ${judge(M.gr[i])}`);return}
st.lock=1;A.sound.pop();update(i<0?`Right: no carbon in ${M.n} has four different groups.`:`Yes! Carbon ${i+1} has ${judge(M.gr[i])}`);const g=st.gen;
setTimeout(()=>{if(g!==st.gen)return;st.lock=0;st.mi++;st.pick=null;if(st.mi>=4){st.mi=3;st.fin=1}update()},A.reduced()?30:900)}
function cyc(i){st.slots[i]=CYC[(CYC.indexOf(st.slots[i])+1)%CYC.length];if(diff()===4)st.was=1;else if(st.was)st.broke=1;A.sound.tick();
update(diff()===4?'Four different groups: a chiral carbon.':st.broke?'One change made two groups the same, so it is no longer chiral.':'Two groups are the same, so it is not chiral.')}
function turn(k){if(st.an){const a=st.an;st.an=null;st.m=turnArr(st.m,a.k);st.tried[key(st.m)]=1}const o={k,t:0};st.an=o;A.sound.tick();
A.tween(o,{t:1},380,'io',()=>{if(st.an!==o)return;st.an=null;st.m=turnArr(st.m,k);st.tried[key(st.m)]=1;st.best=Math.max(st.best,fits(st.m));update()})}
function swap(i,j){if(st.an)return;const m=st.m.slice();[m[i],m[j]]=[m[j],m[i]];st.m=m;st.sel=null;st.sw=(st.sw||0)+1;A.sound.pop();update(`Swapped ${m[j]} and ${m[i]}. Now turn it to test the fit.`)}
function setF(f){st.f=Math.max(0,Math.min(1,Math.round(f*20)/20));const p=Math.round(st.f*100);st.vis[p]=1;
update(p===50?'50:50 racemic mix: the two rotations cancel.':p===100||!p?'Pure enantiomer: full rotation.':'')}
function update(msg){const p=part();let s='';
if(p==='spot')s=st.fin?'All four molecules judged.':`${MOLS[st.mi].n}: carbons ${MOLS[st.mi].ch.join(', ')}.`;
else if(p==='build')s=`Groups on the carbon: ${st.slots.join(', ')}.`;
else if(p==='mirror'||p==='swap')s=`Mirror image groups top, front left, front right, back: ${st.m.join(', ')}. ${fits(st.m)} of 4 line up with the molecule.`;
else if(p==='light')s=`${Math.round(st.f*100)}% (+) form. Rotation ${Math.round(24*(2*st.f-1))} degrees.`;
say((msg?msg+' ':'')+s);buttons();st.hook()}
function buttons(){if(!A||!ctl)return;ctl.innerHTML='';const p=part(),mk=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
if(p==='spot'&&!st.fin){MOLS[st.mi].ch.forEach((t,i)=>mk(`C${i+1} ${t}`,()=>pick(i),`Carbon ${i+1}, ${t}`));mk('🚫 None here',()=>pick(-1))}
if(p==='build')st.slots.forEach((t,i)=>mk(`${SLOT[i]}: ${t}`,()=>cyc(i),`Change the ${SLOT[i]} group, now ${t}`));
if(p==='mirror'||p==='swap'){mk('↻ Turn 120°',()=>turn('T'),'Turn the mirror image 120 degrees about its top bond');mk('⤾ Flip 180°',()=>turn('F'),'Flip the mirror image 180 degrees')}
if(p==='swap')mk('⇄ Swap front two',()=>swap(1,2),'Swap the two front groups');
if(p==='light'){mk('More (+)',()=>setF(st.f+.25));mk('More (−)',()=>setF(st.f-.25));mk('50:50',()=>setF(.5))}
A.redraw()}

// pointer
function down(q){const p=part();st.from=q;
if(p==='spot'){const i=MOLS[st.mi].ch.findIndex((t,i)=>{const b=cell(i);return q.x>=b.x&&q.x<=b.x+b.w&&q.y>=b.y-px(40)&&q.y<=b.y+b.h});if(i>=0&&!st.fin)pick(i);return false}
if(p==='build'){const i=[0,1,2,3].find(i=>{const b=slotB(i);return q.x>=b.x-6&&q.x<=b.x+b.w+6&&q.y>=b.y-6&&q.y<=b.y+b.h+6});if(i!=null)cyc(i);return false}
if(p==='mirror'||p==='swap')return q.x>A.W/2;
if(p==='light'){const b=bar();if(q.y>b.y-px(24)){st.slide=1;setF((q.x-b.x)/b.w);return true}}return false}
function move(q){if(part()==='light'&&st.slide){const b=bar();setF((q.x-b.x)/b.w)}}
function up(q){const p=part(),f=st.from;st.slide=0;if(!f||(p!=='mirror'&&p!=='swap'))return;const dx=q.x-f.x,dy=q.y-f.y;
if(Math.hypot(dx,dy)>25){turn(Math.abs(dx)>Math.abs(dy)?'T':'F');return}
if(p==='swap'){const h=st.hit.find(h=>Math.hypot(q.x-h.x,q.y-h.y)<h.r);if(!h)return;if(st.sel==null){st.sel=h.i;A.sound.tick();update('Now tap a second group to swap with it.')}else if(st.sel===h.i){st.sel=null;A.redraw()}else swap(st.sel,h.i)}}

// steps
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const g=st.gen;fns.forEach((f,j)=>setTimeout(()=>{if(g===st.gen)f()},A.reduced()?j*30+30:(j+1)*ms))};
const wipe=()=>{st.gen++;st.hook=()=>{};st.an=null;Object.assign(st,{mi:0,pick:null,fin:0,lock:0,slots:['H','H','OH','CH₃'],was:0,broke:0,m:[],tried:{},best:0,sel:null,sw:0,f:1,vis:{},slide:0})};
const mirror0=()=>{const m=G.slice();[m[1],m[2]]=[m[2],m[1]];return m};
const steps=[
{h:'Spot the chiral carbon',p:'A chiral carbon has four different groups attached. Tap the chiral carbon in each molecule, or say there is none.',
predict:{q:'Propan-2-ol, CH₃CH(OH)CH₃, has a carbon with an OH. Is that carbon chiral?',opts:['Yes, it has an OH','No'],ans:1},task:'Judge 4 molecules',
show:()=>{steps[0].go();play([()=>pick(1),()=>{},()=>pick(-1),()=>{},()=>pick(1),()=>{},()=>pick(-1)],500)},go:()=>{wipe();update();st.hook=check(0,()=>st.fin,'Butan-2-ol and lactic acid have one chiral carbon. Propan-2-ol and pentan-3-ol have two identical groups on the middle carbon.')}},
{h:'One change breaks it',p:'Tap the groups to change them. Make this carbon chiral, then make it not chiral with one change.',task:'Make it chiral, then break it',
show:()=>{steps[1].go();play([()=>cyc(1),()=>cyc(1),()=>cyc(1),()=>cyc(1),()=>cyc(1)],450)},go:()=>{wipe();update();st.hook=check(1,()=>st.broke,'Chirality needs all four different. Make any two match and it is gone.')}},
{h:'Try to superimpose',p:'Butan-2-ol and its mirror image. Turn the mirror image any way you like. Can every group line up?',
predict:{q:'Can you turn the mirror image so it sits exactly on the molecule?',opts:['Yes, with the right turn','No, never'],ans:1},task:'Try 6 different turns',
show:()=>{steps[2].go();play('TTFTTF'.split('').map(k=>()=>turn(k)),520)},go:()=>{wipe();st.m=mirror0();st.tried={[key(st.m)]:1};update();st.hook=check(2,()=>Object.keys(st.tried).length>=6,'At best 2 of 4 groups line up. Non-superimposable mirror images are enantiomers.')}},
{h:'Swap two groups',p:'Tap two groups on the mirror image to swap them, then turn it again.',
predict:{q:'After swapping two groups, can the mirror image be turned to fit the molecule?',opts:['Yes, now it fits','No, still never'],ans:0},task:'Swap two groups, then line up 4 of 4',
show:()=>{steps[3].go();play([()=>swap(1,2)],300);setTimeout(()=>{const g=st.gen;play(route(st.m).split('').map(k=>()=>{if(g===st.gen)turn(k)}),520)},A.reduced()?60:400)},
go:()=>{wipe();st.m=turnArr(mirror0(),'T');update();st.hook=check(3,()=>st.sw&&!st.an&&fits(st.m)===4,'Swapping any two groups turns one enantiomer into the other.')}},
{h:'Rotating light',p:'Enantiomers rotate plane-polarised light by the same angle in opposite directions. Mix them and watch the light that comes out.',
predict:{q:'A 50:50 mix of the two enantiomers. What happens to the light?',opts:['Rotates clockwise','Rotates anticlockwise','No rotation'],ans:2},task:'Try pure (+), pure (−) and 50:50',
show:()=>{steps[4].go();play([()=>setF(1),()=>setF(.75),()=>setF(.5),()=>setF(.25),()=>setF(0),()=>setF(.5)],420)},go:()=>{wipe();st.vis={100:1};update();st.hook=check(4,()=>st.vis[100]&&st.vis[0]&&st.vis[50],'Pure forms rotate 24° each way. A racemic 50:50 mix cancels to 0°.')}},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.hook()});

// challenge
const QS=[['Which molecule has a chiral carbon?','🧪',[['CH₃CHClCH₂CH₃','ok'],['CH₃CH₂CH₂CH₂Cl','end'],['CH₃CHClCH₃','same']]],
['Pentan-3-ol, CH₃CH₂CH(OH)CH₂CH₃: is C3 chiral?','🔎',[['No, it has two ethyl groups','ok'],['Yes, it has four different atoms next to it','atoms'],['Yes, any C with OH is chiral','oh']]],
['What does a racemic mixture do to plane-polarised light?','💡',[['Nothing: the rotations cancel','ok'],['Rotates it twice as far','mix'],['Rotates it clockwise','mix']]],
['Two enantiomers differ in…','🫱',[['the direction they rotate plane-polarised light','ok'],['their boiling points','phys'],['their molecular formula','formula']]],
['You swap two groups on a chiral carbon. You get…','⇄',[['the other enantiomer','ok'],['the same molecule','swap'],['a molecule that is not chiral','swap']]],
['How many chiral carbons in alanine, CH₃CH(NH₂)COOH?','🧬',[['1','ok'],['2','cooh'],['0','same']]],
['(R)-carvone smells of spearmint, (S)-carvone of caraway. Why?','🌿',[['Smell receptors are chiral, so each fits differently','ok'],['They have different formulas','formula'],['One boils at a lower temperature','phys']]]];
function slip(t){let m='Check each carbon for four different groups.';
if(t==='end')m='An end CH₂Cl carbon has two H atoms, so it cannot be chiral. Look at the carbon carrying Cl in the middle.';
if(t==='same')m='Two identical groups (like two CH₃) stop a carbon being chiral.';
if(t==='atoms')m='Compare whole groups, not just the attached atom. Both ethyl groups are identical, so C3 is not chiral.';
if(t==='oh')m='An OH alone is not enough. All four groups must differ.';
if(t==='mix')m='Equal amounts rotate light equally in opposite directions, so the net rotation is zero.';
if(t==='phys')m='Enantiomers have identical boiling points and most physical properties. They differ with plane-polarised light and chiral things.';
if(t==='formula')m='Enantiomers are stereoisomers: same formula, same bonds, different 3D arrangement.';
if(t==='swap')m='Swapping two groups makes the mirror image: the other enantiomer, still chiral.';
if(t==='cooh')m='The COOH carbon has a C=O double bond, so only three groups. Only the CH carbon is chiral.';return m}
let qi=-1,streak=0;
function next(){qi++;const[q,e,ops]=QS[qi%QS.length],r=qi%3;
quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});say('Challenge: '+q);A.redraw()}
function score(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct! Streak: '+streak+'.':'✗ '+slip(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}

A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
wipe();A.gest({down,move,up});buttons()}});
A.start()})})();
