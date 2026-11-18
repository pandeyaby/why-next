/* Flagship – one more each time (ages 4–6): drag a cube onto a tower and hear the next counting number; build a number
   staircase where every step is one cube taller; hop a frog to the number that is one more on a 1–10 track; take a cube
   away to find one less; and count on from a number hidden in a cup instead of starting again at 1.
   The Challenge targets the usual slips: one more gives the same number, one more means the number before, counting
   all over again from 1, and jumping on by two. Every drag has a button twin. */
(()=>{
const TALL=8,ORDER=[4,1,6,2,5,3],HOPS=[3,6,9],DROPS=[7,4,10],CUPS=[6,3,9];
const NAMES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven'];
VIS.reg('flagstair',c=>{let A,pad,quiz,qNo=-1,row=0;c.fig.classList.add('young');const M={};
const scene=()=>['add','stairs','hop','less','cup','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.15));
function words(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
const hues=()=>[A.col.cy,A.col.or,A.col.gr,A.col.vi,A.col.pk];
/* one cube: a rounded square with a darker rim so it reads in both themes */
function block(g,x,y,s,col,lift){g.fillStyle=col;A.paint.rrect(x+2,y+2-(lift||0),s-4,s-4,s*.18);g.fill();g.lineWidth=2;g.strokeStyle=A.col.tx;A.paint.rrect(x+2,y+2-(lift||0),s-4,s-4,s*.18);g.stroke()}
function tower(g,cx,base,n,s,ring){const H=hues();for(let i=0;i<n;i++)block(g,cx-s/2,base-(i+1)*s,s,H[i%5]);if(ring){g.lineWidth=4;g.strokeStyle=ring;A.paint.rrect(cx-s/2-5,base-n*s-5,s+10,n*s+10,10);g.stroke()}}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- layout ---- */
const side=()=>Math.min(A.H*.082,A.W*.11,46);
const spare=()=>{const s=side()*1.5;return{x:A.W*.72-s/2,y:A.H*.42,w:s,h:s}};
const col6=i=>A.W/12+i*A.W/6;
const traySpot=i=>({x:col6(i)-A.W/12+3,y:A.H*.56,w:A.W/6-6,h:A.H*.42});
const cell=n=>{const per=A.narrow?5:10,w=Math.min((A.W-24)/per,A.narrow?66:74),h=Math.min(A.H*(A.narrow?.17:.2),w),r=Math.floor((n-1)/per),k=(n-1)%per,x0=(A.W-per*w)/2;return{x:x0+k*w,y:A.H*.42+r*(h+8),w:w-6,h}};
const pickR=i=>{const w=(A.W-48)/3;return{x:12+i*(w+12),y:A.H*.74,w,h:A.H*.22}};
/* ---- drawing ---- */
function paint(A){const{ctx:g,W,H,col:C}=A,v=scene();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){const s=Math.min(H*.12,46);for(let n=1;n<=5;n++)tower(g,W/2+(n-3)*s*1.4,H*.78,n,s);words(g,'Each step is one more.',W/2,H*.12,17);return}
 if(v==='add'){const s=side();tower(g,W*.32,H*.94,M.n,s,M.flash?C.gr:null);words(g,String(M.n),W*.32,H*.94-M.n*s-26,26);
  words(g,M.n>=TALL?'8 cubes. Well built!':M.said||'Drag the cube onto the tower.',W/2,H*.06,15);
  if(M.n<TALL){const r=spare(),d=M.drag&&M.drag.x!=null?M.drag:null;block(g,d?d.x-r.w/2:r.x,d?d.y-r.h/2:r.y,r.w,hues()[M.n%5]);words(g,'+1',r.x+r.w/2,r.y+r.h+20,16)}return A.fx.draw(g)}
 if(v==='stairs'){const s=Math.min(A.H*.06,A.W/8);words(g,M.placed.length>=6?'1, 2, 3, 4, 5, 6: one more each time!':`Next step: ${M.placed.length+1} cube${M.placed.length?'s':''}`,W/2,H*.05,15);
  M.placed.forEach((n,i)=>{tower(g,col6(i),H*.5,n,s);words(g,String(n),col6(i),H*.5-n*s-14,15)});
  ORDER.forEach((n,i)=>{if(M.placed.includes(n))return;const r=traySpot(i),d=M.drag&&M.drag.i===i&&M.drag.x!=null?M.drag:null,cx=d?d.x:col6(i),base=d?d.y+n*s/2:H*.97;
   g.fillStyle=A.alpha(M.bad===i?C.rd:C.mu,M.bad===i?.22:.08);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();tower(g,cx,base,n,s)});return A.fx.draw(g)}
 if(v==='hop'){const a=HOPS[Math.min(M.r,2)];words(g,M.r>=3?'The frog hopped one more each time.':`The frog is on ${a}. Tap one more.`,W/2,H*.06,15);
  for(let n=1;n<=10;n++){const r=cell(n);g.fillStyle=n===M.bad?A.alpha(C.rd,.25):A.alpha(C.cy,.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();words(g,String(n),r.x+r.w/2,r.y+r.h*.72,18)}
  const a0=Math.floor(M.at),t=M.at-a0,f=cell(a0),f2=cell(Math.min(10,a0+1)),fx=f.x+(f2.x-f.x)*t+f.w/2,fy=f.y+(f2.y-f.y)*t;g.font=`${Math.round(Math.min(34,f.h*.45))}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText('🐸',fx,fy+f.h*.3-Math.sin(t*Math.PI)*24);return A.fx.draw(g)}
 if(v==='less'){const s=Math.min(side(),A.H*.056),n=M.r>=3?DROPS[2]-1:DROPS[M.r]-(M.gone?1:0);tower(g,W*.32,H*.71,n,s);
  if(M.r>=3)words(g,'One less is the number just before.',W/2,H*.06,15);else words(g,M.gone?'How many now?':`${DROPS[M.r]} cubes. Drag the top one to the bin.`,W/2,H*.06,15);
  g.font=`${Math.round(Math.min(48,H*.12))}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle='#000';g.fillText('🗑️',W*.78,H*.4);
  if(M.drag&&M.drag.x!=null)block(g,M.drag.x-s/2,M.drag.y-s/2,s,hues()[(n)%5]);if(M.gone&&M.r<3)cards(g,M.r,DROPS,-1);return A.fx.draw(g)}
 if(v==='cup'){const k=CUPS[Math.min(M.r,2)],cx=W*.32,cy=H*.4,cw=Math.min(W*.3,130);g.fillStyle=A.alpha(C.or,.35);g.beginPath();g.moveTo(cx-cw/2,cy-cw*.45);g.lineTo(cx+cw/2,cy-cw*.45);g.lineTo(cx+cw*.38,cy+cw*.45);g.lineTo(cx-cw*.38,cy+cw*.45);g.closePath();g.fill();g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();
  words(g,M.r>=3?'10 inside':`${M.inside} inside`,cx,cy,20);
  if(!M.dropped&&M.r<3){const d=M.drag&&M.drag.x!=null?M.drag:{x:W*.75,y:H*.36};A.paint.ball(d.x,d.y,Math.min(26,H*.06),C.gr);words(g,'Drag me in',W*.75,H*.36+40,13,C.tx,700)}
  words(g,M.r>=3?'Count on from the hidden number.':M.dropped?'One more went in. How many now?':`${k} are hiding. Drop one more in.`,W/2,H*.06,15);if(M.dropped&&M.r<3)cards(g,M.r,CUPS,1);return A.fx.draw(g)}}
/* three answer cards: right answer, the number itself, and the slip for this step */
const choices=(r,list,dir)=>{const n=list[r],ok=n+dir,o=[ok,n,dir<0?n+1:1];return r%3===0?o:r%3===1?[o[1],o[2],o[0]]:[o[2],o[0],o[1]]};
function cards(g,r,list,dir){choices(r,list,dir).forEach((n,i)=>{const b=pickR(i);g.fillStyle=A.alpha(M.bad===n?A.col.rd:A.col.vi,M.bad===n?.25:.1);A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=2.5;g.strokeStyle=A.col.tx;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke();words(g,String(n),b.x+b.w/2,b.y+b.h/2,24)})}
/* ---- actions ---- */
function addOne(){if(scene()!=='add'||M.n>=TALL)return;M.n++;M.flash=1;A.sound.pop();M.said=`${NAMES[M.n-1]} and one more is ${NAMES[M.n]}.`;speak(`${M.n-1} and one more makes ${M.n}. ${M.n} comes next when we count.`);A.redraw();buttons();M.want()}
function place(i){if(scene()!=='stairs')return;const n=ORDER[i],need=M.placed.length+1;if(M.placed.includes(n)||need>6)return;
 if(n!==need){A.sound.miss();M.bad=i;speak(n>need?`That tower has ${n} cubes. That is more than one more. The next step needs ${need}.`:`That tower has ${n}. It is too short. The next step is one more than ${need-1}: ${need}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.placed.push(n);A.sound.tick();speak(need>1?`${need-1} and one more is ${need}. Each step goes up by one cube.`:'One cube. The first step.');A.redraw();buttons();M.want()}
function hop(t){if(scene()!=='hop'||M.r>=3)return;const a=HOPS[M.r];
 if(t!==a+1){A.sound.miss();M.bad=t;speak(t===a?`The frog is already on ${a}. One more is the next number.`:t===a-1?`${t} is one less. One more goes forward: ${a+1}.`:`${t} is more than one hop. Count on just one: ${a}, ${a+1}.`);setTimeout(()=>{M.bad=0;A.redraw()},A.reduced()?10:900);return A.redraw()}
 A.sound.pop();M.r++;speak(`One more than ${a} is ${a+1}.`);const go=M.r<3?HOPS[M.r]:a+1;M.at=a;A.tween(M,{at:a+1},A.reduced()?1:350,'out',()=>{M.at=go;A.redraw()});buttons();M.want()}
function binIt(){if(scene()!=='less'||M.gone||M.r>=3)return;M.gone=1;A.sound.whoosh();speak(`One cube went in the bin. How many are left?`);A.redraw();buttons()}
function sayLess(n){if(scene()!=='less'||!M.gone||M.r>=3)return;const a=DROPS[M.r];
 if(n!==a-1){A.sound.miss();M.bad=n;speak(n===a?`${a} was before. We took one away, so there are fewer now.`:`${n} is one more. Taking away makes fewer. Count back one: ${a}, ${a-1}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 A.sound.pop();speak(`One less than ${a} is ${a-1}. It is the number just before ${a}.`);M.r++;M.gone=0;A.redraw();buttons();M.want()}
function drop(){if(scene()!=='cup'||M.dropped||M.r>=3)return;M.dropped=1;A.sound.pop();speak('Plop! One more went in. How many are in the cup now?');A.redraw();buttons()}
function sayCup(n){if(scene()!=='cup'||!M.dropped||M.r>=3)return;const k=CUPS[M.r];
 if(n!==k+1){A.sound.miss();M.bad=n;speak(n===k?`There were ${k}. One more went in, so now there are more than ${k}.`:`Don't start again at 1. Keep ${k} in your head and count on one: ${k}, ${k+1}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 A.sound.pop();speak(`${k}, ${k+1}! You counted on from ${k}.`);M.r++;M.dropped=0;M.inside=CUPS[Math.min(M.r,2)];A.redraw();buttons();M.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='add'&&M.n<TALL)B('Add one cube',addOne,'Add one more cube to the tower');
 if(v==='stairs')ORDER.forEach((n,i)=>{if(!M.placed.includes(n))B(`Tower of ${n}`,()=>place(i),`Put the tower of ${n} cubes next`)});
 if(v==='hop'&&M.r<3)for(let n=1;n<=10;n++)B(String(n),()=>hop(n),`Hop to ${n}`);
 if(v==='less'&&M.r<3){if(!M.gone)B('Take one away',binIt,'Put the top cube in the bin');else choices(M.r,DROPS,-1).forEach(n=>B(String(n),()=>sayLess(n),`${n} cubes`))}
 if(v==='cup'&&M.r<3){if(!M.dropped)B('Drop one in',drop,'Drop one more ball in the cup');else choices(M.r,CUPS,1).forEach(n=>B(String(n),()=>sayCup(n),`${n} in the cup`))}}
/* ---- pointer ---- */
function down(p){const v=scene();
 if(v==='add'&&M.n<TALL&&within(p,spare())){M.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='stairs'){const i=ORDER.findIndex((n,i)=>!M.placed.includes(n)&&within(p,traySpot(i)));if(i>=0){M.drag={i,x:null,y:null,x0:p.x,y0:p.y};return true}}
 if(v==='hop'){for(let n=1;n<=10;n++)if(within(p,cell(n)))hop(n);return false}
 if(v==='less'&&M.r<3){if(M.gone){[0,1,2].forEach(i=>{if(within(p,pickR(i)))sayLess(choices(M.r,DROPS,-1)[i])});return false}if(p.x<A.W*.5&&p.y>A.H*.1){M.drag={x:null,y:null,x0:p.x,y0:p.y};return true}}
 if(v==='cup'&&M.r<3){if(M.dropped){[0,1,2].forEach(i=>{if(within(p,pickR(i)))sayCup(choices(M.r,CUPS,1)[i])});return false}if(Math.hypot(p.x-A.W*.75,p.y-A.H*.36)<50){M.drag={x:null,y:null,x0:p.x,y0:p.y};return true}}
 return false}
function move(p){const d=M.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=M.drag,v=scene();M.drag=null;if(!d)return;
 if(v==='add'){if(d.x==null||p.x<A.W*.55)addOne();else A.redraw()}
 if(v==='stairs'){if(d.x==null||p.y<A.H*.6)place(d.i);else A.redraw()}
 if(v==='less'){if(d.x!=null&&p.x>A.W*.6)binIt();else{speak('Drag the top cube all the way to the bin, or tap Take one away.');A.redraw()}}
 if(v==='cup'){if(d.x==null||Math.abs(p.x-A.W*.32)<A.W*.2)drop();else A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function runList(fns,gap){const me=++M.ver;fns.forEach((f,j)=>setTimeout(()=>{if(me===M.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function reset(){const v=(M.ver||0)+1;Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,{ver:v,want:()=>{},n:5,flash:0,said:'',placed:[],bad:-1,r:0,at:HOPS[0],gone:0,dropped:0,inside:CUPS[0],drag:null})}
const steps=[
{h:'One more cube',p:'Here are 5 cubes. Drag one more cube onto the tower. Say the new number.',predict:{q:'5 cubes. Add one more. How many now?',opts:['6','5','7'],ans:0},task:'Make the tower 8 cubes tall',
 show:()=>{steps[0].go();runList([addOne,addOne,addOne],380)},
 go:()=>{reset();speak('5 cubes. Drag the new cube onto the tower.');buttons();M.want=ready(0,()=>M.n>=TALL,'Add one, and you get the next counting number.')}},
{h:'Build a staircase',p:'Put the towers in order: 1 cube, then 2, then 3. Each step is one more.',task:'Build all 6 steps',
 show:()=>{steps[1].go();runList([1,2,3,4,5,6].map(n=>()=>place(ORDER.indexOf(n))),330)},
 go:()=>{reset();speak('Find the tower with 1 cube. Then find one more.');buttons();M.want=ready(1,()=>M.placed.length>=6,'Every step is one cube taller than the one before.')}},
{h:'Hop one more',p:'The frog hops to the number that is one more. Tap where it lands.',predict:{q:'What is one more than 9?',opts:['10','8','9'],ans:0},task:'Make 3 hops',
 show:()=>{steps[2].go();runList(HOPS.map(a=>()=>hop(a+1)),520)},
 go:()=>{reset();speak('The frog is on 3. Tap the number that is one more.');buttons();M.want=ready(2,()=>M.r>=3,'One more is the next number on the track.')}},
{h:'One less',p:'Take one cube away. How many are left now?',predict:{q:'7 cubes. Take one away. How many now?',opts:['6','8','7'],ans:0},task:'Find one less 3 times',
 show:()=>{steps[3].go();runList(DROPS.flatMap(a=>[binIt,()=>sayLess(a-1)]),330)},
 go:()=>{reset();speak('7 cubes. Drag the top cube to the bin.');buttons();M.want=ready(3,()=>M.r>=3,'One less is the number just before.')}},
{h:'Count on',p:'Some balls hide in the cup. Drop in one more. You do not need to count them all again.',predict:{q:'6 are in the cup. One more goes in. What do you do?',opts:['Say 6, then 7','Count from 1 again'],ans:0},task:'Count on 3 times',
 show:()=>{steps[4].go();runList(CUPS.flatMap(k=>[drop,()=>sayCup(k+1)]),330)},
 go:()=>{reset();speak('6 are hiding in the cup. Drag one more in.');buttons();M.want=ready(4,()=>M.r>=3,'Keep the number in your head and count on one.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.want()});
const QS=[['What is one more than 4?',[['5','ok'],['4','same'],['3','back']]],
 ['There are 8 ducks. One more comes. How many now?',[['9','ok'],['10','jump'],['8','same']]],
 ['What is one less than 6?',[['5','ok'],['7','wayup'],['6','same']]],
 ['7 sweets are in a bag. You put in one more. Best way to find how many?',[['Say 7, then 8','ok'],['Tip them out and count from 1','again'],['Guess','guess']]],
 ['Which number comes just after 9?',[['10','ok'],['8','back'],['11','jump']]],
 ['Mo has 3 cars. Jo has one more than Mo. How many does Jo have?',[['4','ok'],['3','same'],['5','jump']]]];
function slip(t){let m='Say the counting numbers and stop at the very next one.';
 if(t==='same')m='That is the same number. One more is always bigger by one.';
 if(t==='back')m='That is one less, the number before. One more is the number after.';
 if(t==='jump')m='That is two more. One more is just the next number.';
 if(t==='wayup')m='That is one more. One less goes back to the number before.';
 if(t==='again')m='You can, but it is slow. Keep 7 in your head and count on one: 8.';
 if(t==='guess')m='No need to guess. One more is the next number: 7, then 8.';
 return m}
function ask(){qNo++;const[q,ops]=QS[qNo%QS.length],r=qNo%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${row} right in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
