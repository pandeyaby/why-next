/* Flagship: equally likely outcomes (ages 9–10; NC England KS2/KS3 probability groundwork, CCSS 7.SP.C.7a "a uniform
   probability model"). Drag a spinner's edges until its sections match, recolour equal sections, sort situations as
   equally likely or not, tap the 36 two-dice pairs that total 7, and test a fair dice against a loaded one with 60 seeded
   rolls each. Every drag and tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',tip:'#eef2ff',edge:'#1e293b',
 cell:'#f1f5f9',hit:'#fde68a',hitInk:'#713f12',sel:'#1d4ed8',bar:'#334155'};
const E=EQART,COL=E.COL;
VIS.reg('flageqlik',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.15));
const txt=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function wrapLines(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function pane(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=wrapLines(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(36),L.length*lh+14);pane(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=wrapLines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 pane(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const good=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const rad=d=>(d-90)*Math.PI/180;
/* ---- step 0: drag the spinner's edges ---- */
const sizes=()=>{const e=G.edge;return[e[1]-e[0],e[2]-e[1],360-e[2]]};
function sizeNote(){const s=sizes();return COL.map((k,i)=>`${k[0]} ${s[i]}°`).join(', ')}
function setEdge(i,deg){if(G.won)return;const lo=i===1?20:G.edge[1]+20,hi=i===1?G.edge[2]-20:340;G.edge[i]=Math.max(lo,Math.min(hi,Math.round(deg/10)*10));judgeSpin()}
function judgeSpin(){const s=sizes();if(s.every(v=>v===120)){G.won=true;return good('Red 120°, blue 120°, gold 120°. Equal sections, so each colour has a 1 in 3 chance.')}
 const big=s.indexOf(Math.max(...s));G.bad=false;G.msg=`${sizeNote()}. ${COL[big][0]} has the biggest slice, so the pointer stops there most often.`;sync()}
function wheel(cx,cy,R,parts){let a0=0;parts.forEach((p,i)=>{const a1=a0+p.deg;X.beginPath();X.moveTo(cx,cy);X.arc(cx,cy,R,rad(a0),rad(a1));X.closePath();X.fillStyle=COL[p.col][1];X.fill();
  X.lineWidth=3;X.strokeStyle='#ffffff';X.stroke();const m=rad((a0+a1)/2);if(p.deg>=20)txt(p.lab||p.deg+'°',cx+Math.cos(m)*R*.62,cy+Math.sin(m)*R*.62,p.deg<45?10:13,'#ffffff','center',800);a0=a1})}
function drawSpin(t){const R=Math.min(A.W*.3,(A.H-t-z(100))/2),cx=A.W/2,cy=t+R+z(14),s=sizes();G.wheel={cx,cy,R};
 wheel(cx,cy,R,s.map((d,i)=>({deg:d,col:i})));X.fillStyle=K.edge;X.beginPath();X.moveTo(cx,cy-R-2);X.lineTo(cx-9,cy-R-16);X.lineTo(cx+9,cy-R-16);X.fill();
 G.knob=[1,2].map(i=>{const a=rad(G.edge[i]),x=cx+Math.cos(a)*R,y=cy+Math.sin(a)*R;X.beginPath();X.arc(x,y,z(12),0,7);X.fillStyle=G.grab===i?K.hit:K.card;X.fill();X.lineWidth=3;X.strokeStyle=K.edge;X.stroke();return{i,x,y}})}
/* ---- step 1: recolour six equal sections ---- */
const tally6=()=>[0,1,2].map(k=>G.six.filter(v=>v===k).length);
function recolour(j){if(G.won)return;G.six[j]=(G.six[j]+1)%3;A.sound.tick();const n=tally6();
 if(n.every(v=>v===2)){G.won=true;return good('2 sections each out of 6. The sections are equal, so the colours are now equally likely: 2/6 = 1/3 each.')}
 const most=n.indexOf(Math.max(...n));G.bad=false;G.msg=`Red ${n[0]}/6, blue ${n[1]}/6, gold ${n[2]}/6. ${COL[most][0]} covers the most sections, so it is the most likely.`;sync()}
function drawSix(t){const R=Math.min(A.W*.28,(A.H-t-z(118))/2),cx=A.W/2,cy=t+R+z(10);G.wheel={cx,cy,R};wheel(cx,cy,R,G.six.map((k,j)=>({deg:60,col:k,lab:COL[k][0]})));
 const n=tally6();txt(n.map((v,k)=>`${COL[k][0]} ${v}/6`).join('   '),A.W/2,cy+R+z(16),12,K.ink)}
const sectorAt=p=>{const w=G.wheel;if(!w)return -1;const dx=p.x-w.cx,dy=p.y-w.cy;if(Math.hypot(dx,dy)>w.R)return -1;let d=Math.atan2(dy,dx)*180/Math.PI+90;if(d<0)d+=360;return Math.floor(d/60)%6};
/* ---- step 2: sort situations ---- */
function place(bin){if(G.won)return;const [s,want,why]=E.CARDS[G.ci];G.drag=null;
 if(bin!==want)return miss(why);G.sorted.push([s,bin]);G.ci++;
 if(G.ci===E.CARDS.length){G.won=true;return good('All six sorted. Outcomes are equally likely only when nothing favours one of them: same-sized parts, fair objects.')}
 good(bin?'Not equally likely: something favours one outcome.':'Equally likely: nothing favours either outcome.')}
function drawSort(t){const [s]=E.CARDS[Math.min(G.ci,E.CARDS.length-1)],w=Math.min(A.W-40,z(330)),h=z(58),gap=z(14),bw=(A.W-30-gap)/2,by=A.H-z(150);
 G.bins=[0,1].map(b=>{const x=15+b*(bw+gap),r={x,y:by,w:bw,h:z(64),b};pane(x,by,bw,r.h,b?K.noBg:K.okBg,b?K.no:K.ok,2,12);
  txt(b?'Not equally likely':'Equally likely',x+bw/2,by+r.h/2,12,b?K.no:K.ok,'center',800);return r});
 txt(`Sorted ${G.sorted.length} of ${E.CARDS.length}`,A.W/2,by-z(14),11,K.dim);
 if(G.won)return;const d=G.drag,x=d?d.x-w/2:(A.W-w)/2,y=d?d.y-h/2:t+z(16);G.cardBox={x,y,w,h};pane(x,y,w,h,K.card,K.sel,3,12);
 const L=wrapLines(s,w-20,13);L.forEach((r,i)=>txt(r,x+w/2,y+h/2+(i-(L.length-1)/2)*(z(13)+4),13,K.ink))}
/* ---- step 3: two dice, 36 pairs ---- */
function tapPair(a,b){if(G.won)return;const key=a+','+b;if(G.pairs.has(key))return;
 if(a+b!==7)return miss(`${a} + ${b} = ${a+b}, not 7.${a+b===2?' Only 1 + 1 makes 2: just one pair out of 36.':''}`);
 G.pairs.add(key);A.sound.tick();if(G.pairs.size===6){G.won=true;return good('6 of the 36 pairs make 7, but only 1 pair (1 + 1) makes 2. Totals are outcomes, but they are not equally likely.')}
 G.bad=false;G.msg=`${a} + ${b} = 7. That is ${G.pairs.size} pair${G.pairs.size>1?'s':''} so far. Order matters: red ${a}, blue ${b} is a different roll from red ${b}, blue ${a}.`;sync()}
function drawGrid(t){const n=7,s=Math.min((A.W-30)/n,(A.H-t-z(112))/n),x0=(A.W-s*n)/2,y0=t+z(8);G.cells=[];
 for(let r=0;r<n;r++)for(let k=0;k<n;k++){const x=x0+k*s,y=y0+r*s;if(!r&&!k){txt('+',x+s/2,y+s/2,13,K.dim);continue}
  if(!r||!k){const v=r||k;pane(x+2,y+2,s-4,s-4,!r?'#fee2e2':'#dbeafe',!r?'#b91c1c':'#1d4ed8',2,6);txt(v,x+s/2,y+s/2,14,!r?'#7f1d1d':'#1e3a8a','center',800);continue}
  const a=r,b=k,on=G.pairs.has(a+','+b),one=a+b===2;pane(x+2,y+2,s-4,s-4,on?K.hit:one&&G.won?K.okBg:K.cell,on?K.hitInk:K.edge,on?3:1,6);
  txt(a+b,x+s/2,y+s/2,12,on?K.hitInk:K.ink,'center',on?800:600);G.cells.push({x,y,w:s,h:s,a,b})}
 txt('Rows: red dice. Columns: blue dice.',A.W/2,y0+s*n+z(10),10,K.dim)}
/* ---- step 4: test two dice ---- */
function roll(k,n){if(G.won||G.pick!=null)return;const D=G.dice[k];for(let i=0;i<n&&D.rolls<60;i++){D.c[(k?E.LOADED:E.FAIR)(D.r)-1]++;D.rolls++}A.sound.tick();
 G.bad=false;G.msg=`Dice ${'AB'[k]}: ${D.rolls} rolls, sixes ${D.c[5]}.`+(G.dice.every(d=>d.rolls>=60)?' Both done: tap the dice you think is unfair.':'');sync()}
function accuse(k){if(G.won)return;if(!G.dice.every(d=>d.rolls>=60))return roll(k,10);const D=G.dice[k];
 if(k===0){const lo=Math.min(...D.c),hi=Math.max(...D.c);return miss(`Dice A's counts run from ${lo} to ${hi}. A fair dice wobbles like that around 10. Look for one number that keeps coming far more often.`)}
 G.won=true;good(`Dice B gave ${D.c[5]} sixes in 60 rolls, about twice the 10 a fair dice gives. Dice A wobbled round 10 each: that is what fair looks like.`)}
function drawDice(t){const gap=z(12),w=(A.W-30-gap)/2,h=A.H-t-z(122),y=t+z(10);G.panels=G.dice.map((D,k)=>{const x=15+k*(w+gap),r={x,y,w,h,k};pane(x,y,w,h,K.card,G.won&&k===1?K.ok:K.edge,2,12);
  txt(`Dice ${'AB'[k]}: ${D.rolls}/60`,x+w/2,y+z(14),12,K.ink,'center',800);const bw=(w-24)/6,base=y+h-z(22),top=y+z(32),sc=(base-top)/24;
  X.setLineDash([4,4]);X.strokeStyle=K.dim;X.lineWidth=1;X.beginPath();X.moveTo(x+8,base-10*sc);X.lineTo(x+w-8,base-10*sc);X.stroke();X.setLineDash([]);
  D.c.forEach((v,i)=>{const bx=x+12+i*bw,bh=Math.min(24,v)*sc;X.fillStyle=k===1&&i===5&&G.won?K.no:K.bar;X.fillRect(bx+2,base-bh,bw-4,bh);txt(i+1,bx+bw/2,base+z(10),11,K.ink);if(v)txt(v,bx+bw/2,base-bh-z(8),10,K.ink)});
  return r})}
/* ---- input and drawing ---- */
const kind=()=>['edges','six','sort','pairs','test','quiz'][A.step];
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>within(p,r));
 if(k==='edges'&&!G.won){const n=(G.knob||[]).find(q=>Math.hypot(p.x-q.x,p.y-q.y)<z(28));if(n){G.grab=n.i;A.redraw();return true}}
 if(k==='six'){const j=sectorAt(p);if(j>=0){recolour(j);return true}}
 if(k==='sort'&&!G.won){if(within(p,G.cardBox)){G.drag={x:p.x,y:p.y};A.redraw();return true}const b=hit(G.bins);if(b){place(b.b);return true}}
 if(k==='pairs'){const r=hit(G.cells);if(r){tapPair(r.a,r.b);return true}}
 if(k==='test'){const r=hit(G.panels);if(r){accuse(r.k);return true}}
 return false}
function move(p){const k=kind();if(k==='edges'&&G.grab){const w=G.wheel;let d=Math.atan2(p.y-w.cy,p.x-w.cx)*180/Math.PI+90;if(d<0)d+=360;setEdge(G.grab,d)}
 if(k==='sort'&&G.drag){G.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const k=kind();if(k==='edges'){G.grab=0;A.redraw()}
 if(k==='sort'&&G.drag){const b=(G.bins||[]).find(r=>within(p,r));G.drag=null;if(b)place(b.b);else A.redraw()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='edges'){t=head(G.won?'Same-sized sections: every colour is equally likely.':'Drag the white dots on the edge until all three colours have the same size slice.',G.won);drawSpin(t)}
 if(k==='six'){t=head(G.won?'Equal sections, shared out equally: equally likely colours.':'Tap a section to change its colour. Make red, blue and gold equally likely.',G.won);drawSix(t)}
 if(k==='sort'){t=head(G.won?'Fair objects and equal parts give equally likely outcomes.':'Drag the card to a box, or tap a box. Are the outcomes equally likely?',G.won);drawSort(t)}
 if(k==='pairs'){t=head(G.won?'7 can be made 6 ways out of 36. 2 can be made only 1 way.':`Two dice are added. Tap every pair that makes 7 (${G.pairs.size}/6).`,G.won);drawGrid(t)}
 if(k==='test'){t=head(G.won?'60 rolls showed it: dice B favours 6.':'Tap a dice to roll it 10 times. After 60 rolls each, tap the one that is not fair.',G.won);drawDice(t)}
 if(k==='quiz'){t=head('Equally likely means nothing favours any outcome. Count the equal parts.');drawGridMini(t)}
 foot();A.fx.draw(X)}
function drawGridMini(t){const R=Math.min(A.W*.22,(A.H-t-z(40))/2);G.wheel=null;const save=G.edge;G.edge=[0,120,240];const cx=A.W/2,cy=t+R+z(16);wheel(cx,cy,R,[0,1,2].map(i=>({deg:120,col:i,lab:'1/3'})));G.edge=save}
function sync(){const k=kind();let d='Challenge.';
 if(k==='edges')d=`Spinner sections: ${sizeNote()}.`;
 if(k==='six')d=`Six equal sections coloured ${G.six.map(v=>COL[v][0]).join(', ')}.`;
 if(k==='sort')d=G.won?'All cards sorted.':`Card: ${E.CARDS[G.ci][0]}. Boxes: equally likely, not equally likely.`;
 if(k==='pairs')d=`Pairs found that make 7: ${[...G.pairs].map(s=>s.replace(',',' + ')).join('; ')||'none'}.`;
 if(k==='test')d=G.dice.map((D,i)=>`Dice ${'AB'[i]}, ${D.rolls} rolls: ${D.c.map((v,j)=>(j+1)+'s '+v).join(', ')}.`).join(' ');
 tell((G.msg?G.msg+' ':'')+d);keys();G.after()}
function keys(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='edges'&&!G.won)[1,2].forEach(i=>{const nm=i===1?'red and blue':'blue and gold';b(`◀ ${nm} edge`,()=>setEdge(i,G.edge[i]-10),`Move the edge between ${nm} back 10 degrees`);b(`${nm} edge ▶`,()=>setEdge(i,G.edge[i]+10),`Move the edge between ${nm} on 10 degrees`)});
 if(k==='six'&&!G.won)G.six.forEach((v,j)=>b(`Section ${j+1}: ${COL[v][0]}`,()=>recolour(j),`Change section ${j+1}, now ${COL[v][0]}`));
 if(k==='sort'&&!G.won){b('Equally likely',()=>place(0));b('Not equally likely',()=>place(1))}
 if(k==='pairs'&&!G.won)for(let a=1;a<=6;a++)b(`${a} + ${7-a}`,()=>tapPair(a,7-a),`Red ${a}, blue ${7-a}`);
 if(k==='test'&&!G.won){[0,1].forEach(i=>b(G.dice.every(d=>d.rolls>=60)?`Dice ${'AB'[i]} is unfair`:`Roll dice ${'AB'[i]} ×10`,()=>accuse(i)))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,edge:[0,200,290],grab:0,six:E.START6.slice(),ci:0,sorted:[],drag:null,pairs:new Set(),pick:null,
 dice:[{c:[0,0,0,0,0,0],rolls:0,r:E.RNG(4)},{c:[0,0,0,0,0,0],rolls:0,r:E.RNG(16)}]})}
const steps=[
{h:'Same size, same chance',p:'A spinner lands in each section as often as that section’s share of the circle. Outcomes are equally likely when their sections are the same size.',
predict:{q:'A spinner has three colours. Does each colour have a 1 in 3 chance?',opts:['Yes, always: there are 3 colours','Only if the three sections are the same size','No, never'],ans:1},
task:'Make all three slices the same size',show:()=>{steps[0].go();play([()=>setEdge(1,160),()=>setEdge(1,120),()=>setEdge(2,260),()=>setEdge(2,240)],450)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'120° each: one third of the turn for every colour.')}},
{h:'Count the parts',p:'Equal sections are not enough. A colour on 4 of 6 equal sections is twice as likely as a colour on 2. Count the equal parts each outcome gets.',
task:'Make red, blue and gold equally likely',show:()=>{steps[1].go();play([()=>recolour(2),()=>recolour(3),()=>recolour(3)],500)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'2 sections each, so 2/6 = 1/3 for every colour.')}},
{h:'Fair or not?',p:'Ask: does anything favour one outcome? A fair coin, a fair dice and folded names do not. More counters of one colour, a stronger team or a lopsided object do.',
predict:{q:'Your team will either win or lose. Is that a 50-50 chance?',opts:['Yes: there are two outcomes','Not necessarily: two outcomes can have different chances','Yes, if you are lucky'],ans:1},
task:'Sort all six situations',show:()=>{steps[2].go();play(E.CARDS.map(cd=>()=>place(cd[1])),420)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Three equally likely, three not.')}},
{h:'Two dice',p:'Roll a red dice and a blue dice and add. There are 6 × 6 = 36 equally likely pairs. Each total is made by a different number of pairs.',
predict:{q:'Is a total of 2 as likely as a total of 7?',opts:['Yes: every total is equally likely','No: 7 is more likely','No: 2 is more likely'],ans:1},
task:'Tap all six pairs that make 7',show:()=>{steps[3].go();play([1,2,3,4,5,6].map(a=>()=>tapPair(a,7-a)),400)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'7 has 6 chances in 36; 2 has 1 chance in 36.')}},
{h:'Test it',p:'When you cannot see inside an object, test it. A fair dice gives about 10 of each number in 60 rolls, never exactly. One number far above the rest is a clue.',
predict:{q:'You roll a fair dice 60 times. How many 6s will you get?',opts:['Exactly 10','About 10, give or take a few','Fewer than 5, because 6 is hard to roll'],ans:1},
task:'Roll both dice 60 times and find the unfair one',show:()=>{steps[4].go();const f=[];for(let i=0;i<6;i++)f.push(()=>roll(0,10),()=>roll(1,10));f.push(()=>accuse(1));play(f,140)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'Dice B is loaded towards 6.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=E.bank[qi%E.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=E.WHY[tag]||'Count the equal parts each outcome has.';
 if(tag==='twoWays')m='Two outcomes is not the same as two equal chances. Ask whether anything favours one of them.';
 if(tag==='countNames')m='Count sections, not colour names. Red has 2 of the 4 equal sections, blue and yellow 1 each.';
 if(tag==='exact')m='Chance does not share results out exactly. In 60 fair rolls, anything from about 5 to 15 sixes is normal.';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Equally likely lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
