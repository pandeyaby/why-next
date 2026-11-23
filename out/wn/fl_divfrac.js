/* Flagship – dividing a whole number by a unit fraction (ages 10–11; CCSS 5.NF.B.7b–c). Cut and count, grow a bar
   of pieces to check by multiplying, match stories, order by piece size, shortcut a × b. Data: divfrac_art.js. */
(()=>{const F=DIVFRAC;
VIS.reg('flagdivfrac',c=>{let A,g,bar,qa,qn=-1,gen=0;const S={};
const GOOD='#047857',BAD='#b91c1c',EDGE='#64748b',FONT='px system-ui,sans-serif',PIECE=['#fde68a','#bfdbfe'],PIECE_D=['#a16207','#1e40af'];
const kind=()=>['cut','check','story','order','fast','chal'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.1);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const dark=()=>A.col.dark,ink=()=>dark()?'#f1f5f9':'#0f172a';
const fr=(n,b)=>n%b===0?String(n/b):(n>b?`${Math.floor(n/b)} ${n%b}/${b}`:`${n}/${b}`);
function wrapText(t,max,font){g.font=font;const out=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(cur&&g.measureText(tr).width>max){out.push(cur);cur=w}else cur=tr});if(cur)out.push(cur);return out}
function banner(t,state){const font=`700 ${sz(15)}${FONT}`,ls=wrapText(t,A.W-34,font),lh=sz(15)*1.3,h=ls.length*lh+16;
 g.fillStyle=state==='ok'?(dark()?'#14532d':'#dcfce7'):state==='no'?(dark()?'#7f1d1d':'#fee2e2'):(dark()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);g.fill();
 g.lineWidth=state?2.5:1.2;g.strokeStyle=state==='ok'?GOOD:state==='no'?BAD:EDGE;g.stroke();g.font=font;g.fillStyle=ink();g.textAlign='left';g.textBaseline='top';ls.forEach((r,i)=>g.fillText(r,17,16+i*lh));return 8+h+8}
function chip(r,t,st){st=st||{};g.fillStyle=st.no?'#fee2e2':st.ok?'#dcfce7':st.on?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=st.no||st.ok||st.on?3:1.4;g.strokeStyle=st.no?BAD:st.ok?GOOD:st.on?'#1d4ed8':EDGE;g.stroke();
 let n=sz(st.n||17);g.font=`800 ${n}${FONT}`;while(g.measureText(t).width>r.w-10&&n>9){n--;g.font=`800 ${n}${FONT}`}g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
/* one whole as a bar, cut into b pieces (or uncut); numbers count the pieces from 'from' */
function whole(r,b,o){o=o||{};g.lineWidth=1.5;if(!b){g.fillStyle=dark()?'#334155':'#e2e8f0';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=o.bad?BAD:EDGE;g.lineWidth=o.bad?3:1.5;g.stroke();
  g.font=`700 ${sz(12)}${FONT}`;g.fillStyle=ink();g.textAlign='center';g.textBaseline='middle';g.fillText(o.label||'1 whole',r.x+r.w/2,r.y+r.h/2);return}
 const pw=r.w/b;for(let j=0;j<b;j++){g.fillStyle=(dark()?PIECE_D:PIECE)[j%2];g.fillRect(r.x+j*pw,r.y,pw,r.h);
  if(o.from!=null&&pw>=16){g.font=`800 ${sz(pw<24?10:12)}${FONT}`;g.fillStyle=dark()?'#ffffff':'#0f172a';g.textAlign='center';g.textBaseline='middle';g.fillText(String(o.from+j+1),r.x+(j+.5)*pw,r.y+r.h/2)}
  else if(pw>=26&&o.unit!==false){g.font=`700 ${sz(12)}${FONT}`;g.fillStyle=dark()?'#ffffff':'#0f172a';g.textAlign='center';g.textBaseline='middle';g.fillText(F.U[b],r.x+(j+.5)*pw,r.y+r.h/2)}}
 g.strokeStyle=dark()?'#e2e8f0':'#0f172a';g.lineWidth=1.2;for(let j=1;j<b;j++){g.beginPath();g.moveTo(r.x+j*pw,r.y);g.lineTo(r.x+j*pw,r.y+r.h);g.stroke()}
 g.lineWidth=o.bad?3:2;g.strokeStyle=o.bad?BAD:(dark()?'#e2e8f0':'#0f172a');A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke()}
function note(t){if(!S.note)return t;const font=`700 ${sz(13)}${FONT}`,ls=wrapText(S.note,A.W-40,font).slice(0,3),lh=sz(13)*1.3;g.font=font;g.fillStyle=S.noteBad?(dark()?'#fca5a5':BAD):(dark()?'#86efac':GOOD);g.textAlign='left';g.textBaseline='top';ls.forEach((l,i)=>g.fillText(l,20,t+i*lh));return t+ls.length*lh+8}
const ansBox=(i,n)=>{n=n||3;const w=Math.min(150,(A.W-16-8*(n-1))/n),h=Math.min(46,A.H*.1);return{x:(A.W-(n*w+8*(n-1)))/2+i*(w+8),y:A.H-h-8,w,h}};
/* ---------- 1. cut and count ---------- */
function rowsFor(top,a){const bot=Math.min(46,A.H*.1)+18,gap=10,h=Math.min(54,(A.H-top-bot-gap*(a-1))/a);return[...Array(a)].map((_,i)=>({x:16,y:top+i*(h+gap),w:A.W-32,h}))}
function pickTool(b){S.c.tool=b;S.c.bad=null;A.sound.tick();say(`Cutter: ${F.NAME[b]}. Tap a whole to cut it.`)}
function cutWhole(i){const s=S.c,P=F.CUT[s.k];if(!P||s.phase!=='cut')return;if(!s.tool)return say('Pick a cutter first: halves, thirds or quarters.');
 s.cuts[i]=s.tool;if(s.tool!==P.b){s.bad=i;A.sound.miss();return say(`Those are ${F.NAME[s.tool]}. ${P.a} ÷ ${F.U[P.b]} asks how many ${F.NAME[P.b]} fit, so cut into ${F.NAME[P.b]}.`)}
 s.bad=s.cuts.findIndex((b,j)=>j<P.a&&b&&b!==P.b);if(s.bad<0)s.bad=null;A.sound.pop();
 const left=[...Array(P.a).keys()].filter(j=>s.cuts[j]!==P.b).length;if(!left){s.phase='count';return say(`Every whole is cut into ${F.NAME[P.b]}. Count the pieces: how many ${F.NAME[P.b]} fit into ${P.a}?`)}
 say(`Whole ${i+1} is cut into ${P.b} ${F.NAME[P.b]}. ${left} to go.`)}
function cutNext(){const s=S.c,P=F.CUT[s.k];if(!P)return;const i=[...Array(P.a).keys()].find(j=>s.cuts[j]!==P.b&&s.cuts[j]!==s.tool);cutWhole(i==null?0:i)}
function pickCount(tag){const s=S.c,P=F.CUT[s.k];if(!P||s.phase!=='count')return;
 if(tag!=='ok'){s.bad='a'+tag;A.sound.miss();return say(tag==='div'?`That is ${P.a} ÷ ${P.b}. Dividing by ${F.U[P.b]} is not dividing by ${P.b}: count the ${F.NAME[P.b]}.`:tag==='same'?`That is just the number of wholes. Each whole holds ${P.b} ${F.NAME[P.b]}, so there are more pieces than wholes.`:`That adds ${P.a} and ${P.b}. Count the pieces: ${P.b} in each whole, ${P.a} wholes.`)}
 s.k++;s.last=P;s.cuts=[];s.phase='cut';s.bad=null;s.tool=null;A.sound.pop();say(`Yes: ${P.a} ÷ ${F.U[P.b]} = ${P.a*P.b}. ${P.b} ${F.NAME[P.b]} in each whole, ${P.a} wholes.`+(s.k<F.CUT.length?' Next sum.':''))}
/* ---------- 2. check by multiplying ---------- */
let NL={x0:0,x1:1,y:0};
const pos=v=>NL.x0+v*(NL.x1-NL.x0)/NL.max,val=x=>(x-NL.x0)*NL.max/(NL.x1-NL.x0);
function line(top,T){const max=T.a+1,y=top+(A.H-top-10)*.5;NL={x0:22,x1:A.W-22,y,max};g.strokeStyle=ink();g.lineWidth=2.5;g.beginPath();g.moveTo(NL.x0,y);g.lineTo(NL.x1,y);g.stroke();
 for(let k=0;k<=max*T.b;k++){const big=k%T.b===0,x=pos(k/T.b);g.lineWidth=big?2.5:1.2;g.beginPath();g.moveTo(x,y-(big?10:5));g.lineTo(x,y+(big?10:5));g.stroke();
  if(big){g.font=`800 ${sz(13)}${FONT}`;g.fillStyle=ink();g.textAlign='center';g.textBaseline='top';g.fillText(String(k/T.b),x,y+14)}}
 g.font=`700 ${sz(11)}${FONT}`;g.fillStyle=dark()?'#cbd5e1':'#334155';g.textAlign='left';g.textBaseline='top';g.fillText('wholes',NL.x0,y+34);
 const tx=pos(T.a);g.strokeStyle=dark()?'#fbbf24':'#b45309';g.lineWidth=3;g.setLineDash([5,4]);g.beginPath();g.moveTo(tx,y-78);g.lineTo(tx,y+10);g.stroke();g.setLineDash([]);
 A.paint.label(`target: ${T.a} wholes`,tx,y-88,{font:`800 ${sz(12)}${FONT}`,bg:dark()?'#78350f':'#92400e',col:'#ffffff'})}
function growBar(T,n){const y=NL.y-40,h=26,pw=(NL.x1-NL.x0)/NL.max/T.b;for(let k=0;k<n;k++){g.fillStyle=(dark()?PIECE_D:PIECE)[k%2];g.fillRect(NL.x0+k*pw,y,pw,h);g.strokeStyle=dark()?'#e2e8f0':'#0f172a';g.lineWidth=1;g.strokeRect(NL.x0+k*pw,y,pw,h)}
 const ex=NL.x0+n*pw;A.paint.ball(ex,y+h/2,13,S.k.bad?'#dc2626':'#7c3aed');g.strokeStyle='#0f172a';g.lineWidth=1.5;g.beginPath();g.arc(ex,y+h/2,13,0,7);g.stroke();
 A.paint.label(`${n} × ${F.U[T.b]} = ${fr(n,T.b)}`,Math.min(Math.max(ex,70),A.W-70),y-16,{font:`800 ${sz(13)}${FONT}`,bg:'#1f2937',col:'#ffffff'});return{ex,y,h}}
function tryCount(n){const s=S.k,T=F.CHECK[s.k];if(!T)return;s.n=n;
 if(n===T.a*T.b){s.k++;s.bad=null;s.last=T;s.n=0;A.sound.pop();return say(`Yes: ${n} × ${F.U[T.b]} = ${T.a}, so ${T.a} ÷ ${F.U[T.b]} = ${n}.`+(s.k<F.CHECK.length?' Next one.':''))}
 s.bad=true;A.sound.miss();
 if(n===T.a)return say(`${n} pieces is only ${n} × ${F.U[T.b]} = ${n}/${T.b}, less than one whole. Keep adding ${F.NAME[T.b]} until you reach ${T.a} wholes.`);
 if(n<T.a*T.b)return say(`${n} × ${F.U[T.b]} = ${fr(n,T.b)}. That is short of ${T.a} wholes. Add more pieces.`);
 say(`${n} × ${F.U[T.b]} = ${fr(n,T.b)}. That goes past ${T.a} wholes. Take some pieces off.`)}
function stepPiece(d){const s=S.k,T=F.CHECK[s.k];if(!T)return;s.n=Math.max(0,Math.min((T.a+1)*T.b,s.n+d));s.bad=null;A.sound.tick();say(`${s.n} × ${F.U[T.b]} = ${fr(s.n,T.b)}.`)}
/* ---------- 3. stories ---------- */
function storyBox(i){const w=Math.min(220,(A.W-16-10)/2),h=Math.min(52,A.H*.11),x0=(A.W-(2*w+10))/2;return{x:x0+(i%2)*(w+10),y:A.H-2*(h+10)+(i>1?h+10:0)-2,w,h}}
function pickSent(j){const s=S.s,T=F.STORY[s.k];if(!T)return;if(j!==T.a){s.bad=j;A.sound.miss();return say(F.WHY[`${s.k}-${j}`])}
 s.k++;s.bad=null;s.last=T;A.sound.pop();say(`Yes: ${F.SENT[j]}. ${T.r}`+(s.k<F.STORY.length?' Next story.':''))}
/* ---------- 4. smaller pieces ---------- */
function colBox(i){const w=(A.W-16-16)/3;return{x:8+i*(w+8),y:S.top,w,h:A.H-S.top-10}}
function pickOrder(i){const s=S.o,b=F.ORDER[i];if(s.got.includes(b))return;const want=[2,4,8].find(x=>!s.got.includes(x));
 if(b!==want){s.bad=i;A.sound.miss();return say(`2 ÷ ${F.U[b]} is not the smallest answer left. ${F.NAME[b][0].toUpperCase()+F.NAME[b].slice(1)} are ${b>want?'smaller':'bigger'} pieces than ${F.NAME[want]}, so ${b>want?'more':'fewer'} fit into 2.`)}
 s.got.push(b);s.bad=null;A.sound.pop();say(`2 ÷ ${F.U[b]} = ${2*b}: ${b} ${F.NAME[b]} in each whole.`+(s.got.length<3?' Which is next?':' Smaller pieces, bigger answer.'))}
/* ---------- 5. shortcut ---------- */
function pickFast(tag){const s=S.f,P=F.FAST[s.k];if(!P)return;if(tag!=='ok'){s.bad=tag;A.sound.miss();return say(F.FASTWHY[tag])}
 s.k++;s.bad=null;s.last=P;A.sound.pop();say(`Yes: ${P.a} ÷ ${F.U[P.b]} = ${P.a} × ${P.b} = ${P.a*P.b}.`+(s.k<F.FAST.length?' Next sum.':''))}
function grid(top,bottom,P){const rows=P.a,cols=P.b,av=A.H-top-bottom,ch=Math.min(34,(av-4*(rows-1))/rows),w=Math.min(A.W-40,cols*60),x0=(A.W-w)/2;
 for(let i=0;i<rows;i++)whole({x:x0,y:top+i*(ch+4),w,h:ch},cols,{from:i*cols});A.paint.label(`${P.a} wholes × ${P.b} ${F.NAME[P.b]} each = ${P.a*P.b}`,A.W/2,top+rows*(ch+4)+10,{font:`800 ${sz(13)}${FONT}`,bg:dark()?'#14532d':'#065f46',col:'#ffffff'})}
/* ---------- draw ---------- */
function draw(){const m=kind();g.fillStyle=dark()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);
 if(m==='chal'){const t=banner('Challenge: how many pieces fit? Check it by multiplying.','ok');rowsFor(t+6,3).forEach((r,i)=>whole(r,2,{from:i*2}));return A.fx.draw(g)}
 if(m==='cut'){const s=S.c,P=F.CUT[s.k],L=s.last;
  if(!P){const t=banner(F.DONE[0],'ok');rowsFor(t,L.a).forEach((r,i)=>whole(r,L.b,{from:i*L.b}));return A.fx.draw(g)}
  const t=note(banner(s.phase==='cut'?`Sum ${s.k+1} of 2: ${P.a} ÷ ${F.U[P.b]}. How many ${F.NAME[P.b]} fit into ${P.a}? Pick a cutter, then tap each whole.`:`Count the pieces. ${P.a} ÷ ${F.U[P.b]} = ?`,s.bad!=null?'no':''));
  S.rows=rowsFor(t,P.a);S.rows.forEach((r,i)=>whole(r,s.cuts[i],{bad:s.bad===i,from:s.phase==='count'?i*P.b:null,label:'1 whole: tap to cut'}));
  if(s.phase==='count')P.opts.forEach(([v,tag],i)=>chip(ansBox(i),v,{no:s.bad==='a'+tag}))}
 if(m==='check'){const s=S.k,T=F.CHECK[s.k],L=s.last;
  if(!T){const t=banner(F.DONE[1],'ok');line(t+30,L);growBar(L,L.a*L.b);return A.fx.draw(g)}
  const t=note(banner(`Check ${s.k+1} of 2: ${T.a} ÷ ${F.U[T.b]} = ? Add ${F.NAME[T.b]} until they make ${T.a} wholes.`,s.bad?'no':''));line(t+24,T);growBar(T,s.drag?Math.round(s.drag.v*T.b):s.n)}
 if(m==='story'){const s=S.s,T=F.STORY[s.k];const t=banner(T?`Story ${s.k+1} of 4. ${T.t}`:'Fitting pieces into an amount: amount ÷ piece size. Sharing an amount: amount ÷ number of shares.',T?(s.bad!=null?'no':''):'ok');
  if(T)note(t);else{const h=Math.min(44,(A.H-t-20)/4-8);F.STORY.forEach((x,i)=>chip({x:16,y:t+4+i*(h+8),w:A.W-32,h},`${F.SENT[x.a]}: ${x.r.split(':')[0]}`,{ok:true,n:14}))}
  if(T)F.SENT.forEach((x,j)=>chip(storyBox(j),x,{no:s.bad===j,n:19}))}
 if(m==='order'){const s=S.o,fin=s.got.length===3;S.top=(fin?x=>x:note)(banner(fin?'2 ÷ ½ = 4, 2 ÷ ¼ = 8, 2 ÷ ⅛ = 16. Smaller pieces, bigger answer.':'Tap the sums from the smallest answer to the biggest.',fin?'ok':s.bad!=null?'no':''));
  F.ORDER.forEach((b,i)=>{const r=colBox(i),on=s.got.includes(b);chip({x:r.x,y:r.y,w:r.w,h:Math.min(46,A.H*.1)},on?`2 ÷ ${F.U[b]} = ${2*b}`:`2 ÷ ${F.U[b]}`,{ok:on,no:s.bad===i,n:16});
   const bh=Math.min(40,(r.h-70)/2);for(let k=0;k<2;k++)whole({x:r.x+4,y:r.y+60+k*(bh+8),w:r.w-8,h:bh},on?b:0,{label:'1 whole',unit:false});
   if(on){const rank=s.got.indexOf(b)+1;A.paint.label(['','smallest','middle','biggest'][rank],r.x+r.w/2,r.y+60+2*(bh+8)+12,{font:`800 ${sz(12)}${FONT}`,bg:'#1f2937',col:'#ffffff'})}})}
 if(m==='fast'){const s=S.f,P=F.FAST[s.k],L=s.last,t=banner(P?`Sum ${s.k+1} of 3: ${P.a} ÷ ${F.U[P.b]} = ?`:'a ÷ 1/b = a × b. Each whole holds b pieces.',P?(s.bad?'no':''):'ok');
  if(P){const t2=note(t),n=P.a,bh=Math.min(34,(A.H-t2-Math.min(46,A.H*.1)-24-4*(n-1))/n),w=Math.min(A.W-40,240);for(let i=0;i<n;i++)whole({x:(A.W-w)/2,y:t2+i*(bh+4),w,h:bh},0,{label:'1 whole'})}else if(L)grid(t+4,20,L);if(P)P.opts.forEach(([v,tag],i)=>chip(ansBox(i),v,{no:s.bad===tag}))}
 A.fx.draw(g)}
/* ---------- pointer ---------- */
function down(p){const m=kind();
 if(m==='cut'){const s=S.c,P=F.CUT[s.k];if(!P)return false;if(s.phase==='cut'){const i=(S.rows||[]).findIndex(r=>hit(p,r));if(i>=0)cutWhole(i)}else{const i=[0,1,2].find(i=>hit(p,ansBox(i)));if(i!=null)pickCount(P.opts[i][1])}return false}
 if(m==='check'){const s=S.k,T=F.CHECK[s.k];if(!T)return false;const ex=pos(s.n/T.b);if(Math.abs(p.x-ex)<28&&Math.abs(p.y-(NL.y-27))<30){s.drag={v:s.n/T.b,x0:p.x};A.redraw();return true}
  if(p.y>NL.y-56&&p.y<NL.y+30){s.n=Math.max(0,Math.min((T.a+1)*T.b,Math.round(val(p.x)*T.b)));s.bad=null;A.sound.tick();say(`${s.n} × ${F.U[T.b]} = ${fr(s.n,T.b)}. Drag the end or press Check.`)}return false}
 if(m==='story'){if(!F.STORY[S.s.k])return false;const j=[0,1,2,3].find(j=>hit(p,storyBox(j)));if(j!=null)pickSent(j);return false}
 if(m==='order'){const i=[0,1,2].find(i=>hit(p,colBox(i)));if(i!=null)pickOrder(i);return false}
 if(m==='fast'){const P=F.FAST[S.f.k];if(P){const i=[0,1,2].find(i=>hit(p,ansBox(i)));if(i!=null)pickFast(P.opts[i][1])}return false}
 return false}
function move(p){const s=S.k;if(kind()==='check'&&s.drag){const T=F.CHECK[s.k];s.drag.v=Math.max(0,Math.min(T.a+1,val(p.x)));A.redraw()}}
function up(p){const s=S.k;if(kind()!=='check'||!s.drag)return;const T=F.CHECK[s.k],d=s.drag;s.drag=null;if(Math.abs(p.x-d.x0)<6){say('Drag the end of the bar along the line, or use the buttons.');return}tryCount(Math.round(d.v*T.b))}
/* ---------- state ---------- */
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{c:{k:0,cuts:[],tool:null,phase:'cut',bad:null,last:null},k:{k:0,n:0,bad:null,drag:null,last:null},s:{k:0,bad:null,last:null},o:{got:[],bad:null},f:{k:0,bad:null,last:null},top:0,rows:[],check:()=>{}})}
function say(t){const st={cut:S.c,check:S.k,story:S.s,order:S.o,fast:S.f}[kind()];S.note=t;S.noteBad=!!st&&st.bad!=null&&st.bad!==false;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function start(i,ok){fresh();say(F.DESC[i]);S.note=null;S.check=finish(i,ok,F.DONE[i])}
function demo(i,acts){steps[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!bar)return;bar.innerHTML='';const m=kind(),add=(t,f,l,pr)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t);if(pr!=null)b.setAttribute('aria-pressed',String(pr));b.onclick=f};
 if(m==='cut'){const s=S.c,P=F.CUT[s.k];if(P&&s.phase==='cut'){F.TOOLS.forEach(b=>add(`Cutter: ${F.NAME[b]}`,()=>pickTool(b),null,s.tool===b));add('Cut the next whole',cutNext)}if(P&&s.phase==='count')P.opts.forEach(([v,tag])=>add(v,()=>pickCount(tag),`Answer ${v}`))}
 if(m==='check'&&F.CHECK[S.k.k]){add('◀ 1 piece',()=>stepPiece(-1),'Take 1 piece off');add('1 piece ▶',()=>stepPiece(1),'Add 1 piece');add(`Check: ${S.k.n} pieces`,()=>tryCount(S.k.n))}
 if(m==='story'&&F.STORY[S.s.k])F.SENT.forEach((x,j)=>add(x,()=>pickSent(j),`Number sentence ${x}`));
 if(m==='order')F.ORDER.forEach((b,i)=>{if(!S.o.got.includes(b))add(`2 ÷ ${F.U[b]}`,()=>pickOrder(i))});
 if(m==='fast'){const P=F.FAST[S.f.k];if(P)P.opts.forEach(([v,tag])=>add(v,()=>pickFast(tag),`Answer ${v}`))}}
const cutPlan=()=>F.CUT.flatMap(P=>[[250,()=>pickTool(P.b)],...[...Array(P.a).keys()].map(i=>[220,()=>cutWhole(i)]),[300,()=>pickCount('ok')]]);
const steps=[
{h:'How many fit?',p:F.TXT[0],predict:{q:'3 ÷ ½: will the answer be bigger or smaller than 3?',opts:['Smaller: dividing always makes a number smaller','Bigger: lots of halves fit into 3'],ans:1},task:'Cut and count both sums',
 show:()=>demo(0,cutPlan()),go:()=>start(0,()=>S.c.k>=F.CUT.length)},
{h:'Check by multiplying',p:F.TXT[1],predict:{q:'How many fifths make 4 wholes?',opts:['⅘, because 4 ÷ 5 = ⅘','20, because each whole has 5 fifths'],ans:1},task:'Grow the bar to both targets',
 show:()=>demo(1,F.CHECK.map(T=>[400,()=>tryCount(T.a*T.b)])),go:()=>start(1,()=>S.k.k>=F.CHECK.length)},
{h:'Which sum is it?',p:F.TXT[2],task:'Match all 4 stories',show:()=>demo(2,F.STORY.map(T=>[300,()=>pickSent(T.a)])),go:()=>start(2,()=>S.s.k>=F.STORY.length)},
{h:'Smaller pieces',p:F.TXT[3],predict:{q:'Which is bigger: 2 ÷ ½ or 2 ÷ ¼?',opts:['2 ÷ ½, because ½ is bigger than ¼','2 ÷ ¼, because more quarters fit into 2'],ans:1},task:'Put the 3 sums in order',
 show:()=>demo(3,[2,4,8].map(b=>[300,()=>pickOrder(F.ORDER.indexOf(b))])),go:()=>start(3,()=>S.o.got.length===3)},
{h:'The shortcut',p:F.TXT[4],task:'Solve all 3 sums',show:()=>demo(4,F.FAST.map(()=>[300,()=>pickFast('ok')])),go:()=>start(4,()=>S.f.k>=F.FAST.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Ask how many pieces fit into the whole number, then check by multiplying.';
 if(t==='div')m='That divides by the bottom number. Dividing by ½ is not dividing by 2: count how many halves fit, which is more.';
 if(t==='smaller')m='Dividing by a unit fraction makes the answer bigger, not smaller, because many pieces fit into each whole.';
 if(t==='mult')m='That multiplies by the fraction. You want how many pieces fit: wholes × pieces in each whole.';
 if(t==='add')m='That adds the numbers. Each whole holds the same number of pieces, so multiply.';
 if(t==='bigger')m='Fifths are smaller than halves, so more of them fit: 5 ÷ ⅕ = 25 and 5 ÷ ½ = 10.';
 if(t==='same')m='The pieces are different sizes, so different numbers of them fit: 25 fifths but only 10 halves.';
 if(t==='check')m='To check a ÷ 1/b = c, multiply the answer by the fraction: c × 1/b should give a back.';
 if(t==='flip')m='Order matters in division. ½ ÷ 3 shares a half into 3 (⅙ each). 3 ÷ ½ counts halves in 3 (6).';
 return m}
function ask(){qn++;const Q=F.QS[qn%F.QS.length],all=[[Q.a,'ok'],...Q.o],k=qn%3,shown=all.slice(k).concat(all.slice(0,k));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qa.querySelector('.fl-pick');shown.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:X=>{qa.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fraction lab buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
