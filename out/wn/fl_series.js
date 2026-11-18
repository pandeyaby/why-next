/* Flagship: circuit vocabulary (ages 9-11; NC Y4 Electricity, series and parallel). Find six components by name, close
   two gaps to make a complete circuit, open and close a switch, then add a second bulb in series (both dim, one gap
   stops both) and in parallel (each as bright as one, its own branch keeps it on). Every canvas tap has a button twin. */
(()=>{
const PARTS=['cell','buzzer','bulb','motor','battery','switch'],ASK=['bulb','switch','cell','battery','buzzer','motor'];
const JOB={cell:'It gives the push (voltage) that makes current flow.',battery:'Two or more cells joined give a bigger push.',bulb:'It changes electrical energy into light.',
 switch:'It opens and closes a gap in the circuit.',buzzer:'It changes electrical energy into sound.',motor:'It changes electrical energy into movement: it spins.'};
VIS.reg('flagseries',c=>{let A,pad,quiz,qn=-1,streak=0;const K={};
const mode=()=>['name','loop','switch','series','par','chal'][A.step];
const ding=k=>A.sound[k](),both=()=>{A.redraw();keys()};
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const ink=()=>A.col.tx,gold=()=>A.col.dark?'#fde047':'#b45309';
function txt(t,x,y,px,col,w,al){const g=A.ctx;g.font=`${w||800} ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||ink();g.fillText(t,x,y,A.W-12)}
/* the board: cell on the left wire, switch on the top wire, bulb 1 on the right wire, bulb 2 on the bottom wire (series) or on a branch (parallel) */
function geo(){const W=A.W,H=A.H,par=mode()==='par';const L=W*(par?.1:.16),R=W*(par?.52:.78),R2=W*.88,T=H*.2,B=H*.72;
 return{L,R,R2,T,B,M:(T+B)/2,s:Math.min(W*.13,H*.17,64),cellP:{x:L,y:(T+B)/2},swP:{x:(L+R)/2,y:T},aP:{x:R,y:(T+B)/2},bP:par?{x:R2,y:(T+B)/2}:{x:(L+R)/2,y:B},g1:{x:(L+R)/2,y:T},g2:{x:(L+R)/2,y:B}}}
/* brightness of bulb 1 and bulb 2 (0 = off) from the circuit the learner has built */
function lit(){const m=mode();if(m==='loop')return[K.gaps[0]&&K.gaps[1]?1:0,-1];if(m==='switch')return[K.sw?1:0,-1];
 if(m==='series'){if(!K.bB)return[K.outA?0:1,-1];const on=!K.outA&&!K.outB;return[on?.35:0,on?.35:0]}
 if(m==='par')return[K.outA?0:1,K.bB?(K.outB?0:1):-1];return[0,-1]}
function icon(k,x,y,s,lv,out){const g=A.ctx,C=A.col;g.save();g.translate(x,y);g.lineWidth=2.5;g.strokeStyle=ink();
 if(k==='cell'||k==='battery'){const n=k==='cell'?1:2,w=s*.5,h=s*.3;for(let i=0;i<n;i++){const ox=(i-(n-1)/2)*w*1.05;A.paint.rrect(ox-w/2,-h/2,w,h,5);g.fillStyle='#1e3a8a';g.fill();g.stroke();g.fillStyle='#b45309';g.fillRect(ox+w*.18,-h/2+2,w*.3,h-4);g.fillStyle=ink();g.fillRect(ox+w/2,-h*.18,5,h*.36)}
  txt('+',(n*w*.55)+12,-h*.7,13,ink(),800);txt('−',-(n*w*.55)-10,-h*.7,13,ink(),800)}
 if(k==='bulb'){const r=s*.27;if(lv>0){g.fillStyle=A.alpha(C.dark?'#fde047':'#f59e0b',.22+.4*lv);g.beginPath();g.arc(0,-r*.2,r*(1.25+lv*.7),0,7);g.fill()}
  g.fillStyle=lv>0?(lv>.6?'#fde047':'#fcd34d'):C.pn;g.beginPath();g.arc(0,-r*.2,r,0,7);g.fill();g.stroke();g.fillStyle='#64748b';g.fillRect(-r*.5,r*.7,r,r*.55);g.strokeRect(-r*.5,r*.7,r,r*.55);
  g.strokeStyle=lv>0?'#92400e':ink();g.beginPath();g.moveTo(-r*.45,r*.5);g.lineTo(-r*.25,-r*.5);g.lineTo(0,-r*.1);g.lineTo(r*.25,-r*.5);g.lineTo(r*.45,r*.5);g.stroke();if(out){g.strokeStyle=A.col.rd;g.lineWidth=4;g.beginPath();g.moveTo(-r,-r*1.2);g.lineTo(r,r*.8);g.stroke()}}
 if(k==='switch'){const d=s*.32;g.fillStyle=ink();[-d,d].forEach(px=>{g.beginPath();g.arc(px,0,5,0,7);g.fill()});g.lineWidth=4;g.beginPath();g.moveTo(-d,0);g.lineTo(lv?d:d*.55,lv?0:-d*.9);g.stroke()}
 if(k==='buzzer'){const r=s*.22;g.fillStyle='#334155';g.beginPath();g.arc(-r*.3,0,r,0,7);g.fill();g.stroke();g.strokeStyle=ink();[1,1.6].forEach(f=>{g.beginPath();g.arc(-r*.3,0,r*f+6,-.6,.6);g.stroke()})}
 if(k==='motor'){const r=s*.25;g.fillStyle=C.pn;g.beginPath();g.arc(0,0,r,0,7);g.fill();g.stroke();txt('M',0,1,15,ink(),900);g.lineWidth=4;g.beginPath();g.moveTo(r,0);g.lineTo(r+s*.18,0);g.stroke()}
 g.restore()}
function tiles(){const cols=A.narrow?2:3,rows=6/cols,gap=10,w=(A.W-gap*(cols+1))/cols,h=Math.min((A.H*.8-gap*rows)/rows,120);return PARTS.map((p,i)=>({p,i,x:gap+(i%cols)*(w+gap),y:A.H*.16+Math.floor(i/cols)*(h+gap),w,h}))}
function drawName(g,C){const want=ASK[K.ask];txt(want?`Find the ${want}`:'All 6 named!',A.W/2,A.H*.07,17);
 tiles().forEach(t=>{const named=K.named.includes(t.p),on=K.pick===t.i;A.paint.rrect(t.x,t.y,t.w,t.h,12);g.fillStyle=named?A.mix(C.pn,'#86efac',C.dark?.18:.45):C.pn;g.fill();g.lineWidth=on?4:2;g.strokeStyle=on?gold():A.alpha(ink(),.5);g.stroke();
  icon(t.p,t.x+t.w/2,t.y+t.h*.44,Math.min(t.w,t.h*1.4),t.p==='bulb'&&named?1:0,0);txt(named?t.p:`Part ${t.i+1}`,t.x+t.w/2,t.y+t.h-14,13,named?ink():C.mu,800)})}
/* wire segments: c = common, a = bulb 1 path, b = bulb 2 branch */
function wires(G){const{L,R,R2,T,B}=G,m=mode(),S=[['c',L,B,L,T],['c',L,T,R,T],['a',R,T,R,B],['c',R,B,L,B]];if(m==='par')S.push(['b',R,T,R2,T],['b',R2,T,R2,B],['b',R2,B,R,B]);return S}
function drawBoard(g,C){const G=geo(),m=mode(),[a,b]=lit(),flow={c:a>0||b>0,a:a>0,b:b>0};
 wires(G).forEach(([k,x0,y0,x1,y1])=>{g.lineCap='round';g.lineWidth=5;g.strokeStyle=ink();g.setLineDash([]);g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();
  if(flow[k]){const lv=k==='b'?b:k==='a'?a:Math.max(a,b);g.lineWidth=3;g.strokeStyle=gold();g.setLineDash([6,12]);g.lineDashOffset=-K.t*60*(.4+lv);g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.setLineDash([])}});
 const pad2=(p,w,h)=>{g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(p.x-w/2,p.y-h/2,w,h)};
 if(m==='loop')[G.g1,G.g2].forEach((p,i)=>{if(K.gaps[i])return;pad2(p,G.s*.8,16);g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=A.col.rd;A.paint.rrect(p.x-G.s*.42,p.y-20,G.s*.84,40,10);g.stroke();g.setLineDash([]);txt('gap',p.x,p.y,12,ink(),800)});
 pad2(G.cellP,G.s*.4,G.s*.62);g.save();g.translate(G.cellP.x,G.cellP.y);g.rotate(-Math.PI/2);icon('cell',0,0,G.s,0,0);g.restore();txt('cell',G.cellP.x+G.s*.34,G.cellP.y+G.s*.48,12,ink(),800,'left');
 if(m!=='loop'){pad2(G.swP,G.s*.8,24);icon('switch',G.swP.x,G.swP.y+4,G.s,m==='switch'?K.sw:1,0);txt(m==='switch'&&!K.sw?'switch open':'switch closed',G.swP.x,G.swP.y-G.s*.5,12,ink(),800)}
 pad2(G.aP,G.s*.62,G.s*.8);icon('bulb',G.aP.x,G.aP.y,G.s,a,K.outA);txt('bulb 1',G.aP.x+G.s*.3,G.aP.y-G.s*.92,12,ink(),800,'right');
 if(m==='series'||m==='par'){const p=G.bP;if(K.bB){pad2(p,G.s*.62,G.s*.8);icon('bulb',p.x,p.y,G.s,b,K.outB);txt('bulb 2',m==='par'?p.x+G.s*.3:p.x+G.s*.72,m==='par'?p.y-G.s*.92:p.y,12,ink(),800,m==='par'?'right':'left')}
  else{pad2(p,G.s*.8,G.s*.6);g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=gold();A.paint.rrect(p.x-G.s*.4,p.y-G.s*.3,G.s*.8,G.s*.6,10);g.stroke();g.setLineDash([]);txt('+ bulb',p.x,p.y,12,ink(),800)}}
 const words=a<=0&&b<=0?'No current: the circuit is broken':b<0?'Current flows: bulb 1 is lit':a>0&&b>0?(a<1?'Both lit but dim: one path, more resistance':'Both lit, each as bright as one alone'):a>0?'Bulb 1 lit, bulb 2 off':'Bulb 2 lit, bulb 1 off';
 txt(words,A.W/2,A.H*.92,A.narrow?13:15,ink(),800)}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);const m=mode();
 if(m==='name')drawName(g,C);else if(m==='chal'){txt('Series: one path. Parallel: a path each.',W/2,H*.4,16);txt('A gap anywhere in a path stops its current.',W/2,H*.55,14,C.mu,700)}else drawBoard(g,C);A.fx.draw(g)}
function pick(i){if(mode()!=='name'||K.ask>=6)return;const p=PARTS[i],want=ASK[K.ask];if(K.named.includes(p)){tell(`That is the ${p}. You named it already.`);return}
 K.pick=i;if(p!==want){ding('miss');tell(want==='battery'&&p==='cell'?'That is one cell. A battery is two or more cells joined together.':want==='cell'&&p==='battery'?'That is a battery: two cells joined. Find just one cell.':`That is the ${p}. ${JOB[p]} Find the ${want}.`);both();return}
 K.named.push(p);K.ask++;ding('pop');tell(`Yes, the ${p}. ${JOB[p]}`+(K.ask<6?` Now find the ${ASK[K.ask]}.`:' All 6 components named.'));both();K.want()}
function fill(i){if(mode()!=='loop'||K.gaps[i])return;K.gaps[i]=1;ding('pop');tell(K.gaps[0]&&K.gaps[1]?'Both gaps closed. The circuit is complete, so current flows all the way round and the bulb lights.':'One gap closed, but the bulb is still off. Any gap stops the current. Close the other gap.');both();K.want()}
function flip(){if(mode()!=='switch')return;K.sw=!K.sw;if(K.sw)K.on=1;else if(K.on)K.off=1;ding('tick');tell(K.sw?'Switch closed: the gap is bridged, the circuit is complete and the bulb lights.':'Switch open: it makes a gap, so the circuit is broken and the bulb goes off.');both();K.want()}
function addB(){const m=mode();if((m!=='series'&&m!=='par')||K.bB)return;K.bB=1;K.outA=K.outB=0;ding('pop');
 tell(m==='series'?'Bulb 2 is in series: one path through both bulbs. More resistance, so less current, and both bulbs are dim.':'Bulb 2 is in parallel, on its own branch. Each branch gets the full push of the cell, so both bulbs are as bright as one alone.');both();K.want()}
function screw(w){const m=mode();if(m!=='series'&&m!=='par')return;if(w==='b'&&!K.bB)return addB();const k=w==='a'?'outA':'outB';K[k]=K[k]?0:1;ding('tick');
 const[a,b]=lit(),n=w==='a'?1:2;let t=K[k]?`Bulb ${n} unscrewed. `:`Bulb ${n} back in. `;
 if(K[k])t+=m==='series'&&K.bB?'That makes a gap in the only path, so the other bulb goes out too.':m==='par'&&K.bB?`The other bulb stays on: its own branch is still complete.`:'That makes a gap, so the bulb is off.';
 else t+=a>0||b>0?'The path is complete again.':'';tell(t);both();K.want()}
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<r;
function down(p){const m=mode();if(m==='name'){const t=tiles().find(t=>p.x>=t.x&&p.x<=t.x+t.w&&p.y>=t.y&&p.y<=t.y+t.h);if(t)pick(t.i);return false}
 const G=geo(),r=Math.max(G.s*.6,30);if(m==='loop'){[G.g1,G.g2].forEach((q,i)=>{if(near(p,q,r))fill(i)});return false}
 if(m==='switch'&&near(p,G.swP,r))flip();if(m==='series'||m==='par'){if(near(p,G.aP,r))screw('a');else if(near(p,G.bP,r))screw('b')}return false}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},pad,t).onclick=f};
 if(m==='name')PARTS.forEach((p,i)=>{if(!K.named.includes(p))b(`Part ${i+1}`,()=>pick(i),`Part ${i+1}: choose it as the ${ASK[K.ask]||''}`)});
 if(m==='loop')['top','bottom'].forEach((w,i)=>{if(!K.gaps[i])b(`Close the ${w} gap`,()=>fill(i))});
 if(m==='switch')b(K.sw?'Open the switch':'Close the switch',flip);
 if(m==='series'||m==='par'){if(!K.bB)b(m==='series'?'Add bulb 2 in series':'Add bulb 2 on a branch',addB);else{b(K.outA?'Screw in bulb 1':'Unscrew bulb 1',()=>screw('a'));b(K.outB?'Screw in bulb 2':'Unscrew bulb 2',()=>screw('b'))}}}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(n,acts,ms){steps[n].go();const k=++K.run;acts.forEach((f,j)=>setTimeout(()=>{if(k===K.run)f()},A.reduced()?30*(j+1):(j+1)*(ms||450)))}
function fresh(){const run=(K.run||0)+1,t=K.t||0;for(const x in K)delete K[x];Object.assign(K,{run,t,want:()=>{},named:[],ask:0,pick:-1,gaps:[0,0],sw:0,on:0,off:0,bB:0,outA:0,outB:0})}
const steps=[
{h:'Name the parts',p:'Each part of a circuit is called a component. A cell gives the push. A battery is two or more cells joined together. A bulb, a buzzer and a motor change electrical energy into light, sound and movement.',
 predict:{q:'Is a battery the same thing as a cell?',opts:['Yes, two names for one thing','No: a battery is two or more cells joined','No: a battery is a kind of bulb'],ans:1},task:'Find all 6 components as they are named',
 show:()=>auto(0,ASK.map(p=>()=>pick(PARTS.indexOf(p))),380),
 go:()=>{fresh();tell('Find the bulb. Tap its picture, or press its part number.');keys();K.want=fin(0,()=>K.ask===6,'You can name 6 components.')}},
{h:'A complete loop',p:'Current only flows when there is a complete circuit: a loop of conductors from one end of the cell, through the bulb, and back to the other end. A gap anywhere breaks the circuit.',
 predict:{q:'One wire joins the bulb to the + end. The − end has a gap. Will the bulb light?',opts:['Yes: one wire is enough','No: it needs a complete loop','Yes, but only dimly'],ans:1},task:'Close both gaps to make a complete circuit',
 show:()=>auto(1,[()=>fill(0),()=>fill(1)]),
 go:()=>{fresh();tell('The circuit has two gaps. Tap a gap to put a wire in.');keys();K.want=fin(1,()=>K.gaps[0]&&K.gaps[1],'A complete circuit: no gaps, so current flows.')}},
{h:'Open and closed',p:'A switch is a gap you control. Closed, its metal bridge joins the circuit and current flows. Open, it makes a gap, so current stops. Open does not mean the electricity can get through.',
 predict:{q:'The switch is open. Will the bulb light?',opts:['Yes: open lets the electricity through','No: open makes a gap'],ans:1},task:'Close the switch, then open it again',
 show:()=>auto(2,[flip,flip]),
 go:()=>{fresh();tell('The switch is open, so the bulb is off. Tap the switch.');keys();K.want=fin(2,()=>K.on&&K.off,'Closed means complete; open means a gap.')}},
{h:'Two bulbs in series',p:'In a series circuit the components sit in one loop, one after the other. Two bulbs add more resistance, so less current flows round and both bulbs are dimmer. A gap anywhere stops all of it.',
 predict:{q:'You add a second bulb in the same loop. How bright are the bulbs?',opts:['Brighter','Just as bright','Dimmer'],ans:2},task:'Add bulb 2 in series, then unscrew one bulb',
 show:()=>auto(3,[addB,()=>screw('a')],700),
 go:()=>{fresh();K.sw=1;tell('One cell, one bulb, all in one loop. Tap the + bulb space to add bulb 2.');keys();K.want=fin(3,()=>K.bB&&(K.outA||K.outB),'Series: one path, so one gap stops every bulb.')}},
{h:'Two bulbs in parallel',p:'In a parallel circuit each bulb has its own branch. Each branch gets the full voltage of the cell, so each bulb is as bright as one bulb alone. The cell must give more current, so it runs down faster.',
 predict:{q:'Bulb 2 gets its own branch. How bright is each bulb?',opts:['Dimmer, like in series','As bright as one bulb alone','Bulb 2 stays off'],ans:1},task:'Add bulb 2 on a branch, then unscrew bulb 1',
 show:()=>auto(4,[addB,()=>screw('a')],700),
 go:()=>{fresh();K.sw=1;tell('Bulb 1 is lit. Tap the + bulb space on the right to add bulb 2 on its own branch.');keys();K.want=fin(4,()=>K.bB&&K.outA&&!K.outB,'Parallel: bulb 2 keeps its own complete path.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['Two bulbs are in series. You unscrew one. What happens to the other?',[['It goes out','ok'],['It stays on','par'],['It gets brighter','bright']]],
 ['Two bulbs are in parallel. You unscrew one. What happens to the other?',[['It stays on','ok'],['It goes out','ser'],['It gets dimmer','dim']]],
 ['What is a battery?',[['Two or more cells joined','ok'],['One cell','cell'],['The bulb holder','part']]],
 ['The switch is open. What does the bulb do?',[['It stays off','ok'],['It lights','open'],['It glows dimly','half']]],
 ['Which component changes electrical energy into movement?',[['A motor','ok'],['A buzzer','sound'],['A bulb','light']]],
 ['You add a second bulb in series. How bright is each bulb now?',[['Dimmer','ok'],['Brighter','more'],['Just as bright','same']]],
 ['A bulb is joined to the + end of a cell only. Does it light?',[['No: the loop is not complete','ok'],['Yes: one wire carries it','oneend'],['Only dimly','half']]]];
function why(t){let m='Trace the path from one end of the cell, round, and back to the other end.';
 if(t==='par')m='That is parallel. In series there is only one path, so one gap stops the current everywhere.';
 if(t==='bright')m='Nothing new pushes the current. With a gap in the only path, the current stops.';
 if(t==='ser')m='That is series. In parallel each bulb has its own branch, and that branch is still complete.';
 if(t==='dim')m='Each parallel branch gets the full push of the cell, so the other bulb stays just as bright.';
 if(t==='cell')m='One is a cell. A battery is two or more cells joined together.';
 if(t==='part')m='A holder only holds the bulb. A battery is cells joined together to give a bigger push.';
 if(t==='open')m='Open makes a gap, like a broken bridge. Current needs a complete circuit.';
 if(t==='half')m='A circuit is either complete or broken. With a gap no current flows, so the bulb is fully off.';
 if(t==='sound')m='A buzzer changes electrical energy into sound. A motor spins.';
 if(t==='light')m='A bulb changes electrical energy into light. A motor gives movement.';
 if(t==='more')m='Two bulbs in one loop add resistance, so less current flows and each is dimmer.';
 if(t==='same')m='That is true in parallel. In series the bulbs share one path, so each is dimmer.';
 if(t==='oneend')m='Current must go out of one end and back into the other. One wire is not a loop.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=(qn*2+1)%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');[...ops.slice(r),...ops.slice(0,r)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;ding('miss')}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down});keys();
  A.every(dt=>{const[a,b]=lit();if((a>0||b>0)&&mode()!=='name'&&!A.reduced()){K.t+=dt;return true}return false})}});
A.start()})})();
