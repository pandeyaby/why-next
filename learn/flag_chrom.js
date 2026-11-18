/* Flagship: how chromatography separates mixtures (ages 16–18; stationary and mobile phases, Rf values).
   Drag each dye to where its pull between paper and solvent sends it, slide a measuring line to spot centres to get
   Rf = spot distance ÷ solvent-front distance, match an unknown's spots to references by Rf (not colour), fix the faults
   in a tank set-up, and use a second solvent to tell apart two substances with the same Rf. Buttons do every action. */
(()=>{
const {C,DYES,FRONT,SPOTS,REFS,UNK,REFWHY,SETUP,SOLV,ALT,QS}=CHROMART;
const FAULTS=SETUP.map((x,i)=>x[1]?i:-1).filter(i=>i>=0),BANDS=['Near the start','Middle','Near the front'];
const f2=v=>v.toFixed(2),f1=v=>v.toFixed(1);
VIS.reg('flagchrom',c=>{let A,x,row,qbox,gen=0,qi=-1,streak=0;
const L={on:()=>{}};
const now=()=>['place','measure','match','setup','solvent','quiz'][A.step];
const z=n=>Math.round(n*Math.min(1.2,Math.max(1,A.W/380)));
function ft(n,w){x.font=`${w||700} ${z(n)}px system-ui,sans-serif`}
function say(t,px,py,n,col,w,al){ft(n,w);x.fillStyle=col;x.textAlign=al||'center';x.textBaseline='middle';x.fillText(String(t),px,py)}
function rr(px,py,w,h,f,e,lw,r){A.paint.rrect(px,py,w,h,r==null?z(9):r);if(f){x.fillStyle=f;x.fill()}if(e){x.strokeStyle=e;x.lineWidth=lw||2;x.stroke()}}
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wrapT(t,max,n,w){ft(n,w);const o=[];let ln='';String(t).split(' ').forEach(k=>{const y=ln?ln+' '+k:k;if(ln&&x.measureText(y).width>max){o.push(ln);ln=k}else ln=y});o.push(ln);return o}
function block(t,px,py,max,n,col,w){const ls=wrapT(t,max,n,w),lh=z(n*1.35);ls.forEach((s,i)=>say(s,px+max/2,py+lh*(i+.5),n,col,w));return py+ls.length*lh}
function banner(t,ok){const ls=wrapT(t,A.W-z(40),14,800),lh=z(19),h=ls.length*lh+z(12);rr(z(10),z(10),A.W-z(20),h,ok?C.okBg:'#fef9c3',ok?C.ok:'#a16207',2);ls.forEach((s,i)=>say(s,A.W/2,z(16)+lh*(i+.5),14,ok?C.ok:C.ink,800));return z(10)+h}
function feedback(){if(!L.msg)return;const ls=wrapT((L.bad?'✗ ':'✓ ')+L.msg,A.W-z(44),13,700),lh=z(18),h=ls.length*lh+z(12),py=A.H-h-z(10);
 rr(z(12),py,A.W-z(24),h,L.bad?C.badBg:'#ffffff',L.bad?C.bad:C.ok,2.5);ls.forEach((s,i)=>say(s,A.W/2,py+z(6)+lh*(i+.5),13,L.bad?C.bad:C.ink,700))}
const no=m=>{L.bad=true;L.msg=m;A.sound.miss();sync()};
const yes=m=>{L.bad=false;L.msg=m;A.sound.pop()};
/* a paper sheet: start line at the bottom, solvent front near the top; returns a mapper from Rf to y */
function sheet(px,py,w,h,lanes,front){rr(px,py,w,h,C.sheet,C.line,1.5,z(4));const y0=py+h-z(28),yf=py+z(22),toY=r=>y0-(y0-yf)*r;
 x.fillStyle=C.solv;x.fillRect(px+1,py+h-z(12),w-2,z(11));x.strokeStyle=C.pencil;x.lineWidth=1.5;x.setLineDash([]);x.beginPath();x.moveTo(px+z(6),y0);x.lineTo(px+w-z(6),y0);x.stroke();
 if(front!==false){x.strokeStyle=C.front;x.setLineDash([z(5),z(4)]);x.beginPath();x.moveTo(px+z(6),yf);x.lineTo(px+w-z(6),yf);x.stroke();x.setLineDash([]);say('solvent front',px+w/2,yf-z(10),10,C.front,800)}
 say('start line (pencil)',px+w/2,y0+z(9),9,C.pencil,700);const lw=w/lanes.length;lanes.forEach((t,k)=>say(t,px+lw*(k+.5),yf+z(12),10,C.soft,800));return{toY,y0,yf,lane:k=>px+lw*(k+.5),lw}}
function spot(cx,cy,col,r){x.fillStyle=C[col];x.globalAlpha=.85;x.beginPath();x.ellipse(cx,cy,r*1.25,r,0,0,7);x.fill();x.globalAlpha=1}
function step(total,last){L.n++;if(L.n>=total){L.won=true;L.msg=last}sync()}
/* step 0 */
function band(b){if(L.won)return;const d=DYES[L.n];if(b!==d[5])return no(b<d[5]?`${d[0]} is not held that strongly by the paper. ${d[6]}`:`${d[0]} is held more by the paper than that. ${d[6]}`);L.done.push(L.n);yes(d[6]);step(DYES.length,'Stronger pull from the stationary phase: smaller Rf. Stronger pull from the mobile phase: larger Rf.')}
/* step 1 */
function check(){if(L.won)return;const s=SPOTS[L.n],gap=Math.abs(L.d-s[1]);if(gap>.25)return no(gap<.7?'That is the edge of the spot. Measure to its centre.':`Slide the line onto the ${s[0]} spot. It reads ${f1(L.d)} cm now.`);
 L.rf.push(L.n);yes(`d = ${f1(s[1])} cm, so Rf = ${f1(s[1])} ÷ ${f1(FRONT)} = ${f2(s[1]/FRONT)}.`);L.d=.6;step(SPOTS.length,'Rf = distance moved by the spot ÷ distance moved by the solvent, both from the start line.')}
/* step 2 */
function ref(k){if(L.won)return;const r=REFS[k];if(L.pick.includes(k))return;if(!UNK.some(u=>Math.abs(u[1]-r[2])<.01))return no(REFWHY[r[0]]);L.pick.push(k);yes(`${r[0]} has Rf ${f2(r[2])}, matching a spot in U.`);
 if(L.pick.length===UNK.length){L.won=true;L.msg='U has two spots, so it is a mixture: it contains A and B.'}sync()}
/* step 3 */
function fault(i){if(L.won)return;const s=SETUP[i];if(!s[1])return no(s[2]);if(L.fixed.includes(i))return;L.fixed.push(i);yes(s[2]);if(L.fixed.length===FAULTS.length){L.won=true;L.msg='Pencil line, solvent below it, lid on: ready to run.'}sync()}
/* step 4 */
const spin=(n,r)=>{const a=[...Array(n).keys()],k=r%n;return a.slice(k).concat(a.slice(0,k))};
function decide(k){if(L.won)return;const q=SOLV[L.n],i=spin(q[1].length,L.n+1)[k];if(i)return no(q[2][i-1]);yes(L.n?'Different Rf in ethanol: P and Q are different substances.':'Run them in a second solvent, such as ethanol.');step(SOLV.length,'A match in two solvents is good evidence; a mismatch in either proves they differ.')}
function paintPlace(t,b){const w=Math.min(z(170),A.W*.44),h=b-t-z(14),px=z(14),py=t+z(8),S=sheet(px,py,w,h,DYES.map(d=>d[0]));
 const bh=(S.y0-S.yf)/3;L.bands=BANDS.map((n,k)=>{const r={x:px,y:S.y0-bh*(k+1),w,h:bh,k};x.strokeStyle='#cbd5e1';x.lineWidth=1;x.setLineDash([z(2),z(3)]);x.beginPath();x.moveTo(px+z(4),r.y);x.lineTo(px+w-z(4),r.y);x.stroke();x.setLineDash([]);return r});
 L.done.forEach(i=>{const d=DYES[i];spot(S.lane(i),S.toY(d[4]),d[1],z(7))});const s0=DYES.map((d,i)=>i).filter(i=>!L.done.includes(i));DYES.forEach((d,i)=>{if(!L.done.includes(i))spot(S.lane(i),S.y0,d[1],z(5))});
 const cx=px+w+z(12),cw=A.W-cx-z(12);if(L.won){block('Small Rf: held by the paper. Large Rf: carried by the solvent.',cx,py+z(20),cw,13,C.soft,700);L.card=null;return}
 const d=DYES[L.n],dr=L.drag,ch=z(150),bx=dr?dr.x-cw/2:cx,by=dr?dr.y-z(20):py+z(10);rr(bx,by,cw,ch,'#ffffff',C[d[1]],dr?3.5:2.5);say(d[0]+' dye',bx+cw/2,by+z(16),14,C[d[1]],900);
 [['pull of paper',d[2]],['pull of solvent',d[3]]].forEach(([n,v],k)=>{const yy=by+z(44)+k*z(42);say(n,bx+cw/2,yy,11,C.soft,700);for(let j=0;j<5;j++){x.fillStyle=j<v?C[d[1]]:'#e5e7eb';x.beginPath();x.arc(bx+cw/2+(j-2)*z(16),yy+z(16),z(6),0,7);x.fill()}});
 say('Drag onto the paper',bx+cw/2,by+ch-z(14),11,C.soft,700);L.card={x:cx,y:py+z(10),w:cw,h:ch}}
function paintMeasure(t,b){const w=Math.min(z(190),A.W*.5),h=b-t-z(14),px=z(14),py=t+z(8),S=sheet(px,py,w,h,SPOTS.map((s,i)=>'spot '+(i+1)));L.map=S;
 SPOTS.forEach((s,i)=>spot(S.lane(i),S.toY(s[1]/FRONT),s[0],z(8)));const ly=S.toY(L.d/FRONT);L.line={x:px-z(4),y:ly-z(14),w:w+z(8),h:z(28)};
 if(!L.won){x.strokeStyle=C.pick;x.lineWidth=2.5;x.beginPath();x.moveTo(px-z(4),ly);x.lineTo(px+w+z(4),ly);x.stroke();rr(px+w-z(2),ly-z(10),z(14),z(20),C.pick,null)}
 const cx=px+w+z(14),cw=A.W-cx-z(12);let yy=py+z(8);yy=block(L.won?'All three measured.':`Measure spot ${L.n+1} (${SPOTS[L.n][0]})`,cx,yy,cw,13,C.ink,800)+z(8);
 if(!L.won){rr(cx,yy,cw,z(52),C.pickBg,C.pick,2);say('d = '+f1(L.d)+' cm',cx+cw/2,yy+z(17),14,C.pick,900);say('front = '+f1(FRONT)+' cm',cx+cw/2,yy+z(37),11,C.front,800);yy+=z(62)}
 L.rf.forEach(i=>{say(`spot ${i+1}: Rf ${f2(SPOTS[i][1]/FRONT)}`,cx+cw/2,yy+z(8),12,C.ok,800);yy+=z(20)})}
function paintMatch(t,b){const lanes=['U'].concat(REFS.map(r=>r[0])),w=A.W-z(28),h=b-t-z(14),px=z(14),py=t+z(8),S=sheet(px,py,w,h,lanes);
 x.strokeStyle=C.line;x.lineWidth=1;x.setLineDash([z(3),z(3)]);UNK.forEach(u=>{const yy=S.toY(u[1]);x.beginPath();x.moveTo(px+z(6),yy);x.lineTo(px+w-z(6),yy);x.stroke()});x.setLineDash([]);
 const tag=(v,k,col)=>{const cx=S.lane(k),cy=S.toY(v),dx=k===lanes.length-1?-z(24):z(24);spot(cx,cy,col,z(8));rr(cx+dx-z(14),cy-z(8),z(28),z(16),'#ffffff',null,0,z(4));say(f2(v),cx+dx,cy,10,C.ink,800)};
 L.lanes=REFS.map((r,k)=>({x:S.lane(k+1)-S.lw/2,y:S.yf,w:S.lw,h:S.y0-S.yf,k}));L.pick.forEach(k=>{const r=L.lanes[k];rr(r.x+z(3),r.y,r.w-z(6),r.h,C.okBg,C.ok,3)});
 UNK.forEach(u=>tag(u[1],0,u[0]));REFS.forEach((r,k)=>tag(r[2],k+1,r[1]))}
function paintSetup(t,b){const fx=i=>L.fixed.includes(i),tw=Math.min(z(150),A.W*.42),th=Math.min(z(200),b-t-z(20)),tx=z(16),ty=t+z(30);
 rr(tx,ty,tw,th,'#f8fafc',C.line,2,z(4));if(fx(2))rr(tx-z(6),ty-z(12),tw+z(12),z(12),'#94a3b8',C.line,1.5,z(3));else{x.setLineDash([z(4),z(4)]);x.strokeStyle=C.bad;x.lineWidth=1.5;x.strokeRect(tx-z(6),ty-z(12),tw+z(12),z(12));x.setLineDash([])}
 const px=tx+tw*.3,pw=tw*.4,pTop=ty+z(8),pBot=ty+th-z(6),line=pBot-z(40),lev=fx(1)?pBot-z(22):line-z(16);x.fillStyle=C.solv;x.fillRect(tx+2,lev,tw-4,ty+th-lev-2);
 rr(px,pTop,pw,pBot-pTop,'#ffffff',C.line,1.5,z(2));x.fillStyle=C.solv;x.globalAlpha=.6;x.fillRect(px+1,lev,pw-2,pBot-lev);x.globalAlpha=1;
 x.strokeStyle=fx(0)?C.pencil:C.blue;x.lineWidth=fx(0)?1.5:3;x.beginPath();x.moveTo(px+z(3),line);x.lineTo(px+pw-z(3),line);x.stroke();['red','blue','yellow'].forEach((col,k)=>spot(px+pw*(k+1)/4,line,col,z(3.5)));
 const marks=[[px+pw+z(8),line],[tx+tw-z(14),lev+z(8)],[tx+tw/2,ty-z(6)],[px+pw/4,line-z(14)],[px+z(2),pTop+z(30)]];
 L.marks=marks.map(([mx,my],i)=>{rr(mx-z(11),my-z(11),z(22),z(22),fx(i)?C.ok:'#ffffff',fx(i)?C.ok:C.ink,2,z(11));say(i+1,mx,my,11,fx(i)?'#ffffff':C.ink,900);return{x:mx-z(14),y:my-z(14),w:z(28),h:z(28),i}});
 const cx=tx+tw+z(14),cw=A.W-cx-z(12);let yy=t+z(14);L.tiles=SETUP.map((s,i)=>{const ls=wrapT((i+1)+'. '+s[0],cw-z(14),12,800),h=ls.length*z(16)+z(12),r={x:cx,y:yy,w:cw,h,i};
  rr(cx,yy,cw,h,fx(i)?C.okBg:'#ffffff',fx(i)?C.ok:C.line,2);ls.forEach((l,j)=>say(l,cx+z(7),yy+z(6)+z(16)*(j+.5),12,fx(i)?C.ok:C.ink,800,'left'));yy+=h+z(6);return r})}
function paintSolvent(t,b){const two=L.n>=1||L.won,w=two?(A.W-z(40))/2:Math.min(z(170),A.W*.5),h=Math.min(z(200),(b-t)*.52),py=t+z(8);
 [['water',z(14)],['ethanol',z(26)+w]].forEach(([s,px],k)=>{if(k&&!two)return;const S=sheet(px,py+z(14),w,h,['P','Q']);say('solvent: '+s,px+w/2,py+z(6),11,C.front,900);
  ALT[s].forEach((r,j)=>{spot(S.lane(j),S.toY(r),j?'green':'red',z(7));say(f2(r),S.lane(j)+z(20),S.toY(r),10,C.soft,800)})});
 let yy=py+h+z(26);if(L.won){block('Same Rf in one solvent is not proof. Different Rf in any solvent proves they differ.',z(16),yy,A.W-z(32),13,C.ok,800);L.opts=[];return}
 const q=SOLV[L.n];yy=block(q[0],z(16),yy,A.W-z(32),13,C.ink,800)+z(6);const ord=spin(q[1].length,L.n+1);L.opts=ord.map((i,k)=>{const ls=wrapT(q[1][i],A.W-z(52),12,800),hh=ls.length*z(16)+z(12),r={x:z(14),y:yy,w:A.W-z(28),h:hh,k};
  rr(r.x,yy,r.w,hh,'#ffffff',C.blue,2);ls.forEach((l,j)=>say(l,A.W/2,yy+z(6)+z(16)*(j+.5),12,C.blue,800));yy+=hh+z(6);return r})}
function draw(){x.fillStyle=A.col.dark?'#0b1120':C.paper;x.fillRect(0,0,A.W,A.H);x.fillStyle=C.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);x.fill();
 const m=now(),T={place:['Where will each dye end up? Drag it onto the paper.','All three dyes placed.'],measure:['Slide the line to the centre of each spot.','Rf values measured.'],match:['Tap each reference that U contains.','U identified.'],
  setup:['Tap the 3 faults in this set-up.','Set-up fixed.'],solvent:['Same Rf: same substance?','Second solvent used.'],quiz:['Chromatography challenge','']};
 const t=banner(T[m][L.won?1:0]||T[m][0],L.won),b=A.H-(L.msg?z(78):z(12));
 if(m==='place')paintPlace(t,b);if(m==='measure')paintMeasure(t,b);if(m==='match')paintMatch(t,b);if(m==='setup')paintSetup(t,b);if(m==='solvent')paintSolvent(t,b);
 if(m==='quiz')block('Rf = spot distance ÷ solvent distance. Held by the stationary phase: small Rf. Carried by the mobile phase: large Rf.',z(20),t+z(16),A.W-z(40),14,C.soft,700);feedback();A.fx.draw(x)}
function down(p){const m=now();if(L.won)return false;
 if(m==='place'&&over(p,L.card)){L.drag={x:p.x,y:p.y};A.redraw();return true}
 if(m==='measure'&&over(p,{x:L.line.x,y:L.map.yf-z(10),w:L.line.w,h:L.map.y0-L.map.yf+z(20)})){L.slide=true;move(p);return true}
 if(m==='match'){const r=(L.lanes||[]).find(q=>over(p,q));if(r){ref(r.k);return true}}
 if(m==='setup'){const r=(L.marks||[]).concat(L.tiles||[]).find(q=>over(p,q));if(r){fault(r.i);return true}}
 if(m==='solvent'){const r=(L.opts||[]).find(q=>over(p,q));if(r){decide(r.k);return true}}return false}
function move(p){if(L.drag){L.drag.x=p.x;L.drag.y=p.y;A.redraw()}if(L.slide&&L.map){const r=(L.map.y0-p.y)/(L.map.y0-L.map.yf);L.d=Math.max(0,Math.min(FRONT,Math.round(r*FRONT*10)/10));sync()}}
function up(p){if(L.slide){L.slide=false;check();return}const d=L.drag;if(!d)return;L.drag=null;const r=(L.bands||[]).find(q=>over(p,q));if(r)band(r.k);else A.redraw()}
function sync(){const m=now();let d='Challenge.';
 if(m==='place')d=L.won?'All three dyes placed.':`${DYES[L.n][0]} dye: pull of paper ${DYES[L.n][2]} of 5, pull of solvent ${DYES[L.n][3]} of 5. Near the start, middle, or near the front?`;
 if(m==='measure')d=L.won?'All three Rf values measured.':`Spot ${L.n+1}, ${SPOTS[L.n][0]}. Measuring line at ${f1(L.d)} cm from the start line. Solvent front at ${f1(FRONT)} cm.`;
 if(m==='match')d=`Unknown U has spots at Rf ${UNK.map(u=>f2(u[1])).join(' and ')}. References: ${REFS.map(r=>r[0]+' '+r[1]+' '+f2(r[2])).join(', ')}. Picked ${L.pick.map(k=>REFS[k][0]).join(', ')||'none'}.`;
 if(m==='setup')d=`Set-up: ${SETUP.map((s,i)=>(i+1)+'. '+s[0]+(L.fixed.includes(i)?' (fixed)':'')).join('; ')}.`;
 if(m==='solvent')d=L.won?'P and Q are different substances.':SOLV[L.n][0];
 const s=(L.msg?L.msg+' ':'')+d;c.say(s);A.cv.setAttribute('aria-label',s);keys();L.on()}
function keys(){if(!row)return;row.innerHTML='';const m=now(),add=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},row,t).onclick=()=>{fn();sync()}};if(L.won)return A.redraw();
 if(m==='place')BANDS.forEach((n,k)=>add(n,()=>band(k)));
 if(m==='measure'){add('Line up 0.2 cm',()=>{L.d=Math.min(FRONT,Math.round((L.d+.2)*10)/10)});add('Line down 0.2 cm',()=>{L.d=Math.max(0,Math.round((L.d-.2)*10)/10)});add('Check',check)}
 if(m==='match')REFS.forEach((r,k)=>{if(!L.pick.includes(k))add('U contains '+r[0],()=>ref(k))});
 if(m==='setup')SETUP.forEach((s,i)=>{if(!L.fixed.includes(i))add((i+1)+'. '+s[0],()=>fault(i))});
 if(m==='solvent'){const q=SOLV[L.n];spin(q[1].length,L.n+1).forEach((i,k)=>add(q[1][i],()=>decide(k)))}A.redraw()}
const met=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function wipe(){gen++;Object.assign(L,{on:()=>{},won:false,msg:'',bad:false,n:0,drag:null,slide:false,done:[],d:.6,rf:[],pick:[],fixed:[],card:null,bands:[],lanes:[],marks:[],tiles:[],opts:[]})}
const steps=[
{h:'Two phases pull on each dye',p:'The paper holds a stationary phase. The solvent is the mobile phase and moves up past it. Each dye is shared between the two. The more time it spends in the mobile phase, the further it travels.',
predict:{q:'A dye dissolves well in the solvent and is barely held by the paper. Where does it end up?',opts:['Near the start line','Near the solvent front'],ans:1},
task:'Place 3 dyes',show:()=>{steps[0].go();replay(DYES.map(d=>()=>band(d[5])),600)},go:()=>{wipe();sync();L.on=met(0,()=>L.won,'Each dye’s balance of attractions set how far it went.')}},
{h:'Measure the Rf value',p:'Rf = distance moved by the spot ÷ distance moved by the solvent front. Measure both from the start line, to the centre of the spot. Rf is always between 0 and 1.',
predict:{q:'A spot moved 3.0 cm and the solvent front 7.5 cm. Rf?',opts:['2.5','0.40'],ans:1},
task:'Measure 3 spots',show:()=>{steps[1].go();replay(SPOTS.map(s=>()=>{L.d=s[1];check()}),700)},go:()=>{wipe();sync();L.on=met(1,()=>L.won,'Same solvent and paper, so these Rf values can be compared.')}},
{h:'Identify by Rf',p:'Run an unknown next to known references on the same paper. A substance matches a reference only if the spot has the same Rf. A pure substance gives one spot; a mixture gives more.',
predict:{q:'A spot in U is red, like reference D. Is it D?',opts:['Yes, same colour','Only if the Rf matches'],ans:1},
task:'Find what U contains',show:()=>{steps[2].go();replay(UNK.map(u=>()=>ref(REFS.findIndex(r=>Math.abs(r[2]-u[1])<.01))),600)},go:()=>{wipe();sync();L.on=met(2,()=>L.won,'Matched by Rf, not by colour.')}},
{h:'Set up a fair run',p:'Draw the start line in pencil, keep the solvent below it, and put a lid on so the air stays full of solvent vapour. Two parts of this set-up are right and three are faults.',
task:'Fix 3 faults',show:()=>{steps[3].go();replay(FAULTS.map(i=>()=>fault(i)),600)},go:()=>{wipe();sync();L.on=met(3,()=>L.won,'Now the run is fair.')}},
{h:'One Rf is not proof',p:'Rf depends on the solvent and the stationary phase. Two different substances can share an Rf in one solvent, so run them in a second solvent before you call them the same.',
task:'Test P and Q',show:()=>{steps[4].go();replay([()=>decide(spin(3,1).indexOf(0)),()=>decide(spin(3,2).indexOf(0))],800)},go:()=>{wipe();sync();L.on=met(4,()=>L.won,'Two solvents told them apart.')}},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>L.on()});
function next(){qi++;const [q,ok,bad]=QS[qi%QS.length],all=[[ok,'ok']].concat(bad),k=qi%all.length,ord=all.slice(k).concat(all.slice(0,k));
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=qbox.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>score(tag,ok)});c.say('Challenge: '+q);A.cv.setAttribute('aria-label','Challenge: '+q);A.redraw()}
function score(tag,ok){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=tag==='ok';let m='Think about how the substance shares itself between the stationary and mobile phases.';
 if(tag==='flip')m='Rf is the spot distance divided by the solvent distance, not the other way round: 3.6 ÷ 9.0 = 0.40.';
 if(tag==='base')m='Measure both distances from the start line, not from the paper’s edge: 3.6 ÷ 9.0 = 0.40.';
 if(tag==='count')m='One spot in every solvent points to one substance, not three.';
 if(tag==='same')m='Rf changes with the solvent. What stays the same is that there is only one spot.';
 if(tag==='why')m='The reason is chemistry: ink dissolves and runs with the samples, but graphite is insoluble.';
 if(tag==='flip2')m='A high Rf means it is carried by the mobile phase. The low-Rf dye, Y, is held by the stationary phase.';
 if(tag==='size')m='Rf depends on the balance of attractions to the two phases, not on how big the spot is.';
 if(tag==='big')m='No substance can outrun the solvent that carries it, so Rf is at most 1. A distance was measured wrongly.';
 if(tag==='see')m='Colourless spots need a locating agent (ninhydrin for amino acids) or a UV lamp on a TLC plate.';
 if(tag==='level')m='Solvent above the start line dissolves the samples straight into the pool, so they never climb the paper.';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:B=>{qbox.hidden=B.step!==5;row.hidden=B.step===5;keys()},
 init:B=>{A=B;x=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Chromatography lab buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
