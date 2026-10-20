/* Why Next? visuals for powers and polynomials: exponent laws as factor tiles (multiply, divide, power of a power),
   the halving/tenth ladder that leads to zero and negative exponents, roots as fractional exponents, solving x² = p and
   x³ = p by reading where a level line meets the curve, and multiplying polynomials with an area grid. */
(()=>{const nf=VIS.nf,sup=n=>String(n).replace('-','⁻').split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]||d).join('');
VIS.reg('expo',c=>{const o=c.opts,mode=o.mode||'laws',b=o.base||2;
 if(mode==='ladder'){let n=o.n??3;const s=c.svg(440,230,'Powers of '+b),rows=c.el('g',{},s);
  const draw=()=>{rows.innerHTML='';for(let k=3,i=0;k>=-3;k--,i++){const cur=k===n,v=Math.pow(b,k);const y=24+i*30;
    c.el('rect',{x:60,y:y-18,width:320,height:26,rx:6,class:cur?'vis-strip':'vis-cell'},rows);
    c.el('text',{x:80,y,class:'vis-lab b'},rows,`${b}${sup(k)}`);c.el('text',{x:200,y,class:cur?'vis-big':'vis-lab'},rows,'= '+(k<0?`1/${Math.pow(b,-k)} = ${nf(v,4)}`:String(v)));
    if(i<6)c.el('text',{x:390,y:y+16,class:'vis-lab'},rows,'÷'+b)}
   c.say(`${b}${sup(n)} = ${n<0?`1 ÷ ${b}${sup(-n)} = 1/${Math.pow(b,-n)} = ${nf(Math.pow(b,n),4)}`:nf(Math.pow(b,n))}. Each step down the ladder divides by ${b} and lowers the power by 1, so ${b}⁰ = 1 and negative powers are fractions.`)};
  c.btn('Power down (÷ '+b+')',()=>{n=Math.max(-3,n-1);draw()});c.btn('Power up (× '+b+')',()=>{n=Math.min(3,n+1);draw()},'ghost');c.cueEl=[rows];draw();return}
 if(mode==='root'){let m=o.m??1,k=o.k??3;const N=o.a||8,s=c.svg(440,130,'Fractional power'),g=c.el('g',{},s);
  const draw=()=>{g.innerHTML='';const r=Math.pow(N,1/k),v=Math.pow(r,m);for(let i=0;i<k;i++){c.el('rect',{x:20+i*(400/k),y:20,width:400/k-6,height:40,rx:6,class:i<m?'vis-strip':'vis-cell'},g);c.el('text',{x:20+i*(400/k)+(400/k-6)/2,y:46,'text-anchor':'middle',class:'vis-lab b'},g,nf(r,3))}
   c.el('text',{x:20,y:100,class:'vis-big'},g,`${N}${sup(m)}ᐟ${sup(k)} = (${k===2?'':sup(k)}√${N})${sup(m)} = ${nf(v,3)}`);
   c.say(`${N} splits into ${k} equal factors of ${nf(r,3)}, because ${nf(r,3)} multiplied ${k} times is ${N}. So ${N} to the power 1/${k} is ${nf(r,3)}, and to the power ${m}/${k} take ${m} of those factors: ${nf(v,3)}.`)};
  c.range('Root k',2,4,1,k,v=>{k=v;m=Math.min(m,k);draw()});c.range('Power m',1,4,1,m,v=>{m=v;draw()});c.cueEl=[g];draw();return}
 let p=o.m??3,q=o.n??2,op=o.op||'mul';const s=c.svg(440,100,'Exponent law'),g=c.el('g',{},s);
 const tile=(x,y,cls,t)=>{c.el('rect',{x,y,width:30,height:30,rx:6,class:cls},g);c.el('text',{x:x+15,y:y+20,'text-anchor':'middle',class:'vis-lab b'},g,t)};
 const draw=()=>{g.innerHTML='';let res,txt;
  if(op==='mul'){for(let i=0;i<p;i++)tile(10+i*34,10,'vis-strip','a');for(let i=0;i<q;i++)tile(10+(p+i)*34+8,10,'vis-cell','a');res=p+q;txt=`a${sup(p)} × a${sup(q)} = a${sup(res)}`}
  else if(op==='div'){for(let i=0;i<p;i++)tile(10+i*34,10,i<q?'vis-cell':'vis-strip',i<q?'⁄':'a');res=p-q;txt=`a${sup(p)} ÷ a${sup(q)} = a${sup(res)}`}
  else{for(let r=0;r<q;r++)for(let i=0;i<p;i++)tile(10+i*34+r*(p*34+10),10,r%2?'vis-cell':'vis-strip','a');res=p*q;txt=`(a${sup(p)})${sup(q)} = a${sup(res)}`}
  c.el('text',{x:10,y:80,class:'vis-big'},g,txt);
  c.say(op==='mul'?`${p} factors of a, then ${q} more: count them all, ${p} + ${q} = ${res}, so ${txt}. Add the powers; do not multiply them.`:op==='div'?`${p} factors of a on top; dividing by a${sup(q)} cancels ${q} of them, leaving ${p} − ${q} = ${res}: ${txt}.`:`${q} copies of a${sup(p)} make ${q} groups of ${p} factors: ${p} × ${q} = ${res}, so ${txt}.`)};
 c.range('First power',1,6,1,p,v=>{p=v;if(q>p&&op==='div')q=p;draw()});c.range('Second power',1,op==='pow'?3:6,1,q,v=>{q=op==='div'?Math.min(v,p):v;draw()});
 const bs={};const set=k=>{op=k;if(op==='div'&&q>p)q=p;if(op==='pow'&&q>3)q=3;for(const j in bs)bs[j].setAttribute('aria-pressed',j===op);draw()};
 for(const [k,l] of [['mul','Multiply'],['div','Divide'],['pow','Power of a power']])bs[k]=c.btn(l,()=>set(k),'ghost');c.cueEl=[g];set(op)});
VIS.reg('roots',c=>{const o=c.opts,k=o.k||2,f=x=>Math.pow(x,k)*(k%2||x>=0?1:1),K=VIS.plotKit,P=K.plot(c,o,`Graph of y = x${k===2?'²':'³'}`);P.curve(x=>Math.pow(x,k),'vis-curve',P.lay);
 let p=o.p??9;const ln=c.el('line',{class:'vis-guide'},P.lay),dots=c.el('g',{},P.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),h=K.handle(c,P);
 const draw=()=>{ln.setAttribute('x1',P.sx(P.x0));ln.setAttribute('x2',P.sx(P.x1));ln.setAttribute('y1',P.sy(p));ln.setAttribute('y2',P.sy(p));h.setAttribute('cx',P.sx(P.x0)+12);h.setAttribute('cy',P.sy(p));dots.innerHTML='';
  const xs=k===2?(p<0?[]:p===0?[0]:[-Math.sqrt(p),Math.sqrt(p)]):[Math.cbrt(p)];for(const x of xs)c.el('circle',{cx:P.sx(x),cy:P.sy(p),r:6,class:'vis-dot'},dots);
  const sym=k===2?'²':'³',w=x=>nf(x,3);ro.textContent=`x${sym} = ${nf(p)}: ${xs.length?xs.map(x=>'x = '+w(x)).join(', '):'no real x'}`;
  c.say(`Level line y = ${nf(p)} meets the curve y = x${sym} at ${xs.length?xs.map(w).join(' and '):'no point'}. ${k===2?(p>0?`Two answers: ±√${nf(p)}, because a negative number squared is positive too.`:p===0?'Only x = 0.':'A square is never negative, so there is no real answer.'):`One answer, ∛${nf(p)}: a cube keeps the sign.`}`);sync()};
 c.drag(h,P.s,(X,Y)=>{p=Math.round(Math.max(P.y0,Math.min(P.y1,P.y0+(P.sy(P.y0)-Y)/(P.sy(P.y0)-P.sy(P.y1))*(P.y1-P.y0))));draw()});
 const sync=c.kslider(h,'Value p',()=>p,v=>{p=v;draw()},Math.ceil(P.y0),Math.floor(P.y1),1,v=>`p = ${v}`);c.cueEl=[h,ln];draw()});
VIS.reg('grid',c=>{const o=c.opts;let A=o.a||[1,2],B=o.b||[1,-1,1];const s=c.svg(440,230,'Multiplication grid'),g=c.el('g',{},s),out=c.el('p',{class:'vis-line cur'},c.stage);
 const term=(k,d)=>k===0?'0':(d===0?nf(k):(k===1?'':k===-1?'−':nf(k))+(d===1?'x':'x'+sup(d)));
 const poly=P=>{const n=P.length-1,t=[];P.forEach((k,i)=>{if(k)t.push([k,n-i])});return t.map(([k,d],i)=>{const s=term(Math.abs(k),d);return i?(k<0?' − ':' + ')+s:(k<0?'−':'')+s}).join('')||'0'};
 const draw=()=>{g.innerHTML='';const W=360/B.length,H=150/A.length,na=A.length-1,nb=B.length-1,prod=Array(na+nb+1).fill(0);
  B.forEach((k,j)=>c.el('text',{x:70+j*W+W/2,y:18,'text-anchor':'middle',class:'vis-lab b'},g,term(k,nb-j)));
  A.forEach((k,i)=>{c.el('text',{x:60,y:40+i*H+H/2,'text-anchor':'end',class:'vis-lab b'},g,term(k,na-i));
   B.forEach((m,j)=>{const d=na-i+nb-j;prod[na+nb-d]+=k*m;c.el('rect',{x:70+j*W,y:26+i*H,width:W-4,height:H-4,rx:6,class:d%2?'vis-cell':'vis-strip'},g);
    c.el('text',{x:70+j*W+W/2,y:30+i*H+H/2,'text-anchor':'middle',class:'vis-lab b'},g,term(k*m,d))})});
  const r=poly(prod);out.textContent=`(${poly(A)})(${poly(B)}) = ${r}`;
  c.say(`Each box is one term from the left times one term from the top: ${A.length*B.length} products. Boxes with the same power of x are like terms; add them to get ${r}.`)};
 c.range('Number in first bracket',-5,5,1,A[A.length-1],v=>{A=[...A.slice(0,-1),v];draw()});c.range('Number in second bracket',-5,5,1,B[B.length-1],v=>{B=[...B.slice(0,-1),v];draw()});c.cueEl=[g];draw()});
})();
