/* Flagship: hundredths (ages 8-9; NC Year 4 "count up and down in hundredths; recognise that hundredths arise when
   dividing an object by one hundred and dividing tenths by ten" and "recognise and write decimal equivalents of any number
   of tenths or hundredths"). A tenth of a hundred square is cut into 10, hundredths are counted on a line past 10/100,
   37 hundredths are shaded, a ribbon is stretched to 0.25 m on a metre stick and 0.4 is compared with 0.35.
   Every tap or drag has a button twin. */
(()=>{
VIS.reg('flaghundth',c=>{let A,ctl,chal,qi=-1,run=0,drag=null;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['cut','line','shade','metre','cmp','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
const dec=n=>(n/100).toFixed(2).replace(/^(\d+)\.(\d)0$/,(m,a,b)=>n%100?`${a}.${b}`:a);
/* hundred squares: Q = {x, y, s, n, col}; hundredth k (1..100) sits in column floor((k-1)/10), row (k-1)%10, so a column is a tenth */
function sq(Q,k){const u=Q.s/10,i=k-1;return[Q.x+Math.floor(i/10)*u,Q.y+(i%10)*u,u]}
function square(Q,cut){const g=A.ctx,C=A.col;g.fillStyle=A.alpha(C.tx,.04);g.fillRect(Q.x,Q.y,Q.s,Q.s);g.fillStyle=Q.col;
 for(let k=1;k<=Q.n;k++){const[x,y,u]=sq(Q,k);g.fillRect(x,y,u+.5,u+.5)}if(Q.one){const[x,y,u]=sq(Q,Q.one);g.fillStyle=C.or;g.fillRect(x,y,u,u)}
 g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1;const u=Q.s/10;for(let i=1;i<10;i++){g.beginPath();g.moveTo(Q.x+i*u,Q.y);g.lineTo(Q.x+i*u,Q.y+Q.s);g.stroke()}
 if(cut!==false)for(let j=1;j<10;j++){const x0=cut===true?Q.x:Q.x+cut*u,x1=cut===true?Q.x+Q.s:x0+u;g.beginPath();g.moveTo(x0,Q.y+j*u);g.lineTo(x1,Q.y+j*u);g.stroke()}
 g.strokeStyle=C.tx;g.lineWidth=2.5;g.strokeRect(Q.x,Q.y,Q.s,Q.s)}
function hitSq(Q,p){if(p.x<Q.x||p.x>Q.x+Q.s||p.y<Q.y||p.y>Q.y+Q.s)return 0;const u=Q.s/10;return Math.min(9,Math.floor((p.x-Q.x)/u))*10+Math.min(9,Math.floor((p.y-Q.y)/u))+1}
function setN(Q,n){n=Math.max(0,Math.min(100,n));if(n===Q.n)return;Q.n=n;A.sound.tick();say(S.say());A.redraw();S.check()}
/* number line 0 to 15 hundredths */
const LX=v=>A.W*.07+v/15*A.W*.86;
function stepL(d){const v=S.v+d;if(v<0||v>15){A.sound.miss();say('The line stops here.');return}if(d>0)S.trail.push(v);else S.trail.pop();S.v=v;A.sound.tick();say(S.say());A.redraw();S.check()}
/* metre stick */
const MX=cm=>A.W*.06+cm/100*A.W*.88;
function setCm(v){v=Math.max(0,Math.min(100,Math.round(v)));if(v===S.cm)return;S.cm=v;A.sound.tick();say(S.say());A.redraw();S.check()}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.25);g.fillRect(0,0,W,H);const k=kind(),fs=A.narrow?15:19;if(k!=='chal'&&k!=='line'&&k!=='metre'&&!(S.Q&&S.Q.length))return;
 if(k==='chal'){T('1 tenth = 10 hundredths = 0.1',W/2,H*.3,fs);T('1 hundredth = 1/100 = 0.01',W/2,H*.45,fs);T('0.4 = 40 hundredths, more than 0.35',W/2,H*.6,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='cut'||k==='shade'){const Q=S.Q[0];square(Q,k==='cut'?(S.cut?0:false):true);
  if(k==='cut'){const u=Q.s/10;g.strokeStyle=C.or;g.lineWidth=3;g.strokeRect(Q.x,Q.y,u,Q.s);T(S.cut?'1 tenth cut into 10 hundredths':'1 whole cut into 10 tenths',W/2,Q.y-14,13,{c:C.mu})}
  else{const n=Q.n,t=Math.floor(n/10);T(`${n} hundredth${n===1?'':'s'} = ${t} tenth${t===1?'':'s'} and ${n%10} hundredth${n%10===1?'':'s'} = ${dec(n)}`,W/2,Q.y-14,A.narrow?12:15,{w:800})}
  A.fx.draw(g);return}
 if(k==='cmp'){S.Q.forEach((Q,i)=>{square(Q,true);T(`${['A','B'][i]}: shade ${['0.4','0.35'][i]}`,Q.x+Q.s/2,Q.y-30,A.narrow?13:16,{w:800});T(`${Q.n} hundredths = ${dec(Q.n)}`,Q.x+Q.s/2,Q.y-12,A.narrow?11:13,{c:C.mu})});A.fx.draw(g);return}
 if(k==='line'){const y=H*.6;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(LX(0),y);g.lineTo(LX(15),y);g.stroke();
  for(let v=0;v<=15;v++){const big=v%5===0;g.lineWidth=big?2.5:1.5;g.beginPath();g.moveTo(LX(v),y-(big?10:6));g.lineTo(LX(v),y+(big?10:6));g.stroke();if(big)T(v?dec(v):'0',LX(v),y+24,A.narrow?11:13,{c:C.mu})}
  if(S.trail.length>1){g.strokeStyle=A.alpha(C.ac,.8);g.lineWidth=2.5;S.trail.forEach((v,i)=>{if(!i)return;const a=LX(S.trail[i-1]),b=LX(v);g.beginPath();g.ellipse((a+b)/2,y-4,Math.abs(b-a)/2,12,0,Math.PI,2*Math.PI);g.stroke()})}
  const x=LX(S.v);g.fillStyle=S.v===10?C.gr:C.ac;g.beginPath();g.arc(x,y-14,10,0,7);g.fill();
  T(`${S.v}/100 = ${dec(S.v)}`,W/2,H*.2,A.narrow?20:26,{w:900,c:S.v===10?C.gr:C.tx});if(S.v===10)T('the same as 1/10',W/2,H*.32,14,{c:C.gr});
  T('Tap ahead of the dot, or use the buttons',8,14,12,{al:'left',c:C.mu});A.fx.draw(g);return}
 if(k==='metre'){const y=H*.55,h=34;g.fillStyle=A.mix(C.pn,'#fde68a',C.dark?.25:.7);g.fillRect(MX(0),y,MX(100)-MX(0),h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(MX(0),y,MX(100)-MX(0),h);
  for(let v=0;v<=100;v++){const big=v%10===0,mid=v%5===0;if(!big&&!mid&&A.narrow)continue;g.lineWidth=big?2:1;g.beginPath();g.moveTo(MX(v),y);g.lineTo(MX(v),y+(big?h*.6:mid?h*.4:h*.25));g.stroke();if(big)T(String(v),MX(v),y+h+12,A.narrow?10:12,{c:C.mu})}
  T('cm',MX(100)+2,y+h+26,11,{al:'right',c:C.mu});g.fillStyle=C.rd;g.fillRect(MX(0),y-16,MX(S.cm)-MX(0),12);g.beginPath();g.arc(MX(S.cm),y-10,11,0,7);g.fill();
  T(`${S.cm} cm = ${S.cm}/100 m = ${dec(S.cm)} m`,W/2,H*.22,A.narrow?17:22,{w:900});T('Drag the red ribbon end, or use the buttons',8,14,12,{al:'left',c:C.mu});A.fx.draw(g)}}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{check:()=>{},say:()=>''},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*240))}
const one=()=>{const s=Math.min(A.W*.8,A.H*.78);return{x:(A.W-s)/2,y:A.H*.14,s,n:0,col:A.col.gr}};
const two=()=>{const s=Math.min(A.W*.42,A.H*.66),g=(A.W-2*s)/3;return[{x:g,y:A.H*.2,s,n:0,col:A.col.ac},{x:2*g+s,y:A.H*.2,s,n:0,col:A.col.vi}]};
function cutIt(){if(S.cut)return;S.cut=1;A.sound.tick();say('The first tenth is now cut into 10 equal parts. Tap one small part.');A.redraw();controls()}
function pick(k){const Q=S.Q[0];if(!S.cut){if(k<=10){A.sound.tick();say('That whole column is one tenth. Cut it into 10 to see hundredths.')}else{A.sound.miss();say('Only the orange tenth is ready to cut.')}return}
 if(k>10){A.sound.miss();say('That part is still a whole tenth. Tap a small part of the cut tenth.');return}Q.one=k;A.sound.tick();say('One small part is 1/100 of the whole square: one hundredth, 0.01.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};if(k==='chal')return;
 if(k==='cut'){if(!S.cut)btn('Cut the tenth into 10',cutIt,'Cut the orange tenth into 10 equal parts');else btn('Shade one hundredth',()=>pick(1),'Shade one small part');return}
 if(k==='line'){btn('+ 1/100',()=>stepL(1),'Count on one hundredth');btn('− 1/100',()=>stepL(-1),'Count back one hundredth');return}
 if(k==='shade'){const Q=S.Q[0];btn('+1 tenth',()=>setN(Q,Q.n+10),'Shade one more tenth, ten hundredths');btn('+1 hundredth',()=>setN(Q,Q.n+1),'Shade one more hundredth');btn('−1 hundredth',()=>setN(Q,Q.n-1),'Unshade one hundredth');btn('Clear',()=>setN(Q,0),'Clear the square');return}
 if(k==='metre'){btn('+10 cm',()=>setCm(S.cm+10));btn('+1 cm',()=>setCm(S.cm+1));btn('−1 cm',()=>setCm(S.cm-1));btn('−10 cm',()=>setCm(S.cm-10));return}
 if(k==='cmp')S.Q.forEach((Q,i)=>{const n='AB'[i];btn(`${n} +1 tenth`,()=>setN(Q,Q.n+10),`Square ${n}: shade one more tenth`);btn(`${n} +1 hundredth`,()=>setN(Q,Q.n+1),`Square ${n}: shade one more hundredth`);btn(`${n} −1`,()=>setN(Q,Q.n-1),`Square ${n}: unshade one hundredth`)})}
function down(p){const k=kind();if(k==='chal')return false;if((k==='cut'||k==='shade'||k==='cmp')&&!(S.Q&&S.Q.length))return false;
 if(k==='cut'){const h=hitSq(S.Q[0],p);if(!h)return false;pick(h);return true}
 if(k==='shade'||k==='cmp'){const Q=S.Q.find(Q=>hitSq(Q,p));if(!Q)return false;const h=hitSq(Q,p);setN(Q,h===Q.n?h-1:h);return true}
 if(k==='line'){if(Math.abs(p.y-A.H*.6)>50)return false;const x=LX(S.v);if(Math.abs(p.x-x)<10)return true;stepL(p.x>x?1:-1);return true}
 if(k==='metre'){if(p.y<A.H*.55-50||p.y>A.H*.55+60)return false;drag=1;setCm((p.x-MX(0))/(MX(100)-MX(0))*100);return true}return false}
const move=p=>{if(drag&&kind()==='metre')setCm((p.x-MX(0))/(MX(100)-MX(0))*100)},up=()=>{drag=null};
const steps=[
{h:'Cut a tenth into 10',p:'The big square is 1 whole cut into 10 columns, so each column is one tenth. Now cut one tenth into 10 equal parts.',
 predict:{q:'Cut one tenth into 10 equal parts. What is each part?',opts:['1/100 of the whole','1/20 of the whole','1/10 of the whole'],ans:0},
 task:'Cut the orange tenth, then tap one small part',show:()=>auto(0,[cutIt,()=>pick(4)]),
 go:()=>{reset({Q:[one()],cut:0});say('A square cut into 10 tenths. The first tenth is outlined in orange.');controls();S.check=finish(0,()=>S.Q[0].one>0,'10 tenths × 10 = 100 parts, so each part is 1/100.')}},
{h:'Count in hundredths',p:'Count on one hundredth at a time: 0.03, 0.04, 0.05. Watch what happens after 9 hundredths.',
 predict:{q:'7/100, 8/100, 9/100 … what comes next?',opts:['10/100, the same as 1/10','9/101','1/100 again'],ans:0},
 task:'Count on from 3/100 to 12/100',show:()=>auto(1,Array(9).fill(()=>stepL(1))),
 go:()=>{reset({v:3,trail:[3],say:()=>S.v===10?'10/100 = 1/10 = 0.1. Ten hundredths make one tenth.':S.v===12?'12/100 = 0.12: 1 tenth and 2 hundredths.':`${S.v}/100 = ${dec(S.v)}.`});
  say('A line from 0 to 0.15 in hundredths. The dot is at 3/100.');controls();S.check=finish(1,()=>S.v===12,'Ten hundredths make one tenth, so 0.09 + 0.01 = 0.1.')}},
{h:'Shade 37 hundredths',p:'One column is a tenth: 10 hundredths. So 37 hundredths is 3 whole columns and 7 more squares, written 0.37.',
 predict:{q:'How many hundredths are there in 3 tenths?',opts:['30','3','300'],ans:0},
 task:'Shade exactly 37 hundredths',show:()=>auto(2,[...Array(3).fill(()=>setN(S.Q[0],S.Q[0].n+10)),...Array(7).fill(()=>setN(S.Q[0],S.Q[0].n+1))]),
 go:()=>{reset({Q:[one()],say:()=>{const n=S.Q[0].n;return n===37?'37 hundredths = 3 tenths and 7 hundredths = 0.37.':`${n} hundredths = ${dec(n)}.`}});say('An empty hundred square. Tap a square to shade up to it.');controls();S.check=finish(2,()=>S.Q[0].n===37,'0.37: the 3 counts tenths, the 7 counts hundredths.')}},
{h:'Hundredths of a metre',p:'A metre is 100 centimetres, so 1 cm is one hundredth of a metre: 0.01 m. 25 cm is 25 hundredths of a metre.',
 predict:{q:'0.25 m is how many centimetres?',opts:['25 cm','2.5 cm','250 cm'],ans:0},
 task:'Stretch the ribbon to 0.25 m',show:()=>auto(3,[()=>setCm(10),()=>setCm(20),()=>setCm(21),()=>setCm(22),()=>setCm(23),()=>setCm(24),()=>setCm(25)]),
 go:()=>{reset({cm:0,say:()=>S.cm===25?'25 cm = 25/100 m = 0.25 m.':`${S.cm} cm = ${dec(S.cm)} m.`});say('A metre stick marked in centimetres. The ribbon is at 0.');controls();S.check=finish(3,()=>S.cm===25,'25 hundredths of a metre: 0.25 m = 25 cm.')}},
{h:'Is 0.35 bigger than 0.4?',p:'Write both in hundredths before you compare. 0.4 is 4 tenths, which is 40 hundredths. More digits does not mean bigger.',
 predict:{q:'Which is bigger, 0.4 or 0.35?',opts:['0.4','0.35','They are equal'],ans:0},
 task:'Shade 0.4 on square A and 0.35 on square B',show:()=>{auto(4,[]);const[a,b]=S.Q,r=run,go=[...Array(4).fill(()=>setN(a,a.n+10)),...Array(3).fill(()=>setN(b,b.n+10)),...Array(5).fill(()=>setN(b,b.n+1))];go.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?30*(j+1):(j+1)*240))},
 go:()=>{reset({Q:two(),say:()=>{const[a,b]=S.Q;return a.n===40&&b.n===35?'A shows 40 hundredths, B shows 35 hundredths. 0.4 is bigger.':`A: ${dec(a.n)}. B: ${dec(b.n)}.`}});say('Two empty hundred squares, A and B.');controls();S.check=finish(4,()=>S.Q[0].n===40&&S.Q[1].n===35,'40 hundredths > 35 hundredths, so 0.4 > 0.35.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Write 7 hundredths as a decimal.',[['0.07','ok'],['0.7','tenth'],['7.0','whole']]],
 ['Which is bigger: 0.6 or 0.58?',[['0.6','ok'],['0.58','long'],['They are equal','long']]],
 ['How many hundredths are in 3/10?',[['30/100','ok'],['3/100','tenth'],['300/100','whole']]],
 ['What comes next? 0.07, 0.08, 0.09, …',[['0.1','ok'],['0.010','ten'],['1.0','whole']]],
 ['45 cm is what part of a metre?',[['0.45 m','ok'],['4.5 m','tenth'],['45 m','whole']]],
 ['Which is the same as 0.5?',[['50/100','ok'],['5/100','tenth'],['1/5','frac']]],
 ['4 ÷ 100 = ?',[['0.04','ok'],['0.4','tenth'],['400','times']]]];
function why(t){let m='Change both numbers to hundredths, then compare or count.';
 if(t==='tenth')m='That is tenths, not hundredths. Hundredths sit in the second place after the point: 7 hundredths = 0.07.';
 if(t==='whole')m='That is too big: hundredths are tiny parts of 1. The whole number part stays 0.';
 if(t==='long')m='More digits does not mean bigger. 0.6 = 60 hundredths, and 60 > 58.';
 if(t==='ten')m='0.010 is only 1 hundredth. After 9 hundredths come 10 hundredths, which is 1 tenth: 0.1.';
 if(t==='frac')m='1/5 is 20 hundredths, not 50. 0.5 is 5 tenths = 50 hundredths.';
 if(t==='times')m='Dividing by 100 makes a number smaller. Each digit moves two places right: 4 ÷ 100 = 0.04.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Hundredths controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset({Q:[]});
  A.gest({down:p=>down(p),move,up});controls()}});
A.start()})})();
