/* Flagship: Representing Numbers (ages 6-8; NC Y2/Y3 number and place value: identify, represent and estimate numbers
   using different representations including the number line). Place 37 on 0-100 and 346 on 0-1000 from the halfway
   mark, estimate a jar of beads from 10 ringed beads, build 346 in hundreds, tens and ones while a pointer hops along a
   0-1000 line, and match blocks to numerals (205, not 25). Not flag3digit (place names) or flagestm (rounding). */
(()=>{
VIS.reg('flagnline',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['l100','l1000','jar','build','match','chal'][A.step];
const INK='#0f172a',CARD='#f8fafc',FLAG='#7c3aed',OKC='#15803d',BAD='#b45309',BEAD=['#f472b6','#60a5fa','#facc15','#4ade80'];
const LINES={l100:{max:100,want:37,tol:2,big:10,small:1},l1000:{max:1000,want:346,tol:20,big:100,small:10}};
const ROUNDS=[[2,0,5,['25','250']],[1,7,0,['17','107']],[4,0,3,['43','430']]];
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const snd=k=>A.sound[k](),ink=()=>A.col.dark?'#e2e8f0':INK,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const mid=g=>{g.textAlign='center';g.textBaseline='middle'},seg=(g,a,b,x,y)=>{g.beginPath();g.moveTo(a,b);g.lineTo(x,y);g.stroke()};
/* a word on a light card, readable in both themes */
function pill(s,x,y,px,ring){const g=A.ctx;px=px||(A.narrow?15:18);g.font=`700 ${px}px system-ui`;mid(g);const w=g.measureText(s).width+20;x=clamp(x,w/2+4,A.W-w/2-4);
 g.fillStyle=CARD;A.paint.rrect(x-w/2,y-px*.85,w,px*1.7,px*.6);g.fill();g.lineWidth=ring?3:1.5;g.strokeStyle=ring||'#94a3b8';g.stroke();g.fillStyle=INK;g.fillText(s,x,y)}
/* number line from 0 to max: long ticks and numbers only at 0, the middle and the end */
function lineGeom(max){const x0=26,x1=A.W-26;return{max,x0,x1,y:A.H*.58,x:v=>x0+(v/max)*(x1-x0),v:x=>(x-x0)/(x1-x0)*max}}
function numberLine(L,step){const g=A.ctx;g.strokeStyle=ink();g.fillStyle=ink();g.lineWidth=3;seg(g,L.x0,L.y,L.x1,L.y);g.font=`800 ${A.narrow?15:18}px system-ui`;mid(g);
 for(let v=0;v<=L.max;v+=step){const key=v===0||v===L.max||v*2===L.max;g.lineWidth=key?3:2;seg(g,L.x(v),L.y-(key?18:10),L.x(v),L.y+(key?18:10));if(key)g.fillText(v,L.x(v),L.y+36)}}
function flagAt(x,y,col){const g=A.ctx;g.strokeStyle=ink();g.lineWidth=3;seg(g,x,y,x,y-70);g.fillStyle=col;g.beginPath();g.moveTo(x,y-70);g.lineTo(x+34,y-58);g.lineTo(x,y-46);g.closePath();g.fill();g.stroke()}
function drawLine(){const k=part(),D=LINES[k],L=lineGeom(D.max);numberLine(L,D.big);flagAt(L.x(S.at),L.y,FLAG);
 pill(`Put the flag where ${D.want} goes`,A.W/2,A.H*.1,null,'#6d28d9');
 if(S.won){const g=A.ctx;g.fillStyle=OKC;g.beginPath();g.arc(L.x(D.want),L.y,9,0,7);g.fill();pill(`${D.want} is here ✓`,L.x(D.want),L.y+72,null,OKC)}}
function place(v,check){const D=LINES[part()];v=clamp(Math.round(v/D.small)*D.small,0,D.max);S.at=v;snd('tick');if(check)judge();else A.redraw()}
function judge(){const D=LINES[part()],off=S.at-D.want,half=D.max/2;if(S.won)return;
 if(Math.abs(off)<=D.tol){S.won=true;snd('pop');return after(`Yes! ${D.want} is a bit before the middle (${half}), between ${Math.floor(D.want/D.big)*D.big} and ${Math.ceil(D.want/D.big)*D.big}.`)}
 after(off<0?`Too far left. ${D.want} is bigger than that. Use the middle, ${half}, to help.`:`Too far right. ${D.want} is less than ${half}, so it goes before the middle.`)}
/* jar of 42 beads; 10 in one corner are ringed as a guide */
function beads(){if(S.beads)return S.beads;let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647,cells=[];for(let r=0;r<7;r++)for(let q=0;q<8;q++)cells.push([q,r]);
 for(let i=cells.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]]}
 S.beads=cells.slice(0,42).map(([q,r],i)=>({q:q+.2+rnd()*.6,r:r+.2+rnd()*.6,c:BEAD[i%4]}));S.beads.sort((a,b)=>(a.q+6-a.r)-(b.q+6-b.r));S.beads.forEach((b,i)=>b.ten=i<10);return S.beads}
function jarGeom(){const w=Math.min(A.W*.5,260),h=A.H*(A.narrow?.5:.62);return{x:A.narrow?16:A.W*.08,y:A.H*.1,w,h,cw:w/8,ch:h/7}}
const estGeom=()=>{const J=jarGeom(),x0=A.narrow?20:J.x+J.w+40,x1=A.W-24;return{x0,x1,y:A.narrow?A.H*.84:A.H*.6,x:v=>x0+(v/80)*(x1-x0),v:x=>(x-x0)/(x1-x0)*80}};
function drawJar(){const g=A.ctx,J=jarGeom(),r=Math.min(J.cw,J.ch)*.32;g.strokeStyle=ink();g.lineWidth=3;A.paint.rrect(J.x,J.y,J.w,J.h,14);g.stroke();
 const am=A.col.dark?'#fbbf24':BAD;beads().forEach(b=>{const x=J.x+b.q*J.cw,y=J.y+J.h-b.r*J.ch;g.fillStyle=b.c;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.2;g.stroke();
  if(b.ten){g.strokeStyle=am;g.lineWidth=3;g.beginPath();g.arc(x,y,r+4,0,7);g.stroke()}});   // the 10 guide beads each get a ring
 pill('10 ringed beads',J.x+J.w/2,A.H*.05,13,BAD);const E=estGeom();g.strokeStyle=ink();g.fillStyle=ink();g.lineWidth=3;seg(g,E.x0,E.y,E.x1,E.y);g.font=`700 ${A.narrow?12:14}px system-ui`;mid(g);
 for(let v=0;v<=80;v+=10){g.lineWidth=2;seg(g,E.x(v),E.y-8,E.x(v),E.y+8);g.fillText(v,E.x(v),E.y+22)}
 flagAt(E.x(S.est),E.y,FLAG);const n=A.narrow,px=n?A.W*.78:(E.x0+E.x1)/2;pill(`${n?'':'My estimate: '}about ${S.est}`,px,n?A.H*.24:E.y-92,n?14:16,'#6d28d9');if(S.counted)pill(`Counted${n?'':':'} 42`,px,n?A.H*.4:E.y-56,n?14:16,OKC)}
function guess(v){S.est=clamp(Math.round(v/5)*5,0,80);S.counted=false;snd('tick');after(`Estimate: about ${S.est}.`)}
function count(){S.counted=true;snd('pop');const off=Math.abs(S.est-42);S.close=off<=5;
 after(S.close?`Counted: 42. Your estimate of ${S.est} was close. About 4 groups of 10 fit in the jar.`:S.est<42?`Counted: 42. ${S.est} is too few. The 10 ringed beads fill only about a quarter of the jar.`:`Counted: 42. ${S.est} is too many. Only about 4 groups of 10 fit.`)}
/* base-ten blocks in three columns; a pointer hops along a 0-1000 line as blocks are added */
const val=()=>S.h*100+S.t*10+S.o;
function blocks(x,y,w,h,t,o,u){const g=A.ctx,f=Math.min(u*10,(w*.43-8)/3),q=f/10;g.strokeStyle=INK;g.lineWidth=1;   // flats 3 to a row, so 9 fit
 for(let i=0;i<h;i++){const X=x+(i%3)*(f+4),Y=y+Math.floor(i/3)*(f+4);g.fillStyle='#93c5fd';g.fillRect(X,Y,f,f);for(let k=0;k<=10;k++){seg(g,X+k*q,Y,X+k*q,Y+f);seg(g,X,Y+k*q,X+f,Y+k*q)}}
 const tx=x+w*.45;for(let i=0;i<t;i++){g.fillStyle='#86efac';g.fillRect(tx+i*(u+3),y,u,u*10);g.strokeRect(tx+i*(u+3),y,u,u*10)}
 const ox=x+w*.8;for(let i=0;i<o;i++){g.fillStyle='#fde047';g.fillRect(ox+(i%3)*(u+4),y+Math.floor(i/3)*(u+4),u,u);g.strokeRect(ox+(i%3)*(u+4),y+Math.floor(i/3)*(u+4),u,u)}}
const unit=()=>Math.max(5,Math.min(9,A.W/42));
function cols(){const w=A.W-24;return[[0,.43],[.45,.33],[.8,.2]].map(([a,b])=>({x:12+w*a,y:A.H*.2,w:w*b,h:A.H*.45}))}
function drawBuild(){const g=A.ctx,u=unit(),C=cols();['hundreds','tens','ones'].forEach((n,i)=>{const r=C[i];g.fillStyle=A.alpha(['#3b82f6','#22c55e','#eab308'][i],A.col.dark?.18:.12);A.paint.rrect(r.x,r.y,r.w-6,r.h,10);g.fill();pill(n,r.x+r.w/2-3,r.y-14,13)});
 blocks(18,C[0].y+12,A.W-24,S.h,S.t,S.o,u);const L={...lineGeom(1000),y:A.H*.82};numberLine(L,100);const x=L.x(val());g.fillStyle=FLAG;g.beginPath();g.moveTo(x,L.y-4);g.lineTo(x-10,L.y-22);g.lineTo(x+10,L.y-22);g.closePath();g.fill();
 pill(`${S.h} hundreds ${S.t} tens ${S.o} ones = ${val()}`,A.W/2,A.H*.06,A.narrow?13:16,val()===346?OKC:null)}
function add(p,d){const k='hto'[p];S[k]=clamp(S[k]+d,0,9);snd(d>0?'pop':'tick');const v=val();
 after(`${S.h} hundreds, ${S.t} tens and ${S.o} ones make ${v}.`+(v===346?' That is 346: 300 + 40 + 6.':S.h===4&&S.t===3?' That has 4 hundreds, not 3.':''))}
/* match: blocks on the left, three numeral cards on the right */
function cards(){const w=A.narrow?A.W*.27:A.W*.22,h=Math.min(A.H*.17,72),x=A.narrow?A.W-w-10:A.W*.7;return[0,1,2].map(i=>A.narrow?{x:10+i*(w+(A.W-20-3*w)/2),y:A.H*.74,w,h}:{x,y:A.H*.12+i*(h+16),w,h})}
function options(){const R=ROUNDS[S.round],right=String(R[0]*100+R[1]*10+R[2]),o=[right,...R[3]],k=S.round%3;return o.slice(k).concat(o.slice(0,k))}
function drawMatch(){const g=A.ctx;if(S.round>=ROUNDS.length)return pill('All three matched!',A.W/2,A.H*.45,null,OKC);const R=ROUNDS[S.round],u=unit()*(A.narrow?1:.9);
 const bw=A.narrow?A.W-24:A.W*.66;blocks(14,A.H*.12,bw,R[0],R[1],R[2],u);['hundreds','tens','ones'].forEach((n,i)=>pill(n,14+bw*[.2,.5,.84][i],A.H*.48,12));pill(`Which number is this? (${S.round+1} of 3)`,A.narrow?A.W/2:A.W*.33,A.H*.05+8,A.narrow?13:15);
 options().forEach((s,i)=>{const r=cards()[i];g.fillStyle=S.miss===s?A.alpha('#dc2626',.25):CARD;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle=INK;g.font=`800 ${A.narrow?24:28}px system-ui`;mid(g);g.fillText(s,r.x+r.w/2,r.y+r.h/2)})}
function choose(s){if(S.round>=ROUNDS.length)return;const R=ROUNDS[S.round],right=String(R[0]*100+R[1]*10+R[2]);
 if(s===right){S.round++;S.miss=null;snd('pop');return after(`Yes, ${right}: ${R[0]} hundreds, ${R[1]} tens, ${R[2]} ones.`+(S.round>=ROUNDS.length?' All three matched.':''))}
 S.miss=s;snd('miss');after(s.length<3?`${s} has only two digits. There are hundreds here, so the number needs three: put 0 where a place is empty.`:`${s} has the tens and ones mixed up. Count the rods for tens and the cubes for ones.`)}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H);const k=part();
 if(k==='chal'){const Q=QS[qn%QS.length];pill('Challenge',A.W/2,A.H*.12);if(Q)pill(Q.pic,A.W/2,A.H*.5,A.narrow?18:22);return}
 ({l100:drawLine,l1000:drawLine,jar:drawJar,build:drawBuild,match:drawMatch})[k]()}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{at:0,est:10,h:0,t:0,o:0,round:0,grab:false,ok:()=>{}})}
const doneIf=(i,test,msg)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,say,test,msg){fresh();speak(say);buttons();S.ok=doneIf(i,test,msg)}
function play(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||380)*(j+1)))}
function after(m){speak(m);A.redraw();buttons();S.ok()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(LINES[k]){const D=LINES[k];[[-D.big,'◀◀'],[-D.small,'◀'],[D.small,'▶'],[D.big,'▶▶']].forEach(([d,t])=>b(`${t} ${Math.abs(d)}`,()=>place(S.at+d,true),`Move the flag ${d<0?'left':'right'} ${Math.abs(d)}`))}
 if(k==='jar'){b('Fewer',()=>guess(S.est-5),'Estimate 5 fewer');b('More',()=>guess(S.est+5),'Estimate 5 more');b('Count to check',count)}
 if(k==='build')['hundred','ten','one'].forEach((n,i)=>{b(`+ 1 ${n}`,()=>add(i,1),`Add a ${n}`);b(`− 1 ${n}`,()=>add(i,-1),`Take away a ${n}`)});
 if(k==='match'&&S.round<ROUNDS.length)options().forEach(s=>b(s,()=>choose(s),'Choose '+s))}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* drag the flag or the estimate; tap a column to add a block; tap or drag a card */
function down(p){const k=part();if(LINES[k]){S.grab=true;place(lineGeom(LINES[k].max).v(p.x));return true}
 if(k==='jar'){const E=estGeom();if(p.y>E.y-80&&p.x>E.x0-20){S.grab=true;guess(E.v(p.x));return true}return false}
 if(k==='build'){const C=cols(),i=C.findIndex(r=>inR(p,r));if(i>=0)add(i,1);return false}
 if(k==='match'){const i=cards().findIndex(r=>inR(p,r));if(i>=0)choose(options()[i]);return false}return false}
function move(p){if(!S.grab)return;const k=part();if(LINES[k])place(lineGeom(LINES[k].max).v(p.x));if(k==='jar')guess(estGeom().v(p.x))}
function up(){if(S.grab&&LINES[part()])judge();S.grab=false}
const steps=[
{h:'Use the middle',p:'This line goes from 0 to 100. The middle is 50. Drag the flag, or use the buttons, to where 37 goes.',
 predict:{q:'37 is closest to…',opts:['0','50','100'],ans:1},task:'Put the flag where 37 goes',
 show:()=>play(0,[()=>place(10),()=>place(20),()=>place(30),()=>place(36),()=>place(37,true)]),
 go:()=>begin(0,'A number line from 0 to 100 with a mark every 10. The flag is at 0.',()=>S.won,'37 is 3 tens and 7 ones, a bit before 50.')},
{h:'A longer line',p:'Now the line goes from 0 to 1000. The middle is 500. Put the flag where 346 goes.',
 predict:{q:'On a 0 to 1000 line, 346 is…',opts:['near the end, it is a big number','a bit before the middle','at 34'],ans:1},task:'Put the flag where 346 goes',
 show:()=>play(1,[()=>place(100),()=>place(200),()=>place(300),()=>place(340,true)]),
 go:()=>begin(1,'A number line from 0 to 1000 with a mark every 100. The flag is at 0.',()=>S.won,'346 is between 300 and 400, before the middle.')},
{h:'About how many?',p:'Do not count every bead. Look at the 10 ringed beads. How many groups like that fill the jar? Drag your estimate, then count to check.',
 predict:{q:'10 beads have rings. The whole jar has about…',opts:['10','40','100'],ans:1},task:'Make an estimate within 5 of the count',
 show:()=>play(2,[()=>guess(20),()=>guess(30),()=>guess(40),count]),
 go:()=>begin(2,'A jar of beads. 10 of them are ringed.',()=>S.counted&&S.close,'About 4 tens fit, so about 40. An estimate is a close, sensible number.')},
{h:'Build 346',p:'Build 346 with blocks. A flat is a hundred, a rod is a ten and a cube is a one. Watch the pointer on the line.',
 predict:{q:'How many tens rods do you need for 346?',opts:['3','4','6'],ans:1},task:'Build 346 with blocks',
 show:()=>play(3,[()=>add(0,1),()=>add(0,1),()=>add(0,1),()=>add(1,1),()=>add(1,1),()=>add(1,1),()=>add(1,1),()=>add(2,1),()=>add(2,1),()=>add(2,1),()=>add(2,1),()=>add(2,1),()=>add(2,1)],200),
 go:()=>begin(3,'Empty place-value mat with hundreds, tens and ones. The pointer is at 0.',()=>val()===346,'3 hundreds, 4 tens, 6 ones: 300 + 40 + 6 = 346.')},
{h:'Match it',p:'Look at the blocks. Tap the number they show. Three to do.',
 predict:{q:'2 hundreds, no tens and 5 ones is…',opts:['25','205','250'],ans:1},task:'Match all three',
 show:()=>play(4,[()=>choose('205'),()=>choose('170'),()=>choose('403')],500),
 go:()=>begin(4,'2 hundred flats and 5 ones cubes. Cards: 205, 25 and 250.',()=>S.round>=ROUNDS.length,'A 0 holds the empty place: 205, 170, 403.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
/* question, answer, two wrong answers tagged with their slip */
const QS=[
 {pic:'0 ········ 50 ········ 100',q:'Where does 48 go on a 0 to 100 line?',ans:'just before the middle',bad:[['near 0','small'],['near 100','big']]},
 {pic:'💯💯💯 ▫️▫️▫️▫️▫️▫️▫️',q:'3 hundreds, 0 tens and 7 ones make…',ans:'307',bad:[['37','zero'],['370','swap']]},
 {pic:'🫙 ◯10',q:'A group of 10 beads fills about a quarter of a jar. About how many beads are in the jar?',ans:'about 40',bad:[['about 10','one'],['I must count them all','exact']]},
 {pic:'0 ········ 500 ········ 1000',q:'On a 0 to 1000 line, where does 700 go?',ans:'past the middle',bad:[['near the start','digit'],['next to 70','ten']]},
 {pic:'3 4 6',q:'What does the 4 in 346 stand for?',ans:'4 tens, which is 40',bad:[['4 ones','ones'],['4 hundreds','hund']]},
 {pic:'0 ················ 100',q:'A line goes from 0 to 100. What number is in the middle?',ans:'50',bad:[['10','ten2'],['100','end']]}];
function why(t){let m='Use the start, the middle and the end of the line to help.';
 if(t==='small')m='48 is nearly 50, so it goes just before the middle, not near 0.';
 if(t==='big')m='48 is less than 50, the middle. It goes just before the middle.';
 if(t==='zero')m='37 has no hundreds. With 3 hundreds you need three digits: 3, then 0 for no tens, then 7.';
 if(t==='swap')m='370 is 3 hundreds and 7 tens. Here there are 0 tens and 7 ones: 307.';
 if(t==='one')m='The 10 beads fill only a quarter of the jar. 4 groups of 10 is about 40.';
 if(t==='exact')m='An estimate does not need counting. Use the group of 10: about 4 of them fit, so about 40.';
 if(t==='digit')m='700 is 7 hundreds. The middle is 500, so 700 is past the middle.';
 if(t==='ten')m='70 is 7 tens. 700 is 7 hundreds, much further along, past 500.';
 if(t==='ones')m='The 4 is in the tens place, so it is 4 tens, worth 40. The 6 is the ones.';
 if(t==='hund')m='The 3 is the hundreds. The 4 is in the middle, the tens place: 40.';
 if(t==='ten2')m='10 is near the start. Half of 100 is 50, so 50 is in the middle.';
 if(t==='end')m='100 is the end of the line. The middle is half way: 50.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():snd('miss');speak(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;buttons()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
