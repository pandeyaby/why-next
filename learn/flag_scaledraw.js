/* Flagship – scale drawings and similar shapes (Maths, ages 10-11; National Curriculum Year 6 Ratio and proportion:
   'solve problems involving similar shapes where the scale factor is known or can be found'). Read real lengths off a
   house plan at 1 cm for 2 m (adding 2 is refused), drag a bar to draw real lengths at that scale (divide, do not
   multiply), drag a corner to enlarge a rectangle by a scale factor (adding the factor to each side bends the shape),
   find the scale factor between similar rectangles (a difference is not a factor; it can be under 1), and measure a
   1 : 50 000 map with a ruler, converting metres to kilometres. Data and drawings: scaledraw_art.js. */
(()=>{const S=SCD;
VIS.reg('flagscaledraw',c=>{let A,T,ctl,cq,n=-1,run=0,drag=null;const st={};
const STEPS=['read','draw','grow','factor','map','chal'],now=()=>STEPS[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let TAPS=[],HANDLE=null,BOARD=null;
function msg(t,bad){st.say=t;st.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();dockFill();st.test()}
const fmt=v=>(Math.round(v*10)/10).toString();
function opts3(y,list,mark){const gap=8,w=(A.W-16-gap*2)/3,h=58;return list.map((t,i)=>{const r={i,x:8+i*(w+gap),y,w,h};T.btn(r,t,mark(i));return r})}
/* ======== 1. plan to real ======== */
function readAns(i){const R=S.READ[i],k=S.PLAN.k;return [`${R.cm*k} m`,`${R.cm+k} m`,`${fmt(R.cm/k)} m`]}
const readOrd=i=>i%3===0?[0,1,2]:i%3===1?[1,0,2]:[2,1,0];
function pickRead(j){const s=st.rd;if(s.n>=S.READ.length)return;const R=S.READ[s.n],o=readOrd(s.n)[j],v=readAns(s.n)[o];
 if(o!==0){s.no=j;A.sound.miss();return msg(o===1?`${v}? That adds 2. Each 1 cm is 2 m, so ${R.cm} cm is ${R.cm} lots of 2 m.`:`${v}? That divides. The real house is bigger than the plan, so multiply by 2.`,true)}
 s.no=-1;s.n++;A.sound.pop();msg(`${R.cm} cm \u00D7 2 = ${R.cm*2} m. Yes, ${R.t} is ${R.cm*2} m long.`,false)}
function viewRead(){const s=st.rd,fin=s.n>=S.READ.length,R=S.READ[Math.min(s.n,2)],y0=T.top(fin?S.DONE[0]:`Scale: 1 cm stands for 2 m. How long is ${R.t} really? (${s.n+1} of 3)`,fin?'ok':st.bad?'no':'',st.say,st.bad),g=A.ctx;
 const u=Math.min((A.W-40)/8,(A.H-y0-150)/4.6,46),x0=(A.W-8*u)/2,y=y0+26;S.paper(g,x0,y,8,4,u,A.col.dark);
 S.PLAN.rooms.forEach(r=>{g.strokeStyle=A.col.dark?'#e2e8f0':S.INK;g.lineWidth=3;g.strokeRect(x0+r.x*u,y+r.y*u,r.w*u,r.h*u);T.say(r.t,x0+(r.x+r.w/2)*u,y+(r.y+r.h/2)*u,Math.min(15,u*.36))});
 if(!fin){const [a,b,c2,d]=R.side;g.strokeStyle=S.ORANGE;g.lineWidth=7;g.beginPath();g.moveTo(x0+a*u,y+b*u);g.lineTo(x0+c2*u,y+d*u);g.stroke();
  T.say(`${R.cm} cm`,x0+(a+c2)/2*u+(a===c2?-30:0),y+(b+d)/2*u+(a===c2?24:b===0?-14:16),15,{col:A.col.dark?'#fdba74':S.ORANGE})}
 const ky=y+4*u+12;g.fillStyle=A.col.dark?'#e2e8f0':S.INK;g.fillRect(x0,ky,u,6);T.say('1 cm = 2 m',x0+u+12,ky+3,14,{al:'left'});
 TAPS=fin?[]:opts3(ky+22,readOrd(s.n).map(o=>readAns(s.n)[o]),i=>({no:s.no===i}))}
/* ======== 2. real to plan ======== */
function check2(){const s=st.dw;if(s.n>=S.FENCE.length)return;const F=S.FENCE[s.n],want=F.m/2;
 if(Math.abs(s.len-want)<.01){s.ok++;s.n++;s.len=1;A.sound.pop();return msg(`${F.m} m \u00F7 2 = ${fmt(want)} cm. Drawn to scale!`,false)}
 A.sound.miss();msg(Math.abs(s.len-F.m)<.01?`${fmt(s.len)} cm uses the real number. Each cm stands for 2 m, so divide ${F.m} by 2.`:Math.abs(s.len-F.m*2)<.01?`${fmt(s.len)} cm multiplies by 2. Going from real to plan, divide by 2.`:`${fmt(s.len)} cm would be ${fmt(s.len*2)} m. You need ${F.m} m, so how many 2 m in ${F.m} m?`,true)}
function nudge(d){const s=st.dw;if(s.n>=S.FENCE.length)return;s.len=Math.max(.5,Math.min(s.max,s.len+d));msg(`Bar: ${fmt(s.len)} cm, which stands for ${fmt(s.len*2)} m.`,false)}
function viewDraw(){const s=st.dw,fin=s.n>=S.FENCE.length,F=S.FENCE[Math.min(s.n,2)],y0=T.top(fin?S.DONE[1]:`Draw it at 1 cm for 2 m: ${F.t}. (${s.n+1} of 3)`,fin?'ok':st.bad?'no':'',st.say,st.bad),g=A.ctx;
 const cols=A.narrow?9:14,u=Math.min((A.W-32)/cols,44);s.max=cols;s.u=u;const x0=(A.W-cols*u)/2,y=y0+14;S.paper(g,x0,y,cols,3,u,A.col.dark);BOARD={x:x0,y,w:cols*u,h:3*u};
 if(!fin){g.fillStyle=S.ORANGE;g.fillRect(x0,y+u*1.2,s.len*u,u*.6);HANDLE={x:x0+s.len*u-22,y:y+u*.9,w:44,h:u*1.2};g.fillStyle=A.col.dark?'#fdba74':'#9a3412';g.beginPath();g.arc(x0+s.len*u,y+u*1.5,14,0,7);g.fill();
  T.say(`${fmt(s.len)} cm = ${fmt(s.len*2)} m`,x0+cols*u/2,y+3*u+20,16)}
 if(fin)S.FENCE.forEach((F,i)=>{g.fillStyle=S.ORANGE;g.fillRect(x0,y+u*(.2+i*.95),F.m/2*u,u*.5);T.say(`${fmt(F.m/2)} cm = ${F.m} m`,x0+F.m/2*u+8,y+u*(.45+i*.95),13,{al:'left'})});
 S.ruler(g,x0,y+3*u+40,cols,u,A.col.dark);TAPS=fin?[]:[Object.assign({i:'check'},{x:A.W/2-80,y:y+3*u+82,w:160,h:52})];if(!fin)T.btn(TAPS[0],'Check',{hot:1,n:17})}
/* ======== 3. enlarge by a scale factor ======== */
function check3(){const s=st.gr;if(s.n>=S.ENL.length)return;const E=S.ENL[s.n],W=E.w*E.k,H=E.h*E.k;
 if(s.w===W&&s.h===H){s.n++;s.w=1;s.h=1;A.sound.pop();return msg(`${E.w} \u00D7 ${E.k} = ${W} and ${E.h} \u00D7 ${E.k} = ${H}. Same shape, ${E.k} times as big.`,false)}
 A.sound.miss();msg(s.w===E.w+E.k&&s.h===E.h+E.k?`${s.w} by ${s.h} adds ${E.k} to each side. That bends the shape. Multiply each side by ${E.k}.`:(s.w===W)!==(s.h===H)?`Only one side is right. Multiply BOTH sides by ${E.k}.`:`${s.w} by ${s.h} is not ${E.k} times ${E.w} by ${E.h}. Multiply each side by ${E.k}.`,true)}
function size3(dw,dh){const s=st.gr;if(s.n>=S.ENL.length)return;s.w=Math.max(1,Math.min(s.cols,s.w+dw));s.h=Math.max(1,Math.min(s.rows,s.h+dh));msg(`Your rectangle: ${s.w} by ${s.h} squares.`,false)}
function viewGrow(){const s=st.gr,fin=s.n>=S.ENL.length,E=S.ENL[Math.min(s.n,1)],y0=T.top(fin?S.DONE[2]:`Enlarge the ${E.w} by ${E.h} rectangle by scale factor ${E.k}. Drag the corner. (${s.n+1} of 2)`,fin?'ok':st.bad?'no':'',st.say,st.bad),g=A.ctx;
 const cols=A.narrow?8:10,rows=6,u=Math.min((A.W-32)/(cols+E.w+1),(A.H-y0-90)/rows,40);s.cols=cols;s.rows=rows;
 const ox=8+u*.5,x0=ox+(E.w+1)*u,y=y0+12;S.paper(g,ox,y,E.w,E.h,u,A.col.dark);S.block(g,ox,y,u,E.w,E.h,'rgba(15,118,110,.35)',S.TEAL);T.say(`${E.w} by ${E.h}`,ox+E.w*u/2,y+E.h*u+16,14);
 S.paper(g,x0,y,cols,rows,u,A.col.dark);if(!fin){S.block(g,x0,y,u,s.w,s.h,'rgba(194,65,12,.3)',S.ORANGE);g.fillStyle=A.col.dark?'#fdba74':'#9a3412';g.beginPath();g.arc(x0+s.w*u,y+s.h*u,13,0,7);g.fill();
  HANDLE={x:x0+s.w*u-22,y:y+s.h*u-22,w:44,h:44};T.say(`${s.w} by ${s.h}`,x0+cols*u/2,y+rows*u+18,16)}
 if(fin){const L=S.ENL[S.ENL.length-1];S.block(g,x0,y,u,L.w*L.k,L.h*L.k,'rgba(194,65,12,.3)',S.ORANGE);T.say(`${L.w*L.k} by ${L.h*L.k}`,x0+L.w*L.k*u/2,y+L.h*L.k*u/2,16)}
 BOARD={x:x0,y,w:cols*u,h:rows*u,u};TAPS=fin?[]:[{i:'check',x:A.W/2-80,y:y+rows*u+38,w:160,h:52}];if(!fin)T.btn(TAPS[0],'Check',{hot:1,n:17})}
/* ======== 4. find the scale factor ======== */
const facOrd=i=>[[0,1,2],[2,0,1],[1,2,0]][i%3];
function facList(i){const P=S.PAIR[i];return [[P.k,'ok'],...P.o]}
function pickFac(j){const s=st.fc;if(s.n>=S.PAIR.length)return;const P=S.PAIR[s.n],[v,tag]=facList(s.n)[facOrd(s.n)[j]];
 if(tag!=='ok'){s.no=j;A.sound.miss();return msg(`${v}? ${S.PAIR_WHY[tag]}`,true)}
 s.no=-1;s.n++;A.sound.pop();msg(`${P.b[0]} \u00F7 ${P.a[0]} = ${P.k} and ${P.b[1]} \u00F7 ${P.a[1]} = ${P.k}. The scale factor is ${P.k}.`,false)}
function viewFactor(){const s=st.fc,fin=s.n>=S.PAIR.length,P=S.PAIR[Math.min(s.n,2)],y0=T.top(fin?S.DONE[3]:`What is the scale factor from A to B? (${s.n+1} of 3)`,fin?'ok':st.bad?'no':'',st.say,st.bad),g=A.ctx;
 const maxW=Math.max(P.a[0]+P.b[0],1),u=Math.min((A.W-40)/(maxW+1),(A.H-y0-130)/Math.max(P.a[1],P.b[1],1),30),y=y0+16;
 S.block(g,12,y,u,P.a[0],P.a[1],'rgba(15,118,110,.3)',S.TEAL);T.say('A',12+P.a[0]*u/2,y+P.a[1]*u/2,18);T.say(`${P.a[0]} by ${P.a[1]}`,12+P.a[0]*u/2,y+P.a[1]*u+14,13);
 const bx=12+(P.a[0]+1)*u;S.block(g,bx,y,u,P.b[0],P.b[1],'rgba(194,65,12,.25)',S.ORANGE);T.say('B',bx+P.b[0]*u/2,y+P.b[1]*u/2,18);T.say(`${P.b[0]} by ${P.b[1]}`,bx+P.b[0]*u/2,y+P.b[1]*u+14,13);
 const oy=y+Math.max(P.a[1],P.b[1])*u+32;TAPS=fin?[]:opts3(oy,facOrd(s.n).map(k=>'\u00D7 '+facList(s.n)[k][0]),i=>({no:s.no===i}))}
/* ======== 5. map scale ======== */
function mapPick(j){const s=st.mp;if(s.n>=S.MAP.places.length||!s.measured)return;const [v,tag]=S.MAP_OPTS[s.n][j],P=S.MAP.places[s.n];
 if(tag!=='ok'){s.no=j;A.sound.miss();return msg(tag==='units'?`${v}? ${P.cm} cm \u00D7 500 m = ${P.cm*500} m, and 1,000 m is 1 km.`:`${v}? That treats 1 cm as 1 km. On this map 1 cm is only 500 m.`,true)}
 s.no=-1;s.n++;s.measured=false;s.len=0;A.sound.pop();msg(`${P.cm} cm \u00D7 500 m = ${(P.cm*500).toLocaleString('en-GB')} m = ${fmt(P.cm/2)} km.`,false)}
function mapLen(v){const s=st.mp;if(s.n>=S.MAP.places.length)return;const P=S.MAP.places[s.n];s.len=Math.max(0,Math.min(s.max||10,Math.round(v*2)/2));
 if(Math.abs(s.len-P.cm)<.01&&!s.measured){s.measured=true;A.sound.pop();return msg(`The ruler reads ${P.cm} cm to the ${P.t.toLowerCase()}. How far is that really?`,false)}A.redraw()}
function viewMap(){const s=st.mp,fin=s.n>=S.MAP.places.length,P=S.MAP.places[Math.min(s.n,1)],y0=T.top(fin?S.DONE[4]:!s.measured?`Map scale 1 : 50 000. Drag the ruler end to the ${P.t.toLowerCase()}.`:`${P.cm} cm on the map. How far is it really?`,fin?'ok':st.bad?'no':'',st.say,st.bad),g=A.ctx;
 const cols=10,u=Math.min((A.W-40)/cols,44);s.max=cols;s.u=u;const x0=(A.W-cols*u)/2,y=y0+12,h=Math.min(150,(A.H-y0)*.32);
 g.fillStyle=A.col.dark?'#14281d':'#ecfccb';S.rr(g,x0-12,y,cols*u+24,h,12);g.fill();g.strokeStyle='#a3a3a3';g.lineWidth=10;g.beginPath();g.moveTo(x0,y+h*.6);g.lineTo(x0+cols*u,y+h*.6);g.stroke();
 S.txt(g,'\u{1F3EB}',x0,y+h*.3,30);S.MAP.places.forEach(Q=>S.txt(g,Q.e,x0+Q.cm*u,y+h*.3,30));T.say('School',x0+4,y+h*.86,13,{al:'left'});
 BOARD={x:x0,y:y+h+8,w:cols*u,h:30,u};S.ruler(g,x0,y+h+8,cols,u,A.col.dark);if(!fin){g.strokeStyle=S.ORANGE;g.lineWidth=5;g.beginPath();g.moveTo(x0,y+h*.6);g.lineTo(x0+s.len*u,y+h*.6);g.stroke();
  g.fillStyle=A.col.dark?'#fdba74':'#9a3412';g.beginPath();g.arc(x0+s.len*u,y+h*.6,13,0,7);g.fill();HANDLE={x:x0+s.len*u-22,y:y+h*.6-22,w:44,h:44};if(s.len>0)T.say(`${fmt(s.len)} cm`,x0+s.len*u,y+h*.6-24,14)}
 T.say('1 cm on the map = 50 000 cm = 500 m',A.W/2,y+h+56,14);
 TAPS=fin||!s.measured?[]:opts3(y+h+78,S.MAP_OPTS[s.n].map(o=>o[0]),i=>({no:s.no===i}))}
/* ======== wiring ======== */
const VIEW={read:viewRead,draw:viewDraw,grow:viewGrow,factor:viewFactor,map:viewMap};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#ffffff';g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){const y0=T.top('Challenge: scale drawings and scale factors','ok'),u=Math.min(26,(A.W-60)/9);S.block(g,20,y0+20,u,2,1,'rgba(15,118,110,.3)',S.TEAL);S.block(g,20+3*u,y0+20,u,6,3,'rgba(194,65,12,.25)',S.ORANGE);T.say('\u00D7 3',20+2.5*u,y0+12,16);return}
 VIEW[k]();A.fx.draw(g)}
function tapAt(i){const k=now();if(k==='read')pickRead(i);else if(k==='factor')pickFac(i);else if(k==='map')mapPick(i);else if(i==='check')(k==='draw'?check2:check3)()}
function down(p){const k=now();if((k==='draw'||k==='grow'||k==='map')&&hit(p,HANDLE)){drag={k};return true}
 const r=TAPS.find(q=>hit(p,q));if(r)tapAt(r.i);return false}
function move(p){if(!drag)return;const k=now();
 if(k==='draw'){const s=st.dw;s.len=Math.max(.5,Math.min(s.max,Math.round((p.x-BOARD.x)/s.u*2)/2));A.redraw()}
 if(k==='grow'){const s=st.gr,u=BOARD.u;s.w=Math.max(1,Math.min(s.cols,Math.round((p.x-BOARD.x)/u)));s.h=Math.max(1,Math.min(s.rows,Math.round((p.y-BOARD.y)/u)));A.redraw()}
 if(k==='map')mapLen((p.x-BOARD.x)/BOARD.u)}
function up(){if(!drag)return;const k=drag.k;drag=null;if(k==='draw')msg(`Bar: ${fmt(st.dw.len)} cm, which stands for ${fmt(st.dw.len*2)} m. Tap Check.`,false);else if(k==='grow')msg(`Your rectangle: ${st.gr.w} by ${st.gr.h} squares. Tap Check.`,false);else A.redraw()}
function fresh(){run++;drag=null;for(const k in st)delete st[k];Object.assign(st,{rd:{n:0,no:-1},dw:{n:0,len:1,ok:0,max:9,u:30},gr:{n:0,w:1,h:1,cols:8,rows:6},fc:{n:0,no:-1},mp:{n:0,len:0,measured:false,no:-1},say:null,bad:false,test:()=>{}})}
function open(i,met){fresh();c.say(S.DESC[i]);A.cv.setAttribute('aria-label',S.DESC[i]);st.test=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(S.DONE[i]+A.reveal(i))};dockFill();A.redraw()}
function demo(i,plan){steps[i].go();const r=run;let t=0;plan.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(r===run)f()},t)})}
function dockFill(){if(!ctl)return;ctl.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='read'&&st.rd.n<S.READ.length)readOrd(st.rd.n).forEach((o,j)=>{const v=readAns(st.rd.n)[o];b(v,()=>pickRead(j),`Real length ${v}`)});
 if(k==='draw'&&st.dw.n<S.FENCE.length){b('\u2212 0.5 cm',()=>nudge(-.5),'Make the bar 0.5 cm shorter');b('+ 0.5 cm',()=>nudge(.5),'Make the bar 0.5 cm longer');b('Check',check2,'Check the bar length')}
 if(k==='grow'&&st.gr.n<S.ENL.length){b('Wider',()=>size3(1,0),'One square wider');b('Narrower',()=>size3(-1,0),'One square narrower');b('Taller',()=>size3(0,1),'One square taller');b('Shorter',()=>size3(0,-1),'One square shorter');b('Check',check3,'Check the enlargement')}
 if(k==='factor'&&st.fc.n<S.PAIR.length)facOrd(st.fc.n).forEach((o,j)=>{const v=facList(st.fc.n)[o][0];b('\u00D7 '+v,()=>pickFac(j),`Scale factor ${v}`)});
 if(k==='map'&&st.mp.n<S.MAP.places.length){if(!st.mp.measured){b('Ruler + 0.5 cm',()=>mapLen(st.mp.len+.5),'Stretch the ruler 0.5 cm');b('Ruler \u2212 0.5 cm',()=>mapLen(st.mp.len-.5),'Shrink the ruler 0.5 cm')}
  else S.MAP_OPTS[st.mp.n].forEach(([v],j)=>b(v,()=>mapPick(j),`Real distance ${v}`))}}
const steps=[
{h:'Plan to real',p:S.TXT[0],predict:{q:'1 cm stands for 2 m. A wall is 4 cm on the plan. How long is the real wall?',opts:['6 m: add 2','8 m: times 2'],ans:1},task:'Find 3 real lengths on the plan',
 show:()=>demo(0,S.READ.map((R,i)=>[650,()=>pickRead(readOrd(i).indexOf(0))])),go:()=>open(0,()=>st.rd.n>=S.READ.length)},
{h:'Real to plan',p:S.TXT[1],task:'Draw 3 lengths to scale',
 show:()=>demo(1,S.FENCE.flatMap(F=>[[400,()=>{st.dw.len=F.m/2;A.redraw()}],[400,check2]])),go:()=>open(1,()=>st.dw.n>=S.FENCE.length)},
{h:'Enlarge it',p:S.TXT[2],predict:{q:'Enlarge a 2 by 1 rectangle by scale factor 3. What size is it?',opts:['5 by 4: add 3 to each side','6 by 3: times 3 each side'],ans:1},task:'Enlarge 2 rectangles',
 show:()=>demo(2,S.ENL.flatMap(E=>[[450,()=>{st.gr.w=E.w*E.k;st.gr.h=E.h*E.k;A.redraw()}],[450,check3]])),go:()=>open(2,()=>st.gr.n>=S.ENL.length)},
{h:'Find the factor',p:S.TXT[3],predict:{q:'A is 4 long and B is 12 long. What is the scale factor?',opts:['8, because 12 \u2212 4 = 8','3, because 4 \u00D7 3 = 12'],ans:1},task:'Find 3 scale factors',
 show:()=>demo(3,S.PAIR.map((P,i)=>[650,()=>pickFac(facOrd(i).indexOf(0))])),go:()=>open(3,()=>st.fc.n>=S.PAIR.length)},
{h:'Map scale',p:S.TXT[4],task:'Measure 2 places and find the real distance',
 show:()=>demo(4,S.MAP.places.flatMap((P,i)=>[[450,()=>mapLen(P.cm)],[600,()=>mapPick(0)]])),go:()=>open(4,()=>st.mp.n>=S.MAP.places.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.test()});
function slip(tag){let m='Scale by multiplying or dividing, never by adding, and check the units.';
 switch(tag){case 'add':m='That adds the scale. A scale multiplies: every 1 cm is the same real length, so multiply.';break;
  case 'flip':m='That goes the wrong way. Real to plan (or model) makes it smaller, so divide; plan to real makes it bigger, so multiply.';break;
  case 'diff':m='That is the difference. A scale factor is how many TIMES as long: new length \u00F7 old length.';break;
  case 'units':m='Check the units. 1 cm on a 1 : 50 000 map is 50 000 cm = 500 m, and 1,000 m = 1 km.';break;
  case 'shape':m='Only one side was scaled. Multiply every side by the scale factor, or the shape changes.';break}
 return m}
function next(){n++;const Q=S.QS[n%S.QS.length],all=[[Q.a,'ok'],...Q.o],sh=(n*2)%3,ord=all.slice(sh).concat(all.slice(0,sh));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},cq.querySelector('.fl-pick'),v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:X=>{cq.hidden=X.step!==5;ctl.hidden=X.step===5;dockFill()},
 init:X=>{A=X;T=S.TOOLS(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Scale drawing lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});dockFill()}}).start()})})();
