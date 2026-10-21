/* Why Next? visuals for number: counters, ten-frames, arrays, equal sharing, fraction bars/pies, number line. */
(()=>{const R=VIS.reg;
const gcd=(a,b)=>b?gcd(b,a%b):a;
const COL={a:'#dc2626',b:'#2563eb',m:'#9ca3af',s:'#7c3aed'};
/* counters: count (move each one into the counted row), combine (push two groups together), takeaway */
R('counters',c=>{const o=c.opts,mode=o.mode||'count',n=mode==='combine'?(o.a||3)+(o.b||2):(o.n||5);
 const W=Math.max(360,n*44+40),s=c.svg(W,170,'Counters');
 c.el('text',{x:10,y:16,class:'vis-lab'},s,mode==='takeaway'?'Counters':mode==='combine'?'Two groups':'To count');
 c.el('text',{x:10,y:104,class:'vis-lab'},s,mode==='takeaway'?'Taken away':mode==='combine'?'All together':'Counted');
 c.el('line',{x1:0,x2:W,y1:90,y2:90,class:'vis-sep'},s);
 const zone=Array(n).fill(0),order=[];let merged=false;
 const cs=[...Array(n)].map((_,i)=>{const g=c.el('g',{class:'vis-ctr',role:'button',tabindex:0},s);
  c.el('circle',{r:16,fill:mode==='combine'&&i>=(o.a||3)?COL.b:COL.a},g);c.el('text',{class:'vis-num','text-anchor':'middle',y:5},g);
  let moved=0,sx=0;
  c.drag(g,s,(x,y,start)=>{if(mode==='combine')return;if(start){moved=0;sx=y;g.style.transition='none'}moved=Math.max(moved,Math.abs(y-sx));g.style.transform=`translate(${x}px,${y}px)`},
   ()=>{if(mode==='combine')return;g.style.transition='';const y=parseFloat((g.style.transform.match(/,\s*([-\d.]+)px/)||[])[1]);
    if(moved<6)toggle(i);else set(i,y>90?1:0)});
  g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle(i);g.focus()}});return g});
 const toggle=i=>set(i,zone[i]?0:1);
 function set(i,z){if(zone[i]!==z){zone[i]=z;const k=order.indexOf(i);if(k>=0)order.splice(k,1);if(z)order.push(i)}draw()}
 function draw(){let top=0;cs.forEach((g,i)=>{let x,y;
   if(mode==='combine'){x=merged?30+i*42:30+i*42+(i>=(o.a||3)?40:0);y=merged?130:45}
   else if(zone[i]){x=30+order.indexOf(i)*42;y=130}else{x=30+top++*42;y=45}
   g.style.transform=`translate(${x}px,${y}px)`;
   const lab=mode==='count'&&zone[i]?order.indexOf(i)+1:mode==='combine'&&merged?i+1:'';g.querySelector('text').textContent=lab;
   g.classList.toggle('vis-off',mode==='takeaway'&&!!zone[i]);
   g.setAttribute('aria-label',mode==='count'?(zone[i]?`Counter number ${order.indexOf(i)+1}`:'Counter, not counted yet'):mode==='takeaway'?(zone[i]?'Taken-away counter: put it back':'Counter: take it away'):`Counter ${i+1}`)});
  const k=order.length;
  c.say(mode==='count'?(k===n?`All ${n} counted. The last number you said, ${n}, is how many there are.`:`${k} of ${n} counted. Tap or drag a counter down to count it.`)
   :mode==='takeaway'?`${n} − ${k} = ${n-k}. ${k} taken away, ${n-k} left.`
   :merged?`${o.a||3} + ${o.b||2} = ${n}. Counting them all together gives ${n}.`:`A group of ${o.a||3} red and a group of ${o.b||2} blue. Push them together to find the total.`)}
 if(mode==='combine'){const b=c.btn('Push together',()=>{merged=!merged;b.textContent=merged?'Split apart':'Push together';draw()})}
 else c.btn('Start again',()=>{zone.fill(0);order.length=0;draw()});
 c.cueEl=cs;draw()});
/* ten-frame: a + b, or a − b shown by crossing out */
R('tenframe',c=>{const o=c.opts,sub=o.op==='-';let a=o.a??6,b=o.b??3;const s=c.svg(440,110,'Ten-frames');const cells=[];
 for(let f=0;f<2;f++){for(let k=0;k<10;k++){const x=10+f*220+(k%5)*40,y=15+Math.floor(k/5)*40,g=c.el('g',{},s);
  c.el('rect',{x,y,width:40,height:40,class:'vis-cell'},g);const ci=c.el('circle',{cx:x+20,cy:y+20,r:14},g);const x1=c.el('path',{d:`M${x+8} ${y+8}L${x+32} ${y+32}M${x+32} ${y+8}L${x+8} ${y+32}`,class:'vis-x'},g);cells.push({g,ci,x1})}}
 function draw(){const tot=sub?a:a+b;cells.forEach((q,k)=>{const on=k<tot;q.ci.style.display=on?'':'none';q.ci.setAttribute('fill',sub||k<a?COL.a:COL.b);q.x1.style.display=sub&&on&&k>=a-b?'':'none';q.g.classList.toggle('vis-pop',on&&!sub&&k===tot-1)});
  if(sub)c.say(`${a} − ${b} = ${a-b}. ${b} of the ${a} counters are crossed out; ${a-b} are left.`);
  else{const t=a+b;c.say(`${a} + ${b} = ${t}. `+(t===10?'That fills one ten-frame exactly: a pair that makes 10.':t<10?`The frame has ${10-t} empty space${10-t>1?'s':''}, so ${t} is ${10-t} less than 10.`:`One full ten and ${t-10} more makes ${t}.`))}}
 const lim=(v,d,lo,hi)=>Math.max(lo,Math.min(hi,v+d));
 if(sub){c.btn('More counters',()=>{a=lim(a,1,1,20);draw()});c.btn('Fewer counters',()=>{a=lim(a,-1,1,20);b=Math.min(b,a);draw()});c.btn('Take one away',()=>{b=lim(b,1,0,a);draw()});c.btn('Put one back',()=>{b=lim(b,-1,0,a);draw()})}
 else{c.btn('+ red',()=>{if(a+b<20)a++;draw()});c.btn('− red',()=>{a=lim(a,-1,0,20);draw()});c.btn('+ blue',()=>{if(a+b<20)b++;draw()});c.btn('− blue',()=>{b=lim(b,-1,0,20);draw()})}
 c.cueEl=cells.slice(0,10).map(q=>q.g);draw()});
/* array: rows × columns of dots, with an optional draggable split (distributive law) and an algebra label */
R('array',c=>{const o=c.opts;let r=o.rows||3,k=o.cols||4,sp=o.split||0;const s=c.svg(440,250,'Array of dots');const g=c.el('g',{},s);
 const line=c.el('line',{class:'vis-split'},s),hd=c.el('circle',{r:11,class:'vis-handle'},s);
 const D=Math.min(30,400/Math.max(k,12)*1.05);
 function draw(){g.textContent='';for(let i=0;i<r;i++)for(let j=0;j<k;j++)c.el('circle',{cx:20+j*D+D/2,cy:20+i*D+D/2,r:D*.33,fill:sp&&j>=sp?COL.b:COL.a},g);
  const show=!!o.split;line.style.display=hd.style.display=show?'':'none';
  if(show){hd.setAttribute('aria-valuemax',k-1);const x=20+sp*D;line.setAttribute('x1',x);line.setAttribute('x2',x);line.setAttribute('y1',10);line.setAttribute('y2',30+r*D);hd.setAttribute('cx',x);hd.setAttribute('cy',22+r*D+8)}
  const nm=o.label?`${r}${o.label}`:'';
  let t=`${r} rows of ${k} = ${r} × ${k} = ${r*k}. Read the columns instead: ${k} columns of ${r}, so ${k} × ${r} = ${r*k} too. And ${r*k} ÷ ${r} = ${k}.`;
  if(o.label)t=`${r} rows of ${o.label}, and here ${o.label} = ${k}: ${nm} = ${r} × ${k} = ${r*k}.`;
  if(show&&sp>0&&sp<k)t+=` Split: ${r} × (${sp} + ${k-sp}) = ${r} × ${sp} + ${r} × ${k-sp} = ${r*sp} + ${r*(k-sp)} = ${r*k}.`;c.say(t);sync&&sync()}
 let sync=null;
 if(o.split){c.drag(hd,s,x=>{const v=Math.round((x-20)/D);if(v>=1&&v<k&&v!==sp){sp=v;draw()}});
  sync=c.kslider(hd,'Split position',()=>sp,v=>{sp=v;draw()},1,Math.max(1,k-1),1,v=>`${v} and ${k-v}`)}
 c.range(o.label?`${o.label} =`:'Columns',1,12,1,k,v=>{k=v;sp=Math.min(sp,k-1)||Math.min(o.split||0,k-1);draw()});
 c.range('Rows',1,8,1,r,v=>{r=v;draw()});c.cueEl=o.split?[line,hd]:g;draw()});
/* equal sharing: deal counters one at a time into groups; shows remainders and fractions of an amount */
R('share',c=>{const o=c.opts;let tot=o.total||12,G=o.groups||3;const W=440,s=c.svg(W,260,'Sharing counters into groups');
 let at=[];const gsz=()=>Math.min(110,(W-20)/G-10);
 const rings=c.el('g',{},s),dots=c.el('g',{},s);
 function gpos(j){const w=(W-20)/G;return[10+w*j+w/2,165]}
 function build(){rings.textContent='';dots.textContent='';at=Array(tot).fill(-1);
  for(let j=0;j<G;j++){const[x,y]=gpos(j);c.el('circle',{cx:x,cy:y,r:gsz()/2,class:'vis-ring'+(o.show&&j<o.show?' vis-hl':'')},rings);c.el('text',{x,y:y+gsz()/2+14,'text-anchor':'middle',class:'vis-lab'},rings,`Group ${j+1}`)}
  for(let i=0;i<tot;i++){const d=c.el('circle',{r:8,fill:COL.a,class:'vis-ctr'},dots);d.style.transform=`translate(${pile(i)}px)`;
   c.drag(d,s,(x,y)=>{d.style.transition='none';d.style.transform=`translate(${x}px,${y}px)`},()=>{d.style.transition='';const m=d.style.transform.match(/([-\d.]+)px,\s*([-\d.]+)px/);
    if(m&&+m[2]>110){let best=0,bd=1e9;for(let j=0;j<G;j++){const q=gpos(j),dd=Math.abs(q[0]-m[1]);if(dd<bd){bd=dd;best=j}}at[i]=best}else at[i]=-1;place()})}place()}
 function pile(i){return `${20+(i%20)*20}px,${25+Math.floor(i/20)*20}`}
 function place(){const cnt=Array(G).fill(0);[...dots.children].forEach((d,i)=>{if(at[i]<0){d.style.transform=`translate(${pile(i)}px)`;return}
   const j=at[i],q=gpos(j),n=cnt[j]++,col=n%4,row=Math.floor(n/4);d.style.transform=`translate(${q[0]-27+col*18}px,${q[1]-27+row*18}px)`});
  const left=at.filter(v=>v<0).length,each=cnt.join(', ');
  const fair=cnt.every(v=>v===cnt[0]);
  let t=left?`${tot-left} dealt, ${left} still to share. Groups have ${each}.`:fair?`${tot} shared equally into ${G} groups: ${cnt[0]} each. ${tot} ÷ ${G} = ${cnt[0]}.`:`All dealt, but the groups are not equal (${each}). Equal sharing means every group gets the same.`;
  if(!left&&o.show&&fair)t+=` So ${o.show}/${G} of ${tot} is ${o.show*cnt[0]}.`;
  if(left&&left<G&&dealtRound())t=`${tot} ÷ ${G} = ${cnt[0]} remainder ${left}: ${left} left over, not enough for another round.`;c.say(t)}
 const dealtRound=()=>{const free=at.filter(v=>v<0).length;return free<G&&at.filter(v=>v>=0).length%G===0};
 function deal(){const free=at.map((v,i)=>v<0?i:-1).filter(i=>i>=0);if(free.length<G){place();return false}for(let j=0;j<G;j++)at[free[j]]=j;place();return true}
 c.btn('Deal one each',deal);c.btn('Deal them all',()=>{const go=()=>{if(deal()&&!VIS.reduced())setTimeout(go,350);else if(VIS.reduced())while(deal());};go()});
 c.btn('Start again',build);c.range('Groups',2,6,1,G,v=>{G=v;build()});c.cueEl=rings;build()});
/* fraction bar or pie: split, shade, compare (overlay a second bar for equivalence) */
R('fracbar',c=>{const o=c.opts;let pie=!!o.pie;const B=[{d:o.d||4,on:new Set([...Array(o.shade??1).keys()])}];if(o.compare)B.push({d:o.compare,on:new Set([...Array(o.compareShade??0).keys()])});
 const s=c.svg(440,o.compare?190:pie?200:110,'Fraction bar');const g=c.el('g',{},s);
 const frac=b=>`${b.on.size}/${b.d}`;
 function draw(){g.textContent='';B.forEach((b,bi)=>{const y=20+bi*80;
  for(let k=0;k<b.d;k++){let p;
   if(pie&&!o.compare){const cx=220,cy=100,R=85,a0=k/b.d*2*Math.PI-Math.PI/2,a1=(k+1)/b.d*2*Math.PI-Math.PI/2;
    p=b.d===1?c.el('circle',{cx,cy,r:R},g):c.el('path',{d:`M${cx} ${cy}L${cx+R*Math.cos(a0)} ${cy+R*Math.sin(a0)}A${R} ${R} 0 ${a1-a0>Math.PI?1:0} 1 ${cx+R*Math.cos(a1)} ${cy+R*Math.sin(a1)}Z`},g)}
   else{const w=400/b.d;p=c.el('rect',{x:20+k*w,y,width:w,height:50},g)}
   p.setAttribute('class','vis-part'+(b.on.has(k)?' on'+(bi?' b':''):''));Object.entries({role:'button',tabindex:0,'aria-pressed':b.on.has(k),'aria-label':`Part ${k+1} of ${b.d}${bi?' (second bar)':''}`}).forEach(([a,v])=>p.setAttribute(a,v));
   const t=()=>{b.on.has(k)?b.on.delete(k):b.on.add(k);draw();const n=g.querySelector(`[aria-label="Part ${k+1} of ${b.d}${bi?' (second bar)':''}"]`);n&&n.focus()};
   p.addEventListener('click',t);p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}})}
  if(!pie||o.compare)c.el('text',{x:20,y:y+66,class:'vis-lab'},g,`${frac(b)} shaded`)});
  if(o.compare){const[a,b]=B,x=20+400*a.on.size/a.d,x2=20+400*b.on.size/b.d;c.el('line',{x1:x,x2:x,y1:12,y2:160,class:'vis-split'},g);if(Math.abs(x-x2)>.5)c.el('line',{x1:x2,x2:x2,y1:12,y2:160,class:'vis-split b'},g)}
  const a=B[0];let t=`${frac(a)}: ${a.on.size} of ${a.d} equal parts shaded.`;
  if(a.on.size&&gcd(a.on.size,a.d)>1)t+=` That is the same as ${a.on.size/gcd(a.on.size,a.d)}/${a.d/gcd(a.on.size,a.d)}.`;
  if(o.compare){const b=B[1],u=a.on.size*b.d,v=b.on.size*a.d;t+=` Second bar: ${frac(b)}. `+(u===v?`The shaded lengths match, so ${frac(a)} = ${frac(b)}: equivalent fractions.`:`${u>v?frac(a):frac(b)} is bigger: its shading reaches further.`)}
  c.say(t)}
 const chg=(i,dv)=>{const b=B[i];b.d=Math.max(1,Math.min(12,b.d+dv));b.on=new Set([...b.on].filter(k=>k<b.d));draw()};
 c.btn('More parts',()=>chg(0,1));c.btn('Fewer parts',()=>chg(0,-1));
 if(o.compare){c.btn('Second bar: more parts',()=>chg(1,1));c.btn('Second bar: fewer parts',()=>chg(1,-1))}
 else{const pb=c.btn(pie?'Show as a bar':'Show as a pie',()=>{pie=!pie;pb.textContent=pie?'Show as a bar':'Show as a pie';s.setAttribute('viewBox',`0 0 440 ${pie?200:110}`);draw()})}
 c.cueEl=g;draw()});
/* number line from 0 to max with a draggable point that snaps to 1/d */
R('numline',c=>{const o=c.opts;let d=o.d||4;const M=o.max||1;let v=o.start??1;const s=c.svg(440,110,'Number line');const X=x=>30+380*x/M;
 const tk=c.el('g',{},s);c.el('line',{x1:30,x2:410,y1:60,y2:60,class:'vis-axis'},s);const hd=c.el('g',{class:'vis-handle-g'},s);c.el('path',{d:'M0 -22L10 -36H-10Z',class:'vis-handle'},hd);c.el('circle',{r:7,class:'vis-handle'},hd);
 const lab=c.el('text',{y:-42,'text-anchor':'middle',class:'vis-big'},hd);
 function draw(){tk.textContent='';for(let k=0;k<=M*d;k++){const x=X(k/d),whole=k%d===0;c.el('line',{x1:x,x2:x,y1:whole?48:52,y2:whole?72:68,class:'vis-axis'},tk);c.el('text',{x,y:90,'text-anchor':'middle',class:whole?'vis-lab b':'vis-lab'},tk,whole?String(k/d):`${k}/${d}`)}
  hd.setAttribute('transform',`translate(${X(v/d)},60)`);lab.textContent=v%d===0?String(v/d):`${v}/${d}`;
  const g0=gcd(v,d);let t=`The point is at ${v}/${d}${v%d?'':` = ${v/d}`}, which is ${nf(v/d)} as a decimal.`;if(g0>1&&v%d)t+=` Equivalent: ${v/g0}/${d/g0}.`;
  t+=` It sits ${v} of ${d} equal steps along from 0 towards 1.`;c.say(t);sync()}
 const nf=VIS.nf;
 c.drag(hd,s,x=>{const nv=Math.round((x-30)/380*M*d);const cl=Math.max(0,Math.min(M*d,nv));if(cl!==v){v=cl;draw()}});
 const sync=c.kslider(hd,'Point on the number line',()=>v,nv=>{v=nv;draw()},0,M*d,1,x=>`${x}/${d}`);
 c.btn('Smaller steps',()=>{const val=v/d;d=Math.min(12,d+1);v=Math.round(val*d);draw()});c.btn('Bigger steps',()=>{const val=v/d;d=Math.max(2,d-1);v=Math.round(val*d);draw()});
 c.cueEl=hd;draw()});
})();
/* Why Next? visuals for operations and algebra: balance scale, order-of-operations steps, long multiplication and long division layouts. */
(()=>{const R=VIS.reg,nf=VIS.nf;
/* balance scale. mode "equal": is left sum = right? mode "solve": a·x + b = c, apply the same operation to both sides */
R('balance',c=>{const o=c.opts,eq=o.mode==='equal';const s=c.svg(440,250,'Balance scale');
 c.el('path',{d:'M220 100L180 215H260Z',class:'vis-stand'},s);c.el('rect',{x:150,y:215,width:140,height:10,rx:3,class:'vis-stand'},s);
 const beam=c.el('g',{},s);c.el('rect',{x:70,y:96,width:300,height:8,rx:4,class:'vis-beam'},beam);c.el('circle',{cx:220,cy:100,r:6,class:'vis-stand'},beam);
 const pans=[0,1].map(i=>{const g=c.el('g',{class:'vis-pan'},s);c.el('line',{x1:-45,y1:60,x2:0,y2:0,class:'vis-rope'},g);c.el('line',{x1:45,y1:60,x2:0,y2:0,class:'vis-rope'},g);
  c.el('path',{d:'M-60 60H60L48 72H-48Z',class:'vis-pancup'},g);const items=c.el('g',{},g);const lab=c.el('text',{y:96,'text-anchor':'middle',class:'vis-big'},g);return{g,items,lab}});
 const X=eq?0:(o.c-o.b)/o.a;
 let L=eq?{x:0,k:(o.left||[3,4]).reduce((p,q)=>p+q,0)}:{x:o.a,k:o.b},Rt=eq?{x:0,k:o.right??5}:{x:0,k:o.c},ang=0,log=[];
 const w=S=>S.x*X+S.k;
 const expr=S=>{const p=[];if(S.x)p.push((S.x===1?'':S.x)+'x');if(S.k||!S.x)p.push(String(S.k));return p.join(' + ')};
 function fill(P,S,leftParts){P.items.textContent='';let x=-52;const put=(kind,txt)=>{const g=c.el('g',{transform:`translate(${x},${kind==='x'?32:42})`},P.items);
   if(kind==='x'){c.el('rect',{width:22,height:26,rx:6,class:'vis-bag'},g);c.el('text',{x:11,y:18,'text-anchor':'middle',class:'vis-bagt'},g,'x');x+=25}
   else{const wd=txt>9?30:14;c.el('rect',{width:wd,height:16,rx:2,class:'vis-unit'+(kind==='u2'?' b':'')},g);if(txt>1)c.el('text',{x:wd/2,y:12,'text-anchor':'middle',class:'vis-unitt'},g,String(txt));x+=wd+2}};
  for(let i=0;i<S.x;i++)put('x');
  if(leftParts)leftParts.forEach((n,j)=>{for(let i=0;i<n&&i<6;i++)put(j?'u2':'u',n>6&&i===5?n-5:1)});
  else if(S.k<=6)for(let i=0;i<S.k;i++)put('u',1);else{const tens=Math.floor(S.k/10),ones=S.k%10;for(let i=0;i<tens&&i<4;i++)put('u',tens>4&&i===3?(tens-3)*10:10);for(let i=0;i<ones&&i<5;i++)put('u',ones>5&&i===4?ones-4:1)}
  P.lab.textContent=expr(S)}
 function place(a){[[-150,0],[150,1]].forEach(([dx,i])=>{const r=a*Math.PI/180;pans[i].g.setAttribute('transform',`translate(${220+dx*Math.cos(r)},${100+dx*Math.sin(r)})`)});beam.setAttribute('transform',`rotate(${a} 220 100)`)}
 function draw(msg){fill(pans[0],L,eq?(o.left||[3,4]):null);fill(pans[1],Rt);const diff=w(Rt)-w(L),to=Math.max(-16,Math.min(16,diff*4)),from=ang;ang=to;
  c.tween(700,t=>place(from+(to-from)*t));
  const bal=Math.abs(diff)<1e-9;s.classList.toggle('vis-ok',bal);
  let t=eq?`Left: ${(o.left||[3,4]).join(' + ')} = ${L.k}. Right: ${Rt.k}. `+(bal?`Balanced: ${(o.left||[3,4]).join(' + ')} = ${Rt.k}. The = sign means both sides have the same value.`:`Not balanced: the ${diff>0?'right':'left'} side is heavier, so ${(o.left||[3,4]).join(' + ')} ≠ ${Rt.k}.`)
   :`Left: ${expr(L)}. Right: ${expr(Rt)}. `+(bal?'The scale balances.':`The scale tips ${diff>0?'right':'left'}: the sides are no longer equal.`);
  if(!eq&&bal&&L.x===1&&!L.k&&!Rt.x)t+=` Solved: x = ${Rt.k}.`;c.say((msg?msg+' ':'')+t);sync()}
 const btns={};
 function sync(){if(eq)return;const bal=Math.abs(w(Rt)-w(L))<1e-9;btns.sub.disabled=!bal||L.k<1||Rt.k<1;btns.div.disabled=!bal||L.k!==0||L.x<2||Rt.x||Rt.k%L.x!==0;btns.one.disabled=!bal||L.k<1;btns.back.disabled=bal}
 if(eq){c.btn('Add 1 to the right',()=>{Rt.k=Math.min(20,Rt.k+1);draw()});c.btn('Take 1 from the right',()=>{Rt.k=Math.max(0,Rt.k-1);draw()})}
 else{btns.sub=c.btn('Take 1 from both sides',()=>{L.k--;Rt.k--;log.push('−1 both sides');draw('You took 1 from both sides.')});
  btns.div=c.btn('Divide both sides by '+o.a,()=>{const d=L.x;L.x=1;Rt.k/=d;draw(`You divided both sides by ${d}.`)});
  btns.one=c.btn('Take 1 from the left only',()=>{L.k--;draw('You changed one side only.')},'ghost');
  btns.back=c.btn('Put it back',()=>{L.k++;draw('Put back.')},'ghost');
  c.btn('Start again',()=>{L={x:o.a,k:o.b};Rt={x:0,k:o.c};draw()},'ghost')}
 c.cueEl=pans.map(p=>p.g);draw()});
/* order of operations: step through an expression, highlighting the operation done next */
const OPS={'+':1,'-':1,'−':1,'×':2,'*':2,'÷':2,'/':2};
function tok(s){const t=[];s.replace(/\s+/g,'').replace(/(\d+(?:\.\d+)?|[()[\]]|[+\-−×*÷/])/g,m=>{t.push(/\d/.test(m)?{n:+m}:{o:m});return''});return t}
function show(t){return t.map(x=>x.n!=null?nf(x.n):x.o.replace('-','−').replace('*','×').replace('/','÷')).join(' ').replace(/([([]) /g,'$1').replace(/ ([)\]])/g,'$1')}
function next(t){let lo=0,hi=t.length,open=-1;for(let i=0;i<t.length;i++){if(t[i].o==='('||t[i].o==='[')open=i;if((t[i].o===')'||t[i].o===']')&&open>=0){lo=open+1;hi=i;break}}
 if(hi-lo===1&&lo>0)return{i:lo-1,j:hi+1,v:t[lo].n,why:'The bracket now holds a single number, so the brackets can go.'};
 const inB=lo>0;let k=-1;for(let i=lo;i<hi;i++)if(t[i].o&&OPS[t[i].o]===2){k=i;break}
 if(k<0)for(let i=lo;i<hi;i++)if(t[i].o&&OPS[t[i].o]===1&&i>lo){k=i;break}if(k<0)return null;
 const a=t[k-1].n,b=t[k+1].n,op=t[k].o,v={'+':a+b,'-':a-b,'−':a-b,'×':a*b,'*':a*b,'÷':a/b,'/':a/b}[op];
 const why=inB?'Brackets first.':OPS[op]===2?'× and ÷ come before + and −, working left to right.':'Now + and −, working left to right.';
 return{i:k-1,j:k+2,v,why:`${why} ${nf(a)} ${show([{o:op}])} ${nf(b)} = ${nf(v)}.`}}
R('bidmas',c=>{const o=c.opts;const lines=[tok(o.expr||'3 + 4 × 2')],whys=[];let st=0;
 const box=c.el('div',{class:'vis-steps'},c.stage);
 function hl(t,n){if(!n)return esc(show(t));const a=show(t.slice(0,n.i)),m=show(t.slice(n.i,n.j)),b=show(t.slice(n.j));return `${esc(a)}${a&&!/[([]$/.test(a)?' ':''}<mark class="vis-hl">${esc(m)}</mark>${b&&!/^[)\]]/.test(b)?' ':''}${esc(b)}`}
 function draw(){while(lines.length<=st){const t=lines[lines.length-1],n=next(t);if(!n)break;lines.push([...t.slice(0,n.i),{n:n.v},...t.slice(n.j)]);whys.push(n.why)}
  st=Math.min(st,lines.length-1);box.innerHTML=lines.slice(0,st+1).map((t,i)=>`<div class="vis-line${i===st?' cur':''}">${i?'= ':''}${i===st?hl(t,next(t)):esc(show(t))}</div>`).join('');
  const n=next(lines[st]);c.cueEl=box.querySelector('mark')||box;
  c.say(st?`Step ${st}: ${whys[st-1]} `+(n?'':`Done: the answer is ${show(lines[st])}.`):`${show(lines[0])}. Press Next step to work it out in the right order (BIDMAS/BODMAS, or PEMDAS in the US).`);
  nb.disabled=!n;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
/* written methods. Each step reveals one line of the layout. */
function grid(c,rows,W){return `<div class="vis-written" aria-hidden="true">${rows.map(r=>`<div class="vis-wl${r.cls?' '+r.cls:''}">${[...r.s.padStart(W,' ')].map((ch,i)=>{const h=r.hl&&r.hl.includes(W-r.s.length+i)?' class="vis-hl"':'';return `<span${h}>${ch===' '?'&nbsp;':esc(ch)}</span>`}).join('')}</div>`).join('')}</div>`}
R('longmul',c=>{const o=c.opts,a=o.a||34,b=o.b||26,bd=String(b).split('').reverse().map(Number),W=String(a*b).length+2;let st=0;const box=c.el('div',{},c.stage);
 const parts=bd.map((d,i)=>a*d*10**i);
 function draw(){const rows=[{s:String(a)},{s:'× '+b,cls:'ul'}];const hlB=st>0&&st<=bd.length?[W-st]:null;if(hlB)rows[1].hl=hlB;
  for(let i=0;i<Math.min(st,bd.length);i++){const s=String(parts[i]).padStart(1,'0'),z=i,hl=i===st-1?[...Array(z).keys()].map(k=>W-1-k):null;rows.push({s:parts[i]===0?'0'.repeat(i+1):s,hl,cls:i===st-1?'cur':''})}
  if(st>bd.length)rows.push({s:String(a*b),cls:'tot cur'});
  box.innerHTML=grid(c,rows,W);c.cueEl=box.querySelector('.cur')||box;
  const d=bd[st-1],pv=10**(st-1);
  c.say(st===0?`${a} × ${b}. Press Next step to multiply by each digit of ${b}, one row at a time.`
   :st<=bd.length?`Row ${st}: ${a} × ${d*pv} = ${parts[st-1]}.`+(st>1?` This digit is worth ${d*pv}, so the row ends in ${st-1===1?'a 0':st-1+' zeros'} (the placeholder).`:'')
   :`Add the rows: ${parts.join(' + ')} = ${a*b}. So ${a} × ${b} = ${a*b}.`);nb.disabled=st>bd.length;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
R('longdiv',c=>{const o=c.opts,a=o.a||432,b=o.b||15,ds=String(a).split('').map(Number),steps=[];let cur=0,started=false,q='';
 ds.forEach((d,i)=>{cur=cur*10+d;if(!started&&cur<b&&i<ds.length-1){q+=' ';return}started=true;const k=Math.floor(cur/b);steps.push({i,cur,k,p:k*b,r:cur-k*b});q+=k;cur-=k*b});
 const rem=cur,qt=Math.floor(a/b),bl=String(b).length+1,W=bl+ds.length;let st=0;const box=c.el('div',{},c.stage);
 const mult=c.el('p',{class:'vis-mult'},c.stage,`Multiples of ${b}: `+[...Array(9)].map((_,k)=>`${k+1}×${b}=${(k+1)*b}`).join(', '));
 function draw(){const shown=Math.min(st,steps.length),qs=q.slice(0,steps.length?steps[Math.max(0,shown-1)].i+1:0);
  const rows=[{s:(' '.repeat(bl)+(shown?qs:'')).padEnd(W,' '),cls:'q'},{s:`${b})${a}`,cls:'ov'}];
  for(let k=0;k<shown;k++){const S=steps[k],end=bl+S.i+1;rows.push({s:('−'+S.p).padStart(end,' ').padEnd(W,' '),cls:'ul'+(k===shown-1?' cur':'')});
   const nxt=steps[k+1];const rs=nxt?String(nxt.cur):String(S.r);rows.push({s:rs.padStart(nxt?bl+nxt.i+1:end,' ').padEnd(W,' '),cls:k===shown-1?'cur':''})}
  box.innerHTML=grid(c,rows,W);c.cueEl=[...box.querySelectorAll('.cur')];if(!c.cueEl.length)c.cueEl=box;
  const S=steps[shown-1],N=steps[shown];
  let t=!st?`${a} ÷ ${b}. Divide, multiply, subtract, bring down: one digit at a time. Press Next step.`
   :st<=steps.length?`${b} goes into ${S.cur} ${S.k} time${S.k===1?'':'s'} (${S.k} × ${b} = ${S.p}). ${S.cur} − ${S.p} = ${S.r}.`+(N?` Bring down the next digit to make ${N.cur}.`:'')
   :`${a} ÷ ${b} = ${qt}`+(rem?` remainder ${rem}. As a fraction ${qt} ${rem}/${b}; as a decimal ${nf(a/b,3)}. In a word problem, decide whether to round up or down.`:'.');
  c.say(t);nb.disabled=st>steps.length;bb.disabled=!st}
 const nb=c.btn('Next step',()=>{st++;draw()}),bb=c.btn('Back',()=>{st--;draw()});c.btn('Start again',()=>{st=0;draw()},'ghost');draw()});
VIS.parseExpr=tok;VIS.nextStep=next;VIS.showExpr=show;
})();
/* Why Next? visuals for graphs and calculus: function plotter (evaluate, line gradient, secant → tangent, tangent/normal, limits),
   average rate of change, and the power-rule pattern. Functions are simple expressions in x, checked by learn/validate_lessons.py. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const SAFE=/^[x0-9+\-*/(). ]+$/;
function fn(src){if(!SAFE.test(src))throw new Error('unsafe f');return Function('x',`"use strict";return (${src});`)}
const der=(f,x)=>{const h=1e-4;return (f(x+h)-f(x-h))/(2*h)};
const sup=n=>String(n).split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]||d).join('');
const pw=(n,v='x')=>n===0?'1':n===1?v:v+sup(n);
function plot(c,o,label,W=440,H=300){const m=34,[x0,x1]=o.xr||[-1,5];let[y0,y1]=o.yr||[-2,20];if(o.equal){const sp=(x1-x0)*(H-m-10)/(W-m-10),mid=(y0+y1)/2;y0=mid-sp/2;y1=mid+sp/2}
 const sx=x=>m+(x-x0)/(x1-x0)*(W-m-10),sy=y=>H-m-(y-y0)/(y1-y0)*(H-m-10),ix=X=>x0+(X-m)/(W-m-10)*(x1-x0);
 const s=c.svg(W,H,label),ax=c.el('g',{class:'vis-axes'},s);
 const step=(a,b)=>{const r=b-a;return r>40?10:r>16?5:r>8?2:r>3?1:.5};
 for(let x=Math.ceil(x0/step(x0,x1))*step(x0,x1);x<=x1;x+=step(x0,x1)){c.el('line',{x1:sx(x),x2:sx(x),y1:m-24,y2:H-m,class:'vis-grid'},ax);c.el('text',{x:sx(x),y:H-m+14,'text-anchor':'middle',class:'vis-lab'},ax,nf(x))}
 for(let y=Math.ceil(y0/step(y0,y1))*step(y0,y1);y<=y1;y+=step(y0,y1)){c.el('line',{x1:m,x2:W-10,y1:sy(y),y2:sy(y),class:'vis-grid'},ax);c.el('text',{x:m-4,y:sy(y)+4,'text-anchor':'end',class:'vis-lab'},ax,nf(y))}
 if(y0<0&&y1>0)c.el('line',{x1:m,x2:W-10,y1:sy(0),y2:sy(0),class:'vis-axis'},ax);if(x0<0&&x1>0)c.el('line',{x1:sx(0),x2:sx(0),y1:10,y2:H-m,class:'vis-axis'},ax);
 const curve=(f,cls='vis-curve',par=s)=>{let d='',pen=false;for(let i=0;i<=240;i++){const x=x0+(x1-x0)*i/240,y=f(x);if(!isFinite(y)||y<y0-(y1-y0)||y>y1+(y1-y0)){pen=false;continue}d+=(pen?'L':'M')+sx(x).toFixed(1)+' '+sy(y).toFixed(1);pen=true}return c.el('path',{d,class:cls},par)};
 const seg=(x,y,k,cls,par=s)=>{const xa=x0,xb=x1;return c.el('line',{x1:sx(xa),y1:sy(y+k*(xa-x)),x2:sx(xb),y2:sy(y+k*(xb-x)),class:cls},par)};
 const clip='vc'+Math.random().toString(36).slice(2,7);const cp=c.el('clipPath',{id:clip},s);c.el('rect',{x:m,y:10,width:W-m-10,height:H-m-10},cp);
 const lay=c.el('g',{'clip-path':`url(#${clip})`},s);
 return{s,sx,sy,ix,curve,seg,lay,x0,x1,y0,y1}}
function handle(c,P,cls='vis-handle'){const h=c.el('circle',{r:9,class:cls},P.s);return h}
R('plot',c=>{const o=c.opts,mode=o.mode||'tangent',f=o.f?fn(o.f):null,P=plot(c,o,'Graph');const fx=o.label||'f(x)';
 if(f)P.curve(f,'vis-curve',P.lay);
 const ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);const at=(h,x,y)=>{h.setAttribute('cx',P.sx(x));h.setAttribute('cy',P.sy(y))};
 const lnA=(x1,y1,x2,y2,el)=>{el.setAttribute('x1',P.sx(x1));el.setAttribute('y1',P.sy(y1));el.setAttribute('x2',P.sx(x2));el.setAttribute('y2',P.sy(y2))};
 const st=o.step||.5;let a=o.a??1;
 if(mode==='eval'){const gx=c.el('line',{class:'vis-guide'},P.lay),gy=c.el('line',{class:'vis-guide'},P.lay),h=handle(c,P);
  const draw=()=>{const y=f(a);at(h,a,y);lnA(a,0,a,y,gx);lnA(P.x0,y,a,y,gy);ro.textContent=`${fx.replace('x',nf(a))} = ${nf(y)}`;c.say(`Input x = ${nf(a)} goes into the rule; the output is ${fx.replace('x',nf(a))} = ${nf(y)}. Drag the point to try other inputs.`);sync()};
  c.drag(h,P.s,X=>{a=Math.round(P.ix(X)/st)*st;a=Math.max(P.x0,Math.min(P.x1,a));draw()});const sync=c.kslider(h,'Input x',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`x = ${nf(v)}`);c.cueEl=[h,gx,gy];draw();return}
 if(mode==='line'){let p=o.p||[1,3],q=o.q||[3,7];const ln=c.el('line',{class:'vis-curve'},P.lay),run=c.el('line',{class:'vis-run'},P.s),rise=c.el('line',{class:'vis-rise'},P.s),hp=handle(c,P),hq=handle(c,P,'vis-handle b');
  const draw=()=>{const dx=q[0]-p[0],dy=q[1]-p[1];if(dx){const k=dy/dx;lnA(P.x0,p[1]+k*(P.x0-p[0]),P.x1,p[1]+k*(P.x1-p[0]),ln)}else lnA(p[0],P.y0,p[0],P.y1,ln);
   lnA(p[0],p[1],q[0],p[1],run);lnA(q[0],p[1],q[0],q[1],rise);at(hp,...p);at(hq,...q);
   const k=dx?dy/dx:null,cc=dx?p[1]-k*p[0]:null;ro.textContent=dx?`gradient = ${dy} ÷ ${dx} = ${nf(k)}`:'run = 0: vertical line';
   c.say(dx?`From (${p}) to (${q}): rise ${dy}, run ${dx}, gradient = rise ÷ run = ${nf(k)}. Equation: y = ${nf(k)}x ${cc<0?'−':'+'} ${nf(Math.abs(cc))}.`:'Both points have the same x, so the line is vertical and its gradient is undefined.');sp();sq()};
  const mv=(pt)=>(X,Y)=>{pt[0]=Math.round(P.ix(X));pt[1]=Math.round(P.y0+(P.sy(P.y0)-Y)/(P.sy(P.y0)-P.sy(P.y1))*(P.y1-P.y0));pt[0]=Math.max(P.x0,Math.min(P.x1,pt[0]));pt[1]=Math.max(P.y0,Math.min(P.y1,pt[1]));draw()};
  c.drag(hp,P.s,mv(p));c.drag(hq,P.s,mv(q));const sp=c.kslider(hp,'First point, x (up/down keys move it along x)',()=>p[0],v=>{p[0]=v;draw()},P.x0,P.x1,1),sq=c.kslider(hq,'Second point, y',()=>q[1],v=>{q[1]=v;draw()},P.y0,P.y1,1);
  c.cueEl=[run,rise];draw();return}
 if(mode==='secant'){let h=o.h??2;const A=handle(c,P),B=handle(c,P,'vis-handle b'),sec=c.el('line',{class:'vis-sec'},P.lay),tan=c.el('line',{class:'vis-tan'},P.lay);const T=der(f,a);
  const draw=()=>{const ya=f(a),yb=f(a+h),k=(yb-ya)/h;at(A,a,ya);at(B,a+h,yb);lnA(P.x0,ya+k*(P.x0-a),P.x1,ya+k*(P.x1-a),sec);lnA(P.x0,ya+T*(P.x0-a),P.x1,ya+T*(P.x1-a),tan);
   tan.style.opacity=Math.abs(h)<.3?1:.25;ro.textContent=`h = ${nf(h,3)}   gradient = ${nf(k,3)}`;sl.value=Math.round(Math.log10(Math.max(.01,Math.abs(h)))*100);
   c.say(`Chord from x = ${nf(a)} to x = ${nf(a+h,3)}: gradient = (f(${nf(a+h,3)}) − f(${nf(a)})) ÷ ${nf(h,3)} = ${nf(k,3)}. `+(Math.abs(h)<.02?`h is tiny, so the chord is almost the tangent: the gradient at x = ${nf(a)} is ${nf(T)}.`:`Make h smaller and the gradient closes in on ${nf(T)}.`));sb()};
  c.drag(B,P.s,X=>{let v=P.ix(X)-a;if(Math.abs(v)<.01)v=v<0?-.01:.01;h=Math.round(v*1000)/1000;draw()});
  const sb=c.kslider(B,'Second point: distance h from the first',()=>h,v=>{h=Math.abs(v)<.01?(v<h?-.01:.01):v;draw()},-2,2,.05,v=>`h = ${nf(v,3)}`);
  const sl=c.range('Shrink h',-200,30,1,Math.round(Math.log10(h)*100),v=>{h=Math.round(10**(v/100)*1000)/1000;draw()});
  c.btn('Animate h → 0',()=>{const h0=h;c.tween(2500,t=>{h=Math.max(.01,h0*Math.pow(.01/h0,t));h=Math.round(h*1000)/1000;draw()})});
  c.cueEl=[sec,B];draw();return}
 if(mode==='limit'){const L=(f(a-1e-6)+f(a+1e-6))/2;let x=o.start??(a-.5);const h=handle(c,P),hole=c.el('circle',{r:6,class:'vis-hole'},P.s);at(hole,a,L);
  const draw=()=>{const y=f(x);at(h,x,Number.isFinite(y)?y:L);ro.textContent=Math.abs(x-a)<1e-9?`x = ${nf(a)}: f is undefined (0 ÷ 0)`:`x = ${nf(x,3)}   f(x) = ${nf(y,3)}`;
   c.say(Math.abs(x-a)<1e-9?`At x = ${nf(a)} itself the formula gives 0 ÷ 0, so there is a hole in the graph. But the outputs nearby close in on ${nf(L)}: the limit is ${nf(L)}.`:`x = ${nf(x,3)} gives f(x) = ${nf(y,3)}. Move x closer to ${nf(a)} from either side and f(x) closes in on ${nf(L)}.`);sy_()};
  c.drag(h,P.s,X=>{x=Math.round(P.ix(X)*1000)/1000;draw()});const sy_=c.kslider(h,`x, approaching ${a}`,()=>x,v=>{x=v;draw()},P.x0,P.x1,.01,v=>`x = ${nf(v,3)}`);
  c.btn('Halve the distance to '+nf(a),()=>{x=Math.round((a+(x-a)/2)*10000)/10000;if(Math.abs(x-a)<1e-4)x=a;draw()});c.btn('Jump to the other side',()=>{x=a-(x-a);draw()},'ghost');
  c.cueEl=[hole,h];draw();return}
 /* tangent (default): drag a point; the tangent (and optional normal) follows, with live dy/dx */
 const tan=c.el('line',{class:'vis-tan on'},P.lay),nor=o.normal?c.el('line',{class:'vis-nor'},P.lay):null,h=handle(c,P);
 const draw=()=>{const y=f(a),k=der(f,a);at(h,a,y);lnA(P.x0,y+k*(P.x0-a),P.x1,y+k*(P.x1-a),tan);
  if(nor){if(Math.abs(k)>1e-9){const q=-1/k;lnA(P.x0,y+q*(P.x0-a),P.x1,y+q*(P.x1-a),nor)}else lnA(a,P.y0,a,P.y1,nor)}
  const cc=y-k*a;ro.textContent=`x = ${nf(a)}   dy/dx = ${nf(k)}`;
  c.say(`At x = ${nf(a)}, y = ${nf(y)} and the gradient dy/dx = ${nf(k)}. Tangent: y = ${nf(k)}x ${cc<0?'−':'+'} ${nf(Math.abs(cc))}.`+(nor?(Math.abs(k)>1e-9?` The normal is at right angles to it, with gradient −1 ÷ ${nf(k)} = ${nf(-1/k)}.`:' The tangent is flat, so the normal is vertical.'):'')+(Math.abs(k)<1e-9?' A gradient of 0 means a flat tangent.':''));sync()};
 c.drag(h,P.s,X=>{a=Math.round(P.ix(X)*10)/10;a=Math.max(P.x0,Math.min(P.x1,a));draw()});const sync=c.kslider(h,'Point on the curve, x',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`x = ${nf(v)}`);
 c.cueEl=[tan,h];draw()});
/* average rate of change between two draggable points */
R('rate',c=>{const o=c.opts,f=fn(o.f||'x*x'),P=plot(c,o,'Average rate of change');P.curve(f,'vis-curve',P.lay);let a=o.a??1,b=o.b??3;const ux=o.ux||'',uy=o.uy||'';
 const ch=c.el('line',{class:'vis-sec'},P.lay),run=c.el('line',{class:'vis-run'},P.s),rise=c.el('line',{class:'vis-rise'},P.s),A=c.el('circle',{r:9,class:'vis-handle'},P.s),B=c.el('circle',{r:9,class:'vis-handle b'},P.s),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);
 const L=(e,x1,y1,x2,y2)=>{e.setAttribute('x1',P.sx(x1));e.setAttribute('y1',P.sy(y1));e.setAttribute('x2',P.sx(x2));e.setAttribute('y2',P.sy(y2))};
 const draw=()=>{const fa=f(a),fb=f(b);A.setAttribute('cx',P.sx(a));A.setAttribute('cy',P.sy(fa));B.setAttribute('cx',P.sx(b));B.setAttribute('cy',P.sy(fb));
  if(a!==b){const k=(fb-fa)/(b-a);L(ch,P.x0,fa+k*(P.x0-a),P.x1,fa+k*(P.x1-a));L(run,a,fa,b,fa);L(rise,b,fa,b,fb);ro.textContent=`average rate = ${nf(fb-fa)} ÷ ${nf(b-a)} = ${nf(k)}`;
   c.say(`From ${ux?'':'x = '}${nf(a)}${ux} to ${nf(b)}${ux}: the output changes by ${nf(fb-fa)}${uy}, over ${nf(b-a)}${ux}. Average rate = ${nf(fb-fa)} ÷ ${nf(b-a)} = ${nf(k)}${uy&&ux?` ${uy.trim()} per ${ux.trim()}`:''}. It is the gradient of the straight line joining the two points.`)}
  else c.say('Both points are at the same place: move one to make a gap.');sa();sb()};
 const st=o.step||.5;c.drag(A,P.s,X=>{a=Math.round(P.ix(X)/st)*st;draw()});c.drag(B,P.s,X=>{b=Math.round(P.ix(X)/st)*st;draw()});
 const sa=c.kslider(A,'Start point',()=>a,v=>{a=v;draw()},P.x0,P.x1,st),sb=c.kslider(B,'End point',()=>b,v=>{b=v;draw()},P.x0,P.x1,st);c.cueEl=[ch,run,rise];draw()});
/* power rule: y = xⁿ beside its gradient function, with a draggable x */
R('power',c=>{const o=c.opts;let n=o.n||3,x=1;const row=c.el('div',{class:'vis-two'},c.stage);
 const host=(lab)=>{const d=c.el('div',{},row);return{stage:d,svg:(w,h)=>c.el('svg',{viewBox:`0 0 ${w} ${h}`,role:'group','aria-label':lab,class:'vis-svg'},d),el:c.el}};
 const yr=()=>[-Math.max(4,2**n),Math.max(4,2**n)],yr2=()=>[-Math.max(4,n*2**(n-1)),Math.max(4,n*2**(n-1))];
 let A,B,hA,hB,tn,ro;
 function build(){row.textContent='';A=plot(Object.assign({},c,host('y = x to the power n')),{xr:[-2,2],yr:yr()},'',300,240);B=plot(Object.assign({},c,host('Gradient function')),{xr:[-2,2],yr:yr2()},'',300,240);
  A.curve(x=>x**n,'vis-curve',A.lay);B.curve(x=>n*x**(n-1),'vis-curve b',B.lay);tn=c.el('line',{class:'vis-tan on'},A.lay);hA=c.el('circle',{r:8,class:'vis-handle'},A.s);hB=c.el('circle',{r:7,class:'vis-handle b'},B.s);
  c.el('text',{x:40,y:20,class:'vis-big'},A.s,`y = ${pw(n)}`);ro=c.el('text',{x:40,y:20,class:'vis-big'},B.s);
  c.drag(hA,A.s,X=>{x=Math.round(A.ix(X)*10)/10;draw()});sync=c.kslider(hA,'x',()=>x,v=>{x=v;draw()},-2,2,.1);c.cueEl=[tn,hB]}
 let sync=null;
 function draw(){const y=x**n,k=n*x**(n-1);hA.setAttribute('cx',A.sx(x));hA.setAttribute('cy',A.sy(y));hB.setAttribute('cx',B.sx(x));hB.setAttribute('cy',B.sy(k));
  tn.setAttribute('x1',A.sx(-2));tn.setAttribute('y1',A.sy(y+k*(-2-x)));tn.setAttribute('x2',A.sx(2));tn.setAttribute('y2',A.sy(y+k*(2-x)));ro.textContent=`dy/dx = ${n===1?'1':(n===2?'2x':n+pw(n-1))}`;
  tab.innerHTML=[1,2,3,4,5].map(m=>`<span class="${m===n?'vis-hl':''}">${pw(m)} → ${m===1?'1':m+(m-1===1?'x':pw(m-1))}</span>`).join(' ');
  c.say(`y = ${pw(n)}. At x = ${nf(x)} the tangent's gradient is ${nf(k)}, which equals ${n} × ${nf(x)}${n-1>1?sup(n-1):n-1===0?'⁰':''} = ${nf(k)}. Power rule: bring the power ${n} down in front and take one off the power.`);sync()}
 const tab=c.el('p',{class:'vis-pattern'},c.stage);c.range('Power n',1,5,1,n,v=>{n=v;build();draw()});build();draw()});
VIS.safeFn=fn;VIS.plotKit={plot,handle,der};
})();
/* Why Next? visuals for integration: area under a curve with rectangles or trapezia (Riemann sums), signed area
   between two draggable limits, the fundamental theorem (area function and its gradient), families of antiderivatives
   (+C, and fixing C with a point), and displacement as area under a velocity-time graph. */
(()=>{const nf=VIS.nf;
const simpson=(f,a,b,n=400)=>{if(a===b)return 0;const h=(b-a)/n;let s=f(a)+f(b);for(let i=1;i<n;i++)s+=(i%2?4:2)*f(a+i*h);return s*h/3};
VIS.reg('area',c=>{const o=c.opts,mode=o.mode||'riemann',f=o.f?VIS.safeFn(o.f):null,K=VIS.plotKit,uy=o.uy||'',ux=o.ux||'';
 if(mode==='ftc')return ftc(c,o,f,K);if(mode==='family')return family(c,o,K);
 const P=K.plot(c,o,mode==='velocity'?'Velocity–time graph':'Graph of y = f(x)');const sh=c.el('g',{},P.lay);P.curve(f,'vis-curve',P.lay);
 const ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),Z=P.sy(Math.max(P.y0,Math.min(P.y1,0)));
 let a=o.a??0,b=o.b??2,n=o.n??4,meth=o.method||'left';
 const poly=(pts,cls)=>c.el('polygon',{points:pts.map(([x,y])=>`${P.sx(x).toFixed(1)},${P.sy(y).toFixed(1)}`).join(' '),class:cls},sh);
 if(mode==='riemann'){const names={left:'left',right:'right',mid:'midpoint',trap:'trapezium'},bs={};
  const draw=()=>{sh.innerHTML='';const w=(b-a)/n;let s=0;for(let i=0;i<n;i++){const xl=a+i*w,xr=xl+w;
    if(meth==='trap'){const yl=f(xl),yr=f(xr);s+=(yl+yr)/2*w;poly([[xl,0],[xl,yl],[xr,yr],[xr,0]],'vis-strip')}
    else{const y=f(meth==='left'?xl:meth==='right'?xr:xl+w/2);s+=y*w;poly([[xl,0],[xl,y],[xr,y],[xr,0]],'vis-strip')}}
   const ex=simpson(f,a,b),err=s-ex;ro.textContent=`n = ${n}: ≈ ${nf(s,3)}  (exact ${nf(ex,3)})`;
   for(const k in bs)bs[k].setAttribute('aria-pressed',k===meth);
   c.say(`${n} ${meth==='trap'?'trapezia':'rectangles'} of width ${nf(w,3)} from x = ${nf(a)} to ${nf(b)}, using ${meth==='trap'?'both ends of each strip':'the '+names[meth]+' point for each height'}. Total area ≈ ${nf(s,3)}. The exact area is ${nf(ex,3)}, so the estimate is ${Math.abs(err)<5e-4?'spot on':Math.abs(err).toFixed(3).replace(/0+$/,'')+(err>0?' too big':' too small')}. More strips make it closer.`)};
  c.range('Strips n',1,40,1,n,v=>{n=v;draw()});for(const k of ['left','right','mid','trap'])bs[k]=c.btn(k==='mid'?'Midpoint':k==='trap'?'Trapezia':k[0].toUpperCase()+k.slice(1),()=>{meth=k;draw()},'ghost');
  c.cueEl=[sh];draw();return}
 /* definite / velocity: signed area between draggable limits */
 const A=c.el('circle',{r:9,class:'vis-handle'},P.s),B=c.el('circle',{r:9,class:'vis-handle b'},P.s);A.setAttribute('cy',Z);B.setAttribute('cy',Z);
 const st=o.step||.5,va=c.el('line',{class:'vis-guide'},P.lay),vb=c.el('line',{class:'vis-guide'},P.lay);
 const draw=()=>{sh.innerHTML='';const N=80,w=(b-a)/N;for(let i=0;i<N;i++){const x=a+i*w,y=f(x+w/2);poly([[x,0],[x,f(x)],[x+w,f(x+w)],[x+w,0]],y>=0?'vis-strip':'vis-strip neg')}
  for(const[h,x,l]of[[A,a,va],[B,b,vb]]){h.setAttribute('cx',P.sx(x));l.setAttribute('x1',P.sx(x));l.setAttribute('x2',P.sx(x));l.setAttribute('y1',10);l.setAttribute('y2',P.sy(P.y0))}
  const I=simpson(f,a,b),D=Math.abs(simpson(x=>Math.abs(f(x)),a,b,2000)),up=Math.abs(I+Math.sign(b-a)*D)/2,dn=Math.abs(D-Math.sign(b-a)*I)/2;
  if(mode==='velocity'){ro.textContent=`displacement = ${nf(I)} ${ux}`;c.say(`From t = ${nf(a)} to t = ${nf(b)} ${o.tu||'s'}: area above the axis ${nf(up)} ${ux}, below ${nf(dn)} ${ux}. Displacement = ${nf(up)} − ${nf(dn)} = ${nf(I)} ${ux}; total distance travelled = ${nf(up+dn)} ${ux}. Area below the axis means moving backwards.`)}
  else{ro.textContent=`∫ from ${nf(a)} to ${nf(b)} = ${nf(I)}`;c.say(`The definite integral from x = ${nf(a)} to x = ${nf(b)} is ${nf(I)}: area above the x-axis (${nf(up)}) counts as positive, area below (${nf(dn)}) as negative. ${b<a?'The limits are backwards, so the sign flips.':''}`.trim())}
  sa();sb()};
 const sa=c.kslider(A,'Lower limit',()=>a,v=>{a=v;draw()},P.x0,P.x1,st,v=>`${nf(v)}`),sb=c.kslider(B,'Upper limit',()=>b,v=>{b=v;draw()},P.x0,P.x1,st,v=>`${nf(v)}`);
 const snap=X=>Math.max(P.x0,Math.min(P.x1,Math.round(P.ix(X)/st)*st));c.drag(A,P.s,X=>{a=snap(X);draw()});c.drag(B,P.s,X=>{b=snap(X);draw()});
 c.cueEl=[sh,A,B];draw()});
function ftc(c,o,f,K){const two=c.el('div',{class:'vis-two'},c.stage);let a=o.a??0,x=o.start??2;const st=o.step||.25;
 const P=K.plot(c,o,'y = f(x) with the area from a to x shaded',300,240),Q=K.plot(c,{xr:o.xr,yr:o.ar||o.yr},'Area function A(x)',300,240);two.append(P.s,Q.s);
 const sh=c.el('polygon',{class:'vis-strip'},P.lay);P.curve(f,'vis-curve',P.lay);const Af=t=>simpson(f,a,t,100);Q.curve(Af,'vis-curve b',Q.lay);
 const h=c.el('circle',{r:9,class:'vis-handle'},P.s),q=c.el('circle',{r:7,class:'vis-handle b'},Q.s),tn=c.el('line',{class:'vis-tan on'},Q.lay);
 const r1=c.el('text',{x:44,y:22,class:'vis-big'},P.s),r2=c.el('text',{x:44,y:22,class:'vis-big'},Q.s);
 const draw=()=>{const pts=[[a,0]];for(let i=0;i<=60;i++){const t=a+(x-a)*i/60;pts.push([t,f(t)])}pts.push([x,0]);sh.setAttribute('points',pts.map(([u,v])=>`${P.sx(u).toFixed(1)},${P.sy(v).toFixed(1)}`).join(' '));
  const y=f(x),A=Af(x);h.setAttribute('cx',P.sx(x));h.setAttribute('cy',P.sy(y));q.setAttribute('cx',Q.sx(x));q.setAttribute('cy',Q.sy(A));
  const L=(Q.x1-Q.x0)/5;tn.setAttribute('x1',Q.sx(x-L));tn.setAttribute('y1',Q.sy(A-y*L));tn.setAttribute('x2',Q.sx(x+L));tn.setAttribute('y2',Q.sy(A+y*L));
  r1.textContent=`f(${nf(x)}) = ${nf(y)}`;r2.textContent=`A(${nf(x)}) = ${nf(A)}`;
  c.say(`Shaded area from ${nf(a)} to x = ${nf(x)} is A(x) = ${nf(A)}. The gradient of the area graph at x = ${nf(x)} is ${nf(K.der(Af,x))}, the same as the height f(${nf(x)}) = ${nf(y)}. That is the fundamental theorem: the area function's derivative is f.`);sync()};
 c.drag(h,P.s,X=>{x=Math.max(a,Math.min(P.x1,Math.round(P.ix(X)/st)*st));draw()});const sync=c.kslider(h,'Right edge x',()=>x,v=>{x=v;draw()},a,P.x1,st,v=>`x = ${nf(v)}`);
 c.cueEl=[sh,tn];draw()}
function family(c,o,K){const F=VIS.safeFn(o.F),P=K.plot(c,o,'Antiderivatives y = F(x) + C'),lab=o.label||'F(x)';let C=o.c??0;const xs=o.at??1,pt=o.point;
 for(let k=-4;k<=4;k++)P.curve(x=>F(x)+k,'vis-curve faint',P.lay);let cv=null;
 const tg=c.el('g',{},P.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),g=K.der(F,xs);
 for(let k=-4;k<=4;k++){const y=F(xs)+k;c.el('line',{x1:P.sx(xs-.5),y1:P.sy(y-g*.5),x2:P.sx(xs+.5),y2:P.sy(y+g*.5),class:'vis-tan'},tg)}
 const P0=pt?c.el('circle',{r:6,cx:P.sx(pt[0]),cy:P.sy(pt[1]),class:'vis-target'},P.s):null;const c0=pt?pt[1]-F(pt[0]):null;
 const draw=()=>{if(cv)cv.remove();cv=P.curve(x=>F(x)+C,'vis-curve',P.lay);
  const cs=C<0?`− ${nf(-C)}`:C>0?`+ ${nf(C)}`:'';ro.textContent=`y = ${lab} ${cs}`;
  c.say(`y = ${lab} ${cs}. Every curve in the family has the same gradient ${nf(g)} at x = ${nf(xs)} (the short parallel lines), so they all have the same derivative. ${pt?(Math.abs(C-c0)<1e-9?`It passes through (${nf(pt[0])}, ${nf(pt[1])}), so C = ${nf(c0)}.`:`It misses the point (${nf(pt[0])}, ${nf(pt[1])}); change C until it passes through.`):'Changing C slides the curve up or down.'}`)};
 c.range('Constant C',-4,4,1,C,v=>{C=v;draw()});c.cueEl=P0?[tg,P0]:[tg];draw()}
})();
/* Why Next? visuals for chemistry: particle model (solid/liquid/gas with a temperature slider), atom builder,
   periodic table explorer, and an equation balancer with atom counts and a balance scale. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const EL='H Hydrogen,He Helium,Li Lithium,Be Beryllium,B Boron,C Carbon,N Nitrogen,O Oxygen,F Fluorine,Ne Neon,Na Sodium,Mg Magnesium,Al Aluminium,Si Silicon,P Phosphorus,S Sulfur,Cl Chlorine,Ar Argon,K Potassium,Ca Calcium,Sc Scandium,Ti Titanium,V Vanadium,Cr Chromium,Mn Manganese,Fe Iron,Co Cobalt,Ni Nickel,Cu Copper,Zn Zinc,Ga Gallium,Ge Germanium,As Arsenic,Se Selenium,Br Bromine,Kr Krypton'.split(',').map((s,i)=>{const[sym,name]=s.split(' ');return{z:i+1,sym,name}});
const MASS={H:1,He:4,Li:7,Be:9,B:11,C:12,N:14,O:16,F:19,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Fe:56,Cu:63.5,Zn:65,Br:80};
const NONMETAL=new Set('H He C N O F Ne P S Cl Ar Se Br Kr'.split(' ')),SEMI=new Set('B Si Ge As'.split(' '));
function pos(z){if(z<=2)return[1,z===1?1:18];const P=z<=10?2:z<=18?3:4,s=P===2?3:P===3?11:19,k=z-s;let g;if(P<4)g=k<2?k+1:k+11;else g=k+1;return[P,g]}
EL.forEach(e=>{[e.period,e.group]=pos(e.z);e.kind=NONMETAL.has(e.sym)?'non-metal':SEMI.has(e.sym)?'metalloid':'metal'});
const COLR={H:'#f8fafc',O:'#dc2626',C:'#374151',N:'#2563eb',Na:'#7c3aed',Cl:'#16a34a',Mg:'#94a3b8',Fe:'#92400e',S:'#facc15',Ca:'#a3a3a3',Cu:'#c2410c',Zn:'#64748b',K:'#a855f7',Al:'#cbd5e1'};
/* particles: canvas animation; static frames when reduced motion is on or the figure is off screen */
R('particles',c=>{const o=c.opts,mp=o.mp??0,bp=o.bp??100,name=o.name||'water';let T=o.temp??20,run=!VIS.reduced(),vis=true;
 const W=440,H=260,cv=c.el('canvas',{width:W*2,height:H*2,class:'vis-canvas',role:'img'},c.stage),g=cv.getContext('2d');g.scale(2,2);
 const N=48,cols=8,r=9,ps=[...Array(N)].map((_,i)=>({hx:W/2-(cols-1)*r+(i%cols)*2*r+(Math.floor(i/cols)%2)*r,hy:H-14-Math.floor(i/cols)*2*r*.88,x:0,y:0,vx:0,vy:0,ph:Math.random()*6.3,b:o.mix&&i%3===0}));
 ps.forEach(p=>{p.x=p.hx;p.y=p.hy});
 const state=()=>T<mp?'solid':T<bp?'liquid':'gas';const sp=()=>Math.sqrt((T+273)/293);
 function stepSim(dt){const s=state(),v=sp();const top=s==='liquid'?H-6*2*r*.88-34:6;
  ps.forEach(p=>{if(s==='solid'){p.ph+=dt*8*v;const a=1+2.5*v*Math.max(0,Math.min(1,(T-mp+60)/60));p.x+=(p.hx+Math.cos(p.ph)*a-p.x)*.5;p.y+=(p.hy+Math.sin(p.ph*1.3)*a-p.y)*.5;return}
   const tgt=s==='gas'?160*v:45*v;const m=Math.hypot(p.vx,p.vy)||1;if(m<tgt*.5||m>tgt*1.5){const an=Math.random()*6.3;p.vx=Math.cos(an)*tgt;p.vy=Math.sin(an)*tgt}
   if(s==='liquid'){p.vx+=(Math.random()-.5)*60*dt*v;p.vy+=(Math.random()-.5)*60*dt*v+30*dt}
   p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.x<r){p.x=r;p.vx=Math.abs(p.vx)}if(p.x>W-r){p.x=W-r;p.vx=-Math.abs(p.vx)}if(p.y>H-r){p.y=H-r;p.vy=-Math.abs(p.vy)}if(p.y<top+r){p.y=top+r;p.vy=Math.abs(p.vy)}});
  if(s!=='gas')for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){const a=ps[i],b=ps[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<2*r){const k=(2*r-d)/2/d;a.x-=dx*k;a.y-=dy*k;b.x+=dx*k;b.y+=dy*k}}}
 function settle(){const s=state();if(s==='solid')ps.forEach(p=>{p.x=p.hx;p.y=p.hy});else{for(let i=0;i<120;i++)stepSim(1/30)}}
 function paint(){g.clearRect(0,0,W,H);const dk=document.documentElement.dataset.theme==='2052';g.fillStyle=dk?'#0b1224':'#f8fafc';g.fillRect(0,0,W,H);g.strokeStyle=dk?'#38bdf8':'#94a3b8';g.strokeRect(.5,.5,W-1,H-1);
  ps.forEach(p=>{g.beginPath();g.arc(p.x,p.y,r-1,0,7);g.fillStyle=p.b?'#f59e0b':T<mp?'#2563eb':T<bp?'#0891b2':'#7c3aed';g.fill();g.strokeStyle=dk?'#e2e8f0':'#1e293b';g.lineWidth=.8;g.stroke()});
  g.fillStyle=dk?'#f8fafc':'#111';g.font='600 14px system-ui,sans-serif';g.fillText(`${nf(T)} °C: ${state()}`,10,20)}
 function say(){const s=state(),d={solid:'particles are packed in a fixed pattern and only vibrate',liquid:'particles touch but slide past each other',gas:'particles are far apart and move fast in all directions'}[s];
  let t=`At ${nf(T)} °C, ${name} is a ${s}: ${d}. It melts at ${nf(mp)} °C and boils at ${nf(bp)} °C. Hotter particles move faster; they do not get bigger.`;
  if(o.mix)t+=' The orange particles are a second substance mixed in: this is a mixture, not a pure substance.';
  if(o.density){const top=Math.min(...ps.map(p=>p.y)),frac=Math.round((H-top)/H*100);t+=` Same ${N} particles, so the same mass, now spread over about ${s==='gas'?100:frac}% of the box: the more space, the lower the density.`}
  c.say(t);cv.setAttribute('aria-label',t)}
 let last=0,raf=0;function loop(now){raf=0;if(!run||!vis||document.hidden)return;const dt=Math.min(.05,(now-(last||now))/1000);last=now;stepSim(dt);paint();raf=requestAnimationFrame(loop)}
 const kick=()=>{if(!raf&&run&&vis){last=0;raf=requestAnimationFrame(loop)}};
 const io=window.IntersectionObserver?new IntersectionObserver(es=>{vis=es[0].isIntersecting;kick()}):null;io&&io.observe(cv);
 const th=()=>paint();document.addEventListener('wntheme',th);c.stops.push(()=>{document.removeEventListener('wntheme',th);run=false;io&&io.disconnect();raf&&cancelAnimationFrame(raf)});
 const set=v=>{T=v;rg.value=v;if(!run){settle();paint()}say();kick()};
 const rg=c.range('Temperature (°C)',o.min??mp-40,o.max??bp+60,1,T,set);
 c.btn('Cool below melting',()=>set(mp-20));c.btn('Heat above boiling',()=>set(bp+30));
 const pb=c.btn(run?'Pause motion':'Play motion',()=>{run=!run;pb.textContent=run?'Pause motion':'Play motion';kick()},'ghost');
 c.cueEl=cv;settle();paint();say();kick()});
/* atom builder */
R('atom',c=>{const o=c.opts;let p=o.p??6,n=o.n??6,e=o.e??6;const s=c.svg(440,250,'Atom builder');const g=c.el('g',{},s),info=c.el('g',{},s);
 function draw(){g.textContent='';info.textContent='';const cx=130,cy=125,cap=[2,8,8,2];
  [44,72,100].forEach(rr=>c.el('circle',{cx,cy,r:rr,class:'vis-shell'},g));
  const nuc=c.el('g',{class:'vis-nuc'},g);const kinds=[];for(let i=0;i<Math.max(p,n);i++){if(i<p)kinds.push('vis-p');if(i<n)kinds.push('vis-n')}
  kinds.forEach((k,i)=>{const a=i*2.4,rr=3.2*Math.sqrt(i);c.el('circle',{cx:cx+rr*Math.cos(a),cy:cy+rr*Math.sin(a),r:5,class:k},nuc)});
  let left=e;[44,72,100,118].forEach((rr,k)=>{const m=Math.min(left,cap[k]);left-=m;for(let j=0;j<m;j++){const a=j/m*2*Math.PI-Math.PI/2;c.el('circle',{cx:cx+rr*Math.cos(a),cy:cy+rr*Math.sin(a),r:5,class:'vis-e'},g)}});
  c.cueEl=nuc;const el=EL[p-1],ch=p-e,A=p+n;
  const lines=el?[`${el.name} (${el.sym})`,`Atomic number ${p} (protons)`,`Mass number ${A} (protons + neutrons)`,ch?`Charge ${ch>0?'+':'−'}${Math.abs(ch)}: an ion`:'Neutral atom']:[p?'Element beyond this builder':'No protons: not an element'];
  lines.forEach((t,i)=>c.el('text',{x:270,y:70+i*26,class:i?'vis-lab b':'vis-big'},info,t));
  c.say((el?`${p} protons makes this ${el.name.toLowerCase()} (${el.sym}). `:'')+`${p} protons, ${n} neutrons, ${e} electrons. Mass number ${A}. `+(ch?`It has ${Math.abs(ch)} ${ch>0?'fewer':'more'} electron${Math.abs(ch)>1?'s':''} than protons, so it is an ion with charge ${ch>0?'+':'−'}${Math.abs(ch)}.`:'Protons and electrons are equal, so it is neutral.')+' Change the protons and the element changes; change the neutrons and only the mass changes.')}
 const lim=v=>Math.max(0,Math.min(20,v));[['proton',()=>p,v=>p=v],['neutron',()=>n,v=>n=v],['electron',()=>e,v=>e=v]].forEach(([w,gt,st])=>{c.btn(`+ ${w}`,()=>{st(lim(gt()+1));draw()});c.btn(`− ${w}`,()=>{st(lim(gt()-1));draw()},'ghost')});draw()});
/* periodic table, elements 1–36 */
R('ptable',c=>{const o=c.opts;let hl=o.highlight||'',pick=o.z||0;const box=c.el('div',{class:'vis-pt',role:'group','aria-label':'Periodic table, elements 1 to 36'},c.stage);
 const F={metals:e=>e.kind==='metal','non-metals':e=>e.kind==='non-metal',group1:e=>e.group===1&&e.z>1,group7:e=>e.group===17,group0:e=>e.group===18,period2:e=>e.period===2,period3:e=>e.period===3};
 const LAB={metals:'Metals','non-metals':'Non-metals',group1:'Group 1 (alkali metals)',group7:'Group 7 (halogens)',group0:'Group 0 (noble gases)',period2:'Period 2',period3:'Period 3'};
 EL.forEach(e=>{const b=c.el('button',{type:'button',class:`vis-el k-${e.kind}`,style:`grid-row:${e.period};grid-column:${e.group}`,'aria-label':`${e.name}, ${e.z}`},box);b.innerHTML=`<small>${e.z}</small>${e.sym}`;b.onclick=()=>{pick=e.z;draw()};e.b=b});
 function draw(){EL.forEach(e=>{e.b.classList.toggle('vis-hl',!!hl&&F[hl](e));e.b.setAttribute('aria-pressed',e.z===pick)});
  const e=EL[pick-1];let t=hl?`${LAB[hl]}: ${EL.filter(F[hl]).map(x=>x.sym).join(', ')}. `:'';
  if(e)t+=`${e.name} (${e.sym}): atomic number ${e.z}, so ${e.z} protons. Period ${e.period}, ${e.group===18?'group 0 (also called 18)':e.group<=2?`group ${e.group}`:e.group>=13?`group ${e.group-10} (also called ${e.group})`:'a transition metal'}. A ${e.kind}.`;
  else t+='Columns are groups, rows are periods. Choose an element or a highlight.';c.say(t);c.cueEl=hl?EL.filter(F[hl]).map(x=>x.b):box}
 Object.keys(LAB).forEach(k=>c.btn(LAB[k],()=>{hl=hl===k?'':k;draw()}));c.btn('Clear',()=>{hl='';pick=0;draw()},'ghost');draw()});
/* equation balancer */
const SUB={'₀':0,'₁':1,'₂':2,'₃':3,'₄':4,'₅':5,'₆':6,'₇':7,'₈':8,'₉':9};
function parse(f){f=f.replace(/[₀-₉]/g,d=>SUB[d]);let i=0;function grp(){const m={};while(i<f.length&&f[i]!==')'){let sub;if(f[i]==='('){i++;sub=grp();i++}else{const s=f.slice(i).match(/^[A-Z][a-z]?/);if(!s)throw new Error('bad formula '+f);i+=s[0].length;sub={[s[0]]:1}}
  const d=f.slice(i).match(/^\d+/);const k=d?+d[0]:1;if(d)i+=d[0].length;for(const x in sub)m[x]=(m[x]||0)+sub[x]*k}return m}return grp()}
const pretty=f=>f.replace(/(\d)/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
R('balancer',c=>{const o=c.opts,sides=[o.left||[['H2',1],['O2',1]],o.right||[['H2O',1]]].map(sd=>sd.map(([f,k])=>({f,k,at:parse(f)})));
 const box=c.el('div',{class:'vis-eq'},c.stage),tbl=c.el('div',{class:'vis-tally'},c.stage),s=c.svg(440,120,'Balance of atoms');
 c.el('path',{d:'M220 40L200 105H240Z',class:'vis-stand'},s);const beam=c.el('g',{},s);c.el('rect',{x:80,y:36,width:280,height:7,rx:3,class:'vis-beam'},beam);
 const pans=[0,1].map(()=>{const p=c.el('g',{},s);c.el('path',{d:'M-46 30H46L36 40H-36Z',class:'vis-pancup'},p);c.el('line',{x1:0,y1:0,x2:-36,y2:30,class:'vis-rope'},p);c.el('line',{x1:0,y1:0,x2:36,y2:30,class:'vis-rope'},p);return p});let ang=0;
 const tally=sd=>{const m={};sd.forEach(sp=>{for(const x in sp.at)m[x]=(m[x]||0)+sp.at[x]*sp.k});return m};
 const mass=sd=>sd.reduce((t,sp)=>t+sp.k*Object.entries(sp.at).reduce((u,[x,n])=>u+(MASS[x]||0)*n,0),0);
 function mol(sp){let h='';const atoms=[];for(const x in sp.at)for(let i=0;i<sp.at[x];i++)atoms.push(x);
  for(let q=0;q<Math.min(sp.k,6);q++)h+=`<span class="vis-mol">${atoms.map(x=>`<i style="background:${COLR[x]||'#ddd'}" title="${x}">${x}</i>`).join('')}</span>`;return h+(sp.k>6?`<span>+${sp.k-6}</span>`:'')}
 function draw(){box.innerHTML=sides.map((sd,si)=>sd.map((sp,j)=>`<div class="vis-sp">${o.lock?'':`<button type="button" class="lbtn sm" data-s="${si}" data-j="${j}" data-d="1" aria-label="More ${sp.f}">+</button>`}<div class="vis-f"><b class="vis-k">${sp.k>1?sp.k:''}</b>${pretty(sp.f)}${o.names&&o.names[sp.f]?`<small>${esc(o.names[sp.f])}</small>`:''}${o.masses?`<small>${nf(sp.k*mass([{k:1,at:sp.at}]))} g</small>`:''}</div><div class="vis-mols" aria-hidden="true">${mol(sp)}</div>${o.lock?'':`<button type="button" class="lbtn sm ghost" data-s="${si}" data-j="${j}" data-d="-1" aria-label="Fewer ${sp.f}">−</button>`}</div>`).join('<span class="vis-op">+</span>')).join('<span class="vis-op">→</span>');
  const L=tally(sides[0]),Rr=tally(sides[1]),els=[...new Set([...Object.keys(L),...Object.keys(Rr)])],ok=els.every(x=>L[x]===Rr[x]);
  tbl.innerHTML=`<table><caption class="sr">Atoms on each side</caption><tr><th scope="col">Element</th><th scope="col">Left</th><th scope="col">Right</th><th scope="col"><span class="sr">Same?</span></th></tr>${els.map(x=>`<tr class="${L[x]===Rr[x]?'':'vis-bad'}"><th scope="row">${x}</th><td>${L[x]||0}</td><td>${Rr[x]||0}</td><td>${L[x]===Rr[x]?'✓':'✗'}</td></tr>`).join('')}</table>`;
  const ml=mass(sides[0]),mr=mass(sides[1]),to=ok?0:Math.max(-12,Math.min(12,(mr-ml)/4||(ml>mr?-6:6))),from=ang;ang=to;
  c.tween(600,t=>{const a=from+(to-from)*t,rr=a*Math.PI/180;beam.setAttribute('transform',`rotate(${a} 220 40)`);[[-130,0],[130,1]].forEach(([dx,i])=>pans[i].setAttribute('transform',`translate(${220+dx*Math.cos(rr)},${40+dx*Math.sin(rr)})`))});s.classList.toggle('vis-ok',ok);
  const eqs=sd=>sd.map(sp=>(sp.k>1?sp.k:'')+sp.f).join(' + ');
  let t=`${eqs(sides[0])} → ${eqs(sides[1])}. `+els.map(x=>`${x}: ${L[x]||0} left, ${Rr[x]||0} right`).join('; ')+'. ';
  t+=ok?'Balanced: every element has the same number of atoms on both sides, so no atoms are made or lost.':`Not balanced yet: ${els.filter(x=>L[x]!==Rr[x]).join(' and ')} ${els.filter(x=>L[x]!==Rr[x]).length>1?'differ':'differs'}. Change only the big numbers in front.`;
  if(o.masses)t+=` Total mass: ${nf(ml)} g before, ${nf(mr)} g after.`;c.say(t);c.cueEl=[...tbl.querySelectorAll('.vis-bad')].length?[...tbl.querySelectorAll('.vis-bad')]:[tbl]}
 box.onclick=e=>{const b=e.target.closest('button[data-d]');if(!b)return;const sp=sides[+b.dataset.s][+b.dataset.j];sp.k=Math.max(1,Math.min(9,sp.k+ +b.dataset.d));const key=b.getAttribute('aria-label');draw();const nb=box.querySelector(`[aria-label="${key}"]`);nb&&nb.focus()};
 if(!o.lock)c.btn('Reset to all 1s',()=>{sides.flat().forEach(sp=>sp.k=1);draw()},'ghost');draw()});
VIS.parseFormula=parse;
})();
/* Why Next? visuals for science sorting and reactions: a card sorter (drag or tap a card, then a box), a pH scale with
   universal-indicator colours, and an energy profile for exothermic and endothermic reactions. */
(()=>{const nf=VIS.nf;
VIS.reg('sorter',c=>{const o=c.opts,bins=o.bins,items=o.items.map(([t,k],i)=>({t,k,i,at:-1}));let picked=null,checked=false;
 const wrap=c.el('div',{class:'vis-sort',style:`grid-template-columns:repeat(${bins.length},minmax(0,1fr))`},c.stage),tray=c.el('div',{class:'vis-tray',role:'group','aria-label':'Cards to sort'},wrap);
 const boxes=bins.map((b,j)=>{const d=c.el('div',{class:'vis-bin',role:'group','aria-label':b},wrap);c.el('div',{class:'vis-binh'},d,b);
  const put=c.el('button',{type:'button',class:'lbtn sm ghost vis-put','aria-label':'Put the chosen card in '+b},d,'Put here');put.onclick=()=>place(j);d.dataset.j=j;return d});
 const cards=items.map(it=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':'false'},tray,it.t);b.onclick=()=>{if(b.dataset.dragged){delete b.dataset.dragged;return}pick(it)};drag(b,it);return b});
 function pick(it){picked=picked===it?null:it;cards.forEach((b,i)=>b.setAttribute('aria-pressed',picked&&picked.i===i));draw()}
 function place(j,it=picked){if(!it)return;it.at=j;picked=null;checked=false;cards.forEach(b=>b.setAttribute('aria-pressed','false'));draw()}
 function drag(b,it){let sx,sy,on=false;b.style.touchAction='none';
  b.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;on=false;b.setPointerCapture(e.pointerId)});
  b.addEventListener('pointermove',e=>{if(!b.hasPointerCapture(e.pointerId))return;const dx=e.clientX-sx,dy=e.clientY-sy;if(!on&&Math.hypot(dx,dy)>6){on=true;b.classList.add('vis-grab')}if(on)b.style.transform=`translate(${dx}px,${dy}px)`});
  b.addEventListener('pointerup',e=>{if(!b.hasPointerCapture(e.pointerId))return;b.releasePointerCapture(e.pointerId);b.style.transform='';b.classList.remove('vis-grab');
   if(on){b.dataset.dragged=1;b.style.visibility='hidden';const t=document.elementFromPoint(e.clientX,e.clientY);b.style.visibility='';const d=t&&t.closest('.vis-bin,.vis-tray');
    if(d&&d.classList.contains('vis-bin'))place(+d.dataset.j,it);else if(d){it.at=-1;draw()}}})}
 function draw(){items.forEach((it,i)=>{const b=cards[i];(it.at<0?tray:boxes[it.at]).insertBefore(b,it.at<0?null:boxes[it.at].querySelector('.vis-put'));
   b.classList.toggle('ok',checked&&it.at===it.k);b.classList.toggle('bad',checked&&it.at>=0&&it.at!==it.k);b.setAttribute('aria-label',it.t+(checked&&it.at>=0?(it.at===it.k?', correct':', not this box'):''))});
  const n=items.filter(i=>i.at>=0).length,ok=items.filter(i=>i.at===i.k).length;
  c.say(checked?`${ok} of ${items.length} in the right box.${ok===items.length?' All sorted!':' '+items.filter(i=>i.at!==i.k).map(i=>`“${i.t}” belongs in ${bins[i.k]}`).slice(0,2).join('; ')+'.'}`
   :`${n} of ${items.length} cards sorted.${picked?` Chosen: “${picked.t}”. Now press “Put here” under a box.`:' Choose a card (tap or drag it), then a box.'}`)}
 c.btn('Check',()=>{checked=true;draw()});c.btn('Start again',()=>{items.forEach(i=>i.at=-1);checked=false;picked=null;draw()},'ghost');c.cueEl=[wrap];draw()});
const UI=['#ee1c25','#f05a28','#f78d2b','#fbb931','#fdea0e','#d0df2f','#7cc242','#21b14b','#1c9a4a','#0b8f6c','#2fb7c5','#3c7fc1','#4153a2','#5c3c93','#462c83'];
const EX=['battery acid','stomach acid','lemon juice','vinegar','orange juice','black coffee','milk','pure water','sea water','baking soda','indigestion tablets','soapy water','ammonia cleaner','bleach','oven cleaner'];
VIS.reg('phscale',c=>{const o=c.opts;let ph=o.ph??7;const W=440,H=150,s=c.svg(W,H,'pH scale with universal indicator colours'),cw=(W-20)/15;
 UI.forEach((col,i)=>{c.el('rect',{x:10+i*cw,y:20,width:cw,height:30,fill:col},s);c.el('text',{x:10+(i+.5)*cw,y:66,'text-anchor':'middle',class:'vis-lab'},s,i)});
 c.el('text',{x:10,y:14,class:'vis-lab b'},s,'acid');c.el('text',{x:W/2,y:14,'text-anchor':'middle',class:'vis-lab b'},s,'neutral');c.el('text',{x:W-10,y:14,'text-anchor':'end',class:'vis-lab b'},s,'alkali');
 const ptr=c.el('polygon',{class:'vis-handle'},s),bk=c.el('path',{d:'M170 80 L170 140 Q170 146 176 146 L264 146 Q270 146 270 140 L270 80',class:'vis-beaker'},s),liq=c.el('rect',{x:172,y:98,width:96,height:46,class:'vis-liq'},s);
 const draw=()=>{const x=10+(ph+.5)*cw;ptr.setAttribute('points',`${x-9},88 ${x+9},88 ${x},72`);liq.setAttribute('fill',UI[ph]);
  const kind=ph<7?(ph<3?'strongly acidic':'acidic'):ph>7?(ph>11?'strongly alkaline':'alkaline'):'neutral';
  c.say(`pH ${ph}: ${kind}. Universal indicator turns ${['red','red','orange-red','orange','yellow','yellow-green','green-yellow','green','green','blue-green','blue-green','blue','blue','violet','purple'][ph]}. Example: ${EX[ph]}.${ph===7?' An acid and an alkali that cancel out make a neutral salt solution and water.':''}`);sync()};
 const sync=c.kslider(ptr,'pH',()=>ph,v=>{ph=v;draw()},0,14,1,v=>`pH ${v}`);c.drag(ptr,s,X=>{ph=Math.max(0,Math.min(14,Math.floor((X-10)/cw)));draw()});
 c.btn('Add acid',()=>{ph=Math.max(0,ph-1);draw()});c.btn('Add alkali',()=>{ph=Math.min(14,ph+1);draw()});c.cueEl=[ptr,liq];draw()});
VIS.reg('energy',c=>{const o=c.opts;let dh=o.dh??-40;const W=440,H=260,s=c.svg(W,H,'Reaction energy profile'),y0=150,k=1.4,act=o.ea??50;
 c.el('line',{x1:40,y1:20,x2:40,y2:H-20,class:'vis-axis'},s);c.el('line',{x1:40,y1:H-20,x2:W-90,y2:H-20,class:'vis-axis'},s);
 c.el('text',{x:16,y:140,class:'vis-lab',transform:'rotate(-90 16 140)','text-anchor':'middle'},s,'energy');c.el('text',{x:200,y:H-4,'text-anchor':'middle',class:'vis-lab'},s,'progress of reaction');
 c.el('line',{x1:120,x2:346,y1:y0,y2:y0,class:'vis-guide'},s);const path=c.el('path',{class:'vis-curve'},s),arr=c.el('line',{class:'vis-rise',x1:342,x2:342},s),lab=c.el('text',{x:347,class:'vis-lab b'},s),h=c.el('rect',{x:250,width:80,height:12,rx:4,class:'vis-handle'},s);
 c.el('text',{x:58,y:y0-8,class:'vis-lab'},s,o.reactants||'reactants');const pl=c.el('text',{x:258,class:'vis-lab'},s);
 const th=c.el('rect',{x:W-30,y:30,width:14,height:180,rx:7,class:'vis-thermo'},s),tl=c.el('rect',{x:W-27,width:8,class:'vis-liqr'},s);c.el('circle',{cx:W-23,cy:216,r:12,class:'vis-bulb'},s);
 const draw=()=>{const yp=y0-dh*k,top=Math.min(y0,yp)-act*k;path.setAttribute('d',`M50 ${y0} L120 ${y0} C170 ${y0} 170 ${top} 200 ${top} S230 ${yp} 260 ${yp} L330 ${yp}`);
  h.setAttribute('y',yp-6);arr.setAttribute('y1',y0);arr.setAttribute('y2',yp);lab.setAttribute('y',(y0+yp)/2+4);lab.textContent=`${dh<0?'−':'+'}${Math.abs(dh)} kJ`;pl.setAttribute('y',yp-10);pl.textContent=o.products||'products';
  const lv=120+dh*-1.1;tl.setAttribute('y',lv);tl.setAttribute('height',212-lv);
  c.say(dh<0?`Exothermic: the products have ${-dh} kJ less energy than the reactants. That energy goes out to the surroundings, so the temperature rises (the thermometer goes up). Examples: burning, neutralisation, hand warmers.`
   :dh>0?`Endothermic: the products have ${dh} kJ more energy than the reactants. Energy is taken in from the surroundings, so the temperature falls (the thermometer goes down). Examples: thermal decomposition, sherbet fizzing, sports cold packs.`
   :'The products have the same energy as the reactants, so the temperature would not change.');sync()};
 const sync=c.kslider(h,'Products energy level',()=>dh,v=>{dh=v;draw()},-80,80,10,v=>`${v} kJ`);c.drag(h,s,(X,Y)=>{dh=Math.max(-80,Math.min(80,Math.round((y0-Y)/k/10)*10));draw()});
 c.btn('Exothermic example',()=>{dh=-60;draw()});c.btn('Endothermic example',()=>{dh=40;draw()});c.cueEl=[arr,tl];draw()});
})();
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
/* Why Next? model visuals: symbols that act on counters (+, −, =), a sealed flask on a scale where atoms rearrange
   but the mass stays the same, a circuit tester and a torch-and-screen light test for materials, the vertical-line
   test for functions, a polynomial term builder, algebra tiles that combine like terms, and draggable vectors
   compared with scalars. */
(()=>{const nf=VIS.nf,sup=n=>String(n).split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]||d).join(''),W=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];
const press=(bs,k)=>{for(const j in bs)bs[j].setAttribute('aria-pressed',j===k)};
/* ---------- + − = acting on counters ---------- */
VIS.reg('symbols',c=>{const o=c.opts;let a=o.a??7,b=o.b??2,op=o.op||'-';const s=c.svg(440,190,'Number sentence with counters'),g=c.el('g',{},s),bs={};
 const draw=()=>{g.innerHTML='';const r=op==='+'?a+b:a-b,n=Math.max(a+(op==='+'?b:0),1),gap=Math.min(34,380/Math.max(n,10));
  for(let i=0;i<a;i++){const gone=op==='-'&&i>=a-b;c.el('circle',{cx:30+i*gap,cy:40,r:12,class:gone?'vis-cell':'vis-part on',opacity:gone?.5:1},g);if(gone)c.el('line',{x1:20+i*gap,y1:30,x2:40+i*gap,y2:50,class:'vis-x'},g)}
  if(op==='+')for(let i=0;i<b;i++)c.el('circle',{cx:30+(a+i)*gap,cy:40,r:12,class:'vis-part on b'},g);
  c.el('text',{x:20,y:96,class:'vis-big'},g,`${a} ${op==='+'?'+':'−'} ${b} = ${r}`);
  for(let i=0;i<r;i++)c.el('circle',{cx:30+i*gap,cy:140,r:12,class:'vis-part on'},g);c.el('text',{x:20,y:180,class:'vis-lab b'},g,`= means both sides are the same: ${r} and ${r}`);
  press(bs,op);c.say(`${a} ${op==='+'?'+':'−'} ${b} = ${r} reads “${W[a]} ${op==='+'?'add':'take away'} ${W[b]} is the same as ${W[r]}”. ${op==='+'?`+ puts ${b} more counters with the ${a}.`:`− takes ${b} counters away from the ${a}.`} = shows the answer row has the same number: ${r}.`)};
 bs['+']=c.btn('+ add',()=>{op='+';if(a+b>20)b=20-a;draw()},'ghost');bs['-']=c.btn('− take away',()=>{op='-';if(b>a)b=a;draw()},'ghost');
 c.range('First number',0,10,1,a,v=>{a=v;if(op==='-'&&b>a)b=a;draw()});c.range('Second number',0,10,1,b,v=>{b=op==='-'?Math.min(v,a):v;draw()});c.cueEl=[g];draw()});
/* ---------- sealed flask on a scale ---------- */
const AM={H:1,C:12,N:14,O:16,Na:23,Mg:24,Al:27,S:32,Cl:35.5,K:39,Ca:40,Fe:56,Cu:63.5,Zn:65};
const AC={H:'#f8fafc',C:'#334155',N:'#60a5fa',O:'#ef4444',Na:'#a78bfa',Mg:'#d4d4d8',S:'#facc15',Cl:'#4ade80',Ca:'#fb923c',Fe:'#b45309',Cu:'#ea580c',Zn:'#94a3b8',K:'#c084fc',Al:'#cbd5e1'};
function parse(f){let i=0;const grp=()=>{const m={};while(i<f.length&&f[i]!==')'){let sub;if(f[i]==='('){i++;sub=grp();i++}else{const t=f.slice(i).match(/^[A-Z][a-z]?/);i+=t[0].length;sub={[t[0]]:1}}
  const d=f.slice(i).match(/^\d+/);const k=d?+d[0]:1;if(d)i+=d[0].length;for(const x in sub)m[x]=(m[x]||0)+sub[x]*k}return m};return grp()}
const sub=f=>f.replace(/\d/g,d=>'₀₁₂₃₄₅₆₇₈₉'[d]);
VIS.reg('sealed',c=>{const o=c.opts,L=o.left,R=o.right,gas=o.gas||[],names=o.names||{};let after=false,open=false;
 const s=c.svg(440,300,'Sealed flask on a balance'),fl=c.el('g',{},s),at=c.el('g',{},s),sc=c.el('g',{},s),tab=c.el('div',{class:'vis-tally'},c.stage);
 c.el('path',{d:'M170 30 h100 v14 h-8 v40 l70 120 a14 14 0 0 1 -12 22 h-200 a14 14 0 0 1 -12 -22 l70 -120 v-40 h-8z',class:'vis-beaker'},fl);const lid=c.el('rect',{x:166,y:22,width:108,height:10,rx:3,class:'vis-pancup'},fl);
 c.el('rect',{x:100,y:236,width:240,height:16,rx:4,class:'vis-beam'},sc);c.el('rect',{x:150,y:252,width:140,height:40,rx:6,class:'vis-cell'},sc);const rd=c.el('text',{x:220,y:278,'text-anchor':'middle',class:'vis-big'},sc),rm=c.el('p',{class:'vis-mult'},c.stage);
 const mol=side=>{const out=[];side.forEach(([f,k])=>{for(let j=0;j<k;j++)out.push({f,atoms:Object.entries(parse(f)).flatMap(([e,n])=>Array(n).fill(e))})});return out};
 const ml=mol(L),mr=mol(R),slots=ms=>{const P=[];ms.forEach((m,mi)=>{const r=Math.floor(mi/3),cols=Math.min(3,ms.length-3*r),cx=220+((mi%3)-(cols-1)/2)*(80-r*25),cy=190-r*48;m.atoms.forEach((e,ai)=>P.push({e,x:cx+(ai-(m.atoms.length-1)/2)*22,y:cy,f:m.f,mi}))});return P};
 const A=slots(ml),B=slots(mr),used=new Set(),map=A.map(p=>{const j=B.findIndex((q,k)=>!used.has(k)&&q.e===p.e);used.add(j);return j});
 const dots=A.map(p=>{const g=c.el('g',{},at);c.el('circle',{r:11,fill:AC[p.e]||'#a3a3a3',stroke:'#0f172a','stroke-width':1},g);c.el('text',{y:4,'text-anchor':'middle','font-size':10,'font-weight':700,fill:'#0f172a'},g,p.e);return g});
 const mass=ms=>ms.filter(m=>!(open&&gas.includes(m.f))).reduce((t,m)=>t+m.atoms.reduce((u,e)=>u+(AM[e]||1),0),0);
 const tally=ms=>{const t={};ms.forEach(m=>m.atoms.forEach(e=>t[e]=(t[e]||0)+1));return t};
 const word=side=>side.map(([f,k])=>(k>1?k+' ':'')+(names[f]?`${names[f]} (${sub(f)})`:sub(f))).join(' + ');
 const place=(t)=>dots.forEach((d,i)=>{const p=A[i],q=B[map[i]];const x=p.x+(q.x-p.x)*t,y=p.y+(q.y-p.y)*t;let dy=0;if(open&&gas.includes(t<.5?p.f:q.f))dy=-150;d.setAttribute('transform',`translate(${x},${y+dy})`);d.setAttribute('opacity',dy?.35:1)});
 const draw=(anim)=>{const from=after?0:1,to=after?1:0;if(anim)c.tween(700,t=>place(from+(to-from)*t));else place(after?1:0);
  lid.setAttribute('opacity',open?0:1);const m0=mass(ml),m1=mass(mr),m=after?m1:m0;rd.textContent=`${nf(m)} g`;
  const t0=tally(ml),t1=tally(mr),els=[...new Set([...Object.keys(t0),...Object.keys(t1)])];rm.textContent=`Masses use relative atomic masses in grams (${els.map(e=>`${e} ${AM[e]} g`).join(', ')})`;
  tab.innerHTML=`<table><caption class="sr">Atoms before and after</caption><tr><th scope="col">Atom</th><th scope="col">Before</th><th scope="col">After</th></tr>${els.map(e=>`<tr><th scope="row">${e}</th><td>${t0[e]||0}</td><td>${t1[e]||0}</td></tr>`).join('')}</table>`;
  bR.textContent=after?'Undo the reaction':'React';bO.textContent=open?'Seal the flask':'Open the flask';bO.setAttribute('aria-pressed',open);
  c.say(`${after?'After':'Before'}: ${word(after?R:L)}. ${open?'The flask is open':'The flask is sealed'}; the scale reads ${nf(m)} g. ${!open?`Before ${nf(m0)} g, after ${nf(m1)} g: the same atoms (${els.map(e=>`${t0[e]} ${e}`).join(', ')}) just join up differently, so the mass does not change. (Each atom here uses its relative atomic mass in grams.)`:gas.length?`A gas (${gas.map(sub).join(', ')}) can now get ${mass(ml)>mass(mr)?'out':'in'}, so the scale reads ${nf(m0)} g before and ${nf(m1)} g after. Mass is still conserved; some of it is just in the air, off the scale.`:'Nothing here is a gas, so the mass stays the same.'}`)};
 const bR=c.btn('React',()=>{after=!after;draw(true)}),bO=c.btn('Open the flask',()=>{open=!open;draw()},'ghost');c.cueEl=[at,rd];draw()});
/* ---------- circuit tester ---------- */
VIS.reg('circuit',c=>{const o=c.opts,I=o.items;let k=-1;const seen={};const s=c.svg(440,200,'Circuit tester'),g=c.el('g',{},s),tray=c.el('div',{class:'vis-tray'},c.stage),res=c.el('p',{class:'vis-mult'},c.stage);
 c.el('path',{d:'M60 150 V50 H190 M250 50 H380 V150 H260 M180 150 H60',class:'vis-axis',fill:'none','stroke-width':3},g);c.el('rect',{x:40,y:85,width:40,height:30,class:'vis-cell'},g);c.el('text',{x:60,y:105,'text-anchor':'middle',class:'vis-lab b'},g,'+ −');
 const glow=c.el('circle',{cx:220,cy:50,r:30,fill:'#fde047',opacity:0},g);const bulb=c.el('circle',{cx:220,cy:50,r:16,class:'vis-cell'},g);c.el('text',{x:220,y:22,'text-anchor':'middle',class:'vis-lab'},g,'bulb');
 const gapL=c.el('text',{x:220,y:190,'text-anchor':'middle',class:'vis-lab b'},g,'Put a material in the gap');const mat=c.el('rect',{x:180,y:140,width:80,height:20,rx:4,class:'vis-pancup',opacity:0},g);
 const bs=I.map(([n],i)=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':'false'},tray,n);b.onclick=()=>{k=i;seen[i]=1;draw()};return b});
 const draw=()=>{bs.forEach((b,i)=>{b.setAttribute('aria-pressed',i===k);b.classList.toggle('ok',!!seen[i]&&!!I[i][1]&&i!==k)});const on=k>=0&&!!I[k][1];glow.setAttribute('opacity',on?.55:0);bulb.setAttribute('fill',on?'#fde047':'');bulb.style.fill=on?'#fde047':'';mat.setAttribute('opacity',k>=0?1:0);gapL.textContent=k>=0?I[k][0]:'Put a material in the gap';
  const done=Object.keys(seen).length;res.textContent=`Tested ${done} of ${I.length}. Conductors: ${I.filter((x,i)=>seen[i]&&x[1]).map(x=>x[0]).join(', ')||'none yet'}. Insulators: ${I.filter((x,i)=>seen[i]&&!x[1]).map(x=>x[0]).join(', ')||'none yet'}.`;
  c.say(k<0?'Choose a material to put in the gap in the circuit.':`${I[k][0]} is in the gap. ${on?'The bulb lights: electricity flows through it, so it is a conductor.':'The bulb stays off: electricity cannot flow through it, so it is an insulator.'}${done===I.length?' You have tested them all: the metals and graphite conduct.':''}`)};c.cueEl=[tray];draw()});
/* ---------- torch, material and screen ---------- */
VIS.reg('light',c=>{const o=c.opts,I=o.items,lv=[1,.4,0],nm=['transparent','translucent','opaque'];let k=-1;const seen={};const s=c.svg(440,180,'Torch shining through a material onto a screen'),g=c.el('g',{},s),tray=c.el('div',{class:'vis-tray'},c.stage),res=c.el('p',{class:'vis-mult'},c.stage);
 c.el('rect',{x:20,y:70,width:50,height:40,rx:6,class:'vis-cell'},g);c.el('text',{x:45,y:126,'text-anchor':'middle',class:'vis-lab'},g,'torch');const beam1=c.el('polygon',{points:'70,75 200,50 200,130 70,105',fill:'#fde047',opacity:.45},g);
 const beam2=c.el('polygon',{points:'214,50 380,30 380,150 214,130',fill:'#fde047'},g);const sheet=c.el('rect',{x:200,y:40,width:14,height:100,class:'vis-pancup'},g);
 c.el('rect',{x:380,y:20,width:16,height:140,class:'vis-cell'},g);c.el('text',{x:388,y:174,'text-anchor':'middle',class:'vis-lab'},g,'screen');const star=c.el('text',{x:388,y:98,'text-anchor':'middle','font-size':22,class:'vis-lab'},g,'');
 const meter=c.el('text',{x:290,y:20,'text-anchor':'middle',class:'vis-lab b'},g,'');
 const bs=I.map(([n],i)=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':'false'},tray,n);b.onclick=()=>{k=i;seen[i]=1;draw()};return b});
 const draw=()=>{bs.forEach((b,i)=>b.setAttribute('aria-pressed',i===k));const L=k<0?1:lv[I[k][1]];beam2.setAttribute('opacity',(L*.55).toFixed(2));sheet.setAttribute('opacity',k<0?0:I[k][1]===0?.3:I[k][1]===1?.7:1);
  meter.textContent=`light meter: ${Math.round(L*100)}% (illustrative)`;star.textContent=k<0||I[k][1]===0?'★':I[k][1]===1?'·':'';
  res.textContent=[0,1,2].map(j=>`${nm[j][0].toUpperCase()+nm[j].slice(1)}: ${I.filter((x,i)=>seen[i]&&x[1]===j).map(x=>x[0]).join(', ')||'—'}`).join('. ')+'.';
  c.say(k<0?'No material yet: all the light reaches the screen. Choose a material to hold in the beam.':`${I[k][0]}: ${Math.round(L*100)}% of the light gets through (an illustrative value; real materials vary). ${I[k][1]===0?'You can see clearly through it: transparent.':I[k][1]===1?'Some light gets through but it is scattered, so the picture is blurry: translucent.':'No light gets through, so it makes a shadow: opaque.'}`)};c.cueEl=[tray];draw()});
/* ---------- vertical line test ---------- */
const GR={line:{n:'y = x/2 + 1',b:[x=>x/2+1],f:1},parab:{n:'y = x² − 3',b:[x=>x*x-3],f:1},circle:{n:'circle x² + y² = 9',b:[x=>Math.sqrt(9-x*x),x=>-Math.sqrt(9-x*x)],f:0},side:{n:'sideways x = y²',b:[x=>Math.sqrt(x),x=>-Math.sqrt(x)],f:0},cubic:{n:'y = x³/4 − x',b:[x=>x*x*x/4-x],f:1}};
VIS.reg('vlt',c=>{const o=c.opts,keys=o.graphs||Object.keys(GR);let gk=keys[0],x=o.x??1;const K=VIS.plotKit,P=K.plot(c,{xr:[-5.5,5.5],yr:[-4,4],equal:true},'Graph for the vertical line test');
 const cur=c.el('g',{},P.lay),vl=c.el('line',{class:'vis-sec'},P.lay),dots=c.el('g',{},P.lay),h=K.handle(c,P),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s),bs={};const hits={};
 const pts=X=>GR[gk].b.map(f=>f(X)).filter(y=>isFinite(y)&&!isNaN(y)).filter((y,i,a)=>a.findIndex(z=>Math.abs(z-y)<1e-6)===i);
 const draw=()=>{cur.innerHTML='';GR[gk].b.forEach(f=>P.curve(f,'vis-curve',cur));vl.setAttribute('x1',P.sx(x));vl.setAttribute('x2',P.sx(x));vl.setAttribute('y1',P.sy(P.y0));vl.setAttribute('y2',P.sy(P.y1));
  h.setAttribute('cx',P.sx(x));h.setAttribute('cy',P.sy(P.y0)+14);dots.innerHTML='';const p=pts(x);p.forEach(y=>c.el('circle',{cx:P.sx(x),cy:P.sy(y),r:6,class:'vis-dot'},dots));hits[gk]=Math.max(hits[gk]||0,p.length);
  ro.textContent=`x = ${nf(x)}: ${p.length} point${p.length===1?'':'s'}`;press(bs,gk);sync();
  c.say(`${GR[gk].n}. The vertical line x = ${nf(x)} meets the graph ${p.length===0?'nowhere':p.length===1?'once':p.length+' times'}${p.length?' (y = '+p.map(y=>nf(y)).join(' and ')+')':''}. ${p.length>1?'One input with two outputs: this graph is NOT a function.':GR[gk].f?'Slide the line along: it never hits twice, so this graph IS a function.':'Keep sliding: somewhere it hits twice.'}`)};
 keys.forEach(k=>bs[k]=c.btn(GR[k].n,()=>{gk=k;draw()},'ghost'));
 c.drag(h,P.s,X=>{x=Math.round(P.ix(X)*4)/4;x=Math.max(-4,Math.min(4,x));draw()});const sync=c.kslider(h,'Vertical line x',()=>x,v=>{x=v;draw()},-4,4,.25,v=>`x = ${nf(v)}`);c.cueEl=[vl,h];draw()});
})();
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
/* Why Next? early-years and everyday-science models: a tilting jar for solids, liquids and gases; separating a
   mixture (sieve, filter, evaporate, magnet); a materials lab (test properties, or choose a material for a job);
   objects and the materials they are made from; and, for older learners, square/cube numbers and slopes of
   parallel and perpendicular lines. */
(()=>{const nf=VIS.nf,press=(bs,k)=>{for(const j in bs)bs[j].setAttribute('aria-pressed',j===k)};
const cards=(c,items,onpick)=>{const tray=c.el('div',{class:'vis-tray',role:'group','aria-label':'Choices'},c.stage);return items.map((n,i)=>{const b=c.el('button',{type:'button',class:'vis-card','aria-pressed':'false'},tray,n);b.onclick=()=>onpick(i);return b})};
/* ---------- states of matter in a tilting jar ---------- */
VIS.reg('states',c=>{const o=c.opts,I=o.items;let k=0,tilt=0;const s=c.svg(440,220,'Jar that can tilt'),jar=c.el('g',{},s),stuff=c.el('g',{},jar);
 c.el('rect',{x:160,y:40,width:120,height:150,rx:10,class:'vis-beaker'},jar);
 const draw=()=>{const st=I[k][1];stuff.innerHTML='';jar.setAttribute('transform',`rotate(${tilt} 220 190)`);
  if(st===0){c.el('rect',{x:185,y:120,width:60,height:60,rx:4,fill:'#a16207',transform:`rotate(${-tilt*0} 215 150)`},stuff)}
  else if(st===1){const lv=tilt?[[160,190],[280,190],[280,150-tilt*1.2],[160,150+tilt*1.2]]:[[160,190],[280,190],[280,140],[160,140]];c.el('polygon',{points:lv.map(p=>p.join(',')).join(' '),fill:'#38bdf8',opacity:.75,transform:`rotate(${-tilt} 220 190)`},stuff)}
  else for(let i=0;i<22;i++){const x=168+((i*37)%104),y=48+((i*53)%134);c.el('circle',{cx:x,cy:y,r:5,fill:'#c084fc'},stuff)}
  press(bs,String(k));const nm=['solid','liquid','gas'][st];
  c.say(`${I[k][0]} is a ${nm}. ${st===0?'It keeps its own shape, even when the jar tilts. It is hard and rigid.':st===1?'It flows and takes the shape of the bottom of the jar. Its top stays level when you tilt the jar.':'It spreads out to fill the whole jar, in every direction.'}${tilt?' The jar is tilted.':''}`)};
 const bs={};I.forEach(([n],i)=>bs[i]=c.btn(n,()=>{k=i;draw()},'ghost'));c.btn('Tilt the jar',()=>{tilt=tilt?0:-25;draw()});c.cueEl=[jar];draw()});
/* ---------- separating a mixture ---------- */
const SEP={sieve:['Sieve','big bits (like gravel) stay in the sieve; small grains and water go through'],filter:['Filter paper','solid bits that do not dissolve (like sand) stay on the paper; the solution goes through'],evaporate:['Evaporate (heat)','the water turns to vapour and goes into the air, leaving the dissolved solid (like salt) behind'],magnet:['Magnet','magnetic metals (like iron filings) jump to the magnet']};
VIS.reg('separate',c=>{const o=c.opts,M=o.mix;let left=M.map(()=>true),last='';const s=c.svg(440,170,'A mixture in a beaker'),g=c.el('g',{},s),out=c.el('p',{class:'vis-mult'},c.stage);
 const draw=()=>{g.innerHTML='';c.el('rect',{x:30,y:30,width:160,height:120,rx:8,class:'vis-beaker'},g);c.el('text',{x:110,y:166,'text-anchor':'middle',class:'vis-lab'},g,'mixture');c.el('rect',{x:250,y:30,width:160,height:120,rx:8,class:'vis-cell'},g);c.el('text',{x:330,y:166,'text-anchor':'middle',class:'vis-lab'},g,'taken out');
  let yl=60,yr=60;M.forEach(([n,how],i)=>{const inL=left[i];c.el('text',{x:inL?110:330,y:inL?yl:yr,'text-anchor':'middle',class:'vis-lab b'},g,n);if(inL)yl+=24;else yr+=24});
  out.textContent=`Still mixed: ${M.filter((m,i)=>left[i]).map(m=>m[0]).join(', ')||'nothing'}.`;
  c.say(last?`${SEP[last][0]}: ${SEP[last][1]}. ${M.some((m,i)=>m[1]===last&&!left[i])?'It took out: '+M.filter(m=>m[1]===last).map(m=>m[0]).join(', ')+'.':'Nothing here can be taken out that way.'}`:`A mixture of ${M.map(m=>m[0]).join(', ')}. Try each way of separating it.`)};
 Object.keys(SEP).forEach(k=>c.btn(SEP[k][0],()=>{last=k;M.forEach((m,i)=>{if(m[1]===k)left[i]=false});draw()},'ghost'));c.btn('Mix again',()=>{left=M.map(()=>true);last='';draw()});c.cueEl=[g];draw()});
/* ---------- materials lab: tests, or choose a material for a job ---------- */
const TEST={bend:['Bend it',['stiff','bendy']],water:['Drip water on it',['waterproof','soaks up water']],light:['Shine a torch',['you can see through it','light does not get through']],scratch:['Scratch it',['hard','soft']],shine:['Look at it',['shiny','dull']]};
VIS.reg('matlab',c=>{const o=c.opts,MT=o.materials,job=o.job;let m=0,t='';const s=c.svg(440,150,'Materials lab'),g=c.el('g',{},s),bs=cards(c,MT.map(x=>x[0]),i=>{m=i;draw()});
 const draw=()=>{g.innerHTML='';bs.forEach((b,i)=>b.setAttribute('aria-pressed',i===m));const P=MT[m][1];c.el('rect',{x:30,y:30,width:120,height:90,rx:10,fill:MT[m][2]||'#94a3b8',stroke:'#0f172a'},g);c.el('text',{x:90,y:140,'text-anchor':'middle',class:'vis-lab b'},g,MT[m][0]);
  const word=k=>TEST[k][1][P[k]?0:1];
  if(job){const ok=job[1].every(k=>P[k]);c.el('text',{x:180,y:60,class:'vis-big'},g,job[0]);c.el('text',{x:180,y:92,class:'vis-big'},g,ok?'✓ good choice':'✗ not a good choice');
   c.say(`${MT[m][0]} for ${job[0].toLowerCase()}: it is ${job[1].map(word).join(' and ')} — ${ok?'just what the job needs':'but the job needs it to be '+job[1].map(k=>TEST[k][1][0]).join(' and ')}. ${ok?'Good choice!':'Try another material.'}`)}
  else{if(t)c.el('text',{x:180,y:76,class:'vis-big'},g,`${TEST[t][0]}: ${word(t)}`);c.say(t?`${TEST[t][0]}: ${MT[m][0]} is ${word(t)}.`:`Pick a test to find out what ${MT[m][0]} is like.`)}};
 if(!job)Object.keys(TEST).forEach(k=>c.btn(TEST[k][0],()=>{t=k;draw()},'ghost'));c.cueEl=[g];draw()});
/* ---------- objects and materials ---------- */
VIS.reg('objects',c=>{const o=c.opts,OB=o.objects;let k=0,v=0;const s=c.svg(440,160,'An object and its material'),g=c.el('g',{},s),bs={};
 const draw=()=>{const [name,mats]=OB[k],[mat,col]=mats[v%mats.length];g.innerHTML='';c.el('rect',{x:40,y:40,width:150,height:80,rx:24,fill:col,stroke:'#0f172a'},g);
  c.el('text',{x:115,y:86,'text-anchor':'middle','font-size':16,'font-weight':700,fill:'#0f172a'},g,name);c.el('text',{x:220,y:70,class:'vis-big'},g,`object: ${name}`);c.el('text',{x:220,y:100,class:'vis-big'},g,`material: ${mat}`);press(bs,String(k));
  c.say(`This ${name} is made of ${mat}. The object is the thing (a ${name}); the material is what it is made of (${mat}). ${mats.length>1?`Press Change material: a ${name} can also be made of ${mats.filter((x,i)=>i!==v%mats.length).map(x=>x[0]).join(' or ')}, and it is still a ${name}.`:''}`)};
 OB.forEach(([n],i)=>bs[i]=c.btn(n,()=>{k=i;v=0;draw()},'ghost'));c.btn('Change material',()=>{v++;draw()});c.cueEl=[g];draw()});
/* ---------- square and cube numbers ---------- */
VIS.reg('squares',c=>{let n=c.opts.n??3;const s=c.svg(440,220,'Square and cube'),g=c.el('g',{},s);
 const draw=()=>{g.innerHTML='';const u=Math.min(26,150/n);for(let i=0;i<n;i++)for(let j=0;j<n;j++)c.el('rect',{x:20+j*u,y:30+i*u,width:u-2,height:u-2,rx:2,class:'vis-strip'},g);
  const q=Math.min(18,110/n),ox=270,oy=200;for(let z=0;z<n;z++)for(let y=0;y<n;y++)for(let x=n-1;x>=0;x--){const px=ox+(x-y)*q*.87,py=oy-(x+y)*q*.5-z*q;c.el('polygon',{points:`${px},${py} ${px+q*.87},${py-q*.5} ${px},${py-q} ${px-q*.87},${py-q*.5}`,class:'vis-cell'},g)}
  c.el('text',{x:20,y:20,class:'vis-big'},g,`${n}² = ${n}×${n} = ${n*n}`);c.el('text',{x:250,y:20,class:'vis-big'},g,`${n}³ = ${n}×${n}×${n} = ${n**3}`);
  c.say(`${n} squared, ${n}², is ${n} rows of ${n}: ${n*n} squares. ${n} cubed, ${n}³, is ${n} layers of ${n} by ${n}: ${n**3} little cubes.`)};
 c.range('n',1,6,1,n,v=>{n=v;draw()});c.cueEl=[g];draw()});
/* ---------- slopes of parallel and perpendicular lines ---------- */
VIS.reg('slopes',c=>{const o=c.opts,m1=o.m??2;let m2=o.start??1,b2=-2;const K=VIS.plotKit,P=K.plot(c,{xr:[-6,6],yr:[-6,6],equal:true},'Two lines');const l1=c.el('line',{class:'vis-curve'},P.lay),l2=c.el('line',{class:'vis-curve b'},P.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},P.s);
 const set=(l,m,b)=>{l.setAttribute('x1',P.sx(-7));l.setAttribute('y1',P.sy(m*-7+b));l.setAttribute('x2',P.sx(7));l.setAttribute('y2',P.sy(m*7+b))};
 const MS=[-3,-2,-1,-.5,-1/3,0,1/3,.5,1,2,3];let i=MS.indexOf(m2);if(i<0)i=8;
 const draw=()=>{m2=MS[i];set(l1,m1,1);set(l2,m2,b2);const pr=m1*m2,par=m2===m1,per=Math.abs(pr+1)<1e-9,fr=m=>Math.abs(m-Math.round(m))<1e-9?nf(m):(m<0?'−':'')+'1/'+Math.round(1/Math.abs(m));
  ro.textContent=`m₁ = ${fr(m1)}, m₂ = ${fr(m2)}: ${par?'parallel':per?'perpendicular':'neither'}`;
  c.say(`Blue line slope ${fr(m1)}, green line slope ${fr(m2)}, crossing the y-axis at ${nf(b2)}. ${par?'Equal slopes: the lines are parallel and never meet.':per?`The slopes multiply to ${fr(m1)} × ${fr(m2)} = −1: the lines are perpendicular (they meet at a right angle).`:`Slopes multiply to ${nf(pr,3)}, not −1, and are not equal: neither parallel nor perpendicular.`}`)};
 c.btn('Green slope down',()=>{i=Math.max(0,i-1);draw()},'ghost');c.btn('Green slope up',()=>{i=Math.min(MS.length-1,i+1);draw()},'ghost');c.range('Green line moves up/down',-4,4,1,b2,v=>{b2=v;draw()});c.cueEl=[l2];draw()});
})();
/* Why Next? labs (part 1): shared lab kit (sandbox / challenge modes, animated success cue, optional vibration),
   probability trials with a live histogram, a data lab with draggable values, and a zoomable number line.
   Labs follow the same rules as every visual: live text description, keyboard controls, touch dragging, reduced motion. */
(()=>{const R=VIS.reg,nf=VIS.nf;
/* lab kit: chs = [{goal, test(), set()}]; returns {check()} to call after every change */
VIS.lab=(c,chs)=>{let mode='sandbox',i=0,won=false;const bar=c.el('div',{class:'lab-bar',role:'group','aria-label':'Lab mode'});c.fig.insertBefore(bar,c.stage);
 const bS=c.el('button',{type:'button',class:'lbtn sm on','aria-pressed':'true'},bar,'Sandbox'),bC=c.el('button',{type:'button',class:'lbtn sm','aria-pressed':'false'},bar,'🎯 Challenge');
 const goal=c.el('p',{class:'lab-goal',role:'status'},bar,'Sandbox: change anything and watch what happens.');const nx=c.el('button',{type:'button',class:'lbtn sm ghost',hidden:''},bar,'Next challenge');
 const show=()=>{bS.classList.toggle('on',mode==='sandbox');bC.classList.toggle('on',mode!=='sandbox');bS.setAttribute('aria-pressed',mode==='sandbox');bC.setAttribute('aria-pressed',mode!=='sandbox');
  goal.textContent=mode==='sandbox'?'Sandbox: change anything and watch what happens.':`Challenge ${i+1} of ${chs.length}: ${chs[i].goal}`;goal.classList.remove('win');nx.hidden=true};
 const start=()=>{won=false;chs[i].set&&chs[i].set();show();api.check()};
 bS.onclick=()=>{mode='sandbox';show()};bC.onclick=()=>{mode='challenge';start()};nx.onclick=()=>{i=(i+1)%chs.length;start()};
 const api={check(){if(mode!=='challenge'||won)return;let ok=false;try{ok=chs[i].test()}catch(e){}if(!ok)return;won=true;goal.textContent=`✓ Challenge ${i+1} done! ${chs[i].win||''}`;goal.classList.add('win');nx.hidden=false;
  c.fig.classList.remove('lab-won');void c.fig.offsetWidth;c.fig.classList.add('lab-won');try{navigator.vibrate&&navigator.vibrate(18)}catch(e){}},mode:()=>mode};return api};
const ink=c=>getComputedStyle(c.fig).color||'#111';

/* probability: many trials, live histogram vs theory */
R('problab',c=>{const o=c.opts,kind=o.kind||'coin';
 const K={coin:{lab:['Heads','Tails'],p:[.5,.5],roll:()=>Math.random()<.5?0:1},dice:{lab:['1','2','3','4','5','6'],p:Array(6).fill(1/6),roll:()=>Math.floor(Math.random()*6)},
  sum:{lab:['2','3','4','5','6','7','8','9','10','11','12'],p:[1,2,3,4,5,6,5,4,3,2,1].map(x=>x/36),roll:()=>Math.floor(Math.random()*6)+Math.floor(Math.random()*6)},
  spinner:{lab:(o.labels||['Red','Blue','Green']),p:(o.p||[.5,.25,.25]),roll(){let r=Math.random();for(let j=0;j<this.p.length;j++){if((r-=this.p[j])<0)return j}return this.p.length-1}}}[kind];
 const n=K.lab.length,cnt=Array(n).fill(0);let N=0,last=null;const W=440,H=240,s=c.svg(W,H,'Results of the trials'),bw=(W-60)/n;
 const yv=v=>H-30-v*(H-60)/Math.max(.5,Math.max(...K.p)*1.6);
 const bars=K.lab.map((l,j)=>{const g=c.el('g',{},s);const r=c.el('rect',{x:40+j*bw+3,width:bw-6,y:H-30,height:0,class:'lab-bar-r'},g);
  c.el('line',{x1:40+j*bw,x2:40+(j+1)*bw,y1:yv(K.p[j]),y2:yv(K.p[j]),class:'lab-theory'},g);c.el('text',{x:40+j*bw+bw/2,y:H-12,'text-anchor':'middle',class:'vis-lab'},g,l);return r});
 c.el('text',{x:40,y:18,class:'vis-lab'},s,'bars: share of results · dashed: theory');const big=c.el('text',{x:W-12,y:22,'text-anchor':'end',class:'vis-big'},s,'');
 const draw=()=>{bars.forEach((r,j)=>{const f=N?cnt[j]/N:0;r.setAttribute('y',yv(f));r.setAttribute('height',Math.max(0,H-30-yv(f)))});big.textContent=N?`${N} trials · last: ${K.lab[last]}`:'no trials yet';
  const dev=N?Math.max(...cnt.map((x,j)=>Math.abs(x/N-K.p[j]))):1;
  c.say(N?`${N} trials. ${K.lab.map((l,j)=>`${l}: ${cnt[j]} (${nf(cnt[j]/N,3)}, theory ${nf(K.p[j],3)})`).join('; ')}. Biggest gap from theory: ${nf(dev,3)}. ${N<100?'With few trials the bars jump about.':'With many trials the bars settle near the theory line.'}`:'Run some trials. Each bar shows what share of the results landed there; the dashed line is the theoretical probability.');L.check()};
 const run=k=>{for(let t=0;t<k;t++){last=K.roll();cnt[last]++;N++}draw()};
 const L=VIS.lab(c,[{goal:'Run at least 1000 trials and watch every bar settle near its dashed line.',test:()=>N>=1000,set:()=>{cnt.fill(0);N=0;draw()},win:'More trials → closer to theory (the law of large numbers).'},
  {goal:`Start again and get the first result's share within 0.02 of ${nf(K.p[0],3)}.`,test:()=>N>=50&&Math.abs(cnt[0]/N-K.p[0])<.02,set:()=>{cnt.fill(0);N=0;draw()},win:'It usually takes hundreds of trials.'}]);
 c.btn('1 trial',()=>run(1));c.btn('+10',()=>run(10));c.btn('+100',()=>run(100));c.btn('+1000',()=>run(1000));c.btn('Reset',()=>{cnt.fill(0);N=0;last=null;draw()},'ghost');c.cueEl=bars;draw()});

/* data lab: drag values, live mean / median / range */
R('statlab',c=>{const o=c.opts,M=o.max||20,v=(o.vals||[3,5,6,8,8,11,15]).slice();const W=440,H=200,x=t=>30+t*(W-60)/M,s=c.svg(W,H,'Data values on a number line');
 c.el('line',{x1:x(0),x2:x(M),y1:150,y2:150,class:'vis-axis'},s);for(let t=0;t<=M;t+=M>20?5:1)c.el('text',{x:x(t),y:168,'text-anchor':'middle',class:'vis-lab'},s,t%(M>20?5:2)?'':String(t));
 const mL=c.el('line',{y1:40,y2:150,class:'lab-mean'},s),mT=c.el('text',{y:34,'text-anchor':'middle',class:'vis-lab b'},s),dT=c.el('polygon',{class:'lab-med'},s),ro=c.el('text',{x:12,y:192,class:'vis-lab'},s);
 const dots=v.map((_,j)=>{const d=c.el('circle',{r:11,class:'vis-handle'},s);c.drag(d,s,X=>{v[j]=c.clamp(Math.round((X-30)/(W-60)*M),0,M);draw()});c.kslider(d,'Value '+(j+1),()=>v[j],t=>{v[j]=t;draw()},0,M,1);return d});
 const stats=()=>{const s2=v.slice().sort((a,b)=>a-b),n=v.length,mean=v.reduce((a,b)=>a+b,0)/n,med=n%2?s2[(n-1)/2]:(s2[n/2-1]+s2[n/2])/2,f={};v.forEach(t=>f[t]=(f[t]||0)+1);const mx=Math.max(...Object.values(f));
  return{mean,med,range:s2[n-1]-s2[0],mode:mx>1?Object.keys(f).filter(k=>f[k]===mx).join(', '):'none'}};
 const draw=()=>{const st=new Map();dots.forEach((d,j)=>{const k=st.get(v[j])||0;st.set(v[j],k+1);d.setAttribute('cx',x(v[j]));d.setAttribute('cy',138-k*22);d.setAttribute('aria-valuenow',v[j])});
  const S=stats();mL.setAttribute('x1',x(S.mean));mL.setAttribute('x2',x(S.mean));mT.setAttribute('x',x(S.mean));mT.textContent='mean '+nf(S.mean);dT.setAttribute('points',`${x(S.med)-7},${178} ${x(S.med)+7},${178} ${x(S.med)},${170}`);
  ro.textContent=`median ${nf(S.med)} (▲) · range ${S.range} · mode ${S.mode}`;c.say(`Values ${v.slice().sort((a,b)=>a-b).join(', ')}. Mean ${nf(S.mean)}, median ${nf(S.med)}, range ${S.range}, mode ${S.mode}. Drag one value far away: the mean moves a lot, the median hardly moves.`);L.check()};
 const tg=o.target||10;const L=VIS.lab(c,[{goal:`Make the mean exactly ${tg}.`,test:()=>Math.abs(stats().mean-tg)<1e-9,win:'Mean = total ÷ how many.'},{goal:'Make the mean at least 3 bigger than the median.',test:()=>stats().mean-stats().med>=3,win:'One big outlier drags the mean, not the median.'},{goal:'Make the range exactly 4.',test:()=>stats().range===4}]);
 c.btn('Add an outlier',()=>{v[v.length-1]=M;draw()},'ghost');c.cueEl=[mL];draw()});

/* number line with zoom: whole numbers → tenths → hundredths */
R('numzoom',c=>{const o=c.opts,neg=!!o.neg;let z=0,lo=neg?-10:0,val=o.start??(neg?-2:3);const W=440,H=150,s=c.svg(W,H,'Zoomable number line'),g=c.el('g',{},s),ro=c.el('text',{x:12,y:22,class:'vis-big'},s);
 const span=()=>[neg?20:10,1,.1][z],dp=()=>z,X=t=>30+(t-lo)/span()*(W-60);const h=c.el('circle',{r:12,cy:90,class:'vis-handle'},s);const tg=o.target;let tm=null;if(tg!=null)tm=c.el('line',{y1:62,y2:118,class:'lab-target'},s);
 const draw=()=>{g.innerHTML='';c.el('line',{x1:30,x2:W-30,y1:90,y2:90,class:'vis-axis'},g);for(let i=0;i<=10;i++){const t=+(lo+i*span()/10).toFixed(3);c.el('line',{x1:X(t),x2:X(t),y1:82,y2:98,class:'vis-axis'},g);c.el('text',{x:X(t),y:118,'text-anchor':'middle',class:'vis-lab'},g,nf(t,dp()+1))}
  val=c.clamp(val,lo,lo+span());h.setAttribute('cx',X(val));if(tm){const on=tg>=lo&&tg<=lo+span();tm.style.display=on?'':'none';tm.setAttribute('x1',X(tg));tm.setAttribute('x2',X(tg))}
  ro.textContent=nf(val,dp()+1);c.say(`Zoom ×${10**z}: from ${nf(lo,3)} to ${nf(lo+span(),3)}, each small step is ${nf(span()/10,3)}. The point is at ${nf(val,dp()+1)}.${tg!=null?` Target ${nf(tg,3)}${Math.abs(val-tg)<1e-9?': hit!':'.'}`:''}`);L.check()};
 c.drag(h,s,x0=>{val=+(lo+Math.round((x0-30)/(W-60)*10*(z<2?10:1))/(z<2?10:1)*span()/10).toFixed(4);draw()});c.kslider(h,'Point',()=>val,t=>{val=t;draw()},neg?-10:0,10,.01);
 const zin=()=>{if(z<2){lo=+(Math.floor(val/span()*10)*span()/10).toFixed(4);z++;draw()}},zout=()=>{if(z>0){z--;lo=neg&&z===0?-10:+(Math.floor(lo/span())*span()).toFixed(4);if(!neg&&z===0)lo=0;draw()}};
 const L=VIS.lab(c,tg!=null?[{goal:`Put the point exactly on ${nf(tg,3)}. You will need to zoom in.`,test:()=>Math.abs(val-tg)<1e-9,win:'Each zoom splits a step into 10 smaller steps.'}]:[{goal:'Zoom in twice and land on a number with two decimal places.',test:()=>z===2&&Math.round(val*100)%10!==0}]);
 c.btn('🔍 Zoom in ×10',zin);c.btn('Zoom out',zout,'ghost');c.cueEl=[h];draw()});
})();
/* Why Next? labs (part 2): graph explorer with live function editing, geometry construction with draggable
   points and measured sides / angles / area, and a 2×2 matrix transformer. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const OK=/^[abcx0-9+\-*/(). ^]+$/;
function compile(src,P){src=String(src).replace(/\s+/g,' ').replace(/×/g,'*').replace(/−/g,'-');if(!OK.test(src))return null;
 const js=src.replace(/(\d)\s*([a-cx(])/g,'$1*$2').replace(/\)\s*([a-cx(\d])/g,')*$1').replace(/\^/g,'**');try{const f=Function('x','a','b','c',`"use strict";return (${js});`);f(1,1,1,1);return x=>f(x,P.a,P.b,P.c)}catch(e){return null}}

/* graph explorer: type y = …, tune a, b, c, hit target points */
R('graphlab',c=>{const o=c.opts,P={a:o.a??1,b:o.b??0,c:o.c??0},K=VIS.plotKit,Pl=K.plot(c,{xr:o.xr||[-6,6],yr:o.yr||[-6,6],equal:o.equal!==false},'Graph explorer');
 let src=o.f||'a*x+b',f=compile(src,P);const cur=c.el('path',{class:'vis-curve'},Pl.lay),ro=c.el('text',{x:44,y:22,class:'vis-big'},Pl.s);
 const T=(o.targets||[]).map(([x,y])=>({x,y,el:c.el('circle',{cx:Pl.sx(x),cy:Pl.sy(y),r:8,class:'vis-target'},Pl.s)}));
 const wrap=c.el('label',{class:'vis-range'},c.ctl);c.el('span',{},wrap,'y = ');const inp=c.el('input',{class:'lab-in',type:'text',value:src,'aria-label':'Function, y equals',inputmode:'text',autocomplete:'off',spellcheck:'false'},wrap);
 const used=k=>new RegExp(k).test(src);const rs={};
 const hit=t=>f&&Math.abs(f(t.x)-t.y)<.051;
 const draw=()=>{f=compile(src,P);if(!f){ro.textContent='Use x, numbers, + − * / ^ ( ) and a, b, c';c.say('That formula cannot be drawn yet. Use x, numbers, + − * / ^, brackets and the letters a, b, c.');return}
  let d='',pen=false;for(let i=0;i<=300;i++){const x=Pl.x0+(Pl.x1-Pl.x0)*i/300,y=f(x);if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue}d+=(pen?'L':'M')+Pl.sx(x).toFixed(1)+' '+Pl.sy(y).toFixed(1);pen=true}cur.setAttribute('d',d);
  T.forEach(t=>t.el.classList.toggle('lab-hit',hit(t)));
  ro.textContent='y = '+src.replace(/\*\*/g,'^');const parts=['a','b','c'].filter(used).map(k=>`${k} = ${nf(P[k])}`).join(', ');
  c.say(`y = ${src}${parts?` with ${parts}`:''}. At x = 0, y = ${nf(f(0))}; at x = 1, y = ${nf(f(1))}; at x = 2, y = ${nf(f(2))}.${T.length?` Targets hit: ${T.filter(hit).length} of ${T.length}.`:''}`);Object.values(rs).forEach(([w,k])=>w.style.display=used(k)?'':'none');L.check()};
 inp.oninput=()=>{src=inp.value.trim()||'0';draw()};
 for(const k of['a','b','c']){const r=c.range(k,-5,5,.5,P[k],v=>{P[k]=v;draw()});rs[k]=[r.parentElement,k]}
 const chs=(o.challenges||[]).map(([goal,f2,tg])=>({goal,test:()=>T.length?T.every(hit):false,set:()=>{}}));
 const L=VIS.lab(c,chs.length?chs:[{goal:T.length?'Make the graph pass through every red target.':'Make the graph pass through (2, 3).',test:()=>T.length?T.every(hit):Math.abs(f(2)-3)<.051,win:'Changing a number in the formula moves or bends the whole graph.'},
  {goal:'Make a graph that crosses the y-axis at −2.',test:()=>Math.abs(f(0)+2)<.051},{goal:'Make a graph that goes DOWN from left to right.',test:()=>f(3)<f(-3)-.5}]);
 c.cueEl=[cur];draw()});

/* geometry construction: drag the corners; sides, angles, area and perimeter update live */
R('geolab',c=>{const o=c.opts,G=o.grid||10,pts=(o.pts||[[1,1],[8,1],[3,6]]).map(p=>p.slice());const W=400,H=330,u=(W-40)/G,X=x=>20+x*u,Y=y=>H-20-y*u,s=c.svg(W,H,'Shape on a grid');
 for(let i=0;i<=G;i++){c.el('line',{x1:X(i),x2:X(i),y1:Y(0),y2:Y(Math.floor((H-40)/u)),class:'vis-grid'},s);}for(let j=0;j*u<=H-40;j++)c.el('line',{x1:X(0),x2:X(G),y1:Y(j),y2:Y(j),class:'vis-grid'},s);
 const Gm=Math.floor((H-40)/u),poly=c.el('polygon',{class:'lab-shape'},s),labs=pts.map(()=>c.el('text',{class:'vis-lab b','text-anchor':'middle'},s)),sl=pts.map(()=>c.el('text',{class:'vis-lab','text-anchor':'middle'},s));
 const nm='ABCDEFG';const hs=pts.map((p,j)=>{const h=c.el('circle',{r:11,class:'vis-handle'},s);c.drag(h,s,(x,y)=>{p[0]=c.clamp(Math.round((x-20)/u),0,G);p[1]=c.clamp(Math.round((H-20-y)/u),0,Gm);draw()});
  h.addEventListener('keydown',e=>{const k={ArrowUp:1,ArrowDown:-1}[e.key];if(k){e.preventDefault();e.stopImmediatePropagation();p[1]=c.clamp(p[1]+k,0,Gm);draw()}});
  c.kslider(h,'Corner '+nm[j]+': left/right arrows move across, up/down arrows move up',()=>p[0],v=>{p[0]=v;draw()},0,G,1);return h});
 const geo=()=>{const n=pts.length;let A=0,per=0;const sides=[],ang=[];for(let j=0;j<n;j++){const p=pts[j],q=pts[(j+1)%n];A+=p[0]*q[1]-q[0]*p[1];const L=Math.hypot(q[0]-p[0],q[1]-p[1]);sides.push(L);per+=L}
  for(let j=0;j<n;j++){const p=pts[(j+n-1)%n],q=pts[j],r=pts[(j+1)%n],a1=[p[0]-q[0],p[1]-q[1]],a2=[r[0]-q[0],r[1]-q[1]],d=Math.hypot(...a1)*Math.hypot(...a2);ang.push(d?Math.acos(c.clamp((a1[0]*a2[0]+a1[1]*a2[1])/d,-1,1))*180/Math.PI:0)}
  return{A:Math.abs(A)/2,per,sides,ang}};
 const draw=()=>{const g=geo();poly.setAttribute('points',pts.map(p=>X(p[0])+','+Y(p[1])).join(' '));const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length,cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
  pts.forEach((p,j)=>{hs[j].setAttribute('cx',X(p[0]));hs[j].setAttribute('cy',Y(p[1]));const dx=p[0]-cx,dy=p[1]-cy,dl=Math.hypot(dx,dy)||1;labs[j].setAttribute('x',X(p[0])+dx/dl*24);labs[j].setAttribute('y',Y(p[1])-dy/dl*24+4);labs[j].textContent=`${nm[j]} ${Math.round(g.ang[j])}°`;
   const q=pts[(j+1)%pts.length];sl[j].setAttribute('x',(X(p[0])+X(q[0]))/2);sl[j].setAttribute('y',(Y(p[1])+Y(q[1]))/2-6);sl[j].textContent=nf(g.sides[j],1)});
  const sum=g.ang.reduce((a,b)=>a+b,0);c.say(`Corners ${pts.map((p,j)=>`${nm[j]}(${p[0]}, ${p[1]})`).join(', ')}. Angles ${g.ang.map(a=>Math.round(a)+'°').join(', ')} add up to ${Math.round(sum)}°. Area ${nf(g.A)} squares, perimeter ${nf(g.per,1)}.`);L.check()};
 const near=(a,b)=>Math.abs(a-b)<.5;const ta=o.area||12;
 const L=VIS.lab(c,[{goal:'Make one angle exactly 90° (a right angle).',test:()=>geo().ang.some(a=>near(a,90)),win:'Right angles show up where sides meet like the corner of a page.'},{goal:`Make the area exactly ${ta} squares.`,test:()=>Math.abs(geo().A-ta)<1e-9,win:pts.length===3?'Triangle area = ½ × base × height.':'Count whole squares, then halves.'},
  {goal:pts.length===3?'Make two sides the same length (isosceles).':'Make all four angles 90° (a rectangle).',test:()=>{const g=geo();return pts.length===3?g.sides.some((a,i)=>g.sides.some((b,j)=>i<j&&Math.abs(a-b)<1e-9)):g.ang.every(a=>near(a,90))}}]);
 c.cueEl=[poly];draw()});

/* matrix lab: a 2×2 matrix moves the unit square; the determinant is the area scale */
R('matrixlab',c=>{const o=c.opts,m=(o.m||[1,0,0,1]).slice();const W=360,H=360,u=30,X=x=>W/2+x*u,Y=y=>H/2-y*u,s=c.svg(W,H,'Unit square and its image');
 for(let i=-6;i<=6;i++){c.el('line',{x1:X(i),x2:X(i),y1:0,y2:H,class:'vis-grid'},s);c.el('line',{x1:0,x2:W,y1:Y(i),y2:Y(i),class:'vis-grid'},s)}c.el('line',{x1:0,x2:W,y1:Y(0),y2:Y(0),class:'vis-axis'},s);c.el('line',{x1:X(0),x2:X(0),y1:0,y2:H,class:'vis-axis'},s);
 c.el('polygon',{points:[[0,0],[1,0],[1,1],[0,1]].map(p=>X(p[0])+','+Y(p[1])).join(' '),class:'lab-ghost'},s);const img=c.el('polygon',{class:'lab-shape'},s),ei=c.el('line',{class:'vis-curve',x1:X(0),y1:Y(0)},s),ej=c.el('line',{class:'vis-curve b',x1:X(0),y1:Y(0)},s);
 const box=c.el('div',{class:'lab-mat',role:'group','aria-label':'Matrix entries'},c.ctl);const ins=m.map((v,k)=>{const i=c.el('input',{type:'number',step:'0.5',value:v,class:'numin','aria-label':['top left','top right','bottom left','bottom right'][k]},box);i.oninput=()=>{const t=parseFloat(i.value);if(isFinite(t)){m[k]=t;draw()}};return i});
 const det=()=>m[0]*m[3]-m[1]*m[2];
 const draw=()=>{const T=([x,y])=>[m[0]*x+m[1]*y,m[2]*x+m[3]*y];img.setAttribute('points',[[0,0],[1,0],[1,1],[0,1]].map(T).map(p=>X(p[0])+','+Y(p[1])).join(' '));const a=T([1,0]),b=T([0,1]);
  ei.setAttribute('x2',X(a[0]));ei.setAttribute('y2',Y(a[1]));ej.setAttribute('x2',X(b[0]));ej.setAttribute('y2',Y(b[1]));const d=det();
  c.say(`Matrix [${nf(m[0])} ${nf(m[1])}; ${nf(m[2])} ${nf(m[3])}]. (1, 0) goes to (${nf(a[0])}, ${nf(a[1])}) (blue); (0, 1) goes to (${nf(b[0])}, ${nf(b[1])}) (green). Determinant ${nf(d)}: the area is multiplied by ${nf(Math.abs(d))}${d<0?' and the shape is flipped':''}${d===0?', so the square is squashed flat':''}.`);L.check()};
 const set=v=>{v.forEach((t,k)=>{m[k]=t;ins[k].value=t});draw()};
 const L=VIS.lab(c,[{goal:'Make the determinant exactly 6 (area × 6).',test:()=>Math.abs(det()-6)<1e-9},{goal:'Rotate the square 90° anticlockwise.',test:()=>m.join()==='0,-1,1,0',win:'Columns are where (1,0) and (0,1) land.'},{goal:'Reflect the square in the y-axis.',test:()=>m.join()==='-1,0,0,1'},{goal:'Squash the square flat (determinant 0) without using any zeros.',test:()=>Math.abs(det())<1e-9&&m.every(t=>t!==0)}]);
 c.btn('Identity',()=>set([1,0,0,1]),'ghost');c.btn('Rotate 90°',()=>set([0,-1,1,0]),'ghost');c.btn('Stretch ×2',()=>set([2,0,0,2]),'ghost');c.btn('Shear',()=>set([1,1,0,1]),'ghost');c.cueEl=[img];draw()});
})();
/* Why Next? labs (part 3): a gas box with colliding particles and a pressure meter, a reaction lab (mixing,
   indicator colour, temperature, gas bubbles and gas tests), a wave lab and a force-and-motion track. */
(()=>{const R=VIS.reg,nf=VIS.nf;
const pal=fig=>{const d=document.documentElement.dataset.theme!=='classic'&&document.documentElement.dataset.theme;return d?{bg:'#0b1020',ink:'#e2e8f0',p:'#38bdf8',w:'#94a3b8'}:{bg:'#f8fafc',ink:'#111827',p:'#2563eb',w:'#475569'}};
/* gas lab: elastic collisions; pressure = momentum given to the walls per second */
R('gaslab',c=>{const o=c.opts,W=440,H=260,cv=c.el('canvas',{width:W*2,height:H*2,class:'vis-canvas',role:'img','aria-label':'Gas particles in a box with a movable wall'},c.stage);cv.style.width='100%';cv.style.maxWidth=W*1.35+'px';
 const g=cv.getContext('2d');g.scale(2,2);let n=o.n||30,T=o.temp||300,vol=o.vol||1,ps=[],imp=0,P=0,t0=performance.now(),run=!c.reduced(),raf=0,vis=true;
 const box=()=>({x0:10,y0:10,x1:10+(W-20)*(.4+.6*vol)/1,y1:H-10});const sp=()=>Math.sqrt(T/300)*90;
 const add=k=>{for(let i=0;i<k;i++){const b=box(),a=Math.random()*6.283;ps.push({x:b.x0+10+Math.random()*(b.x1-b.x0-20),y:b.y0+10+Math.random()*(b.y1-b.y0-20),vx:Math.cos(a),vy:Math.sin(a)})}};add(n);
 const step=dt=>{const b=box(),v=sp(),r=5;for(const q of ps){q.x+=q.vx*v*dt;q.y+=q.vy*v*dt;if(q.x<b.x0+r){q.x=b.x0+r;q.vx=Math.abs(q.vx);imp+=2*Math.abs(q.vx)*v}if(q.x>b.x1-r){q.x=b.x1-r;q.vx=-Math.abs(q.vx);imp+=2*Math.abs(q.vx)*v}
   if(q.y<b.y0+r){q.y=b.y0+r;q.vy=Math.abs(q.vy);imp+=2*Math.abs(q.vy)*v}if(q.y>b.y1-r){q.y=b.y1-r;q.vy=-Math.abs(q.vy);imp+=2*Math.abs(q.vy)*v}}
  for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],d=ps[j],dx=d.x-a.x,dy=d.y-a.y,d2=dx*dx+dy*dy;if(d2<4*r*r&&d2>0){const L=Math.sqrt(d2),nx=dx/L,ny=dy/L,rv=(a.vx-d.vx)*nx+(a.vy-d.vy)*ny;if(rv>0){a.vx-=rv*nx;a.vy-=rv*ny;d.vx+=rv*nx;d.vy+=rv*ny}const ov=(2*r-L)/2;a.x-=nx*ov;a.y-=ny*ov;d.x+=nx*ov;d.y+=ny*ov}}};
 const theory=()=>ps.length*T/300/vol;/* relative pressure from pV = nRT, scaled so 30 particles, 300 K, full box = 30 */
 const paint=()=>{const C=pal(),b=box();g.fillStyle=C.bg;g.fillRect(0,0,W,H);g.strokeStyle=C.w;g.lineWidth=3;g.strokeRect(b.x0,b.y0,b.x1-b.x0,b.y1-b.y0);g.fillStyle=C.w;g.fillRect(b.x1,b.y0,8,b.y1-b.y0);
  g.fillStyle=C.p;for(const q of ps){g.beginPath();g.arc(q.x,q.y,5,0,6.283);g.fill()}g.fillStyle=C.ink;g.font='bold 14px system-ui';g.fillText(`pressure ≈ ${nf(theory(),0)}`,W-150,26);g.font='12px system-ui';g.fillText(`${ps.length} particles · ${T} K`,W-150,44)};
 const tell=()=>{c.say(`${ps.length} particles at ${T} K in a box ${Math.round(vol*100)}% full size. Pressure about ${nf(theory(),0)} (relative units). Hotter → faster particles hit the walls harder and more often; a smaller box or more particles → more hits each second, so higher pressure.`);L.check()};
 const loop=now=>{raf=0;if(!run||!vis)return;const dt=Math.min(.04,(now-(loop.l||now))/1000);loop.l=now;step(dt);if(now-t0>700){const b=box(),per=2*(b.x1-b.x0+b.y1-b.y0);P=.85*P+.15*(imp/((now-t0)/1000)/per*0.37);imp=0;t0=now}paint();raf=requestAnimationFrame(loop)};
 const go=()=>{if(run&&vis&&!raf){loop.l=0;raf=requestAnimationFrame(loop)}};
 const io=window.IntersectionObserver?new IntersectionObserver(e=>{vis=e[0].isIntersecting;go()}):null;io&&io.observe(cv);
 const th=()=>paint();document.addEventListener('wntheme',th);c.stops.push(()=>{run=false;cancelAnimationFrame(raf);io&&io.disconnect();document.removeEventListener('wntheme',th)});
 const base=theory();const L=VIS.lab(c,[{goal:'Double the pressure by changing ONLY the box size.',test:()=>Math.abs(theory()/(30*1)-2)<.08&&ps.length===30&&T===300,set:()=>{ps=[];add(30);T=300;vol=1;sync()},win:'Half the volume → twice the pressure (Boyle’s law).'},
  {goal:'Get the pressure above 60 using temperature only (box full size, 30 particles).',test:()=>theory()>60&&vol===1&&ps.length===30,set:()=>{ps=[];add(30);T=300;vol=1;sync()},win:'Pressure rises with temperature.'}]);
 const rT=c.range('Temperature (K)',100,900,50,T,v=>{T=v;tell();paint()}),rV=c.range('Box size %',40,100,5,100,v=>{vol=v/100;for(const q of ps)q.x=Math.min(q.x,box().x1-6);tell();paint()});
 const sync=()=>{rT.value=T;rV.value=vol*100;tell();paint()};
 c.btn('+5 particles',()=>{add(5);tell();paint()});c.btn('−5',()=>{ps.splice(0,Math.min(5,ps.length-1));tell();paint()},'ghost');
 const pb=c.btn(run?'Pause':'Play',()=>{run=!run;pb.textContent=run?'Pause':'Play';go();paint()},'ghost');c.cueEl=[cv];paint();tell();go()});

/* reaction lab: mix and observe */
R('reactlab',c=>{const o=c.opts;let ac=0,al=0,metal=0,carb=0,temp=20,gas=null,obs=[],ind=o.indicator!==false,bub=[];const W=420,H=280,s=c.svg(W,H,'Beaker');
 const UI=['#dc2626','#ea580c','#f59e0b','#eab308','#a3e635','#4ade80','#22c55e','#14b8a6','#0ea5e9','#3b82f6','#6366f1','#7c3aed','#9333ea','#a21caf'];
 c.el('rect',{x:120,y:60,width:160,height:190,rx:10,class:'lab-glass'},s);const liq=c.el('rect',{x:124,width:152,rx:8},s),gs=c.el('g',{},s);
 const th=c.el('rect',{x:320,y:60,width:14,height:190,rx:7,class:'lab-glass'},s),thf=c.el('rect',{x:323,width:8,rx:4,fill:'#ef4444'},s),tt=c.el('text',{x:327,y:50,'text-anchor':'middle',class:'vis-lab b'},s),pt=c.el('text',{x:200,y:40,'text-anchor':'middle',class:'vis-big'},s);
 const out=c.el('p',{class:'lab-out'},c.stage);
 const pH=()=>{const x=ac-al;if(Math.abs(x)<1e-9)return 7;return x>0?Math.max(1,7-1.6*Math.log2(1+x*2)):Math.min(13,7+1.6*Math.log2(1-x*2))};
 const draw=()=>{const vol=Math.min(180,60+(ac+al)*12),p=pH();liq.setAttribute('y',248-vol);liq.setAttribute('height',vol);liq.setAttribute('fill',ind?UI[Math.round(p)-1]||UI[6]:'#bae6fd');liq.setAttribute('opacity','.8');
  const tf=c.clamp((temp-0)/60,0,1)*180;thf.setAttribute('y',248-tf);thf.setAttribute('height',tf);tt.textContent=nf(temp,1)+' °C';pt.textContent=ind?'pH '+nf(p,1):'';
  out.textContent=obs.slice(-3).filter((x,i,a)=>x!==a[i-1]).join(' ');c.say(`Beaker: ${nf(ac)} acid, ${nf(al)} alkali added. ${ind?`Universal indicator shows pH ${nf(p,1)} (${p<6.5?'acidic':p>7.5?'alkaline':'neutral'}).`:''} Temperature ${nf(temp,1)} °C.${gas?` Bubbles of ${gas} are given off.`:''} ${obs.slice(-1)[0]||''}`);L.check()};
 const fizz=g2=>{gas=g2;if(c.reduced()){gs.innerHTML='';for(let i=0;i<10;i++)c.el('circle',{cx:135+Math.random()*130,cy:120+Math.random()*120,r:3+Math.random()*3,class:'lab-bub'},gs);return}
  for(let i=0;i<24;i++){const b=c.el('circle',{cx:135+Math.random()*130,cy:245,r:2+Math.random()*4,class:'lab-bub'},gs);const d=Math.random()*900;c.tween(1600+d,t=>b.setAttribute('cy',245-t*170),()=>b.remove())}};
 const react=()=>{const ex=Math.min(ac,al);if(ex>0){ac-=ex;al-=ex;temp+=2.5*ex;obs.push(`Neutralisation: acid + alkali → salt + water. It warms up (exothermic).`)}
  if(metal&&ac>0){const k=Math.min(metal,ac);metal-=k;ac-=k;temp+=3*k;fizz('hydrogen');obs.push('Magnesium fizzes in the acid: metal + acid → salt + hydrogen.')}
  if(carb&&ac>0){const k=Math.min(carb,ac);carb-=k;ac-=k;temp-=.5*k;fizz('carbon dioxide');obs.push('The carbonate fizzes: carbonate + acid → salt + water + carbon dioxide.')}};
 const L=VIS.lab(c,[{goal:'Neutralise the acid: get to pH 7 exactly.',test:()=>Math.abs(pH()-7)<1e-9&&made.n,set:()=>{reset();ac=3;obs.push('3 portions of acid are in the beaker.');draw()},win:'Equal acid and alkali → neutral (pH 7).'},
  {goal:'Make hydrogen, then test it with a lit splint.',test:()=>made.h,set:()=>{reset();draw()},win:'A squeaky pop means hydrogen.'},{goal:'Make carbon dioxide, then bubble it through limewater.',test:()=>made.c,set:()=>{reset();draw()},win:'Limewater turns milky with carbon dioxide.'}]);
 const made={n:0,h:0,c:0},reset=()=>{ac=al=metal=carb=0;temp=20;gas=null;obs=[];gs.innerHTML='';made.n=made.h=made.c=0};
 c.btn('Add acid',()=>{ac+=1;gas=null;react();draw()});c.btn('Add alkali',()=>{al+=1;gas=null;react();made.n=1;draw()});c.btn('Add magnesium',()=>{metal+=1;gas=null;react();draw()});c.btn('Add carbonate',()=>{carb+=1;gas=null;react();draw()});
 c.btn('Lit splint test',()=>{obs.push(gas==='hydrogen'?'Squeaky POP! The gas is hydrogen.':gas?'The splint just goes on burning or goes out: not hydrogen.':'No gas to test yet.');if(gas==='hydrogen')made.h=1;draw()},'ghost');
 c.btn('Limewater test',()=>{obs.push(gas==='carbon dioxide'?'The limewater turns milky: carbon dioxide!':gas?'Limewater stays clear: not carbon dioxide.':'No gas to test yet.');if(gas==='carbon dioxide')made.c=1;draw()},'ghost');
 c.btn('Empty beaker',()=>{reset();draw()},'ghost');ac=o.acid??1;c.cueEl=[liq];draw()});

/* wave lab */
R('wavelab',c=>{const o=c.opts;let A=o.a||1.5,f=o.f||1,v=o.v||4,ph=0,run=!c.reduced(),raf=0;const W=440,H=200,s=c.svg(W,H,'A wave'),mid=100,px=60;
 c.el('line',{x1:20,x2:W-10,y1:mid,y2:mid,class:'vis-axis'},s);const tg=o.target?c.el('path',{class:'vis-curve faint'},s):null,wv=c.el('path',{class:'vis-curve'},s),ro=c.el('text',{x:20,y:20,class:'vis-big'},s);
 const path=(A2,f2,p)=>{const lam=v/f2;let d='';for(let X=20;X<=W-10;X+=3){const x=(X-20)/px;d+=(X===20?'M':'L')+X+' '+(mid-A2*25*Math.sin(2*Math.PI*(x/lam)-p)).toFixed(1)}return d};
 const draw=()=>{wv.setAttribute('d',path(A,f,ph));if(tg)tg.setAttribute('d',path(o.target[0],o.target[1],0));const lam=v/f;ro.textContent=`λ = ${nf(lam)} m · f = ${nf(f)} Hz`;
  c.say(`Amplitude ${nf(A)} m, frequency ${nf(f)} Hz, wave speed ${nf(v)} m/s, so wavelength = speed ÷ frequency = ${nf(lam)} m. Higher frequency → shorter waves; bigger amplitude → taller waves (louder sound or brighter light).`);L.check()};
 const loop=now=>{raf=0;if(!run)return;ph=(now/1000)*2*Math.PI*f*.4;wv.setAttribute('d',path(A,f,ph));raf=requestAnimationFrame(loop)};c.stops.push(()=>{run=false;cancelAnimationFrame(raf)});
 const t=o.target||[1,2];const L=VIS.lab(c,[{goal:`Match the faint target wave (amplitude ${t[0]} m, frequency ${t[1]} Hz).`,test:()=>Math.abs(A-t[0])<1e-9&&Math.abs(f-t[1])<1e-9,win:'Frequency sets how squashed the wave is; amplitude sets its height.'},{goal:'Make the wavelength exactly 1 m.',test:()=>Math.abs(v/f-1)<1e-9,win:'λ = v ÷ f.'}]);
 c.range('Amplitude',.5,3,.5,A,x=>{A=x;draw()});c.range('Frequency (Hz)',.5,4,.5,f,x=>{f=x;draw()});c.range('Speed (m/s)',1,8,1,v,x=>{v=x;draw()});
 const pb=c.btn(run?'Pause':'Play',()=>{run=!run;pb.textContent=run?'Pause':'Play';if(run&&!raf)raf=requestAnimationFrame(loop)},'ghost');c.cueEl=[wv];draw();if(run)raf=requestAnimationFrame(loop)});

/* force lab: push a cart for 2 s, friction slows it; land in the green zone */
R('forcelab',c=>{const o=c.opts;let F=o.f||20,m=o.m||5,mu=o.mu??.2,res=null,raf=0;const W=440,H=150,s=c.svg(W,H,'Cart on a track'),X=d=>20+d*16;
 c.el('line',{x1:10,x2:W-10,y1:110,y2:110,class:'vis-axis'},s);const z0=o.zone||[15,18];c.el('rect',{x:X(z0[0]),y:96,width:(z0[1]-z0[0])*16,height:14,class:'lab-zone'},s);
 for(let d=0;d<=25;d+=5)c.el('text',{x:X(d),y:128,'text-anchor':'middle',class:'vis-lab'},s,d+' m');const cart=c.el('rect',{y:84,width:30,height:24,rx:4,class:'lab-cart'},s),ro=c.el('text',{x:20,y:22,class:'vis-big'},s);
 const sim=()=>{const g=9.8,fr=mu*m*g,tp=2;let x=0,v=0,t=0,dt=.01,tr=[];while(t<30){const push=t<tp?F:0,net=push-(v>0||push>fr?fr:push);const a=net/m;v=Math.max(0,v+a*dt);x+=v*dt;t+=dt;tr.push([t,x,v]);if(t>tp&&v<=0)break}return{x,tr,a0:(F-fr)/m,fr}};
 const show=d=>{cart.setAttribute('x',X(Math.min(d,26))-15)};
 const tell=r=>{const inz=r.x>=z0[0]&&r.x<=z0[1];c.say(`Push ${F} N for 2 s on a ${m} kg cart; friction ${nf(r.fr,1)} N. Net force while pushing ${nf(Math.max(0,F-r.fr),1)} N, so a = F ÷ m = ${nf(Math.max(0,r.a0),2)} m/s². It stops after ${nf(r.x,1)} m${inz?': in the green zone!':'.'}`);ro.textContent=`stopped at ${nf(r.x,1)} m`};
 const go=()=>{res=sim();cancelAnimationFrame(raf);if(c.reduced()){show(res.x);tell(res);L.check();return}let i=0;const tr=res.tr;const st=()=>{i=Math.min(tr.length-1,i+4);show(tr[i][1]);if(i<tr.length-1)raf=requestAnimationFrame(st);else{tell(res);L.check()}};st()};
 const L=VIS.lab(c,[{goal:`Make the cart stop in the green zone (${z0[0]}–${z0[1]} m).`,test:()=>res&&res.x>=z0[0]&&res.x<=z0[1],win:'More force or less mass → more acceleration (F = ma).'},{goal:'Use the heaviest cart (10 kg) and still reach the zone.',test:()=>res&&m===10&&res.x>=z0[0]&&res.x<=z0[1]}]);
 c.range('Push (N)',0,100,5,F,v=>{F=v});c.range('Mass (kg)',1,10,1,m,v=>{m=v});c.range('Friction',0,.5,.05,mu,v=>{mu=v});c.btn('▶ Push!',go);c.btn('Reset',()=>{cancelAnimationFrame(raf);res=null;show(0);ro.textContent='';c.say('Set the push, mass and friction, then press Push.')},'ghost');
 c.stops.push(()=>cancelAnimationFrame(raf));c.cueEl=[cart];show(0);c.say('Set the push, mass and friction, then press Push. The push lasts 2 seconds.')});
})();
/* Why Next? labs (part 4): an ecosystem lab (prey and predator populations over time). */
(()=>{const R=VIS.reg,nf=VIS.nf;
R('ecolab',c=>{const o=c.opts,pr=o.prey||'Rabbits',pd=o.pred||'Foxes',food=o.food||'grass';let b=o.b??.8,k=o.k??.02,d=o.d??.5,e=o.e??.005,N0=o.n0??60,P0=o.p0??10;
 const W=440,H=240,s=c.svg(W,H,`${pr} and ${pd} over time`),X=t=>40+t*(W-50)/60,Ym=400,Y=v=>H-30-Math.min(v,Ym)*(H-50)/Ym;
 c.el('line',{x1:40,x2:W-10,y1:H-30,y2:H-30,class:'vis-axis'},s);c.el('line',{x1:40,x2:40,y1:15,y2:H-30,class:'vis-axis'},s);for(let t=0;t<=60;t+=10)c.el('text',{x:X(t),y:H-14,'text-anchor':'middle',class:'vis-lab'},s,String(t));
 for(let v=0;v<=Ym;v+=100)c.el('text',{x:34,y:Y(v)+4,'text-anchor':'end',class:'vis-lab'},s,String(v));c.el('text',{x:W-10,y:H-2,'text-anchor':'end',class:'vis-lab'},s,'seasons');
 const pa=c.el('path',{class:'vis-curve'},s),pb=c.el('path',{class:'vis-curve b'},s),lg=c.el('text',{x:48,y:22,class:'vis-lab b'},s,`blue: ${pr} · green: ${pd}`);
 const sim=()=>{let n=N0,p=P0;const out=[[n,p]];for(let t=1;t<=60;t++){for(let q=0;q<10;q++){const nn=n+.1*(b*n*(1-n/500)-k*n*p),np=p+.1*(e*n*p-d*p);n=Math.max(0,nn);p=Math.max(0,np)}if(n<.5)n=0;if(p<.5)p=0;out.push([n,p])}return out};
 let S=sim();const draw=()=>{S=sim();pa.setAttribute('d',S.map(([n],t)=>(t?'L':'M')+X(t)+' '+Y(n)).join(''));pb.setAttribute('d',S.map(([,p],t)=>(t?'L':'M')+X(t)+' '+Y(p)).join(''));
  const [n,p]=S[60],mx=Math.max(...S.map(x=>x[0]));c.say(`${pr} eat ${food}; ${pd} eat ${pr}. After 60 seasons: ${Math.round(n)} ${pr.toLowerCase()} and ${Math.round(p)} ${pd.toLowerCase()} (most ${pr.toLowerCase()} at once: ${Math.round(mx)}). ${p===0?`The ${pd.toLowerCase()} died out, so the ${pr.toLowerCase()} grow until food runs short.`:n===0?`The ${pr.toLowerCase()} died out, so the ${pd.toLowerCase()} starve too.`:'When prey increase, predators follow a little later; then prey fall.'}`);L.check()};
 const L=VIS.lab(c,[{goal:`Keep both ${pr.toLowerCase()} and ${pd.toLowerCase()} alive for all 60 seasons.`,test:()=>S[60][0]>0&&S[60][1]>0,win:'A balanced food web keeps both populations going.'},{goal:`Change one thing so the ${pd.toLowerCase()} die out.`,test:()=>S[60][1]===0,win:'Predators need enough prey to survive.'},{goal:`Get more than 300 ${pr.toLowerCase()} at some point.`,test:()=>Math.max(...S.map(x=>x[0]))>300}]);
 c.range(`${pr} birth rate`,.1,1,.05,b,v=>{b=v;draw()});c.range(`How often ${pd.toLowerCase()} catch ${pr.toLowerCase()}`,.005,.05,.005,k,v=>{k=v;draw()});c.range(`${pd} death rate`,.1,1.5,.05,d,v=>{d=v;draw()});
 c.btn(`+20 ${pd.toLowerCase()}`,()=>{P0+=20;draw()},'ghost');c.btn('Reset',()=>{b=o.b??.8;k=o.k??.02;d=o.d??.5;P0=o.p0??10;c.ctl.querySelectorAll('input[type=range]').forEach((r,i)=>r.value=[b,k,d][i]);draw()},'ghost');c.cueEl=[pa,pb];draw()});
})();
/* Why Next? labs (part 5): plate tectonics, cell explorer, water cycle, food chain builder, body systems. */
(()=>{const R=VIS.reg,nf=VIS.nf;
R('platelab',c=>{const o=c.opts;let mode=o.mode||'together',sp=o.speed??5,my=o.years??1;const W=440,H=220,s=c.svg(W,H,'Two tectonic plates');
 const sea=c.el('rect',{x:0,y:0,width:W,height:70,class:'lab-sky'},s),A=c.el('rect',{y:110,height:60,class:'lab-plate'},s),B=c.el('rect',{y:110,height:60,class:'lab-plate b'},s),mag=c.el('rect',{x:0,y:170,width:W,height:50,class:'lab-magma'},s);
 const mt=c.el('polygon',{class:'lab-mtn'},s),vo=c.el('polygon',{class:'lab-volc'},s),qk=c.el('text',{x:W/2,y:100,'text-anchor':'middle',class:'vis-lab',style:'font-size:26px'},s,''),lb=c.el('text',{x:W/2,y:205,'text-anchor':'middle',class:'vis-lab'},s,'mantle (hot rock flows slowly)');
 let res={};const draw=()=>{const km=sp*my*10,g=mode==='apart'?Math.min(60,km/4):0;A.setAttribute('x',0);A.setAttribute('width',W/2-g/2);B.setAttribute('x',W/2+g/2);B.setAttribute('width',W/2-g/2);
  mt.setAttribute('points',mode==='together'?`${W/2-70},110 ${W/2},${110-Math.min(70,10+km/6)} ${W/2+70},110`:'0,0');vo.setAttribute('points',mode!=='slide'?`${W/2-22},110 ${W/2},${mode==='apart'?90:60} ${W/2+22},110`:'0,0');qk.textContent=mode==='slide'?'⚡ earthquake':'';
  res={km,volcano:mode!=='slide',mountain:mode==='together',quake:true};
  c.say(`Plates ${mode==='together'?'pushing together':mode==='apart'?'pulling apart':'sliding past each other'} at ${sp} cm a year for ${my} million years: they move ${nf(km)} km. ${mode==='together'?'The crust crumples up into mountains and one plate sinks, melting into magma that feeds volcanoes.':mode==='apart'?'Magma rises into the gap and makes new crust, with volcanoes along the rift.':'The plates stick, then jerk past each other: earthquakes, but no volcanoes.'} Earthquakes happen at every kind of boundary.`);L.check()};
 const L=VIS.lab(c,[{goal:'Make plates slide past each other to cause earthquakes without volcanoes.',test:()=>mode==='slide',win:'Sliding boundaries (like the San Andreas Fault) shake but rarely erupt.'},{goal:'Build mountains: push the plates together.',test:()=>res.mountain,win:'The Himalayas formed this way.'},{goal:'Make the plates move exactly 100 km.',test:()=>Math.abs(res.km-100)<1e-9,win:'Distance = speed × time.'}]);
 c.btn('Push together',()=>{mode='together';draw()});c.btn('Pull apart',()=>{mode='apart';draw()});c.btn('Slide past',()=>{mode='slide';draw()});
 c.range('Speed (cm a year)',1,10,1,sp,v=>{sp=v;draw()});c.range('Time (million years)',1,10,1,my,v=>{my=v;draw()});c.cueEl=[A,B];draw()});
const PARTS={nucleus:['Nucleus','controls the cell and holds DNA',0],membrane:['Cell membrane','lets substances in and out',0],cytoplasm:['Cytoplasm','jelly where reactions happen',0],mito:['Mitochondria','release energy by respiration',0],ribo:['Ribosomes','make proteins',0],wall:['Cell wall','strong layer that keeps the shape',1],chloro:['Chloroplasts','absorb light for photosynthesis',1],vac:['Vacuole','stores cell sap and keeps the cell firm',1]};
R('celllab',c=>{const o=c.opts;let plant=o.kind==='plant',sel=null;const W=380,H=240,s=c.svg(W,H,'A cell');const g=c.el('g',{},s);
 const draw=()=>{g.innerHTML='';if(plant)c.el('rect',{x:20,y:20,width:340,height:200,rx:12,class:'lab-wall'+(sel==='wall'?' on':'')},g);
  c.el(plant?'rect':'ellipse',plant?{x:30,y:30,width:320,height:180,rx:10,class:'lab-cell'+(sel==='membrane'||sel==='cytoplasm'?' on':'')}:{cx:190,cy:120,rx:165,ry:100,class:'lab-cell'+(sel==='membrane'||sel==='cytoplasm'?' on':'')},g);
  if(plant)c.el('rect',{x:150,y:70,width:150,height:100,rx:30,class:'lab-vac'+(sel==='vac'?' on':'')},g);c.el('circle',{cx:plant?95:190,cy:plant?90:120,r:30,class:'lab-nuc'+(sel==='nucleus'?' on':'')},g);
  [[90,170],[300,60],[260,190]].forEach(([x,y])=>c.el('ellipse',{cx:x,cy:y,rx:16,ry:8,class:'lab-mito'+(sel==='mito'?' on':'')},g));[[130,60],[240,90],[70,150],[200,200]].forEach(([x,y])=>c.el('circle',{cx:x,cy:y,r:3,class:'lab-ribo'+(sel==='ribo'?' on':'')},g));
  if(plant)[[60,60],[320,190],[130,190],[330,110]].forEach(([x,y])=>c.el('ellipse',{cx:x,cy:y,rx:13,ry:7,class:'lab-chl'+(sel==='chloro'?' on':'')},g));
  bs.forEach(([k,b])=>b.hidden=!plant&&PARTS[k][2]===1);
  c.say(`${plant?'Plant':'Animal'} cell. ${sel?`${PARTS[sel][0]}: ${PARTS[sel][1]}.`:'Pick a part to see what it does.'} ${plant?'Plant cells also have a cell wall, chloroplasts and a large vacuole.':'Animal cells have no cell wall, chloroplasts or large vacuole.'}`);L.check()};
 const L=VIS.lab(c,[{goal:'Find the part that controls the cell.',test:()=>sel==='nucleus',win:'The nucleus holds the genetic instructions.'},{goal:'Switch to a plant cell and find where photosynthesis happens.',test:()=>plant&&sel==='chloro',win:'Chloroplasts contain green chlorophyll.'},{goal:'Find where respiration releases energy.',test:()=>sel==='mito'}]);
 c.btn('Animal / plant',()=>{plant=!plant;if(!plant&&sel&&PARTS[sel][2])sel=null;draw()});const bs=Object.keys(PARTS).map(k=>[k,c.btn(PARTS[k][0],()=>{sel=k;draw()},'ghost')]);c.cueEl=g;draw()});
R('cyclelab',c=>{const o=c.opts;let heat=o.heat??5,cold=o.cold??5,day=0,st={sea:100,vap:0,cloud:0,rain:0,total:0};const W=440,H=220,s=c.svg(W,H,'The water cycle');
 c.el('rect',{x:0,y:160,width:W,height:60,class:'lab-sea'},s);const sun=c.el('circle',{cx:50,cy:40,r:18,class:'lab-sun'},s),cl=c.el('ellipse',{cx:300,cy:50,rx:60,ry:20,class:'lab-cloud'},s),rn=c.el('g',{},s),vp=c.el('g',{},s);
 const tx=c.el('text',{x:W-8,y:150,'text-anchor':'end',class:'vis-lab'},s,'');
 const step=()=>{const ev=Math.min(st.sea,heat*.6),cd=Math.min(st.vap,st.vap*cold*.04),rf=st.cloud>30?st.cloud*.4:0;st.sea+=rf-ev;st.vap+=ev-cd;st.cloud+=cd-rf;st.rain=rf;st.total+=rf;day++};
 const draw=()=>{sun.setAttribute('r',8+heat*2.5);cl.setAttribute('rx',20+Math.min(100,st.cloud*2));cl.setAttribute('ry',8+Math.min(30,st.cloud/2));rn.innerHTML='';vp.innerHTML='';
  for(let i=0;i<Math.min(12,Math.round(st.rain));i++)c.el('line',{x1:260+i*8,x2:256+i*8,y1:75,y2:150,class:'lab-rain'},rn);for(let i=0;i<Math.min(10,Math.round(heat));i++)c.el('text',{x:90+i*14,y:150-(i%3)*20,class:'vis-lab'},vp,'↑');
  tx.textContent=`day ${day}`;c.say(`Day ${day}. Sea ${nf(st.sea,0)}, water vapour ${nf(st.vap,0)}, cloud ${nf(st.cloud,0)}. ${st.rain>0?`It is raining (${nf(st.rain,0)} units).`:'No rain.'} The Sun's heat evaporates sea water into vapour; cold air condenses vapour into cloud droplets; heavy clouds fall as rain back to the sea. The total water stays the same.`);L.check()};
 const run=n=>{for(let i=0;i<n;i++)step();draw()};
 const L=VIS.lab(c,[{goal:'Make it rain.',test:()=>st.rain>0,set:()=>{reset()},win:'Evaporation → condensation → precipitation.'},{goal:'Get 100 units of rain in total.',test:()=>st.total>=100,set:()=>{reset()}},{goal:'Make it rain with the Sun heat at 3 or less.',test:()=>st.rain>0&&heat<=3,set:()=>{reset()},win:'Less heat means slower evaporation, but rain still comes in time.'}]);
 const reset=()=>{st={sea:100,vap:0,cloud:0,rain:0,total:0};day=0;draw()};
 c.range('Sun heat',0,10,1,heat,v=>{heat=v;draw()});c.range('Coldness high up',1,10,1,cold,v=>{cold=v;draw()});c.btn('Run 1 day',()=>run(1));c.btn('Run 10 days',()=>run(10));c.btn('Reset',reset,'ghost');c.cueEl=[sun,cl];draw()});
R('chainlab',c=>{const o=c.opts,ch=o.chain||[['Grass','producer'],['Rabbit','herbivore'],['Fox','carnivore']];let pick=[];const sh=ch.map((x,i)=>i).sort((a,b)=>(a*7+3)%ch.length-(b*7+3)%ch.length);
 const W=440,H=120,s=c.svg(W,H,'Food chain');const g=c.el('g',{},s);
 const draw=()=>{g.innerHTML='';const n=ch.length,w=(W-20)/n;pick.forEach((k,i)=>{const x=10+i*w;c.el('rect',{x:x+4,y:20,width:w-24,height:44,rx:8,class:'lab-card'},g);c.el('text',{x:x+w/2-10,y:47,'text-anchor':'middle',class:'vis-lab'},g,ch[k][0]);
   c.el('text',{x:x+w/2-10,y:84,'text-anchor':'middle',class:'vis-lab'},g,`${nf(1000/10**i,1)} J`);if(i)c.el('text',{x:x-6,y:47,'text-anchor':'middle',class:'vis-lab'},g,'→')});
  const ok=pick.every((k,i)=>k===i);
  c.say(pick.length?`${pick.map(k=>ch[k][0]).join(' → ')}. ${ok?(pick.length===n?`Correct! Arrows show energy flowing from ${ch[0][0].toLowerCase()} (the producer) upwards. Only about 10% passes on at each step, so ${ch[n-1][0].toLowerCase()} get ${nf(1000/10**(n-1),1)} J of every 1000 J.`:'So far so good.'):`Not quite: the chain starts with the producer and each arrow points to the eater.`}`:'Tap the living things in order, starting with the one that makes its own food.');L.check()};
 const L=VIS.lab(c,[{goal:'Build the food chain in the right order.',test:()=>pick.length===ch.length&&pick.every((k,i)=>k===i),set:()=>{pick=[];draw()},win:'Energy flows from producer to consumers.'},{goal:'Which gets the least energy? Build the chain and read the J values.',test:()=>pick.length===ch.length&&pick.every((k,i)=>k===i),set:()=>{pick=[];draw()}}]);
 sh.forEach(k=>c.btn(`${ch[k][0]} (${ch[k][1]})`,()=>{if(!pick.includes(k)&&pick.length<ch.length)pick.push(k);draw()}));c.btn('Undo',()=>{pick.pop();draw()},'ghost');c.cueEl=g;draw()});
const SYS={digestive:['Digestive',['Mouth','Stomach','Small intestine','Large intestine'],'breaks food down and absorbs nutrients'],circulatory:['Circulatory',['Heart','Blood vessels'],'pumps blood carrying oxygen and food around the body'],respiratory:['Respiratory',['Lungs','Windpipe'],'takes in oxygen and removes carbon dioxide'],nervous:['Nervous',['Brain','Spinal cord'],'carries messages and controls the body'],skeletal:['Skeletal',['Skull','Ribs'],'supports and protects the body']};
const POS={Mouth:[100,50],Stomach:[115,135],'Small intestine':[100,165],'Large intestine':[80,175],Heart:[108,105],'Blood vessels':[70,130],Lungs:[90,100],Windpipe:[100,75],Brain:[100,22],'Spinal cord':[100,140],Skull:[118,25],Ribs:[125,105]};
R('bodylab',c=>{const o=c.opts;let sys=o.system||'digestive',found=new Set();const W=200,H=240,s=c.svg(W,H,'Body systems');c.el('ellipse',{cx:100,cy:25,rx:22,ry:24,class:'lab-body'},s);c.el('rect',{x:62,y:52,width:76,height:150,rx:30,class:'lab-body'},s);
 const dots={};Object.entries(POS).forEach(([k,[x,y]])=>dots[k]=c.el('circle',{cx:x,cy:y,r:7,class:'lab-organ'},s));
 const draw=()=>{const [nm,org,job]=SYS[sys];Object.entries(dots).forEach(([k,d])=>d.setAttribute('class','lab-organ'+(found.has(k)?' on':'')));
  c.say(`${nm} system: it ${job}. Found ${[...found].filter(k=>org.includes(k)).length} of ${org.length} organs${found.size?`: ${[...found].join(', ')}`:''}.${[...found].some(k=>!org.includes(k))?' One of those belongs to a different system.':''}`);L.check()};
 const all=()=>SYS[sys][1].every(k=>found.has(k))&&[...found].every(k=>SYS[sys][1].includes(k));
 const L=VIS.lab(c,[{goal:`Find every organ of the ${SYS[sys][0].toLowerCase()} system (and nothing else).`,test:all,set:()=>{found.clear();draw()},win:'Organs work together as a system.'},{goal:'Switch to the circulatory system and find its organs.',test:()=>sys==='circulatory'&&all(),set:()=>{found.clear();draw()}},{goal:'Find the organs of the respiratory system.',test:()=>sys==='respiratory'&&all(),set:()=>{found.clear();draw()}}]);
 c.btn('Next system',()=>{const k=Object.keys(SYS);sys=k[(k.indexOf(sys)+1)%k.length];found.clear();draw()});Object.keys(POS).forEach(k=>c.btn(k,()=>{found.has(k)?found.delete(k):found.add(k);draw()},'ghost'));c.cueEl=s;draw()});
})();
