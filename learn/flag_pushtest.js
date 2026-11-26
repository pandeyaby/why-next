/* Flagship – testing push and pull designs (Science, ages 5-6; NGSS K-PS2-2 'analyze data to determine if a design
   solution works as intended to change the speed or direction of an object with a push or a pull'). Try three pushes
   to stop a ball on a mat and record each result, test the same push five times and judge it from the tally, drag a
   wall so the ball turns into a goal, read two ramps' results, and pick the change that fixes a failed test. Data and
   drawings: pushtest_art.js. */
(()=>{const P=PTS;
VIS.reg('flagpushtest',c=>{c.fig.classList.add('young');
let A=null,pad=null,quiz=null,ask=-1,run=0,drag=null,hits=[],spots=[];const st={};
const NAMES=['push','again','turn','read','fix','chal'],now=()=>NAMES[A.step];
const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const grid=(n,y,h,gap)=>{const w=(A.W-16-gap*(n-1))/n;const out=[];for(let i=0;i<n;i++)out.push({i,x:8+i*(w+gap),y,w,h});return out};
function tell(msg,bad){st.reply=msg;st.bad=!!bad;c.say(msg);A.cv.setAttribute('aria-label',msg);buttons();A.redraw();st.check()}
const tone=fin=>fin?'ok':st.bad?'no':'';
function roll(o,key,to,ms,then){if(A.reduced()){o[key]=to;A.redraw();then&&then();return}A.tween(o,{[key]:to},ms||520,'out',then)}
/* 1 ---- which push stops the ball on the mat */
function push(i){const s=st.p,X=P.PUSH[i];s.ball.u=0;roll(s.ball,'u',X.at);s.trail=X.at;s.log.push(i);if(X.res==='in')s.found=true;
 if(X.res!=='in'){A.sound.miss();return tell(X.say,true)}A.sound.pop();tell(X.say,false)}
function drawPush(){const s=st.p,g=A.ctx,dk=A.col.dark,y0=P.head(A,s.found?P.DONE[0]:'Make the ball stop on the star mat. Tap a push.',tone(s.found),st.reply,st.bad);
 const lh=Math.min(150,(A.H-y0)*.32);P.lane(A,y0,lh,s.ball.u,s.trail);let y=y0+lh+10;
 g.font=`800 15px system-ui,sans-serif`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='left';g.textBaseline='middle';g.fillText('My results:',14,y+8);y+=24;
 s.log.slice(-3).forEach(i=>{const X=P.PUSH[i],ok=X.res==='in';g.font=`700 15px system-ui,sans-serif`;g.fillStyle=ok?(dk?'#86efac':P.OK):(dk?'#fca5a5':P.NO);
  g.fillText(`${ok?'\u2713':'\u2717'} ${X.t}: ${ok?'on the mat':X.res==='short'?'too short':'too far'}`,14,y+8);y+=22});
 hits=grid(3,Math.max(y+8,A.H-104),96,8);hits.forEach(r=>P.btn(g,r,P.PUSH[r.i].t,s.log[s.log.length-1]===r.i?(P.PUSH[r.i].res==='in'?'ok':'no'):'',P.PUSH[r.i].ic,A.narrow?15:18))}
/* 2 ---- one try is not enough */
function test(){const s=st.a;if(s.res.length>=P.TRIES.length)return;const u=P.TRIES[s.res.length],ok=u>=P.MAT[0]&&u<=P.MAT[1];s.res.push(ok?1:0);s.ball.u=0;roll(s.ball,'u',u,420);s.trail=u;
 ok?A.sound.pop():A.sound.miss();tell(`Test ${s.res.length}: ${ok?'on the mat \u2713':'stopped short \u2717 (a bump on the floor)'}`,!ok)}
function verdict(j){const s=st.a;if(s.res.length<P.TRIES.length||s.ok)return;const V=P.VERDICT[j];if(!V[1]){s.wrong=j;A.sound.miss();return tell(V[2],true)}
 s.ok=true;s.wrong=-1;A.sound.pop();tell('Yes. 4 ticks out of 5 means it works most of the time.',false)}
function drawAgain(){const s=st.a,g=A.ctx,dk=A.col.dark,fin=s.ok,y0=P.head(A,fin?P.DONE[1]:s.res.length<5?`Test the medium push 5 times. (${s.res.length} of 5)`:'Look at the ticks. Does the design work?',tone(fin),st.reply,st.bad);
 const lh=Math.min(130,(A.H-y0)*.27);P.lane(A,y0,lh,s.ball.u,s.trail);let y=y0+lh+20;
 g.font=`800 16px system-ui,sans-serif`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='left';g.textBaseline='middle';g.fillText('Tally:',14,y);P.ticks(A,84,y,s.res,24);
 for(let k=s.res.length;k<5;k++){g.strokeStyle=dk?'#94a3b8':'#64748b';g.lineWidth=1.5;g.strokeRect(84+k*31-10,y-11,20,22)}y+=28;
 if(s.res.length<5){hits=[{i:9,x:A.W*.2,y:y+6,w:A.W*.6,h:Math.min(90,A.H-y-14)}];P.btn(g,hits[0],`Test ${s.res.length+1}`,'','\u270B',22);return}
 if(fin){hits=[];return}hits=P.VERDICT.map((V,i)=>({i,x:8,y:y+4+i*66,w:A.W-16,h:58}));hits.forEach(r=>P.btn(g,r,P.VERDICT[r.i][0],s.wrong===r.i?'no':'',null,A.narrow?16:18))}
/* 3 ---- a wall makes it turn */
function place(k){const s=st.t;if(s.r>=P.TURNS.length||s.busy)return;const T=P.TURNS[s.r];s.view=s.r;s.wall=k;s.ball={x:0,y:null};s.busy=true;const gen=run;
 roll(s.ball,'x',P.SLOTS[k],420,()=>{if(gen!==run)return;s.ball.y=0;roll(s.ball,'y',1,380,()=>{if(gen!==run)return;s.busy=false;A.redraw()})});
 if(k!==T.goal){s.wrong=k;A.sound.miss();return tell(`The wall at ${'ABC'[k]} turned the ball, but ${k<T.goal?'too soon':'too late'}. It missed the goal.`,true)}
 s.wrong=null;s.r++;A.sound.pop();if(s.r<P.TURNS.length)setTimeout(()=>{if(gen===run){s.wall=null;s.ball=null;s.view=s.r;A.redraw()}},A.reduced()?0:900);tell(T.say,false)}
function harder(){const s=st.t;if(s.r>=P.TURNS.length)return;s.wall=null;s.ball={x:0,y:null};s.tried=true;roll(s.ball,'x',10,500);A.sound.miss();
 tell('A harder push just goes straight, faster. It still misses the goal.',true)}
function drawTurn(){const s=st.t,g=A.ctx,fin=s.r>=P.TURNS.length,T=P.TURNS[s.view],y0=P.head(A,fin?P.DONE[2]:`Drag the wall onto A, B or C to turn the ball into the goal. (${s.r+1} of 2)`,tone(fin),st.reply,st.bad);
 const fh=Math.min(300,(A.H-y0)*.6),F=P.floor(A,y0,fh,T.goal,s.wall,s.ball,drag);spots=fin?[]:F.slots;
 if(fin){hits=[];return}const y=y0+fh+12;hits=grid(2,y,Math.min(88,A.H-y-12),12);
 P.btn(g,hits[0],'Wall (drag me)',drag?'sel':'','\u{1F9F1}',A.narrow?15:18);P.btn(g,hits[1],'Push harder',s.tried&&!s.wall?'no':'','\u{1F4AA}',A.narrow?15:18)}
/* 4 ---- read the results */
function answer(j){const s=st.r;if(s.k>=P.READ.length)return;const Q=P.READ[s.k];if(j!==Q.a){s.wrong=j;A.sound.miss();return tell(Q.no[j],true)}
 s.wrong=-1;s.k++;A.sound.pop();tell(s.k>=P.READ.length?'Right: count every try.':'Right!',false)}
function drawRead(){const s=st.r,g=A.ctx,dk=A.col.dark,fin=s.k>=P.READ.length,y0=P.head(A,fin?P.DONE[3]:P.READ[s.k].q,tone(fin),st.reply,st.bad);
 const ch=Math.min(130,(A.H-y0)*.3);g.fillStyle=dk?'#1e293b':'#ffffff';P.rr(g,8,y0,A.W-16,ch,12);g.fill();g.strokeStyle='#64748b';g.lineWidth=1.2;g.stroke();
 P.DES.forEach((D,i)=>{const ry=y0+ch*(i?.7:.3);g.font=`800 ${A.narrow?15:17}px system-ui,sans-serif`;g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='left';g.textBaseline='middle';g.fillText(D.n,18,ry);
  P.ticks(A,A.narrow?112:170,ry,D.r,A.narrow?19:26);g.fillStyle=dk?P.LIGHT:P.INK;g.textAlign='right';g.fillText(`${D.r.reduce((a,b)=>a+b,0)} of 5`,A.W-18,ry)});
 if(fin){hits=[];return}const Q=P.READ[s.k],y=y0+ch+14;hits=Q.o.map((o,i)=>({i,x:8,y:y+i*68,w:A.W-16,h:60}));hits.forEach(r=>P.btn(g,r,Q.o[r.i],s.wrong===r.i?'no':'',null,A.narrow?16:19))}
/* 5 ---- change the design, test again */
function mend(j){const s=st.f;if(s.k>=P.FIX.length||s.good)return;const X=P.FIX[s.k],O=X.o[j];if(!O[1]){s.wrong=j;A.sound.miss();return tell(`${O[0]}? ${O[2]}`,true)}
 s.wrong=-1;s.k++;s.good=true;A.sound.pop();const gen=run;if(s.k<P.FIX.length)setTimeout(()=>{if(gen===run){s.good=false;s.view=s.k;A.redraw();buttons()}},A.reduced()?0:600);tell(X.yes,false)}
function drawFix(){const s=st.f,g=A.ctx,fin=s.k>=P.FIX.length,X=P.FIX[s.view],good=s.good,
 y0=P.head(A,fin?P.DONE[4]:good?X.yes:`Test ${s.view+1} of 3 went wrong: ${X.p} What should we change?`,tone(fin||good),st.reply,st.bad),ph=Math.min(150,(A.H-y0)*.32);
 if(s.view<2){const u=good?7:s.view===0?4:10.4;P.lane(A,y0,ph,u,u)}else P.floor(A,y0,ph+40,1,good?1:null,good?{x:5,y:1}:{x:10,y:null},null);
 if(fin||good){hits=[];return}const y=y0+ph+(s.view<2?14:54);hits=X.o.map((o,k)=>({i:k,x:8,y:y+k*66,w:A.W-16,h:58}));hits.forEach(r=>P.btn(g,r,X.o[r.i][0],s.wrong===r.i?'no':'',null,A.narrow?16:19))}
/* ---- wiring ---- */
const PAINT={push:drawPush,again:drawAgain,turn:drawTurn,read:drawRead,fix:drawFix};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=now();
 if(k==='chal'){const y=P.head(A,'Challenge: test and fix a design','ok');P.emo(g,'\u26BD',A.W*.3,y+70,64);P.emo(g,'\u2705',A.W*.7,y+70,64);return}PAINT[k]();A.fx.draw(g)}
function down(p){const k=now();
 if(k==='turn'){if(inside(p,hits[0])){drag={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(inside(p,hits[1])){harder();return false}const sp=spots.find(r=>inside(p,r));if(sp)place(sp.i);return false}
 const r=hits.find(q=>inside(p,q));if(!r)return false;
 if(k==='push')push(r.i);else if(k==='again')r.i===9?test():verdict(r.i);else if(k==='read')answer(r.i);else if(k==='fix')mend(r.i);return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const d=drag;drag=null;const sp=spots.find(r=>inside(p,r));if(sp)return place(sp.i);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10)return tell('Now drag the wall onto A, B or C. Or tap a spot.',false);A.redraw()}
function reset(){run++;drag=null;Object.keys(st).forEach(k=>delete st[k]);
 Object.assign(st,{p:{ball:{u:0},trail:null,log:[],found:false},a:{ball:{u:0},trail:null,res:[],ok:false,wrong:-1},t:{r:0,view:0,wall:null,ball:null,wrong:null,tried:false,busy:false},
  r:{k:0,wrong:-1},f:{k:0,view:0,wrong:-1,good:false},reply:null,bad:false,check:()=>{}})}
function enter(i,isDone){reset();c.say(P.DESC[i]);A.cv.setAttribute('aria-label',P.DESC[i]);
 st.check=()=>{if(A.step!==i||A.isDone||!isDone())return;if(LAB[i].predict&&A.pred[i]==null)return;A.done(P.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function play(i,acts){LAB[i].go();const mine=run;let t=0;acts.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(mine===run)f()},t)})}
function buttons(){if(!pad)return;pad.innerHTML='';const k=now(),add=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t);b.onclick=f};
 if(k==='push')P.PUSH.forEach((X,i)=>add(X.t,()=>push(i),`Roll the ball with a ${X.t.toLowerCase()}`));
 if(k==='again'){if(st.a.res.length<5)add(`Test ${st.a.res.length+1}`,test,`Run test ${st.a.res.length+1} of 5 with the medium push`);else if(!st.a.ok)P.VERDICT.forEach((V,j)=>add(V[0],()=>verdict(j)))}
 if(k==='turn'&&st.t.r<P.TURNS.length){P.SLOTS.forEach((_,j)=>add(`Wall at ${'ABC'[j]}`,()=>place(j),`Put the wall at spot ${'ABC'[j]} and roll the ball`));add('Push harder',harder,'Push the ball harder with no wall')}
 if(k==='read'&&st.r.k<P.READ.length)P.READ[st.r.k].o.forEach((o,j)=>add(o,()=>answer(j)));
 if(k==='fix'&&st.f.k<P.FIX.length&&!st.f.good)P.FIX[st.f.k].o.forEach((O,j)=>add(O[0],()=>mend(j),`Fix: ${O[0]}`))}
const LAB=[
{h:'Does my push work?',p:P.TXT[0],predict:{q:'Which push will stop the ball on the mat?',opts:['The hardest push','Not too hard, not too gentle'],ans:1},task:'Find the push that stops on the mat',
 show:()=>play(0,[[500,()=>push(2)],[800,()=>push(0)],[800,()=>push(1)]]),go:()=>enter(0,()=>st.p.found)},
{h:'Test it again',p:P.TXT[1],predict:{q:'The first test works. Do we need more tests?',opts:['No: one try shows it works','Yes: test again to be sure'],ans:1},task:'Run 5 tests, then judge the design',
 show:()=>play(1,[...P.TRIES.map(()=>[520,test]),[600,()=>verdict(0)]]),go:()=>enter(1,()=>st.a.ok)},
{h:'Make it turn',p:P.TXT[2],predict:{q:'The goal is not straight ahead. What makes the ball turn?',opts:['A harder push','A wall in its way'],ans:1},task:'Turn the ball into the goal twice',
 show:()=>play(2,P.TURNS.map(T=>[1100,()=>place(T.goal)])),go:()=>enter(2,()=>st.t.r>=P.TURNS.length)},
{h:'Read the results',p:P.TXT[3],task:'Answer 3 questions about the ramps',
 show:()=>play(3,P.READ.map(Q=>[650,()=>answer(Q.a)])),go:()=>enter(3,()=>st.r.k>=P.READ.length)},
{h:'Fix it and test again',p:P.TXT[4],task:'Fix 3 tests that went wrong',
 show:()=>play(4,P.FIX.map(X=>[700,()=>mend(X.o.findIndex(O=>O[1]))])),go:()=>enter(4,()=>st.f.k>=P.FIX.length)},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
LAB.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
function why(tag){let m='Test the design, count the results, then change one thing and test again.';
 if(tag==='hard')m='Harder is not always better. Too hard rolls past the goal. Try pushes and test where it stops.';
 else if(tag==='once')m='One try can be lucky. Test it again and again, and count how many times it works.';
 else if(tag==='turn')m='A push along the same line only makes it faster or slower. To turn, something must push it a new way, like a wall.';
 else if(tag==='goal')m='Keep the goal where it is. Change the design, like the push or a wall, and test again.';
 else if(tag==='count')m='Count all the ticks, not just one try. More ticks means it worked more times.';
 return m}
function nextQ(){ask++;const Q=P.QS[ask%P.QS.length],opts=[[Q.a,'ok'],...Q.o],sh=(ask+1)%3,list=opts.slice(sh).concat(opts.slice(0,sh));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 list.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn'},quiz.querySelector('.fl-pick'),v).onclick=()=>judge(tag,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(tag,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}.`:'\u2717 '+why(tag))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':why(tag))}
FK.shell(c,{steps:LAB,ratio:.74,tall:1.55,draw,onStep:X=>{quiz.hidden=X.step!==5;pad.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Push test lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});buttons()}}).start()})})();
