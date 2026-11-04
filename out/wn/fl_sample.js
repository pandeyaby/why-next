/* Flagship – populations and samples (ages 12–14): 240 Hilltop students, 60 per year, asked "Do you want a longer
   lunch?" (Y7 80%, Y8 60%, Y9 40%, Y10 20%: 50% overall). Sort population vs sample; drag a 20-box for handy samples
   that depend on where you stand; draw random samples that scatter round 50%; grow the sample size (steadier, but a
   bigger biased sample stays biased); judge four methods with the picked students lit up. */
(()=>{
const YES=[48,36,24,12],YR=['Y7','Y8','Y9','Y10'];
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function shuffle(a,r){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* student g: band g/60, cell (col,row) in a 24×10 grid; yes from a fixed shuffle inside each band */
const POP=[];{const r=rng(7);for(let b=0;b<4;b++){const o=shuffle([...Array(60).keys()],r);for(let i=0;i<60;i++)POP.push({b,col:b*6+i%6,row:Math.floor(i/6),yes:o.indexOf(i)<YES[b]})}}
const pick=(n,from,seed)=>shuffle(from.slice(),rng(seed)).slice(0,n);
const ALL=[...Array(240).keys()],pct=s=>Math.round(100*s.filter(g=>POP[g].yes).length/s.length);
const CARDS=[['All 240 Hilltop students',0],['The 20 students Sam asked',1],['Every fish in the lake',0],['30 fish caught in a net',1],['All voters in the UK',0],['1,000 voters phoned by a poll',1]];
const METH=[{t:'Online poll on the lunch page: anyone who wants can vote',s:ALL.filter(g=>POP[g].yes).slice(3,20).concat([170,200,230]),fair:0,why:'Volunteers are the people who care most. Most of them want a longer lunch.'},
 {t:'Ask the 20 students in the Year 10 football team',s:pick(20,ALL.filter(g=>POP[g].b===3),5),fair:0,why:'Only Year 10 is in it, so the other three years have no say.'},
 {t:'Every 12th name on the full school register',s:ALL.filter(g=>g%12===5),fair:1,why:'The list covers the whole school, so every year group is in the sample.'},
 {t:'20 names drawn from a hat holding all 240 names',s:pick(20,ALL,11),fair:1,why:'Every student has the same chance of being picked.'}];
VIS.reg('flagsample',c=>{let A,pad,box,qn=-1,good=0;const T={};
const stage=()=>['sort','handy','rand','size','meth','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)},miss=t=>{A.sound.miss();tell(t)};
const sz=n=>Math.round(n*(A.narrow?1:1.12));
function label(g,t,x,y,n,al,col,wt,mw){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function box2(g,r,col,a,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=lw||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- the school grid and the estimate strip ---- */
const gridR=()=>{const w=A.W-24,h=A.H*.5,cl=Math.min(w/24.6,h/10);return{x:A.W/2-cl*12.3,y:A.H*.17,cl,w:cl*24.6,h:cl*10}};
const cx=col=>{const G=gridR();return G.x+G.cl*(col+.5+.2*Math.floor(col/6))},cy=row=>{const G=gridR();return G.y+G.cl*(row+.5)};
const stripR=()=>({x:40,y:A.H*.86,w:A.W-80});
const SX=v=>stripR().x+stripR().w*v/100;
function school(g,lit,box){const G=gridR(),C=A.col,on=new Set(lit||[]);
 YR.forEach((y,b)=>label(g,y,cx(b*6+2.5),G.y-10,11,0,0,800));
 POP.forEach((p,i)=>{const x=cx(p.col),y=cy(p.row),r=G.cl*.36;g.beginPath();g.arc(x,y,on.has(i)?r:r*.42,0,7);
  if(!on.has(i)){g.fillStyle=A.alpha(C.mu,.55);g.fill()}else if(p.yes){g.fillStyle=C.cy;g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}else{g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}});
 if(box){g.strokeStyle=C.or;g.lineWidth=3;const x0=cx(box.c)-G.cl/2-2,y0=cy(box.r)-G.cl/2-2;g.strokeRect(x0,y0,cx(box.c+3)-cx(box.c)+G.cl+4,G.cl*5+4)}
 label(g,'● yes   ○ no   · not asked',A.W/2,G.y+G.h+12,10,0,0,600)}
function strip(g,truth){const S=stripR(),C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(S.x,S.y);g.lineTo(S.x+S.w,S.y);g.stroke();
 [0,25,50,75,100].forEach(v=>{g.beginPath();g.moveTo(SX(v),S.y-4);g.lineTo(SX(v),S.y+4);g.stroke();label(g,v+'%',SX(v),S.y+14,10,0,0,600)});
 label(g,'% saying yes',S.x+S.w/2,S.y+28,10,0,0,600);
 if(truth){g.strokeStyle=C.vi;g.setLineDash([5,4]);g.beginPath();g.moveTo(SX(50),S.y-58);g.lineTo(SX(50),S.y);g.stroke();g.setLineDash([]);label(g,'whole school 50%',SX(50),S.y-66,10,0,C.vi,800)}
 const st={};T.est.forEach(([v,k])=>{const n=st[v]=(st[v]||0)+1,x=SX(v),y=S.y-8-(n-1)*11;g.fillStyle=k==='h'?C.or:k==='b'?C.rd:C.cy;g.strokeStyle=C.tx;g.lineWidth=1;g.beginPath();
  if(k==='r'){g.arc(x,y,5,0,7)}else if(k==='h'){g.rect(x-5,y-5,10,10)}else{g.moveTo(x,y-6);g.lineTo(x+6,y);g.lineTo(x,y+6);g.lineTo(x-6,y)}g.fill();g.stroke()});
 const L=T.est[T.est.length-1];if(L)label(g,`${L[0]}%`,Math.min(Math.max(SX(L[0]),S.x+12),S.x+S.w-12),S.y-12-11*(st[L[0]]),11,0,0,800)}
const colR=i=>{const w=(A.W-24)/2;return{x:8+i*(w+8),y:A.H*.42,w,h:A.H*.54}};
const cardR=()=>{const w=Math.min(A.W*.8,360);return{x:A.W/2-w/2,y:A.H*.13,w,h:A.H*.17}};
function paint(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#f0f9ff',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='sort'){if(T.k<CARDS.length){const r=cardR(),d=T.drag&&T.drag.x!=null?T.drag:null,q=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;box2(g,q,C.am,.16,3);label(g,CARDS[T.k][0],q.x+q.w/2,q.y+q.h/2,14,0,0,800)}
  else label(g,'Each sample comes from a population.',W/2,H*.2,14,0,0,800);
  ['Population','Sample'].forEach((s,i)=>{const r=colR(i);box2(g,r,[C.vi,C.cy][i],T.bad===i?.32:.1,T.bad===i?4:2);label(g,s,r.x+r.w/2,r.y+16,13,0,0,800);label(g,i?'(some)':'(everyone)',r.x+r.w/2,r.y+33,11,0,0,600);
   T.cols[i].forEach((t,j)=>label(g,t,r.x+r.w/2,r.y+58+j*sz(22),A.narrow?9.5:11,0,0,600,r.w-8))});return A.fx.draw(g)}
 if(v==='quiz'){school(g,ALL);label(g,'Fair sample: everyone has a chance.',W/2,H*.07,14,0,0,800);return}
 const top=v==='handy'?(T.n>=3?'Three handy samples: answers depend on where you stand.':'Drag the box over 20 students.'):v==='rand'?`Random samples of 20: ${T.n} taken`:v==='size'?`Sample size: ${T.size}`:T.m<4?METH[T.m].t:'Two fair methods, two biased.';
 label(g,top,W/2,H*.06,v==='meth'?11:13,0,0,800);school(g,v==='meth'&&T.m<4?METH[T.m].s:T.lit,v==='handy'&&T.n<3?T.box:null);strip(g,v!=='handy'||T.n>=3);return A.fx.draw(g)}
/* ---- actions ---- */
function place(i){if(stage()!=='sort'||T.k>=CARDS.length)return;const[t,s]=CARDS[T.k];
 if(i!==s){T.bad=i;miss(s?`"${t}" is only some of the group you want to know about: a sample.`:`"${t}" is the whole group you want to know about: the population.`);setTimeout(()=>{T.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 T.cols[i].push(t);T.k++;A.sound.tick();tell(`${i?'Sample':'Population'}: ${t}`);A.redraw();buttons();T.want()}
function boxAt(c,r){T.box={c:Math.max(0,Math.min(20,Math.round(c))),r:Math.max(0,Math.min(5,Math.round(r)))};A.redraw()}
function inBox(){const{c,r}=T.box;return ALL.filter(g=>POP[g].col>=c&&POP[g].col<c+4&&POP[g].row>=r&&POP[g].row<r+5)}
function take(){if(stage()!=='handy'||T.n>=3)return;const s=inBox(),v=pct(s),k=T.box.c+','+T.box.r;
 if(T.seen.includes(k)){miss('You sampled that spot already. Move the box somewhere new.');return}
 T.seen.push(k);T.est.push([v,'h']);T.lit=T.lit.concat(s);T.n++;A.sound.pop();
 const ys=[...new Set(s.map(g=>YR[POP[g].b]))].join(' and ');tell(`Box on ${ys}: ${v}% yes.`);A.redraw();buttons();T.want()}
function rand(n){const v=stage();if((v!=='rand'&&v!=='size')||(v==='rand'&&T.n>=5))return;const s=pick(n,ALL,++T.seed*31+n);T.lit=s;
 const p=pct(s);T.est.push([p,'r']);T.n++;if(v==='size'&&n>=80)T.big++;A.sound.tick();tell(`Random sample of ${n}: ${p}% yes.`);A.redraw();buttons();T.want()}
function year7(){if(stage()!=='size'||T.y7)return;const s=ALL.filter(g=>POP[g].b===0);T.lit=s;T.est.push([pct(s),'b']);T.y7=1;A.sound.tick();
 tell('All 60 in Year 7: 80% yes. Three times the size of the box, and still far from 50%.');A.redraw();buttons();T.want()}
function judge(f){if(stage()!=='meth'||T.m>=4)return;const M=METH[T.m];
 if(f!==!!M.fair){miss((M.fair?'This one is fair. ':'This one is biased. ')+M.why);return}
 A.sound.pop();tell(`${M.fair?'Fair':'Biased'}: ${M.why} This sample says ${pct(M.s)}% yes.`);T.est.push([pct(M.s),M.fair?'r':'b']);T.m++;A.redraw();buttons();T.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='sort'&&T.k<CARDS.length)['Population','Sample'].forEach((s,i)=>B(s,()=>place(i),`Put "${CARDS[T.k][0]}" in ${s}`));
 if(v==='handy'&&T.n<3)[[0,0,'Year 7'],[12,3,'Year 9'],[19,5,'Year 10']].forEach(([cc,r,y])=>B(`Box on ${y}`,()=>{boxAt(cc,r);take()},`Move the box to ${y} and ask those 20`));
 if(v==='rand'&&T.n<5)B('Pick 20 at random',()=>rand(20));
 if(v==='size'){[10,40,80,120].forEach(n=>B(`Size ${n}`,()=>{T.size=n;tell(`Sample size ${n}. Tap the school to take a sample.`);A.redraw();buttons()}));B(`Take a random sample of ${T.size}`,()=>rand(T.size));if(!T.y7)B('Ask all of Year 7',year7)}
 if(v==='meth'&&T.m<4){B('Fair',()=>judge(true));B('Biased',()=>judge(false))}}
/* ---- pointer ---- */
function cell(p){const G=gridR();return{c:(p.x-G.x)/G.cl/1.025-2,r:(p.y-G.y)/G.cl-2.5}}
function down(p){const v=stage(),G=gridR(),inG=within(p,{x:G.x,y:G.y,w:G.w,h:G.h});
 if(v==='sort'&&T.k<CARDS.length&&within(p,cardR())){T.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='handy'&&T.n<3&&inG){const q=cell(p);boxAt(q.c,q.r);T.drag={grid:1};return true}
 if(inG&&(v==='rand'||v==='size')){rand(v==='rand'?20:T.size);return false}
 return false}
function move(p){const d=T.drag;if(!d)return;if(d.grid){const q=cell(p);return boxAt(q.c,q.r)}if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=T.drag;T.drag=null;if(!d)return;if(d.grid)return take();if(stage()!=='sort')return;if(d.x==null){tell('Drag it into a box, or use the buttons.');return A.redraw()}
 if(p.y>A.H*.38)place(p.x<A.W/2?0:1);else A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
function seq(fns,gap){const me=++T.v;fns.forEach((f,j)=>setTimeout(()=>{if(me===T.v)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function clean(){const v=(T.v||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{v,want:()=>{},k:0,cols:[[],[]],bad:-1,n:0,est:[],lit:[],seen:[],box:{c:8,r:2},seed:0,size:10,big:0,y7:0,m:0,drag:null})}
const rng5=()=>{const e=T.est.filter(x=>x[1]==='r').map(x=>x[0]);return`${Math.min(...e)}% to ${Math.max(...e)}%`};
const steps=[
{h:'Population or sample',p:'Hilltop School has 240 students. The question: do you want a longer lunch? The population is everyone you want to know about. A sample is the part you actually ask.',predict:{q:'The head asks all 240 students. That is called…',opts:['A census: the whole population','A sample'],ans:0},task:'Sort all 6 cards',
 show:()=>{steps[0].go();seq(CARDS.map(q=>()=>place(q[1])),360)},
 go:()=>{clean();tell('Drag each card to Population or Sample.');buttons();T.want=ready(0,()=>T.k>=CARDS.length,()=>'A census asks all 240: 120 say yes, so the true answer is 50%. A sample asks some and uses them to estimate that 50%.')}},
{h:'A handy sample',p:'Asking the people near you is quick. Drag the box over 20 students and let go to ask them. Try three different places.',predict:{q:'Sam asks the 20 in his Year 7 form: 80% say yes. For the whole school, the answer is…',opts:['Lower: Year 7 is not the whole school','About 80%','Higher'],ans:0},task:'Take 3 handy samples in different places',
 show:()=>{steps[1].go();seq([[0,0],[12,3],[19,5]].map(([cc,r])=>()=>{boxAt(cc,r);take()}),500)},
 go:()=>{clean();tell('Drag the orange box over the school, then let go.');buttons();T.want=ready(1,()=>T.n>=3,()=>`Your handy samples said ${T.est.map(e=>e[0]+'%').join(', ')}. The truth is 50%. Each box only reaches one or two year groups, so it is biased.`)}},
{h:'A random sample',p:'In a random sample every student has the same chance of being picked. Tap the school, or the button, to pick 20 at random.',predict:{q:'Take 5 random samples of 20. What will they say?',opts:['Different answers, close to 50%','Exactly 50% every time','Way off, like the handy box'],ans:0},task:'Take 5 random samples',
 show:()=>{steps[2].go();seq([1,2,3,4,5].map(()=>()=>rand(20)),350)},
 go:()=>{clean();tell('Tap the school to pick 20 students at random.');buttons();T.want=ready(2,()=>T.n>=5,()=>`Five random samples gave ${rng5()}. They vary, but they scatter around the true 50% instead of landing on one side.`)}},
{h:'Bigger samples',p:'Change the sample size and take random samples. Then ask all 60 of Year 7, a sample three times bigger than the box.',task:'Take 3 random samples of 80 or more, then ask all of Year 7',
 show:()=>{steps[3].go();T.size=80;seq([()=>rand(80),()=>rand(80),()=>rand(80),year7],400)},
 go:()=>{clean();T.size=10;tell('Pick a size, then tap the school to take a sample.');buttons();T.want=ready(3,()=>T.big>=3&&T.y7,()=>'Bigger random samples land closer to 50%. All of Year 7 still says 80%: a bigger sample is steadier, but size does not fix bias.')}},
{h:'Spot the bias',p:'Four ways to choose 20 students. The lit dots show who each method picks. Is it fair, or biased?',task:'Judge all 4 methods',
 show:()=>{steps[4].go();seq(METH.map(M=>()=>judge(!!M.fair)),500)},
 go:()=>{clean();tell(METH[0].t+'. Fair or biased?');buttons();T.want=ready(4,()=>T.m>=4,()=>'A fair sample gives every part of the population a chance. Volunteers and one club give a biased sample.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['A council wants to know what all town residents think. It asks 50 people at the gym. What is the problem?',[['Gym users are not like all residents','ok'],['50 is too many','size'],['Nothing, it is a sample','fine']]],
 ['Which is the population?',[['Every student at the school','ok'],['The 30 students asked','swap'],['The answers they gave','swap']]],
 ['A website poll lets anyone vote. 90% say yes. Why be careful?',[['Only people who care choose to vote','ok'],['The website is too slow','fine'],['90% is too high to happen','size']]],
 ['Which sample of a school of 800 is best?',[['100 names picked at random from the full list','ok'],['300 students from Year 7','bigger'],['The first 100 into school','fine']]],
 ['Why not just ask everyone?',[['A census can cost too much time or money','ok'],['A census is always wrong','swap'],['Samples are always more accurate','bigger']]],
 ['Two random samples of 40 give 45% and 55%. What does that show?',[['Random samples vary, so the true value is likely between','ok'],['One sample must be biased','fine'],['Sampling never works','size']]]];
function hint(t){let m='Ask: does every part of the population get a fair chance to be picked?';
 if(t==='size')m='Size is not the issue here. Think about who gets picked and who is left out.';
 if(t==='fine')m='Check who is in the sample. Is it like the whole population, or just one kind of person?';
 if(t==='swap')m='The population is everyone you want to know about. The sample is the part you ask.';
 if(t==='bigger')m='Bigger is steadier, but a big sample from one group is still biased.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,o);b.onclick=()=>answer(t,b)});tell('Challenge: '+q);A.redraw()}
function answer(t,b){box.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const ok=t==='ok',fb=box.querySelector('.fl-fb');b.classList.add(ok?'ok':'no');
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right. ${good} in a row.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next question →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw:paint,onStep:A=>{box.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
