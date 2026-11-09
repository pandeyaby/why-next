/* Flagship: honest conversations and conflict repair (ages 12-13; PSHE Association KS3 healthy relationships: managing
   conflict, apologising and repairing trust; non-violent communication, Rosenberg: observation, feeling, need, request).
   Sort facts from judgements, build a message where each of the four parts is clean, build an apology and watch a
   repair meter fall when blame or "if" creeps in, rebuild trust week by week, and compare avoiding a problem with
   talking it through. Not flagagree (ages 7-9, cooling down and fair fixes) or flagsorry (ages 4-5). */
(()=>{
VIS.reg('flagrepair',c=>{let A,pad,quiz,qn=-1,epoch=0;const V={};
const INK='#0f172a',CARD='#fff7ed',GOOD='#15803d',BLUE='#1e40af',BAD='#be123c',AMB='#b45309';
const OBS=[['You did not reply to my three messages yesterday.',0],['You are so selfish.',1],['You always ignore me.',1],['You told Mia what I said about the party.',0],['You are a terrible friend.',1],['You left before the end of my match.',0]];
const OBSWHY=['That is a fact: a camera could record it.','That is a judgement about who they are. They will defend themselves, not listen.','"Always" is a judgement. One exception and the talk becomes an argument about the word.','That is a fact: it happened, and you can say when.','That is a judgement. It attacks the person, not the problem.','That is a fact anyone could have seen.'];
const PARTS=[['Observation',[['When you told Mia what I said about the party,','ok'],['When you blabbed like you always do,','always'],['When you were a total snake,','label']]],
 ['Feeling',[['I felt embarrassed and hurt,','ok'],['I felt that you are a liar,','feelthat'],['I felt like whatever,','shut']]],
 ['Need',[['because I need to trust that private things stay private.','ok'],['because you need to grow up.','attack'],['because everyone says you are fake.','gossip']]],
 ['Request',[['Could you check with me before you share something I told you?','ok'],['Just be better.','vague'],['Never speak to Mia again.','demand']]]];
const SAY=[['I am sorry I told Mia what you said.',1,'name'],['That was my choice, and it was wrong.',1,'own'],['I can see it embarrassed you in front of everyone.',1,'impact'],['From now on I will ask you before I share anything.',1,'plan'],
 ['…but you overreact to everything.',0,'blame'],['Sorry if you were upset.',0,'if'],['I was only joking anyway.',0,'joke']];
const phase=()=>['obs','nvc','sorry','trust','avoid','chal'][A.step];
const lim=(v,a,b)=>Math.max(a,Math.min(b,v)),inR=(p,r)=>p&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t)}
/* a pale card with dark text that wraps onto as many lines as it needs */
function card(t,x,y,w,o={}){const g=A.ctx,f=o.f||(A.narrow?14:16);g.font=`${o.b===false?500:700} ${f}px system-ui`;const L=[];let line='';
 t.split(' ').forEach(wd=>{const s=line?line+' '+wd:wd;if(g.measureText(s).width>w-20&&line){L.push(line);line=wd}else line=s});L.push(line);
 const h=Math.max(o.h||0,L.length*f*1.3+f*.9);g.fillStyle=o.bg||CARD;A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=o.ring?3:1.5;g.strokeStyle=o.ring||'#a8a29e';g.stroke();
 g.fillStyle=INK;g.textAlign=o.al||'left';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,o.al==='center'?x+w/2:x+10,y+h/2+(i-(L.length-1)/2)*f*1.3));return{x,y,w,h}}
function head(t,ring){const w=Math.min(A.W-16,A.W*.8);card(t,(A.W-w)/2,6,w,{al:'center',ring:ring||BLUE,f:A.narrow?13:15})}
function meter(x,y,w,v,lab,col){const g=A.ctx;g.fillStyle='#e2e8f0';A.paint.rrect(x,y,w,16,8);g.fill();g.fillStyle=col;A.paint.rrect(x,y,Math.max(8,w*lim(v,0,1)),16,8);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;A.paint.rrect(x,y,w,16,8);g.stroke();
 card(lab,x,y+22,w,{f:13,al:'center'})}
/* ---- 1: facts or judgements ---- */
const bins=()=>{const w=(A.W-36)/2,h=A.H*.2;return[{x:12,y:A.H*.62,w,h},{x:24+w,y:A.H*.62,w,h}]};
function drawObs(){const n=V.k,w=A.W*.86;head(n>5?'Sorted: 3 facts, 3 judgements':`Card ${n+1} of 6: fact or judgement?`,n>5?GOOD:null);
 if(n<6)card('"'+OBS[n][0]+'"',(A.W-w)/2,A.H*.2,w,{al:'center',f:A.narrow?16:19,h:A.H*.2,ring:V.miss?BAD:null});
 bins().forEach((b,j)=>card((j?'Judgement':'Observation (fact)')+': '+V.sorted.filter(i=>OBS[i][1]===j).length,b.x,b.y,b.w,{al:'center',h:b.h,bg:j?'#ffe4e6':'#dcfce7'}))}
function sortObs(j){if(V.k>5)return;const i=V.k;if(OBS[i][1]!==j){V.miss=true;A.sound.miss();return tell(OBSWHY[i]+' Try the other box.')}V.miss=false;V.sorted.push(i);V.k++;A.sound.pop();
 tell(OBSWHY[i]+(V.k>5?' Start an honest talk with a fact, so the other person can hear it.':''))}
/* ---- 2: observation, feeling, need, request ---- */
const rows=()=>{const top=A.H*.13,h=A.H*.16;return PARTS.map((_,i)=>({x:10,y:top+i*(h+6),w:A.W-20,h}))};
function drawNvc(){const R=rows(),ok=V.pick.filter((p,i)=>PARTS[i][1][p][1]==='ok').length;head(ok>3?'All 4 parts are clean: it can be heard':`${ok} of 4 parts are clean`,ok>3?GOOD:null);
 R.forEach((r,i)=>{const o=PARTS[i][1][V.pick[i]],good=o[1]==='ok';card(PARTS[i][0]+': '+o[0],r.x,r.y,r.w,{h:r.h,ring:V.tried[i]?(good?GOOD:BAD):null,bg:V.tried[i]&&!good?'#ffe4e6':CARD,f:A.narrow?13:15})});
 meter(A.W*.1,A.H*.86,A.W*.8,ok/4,'How it lands: '+(ok>3?'they can hear you':ok>1?'they might get defensive':'they will defend, not listen'),ok>3?GOOD:ok>1?AMB:BAD)}
const NVCWHY={ok:'Clean.',always:'"Always" turns a fact into a judgement. Say the one thing that happened.',label:'Calling them a name attacks the person. Describe what they did.',
 feelthat:'"I felt that you are…" is a judgement wearing a feeling\'s clothes. Name a real feeling: hurt, embarrassed, worried.',shut:'Shrugging it off hides the real feeling, so they cannot see why it mattered.',
 attack:'That is a dig at them, not your need. Say what you need.',gossip:'Bringing in what "everyone says" makes it an ambush. Stick to your own need.',
 vague:'"Be better" gives them nothing to do. Ask for one clear action.',demand:'That is an order, and it is about Mia. Ask for something about the two of you that they can say yes to.'};
function cycle(i){V.pick[i]=(V.pick[i]+1)%3;V.tried[i]=true;A.sound.tick();const o=PARTS[i][1][V.pick[i]];const all=V.pick.every((p,k)=>PARTS[k][1][p][1]==='ok');
 tell(PARTS[i][0]+': '+o[0]+' '+NVCWHY[o[1]]+(all?' All four parts are clean. That message names the problem without attacking the person.':''))}
/* ---- 3: a real apology or a face-saving sorry ---- */
function score3(){const on=V.said.map(i=>SAY[i]);const good=new Set(on.filter(s=>s[1]).map(s=>s[2])).size,bad=on.filter(s=>!s[1]).length;return{good,bad,v:bad?Math.max(0,good-2*bad)/4:good/4}}
function drawSorry(){const S=score3(),w=A.W-20;head(S.good===4&&!S.bad?'A real apology: it can start the repair':S.bad?'Face-saving: blame or "if" undoes it':`${S.good} of 4 parts of a real apology`,S.good===4&&!S.bad?GOOD:S.bad?BAD:null);
 let y=A.H*.15;if(!V.said.length)card('Add lines to your apology with the buttons below.',10,y,w,{b:false,al:'center'});
 V.said.forEach(i=>{const r=card(SAY[i][0],10,y,w,{ring:SAY[i][1]?GOOD:BAD,bg:SAY[i][1]?CARD:'#ffe4e6',f:A.narrow?13:15});V.boxes.push([r,i]);y+=r.h+6});
 meter(A.W*.1,A.H*.84,A.W*.8,S.v,'Repair meter',S.v>.99?GOOD:S.v>.4?AMB:BAD)}
const SAYWHY={name:'It names exactly what you did.',own:'It takes responsibility with no excuse.',impact:'It shows you understand how it hurt them.',plan:'It says what will change, so they can check.',
 blame:'"But" cancels everything before it and shifts the blame onto them.',if:'"Sorry if you were upset" doubts their feelings. Say what you did.',joke:'"Only joking" shrinks what happened, so they feel silly for being hurt.'};
function toggleSay(i){const k=V.said.indexOf(i);if(k>=0){V.said.splice(k,1);A.sound.tick();return tell('Removed: '+SAY[i][0])}V.said.push(i);SAY[i][1]?A.sound.pop():A.sound.miss();const S=score3();
 tell(SAYWHY[SAY[i][2]]+(S.good===4&&!S.bad?' That is a real apology: no excuses, no blame.':''))}
/* ---- 4: trust comes back slowly ---- */
function axis(x0,y0,w,h,top,last){const g=A.ctx;g.fillStyle=A.col.tx;g.font='600 12px system-ui';g.textBaseline='bottom';g.textAlign='left';g.fillText(top,x0,y0-h-3);g.textBaseline='top';g.fillText('Week 1',x0,y0+3);g.textAlign='right';g.fillText(last,x0+w,y0+3)}
function drawTrust(){const g=A.ctx,n=V.wk.length,x0=A.W*.1,w=A.W*.8,y0=A.H*.82,h=A.H*.58,bw=w/8;head(V.trust>=100?'Trust is back, after weeks of keeping your word':`Week ${Math.min(n+1,8)} of 8: trust ${V.trust}%`,V.trust>=100?GOOD:null);
 g.strokeStyle=A.alpha(A.col.tx,.5);g.lineWidth=1.5;g.strokeRect(x0,y0-h,w,h);g.setLineDash([6,4]);g.beginPath();g.moveTo(x0,y0-h);g.lineTo(x0+w,y0-h);g.stroke();g.setLineDash([]);
 let t=30;V.wk.forEach((k,i)=>{t=k?Math.min(100,t+10):Math.max(0,t-25);g.fillStyle=k?GOOD:BAD;g.fillRect(x0+i*bw+4,y0-h*t/100,bw-8,h*t/100)});
 axis(x0,y0,w,h,'Full trust (100%)','Week 8');card('Start: 30% after the apology',x0,y0+22,w,{f:12,al:'center',b:false})}
function week(keep){if(V.wk.length>=8)return tell(V.trust>=100?'Trust is back.':'8 weeks are up. Press Restart week 1 and keep your word every week.');V.wk.push(keep);V.trust=V.wk.reduce((t,k)=>k?Math.min(100,t+10):Math.max(0,t-25),30);keep?A.sound.tick():A.sound.miss();
 tell(keep?`Week ${V.wk.length}: you kept your word. Trust grows a little, to ${V.trust}%.`:`Week ${V.wk.length}: you slipped back. Trust drops fast, to ${V.trust}%. One slip undoes weeks of work.`)}
function restartWeeks(){V.wk=[];V.trust=30;A.sound.step();tell('Back to week 1, just after the apology.')}
/* ---- 5: avoid it or talk it through ---- */
const AV=[.7,.66,.6,.55,.5,.44,.4,.35,.3,.26],TK=[.7,.5,.55,.65,.72,.78,.82,.85,.87,.88];
function drawAvoid(){const g=A.ctx,x0=A.W*.1,w=A.W*.8,y0=A.H*.74,h=A.H*.5;head(V.tried.av&&V.tried.tk?'Talking it through dips first, then ends stronger':'Pick a path and watch 10 weeks of the friendship',V.tried.av&&V.tried.tk?GOOD:null);
 g.strokeStyle=A.alpha(A.col.tx,.5);g.lineWidth=1.5;g.strokeRect(x0,y0-h,w,h);axis(x0,y0,w,h,'How close you are','Week 10');
 [['av',AV,BAD],['tk',TK,GOOD]].forEach(([k,L,col])=>{if(!V.tried[k])return;const m=Math.ceil(V.draw[k]*10);g.strokeStyle=col;g.lineWidth=4;g.beginPath();L.slice(0,m).forEach((v,i)=>{const x=x0+w*i/9,y=y0-h*v;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke()});
 const w2=(A.W-30)/2;card('Avoid it: closeness '+(V.tried.av?'30%':'?'),10,A.H*.8,w2,{f:13,al:'center',ring:V.tried.av?BAD:null});card('Talk it through: '+(V.tried.tk?'88%':'?'),20+w2,A.H*.8,w2,{f:13,al:'center',ring:V.tried.tk?GOOD:null})}
function path(k){V.tried[k]=true;V.draw[k]=0;A.sound.tick();A.tween(V.draw,{[k]:1},A.reduced()?0:1200,'io',()=>tell(k==='av'?'Avoiding it felt easier, but the hurt never got sorted. Small digs pile up and the friendship slowly cools.':'The honest talk was awkward at first, so closeness dipped. Then the repair and kept promises made the friendship stronger than before.'))}
function draw(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0e7ff',A.col.dark?.05:.35);g.fillRect(0,0,A.W,A.H);V.boxes=[];const k=phase();
 if(k==='chal'){head('Challenge');const Q=CQ[qn%CQ.length];if(Q)card(Q.pic,A.W*.1,A.H*.4,A.W*.8,{al:'center',f:A.narrow?16:19});return}
 ({obs:drawObs,nvc:drawNvc,sorry:drawSorry,trust:drawTrust,avoid:drawAvoid})[k]()}
function reset(){epoch++;for(const k in V)delete V[k];Object.assign(V,{k:0,sorted:[],miss:false,pick:[1,1,1,1],tried:{},said:[],boxes:[],wk:[],trust:30,draw:{av:0,tk:0},check:()=>{}});V.tried=[false,false,false,false];V.tried.av=false;V.tried.tk=false}
function tell(t){speak(t);A.redraw();keys();V.check()}
const ready=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,say,ok,msg,init){reset();Object.assign(V,init||{});speak(say);keys();V.check=ready(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},A.reduced()?30*(j+1):(ms||400)*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=phase(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='obs'&&V.k<6){B('Observation (fact)',()=>sortObs(0),'This card is an observation, a fact');B('Judgement',()=>sortObs(1),'This card is a judgement')}
 if(k==='nvc')PARTS.forEach((p,i)=>B('Change '+p[0].toLowerCase(),()=>cycle(i),'Try the next '+p[0].toLowerCase()+' option'));
 if(k==='sorry')SAY.forEach((s,i)=>B((V.said.includes(i)?'Remove: ':'Add: ')+s[0],()=>toggleSay(i),(V.said.includes(i)?'Remove the line ':'Add the line ')+s[0]));
 if(k==='trust'){B('Keep your word',()=>week(true),'This week, keep your word');B('Slip back',()=>week(false),'This week, slip back into old habits');B('Restart week 1',restartWeeks,'Start the weeks again')}
 if(k==='avoid'){B('Avoid it',()=>path('av'),'Avoid the problem and see what happens');B('Talk it through',()=>path('tk'),'Have the honest talk and see what happens')}}
function down(p){const k=phase();
 if(k==='obs'){const j=bins().findIndex(b=>inR(p,b));if(j>=0)sortObs(j)}
 if(k==='nvc'){const i=rows().findIndex(r=>inR(p,r));if(i>=0)cycle(i)}
 if(k==='sorry'){const b=V.boxes.find(([r])=>inR(p,r));if(b)toggleSay(b[1])}
 if(k==='trust'){if(p.x>A.W/2)week(true);else week(false)}
 if(k==='avoid'&&p.y>A.H*.78)path(p.x<A.W/2?'av':'tk');return false}
const steps=[
{h:'Facts or judgements',p:'An honest talk starts with what happened, not with a label. Tap the box each card belongs in, or use the buttons.',
 predict:{q:'"You always ignore me" is…',opts:['an observation','a judgement','a request'],ans:1},task:'Sort all 6 cards',
 show:()=>play(0,OBS.map(o=>()=>sortObs(o[1])),400),
 go:()=>enter(0,'Six things someone might say to a friend.',()=>V.k>5,'Observations describe what happened. Judgements label the person.')},
{h:'Build the message',p:'Your friend told Mia something private. Tap each part, or use the buttons, until all four parts are clean.',
 predict:{q:'"I felt that you are a liar" is…',opts:['a feeling','a judgement dressed as a feeling','a request'],ans:1},task:'Make all 4 parts clean',
 show:()=>play(1,[()=>cycle(0),()=>cycle(0),()=>cycle(1),()=>cycle(1),()=>cycle(2),()=>cycle(2),()=>cycle(3),()=>cycle(3)],350),
 go:()=>enter(1,'A message in four parts: observation, feeling, need and request.',()=>V.pick.every((p,i)=>PARTS[i][1][p][1]==='ok'),'Observation, feeling, need, request: name the problem, not the person.')},
{h:'Real or face-saving?',p:'Now you were the one who shared the secret. Add lines to build your apology. Tap a line to take it out.',
 predict:{q:'"I am sorry if you were upset, but it was only a joke" is…',opts:['a real apology','a face-saving sorry','a fair request'],ans:1},task:'Build a real apology',
 show:()=>play(2,[()=>toggleSay(5),()=>toggleSay(5),()=>toggleSay(0),()=>toggleSay(1),()=>toggleSay(2),()=>toggleSay(3)],400),
 go:()=>enter(2,'An empty apology and seven lines you could say.',()=>{const S=score3();return S.good===4&&!S.bad},'A real apology names it, owns it, sees the hurt and says what will change.')},
{h:'Trust takes time',p:'After the apology, trust is low. Each week, keep your word or slip back. Tap the right of the chart to keep your word.',
 predict:{q:'After a real apology, trust comes back…',opts:['straight away','slowly, through what you do','never'],ans:1},task:'Get trust back to 100%',
 show:()=>play(3,[0,1,2,3,4,5,6].map(()=>()=>week(true)),300),
 go:()=>enter(3,'A trust chart for 8 weeks, starting at 30%.',()=>V.trust>=100,'Words start the repair. Weeks of kept promises finish it.')},
{h:'Avoid or talk?',p:'You could avoid the problem or talk it through. Try both paths and compare the friendship over 10 weeks.',
 predict:{q:'Friends who sort out a falling-out well usually end up…',opts:['further apart','closer than before','exactly the same'],ans:1},task:'Try both paths',
 show:()=>play(4,[()=>path('av'),()=>path('tk')],1500),
 go:()=>enter(4,'A friendship chart for the next 10 weeks.',()=>V.tried.av&&V.tried.tk&&V.draw.av>=1&&V.draw.tk>=1,'A conflict handled honestly can make a friendship stronger.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const CQ=[
 {pic:'"You never listen to me!"',q:'What is a cleaner way to start?',ans:'"When you looked at your phone while I talked…"',bad:[['"You are so rude."','label'],['"Everyone says you never listen."','gossip']]},
 {pic:'"Sorry, but you started it."',q:'What is wrong with this apology?',ans:'"but" shifts the blame',bad:[['nothing: it says sorry','word'],['it is too short','short']]},
 {pic:'"I feel that you are fake."',q:'Is this a real feeling?',ans:'no: it is a judgement',bad:[['yes: it starts with "I feel"','feelword'],['yes: it is honest','honest']]},
 {pic:'trust after an apology',q:'What rebuilds trust after a big falling-out?',ans:'keeping your word for weeks',bad:[['saying sorry louder','louder'],['buying them a present','gift']]},
 {pic:'a friend avoids the problem',q:'What usually happens if you avoid a problem with a friend?',ans:'the hurt stays and builds up',bad:[['it disappears on its own','vanish'],['the friendship gets stronger','strong']]},
 {pic:'"Just be better."',q:'Why is this a weak request?',ans:'it does not say what to do',bad:[['it is too polite','polite'],['requests should be orders','order']]}];
function slip(t){let m='Think: does it name the problem without attacking the person?';
 if(t==='label')m='A label attacks who they are. Describe what they did, so they can hear it.';
 if(t==='gossip')m='Bringing in "everyone" makes it an ambush. Speak for yourself.';
 if(t==='word')m='The word sorry is not enough. "But" cancels it and blames them.';
 if(t==='short')m='Short is fine. The problem is the "but", which shifts the blame.';
 if(t==='feelword')m='"I feel that…" usually hides a judgement. Real feelings are words like hurt, worried, embarrassed.';
 if(t==='honest')m='It may be honest, but it is a judgement about them, not a feeling in you.';
 if(t==='louder')m='Saying it again does not prove anything. Doing what you promised, week after week, does.';
 if(t==='gift')m='A gift can feel like buying your way out. Trust comes back through what you do over time.';
 if(t==='vanish')m='Avoided problems rarely vanish. The hurt stays and comes out in small digs.';
 if(t==='strong')m='Avoiding it does not strengthen the friendship. Repair is what makes it stronger.';
 if(t==='polite')m='Politeness is not the problem. "Better" is too vague: ask for one clear action.';
 if(t==='order')m='An order puts people on the defensive. A request they can say yes to works better.';
 return m}
function ask(){qn++;const Q=CQ[qn%CQ.length],o=[[Q.ans,'ok'],...Q.bad],r=qn%3,ord=o.slice(r).concat(o.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>score(t,Q.ans)});speak('Challenge: '+Q.q);A.redraw()}
function score(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();speak(ok?'Yes: '+ans+'.':slip(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Repair lab controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);reset();A.gest({down});keys()}});
A.start()})})();
