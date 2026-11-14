/* Flagship – multiplying fractions by whole numbers (ages 9–10; NC England Y5 "multiply proper fractions and mixed numbers
   by whole numbers, supported by materials and diagrams"; CCSS 4.NF.B.4). n × a/b is n copies of a/b: stack copies of a
   fraction piece on bars split into b equal parts and count the parts: only the number of parts changes, never their size.
   Go past one whole, pack full bars into a mixed number, multiply a mixed number by copying its wholes and its parts,
   and build target products from a fraction card and a number of copies. */
(()=>{
 const COPYC=['#2563eb','#c2410c','#7c3aed','#0f766e','#be123c','#a16207','#4338ca','#15803d'];
 const GOALS=[[3,2],[2,1],[5,2]];// target as [numerator, denominator]: 3/2, 2, 5/2
 const CARDS=[[1,2],[1,4],[3,4],[1,3],[2,3]];
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 const mixed=(p,q)=>{const w=Math.floor(p/q),r=p%q;return w&&r?`${w} ${r}/${q}`:w?`${w}`:`${r}/${q}`};
 VIS.reg('flagfxw',c=>{let A,pad,chal;
  const F={go:0,n:0,packed:0,picked:null,mi:0,card:1,k:1,hit:0,note:'',bad:false,fin:()=>{}};
  const mode=()=>['copy','past','pack','mixed','make','chal'][A.step];
  const z=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#111827',GREY='#4b5563',RULE='#6b7280',WHITE='#ffffff',OK='#047857',BAD='#b91c1c',CREAM='#fefce8',EDGE2='#a16207';
  function word(g,s,x,y,n,col,al){g.font=`800 ${z(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function rows(g,s,max,n){g.font=`800 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t});out.push(cur);return out}
  function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function notice(g){if(!F.note)return;const L=rows(g,(F.bad?'✗ ':'✓ ')+F.note,A.W-44,13),lh=z(13)+6,h=L.length*lh+12,y=A.H-h-6;tile(g,{x:10,y,w:A.W-20,h},WHITE,F.bad?BAD:OK,3);L.forEach((l,i)=>word(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const read=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
  const miss=s=>{F.bad=true;F.note=s;A.sound.miss();read(s);A.redraw()};
  const hitIt=s=>{F.bad=false;F.note=s;A.sound.pop()};
  // the problem for each teaching step: n copies of a/b
  const PROB={copy:[3,2,5],past:[5,1,4],pack:[4,3,8]};
  const area=()=>({x:14,y:A.H*.3,w:A.W-28});
  const barR=(i,bars)=>{const a=area(),h=Math.min(A.H*.11,(A.H*.4)/bars-8);return{x:a.x,y:a.y+i*(h+10),w:a.w,h}};
  function bars(g,b,pieces,a,bars){// pieces: number of 1/b parts filled; coloured by which copy they came from
   for(let i=0;i<bars;i++){const r=barR(i,bars);tile(g,r,WHITE,RULE,2);const pw=r.w/b;
    for(let j=0;j<b;j++){const idx=i*b+j;if(idx<pieces){const cp=Math.floor(idx/a);g.fillStyle=COPYC[cp%COPYC.length];g.fillRect(r.x+j*pw+2,r.y+2,pw-4,r.h-4)}}
    g.strokeStyle=RULE;g.lineWidth=1.5;for(let j=1;j<b;j++){g.beginPath();g.moveTo(r.x+j*pw,r.y);g.lineTo(r.x+j*pw,r.y+r.h);g.stroke()}
    const full=pieces>=(i+1)*b;word(g,full?(mode()==='pack'&&i<F.packed?'1 whole ✓':'1 whole'):'',r.x+r.w-6,r.y-z(8),11,full?OK:GREY,'right')}}
  function head(g,s,col){const r={x:12,y:A.H*.04,w:A.W-24,h:A.H*.2};tile(g,r,CREAM,EDGE2,2.5);const L=rows(g,s,r.w-20,16);L.forEach((l,i)=>word(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*z(21),16,col||INK))}
  const cardR=k=>{const w=(A.W-24-8*4)/5;return{x:12+k*(w+8),y:A.H*.27,w,h:A.H*.12}};
  function picture(g){const v=mode();
   if(v==='copy'||v==='past'||v==='pack'){const [n,a,b]=PROB[v],have=v==='pack'?n:F.n,parts=have*a,nb=Math.max(1,Math.ceil(n*a/b));
    head(g,v==='pack'?`${n} × ${a}/${b} = ${n*a}/${b}. How many wholes?`:`${n} × ${a}/${b}: copies so far ${have} of ${n}`);
    bars(g,b,parts,a,nb);const y=barR(nb-1,nb).y+barR(0,nb).h+z(20);
    word(g,have?`${Array(have).fill(`${a}/${b}`).join(' + ')} = ${parts}/${b}`:'Tap the bars to add a copy',A.W/2,y,14,have?INK:GREY);
    if(have&&parts>=b)word(g,`= ${mixed(parts,b)}`,A.W/2,y+z(20),14,OK)}
   if(v==='mixed'){head(g,`2 1/3 × 3: copies so far ${F.n} of 3`);const top=A.H*.3,rh=Math.min(A.H*.11,A.H*.36/3-8),sq=rh;
    for(let i=0;i<3;i++){const y=top+i*(rh+10);word(g,`copy ${i+1}`,14,y+rh/2,11,i<F.n?INK:GREY,'left');const x0=14+z(52);
     for(let w=0;w<2;w++){const r={x:x0+w*(sq*1.5+8),y,w:sq*1.5,h:rh};tile(g,r,i<F.n?COPYC[i]:WHITE,RULE,2);if(i<F.n)word(g,'1',r.x+r.w/2,r.y+r.h/2,13,WHITE)}
     const r={x:x0+2*(sq*1.5+8),y,w:sq*1.5,h:rh};tile(g,r,WHITE,RULE,2);g.fillStyle=i<F.n?COPYC[i]:WHITE;if(i<F.n)g.fillRect(r.x+2,r.y+2,r.w/3-3,r.h-4);g.strokeStyle=RULE;[1,2].forEach(t=>{g.beginPath();g.moveTo(r.x+t*r.w/3,r.y);g.lineTo(r.x+t*r.w/3,r.y+r.h);g.stroke()})}
    const y=top+3*(rh+10)+z(10);word(g,`wholes: ${2*F.n}   thirds: ${F.n}/3`,A.W/2,y,14,INK);if(F.n===3)word(g,'3/3 makes 1 more whole: 6 + 1 = 7',A.W/2,y+z(20),14,OK)}
   if(v==='make'){const G=GOALS[F.mi];head(g,G?`Make ${mixed(G[0],G[1])} (target ${F.mi+1} of 3)`:'All 3 targets made',G?INK:OK);
    CARDS.forEach(([a,b],k)=>{const r=cardR(k),on=k===F.card;tile(g,r,on?'#dbeafe':WHITE,on?'#1d4ed8':RULE,on?3.5:2);word(g,`${a}/${b}`,r.x+r.w/2,r.y+r.h/2,15,INK)});
    const [a,b]=CARDS[F.card],parts=F.k*a,nb=Math.min(3,Math.max(1,Math.ceil(parts/b)));
    const sav=area;const yb=A.H*.44;for(let i=0;i<nb;i++){const h=Math.min(A.H*.08,A.H*.24/nb-6),r={x:14,y:yb+i*(h+8),w:A.W-28,h};tile(g,r,WHITE,RULE,2);const pw=r.w/b;
     for(let j=0;j<b;j++)if(i*b+j<parts){g.fillStyle=COPYC[Math.floor((i*b+j)/a)%COPYC.length];g.fillRect(r.x+j*pw+2,r.y+2,pw-4,r.h-4)}
     g.strokeStyle=RULE;g.lineWidth=1.5;for(let j=1;j<b;j++){g.beginPath();g.moveTo(r.x+j*pw,r.y);g.lineTo(r.x+j*pw,r.y+r.h);g.stroke()}}
    word(g,`${F.k} × ${a}/${b} = ${parts}/${b}${parts>=b?' = '+mixed(parts,b):''}`,A.W/2,A.H*.74,15,INK)}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(mode()==='chal')word(g,'n × a/b means n copies of a/b',A.W/2,A.H/2,15,INK);else picture(g);notice(g);A.fx.draw(g)}
  // ---- moves ----
  function addCopy(){const v=mode();if(v==='mixed'){if(F.n>=3)return miss('That is already 3 copies. 2 1/3 × 3 means exactly 3 copies of 2 1/3.');F.n++;
     hitIt(F.n<3?`Copy ${F.n}: 2 wholes and 1 third more.`:'3 copies: 6 wholes and 3 thirds. 3/3 is 1 whole, so 7 in all.');return sync()}
   const [n,a,b]=PROB[v]||[];if(!n)return;if(F.n>=n)return miss(`${n} × ${a}/${b} means ${n} copies, not ${F.n+1}. Each copy adds ${a} more ${b===5?'fifths':b===4?'quarters':'parts'}.`);
   F.n++;const p=F.n*a;
   if(v==='past'&&p===b)hitIt('4/4 fills the bar: that is exactly 1 whole. One more copy goes past it.');
   else if(v==='past'&&p>b)hitIt(`5/4 is more than 1 whole: 1 and 1/4. Copying a fraction can make more than one.`);
   else hitIt(`${F.n} ${F.n>1?'copies':'copy'}: ${p}/${b}. The parts are still ${b===5?'fifths':'quarters'}; only the count of parts went up.`);sync()}
  function pack(i){if(mode()!=='pack')return;const [n,a,b]=PROB.pack;const fullBars=Math.floor(n*a/b);if(i>=fullBars)return miss(`That bar has only ${n*a-b*fullBars}/${b} in it. Only a full bar of ${b}/${b} packs into a whole.`);
   if(i<F.packed)return;F.packed=i+1;hitIt(`8/8 packed into 1 whole. ${n*a-b}/8 is left over.`);sync()}
  function answerPack(t){if(mode()!=='pack')return;if(F.packed<1)return miss('Pack the full bar into a whole first: tap it.');
   if(t==='1 4/8'){F.picked=t;hitIt('12/8 = 1 4/8, and 4/8 is the same as 1/2, so 1 1/2.')}else miss(t==='4/8'?'You dropped the whole you packed. 12/8 is 1 whole and 4/8 more.':t==='12 1/8'?'12/8 means 12 eighths, not 12 wholes. 8 of them make 1 whole.':'Count again: one full bar of 8/8, then the parts left over.');sync()}
  function pickCard(k){if(mode()!=='make')return;F.card=k;F.k=1;F.bad=false;F.note='';sync()}
  function step(d){if(mode()!=='make')return;F.k=Math.max(1,Math.min(8,F.k+d));F.note='';sync()}
  function check(){const G=GOALS[F.mi];if(!G)return;const [a,b]=CARDS[F.card],p=F.k*a;
   if(p*G[1]===G[0]*b){hitIt(`${F.k} × ${a}/${b} = ${p}/${b} = ${mixed(G[0],G[1])}. Target made.`);F.mi++;F.k=1;return sync()}
   miss(p*G[1]<G[0]*b?`${F.k} × ${a}/${b} = ${p}/${b}: too small. Add copies.`:`${F.k} × ${a}/${b} = ${p}/${b}: too big. Take copies away.`);sync()}
  function sync(){const v=mode();let s='';
   if(PROB[v]&&v!=='pack'){const [n,a,b]=PROB[v];s=`${n} times ${a}/${b}. Copies ${F.n} of ${n}: ${F.n*a}/${b}.`}
   else if(v==='pack')s=`4 times 3/8 is 12/8 on two bars. Wholes packed: ${F.packed}. ${F.picked?'Answer 1 4/8.':''}`;
   else if(v==='mixed')s=`2 1/3 times 3. Copies ${F.n} of 3: ${2*F.n} wholes and ${F.n}/3.`;
   else if(v==='make'){const G=GOALS[F.mi],[a,b]=CARDS[F.card];s=G?`Target ${mixed(G[0],G[1])}. Card ${a}/${b}, ${F.k} copies, makes ${F.k*a}/${b}.`:'All three targets made.'}else s='Challenge.';
   read((F.note?F.note+' ':'')+s);controls();F.fin()}
  function controls(){if(!pad)return;pad.innerHTML='';const v=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
   if(PROB[v]&&v!=='pack'){const [n,a,bb]=PROB[v];b(`Add a copy of ${a}/${bb}`,addCopy)}
   if(v==='mixed')b('Add a copy of 2 1/3',addCopy);
   if(v==='pack'){b('Pack the full bar',()=>pack(0));['1 4/8','4/8','12 1/8'].forEach(t=>b(`= ${t}`,()=>answerPack(t),`Answer ${t}`))}
   if(v==='make'&&GOALS[F.mi]){CARDS.forEach(([a,bb],k)=>b(`${a}/${bb}`,()=>pickCard(k),`Use the ${a}/${bb} card`));b('− copy',()=>step(-1),'One copy fewer');b('+ copy',()=>step(1),'One copy more');b('Check',check,'Check against the target')}
   A.redraw()}
  function down(p){const v=mode();
   if((PROB[v]&&v!=='pack')||v==='mixed'){if(p.y>A.H*.26&&p.y<A.H*.8)addCopy()}
   if(v==='pack'){[0,1].forEach(i=>{if(inside(p,barR(i,2)))pack(i)})}
   if(v==='make'){const k=CARDS.findIndex((_,k)=>inside(p,cardR(k)));if(k>=0)pickCard(k);else if(p.y>A.H*.42&&p.y<A.H*.7)step(p.x>A.W/2?1:-1)}return false}
  // ---- steps ----
  const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fns=>{const id=++F.go,gap=A.reduced()?15:320;fns.forEach((f,k)=>setTimeout(()=>{if(id===F.go)f()},k*gap))};
  const clear=()=>{F.go++;F.fin=()=>{};F.n=0;F.packed=0;F.picked=null;F.mi=0;F.card=1;F.k=1;F.note='';F.bad=false};
  const SOL=[[0,3],[4,3],[0,5]];// card index and copies for each target: 3 × 1/2, 3 × 2/3, 5 × 1/2
  const steps=[
   {h:'Copies of a fraction',p:'3 × 2/5 means 3 copies of 2/5. Tap the bars (or the button) to add each copy.',
    predict:{q:'What is 3 × 2/5?',opts:['6/5','6/15','2/15'],ans:0},
    task:'Add 3 copies of 2/5',show:()=>{steps[0].go();auto([addCopy,addCopy,addCopy])},go:()=>{clear();sync();F.fin=fin(0,()=>F.n>=3,'3 × 2/5 = 6/5. The parts stay fifths; only the number of parts is multiplied.')}},
   {h:'Past one whole',p:'Now 5 × 1/4. Add the quarters one copy at a time and watch the first bar fill.',
    predict:{q:'Is 5 × 1/4 more or less than 1?',opts:['More than 1','Less than 1: multiplying a fraction makes it smaller','Exactly 1'],ans:0},
    task:'Add 5 copies of 1/4',show:()=>{steps[1].go();auto([addCopy,addCopy,addCopy,addCopy,addCopy])},go:()=>{clear();sync();F.fin=fin(1,()=>F.n>=5,'5 × 1/4 = 5/4 = 1 1/4. Five copies of a quarter is more than one whole.')}},
   {h:'Pack the wholes',p:'4 × 3/8 = 12/8. Tap the full bar to pack it into 1 whole, then pick the mixed number.',
    task:'Write 12/8 as a mixed number',show:()=>{steps[2].go();auto([()=>pack(0),()=>answerPack('1 4/8')])},go:()=>{clear();sync();F.fin=fin(2,()=>F.picked==='1 4/8','12/8 = 1 4/8 = 1 1/2.')}},
   {h:'Mixed numbers',p:'2 1/3 × 3: copy the whole 2 1/3 three times. Every part gets copied, wholes and thirds.',
    predict:{q:'What is 2 1/3 × 3?',opts:['7','6 1/3','6 3/9'],ans:0},
    task:'Add 3 copies of 2 1/3',show:()=>{steps[3].go();auto([addCopy,addCopy,addCopy])},go:()=>{clear();sync();F.fin=fin(3,()=>F.n>=3,'6 wholes + 3/3 = 7. Multiply the wholes and the fraction part.')}},
   {h:'Make the target',p:'Pick a fraction card and choose how many copies. Tap Check when you think you have hit the target.',
    task:'Make 3 targets',show:()=>{steps[4].go();auto(SOL.flatMap(([k,n])=>[()=>pickCard(k),()=>{F.k=n;sync()},check]))},go:()=>{clear();sync();F.fin=fin(4,()=>F.mi>=GOALS.length,'Different copies of different fractions can make the same amount: 6 × 1/4 and 3 × 1/2 are both 1 1/2.')}},
   {h:'Challenge',p:'',go:()=>{clear();pose()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>F.fin()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['4 × 2/9 = ?','8/9',[['8/36','both'],['6/9','add']]],
   ['5 × 3/4 as a mixed number?','3 3/4',[['15/20','both'],['3 1/4','rem']]],
   ['2 1/5 × 3 = ?','6 3/5',[['6 1/5','wholeonly'],['2 3/5','fraconly']]],
   ['Is 6 × 2/3 more or less than 6?','Less than 6',[['More than 6','bigger'],['Exactly 6','same']]],
   ['Which is the same as 7 × 1/3?','7/3',[['7/21','both'],['1/21','denom']]],
   ['3 × 3/4 = ?','2 1/4',[['9/12','both'],['1 1/4','rem']]]];
  function slip(tag){let m='Draw the copies on a bar and count the parts.';
   if(tag==='both')m='You multiplied the bottom too. The parts stay the same size, so only the top number is multiplied.';
   if(tag==='add')m='That adds 4 to the top. 4 × 2/9 means 4 copies of 2/9: 2 + 2 + 2 + 2 = 8 ninths.';
   if(tag==='rem')m='Check the leftover: take out every full whole, then count the parts that are left.';
   if(tag==='wholeonly')m='You copied the wholes but not the fifth. 3 copies of 1/5 is 3/5.';
   if(tag==='fraconly')m='You copied the fifth but not the wholes. 3 copies of 2 wholes is 6.';
   if(tag==='bigger')m='Each copy is less than 1 whole, so 6 copies is less than 6. 6 × 2/3 = 12/3 = 4.';
   if(tag==='same')m='6 copies of 1 whole would be 6. Each copy is only 2/3, so the answer is 4.';
   if(tag==='denom')m='The parts are still thirds. 7 copies of 1 third is 7 thirds: 7/3.';return m}
  let qi=-1,streak=0;
  function pose(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans)});read('Challenge: '+q);A.redraw()}
  function judge(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
  A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
