/* Flagship: Frequency and period, f = 1/T (ages 13-15; KS3/GCSE waves: "frequency in hertz… period = 1/frequency").
   Set a wave to 4 waves per second on a 1 s strip; fill an f-T table and see f × T = 1; drag the length of one wave on a
   0.1 s axis to T = 0.02 s (50 Hz); tune a 10 ms axis to a 440 Hz note; match periods (s and ms) to frequencies.
   Not flagwread (reading λ and T off graphs) or flagvfl (v = fλ). */
(()=>{
VIS.reg('flaghz',c=>{let A,keys,quizBox,qk=-1,gen=0;const M={};
const NAVY='#0c1a33',CARDBG='#f1f5f9',WIN='#166534',KEY='#4338ca',ERR='#9f1239',TRACE=['#0284c7','#38bdf8'];
const FIX=[1,2,4,5,10],PER=[['0.5 s',.5],['0.1 s',.1],['20 ms',.02],['2 s',2]],FRQ=[['2 Hz',2],['0.05 Hz',.05],['10 Hz',10],['20 Hz',20],['50 Hz',50],['0.5 Hz',.5]];
const mode=()=>['count','table','tf','ft','match','chal'][A.step];
const fg=()=>A.col.dark?'#e5e7eb':NAVY,box=(v,a,b)=>Math.max(a,Math.min(b,v)),num=v=>+v.toPrecision(4),inBox=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t)}
/* label on a pale tag: dark text keeps its contrast in both themes */
function tag(t,x,y,o){o=o||{};const g=A.ctx;let px=o.px||(A.narrow?14:17);const set=()=>g.font=`700 ${px}px system-ui`;set();while(g.measureText(t).width>A.W-28&&px>10){px--;set()}
 const w=Math.max(o.w||0,g.measureText(t).width+20),h=o.h||px*1.75,X=box(x-w/2,4,A.W-w-4);g.fillStyle=o.bg||CARDBG;A.paint.rrect(X,y-h/2,w,h,9);g.fill();
 g.strokeStyle=o.ring||'#94a3b8';g.lineWidth=o.ring?3:1.4;g.stroke();g.fillStyle=NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,X+w/2,y);return{x:X,y:y-h/2,w,h}}
/* the time strip: a displacement-time trace over a window of `span` seconds with period T */
const strip=()=>({x0:22,x1:A.W-22,y:A.H*(A.narrow?.36:.38),amp:A.H*(A.narrow?.1:.12)});
function trace(T,span,unit,lab){const g=A.ctx,S=strip(),px=t=>S.x0+(t/span)*(S.x1-S.x0);g.strokeStyle=fg();g.lineWidth=1.5;g.beginPath();g.moveTo(S.x0,S.y);g.lineTo(S.x1,S.y);g.stroke();
 g.font=`600 ${A.narrow?11:13}px system-ui`;g.fillStyle=fg();g.textAlign='center';for(let k=0;k<=10;k++){const x=px(span*k/10);g.beginPath();g.moveTo(x,S.y+S.amp+6);g.lineTo(x,S.y+S.amp+(k%5?12:18));g.stroke();if(k%(A.narrow?5:2)===0)g.fillText(num(span*k/10*(unit==='ms'?1000:1))+' '+unit,x,S.y+S.amp+30)}
 g.lineWidth=3;g.strokeStyle=TRACE[A.col.dark?1:0];g.beginPath();for(let i=0;i<=600;i++){const t=span*i/600,x=px(t),y=S.y-S.amp*Math.sin(2*Math.PI*t/T);i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
 const n=Math.floor(span/T+1e-9);g.fillStyle=KEY;for(let k=1;k<=n&&k<=40;k++){g.beginPath();g.arc(px(k*T),S.y,n>20?2.5:4,0,7);g.fill()}   // a dot at the end of each whole wave
 if(lab){g.strokeStyle=KEY;g.lineWidth=2;g.beginPath();g.moveTo(px(0),S.y-S.amp-14);g.lineTo(px(T),S.y-S.amp-14);g.stroke();tag(lab,box(px(T/2),60,A.W-60),S.y-S.amp-30,{px:13,ring:KEY})}return px}
/* a horizontal slider drawn on the canvas: value v between lo and hi */
const rail=()=>({x0:40,x1:A.W-40,y:A.H*.82});
function slider(v,lo,hi,txt){const g=A.ctx,R=rail(),x=R.x0+(v-lo)/(hi-lo)*(R.x1-R.x0);g.strokeStyle='#94a3b8';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(R.x0,R.y);g.lineTo(R.x1,R.y);g.stroke();
 g.fillStyle=KEY;g.beginPath();g.arc(x,R.y,15,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();if(txt)tag(txt,A.W/2,R.y-34,{px:A.narrow?13:15})}
const fromRail=(p,lo,hi,step)=>{const R=rail();return box(Math.round((lo+(p.x-R.x0)/(R.x1-R.x0)*(hi-lo))/step)*step,lo,hi)};
/* ---- 1 and 2: frequency on a 1 s strip ---- */
function drawCount(){const f=M.f,T=1/f;tag(`${num(f)} wave${f===1?'':'s'} each second = ${num(f)} Hz`,A.W/2,A.H*.07,{ring:M.f===4&&A.step===0?WIN:KEY});trace(T,1,'s',`one wave: ${num(T)} s`);slider(f,.5,10,A.step===0?'Drag to change the frequency':'');
 if(A.step===1){const n=A.narrow,w=n?(A.W-24)/5:Math.min(90,(A.W-40)/5);FIX.forEach((F,i)=>{const x=(A.W-5*w)/2+i*w,got=M.seen[i],y=A.H*.61;
  tag(`${F} Hz`,x+w/2,y,{w:w-6,px:13,bg:got?'#dcfce7':CARDBG});tag(got?(A.narrow?'':'T = ')+`${num(1/F)} s`:'T = ?',x+w/2,y+30,{w:w-6,px:12,bg:got?'#dcfce7':CARDBG})})}}
function setF(v){M.f=box(v,.5,10);A.sound.tick();const i=FIX.indexOf(M.f);if(A.step===1&&i>=0&&!M.seen[i]){M.seen[i]=true;A.sound.pop()}
 const left=FIX.filter((F,j)=>!M.seen[j]);
 note(A.step===0?(M.f===4?'4 waves pass each second: 4 Hz. Each wave takes a quarter of a second, 0.25 s.':`${num(M.f)} wave${M.f===1?'':'s'} each second. Make it 4.`)
  :left.length?`${num(M.f)} Hz: T = 1 ÷ ${num(M.f)} = ${num(1/M.f)} s. Still to try: ${left.join(', ')} Hz.`:'Every row: f × T = 1. Double the frequency and the period halves.')}
/* ---- 3 and 4: drag the end of one wave on a short time axis ---- */
const TUNE={tf:{span:.1,unit:'s',lo:.005,hi:.05,step:.005,start:.05,ok:T=>Math.abs(T-.02)<1e-6},ft:{span:.01,unit:'ms',lo:.0005,hi:.005,step:.00005,start:.005,ok:T=>Math.abs(1/T-440)<=10}};
function drawTune(){const k=mode(),D=TUNE[k],T=M.T,ms=D.unit==='ms',show=ms?`T = ${num(T*1000)} ms = ${num(T)} s`:`T = ${num(T)} s`;
 tag(k==='tf'?'Make one wave last 0.02 s':'Tune the note to 440 Hz',A.W/2,A.H*.07,{ring:D.ok(T)?WIN:KEY});const px=trace(T,D.span,D.unit,show);
 const g=A.ctx,S=strip(),hx=px(T);g.fillStyle=ERR;g.fillRect(hx-3,S.y-S.amp-4,6,2*S.amp+8);g.beginPath();g.arc(hx,S.y+S.amp+4,11,0,7);g.fill();   // the handle sits on the end of the first wave
 tag(`waves in ${ms?'10 ms':'0.1 s'}: ${num(D.span/T)}`,A.W/2,A.H*.66,{px:14});tag(`f = 1 ÷ T = 1 ÷ ${num(T)} = ${num(1/T)} Hz`,A.W/2,A.H*.78,{px:A.narrow?14:16,ring:D.ok(T)?WIN:null,bg:'#e0e7ff'})}
function setT(v){const D=TUNE[mode()];M.T=box(Math.round(v/D.step)*D.step,D.lo,D.hi);M.T=num(M.T);A.sound.tick();const f=1/M.T;
 if(D.ok(M.T)){M.hit=true;A.sound.pop();return note(mode()==='tf'?'T = 0.02 s, so f = 1 ÷ 0.02 = 50 Hz: 50 waves each second, like mains electricity.':`T ≈ ${num(M.T*1000)} ms gives ${Math.round(f)} Hz. A 440 Hz note: each wave lasts about 0.0023 s.`)}
 note(`T = ${num(M.T)} s, f = ${Math.round(f*10)/10} Hz. `+(mode()==='tf'?(M.T>.02?'Too long: shorten the wave.':'Too short: lengthen it.'):(f<440?'Too low: shorter waves give a higher frequency.':'Too high: make each wave a little longer.')))}
/* ---- 5: match each period to its frequency ---- */
const cardsP=()=>{const n=A.narrow,w=n?A.W*.4:A.W*.3,h=Math.max(46,A.H*.11);return PER.map((p,i)=>({x:n?10:A.W*.08,y:A.H*.16+i*(h+10),w,h}))};
const cardsF=()=>{const n=A.narrow,w=n?A.W*.24:A.W*.2,h=Math.max(46,A.H*.11);return FRQ.map((p,i)=>({x:(n?A.W*.46:A.W*.52)+(i%2)*(w+8),y:A.H*.16+Math.floor(i/2)*(h+10),w,h}))};
function drawMatch(){tag(M.pairs.length<4?'Tap a period, then its frequency':'All four matched: f = 1 ÷ T',A.W/2,A.H*.06,{ring:M.pairs.length>3?WIN:KEY});
 cardsP().forEach((r,i)=>{const done=M.pairs.includes(i);const t=tag(PER[i][0],r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,px:18,bg:done?'#dcfce7':M.pick===i?'#e0e7ff':CARDBG,ring:M.pick===i?KEY:done?WIN:null})});
 cardsF().forEach((r,i)=>tag(FRQ[i][0],r.x+r.w/2,r.y+r.h/2,{w:r.w,h:r.h,px:17,bg:M.bad===i?'#ffe4e6':CARDBG,ring:M.bad===i?ERR:null}))}
function pickP(i){if(M.pairs.includes(i))return;M.pick=i;M.bad=null;A.sound.tick();note(`Period ${PER[i][0]}. Now tap its frequency.`)}
function pickF(j){if(M.pick==null)return note('Tap a period first.');const [pt,T]=PER[M.pick],[ft,f]=FRQ[j],want=1/T;
 if(Math.abs(f-want)<1e-9){M.pairs.push(M.pick);M.pick=null;M.bad=null;A.sound.pop();return note(`${pt} ↔ ${ft}: 1 ÷ ${T} = ${num(want)}.`+(M.pairs.length>3?' All matched.':''))}
 M.bad=j;A.sound.miss();note(pt.endsWith('ms')&&Math.abs(f-.05)<1e-9?'1 ÷ 20 = 0.05, but 20 is in ms. Change to 0.02 s first: 1 ÷ 0.02 = 50 Hz.':Math.abs(f-T*(pt.endsWith('ms')?1000:1))<1e-9?`The frequency is not the same number as the period. Work out 1 ÷ ${T}.`:`1 ÷ ${T} is ${num(want)}, not ${num(f)}.`)}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H);const k=mode();
 if(k==='chal'){tag('Challenge',A.W/2,A.H*.12,{ring:KEY});const Q=QS[qk%QS.length];if(Q)tag(Q.pic,A.W/2,A.H*.5,{px:A.narrow?18:22});return}
 if(k==='count'||k==='table')return drawCount();if(k==='match')return drawMatch();drawTune()}
function clear(){gen++;for(const k in M)delete M[k];Object.assign(M,{f:1,T:.05,seen:[false,false,false,false,false],pairs:[],pick:null,bad:null,hit:false,grab:null,test:()=>{}})}
function note(t){voice(t);A.redraw();controls();M.test()}
const settle=(i,cond,txt)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(txt+A.reveal(i))};
function arrive(i,say,cond,txt,init){clear();Object.assign(M,init||{});voice(say);controls();M.test=settle(i,cond,txt)}
function autoplay(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},A.reduced()?20*(j+1):(ms||300)*(j+1)))}
function controls(){if(!keys)return;keys.innerHTML='';const k=mode(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='count'||k==='table'){btn('− 0.5 Hz',()=>setF(M.f-.5),'Lower the frequency by 0.5 hertz');btn('+ 0.5 Hz',()=>setF(M.f+.5),'Raise the frequency by 0.5 hertz');if(k==='table')FIX.forEach(F=>btn(`${F} Hz`,()=>setF(F),`Set ${F} hertz`))}
 if(k==='tf'||k==='ft'){const D=TUNE[k],big=D.step*(k==='ft'?10:2);btn('◀◀',()=>setT(M.T-big),'Make the period much shorter');btn('◀',()=>setT(M.T-D.step),'Make the period a little shorter');btn('▶',()=>setT(M.T+D.step),'Make the period a little longer');btn('▶▶',()=>setT(M.T+big),'Make the period much longer')}
 if(k==='match'){PER.forEach((p,i)=>{if(!M.pairs.includes(i))btn(p[0],()=>pickP(i),'Period '+p[0])});if(M.pick!=null)FRQ.forEach((f,j)=>btn(f[0],()=>pickF(j),'Frequency '+f[0]))}}
/* canvas: drag the slider knob or the end of the wave; tap cards */
function down(p){const k=mode();
 if((k==='count'||k==='table')&&Math.abs(p.y-rail().y)<34){M.grab='f';setF(fromRail(p,.5,10,.5));return true}
 if(k==='tf'||k==='ft'){const D=TUNE[k],S=strip();if(Math.abs(p.y-S.y)<S.amp+40){M.grab='T';setT((p.x-S.x0)/(S.x1-S.x0)*D.span);return true}}
 if(k==='match'){const i=cardsP().findIndex(r=>inBox(p,r));if(i>=0)pickP(i);const j=cardsF().findIndex(r=>inBox(p,r));if(j>=0)pickF(j)}return false}
function move(p){const k=mode();if(M.grab==='f')setF(fromRail(p,.5,10,.5));if(M.grab==='T'){const D=TUNE[k],S=strip();setT((p.x-S.x0)/(S.x1-S.x0)*D.span)}}
function up(){M.grab=null}
const steps=[
{h:'What is 1 hertz?',p:'The trace shows one point on a wave for 1 second. Drag the knob to change how many waves pass each second.',
 predict:{q:'1 Hz means…',opts:['one wave passes each second','each wave is 1 m long','the wave is 1 m high'],ans:0},task:'Set 4 waves each second',
 show:()=>autoplay(0,[()=>setF(2),()=>setF(3),()=>setF(4)]),
 go:()=>arrive(0,'A wave trace over 1 second with 1 wave on it, and a frequency slider at 1 Hz.',()=>M.f===4,'Frequency is waves per second, in hertz.')},
{h:'More waves, shorter waves',p:'Try each frequency in the table. Watch the time for one wave, the period T.',
 predict:{q:'If the frequency doubles, the period…',opts:['doubles','halves','stays the same'],ans:1},task:'Fill all 5 rows of the table',
 show:()=>autoplay(1,FIX.map(F=>()=>setF(F)),350),
 go:()=>arrive(1,'The same trace and slider, with a table of 1, 2, 4, 5 and 10 Hz.',()=>M.seen.every(Boolean),'f × T = 1, so T = 1 ÷ f and f = 1 ÷ T.')},
{h:'From period to frequency',p:'This axis is only 0.1 s long. Drag the red handle to set the time for one wave to 0.02 s.',
 predict:{q:'A wave with T = 0.02 s has a frequency of…',opts:['0.02 Hz','50 Hz','2 Hz'],ans:1},task:'Set T to 0.02 s',
 show:()=>autoplay(2,[()=>setT(.04),()=>setT(.03),()=>setT(.02)]),
 go:()=>arrive(2,'A 0.1 second trace. One wave lasts 0.05 s, so 2 fit. A red handle marks the end of the first wave.',()=>M.hit,'5 waves in 0.1 s is 50 in 1 s: 1 ÷ 0.02 = 50 Hz.',{T:.05})},
{h:'From frequency to period',p:'The A above middle C is 440 Hz. This axis is 10 ms long. Drag the handle until the note is 440 Hz.',
 predict:{q:'For a 440 Hz note, one wave lasts…',opts:['440 s','about 0.0023 s','0.44 s'],ans:1},task:'Tune to 440 Hz',
 show:()=>autoplay(3,[()=>setT(.004),()=>setT(.003),()=>setT(.0025),()=>setT(.00225)]),
 go:()=>arrive(3,'A 10 millisecond trace. One wave lasts 5 ms, which is 200 Hz.',()=>M.hit,'T = 1 ÷ 440 ≈ 0.0023 s, about 2.3 ms.',{T:.005})},
{h:'Match period and frequency',p:'Tap a period, then the frequency that goes with it. Change ms to s first.',task:'Match all 4 periods',
 show:()=>autoplay(4,[()=>pickP(0),()=>pickF(0),()=>pickP(1),()=>pickF(2),()=>pickP(2),()=>pickF(4),()=>pickP(3),()=>pickF(5)],250),
 go:()=>arrive(4,'Four period cards: 0.5 s, 0.1 s, 20 ms, 2 s. Six frequency cards.',()=>M.pairs.length>3,'Each pair multiplies to 1: f × T = 1.')},
{h:'Challenge',p:'',go:()=>{clear();posit()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.test()});
const QS=[
 {pic:'T = 0.25 s',q:'A wave has a period of 0.25 s. What is its frequency?',ans:'4 Hz',bad:[['0.25 Hz','same'],['25 Hz','pct']]},
 {pic:'1 Hz',q:'What does a frequency of 1 Hz mean?',ans:'one wave passes each second',bad:[['each wave is 1 m long','len'],['each wave is 1 m high','amp']]},
 {pic:'T = 20 ms',q:'A wave has a period of 20 ms. What is its frequency?',ans:'50 Hz',bad:[['0.05 Hz','ms'],['20 Hz','copy']]},
 {pic:'mains: 50 Hz',q:'Mains electricity in the UK is 50 Hz. What is its period?',ans:'0.02 s',bad:[['50 s','times'],['0.5 s','dec']]},
 {pic:'5 Hz → 10 Hz',q:'The frequency goes from 5 Hz to 10 Hz. What happens to the period?',ans:'it halves, 0.2 s to 0.1 s',bad:[['it doubles','up'],['it stays the same','flat']]},
 {pic:'440 Hz',q:'Calculate the period of a 440 Hz sound.',ans:'about 0.0023 s',bad:[['440 s','times'],['0.44 s','kilo']]}];
function hint(t){let m='Use f = 1 ÷ T and T = 1 ÷ f, with T in seconds.';
 if(t==='same')m='Frequency and period are not the same number. f = 1 ÷ 0.25 = 4 Hz.';
 if(t==='pct')m='0.25 is a quarter, not 25. A quarter of a second per wave means 4 waves each second.';
 if(t==='len')m='Length is wavelength, in metres. Hertz counts waves per second.';
 if(t==='amp')m='Height is amplitude. Hertz counts how many waves pass each second.';
 if(t==='ms')m='1 ÷ 20 = 0.05 uses ms. Change 20 ms to 0.02 s first: 1 ÷ 0.02 = 50 Hz.';
 if(t==='copy')m='The frequency is not the period number. Convert to 0.02 s, then 1 ÷ 0.02 = 50 Hz.';
 if(t==='times')m='The period is time for one wave, and many waves pass each second, so T is less than 1 s. T = 1 ÷ f.';
 if(t==='dec')m='1 ÷ 50 = 0.02, not 0.5. Check: 50 × 0.02 = 1.';
 if(t==='up')m='More waves each second means each wave is quicker. T = 1 ÷ 10 = 0.1 s, half of 0.2 s.';
 if(t==='flat')m='T = 1 ÷ f, so when f changes, T changes too: 0.2 s becomes 0.1 s.';
 if(t==='kilo')m='0.44 s would be about 2 Hz. 1 ÷ 440 ≈ 0.0023 s.';
 return m}
function posit(){qk++;const Q=QS[qk%QS.length],o=[[Q.ans,'ok'],...Q.bad],r=qk%3,ord=o.slice(r).concat(o.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});voice('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();voice(ok?'Yes: '+ans+'.':hint(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=posit}
A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;keys.hidden=Q.step===5;controls()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Wave controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);clear();A.gest({down,move,up});controls()}});
A.start()})})();
