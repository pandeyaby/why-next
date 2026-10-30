/* Flagship – plants need water and light (ages 3–4): water a pot plant only when the soil is dry and keep it healthy for
   5 days; fix droopy and pale plants by reading the clue (dry soil or a dark cupboard); grow two seedlings, one in a
   cupboard, and find that tall is not healthy; move a lamp and watch the plant lean to the light; sort what a plant needs. */
(()=>{
const FIX=['dry','dark','dry'],NEEDS=[['Water',1],['Sweets',0],['Light',1],['A toy',0],['Warmth',1],['Fizzy juice',0]],SIDES=[-1,1];
VIS.reg('flagsprout',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},r:0,won:0,wet:1,ok:0,droop:.4,day:0,lamp:0,lean:0,ni:0,sorted:[],tip:-1,grab:null,can:null,msg:''}),S=B0();
const mode=()=>['water','fix','dark','lean','needs','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function pot(g,x,y,s,wet){g.fillStyle='#b45309';g.beginPath();g.moveTo(x-s*.9,y);g.lineTo(x+s*.9,y);g.lineTo(x+s*.65,y+s*1.1);g.lineTo(x-s*.65,y+s*1.1);g.closePath();g.fill();
 g.fillStyle=wet>1?'#3f2a1d':wet>0?'#6b4a32':'#c9a77c';g.fillRect(x-s*.85,y-s*.12,s*1.7,s*.2);if(wet<=0){g.strokeStyle='#7c5a3a';g.lineWidth=2;g.beginPath();g.moveTo(x-s*.4,y-s*.1);g.lineTo(x-s*.2,y+s*.06);g.lineTo(x,y-s*.08);g.moveTo(x+s*.2,y-s*.1);g.lineTo(x+s*.4,y+s*.05);g.stroke()}}
/* stem from the pot rim: tall = height in s, lean -1..1 bends the top sideways, droop 0..1 folds it over, pale 0..1 turns leaves yellow */
function plant(g,x,y,s,o){const tall=o.tall||2.4,lean=o.lean||0,dr=o.droop||0,pale=o.pale||0,thin=o.thin||1,leaf=A.mix('#16a34a','#e5e07a',pale);
 const tx=x+lean*s*1.1+dr*s*.9,ty=y-tall*s*(1-dr*.45),cx=x+lean*s*.2,cy=y-tall*s*.6;g.strokeStyle=A.mix('#15803d','#d9d36a',pale);g.lineWidth=Math.max(2,s*.16*thin);g.lineCap='round';
 g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(cx,cy,tx,ty);g.stroke();
 [[.45,-1],[.7,1],[1,0]].forEach(([t,side])=>{const px=(1-t)*(1-t)*x+2*(1-t)*t*cx+t*t*tx,py=(1-t)*(1-t)*y+2*(1-t)*t*cy+t*t*ty,a=side?(side<0?Math.PI*.85:Math.PI*.15)+dr*side*-.9*-1:-Math.PI/2+lean*.6+dr*1.6;
  g.save();g.translate(px,py);g.rotate(side?(side<0?-2.6:-.5)+dr*(side<0?-.9:.9):a);g.fillStyle=leaf;g.beginPath();g.ellipse(s*.42*thin,0,s*.45*thin,s*.2*thin,0,0,7);g.fill();g.restore()});pot(g,x,y,s,o.wet==null?1:o.wet)}
function sun(g,x,y,r){g.fillStyle='#facc15';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#f59e0b';g.lineWidth=3;for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.25,y+Math.sin(a)*r*1.25);g.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6);g.stroke()}}
function can(g,x,y,s){g.fillStyle='#2563eb';A.paint.rrect(x-s*.5,y-s*.35,s,s*.7,6);g.fill();g.strokeStyle='#2563eb';g.lineWidth=s*.12;g.beginPath();g.moveTo(x+s*.45,y-s*.1);g.lineTo(x+s*.95,y-s*.45);g.stroke();txt(g,'💧',x,y,13)}
const S0=()=>Math.min(A.W/7,A.H/6.5),canHome=()=>({x:A.W*.82,y:A.H*.3});
function drawWater(g){const{W,H}=A,s=S0(),dry=S.wet<=0;sun(g,W*.14,H*.14,s*.3);plant(g,W*.45,H*.7,s,{droop:S.droop,wet:S.wet});
 const p=S.can||canHome();can(g,p.x,p.y,s*.9);txt(g,`Day ${S.day}  ·  soil: ${S.wet>=2?'wet':dry?'dry':'damp'}`,W/2,H*.9,15);txt(g,`Healthy days: ${S.ok} of 5`,W*.62,H*.08,14)}
function drawFix(g){const{W,H}=A,C=A.col,s=S0(),k=FIX[Math.min(S.r,2)];g.fillStyle=k==='dark'?'#1f2937':A.alpha('#facc15',.25);A.paint.rrect(W*.22,H*.04,W*.56,H*.8,16);g.fill();
 if(k==='dark')txt(g,'cupboard',W/2,H*.12,13,'#f9fafb');else sun(g,W*.7,H*.15,s*.25);plant(g,W/2,H*.68,s,{droop:k==='dry'?.9:.15,pale:k==='dark'?.9:0,thin:k==='dark'?.7:1,tall:k==='dark'?2.9:2.3,wet:k==='dry'?0:2});
 [['💧 Water',W*.11],['☀ Window',W*.89]].forEach(([t,x],i)=>{g.fillStyle=A.alpha(S.tip===i?C.rd:i?C.am:C.ac,.2);A.paint.rrect(x-W*.1,H*.35,W*.2,H*.3,12);g.fill();txt(g,t.split(' ')[0],x,H*.45,20);txt(g,t.split(' ')[1],x,H*.57,12)})}
function drawDark(g){const{W,H}=A,C=A.col,s=S0()*.85,d=S.day,gr=Math.min(d,5)/5;g.fillStyle=A.alpha('#facc15',.25);A.paint.rrect(8,H*.12,W/2-14,H*.74,14);g.fill();g.fillStyle='#1f2937';A.paint.rrect(W/2+6,H*.12,W/2-14,H*.74,14);g.fill();
 txt(g,'window',W*.25,H*.19,13);txt(g,'cupboard',W*.75,H*.19,13,'#f9fafb');plant(g,W*.25,H*.68,s,{tall:.6+gr*1.6,pale:0,wet:1});plant(g,W*.75,H*.68,s,{tall:.6+gr*2.6,pale:gr*.95,thin:1-gr*.45,droop:gr*.25,wet:1});
 [0,1].forEach(i=>{if(S.tip===i){g.strokeStyle=C.rd;g.lineWidth=4;A.paint.rrect(i?W/2+6:8,H*.12,W/2-14,H*.74,14);g.stroke()}});txt(g,d>=5?'Day 5. Which plant is healthy? Tap it.':`Day ${d} of 5`,W/2,H*.06,15)}
function drawLean(g){const{W,H}=A,s=S0(),lx=W/2+S.lamp*W*.36;g.fillStyle='#fde047';g.beginPath();g.arc(lx,H*.2,s*.32,0,7);g.fill();if(S.lamp){g.strokeStyle=A.col.tx;g.lineWidth=3;g.beginPath();g.moveTo(lx,H*.2+s*.32);g.lineTo(lx,H*.85);g.stroke()}
 plant(g,W/2,H*.75,s,{lean:S.lean,tall:2.2});const t=SIDES[Math.min(S.r,1)];txt(g,`Make it lean ${t<0?'left':'right'}. Day ${S.day}`,W/2,H*.06,15)}
function drawNeeds(g){const{W,H}=A,C=A.col,it=NEEDS[S.ni];if(it){A.paint.rrect(W*.2,H*.05,W*.6,H*.17,14);g.fillStyle=A.alpha(C.gr,.18);g.fill();txt(g,it[0],W/2,H*.135,17)}
 const bw=(W-30)/2,bh=H*.62;[['A plant needs it',C.gr],['Not needed',C.rd]].forEach(([t,col],i)=>{const x=10+i*(bw+10);g.fillStyle=A.alpha(S.tip===i?C.rd:col,S.tip===i?.3:.12);A.paint.rrect(x,H*.32,bw,bh,14);g.fill();txt(g,t,x+bw/2,H*.32+fs(18),13);
  S.sorted.filter(j=>NEEDS[j][1]===(1-i)).forEach((j,n)=>txt(g,NEEDS[j][0],x+bw/2,H*.32+fs(48)+n*fs(24),12))})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){plant(g,W/2,H*.7,S0(),{});return}
 if(S.won>=lastN()){txt(g,doneText(),W/2,H/2,15);return A.fx.draw(g)}
 ({water:drawWater,fix:drawFix,dark:drawDark,lean:drawLean,needs:drawNeeds})[v](g);A.fx.draw(g)}
const lastN=()=>({water:1,fix:3,dark:1,lean:2,needs:1}[mode()]||9);
function doneText(){return{water:'Water when the soil is dry. Not too much.',fix:'Dry soil? Water. Pale in the dark? Light.',dark:'Tall and pale is not healthy. Plants need light.',lean:'Plants grow toward the light.',needs:'Plants need water, light and warmth.'}[mode()]}
const miss=(t,i)=>{A.sound.miss();S.tip=i==null?-1:i;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:800);A.redraw()};
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){speak(t+' Next one.');S.day=0;S.lean=0;S.lamp=0}else speak(t);buttons();A.redraw();S.want()}
function water(){const v=mode();if(S.won>=lastN())return;if(v==='fix')return fix(0);if(v!=='water')return;
 if(S.wet>=2)return miss('The soil is still wet. Too much water can rot the roots. Wait until it is dry.');S.wet=3;A.sound.whoosh();speak('Splash! The soil is wet now.');A.redraw()}
function nextDay(){const v=mode();if(S.won>=lastN())return;S.day++;A.sound.tick();
 if(v==='water'){S.wet=Math.max(0,S.wet-1);if(S.wet<=0){S.droop=1;S.ok=0;S.day--;S.day++;return miss('Day '+S.day+'. The soil is dry. The plant droops. Give it water.')}
  S.droop=0;S.ok++;if(S.ok>=5)return win('5 healthy days! You watered it when the soil was dry.');speak(`Day ${S.day}. The plant is fine.`);return A.redraw()}
 if(v==='dark'){if(S.day>5){S.day=5;return miss('It is day 5. Now tap the healthy plant.')}speak(S.day<5?`Day ${S.day}.`:'Day 5. Look at both plants. Which one is healthy?');buttons();return A.redraw()}
 if(v==='lean'){const t=S.lamp;S.lean=Math.max(-1,Math.min(1,S.lean+t*.5));speak(t?`The plant leans ${S.lean<0?'left':S.lean>0?'right':'up'}, toward the lamp.`:'The lamp is right above. The plant grows straight up.');
  if(S.lean===SIDES[Math.min(S.r,1)])return win(`It leans ${S.lean<0?'left':'right'}, to the lamp!`);return A.redraw()}}
function fix(i){if(mode()!=='fix'||S.won>=3)return;const k=FIX[Math.min(S.r,2)];if(i==null)i=k==='dry'?0:1;
 if(i===0&&k==='dark')return miss('The soil is already wet. The plant is pale because it is in the dark. Move it to the window.',0);
 if(i===1&&k==='dry')return miss('It already has light. Look at the soil: it is dry and cracked. Give it water.',1);
 win(k==='dry'?'Water! The plant stands up again.':'Light! Its new leaves grow green again.')}
function pick(i){if(mode()!=='dark'||S.won>=1)return;if(i==null)i=0;if(S.day<5)return miss('Wait and see. Tap Next day until day 5.',i);
 if(i===1)return miss('The cupboard plant is taller, but it is thin, pale and floppy. Tall is not healthy. It needs light.',1);win('Yes! The window plant is green and strong. It had light.')}
function lamp(d){if(mode()!=='lean'||S.won>=2)return;S.lamp=d;A.sound.tick();speak(`Lamp ${d<0?'on the left':d>0?'on the right':'in the middle'}. Now tap Next day.`);A.redraw()}
function sortIt(b){if(mode()!=='needs'||S.won>=1)return;const it=NEEDS[S.ni];if(!it)return;if(b==null)b=1-it[1];
 if(b!==1-it[1])return miss(it[1]?`A plant does need ${it[0].toLowerCase()}. Without it, it will not stay healthy.`:`A plant does not need ${it[0].toLowerCase()}. It makes its own food with light.`,b);
 S.sorted.push(S.ni);S.ni++;A.sound.tick();if(S.ni>=NEEDS.length)return win('Water, light and warmth. That is what a plant needs.');speak(`Yes. Next: ${NEEDS[S.ni][0]}.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='water'){B('💧 Water',water,'Water the plant');B('☀ Next day',nextDay,'Go to the next day')}
 if(v==='fix'){B('💧 Give water',()=>fix(0));B('☀ Move to the window',()=>fix(1))}
 if(v==='dark'){if(S.day<5)B('☀ Next day',nextDay,'Go to the next day');B('Window plant',()=>pick(0),'The plant by the window is healthy');B('Cupboard plant',()=>pick(1),'The plant in the cupboard is healthy')}
 if(v==='lean'){B('Lamp left',()=>lamp(-1),'Move the lamp to the left');B('Lamp right',()=>lamp(1),'Move the lamp to the right');B('☀ Next day',nextDay,'Go to the next day')}
 if(v==='needs'){B('A plant needs it',()=>sortIt(0));B('Not needed',()=>sortIt(1))}}
function down(p){const v=mode(),{W,H}=A;if(S.won>=lastN())return false;
 if(v==='water'){const h=canHome();if(Math.hypot(p.x-h.x,p.y-h.y)<S0()){S.grab={x0:p.x,y0:p.y};S.can={x:h.x,y:h.y};return true}if(p.y<H*.25&&p.x<W*.3)nextDay();return false}
 if(v==='fix'&&p.y>H*.3&&p.y<H*.7){if(p.x<W*.22)fix(0);else if(p.x>W*.78)fix(1)}
 if(v==='dark'&&p.y>H*.12)pick(p.x<W/2?0:1);
 if(v==='lean'){S.grab={lamp:1};return true}
 if(v==='needs'&&p.y>H*.32)sortIt(p.x>W/2?1:0);return false}
function move(p){if(!S.grab)return;if(mode()==='water'){S.can={x:p.x,y:p.y};A.redraw()}if(mode()==='lean'){const d=p.x<A.W*.4?-1:p.x>A.W*.6?1:0;if(d!==S.lamp)lamp(d)}}
function up(p){const d=S.grab;S.grab=null;if(!d)return;if(mode()==='water'){const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,near=Math.abs(p.x-A.W*.45)<S0()*1.3;S.can=null;if(tap||near)water();else A.redraw()}
 if(mode()==='lean'){const d2=p.x<A.W*.4?-1:p.x>A.W*.6?1:0;if(d2!==S.lamp)lamp(d2)}}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Water when dry',p:'Drag the can to the pot, or tap Water. Then tap Next day. Look at the soil first.',
 predict:{q:'Is more and more water always better for a plant?',opts:['Yes, lots and lots','No: water when the soil is dry'],ans:1},task:'Keep the plant healthy for 5 days',
 show:()=>{steps[0].go();play([water,nextDay,nextDay,water,nextDay,nextDay,water,nextDay],240)},go:()=>{fresh();speak('Look at the soil. Water the plant when it is dry.');buttons();S.want=check(0,()=>S.won>=1,'Dry soil means water. Wet soil means wait.')}},
{h:'What is wrong?',p:'Look for the clue. Is the soil dry? Is it dark? Tap Water or Window.',task:'Help 3 plants',
 show:()=>{steps[1].go();play([0,1,2].map(()=>()=>fix()))},go:()=>{fresh();speak('This plant is not well. What is wrong?');buttons();S.want=check(1,()=>S.won>=3,'Droopy with dry soil needs water. Pale in the dark needs light.')}},
{h:'The dark cupboard',p:'Two baby plants. One is by the window. One is in a dark cupboard. Tap Next day and watch.',
 predict:{q:'What will the plant in the dark cupboard look like after 5 days?',opts:['Green and strong','Tall, thin and pale'],ans:1},task:'Watch 5 days, then pick the healthy plant',
 show:()=>{steps[2].go();play([nextDay,nextDay,nextDay,nextDay,nextDay,()=>pick(0)],220)},go:()=>{fresh();S.day=0;speak('Day 0. Both plants are small and green.');buttons();S.want=check(2,()=>S.won>=1,'Without light, a plant grows thin and pale.')}},
{h:'Lean to the light',p:'Drag the lamp, or tap Lamp left or Lamp right. Then tap Next day.',task:'Make the plant lean left, then right',
 show:()=>{steps[3].go();play([()=>lamp(-1),nextDay,nextDay,()=>lamp(1),nextDay,nextDay],250)},go:()=>{fresh();speak('Make the plant lean left.');buttons();S.want=check(3,()=>S.won>=2,'The plant grows toward the light.')}},
{h:'What does a plant need?',p:'Does a plant need it? Tap a box.',task:'Sort all 6',
 show:()=>{steps[4].go();play(NEEDS.map(()=>()=>sortIt()))},go:()=>{fresh();speak('Does a plant need water?');buttons();S.want=check(4,()=>S.won>=1,'Water, light and warmth keep a plant healthy.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A plant by the window droops. The soil is dry. What does it need?',[['Water','ok'],['A dark cupboard','dark'],['Nothing, it is fine','fine']]],
 ['A plant in a dark cupboard grew tall and pale. Is it healthy?',[['No, it needs light','ok'],['Yes, it is tall','tall'],['Yes, its soil is wet','wet']]],
 ['The soil is still wet. Do you water the plant again?',[['No, wait until it is dry','ok'],['Yes, more is better','more'],['Yes, every hour','hour']]],
 ['A plant is next to a window. Which way does it lean?',[['Toward the window','ok'],['Away from the window','away'],['Plants never lean','never']]],
 ['What does a plant need to stay healthy?',[['Water and light','ok'],['Sweets and toys','toys'],['Only water','only']]]];
function why(t){let m='Plants need water and light to stay healthy.';
 if(t==='dark')m='A dark cupboard makes it worse. Dry soil means it needs water.';
 if(t==='fine')m='Droopy leaves and dry soil mean it is thirsty. Give it water.';
 if(t==='tall')m='Tall is not healthy. Thin and pale means it needs light.';
 if(t==='wet')m='Water is not enough. Without light it turns pale.';
 if(t==='more')m='Too much water can rot the roots. Wait until the soil is dry.';
 if(t==='hour')m='That is far too much water. Feel the soil first.';
 if(t==='away')m='Plants grow toward the light, not away from it.';
 if(t==='never')m='Plants do lean. They grow toward the light.';
 if(t==='toys')m='A plant does not need sweets or toys. It needs water and light.';
 if(t==='only')m='Water is not all. A plant needs light too.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good plant care.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
