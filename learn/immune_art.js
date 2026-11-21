/* Data and drawings for flagimmune (The Immune System, ages 9–11). Facts checked against the NHS page "Why vaccination is
   safe and important" and its "How vaccines work" guidance, UKHSA's Green Book chapter 1 (immunity and how vaccines
   work), BBC Bitesize KS3 Biology "Defence against pathogens" and OpenStax Biology 2e, chapter 42 (the immune system).
   Barriers keep most germs out: skin, sticky mucus and hairs in the nose, tears, and acid in the stomach. Germs that get
   in can multiply fast (some bacteria split in two about every 20 minutes). White blood cells called phagocytes swallow
   germs; others (lymphocytes) make antibodies, each shaped to fit one kind of germ. The first time, making enough
   antibodies takes days and you may feel ill; memory cells make the second response faster and bigger. A vaccine holds
   a weakened, killed or partial germ (or the instructions for one part), so the body learns it without the illness.
   Antibiotics work on bacteria, not viruses. Slips it targets: germs that get in just wait; one antibody fits every
   germ; you get just as ill the second time; a vaccine is a medicine that kills germs or gives you the illness;
   antibiotics cure a cold; and putting a barrier in the wrong place. */
const IMM=(()=>{
/* the four ways in and their guards; x and y are fractions of the body box */
const DOORS=[{k:'eyes',n:'Eyes',x:.5,y:.1},{k:'nose',n:'Nose',x:.5,y:.185},{k:'skin',n:'Skin',x:.13,y:.46},{k:'stomach',n:'Stomach',x:.5,y:.47}];
const CUT={x:.64,y:.82};
const GUARDS=[{n:'Sticky mucus',d:'nose',job:'Sticky mucus and tiny hairs in the nose trap germs you breathe in.'},
 {n:'Stomach acid',d:'stomach',job:'Strong acid in the stomach kills most germs you swallow with food.'},
 {n:'Tough skin',d:'skin',job:'Skin is a tough wall. Germs cannot get through skin that is not broken.'},
 {n:'Tears',d:'eyes',job:'Tears wash germs out of the eyes, and they hold a chemical that kills some germs.'}];
/* three kinds of germ; s = the shape of the bumps on the outside, which only one antibody fits */
const KINDS=[{n:'Cold germ',s:'tri',c:'#15803d',w:'triangle'},{n:'Chickenpox germ',s:'sq',c:'#c2410c',w:'square'},{n:'Tummy-bug germ',s:'dot',c:'#7e22ce',w:'round'}];
const ABS=[1,2,0];   /* the order the antibodies sit in the tray (by shape) */
/* antibody level: a smooth rise to a peak h at day p, starting at day s */
const bump=(d,s,p,h)=>{if(d<=s)return 0;const x=(d-s)/(p-s);return h*x*x*x*Math.exp(3*(1-x))};
const DESC=['A body with four ways in for germs: eyes, nose, skin and stomach. Four guard cards. Drag each guard to the way in it protects.',
 'Inside a blood vessel: 2 germs and a white blood cell. Tap the clock to wait 20 minutes. Drag the white blood cell onto a germ to swallow it.',
 'Three germs, each with different bumps. Three Y-shaped antibodies with different tips. Drag each antibody onto the germ it fits.',
 'A graph of antibodies over 40 days. Tap the germ card to let the germ in, then let the same germ in again later.',
 'Ava and Ben, each with a graph. Drag the vaccine to Ava. Then let the same germ reach them both.',
 'Challenge.'];
const DONE=['Skin, mucus, tears and acid keep most germs out, and a plaster covers a gap in the skin.',
 '2 germs became 8 in 40 minutes, and the white blood cell swallowed them all.',
 'Each antibody fits one kind of germ, like a key fits one lock.',
 'The first time took about two weeks and you were ill. The second time, memory cells made antibodies fast.',
 'The vaccine taught Ava\'s body the germ safely, so she fought it fast. Ben had never met it and got ill.'];
/* challenge: a = right answer; o = [wrong answer, slip type] */
const QS=[{q:'Which part of you traps germs you breathe in?',a:'Sticky mucus in the nose',o:[['Acid in the stomach','door'],['Tears in the eyes','door']]},
 {q:'Five germs get into a cut and nothing stops them for an hour. What happens?',a:'There are many more germs',o:[['There are still five germs','wait'],['The germs leave on their own','wait']]},
 {q:'Your body has antibodies for chickenpox. A cold germ gets in. Do they stop it?',a:'No, they only fit the chickenpox germ',o:[['Yes, antibodies stop any germ','any'],['Yes, if there are lots of them','any']]},
 {q:'You had chickenpox. Years later the same germ gets in. What usually happens?',a:'Memory cells act fast, so you stay well',o:[['You get just as ill again','same'],['You get even more ill','same']]},
 {q:'How does a vaccine protect you?',a:'It lets your body learn a germ safely',o:[['It is a medicine that kills germs','cure'],['It gives you the full illness','disease']]},
 {q:'A cold is caused by a virus. Will antibiotics cure it?',a:'No, antibiotics work on bacteria, not viruses',o:[['Yes, antibiotics kill all germs','abx'],['Yes, if you take extra','abx']]}];
/* ---------- drawings (fixed light colours, dark outlines, readable in both themes) ---------- */
function body(g,b,ill){const cx=b.x+b.w/2,u=b.h;g.save();g.lineWidth=Math.max(2,u*.006);g.strokeStyle='#1f2937';g.lineCap='round';
 const skin=ill?'#fecaca':'#fcd9b6',top='#93c5fd',hr=u*.1;
 g.fillStyle=skin;[[-1],[1]].forEach(([d])=>{g.beginPath();g.moveTo(cx+d*u*.11,b.y+u*.3);g.lineTo(cx+d*b.w*.4,b.y+u*.5);g.lineWidth=u*.045;g.strokeStyle='#1f2937';g.stroke();g.lineWidth=u*.03;g.strokeStyle=skin;g.stroke()});
 [[-1],[1]].forEach(([d])=>{g.beginPath();g.moveTo(cx+d*u*.06,b.y+u*.62);g.lineTo(cx+d*u*.09,b.y+u*.95);g.lineWidth=u*.055;g.strokeStyle='#1f2937';g.stroke();g.lineWidth=u*.04;g.strokeStyle='#1e3a8a';g.stroke()});
 g.lineWidth=Math.max(2,u*.006);g.strokeStyle='#1f2937';g.fillStyle=top;g.beginPath();g.moveTo(cx-u*.13,b.y+u*.27);g.lineTo(cx+u*.13,b.y+u*.27);g.lineTo(cx+u*.11,b.y+u*.64);g.lineTo(cx-u*.11,b.y+u*.64);g.closePath();g.fill();g.stroke();
 g.fillStyle=skin;g.beginPath();g.arc(cx,b.y+u*.14,hr,0,7);g.fill();g.stroke();
 g.fillStyle='#1f2937';[-1,1].forEach(d=>{g.beginPath();g.arc(cx+d*hr*.38,b.y+u*.12,hr*.09,0,7);g.fill()});
 g.beginPath();if(ill){g.arc(cx,b.y+u*.21,hr*.25,3.4,6)}else g.arc(cx,b.y+u*.17,hr*.3,.4,2.7);g.stroke();g.restore()}
function germ(g,x,y,r,k,shape){const K=KINDS[k];g.save();g.translate(x,y);g.fillStyle=K.c;g.strokeStyle='#1f2937';g.lineWidth=Math.max(1.5,r*.08);
 for(let i=0;i<8;i++){const a=i*Math.PI/4;g.save();g.rotate(a);g.translate(0,-r*1.02);g.beginPath();
  if((shape||K.s)==='tri'){g.moveTo(-r*.2,0);g.lineTo(0,-r*.32);g.lineTo(r*.2,0)}else if((shape||K.s)==='sq')g.rect(-r*.16,-r*.3,r*.32,r*.3);else g.arc(0,-r*.14,r*.15,0,7);
  g.closePath();g.fill();g.stroke();g.restore()}
 g.beginPath();g.arc(0,0,r,0,7);g.fill();g.stroke();g.fillStyle='#ffffff';g.beginPath();g.arc(-r*.3,-r*.25,r*.16,0,7);g.arc(r*.3,-r*.25,r*.16,0,7);g.fill();
 g.fillStyle='#111827';g.beginPath();g.arc(-r*.3,-r*.22,r*.07,0,7);g.arc(r*.3,-r*.22,r*.07,0,7);g.fill();g.restore()}
function rod(g,x,y,s){g.save();g.translate(x,y);g.fillStyle='#16a34a';g.strokeStyle='#1f2937';g.lineWidth=Math.max(1.5,s*.08);g.beginPath();
 const w=s,h=s*.48;g.moveTo(-w/2+h/2,-h/2);g.lineTo(w/2-h/2,-h/2);g.arc(w/2-h/2,0,h/2,-1.57,1.57);g.lineTo(-w/2+h/2,h/2);g.arc(-w/2+h/2,0,h/2,1.57,4.71);g.closePath();g.fill();g.stroke();g.restore()}
function wbc(g,x,y,r){g.save();g.fillStyle='#ede9fe';g.strokeStyle='#4c1d95';g.lineWidth=Math.max(2,r*.07);g.beginPath();
 for(let i=0;i<=24;i++){const a=i/24*Math.PI*2,q=r*(1+.08*Math.sin(a*5));g[i?'lineTo':'moveTo'](x+q*Math.cos(a),y+q*Math.sin(a))}g.closePath();g.fill();g.stroke();
 g.fillStyle='#7c3aed';g.beginPath();g.ellipse(x-r*.15,y,r*.32,r*.22,.5,0,7);g.ellipse(x+r*.22,y+r*.12,r*.26,r*.18,-.4,0,7);g.fill();g.restore()}
function antibody(g,x,y,s,shape,col){g.save();g.translate(x,y);g.strokeStyle=col||'#1d4ed8';g.lineWidth=Math.max(3,s*.1);g.lineCap='round';g.beginPath();
 g.moveTo(0,s*.5);g.lineTo(0,0);g.lineTo(-s*.32,-s*.34);g.moveTo(0,0);g.lineTo(s*.32,-s*.34);g.stroke();g.fillStyle=col||'#1d4ed8';
 [-1,1].forEach(d=>{g.save();g.translate(d*s*.36,-s*.4);g.beginPath();if(shape==='tri'){g.moveTo(-s*.12,s*.06);g.lineTo(0,-s*.14);g.lineTo(s*.12,s*.06)}
  else if(shape==='sq')g.rect(-s*.1,-s*.12,s*.2,s*.18);else g.arc(0,-s*.03,s*.11,0,7);g.closePath();g.fill();g.restore()});g.restore()}
function syringe(g,x,y,s){g.save();g.translate(x,y);g.rotate(-.5);g.strokeStyle='#1f2937';g.lineWidth=Math.max(2,s*.05);g.fillStyle='#e0f2fe';
 g.fillRect(-s*.4,-s*.11,s*.6,s*.22);g.strokeRect(-s*.4,-s*.11,s*.6,s*.22);g.fillStyle='#38bdf8';g.fillRect(-s*.4,-s*.11,s*.3,s*.22);
 g.beginPath();g.moveTo(s*.2,0);g.lineTo(s*.5,0);g.moveTo(-s*.4,0);g.lineTo(-s*.55,0);g.moveTo(-s*.55,-s*.14);g.lineTo(-s*.55,s*.14);g.stroke();g.restore()}
function plaster(g,x,y,s,a){g.save();g.translate(x,y);g.rotate(a||-.4);g.fillStyle='#fdba74';g.strokeStyle='#7c2d12';g.lineWidth=2;
 g.beginPath();g.rect(-s*.5,-s*.17,s,s*.34);g.fill();g.stroke();g.fillStyle='#fed7aa';g.fillRect(-s*.16,-s*.13,s*.32,s*.26);g.restore()}
/* graph helpers shared by the two antibody scenes: axes, a curve over 40 days, a shaded band, a dashed day marker */
/* text that wraps to a width, rounded panels with tick/cross tones, a theme-tinted backdrop and a footer line */
function kit(A,C,sz){
function say(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||800} ${sz(n)}px system-ui,sans-serif`;g.fillStyle=o.c||C.ink;g.textAlign=o.al||'center';g.textBaseline='middle';
 const out=[];let cur='';String(s).split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(o.w&&cur&&g.measureText(t).width>o.w){out.push(cur);cur=w}else cur=t});out.push(cur);
 const step=sz(n)*1.2;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*step))}
function panel(r,bg,tone){const g=A.ctx;g.fillStyle=tone==='good'?'#d1fae5':tone==='bad'?'#fee2e2':bg||C.paper;A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(12,r.h/3));g.fill();
 g.lineWidth=tone?4:2;g.strokeStyle={good:C.good,bad:C.bad,hold:C.hold}[tone]||C.line;g.stroke()}
function backdrop(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
function count(t){say(t,A.W/2,A.H*.955,12,{c:A.col.tx,b:700})}
return{say,panel,backdrop,count}}
/* the challenge: rotating questions, each wrong answer tagged with its slip and explained by oops */
function quiz(c,A,quiz,oops){let ask=-1;
function pose(){ask++;const Q=QS[ask%QS.length],all=[[Q.a,''],...Q.o],r=ask%3,list=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb');
 const why=!s?'':s==='door'?'Not that one. Sticky mucus and tiny hairs in the nose trap germs you breathe in; acid works in the stomach and tears wash the eyes.':oops(s);
 if(!s)A.win();else A.sound.miss();fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${Q.a}.`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(s?why:'Yes.')}
return{pose}}
function graph(A,say,panel,sz,C){
function axes(r,top){const g=A.ctx;panel(r,C.paper,'');g.strokeStyle=C.ink;g.lineWidth=2;g.beginPath();g.moveTo(r.x+6,r.y+6);g.lineTo(r.x+6,r.y+r.h-6);g.lineTo(r.x+r.w-4,r.y+r.h-6);g.stroke();
 say(top,r.x+r.w/2,r.y+sz(10),10,{b:700,w:r.w-16})}
function curve(r,f,col,until){const g=A.ctx,X=d=>r.x+6+(r.w-10)*d/40,Y=v=>r.y+r.h-6-(r.h-sz(22))*v;g.strokeStyle=col;g.lineWidth=4;g.beginPath();
 for(let d=0;d<=until;d+=.5)g[d?'lineTo':'moveTo'](X(d),Y(f(d)));g.stroke()}
function band(r,a,b,col,t,mid){const g=A.ctx,X=d=>r.x+6+(r.w-10)*d/40;g.fillStyle=col;g.fillRect(X(a),r.y+sz(20),X(b)-X(a),r.h-sz(20)-6);say(t,(X(a)+X(b))/2,mid?r.y+r.h*.55:r.y+sz(30),10,{b:800})}
function mark(r,d,t){const g=A.ctx,x=r.x+6+(r.w-10)*d/40;g.strokeStyle='#475569';g.lineWidth=1.5;g.setLineDash([4,3]);g.beginPath();g.moveTo(x,r.y+sz(20));g.lineTo(x,r.y+r.h-6);g.stroke();g.setLineDash([]);
 g.font=`700 ${sz(9)}px system-ui,sans-serif`;const w=g.measureText(t).width+8;g.fillStyle='#ffffff';A.paint.rrect(x+2,r.y+sz(28)-sz(8),w,sz(16),4);g.fill();say(t,x+6,r.y+sz(28),9,{al:'left',b:700,c:'#334155'})}
return{axes,curve,band,mark}}
return{graph,kit,quiz,DOORS,CUT,GUARDS,KINDS,ABS,bump,DESC,DONE,QS,body,germ,rod,wbc,antibody,syringe,plaster}})();
