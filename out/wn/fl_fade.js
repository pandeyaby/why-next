/* Flagship – sound fading with distance (ages 8–9; NC England Y4 sound: "recognise that sounds get fainter as the distance
   from the sound source increases"). Walk a listener away from a drum and record sound-meter readings, spot the
   "−6 dB each time the distance doubles" pattern, tap ripple rings to see the shake spread out so less reaches the ear,
   find how far a soft and a hard hit can be heard, and set up a fair test. Every canvas action has a button too. */
(()=>{
 const dB=(d,src)=>Math.round((src||80)-20*Math.log10(d));          // free-field point source: −6 dB per doubling
 const MARKS=[1,2,3,4,5,6,7,8];
 const RINGS=[1,2,4];                                                  // ring radius multipliers
 const HITS=[['soft hit',70,4],['hard hit',82,16]];                    // [name, dB at 1 m, farthest mark still heard over 58 dB]
 const LINE58=58, DIST=[1,2,4,8,16];
 const FCARDS=[['the distance from the drum',1],['how hard the drum is hit',0],['the sound meter reading',2],['which drum you use',0],['where the meter points',0]];
 const FBINS=['Keep the same','Change','Measure'];
 VIS.reg('flagfade',c=>{let A,pad,chal;c.fig.classList.add('young');
 const S={then:()=>{}};
 const stage=()=>['walk','graph','rings','hits','fair','chal'][A.step];
 const INK='#1e293b',SOFT='#475569',LINE='#64748b',CARD='#ffffff',OK='#047857',NO='#b91c1c',SUN='#fef3c7',PICK='#dcfce7',DRUM='#b91c1c',SKIN='#fde68a',WAVE='#1d4ed8',TEAL='#0f766e';
 const u=n=>Math.round(n*(A.narrow?1.05:1.2));
 function word(g,s,x,y,n,col,al){g.font=`700 ${u(n)}px system-ui,sans-serif`;g.fillStyle=col||INK;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y)}
 function split(g,s,max,n){g.font=`700 ${u(n)}px system-ui,sans-serif`;const out=[];let cur='';for(const w of s.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
 function panel(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function topline(g,s,col){const r={x:10,y:8,w:A.W-20,h:A.H*.12};panel(g,r,SUN,'#b45309',2);const L=split(g,s,r.w-16,14);L.forEach((l,i)=>word(g,l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*u(18),14,col))}
 function verdict(g){if(!S.msg)return;const L=split(g,(S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=u(13)+5,h=L.length*lh+10,y=A.H-h-6;panel(g,{x:10,y,w:A.W-20,h},CARD,S.bad?NO:OK,3);L.forEach((l,i)=>word(g,l,A.W/2,y+5+lh*(i+.5),13))}
 const voice=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const nope=s=>{S.bad=true;S.msg=s;A.sound.miss();voice(s);A.redraw()};
 const yes=s=>{S.bad=false;S.msg=s;A.sound.pop()};
 function drum(g,x,y,r){g.fillStyle=DRUM;g.fillRect(x-r,y,2*r,r*1.1);g.fillStyle='#fecaca';g.beginPath();g.ellipse(x,y,r,r*.35,0,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.strokeRect(x-r,y,2*r,r*1.1)}
 function kid(g,x,y,s){g.fillStyle=SKIN;g.beginPath();g.arc(x,y-s*1.6,s*.55,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle=TEAL;A.paint.rrect(x-s*.5,y-s*1.05,s,s*1.2,5);g.fill()}
 // ---- 1. walk away and record readings
 const track=()=>({x0:A.W*.2,x1:A.W-24,y:A.H*.4});
 const xOf=d=>{const T=track();return T.x0+(d-1)/7*(T.x1-T.x0)};
 function meter(g,x,y,w,h,val){panel(g,{x,y,w,h},CARD,LINE,2);const f=Math.max(0,Math.min(1,(val-40)/45));g.fillStyle=val>=74?NO:val>=66?'#b45309':OK;A.paint.rrect(x+3,y+3,(w-6)*f,h-6,5);g.fill();word(g,`Meter: ${val} dB`,x+w+8,y+h/2,13,INK,'left')}
 function drawWalk(g){const T=track();topline(g,S.rec.length<4?'Walk away from the drum. Record the sound meter at 4 places.':'Further away, the reading drops: the sound is fainter.',S.rec.length<4?INK:OK);
 drum(g,A.W*.08,T.y-u(30),u(18));for(let k=1;k<=3;k++){g.strokeStyle=WAVE;g.globalAlpha=.7/k;g.lineWidth=3;g.beginPath();g.arc(A.W*.08+u(18),T.y-u(22),k*u(12),-.8,.8);g.stroke()}g.globalAlpha=1;
 g.strokeStyle=LINE;g.lineWidth=2;g.beginPath();g.moveTo(T.x0,T.y+4);g.lineTo(T.x1,T.y+4);g.stroke();
 MARKS.forEach(d=>{const x=xOf(d);g.beginPath();g.moveTo(x,T.y);g.lineTo(x,T.y+10);g.stroke();word(g,`${d} m`,x,T.y+u(20),A.narrow?9:11,SOFT)});
 kid(g,xOf(S.d),T.y,u(16));meter(g,A.W*.1,T.y+u(36),A.W*.42,u(26),dB(S.d));
 const rows=[...S.rec].sort((a,b)=>a-b);if(rows.length){const y0=T.y+u(76);word(g,'Distance → reading',A.W/2,y0,11,SOFT);rows.forEach((d,i)=>word(g,`${d} m: ${dB(d)} dB`,10+((i%2)+.5)*(A.W-20)/2,y0+u(16)+Math.floor(i/2)*u(16),12,OK))}}
 function walk(step){const d=Math.max(1,Math.min(8,S.d+step));if(d===S.d)return nope(step>0?'You are at the far end of the path: 8 m.':'You are right next to the drum: 1 m.');S.d=d;S.msg='';A.sound.tick();refresh()}
 function record(){if(S.rec.length>=4)return;if(S.rec.includes(S.d))return nope(`You already recorded ${S.d} m. Move to a new place first.`);S.rec.push(S.d);
 if(S.rec.length>=2){const s=[...S.rec].sort((a,b)=>a-b),far=s[s.length-1],near=s[0];yes(`At ${near} m the meter reads ${dB(near)} dB; at ${far} m only ${dB(far)} dB. Further away = fainter.`)}else{S.bad=false;S.msg=`${S.d} m: ${dB(S.d)} dB. Now move and record again.`;A.sound.pop()}refresh()}
 // ---- 2. pattern on a bar chart: set the 16 m bar
 const chart=()=>({x:A.W*.12,y:A.H*.2,w:A.W*.8,h:A.H*.42});
 const yOf=v=>{const C=chart();return C.y+C.h-(v-40)/45*C.h};
 function drawGraph(g){const C=chart();topline(g,S.gOk?'Each time the distance doubles, the reading drops by 6 dB.':'Drag the 16 m bar to the reading you expect.',S.gOk?OK:INK);
 g.strokeStyle=LINE;g.lineWidth=2;g.beginPath();g.moveTo(C.x,C.y);g.lineTo(C.x,C.y+C.h);g.lineTo(C.x+C.w,C.y+C.h);g.stroke();
 [40,50,60,70,80].forEach(v=>{word(g,v,C.x-6,yOf(v),10,SOFT,'right');g.strokeStyle='#e2e8f0';g.lineWidth=1;g.beginPath();g.moveTo(C.x+1,yOf(v));g.lineTo(C.x+C.w,yOf(v));g.stroke()});
 const bw=C.w/DIST.length;DIST.forEach((d,i)=>{const v=i<4?dB(d):S.gv,x=C.x+i*bw+bw*.18,w=bw*.64;g.fillStyle=i<4?WAVE:(S.gOk?OK:'#7c3aed');A.paint.rrect(x,yOf(v),w,C.y+C.h-yOf(v),4);g.fill();
  word(g,`${v}`,x+w/2,yOf(v)-u(10),11,i<4?INK:'#6d28d9');word(g,`${d} m`,x+w/2,C.y+C.h+u(14),11,SOFT)});
 word(g,'dB',C.x-6,C.y-u(10),10,SOFT,'right')}
 const barR=()=>{const C=chart(),bw=C.w/DIST.length;return{x:C.x+4*bw,y:C.y-10,w:bw,h:C.h+20}};
 function setBar(v){if(S.gOk)return;S.gv=Math.max(40,Math.min(84,Math.round(v/2)*2));S.msg='';refresh()}
 function checkBar(){if(S.gOk)return;const v=S.gv;
 if(v===56){S.gOk=true;yes('80, 74, 68, 62, 56: each doubling of distance takes off 6 dB. Fainter and fainter, but it does not suddenly stop.');return refresh()}
 if(v>=62)return nope(v>62?'Louder than at 8 m? Further away is always fainter.':'The same as at 8 m? Moving further away makes it fainter still.');
 if(v<=44)return nope('Sound fades bit by bit. It does not drop to almost nothing just because you moved further.');
 nope(`Look at the steps: 80 → 74 → 68 → 62. Each one is 6 less. ${v} does not fit the pattern.`)}
 // ---- 3. spreading rings: the same shake spreads round a bigger ring, so less reaches the ear
 const centre=()=>({x:A.W*.22,y:A.H*.5}),r0=()=>Math.min(A.W*.11,A.H*.1);
 function drawRings(g){const C=centre(),R=r0();topline(g,S.seen.length<3?'Tap each ring to see how much shake reaches the ear.':'Same shake, bigger ring: less of it reaches each ear.',S.seen.length<3?INK:OK);
 drum(g,C.x,C.y-u(8),u(11));
 RINGS.forEach((m,i)=>{const r=R*m*1.25,on=S.seen.includes(i);g.strokeStyle=on?WAVE:LINE;g.lineWidth=on?3:1.5;g.beginPath();g.arc(C.x,C.y,r,-.8,.8);g.stroke();const dr=Math.max(1.5,Math.min(4,r*1.6/23*.4));
  for(let k=0;k<24;k++){const a=-.8+k*1.6/23,inEar=Math.abs(Math.sin(a)*r)<u(16)&&Math.cos(a)>0;g.fillStyle=inEar&&on?NO:on?WAVE:'#94a3b8';g.beginPath();g.arc(C.x+Math.cos(a)*r,C.y+Math.sin(a)*r,on?dr:dr*.75,0,7);g.fill()}
  const ex=C.x+r;g.strokeStyle=on?NO:LINE;g.lineWidth=2;g.strokeRect(ex-u(6),C.y-u(16),u(12),u(32));
  if(on)word(g,`Ring ${i+1}: ${S.catch[i]} dots in the ear`,12,A.H*.2+i*u(15),11,NO,'left')});
 word(g,'ear',C.x+R*5,C.y-u(24),10,SOFT)}
 function earCount(i){const r=r0()*RINGS[i]*1.25;let n=0;for(let k=0;k<24;k++){const a=-.8+k*1.6/23;if(Math.abs(Math.sin(a)*r)<u(16)&&Math.cos(a)>0)n++}return n}
 function seeRing(i){if(S.seen.includes(i))return nope('You looked at that ring already. Try another one.');S.seen.push(i);S.catch[i]=earCount(i);
 const n=S.seen.length;if(n<3){S.bad=false;S.msg=`Ring ${i+1}: ${S.catch[i]} of the 24 dots reach the ear.`;A.sound.pop()}else yes('Every ring carries the same 24 dots of shake, but a bigger ring spreads them out, so the far ear gets fewer.');refresh()}
 // ---- 4. soft and hard hits: tap the farthest mark where each is still heard over the playground (58 dB line)
 const hitR=()=>({x:A.W*.1,y:A.H*.42,w:A.W*.8});
 const hx=i=>hitR().x+i/(DIST.length-1)*hitR().w;
 function drawHits(g){const h=HITS[S.hi];topline(g,h?`A ${h[0]}: tap the farthest place you can still hear it.`:'A harder hit is heard further, but it still fades.',h?INK:OK);
 const R=hitR();g.strokeStyle=LINE;g.lineWidth=2;g.beginPath();g.moveTo(R.x,R.y);g.lineTo(R.x+R.w,R.y);g.stroke();
 DIST.forEach((d,i)=>{const x=hx(i);g.beginPath();g.arc(x,R.y,u(13),0,7);g.fillStyle=S.pick===i?'#ede9fe':CARD;g.fill();g.strokeStyle=LINE;g.stroke();word(g,`${d} m`,x,R.y+u(26),11,SOFT);
  if(h){const v=dB(d,h[1]);word(g,`${v}`,x,R.y,10,v>=LINE58?OK:NO)}});
 split(g,'Playground noise: you hear the drum only if it reads 58 dB or more.',A.W-30,11).forEach((l,k,a)=>word(g,l,A.W/2,R.y-u(34)+(k-(a.length-1))*u(14),11,SOFT));
 S.found.forEach(([n,i],k)=>word(g,`${n}: heard up to ${DIST[i]} m`,A.W/2,R.y+u(52)+k*u(17),12,OK))}
 function pickMark(i){const h=HITS[S.hi];if(!h)return;S.pick=i;const v=dB(DIST[i],h[1]);
 if(DIST[i]===h[2]){S.found.push([h[0],i]);S.pick=null;yes(S.hi===0?'The soft hit reads 58 dB at 4 m: just heard. At 8 m it is 52, lost in the noise.':'The hard hit starts at 82 dB, so it is still 58 dB at 16 m. Louder start, heard further.');S.hi++;return refresh()}
 if(v<LINE58)return nope(`At ${DIST[i]} m it reads ${v} dB, under the 58 dB playground noise: too faint to hear. Come closer.`);
 nope(`At ${DIST[i]} m it reads ${v} dB, so you can hear it. Can you still hear it further away?`)}
 // ---- 5. fair test: sort the variables
 const fbinR=i=>{const gap=6,w=(A.W-20-2*gap)/3;return{x:10+i*(w+gap),y:A.H*.5,w,h:u(40)}};
 const fcardR=()=>({x:A.W*.12,y:A.H*.24,w:A.W*.76,h:u(42)});
 function drawFair(g){const f=FCARDS[S.fi];topline(g,f?'Testing: does distance change how loud the drum sounds?':'Change only the distance. Measure with the meter.',f?INK:OK);
 FBINS.forEach((b,i)=>{const r=fbinR(i);panel(g,r,S.drag&&within(S.drag,r)?PICK:CARD,LINE,2.5);split(g,b,r.w-8,12).forEach((l,q,a)=>word(g,l,r.x+r.w/2,r.y+r.h/2+(q-(a.length-1)/2)*u(14),12))});
 let fy=fbinR(0).y+fbinR(0).h+u(14);FBINS.forEach((b,i)=>{const got=S.fdone.filter(k=>FCARDS[k][1]===i).map(k=>FCARDS[k][0]);if(!got.length)return;split(g,`${b}: ${got.join('; ')}`,A.W-30,10).forEach(l=>{word(g,l,A.W/2,fy,10,OK);fy+=u(13)})});
 if(f){const h=fcardR(),r=S.drag?{...h,x:S.drag.x-h.w/2,y:S.drag.y-h.h/2}:h;panel(g,r,'#ede9fe','#6d28d9',3);word(g,f[0],r.x+r.w/2,r.y+r.h/2,13)}}
 function sortF(b){const f=FCARDS[S.fi];if(!f)return;
 if(b===f[1]){yes(b===1?'Distance is the one thing you change.':b===2?'The meter reading is what you measure.':`Keep ${f[0]} the same, or it is not a fair test.`);S.fdone.push(S.fi);S.fi++;return refresh()}
 if(f[1]===0&&b===1)return nope(`If you change ${f[0]} too, you cannot tell whether the distance or that change made the sound fainter.`);
 if(f[1]===1)return nope('Distance is what you are testing, so it is the thing you change.');
 if(f[1]===2)return nope('You do not set the meter reading: you read it to see what happened. It is what you measure.');
 nope(`${f[0][0].toUpperCase()+f[0].slice(1)} is not something you measure. Keep it the same each time.`)}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 const v=stage();if(v==='walk')drawWalk(g);if(v==='graph')drawGraph(g);if(v==='rings')drawRings(g);if(v==='hits')drawHits(g);if(v==='fair')drawFair(g);
 if(v==='chal'){S.gv=56;S.gOk=true;drawGraph(g)}verdict(g);A.fx.draw(g)}

 function refresh(){const v=stage();let s='Challenge.';
 if(v==='walk')s=`Listener ${S.d} metre${S.d>1?'s':''} from the drum. Meter: ${dB(S.d)} decibels. ${S.rec.length} of 4 readings recorded.`;
 if(v==='graph')s=`Bars: 1 m 80, 2 m 74, 4 m 68, 8 m 62. Your 16 m bar: ${S.gv} decibels.`;
 if(v==='rings')s=`Rings looked at: ${S.seen.length} of 3.${S.seen.map(i=>` Ring ${i+1}: ${S.catch[i]} dots reach the ear.`).join('')}`;
 if(v==='hits')s=HITS[S.hi]?`${HITS[S.hi][0]}: pick the farthest distance where it still reads 58 decibels or more.`:'Both hits done.';
 if(v==='fair')s=FCARDS[S.fi]?`Card: ${FCARDS[S.fi][0]}. Keep the same, change, or measure?`:'All five cards sorted.';
 voice((S.msg?S.msg+' ':'')+s);knobs();S.then()}
 function knobs(){if(!pad)return;pad.innerHTML='';const v=stage(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if(v==='walk'&&S.rec.length<4){b('◀ Closer',()=>walk(-1),'Step 1 metre closer to the drum');b('Further ▶',()=>walk(1),'Step 1 metre further from the drum');b('Record reading',record,'Record the sound meter reading here')}
 if(v==='graph'&&!S.gOk){b('Bar down',()=>setBar(S.gv-2),'Lower the 16 metre bar by 2 decibels');b('Bar up',()=>setBar(S.gv+2),'Raise the 16 metre bar by 2 decibels');b('Check',checkBar,'Check the 16 metre bar')}
 if(v==='rings')RINGS.forEach((_,i)=>{if(!S.seen.includes(i))b(`Ring ${i+1}`,()=>seeRing(i),`Look at ring ${i+1}`)});
 if(v==='hits'&&HITS[S.hi])DIST.forEach((d,i)=>b(`${d} m`,()=>pickMark(i),`Still heard at ${d} metres`));
 if(v==='fair'&&FCARDS[S.fi])FBINS.forEach((t,i)=>b(t,()=>sortF(i),`${FCARDS[S.fi][0]}: ${t}`));A.redraw()}
 function down(p){const v=stage();
 if(v==='walk'){const T=track();if(S.rec.length>=4||p.y<T.y-u(50)||p.y>T.y+u(30))return false;const d=Math.max(1,Math.min(8,Math.round((p.x-T.x0)/(T.x1-T.x0)*7)+1));S.d=d;S.dragK=true;S.msg='';refresh();return true}
 if(v==='graph'){if(S.gOk||!within(p,barR()))return false;S.dragB=true;setBar(40+(chart().y+chart().h-p.y)/chart().h*45);return true}
 if(v==='rings'){const C=centre(),dist=Math.hypot(p.x-C.x,p.y-C.y),i=RINGS.findIndex(m=>Math.abs(dist-r0()*m*1.25)<u(14));if(i>=0){seeRing(i);return true}return false}
 if(v==='hits'){if(!HITS[S.hi])return false;const i=DIST.findIndex((_,i)=>Math.hypot(p.x-hx(i),p.y-hitR().y)<u(20));if(i>=0){pickMark(i);return true}return false}
 if(v==='fair'){if(!FCARDS[S.fi])return false;if(within(p,fcardR())){S.drag={x:p.x,y:p.y};return true}const i=[0,1,2].find(i=>within(p,fbinR(i)));if(i!=null){sortF(i);return true}return false}return false}
 function move(p){const v=stage();if(v==='walk'&&S.dragK){const T=track();const d=Math.max(1,Math.min(8,Math.round((p.x-T.x0)/(T.x1-T.x0)*7)+1));if(d!==S.d){S.d=d;refresh()}}
 if(v==='graph'&&S.dragB)setBar(40+(chart().y+chart().h-p.y)/chart().h*45);if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
 function up(p){S.dragK=false;if(S.dragB){S.dragB=false;checkBar();return}if(!S.drag)return;const i=[0,1,2].find(i=>within(p||S.drag,fbinR(i)));S.drag=null;if(i!=null)sortF(i);else A.redraw()}
 const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const later=(fs,gap)=>{const id=++S.run;fs.forEach((f,k)=>setTimeout(()=>{if(id===S.run)f()},k*(A.reduced()?30:gap)))};
 const wipe=()=>{S.run=(S.run||0)+1;Object.assign(S,{then:()=>{},d:1,rec:[],gv:70,gOk:false,seen:[],catch:{},hi:0,pick:null,found:[],fi:0,fdone:[],drag:null,dragK:false,dragB:false,msg:'',bad:false})};
 const steps=[
 {h:'Walk away from the drum',p:'The drum keeps beating the same way. Drag the listener along the path, or use the buttons, and record the sound meter at 4 places.',
 predict:{q:'As you walk away from the drum, the sound…',opts:['gets fainter','gets louder','stays the same, then stops'],ans:0},
 task:'Record 4 readings',show:()=>{steps[0].go();const fs=[record];[2,4,8].forEach(d=>{fs.push(()=>{S.d=d;refresh()});fs.push(record)});later(fs,300)},go:()=>{wipe();refresh();S.then=finish(0,()=>S.rec.length>=4,'The further you are from the drum, the fainter it sounds.')}},
 {h:'Find the pattern',p:'These are the readings at 1, 2, 4 and 8 m. Drag the purple bar, or use the buttons, to show the reading at 16 m. Then press Check.',
 predict:{q:'What will the meter read at 16 m?',opts:['56 dB','62 dB','0 dB'],ans:0},
 task:'Set the 16 m bar',show:()=>{steps[1].go();later([()=>setBar(64),()=>setBar(60),()=>setBar(56),checkBar],300)},go:()=>{wipe();refresh();S.then=finish(1,()=>S.gOk,'Double the distance, and the meter drops by 6 dB.')}},
 {h:'Why it fades',p:'The drum skin shakes the air, and the shake spreads out in every direction. Tap each ring to see how many dots of shake land in the ear.',
 predict:{q:'Why does a far-away drum sound fainter?',opts:['The shake spreads out, so less reaches your ear','The sound gets tired and slows down','Sound stops after a set distance'],ans:0},
 task:'Look at 3 rings',show:()=>{steps[2].go();later([0,1,2].map(i=>()=>seeRing(i)),450)},go:()=>{wipe();refresh();S.then=finish(2,()=>S.seen.length>=3,'The shake spreads over a bigger area, so less of it reaches your ear.')}},
 {h:'Soft hit, hard hit',p:'In a noisy playground you only hear the drum if it reads 58 dB or more. The numbers show the reading at each place.',
 predict:{q:'Does a hard hit still fade as you walk away?',opts:['Yes, but you can hear it further','No, loud sounds do not fade','Yes, and it fades out sooner'],ans:0},
 task:'Find both distances',show:()=>{steps[3].go();later(HITS.map(h=>()=>pickMark(DIST.indexOf(h[2]))),500)},go:()=>{wipe();refresh();S.then=finish(3,()=>S.hi>=HITS.length,'Every sound fades with distance. A louder one is heard further away.')}},
 {h:'Make it a fair test',p:'Drag each card to a box, or tap a box: keep it the same, change it, or measure it.',
 predict:{q:'To test if distance changes loudness, what do you change?',opts:['Only the distance','The distance and how hard you hit','Everything, to be sure'],ans:0},
 task:'Sort 5 cards',show:()=>{steps[4].go();later(FCARDS.map(f=>()=>sortF(f[1])),400)},go:()=>{wipe();refresh();S.then=finish(4,()=>S.fi>=FCARDS.length,'Change one thing, keep the rest the same, and measure.')}},
 {h:'Challenge',p:'',go:()=>{wipe();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.then()});
 // challenge: each wrong answer names its slip
 const Q=[['Mia walks from 2 m to 10 m away from a radio. What happens to the sound she hears?','It gets fainter',[['It gets louder','louder'],['It stays the same','same']]],
 ['Why is a far-off sound fainter?','Its shake has spread out, so less reaches the ear',[['The sound has worn out and slowed down','tired'],['The sound has turned into light','light']]],
 ['A meter reads 70 dB at 1 m. What could it read at 4 m?','58 dB',[['82 dB','up'],['70 dB','flat']]],
 ['A drum is hit harder. What happens far away?','It is still fainter far away, but heard further',[['It no longer fades with distance','nofade'],['It fades out sooner','sooner']]],
 ['Ben tests loudness at 1 m and 5 m, but hits harder at 5 m. What is wrong?','He changed two things, so it is not fair',[['Nothing: hitting harder is fine','fair'],['He should not use a meter','meter']]],
 ['Which sound is likely to be the faintest to you?','A bell 50 m away',[['The same bell 5 m away','near'],['The same bell right next to you','near']]]];
 function slip(tag){let m='Think: how far is the listener from the sound, and what changed?';
 if(tag==='louder')m='Moving away never makes the same sound louder: the further away, the fainter.';
 if(tag==='same')m='The meter drops as you move away, so the sound gets fainter.';
 if(tag==='tired')m='Sound does not get tired or slow down. Its shake spreads out over a bigger area.';
 if(tag==='light')m='Sound stays sound: the shake of the air just spreads out and gets weaker.';
 if(tag==='up')m='Further away is fainter, so the reading must go down, not up.';
 if(tag==='flat')m='The reading drops as you move away: 70 at 1 m, 64 at 2 m, 58 at 4 m.';
 if(tag==='nofade')m='Loud sounds fade too. A hard hit just starts louder, so you hear it further away.';
 if(tag==='sooner')m='A louder start means it stays above the noise for longer, so you hear it further away, not less far.';
 if(tag==='fair')m='If he hits harder at 5 m, he changed two things. Keep the hit the same and change only distance.';
 if(tag==='meter')m='A sound meter is a good way to measure. The problem is that he changed two things.';
 if(tag==='near')m='The nearer you are, the louder it sounds. The bell far away is the faintest.';
 return m}
 let qn=-1,streak=0;
 function pose(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>score(tag,ans)});voice('Challenge: '+q);A.redraw()}
 function score(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;knobs()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}});
 A.start()})})();
