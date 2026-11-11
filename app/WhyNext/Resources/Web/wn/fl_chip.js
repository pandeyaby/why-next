/* Flagship – computers in everyday life (ages 5–7): find the five computers hidden around a home (a phone, a watch and a
   games console, but also a washing machine and a microwave with no keyboard at all), open up a torch, a smart speaker and
   a traffic light to see which ones have a chip inside, match what goes in to what comes out, run a washing machine whose
   steps are in a silly order (it follows them anyway) and fix them, then sort things in the street. The Challenge targets
   the ideas that a computer needs a screen, that anything electric is a computer, and that computers think for themselves. */
(()=>{const HOME=[['📱','Phone',1],['🧸','Teddy',0],['W','Washer',1],['📕','Book',0],['🎮','Console',1],['🥄','Spoon',0],['M','Microwave',1],['✏️','Pencil',0],['⌚','Watch',1]],
 OPEN=[['🔦','Torch',0,'Battery and bulb. No chip.'],['🔊','Smart speaker',1,'A chip! It listens for words.'],['🚦','Traffic light',1,'A chip! It changes the lights.']],
 IO=[['M','Microwave','You press Start',['It heats the food','It plays a song','It turns green']],
  ['🔊','Smart speaker','You say: play a song',['It plays the song','It heats the food','It washes clothes']],
  ['🚦','Crossing light','You press the button',['The green man shows','The food gets hot','A song plays']]],
 JOBS=['Add water','Wash','Spin'],STREET=[['🚗','Car',1],['🚲','Bike',0],['🏧','Cash machine',1],['🌳','Tree',0],['🚌','Bus',1],['🪁','Kite',0]];
VIS.reg('flagchip',c=>{let A,keys,box,n=-1,wins=0;c.fig.classList.add('young');
const S={};
const view=()=>['home','open','io','wash','street','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=k=>Math.round(k*(A.narrow?1.05:1.2));
function word(g,s,x,y,k,w){g.font=`${w||700} ${fs(k)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function tile(g,r,col,a,bad,lit){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=bad?4:lit?3:2;g.strokeStyle=bad?A.col.rd:lit?A.col.gr:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* the washer and microwave have no emoji, so draw them: a box with a round door, a box with a window and buttons */
function icon(g,e,x,y,k){const C=A.col,s=fs(k);if(e!=='W'&&e!=='M')return word(g,e,x,y,k);g.lineWidth=2;g.strokeStyle=C.tx;g.fillStyle=A.alpha(C.tx,.08);
 if(e==='W'){A.paint.rrect(x-s*.55,y-s*.6,s*1.1,s*1.2,5);g.fill();g.stroke();g.beginPath();g.arc(x,y+s*.08,s*.35,0,7);g.fillStyle=A.alpha(C.cy,.4);g.fill();g.stroke()}
 else{A.paint.rrect(x-s*.75,y-s*.45,s*1.5,s*.9,5);g.fill();g.stroke();g.fillStyle=A.alpha(C.am,.35);g.fillRect(x-s*.62,y-s*.32,s*.85,s*.64);g.strokeRect(x-s*.62,y-s*.32,s*.85,s*.64);
  for(let i=0;i<2;i++){g.beginPath();g.arc(x+s*.5,y-s*.15+i*s*.3,s*.08,0,7);g.stroke()}}}
/* a chip: a small square with legs */
function chip(g,x,y,s){const C=A.col;g.fillStyle=A.alpha(C.gr,.35);g.fillRect(x-s/2,y-s/2,s,s);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(x-s/2,y-s/2,s,s);
 g.beginPath();for(let i=0;i<3;i++){const o=-s/3+i*s/3;g.moveTo(x+o,y-s/2);g.lineTo(x+o,y-s*.75);g.moveTo(x+o,y+s/2);g.lineTo(x+o,y+s*.75);g.moveTo(x-s/2,y+o);g.lineTo(x-s*.75,y+o);g.moveTo(x+s/2,y+o);g.lineTo(x+s*.75,y+o)}g.stroke()}
const cell=i=>{const w=(A.W-40)/3,h=A.H*.25;return{x:10+(i%3)*(w+10),y:A.H*.04+Math.floor(i/3)*(h+6),w,h}};
const box3=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.12,w,h:A.H*.7}};
const card=i=>{const w=(A.W-40)/3,h=A.H*.21;return{x:10+(i%3)*(w+10),y:A.H*.04+Math.floor(i/3)*(h+6),w,h}};
const tray=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.53,w,h:A.H*.42}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){chip(g,W/2,H*.4,fs(34));word(g,'In → follows instructions → Out',W/2,H*.78,14,800);return}
 if(v==='home'){HOME.forEach(([e,nm],i)=>{const r=cell(i),f=S.got.includes(i);tile(g,r,f?C.gr:C.vi,f?.2:.08,S.bad===i,f);icon(g,e,r.x+r.w/2,r.y+r.h*.4,24);word(g,f?'Computer!':nm,r.x+r.w/2,r.y+r.h*.82,12,800)});
  word(g,`Computers found: ${S.got.length} of 5`,W/2,H*.96,12,700)}
 if(v==='open'){OPEN.forEach(([e,nm,has,inside],i)=>{const r=box3(i),o=S.opened.includes(i);tile(g,r,has&&o?C.gr:C.am,o?.18:.08,false,o&&has);word(g,e,r.x+r.w/2,r.y+r.h*.16,26);word(g,nm.replace('Smart ',''),r.x+r.w/2,r.y+r.h*.34,12,800);
  if(!o){word(g,'Tap to open',r.x+r.w/2,r.y+r.h*.7,11,600);return}if(has)chip(g,r.x+r.w/2,r.y+r.h*.58,Math.min(r.w*.35,fs(26)));else{word(g,'🔋',r.x+r.w/2-r.w*.18,r.y+r.h*.58,18);word(g,'💡',r.x+r.w/2+r.w*.18,r.y+r.h*.58,18)}
  word(g,has?'Chip!':'No chip',r.x+r.w/2,r.y+r.h*.86,12,800)})}
 if(v==='io'){const d=IO[S.hold!=null?S.hold:Math.min(S.round,2)],y=H*.42,bw=W*.27;[['IN',d[2]],['THINK','Follows its instructions'],['OUT',S.said||'?']].forEach(([t,s],k)=>{const r={x:10+k*(bw+W*.06),y:y-H*.2,w:bw,h:H*.4};
   tile(g,r,[C.cy,C.gr,C.am][k],.16,false,false);word(g,t,r.x+r.w/2,r.y+fs(12),11,800);wrap(g,s,r.x+r.w/2,r.y+r.h*.55,r.w-8,11);if(k<2)word(g,'→',r.x+r.w+W*.03,y,18,800)});
  icon(g,d[0],W/2,H*.1,20);word(g,d[1],W/2,H*.78,13,800);word(g,`Done: ${Math.min(S.round,3)} of 3`,W/2,H*.92,11,600)}
 if(v==='wash'){icon(g,'W',W*.2,H*.3,40);word(g,S.res||'Steps to follow:',W/2,H*.06,12,800);const list=S.mine.length||S.fixing?S.mine:S.prog;
  for(let i=0;i<3;i++){const r={x:W*.42,y:H*.16+i*H*.17,w:W*.52,h:H*.14};tile(g,r,C.vi,.1,S.wrong&&!S.fixing,false);word(g,`${i+1}. ${list[i]||'…'}`,r.x+r.w/2,r.y+r.h/2,13,800)}
  word(g,S.fixing?'Tap the steps in the right order':S.clean?'Clean clothes! 👕':'Press Run',W/2,H*.8,12,700)}
 if(v==='street'){STREET.forEach(([e,nm],i)=>{if(S.put[i]!=null||(S.drag&&S.drag.i===i))return;const r=card(i);tile(g,r,C.vi,.1,S.bad===i,S.sel===i);word(g,e,r.x+r.w/2,r.y+r.h*.4,22);word(g,nm,r.x+r.w/2,r.y+r.h*.8,11,800)});
  ['Computer inside','No computer'].forEach((nm,k)=>{const r=tray(k);tile(g,r,k?C.am:C.gr,.16,false,false);word(g,nm,r.x+r.w/2,r.y+fs(13),12,800);
   STREET.forEach(([e],i)=>{if(S.put[i]===k){const j=STREET.filter((_,q)=>S.put[q]===k&&q<i).length;word(g,e,r.x+r.w*(.2+j*.3),r.y+r.h*.6,22)}})});
  if(S.drag)word(g,STREET[S.drag.i][0],S.drag.x,S.drag.y,26)}
 A.fx.draw(g)}
function wrap(g,s,x,y,w,k){g.font=`700 ${fs(k)}px system-ui,sans-serif`;const ws=s.split(' '),ls=[];let l='';ws.forEach(t=>{const z=l?l+' '+t:t;if(g.measureText(z).width>w&&l){ls.push(l);l=t}else l=z});ls.push(l);
 ls.forEach((t,i)=>word(g,t,x,y+(i-(ls.length-1)/2)*fs(k)*1.25,k,700))}
const oops=(t,i)=>{S.bad=i;A.sound.miss();tell(t);A.redraw()},yes=t=>{S.bad=null;A.sound.pop();tell(t);btns();A.redraw();S.want()};
/* step 0 */
function find(i){if(S.got.length>=5)return;const[,nm,has]=HOME[i];if(!has)return oops(`A ${nm.toLowerCase()} has no computer. It cannot follow instructions.`,i);
 if(S.got.includes(i))return tell('Found that one. Look for another.');S.got.push(i);S.bad=null;A.sound.tick();if(S.got.length<5){tell(`The ${nm.toLowerCase()} has a computer inside.`+(i===2||i===6?' No screen, still a computer!':''));btns();return A.redraw()}
 yes('Five computers! A washer and a microwave have no keyboard, but they are computers too.')}
/* step 1 */
function open(i){if(S.opened.includes(i))return;S.opened.push(i);A.sound.tick();const[,nm,,inside]=OPEN[i];if(S.opened.length<3){tell(`${nm}: ${inside}`);btns();return A.redraw()}yes(`${nm}: ${inside} The torch uses power, but it has no computer.`)}
/* step 2 */
function pick(k){if(S.round>2)return;const d=IO[S.round];if(k){S.said=null;return oops(`No. When ${d[2].toLowerCase()}, the ${d[1].toLowerCase()} does its own job.`,null)}
 S.said=d[3][0];S.hold=S.round;S.round++;A.sound.tick();if(S.round<3){tell(`Yes! In: ${d[2].toLowerCase()}. Out: ${d[3][0].toLowerCase()}.`);setTimeout(()=>{if(view()==='io'&&S.round<3){S.said=null;S.hold=null;A.redraw()}},A.reduced()?10:900);btns();return A.redraw()}
 yes('In, follow the instructions, out. Every computer does this.')}
/* step 3 */
function run(){const list=S.fixing?S.mine:S.prog;if(S.fixing&&S.mine.length<3)return tell('Pick all 3 steps first.');
 if(list.join()===JOBS.join()){S.clean=1;S.wrong=0;S.res='It followed the steps. Clean!';S.fixing=0;return yes('Water, wash, spin. Clean clothes! It does just what the steps say.')}
 S.res=`It did "${list[0]}" first. Silly!`;S.wrong=1;S.fixing=1;S.mine=[];A.sound.miss();tell(`It did ${list[0].toLowerCase()} first, because that is what the steps said. It cannot fix them. You can! Tap the steps in order.`);btns();A.redraw()}
function add(j){if(!S.fixing||S.mine.includes(JOBS[j]))return;S.mine.push(JOBS[j]);A.sound.tick();tell(`Step ${S.mine.length}: ${JOBS[j].toLowerCase()}.`);btns();A.redraw()}
/* step 4 */
function drop(i,k){S.drag=null;S.sel=null;if(i==null||S.put[i]!=null)return A.redraw();const[,nm,has]=STREET[i];
 if(k!==(has?0:1))return oops(has?`A ${nm.toLowerCase()} does have a computer inside, even with no screen.`:`A ${nm.toLowerCase()} has no computer. It does not follow instructions.`,i);
 S.put[i]=k;S.bad=null;A.sound.tick();if(S.put.filter(x=>x!=null).length<STREET.length){tell(`${nm}: ${k?'no computer':'computer inside'}.`);btns();return A.redraw()}yes('Cars, buses and cash machines have computers inside.')}
const nextUp=()=>STREET.findIndex((_,i)=>S.put[i]==null);
function btns(){if(!keys)return;keys.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(v==='home'&&S.got.length<5)HOME.forEach(([e,nm],i)=>{if(!S.got.includes(i))B(nm,()=>find(i),`Does the ${nm.toLowerCase()} have a computer?`)});
 if(v==='open')OPEN.forEach(([e,nm],i)=>{if(!S.opened.includes(i))B(e+' Open',()=>open(i),`Open the ${nm.toLowerCase()}`)});
 if(v==='io'&&S.round<3){const d=IO[S.round],o=[0,1,2].map(k=>(k+S.round)%3);o.forEach(k=>B(d[3][k],()=>pick(k),`Out: ${d[3][k]}`))}
 if(v==='wash'&&!S.clean){if(S.fixing)JOBS.forEach((j,k)=>{if(!S.mine.includes(j))B(j,()=>add(k),`Next step: ${j}`)});B('▶ Run',run,'Run the washing machine')}
 if(v==='street'){const i=nextUp();if(i>=0){B('✅ Computer',()=>drop(i,0),`${STREET[i][1]} has a computer`);B('❌ No computer',()=>drop(i,1),`${STREET[i][1]} has no computer`)}}}
function down(p){const v=view();
 if(v==='home'){const i=HOME.findIndex((_,q)=>inR(p,cell(q)));if(i>=0)find(i);return false}
 if(v==='open'){const i=[0,1,2].find(q=>inR(p,box3(q)));if(i!=null)open(i);return false}
 if(v==='street'){const i=STREET.findIndex((_,q)=>S.put[q]==null&&inR(p,card(q)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const k=[0,1].find(q=>inR(p,tray(q)));if(k!=null&&S.sel!=null)drop(S.sel,k)}
 return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;if(!d)return;if(Math.hypot(p.x-d.x0,p.y-d.y0)<12){S.sel=d.i;S.drag=null;tell(`${STREET[d.i][1]}: now tap a box.`);return A.redraw()}const k=[0,1].find(q=>inR(p,tray(q)));drop(k==null?null:d.i,k)}
const when=(s,test,msg)=>()=>{if(A.step===s&&test()&&(!steps[s].predict||A.pred[s]!=null))A.done(msg+A.reveal(s))};
const seq=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},got:[],bad:null,opened:[],round:0,said:null,hold:null,prog:['Spin','Wash','Add water'],mine:[],fixing:0,wrong:0,clean:0,res:'',put:[],drag:null,sel:null})};
const steps=[
{h:'Find the computers',p:'A computer follows instructions. Some have no screen! Tap the 5 computers.',task:'Find all 5',
 show:()=>{steps[0].go();seq([0,2,4,6,8].map(i=>()=>find(i)),350)},
 go:()=>{reset();tell('Tap a thing with a computer inside.');btns();S.want=when(0,()=>S.got.length>=5,'Computers hide in lots of things, not just laptops.')}},
{h:'Look inside',p:'Tap each one to open it. Is there a chip? A chip is the computer part.',predict:{q:'A torch uses a battery. Is there a computer inside?',opts:['Yes, it uses power','No, it just turns on and off'],ans:1},task:'Open all 3',
 show:()=>{steps[1].go();seq([0,1,2].map(i=>()=>open(i)),400)},
 go:()=>{reset();tell('Tap the torch to open it.');btns();S.want=when(1,()=>S.opened.length>=3,'Using power does not make it a computer. A computer has a chip that follows instructions.')}},
{h:'In and out',p:'Something goes in. The computer follows its instructions. Something comes out. Pick what comes out.',task:'Do all 3',
 show:()=>{steps[2].go();seq([()=>pick(0),()=>pick(0),()=>pick(0)],500)},
 go:()=>{reset();tell('You press Start on the microwave. What comes out?');btns();S.want=when(2,()=>S.round>=3,'In, follow the instructions, out.')}},
{h:'Only what it is told',p:'This washer has its steps in a silly order. Press Run. Then fix the steps.',predict:{q:'The steps say spin, then wash, then add water. What will the washer do?',opts:['Fix the order by itself','Do the steps in that silly order'],ans:1},task:'Get clean clothes',
 show:()=>{steps[3].go();seq([run,()=>add(0),()=>add(1),()=>add(2),run],400)},
 go:()=>{reset();tell('Press Run.');btns();S.want=when(3,()=>S.clean,'A computer does just what its steps say. People write the steps.')}},
{h:'Out in the street',p:'Drag each one to a box. Does it have a computer inside?',predict:{q:'Does a car have a computer inside?',opts:['No, just an engine','Yes, most cars do'],ans:1},task:'Sort all 6',
 show:()=>{steps[4].go();seq(STREET.map(([,,h],i)=>()=>drop(i,h?0:1)),250)},
 go:()=>{reset();tell('Drag the car to a box, or tap it, then tap a box.');btns();S.want=when(4,()=>S.put.filter(x=>x!=null).length>=STREET.length,'Computers are all around us, at home and outside.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one has a computer inside?',[['A washing machine','ok'],['A teddy','toy'],['A spoon','toy']]],
 ['Does a computer need a screen?',[['No, a washer has none','ok'],['Yes, always','screen'],['Yes, and a keyboard','screen']]],
 ['A torch uses a battery. Is it a computer?',[['No, it has no chip','ok'],['Yes, it uses power','power']]],
 ['What do all computers do?',[['Follow instructions','ok'],['Think up their own ideas','think'],['Have a keyboard','screen']]],
 ['You say "play a song" to a smart speaker. What goes in?',[['Your voice','ok'],['The song','out'],['The plug','power']]],
 ['The steps are in a silly order. What does the computer do?',[['Follows them anyway','ok'],['Fixes them','think'],['Asks a friend','think']]]];
function tip(t){let m='Think: does it follow instructions?';
 if(t==='toy')m='A teddy and a spoon cannot follow instructions. A washer can.';
 if(t==='screen')m='Lots of computers have no screen and no keyboard, like a washer.';
 if(t==='power')m='Using power is not enough. A torch has no chip to follow instructions.';
 if(t==='think')m='A computer cannot think up ideas or fix its steps. It does what people told it.';
 if(t==='out')m='The song comes out. Your voice goes in.';
 return m}
function quiz(){n++;const[q,ops]=QS[n%QS.length],rot=n%ops.length;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+wins+'.':'✗ '+tip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;btns()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});btns()}});
A.start()})})();
