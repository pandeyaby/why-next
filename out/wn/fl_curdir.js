/* Flagship – conventional current and electron flow (ages 13–15; AQA GCSE Physics 8463 4.2.1 charge and current, diode
   symbol 4.2.1.4; OpenStax College Physics 2e §20.1: conventional current is the direction positive charge would move,
   electrons in a metal drift the opposite way). Drag along each wire to mark conventional current from + to −, then mark
   the electron drift the other way, decide whether an LED lights from its symbol, put the history in order (Franklin's
   + and − before Thomson's electron), and show both pictures give the same current. */
(()=>{
/* wire segments in loop order; flow +1 = from a to b. With + on the left, conventional current runs this way round. */
const SEG=[{n:'top left wire',a:[.42,.24],b:[.17,.24]},{n:'left wire',a:[.17,.24],b:[.17,.8]},{n:'bottom wire',a:[.17,.8],b:[.83,.8]},
 {n:'right wire',a:[.83,.8],b:[.83,.24]},{n:'top right wire',a:[.83,.24],b:[.58,.24]}];
/* LED rounds: + on the left?, LED triangle points right? */
const LED=[[1,1],[1,0],[0,0],[0,1]];
/* history cards, in true order */
const PAST=[['1747','Franklin names charge + and −, and guesses + flows'],['1800','Volta\'s cell gives a steady current'],['1820s','Ampère sets current as + to −'],['1897','Thomson finds the electron: it is −']];
const SHUF=[2,0,3,1];
/* question, right, wrong, why the wrong one is wrong */
const SAME=[['Electrons drift left. Which way is the current?','right','left','Current is the way + charge would go: opposite to the electrons.'],
 ['Switch to the electron picture. Does the ammeter change?','No, same reading','Yes, it flips','Both pictures describe the same flow of charge, so the size of the current is the same.'],
 ['How fast do electrons drift along a wire?','under 1 mm per second','near light speed','The drift is slow; it is the push along the wire (the field) that sets up fast.'],
 ['Why keep conventional current?','Rules and symbols use it, and it works','Electrons go + to −','Electrons go − to +. The convention stays because it gives the same answers.']];
VIS.reg('flagcurdir',c=>{let A,X,ctl,cq,qn=-1,ver=0,press=null,t0=0;const R={};
const WIRE='#1e293b',BOARD='#ffffff',CONV='#b91c1c',ELEC='#1d4ed8',OKC='#15803d',GREY='#64748b',TINT='#f1f5f9';
const z=n=>Math.round(n*(A.narrow?1:1.12)),fz=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const PH=['conv','elec','led','past','same','quiz'],ph=()=>PH[A.step];
const pt=q=>({x:q[0]*A.W,y:q[1]*A.H});
function ground(){X.fillStyle=A.col.dark?'#0b1220':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function label(t,y,good){X.font=fz(14,800);const w=Math.min(A.W-10,X.measureText(t).width+26),h=z(14)+14;X.fillStyle=good?'#dcfce7':BOARD;A.paint.rrect(A.W/2-w/2,y,w,h,h/2);X.fill();X.lineWidth=good?3:1.4;X.strokeStyle=good?OKC:GREY;X.stroke();
 X.fillStyle=WIRE;X.textAlign='center';X.textBaseline='middle';X.fillText(t,A.W/2,y+h/2+1,w-10)}
function card(r,t,o){o=o||{};X.fillStyle=o.bg||BOARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.rim?3.5:1.5;X.strokeStyle=o.rim||GREY;X.stroke();if(t==null)return;
 X.fillStyle=o.ink||WIRE;X.font=fz(o.n||15,o.w);X.textAlign='center';X.textBaseline='middle';const ws=t.split(' '),L=[''];ws.forEach(s=>{const m=L[L.length-1]?L[L.length-1]+' '+s:s;if(X.measureText(m).width>r.w-14&&L[L.length-1])L.push(s);else L[L.length-1]=m});
 const lh=z(o.n||15)*1.22;L.forEach((s,i)=>X.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh))}
/* ---- the circuit: board, wires, cell (+ left or right), lamp or LED ---- */
function circuit(plusLeft,part,ledRight){const b={x:A.W*.04,y:A.H*.09,w:A.W*.92,h:A.H*.86};X.fillStyle=BOARD;A.paint.rrect(b.x,b.y,b.w,b.h,14);X.fill();X.strokeStyle=GREY;X.lineWidth=1.2;X.stroke();
 X.strokeStyle=WIRE;X.lineWidth=3;X.beginPath();SEG.forEach(s=>{const a=pt(s.a),e=pt(s.b);X.moveTo(a.x,a.y);X.lineTo(e.x,e.y)});X.stroke();
 const cx=A.W/2,cy=A.H*.24,L=plusLeft?cx-A.W*.08:cx+A.W*.08,S=plusLeft?cx+A.W*.08:cx-A.W*.08;X.strokeStyle=WIRE;
 X.lineWidth=3;X.beginPath();X.moveTo(A.W*.42,cy);X.lineTo(L,cy);X.moveTo(A.W*.58,cy);X.lineTo(S,cy);X.stroke();
 X.lineWidth=3;X.beginPath();X.moveTo(L,cy-z(22));X.lineTo(L,cy+z(22));X.stroke();X.lineWidth=7;X.beginPath();X.moveTo(S,cy-z(11));X.lineTo(S,cy+z(11));X.stroke();
 X.fillStyle=WIRE;X.font=fz(20,900);X.textAlign='center';X.textBaseline='middle';X.fillText('+',L+(plusLeft?-z(14):z(14)),cy-z(26));X.fillText('−',S+(plusLeft?z(14):-z(14)),cy-z(26));
 const lx=A.W/2,ly=A.H*.8,r=z(16);X.fillStyle=BOARD;X.beginPath();X.arc(lx,ly,r,0,7);X.fill();
 if(part==='led'){X.fillStyle=TINT;X.fillRect(lx-r-2,ly-r,2*r+4,2*r);X.strokeStyle=WIRE;X.lineWidth=2.5;const d=ledRight?1:-1;X.beginPath();X.moveTo(lx-d*r*.7,ly-r*.8);X.lineTo(lx-d*r*.7,ly+r*.8);X.lineTo(lx+d*r*.7,ly);X.closePath();X.stroke();
  X.beginPath();X.moveTo(lx+d*r*.7,ly-r*.8);X.lineTo(lx+d*r*.7,ly+r*.8);X.stroke()}
 else{X.strokeStyle=WIRE;X.lineWidth=2.5;X.beginPath();X.arc(lx,ly,r,0,7);X.stroke();X.beginPath();X.moveTo(lx-r*.7,ly-r*.7);X.lineTo(lx+r*.7,ly+r*.7);X.moveTo(lx+r*.7,ly-r*.7);X.lineTo(lx-r*.7,ly+r*.7);X.stroke()}}
function arrow(s,dir,col,tag,off){const a=pt(s.a),e=pt(s.b),u=dir>0?[e.x-a.x,e.y-a.y]:[a.x-e.x,a.y-e.y],m=Math.hypot(u[0],u[1]),ux=u[0]/m,uy=u[1]/m,f=s.n==='bottom wire'?.25:.5;
 const nx=Math.abs(uy),ny=Math.abs(ux),sg=(off||0)<0?-1:1;let mx=a.x+(e.x-a.x)*f+nx*(off||0),my=a.y+(e.y-a.y)*f+ny*(off||0);const L=z(16);
 X.strokeStyle=col;X.fillStyle=col;X.lineWidth=4;X.beginPath();X.moveTo(mx-ux*L,my-uy*L);X.lineTo(mx+ux*L*.4,my+uy*L*.4);X.stroke();X.beginPath();X.moveTo(mx+ux*L,my+uy*L);X.lineTo(mx+ux*L*.2-uy*L*.6,my+uy*L*.2+ux*L*.6);X.lineTo(mx+ux*L*.2+uy*L*.6,my+uy*L*.2-ux*L*.6);X.closePath();X.fill();
 X.font=fz(13,900);X.textAlign='center';X.textBaseline='middle';X.fillText(tag,mx+nx*sg*z(17)-ux*z(4),my+ny*sg*z(17)-uy*z(4))}
/* ---- steps 1 and 2: drag along the wire ---- */
const want=(k,i)=>(k==='conv'?1:-1)*(R[k].plusLeft?1:-1);
function near(p){let best=-1,bd=z(26);SEG.forEach((s,i)=>{const a=pt(s.a),e=pt(s.b),vx=e.x-a.x,vy=e.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*vx+(p.y-a.y)*vy)/(vx*vx+vy*vy))),d=Math.hypot(a.x+vx*t-p.x,a.y+vy*t-p.y);if(d<bd){bd=d;best=i}});return best}
function drawMark(k){const s=R[k],full=s.mark.every(v=>v);ground();
 label(full&&s.round>=s.rounds?(k==='conv'?'Conventional current: + to −':'Electrons drift: − to +'):`${k==='conv'?'Current':'Electrons'}: drag along each wire (${s.mark.filter(v=>v).length}/5)`,A.H*.02,full&&s.round>=s.rounds);
 circuit(s.plusLeft,'lamp');if(k==='elec')SEG.forEach((g,i)=>arrow(g,want('conv',i),'#f87171','I',-z(12)));
 SEG.forEach((g,i)=>{if(s.mark[i])arrow(g,want(k,i),k==='conv'?CONV:ELEC,k==='conv'?'I':'e⁻',k==='elec'?z(12):0);if(s.miss===i){const a=pt(g.a),e=pt(g.b);X.strokeStyle=CONV;X.lineWidth=6;X.setLineDash([6,6]);X.beginPath();X.moveTo(a.x,a.y);X.lineTo(e.x,e.y);X.stroke();X.setLineDash([])}});
 if(k==='elec'&&full&&!A.reduced()){const per=SEG.map(g=>Math.hypot((g.b[0]-g.a[0])*A.W,(g.b[1]-g.a[1])*A.H)),tot=per.reduce((x,y)=>x+y);for(let j=0;j<10;j++){let d=((j/10)*tot-(t0*40)%tot+tot)%tot,i=0;while(d>per[i]){d-=per[i];i++}
  const a=pt(SEG[i].a),e=pt(SEG[i].b),f=d/per[i];X.fillStyle=ELEC;X.beginPath();X.arc(a.x+(e.x-a.x)*f,a.y+(e.y-a.y)*f,z(5),0,7);X.fill()}}}
function mark(k,i,dir){const s=R[k];if(s.round>=s.rounds||s.mark[i])return;
 if(dir!==want(k,i)){s.miss=i;A.sound.miss();return speak(k==='conv'?`Not that way on the ${SEG[i].n}. Conventional current leaves the + terminal (the long line) and goes round to the − terminal (the short line).`:`That is the conventional current direction. Electrons are negative, so they leave the − terminal (the short line) and drift round to +.`)}
 s.mark[i]=1;s.miss=null;A.sound.pop();
 if(s.mark.every(v=>v)){s.round++;if(s.round<s.rounds){s.plusLeft=!s.plusLeft;s.mark=[0,0,0,0,0];return speak('All 5 marked. Now the cell is turned round: + is on the other side. Mark it again.')}return speak(k==='conv'?'All marked: out of +, round the loop, back into −.':'Electrons drift out of −, round the loop, into +: opposite to the current arrows.')}
 speak(`${SEG[i].n}: ${k==='conv'?'current':'electrons'} marked.`)}
/* ---- step 3: will the LED light? ---- */
function ynKeys(){const w=Math.min(z(150),(A.W-40)/2);return['Lights','Stays off'].map((t,j)=>({t,j,x:A.W/2+(j?10:-w-10),y:A.H*.42,w,h:z(52)}))}
function drawLed(){const s=R.led;ground();if(s.i>=LED.length){label('All 4 LEDs judged',A.H*.02,1);circuit(1,'led',1);SEG.forEach((g,i)=>arrow(g,1,CONV,'I'));card({x:A.W*.2,y:A.H*.42,w:A.W*.6,h:z(46)},'Triangle points with I: lights',{bg:'#dcfce7'});return}
 const [pl,lr]=LED[s.i];label(`Circuit ${s.i+1} of 4: does the LED light?`,A.H*.02);circuit(pl,'led',lr);ynKeys().forEach(b=>card(b,b.t,{rim:s.miss===b.j?CONV:null,n:17,w:800}))}
function judge(j){const s=R.led;if(s.i>=LED.length)return;const [pl,lr]=LED[s.i],lights=pl===lr,ok=lights?0:1,way=pl?'right':'left';
 if(j!==ok){s.miss=j;A.sound.miss();return speak(lights?`Follow I from + : along the bottom it goes ${way}. The triangle points ${way} too, so current passes and the LED lights.`:`Along the bottom, I goes ${way} but the triangle points the other way. Electrons do go that way, but diode symbols are drawn for conventional current, so it stays off.`)}
 s.i++;s.miss=null;A.sound.pop();speak((lights?'Lights: the triangle points along I.':'Stays off: the triangle points against I.')+(s.i>=LED.length?' All 4 done.':''))}
/* ---- step 4: history in order ---- */
function pastCards(){const g=8,h=(A.H*.78-g*3)/4;return SHUF.map((k,j)=>({k,x:A.W*.06,y:A.H*.17+j*(h+g),w:A.W*.88,h}))}
function drawPast(){const s=R.past;ground();label(s.n>=PAST.length?'In order: the + to − rule came first':`Tap the earliest one left (${s.n}/4)`,A.H*.02,s.n>=PAST.length);
 pastCards().forEach((r,j)=>{if(s.n>=PAST.length)r={...r,k:j,y:pastCards()[j].y};const done=s.got.includes(r.k);card(r,(done?`${s.got.indexOf(r.k)+1}. `:'')+`${PAST[r.k][0]}: ${PAST[r.k][1]}`,{bg:done?'#dcfce7':BOARD,rim:s.miss===r.k?CONV:done?OKC:null,n:14})})}
function order(k){const s=R.past;if(s.n>=PAST.length||s.got.includes(k))return;
 if(k!==s.n){s.miss=k;A.sound.miss();return speak(k===3?'The electron came last, in 1897. The + to − rule was set long before anyone knew what moves.':`${PAST[k][0]} is not the earliest left. Look for a smaller year.`)}
 s.got.push(k);s.n++;s.miss=null;A.sound.pop();speak(`${PAST[k][0]}: ${PAST[k][1]}.`+(s.n>=PAST.length?' The rule came 150 years before the electron.':''))}
/* ---- step 5: same current either way ---- */
const sOrd=i=>i%2?[SAME[i][2],SAME[i][1]]:[SAME[i][1],SAME[i][2]];
function sKeys(){const w=A.W-40;return[0,1].map(j=>({j,x:20,y:A.H*(.5+j*.22),w,h:A.H*.18}))}
function drawSame(){const s=R.same;ground();if(s.i>=SAME.length){label('All 4 answered',A.H*.02,1);SAME.forEach((q,i)=>card({x:10,y:A.H*(.14+i*.21),w:A.W-20,h:A.H*.18},`${q[0]} ${q[1]}.`,{bg:'#dcfce7',n:13}));return}
 label(`Question ${s.i+1} of 4`,A.H*.02);card({x:10,y:A.H*.13,w:A.W-20,h:A.H*.3},SAME[s.i][0],{n:17,w:800});sOrd(s.i).forEach((v,j)=>card(sKeys()[j],v,{rim:s.miss===v?CONV:null,n:16}))}
function answer(v){const s=R.same;if(s.i>=SAME.length)return;const [q,ok,,why]=SAME[s.i];
 if(v!==ok){s.miss=v;A.sound.miss();return speak(why)}s.i++;s.miss=null;A.sound.pop();speak(`${ok}.`+(s.i>=SAME.length?' All 4 answered.':''))}
function draw(){const k=ph();if(k==='quiz'){ground();label('Challenge',A.H*.02,1);circuit(1,'lamp');SEG.forEach((g,i)=>arrow(g,1,CONV,'I'));return}
 if(k==='conv'||k==='elec')drawMark(k);else({led:drawLed,past:drawPast,same:drawSame})[k]();A.fx.draw(X)}
function down(p){const k=ph();if(k==='conv'||k==='elec'){const i=near(p);if(i>=0){press={i,x:p.x,y:p.y};return true}return false}
 if(k==='led'){const b=ynKeys().find(r=>hit(p,r));if(b)judge(b.j)}
 if(k==='past'){const r=pastCards().find(r=>hit(p,r));if(r)order(r.k)}
 if(k==='same'){const b=sKeys().find(r=>hit(p,r));if(b)answer(sOrd(R.same.i)[b.j])}return false}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function up(p){const d=press;press=null;if(!d)return;const k=ph(),s=SEG[d.i],a=pt(s.a),e=pt(s.b),L=Math.hypot(e.x-a.x,e.y-a.y),pr=((p.x-d.x)*(e.x-a.x)+(p.y-d.y)*(e.y-a.y))/L;
 if(Math.abs(pr)<z(14))return speak(`Drag along the ${s.n} in the direction the ${k==='conv'?'current':'electrons'} go, or use the buttons.`);mark(k,d.i,pr>0?1:-1)}
function fresh(){ver++;press=null;for(const k in R)delete R[k];Object.assign(R,{conv:{plusLeft:1,round:0,rounds:2,mark:[0,0,0,0,0]},elec:{plusLeft:1,round:0,rounds:1,mark:[0,0,0,0,0]},led:{i:0},past:{n:0,got:[]},same:{i:0},hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();R.hook()}
function enter(i,first,done,msg){fresh();speak(first);R.hook=()=>{if(A.step===i&&done()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
const dirWord=(i,d)=>{const s=SEG[i],v=[(s.b[0]-s.a[0])*d,(s.b[1]-s.a[1])*d];return Math.abs(v[0])>Math.abs(v[1])?(v[0]>0?'right':'left'):(v[1]>0?'down':'up')};
function pads(){if(!ctl)return;ctl.innerHTML='';const k=ph(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},ctl,t).onclick=f};
 if((k==='conv'||k==='elec')&&R[k].round<R[k].rounds)SEG.forEach((g,i)=>{if(!R[k].mark[i])[1,-1].forEach(d=>b(`${g.n.replace(' wire','')}: ${dirWord(i,d)}`,()=>mark(k,i,d),`${g.n}: ${k==='conv'?'current':'electrons'} go ${dirWord(i,d)}`))});
 if(k==='led'&&R.led.i<LED.length)['Lights','Stays off'].forEach((t,j)=>b(t,()=>judge(j)));
 if(k==='past'&&R.past.n<PAST.length)SHUF.forEach(q=>{if(!R.past.got.includes(q))b(PAST[q][0],()=>order(q),`${PAST[q][0]}: ${PAST[q][1]}`)});
 if(k==='same'&&R.same.i<SAME.length)sOrd(R.same.i).forEach(v=>b(v,()=>answer(v)))}
const steps=[
{h:'Mark the current',p:'Conventional current is drawn leaving the + terminal of the cell (the long line) and going round the circuit to the − terminal. Drag along each wire the way it flows.',
predict:{q:'Which terminal does the conventional current arrow leave?',opts:['− (short line)','+ (long line)'],ans:1},task:'Mark both circuits',
show:()=>demo(0,[0,1,2,3,4].map(i=>()=>mark('conv',i,want('conv',i))).concat([0,1,2,3,4].map(i=>()=>mark('conv',i,want('conv',i)))),260),
go:()=>enter(0,'Cell on top, + on the left. Drag along a wire the way current flows.',()=>R.conv.round>=2,'+ to − round the outside of the cell, whichever way the cell faces.')},
{h:'Electrons go the other way',p:'In a metal wire, the charges that move are electrons. They are negative, so they are pushed away from − and pulled towards +. Mark their drift.',
predict:{q:'Electrons are negative. Which terminal do they flow out of?',opts:['+','−'],ans:1},task:'Mark the electron drift',
show:()=>demo(1,[0,1,2,3,4].map(i=>()=>mark('elec',i,want('elec',i))),300),
go:()=>enter(1,'The pale arrows show conventional current. Drag along each wire the way electrons drift.',()=>R.elec.round>=1,'Electrons drift − to +, opposite to the I arrows.')},
{h:'Does the LED light?',p:'An LED is a diode: current only passes the way its triangle points. Follow I from + round to the LED.',
predict:{q:'A diode\'s triangle points the way that…',opts:['electrons flow','conventional current flows'],ans:1},task:'Judge all 4 circuits',
show:()=>demo(2,LED.map(q=>()=>judge(q[0]===q[1]?0:1)),500),
go:()=>enter(2,'+ on the left; the LED triangle points right.',()=>R.led.i>=LED.length,'Symbols and rules are drawn for conventional current.')},
{h:'Why two directions?',p:'Tap the events from earliest to latest.',
predict:{q:'When the + to − rule was set, did anyone know about electrons?',opts:['Yes','No'],ans:1},task:'Put all 4 in order',
show:()=>demo(3,[0,1,2,3].map(k=>()=>order(k)),450),
go:()=>enter(3,'Four events. Tap the earliest first.',()=>R.past.n>=PAST.length,'The rule came first; the electron, found later, turned out to be negative.')},
{h:'Same current',p:'Negative charge moving left gives the same current as positive charge moving right. Answer each question.',
predict:{q:'Electrons flow left. Is that the same current as + charge flowing right?',opts:['No, opposite','Yes, the same'],ans:1},task:'Answer all 4',
show:()=>demo(4,SAME.map(q=>()=>answer(q[1])),500),
go:()=>enter(4,SAME[0][0],()=>R.same.i>=SAME.length,'Two pictures, one current.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
{q:'A current arrow I points right on a wire. Which way do the electrons drift?',a:'left',o:[['right','samedir'],['they do not move','still']]},
{q:'Conventional current leaves the cell from…',a:'the + terminal (long line)',o:[['the − terminal (short line)','elecdir'],['both terminals','both']]},
{q:'Why do electrons drift towards +?',a:'They are negative, so + attracts them',o:[['They are positive','sign'],['Current pushes them that way','circular']]},
{q:'Which came first?',a:'The + to − rule',o:[['Finding the electron','history'],['They came together','together']]},
{q:'A diode points left, and I flows right through it. What happens?',a:'No current',o:[['It lights','diodeelec'],['Current flows left','reverse']]}];
function tip(t){let m='Conventional current: + to −. Electrons: − to +.';
 switch(t){case 'samedir':m='Current and electron drift point opposite ways in a metal.';break;
 case 'still':m='Electrons do move, slowly. Their drift is opposite to I.';break;
 case 'elecdir':m='Electrons leave −. Conventional current is drawn leaving +.';break;
 case 'both':m='Charge goes round one loop: out of one terminal and back into the other.';break;
 case 'sign':m='Electrons carry negative charge; opposite charges attract.';break;
 case 'circular':m='The current arrow is a label, not a push. The cell\'s + terminal attracts the negative electrons.';break;
 case 'history':m='The electron was found in 1897, about 150 years after Franklin named + and −.';break;
 case 'together':m='Franklin\'s + and − came in the 1740s; the electron came in 1897.';break;
 case 'diodeelec':m='Diode symbols point along conventional current. I is against the triangle, so it is blocked.';break;
 case 'reverse':m='A diode blocks current against its triangle; it does not turn it round.';break}
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+tip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':tip(t))}
FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:B=>{cq.hidden=B.step!==5;ctl.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Circuit buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();
  A.every(dt=>{if(ph()==='elec'&&R.elec.round>=1&&!A.reduced()){t0+=dt;return true}return false});A.gest({down,move:()=>{},up});pads()}}).start()})})();
