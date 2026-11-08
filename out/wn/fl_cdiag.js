/* Flagship: Reading and drawing circuit diagrams (ages 9–10; NC Year 6 Electricity: use
   recognised symbols when representing a simple circuit in a diagram; on/off position of
   switches; brightness of lamps and volume of buzzers with the number of cells).
   Symbols: cell (long thin line and short thick line), battery (two or more cells joined),
   lamp (circle with a cross), switch (open = gap, closed = joined), buzzer (dome), wire
   (straight line). The learner matches names to symbols, closes a gap with a wire, flips a
   switch, draws a cell + closed switch + buzzer loop by tapping slots, and picks the
   diagram that matches a real circuit with curly wires.
   Distinct from flagseries (component words, series vs parallel) and flagcond (testing
   conductors in a gap): this lab is about reading and drawing standard symbols. */
(()=>{
VIS.reg('flagcdiag',c=>{
let A,pad,qa,q=-1;const S={};
const PAGES=['symbols','gap','switch','draw','match','quiz'];
const NAMES={cell:'cell',battery:'battery (2 cells)',lamp:'lamp',open:'open switch',closed:'closed switch',buzzer:'buzzer',wire:'wire'};
const LOOKS={cell:'long thin line and short thick line',battery:'two pairs of long and short lines',lamp:'circle with a cross',open:'line with a gap, lifted up',buzzer:'dome on a flat base'};
const QUIZORDER=['lamp','cell','open','buzzer','battery'];
const CYCLE=['wire','cell','closed','buzzer','lamp','open'];
const announce=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const page=()=>PAGES[A.step];
function label(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.f||700} ${px}px system-ui,sans-serif`;g.textAlign=o.h||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-14)}
function caption(g,t,y){const px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-18&&rows[n])rows.push(w);else rows[n]=s});
 const k=Math.min(3,rows.length);rows.slice(0,3).forEach((s,j)=>label(s,A.W/2,y+(j-(k-1)/2)*(px+3),px,{f:600}))}
const hue=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
/* draw one component on a horizontal wire from x-w/2 to x+w/2 at height y */
function part(kind,x,y,w,on){const g=A.ctx,C=A.col,L=x-w/2,R=x+w/2;g.strokeStyle=C.tx;g.fillStyle=C.tx;g.lineWidth=3;g.lineCap='round';
 const lead=(a,b)=>{g.beginPath();g.moveTo(a,y);g.lineTo(b,y);g.stroke()};
 if(kind==='wire'){lead(L,R);return}
 if(kind==='gap'){lead(L,x-12);lead(x+12,R);g.setLineDash([3,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(x-10,y);g.lineTo(x+10,y);g.stroke();g.setLineDash([]);return}
 if(kind==='cell'||kind==='battery'){const pair=cx=>{g.lineWidth=2.5;g.beginPath();g.moveTo(cx-4,y-16);g.lineTo(cx-4,y+16);g.stroke();g.lineWidth=6;g.beginPath();g.moveTo(cx+4,y-8);g.lineTo(cx+4,y+8);g.stroke();g.lineWidth=3};
  if(kind==='cell'){lead(L,x-4);lead(x+4,R);pair(x)}else{lead(L,x-14);lead(x-6,x+6);lead(x+14,R);pair(x-10);pair(x+10)}return}
 if(kind==='lamp'){lead(L,x-13);lead(x+13,R);if(on){g.fillStyle=hue('am',.85);g.beginPath();g.arc(x,y,13,0,7);g.fill();g.strokeStyle=C.am;g.lineWidth=2;for(let a=0;a<6.28;a+=.785){g.beginPath();g.moveTo(x+Math.cos(a)*17,y+Math.sin(a)*17);g.lineTo(x+Math.cos(a)*24,y+Math.sin(a)*24);g.stroke()}g.strokeStyle=C.tx;g.lineWidth=3}
  g.beginPath();g.arc(x,y,13,0,7);g.stroke();const d=9.2;g.beginPath();g.moveTo(x-d,y-d);g.lineTo(x+d,y+d);g.moveTo(x+d,y-d);g.lineTo(x-d,y+d);g.stroke();return}
 if(kind==='open'||kind==='closed'){lead(L,x-14);lead(x+14,R);g.beginPath();g.arc(x-14,y,3.5,0,7);g.arc(x+14,y,3.5,0,7);g.fill();g.beginPath();g.moveTo(x-14,y);
  if(kind==='open')g.lineTo(x+11,y-15);else g.lineTo(x+14,y);g.stroke();return}
 if(kind==='buzzer'){lead(L,x-14);lead(x+14,R);g.beginPath();g.moveTo(x-14,y);g.arc(x,y,14,Math.PI,0);g.closePath();if(on){g.fillStyle=hue('vi',.5);g.fill()}g.stroke();
  if(on){g.lineWidth=2;[20,27].forEach(r=>{g.beginPath();g.arc(x,y,r,-2.3,-.84);g.stroke()})}return}}
/* a rectangular loop with parts on the top and bottom sides */
function loop(top,bottom,live){const g=A.ctx,x0=A.narrow?34:A.W*.2,x1=A.W-x0,y0=A.H*.3,y1=A.H*.66,W=x1-x0;
 const lay=(list,y)=>{const n=list.length,seg=W/n;list.forEach((k,i)=>part(k,x0+seg*(i+.5),y,seg,live&&(k==='lamp'||k==='buzzer')))};
 g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0,y1);g.moveTo(x1,y0);g.lineTo(x1,y1);g.stroke();lay(top,y0);lay(bottom,y1);
 return{x0,x1,y0,y1,seg:W/top.length}}
const complete=parts=>!parts.some(k=>k==='gap'||k==='open')&&parts.some(k=>k==='cell'||k==='battery');
/* ---- symbols ---- */
function tile(i){const n=QUIZORDER.length,cols=A.narrow?2:3,w=(A.W-24-(cols-1)*10)/cols,h=A.narrow?64:72,r=Math.floor(i/cols),col=i%cols;return{x:12+col*(w+10),y:A.H*.22+r*(h+10),w,h}}
const TILES=['cell','lamp','open','buzzer','battery'];
function paintSymbols(){const g=A.ctx,C=A.col,want=QUIZORDER[S.qi];
 label(S.qi<QUIZORDER.length?`Tap the symbol for: ${NAMES[want]}`:'All five matched!',A.W/2,A.H*.1,A.narrow?16:18,{c:S.qi<QUIZORDER.length?C.tx:C.gr});
 TILES.forEach((k,i)=>{const b=tile(i),got=S.got.includes(k);g.fillStyle=hue(got?'gr':'cy',got?.35:.14);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  part(k,b.x+b.w/2,b.y+b.h*.45,Math.min(110,b.w-30),false);if(got)label(NAMES[k],b.x+b.w/2,b.y+b.h-12,12,{f:600})})}
function pickSymbol(k){if(S.qi>=QUIZORDER.length)return;const want=QUIZORDER[S.qi];
 if(k!==want)return speak(`That is the ${NAMES[k]} symbol (${LOOKS[k]}). Find the ${NAMES[want]}.`,false);
 S.got.push(k);S.qi++;if(S.qi>=QUIZORDER.length){S.matched=true;return speak('All five matched. Diagrams use these symbols instead of pictures.',true)}
 speak(`Yes: the ${NAMES[k]} is a ${LOOKS[k]}. Next: ${NAMES[QUIZORDER[S.qi]]}.`,true)}
/* ---- gap ---- */
function paintGap(){const top=['cell','lamp'],bot=[S.filled?'wire':'gap','wire'];const on=complete(top.concat(bot));const b=loop(top,bot,on);
 label(on?'Complete circuit: the lamp lights':'Broken circuit: there is a gap',A.W/2,A.H*.12,A.narrow?15:17,{c:on?A.col.gr:A.col.tx});
 if(!S.filled){const p=S.piece||{x:A.W/2,y:A.H*.8};part('wire',p.x,p.y,40,false);label('drag this wire',p.x,p.y+16,12,{f:600,c:A.col.mu})}
 S.gapAt={x:b.x0+(b.x1-b.x0)/4,y:b.y1}}
function fillGap(){if(S.filled)return;S.filled=true;S.piece=null;speak('The gap is closed. The circuit is complete, so the lamp lights.',true)}
/* ---- switch ---- */
function paintSwitch(){const top=['cell',S.closed?'closed':'open'],bot=['lamp','wire'];const on=complete(top.concat(bot));const b=loop(top,bot,on);
 label(S.closed?'Closed switch: the loop is joined':'Open switch: the loop has a gap',A.W/2,A.H*.12,A.narrow?15:17,{c:S.closed?A.col.gr:A.col.tx});
 S.swAt={x:b.x0+b.seg*1.5,y:b.y0};label('tap the switch',S.swAt.x,b.y0-30,12,{f:600,c:A.col.mu})}
function flip(){S.closed=!S.closed;if(S.closed){S.lit=true;return speak('Closed: the switch joins the gap, the circuit is complete and the lamp lights.',true)}
 speak('Open: the switch makes a gap, so the circuit is broken and the lamp goes off.')}
/* ---- draw ---- */
function paintDraw(){const C=A.col,ok=drawOk();const b=loop(S.slots,['wire'],ok);label('Draw: a cell, a closed switch and a buzzer',A.W/2,A.H*.1,A.narrow?14:17);
 S.slotAt=S.slots.map((k,i)=>({x:b.x0+b.seg*(i+.5),y:b.y0}));S.slotAt.forEach((p,i)=>label(`slot ${i+1}`,p.x,p.y-30,12,{f:600,c:C.mu}));
 label(ok?'Done: the buzzer sounds':'Tap a slot to change its symbol',A.W/2,A.H*.76,A.narrow?13:15,{c:ok?C.gr:C.mu})}
function drawOk(){const s=S.slots.slice().sort().join();return s===['buzzer','cell','closed'].sort().join()}
function cycleSlot(i){const k=CYCLE[(CYCLE.indexOf(S.slots[i])+1)%CYCLE.length];S.slots[i]=k;const s=S.slots;
 if(drawOk()){S.drawn=true;return speak(`Cell, closed switch and buzzer in one loop. The order around the loop does not matter.`,true)}
 if(s.includes('open')&&s.includes('cell')&&s.includes('buzzer'))return speak('Nearly: that switch is open, so there is a gap and the buzzer stays silent.',false);
 if(s.includes('lamp')&&!s.includes('buzzer'))return speak(`Slot ${i+1} is now a ${NAMES[k]}. A lamp is a circle with a cross; the buzzer is the dome.`);
 speak(`Slot ${i+1} is now a ${NAMES[k]}.`)}
/* ---- match ---- */
const CHOICES=[{id:'A',top:['battery','closed'],bot:['buzzer']},{id:'B',top:['cell','closed'],bot:['lamp']},{id:'C',top:['battery','open'],bot:['buzzer']}];
function mini(o,bx,by,bw,bh){const g=A.ctx,x0=bx+12,x1=bx+bw-12,y0=by+bh*.28,y1=by+bh*.78;g.strokeStyle=A.col.tx;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,y0);g.lineTo(x0,y1);g.moveTo(x1,y0);g.lineTo(x1,y1);g.stroke();
 const sg=(x1-x0)/o.top.length;o.top.forEach((k,i)=>part(k,x0+sg*(i+.5),y0,sg,false));part(o.bot[0],(x0+x1)/2,y1,x1-x0,false)}
function choiceBox(i){if(A.narrow){const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.5,w,h:A.H*.3}}const w=(A.W-48)/3;return{x:12+i*(w+12),y:A.H*.5,w,h:A.H*.32}}
function paintMatch(){const g=A.ctx,C=A.col;label('Real circuit: 2 cells, switch pressed, buzzer',A.W/2,A.H*.06,A.narrow?13:15);
 const y=A.H*.25,cx=A.W/2;g.fillStyle=hue('am',.4);A.paint.rrect(cx-110,y-16,58,32,6);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();label('2 cells',cx-81,y,12);
 g.fillStyle=hue('cy',.3);A.paint.rrect(cx-20,y-14,40,28,8);g.fill();g.stroke();label('ON',cx,y,12);
 g.fillStyle=hue('vi',.35);g.beginPath();g.arc(cx+82,y,18,0,7);g.fill();g.stroke();label('buzz',cx+82,y,11);
 g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(cx-52,y);g.bezierCurveTo(cx-40,y-40,cx-30,y+34,cx-20,y);g.moveTo(cx+20,y);g.bezierCurveTo(cx+34,y+36,cx+50,y-40,cx+64,y);g.moveTo(cx-110,y+8);g.bezierCurveTo(cx-140,y+70,cx+130,y+80,cx+96,y+12);g.stroke();
 CHOICES.forEach((o,i)=>{const b=choiceBox(i),me=S.choice===o.id;g.fillStyle=hue(me?(o.id==='A'?'gr':'rd'):'cy',me?.3:.1);A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=me?3:1.5;g.stroke();label(o.id,b.x+14,b.y+14,14);mini(o,b.x,b.y,b.w,b.h)})}
function choose(id){S.choice=id;if(id==='A'){S.picked=true;return speak('Diagram A: two cells (a battery), a closed switch and a buzzer. Curly real wires become straight lines.',true)}
 if(id==='B')return speak('Diagram B has one cell and a lamp. The real circuit has two cells and a buzzer.',false);
 speak('Diagram C has an open switch. In the real circuit the switch is pressed on, so it is closed.',false)}
/* ---- frame ---- */
function paint(){const{ctx:g,W,H,col:C}=A,k=page();g.fillStyle=A.mix(C.pn,C.vi,C.dark?.05:.06);g.fillRect(0,0,W,H);
 if(k==='quiz'){label('Read the symbols',W/2,H*.42,A.narrow?17:20);label('Answer below',W/2,H*.55,14,{c:C.mu,f:500});A.fx.draw(g);return}
 ({symbols:paintSymbols,gap:paintGap,switch:paintSwitch,draw:paintDraw,match:paintMatch})[k]();if(S.msg)caption(g,S.msg,H*.91);A.fx.draw(g)}
function speak(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();announce(t);keys();A.redraw();S.after&&S.after()}
function clean(){for(const k in S)delete S[k];Object.assign(S,{qi:0,got:[],filled:false,closed:false,slots:['wire','wire','wire'],choice:null,msg:'',after:()=>{}});A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const k=page();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':lab||t},pad,t).onclick=f};
 if(k==='symbols')TILES.forEach(s=>add(LOOKS[s],()=>pickSymbol(s),`Symbol: ${LOOKS[s]}`));
 if(k==='gap')add('Put a wire in the gap',fillGap);
 if(k==='switch')add(S.closed?'Open the switch':'Close the switch',flip);
 if(k==='draw')[0,1,2].forEach(i=>add(`Slot ${i+1}: ${NAMES[S.slots[i]]} → next`,()=>cycleSlot(i),`Change slot ${i+1}, now ${NAMES[S.slots[i]]}`));
 if(k==='match')CHOICES.forEach(o=>add(`Diagram ${o.id}`,()=>choose(o.id),`Diagram ${o.id}: ${o.top.concat(o.bot).map(x=>NAMES[x]).join(', ')}`))}
const inside=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const close=(p,q,r)=>q&&Math.hypot(p.x-q.x,p.y-q.y)<r;
function touch(p){const k=page();if(k==='quiz')return false;
 if(k==='symbols'){for(let i=0;i<TILES.length;i++)if(inside(p,tile(i))){pickSymbol(TILES[i]);return true}return false}
 if(k==='gap'&&!S.filled){const at=S.piece||{x:A.W/2,y:A.H*.8};if(close(p,at,40)){S.carry=true;return true}if(close(p,S.gapAt,36)){fillGap();return true}return false}
 if(k==='switch'&&close(p,S.swAt,40)){flip();return true}
 if(k==='draw'){for(let i=0;i<3;i++)if(close(p,S.slotAt&&S.slotAt[i],38)){cycleSlot(i);return true}return false}
 if(k==='match'){for(let i=0;i<3;i++)if(inside(p,choiceBox(i))){choose(CHOICES[i].id);return true}}
 return false}
function carry(p){if(S.carry){S.piece={x:p.x,y:p.y};A.redraw()}}
function letgo(p){if(S.carry){S.carry=false;if(p&&close(p,S.gapAt,44))fillGap();else{S.piece=null;A.redraw()}}}
const tick=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function replay(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?20*(j+1):(j+1)*330))}
function prep(i,hint,ok,line){clean();speak(hint);S.after=tick(i,ok,line)}
const steps=[
{h:'Symbols, not pictures',p:'A circuit diagram uses simple symbols for each component. Cell: a long thin line and a short thick line. Lamp: a circle with a cross. Switch: a line that can lift to make a gap. Buzzer: a dome.',
 predict:{q:'Which is the symbol for a lamp (bulb)?',opts:['a drawing of a glass bulb','a circle with a cross in it','a long line and a short line'],ans:1},
 task:'Match all five symbols',show:()=>replay(0,QUIZORDER.map(s=>()=>pickSymbol(s))),
 go:()=>prep(0,'Tap the symbol that matches the name.',()=>S.matched,()=>'Cell, battery, lamp, switch and buzzer matched.')},
{h:'Complete or broken?',p:'Electricity only flows round a complete circuit: an unbroken loop from one end of the cell, through the components, back to the other end. A gap breaks the circuit.',
 predict:{q:'There is a gap in the wire. Will the lamp light?',opts:['yes, the cell still pushes','no, the circuit is broken','yes, but dimly'],ans:1},
 task:'Drag the wire into the gap',show:()=>replay(1,[fillGap]),
 go:()=>prep(1,'Drag the loose wire to the dashed gap, or use the button.',()=>S.filled,()=>'No gap, complete circuit, lamp on.')},
{h:'Open and closed switches',p:'An open switch is drawn lifted, with a gap: the circuit is broken and the lamp is off. A closed switch joins the gap: the lamp lights.',
 predict:{q:'A switch is drawn open. Is the lamp on or off?',opts:['on: open means electricity can get through','off: the open switch makes a gap','half on'],ans:1},
 task:'Close the switch to light the lamp',show:()=>replay(2,[flip]),
 go:()=>prep(2,'Tap the switch to open or close it.',()=>S.lit,()=>'Closed means joined, so the lamp lights.')},
{h:'Draw a circuit',p:'To draw a circuit, use one symbol per component and join them with straight lines into one loop. The wires are drawn with square corners.',
 predict:{q:'In a single loop, where must the switch go?',opts:['right next to the + end of the cell','anywhere in the loop: it works the same','always right next to the lamp'],ans:1},
 task:'Draw a cell, a closed switch and a buzzer',show:()=>replay(3,[()=>cycleSlot(0),()=>cycleSlot(1),()=>cycleSlot(1),()=>cycleSlot(2),()=>cycleSlot(2),()=>cycleSlot(2)]),
 go:()=>prep(3,'Tap a slot to change its symbol.',()=>S.drawn,()=>'A cell, closed switch and buzzer in one loop.')},
{h:'Real circuit to diagram',p:'Real wires bend and curl. A diagram draws them as straight lines. What matters is which components there are, how many cells, and whether the switch is open or closed.',
 predict:{q:'The real wires are long and curly. In the diagram they are…',opts:['drawn curly, just like the real ones','drawn as straight lines','left out'],ans:1},
 task:'Pick the diagram that matches the real circuit',show:()=>replay(4,[()=>choose('A')]),
 go:()=>prep(4,'Count the cells. Check the switch. Lamp or buzzer?',()=>S.picked,()=>'Diagram A matches.')},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['Which symbol is a cell?',[['a long thin line and a short thick line','ok'],['a circle with a cross','mix'],['a dome on a flat base','mix']]],
 ['A diagram shows a cell, an open switch and a lamp. Does the lamp light?',[['no: the open switch makes a gap','ok'],['yes: open lets electricity through','open'],['yes, but only dimly','open']]],
 ['A circle with a cross in it stands for…',[['a lamp','ok'],['a switch','mix'],['a cell','mix']]],
 ['How are wires drawn in a circuit diagram?',[['as straight lines','ok'],['curly, like real wires','real'],['they are not drawn','real']]],
 ['A diagram shows a battery of two cells instead of one, with the same lamp. The lamp is…',[['brighter','ok'],['dimmer','cells'],['the same','cells']]],
 ['There is a gap in the wire next to the lamp. What happens?',[['the lamp stays off: the circuit is broken','ok'],['the lamp lights because the cell is full','gap'],['only half the lamp lights','gap']]],
 ['A cell, a closed switch and a buzzer are in one loop. Does moving the switch to the other side change anything?',[['no: anywhere in a single loop works the same','ok'],['yes: it must be next to the + end','place'],['yes: it must be next to the buzzer','place']]]];
function why(t){let m='Read each symbol, then check: is the loop complete, and is the switch closed?';
 if(t==='mix')m='Match the shapes: cell = long and short lines, lamp = circle with a cross, switch = line with a gap, buzzer = dome.';
 if(t==='open')m='An open switch is a gap. Open means off: the circuit is broken. Closed means on.';
 if(t==='real')m='Diagrams use straight lines for wires. Only the components and their order in the loop matter.';
 if(t==='cells')m='More cells give a bigger push. With the same lamp, two cells make it brighter.';
 if(t==='gap')m='A gap anywhere breaks the circuit. Electricity needs a complete loop.';
 if(t==='place')m='In one loop, the switch breaks or joins the whole loop wherever it sits.';
 return m}
function ask(){q++;const Q=QS[q%QS.length],r=q%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>score(t)});announce('Challenge: '+Q[0]);A.redraw()}
function score(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{clean();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Circuit buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down:touch,move:carry,up:letgo});keys()}});
A.start()})})();
