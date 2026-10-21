/* Flagship 2 – place value: × 10 and ÷ 10. The digits move; the decimal point never does.
   Hook: an apple stall (35p each, crates of 10, pallets of 100). Glossy digit tiles glide between columns with spring easing,
   placeholder zeros fade in, ten ones fuse into a ten. Sandbox with ×10 ×100 ÷10 ÷100, then a misconception-aware challenge. */
(()=>{const PL=[3,2,1,0,-1,-2,-3],NM={3:'thousands',2:'hundreds',1:'tens',0:'ones','-1':'tenths','-2':'hundredths','-3':'thousandths'},SH={3:'Th',2:'H',1:'T',0:'O','-1':'t','-2':'h','-3':'th'};
const fmt=v=>{let s=(Math.round(v*1000)/1000).toFixed(3).replace(/\.?0+$/,'');return s===''?'0':s};
VIS.reg('flagplace',c=>{let A,tiles=[],chal,ops,inp,hist=[],fuse=0,apples=[];const st={k:0};
 const setN=v=>{v=Math.round(v*1000)/1000;const s=v.toFixed(3),[I,F]=s.split('.');tiles=[];const id=I.replace(/^0+(?=\d)/,'');
  [...id].forEach((d,i)=>{const p=id.length-1-i;tiles.push({d:+d,p,x:p,a:1})});[...F].forEach((d,i)=>tiles.push({d:+d,p:-1-i,x:-1-i,a:1}));
  trim();A.redraw()};
 const trim=()=>{const has=tiles.filter(t=>t.d);if(!has.length){tiles=[{d:0,p:0,x:0,a:1}];return}const lo=Math.min(...has.map(t=>t.p)),hi=Math.max(...has.map(t=>t.p));tiles=tiles.filter(t=>t.d||(t.p<=Math.max(hi,0)&&t.p>=Math.min(lo,0)))};
 const val=()=>tiles.reduce((s,t)=>s+t.d*Math.pow(10,t.p),0);
 const shift=k=>{const nv=val()*Math.pow(10,k);if(nv>=9999.9995||(nv>0&&nv<.0005)){A.sound.miss();c.say('That would move a digit off the chart.');return false}
  const before=fmt(val());tiles=tiles.filter(t=>t.d);tiles.forEach(t=>{t.p+=k;A.tween(t,{x:t.p},650,'back')});
  const ps=tiles.map(t=>t.p),lo=Math.min(0,...ps),hi=Math.max(0,...ps);for(let p=lo;p<=hi;p++)if(!tiles.some(t=>t.p===p)){const z={d:0,p,x:p,a:0};tiles.push(z);A.tween(z,{a:1},500,'out')}
  A.sound.pop();hist.push(`${before} ${k>0?'×':'÷'} ${Math.pow(10,Math.abs(k))} = ${fmt(val())}`);if(hist.length>4)hist.shift();upd();goal&&setTimeout(goal.check,50);if(A.step===6&&st.chk&&!st.c.won)setTimeout(()=>st.chk(k),700);return true};
 const upd=()=>{if(ops)ops.hidden=A.step!==5;if(ops)ops.querySelector('.fl-hist').innerHTML=hist.map(h=>`<li>${h}</li>`).join('');const v=fmt(val());c.say(`The number is ${v}.`);A.cv.setAttribute('aria-label',A.step===0?'Illustration: a fruit stall with apples at 35p each, a crate of 10 and a pallet of 100.':`Place-value chart showing ${v}: `+tiles.filter(t=>t.d||t.p>=0).sort((a,b)=>b.p-a.p).map(t=>`${t.d} ${NM[t.p]}`).join(', ')+'. The decimal point stays fixed between ones and tenths.');A.redraw()};
 const tgt=(v,msg)=>({check:()=>{if(Math.abs(val()-v)<1e-9)A.done(msg)}});let goal=null;
 const steps=[
  {h:'The apple stall',p:'Apples cost £0.35 each. A crate holds 10 and a pallet holds 100.',predict:{q:'What does a crate of 10 apples cost?',opts:['£0.350','£3.50','£35'],ans:1},task:'Tap the empty crate to fill it',show:()=>{st.fill=1},go:()=>{apples=[];st.k=0;st.fill=0;goal=null}},
  {h:'Ten of a column make one of the next',p:'The stall has 38 apples: 3 tens and 8 ones. Add apples one at a time.',predict:{q:'What happens when the ones column reaches ten?',opts:['It shows 10','They become 1 ten','Nothing special'],ans:1},task:'Tap the chart to add apples until the ones overflow',show:()=>{addOne();setTimeout(addOne,300)},go:()=>{goal=null;st.r={t:3,o:8};st.f=null;setN(38)}},
  {h:'A crate: 0.35 × 10',p:'× 10 makes every digit worth ten times more, so each one moves to the next column on the left.',task:'Drag the digits left to make 0.35 × 10',show:()=>shift(1),go:()=>{setN(.35);hist=[];goal=tgt(3.5,'£3.50 a crate. The point stayed put; the digits moved.'+A.reveal(0))}},
  {h:'A pallet: 0.35 × 100',p:'One question: how far do the digits move this time?',task:'Drag the digits to make 0.35 × 100',show:()=>shift(2),go:()=>{setN(.35);hist=[];goal=tgt(35,'£35 a pallet: every digit moved two places left.')}},
  {h:'Back again: 35 ÷ 100',p:'Dividing goes the other way.',task:'Drag the digits to make 35 ÷ 100',show:()=>shift(-2),go:()=>{setN(35);hist=[];goal=tgt(.35,'0.35: back to one apple. A 0 fills the ones place.')}},
  {h:'Sandbox',p:'Drag the digits, or type a number. Can you get from 0.007 to 7000?',go:()=>{hist=[];goal=null;setN(4.7)}},
  {h:'Challenge',p:'',go:()=>{goal=null;newChal()}}];
 const grab={on:false,x0:0,off:0};
 const addOne=()=>{const R=st.r;if(!R||st.f&&st.f.u<1||R.t>=9)return;R.o++;A.sound.tick();if(R.o<10){setN(R.t*10+R.o);upd();return}
  st.f={u:0};A.redraw();setTimeout(()=>A.tween(st.f,{u:1},1100,'io',()=>{R.t++;R.o=0;st.f=null;setN(R.t*10);upd();A.sound.pop();A.fx.add(16,i=>({x:A.W*.3,y:A.H*.75,vx:(Math.random()-.5)*240,vy:-Math.random()*220,g:500,life:.8,r:2.5,col:[A.col.or,A.col.gr][i%2],drag:.5}));A.done(`Ten ones became one ten: ${R.t*10-1} + 1 = ${R.t*10}. The tens digit went up; the ones went back to 0.`+A.reveal(1))}),650)};

 const dragOK=()=>A.step>=2&&A.step<=5||A.step===6&&st.c&&!st.c.won;
 // ---------- drawing ----------
 const chart=A=>{const{ctx,W,H,paint:P,col:C}=A,dk=C.dark,n=PL.length,m=A.narrow?8:16,cw=(W-m*2)/n,th=Math.min(cw*1.6,H*.42),top=A.step===1?30:Math.max(40,(H-th-70)/2),cx=p=>m+(3-p)*cw+cw/2;st.g={m,cw,top,th};A.g=st.g;A.pst=st;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.07)],[1,C.pn]]);P.rrect(0,0,W,H,12);ctx.fill();
  const band=[C.vi,C.pk,C.or,C.gr,C.cy,C.ac,C.vi];
  PL.forEach((p,i)=>{const x=m+i*cw;ctx.fillStyle=A.alpha(band[i],dk?.14:.12);P.rrect(x+2,top,cw-4,th+28,10);ctx.fill();ctx.fillStyle=A.alpha(band[i],.9);ctx.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;ctx.textAlign='center';ctx.fillText(A.narrow||cw<100?SH[p]:NM[p][0].toUpperCase()+NM[p].slice(1),x+cw/2,top-12);ctx.fillStyle=C.mu;ctx.font='11px system-ui,sans-serif';ctx.fillText(p>=0?String(Math.pow(10,p)):'1/'+Math.pow(10,-p),x+cw/2,top+th+20)});
  // the decimal point – fixed, glowing
  const dx=m+4*cw,dy=top+th*.72;P.glow(C.or,16);ctx.fillStyle=C.or;ctx.beginPath();ctx.arc(dx,dy,Math.max(5,cw*.09),0,7);ctx.fill();P.noShadow();
  // tiles
  const tw=cw*.84,tht=th*.86;for(const t0 of tiles){const t=grab.on?{...t0,x:t0.x+grab.off}:t0;if(Math.abs(t.x-t.p)>.02){const xx=cx(t.x),dir=Math.sign(t.p-t.x);ctx.fillStyle=A.alpha(C.or,.35);for(let k=1;k<4;k++){ctx.globalAlpha=t.a*(.5-k*.12);P.rrect(xx-tw/2+dir*k*cw*.12,top+th*.07,tw,tht,12);ctx.fill()}ctx.globalAlpha=1}
   const x=cx(t.x),y=top+th*.07,lift=Math.min(1,Math.abs(t.x-t.p)*2)*10;ctx.globalAlpha=t.a;
   P.shadow(14+lift,6+lift/2,dk?.55:.3);ctx.fillStyle=P.lin(0,y-lift,0,y+tht-lift,t.d?[[0,dk?'#f8fafc':'#ffffff'],[1,dk?'#cbd5e1':'#e2e8f0']]:[[0,A.alpha(C.mu,.25)],[1,A.alpha(C.mu,.15)]]);P.rrect(x-tw/2,y-lift,tw,tht,12);ctx.fill();P.noShadow();
   ctx.fillStyle=t.d?'#0f172a':C.mu;ctx.font=`700 ${Math.round(tht*.62)}px ui-rounded,system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(t.d),x,y+tht/2-lift+2);ctx.textBaseline='alphabetic';ctx.globalAlpha=1}
  // value strip + base-ten picture of worth
  const v=val(),by=top+th+44;P.label('= '+fmt(v),W/2,by,{font:`800 ${A.narrow?20:24}px system-ui,sans-serif`,bg:A.alpha(C.ac,.85)});
  if(A.step===1){const R=st.r,sz=Math.max(8,Math.min(15,W/46)),y0=by+28,u=st.f?st.f.u:0,cube=(x,y,c2)=>{ctx.fillStyle=P.lin(x,y,x+sz,y+sz,[[0,A.mix(c2,'#ffffff',.4)],[1,c2]]);P.rrect(x,y,sz*.9,sz*.9,2.5);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(x+1.5,y+1.5,sz*.9-3,1.5)};
   const tx0=W*.06,ox0=W*.56;ctx.fillStyle=C.mu;ctx.font='600 11px system-ui';ctx.textAlign='left';ctx.fillText('tens',tx0,y0-6);ctx.fillText('ones',ox0,y0-6);
   for(let r=0;r<R.t;r++){P.shadow(6,2,.3);for(let q=0;q<10;q++)cube(tx0+q*sz,y0+r*sz*1.25,C.or);P.noShadow()}
   const n=R.o;for(let q=0;q<n;q++){const sx=ox0+(q%5)*sz*1.15,sy=y0+Math.floor(q/5)*sz*1.2,ex=tx0+q*sz,ey=y0+R.t*sz*1.25,k=FK.ease.io(Math.min(1,Math.max(0,u*1.4-q*.04)));cube(sx+(ex-sx)*k,sy+(ey-sy)*k-Math.sin(k*Math.PI)*28,A.mix(C.gr,C.or,k))}
   if(n>=10&&u<.2)P.label('10 ones won’t fit in one column!',W/2,y0+sz*4.2,{pill:1,bg:A.alpha(C.rd,.85),col:'#fff'});
   else if(!A.isDone&&A.pred[1]!=null){const a=.6+.4*Math.sin(performance.now()/220);ctx.globalAlpha=a;P.label('👆 tap to add an apple',ox0+sz*3,y0+sz*4,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}}};
 const stall=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,dk=C.dark;ctx.fillStyle=P.lin(0,0,0,H,dk?[[0,'#1b2440'],[1,'#0b1222']]:[[0,'#fde7c8'],[1,'#f6c58f']]);ctx.fillRect(0,0,W,H);
  // brick back wall + warm lamp light
  ctx.fillStyle=dk?'rgba(255,255,255,.035)':'rgba(120,53,15,.07)';for(let y=H*.2,r=0;y<H*.78;y+=14,r++)for(let x=(r%2)*18-18;x<W;x+=36)ctx.fillRect(x+1,y+1,34,12);
  ctx.fillStyle=P.rad(W*.5,H*.2,0,W*.6,[[0,'rgba(255,214,140,.38)'],[1,'rgba(255,214,140,0)']]);ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#334155';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W*.5,H*.16);ctx.lineTo(W*.5,H*.24);ctx.stroke();ctx.fillStyle='#1f2937';ctx.beginPath();ctx.moveTo(W*.47,H*.24);ctx.lineTo(W*.53,H*.24);ctx.lineTo(W*.55,H*.28);ctx.lineTo(W*.45,H*.28);ctx.fill();P.glow('#fde68a',18);P.ball(W*.5,H*.285,5,'#fef9c3');P.noShadow();
  // chalkboard sign
  P.shadow(10,4,.35);ctx.fillStyle='#78350f';P.rrect(W*.04,H*.26,W*.26,H*.2,6);ctx.fill();ctx.fillStyle='#1c2a22';P.rrect(W*.05,H*.275,W*.24,H*.17,4);ctx.fill();P.noShadow();
  ctx.fillStyle='#f8fafc';ctx.font=`600 ${A.narrow?11:15}px "Comic Sans MS",cursive,system-ui`;ctx.textAlign='center';ctx.fillText('APPLES',W*.17,H*.335);ctx.fillStyle='#fde68a';ctx.fillText('35p each',W*.17,H*.4);
  const aw=W/8;for(let i=0;i<8;i++){ctx.fillStyle=i%2?'#f8fafc':'#dc2626';ctx.beginPath();ctx.moveTo(i*aw,0);ctx.lineTo((i+1)*aw,0);ctx.lineTo((i+1)*aw,H*.12);ctx.quadraticCurveTo((i+.5)*aw,H*.19,i*aw,H*.12);ctx.fill()}
  const gy=H*.78;ctx.fillStyle=P.lin(0,gy,0,H,[[0,'#92400e'],[1,'#78350f']]);ctx.fillRect(0,gy,W,H-gy);
  const ap=(x,y,r)=>{P.ball(x,y,r,'#e11d48');ctx.strokeStyle='#14532d';ctx.lineWidth=Math.max(1.5,r*.15);ctx.beginPath();ctx.moveTo(x,y-r*.8);ctx.lineTo(x+r*.15,y-r*1.2);ctx.stroke();ctx.fillStyle='#16a34a';ctx.beginPath();ctx.ellipse(x+r*.4,y-r*1.05,r*.35,r*.16,-.5,0,7);ctx.fill()};
  const r=Math.max(9,W/46);ap(W*.14,gy-r,r*1.3);P.label('£0.35',W*.14,gy-r*3.2,{bg:'#0f172a'});
  const cx0=W*.33,cwid=W*.22,ch=H*.2;if(st.fill)st.k+=dt;const n=st.fill?Math.min(10,Math.floor(st.k*6)):0;if(!st.fill&&A.pred[0]!=null&&!A.isDone){const a=.6+.4*Math.sin(performance.now()/220);ctx.globalAlpha=a;P.label('👆 tap the crate',cx0+cwid/2,gy-ch-r*3.4,{pill:1,bg:A.alpha(C.am,.95),col:'#111'});ctx.globalAlpha=1}if(n===10&&!A.isDone)A.done('A full crate: 10 apples. What does it cost? Find out next.');
  for(let i=0;i<n;i++){const col=i%5,row=Math.floor(i/5);ap(cx0+cwid*.12+col*cwid*.19,gy-ch*.55-row*r*1.6,r)}
  P.shadow(10,4,.3);ctx.fillStyle=P.lin(0,gy-ch,0,gy,[[0,'#d97706'],[1,'#92400e']]);P.rrect(cx0,gy-ch*.5,cwid,ch*.5,4);ctx.fill();P.noShadow();P.label('crate of 10 · £?',cx0+cwid/2,gy-ch-r*1.4,{bg:'#0f172a'});
  const px=W*.62,pw=W*.32;for(let row=0;row<4;row++)for(let col=0;col<8;col++)ap(px+pw*.07+col*pw*.12,gy-H*.06-row*r*1.55,r*.85);
  P.shadow(10,4,.3);ctx.fillStyle=P.lin(0,0,0,H,[[0,'#a16207'],[1,'#713f12']]);ctx.fillRect(px,gy-H*.05,pw,H*.05);P.noShadow();P.label('pallet of 100 · £?',px+pw/2,gy-H*.36,{bg:'#0f172a'});
  return n<10};
 A=FK.shell(c,{steps,ratio:.5,tall:.74,draw:(A,dt)=>{if(A.step===0)return stall(A,dt);const r=chart(A);if(!A.isDone&&A.step>=2&&A.step<=4&&st.g&&!grab.on){const g=st.g,u=A.reduced()?.5:(performance.now()%1600)/1600,dir=A.step===4?1:-1,x=A.W/2+dir*(u-.5)*g.cw*1.4,y=g.top+g.th+52;A.ctx.globalAlpha=Math.sin(u*Math.PI);A.paint.label(dir<0?'👆 drag ←':'👆 drag →',x,y,{pill:1,bg:A.alpha(A.col.am,.9),col:'#111'});A.ctx.globalAlpha=1;return true}return r},onStep:A=>{ops.hidden=A.step!==5;chal.hidden=A.step!==6;upd()},
  init:A=>{const E=c.el;ops=E('div',{class:'fl-ctl'},A.below);ops.innerHTML='<label>Number <input type="number" class="fl-num" step="any" min="0" max="9999.999" value="4.7" aria-label="starting number"></label>'+['×10','×100','÷10','÷100'].map(o=>`<button type="button" class="lbtn sm" data-op="${o}">${o}</button>`).join('')+'<ol class="fl-hist" aria-label="History"></ol>';
   ops.querySelector('.fl-num').onchange=e=>{const v=+e.target.value;if(v>=0&&v<9999.9995){hist=[];setN(v);upd()}};ops.querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>{const o=b.dataset.op;shift((o[0]==='×'?1:-1)*(o.length-2))});
   chal=E('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   A.every(dt=>A.step===0&&(st.k<2||!A.isDone));A.every(()=>!A.isDone&&A.step>=2&&A.step<=4);
   A.gest({down:p=>{if(A.step===0){if(A.pred[0]!=null){st.fill=1;A.sound.pop();A.redraw()}return false}if(A.step===1){if(A.pred[1]!=null)addOne();return false}const g=st.g;if(!g||!dragOK()||p.y<g.top-20||p.y>g.top+g.th+40)return false;grab.on=true;grab.x0=p.x;grab.off=0;A.sound.tick();return true},
    move:p=>{grab.off=-(p.x-grab.x0)/st.g.cw;const k=Math.round(grab.off);if(k!==grab.k){grab.k=k;if(k)A.sound.tick()}A.redraw()},
    up:p=>{if(p&&grab.on)grab.off=-(p.x-grab.x0)/st.g.cw;const k=Math.round(grab.off);tiles.forEach(t=>t.x+=grab.off);grab.on=false;grab.off=0;grab.k=0;if(k&&Math.abs(k)<=3){if(!shift(k))tiles.forEach(t=>A.tween(t,{x:t.p},400,'back'))}else tiles.forEach(t=>A.tween(t,{x:t.p},400,'back'))}});A.every(()=>A.step===1)}});
 const Q=[[4.7,1],[0.35,2],[52,-1],[6,-2],[0.08,1],[300,-2],[2.05,1],[17.4,-1]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[n,k]=Q[qi],op=(k>0?'×':'÷')+' '+Math.pow(10,Math.abs(k));st.c={n,k,ans:+(n*Math.pow(10,k)).toFixed(4),mv:0,won:false,op};setN(n);hist=[];
  chal.innerHTML=`<p><b>${fmt(n)} ${op} = ?</b> Drag the digits on the chart to show the answer.</p><button type="button" class="lbtn sm ghost fl-z">Put a 0 on the end</button> <button type="button" class="lbtn sm ghost fl-r">Reset</button> <span class="fl-kb"><button type="button" class="lbtn sm ghost" data-m="1" aria-label="move digits one place left">← digits</button> <button type="button" class="lbtn sm ghost" data-m="-1" aria-label="move digits one place right">digits →</button></span><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const fb=chal.querySelector('.fl-fb'),ns=fmt(n);chal.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{if(!st.c.won)shift(+b.dataset.m)});
  chal.querySelector('.fl-r').onclick=()=>{if(st.c.won)return;st.c.mv=0;setN(n);fb.textContent=''};
  chal.querySelector('.fl-z').onclick=()=>{if(st.c.won)return;if(ns.includes('.')||k!==1){A.sound.miss();fb.textContent=ns.includes('.')?`Putting a 0 on the end of a decimal changes nothing: ${ns}0 is still ${ns}. Every digit has to move instead.`:`A 0 on the end only works for × 10 with a whole number, and this is ${op}.`;return}
   fb.textContent='For a whole number × 10, a 0 on the end works, because every digit moved one place left. Watch:';shift(1)};
  st.chk=kk=>{const c=st.c;c.mv+=kk;if(Math.abs(val()-c.ans)<1e-9){c.won=true;fb.innerHTML=`✓ ${ns} ${op} = ${fmt(c.ans)}. Every digit moved ${Math.abs(k)} place${Math.abs(k)>1?'s':''} ${k>0?'left':'right'}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   A.sound.miss();fb.textContent=Math.sign(c.mv)!==Math.sign(k)?(k>0?'That way makes it smaller. Multiplying makes the number bigger, so digits move left.':'That way makes it bigger. Dividing makes the number smaller, so digits move right.'):Math.abs(c.mv)>Math.abs(k)?`Too far: ${op} moves the digits ${Math.abs(k)} place${Math.abs(k)>1?'s':''}, one for each 0 in ${Math.pow(10,Math.abs(k))}. Press Reset.`:`Right direction. ${op} needs ${Math.abs(k)} places in total; you have moved ${Math.abs(c.mv)}.`}};
 A.start()})})();
