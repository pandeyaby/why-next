/* Flagship – the identity sin²θ + cos²θ = 1 (16–18): squares on the legs of the unit-circle triangle always fill the unit square
   (Pythagoras), in every quadrant; use it to find one ratio from another (the quadrant picks the sign) and to simplify expressions. */
(()=>{const M=Math,F=(w,z)=>w+' '+z+'px system-ui',R2=v=>M.round(v*1000)/1000,D=M.PI/180;
 const CASES=[{g:'s',v:.6,q:2,a:'cos',val:-.8,sq:'0.64',vt:'−0.8'},{g:'c',v:5/13,q:4,a:'sin',val:-12/13,txt:'5/13',sq:'144/169',vt:'−12/13'},{g:'s',v:-.28,q:3,a:'cos',val:-.96,txt:'−0.28',sq:'0.9216',vt:'−0.96'}];
 const EX=[{s:'(1 − cos²θ) / sin θ',f:t=>(1-M.cos(t)**2)/M.sin(t),mv:[[['Use 1 − cos²θ = sin²θ','ok','sin²θ / sin θ',t=>M.sin(t)**2/M.sin(t)],['Use 1 − cos²θ = (1 − cos θ)²','sq'],['Use 1 − cos²θ = sin θ','root']],
   [['Cancel one sin θ','ok','sin θ',t=>M.sin(t)],['Cancel all of it to get 1','all'],['Leave it: no rule applies','stop']]]},
  {s:'(sin θ + cos θ)²',f:t=>(M.sin(t)+M.cos(t))**2,mv:[[['Expand: sin²θ + 2 sin θ cos θ + cos²θ','ok','sin²θ + cos²θ + 2 sin θ cos θ',t=>1+2*M.sin(t)*M.cos(t)],['Square each: sin²θ + cos²θ','exp'],['Swap the bracket for 1','br']],
   [['Swap sin²θ + cos²θ for 1','ok','1 + 2 sin θ cos θ',t=>1+2*M.sin(t)*M.cos(t)],['Swap 2 sin θ cos θ for 2','two'],['Swap sin²θ for sin θ','root']]]}];
 const FB={sq:'Squaring a difference adds a middle term: (1 − cos θ)² = 1 − 2cos θ + cos²θ. Rearrange the identity instead.',root:'sin²θ means (sin θ)². The square stays.',
  all:'sin²θ ÷ sin θ leaves one sin θ, not 1.',stop:'A square over its base cancels: sin²θ / sin θ = sin θ.',exp:'(a + b)² ≠ a² + b². The middle term 2ab is missing.',
  br:'The identity needs sin²θ + cos²θ, not (sin θ + cos θ)². Expand first.',two:'sin θ cos θ is not 1, so 2 sin θ cos θ is not 2. Only sin²θ + cos²θ is 1.',
  acute:'The circle definition works at every angle, and squares are never negative.',eq:'They are equal only at 45°, 225° and so on.',arg:'sin²θ means (sin θ)², the sine squared, not sin of θ².',
  dbl:'Squaring is not doubling: (0.5)² = 0.25.',sign:'Squaring hid the sign. The quadrant decides it.',minus:'1 − 0.6 subtracts the ratios, not their squares. Use cos² = 1 − sin².',one:'(sin θ + cos θ)² has a middle term.',
  neg:'Squares are never negative, so the total cannot be −1.',more:'The point is 1 from O in every quadrant, so the total stays 1.'};
 const CQ=[['Why is sin²θ + cos²θ = 1 true for every angle?',[['(cos θ, sin θ) is 1 from O, so x² + y² = 1','ok'],['It is only true for acute angles','acute'],['sin θ and cos θ are always equal','eq']]],
  ['What does sin²θ mean?',[['(sin θ)²','ok'],['sin(θ²)','arg'],['2 sin θ','dbl']]],
  ['Simplify (sin θ + cos θ)².',[['1 + 2 sin θ cos θ','ok'],['1','one'],['2','two']]],
  ['cos θ = 0.6. What is sin θ?',[['0.8 or −0.8, set by the quadrant','ok'],['0.4','minus'],['0.8 always','sign']]],
  ['Simplify 1 − sin²θ.',[['cos²θ','ok'],['(1 − sin θ)²','sq'],['cos θ','root']]]];
 const QN=['','I','II','III','IV'],TR=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]];
VIS.reg('flagpyid',c=>{let A,pad,chal,read;
 const G={th:40,lo:0,hi:0,qs:[],ci:0,got:0,pick:-1,ei:0,lines:[],mi:0,solved:0,miss:'',gen:0,check:()=>{},Q:null};
 const mode=()=>['sq','quad','find','simp','free','quiz'][A.step];
 function geo(){const W=A.W,H=A.H,N=A.narrow,top=N?84:74,bar=H-44,cy=top+(bar-top-30)/2+6,R=M.min(W*.27,(bar-top-40)*.4);return{W,H,N,top,bar,cx:W/2,cy,R}}
 const quad=t=>{t=((t%360)+360)%360;return t<90?1:t<180?2:t<270?3:4};
 const cs=()=>M.cos(G.th*D),sn=()=>M.sin(G.th*D),f3=v=>(M.abs(v)<.0005?0:v).toFixed(3);
 function axes(x,g,C){x.strokeStyle=A.alpha(C.mu,.5);x.lineWidth=1;x.beginPath();x.moveTo(g.cx-g.R*1.5,g.cy);x.lineTo(g.cx+g.R*1.5,g.cy);x.moveTo(g.cx,g.cy-g.R*1.2);x.lineTo(g.cx,g.cy+g.R*1.2);x.stroke();
  x.strokeStyle=A.alpha(C.tx,.35);x.lineWidth=2;x.beginPath();x.arc(g.cx,g.cy,g.R,0,7);x.stroke();
  x.fillStyle=A.alpha(C.mu,.9);x.font=F(700,12);x.textAlign='center';[['I',1,-1],['II',-1,-1],['III',-1,1],['IV',1,1]].forEach(([l,a,b])=>x.fillText(l,g.cx+a*g.R*1.25,g.cy+b*g.R*.95))}
 function sqView(x,g,C){axes(x,g,C);const c0=cs(),s0=sn(),px=g.cx+g.R*c0,py=g.cy-g.R*s0;
  x.fillStyle=A.alpha(C.cy,.28);x.fillRect(M.min(g.cx,px),s0>=0?g.cy:g.cy-g.R*M.abs(c0),g.R*M.abs(c0),g.R*M.abs(c0));
  x.fillStyle=A.alpha(C.gr,.3);x.fillRect(c0>=0?px:px-g.R*M.abs(s0),M.min(g.cy,py),g.R*M.abs(s0),g.R*M.abs(s0));
  x.lineWidth=3;x.strokeStyle=C.cy;x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(px,g.cy);x.stroke();x.strokeStyle=C.gr;x.beginPath();x.moveTo(px,g.cy);x.lineTo(px,py);x.stroke();
  x.strokeStyle=C.vi;x.beginPath();x.moveTo(g.cx,g.cy);x.lineTo(px,py);x.stroke();A.paint.ball(px,py,11,C.vi);
  x.fillStyle=C.tx;x.font=F(800,13);x.textAlign='center';x.fillText('1',(g.cx+px)/2-13*s0,(g.cy+py)/2-13*c0+4);x.strokeStyle=C.am;x.lineWidth=2;x.beginPath();x.arc(g.cx,g.cy,16,0,-G.th*D,true);x.stroke();
  const k=R2(c0*c0),b0=g.bar,w=g.W-40;x.fillStyle=A.alpha(C.cy,.5);A.paint.rrect(20,b0,w*k,22,4);x.fill();x.fillStyle=A.alpha(C.gr,.55);A.paint.rrect(20+w*k,b0,w*(1-k),22,4);x.fill();
  x.fillStyle=C.tx;x.font=F(800,g.N?12:13);x.textAlign='left';x.fillText(`cos²θ = ${k.toFixed(3)}`,20,b0-6);x.textAlign='right';x.fillText(`sin²θ = ${(1-k).toFixed(3)}`,g.W-20,b0-6);x.textAlign='center';x.fillText('total 1',g.W/2,b0+15)}
 function cand(g){const K=CASES[G.ci];if(K.g==='s'){const h=M.sqrt(1-K.v*K.v);return[[-h,K.v],[h,K.v]]}const h=M.sqrt(1-K.v*K.v);return[[K.v,h],[K.v,-h]]}
 const pt=(g,p)=>({x:g.cx+g.R*p[0],y:g.cy-g.R*p[1]});
 function findView(x,g,C){axes(x,g,C);const K=CASES[G.ci];x.strokeStyle=C.am;x.lineWidth=2;x.setLineDash([6,5]);x.beginPath();
  if(K.g==='s'){const y=g.cy-g.R*K.v;x.moveTo(g.cx-g.R*1.4,y);x.lineTo(g.cx+g.R*1.4,y)}else{const X=g.cx+g.R*K.v;x.moveTo(X,g.cy-g.R*1.15);x.lineTo(X,g.cy+g.R*1.15)}x.stroke();x.setLineDash([]);
  cand(g).forEach((p,i)=>{const q=pt(g,p),on=G.pick===i;x.fillStyle=on?C.gr:A.alpha(C.vi,.85);x.beginPath();x.arc(q.x,q.y,on?14:12,0,7);x.fill();x.fillStyle=C.pn;x.font=F(800,12);x.textAlign='center';x.fillText('AB'[i],q.x,q.y+4)});
  if(G.pick>=0&&G.ok){const o=K.g==='s'?'sin':'cos';A.paint.label(`${K.a}²θ = 1 − ${o}²θ = ${K.sq}, so ${K.a} θ = ${K.vt}`,g.W/2,g.bar+11,{bg:A.alpha(C.gr,.9)})}
  else if(G.miss){x.fillStyle=C.rd;x.font=F(700,12);x.textAlign='center';x.fillText(G.miss,g.W/2,g.bar+15)}}
 function simpView(x,g,C){const E=EX[G.ei],t=40*D,L=[E.s].concat(G.lines.map(l=>l[0]));x.textAlign='left';
  L.forEach((s,i)=>{x.fillStyle=i===L.length-1?C.tx:C.mu;x.font=F(i===L.length-1?800:600,g.N?15:18);x.fillText((i?'= ':'')+s,16,g.top+40+i*(g.N?42:40))});
  const v0=E.f(t),v1=G.lines.length?G.lines[G.lines.length-1][1](t):v0;x.fillStyle=C.mu;x.font=F(700,12);x.fillText(`Check at θ = 40°: start ${v0.toFixed(4)}, now ${v1.toFixed(4)}`,16,g.H-48);
  if(G.miss){x.fillStyle=C.rd;wrap(x,G.miss,16,g.H-26,g.W-32,15)}}
 function head(){const m=mode();if(m==='sq'||m==='quad'||m==='free')return`θ = ${G.th}° (quadrant ${QN[quad(G.th)]})`;
  if(m==='find'){const K=CASES[G.ci];return`${K.g==='s'?'sin':'cos'} θ = ${K.txt||K.v}, θ in quadrant ${['','I','II','III','IV'][K.q]}`}
  if(m==='simp')return`Simplify ${EX[G.ei].s}`;return G.Q?G.Q.t:''}
 function sub(){const m=mode();if(m==='sq'||m==='quad'||m==='free')return`cos θ = ${f3(cs())}, sin θ = ${f3(sn())}. Squares: ${R2(cs()**2).toFixed(3)} + ${(1-R2(cs()**2)).toFixed(3)} = 1`;
  if(m==='find')return`Find ${CASES[G.ci].a} θ. Tap the point A or B in the right quadrant.`;if(m==='simp')return`Pick a move. Solved ${G.solved} of 2.`;return''}
 function draw(A){const{ctx:x,col:C}=A,g=geo(),m=mode();x.fillStyle=A.mix(C.pn,C.vi,.04);x.fillRect(0,0,g.W,g.H);
  if(m==='sq'||m==='quad'||m==='free')sqView(x,g,C);else if(m==='find')findView(x,g,C);else if(m==='simp')simpView(x,g,C);
  else if(G.Q&&G.Q.f){x.fillStyle=C.tx;x.font=F(800,g.N?22:30);x.textAlign='center';x.fillText(G.Q.f,g.W/2,g.H*.55)}
  x.textAlign='left';x.fillStyle=C.tx;x.font=F(800,g.N?14:17);wrap(x,head(),12,24,g.W-24,g.N?18:21);x.font=F(600,g.N?12:13);x.fillStyle=C.mu;wrap(x,sub(),12,g.N?48:50,g.W-24,16);A.fx.draw(x)}
 function wrap(x,s,X,Y,w,lh){let row='',n=0;for(const t of s.split(' ')){const tt=row?row+' '+t:t;if(row&&x.measureText(tt).width>w){x.fillText(row,X,Y+n++*lh);row=t}else row=tt}x.fillText(row,X,Y+n*lh)}
 function tell(m){const s=(m?m+' ':'')+head()+'. '+sub();c.say(s);A.cv.setAttribute('aria-label',s);if(read)read.textContent=m||'';controls();A.redraw();G.check()}
 function setTh(v,quiet){v=((M.round(v/5)*5)%360+360)%360;G.th=v;const q=quad(v);if(q===1){if(v<25)G.lo=1;if(v>65)G.hi=1}if(!G.qs.includes(q))G.qs.push(q);if(!quiet){A.sound.tick();tell('')}else A.redraw()}
 function choose(i){if(G.ok)return;const K=CASES[G.ci],p=cand(geo())[i],q=quad(M.atan2(p[1],p[0])/D);G.pick=i;
  if(q===K.q){G.ok=1;G.miss='';G.got++;A.sound.pop();tell(`Right: point ${'AB'[i]} is in quadrant ${['','I','II','III','IV'][q]}, so ${K.a} θ = ${K.vt}.`)}
  else{G.ok=0;A.sound.miss();G.miss=`Point ${'AB'[i]} is in quadrant ${['','I','II','III','IV'][q]}. The other point has the right signs.`;tell(G.miss)}}
 function nextCase(){G.ci=(G.ci+1)%CASES.length;G.pick=-1;G.ok=0;G.miss='';A.sound.tick();tell('')}
 function move(o){if(o[1]!=='ok'){G.miss=FB[o[1]];A.sound.miss();tell(G.miss);return}G.miss='';G.lines.push([o[2],o[3]]);G.mi++;A.sound.pop();
  if(G.mi>=EX[G.ei].mv.length){G.solved++;tell(`Done: ${EX[G.ei].s} = ${o[2]}. The check values match.`)}else tell('Good move.')}
 function nextEx(){G.ei=(G.ei+1)%EX.length;G.lines=[];G.mi=0;G.miss='';tell('')}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,lb)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':lb||null},pad,t).onclick=f};
  if(k==='sq'||k==='quad'||k==='free'){b('−15°',()=>setTh(G.th-15),'Turn back 15 degrees');b('+15°',()=>setTh(G.th+15),'Turn on 15 degrees');b('+90°',()=>setTh(G.th+90),'Turn on 90 degrees')}
  if(k==='find'){b('Point A',()=>choose(0));b('Point B',()=>choose(1));if(G.ok)b('Next case',nextCase)}
  if(k==='simp'){const E=EX[G.ei];if(G.mi<E.mv.length){const r=(G.mi+G.ei)%3,o=E.mv[G.mi].slice(r).concat(E.mv[G.mi].slice(0,r));o.forEach(z=>b(z[0],()=>move(z)))}else b('Next expression',nextEx)}}
 const when=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const play=(fs,ms)=>{const g=++G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*ms))};
 const reset=o=>{G.gen++;G.check=()=>{};Object.assign(G,{th:40,lo:0,hi:0,qs:[],ci:0,got:0,pick:-1,ok:0,ei:0,lines:[],mi:0,solved:0,miss:''},o||{})};
 const steps=[
  {h:'Squares on the legs',p:'The radius is 1. Its legs are cos θ across and sin θ up. Each leg has a square on it.',
   predict:{q:'As θ turns from 10° to 80°, what happens to cos²θ + sin²θ?',opts:['It grows','It stays at 1','It shrinks'],ans:1},
   task:'Turn the point below 25° and above 65°',show:()=>play([()=>setTh(20),()=>setTh(45),()=>setTh(70)],500),
   go:()=>{reset();G.check=when(0,()=>G.lo&&G.hi,()=>'One square grows as the other shrinks. Pythagoras on a hypotenuse of 1: cos²θ + sin²θ = 1² = 1.')}},
  {h:'Every quadrant',p:'Past 90°, cos θ or sin θ turns negative. Watch the squares.',
   predict:{q:'At 210°, cos θ and sin θ are both negative. What is cos²θ + sin²θ?',opts:['−1','1','It depends on the angle'],ans:1},
   task:'Visit quadrants II, III and IV',show:()=>play([()=>setTh(150),()=>setTh(210),()=>setTh(300)],500),
   go:()=>{reset();G.check=when(1,()=>[2,3,4].every(q=>G.qs.includes(q)),()=>'Signs change, but a square is never negative and the point is always 1 from O. The identity holds for every θ.')}},
  {h:'One ratio gives the other',p:'Knowing sin θ fixes cos²θ = 1 − sin²θ. That gives two points. The quadrant picks one.',
   predict:{q:'sin θ = 0.6 and θ is in quadrant II. What is cos θ?',opts:['0.8','−0.8','0.4'],ans:1},
   task:'Pick the right point in 2 cases',show:()=>play([()=>choose(0),nextCase,()=>choose(1)],600),
   go:()=>{reset();G.check=when(2,()=>G.got>=2,()=>'cos²θ = 1 − sin²θ gives the size. The quadrant gives the sign.')}},
  {h:'Simplify with it',p:'Swap sin²θ + cos²θ for 1, or 1 − cos²θ for sin²θ. The check at 40° must stay the same.',
   task:'Simplify both expressions',show:()=>play([()=>move(EX[0].mv[0][0]),()=>move(EX[0].mv[1][0]),nextEx,()=>move(EX[1].mv[0][0]),()=>move(EX[1].mv[1][0])],500),
   go:()=>{reset();G.check=when(3,()=>G.solved>=2,()=>'Each move used the identity or plain algebra, and the 40° check never changed.')}},
  {h:'Sandbox',p:'Drag the point anywhere. Find an angle where the two squares are equal.',go:()=>reset()},
  {h:'Challenge',p:'',go:()=>{G.gen++;G.check=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
 let qi=-1,run2=0;
 function ask(){qi++;let opts,t;if(qi%2===0){const T=TR[(qi/2)%TR.length],q=[2,3,4,1][(qi/2)%4],sS=q<3?1:-1,cS=q===1||q===4?1:-1;
   t=`sin θ = ${sS<0?'−':''}${T[0]}/${T[2]} and θ is in quadrant ${QN[q]}. What is cos θ?`;const r=`${T[1]}/${T[2]}`,ok=(cS<0?'−':'')+r,bad=(cS<0?'':'−')+r;
   opts=[[ok,'ok'],[bad,'sign'],[`${T[2]-T[0]}/${T[2]}`,'minus']];G.Q={t,f:`${T[0]}² + ${T[1]}² = ${T[2]}²`,a:` cos²θ = 1 − ${T[0]*T[0]}/${T[2]*T[2]} = ${T[1]*T[1]}/${T[2]*T[2]}, and quadrant ${QN[q]} makes cos θ = ${ok}.`}}
  else{const Q=CQ[((qi-1)/2)%CQ.length];t=Q[0];opts=Q[1].slice();G.Q={t}}
  const r=qi%opts.length;opts=opts.slice(r).concat(opts.slice(0,r));
  chal.innerHTML=`<p><b>${t}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');opts.forEach(o=>{c.el('button',{type:'button',class:'lbtn sm'},row,o[0]).onclick=()=>judge(o)});tell('Challenge: '+t)}
 function judge(o){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=o[1]==='ok';let m='Right.';
  if(o[1]==='sign')m='Squaring hid the sign. Check which axes the quadrant is right of and above.';else if(o[1]==='minus')m='That subtracts the ratios, not their squares. Use cos²θ = 1 − sin²θ.';else if(!ok)m=FB[o[1]];const ans=G.Q.a||'';if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}A.cv.setAttribute('aria-label',(ok?'Correct. ':'Not quite. ')+m+ans);
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ans}${ok?` Streak: ${run2}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 const ang=p=>{const g=geo();return M.atan2(g.cy-p.y,p.x-g.cx)/D};
 function down(p){const m=mode(),g=geo();if(m==='sq'||m==='quad'||m==='free'){setTh(ang(p),1);return true}
  if(m==='find'){const i=cand(g).findIndex(q=>{const z=pt(g,q);return M.hypot(p.x-z.x,p.y-z.y)<32});if(i>=0)choose(i)}return false}
 function mv(p){const m=mode();if(m==='sq'||m==='quad'||m==='free')setTh(ang(p),1)}
 function up(){const m=mode();if(m==='sq'||m==='quad'||m==='free')tell('')}
 A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;read.hidden=q;pad.hidden=q;if(!q)tell('')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Identity controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move:mv,up});reset();controls()}});
 A.start()})})();
