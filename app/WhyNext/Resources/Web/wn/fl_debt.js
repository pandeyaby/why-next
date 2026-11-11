/* Flagship – credit, debt and interest (ages 16–18): watch £1,000 grow at 24.9% APR with interest on interest; try
   paying £1,500 off at the minimum or a fixed amount; reveal two loans' total cost and pick the cheaper; stack four
   "pay in 3" buys against a budget; slide a Plan 5 salary to see what a student loan really costs each month. */
(()=>{const mn=Math.min,mx=Math.max,APR=.249,R=Math.pow(1+APR,1/12)-1,gbp=n=>'£'+Math.round(n).toLocaleString('en-GB');
function payoff(fix){let b=1500,m=0,t=0;const path=[b];while(b>.005&&m<400){const i=b*R;let p=fix||mx(i+b*.01,5);p=mn(p,b+i);b=b+i-p;t+=p;m++;path.push(b)}return{m,t,path}}
const PLANS=[0,40,60,80,100].map(f=>({f,...payoff(f)}));
const pmt=(P,a,n)=>{const r=Math.pow(1+a,1/12)-1;return P*r/(1-Math.pow(1+r,-n))};
const LOANS=[['A','High-street bank',.129,36],['B','Fast online lender',.299,84]].map(([k,nm,a,n])=>{const p=pmt(3000,a,n);return{k,nm,a,n,p,t:p*n}});
const BUYS=[['👟','Trainers',60],['🎧','Headphones',60],['🧥','Jacket',60],['🎮','Game',60]],SPARE=50;
const yrs=m=>{const y=Math.floor(m/12),r=m%12;return(y?y+' yr'+(y>1?'s':''):'')+(y&&r?' ':'')+(r?r+' mo':'')};
VIS.reg('flagdebt',c=>{let A,ctl,chal,ask=-1,streak=0;
const S={tok:0,want:()=>{},m:0,plan:-1,tried:[],open:[],pick:-1,bad:-1,drag:null,cart:[],sal:22000,big:0,seen:{}};
const at=()=>['grow','min','loan','bnpl','plan5','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function say(g,t,x,y,n,k,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y)}
function lines(g,t,x,y,mw,n,k,w){g.font=`${w||600} ${f(n)}px system-ui,sans-serif`;const out=[];let l='';t.split(' ').forEach(z=>{const s=l?l+' '+z:z;if(g.measureText(s).width>mw&&l){out.push(l);l=z}else l=s});out.push(l);
 out.forEach((s,i)=>say(g,s,x,y+(i-(out.length-1)/2)*f(n)*1.25,n,k,w))}
function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||1.5;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const hit=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// layouts
const track=()=>({x:A.W*.1,y:A.H*.9,w:A.W*.8});
const plot=()=>({x:44,y:A.H*.2,w:A.W-60,h:A.H*.52});
const chip=i=>{const w=(A.W-16)/5;return{x:8+i*w+2,y:8,w:w-4,h:A.H*.1}};
const loanBox=i=>A.narrow?{x:8,y:8+i*A.H*.3,w:A.W-16,h:A.H*.27}:{x:8+i*A.W/2,y:8,w:A.W/2-16,h:A.H*.55};
const coinHome=()=>({x:A.W/2,y:A.H*.84});
const buy=i=>{const w=(A.W-16)/4;return{x:8+i*w+3,y:A.H*.74,w:w-6,h:A.H*.2}};
const bar=i=>{const w=(A.W-80)/3;return{x:56+i*w+w*.2,w:w*.6}};
const sizeChip=i=>({x:A.W*.52+i*A.W*.24,y:8,w:A.W*.22,h:A.H*.1});
function track_(g,t,lab0,lab1){const r=track(),C=A.col;g.fillStyle=A.alpha(C.tx,.2);A.paint.rrect(r.x,r.y-5,r.w,10,5);g.fill();
 A.paint.ball(r.x+r.w*t,r.y,f(14),C.vi);say(g,lab0,r.x,r.y+f(22),10,C.tx,700,'left');say(g,lab1,r.x+r.w,r.y+f(22),10,C.tx,700,'right')}
function axes(g,P,ymax,xl,yl){const C=A.col;g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.5;g.beginPath();g.moveTo(P.x,P.y);g.lineTo(P.x,P.y+P.h);g.lineTo(P.x+P.w,P.y+P.h);g.stroke();
 [0,.5,1].forEach(q=>say(g,gbp(ymax*q),P.x-4,P.y+P.h*(1-q),9,C.tx,600,'right'));say(g,xl,P.x+P.w/2,P.y+P.h+f(14),10,C.tx,600);if(yl)say(g,yl,P.x,P.y-f(10),10,C.tx,700,'left')}
function curve(g,P,pts,xmax,ymax,col,w,dash){g.strokeStyle=col;g.lineWidth=w;g.setLineDash(dash||[]);g.beginPath();pts.forEach((v,i)=>{const x=P.x+P.w*i/xmax,y=P.y+P.h*(1-v/ymax);i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();g.setLineDash([])}
function draw(A){const{ctx:g,W,H,col:C}=A,v=at();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){lines(g,'Borrowing costs money. Check the APR, the total you repay and how long it takes.',W/2,H*.45,W*.8,16,C.tx,800);return}
 if(v==='grow'){const P=plot(),m=Math.round(S.m),cmp=[],sim=[];for(let i=0;i<=m;i++){cmp.push(1000*Math.pow(1+R,i));sim.push(1000*(1+APR*i/12))}
  axes(g,P,2000,'months left unpaid','balance owed');curve(g,P,sim,36,2000,A.alpha(C.tx,.6),2,[6,5]);curve(g,P,cmp,36,2000,C.rd,4);
  const b=cmp[m],x=P.x+P.w*m/36,y=P.y+P.h*(1-b/2000);A.paint.ball(x,y,f(6),C.rd);
  say(g,`Month ${m}: owe ${gbp(b)}`,W/2,H*.05,14,C.tx,800);say(g,`— — simple interest only: ${gbp(sim[m])}`,W/2,H*.11,11,C.tx,600);
  track_(g,S.m/36,'0','36 months')}
 if(v==='min'){const P={...plot(),y:A.H*.3,h:A.H*.44};PLANS.forEach((p,i)=>{const r=chip(i),on=S.plan===i;card(g,r,A.alpha(on?C.vi:C.cy,on?.3:.12),on?C.vi:C.tx,on?3:1.5);
   lines(g,i?gbp(p.f)+'/mo':'Minimum',r.x+r.w/2,r.y+r.h/2,r.w-6,11,C.tx,800)});
  axes(g,P,1500,'months (up to 23 years)','balance');S.tried.forEach(i=>{if(i!==S.plan)curve(g,P,PLANS[i].path,280,1500,A.alpha(C.tx,.3),2)});
  if(S.plan>=0){const p=PLANS[S.plan];curve(g,P,p.path,280,1500,S.plan?C.gr:C.rd,4);
   lines(g,`${S.plan?gbp(p.f)+' a month':'Minimum payment'}: clear in ${yrs(p.m)}, pay ${gbp(p.t)} in all (${gbp(p.t-1500)} interest)`,W/2,H*.2,W-24,12,C.tx,800)}
  else say(g,'£1,500 on a card at 24.9% APR. Pick a payment.',W/2,H*.2,12,C.tx,800)}
 if(v==='loan'){LOANS.forEach((L,i)=>{const r=loanBox(i),o=S.open.includes(i),pk=S.pick===i;card(g,r,A.alpha(pk?C.gr:S.bad===i?C.rd:C.cy,pk||S.bad===i?.25:.12),S.bad===i?C.rd:C.tx,S.bad===i||pk?3:1.5);
   say(g,`Loan ${L.k}: ${L.nm}`,r.x+r.w/2,r.y+r.h*.16,12,C.tx,800);say(g,`£3,000 at ${(L.a*100).toFixed(1)}% APR over ${L.n} months`,r.x+r.w/2,r.y+r.h*.38,11,C.tx,600);
   say(g,`£${L.p.toFixed(2)} a month`,r.x+r.w/2,r.y+r.h*.58,14,C.tx,800);say(g,o?`Total repaid ${gbp(L.t)} · cost of credit ${gbp(L.t-3000)}`:'Tap to reveal the total',r.x+r.w/2,r.y+r.h*.8,11,C.tx,o?800:600)});
  const h=S.drag?S.drag:coinHome();if(S.pick<0){A.paint.ball(h.x,h.y,f(22),C.or);say(g,'✓',h.x,h.y,16,'#1f2937',900);say(g,'Drag the tick onto the cheaper loan',W/2,H*.95,11,C.tx,700)}}
 if(v==='bnpl'){const base=A.H*.6,top=A.H*.12,sc=(base-top)/120,lab=['At checkout','Next month','Month after'];
  g.strokeStyle=A.alpha(C.tx,.55);g.lineWidth=1.5;g.beginPath();g.moveTo(40,base);g.lineTo(W-16,base);g.stroke();
  [0,1,2].forEach(k=>{const b=bar(k),d=S.cart.length*20,hh=d*sc;g.fillStyle=d>SPARE?C.rd:C.vi;g.fillRect(b.x,base-hh,b.w,hh);say(g,gbp(d),b.x+b.w/2,base-hh-f(10),12,C.tx,800);lines(g,lab[k],b.x+b.w/2,base+f(16),b.w+20,10,C.tx,700)});
  const yb=base-SPARE*sc;g.strokeStyle=C.gr;g.lineWidth=2.5;g.setLineDash([7,5]);g.beginPath();g.moveTo(40,yb);g.lineTo(W-16,yb);g.stroke();g.setLineDash([]);say(g,'spare £50/mo',W-18,yb-f(9),10,C.tx,800,'right');
  say(g,`Basket: ${S.cart.length} × £60 “pay in 3” · ${S.cart.length?gbp(S.cart.length*60)+' owed in all':'empty'}`,W/2,H*.05,12,C.tx,800);
  BUYS.forEach(([e,nm],i)=>{const r=buy(i),on=S.cart.includes(i);card(g,r,A.alpha(on?C.or:C.cy,on?.25:.12),C.tx);say(g,e,r.x+r.w/2,r.y+r.h*.3,18);say(g,nm,r.x+r.w/2,r.y+r.h*.62,10,C.tx,800);say(g,on?'✓ bought':'£60',r.x+r.w/2,r.y+r.h*.84,10,C.tx,700)})}
 if(v==='plan5'){const s=S.sal,over=mx(0,s-25000),yr=over*.09,P={x:20,y:A.H*.3,w:A.W-40,h:A.H*.1},sx=v=>P.x+P.w*(v-15000)/50000;
  [0,1].forEach(i=>{const r=sizeChip(i),on=S.big===i;card(g,r,A.alpha(on?C.vi:C.cy,on?.3:.12),on?C.vi:C.tx,on?3:1.5);say(g,i?'£60,000':'£45,000',r.x+r.w/2,r.y+r.h/2,11,C.tx,800)});
  say(g,'Loan owed:',A.W*.5,8+A.H*.05,11,C.tx,700,'right');
  g.fillStyle=A.alpha(C.cy,.25);g.fillRect(P.x,P.y,sx(s)-P.x,P.h);g.fillStyle=A.alpha(C.or,.7);g.fillRect(sx(25000),P.y,mx(0,sx(s)-sx(25000)),P.h);
  g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=1;g.strokeRect(P.x,P.y,P.w,P.h);say(g,'0% below',(P.x+sx(25000))/2,P.y-f(10),10,C.tx,700);say(g,'9% above',(sx(25000)+P.x+P.w)/2,P.y-f(10),10,C.tx,700);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(sx(25000),P.y-8);g.lineTo(sx(25000),P.y+P.h+8);g.stroke();say(g,'£25,000 threshold',sx(25000),P.y+P.h+f(16),10,C.tx,800);
  say(g,`Salary ${gbp(s)} a year`,W/2,A.H*.22,14,C.tx,800);
  lines(g,`9% of ${gbp(over)} above the threshold = ${gbp(yr)} a year, about ${gbp(yr/12)} a month`,W/2,A.H*.56,W-30,13,C.tx,800);
  lines(g,`Owing ${S.big?'£60,000':'£45,000'} does not change this. Any balance left after 40 years is written off.`,W/2,A.H*.7,W-30,11,C.tx,600);track_(g,(s-15000)/50000,'£15k','£65k')}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);ctrl();A.redraw()},yep=t=>{A.sound.pop();speak(t);ctrl();A.redraw();S.want()};
function grow(t){S.m=mx(0,mn(36,t*36));const m=Math.round(S.m),b=1000*Math.pow(1+R,m);A.redraw();
 if(m>=36&&!S.seen.g){S.seen.g=1;yep(`After 3 years: ${gbp(b)}, not £1,747. Each month interest is charged on last month’s interest too. That is compound interest.`)}}
function plan(i){if(at()!=='min')return;S.plan=i;if(!S.tried.includes(i))S.tried.push(i);const p=PLANS[i];A.sound.tick();
 speak(i?`${gbp(p.f)} a month clears it in ${yrs(p.m)} and costs ${gbp(p.t-1500)} in interest.`:`Minimum only: ${yrs(p.m)} and ${gbp(p.t-1500)} interest. The minimum shrinks as the balance shrinks, so it drags on.`);
 ctrl();A.redraw();if(S.tried.length>=4&&S.tried.includes(0))S.want()}
function open(i){if(at()!=='loan'||S.open.includes(i))return;S.open.push(i);A.sound.tick();const L=LOANS[i];speak(`Loan ${L.k} costs ${gbp(L.t)} in all: ${gbp(L.t-3000)} on top of the £3,000.`);ctrl();A.redraw()}
function pick(i){S.drag=null;if(at()!=='loan'||S.pick>=0||i<0)return A.redraw();if(S.open.length<2){S.bad=-1;return nope('Reveal both totals first. The monthly payment alone can fool you.')}
 if(i===1){S.bad=1;return nope(`Loan B is £21 a month cheaper but runs 4 years longer, so it costs ${gbp(LOANS[1].t-LOANS[0].t)} more in all.`)}
 S.bad=-1;S.pick=0;yep(`Loan A saves ${gbp(LOANS[1].t-LOANS[0].t)} overall. Lower APR and shorter term beat a lower monthly payment.`)}
function add(i){if(at()!=='bnpl'||S.cart.includes(i))return;S.cart.push(i);const d=S.cart.length*20;A.sound.tick();
 if(S.cart.length>=4)return yep('Four small buys = £80 due next month and £80 the month after, £30 over your spare money. Each one felt like £20. Miss a payment and late fees and a mark on your credit file can follow.');
 speak(`Next month you owe ${gbp(d)}${d>SPARE?', more than your £50 spare':''}.`);ctrl();A.redraw()}
function sal(t){S.sal=Math.round((15000+mx(0,mn(1,t))*50000)/500)*500;const s=S.sal;if(s<=25000)S.seen.lo=1;if(s>=45000)S.seen.hi=1;A.redraw();chk5()}
function size(i){if(at()!=='plan5')return;S.big=i;S.seen.sz=1;A.sound.tick();speak(`Owing ${i?'£60,000':'£45,000'}: the monthly repayment stays the same, because it depends on what you earn.`);A.redraw();chk5()}
function chk5(){if(S.seen.lo&&S.seen.hi&&S.seen.sz&&!S.seen.d5){S.seen.d5=1;yep('Plan 5 repayments are 9% of what you earn above £25,000, whatever you owe.')}}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=at(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='grow'){B('⏩ +6 months',()=>grow(mn(36,Math.round(S.m)+6)/36));B('↺ Back to month 0',()=>grow(0))}
 if(v==='min')PLANS.forEach((p,i)=>B(i?'Pay '+gbp(p.f)+' a month':'Pay the minimum',()=>plan(i)));
 if(v==='loan'){LOANS.forEach((L,i)=>{if(!S.open.includes(i))B('Reveal loan '+L.k+' total',()=>open(i))});if(S.pick<0)LOANS.forEach((L,i)=>B('Choose loan '+L.k,()=>pick(i)))}
 if(v==='bnpl')BUYS.forEach(([e,nm],i)=>{if(!S.cart.includes(i))B(e+' Buy '+nm.toLowerCase()+' (pay in 3)',()=>add(i))});
 if(v==='plan5'){[[22000,'£22,000'],[30000,'£30,000'],[45000,'£45,000']].forEach(([s,l])=>B('Salary '+l,()=>sal((s-15000)/50000)));B('Switch loan owed',()=>size(1-S.big))}A.redraw()}
function down(p){const v=at(),t=track();
 if((v==='grow'||v==='plan5')&&Math.abs(p.y-t.y)<f(30)){S.drag={sl:1};(v==='grow'?grow:sal)((p.x-t.x)/t.w);return true}
 if(v==='min'){const i=PLANS.findIndex((_,i)=>hit(p,chip(i)));if(i>=0)plan(i);return false}
 if(v==='loan'){const h=coinHome();if(S.pick<0&&Math.hypot(p.x-h.x,p.y-h.y)<f(34)){S.drag={x:p.x,y:p.y};return true}const i=LOANS.findIndex((_,i)=>hit(p,loanBox(i)));if(i>=0)open(i);return false}
 if(v==='bnpl'){const i=BUYS.findIndex((_,i)=>hit(p,buy(i)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(v==='plan5'){const i=[0,1].find(i=>hit(p,sizeChip(i)));if(i!=null)size(i)}return false}
function move(p){const d=S.drag,v=at();if(!d)return;if(d.sl){const t=track();return(v==='grow'?grow:sal)((p.x-t.x)/t.w)}d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=at();if(!d)return;S.drag=null;if(d.sl){if(v==='plan5'&&!S.seen.d5){const o=mx(0,S.sal-25000)*.09;speak(`Salary ${gbp(S.sal)}: repay ${gbp(o)} a year, about ${gbp(o/12)} a month.`)}if(v==='grow'&&S.m<36)speak(`Month ${Math.round(S.m)}: owe ${gbp(1000*Math.pow(1+R,Math.round(S.m)))}.`);return ctrl()}
 if(v==='loan')return pick(LOANS.findIndex((_,i)=>hit(p,loanBox(i))));
 if(v==='bnpl'){if(Math.hypot(p.x-d.x0,p.y-d.y0)<8||p.y<A.H*.66)add(d.i);A.redraw()}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const k=++S.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{S.tok++;Object.assign(S,{want:()=>{},m:0,plan:-1,tried:[],open:[],pick:-1,bad:-1,drag:null,cart:[],sal:22000,big:0,seen:{}})};
const steps=[
{h:'Interest on interest',p:'£1,000 sits on a credit card at 24.9% APR and nothing is paid. Drag the purple ball to move through 36 months. The dashed line is simple interest.',
 predict:{q:'After 3 years, roughly what is owed?',opts:['£1,747: 24.9% three times','About £1,950'],ans:1},task:'Drag to 36 months',
 show:()=>{steps[0].go();play([6,12,18,24,30,36].map(m=>()=>grow(m/36)),350)},go:()=>{reset();speak('Drag the slider to add months.');ctrl();S.want=fin(0,()=>S.m>=36,'Compound interest grows faster each year.')}},
{h:'The minimum-payment trap',p:'You owe £1,500 at 24.9% APR. The minimum is the interest plus 1% of the balance (at least £5). Tap the minimum, then three fixed amounts.',
 predict:{q:'Paying only the minimum, how long until £1,500 is cleared?',opts:['About 3 years','Over 20 years'],ans:1},task:'Try the minimum and three fixed amounts',
 show:()=>{steps[1].go();play([0,1,2,4].map(i=>()=>plan(i)),700)},go:()=>{reset();speak('Tap a payment.');ctrl();S.want=fin(1,()=>S.tried.length>=4&&S.tried.includes(0),'A fixed payment above the minimum saves years and thousands.')}},
{h:'Monthly cost vs total cost',p:'Two loans of £3,000. Tap each card to reveal what you repay in all, then drag the tick onto the cheaper one.',task:'Reveal both and pick the cheaper loan',
 show:()=>{steps[2].go();play([()=>open(0),()=>open(1),()=>pick(0)],700)},go:()=>{reset();speak('Tap a loan card to reveal its total.');ctrl();S.want=fin(2,()=>S.pick===0,'Compare the total repayable, not just the monthly payment.')}},
{h:'Buy now, pay later stacks up',p:'You have £50 spare each month. Each £60 buy is “pay in 3”: £20 now, then £20 for two months. Drag each item up into the basket, or tap it.',task:'Add all four buys',
 show:()=>{steps[3].go();play([0,1,2,3].map(i=>()=>add(i)),600)},go:()=>{reset();speak('Drag an item up to buy it.');ctrl();S.want=fin(3,()=>S.cart.length>=4,'Small instalments add up. Count them all against your budget.')}},
{h:'What a student loan costs each month',p:'A Plan 5 student loan is repaid at 9% of earnings above £25,000. Slide the salary to £25,000 or less and to £45,000 or more, and switch the amount owed.',
 predict:{q:'On a £30,000 salary, what is repaid in a year?',opts:['£450','£2,700'],ans:0},task:'Try both salaries and switch the loan owed',
 show:()=>{steps[4].go();play([()=>sal(.2),()=>sal(.6),()=>size(1)],700)},go:()=>{reset();speak('Drag the slider to change the salary.');ctrl();S.want=fin(4,()=>S.seen.d5,'It works more like a tax on earnings than a normal debt.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What does APR measure?',[['The yearly cost of borrowing, including interest and fees','ok'],['The monthly payment','monthly'],['How much you can borrow','limit']]],
 ['£1,500 on a card at 24.9% APR. Which plan costs least overall?',[['£100 a month','ok'],['The minimum payment','min'],['£40 a month','low']]],
 ['Loan A: £99.92/mo for 36 months. Loan B: £78.73/mo for 84 months. Which is cheaper in all?',[['Loan A','ok'],['Loan B, it is cheaper each month','monthly'],['They cost the same','same']]],
 ['What can a missed “pay in 3” payment lead to?',[['Late fees and a mark on your credit file','ok'],['Nothing, it is not real credit','notcredit'],['The shop cancels the item','cancel']]],
 ['On Plan 5, what decides how much you repay each month?',[['How much you earn above £25,000','ok'],['How much you owe','owe'],['The interest rate','rate']]],
 ['£1,000 is left unpaid at 24.9% APR for 3 years. Why is it about £1,950, not £1,747?',[['Interest is charged on earlier interest','ok'],['The bank adds a fixed fee','fee'],['APR rises each year','rise']]]];
function why(tag){let m='Look at the total you repay, not just one number.';
 if(tag==='monthly')m='A lower monthly payment often means a longer term and more interest in total.';
 if(tag==='limit')m='That is the credit limit. APR is the yearly cost of borrowing as a percentage.';
 if(tag==='min')m='The minimum took over 22 years and cost £2,590 in interest.';
 if(tag==='low')m='£40 a month takes 5½ years and costs £1,109 in interest; £100 costs £277.';
 if(tag==='same')m='Loan B costs £6,613 in all, £3,016 more than Loan A at £3,597.';
 if(tag==='notcredit')m='Since July 2026 most “pay in 3” deals are regulated credit. Missed payments can be reported.';
 if(tag==='cancel')m='You keep the item and still owe the money, plus any late fee.';
 if(tag==='owe')m='The amount owed changes how long you pay, not the monthly amount. That is 9% above £25,000.';
 if(tag==='rate')m='Interest changes the balance, not the monthly repayment, which is 9% of earnings above £25,000.';
 if(tag==='fee')m='No fee was added. Each month interest is charged on the balance, including last month’s interest.';
 if(tag==='rise')m='The rate stayed at 24.9%. The balance grew because interest compounds.';
 return m}
function quiz(){ask++;const[q,ops]=QS[ask%QS.length],turn=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right: you looked at the whole cost.':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
