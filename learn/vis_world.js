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
