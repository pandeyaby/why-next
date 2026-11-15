/* Flagship – numbers to 10,000 (ages 8–9; NC England Y4 number and place value, CCSS 4.NBT.A.2). Put the thousands on a
   0–10,000 line, estimate where 6,400 goes, zoom into 4,000–5,000, match words, sums and counters to numerals, count on
   across a thousand. Every action also has a button. */
(()=>{
const fmt=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,',');
const THOU=[5000,2000,9000];
const EST=[6400,2750,8050];
const ZOOM=[4300,4750,4090];
/* [shown as, kind, right numeral, [wrong numeral, why]...] */
const MATCH=[['three thousand and fifty','words',3050,[[3500,'Fifty is 5 tens, not 5 hundreds. A 0 holds the empty hundreds place: 3,050.'],[30050,'Three thousand is 3,000, not 30,000. The 3 goes in the thousands place once: 3,050.']]],
 ['6000 + 400 + 7','sum',6407,[[6470,'There are 7 ones and no tens. 6,470 has 7 tens and no ones.'],[6047,'400 is 4 hundreds, so the 4 goes in the hundreds place: 6,407.']]],
 [[8,0,2,0],'counters',8020,[[8200,'Look at the labels: those 2 counters are tens, not hundreds. So it is 8,020.'],[820,'There are 8 thousands counters, so the number is more than 8,000.']]],
 ['ten hundreds','words',1000,[[100,'Ten hundreds is 10 × 100 = 1,000.'],[10000,'10,000 is ten thousands. Ten hundreds is only 1,000.']]]];
/* count on: [start, step, hops] */
const HOPS=[[3800,100,3],[6980,10,3],[7000,1000,3]];
function naive(v,s){if(s>=1000)return null;const idx=s===100?0:s===10?1:2,rest=String(v%1000).padStart(3,'0');if(rest[idx]!=='9')return null;return fmt(Math.floor(v/1000))+','+rest.slice(0,idx)+'10'+rest.slice(idx+1)}
VIS.reg('flag10k',c=>{let A,Z,pad,chal,qi=-1,streak=0;const S={then:()=>{}};
const INK='#0f172a',SOFT='#475569',RIM='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',PEN='#1d4ed8',GOLD='#b45309',PALE='#e0f2fe',HOT='#dcfce7',TH='#7c3aed',HU='#0369a1',TE='#047857',ON='#b45309';
const VIEW=['thou','est','zoom','match','hop','chal'],view=()=>VIEW[A.step];
const k=n=>Math.round(n*(A.narrow?1.02:1.15)),ft=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function txt(s,x,y,n,col,al,w){Z.font=ft(n,w);Z.fillStyle=col||INK;Z.textAlign=al||'center';Z.textBaseline='middle';Z.fillText(String(s),x,y,A.W-16)}
function wrap(s,max,n){Z.font=ft(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&Z.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(r,fill,edge,lw){Z.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);Z.fill();Z.strokeStyle=edge||RIM;Z.lineWidth=lw||2;Z.stroke()}
function banner(s,good){const r={x:10,y:8,w:A.W-20,h:A.H*.12};box(r,good?HOT:PALE,good?OK:HU,2);const L=wrap(s,r.w-16,14);L.forEach((l,i)=>txt(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*k(18),14,good?OK:INK))}
function footer(){if(!S.msg)return;const L=wrap((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=k(13)+5,h=L.length*lh+10,y=A.H-h-6;box({x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>txt(l,A.W/2,y+5+lh*(i+.5),13))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();tell(s);A.redraw()};
const good=s=>{S.bad=false;S.msg=s;A.sound.pop()};
/* ---- the number line ---- */
const L0=()=>({x0:A.W*.07,x1:A.W*.93,y:A.H*.5});
const range=()=>view()==='zoom'?[4000,5000,100]:[0,10000,1000];
const xOf=v=>{const l=L0(),[lo,hi]=range();return l.x0+(v-lo)/(hi-lo)*(l.x1-l.x0)};
const vOf=(x,snap)=>{const l=L0(),[lo,hi]=range();const v=lo+(x-l.x0)/(l.x1-l.x0)*(hi-lo);return Math.max(lo,Math.min(hi,Math.round(v/snap)*snap))};
function line(marks){const l=L0(),[lo,hi,tick]=range();Z.strokeStyle=INK;Z.lineWidth=3;Z.beginPath();Z.moveTo(l.x0,l.y);Z.lineTo(l.x1,l.y);Z.stroke();
 for(let v=lo;v<=hi;v+=tick){const x=xOf(v),big=v===lo||v===hi||(view()==='zoom'&&v===4500);Z.lineWidth=big?3:2;Z.beginPath();Z.moveTo(x,l.y-(big?14:9));Z.lineTo(x,l.y+(big?14:9));Z.stroke();
  const show=big||(marks&&marks.includes(v));if(show){const t=view()==='zoom'?fmt(v):(v===0?'0':v===10000?'10,000':fmt(v));txt(t,x,l.y+k(26),A.narrow&&!big?10:12,big?INK:PEN)}}}
function pin(v,col,lab,up,j){const x=xOf(v),l=L0(),y=(up?l.y-k(44):l.y-k(30))-(j%2?k(28):0);Z.fillStyle=col;Z.beginPath();Z.moveTo(x,l.y-4);Z.lineTo(x-8,y+10);Z.lineTo(x+8,y+10);Z.closePath();Z.fill();
 if(lab){Z.font=ft(13,800);const w=Z.measureText(lab).width+14,bx=Math.max(4,Math.min(A.W-w-4,x-w/2));box({x:bx,y:y-k(12),w,h:k(22)},col,col,1);txt(lab,bx+w/2,y-1,13,'#ffffff','center',800)}}
/* step 1: the thousands */
const card1=()=>({x:A.W/2-A.W*.16,y:A.H*.2,w:A.W*.32,h:k(34)});
function drawThou(){const t=THOU[S.i];banner(t!=null?`Put ${fmt(t)} on its tick. Drag the card, or tap the tick.`:'5,000 is halfway. Each tick is 1,000 more.',t==null);
 line(A.narrow?[]:S.placed);{const o=[...S.placed].sort((x,y)=>x-y);S.placed.forEach(v=>pin(v,OK,fmt(v),false,o.indexOf(v)))}
 if(t!=null){const r0=card1(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(r,'#ede9fe',TH,3);txt(fmt(t),r.x+r.w/2,r.y+r.h/2,16,INK,'center',800);
  if(S.cur!=null)pin(S.cur,PEN,'here?',true)}
 txt('10 jumps of 1,000 make 10,000',A.W/2,A.H*.72,12,SOFT)}
function putThou(v){const t=THOU[S.i];if(t==null)return;S.cur=v;
 if(v===t){S.placed.push(t);S.i++;S.cur=null;good(t===5000?'Yes: 5,000 is 5 jumps of 1,000, halfway to 10,000.':`Yes: ${fmt(t)} is ${t/1000} jumps of 1,000 from 0.`);return update()}
 if(t===5000&&v<=1000)return miss(`That tick is ${fmt(v)}. Halfway from 0 to 10,000 is 5,000, not 500 or 1,000.`);
 miss(`That tick is ${fmt(v)}. Count the jumps of 1,000 from 0: you need ${t/1000}.`)}
/* steps 2 and 3: estimate on a line */
const est=()=>view()==='zoom'?ZOOM:EST;
function drawEst(){const z=view()==='zoom',T=est(),t=T[S.i];
 banner(t!=null?`Drag the arrow to where ${fmt(t)} goes${z?' on 4,000 to 5,000':''}.`:z?'Zoomed in, each tick is 100.':'Find the thousands either side, then the part between.',t==null);
 line(z?(A.narrow?[4200,4800]:[4100,4200,4300,4400,4600,4700,4800,4900]):(A.narrow?[2000,4000,6000,8000]:[1000,2000,3000,4000,5000,6000,7000,8000,9000]));
 {const o=[...S.placed].sort((x,y)=>x-y);S.placed.forEach(v=>pin(v,OK,fmt(v),false,o.indexOf(v)))}if(t!=null){pin(S.cur,PEN,'?',true);if(S.ghost!=null)pin(S.ghost,NO,null)}
 txt(z?'Zoom: from 4,000 to 5,000':'0 to 10,000',A.W/2,A.H*.2+k(4),13,SOFT);
 if(z){Z.strokeStyle=GOLD;Z.setLineDash([5,5]);Z.lineWidth=2;Z.strokeRect(A.W*.06,A.H*.36,A.W*.88,A.H*.27);Z.setLineDash([])}}
function placeEst(v){const z=view()==='zoom',T=est(),t=T[S.i];if(t==null)return;S.cur=v;const tol=z?30:300;
 if(Math.abs(v-t)<=tol){S.placed.push(t);S.i++;S.ghost=null;S.cur=z?4500:5000;good(`Close: ${fmt(t)} is ${z?`${Math.floor((t%1000)/100)} hundreds and ${Math.floor(t%100/10)} tens past 4,000`:`between ${fmt(Math.floor(t/1000)*1000)} and ${fmt(Math.floor(t/1000)*1000+1000)}`}.`);return update()}
 S.ghost=v;
 if(!z&&Math.abs(v-t/10)<=300)return miss(`That spot is about ${fmt(v)}, where ${fmt(t/10)} goes. ${fmt(t)} is ${Math.floor(t/1000)} thousands: past the ${fmt(Math.floor(t/1000)*1000)} tick.`);
 if(z&&t===4090&&v>=4800)return miss(`That is about ${fmt(v)}. 4,090 has 0 hundreds and 9 tens, so it is just before 4,100.`);
 const f=z?Math.floor(t/100)*100:Math.floor(t/1000)*1000,g=z?100:1000;
 miss(`${v<t?'Too low':'Too high'}: that is about ${fmt(v)}. ${fmt(t)} is between ${fmt(f)} and ${fmt(f+g)}.`)}
/* step 4: match a representation */
function order4(){const m=MATCH[S.i],all=[[m[2],null]].concat(m[3]),r=S.i%3;return all.slice(r).concat(all.slice(0,r))}
const bin4=j=>{const g=8,w=(A.W-20-2*g)/3;return{x:10+j*(w+g),y:A.H*.66,w,h:k(46)}};
const card4=()=>({x:A.W*.12,y:A.H*.17,w:A.W*.76,h:A.H*.38});
function counters(r,d){const lab=['1000','100','10','1'],col=[TH,HU,TE,ON];let n=0;d.forEach(v=>n+=v);const per=Math.max(1,n),rad=Math.min(r.w/(per*2.6+1),r.h*.16,k(18));let x=r.x+r.w/2-(per-1)*rad*1.3,y=r.y+r.h*.55;
 d.forEach((v,i)=>{for(let j=0;j<v;j++){Z.fillStyle=col[i];Z.beginPath();Z.arc(x,y,rad,0,7);Z.fill();txt(lab[i],x,y,rad>14?10:8,'#ffffff','center',800);x+=rad*2.6}})}
function drawMatch(){const m=MATCH[S.i];banner(m?'Which numeral is the same number? Drag the card to it.':'Words, sums and counters can all show one number.',!m);
 if(m){const r0=card4(),r=S.drag?{...r0,x:S.drag.x-r0.w/2,y:S.drag.y-r0.h/2}:r0;box(r,'#fffbeb',GOLD,3);
  if(m[1]==='counters'){txt('place value counters',r.x+r.w/2,r.y+k(16),12,SOFT);counters(r,m[0])}else{txt(m[1]==='sum'?'expanded form':'in words',r.x+r.w/2,r.y+k(16),12,SOFT);txt(m[0],r.x+r.w/2,r.y+r.h*.56,18,INK,'center',800)}
  order4().forEach(([v],j)=>{const b=bin4(j);box(b,S.drag&&inR(S.drag,b)?HOT:CARD,S.wrong===v?NO:RIM,S.wrong===v?3.5:2);txt(fmt(v),b.x+b.w/2,b.y+b.h/2,17,INK,'center',800)})}
 else MATCH.forEach((x,j)=>txt(`${x[1]==='counters'?'8 thousands, 2 tens':x[0]}  =  ${fmt(x[2])}`,A.W/2,A.H*(.3+j*.12),15))}
function pick4(v){const m=MATCH[S.i];if(!m)return;if(v===m[2]){S.wrong=null;S.i++;good(`Yes: ${fmt(v)}.`);return update()}S.wrong=v;miss(m[3].find(x=>x[0]===v)[1])}
/* step 5: count on across a thousand */
function hopOpts(){const [st,s]=HOPS[S.r],v=st+s*S.h,next=v+s,nv=naive(v,s),o=[fmt(next),nv||fmt(v+s/10||v+1),fmt(v+s*10)];const r=(S.r+S.h)%3;return o.slice(r).concat(o.slice(0,r))}
const opt5=j=>{const g=8,w=(A.W-20-2*g)/3;return{x:10+j*(w+g),y:A.H*.7,w,h:k(46)}};
function drawHop(){const R=HOPS[S.r];banner(R?`Count on in ${fmt(R[1])}s. What comes next?`:'Ten 100s make 1,000. Ten 1,000s make 10,000.',!R);
 if(!R){HOPS.forEach(([st,s,n],j)=>txt(Array.from({length:n+1},(_,i)=>fmt(st+s*i)).join(' → '),A.W/2,A.H*(.32+j*.13),A.narrow?12:15));return}
 const [st,s,n]=R,vals=Array.from({length:n+1},(_,i)=>st+s*i),x0=A.W*.1,x1=A.W*.9,y=A.H*.42,X=i=>x0+i*(x1-x0)/n;
 Z.strokeStyle=INK;Z.lineWidth=3;Z.beginPath();Z.moveTo(x0-10,y);Z.lineTo(x1+10,y);Z.stroke();
 vals.forEach((v,i)=>{Z.lineWidth=2;Z.beginPath();Z.moveTo(X(i),y-9);Z.lineTo(X(i),y+9);Z.stroke();if(i<=S.h)txt(fmt(v),X(i),y+k(24),A.narrow?12:14,i===S.h?PEN:INK,'center',800);else txt('?',X(i),y+k(24),14,SOFT)});
 for(let i=0;i<S.h;i++){Z.strokeStyle=OK;Z.lineWidth=2.5;Z.beginPath();Z.moveTo(X(i),y-6);Z.quadraticCurveTo((X(i)+X(i+1))/2,y-k(40),X(i+1),y-6);Z.stroke();txt('+'+fmt(s),(X(i)+X(i+1))/2,y-k(36),11,OK)}
 txt(`Hop ${S.h+1} of ${n}: ${fmt(vals[S.h])} + ${fmt(s)} = ?`,A.W/2,A.H*.6,15,INK,'center',800);
 hopOpts().forEach((t,j)=>{const b=opt5(j);box(b,CARD,S.wrong===t?NO:RIM,S.wrong===t?3.5:2);txt(t,b.x+b.w/2,b.y+b.h/2,16,INK,'center',800)})}
function hop(t){const R=HOPS[S.r];if(!R)return;const [st,s,n]=R,v=st+s*S.h,next=v+s;
 if(t===fmt(next)){S.wrong=null;S.h++;A.sound.tick();const carry=naive(v,s)!=null||next===10000,NM={10:'tens',100:'hundreds',1000:'thousands'},ONE={100:'hundred',1000:'thousand',10000:'ten thousand'};good(`Yes: ${fmt(next)}.`+(carry?` Ten ${NM[s]} make one ${ONE[s*10]}, so the digit to the left goes up.`:''));if(S.h>=n){S.r++;S.h=0}return update()}
 S.wrong=t;if(t===naive(v,s))return miss(`${t} is not a number. Ten ${fmt(s)}s make one ${fmt(s*10)}, so the digit to the left goes up: ${fmt(next)}.`);
 if(t===fmt(v+s*10))return miss(`${t} is ${fmt(s*10)} more, not ${fmt(s)} more. One hop is + ${fmt(s)}: ${fmt(next)}.`);
 miss(`${t} adds too little. Count on one ${fmt(s)}: ${fmt(next)}.`)}
/* ---- pointer ---- */
function down(p){const v=view();
 if(v==='thou'){if(THOU[S.i]==null)return false;if(inR(p,card1())){S.drag={x:p.x,y:p.y};return true}const l=L0();if(Math.abs(p.y-l.y)<k(40)){putThou(vOf(p.x,1000));return true}return false}
 if(v==='est'||v==='zoom'){if(est()[S.i]==null)return false;const l=L0();if(Math.abs(p.y-l.y)<k(70)){S.slide=1;S.cur=vOf(p.x,v==='zoom'?10:50);A.redraw();return true}return false}
 if(v==='match'){if(!MATCH[S.i])return false;if(inR(p,card4())){S.drag={x:p.x,y:p.y};return true}const j=[0,1,2].find(j=>inR(p,bin4(j)));if(j!=null){pick4(order4()[j][0]);return true}return false}
 if(v==='hop'){if(!HOPS[S.r])return false;const j=[0,1,2].find(j=>inR(p,opt5(j)));if(j!=null){hop(hopOpts()[j]);return true}return false}return false}
function move(p){if(S.slide){S.cur=vOf(p.x,view()==='zoom'?10:50);tell(`Arrow at about ${fmt(S.cur)}.`);return A.redraw()}if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const v=view();if(S.slide){S.slide=0;return placeEst(S.cur)}if(!S.drag)return;const at=p||S.drag;S.drag=null;
 if(v==='thou'){const l=L0();if(Math.abs(at.y-l.y)<k(60))return putThou(vOf(at.x,1000))}
 if(v==='match'){const j=[0,1,2].find(j=>inR(at,bin4(j)));if(j!=null)return pick4(order4()[j][0])}A.redraw()}
function draw(){Z.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);Z.fillRect(0,0,A.W,A.H);if(A.col.dark){Z.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);Z.fill()}
 const v=view();if(v==='thou')drawThou();if(v==='est'||v==='zoom')drawEst();if(v==='match')drawMatch();if(v==='hop')drawHop();
 if(v==='chal'){banner('Thousands, hundreds, tens, ones: each place is 10 times the next.');line([2000,4000,6000,8000]);pin(6400,PEN,'6,400');pin(640,NO,'640')}
 footer();A.fx.draw(Z)}
function update(){const v=view();let s='Challenge.';
 if(v==='thou')s=THOU[S.i]!=null?`Card ${fmt(THOU[S.i])}. Put it on its tick of the 0 to 10,000 line. Placed: ${S.placed.map(fmt).join(', ')||'none'}.`:'5,000, 2,000 and 9,000 placed.';
 if(v==='est'||v==='zoom'){const t=est()[S.i];s=t!=null?`Place ${fmt(t)}. The arrow is at about ${fmt(S.cur)}.`:'All three placed.'}
 if(v==='match')s=MATCH[S.i]?`Card: ${MATCH[S.i][1]==='counters'?'8 thousands counters and 2 tens counters':MATCH[S.i][0]}. Choose ${order4().map(x=>fmt(x[0])).join(', ')}.`:'All four matched.';
 if(v==='hop'){const R=HOPS[S.r];s=R?`${fmt(R[0]+R[1]*S.h)} + ${fmt(R[1])}. Choose ${hopOpts().join(', ')}.`:'All three counts done.'}
 tell((S.msg?S.msg+' ':'')+s);buttons();S.then()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(v==='thou'&&THOU[S.i]!=null){const cur=S.cur==null?0:S.cur;b('◀ 1,000',()=>{S.cur=Math.max(0,cur-1000);S.msg='';update()},'Move the arrow 1,000 left');b('1,000 ▶',()=>{S.cur=Math.min(10000,cur+1000);S.msg='';update()},'Move the arrow 1,000 right');b('Put it here',()=>putThou(cur),`Put ${fmt(THOU[S.i])} at ${fmt(cur)}`)}
 if((v==='est'||v==='zoom')&&est()[S.i]!=null){const z=v==='zoom',big=z?100:1000,sm=z?10:100,lo=z?4000:0,hi=z?5000:10000,mv=d=>()=>{S.cur=Math.max(lo,Math.min(hi,S.cur+d));S.msg='';update()};
  b(`◀ ${fmt(big)}`,mv(-big),`Move the arrow ${fmt(big)} left`);b(`◀ ${sm}`,mv(-sm),`Move the arrow ${sm} left`);b(`${sm} ▶`,mv(sm),`Move the arrow ${sm} right`);b(`${fmt(big)} ▶`,mv(big),`Move the arrow ${fmt(big)} right`);b('Place it',()=>placeEst(S.cur),`Place ${fmt(est()[S.i])} at ${fmt(S.cur)}`)}
 if(v==='match'&&MATCH[S.i])order4().forEach(([n])=>b(fmt(n),()=>pick4(n),`The card shows ${fmt(n)}`));
 if(v==='hop'&&HOPS[S.r])hopOpts().forEach(t=>b(t,()=>hop(t),`Next number: ${t}`));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},i:0,placed:[],cur:view()==='zoom'?4500:view()==='thou'?null:5000,ghost:null,drag:null,slide:0,wrong:null,r:0,h:0,msg:'',bad:false})};
const steps=[
{h:'Thousands on the line',p:'This line goes from 0 to 10,000. Each tick is 1,000 more than the one before. Drag each card to its tick, or use the buttons.',
predict:{q:'What number is halfway between 0 and 10,000?',opts:['5,000','500','1,000'],ans:0},
task:'Place 3 thousands',show:()=>{steps[0].go();play(THOU.map(t=>()=>putThou(t)),450)},go:()=>{reset();update();S.then=finish(0,()=>S.i>=THOU.length,'5,000 sits halfway: 5 jumps of 1,000.')}},
{h:'Where does it go?',p:'To place 6,400, find the thousands first: it is between 6,000 and 7,000. Then go a bit less than halfway on. Drag the arrow along the line.',
task:'Place 3 numbers',show:()=>{steps[1].go();play(EST.map(t=>()=>placeEst(t)),500)},go:()=>{reset();update();S.then=finish(1,()=>S.i>=EST.length,'Thousands first, then hundreds.')}},
{h:'Zoom in',p:'Now the line runs from 4,000 to 5,000, and each tick is 100. Watch the zero in 4,090: it means no hundreds.',
predict:{q:'Where is 4,090 on a line from 4,000 to 5,000?',opts:['Just before 4,100','Near 4,900','Halfway, at 4,500'],ans:0},
task:'Place 3 numbers',show:()=>{steps[2].go();play(ZOOM.map(t=>()=>placeEst(t)),500)},go:()=>{reset();update();S.then=finish(2,()=>S.i>=ZOOM.length,'Zoomed in, the hundreds and tens spread out.')}},
{h:'One number, many ways',p:'A number can be written in words, as a sum of its parts or with place value counters. Drag the card to the numeral that matches.',
task:'Match 4 cards',show:()=>{steps[3].go();play(MATCH.map(m=>()=>pick4(m[2])),500)},go:()=>{reset();update();S.then=finish(3,()=>S.i>=MATCH.length,'A 0 holds an empty place.')}},
{h:'Count on past a thousand',p:'Count on in 100s, 10s and 1,000s. Tap the next number. Watch what happens when a place gets to ten.',
predict:{q:'What is 3,900 + 100?',opts:['4,000','3,1000','3,910'],ans:0},
task:'Finish 3 counts',show:()=>{steps[4].go();const acts=[];HOPS.forEach(([st,s,n])=>{for(let i=0;i<n;i++)acts.push(()=>hop(fmt(st+s*(i+1))))});play(acts,330)},go:()=>{reset();update();S.then=finish(4,()=>S.r>=HOPS.length,'Ten of one place make one of the next.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
const Q=[['On a 0 to 10,000 line, which number is about halfway?','5,000',[['500','half'],['1,000','first']]],
['Which number is between 6,000 and 7,000?','6,400',[['640','tenth'],['7,600','over']]],
['How do you write four thousand and nine?','4,009',[['4,900','zero'],['40,009','long']]],
['What is 7,990 + 10?','8,000',[['7,1000','carry'],['8,090','big']]],
['What is 5,000 + 300 + 20 + 6?','5,326',[['5,3206','join'],['5,623','order']]],
['How many hundreds make 1,000?','10',[['100','howmany'],['1,000','same']]]];
function why(tag){let m='Find the thousands first, then the hundreds, tens and ones.';
 if(tag==='half')m='500 is near the start. Halfway from 0 to 10,000 is 5,000.';
 if(tag==='first')m='1,000 is only the first tick. 5 ticks of 1,000 reach halfway.';
 if(tag==='tenth')m='640 is ten times smaller, near the start. 6,400 has 6 thousands.';
 if(tag==='over')m='7,600 is past 7,000. Between 6,000 and 7,000 means 6 thousands.';
 if(tag==='zero')m='4,900 has 9 hundreds. Four thousand and nine has 0 hundreds and 0 tens: 4,009.';
 if(tag==='long')m='40,009 is forty thousand. Four thousand needs only one digit in the thousands place.';
 if(tag==='carry')m='7,1000 is not a number. Ten tens make a hundred, so 7,990 + 10 = 8,000.';
 if(tag==='big')m='8,090 is 100 more. Adding 10 to 7,990 makes exactly 8,000.';
 if(tag==='join')m='Do not write the parts side by side. Put each digit in its place: 5,326.';
 if(tag==='order')m='The digits are in the wrong places. 5 thousands, 3 hundreds, 2 tens, 6 ones: 5,326.';
 if(tag==='howmany')m='100 hundreds would be 10,000. Ten hundreds make 1,000.';
 if(tag==='same')m='1,000 is the total. It is made of 10 hundreds.';
 return m}
function ask(){qi++;const [q,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;Z=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number line buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
