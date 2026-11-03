/* Flagship – air is all around us (ages 4–5, EYFS Understanding the World: explore the natural world, and talk about
   forces they can feel; Development Matters 3–4 "explore and talk about different forces they can feel"). Wave a fan to
   push a feather into a box, catch air in a bag and squeeze it, blow and pop bubbles, find what the wind moves outside,
   and push an upside-down cup into water so the paper inside stays dry. Targets the common ideas that an "empty" bag
   has nothing in it, that trees waving make the wind, and that air is only there when it moves. */
(()=>{const OUT=[['kite',1],['leaves',1],['washing',1],['flag',1],['rock',0],['house',0]];
VIS.reg('flagair',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');const S={};
const view=()=>['fan','bag','bub','wind','cup','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.05:1.2)),R=()=>A.redraw();
function txt(g,s,x,y,n,col,w){g.font=`${w||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
const fill=(g,col,a)=>{g.fillStyle=A.mix(A.col.pn,col,a);g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;g.stroke()};
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const cell=i=>{const w=A.W/3,h=(A.H-40)/2;return{x:(i%3)*w+4,y:36+Math.floor(i/3)*h,w:w-8,h:h-6}};
function feather(g,x,y,s,t){g.save();g.translate(x,y);g.rotate(Math.sin(t*3)*.25-.3);g.beginPath();g.ellipse(0,0,s,s*.32,0,0,7);fill(g,A.col.vi,.35);g.beginPath();g.moveTo(-s*1.2,0);g.lineTo(s,0);g.lineWidth=2;g.strokeStyle=A.col.tx;g.stroke();g.restore()}
function item(g,k,r,t,on){const x=r.x+r.w/2,y=r.y+r.h*.45,s=Math.min(r.w,r.h)*.3,sw=OUT[k][1]?Math.sin(t*4+k)*s*.18:0,C=A.col;
 g.save();g.translate(x,y);
 if(k===0){g.beginPath();g.moveTo(sw,-s);g.lineTo(s*.7+sw,0);g.lineTo(sw,s);g.lineTo(-s*.7+sw,0);g.closePath();fill(g,C.rd,.45);g.beginPath();g.moveTo(sw,s);g.quadraticCurveTo(-s*.4,s*1.3,-s*.2+sw,s*1.6);g.strokeStyle=C.tx;g.lineWidth=2;g.stroke()}
 if(k===1)[[-.5,.2],[.3,-.2],[.6,.5]].forEach(([a,b],j)=>{g.beginPath();g.ellipse(a*s+sw*(j+1)*.6,b*s,s*.32,s*.17,sw*.05+j,0,7);fill(g,C.gr,.5)});
 if(k===2){g.beginPath();g.moveTo(-s*1.2,-s*.6);g.lineTo(s*1.2,-s*.6);g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();g.beginPath();g.rect(-s*.45+sw*.5,-s*.6,s*.9,s*1.1);fill(g,C.cy,.45)}
 if(k===3){g.beginPath();g.moveTo(-s*.6,s);g.lineTo(-s*.6,-s);g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();g.beginPath();g.moveTo(-s*.6,-s);g.quadraticCurveTo(0,-s*.8+sw,s*.8,-s*.6+sw);g.lineTo(-s*.6,-s*.2);g.closePath();fill(g,C.or,.5)}
 if(k===4){g.beginPath();g.ellipse(0,s*.3,s*.9,s*.6,0,0,7);fill(g,C.mu,.45)}
 if(k===5){g.beginPath();g.rect(-s*.8,-s*.2,s*1.6,s*1.1);fill(g,C.or,.35);g.beginPath();g.moveTo(-s,-s*.2);g.lineTo(0,-s);g.lineTo(s,-s*.2);g.closePath();fill(g,C.rd,.4)}
 g.restore();if(on!=null){g.lineWidth=4;g.strokeStyle=on?C.gr:C.rd;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
 txt(g,OUT[k][0],x,r.y+r.h-12,13,C.tx,700)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view(),t=S.t||0;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.5);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'We cannot see air',W/2,H*.3,17);txt(g,'but we can feel it push',W/2,H*.44,17);txt(g,'Wind is air on the move',W/2,H*.64,16,C.mu);return}
 if(v==='fan'){const fx=W*.14,fy=H*.55,r=Math.min(W,H)*.16;g.save();g.translate(fx,fy);g.rotate(S.wave*.6-.3);g.beginPath();g.moveTo(0,0);g.arc(0,0,r,-1.1,1.1);g.closePath();fill(g,C.or,.5);g.restore();
  const bx=W*.8,bw=W*.16;g.beginPath();g.rect(bx,H*.45,bw,H*.3);fill(g,C.gr,.3);txt(g,'box',bx+bw/2,H*.8,13,C.tx,700);
  feather(g,W*(.3+S.fpos*.55),H*.5+Math.sin(t*2)*6,Math.min(W,H)*.07,t);txt(g,S.fpos>=.95?'In the box!':`Waves: ${S.waves} of 3`,W/2,22,15)}
 if(v==='bag'){const bw=Math.min(W*.5,H*.6),bh=bw*(.15+.75*S.full)*(1-S.sq*.25),x=W/2,y=H*.82;g.beginPath();A.paint.rrect(x-bw/2*(1+S.sq*.12),y-bh,bw*(1+S.sq*.12),bh,bh*.3+4);fill(g,C.cy,.25);
  if(S.full){g.beginPath();g.moveTo(x-bw*.1,y-bh);g.lineTo(x+bw*.1,y-bh);g.lineTo(x,y-bh-16);g.closePath();fill(g,C.tx,.5)}
  if(S.sq>0){const pw=8+S.sq*10;[-1,1].forEach(s=>{g.beginPath();g.ellipse(x+s*(bw/2+pw),y-bh/2,pw,pw*1.4,0,0,7);fill(g,C.or,.5)})}
  txt(g,S.full?(S.sqd?'Air pushes back!':'Full of air'):'A flat bag',W/2,24,16)}
 if(v==='bub'){const wx=W*.18,wy=H*.85;g.beginPath();g.moveTo(wx,wy);g.lineTo(wx+W*.12,wy-H*.18);g.lineWidth=4;g.strokeStyle=C.tx;g.stroke();g.beginPath();g.arc(wx+W*.12+8,wy-H*.18-8,12,0,7);g.lineWidth=3;g.stroke();
  S.bubs.forEach(b=>{g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.fillStyle=A.alpha(C.cy,.16);g.fill();g.lineWidth=3;g.strokeStyle=C.cy;g.stroke();g.beginPath();g.arc(b.x-b.r*.35,b.y-b.r*.35,b.r*.18,0,7);g.fillStyle=C.pn;g.fill()});
  txt(g,`Popped: ${S.pops} of 3`,W/2,22,15)}
 if(v==='wind'){OUT.forEach((o,i)=>item(g,i,cell(i),t,S.pick[i]));txt(g,`Things the wind moves: ${S.pick.filter((x,i)=>x&&OUT[i][1]).length} of 4`,W/2,18,14)
  for(let i=0;i<3;i++){const y=50+i*(H-80)/3,x=((t*90+i*170)%(W+120))-60;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+30,y-10,x+60,y);g.lineWidth=2.5;g.strokeStyle=A.alpha(C.mu,.8);g.stroke()}}
 if(v==='cup'){const top=H*.4,wy=H*.42,cw=Math.min(W*.26,H*.3),ch=cw*.9,cx=W/2,cyy=H*.08+S.depth*(H*.5);
  g.beginPath();g.rect(W*.12,wy,W*.76,H*.55);g.fillStyle=A.alpha(C.cy,.28);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke();
  const wl=Math.max(0,Math.min(ch,(cyy+ch)-wy)),inW=S.tip>.5?wl:Math.min(wl,ch*.12*S.depth);
  g.save();g.translate(cx,cyy+ch/2);g.rotate(S.tip*.9);
  if(inW>0){g.beginPath();g.rect(-cw*.42,ch/2-inW,cw*.84,inW);g.fillStyle=A.alpha(C.cy,.45);g.fill()}
  g.beginPath();g.rect(-cw*.3,-ch/2+4,cw*.6,ch*.22);fill(g,S.wet?C.vi:C.pk,S.wet?.55:.2);
  g.beginPath();g.moveTo(-cw/2,-ch/2);g.lineTo(cw/2,-ch/2);g.lineTo(cw*.42,ch/2);g.moveTo(-cw*.42,ch/2);g.lineTo(-cw/2,-ch/2);g.lineWidth=4;g.strokeStyle=C.tx;g.stroke();g.restore();
  S.cb.forEach(b=>{g.beginPath();g.arc(b.x,b.y,b.r,0,7);g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke()});
  txt(g,S.wet?'Air out, water in: wet paper':S.depth>=1?'Under water: the paper is dry!':'Drag the cup down into the water',W/2,22,15);void top}
 A.fx.draw(g)}
const bad=t=>{A.sound.miss();tell(t);R()},good=t=>{A.sound.pop();tell(t);pad();R();S.want()};
/* step 0 */
function wave(){if(view()!=='fan'||S.fpos>=.95)return;S.waves++;A.sound.whoosh();A.tween(S,{wave:1},200,'out',()=>A.tween(S,{wave:0},250));
 A.fx.add(10,i=>({x:A.W*.22,y:A.H*.5+(i-5)*6,vx:280+Math.random()*80,vy:0,life:.8,r:2.5,col:A.col.cy}));
 const to=Math.min(1,S.waves/3);A.tween(S,{fpos:to},700,'out');if(S.waves<3){tell(`Whoosh! The air pushed the feather. ${3-S.waves} more.`);return R()}
 good('The moving air pushed the feather into the box. You cannot see air, but it pushes!')}
/* step 1 */
function swish(){if(view()!=='bag'||S.full)return;A.sound.whoosh();A.tween(S,{full:1},700,'out');tell('Swish! Now hold the top shut. The bag is puffed up.');pad();R()}
function squeeze(){if(view()!=='bag')return;if(!S.full)return bad('The bag is flat. Swish it through the air first.');
 A.tween(S,{sq:1},300,'out',()=>A.tween(S,{sq:0},400,'back'));S.sqd=1;good('Squeeze! It pushes back. The bag is full of air, not empty.')}
/* step 2 */
function blow(){if(view()!=='bub')return;A.sound.whoosh();for(let i=0;i<3;i++)S.bubs.push({x:A.W*.32+i*A.W*.12,y:A.H*.62-i*16,r:Math.min(A.W,A.H)*(.07+.01*i),vy:-18-i*6,ph:i});tell('Bubbles! Tap a bubble to pop it.');pad();A.kick();R()}
function pop(i){const b=S.bubs[i];if(!b)return;S.bubs.splice(i,1);S.pops++;A.fx.add(12,j=>({x:b.x,y:b.y,vx:Math.cos(j)*120,vy:Math.sin(j)*120,life:.5,r:2,col:A.col.cy}));
 if(S.pops<3){A.sound.pop();tell(`Pop! The air inside got out. ${3-S.pops} more.`);pad();return R()}good('Pop! Each bubble had air inside.')}
/* step 3 */
function pick(i){if(view()!=='wind'||S.pick[i]!=null)return;const[n,m]=OUT[i];S.pick[i]=!!m;
 if(!m)return bad(`The wind pushes the ${n} too, but it is too heavy to move.`);
 const k=S.pick.filter((x,j)=>x&&OUT[j][1]).length;if(k<4){A.sound.tick();tell(`Yes! The wind moves the ${n}. ${4-k} more.`);pad();return R()}good('The wind moved the kite, leaves, washing and flag. Wind is moving air.')}
/* step 4 */
function push(d){if(view()!=='cup'||S.tip)return;S.depth=Math.max(0,Math.min(1,d));if(S.depth>=1&&!S.down){S.down=1;A.sound.tick();tell('The cup is under the water. Air in the cup keeps the water out. The paper is dry! Now tip the cup.');pad()}R()}
function tip(){if(view()!=='cup')return;if(!S.down)return bad('Push the cup all the way down first.');if(S.tip)return;
 A.tween(S,{tip:1},900,'io',()=>{S.wet=1;good('Bubbles of air came out, and water got in. Now the paper is wet.')});
 for(let i=0;i<5;i++)S.cb.push({x:A.W/2+A.W*.1,y:A.H*.6+i*10,r:6+i%3*2});A.kick()}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='fan'&&S.fpos<.95)B('Wave the fan',wave);
 if(v==='bag'){if(!S.full)B('Swish the bag',swish);B('Squeeze the bag',squeeze)}
 if(v==='bub'){B('Blow bubbles',blow);S.bubs.forEach((b,i)=>B(`Pop bubble ${i+1}`,()=>pop(i)))}
 if(v==='wind')OUT.forEach(([n],i)=>{if(S.pick[i]==null)B(n,()=>pick(i),`Does the wind move the ${n}?`)});
 if(v==='cup'){if(!S.down)B('Push the cup down',()=>push(S.depth+.5));B('Tip the cup',tip)}}
let drag=null;
function down(p){const v=view();if(v==='fan'){wave();return false}
 if(v==='bag'){S.full?squeeze():swish();return false}
 if(v==='bub'){const i=S.bubs.findIndex(b=>Math.hypot(p.x-b.x,p.y-b.y)<b.r+10);if(i>=0)pop(i);else if(p.x<A.W*.4&&p.y>A.H*.55)blow();return false}
 if(v==='wind'){OUT.forEach((o,i)=>{if(inR(p,cell(i)))pick(i)});return false}
 if(v==='cup'&&!S.tip){if(S.down){tip();return false}drag={y:p.y,d:S.depth};return true}return false}
function mv(p){if(drag)push(drag.d+(p.y-drag.y)/(A.H*.5))}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},t:0,wave:0,waves:0,fpos:0,full:0,sq:0,sqd:0,bubs:[],pops:0,pick:[],depth:0,down:0,tip:0,wet:0,cb:[]});drag=null};
const steps=[
{h:'Wave the fan',p:'Tap the fan to wave it. Watch the feather.',task:'Push the feather into the box',
 show:()=>{steps[0].go();play([wave,wave,wave],800)},
 go:()=>{reset();tell('A fan, a feather and a box. Tap the fan to wave it.');pad();S.want=check(0,()=>S.fpos>=.95||S.waves>=3,'Air pushed the feather.')}},
{h:'Catch some air',p:'Swish the bag through the air. Then squeeze it.',predict:{q:'Is this bag empty?',opts:['No, it has air in it','Yes, there is nothing in it','It has water in it'],ans:0},task:'Catch air, then squeeze',
 show:()=>{steps[1].go();play([swish,squeeze],900)},
 go:()=>{reset();tell('A flat bag. Swish it through the air to catch some.');pad();S.want=check(1,()=>S.sqd,'Air fills the bag.')}},
{h:'Blow bubbles',p:'Tap Blow bubbles. Then tap a bubble to pop it.',task:'Pop 3 bubbles',
 show:()=>{steps[2].go();play([blow,()=>pop(0),()=>pop(0),()=>pop(0)],800)},
 go:()=>{reset();tell('A bubble wand. Blow some bubbles.');pad();S.want=check(2,()=>S.pops>=3,'Bubbles have air inside.')}},
{h:'A windy day',p:'It is windy. Tap the things the wind moves.',predict:{q:'What makes the wind?',opts:['Moving air','The trees waving','The clouds'],ans:0},task:'Find 4 things the wind moves',
 show:()=>{steps[3].go();play([0,1,2,3].map(i=>()=>pick(i)),900)},
 go:()=>{reset();tell('A windy day. What does the wind move?');pad();S.want=check(3,()=>S.pick.filter((x,j)=>x&&OUT[j][1]).length>=4,'The wind is air on the move.')}},
{h:'Air in a cup',p:'Drag the cup down into the water. Look at the paper inside. Then tip the cup.',predict:{q:'Push the cup into the water. Is the paper wet or dry?',opts:['Dry, air is in the cup','Wet','It floats out'],ans:0},task:'Push it down, then tip it',
 show:()=>{steps[4].go();play([()=>push(.5),()=>push(1),tip],900)},
 go:()=>{reset();tell('A cup upside down with paper inside, over some water. Drag the cup down.');pad();S.want=check(4,()=>S.wet,'Air takes up space in the cup.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Can you see air?',[['No, but we can feel it','ok'],['Yes, it is blue','blue'],['No, so it is not there','none']]],
 ['What moves the leaves on a windy day?',[['Moving air','ok'],['The trees','trees'],['Nothing','nothing']]],
 ['A blown-up bag is shut tight. What is inside?',[['Air','ok'],['Nothing','empty'],['Water','water']]],
 ['Which can a puff of air move?',[['A feather','ok'],['A big rock','rock'],['A house','house']]],
 ['You tip a cup in water. Bubbles come up. What is in them?',[['Air','ok'],['Water','bwater'],['Nothing','empty']]],
 ['How can you feel air?',[['Wave a hand by your face','ok'],['Look very hard','look'],['Hold your breath','hold']]]];
function hintFor(t){let m='Air is all around us. We can feel it push.';
 if(t==='blue')m='Air has no colour. The sky looks blue, but we cannot see air.';
 if(t==='none')m='We cannot see air, but it is there. Wave a hand by your face and feel it.';
 if(t==='trees')m='The trees move because the air pushes them. Moving air is the wind.';
 if(t==='nothing')m='Something pushes the leaves. It is moving air, the wind.';
 if(t==='empty')m='It looks empty, but it is full of air. Squeeze it and feel it push back.';
 if(t==='water')m='There is no water in the bag. It is full of air.';
 if(t==='rock')m='A rock is too heavy. A puff of air moves light things.';
 if(t==='house')m='A house is too heavy to move. Try something light, like a feather.';
 if(t==='bwater')m='Bubbles in water are air coming out of the cup.';
 if(t==='look')m='Looking does not work, we cannot see air. Feel it with your hand.';
 if(t==='hold')m='Holding your breath stops air. Wave your hand to feel it move.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move:mv,up:()=>{drag=null}});
  A.every(dt=>{const v=view();if(v!=='wind'&&v!=='bub'&&v!=='fan'&&!S.cb.length)return false;S.t+=dt;
   S.bubs.forEach(b=>{b.y+=b.vy*dt;b.x+=Math.sin(S.t*2+b.ph)*12*dt});
   S.cb.forEach(b=>{b.y-=60*dt});S.cb=S.cb.filter(b=>b.y>A.H*.4);S.bubs.forEach(b=>{if(b.y<b.r+40){b.y=b.r+40;b.vy=0}});
   return v==='wind'||S.bubs.length>0||S.cb.length>0||v==='fan'});pad()}});
A.start()})})();
