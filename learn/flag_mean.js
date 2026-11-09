/* Flagship: Calculating the Mean (ages 10–11; NC Y6 statistics "calculate and interpret the mean as an average";
   CCSS 6.SP.A.3 "a measure of center summarizes all of its values with a single number").
   Five board-game scores are towers of cubes. Even the towers out by moving cubes (the total never changes); tip every
   tower onto one pile and share it equally (mean = total ÷ number of values); level 3, 5, 6, 8 and split the spare cubes
   (a mean of 5.5 is not one of the scores); stretch one score to 24 and watch the mean rise by only 3; set a missing score
   so the mean is 8 (total = mean × number of values).
   Not flagmad (distance from the mean), flagstatvoc (naming averages) or the generic statlab. */
(()=>{
VIS.reg('flagmean',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['level','share','half','outlier','missing','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',LINE='#b91c1c',GOAL='#15803d',HOLD='#f59e0b',HUES=['#60a5fa','#f472b6','#4ade80','#facc15','#c084fc'];
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const px1=()=>A.narrow?15:18,px2=()=>A.narrow?13:15,lim=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmt=v=>String(Math.round(v*100)/100),sum=a=>a.reduce((t,x)=>t+x,0),avg=a=>sum(a)/a.length;
function tag(s,x,y,px,edge){const g=A.ctx;g.font=`700 ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const w=g.measureText(s).width+16;
 x=lim(x,w/2+4,A.W-w/2-4);g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.78,w,px*1.56,px*.6);g.fill();if(edge){g.strokeStyle=edge;g.lineWidth=2.5;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y)}
/* ---------- layout: one slot per tower (plus a pile slot when sharing); cube size fits the tallest tower ---------- */
const TOP={level:10,share:10,half:9,outlier:26,missing:13};
function lay(){const n=S.v.length,slots=n+(part()==='share'?1.6:0),sw=Math.min(92,(A.W-24)/slots),base=A.H*.84,u=Math.min(sw*.62,(base-A.H*.17)/(part()==='chal'?Math.max(4,...S.v)+2:TOP[part()]));
 const x0=(A.W-slots*sw)/2;return{n,sw,base,u,x:i=>x0+sw*(i+.5),px:x0+sw*(n+.8)}}
function cubes(x,v,u,col,base){const g=A.ctx,w=u*1.05,whole=Math.floor(v+1e-9),part=v-whole;
 for(let k=0;k<whole;k++){g.fillStyle=col;g.fillRect(x-w/2,base-(k+1)*u,w,u);g.strokeStyle=INK;g.lineWidth=1.5;g.strokeRect(x-w/2,base-(k+1)*u,w,u)}
 if(part>1e-6){g.fillStyle=col;g.fillRect(x-w/2,base-whole*u-part*u,w,part*u);g.strokeStyle=INK;g.setLineDash([4,3]);g.strokeRect(x-w/2,base-whole*u-part*u,w,part*u);g.setLineDash([])}}
function hline(y,col,text,right){const g=A.ctx;g.strokeStyle=col;g.lineWidth=3;g.setLineDash([9,6]);g.beginPath();g.moveTo(8,y);g.lineTo(A.W-8,y);g.stroke();g.setLineDash([]);tag(text,right?A.W-70:70,y-14,px2(),col)}
function draw(){const g=A.ctx,k=part();g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.4);g.fillRect(0,0,A.W,A.H);
 if(k==='chal'){const q=QS[qn%QS.length];if(q&&q.fig){S.v=q.fig;const L=lay();q.fig.forEach((v,i)=>{cubes(L.x(i),v,L.u,HUES[i%5],L.base);tag(String(v),L.x(i),L.base+px2()+6,px2())})}else if(q){tag('mean = total ÷ number of values',A.W/2,A.H*.5,px1())}tag('Challenge',A.W/2,A.H*.08,px1());return}
 const L=lay();g.strokeStyle=A.col.dark?'#e2e8f0':INK;g.lineWidth=2;g.beginPath();g.moveTo(10,L.base);g.lineTo(A.W-10,L.base);g.stroke();
 S.v.forEach((v,i)=>{const lift=S.hold&&S.hold.from===i?1:0;cubes(L.x(i),v-lift,L.u,HUES[i%5],L.base);tag(fmt(v),L.x(i),L.base+px2()+6,px2(),S.edit===i?HOLD:null)});
 if(k==='share'){const p=S.pile,rows=Math.ceil(p/10),cw=Math.min(L.u,(A.W-L.px+L.sw*.3)/10.5);for(let i=0;i<p;i++){const r=Math.floor(i/10),q=i%10;g.fillStyle='#94a3b8';g.fillRect(L.px-L.sw*.3+q*cw,L.base-(r+1)*cw,cw,cw);g.strokeStyle=INK;g.lineWidth=1;g.strokeRect(L.px-L.sw*.3+q*cw,L.base-(r+1)*cw,cw,cw)}
  if(p)tag('pile '+p,L.px+cw*3,L.base-rows*cw-16,px2())}
 if(S.hold){g.fillStyle=HOLD;g.strokeStyle=INK;g.lineWidth=2.5;g.fillRect(S.hold.x-L.u*.55,S.hold.y-L.u*.5,L.u*1.1,L.u);g.strokeRect(S.hold.x-L.u*.55,S.hold.y-L.u*.5,L.u*1.1,L.u)}
 const tot=sum(S.v)+(S.pile||0);
 if(k==='missing')hline(L.base-8*L.u,A.col.dark?'#4ade80':GOAL,'target mean 8',true);
 if(k!=='share'||S.shared)hline(L.base-avg(S.v)*L.u,A.col.dark?'#f87171':LINE,'mean '+fmt(avg(S.v)));
 tag(k==='share'&&!S.shared?`Total ${tot} cubes · ${S.v.length} scores`:`Total ${fmt(tot)} ÷ ${S.v.length} = ${fmt(tot/S.v.length)}`,A.W/2,A.H*.08,px1())}
/* ---------- actions ---------- */
function moveCube(a,b){if(a===b||a<0||b<0||S.v[a]<1)return;S.v[a]--;S.v[b]++;S.moves++;A.sound.tick();
 const flat=Math.max(...S.v)-Math.min(...S.v);after(flat===0?`Level! Every tower is ${S.v[0]}. The total is still ${sum(S.v)}, so the mean is ${S.v[0]}.`:`Moved a cube. Towers: ${S.v.join(', ')}. Total still ${sum(S.v)}.`+(part()==='half'&&flat===1?' As level as whole cubes can go. Split the spare cubes.':''))}
function evenOne(){const hi=S.v.indexOf(Math.max(...S.v)),lo=S.v.indexOf(Math.min(...S.v));if(S.v[hi]-S.v[lo]>1)moveCube(hi,lo)}
function tip(i){if(S.shared||i<0||!S.v[i])return;S.pile+=S.v[i];S.v[i]=0;A.sound.pop();after(S.v.every(x=>!x)?`All in one pile: ${S.pile} cubes. Now share them equally between the ${S.v.length} scores.`:`Pile: ${S.pile} cubes so far.`)}
function share(){if(S.v.some(x=>x)||!S.pile)return;const n=S.v.length,each=S.pile/n;S.v=S.v.map(()=>each);S.pile=0;S.shared=true;A.sound.whoosh();after(`${n*each} ÷ ${n} = ${each}. Each score gets ${each}: that is the mean.`)}
function split(){const lo=Math.min(...S.v);if(Math.max(...S.v)-lo!==1)return;const m=avg(S.v);S.v=S.v.map(()=>m);S.split=true;A.sound.whoosh();
 after(`Each spare cube is cut in half and shared. Every tower is ${fmt(m)}. The mean is ${fmt(m)}, which is not one of the scores.`)}
function setTo(v){const i=S.edit,top=part()==='outlier'?24:12;v=lim(Math.round(v),0,top);if(v===S.v[i])return;S.v[i]=v;A.sound.tick();const t=sum(S.v),m=avg(S.v);
 after(part()==='outlier'?`Last score ${v}. Total ${t}, so the mean is ${t} ÷ 5 = ${fmt(m)}.`+(v===24?' 15 more points, shared between 5 scores, is only 3 more each.':'')
  :`Fifth score ${v}. Total ${t} ÷ 5 = ${fmt(m)}.`+(m===8?' The total is 40, which is 8 × 5.':m<8?' Too low: the total must reach 8 × 5 = 40.':' Too high: the total must be 8 × 5 = 40.'))}
function fresh(o){gen++;for(const k in S)delete S[k];Object.assign(S,{v:[6,8,7,5,9],pile:0,moves:0,shared:false,split:false,edit:-1,hold:null,ok:()=>{}},o||{})}
const doneIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||450)*(j+1)))}
function after(m){say(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if((k==='level'||k==='half')&&Math.max(...S.v)-Math.min(...S.v)>1)b('Tallest gives one to shortest',evenOne,'Move one cube from the tallest tower to the shortest');
 if(k==='half'&&!S.split)b('Split the spare cubes',split,'Cut the spare cubes in half and share them');
 if(k==='share'&&!S.shared){S.v.forEach((v,i)=>v&&b(`Tip score ${v}`,()=>tip(i),`Tip the tower of ${v} onto the pile`));if(!S.v.some(x=>x)&&!S.shared)b(`Share between ${S.v.length}`,share)}
 if(k==='outlier'){b('Last score −1',()=>setTo(S.v[4]-1));b('Last score +1',()=>setTo(S.v[4]+1));b('Last score +5',()=>setTo(S.v[4]+5))}
 if(k==='missing'){b('Fifth score −1',()=>setTo(S.v[4]-1));b('Fifth score +1',()=>setTo(S.v[4]+1))}}
/* pointer: pick up a top cube and drop it on another tower; tip a tower; or drag the top of the score you can change */
function slotAt(p,L){for(let i=0;i<L.n;i++)if(Math.abs(p.x-L.x(i))<L.sw/2)return i;return-1}
function down(p){const k=part();if(k==='chal')return false;const L=lay(),i=slotAt(p,L);
 if(k==='level'||k==='half'){if(i<0||S.v[i]<1||S.split)return false;S.hold={from:i,x:p.x,y:p.y};A.redraw();return true}
 if(k==='share'){tip(i);return false}
 if(i===S.edit){setTo((L.base-p.y)/L.u);return true}return false}
function move(p){const k=part(),L=lay();if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}else if(k==='outlier'||k==='missing')setTo((L.base-p.y)/L.u)}
function up(p){if(!S.hold)return;const L=lay(),to=p?slotAt(p,L):-1,from=S.hold.from;S.hold=null;to>=0&&to!==from?moveCube(from,to):A.redraw()}
const steps=[
{h:'Even them out',p:'Five board-game rounds scored 6, 8, 7, 5 and 9. Each score is a tower of cubes. Drag a top cube to another tower until all five are level.',
 predict:{q:'When you move cubes between towers, the total number of cubes…',opts:['goes up','stays the same','goes down'],ans:1},
 task:'Make all five towers the same height',show:()=>auto(0,[()=>moveCube(4,3),()=>moveCube(4,3),()=>moveCube(1,0)]),
 go:()=>{fresh();say('Five towers of cubes: 6, 8, 7, 5 and 9.');keys();S.ok=doneIf(0,()=>S.v.every(x=>x===7),'Levelled out, every score is 7. That level is the mean.')}},
{h:'Total, then share',p:'Another way: tip every tower onto one pile to find the total. Then share the pile equally between the 5 scores.',
 predict:{q:'What is the mean of 6, 8, 7, 5 and 9?',opts:['35','7','5'],ans:1},
 task:'Tip all the towers, then share the pile',show:()=>auto(1,[()=>tip(0),()=>tip(1),()=>tip(2),()=>tip(3),()=>tip(4),share],380),
 go:()=>{fresh();say('Five towers: 6, 8, 7, 5 and 9. Tap a tower to tip it onto the pile.');keys();S.ok=doneIf(1,()=>S.shared,'Mean = total ÷ number of values = 35 ÷ 5 = 7.')}},
{h:'Not a whole number',p:'Four scores: 3, 5, 6 and 8. Level them as far as whole cubes go. Then split the spare cubes.',
 predict:{q:'Must the mean be one of the scores?',opts:['Yes, always','Yes, the middle one','No, it can be any number, even a decimal'],ans:2},
 task:'Level the towers and split the spare cubes',show:()=>auto(2,[evenOne,evenOne,split],600),
 go:()=>{fresh({v:[3,5,6,8]});say('Four towers: 3, 5, 6 and 8.');keys();S.ok=doneIf(2,()=>S.split,'22 ÷ 4 = 5.5. Nobody scored 5.5, but it is the mean.')}},
{h:'One huge score',p:'Back to 6, 8, 7, 5 and 9, a mean of 7. Drag the top of the last tower up, or use the buttons, to make that score 24.',
 predict:{q:'The last score goes from 9 up to 24, which is 15 more. The mean…',opts:['stays 7','goes up by 15, to 22','goes up by 3, to 10'],ans:2},
 task:'Make the last score 24',show:()=>auto(3,[()=>setTo(14),()=>setTo(19),()=>setTo(24)],500),
 go:()=>{fresh({edit:4});say('Five towers: 6, 8, 7, 5 and 9. The mean line is at 7. The last tower can grow.');keys();S.ok=doneIf(3,()=>S.v[4]===24,'One big value pulls the mean up, but only by its share: 15 ÷ 5 = 3.')}},
{h:'The missing score',p:'Five rounds had a mean of 8. Four scores were 6, 10, 9 and 9. Set the fifth score so the mean line meets the green target.',
 predict:{q:'What was the fifth score?',opts:['8, the same as the mean','6','34'],ans:1},
 task:'Make the mean exactly 8',show:()=>auto(4,[()=>setTo(2),()=>setTo(4),()=>setTo(6)],500),
 go:()=>{fresh({v:[6,10,9,9,1],edit:4});say('Four towers 6, 10, 9 and 9, and a fifth tower of 1. Target mean 8.');keys();S.ok=doneIf(4,()=>S.v[4]===6,'Total needed = 8 × 5 = 40. 40 − 34 = 6.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
/* each question: text, right answer, two wrong answers tagged with the slip behind them, and towers to show (or none) */
const QS=[
 {q:'Find the mean of five test scores: 72, 85, 90, 68 and 95.',ans:'82',bad:[['410','nodiv'],['85','median']]},
 {q:'Find the mean of 4, 6, 7 and 9.',ans:'6.5',bad:[['5.2','wrongn'],['26','nodiv']],fig:[4,6,7,9]},
 {q:'Three scores have a mean of 10. Two of them are 8 and 9. What is the third?',ans:'13',bad:[['10','same'],['17','nototal']],fig:[8,9]},
 {q:'Scores 6, 8, 7, 5 and 9 have a mean of 7. The 9 is changed to 24. What is the new mean?',ans:'10',bad:[['22','jump'],['7','stays']],fig:[6,8,7,5,24]},
 {q:'Find the mean of 2, 0 and 4.',ans:'2',bad:[['3','zero'],['6','nodiv']],fig:[2,0,4]},
 {q:'The mean height in a class is 140 cm. Must one child be exactly 140 cm tall?',ans:'No, the mean is a fair share, not a real value',bad:[['Yes, the mean is always one of the values','isvalue'],['Yes, the middle child','median']]}];
function why(t){let m='Add all the values, then divide by how many values there are.';
 if(t==='nodiv')m='That is the total. The mean shares the total equally, so divide by how many values there are.';
 if(t==='median')m='That is the middle value when they are in order (the median). The mean uses every value: add them all, then divide.';
 if(t==='wrongn')m='There are 4 values, not 5. Divide the total, 26, by 4.';
 if(t==='same')m='The missing value need not equal the mean. The total must be 10 × 3 = 30, and 8 + 9 = 17, so the third is 13.';
 if(t==='nototal')m='17 is 8 + 9, the two you know. The total must be 10 × 3 = 30, so the third is 30 − 17.';
 if(t==='jump')m='The extra 15 is shared between all 5 scores, so the mean only goes up by 3.';
 if(t==='stays')m='The mean uses every value. The total went up by 15, so the mean went up too: 50 ÷ 5 = 10.';
 if(t==='zero')m='A score of 0 still counts as a value. Divide by 3, not 2: 6 ÷ 3 = 2.';
 if(t==='isvalue')m='The mean can be a value nobody has, like 5.5 from 3, 5, 6 and 8. It is the level if everything were shared out.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});say('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();say(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tower controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
