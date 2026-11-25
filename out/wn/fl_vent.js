/* Flagship – deep-sea life without sunlight (Science, ages 11-13; KS3 photosynthesis contrast, NGSS MS-LS2-3, Ocean
   Literacy principle 5). Lower a probe and watch sunlight fade to nothing above a hydrothermal vent at 2,500 m; sort facts
   into photosynthesis or chemosynthesis; answer where each vent animal gets its food and watch the food web grow from the
   bacteria; flip the Sun and the vent off and on to see which living things depend on which; then pick the ocean worlds
   where vents like Earth's might exist. Data and drawings: vent_art.js. */
(()=>{const V=VENT;
VIS.reg('flagvent',c=>{let A,pad,cq,qn=-1,gen=0,hold=false;const Z={};
const STEPS=['dive','sort','feed','switch','worlds','quiz'],now=()=>STEPS[A.step];
const hit=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
let BOX=[];
/* ---------- text helpers on the canvas ---------- */
const big=n=>A.narrow?n:Math.round(n*1.1),ink=()=>A.col.dark?'#f8fafc':'#0f172a';
function lines(t,max,font){const g=A.ctx;g.font=font;const out=[];let cur='';String(t).split(' ').forEach(w=>{const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx});if(cur)out.push(cur);return out}
function banner(t,tone){const g=A.ctx,f=`800 ${big(16)}px system-ui,sans-serif`,L=lines(t,A.W-36,f),lh=big(16)*1.28;let h=L.length*lh+14;
 g.fillStyle=tone==='good'?(A.col.dark?'#14532d':'#dcfce7'):tone==='bad'?(A.col.dark?'#7f1d1d':'#fee2e2'):(A.col.dark?'#1e293b':'#ffffff');V.rr(g,8,8,A.W-16,h,10);g.fill();
 g.strokeStyle=tone==='good'?'#15803d':tone==='bad'?'#b91c1c':'#64748b';g.lineWidth=tone?2.5:1.2;g.stroke();g.fillStyle=ink();g.textAlign='left';g.textBaseline='top';L.forEach((s,i)=>g.fillText(s,18,15+i*lh));
 let y=8+h+6;if(Z.msg){const f2=`700 ${big(14)}px system-ui,sans-serif`,M=lines(Z.msg,A.W-36,f2).slice(0,4);g.font=f2;g.fillStyle=Z.bad?(A.col.dark?'#fca5a5':'#b91c1c'):(A.col.dark?'#86efac':'#15803d');M.forEach((s,i)=>g.fillText(s,18,y+i*big(14)*1.3));y+=M.length*big(14)*1.3+6}return y}
function tile(b,t,st){const g=A.ctx;st=st||{};g.fillStyle=st.bad?'#fee2e2':st.good?'#dcfce7':st.on?'#dbeafe':'#ffffff';V.rr(g,b.x,b.y,b.w,b.h,12);g.fill();
 g.strokeStyle=st.bad?'#b91c1c':st.good?'#15803d':st.on?'#1d4ed8':'#64748b';g.lineWidth=st.bad||st.good||st.on?3.5:1.6;g.stroke();if(!t)return;
 let n=big(st.n||15),L;for(;;){L=lines(t,b.w-14,`800 ${n}px system-ui,sans-serif`);if(L.length*n*1.2<=b.h-8||n<=11)break;n--}
 g.font=`800 ${n}px system-ui,sans-serif`;g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,b.x+b.w/2,b.y+b.h/2+(i-(L.length-1)/2)*n*1.2))}
function grid(list,y,cols,maxH,st){const gp=10,rows=Math.ceil(list.length/cols),w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-y-8)/rows-gp,maxH);
 return list.map((t,i)=>{const b={i,x:8+(i%cols)*(w+gp),y:y+Math.floor(i/cols)*(h+gp),w,h};tile(b,t,st?st(i):{});return b})}
/* ---------- 1. dive: sunlight fades with depth ---------- */
function depthTo(m){const d=Z.dv;d.m=Math.max(0,Math.min(V.MAX,Math.round(m/100)*100));if(d.m>d.deep)d.deep=d.m;A.sound.tick();
 note(`${d.m.toLocaleString('en-GB')} m, ${V.zone(d.m).toLowerCase()}: ${V.lightWords(d.m)}.`+(d.m>=V.VENT_DEPTH?' You reached the vent: hot, black water gushing from a chimney, and animals everywhere.':''),false)}
function drawDive(){const d=Z.dv,ok=d.m>=V.VENT_DEPTH,y0=banner(ok?V.DONE[0]:'Drag the probe down to the seafloor vent at 2,500 m.',ok?'good':'');
 const r={x:8,y:y0,w:A.W-16,h:A.H-y0-8};Z.col=V.column(A.ctx,r,d.m,A.col.dark);Z.colR=r}
/* ---------- 2. sort: two ways to make food ---------- */
function bin(k){const s=Z.so;if(s.i>=V.SORT.length)return;const [t,ans]=V.SORT[s.i];
 if(k===ans){s.i++;s.no=-1;A.sound.pop();return note(`Yes: ${t.toLowerCase()} goes with ${k?'chemosynthesis':'photosynthesis'}. `+V.SORTWHY[s.i-1],false)}
 s.no=k;A.sound.miss();note(`Not ${k?'chemosynthesis':'photosynthesis'}. `+V.SORTWHY[s.i],true)}
function drawSort(){const s=Z.so,ok=s.i>=V.SORT.length,y0=banner(ok?V.DONE[1]:`Which way of making food? Card ${s.i+1} of ${V.SORT.length}.`,ok?'good':Z.bad?'bad':'');
 const g=A.ctx,mid=y0+Math.min(90,(A.H-y0)*.3);if(!ok)tile({x:A.W*.16,y:y0,w:A.W*.68,h:mid-y0-8},V.SORT[s.i][0],{on:1,n:17});
 BOX=grid(['',''],mid+6,2,A.H-mid-14,i=>({bad:s.no===i}));const NAMES=[['Photosynthesis','needs light'],['Chemosynthesis','needs chemicals']];
 BOX.forEach((b,k)=>{g.textAlign='center';g.textBaseline='top';g.fillStyle='#0f172a';let n=big(16);g.font=`800 ${n}px system-ui,sans-serif`;while(g.measureText(NAMES[k][0]).width>b.w-10&&n>11){n--;g.font=`800 ${n}px system-ui,sans-serif`}g.fillText(NAMES[k][0],b.x+b.w/2,b.y+12);g.font=`600 ${big(13)}px system-ui,sans-serif`;g.fillStyle='#334155';g.fillText('('+NAMES[k][1]+')',b.x+b.w/2,b.y+16+n*1.2)});
 const done=V.SORT.slice(0,s.i);BOX.forEach((b,k)=>{const f=`700 ${big(12)}px system-ui,sans-serif`;let y=b.y+big(16)*1.2+big(13)*1.4+30;g.fillStyle='#15803d';g.textAlign='center';g.textBaseline='top';done.filter(x=>x[1]===k).forEach(x=>lines('\u2713 '+x[0],b.w-12,f).forEach(s=>{g.font=f;g.fillText(s,b.x+b.w/2,y);y+=big(12)*1.25}))});
 BOX.forEach(b=>b.k=b.i)}
/* ---------- 3. feed: build the vent food web ---------- */
const feedOpts=i=>{const F=V.FEED[i],all=[[F.a,'ok'],...F.o],k=(i+1)%3;return all.slice(k).concat(all.slice(0,k))};
function answer(j){const f=Z.fd;if(f.i>=V.FEED.length)return;const F=V.FEED[f.i],[t,tag]=feedOpts(f.i)[j];
 if(tag==='ok'){f.links.push([F.from,F.to]);if(F.also!=null)f.links.push([F.also,F.to]);f.i++;f.no=-1;A.sound.pop();return note(`Right: ${t.toLowerCase()}. New arrow: ${V.BEINGS[F.from]} \u2192 ${F.who}.`,false)}
 f.no=j;A.sound.miss();note(slip(tag),true)}
function drawFeed(){const f=Z.fd,ok=f.i>=V.FEED.length,F=V.FEED[Math.min(f.i,V.FEED.length-1)],y0=banner(ok?V.DONE[2]:F.q,ok?'good':Z.bad?'bad':'');
 const h=ok?A.H-y0-8:(A.H-y0)*(A.narrow?.46:.55),r={x:8,y:y0,w:A.W-16,h};V.floor(A.ctx,r,f.links);if(ok){BOX=[];return}
 BOX=grid(feedOpts(f.i).map(x=>x[0]),r.y+r.h+8,A.narrow?1:3,80,i=>({bad:f.no===i}))}
/* ---------- 4. switches: what depends on what ---------- */
function flip(k){const w=Z.sw;w[k]=!w[k];if(!w[k])w.tried[k]=1;A.sound.tick();const P=V.pops(w.sun,w.vent);
 if(!w.vent)return note('Vent off: no hydrogen sulfide, so the bacteria stop making food. Tube worms, clams and crabs starve. Plankton up top do not notice.',false);
 if(!w.sun)return note('Sun off: sunlit plankton die, and animals that eat falling food go hungry. The vent bacteria carry on for now. But they react sulfide with oxygen, and that oxygen was made by photosynthesis, so over a long time the vent would suffer too.',false);
 note(`Sun and vent both on: everything is fed. Vent bacteria at ${Math.round(P.bacteria*100)}%.`,false)}
function drawSwitch(){const w=Z.sw,ok=w.tried.sun&&w.tried.vent,y0=banner(ok?V.DONE[3]:'Turn the Sun off, then the vent off. Tap a switch.',ok?'good':''),g=A.ctx;
 BOX=grid([`Sun: ${w.sun?'ON':'OFF'}`,`Vent: ${w.vent?'ON':'OFF'}`],y0,2,58,i=>({on:i?w.vent:w.sun}));BOX[0].k='sun';BOX[1].k='vent';
 const P=V.pops(w.sun,w.vent),keys=Object.keys(P),top=BOX[0].y+BOX[0].h+12,rh=Math.min(46,(A.H-top-8)/keys.length),lw=A.narrow?A.W*.44:A.W*.36;
 keys.forEach((k,i)=>{const y=top+i*rh;g.font=`700 ${big(13)}px system-ui,sans-serif`;g.fillStyle=ink();g.textAlign='left';g.textBaseline='middle';lines(V.POPLABEL[k],lw-12,g.font).slice(0,2).forEach((s,j,a)=>g.fillText(s,12,y+rh/2+(j-(a.length-1)/2)*big(13)*1.15));
  const bx=lw,bw=A.W-lw-16;g.fillStyle=A.col.dark?'#334155':'#e2e8f0';V.rr(g,bx,y+rh*.22,bw,rh*.56,6);g.fill();g.fillStyle=P[k]>.5?'#15803d':'#b91c1c';V.rr(g,bx,y+rh*.22,Math.max(8,bw*P[k]),rh*.56,6);g.fill()})}
/* ---------- 5. worlds: where else could vents be? ---------- */
function world(i){const o=Z.wo,W=V.WORLDS[i];if(o.found.includes(i))return;A.sound[W.ok?'pop':'miss']();if(W.ok){o.found.push(i);o.no=-1}else o.no=i;note(W.why,!W.ok)}
function drawWorlds(){const o=Z.wo,ok=o.found.length>=2,y0=banner(ok?V.DONE[4]:`Tap the ocean worlds that might have vents. Found ${o.found.length} of 2.`,ok?'good':Z.bad?'bad':'');
 BOX=grid(V.WORLDS.map(()=>''),y0,A.narrow?2:4,150,i=>({good:o.found.includes(i),bad:o.no===i}));
 BOX.forEach((b,i)=>{const s=Math.min(b.w,b.h)*.3;V.globe(A.ctx,V.WORLDS[i],b.x+b.w/2,b.y+b.h*.42,s);A.ctx.font=`800 ${big(14)}px system-ui,sans-serif`;A.ctx.fillStyle='#0f172a';A.ctx.textAlign='center';A.ctx.fillText(V.WORLDS[i].n,b.x+b.w/2,b.y+b.h*.82)})}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f1f5f9';g.fillRect(0,0,A.W,A.H);const m=now();
 if(m==='quiz'){const y0=banner('Challenge: life without sunlight','good');V.floor(g,{x:8,y:y0,w:A.W-16,h:A.H-y0-8},[[0,1],[0,2],[0,3],[1,3],[3,4]]);return}
 ({dive:drawDive,sort:drawSort,feed:drawFeed,switch:drawSwitch,worlds:drawWorlds})[m]();A.fx.draw(g)}
function down(p){const m=now();if(m==='dive'&&Z.col&&Math.abs(p.y-Z.col.py)<Z.col.s*2.2&&Math.abs(p.x-Z.col.px)<Z.col.s*2.5){hold=true;return true}
 const b=BOX.find(q=>hit(p,q));if(!b)return false;if(m==='sort')bin(b.k);if(m==='feed')answer(b.i);if(m==='switch')flip(b.k);if(m==='worlds')world(b.i);return false}
function move(p){if(!hold||now()!=='dive')return;const r=Z.colR;depthTo((p.y-r.y)/r.h*V.MAX)}
function up(){hold=false}
function reset(){gen++;hold=false;for(const k in Z)delete Z[k];Object.assign(Z,{dv:{m:0,deep:0},so:{i:0,no:-1},fd:{i:0,no:-1,links:[]},sw:{sun:true,vent:true,tried:{}},wo:{found:[],no:-1},msg:null,bad:false,test:()=>{}})}
function note(t,bad){Z.msg=t;Z.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();Z.test()}
const doneWhen=(i,ok)=>()=>{if(A.step===i&&!A.isDone&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(V.DONE[i]+A.reveal(i))};
function enter(i,ok){reset();c.say(V.DESC[i]);A.cv.setAttribute('aria-label',V.DESC[i]);Z.test=doneWhen(i,ok);buttons();A.redraw()}
function demo(i,acts){steps[i].go();const my=gen;acts.reduce((t,[ms,f])=>{t+=ms;setTimeout(()=>{if(my===gen)f()},t);return t},0)}
function buttons(){if(!pad)return;pad.innerHTML='';const m=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='dive'){B('Down 500 m',()=>depthTo(Z.dv.m+500),'Lower the probe 500 metres');B('Up 500 m',()=>depthTo(Z.dv.m-500),'Raise the probe 500 metres')}
 if(m==='sort'&&Z.so.i<V.SORT.length){B('Photosynthesis',()=>bin(0),`${V.SORT[Z.so.i][0]}: photosynthesis`);B('Chemosynthesis',()=>bin(1),`${V.SORT[Z.so.i][0]}: chemosynthesis`)}
 if(m==='feed'&&Z.fd.i<V.FEED.length)feedOpts(Z.fd.i).forEach(([t],j)=>B(t,()=>answer(j)));
 if(m==='switch'){B(`Sun ${Z.sw.sun?'off':'on'}`,()=>flip('sun'),`Turn the Sun ${Z.sw.sun?'off':'on'}`);B(`Vent ${Z.sw.vent?'off':'on'}`,()=>flip('vent'),`Turn the vent ${Z.sw.vent?'off':'on'}`)}
 if(m==='worlds')V.WORLDS.forEach((W,i)=>{if(!Z.wo.found.includes(i))B(W.n,()=>world(i),`Could ${W.n} have vents?`)})}
const steps=[
{h:'Into the dark',p:V.TXT[0],predict:{q:'The vent is 2,500 m down. How much sunlight reaches it?',opts:['A little, enough for algae','None at all'],ans:1},task:'Take the probe down to the vent at 2,500 m',
 show:()=>demo(0,[0,1,2,3,4,5].map(k=>[420,()=>depthTo(k*500)])),go:()=>enter(0,()=>Z.dv.deep>=V.VENT_DEPTH)},
{h:'Food from chemicals',p:V.TXT[1],predict:{q:'What do vent bacteria use for energy?',opts:['The heat of the vent','Chemicals like hydrogen sulfide'],ans:1},task:'Sort all 6 cards',
 show:()=>demo(1,V.SORT.map(([,k])=>[380,()=>bin(k)])),go:()=>enter(1,()=>Z.so.i>=V.SORT.length)},
{h:'Who feeds whom',p:V.TXT[2],predict:{q:'Giant tube worms have no mouth or gut. How do they eat?',opts:['They catch falling food with their plume','Bacteria inside them make food'],ans:1},task:'Answer all 4 food questions',
 show:()=>demo(2,V.FEED.map((_,i)=>[650,()=>answer(feedOpts(i).findIndex(x=>x[1]==='ok'))])),go:()=>enter(2,()=>Z.fd.i>=V.FEED.length)},
{h:'Switch it off',p:V.TXT[3],predict:{q:'If the Sun went dark, what would happen at the vent first?',opts:['Vent life dies at once','Vent life carries on for now'],ans:1},task:'Turn the Sun off and on, then the vent off',
 show:()=>demo(3,[[500,()=>flip('sun')],[900,()=>flip('sun')],[700,()=>flip('vent')]]),go:()=>enter(3,()=>Z.sw.tried.sun&&Z.sw.tried.vent)},
{h:'Other worlds',p:V.TXT[4],task:'Find the 2 ocean worlds',
 show:()=>demo(4,V.WORLDS.map((W,i)=>W.ok?[600,()=>world(i)]:null).filter(Boolean)),go:()=>enter(4,()=>Z.wo.found.length>=2)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.test()});
function slip(t){let m='Vent life is built on bacteria that make food from chemicals, with no light.';
 if(t==='heat')m='Heat is not the energy source. The bacteria get energy from a chemical reaction: hydrogen sulfide with oxygen.';
 if(t==='sun')m='No sunlight reaches 2,500 m. Below about 1,000 m the sea is completely dark.';
 if(t==='plant')m='Plants and seaweed need light, so none grow at the vent. Bacteria are the producers there.';
 if(t==='mouth')m='An adult giant tube worm has no mouth or gut. Its red plume takes in chemicals for the bacteria inside it.';
 if(t==='producer')m='Animals cannot make their own food. At a vent the producers are bacteria, and animals eat them or host them.';
 if(t==='alone')m='Vent bacteria use oxygen dissolved in sea water, and that oxygen comes from photosynthesis. So vents still rely on the Sun in the long run.';
 if(t==='dark')m='There is no light at 2,500 m. Chemosynthesis works because it uses chemicals instead.';
 if(t==='oxygen')m='Oxygen is given out by photosynthesis. Chemosynthesis uses oxygen up and leaves sulfur.';
 if(t==='ocean')m='Neither moon is hot on the surface: they are icy. NASA studies them because each has an ocean on a rocky floor.';
 return m}
function ask(){qn++;const Q=V.QS[qn%V.QS.length],all=[[Q.a,'ok'],...Q.o],k=qn%3,ord=all.slice(k).concat(all.slice(0,k));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}.`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next question \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Deep-sea vent lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
