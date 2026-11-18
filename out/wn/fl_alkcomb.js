/* Flagship – balanced equations for burning alkanes (ages 14–16; AQA GCSE Chemistry 4.7.1.3 combustion of hydrocarbons,
   OCR Gateway C1.3 balancing; complete combustion CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O). Step coefficients and watch an
   atom ledger for C, H and O: carbon first, hydrogen next, oxygen last; clear a half O₂ by doubling (butane, octane); slide
   the chain length to find the general rule. Not flagburn (Bunsen flame, methane, CO poisoning) or flagalk (structure). */
(()=>{
const NAMES=['','methane','ethane','propane','butane','pentane','hexane','heptane','octane'];
const SUB='₀₁₂₃₄₅₆₇₈₉',sub=v=>String(v).split('').map(d=>SUB[+d]).join('');
const fuel=n=>`C${n>1?sub(n):''}H${sub(2*n+2)}`,half=v=>Number.isInteger(v)?String(v):(Math.floor(v)?Math.floor(v):'')+'½';
const SP=['fuel','O₂','CO₂','H₂O'];
/* atoms on each side for chain length n and coefficients k=[a,b,c,d] */
const atoms=(n,k)=>({C:[k[0]*n,k[2]],H:[k[0]*(2*n+2),2*k[3]],O:[2*k[1],2*k[2]+k[3]]});
const bal=(n,k)=>{const t=atoms(n,k);return['C','H','O'].every(e=>t[e][0]===t[e][1])};
const need=n=>(3*n+1)/2;
/* pattern step: target O₂ per molecule -> n */
const HUNT=[[8,5],[9.5,6],[12.5,8]];
VIS.reg('flagalkcomb',c=>{let A,ctl,qbox,qn=-1,gen=0;const S={};
const INK='#111827',OKC='#065f46',BADC='#b91c1c',GREY='#6b7280',SEL='#1d4ed8',CF='#e0f2fe',CT='#075985',OF='#fee2e2',OT='#991b1b',HF='#dcfce7',HT='#166534',FF='#fef9c3',FT='#854d0e';
const SPC=[[FF,FT],[OF,OT],[CF,CT],[HF,HT]];
const fnt=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,px=n=>A.narrow?n:Math.round(n*1.2),cen=g=>{g.textAlign='center';g.textBaseline='middle'};
const phase=()=>['c','h','o','x2','rule','quiz'][A.step],within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const cheer=()=>A.sound.pop(),boo=()=>A.sound.miss();
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f0f9ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,y,ok,n){const g=A.ctx;let s=px(n||14);g.font=fnt(s);let w=g.measureText(t).width+26;while(w>A.W-10&&s>10){s--;g.font=fnt(s);w=g.measureText(t).width+26}
const h=s+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?OKC:GREY;g.stroke();g.fillStyle=INK;cen(g);g.fillText(t,x+w/2,y+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.ring?3.5:1.5;g.strokeStyle=o.ring||GREY;g.stroke();if(t==null)return;g.fillStyle=o.ink||INK;g.font=fnt(o.px||Math.round(r.h*.42));cen(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
/* equation strip: four species columns, each with ▲ coefficient ▼ */
function cols(){const gap=A.narrow?20:26,w=Math.min(px(96),(A.W-16-3*gap)/4),x0=(A.W-(4*w+3*gap))/2,y=A.H*.17;
return SP.map((s,i)=>{const x=x0+i*(w+gap),bh=px(34);return{i,x,w,gap,up:{x,y,w,h:bh},num:{x,y:y+bh+4,w,h:px(46)},dn:{x,y:y+bh+px(54),w,h:bh},lab:{x,y:y+2*bh+px(60),w,h:px(30)}}})}
function editable(i){const k=phase();return k==='c'?i===2:k==='h'?i===3:k==='o'?i===1:k==='x2'?i>0:false}
function drawEq(){const g=A.ctx,C=cols();C.forEach(col=>{const on=editable(col.i),[bg,ink]=SPC[col.i];
if(on){box(col.up,'▲',{bg:'#ffffff',px:px(18)});box(col.dn,'▼',{bg:'#ffffff',px:px(18)})}
box(col.num,half(S.k[col.i]),{bg,ink,ring:on?(S.drag&&S.drag.i===col.i?SEL:ink):null,px:px(26)});
g.fillStyle=A.col.tx;g.font=fnt(px(15),800);cen(g);g.fillText(col.i?SP[col.i]:fuel(S.n),col.lab.x+col.lab.w/2,col.lab.y+col.lab.h/2,col.w+col.gap-2)});
g.fillStyle=A.col.tx;g.font=fnt(px(20),800);const yy=C[0].num.y+C[0].num.h/2;['+','→','+'].forEach((s,j)=>g.fillText(s,C[j].x+C[j].w+C[j].gap/2,yy))}
/* atom ledger: one row per element, left count vs right count, bars to compare */
const ledTop=()=>{const L=cols()[0].lab;return L.y+L.h+px(28)},rowH=()=>Math.min(px(30),A.H*.08);
function drawLedger(){const g=A.ctx,t=atoms(S.n,S.k),top=ledTop(),rh=rowH(),lw=(A.W-120)/2,mx=Math.max(1,...Object.values(t).flat());
g.font=fnt(px(13),700);cen(g);g.fillStyle=A.col.tx;g.fillText('reactants',60+lw/2,top-rh*.55);g.fillText('products',A.W-60-lw/2,top-rh*.55);
['C','H','O'].forEach((e,j)=>{const y=top+j*rh,[L,R]=t[e],ok=L===R,bw=v=>Math.max(2,lw*v/mx);
g.fillStyle=A.col.tx;g.font=fnt(px(15));cen(g);g.fillText(e,A.W/2,y+rh/2);
g.fillStyle=ok?'#16a34a':'#dc2626';g.fillRect(A.W/2-22-bw(L),y+4,bw(L),rh-8);g.fillRect(A.W/2+22,y+4,bw(R),rh-8);
g.fillStyle=A.col.tx;g.font=fnt(px(13),800);g.textAlign='right';g.fillText(half(L),A.W/2-26-bw(L),y+rh/2);g.textAlign='left';g.fillText(half(R)+(ok?' ✓':' ✗'),A.W/2+26+bw(R),y+rh/2)})}
function x2Btn(){const w=px(140),h=px(40);return{x:A.W/2-w/2,y:ledTop()+3*rowH()+px(10),w,h}}
/* pattern step: slider for chain length */
function track(){const x=30,w=A.W-60,y=A.H*.62;return{x,w,y,at:n=>x+(n-1)*w/7}}
function chk(){const w=px(120),h=px(44);return{x:A.W/2-w/2,y:A.H*.8,w,h}}
function drawRule(){const g=A.ctx,s=S.r,n=S.n,a=need(n)%1?2:1,eq=`${a>1?'2':''}${fuel(n)} + ${half(need(n)*a)}O₂ → ${n*a}CO₂ + ${(n+1)*a}H₂O`;
if(s.q>=3){pill('All 3 found',A.H*.07,1);['Each extra C adds 1½ O₂','O₂ needed = (3n + 1) ÷ 2','Even n gives a half: double it'].forEach((t,j)=>pill(t,A.H*(.3+j*.18),1,15));return}
pill(`Which alkane needs ${half(HUNT[s.q][0])} O₂ per molecule?`,A.H*.07,0,13);
g.fillStyle=A.col.tx;g.font=fnt(px(17),800);cen(g);g.fillText(`${NAMES[n]}: ${fuel(n)}`,A.W/2,A.H*.2);
g.font=fnt(px(14),700);g.fillText(`1 ${fuel(n)} needs ${half(need(n))} O₂`,A.W/2,A.H*.3,A.W-14);g.fillText(eq,A.W/2,A.H*.4,A.W-14);
const T=track();g.strokeStyle=GREY;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x+T.w,T.y);g.stroke();
for(let i=1;i<=8;i++){g.fillStyle=A.col.tx;g.font=fnt(px(12),700);g.fillText(String(i),T.at(i),T.y+px(24))}
g.fillText('carbons (n)',A.W/2,T.y+px(42));g.fillStyle=S.drag?SEL:'#ffffff';g.beginPath();g.arc(T.at(n),T.y,px(15),0,7);g.fill();g.strokeStyle=SEL;g.lineWidth=3;g.stroke();
box(chk(),'Check',{bg:CF,ink:CT,ring:s.miss?BADC:CT,px:px(18)})}
function draw(){const k=phase();wash();if(k==='quiz'){pill('Challenge',A.H*.2,1);pill('C first · H next · O last · ×2 for a half',A.H*.5,0,15);return}
if(k==='rule'){drawRule();A.fx.draw(A.ctx);return}
const titles={c:'Carbon first: one CO₂ per C atom',h:'Hydrogen next: one H₂O per 2 H atoms',o:'Oxygen last: count O atoms on the right',x2:'Balance butane with whole numbers'};
pill(titles[k],A.H*.06,S.won,13);drawEq();if(k==='x2')box(x2Btn(),'× 2 all',{bg:FF,ink:FT,ring:FT,px:px(17)});drawLedger();A.fx.draw(A.ctx)}
/* change one coefficient; O₂ moves in halves only in the doubling step */
function bump(i,dir){if(!editable(i)||S.won)return;const st=(i===1&&phase()==='x2')?.5:1,v=Math.max(i?0:1,Math.min(30,S.k[i]+dir*st));if(v===S.k[i])return;S.k[i]=v;A.sound.tick();judge()}
function times2(){if(phase()!=='x2'||S.won)return;S.k=S.k.map(v=>v*2);A.sound.tick();judge()}
function judge(){const k=phase(),n=S.n,t=atoms(n,S.k);
if(k==='c'){if(t.C[0]===t.C[1]){S.won=1;cheer();return tell(`${fuel(n)} has ${n} C atoms, so ${n} CO₂. Carbon balances.`)}return tell(`${half(S.k[2])} CO₂ holds ${t.C[1]} C, but the fuel has ${t.C[0]}. One CO₂ for each C.`)}
if(k==='h'){if(t.H[0]===t.H[1]){S.won=1;cheer();return tell(`${2*n+2} H atoms make ${n+1} H₂O, two H in each. Hydrogen balances.`)}return tell(t.H[1]>t.H[0]?`${half(S.k[3])} H₂O holds ${t.H[1]} H. Too many: each H₂O has 2 H.`:`${half(S.k[3])} H₂O holds ${t.H[1]} H, but the fuel has ${t.H[0]}. Each H₂O has 2 H.`)}
if(k==='o'){if(bal(n,S.k)){S.won=1;cheer();return tell(`Right side: ${2*S.k[2]} O in CO₂ + ${S.k[3]} O in H₂O = ${t.O[1]}. ${S.k[1]} O₂ gives ${t.O[0]}. Balanced.`)}return tell(`${S.k[1]} O₂ gives ${t.O[0]} O atoms. The products hold ${t.O[1]}. Each O₂ has 2 O.`)}
if(k==='x2'){const whole=S.k.every(Number.isInteger);if(bal(n,S.k)&&whole){S.won=1;cheer();return tell(`${S.k[0]}${fuel(n)} + ${S.k[1]}O₂ → ${S.k[2]}CO₂ + ${S.k[3]}H₂O. Balanced with whole numbers.`)}
if(bal(n,S.k))return tell(`Balanced, but ${half(S.k[1])} O₂ is not a whole number. Double every number.`);
if(t.C[0]!==t.C[1])return tell(`C first: ${t.C[0]} C on the left, ${t.C[1]} on the right.`);if(t.H[0]!==t.H[1])return tell(`H next: ${t.H[0]} H on the left, ${t.H[1]} on the right.`);
return tell(`O last: the right has ${t.O[1]} O, so you need ${half(t.O[1]/2)} O₂.${t.O[1]%2?' That is a half: try ½ steps, then × 2.':''}`)}}
function setN(n){if(phase()!=='rule'||S.r.q>=3)return;n=Math.max(1,Math.min(8,n));if(n!==S.n){S.n=n;S.r.miss=0;A.sound.tick();tell(`${NAMES[n]}, ${fuel(n)}: needs ${half(need(n))} O₂ per molecule.`)}}
function checkN(){const s=S.r;if(s.q>=3)return;const [want,n]=HUNT[s.q];
if(S.n!==n){s.miss=1;boo();return tell(`${NAMES[S.n]} needs ${half(need(S.n))} O₂, not ${half(want)}. Each extra carbon adds 1½ O₂.`)}
s.q++;s.miss=0;cheer();tell(`${NAMES[n]}: ${n} CO₂ (${2*n} O) + ${n+1} H₂O (${n+1} O) = ${3*n+1} O atoms = ${half(want)} O₂.`+(s.q>=3?' All 3 found.':''))}
function down(p){const k=phase();if(k==='quiz')return false;
if(k==='rule'){if(S.r.q>=3)return false;if(within(p,chk())){checkN();return false}const T=track();if(Math.abs(p.y-T.y)<px(30)&&p.x>T.x-20&&p.x<T.x+T.w+20){S.drag={rule:1};setN(Math.round((p.x-T.x)/(T.w/7))+1);return true}return false}
if(k==='x2'&&within(p,x2Btn())){times2();return false}
for(const col of cols()){if(!editable(col.i))continue;if(within(p,col.up)){bump(col.i,1);return false}if(within(p,col.dn)){bump(col.i,-1);return false}
if(within(p,col.num)){S.drag={i:col.i,y0:p.y};A.redraw();return true}}return false}
function move(p){const d=S.drag;if(!d)return;if(d.rule){const T=track();setN(Math.round((p.x-T.x)/(T.w/7))+1);return}
const step=px(26);if(Math.abs(p.y-d.y0)>=step){bump(d.i,p.y<d.y0?1:-1);d.y0=p.y}}
function up(){S.drag=null;A.redraw()}
function wipe(){gen++;for(const k in S)delete S[k];Object.assign(S,{n:3,k:[1,1,1,1],won:0,r:{q:0,miss:0},drag:null,check:()=>{}})}
function tell(t){if(!t)return;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
function open(i,setup,desc,ok,msg){wipe();setup();tell(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
const rep=(f,n)=>Array.from({length:n},()=>f);
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(['c','h','o','x2'].includes(k)&&!S.won){SP.forEach((s,i)=>{if(!editable(i))return;B(`${s} +`,()=>bump(i,1),`More ${s}`);B(`${s} −`,()=>bump(i,-1),`Less ${s}`)});if(k==='x2')B('× 2 all',times2,'Double every coefficient')}
if(k==='rule'&&S.r.q<3){B('n −',()=>setN(S.n-1),'One fewer carbon');B('n +',()=>setN(S.n+1),'One more carbon');B('Check',checkN,'Check this alkane')}}
const steps=[
{h:'Carbon first',p:'Propane is C₃H₈. When it burns completely, every C atom ends up in CO₂. Tap ▲ or drag the CO₂ number up until carbon balances.',
predict:{q:'How many CO₂ come from one C₃H₈?',opts:['1, because CO₂ has one C','3, one for each C atom'],ans:1},task:'Balance the carbon',
show:()=>play(0,rep(()=>bump(2,1),2),500),
go:()=>open(0,()=>{S.n=3},'1 C₃H₈ + 1 O₂ → 1 CO₂ + 1 H₂O. Change the CO₂ number.',()=>S.won,'Carbon first: n carbons make n CO₂.')},
{h:'Hydrogen next',p:'All 8 H atoms end up in water. Each H₂O holds 2 H. Change the H₂O number.',
predict:{q:'C₃H₈ has 8 H atoms. How many H₂O?',opts:['8, one per H','4, two H in each'],ans:1},task:'Balance the hydrogen',
show:()=>play(1,rep(()=>bump(3,1),3),500),
go:()=>open(1,()=>{S.n=3;S.k=[1,1,3,1]},'C₃H₈ with 3 CO₂ and 1 H₂O. Change the H₂O number.',()=>S.won,'Hydrogen next: 2n + 2 H make n + 1 H₂O.')},
{h:'Oxygen last',p:'Now count O on the right: 2 in each CO₂ and 1 in each H₂O. Each O₂ brings 2. Set the O₂ number.',task:'Balance propane',
show:()=>play(2,rep(()=>bump(1,1),4),450),
go:()=>open(2,()=>{S.n=3;S.k=[1,1,3,4]},'C₃H₈ + 1 O₂ → 3 CO₂ + 4 H₂O. Change the O₂ number.',()=>S.won,'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.')},
{h:'A half? Double it',p:'Butane is C₄H₁₀. Balance C, then H, then O. O₂ moves in halves here. If you land on a half, press × 2 all.',
predict:{q:'Butane needs 6½ O₂. What should you do?',opts:['Round up to 7 O₂','Double every number'],ans:1},task:'Balance butane with whole numbers',
show:()=>play(3,[...rep(()=>bump(2,1),3),...rep(()=>bump(3,1),4),...rep(()=>bump(1,1),11),times2],260),
go:()=>open(3,()=>{S.n=4},'1 C₄H₁₀ + 1 O₂ → 1 CO₂ + 1 H₂O. Balance it, then make every number whole.',()=>S.won,'2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O.')},
{h:'Find the rule',p:'Slide the number of carbons. The equation balances itself. Find the alkane that needs each amount of O₂.',task:'Find all 3 alkanes',
show:()=>play(4,HUNT.flatMap(([,n])=>[()=>setN(n),checkN]),600),
go:()=>open(4,()=>{S.n=1},'Methane, CH₄, needs 2 O₂. Slide to change the number of carbons.',()=>S.r.q>=3,'Each extra carbon needs 1½ more O₂.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'C₂H₆ + ? O₂ → 2CO₂ + 3H₂O. How many O₂ balance it?',a:'3½',o:[['3','miscount'],['7','single']]},
{q:'Which equation for propane is balanced?',a:'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',o:[['C₃H₈ + 5O₂ → 3CO₂ + 8H₂O','hcount'],['C₃H₈ + O₂ → CO₂ + H₂O','unbal']]},
{q:'Butane needs 6½ O₂ for one molecule. The whole-number equation is…',a:'2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O',o:[['C₄H₁₀ + 7O₂ → 4CO₂ + 5H₂O','round'],['2C₄H₁₀ + 13O₂ → 4CO₂ + 5H₂O','partial']]},
{q:'Why does octane need more O₂ per molecule than methane?',a:'More C and H atoms to turn into CO₂ and H₂O',o:[['It burns hotter','hot'],['Its O₂ is used for the flame colour','flame']]},
{q:'How many O₂ for one pentane, C₅H₁₂?',a:'8',o:[['16','atoms'],['6','hcount2']]},
{q:'In which order should you balance an alkane equation?',a:'C, then H, then O',o:[['O, then C, then H','ofirst'],['H, then O, then C','hfirst']]}];
function why(t){let m='Count each element on both sides.';
if(t==='miscount')m='The right has 2×2 + 3 = 7 O atoms. 3 O₂ gives only 6. You need 3½, then double.';
if(t==='single')m='7 O₂ gives 14 O, but one C₂H₆ makes only 7 O of products. 7 O₂ goes with 2C₂H₆.';
if(t==='hcount')m='8 H₂O holds 16 H, but C₃H₈ has only 8. Each H₂O has 2 H, so 4 H₂O.';
if(t==='unbal')m='All coefficients are 1: 3 C on the left, 1 on the right. Balance C first.';
if(t==='round')m='7 O₂ brings 14 O, but the products hold 13. Rounding breaks the balance; doubling keeps it.';
if(t==='partial')m='You doubled the fuel and O₂ but not the products. Double every number.';
if(t==='hot')m='Heat is not in the equation. More C and H atoms need more O to make CO₂ and H₂O.';
if(t==='flame')m='O₂ ends up inside the products, not the flame. Count the O in CO₂ and H₂O.';
if(t==='atoms')m='16 is the number of O atoms. Each O₂ has 2, so 16 ÷ 2 = 8 O₂.';
if(t==='hcount2')m='Check H: C₅H₁₂ makes 6 H₂O, so the right has 10 + 6 = 16 O, which is 8 O₂.';
if(t==='ofirst')m='O appears in both products, so leave it last. Fix C and H first.';
if(t==='hfirst')m='Start with C: it is only in CO₂. O must be last because it is in both products.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'yes'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='yes';if(ok)A.win();else boo();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.85,tall:1.22,draw,onStep:B=>{qbox.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Equation buttons'},bx);qbox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
