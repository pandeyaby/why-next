/* Flagship – understanding percentages (ages 9–10; NC England Y5 "recognise the per cent symbol (%) and understand that
   per cent relates to 'number of parts per hundred', and write percentages as a fraction with denominator 100, and as a
   decimal"; CCSS 6.RP.A.3c preview). Tap or drag across a 10×10 hundred square to shade it and read the same amount as
   n/100, a decimal and n%: shade 40%, then shade 0.35, 0.07 and 0.7 (seven hundredths is not seven tenths), make the
   benchmarks half = 50%, a quarter = 25%, a tenth = 10% and the whole = 100%, find the unshaded part as 100% minus the
   shaded part, and sort fraction and decimal cards into a 40% pile or a 4% pile. */
(()=>{
 const DECS=[['0.35',35],['0.07',7],['0.7',70]];
 const MARKS=[['half',50],['a quarter',25],['a tenth',10],['the whole',100]];
 const LEFT=[[35,[[65,'ok'],[35,'same'],[75,'borrow']]],[8,[[92,'ok'],[8,'same'],[2,'borrow']]],[72,[[28,'ok'],[72,'same'],[38,'borrow']]]];
 const CARDS=[['40/100',0,'40 hundredths is 40 per hundred: 40%.'],['0.04',1,'The 4 is in the hundredths place: 4 hundredths, 4%.'],['0.4',0,'0.4 is 4 tenths, which is 40 hundredths: 40%.'],
  ['4/100',1,'4 out of every 100 is 4%.'],['0.40',0,'0.40 and 0.4 are the same: 40 hundredths.'],['4 squares in 100',1,'4 shaded out of 100 is 4%.']];
 const two=n=>n>=100?'1.00':'0.'+String(n).padStart(2,'0');
 VIS.reg('flagpcent',c=>{let A,keys,quiz;
  const S={run:0,n:0,i:0,lft:0,cd:0,pile:[0,0],note:'',oops:false,then:()=>{}};
  const part=()=>['shade','dec','mark','left','sort','chal'][A.step];
  const fz=n=>Math.round(n*(A.narrow?1:1.12));
  const DARK='#172033',SOFT='#475569',RULE='#94a3b8',TENS='#334155',SHADE='#2563eb',BLANK='#ffffff',MINT='#047857',RUST='#b91c1c',GOLD='#fef3c7';
  function txt(g,s,x,y,n,col,al){g.font=`800 ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function wrapT(g,s,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const rows=[];let row='';s.split(' ').forEach(w=>{const t=row?row+' '+w:w;if(row&&g.measureText(t).width>max){rows.push(row);row=w}else row=t});rows.push(row);return rows}
  function box(g,r,fill,line,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=line;g.lineWidth=lw||2;g.stroke()}
  const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function strip(g){if(!S.note)return;const L=wrapT(g,(S.oops?'✗ ':'✓ ')+S.note,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;box(g,{x:10,y,w:A.W-20,h},BLANK,S.oops?RUST:MINT,3);L.forEach((l,k)=>txt(g,l,A.W/2,y+6+lh*(k+.5),13,DARK))}
  const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const miss=s=>{S.oops=true;S.note=s;A.sound.miss();voice(s);A.redraw()};
  const hit=s=>{S.oops=false;S.note=s;A.sound.pop()};
  // ---- the hundred square ----
  function sq(){const side=A.narrow?Math.min(A.W-48,A.H*.52):Math.min(A.H*.72,A.W*.46),u=side/10;
   return A.narrow?{x:(A.W-side)/2,y:A.H*.1,u,side}:{x:28,y:A.H*.13,u,side}}
  function infoAt(){const q=sq();return A.narrow?{x:A.W/2,y:q.y+q.side+fz(22),al:'center'}:{x:q.x+q.side+(A.W-q.x-q.side)/2,y:q.y+fz(30),al:'center'}}
  function drawSquare(g,n){const q=sq();for(let k=0;k<100;k++){const r=Math.floor(k/10),cc=k%10,x=q.x+cc*q.u,y=q.y+r*q.u;g.fillStyle=k<n?SHADE:BLANK;g.fillRect(x,y,q.u,q.u)}
   g.strokeStyle=RULE;g.lineWidth=1;for(let k=0;k<=10;k++){g.beginPath();g.moveTo(q.x+k*q.u,q.y);g.lineTo(q.x+k*q.u,q.y+q.side);g.stroke();g.beginPath();g.moveTo(q.x,q.y+k*q.u);g.lineTo(q.x+q.side,q.y+k*q.u);g.stroke()}
   g.strokeStyle=TENS;g.lineWidth=2.5;g.strokeRect(q.x,q.y,q.side,q.side);for(let r=1;r<10;r++){g.lineWidth=1.6;g.beginPath();g.moveTo(q.x,q.y+r*q.u);g.lineTo(q.x+q.side,q.y+r*q.u);g.stroke()}}
  function readout(g,n,showAll){const at=infoAt(),gap=fz(A.narrow?20:30);
   if(A.narrow){txt(g,showAll?`${n} of 100 = ${n}/100 = ${two(n)} = ${n}%`:`${n} of 100 shaded`,at.x,at.y,15,DARK);return}
   txt(g,`${n} of 100`,at.x,at.y,16,SOFT);txt(g,`${n}/100`,at.x,at.y+gap,20,DARK);if(showAll){txt(g,two(n),at.x,at.y+gap*2,20,DARK);txt(g,`${n}%`,at.x,at.y+gap*3.2,30,SHADE)}}
  function goal(g,s){txt(g,s,A.W/2,A.H*.05,15,DARK)}
  const binAt=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.42,w,h:A.H*.3}};
  function scene(g){const v=part();
   if(v==='shade'){goal(g,'Shade 40% of the hundred square');drawSquare(g,S.n);readout(g,S.n,true)}
   if(v==='dec'){const d=DECS[S.i];if(!d){txt(g,'0.35, 0.07 and 0.7 all shaded',A.W/2,A.H*.4,17,MINT);return}goal(g,`Shade the decimal ${d[0]}`);drawSquare(g,S.n);readout(g,S.n,false)}
   if(v==='mark'){const m=MARKS[S.i];if(!m){txt(g,'50%, 25%, 10% and 100%',A.W/2,A.H*.4,17,MINT);return}goal(g,`Shade ${m[0]} of the square`);drawSquare(g,S.n);readout(g,S.n,false)}
   if(v==='left'){const L=LEFT[S.lft];if(!L){txt(g,'Shaded + not shaded = 100%',A.W/2,A.H*.4,17,MINT);return}goal(g,'What per cent is NOT shaded?');drawSquare(g,L[0]);const at=infoAt();txt(g,`shaded ${L[0]}%`,at.x,at.y,15,SHADE);if(!A.narrow)txt(g,'not shaded ?',at.x,at.y+fz(30),15,DARK)}
   if(v==='sort'){const cd=CARDS[S.cd],top={x:A.W*.2,y:A.H*.08,w:A.W*.6,h:A.H*.24};box(g,top,cd?GOLD:BLANK,cd?'#b45309':RULE,2.5);txt(g,cd?cd[0]:'All 6 cards sorted',A.W/2,top.y+top.h/2,cd?24:15,cd?DARK:MINT);
    ['40%','4%'].forEach((t,k)=>{const b=binAt(k);box(g,b,'#f1f5f9',k?SOFT:SHADE,2.5);txt(g,t,b.x+b.w/2,b.y+b.h*.35,22,k?DARK:SHADE);txt(g,S.pile[k]?'●'.repeat(S.pile[k]):'tap',b.x+b.w/2,b.y+b.h*.72,14,SOFT)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(part()==='chal')txt(g,'Per cent means out of 100.',A.W/2,A.H/2,16,DARK);else scene(g);strip(g);A.fx.draw(g)}
  // ---- actions ----
  function setN(n){n=Math.max(0,Math.min(100,n));if(n===S.n)return;S.n=n;S.oops=false;S.note='';update()}
  const aim=()=>{const v=part();return v==='shade'?40:v==='dec'?(DECS[S.i]||[])[1]:v==='mark'?(MARKS[S.i]||[])[1]:null};
  function check(){const want=aim(),n=S.n;if(want==null)return;const v=part();
   if(n!==want){let m=`You shaded ${n} of 100, which is ${n}%. Count again: you need ${want} squares.`;
    if(v==='dec'&&n*10===want)m=`That is ${two(n)}. ${DECS[S.i][0]} has ${want/10} tenths, and each tenth is a whole row of 10.`;
    if(v==='dec'&&n===want*10)m=`That is ${two(n)}, ten times too big. ${DECS[S.i][0]} is ${want} hundredths: shade just ${want} squares.`;
    if(v==='mark'&&MARKS[S.i][1]===25&&n===4)m='A quarter is not 4%. Split 100 into 4 equal parts: each is 25.';
    if(v==='mark'&&MARKS[S.i][1]===10&&n===1)m='A tenth of the square is one whole row of 10, not 1 square.';
    return miss(m)}
   if(v==='shade'){hit('40 of 100 squares = 40/100 = 0.40 = 40%.');return update()}
   if(v==='dec'){hit(`${DECS[S.i][0]} = ${want}/100 = ${want}%.`);S.i++;S.n=0}
   if(v==='mark'){hit(`${MARKS[S.i][0]} = ${want}/100 = ${want}%.`);S.i++;S.n=0}update()}
  function answerLeft(tag,val){const L=LEFT[S.lft];if(!L)return;if(tag!=='ok')return miss(slip(tag,L[0]));hit(`${L[0]}% + ${val}% = 100%, the whole square.`);S.lft++;update()}
  function sortCard(k){const cd=CARDS[S.cd];if(!cd)return;if(k!==cd[1])return miss(`${cd[0]} is not ${['40%','4%'][k]}. ${cd[2]}`);S.pile[k]++;hit(cd[2]);S.cd++;update()}
  function update(){const v=part();let s='';
   if((v==='dec'||v==='mark')&&aim()==null)s='All done.';
   else if(v==='shade'||v==='dec'||v==='mark')s=`${S.n} of 100 squares shaded, which is ${S.n}/100 = ${two(S.n)} = ${S.n}%. `+(v==='shade'?'Goal: 40%.':v==='dec'?(DECS[S.i]?`Goal: the decimal ${DECS[S.i][0]}.`:'All done.'):(MARKS[S.i]?`Goal: ${MARKS[S.i][0]}.`:'All done.'));
   else if(v==='left')s=LEFT[S.lft]?`${LEFT[S.lft][0]} of 100 squares shaded. What per cent is not shaded?`:'All three done.';
   else if(v==='sort')s=CARDS[S.cd]?`Card: ${CARDS[S.cd][0]}. Is it 40% or 4%?`:'All six cards sorted.';else s='Challenge.';
   voice((S.note?S.note+' ':'')+s);buttons();S.then()}
  function buttons(){if(!keys)return;keys.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
   if((v==='shade'||v==='dec'||v==='mark')&&aim()!=null){b('+10',()=>setN(S.n+10),'Shade 10 more');b('+1',()=>setN(S.n+1),'Shade 1 more');b('−1',()=>setN(S.n-1),'Shade 1 fewer');b('−10',()=>setN(S.n-10),'Shade 10 fewer');b('Clear',()=>setN(0),'Clear the square');b('Check',check,'Check my shading')}
   if(v==='left'&&LEFT[S.lft]){const L=LEFT[S.lft],o=L[1].slice(S.lft).concat(L[1].slice(0,S.lft));o.forEach(([val,tag])=>b(`${val}%`,()=>answerLeft(tag,val),`Not shaded ${val}%`))}
   if(v==='sort'&&CARDS[S.cd])['40%','4%'].forEach((t,k)=>b(t,()=>sortCard(k),`Put it in ${t}`));A.redraw()}
  let painting=false;
  function cellAt(p){const q=sq();if(p.x<q.x||p.y<q.y||p.x>q.x+q.side||p.y>q.y+q.side)return -1;return Math.min(9,Math.floor((p.y-q.y)/q.u))*10+Math.min(9,Math.floor((p.x-q.x)/q.u))}
  function down(p){const v=part();
   if((v==='shade'||v==='dec'||v==='mark')&&aim()!=null){const k=cellAt(p);if(k<0)return false;setN(S.n===k+1?k:k+1);painting=true;return true}
   if(v==='sort'){const k=[0,1].find(k=>inside(p,binAt(k)));if(k!=null)sortCard(k)}return false}
  function move(p){if(!painting)return;const k=cellAt(p);if(k>=0)setN(k+1)}
  function up(){painting=false}
  // ---- steps ----
  const close=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fs=>{const id=++S.run,gap=A.reduced()?15:260;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*gap))};
  const reset=()=>{S.run++;S.then=()=>{};S.n=0;S.i=0;S.lft=0;S.cd=0;S.pile=[0,0];S.note='';S.oops=false};
  const fill=t=>{const fs=[];for(let k=10;k<=t;k+=10)fs.push(((x)=>()=>setN(x))(k));if(t%10)fs.push(()=>setN(t));fs.push(check);return fs};
  const steps=[
   {h:'Per cent means per hundred',p:'The big square has 100 small squares. Tap or drag to shade them, then press Check.',
    predict:{q:'What does 40% mean?',opts:['40 out of every 100','40 out of 10','4 out of 100'],ans:0},
    task:'Shade 40% and check',show:()=>{steps[0].go();play(fill(40))},go:()=>{reset();update();S.then=close(0,()=>S.note.startsWith('40 of 100'),'40% is 40 squares out of 100: 40/100, or 0.40.')}},
   {h:'Decimals are hundredths too',p:'A decimal with two places counts hundredths. Shade each decimal, then check.',
    predict:{q:'How many squares does 0.07 need?',opts:['7 squares','70 squares'],ans:0},
    task:'Shade 3 decimals',show:()=>{steps[1].go();play(DECS.flatMap(d=>fill(d[1])))},go:()=>{reset();update();S.then=close(1,()=>S.i>=DECS.length,'0.35 = 35%, 0.07 = 7% and 0.7 = 70%. The tenths digit counts whole rows.')}},
   {h:'Half, quarter, tenth, whole',p:'Shade each part of the square. Then read it as a per cent.',
    predict:{q:'A quarter of the square is what per cent?',opts:['25%','4%','14%'],ans:0},
    task:'Shade 4 parts',show:()=>{steps[2].go();play(MARKS.flatMap(m=>fill(m[1])))},go:()=>{reset();update();S.then=close(2,()=>S.i>=MARKS.length,'Half = 50%, a quarter = 25%, a tenth = 10% and the whole = 100%.')}},
   {h:'The whole is 100%',p:'Some squares are shaded. The rest are not. Together they make the whole: 100%.',
    task:'Answer 3 squares',show:()=>{steps[3].go();play(LEFT.map(L=>()=>answerLeft('ok',100-L[0])))},go:()=>{reset();update();S.then=close(3,()=>S.lft>=LEFT.length,'65%, 92% and 28%. Shaded plus not shaded is always 100%.')}},
   {h:'40% or 4%?',p:'Each card is one amount. Tap the 40% box or the 4% box for it.',
    task:'Sort 6 cards',show:()=>{steps[4].go();play(CARDS.map(cd=>()=>sortCard(cd[1])))},go:()=>{reset();update();S.then=close(4,()=>S.cd>=CARDS.length,'0.4, 0.40 and 40/100 are 40%. 0.04 and 4/100 are 4%.')}},
   {h:'Challenge',p:'',go:()=>{reset();askNext()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
  // ---- challenge: every wrong answer names its slip ----
  const Q=[['Write 35% as a decimal.','0.35',[['3.5','big'],['0.035','small']]],
   ['Write 0.07 as a per cent.','7%',[['70%','tenth'],['0.07%','keep']]],
   ['Write 60% as a fraction.','60/100',[['60/10','ten'],['6/100','drop']]],
   ['A spelling test: Mia gets 100%. What does that mean?','She got every mark: the whole',[['She got 100 marks','count'],['She got nearly all of them','most']]],
   ['45 squares out of 100 are shaded. What per cent is not shaded?','55%',[['45%','same'],['65%','borrow']],45],
   ['Which is more: 0.5 or 45%?','0.5, because it is 50%',[['45%, because 45 is more than 5','digits'],['They are the same','equal']]]];
  function slip(tag,p){let m='Per cent means out of 100.';
   if(tag==='big')m='3.5 is more than 1 whole, so it is 350%. Per cent means hundredths: 35% = 35/100 = 0.35.';
   if(tag==='small')m='0.035 is 3.5 thousandths. 35% is 35 hundredths: 0.35.';
   if(tag==='tenth')m='70% is 0.70. In 0.07 the 7 is in the hundredths place, so it is 7 hundredths: 7%.';
   if(tag==='keep')m='Changing to a per cent changes how it is written. 0.07 = 7/100 = 7%.';
   if(tag==='ten')m='Per cent is out of 100, not out of 10. 60% = 60/100.';
   if(tag==='drop')m='6/100 is 6%. Keep both digits: 60% = 60/100.';
   if(tag==='count')m='100% does not mean 100 marks. It means all of them, the whole test, however many marks it had.';
   if(tag==='most')m='Nearly all would be about 90%. 100% is the whole: every single mark.';
   if(tag==='same')m=`That is the shaded part. The part not shaded is the rest of the 100%: 100 − ${p}.`;
   if(tag==='borrow')m=`Check by adding: your answer plus ${p}% must make exactly 100%. Count on from ${p} to 100.`;
   if(tag==='digits')m='Compare amounts, not digits. 0.5 = 0.50 = 50 hundredths = 50%, which is more than 45%.';
   if(tag==='equal')m='0.5 is 5 tenths, which is 50 hundredths: 50%, not 45%.';
   return m}
  let qn=-1,run=0;
  function askNext(){qn++;const [q,ans,bad,pp]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans,pp)});voice('Challenge: '+q);A.redraw()}
  function mark(tag,ans,pp){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');
   if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+slip(tag,pp)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=askNext}
  A=FK.shell(c,{steps,ratio:.6,tall:1.08,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
