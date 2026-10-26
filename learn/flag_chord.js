/* Flagship 38 – chords, arcs, sectors, segments and tangents. One circle (radius 5 cm) with live parts. (1) Drag point B
   round the circle: the chord AB reads its length, and the longest chord is the one through O, the diameter (trap: all
   chords are the same, or a diameter is not a chord). (2) A and B split the edge into a minor and a major arc, each with its
   angle; tap the major arc (trap: "the top one"). (3) A slice bounded by two radii and a piece cut off by a chord sit side
   by side; tap the sector, then the segment (the classic swap). (4) Drag a straight line towards the circle: it misses,
   touches or cuts; at one touching point it is a tangent and the radius to that point meets it at 90°. Challenge: name
   the highlighted part; every wrong name gets feedback on the property that rules it out. */
(()=>{const RAD=Math.PI/180,md=x=>((x%360)+360)%360,cm=x=>(Math.round(x*10)/10).toString();
VIS.reg('flagchord',c=>{let A,pad,chal,read;
 const S={a:200,b:270,t:60,d:.55,pick:null,found:new Set(),drag:null,shake:0,hl:null,goal:()=>{},run:0,showLine:false,showSS:false};
 const say=t=>{c.say(t);if(read)read.textContent=t};
 const miss=t=>{A.sound.miss();S.shake=1;A.tween(S,{shake:0},450,'out');if(t)say(t)};
 const geo=()=>{const N=A.narrow,cx=A.W*(N?.5:.46),cy=A.H*(N?.5:.52),r=Math.min(A.W,A.H)*(N?.34:.36);return{cx,cy,r}};
 const pt=(G,th,k=1)=>[G.cx+G.r*k*Math.cos(th*RAD),G.cy-G.r*k*Math.sin(th*RAD)];
 const span=()=>md(S.b-S.a),minor=()=>{const s=span();return s<=180?{f:S.a,s}:{f:S.b,s:360-s}},chordLen=()=>10*Math.sin(Math.min(span(),360-span())*RAD/2);
 const inArc=(th,f,s)=>md(th-f)<=s+.01;
 function setB(v){S.b=md(Math.round(v));const s=Math.min(span(),360-span());if(Math.abs(s-180)<4)S.b=md(S.a+180);if(s<12)S.b=md(S.a+(span()<180?12:-12));
  const L=chordLen();say(Math.abs(L-10)<.01?`AB is 10 cm and passes through O: a diameter, the longest chord.`:`Chord AB is ${cm(L)} cm. It misses the centre O.`);sync();S.goal()}
 function setD(v){S.d=Math.max(.2,Math.min(1.6,v));if(Math.abs(S.d-1)<.05)S.d=1;
  say(S.d===1?'The line touches the circle at one point, T. It is a tangent. The radius OT meets it at 90°.':S.d<1?'The line cuts the circle at two points. The part inside is a chord; the whole line is not a tangent.':'The line misses the circle completely.');sync();S.goal()}
 function arcTap(major){const m=minor();S.pick=major?'major':'minor';if(major){A.sound.pop();say(`Major arc: ${360-m.s}°, the long way round from A to B.`)}else miss(`That is the minor arc: ${m.s}°, less than half the circle.`);sync();S.goal()}
 function region(k){S.pick=k;if(k==='sector'||k==='segment'){S.found.add(k);A.sound.pop();say(k==='sector'?'Sector: bounded by two radii and an arc, like a slice of pizza.':'Segment: bounded by a chord and an arc. No radii.')}
  else miss('That is the rest of the circle. Look for a region with two radii as edges, or one cut off by a single chord.');sync();S.goal()}
 function play(list,ms=320){const tok=++S.run;let j=0;const go=()=>{if(tok!==S.run||j>=list.length)return;list[j++]();A.tween({u:0},{u:1},ms,'io',go)};go()}
 function describe(){const s=A.step,m=minor();if(s===5)return S.cd||'Challenge: one part of the circle is highlighted.';
  if(s===2)return `Circle with centre O. A sector between radii OA and OB, and a segment cut off by chord CD.${S.found.size?' Found: '+[...S.found].join(' and ')+'.':''}`;
  if(s===3)return `Circle of radius 5 cm and a straight line ${cm(S.d*5)} cm from O: ${S.d===1?'tangent, touching at one point':S.d<1?'cuts the circle at two points':'misses the circle'}.`;
  return `Circle of radius 5 cm. Points A and B on the circle. Chord AB is ${cm(chordLen())} cm${Math.abs(chordLen()-10)<.01?', a diameter':''}. Minor arc ${m.s}°, major arc ${360-m.s}°.`+(s===4?` Line ${cm(S.d*5)} cm from O: ${S.d===1?'tangent':S.d<1?'cuts twice':'misses'}.`:'')}
 function sync(){if(!A)return;A.cv.setAttribute('aria-label',describe());if(!pad)return;pad.innerHTML='';const s=A.step,b=(t,aria,f,off)=>{const x=c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':aria},pad,t);x.disabled=!!off;x.onclick=()=>{f();A.sound.tick()}};
  if(s===5)return A.redraw();
  if(s===0||s===4){b('B ↺','Move point B 10 degrees anticlockwise',()=>setB(S.b+10));b('B ↻','Move point B 10 degrees clockwise',()=>setB(S.b-10))}
  if(s===1){b('Short arc','Choose the arc that goes the short way from A to B',()=>arcTap(false));b('Long arc','Choose the arc that goes the long way from A to B',()=>arcTap(true))}
  if(s===2){b('Two radii + arc','Choose the region bounded by two radii and an arc',()=>region('sector'));b('Chord + arc','Choose the region bounded by a chord and an arc',()=>region('segment'));b('The rest','Choose the rest of the circle',()=>region('rest'))}
  if(s===3||s===4){b('Line in','Move the line 0.5 cm towards the centre',()=>setD(S.d-.1));b('Line out','Move the line 0.5 cm away from the centre',()=>setD(S.d+.1))}
  if(s===4)b('Turn line','Turn the line 30 degrees round the circle',()=>{S.t=md(S.t+30);setD(S.d)});
  A.redraw()}
 // ---- drawing ----
 function dot(x,y,lab,col,big){const{ctx,paint:P}=A;P.ball(x,y,big?9:5,col);if(lab){ctx.fillStyle=A.col.tx;ctx.font='800 14px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(lab,x,y-(big?18:14))}}
 function arcPath(G,f,s,k=1){A.ctx.arc(G.cx,G.cy,G.r*k,-f*RAD,-(f+s)*RAD,true)}
 function draw(A){const{ctx,W,H,paint:P,col:C}=A,G=geo(),s=A.step,jit=S.shake*Math.sin(S.shake*30)*4;G.cx+=jit;S.G=G;
  ctx.fillStyle=P.lin(0,0,W,H,[[0,A.mix(C.pn,C.cy,.07)],[1,A.mix(C.pn,C.vi,.07)]]);ctx.fillRect(0,0,W,H);
  ctx.fillStyle=A.alpha(C.tx,.04);ctx.beginPath();ctx.arc(G.cx,G.cy,G.r,0,7);ctx.fill();ctx.strokeStyle=A.alpha(C.tx,.55);ctx.lineWidth=2;ctx.stroke();
  const ch=s===5&&S.hl;
  if(s===2||ch&&(ch.k==='sector'||ch.k==='segment')){const sf=ch?ch.f:195,ss=ch?ch.s:60,gf=ch?ch.f:330,gs=ch?ch.s:90;
   if(s===2||ch.k==='sector'){ctx.fillStyle=A.alpha(C.am,S.found.has('sector')||ch?.55:.18);ctx.beginPath();ctx.moveTo(G.cx,G.cy);arcPath(G,sf,ss);ctx.closePath();ctx.fill();ctx.strokeStyle=C.am;ctx.lineWidth=3;ctx.stroke()}
   if(s===2||ch.k==='segment'){const[x0,y0]=pt(G,gf);ctx.fillStyle=A.alpha(C.cy,S.found.has('segment')||ch?.55:.18);ctx.beginPath();ctx.moveTo(x0,y0);arcPath(G,gf,gs);ctx.closePath();ctx.fill();ctx.strokeStyle=C.cy;ctx.lineWidth=3;ctx.stroke()}
   if(s===2){const L=[['A',195],['B',255],['C',330],['D',60]];L.forEach(([l,th])=>{const[x,y]=pt(G,th);dot(x,y,'',C.tx);const[lx,ly]=pt(G,th,1.13);ctx.fillStyle=C.tx;ctx.font='800 14px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(l,lx,ly)})}}
  if(s===0||s===1||s===4){const m=minor(),[ax,ay]=pt(G,S.a),[bx,by]=pt(G,S.b);
   if(s===1){[[m.f,m.s,'minor'],[m.f+m.s,360-m.s,'major']].forEach(([f,sp,k])=>{const on=S.pick===k;ctx.strokeStyle=k==='minor'?C.or:C.vi;ctx.lineWidth=on?10:6;P.glow(on?A.alpha(ctx.strokeStyle,.8):'transparent',on?14:0);ctx.beginPath();arcPath(G,f,sp);ctx.stroke();P.noShadow();
     const[lx,ly]=pt(G,f+sp/2,A.narrow?.72:.75);P.label(`${k} arc ${sp}°`,lx,ly,{font:'700 12px system-ui',bg:A.alpha(k==='minor'?'#b45309':'#6d28d9',.92)})})}
   const dia=Math.abs(chordLen()-10)<.01;ctx.strokeStyle=dia?C.gr:C.ac;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke();
   if(s!==1){const mx=(ax+bx)/2,my=(ay+by)/2;P.label(`AB = ${cm(chordLen())} cm${dia?' (diameter)':''}`,mx,my+(dia?22:-18),{font:'700 12px system-ui',bg:A.alpha(dia?'#047857':'#1d4ed8',.92)})}
   dot(ax,ay,'A',C.rd,false);dot(bx,by,'B',C.ac,true);S.Bpt=[bx,by]}
  if(s===3||s===4){const u=[Math.cos(S.t*RAD),-Math.sin(S.t*RAD)],v=[-u[1],u[0]],fx=G.cx+u[0]*G.r*S.d,fy=G.cy+u[1]*G.r*S.d,L=Math.max(W,H);S.line={fx,fy,u,v};
   ctx.strokeStyle=S.d===1?C.gr:C.pk;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(fx-v[0]*L,fy-v[1]*L);ctx.lineTo(fx+v[0]*L,fy+v[1]*L);ctx.stroke();
   if(S.d<1){const h=Math.sqrt(1-S.d*S.d)*G.r;[[1],[-1]].forEach(([k])=>dot(fx+v[0]*h*k,fy+v[1]*h*k,'',C.pk));ctx.strokeStyle=A.alpha(C.or,.9);ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(fx-v[0]*h,fy-v[1]*h);ctx.lineTo(fx+v[0]*h,fy+v[1]*h);ctx.stroke();P.label('2 points: cuts (chord inside)',fx,fy-22,{font:'700 12px system-ui',bg:A.alpha('#9d174d',.92)})}
   else if(S.d===1){ctx.strokeStyle=C.tx;ctx.lineWidth=2;ctx.setLineDash([6,5]);ctx.beginPath();ctx.moveTo(G.cx,G.cy);ctx.lineTo(fx,fy);ctx.stroke();ctx.setLineDash([]);const q=12;ctx.beginPath();ctx.moveTo(fx-u[0]*q,fy-u[1]*q);ctx.lineTo(fx-u[0]*q+v[0]*q,fy-u[1]*q+v[1]*q);ctx.lineTo(fx+v[0]*q,fy+v[1]*q);ctx.stroke();
    dot(fx,fy,'',C.gr,true);const[lx,ly]=pt(G,S.t,1.22);P.label('T: tangent, 90°',lx,ly,{font:'700 12px system-ui',bg:A.alpha('#047857',.92)})}
   else P.label('0 points: misses',fx,fy-20,{font:'700 12px system-ui',bg:A.alpha('#334155',.92)})}
  if(ch&&ch.k!=='sector'&&ch.k!=='segment'){ctx.lineWidth=5;ctx.strokeStyle=C.am;P.glow(A.alpha(C.am,.7),12);ctx.beginPath();
   if(ch.k==='minor'||ch.k==='major')arcPath(G,ch.f,ch.s);else if(ch.k==='tangent'){const u=[Math.cos(ch.f*RAD),-Math.sin(ch.f*RAD)],fx=G.cx+u[0]*G.r,fy=G.cy+u[1]*G.r;ctx.moveTo(fx+u[1]*G.r*1.3,fy-u[0]*G.r*1.3);ctx.lineTo(fx-u[1]*G.r*1.3,fy+u[0]*G.r*1.3)}
   else{const[x0,y0]=ch.k==='radius'?[G.cx,G.cy]:pt(G,ch.f),[x1,y1]=pt(G,ch.f+ch.s);ctx.moveTo(x0,y0);ctx.lineTo(x1,y1)}ctx.stroke();P.noShadow()}
  dot(G.cx,G.cy,'',C.tx);ctx.fillStyle=C.tx;ctx.font='700 13px system-ui';ctx.textAlign='left';ctx.fillText('O',G.cx+7,G.cy+14);
  if(S.drag&&S.drag.k==='B'){ctx.strokeStyle=A.alpha(C.ac,.5);ctx.lineWidth=2;ctx.beginPath();ctx.arc(S.Bpt[0],S.Bpt[1],16,0,7);ctx.stroke()}
  return S.shake>0}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&A.pred[st]!=null)A.done(msg()+A.reveal(st))};
 const fresh=()=>{S.run++;S.pick=null;S.found=new Set();S.hl=null;S.goal=()=>{}};
 const steps=[
  {h:'Chords and the diameter',p:'A chord is a straight line joining two points on the circle. Drag B round the circle and watch the length of AB.',
   predict:{q:'Which chord is the longest one a circle can have?',opts:['they are all the same length','the one through the centre','the one nearest the edge'],ans:1},
   task:'Drag B to make the longest chord you can',show:()=>{const t={v:S.b};A.tween(t,{v:S.a+180},700,'io',()=>setB(S.a+180))},
   go:()=>{fresh();S.a=200;S.b=270;sync();S.goal=fin(0,()=>Math.abs(chordLen()-10)<.01,()=>'10 cm, twice the radius. The longest chord goes through the centre: it is the diameter, so a diameter is a chord too.')}},
  {h:'Minor and major arcs',p:'An arc is part of the curved edge. A and B split the edge into two arcs: the minor arc (less than half) and the major arc (more than half).',
   predict:{q:'A and B are 100° apart, with the short arc at the top. The major arc is…',opts:['the arc at the top','the longer arc, 260°','the straight line AB'],ans:1},
   task:'Tap the major arc',show:()=>arcTap(true),
   go:()=>{fresh();S.a=40;S.b=140;sync();S.goal=fin(1,()=>S.pick==='major',()=>'Major means bigger: 260° is more than half of 360°. The minor arc is the other 100°, at the top. Position does not matter; size does.')}},
  {h:'Sector or segment?',p:'Two regions are shaded. One has two radii as edges. The other is cut off by one chord. Tap each one.',
   predict:{q:'A slice of pizza cut from the centre is a…',opts:['segment','sector','chord'],ans:1},
   task:'Tap the sector, then tap the segment',show:()=>play([()=>region('sector'),()=>region('segment')]),
   go:()=>{fresh();sync();S.goal=fin(2,()=>S.found.has('sector')&&S.found.has('segment'),()=>'Sector: two radii and an arc (pizza slice). Segment: one chord and an arc (the crust end cut off with one straight cut).')}},
  {h:'Tangents',p:'Drag the pink line towards the circle. Count how many points it shares with the circle.',
   predict:{q:'A tangent touches the circle at T. The angle between the tangent and the radius OT is…',opts:['45°','90°','it depends where T is'],ans:1},
   task:'Drag the line until it just touches the circle',show:()=>{const t={v:S.d};A.tween(t,{v:1},700,'io',()=>setD(1))},
   go:()=>{fresh();S.t=60;S.d=.55;sync();S.goal=fin(3,()=>S.d===1,()=>'One shared point: a tangent. Wherever T is, the radius OT meets the tangent at 90°.')}},
  {h:'Sandbox',p:'Drag B and the line. Make a diameter, a short chord, a tangent and a line that misses. Turn the line to touch at other points.',go:()=>{fresh();S.a=200;S.b=320;S.d=1.3;S.t=30;sync()}},
  {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.goal()});
 // ---- challenge ----
 const QS=[{k:'segment',f:20,s:110},{k:'chord',f:150,s:100},{k:'major',f:300,s:250},{k:'tangent',f:120},{k:'sector',f:240,s:80},{k:'diameter',f:30,s:180},{k:'minor',f:60,s:80},{k:'radius',f:0,s:215},{k:'angle'}];
 const ANS={segment:['Segment','Sector','Chord'],chord:['Chord','Diameter','Arc'],major:['Major arc','Minor arc','Segment'],tangent:['Tangent','Chord','Radius'],sector:['Sector','Segment','Arc'],diameter:['Diameter','Radius','Tangent'],minor:['Minor arc','Major arc','Chord'],radius:['Radius','Chord','Diameter'],angle:['90°','180°','45°']};
 let qi=-1,streak=0;
 function ask(){qi=(qi+1)%QS.length;const Q=QS[qi];S.hl=Q.k==='angle'?{k:'tangent',f:200}:Q;
  const h=Q.k==='angle'?'<p><b>A tangent touches the circle at T. What angle does it make with the radius OT?</b></p>':'<p><b>What is the highlighted part called?</b></p>';
  let o=ANS[Q.k].map((l,i)=>({l,ok:i===0}));const k=qi%3;o=o.slice(k).concat(o.slice(0,k));
  chal.innerHTML=h+'<div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>';
  const row=chal.querySelector('.fl-pick');o.forEach(x=>{const b=c.el('button',{type:'button',class:'lbtn sm'},row,x.l);b.onclick=()=>judge(Q,x)});
  S.cd=('Challenge: the highlighted part is '+({segment:'a region between a chord and an arc',chord:'a straight line joining two points on the circle, not through O',major:'a curved part of the edge, more than half the circle',tangent:'a straight line touching the circle at one point',sector:'a region between two radii and an arc',diameter:'a straight line through O joining two points on the circle',minor:'a curved part of the edge, less than half the circle',radius:'a straight line from O to the circle',angle:'a tangent line touching at one point'})[Q.k]+'.');A.cv.setAttribute('aria-label',S.cd);A.redraw()}
 function judge(Q,x){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),w=x.l;let m;
  if(x.ok)m=({segment:'Cut off by a single chord, with no radii.',chord:'It joins two points on the circle but misses O.',major:`It is ${Q.s}°, more than half way round.`,tangent:'It touches the circle at exactly one point.',sector:'Its straight edges are two radii.',diameter:'It is a chord through the centre: 10 cm, two radii.',minor:`It is ${Q.s}°, less than half way round.`,radius:'It runs from the centre O to the edge: 5 cm.',angle:'The radius to the point of contact is always perpendicular to the tangent.'})[Q.k];
  else if(w==='Sector')m='A sector needs two radii from the centre. This region is cut off by one chord, so it is a segment.';
  else if(w==='Segment')m=Q.k==='sector'?'A segment is cut off by one chord. This region has two radii as its edges, so it is a sector.':'A segment is a region, an area. This is just the curved line, so it is an arc.';
  else if(w==='Chord')m=Q.k==='tangent'?'A chord meets the circle at two points. This line touches at only one, so it is a tangent.':Q.k==='radius'?'A chord joins two points on the circle. This line ends at the centre O, so it is a radius.':Q.k==='minor'?'A chord is straight. This is part of the curved edge: an arc.':'The chord is the straight edge. The region it cuts off is the segment.';
  else if(w==='Diameter')m=Q.k==='radius'?'A diameter goes right across, edge to edge. This stops at O: a radius, half a diameter.':'A diameter must pass through the centre O. This chord misses O.';
  else if(w==='Arc')m=Q.k==='sector'?'An arc is only the curved edge. The shaded area is a region: a sector.':'An arc is curved. This is a straight line between two points on the circle.';
  else if(w==='Minor arc')m=`Minor means less than half. This arc is ${Q.s}°, more than 180°, so it is major.`;
  else if(w==='Major arc')m=`Major means more than half. This arc is only ${Q.s}°, so it is minor.`;
  else if(w==='Radius')m=Q.k==='diameter'?'A radius goes from O to the edge only. This line goes edge to edge through O.':'A radius starts at the centre O. This line never reaches O.';
  else if(w==='Tangent')m='A tangent touches the circle at one point from outside. This line goes through the circle.';
  else m='The radius and tangent always meet at a right angle, 90°, wherever the point is.';
  if(x.ok){streak++;A.win();fb.innerHTML=`✓ ${m} Streak: ${streak}. <button type="button" class="linkish">Another →</button>`}
  else{streak=0;A.sound.miss();fb.innerHTML=`✗ Not quite. ${m} <button type="button" class="linkish">Another →</button>`}
  fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.66,tall:1,draw,onStep:A=>{chal.hidden=A.step!==5;sync()},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'},box);
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Move points and lines, choose parts'},box);chal=E('div',{class:'fl-chal'},A.below);
   const ang=p=>{const G=S.G;return md(Math.atan2(G.cy-p.y,p.x-G.cx)/RAD)},rd=p=>Math.hypot(p.x-S.G.cx,p.y-S.G.cy);
   A.gest({down:p=>{const s=A.step,G=S.G;if(!G||s===5)return false;
     if((s===0||s===4)&&S.Bpt&&Math.hypot(p.x-S.Bpt[0],p.y-S.Bpt[1])<26){S.drag={k:'B'};return true}
     if((s===3||s===4)&&S.line){const L=S.line,dd=Math.abs((p.x-L.fx)*L.u[0]+(p.y-L.fy)*L.u[1]);if(dd<22){S.drag={k:'L'};return true}}
     if(s===1&&Math.abs(rd(p)-G.r)<22){const m=minor();arcTap(!inArc(ang(p),m.f,m.s));return false}
     if(s===2&&rd(p)<G.r){const th=ang(p),[cx0,cy0]=pt(G,330),[dx,dy]=pt(G,60),side=(q,r0)=>(dx-cx0)*(r0-cy0)-(dy-cy0)*(q-cx0);
      region(inArc(th,195,60)?'sector':Math.sign(side(p.x,p.y))!==Math.sign(side(G.cx,G.cy))?'segment':'rest');return false}return false},
    move:p=>{const d=S.drag,G=S.G;if(!d)return;if(d.k==='B'){S.b=ang(p);const s=Math.min(span(),360-span());if(Math.abs(s-180)<4)S.b=md(S.a+180);A.redraw();A.cv.setAttribute('aria-label',describe())}
     else{const L=S.line;S.d=Math.max(.2,Math.min(1.6,((p.x-G.cx)*L.u[0]+(p.y-G.cy)*L.u[1])/G.r));if(Math.abs(S.d-1)<.05)S.d=1;A.redraw()}},
    up:()=>{const d=S.drag;S.drag=null;if(!d)return;if(d.k==='B')setB(S.b);else setD(S.d)}});sync()}});
 A.start()})})();
