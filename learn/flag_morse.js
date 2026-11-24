/* Flagship – Patterns and codes for sending information (ages 9–10; NGSS 4-PS4-3). Send SOS in Morse with short, long
   and letter-gap keys; find many readings of one gapless signal; design a code that gives the shortest patterns to the
   most used letters; decode a picture sent as rows of 1s and 0s; fix a noisy message by majority vote over 3 copies.
   Data and drawings: morse_art.js. Every canvas tap has a button twin below. */
(()=>{const M=MORSE;
VIS.reg('flagmorse',c=>{let A,P,pad,qz,qk=-1,run=0;const K={};
const mode=()=>['send','gaps','own','pic','vote','quiz'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#eef2ff';g.fillRect(0,0,A.W,A.H)}
const KEYS=[['·','Short ·'],['−','Long −'],['/','Letter gap']];
/* ---------- 1. send SOS ---------- */
let KB=[];
function key(s){const k=K.so;if(k.i>=M.SOS.length)return;const want=M.SOS[k.i];
 if(s!==want){k.bad=KEYS.findIndex(x=>x[0]===s);A.sound.miss();
  if(want==='/')return say('That letter is complete. Tap Letter gap, or the receiver will run it into the next letter.',true);
  if(s==='/')return say('Not yet. This letter needs more beeps before the gap.',true);
  return say(want==='·'?'S is three short beeps: · · ·. A long beep here makes a different letter.':'O is three long beeps: − − −. A long beep lasts three times as long as a short one.',true)}
 k.i++;k.bad=-1;k.lit=s!=='/';const e=run;setTimeout(()=>{if(e===run){k.lit=false;A.redraw()}},s==='−'?420:160);
 if(s==='/')A.sound.tick();else A.sound.pop();
 say(s==='/'?'Gap sent. Next letter.':k.i>=M.SOS.length?'SOS sent!':(s==='·'?'Short beep.':'Long beep.'),false)}
function drawSend(){const k=K.so,y0=P.strip(k.i<M.SOS.length?`Send S O S. ${k.i} of ${M.SOS.length} signals sent.`:M.DONE[0],k.i<M.SOS.length?(k.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const r=Math.min(A.W*.1,A.H*.08,44);M.lamp(g,8+r*1.8,y0+r*1.7,r,k.lit);
 const tx=8+r*3.8,tw=A.W-tx-8,th=Math.min(r*1.6,70);P.card({x:tx,y:y0+r*.9,w:tw,h:th},'');
 const u=Math.min(tw/12,28);let x=tx+u*.7;M.SOS.slice(0,k.i).forEach(s=>{if(s==='/'){x+=u*.5;return}M.beep(g,s,x+(s==='−'?u*.3:0),y0+r*.9+th/2,u);x+=s==='−'?u*1.2:u*.7});
 const gp=8,kw=(A.W-16-gp*2)/3,kh=Math.min(A.H*.26,130),ky=A.H-kh-8;
 KB=KEYS.map(([s,t],j)=>{const b={s,x:8+j*(kw+gp),y:ky,w:kw,h:kh};P.card(b,t,{n:18,no:k.bad===j});return b})}
/* ---------- 2. where are the gaps? ---------- */
let GAP=[];
function gap(j){const s=K.gp;s.g[j]=!s.g[j];const r=M.read(s.g);A.sound.tick();
 if(!s.found.includes(r)){s.found.push(r);say(`New reading: ${r}. Same beeps, different letters.`,false)}else say(`${r} again. Try another set of gaps.`,false)}
function drawGaps(){const s=K.gp,y0=P.strip(s.found.length<4?`Readings found: ${s.found.length} of 4. Tap a space to add or remove a gap.`:M.DONE[1],s.found.length>=4?'ok':'',K.note,K.bad),g=A.ctx;
 const u=Math.min((A.W-16)/9,70),bh=Math.min(A.H*.22,u*1.4),by=y0+6,x0=(A.W-u*7)/2;GAP=[];
 M.RX.forEach((b,i)=>{const r={x:x0+i*2*u,y:by,w:u,h:bh};P.card(r,'');M.beep(g,b,r.x+u/2,r.y+bh/2,u);
  if(i<3){const q={j:i,x:r.x+u,y:by,w:u,h:bh};GAP.push(q);P.card(q,s.g[i]?'gap':'',{sel:!!s.g[i],dim:!s.g[i],n:13})}});
 const ly=by+bh+12;g.font=`800 ${P.sz(22)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='top';g.fillText('Reads as: '+M.read(s.g),A.W/2,ly);
 g.font=`700 ${P.sz(15)}${P.F}`;P.wrap('Found: '+s.found.join(' · '),A.W-24,g.font).forEach((t,i)=>g.fillText(t,A.W/2,ly+P.sz(22)*1.5+i*P.sz(15)*1.3))}
/* ---------- 3. design your own code ---------- */
let CB=[];
function give(z){const s=K.mc,it=M.FREQ[s.i];if(!it||s.used.includes(z))return;const left=M.CODES.map((_,j)=>j).filter(j=>!s.used.includes(j)),short=Math.min(...left.map(j=>M.CODES[j].length));
 if(M.CODES[z].length>short){s.bad=z;A.sound.miss();return say(`${it.l} is used ${it.p}% of the time. A long code for it slows down most messages. Give it the shortest code left.`,true)}
 s.got[it.l]=M.CODES[z];s.used.push(z);s.i++;s.bad=-1;A.sound.pop();say(`${it.l} gets ${M.CODES[z]}.`+(s.i<M.FREQ.length?' Next letter.':''),false)}
const len=(w,map)=>w.replace(/ /g,'').split('').reduce((n,l)=>n+map[l].length,0);
function drawOwn(){const s=K.mc,it=M.FREQ[s.i],y0=P.strip(it?`Letter ${s.i+1} of 4: ${it.l}, used ${it.p}% of the time. Pick its code.`:M.DONE[2],it?(s.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const rh=Math.min(28,(A.H*.3)/4);M.FREQ.forEach((f,i)=>{const y=y0+4+i*(rh+6);g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='middle';
  g.fillText(`${f.l}${s.got[f.l]?' = '+s.got[f.l]:''}`,12,y+rh/2);M.bar(g,A.W*.34,y+4,A.W*.6,rh-8,f.p,13)});
 const top=y0+4+4*(rh+6)+6;if(!it){const sw={...s.got};[sw.E,sw.Q]=[sw.Q,sw.E];g.font=`700 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='top';
  P.wrap(`"${M.MSG}" in your code: ${len(M.MSG,s.got)} symbols. With E and Q swapped: ${len(M.MSG,sw)} symbols.`,A.W-24,g.font).forEach((t,i)=>g.fillText(t,12,top+i*P.sz(15)*1.3));CB=[];return}
 const cols=A.narrow?2:4,rows=4/cols,gp=8,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-top-8-gp*(rows-1))/rows,110);
 CB=M.CODES.map((t,z)=>({z,x:8+(z%cols)*(w+gp),y:top+Math.floor(z/cols)*(h+gp),w,h})).filter(r=>!s.used.includes(r.z));
 CB.forEach(r=>P.card(r,M.CODES[r.z]+`  (${M.CODES[r.z].length})`,{n:22,no:s.bad===r.z}))}
/* ---------- 4. a picture made of numbers ---------- */
let GRID=null;
const need=i=>M.PIC[Math.floor(i/5)][i%5]==='1';
function cur(){const s=K.px;let i=0;while(i<25&&(s.g[i]||s.w[i]))i++;return i}
function paint(i){const s=K.px;if(s.g[i])return;if(!need(i)){s.bad=i;A.sound.miss();return say(`Row ${Math.floor(i/5)+1}, square ${i%5+1} is 0 in the code, so it stays white.`,true)}
 s.g[i]=1;s.bad=-1;A.sound.pop();const left=[...Array(25).keys()].filter(j=>need(j)&&!s.g[j]).length;say(left?`Black. ${left} black squares to go.`:'Every 1 is black.',false)}
function pickPx(v){const s=K.px,i=cur();if(i>=25)return;if(v!==(need(i)?1:0)){s.bad=i;A.sound.miss();return say(`Row ${Math.floor(i/5)+1} reads ${M.PIC[Math.floor(i/5)]}: square ${i%5+1} is ${need(i)?1:0}, so it is ${need(i)?'black':'white'}.`,true)}
 if(v)paint(i);else{s.w[i]=1;s.bad=-1;A.sound.tick();say('White.',false)}}
function drawPic(){const s=K.px,ok=[...Array(25).keys()].every(j=>!need(j)||s.g[j]),y0=P.strip(ok?M.DONE[3]:'Tap each square whose code is 1. Row 1 is the top row.',ok?'ok':s.bad>=0?'no':'',K.note,K.bad),g=A.ctx;
 const side=Math.min(A.W*.55,A.H-y0-16,320),gx=A.W-side-12,gy=y0+4;GRID={x:gx,y:gy,w:side,h:side};M.face(g,gx,gy,side,s.g,ok?-1:cur());
 if(s.bad>=0){const c=side/5;g.strokeStyle='#dc2626';g.lineWidth=4;g.strokeRect(gx+(s.bad%5)*c+3,gy+Math.floor(s.bad/5)*c+3,c-6,c-6)}
 const fs=Math.min(P.sz(20),side/5*.5);g.font=`800 ${fs}px ui-monospace,monospace`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='middle';
 M.PIC.forEach((t,r)=>g.fillText(t,12,gy+(r+.5)*side/5))}
/* ---------- 5. three copies beat the noise ---------- */
let PADS=[];
const vote=i=>M.COPIES.filter(c=>c[i]==='1').length;
function pickBit(v){const s=K.rp;if(s.i>=5)return;const n1=vote(s.i),maj=n1>=2?1:0;
 if(v!==maj){s.bad=v;A.sound.miss();return say(`In place ${s.i+1}, ${maj?n1:3-n1} of 3 copies say ${maj}. One copy was hit by noise. Go with most copies.`,true)}
 s.got+=String(v);s.i++;s.bad=-1;A.sound.pop();say(s.i<5?`Place ${s.i}: ${v}. Next place.`:'Message fixed.',false)}
function drawVote(){const s=K.rp,y0=P.strip(s.i<5?`Place ${s.i+1} of 5: pick 1 or 0 for the true message.`:M.DONE[4],s.i<5?(s.bad>=0?'no':''):'ok',K.note,K.bad),g=A.ctx;
 const cw=Math.min((A.W-120)/5,56),rh=Math.min(cw*.9,44),x0=A.W-12-cw*5;
 [...M.COPIES,s.got.padEnd(5,'?')].forEach((row,r)=>{const y=y0+4+r*(rh+6)+(r===3?8:0);g.font=`800 ${P.sz(14)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='middle';g.fillText(r<3?`Copy ${r+1}`:'Fixed',12,y+rh/2);
  row.split('').forEach((b,i)=>{const q={x:x0+i*cw+2,y,w:cw-4,h:rh};const wrong=r<3&&b!==M.TRUE[i]&&s.i>i;P.card(q,b,{n:20,sel:r<3&&i===s.i,no:wrong,ok:r===3&&b!=='?'})})});
 const py=y0+4+4*(rh+6)+16,ph=Math.min(A.H-py-8,120),pw=(A.W-24)/2;PADS=[1,0].map((v,j)=>{const q={v,x:8+j*(pw+8),y:A.H-ph-8,w:pw,h:ph};P.card(q,String(v),{n:30,no:s.bad===v});return q})}
/* ---------- wiring ---------- */
function draw(){sky();const m=mode();if(m==='quiz'){P.strip('Challenge: codes and signals','ok');const r=Math.min(A.W,A.H)*.12;M.lamp(A.ctx,A.W/2,A.H*.5,r,true);return}
 ({send:drawSend,gaps:drawGaps,own:drawOwn,pic:drawPic,vote:drawVote})[m]();A.fx.draw(A.ctx)}
function tap(p){const m=mode();
 if(m==='send'){const b=KB.find(r=>hit(p,r));if(b)key(b.s)}
 if(m==='gaps'){const q=GAP.find(r=>hit(p,r));if(q)gap(q.j)}
 if(m==='own'){const q=CB.find(r=>hit(p,r));if(q)give(q.z)}
 if(m==='pic'&&hit(p,GRID)){const c=GRID.w/5;paint(Math.floor((p.y-GRID.y)/c)*5+Math.floor((p.x-GRID.x)/c))}
 if(m==='vote'){const q=PADS.find(r=>hit(p,r));if(q)pickBit(q.v)}return false}
function fresh(){run++;for(const k in K)delete K[k];Object.assign(K,{so:{i:0,bad:-1,lit:false},gp:{g:[0,0,0],found:['V']},mc:{i:0,got:{},used:[],bad:-1},
 px:{g:Array(25).fill(0),w:Array(25).fill(0),bad:-1},rp:{i:0,got:'',bad:-1},note:null,bad:false,test:()=>{}})}
function say(t,bad){K.note=t;K.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(M.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(M.DESC[i]);A.cv.setAttribute('aria-label',M.DESC[i]);K.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='send'&&K.so.i<M.SOS.length)KEYS.forEach(([s,t])=>B(t,()=>key(s),`Send ${t.toLowerCase()}`));
 if(m==='gaps')[0,1,2].forEach(j=>B(`${K.gp.g[j]?'Remove':'Add'} gap ${j+1}`,()=>gap(j),`${K.gp.g[j]?'Remove':'Add'} a letter gap after beep ${j+1}`));
 if(m==='own'&&M.FREQ[K.mc.i])M.CODES.forEach((t,z)=>{if(!K.mc.used.includes(z))B(t,()=>give(z),`Give ${M.FREQ[K.mc.i].l} the code ${t.replace(/·/g,'dot ').replace(/−/g,'dash ').trim()}`)});
 if(m==='pic'&&cur()<25&&!ones.every(i=>K.px.g[i])){const i=cur();B('Black (1)',()=>pickPx(1),`Row ${Math.floor(i/5)+1} square ${i%5+1}: black, 1`);B('White (0)',()=>pickPx(0),`Row ${Math.floor(i/5)+1} square ${i%5+1}: white, 0`)}
 if(m==='vote'&&K.rp.i<5)[1,0].forEach(v=>B(String(v),()=>pickBit(v),`Place ${K.rp.i+1} of the fixed message: ${v}`))}
const ones=[...Array(25).keys()].filter(need);
const steps=[
{h:'Send SOS',p:M.TXT[0],task:'Send S O S with the gaps',
 show:()=>demo(0,M.SOS.map(s=>[300,()=>key(s)])),go:()=>begin(0,()=>K.so.i>=M.SOS.length)},
{h:'Gaps are part of the code',p:M.TXT[1],predict:{q:'Can ···− with no gaps be read only one way?',opts:['Yes, it can only be V','No, it could be several different letters'],ans:1},task:'Find 4 ways to read the signal',
 show:()=>demo(1,[[400,()=>gap(2)],[400,()=>gap(1)],[400,()=>gap(0)]]),go:()=>begin(1,()=>K.gp.found.length>=4)},
{h:'Short codes for busy letters',p:M.TXT[2],predict:{q:'Which letters should get the shortest codes?',opts:['The first letters of the alphabet','The letters we use most'],ans:1},task:'Give all 4 letters a code',
 show:()=>demo(2,[1,3,2,0].map(z=>[450,()=>give(z)])),go:()=>begin(2,()=>K.mc.i>=M.FREQ.length)},
{h:'A picture made of numbers',p:M.TXT[3],predict:{q:'A row of code says 10001. Which squares are black?',opts:['The middle three','The two end squares'],ans:1},task:'Paint every 1 black',
 show:()=>demo(3,ones.map(i=>[300,()=>paint(i)])),go:()=>begin(3,()=>ones.every(i=>K.px.g[i]))},
{h:'Beat the noise',p:M.TXT[4],predict:{q:'Noise flipped one beep in each copy. Can you still get the true message?',opts:['No, the message is lost','Yes, by taking what most copies say'],ans:1},task:'Fix all 5 places',
 show:()=>demo(4,M.TRUE.split('').map(b=>[420,()=>pickBit(+b)])),go:()=>begin(4,()=>K.rp.i>=5)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
function slip(t){let m='A code works when both people agree the patterns, the gaps and what to do about noise.';
 if(t==='gap')m='Without gaps, ···− could be V, S T, I A or E E E T. The gaps tell the receiver where each letter ends.';
 if(t==='alpha')m='Morse did not go in alphabet order. The most used letters, E and T, got the shortest codes, so messages are quicker.';
 if(t==='flip')m='Read each digit: 1 is black and 0 is white. 10001 is black, white, white, white, black.';
 if(t==='one')m='Any one copy could be the one hit by noise. Take what most copies say in each place.';
 if(t==='agree')m='A pattern only carries meaning if sender and receiver agreed the code first.';
 if(t==='count')m='Order matters: ··, ·−, −· and −− are all different, so there are 4. Each extra symbol doubles the count.';
 return m}
function quiz(){qk++;const Q=M.QS[qk%M.QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{qz.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=M.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Codes lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:tap});controls()}}).start()})})();
