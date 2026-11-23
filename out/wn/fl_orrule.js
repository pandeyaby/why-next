/* Flagship – mutually exclusive events and the OR rule (ages 13-15; KS3 probability, GCSE addition rule): sort pairs of
   events by whether they can happen together, count "A or B" on twenty numbered counters when nothing overlaps (add),
   then when 10 and 20 sit in both events (adding counts them twice), place counters in a Venn diagram to find the
   overlap, and explore any two events with P(A), P(B), P(A and B) and P(A or B) live. Data: orrule_art.js.
   Slips it targets: different-sounding events are mutually exclusive (even / 6,
   king / heart, prime / even); multiplying for OR; adding when events overlap (double counting); ignoring "neither". */
(()=>{const {ALL,EV,KEYS,PAIRS,VENN,zone,ZN,DESC,TXT,DONE,QS}=ORR;
VIS.reg('flagorrule',c=>{let A,bar,chal,qi=-1,gen=0;const st={};
const phase=()=>['pairs','add','twice','venn','free','quiz'][A.step];
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const px=n=>A.narrow?n:Math.round(n*1.1),FF='px system-ui,sans-serif';
const C={a:'#1d4ed8',b:'#c2410c',hit:'#047857',bad:'#b91c1c',rim:'#64748b',ink:'#0f172a'};
const fg=()=>A.col.dark?'#f1f5f9':'#0f172a';
function words(t,max,f){const g=A.ctx;g.font=f;const L=[];let s='';for(const w of t.split(' ')){const x=s?s+' '+w:w;if(s&&g.measureText(x).width>max){L.push(s);s=w}else s=x}if(s)L.push(s);return L}
function head(t,tone){const g=A.ctx,f=`800 ${px(16)}${FF}`,L=words(t,A.W-34,f),lh=px(16)*1.3,h=L.length*lh+12;
 g.fillStyle=tone==='ok'?(A.col.dark?'#14532d':'#dcfce7'):tone==='no'?(A.col.dark?'#7f1d1d':'#fee2e2'):(A.col.dark?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?C.hit:tone==='no'?C.bad:C.rim;g.stroke();g.font=f;g.fillStyle=fg();g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,14+i*lh));
 let y=8+h+5;if(st.msg){const f2=`700 ${px(14)}${FF}`,M=words(st.msg,A.W-34,f2).slice(0,3);g.font=f2;g.fillStyle=st.bad?(A.col.dark?'#fca5a5':C.bad):(A.col.dark?'#86efac':C.hit);M.forEach((r,i)=>g.fillText(r,17,y+i*px(14)*1.3));y+=M.length*px(14)*1.3+5}return y}
function box(r,label,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.bad||o.ok||o.sel?3:1.4;g.strokeStyle=o.bad?C.bad:o.ok?C.hit:o.sel?C.a:C.rim;g.stroke();
 if(!label)return;let n=px(o.n||15),L;for(;;){L=words(label,r.w-12,`800 ${n}${FF}`);if(L.length*n*1.2<=r.h-6||n<=11)break;n--}g.font=`800 ${n}${FF}`;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.2))}
function lineOut(t,y,col){const g=A.ctx;g.font=`700 ${px(15)}${FF}`;g.fillStyle=col||fg();g.textAlign='left';g.textBaseline='top';const L=words(t,A.W-24,g.font);L.forEach((r,i)=>g.fillText(r,12,y+i*px(15)*1.3));return y+L.length*px(15)*1.3+2}
/* the 20 counters: rings show membership of A (blue, solid) and B (orange, dashed) */
let CELLS=[];
function counters(top,bottom,a,b,picked,wrong){const g=A.ctx,cols=5,rows=4,gap=6,s=Math.min((A.W-16-gap*(cols-1))/cols,(bottom-top-gap*(rows-1))/rows);const x0=(A.W-(s*cols+gap*(cols-1)))/2;
 CELLS=ALL.map((n,i)=>({n,x:x0+(i%cols)*(s+gap),y:top+Math.floor(i/cols)*(s+gap),w:s,h:s}));
 CELLS.forEach(r=>{const cx=r.x+s/2,cy=r.y+s/2,R=s*.36,inA=a&&EV[a][1](r.n),inB=b&&EV[b][1](r.n);
  g.fillStyle=picked&&picked.includes(r.n)?'#bbf7d0':wrong===r.n?'#fecaca':'#f8fafc';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.lineWidth=1.2;g.strokeStyle=C.rim;g.stroke();
  if(inA){g.lineWidth=4;g.strokeStyle=C.a;g.beginPath();g.arc(cx,cy,R+4,0,7);g.stroke()}
  if(inB){g.lineWidth=4;g.strokeStyle=C.b;g.setLineDash([5,4]);g.beginPath();g.arc(cx,cy,R+(inA?9:4),0,7);g.stroke();g.setLineDash([])}
  g.font=`800 ${Math.round(R*.85)}${FF}`;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(String(r.n),cx,cy+1)});
 return top+4*(s+gap)}
function key(y,a,b){const g=A.ctx,f=`700 ${px(13)}${FF}`;g.font=f;g.textBaseline='middle';g.textAlign='left';g.lineWidth=4;
 g.strokeStyle=C.a;g.beginPath();g.arc(20,y+8,7,0,7);g.stroke();g.fillStyle=fg();g.fillText('A: '+EV[a][0],32,y+8);
 const w=g.measureText('A: '+EV[a][0]).width+56;g.strokeStyle=C.b;g.setLineDash([5,4]);g.beginPath();g.arc(w,y+8,7,0,7);g.stroke();g.setLineDash([]);g.fillText('B: '+EV[b][0],w+12,y+8);return y+20}
/* ---------- 1. can they happen together? ---------- */
let BINS=[],CARD=null;
function sortPair(z){const s=st.pr,it=PAIRS[s.i];if(!it)return;s.drag=null;
 if(z!==it.me){s.bad=z;A.sound.miss();return note(it.me?`They are mutually exclusive. ${it.why}`:`They can happen together. ${it.why}`,true)}
 s.i++;s.n[z]++;s.bad=-1;A.sound.pop();note(`Right. ${it.why}`,false)}
function drawPairs(){const s=st.pr,it=PAIRS[s.i],y0=head(it?`${s.i+1} of ${PAIRS.length}: can both happen at once?`:DONE[0],it?(st.bad?'no':''):'ok');
 const gap=10,bw=(A.W-16-gap)/2,bh=Math.min(A.H*.22,110),by=A.H-bh-8;BINS=[[1,'Mutually exclusive'],[0,'Can happen together']].map(([z,l],k)=>{const r={z,x:8+k*(bw+gap),y:by,w:bw,h:bh};box(r,`${l} (${s.n[z]})`,{n:16,bad:s.bad===z});return r});
 if(it){const w=Math.min(A.W*.7,340),h=Math.min(by-y0-16,110),d=s.drag;CARD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+6,w,h};box(CARD,it.t,{n:17,sel:!!d})}else CARD=null}
/* ---------- 2 and 3. count the OR ---------- */
function tapN(n,k){const s=st[k],a=s.a,b=s.b,want=ALL.filter(x=>EV[a][1](x)||EV[b][1](x));if(s.got.length>=want.length)return;
 if(s.got.includes(n)){A.sound.tick();return}
 if(!want.includes(n)){s.wrong=n;A.sound.miss();return note(`${n} is not ${EV[a][0].toLowerCase()} and not ${EV[b][0].toLowerCase()}, so it is not in "A or B".`,true)}
 s.got.push(n);s.wrong=-1;A.sound.pop();const both=EV[a][1](n)&&EV[b][1](n);
 note(both?`${n} is in both events. Count it once.`:`${n} counts. ${s.got.length} so far.`,false)}
function drawCount(k,i){const s=st[k],a=s.a,b=s.b,nA=ALL.filter(EV[a][1]).length,nB=ALL.filter(EV[b][1]).length,want=ALL.filter(x=>EV[a][1](x)||EV[b][1](x)).length,end=s.got.length>=want;
 const y0=head(end?DONE[i]:`Tap every counter that is ${EV[a][0].toLowerCase()} OR ${EV[b][0].toLowerCase()}.`,end?'ok':st.bad?'no':'');const y1=key(y0,a,b);
 const yEnd=counters(y1+4,A.H-px(15)*2.8-12,a,b,s.got,s.wrong);
 const y2=lineOut(`P(A) + P(B) = ${nA}/20 + ${nB}/20 = ${nA+nB}/20`,yEnd+2);lineOut(`Counted for A or B: ${s.got.length}/20`,y2,end&&nA+nB!==want?(A.col.dark?'#fca5a5':C.bad):null)}
/* ---------- 4. Venn diagram ---------- */
let VB=null,CA=null,CB=null,VC=null;
function where(p){if(!within(p,VB))return -1;const a=Math.hypot(p.x-CA.x,p.y-CA.y)<=CA.r,b=Math.hypot(p.x-CB.x,p.y-CB.y)<=CB.r;return (a?1:0)+(b?2:0)}
function place(z){const s=st.vn,n=VENN[s.i];if(n==null)return;s.drag=null;const ok=zone(n);
 if(z!==ok){s.bad=z;A.sound.miss();const t=ok===3?`${n} is even AND a multiple of 5, so it goes in the overlap.`:ok===0?`${n} is odd and not a multiple of 5: it goes outside both circles, in the box.`:ok===1?`${n} is even but not a multiple of 5: the Even circle, outside the overlap.`:`${n} is a multiple of 5 but odd: the Multiple of 5 circle, outside the overlap.`;return note(t,true)}
 s.put.push([n,z]);s.i++;s.bad=-1;A.sound.pop();note(`${n}: ${ZN[z].toLowerCase()}.`+(z===3?' It is in both events.':''),false)}
function drawVenn(){const s=st.vn,g=A.ctx,n=VENN[s.i],y0=head(n!=null?`Where does ${n} go?`:DONE[3],n!=null?(st.bad?'no':''):'ok');
 const ch=Math.min(70,A.W*.16),top=y0+ch+14,h=A.H-top-px(15)*1.5-14;VB={x:8,y:top,w:A.W-16,h};
 g.fillStyle=A.col.dark?'#1e293b':'#ffffff';g.fillRect(VB.x,VB.y,VB.w,VB.h);g.strokeStyle=C.rim;g.lineWidth=2;g.strokeRect(VB.x,VB.y,VB.w,VB.h);
 const R=Math.min(h*.42,VB.w*.27),cy=top+h*.52;CA={x:A.W/2-R*.6,y:cy,r:R};CB={x:A.W/2+R*.6,y:cy,r:R};
 g.fillStyle='rgba(37,99,235,.14)';g.beginPath();g.arc(CA.x,CA.y,R,0,7);g.fill();g.fillStyle='rgba(234,88,12,.14)';g.beginPath();g.arc(CB.x,CB.y,R,0,7);g.fill();
 g.lineWidth=3;g.strokeStyle=C.a;g.beginPath();g.arc(CA.x,CA.y,R,0,7);g.stroke();g.strokeStyle=C.b;g.setLineDash([6,4]);g.beginPath();g.arc(CB.x,CB.y,R,0,7);g.stroke();g.setLineDash([]);
 g.font=`800 ${px(13)}${FF}`;g.fillStyle=fg();g.textAlign='center';g.textBaseline='bottom';g.fillText('Even',CA.x-R*.45,cy-R*.75);g.fillText('Multiple of 5',CB.x+R*.35,cy-R*.75);g.textAlign='left';g.textBaseline='top';g.fillText('1 to 20',VB.x+6,VB.y+5);
 const spot={1:[CA.x-R*.55,cy],2:[CB.x+R*.55,cy],3:[A.W/2,cy],0:[VB.x+VB.w-26,VB.y+VB.h-24]},cnt={0:0,1:0,2:0,3:0};
 s.put.forEach(([m,z])=>{const [x,y]=spot[z],k=cnt[z]++;const yy=y+(k%2?1:-1)*Math.ceil(k/2)*24-(z===0?k*0:0);g.fillStyle='#bbf7d0';g.beginPath();g.arc(x,z===0?y-k*24:yy,14,0,7);g.fill();g.strokeStyle=C.hit;g.lineWidth=2;g.stroke();g.font=`800 13${FF}`;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(String(m),x,z===0?y-k*24:yy)});
 if(n!=null){const d=s.drag;VC={x:d?d.x-ch/2:A.W/2-ch/2,y:d?d.y-ch/2:y0+6,w:ch,h:ch};g.fillStyle=s.bad>=0?'#fecaca':'#fef3c7';g.beginPath();g.arc(VC.x+ch/2,VC.y+ch/2,ch/2,0,7);g.fill();g.strokeStyle=C.rim;g.lineWidth=2;g.stroke();
  g.font=`800 ${Math.round(ch*.42)}${FF}`;g.fillStyle=C.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(String(n),VC.x+ch/2,VC.y+ch/2+1)}else VC=null;
 lineOut(n==null?'Even 10 + Multiple of 5 4 − Both 2 = 12 counters':'Overlap = both events at once (A and B).',A.H-px(15)*1.4-6)}
/* ---------- 5. explore ---------- */
function choose(slot,k){const s=st.fr;if(slot==='a')s.a=k;else s.b=k;A.sound.tick();
 if(!s.a||!s.b)return note(`Now choose event ${s.a?'B':'A'}.`,false);if(s.a===s.b)return note('Choose two different events.',true);
 const both=ALL.filter(n=>EV[s.a][1](n)&&EV[s.b][1](n));
 if(both.length){s.over=1;note(`Not mutually exclusive: ${both.join(', ')} ${both.length>1?'are':'is'} in both, so adding counts ${both.length>1?'them':'it'} twice.`,false)}
 else{s.me=1;note('Mutually exclusive: no counter is in both, so P(A or B) = P(A) + P(B).',false)}}
function drawFree(){const s=st.fr,end=s.me&&s.over,y0=head(end?DONE[4]:'Find a mutually exclusive pair, and a pair that is not.',end?'ok':st.bad?'no':'');let y=y0;
 if(s.a&&s.b&&s.a!==s.b){y=key(y0,s.a,s.b);const nA=ALL.filter(EV[s.a][1]).length,nB=ALL.filter(EV[s.b][1]).length,nAB=ALL.filter(n=>EV[s.a][1](n)&&EV[s.b][1](n)).length;
  const yEnd=counters(y+4,A.H-px(15)*2.8-12,s.a,s.b,ALL.filter(n=>EV[s.a][1](n)||EV[s.b][1](n)),-1);
  const y2=lineOut(`P(A and B) = ${nAB}/20`,yEnd+2);lineOut(`P(A or B) = ${nA}/20 + ${nB}/20 − ${nAB}/20 = ${nA+nB-nAB}/20`,y2)}
 else counters(y0+4,A.H-12,s.a||null,s.b||null,[],-1)}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=phase();
 if(m==='quiz'){head('Challenge: A or B','ok');counters(A.H*.25,A.H-10,'even','m5',[],-1);return}
 if(m==='pairs')drawPairs();else if(m==='add')drawCount('ad',1);else if(m==='twice')drawCount('tw',2);else if(m==='venn')drawVenn();else drawFree();A.fx.draw(g)}
function down(p){const m=phase();
 if(m==='pairs'){if(CARD&&within(p,CARD)){st.pr.drag={x:p.x,y:p.y};return true}const r=BINS.find(r=>within(p,r));if(r)sortPair(r.z);return false}
 if(m==='add'||m==='twice'){const r=CELLS.find(r=>within(p,r));if(r)tapN(r.n,m==='add'?'ad':'tw');return false}
 if(m==='venn'){if(VC&&within(p,VC)){st.vn.drag={x:p.x,y:p.y};return true}return false}return false}
function move(p){const m=phase(),d=m==='pairs'?st.pr.drag:m==='venn'?st.vn.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=phase();
 if(m==='pairs'&&st.pr.drag){st.pr.drag=null;const r=BINS.find(r=>within(p,r));if(r)sortPair(r.z);else{A.redraw();note('Drop the card in one of the two boxes.',false)}}
 if(m==='venn'&&st.vn.drag){st.vn.drag=null;const z=where(p);if(z>=0)place(z);else{A.redraw();note('Drop the counter inside the box.',false)}}}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{pr:{i:0,n:{0:0,1:0},bad:-1,drag:null},ad:{a:'m5',b:'lt4',got:[],wrong:-1},tw:{a:'even',b:'m5',got:[],wrong:-1},
 vn:{i:0,put:[],bad:-1,drag:null},fr:{a:null,b:null,me:0,over:0},msg:null,bad:false,chk:()=>{}})}
function note(t,bad){st.msg=t;st.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.chk()}
const fin=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();c.say(DESC[i]);A.cv.setAttribute('aria-label',DESC[i]);st.chk=fin(i,ok);buttons();A.redraw()}
function auto(i,acts){steps[i].go();const e=gen;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===gen)f()},t)})}
const orList=k=>ALL.filter(x=>EV[st[k].a][1](x)||EV[st[k].b][1](x));
function buttons(){if(!bar)return;bar.innerHTML='';const m=phase(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='pairs'&&PAIRS[st.pr.i]){const it=PAIRS[st.pr.i];Bt('Mutually exclusive',()=>sortPair(1),`${it.t}: mutually exclusive`);Bt('Can happen together',()=>sortPair(0),`${it.t}: can happen together`)}
 if(m==='add'||m==='twice'){const k=m==='add'?'ad':'tw';if(st[k].got.length<orList(k).length)ALL.forEach(n=>{if(!st[k].got.includes(n))Bt(String(n),()=>tapN(n,k),`Counter ${n}`)})}
 if(m==='venn'&&VENN[st.vn.i]!=null){const n=VENN[st.vn.i];[1,3,2,0].forEach(z=>Bt(ZN[z],()=>place(z),`Put ${n} in: ${ZN[z]}`))}
 if(m==='free'){const s=st.fr;KEYS.forEach(k=>Bt('A: '+EV[k][0],()=>choose('a',k),`Event A: ${EV[k][0]}`+(s.a===k?' (chosen)':'')));KEYS.forEach(k=>Bt('B: '+EV[k][0],()=>choose('b',k),`Event B: ${EV[k][0]}`+(s.b===k?' (chosen)':'')))}}
const steps=[
{h:'Can both happen?',p:TXT[0],predict:{q:'One dice: "roll an even number" and "roll a 6". Mutually exclusive?',opts:['Yes, they are different events','No, a 6 is even'],ans:1},task:'Sort all 6 pairs',
 show:()=>auto(0,PAIRS.map(it=>[420,()=>sortPair(it.me)])),go:()=>enter(0,()=>st.pr.i>=PAIRS.length)},
{h:'No overlap: add',p:TXT[1],predict:{q:'P(multiple of 5) = 4/20 and P(less than 4) = 3/20. P(multiple of 5 or less than 4)?',opts:['12/400: multiply them','7/20: add them'],ans:1},task:'Tap all the A or B counters',
 show:()=>auto(1,[1,2,3,5,10,15,20].map(n=>[300,()=>tapN(n,'ad')])),go:()=>enter(1,()=>st.ad.got.length>=7)},
{h:'Overlap: adding fails',p:TXT[2],predict:{q:'P(even) = 10/20 and P(multiple of 5) = 4/20. Is P(even or multiple of 5) = 14/20?',opts:['Yes, just add them','No, some counters are in both'],ans:1},task:'Tap all the even or multiple of 5 counters',
 show:()=>auto(2,[2,4,5,6,8,10,12,14,15,16,18,20].map(n=>[260,()=>tapN(n,'tw')])),go:()=>enter(2,()=>st.tw.got.length>=12)},
{h:'Venn diagram',p:TXT[3],task:'Place all 6 counters',
 show:()=>auto(3,VENN.map(n=>[420,()=>place(zone(n))])),go:()=>enter(3,()=>st.vn.i>=VENN.length)},
{h:'Explore',p:TXT[4],predict:{q:'Counters 1 to 20: are "prime" and "even" mutually exclusive?',opts:['Yes, primes are odd','No, 2 is prime and even'],ans:1},task:'Find one pair of each kind',
 show:()=>auto(4,[[350,()=>choose('a','odd')],[450,()=>choose('b','even')],[700,()=>choose('a','prime')]]),go:()=>enter(4,()=>st.fr.me&&st.fr.over)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.chk()});
function why(t){let m='Check whether any outcome is in both events before you add.';
 if(t==='twice')m='That adds the overlap twice. Take P(A and B) off once: the outcome in both events must be counted only once.';
 if(t==='mult')m='Multiplying is for "A and then B" on two separate goes. For "A or B" on one go, add (and take off any overlap).';
 if(t==='one')m='Both outcomes count. A 1 and a 6 cannot both happen, so add: 1/6 + 1/6 = 2/6.';
 if(t==='same')m='Different names do not make events mutually exclusive. Look for one outcome that is in both.';
 if(t==='sub')m='OR means either one, so the chance gets bigger. For mutually exclusive events add: 0.3 + 0.5.';
 if(t==='comp')m='0.4 is the chance of green, the rest. Red or blue is 0.25 + 0.35.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:X=>{chal.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'OR rule lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
