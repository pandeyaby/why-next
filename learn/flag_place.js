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
  A.sound.pop();hist.push(`${before} ${k>0?'×':'÷'} ${Math.pow(10,Math.abs(k))} = ${fmt(val())}`);if(hist.length>4)hist.shift();upd();return true};
 const upd=()=>{if(ops)ops.querySelector('.fl-hist').innerHTML=hist.map(h=>`<li>${h}</li>`).join('');const v=fmt(val());c.say(`The number is ${v}.`);A.cv.setAttribute('aria-label',A.step===0?'Illustration: a fruit stall with apples at 35p each, a crate of 10 and a pallet of 100.':`Place-value chart showing ${v}: `+tiles.filter(t=>t.d||t.p>=0).sort((a,b)=>b.p-a.p).map(t=>`${t.d} ${NM[t.p]}`).join(', ')+'. The decimal point stays fixed between ones and tenths.');A.redraw()};
 const steps=[
  {h:'The apple stall',p:'Apples cost £0.35 each. A crate holds 10 apples and a pallet holds 100. What does a crate cost? A pallet? Watch the digits, not the decimal point.',go:()=>{apples=[];st.k=0}},
  {h:'1 · Every place is worth ten of the next',p:'Ten ones make one ten; ten tens make one hundred; ten tenths make one. Each column is worth ten times the column on its right.',go:()=>{setN(35);fuse=0;A.tween({},{},1);st.f={u:0};A.tween(st.f,{u:1},1800,'io')}},
  {h:'2 · × 10: every digit moves one place left',p:'0.35 × 10. Watch: the 3 tenths become 3 ones and the 5 hundredths become 5 tenths. The decimal point stays exactly where it is. A crate costs £3.50.',go:()=>{setN(.35);hist=[];setTimeout(()=>shift(1),500)}},
  {h:'3 · × 100: two places left',p:'0.35 × 100: each digit moves two places left, and a 0 holds the empty ones place. A pallet costs £35.',go:()=>{setN(.35);hist=[];setTimeout(()=>shift(2),500)}},
  {h:'4 · ÷ 10: every digit moves one place right',p:'Back the other way: 35 ÷ 10 = 3.5 and ÷ 10 again = 0.35. A 0 fills the ones place so the point has a digit before it.',go:()=>{setN(35);hist=[];setTimeout(()=>shift(-1),400);setTimeout(()=>shift(-1),1400)}},
  {h:'Sandbox',p:'Type any number up to 9999.999, then multiply and divide by 10 and 100. Can you get from 0.007 to 7000?',go:()=>{hist=[];setN(4.7)}},
  {h:'Challenge',p:'',go:()=>newChal()}];
 // ---------- drawing ----------
 const chart=A=>{const{ctx,W,H,paint:P,col:C}=A,dk=C.dark,n=PL.length,m=A.narrow?8:16,cw=(W-m*2)/n,th=Math.min(cw*1.6,H*.42),top=Math.max(40,(H-th-110)/2),cx=p=>m+(3-p)*cw+cw/2;
  ctx.fillStyle=P.lin(0,0,0,H,[[0,A.mix(C.pn,C.vi,.07)],[1,C.pn]]);P.rrect(0,0,W,H,12);ctx.fill();
  const band=[C.vi,C.pk,C.or,C.gr,C.cy,C.ac,C.vi];
  PL.forEach((p,i)=>{const x=m+i*cw;ctx.fillStyle=A.alpha(band[i],dk?.14:.12);P.rrect(x+2,top,cw-4,th+28,10);ctx.fill();ctx.fillStyle=A.alpha(band[i],.9);ctx.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;ctx.textAlign='center';ctx.fillText(A.narrow?SH[p]:NM[p][0].toUpperCase()+NM[p].slice(1),x+cw/2,top-12);ctx.fillStyle=C.mu;ctx.font='11px system-ui,sans-serif';ctx.fillText(p>=0?String(Math.pow(10,p)):'1/'+Math.pow(10,-p),x+cw/2,top+th+20)});
  // the decimal point – fixed, glowing
  const dx=m+4*cw,dy=top+th*.72;P.glow(C.or,16);ctx.fillStyle=C.or;ctx.beginPath();ctx.arc(dx,dy,Math.max(5,cw*.09),0,7);ctx.fill();P.noShadow();
  // tiles
  const tw=cw*.84,tht=th*.86;for(const t of tiles){if(Math.abs(t.x-t.p)>.02){const xx=cx(t.x),dir=Math.sign(t.p-t.x);ctx.fillStyle=A.alpha(C.or,.35);for(let k=1;k<4;k++){ctx.globalAlpha=t.a*(.5-k*.12);P.rrect(xx-tw/2+dir*k*cw*.12,top+th*.07,tw,tht,12);ctx.fill()}ctx.globalAlpha=1}
   const x=cx(t.x),y=top+th*.07,lift=Math.min(1,Math.abs(t.x-t.p)*2)*10;ctx.globalAlpha=t.a;
   P.shadow(14+lift,6+lift/2,dk?.55:.3);ctx.fillStyle=P.lin(0,y-lift,0,y+tht-lift,t.d?[[0,dk?'#f8fafc':'#ffffff'],[1,dk?'#cbd5e1':'#e2e8f0']]:[[0,A.alpha(C.mu,.25)],[1,A.alpha(C.mu,.15)]]);P.rrect(x-tw/2,y-lift,tw,tht,12);ctx.fill();P.noShadow();
   ctx.fillStyle=t.d?'#0f172a':C.mu;ctx.font=`700 ${Math.round(tht*.62)}px ui-rounded,system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String(t.d),x,y+tht/2-lift+2);ctx.textBaseline='alphabetic';ctx.globalAlpha=1}
  // value strip + base-ten picture of worth
  const v=val(),by=top+th+44;P.label('= '+fmt(v),W/2,by,{font:`800 ${A.narrow?20:24}px system-ui,sans-serif`,bg:A.alpha(C.ac,.85)});
  if(A.step===1){const u=st.f?st.f.u:1,sz=Math.max(9,Math.min(16,W/44)),oy=by+40,rodx=W/2+sz*4;
   for(let i=0;i<10;i++){const sx=W/2-sz*7+i*sz*1.15,sy=oy,ex=rodx,ey=oy-sz*4.5+i*sz,k=FK.ease.io(Math.min(1,Math.max(0,u*1.5-i*.05))),x=sx+(ex-sx)*k,y=sy+(ey-sy)*k-Math.sin(k*Math.PI)*24;
    ctx.fillStyle=P.lin(x,y,x+sz,y+sz,[[0,A.mix(C.gr,'#ffffff',.35)],[1,C.gr]]);P.rrect(x,y,sz*.92,sz*.92,3);ctx.fill()}
   P.label(u>=1?'10 ones → 1 ten':'10 ones…',rodx+sz*2,oy-sz*2,{align:'left'})}};
 const stall=(A,dt)=>{const{ctx,W,H,paint:P,col:C}=A,dk=C.dark;ctx.fillStyle=P.lin(0,0,0,H,dk?[[0,'#1e293b'],[1,'#0f172a']]:[[0,'#fef3c7'],[1,'#fde68a']]);ctx.fillRect(0,0,W,H);
  const aw=W/8;for(let i=0;i<8;i++){ctx.fillStyle=i%2?'#f8fafc':'#dc2626';ctx.beginPath();ctx.moveTo(i*aw,0);ctx.lineTo((i+1)*aw,0);ctx.lineTo((i+1)*aw,H*.12);ctx.quadraticCurveTo((i+.5)*aw,H*.19,i*aw,H*.12);ctx.fill()}
  const gy=H*.78;ctx.fillStyle=P.lin(0,gy,0,H,[[0,'#92400e'],[1,'#78350f']]);ctx.fillRect(0,gy,W,H-gy);
  const ap=(x,y,r)=>{P.ball(x,y,r,'#e11d48');ctx.strokeStyle='#14532d';ctx.lineWidth=Math.max(1.5,r*.15);ctx.beginPath();ctx.moveTo(x,y-r*.8);ctx.lineTo(x+r*.15,y-r*1.2);ctx.stroke();ctx.fillStyle='#16a34a';ctx.beginPath();ctx.ellipse(x+r*.4,y-r*1.05,r*.35,r*.16,-.5,0,7);ctx.fill()};
  const r=Math.max(9,W/46);ap(W*.14,gy-r,r*1.3);P.label('£0.35',W*.14,gy-r*3.2,{bg:'#0f172a'});
  const cx0=W*.33,cwid=W*.22,ch=H*.2;st.k+=dt;const n=Math.min(10,Math.floor(st.k*6));
  for(let i=0;i<n;i++){const col=i%5,row=Math.floor(i/5);ap(cx0+cwid*.12+col*cwid*.19,gy-ch*.55-row*r*1.6,r)}
  P.shadow(10,4,.3);ctx.fillStyle=P.lin(0,gy-ch,0,gy,[[0,'#d97706'],[1,'#92400e']]);P.rrect(cx0,gy-ch*.5,cwid,ch*.5,4);ctx.fill();P.noShadow();P.label('crate of 10 · £?',cx0+cwid/2,gy-ch-r*1.4,{bg:'#0f172a'});
  const px=W*.62,pw=W*.32;for(let row=0;row<4;row++)for(let col=0;col<8;col++)ap(px+pw*.07+col*pw*.12,gy-H*.06-row*r*1.55,r*.85);
  P.shadow(10,4,.3);ctx.fillStyle=P.lin(0,0,0,H,[[0,'#a16207'],[1,'#713f12']]);ctx.fillRect(px,gy-H*.05,pw,H*.05);P.noShadow();P.label('pallet of 100 · £?',px+pw/2,gy-H*.36,{bg:'#0f172a'});
  return n<10};
 A=FK.shell(c,{steps,ratio:.5,tall:.78,draw:(A,dt)=>A.step===0?stall(A,dt):chart(A),onStep:A=>{ops.hidden=A.step<5||A.step===6;chal.hidden=A.step!==6;upd()},
  init:A=>{const E=c.el;ops=E('div',{class:'fl-ctl'},A.below);ops.innerHTML='<label>Number <input type="number" class="fl-num" step="any" min="0" max="9999.999" value="4.7" aria-label="starting number"></label>'+['×10','×100','÷10','÷100'].map(o=>`<button type="button" class="lbtn sm" data-op="${o}">${o}</button>`).join('')+'<ol class="fl-hist" aria-label="History"></ol>';
   ops.querySelector('.fl-num').onchange=e=>{const v=+e.target.value;if(v>=0&&v<9999.9995){hist=[];setN(v);upd()}};ops.querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>{const o=b.dataset.op;shift((o[0]==='×'?1:-1)*(o.length-2))});
   chal=E('div',{class:'fl-chal'},A.extra.parentNode);A.extra.parentNode.insertBefore(chal,A.extra.nextSibling);
   A.every(dt=>A.step===0&&st.k<2);A.every(()=>A.step===1&&st.f&&st.f.u<1)}});
 const Q=[[4.7,1],[0.35,2],[52,-1],[6,-2],[0.08,1],[300,-2],[2.05,1],[17.4,-1]];let qi=-1;
 const newChal=()=>{qi=(qi+1+Math.floor(Math.random()*3))%Q.length;const[n,k]=Q[qi],ans=+(n*Math.pow(10,k)).toFixed(4),op=(k>0?'×':'÷')+' '+Math.pow(10,Math.abs(k));setN(n);
  chal.innerHTML=`<p><b>${fmt(n)} ${op} = ?</b> Predict first, then check: the chart will show the digits moving.</p><label>Answer <input type="text" inputmode="decimal" class="fl-in" aria-label="answer"></label> <button type="button" class="lbtn sm">Check</button><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const fb=chal.querySelector('.fl-fb'),ip=chal.querySelector('input');chal.querySelector('button').onclick=()=>{const raw=ip.value.trim(),v=parseFloat(raw);if(!isFinite(v)){fb.textContent='Type a number first.';return}
   if(Math.abs(v-ans)<1e-9){shift(k);fb.innerHTML=`✓ ${fmt(n)} ${op} = ${fmt(ans)}. Every digit moved ${Math.abs(k)} place${Math.abs(k)>1?'s':''} ${k>0?'left':'right'}. <button type="button" class="linkish">Another →</button>`;A.win();fb.querySelector('button').onclick=newChal;return}
   A.sound.miss();const ns=fmt(n);
   fb.textContent=k>0&&ns.includes('.')&&(raw===ns+'0'.repeat(k)||raw===ns+'00'.slice(0,k))?`Adding a zero on the end doesn’t change a decimal: ${ns}0 is still ${ns}. Move each digit ${k} place${k>1?'s':''} left instead.`:
    Math.abs(v-n*Math.pow(10,-k))<1e-9?'That moved the digits the wrong way. Multiplying makes the number bigger, so digits move left.':
    k<0&&!ns.includes('.')&&raw===ns.slice(0,ns.length+k)?`Chopping off the last digit loses it. ${ns} ÷ ${Math.pow(10,-k)}: the digits move right past the point, they don’t disappear.`:
    Math.abs(v-n*Math.pow(10,k>0?k+1:k-1))<1e-9||Math.abs(v-n*Math.pow(10,k>0?k-1:k+1))<1e-9?`Close, but the digits moved the wrong number of places: ${op} moves them ${Math.abs(k)}.`:'Not quite. Each digit moves one place for every × 10 or ÷ 10.'}};
 A.start()})})();
