/* Flagship: Combustion of fuels (ages 13–15; AQA GCSE Chemistry 4.7.1.3 and 4.9.3.1, KS3 chemical reactions; NHS and HSE on carbon
   monoxide). Turn a Bunsen collar from yellow to blue flame and read off the products; balance CH₄ + 2O₂ → CO₂ + 2H₂O
   atom by atom; cut the oxygen for two CH₄ from 4 O₂ to 3 to 2 and watch CO₂ become CO and then C (soot); let CO from a
   blocked flue take the oxygen seats on red blood cells until the alarm sounds; test the products with a cold beaker and
   limewater. Not flagalktr (alkane trends), flagalk (alkane structure) or reactlab (reaction types). */
(()=>{
VIS.reg('flagburn',c=>{let A,pad,quizBox,item=-1,run=0;const S={};
const mode=()=>['air','bal','lean','co','test','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function say(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||650} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const f1=()=>A.narrow?14:17,f2=()=>A.narrow?18:22;
/* atoms: carbon dark grey, hydrogen white, oxygen red, all outlined so they read in both themes */
const AT={C:['#374151',.9],H:['#f8fafc',.62],O:['#dc2626',.82]};
function atom(k,x,y,r){const g=A.ctx;g.fillStyle=AT[k][0];g.beginPath();g.arc(x,y,r*AT[k][1],0,7);g.fill();g.strokeStyle=A.col.dark?'#e5e7eb':'#111827';g.lineWidth=1.5;g.stroke()}
const SHAPE={CH4:[['C',0,0],['H',-1,-1],['H',1,-1],['H',-1,1],['H',1,1]],O2:[['O',-.55,0],['O',.55,0]],CO2:[['O',-1.05,0],['C',0,0],['O',1.05,0]],H2O:[['O',0,0],['H',-.8,.6],['H',.8,.6]],CO:[['C',-.5,0],['O',.5,0]],C:[['C',0,0]]};
function mol(k,x,y,r){for(const[a,dx,dy]of SHAPE[k])atom(a,x+dx*r*.85,y+dy*r*.7,r*.55)}
/* 1: Bunsen burner; S.air 0 (collar shut) … 1 (open) */
const trackX=()=>A.W*.08,trackW=()=>A.W*.44,trackY=()=>A.H*.87;
function burner(){const g=A.ctx,C=A.col,bx=A.W*.3,base=A.H*.8,a=S.air,t=performance.now()/1000;
 g.fillStyle='#6b7280';g.fillRect(bx-40,base,80,12);g.fillStyle='#9ca3af';g.fillRect(bx-9,base-A.H*.28,18,A.H*.28);
 g.fillStyle='#4b5563';g.fillRect(bx-12,base-A.H*.1,24,18);g.fillStyle=A.mix('#111827','#f8fafc',a);g.fillRect(bx-5,base-A.H*.1+4,10*Math.max(.15,a),10);
 const top=base-A.H*.28,hgt=A.H*(.34-.12*a),wob=Math.sin(t*9)*(1-a)*4,yel=A.mix('#3b82f6','#f59e0b',1-a);
 g.fillStyle=A.alpha(yel,.85);g.beginPath();g.moveTo(bx-12,top);g.quadraticCurveTo(bx-22+wob,top-hgt*.5,bx+wob,top-hgt);g.quadraticCurveTo(bx+22+wob,top-hgt*.5,bx+12,top);g.fill();
 if(a>.5){g.fillStyle=A.alpha('#1d4ed8',a);g.beginPath();g.moveTo(bx-7,top);g.lineTo(bx,top-hgt*.45);g.lineTo(bx+7,top);g.fill()}
 for(const p of S.soot){g.fillStyle=A.alpha('#1f2937',.6*(1-p.age));g.beginPath();g.arc(p.x,p.y,3,0,7);g.fill()}
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(trackX(),trackY());g.lineTo(trackX()+trackW(),trackY());g.stroke();
 g.fillStyle=C.ac;g.beginPath();g.arc(trackX()+trackW()*a,trackY(),A.narrow?12:14,0,7);g.fill();say('air hole: shut',trackX(),trackY()+22,A.narrow?12:13,{al:'left'});say('open',trackX()+trackW(),trackY()+22,A.narrow?12:13,{al:'right'});
 const px=A.W*.55,sm=A.narrow?13:16;say(a>.7?'Blue, roaring flame':a>.35?'Mixed flame':'Yellow, smoky flame',A.W/2,A.H*.06,f2(),{w:800,ink:a>.7?(C.dark?'#93c5fd':'#1d4ed8'):C.or});
 const prods=a>.7?[['CO₂','carbon dioxide'],['H₂O','water']]:a>.35?[['CO₂','carbon dioxide'],['CO','carbon monoxide'],['H₂O','water']]:[['CO','carbon monoxide'],['C','soot (carbon)'],['H₂O','water']];
 say('Products:',px,A.H*.2,sm,{al:'left',w:800});prods.forEach(([f,n],i)=>say(`${f}  ${n}`,px,A.H*(.28+i*.08),sm,{al:'left',ink:f==='CO'||f==='C'?C.rd:C.tx}))}
/* 2: balance one CH₄ */
function rowOf(k,n,x0,y,r){for(let i=0;i<n;i++)mol(k,x0+i*r*2.3,y,r)}
function count(){return{L:{C:1,H:4,O:2*S.o2},R:{C:1,H:2*S.h2o,O:2+S.h2o}}}
function drawBal(){const r=A.narrow?11:16,y=A.H*.3,C=A.col,n=count();say(`CH₄ + ${S.o2} O₂  →  CO₂ + ${S.h2o} H₂O`,A.W/2,A.H*.08,f2(),{w:800});
 mol('CH4',A.W*.08,y,r);rowOf('O2',S.o2,A.W*.19,y,r);say('→',A.W*.5,y,f2(),{w:900});mol('CO2',A.W*.6,y,r);rowOf('H2O',S.h2o,A.W*.7,y,r);
 const ty=A.H*.52;['C','H','O'].forEach((k,i)=>{const ok=n.L[k]===n.R[k],yy=ty+i*A.H*.1;say(k,A.W*.2,yy,f1(),{w:900});say(`left ${n.L[k]}`,A.W*.42,yy,f1());say(`right ${n.R[k]}`,A.W*.66,yy,f1());say(ok?'✓':'✗',A.W*.85,yy,f2(),{w:900,ink:ok?C.gr:C.rd})});
 [['+ O₂',.12],['+ H₂O',.62]].forEach(([t,x])=>{const g=A.ctx;g.fillStyle=A.alpha(C.ac,.14);A.paint.rrect(A.W*x,A.H*.84,A.W*.26,A.H*.1,10);g.fill();g.strokeStyle=C.ac;g.lineWidth=2;g.stroke();say(t,A.W*(x+.13),A.H*.89,f1(),{w:800})})}
/* 3: two CH₄ with 4, 3 or 2 O₂ */
const LEAN={4:['2CH₄ + 4O₂ → 2CO₂ + 4H₂O','complete: carbon dioxide',['CO2','CO2']],3:['2CH₄ + 3O₂ → 2CO + 4H₂O','incomplete: carbon monoxide',['CO','CO']],2:['2CH₄ + 2O₂ → 2C + 4H₂O','incomplete: soot (carbon)',['C','C']]};
function drawLean(){const r=A.narrow?13:16,C=A.col,[eq,word,carb]=LEAN[S.ox];say(eq,A.W/2,A.H*.1,f2(),{w:800});say(word,A.W/2,A.H*.2,f1(),{w:800,ink:S.ox===4?C.gr:C.rd});
 mol('CH4',A.W*.1,A.H*.38,r);mol('CH4',A.W*.1,A.H*.55,r);for(let i=0;i<S.ox;i++)mol('O2',A.W*(.24+(i%2)*.1),A.H*(.38+Math.floor(i/2)*.17),r);say('→',A.W*.5,A.H*.46,f2(),{w:900});
 carb.forEach((k,i)=>mol(k,A.W*.64,A.H*(.38+i*.17),r));for(let i=0;i<4;i++)mol('H2O',A.W*(.8+(i%2)*.1),A.H*(.38+Math.floor(i/2)*.17),r*.85);
 const g=A.ctx,x0=A.W*.15,w=A.W*.7,y=A.H*.82;g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x0+w,y);g.stroke();[2,3,4].forEach(k=>{const x=x0+(k-2)/2*w;say(`${k} O₂`,x,y+22,f1(),{w:k===S.ox?900:600});if(S.seen.includes(k))say('•',x,y-18,f2(),{ink:C.gr})});
 g.fillStyle=C.ac;g.beginPath();g.arc(x0+(S.ox-2)/2*w,y,A.narrow?12:14,0,7);g.fill()}
/* 4: red blood cells with oxygen seats; CO grabs them and does not let go */
const cellAt=i=>({x:A.W*(.14+(i%3)*.17),y:A.H*(.42+Math.floor(i/3)*.24)});
function drawCO(){const g=A.ctx,C=A.col,r=A.narrow?24:30;say(`CO in the room: ${S.co}`,A.W*.75,A.H*.61,A.narrow?13:16,{w:800});
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(A.W*.62,A.H*.2,A.W*.26,A.H*.36);say('boiler',A.W*.75,A.H*.27,A.narrow?12:13);say(S.co?'flue blocked':'flue clear',A.W*.75,A.H*.5,A.narrow?12:13,{ink:S.co?C.rd:C.gr});
 const al=S.co>=3;g.fillStyle=al?'#b91c1c':A.mix(C.pn,'#9ca3af',.5);A.paint.rrect(A.W*.64,A.H*.69,A.W*.22,A.H*.12,10);g.fill();say(al?'CO ALARM!':'CO alarm',A.W*.75,A.H*.75,f1(),{w:900,ink:al?'#ffffff':C.tx});
 for(let i=0;i<6;i++){const p=cellAt(i);g.fillStyle='#b91c1c';g.beginPath();g.ellipse(p.x,p.y,r,r*.7,0,0,7);g.fill();
  const k=i<S.co*2?'CO':'O2';g.fillStyle='#fef2f2';g.beginPath();g.ellipse(p.x,p.y,r*.62,r*.42,0,0,7);g.fill();mol(k,p.x,p.y,A.narrow?10:12)}
 say(`Cells carrying O₂: ${Math.max(0,6-S.co*2)} of 6`,A.W*.31,A.H*.2,A.narrow?13:16,{w:800})}
/* 5: product tests */
function drawTest(){const g=A.ctx,C=A.col;say('Burn methane, then test what comes off',A.W/2,A.H*.08,f1(),{w:800});
 g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(A.W*.12,A.H*.22,A.W*.3,A.H*.36);say('cold beaker',A.W*.27,A.H*.66,f1());
 if(S.beaker)for(let i=0;i<9;i++){g.fillStyle='#38bdf8';g.beginPath();g.arc(A.W*(.15+(i%5)*.055),A.H*(.27+Math.floor(i/5)*.08),4,0,7);g.fill()}
 g.fillStyle=S.lime?'#e5e7eb':A.alpha('#bae6fd',.4);g.fillRect(A.W*.58,A.H*.32,A.W*.28,A.H*.26);g.strokeRect(A.W*.58,A.H*.22,A.W*.28,A.H*.36);say(S.lime?'milky':'clear',A.W*.72,A.H*.45,f1(),{w:800,ink:S.lime?'#0f172a':C.tx});say('limewater',A.W*.72,A.H*.66,f1());
 say(S.beaker?'Droplets: water (H₂O)':'',A.W/2,A.H*.77,f1(),{w:800,ink:C.gr});say(S.lime?'Milky: carbon dioxide (CO₂)':'',A.W/2,A.H*.87,f1(),{w:800,ink:C.gr})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#fff7ed',C.dark?.04:.4);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({air:burner,bal:drawBal,lean:drawLean,co:drawCO,test:drawTest}[mode()]||(()=>say(S.q?'Complete or incomplete?':'',Q.W/2,Q.H*.45,f2(),{w:800})))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{air:0,soot:[],o2:1,h2o:1,ox:4,seen:[4],co:0,beaker:false,lime:false,grab:false,q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):380*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
function setAir(a){S.air=Math.max(0,Math.min(1,a));A.redraw();
 after(S.air>.7?'Air hole open: plenty of oxygen. Complete combustion makes carbon dioxide and water, with a hot blue flame.':S.air>.35?'Half open: some carbon monoxide forms as well as carbon dioxide.':'Air hole shut: not enough oxygen. Incomplete combustion makes carbon monoxide and soot. The yellow glow is hot soot.')}
function bal(k,d){if(k==='o')S.o2=Math.max(1,Math.min(4,S.o2+d));else S.h2o=Math.max(1,Math.min(4,S.h2o+d));A.sound.tick();const n=count(),ok=['C','H','O'].every(x=>n.L[x]===n.R[x]);
 after(ok?'Balanced: CH₄ + 2O₂ → CO₂ + 2H₂O. 1 C, 4 H and 4 O on each side.':n.L.H!==n.R.H?`Hydrogen: ${n.L.H} on the left, ${n.R.H} on the right. Each H₂O holds 2 H.`:`Oxygen: ${n.L.O} on the left, ${n.R.O} on the right. Count the O in CO₂ and in every H₂O.`)}
function setOx(k){k=Math.max(2,Math.min(4,k));if(k===S.ox&&S.seen.includes(k))return;S.ox=k;if(!S.seen.includes(k))S.seen.push(k);k===4?A.sound.pop():A.sound.miss();
 after(k===4?'4 O₂: enough oxygen. Every carbon ends up in CO₂.':k===3?'3 O₂: not enough. Each carbon gets only one oxygen, so carbon monoxide forms.':'2 O₂: even less. The oxygen goes to the hydrogen and the carbon is left as soot.')}
function addCO(){if(S.co>=3)return;S.co++;A.sound.miss();
 after(S.co>=3?'The alarm sounds. CO has taken every oxygen seat, and you could not see or smell it. Get out into fresh air.':`CO grabs the oxygen seats on ${S.co*2} cells and does not let go. Nobody in the room can see or smell it.`)}
function test(k){S[k]=true;A.sound.pop();after(k==='beaker'?'Droplets form on the cold beaker: burning makes water vapour, which condenses.':'The limewater turns milky: burning makes carbon dioxide.')}
function keys(){if(!pad)return;pad.innerHTML='';const k=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='air'){b('Open the air hole',()=>setAir(S.air+.25));b('Close the air hole',()=>setAir(S.air-.25))}
 if(k==='bal'){b('+ O₂',()=>bal('o',1),'Add an oxygen molecule');b('− O₂',()=>bal('o',-1),'Remove an oxygen molecule');b('+ H₂O',()=>bal('h',1),'Add a water molecule');b('− H₂O',()=>bal('h',-1),'Remove a water molecule')}
 if(k==='lean'){[4,3,2].forEach(n=>b(`${n} O₂`,()=>setOx(n),`Give two methane molecules ${n} oxygen molecules`))}
 if(k==='co'&&S.co<3)b('Let CO in',addCO,'Let carbon monoxide from the blocked flue into the room');
 if(k==='test'){if(!S.beaker)b('Hold a cold beaker over it',()=>test('beaker'));if(!S.lime)b('Bubble gas through limewater',()=>test('lime'))}}
const inR=(p,x,y,w,h)=>p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h;
function down(p){const k=mode();
 if(k==='air'){if(Math.abs(p.y-trackY())>A.H*.12)return false;S.grab=true;setAir((p.x-trackX())/trackW());return true}
 if(k==='bal'){if(inR(p,A.W*.12,A.H*.84,A.W*.26,A.H*.1)){bal('o',1);return true}if(inR(p,A.W*.62,A.H*.84,A.W*.26,A.H*.1)){bal('h',1);return true}return false}
 if(k==='lean'){if(Math.abs(p.y-A.H*.82)>A.H*.12)return false;S.grab=true;setOx(Math.round((p.x-A.W*.15)/(A.W*.35))+2);return true}
 if(k==='co'){if(inR(p,A.W*.6,A.H*.15,A.W*.3,A.H*.45)){addCO();return true}return false}
 if(k==='test'){if(inR(p,A.W*.1,A.H*.2,A.W*.34,A.H*.42)){test('beaker');return true}if(inR(p,A.W*.56,A.H*.2,A.W*.32,A.H*.42)){test('lime');return true}}return false}
function move(p){if(!S.grab)return;const k=mode();if(k==='air')setAir((p.x-trackX())/trackW());if(k==='lean')setOx(Math.round((p.x-A.W*.15)/(A.W*.35))+2)}
function up(){S.grab=false}
const steps=[
{h:'Blue flame or yellow flame?',p:'A Bunsen burner burns methane, a hydrocarbon. The collar opens an air hole that lets oxygen in. Slide it and read the products.',
 predict:{q:'You close the air hole. What happens to the flame?',opts:['It turns blue and hotter','It turns yellow and smoky','It goes out at once'],ans:1},
 task:'Open the air hole fully for complete combustion',show:()=>auto(0,[()=>setAir(.25),()=>setAir(.5),()=>setAir(.75),()=>setAir(1)]),
 go:()=>{fresh();tell('A Bunsen burner with the air hole shut: a yellow, smoky flame.');keys();S.ok=finishIf(0,()=>S.air>=.99,'Plenty of oxygen: CO₂ and H₂O only, and no soot.')}},
{h:'Balance the methane',p:'Complete combustion: methane + oxygen → carbon dioxide + water. Add molecules until every atom on the left is on the right.',
 predict:{q:'How many O₂ molecules does one CH₄ need to burn completely?',opts:['1','2','4'],ans:1},
 task:'Balance CH₄ + O₂ → CO₂ + H₂O',show:()=>auto(1,[()=>bal('h',1),()=>bal('o',1)]),
 go:()=>{fresh();tell('CH₄ + O₂ → CO₂ + H₂O, not balanced yet.');keys();S.ok=finishIf(1,()=>S.o2===2&&S.h2o===2,'CH₄ + 2O₂ → CO₂ + 2H₂O.')}},
{h:'Starve it of oxygen',p:'Two methane molecules need 4 O₂ to burn completely. Give them less and see where the carbon ends up.',
 predict:{q:'With less oxygen, which new products form?',opts:['More carbon dioxide','Carbon monoxide and soot','Hydrogen gas'],ans:1},
 task:'Try 4, 3 and 2 O₂',show:()=>auto(2,[()=>setOx(3),()=>setOx(2)]),
 go:()=>{fresh();tell('2CH₄ + 4O₂ → 2CO₂ + 4H₂O. Slide to give less oxygen.');keys();S.ok=finishIf(2,()=>[2,3,4].every(k=>S.seen.includes(k)),'Less oxygen: CO₂, then CO, then C. Water still forms each time.')}},
{h:'Why CO kills',p:'A boiler with a blocked flue burns gas without enough air. Each red blood cell has seats that carry oxygen. Let the CO in.',
 predict:{q:'Why do homes need a CO alarm?',opts:['CO smells strongly, so people leave','CO has no colour or smell','CO is only made by cars'],ans:1},
 task:'Let CO in until the alarm sounds',show:()=>auto(3,[addCO,addCO,addCO]),
 go:()=>{fresh();tell('Six red blood cells, each carrying oxygen. A boiler and a CO alarm.');keys();S.ok=finishIf(3,()=>S.co>=3,'CO binds to haemoglobin about 200 times more strongly than oxygen, so blood carries less oxygen.')}},
{h:'Test the products',p:'Burn methane with plenty of air. Hold a cold beaker over the flame, then bubble the gas through limewater.',
 task:'Run both tests',show:()=>auto(4,[()=>test('beaker'),()=>test('lime')]),
 go:()=>{fresh();tell('A cold beaker and a tube of clear limewater.');keys();S.ok=finishIf(4,()=>S.beaker&&S.lime,'Water and carbon dioxide: the products of complete combustion.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['What are the products of complete combustion of methane?','Carbon dioxide and water',[['Carbon monoxide and water','oxygen'],['Carbon dioxide and hydrogen','hydrogen']]],
 ['A gas fire burns with a yellow, sooty flame. What does that show?','Not enough oxygen: incomplete combustion',[['It is burning hotter','hot'],['It is burning completely','oxygen']]],
 ['CH₄ + ?O₂ → CO₂ + 2H₂O. What is ?','2',[['1','balance'],['4','balance']]],
 ['Why is a carbon monoxide alarm needed?','CO has no colour or smell',[['CO smells of gas','smell'],['CO makes thick black smoke','smell']]],
 ['How does carbon monoxide harm you?','It stops your blood carrying oxygen',[['It burns your lungs like an acid','co'],['It is only harmful as soot','co']]],
 ['Propane burns completely: C₃H₈ + 5O₂ → 3CO₂ + ?H₂O. What is ?','4',[['8','balance'],['2','balance']]]];
function why(tag){let m='Ask: is there enough oxygen for every carbon to become CO₂?';
 if(tag==='oxygen')m='CO forms when there is not enough oxygen. With plenty of oxygen every carbon becomes CO₂.';
 if(tag==='hydrogen')m='The hydrogen in a hydrocarbon joins oxygen to make water, not hydrogen gas.';
 if(tag==='hot')m='A yellow flame is cooler. The yellow is glowing soot, a sign of incomplete combustion.';
 if(tag==='balance')m='Count each atom on both sides. Every H₂O holds 2 H and 1 O, and every CO₂ holds 2 O.';
 if(tag==='smell')m='CO is colourless and odourless. The gas smell is added to the fuel, not to CO, so only an alarm can warn you.';
 if(tag==='co')m='CO binds to haemoglobin in red blood cells far more strongly than oxygen, so the blood carries less oxygen.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Combustion controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});A.every(dt=>{if(mode()!=='air')return false;if(S.air<.5&&Math.random()<(.5-S.air)*.6)S.soot.push({x:A.W*.3+(Math.random()-.5)*20,y:A.H*.4,age:0});
 for(const p of S.soot){p.age+=dt*.6;p.y-=dt*40}S.soot=S.soot.filter(p=>p.age<1);return S.air<.99});keys()}});
A.start()})})();
