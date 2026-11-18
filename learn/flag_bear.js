/* Flagship – three-figure bearings (ages 13–15): turn an arm clockwise from North to set bearings, measure the bearing
   of objects on a chart, discover back bearings by pointing home from B, pick back bearings by rule (±180°), and find
   the bearing of the finish of a two-leg journey from a scale drawing. Drag the arm, or use the turn buttons. */
(()=>{
 const rad=d=>d*Math.PI/180,norm=d=>((d%360)+360)%360,fig3=d=>String(Math.round(norm(d))%360).padStart(3,'0')+'°';
 const gap=(a,b)=>Math.abs(((a-b+540)%360)-180);
 const SET=[45,120,270];
 const MARKS=[['lighthouse',60,'🗼'],['buoy',155,'🛟'],['island',310,'🏝️']];
 const BACK=[70,130,300];
 const RULE=[[45,[['225°','ok'],['135°','supp'],['315°','refl']]],[200,[['020°','ok'],['380°','over'],['160°','supp']]],[315,[['135°','ok'],['045°','refl'],['495°','over']]]];
 const LEG=[4,3],FINISH=90+Math.atan2(3,4)*180/Math.PI; // 4 km east then 3 km south: 126.87°
VIS.reg('flagbear',c=>{let A,ctl,quiz;
 const G={arm:0,i:0,log:[],msg:'',bad:false,drag:false,pick:null,run:0,onTick:()=>{}};
 const mode=()=>['set','measure','back','rule','journey','quiz'][A.step];
 const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
 const fail=t=>{G.bad=true;G.msg=t;A.sound.miss();tell(t);A.redraw()};
 const k=n=>A.narrow?n:Math.round(n*1.15);
 function label(g,s,x,y,n,col,w,al){g.font=`${w||700} ${k(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(s,x,y)}
 function pill(g,r,col,a,thick){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick?3:1.5;g.stroke()}
 const dir=(b,r)=>({x:Math.sin(rad(b))*r,y:-Math.cos(rad(b))*r});
 // where the arm pivots, and how long it is, for the current step
 function pivot(){const v=mode(),R=Math.min(A.W*.4,A.H*.36);
  if(v==='back'){const P=points(BACK[Math.min(G.i,BACK.length-1)]);return{...P.B,R:R*.8}}
  if(v==='journey'){const J=journey();return{...J.S,R:J.u*5.6}}
  return{x:A.W/2,y:A.H*.47,R:Math.min(A.W*.4,A.H*.32)}}
 function points(b,lift){const D=Math.min(A.W*.5,A.H*(lift?.34:.46)),d=dir(b,D),cx=A.W/2,cy=A.H*(lift?.4:.5);return{A:{x:cx-d.x/2,y:cy-d.y/2},B:{x:cx+d.x/2,y:cy+d.y/2},D}}
 function journey(){const u=Math.min(A.W/6.5,A.H/5.4),S={x:A.W/2-2*u,y:A.H*.5-1.5*u};return{u,S,P:{x:S.x+LEG[0]*u,y:S.y},F:{x:S.x+LEG[0]*u,y:S.y+LEG[1]*u}}}
 function north(g,p,len){const C=A.col;g.strokeStyle=C.mu;g.lineWidth=2;g.setLineDash([5,4]);g.beginPath();g.moveTo(p.x,p.y+len*.25);g.lineTo(p.x,p.y-len);g.stroke();g.setLineDash([]);
  g.fillStyle=C.tx;g.beginPath();g.moveTo(p.x,p.y-len-10);g.lineTo(p.x-6,p.y-len+2);g.lineTo(p.x+6,p.y-len+2);g.fill();label(g,'N',p.x+14,p.y-len-6,13,C.tx,800)}
 function rose(g,P){const C=A.col;g.strokeStyle=A.alpha(C.mu,.6);g.lineWidth=1;g.beginPath();g.arc(P.x,P.y,P.R,0,7);g.stroke();
  for(let d=0;d<360;d+=10){const a=dir(d,P.R),b=dir(d,P.R-(d%90?6:12));g.beginPath();g.moveTo(P.x+a.x,P.y+a.y);g.lineTo(P.x+b.x,P.y+b.y);g.stroke()}
  [90,180,270].forEach(d=>{const t=dir(d,P.R+14);label(g,fig3(d),P.x+t.x,P.y+t.y,11,C.mu,700)})}
 function arm(g,P,col){const C=A.col,e=dir(G.arm,P.R);g.fillStyle=A.alpha(C.am,.22);g.beginPath();g.moveTo(P.x,P.y);g.arc(P.x,P.y,Math.min(P.R*.32,44),-Math.PI/2,-Math.PI/2+rad(G.arm));g.closePath();g.fill();
  g.strokeStyle=col||C.vi;g.lineWidth=4;g.beginPath();g.moveTo(P.x,P.y);g.lineTo(P.x+e.x,P.y+e.y);g.stroke();g.fillStyle=col||C.vi;g.beginPath();g.arc(P.x+e.x,P.y+e.y,11,0,7);g.fill();
  g.fillStyle=C.tx;g.beginPath();g.arc(P.x,P.y,5,0,7);g.fill();const r=mode()==='journey'?{x:8,y:A.H*.62,w:104,h:32}:{x:A.W-112,y:36,w:104,h:32};pill(g,r,C.vi,.14);label(g,fig3(G.arm),r.x+r.w/2,r.y+r.h/2,18,C.tx,800)}
 function feedback(g){if(!G.msg)return;const C=A.col;g.font=`700 ${k(12)}px system-ui,sans-serif`;const rows=[];let cur='';
  for(const w of G.msg.split(' ')){const t=cur?cur+' '+w:w;if(cur&&g.measureText(t).width>A.W-40){rows.push(cur);cur=w}else cur=t}rows.push(cur);
  const lh=k(12)+5,h=rows.length*lh+10,y=A.H-h-6;pill(g,{x:10,y,w:A.W-20,h},G.bad?C.rd:C.gr,.13);rows.forEach((l,i)=>label(g,l,A.W/2,y+5+lh*(i+.5),12,C.tx))}
 const ruleR=j=>{const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.68-22,w,h:44}};
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.08:.5);g.fillRect(0,0,W,H);const v=mode(),P=pivot();
  if(v==='set'||v==='measure'){north(g,P,P.R+4);rose(g,P);
   if(v==='set')label(g,G.i<SET.length?`Set ${fig3(SET[G.i])}`:'All set',12,22,15,C.tx,800,'left');
   else{MARKS.forEach(([n,b,e],j)=>{if(j<G.i||j===G.i){const p=dir(b,P.R*.82);g.font=`${k(26)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,P.x+p.x,P.y+p.y);if(j<G.i)label(g,fig3(b),P.x+p.x,P.y+p.y+20,11,C.tx,800)}});
    label(g,G.i<MARKS.length?`Point at the ${MARKS[G.i][0]}`:'All measured',12,22,15,C.tx,800,'left')}
   arm(g,P)}
  if(v==='back'){const b=BACK[Math.min(G.i,BACK.length-1)],Q=points(b);north(g,Q.A,50);north(g,Q.B,50);g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();g.moveTo(Q.A.x,Q.A.y);g.lineTo(Q.B.x,Q.B.y);g.stroke();
   label(g,'A',Q.A.x-14,Q.A.y+14,16,C.tx,800);label(g,'B',Q.B.x+14,Q.B.y+14,16,C.tx,800);label(g,G.i<BACK.length?`B from A: ${fig3(b)}. Point from B to A.`:'Back bearings found',12,22,14,C.tx,800,'left');
   if(G.i<BACK.length)arm(g,P,C.pk)}
  if(v==='rule'){const it=RULE[G.i];if(it){const Q=points(it[0],true);north(g,Q.A,44);north(g,Q.B,44);g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();g.moveTo(Q.A.x,Q.A.y);g.lineTo(Q.B.x,Q.B.y);g.stroke();
    label(g,'A',Q.A.x-14,Q.A.y+14,16,C.tx,800);label(g,'B',Q.B.x+14,Q.B.y+14,16,C.tx,800);label(g,`B from A is ${fig3(it[0])}. A from B?`,12,22,14,C.tx,800,'left');
    it[1].forEach(([t],j)=>{const r=ruleR(j);pill(g,r,G.pick===j?C.rd:C.vi,.14,G.pick===j);label(g,t,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)})}else label(g,'Back bearing = bearing ± 180°',W/2,H*.4,16,C.gr,800)}
  if(v==='journey'){const J=journey();north(g,J.S,50);north(g,J.P,30);g.strokeStyle=C.cy;g.lineWidth=3;g.beginPath();g.moveTo(J.S.x,J.S.y);g.lineTo(J.P.x,J.P.y);g.lineTo(J.F.x,J.F.y);g.stroke();
   label(g,'4 km on 090°',(J.S.x+J.P.x)/2,J.S.y-14,12,C.tx,800);label(g,'3 km on 180°',J.P.x-8,(J.P.y+J.F.y)/2-20,12,C.tx,800,'right');label(g,'Start',J.S.x-8,J.S.y+16,12,C.tx,800,'right');label(g,'Finish',J.F.x,J.F.y+16,12,C.tx,800);
   label(g,'scale: 1 square = 1 km',12,22,13,C.mu,700,'left');for(let i=0;i<=4;i++){g.fillStyle=C.mu;g.fillRect(J.S.x+i*J.u-1,J.S.y-3,2,6)}
   if(G.i>0){g.setLineDash([6,5]);g.strokeStyle=C.gr;g.beginPath();g.moveTo(J.S.x,J.S.y);g.lineTo(J.F.x,J.F.y);g.stroke();g.setLineDash([]);label(g,'5 km',(J.S.x+J.F.x)/2-16,(J.S.y+J.F.y)/2+10,12,C.tx,800,'right')}
   arm(g,{...J.S,R:J.u*5.6})}
  if(v==='quiz')label(g,'North · clockwise · three figures',W/2,H*.45,16,C.tx,800);feedback(g);A.fx.draw(g)}

 // ---------- judging the arm ----------
 function why(armAt,want,kind){let m=`The arm reads ${fig3(armAt)}. Start at North and turn clockwise to ${fig3(want)}.`;
  if(gap(armAt,360-want)<4&&gap(want,180)>4)m=`You turned anticlockwise. ${fig3(armAt)} is ${fig3(360-armAt)} the wrong way round. Bearings go clockwise from North.`;
  else if(gap(armAt,want+90)<4||gap(armAt,want-90)<4)m=`That is 90° out. Did you start from East? Bearings always start at North.`;
  if(kind==='back'&&gap(armAt,want-180)<4)m=`That points away from A, the same way as before. Turn the arm round to face A.`;
  return m}
 function lock(){const v=mode();let want,kind='',tol=3;
  if(v==='set'){if(G.i>=SET.length)return;want=SET[G.i]}else if(v==='measure'){if(G.i>=MARKS.length)return;want=MARKS[G.i][1]}
  else if(v==='back'){if(G.i>=BACK.length)return;want=norm(BACK[G.i]+180);kind='back'}else if(v==='journey'){if(G.i>0)return;want=FINISH}else return;
  if(gap(G.arm,want)>tol)return fail(why(G.arm,want,kind));G.bad=false;A.sound.pop();
  if(v==='set')G.msg=`${fig3(want)}: ${want<90?'between North and East':want<180?'between East and South':'due West'}.`;
  if(v==='measure')G.msg=`The ${MARKS[G.i][0]} is on a bearing of ${fig3(want)}.`;
  if(v==='back')G.msg=`A from B is ${fig3(want)} = ${fig3(BACK[G.i])} ${BACK[G.i]<180?'+':'−'} 180°.`;
  if(v==='journey')G.msg=`Finish from start: about 127°, 5 km away (a 3-4-5 triangle).`;
  G.arm=Math.round(want);G.i++;sync(G.msg)}
 function choose(j){const it=RULE[G.i];if(!it)return;const [t,tag]=it[1][j],b=it[0];G.pick=j;let m='';
  if(tag!=='ok'){if(tag==='supp')m=`${t} is 180° − ${b}°, the angle on the other side. Add or take away 180° instead.`;if(tag==='refl')m=`${t} is 360° − ${b}°. That flips East and West; the back bearing points the opposite way.`;
   if(tag==='over')m=`${t} is more than 360°. Take 180° away instead: ${fig3(b-180)}.`;return fail(m)}
  G.pick=null;G.bad=false;A.sound.pop();G.msg=`${fig3(b)} ${b<180?'+':'−'} 180° = ${t}.`;G.i++;sync(G.msg)}
 function turn(d){G.arm=norm(G.arm+d);G.bad=false;A.sound.tick();sync('')}

 function sync(msg){const v=mode();let s='';
  if(v==='set')s=G.i<SET.length?`Set the arm to ${fig3(SET[G.i])}. Arm now ${fig3(G.arm)}.`:'All bearings set.';
  else if(v==='measure')s=G.i<MARKS.length?`Point the arm at the ${MARKS[G.i][0]}. Arm now ${fig3(G.arm)}.`:'All objects measured.';
  else if(v==='back')s=G.i<BACK.length?`B is on ${fig3(BACK[G.i])} from A. Point from B back to A. Arm now ${fig3(G.arm)}.`:'All back bearings found.';
  else if(v==='rule')s=G.i<RULE.length?`B from A is ${fig3(RULE[G.i][0])}. Choose the bearing of A from B.`:'All done.';
  else if(v==='journey')s=G.i<1?`Point from the start to the finish. Arm now ${fig3(G.arm)}.`:'Journey bearing found.';else s='Challenge.';
  tell((msg?msg+' ':'')+s);pad();G.onTick()}
 function pad(){if(!ctl)return;ctl.innerHTML='';const v=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
  const armOn=(v==='set'&&G.i<SET.length)||(v==='measure'&&G.i<MARKS.length)||(v==='back'&&G.i<BACK.length)||(v==='journey'&&G.i<1);
  if(armOn){b('↺ 10°',()=>turn(-10),'Turn anticlockwise 10 degrees');b('↺ 1°',()=>turn(-1),'Turn anticlockwise 1 degree');b('↻ 1°',()=>turn(1),'Turn clockwise 1 degree');b('↻ 10°',()=>turn(10),'Turn clockwise 10 degrees');b('✓ Lock bearing',lock)}
  if(v==='rule'&&G.i<RULE.length)RULE[G.i][1].forEach(([t],j)=>b(t,()=>choose(j),`Bearing ${t}`));A.redraw()}

 // ---------- pointer: drag anywhere to swing the arm round its pivot ----------
 function aim(p){const P=pivot();const d=Math.atan2(p.x-P.x,-(p.y-P.y))*180/Math.PI;G.arm=Math.round(norm(d));G.bad=false;G.msg='';A.redraw()}
 function press(p){const v=mode();if(v==='rule'){const j=[0,1,2].find(j=>{const r=ruleR(j);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(j!=null)choose(j);return false}
  if(!['set','measure','back','journey'].includes(mode()))return false;G.drag=true;aim(p);return true}
 function lift(){if(!G.drag)return;G.drag=false;A.sound.tick();sync('')}

 // ---------- steps ----------
 const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&(steps[n].predict?A.pred[n]!=null:true))A.done(msg+A.reveal(n))};
 const auto=list=>{const id=++G.run,ms=A.reduced()?15:320;list.forEach((f,j)=>setTimeout(()=>{if(id===G.run)f()},j*ms))};
 const swingTo=d=>()=>{G.arm=Math.round(norm(d));A.redraw()};
 const clean=()=>{G.run++;G.onTick=()=>{};G.arm=0;G.i=0;G.msg='';G.bad=false;G.pick=null;G.drag=false};
 const steps=[
  {h:'North, clockwise, three figures',p:'A bearing is an angle measured from North, turning clockwise. It always has three figures, so 45° is written 045°. Drag the arm, or use the turn buttons, then lock it.',
   predict:{q:'Due East is a bearing of …',opts:['090°','270°'],ans:0},task:'Set the arm to 045°, 120° and 270°',
   show:()=>{steps[0].go();auto(SET.flatMap(d=>[swingTo(d),lock]))},go:()=>{clean();sync();G.onTick=finish(0,()=>G.i>=SET.length,'045°, 120°, 270°: every bearing starts at North and turns clockwise.')}},
  {h:'Measure a bearing',p:'To find the bearing of an object from the ship, point the arm at it and read the angle from North, clockwise.',
   predict:{q:'The island is north-west of the ship. Its bearing is about …',opts:['310°','050°'],ans:0},task:'Measure the bearing of 3 objects',
   show:()=>{steps[1].go();auto(MARKS.flatMap(([,d])=>[swingTo(d),lock]))},go:()=>{clean();sync();G.onTick=finish(1,()=>G.i>=MARKS.length,'060°, 155°, 310°. North-west is between 270° and 360°.')}},
  {h:'The way back',p:'B is on a bearing from A. Now stand at B, face North, and point back at A. The bearing of A from B is not the same number.',
   predict:{q:'B is on a bearing of 070° from A. The bearing of A from B is …',opts:['070°','250°','110°'],ans:1},task:'Point from B back to A three times',
   show:()=>{steps[2].go();auto(BACK.flatMap(d=>[swingTo(d+180),lock]))},go:()=>{clean();G.arm=BACK[0];sync();G.onTick=finish(2,()=>G.i>=BACK.length,'250°, 310°, 120°. The two North lines are parallel, so the back bearing is 180° different.')}},
  {h:'Back bearing rule',p:'If the bearing is under 180°, add 180°. If it is 180° or more, take 180° away. The answer must stay between 000° and 359°.',
   task:'Choose 3 back bearings',show:()=>{steps[3].go();auto(RULE.map(()=>()=>choose(0)))},go:()=>{clean();sync();G.onTick=finish(3,()=>G.i>=RULE.length,'225°, 020°, 135°. Add or take away 180°, whichever keeps it under 360°.')}},
  {h:'A two-leg trip',p:'A boat sails 4 km on 090°, then 3 km on 180°. This scale drawing shows the trip. Swing the arm from the start to the finish to read the bearing.',
   task:'Find the bearing of the finish from the start',show:()=>{steps[4].go();auto([swingTo(FINISH),lock])},
   go:()=>{clean();sync();G.onTick=finish(4,()=>G.i>=1,'About 127°: 90° to East, plus about 37° more towards South.')}},
  {h:'Challenge',p:'',go:()=>{clean();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onTick()});

 // ---------- challenge: each wrong option is tagged with its slip ----------
 const QS=[['Write a bearing of 5° clockwise from North.','005°',[['5°','figs'],['050°','pad']]],['Which bearing points due West?','270°',[['090°','anti'],['180°','south']]],
  ['B is on 040° from A. What is the bearing of A from B?','220°',[['040°','same'],['140°','supp']]],['B is on 250° from A. What is the bearing of A from B?','070°',[['430°','over'],['110°','refl']]],
  ['A ship sails due south-east. What is its bearing?','135°',[['045°','quad'],['225°','quad']]],['An arm points 30° anticlockwise from North. What bearing is that?','330°',[['030°','anti'],['−030°','neg']]]];
 function slip(tag,t){let m='Start at North and turn clockwise.';
  if(tag==='figs')m='Bearings always have three figures: 005°, not 5°.';if(tag==='pad')m='050° is 50°. Put the zeros in front: 005°.';
  if(tag==='anti')m=`${t} is measured anticlockwise. Bearings turn clockwise from North.`;if(tag==='south')m='180° is due South. Keep turning clockwise to West.';
  if(tag==='same')m='That is the bearing of B from A. Going back points the opposite way: ±180°.';if(tag==='supp')m=`${t} is 180° minus the bearing. Add or take away 180° instead.`;
  if(tag==='over')m=`${t} is more than 360°. Take 180° away instead.`;if(tag==='refl')m=`${t} is 360° minus the bearing, which flips East and West.`;
  if(tag==='quad')m=`${t} is ${t==='045°'?'north-east':'south-west'}. South-east is halfway between East (090°) and South (180°).`;if(tag==='neg')m='Bearings are never negative. Go clockwise all the way: 360° − 30°.';
  return m}
 let qi=-1,streak=0;
 function ask(){qi++;const [q,ans,bad]=QS[qi%QS.length],all=[[ans,'ok']].concat(bad),r=qi%3,order=all.slice(r).concat(all.slice(0,r));
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');order.forEach(([t,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,t);e.onclick=()=>answer(tag,t,ans)});tell('Challenge: '+q);A.redraw()}
 function answer(tag,t,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quiz.querySelector('.fl-fb');if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓ Right: '+ans+'.':'✗ '+slip(tag,t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
  init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bearing controls'},w);quiz=c.el('div',{class:'fl-chal'},A.below);
   A.gest({down:press,move:p=>{if(G.drag)aim(p)},up:lift})}});
 A.start()})})();
