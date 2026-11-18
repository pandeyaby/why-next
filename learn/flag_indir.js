/* Flagship: measuring length (ages 6-7; CCSS 1.MD.1 "order three objects by length; compare the lengths of two
   objects indirectly by using a third object"). Order three ribbons whose starts do not line up; measure a gap with
   a string and carry it to a sofa that cannot be moved; pull a wavy string tight; reason that if A > B and B > C then
   A > C; find out why a go-between that is shorter than both cannot decide. Not flaglenht (line up starts, cube units). */
(()=>{
VIS.reg('flagindir',c=>{let L,bar,qz,qn=-1,gen=0;const M={};c.fig.classList.add('young');
const INK='#111827',PAPER='#fffbeb',RIM='#78716c',GOOD='#047857';const STR=()=>L.col.dark?'#fdba74':'#9a3412',LINE=()=>L.col.tx;
const RIB=[{n:'Red',u:9,c:'#b91c1c',t:'#fff',x:.05},{n:'Blue',u:5,c:'#1d4ed8',t:'#fff',x:.5},{n:'Yellow',u:7,c:'#facc15',t:INK,x:.29}];
const KIDS=[{n:'Ali',h:8.6,c:'#0f766e'},{n:'Ben',h:7,c:'#7c3aed'},{n:'Cat',h:5.6,c:'#c2410c'}];
const part=()=>['order','string','tight','chain','tool','quiz'][L.step];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
function tag(t,x,y,o){o=o||{};const g=L.ctx;let fs=o.fs||(L.narrow?14:16);g.font=`800 ${fs}px system-ui`;let w=g.measureText(t).width+20;
 while(w>L.W-10&&fs>10){fs--;g.font=`800 ${fs}px system-ui`;w=g.measureText(t).width+20}const h=fs+14,x0=clamp(x-w/2,5,L.W-w-5);
 g.fillStyle=PAPER;L.paint.rrect(x0,y-h/2,w,h,10);g.fill();g.strokeStyle=o.edge||RIM;g.lineWidth=o.edge?3:1.5;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function floor(){const g=L.ctx,C=L.col;g.fillStyle=L.mix(C.pn,'#fef3c7',C.dark?.06:.45);g.fillRect(0,0,L.W,L.H)}
function block(x,y,w,h,col,txt,tc){const g=L.ctx;g.fillStyle=col;L.paint.rrect(x,y,w,h,Math.min(10,h/3));g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
 if(txt){g.fillStyle=tc||'#fff';g.font=`800 ${L.narrow?13:15}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,x+w/2,y+h/2+1,w-6)}}
const U=()=>L.W*.082;
/* 0: order three ribbons */
function seeOrder(){floor();const g=L.ctx,u=U(),hh=L.H*.075,x0=L.W*.08;
 RIB.forEach((r,i)=>{if(M.row.includes(i))return;block(L.W*r.x,L.H*(.1+i*.13),r.u*u,hh,r.c,r.n,r.t)});
 g.strokeStyle=LINE();g.lineWidth=3;g.beginPath();g.moveTo(x0,L.H*.5);g.lineTo(x0,L.H*.97);g.stroke();
 ['shortest','middle','longest'].forEach((w,j)=>{const y=L.H*(.55+j*.15),i=M.row[j];if(i==null){g.setLineDash([6,6]);g.strokeStyle=LINE();g.strokeRect(x0,y,L.W*.86,hh);g.setLineDash([]);tag(w,L.W*.5,y+hh/2,{fs:12})}
  else block(x0,y,RIB[i].u*u,hh,RIB[i].c,RIB[i].n,RIB[i].t)});
 if(M.row.length===3)tag(M.won?'Shortest to longest!':'Not in order yet',L.W/2,L.H*.48,{edge:M.won?GOOD:RIM})}
function put(i){if(M.row.includes(i)||M.row.length>2)return;M.row.push(i);L.sound.pop();
 if(M.row.length<3)return speak(`${RIB[i].n} ribbon moved to the start line.`);M.won=M.row.map(k=>RIB[k].u).every((v,k,a)=>!k||a[k-1]<v);
 if(M.won)return speak('All three start at the line now. Red reaches furthest, so red is longest. Blue is shortest.');L.sound.miss();speak('Look at the ends. They are not shortest to longest yet. Tap Try again.')}
/* 1: a string carries the length of the gap to the sofa */
function seeString(){floor();const g=L.ctx,u=U(),gy=L.H*.3,a=L.W*.12,b=a+8*u;
 block(a-L.W*.1,L.H*.06,L.W*.1,L.H*.34,'#a16207','');tag('shelf',a-L.W*.05,L.H*.45,{fs:11});block(b,L.H*.06,L.W*.06,L.H*.34,'#9ca3af','');tag('wall',b+L.W*.03,L.H*.45,{fs:11});
 tag('the gap',(a+b)/2,L.H*.1,{fs:12});const sy=M.moved?L.H*.66:gy,sx=M.moved?L.W*.12:a,len=M.moved?8*u:M.end-a;
 g.strokeStyle=STR();g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+len,sy);g.stroke();
 g.fillStyle=STR();g.beginPath();g.arc(sx+len,sy,M.moved?7:L.narrow?16:13,0,7);g.fill();
 block(L.W*.12,L.H*.72,7*u,L.H*.16,'#2563eb','sofa');
 tag(M.moved?'The string is longer. The sofa will fit!':M.cut?'Marked! Now take the string to the sofa.':'Drag the knot to the wall',L.W/2,L.H*.94,{edge:M.moved?GOOD:0})}
function stretch(x,quiet){const a=L.W*.12,b=a+8*U();M.end=clamp(x,a+20,b);if(M.end>=b-3&&!M.cut){M.cut=1;L.sound.pop();if(!quiet)return speak('The string reaches the wall. It is as long as the gap now.')}if(quiet)return L.redraw();speak('Keep going until the string touches the wall.')}
function carry(){if(!M.cut){L.sound.miss();return speak('First stretch the string right across the gap.')}L.sound.whoosh();M.moved=1;speak('The string is the gap\'s length. Next to the sofa, the string is longer. So the gap is longer than the sofa, and the sofa fits.')}
/* 2: a wavy string measures too long */
function wave(k){const a=L.W*.12,b=a+6*U(),y=L.H*.28,amp=M.wig*L.H*.09,pts=[];for(let i=0;i<=80;i++){const t=i/80;pts.push([a+(b-a)*t,y+amp*Math.sin(t*Math.PI*6)])}return pts}
function seeTight(){floor();const g=L.ctx,u=U(),a=L.W*.12,pts=wave();let len=0;for(let i=1;i<pts.length;i++)len+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
 block(a-L.W*.08,L.H*.1,L.W*.08,L.H*.36,'#a16207','');block(a+6*u,L.H*.1,L.W*.06,L.H*.36,'#9ca3af','');
 g.strokeStyle=STR();g.lineWidth=5;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
 const y2=L.H*.66;g.setLineDash([7,6]);g.strokeStyle=LINE();g.lineWidth=2;g.strokeRect(a,y2-14,6*u,28);g.setLineDash([]);tag('real gap',a+3*u,y2-34,{fs:11});
 g.strokeStyle=STR();g.lineWidth=6;g.beginPath();g.moveTo(a,y2);g.lineTo(a+Math.min(len,L.W*.85),y2);g.stroke();
 M.extra=len/u-6;tag(M.wig<.05?'Tight string: it matches the gap':'Wavy string laid flat: too long!',L.W/2,L.H*.86,{edge:M.wig<.05?GOOD:0});
 g.fillStyle='#e11d48';g.beginPath();g.arc(L.W*.9,L.H*.28,L.narrow?17:14,0,7);g.fill();tag('pull',L.W*.9,L.H*.42,{fs:11})}
function pull(w,quiet){M.wig=clamp(w,0,1);if(M.wig<.05)M.wig=0;if(quiet)return L.redraw();L.sound.tick();
 speak(M.wig?'The string is still wavy. Laid flat it is longer than the gap, so it would say the gap is too long.':'Pulled tight. Now the string is exactly as long as the gap.')}
/* 3: if A > B and B > C then A > C */
function seeChain(){floor();const g=L.ctx,vu=L.H*.075,base=L.H*.84,show=M.pair||[];
 const draw1=(k,x)=>{const d=KIDS[k],h=d.h*vu;g.fillStyle=d.c;L.paint.rrect(x-L.W*.06,base-h+vu*1.4,L.W*.12,h-vu*1.4,12);g.fill();
  g.beginPath();g.arc(x,base-h+vu*.7,vu*.7,0,7);g.fill();tag(d.n,x,base+18,{fs:13,edge:M.pick===k?GOOD:0})};
 if(M.all){[0,1,2].forEach(k=>draw1(k,L.W*(.25+k*.25)))}else if(show.length){draw1(show[0],L.W*.38);draw1(show[1],L.W*.62)}
 else KIDS.forEach((d,k)=>{const x=L.W*(.25+k*.25);block(x-L.W*.09,L.H*.25,L.W*.18,L.H*.59,'#92400e','');tag(d.n,x,base+18,{fs:13})});
 tag(M.all?'Ali is the tallest':`Compared: ${M.seen.filter(Boolean).length} of 2 pairs`,L.W/2,L.H*.07,{edge:M.all?GOOD:0})}
function meet(j){M.pair=j?[1,2]:[0,1];M.seen[j]=1;L.sound.pop();speak(j?'Ben is taller than Cat.':'Ali is taller than Ben.')}
function choose(k){if(M.seen.some(s=>!s)){L.sound.miss();return speak('Compare two at a time first: Ali with Ben, and Ben with Cat.')}
 M.pick=k;if(k){L.sound.miss();return speak(k===1?`Ben is shorter than Ali, so Ben is not the tallest.`:'Cat is shorter than Ben, and Ben is shorter than Ali.')}
 M.all=1;speak('Ali is taller than Ben, and Ben is taller than Cat. So Ali is taller than Cat too. Now all three stand together: it is true.')}
/* 4: a go-between must help */
function seeTool(){floor();const g=L.ctx,u=U(),vu=L.H*.075;block(L.W*.06,L.H*.78,7*u,L.H*.1,'#0369a1','train');
 const tx=L.W*.84;for(let i=0;i<6;i++)block(tx-L.W*.05,L.H*.88-(i+1)*vu,L.W*.1,vu,i%2?'#be185d':'#16a34a','');tag('tower',tx,L.H*.94,{fs:11});
 if(M.tool==='stick'){g.fillStyle='#854d0e';g.fillRect(L.W*.06,L.H*.7,4*u,10);g.fillRect(tx+L.W*.07,L.H*.88-4*vu,10,4*vu)}
 if(M.tool==='string'){g.strokeStyle=STR();g.lineWidth=6;g.beginPath();g.moveTo(L.W*.06,L.H*.72);g.lineTo(L.W*.06+7*u,L.H*.72);g.moveTo(tx+L.W*.08,L.H*.88);g.lineTo(tx+L.W*.08,L.H*.88-7*vu);g.stroke()}
 tag(M.tool==='string'?'Train longer than tower is tall':M.tool==='stick'?'Both are longer than the stick. No answer!':'Pick a go-between',L.W/2,L.H*.08,{edge:M.tool==='string'?GOOD:0})}
function use(t){M.tool=t;M.tried[t]=1;if(t==='stick'){L.sound.miss();return speak('The train is longer than the stick. The tower is taller than the stick too. That does not tell us which one is longer.')}
 L.sound.pop();speak('Cut the string as long as the train. Hold it up by the tower. The string goes higher, so the train is longer than the tower is tall.')}
function draw(){const k=part();if(k==='quiz'){floor();tag('Challenge',L.W/2,L.H*.4,{edge:GOOD});tag('Start lines, strings and go-betweens',L.W/2,L.H*.6,{fs:12});return}
 ({order:seeOrder,string:seeString,tight:seeTight,chain:seeChain,tool:seeTool})[k]();L.fx.draw(L.ctx)}
function hitRib(p){const u=U(),hh=L.H*.075;return RIB.findIndex((r,i)=>!M.row.includes(i)&&p.x>L.W*r.x-8&&p.x<L.W*r.x+r.u*u+8&&Math.abs(p.y-L.H*(.1+i*.13)-hh/2)<hh)}
function down(p){const k=part();if(k==='order'){const i=hitRib(p);if(i>=0)put(i);return false}
 if(k==='string'&&!M.moved){if(M.cut&&p.y>L.H*.6){carry();return false}M.grab='knot';stretch(p.x,true);return true}
 if(k==='tight'&&p.x>L.W*.7){M.grab='pull';return true}
 if(k==='chain'){if(M.all)return false;const s=M.seen;if(!s[0]||!s[1]){meet(s[0]?1:0);return false}choose(clamp(Math.floor((p.x/L.W-.125)/.25),0,2));return false}
 if(k==='tool'){use(p.y<L.H*.5?'stick':'string');return false}return false}
function move(p){if(M.grab==='knot')stretch(p.x,true);if(M.grab==='pull')pull(1-(p.x-L.W*.7)/(L.W*.25),true)}
function up(){const g=M.grab;M.grab=null;if(g==='knot')stretch(M.end);if(g==='pull')pull(M.wig)}
function wipe(){gen++;for(const k in M)delete M[k];Object.assign(M,{row:[],won:0,end:L.W*.12+30,cut:0,moved:0,wig:1,extra:0,pair:null,seen:[0,0],pick:-1,all:0,tool:'',tried:{},grab:null,ok:()=>{}})}
function speak(t){c.say(t);L.cv.setAttribute('aria-label',t);L.redraw();pads();M.ok()}
const passed=(i,f,msg)=>()=>{if(L.step===i&&f()&&(!steps[i].predict||L.pred[i]!=null)&&!L.isDone)L.done(msg+L.reveal(i))};
function begin(i,first,f,msg){wipe();c.say(first);L.cv.setAttribute('aria-label',first);pads();M.ok=passed(i,f,msg)}
function demo(i,acts){steps[i].go();const v=gen;acts.forEach((f,j)=>setTimeout(()=>{if(v===gen)f()},500*(j+1)))}
function pads(){if(!bar)return;bar.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='order'){RIB.forEach((r,i)=>{if(!M.row.includes(i))B(r.n,()=>put(i),`Move the ${r.n} ribbon to the start line`)});if(M.row.length===3&&!M.won)B('Try again',()=>{M.row=[];speak('Ribbons back. Pick the shortest first.')})}
 if(k==='string'){B('Stretch to the wall',()=>stretch(L.W*.12+8*U()));B('Take string to sofa',carry)}
 if(k==='tight'){B('Pull tighter',()=>pull(M.wig-.5),'Pull the string tighter');B('Make it wavy',()=>pull(1),'Let the string go wavy')}
 if(k==='chain'){B('Ali and Ben',()=>meet(0),'Stand Ali next to Ben');B('Ben and Cat',()=>meet(1),'Stand Ben next to Cat');KIDS.forEach((d,j)=>B(d.n+' is tallest',()=>choose(j)))}
 if(k==='tool'){B('Use a short stick',()=>use('stick'));B('Use a string',()=>use('string'))}}
const steps=[
{h:'Put them in order',p:'Three ribbons. Their starts are all in different places. Tap the shortest first, then the next. They move to the start line.',
 predict:{q:'Which ribbon is the longest?',opts:['Blue: it reaches furthest','Line them up first, then look','Yellow: it is in the middle'],ans:1},task:'Put the ribbons shortest to longest',
 show:()=>demo(0,[()=>put(1),()=>put(2),()=>put(0)]),
 go:()=>begin(0,'Three ribbons, red, yellow and blue, start in different places.',()=>M.won,'Line up the starts, then compare the ends.')},
{h:'Too big to move',p:'Will the sofa fit in the gap? You cannot move the sofa. Drag the knot of string to the wall. Then take the string to the sofa.',
 predict:{q:'Can you compare two things that cannot go side by side?',opts:['No, never','Yes, use a string to carry the length','Only by guessing'],ans:1},task:'Measure the gap and check the sofa',
 show:()=>demo(1,[()=>stretch(L.W*.12+8*U()),carry]),
 go:()=>begin(1,'A gap between a shelf and a wall. A sofa below.',()=>M.moved,'The string carried the gap\'s length to the sofa.')},
{h:'Pull it tight',p:'This string is wavy. Laid flat, a wavy string is longer than the gap. Drag the red handle, or tap Pull tighter.',
 predict:{q:'A wavy string says the gap is…',opts:['too long','just right','too short'],ans:0},task:'Pull the string tight',
 show:()=>demo(2,[()=>pull(.5),()=>pull(0)]),
 go:()=>begin(2,'A wavy string in a gap, and the same string laid flat below.',()=>M.wig===0,'A go-between must be tight and straight.')},
{h:'Two at a time',p:'Ali, Ben and Cat are behind doors. Only two can stand together. Compare Ali with Ben, then Ben with Cat. Who is tallest?',
 predict:{q:'Ali is taller than Ben. Ben is taller than Cat. Is Ali taller than Cat?',opts:['Yes','No, Cat is taller','We cannot know'],ans:0},task:'Compare 2 pairs, then pick the tallest',
 show:()=>demo(3,[()=>meet(0),()=>meet(1),()=>choose(0)]),
 go:()=>begin(3,'Three doors with Ali, Ben and Cat behind them.',()=>M.all,'Ben was the go-between: Ali beats Ben, Ben beats Cat.')},
{h:'A good go-between',p:'Is the train longer than the tower is tall? You cannot move them. Try a short stick, then a string.',
 predict:{q:'The stick is shorter than both. Will it tell you which is longer?',opts:['Yes','No, both beat the stick','Only if it is red'],ans:1},task:'Find a go-between that gives an answer',
 show:()=>demo(4,[()=>use('stick'),()=>use('string')]),
 go:()=>begin(4,'A toy train on the floor and a block tower on the right.',()=>M.tool==='string','The string was as long as the train, so it could decide.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.ok()});
const QS=[
 {q:'The ribbons start in different places. How do you find the longest?',a:'Line up the starts, then look',x:[['Pick the one that reaches furthest','far'],['Pick the one on top','top']]},
 {q:'A is longer than B. B is longer than C. Which is longest?',a:'A',x:[['C','flip'],['We cannot tell','cant']]},
 {q:'The bed and the gap cannot move. How can you compare them?',a:'Use a string as a go-between',x:[['Just look and guess','guess'],['You cannot compare them','cant']]},
 {q:'Your string is wavy. Your measure will be…',a:'Too long: pull it tight',x:[['Just right','wavy'],['Too short','wavy']]},
 {q:'A stick is shorter than both things. Does it show which is longer?',a:'No, both beat the stick',x:[['Yes, always','stick'],['Yes, if you hold it high','stick']]},
 {q:'Ribbons of 2, 6 and 4 blocks. Shortest to longest?',a:'2, 4, 6',x:[['2, 6, 4','order'],['6, 4, 2','flip']]},
 {q:'Mia is taller than Sam. Sam is taller than Jo. Who is shortest?',a:'Jo',x:[['Mia','flip'],['Sam','mid']]}];
function why(t){let m='Line up the starts and use a tight go-between.';
 if(t==='far'||t==='top')m='Reaching furthest is not the same as longest. Line up the starts first.';
 if(t==='flip')m='Check the words: the first one is longer, so it is the longest. The last one is the shortest.';
 if(t==='cant')m='You can tell. A string, or a middle thing, carries the length across.';
 if(t==='guess')m='Guessing can trick you. A string carries the real length from one thing to the other.';
 if(t==='wavy')m='Wavy string uses up more string, so it says too long. Pull it tight.';
 if(t==='stick')m='If both things are longer than the stick, the stick cannot say which wins.';
 if(t==='order')m='Line them up. 4 is shorter than 6, so 4 comes in the middle.';
 if(t==='mid')m='Sam is taller than Jo, so Sam is not shortest. Jo is.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.x],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);L.redraw()}
function mark(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)L.win();else L.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:S=>{qz.hidden=S.step!==5;bar.hidden=S.step===5;pads()},
 init:S=>{L=S;const w=c.el('div',{class:'fl-below'},S.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Measuring controls'},w);qz=c.el('div',{class:'fl-chal'},S.below);wipe();const A=S;A.gest({down,move,up});pads()}}).start()})})();
