/* Flagship – when a binomial model fits (16–18): judge the four conditions in context; draw with and without
   replacement and watch P(red) move; slide N until sampling without replacement is near binomial; find the broken
   condition; define X ~ B(n, p) by dragging n and choosing p. */
(()=>{
const CONDS=[['n','Fixed number of trials n'],['two','Two outcomes: success or failure'],['ind','Trials independent'],['p','Same P(success) each trial']];
const JUDGE=[{t:'Plant 20 seeds from a large packet. X = number that germinate.',ok:{n:1,two:1,ind:1,p:1},why:'20 trials, germinate or not, seeds behave separately, same chance each.'},
 {t:'Roll a fair die until a 6 appears. X = number of rolls.',ok:{n:0,two:1,ind:1,p:1},why:'There is no fixed number of rolls: X is the trial count, not a count of successes.'},
 {t:'Take 5 cards from one 52-card deck without replacement. X = number of hearts.',ok:{n:1,two:1,ind:0,p:0},why:'Each card taken changes what is left, so the draws are dependent and P(heart) changes.'}];
const BROKEN=[{t:'Roll a fair die until you get a 6. X = number of rolls needed.',bad:'n',fix:'The number of trials is the thing being counted, so n is not fixed. This is a geometric setting.'},
 {t:'Roll a fair die 10 times. X = the score on each roll.',bad:'two',fix:'A score from 1 to 6 has six outcomes. Counting sixes in 10 rolls would be binomial.'},
 {t:'X = number of rainy days in one week of April.',bad:'ind',fix:'A wet day makes the next day more likely to be wet, so the days are not independent.'},
 {t:'Toss a fair coin 10 times, then a coin biased to heads 10 times. X = total heads.',bad:'p',fix:'P(head) is 0.5 for ten tosses and higher for the other ten, so p is not constant.'}];
const WHYOK={n:'The number of trials is set in advance here.',two:'Each trial here is a success or a failure.',ind:'One trial here does not change the next.',p:'The chance of success is the same on every trial here.'};
const DEF=[{t:'A fair coin is tossed 12 times. X = number of heads.',n:12,ps:['0.5','0.12','0.6'],pa:0,trap:{1:'0.12 mixes up n and p. A fair coin has P(head) = 0.5.',2:'Nothing makes heads more likely. A fair coin gives p = 0.5.'}},
 {t:'A fair die is rolled 30 times. X = number of sixes.',n:30,ps:['1/6','1/2','5/6'],pa:0,trap:{1:'There are 6 faces, not 2. P(six) = 1/6.',2:'5/6 is P(not a six). X counts sixes, so p = 1/6.'}},
 {t:'15% of a large batch of seeds fail. 40 are planted. X = number that germinate.',n:40,ps:['0.85','0.15','0.4'],pa:1,trap:{0:'0.15 is P(fail). X counts seeds that germinate, so p = 0.85.',2:'0.4 is not a probability from the context; it echoes n = 40. p = 0.85.'}}];
VIS.reg('flagbfit',c=>{let A,ctl,quiz,tm=0,gen=0,qi=-1,good=0;
const init0=()=>({r:0,won:0,marks:{},hit:'',bag:[3,7],put:1,log:[],draws:{off:0,on:0},N:100,nx:1,pick:-1,drag:null,lamps:[],tilesR:[],note:'',want:()=>{}});let S=init0();
const part=()=>['judge','bag','pop','broken','def','quiz'][A.step];
const target=()=>({judge:3,broken:4,def:3}[part()]||1);
const still=()=>A.reduced();
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const F=n=>Math.round(n*(A.narrow?1:1.12));
const fmt=x=>(Math.round(x*1000)/1000).toFixed(3);
const box=(g,x,y,w,h,f,k,lw)=>{g.fillStyle=f;A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=k;g.lineWidth=lw;A.paint.rrect(x,y,w,h,10);g.stroke()};
const rule=(g,x0,y,x1,lw,col)=>{g.strokeStyle=col||A.col.mu;g.lineWidth=lw;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke()};
function lines(g,t,w){const o=[''];t.split(' ').forEach(s=>{const z=(o[o.length-1]+' '+s).trim();if(g.measureText(z).width>w&&o[o.length-1])o.push(s);else o[o.length-1]=z});return o}
function para(g,t,x,y,size,col,w,al){g.font=`700 ${F(size)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';const L=lines(g,t,w||A.W-28);L.forEach((l,k)=>g.fillText(l,x,y+k*F(size)*1.3));return y+L.length*F(size)*1.3}
/* the four condition lamps, used for judging and for finding the broken one */
function lamps(g,top){const C=A.col,cols=A.narrow?1:2,gap=8,w=(A.W-24-gap*(cols-1))/cols,h=A.narrow?40:50;S.lamps=[];
 CONDS.forEach(([k,lab],i)=>{const x=12+(i%cols)*(w+gap),y=top+Math.floor(i/cols)*(h+gap),m=S.marks[k],bad=S.hit===k;
  box(g,x,y,w,h,bad?A.alpha(C.rd,.16):m===1?A.alpha(C.gr,.16):m===0?A.alpha(C.am,.16):A.mix(C.pn,C.cy,C.dark?.14:.08),bad?C.rd:m===1?C.gr:m===0?C.am:A.alpha(C.cy,.8),m!=null||bad?4:2);
  g.font=`800 ${F(16)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=m===1?C.gr:m===0?C.am:C.mu;g.fillText(m===1?'✓':m===0?'✗':'?',x+20,y+h/2);
  g.font=`600 ${F(13)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;g.fillText(lab,x+40,y+h/2,w-48);S.lamps.push({x,y,w,h,k})})}
function bag(g){const C=A.col,[r,b]=S.bag,tot=r+b,cx=A.W*.27,cy=A.H*.5,R=Math.min(A.W*.22,A.H*.3);
 g.fillStyle=A.mix(C.pn,C.am,C.dark?.2:.14);g.beginPath();g.ellipse(cx,cy,R,R*.9,0,0,7);g.fill();g.strokeStyle=C.am;g.lineWidth=3;g.stroke();
 for(let i=0;i<tot;i++){const a=i*2.4,d=R*.62*Math.sqrt((i+.5)/tot);A.paint.ball(cx+Math.cos(a)*d,cy+Math.sin(a)*d*.85,R*.12,i<r?'#dc2626':'#2563eb')}
 const pr=r/tot,x0=A.W*.55,y0=A.H*.14;const yM=para(g,`P(red next) = ${r}/${tot} = ${fmt(pr)}`,x0,y0,15,C.tx,A.W*.43,'left');
 para(g,S.put?'Mode: put it back':'Mode: keep it out',x0,yM+F(13)*.6,13,S.put?C.gr:C.am,A.W*.43,'left');
 const bw=(A.W*.42)/6;S.log.slice(-6).forEach((e,i)=>{const h=e.p*A.H*.9;g.fillStyle=e.put?C.gr:C.am;g.fillRect(x0+i*bw,A.H*.86-h,bw*.7,h);small(g,fmt(e.p),x0+i*bw+bw*.35,A.H*.86-h-9)});
 rule(g,x0,A.H*.86,x0+A.W*.42,1.5);para(g,'P(red) before each draw',x0+A.W*.21,A.H*.93,11,C.mu,A.W*.42);
 S.tilesR=[{x:cx-R,y:cy-R,w:R*2,h:R*2,k:'bag'}];if(S.drag&&S.drag.x!=null)A.paint.ball(S.drag.x,S.drag.y,R*.14,S.drag.c?'#2563eb':'#dc2626')}
const small=(g,t,x,y)=>{g.font=`600 ${F(11)}px system-ui`;g.fillStyle=A.col.mu;g.textAlign='center';g.fillText(t,x,y)};
const band=N=>{const f=.1*N,k=19;return[Math.max(0,f-k)/(N-k),f/(N-k)]};
function pop(g){const C=A.col,x0=24,x1=A.W-24,y=A.H*.3,lx=v=>x0+(Math.log10(S.N)-2)/3*(x1-x0);
 rule(g,x0,y,x1,4);[100,1000,10000,100000].forEach((v,i)=>small(g,v.toLocaleString('en-GB'),x0+i/3*(x1-x0),y+20));
 g.fillStyle=C.vi;g.beginPath();g.arc(lx(),y,13,0,7);g.fill();para(g,`Population N = ${Math.round(S.N).toLocaleString('en-GB')}, 10% faulty, choose 20 without replacement`,A.W/2,A.H*.1,13,C.tx);
 const[lo,hi]=band(S.N),sx=p=>x0+(p/.2)*(x1-x0),yb=A.H*.6;g.fillStyle=A.alpha(C.gr,.25);g.fillRect(sx(.09),yb-22,sx(.11)-sx(.09),44);
 g.fillStyle=lo>=.09&&hi<=.11?C.gr:C.rd;g.fillRect(sx(lo),yb-10,Math.max(3,sx(hi)-sx(lo)),20);rule(g,x0,yb+26,x1,1.5);
 [0,.05,.1,.15,.2].forEach(p=>small(g,p.toFixed(2),sx(p),yb+40));
 para(g,`P(faulty) on draw 20 can be anywhere from ${fmt(lo)} to ${fmt(hi)}`,A.W/2,A.H*.82,13,C.tx);para(g,'Green zone: 0.09 to 0.11',A.W/2,A.H*.43,12,C.gr);S.tilesR=[{x:x0-14,y:y-24,w:x1-x0+28,h:48,k:'slider'}]}
function def(g){const C=A.col,d=DEF[S.r%3],x0=30,x1=A.W-30,y=A.H*.42,sx=v=>x0+v/50*(x1-x0);let yy=para(g,d.t,A.W/2,A.H*.08,14,C.tx);
 para(g,`X ~ B(${S.nx}, ${S.pick<0?'p':d.ps[S.pick]})`,A.W/2,Math.max(yy+10,A.H*.24),20,C.vi);rule(g,x0,y,x1,4);
 [0,10,20,30,40,50].forEach(v=>small(g,v,sx(v),y+20));g.fillStyle=C.cy;g.beginPath();g.arc(sx(S.nx),y,13,0,7);g.fill();para(g,'Drag to set n',A.W/2,y-24,12,C.mu);
 const n=3,gap=10,w=(A.W-24-gap*(n-1))/n,ty=A.H*.62,h=48;S.tilesR=[{x:x0-14,y:y-22,w:x1-x0+28,h:44,k:'n'}];
 d.ps.forEach((p,i)=>{const x=12+i*(w+gap),on=S.pick===i,bad=S.hit==='p'+i;box(g,x,ty,w,h,bad?A.alpha(C.rd,.16):on?A.alpha(C.vi,.2):A.mix(C.pn,C.vi,C.dark?.14:.07),bad?C.rd:C.vi,on||bad?4:2);para(g,'p = '+p,x+w/2,ty+h/2,15,C.tx,w-8);S.tilesR.push({x,y:ty,w,h,k:'p',i})})}
function draw(A){const g=A.ctx,C=A.col,k=part();g.fillStyle=A.mix(C.pn,'#eef2ff',C.dark?.03:.4);g.fillRect(0,0,A.W,A.H);S.lamps=[];S.tilesR=[];
 if(k==='quiz'){para(g,'Fixed n · two outcomes · independent · constant p',A.W/2,A.H*.45,15,C.tx);return}
 if(k==='judge'||k==='broken'){const ctx=k==='judge'?JUDGE[S.r%3].t:BROKEN[S.r%4].t;const y=para(g,ctx,A.W/2,22,14,C.tx);para(g,k==='judge'?'Tap each condition: ✓ holds, ✗ fails':'Tap the condition that fails',A.W/2,y+6,12,C.mu);lamps(g,y+24)}
 if(k==='bag')bag(g);if(k==='pop')pop(g);if(k==='def')def(g);if(S.note)para(g,S.note,A.W/2,A.H-16,12,C.gr);A.fx.draw(g)}
function nope(m,key){A.sound.miss();S.hit=key||'';say(m);clearTimeout(tm);tm=setTimeout(()=>{S.hit='';A.redraw()},still()?10:950);A.redraw()}
function fresh(){S.marks={};S.pick=-1;S.nx=1;S.note='';S.hit=''}
function scored(m){S.won++;A.sound.pop();say(m);controls();A.redraw();const st=A.step;setTimeout(()=>{if(A.step!==st)return;if(S.won<target()){S.r++;fresh();controls();say(m+' Next context.');A.redraw()}S.want()},still()?20:750)}
/* judging: every condition must be marked, and a wrong mark is answered with the reason in this context */
function toggle(k){if(part()==='broken')return pickBroken(k);if(part()!=='judge'||S.won>=3)return;S.marks[k]=S.marks[k]===1?0:1;A.sound.tick();say(`${CONDS.find(x=>x[0]===k)[1]}: ${S.marks[k]?'holds':'fails'}.`);A.redraw()}
function judge(){if(part()!=='judge'||S.won>=3)return;const J=JUDGE[S.r%3],un=CONDS.find(([k])=>S.marks[k]==null);if(un)return nope(`Mark every condition first: "${un[1]}" is not marked.`,un[0]);
 const off=CONDS.find(([k])=>S.marks[k]!==J.ok[k]);if(off){const k=off[0],m=J.ok[k]?`"${off[1]}" holds here. ${WHYOK[k]}`:`"${off[1]}" fails here. ${J.why}`;return nope(m,k)}
 scored(Object.values(J.ok).every(Boolean)?'All four hold: binomial fits. '+J.why:'Not binomial. '+J.why)}
function pickBroken(k){if(S.won>=4)return;const B=BROKEN[S.r%4];if(k===B.bad){S.marks={[k]:0};return scored('Yes. '+B.fix)}nope(`"${CONDS.find(x=>x[0]===k)[1]}" holds. ${WHYOK[k]}`,k)}
/* drawing counters: without replacement the bag changes, so P(red) moves; with replacement it stays 3/10 */
function takeOut(red){if(part()!=='bag')return;const[r,b]=S.bag;if(red?r===0:b===0)return nope(`There are no ${red?'red':'blue'} counters left.`);const p=r/(r+b);S.log.push({p,put:S.put});S.draws[S.put?'on':'off']++;
 if(!S.put)S.bag=red?[r-1,b]:[r,b-1];A.sound.tick();const[r2,b2]=S.bag;say(`Took a ${red?'red':'blue'}${S.put?' and put it back':''}. P(red next) is ${r2}/${r2+b2} = ${fmt(r2/(r2+b2))}${S.put||!S.log.length?'':', not 0.300'}.`);controls();A.redraw();S.want()}
function setPut(v){if(S.put===v)return;S.put=v;if(v)S.bag=[3,7];A.sound.tick();say(v?'Put it back: the bag is full again, 3 red and 7 blue.':'Keep it out: each counter you take stays out.');controls();A.redraw()}
function setN(N){S.N=Math.max(100,Math.min(100000,N));const[lo,hi]=band(S.N);say(`N = ${Math.round(S.N)}: P(faulty) on draw 20 ranges from ${fmt(lo)} to ${fmt(hi)}.`);A.redraw();if(lo>=.09&&hi<=.11&&!S.won){S.won=1;A.sound.pop();S.want()}}
function setNx(n){S.nx=Math.max(1,Math.min(50,Math.round(n)));A.redraw()}
function choose(i){if(part()!=='def')return;S.pick=i;A.sound.tick();say(`p = ${DEF[S.r%3].ps[i]}.`);A.redraw()}
function define(){if(part()!=='def'||S.won>=3)return;const d=DEF[S.r%3];if(S.pick<0)return nope('Choose p first.');
 if(S.nx!==d.n)return nope(`n is the number of trials. Read the context again: there are ${d.n}.`);
 if(S.pick!==d.pa)return nope(d.trap[S.pick],'p'+S.pick);scored(`X ~ B(${d.n}, ${d.ps[d.pa]}). n counts trials; p is P(success) for what X counts.`)}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(k==='quiz')return;if(k==='judge'&&S.won<3){CONDS.forEach(([q,l])=>B(l+(S.marks[q]===1?' ✓':S.marks[q]===0?' ✗':''),()=>{toggle(q);controls()},`Toggle: ${l}`));B('Check ✔',judge,'Check my judgement')}
 if(k==='broken'&&S.won<4)CONDS.forEach(([q,l])=>B(l,()=>pickBroken(q),`This fails: ${l}`));
 if(k==='bag'){B('Take a red',()=>takeOut(1),'Take a red counter');B('Take a blue',()=>takeOut(0),'Take a blue counter');B(S.put?'Switch to: keep it out':'Switch to: put it back',()=>setPut(S.put?0:1))}
 if(k==='pop')[100,500,1000,2000,10000].forEach(v=>B('N = '+v.toLocaleString('en-GB'),()=>setN(v)));
 if(k==='def'&&S.won<3){B('n − 1',()=>setNx(S.nx-1),'Decrease n');B('n + 1',()=>setNx(S.nx+1),'Increase n');DEF[S.r%3].ps.forEach((p,i)=>B('p = '+p,()=>choose(i)));B('Check ✔',define,'Check X ~ B(n, p)')}}
const hitR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=part(),l=S.lamps.find(r=>hitR(p,r));if(l){toggle(l.k);controls();return false}const t=S.tilesR.find(r=>hitR(p,r));if(!t)return false;
 if(t.k==='p'){choose(t.i);return false}if(t.k==='bag'){const[r,b]=S.bag;S.drag={c:Math.random()<r/(r+b)?0:1,x:p.x,y:p.y};return true}S.drag={k:t.k};move(p);return true}
function move(p){const d=S.drag;if(!d)return;if(d.k==='slider'){const f=(p.x-24)/(A.W-48);setN(Math.pow(10,2+3*Math.max(0,Math.min(1,f))))}else if(d.k==='n')setNx((p.x-30)/(A.W-60)*50);else{d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(d&&d.c!=null&&p.x>A.W*.5)takeOut(d.c===0);A.redraw()}
const gate=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function script(fns,ms){const me=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},still()?j*40+30:(j+1)*(ms||600)))}
function reset(){gen++;clearTimeout(tm);S=init0();if(A)fresh()}
const steps=[
{h:'The four conditions',p:'A binomial model B(n, p) needs all four conditions. Read the context, mark each one ✓ or ✗, then Check.',task:'Judge 3 contexts',
 show:()=>{steps[0].go();const w=()=>{},f=[];JUDGE.forEach(()=>f.push(()=>{CONDS.forEach(([k])=>S.marks[k]=JUDGE[S.r%3].ok[k]);controls();A.redraw()},judge,w,w,w,w,w));script(f,200)},go:()=>{reset();say('Plant 20 seeds. Does each condition hold?');controls();S.want=gate(0,()=>S.won>=3,'Binomial needs all four; one failure is enough to rule it out.')}},
{h:'Put it back or keep it out?',p:'A bag has 3 red and 7 blue counters. Drag a counter out of the bag for a random draw, or use the buttons. Watch P(red) before each draw.',predict:{q:'Take 5 counters without putting them back. Is X = number of reds binomial?',opts:['Yes: n = 5 and two colours','No: P(red) changes after each draw'],ans:1},task:'Take 3 keeping them out, then 2 putting them back',
 show:()=>{steps[1].go();script([()=>takeOut(1),()=>takeOut(0),()=>takeOut(1),()=>setPut(1),()=>takeOut(1),()=>takeOut(0)],520)},go:()=>{reset();S.put=0;controls();say('Keep it out mode. P(red next) is 3/10.');S.want=gate(1,()=>S.draws.off>=3&&S.draws.on>=2,'Without replacement p moves, so the draws are not independent; with replacement it stays 0.3.')}},
{h:'Big population, nearly binomial',p:'Choosing without replacement from a huge population barely changes p. Drag the slider to change N and watch the spread of P(faulty) on the 20th draw.',predict:{q:'Choose 20 of 10,000 bulbs (10% faulty) without replacement. Is B(20, 0.1) a fair model?',opts:['No, without replacement is never binomial','Yes, p hardly changes when N is huge'],ans:1},task:'Find an N that keeps p in the green zone',
 show:()=>{steps[2].go();script([()=>setN(500),()=>setN(1000),()=>setN(2000)],600)},go:()=>{reset();S.N=100;controls();say('N = 100. P(faulty) on draw 20 could be far from 0.1.');S.want=gate(2,()=>S.won>=1,'When n is small next to N, B(n, p) is a good approximation.')}},
{h:'Find the broken condition',p:'Each context breaks exactly one condition. Tap it.',task:'Find the broken condition in 4 contexts',
 show:()=>{steps[3].go();script(BROKEN.map(B=>()=>pickBroken(B.bad)),900)},go:()=>{reset();controls();say('Which condition fails?');S.want=gate(3,()=>S.won>=4,'Name the condition that fails and say why, in context.')}},
{h:'Define X ~ B(n, p)',p:'Drag the dot to set n, the number of trials. Choose p, the probability of a success for what X counts. Then Check.',task:'Define X for 3 contexts',
 show:()=>{steps[4].go();const w=()=>{},f=[];DEF.forEach(()=>f.push(()=>setNx(DEF[S.r%3].n),()=>choose(DEF[S.r%3].pa),define,w,w,w,w));script(f,220)},go:()=>{reset();controls();say('Set n and p for this context.');S.want=gate(4,()=>S.won>=3,'Define X in words, then give n and p.')}},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A class of 30 is asked if they have a pet. X = number who do. Which assumption is needed for a binomial model?',[['Each pupil answers independently with the same probability','ok'],['There must be more than 30 pupils','size'],['Exactly half must have a pet','half']]],
 ['Is X ~ B(8, 0.5) a fair model for the number of girls among 8 children chosen from a class of 10 girls and 10 boys?',[['No: choosing 8 of only 20 changes p a lot','ok'],['Yes: there are two outcomes and n is fixed','two'],['Yes: p = 0.5 because half are girls','half2']]],
 ['A spinner lands on red with probability 0.3. It is spun until it lands on red. Why is X = number of spins not binomial?',[['The number of trials is not fixed','ok'],['There are more than two colours','colours'],['The spins are not independent','indep']]],
 ['20 eggs are taken from a very large batch in which 4% are cracked. X = number of cracked eggs. Define X.',[['X ~ B(20, 0.04)','ok'],['X ~ B(4, 0.2)','swap'],['X ~ B(20, 0.96)','comp']]],
 ['A darts player throws 10 darts. After each miss she gets more nervous and misses more. Which condition fails?',[['Trials independent','ok'],['Fixed number of trials','fixed'],['Two outcomes','twoout']]]];
function mend(t){let m='Check all four: fixed n, two outcomes, independent trials, constant p.';
 if(t==='size')m='Any fixed n works. The issue is whether answers are independent with a constant p.';
 if(t==='half')m='p can be any value from 0 to 1; it just has to be the same for every trial.';
 if(t==='two')m='Two outcomes and fixed n are not enough. Each girl chosen lowers P(girl) for the next pick.';
 if(t==='half2')m='p is 0.5 only for the first pick. Without replacement from 20, it changes each time.';
 if(t==='colours')m='Red or not red is two outcomes. The real problem is that n is not fixed.';
 if(t==='indep')m='The spins are independent. What fails is the fixed number of trials.';
 if(t==='swap')m='n is the number of eggs taken (20) and p is P(cracked) = 0.04. Do not swap them.';
 if(t==='comp')m='0.96 is P(not cracked). X counts cracked eggs, so p = 0.04.';
 if(t==='fixed')m='She throws exactly 10 darts, so n is fixed. A miss changes the next throw: independence fails.';
 if(t==='twoout')m='Hit or miss is two outcomes. A miss changing the next throw breaks independence.';
 return m}
function pose(){qi++;const[q,ops]=QS[qi%QS.length],sh=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>verdict(t)});say('Challenge: '+q);A.redraw()}
function verdict(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+mend(t)}${ok?` Streak: ${good}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
