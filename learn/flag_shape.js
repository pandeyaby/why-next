/* Flagship – circles, squares and triangles (ages 3–4): tap corners to count them, sort triangles from look-alikes
   (a gap, a bendy side), sort squares from rectangles by equal sides, build shapes from sticks, hunt shapes in a room. */
(()=>{
// outline points for each figure, in units of its size s, centred on (0,0)
const PTS={tri:[[0,-.55],[.6,.5],[-.6,.5]],triDown:[[-.6,-.5],[.6,-.5],[0,.55]],triThin:[[0,-.75],[.24,.6],[-.24,.6]],
 square:[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]],diamond:[[0,-.68],[.68,0],[0,.68],[-.68,0]],tiny:[[-.3,-.3],[.3,-.3],[.3,.3],[-.3,.3]],
 rectWide:[[-.8,-.38],[.8,-.38],[.8,.38],[-.8,.38]],rectTall:[[-.32,-.72],[.32,-.72],[.32,.72],[-.32,.72]]};
const NAME={tri:'triangle',triDown:'upside-down triangle',triThin:'tall thin triangle',open:'shape with a gap',curvy:'shape with a bendy side',
 square:'square',diamond:'square on its corner',tiny:'tiny square',rectWide:'long rectangle',rectTall:'standing rectangle',circle:'circle',oval:'oval'};
const COUNT=['tri','square','rectWide','circle'];
const TRIS=[['triDown',1],['open',0],['triThin',1],['curvy',0],['tri',1],['square',0]];
const QUADS=[['diamond','sq'],['rectWide','re'],['tiny','sq'],['rectTall','re'],['square','sq']];
const GOALS=['triangle','square','rectangle'];
const ROOM=[['plate','circle'],['window','square'],['sandwich','triangle'],['door','rectangle'],['clock','circle'],['book','rectangle'],['egg','oval']];
const HUNT=['circle','triangle','square','rectangle'];
VIS.reg('flagshape',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},n:0,hit:[],won:0,card:0,sticks:[],made:'',found:[],tip:'',grab:null}),S=B0();
const mode=()=>['count','tri','quad','stick','hunt','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const unit=()=>Math.min(A.W,A.H*1.3)/5;
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function label(g,t,x,y,n,al){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(t,x,y,A.W-16)}
function figure(g,k,x,y,s,col,rot){const C=A.col;g.save();g.translate(x,y);if(rot)g.rotate(rot);g.lineWidth=3;g.strokeStyle=C.tx;g.fillStyle=A.alpha(col,.5);g.lineJoin='round';
 if(k==='circle'||k==='oval'){g.beginPath();g.ellipse(0,0,s*.55,k==='oval'?s*.36:s*.55,0,0,7);g.fill();g.stroke()}
 else if(k==='open'){g.beginPath();g.moveTo(-.12*s,-.42*s);g.lineTo(-.6*s,.5*s);g.lineTo(.6*s,.5*s);g.lineTo(.1*s,-.45*s);g.stroke()}
 else if(k==='curvy'){g.beginPath();g.moveTo(0,-.55*s);g.lineTo(.6*s,.5*s);g.quadraticCurveTo(0,.05*s,-.6*s,.5*s);g.closePath();g.fill();g.stroke()}
 else{const p=PTS[k];g.beginPath();p.forEach(([a,b],i)=>i?g.lineTo(a*s,b*s):g.moveTo(a*s,b*s));g.closePath();g.fill();g.stroke()}g.restore()}
const corners=(k,x,y,s)=>(PTS[k]||[]).map(([a,b])=>({x:x+a*s,y:y+b*s}));
const hues=()=>{const C=A.col;return[C.cy,C.or,C.gr,C.pk,C.vi]};
const centre=()=>({x:A.W/2,y:A.H*.5});
const bins=()=>{const w=A.W*.36,h=A.H*.24;return[{x:8,y:A.H-h-8,w,h},{x:A.W-w-8,y:A.H-h-8,w,h}]};
const within=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const piles=()=>{const w=A.W*.3,h=A.H*.17;return[{x:10,y:fs(28),w,h,k:'S'},{x:A.W-w-10,y:fs(28),w,h,k:'L'}]};
function things(){const W=A.W,H=A.H,u=unit(),fl=H*.62;return{
 door:{x:W*.05,y:H*.16,w:W*.17,h:fl-H*.16},window:{x:W*.32,y:H*.14,w:u*1.15,h:u*1.15},clock:{x:W*.72,y:H*.1,w:u*.9,h:u*.9},
 plate:{x:W*.36,y:fl+H*.08,w:u*.9,h:u*.9},sandwich:{x:W*.575,y:fl+H*.08,w:u*.95,h:u*.85},book:{x:W*.78,y:fl+H*.12,w:u*.95,h:u*.62},egg:{x:W*.08,y:fl+H*.14,w:u*.75,h:u*.6}}}
function room(g){const C=A.col,T=things(),H=A.H,fl=H*.62;g.fillStyle=A.alpha(C.or,.18);g.fillRect(0,fl,A.W,H-fl);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.moveTo(0,fl);g.lineTo(A.W,fl);g.stroke();
 const lit=n=>S.found.includes(n)?C.gr:S.tip===n?C.rd:null,box=(r,col)=>{g.fillStyle=A.alpha(col,.45);g.fillRect(r.x,r.y,r.w,r.h);g.strokeStyle=C.tx;g.lineWidth=3;g.strokeRect(r.x,r.y,r.w,r.h)};
 let r=T.door;box(r,lit('door')||C.or);g.beginPath();g.arc(r.x+r.w*.8,r.y+r.h*.55,4,0,7);g.fillStyle=C.tx;g.fill();
 r=T.window;box(r,lit('window')||C.cy);g.beginPath();g.moveTo(r.x+r.w/2,r.y);g.lineTo(r.x+r.w/2,r.y+r.h);g.moveTo(r.x,r.y+r.h/2);g.lineTo(r.x+r.w,r.y+r.h/2);g.stroke();
 r=T.clock;figure(g,'circle',r.x+r.w/2,r.y+r.h/2,r.w*.95,lit('clock')||C.vi);g.beginPath();g.moveTo(r.x+r.w/2,r.y+r.h/2);g.lineTo(r.x+r.w/2,r.y+r.h*.2);g.moveTo(r.x+r.w/2,r.y+r.h/2);g.lineTo(r.x+r.w*.72,r.y+r.h/2);g.stroke();
 r=T.plate;figure(g,'circle',r.x+r.w/2,r.y+r.h/2,r.w*.95,lit('plate')||C.pk);
 r=T.sandwich;g.beginPath();g.moveTo(r.x,r.y+r.h);g.lineTo(r.x+r.w,r.y+r.h);g.lineTo(r.x,r.y);g.closePath();g.fillStyle=A.alpha(lit('sandwich')||C.or,.55);g.fill();g.lineWidth=3;g.stroke();
 r=T.book;box(r,lit('book')||C.gr);r=T.egg;figure(g,'oval',r.x+r.w/2,r.y+r.h/2,r.w,lit('egg')||C.cy);
 Object.entries(T).forEach(([n,q])=>label(g,n,q.x+q.w/2,Math.min(H-fs(8),q.y+q.h+fs(10)),11))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode(),u=unit(),m=centre();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){['tri','square','circle'].forEach((k,i)=>figure(g,k,W*(.2+.3*i),H*.45,u,hues()[i]));return}
 if(v==='count'&&S.n<COUNT.length){const k=COUNT[S.n],s=u*1.9;figure(g,k,m.x,m.y,s,hues()[S.n]);corners(k,m.x,m.y,s).forEach((p,i)=>{const on=S.hit.includes(i);g.beginPath();g.arc(p.x,p.y,on?13:9,0,7);g.fillStyle=on?C.gr:A.alpha(C.tx,.25);g.fill();if(on){g.fillStyle=C.bg;g.font=`800 ${fs(13)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(S.hit.indexOf(i)+1,p.x,p.y)}});
  label(g,`${NAME[k]}: ${S.hit.length} corner${S.hit.length===1?'':'s'}`,W/2,fs(14),14)}
 if(v==='count'&&S.n>=COUNT.length)label(g,'Triangle 3, square 4, rectangle 4, circle 0.',W/2,H/2,15);
 if(v==='tri'||v==='quad'){const list=v==='tri'?TRIS:QUADS,bs=bins(),names=v==='tri'?['Triangle','Not a triangle']:['Square','Rectangle'];
  bs.forEach((b,i)=>{g.fillStyle=A.alpha(i?C.vi:C.gr,.16);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.setLineDash([6,5]);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.stroke();g.setLineDash([]);label(g,names[i],b.x+b.w/2,b.y+b.h/2,14)});
  if(S.card<list.length){const k=list[S.card][0],p=S.grab&&S.grab.x!=null?S.grab:{x:m.x,y:H*.36};figure(g,k,p.x,p.y,u*1.35,S.tip?C.rd:hues()[S.card%5]);if(v==='quad')ticks(g,k,p.x,p.y,u*1.35);label(g,`Shape ${S.card+1}: which box?`,W/2,fs(14),13)}
  label(g,`Sorted ${S.card} of ${list.length}`,W/2,H-fs(10)-bins()[0].h-fs(6),12)}
 if(v==='stick'){const goal=GOALS[Math.min(S.won,2)];piles().forEach(p=>{g.fillStyle=A.alpha(C.or,.15);A.paint.rrect(p.x,p.y,p.w,p.h,10);g.fill();stick(g,p.x+p.w/2,p.y+p.h*.42,p.k==='L'?u*1.2:u*.7,0);label(g,p.k==='L'?'long sticks':'short sticks',p.x+p.w/2,p.y+p.h-fs(8),11)});
  if(S.won<3)label(g,`Make a ${goal}`,W/2,fs(14),15);
  if(S.made)figure(g,S.made,m.x,H*.62,u*1.6,C.gr);else S.sticks.forEach((k,i)=>stick(g,m.x-(S.sticks.length-1)*u*.32+i*u*.64,H*.62,k==='L'?u*1.2:u*.7,Math.PI/2));
  label(g,`Sticks: ${S.sticks.length} (${S.sticks.filter(k=>k==='S').length} short, ${S.sticks.filter(k=>k==='L').length} long)`,W/2,H-fs(12),12);
  if(S.grab&&S.grab.x!=null)stick(g,S.grab.x,S.grab.y,S.grab.k==='L'?u*1.2:u*.7,0)}
 if(v==='hunt'){room(g);if(S.found.length<4)label(g,`Find a ${HUNT[S.found.length]}`,W*.62,fs(12),15,'left')}
 A.fx.draw(g)}
function stick(g,x,y,len,rot){const C=A.col;g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=A.mix(C.or,'#7c2d12',.35);A.paint.rrect(-len/2,-5,len,10,5);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;A.paint.rrect(-len/2,-5,len,10,5);g.stroke();g.restore()}
function ticks(g,k,x,y,s){const p=PTS[k];if(!p)return;const C=A.col;g.strokeStyle=C.tx;g.lineWidth=2;p.forEach((a,i)=>{const b=p[(i+1)%p.length],mx=x+(a[0]+b[0])/2*s,my=y+(a[1]+b[1])/2*s,len=Math.hypot(b[0]-a[0],b[1]-a[1]),dx=-(b[1]-a[1])/len*7,dy=(b[0]-a[0])/len*7,n=k==='rectWide'||k==='rectTall'?(len>1?2:1):1;
 for(let j=0;j<n;j++){const o=(j-(n-1)/2)*6,ux=(b[0]-a[0])/len*o,uy=(b[1]-a[1])/len*o;g.beginPath();g.moveTo(mx+ux-dx,my+uy-dy);g.lineTo(mx+ux+dx,my+uy+dy);g.stroke()}})}
const miss=(t,k)=>{A.sound.miss();S.tip=k||'x';speak(t);setTimeout(()=>{S.tip='';A.redraw()},R()?10:700);buttons();A.redraw()};
const good=t=>{A.sound.pop();S.tip='';speak(t);buttons();A.redraw();S.want()};
function tapCorner(i){if(mode()!=='count'||S.n>=COUNT.length)return;const k=COUNT[S.n];
 if(k==='circle'){S.n++;S.won++;return good('No corners! A circle is round all the way, with no straight sides.')}
 const all=PTS[k].length;if(i==null)i=[...Array(all).keys()].find(j=>!S.hit.includes(j));if(S.hit.includes(i)){A.sound.tick();return speak('You counted that corner already. Find one with no number.')}
 S.hit.push(i);A.sound.tick();if(S.hit.length<all){speak(`${S.hit.length}.`);return A.redraw()}
 const t=`${all} corners and ${all} straight sides: a ${NAME[k]}.`;S.n++;S.won++;S.hit=[];good(t)}
const triWhy={triDown:'Only turned over: 3 straight sides, 3 corners. Still a triangle.',triThin:'Long and thin is fine: 3 straight sides, 3 corners.',tri:'3 straight sides, 3 corners: a triangle.',
 open:'There is a gap! A triangle’s 3 sides must join up.',curvy:'One side is bendy. A triangle has 3 straight sides.',square:'Count the sides: 4. A triangle has 3.'};
function sortTri(bin){if(mode()!=='tri'||S.card>=TRIS.length)return;S.grab=null;const[k,isT]=TRIS[S.card],ok=(bin===0)===!!isT;
 if(!ok)return miss(triWhy[k]);S.card++;if(S.card<TRIS.length){A.sound.tick();speak(triWhy[k]);buttons();return A.redraw()}S.won=1;good(triWhy[k]+' All sorted!')}
const quadWhy={diamond:'A square on its corner. Its 4 sides are still all the same.',tiny:'Small, but its 4 sides are all the same. A square.',square:'4 sides all the same: a square.',
 rectWide:'2 long sides and 2 short sides: a rectangle.',rectTall:'Standing up, still 2 long and 2 short sides.'};
function sortQuad(bin){if(mode()!=='quad'||S.card>=QUADS.length)return;S.grab=null;const[k,t]=QUADS[S.card],ok=(bin===0)===(t==='sq');
 if(!ok)return miss(t==='sq'?quadWhy[k]+' So it is a square.':quadWhy[k]+' Its sides are not all the same, so it is not a square.');S.card++;
 if(S.card<QUADS.length){A.sound.tick();speak(quadWhy[k]);buttons();return A.redraw()}S.won=1;good(quadWhy[k]+' All sorted!')}
function addStick(k){if(mode()!=='stick'||S.won>=3)return;S.grab=null;if(S.made){S.made='';S.sticks=[]}if(S.sticks.length>=5)return miss('Too many sticks! Take some off.');S.sticks.push(k);A.sound.tick();speak(`${S.sticks.length} stick${S.sticks.length>1?'s':''}.`);buttons();A.redraw()}
function takeStick(){if(mode()!=='stick'||!S.sticks.length)return;S.made='';S.sticks.pop();A.sound.tick();speak(`${S.sticks.length} sticks.`);buttons();A.redraw()}
function join(){if(mode()!=='stick'||S.won>=3)return;const goal=GOALS[S.won],n=S.sticks.length,sh=S.sticks.filter(k=>k==='S').length,lg=n-sh;
 if(goal==='triangle'){if(n!==3)return miss(n<3?`Only ${n} stick${n===1?'':'s'}. A triangle needs 3 sides.`:`${n} sticks is too many. A triangle has 3 sides.`);S.made='tri'}
 if(goal==='square'){if(n!==4)return miss(`A square has 4 sides. You have ${n}.`);if(sh&&lg)return miss('Some sticks are long and some are short. A square needs 4 sides all the same.');S.made='square'}
 if(goal==='rectangle'){if(n!==4)return miss(`A rectangle has 4 sides. You have ${n}.`);if(sh!==2)return miss(sh===4||lg===4?'All 4 the same makes a square. A rectangle needs 2 long and 2 short.':'Use 2 long sticks and 2 short sticks.');S.made='rectWide'}
 S.won++;const t=`You made a ${goal}!`;if(S.won<3){A.sound.pop();speak(t+' Tap a stick to start the next one.');buttons();A.redraw();S.want()}else good(t+' Three shapes from sticks.')}
function pick(n){if(mode()!=='hunt'||S.found.length>=4)return;const want=HUNT[S.found.length],[,sh]=ROOM.find(r=>r[0]===n);
 if(S.found.includes(n))return speak(`You found the ${n} already.`);
 if(sh!==want){let t=`The ${n} is ${sh==='oval'?'an':'a'} ${sh}, not a ${want}.`;if(n==='door'&&want==='square')t+=' It has 2 long sides and 2 short sides.';if(n==='egg')t+=' An oval is long and round. A circle is round all the same.';return miss(t,n)}
 S.found.push(n);const t=`Yes! The ${n} is a ${want}.`;if(S.found.length<4){A.sound.pop();speak(t);buttons();A.redraw();S.want()}else good(t+' You found all four.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='count'&&S.n<COUNT.length)COUNT[S.n]==='circle'?B('Look for corners',()=>tapCorner(),'Look for corners on the circle'):B('Count a corner',()=>tapCorner(),'Count the next corner');
 if(v==='tri'&&S.card<TRIS.length){B('▲ Triangle',()=>sortTri(0),'Put it in Triangle');B('Not a triangle',()=>sortTri(1),'Put it in Not a triangle')}
 if(v==='quad'&&S.card<QUADS.length){B('■ Square',()=>sortQuad(0),'Put it in Square');B('▬ Rectangle',()=>sortQuad(1),'Put it in Rectangle')}
 if(v==='stick'&&S.won<3){B('+ short stick',()=>addStick('S'),'Add a short stick');B('+ long stick',()=>addStick('L'),'Add a long stick');B('− take one off',takeStick,'Take a stick off');B('Join them up!',join,'Join the sticks into a shape')}
 if(v==='hunt'&&S.found.length<4)ROOM.forEach(([n])=>B(n,()=>pick(n),'The '+n));A.redraw()}
function down(p){const v=mode(),u=unit();
 if(v==='count'&&S.n<COUNT.length){const k=COUNT[S.n],m=centre();if(k==='circle'){if(Math.hypot(p.x-m.x,p.y-m.y)<u*1.3)tapCorner();return false}
  const cs=corners(k,m.x,m.y,u*1.9);const i=cs.findIndex(q=>Math.hypot(q.x-p.x,q.y-p.y)<Math.max(26,u*.35));if(i>=0)tapCorner(i);else speak('Tap a pointy corner.');return false}
 if(v==='tri'||v==='quad'){const m={x:centre().x,y:A.H*.36};if(Math.hypot(p.x-m.x,p.y-m.y)<u){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='stick'){const pl=piles().find(q=>within(p,q));if(pl){S.grab={k:pl.k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='hunt'){const hit=Object.entries(things()).find(([,r])=>within(p,{x:r.x-6,y:r.y-6,w:r.w+12,h:r.h+12}));if(hit)pick(hit[0]);return false}return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab,v=mode();if(!d)return;S.grab=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(v==='stick'){if(tap||p.y>A.H*.35)return addStick(d.k);return A.redraw()}
 const b=bins().findIndex(r=>within(p,r));if(b<0){speak('Drop it in a box.');return A.redraw()}v==='tri'?sortTri(b):sortQuad(b)}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*380))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Sides and corners',p:'Tap each pointy corner to count it. A corner is where two straight sides meet.',
 predict:{q:'How many corners does a triangle have?',opts:['4','3'],ans:1},task:'Count the corners on all 4 shapes',
 show:()=>{steps[0].go();play([...Array(12).keys()].map(()=>()=>tapCorner()))},go:()=>{fresh();speak('Tap a corner of the triangle.');buttons();S.want=check(0,()=>S.n>=4,'Triangle 3, square 4, rectangle 4. A circle has none.')}},
{h:'Is it a triangle?',p:'Drag each shape into a box, or use the buttons. A triangle has 3 straight sides that join up.',
 predict:{q:'Turn a triangle upside down. Is it still a triangle?',opts:['No','Yes'],ans:1},task:'Sort all 6 shapes',
 show:()=>{steps[1].go();play(TRIS.map(([,t])=>()=>sortTri(t?0:1)))},go:()=>{fresh();speak('Is this a triangle?');buttons();S.want=check(1,()=>S.won>=1,'3 straight sides that join up make a triangle, any way round.')}},
{h:'Square or rectangle?',p:'The little marks show which sides are the same. Is it a square or a rectangle?',
 predict:{q:'A square stands on its corner. What is it now?',opts:['A diamond, not a square','Still a square'],ans:1},task:'Sort all 5 shapes',
 show:()=>{steps[2].go();play(QUADS.map(([,t])=>()=>sortQuad(t==='sq'?0:1)))},go:()=>{fresh();speak('Square or rectangle?');buttons();S.want=check(2,()=>S.won>=1,'A square has 4 sides all the same. A rectangle has 2 long and 2 short.')}},
{h:'Make it with sticks',p:'Drag sticks down to the mat, or tap them. Then join them up to make the shape.',task:'Make a triangle, a square and a rectangle',
 show:()=>{steps[3].go();play([()=>addStick('S'),()=>addStick('S'),()=>addStick('S'),join,()=>addStick('L'),()=>addStick('L'),()=>addStick('L'),()=>addStick('L'),join,()=>addStick('L'),()=>addStick('S'),()=>addStick('L'),()=>addStick('S'),join])},
 go:()=>{fresh();speak('Make a triangle. Add some sticks.');buttons();S.want=check(3,()=>S.won>=3,'3 sticks make a triangle. 4 the same make a square. 2 long and 2 short make a rectangle.')}},
{h:'Shape hunt',p:'Find each shape in the room. Tap it.',task:'Find a circle, a triangle, a square and a rectangle',
 show:()=>{steps[4].go();play(['plate','sandwich','window','door'].map(n=>()=>pick(n)))},go:()=>{fresh();speak('Find a circle. Tap it.');buttons();S.want=check(4,()=>S.found.length>=4,'Shapes are all around us: a round plate, a square window, a door shaped like a rectangle.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['How many corners does a triangle have?',[['3','ok'],['4','four'],['0','none']]],
 ['A square stands on its corner. What shape is it?',[['A square','ok'],['A triangle','tipt'],['A new shape, a diamond','tip']]],
 ['A shape has 2 long sides and 2 short sides. What is it?',[['A rectangle','ok'],['A square','allsq'],['A triangle','four']]],
 ['Which one is a circle?',[['A round plate','ok'],['An egg','oval'],['A window','sides']]],
 ['3 straight sides, but one side has a gap. Is it a triangle?',[['No, the sides must join up','ok'],['Yes, it has 3 sides','gap'],['Yes, it has corners','gap']]]];
function why(t){let m='Count the straight sides, then the corners.';
 if(t==='four')m='Count again. A triangle has 3 sides and 3 corners. 4 is a square or a rectangle.';
 if(t==='none')m='A circle has no corners. A triangle has 3 pointy ones.';
 if(t==='tip')m='Turning a shape does not change it. Its 4 sides are still all the same, so it is still a square.';
 if(t==='tipt')m='It still has 4 sides. A triangle has 3.';
 if(t==='allsq')m='A square has 4 sides all the same. 2 long and 2 short is a rectangle.';
 if(t==='oval')m='An egg is an oval: long and round. A circle is round the same all the way.';
 if(t==='sides')m='A window has straight sides and corners. A circle has none.';
 if(t==='gap')m='The sides must join up all the way round. A gap means it is not a triangle.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Shape spotter.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
