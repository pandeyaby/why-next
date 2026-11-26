/* Flagship – counting in 3s, forwards and backwards (Mathematics, ages 6-7; NC England Year 2 'count in steps of 2, 3,
   and 5 from 0 ... forward and backward'). A frog hops in 3s along a number track to 30 and back to 0, the learner fills
   gaps in a forward and a backward 3s line, counts tricycle wheels in 3s, and sorts numbers the frog lands on from
   numbers it hops over. Data and drawings: threes_art.js. */
(()=>{const T=TRI;
VIS.reg('flagthrees',c=>{c.fig.classList.add('young');
let A,ctl,chal,qi=-1,epoch=0,grab=null,stones=[],frogAt=null,gaps=[],tiles=[],bins=[],cards=[],bikes=[];const M={};
const STEPS=['up','down','gaps','wheels','sort','chal'],cur=()=>STEPS[A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function tell(msg,bad){M.msg=msg;M.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);pads();A.redraw();M.ping()}
const tone=f=>f?'ok':M.bad?'no':'';
/* ---- steps 1 and 2: the frog on a window of the number track ---- */
function hopTo(n){const s=M.f,dir=cur()==='up'?1:-1,want=s.pos+dir*T.STEP;if(s.pos===(dir>0?T.TOP:0))return;
 if(n===want){s.pos=n;s.trail.push(n);s.wrong=null;A.sound.pop();const end=n===(dir>0?T.TOP:0);
  return tell(end?(dir>0?'30! Ten hops of 3 from 0.':'0! Ten hops of 3 back from 30.'):`${s.trail.join(', ')}`,false)}
 s.wrong=n;A.sound.miss();const d=Math.abs(n-s.pos);
 if(n===s.pos)return tell('The frog is already there. Hop 3 stones.',true);
 if(dir>0&&n<s.pos)return tell('Counting in 3s goes forward here, to bigger numbers.',true);
 if(dir<0&&n>s.pos)return tell('Counting back goes to smaller numbers. Hop the other way.',true);
 if(d===2)return tell(`That is a hop of 2. Do not count ${s.pos} itself: say ${s.pos+dir}, ${s.pos+2*dir}, ${want}.`,true);
 tell(`That is a hop of ${d}, not 3. Count 3 stones: ${s.pos+dir}, ${s.pos+2*dir}, ${want}.`,true)}
function drawTrack(){const s=M.f,g=A.ctx,dk=A.col.dark,dir=cur()==='up'?1:-1,end=s.pos===(dir>0?T.TOP:0);
 const y0=T.top(A,end?T.DONE[dir>0?0:1]:dir>0?`Hop in 3s from ${s.pos}. Where does the frog land?`:`Hop back 3 from ${s.pos}. Where does the frog land?`,tone(end),M.msg,M.bad);
 const V=A.narrow?8:11,sw=(A.W-16)/V,sh=Math.min(64,sw*1.15),first=dir>0?Math.max(0,Math.min(s.pos-1,T.TOP+1-V)):Math.max(0,Math.min(s.pos-(V-2),T.TOP+1-V));
 const sy=Math.max(y0+92,A.H*.42);/* fixed height so the stones do not jump when a reply line appears */stones=[];for(let k=0;k<V;k++){const n=first+k,x=8+k*sw,st=s.wrong===n?'no':n===s.pos&&!grab?'here':s.trail.includes(n)?'land':'';stones.push({n,x,y:sy,w:sw,h:sh});T.stone(g,x,sy,sw,sh,n,st,dk)}
 const at=n=>8+(n-first)*sw+sw/2;for(let i=1;i<s.trail.length;i++){const a=s.trail[i-1],b=s.trail[i];if(a>=first&&b>=first&&a<first+V&&b<first+V)T.hop(g,at(a),at(b),sy-4,dir>0?'+3':'\u22123',dk)}
 const fs=Math.min(46,sw*.9);if(grab)T.icon(g,'\u{1F438}',grab.x,grab.y,fs);else if(s.pos>=first&&s.pos<first+V){frogAt={x:at(s.pos)-fs/2,y:sy-fs-10,w:fs,h:fs+10};T.icon(g,'\u{1F438}',at(s.pos),sy-fs/2-8,fs)}
 g.font=`800 ${A.narrow?20:24}px system-ui,sans-serif`;g.fillStyle=dk?T.LIGHT:T.INK;g.textAlign='left';g.textBaseline='top';
 T.fit(g,'We said: '+s.trail.join(', '),A.W-32,g.font).forEach((t,i)=>g.fillText(t,16,sy+sh+22+i*30));
 overview(s,dk);g.font=`700 15px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#475569';g.textAlign='left';g.textBaseline='top';g.fillText(`Hops: ${s.trail.length-1} of 10`,16,A.H-96)}
/* the whole 0-30 line at the bottom: every number is a tick, the landing numbers so far get a dot and a label */
function overview(s,dk){const g=A.ctx,x0=20,x1=A.W-20,y=A.H-46,X=n=>x0+(x1-x0)*n/T.TOP;g.strokeStyle=dk?'#94a3b8':T.EDGE;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 for(let n=0;n<=T.TOP;n++){g.beginPath();g.moveTo(X(n),y-(n%3?4:8));g.lineTo(X(n),y+(n%3?4:8));g.stroke()}
 g.font=`800 13px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='top';s.trail.forEach(n=>{g.fillStyle=dk?'#86efac':T.OK;g.beginPath();g.arc(X(n),y,5,0,7);g.fill();g.fillText(String(n),X(n),y+12)})}
/* ---- step 3: fill the gaps ---- */
function place(li,gi,v){const s=M.g,L=T.LINES[li],key=li+':'+gi;if(s.put[key]!=null)return;const right=L.fill[gi],idx=L.row.indexOf(null)+(gi?2:0),before=L.row[idx-1];
 if(v===right){s.put[key]=v;s.used.push(v);s.bad=null;s.pick=null;A.sound.pop();return tell(`${before} ${L.dir>0?'+':'\u2212'} 3 = ${v}. ${Object.keys(s.put).length} of 4 gaps filled.`,false)}
 s.bad=v;A.sound.miss();
 if(L.dir<0&&v>before)return tell('This line counts back, so each number is smaller. Take 3 away.',true);
 if(Math.abs(v-before)===1||Math.abs(v-before)===2)return tell(`${v} is only ${Math.abs(v-before)} away from ${before}. Hop 3: ${before} ${L.dir>0?'+':'\u2212'} 3 = ${right}.`,true);
 tell(`${before} ${L.dir>0?'+':'\u2212'} 3 = ${right}, not ${v}. Count 3 on from ${before}.`,true)}
const openGaps=()=>{const out=[];T.LINES.forEach((L,li)=>L.fill.forEach((_,gi)=>{if(M.g.put[li+':'+gi]==null)out.push([li,gi])}));return out};
function drawGaps(){const s=M.g,g=A.ctx,dk=A.col.dark,n=Object.keys(s.put).length,fin=n===4,y0=T.top(A,fin?T.DONE[2]:`Drag a number into each gap. (${n} of 4)`,tone(fin),M.msg,M.bad);
 const cw=(A.W-16)/6,ch=Math.min(58,cw*1.05);gaps=[];T.LINES.forEach((L,li)=>{const y=y0+14+li*(ch+46);g.font=`700 15px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#475569';g.textAlign='left';g.textBaseline='bottom';g.fillText(L.dir>0?'Counting on in 3s \u2192':'\u2190 Counting back in 3s',12,y-2);
  let gi=0;L.row.forEach((v,k)=>{const x=8+k*cw;if(v!=null)T.card(g,{x:x+2,y,w:cw-4,h:ch},String(v),'',22);else{const key=li+':'+gi,r={li,gi,x:x+2,y,w:cw-4,h:ch};gaps.push(r);
   if(s.put[key]!=null)T.card(g,r,String(s.put[key]),'ok',22);else{g.setLineDash([6,5]);g.strokeStyle=dk?'#cbd5e1':T.EDGE;g.lineWidth=2.5;T.round(g,r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([]);
    g.font=`800 22px system-ui,sans-serif`;g.fillStyle=dk?'#cbd5e1':'#475569';g.textAlign='center';g.textBaseline='middle';g.fillText('?',r.x+r.w/2,r.y+r.h/2)}gi++}})});
 if(fin){tiles=[];return}const ty=y0+14+2*(ch+46)+6,tw=Math.min(72,(A.W-24)/4-8);tiles=[];let j=0;
 T.TILES.forEach(v=>{if(s.used.includes(v))return;const r={v,x:12+(j%4)*(tw+10),y:ty+Math.floor(j/4)*(ch+12),w:tw,h:ch};j++;if(grab&&grab.v===v)return;tiles.push(r);T.card(g,r,String(v),s.bad===v?'no':s.pick===v?'sel':'',22)});
 if(grab)T.card(g,{x:grab.x-tw/2,y:grab.y-ch/2,w:tw,h:ch},String(grab.v),'sel',22)}
/* ---- step 4: count wheels in 3s ---- */
function countBike(i){const s=M.w;if(s.said[i]!=null)return;s.total+=3;s.said[i]=s.total;A.sound.pop();const n=Object.keys(s.said).length;
 tell(n===T.TRIKES?`${s.total}! Six tricycles have ${s.total} wheels.`:`${s.total} wheels so far. ${n} of 6 tricycles counted.`,false)}
function drawWheels(){const s=M.w,g=A.ctx,dk=A.col.dark,n=Object.keys(s.said).length,fin=n===T.TRIKES,y0=T.top(A,fin?T.DONE[3]:`Tap each tricycle. Count the wheels in 3s. (${n} of 6)`,tone(fin),M.msg,M.bad);
 const cols=3,bw=(A.W-24)/cols,bh=Math.min(130,(A.H-y0-90)/2),cols6=['#dc2626','#2563eb','#16a34a','#9333ea','#ea580c','#0891b2'];bikes=[];
 for(let i=0;i<T.TRIKES;i++){const r={i,x:8+(i%cols)*(bw+4),y:y0+6+Math.floor(i/cols)*(bh+8),w:bw,h:bh};bikes.push(r);
  g.fillStyle=s.said[i]!=null?(dk?'#14532d':'#dcfce7'):(dk?'#1e293b':'#ffffff');T.round(g,r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=s.said[i]!=null?T.OK:T.EDGE;g.lineWidth=s.said[i]!=null?3:1.5;g.stroke();
  T.trike(g,r.x+r.w/2,r.y+r.h*.5,Math.min(r.w*.8,r.h*.85),cols6[i],dk);
  if(s.said[i]!=null){g.font=`800 22px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':T.OK;g.textAlign='center';g.textBaseline='bottom';g.fillText(String(s.said[i]),r.x+r.w/2,r.y+r.h-4)}}
 g.font=`800 ${A.narrow?20:24}px system-ui,sans-serif`;g.fillStyle=dk?T.LIGHT:T.INK;g.textAlign='left';g.textBaseline='top';const said=Object.values(s.said).sort((a,b)=>a-b);
 g.fillText(said.length?'Wheels: '+said.join(', '):'Wheels: 0',16,y0+12+2*(bh+8))}
/* ---- step 5: lands on it or hops over it ---- */
function sortCard(i,z){const s=M.s;if(s.at[i]!=null)return;const C=T.CARDS[i];if(z!==C.z){s.bad=i;A.sound.miss();return tell(C.no,true)}
 s.at[i]=z;s.bad=-1;s.pick=null;A.sound.pop();tell(`${C.n}: ${T.BINS[z].toLowerCase()}.`,false)}
function drawSort(){const s=M.s,g=A.ctx,dk=A.col.dark,n=Object.keys(s.at).length,fin=n===T.CARDS.length,y0=T.top(A,fin?T.DONE[4]:`Count in 3s from 0. Does the frog land on it? (${n} of 6)`,tone(fin),M.msg,M.bad);
 const bh=Math.min(170,(A.H-y0)*.44),bw=(A.W-24)/2;bins=[1,0].map((z,k)=>({z,x:8+k*(bw+8),y:y0+4,w:bw,h:bh}));
 bins.forEach(b=>{g.fillStyle=dk?(b.z?'#14532d':'#3b2a12'):(b.z?'#f0fdf4':'#fff7ed');T.round(g,b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=b.z?T.OK:'#c2410c';g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?15:17}px system-ui,sans-serif`;g.fillStyle=dk?T.LIGHT:T.INK;g.textAlign='center';g.textBaseline='top';T.fit(g,T.BINS[b.z],b.w-12,g.font).forEach((t,i)=>g.fillText(t,b.x+b.w/2,b.y+8+i*20));
  const got=T.CARDS.filter((C,i)=>s.at[i]===b.z).map(C=>C.n);g.font=`800 26px system-ui,sans-serif`;g.fillStyle=dk?'#86efac':T.OK;g.fillText(got.join('  '),b.x+b.w/2,b.y+b.h*.55)});
 cards=[];if(fin)return;const cw=Math.min(84,(A.W-40)/3),chh=56;let j=0;T.CARDS.forEach((C,i)=>{if(s.at[i]!=null)return;const r={i,x:12+(j%3)*(cw+12),y:y0+bh+18+Math.floor(j/3)*(chh+12),w:cw,h:chh};j++;if(grab&&grab.i===i)return;cards.push(r);
  T.card(g,r,String(C.n),s.bad===i?'no':s.pick===i?'sel':'',26)});
 if(grab)T.card(g,{x:grab.x-cw/2,y:grab.y-chh/2,w:cw,h:chh},String(T.CARDS[grab.i].n),'sel',26)}
/* ---- challenge feedback ---- */
function slipMsg(tag){let m='Counting in 3s adds 3 each time. Counting back takes 3 away each time.';
 if(tag==='ones')m='That counts on in 1s or 2s. Each hop must be 3: count 3 stones on.';
 if(tag==='start')m='Do not count the number you start on. From 9, say 10, 11, 12: the frog lands on 12.';
 if(tag==='back')m='That goes the wrong way. Counting back makes the numbers smaller.';
 if(tag==='three')m='Ending in 3 does not put a number in the 3s count. The count goes 21, 24, 27.';
 if(tag==='groups')m='That is how many tricycles. Count the wheels in 3s: 3, 6, 9, 12, 15.';
 return m}
function ask(){qi++;const Q=T.QS[qi%T.QS.length],all=[[Q.a,'ok'],...Q.o],rot=(qi+1)%3,order=all.slice(rot).concat(all.slice(0,rot));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose one answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>mark(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(tag,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';if(good)A.win();else A.sound.miss();
 fb.innerHTML=(good?`\u2713 Right: ${a}.`:'\u2717 '+slipMsg(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(good?'Right.':slipMsg(tag))}
/* ---- wiring ---- */
const VIEW={up:drawTrack,down:drawTrack,gaps:drawGaps,wheels:drawWheels,sort:drawSort};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=cur();
 if(k==='chal'){const y=T.top(A,'Challenge: count in 3s','ok');T.icon(g,'\u{1F438}',A.W*.3,y+60,56);g.font='800 34px system-ui,sans-serif';g.fillStyle=A.col.dark?T.LIGHT:T.INK;g.textAlign='center';g.fillText('3, 6, 9 \u2026',A.W*.66,y+60);return}VIEW[k]();A.fx.draw(g)}
function down(p){const k=cur();
 if(k==='up'||k==='down'){if(inside(p,frogAt)){grab={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const st=stones.find(q=>inside(p,q));if(st)hopTo(st.n);return false}
 if(k==='gaps'){const t=tiles.find(q=>inside(p,q));if(t){grab={v:t.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const gp=gaps.find(q=>inside(p,q));if(gp&&M.g.pick!=null)place(gp.li,gp.gi,M.g.pick);return false}
 if(k==='wheels'){const b=bikes.find(q=>inside(p,q));if(b)countBike(b.i);return false}
 if(k==='sort'){if(M.s.pick!=null){const b=bins.find(q=>inside(p,q));if(b){sortCard(M.s.pick,b.z);return false}}const z=cards.find(q=>inside(p,q));if(z){grab={i:z.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){if(!grab)return;const h=grab,k=cur(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<10;grab=null;
 if(k==='up'||k==='down'){const st=stones.find(q=>p.x>=q.x&&p.x<=q.x+q.w);if(!tap&&st)return hopTo(st.n);return A.redraw()}
 if(k==='gaps'){const gp=gaps.find(q=>inside(p,q));if(gp)return place(gp.li,gp.gi,h.v);if(tap){M.g.pick=h.v;return tell(`Picked ${h.v}. Now tap a gap.`,false)}return A.redraw()}
 if(k==='sort'){const b=bins.find(q=>inside(p,q));if(b)return sortCard(h.i,b.z);if(tap){M.s.pick=h.i;return tell(`Picked ${T.CARDS[h.i].n}. Now tap a box.`,false)}A.redraw()}}
function wipe(){epoch++;grab=null;for(const k in M)delete M[k];const k=A?cur():'up';
 Object.assign(M,{f:k==='down'?{pos:30,trail:[30],wrong:null}:{pos:0,trail:[0],wrong:null},g:{put:{},used:[],pick:null,bad:null},w:{said:{},total:0},s:{at:{},pick:null,bad:-1},msg:null,bad:false,ping:()=>{}})}
function open(i,over){wipe();c.say(T.DESC[i]);A.cv.setAttribute('aria-label',T.DESC[i]);
 M.ping=()=>{if(A.step===i&&!A.isDone&&over()&&(!PLAN[i].predict||A.pred[i]!=null))A.done(T.DONE[i]+A.reveal(i))};pads();A.redraw()}
function auto(i,list){PLAN[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=cur(),b=(t,f,l)=>{const x=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t);x.onclick=f};
 if((k==='up'&&M.f.pos<30)||(k==='down'&&M.f.pos>0)){const d=k==='up'?1:-1,p=M.f.pos;[1,2,3].forEach(j=>b(`Hop to ${p+d*j}`,()=>hopTo(p+d*j),`Make the frog hop from ${p} to ${p+d*j}`))}
 if(k==='gaps'){const o=openGaps()[0];if(o){const [li,gi]=o,R=T.LINES[li].fill[gi],L=T.LINES[li];[R+L.dir,R,R+L.dir*-3].filter(v=>v>=0).sort((x,y)=>x-y).forEach(v=>b(`Gap: ${v}`,()=>place(li,gi,v),`Put ${v} in the next gap of the ${L.dir>0?'counting on':'counting back'} line`))}}
 if(k==='wheels'){const i=[...Array(T.TRIKES).keys()].find(j=>M.w.said[j]==null);if(i!=null)b('Count the next tricycle',()=>countBike(i),`Count tricycle ${i+1}: 3 more wheels`)}
 if(k==='sort'){const i=T.CARDS.findIndex((_,j)=>M.s.at[j]==null);if(i>=0)[1,0].forEach(z=>b(`${T.CARDS[i].n}: ${z?'lands':'hops over'}`,()=>sortCard(i,z),`${T.CARDS[i].n} goes in ${T.BINS[z]}`))}}
const PLAN=[
{h:'Hop in 3s',p:T.TXT[0],predict:{q:'Count in 3s from 0. Will the frog land on 10?',opts:['Yes, it lands on 10','No, it hops over 10'],ans:1},task:'Hop the frog in 3s from 0 to 30',
 show:()=>auto(0,[3,6,9,12,15,18,21,24,27,30].map(n=>[420,()=>hopTo(n)])),go:()=>open(0,()=>M.f.pos===30)},
{h:'Hop back in 3s',p:T.TXT[1],predict:{q:'The frog is on 18 and hops back 3. Where does it land?',opts:['21','15','14'],ans:1},task:'Hop the frog back in 3s from 30 to 0',
 show:()=>auto(1,[27,24,21,18,15,12,9,6,3,0].map(n=>[420,()=>hopTo(n)])),go:()=>open(1,()=>M.f.pos===0)},
{h:'Fill the gaps',p:T.TXT[2],task:'Fill all 4 gaps',
 show:()=>auto(2,[[0,0],[0,1],[1,0],[1,1]].map(([li,gi])=>[600,()=>place(li,gi,T.LINES[li].fill[gi])])),go:()=>open(2,()=>Object.keys(M.g.put).length===4)},
{h:'Count wheels in 3s',p:T.TXT[3],predict:{q:'6 tricycles have 3 wheels each. How many wheels?',opts:['6','9','18'],ans:2},task:'Count the wheels on all 6 tricycles',
 show:()=>auto(3,[0,1,2,3,4,5].map(i=>[500,()=>countBike(i)])),go:()=>open(3,()=>Object.keys(M.w.said).length===T.TRIKES)},
{h:'Land on it or hop over?',p:T.TXT[4],task:'Sort all 6 number cards',
 show:()=>auto(4,T.CARDS.map((C,i)=>[480,()=>sortCard(i,C.z)])),go:()=>open(4,()=>Object.keys(M.s.at).length===T.CARDS.length)},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
PLAN.forEach(s=>{if(s.task)s.onPredict=()=>M.ping()});
FK.shell(c,{steps:PLAN,ratio:.72,tall:1.32,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting in 3s lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();
  A.gest({down,move,up});pads()}}).start()})})();
