/* Why Next? model visuals, part 2: polynomial term builder, algebra tiles, vectors vs scalars. */
(()=>{const nf=VIS.nf,sup=n=>String(n).split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]||d).join(''),W=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const press=(bs,k)=>{for(const j in bs)bs[j].setAttribute('aria-pressed',j===k)};
/* ---------- polynomial term builder ---------- */
VIS.reg('polyterms',c=>{const o=c.opts;let T=(o.terms||[[5,0],[-3,2],[2,1]]).map(t=>[...t]),sel=0;const row=c.el('div',{class:'vis-eq',role:'group','aria-label':'Terms'},c.stage),info=c.el('div',{class:'vis-steps'},c.stage);
 const term=([k,d],first)=>{const a=Math.abs(k),cf=d&&a===1?'':nf(a),v=d===0?'':d===1?'x':'x'+sup(d);return (k<0?(first?'−':'− '):(first?'':'+ '))+cf+v};
 const draw=()=>{row.innerHTML='';T.forEach((t,i)=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':String(i===sel)},row,term(t,i===0));b.onclick=()=>{sel=i;draw()}});
  const deg=Math.max(...T.map(t=>t[1])),lead=T.reduce((a,t)=>t[1]>a[1]?t:a,T[0]),cst=T.filter(t=>t[1]===0).reduce((a,t)=>a+t[0],0),n=T.length,std=[...T].sort((a,b)=>b[1]-a[1]),isStd=T.every((t,i)=>t[1]===std[i][1]);
  const nm=['monomial','binomial','trinomial'][n-1]||`polynomial with ${n} terms`,dn=['constant','linear','quadratic','cubic','quartic','quintic'][deg]||`degree ${deg}`;
  info.innerHTML=`<div class="vis-line cur">${T.map((t,i)=>term(t,i===0)).join(' ')}</div><div class="vis-line">${n} terms: ${nm} · degree ${deg} (${dn})</div><div class="vis-line">leading coefficient ${nf(lead[0])} · constant term ${nf(cst)}${isStd?' · in standard form':''}</div>`;
  c.say(`${T.map((t,i)=>term(t,i===0)).join(' ')} has ${n} term${n>1?'s':''}, so it is a ${nm}. The highest power is ${deg}, so its degree is ${deg} (${dn}). The leading coefficient is ${nf(lead[0])}, the number in front of the highest power, and the constant term is ${nf(cst)}. ${isStd?'It is in standard form: highest power first.':'Press Standard form to put the highest power first.'}`)};
 const mod=f=>()=>{if(T[sel]){f(T[sel]);draw()}};
 c.btn('Standard form',()=>{const t=T[sel];T.sort((a,b)=>b[1]-a[1]);sel=T.indexOf(t);draw()});c.btn('Power up',mod(t=>{if(t[1]<5)t[1]++}),'ghost');c.btn('Power down',mod(t=>{if(t[1]>0)t[1]--}),'ghost');
 c.btn('Number +1',mod(t=>{t[0]=t[0]===-1?1:Math.min(9,t[0]+1)}),'ghost');c.btn('Number −1',mod(t=>{t[0]=t[0]===1?-1:Math.max(-9,t[0]-1)}),'ghost');
 c.btn('Add a term',()=>{if(T.length<5){const used=new Set(T.map(t=>t[1]));let d=0;while(used.has(d)&&d<5)d++;T.push([1,d]);sel=T.length-1;draw()}},'ghost');c.btn('Remove term',()=>{if(T.length>1){T.splice(sel,1);sel=0;draw()}},'ghost');c.cueEl=[row];draw()});
/* ---------- algebra tiles ---------- */
VIS.reg('tiles',c=>{const o=c.opts;let A=[...(o.a||[2,3,-1])],B=[...(o.b||[1,-2,4])],op=o.op||'+',done=false;const s=c.svg(440,250,'Algebra tiles'),g=c.el('g',{},s),bs={};
 const poly=P=>{const t=[];P.forEach((k,i)=>{if(k){const d=2-i,a=Math.abs(k),v=d===2?'x²':d===1?'x':'';t.push([k,(a===1&&d?'':a)+v])}});return t.map(([k,s],i)=>i?(k<0?' − ':' + ')+s:(k<0?'−':'')+s).join('')||'0'};
 const SZ=[[34,34],[12,34],[12,12]];
 const row=(P,y,lab)=>{c.el('text',{x:6,y:y+22,class:'vis-lab b'},g,lab);let x=60;P.forEach((k,i)=>{for(let j=0;j<Math.abs(k);j++){const[w,h]=SZ[i];c.el('rect',{x,y:y+(34-h),width:w,height:h,rx:3,fill:k>0?'rgba(34,211,238,.55)':'rgba(244,114,182,.6)',stroke:k>0?'#0e7490':'#9d174d'},g);if(k<0)c.el('text',{x:x+w/2,y:y+(34-h/2)+4,'text-anchor':'middle','font-size':11,'font-weight':700,fill:'#0f172a'},g,'−');x+=w+4}x+=10})};
 const draw=()=>{g.innerHTML='';const Bs=op==='-'?B.map(k=>-k):B,R=A.map((k,i)=>k+Bs[i]);row(A,10,'first');row(Bs,62,op==='-'?'− second (flipped)':'+ second');
  if(done){row(R,140,'result');const z=A.map((k,i)=>Math.min(Math.abs(k),Math.abs(Bs[i]))*(Math.sign(k)!==Math.sign(Bs[i])?1:0));c.el('text',{x:60,y:215,class:'vis-lab'},g,z.some(v=>v)?`zero pairs removed: ${z.map((v,i)=>v?v+' '+['x²','x','unit'][i]+(v>1?'s':''):'').filter(Boolean).join(', ')}`:'no zero pairs')}
  c.el('text',{x:60,y:240,class:'vis-big'},g,`(${poly(A)}) ${op} (${poly(B)})${done?' = '+poly(R):''}`);press(bs,op);
  c.say(`${op==='-'?'Subtracting flips the colour (sign) of every tile in the second bracket. ':''}${done?`Like tiles go together: x² with x², x with x, units with units. A plus and a minus tile of the same kind cancel (a zero pair). Result: ${poly(R)}.`:'Press Combine to put like tiles together. Cyan tiles are positive, pink tiles are negative.'}`)};
 bs['+']=c.btn('Add',()=>{op='+';done=false;draw()},'ghost');bs['-']=c.btn('Subtract',()=>{op='-';done=false;draw()},'ghost');c.btn('Combine',()=>{done=true;draw()});
 ['x²','x','number'].forEach((n,i)=>c.range('Second bracket '+n,-4,4,1,B[i],v=>{B[i]=v;draw()}));c.cueEl=[g];draw()});
/* ---------- vectors vs scalars ---------- */
VIS.reg('vectors',c=>{const o=c.opts;let A=o.a||[3,0],B=o.b||[0,4];const s=c.svg(440,300,'Two displacement vectors'),U=30,ox=60,oy=250,sx=v=>ox+v*U,sy=v=>oy-v*U,g=c.el('g',{},s);
 for(let i=-1;i<=11;i++)c.el('line',{x1:sx(i),x2:sx(i),y1:sy(-1),y2:sy(8),class:'vis-grid'},g);for(let j=-1;j<=8;j++)c.el('line',{x1:sx(-1),x2:sx(11),y1:sy(j),y2:sy(j),class:'vis-grid'},g);
 c.el('text',{x:sx(0)-8,y:sy(0)+18,class:'vis-lab b'},g,'start');c.el('text',{x:sx(10),y:sy(7.6),class:'vis-lab'},g,'N ↑');
 const mk=(cls)=>{const l=c.el('line',{class:cls,'stroke-width':4},s),hd=c.el('polygon',{class:cls},s);return[l,hd]};const[aL,aH]=mk('vis-run'),[bL,bH]=mk('vis-rise'),[rL,rH]=mk('vis-tan on');
 const set=([l,hd],x1,y1,x2,y2,fill)=>{l.setAttribute('x1',x1);l.setAttribute('y1',y1);l.setAttribute('x2',x2);l.setAttribute('y2',y2);const a=Math.atan2(y2-y1,x2-x1),p=(r,da)=>`${x2-r*Math.cos(a+da)},${y2-r*Math.sin(a+da)}`;hd.setAttribute('points',`${x2},${y2} ${p(12,.4)} ${p(12,-.4)}`);hd.style.fill=fill};
 const hA=c.el('circle',{r:10,class:'vis-handle'},s),hB=c.el('circle',{r:10,class:'vis-handle b'},s),dial=c.el('p',{class:'vis-mult'},c.stage);
 const mag=v=>Math.hypot(v[0],v[1]),dir=v=>{if(!v[0]&&!v[1])return'no direction';const b=(90-Math.atan2(v[1],v[0])*180/Math.PI+360)%360;return `bearing ${String(Math.round(b)).padStart(3,'0')}°`};
 const draw=()=>{const T=[A[0]+B[0],A[1]+B[1]];set([aL,aH],sx(0),sy(0),sx(A[0]),sy(A[1]),'#fdba74');set([bL,bH],sx(A[0]),sy(A[1]),sx(T[0]),sy(T[1]),'#86efac');set([rL,rH],sx(0),sy(0),sx(T[0]),sy(T[1]),'#c4b5fd');
  hA.setAttribute('cx',sx(A[0]));hA.setAttribute('cy',sy(A[1]));hB.setAttribute('cx',sx(T[0]));hB.setAttribute('cy',sy(T[1]));
  const d=mag(A)+mag(B),r=mag(T);dial.textContent=`Scalar (size only): distance walked = ${nf(mag(A),1)} + ${nf(mag(B),1)} = ${nf(d,1)} m. Vector (size and direction): displacement = ${nf(r,1)} m, ${dir(T)}.`;
  hA.setAttribute('aria-valuetext',`first walk ${nf(mag(A),1)} m, ${dir(A)}`);hB.setAttribute('aria-valuetext',`second walk ${nf(mag(B),1)} m, ${dir(B)}`);
  c.say(`Walk 1 (orange): ${nf(mag(A),1)} m, ${dir(A)}. Walk 2 (green): ${nf(mag(B),1)} m, ${dir(B)}. Distances are scalars, so they just add: ${nf(d,1)} m. Displacements are vectors: the purple arrow from start to finish is ${nf(r,1)} m, ${dir(T)}. ${Math.abs(d-r)<.01?'They match only because both walks point the same way.':'It is shorter than the distance because the directions differ.'}`)};
 const ctl=(h,get,put,label)=>{Object.entries({role:'slider',tabindex:0,'aria-label':label+' (arrow keys move the tip)','aria-valuemin':-10,'aria-valuemax':10,'aria-valuenow':0}).forEach(([k,v])=>h.setAttribute(k,v));
  h.addEventListener('keydown',e=>{const d={ArrowRight:[1,0],ArrowLeft:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];if(d){e.preventDefault();const v=get();put([v[0]+d[0],v[1]+d[1]]);draw()}})};
 const clampA=v=>[c.clamp(v[0],-1,10),c.clamp(v[1],-1,7)];
 c.drag(hA,s,(X,Y)=>{A=clampA([Math.round((X-ox)/U),Math.round((oy-Y)/U)]);draw()});c.drag(hB,s,(X,Y)=>{const T=clampA([Math.round((X-ox)/U),Math.round((oy-Y)/U)]);B=[T[0]-A[0],T[1]-A[1]];draw()});
 ctl(hA,()=>A,v=>{const T=[A[0]+B[0],A[1]+B[1]];A=clampA(v);B=[T[0]-A[0],T[1]-A[1]]},'First walk');ctl(hB,()=>[A[0]+B[0],A[1]+B[1]],v=>{const T=clampA(v);B=[T[0]-A[0],T[1]-A[1]]},'Second walk');
 c.btn('Walk back to the start',()=>{B=[-A[0],-A[1]];draw()},'ghost');c.btn('Same direction',()=>{B=[A[0],A[1]];if(2*A[0]>10||2*A[1]>7)B=[0,0];draw()},'ghost');c.cueEl=[hA,hB];draw()});
})();
