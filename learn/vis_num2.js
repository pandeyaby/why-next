/* Why Next? visuals for place value, percentages, temperature, distance-time graphs and formulae:
   a place-value chart where digits slide on × 10 and ÷ 10, a hundred square, a thermometer, a journey graph
   with a moving walker, and a formula you substitute into with sliders (and a picture for perimeter and area). */
(()=>{const nf=VIS.nf;
const PL=['ten thousands','thousands','hundreds','tens','ones','tenths','hundredths','thousandths'],HD=['10 000','1000','100','10','1','·1','·01','·001'];
VIS.reg('placevalue',c=>{const o=c.opts;let v=Math.round((o.n??4.7)*1000);const W=440,H=130,cw=(W-20)/8,s=c.svg(W,H,'Place-value chart');
 HD.forEach((h,i)=>{c.el('rect',{x:10+i*cw,y:10,width:cw,height:100,class:'vis-pv'+(i>4?' dec':'')},s);c.el('text',{x:10+(i+.5)*cw,y:28,'text-anchor':'middle',class:'vis-lab b'},s,h)});
 c.el('circle',{cx:10+5*cw,cy:80,r:4,fill:'#111'},s);const g=c.el('g',{},s);
 const str=x=>{const t=String(x).padStart(8,'0');return t};const val=()=>v/1000;
 const draw=(shift=0)=>{g.innerHTML='';const t=str(v),first=t.search(/[1-9]/),last=7-(t.split('').reverse().join('').search(/[1-9]/));
  t.split('').forEach((d,i)=>{if(first<0||i<Math.min(first,4)||(i>last&&i>4))return;c.el('text',{x:10+(i+.5)*cw,y:88,'text-anchor':'middle',class:'vis-digit'+(d==='0'?' z':'')},g,d)});
  c.tween(shift?350:0,t=>g.setAttribute('transform',`translate(${(1-t)*shift*cw} 0)`));
  c.say(`${nf(val(),3)}: ${t.split('').map((d,i)=>d!=='0'&&first>=0?`${d} ${PL[i]}`:'').filter(Boolean).join(', ')||'zero'}.${shift===1?' × 10 moved every digit one place to the left.':shift===-1?' ÷ 10 moved every digit one place to the right.':''}`)};
 const mul=()=>{if(v*10>=1e8){c.say('Too big for this chart.');return}v*=10;draw(1)},div=()=>{if(v%10){c.say(`${nf(val(),3)} ÷ 10 needs a ten-thousandths column, which this chart doesn't have.`);return}v/=10;draw(-1)};
 c.btn('× 10',mul);c.btn('÷ 10',div);c.btn('× 100',()=>{mul();setTimeout(mul,c.reduced()?0:400)},'ghost');c.btn('Start again',()=>{v=Math.round((o.n??4.7)*1000);draw()},'ghost');c.cueEl=[g];draw()});
VIS.reg('percent',c=>{const o=c.opts;if(o.mode==='change')return pchange(c,o);let p=o.p??25;const of=o.of??80,W=440,H=270,s=c.svg(W,H,'Hundred square and bar'),cells=[];
 for(let i=0;i<100;i++){const r=c.el('rect',{x:10+(i%10)*22,y:10+Math.floor(i/10)*22,width:20,height:20,class:'vis-part'},s);r.addEventListener('click',()=>{p=i+1;draw()});cells.push(r)}
 c.el('rect',{x:250,y:40,width:180,height:30,class:'vis-cell'},s);const bar=c.el('rect',{x:250,y:40,height:30,class:'vis-strip'},s),bt=c.el('text',{x:250,y:92,class:'vis-big'},s),tt=c.el('text',{x:250,y:30,class:'vis-lab b'},s,`the whole: ${of}`);
 const ro=c.el('text',{x:250,y:140,class:'vis-big'},s);
 const draw=()=>{cells.forEach((r,i)=>r.classList.toggle('on',i<p));bar.setAttribute('width',180*p/100);const a=of*p/100;bt.textContent=`${p}% of ${of} = ${nf(a)}`;ro.textContent=`${p}% = ${p}/100 = ${nf(p/100)}`;
  c.say(`${p} of the 100 squares are shaded: ${p}% = ${p}/100 = ${nf(p/100)} as a decimal. ${p}% of ${of} is ${of} ÷ 100 × ${p} = ${nf(a)}.`);rg.value=p};
 const rg=c.range('Percent',0,100,1,p,v=>{p=v;draw()});c.btn('10%',()=>{p=10;draw()},'ghost');c.btn('50%',()=>{p=50;draw()},'ghost');c.cueEl=[bar];draw()});
function pchange(c,o){let p=o.p??20;const of=o.of??80,W=440,H=150,s=c.svg(W,H,'Original and new amount bars'),u=200/of/2.2;
 c.el('text',{x:10,y:30,class:'vis-lab b'},s,'before');c.el('text',{x:10,y:90,class:'vis-lab b'},s,'after');c.el('rect',{x:70,y:14,width:of*u,height:28,class:'vis-cell'},s);c.el('text',{x:76+of*u,y:33,class:'vis-lab'},s,`${of} (100%)`);
 const nb=c.el('rect',{x:70,y:74,height:28,class:'vis-strip'},s),nt=c.el('text',{y:93,class:'vis-lab b'},s),ro=c.el('text',{x:70,y:136,class:'vis-big'},s);
 const draw=()=>{const m=1+p/100,v=of*m;nb.setAttribute('width',Math.max(0,v*u));nt.setAttribute('x',76+v*u);nt.textContent=`${nf(v)} (${100+p}%)`;ro.textContent=`× ${nf(m)} → ${nf(v)}`;
  c.say(`${p>=0?'Increase':'Decrease'} by ${Math.abs(p)}%: the new amount is ${100+p}% of the original, so multiply by ${nf(m)}. ${of} × ${nf(m)} = ${nf(v)}. To undo it, divide by ${nf(m)}, not take away ${Math.abs(p)}%.`);rg.value=p};
 const rg=c.range('Change %',-50,100,5,p,v=>{p=v;draw()});c.cueEl=[nb];draw()}
VIS.reg('coords',c=>{const o=c.opts,M=o.max??10,tg=o.target;let x=o.x??0,y=o.y??0;const W=320,H=320,s=c.svg(W,H,'Coordinate grid'),g=(W-50)/M,sx=v=>36+v*g,sy=v=>H-30-v*g;
 for(let i=0;i<=M;i++){c.el('line',{x1:sx(i),x2:sx(i),y1:sy(0),y2:sy(M),class:'vis-grid'},s);c.el('line',{x1:sx(0),x2:sx(M),y1:sy(i),y2:sy(i),class:'vis-grid'},s);
  c.el('text',{x:sx(i),y:H-14,'text-anchor':'middle',class:'vis-lab'},s,i);if(i)c.el('text',{x:24,y:sy(i)+4,'text-anchor':'end',class:'vis-lab'},s,i)}
 c.el('line',{x1:sx(0),x2:sx(M),y1:sy(0),y2:sy(0),class:'vis-axis'},s);c.el('line',{x1:sx(0),x2:sx(0),y1:sy(0),y2:sy(M),class:'vis-axis'},s);c.el('text',{x:sx(M)+6,y:sy(0)+4,class:'vis-lab b'},s,'x');c.el('text',{x:sx(0)-4,y:sy(M)-6,class:'vis-lab b'},s,'y');
 const gx=c.el('line',{class:'vis-run'},s),gy=c.el('line',{class:'vis-rise'},s);if(tg)c.el('circle',{cx:sx(tg[0]),cy:sy(tg[1]),r:8,class:'vis-target'},s);const h=c.el('circle',{r:9,class:'vis-handle'},s);
 const draw=()=>{h.setAttribute('cx',sx(x));h.setAttribute('cy',sy(y));gx.setAttribute('x1',sx(0));gx.setAttribute('x2',sx(x));gx.setAttribute('y1',sy(0));gx.setAttribute('y2',sy(0));gy.setAttribute('x1',sx(x));gy.setAttribute('x2',sx(x));gy.setAttribute('y1',sy(0));gy.setAttribute('y2',sy(y));
  c.say(`The point is at (${x}, ${y}): ${x} across along the x-axis (orange), then ${y} up (green), starting from the origin (0, 0).${tg?(x===tg[0]&&y===tg[1]?` You found (${tg[0]}, ${tg[1]})!`:` Target: (${tg[0]}, ${tg[1]}).`):''} Arrow keys: left/right change x; up/down change y.`);h.setAttribute('aria-valuetext',`(${x}, ${y})`);h.setAttribute('aria-valuenow',x)};
 Object.entries({role:'slider',tabindex:0,'aria-label':'Point (arrow keys move it)','aria-valuemin':0,'aria-valuemax':M}).forEach(([k,v])=>h.setAttribute(k,v));
 h.addEventListener('keydown',e=>{const d={ArrowRight:[1,0],ArrowLeft:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[e.key];if(d){e.preventDefault();x=c.clamp(x+d[0],0,M);y=c.clamp(y+d[1],0,M);draw()}});
 c.drag(h,s,(X,Y)=>{x=c.clamp(Math.round((X-36)/g),0,M);y=c.clamp(Math.round((H-30-Y)/g),0,M);draw()});c.cueEl=[gx,gy,h];draw()});
VIS.reg('wholes',c=>{const o=c.opts,a=o.a??3,b=o.b??4;let dealt=false;const W=440,bw=Math.min(90,(W-20)/a-10),H=150,s=c.svg(W,H,`${a} wholes shared between ${b}`),parts=[];
 const COL=['#7c3aed','#059669','#f59e0b','#dc2626','#2563eb','#db2777','#0891b2','#65a30d'];
 for(let i=0;i<a;i++)for(let j=0;j<b;j++)parts.push(c.el('rect',{x:10+i*(bw+10),y:10+j*80/b,width:bw,height:80/b,class:'vis-part'},s));
 const lab=c.el('text',{x:10,y:122,class:'vis-big'},s),key=c.el('text',{x:10,y:142,class:'vis-lab'},s);
 const draw=()=>{parts.forEach((r,k)=>{r.style.fill=dealt?COL[k%b%COL.length]:''});lab.textContent=dealt?`each person gets ${a}/${b}`:`${a} ÷ ${b} = ?`;key.textContent=dealt?`one slice from each of the ${a} wholes, each slice is 1/${b}`:'';
  c.say(dealt?`Each whole is cut into ${b} equal slices and everyone takes one slice from each whole. Each person gets ${a} slices of size 1/${b}, which is ${a}/${b}. So ${a} ÷ ${b} = ${a}/${b}${a>b?` = ${Math.floor(a/b)} ${a%b}/${b}`:''}.`:`${a} wholes to share equally between ${b} people. Press “Share out”.`)};
 c.btn('Share out',()=>{dealt=true;draw()});c.btn('Start again',()=>{dealt=false;draw()},'ghost');c.cueEl=[lab];draw()});
VIS.reg('thermo',c=>{const o=c.opts,mn=o.min??-20,mx=o.max??50,st=o.step||1;let t=o.t??20;const W=300,H=300,s=c.svg(W,H,'Thermometer'),top=20,bot=250,sy=v=>bot-(v-mn)/(mx-mn)*(bot-top);
 c.el('rect',{x:110,y:top-8,width:24,height:bot-top+16,rx:12,class:'vis-thermo'},s);c.el('circle',{cx:122,cy:bot+22,r:18,class:'vis-bulb'},s);const liq=c.el('rect',{x:115,width:14,class:'vis-liqr'},s);
 const big=(mx-mn)>60?10:5;for(let v=Math.ceil(mn/big)*big;v<=mx;v+=big){c.el('line',{x1:134,x2:146,y1:sy(v),y2:sy(v),class:'vis-axis'},s);c.el('text',{x:150,y:sy(v)+4,class:'vis-lab'+(v===0?' b':'')},s,nf(v)+' °C')}
 for(let v=Math.ceil(mn);v<=mx;v++)if(v%big)c.el('line',{x1:134,x2:140,y1:sy(v),y2:sy(v),class:'vis-grid'},s);
 const REF=[[0,'water freezes'],[37,'body temperature'],[100,'water boils'],[20,'room']].filter(([v])=>v>=mn&&v<=mx);REF.forEach(([v,l])=>c.el('text',{x:96,y:sy(v)+4,'text-anchor':'end',class:'vis-lab'},s,l));
 const fr=o.from;if(fr!=null)c.el('line',{x1:100,x2:146,y1:sy(fr),y2:sy(fr),class:'vis-split'},s);const h=c.el('rect',{x:104,width:36,height:12,rx:6,class:'vis-handle'},s);
 const draw=()=>{liq.setAttribute('y',sy(t));liq.setAttribute('height',bot+10-sy(t));h.setAttribute('y',sy(t)-6);
  c.say(`The thermometer reads ${nf(t)} °C. ${t<0?`That is ${nf(-t)} degrees below freezing (0 °C).`:t===0?'Water freezes at 0 °C.':`That is ${nf(t)} degrees above freezing.`} ${fr!=null&&t!==fr?`From ${nf(fr)} °C (dashed line) that is a ${t>fr?'rise':'fall'} of ${nf(Math.abs(t-fr))} degrees${(t<0)!==(fr<0)&&t!==0&&fr!==0?`: ${nf(Math.abs(fr))} to zero, then ${nf(Math.abs(t))} more`:''}. `:''}Read the top of the red liquid against the scale; each small mark is ${st} degree${st>1?'s':''}.`);sync()};
 const sync=c.kslider(h,'Temperature',()=>t,v=>{t=v;draw()},mn,mx,st,v=>`${nf(v)} °C`);c.drag(h,s,(X,Y)=>{t=Math.max(mn,Math.min(mx,Math.round((mn+(bot-Y)/(bot-top)*(mx-mn))/st)*st));draw()});
 c.btn('Colder by 5',()=>{t=Math.max(mn,t-5);draw()});c.btn('Warmer by 5',()=>{t=Math.min(mx,t+5);draw()});c.cueEl=[liq,h];draw()});
VIS.reg('journey',c=>{const o=c.opts,P0=o.pts,K=VIS.plotKit,tu=o.tu||'min',du=o.du||'km';const T=P0[P0.length-1][0],Dm=Math.max(...P0.map(p=>p[1]));
 const f=x=>{for(let i=1;i<P0.length;i++)if(x<=P0[i][0]){const[a,b]=[P0[i-1],P0[i]];return a[1]+(b[1]-a[1])*(x-a[0])/((b[0]-a[0])||1)}return P0[P0.length-1][1]};
 const tr=c.svg(440,46,'Where the walker is'),P=K.plot(c,{xr:[0,T],yr:[0,Dm*1.15]},`Distance–time graph (${du} against ${tu})`);
 c.el('line',{x1:20,x2:420,y1:30,y2:30,class:'vis-axis'},tr);c.el('text',{x:20,y:16,class:'vis-lab'},tr,'home');c.el('text',{x:420,y:16,'text-anchor':'end',class:'vis-lab'},tr,`${nf(Dm)} ${du}`);const wk=c.el('circle',{r:9,cy:30,class:'vis-handle b'},tr);
 P.curve(f,'vis-curve',P.lay);const h=K.handle(c,P),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);let t=o.start??0;const st=o.step||1;
 const draw=()=>{const d=f(t);h.setAttribute('cx',P.sx(t));h.setAttribute('cy',P.sy(d));wk.setAttribute('cx',20+400*d/Dm);let i=1;while(i<P0.length-1&&t>=P0[i][0])i++;
  const[a,b]=[P0[i-1],P0[i]],sp=(b[1]-a[1])/((b[0]-a[0])||1);ro.textContent=`t = ${nf(t)} ${tu}: ${nf(d)} ${du}`;
  c.say(`At ${nf(t)} ${tu} the walker is ${nf(d)} ${du} from home. In this part of the journey (${nf(a[0])} to ${nf(b[0])} ${tu}) the line is ${sp===0?'flat, so they are stopped':sp>0?`going up, so they move away at ${nf(sp,3)} ${du} per ${tu}`:`going down, so they head back home at ${nf(-sp,3)} ${du} per ${tu}`}. Steeper means faster.`);sync()};
 c.drag(h,P.s,X=>{t=Math.max(0,Math.min(T,Math.round(P.ix(X)/st)*st));draw()});const sync=c.kslider(h,'Time',()=>t,v=>{t=v;draw()},0,T,st,v=>`${nf(v)} ${tu}`);
 c.btn('Play journey',()=>{let k=0;const go=()=>{t=Math.min(T,k);draw();k+=st;if(t<T)setTimeout(go,c.reduced()?0:120)};c.reduced()?(t=T,draw()):go()});c.cueEl=[h,wk];draw()});
VIS.reg('formula',c=>{const o=c.opts,V=o.vars,val={};for(const k in V)val[k]=V[k][2];const box=c.el('div',{class:'vis-steps'},c.stage);
 const pic=o.pic?c.svg(440,150,o.pic==='rect'?'Rectangle':'Picture'):null;
 const draw=()=>{const sub=o.expr.replace(/[a-z]/g,m=>m in val?String(val[m]):m);let t=VIS.parseExpr(sub);const lines=[`${o.name} = ${o.expr}`,`${' '.repeat(o.name.length)} = ${VIS.showExpr(t)}`];let g=0;
  for(let s;(s=VIS.nextStep(t))&&g<12;g++){t=[...t.slice(0,s.i),{n:s.v},...t.slice(s.j)];lines.push(`${' '.repeat(o.name.length)} = ${VIS.showExpr(t)}`)}
  box.innerHTML=lines.map((l,i)=>`<div class="vis-line${i===lines.length-1?' cur':''}">${l.replace(/[&<]/g,'')}</div>`).join('');const ans=t.length===1?t[0].n:NaN;
  if(pic){pic.innerHTML='';const l=val.l||val.a||1,w=val.w||val.b||1,u=Math.min(380/l,120/w);c.el('rect',{x:20,y:10,width:l*u,height:w*u,class:o.what==='area'?'vis-strip':'vis-cell'},pic);
   if(o.what==='area')for(let i=1;i<l;i++)c.el('line',{x1:20+i*u,x2:20+i*u,y1:10,y2:10+w*u,class:'vis-grid'},pic);
   c.el('text',{x:20+l*u/2,y:10+w*u+16,'text-anchor':'middle',class:'vis-lab b'},pic,`${l} ${o.unit||''}`);c.el('text',{x:24+l*u,y:10+w*u/2,class:'vis-lab b'},pic,`${w} ${o.unit||''}`)}
  c.say(`${Object.keys(V).map(k=>`${k} = ${val[k]}`).join(', ')}. Put the numbers in place of the letters, then work it out in the usual order: ${o.name} = ${nf(ans)}${o.unit?(' '+o.unit+(o.what==='area'?'²':'')):''}.`)};
 for(const k in V)c.range(k,V[k][0],V[k][1],1,val[k],v=>{val[k]=v;draw()});c.cueEl=[box];draw()});
})();
