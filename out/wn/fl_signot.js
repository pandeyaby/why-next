/* Flagship – sigma notation (ages 16–18, A level Pure: sequences and series): plug r into the general term only between
   the limits, count terms as upper − lower + 1, build the general term and top limit for a series, split a sum by
   linearity (Σ c = nc), and shift the index without changing the sum. */
(()=>{const MI='−',sg=v=>v<0?MI+(-v):''+v;
/* [lo, hi, term label, f(r)] */
const READ=[[1,4,'2r + 1',r=>2*r+1],[2,5,'r²',r=>r*r],[0,3,'3 × 2ʳ',r=>3*2**r]];
/* [lo, wanted count] */
const CNT=[[3,8],[0,5],[5,6]];
/* [terms shown, a, b, N]: general term a·r + b, r = 1..N */
const FORM=[[[3,7,11],4,-1,11],[[5,8,11],3,2,10],[[10,8,6],-2,12,6]];
const lastOf=F=>F[1]*F[3]+F[2];
/* [n, constant c, coefficient k]: Σ (k r + c) for r = 1..n */
const SPL=[[5,1,2],[8,3,1]];
/* [lo, hi, term, value, options [lo,hi,term,ok,why]] */
const SHIFT=[[1,4,'2r + 1',24,[[0,3,'2r + 3',1,''],[0,3,'2r + 1',0,'Same limits shift, but the term was not changed: 1 + 3 + 5 + 7 = 16, not 24.'],[0,4,'2r + 3',0,'r = 0 to 4 is 5 terms. The shifted sum must still have 4.']]],
 [2,6,'r',20,[[1,5,'r + 1',1,''],[1,5,'r',0,'Σ r from 1 to 5 is 15. Moving the limits down by 1 means writing r + 1 in the term.'],[1,5,'r − 1',0,'Shifting down means each old r is the new r + 1, not r − 1. r − 1 gives 0 + 1 + 2 + 3 + 4 = 10.']]],
 [1,5,'r²',55,[[0,4,'(r + 1)²',1,''],[0,4,'r² + 1',0,'(r + 1)² is not r² + 1. r² + 1 gives 1 + 2 + 5 + 10 + 17 = 35.'],[0,5,'(r + 1)²',0,'0 to 5 is 6 terms; the extra term 36 makes 91.']]]];
VIS.reg('flagsignot',c=>{let A,X,pad,chal,qk=-1,tick=0;const Z={};
const INK='#0f172a',BG1='#ffffff',RIM='#64748b',YES='#047857',NO='#be123c',BLUE='#1d4ed8',RED='#fde2e7',GRN='#d1fae5',YEL='#fef3c7',CYAN='#e0f2fe',VIO='#ede9fe',ORG='#c2410c';
const q=n=>Math.round(n*(A.narrow?.9:1.05)),F=(n,w,f)=>`${w||700} ${q(n)}px ${f||'system-ui,sans-serif'}`,on=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const ST=['read','cnt','form','spl','shift','quiz'],cur=()=>ST[A.step],SRC={read:READ,cnt:CNT,form:FORM,spl:SPL,shift:SHIFT},end=n=>Z[n].i>=SRC[n].length;
const red=()=>A.col.dark?'#fda4af':NO;
function bg(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function fx(n,w,al){X.font=F(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function txt(t,x,y,w,n){const L=[];let s='';String(t).split(' ').forEach(u=>{const v=s?s+' '+u:u;if(s&&X.measureText(v).width>w){L.push(s);s=u}else s=v});L.push(s);
 const g=q(n)*1.28;L.forEach((l,i)=>X.fillText(l,x,y+(i-(L.length-1)/2)*g))}
function box(r,t,o={}){X.fillStyle=o.bg||BG1;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||RIM;X.stroke();
 if(t!=null){X.fillStyle=o.fg||INK;fx(o.n||17,o.w||700);txt(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function title(t,won){fx(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=q(14)+14,y=A.H*.02;box({x:A.W/2-w/2,y,w,h},null,{bg:won?GRN:BG1,ring:won?YES:null});X.fillStyle=INK;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function say2(t,y,n,col){X.fillStyle=col||A.col.tx;fx(n||14,650);txt(t,A.W/2,y,A.W-28,n||14)}
function done(t,L){bg();title(t,1);L.forEach((s,i)=>box({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* draw Σ with limits; returns width used */
function sigma(x,y,lo,hi,term,n){n=n||22;X.fillStyle=A.col.tx;fx(n*1.9,500);X.fillText('Σ',x,y);fx(n*.62,800);X.fillText('r = '+lo,x,y+q(n*1.25));X.fillText(''+hi,x,y-q(n*1.2));
 fx(n,700,'left');const t=term.includes(' ')?'('+term+')':term;X.fillText(t,x+q(n*.85),y+2);return q(n*.85)+X.measureText(t).width}
function sigC(y,lo,hi,term,n){fx(n||22,700);const t=term.includes(' ')?'('+term+')':term,w=q((n||22)*.85)+X.measureText(t).width;sigma(A.W/2-w/2,y,lo,hi,term,n)}
/* ---- 1: plug in r between the limits ---- */
function rR(){const w=Math.min(q(46),(A.W-24)/7-6),tot=7*w+36;return[0,1,2,3,4,5,6].map((v,j)=>({v,x:A.W/2-tot/2+j*(w+6),y:A.H*.42,w,h:q(48)}))}
function drawRead(){const s=Z.read;bg();if(end('read'))return done('All 3 sums read',['Put each r from the bottom limit to the top one into the term.','Then add the terms.']);
 const [lo,hi,term,f]=READ[s.i];title(`Sum ${s.i+1} of 3: tap each r that belongs`);sigC(A.H*.21,lo,hi,term,24);
 rR().forEach(r=>{const got=s.got.includes(r.v);box(r,String(r.v),{n:19,bg:got?GRN:s.bad===r.v?RED:CYAN,ring:s.bad===r.v?NO:got?YES:null})});
 const T=s.got.slice().sort((a,b)=>a-b).map(f);say2(T.length?T.join(' + ')+(s.got.length===hi-lo+1?' = '+T.reduce((a,b)=>a+b,0):' + …'):'r = 0 1 2 3 4 5 6: which go in?',A.H*.62,17);if(s.msg)say2(s.msg,A.H*.76,13,red())}
function read(v){const s=Z.read;if(end('read'))return;const [lo,hi,term,f]=READ[s.i];let m;if(s.got.includes(v))return;
 if(v<lo||v>hi){s.bad=v;A.sound.miss();m=v<lo?`r = ${v} is below the bottom limit ${lo}, so it is not in this sum.`:`r = ${v} is above the top limit ${hi}. The sum stops at r = ${hi}.`;s.msg=m;return talk(m)}
 s.got.push(v);s.bad=null;s.msg='';A.sound.pop();if(s.got.length===hi-lo+1){const T=[];for(let r=lo;r<=hi;r++)T.push(f(r));s.i++;s.got=[];return talk(`${T.join(' + ')} = ${T.reduce((a,b)=>a+b,0)}.`)}
 talk(`r = ${v} gives ${f(v)}.`)}
/* ---- 2: drag the top limit to get the right number of terms ---- */
const RMAX=12;function lineGeo(){const x0=q(26),x1=A.W-q(26),y=A.H*.52;return{x0,x1,y,dx:(x1-x0)/RMAX}}
function hiR(){const g=lineGeo(),h=Z.cnt.hi;return{x:g.x0+h*g.dx-q(20),y:g.y-q(56),w:q(40),h:q(46)}}
function okR(){const w=q(150);return{x:A.W/2-w/2,y:A.H*.76,w,h:q(50)}}
function drawCnt(){const s=Z.cnt;bg();if(end('cnt'))return done('All 3 windows set',['Terms = top − bottom + 1.','Both limits are included.']);
 const [lo,k]=CNT[s.i],g=lineGeo();title(`Sum ${s.i+1} of 3: give it exactly ${k} terms`);sigC(A.H*.17,lo,s.hi,'r²',20);
 X.strokeStyle=A.col.tx;X.lineWidth=2;X.beginPath();X.moveTo(g.x0,g.y);X.lineTo(g.x1,g.y);X.stroke();
 for(let r=0;r<=RMAX;r++){const x=g.x0+r*g.dx,inn=r>=lo&&r<=s.hi;X.fillStyle=inn?(A.col.dark?'#6ee7b7':YES):A.col.dark?'#64748b':'#94a3b8';X.beginPath();X.arc(x,g.y,inn?q(7):q(4),0,7);X.fill();X.fillStyle=A.col.tx;fx(12,600);X.fillText(r,x,g.y+q(18))}
 const hr=hiR();box(hr,'top',{n:12,bg:VIO,fg:'#3b0764',ring:A.col.dark?'#93c5fd':BLUE});say2(`${s.hi-lo+1} term${s.hi>lo?'s':''}: r = ${lo} to ${s.hi}`,A.H*.64,15);
 box(okR(),'Check',{n:17,bg:YEL});if(s.msg)say2(s.msg,A.H*.9,12,red())}
function setHi(h){const s=Z.cnt,lo=CNT[s.i][0];s.hi=Math.max(lo,Math.min(RMAX,h));s.msg='';A.redraw();if(A.cv)A.cv.setAttribute('aria-label',`Top limit ${s.hi}: ${s.hi-lo+1} term${s.hi>lo?'s':''}`)}
function cnt(){const s=Z.cnt;if(end('cnt'))return;const [lo,k]=CNT[s.i],n=s.hi-lo+1;let m;
 if(n===k){s.i++;s.msg='';if(!end('cnt'))s.hi=CNT[s.i][0];A.sound.pop();return talk(`Yes: r = ${lo} to ${lo+k-1} is ${lo+k-1} − ${lo} + 1 = ${k} terms.`)}
 A.sound.miss();if(n===k+1)m=`That is ${n} terms. ${s.hi} − ${lo} = ${k} counts the gaps, but both ends are included, so stop at ${lo+k-1}.`;
 else if(n===k-1)m=`Only ${n} terms. Count the dots: ${lo} itself is the first term.`;else m=`${n} terms. You need ${k}: top = ${lo} + ${k} − 1.`;s.msg=m;talk(m)}
/* ---- 3: build the general term a r + b and the top limit N ---- */
const KN=['a','b','N'];function knR(){const w=(A.W-36)/3,h=q(44);return KN.flatMap((k,j)=>[{k,d:-1,t:MI,x:12+j*(w+6),y:A.H*.6,w:w/2-3,h},{k,d:1,t:'+',x:12+j*(w+6)+w/2+3,y:A.H*.6,w:w/2-3,h}])}
function gen(){const s=Z.form,o=[];for(let r=1;r<=Math.min(s.N,4);r++)o.push(s.a*r+s.b);return o}
function drawForm(){const s=Z.form;bg();if(end('form'))return done('All 3 series written',['Coefficient of r = common difference.','Put r = 1 to fix the constant.','Solve last term = aN + b for N.']);
 const Fm=FORM[s.i],L=lastOf(Fm);title(`Series ${s.i+1} of 3: write it in Σ form`);box({x:12,y:A.H*.1,w:A.W-24,h:A.H*.09},`${Fm[0].map(sg).join(' + ')} + … + ${sg(L)}`,{n:18,bg:YEL});
 const term=`${s.a===1?'':s.a===-1?MI:sg(s.a)}r ${s.b<0?MI:'+'} ${Math.abs(s.b)}`;sigC(A.H*.33,1,s.N,term,20);
 const G=gen(),last=s.a*s.N+s.b;say2(`gives ${G.map(sg).join(' + ')}${s.N>4?' + … + '+sg(last):''}`,A.H*.49,14);
 knR().forEach(r=>box(r,`${r.t} ${r.k}`,{n:16,bg:VIO,fg:'#3b0764'}));X.fillStyle=A.col.tx;fx(13,700);KN.forEach((k,j)=>{const w=(A.W-36)/3;X.fillText(`${k} = ${sg(s[k])}`,12+j*(w+6)+w/2,A.H*.6+q(56))});
 box(okR(),'Check',{n:17,bg:YEL});if(s.msg)say2(s.msg,A.H*.9,12,red())}
function knob(k,d){const s=Z.form;if(end('form'))return;s[k]=Math.max(k==='N'?1:-20,Math.min(k==='N'?30:20,s[k]+d));s.msg='';A.redraw();A.cv.setAttribute('aria-label',`a = ${s.a}, b = ${s.b}, N = ${s.N}`)}
function form(){const s=Z.form;if(end('form'))return;const Fm=FORM[s.i],[T,a,b,N]=Fm,L=lastOf(Fm);let m;
 if(s.a===a&&s.b===b&&s.N===N){s.i++;Object.assign(s,{a:1,b:0,N:1,msg:''});A.sound.pop();return talk(`Yes: Σ from r = 1 to ${N} of (${sg(a)}r ${b<0?MI:'+'} ${Math.abs(b)}).`)}
 A.sound.miss();if(s.a!==a)m=`The terms change by ${sg(a)} each time, so the coefficient of r must be ${sg(a)}.`;
 else if(s.b!==b)m=`Put r = 1: ${sg(a)} + b must give the first term ${sg(T[0])}, so b = ${sg(b)}.`;
 else m=`Last term: ${sg(a)}N ${b<0?MI:'+'} ${Math.abs(b)} = ${sg(L)} gives N = ${N}, not ${s.N}.`;s.msg=m;talk(m)}
/* ---- 4: split the sum (stacked bars) ---- */
function chR(){const s=Z.spl,[n,cc,k]=SPL[s.i],tri=n*(n+1)/2,Q=[[n*cc,cc,n*cc*2],[k*tri,k*n,k*tri+n],[k*tri+n*cc,k*tri+cc,k*tri*2]][s.q],w=(A.W-36)/3;return Q.map((v,j)=>({v,x:12+j*(w+6),y:A.H*.78,w,h:q(48)}))}
function qTxt(){const [n,cc,k]=SPL[Z.spl.i];return[`Σ ${cc} for r = 1 to ${n}`,`Σ ${k===1?'':k}r for r = 1 to ${n}`,`Σ (${k===1?'':k}r + ${cc}) for r = 1 to ${n}`][Z.spl.q]}
function drawSpl(){const s=Z.spl;bg();if(end('spl'))return done('Both sums split',['Σ c = nc: the constant is added n times.','Σ kr = k × n(n + 1)/2.','Add the parts.']);
 const [n,cc,k]=SPL[s.i];title(`Sum ${s.i+1} of 2: split it, part ${s.q+1} of 3`);const bw=(A.W-40)/n,top=A.H*.12,base=A.H*.5,mx=k*n+cc,u=(base-top)/mx;
 for(let r=1;r<=n;r++){const x=20+(r-1)*bw+3,w=bw-6,h1=k*r*u,h2=cc*u,sh=s.q===1||s.q===2,sc=s.q===0||s.q===2;
  X.fillStyle=sh?(A.col.dark?'#60a5fa':BLUE):A.col.dark?'#334155':'#cbd5e1';X.fillRect(x,base-h1,w,h1);X.fillStyle=sc?ORG:A.col.dark?'#475569':'#e2e8f0';X.fillRect(x,base-h1-h2,w,h2);
  X.fillStyle=A.col.tx;fx(11,700);X.fillText('r='+r,x+w/2,base+q(11))}
 box({x:12,y:A.H*.58,w:A.W-24,h:A.H*.14},qTxt()+' = ?',{n:18,bg:CYAN});say2('blue = the r part, orange = the constant',A.H*.55,11);chR().forEach(r=>box(r,String(r.v),{n:20,bg:s.bad===r.v?RED:BG1,ring:s.bad===r.v?NO:null}));if(s.msg)say2(s.msg,A.H*.93,11,red())}
function spl(v){const s=Z.spl;if(end('spl'))return;const [n,cc,k]=SPL[s.i],tri=n*(n+1)/2,want=[n*cc,k*tri,k*tri+n*cc][s.q];let m;
 if(v===want){A.sound.pop();s.bad=null;s.msg='';const said=`${qTxt()} = ${want}.`;if(++s.q>2){s.q=0;s.i++}return talk(said)}
 s.bad=v;A.sound.miss();if(s.q===0)m=v===cc?`Σ ${cc} is not ${cc}: the constant ${cc} is added once for each of the ${n} values of r, so ${n} × ${cc}.`:`Each of the ${n} terms is ${cc}, so ${n} × ${cc}.`;
 else if(s.q===1)m=`Σ r for r = 1 to ${n} is ${n}(${n + 1})/2 = ${tri}${k>1?`, then times ${k}`:''}.`;else m=`Add the two parts: ${k*tri} + ${n*cc}.`;s.msg=m;talk(m)}
/* ---- 5: shift the index ---- */
function shR(){const O=SHIFT[Z.shift.i][4],h=q(62);return[1,0,2].map((j,i)=>({o:O[j],x:12,y:A.H*.4+i*(h+q(8)),w:A.W-24,h}))}
function drawShift(){const s=Z.shift;bg();if(end('shift'))return done('All 3 shifts kept the sum',['Lower both limits by 1, write r + 1 for r.','Same number of terms, same sum.']);
 const [lo,hi,term,val]=SHIFT[s.i];title(`Sum ${s.i+1} of 3: which one is the same sum?`);sigC(A.H*.2,lo,hi,term,20);X.fillStyle=A.col.tx;fx(15,700);X.fillText('= '+val,A.W*.84,A.H*.2);
 shR().forEach(r=>{const [a,b,t]=r.o,bad=s.bad===r.o;box(r,null,{bg:bad?RED:BG1,ring:bad?NO:null});X.fillStyle=INK;fx(18,700);const tt=t.includes(' ')?'('+t+')':t;X.fillText(`Σ r = ${a} to ${b} of ${tt}`,A.W/2,r.y+r.h/2)});if(s.msg)say2(s.msg,A.H*.88,12,red())}
function shift(o){const s=Z.shift;if(end('shift'))return;let m;if(o[3]){s.i++;s.bad=null;s.msg='';A.sound.pop();return talk(`Yes: r from ${o[0]} to ${o[1]} of ${o[2]} gives the same terms.`)}
 s.bad=o;A.sound.miss();m=o[4];s.msg=m;talk(m)}
/* ---- pointer ---- */
function down(p){const k=cur();if(k==='quiz'||end(k))return false;
 if(k==='read'){const r=rR().find(r=>on(p,r));if(r)read(r.v)}
 if(k==='cnt'){if(on(p,hiR(),q(10))){Z.drag=1;return true}if(on(p,okR()))cnt()}
 if(k==='form'){const r=knR().find(r=>on(p,r));if(r)knob(r.k,r.d);else if(on(p,okR()))form()}
 if(k==='spl'){const r=chR().find(r=>on(p,r));if(r)spl(r.v)}
 if(k==='shift'){const r=shR().find(r=>on(p,r));if(r)shift(r.o)}return false}
function move(p){if(Z.drag&&cur()==='cnt'){const g=lineGeo();setHi(Math.round((p.x-g.x0)/g.dx))}}
function up(){Z.drag=0}
function reset(){tick++;for(const k in Z)delete Z[k];Object.assign(Z,{read:{i:0,got:[]},cnt:{i:0,hi:CNT[0][0]},form:{i:0,a:1,b:0,N:1},spl:{i:0,q:0},shift:{i:0},drag:0,test:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.test()}
function enter(i,first,ok,msg){reset();talk(first);Z.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=tick;acts.forEach((f,j)=>setTimeout(()=>{if(me===tick)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=cur(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='quiz'||end(k))return;
 if(k==='read')rR().forEach(r=>{if(!Z.read.got.includes(r.v))b('r = '+r.v,()=>read(r.v),`Put r = ${r.v} into the term`)});
 if(k==='cnt'){b('top − 1',()=>setHi(Z.cnt.hi-1),'Lower the top limit');b('top + 1',()=>setHi(Z.cnt.hi+1),'Raise the top limit');b('Check',cnt,'Check the number of terms')}
 if(k==='form'){knR().forEach(r=>b(`${r.t} ${r.k}`,()=>knob(r.k,r.d),`${r.d>0?'Raise':'Lower'} ${r.k}`));b('Check',form,'Check the sigma form')}
 if(k==='spl')chR().forEach(r=>b(String(r.v),()=>spl(r.v),`${qTxt()} equals ${r.v}`));
 if(k==='shift')shR().forEach(r=>b(`r = ${r.o[0]} to ${r.o[1]}: ${r.o[2]}`,()=>shift(r.o),`Sum from r = ${r.o[0]} to ${r.o[1]} of ${r.o[2]}`))}
function formDemo(){const acts=[];FORM.forEach(([,a,b,N])=>{acts.push(()=>{Object.assign(Z.form,{a,b,N});A.redraw()},()=>form())});return acts}
const steps=[
{h:'Reading Σ',p:'Σ means add up. The number under it is the first value of r, the number on top is the last. Put each r into the term, then add.',task:'Read all 3 sums',
show:()=>demo(0,READ.flatMap(([lo,hi])=>Array.from({length:hi-lo+1},(_,j)=>()=>read(lo+j))),330),go:()=>enter(0,'Tap each value of r that is in the sum.',()=>end('read'),'Every r from bottom to top, nothing else.')},
{h:'How many terms?',p:'Both limits are included. Drag the top limit along the line, or use the buttons, then check.',
predict:{q:'How many terms does Σ from r = 3 to 10 have?',opts:['7, since 10 − 3 = 7','8'],ans:1},task:'Set all 3 limits',
show:()=>demo(1,CNT.flatMap(([lo,k])=>[()=>setHi(lo+k-1),()=>cnt()]),500),go:()=>enter(1,'Drag the top limit until the sum has the right number of terms.',()=>end('cnt'),'Count = top − bottom + 1.')},
{h:'Write a series in Σ form',p:'For an arithmetic series the general term is a r + b. Set a, b and the top limit N with the buttons, then check.',
predict:{q:'3 + 7 + 11 + … + 43. Which general term?',opts:['3r + 4','4r − 1'],ans:1},task:'Write all 3 series',
show:()=>demo(2,formDemo(),450),go:()=>enter(2,'Change a, b and N until the terms match, then tap Check.',()=>end('form'),'Difference, first term, last term.')},
{h:'Split the sum',p:'Σ can be split term by term, and a constant comes out in front. Each bar is one term: blue is the r part, orange the constant.',
predict:{q:'What is Σ 3 for r = 1 to 5?',opts:['3','15'],ans:1},task:'Split both sums',
show:()=>demo(3,SPL.flatMap(([n,cc,k])=>{const t=n*(n+1)/2;return[n*cc,k*t,k*t+n*cc].map(v=>()=>spl(v))}),420),go:()=>enter(3,'Tap the value of each part.',()=>end('spl'),'Σ(kr + c) = kΣr + nc.')},
{h:'Shift the index',p:'The same sum can start at a different r. Lower both limits by 1 and every r in the term must become r + 1.',task:'Match all 3',
show:()=>demo(4,SHIFT.map(S=>()=>shift(S[4][0])),600),go:()=>enter(4,'Tap the sum that has exactly the same terms.',()=>end('shift'),'Shift the limits and the term together.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.test()});
const QS=[
{q:'Σ (2r − 1) for r = 1 to 5 equals…',a:'25',o:[['9','9 is only the last term, r = 5. Add all five: 1 + 3 + 5 + 7 + 9.'],['5','That counts the terms. Their sum is 25.']]},
{q:'How many terms does Σ from r = 4 to 20 have?',a:'17',o:[['16','20 − 4 counts gaps. Add 1 for both ends.'],['20','The sum starts at r = 4, not r = 1.']]},
{q:'Write 5 + 9 + 13 + … + 41 in Σ form (r from 1).',a:'Σ (4r + 1), r = 1 to 10',o:[['Σ (4r + 5), r = 1 to 10','At r = 1 that gives 9, not 5.'],['Σ (4r + 1), r = 1 to 41','41 is the last term, not the last r: 4N + 1 = 41, N = 10.']]},
{q:'Σ 7 for r = 1 to 10 equals…',a:'70',o:[['7','The constant is added once for every r: 10 × 7.'],['17','Multiply, do not add: 10 × 7.']]},
{q:'Which equals Σ r² for r = 1 to 4?',a:'Σ (r + 1)², r = 0 to 3',o:[['Σ r², r = 0 to 3','Limits moved but the term did not: 0 + 1 + 4 + 9 = 14, not 30.'],['Σ (r + 1)², r = 0 to 4','0 to 4 is 5 terms, one too many.']]},
{q:'Σ (3r + 2) for r = 1 to 4 equals…',a:'38',o:[['32','That adds the 2 only once. Σ 2 over 4 terms is 8, so 30 + 8.'],['30','You left out the constant: Σ 2 = 4 × 2 = 8.']]}];
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,''],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why)}
function draw(){const k=cur();if(k==='quiz'){bg();title('Challenge',1);['terms = top − bottom + 1','Σ c = nc,  Σ r = n(n + 1)/2','shift limits → r becomes r + 1'].forEach((t,i)=>box({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:17,bg:[YEL,GRN,CYAN][i]}));return}
 ({read:drawRead,cnt:drawCnt,form:drawForm,spl:drawSpl,shift:drawShift})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sigma buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
