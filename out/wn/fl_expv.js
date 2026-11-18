/* Flagship – expected value (ages 16–18; A level Mathematics discrete random variables, CCSS S-MD.2 "calculate the expected
   value of a random variable; interpret it as the mean of the probability distribution"). Balance a probability beam at
   E(X), build E(X) = Σ x·P(X = x) row by row, watch the running mean of 1000 plays settle on E(X), find the fair stake
   for three games and predict E(aX + b). Every canvas action has a button too. */
(()=>{
 const BEAMS=[{name:'Prize game',xs:[0,10],ps:[.9,.1]},{name:'Fair dice',xs:[1,2,3,4,5,6],ps:[1/6,1/6,1/6,1/6,1/6,1/6]},{name:'Points card',xs:[1,2,5],ps:[.5,.3,.2]}];
 const EV=d=>d.xs.reduce((t,x,i)=>t+x*d.ps[i],0);
 const RAFFLE={xs:[-2,3,18],ps:[.7,.2,.1],lab:['lose the £2 ticket','win £5 (gain £3)','win £20 (gain £18)']};
 const GAMES=[{t:'Win £5 with probability 0.1',w:5,p:.1,fair:.5},{t:'Win £6 if a dice shows six',w:6,p:1/6,fair:1},{t:'Win £3 if a dice shows 5 or 6',w:3,p:1/3,fair:1}];
 const LIN=[['E(X) = 3.5 for a dice. Add 10 to every score: E(X + 10)?','13.5',['3.5','35']],['Double every score: E(2X)?','7',['3.5','12']],['Double, then add 1: E(2X + 1)?','8',['7','4.5']]];
 const r2=v=>Math.round(v*100)/100,money=v=>(v<0?'−£':'£')+Math.abs(v).toFixed(2);
 VIS.reg('flagexpv',c=>{let A,pad,chal;
 const S={then:()=>{}};
 const stage=()=>['beam','table','run','fair','lin','chal'][A.step];
 const INK='#1e293b',SOFT='#475569',LINE='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',SUN='#fef3c7',BAR='#1d4ed8',VIO='#6d28d9',LAV='#ede9fe',AMB='#b45309';
 const q=n=>Math.round(n*(A.narrow?1.05:1.2));
 function put(g,s,x,y,n,col,al){g.font=`700 ${q(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function brk(g,s,max,n){g.font=`700 ${q(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function strip(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};card(g,r,SUN,AMB,2);const L=brk(g,s,r.w-16,13);L.forEach((l,i)=>put(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*q(17),13,col))}
 function result(g){if(!S.msg)return;const L=brk(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,12),lh=q(12)+5,h=L.length*lh+10,y=A.H-h-6;card(g,{x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>put(g,l,A.W/2,y+5+lh*(i+.5),12))}
 const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();speak(s);A.redraw()};
 const hitOk=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 // ---- 1. probability beam: drag the pivot to the balance point
 const axis=()=>({x0:A.W*.1,x1:A.W*.9,y:A.H*.55});
 const px=(x,d)=>{const X=axis(),lo=Math.min(...d.xs,0),hi=Math.max(...d.xs);return X.x0+(x-lo)/(hi-lo)*(X.x1-X.x0)};
 const valAt=(sx,d)=>{const X=axis(),lo=Math.min(...d.xs,0),hi=Math.max(...d.xs);return Math.max(lo,Math.min(hi,Math.round((lo+(sx-X.x0)/(X.x1-X.x0)*(hi-lo))*10)/10))};
 function drawBeam(g){const d=BEAMS[S.bi];if(!d){strip(g,'E(X) is the balance point of the distribution, not the middle value.',OK);S.bal.forEach((t,i)=>put(g,t,A.W/2,A.H*.3+i*q(22),13,OK));return}
 strip(g,`${d.name}: slide the pivot until the beam balances.`);const X=axis(),m=Σtilt(d),tilt=Math.max(-.12,Math.min(.12,m*.03));
 g.save();g.translate(px(S.f,d),X.y);g.rotate(tilt);g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(X.x0-px(S.f,d),0);g.lineTo(X.x1-px(S.f,d),0);g.stroke();
 d.xs.forEach((x,i)=>{const bx=px(x,d)-px(S.f,d),h=d.ps[i]*A.H*.42/Math.max(...d.ps)*.8,w=Math.max(8,Math.min(26,(X.x1-X.x0)/(d.xs.length*2.4)));g.fillStyle=BAR;g.fillRect(bx-w/2,-h,w,h);
  put(g,d.ps[i]===1/6?'1/6':d.ps[i],bx,-h-q(9),A.narrow?9:10,INK)});g.restore();
 d.xs.forEach(x=>put(g,x,px(x,d),X.y+q(30),11,SOFT));
 const fx=px(S.f,d);g.fillStyle=VIO;g.beginPath();g.moveTo(fx,X.y+3);g.lineTo(fx-q(11),X.y+q(20));g.lineTo(fx+q(11),X.y+q(20));g.closePath();g.fill();put(g,`pivot ${S.f}`,fx,X.y+q(46),12,VIO)}
 function Σtilt(d){return d.xs.reduce((t,x,i)=>t+d.ps[i]*(x-S.f),0)}
 function nudge(dx){const d=BEAMS[S.bi];if(!d)return;const lo=Math.min(...d.xs,0),hi=Math.max(...d.xs);S.f=Math.round(Math.max(lo,Math.min(hi,S.f+dx))*10)/10;S.msg='';A.sound.tick();refresh()}
 function settle(){const d=BEAMS[S.bi];if(!d)return;const e=r2(EV(d)),f=S.f;
 if(Math.abs(f-e)<.051){hitOk(`Balanced at ${e}. ${d.xs.map((x,i)=>`${x}×${d.ps[i]===1/6?'1/6':d.ps[i]}`).join(' + ')} = ${e}.`);S.bal.push(`${d.name}: E(X) = ${e}`);S.bi++;S.f=0;return refresh()}
 const mid=(Math.min(...d.xs)+Math.max(...d.xs))/2,mode=d.xs[d.ps.indexOf(Math.max(...d.ps))];
 if(Math.abs(f-mid)<.051&&Math.abs(mid-e)>.05)return miss(`${mid} is the middle of the values, but they are not equally likely. Each value pulls with its probability.`);
 if(Math.abs(f-mode)<.051&&d.ps.some(p=>p!==d.ps[0]))return miss(`${mode} is the most likely value (the mode), not the mean. The rarer values still pull the beam.`);
 miss(`The beam tips ${f<e?'right':'left'}: move the pivot ${f<e?'right':'left'}.`)}
 // ---- 2. table: x · P(X = x), then add
 const rowR=i=>({x:10,y:A.H*.2+i*q(42),w:A.W-20,h:q(36)});
 function drawTable(g){strip(g,S.sum==null?'£2 raffle ticket. X = your gain. Tap each row to work out x × P(X = x).':`E(X) = ${money(S.sum)} per ticket.`,S.sum==null?INK:OK);
 RAFFLE.xs.forEach((x,i)=>{const r=rowR(i),done=S.rows.includes(i);card(g,r,done?'#dcfce7':CARD,done?OK:LINE,2);
  put(g,`${RAFFLE.lab[i]}`,r.x+8,r.y+r.h*.3,A.narrow?9:11,SOFT,'left');put(g,`x = ${x}   P = ${RAFFLE.ps[i]}`,r.x+8,r.y+r.h*.72,12,INK,'left');
  put(g,done?`x·P = ${r2(x*RAFFLE.ps[i])}`:'tap',r.x+r.w-8,r.y+r.h/2,13,done?OK:SOFT,'right')});
 const y=rowR(3).y+q(10);put(g,S.sum==null?`Σ so far: ${r2(S.rows.reduce((t,i)=>t+RAFFLE.xs[i]*RAFFLE.ps[i],0))}`:`Σ x·P = −1.4 + 0.6 + 1.8 = ${S.sum}`,A.W/2,y,13,S.sum==null?INK:OK)}
 function doRow(i){if(S.sum!=null)return;if(S.rows.includes(i))return miss('That row is in already. Each value counts once.');S.rows.push(i);S.msg='';A.sound.tick();refresh()}
 function addUp(){if(S.sum!=null)return;if(S.rows.length<3)return miss('Every value goes into E(X), even the unlikely £18. Finish all three rows first.');S.sum=r2(EV(RAFFLE));hitOk('E(X) = 1. On average you gain £1 per ticket, though no single ticket gains exactly £1.');refresh()}
 function plainMean(){if(S.sum!=null)return;miss('(−2 + 3 + 18) ÷ 3 = 6.33 treats the three outcomes as equally likely. Losing has probability 0.7, so weight by P.')}
 // ---- 3. long run: running mean of a fair dice (seeded)
 let seed=22;const rnd=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
 const plotR=()=>({x:A.W*.12,y:A.H*.22,w:A.W*.82,h:A.H*.4});
 function drawRun(g){const P=plotR(),n=S.n;strip(g,n<1000?'Roll a fair dice many times. Watch the running mean.':'After 1000 rolls the mean sits close to E(X) = 3.5.',n<1000?INK:OK);
 g.strokeStyle=LINE;g.lineWidth=2;g.beginPath();g.moveTo(P.x,P.y);g.lineTo(P.x,P.y+P.h);g.lineTo(P.x+P.w,P.y+P.h);g.stroke();
 const yv=v=>P.y+P.h-(v-1)/5*P.h,xv=k=>P.x+Math.log10(k)/3*P.w;[1,2,3,4,5,6].forEach(v=>put(g,v,P.x-6,yv(v),10,SOFT,'right'));
 [1,10,100,1000].forEach(k=>put(g,k,xv(k),P.y+P.h+q(12),10,SOFT));put(g,'rolls (log scale)',P.x+P.w/2,P.y+P.h+q(26),10,SOFT);
 g.setLineDash([6,5]);g.strokeStyle=OK;g.beginPath();g.moveTo(P.x,yv(3.5));g.lineTo(P.x+P.w,yv(3.5));g.stroke();g.setLineDash([]);put(g,'E(X) = 3.5',P.x+P.w,yv(3.5)-q(10),10,OK,'right');
 if(S.path.length){g.strokeStyle=VIO;g.lineWidth=2.5;g.beginPath();S.path.forEach(([k,v],i)=>{const x=xv(k),y=yv(v);i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke()}
 put(g,n?`${n} rolls · last roll ${S.last} · mean ${r2(S.tot/n)}`:'No rolls yet',A.W/2,P.y+P.h+q(44),12,INK)}
 function roll(k){if(S.n>=1000)return;const m=Math.min(k,1000-S.n);for(let j=0;j<m;j++){const v=1+Math.floor(rnd()*6);S.tot+=v;S.n++;S.last=v;S.path.push([S.n,S.tot/S.n])}A.sound.tick();
 if(S.n>=1000)hitOk(`Mean of 1000 rolls: ${r2(S.tot/S.n)}. No roll ever shows 3.5, but the long-run mean gets close to it.`);else S.msg='';refresh()}
 // ---- 4. fair stake: E(gain) = w·p − stake = 0
 const sliderR=()=>({x:A.W*.1,y:A.H*.58,w:A.W*.8});
 function drawFair(g){const G=GAMES[S.gi];if(!G){strip(g,'A game is fair when the expected gain is 0: stake = E(prize).',OK);S.fairs.forEach((t,i)=>put(g,t,A.W/2,A.H*.3+i*q(22),12,OK));return}
 strip(g,`${G.t}. Set the stake so the game is fair.`);const e=r2(G.w*G.p-S.s);
 put(g,`E(gain) = ${G.w} × ${G.p===1/6?'1/6':G.p===1/3?'1/3':G.p} − ${S.s.toFixed(2)} = ${e>0?'+':''}${money(e)}`,A.W/2,A.H*.3,A.narrow?12:14,e===0?OK:e<0?NO:INK);
 put(g,e<0?'Players lose on average':e>0?'Players win on average':'Fair: nobody gains on average',A.W/2,A.H*.42,12,SOFT);
 const R=sliderR();g.strokeStyle=LINE;g.lineWidth=4;g.beginPath();g.moveTo(R.x,R.y);g.lineTo(R.x+R.w,R.y);g.stroke();
 for(let v=0;v<=2;v+=.5)put(g,'£'+v.toFixed(2),R.x+v/2*R.w,R.y+q(20),10,SOFT);const kx=R.x+S.s/2*R.w;g.fillStyle=VIO;g.beginPath();g.arc(kx,R.y,q(11),0,7);g.fill();put(g,'stake',kx,R.y-q(18),11,VIO)}
 function setStake(v){S.s=Math.round(Math.max(0,Math.min(2,v))*10)/10;S.msg='';refresh()}
 function lockStake(){const G=GAMES[S.gi];if(!G)return;const e=r2(G.w*G.p-S.s);
 if(e===0){hitOk(`Fair stake ${money(G.fair)}: ${G.w} × ${G.p===1/6?'1/6':G.p===1/3?'1/3':G.p} = ${money(G.fair)}.`);S.fairs.push(`${G.t}: fair stake ${money(G.fair)}`);S.gi++;S.s=1;return refresh()}
 if(S.s===0)return miss('A free game with a prize is not fair: the player gains on average. The stake must equal the expected prize.');
 if(S.s>=1.5)return miss(`Paying ${money(S.s)} for a £${G.w} prize ignores how rarely you win. Multiply the prize by its probability.`);
 miss(e<0?`At ${money(S.s)} the expected gain is ${money(e)}: players lose on average. Lower the stake.`:`At ${money(S.s)} the expected gain is +${money(e)}: the player is ahead on average. Raise the stake.`)}
 // ---- 5. E(aX + b)
 const optR=i=>{const w=(A.W-20-12)/3;return{x:10+i*(w+6),y:A.H*.5,w,h:q(40)}};
 const linOpts=()=>{const L=LIN[S.li];if(!L)return[];const all=[L[1],...L[2]],k=S.li%3;return all.slice(k).concat(all.slice(0,k))};
 function drawLin(g){const L=LIN[S.li];if(!L){strip(g,'E(aX + b) = a·E(X) + b: scale and shift the mean the same way.',OK);S.lins.forEach((t,i)=>put(g,t,A.W/2,A.H*.3+i*q(22),13,OK));return}
 strip(g,'E(X) = 3.5 for one roll of a fair dice.');brk(g,L[0],A.W-30,13).forEach((l,i)=>put(g,l,A.W/2,A.H*.28+i*q(18),13));
 linOpts().forEach((o,i)=>{const r=optR(i);card(g,r,LAV,VIO,2.5);put(g,o,r.x+r.w/2,r.y+r.h/2,15)})}
 function pickLin(o){const L=LIN[S.li];if(!L)return;
 if(o===L[1]){hitOk(S.li===0?'Every value moves up 10, so the mean does: 3.5 + 10 = 13.5.':S.li===1?'Every value doubles, so the mean doubles: 2 × 3.5 = 7.':'2 × 3.5 + 1 = 8: scale first, then shift.');S.lins.push(L[0].replace(/^.*?(E\([^)]*\)\?)$/,'$1').replace('?','')+' = '+L[1]);S.li++;return refresh()}
 if(o==='3.5')return miss('Changing every value changes the mean too. Apply the same change to E(X).');
 if(o==='35')return miss('Adding 10 shifts each score by 10; it does not multiply. 3.5 + 10 = 13.5.');
 if(o==='12')return miss('2 × 6 = 12 is the top score doubled, not the mean. Double the mean: 7.');
 if(o==='7')return miss('That doubled the mean but forgot the + 1: 2 × 3.5 + 1 = 8.');
 miss('3.5 + 1 = 4.5 forgot to double. E(2X + 1) = 2 × 3.5 + 1 = 8.')}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=stage();if(v==='beam')drawBeam(g);if(v==='table')drawTable(g);if(v==='run')drawRun(g);if(v==='fair')drawFair(g);if(v==='lin')drawLin(g);
 if(v==='chal'){strip(g,'E(X) = Σ x·P(X = x): the long-run mean, not a promised outcome.');['Balance point of the distribution','Weight each value by its probability','Fair game: E(gain) = 0','E(aX + b) = a·E(X) + b'].forEach((t,i)=>put(g,t,A.W/2,A.H*.3+i*q(24),13,INK))}
 result(g);A.fx.draw(g)}
 function refresh(){const v=stage();let s='Challenge.';
 if(v==='beam')s=BEAMS[S.bi]?`${BEAMS[S.bi].name}. Values ${BEAMS[S.bi].xs.join(', ')}. Pivot at ${S.f}. The beam tips ${Σtilt(BEAMS[S.bi])>0.05?'right':Σtilt(BEAMS[S.bi])<-0.05?'left':'very little'}.`:'All three beams balanced.';
 if(v==='table')s=S.sum==null?`Rows done: ${S.rows.length} of 3.`:`E(X) = ${S.sum}.`;
 if(v==='run')s=S.n?`${S.n} rolls, running mean ${r2(S.tot/S.n)}.`:'No rolls yet.';
 if(v==='fair')s=GAMES[S.gi]?`${GAMES[S.gi].t}. Stake ${money(S.s)}. Expected gain ${money(r2(GAMES[S.gi].w*GAMES[S.gi].p-S.s))}.`:'All three games made fair.';
 if(v==='lin')s=LIN[S.li]?LIN[S.li][0]:'All three answered.';
 speak((S.msg?S.msg+' ':'')+s);btns();S.then()}
 function btns(){if(!pad)return;pad.innerHTML='';const v=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(v==='beam'&&BEAMS[S.bi]){b('◀ 1',()=>nudge(-1),'Move the pivot left by 1');b('◀ 0.1',()=>nudge(-.1),'Move the pivot left by 0.1');b('0.1 ▶',()=>nudge(.1),'Move the pivot right by 0.1');b('1 ▶',()=>nudge(1),'Move the pivot right by 1');b('Balance here',settle,'Check the balance at this pivot')}
 if(v==='table'&&S.sum==null){RAFFLE.xs.forEach((x,i)=>{if(!S.rows.includes(i))b(`Row x = ${x}`,()=>doRow(i),`Work out x times P for x = ${x}`)});b('Add the products',addUp);b('Average the x values',plainMean)}
 if(v==='run'&&S.n<1000){b('Roll 1',()=>roll(1));b('Roll 10',()=>roll(10));b('Roll 100',()=>roll(100));b('Roll to 1000',()=>roll(1000))}
 if(v==='fair'&&GAMES[S.gi]){b('Stake −10p',()=>setStake(S.s-.1),'Lower the stake by 10 pence');b('Stake +10p',()=>setStake(S.s+.1),'Raise the stake by 10 pence');b('Lock in stake',lockStake)}
 if(v==='lin'&&LIN[S.li])linOpts().forEach(o=>b(o,()=>pickLin(o),`Answer ${o}`));A.redraw()}
 function down(p){const v=stage();
 if(v==='beam'){const d=BEAMS[S.bi];if(!d||Math.abs(p.y-axis().y)>q(70))return false;S.grab=true;S.f=valAt(p.x,d);refresh();return true}
 if(v==='table'){const i=[0,1,2].find(i=>on(p,rowR(i)));if(i!=null){doRow(i);return true}return false}
 if(v==='run'){if(on(p,plotR())){roll(10);return true}return false}
 if(v==='fair'){const R=sliderR();if(!GAMES[S.gi]||Math.abs(p.y-R.y)>q(30))return false;S.grab=true;setStake((p.x-R.x)/R.w*2);return true}
 if(v==='lin'){const o=linOpts(),i=o.findIndex((_,i)=>on(p,optR(i)));if(i>=0){pickLin(o[i]);return true}return false}return false}
 function move(p){if(!S.grab)return;const v=stage();if(v==='beam'&&BEAMS[S.bi]){S.f=valAt(p.x,BEAMS[S.bi]);refresh()}if(v==='fair'){const R=sliderR();setStake((p.x-R.x)/R.w*2)}}
 function up(){if(!S.grab)return;S.grab=false;const v=stage();if(v==='beam')settle();if(v==='fair')lockStake()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const seq=(fs,gap)=>{const id=++S.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*(A.reduced()?30:gap)))};
 const clear=()=>{S.run=(S.run||0)+1;seed=22;Object.assign(S,{then:()=>{},bi:0,f:0,bal:[],rows:[],sum:null,n:0,tot:0,last:0,path:[],gi:0,s:1,fairs:[],li:0,lins:[],grab:false,msg:'',bad:false})};
 const steps=[
 {h:'The balance point',p:'Each bar is a probability. Drag the purple pivot, or use the buttons, and press "Balance here" when the beam is level.',
 predict:{q:'A game pays £10 with probability 0.1, otherwise £0. What is E(X)?',opts:['£1','£5','£0'],ans:0},
 task:'Balance 3 distributions',show:()=>{steps[0].go();seq(BEAMS.map(d=>()=>{S.f=r2(EV(d));settle()}),600)},go:()=>{clear();refresh();S.then=finish(0,()=>S.bi>=BEAMS.length,'E(X) is where the probability beam balances.')}},
 {h:'Σ x·P(X = x)',p:'A £2 raffle ticket wins £5 with probability 0.2 and £20 with probability 0.1. X is your gain. Tap each row, then add.',
 task:'Find E(X) for the ticket',show:()=>{steps[1].go();seq([0,1,2].map(i=>()=>doRow(i)).concat([addUp]),400)},go:()=>{clear();refresh();S.then=finish(1,()=>S.sum!=null,'E(X) = Σ x·P(X = x): weight each value by its probability, then add.')}},
 {h:'The long run',p:'Roll a fair dice again and again. The purple line is the mean of all rolls so far.',
 predict:{q:'Can one roll of a dice ever show its expected value, 3.5?',opts:['No, but the long-run mean gets close to 3.5','Yes, sometimes','Yes, it is the most likely score'],ans:0},
 task:'Roll 1000 times',show:()=>{steps[2].go();seq([()=>roll(10),()=>roll(90),()=>roll(900)],400)},go:()=>{clear();refresh();S.then=finish(2,()=>S.n>=1000,'E(X) is the long-run mean. It need not be a possible outcome.')}},
 {h:'A fair price',p:'Drag the stake, or use the buttons. A game is fair when the expected gain is £0.',
 predict:{q:'You pay £1 to play for a £5 prize with probability 0.1. Your expected gain is…',opts:['−£0.50','+£4.00','£0'],ans:0},
 task:'Make 3 games fair',show:()=>{steps[3].go();seq(GAMES.map(G=>()=>{S.s=G.fair;lockStake()}),600)},go:()=>{clear();refresh();S.then=finish(3,()=>S.gi>=GAMES.length,'Fair stake = E(prize). At £1 the first game loses 50p a play on average.')}},
 {h:'Scale and shift',p:'Change every score of a dice in the same way. Pick the new expected value.',
 task:'Answer 3',show:()=>{steps[4].go();seq(LIN.map(L=>()=>pickLin(L[1])),500)},go:()=>{clear();refresh();S.then=finish(4,()=>S.li>=LIN.length,'E(aX + b) = a·E(X) + b.')}},
 {h:'Challenge',p:'',go:()=>{clear();quiz()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 // challenge: each wrong answer names its slip
 const Q=[['X is 0 or 20 with P(X = 20) = 0.25. E(X)?','5',[['10','mid'],['0','mode']]],
 ['P(X = 1) = 0.5, P(X = 2) = 0.3, P(X = 6) = 0.2. E(X)?','2.3',[['3','eqw'],['1','mode']]],
 ['E(X) for a fair dice is 3.5. What does that mean?','The mean of many rolls is close to 3.5',[['3.5 is the most likely roll','likely'],['Every roll is 3.5 on average, so you will roll 3.5','outcome']]],
 ['Pay £2 to win £10 with probability 0.15. Expected gain?','−£0.50',[['£1.50','stake'],['£8.00','prob']]],
 ['E(X) = 4. What is E(3X − 2)?','10',[['12','shift'],['6','scale']]],
 ['A raffle has E(gain) = −£0.30 per ticket. Over 100 tickets you expect to…','lose about £30',[['lose exactly 30p','total'],['break even','zero']]]];
 function cause(tag){let m='Weight each value by its probability and add.';
 if(tag==='mid')m='10 is halfway between 0 and 20, but 20 has probability 0.25, not 0.5: 20 × 0.25 = 5.';
 if(tag==='mode')m='That is the most likely value. E(X) also counts the rarer values, weighted by their probabilities.';
 if(tag==='eqw')m='(1 + 2 + 6) ÷ 3 = 3 treats the values as equally likely. Use 1×0.5 + 2×0.3 + 6×0.2 = 2.3.';
 if(tag==='likely')m='Every score from 1 to 6 is equally likely; 3.5 cannot be rolled at all.';
 if(tag==='outcome')m='No roll is ever 3.5. E(X) is the long-run mean, not an outcome you can get.';
 if(tag==='stake')m='10 × 0.15 = 1.50 is the expected prize. Take off the £2 stake: −£0.50.';
 if(tag==='prob')m='£10 − £2 = £8 is what you gain only when you win. You win just 15% of the time.';
 if(tag==='shift')m='3 × 4 = 12, then subtract the 2: E(3X − 2) = 10.';
 if(tag==='scale')m='4 − 2 = 2 forgot to multiply by 3: 3 × 4 − 2 = 10.';
 if(tag==='total')m='−£0.30 is per ticket. For 100 tickets multiply: about −£30.';
 if(tag==='zero')m='A negative E(gain) means you lose on average; over many tickets the losses add up.';
 return m}
 let qn=-1,streak=0;
 function quiz(){qn++;const [qq,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});speak('Challenge: '+qq);A.redraw()}
 function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+cause(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;btns()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
