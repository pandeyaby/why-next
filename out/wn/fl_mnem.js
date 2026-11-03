/* Flagship – memory tricks, mnemonics (ages 8–9, metacognition: memory strategies; EEF Metacognition and
   self-regulated learning). Decode a first-letter mnemonic for the rainbow, find that the planets mnemonic only works if
   you already know the planets (two start with M), build your own sentence for the compass points, use the "Thirty days
   has September" rhyme, and spell "because" from its sentence. Targets the ideas that a mnemonic holds the answer itself,
   that any word with the right letter will do, and that order does not matter. */
(()=>{
VIS.reg('flagmnem',c=>{let A,pads,quiz,qn=-1,run=0;const Z={};
const scene=()=>['rainbow','planets','compass','months','spell','quiz'][A.step];
const speak=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const fs=n=>Math.round(n*(A.narrow?1:1.15)),again=()=>A.redraw();
const RB={red:'#d62828',orange:'#f08a1c',yellow:'#f4c20d',green:'#2f9b47',blue:'#1d5fc4',indigo:'#3f2f9e',violet:'#9b4fc4'};
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const S={rainbow:{w:['Richard','Of','York','Gave','Battle','In','Vain'],t:['green','indigo','red','violet','orange','blue','yellow']},
 planets:{w:['My','Very','Easy','Method','Just','Speeds','Up','Naming'],t:['Mars','Sun','Venus','Neptune','Earth','Mercury','Uranus','Moon','Jupiter','Saturn'],order:['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune']},
 compass:{w:['North','East','South','West'],t:['Never','Ants','Eat','Under','Shredded','Owls','Wheat','Nice','Elves','Sing','Well']},
 months:{w:['Thirty','days','has','September,','April,','June','and','November'],t:MON},
 spell:{w:['Big','Elephants','Can','Always','Understand','Small','Elephants'],t:['u','e','a','s','b','e','c']}};
const D=()=>S[scene()];
function txt(g,s,x,y,n,colr,wt,al){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y)}
function wordBoxes(){const g=A.ctx,ws=D().w,out=[];g.font=`800 ${fs(14)}px system-ui,sans-serif`;let x=10,y=A.H*.07,lh=fs(14)*3;
 ws.forEach(w=>{const bw=Math.max(g.measureText(w).width,44)+14;if(x+bw>A.W-10){x=10;y+=lh}out.push({x,y,w:bw,h:lh-6});x+=bw+6});return out}
function tileBox(i){const n=D().t.length,cols=A.narrow?3:(n>10?6:4),top=A.H*(A.narrow?.4:.42),rows=Math.ceil(n/cols),gap=8;
 const w=(A.W-20-gap*(cols-1))/cols,h=Math.min(46,(A.H-top-12)/rows-gap);return{x:10+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function rr(g,r,f,s){A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fillStyle=f;g.fill();g.lineWidth=2;g.strokeStyle=s;g.stroke()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=scene();g.fillStyle=A.mix(K.pn,K.vi,K.dark?.05:.06);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'A mnemonic holds the order',W/2,H*.3,17,K.tx,800);txt(g,'You still need to know the words',W/2,H*.45,14);txt(g,'Say it, then test yourself',W/2,H*.6,13,K.mu);return}
 const wb=wordBoxes(),d=D(),months=v==='months';
 wb.forEach((b,i)=>{const cur=!months&&i===Z.pos;rr(g,b,cur?A.mix(K.pn,K.am,.3):A.mix(K.pn,K.tx,.05),cur?K.tx:K.ln);
  const w=d.w[i];g.font=`800 ${fs(14)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';const L=w[0],x0=b.x+b.w/2-g.measureText(w).width/2,y=b.y+b.h*.3;
  if(!months){g.fillStyle=K.rd;g.fillText(L,x0,y);g.fillStyle=K.tx;g.fillText(w.slice(1),x0+g.measureText(L).width,y)}else txt(g,w,b.x+b.w/2,y,14,K.tx,800);
  if(Z.got[i])txt(g,Z.got[i],b.x+b.w/2,b.y+b.h*.72,12,K.gr,800)});
 d.t.forEach((t,i)=>{const r=tileBox(i),used=Z.used.includes(i);rr(g,r,used?A.mix(K.pn,K.gr,.25):Z.bad===i?A.mix(K.pn,K.rd,.25):K.pn,used?K.gr:K.tx);
  if(v==='rainbow'){g.beginPath();g.arc(r.x+16,r.y+r.h/2,8,0,7);g.fillStyle=RB[t];g.fill();g.lineWidth=1.5;g.strokeStyle=K.tx;g.stroke();txt(g,t,r.x+r.w/2+8,r.y+r.h/2,13,K.tx,700)}
  else txt(g,t,r.x+r.w/2,r.y+r.h/2,v==='spell'?18:13,K.tx,v==='spell'?800:700)});
 if(Z.note)txt(g,Z.note,W/2,tileBox(0).y-14,12,K.mu,700);A.fx.draw(g)}
const oops=s=>{A.sound.miss();speak(s);again()},yay=s=>{A.sound.pop();speak(s);buttons();again();Z.want()};
function need(){const v=scene(),d=D();return v==='rainbow'?null:v==='planets'?d.order[Z.pos]:null}
function pick(i){const v=scene(),d=D(),t=d.t[i];if(v==='quiz'||Z.done||Z.used.includes(i))return;Z.bad=-1;
 if(v==='months'){const ok=['April','June','September','November'].includes(t);if(!ok){Z.bad=i;return oops(t==='February'?'February is the odd one: 28 days, or 29 in a leap year. It is not in the rhyme.':`${t} is not in the rhyme, so it has 31 days.`)}
  Z.used.push(i);A.sound.tick();if(Z.used.length===4){Z.done=1;return yay('April, June, September and November have 30 days. The rhyme held all four for you.')}speak(`${t}: 30 days. ${4-Z.used.length} more.`);buttons();return again()}
 const w=d.w[Z.pos],L=w[0].toLowerCase(),first=t[0].toLowerCase();let ok=first===L,why='';
 if(v==='planets'){ok=t===need();if(!ok)why=first!==L?`${w} starts with ${w[0]}. Find the planet that starts with ${w[0]}.`:t==='Moon'||t==='Sun'?`The ${t} starts with ${w[0]}, but it is not a planet. The trick gives the letter; you have to know the planets.`:`${t} starts with M too, but Mercury is closest to the Sun, so it comes first. The trick only holds the letter.`}
 else if(!ok)why=v==='spell'?(Z.pos===3&&first==='u'?'Always comes before Understand, so a comes before u: b-e-c-a-u-s-e.':`${w} starts with ${w[0]}, so the next letter is ${w[0].toLowerCase()}.`):v==='compass'?`${w} needs a word starting with ${w[0]}. ${t} starts with ${t[0]}.`:`${w} starts with ${w[0]}. Find the colour that starts with ${w[0]}.`;
 if(!ok){Z.bad=i;return oops(why)}
 Z.used.push(i);Z.got[Z.pos]=t;Z.pos++;A.sound.tick();
 if(Z.pos>=d.w.length){Z.done=1;return yay(v==='rainbow'?'Red, orange, yellow, green, blue, indigo, violet. The sentence kept them in order.':v==='planets'?'Mercury to Neptune, in order from the Sun. You needed the trick and your planet facts.':v==='compass'?`${Z.got.join(' ')}: your own sentence for North, East, South, West, going clockwise.`:'b-e-c-a-u-s-e. Each word gave one letter, in order.')}
 speak(`${t}. Next: ${d.w[Z.pos]}.`);buttons();again()}
function buttons(){if(!pads)return;pads.innerHTML='';if(scene()==='quiz'||Z.done)return;D().t.forEach((t,i)=>{if(Z.used.includes(i))return;const b=c.el('button',{type:'button',class:'lbtn ghost sm'},pads,t);b.onclick=()=>pick(i)})}
function down(p){if(scene()==='quiz')return false;D().t.forEach((t,i)=>{if(hit(p,tileBox(i)))pick(i)});return false}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++Z.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===Z.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const byName=names=>names.map(n=>()=>pick(D().t.indexOf(n)));
const fresh=()=>{const t=(Z.tok||0)+1;Object.keys(Z).forEach(k=>delete Z[k]);Object.assign(Z,{tok:t,want:()=>{},pos:0,used:[],got:[],bad:-1,done:0,note:''})};
const go=(n,say,note,msg)=>()=>{fresh();Z.note=note;speak(say);buttons();Z.want=ok(n,()=>Z.done,msg)};
const steps=[
{h:'Decode the rainbow',p:'Each word gives the first letter of a colour. Tap the colours in order.',task:'Decode all 7 words',
 show:()=>{steps[0].go();seq(byName(['red','orange','yellow','green','blue','indigo','violet']),350)},
 go:go(0,'Richard Of York Gave Battle In Vain. Tap the colour for each word.','Tap the colour for the boxed word','First letters, in order.')},
{h:'A cue, not the answer',p:'This sentence holds the planets, from the Sun outwards. Two words start with M.',predict:{q:'My and Method both start with M. How do you know which is Mercury?',opts:['You must know the planets too','The sentence tells you','Either one is fine'],ans:0},task:'Decode the 8 planets',
 show:()=>{steps[1].go();seq(byName(S.planets.order),350)},
 go:go(1,'My Very Easy Method Just Speeds Up Naming. Tap the planet for each word.','Tap the planet for the boxed word','The trick holds the letters; you hold the facts.')},
{h:'Make your own',p:'Make a sentence for North, East, South, West. Pick a word with the right first letter.',task:'Build a 4-word sentence',
 show:()=>{steps[2].go();seq(byName(['Never','Eat','Shredded','Wheat']),450)},
 go:go(2,'North, East, South, West. Build a sentence: each word starts with the right letter.','Any word with the right letter works','A silly sentence is easy to remember.')},
{h:'A rhyme',p:'Thirty days has September, April, June and November. Tap the months with 30 days.',predict:{q:'Which of these has 30 days?',opts:['June','July','August'],ans:0},task:'Find the 4 months with 30 days',
 show:()=>{steps[3].go();seq(byName(['April','June','September','November']),450)},
 go:go(3,'The rhyme: Thirty days has September, April, June and November. Tap the 30-day months.','Tap the months named in the rhyme','Rhyme and rhythm hold a list.')},
{h:'Spell it',p:'Big Elephants Can Always Understand Small Elephants. Tap a letter for each word.',predict:{q:'In because, which letter comes after c?',opts:['a','u','e'],ans:0},task:'Spell because',
 show:()=>{steps[4].go();seq(byName(['b','e','c','a','u','s']).concat([()=>pick(D().t.findIndex((t,i)=>t==='e'&&!Z.used.includes(i)))]),350)},
 go:go(4,'Big Elephants Can Always Understand Small Elephants. Tap the first letter of each word.','Tap the first letter of the boxed word','The sentence fixes the tricky a-u.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
const QS=[['In "Richard Of York Gave Battle In Vain", what does Gave stand for?',[['Green','ok'],['Grey','grey'],['Gold','gold']]],
 ['A mnemonic gives you first letters. What else do you need?',[['To know the words already','ok'],['Nothing else','nothing'],['A longer sentence','longer']]],
 ['Which month has 30 days?',[['November','ok'],['October','oct'],['February','feb']]],
 ['Big Elephants Can Always Understand Small Elephants spells…',[['because','ok'],['becuase','swap'],['beacuse','swap2']]],
 ['Which is a mnemonic for North, East, South, West, in that order?',[['Naughty Elephants Squirt Water','ok'],['Elephants Never Squirt Water','order'],['Nice Owls Sing Well','letter']]],
 ['When does a mnemonic help most?',[['Remembering a list in order','ok'],['Understanding why something happens','why'],['Doing a new kind of sum','new']]]];
function why(t){let m='A mnemonic holds first letters in order.';
 if(t==='grey')m='Grey is not in the rainbow. The trick gives G; knowing the rainbow gives green.';
 if(t==='gold')m='Gold is not a rainbow colour. G here is green, between yellow and blue.';
 if(t==='nothing')m='The trick only gives a letter. If you never learned indigo, the I will not help.';
 if(t==='longer')m='Longer is harder to remember. You need to know the words the letters stand for.';
 if(t==='oct')m='October is not in the rhyme, so it has 31 days.';
 if(t==='feb')m='February has 28 days, or 29 in a leap year. It is the odd one out.';
 if(t==='swap')m='Always comes before Understand, so it is a then u: because.';
 if(t==='swap2')m='Can comes before Always, so it is c then a: because.';
 if(t==='order')m='The order is North first. Elephants Never... starts with E, so it gives East first.';
 if(t==='letter')m='Owls starts with O, but the second point is East. You need an E word.';
 if(t==='why')m='A mnemonic holds a list. To understand why, you need to think it through.';
 if(t==='new')m='A mnemonic stores things you already know. A new kind of sum needs a method.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);again()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(right?'Yes! In a row: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down});buttons()}});
A.start()})})();
