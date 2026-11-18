/* Flagship – probabilities sum to one (ages 10–11; NC England Y6 preview of KS3 probability: "the probabilities of an
   exhaustive set of mutually exclusive events sum to one"; CCSS 7.SP.C.5 and 7.SP.C.7 preview). Tap each sector of a
   4-colour spinner to add its chance to a 0-to-1 bar (4/8 + 2/8 + 1/8 + 1/8 = 1); drag the red|blue divider and watch
   blue shrink so the total stays 1; light up the NOT faces of a dice to meet P(not A) = 1 − P(A); answer three
   forecasts (rain 0.3, 0.85, 0.6); and check six probability tables for "adds to 1", "too little" or "too much". */
(()=>{
 const SECT=[['red','#dc2626','#ffffff'],['blue','#2563eb','#ffffff'],['yellow','#fde047','#172033'],['green','#4ade80','#172033']];
 const EVENTS=[['roll a 3',[3]],['roll less than 3',[1,2]]];
 const RAIN=[[30,[[70,'ok'],[30,'same'],[50,'fifty']]],[85,[[15,'ok'],[25,'borrow'],[85,'same']]],[60,[[40,'ok'],[50,'fifty'],[160,'over']]]];
 const TABLES=[[['red',.5],['blue',.3],['green',.2]],[['red',.25],['blue',.25],['yellow',.25]],[['win',.6],['lose',.5]],
  [['1',1/6],['2',1/6],['3',1/6],['4',1/6],['5',1/6],['6',1/6]],[['heads',.5],['tails',.4]],[['red',.45],['blue',.35],['yellow',.3]]];
 const TNOTE=['0.5 + 0.3 + 0.2 = 1. Every outcome is listed.','0.25 × 3 = 0.75. The spinner has 4 colours: green is missing, so it must be 0.25.',
  '0.6 + 0.5 = 1.1. More than 1 is impossible: one number is wrong.','Six lots of 1/6 make 6/6 = 1.','0.5 + 0.4 = 0.9. A coin only lands heads or tails, so one is wrong.','0.45 + 0.35 + 0.3 = 1.1. Too much: the list cannot be right.'];
 const sumOf=t=>Math.round(t.reduce((s,r)=>s+r[1],0)*100)/100,kindOf=t=>{const s=sumOf(t);return s===1?0:s<1?1:2};
 const dec=n=>(n/100).toString().replace(/^0\./,'0.');
 VIS.reg('flagsumone',c=>{let A,pad,chal;
  const st={tok:0,tap:[],red:4,face:[],ev:0,rn:0,tb:0,bins:[0,0,0],msg:'',bad:false,after:()=>{}};
  const mode=()=>['list','drag','not','rain','table','chal'][A.step];
  const sz=n=>Math.round(n*(A.narrow?1:1.1));
  const INK='#172033',MUTE='#475569',EDGE='#64748b',PAPER='#ffffff',PALE='#e2e8f0',OKC='#047857',NOC='#b91c1c',SKYC='#1d4ed8';
  function say(g,t,x,y,n,col,wt,al){g.font=`${wt||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y,A.W-12)}
  function lines(g,t,w,n){g.font=`800 ${sz(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const word of t.split(' ')){const next=cur?cur+' '+word:word;if(cur&&g.measureText(next).width>w){out.push(cur);cur=word}else cur=next}out.push(cur);return out}
  function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function banner(g){if(!st.msg)return;const L=lines(g,(st.bad?'✗ ':'✓ ')+st.msg,A.W-44,13),lh=sz(13)+6,h=L.length*lh+12,y=A.H-h-6;tile(g,{x:10,y,w:A.W-20,h},PAPER,st.bad?NOC:OKC,3);L.forEach((l,i)=>say(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
  const live=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const wrong=t=>{st.bad=true;st.msg=t;A.sound.miss();live(t);A.redraw()};
  const right=t=>{st.bad=false;st.msg=t;A.sound.pop()};
  // ---- geometry ----
  const wheel=()=>({x:A.W/2,y:A.H*(A.narrow?.27:.3),r:Math.min(A.W*.2,A.H*(A.narrow?.2:.23))});
  const barR=()=>({x:18,y:A.H*.62,w:A.W-36,h:sz(30)});
  const parts=()=>mode()==='drag'?[st.red,6-st.red,1,1]:[4,2,1,1];
  function sectorAt(p){const w=wheel(),dx=p.x-w.x,dy=p.y-w.y;if(Math.hypot(dx,dy)>w.r)return -1;let a=Math.atan2(dy,dx)+Math.PI/2;if(a<0)a+=Math.PI*2;
   const k=Math.floor(a/(Math.PI/4));let acc=0;const P=parts();for(let i=0;i<4;i++){acc+=P[i];if(k<acc)return i}return 3}
  function drawWheel(g){const w=wheel(),P=parts();let a=-Math.PI/2;P.forEach((n,i)=>{const b=a+n*Math.PI/4,shown=mode()!=='list'||st.tap[i];
    g.beginPath();g.moveTo(w.x,w.y);g.arc(w.x,w.y,w.r,a,b);g.closePath();g.fillStyle=shown?SECT[i][1]:A.mix(SECT[i][1],'#ffffff',.6);g.fill();g.strokeStyle=PAPER;g.lineWidth=3;g.stroke();
    const m=(a+b)/2,lx=w.x+Math.cos(m)*w.r*.62,ly=w.y+Math.sin(m)*w.r*.62;say(g,shown?`${n}/8`:'?',lx,ly,n>1?15:12,shown?SECT[i][2]:INK,900);a=b});
   g.beginPath();g.arc(w.x,w.y,w.r,0,7);g.strokeStyle=EDGE;g.lineWidth=2;g.stroke();g.fillStyle=INK;g.beginPath();g.arc(w.x,w.y,5,0,7);g.fill()}
  function drawBar(g,list){const r=barR();tile(g,r,PALE,EDGE,1.5);let x=r.x,tot=0;list.forEach(([n,i])=>{const w=r.w*n/8;g.fillStyle=SECT[i][1];g.fillRect(x+1,r.y+1,w-1,r.h-2);if(w>sz(26))say(g,`${n}/8`,x+w/2,r.y+r.h/2,12,SECT[i][2],900);x+=w;tot+=n});
   g.strokeStyle=EDGE;g.lineWidth=1;for(let k=1;k<8;k++){const tx=r.x+r.w*k/8;g.beginPath();g.moveTo(tx,r.y+r.h);g.lineTo(tx,r.y+r.h+6);g.stroke()}
   say(g,'0',r.x,r.y+r.h+sz(14),12,MUTE,800);say(g,'1',r.x+r.w,r.y+r.h+sz(14),12,MUTE,800);say(g,`total ${tot}/8${tot===8?' = 1':''}`,A.W/2,r.y-sz(13),14,tot===8?OKC:INK,900);return tot}
  const dieR=k=>{const cols=A.narrow?3:6,gap=10,s=Math.min((A.W-24-gap*(cols-1))/cols,A.H*(A.narrow?.2:.24));const row=Math.floor(k/cols),col=k%cols,wid=cols*s+(cols-1)*gap;return{x:(A.W-wid)/2+col*(s+gap),y:A.H*.2+row*(s+gap),w:s,h:s}};
  const binR=k=>{const w=(A.W-32)/3;return{x:10+k*(w+6),y:A.H*.56,w,h:A.H*.2}};
  function scene(g){const v=mode();
   if(v==='list'){drawWheel(g);drawBar(g,[0,1,2,3].filter(i=>st.tap[i]).map(i=>[[4,2,1,1][i],i]))}
   if(v==='drag'){drawWheel(g);drawBar(g,[[st.red,0],[6-st.red,1],[1,2],[1,3]]);const r=barR(),hx=r.x+r.w*st.red/8;g.fillStyle=PAPER;g.strokeStyle=INK;g.lineWidth=3;const hy=r.y+r.h+sz(20);g.beginPath();g.moveTo(hx,r.y+r.h);g.lineTo(hx,hy-sz(12));g.stroke();g.beginPath();g.arc(hx,hy,sz(13),0,7);g.fill();g.stroke();say(g,'↔',hx,hy,13,INK,900)}
   if(v==='not'){const E=EVENTS[st.ev];if(!E){say(g,'P(not A) = 1 − P(A)',A.W/2,A.H*.35,18,OKC,900);return}say(g,`Event A: ${E[0]}`,A.W/2,A.H*.06,16,INK,900);say(g,'Light up every face that is NOT A.',A.W/2,A.H*.13,13,MUTE,800);
    for(let k=0;k<6;k++){const r=dieR(k),isA=E[1].includes(k+1),on=st.face[k];tile(g,r,on?'#dcfce7':isA?'#fef3c7':PAPER,on?OKC:EDGE,on?3.5:2);say(g,k+1,r.x+r.w/2,r.y+r.h*.45,22,INK,900);say(g,isA?'A':on?'not A':'',r.x+r.w/2,r.y+r.h*.8,11,MUTE,800)}
    const n=st.face.filter(Boolean).length;say(g,`not A: ${n} of 6 faces`,A.W/2,dieR(5).y+dieR(5).h+sz(18),14,INK,900)}
   if(v==='rain'){const R=RAIN[st.rn];if(!R){say(g,'No rain = 1 − rain',A.W/2,A.H*.35,18,OKC,900);return}const p=R[0],r={x:18,y:A.H*.3,w:A.W-36,h:sz(40)};
    say(g,`Forecast: chance of rain ${dec(p)}`,A.W/2,A.H*.13,17,SKYC,900);tile(g,r,PALE,EDGE,1.5);g.fillStyle=SKYC;g.fillRect(r.x+1,r.y+1,r.w*p/100-1,r.h-2);
    say(g,`rain ${dec(p)}`,r.x,r.y-sz(13),13,SKYC,900,'left');say(g,'no rain ?',r.x+r.w,r.y-sz(13),13,INK,900,'right');say(g,'0',r.x,r.y+r.h+sz(14),12,MUTE);say(g,'1',r.x+r.w,r.y+r.h+sz(14),12,MUTE)}
   if(v==='table'){const T=TABLES[st.tb],top={x:14,y:A.H*.03,w:A.W-28,h:A.H*.46};tile(g,top,PAPER,EDGE,2);
    if(!T){say(g,'All 6 tables checked!',A.W/2,top.y+top.h/2,17,OKC,900)}else{say(g,`Table ${st.tb+1}: one spin, one roll or one game`,A.W/2,top.y+sz(16),13,MUTE,800);const cols=T.length>3?2:1,rows=Math.ceil(T.length/cols);
     T.forEach((r,i)=>{const cx=top.x+top.w*(cols===1?.5:(i%cols?.72:.28)),cy=top.y+sz(40)+(cols===1?i:Math.floor(i/cols))*(top.h-sz(52))/rows+sz(10);say(g,`P(${r[0]}) = ${r[1]===1/6?'1/6':r[1]}`,cx,cy,15,INK,900)})}
    ['adds to 1','too little','too much'].forEach((t,k)=>{const b=binR(k);tile(g,b,k?'#f1f5f9':'#dcfce7',k?EDGE:OKC,2.5);say(g,t,b.x+b.w/2,b.y+b.h*.35,A.narrow?12:14,INK,900);say(g,st.bins[k]?'✓'.repeat(st.bins[k]):'tap',b.x+b.w/2,b.y+b.h*.7,14,k?MUTE:OKC,900)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(mode()==='chal')say(g,'All the outcomes together make 1.',A.W/2,A.H/2,15,INK);else scene(g);banner(g);A.fx.draw(g)}
  // ---- moves ----
  function tapSector(i){if(i<0||st.tap[i])return;st.tap[i]=true;const n=[4,2,1,1][i],tot=[0,1,2,3].filter(k=>st.tap[k]).reduce((s,k)=>s+[4,2,1,1][k],0);right(`${SECT[i][0]} is ${n}/8. Running total ${tot}/8${tot===8?' = 1: one colour must come up':''}.`);sync()}
  function setRed(n){n=Math.max(1,Math.min(5,n));if(n===st.red)return;st.red=n;right(`Red ${n}/8, so blue shrinks to ${6-n}/8. Total still 8/8 = 1.`);sync()}
  function tapFace(k){const E=EVENTS[st.ev];if(!E||st.face[k])return;if(E[1].includes(k+1))return wrong(`${k+1} is part of A (${E[0]}). Light only the faces that are not A.`);st.face[k]=true;
   const need=6-E[1].length,n=st.face.filter(Boolean).length;if(n===need){right(`P(not A) = ${need}/6 = 1 − ${E[1].length}/6. Counting and the shortcut agree.`);st.ev++;st.face=[]}else right(`${k+1} is not A.`);sync()}
  function pickRain(tag,val){const R=RAIN[st.rn];if(!R)return;if(tag!=='ok')return wrong(why(tag,R[0]));right(`No rain = 1 − ${dec(R[0])} = ${dec(val)}.`);st.rn++;sync()}
  function sortTable(k){const T=TABLES[st.tb];if(!T)return;const want=kindOf(T);if(k!==want)return wrong(`Add them: the total is ${sumOf(T)===1?'exactly 1':sumOf(T)}. ${['It adds to 1.','Less than 1 means an outcome is missing.','More than 1 is impossible.'][want]}`);
   st.bins[k]++;right(TNOTE[st.tb]);st.tb++;sync()}
  function sync(){const v=mode();let s='';
   if(v==='list')s=`Chances added: ${st.tap.filter(Boolean).length} of 4. Tap a colour on the spinner to add its chance to the bar.`;
   else if(v==='drag')s=`Red ${st.red}/8, blue ${6-st.red}/8, yellow 1/8, green 1/8. Total 8/8.`;
   else if(v==='not')s=EVENTS[st.ev]?`Event A: ${EVENTS[st.ev][0]}. Faces lit as not A: ${st.face.filter(Boolean).length}.`:'Both events done.';
   else if(v==='rain')s=RAIN[st.rn]?`Chance of rain ${dec(RAIN[st.rn][0])}. What is the chance of no rain?`:'All three forecasts done.';
   else if(v==='table')s=TABLES[st.tb]?`Table ${st.tb+1}: ${TABLES[st.tb].map(r=>`P(${r[0]}) = ${r[1]===1/6?'1/6':r[1]}`).join(', ')}. Adds to 1, too little or too much?`:'All six tables checked.';else s='Challenge.';
   live((st.msg?st.msg+' ':'')+s);controls();st.after()}
  function controls(){if(!pad)return;pad.innerHTML='';const v=mode(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
   if(v==='list')[0,1,2,3].forEach(i=>{if(!st.tap[i])add(`Add ${SECT[i][0]}`,()=>tapSector(i),`Add the ${SECT[i][0]} chance`)});
   if(v==='drag'){add('Red bigger',()=>setRed(st.red+1));add('Red smaller',()=>setRed(st.red-1))}
   if(v==='not'&&EVENTS[st.ev])for(let k=0;k<6;k++)if(!st.face[k])add(String(k+1),()=>tapFace(k),`Face ${k+1}`);
   if(v==='rain'&&RAIN[st.rn]){const R=RAIN[st.rn],o=R[1].slice(st.rn).concat(R[1].slice(0,st.rn));o.forEach(([val,tag])=>add(dec(val),()=>pickRain(tag,val),`No rain ${dec(val)}`))}
   if(v==='table'&&TABLES[st.tb])['adds to 1','too little','too much'].forEach((t,k)=>add(t,()=>sortTable(k)));A.redraw()}
  let drag=false;
  function down(p){const v=mode();
   if(v==='list')tapSector(sectorAt(p));
   if(v==='drag'){const r=barR();if(p.y>r.y-24&&p.y<r.y+r.h+sz(40)){drag=true;move(p);return true}}
   if(v==='not'){for(let k=0;k<6;k++)if(within(p,dieR(k)))tapFace(k)}
   if(v==='table'){const k=[0,1,2].find(k=>within(p,binR(k)));if(k!=null)sortTable(k)}return false}
  function move(p){if(!drag)return;const r=barR();setRed(Math.round((p.x-r.x)/r.w*8))}
  function up(){drag=false}
  // ---- steps ----
  const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const auto=fs=>{const id=++st.tok,gap=A.reduced()?15:280;fs.forEach((f,i)=>setTimeout(()=>{if(id===st.tok)f()},i*gap))};
  const fresh=()=>{st.tok++;st.after=()=>{};st.tap=[];st.red=4;st.face=[];st.ev=0;st.rn=0;st.tb=0;st.bins=[0,0,0];st.msg='';st.bad=false};
  const steps=[
   {h:'All the outcomes',p:'This spinner has 4 colours, cut into eighths. Tap each colour to add its chance to the bar.',
    predict:{q:'What do all four chances add up to?',opts:['1 whole','4: one for each colour','It depends on the sizes'],ans:0},
    task:'Add all 4 chances',show:()=>{steps[0].go();auto([0,1,2,3].map(i=>()=>tapSector(i)))},go:()=>{fresh();sync();st.after=finish(0,()=>st.tap.filter(Boolean).length===4,'4/8 + 2/8 + 1/8 + 1/8 = 8/8 = 1. Some colour always comes up.')}},
   {h:'Grow one, shrink another',p:'Drag the handle on the bar to give red more of the spinner. Watch blue and the total.',
    predict:{q:'Red gets bigger. What happens to the total?',opts:['It goes over 1','It stays 1: blue gets smaller'],ans:1},
    task:'Make red 5/8',show:()=>{steps[1].go();auto([()=>setRed(5)])},go:()=>{fresh();sync();st.after=finish(1,()=>st.red===5,'Red 5/8 left only 1/8 for blue. The chances share one whole, so the total stays 1.')}},
   {h:'The NOT shortcut',p:'Light up every dice face that is not A. Then see the shortcut: P(not A) = 1 − P(A).',
    task:'Do 2 events',show:()=>{steps[2].go();const fs=[];EVENTS.forEach(E=>{for(let k=0;k<6;k++)if(!E[1].includes(k+1))fs.push(()=>tapFace(k))});auto(fs)},go:()=>{fresh();sync();st.after=finish(2,()=>st.ev>=EVENTS.length,'5/6 = 1 − 1/6 and 4/6 = 1 − 2/6. Take the chance of A from 1.')}},
   {h:'Rain or no rain',p:'It will rain or it will not, so the two chances make 1. Use 1 − rain to find no rain.',
    predict:{q:'The chance of rain is 0.3. What is the chance of no rain?',opts:['0.7','0.3','0.5: it rains or not'],ans:0},
    task:'Answer 3 forecasts',show:()=>{steps[3].go();auto(RAIN.map(R=>()=>pickRain('ok',R[1][0][0])))},go:()=>{fresh();sync();st.after=finish(3,()=>st.rn>=RAIN.length,'0.7, 0.15 and 0.4. Each pair adds to exactly 1.')}},
   {h:'Spot the mistake',p:'A full list of chances for one go must add to 1. Add each table. Is it right, too little or too much?',
    task:'Check 6 tables',show:()=>{steps[4].go();auto(TABLES.map(T=>()=>sortTable(kindOf(T))))},go:()=>{fresh();sync();st.after=finish(4,()=>st.tb>=TABLES.length,'Under 1: an outcome is missing. Over 1: a number is wrong.')}},
   {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>st.after()});
  // ---- challenge: each wrong answer names its slip ----
  const Q=[['A spinner gives P(red) = 0.35. What is P(not red)?','0.65',[['0.35','same'],['0.75','borrow']],35],
   ['P(rolling a 4 on a fair dice) = 1/6. What is P(not a 4)?','5/6',[['1/5','denom'],['1/6','same']]],
   ['A bag has only red, blue and green. P(red) = 0.2 and P(blue) = 0.5. What is P(green)?','0.3',[['0.7','add'],['0.8','skip']]],
   ['Which list could be the chances of all the outcomes of one spin?','0.1, 0.6, 0.3',[['0.4, 0.4, 0.4','over'],['0.2, 0.3, 0.1','under']]],
   ['The chance a bus is late is 0.08. What is the chance it is not late?','0.92',[['0.02','borrow'],['0.08','same']],8],
   ['A game has two outcomes, win or lose. Is P(win) always 1/2?','No: only if win and lose are equally likely',[['Yes: there are 2 outcomes','fifty'],['Yes: so P(lose) is 1/2 too','fifty']]]];
  function why(tag,p){let m='The chances of all the outcomes add to 1.';
   if(tag==='same')m='That is the chance of the event itself. NOT is everything else: 1 minus it.';
   if(tag==='borrow')m=`Check by adding: your answer plus ${dec(p)} must make exactly 1. Count up from ${dec(p)} to 1.`;
   if(tag==='fifty')m='Two outcomes are only 1/2 each when they are equally likely. Use the chance you are given: 1 minus it.';
   if(tag==='over')m='Chances can never add to more than 1, and no chance is above 1. Take away from 1, do not add.';
   if(tag==='under')m='These add to less than 1, so an outcome is missing from the list.';
   if(tag==='denom')m='Keep all 6 faces as the bottom number. 5 of the 6 faces are not a 4: 5/6.';
   if(tag==='add')m='0.7 is red and blue together. Green is what is left: 1 − 0.7 = 0.3.';
   if(tag==='skip')m='You took away red only. Take away blue too: 1 − 0.2 − 0.5 = 0.3.';
   return m}
  let qi=-1,streak=0;
  function ask(){qi++;const [q,ans,bad,pp]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),k=qi%3,order=all.slice(k).concat(all.slice(0,k));
   chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>judge(tag,ans,pp)});live('Challenge: '+q);A.redraw()}
  function judge(tag,ans,pp){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
   if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag,pp)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
  A.start()})})();
