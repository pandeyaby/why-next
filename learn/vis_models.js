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
 c.el('rect',{x:100,y:236,width:240,height:16,rx:4,class:'vis-beam'},sc);c.el('rect',{x:150,y:252,width:140,height:40,rx:6,class:'vis-cell'},sc);const rd=c.el('text',{x:220,y:278,'text-anchor':'middle',class:'vis-big'},sc);
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
  const t0=tally(ml),t1=tally(mr),els=[...new Set([...Object.keys(t0),...Object.keys(t1)])];
  tab.innerHTML=`<table><caption class="sr">Atoms before and after</caption><tr><th scope="col">Atom</th><th scope="col">Before</th><th scope="col">After</th></tr>${els.map(e=>`<tr><th scope="row">${e}</th><td>${t0[e]||0}</td><td>${t1[e]||0}</td></tr>`).join('')}</table>`;
  bR.textContent=after?'Undo the reaction':'React';bO.textContent=open?'Seal the flask':'Open the flask';bO.setAttribute('aria-pressed',open);
  c.say(`${after?'After':'Before'}: ${word(after?R:L)}. ${open?'The flask is open':'The flask is sealed'}; the scale reads ${nf(m)} g. ${!open?`Before ${nf(m0)} g, after ${nf(m1)} g: the same atoms (${els.map(e=>`${t0[e]} ${e}`).join(', ')}) just join up differently, so the mass does not change.`:gas.length?`A gas (${gas.map(sub).join(', ')}) can now get ${mass(ml)>mass(mr)?'out':'in'}, so the scale reads ${nf(m0)} g before and ${nf(m1)} g after. Mass is still conserved; some of it is just in the air, off the scale.`:'Nothing here is a gas, so the mass stays the same.'}`)};
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
  meter.textContent=`light meter: ${Math.round(L*100)}%`;star.textContent=k<0||I[k][1]===0?'★':I[k][1]===1?'·':'';
  res.textContent=[0,1,2].map(j=>`${nm[j][0].toUpperCase()+nm[j].slice(1)}: ${I.filter((x,i)=>seen[i]&&x[1]===j).map(x=>x[0]).join(', ')||'—'}`).join('. ')+'.';
  c.say(k<0?'No material yet: all the light reaches the screen. Choose a material to hold in the beam.':`${I[k][0]}: ${Math.round(L*100)}% of the light gets through. ${I[k][1]===0?'You can see clearly through it: transparent.':I[k][1]===1?'Some light gets through but it is scattered, so the picture is blurry: translucent.':'No light gets through, so it makes a shadow: opaque.'}`)};c.cueEl=[tray];draw()});
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
