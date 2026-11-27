/* Data and drawings for flagemag (Electromagnets; Science, Forces & Motion, ages 12-13). Sources: NGSS MS-PS2-3 (ask
   questions about data to determine the factors that affect the strength of electric and magnetic forces); National
   Curriculum in England KS3 Physics, Electricity and electromagnetism ('the magnetic effect of a current,
   electromagnets'); IOP Spark, 'Electromagnets' and 'The magnetic field around a wire'; AQA KS3 Science syllabus 3.2
   Electromagnets. A straight wire's field is circles round the wire (right-hand grip rule); a coil (solenoid) has a
   field like a bar magnet; strength rises with current and with the number of turns, and a soft iron core makes it much
   stronger; soft iron loses its magnetism when the current stops, steel keeps some.
   Model used by the lab (stated as a model to the learner): clips lifted = coreFactor x turns x current / 40, capped
   at 20, with coreFactor air 1, copper 1 (copper is not magnetic), steel 8, soft iron 10.
   Slips it targets: the field points at or away from the wire; a coil has no field at its ends or inside; any metal
   core helps (copper does not); changing two things at once in a test; electromagnets switch off because the core
   'runs out'; reversing the current makes it stronger rather than swapping the poles. */
const EMG=(()=>{
const CORES=[{k:'air',name:'No core',f:1,col:'#e2e8f0'},{k:'copper',name:'Copper',f:1,col:'#c2410c'},{k:'steel',name:'Steel',f:8,col:'#64748b'},{k:'iron',name:'Soft iron',f:10,col:'#334155'}];
const TURNS=[5,10,20,40],AMPS=[0.5,1,1.5,2];
const clips=(n,i,core)=>Math.min(20,Math.floor(CORES.find(c=>c.k===core).f*n*i/40));
const DESC=['A straight wire seen end on, with eight small compasses round it and one compass you can move. Tap Switch to turn the current on, Reverse to change its direction, and drag the compass to new places.',
 'A coil of wire with a battery. Drag across the coil, or use the buttons, to wind more turns. Switch it on to see the field, then tap the end that is the north pole.',
 'An electromagnet above a tray of paperclips. Set the turns, the current and the core, then drag the magnet down to the clips to test it. Each test goes in the table.',
 'An electromagnet holding paperclips. Pick soft iron or steel for the core, then tap Switch to turn the current off and watch the clips.',
 'Seven cards name things that use magnets. Drag each one into Needs an electromagnet or A permanent magnet is fine, or tap a card and then a box.'];
const TXT=['A current makes a magnetic field. Round a straight wire the field goes in circles.',
 'Wind the wire into a coil and the circles add up. The coil acts like a bar magnet with a north and a south end.',
 'More turns, more current, or a soft iron core make the magnet stronger. Change one thing at a time to see which.',
 'No current, no field. Soft iron lets go at once. Steel stays a little magnetised.',
 'Use an electromagnet when the magnet must switch off, change strength or be very strong.'];
const DONE=['The compasses point round the wire, and they all turn round when the current is reversed. Further away the field is weaker.',
 'Field lines come out of the north end and go into the south end, just like a bar magnet.',
 'Fair tests show it: more turns, more current and a soft iron core each lift more clips. Copper does nothing.',
 'Soft iron dropped every clip when the current stopped. Steel kept some, so it would make a poor crane magnet.',
 'Cranes, bells, relays and MRI scanners need a magnet that switches. Fridge magnets, catches and compasses do not.'];
/* step 5 cards: e = needs an electromagnet; why = reply to a wrong sort */
const USES=[{t:'Scrapyard crane that drops the cars',s:'Crane',e:true,why:'The crane must let go of the cars, so it needs a magnet it can switch off.'},
 {t:'Fridge magnet holding a picture',s:'Fridge magnet',e:false,why:'It is always on and needs no power, so a permanent magnet is fine.'},
 {t:'Electric door bell',s:'Door bell',e:true,why:'The bell hammer is pulled and let go many times a second: the magnet switches on and off.'},
 {t:'Compass needle',s:'Compass',e:false,why:'A compass needle is a small permanent magnet. It never needs switching.'},
 {t:'MRI scanner in a hospital',s:'MRI scanner',e:true,why:'It needs a huge, steady field that can be ramped up and down, so it uses electromagnets.'},
 {t:'Magnetic catch on a cupboard',s:'Cupboard catch',e:false,why:'The catch just holds the door. A permanent magnet does that with no power.'},
 {t:'Relay switch in a car',s:'Car relay',e:true,why:'A small current switches the electromagnet on, and it pulls a switch closed for a big current.'}];
/* challenge: a = right answer; o = [wrong answer, slip tag] */
const QS=[{q:'Which change makes an electromagnet stronger?',a:'More turns of wire on the coil',o:[['A copper core instead of air','copper'],['A longer wire with the same number of turns','length']]},
 {q:'Why can an electromagnet be switched off?',a:'Its field comes from the current: no current, no field',o:[['The iron core runs out of magnetism','core'],['The battery stops being magnetic','battery']]},
 {q:'Ali adds more turns and an iron core, and lifts more clips. What can Ali say?',a:'Not which change helped: two things changed',o:[['More turns made it stronger','fair'],['The iron core did nothing','fair']]},
 {q:'Compasses are placed round a straight wire with a current. Which way do they point?',a:'In circles round the wire',o:[['Straight at the wire','radial'],['All north, the same as with no current','none']]},
 {q:'The current in a coil is reversed. What happens?',a:'The north and south ends swap',o:[['It gets stronger','stronger'],['It stops being a magnet','stop']]},
 {q:'Which core makes the strongest magnet that still lets go when switched off?',a:'Soft iron',o:[['Steel','steel'],['Copper','copper']]},
 {q:'The current goes up from 1 A to 2 A, nothing else changes. What about the clips?',a:'More clips are lifted',o:[['Fewer clips','fewer'],['The same: current does not matter','same']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',PALE='#f8fafc',OK='#047857',NO='#b91c1c',EDGE='#64748b',SEL='#1d4ed8',RED='#dc2626',F='px system-ui,sans-serif';
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function lines(g,text,maxW,font){g.font=font;const out=[];let cur='';String(text).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t});if(cur)out.push(cur);return out}
/* the message strip: fixed height h, the font shrinks to fit */
function strip(A,text,mood,h){const g=A.ctx,dk=A.col.dark;let fs=A.narrow?16:18,rows;do{rows=lines(g,text,A.W-36,`700 ${fs}${F}`);if(rows.length*fs*1.25+12<=h)break;fs--}while(fs>11);
 g.fillStyle=mood==='ok'?(dk?'#14532d':'#dcfce7'):mood==='no'?(dk?'#7f1d1d':'#fee2e2'):(dk?'#1e293b':'#ffffff');rr(g,8,8,A.W-16,h,12);g.fill();g.strokeStyle=mood==='ok'?OK:mood==='no'?NO:EDGE;g.lineWidth=mood?2.5:1.2;g.stroke();
 g.font=`700 ${fs}${F}`;g.fillStyle=dk?PALE:INK;g.textAlign='left';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,18,8+h/2+(i-(rows.length-1)/2)*fs*1.25))}
/* a compass at (x, y) whose needle points along angle a (radians, screen axes); red end = north-seeking */
function compass(g,x,y,r,a,dk){g.fillStyle=dk?'#1e293b':'#ffffff';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=dk?'#cbd5e1':'#475569';g.lineWidth=1.5;g.stroke();
 const c=Math.cos(a),s=Math.sin(a),w=r*.32;g.fillStyle=RED;g.beginPath();g.moveTo(x+c*r*.85,y+s*r*.85);g.lineTo(x-s*w,y+c*w);g.lineTo(x+s*w,y-c*w);g.closePath();g.fill();
 g.fillStyle=dk?'#e2e8f0':'#334155';g.beginPath();g.moveTo(x-c*r*.85,y-s*r*.85);g.lineTo(x-s*w,y+c*w);g.lineTo(x+s*w,y-c*w);g.closePath();g.fill()}
/* a wire seen end on: out = current towards you (dot), else away (cross) */
function wireEnd(g,x,y,r,on,out,dk){g.fillStyle='#b45309';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=dk?'#fde68a':'#78350f';g.lineWidth=2;g.stroke();if(!on)return;
 g.strokeStyle='#ffffff';g.fillStyle='#ffffff';g.lineWidth=3;if(out){g.beginPath();g.arc(x,y,r*.28,0,7);g.fill()}else{const k=r*.45;g.beginPath();g.moveTo(x-k,y-k);g.lineTo(x+k,y+k);g.moveTo(x+k,y-k);g.lineTo(x-k,y+k);g.stroke()}}
function arrow(g,x0,y0,x1,y1,col,w){const a=Math.atan2(y1-y0,x1-x0);g.strokeStyle=col;g.fillStyle=col;g.lineWidth=w||2;g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.stroke();g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-9*Math.cos(a-.45),y1-9*Math.sin(a-.45));g.lineTo(x1-9*Math.cos(a+.45),y1-9*Math.sin(a+.45));g.closePath();g.fill()}
/* a coil of n turns between x0 and x1, centred on y, height h; core k fills the middle */
function coil(g,x0,x1,y,h,n,core,dk){const C=CORES.find(c=>c.k===core);if(C&&core!=='air'){g.fillStyle=C.col;rr(g,x0-14,y-h*.28,x1-x0+28,h*.56,4);g.fill()}
 if(n<1)return;g.strokeStyle='#b45309';g.lineWidth=Math.max(2.5,Math.min(5,(x1-x0)/n*.45));for(let i=0;i<n;i++){const x=x0+(i+.5)*(x1-x0)/n;g.beginPath();g.ellipse(x,y,Math.max(2,(x1-x0)/n*.32),h/2,0,0,7);g.stroke()}}
/* bar-magnet-like field of a coil: lines leave the north end (nx) and enter the south end */
function coilField(g,x0,x1,y,h,northRight,lines,dk){/* outside the coil the arrows point from N towards S; inside, from S to N */const col=dk?'#93c5fd':'#1d4ed8',L=x1-x0,dir=northRight?1:-1;g.save();g.lineWidth=2;g.strokeStyle=col;
 for(let k=1;k<=lines;k++){const lift=h*(.25+k*.38);[-1,1].forEach(s=>{g.beginPath();g.moveTo(x1+6,y+s*h*.15*k/lines);g.bezierCurveTo(x1+L*.45,y+s*lift*1.4,x0-L*.45,y+s*lift*1.4,x0-6,y+s*h*.15*k/lines);g.stroke();
  const mx=(x0+x1)/2,my=y+s*lift*1.05;arrow(g,mx+9*dir,my,mx-9*dir,my,col,2)})}
 arrow(g,dir>0?x0+10:x1-10,y,dir>0?x1-10:x0+10,y,col,2.5);g.restore()}
function clip(g,x,y,a,dk){g.save();g.translate(x,y);g.rotate(a);g.strokeStyle=dk?'#e2e8f0':'#475569';g.lineWidth=2.2;rr(g,-5,-11,10,22,5);g.stroke();g.beginPath();g.moveTo(-1.5,-6);g.lineTo(-1.5,8);g.stroke();g.restore()}
function pill(g,r,label,state,dk){g.fillStyle=state==='no'?'#fee2e2':state==='ok'?'#dcfce7':state==='sel'?'#dbeafe':state==='on'?'#fef3c7':'#ffffff';rr(g,r.x,r.y,r.w,r.h,12);g.fill();
 g.strokeStyle=state==='no'?NO:state==='ok'?OK:state==='sel'?SEL:state==='on'?'#b45309':EDGE;g.lineWidth=state?3:1.6;g.stroke();let n=16,rows;do{rows=lines(g,label,r.w-12,`800 ${n}${F}`);if(rows.length*n*1.18<=r.h-6)break;n--}while(n>10);
 g.font=`800 ${n}${F}`;g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';rows.forEach((t,i)=>g.fillText(t,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*n*1.18))}
/* the two-box sort of uses: returns the boxes and the loose cards so the lab can hit-test them */
function sortView(A,s,grab,y0,fin,within){const g=A.ctx,dk=A.col.dark,W=A.W,E={USES,OK,PALE,INK,rr,lines,pill};const bw=(W-24)/2,bh=Math.min(150,(A.H-y0)*.34);const bins=[true,false].map((e,j)=>({k:'bin',e,x:8+j*(bw+8),y:y0,w:bw,h:bh}));
 bins.forEach(b=>{const over=grab&&grab.i!=null&&within(grab,b);g.fillStyle=over?(dk?'#1e3a8a':'#dbeafe'):(dk?'#1e293b':b.e?'#fff7ed':'#f0fdf4');E.rr(g,b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=b.e?'#c2410c':E.OK;g.lineWidth=2.5;g.stroke();
  g.font=`800 ${A.narrow?14:16}px system-ui,sans-serif`;g.fillStyle=dk?E.PALE:E.INK;g.textAlign='center';g.textBaseline='top';E.lines(g,b.e?'Needs an electromagnet':'A permanent magnet is fine',b.w-12,g.font).forEach((t,i)=>g.fillText(t,b.x+b.w/2,b.y+6+i*18));
  g.font='700 12px system-ui,sans-serif';g.fillStyle=dk?'#86efac':E.OK;let k=0;E.USES.forEach((U,i)=>{if(s.at[i]!==b.e)return;g.fillText(U.s,b.x+b.w/2,b.y+46+16*k++)})});
 const cards=[];if(fin)return{bins,cards};const cw=(W-24)/2,ch=56;let j=0;E.USES.forEach((U,i)=>{if(s.at[i]!=null)return;const r={i,x:8+(j%2)*(cw+8),y:y0+bh+10+Math.floor(j/2)*(ch+8),w:cw,h:ch};j++;if(grab&&grab.i===i)return;cards.push(r);E.pill(g,r,U.t,s.bad===i?'no':s.pick===i?'sel':'',dk)});
 if(grab&&grab.i!=null)E.pill(g,{x:grab.x-cw/2,y:grab.y-ch/2,w:cw,h:ch},E.USES[grab.i].t,'sel',dk);return{bins,cards}}
/* compass needle angle at p: Earth's field points up the screen (north); the wire adds a field that falls off as 1/d */
function needle(p,G,on,out){if(!on)return-Math.PI/2;const dx=p.x-G.cx,dy=p.y-G.cy,d=Math.max(20,Math.hypot(dx,dy)),k=3*G.R/d,sgn=out?1:-1;
 /* current towards you: the field goes anticlockwise as seen, so the direction is (sin, -cos) of the position angle */
 const bx=sgn*k*dy/d,by=-sgn*k*dx/d;return Math.atan2(by-1,bx)}
const way=a=>{const d=(a*180/Math.PI+360)%360;return['right','down and right','down','down and left','left','up and left','up','up and right'][Math.round(d/45)%8]};
/* the switch-off scene: core buttons, the magnet with its clips (falling when they let go) and the switch */
function offView(A,s,y0){const g=A.ctx,dk=A.col.dark,W=A.W,E={pill,coil,clip};const cw=(W-24)/2;const hot=[{k:'iron',x:8,y:y0,w:cw,h:46},{k:'steel',x:16+cw,y:y0,w:cw,h:46},{k:'sw',x:8,y:A.H-62,w:W-16,h:54}];E.pill(g,hot[0],'Soft iron core'+(s.seen.iron?' \u2713':''),s.core==='iron'?'sel':'',dk);E.pill(g,hot[1],'Steel core'+(s.seen.steel?' \u2713':''),s.core==='steel'?'sel':'',dk);E.pill(g,hot[2],s.on?'Switch off':'Switch on',s.on?'on':'',dk);
 const mw=Math.min(170,W*.46),my=y0+70,floor=A.H-80;E.coil(g,W/2-mw/2,W/2+mw/2,my+22,40,10,s.core,dk);
 for(let j=0;j<s.held;j++){const stays=s.on||j<s.left,x=W/2-mw/2+8+(j%8)*(mw-16)/7,y=my+54+Math.floor(j/8)*20,fy=stays?y:y+(floor-y)*(s.fall||0);E.clip(g,x,fy,stays?.2*(j%3-1):1.57,dk)}
 g.strokeStyle=dk?'#94a3b8':'#64748b';g.lineWidth=2;g.beginPath();g.moveTo(14,floor+12);g.lineTo(W-14,floor+12);g.stroke();return hot}
/* the last three tests as a small results table */
function table(A,tests,ty){const g=A.ctx,dk=A.col.dark;const rows=tests.slice(-3);g.font=`700 ${A.narrow?12:13}px ui-monospace,Menlo,Consolas,monospace`;g.textAlign='left';g.textBaseline='top';g.fillStyle=dk?'#cbd5e1':'#334155';
 g.fillText('Test  Turns  Current  Core       Clips',12,ty);rows.forEach((r,j)=>{const no=tests.length-rows.length+j+1;g.fillStyle=dk?'#f1f5f9':INK;g.fillText(`${String(no).padEnd(6)}${String(r.n).padEnd(7)}${(r.i+' A').padEnd(9)}${CORES.find(x=>x.k===r.core).name.padEnd(11)}${r.c}`,12,ty+17*(j+1))})}
/* the battery and leads under the coil; flip shows the battery turned round */
function battery(A,G,flip){const g=A.ctx,dk=A.col.dark,s={flip};const by=A.H-112;g.strokeStyle=dk?'#e2e8f0':'#334155';g.lineWidth=2;g.beginPath();g.moveTo(G.x0,G.y+G.h/2);g.lineTo(G.x0,by);g.lineTo(A.W/2-24,by);g.moveTo(A.W/2+24,by);g.lineTo(G.x1,by);g.lineTo(G.x1,G.y+G.h/2);g.stroke();
 g.fillStyle='#15803d';rr(g,A.W/2-24,by-12,48,24,4);g.fill();g.font='800 13px system-ui,sans-serif';g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(s.flip?'+  \u2212':'\u2212  +',A.W/2,by);}
return{table,battery,sortView,offView,needle,way,CORES,TURNS,AMPS,clips,DESC,TXT,DONE,USES,QS,INK,PALE,OK,NO,EDGE,SEL,RED,rr,lines,strip,compass,wireEnd,arrow,coil,coilField,clip,pill}})();
