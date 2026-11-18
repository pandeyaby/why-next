/* Flagship: present perfect (ages 7-11; NC Y3, CCSS L.5.1b). has/have + participle, timelines, time words, gone vs been,
   slips. flagtense is simple past and progressive. */
(()=>{
const BUILD=[{s:'I',h:'have',p:'eaten',x:'ate',e:'my lunch.'},{s:'She',h:'has',p:'gone',x:'went',e:'out.'},{s:'They',h:'have',p:'seen',x:'saw',e:'the film.'},{s:'Tom',h:'has',p:'written',x:'wrote',e:'a card.'}];
const LINE=[['I ate lunch at 12.',0,'At 12 is a finished time, so it is the simple past.'],['I have eaten, so I am not hungry.',1,'Have eaten links the past to now: I am not hungry now.'],
['We lived in Leeds in 2019.',0,'In 2019 is over and done, so it is the simple past.'],['We have lived here since 2019.',1,'Since 2019 runs right up to now. We still live here.'],
['She has lost her key. She can’t get in.',1,'The key is still lost now, so has lost.'],['She lost her key last week.',0,'Last week is a finished time, so lost.']];
const TW=[['yesterday',0],['already',1],['last week',0],['yet',1],['two days ago',0],['ever',1],['in 2019',0],['since Monday',1]];
const TEG=['I saw it yesterday.','I have already seen it.','I saw it last week.','Have you seen it yet?','I saw it two days ago.','Have you ever seen it?','I saw it in 2019.','I have been here since Monday.'];
const WHERE=[['Dad has gone to the park.',1,'At the park','Has gone: he went and he is not back yet. He is at the park.'],['Dad has been to the park.',0,'At the park','Has been: he went and came back. He is home now.'],
['Mia has gone to Spain.',1,'In Spain','Has gone: she is still away, in Spain.'],['Mia has been to Spain.',0,'In Spain','Has been: she visited and came home.']];
const FIX=[{w:['She','have','finished','her','work.'],b:1,f:'has',y:'She is one person, so has: she has finished.'},{w:['I','have','went','home.'],b:2,f:'gone',y:'After have, use the past participle: gone, not went.'},
{w:['We','have','seen','it','last','night.'],b:1,f:'saw',y:'Last night is a finished time, so the simple past: We saw it last night.'},{w:['Has','you','done','it','yet?'],b:0,f:'Have',y:'You takes have: Have you done it yet?'}];
VIS.reg('flagpperf',c=>{let A,pad,quiz,qn=-1,gen=0;const Z={};c.fig.classList.add('young');
const DK='#0f172a',GR='#047857',RD='#b91c1c',GY='#64748b',BL='#1d4ed8',PU='#6d28d9',FAM='system-ui,sans-serif';
const font=(px,wt)=>(wt||800)+' '+px+'px '+FAM,S=v=>A.narrow?v:Math.round(v*1.2);
const stepKey=()=>['build','line','words','where','fix','chal'][A.step];
const within=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const ding=()=>A.sound.pop(),buzz=()=>A.sound.miss();
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.07:.45);g.fillRect(0,0,A.W,A.H)}
function label(txt,cx,cy,o){o=o||{};const g=A.ctx;let px=S(o.px||14);g.font=font(px);let wd=g.measureText(txt).width+22;while(wd>A.W-12&&px>10){px--;g.font=font(px);wd=g.measureText(txt).width+22}
const ht=px+15,lx=Math.max(6,Math.min(A.W-wd-6,cx-wd/2));g.fillStyle='#ffffff';A.paint.rrect(lx,cy-ht/2,wd,ht,8);g.fill();g.strokeStyle=o.good?GR:o.bad?RD:GY;g.lineWidth=o.good||o.bad?3:1.5;g.stroke();
g.fillStyle=DK;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,lx+wd/2,cy+1)}
function tile(b,txt,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=o.good?GR:o.bad?RD:o.hot?BL:GY;g.lineWidth=o.good||o.bad||o.hot?4:2;
if(o.dash)g.setLineDash([7,5]);g.stroke();g.setLineDash([]);if(!txt)return;let px=o.px||S(19);g.font=font(px,o.wt);while(g.measureText(txt).width>b.w-10&&px>10){px--;g.font=font(px,o.wt)}
g.fillStyle=o.ink||DK;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,b.x+b.w/2,b.y+b.h/2+1)}
function grid(n,cols,top,bot,maxW){const gp=10,rows=Math.ceil(n/cols),w=Math.min(maxW||170,(A.W-gp*(cols+1))/cols),h=Math.min(64,(bot-top-gp*(rows-1))/rows),x0=(A.W-(cols*w+(cols-1)*gp))/2;
return Array.from({length:n},(_,i)=>({i,x:x0+(i%cols)*(w+gp),y:top+Math.floor(i/cols)*(h+gp),w,h}))}
function bSlots(){const w=Math.min(120,(A.W-40)/3),h=Math.min(70,A.H*.16),y=A.H*.2,x0=(A.W-3*w-20)/2;return[0,1,2].map(j=>({x:x0+j*(w+10),y,w,h}))}
function bTiles(){const t=BUILD[Math.min(Z.B.k,3)];return grid(4,2,A.H*.6,A.H*.95,150).map((r,i)=>({...r,v:['has','have',t.p,t.x][[0,2,1,3][i]]}))}
function drawBuild(){const s=Z.B;ground();
if(s.k>=4){label('4 sentences built',A.W/2,A.H*.07,{good:1});BUILD.forEach((t,j)=>label(`${t.s} ${t.h} ${t.p} ${t.e}`,A.W/2,A.H*(.24+j*.15),{px:17,good:1}));label('has or have + past participle',A.W/2,A.H*.88,{px:12});return}
const t=BUILD[s.k];label(`Sentence ${s.k+1} of 4: tap has or have, then the verb`,A.W/2,A.H*.07,{px:13});const R=bSlots();
tile(R[0],t.s,{good:1});tile(R[1],s.h,{dash:!s.h,good:!!s.h,ink:PU});tile(R[2],null,{dash:1});
const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(S(16),700);g.textAlign='center';g.textBaseline='middle';g.fillText('… '+t.e,A.W/2,R[0].y+R[0].h+24);
bTiles().forEach(b=>tile(b,b.v,{bad:s.bad===b.v,ink:b.v[0]==='h'?PU:DK}))}
function pickB(v){const s=Z.B;if(s.k>=4)return;const t=BUILD[s.k],helper=v==='has'||v==='have';
if(!s.h){if(!helper){buzz();s.bad=v;return say(`First the helper verb: has or have. Then ${t.p}.`)}
if(v!==t.h){buzz();s.bad=v;return say(t.h==='has'?`${t.s} is one person, so use has.`:`${t.s} takes have, not has.`)}
s.h=v;s.bad=null;ding();return say(`${t.s} ${v}. Now the verb.`)}
if(helper){buzz();s.bad=v;return say(`You already have ${s.h}. Now choose the verb.`)}
if(v!==t.p){buzz();s.bad=v;return say(`${t.x} is the simple past. After ${s.h}, use the past participle: ${t.p}.`)}
ding();s.k++;s.h=null;s.bad=null;say(`${t.s} ${t.h} ${t.p} ${t.e}`+(s.k>=4?' 4 built. Has or have, then the past participle.':''))}
function panels(){const w=(A.W-30)/2,h=A.H*.42;return[{x:10,y:A.H*.53,w,h},{x:20+w,y:A.H*.53,w,h}]}
function sCard(){const w=Math.min(360,A.W-24),h=Math.min(70,A.H*.15);return{x:A.W/2-w/2,y:A.H*.2,w,h}}
function timeline(b,j,lit){const g=A.ctx;g.fillStyle=lit?'#ecfdf5':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=lit?GR:GY;g.lineWidth=lit?3:2;g.stroke();
g.fillStyle=DK;g.font=font(S(12));g.textAlign='center';g.textBaseline='top';g.fillText(j?'Past linked to now':'Finished past time',b.x+b.w/2,b.y+8);
const y=b.y+b.h*.6,x0=b.x+12,x1=b.x+b.w-14,nx=x1-10;g.strokeStyle=GY;g.lineWidth=2;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
g.fillStyle=BL;g.font=font(S(11));g.fillText('NOW',nx,y+12);g.fillRect(nx-1.5,y-14,3,28);const px=b.x+b.w*.3;
if(j){g.strokeStyle=PU;g.lineWidth=5;g.beginPath();g.moveTo(px,y-8);g.lineTo(nx-8,y-8);g.stroke();g.fillStyle=PU;g.beginPath();g.moveTo(nx-2,y-8);g.lineTo(nx-12,y-15);g.lineTo(nx-12,y-1);g.fill()}
else{g.strokeStyle=DK;g.lineWidth=2;g.strokeRect(px-26,y-22,52,30);g.fillStyle=PU;g.beginPath();g.arc(px,y-7,6,0,7);g.fill();g.fillStyle=DK;g.fillText('over',px,y+12)}
g.fillStyle=GY;g.font=font(S(11),700);g.fillText(j?'has / have + verb':'one past verb',b.x+b.w/2,b.y+b.h-S(18))}
function drawLine(){const s=Z.L;ground();label(s.k>=6?'All 6 matched':`Sentence ${s.k+1} of 6: drag it to a timeline, or tap one`,A.W/2,A.H*.07,{px:13,good:s.k>=6});
panels().forEach((b,j)=>timeline(b,j,s.lit===j));if(s.k<6){const r=sCard(),d=Z.drag;tile(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,LINE[s.k][0],{px:S(16),bad:s.bad,hot:!!d,wt:700})}}
function dropL(j){const s=Z.L;if(s.k>=6)return;const [,ok,why]=LINE[s.k];
if(j!==ok){s.bad=1;buzz();return say(`Look again. ${why}`)}s.k++;s.bad=0;s.lit=j;ding();say(why+(s.k>=6?' All 6 matched.':''))}
function wTiles(){return grid(8,A.narrow?2:4,A.H*.17,A.H*.62,160)}
function jars(){const w=(A.W-30)/2,e=Z.W.got.length>=8,h=A.H*(e?.6:.3),y=A.H*(e?.2:.67);return[{x:10,y,w,h},{x:20+w,y,w,h}]}
function drawWords(){const s=Z.W,g=A.ctx;ground();label(s.got.length>=8?'All 8 sorted':s.sel==null?'Tap a time word':'Now tap the tense it goes with',A.W/2,A.H*.07,{px:13,good:s.got.length>=8});
wTiles().forEach(b=>{const [w,k]=TW[b.i],done=s.got.includes(b.i);if(done)return;tile(b,w,{hot:s.sel===b.i,bad:s.bad===b.i,px:S(16)})});
jars().forEach((b,j)=>{g.fillStyle=j?'#f5f3ff':'#f8fafc';A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=j?PU:GY;g.lineWidth=2.5;g.stroke();
g.fillStyle=DK;g.textAlign='center';g.textBaseline='top';g.font=font(S(15),900);g.fillText(j?'have seen':'saw',b.x+b.w/2,b.y+6);g.font=font(S(11),700);g.fillText(j?'present perfect':'simple past',b.x+b.w/2,b.y+S(24));
g.font=font(S(11),700);s.got.filter(i=>TW[i][1]===j).forEach((i,q)=>g.fillText(TW[i][0],b.x+b.w/2,b.y+S(40)+q*S(15)))})}
function pickW(i){const s=Z.W;if(s.got.includes(i))return;s.sel=i;s.bad=null;A.sound.tick();say(`${TW[i][0]}. Which tense does it go with?`)}
function jarW(j){const s=Z.W;if(s.sel==null)return say('Tap a time word first.');const i=s.sel,[w,k]=TW[i];
if(j!==k){s.bad=i;buzz();return say(k?`${w} goes with the present perfect: ${TEG[i]} It links to now.`:`${w} is a finished time, so the simple past: ${TEG[i]}`)}
s.got.push(i);s.sel=null;s.bad=null;ding();say(`${w}: ${k?'present perfect':'simple past'}. ${TEG[i]}`+(s.got.length>=8?' All 8 sorted.':''))}
function places(){const w=Math.min(150,A.W*.4),h=A.H*.36,y=A.H*.42;return[{x:A.W*.27-w/2,y,w,h},{x:A.W*.73-w/2,y,w,h}]}
function house(b,name,isHome){const g=A.ctx,cx=b.x+b.w/2;g.fillStyle='#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=GY;g.lineWidth=2;g.stroke();
g.fillStyle=isHome?'#fca5a5':'#86efac';g.beginPath();if(isHome){g.moveTo(cx-34,b.y+46);g.lineTo(cx,b.y+16);g.lineTo(cx+34,b.y+46)}else{g.arc(cx,b.y+36,22,0,7)}g.fill();
if(isHome){g.fillStyle='#fde68a';g.fillRect(cx-26,b.y+46,52,34);g.strokeStyle=DK;g.strokeRect(cx-26,b.y+46,52,34)}else{g.fillStyle='#a16207';g.fillRect(cx-4,b.y+56,8,24)}
g.fillStyle=DK;g.font=font(S(13));g.textAlign='center';g.textBaseline='middle';g.fillText(name,cx,b.y+b.h-16)}
function person(x,y){const g=A.ctx;g.fillStyle=BL;g.beginPath();g.arc(x,y-24,9,0,7);g.fill();g.fillRect(x-7,y-14,14,22);g.fillRect(x-7,y+8,5,12);g.fillRect(x+2,y+8,5,12)}
function drawWhere(){const s=Z.P,g=A.ctx;ground();
if(s.k>=4){label('All 4 placed',A.W/2,A.H*.07,{good:1});['has gone = still there','has been = there and back'].forEach((t,j)=>label(t,A.W/2,A.H*(.35+j*.2),{px:17,good:1}));return}
const t=WHERE[s.k];label(`${s.k+1} of 4: where is ${t[0].split(' ')[0]} now? Tap the place`,A.W/2,A.H*.07,{px:13});tile(sCard(),t[0],{px:S(18)});
const P=places();P.forEach((b,j)=>{house(b,j?t[2]:'At home',!j);if(s.bad===j){g.strokeStyle=RD;g.lineWidth=4;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke()}});
if(s.at!=null){const b=P[s.at];person(b.x+b.w*.8,b.y+b.h*.55)}}
function placeP(j){const s=Z.P;if(s.k>=4)return;const t=WHERE[s.k];
if(j!==t[1]){s.bad=j;s.at=j;buzz();return say(t[1]?'Not home yet. Has gone means the person went and is not back.':'Has been means the trip is over. They went and came back home.')}
s.at=null;s.bad=null;s.k++;ding();say(t[3]+(s.k>=4?' Gone: still away. Been: there and back.':''))}
function fBoxes(){const L=FIX[Math.min(Z.F.k,3)],g=A.ctx;g.font=font(S(20),700);const ws=L.w.map(w=>Math.max(44,g.measureText(w).width+20)),gp=8,tot=ws.reduce((a,b)=>a+b,0)+gp*(ws.length-1);
let sc=Math.min(1,(A.W-16)/tot),x=(A.W-tot*sc)/2;return ws.map((w,i)=>{const b={i,x,y:A.H*.34,w:w*sc,h:S(50)};x+=(w+gp)*sc;return b})}
function drawFix(){const s=Z.F;ground();
if(s.k>=4){label('All 4 fixed',A.W/2,A.H*.07,{good:1});['She has finished her work.','I have gone home.','We saw it last night.','Have you done it yet?'].forEach((t,j)=>label(t,A.W/2,A.H*(.24+j*.16),{px:17,good:1}));return}
label(`Line ${s.k+1} of 4: one word is wrong. Tap it.`,A.W/2,A.H*.07,{px:13});const L=FIX[s.k];fBoxes().forEach(b=>tile(b,L.w[b.i],{bad:s.bad===b.i,px:S(19),wt:700}));label('Check has/have, the verb form and time words',A.W/2,A.H*.7,{px:12})}
function tapF(i){const s=Z.F;if(s.k>=4)return;const L=FIX[s.k];
if(i!==L.b){s.bad=i;buzz();return say(`${L.w[i]} is fine. Check has/have, the verb and time words.`)}
s.bad=null;s.k++;ding();say(`${L.w[i]} becomes ${L.f}. ${L.y}`+(s.k>=4?' All 4 fixed.':''))}
function draw(){const k=stepKey();if(k==='chal'){ground();label('Challenge',A.W/2,A.H*.16,{good:1});label('I have learned it!',A.W/2,A.H*.5,{px:17});return}
({build:drawBuild,line:drawLine,words:drawWords,where:drawWhere,fix:drawFix})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stepKey();
if(k==='build'&&Z.B.k<4){const b=bTiles().find(b=>within(p,b));if(b)pickB(b.v);return false}
if(k==='line'&&Z.L.k<6){if(within(p,sCard())){Z.drag={x:p.x,y:p.y};return true}const j=panels().findIndex(b=>within(p,b));if(j>=0)dropL(j);return false}
if(k==='words'){const b=wTiles().find(b=>within(p,b)&&!Z.W.got.includes(b.i));if(b)pickW(b.i);else{const j=jars().findIndex(b=>within(p,b));if(j>=0)jarW(j)}return false}
if(k==='where'){const j=places().findIndex(b=>within(p,b));if(j>=0)placeP(j);return false}
if(k==='fix'&&Z.F.k<4){const b=fBoxes().find(b=>within(p,b));if(b)tapF(b.i)}return false}
function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){if(!Z.drag)return;Z.drag=null;const j=panels().findIndex(b=>within(p,b));if(j>=0)dropL(j);else A.redraw()}
function fresh(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{B:{k:0},L:{k:0},W:{got:[]},P:{k:0},F:{k:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();Z.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();say(desc);Z.hook=watch(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=stepKey(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='build'&&Z.B.k<4)bTiles().forEach(b=>Bt(b.v,()=>pickB(b.v)));
if(k==='line'&&Z.L.k<6){Bt('Finished past time',()=>dropL(0));Bt('Past linked to now',()=>dropL(1))}
if(k==='words'){if(Z.W.sel==null)TW.forEach(([w],i)=>{if(!Z.W.got.includes(i))Bt(w,()=>pickW(i))});else{Bt('saw (simple past)',()=>jarW(0));Bt('have seen (present perfect)',()=>jarW(1))}}
if(k==='where'&&Z.P.k<4){Bt('At home',()=>placeP(0));Bt(WHERE[Z.P.k][2],()=>placeP(1))}
if(k==='fix'&&Z.F.k<4)FIX[Z.F.k].w.forEach((w,i)=>Bt(w,()=>tapF(i),`Is ${w} wrong?`))}
const steps=[
{h:'Build it',p:'The present perfect has two parts: has or have, then the past participle, like eaten or gone. Build each sentence.',
predict:{q:'I have ___ my lunch. Which word fits?',opts:['ate','eaten'],ans:1},task:'Build all 4 sentences',
show:()=>demo(0,BUILD.flatMap(t=>[()=>pickB(t.h),()=>pickB(t.p)]),600),
go:()=>begin(0,'I, two empty boxes, my lunch. Tiles: has, have, eaten, ate.',()=>Z.B.k>=4,'Has goes with he, she, it and one name. Have goes with I, you, we and they. Then the past participle.')},
{h:'Then, or up to now?',p:'The simple past tells about a finished time. The present perfect links the past to now. Drag each sentence to its timeline.',
predict:{q:'We have lived here since 2019. Do we still live here?',opts:['No, that time is over','Yes, right up to now'],ans:1},task:'Match all 6 sentences',
show:()=>demo(1,LINE.map(l=>()=>dropL(l[1])),650),
go:()=>begin(1,'Card: I ate lunch at 12. Timelines: finished past time, past linked to now.',()=>Z.L.k>=6,'A finished time (at 12, in 2019, last week) takes the simple past. Something still true now takes has or have.')},
{h:'Time words',p:'Some time words go with the simple past, and some go with the present perfect. Tap a word, then tap its box.',
predict:{q:'Can you say: I have seen it yesterday?',opts:['Yes, that is fine','No, yesterday needs saw'],ans:1},task:'Sort all 8 time words',
show:()=>demo(2,TW.flatMap(([w,k],i)=>[()=>pickW(i),()=>jarW(k)]),280),
go:()=>begin(2,'Eight time words and two boxes: saw, and have seen.',()=>Z.W.got.length>=8,'Yesterday, last week, ago and in 2019 are finished times: simple past. Already, yet, ever and since go with has or have.')},
{h:'Gone or been?',p:'Has gone and has been are both present perfect, but they say different things. Where is the person now? Tap the place.',task:'Place all 4',
show:()=>demo(3,WHERE.map(w=>()=>placeP(w[1])),700),
go:()=>begin(3,'Dad has gone to the park. Two places: at home, and at the park.',()=>Z.P.k>=4,'Has gone: still away. Has been: went and came back.')},
{h:'Spot the slip',p:'Each line has one wrong word. Tap it.',task:'Fix all 4 lines',show:()=>demo(4,FIX.map(L=>()=>tapF(L.b)),700),
go:()=>begin(4,'She have finished her work. Each word in its own box.',()=>Z.F.k>=4,'Has or have to match the person, the past participle after it, and no finished-time words.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.hook()});
const QS=[{q:'Which sentence is right?',a:'She has eaten her tea.',o:[['She has ate her tea.','past'],['She have eaten her tea.','have']]},
{q:'Which goes with yesterday?',a:'I saw Gran yesterday.',o:[['I have seen Gran yesterday.','fin'],['I have saw Gran yesterday.','past']]},
{q:'Ben has gone to school. Where is Ben?',a:'At school',o:[['At home','gone'],['Nobody can tell','gone']]},
{q:'Which shows it is still true now?',a:'I have lost my hat, so my head is cold.',o:[['I lost my hat on Monday.','now'],['I lose my hat.','pres']]},
{q:'Which time word goes with have?',a:'already',o:[['last week','fin'],['two days ago','fin']]},
{q:'Which is right?',a:'Have you finished yet?',o:[['Has you finished yet?','has'],['Did you finished yet?','did']]}];
function why(t){let m='The present perfect is has or have plus the past participle, and it links the past to now.';
if(t==='past')m='Ate and saw are simple past forms. After has or have, use the past participle: eaten, seen.';
if(t==='have')m='She is one person, so it is she has, not she have.';
if(t==='fin')m='Yesterday, last week and ago name a finished time, so they take the simple past: I saw.';
if(t==='gone')m='Has gone means he went and is not back yet, so Ben is still at school.';
if(t==='now')m='On Monday is a finished time. Has lost tells you the hat is still lost now.';
if(t==='pres')m='I lose is the present simple. The present perfect needs has or have: I have lost.';
if(t==='has')m='You takes have: have you, not has you.';
if(t==='did')m='Did goes with the plain verb (did you finish). Here use have + finished.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else buzz();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Present perfect buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
