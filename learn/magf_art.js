/* Data, physics and drawing helpers for flagmagfield (magnetic fields, ages 11–12). Basis: National Curriculum in
   England KS3 physics (magnetic poles, attraction and repulsion; magnetic fields by plotting with a compass, represented
   by field lines; Earth's magnetism, compass and navigation); NGSS MS-PS2-5; IOP Supporting Physics Teaching 11–14
   (Magnetism); British Geological Survey and NOAA NCEI on the geomagnetic field (Earth's field is roughly that of a bar
   magnet tilted about 10° from the spin axis; the magnetic pole in the Arctic attracts the north-seeking end of a compass,
   so it is a south-type magnetic pole; magnetic north moves each year). Field model: each pole is a point source with
   strength falling as 1/r², the standard pole (Gilbert) picture for a bar magnet drawn in a flat plane.
   Slips it targets: field lines run S to N outside a magnet; the field is strongest in the middle of the side; field
   lines can cross or join between like poles; a compass near a magnet still points to geographic north; the pole in the
   Arctic is a north magnetic pole; the field stops at the magnet's edge or only lies in one flat plane. */
const MAGF=(()=>{
const R=(x,y,w,h)=>({x,y,w,h}),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* field at p from point poles [{x,y,q}] (q +1 north, −1 south), screen units */
function field(poles,p){let bx=0,by=0;for(const s of poles){const dx=p.x-s.x,dy=p.y-s.y,r2=dx*dx+dy*dy+1e-6,r3=r2*Math.sqrt(r2);bx+=s.q*dx/r3;by+=s.q*dy/r3}return{x:bx,y:by,m:Math.hypot(bx,by)}}
/* follow the field from start; stops at a south pole, off the box or after n steps */
function trace(poles,start,box,step,n){const pts=[start];let p=start;for(let i=0;i<(n||420);i++){const f=field(poles,p);if(!f.m)break;
 const h={x:p.x+f.x/f.m*step/2,y:p.y+f.y/f.m*step/2},g=field(poles,h);if(!g.m)break;p={x:p.x+g.x/g.m*step,y:p.y+g.y/g.m*step};pts.push(p);
 if(p.x<box.x||p.y<box.y||p.x>box.x+box.w||p.y>box.y+box.h)break;if(poles.some(s=>s.q<0&&Math.hypot(p.x-s.x,p.y-s.y)<step*1.5))break}return pts}
function kit(A,C){const fs=n=>Math.round(A.narrow?n:n*1.25);
 function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${fs(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign='center';g.textBaseline='middle';
  const rows=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&g.measureText(t).width>o.w&&cur){rows.push(cur);cur=w}else cur=t});rows.push(cur);
  const lh=fs(n)*1.22;if(o.bg){const bw=Math.max(...rows.map(t=>g.measureText(t).width))+10,bh=lh*rows.length+4;g.fillStyle=o.bg;A.paint.rrect(x-bw/2,y-bh/2,bw,bh,6);g.fill();g.fillStyle=o.c||C.ink}
  rows.forEach((t,i)=>g.fillText(t,x,y+(i-(rows.length-1)/2)*lh))}
 function tile(r,fill,how){const g=A.ctx;g.fillStyle=how==='ok'?'#d1fae5':how==='ko'?'#fee2e2':fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(9,r.h/3));g.fill();
  g.lineWidth=how?3:1.5;g.strokeStyle={ok:C.ok,ko:C.ko,sel:C.sel,hot:C.warm}[how]||C.rim;g.stroke()}
 function rows(n,cols,a,gap){gap=gap||7;const k=Math.ceil(n/cols),w=(a.w-gap*(cols-1))/cols,h=(a.h-gap*(k-1))/k;
  return Array.from({length:n},(_,i)=>R(a.x+(i%cols)*(w+gap),a.y+Math.floor(i/cols)*(h+gap),w,h))}
 /* bar magnet centred at (x,y), half length L, nRight: north pole on the right; ang rotates it (radians) */
 function bar(x,y,L,nRight,ang){const g=A.ctx,h=L*.5;g.save();g.translate(x,y);g.rotate(ang||0);
  [[0,nRight?C.npole:C.spole,nRight?'N':'S'],[-L,nRight?C.spole:C.npole,nRight?'S':'N']].forEach(([x0,col,t])=>{g.fillStyle=col;g.fillRect(x0,-h/2,L,h);
   g.save();g.translate(x0+L/2,0);g.rotate(-(ang||0));g.font=`800 ${fs(14)}px system-ui,sans-serif`;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.fillText(t,0,1);g.restore()});
  g.strokeStyle=C.ink;g.lineWidth=1.5;g.strokeRect(-L,-h/2,2*L,h);g.restore()}
 /* poles of a horizontal bar magnet */
 const polesOf=(x,y,L,nRight)=>[{x:x+L*.8*(nRight?1:-1),y,q:1},{x:x-L*.8*(nRight?1:-1),y,q:-1}];
 /* field lines with an arrow part-way along each */
 function lines(poles,box,n,col){const g=A.ctx,step=Math.max(3,Math.min(A.W,A.H)/120);g.strokeStyle=col||C.line;g.lineWidth=1.6;
  poles.filter(s=>s.q>0).forEach(s=>{for(let k=0;k<n;k++){const a=(k+.5)*2*Math.PI/n,pts=trace(poles,{x:s.x+Math.cos(a)*step*2,y:s.y+Math.sin(a)*step*2},box,step);
   g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke();const m=Math.floor(pts.length*.3);if(pts.length>8)arrow(pts[m],pts[m+1],col||C.line)}})}
 function arrow(p,q,col){const g=A.ctx,a=Math.atan2(q.y-p.y,q.x-p.x),s=7;g.fillStyle=col;g.beginPath();g.moveTo(q.x+Math.cos(a)*s,q.y+Math.sin(a)*s);
  g.lineTo(q.x+Math.cos(a+2.5)*s,q.y+Math.sin(a+2.5)*s);g.lineTo(q.x+Math.cos(a-2.5)*s,q.y+Math.sin(a-2.5)*s);g.closePath();g.fill()}
 /* plotting compass: red N half of the needle points along the field */
 function compass(p,f,r,ring){const g=A.ctx,a=f&&f.m?Math.atan2(f.y,f.x):-Math.PI/2;g.fillStyle='#ffffff';g.beginPath();g.arc(p.x,p.y,r,0,7);g.fill();g.lineWidth=ring?3:2;g.strokeStyle=ring||C.ink;g.stroke();
  const t=r*.8,w=r*.28,c=Math.cos(a),s=Math.sin(a);g.fillStyle=C.npole;g.beginPath();g.moveTo(p.x+c*t,p.y+s*t);g.lineTo(p.x-s*w,p.y+c*w);g.lineTo(p.x+s*w,p.y-c*w);g.closePath();g.fill();
  g.fillStyle='#475569';g.beginPath();g.moveTo(p.x-c*t,p.y-s*t);g.lineTo(p.x-s*w,p.y+c*w);g.lineTo(p.x+s*w,p.y-c*w);g.closePath();g.fill()}
 return{say,tile,rows,bar,polesOf,lines,arrow,compass,fs}}
/* scene 2: three test spots, as multiples of the magnet's half length from its centre */
const SPOTS=[{n:'P',dx:1.35,dy:0,why:'next to a pole'},{n:'Q',dx:0,dy:-1,why:'beside the middle'},{n:'R',dx:-2.3,dy:1.55,why:'far away'}];
/* scene 4: places on Earth, angle round the globe from the top (degrees, clockwise) */
const PLACES=[{n:'Canada',a:-38},{n:'Equator',a:90},{n:'New Zealand',a:142}];
/* scene 5: true facts and myths */
const CARDS=[{t:'Outside a magnet, field lines go from N to S',k:0},{t:'Field lines can cross',k:1,s:'cross'},{t:'The field is strongest at the poles',k:0},
 {t:'The field stops at the edge of the magnet',k:1,s:'edge'},{t:'A compass lines up with the field where it is',k:0},{t:'The field only lies flat on the table',k:1,s:'flat'},
 {t:'The pole in the Arctic is a magnetic south pole',k:0},{t:'A compass points exactly at the North Pole',k:1,s:'exact'}];
const START=['Drag the compass round the magnet. Let go to plot an arrow.',
 'Tap the spot where the field is strongest, then the next, then the weakest.',
 'Tap magnet B to flip it. Then find the place where the field is zero.',
 'Tap the magnet inside the Earth to flip it. Then check the 3 places.',
 'Drag each card to True or Myth, or tap a card and then a box.'];
const LEARNT=['The arrows join up into field lines: out of N, round, and into S.',
 'Field lines are closest at the poles, so the field is strongest there. Far away the lines spread out and it is weak.',
 'Unlike poles: lines run straight across from N to S. Like poles: lines turn away, leaving a neutral point with no field.',
 'Compasses point to the Arctic, so the Earth’s magnet has its south pole there.',
 'All 8 sorted. Field lines go N to S, never cross, and fill the space all round a magnet.'];
const QUIZ=[
 {q:'Which way do field lines go outside a bar magnet?',a:'From N to S',o:[['From S to N','dir'],['Straight out, never curving','straight']]},
 {q:'Where is the field round a bar magnet strongest?',a:'At the poles, where the lines are closest',o:[['In the middle of its side','middle'],['The same everywhere','same']]},
 {q:'A plotting compass sits just beyond the N pole of a magnet. Which way does its N end point?',a:'Away from the magnet’s N pole',o:[['Towards the magnet’s N pole','attractN'],['To the Earth’s north, whatever the magnet','earth']]},
 {q:'Why can two field lines never cross?',a:'A compass can only point one way at each place',o:[['They would cancel out','cancel'],['They can cross near strong magnets','cross']]},
 {q:'A compass’s N end points to the Arctic. What kind of magnetic pole is there?',a:'A south pole',o:[['A north pole','earthN'],['No pole: compasses point at the North Star','star']]},
 {q:'Two N poles face each other. What is midway between them?',a:'A neutral point with no field',o:[['The strongest field','strong'],['Field lines crossing','cross']]},
 {q:'Your compass swings as you walk past a steel fence. Why?',a:'The fence changes the field there',o:[['The compass is broken','broken'],['The Earth’s field has switched off','off']]}];
return{R,on,field,trace,kit,SPOTS,PLACES,CARDS,START,LEARNT,QUIZ}})();
