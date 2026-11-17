/* Flagship: decimals to three places (ages 9–10). Pour thousandths of a litre into a jug from a place-value chart, slide
   a number until the decimal points line up, add three measurements column by column with exchanges, count on along an
   empty number line to fill a tank, find pairs of decimals that make exactly 1, then a challenge. Rounds, slips and
   screen-reader text are in dec3_art.js; every amount is held in whole thousandths. */
(()=>{
const {f3,JUG,LINE,SUM,COLS,PICK,TANK,CARDS,PAIRS,pairWhy,QZ,WHY,H}=D3ART;
const K={ink:'#111827',mute:'#374151',page:'#fefce8',line:'#1f2937',yes:'#166534',yesBg:'#dcfce7',err:'#9f1239',tip:'#e0e7ff',water:'#60a5fa',waterEdge:'#1d4ed8',col:'#ede9fe',pick:'#6d28d9',chip:'#ffffff',warm:'#c2410c',grid:'#cbd5e1'};
VIS.reg('flagdec3',c=>{let A,X,pad,box,qn=-1,gen=0;const D={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.15));
const voice=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function label(s,x,y,size,col,weight,align){X.font=`${weight||700} ${z(size)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=align||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function fold(s,w,size){X.font=`700 ${z(size)}px system-ui,sans-serif`;const rows=[];let row='';for(const piece of String(s).split(' ')){const next=row?row+' '+piece:piece;if(row&&X.measureText(next).width>w){rows.push(row);row=piece}else row=next}rows.push(row);return rows}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r||8);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const part=()=>['jug','line','sum','tank','pairs','quiz'][A.step];
function top(s,ok){const R=fold(s,A.W-44,14),lh=z(14)+4,h=Math.max(z(36),R.length*lh+14);panel(12,10,A.W-24,h,ok?K.yesBg:K.tip,ok?K.yes:K.line);R.forEach((r,i)=>label(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?K.yes:K.ink));return 10+h}
function foot(){if(!D.msg)return;const R=fold((D.bad?'✗ ':'✓ ')+D.msg,A.W-48,13),lh=z(13)+5,h=R.length*lh+12,y=A.H-h-10;panel(12,y,A.W-24,h,'#ffffff',D.bad?K.err:K.yes,3);R.forEach((r,i)=>label(r,A.W/2,y+6+lh*(i+.5),13,D.bad?K.err:K.ink))}
const oops=m=>{D.bad=true;D.msg=m;A.sound.miss();sync()};
const nice=m=>{D.bad=false;D.msg=m;A.sound.pop()};
/* step: pour thousandths of a litre */
function drawJug(t0,b0){const [goal]=JUG[Math.min(D.r,1)],jx=z(18),jw=Math.min(A.W*.28,z(120)),jy=t0+z(14),jh=b0-jy-z(16);
 panel(jx,jy,jw,jh,'#ffffff',K.line,2.5,6);const fh=jh*D.v/1000;X.fillStyle=K.water;X.fillRect(jx+2,jy+jh-fh,jw-4,fh);
 for(let k=1;k<10;k++){const y=jy+jh-jh*k/10;X.strokeStyle=K.line;X.lineWidth=1.5;X.beginPath();X.moveTo(jx+jw-z(12),y);X.lineTo(jx+jw,y);X.stroke();if(k%2===0)label('0.'+k,jx+jw-z(16),y,9,K.ink,800,'right')}
 const gy=jy+jh-jh*goal/1000;X.setLineDash([5,4]);X.strokeStyle=K.warm;X.lineWidth=2.5;X.beginPath();X.moveTo(jx-z(6),gy);X.lineTo(jx+jw+z(8),gy);X.stroke();X.setLineDash([]);label('1 l',jx+jw/2,jy-z(8),10,K.mute,800);
 const cx0=jx+jw+z(22),cw=(A.W-z(14)-cx0)/4,hy=t0+z(16),dy=hy+z(116);label(`Goal: ${f3(goal)} l`,cx0+2*cw,hy,13,K.warm,900);
 ['1','0.1','0.01','0.001'].forEach((v,i)=>{const x=cx0+i*cw+cw/2;label(v,x,hy+z(22),11,K.ink,900);if(!A.narrow)label(['ones','tenths','hundredths','thousandths'][i],x,hy+z(38),10,K.mute,800)});
 const d=[0,Math.floor(D.v/100),Math.floor(D.v/10)%10,D.v%10];D.ups=[];D.downs=[];
 d.forEach((n,i)=>{const x=cx0+i*cw;if(i){const up={x:x+3,y:dy-z(66),w:cw-6,h:z(40),i},dn={x:x+3,y:dy+z(26),w:cw-6,h:z(40),i};D.ups.push(up);D.downs.push(dn);
   [up,dn].forEach((r,j)=>{panel(r.x,r.y,r.w,r.h,K.col,K.pick,2);label(j?'▼':'▲',r.x+r.w/2,r.y+r.h/2,15,K.pick,900)})}
  panel(x+3,dy-z(20),cw-6,z(40),'#ffffff',K.line,2);label(n,x+cw/2,dy,20,K.ink,900)});
 label('.',cx0+cw,dy+z(4),24,K.ink,900);
 label(`= ${f3(D.v)} l = ${D.v} ml`,cx0+2*cw,dy+z(88),14,K.ink,900);if(A.narrow)fold('0.1 is a tenth, 0.01 a hundredth, 0.001 a thousandth',A.W-cx0-z(10),10).forEach((ln,j)=>label(ln,cx0+2*cw,dy+z(112)+j*z(14),10,K.mute,800))}
function setV(v,check){if(D.won)return;D.v=Math.max(0,Math.min(999,v));if(!check)return A.redraw();const [goal,slips]=JUG[D.r];
 if(D.v===goal){A.sound.tick();D.r++;if(D.r>=2){D.won=true;D.r=1;D.msg='0.208 l = 2 tenths + 0 hundredths + 8 thousandths = 208 ml. The 0 holds the hundredths place.';return sync()}
  nice(`${f3(goal)} l = 3 tenths + 7 hundredths + 5 thousandths = 375 ml. Now pour 0.208 l.`);D.v=0;return sync()}
 if(slips[D.v])return oops(slips[D.v]);D.msg='';sync()}
/* step: line up the decimal points */
const digitsOf=s=>{const [w,f='']=s.split('.');return [...w].map((ch,i)=>[+ch,w.length-1-i]).concat([...f].map((ch,i)=>[+ch,-1-i]))};
const valOf=s=>Math.round(parseFloat(s)*1000);
function offRange(s){const e=digitsOf(s).map(x=>x[1]);return [Math.max(-2,Math.max(...e)-1),Math.min(2,Math.min(...e)+5)]}
function drawLine(t0,b0){const [a,b]=LINE[Math.min(D.r,1)],cw=Math.min(z(46),(A.W-z(30))/7),gx=(A.W-7*cw)/2,colX=e=>gx+(1-e)*cw+cw/2,ry=[t0+z(66),t0+z(116),t0+z(178)];D.cw=cw;
 ['T','O','t','h','th','',''].forEach((hd,k)=>{const x=gx+k*cw;X.fillStyle=k<5?'#f5f3ff':'#f8fafc';X.fillRect(x+1,t0+z(14),cw-2,ry[2]-t0+z(10));label(hd,x+cw/2,t0+z(28),12,K.mute,900)});
 const pointX=colX(0)+cw/2;X.strokeStyle=K.warm;X.lineWidth=2;X.setLineDash([3,4]);X.beginPath();X.moveTo(pointX,t0+z(40));X.lineTo(pointX,ry[2]+z(18));X.stroke();X.setLineDash([]);
 const row=(s,y,off,box)=>{const ds=digitsOf(s);if(box){const xs=ds.map(([,e])=>colX(e-off));D.card={x:Math.min(...xs)-cw/2-4,y:y-z(22),w:Math.max(...xs)-Math.min(...xs)+cw+8,h:z(44)};panel(D.card.x,D.card.y,D.card.w,D.card.h,'#ffffff',K.pick,3)}
  ds.forEach(([d,e])=>label(d,colX(e-off),y,22,K.ink,900));label('.',colX(-off)+cw/2,y+z(6),24,off?K.err:K.ink,900)};
 row(a,ry[0],0);label('+',gx-z(4),ry[1],20,K.ink,900,'right');row(b,ry[1],D.off,true);X.strokeStyle=K.line;X.lineWidth=2.5;X.beginPath();X.moveTo(gx,ry[1]+z(30));X.lineTo(gx+5*cw,ry[1]+z(30));X.stroke();
 const tot=valOf(a)+Math.round(valOf(b)*Math.pow(10,-D.off));if(D.off===0)row(f3(tot),ry[2],0);else label(`Total if added like this: ${f3(tot)}`,A.W/2,ry[2],13,K.err,900)}
function setOff(o,check){if(D.won)return;const [a,b]=LINE[D.r],[lo,hi]=offRange(b);D.off=Math.max(lo,Math.min(hi,o));if(!check)return A.redraw();
 if(D.off===0){A.sound.tick();const tot=f3(valOf(a)+valOf(b));const pad3=s=>f3(valOf(s));D.r++;
  if(D.r>=2){D.won=true;D.r=1;D.off=0;D.msg=`Points in one column: ${pad3(a)} + ${pad3(b)} = ${tot}. Writing the zeros keeps every digit in its place.`;return sync()}
  nice(`Points in one column: ${pad3(a)} + ${pad3(b)} = ${tot}. Next sum.`);D.off=-1;return sync()}
 oops(`The points are not lined up, so ${b} is being added as ${f3(Math.round(valOf(b)*Math.pow(10,-D.off)))}. Slide it ${D.off>0?'left':'right'}.`)}
/* step: column addition with exchanges */
function drawSum(t0,b0){const cw=Math.min(z(48),(A.W-z(60))/5),gx=(A.W-5*cw)/2+z(10),colX=k=>gx+k*cw+cw/2,lh=z(34),y0=t0+z(30);
 const at=[-3,-2,-1,0][D.col];['O','','t','h','th'].forEach((hd,k)=>{const ex=[0,null,-1,-2,-3][k];if(ex===at&&!D.won){X.fillStyle=K.col;X.fillRect(gx+k*cw+1,t0+z(8),cw-2,lh*4+z(30))}label(hd,colX(k),t0+z(16),12,K.mute,900)});
 const put=(s,y,col)=>{[...s].forEach((ch,k)=>label(ch,colX(k),y,21,col||K.ink,900))};
 SUM.forEach((t,i)=>put(f3(t),y0+lh*i+z(4)));label('+',gx-z(8),y0+lh*2+z(4),20,K.ink,900,'right');
 const ly=y0+lh*2+z(24);X.strokeStyle=K.line;X.lineWidth=2.5;X.beginPath();X.moveTo(gx-z(4),ly);X.lineTo(gx+5*cw,ly);X.stroke();
 const ay=ly+z(22),slots=[4,3,2,0];D.dig.forEach((d,j)=>label(d,colX(slots[j]),ay,21,K.yes,900));if(D.dig.length>=4)label('.',colX(1),ay,21,K.yes,900);
 D.ex.forEach((e,j)=>{if(e)label(e,colX(slots[j+1])+cw*.28,ay+z(20),11,K.warm,900)});
 if(D.won)return;const [opts]=PICK[D.col],r=D.col%3,ord=opts.slice(r).concat(opts.slice(0,r)),tw=(A.W-z(52))/3,ty=Math.min(b0-z(60),ay+z(62));label(`Write the ${COLS[D.col]} digit:`,A.W/2,ty-z(12),12,K.mute,800);
 D.tiles=ord.map((o,k)=>{const rr={x:z(16)+k*(tw+z(10)),y:ty,w:tw,h:z(52),o};panel(rr.x,rr.y,tw,rr.h,'#ffffff',K.pick,2.5);label(o,rr.x+tw/2,rr.y+rr.h/2,20,K.ink,900);return rr})}
function choose(o){if(D.won)return;const [opts,why]=PICK[D.col];if(o!==opts[0])return oops(why[o]);
 const place=[1,10,100,1000][D.col],tot=SUM.reduce((s,t)=>s+Math.floor(t/place)%10,0)+D.carry;D.dig.push(+o);D.carry=Math.floor(tot/10);D.ex.push(D.carry);D.col++;A.sound.tick();
 if(D.col>=4){D.won=true;D.msg='1.234 + 0.567 + 2.199 = 4.000. Each column made 10 or 20, so you wrote 0 and exchanged. 4.000 is the same as 4.';return sync()}
 nice(`Write ${o}${D.carry?` and exchange ${D.carry} into the ${COLS[D.col]}`:''}.`);sync()}
/* step: count on along an empty number line */
const STEPS=[5,20,600,2000,50,200];
function drawTank(t0,b0){const stops=[TANK.has].concat(D.jumps.reduce((a,j)=>a.concat(a[a.length-1]+j),[TANK.has]).slice(1)),n=Math.max(5,stops.length+1),x0=z(30),x1=A.W-z(34),ly=t0+(b0-t0)*.34;
 X.strokeStyle=K.line;X.lineWidth=3;X.beginPath();X.moveTo(x0-z(10),ly);X.lineTo(x1+z(14),ly);X.stroke();label('5',x1,ly+z(22),14,K.warm,900);X.fillStyle=K.warm;X.fillRect(x1-1,ly-z(16),3,z(32));label('full',x1,ly-z(24),11,K.warm,800);
 const sx=i=>x0+i*(x1-x0)/(n-1);stops.forEach((s,i)=>{const x=i&&s===TANK.full?x1:sx(i);X.fillStyle=K.ink;X.beginPath();X.arc(x,ly,z(4),0,7);X.fill();if(s!==TANK.full||!i)label(f3(s),x,ly+(i%2?z(40):z(22)),11,K.ink,900);
  if(i){const px=stops[i-1]===TANK.full?x1:sx(i-1);X.strokeStyle=K.pick;X.lineWidth=2.5;X.beginPath();X.moveTo(px,ly-3);X.quadraticCurveTo((px+x)/2,ly-z(44),x,ly-3);X.stroke();label('+'+f3(D.jumps[i-1]).replace(/0+$/,'').replace(/\.$/,''),(px+x)/2,ly-z(36),10,K.pick,900)}});
 label(`Counted on: ${f3(D.add)} l`,z(18),ly+z(66),13,K.ink,900,'left');
 const tw=(A.W-z(50))/3,th=z(42),ty=b0-2*th-z(14);D.tiles=STEPS.map((s,k)=>{const r={x:z(14)+(k%3)*(tw+z(11)),y:ty+Math.floor(k/3)*(th+z(8)),w:tw,h:th,s};panel(r.x,r.y,tw,th,'#ffffff',K.pick,2.5);label('+'+f3(s).replace(/0+$/,'').replace(/\.$/,''),r.x+tw/2,r.y+th/2,15,K.ink,900);return r});
 D.undo={x:A.W-z(84),y:ty-z(44),w:z(70),h:z(34)};if(D.jumps.length){panel(D.undo.x,D.undo.y,D.undo.w,D.undo.h,'#ffffff',K.line,2);label('Undo',D.undo.x+D.undo.w/2,D.undo.y+D.undo.h/2,12,K.ink,900)}}
function jump(s){if(D.won)return;const now=TANK.has+D.add;if(now+s>TANK.full)return oops(`From ${f3(now)}, + ${f3(s)} would reach ${f3(now+s)}: past 5, so the tank overflows. Pick a smaller jump.`);
 D.jumps.push(s);D.add+=s;A.sound.tick();const at=TANK.has+D.add;
 if(at===TANK.full){D.won=true;D.msg=`${D.jumps.map(f3).join(' + ')} = ${f3(D.add)}. So 5 − 2.375 = 2.625 l still to pour.`;return sync()}
 nice(at%100===0&&at%1000?`${f3(at)}: a whole number of tenths. Now a bigger jump.`:at%1000===0?`${f3(at)} is a whole number of litres.`:`Now at ${f3(at)} l.`);sync()}
function undo(){if(D.won||!D.jumps.length)return;D.add-=D.jumps.pop();D.msg='';sync()}
/* step: pairs that make 1 */
function drawPairs(t0,b0){const left=CARDS.filter(x=>!D.got.includes(x)),cols=4,cw=(A.W-z(28)-(cols-1)*z(8))/cols,ch=z(50);
 D.cards=left.map((v,k)=>{const r={x:z(14)+(k%cols)*(cw+z(8)),y:t0+z(14)+Math.floor(k/cols)*(ch+z(10)),w:cw,h:ch,v};const on=D.pick===v;panel(r.x,r.y,cw,ch,on?K.col:'#ffffff',on?K.pick:K.line,on?3.5:2);label(f3(v),r.x+cw/2,r.y+ch/2,A.narrow?15:17,K.ink,900);return r});
 const fy=t0+z(14)+2*(ch+z(10))+z(14);label('Pairs found',A.W/2,fy,12,K.mute,800);
 for(let i=0;i<D.got.length;i+=2)label(`${f3(D.got[i])} + ${f3(D.got[i+1])} = 1.000`,A.W/2,fy+z(24)+i/2*z(24),15,K.yes,900)}
function tapCard(v){if(D.won||D.got.includes(v))return;if(D.pick==null||D.pick===v){D.pick=D.pick===v?null:v;D.msg='';return sync()}
 const a=D.pick;D.pick=null;if(a+v!==1000)return oops(pairWhy(a,v));D.got.push(a,v);A.sound.tick();
 if(D.got.length>=6){D.won=true;D.msg='Thousandths make 10, hundredths and tenths make 9, because each exchanged 1 fills the next place. 0.09 + 0.91: 9 hundredths + 1 hundredth.';return sync()}
 nice(`${f3(a)} + ${f3(v)} = 1.000.`);sync()}
function draw(api,dt){X.fillStyle=A.col.dark?'#1f2937':K.page;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.page;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=part(),y=top(D.won?H[g][1]:H[g][0],D.won),b=A.H-(D.msg?fold('✓ '+D.msg,A.W-48,13).length*(z(13)+5)+z(26):z(12));
 if(g==='jug')drawJug(y,b);if(g==='line')drawLine(y,b);if(g==='sum')drawSum(y,b);if(g==='tank')drawTank(y,b);if(g==='pairs')drawPairs(y,b);
 if(g==='quiz'){['0.001','0.010','0.100','1.000'].forEach((s,i)=>{const w=(A.W-z(60))/4,x=z(18)+i*(w+z(8));panel(x,y+z(20),w,z(44),'#ffffff',K.pick,2);label(s,x+w/2,y+z(42),14,K.ink,900)});label('× 10 each step',A.W/2,y+z(84),13,K.mute,800)}
 foot();A.fx.draw(X)}
const find=(L,p)=>(L||[]).find(r=>r&&within(p,r));
function down(p){const g=part();if(D.won&&g!=='quiz')return false;
 if(g==='jug'){const u=find(D.ups,p),d=find(D.downs,p),pl=[0,100,10,1];if(u){const dig=Math.floor(D.v/pl[u.i])%10;if(dig<9)setV(D.v+pl[u.i],1);return true}if(d){const dig=Math.floor(D.v/pl[d.i])%10;if(dig>0)setV(D.v-pl[d.i],1);return true}}
 if(g==='line'&&within(p,D.card)){D.drag=true;D.x0=p.x;D.o0=D.off;return true}
 if(g==='sum'){const t=find(D.tiles,p);if(t){choose(t.o);return true}}
 if(g==='tank'){if(D.jumps.length&&within(p,D.undo)){undo();return true}const t=find(D.tiles,p);if(t){jump(t.s);return true}}
 if(g==='pairs'){const r=find(D.cards,p);if(r){tapCard(r.v);return true}}
 return false}
function move(p){if(!D.drag)return;setOff(D.o0+Math.round((p.x-D.x0)/D.cw))}
function up(){if(!D.drag)return;D.drag=false;if(D.off===D.o0)return sync();setOff(D.off,1)}
function sync(){voice((D.msg?D.msg+' ':'')+D3ART.say(part(),D));keys();D.after()}
function keys(){if(!pad)return;pad.innerHTML='';const g=part(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,s).onclick=()=>{fn();sync()}};
 if(!D.won){if(g==='jug'){[['tenths',100],['hundredths',10],['thousandths',1]].forEach(([nm,pl])=>{b(`One more ${nm.slice(0,-1)}`,()=>{if(Math.floor(D.v/pl)%10<9)setV(D.v+pl,1)});b(`One less ${nm.slice(0,-1)}`,()=>{if(Math.floor(D.v/pl)%10>0)setV(D.v-pl,1)})})}
  if(g==='line'){b('Slide the bottom number left',()=>setOff(D.off-1,1));b('Slide the bottom number right',()=>setOff(D.off+1,1))}
  if(g==='sum'){const [opts]=PICK[D.col];opts.forEach(o=>b(`Write ${o}`,()=>choose(o)))}
  if(g==='tank'){STEPS.forEach(s=>b(`Jump + ${f3(s)}`,()=>jump(s)));if(D.jumps.length)b('Undo the last jump',undo)}
  if(g==='pairs')CARDS.filter(x=>!D.got.includes(x)).forEach(v=>b(`${D.pick===v?'Unpick':'Pick'} ${f3(v)}`,()=>tapCard(v)))}
 A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){gen++;Object.assign(D,{after:()=>{},won:false,msg:'',bad:false,drag:false,r:0,v:0,off:2,col:0,dig:[],ex:[],carry:0,jumps:[],add:0,got:[],pick:null})}
const steps=[
{h:'Thousandths',p:'Split 1 into 1,000 equal parts and each part is one thousandth, 0.001. A litre is 1,000 ml, so each millilitre is a thousandth of a litre.',
predict:{q:'How many millilitres is 0.375 litres?',opts:['37.5 ml','375 ml','3,750 ml'],ans:1},
task:'Pour 0.375 l, then 0.208 l',show:()=>{steps[0].go();play([300,370,375,200,208].map(v=>()=>setV(v,1)),420)},go:()=>{fresh();sync();D.after=ready(0,()=>D.won,'Both poured.')}},
{h:'Line up the points',p:'To add decimals, each digit must sit under a digit of the same value. Line up the decimal points, not the right-hand ends.',
predict:{q:'Rhea writes 2.4 under 1.375, lined up on the right, and gets 1.399. What went wrong?',opts:['Nothing, 1.399 is right','The decimal points are not lined up','She should start on the left'],ans:1},
task:'Line up the points in 2 sums',show:()=>{steps[1].go();play([()=>setOff(1,1),()=>setOff(0,1),()=>setOff(0,1)],500)},go:()=>{fresh();sync();D.after=ready(1,()=>D.won,'Both lined up.')}},
{h:'Add column by column',p:'Start with the thousandths. If a column makes 10 or more, write the ones digit and exchange the tens into the next column to the left.',
predict:{q:'Estimate first. 1.234 + 0.567 + 2.199 is about…',opts:['3','4','40'],ans:1},
task:'Add the 3 lengths',show:()=>{steps[2].go();play([0,1,2,3].map(k=>()=>choose(PICK[k][0][0])),450)},go:()=>{fresh();sync();D.after=ready(2,()=>D.won,'Sum done.')}},
{h:'How much more?',p:'A tank holds 5 litres and has 2.375 litres in it. Count on from 2.375 to 5 in friendly jumps to find the difference.',
predict:{q:'What is 5 − 2.375?',opts:['3.375','2.625','3.735'],ans:1},
task:'Count on to fill the tank',show:()=>{steps[3].go();play([5,20,600,2000].map(s=>()=>jump(s)),450)},go:()=>{fresh();sync();D.after=ready(3,()=>D.won,'Tank full.')}},
{h:'Pairs that make 1',p:'Some pairs of decimals add to exactly 1. Check the thousandths first, then the hundredths and tenths.',
task:'Find all 3 pairs',show:()=>{steps[4].go();play(PAIRS.flat().map(v=>()=>tapCard(v)),380)},go:()=>{fresh();sync();D.after=ready(4,()=>D.won,'All pairs found.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>D.after()});
let run=0;
function ask(){qn++;const [qq,ok,bad]=QZ[qn%QZ.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([w,tg])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>score(tg,ok)});voice('Challenge: '+qq);A.redraw()}
function score(tg,ok){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),win=tg==='ok';let m=WHY[tg]||'Line up the points, fill gaps with 0 and exchange when a column makes 10.';
 if(tg==='right')m='Lined up on the right, 2.4 is added as if it were 0.024. Line up the points: 2.400 + 1.375 = 3.775.';
 if(tg==='zero')m='The 0 in 0.208 holds the hundredths place: 2 tenths = 200 ml, plus 8 ml, is 208 ml, not 28 ml.';
 if(tg==='big')m='Taking the smaller digit from the bigger one in each column gives 3.625. Write 4.000 − 1.625 and exchange: 2.375.';
 if(win){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Decimals lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
