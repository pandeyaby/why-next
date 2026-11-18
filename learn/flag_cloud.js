/* Flagship: cloud types (ages 7-9; Met Office cloud guide; NC Y4 states of matter "the part played by evaporation and
   condensation in the water cycle"). Lift a bubble of damp air until it cools enough for its invisible water vapour to
   condense into a cloud, zoom in to see droplets and join them into a raindrop, sort cirrus (high, ice) from cumulus
   and stratus (low, water drops), name drawn skies by their shape, and read each sky as a simple forecast.
   Not flagevap (evaporation and the water cycle) or flagwxtype (sunny, rainy, cloudy, windy days). */
(()=>{
VIS.reg('flagcloud',c=>{let A,L,bar,box,round=-1,run=0;const M={};
const TXT='#0c0a09',TAG='#f8fafc',YES='#15803d',HINT='#1e3a8a',WRONG='#b91c1c',SKY1='#7dd3fc',SKY2='#bae6fd';
const KIND={cu:['Cumulus','fluffy heaps with flat bottoms'],st:['Stratus','a flat grey layer'],ci:['Cirrus','thin wisps, high up']};
const HIGHLOW=[['Thin, wispy cirrus','hi'],['Fluffy cumulus','lo'],['Flat grey stratus','lo'],['Wisps made of ice bits','hi'],['Fog: stratus touching the ground','lo'],['Clouds like horses\' tails','hi']];
const QUIZSKY=['st','ci','cu','ci','st','cu'];
const SKIES=[['cu','Small white cumulus','Dry, with sunny spells'],['st','Low grey stratus','Dull, maybe drizzle'],['cb','Cumulus growing tall and dark','Heavy showers, maybe thunder'],['ci','Wisps of cirrus','Dry now; may change in a day']];
const mode=()=>['rise','drops','highlow','name','forecast','quiz'][L.step];
const box2=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,lim=(v,lo,hi)=>Math.min(hi,Math.max(lo,v));
const voice=t=>{c.say(t);L.cv.setAttribute('aria-label',t)};
function tag(text,x,y,o){o=o||{};const g=L.ctx;let size=o.f||(L.narrow?15:18);g.font=`700 ${size}px system-ui`;while(size>11&&g.measureText(text).width>(o.w||L.W)-24){size--;g.font=`700 ${size}px system-ui`}
 const w=Math.max(o.w||0,g.measureText(text).width+22),h=o.h||size*2,X=lim(x-w/2,4,L.W-w-4);g.fillStyle=o.bg||TAG;L.paint.rrect(X,y-h/2,w,h,12);g.fill();g.lineWidth=o.line?3:1.5;g.strokeStyle=o.line||'#94a3b8';g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(text,X+w/2,y+1);return{x:X,y:y-h/2,w,h}}
function puff(x,y,s,col,edge){const g=L.ctx;g.fillStyle=col;[[0,0,1],[-.9,.25,.7],[.9,.25,.75],[-.4,-.45,.75],[.45,-.4,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(x+dx*s,y+dy*s,r*s,0,7);g.fill()});
 g.fillRect(x-1.5*s,y+.2*s,3*s,.7*s);if(edge){g.strokeStyle=edge;g.lineWidth=2;g.beginPath();g.moveTo(x-1.5*s,y+.9*s);g.lineTo(x+1.5*s,y+.9*s);g.stroke()}}
function sheet(y,h,col){const g=L.ctx;g.fillStyle=col;g.fillRect(0,y,L.W,h);g.strokeStyle=L.alpha('#475569',.6);g.lineWidth=1.5;for(let i=0;i<3;i++){g.beginPath();g.moveTo(0,y+h*(.3+i*.25));g.lineTo(L.W,y+h*(.3+i*.25)+4);g.stroke()}}
function wisps(x,y,s){const g=L.ctx;g.strokeStyle='#f8fafc';g.lineWidth=3;g.lineCap='round';for(let i=0;i<5;i++){g.beginPath();g.moveTo(x-s+i*s*.3,y+i*6);g.quadraticCurveTo(x+i*s*.25,y-s*.35+i*5,x+s*.9+i*s*.2,y-s*.1+i*7);g.stroke()}
 g.strokeStyle='#334155';g.lineWidth=1.5;for(let i=0;i<5;i++){g.beginPath();g.moveTo(x-s+i*s*.3,y+i*6+2);g.quadraticCurveTo(x+i*s*.25,y-s*.35+i*5+2,x+s*.9+i*s*.2,y-s*.1+i*7+2);g.stroke()}}
function skyWash(){const g=L.ctx;g.fillStyle=L.mix(SKY1,SKY2,.4);g.fillRect(0,L.H*.14,L.W,L.H*.86)}
/* ---- 1: rising air cools; at the cloud line vapour condenses ---- */
const LINE=()=>L.H*.42,GROUND=()=>L.H*.9;
const tempAt=y=>Math.round(20-14*(GROUND()-y)/(GROUND()-L.H*.18));
function drawRise(){const g=L.ctx;skyWash();g.fillStyle='#86efac';g.fillRect(0,GROUND(),L.W,L.H-GROUND());
 g.setLineDash([8,6]);g.strokeStyle=HINT;g.lineWidth=2;g.beginPath();g.moveTo(0,LINE());g.lineTo(L.W,LINE());g.stroke();g.setLineDash([]);
 g.fillStyle=TXT;g.font=`700 ${L.narrow?11:13}px system-ui`;g.textAlign='right';g.fillText('cold enough line',L.W-8,LINE()+16);
 for(let k=0;k<4;k++){const y=GROUND()-k*(GROUND()-L.H*.2)/3+(k===2?14:0);g.textAlign='left';g.fillText(tempAt(y)+'°C',8,y-4)}
 const x=L.W*.55,y=M.air,r=L.narrow?28:36,wet=y<=LINE();
 if(wet)puff(x,y,r*.9,'#ffffff','#94a3b8');else{g.strokeStyle='#475569';g.setLineDash([4,4]);g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.setLineDash([])}
 tag(wet?'Cloud! Vapour turned into tiny drops':'Damp air: the water vapour is invisible',L.W/2,L.H*.07,{line:wet?YES:HINT,f:L.narrow?13:16});
 tag(tempAt(y)+'°C',x-r-34,y,{f:13,h:24})}
function lift(y,quiet){const was=M.air<=LINE();M.air=lim(y,L.H*.2,GROUND()-30);const now=M.air<=LINE();
 if(now&&!was){M.made=true;L.sound.pop();return voice(`The air rose and cooled to ${tempAt(M.air)}°C. Its water vapour condensed into tiny drops. That is a cloud.`)}
 if(!now&&was){L.sound.tick();return voice('The air sank and warmed up. The tiny drops evaporated, and the cloud vanished.')}
 if(quiet)return L.redraw();voice(now?'Still a cloud. It is cold up here.':`The air is ${tempAt(M.air)}°C. Still no cloud: it needs to cool more.`)}
/* ---- 2: a cloud is droplets; drops join and fall ---- */
function drawDrops(){const g=L.ctx;skyWash();if(!M.zoom){puff(L.W/2,L.H*.5,L.narrow?60:80,'#ffffff','#94a3b8');tag('Tap the cloud to zoom in',L.W/2,L.H*.07,{line:HINT});return}
 g.fillStyle='#f1f5f9';g.beginPath();g.arc(L.W/2,L.H*.55,Math.min(L.W,L.H)*.38,0,7);g.fill();g.strokeStyle=HINT;g.lineWidth=3;g.stroke();
 const n=60-M.joins*16,big=3+M.joins*4;for(let i=0;i<n;i++){const a=i*2.4,d=(i%10+1)*Math.min(L.W,L.H)*.034;g.fillStyle='#60a5fa';g.beginPath();g.arc(L.W/2+Math.cos(a)*d,L.H*.55+Math.sin(a)*d*.9,3,0,7);g.fill()}
 if(M.joins){g.fillStyle='#1d4ed8';g.beginPath();g.arc(L.W/2,L.H*.55+M.fall,big,0,7);g.fill()}
 tag(M.rain?'The big drop fell: rain!':M.joins?`Drops joined ${M.joins} time${M.joins>1?'s':''}: bigger and heavier`:'Tiny drops of water, too light to fall',L.W/2,L.H*.07,{line:M.rain?YES:HINT,f:L.narrow?13:16})}
function zoomIn(){if(M.zoom)return voice('You are zoomed in. Join the drops.');M.zoom=true;L.sound.tick();voice('Zoomed in. A cloud is millions of tiny water drops. Each one is too small and light to fall.')}
function join(){if(!M.zoom)return voice('Zoom in first, so you can see the drops.');if(M.rain)return voice('That drop has fallen as rain.');M.joins++;L.sound.tick();
 if(M.joins>=3){M.rain=true;L.tween(M,{fall:L.H*.4},L.reduced()?10:900,'io');L.sound.pop();return voice('The drops bumped and joined into one big drop. Now it is heavy enough to fall. That is rain.')}
 voice('Some drops bumped together and joined. The drop is bigger, but not heavy enough to fall yet.')}
/* ---- 3: cirrus high and icy, the others low ---- */
function drawHighLow(){const g=L.ctx,n=L.narrow;g.fillStyle='#dbeafe';g.fillRect(0,L.H*.14,L.W,L.H*.3);g.fillStyle='#e0f2fe';g.fillRect(0,L.H*.44,L.W,L.H*.3);
 g.fillStyle=TXT;g.font=`700 ${n?12:14}px system-ui`;g.textAlign='left';g.fillText('High up: below freezing, ice bits',8,L.H*.18);g.fillText('Low down: tiny water drops',8,L.H*.48);
 M.placed.forEach((pl,i)=>tag(HIGHLOW[pl[0]][0],L.W*(.25+(i%2)*.5),L.H*((pl[1]==='hi'?.25:.55)+Math.floor(i/2)%3*.06),{f:n?11:13,h:22,w:n?L.W*.46:L.W*.4,bg:'#dcfce7',line:YES}));
 const C=HIGHLOW[M.at];if(C)tag(C[0],L.W/2,L.H*.84,{f:n?15:18,line:M.bad?WRONG:'#7c3aed',bg:'#f5f3ff'});
 tag(M.at<6?`Card ${M.at+1} of 6: high or low?`:'All sorted: only cirrus is high and icy',L.W/2,L.H*.07,{line:M.at>5?YES:HINT,f:n?13:16})}
function place(z){const C=HIGHLOW[M.at];if(!C)return voice('All 6 cards are sorted.');
 if(C[1]===z){M.placed.push([M.at,z]);M.at++;M.bad=false;L.sound.pop();return voice(`Yes: ${C[0].toLowerCase()} ${z==='hi'?'is high up, where it is so cold the cloud is made of ice bits':'is a low cloud made of tiny water drops'}.`)}
 M.bad=true;L.sound.miss();voice(z==='hi'?`${C[0]} is a low cloud. Its drops are liquid water, not ice.`:`${C[0]} is very high, where it is below freezing. It is made of ice bits.`)}
/* ---- 4: name the drawn sky ---- */
function paintSky(k){skyWash();if(k==='cu'){puff(L.W*.3,L.H*.5,L.narrow?26:34,'#ffffff','#94a3b8');puff(L.W*.7,L.H*.42,L.narrow?20:28,'#ffffff','#94a3b8')}
 if(k==='st')sheet(L.H*.2,L.H*.32,'#94a3b8');if(k==='ci'){wisps(L.W*.35,L.H*.28,L.narrow?40:60);wisps(L.W*.7,L.H*.36,L.narrow?30:46)}
 if(k==='cb'){const g=L.ctx;g.fillStyle='#475569';g.fillRect(L.W*.35,L.H*.24,L.W*.3,L.H*.5);puff(L.W/2,L.H*.26,L.narrow?40:56,'#64748b');g.strokeStyle='#1d4ed8';g.lineWidth=2;for(let i=0;i<8;i++){g.beginPath();g.moveTo(L.W*(.37+i*.035),L.H*.76);g.lineTo(L.W*(.36+i*.035),L.H*.86);g.stroke()}}}
function drawName(){paintSky(QUIZSKY[M.q%6]);tag(`Which cloud is this? Named ${M.right} of 4`,L.W/2,L.H*.07,{line:M.right>3?YES:HINT,f:L.narrow?13:16})}
function nameIt(k){const want=QUIZSKY[M.q%6];if(M.right>3)return voice('4 named. Well spotted.');
 if(k===want){M.right++;M.q++;L.sound.pop();return voice(`Yes: ${KIND[k][0]}, ${KIND[k][1]}.`+(M.right>3?' That is 4.':' Here is the next sky.'))}
 L.sound.miss();voice(`Not ${KIND[k][0]}. ${KIND[k][0]} is ${KIND[k][1]}. Look at the shape again.`)}
/* ---- 5: read the sky ---- */
function drawForecast(){const S=SKIES[M.sky];paintSky(S[0]);tag(S[1],L.W/2,L.H*.94,{f:L.narrow?13:16,bg:'#fef9c3'});
 tag(M.read.length>3?'All 4 skies read':`Sky ${M.sky+1} of 4: what weather comes next?`,L.W/2,L.H*.07,{line:M.read.length>3?YES:HINT,f:L.narrow?13:16})}
function forecast(i){const S=SKIES[M.sky];if(M.read.length>3)return voice('All 4 skies are done.');
 if(i===M.sky){M.read.push(i);L.sound.pop();const msg=`Yes. ${S[1]}: ${S[2].toLowerCase()}.`;if(M.sky<3)M.sky++;return voice(msg)}
 L.sound.miss();voice(S[0]==='ci'?'Cirrus is high and thin. It does not rain on us now, but it can mean the weather may change in a day or so.':S[0]==='cb'?'A tall, dark heaping cloud is full of big drops. It brings heavy showers.':S[0]==='st'?'A low grey layer often gives a dull day with drizzle, not thunder.':'Small white heaps are fair-weather clouds. They do not usually rain.')}
function draw(){const g=L.ctx;g.fillStyle=L.mix(L.col.pn,SKY2,L.col.dark?.05:.35);g.fillRect(0,0,L.W,L.H);const k=mode();
 if(k==='quiz'){tag('Challenge',L.W/2,L.H*.14,{line:HINT});const Q=ASK[round%ASK.length];if(Q)tag(Q.pic,L.W/2,L.H*.5,{f:L.narrow?17:21});return}
 ({rise:drawRise,drops:drawDrops,highlow:drawHighLow,name:drawName,forecast:drawForecast})[k]()}
function wipe(){run++;Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,{air:L.H*.8,made:false,drag:false,zoom:false,joins:0,fall:0,rain:false,at:0,bad:false,placed:[],q:0,right:0,sky:0,read:[],hook:()=>{}})}
const arm=(i,cond,msg)=>()=>{if(L.step===i&&cond()&&(!steps[i].predict||L.pred[i]!=null)&&!L.isDone)L.done(msg+L.reveal(i))};
function open(i,intro,cond,msg){wipe();voice(intro);pads();M.hook=arm(i,cond,msg)}
function auto(i,seq,ms){steps[i].go();const mine=run;seq.forEach((f,j)=>setTimeout(()=>{if(mine===run)f()},L.reduced()?30*(j+1):(ms||450)*(j+1)))}
function pads(){if(!bar)return;bar.innerHTML='';const k=mode(),B=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},bar,t).onclick=()=>{f();M.hook()}};
 if(k==='rise'){B('Lift the air higher',()=>{lift(M.air-L.H*.08)},'Lift the bubble of damp air higher');B('Let it sink',()=>{lift(M.air+L.H*.08)},'Let the bubble of air sink lower')}
 if(k==='drops'){B('Zoom in',zoomIn,'Zoom in on the cloud');B('Join drops',join,'Make the tiny drops bump and join')}
 if(k==='highlow'){B('High and icy',()=>place('hi'),'Put this cloud high up, made of ice');B('Low, water drops',()=>place('lo'),'Put this cloud low down, made of water drops')}
 if(k==='name')Object.keys(KIND).forEach(q=>B(KIND[q][0],()=>nameIt(q),'This cloud is '+KIND[q][0]));
 if(k==='forecast')SKIES.forEach((S,i)=>B(S[2],()=>forecast(i),'Forecast: '+S[2]))}
const speakAll=fn=>(...a)=>{fn(...a);L.redraw();if(!M.drag)pads();M.hook()};
lift=speakAll(lift);zoomIn=speakAll(zoomIn);join=speakAll(join);place=speakAll(place);nameIt=speakAll(nameIt);forecast=speakAll(forecast);
function down(p){const k=mode();
 if(k==='rise'){M.drag=true;return true}
 if(k==='drops'){if(!M.zoom)zoomIn();else join()}
 if(k==='highlow')place(p.y<L.H*.44?'hi':'lo');
 if(k==='name'){const kk=Object.keys(KIND),i=Math.floor(p.x/(L.W/3));nameIt(kk[lim(i,0,2)])}
 M.hook();return false}
function move(p){if(M.drag&&mode()==='rise')lift(p.y,true)}
function up(){if(M.drag){M.drag=false;lift(M.air);M.hook()}}
const steps=[
{h:'Make a cloud',p:'This bubble of warm, damp air holds water vapour you cannot see. Drag it up, or use the buttons. Watch the temperature.',
 predict:{q:'The damp air rises and cools. What happens to its water vapour?',opts:['it turns into tiny water drops','it gets hotter','it turns into smoke'],ans:0},task:'Lift the air until a cloud forms',
 show:()=>auto(0,[()=>lift(M.air-L.H*.15),()=>lift(M.air-L.H*.15),()=>lift(M.air-L.H*.15)],500),
 go:()=>open(0,'A bubble of damp air near the warm ground. A dashed cold-enough line higher up.',()=>M.made,'Rising air cools; its vapour condenses into tiny drops: a cloud.')},
{h:'What is a cloud made of?',p:'Zoom in on the cloud. Then make the tiny drops bump and join.',
 predict:{q:'A cloud is made of…',opts:['steam, like from a kettle','tiny drops of water or bits of ice','cotton-wool fluff'],ans:1},task:'Zoom in, then join drops until rain falls',
 show:()=>auto(1,[zoomIn,join,join,join],500),
 go:()=>open(1,'A white cloud in a blue sky.',()=>M.rain,'Clouds are tiny drops. When drops join and get heavy, they fall as rain.')},
{h:'High or low?',p:'Some clouds are very high up, where it is below freezing. Sort each card: high and icy, or low with water drops?',task:'Sort all 6 cards',
 show:()=>auto(2,HIGHLOW.map(C=>()=>place(C[1])),350),
 go:()=>open(2,'A sky split into high up and low down.',()=>M.at>5,'Cirrus is high and made of ice. Cumulus and stratus are low.')},
{h:'Name that cloud',p:'Cumulus means heap. Stratus means layer. Cirrus means curl of hair. Name each sky.',
 predict:{q:'A flat grey sheet covers the whole sky. Which cloud is it?',opts:['cirrus','stratus','cumulus'],ans:1},task:'Name 4 skies',
 show:()=>auto(3,[0,1,2,3].map(i=>()=>nameIt(QUIZSKY[i])),500),
 go:()=>open(3,'A sky with a cloud in it. Three name buttons.',()=>M.right>3,'Heaps are cumulus, layers are stratus, wisps are cirrus.')},
{h:'Read the sky',p:'Clouds help us guess the weather. Pick the weather that each sky brings.',
 predict:{q:'Thin, wispy cirrus clouds are high up. Will they rain on you now?',opts:['yes, heavy rain now','no: they are too thin and high','yes, they bring snow now'],ans:1},task:'Read all 4 skies',
 show:()=>auto(4,[0,1,2,3].map(i=>()=>forecast(i)),500),
 go:()=>open(4,'A sky with clouds, and a weather card.',()=>M.read.length>3,'Cloud type is a clue to the weather coming next.')},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hook()});
const ASK=[
 {pic:'a cloud up close',q:'What is a cloud made of?',ans:'tiny drops of water or ice',bad:[['steam','steam'],['water vapour you can see','vapour']]},
 {pic:'air going up',q:'Clouds form when damp air…',ans:'rises and cools',bad:[['warms up','warm'],['stays still on the ground','still']]},
 {pic:'wisps, high up',q:'What are high cirrus clouds made of?',ans:'bits of ice',bad:[['water drops','drops'],['smoke','smoke']]},
 {pic:'flat grey layer',q:'Which cloud is a flat grey layer?',ans:'stratus',bad:[['cumulus','cu'],['cirrus','ci']]},
 {pic:'small white heaps',q:'Small fluffy cumulus on a sunny day mean…',ans:'dry weather for now',bad:[['heavy rain soon','allrain'],['snow','allrain']]},
 {pic:'dark tall cloud',q:'Why does a thick storm cloud look dark?',ans:'it is so thick that little sunlight gets through',bad:[['it is full of smoke','smoke'],['it is made of dirty water','dirty']]}];
function oops(t){let m='Look at the cloud again.';
 if(t==='steam')m='Steam from a kettle is hot. Clouds are cold, tiny drops that form when damp air cools.';
 if(t==='vapour')m='Water vapour is a gas you cannot see. A cloud is the drops it turns into.';
 if(t==='warm')m='Warming makes drops evaporate. Air must cool for vapour to condense into a cloud.';
 if(t==='still')m='Air near warm ground stays clear. It must rise and cool to make a cloud.';
 if(t==='drops')m='Cirrus is so high that it is below freezing there. It is made of ice bits.';
 if(t==='smoke')m='Clouds are water, as drops or ice. They are not smoke.';
 if(t==='cu')m='Cumulus are fluffy heaps with flat bottoms, not a flat layer.';
 if(t==='ci')m='Cirrus are thin wisps high up, not a thick grey layer.';
 if(t==='allrain')m='Not all clouds bring rain. Small white heaps are fair-weather clouds.';
 if(t==='dirty')m='The water is clean. Thick cloud blocks the sunlight, so its base looks dark.';
 return m}
function pose(){round++;const Q=ASK[round%ASK.length],opts=[[Q.ans,'ok'],...Q.bad],s=round%3,order=opts.slice(s).concat(opts.slice(0,s));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>judge(t,Q.ans)});voice('Challenge: '+Q.q);L.redraw()}
function judge(t,ans){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)L.win();else L.sound.miss();voice(ok?'Yes: '+ans+'.':oops(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+oops(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose}
L=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:Q=>{box.hidden=Q.step!==5;bar.hidden=Q.step===5;pads()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Cloud lab controls'},w);box=c.el('div',{class:'fl-chal'},Q.below);wipe();A=Q;A.gest({down,move,up});pads()}});
L.start()})})();
