/* Flagship – hyperbolic identities (ages 17–18): cosh²x − sinh²x = 1 seen, proved from eˣ, Osborn's rule, the forms
of cosh 2x, one value or two when moving between sinh and cosh, and simplifying. */
(()=>{const E=Math.exp,C=x=>(E(x)+E(-x))/2,S=x=>(E(x)-E(-x))/2,r2=v=>(Math.round(v*100)/100).toFixed(2).replace('-','−');
const PROOF=[['cosh²x = (e²ˣ + □ + e⁻²ˣ)/4','2'],['sinh²x = (e²ˣ □ + e⁻²ˣ)/4','− 2'],['cosh²x − sinh²x = □/4 = 1','4']],PT=['0','1','2','− 2','4'];
/* trig identity, hyperbolic terms [text, trig sign, flips?] joined left | right */
const OSB=[['cos²x + sin²x = 1',[['cosh²x','+',0],['sinh²x','+',1]],'= 1'],['sin 2x = 2 sin x cos x',[['sinh 2x','+',0]],'= 2 sinh x cosh x'],
['cos 2x = 1 − 2 sin²x',[['1','+',0],['2 sinh²x','−',1]],'= cosh 2x'],['1 + tan²x = sec²x',[['1','+',0],['tanh²x','+',1]],'= sech²x'],
['cos(A+B) = cos A cos B − sin A sin B',[['cosh A cosh B','+',0],['sinh A sinh B','−',1]],'= cosh(A+B)'],['sin(A+B) = sin A cos B + cos A sin B',[['sinh A cosh B','+',0],['cosh A sinh B','+',0]],'= sinh(A+B)']];
const OSBF=['cosh²x − sinh²x = 1','sinh 2x = 2 sinh x cosh x','cosh 2x = 1 + 2 sinh²x','1 − tanh²x = sech²x','cosh(A+B) = cosh A cosh B + sinh A sinh B','sinh(A+B) = sinh A cosh B + cosh A sinh B'];
const FACES=[['cosh²x + sinh²x',0],['1 − 2 sinh²x',1],['2 cosh²x − 1',0],['cosh²x − sinh²x',1],['1 + 2 sinh²x',0],['2 sinh x cosh x',1],['(e²ˣ + e⁻²ˣ)/2',0],['2 cosh²x + 1',1]];
const FWHY={'1 − 2 sinh²x':'That is the cos 2x shape; Osborn flips it: 1 + 2 sinh²x.','cosh²x − sinh²x':'That equals 1.','2 sinh x cosh x':'That is sinh 2x.','2 cosh²x + 1':'It is 2 cosh²x − 1.'};
/* question, right, wrong, wrong, why each wrong one fails */
const USE=[['sinh x = 3/4, so cosh²x = 1 + sinh²x =','25/16','7/16','9/16','Add: 1 + 9/16.|Square 3/4, then add 1.'],
['So cosh x =','5/4','± 5/4','− 5/4','cosh x ≥ 1, so only the positive root.|cosh x is never negative.'],['tanh x = sinh x / cosh x =','3/5','4/5','5/3','tanh = (3/4) ÷ (5/4).|That is upside down; |tanh x| < 1.'],
['cosh x = 5/3, so sinh²x = cosh²x − 1 =','16/9','34/9','4/9','25/9 − 9/9.|Square 5/3 first.'],['So sinh x =','± 4/3','4/3','− 4/3','x and −x share a cosh, so both signs fit.|Both signs fit: sinh(−x) = −sinh x.']];
const SIMP=[['(1 + cosh 2x) / 2','cosh²x','sinh²x','cosh x'],['sinh 2x ÷ (2 cosh x)','sinh x','tanh x','2 sinh x'],['cosh⁴x − sinh⁴x','cosh 2x','1','sinh 2x'],['2 cosh²x − cosh 2x','1','− 1','sinh²x']];
const SWHY=['cosh 2x = 2 cosh²x − 1, so 1 + cosh 2x = 2 cosh²x.','sinh 2x = 2 sinh x cosh x; the 2 cosh x cancels.','(cosh²x − sinh²x)(cosh²x + sinh²x) = 1 · cosh 2x.','2 cosh²x − (2 cosh²x − 1) = 1.'];
VIS.reg('flagosb',c=>{let A,ctl,qz,qi=-1,tok=0;
const T={};
const K='#0f172a',G='#047857',R='#be123c',M='#64748b',D='#4338ca',W='#fff',IB=['#ede9fe','#5b21b6'];
const GT=()=>A.col.dark?'#6ee7b7':G,s9=v=>Math.round(v*(A.narrow?.92:1.08)),ft=(v,w)=>`${w||700} ${s9(v)}px system-ui,sans-serif`;
const st=()=>['bars','proof','osb','faces','use','simp','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1020':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tag(t,y,ok){const g=A.ctx;let n=15;g.font=ft(n,800);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=ft(n,800)}
const w=g.measureText(t).width+24,h=s9(n)+15;g.fillStyle=ok?'#d1fae5':W;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,7);g.fill();g.lineWidth=ok?2.5:1.4;g.strokeStyle=ok?G:M;g.stroke();
g.fillStyle=K;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||W;A.paint.rrect(r.x,r.y,r.w,r.h,7);g.fill();g.lineWidth=o.ed?3.5:1.5;g.strokeStyle=o.ed||M;g.stroke();
if(t==null)return;g.fillStyle=o.fg||K;g.font=ft(o.n||18,o.w||700);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function txt(t,y,n,col,w){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=ft(n||15,w||600);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
const moving=(r,j)=>{const h=T.hold;return h&&h.j===j?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};
function row3(list,y,h){const n=list.length,gp=6,w=Math.min(s9(150),(A.W-16-gp*(n-1))/n);h=h||s9(50);const tot=n*w+(n-1)*gp;return list.map((t,j)=>({x:A.W/2-tot/2+j*(w+gp),y,w,h,t,j}))}
/* 1 */
const track=()=>({x:24,y:A.H*.84,w:A.W-48,h:s9(30)}),xOf=v=>{const t=track();return t.x+(v+2.5)/5*t.w};
function drawBars(){const s=T.bars,g=A.ctx,x=s.x,c2=C(x)**2,s2=S(x)**2;bg();tag(`x = ${r2(x)}: checks ${Object.keys(s.seen).length} of 3`,A.H*.07,Object.keys(s.seen).length>=3);
const base=A.H*.7,top=A.H*.18,sc=(base-top)/16,bw=Math.min(s9(70),A.W/6),xs=[A.W*.22,A.W*.5,A.W*.78];
[[c2,'#fef3c7','#b45309','cosh²x'],[s2,'#cffafe','#0e7490','sinh²x'],[c2-s2,'#d1fae5',G,'difference']].forEach(([v,f,e,l],i)=>{const h=Math.max(2,v*sc);g.fillStyle=f;g.fillRect(xs[i]-bw/2,base-h,bw,h);g.lineWidth=2;g.strokeStyle=e;g.strokeRect(xs[i]-bw/2,base-h,bw,h);
box({x:xs[i]-s9(48),y:base-h-s9(30),w:s9(96),h:s9(24)},r2(v),{n:14});g.fillStyle=A.col.tx;g.font=ft(13,700);g.textAlign='center';g.fillText(l,xs[i],base+s9(14))});
const t=track();g.fillStyle=A.col.dark?'#334155':'#cbd5e1';A.paint.rrect(t.x,t.y+t.h/2-4,t.w,8,4);g.fill();[-2,-1,0,1,2].forEach(v=>{g.fillStyle=A.col.tx;g.font=ft(11,600);g.fillText(String(v).replace('-','−'),xOf(v),t.y-6)});
g.fillStyle=D;g.beginPath();g.arc(xOf(x),t.y+t.h/2,s9(13),0,7);g.fill();g.strokeStyle=W;g.lineWidth=3;g.stroke()}
function setX(v){const s=T.bars;s.x=Math.max(-2.5,Math.min(2.5,Math.round(v*10)/10));const k=s.x<=-1.5?'left':s.x>=1.5?'right':Math.abs(s.x)<.05?'zero':null,was=Object.keys(s.seen).length;if(k)s.seen[k]=1;
const c2=C(s.x)**2,s2=S(s.x)**2,n=Object.keys(s.seen).length;if(n>was)A.sound.pop();say(`x = ${r2(s.x)}. cosh²x = ${r2(c2)}, sinh²x = ${r2(s2)}, difference = ${r2(c2-s2)}.`+(n>=3&&n>was?' Always 1.':''))}
/* 2 */
const blank=()=>{const w=Math.min(A.W-20,s9(340));return{x:A.W/2-w/2,y:A.H*.2,w,h:s9(56)}};
function drawProof(){const s=T.proof,g=A.ctx;bg();tag(s.n>=3?'Proved: cosh²x − sinh²x = 1':`Line ${s.n+1} of 3: fill the box`,A.H*.07,s.n>=3);
txt('(a ± b)² = a² ± 2ab + b²',A.H*.15+s9(52)+A.H*.03,13);
PROOF.forEach((q,i)=>{if(i>s.n)return;const y=i<s.n?A.H*(.42+i*.09):A.H*.2;const t=i<s.n?q[0].replace('□',q[1]):q[0];
if(i===s.n)box(blank(),t,{n:17,ed:s.bad!=null?R:D});else txt(t,y,16,GT(),700)});
if(s.n<3)row3(PT,A.H*.72).forEach(r=>box(moving(r,r.j),r.t,{bg:IB[0],fg:IB[1],n:20,ed:T.hold&&T.hold.j===r.j?D:s.bad===r.j?R:null}))}
function proof(j){const s=T.proof;if(s.n>=3)return;const ok=PROOF[s.n][1],v=PT[j];
if(v!==ok){s.bad=j;A.sound.miss();return say(s.n===2?(v==='0'?'The e²ˣ terms cancel; 2 − (−2) = 4.':'2 − (−2) = 4, so 4/4 = 1.'):v==='0'?'eˣ · e⁻ˣ = e⁰ = 1, not 0.':v==='1'?'The cross term is 2 · eˣ · e⁻ˣ = 2.':s.n===0?'cosh has a plus, so the cross term is +2.':'sinh has a minus, so the cross term is −2.')}
s.n++;s.bad=null;A.sound.pop();say(PROOF[s.n-1][0].replace('□',ok)+(s.n>=3?' Proved.':''))}
/* 3 */
function osbTerms(){const g=A.ctx,q=OSB[T.osb.n];g.font=ft(17,700);const h=s9(50),gp=8,ws=q[1].map(t=>Math.max(s9(80),g.measureText(t[0]).width+s9(46)));
const tot=ws.reduce((a,b)=>a+b,0)+gp*(ws.length-1);let x=A.W/2-tot/2;return q[1].map((t,i)=>{const r={x,y:A.H*.36,w:ws[i],h,i};x+=ws[i]+gp;return r})}
const checkBtn=()=>{const w=Math.min(A.W-60,s9(200));return{x:A.W/2-w/2,y:A.H*.7,w,h:s9(50)}};
function drawOsb(){const s=T.osb,g=A.ctx;bg();if(s.n>=OSB.length){tag('All 6 converted',A.H*.07,1);OSBF.forEach((t,i)=>txt(t,A.H*(.18+i*.12),15));return}
const q=OSB[s.n];tag(`Identity ${s.n+1} of 6: tap the signs to flip`,A.H*.07);txt('trig: '+q[0],A.H*.2,14,A.col.tx,600);
osbTerms().forEach((r,i)=>{const t=q[1][i],sg=(t[1]==='+')!==!!s.flip[i]?'+':'−';box(r,`${sg} ${t[0]}`,{n:17,bg:s.flip[i]?'#fde68a':W,ed:s.bad===i?R:null})});
txt(q[2],A.H*.36+s9(50)+s9(22),17,A.col.tx,700);txt('Flip every product of two sinh terms',A.H*.6,13);box(checkBtn(),'Check',{bg:'#d1fae5',fg:G,n:18})}
function flipT(i){const s=T.osb;if(s.n>=OSB.length)return;s.flip[i]=!s.flip[i];s.bad=null;A.sound.tick();const t=OSB[s.n][1][i];say(`${t[0]} sign ${s.flip[i]?'flipped':'restored'}.`)}
function check(){const s=T.osb;if(s.n>=OSB.length)return;const q=OSB[s.n];let bad=-1;q[1].forEach((t,i)=>{if(bad<0&&!!s.flip[i]!==!!t[2])bad=i});
if(bad>=0){const t=q[1][bad];s.bad=bad;A.sound.miss();return say(t[2]?(/tanh/.test(t[0])?'tanh²x = sinh²x / cosh²x hides a product of two sinh terms: flip it.':`${t[0]} contains sinh × sinh, so its sign flips.`):`${t[0]} has at most one sinh, so its sign stays.`)}
s.n++;s.flip={};s.bad=null;A.sound.pop();say(`Right. ${s.n>=OSB.length?'All 6 converted.':'Next identity.'}`)}
/* 4 */
const FB=['= cosh 2x','≠ cosh 2x'];
function bins(y){const gp=8,w=(A.W-20-gp)/2;return FB.map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,t,j}))}
const fcard=()=>{const w=Math.min(A.W-40,s9(240));return{x:A.W/2-w/2,y:A.H*.16,w,h:s9(52)}};
function drawFaces(){const s=T.faces,g=A.ctx;bg();tag(s.n>=FACES.length?'All 8 sorted':`Card ${s.n+1} of 8: is it cosh 2x?`,A.H*.07,s.n>=FACES.length);
bins(A.H*.42).forEach(b=>{g.fillStyle=b.j?'#ffe4e6':'#d1fae5';A.paint.rrect(b.x,b.y,b.w,b.h,9);g.fill();g.lineWidth=s.bad===b.j?4:2;g.strokeStyle=s.bad===b.j?R:b.j?'#9f1239':G;g.stroke();
g.fillStyle=K;g.textAlign='center';g.textBaseline='top';g.font=ft(15,800);g.fillText(b.t,b.x+b.w/2,b.y+7);g.font=ft(13,600);FACES.slice(0,s.n).filter(f=>f[1]===b.j).forEach((f,i)=>g.fillText(f[0],b.x+b.w/2,b.y+s9(30)+i*s9(19),b.w-6))});
if(s.n<FACES.length)box(moving(fcard(),0),FACES[s.n][0],{n:20,ed:T.hold?D:null})}
function face(j){const s=T.faces;if(s.n>=FACES.length)return;const [e,k]=FACES[s.n];
if(j!==k){s.bad=j;A.sound.miss();return say(k?FWHY[e]:`${e} = cosh 2x: swap forms with cosh²x − sinh²x = 1.`)}
s.n++;s.bad=null;A.sound.pop();say(`${e} ${FB[k]}.`+(s.n>=FACES.length?' All 8 sorted.':''))}
/* 5 */
const o3=(q,r)=>{const a=[q[1],q[2],q[3]];r%=3;return a.slice(r).concat(a.slice(0,r))},uOrd=n=>o3(USE[n],n),sOrd=n=>o3(SIMP[n],n+1);
function drawUse(){const s=T.use;bg();if(s.n>=USE.length){tag('Both found',A.H*.07,1);['cosh x = 5/4: one value','tanh x = 3/5','sinh x = ± 4/3: two values'].forEach((t,i)=>txt(t,A.H*(.3+i*.14),16,GT(),700));return}
tag(`Step ${s.n+1} of 5`,A.H*.07);s.log.forEach((t,i)=>txt(t,A.H*(.16+i*.07),14,GT(),700));box({x:10,y:A.H*.52,w:A.W-20,h:s9(48)},USE[s.n][0]+' ?',{n:16});
row3(uOrd(s.n),A.H*.7).forEach(r=>box(r,r.t,{bg:IB[0],fg:IB[1],n:19,ed:s.bad===r.t?R:null}))}
function use(v){const s=T.use;if(s.n>=USE.length)return;const q=USE[s.n];
if(v!==q[1]){s.bad=v;A.sound.miss();const why=q[4].split('|');return say(why[v===q[2]?0:1])}
s.log.push(q[0]+' '+q[1]);s.n++;s.bad=null;A.sound.pop();say(`${q[1]}.`+(s.n>=USE.length?' Done: one value for cosh, two for sinh.':''))}
/* 6 */
const slot=()=>{const w=Math.min(A.W-20,s9(330));return{x:A.W/2-w/2,y:A.H*.24,w,h:s9(58)}};
function drawSimp(){const s=T.simp;bg();if(s.n>=SIMP.length){tag('All 4 simplified',A.H*.07,1);SIMP.forEach((q,i)=>txt(`${q[0]} = ${q[1]}`,A.H*(.22+i*.15),17,GT(),700));return}
tag(`Expression ${s.n+1} of 4: drag its simplest form`,A.H*.07);box(slot(),SIMP[s.n][0]+' = □',{n:19,ed:s.bad!=null?R:D});if(s.last)txt(s.last,A.H*.5,13);
row3(sOrd(s.n),A.H*.66).forEach(r=>box(moving(r,r.j),r.t,{bg:IB[0],fg:IB[1],n:19,ed:T.hold&&T.hold.j===r.j?D:s.bad===r.t?R:null}))}
function simp(v){const s=T.simp;if(s.n>=SIMP.length)return;const q=SIMP[s.n];
if(v!==q[1]){s.bad=v;A.sound.miss();return say(`Not ${v}. ${SWHY[s.n]}`)}
s.last=`${q[0]} = ${q[1]}`;s.n++;s.bad=null;A.sound.pop();say(s.last+'.'+(s.n>=SIMP.length?' All 4 simplified.':''))}
function draw(){const k=st();if(k==='quiz'){bg();tag('Challenge',A.H*.25,1);tag('cosh²x − sinh²x = 1',A.H*.55);return}
({bars:drawBars,proof:drawProof,osb:drawOsb,faces:drawFaces,use:drawUse,simp:drawSimp})[k]();A.fx.draw(A.ctx)}
function dn(p){const k=st(),grab=j=>{T.hold={j,x:p.x,y:p.y};return true};
if(k==='bars'){const t=track();if(p.y>t.y-s9(20)){T.slide=1;setX((p.x-t.x)/t.w*5-2.5);return true}return false}
if(k==='proof'&&T.proof.n<3){const r=row3(PT,A.H*.72).find(r=>inR(p,r));return r?grab(r.j):false}
if(k==='osb'&&T.osb.n<OSB.length){const r=osbTerms().find(r=>inR(p,r));if(r)flipT(r.i);else if(inR(p,checkBtn()))check();return false}
if(k==='faces'&&T.faces.n<FACES.length){if(inR(p,fcard()))return grab(0);const b=bins(A.H*.42).find(r=>inR(p,r));if(b)face(b.j);return false}
if(k==='use'&&T.use.n<USE.length){const r=row3(uOrd(T.use.n),A.H*.7).find(r=>inR(p,r));if(r)use(r.t);return false}
if(k==='simp'&&T.simp.n<SIMP.length){const r=row3(sOrd(T.simp.n),A.H*.66).find(r=>inR(p,r));return r?grab(r.j):false}return false}
function mv(p){if(T.slide){const t=track();setX((p.x-t.x)/t.w*5-2.5);return}if(T.hold){T.hold.x=p.x;T.hold.y=p.y;A.redraw()}}
function upp(p){if(T.slide){T.slide=0;return}const h=T.hold;if(!h)return;T.hold=null;const k=st();
if(k==='proof'){if(p.y<A.H*.62||inR(p,row3(PT,A.H*.72)[h.j]))proof(h.j);else A.redraw();return}
if(k==='faces'){const b=bins(A.H*.42).find(r=>inR(p,r));if(b)face(b.j);else A.redraw();return}
if(k==='simp'){const r=row3(sOrd(T.simp.n),A.H*.66)[h.j];if(p.y<A.H*.58||inR(p,r))simp(r.t);else A.redraw()}}
function zero(){tok++;for(const k in T)delete T[k];Object.assign(T,{bars:{x:.5,seen:{}},proof:{n:0},osb:{n:0,flip:{}},faces:{n:0},use:{n:0,log:[]},simp:{n:0},hold:null,slide:0,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();T.check()}
function arm(i,desc,ok,msg){zero();say(desc);T.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function pad(){if(!ctl)return;ctl.innerHTML='';const k=st(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='bars'){b('x − 0.5',()=>setX(T.bars.x-.5));b('x + 0.5',()=>setX(T.bars.x+.5));b('x = 0',()=>setX(0))}
if(k==='proof'&&T.proof.n<3)PT.forEach((t,j)=>b(t,()=>proof(j),`Put ${t} in the box`));
if(k==='osb'&&T.osb.n<OSB.length){OSB[T.osb.n][1].forEach((t,i)=>b('flip '+t[0],()=>flipT(i),`Flip the sign of ${t[0]}`));b('Check',check,'Check the hyperbolic identity')}
if(k==='faces'&&T.faces.n<FACES.length)FB.forEach((t,j)=>b(t,()=>face(j),`${FACES[T.faces.n][0]} ${t}`));
if(k==='use'&&T.use.n<USE.length)uOrd(T.use.n).forEach(t=>b(t,()=>use(t),`Answer ${t}`));
if(k==='simp'&&T.simp.n<SIMP.length)sOrd(T.simp.n).forEach(t=>b(t,()=>simp(t),`${SIMP[T.simp.n][0]} equals ${t}`))}
const steps=[
{h:'Minus, not plus',p:'For trig, cos²x + sin²x = 1. Drag x and watch cosh²x and sinh²x. Check x ≤ −1.5, x = 0 and x ≥ 1.5.',
predict:{q:'Which is true for every x?',opts:['cosh²x + sinh²x = 1','cosh²x − sinh²x = 1'],ans:1},task:'Check all 3 regions',
show:()=>auto(0,[()=>setX(-2),()=>setX(0),()=>setX(2)],700),
go:()=>arm(0,'x = 0.50. Drag the dot along the track.',()=>Object.keys(T.bars.seen).length>=3,'Both squares grow, but their difference is always exactly 1.')},
{h:'Prove it from eˣ',p:'cosh x = (eˣ + e⁻ˣ)/2 and sinh x = (eˣ − e⁻ˣ)/2. Square each, then subtract. Drag the missing number into each box.',
predict:{q:'eˣ × e⁻ˣ = ?',opts:['0','1'],ans:1},task:'Fill all 3 boxes',
show:()=>auto(1,PROOF.map(q=>()=>proof(PT.indexOf(q[1]))),800),
go:()=>arm(1,'cosh²x = (e²ˣ + box + e⁻²ˣ)/4. Drag a number in.',()=>T.proof.n>=3,'The squares cancel and 2 − (−2) leaves 4/4 = 1.')},
{h:'Osborn\'s rule',p:'Swap each trig function for its hyperbolic partner, then flip the sign of every product of two sines. tan²x = sin²x/cos²x hides one. Tap a term to flip its sign.',task:'Convert all 6',
show:()=>auto(2,OSB.flatMap(q=>q[1].map((t,i)=>t[2]?()=>flipT(i):null).filter(Boolean).concat([()=>check()])),420),
go:()=>arm(2,'cos²x + sin²x = 1. Tap terms to flip, then Check.',()=>T.osb.n>=OSB.length,'Osborn gives the form; the proof from eˣ shows it is true.')},
{h:'Three faces of cosh 2x',p:'cosh 2x = cosh²x + sinh²x. Swap in sinh²x = cosh²x − 1 for 2cosh²x − 1, or cosh²x = 1 + sinh²x for 1 + 2sinh²x. Sort each card.',task:'Sort all 8 cards',
show:()=>auto(3,FACES.map(f=>()=>face(f[1])),450),
go:()=>arm(3,'cosh²x + sinh²x. Is it cosh 2x?',()=>T.faces.n>=FACES.length,'cosh 2x = cosh²x + sinh²x = 2cosh²x − 1 = 1 + 2sinh²x.')},
{h:'One value or two?',p:'From sinh to cosh there is one answer, because cosh x ≥ 1. From cosh to sinh there are two, because x and −x share a cosh.',task:'Work all 5 steps',
show:()=>auto(4,USE.map(q=>()=>use(q[1])),700),
go:()=>arm(4,'sinh x = 3/4, so cosh²x = ? Tap a value.',()=>T.use.n>=USE.length,'Keep the ± when finding sinh from cosh; drop it when finding cosh.')},
{h:'Simplify',p:'Spot the identity in each: a double argument, a difference of squares, or cosh²x − sinh²x = 1. Drag the simplest form into the box.',task:'Simplify all 4',
show:()=>auto(5,SIMP.map(q=>()=>simp(q[1])),800),
go:()=>arm(5,'(1 + cosh 2x) / 2. Drag its simplest form in.',()=>T.simp.n>=SIMP.length,'Rewrite with the right form of cosh 2x, then cancel.')},
{h:'Challenge',p:'',go:()=>{zero();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.check()});
const QS=[
{q:'Which identity is true for all x?',a:'cosh²x − sinh²x = 1',o:[['cosh²x + sinh²x = 1','trig'],['sinh²x − cosh²x = 1','order']]},
{q:'cosh 2x = ?',a:'1 + 2 sinh²x',o:[['1 − 2 sinh²x','osb'],['2 sinh x cosh x','sinh2']]},
{q:'Osborn on 1 + tan²x = sec²x gives:',a:'1 − tanh²x = sech²x',o:[['1 + tanh²x = sech²x','hidden'],['tanh²x − 1 = sech²x','order']]},
{q:'cosh x = 13/12. sinh x = ?',a:'± 5/12',o:[['5/12','pm'],['± 25/144','root']]},
{q:'sinh x = 4/3. cosh x = ?',a:'5/3',o:[['± 5/3','cosh1'],['√7/3','sub']]}];
function slip(t){let m='Start from cosh²x − sinh²x = 1.';
switch(t){case 'trig':m='That is the trig shape. For cosh and sinh the sign is minus.';break;
case 'order':m='cosh x ≥ |sinh x|, so cosh² minus sinh² is the positive 1.';break;
case 'osb':m='1 − 2 sinh²x is the cos 2x shape. Osborn flips the sinh² sign.';break;
case 'sinh2':m='2 sinh x cosh x is sinh 2x.';break;
case 'hidden':m='tan²x = sin²x / cos²x hides a product of two sines, so flip its sign.';break;
case 'pm':m='x and −x have the same cosh, so sinh can be either sign.';break;
case 'root':m='Take the square root of 25/144.';break;
case 'cosh1':m='cosh x ≥ 1, so only the positive root.';break;
case 'sub':m='cosh²x = 1 + sinh²x, so add: 1 + 16/9 = 25/9.';break;}
return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const grp=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:B=>{qz.hidden=B.step!==6;ctl.hidden=B.step===6;pad()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Identity buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);zero();A.gest({down:dn,move:mv,up:upp});pad()}}).start()})})();
