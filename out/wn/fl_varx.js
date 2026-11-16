/* Flagship: variance of a discrete random variable (ages 16–18; A-level Mathematics, MEI / AQA, CCSS HSS-MD.A.2).
   Drag probability mass on 0–4 to hold E(X) while changing Var(X), compute E(X), E(X²) and Var(X) = E(X²) − [E(X)]²
   from a table, check the equivalent Σ (x − μ)² P(X = x) form, and scale and shift with Var(aX + b) = a² Var(X).
   Every drag has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',edge:'#1e293b',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 bar:'#1d4ed8',bar2:'#b91c1c',gold:'#a16207',goldSoft:'#fef3c7',tag:'#7c2d12',mean:'#a16207',grid:'#cbd5e1'};
const V=VXART,r=V.r,S=V.stats;
VIS.reg('flagvarx',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.1));
const tx=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function wrap(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=wrap(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(38),L.length*lh+14);box(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge);
 L.forEach((r,i)=>tx(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=wrap((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-8;
 box(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3);L.forEach((r,i)=>tx(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const mass=()=>G.P.map(n=>n/10),cur=()=>S([0,1,2,3,4],mass());
/* ---- step 0: drag tenths onto 0–4 ---- */
function bars(t,xs,ps,opt){opt=opt||{};const n=xs.length,u=Math.min(z(52),(A.W-40)/n),H=opt.H||z(110),base=t+z(16)+H,ox=(A.W-n*u)/2,mx=Math.max(.5,...ps,opt.mx||0);
 X.strokeStyle=K.grid;X.lineWidth=1;X.beginPath();X.moveTo(ox-4,base);X.lineTo(ox+n*u+4,base);X.stroke();
 G.bx={ox,u,base,H,mx};if(opt.mean!=null){const st=n>1?xs[1]-xs[0]:1,mxp=ox+((opt.mean-xs[0])/st+.5)*u;X.strokeStyle=K.mean;X.lineWidth=2;X.setLineDash([4,3]);X.beginPath();X.moveTo(mxp,base-H-4);X.lineTo(mxp,base+z(20));X.stroke();X.setLineDash([]);tx('μ = '+r(opt.mean,1),mxp,base+z(30),11,K.mean)}
 G.barHit=[];xs.forEach((x,i)=>{const h=ps[i]/mx*H,bx=ox+i*u+4,by=base-h,bw=u-8;box(bx,by,bw,h,opt.col||K.bar,K.edge,1.5,4);tx(r(ps[i],2),bx+bw/2,by-z(10),11,K.ink);tx(String(x),bx+bw/2,base+z(12),13,K.ink);G.barHit.push({x:bx,y:base-H,w:bw,h:H,i})});
 return base+z(opt.mean!=null?42:24)}
function bump(i,d){if(G.won)return;const n=G.P[i]+d;if(n<0||n>10)return;const sum=G.P.reduce((a,b)=>a+b,0)+d-G.P[i];if(sum>10)return miss('The ten tenths are all placed. Take a tenth from another value first.');
 G.P[i]=n;A.sound.tick();G.bad=false;const C=cur();G.msg=`E(X) = ${r(C.m,1)}, Var(X) = ${r(C.v,2)}. ${C.s<1?'Place all 10 tenths (total probability 1).':''}`;checkSpread()}
function checkSpread(){if(G.won)return;const T=V.SPREAD[G.si],C=cur();if(C.s<1)return sync();if(!T.ok(C)){G.bad=false;return sync()}
 G.done.push(`Var ${r(C.v,2)}`);if(G.si===V.SPREAD.length-1){G.won=true;return yes(`Var(X) = ${r(C.v,2)}. The same mean can have no spread, a little spread or as much as the ends allow.`)}
 yes(`Var(X) = ${r(C.v,2)}. Next target.`);G.si++}
function setFromY(i,y){if(G.won)return;const B=G.bx,others=G.P.reduce((a,b)=>a+b,0)-G.P[i];let n=Math.round((B.base-y)/B.H*10);n=Math.max(0,Math.min(10-others,n));
 if(n===G.P[i])return;G.P[i]=n;A.sound.tick();const C=cur();G.bad=false;G.msg=`E(X) = ${r(C.m,1)}, Var(X) = ${r(C.v,2)}.${C.s<.999?' Place all 10 tenths: the total probability must be 1.':''}`;A.redraw()}
/* ---- table steps ---- */
const TQ=()=>V.TABLES[G.ti],AQ=()=>TQ().asks[G.qi];
const order=n=>{const r0=(G.ti+G.qi+1)%n;return[...Array(n)].map((_,j)=>(j+r0)%n)};
function pick(i){if(G.won)return;const [lab,tag]=opts()[i];if(tag!=='ok')return miss(why(tag));G.done.push(lab);
 if(A.step===2){G.won=true;return yes(`${lab}. Squaring first stops the signed deviations cancelling, and it matches E(X²) − μ².`)}
 const lastQ=G.qi===TQ().asks.length-1,lastT=G.ti===(A.step===1?V.TABLES.length-1:0);
 if(lastQ&&(A.step!==1||lastT)){G.won=true;return yes(A.step===1?`${lab}. First E(X) and E(X²), then Var(X) = E(X²) − [E(X)]².`:`${lab}. Squaring first stops the signed deviations cancelling.`)}
 if(lastQ){yes(`${lab}. Now a fair dice.`);G.ti++;G.qi=0;return}yes(`${lab}. Next.`);G.qi++}
function opts(){return A.step===2?V.DEV.opts:AQ().opts}
function tiles(y){const O=opts(),n=O.length,gap=8,w=(A.W-28-gap*(n-1))/n,h=z(36);
 G.tiles=order(n).map((i,j)=>{const x=14+j*(w+gap);box(x,y,w,h,K.goldSoft,K.gold,2,10);tx(O[i][0],x+w/2,y+h/2,14,K.tag);return{x,y,w,h,i}})}
function table(t,T){const n=T.xs.length+1,w=(A.W-32)/n,h=z(28),y0=t+z(8);['',].concat(T.xs.map(String)).forEach((s,i)=>tx(s,16+w*(i+.5),y0+h/2,13,K.ink));
 ['P'].concat(T.pl).forEach((s,i)=>tx(s,16+w*(i+.5),y0+h+h/2,13,K.bar));
 X.strokeStyle=K.grid;X.lineWidth=1;for(let r=0;r<=2;r++){X.beginPath();X.moveTo(16,y0+r*h);X.lineTo(16+n*w,y0+r*h);X.stroke()}
 return y0+2*h+z(10)}
/* ---- deviations ---- */
function devRows(t){const rows=V.DEV.rows,m=V.DEV.m,w=(A.W-32)/5,h=z(26),y0=t+z(4),headR=['x','P','x − μ','(x − μ)²','× P'];
 headR.forEach((s,i)=>tx(s,16+w*(i+.5),y0+h/2,11,K.dim));
 rows.forEach(([x,p],j)=>{const d=x-m,cells=[String(x),r(p,1),r(d,1),r(d*d,2),r(d*d*p,3)];cells.forEach((v,i)=>tx(v,16+w*(i+.5),y0+(j+1.5)*h,12,K.ink))});
 return y0+4*h}
/* ---- scale / shift ---- */
function scalePic(t){const xs=[1,2,3],ps=[.2,.5,.3],ys=xs.map(x=>2*x+5),SX=S(xs,ps),SY=S(ys,ps);
 const b=bars(t,xs,ps,{H:z(56),mean:SX.m,col:K.bar});tx(`X: E = ${r(SX.m,1)}, Var = ${r(SX.v,2)}`,A.W/2,b,12,K.bar);
 const b2=bars(b+z(4),ys,ps,{H:z(56),mean:SY.m,col:K.bar2,mx:.5});tx(`Y = 2X + 5: E = ${G.si||G.won?r(SY.m,1):'?'}, Var = ${G.si>1||G.won?r(SY.v,2):'?'}`,A.W/2,b2,12,K.bar2);return b2+z(10)}
const SCALE=[{q:'E(2X + 5) equals',opts:[['9.2','ok'],['7.1','shiftOnly'],['14.2','timesThen']]},
 {q:'Var(2X + 5) equals',opts:[['1.96','ok'],['5.98','sLinear'],['0.98','sScale']]},
 {q:'Var(X − 4) equals',opts:[['0.49','ok'],['−3.51','shiftVar'],['16.49','shiftVar']]}];
function why(tag){let m=V.WHY[tag]||'Variance is the mean of the squared distances from E(X).';
 if(tag==='shiftOnly')m='Every value is doubled before 5 is added, so E(2X + 5) = 2 × 2.1 + 5 = 9.2. Adding 5 alone gives 7.1.';
 if(tag==='timesThen')m='That is E(2(X + 5)) = 2 × 7.1. For 2X + 5, double first and then add 5: 2 × 2.1 + 5 = 9.2.';
 if(tag==='sLinear')m='Variance does not follow 2 × Var + 5. The +5 shifts every value and changes nothing; the ×2 multiplies Var by 2² = 4: 4 × 0.49 = 1.96.';
 if(tag==='sScale')m='Doubling every value doubles each deviation, so each squared deviation is 4 times as big: Var(2X) = 4 × 0.49 = 1.96, not 2 × 0.49.';
 return m}
function pickScale(i){if(G.won)return;const [lab,tag]=SCALE[G.si].opts[i];if(tag!=='ok')return miss(why(tag));
 G.done.push(lab);if(G.si===SCALE.length-1){G.won=true;return yes(`${lab}. Adding a constant leaves Var unchanged. Multiplying by a multiplies Var by a².`)}yes(`${lab}. Next.`);G.si++}
/* ---- input / draw ---- */
const kind=()=>['spread','table','dev','scale','quiz','chal'][A.step];
function down(p){const k=kind();
 if(k==='spread'&&!G.won){const b=(G.barHit||[]).find(q=>p.x>=q.x-4&&p.x<=q.x+q.w+4&&p.y>=q.y-z(20)&&p.y<=q.y+q.h+z(16));if(!b)return false;G.drag=b.i;setFromY(b.i,p.y);return true}
 if((k==='table'||k==='dev')&&!G.won){const t=(G.tiles||[]).find(r=>hit(p,r));if(t){pick(t.i);return true}}
 if(k==='scale'&&!G.won){const t=(G.tiles||[]).find(r=>hit(p,r));if(t){pickScale(t.i);return true}}return false}
function move(p){if(G.drag!=null)setFromY(G.drag,p.y)}
function up(){if(G.drag!=null){G.drag=null;checkSpread();sync()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='spread'){const T=V.SPREAD[G.si],C=cur();t=head(G.won?'The same mean can have Var = 0, Var = 1 or Var = 4, the biggest this set allows.':T.ask,G.won);
  const b=bars(t+z(10),[0,1,2,3,4],mass(),{H:z(150),mean:C.s?C.m:null,mx:1});tx(`E(X) = ${r(C.m,1)}    Var(X) = ${r(C.v,2)}    ΣP = ${r(C.s,1)}`,A.W/2,b+z(4),13,K.ink)}
 if(k==='table'){const T=TQ();t=head(G.won?'Var(X) = E(X²) − [E(X)]². First square the values, then take the mean.':`${T.name}: ${AQ().q}. Tap the value.`,G.won);const b=table(t,T);if(!G.won)tiles(b+z(8))}
 if(k==='dev'){t=head(G.won?'Σ (x − μ)² P(X = x) is the same number as E(X²) − μ².':'Add the last column: Σ (x − μ)² P(X = x).',G.won);const b=devRows(t);if(!G.won)tiles(b+z(8))}
 if(k==='scale'){t=head(G.won?'Var(aX + b) = a² Var(X). The +b does not change the spread.':SCALE[G.si].q,G.won);const b=scalePic(t);if(!G.won){G.tiles=null;const O=SCALE[G.si].opts,n=O.length,gap=8,w=(A.W-28-gap*(n-1))/n,h=z(34),y=b+z(6);
  G.tiles=order(n).map((i,j)=>{const x=14+j*(w+gap);box(x,y,w,h,K.goldSoft,K.gold,2,10);tx(O[i][0],x+w/2,y+h/2,13,K.tag);return{x,y,w,h,i}})}}
 if(k==='quiz'||k==='chal'){t=head('Variance is the mean of the squared distances from E(X). Scale by a²; a shift leaves it alone.');bars(t,[0,1,2,3,4],[.5,0,0,0,.5],{H:z(90),mean:2,mx:1})}
 foot();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='spread'){const C=cur();d=`Mass in tenths on 0, 1, 2, 3, 4: ${G.P.join(', ')}. E(X) = ${r(C.m,2)}, Var(X) = ${r(C.v,2)}, total probability ${r(C.s,1)}. Target: ${V.SPREAD[G.si].ask}`}
 if(k==='table')d=`Table for ${TQ().name}: values ${TQ().xs.join(', ')}, probabilities ${TQ().pl.join(', ')}. Question: ${AQ().q}. Choices: ${AQ().opts.map(o=>o[0]).join(', ')}.`;
 if(k==='dev')d=`Deviations from μ = 2.1. Choices: ${V.DEV.opts.map(o=>o[0]).join(', ')}.`;
 if(k==='scale')d=`X has E = 2.1 and Var = 0.49. Y = 2X + 5. Question: ${SCALE[G.si].q}. Choices: ${SCALE[G.si].opts.map(o=>o[0]).join(', ')}.`;
 if(k==='quiz')d='Summary picture: probability 0.5 at 0 and 0.5 at 4, mean 2, variance 4.';
 tell((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='spread'&&!G.won)[0,1,2,3,4].forEach(i=>{b(`${i} +`,()=>bump(i,1),`Add a tenth at ${i}`);b(`${i} −`,()=>bump(i,-1),`Take a tenth from ${i}`)});
 if((k==='table'||k==='dev')&&!G.won)order(opts().length).forEach(i=>b(opts()[i][0],()=>pick(i),`Answer ${opts()[i][0]}`));
 if(k==='scale'&&!G.won)order(SCALE[G.si].opts.length).forEach(i=>b(SCALE[G.si].opts[i][0],()=>pickScale(i),`Answer ${SCALE[G.si].opts[i][0]}`));
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,si:0,ti:0,qi:0,done:[],P:[2,2,2,2,2],barHit:[],tiles:null,drag:null})}
const okI=()=>opts().findIndex(o=>o[1]==='ok');
const steps=[
{h:'The same mean, different spread',p:'Variance measures how far the possible values sit from the expected value E(X). If every outcome is the same, the variance is 0.',
predict:{q:'If P(X = 2) = 1, what is Var(X)?',opts:['2','0','4'],ans:1},
task:'Make Var = 0, then the biggest, then Var = 1, all with E(X) = 2',show:()=>{steps[0].go();play(V.SPREAD.map(T=>()=>{G.P=T.P.slice();checkSpread()}),900)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Var 0, then 4, then 1.')}},
{h:'E(X²) minus [E(X)]²',p:'One formula is Var(X) = E(X²) − [E(X)]². Square each value first, take its mean, then subtract the square of the mean.',
predict:{q:'Is E(X²) the same as [E(X)]²?',opts:['Always','Only when Var(X) = 0','Never'],ans:1},
task:'Find E, E(X²) and Var for both tables',show:()=>{steps[1].go();play(V.TABLES.flatMap(T=>T.asks.map(()=>()=>pick(okI()))),550)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'2.1, 4.9, 0.49, then 3.5, 15.17, 1.71.')}},
{h:'Squared deviations',p:'The same variance is the mean of the squared distances from the mean: Var(X) = Σ (x − μ)² P(X = x). The squares stop positive and negative distances cancelling.',
task:'Add the last column',show:()=>{steps[2].go();play([()=>pick(0)],600)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'0.49, the same as E(X²) − μ².')}},
{h:'Scale and shift',p:'Adding a constant moves every value but leaves the spread alone: Var(X + b) = Var(X). Multiplying by a stretches the deviations by a, so Var(aX) = a² Var(X). Together, Var(aX + b) = a² Var(X).',
predict:{q:'If Var(X) = 0.49, what is Var(2X + 5)?',opts:['0.98','5.98','1.96'],ans:2},
task:'Find E(Y), Var(Y) and Var(X − 4)',show:()=>{steps[3].go();play(SCALE.map((_,i)=>()=>pickScale(SCALE[i].opts.findIndex(o=>o[1]==='ok'))),700)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'9.2, 1.96 and 0.49.')}},
{h:'What you found',p:'Variance is the mean of the squared distances from E(X). The two formulae agree. A shift leaves it unchanged; a scale factor a multiplies it by a².',go:()=>{reset();sync()}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=V.bank[qi%V.bank.length],all=[[ans,'ok']].concat(wrongs),rot=qi%3,ord=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.7,tall:1.35,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step>=4;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Variance lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
