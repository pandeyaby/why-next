/* Flagship – always, sometimes or never? testing a maths claim (ages 7-8; conjecture, example, counterexample, general
   reason, spotting a slip in a worked example): test 'odd + odd makes an even number' with pairs that fit it, find the
   counterexample that breaks three false claims, join cube towers to see why the left-over ones always pair up, tap the
   column where a worked sum went wrong, and sort claims into always, sometimes and never. Data and drawings: claim_art.js. */
(()=>{const K=CLAIM;
VIS.reg('flagclaim',c=>{let A,P,btns,quizBox,qi=-1,gen=0;const S={};c.fig.classList.add('young');
const mode=()=>['test','break','join','slip','asn','chal'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const isOdd=n=>n%2===1;
function paper(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f0f9ff';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. test the claim with examples that fit it ---------- */
let TILES=[];
function pickNum(n){const s=S.te;if(s.log.length>=3)return;
 if(!isOdd(n)){s.bad=n;A.sound.miss();return say(`${n} is even. The claim is about two odd numbers, so ${n} cannot test it. Pick an odd number.`,true)}
 s.bad=-1;if(s.first==null){s.first=n;A.sound.pop();return say(`First odd number: ${n}. Now tap a second odd number.`,false)}
 const a=s.first,b=n,key=[a,b].sort().join('+');s.first=null;
 if(s.keys.includes(key)){A.sound.miss();return say(`You tested ${a} + ${b} already. A new pair tells you more.`,true)}
 s.keys.push(key);s.log.push(`${a} + ${b} = ${a+b}: even ✓`);A.sound.pop();
 say(`${a} + ${b} = ${a+b}. That is even, so this example fits the claim.`+(s.log.length<3?' Test another pair.':''),false)}
function drawTest(){const s=S.te,y0=P.head(s.log.length<3?`Claim: odd + odd makes an even number. Test ${s.log.length+1} of 3: tap two odd numbers.`:K.DONE[0],s.log.length<3?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const gw=Math.min(A.W*.56,330),gap=8,tw=(gw-gap*2)/3,th=Math.min(tw,(A.H-y0-16-gap*2)/3);
 TILES=K.NUMS.map((n,i)=>({n,x:10+(i%3)*(tw+gap),y:y0+4+Math.floor(i/3)*(th+gap),w:tw,h:th}));
 TILES.forEach(r=>P.card(r,String(r.n),{n:26,no:s.bad===r.n,sel:s.first===r.n}));
 const lx=10+gw+14,lw=A.W-lx-10,g=A.ctx;g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='left';g.textBaseline='top';
 g.fillText('My tests:',lx,y0+6);s.log.forEach((t,i)=>{const r={x:lx,y:y0+32+i*(P.sz(15)*2.6),w:lw,h:P.sz(15)*2.2};P.card(r,t,{ok:1,n:14})})}
/* ---------- 2. one counterexample is enough ---------- */
let EXS=[];
function tryEx(k){const s=S.br,it=K.BREAK[s.i];if(!it)return;
 if(k!==it.k){if(!s.fits.includes(k))s.fits.push(k);A.sound.pop();return say(`${it.ex[k]} fits the claim, so it does not break it. Keep looking for one that does not fit.`,false)}
 A.sound.pop();s.i++;s.fits=[];say(`Yes: ${it.ex[k]} breaks it. That is a counterexample, so the claim is not always true.`+(s.i<K.BREAK.length?' Next claim.':''),false)}
function drawBreak(){const s=S.br,it=K.BREAK[s.i],y0=P.head(it?`Claim ${s.i+1} of 3: "${it.c}" Tap the example that breaks it.`:K.DONE[1],it?'':'ok',S.note,S.bad);
 if(!it){EXS=[];return}const gap=10,w=(A.W-20-gap)/2,h=Math.min(90,(A.H-y0-14-gap)/2);
 EXS=it.ex.map((t,k)=>({k,x:10+(k%2)*(w+gap),y:y0+6+Math.floor(k/2)*(h+gap),w,h}));EXS.forEach(r=>P.card(r,it.ex[r.k]+(s.fits.includes(r.k)?'  fits ✓':''),{n:20,dim:s.fits.includes(r.k)}))}
/* ---------- 3. why it always works: join the towers ---------- */
let TW=null,JB=null,VB=[];
function join(){const s=S.jo,it=K.JOIN[s.i];if(!it||s.joined)return;s.joined=true;s.drag=null;A.sound.pop();
 say(`Joined: ${it.a} + ${it.b} = ${it.a+it.b}. `+((it.a%2)+(it.b%2)===2?'The two left-over cubes now make a pair.':(it.a%2)+(it.b%2)===1?'One cube still has no partner.':'Every cube already had a partner.')+' Even or odd?',false)}
function verdict(z){const s=S.jo,it=K.JOIN[s.i];if(!it)return;if(!s.joined){A.sound.miss();return say('Join the towers first, then look for a cube with no partner.',true)}
 const want=(it.a+it.b)%2;if(z!==want){s.bad=z;A.sound.miss();return say(want?`Look again: one cube has no partner, so ${it.a+it.b} is odd.`:`Look again: every cube has a partner, so ${it.a+it.b} is even.`,true)}
 s.bad=-1;s.i++;s.joined=false;A.sound.pop();say((want?'Odd: even + odd always leaves one over.':it.a%2?'Even: the two left-over ones make a pair, every time.':'Even: pairs joined to pairs are still pairs.')+(s.i<K.JOIN.length?' Next towers.':''),false)}
function drawJoin(){const s=S.jo,it=K.JOIN[s.i],y0=P.head(it?`Towers ${s.i+1} of 3: ${it.a} + ${it.b}. Drag the right tower onto the left one.`:K.DONE[2],it?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 if(!it){TW=JB=null;VB=[];return}const vh=Math.min(60,A.H*.13),vy=A.H-vh-8,base=vy-12,u=Math.max(14,Math.min(40,(base-y0-10)/6.5));
 if(!s.joined){P.tower(A.W*.22,base,it.a,u,'#2563eb',1);const bx=s.drag?s.drag.x-u:A.W*.62,by=s.drag?s.drag.y+u*Math.ceil(it.b/2)/2:base;TW=P.tower(bx,by,it.b,u,'#db2777',1);
  JB={x:A.W/2-55,y:y0+6,w:110,h:Math.min(44,u*1.6)};P.card(JB,'Join',{n:15})}
 else{TW=null;JB=null;P.tower(A.W/2-u,base,it.a+it.b,u,'#7c3aed',1)}
 const gap=10,vw=(A.W-20-gap)/2;VB=['Even: none left over','Odd: one left over'].map((t,z)=>({z,x:10+z*(vw+gap),y:vy,w:vw,h:vh}));VB.forEach(r=>P.card(r,['Even: none left over','Odd: one left over'][r.z],{n:15,no:s.bad===r.z}))}
/* ---------- 4. spot the slip ---------- */
let COLR=[];
function col(k){const s=S.sl,it=K.SLIP[s.i];if(!it)return;if(k!==it.col){s.bad=k;A.sound.miss();return say(`The ${K.COLS[k]} column is right. Check the other columns, one at a time.`,true)}
 s.bad=-1;s.i++;A.sound.pop();say(`Found it: ${it.why} The answer is ${it.r}.`+(s.i<K.SLIP.length?' Next sum.':''),false)}
function drawSlip(){const s=S.sl,it=K.SLIP[s.i],y0=P.head(it?`Sum ${s.i+1} of 3: ${it.t} ${it.op} ${it.b} = ${it.w} is wrong. Tap the column with the slip.`:K.DONE[3],it?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 if(!it){COLR=[];return}const w=Math.min(A.W-20,380),h=Math.min(A.H-y0-14,230);COLR=P.sum({x:(A.W-w)/2,y:y0+4,w,h},it,{bad:s.bad})}
/* ---------- 5. always, sometimes or never ---------- */
let BX=[],CARD=null;
function place(z){const s=S.as,it=K.ASN[s.i];if(!it)return;s.drag=null;if(z!==it.z){s.bad=z;A.sound.miss();return say(`Not ${K.BINS[z].toLowerCase()}. ${it.why}`,true)}
 s.n[z]++;s.i++;s.bad=-1;A.sound.pop();say(`${K.BINS[z]}. ${it.why}`+(s.i<K.ASN.length?' Next claim.':''),false)}
function drawAsn(){const s=S.as,it=K.ASN[s.i],y0=P.head(it?`Claim ${s.i+1} of 6: always, sometimes or never true?`:K.DONE[4],it?(s.bad>=0?'no':''):'ok',S.note,S.bad);
 const gap=6,bw=(A.W-20-gap*2)/3,bh=Math.min(A.H*.26,120),by=A.H-bh-8;BX=K.BINS.map((l,z)=>({z,x:10+z*(bw+gap),y:by,w:bw,h:bh}));
 BX.forEach(r=>P.card(r,`${K.BINS[r.z]} (${s.n[r.z]})`,{n:16,no:s.bad===r.z}));
 if(it){const w=Math.min(A.W-50,340),h=Math.min(by-y0-24,96),d=s.drag;CARD={x:d?d.x-w/2:(A.W-w)/2,y:d?d.y-h/2:y0+6,w,h};P.card(CARD,it.t,{n:18,sel:!!d})}else CARD=null}
/* ---------- wiring ---------- */
function draw(){paper();const m=mode();if(m==='chal'){P.head('Challenge: always, sometimes or never?','ok');const u=Math.min(24,A.H/12);P.tower(A.W*.25,A.H*.85,5,u,'#2563eb',1);P.tower(A.W*.45,A.H*.85,7,u,'#db2777',1);P.tower(A.W*.68,A.H*.85,12,u,'#7c3aed',0);return}
 ({test:drawTest,break:drawBreak,join:drawJoin,slip:drawSlip,asn:drawAsn})[m]();A.fx.draw(A.ctx)}
function down(p){const m=mode();
 if(m==='test'){const r=TILES.find(r=>hit(p,r));if(r)pickNum(r.n);return false}
 if(m==='break'){const r=EXS.find(r=>hit(p,r));if(r)tryEx(r.k);return false}
 if(m==='join'){if(TW&&hit(p,TW)){S.jo.drag={x:p.x,y:p.y};return true}if(hit(p,JB)){join();return false}const r=VB.find(r=>hit(p,r));if(r)verdict(r.z);return false}
 if(m==='slip'){const r=COLR.find(r=>hit(p,r));if(r)col(r.k);return false}
 if(m==='asn'){if(CARD&&hit(p,CARD)){S.as.drag={x:p.x,y:p.y};return true}const r=BX.find(r=>hit(p,r));if(r)place(r.z);return false}return false}
function move(p){const m=mode(),d=m==='join'?S.jo.drag:m==='asn'?S.as.drag:null;if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const m=mode();
 if(m==='join'&&S.jo.drag){S.jo.drag=null;if(p.x<A.W*.5)join();else{A.redraw();say('Drag the right tower all the way onto the left one, or press Join.',false)}}
 if(m==='asn'&&S.as.drag){S.as.drag=null;const r=BX.find(r=>hit(p,r));if(r)place(r.z);else{A.redraw();say('Drop the claim in a box.',false)}}}
function reset(){gen++;for(const k in S)delete S[k];Object.assign(S,{te:{first:null,log:[],keys:[],bad:-1},br:{i:0,fits:[]},jo:{i:0,joined:false,bad:-1,drag:null},sl:{i:0,bad:-1},as:{i:0,n:[0,0,0],bad:-1,drag:null},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const ender=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};
function begin(i,ok){reset();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);S.check=ender(i,ok);buttons();A.redraw()}
function play(i,acts){steps[i].go();const e=gen;let t=0;acts.forEach(f=>{t+=380;setTimeout(()=>{if(e===gen)f()},t)})}
function buttons(){if(!btns)return;btns.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btns,t).onclick=f};
 if(m==='test'&&S.te.log.length<3)K.NUMS.forEach(n=>B(String(n),()=>pickNum(n),`Test with ${n}`));
 if(m==='break'){const it=K.BREAK[S.br.i];if(it)it.ex.forEach((t,k)=>B(t,()=>tryEx(k),`Test ${t} against the claim`))}
 if(m==='join'&&K.JOIN[S.jo.i]){B('Join',join,'Join the two towers');B('Even',()=>verdict(0),'The total is even: none left over');B('Odd',()=>verdict(1),'The total is odd: one left over')}
 if(m==='slip'&&K.SLIP[S.sl.i])K.COLS.forEach((l,k)=>B(l[0].toUpperCase()+l.slice(1),()=>col(k),`The slip is in the ${l} column`));
 if(m==='asn'&&K.ASN[S.as.i])K.BINS.forEach((b,z)=>B(b,()=>place(z),`"${K.ASN[S.as.i].t}": ${b}`))}
const steps=[
{h:'Test a claim',p:K.TXT[0],task:'Test the claim with 3 pairs of odd numbers',
 show:()=>play(0,[3,5,7,9,1,1].map(n=>()=>pickNum(n))),go:()=>begin(0,()=>S.te.log.length>=3)},
{h:'One counterexample',p:K.TXT[1],predict:{q:'Ali tested "adding three numbers gives an odd answer" with 1 + 1 + 1, 3 + 5 + 7 and 1 + 3 + 5. All were odd. Is it always true?',opts:['Yes: 3 examples worked','Not sure yet: keep testing'],ans:1},task:'Break all 3 claims',
 show:()=>play(1,K.BREAK.map(it=>()=>tryEx(it.k))),go:()=>begin(1,()=>S.br.i>=K.BREAK.length)},
{h:'Why it always works',p:K.TXT[2],predict:{q:'5 and 7 each have one cube left over. Join them: how many cubes are left over?',opts:['One, so 5 + 7 is odd','None: the two make a pair'],ans:1},task:'Join all 3 pairs of towers',
 show:()=>play(2,K.JOIN.flatMap(it=>[join,()=>verdict((it.a+it.b)%2)])),go:()=>begin(2,()=>S.jo.i>=K.JOIN.length)},
{h:'Spot the slip',p:K.TXT[3],task:'Find the slip in all 3 sums',
 show:()=>play(3,K.SLIP.map(it=>()=>col(it.col))),go:()=>begin(3,()=>S.sl.i>=K.SLIP.length)},
{h:'Always, sometimes, never',p:K.TXT[4],task:'Sort all 6 claims',
 show:()=>play(4,K.ASN.map(it=>()=>place(it.z))),go:()=>begin(4,()=>S.as.i>=K.ASN.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Test with examples that fit the claim, look for a counterexample, then find a reason that works for every number.';
 if(t==='examples')m='Examples that work are evidence, not proof. Some other number might break it, so look for a reason too.';
 if(t==='exception')m='One counterexample is enough. It is not "just an exception": it shows the claim is not always true.';
 if(t==='never')m='Never means no example works. Some examples do work here, so it is sometimes true.';
 if(t==='wrongcol')m='Check that column again: it is right. The slip is in a different column.';
 if(t==='check')m='Check it another way: take the bottom number from the answer. You do not get the top number back, so it is wrong.';
 if(t==='cond')m='The claim is about two odd numbers. A test needs two odd numbers, or it does not test the claim.';
 if(t==='myth')m='Big or small does not matter. Every odd number has one left over, and two left-over ones make a pair.';
 return m}
function ask(){qi++;const Q=K.QS[qi%K.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:X=>{quizBox.hidden=X.step!==5;btns.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=K.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Maths claim lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
