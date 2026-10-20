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
