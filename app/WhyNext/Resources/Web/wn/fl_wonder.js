/* Flagship 71 – exploring ideas through talk (ages 4–6): many maybes, a "because" from a clue, a what-if ice test,
new words on pictures, and "yes, and" to grow a friend's idea. */
(()=>{const mn=Math.min,hy=Math.hypot,PI=Math.PI;
const IDEAS=[['☀️','The sun dried it',1],['🌱','It sank into the soil',1],['🐶','A dog drank it',1],['🤐','I don\'t know. Stop.',0]];
const AG='That just says it again. Say why.',WHY=[['Why is Tom\'s coat wet?','rain',[['Because it is raining.',1],['Because it is Tuesday.',0,'Tuesday is not a clue. Look at the picture.'],['Because his coat is wet.',0,AG]]],
['Why did the tower fall?','dog',[['Because towers are red.',0,'Red does not knock a tower down. Look at the picture.'],['Because the dog\'s tail hit it.',1],['Because it fell down.',0,AG]]],
['Why is the ice cream dripping?','sun',[['Because I like ice cream.',0,'That is about you, not the ice cream.'],['Because it is dripping.',0,AG],['Because the sun is hot.',1]]]];
const SPOT=[['Sun',0,'#f59e0b','It melted fast!'],['Shade',.5,'#64748b','It melts, but slowly.'],['Freezer',1,'#38bdf8','It stays ice!']];
const WORD=[['enormous','very, very big'],['tiny','very, very small'],['soggy','wet and soft']];
const PICS=[[1,'a very small ball'],[2,'a biscuit in milk'],[0,'a very big ball']];
const DEN=[['Ava','Let\'s make a den!',[['No. Dens are silly.',0,'"No" stops the idea. Add something to it.'],['Yes, and a blanket can be the roof!',1],['I had toast today.',0,'Toast is not about the den. Add to Ava\'s idea.']]],
['Leo','It is dark in the den.',[['Maybe we could bring a torch!',1],['Then go home.',0,'That ends the game. What could help?'],['Dark is dark.',0,'That just says it again. Add a new idea.']]],
['Mia','We get hungry in there.',[['I am not hungry.',0,'That is about you. Help with Mia\'s idea.'],['Dens are big.',0,'That is not about being hungry.'],['What if we bring a picnic?',1]]]];
VIS.reg('flagwonder',c=>{let A,pad,chal,read;c.fig.classList.add('young');
const S={cloud:[],wq:0,wok:0,ice:1,at:-1,tried:[0,0,0],melt:[1,1,1],busy:0,sel:-1,put:[-1,-1,-1],dq:0,dok:0,
bad:null,hold:null,dp:null,p0:null,want:()=>{},run:0,last:'',Q:null};
const say=t=>{S.last=t;c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
const view=()=>['many','why','test','word','build','quiz'][A.step];
const al=(k,a)=>A.alpha(k,a),rr=(...a)=>A.paint.rrect(...a),Z=z=>A.narrow?z:z+2;
const ft=(x,z,w,al2)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`;x.textAlign=al2||'center';x.textBaseline='middle'};
const tx=(x,t,X,Y,z,k,w)=>{ft(x,z,w);x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
const card=(x,R,k,on,bad)=>{x.fillStyle=al(bad?A.col.rd:k,on?.28:.13);rr(R.x,R.y,R.w,R.h,14);x.fill();x.strokeStyle=bad?A.col.rd:k;x.lineWidth=bad||on?4:2;x.stroke()};
const circ=(x,X,Y,r)=>{x.beginPath();x.arc(X,Y,r,0,7);x.fill()},inside=(p,R)=>R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
const oops=t=>{A.sound.miss();say(t);A.redraw()};
const bars=(x,o,k)=>o.forEach((o,i)=>{const R=bar(i);card(x,R,k,0,S.bad===i);ft(x,15,700);x.fillStyle=A.col.tx;x.fillText(o[0],A.W/2,R.y+R.h/2,R.w-12)});
const quad=i=>{const g=10,w=(A.W-30)/2,h=mn(58,A.H*.13);return{x:10+(i%2)*(w+g),y:A.H-2*(h+g)-2+Math.floor(i/2)*(h+g),w,h}};
const bar=i=>{const h=mn(54,A.H*.12),y0=A.H-3*(h+8)-4;return{x:10,y:y0+i*(h+8),w:A.W-20,h}};
const col3=(i,y,h)=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y,w,h}},zone=i=>col3(i,A.H*.42,A.H*.5),pic=i=>col3(i,A.H*.1,A.H*.46),wcard=i=>{const h=mn(56,A.H*.13);return col3(i,A.H-h-10,h)};
const cloudC=()=>({x:A.W*.66,y:A.H*.31,rx:A.W*.3,ry:A.H*.19});
const iceHome=()=>({x:A.W/2,y:A.H*.2});
function pip(x,X,Y,r,talk){x.fillStyle='#4ade80';x.beginPath();x.arc(X,Y+r*1.3,r*.9,PI,0);x.fill();x.fillStyle='#fde68a';circ(x,X,Y,r*.65);
x.fillStyle='#1f2937';circ(x,X-r*.22,Y-r*.1,r*.08);circ(x,X+r*.22,Y-r*.1,r*.08);x.strokeStyle='#1f2937';x.lineWidth=2;x.beginPath();
if(talk)x.ellipse(X,Y+r*.25,r*.15,r*.12,0,0,7);else x.arc(X,Y+r*.15,r*.22,.2*PI,.8*PI);x.stroke()}
function cloud(x){const C=A.col,k=cloudC();x.fillStyle=C.dark?'#1e293b':'#fff';x.strokeStyle=C.vi;x.lineWidth=2;
[[-.55,.15,.5],[0,-.2,.62],[.55,.1,.5],[0,.35,.55]].forEach(([a,b,s])=>{x.beginPath();x.ellipse(k.x+a*k.rx,k.y+b*k.ry,k.rx*s,k.ry*s*1.2,0,0,7);x.fill()});
[[-.75,.95,.07],[-.9,1.15,.045]].forEach(([a,b,s])=>{x.beginPath();x.arc(k.x+a*k.rx,k.y+b*k.ry,k.rx*s,0,7);x.fill();x.stroke()});
ft(x,13,800);x.fillStyle=C.mu;x.fillText(S.cloud.length?'Pip\'s maybes':'Pip is thinking…',k.x,k.y-k.ry*.62);
S.cloud.forEach((i,j)=>{ft(x,13,700);x.fillStyle=C.tx;x.fillText('Maybe '+IDEAS[i][1].toLowerCase(),k.x,k.y-k.ry*.25+j*Z(17),k.rx*1.8)})}
function puddles(x){const C=A.col,y=A.H*.2,w=A.W*.07;x.fillStyle='#60a5fa';x.beginPath();x.ellipse(A.W*.1,y,w,w*.36,0,0,7);x.fill();x.strokeStyle=C.mu;x.setLineDash([4,4]);x.beginPath();x.ellipse(A.W*.3,y,w,w*.36,0,0,7);x.stroke();x.setLineDash([]);
tx(x,'Yesterday',A.W*.1,y-24,12,C.mu);tx(x,'Today',A.W*.3,y-24,12,C.mu);tx(x,'→',A.W*.2,y,18,C.mu,900);}
function manyView(x){const C=A.col;tx(x,'Where did the puddle go?',A.W/2,16,15,C.tx,800);puddles(x);cloud(x);pip(x,A.W*.2,A.H*.45,mn(A.W,A.H)*.07,S.cloud.length>0);
IDEAS.forEach((d,i)=>{if(S.cloud.includes(i))return;const R=quad(i),drag=S.hold===i&&S.dp,dx=drag?S.dp.x-S.p0.x:0,dy=drag?S.dp.y-S.p0.y:0;
const Q={x:R.x+dx,y:R.y+dy,w:R.w,h:R.h};card(x,Q,d[2]?C.cy:C.mu,drag,S.bad===i);ft(x,14,700);x.fillStyle=C.tx;x.fillText(d[0]+' '+d[1],Q.x+Q.w/2,Q.y+Q.h/2,Q.w-10)});
if(S.cloud.length>=3)tx(x,'Three maybes! All could be true.',A.W/2,A.H*.56,14,C.gr,800)}
function clue(x,k,X,Y,s){const C=A.col;
if(k==='rain'){x.fillStyle='#94a3b8';[[-.4,0,.35],[0,-.15,.45],[.4,0,.35]].forEach(([a,b,r])=>circ(x,X+a*s,Y+b*s,r*s));x.strokeStyle='#3b82f6';x.lineWidth=3;
for(let i=0;i<5;i++){const dx=X+(i-2)*s*.25;x.beginPath();x.moveTo(dx,Y+s*.45);x.lineTo(dx-s*.08,Y+s*.75);x.stroke()}}
else if(k==='dog'){x.fillStyle='#ef4444';x.fillRect(X+s*.2,Y+s*.4,s*.3,s*.3);x.fillStyle='#3b82f6';x.save();x.translate(X+s*.65,Y+s*.55);x.rotate(.6);x.fillRect(-s*.15,-s*.15,s*.3,s*.3);x.restore();
x.fillStyle='#a16207';x.beginPath();x.ellipse(X-s*.35,Y+s*.4,s*.38,s*.22,0,0,7);x.fill();circ(x,X-s*.75,Y+s*.2,s*.2);x.strokeStyle='#a16207';x.lineWidth=s*.08;x.lineCap='round';
x.beginPath();x.moveTo(X,Y+s*.35);x.quadraticCurveTo(X+s*.2,Y+s*.1,X+s*.15,Y-s*.05);x.stroke();x.lineCap='butt';tx(x,'swish!',X+s*.25,Y-s*.2,12,C.am,800)}
else{x.fillStyle='#facc15';circ(x,X-s*.5,Y-s*.2,s*.3);x.fillStyle='#d97706';x.beginPath();x.moveTo(X+s*.1,Y+s*.1);x.lineTo(X+s*.5,Y+s*.1);x.lineTo(X+s*.3,Y+s*.75);x.closePath();x.fill();
x.fillStyle='#f9a8d4';circ(x,X+s*.3,Y+s*.02,s*.22)}}
function whyView(x){const C=A.col;if(S.wok>=3)return tx(x,'You gave a reason every time!',A.W/2,A.H/2,A.narrow?17:20,C.gr,800);
const W=WHY[S.wq];tx(x,W[0],A.W/2,A.H*.08,16,C.tx,800);clue(x,W[1],A.W/2,A.H*.24,mn(A.W,A.H)*.2);
bars(x,W[2],C.vi)}
function iceAt(x,X,Y,sz){const C=A.col,s=mn(A.W,A.H)*.07*sz;if(sz>.02){x.fillStyle=al('#bae6fd',.95);rr(X-s,Y-s,2*s,2*s,s*.3);x.fill();x.strokeStyle='#0284c7';x.lineWidth=2;x.stroke()}
const pool=1-sz;if(pool>.02){x.fillStyle=al('#3b82f6',.45);x.beginPath();x.ellipse(X,Y+mn(A.W,A.H)*.075,mn(A.W,A.H)*.09*(.4+pool),6+6*pool,0,0,7);x.fill()}}
function testView(x){const C=A.col;SPOT.forEach((s,i)=>{const R=zone(i);card(x,R,s[2],S.at===i,0);tx(x,s[0],R.x+R.w/2,R.y+18,14,C.tx,800);
if(i===0){x.fillStyle='#facc15';circ(x,R.x+R.w-18,R.y+18,10)}
if(S.tried[i]){iceAt(x,R.x+R.w/2,R.y+R.h*.55,S.at===i?S.ice:S.melt[i]);tx(x,S.melt[i]<.1?'melted':S.melt[i]<1?'smaller':'still ice',R.x+R.w/2,R.y+R.h-16,12,C.mu,800)}});
const h=S.hold!=null&&S.dp?S.dp:iceHome();if(!S.busy)iceAt(x,h.x,h.y,1);
tx(x,S.tried.every(Boolean)?'Sun: fast. Shade: slow. Freezer: no melting.':'Drag the ice to a place. What will happen?',A.W/2,A.H*.06,13,S.tried.every(Boolean)?C.gr:C.mu,800)}
function wordView(x){const C=A.col;PICS.forEach((p,i)=>{const R=pic(i),k=p[0];card(x,R,C.cy,0,S.bad===i);const cx=R.x+R.w/2,cy=R.y+R.h*.45,s=mn(R.w,R.h);
if(k<2)A.paint.ball(cx,cy,s*(k?.05:.36),'#f97316');else{x.fillStyle=al('#e0f2fe',.9);x.strokeStyle='#94a3b8';x.lineWidth=2;rr(cx-s*.25,cy-s*.12,s*.5,s*.36,6);x.fill();x.stroke();
x.fillStyle='#b45309';x.save();x.translate(cx,cy-s*.1);x.rotate(.35);rr(-s*.08,-s*.2,s*.16,s*.32,4);x.fill();x.restore();x.fillStyle='#b45309';circ(x,cx+s*.06,cy+s*.02,s*.025)}
const w=S.put.indexOf(i);tx(x,w>=0?WORD[w][0]+'!':'?',cx,R.y+R.h-16,15,w>=0?C.gr:C.mu,900)});
WORD.forEach((w,i)=>{if(S.put[i]>=0)return;const R=wcard(i),drag=S.hold===i&&S.dp,Q=drag?{x:S.dp.x-R.w/2,y:S.dp.y-R.h/2,w:R.w,h:R.h}:R;
card(x,Q,C.vi,S.sel===i||drag,0);ft(x,16,800);x.fillStyle=C.tx;x.fillText(w[0],Q.x+Q.w/2,Q.y+Q.h/2,Q.w-8)});
if(S.put.every(k=>k>=0))tx(x,'Three new words to use when you talk!',A.W/2,A.H*.68,14,C.gr,800)}
function den(x,X,Y,s,n){const C=A.col;x.fillStyle='#a16207';[-1,1].forEach(k=>{x.fillRect(X+k*s*.8-s*.06,Y-s*.5,s*.12,s*.8)});x.fillRect(X-s*.9,Y+s*.28,s*1.8,s*.06);
if(n>0){x.fillStyle='#ec4899';x.beginPath();x.moveTo(X-s*1.05,Y+s*.3);x.lineTo(X,Y-s*.75);x.lineTo(X+s*1.05,Y+s*.3);x.closePath();x.fill()}
if(n>1){x.fillStyle=al('#fde047',.8);x.beginPath();x.moveTo(X-s*.1,Y);x.lineTo(X-s*.55,Y+s*.3);x.lineTo(X+s*.35,Y+s*.3);x.closePath();x.fill();x.fillStyle='#374151';x.fillRect(X-s*.16,Y-s*.06,s*.12,s*.1)}
if(n>2){x.fillStyle='#92400e';rr(X+s*.35,Y+s*.08,s*.32,s*.2,4);x.fill();x.fillStyle='#ef4444';circ(x,X+s*.45,Y+s*.04,s*.06)}
tx(x,['Two chairs','Blanket roof','Torch light','Picnic too'][n],X,Y+s*.5,12,C.mu,800)}
function buildView(x){const C=A.col,s=mn(A.W*.17,A.H*.16);if(S.dok>=3){den(x,A.W/2,A.H*.4,s*1.8,3);return tx(x,'One idea grew into a great den!',A.W/2,A.H*.85,15,C.gr,800)}den(x,A.W*.24,A.H*.22,s,S.dok);
const D=DEN[S.dq];tx(x,D[0]+' says:',A.W*.68,A.H*.14,13,C.mu);tx(x,'"'+D[1]+'"',A.W*.68,A.H*.24,15,C.tx,800);
bars(x,D[2],C.gr)}
function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);x.fillRect(0,0,W,H);
const f={many:manyView,why:whyView,test:testView,word:wordView,build:buildView}[v];if(f)f(x);else{x.textAlign='center';x.fillStyle=al(C.vi,.5);x.font=`900 ${mn(W,H)*.16}px system-ui`;x.fillText(S.Q?S.Q.big:'💭',W/2,H/2)}A.fx.draw(x)}
function think(i){if(S.cloud.includes(i)||S.cloud.length>=3&&IDEAS[i][2])return;if(!IDEAS[i][2]){S.bad=i;return oops('"I don\'t know" stops the thinking. Try a maybe instead.')}
S.bad=null;S.cloud.push(i);A.sound.pop();status()}
const pick=(L,q,k)=>i=>{if(S[k]>=3)return;const o=L[S[q]][2][i];if(!o[1]){S.bad=i;return oops(o[2])}S.bad=null;S[k]++;S[q]=mn(2,S[k]);A.sound.pop();status()},because=pick(WHY,'wq','wok'),build=pick(DEN,'dq','dok');
function place(i){if(S.busy)return;S.at=i;S.busy=1;S.ice=1;S.tried[i]=1;S.melt[i]=1;A.sound.step();say('What if we put it in the '+SPOT[i][0].toLowerCase()+'? Watch…');const r=S.run;
A.tween(S,{ice:SPOT[i][1]},1300,'io',()=>{if(r!==S.run)return;S.melt[i]=SPOT[i][1];S.busy=0;status();say(SPOT[i][0]+': '+SPOT[i][3]+(S.tried.every(Boolean)?' You tested every what if.':''))})}
function give(w,p){if(S.put[w]>=0)return;if(PICS[p][0]!==w){S.bad=p;S.sel=-1;return oops(`${WORD[w][0]} means ${WORD[w][1]}. Is it ${PICS[p][1]}? Look again.`)}
S.bad=null;S.sel=-1;S.put[w]=p;A.sound.pop();status()}
function status(){const v=view();let t;
if(v==='many')t=S.cloud.length>=3?'Pip has three maybes: '+S.cloud.map(i=>IDEAS[i][1]).join(', ')+'.':`Where did the puddle go? Pip has ${S.cloud.length} of 3 maybes.`;
else if(v==='why')t=S.wok>=3?'Three good reasons.':WHY[S.wq][0]+' Use the picture clue.';
else if(v==='test')t=S.tried.every(Boolean)?'Sun melts it fast, shade slowly, the freezer not at all.':'Ice test: put the ice somewhere.';
else if(v==='word')t=S.put.every(k=>k>=0)?'Enormous ball, tiny ball, soggy biscuit.':S.sel>=0?`You picked ${WORD[S.sel][0]}. Now pick a picture.`:'Pick a word for a picture.';
else if(v==='build')t=S.dok>=3?'The den has a roof, a torch and a picnic.':`${DEN[S.dq][0]}: "${DEN[S.dq][1]}" Add to the idea.`;
else t='Challenge time.';say(t);sync();S.want()}
function sync(){if(!A)return;if(!pad)return A.redraw();pad.innerHTML='';const v=view();
const B=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f;return e};
if(v==='many')IDEAS.forEach((d,i)=>B(d[1],()=>think(i),S.cloud.includes(i)||S.cloud.length>=3,'Idea: '+d[1]));
if(v==='why'&&S.wok<3)WHY[S.wq][2].forEach((o,i)=>B(o[0],()=>because(i)));
if(v==='test')SPOT.forEach((s,i)=>B('Ice in the '+s[0].toLowerCase(),()=>place(i),S.busy));
if(v==='word'&&!S.put.every(k=>k>=0)){WORD.forEach((w,i)=>{if(S.put[i]<0){const e=B(w[0],()=>{S.sel=i;status()},0,'Word: '+w[0]);e.setAttribute('aria-pressed',String(S.sel===i))}});
PICS.forEach((p,i)=>{if(!S.put.includes(i))B('Picture '+(i+1),()=>{if(S.sel>=0)give(S.sel,i);else oops('Pick a word first.')},0,`Picture ${i+1}: ${p[1]}`)})}
if(v==='build'&&S.dok<3)DEN[S.dq][2].forEach((o,i)=>B(o[0],()=>build(i)));A.redraw()}
const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
const seq=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
const fresh=()=>{S.run++;S.want=()=>{};S.Q=null;S.hold=null;S.dp=null;S.bad=null;S.sel=-1;S.busy=0};
const steps=[
{h:'Lots of maybes',p:'The puddle has gone. Where did it go? Drag idea cards into Pip\'s thinking cloud, or tap them.',
predict:{q:'Pip has one idea. Should Pip stop thinking?',opts:['Yes, one is enough','No, think of more'],ans:1},task:'Give Pip three maybes',
show:()=>{steps[0].go();seq([0,1,2].map(i=>()=>think(i)),350)},go:()=>{fresh();S.cloud=[];status();S.want=fin(0,()=>S.cloud.length>=3,()=>'The sun, the soil and a dog could all be true. Saying "maybe" keeps ideas coming.')}},
{h:'Say "because"',p:'Look at the picture clue. Tap the "because" that tells why.',task:'Give three reasons',
show:()=>{steps[1].go();seq([0,1,2].map(()=>()=>because(WHY[S.wq][2].findIndex(o=>o[1]))),350)},
go:()=>{fresh();S.wq=0;S.wok=0;status();S.want=fin(1,()=>S.wok>=3,()=>'A good "because" uses a clue you can see. It does not just say the same thing again.')}},
{h:'What if…?',p:'"What if we put the ice in the sun?" Drag the ice cube to a place, or tap a button. Watch what happens.',
predict:{q:'What if the ice goes in the freezer? Will it melt?',opts:['Yes, it melts','No, it stays ice'],ans:1},task:'Test all three places',
show:()=>{steps[2].go();seq([0,1,2].map(i=>()=>place(i)),1500)},go:()=>{fresh();S.at=-1;S.tried=[0,0,0];S.melt=[1,1,1];S.ice=1;status();S.want=fin(2,()=>S.tried.every(Boolean)&&!S.busy,()=>'You asked "what if?" and then tested it. Warm places melt ice. The freezer keeps it cold.')}},
{h:'Try a new word',p:'New words make talk better. Drag each word to its picture. Or tap a word, then tap a picture.',task:'Give every picture its new word',
show:()=>{steps[3].go();seq([0,1,2].map(w=>()=>give(w,PICS.findIndex(p=>p[0]===w))),350)},
go:()=>{fresh();S.put=[-1,-1,-1];status();S.want=fin(3,()=>S.put.every(k=>k>=0),()=>'Enormous, tiny, soggy. Try them out today when you talk!')}},
{h:'Yes, and…',p:'Friends are making a den. Tap the answer that adds to their idea.',
predict:{q:'Ava says "Let\'s make a den!" Leo says "No, dens are silly." Does that help?',opts:['Yes, it helps','No, it stops the idea'],ans:1},task:'Build the den with three ideas',
show:()=>{steps[4].go();seq([0,1,2].map(()=>()=>build(DEN[S.dq][2].findIndex(o=>o[1]))),350)},
go:()=>{fresh();S.dq=0;S.dok=0;status();S.want=fin(4,()=>S.dok>=3,()=>'"Yes, and…", "maybe" and "what if" made one small idea grow.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
const QZ={more:['Where did the snowman go? Pip has one idea. What next?','⛄',[['Think of more maybes','ok'],['Stop at one idea','one'],['Say "I don\'t know"','stop']]],
why:['Which one tells WHY the grass is wet?','🌧️',[['Because it rained in the night','ok'],['Because the grass is wet','again'],['Because grass is green','noclue']]],
what:['What if you put a lolly in the freezer?','🍭',[['It stays frozen','ok'],['It melts fast','melt'],['It turns to juice','melt']]],
big:['Which new word means very, very big?','🐘',[['enormous','ok'],['tiny','tiny'],['soggy','soggy']]],
add:['Leo says, "Let\'s build a boat." What adds to his idea?','⛵',[['Yes, and it can have a sail!','ok'],['No, boats are silly.','no'],['I like cake.','off']]],
start:['Which words help you wonder?','💭',[['"Maybe…" and "What if…?"','ok'],['"No."','no'],['"Stop."','stop']]]};
let qi=-1,run=0;
function ask(){qi++;const K=Object.keys(QZ),k=K[qi%K.length],rot=qi%3,[q,big,ops]=QZ[k];S.Q={big};
chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tag)});say('Challenge: '+q);A.redraw()}
function judge(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
switch(tag){case 'ok':m='Yes!';break;
case 'one':m='One idea is a start. Say "maybe" and find more.';break;
case 'stop':m='"I don\'t know" or "stop" ends the thinking. Try "maybe".';break;
case 'again':m='That just says it again. A reason says why.';break;
case 'noclue':m='Green is not why it is wet. Use a clue.';break;
case 'melt':m='The freezer is very cold, so it stays frozen.';break;
case 'tiny':m='Tiny means very, very small.';break;
case 'soggy':m='Soggy means wet and soft.';break;
case 'no':m='"No" stops the idea. Add to it with "yes, and".';break;
default:m='That is not about the boat. Add to Leo\'s idea.'}
const ok=tag==='ok';if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
function down(p){const v=view();S.p0=p;S.dp=null;S.hold=null;
if(v==='many'){const i=IDEAS.findIndex((d,i)=>!S.cloud.includes(i)&&inside(p,quad(i)));if(i>=0){S.hold=i;return true}return false}
if(v==='why'&&S.wok<3){const i=[0,1,2].find(i=>inside(p,bar(i)));if(i!=null)because(i);return false}
if(v==='test'&&!S.busy){const h=iceHome();if(hy(p.x-h.x,p.y-h.y)<mn(A.W,A.H)*.12){S.hold=0;return true}const i=[0,1,2].find(i=>inside(p,zone(i)));if(i!=null)place(i);return false}
if(v==='word'){const w=WORD.findIndex((d,i)=>S.put[i]<0&&inside(p,wcard(i)));if(w>=0){S.hold=w;return true}const k=[0,1,2].find(i=>inside(p,pic(i)));if(k!=null&&S.sel>=0)give(S.sel,k);return false}
if(v==='build'&&S.dok<3){const i=[0,1,2].find(i=>inside(p,bar(i)));if(i!=null)build(i)}return false}
function up(p){const v=view(),i=S.hold,moved=S.p0&&hy(p.x-S.p0.x,p.y-S.p0.y)>12;S.hold=null;S.dp=null;if(i==null)return A.redraw();
if(v==='many'){const k=cloudC();if(!moved||hy((p.x-k.x)/k.rx,(p.y-k.y)/k.ry)<1.2)think(i);else A.redraw()}
else if(v==='test'){const z=[0,1,2].find(j=>inside(p,zone(j)));if(z!=null)place(z);else A.redraw()}
else if(v==='word'){if(!moved){S.sel=S.sel===i?-1:i;return status()}const k=[0,1,2].find(j=>inside(p,pic(j)));if(k!=null)give(i,k);else A.redraw()}}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
A.gest({down,move:p=>{S.dp=p;A.redraw()},up});sync()}});
A.start()})})();
