/* Flagship – hearing range, ultrasound and infrasound (ages 13–15): drag a tone along a log frequency line through
   infrasound, the human 20–20 000 Hz band and ultrasound; place kHz and Hz sounds in the right zone; hunt for tones a
   dog, cat or elephant hears that people cannot; see how the top of the range falls with age; and sort real uses.
   Every drag has Lower/Higher button twins; the canvas label says the tone and who can hear it. */
(()=>{
const LO=5,HI=200000,STOPS=[6,8,10,12,14,17,19,25,35,50,70,100,200,500,1000,2000,4000,6000,7000,9000,11000,13000,14000,16000,17000,18000,19000,22000,25000,30000,40000,50000,60000,90000,120000,160000];
const ZN=['Infrasound','Audible to people','Ultrasound'],zoneOf=f=>f<20?0:f<=20000?1:2;
const fmtF=f=>f>=1000?`${(f/1000).toLocaleString('en-GB')} kHz (${f.toLocaleString('en-GB').replace(/,/g,' ')} Hz)`:`${f} Hz`;
const ANIM=[['People',20,20000],['Dog',67,45000],['Cat',48,85000],['Elephant',16,12000]];
const AGES=[['Age 15',19000],['Age 40',15000],['Age 70',8000]];
const CARDS=[['15 kHz',1,'15 kHz is 15 000 Hz. That is under 20 000 Hz, so most young people hear it.'],['12 Hz',0,'12 Hz is under 20 Hz: too low for people to hear. That is infrasound.'],
 ['25 kHz',2,'25 kHz is 25 000 Hz, above the 20 000 Hz limit: ultrasound.'],['0.5 kHz',1,'0.5 kHz is 500 Hz, in the middle of human hearing.']];
const USES=[['Scanning a baby in the womb',1,'Scans use ultrasound: millions of Hz, far above 20 000 Hz, so the echoes give sharp pictures.'],['Elephants calling across the plains',0,'Elephant rumbles go down to about 14 Hz, below human hearing: infrasound travels far.'],
 ['A bat finding moths in the dark',1,'Most bat calls are above 20 000 Hz: bats echolocate with ultrasound.'],['Detecting a far-off volcano erupting',0,'Eruptions make very low rumbles, under 20 Hz. Sensors pick up this infrasound thousands of km away.']];
const HUNT=[['a tone a dog hears but you cannot',f=>f>20000&&f<=45000],['a tone an elephant hears but a dog cannot',f=>f>=16&&f<67],['a tone none of the four can hear',f=>f<16||f>85000]];
const AGEHUNT=[['a tone all three people hear',f=>f>=20&&f<=8000],['a tone the 15- and 40-year-old hear, but not the 70-year-old',f=>f>8000&&f<=15000],['a tone only the 15-year-old hears',f=>f>15000&&f<=19000]];
VIS.reg('flaghear',c=>{let A,ctl,quiz,qk=-1,tok=0;
const init0=()=>({want:()=>{},won:0,si:14,seen:[0,0,0],j:0,bad:-1,lock:0,grab:0,got:[]}),S=init0();
const stage=()=>['tone','sort','animal','age','use','quiz'][A.step],rm=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function box(g,r,fill,warn,edge){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#fff');A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=warn?C.rd:edge||C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,F=()=>STOPS[S.si];
/* ---- the log frequency line shared by steps 1, 3 and 4 ---- */
const L=()=>18,R=()=>A.W-18,X=f=>L()+(Math.log10(f)-Math.log10(LO))/(Math.log10(HI)-Math.log10(LO))*(R()-L()),toF=x=>10**(Math.log10(LO)+(x-L())/(R()-L())*(Math.log10(HI)-Math.log10(LO)));
const lineY=()=>A.H*(stage()==='tone'?.52:.2);
function nearest(x){const f=toF(x);let b=0;STOPS.forEach((s,i)=>{if(Math.abs(Math.log(s/f))<Math.abs(Math.log(STOPS[b]/f)))b=i});return b}
function drawLine(g){const C=A.col,y=lineY(),z=[[LO,20],[20,20000],[20000,HI]],cols=[C.vi,C.gr,C.cy];
 z.forEach(([a,b],k)=>{g.fillStyle=A.alpha(cols[k],.22);g.fillRect(X(a),y-16,X(b)-X(a),32);put(g,['Infra','Audible','Ultra'][k],(X(a)+X(b))/2,y-46,11,C.tx,800)});
 [10,100,1000,10000,100000].forEach(f=>{g.fillStyle=C.tx;g.fillRect(X(f)-1,y+16,2,6);put(g,f>=1000?f/1000+'k':String(f),X(f),y+32,10,C.tx,700)});
 [20,20000].forEach(f=>{g.strokeStyle=C.tx;g.lineWidth=2;g.setLineDash([4,3]);g.beginPath();g.moveTo(X(f),y-18);g.lineTo(X(f),y+18);g.stroke();g.setLineDash([])});
 const x=X(F());g.fillStyle=C.rd;g.beginPath();g.moveTo(x,y-18);g.lineTo(x-11,y-34);g.lineTo(x+11,y-34);g.closePath();g.fill();g.fillRect(x-2,y-18,4,36)}
function setI(i,src){i=Math.max(0,Math.min(STOPS.length-1,i));if(i===S.si&&src!=='show')return;S.si=i;A.sound.tick();const v=stage(),f=F();
 if(v==='tone'){S.seen[zoneOf(f)]=1;const n=S.seen.filter(Boolean).length;say(`${fmtF(f)}: ${ZN[zoneOf(f)]}. ${n} of 3 zones visited.`);if(n>=3&&!S.won){S.won=1;A.sound.pop();S.want()}}
 if(v==='animal')say(`${fmtF(f)}. Heard by: ${ANIM.filter(a=>f>=a[1]&&f<=a[2]).map(a=>a[0]).join(', ')||'none of them'}.`);
 if(v==='age')say(`${fmtF(f)}. Heard by: ${AGES.filter(a=>f>=20&&f<=a[1]).map(a=>a[0]).join(', ')||'none of them'}.`);keys();A.redraw()}
function checkHunt(){const v=stage(),list=v==='animal'?HUNT:AGEHUNT;if(S.won>=3||S.lock)return;const[q,ok]=list[S.j],f=F();
 if(!ok(f)){if(v==='animal')return miss(S.j===0?(f<=20000?`${fmtF(f)} is inside your own range, so you can hear it too. Go above 20 000 Hz.`:`${fmtF(f)} is above 45 000 Hz, the top of a dog's range. Come down a little.`):S.j===1?(f>=67?`A dog hears ${fmtF(f)} too: dogs hear from about 67 Hz. Go lower.`:'Below 16 Hz even an elephant hears nothing. Go a little higher.'):'At least one animal hears this. Go below 16 Hz or above 85 000 Hz.',-1);
  return miss(`Top limits are about 19 000, 15 000 and 8 000 Hz. ${fmtF(f)} is heard by: ${AGES.filter(a=>f>=20&&f<=a[1]).map(a=>a[0]).join(', ')||'nobody'}.`,-1)}
 S.won++;S.got.push(f);A.sound.pop();say(`Yes: ${fmtF(f)} is ${q}.`);if(S.won<3){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:500)}keys();A.redraw();S.want()}
function drawTone(g){const C=A.col,f=F(),z=zoneOf(f);drawLine(g);put(g,fmtF(f),A.W/2,A.H*.12,18,C.tx,900);put(g,ZN[z],A.W/2,A.H*.24,15,C.tx,800);
 const y=A.H*.8,w=A.W*.8,cyc=Math.min(40,2+Math.log10(f)*6);g.strokeStyle=C.ac;g.lineWidth=2.5;g.beginPath();for(let i=0;i<=600;i++){const x=A.W*.1+w*i/600;g.lineTo(x,y-Math.sin(i/600*cyc*2*Math.PI)*A.H*.07)}g.stroke();
 put(g,`Still a sound wave: ${f.toLocaleString('en-GB').replace(/,/g,' ')} vibrations each second`,A.W/2,A.H*.94,11,C.tx,700);put(g,`${S.seen.filter(Boolean).length} of 3 zones`,A.W-34,A.H*.06,11,C.tx,800)}
function drawBars(g,rows,lo){const C=A.col,f=F(),top=A.H*.36,h=Math.min(34,A.H*.5/rows.length-8);drawLine(g);
 rows.forEach(([n,a,b],i)=>{const y=top+i*(h+8),inn=f>=a&&f<=b;g.fillStyle=A.alpha(inn?C.gr:C.mu,inn?.45:.2);g.fillRect(X(a),y,X(b)-X(a),h);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(X(a),y,X(b)-X(a),h);
  put(g,`${n}${inn?' ✓':''}`,Math.max(L()+40,Math.min(R()-40,(X(a)+X(b))/2)),y+h/2,12,C.tx,800)});
 g.strokeStyle=C.rd;g.lineWidth=2;g.beginPath();g.moveTo(X(f),lineY()+18);g.lineTo(X(f),top+rows.length*(h+8));g.stroke();
 const list=stage()==='animal'?HUNT:AGEHUNT;put(g,S.won<3?`Find ${list[S.j][0]}`:'All three found.',A.W/2,A.H*.9,13,C.tx,800);put(g,fmtF(f),A.W/2,A.H*.97,12,C.tx,700)}
/* ---- card sorts for steps 2 and 5 ---- */
const zone=(k,n)=>{const w=(A.W-10-(n-1)*8)/n;return{x:5+k*(w+8),y:A.H*.6,w,h:A.H*.3}},card=()=>{const w=Math.min(A.W-30,480);return{x:(A.W-w)/2,y:A.H*.08,w,h:A.H*.3}};
function sortCard(k){const v=stage();if((v!=='sort'&&v!=='use')||S.won>=4||S.lock)return;const list=v==='sort'?CARDS:USES,[t,want,why]=list[S.j];
 if(k!==want)return miss(v==='sort'&&want!==1&&k===1?`${t}: check the unit. ${why}`:why,k);
 S.won++;A.sound.pop();say(`Right. ${why}`);if(S.won<4){S.lock=1;setTimeout(()=>{S.lock=0;S.j++;keys();A.redraw()},rm()?10:600)}keys();A.redraw();S.want()}
function drawSort(g){const C=A.col,v=stage(),list=v==='sort'?CARDS:USES,names=v==='sort'?ZN:['Infrasound','Ultrasound'],r=card();box(g,r,null,false,C.tx);
 put(g,list[Math.min(S.j,3)][0],r.x+r.w/2,r.y+r.h/2,v==='sort'?26:15,C.tx,900);put(g,`${Math.min(S.won,4)} of 4`,A.W/2,A.H*.47,12,C.tx,800);
 names.forEach((t,k)=>{const z=zone(k,names.length);box(g,z,A.alpha([C.vi,C.gr,C.cy][v==='sort'?k:k*2],.16),S.bad===k,C.tx);put(g,t,z.x+z.w/2,z.y+z.h/2,A.narrow?11:13,C.tx,800)})}
/* ---- shared ---- */
function miss(t,b){A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){put(g,'People hear about 20 Hz to 20 000 Hz',W/2,H*.38,15,C.tx,800);put(g,'Below: infrasound. Above: ultrasound.',W/2,H*.58,14,C.tx,700);return}
 if(v==='tone')drawTone(g);else if(v==='animal')drawBars(g,ANIM);else if(v==='age')drawBars(g,AGES.map(([n,t])=>[n,20,t]));else drawSort(g);A.fx.draw(g)}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};if(v==='quiz')return;
 if(v==='tone'||v==='animal'||v==='age'){B('◀ Lower',()=>setI(S.si-1),'Lower frequency');B('Higher ▶',()=>setI(S.si+1),'Higher frequency');if(v!=='tone'&&S.won<3)B('Check this tone',checkHunt)}
 if(v==='sort'&&S.won<4)ZN.forEach((t,k)=>B(t,()=>sortCard(k)));
 if(v==='use'&&S.won<4)['Infrasound','Ultrasound'].forEach((t,k)=>B(t,()=>sortCard(k)))}
function down(p){const v=stage();
 if(v==='tone'||v==='animal'||v==='age'){if(p.y<A.H*.86||v==='tone'){S.grab=1;setI(nearest(p.x));return true}return false}
 const n=v==='sort'?3:2,k=[...Array(n).keys()].find(k=>hit(p,zone(k,n)));if(k!=null)sortCard(k);return false}
function move(p){if(S.grab)setI(nearest(p.x))}
function up(){if(S.grab&&stage()!=='tone')checkHunt();S.grab=0}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const clear=()=>{tok++;Object.assign(S,init0())};const at=f=>STOPS.indexOf(f);
const steps=[
{h:'Slide the pitch',p:'Frequency is how many vibrations a sound makes each second, in hertz (Hz). People hear from about 20 Hz to 20 000 Hz. Drag the red marker, or use Lower and Higher, and visit all three zones.',
 predict:{q:'A sound at 30 000 Hz is…',opts:['very loud','too high for people to hear','not a sound at all'],ans:1},task:'Visit all 3 zones',
 show:()=>{steps[0].go();demo([()=>setI(at(8),'show'),()=>setI(at(1000),'show'),()=>setI(at(30000),'show')],600)},go:()=>{clear();S.seen[1]=1;say(`${fmtF(F())}: audible. Drag the marker.`);keys();S.want=ready(0,()=>S.won>=1,'Frequency sets the zone; loudness does not.')}},
{h:'Hz or kHz?',p:'1 kHz = 1000 Hz. Read the unit, then tap the zone each sound belongs in.',task:'Sort 4 sounds',
 show:()=>{steps[1].go();demo([0,1,2,3].map(()=>()=>sortCard(CARDS[S.j][1])),750)},go:()=>{clear();say('15 kHz. Which zone?');keys();S.want=ready(1,()=>S.won>=4,'Turn kHz into Hz before you compare with 20 and 20 000.')}},
{h:'Who hears what?',p:'Bars show roughly what each animal hears (from lab tests). Drag the tone, then check it.',
 predict:{q:'A dog whistle at 30 000 Hz seems silent to you. What is it really making?',opts:['no sound at all','a sound too high for people'],ans:1},task:'Find 3 tones',
 show:()=>{steps[2].go();demo([()=>setI(at(30000),'show'),checkHunt,()=>setI(at(35),'show'),checkHunt,()=>setI(at(120000),'show'),checkHunt],450)},go:()=>{clear();S.si=at(1000);say('Find a tone a dog hears but you cannot.');keys();S.want=ready(2,()=>S.won>=3,'Other animals hear ranges people cannot.')}},
{h:'Ears change with age',p:'The top of the range falls as people get older. These are typical tops; real people vary a lot.',
 predict:{q:'A 17 000 Hz tone plays in a shop. Who is most likely to hear it?',opts:['everyone','mostly teenagers','nobody: it is ultrasound'],ans:1},task:'Find 3 tones',
 show:()=>{steps[3].go();demo([()=>setI(at(4000),'show'),checkHunt,()=>setI(at(11000),'show'),checkHunt,()=>setI(at(17000),'show'),checkHunt],450)},go:()=>{clear();S.si=at(1000);say('Find a tone all three people hear.');keys();S.want=ready(3,()=>S.won>=3,'High pitches are the first to go as ears age.')}},
{h:'Sound we cannot hear',p:'Infrasound and ultrasound are real sound waves with real uses. Sort each one.',task:'Sort 4 uses',
 show:()=>{steps[4].go();demo([0,1,2,3].map(()=>()=>sortCard(USES[S.j][1])),750)},go:()=>{clear();say(USES[0][0]+'. Infrasound or ultrasound?');keys();S.want=ready(4,()=>S.won>=4,'Ultrasound: above 20 000 Hz. Infrasound: below 20 Hz.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
const QS=[['A bat calls at 50 000 Hz. Why can people not hear it?',[['It is above 20 000 Hz, the top of human hearing','ok'],['It is too quiet','loud'],['It is not a sound wave','notsnd']]],
 ['Which of these is infrasound?',[['15 Hz','ok'],['15 kHz','unit'],['150 Hz','low']]],
 ['How many hertz is 20 kHz?',[['20 000 Hz','ok'],['2000 Hz','k10'],['200 Hz','k100']]],
 ['Why can a teenager hear a 17 000 Hz tone that their grandad cannot?',[['The top of the hearing range falls with age','ok'],['The tone is louder for young people','loud'],['17 000 Hz is ultrasound','ultra']]],
 ['Turning up the volume on a 25 000 Hz tone makes it…',[['still unheard by people: volume does not change frequency','ok'],['audible once it is loud enough','vol'],['a lower pitch','pitch']]]];
function why(t){let m='Compare the frequency in Hz with 20 Hz and 20 000 Hz.';
 if(t==='loud')m='Loudness is not the reason. Pitch is set by frequency, and this frequency is outside the human range.';if(t==='notsnd')m='It is a sound wave, a vibration passed through the air, just at a frequency people cannot hear.';
 if(t==='unit')m='15 kHz is 15 000 Hz, inside human hearing. Infrasound is below 20 Hz.';if(t==='low')m='150 Hz is a low hum people can hear. Infrasound is below 20 Hz.';
 if(t==='k10')m='k means 1000, so 20 kHz = 20 × 1000 = 20 000 Hz.';if(t==='k100')m='Multiply by 1000, not 10: 20 kHz = 20 000 Hz.';
 if(t==='ultra')m='Ultrasound starts above 20 000 Hz. 17 000 Hz is audible to young ears, but older ears lose high pitches first.';
 if(t==='vol')m='Volume changes the amplitude, not the frequency. 25 000 Hz stays above the human range however loud it is.';if(t==='pitch')m='Volume does not change pitch: the frequency stays 25 000 Hz.';return m}
function ask(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}});
A.start()})})();
