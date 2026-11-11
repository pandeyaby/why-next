/* Flagship: counting within 1,000 (ages 7-8). Build three-digit numbers from hundreds, tens and ones blocks, count on by
   ones across 199 to 200 while ten ones regroup into a ten, hop in tens across 700, hop in hundreds from 150, count back
   across 300 and skip-count in fives up to 1,000 on a number line that scrolls with each hop. */
(()=>{
const BUILD=[305,460];
const HOPS={on:{from:196,step:1,to:203},tens:{from:650,step:10,to:720},hund:{from:150,step:100,to:950},back:{from:303,step:-1,to:297},five:{from:960,step:5,to:1000}};
const WORD=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
VIS.reg('flaghund',c=>{let A,bar,box,qi=-1,run=0;const F={};
const stage=()=>['build','on','tens','hund','back','five','chal'][A.step];
const sfx=k=>A.sound[k](),draw=()=>A.redraw(),sync=()=>{draw();buttons()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const hc=()=>A.col.dark?'#fbbf24':'#b45309',tc=()=>A.col.dark?'#5eead4':'#0f766e',oc=()=>A.col.dark?'#c4b5fd':'#6d28d9';
function label(t,x,y,px,ink,maxW,wt){const g=A.ctx,s=Math.round(px*(A.narrow?1:1.12));g.font=`${wt||800} ${s}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,maxW||A.W-20)}
const digits=n=>({h:Math.floor(n/100)%10,t:Math.floor(n/10)%10,o:n%10,k:n>=1000});
const say3=n=>{if(n>=1000)return'one thousand';const d=digits(n),p=[];if(d.h)p.push(WORD[d.h]+' hundred');const r=n%100,w=r<20?WORD[r]:TENS[d.t]+(d.o?'-'+WORD[d.o]:'');if(r)p.push((d.h?'and ':'')+w);return p.join(' ')||'zero'};
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.28);g.fillRect(0,0,W,H);(stage()==='build'?dBuild:stage()==='chal'?dChal:dHop)(g,W,H,C);A.fx.draw(g)}
/* ---- the place-value chart: three coloured columns with a digit on top ---- */
const cols=()=>{const x0=A.W*.04,w=A.W*.92,gap=8,cw=(w-2*gap)/3;return[0,1,2].map(i=>({x:x0+i*(cw+gap),y:A.H*.2,w:cw,h:A.H*(stage()==='build'?.62:.36)}))};
function chart(g,n,C,hi){const d=digits(n),K=cols(),names=['hundreds','tens','ones'],ink=[hc(),tc(),oc()],v=[d.h,d.t,d.o];
 K.forEach((r,i)=>{A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=A.alpha(ink[i],hi===i?.24:.1);g.fill();g.lineWidth=hi===i?3:1.5;g.strokeStyle=ink[i];g.stroke();
  label(names[i],r.x+r.w/2,r.y+14,12,C.tx,r.w-6,700);label(d.k&&i===0?'10':String(v[i]),r.x+r.w/2,r.y-A.H*.075,A.narrow?26:30,ink[i]);blocks(g,r,i,d.k&&i===0?10:v[i],ink[i])})}
/* hundreds are 10x10 flats, tens are rods of 10, ones are single cubes */
function blocks(g,r,kind,k,col){const top=r.y+28,avail=r.h-34;if(!k){label('0',r.x+r.w/2,top+avail/2,13,A.col.mu,0,600);return}
 g.fillStyle=col;g.strokeStyle=A.col.dark?'#0f172a':'#ffffff';g.lineWidth=1;
 if(kind===0){const per=Math.min(k,r.w>160?5:3),rows=Math.ceil(k/per),s=Math.min((r.w-8)/per-4,avail/rows-6,46);for(let i=0;i<k;i++){const x=r.x+6+(i%per)*(s+4),y=top+Math.floor(i/per)*(s+6);g.fillRect(x,y,s,s);g.globalAlpha=.45;if(s>=26)for(let j=1;j<10;j++){g.beginPath();g.moveTo(x+s*j/10,y);g.lineTo(x+s*j/10,y+s);g.moveTo(x,y+s*j/10);g.lineTo(x+s,y+s*j/10);g.stroke()}g.globalAlpha=1}}
 if(kind===1){const s=Math.min((r.w-8)/9-3,12),L=Math.min(avail-4,s*10);for(let i=0;i<k;i++){const x=r.x+6+i*(s+3);g.fillRect(x,top,s,L);g.globalAlpha=.45;for(let j=1;j<10;j++){g.beginPath();g.moveTo(x,top+L*j/10);g.lineTo(x+s,top+L*j/10);g.stroke()}g.globalAlpha=1}}
 if(kind===2){const s=Math.min((r.w-12)/3-6,18);for(let i=0;i<k;i++){g.fillRect(r.x+8+(i%3)*(s+6),top+Math.floor(i/3)*(s+6),s,s)}}}
/* ---- 1: build a number from blocks ---- */
function dBuild(g,W,H,C){const n=F.b.h*100+F.b.t*10+F.b.o,T=BUILD[F.r];chart(g,n,C,F.last);
 label(F.r<BUILD.length?`Make ${T}`:'Both numbers built!',W/2,H*.9,15,C.tx);label(`${n}: ${say3(n)}`,W/2,H*.96,12,C.mu,0,600)}
function add(i,s){if(stage()!=='build'||F.r>=BUILD.length)return;const k=['h','t','o'][i];F.b[k]=Math.max(0,Math.min(9,F.b[k]+s));F.last=i;sfx('tick');
 const n=F.b.h*100+F.b.t*10+F.b.o,T=BUILD[F.r];let m=`${F.b.h} hundreds, ${F.b.t} tens and ${F.b.o} ones make ${n}.`;
 if(n===T){m+=T%100<10?` The 0 in ${T} says there are no tens. It keeps the 3 in the hundreds place.`:' The 0 says there are no ones.';F.r++;F.b={h:0,t:0,o:0};sfx('pop');if(F.r<BUILD.length)m+=` Now make ${BUILD[F.r]}.`}
 speak(m);sync();F.want()}
/* ---- 2-6: hop along a number line ---- */
const line=()=>({x0:A.W*.06,x1:A.W*.94,y:A.H*(A.narrow?.78:.84)});
function dHop(g,W,H,C){const S=HOPS[stage()],L=line(),n=F.n,st=Math.abs(S.step),hi=st===100?0:st===10?1:2;chart(g,Math.round(F.show),C,F.flash?hi:-1);
 const span=6*st,lo=Math.max(0,Math.min(1000-span,(S.step>0?n-2*st:n-4*st))),xs=v=>L.x0+(v-lo)/span*(L.x1-L.x0);
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(L.x0-6,L.y);g.lineTo(L.x1+6,L.y);g.stroke();
 for(let v=lo;v<=lo+span;v+=st){const x=xs(v),here=v===n;g.lineWidth=2;g.beginPath();g.moveTo(x,L.y-8);g.lineTo(x,L.y+8);g.stroke();
  label(String(v),x,L.y+22,A.narrow?11:12,here?C.tx:C.mu,(L.x1-L.x0)/6.2,here?900:600);if(F.seen.includes(v)&&!here){g.fillStyle=A.alpha(C.gr,.55);g.beginPath();g.arc(x,L.y,5,0,7);g.fill()}}
 if(F.prev!=null&&F.prev>=lo&&F.prev<=lo+span){const a=xs(F.prev),b=xs(n),m=(a+b)/2,u=F.arc;g.strokeStyle=C.gr;g.lineWidth=3;g.beginPath();g.moveTo(a,L.y-10);g.quadraticCurveTo(m,L.y-60,a+(b-a)*u,L.y-10);g.stroke();
  label((S.step>0?'+':'−')+st,m,L.y-46,12,C.gr,60)}
 const x=xs(n);A.paint.ball(x,L.y-12,10,C.dark?'#f472b6':'#be185d');
 label(F.n===S.to?`You reached ${S.to}!`:`${S.step>0?'Count on':'Count back'} in ${st===1?'ones':st===10?'tens':st===100?'hundreds':'fives'} to ${S.to}`,W/2,H*.06,14,C.tx)}
/* one hop of the current step size; stops at the target */
function hop(){const v=stage(),S=HOPS[v];if(!S||F.n===S.to)return;const to=F.n+S.step;if(to<0||to>1000)return;
 const before=digits(F.n),after=digits(to);F.prev=F.n;F.n=to;F.seen.push(F.prev);F.arc=0;A.tween(F,{arc:1},A.reduced()?1:320,'out');A.tween(F,{show:to},A.reduced()?1:320,'out');sfx('tick');
 let m=`${say3(to)}, ${to}.`;
 if(S.step===1&&before.o===9)m+=` Ten ones make a new ten${after.t===0?', and ten tens make a new hundred':''}. The ones go back to 0.`;
 if(S.step===-1&&before.o===0)m+=` No ones left, so swap ${before.t===0?'a hundred for ten tens, then ':''}a ten for ten ones. The ones go to 9.`;
 if(S.step===10&&after.t===0)m+=' Ten tens make a new hundred, so the hundreds digit goes up by 1 and the tens go back to 0.';
 if(S.step===10&&after.t!==0)m+=' Only the tens digit changed.';
 if(S.step===100)m+=' Only the hundreds digit changed. The tens and ones stay the same.';
 if(S.step===5)m+=after.k?' Ten hundreds make one thousand: 1000.':` The ones digit goes ${after.o}.`;
 F.flash=(S.step===1&&before.o===9)||(S.step===10&&after.t===0)||(S.step===-1&&before.o===0);
 if(to===S.to){sfx('pop')}speak(m);sync();F.want()}
/* ---- challenge backdrop ---- */
function dChal(g,W,H,C){chart(g,999,C,-1);label('999 + 1 = 1000: ten hundreds make one thousand.',W/2,H*.88,14,C.tx)}
const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function buttons(){if(!bar)return;bar.innerHTML='';const v=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='build'&&F.r<BUILD.length){b('+ hundred',()=>add(0,1),'Add a hundred');b('+ ten',()=>add(1,1),'Add a ten');b('+ one',()=>add(2,1),'Add a one');b('− hundred',()=>add(0,-1),'Take away a hundred');b('− ten',()=>add(1,-1),'Take away a ten');b('− one',()=>add(2,-1),'Take away a one')}
 const S=HOPS[v];if(S&&F.n!==S.to){const st=Math.abs(S.step);b(S.step>0?`Hop +${st} ▶`:`◀ Hop −${st}`,()=>hop(),S.step>0?`Count on ${st}`:`Count back ${st}`)}}
function down(p){const v=stage();
 if(v==='build'){cols().forEach((r,i)=>{if(inside(p,r))add(i,1)});return false}
 if(HOPS[v]){hop();F.drag={x:p.x};return true}return false}
function move(p){if(!F.drag)return;const dx=p.x-F.drag.x,S=HOPS[stage()];if(S&&((S.step>0&&dx>40)||(S.step<0&&dx<-40))){F.drag.x=p.x;hop()}}
function up(){F.drag=0}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts){steps[n].go();const k=++F.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===F.k)f()},A.reduced()?30*(j+1):(j+1)*300))}
function reset(v){const k=(F.k||0)+1;for(const x in F)delete F[x];const S=HOPS[v];Object.assign(F,{k,want:()=>{},b:{h:0,t:0,o:0},r:0,last:-1,n:S?S.from:0,show:S?S.from:0,prev:null,arc:1,seen:[],drag:0,flash:false})}
const hopsTo=v=>{const S=HOPS[v];return Array.from({length:Math.abs((S.to-S.from)/S.step)},()=>()=>hop())};
const goHop=(n,v,intro,msg)=>()=>{reset(v);speak(intro);buttons();F.want=fin(n,()=>F.n===HOPS[v].to,msg)};
const steps=[
{h:'Hundreds, tens and ones',p:'A three-digit number has a hundreds digit, a tens digit and a ones digit. This is place value: where a digit sits tells you what it is worth.',
 predict:{q:'3 hundreds, 0 tens and 5 ones. Which number is that?',opts:['35','305','3005'],ans:1},task:'Build 305, then 460',
 show:()=>play(0,[()=>add(0,1),()=>add(0,1),()=>add(0,1),...Array(5).fill(()=>add(2,1)),...Array(4).fill(()=>add(0,1)),...Array(6).fill(()=>add(1,1))]),
 go:()=>{reset('build');speak('Tap a column, or press a button, to add a block. Make 305.');buttons();F.want=fin(0,()=>F.r>=BUILD.length,'305 is 3 hundreds, 0 tens and 5 ones. 460 is 4 hundreds, 6 tens and 0 ones.')}},
{h:'Over the hundred',p:'Count on in ones. When the ones reach 9, the next one makes a new ten. When the tens are full too, you make a new hundred.',
 predict:{q:'197, 198, 199, … what comes next?',opts:['1910','200','190'],ans:1},task:'Count on from 196 to 203',
 show:()=>play(1,hopsTo('on')),go:goHop(1,'on','Tap the line, swipe right, or press Hop. Count on to 203.','199 + 1 = 200: ten ones make a ten and ten tens make a hundred.')},
{h:'Hop in tens',p:'Skip-count in tens and only the tens digit changes, until the tens are full. Then the hundreds digit goes up by 1.',
 predict:{q:'650, 660, 670, 680, 690, … what comes next?',opts:['6100','700','691'],ans:1},task:'Hop in tens from 650 to 720',
 show:()=>play(2,hopsTo('tens')),go:goHop(2,'tens','Hop in tens from 650.','After 690 comes 700, not 6100.')},
{h:'Hop in hundreds',p:'Skip-count in hundreds from any number. Only the hundreds digit changes: 150, 250, 350.',
 predict:{q:'Count in hundreds from 150. Which number do you land on?',opts:['250','200','160'],ans:0},task:'Hop in hundreds from 150 to 950',
 show:()=>play(3,hopsTo('hund')),go:goHop(3,'hund','Hop in hundreds from 150.','150, 250, 350 … 950. The 5 tens never moved.')},
{h:'Count back',p:'Counting back is the swap the other way. With no ones left, break a ten into ten ones, so the ones digit goes to 9.',
 predict:{q:'303, 302, 301, 300, … what comes next?',opts:['290','299','200'],ans:1},task:'Count back from 303 to 297',
 show:()=>play(4,hopsTo('back')),go:goHop(4,'back','Tap the line, swipe left, or press Hop. Count back to 297.','300 − 1 = 299. The number just before 300 is 299.')},
{h:'Fives to 1000',p:'Skip-count in fives and the ones digit goes 5, 0, 5, 0. After 995 comes 1000: ten hundreds make one thousand.',task:'Hop in fives from 960 to 1000',
 show:()=>play(5,hopsTo('five')),go:goHop(5,'five','Hop in fives from 960.','995 + 5 = 1000, one thousand.')},
{h:'Challenge',p:'',go:()=>{reset('chal');ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.want()});
const QS=[['What comes after 399?',[['400','ok'],['3910','joined'],['390','tensback']]],
 ['470, 480, 490, … what comes next?',[['500','ok'],['4100','joined'],['491','ones']]],
 ['230, 330, 430, … what comes next?',[['530','ok'],['500','round'],['440','tens']]],
 ['502, 501, 500, … what comes next?',[['499','ok'],['400','hund'],['490','tensback']]],
 ['Which number is 4 hundreds, 0 tens and 7 ones?',[['407','ok'],['47','zero'],['4007','write']]],
 ['980, 985, 990, 995, … what comes next?',[['1000','ok'],['9100','joined'],['996','ones']]],
 ['720, 710, 700, … what comes next?',[['690','ok'],['600','hund'],['699','ones']]]];
function why(t){let m='Look at which digit changes, and swap ten for one when a place is full.';
 if(t==='joined')m='That joins the digits on the end. When a place gets to ten, it makes 1 of the next place: 399 + 1 = 400 and 490 + 10 = 500.';
 if(t==='tensback')m='That jumps back ten. Counting in ones, the number changes by just 1.';
 if(t==='ones')m='That changes the ones. This count goes up or down by tens or fives, so look at the gap between the numbers.';
 if(t==='round')m='Counting in hundreds from 230 keeps the 3 tens: 430, then 530. It does not jump to a round number.';
 if(t==='tens')m='That added a ten. The gap here is 100, so only the hundreds digit changes.';
 if(t==='hund')m='That took away a hundred. The gap is smaller: just one step back.';
 if(t==='zero')m='47 is only 4 tens and 7 ones. The 0 holds the tens place so the 4 stays in the hundreds: 407.';
 if(t==='write')m='4007 has a thousands place. Write the hundreds, tens and ones digits in order: 4, 0, 7 makes 407.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=(qi*2+1)%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(rot),...ops.slice(0,rot)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+q);draw()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Right! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{box.hidden=A.step!==6;bar.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset('build');A.gest({down,move,up});buttons()}});
A.start()})})();
