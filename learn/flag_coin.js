/* Flagship: Working with money (ages 7-8; NC Y2 money "recognise and use £ and p; combine amounts to make a value; find
   different combinations of coins that equal the same amount; giving change", Y3 "add and subtract amounts of money to give
   change, using both £ and p"). Pay exactly 47p from a coin tray; make 20p three different ways; count up on a number line
   for the change from £1; fill a bar model for a two-step total-then-change problem; give 37p change with the fewest coins.
   Not flagbudget (budgeting for teens) or flagnline (place on a number line). */
(()=>{
VIS.reg('flagcoin',c=>{let A,row,chal,cq=-1,era=0;const S={};
const INK='#0f172a',PALE='#f8fafc',YES='#15803d',KEY='#1d4ed8',NO='#b91c1c';
const COINS=[1,2,5,10,20,50,100,200],face=v=>v>=100?'£'+v/100:v+'p',money=p=>p>=100?'£'+(p/100).toFixed(2):p+'p';
const fill=v=>v<=2?'#fdba74':v<=50?'#e2e8f0':v===100?'#fcd34d':'#fde68a',rad=v=>({1:.7,2:.86,5:.66,10:.84,20:.74,50:.92,100:.82,200:.96})[v];
const JUMPS=[1,2,5,10,20],BARCARDS=['£2.25','£81.45','£1.53','£2.75','£7.25','£3.75'];
const BARWHY={'£81.45':'80p is £0.80, not £80. Write both in pounds: £1.45 + £0.80 = £2.25.','£1.53':'80p is 8 tens of pence, not 8p. £1.45 + £0.80 = £2.25.',
 '£7.25':'Change is what is left of the £5, so take the cost away: £5 − £2.25.','£3.75':'Count up from £2.25: 75p makes £3, then £2 makes £5. That is £2.75.'};
const stage=()=>['pay','ways','line','bar','few','chal'][A.step];
const sum=a=>a.reduce((s,v)=>s+v,0),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),pen=()=>A.col.dark?'#e2e8f0':INK,inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function chip(t,x,y,o={}){const g=A.ctx;let f=o.f||(A.narrow?15:18);do g.font=`700 ${f}px system-ui`;while(g.measureText(t).width>(o.w||A.W)-24&&--f>10);
 const w=Math.max(o.w||0,g.measureText(t).width+22),h=o.h||f*1.85,X=clamp(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||PALE;A.paint.rrect(X,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ring?3:1.4;g.strokeStyle=o.ring||'#94a3b8';g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y);return{x:X,y:y-h/2,w,h}}
function coin(v,x,y,r){const g=A.ctx,R=r*rad(v);g.fillStyle=fill(v);g.beginPath();if(v===20||v===50||v===100){const n=v===100?12:7;for(let k=0;k<n;k++){const a=k/n*Math.PI*2-Math.PI/2;g.lineTo(x+R*Math.cos(a),y+R*Math.sin(a))}g.closePath()}else g.arc(x,y,R,0,7);g.fill();
 g.strokeStyle='#475569';g.lineWidth=2;g.stroke();g.fillStyle=INK;g.font=`800 ${Math.max(12,R*.62)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(face(v),x,y+1)}
/* ---- coin tray and purse (steps 1, 2 and 5) ---- */
const tray=()=>{const n=A.narrow,cols=n?4:8,s=n?A.W/4:A.W/8.4,r=Math.min(s*(n?.38:.42),n?30:34);return COINS.map((v,i)=>({v,x:(n?s/2:A.W/2-3.5*s)+(i%cols)*s,y:A.H*(n?.68:.82)+Math.floor(i/cols)*(r*2.3),r}))};
const purse=()=>({x:A.W*.06,y:A.H*.2,w:A.W*.88,h:A.H*(A.narrow?.36:.42)});
const slots=()=>{const P=purse(),r=A.narrow?20:26,per=Math.max(1,Math.floor((P.w-r*.5)/(r*2.3)));return S.bag.map((v,i)=>({v,x:P.x+r*1.5+(i%per)*r*2.3,y:P.y+56+Math.floor(i/per)*r*2.2,r}))};
const goal=()=>({pay:47,ways:20,few:37})[stage()];
function drawPurse(){const P=purse(),t=sum(S.bag),G=goal(),g=A.ctx;g.fillStyle=A.alpha(A.col.dark?'#334155':'#fef3c7',.9);A.paint.rrect(P.x,P.y,P.w,P.h,16);g.fill();g.strokeStyle=t===G?YES:pen();g.lineWidth=t===G?4:2;g.stroke();
 chip(`In the purse: ${money(t)}`+(t>G?' (too much)':''),A.W/2,P.y+24,{f:A.narrow?14:16,ring:t===G?YES:t>G?NO:null});slots().forEach(q=>coin(q.v,q.x,q.y,q.r));tray().forEach(q=>coin(q.v,q.x,q.y,q.r));
 if(S.drag)coin(S.drag.v,S.drag.x,S.drag.y,30);const k=stage();
 chip(k==='pay'?'Pay exactly 47p':k==='few'?'Give 37p change with the fewest coins':`Make 20p: ${S.found.length} of 3 ways`,A.W/2,A.H*.07,{ring:KEY,f:A.narrow?14:17});
 if(k==='ways'&&!S.bag.length)S.found.forEach((w,i)=>chip('Way '+(i+1)+': '+w.map(face).join(' + '),A.W/2,P.y+60+i*32,{f:13,bg:'#dcfce7'}))}
function addCoin(v){if(S.bag.length>=(A.narrow?12:14))return report('The purse is full. Tap a coin in it to take it out.');S.bag.push(v);A.sound.tick();judgeBag()}
function dropCoin(i){const v=S.bag.splice(i,1)[0];A.sound.tick();report(`Took out ${face(v)}. Now ${money(sum(S.bag))}.`)}
function judgeBag(){const t=sum(S.bag),G=goal(),k=stage(),n=S.bag.length;
 if(t>G)return report(`${money(t)} is more than ${money(G)}. Tap a coin in the purse to take it out.`);
 if(t<G)return report(`${money(t)} so far. ${money(G-t)} more to go.`);
 if(k==='pay'){S.paid=true;return report(`Exactly 47p with ${n} coins. Count the biggest coins first: ${[...S.bag].sort((a,b)=>b-a).map(face).join(' + ')}.`)}
 if(k==='few'){if(n<=4){S.fewest=true;return report('37p with 4 coins: 20p + 10p + 5p + 2p. Start with the biggest coin that fits.')}return report(`That is 37p, but with ${n} coins. Can you use bigger coins? Try 4.`)}
 const key=[...S.bag].sort((a,b)=>b-a);if(S.found.some(w=>w.join()===key.join())){S.bag=[];return report('Same coins in a different order is the same way. Try other coins.')}
 S.found.push(key);S.bag=[];A.sound.pop();report(`Way ${S.found.length}: ${key.map(face).join(' + ')} = 20p.`+(S.found.length>2?' Different coins, same value.':' Purse emptied: find another way.'))}
/* ---- step 3: count up to £1 on a number line ---- */
const nl=()=>({x0:A.W*.07,x1:A.W*.93,y:A.H*.5}),xAt=p=>{const L=nl();return L.x0+(p-60)/40*(L.x1-L.x0)};
function drawLine(){const g=A.ctx,L=nl();g.strokeStyle=pen();g.lineWidth=3;g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();g.font=`600 ${A.narrow?11:13}px system-ui`;g.fillStyle=pen();g.textAlign='center';
 for(let p=60;p<=100;p+=5){const x=xAt(p);g.beginPath();g.moveTo(x,L.y-(p%10?6:12));g.lineTo(x,L.y+(p%10?6:12));g.stroke();if(p%10===0)g.fillText(p===100?'£1':p+'p',x,L.y+30)}
 let at=63;S.hops.forEach((h,i)=>{const a=xAt(at),b=xAt(at+h);g.strokeStyle=KEY;g.lineWidth=3;g.beginPath();g.moveTo(a,L.y);g.quadraticCurveTo((a+b)/2,L.y-60-(i%2)*18,b,L.y);g.stroke();chip('+'+h+'p',(a+b)/2,L.y-50-(i%2)*18,{f:12,bg:'#e0e7ff'});at+=h});
 g.fillStyle=NO;g.beginPath();g.arc(xAt(63),L.y,8,0,7);g.fill();chip('63p',xAt(63),L.y+56,{f:13,ring:NO});g.fillStyle=YES;g.beginPath();g.arc(xAt(S.at),L.y,9,0,7);g.fill();
 chip('Apple 63p. You pay £1. Count up to £1.',A.W/2,A.H*.08,{ring:KEY,f:A.narrow?13:16});chip(`Change so far: ${S.at-63}p`,A.W/2,A.H*.82,{ring:S.at===100?YES:null,f:A.narrow?15:18})}
function hop(h){if(S.at+h>100){A.sound.miss();return report(`+${h}p goes past £1 to ${S.at+h}p. Use a smaller jump.`)}S.hops.push(h);S.at+=h;A.sound.tick();
 if(S.at===100){S.counted=true;return report(`£1! The jumps add to ${S.hops.join(' + ')} = 37p. Change from £1 for 63p is 37p.`)}report(`Now at ${S.at}p.`+(S.at%10?' Jump to the next ten first.':' Now jump in tens.'))}
/* ---- step 4: a bar model, total then change ---- */
const cards=()=>{const n=A.narrow,w=n?A.W*.29:A.W*.14,h=Math.max(48,A.H*.1);return BARCARDS.map((t,i)=>n?{x:A.W*.04+(i%3)*(w+A.W*.03),y:A.H*.7+Math.floor(i/3)*(h+8),w,h}:{x:A.W*.04+i*(w+A.W*.02),y:A.H*.84,w,h})};
function drawBar(){const n=A.narrow,x0=A.W*.06,W=A.W*.88,h=Math.max(44,A.H*.09);chip('Comic £1.45, stickers 80p. Pay with £5. Change?',A.W/2,A.H*.06,{ring:KEY,f:n?12:16});
 const tot=S.bar[0]?'£2.25':'?',chg=S.bar[1]?'£2.75':'?',y1=A.H*.18,y2=A.H*(n?.46:.5),w1=W*.3,w2=W*.2;
 chip('£1.45',x0+w1/2,y1+h/2,{w:w1,h,bg:'#e0e7ff'});chip('80p',x0+w1+w2/2,y1+h/2,{w:w2,h,bg:'#e0e7ff'});chip('cost: '+tot,x0+w1+w2+(W-w1-w2)/2,y1+h/2,{f:n?13:16,w:W-w1-w2-6,h,ring:S.bar[0]?YES:KEY});
 chip('£5 note',x0+W/2,y2-h*.6,{w:W,h:h*.8,f:14});chip(tot,x0+(w1+w2)/2,y2+h/2,{w:w1+w2,h,bg:'#e0e7ff'});chip('change: '+chg,x0+w1+w2+(W-w1-w2)/2,y2+h/2,{w:W-w1-w2,h,ring:S.bar[1]?YES:S.bar[0]?KEY:null});
 if(S.bar[1])return;cards().forEach((r,i)=>chip(BARCARDS[i],r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,bg:S.wrong===i?'#fee2e2':PALE,ring:S.wrong===i?NO:null}))}
function placeCard(i){const t=BARCARDS[i],slot=S.bar[0]?1:0;if(S.bar[1])return;
 if(slot===0&&t==='£2.25'){S.bar[0]=true;S.wrong=null;A.sound.pop();return report('Cost: £1.45 + £0.80 = £2.25. That is the total, not the answer yet. Now find the change.')}
 if(slot===1&&t==='£2.75'){S.bar[1]=true;S.wrong=null;A.sound.pop();return report('Change: £5 − £2.25 = £2.75. Check: £2.25 + £2.75 = £5.')}
 S.wrong=i;A.sound.miss();report(slot===0&&t==='£2.75'?'£2.75 is the change. The first box is the total cost: add the two prices.':slot===1&&t==='£2.25'?'£2.25 is what you spend. The change is the rest of the £5.':BARWHY[t]||'Look at the box with the ? and what it stands for.')}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.05:.4);g.fillRect(0,0,A.W,A.H);const k=stage();
 if(k==='chal'){chip('Challenge',A.W/2,A.H*.13,{ring:KEY});const Q=CQ[cq%CQ.length];if(Q)chip(Q.pic,A.W/2,A.H*.5,{f:A.narrow?18:22});return}
 if(k==='line')return drawLine();if(k==='bar')return drawBar();drawPurse()}
function wipe(){era++;for(const k in S)delete S[k];Object.assign(S,{bag:[],found:[],paid:false,fewest:false,at:63,hops:[],counted:false,bar:[false,false],wrong:null,drag:null,check:()=>{}})}
function report(t){say(t);A.redraw();buttons();S.check()}
const doneIf=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,line,ok,msg){wipe();say(line);buttons();S.check=doneIf(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const me=era;acts.forEach((f,j)=>setTimeout(()=>{if(me===era)f()},A.reduced()?25*(j+1):(ms||300)*(j+1)))}
function buttons(){if(!row)return;row.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='pay'||k==='ways'||k==='few'){COINS.forEach(v=>B('+ '+face(v),()=>addCoin(v),'Put a '+face(v)+' coin in the purse'));if(S.bag.length)B('Take one out',()=>dropCoin(S.bag.length-1),'Take the last coin out of the purse')}
 if(k==='line'&&!S.counted){JUMPS.forEach(h=>B('+'+h+'p',()=>hop(h),`Jump on ${h} pence`));if(S.hops.length)B('Undo',()=>{S.at-=S.hops.pop();report(`Back to ${S.at}p.`)},'Undo the last jump')}
 if(k==='bar'&&!S.bar[1])BARCARDS.forEach((t,i)=>B(t,()=>placeCard(i),`Put ${t} in the ${S.bar[0]?'change':'cost'} box`))}
function down(p){const k=stage();
 if(k==='pay'||k==='ways'||k==='few'){const i=slots().findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<q.r);if(i>=0){dropCoin(i);return false}
  const t=tray().find(q=>Math.hypot(q.x-p.x,q.y-p.y)<q.r+4);if(t){S.drag={v:t.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(k==='line'){const L=nl();if(Math.abs(p.y-L.y)<60){const want=Math.round(60+(p.x-L.x0)/(L.x1-L.x0)*40)-S.at,h=JUMPS.filter(j=>j<=want).pop();if(h)hop(h);else report('Tap further along the line, to the right of the green dot.')}}
 if(k==='bar'){const i=cards().findIndex(r=>inside(p,r));if(i>=0)placeCard(i)}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(inside({x:d.x,y:d.y},purse())||Math.hypot(d.x-d.x0,d.y-d.y0)<8)addCoin(d.v);else A.redraw()}
const steps=[
{h:'Pay exactly',p:'The toy costs 47p. Drag coins into the purse, or tap them. Tap a coin in the purse to take it out.',
 predict:{q:'Ben has 6 coins. Sam has 2 coins. Who has more money?',opts:['Ben: he has more coins','add up the values to find out','they have the same'],ans:1},task:'Pay exactly 47p',
 show:()=>demo(0,[()=>addCoin(20),()=>addCoin(20),()=>addCoin(5),()=>addCoin(2)]),
 go:()=>begin(0,'An empty purse and a tray of coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2.',()=>S.paid,'The value of the coins counts, not how many there are.')},
{h:'Same money, new coins',p:'Make 20p. Then make it again with different coins. Find 3 ways.',task:'Find 3 ways to make 20p',
 show:()=>demo(1,[()=>addCoin(20),()=>addCoin(10),()=>addCoin(10),()=>addCoin(10),()=>addCoin(5),()=>addCoin(5)]),
 go:()=>begin(1,'An empty purse. Make 20p three different ways.',()=>S.found.length>2,'Many sets of coins can make the same amount.')},
{h:'Count up for change',p:'An apple costs 63p. You pay with £1. Count up from 63p to £1 with jumps: to the next ten first, then tens.',
 predict:{q:'Change from £1 for 63p is…',opts:['47p','37p','63p'],ans:1},task:'Count up to £1',
 show:()=>demo(2,[()=>hop(5),()=>hop(2),()=>hop(10),()=>hop(20)],400),
 go:()=>begin(2,'A number line from 60p to £1, with a dot at 63p.',()=>S.counted,'Count up from the price to what you paid: that is the change.')},
{h:'Total, then change',p:'Two things, one note. Fill the ? boxes in the bar model: first the cost, then the change. Tap a card.',
 predict:{q:'To find the change, first you…',opts:['take 80p from £5','add the two prices','add £5 and £1.45'],ans:1},task:'Fill both boxes',
 show:()=>demo(3,[()=>placeCard(0),()=>placeCard(3)],600),
 go:()=>begin(3,'A bar model: £1.45 and 80p make the cost. The £5 bar splits into the cost and the change.',()=>S.bar[1],'Two steps: add for the total, take away for the change.')},
{h:'Fewest coins',p:'Give 37p change using as few coins as you can. Start with the biggest coin that fits.',task:'Give 37p with 4 coins',
 show:()=>demo(4,[()=>addCoin(20),()=>addCoin(10),()=>addCoin(5),()=>addCoin(2)]),
 go:()=>begin(4,'An empty purse. Give 37p change with the fewest coins.',()=>S.fewest,'Biggest coin that fits, again and again: 20p, 10p, 5p, 2p.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const CQ=[
 {pic:'5 × 1p   or   10p',q:'Which is more money: five 1p coins or one 10p coin?',ans:'one 10p coin',bad:[['five 1p coins','count'],['they are the same','same']]},
 {pic:'£1 = ? p',q:'How many pence make £1?',ans:'100p',bad:[['10p','ten'],['1p','one']]},
 {pic:'£1 − 63p',q:'You pay £1 for a 63p apple. What is your change?',ans:'37p',bad:[['47p','borrow'],['163p','add']]},
 {pic:'£1.45 + 80p',q:'What is the total cost of £1.45 and 80p?',ans:'£2.25',bad:[['£81.45','units'],['£1.53','eight']]},
 {pic:'cost £2.25   paid £5',q:'You spend £2.25 and pay with £5. What is the change?',ans:'£2.75',bad:[['£7.25','plus'],['£3.75','slip']]},
 {pic:'37p change',q:'Which gives 37p with the fewest coins?',ans:'20p, 10p, 5p, 2p',bad:[['10p, 10p, 10p, 5p, 2p','big'],['37 1p coins','ones']]}];
function why(t){let m='Count the value of each coin, and check what the question asks for.';
 if(t==='count')m='More coins is not more money. Five 1p coins make 5p. One 10p coin is worth 10p.';
 if(t==='same')m='Count the value: 5 × 1p = 5p, and 10p is double that.';
 if(t==='ten')m='10p is only one coin. You need ten 10p coins, which is 100p, to make £1.';
 if(t==='one')m='£1 is a hundred pennies: 100p.';
 if(t==='borrow')m='Count up from 63p: 7p to 70p, then 30p to £1. 7 + 30 = 37p.';
 if(t==='add')m='Change is what you get back, so it is less than £1. Take 63p from 100p.';
 if(t==='units')m='80p is £0.80, not £80. £1.45 + £0.80 = £2.25.';
 if(t==='eight')m='80p means 8 tens of pence. Add 80, not 8: 145p + 80p = 225p = £2.25.';
 if(t==='plus')m='Change is less than what you paid, so take away: £5 − £2.25 = £2.75.';
 if(t==='slip')m='Count up from £2.25: 75p gets to £3, then £2 gets to £5. £2.75.';
 if(t==='big')m='Two 10p coins can be one 20p. 20p + 10p + 5p + 2p is only 4 coins.';
 if(t==='ones')m='37 coins is the most, not the fewest. Use the biggest coin that fits first.';
 return m}
function quiz(){cq++;const Q=CQ[cq%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=cq%3,ord=o.slice(r).concat(o.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},box,v).onclick=()=>check(t,Q.ans)});say('Challenge: '+Q.q);A.redraw()}
function check(t,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();say(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:Q=>{chal.hidden=Q.step!==5;row.hidden=Q.step===5;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Money controls'},w);chal=c.el('div',{class:'fl-chal'},Q.below);wipe();A.gest({down,move,up});buttons()}});
A.start()})})();
