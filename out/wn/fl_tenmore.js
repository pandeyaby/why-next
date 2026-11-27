/* Flagship – 10 or 100 more or less (Mathematics, ages 7-8; NC England Year 3 'find 10 or 100 more or less than a given
   number'; CCSS 2.NBT.8). Base-ten blocks sit in a hundreds, tens and ones chart: the learner adds ten rods and sees only
   the tens digit move, takes hundred flats away, regroups 10 tens as 1 hundred to cross a hundred (396 + 10 = 406),
   fills the four gaps of a 10/100 more-or-less cross around 507, and sorts number changes by their size, not by which
   digit moved. Data and drawings: tenmore_art.js. */
(()=>{const P=TNM;
VIS.reg('flagtenmore',c=>{c.fig.classList.add('young');
let A,ctl,chal,qi=-1,epoch=0,drag=null,cols=[],tray=[],bin=null,slots=[],tiles=[],bins=[],cards=[];const M={};
const STEPS=['up','down','cross','cross4','size','chal'],cur=()=>STEPS[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tell(msg,bad){M.msg=msg;M.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();M.ping()}
const tone=f=>f?'ok':M.bad?'no':'';
const goal=()=>({up:P.UP,down:P.DOWN,cross:P.CROSS})[cur()].goal;
/* ---- steps 1-3: put blocks in or take them out of the chart ---- */
function addBlock(kind,into){const s=M.n,k=cur();if(into&&into!==kind)return tell(`A ${P.BLOCK[kind]} goes in the ${P.NAME[kind]} column. Each column holds only its own blocks.`,true);
 if(P.val(s)===goal()&&s.t<10)return;
 if(k==='cross'&&s.t>=10)return tell('The Tens column already has 10 rods. Swap 10 tens for 1 hundred first.',true);
 if(kind!=='t'){A.sound.miss();const w=P.WORTH[kind];return tell(`A ${P.BLOCK[kind]} is worth ${w}. ${P.val(s)} + ${w} = ${P.val(s)+w}: that is ${P.sizeName(w)}, not 10 more.`,true)}
 s.last='t';s.t++;A.sound.pop();
 if(s.t===10)return tell(`${s.h} hundreds, 10 tens, ${s.o} ones. A column can only hold 9. Swap 10 tens for 1 hundred.`,false);
 tell(`${P.val(s)-10} + 10 = ${P.val(s)}. Only the tens digit changed.`,false)}
function takeBlock(kind){const s=M.n;if(P.val(s)===goal())return;if(!s[kind])return tell(`There are no ${P.NAME[kind].toLowerCase()} to take.`,true);
 if(kind!=='h'){A.sound.miss();const w=P.WORTH[kind];return tell(`Taking a ${P.BLOCK[kind]} makes ${P.val(s)-w}. That is ${P.sizeName(-w)}. Take a hundred flat for 100 less.`,true)}
 s.last='h';s.h--;A.sound.pop();tell(`${P.val(s)+100} \u2212 100 = ${P.val(s)}. Only the hundreds digit changed.`,false)}
function swapTens(){const s=M.n;if(s.t<10)return tell(`Swap only when there are 10 tens. Now there are ${s.t}.`,true);
 s.t-=10;s.h++;s.last='h';A.sound.pop();tell(`10 tens make 1 hundred. Now ${s.h} hundreds, ${s.t} tens, ${s.o} ones: ${P.val(s)}.`,false)}
function drawChart(){const s=M.n,g=A.ctx,dk=A.col.dark,k=cur(),fin=P.val(s)===goal()&&s.t<10,i=STEPS.indexOf(k);
 const ask=k==='up'?`Make 10 more each time, from 342 to 382. (${P.val(s)})`:k==='down'?`Make 100 less each time, from 875 to 475. (${P.val(s)})`:s.t>=10?'10 tens! Drag the Tens to Hundreds to swap, or tap the Tens.':`Add 10, then 10 more. Reach 406. (${P.val(s)})`;
 const y0=P.top(A,fin?P.DONE[i]:ask,tone(fin),M.msg,M.bad),cw=(A.W-24)/3,u=Math.max(7,Math.min(10,(cw-16)/11.5));
 /* the number, digit by digit, with the digit that just changed lit up */
 const dh=A.narrow?46:54;P.PL.forEach((pl,j)=>{const x=8+j*(cw+4),lit=s.last===pl;g.fillStyle=lit?(dk?'#713f12':'#fef3c7'):(dk?'#1e293b':'#ffffff');P.round(g,x,y0,cw,dh,10);g.fill();
  g.strokeStyle=lit?'#b45309':P.EDGE;g.lineWidth=lit?3:1.4;g.stroke();g.font=`900 ${dh-14}${'px system-ui,sans-serif'}`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='center';g.textBaseline='middle';
  g.fillText(String(s[pl]),x+cw/2,y0+dh/2+1)});
 const cy=y0+dh+8,ch=Math.max(150,(k==='down'?A.H-60:A.H-96)-cy);cols=[];
 P.PL.forEach((pl,j)=>{const x=8+j*(cw+4),r={pl,x,y:cy,w:cw,h:ch};cols.push(r);const over=drag&&hit(drag,r);
  g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#0f172a':'#f8fafc');P.round(g,x,cy,cw,ch,12);g.fill();g.strokeStyle=over?P.SEL:P.EDGE;g.lineWidth=over?3:1.4;g.stroke();
  g.font=`800 ${A.narrow?14:16}px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='top';g.fillText(P.NAME[pl],x+cw/2,cy+6);
  const n=s[pl],by=cy+28;
  if(pl==='h'){const fs=Math.min((cw-16)/3,(ch-56)/3-4);for(let q=0;q<n;q++)P.flat(g,x+6+(q%3)*(fs+2),by+Math.floor(q/3)*(fs+4),fs,dk)}
  if(pl==='t'){const gap=Math.max(1,(cw-12-10*u)/9);for(let q=0;q<n;q++)P.rod(g,x+6+q*(u+gap),by,u,dk,n>=10)}
  if(pl==='o'){const cs=Math.min(16,(cw-20)/3-4);for(let q=0;q<n;q++)P.cube(g,x+10+(q%3)*(cs+4),by+Math.floor(q/3)*(cs+4),cs,dk)}
  g.font=`700 14px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#475569';g.textBaseline='bottom';g.fillText(`${n} ${n===1?P.NAME[pl].toLowerCase().replace(/s$/,''):P.NAME[pl].toLowerCase()}`,x+cw/2,cy+ch-4)});
 tray=[];bin=null;const ty=cy+ch+6;
 if(k==='down'){bin={x:8,y:ty,w:A.W-16,h:A.H-ty-8};const over=drag&&hit(drag,bin);g.fillStyle=over?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#fff7ed');P.round(g,bin.x,bin.y,bin.w,bin.h,12);g.fill();
  g.setLineDash([6,5]);g.strokeStyle='#c2410c';g.lineWidth=2;g.stroke();g.setLineDash([]);g.font=`800 16px system-ui,sans-serif`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='center';g.textBaseline='middle';g.fillText('Take away: drag a block here',A.W/2,bin.y+bin.h/2)}
 else{const tw=(A.W-16)/3;P.PL.forEach((pl,j)=>{const r={pl,x:8+j*tw+3,y:ty,w:tw-6,h:A.H-ty-8};tray.push(r);g.fillStyle=dk?'#1e293b':'#ffffff';P.round(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=P.EDGE;g.lineWidth=1.2;g.stroke();
  const bx=r.x+r.w/2,by=r.y+r.h/2+8;if(!(drag&&drag.kind===pl&&drag.from==='tray')){if(pl==='t'){g.save();g.translate(bx,by);g.rotate(-Math.PI/2);P.rod(g,-u/2,-5*u,u,dk);g.restore()}else P.block(g,pl,bx,by,u,dk)}
  g.font=`800 14px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='top';g.fillText(`${P.WORTH[pl]}`,bx,r.y+4)})}
 if(drag){if(drag.from==='tray')P.block(g,drag.kind,drag.x,drag.y,u,dk);else{g.globalAlpha=.85;P.block(g,drag.kind,drag.x,drag.y,u,dk);g.globalAlpha=1}}}
/* ---- step 4: the cross around 507 ---- */
function place(si,v){const s=M.x;if(s.put[si]!=null)return;const S=P.SLOTS[si],want=P.MID+S.d;
 if(v===want){s.put[si]=v;s.used.push(v);s.bad=null;s.pick=null;A.sound.pop();return tell(`${v} is ${S.lab} than 507. ${Object.keys(s.put).length} of 4 gaps filled.`,false)}
 s.bad=v;A.sound.miss();const d=v-P.MID;
 if(Math.sign(d)!==Math.sign(S.d)&&Math.abs(d)===Math.abs(S.d))return tell(`${v} is ${P.sizeName(d)} than 507. This gap is ${S.lab}: go the other way.`,true);
 if(S.d===-10&&v===407)return tell('407 is 100 less. For 10 less, the tens digit goes down. 507 has 0 tens, so take 1 hundred as 10 tens: 497.',true);
 tell(`${v} is ${P.sizeName(d)} than 507, but this gap needs ${S.lab}.`,true)}
function drawCross(){const s=M.x,g=A.ctx,dk=A.col.dark,n=Object.keys(s.put).length,fin=n===4,y0=P.top(A,fin?P.DONE[3]:`Drag a number into each gap. (${n} of 4)`,tone(fin),M.msg,M.bad);
 const bw=Math.min(116,(A.W-40)/3),bh=A.narrow?54:60,cx=A.W/2,gy=y0+6;slots=[];
 const at={up:[cx-bw/2,gy+18],left:[cx-bw*1.5-10,gy+bh+44],right:[cx+bw/2+10,gy+bh+44],down:[cx-bw/2,gy+2*bh+70]};
 g.strokeStyle=dk?'#94a3b8':P.EDGE;g.lineWidth=2;g.beginPath();g.moveTo(cx,gy+18+bh);g.lineTo(cx,gy+bh+44);g.moveTo(cx,gy+2*bh+44);g.lineTo(cx,gy+2*bh+70);g.moveTo(cx-bw/2,gy+1.5*bh+44);g.lineTo(cx-bw/2-10,gy+1.5*bh+44);g.moveTo(cx+bw/2,gy+1.5*bh+44);g.lineTo(cx+bw/2+10,gy+1.5*bh+44);g.stroke();
 P.card(g,{x:cx-bw/2,y:gy+bh+44,w:bw,h:bh},String(P.MID),'sel',26);
 P.SLOTS.forEach((S,si)=>{const [x,y]=at[S.k],r={si,x,y,w:bw,h:bh};slots.push(r);g.font=`700 14px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#334155';g.textAlign='center';g.textBaseline='bottom';if(S.k==='down'){g.textBaseline='top';g.fillText(S.lab,x+bw/2,y+bh+3)}else g.fillText(S.lab,x+bw/2,y-2);g.textBaseline='middle';
  if(s.put[si]!=null)P.card(g,r,String(s.put[si]),'ok',24);else{g.setLineDash([6,5]);g.strokeStyle=dk?'#cbd5e1':P.EDGE;g.lineWidth=2.5;P.round(g,x,y,bw,bh,12);g.stroke();g.setLineDash([]);
   g.font=`800 22px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#475569';g.textBaseline='middle';g.fillText('?',x+bw/2,y+bh/2)}});
 tiles=[];if(fin)return;const ty=gy+3*bh+96,tw=Math.min(80,(A.W-24)/4-8),th=52;let j=0;
 P.TILES.forEach(v=>{if(s.used.includes(v))return;const r={v,x:12+(j%4)*(tw+8),y:ty+Math.floor(j/4)*(th+10),w:tw,h:th};j++;if(drag&&drag.v===v)return;tiles.push(r);P.card(g,r,String(v),s.bad===v?'no':s.pick===v?'sel':'',22)});
 if(drag&&drag.v!=null)P.card(g,{x:drag.x-tw/2,y:drag.y-th/2,w:tw,h:th},String(drag.v),'sel',22)}
/* ---- step 5: sort changes by size ---- */
function sortCard(i,z){const s=M.z;if(s.at[i]!=null)return;const C=P.CARDS[i];if(z!==C.z){s.bad=i;A.sound.miss();return tell(C.no,true)}
 s.at[i]=z;s.bad=-1;s.pick=null;A.sound.pop();tell(`${C.a} to ${C.b}: ${P.BINS[z].toLowerCase()}.`,false)}
const cardLab=C=>`${C.a} \u2192 ${C.b}`;
function drawSize(){const s=M.z,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===P.CARDS.length,y0=P.top(A,fin?P.DONE[4]:`How big is each change? (${n} of 6)`,tone(fin),M.msg,M.bad);
 const bw=(A.W-24)/3,bh=Math.min(150,(A.H-y0)*.42);bins=[0,1,2].map(z=>({z,x:8+z*(bw+4),y:y0+4,w:bw,h:bh}));
 bins.forEach(b=>{const over=drag&&drag.i!=null&&hit(drag,b);g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':['#fff7ed','#f0fdf4','#eff6ff'][b.z]);P.round(g,b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=['#c2410c',P.OK,P.SEL][b.z];g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?14:16}px system-ui,sans-serif`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='center';g.textBaseline='top';P.fit(g,P.BINS[b.z],b.w-10,g.font).forEach((t,i)=>g.fillText(t,b.x+b.w/2,b.y+6+i*18));
  g.font=`700 ${A.narrow?13:15}px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':P.OK;P.CARDS.forEach((C,i)=>{if(s.at[i]!==b.z)return;const k=P.CARDS.filter((D,j)=>j<i&&s.at[j]===b.z).length;g.fillText(cardLab(C),b.x+b.w/2,b.y+48+k*20)})});
 cards=[];if(fin)return;const cw=(A.W-32)/2,chh=52;let j=0;P.CARDS.forEach((C,i)=>{if(s.at[i]!=null)return;const r={i,x:12+(j%2)*(cw+8),y:y0+bh+16+Math.floor(j/2)*(chh+10),w:cw,h:chh};j++;if(drag&&drag.i===i)return;cards.push(r);
  P.card(g,r,cardLab(C),s.bad===i?'no':s.pick===i?'sel':'',22)});
 if(drag&&drag.i!=null)P.card(g,{x:drag.x-cw/2,y:drag.y-chh/2,w:cw,h:chh},cardLab(P.CARDS[drag.i]),'sel',22)}
/* ---- challenge feedback ---- */
function slipMsg(tag){let m='10 more or less changes the tens digit. 100 more or less changes the hundreds digit.';
 if(tag==='ones')m='That changes the ones digit, so it is only 1 more or 1 less. 10 more or less changes the tens digit.';
 if(tag==='tens')m='That changes the tens digit, so it is 10 more or less. 100 more or less changes the hundreds digit.';
 if(tag==='hund')m='That changes the hundreds digit, so it is 100 more or less. 10 more or less changes the tens digit.';
 if(tag==='cross')m='A column holds at most 9. 10 tens make 1 hundred, so swap them: the tens go to 0 and the hundreds go up by 1.';
 if(tag==='dir')m='That goes the wrong way. More makes the number bigger. Less makes it smaller.';
 return m}
function ask(){qi++;const Q=P.QS[qi%P.QS.length],all=[[Q.a,'ok'],...Q.o],rot=(qi+2)%3,order=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>mark(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
/* ---- wiring ---- */
const VIEW={up:drawChart,down:drawChart,cross:drawChart,cross4:drawCross,size:drawSize};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=cur();
 if(k==='chal'){const y=P.top(A,'Challenge: 10 or 100 more or less','ok'),u=10;P.flat(g,A.W*.2,y+20,60,A.col.dark);P.rod(g,A.W*.2+76,y+20,u,A.col.dark);P.cube(g,A.W*.2+96,y+70,u,A.col.dark);
  g.font='800 30px system-ui,sans-serif';g.fillStyle=A.col.dark?P.LIGHT:P.INK;g.textAlign='left';g.textBaseline='middle';g.fillText('+10  +100',A.W*.2+124,y+50);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=cur();
 if(k==='up'||k==='cross'){const t=tray.find(q=>hit(p,q));if(t){drag={kind:t.pl,from:'tray',x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const col=cols.find(q=>hit(p,q));if(k==='cross'&&col&&col.pl==='t'&&M.n.t>=10){drag={kind:'t',from:'tens',x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  if(col&&M.pick){addBlock(M.pick,col.pl);M.pick=null}return false}
 if(k==='down'){const col=cols.find(q=>hit(p,q));if(col){drag={kind:col.pl,from:'chart',x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='cross4'){const t=tiles.find(q=>hit(p,q));if(t){drag={v:t.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const sl=slots.find(q=>hit(p,q));if(sl&&M.x.pick!=null)place(sl.si,M.x.pick);return false}
 if(k==='size'){if(M.z.pick!=null){const b=bins.find(q=>hit(p,q));if(b){sortCard(M.z.pick,b.z);return false}}const z=cards.find(q=>hit(p,q));if(z){drag={i:z.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const h=drag,k=cur(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;drag=null;
 if(k==='up'||k==='cross'){if(h.from==='tens'){const col=cols.find(q=>hit(p,q));if(tap||(col&&col.pl==='h'))return swapTens();return A.redraw()}
  const col=cols.find(q=>hit(p,q));if(col&&!tap)return addBlock(h.kind,col.pl);if(tap){M.pick=h.kind;return tell(`Picked a ${P.BLOCK[h.kind]}. Now tap a column.`,false)}return A.redraw()}
 if(k==='down'){if(tap||hit(p,bin))return takeBlock(h.kind);return A.redraw()}
 if(k==='cross4'){const sl=slots.find(q=>hit(p,q));if(sl)return place(sl.si,h.v);if(tap){M.x.pick=h.v;return tell(`Picked ${h.v}. Now tap a gap.`,false)}return A.redraw()}
 if(k==='size'){const b=bins.find(q=>hit(p,q));if(b)return sortCard(h.i,b.z);if(tap){M.z.pick=h.i;return tell(`Picked ${cardLab(P.CARDS[h.i])}. Now tap a box.`,false)}A.redraw()}}
function wipe(){epoch++;drag=null;for(const k in M)delete M[k];const k=A?cur():'up',S=k==='down'?P.DOWN:k==='cross'?P.CROSS:P.UP;
 Object.assign(M,{n:{h:S.h,t:S.t,o:S.o,last:null},x:{put:{},used:[],pick:null,bad:null},z:{at:{},pick:null,bad:-1},pick:null,msg:null,bad:false,ping:()=>{}})}
function open(i,over){wipe();c.say(P.DESC[i]);A.cv.setAttribute('aria-label',P.DESC[i]);
 M.ping=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(P.DONE[i]+A.reveal(i))};pads();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=cur(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if(M.n&&(k==='up'||k==='cross')&&!(P.val(M.n)===goal()&&M.n.t<10)){P.PL.forEach(pl=>b(`Add a ${pl==='h'?'hundred':pl==='t'?'ten':'one'}`,()=>addBlock(pl),`Put a ${P.BLOCK[pl]} in the ${P.NAME[pl]} column of ${P.val(M.n)}`));
  if(k==='cross'&&M.n.t>=10)b('Swap 10 tens for 1 hundred',swapTens,`Swap 10 ten rods for 1 hundred flat`)}
 if(M.n&&k==='down'&&P.val(M.n)!==goal())P.PL.forEach(pl=>b(`Take a ${pl==='h'?'hundred':pl==='t'?'ten':'one'}`,()=>takeBlock(pl),`Take a ${P.BLOCK[pl]} away from ${P.val(M.n)}`));
 if(k==='cross4'){const si=P.SLOTS.findIndex((_,j)=>M.x.put[j]==null);if(si>=0){const S=P.SLOTS[si],w=P.MID+S.d;[w,P.MID-S.d,S.d===-10?407:w+(S.d>0?1:-1)].sort((x,y)=>x-y).forEach(v=>b(`${S.lab}: ${v}`,()=>place(si,v),`Put ${v} in the ${S.lab} gap`))}}
 if(k==='size'){const i=P.CARDS.findIndex((_,j)=>M.z.at[j]==null);if(i>=0)[0,1,2].forEach(z=>b(`${cardLab(P.CARDS[i])}: by ${[1,10,100][z]}`,()=>sortCard(i,z),`${P.CARDS[i].a} to ${P.CARDS[i].b} goes in ${P.BINS[z]}`))}}
const PLAN=[
{h:'10 more',p:P.TXT[0],predict:{q:'342 and 10 more. Which digit changes?',opts:['The ones: 343','The tens: 352','The hundreds: 442'],ans:1},task:'Make 10 more four times, from 342 to 382',
 show:()=>auto(0,[1,2,3,4].map(()=>[650,()=>addBlock('t','t')])),go:()=>open(0,()=>P.val(M.n)===P.UP.goal)},
{h:'100 less',p:P.TXT[1],predict:{q:'What is 100 less than 875?',opts:['865','775','874'],ans:1},task:'Make 100 less four times, from 875 to 475',
 show:()=>auto(1,[1,2,3,4].map(()=>[650,()=>takeBlock('h')])),go:()=>open(1,()=>P.val(M.n)===P.DOWN.goal)},
{h:'Cross a hundred',p:P.TXT[2],predict:{q:'What is 396 and 10 more?',opts:['3106','397','406'],ans:2},task:'Get from 386 to 406 and swap 10 tens for 1 hundred',
 show:()=>auto(2,[[650,()=>addBlock('t','t')],[650,()=>addBlock('t','t')],[900,swapTens]]),go:()=>open(2,()=>P.val(M.n)===P.CROSS.goal&&M.n.t<10)},
{h:'Around 507',p:P.TXT[3],task:'Fill all 4 gaps around 507',
 show:()=>auto(3,P.SLOTS.map((S,si)=>[650,()=>place(si,P.MID+S.d)])),go:()=>open(3,()=>Object.keys(M.x.put).length===4)},
{h:'How big a change?',p:P.TXT[4],task:'Sort all 6 changes',
 show:()=>auto(4,P.CARDS.map((C,i)=>[550,()=>sortCard(i,C.z)])),go:()=>open(4,()=>Object.keys(M.z.at).length===P.CARDS.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
FK.shell(c,{steps:PLAN,ratio:.74,tall:1.4,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'10 or 100 more or less lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
