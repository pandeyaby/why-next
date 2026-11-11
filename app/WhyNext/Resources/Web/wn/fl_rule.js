/* Flagship 70 – describing rules (ages 8–9): turn examples into a rule, test it on new cases, hunt for a breaker,
   fix the rule, then prove odd + odd = even with dot pairs. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const CARDS=['3 + 0 = 3','7 + 0 = 7','12 + 0 = 12'];
 const SLOT=[['Any number','Only 3','Big numbers'],['add 0','add 3'],['stays the same','gets bigger','gets smaller']];
 const WHY=[[0,'That only tells us about 3. A rule should work for every number like it.','7 is not big, and it still works. Say "any number".'],
  [0,'Look at the cards: they all add 0, not 3.'],[0,'3 + 0 is still 3. It does not get bigger.','3 + 0 is still 3. It does not get smaller.']];
 const CASES=[[10,12],[38,50],[120,64],[0,6],[1000,26]];
 const MULT=[2,1,5,0,10,3],ROWS=[[6,3],[6,1],[6,0],[0,5],[4,10],[7,2]],ODD=[[3,5],[7,9],[5,11]];
VIS.reg('flagrule',c=>{let A,pad,chal,read;
 const S={pick:[-1,-1,-1],tested:[],last:'',hit:[],cond:[0,0],oq:0,ook:0,joined:0,drag:false,dp:null,bad:null,want:()=>{},run:0,Q:null,glow:0,msg:''};
 const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const view=()=>['say','test','hunt','fix','prove','quiz'][A.step];
 const al=(...a)=>A.alpha(...a),rr=(...a)=>A.paint.rrect(...a),N=z=>A.narrow?z:z+2;
 const font=(x,w,z,a)=>{x.font=`${w} ${z}px system-ui,sans-serif`;x.textAlign=a||'center';x.textBaseline='middle'};
 const box=(x,R,c,a,lw)=>{x.fillStyle=al(c,a);rr(R.x,R.y,R.w,R.h,12);x.fill();x.strokeStyle=c;x.lineWidth=lw;x.stroke()};
 const dot=(x,X,Y,r)=>{x.beginPath();x.arc(X,Y,r,0,7);x.fill()},inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
 const txt=(x,t,X,Y,z,col,w,m)=>{font(x,w||800,N(z));x.fillStyle=col;x.fillText(t,X,Y,m||A.W-20)};
 const miss=t=>{A.sound.miss();say(t);A.redraw()};
 const grid=(n,cols,y0,h)=>{const g=8,w=(A.W-20-(cols-1)*g)/cols;return[...Array(n)].map((_,i)=>({x:10+(i%cols)*(w+g),y:y0+Math.floor(i/cols)*(h+g),w,h}))};
 // ---- views ----
 const slotR=()=>{const h=mn(46,A.H*.1),y0=A.H*.4;return SLOT.map((o,s)=>{const g=8,w=(A.W-20-(o.length-1)*g)/o.length;return o.map((_,i)=>({x:10+i*(w+g),y:y0+s*(h+10),w,h}))})};
 function sayView(x){const C=A.col;CARDS.forEach((t,i)=>{const w=(A.W-40)/3,R={x:10+i*(w+10),y:12,w,h:40};box(x,R,C.cy,.12,2);txt(x,t,R.x+w/2,32,14,C.tx)});
  const P=S.pick.map((k,s)=>k<0?'___':SLOT[s][k]);txt(x,'Your rule:',A.W/2,A.H*.24,14,C.mu,700);
  txt(x,P[0]+', '+P[1]+', '+P[2]+'.',A.W/2,A.H*.31,15,S.pick.every(k=>k===0)?C.gr:C.am);
  slotR().forEach((row,s)=>row.forEach((R,i)=>{const on=S.pick[s]===i,bad=on&&i;box(x,R,bad?C.rd:on?C.gr:C.vi,on?.25:.1,on?3:2);txt(x,SLOT[s][i],R.x+R.w/2,R.y+R.h/2,13,C.tx,700,R.w-12)}))}
 const caseR=()=>grid(5,3,A.H*.62,mn(48,A.H*.13));
 function testView(x){const C=A.col;txt(x,'Rule: even + even = even',A.W/2,26,16,C.tx);txt(x,'Seen: 2 + 4 = 6,  6 + 8 = 14',A.W/2,54,13,C.mu,700);
  const k=S.tested[S.tested.length-1];if(k!=null){const[a,b]=CASES[k],s=a+b;txt(x,`${a} + ${b} = ${s}`,A.W/2,A.H*.3,26,C.tx,900);
   txt(x,`ends in ${s%10}, so it is even ✓`,A.W/2,A.H*.43,15,C.gr)}else txt(x,'Tap a new case to test it',A.W/2,A.H*.36,15,C.mu,700);
  caseR().forEach((R,i)=>{const t=S.tested.includes(i);box(x,R,t?C.gr:C.cy,t?.22:.1,2);txt(x,CASES[i].join(' + ')+(t?' ✓':''),R.x+R.w/2,R.y+R.h/2,14,C.tx)});
  txt(x,`New cases tested: ${S.tested.length}`,A.W/2,A.H*.56,13,C.mu,700)}
 const multR=()=>grid(6,3,A.H*.6,mn(50,A.H*.14));
 function huntView(x){const C=A.col;txt(x,'Claim: "Multiplying always makes',A.W/2,24,15,C.tx);txt(x,'a number bigger."',A.W/2,46,15,C.tx);
  txt(x,'Seen: 2 × 3 = 6,  4 × 5 = 20',A.W/2,72,13,C.mu,700);
  if(S.msg){const br=S.msg[2]<=6;txt(x,`6 × ${S.msg[1]} = ${S.msg[2]}`,A.W/2,A.H*.33,26,C.tx,900);txt(x,br?'Not bigger: a breaker!':'Bigger: it fits. Keep hunting.',A.W/2,A.H*.45,15,br?C.rd:C.gr)}
  multR().forEach((R,i)=>{const m=MULT[i],t=S.hit.includes(m),b=t&&m<2;box(x,R,b?C.rd:t?C.gr:C.vi,t?.22:.1,2);txt(x,'6 × '+m,R.x+R.w/2,R.y+R.h/2,15,C.tx)});
  txt(x,`Breakers found: ${S.hit.filter(m=>m<2).length} of 2`,A.W/2,A.H*.54,13,C.mu,700)}
 const st=([a,b])=>{const cov=(!S.cond[0]||a>0)&&(!S.cond[1]||b>1);return!cov?0:a*b>a?1:2};
 const condR=()=>{const h=mn(48,A.H*.12),w=(A.W-30)/2;return[0,1].map(i=>({x:10+i*(w+10),y:A.H-h-8,w,h}))};
 function fixView(x){const C=A.col,L=['the number is more than 0','you times by more than 1'];
  txt(x,'Multiplying makes a number bigger',A.W/2,20,14,C.tx);txt(x,S.cond.some(Boolean)?'when '+L.filter((_,i)=>S.cond[i]).join(' and '):'(always)',A.W/2,42,13,C.am,700);
  const rh=mn(30,(A.H*.62)/6);ROWS.forEach((r,i)=>{const y=62+i*(rh+4),s=st(r);x.fillStyle=al([C.mu,C.gr,C.rd][s],.15);rr(10,y,A.W-20,rh,8);x.fill();
   font(x,800,N(13),'left');x.fillStyle=C.tx;x.fillText(`${r[0]} × ${r[1]} = ${r[0]*r[1]}`,22,y+rh/2);font(x,800,N(13),'right');x.fillStyle=[C.mu,C.gr,C.rd][s];
   x.fillText(['not covered','fits','breaks it'][s],A.W-22,y+rh/2)});
  condR().forEach((R,i)=>{const on=S.cond[i];box(x,R,on?C.gr:C.vi,on?.25:.1,on?3:2);font(x,700,N(12));x.fillStyle=C.tx;x.fillText((on?'✓ ':'+ ')+L[i],R.x+R.w/2,R.y+R.h/2,R.w-8)})}
 const layout=()=>{const[a,b]=ODD[mn(S.oq,2)],r=mn(14,A.W/34),sp=r*2.5,y=A.H*.36,half=A.W/2;
  const pts=(n,x0)=>{const P=[],c=(n-1)/2;for(let k=0;k<n-1;k++)P.push({x:x0+Math.floor(k/2)*sp,y:y+(k%2)*sp});return{P,n,x0,left:{x:x0+c*sp,y},gap:{x:x0+c*sp,y:y+sp}}};
  const A1=pts(a,14+r),B1=pts(b,half+8+r);return{a,b,r,sp,A1,B1}};
 function proveView(x){const C=A.col;if(S.ook>=3)return fin2(x,'Every odd number is pairs + 1. The two 1s make a pair. So odd + odd is always even.');
  const L=layout();txt(x,`${L.a} + ${L.b}: odd + odd`,A.W/2,22,18,C.tx);txt(x,'Each odd number is pairs + one left over',A.W/2,48,13,C.mu,700);
  [[L.A1,C.cy],[L.B1,C.vi]].forEach(([G,col])=>{x.fillStyle=col;G.P.forEach(p=>dot(x,p.x,p.y,L.r))});
  font(x,700,N(13),'left');x.fillStyle=C.mu;[L.A1,L.B1].forEach(G=>{const k=(G.n-1)/2;x.fillText(`${G.n} = ${k} pair${k>1?'s':''} + 1`,G.x0-L.r,A.H*.36+L.sp*2.1,A.W/2-14)});
  x.strokeStyle=C.am;x.setLineDash([4,4]);x.lineWidth=2;x.beginPath();x.arc(L.A1.gap.x,L.A1.gap.y,L.r,0,7);x.stroke();x.setLineDash([]);
  x.fillStyle=C.am;dot(x,L.A1.left.x,L.A1.left.y,L.r);const b=S.joined?L.A1.gap:S.drag&&S.dp?S.dp:L.B1.left;dot(x,b.x,b.y,L.r);
  if(!S.joined)txt(x,'Drag the spare dot from '+L.b+' into the gap',A.W/2,A.H*.86,13,C.am,700);
  else txt(x,`${L.a+L.b} = ${(L.a+L.b)/2} pairs, none left over: even!`,A.W/2,A.H*.86,15,C.gr)}
 function fin2(x,t){font(x,800,A.narrow?17:20);x.fillStyle=A.col.gr;const L=[];let cur='';t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(x.measureText(k).width>A.W-40&&cur){L.push(cur);cur=s}else cur=k});L.push(cur);L.forEach((l,j)=>x.fillText(l,A.W/2,A.H/2+(j-(L.length-1)/2)*28))}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={say:sayView,test:testView,hunt:huntView,fix:fixView,prove:proveView}[v];if(f)f(x);else{font(x,900,mn(W,H)*.14);x.fillStyle=al(C.vi,.5);x.fillText(S.Q?S.Q.big:'📏',W/2,H/2)}
  if(S.glow>0){x.strokeStyle=al(C.gr,S.glow);x.lineWidth=6;x.strokeRect(3,3,W-6,H-6)}A.fx.draw(x)}
 // ---- actions ----
 const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.drag=false;S.bad=null;S.msg=''};
 const glow=()=>{S.glow=1;A.tween(S,{glow:0},900,'out')};
 function pick(s,i){S.pick[s]=i;A.sound.tick();if(S.pick.some(k=>k<0))return status();const w=S.pick.findIndex(k=>k>0);
  if(w>=0)return miss(WHY[w][S.pick[w]]);A.sound.pop();glow();status()}
 function test(i){if(S.tested.includes(i))return;S.tested.push(i);A.sound.pop();if(S.tested.length>=4)glow();status()}
 function hunt(i){const m=MULT[i];S.msg=[0,m,6*m];if(!S.hit.includes(m))S.hit.push(m);if(m<2){A.sound.pop();if(S.hit.filter(m=>m<2).length===2)glow()}else A.sound.tick();status()}
 function cond(i){S.cond[i]^=1;A.sound.tick();status();if(S.cond[0]&&S.cond[1])glow()}
 function join(){if(S.ook>=3||S.joined)return;S.joined=1;A.sound.pop();status();const r=S.run;
  setTimeout(()=>{if(r!==S.run)return;S.ook++;S.oq=S.ook;S.joined=0;if(S.ook===3)glow();status()},A.reduced()?30:1100)}
 function status(){const v=view();let t;
  if(v==='say')t=S.pick.every(k=>k===0)?'Rule: any number add 0 stays the same. It fits every card.':'Build a rule from the cards. Pick one tile in each row.';
  else if(v==='test')t=S.tested.length>=4?`Tested ${S.tested.length} new cases, even big ones: the rule held every time.`:'Test the rule on new cases. Try a big one too.';
  else if(v==='hunt'){const n=S.hit.filter(m=>m<2).length;t=n>=2?'Two breakers: 6 × 1 and 6 × 0. The claim is not always true.':S.msg?`6 × ${S.msg[1]} = ${S.msg[2]}. `+(S.msg[1]<2?'A breaker!':'It fits. Keep hunting.'):'Find a case where the claim breaks.'}
  else if(v==='fix'){const b=ROWS.filter(r=>st(r)===2);t=b.length?`${b.map(r=>r[0]+' × '+r[1]).join(', ')} still break${b.length>1?'':'s'} it. Add a condition.`:'No breakers left. The fixed rule fits every case it covers.'}
  else if(v==='prove')t=S.ook>=3?'Odd + odd is always even: the two leftovers always make a pair.':`${ODD[mn(S.oq,2)].join(' + ')}: join the two leftover dots.`;
  else t='Challenge time.';say(t);sync();S.want()}
 function sync(){if(!A)return;if(A.step!==5)A.cv.setAttribute('aria-label',S.last);if(!pad)return A.redraw();pad.innerHTML='';const v=view();
  const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='say')SLOT.forEach((o,s)=>o.forEach((t,i)=>B(t,()=>pick(s,i),0,`Row ${s+1}: ${t}`)));
  if(v==='test')CASES.forEach((k,i)=>B('Test '+k.join(' + '),()=>test(i),S.tested.includes(i)));
  if(v==='hunt')MULT.forEach((m,i)=>B('Try 6 × '+m,()=>hunt(i)));
  if(v==='fix')['Number more than 0','Times by more than 1'].forEach((t,i)=>B((S.cond[i]?'Remove: ':'Add: ')+t,()=>cond(i)));
  if(v==='prove'&&S.ook<3)B('Join the leftovers',join,S.joined);A.redraw()}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const steps=[
  {h:'Say it as a rule',p:'Read the three cards. Tap one tile in each row to build a rule that fits every card.',
   predict:{q:'Is "3 + 0 = 3" a rule?',opts:['Yes, it is a rule','No, it is one example'],ans:1},task:'Build a rule that fits all three cards',
   show:()=>{steps[0].go();seq([0,1,2].map(s=>()=>pick(s,0)),300)},
   go:()=>{fresh();S.pick=[-1,-1,-1];status();S.want=fin(0,()=>S.pick.every(k=>k===0),()=>'A rule says what happens every time, for any number, not just one.')}},
  {h:'Test it on new cases',p:'The rule came from two sums. Tap new sums to test it. Try big numbers too.',task:'Test four new cases, one over 100',
   show:()=>{steps[1].go();seq([0,1,2,3].map(i=>()=>test(i)),350)},
   go:()=>{fresh();S.tested=[];status();S.want=fin(1,()=>S.tested.length>=4&&S.tested.some(i=>CASES[i][0]>=100),()=>'New cases, even big ones, still fit. That makes the rule more believable.')}},
  {h:'Hunt for a breaker',p:'A claim fits two examples. Tap a times sum to test it. Find two cases where it breaks.',
   predict:{q:'The claim fits 2 × 3 and 4 × 5. Can one example show it is wrong?',opts:['Yes, one breaker is enough','No, it already worked twice'],ans:0},task:'Find two breakers',
   show:()=>{steps[2].go();seq([1,3].map(i=>()=>hunt(i)),400)},
   go:()=>{fresh();S.hit=[];status();S.want=fin(2,()=>S.hit.filter(m=>m<2).length>=2,()=>'6 × 1 = 6 and 6 × 0 = 0 are not bigger. One breaker is enough to show the claim is not always true.')}},
  {h:'Fix the rule',p:'Add conditions to the claim until nothing on the list breaks it.',task:'Make a rule with no breakers',
   show:()=>{steps[3].go();seq([()=>cond(1),()=>cond(0)],500)},
   go:()=>{fresh();S.cond=[0,0];status();S.want=fin(3,()=>ROWS.every(r=>st(r)<2),()=>'Better rule: times a number more than 0 by more than 1, and it gets bigger.')}},
  {h:'Noticing or proving?',p:'Odd + odd gave even every time. Drag one leftover dot into the gap by the other leftover to see why.',
   predict:{q:'You test 50 odd + odd sums. All are even. Does that prove it for every number?',opts:['Yes, 50 is plenty','No, we need a reason why'],ans:1},task:'Join the leftovers in three sums',
   show:()=>{steps[4].go();seq([join,join,join],1300)},
   go:()=>{fresh();S.ook=0;S.oq=0;S.joined=0;status();S.want=fin(4,()=>S.ook>=3,()=>'Noticing: it worked each time. Proving: the leftovers always pair up, so it must work for every odd number.')}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={rule:['Which is a rule, not just one example?','📏',[['Any number times 1 stays the same','ok'],['5 × 1 = 5','one'],['Numbers are fun','vague']]],
  test:['You think "numbers ending in 5 are odd". What next?','🔍',[['Test new ones, like 135','ok'],['Stop: 15 worked','stop'],['Check 15 again','stop']]],
  brk:['Claim: "All birds can fly." Which is a breaker?','🐧',[['A penguin','ok'],['A robin','fits'],['An eagle','fits']]],
  once:['A rule worked 9 times and broke once. Does it work every time?','⚖️',[['No, one breaker shows it fails','ok'],['Yes, 9 beats 1','vote'],['Yes, ignore the odd one','vote']]],
  fix:['"Adding makes a number bigger." 5 + 0 = 5 breaks it. Best fix?','🔧',[['Adding more than 0 makes it bigger','ok'],['Throw the idea away','bin'],['Keep it as it is','vote']]],
  prove:['What turns a pattern you noticed into a proof?','🧠',[['A reason it must always work','ok'],['Lots more examples','more'],['A friend agrees','more']]],
  odd:['Why is odd + odd always even?','⚫',[['The two leftovers make a pair','ok'],['Because 3 + 5 = 8','one'],['Odd numbers are big','vague']]]};
 let qi=-1,run=0;
 function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
 function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'one':m='That is one example. A rule says what happens every time.';break;
   case 'vague':m='Too vague: a rule should say exactly what happens.';break;
   case 'stop':m='One case is not enough. Test new cases you have not seen.';break;
   case 'fits':m='That bird can fly, so it fits the claim. A breaker does not fit.';break;
   case 'vote':m='A rule is not a vote. One breaker shows it does not always work.';break;
   case 'bin':m='No need to bin it. Add a condition so it fits every case.';break;
   default:m='More examples help you notice. Only a reason shows it must always work.'}
  const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down:p=>{const v=view();S.dp=null;
     if(v==='say'){slotR().forEach((row,s)=>row.forEach((R,i)=>{if(inR(p,R))pick(s,i)}));return false}
     if(v==='test'){const i=caseR().findIndex(R=>inR(p,R));if(i>=0)test(i);return false}
     if(v==='hunt'){const i=multR().findIndex(R=>inR(p,R));if(i>=0)hunt(i);return false}
     if(v==='fix'){const i=condR().findIndex(R=>inR(p,R));if(i>=0)cond(i);return false}
     if(v==='prove'&&S.ook<3&&!S.joined){const L=layout(),b=L.B1.left;if(hy(p.x-b.x,p.y-b.y)<L.r*3.5){S.drag=true;return true}}return false},
    move:p=>{S.dp=p;A.redraw()},
    up:p=>{const was=S.drag;S.drag=false;S.dp=null;if(!was)return;const L=layout(),a=L.A1.gap;const b=L.B1.left;if(hy(p.x-a.x,p.y-a.y)<L.sp*2||hy(p.x-b.x,p.y-b.y)<L.r*3.5)join();else miss('Drop it in the dashed gap next to the other spare dot.')}});
   sync()}});
 A.start()})})();
