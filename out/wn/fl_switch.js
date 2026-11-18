/* Flagship: How switches work (ages 8-9; NC Y4 Electricity: a switch opens and closes a circuit). Inside a switch,
   a paper-clip switch, one switch in three places, two switches in one loop, and switches at home.
   Not flagcdiag (symbols), flagcond (materials) or flagseries (series and parallel). */
(()=>{
VIS.reg('flagswitch',c=>{let A,row,box,qi=-1,ver=0;const K={};
const DARK='#111827',CARDB='#f8fafc',ON='#047857',OFF='#b91c1c',WIRE='#b45309',METAL='#64748b',LIT='#fde047';
const stage=()=>['inside','clip','where','two','home','chal'][A.step];
const cl=(v,a,b)=>v<a?a:v>b?b:v;
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let fs=o.f||(A.narrow?12:15);g.font=`700 ${fs}px system-ui`;while(fs>10&&g.measureText(t).width>(o.w||A.W)-16){fs--;g.font=`700 ${fs}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(t).width+18),h=fs*1.8,bx=cl(x-w/2,3,A.W-w-3);g.fillStyle=CARDB;A.paint.rrect(bx,y-h/2,w,h,10);g.fill();g.lineWidth=o.edge?2.5:1.2;g.strokeStyle=o.edge||'#64748b';g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,bx+w/2,y+1)}
/* the loop: a rectangle of wire; u runs clockwise from the top-left corner */
const R=()=>({x0:A.W*.16,x1:A.W*.84,y0:A.H*.24,y1:A.H*.76});
function at(u){const r=R(),w=r.x1-r.x0,h=r.y1-r.y0,P=2*(w+h);let d=((u%1)+1)%1*P;if(d<w)return[r.x0+d,r.y0];d-=w;if(d<h)return[r.x1,r.y0+d];d-=h;if(d<w)return[r.x1-d,r.y1];d-=w;return[r.x0,r.y1-d]}
function wires(){const g=A.ctx,r=R();g.strokeStyle=WIRE;g.lineWidth=5;g.strokeRect(r.x0,r.y0,r.x1-r.x0,r.y1-r.y0)}
function charges(flow){const g=A.ctx;for(let i=0;i<18;i++){const[x,y]=at(i/18+K.s);g.fillStyle=flow?'#facc15':'#cbd5e1';g.beginPath();g.arc(x,y,4.5,0,7);g.fill();g.strokeStyle=DARK;g.lineWidth=1;g.stroke()}}
function cell(x,y){const g=A.ctx,w=26,h=A.H*.2;g.fillStyle='#1f2937';g.fillRect(x-w/2,y-h/2,w,h);g.strokeStyle='#cbd5e1';g.lineWidth=2;g.strokeRect(x-w/2,y-h/2,w,h);g.fillStyle='#f59e0b';g.fillRect(x-w/2,y-h/2,w,h*.28);g.fillStyle='#fff';g.font='700 14px system-ui';g.textAlign='center';g.textBaseline='middle';g.fillText('+',x,y-h*.36);g.fillText('−',x,y+h*.36)}
function bulb(x,y,lit){const g=A.ctx,r=A.H*.075;if(lit){g.fillStyle=A.alpha(LIT,.45);g.beginPath();g.arc(x,y,r*2,0,7);g.fill()}g.fillStyle=lit?LIT:'#e2e8f0';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
 g.beginPath();g.moveTo(x-r*.5,y+r*.3);g.lineTo(x-r*.2,y-r*.3);g.lineTo(x+r*.2,y+r*.3);g.lineTo(x+r*.5,y-r*.3);g.stroke()}
function buzzer(x,y,on){const g=A.ctx,r=A.H*.07;g.fillStyle='#334155';g.beginPath();g.arc(x,y,r,Math.PI,0);g.lineTo(x+r,y+r*.35);g.lineTo(x-r,y+r*.35);g.closePath();g.fill();g.strokeStyle=DARK;g.lineWidth=2;g.stroke();
 if(on){g.strokeStyle='#f97316';g.lineWidth=3;for(let i=1;i<3;i++){g.beginPath();g.arc(x,y,r+i*9,-2.4,-.7);g.stroke()}}}
/* a switch at (x,y) along angle a: two contacts and a metal lever that touches the far one when closed */
function sw(x,y,a,closed,big){const g=A.ctx,s=big?A.W*.12:A.W*.055;g.save();g.translate(x,y);g.rotate(a);g.fillStyle=CARDB;g.fillRect(-s-6,-s*.9,2*s+12,s*1.1);
 g.strokeStyle=WIRE;g.lineWidth=5;g.beginPath();g.moveTo(-s-6,0);g.lineTo(-s,0);g.moveTo(s,0);g.lineTo(s+6,0);g.stroke();
 g.fillStyle=DARK;[-s,s].forEach(px=>{g.beginPath();g.arc(px,0,big?7:5,0,7);g.fill()});const t=closed?0:-.55;g.strokeStyle=METAL;g.lineWidth=big?9:5;g.lineCap='round';g.beginPath();g.moveTo(-s,0);g.lineTo(-s+Math.cos(t)*2*s,Math.sin(t)*2*s);g.stroke();g.lineCap='butt';g.restore()}
/* ---- 1: inside a switch ---- */
function drawInside(){const r=R(),on=K.closed;wires();charges(on);cell(r.x0,(r.y0+r.y1)/2);bulb(A.W*.6,r.y0,on);sw(A.W*.5,r.y1,0,on,true);
 pill(on?'Closed: the strip touches the contact':'Open: there is a gap',A.W/2,A.H*.08,{edge:on?ON:OFF,w:A.W*.8});pill(`Closed ${K.nC} · Opened ${K.nO}`,A.W/2,A.H*.93,{edge:K.nC&&K.nO?ON:'#64748b'})}
function toggle(v){const was=K.closed;K.closed=v==null?!K.closed:v;if(was===K.closed)return say('It is already '+(K.closed?'closed.':'open.'));A.sound[K.closed?'pop':'tick']();
 if(K.closed)K.nC++;else K.nO++;say(K.closed?'Closed. The metal strip touches the contact, the loop is complete, and charges move all the way round at once. The bulb lights.':'Open. The strip lifts, leaving a gap of air. Every charge in the loop stops at the same moment, not just the ones past the gap. The bulb goes off.')}
/* ---- 2: paper-clip switch ---- */
const pinA=()=>[A.W*.36,A.H*.5],pinB=()=>[A.W*.64,A.H*.5],touch=()=>Math.abs(K.ang)<.09;
function drawClip(){const g=A.ctx,[ax,ay]=pinA(),[bx,by]=pinB(),on=touch(),len=bx-ax+14;g.fillStyle='#fde68a';A.paint.rrect(A.W*.2,A.H*.3,A.W*.6,A.H*.4,12);g.fill();g.strokeStyle=DARK;g.lineWidth=1.5;g.stroke();
 g.strokeStyle=WIRE;g.lineWidth=4;g.beginPath();g.moveTo(ax,ay);g.lineTo(ax,A.H*.84);g.lineTo(A.W*.1,A.H*.84);g.lineTo(A.W*.1,A.H*.16);g.lineTo(A.W*.5,A.H*.16);g.moveTo(A.W*.9,A.H*.16);g.lineTo(A.W*.9,A.H*.84);g.lineTo(bx,A.H*.84);g.lineTo(bx,by);g.stroke();
 cell(A.W*.1,A.H*.5);buzzer(A.W*.7,A.H*.16,on);g.strokeStyle=WIRE;g.beginPath();g.moveTo(A.W*.5,A.H*.16);g.lineTo(A.W*.62,A.H*.16);g.moveTo(A.W*.78,A.H*.16);g.lineTo(A.W*.9,A.H*.16);g.stroke();
 g.save();g.translate(ax,ay);g.rotate(K.ang);g.strokeStyle=METAL;g.lineWidth=4;A.paint.rrect(-8,-9,len,18,9);g.stroke();A.paint.rrect(-2,-4,len-14,8,4);g.stroke();g.restore();
 [[ax,ay],[bx,by]].forEach(([x,y])=>{g.fillStyle='#dc2626';g.beginPath();g.arc(x,y,8,0,7);g.fill();g.strokeStyle=DARK;g.stroke()});
 pill(on?'Clip touching both pins: BZZZ':'Clip off the pin: silent',A.W/2,A.H*.08,{edge:on?ON:OFF,w:A.W*.8});pill(`Buzzes: ${K.buzz} of 3`,A.W/2,A.H*.93,{edge:K.buzz>=3?ON:'#64748b'})}
function setAng(a,quiet){const was=touch();K.ang=cl(a,-1.2,0);const now=touch();if(now)K.ang=0;if(now&&!was){K.buzz++;A.sound.pop()}if(quiet&&now===was)return A.redraw();
 say(now?`The metal clip bridges the two pins and closes the gap. The buzzer sounds (${K.buzz} of 3).`:'The clip swings off the second pin. Gap open, buzzer silent.')}
/* ---- 3: one switch, three places ---- */
const SLOT=()=>{const r=R();return[[A.W*.36,r.y0,0,'before the bulb'],[r.x1,(r.y0+r.y1)/2,Math.PI/2,'after the bulb'],[A.W*.5,r.y1,Math.PI,'next to the battery']]};
function drawWhere(){const r=R(),on=K.closed,sl=SLOT();wires();charges(on);cell(r.x0,(r.y0+r.y1)/2);bulb(A.W*.62,r.y0,on);
 sl.forEach(([x,y,a],i)=>{if(i===K.pos)sw(x,y,a,on,false);else{const g=A.ctx;g.strokeStyle=DARK;g.setLineDash([4,4]);g.lineWidth=2;g.strokeRect(x-18,y-18,36,36);g.setLineDash([])}});
 pill(`Switch ${sl[K.pos][3]}`,A.W/2,A.H*.08,{edge:'#1d4ed8'});pill('Turned off from: '+(['before','after','battery'].filter((n,i)=>K.off[i]).join(', ')||'none yet'),A.W/2,A.H*.93,{w:A.W*.92,edge:K.off.every(Boolean)?ON:'#64748b'})}
function place(i){if(i===K.pos)return;K.pos=i;K.closed=true;A.sound.tick();say(`Switch moved ${SLOT()[i][3]}, and closed. The bulb is on.`)}
function flipWhere(){K.closed=!K.closed;A.sound[K.closed?'pop':'tick']();if(!K.closed)K.off[K.pos]=1;
 say(K.closed?'Closed again. The bulb lights.':`Opened ${SLOT()[K.pos][3]}. The bulb goes off. A gap anywhere in the loop stops the current everywhere.`)}
/* ---- 4: two switches ---- */
function drawTwo(){const r=R(),on=K.a&&K.b;wires();charges(on);cell(r.x0,(r.y0+r.y1)/2);bulb(r.x1,(r.y0+r.y1)/2,on);sw(A.W*.42,r.y0,0,K.a,false);sw(A.W*.5,r.y1,Math.PI,K.b,false);
 const g=A.ctx;g.fillStyle=DARK;g.font=`700 ${A.narrow?12:14}px system-ui`;g.textAlign='center';g.fillText('A',A.W*.42,r.y0-A.W*.07);g.fillText('B',A.W*.5,r.y1+A.W*.08);
 pill(`Tried ${Object.keys(K.seen).length} of 4 ways`,A.W/2,A.H*.08,{edge:Object.keys(K.seen).length>3?ON:'#64748b'});pill(on?'Both closed: the bulb is on':'A gap somewhere: off',A.W/2,A.H*.93,{edge:on?ON:OFF})}
function flipAB(k){K[k]=!K[k];K.seen[(K.a?'A':'a')+(K.b?'B':'b')]=1;A.sound.tick();const on=K.a&&K.b;
 say(`A is ${K.a?'closed':'open'}, B is ${K.b?'closed':'open'}. ${on?'Both gaps are closed, so the bulb lights.':'At least one gap is open, so no current flows and the bulb is off.'}`)}
/* ---- 5: switches at home ---- */
const col=i=>A.W*(.18+i*.32);
function drawHome(){const g=A.ctx,y=A.H*.5,s=A.W*.11;['Light switch','Doorbell','Door mat'].forEach((n,i)=>{const x=col(i);g.fillStyle=CARDB;A.paint.rrect(x-s*1.35,A.H*.17,s*2.7,A.H*.66,10);g.fill();g.strokeStyle='#64748b';g.lineWidth=1.2;g.stroke();
  g.fillStyle=DARK;g.font=`700 ${A.narrow?11:14}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(n,x,A.H*.21)});
 const lx=col(0);bulb(lx,A.H*.4,K.light);g.fillStyle='#e2e8f0';g.fillRect(lx-s*.4,y,s*.8,s*1.1);g.strokeStyle=DARK;g.strokeRect(lx-s*.4,y,s*.8,s*1.1);g.fillStyle='#94a3b8';g.fillRect(lx-s*.25,K.light?y+s*.6:y+s*.12,s*.5,s*.38);
 const bx=col(1);buzzer(bx,A.H*.41,K.ring>0);g.fillStyle=K.ring>0?'#16a34a':'#475569';g.beginPath();g.arc(bx,y+s*.5,s*.35,0,7);g.fill();g.strokeStyle=DARK;g.stroke();
 const mx=col(2),my=A.H*.66;g.fillStyle='#a16207';g.fillRect(mx-s,my,s*2,s*.35);g.fillStyle=K.mat?'#16a34a':'#94a3b8';g.fillRect(mx-s*.9,my-(K.mat?2:6),s*1.8,3);g.fillRect(mx-s*.9,my+s*.35-3,s*1.8,3);buzzer(mx,A.H*.41,K.mat);
 g.fillStyle='#1e3a8a';A.paint.rrect(K.fx-s*.45,K.fy-s*.25,s*.9,s*.5,s*.2);g.fill();
 pill([K.light&&'light on',K.rang&&'bell rung',K.alarm&&'alarm set off'].filter(Boolean).join(' · ')||'Work all three switches',A.W/2,A.H*.08,{w:A.W*.92,edge:K.light&&K.rang&&K.alarm?ON:'#64748b'});
 pill(K.ring>0?'Push switch held closed':K.mat?'Mat pressed: foil sheets touch':K.light?'Rocker switch stays closed':'All switches open',A.W/2,A.H*.93,{w:A.W*.92})}
function lightSw(){K.light=!K.light;A.sound.tick();say(K.light?'Click. The switch closes the gap in the loop inside the wall and stays closed. Light on.':'Click. The switch opens the gap, and the light goes off.')}
function bell(){if(K.ring>0)return;K.ring=1.2;K.rang=1;A.sound.pop();A.kick();say('Ding dong! A push switch is closed only while pressed. A spring opens it when you let go.')}
function step(on){if(on===K.mat)return;K.mat=on;const s=A.W*.11;K.fx=on?col(2):col(2)+s*.6;K.fy=on?A.H*.62:A.H*.78;if(on){K.alarm=1;A.sound.pop()}
 say(on?'The foot squashes the mat. Two foil sheets touch, closing the gap: the alarm buzzes.':'Foot off. A soft layer springs the foil apart. Silence.')}
function draw(){const g=A.ctx,k=stage();g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.04:.3);g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){pill('Challenge',A.W/2,A.H*.15,{edge:'#1d4ed8'});pill('Open or closed?',A.W/2,A.H*.5,{f:A.narrow?16:20});return}
 ({inside:drawInside,clip:drawClip,where:drawWhere,two:drawTwo,home:drawHome})[k]()}
function wipe(){ver++;for(const k in K)delete K[k];Object.assign(K,{s:0,closed:false,nC:0,nO:0,ang:-.7,buzz:0,pos:0,off:[0,0,0],a:false,b:false,seen:{},light:false,ring:0,rang:0,mat:false,alarm:0,fx:A.W*.886,fy:A.H*.78,hold:null,chk:()=>{}})}
function say(t){voice(t);A.redraw();pad();K.chk()}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,intro,ok,msg){wipe();voice(intro);pad();K.chk=when(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const v=ver;acts.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},(ms||500)*(j+1)))}
function pad(){if(!row)return;row.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='inside'){B('Close the switch',()=>toggle(true));B('Open the switch',()=>toggle(false))}
 if(k==='clip'){B('Swing the clip onto the pin',()=>setAng(0));B('Swing the clip off',()=>setAng(-.7))}
 if(k==='where'){SLOT().forEach((sl,i)=>B('Put it '+sl[3],()=>place(i),'Move the switch '+sl[3]));B(K.closed?'Open the switch':'Close the switch',flipWhere)}
 if(k==='two'){B(K.a?'Open A':'Close A',()=>flipAB('a'),K.a?'Open switch A':'Close switch A');B(K.b?'Open B':'Close B',()=>flipAB('b'),K.b?'Open switch B':'Close switch B')}
 if(k==='home'){B(K.light?'Light switch off':'Light switch on',lightSw);B('Press the doorbell',bell);B(K.mat?'Step off the mat':'Step on the mat',()=>step(!K.mat))}}
function down(p){const k=stage(),r=R();
 if(k==='inside'){if(Math.abs(p.x-A.W*.5)<A.W*.16&&Math.abs(p.y-r.y1)<A.H*.16){K.hold={y:p.y};return true}return false}
 if(k==='clip'){const[ax,ay]=pinA();if(Math.hypot(p.x-ax,p.y-ay)<A.W*.4&&p.x>ax){K.hold={clip:1};return true}return false}
 if(k==='where'){const i=SLOT().findIndex(([x,y])=>Math.hypot(p.x-x,p.y-y)<36);if(i<0)return false;if(i!==K.pos){place(i);return false}K.hold={to:null};return true}
 if(k==='two'){if(Math.hypot(p.x-A.W*.42,p.y-r.y0)<40)flipAB('a');else if(Math.hypot(p.x-A.W*.5,p.y-r.y1)<40)flipAB('b');return false}
 if(k==='home'){const s=A.W*.11;if(Math.hypot(p.x-K.fx,p.y-K.fy)<s*.7){K.hold={foot:1};return true}if(Math.abs(p.x-col(0))<s&&p.y>A.H*.45&&p.y<A.H*.75)lightSw();else if(Math.abs(p.x-col(1))<s&&p.y>A.H*.45&&p.y<A.H*.75)bell();return false}return false}
function move(p){const h=K.hold;if(!h)return;if(h.clip){const[ax,ay]=pinA();setAng(Math.atan2(p.y-ay,p.x-ax),true)}else if(h.foot){K.fx=p.x;K.fy=p.y;A.redraw()}else if('to' in h){const i=SLOT().findIndex(([x,y])=>Math.hypot(p.x-x,p.y-y)<40);if(i>=0)h.to=i}}
function up(p){const h=K.hold;K.hold=null;if(!h)return;
 if(h.y!=null)toggle(p&&p.y>h.y+4?true:p&&p.y<h.y-4?false:!K.closed);else if(h.clip)setAng(K.ang);else if(h.foot){const on=Math.abs(K.fx-col(2))<A.W*.13&&Math.abs(K.fy-A.H*.66)<A.H*.1;K.mat=!on;step(on)}else if('to' in h){if(h.to!=null&&h.to!==K.pos)place(h.to);else flipWhere()}}
const steps=[
{h:'Inside a switch',p:'This switch has a metal strip and a metal contact. Drag the strip down to close it, or up to open it. The buttons work too.',
 predict:{q:'The switch is open. What does the bulb do?',opts:['it lights: open means on','it is off: there is a gap','it is dim'],ans:1},task:'Close the switch, then open it',
 show:()=>auto(0,[()=>toggle(true),()=>toggle(false)],900),
 go:()=>open(0,'A cell, a bulb and a big open switch in one loop. The bulb is off.',()=>K.nC&&K.nO,'A closed switch completes the circuit. An open switch breaks it.')},
{h:'A paper-clip switch',p:'A paper clip turns on a drawing pin. Drag the clip round until it touches the other pin, then swing it off. Do it 3 times.',
 predict:{q:'Why can a paper clip make a switch?',opts:['it is bendy','it is metal, so current can flow through it','it is small'],ans:1},task:'Sound the buzzer 3 times',
 show:()=>auto(1,[()=>setAng(0),()=>setAng(-.7),()=>setAng(0),()=>setAng(-.7),()=>setAng(0)],450),
 go:()=>open(1,'A paper clip on a drawing pin, a second pin, a cell and a buzzer. The clip is off the pin.',()=>K.buzz>=3,'Any metal bridge that can open and close a gap is a switch.')},
{h:'Where does it go?',p:'Drag the switch to a dashed box, or use the buttons. In each place, open the switch and watch the bulb.',
 predict:{q:'The switch is after the bulb. You open it. What happens?',opts:['the bulb stays on: the current already got there','the bulb goes off','only half the bulb goes off'],ans:1},task:'Turn the bulb off from all 3 places',
 show:()=>auto(2,[flipWhere,()=>place(1),flipWhere,()=>place(2),flipWhere],500),
 go:()=>{open(2,'A loop with a cell, a bulb and a closed switch before the bulb. Dashed boxes show other places.',()=>K.off.every(Boolean),'In a simple loop a switch works anywhere: one gap stops the current all the way round.');K.closed=true;A.kick()}},
{h:'Two switches',p:'This loop has two switches, A and B. Tap a switch or use the buttons. Try all 4 ways of setting them.',task:'Try all 4 ways',
 show:()=>auto(3,[()=>flipAB('a'),()=>flipAB('b'),()=>flipAB('a'),()=>flipAB('b')],450),
 go:()=>{open(3,'A loop with a cell, a bulb and two open switches, A and B.',()=>Object.keys(K.seen).length>3,'In one loop, every switch must be closed for the bulb to light.');K.seen={ab:1}}},
{h:'Switches at home',p:'Flip the light switch, press the doorbell, and drag the shoe onto the door mat. Each one opens or closes a gap.',task:'Work all three',
 show:()=>auto(4,[lightSw,bell,()=>step(true)],600),
 go:()=>open(4,'A light switch, a doorbell push and a door-mat alarm, all off.',()=>K.light&&K.rang&&K.alarm,'Every switch at home does one job: it opens or closes a gap in a circuit.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.chk()});
const QS=[
 {q:'A switch is open. Is the bulb on?',ans:'No, the gap breaks the circuit',bad:[['Yes, open means on','openon'],['It is on but dim','dim']]},
 {q:'Where can one switch go in a simple loop to control the bulb?',ans:'Anywhere in the loop',bad:[['Only next to the battery','batt'],['Only before the bulb','before']]},
 {q:'What does a switch do?',ans:'It opens or closes a gap in the circuit',bad:[['It makes electricity','makes'],['It stores electricity','stores']]},
 {q:'Why is the moving part inside a switch made of metal?',ans:'Current can flow through metal',bad:[['Metal is strong','strong'],['Metal makes electricity','makes']]},
 {q:'You open a switch after the bulb. Where does the current stop?',ans:'All the way round the loop at once',bad:[['Only after the switch','after'],['It piles up at the gap','pile']]},
 {q:'A loop has a bulb and two switches. When does the bulb light?',ans:'Only when both are closed',bad:[['When either one is closed','either'],['When both are open','openon']]}];
function slip(t){let m='A switch opens or closes a gap. Closed: the loop is complete and current flows. Open: it stops.';
 if(t==='openon')m='Open means there is a gap, so no current can flow. Open is off; closed is on.';
 if(t==='dim')m='Not dim: off. An open gap stops the current completely.';
 if(t==='batt')m='It can go anywhere. One gap anywhere in the loop stops the current all the way round.';
 if(t==='before')m='After the bulb works too. The current cannot flow round any loop with a gap in it.';
 if(t==='makes')m='The cell gives the push. A switch only joins or breaks the path.';
 if(t==='stores')m='Nothing is stored in a switch. It just opens or closes a gap.';
 if(t==='strong')m='Plastic is strong too. The metal matters because current can flow through it.';
 if(t==='after')m='The current stops everywhere at once, even in the wire before the switch.';
 if(t==='pile')m='Nothing piles up. With a gap, the whole loop stops at the same moment.';
 if(t==='either')m='In one loop, one open switch leaves a gap. Both must be closed.';
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],l=[[Q.ans,'ok'],...Q.bad],r=qi%3,ord=l.slice(r).concat(l.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pk=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},pk,v).onclick=()=>judge(t,Q.ans)});voice('Challenge: '+Q.q);A.redraw()}
function judge(t,ans){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();voice(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{box.hidden=Q.step!==5;row.hidden=Q.step===5;pad()},
 init:Q=>{A=Q;const w=c.el('div',{class:'fl-below'},Q.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Switch controls'},w);box=c.el('div',{class:'fl-chal'},Q.below);wipe();
  A.every(dt=>{const k=stage();if(K.ring>0){K.ring=Math.max(0,K.ring-dt);if(!K.ring)say('The button springs back open. The ringing stops.');return true}
   const flow=(k==='inside'&&K.closed)||(k==='where'&&K.closed)||(k==='two'&&K.a&&K.b);if(flow){K.s=(K.s+dt*.12)%1;return true}return false});A.gest({down,move,up});pad()}}).start()})})();
