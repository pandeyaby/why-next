/* Flagship – mixed numbers and improper fractions (ages 9–10, England NC Year 5 Fractions: "recognise mixed numbers and
   improper fractions and convert from one form to the other; write mathematical statements > 1 as a mixed number";
   US CCSS 4.NF.B.3). Pour quarter pieces into whole bars and watch 7/4 spill into a second bar, bundle 11 quarters into
   wholes, cut 3 wholes of 3 2/5 into fifths and count 17 fifths, build targets piece by piece, then drop 9/4 on a number
   line. Targets the documented slips: thinking a fraction can never be more than 1, reading 11/4 as "1 and 1/4" from its
   digits, turning 3 2/5 into 5/5 or 6/5 by adding or multiplying the wrong parts, and placing improper fractions below 1. */
(()=>{const FONT='Nunito,ui-rounded,system-ui,sans-serif',UNIT={2:'half',3:'third',4:'quarter',5:'fifth',6:'sixth',8:'eighth'};
const nm=(d,k)=>k===1?UNIT[d]:(d===2?'halves':UNIT[d]+'s');
const mixedOf=(n,d)=>({w:Math.floor(n/d),r:n%d});
const words=(n,d)=>{const{w,r}=mixedOf(n,d);return w&&r?`${w} and ${r}/${d}`:w?`${w}`:`${r}/${d}`};
VIS.reg('flagimpf',c=>{let L,ctl,box,qi=-1,streak=0;const S={};
const kind=()=>['pour','bundle','cut','make','line','quiz'][L.step];
const tell=s=>{c.say(s);if(L)L.cv.setAttribute('aria-label',s)};
const sz=n=>Math.round(n*(L.narrow?1:1.15)),re=()=>L.redraw();
function txt(g,s,x,y,n,col,w,al){g.font=`${w||800} ${sz(n)}px ${FONT}`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||L.col.tx;g.fillText(s,x,y,L.W-16)}
/* a stacked fraction (with an optional whole number in front) drawn at x,y */
function frac(g,w,a,b,x,y,n,col){const K=L.col,f=sz(n),sx=w?f*.45:0;g.fillStyle=col||K.tx;
 if(w)txt(g,String(w),x-sx,y,n*1.25,col);txt(g,String(a),x+sx,y-f*.62,n,col);txt(g,String(b),x+sx,y+f*.62,n,col);
 g.fillRect(x+sx-f*.45,y-1.5,f*.9,3)}
/* the bar layout: up to 3 whole bars side by side (2 rows on a phone) */
function slots(count){const nar=L.narrow,cols=nar?2:Math.min(3,count),rows=Math.ceil(count/cols),gw=L.W-32,bw=(gw-(cols-1)*14)/cols,bh=nar?40:46,y0=L.H*.3;
 return[...Array(count)].map((_,i)=>({x:16+(i%cols)*(bw+14),y:y0+Math.floor(i/cols)*(bh+26),w:bw,h:bh}))}
function bar(g,s,d,fill,cut,hot){const K=L.col,P=L.paint;g.lineWidth=2.5;g.strokeStyle=K.tx;
 P.rrect(s.x,s.y,s.w,s.h,6);g.fillStyle=L.mix(K.pn,K.tx,.04);g.fill();
 if(cut===false&&fill>=d){g.fillStyle=K.cy;P.rrect(s.x,s.y,s.w,s.h,6);g.fill()}
 else for(let k=0;k<fill;k++){g.fillStyle=k%2?L.mix(K.cy,K.pn,.18):K.cy;g.fillRect(s.x+k*s.w/d+1,s.y+1,s.w/d-2,s.h-2)}
 if(cut!==false)for(let k=1;k<d;k++){g.beginPath();g.moveTo(s.x+k*s.w/d,s.y);g.lineTo(s.x+k*s.w/d,s.y+s.h);g.lineWidth=1.6;g.strokeStyle=K.tx;g.stroke()}
 P.rrect(s.x,s.y,s.w,s.h,6);g.lineWidth=hot?4:2.5;g.strokeStyle=hot?K.am:K.tx;g.stroke()}
function tray(g){const K=L.col,r=S.trayR();g.fillStyle=L.mix(K.pn,K.am,.14);L.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=K.am;g.lineWidth=2;g.stroke();
 const pw=Math.min(54,(L.W-32)/S.d);g.fillStyle=K.cy;g.fillRect(r.x+12,r.y+10,pw,r.h-20);txt(g,`1/${S.d}`,r.x+12+pw/2,r.y+r.h/2,13,K.pn,900);
 txt(g,`Drag a ${UNIT[S.d]} up, or tap a bar`,r.x+pw+24,r.y+r.h/2,13,K.tx,700,'left')}
function draw(A){const{ctx:g,W,H,col:K}=A,v=kind();g.fillStyle=A.mix(K.pn,K.am,K.dark?.03:.06);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Improper: top number bigger than the bottom',W/2,H*.28,15);txt(g,'Wholes = how many full groups of the bottom number',W/2,H*.45,14,K.mu,700);txt(g,'Back to improper: wholes × bottom + top',W/2,H*.62,14,K.mu,700);return}
 if(v==='line')return drawLine(g);
 if(v==='bundle')return drawBundle(g);
 const nb=Math.max(1,v==='cut'?S.wholes+1:Math.ceil(Math.max(S.n,S.goal||0,1)/S.d)),sl=slots(Math.min(4,nb));
 sl.forEach((s,i)=>{const f=Math.max(0,Math.min(S.d,(v==='cut'&&i<S.wholes?S.d:S.n-i*S.d)));bar(g,s,S.d,f,v==='cut'&&i<S.wholes?!!S.cut[i]:true,v==='cut'&&i<S.wholes&&!S.cut[i])});
 const hd=v==='cut'?(S.cut.every(Boolean)?`${S.wholes} × ${S.d} + ${S.extra} = ${S.n} ${nm(S.d,2)}`:'Tap each whole bar to cut it into fifths'):
  v==='make'?`Make ${words(S.goal,S.d)} with ${nm(S.d,2)}`:`${S.n} ${nm(S.d,S.n)} poured in`;
 txt(g,hd,W/2,22,15);
 const n=v==='cut'?S.counted():S.n,y=H*(A.narrow?.12:.14)+18;
 if(n>0){frac(g,0,n,S.d,W/2-60,y,16,K.tx);txt(g,'=',W/2-18,y,20);const{w,r}=mixedOf(n,S.d);if(w&&!r)txt(g,String(w),W/2+30,y,22,K.gr);else frac(g,w,r,S.d,W/2+30,y,16,K.gr)}
 if(v==='pour'||v==='make')tray(g);
 if(S.ghost){g.globalAlpha=.75;g.fillStyle=K.cy;const pw=Math.min(54,(W-32)/S.d);g.fillRect(S.ghost.x-pw/2,S.ghost.y-18,pw,36);g.globalAlpha=1}
 A.fx.draw(g)}
function drawBundle(g){const K=L.col,W=L.W,H=L.H,pile=S.loose,pw=L.narrow?30:38,gap=6,per=Math.max(4,Math.floor((W-32)/(pw+gap))),px=16,py=H*.66;
 txt(g,S.made?`${S.made} whole${S.made>1?'s':''} made, ${pile} ${nm(4,pile)} left`:'11 quarters in a pile. Tap the pile to make a whole',W/2,22,15);
 const sl=slots(Math.max(1,Math.min(3,S.made+(pile>=4?1:0))));sl.forEach((s,i)=>bar(g,s,4,i<S.made?4:0,true,i===S.made&&pile>=4));
 for(let k=0;k<pile;k++){const x=px+(k%per)*(pw+gap),y=py+Math.floor(k/per)*(pw+gap);g.fillStyle=K.cy;L.paint.rrect(x,y,pw,pw*.8,4);g.fill();txt(g,'1/4',x+pw/2,y+pw*.4,11,K.pn,900)}
 S.pileR={x:px-6,y:py-6,w:W-20,h:H-py};A_fx(g)}
const A_fx=g=>L.fx.draw(g);
function lx(v){return 24+(L.W-48)*v/3}
function drawLine(g){const K=L.col,W=L.W,y=L.H*.58;g.lineWidth=3;g.strokeStyle=K.tx;g.beginPath();g.moveTo(lx(0),y);g.lineTo(lx(3),y);g.stroke();
 for(let q=0;q<=12;q++){const x=lx(q/4),big=q%4===0;g.beginPath();g.moveTo(x,y-(big?14:8));g.lineTo(x,y+(big?14:8));g.lineWidth=big?3:1.5;g.stroke();if(big)txt(g,String(q/4),x,y+32,16);else if(!L.narrow)txt(g,`${q}/4`,x,y-24,11,K.mu,700)}
 const t=S.targets[S.ti]||S.targets[S.targets.length-1],mx=lx(S.pos/4);
 txt(g,S.ti<S.targets.length?`Drop the marker on ${t.say}`:'Both placed!',W/2,22,15);
 g.fillStyle=K.rd;g.beginPath();g.moveTo(mx,y-6);g.lineTo(mx-14,y-36);g.lineTo(mx+14,y-36);g.closePath();g.fill();
 txt(g,`${S.pos}/4 = ${words(S.pos,4)}`+(S.pos%4===2?` = ${S.pos>4?((S.pos-2)/4)+' ':''}1/2`:''),Math.max(70,Math.min(W-70,mx)),y-52,14,K.rd,800);
 S.done.forEach(q=>{const x=lx(q/4);g.fillStyle=K.gr;g.beginPath();g.arc(x,y,7,0,7);g.fill()});L.fx.draw(g)}
const miss=s=>{L.sound.miss();tell(s);re()},hit=s=>{L.sound.pop();tell(s);buttons();re();S.check()};
const burst=(x,y)=>{L.fx.add(12,i=>({x,y,vx:Math.cos(i)*130,vy:Math.sin(i)*130,life:.6,r:3,col:L.col.gr}));L.kick()};
/* step 0 and 3: adding and removing pieces */
function add(k){const v=kind();if(v!=='pour'&&v!=='make')return;if(v==='pour'&&S.n>=S.goal)return;const top=v==='make'?S.d*3:S.goal;S.n=Math.max(0,Math.min(top,S.n+k));L.sound.tick();
 if(v==='pour'){if(S.n>=S.goal)return hit(`7 quarters: 4 of them fill 1 whole bar and 3 spill into the next. 7/4 = 1 and 3/4.`);
  tell(S.n===S.d?`4 quarters fill the bar exactly: 4/4 = 1 whole.`:S.n>S.d?`${S.n}/4 is more than 1 whole. The extra ${nm(4,S.n-4)} start a new bar.`:`${S.n}/4 so far.`);return re()}
 tell(`${S.n} ${nm(S.d,S.n)}, that is ${words(S.n,S.d)}.`);re()}
function checkMake(){if(kind()!=='make')return;const g=S.goal,d=S.d,{w,r}=mixedOf(g,d),n=S.n;
 if(n!==g){if(n===w+r)return miss(`That is ${n} ${nm(d,n)}. Each whole needs ${d} ${nm(d,2)}, so ${w} wholes is ${w*d}, plus ${r} more makes ${g}.`);
  if(n===w*r)return miss(`Multiplying ${w} by ${r} gives ${n}, but each whole bar holds ${d} pieces. Fill ${w} bars, then add ${r}.`);
  return miss(n<g?`${words(n,d)} is not enough. You need ${words(g,d)}: add ${g-n} more.`:`${words(n,d)} is too much. Take away ${n-g}.`)}
 S.made++;burst(L.W/2,L.H*.4);if(S.made<S.goals.length){L.sound.pop();S.goal=S.goals[S.made][0];S.d=S.goals[S.made][1];S.n=0;tell(`Yes! Now make ${words(S.goal,S.d)} with ${nm(S.d,2)}.`);buttons();return re()}
 hit(`Yes. ${words(g,d)} = ${g}/${d}: ${w} × ${d} + ${r} = ${g}.`)}
/* step 1: bundling loose quarters into wholes */
function bundle(){if(kind()!=='bundle')return;if(S.loose<4){if(S.made>=2)return;return miss(`Only ${S.loose} quarters left: not enough for a whole. They stay as ${S.loose}/4.`)}
 S.loose-=4;S.made++;burst(L.W/2,L.H*.35);L.sound.tick();
 if(S.loose<4)return hit(`2 wholes and 3 quarters left over. 11/4 = 2 and 3/4, because 11 ÷ 4 = 2 remainder 3.`);
 tell(`1 whole made from 4 quarters. ${S.loose} quarters left.`);buttons();re()}
/* step 2: cutting whole bars into fifths */
function cut(i){if(kind()!=='cut'||S.cut[i])return;S.cut[i]=true;L.sound.tick();
 if(S.cut.every(Boolean))return hit(`All 3 wholes cut: 15 fifths, plus the 2 fifths = 17 fifths. 3 and 2/5 = 17/5.`);
 tell(`That whole is 5 fifths. Fifths counted so far: ${S.counted()}.`);buttons();re()}
/* step 4: the number line */
function place(q){if(kind()!=='line')return;S.pos=Math.max(0,Math.min(12,q));L.sound.tick();tell(`Marker on ${S.pos}/4, which is ${words(S.pos,4)}.`);re()}
function drop(){if(kind()!=='line'||S.ti>=S.targets.length)return;const t=S.targets[S.ti];
 if(S.pos!==t.q){if(S.pos<4&&t.q>4)return miss(`${t.say} is more than 1, because the top number is bigger than the bottom. Look past 1.`);
  return miss(`That is ${words(S.pos,4)}. ${t.say} is ${t.hint}.`)}
 S.done.push(t.q);S.ti++;burst(lx(t.q/4),L.H*.58);
 if(S.ti<S.targets.length){L.sound.pop();tell(`Yes! Now drop the marker on ${S.targets[S.ti].say}.`);buttons();return re()}
 hit(`9/4 and 2 and 1/2 sit between 2 and 3. Improper fractions are just numbers bigger than 1.`)}
function buttons(){if(!ctl)return;ctl.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='pour'&&S.n<S.goal)B(`Add 1 ${UNIT[4]}`,()=>add(1),'Add one quarter piece');
 if(v==='make'){B(`Add 1 ${UNIT[S.d]}`,()=>add(1));B(`Take 1 away`,()=>add(-1));B('Check',checkMake,`Check: is it ${words(S.goal,S.d)}?`)}
 if(v==='bundle'&&S.made<2)B('Make a whole from 4 quarters',bundle);
 if(v==='cut')S.cut.forEach((x,i)=>{if(!x)B(`Cut whole ${i+1} into fifths`,()=>cut(i))});
 if(v==='line'&&S.ti<S.targets.length){B('Marker back 1/4',()=>place(S.pos-1));B('Marker on 1/4',()=>place(S.pos+1));B('Drop here',drop,'Check where the marker is')}}
let held=null;
function down(p){const v=kind();
 if(v==='pour'||v==='make'){const r=S.trayR();if(p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h){held={k:'piece'};S.ghost=p;re();return true}
  if(p.y<r.y&&p.y>L.H*.25){add(1);return true}return false}
 if(v==='bundle'){if(S.pileR&&p.y>=S.pileR.y-10){bundle();return true}return false}
 if(v==='cut'){const sl=slots(S.wholes+1);const i=sl.findIndex(s=>p.x>=s.x&&p.x<=s.x+s.w&&p.y>=s.y-8&&p.y<=s.y+s.h+8);if(i>=0&&i<S.wholes){cut(i);return true}return false}
 if(v==='line'){held={k:'mark'};place(Math.round((p.x-24)/(L.W-48)*12));return true}return false}
function move(p){if(!held)return;if(held.k==='piece'){S.ghost=p;re()}else place(Math.round((p.x-24)/(L.W-48)*12))}
function up(p){if(!held)return;const k=held.k;held=null;if(k==='piece'){S.ghost=null;if(p&&p.y<S.trayR().y-10)add(1);else re()}else drop()}
const fin=(n,test,msg)=>()=>{if(L.step===n&&test()&&(!steps[n].predict||L.pred[n]!=null))L.done(msg+L.reveal(n))};
const seq=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},L.reduced()?j*30+30:(j+1)*ms))};
const reset=o=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,check:()=>{},n:0,d:4,goal:0,ghost:null,
 trayR:()=>({x:16,y:L.H-(L.narrow?62:66),w:L.W-32,h:L.narrow?52:56})},o);held=null};
const steps=[
{h:'More than one whole',p:'Each bar is 1 whole cut into 4 quarters. Pour in quarters one at a time and watch what happens after the bar is full.',
 predict:{q:'You pour in 7 quarters. What do you get?',opts:['1 whole and 3 quarters','7 whole bars','Less than 1 whole'],ans:0},task:'Pour in 7 quarters',
 show:()=>{steps[0].go();seq([...Array(7)].map(()=>()=>add(1)),450)},
 go:()=>{reset({n:0,d:4,goal:7});tell('An empty bar. Drag a quarter up from the tray, or tap the bar.');buttons();S.check=fin(0,()=>S.n>=7,'7/4 is an improper fraction: more than 1 whole.')}},
{h:'Improper to mixed',p:'11/4 means 11 quarters. Group them in fours, because 4 quarters make 1 whole. Whatever is left over is the fraction part.',
 predict:{q:'What is 11/4 as a mixed number?',opts:['2 and 3/4','1 and 1/4','11 and 4'],ans:0},task:'Make wholes until you cannot',
 show:()=>{steps[1].go();seq([bundle,bundle],700)},
 go:()=>{reset({loose:11,made:0});tell('11 quarters in a pile. Tap the pile to bundle 4 of them into a whole.');buttons();S.check=fin(1,()=>S.made>=2,'Wholes = how many fours fit in 11. The 3 left over are 3/4.')}},
{h:'Mixed to improper',p:'3 and 2/5 means 3 whole bars and 2 fifths. To write it as fifths only, cut every whole bar into fifths and count every piece.',
 predict:{q:'How many fifths are in 3 and 2/5?',opts:['17 fifths','5 fifths','6 fifths'],ans:0},task:'Cut all 3 wholes into fifths',
 show:()=>{steps[2].go();seq([0,1,2].map(i=>()=>cut(i)),650)},
 go:()=>{reset({d:5,wholes:3,extra:2,cut:[false,false,false]});S.counted=()=>S.cut.filter(Boolean).length*5+S.extra;S.n=17;tell('3 whole bars and 2 fifths. Tap a whole bar to cut it into 5 fifths.');buttons();S.check=fin(2,()=>S.cut.every(Boolean),'Wholes × bottom number + top number: 3 × 5 + 2 = 17.')}},
{h:'Build it',p:'Now you build. Add one piece at a time until the bars show the mixed number, then press Check.',task:'Build 2 and 1/3, then 1 and 5/6',
 show:()=>{steps[3].go();seq([...Array(7)].map(()=>()=>add(1)).concat([checkMake],[...Array(11)].map(()=>()=>add(1)),[checkMake]),260)},
 go:()=>{reset({n:0,d:3,goal:7,made:0,goals:[[7,3],[11,6]]});tell('Make 2 and 1/3 with thirds.');buttons();S.check=fin(3,()=>S.made>=2,'You built both: 7/3 and 11/6.')}},
{h:'On the number line',p:'Every fraction is a number with its own place on the line. Drag the marker. Each small step is 1/4.',
 predict:{q:'Where does 9/4 go?',opts:['Between 2 and 3','Between 0 and 1','Past 9'],ans:0},task:'Drop the marker on 9/4, then on 2 and 1/2',
 show:()=>{steps[4].go();seq([()=>place(9),drop,()=>place(10),drop],700)},
 go:()=>{reset({pos:0,ti:0,done:[],targets:[{q:9,say:'9/4',hint:'2 wholes (8 quarters) and 1 more quarter'},{q:10,say:'2 and 1/2',hint:'10 quarters: 2 is 8 quarters and 1/2 is 2 more'}]});tell('Drag the red marker along the line, then let go on 9/4.');buttons();S.check=fin(4,()=>S.ti>=2,'Improper fractions and mixed numbers name the same points.')}},
{h:'Challenge',p:'',go:()=>{reset({});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Write 13/5 as a mixed number.',[['2 and 3/5','ok'],['1 and 3/5','digits'],['3 and 2/5','swap']]],
 ['Write 4 and 1/3 as an improper fraction.',[['13/3','ok'],['5/3','addall'],['4/3','dropw']]],
 ['Which of these is an improper fraction?',[['9/7','ok'],['7/9','proper'],['1 and 2/7','mixednum']]],
 ['How many quarters make 3 wholes?',[['12','ok'],['3','sameq'],['7','addall']]],
 ['Is 8/8 a mixed number, a proper fraction or a whole number?',[['A whole number: 1','ok'],['A proper fraction','eq'],['8 wholes','eight']]],
 ['Which is bigger: 7/3 or 2?',[['7/3','ok'],['2','small'],['They are equal','eq']]]];
function why(t){let m='Count how many full groups of the bottom number fit in the top number; that is the whole part.';
 if(t==='digits')m='Do not read the digits. 13 fifths make 2 full groups of 5 (10) with 3 left, so 2 and 3/5.';
 if(t==='swap')m='The whole part is how many groups of 5 fit in 13, which is 2. The remainder, 3, goes on top.';
 if(t==='addall')m='Each whole is worth the bottom number of pieces. Multiply wholes by the bottom number, then add the top.';
 if(t==='dropw')m='Do not drop the whole part. 4 wholes are 12 thirds, plus 1 third makes 13/3.';
 if(t==='proper')m='7/9 has a smaller top than bottom, so it is less than 1: a proper fraction.';
 if(t==='mixednum')m='1 and 2/7 is a mixed number: a whole number and a fraction together.';
 if(t==='sameq')m='Each whole is 4 quarters, so 3 wholes is 3 × 4 = 12 quarters.';
 if(t==='eq')m='When top and bottom match, the fraction is exactly 1 whole. 7/3 is 2 and 1/3, which is more than 2.';
 if(t==='eight')m='8/8 is 8 eighths, which fill exactly 1 bar, not 8.';
 if(t==='small')m='7/3 is 6 thirds (2 wholes) and 1 more third, so it is 2 and 1/3: bigger than 2.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=box.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);re()}
function mark(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;L.win()}else{streak=0;L.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+streak+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Next question</button>';fb.querySelector('button').onclick=ask}
L=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{box.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset({});
  A.gest({down,move,up});buttons()}});
L.start()})})();
