/* Flagship – multiplication as scaling (ages 10–11; CCSS 5.NF.B.5a–b, NC England Y5/Y6 "scaling by simple fractions").
   A ribbon is stretched or squashed by a scale factor dragged along a 0–3 line: factors above 1 lengthen it, below 1
   shorten it, exactly 1 keeps it. Then sort products against the starting number without multiplying, pick the larger
   of two products that share a factor, and see that × n/n splits each part but keeps the amount (equivalent fractions).
   Drag or tap on the canvas; a button row below repeats every move. */
(()=>{
 const BASE=8,MAXQ=12;                                  // ribbon is 8 cm; factor = q quarters, q = 0..12 (0 to 3)
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 const frac=q=>{if(q===0)return'0';const g=gcd(q,4),n=q/g,d=4/g;return d===1?String(n):`${n}/${d}`};
 /* sort cards: the same start number 9, a factor as text, and how the factor compares with 1 (-1, 0, +1) */
 const CARDS=[['9 × 5/4',1],['9 × 2/3',-1],['9 × 4/4',0],['9 × 7/8',-1],['9 × 1 1/2',1],['9 × 6/6',0]];
 const BINS=['less than 9','exactly 9','more than 9'];
 /* pairs: shared number, two factors (as text and value); answer = index of the larger product */
 const PAIRS=[[12,['2/3',2/3],['3/4',3/4]],[20,['5/4',5/4],['4/5',4/5]],[30,['9/10',.9],['1 1/10',1.1]]];
 const SPLIT=[2,3,4];
 VIS.reg('flagxscale',c=>{let A,row,chal;
  const S={tick:0,q:4,seen:{},card:0,bins:[[],[],[]],pair:0,last:null,n:1,msg:'',bad:false,drag:false,check:()=>{}};
  const scene=()=>['stretch','shrink','sort','pair','split','chal'][A.step];
  const big=k=>Math.round(k*(A.narrow?1:1.12));
  const ink=(g,s,x,y,k,col,w,al)=>{g.font=`${w||700} ${big(k)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)};
  function para(g,s,x,y,k,col,maxw){g.font=`700 ${big(k)}px system-ui,sans-serif`;const L=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxw){L.push(cur);cur=w}else cur=t});L.push(cur);const lh=big(k)+5;L.forEach((l,i)=>ink(g,l,x,y+(i-(L.length-1)/2)*lh,k,col))}
  function box(g,r,col,a,w){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=col;g.lineWidth=w||1.8;g.stroke()}
  const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function banner(g){if(!S.msg)return;const C=A.col;g.font=`700 ${big(13)}px system-ui,sans-serif`;const L=[];let cur='';((S.bad?'✗ ':'✓ ')+S.msg).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>A.W-44){L.push(cur);cur=w}else cur=t});L.push(cur);
   const lh=big(13)+5,h=L.length*lh+12,y=A.H-h-6;box(g,{x:12,y,w:A.W-24,h},S.bad?C.rd:C.gr,.13);L.forEach((l,i)=>ink(g,l,A.W/2,y+6+lh*(i+.5),13,C.tx))}
  const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const wrong=t=>{S.bad=true;S.msg=t;A.sound.miss();say(t);A.redraw()};
  const right=t=>{S.bad=false;S.msg=t;A.sound.pop()};
  // ---- ribbon geometry: 0..24 cm across the canvas, factor line 0..3 underneath ----
  const L0=26,cm=v=>L0+v/24*(A.W-2*L0),qx=q=>L0+q/MAXQ*(A.W-2*L0),xq=x=>Math.round((x-L0)/(A.W-2*L0)*MAXQ);
  const tone=q=>q<4?A.col.vi:q>4?A.col.gr:A.col.am;
  function ribbons(g,C){const y1=A.H*.27,y2=A.H*.46,h=A.H*.07,len=BASE*S.q/4;
   ink(g,'start: 8 cm',L0,y1-h*.95,12,C.mu,700,'left');g.fillStyle=A.alpha(C.mu,.35);g.fillRect(cm(0),y1-h/2,cm(BASE)-cm(0),h);
   ink(g,`8 × ${frac(S.q)} = ${len} cm`,L0,y2-h*.95,14,C.tx,800,'left');g.fillStyle=tone(S.q);g.fillRect(cm(0),y2-h/2,Math.max(2,cm(len)-cm(0)),h);
   g.strokeStyle=C.mu;g.setLineDash([5,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(cm(BASE),y1-h*.7);g.lineTo(cm(BASE),y2-h*1.35);g.moveTo(cm(BASE),y2-h*.6);g.lineTo(cm(BASE),y2+h*.7);g.stroke();g.setLineDash([]);
   for(let v=0;v<=24;v+=4){const x=cm(v);g.strokeStyle=C.mu;g.beginPath();g.moveTo(x,y2+h/2+2);g.lineTo(x,y2+h/2+7);g.stroke();ink(g,v,x,y2+h/2+16,10,C.tx,600)}
   const yl=A.H*.72;ink(g,'scale factor: drag the dot',A.W/2,yl-A.H*.09,12,C.mu,700);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(qx(0),yl);g.lineTo(qx(MAXQ),yl);g.stroke();
   for(let q=0;q<=MAXQ;q++){const x=qx(q),major=q%2===0;g.lineWidth=q===4?3:1.4;g.strokeStyle=q===4?C.am:C.tx;g.beginPath();g.moveTo(x,yl-(major?8:5));g.lineTo(x,yl+(major?8:5));g.stroke();if(major)ink(g,frac(q),x,yl+20,11,C.tx,700)}
   g.fillStyle=tone(S.q);g.beginPath();g.arc(qx(S.q),yl,A.narrow?12:13,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
   const hd=S.q<4?'less than 1: shorter':S.q>4?'more than 1: longer':'exactly 1: same length';ink(g,hd,A.W/2,A.H*.08,14,C.tx,800);g.font=`800 ${big(14)}px system-ui,sans-serif`;g.fillStyle=tone(S.q);g.beginPath();g.arc(A.W/2-g.measureText(hd).width/2-12,A.H*.08,6,0,7);g.fill()}
  const binR=k=>{const w=(A.W-40)/3;return{x:14+k*(w+6),y:A.H*.36,w,h:A.H*.42}};
  function sorter(g,C){const cur=CARDS[S.card];if(cur){const r={x:A.W/2-big(70),y:A.H*.06,w:big(140),h:A.H*.17};box(g,r,C.cy,.16,3);ink(g,cur[0],A.W/2,r.y+r.h/2,20,C.tx,800)}
   else para(g,'All sorted, and nothing was multiplied out.',A.W/2,A.H*.14,14,C.gr,A.W-40);
   BINS.forEach((b,k)=>{const r=binR(k);box(g,r,[C.vi,C.am,C.gr][k],.1,2);ink(g,b,r.x+r.w/2,r.y+14,A.narrow?11:12,C.tx,800);S.bins[k].forEach((t,i)=>ink(g,t,r.x+r.w/2,r.y+38+i*big(22),A.narrow?12:13,C.tx,700))})}
  const pairR=k=>{const w=(A.W-42)/2;return{x:14+k*(w+14),y:A.H*.08,w,h:A.H*.2}};
  function pairs(g,C){const P=PAIRS[S.pair];if(P)[1,2].forEach((j,k)=>{const r=pairR(k);box(g,r,C.cy,.14,2.5);ink(g,`${P[0]} × ${P[j][0]}`,r.x+r.w/2,r.y+r.h/2,19,C.tx,800)});
   else para(g,'Same number, bigger factor, bigger product.',A.W/2,A.H*.18,14,C.gr,A.W-40);
   const L=S.last;if(!L)return para(g,'Tap the larger product. Do not multiply: compare the two factors.',A.W/2,A.H*.5,13,C.tx,A.W-40);
   const top=Math.max(L[0]*L[1][1],L[0]*L[2][1],L[0]),u=v=>(A.W-2*L0)*v/top;[[`${L[0]}`,L[0],C.mu],[`${L[0]} × ${L[1][0]} = ${+(L[0]*L[1][1]).toFixed(2)}`,L[0]*L[1][1],C.vi],[`${L[0]} × ${L[2][0]} = ${+(L[0]*L[2][1]).toFixed(2)}`,L[0]*L[2][1],C.pk]].forEach(([t,v,col],i)=>{const y=A.H*(.4+i*.13);g.fillStyle=col;g.fillRect(L0,y,u(v),A.H*.05);ink(g,t,L0,y-A.H*.035,12,C.tx,700,'left')})}
  const chipR=k=>{const w=(A.W-48)/3;return{x:16+k*(w+8),y:A.H*.6,w,h:A.H*.13}};
  function split(g,C){const x0=24,w=A.W-48,y=A.H*.2,h=A.H*.15,n=S.n;ink(g,n===1?'3/5':`3/5 × ${n}/${n} = ${3*n}/${5*n}`,A.W/2,A.H*.08,17,C.tx,800);
   for(let i=0;i<5;i++){g.fillStyle=i<3?A.alpha(C.cy,.55):A.alpha(C.mu,.12);g.fillRect(x0+i*w/5,y,w/5,h)}g.strokeStyle=C.tx;g.lineWidth=2.5;for(let i=0;i<=5;i++){g.beginPath();g.moveTo(x0+i*w/5,y);g.lineTo(x0+i*w/5,y+h);g.stroke()}g.strokeRect(x0,y,w,h);
   g.lineWidth=1;for(let i=0;i<5*n;i++){if(i%n===0)continue;g.beginPath();g.moveTo(x0+i*w/(5*n),y+4);g.lineTo(x0+i*w/(5*n),y+h-4);g.stroke()}
   g.strokeStyle=C.am;g.lineWidth=3;g.beginPath();g.moveTo(x0+w*3/5,y-8);g.lineTo(x0+w*3/5,y+h+8);g.stroke();ink(g,'shaded amount',x0+w*3/5,y+h+20,11,C.tx,700);
   para(g,`${3*n} of ${5*n} parts shaded: the shaded length has not moved.`,A.W/2,A.H*.5,13,C.tx,A.W-40);
   SPLIT.forEach((m,k)=>{const r=chipR(k);box(g,r,m===n?C.am:C.cy,m===n?.3:.12,m===n?3:1.8);ink(g,`× ${m}/${m}`,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)})}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);const v=scene();
   if(v==='stretch'||v==='shrink')ribbons(g,C);else if(v==='sort')sorter(g,C);else if(v==='pair')pairs(g,C);else if(v==='split')split(g,C);else ink(g,'× more than 1 grows · × less than 1 shrinks',A.W/2,A.H/2,14,C.tx);banner(g);A.fx.draw(g)}
  // ---- moves ----
  function setQ(q){S.q=Math.max(0,Math.min(MAXQ,q));S.seen[S.q]=1;const len=BASE*S.q/4;
   right(S.q===4?'× 1 keeps 8 cm: multiplying by one whole changes nothing.':S.q<4?`8 × ${frac(S.q)} = ${len} cm. The factor is less than 1, so you get part of the 8.`:`8 × ${frac(S.q)} = ${len} cm. The factor is more than 1, so the ribbon grows.`);sync()}
  function place(k){const cur=CARDS[S.card];if(!cur)return;const want=cur[1]+1;
   if(k!==want){if(want===1)return wrong(`${cur[0].split('× ')[1]} is one whole, so ${cur[0]} is exactly 9.`);if(want===0)return wrong(`${cur[0].split('× ')[1]} is less than 1, so you only get part of 9. Multiplying does not always make bigger.`);return wrong(`${cur[0].split('× ')[1]} is more than 1, so 9 is scaled up past 9.`)}
   S.bins[k].push(cur[0]);S.card++;right(`${cur[0]} is ${BINS[k]}.`);sync()}
  function choose(k){const P=PAIRS[S.pair];if(!P)return;const a=P[1][1],b=P[2][1],want=a>b?0:1;
   if(k!==want){const lo=P[1+k];return wrong(`Both start at ${P[0]}. ${lo[0]} is the smaller factor, so ${P[0]} × ${lo[0]} is the smaller product.`)}
   S.last=P;S.pair++;right(`${P[0]} × ${P[1+want][0]} is larger: same ${P[0]}, bigger factor.`);sync()}
  function splitBy(m){S.n=m;if(m!==4){wrong(`3/5 × ${m}/${m} = ${3*m}/${5*m}: the same amount, but cut into ${5*m} parts, not 20. 5 × 4 = 20, so use 4/4.`);S.bad=true;return sync()}right('3/5 × 4/4 = 12/20. Each fifth is cut into 4, so there are 20 parts and 12 are shaded: the same amount.');sync()}
  function sync(){const v=scene();let s='';
   if(v==='stretch'||v==='shrink')s=`Scale factor ${frac(S.q)}. Ribbon ${BASE*S.q/4} cm, start 8 cm.`;
   else if(v==='sort')s=CARDS[S.card]?`Card: ${CARDS[S.card][0]}. Is it less than 9, exactly 9 or more than 9?`:'All six cards sorted.';
   else if(v==='pair')s=PAIRS[S.pair]?`Which is larger: ${PAIRS[S.pair][0]} × ${PAIRS[S.pair][1][0]} or ${PAIRS[S.pair][0]} × ${PAIRS[S.pair][2][0]}?`:'All three pairs done.';
   else if(v==='split')s=S.n===1?'Three fifths shaded. Choose times 2/2, 3/3 or 4/4.':`3/5 × ${S.n}/${S.n} = ${3*S.n}/${5*S.n}.`;else s='Challenge.';
   say((S.msg?S.msg+' ':'')+s);buttons();S.check()}
  function buttons(){if(!row)return;row.innerHTML='';const v=scene(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);e.onclick=f};
   if(v==='stretch'||v==='shrink'){b('− 1/4',()=>setQ(S.q-1),'Scale factor down a quarter');b('+ 1/4',()=>setQ(S.q+1),'Scale factor up a quarter');b('× 1',()=>setQ(4),'Scale factor exactly 1')}
   if(v==='sort'&&CARDS[S.card])BINS.forEach((t,k)=>b(t,()=>place(k),`${CARDS[S.card][0]} is ${t}`));
   if(v==='pair'&&PAIRS[S.pair]){const P=PAIRS[S.pair];[1,2].forEach((j,k)=>b(`${P[0]} × ${P[j][0]}`,()=>choose(k),`${P[0]} times ${P[j][0]} is larger`))}
   if(v==='split')SPLIT.forEach(m=>b(`× ${m}/${m}`,()=>splitBy(m),`Multiply 3/5 by ${m}/${m}`));A.redraw()}
  function down(p){const v=scene();
   if(v==='stretch'||v==='shrink'){if(Math.abs(p.y-A.H*.72)<A.H*.12){S.drag=true;S.q=Math.max(0,Math.min(MAXQ,xq(p.x)));A.redraw();return true}return false}
   if(v==='sort'){const k=[0,1,2].find(k=>within(p,binR(k)));if(k!=null)place(k);return false}
   if(v==='pair'){const k=[0,1].find(k=>within(p,pairR(k)));if(k!=null)choose(k);return false}
   if(v==='split'){const k=[0,1,2].find(k=>within(p,chipR(k)));if(k!=null)splitBy(SPLIT[k]);return false}return false}
  function move(p){if(!S.drag)return;S.q=Math.max(0,Math.min(MAXQ,xq(p.x)));A.redraw()}
  function up(){if(!S.drag)return;S.drag=false;setQ(S.q)}
  // ---- steps ----
  const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play=fs=>{const id=++S.tick,gap=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===S.tick)f()},i*gap))};
  const reset=()=>{S.tick++;S.check=()=>{};S.q=4;S.seen={};S.card=0;S.bins=[[],[],[]];S.pair=0;S.last=null;S.n=1;S.msg='';S.bad=false;S.drag=false};
  const walkTo=t=>{const fs=[];let q=S.q;while(q!==t){q+=q<t?1:-1;const k=q;fs.push(()=>setQ(k))}return fs};
  const steps=[
   {h:'Times can stretch',p:'Multiplying by a number can be read as scaling: resizing something. Drag the dot along the scale-factor line, or use the buttons, and watch the 8 cm ribbon.',
    task:'Make the ribbon 12 cm long',show:()=>{steps[0].go();play(walkTo(6))},go:()=>{reset();sync();S.check=when(0,()=>S.q===6,'8 × 3/2 = 12 cm. A factor of 1 1/2 makes it one and a half times as long.')}},
   {h:'Less than 1 shrinks',p:'Now try factors smaller than one whole. Keep your eye on the dashed line at 8 cm.',
    predict:{q:'8 × 3/4: is the answer more or less than 8?',opts:['More: multiplying always makes a number bigger','Less: 3/4 is less than 1, so you get part of 8'],ans:1},
    task:'Make 6 cm, then 2 cm',show:()=>{steps[1].go();play(walkTo(3).concat([()=>setQ(2),()=>setQ(1)]))},
    go:()=>{reset();sync();S.check=when(1,()=>S.seen[3]&&S.seen[1],'8 × 3/4 = 6 and 8 × 1/4 = 2. Every factor below 1 gave less than 8.')}},
   {h:'Sort without working out',p:'You do not need to multiply. Compare the factor with 1: more than 1 gives more than 9, less than 1 gives less, exactly 1 gives 9. Tap a box for each card.',
    predict:{q:'Where does 9 × 4/4 go?',opts:['More than 9: 4 and 4 make it bigger','Exactly 9: 4/4 is one whole'],ans:1},
    task:'Sort 6 cards',show:()=>{steps[2].go();play(CARDS.map(cd=>()=>place(cd[1]+1)))},go:()=>{reset();sync();S.check=when(2,()=>S.card>=CARDS.length,'Two less, two exactly 9, two more. The size of the factor decided each one.')}},
   {h:'Which product is larger?',p:'Each pair multiplies the same number by two different factors. Pick the larger product by comparing the factors only.',
    task:'Answer 3 pairs',show:()=>{steps[3].go();play(PAIRS.map(P=>()=>choose(P[1][1]>P[2][1]?0:1)))},go:()=>{reset();sync();S.check=when(3,()=>S.pair>=PAIRS.length,'The larger factor always gave the larger product, and only factors above 1 went past the start number.')}},
   {h:'Times one whole',p:'n/n is one whole, so multiplying by it keeps the amount. Choose a multiplier for 3/5 and look at the shaded part.',
    predict:{q:'3/5 × 4/4 = 12/20. Is 12/20 more than 3/5?',opts:['Yes: 12 and 20 are bigger numbers','No: 4/4 is 1, so it is the same amount'],ans:1},
    task:'Write 3/5 in twentieths',show:()=>{steps[4].go();play([()=>splitBy(4)])},go:()=>{reset();sync();S.check=when(4,()=>S.n===4,'3/5 = 12/20. Multiplying by 4/4 made more, smaller parts, not a bigger amount.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['Without multiplying: 48 × 5/6 is…','less than 48',[['more than 48','grow'],['exactly 48','one']]],
   ['7/7 × 15 = ?','15',[['105','tops'],['more than 15','grow']]],
   ['Which is greater: 30 × 1 1/4 or 30 × 3/4?','30 × 1 1/4',[['30 × 3/4','lt1'],['They are equal','same']]],
   ['A photo 10 cm wide is scaled by 2/5. How wide is it now?','4 cm',[['25 cm','divide'],['12 cm','add']]],
   ['Sam says 5/2 × 8 is less than 8 because it has a fraction. Is he right?','No: 5/2 is more than 1, so it is 20',[['Yes: fractions make numbers smaller','fracsmall'],['Yes: 5/2 is less than 8','vs8']]],
   ['2/3 = ?/12. What should 2/3 be multiplied by?','4/4',[['2/2','parts'],['12/12','overshoot']]]];
  function slip(tag,w){let m='Compare the factor with 1 before you work anything out.';
   if(tag==='grow')m=`${w}: multiplying makes a number bigger only when the factor is more than 1.`;
   if(tag==='one')m=`${w} would need a factor of exactly 1. 5/6 is less than 1.`;
   if(tag==='tops')m='105 is 7 × 15: the bottom 7 was ignored. 7/7 is one whole, so 7/7 × 15 = 15.';
   if(tag==='lt1')m='3/4 is less than 1, so 30 × 3/4 is less than 30. 1 1/4 is more than 1.';
   if(tag==='same')m='Same 30, but different factors: the bigger factor gives the bigger product.';
   if(tag==='divide')m='25 is 10 ÷ 2/5. Scaling by 2/5 means × 2/5: 10 ÷ 5 × 2 = 4.';
   if(tag==='add')m='12 is 10 + 2. Scaling multiplies, it never adds.';
   if(tag==='fracsmall')m='Only fractions less than 1 shrink. 5/2 = 2 1/2, which stretches 8 to 20.';
   if(tag==='vs8')m='Compare the factor with 1, not with 8. 5/2 is more than 1, so the product is more than 8.';
   if(tag==='parts')m='2/3 × 2/2 = 4/6: sixths, not twelfths. 3 × 4 = 12, so use 4/4.';
   if(tag==='overshoot')m='2/3 × 12/12 = 24/36: equal, but in 36ths. You need 3 × 4 = 12, so use 4/4.';
   return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>mark(tag,w,ans)});say('Challenge: '+q);A.redraw()}
  function mark(tag,w,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag,w)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.6,tall:1.0,draw,onStep:A=>{chal.hidden=A.step!==5;row.hidden=A.step===5;buttons()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Scaling controls'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
