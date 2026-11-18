/* Flagship: Reversible reactions and dynamic equilibrium (ages 16-18; AQA A-level Chemistry 3.1.6, OCR A 3.2.3: in a
   closed system at equilibrium the forward and reverse reactions go on at equal rates and concentrations stay constant).
   A ⇌ B particles in a flask (first order each way): run from all A, find where the rates meet, run from all B, tag a
   particle to see it keep swapping, open the flask so B escapes, then change the rate constants. Button twins throughout. */
(()=>{
VIS.reg('flagequil',c=>{let A,pad,box,qn=-1,streak=0;const Z={},N=40;
const mode=()=>['run','rates','reverse','tag','open','free','chal'][A.step];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${Math.round(px*(A.narrow?1:1.1))}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-12)}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,pct=v=>Math.round(v*100)+'%';
function lay(){const W=A.W,H=A.H;return A.narrow?{f:{x:12,y:H*.12,w:W-24,h:H*.35},g:{x:46,y:H*.58,w:W-60,h:H*.3}}:{f:{x:14,y:H*.1,w:W*.42,h:H*.76},g:{x:W*.54,y:H*.1,w:W*.42,h:H*.74}}}
/* ---------- model ---------- */
const nB=()=>Z.p.filter(q=>!q.gone&&q.s).length,nA=()=>Z.p.filter(q=>!q.gone&&!q.s).length;
const xEq=()=>Z.kf/(Z.kf+Z.kb);
function flip(q){q.s=1-q.s;q.f=1;if(q===Z.tagged){Z.flips++;Z.want()}}
const any=(s,pref)=>{const L=Z.p.filter(q=>!q.gone&&q.s===s);if(pref&&pref.s===s&&!pref.gone&&Math.random()<.35)return pref;return L[Math.floor(Math.random()*L.length)]};
function stepODE(dt){Z.x+=(Z.kf*(1-Z.x)-Z.kb*Z.x)*dt;const want=Math.round(Z.x*N);while(nB()<want)flip(any(0));while(nB()>want)flip(any(1));
 Z.ex+=Z.kb*Z.x*N*dt*.5;while(Z.ex>=1){Z.ex--;const a=any(0,Z.tagged),b=any(1,Z.tagged);if(a&&b){flip(a);flip(b);Z.swaps++}}}
function stepDice(dt){for(const q of Z.p){if(q.gone)continue;const r=Math.random();if(q.s===0&&r<Z.kf*dt)flip(q);else if(q.s===1){if(Z.lid&&q.v<.3&&Math.random()<3*dt){q.gone=1;Z.lost++}else if(r<Z.kb*dt)flip(q)}}}
function sim(dt){let left=dt;while(left>0){const h=Math.min(.02,left);left-=h;Z.t+=h;Z.stoch?stepDice(h):stepODE(h);
  if(Z.t>=Z.next&&Z.t<=8.05){Z.next+=.05;Z.hist.push([Z.t,Z.stoch?nA()/N:1-Z.x,Z.stoch?nB()/N:Z.x])}}
 for(const q of Z.p){q.u+=q.du*dt;q.v+=q.dv*dt;if(q.u<.04||q.u>.96)q.du*=-1;if(q.v<.04&&!q.gone){if(Z.lid&&q.s){q.gone=1;Z.lost++}else q.dv=Math.abs(q.dv)}if(q.v>.96)q.dv=-Math.abs(q.dv);q.u=Math.max(.04,Math.min(.96,q.u));q.f=Math.max(0,q.f-dt*1.5);if(q.gone)q.v-=dt*.8}
 Z.want()}
/* ---------- drawing ---------- */
function flask(g,C){const{f}=lay(),R=Math.max(5,Math.min(f.w,f.h)/30);A.paint.rrect(f.x,f.y,f.w,f.h,16);g.fillStyle=A.alpha(C.cy,.06);g.fill();g.lineWidth=3;g.strokeStyle=A.alpha(C.tx,.7);g.stroke();
 const lw=f.w*.3,ly=f.y-(Z.lid?10:2);g.fillStyle=Z.lid?A.alpha(C.rd,.5):A.alpha(C.tx,.45);g.fillRect(f.x+f.w/2-lw/2,ly-8,lw,10);if(Z.lid)ink('open',f.x+f.w/2+lw/2+22,ly-3,11,{w:800});
 for(const q of Z.p){const x=f.x+q.u*f.w,y=f.y+q.v*f.h;if(y<f.y-40)continue;const col=q.s?C.am:C.cy;A.paint.ball(x,y,R,col);
  if(q.f>0){g.strokeStyle=A.alpha(C.gr,q.f);g.lineWidth=2;g.beginPath();g.arc(x,y,R+4,0,7);g.stroke()}
  if(q===Z.tagged){g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.arc(x,y,R+6,0,7);g.stroke()}}
 ink(`A ${nA()}   ⇌   B ${nB()}`+(Z.lost?`   escaped ${Z.lost}`:''),f.x+f.w/2,f.y+f.h+14,13,{w:900});
 [[C.cy,'A',f.x+14],[C.am,'B',f.x+f.w-34]].forEach(([col,n,x])=>{A.paint.ball(x,f.y-12,6,col);ink(n,x+10,f.y-12,12,{w:900,al:'left'})})}
function axes(g,C,r,ymax,lab){g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.stroke();
 ink(lab,r.x-4,r.y-8,11,{al:'left',w:800});ink('time / s',r.x+r.w,r.y+r.h+12,10,{al:'right'});ink('0',r.x-8,r.y+r.h,10);ink(ymax,r.x-14,r.y+6,10)}
const X=(r,t)=>r.x+t/8*r.w,Y=(r,v,m)=>r.y+r.h-v/(m||1)*r.h;
function line(g,r,pts,col,m,dash){g.strokeStyle=col;g.lineWidth=3;g.setLineDash(dash?[6,5]:[]);g.beginPath();pts.forEach(([t,v],i)=>i?g.lineTo(X(r,t),Y(r,v,m)):g.moveTo(X(r,t),Y(r,v,m)));g.stroke();g.setLineDash([])}
function exact(t,x0){const k=Z.kf+Z.kb,xe=xEq();return xe+(x0-xe)*Math.exp(-k*t)}
function graph(g,C){const{g:r}=lay(),m=mode();
 if(m==='rates'){const top={x:r.x,y:r.y,w:r.w,h:r.h*.42},bot={x:r.x,y:r.y+r.h*.58,w:r.w,h:r.h*.42},T=[...Array(81)].map((_,i)=>i/10);
  axes(g,C,top,'100%','amount');axes(g,C,bot,'0.6','rate');line(g,top,T.map(t=>[t,1-exact(t,0)]),C.cy);line(g,top,T.map(t=>[t,exact(t,0)]),C.am);
  line(g,bot,T.map(t=>[t,Z.kf*(1-exact(t,0))]),C.cy,.6);line(g,bot,T.map(t=>[t,Z.kb*exact(t,0)]),C.am,.6,1);
  const cx=X(r,Z.cur);g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(cx,r.y);g.lineTo(cx,r.y+r.h);g.stroke();
  const x=exact(Z.cur,0);ink(`t = ${Z.cur.toFixed(1)} s   forward ${(Z.kf*(1-x)).toFixed(2)}   backward ${(Z.kb*x).toFixed(2)}`,r.x+r.w/2,r.y+r.h+28,11,{w:800,max:r.w+40});
  ink('forward —   backward - -',bot.x+bot.w-2,bot.y+8,10,{al:'right',w:800});return}
 axes(g,C,r,'100%','amount');if(Z.ghost)line(g,r,Z.ghost.map(([t,a,b])=>[t,b]),A.alpha(C.am,.6),1,1);
 line(g,r,Z.hist.map(([t,a])=>[t,a]),C.cy);line(g,r,Z.hist.map(([t,a,b])=>[t,b]),C.am);
 if(!Z.stoch){const x=Z.x,rf=Z.kf*(1-x),rb=Z.kb*x,bw=r.w*.4;[[rf,'forward',C.cy],[rb,'backward',C.am]].forEach(([v,n,col],i)=>{const y=r.y+r.h+26+i*16;g.fillStyle=col;g.fillRect(r.x+70,y-5,bw*v/Math.max(Z.kf,Z.kb),10);ink(n,r.x+64,y,10,{al:'right',w:800})})}
 if(m==='free')ink(`kf ${Z.kf.toFixed(1)}  kb ${Z.kb.toFixed(1)}  →  B at equilibrium ${pct(xEq())}`,r.x+r.w/2,r.y-8,11,{w:800,max:r.w})}
function paint(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(m==='chal'){ink('Dynamic equilibrium',W/2,H*.3,20,{w:900});ink('Closed system · equal rates · constant amounts',W/2,H*.5,13);A.fx.draw(g);return}
 flask(g,C);graph(g,C);ink(Z.msg||'',W/2,A.narrow?H*.035:H*.035,12,{w:800,max:W-12});A.fx.draw(g)}
/* ---------- actions ---------- */
function tell(t){Z.msg=t;speak(t);paint2()}
function go(sp){Z.run=!Z.run||!!sp;if(sp)Z.speed=sp;A.sound.tick();if(Z.run)A.kick();paint2()}
function nudge(d){if(mode()!=='rates')return;Z.cur=Math.max(0,Math.min(8,Math.round((Z.cur+d)*10)/10));const x=exact(Z.cur,0),gap=Z.kf*(1-x)-Z.kb*x;Z.p.forEach((q,i)=>q.s=+((i*7)%N<Math.round(x*N)));
 Z.msg=gap>.012?`At ${Z.cur.toFixed(1)} s forward is still faster, so B is still rising.`:`From about 4 s the rates are equal: B ${pct(x)}, A ${pct(1-x)}, both steady.`;speak(Z.msg);A.redraw();Z.want()}
function lidSet(v){Z.lid=v;tell(v?'Open: B gas can escape from the top.':'Closed again.');if(v&&!Z.run)go()}
function tag(q){if(mode()!=='tag')return;Z.tagged=q;Z.flips=0;A.sound.pop();tell(`Tagged a particle of ${q.s?'B':'A'}. Watch it.`);if(!Z.run)go()}
/* ---------- buttons ---------- */
function paint2(){A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||t},pad,t).onclick=f};
 if(m==='rates'){b('◀ Earlier',()=>nudge(-.5),'Move the time line 0.5 s earlier');b('Later ▶',()=>nudge(.5),'Move the time line 0.5 s later');return}
 b(Z.run?'Pause':'Run',()=>go(),Z.run?'Pause the reaction':'Run the reaction');
 if(m==='tag')b('Tag a particle',()=>tag(Z.p.find(q=>!q.gone)),'Tag one particle to follow it');
 if(m==='open')b(Z.lid?'Close the flask':'Open the flask',()=>lidSet(!Z.lid),'Open or close the flask');
 if(m==='free'){b('kf up',()=>setK(.2,0),'Make the forward rate constant bigger');b('kf down',()=>setK(-.2,0),'Make the forward rate constant smaller');b('kb up',()=>setK(0,.2),'Make the backward rate constant bigger');b('kb down',()=>setK(0,-.2),'Make the backward rate constant smaller');b('Restart from all A',()=>{reset(0,{kf:Z.kf,kb:Z.kb});paint2()},'Restart with only A')}}
function setK(df,db){const kf=Math.max(.2,Math.min(1,Math.round((Z.kf+df)*10)/10)),kb=Math.max(.2,Math.min(1,Math.round((Z.kb+db)*10)/10));reset(Z.x,{kf,kb});
 tell(`kf ${Z.kf.toFixed(1)}, kb ${Z.kb.toFixed(1)}: at equilibrium kf × [A] = kb × [B], so B ends at ${pct(xEq())}.`);if(!Z.run)go()}
/* ---------- pointer ---------- */
function down(p){const m=mode(),L=lay();
 if(m==='rates'){if(hit(p,{x:L.g.x-10,y:L.g.y-10,w:L.g.w+20,h:L.g.h+20})){Z.cur=Math.max(0,Math.min(8,(p.x-L.g.x)/L.g.w*8));nudge(0);return true}return false}
 if(hit(p,L.f)){if(m==='tag'){let best=null,bd=1e9;for(const q of Z.p){if(q.gone)continue;const d=Math.hypot(L.f.x+q.u*L.f.w-p.x,L.f.y+q.v*L.f.h-p.y);if(d<bd){bd=d;best=q}}if(best)tag(best)}else go();return false}
 if(m==='open'&&p.y<L.f.y+10&&Math.abs(p.x-(L.f.x+L.f.w/2))<L.f.w*.3)lidSet(!Z.lid);return false}
function move(p){if(mode()==='rates'){const L=lay();Z.cur=Math.max(0,Math.min(8,Math.round((p.x-L.g.x)/L.g.w*80)/10));nudge(0)}}
function up(){}
/* ---------- steps ---------- */
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function reset(x0,o){const k=(Z.k||0)+1;for(const q in Z)if(q!=='k')delete Z[q];
 Object.assign(Z,{k,want:()=>{},kf:.6,kb:.4,x:x0,t:0,next:0,ex:0,swaps:0,flips:0,lost:0,hist:[[0,1-x0,x0]],run:false,speed:1,stoch:false,lid:false,tagged:null,cur:1,ghost:null,msg:'',
  p:[...Array(N)].map((_,i)=>({u:.08+((i*37)%97)/97*.84,v:.08+((i*61)%89)/89*.84,du:((i*13)%7-3)*.05+.02,dv:((i*29)%9-4)*.04+.02,s:0,f:0}))},o||{});
 const want=Math.round(x0*N);for(let i=0;i<want;i++)Z.p[(i*7)%N].s=1}
function auto(n,f){steps[n].go();setTimeout(()=>{if(A.step===n)f()},A.reduced()?30:300)}
const steps=[
{h:'A turns into B, B turns into A',p:'A ⇌ B in a closed flask. A turns into B, and B turns back into A. Start with only A.',
 predict:{q:'Once the amounts stop changing, what are the two reactions doing?',opts:['Both still going, at equal rates','Both have stopped','Only the forward one is still going'],ans:0},task:'Run until the amounts stop changing',
 show:()=>auto(0,()=>go(4)),
 go:()=>{reset(0,{msg:'Press Run, or tap the flask.'});speak('Only A. Run the reaction.');buttons();Z.want=finish(0,()=>Z.t>=5,'The amounts are steady at 60% B, but green flashes show particles still reacting both ways.')}},
{h:'Where the rates meet',p:'Forward rate falls as A is used up. Backward rate rises as B builds up. Find where they become equal.',
 predict:{q:'At equilibrium, how do the amounts of A and B compare?',opts:['Constant, but not equal','Always equal','Both zero'],ans:0},task:'Drag the time line to where the rates are equal',
 show:()=>auto(1,()=>{Z.cur=4.5;nudge(0)}),
 go:()=>{reset(0,{cur:1,msg:'Drag the purple line along the graph.'});speak('Drag the time line.');buttons();Z.want=finish(1,()=>Z.cur>=3.9,'Equal rates, constant amounts: 60% B and 40% A, not 50:50.')}},
{h:'Start from the other side',p:'Same flask, same temperature. This time start with only B.',
 predict:{q:'Start with only B. Where does it end up?',opts:['The same mix: 60% B','It stays all B','The reverse: 40% B'],ans:0},task:'Run from all B',
 show:()=>auto(2,()=>go(4)),
 go:()=>{const gh=[...Array(81)].map((_,i)=>[i/10,0,.6-.6*Math.exp(-i/10)]);reset(1,{ghost:gh,msg:'Dashed: the run from all A. Press Run.'});speak('Only B. Run it.');buttons();Z.want=finish(2,()=>Z.t>=5,'Same 60% B from either side. The equilibrium mix does not depend on where you start.')}},
{h:'Follow one particle',p:'The flask is at equilibrium: the amounts are steady. Tap one particle to tag it, then watch.',
 predict:{q:'The amounts are steady. Is any A still turning into B?',opts:['Yes: particles keep swapping both ways','No: the reaction has stopped','Only B is turning into A'],ans:0},task:'Tag a particle and see it change twice',
 show:()=>auto(3,()=>{tag(Z.p[3]);go(3)}),
 go:()=>{reset(.6,{msg:'Tap a particle to tag it.'});speak('At equilibrium. Tap a particle.');buttons();Z.want=finish(3,()=>Z.tagged&&Z.flips>=2,'It changed A → B → A while the totals stayed the same. That is what dynamic means.')}},
{h:'Open the flask',p:'B is a gas. Equilibrium needs a closed system. Open the flask so B can escape.',
 predict:{q:'Open the flask so B escapes. What happens?',opts:['A keeps turning into B until it is used up','A new 60% B mix forms','The reaction stops at once'],ans:0},task:'Open the flask and run until A is used up',
 show:()=>auto(4,()=>{lidSet(true);go(8)}),
 go:()=>{reset(.6,{stoch:true,msg:'Open the flask, then run.'});speak('Open the flask and run.');buttons();Z.want=finish(4,()=>Z.lid&&nA()===0,'With B escaping, the backward reaction cannot keep up, so the reaction goes to completion.')}},
{h:'Your turn',p:'Change the rate constants kf and kb. At equilibrium kf × [A] = kb × [B], so the mix depends on both.',
 go:()=>{reset(0,{msg:'Change kf or kb, then run.'});speak('Change the rate constants and run.');buttons()}},
{h:'Challenge',p:'',go:()=>{reset(0);ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
/* ---------- challenge ---------- */
function makeQ(){const k=qn%4;
 if(k===0)return{q:'At dynamic equilibrium, the rate of the forward reaction is …',opts:[['equal to the rate of the reverse reaction','ok'],['zero','stop'],['greater than the rate of the reverse reaction','one']]};
 if(k===1)return{q:'At equilibrium, the concentrations of reactants and products are …',opts:[['constant','ok'],['equal to each other','equal'],['both falling','stop']]};
 if(k===2){const P=[[.6,.4],[.3,.7],[.8,.2],[.5,.25]][(qn>>2)%4],x=P[0]/(P[0]+P[1]);
  return{q:`A ⇌ B with kf = ${P[0]} s⁻¹ and kb = ${P[1]} s⁻¹. What percentage is B at equilibrium?`,P,x,opts:[[pct(x),'ok'],[x===.5?'100%':'50%',x===.5?'complete':'equal'],[pct(1-x),'swap']]}}
 return{q:'Which is needed for a dynamic equilibrium?',opts:[['A closed system','ok'],['An open flask','open'],['Equal amounts of reactants and products','equal']]}}
function why(t,Q){let m='Both reactions continue at equal rates, so the amounts stay constant.';
 if(t==='stop')m='The reactions do not stop. At equilibrium both go on, at the same rate, so the amounts do not change.';
 if(t==='one')m='If the forward reaction were faster, B would keep rising. Steady amounts mean the two rates are equal.';
 if(t==='equal')m='Constant does not mean equal. Here the mix is set by kf × [A] = kb × [B], so it is rarely 50:50.';
 if(t==='swap')m=`That swaps A and B. Use kf × [A] = kb × [B]: [B]/[A] = ${Q.P?Q.P[0]+'/'+Q.P[1]:'kf/kb'}, so B is ${Q.x?pct(Q.x):'kf/(kf+kb)'}.`;
 if(t==='complete')m='It does not go to completion in a closed flask. B turns back into A, so both remain.';
 if(t==='open')m='In an open flask a gas escapes and the reaction goes to completion. Equilibrium needs a closed system.';
 return m}
function ask(){qn++;const Q=makeQ(),sh=(qn+1)%3;box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...Q.opts.slice(sh),...Q.opts.slice(0,sh)].forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q)});speak('Challenge: '+Q.q);A.redraw()}
function mark(t,Q){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} in a row.`:'✗ '+why(t,Q))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw:paint,onStep:A=>{box.hidden=A.step!==6;pad.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Equilibrium controls'},w);box=E('div',{class:'fl-chal'},A.below);reset(0);A.gest({down,move,up});
  A.every(dt=>{if(!Z.run||mode()==='rates'||mode()==='chal')return false;sim(dt*Z.speed);return true});buttons()}});
A.start()})})();
