/* Flagship 23 – expanding brackets with negatives. The multiplier in front of the bracket, sign included, is a chip the
   learner drags onto each term inside (or taps a term, or presses its button). Each drop draws an arc from the chip to the
   term and writes the product on the line below with the sign rule that made it ("−3 × −4 = +12: negative times negative
   is positive"). Terms not yet multiplied show as empty boxes, so "only the first term got multiplied" is visible. With a
   number in front (5 − 2(x + 1)) the chip is −2, not 2: the minus belongs to the multiplier. Then the learner collects the
   number terms. Predictions target "−3(x − 4) = −3x − 12", "−(x + 5) = −x + 5", "5 − 2(x + 1) = 3(x + 1)" and a lost sign
   on the x term. Challenge: type the expanded, simplified answer; feedback names the slip (one term not multiplied, the
   second sign wrong, the x sign wrong, subtracting before multiplying, or dropping the minus from the multiplier). */
(()=>{const abs=Math.abs;
 const body=(co,x)=>(abs(co)===1&&x?'':abs(co))+(x?'x':'');
 const signed=(co,x,first)=>first?(co<0?'−':'')+body(co,x):(co<0?' − ':' + ')+body(co,x);
 const join=ts=>ts.filter(t=>t.co!==0).map((t,i)=>signed(t.co,t.x,i===0)).join('')||'0';
 const chipTxt=(E)=>(E.k<0?'−':E.e?'+':'')+abs(E.k);
 function exprTxt(E){const kk=abs(E.k)===1?'':abs(E.k);const lead=E.e?String(E.e).replace('-','−')+(E.k<0?' − ':' + ')+kk:(E.k<0?'−':'')+kk;return lead+'('+join(E.t)+')'}
 // expanded and simplified, with one named slip switched on
 function expand(E,slip){const k=slip==='posk'?abs(E.k):E.k;let pr=E.t.map((t,i)=>({co:slip==='first'&&i===1?t.co:slip==='sign2'&&i===1?-k*t.co:k*t.co,x:t.x}));
  if(slip==='xsign')pr=pr.map(t=>t.x?{co:-t.co,x:true}:t);
  if(slip==='early')pr=E.t.map(t=>({co:(E.e+E.k)*t.co,x:t.x}));
  const xc=pr.filter(t=>t.x).reduce((a,t)=>a+t.co,0),cc=pr.filter(t=>!t.x).reduce((a,t)=>a+t.co,0)+(slip==='early'?0:E.e);return{xc,cc}}
 const pl=(co,x)=>(co>0?'+':'')+signed(co,x,true),br=t=>t.co<0?'('+join([t])+')':join([t]);
 const lin=(r,constFirst)=>join(constFirst?[{co:r.cc,x:false},{co:r.xc,x:true}]:[{co:r.xc,x:true},{co:r.cc,x:false}]);
VIS.reg('flagexp',c=>{let A,chal,sand,read,ctl;const hits=[];
 const st={E:{e:0,k:-3,t:[{co:1,x:true},{co:-4,x:false}]},done:[false,false],coll:false,chip:{drag:false,x:0,y:0},lock:false,showing:false,chk:()=>{},won:false,run:0,glow:0,q:null};
 const allDone=()=>st.done.every(Boolean),finished=()=>allDone()&&(!st.E.e||st.coll);
 const tell=t=>{c.say(t);if(read)read.textContent=t};
 function load(E){st.E=E;st.done=E.t.map(()=>false);st.coll=false;st.won=false;st.run++;st.chip.drag=false;sync()}
 const ruleFor=(a,b)=>(a<0&&b<0)?'negative times negative is positive':(a<0||b<0)?'one negative and one positive multiply to a negative':'positive times positive is positive';
 function multiply(i){if(st.lock&&!st.showing){tell('In the challenge, expand it in your head, then type the answer.');return}if(st.done[i])return;
  const t=st.E.t[i],k=st.E.k,p=k*t.co;st.done[i]=true;A.sound.tick();st.glow=1;A.tween(st,{glow:0},800,'out');
  const kt=k<0?`(−${abs(k)})`:String(k),tt=t.x?(t.co===1?'x':t.co===-1?'(−x)':`${t.co<0?'(−'+abs(t.co)+'x)':t.co+'x'}`):(t.co<0?`(−${abs(t.co)})`:String(t.co));
  let m=`${kt} × ${tt} = ${pl(p,t.x)}: ${ruleFor(k,t.co)}.`;
  if(allDone())m+=st.E.e?` Now collect the number terms: tap them or press Collect.`:` Expanded: ${join(products())}.`;
  else m+=' Now the other term in the bracket.';tell(m);sync();st.chk()}
 const products=()=>st.E.t.map((t,i)=>({co:st.E.k*t.co,x:t.x,i}));
 function collect(){if(st.lock&&!st.showing)return;if(!allDone()){A.sound.miss();tell('Multiply every term in the bracket first.');return}if(!st.E.e||st.coll)return;
  st.coll=true;const r=expand(st.E),b=products().find(t=>!t.x);A.sound.pop();tell(`${String(st.E.e).replace('-','−')}${signed(b.co,false,false)} = ${String(r.cc).replace('-','−')}. Simplified: ${lin(r,true)}.`);sync();st.chk()}
 function auto(fin){st.showing=true;const id=++st.run;const order=[0,1,'c'];let j=0;const next=()=>{if(id!==st.run)return;
   while(j<order.length&&(order[j]==='c'?(!st.E.e||st.coll):st.done[order[j]]))j++;if(j>=order.length){st.showing=false;st.chk();fin&&fin();return}
   const o=order[j++];if(o==='c')collect();else multiply(o);A.tween({k:0},{k:1},700,'io',next)};next()}
 function describe(){const E=st.E,res=allDone()?join(products()):'not multiplied yet';
  return `Expanding ${exprTxt(E)}. The multiplier is ${chipTxt(E)}. ${st.done.map((d,i)=>`Term ${join([E.t[i]])}: ${d?'multiplied':'not multiplied'}`).join('. ')}. ${allDone()?'Expanded: '+(E.e?String(E.e)+' ':'')+res+(st.coll?'. Simplified: '+lin(expand(E),true):''):''}`}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(ctl){ctl.innerHTML='';const off=st.lock&&!st.showing;
   st.E.t.forEach((t,i)=>{const b=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':`Multiply ${join([t])} by ${chipTxt(st.E)}`},ctl,`${chipTxt(st.E)} × ${br(t)}`);b.disabled=off||st.done[i];b.onclick=()=>multiply(i)});
   if(st.E.e){const b=c.el('button',{type:'button',class:'lbtn sm ghost'},ctl,'Collect');b.disabled=off||!allDone()||st.coll;b.onclick=collect}
   const r=c.el('button',{type:'button',class:'lbtn sm ghost'},ctl,'Start again');r.disabled=off;r.onclick=()=>{load(st.E);tell('Back to '+exprTxt(st.E))}}
  A.redraw()}
 // ---------- drawing: expression with chip, arcs, the product line, the collected line ----------
 function draw(A){const{ctx,W,H,col:C,paint:P}=A;hits.length=0;ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.cy,.06)],[1,C.pn]]);ctx.fillRect(0,0,W,H);
  const E=st.E,f=A.narrow?26:36,y1=Math.round(H*.36),font=w=>`${w} ${f}px system-ui`;ctx.textBaseline='alphabetic';ctx.textAlign='left';
  const lead=E.e?String(E.e).replace('-','−')+' ':'',chip=chipTxt(E).replace(/^\+/,'+ ').replace(/^−/,E.e?'− ':'−'),parts=E.t.map((t,i)=>signed(t.co,t.x,i===0));
  ctx.font=font('600');const wl=ctx.measureText(lead).width,wc=ctx.measureText(chip).width+16,wp=parts.map(s=>ctx.measureText(s).width),wb=ctx.measureText('(').width;
  const total=wl+wc+wb*2+wp.reduce((a,b)=>a+b,0);let x=Math.max(14,(W-total)/2);
  ctx.fillStyle=C.tx;ctx.fillText(lead,x,y1);x+=wl;
  const cxh=x+wc/2,chipBox={x,y:y1-f-4,w:wc,h:f+14};st.chipBox=chipBox;x+=wc;ctx.fillText('(',x,y1);x+=wb;
  const centres=parts.map((s,i)=>{const w=wp[i],mid=x+w/2;const col=st.done[i]?C.gr:C.vi;ctx.fillStyle=col;ctx.fillText(s,x,y1);
   if(!st.done[i]&&!st.lock){ctx.fillStyle=A.alpha(C.vi,.5);ctx.fillRect(x+(i?f*.5:0),y1+6,w-(i?f*.5:0),2)}hits.push({x:x-4,y:y1-f-8,w:w+8,h:f+22,i});x+=w;return mid});
  ctx.fillStyle=C.tx;ctx.fillText(')',x,y1);
  // arcs from the chip to every multiplied term
  centres.forEach((m,i)=>{if(!st.done[i])return;ctx.strokeStyle=A.alpha(C.gr,.85);ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(cxh,y1-f-6);ctx.quadraticCurveTo((cxh+m)/2,y1-f-6-(A.narrow?34:48)-i*12,m,y1-f-4);ctx.stroke();
   ctx.fillStyle=C.gr;ctx.beginPath();ctx.moveTo(m,y1-f+2);ctx.lineTo(m-6,y1-f-8);ctx.lineTo(m+6,y1-f-8);ctx.fill()});
  // the chip (follows the finger while dragged)
  const bx=st.chip.drag?st.chip.x-wc/2:chipBox.x,by=st.chip.drag?st.chip.y-chipBox.h/2:chipBox.y;P.shadow(10,3,.25);ctx.fillStyle=P.lin(bx,by,bx,by+chipBox.h,[[0,A.mix(C.am,'#ffffff',.2)],[1,C.am]]);P.rrect(bx,by,wc,chipBox.h,12);ctx.fill();P.noShadow();
  ctx.fillStyle='#111';ctx.font=font('800');ctx.textAlign='center';ctx.fillText(chip.replace(/ /g,''),bx+wc/2,by+f+2);ctx.textAlign='left';
  if(!st.lock&&!allDone()&&!st.chip.drag)P.label('drag the chip onto each term',W/2,y1+28,{font:'600 12px system-ui',bg:A.alpha(C.am,.92),col:'#111'});
  // line 2: products so far (empty boxes for terms not multiplied yet)
  const y2=Math.round(H*.62),f2=A.narrow?22:30;ctx.font=`600 ${f2}px system-ui`;let x2=Math.max(14,(W-total)/2);
  const put=(s,col)=>{ctx.fillStyle=col;ctx.fillText(s,x2,y2);x2+=ctx.measureText(s).width};put('= ',A.alpha(C.tx,.7));
  if(E.e)put(String(E.e).replace('-','−'),C.tx);
  products().forEach((t,j)=>{const first=!E.e&&j===0;if(st.done[j]){put(signed(t.co,t.x,first),A.mix(C.gr,C.tx,.15+.5*(1-st.glow)))}else{if(!first)put(' ? ',A.alpha(C.tx,.5));
    ctx.strokeStyle=A.alpha(C.tx,.45);ctx.setLineDash([5,4]);ctx.lineWidth=1.5;P.rrect(x2,y2-f2,f2*1.4,f2+6,6);ctx.stroke();ctx.setLineDash([]);x2+=f2*1.4+4}});
  if(E.e&&allDone()&&!st.coll){const nb=products().find(t=>!t.x);hits.push({x:14,y:y2-f2-8,w:x2,h:f2+22,collect:true});P.label('tap to collect '+String(E.e).replace('-','−')+signed(nb.co,false,false),W/2,y2+24,{font:'600 12px system-ui',bg:A.alpha(C.cy,.92),col:'#111'})}
  // line 3: simplified
  if(finished()){const y3=Math.round(H*.84),r=expand(E);ctx.font=`700 ${f2}px system-ui`;ctx.fillStyle=C.gr;ctx.textAlign='left';ctx.fillText('= '+lin(r,!!E.e)+'  ✓',Math.max(14,(W-total)/2),y3)}
  ctx.font='600 12px system-ui';ctx.textAlign='right';ctx.fillStyle=C.mu;ctx.fillText('− × − = +    − × + = −',W-12,18);ctx.textAlign='left'}
 // ---------- steps ----------
 const T=(e,k,t)=>({e,k,t:t.map(([co,x])=>({co,x:!!x}))});
 const fresh=E=>{st.chk=()=>{};st.lock=false;st.showing=false;load(E);if(read)read.textContent=''};
 const goal=(i,msg)=>()=>{if(A.extra.querySelector('.fl-task')&&finished())A.done(msg+A.reveal(i))};
 const steps=[
  {h:'Every term gets multiplied',p:'The number in front of a bracket multiplies every term inside it, and its sign goes with it. Drag the chip onto each term.',
   predict:{q:'What is −3(x − 4) expanded?',opts:['−3x − 12','−3x + 12','−3x − 4'],ans:1},
   task:'Drag the −3 chip onto x, then onto −4',show:()=>auto(),
   go:()=>{fresh(T(0,-3,[[1,1],[-4,0]]));st.chk=goal(0,'−3 × x = −3x and −3 × (−4) = +12, so −3(x − 4) = −3x + 12.')}},
  {h:'A minus sign on its own',p:'−(x + 5) means −1 × (x + 5). The hidden 1 multiplies both terms, so both signs change.',
   predict:{q:'What is −(x + 5) expanded?',opts:['−x + 5','−x − 5','x − 5'],ans:1},
   task:'Expand −(x + 5)',show:()=>auto(),
   go:()=>{fresh(T(0,-1,[[1,1],[5,0]]));st.chk=goal(1,'−1 × x = −x and −1 × 5 = −5, so −(x + 5) = −x − 5. Every sign in the bracket flips.')}},
  {h:'The sign belongs to the number',p:'In 5 − 2(x + 1), the bracket is multiplied by −2, not by 2. Expand first. Do not take 2 from 5 first.',
   predict:{q:'What is 5 − 2(x + 1) simplified?',opts:['3x + 3','7 − 2x','3 − 2x'],ans:2},
   task:'Expand with the −2 chip, then collect the numbers',show:()=>auto(),
   go:()=>{fresh(T(5,-2,[[1,1],[1,0]]));st.chk=goal(2,'5 − 2x − 2 = 3 − 2x. Taking 2 from 5 first gives 3(x + 1), which is wrong: multiplying comes before subtracting.')}},
  {h:'Minus times minus',p:'In 10 − 2(x − 3), the −2 meets the −3. Watch what the two negatives make.',
   predict:{q:'What is 10 − 2(x − 3) simplified?',opts:['4 − 2x','16 − 2x','8x − 24'],ans:1},
   task:'Expand 10 − 2(x − 3) and collect',show:()=>auto(),
   go:()=>{fresh(T(10,-2,[[1,1],[-3,0]]));st.chk=goal(3,'−2 × (−3) = +6, so 10 − 2x + 6 = 16 − 2x. The −3 became +6.')}},
  {h:'Negative x terms',p:'The x term can be the negative one. The sign rules are the same for letters and numbers.',
   predict:{q:'What is −4(3 − 2x) expanded?',opts:['−12 − 8x','−12 + 8x','12 − 8x'],ans:1},
   task:'Expand −4(3 − 2x)',show:()=>auto(),
   go:()=>{fresh(T(0,-4,[[3,0],[-2,1]]));st.chk=goal(4,'−4 × 3 = −12 and −4 × (−2x) = +8x, so −4(3 − 2x) = −12 + 8x.')}},
  {h:'Sandbox',p:'Pick an expression and change the multiplier, then expand it. Try a negative multiplier on a bracket with two negative terms.',go:()=>fresh(SAND[si])},
  {h:'Challenge',p:'',go:()=>newChal()}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.chk()});
 const SAND=[T(0,-3,[[1,1],[-4,0]]),T(7,-1,[[1,1],[-1,0]]),T(4,-3,[[1,1],[2,0]]),T(0,-5,[[2,0],[-1,1]]),T(1,-4,[[2,0],[-1,1]]),T(0,2,[[-3,1],[5,0]])];let si=0;
 A=FK.shell(c,{steps,ratio:.5,tall:.9,draw,onStep:A=>{chal.hidden=A.step!==6;sand.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Multiply and collect'},box);
   sand=E('div',{class:'fl-ctl',role:'group','aria-label':'Choose the expression'},box);
   const sb=(label,aria,f)=>{const b=E('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},sand,label);b.onclick=f};
   sb('Next expression','Next expression',()=>{si=(si+1)%SAND.length;load(SAND[si]);tell('New expression: '+exprTxt(st.E))});
   const setK=d=>{const k=st.E.k+d;if(!k||abs(k)>6)return;load({...st.E,k});tell('Multiplier now '+chipTxt(st.E)+': '+exprTxt(st.E))};
   sb('Multiplier − 1','Make the multiplier one less',()=>setK(-1));sb('Multiplier + 1','Make the multiplier one more',()=>setK(1));
   chal=E('div',{class:'fl-chal'},A.below);
   const inBox=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
   A.gest({down:p=>{if(!st.lock&&!allDone()&&inBox(p,st.chipBox)){Object.assign(st.chip,{drag:true,x:p.x,y:p.y});A.redraw();return true}
     const h=hits.find(t=>inBox(p,t));if(!h)return false;if(h.collect)collect();else multiply(h.i);return false},
    move:p=>{st.chip.x=p.x;st.chip.y=p.y;A.redraw()},
    up:p=>{st.chip.drag=false;const h=p&&hits.find(t=>t.i!=null&&!st.done[t.i]&&p.x>=t.x-12&&p.x<=t.x+t.w+12&&p.y>=t.y-30&&p.y<=t.y+t.h+30);
     if(h)multiply(h.i);else{tell('Drop the chip right on a term inside the bracket.');A.redraw()}}});
   sync()}});
 // ---------- challenge: type the simplified expansion ----------
 const CH=[T(10,-2,[[1,1],[-3,0]]),T(0,-3,[[1,1],[-4,0]]),T(0,-1,[[2,1],[-7,0]]),T(4,-3,[[1,1],[2,0]]),T(0,-5,[[2,0],[-1,1]]),T(7,-1,[[1,1],[-1,0]]),T(0,-2,[[3,1],[4,0]]),T(1,-4,[[2,0],[-1,1]])];let qi=-1;
 function newChal(){qi=(qi+1)%CH.length;st.chk=()=>{};st.lock=true;st.showing=false;load(CH[qi]);if(read)read.textContent='';st.q={E:CH[qi],want:expand(CH[qi])};
  chal.innerHTML=`<p><b>Expand and simplify ${exprTxt(st.E)}.</b> Type your answer, for example 3 − 2x.</p><label>Answer <input type="text" class="fl-in" autocomplete="off" aria-label="your answer"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  chal.querySelector('.lbtn').onclick=judge;chal.querySelector('.fl-in').onkeydown=e=>{if(e.key==='Enter')judge()};sync()}
 // read "16 − 2x", "-2x+16", "x - 5", "8" into an x coefficient and a constant
 function readLin(s){s=s.replace(/[−–]/g,'-').replace(/[\s*]/g,'').toLowerCase();if(!s||!/^[-+]?(\d*x|\d+)([-+](\d*x|\d+))*$/.test(s))return null;let xc=0,cc=0;
  for(const m of s.matchAll(/([-+]?)(\d*)(x?)/g)){if(!m[0])continue;const sg=m[1]==='-'?-1:1;if(m[3])xc+=sg*(m[2]===''?1:+m[2]);else if(m[2]!=='')cc+=sg*+m[2]}return{xc,cc}}
 function judge(){const fb=chal.querySelector('.fl-fb'),q=st.q;if(!q||st.won)return;const r=readLin(chal.querySelector('.fl-in').value);
  if(!r){fb.textContent='Type an expression such as 16 − 2x or −3x + 12.';return}
  const same=(a,b)=>a.xc===b.xc&&a.cc===b.cc,E=q.E,want=q.want,ks=chipTxt(E),is=s=>{const v=expand(E,s);return !same(v,want)&&same(v,r)};let m;
  if(same(r,want)){st.won=true;fb.innerHTML=`✓ ${exprTxt(E)} = ${lin(want,!!E.e)}. Watch the working above. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;auto();return}
  A.sound.miss();const t1=join([E.t[1]]);
  if(E.e&&is('early'))m=`You did ${E.e} ${E.k<0?'−':'+'} ${abs(E.k)} first. Multiplying comes before subtracting: expand ${ks}(…) first, then collect.`;
  else if(is('first'))m=`Only the first term was multiplied. ${ks} multiplies ${t1} too: ${ks} × ${br(E.t[1])} = ${pl(E.k*E.t[1].co,E.t[1].x)}.`;
  else if(is('sign2'))m=`Check the sign of ${ks} × ${br(E.t[1])}. ${ruleFor(E.k,E.t[1].co).replace(/^./,ch=>ch.toUpperCase())}, so it is ${pl(E.k*E.t[1].co,E.t[1].x)}.`;
  else if(is('posk'))m=`The multiplier is ${ks}, not ${abs(E.k)}: the minus sign in front belongs to it, so every term in the bracket changes sign.`;
  else if(is('xsign'))m=`Check the sign of the x term: ${ks} × ${br(E.t.find(t=>t.x))} = ${pl(E.k*E.t.find(t=>t.x).co,true)}.`;
  else m=`Not quite. Multiply each term in the bracket by ${ks}, using the sign rules, then collect the numbers.`;
  fb.innerHTML=m+' <button type="button" class="linkish fl-work">Show the working</button>';fb.querySelector('.fl-work').onclick=()=>{load(q.E);auto(()=>{st.won=true;fb.innerHTML=`The working is above: ${lin(want,!!E.e)}. <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=newChal})}}
 A.start()})})();
