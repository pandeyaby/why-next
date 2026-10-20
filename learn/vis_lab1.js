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
