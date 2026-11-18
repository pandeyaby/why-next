/* Flagship: division with decimals (ages 10–11; CCSS 5.NBT.B.7, NC England Y6 division with answers to 2 dp). Share
   ones and tenths onto plates and exchange what is left, place the decimal point by estimating, keep going into hundredths,
   count jumps of a decimal, and scale both numbers by 10 so the divisor is whole. Every tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',rule:'#334155',paper:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#1d4ed8',soft:'#dbeafe',gold:'#b45309',goldSoft:'#fde68a',tag:'#7c2d12'};
const {NAME,ONE,COL,POINT,JUMPS,SCALE,f100}=DDART;
VIS.reg('flagdecdiv',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const fz=n=>Math.round(n*(A.narrow?1:1.12));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function lines(s,maxW,n){X.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=lines(s,A.W-40,13),lh=fz(13)+4,h=Math.max(fz(40),L.length*lh+14);panel(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.rule);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=fz(13)+5,h=L.length*lh+10,y=A.H-h-8;
 panel(10,y,A.W-20,h,K.paper,G.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{G.bad=true;G.msg=s;A.sound.miss();refresh()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();refresh()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- steps 0 and 2: share onto plates ---- */
const prob=()=>G.list[G.si];
const plateVal=()=>f100(G.got[0]*100+G.got[1]*10+G.got[2]);
function deal(col){if(G.won)return;const P=prob(),n=G.bank[col];
 if(!n)return oops(`No ${NAME[col]} are left to share.`);
 if(col>0&&G.bank[col-1])return oops(`Deal with the ${NAME[col-1]} first. A leftover ${ONE[col-1]} has to be exchanged before the ${NAME[col]} are shared.`);
 const k=Math.floor(n/P.p);if(!k)return oops(`${n} ${n===1?ONE[col]:NAME[col]} cannot go onto ${P.p} plates equally. Exchange ${n===1?'it':'them'} for ${NAME[col+1]}.`);
 G.got[col]+=k;G.bank[col]-=k*P.p;A.sound.tick();
 if(G.bank.every(v=>!v)){const v=plateVal(),txt=`${P.label} = ${v}. Each plate has ${G.got.map((g,i)=>g?g+' '+(g===1?ONE[i]:NAME[i]):null).filter(Boolean).join(' and ')}.`;
  if(G.si===G.list.length-1){G.won=true;return yes(txt)}yes(txt+' Next one.');G.si++;load();return refresh()}
 G.bad=false;G.msg=`${k} ${k===1?ONE[col]:NAME[col]} on each plate. ${G.bank[col]?G.bank[col]+' left over.':'None left over.'}`;refresh()}
function exch(col){if(G.won)return;const P=prob(),n=G.bank[col];
 if(!n)return oops(`There are no ${NAME[col]} to exchange.`);
 if(n>=P.p)return oops(`There are enough ${NAME[col]} for every plate. Share them first, then exchange only what is left.`);
 G.bank[col+1]+=10*n;G.bank[col]=0;A.sound.tick();G.bad=false;G.msg=`${n} ${n===1?ONE[col]:NAME[col]} → ${10*n} ${NAME[col+1]}. Now share ${G.bank[col+1]} ${NAME[col+1]}.`;refresh()}
function load(){const P=prob();G.bank=P.n.slice();G.got=[0,0,0]}
function piece(col,x,y,s){X.fillStyle=COL[col];if(col===0){X.fillRect(x,y,s,s);X.fillStyle='#fff';X.font=`700 ${Math.round(s*.6)}px system-ui`;X.textAlign='center';X.textBaseline='middle';X.fillText('1',x+s/2,y+s/2+1)}
 else if(col===1)X.fillRect(x+s*.3,y,s*.4,s);else{X.beginPath();X.arc(x+s/2,y+s/2,s*.3,0,7);X.fill()}}
function drawShare(){const P=prob(),three=P.n[2]||P.p===4;
 const top=head(G.won?(A.step===0?'Share the ones, exchange the leftover one for 10 tenths, share the tenths: 7.2 ÷ 3 = 2.4.':'Keep exchanging into smaller places: 3 ÷ 4 = 0.75 and 5.4 ÷ 4 = 1.35.'):`${P.label}: tap a column to share it onto the plates. Tap ⇢ to exchange.`,G.won);
 const cols=three?3:2,gap=8,cw=(A.W-28-gap*(cols-1))/cols,ch=fz(96),y0=top+fz(8);G.colHit=[];G.exHit=[];
 for(let i=0;i<cols;i++){const x=14+i*(cw+gap),n=G.bank[i];panel(x,y0,cw,ch,K.paper,COL[i],2);say(NAME[i],x+cw/2,y0+fz(11),12,COL[i]);
  const s=i===0?fz(16):n>14?fz(8):fz(11),per=Math.max(1,Math.floor((cw-8)/(s+2)));for(let k=0;k<Math.min(n,40);k++)piece(i,x+5+(k%per)*(s+2),y0+fz(22)+Math.floor(k/per)*(s+3),s);
  say(n?`${n} to share`:'none',x+cw/2,y0+ch-fz(10),11,K.dim);G.colHit.push({x,y:y0,w:cw,h:ch,i});
  if(i<cols-1){const ex={x:x+cw-fz(30),y:y0+ch+fz(4),w:fz(30)+gap+fz(30),h:fz(24),i};panel(ex.x,ex.y,ex.w,ex.h,K.goldSoft,K.gold,1.5,10);say('⇢ ×10',ex.x+ex.w/2,ex.y+ex.h/2,11,K.tag);G.exHit.push(ex)}}
 const py=y0+ch+fz(40),pw=(A.W-28-gap*(P.p-1))/P.p,ph=fz(70);
 for(let j=0;j<P.p;j++){const x=14+j*(pw+gap);panel(x,py,pw,ph,'#f1f5f9',K.rule,1.5,ph/2.4);let k=0;
  for(let i=0;i<3;i++){const s=i===0?fz(13):fz(10),st=i===0?s+2:Math.min(s,(pw-16)/Math.max(1,G.got[i]));for(let g=0;g<G.got[i];g++)piece(i,x+8+g*st,py+8+k*fz(16),s);if(G.got[i])k++}
  say(plateVal(),x+pw/2,py+ph-fz(12),14,K.fill)}
 say(`each plate gets ${plateVal()}`,A.W/2,py+ph+fz(14),12,K.dim)}
/* ---- step 1: place the point ---- */
function putPoint(s){if(G.won)return;const P=POINT[G.si],cand=num(P.d,s),right=num(P.d,P.ans);
 if(s!==P.ans){const r=cand/right,how=r>1?`${Math.round(r)} times too big`:`${Math.round(1/r)} times too small`;return oops(`${P.q} is about ${P.est}. ${fmtP(P.d,s)} is ${how}.`)}
 G.done.push(`${P.q} = ${fmtP(P.d,s)}`);if(G.si===POINT.length-1){G.won=true;return yes(`${P.q} = ${fmtP(P.d,s)}, close to ${P.est.split('= ')[1]}.`)}
 yes(`${P.q} = ${fmtP(P.d,s)}, close to ${P.est.split('= ')[1]}. Next.`);G.si++}
const fmtP=(d,s)=>s===0?'0.'+d:s===d.length?d:d.slice(0,s)+'.'+d.slice(s);
const num=(d,s)=>+fmtP(d,s);
function drawPoint(){const P=POINT[G.si],top=head(G.won?'Estimate first, then put the point where the answer is close to the estimate.':`${P.q}: the digits are ${P.d.split('').join(' ')}. Tap the gap where the decimal point goes.`,G.won);
 say(P.q+' = ?',A.W/2,top+fz(26),18,K.ink);const n=P.d.length,dw=fz(44),x0=A.W/2-(n*dw)/2,y=top+fz(84);G.gapHit=[];
 P.d.split('').forEach((d,i)=>{panel(x0+i*dw+4,y-fz(28),dw-8,fz(56),K.paper,K.rule,2);say(d,x0+i*dw+dw/2,y,30,K.ink)});
 for(let s=0;s<=n;s++){const gx=x0+s*dw,r={x:gx-fz(14),y:y+fz(32),w:fz(28),h:fz(30),s};panel(r.x,r.y,r.w,r.h,K.goldSoft,K.gold,1.5,14);say('•',gx,r.y+r.h/2,16,K.tag);G.gapHit.push(r)}
 say(`estimate: ${P.est}`,A.W/2,y+fz(84),14,K.fill);G.done.forEach((t,i)=>say(t,A.W/2,y+fz(112)+i*fz(20),13,K.ok))}
/* ---- step 3: jumps of a decimal ---- */
function jump(){if(G.won)return;const P=JUMPS[G.si];if(G.pos+P.b>P.a)return oops('That jump would go past the end.');G.pos+=P.b;G.n++;A.sound.tick();
 if(G.pos===P.a){const t=`${G.n} jumps of ${P.b/10} fit in ${P.a/10}: ${P.a/10} ÷ ${P.b/10} = ${G.n}.`;G.done.push(t);
  if(G.si===JUMPS.length-1){G.won=true;return yes(t+' Both answers are bigger than the number you started with.')}yes(t+' Next.');G.si++;G.pos=0;G.n=0;return}
 G.bad=false;G.msg=`${G.n} ${G.n===1?'jump':'jumps'}: at ${G.pos/10}.`;refresh()}
function drawJump(){const P=JUMPS[G.si],top=head(G.won?'Dividing by a number less than 1 gives an answer bigger than you started with.':`How many jumps of ${P.b/10} fit in ${P.a/10}? Tap the line to jump.`,G.won);
 const lx=22,lw=A.W-44,ly=top+fz(120),mx=Math.ceil(P.a/10),u=lw/(mx*10);X.strokeStyle=K.rule;X.lineWidth=3;X.beginPath();X.moveTo(lx,ly);X.lineTo(lx+lw,ly);X.stroke();
 for(let t=0;t<=mx*10;t++){const x=lx+t*u;X.lineWidth=t%10?1:2.5;X.beginPath();X.moveTo(x,ly-(t%10?4:9));X.lineTo(x,ly+(t%10?4:9));X.stroke();if(t%10===0)say(t/10,x,ly+fz(20),12,K.dim)}
 for(let j=0;j<G.n;j++){const a=lx+j*P.b*u,b=a+P.b*u;X.strokeStyle=K.fill;X.lineWidth=2.5;X.beginPath();X.ellipse((a+b)/2,ly,(b-a)/2,fz(36),0,Math.PI,0);X.stroke();say(j+1,(a+b)/2,ly-fz(44),11,K.fill)}
 X.fillStyle=K.gold;X.beginPath();X.arc(lx+P.a*u,ly,6,0,7);X.fill();say(`end ${P.a/10}`,lx+P.a*u,ly+fz(38),12,K.tag,'center');
 G.lineHit={x:lx-10,y:top+fz(40),w:lw+20,h:fz(110)};say(`jumps: ${G.n}`,A.W/2,ly+fz(62),16,K.fill);G.done.forEach((t,i)=>say(t,A.W/2,ly+fz(90)+i*fz(20),12,K.ok))}
/* ---- step 4: scale both by 10 ---- */
function scale(which){if(G.won)return;const P=SCALE[G.si],a=G.a,b=G.b,q=a/b;
 if(which==='left')return oops(`${f100(a*10)} ÷ ${f100(b)} = ${f100(q*1000)}: ten times the real answer. Multiply both numbers, so the answer stays the same.`);
 if(which==='right')return oops(`${f100(a)} ÷ ${f100(b*10)} = ${f100(q*10)}: ten times too small. Multiply both numbers by 10.`);
 G.a*=10;G.b*=10;A.sound.tick();if(G.b%100){G.bad=false;G.msg=`${f100(G.a)} ÷ ${f100(G.b)}: the second number is still a decimal. Scale again.`;return refresh()}
 const t=`${f100(P.a)} ÷ ${f100(P.b)} = ${f100(G.a)} ÷ ${f100(G.b)} = ${q}.`;G.done.push(t);if(G.si===SCALE.length-1){G.won=true;return yes(t)}yes(t+' Next.');G.si++;G.a=SCALE[G.si].a;G.b=SCALE[G.si].b}
function drawScale(){const top=head(G.won?'Multiply both numbers by 10 (or 100) until you divide by a whole number. The answer does not change.':'Make the second number whole. Tap a ×10 button.',G.won);
 const y=top+fz(48);say(`${f100(G.a)} ÷ ${f100(G.b)}`,A.W/2,y,28,K.ink);say(`answer stays ${G.a/G.b}`,A.W/2,y+fz(34),13,K.dim);
 const bw=(A.W-28-16)/3,by=y+fz(58);G.scHit=[['left','× 10 first only'],['both','× 10 both'],['right','× 10 second only']].map(([k,l],i)=>{const x=14+i*(bw+8);
  panel(x,by,bw,fz(46),k==='both'?K.goldSoft:K.paper,K.gold,2);const w=l.split(' ');say(w.slice(0,2).join(' '),x+bw/2,by+fz(15),13,K.tag);say(w.slice(2).join(' '),x+bw/2,by+fz(32),12,K.tag);return{x,y:by,w:bw,h:fz(46),k}});
 G.done.forEach((t,i)=>say(t,A.W/2,by+fz(74)+i*fz(20),13,K.ok))}
/* ---- input, drawing, controls ---- */
const mode=()=>['share','point','share','jump','scale','quiz'][A.step];
function down(p){const m=mode();
 if(m==='share'){const e=(G.exHit||[]).find(r=>inside(p,r));if(e){exch(e.i);return true}const r=(G.colHit||[]).find(r=>inside(p,r));if(r){deal(r.i);return true}}
 if(m==='point'){const r=(G.gapHit||[]).find(r=>inside(p,r));if(r){putPoint(r.s);refresh();return true}}
 if(m==='jump'&&inside(p,G.lineHit)){jump();refresh();return true}
 if(m==='scale'){const r=(G.scHit||[]).find(r=>inside(p,r));if(r){scale(r.k);refresh();return true}}
 return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='share')drawShare();if(m==='point')drawPoint();if(m==='jump')drawJump();if(m==='scale')drawScale();
 if(m==='quiz'){head('Share and exchange, estimate to place the point, and scale both numbers when you divide by a decimal.');const y=A.H*.45;['7.2 ÷ 3 = 2.4','3 ÷ 4 = 0.75','4.8 ÷ 0.6 = 48 ÷ 6 = 8'].forEach((r,i)=>say(r,A.W/2,y+i*fz(30),16,K.fill))}
 foot();A.fx.draw(X)}
function refresh(){const m=mode();let d='Challenge.';
 if(m==='share'){const P=prob();d=`${P.label}. Left to share: ${G.bank.map((n,i)=>n+' '+NAME[i]).join(', ')}. Each plate has ${plateVal()}.`}
 if(m==='point'){const P=POINT[G.si];d=`${P.q}. Digits ${P.d.split('').join(' ')}. Estimate ${P.est}. Done: ${G.done.join('; ')||'none'}.`}
 if(m==='jump'){const P=JUMPS[G.si];d=`Jumps of ${P.b/10} towards ${P.a/10}: ${G.n} so far, at ${G.pos/10}.`}
 if(m==='scale')d=`Now ${f100(G.a)} ÷ ${f100(G.b)}. Done: ${G.done.join('; ')||'none'}.`;
 announce((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(m==='share'&&!G.won){const cols=prob().n[2]||prob().p===4?3:2;for(let i=0;i<cols;i++)b(`Share ${NAME[i]}`,()=>deal(i),`Share the ${NAME[i]} onto the plates`);for(let i=0;i<cols-1;i++)b(`Exchange ${NAME[i]}`,()=>exch(i),`Exchange leftover ${NAME[i]} for ${NAME[i+1]}`)}
 if(m==='point'&&!G.won){const P=POINT[G.si];for(let s=0;s<=P.d.length;s++)b(fmtP(P.d,s),()=>{putPoint(s);refresh()},`Put the point to make ${fmtP(P.d,s)}`)}
 if(m==='jump'&&!G.won)b(`Jump ${JUMPS[G.si].b/10}`,()=>{jump();refresh()},'Make one more jump');
 if(m==='scale'&&!G.won){b('× 10 both',()=>{scale('both');refresh()},'Multiply both numbers by 10');b('× 10 first only',()=>{scale('left');refresh()},'Multiply only the first number by 10');b('× 10 second only',()=>{scale('right');refresh()},'Multiply only the second number by 10')}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();refresh()}},(j+1)*(A.reduced()?30:ms)))};
function fresh(list){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,list:list||[],si:0,done:[],pos:0,n:0,a:SCALE[0].a,b:SCALE[0].b});if(list)load()}
const steps=[
{h:'Share and exchange',p:'Dividing a decimal is sharing. Share the ones first. A leftover one is swapped for 10 tenths, and then the tenths are shared.',
predict:{q:'What is 7.2 ÷ 3?',opts:['2.4','2.04','24'],ans:0},
task:'Share 7.2 onto 3 plates',show:()=>{steps[0].go();replay([()=>deal(0),()=>exch(0),()=>deal(1)],700)},go:()=>{fresh(DDART.SHARE0);refresh();G.after=settle(0,()=>G.won,'7.2 ÷ 3 = 2.4.')}},
{h:'Where does the point go?',p:'The digits of the answer come from dividing. An estimate tells you where the decimal point goes.',
predict:{q:'12.6 ÷ 3 gives the digits 4 and 2. Which answer is right?',opts:['4.2','42','0.42'],ans:0},
task:'Place the point in all three answers',show:()=>{steps[1].go();replay(POINT.map(P=>()=>putPoint(P.ans)),700)},go:()=>{fresh();refresh();G.after=settle(1,()=>G.won,'4.2, 5.1 and 0.21.')}},
{h:'Keep going',p:'When a remainder is left, exchange it for the next smaller place and keep sharing. 3 ones become 30 tenths.',
predict:{q:'What is 3 ÷ 4?',opts:['0.75','0.34','You cannot: 3 is less than 4'],ans:0},
task:'Share 3 ÷ 4 and 5.4 ÷ 4 to the end',show:()=>{steps[2].go();replay([()=>exch(0),()=>deal(1),()=>exch(1),()=>deal(2),()=>deal(0),()=>exch(0),()=>deal(1),()=>exch(1),()=>deal(2)],520)},go:()=>{fresh(DDART.SHARE2);refresh();G.after=settle(2,()=>G.won,'0.75 and 1.35.')}},
{h:'Dividing by a decimal',p:'4.8 ÷ 0.6 asks how many 0.6s fit in 4.8. Count the jumps.',
predict:{q:'Is 4.8 ÷ 0.6 bigger or smaller than 4.8?',opts:['Bigger','Smaller: dividing makes things smaller','The same'],ans:0},
task:'Count the jumps for both lines',show:()=>{steps[3].go();replay(Array(8).fill(jump).concat(Array(5).fill(jump)),300)},go:()=>{fresh();refresh();G.after=settle(3,()=>G.won,'8 and 5 jumps.')}},
{h:'Scale both numbers',p:'Multiply both numbers by 10 and the answer stays the same: 4.8 ÷ 0.6 = 48 ÷ 6. Keep going until the second number is whole.',
task:'Make the second number whole in all three',show:()=>{steps[4].go();replay([()=>scale('both'),()=>scale('both'),()=>scale('both'),()=>scale('both')],650)},go:()=>{fresh();refresh();G.after=settle(4,()=>G.won,'8, 30 and 3.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
const BANK=DDART.bank;
function why(tag){let m='Estimate first, then check the decimal point gives an answer close to the estimate.';
 if(tag==='pointPlace')m='Check with an estimate. 8.4 ÷ 4 is about 8 ÷ 4 = 2, so the answer is 2.1, not 21.';
 if(tag==='zeroGap')m='Each place shares on its own: 8 ones ÷ 4 = 2 ones and 4 tenths ÷ 4 = 1 tenth. No hundredths, so no extra 0.';
 if(tag==='noExchange')m='The leftover £1 has to be exchanged for 10 tenths: 14 tenths ÷ 4 = 3 tenths, 2 left, which make 20 hundredths ÷ 4 = 5.';
 if(tag==='remainderAsDecimal')m='A remainder of 3 is not 0.3. Exchange the 3 ones for 30 tenths and keep sharing: 7 ÷ 4 = 1.75.';
 if(tag==='alwaysSmaller')m='Dividing by a number less than 1 makes the answer bigger. Count how many of the small parts fit.';
 if(tag==='scaleOne')m='Multiplying only one number changes the answer. Scale both: 4.8 ÷ 0.6 = 48 ÷ 6 = 8.';
 if(tag==='scaleShort')m='0.08 needs × 100 to become whole, and so does 2.4: 240 ÷ 8 = 30. Scaling one by 100 and one by 10 gives the wrong answer.';
 return m}
function ask(){qi++;const [q,right,wrongs]=BANK[qi%BANK.length],all=[[right,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});announce('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,right){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Decimal division lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
