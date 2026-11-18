/* Flagship – the constant of proportionality, y = kx (ages 13–15; CCSS 7.RP.A.2b/2c "identify the constant of
   proportionality (unit rate) in tables, graphs, equations ... represent proportional relationships by equations";
   GCSE (England) R10 "solve problems involving direct proportion ... including graphical and algebraic representations").
   Divide y by x down a table and see the same k each time; sort relationships into proportional or not (a fixed start
   charge or an equal step in y is not enough); drag a line that must pass through (0, 0) to hit targets and read k as the
   rise for a run of 1; use k to predict; and say what k means in words with its units. */
(()=>{
 const TAB=[[2,5],[4,10],[6,15]];// kg of apples -> £
 const SORTS=[['Apples: 2 kg £5, 4 kg £10, 6 kg £15',1,'y ÷ x is 2.5 every time.'],['Taxi: £3 to start plus £2 per km',0,'At 0 km it already costs £3, so the line misses (0, 0).'],
  ['Pay: £9 per hour worked',1,'y = 9x: zero hours, zero pay, and y ÷ x is always 9.'],['Height: age 1 is 75 cm, age 2 is 87 cm, age 3 is 96 cm',0,'87 ÷ 2 is not 75 ÷ 1. y ÷ x changes, so it is not proportional.']];
 const GOALS=[[4,2],[2,3],[1,3]];// line must pass through (x, y): k = 0.5, 1.5, 3
 const USE=[['5 m of rope weighs 2 kg. What do 12 m weigh?',['4.8 kg','9 kg','30 kg'],0,'k = 2 ÷ 5 = 0.4 kg per m, so y = 0.4 × 12 = 4.8 kg.'],
  ['3 tickets cost £27. What do 8 tickets cost?',['£72','£32','£2.67'],0,'k = 27 ÷ 3 = £9 per ticket, so y = 9 × 8 = £72.'],
  ['A car uses 6 litres in 75 km. How far on 10 litres?',['125 km','79 km','0.8 km'],0,'k = 75 ÷ 6 = 12.5 km per litre, so y = 12.5 × 10 = 125 km.']];
 const MEANS=[['y = 2.5x: cost in £ for x kg of apples',['Each kg costs £2.50','2.5 kg cost £1','It costs £2.50 to start'],0],
  ['y = 0.4x: weight in kg of x m of rope',['Each metre weighs 0.4 kg','Each kg is 0.4 m long','The rope weighs 0.4 kg in all'],0],
  ['y = 12.5x: km driven on x litres',['12.5 km for each litre','12.5 litres for each km','The tank holds 12.5 litres'],0]];
 VIS.reg('flagkx',c=>{let A,pad,quiz;
  const K={id:0,seen:[],k:null,si:0,gi:0,kk:1,drag:false,ui:0,mi:0,line:'',bad:false,fin:()=>{}};
  const part=()=>['table','sort','graph','use','mean','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#172033',GREY='#475569',RULE='#64748b',WHITE='#ffffff',OK='#047857',NO='#b91c1c',BLUE='#1d4ed8',ORG='#c2410c',CREAM='#fefce8',EDGE='#a16207';
  function say(g,t,x,y,n,col,w,al){g.font=`${w||800} ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y,A.W-12)}
  function lines(g,t,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let row='';t.split(' ').forEach(w=>{const tr=row?row+' '+w:w;if(row&&g.measureText(tr).width>max){out.push(row);row=w}else row=tr});out.push(row);return out}
  function block(g,t,x,y,max,n,col){const L=lines(g,t,max,n);L.forEach((l,i)=>say(g,l,x,y+(i-(L.length-1)/2)*fz(n+6),n,col))}
  function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function note(g){if(!K.line)return;const L=lines(g,(K.bad?'✗ ':'✓ ')+K.line,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},WHITE,K.bad?NO:OK,3);L.forEach((l,i)=>say(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const nope=t=>{K.bad=true;K.line=t;A.sound.miss();tell(t);A.redraw()};
  const yes=t=>{K.bad=false;K.line=t;A.sound.pop()};
  const f=v=>(Math.round(v*100)/100).toString();
  function head(g,t,sub){const n=lines(g,t,A.W-40,15).length,lh=fz(21),tb=n*lh,sb=sub?fz(18):0,r={x:12,y:A.H*.03,w:A.W-24,h:Math.max(A.H*.15,tb+sb+14)};box(g,r,CREAM,EDGE,2.5);block(g,t,A.W/2,r.y+7+tb/2,r.w-16,15,INK);if(sub)say(g,sub,A.W/2,r.y+7+tb+sb/2,11,GREY,700)}
  const rowR=i=>({x:A.W*.12,y:A.H*(.27+i*.11),w:A.W*.76,h:A.H*.095});
  const optR=i=>{const w=(A.W-36)/3;return{x:12+i*(w+6),y:A.H*.5,w,h:A.H*.14}};
  const twoR=i=>{const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.48,w,h:A.H*.16}};
  // graph area for the drag step: x 0..5, y 0..6
  const G=()=>({x:A.W*.14,y:A.H*.2,w:A.W*.78,h:A.H*.52});
  const px=x=>G().x+x/5*G().w,py=y=>G().y+G().h-y/6*G().h;
  function graph(g){const r=G();g.strokeStyle='#cbd5e1';g.lineWidth=1;for(let i=0;i<=5;i++){g.beginPath();g.moveTo(px(i),r.y);g.lineTo(px(i),r.y+r.h);g.stroke();say(g,i,px(i),r.y+r.h+fz(10),10,GREY,700)}
   for(let j=0;j<=6;j++){g.beginPath();g.moveTo(r.x,py(j));g.lineTo(r.x+r.w,py(j));g.stroke();say(g,j,r.x-fz(10),py(j),10,GREY,700)}
   g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
   const Gl=GOALS[K.gi];if(Gl){g.fillStyle=ORG;g.beginPath();g.arc(px(Gl[0]),py(Gl[1]),7,0,7);g.fill();say(g,`(${Gl[0]}, ${Gl[1]})`,px(Gl[0])+14,py(Gl[1])-12,11,ORG,800,'left')}
   const xe=Math.min(5,6/K.kk);g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=BLUE;g.lineWidth=3.5;g.beginPath();g.moveTo(px(0),py(0));g.lineTo(px(xe),py(K.kk*xe));g.stroke();
   g.setLineDash([5,5]);g.strokeStyle=OK;g.lineWidth=2;g.beginPath();g.moveTo(px(0),py(0));g.lineTo(px(1),py(0));g.lineTo(px(1),py(K.kk));g.stroke();g.setLineDash([]);g.restore();
   say(g,'1',px(.5),py(0)-10,10,OK,800);say(g,`k = ${f(K.kk)}`,px(1)+8,py(K.kk/2),11,OK,800,'left');
   const hx=xe*.85;g.fillStyle=BLUE;g.beginPath();g.arc(px(hx),py(K.kk*hx),11,0,7);g.fill();g.fillStyle=WHITE;g.beginPath();g.arc(px(hx),py(K.kk*hx),4,0,7);g.fill();
   g.fillStyle=INK;g.beginPath();g.arc(px(0),py(0),5,0,7);g.fill();say(g,`y = ${f(K.kk)}x`,r.x+8,r.y+fz(10),14,BLUE,900,'left')}
  function picture(g){const v=part();
   if(v==='table'){head(g,'Apples: x kg cost £y','Tap each row to work out y ÷ x');say(g,'x (kg)',rowR(0).x+rowR(0).w*.17,A.H*.23,12,GREY);say(g,'y (£)',rowR(0).x+rowR(0).w*.45,A.H*.23,12,GREY);say(g,'y ÷ x',rowR(0).x+rowR(0).w*.78,A.H*.23,12,GREY);
    TAB.forEach(([x,y],i)=>{const r=rowR(i),s=K.seen.includes(i);box(g,r,s?'#dbeafe':WHITE,s?BLUE:RULE,s?3:2);say(g,x,r.x+r.w*.17,r.y+r.h/2,16,INK,900);say(g,y,r.x+r.w*.45,r.y+r.h/2,16,INK,900);say(g,s?`${y} ÷ ${x} = ${f(y/x)}`:'tap',r.x+r.w*.78,r.y+r.h/2,s?14:12,s?BLUE:GREY,800)});
    if(K.seen.length>=3)block(g,K.k?`k = 2.5, so y = 2.5x`:'Same every time! So k = ?',A.W/2,A.H*.65,A.W-30,15,K.k?OK:INK)}
   if(v==='sort'){const S=SORTS[K.si];head(g,S?S[0]:'All four sorted!',S?'Is y proportional to x?':'');if(S)[['Proportional','y = kx'],['Not proportional','no single k']].forEach(([a,b],i)=>{const r=twoR(i);box(g,r,i?'#ffedd5':'#dcfce7',i?ORG:OK,3);say(g,a,r.x+r.w/2,r.y+r.h*.38,15,INK,900);say(g,b,r.x+r.w/2,r.y+r.h*.74,11,GREY,700)})}
   if(v==='graph'){const Gl=GOALS[K.gi];say(g,Gl?`Drag the blue dot so the line passes through (${Gl[0]}, ${Gl[1]})`:'All three targets hit!',A.W/2,A.H*.08,13,Gl?INK:OK,800);graph(g)}
   if(v==='use'){const U=USE[K.ui];head(g,U?U[0]:'All three solved!',U?'Find k first, then y = kx':'');if(U)U[1].forEach((o,i)=>{const r=optR(i);box(g,r,WHITE,RULE,2.5);say(g,o,r.x+r.w/2,r.y+r.h/2,16,INK,900)})}
   if(v==='mean'){const M=MEANS[K.mi];head(g,M?M[0]:'All three said in words!',M?'What does k mean?':'');if(M)M[1].forEach((o,i)=>{const r={x:14,y:A.H*(.24+i*.15),w:A.W-28,h:A.H*.12};box(g,r,WHITE,RULE,2.5);block(g,o,A.W/2,r.y+r.h/2,r.w-16,14,INK)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')say(g,'y = kx, and k = y ÷ x',A.W/2,A.H/2,16,INK);else picture(g);note(g);A.fx.draw(g)}
  // ---- moves ----
  function seeRow(i){if(K.seen.includes(i))return;K.seen.push(i);const [x,y]=TAB[i];yes(`${y} ÷ ${x} = 2.5.`+(K.seen.length>=3?' The same every time. Now pick k.':''));sync()}
  function pickK(t){if(K.seen.length<3)return nope('Work out y ÷ x for every row first: one row cannot show the ratio stays the same.');if(K.k)return;
   if(t==='2.5'){K.k=true;yes('k = 2.5: each kg costs £2.50, and y = 2.5x.')}else nope(t==='3'?'That is y − x for the first row (5 − 2). Proportion multiplies, so divide: y ÷ x = 2.5.':'That is x ÷ y. k is y ÷ x, how much y for each 1 of x.');sync()}
  function sortTo(j){const S=SORTS[K.si];if(!S)return;if(j!==(S[1]?0:1))return nope(S[1]?`It is proportional: ${S[2]}`:`Not proportional: ${S[2]}`);yes(S[2]);K.si++;sync()}
  function setK(v){K.kk=Math.max(.25,Math.min(6,Math.round(v*4)/4));A.redraw()}
  function checkK(){const Gl=GOALS[K.gi];if(!Gl)return;const need=Gl[1]/Gl[0];if(Math.abs(K.kk-need)<1e-9){yes(`Through (${Gl[0]}, ${Gl[1]}): k = ${Gl[1]} ÷ ${Gl[0]} = ${f(need)}. The line still starts at (0, 0).`);K.gi++;K.kk=1;sync();return true}
   nope(K.kk>need?`k = ${f(K.kk)} is too steep: at x = ${Gl[0]} the line is at ${f(K.kk*Gl[0])}, above ${Gl[1]}.`:`k = ${f(K.kk)} is too shallow: at x = ${Gl[0]} the line is at ${f(K.kk*Gl[0])}, below ${Gl[1]}.`);sync();return false}
  function use(j){const U=USE[K.ui];if(!U)return;if(j!==U[2])return nope(j===1?`That adds the difference instead of multiplying. ${U[3]}`:`That divides by k instead of multiplying, or uses x ÷ y. ${U[3]}`);yes(U[3]);K.ui++;sync()}
  function mean(j){const M=MEANS[K.mi];if(!M)return;if(j!==M[2])return nope(j===1?'That flips it. k = y ÷ x is how much y for each 1 of x.':'A starting amount would stop the line going through (0, 0). In y = kx, k is the amount for each 1 of x.');yes(M[1][M[2]]+'.');K.mi++;sync()}
  function sync(){const v=part();let t='';
   if(v==='table')t=`Table of apples: 2 kg £5, 4 kg £10, 6 kg £15. Rows worked out: ${K.seen.length} of 3.${K.k?' k = 2.5.':''}`;
   else if(v==='sort'){const S=SORTS[K.si];t=S?`${S[0]}. Proportional or not?`:'All four sorted.'}
   else if(v==='graph'){const Gl=GOALS[K.gi];t=Gl?`Line y = ${f(K.kk)}x through (0, 0). Target point (${Gl[0]}, ${Gl[1]}). At x = ${Gl[0]} the line is at ${f(K.kk*Gl[0])}.`:'All three targets hit.'}
   else if(v==='use'){const U=USE[K.ui];t=U?U[0]:'All three solved.'}
   else if(v==='mean'){const M=MEANS[K.mi];t=M?`${M[0]}. What does k mean?`:'All three done.'}
   else t='Challenge.';tell((K.line?K.line+' ':'')+t);keys();K.fin()}
  function keys(){if(!pad)return;pad.innerHTML='';const v=part(),add=(t,f2,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f2};
   if(v==='table'){TAB.forEach(([x,y],i)=>{if(!K.seen.includes(i))add(`Row ${x} kg, £${y}`,()=>seeRow(i),`Work out y divided by x for ${x} kg`)});if(!K.k)['2.5','3','0.4'].forEach(t=>add(`k = ${t}`,()=>pickK(t)))}
   if(v==='sort'&&SORTS[K.si]){add('Proportional',()=>sortTo(0));add('Not proportional',()=>sortTo(1))}
   if(v==='graph'&&GOALS[K.gi]){add('k − 0.25',()=>{setK(K.kk-.25);sync()},'Make k 0.25 smaller');add('k + 0.25',()=>{setK(K.kk+.25);sync()},'Make k 0.25 bigger');add('Check',checkK,'Check the line against the target')}
   if(v==='use'&&USE[K.ui])USE[K.ui][1].forEach((o,j)=>add(o,()=>use(j)));
   if(v==='mean'&&MEANS[K.mi])MEANS[K.mi][1].forEach((o,j)=>add(o,()=>mean(j)));A.redraw()}
  function down(p){const v=part(),find=(n,fr)=>{for(let i=0;i<n;i++)if(hit(p,fr(i)))return i;return -1};let i;
   if(v==='table'&&(i=find(3,rowR))>=0)seeRow(i);
   if(v==='sort'&&SORTS[K.si]&&(i=find(2,twoR))>=0)sortTo(i);
   if(v==='use'&&(i=find(3,optR))>=0)use(i);
   if(v==='mean'&&MEANS[K.mi]){for(let j=0;j<3;j++)if(hit(p,{x:14,y:A.H*(.24+j*.15),w:A.W-28,h:A.H*.12})){mean(j);break}}
   if(v==='graph'&&GOALS[K.gi]){const r=G();if(p.x>r.x+6&&p.x<r.x+r.w+10&&p.y>r.y-10&&p.y<r.y+r.h){K.drag=true;move(p);return true}}return false}
  function move(p){if(!K.drag)return;const x=Math.max(.2,(p.x-G().x)/G().w*5),y=Math.max(0,(G().y+G().h-p.y)/G().h*6);setK(y/x);tell(`Line y = ${f(K.kk)}x.`)}
  function up(){if(!K.drag)return;K.drag=false;checkK()}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fs=>{const id=++K.id,gap=A.reduced()?15:380;fs.forEach((fn,i)=>setTimeout(()=>{if(id===K.id)fn()},i*gap))};
  const reset=()=>{K.id++;K.fin=()=>{};K.seen=[];K.k=null;K.si=0;K.gi=0;K.kk=1;K.drag=false;K.ui=0;K.mi=0;K.line='';K.bad=false};
  const steps=[
   {h:'Find k in a table',p:'x kg of apples cost £y. Divide y by x on every row. If the answer never changes, that number is k.',
    predict:{q:'x goes 2, 4, 6 and y goes 5, 10, 15. How do you find k?',opts:['y ÷ x','y − x','x ÷ y'],ans:0},
    task:'Work out every row, then pick k',show:()=>{steps[0].go();play([()=>seeRow(0),()=>seeRow(1),()=>seeRow(2),()=>pickK('2.5')])},go:()=>{reset();sync();K.fin=fin(0,()=>K.k,'y ÷ x = 2.5 on every row, so y = 2.5x.')}},
   {h:'Proportional or not?',p:'y is proportional to x only if y ÷ x is the same every time. Then 0 of x gives 0 of y.',
    predict:{q:'A taxi costs £3 to start plus £2 per km. Is the cost proportional to the distance?',opts:['Yes: it goes up by £2 each km','No: at 0 km it already costs £3'],ans:1},
    task:'Sort 4 relationships',show:()=>{steps[1].go();play(SORTS.map(S=>()=>sortTo(S[1]?0:1)))},go:()=>{reset();sync();K.fin=fin(1,()=>K.si>=SORTS.length,'A start charge or a changing y ÷ x means no single k.')}},
   {h:'The graph of y = kx',p:'Every graph of y = kx is a straight line through (0, 0). Drag the blue dot to change k. The green step shows k: go right 1, up k.',
    predict:{q:'The line must pass through (4, 2). What is k?',opts:['2','0.5','−2'],ans:1},
    task:'Hit 3 targets',show:()=>{steps[2].go();play(GOALS.flatMap(([x,y])=>[()=>{setK(y/x);sync()},()=>checkK()]))},go:()=>{reset();sync();K.fin=fin(2,()=>K.gi>=GOALS.length,'k = y ÷ x for any point on the line, and the line always starts at (0, 0).')}},
   {h:'Use k to predict',p:'Find k from the pair you know, then multiply: y = kx.',
    task:'Solve 3 problems',show:()=>{steps[3].go();play(USE.map(U=>()=>use(U[2])))},go:()=>{reset();sync();K.fin=fin(3,()=>K.ui>=USE.length,'k first, then multiply. Adding the difference gives the wrong answer.')}},
   {h:'What k means',p:'k is the amount of y for each 1 of x. Say it in words with its units.',
    task:'Explain 3 values of k',show:()=>{steps[4].go();play(MEANS.map(M=>()=>mean(M[2])))},go:()=>{reset();sync();K.fin=fin(4,()=>K.mi>=MEANS.length,'k is a unit rate: £ per kg, kg per m, km per litre.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>K.fin()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['y is proportional to x, and y = 12 when x = 3. Find k.','4',[['9','sub'],['0.25','flip']]],
   ['y = 6x. What is y when x = 7?','42',[['13','add'],['1.17','flip']]],
   ['Which graph shows direct proportion?','a straight line through (0, 0)',[['any straight line','origin'],['a curve through (0, 0)','curve']]],
   ['Which table is proportional? A: (1, 4), (2, 8), (3, 12). B: (1, 4), (2, 5), (3, 6).','A',[['B','diff'],['Both','diff']]],
   ['Cost = 3 + 2 × hours. Is cost proportional to hours?','No: 0 hours costs 3',[['Yes: it is a straight line','origin'],['Yes: it goes up 2 each hour','diff']]],
   ['5 kg of rice costs £8. What is k in £ per kg?','1.6',[['0.625','flip'],['3','sub']]]];
  function slip(tag){let m='Divide y by x, check it is the same each time, then y = kx.';
   if(tag==='sub')m='That is y − x. Proportion is about multiplying, so k = y ÷ x.';
   if(tag==='flip')m='That is x ÷ y, upside down. k = y ÷ x: how much y for each 1 of x.';
   if(tag==='add')m='That adds 6 and 7. y = 6x means 6 × x, so multiply.';
   if(tag==='origin')m='A straight line is not enough: it must pass through (0, 0), so 0 of x gives 0 of y.';
   if(tag==='curve')m='y = kx is always a straight line: each extra 1 of x adds the same k.';
   if(tag==='diff')m='Going up by the same step is not enough. Check y ÷ x: in B it is 4, 2.5, 2, so it changes.';return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),s=qi%3,order=all.slice(s).concat(all.slice(0,s));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans)});tell('Challenge: '+q);A.redraw()}
  function judge(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
