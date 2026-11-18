/* Flagship – reporting and recounting (ages 8–11; CCSS SL.4.4 / SL.5.4, NC England spoken language): keep facts on topic,
   group them, order a recount, add a descriptive detail, then pick a clear speaking pace for the time you have. */
(()=>{
/* [card, 1 keep / 0 leave out, why: f fact, o opinion, t off topic] */
const KEEP=[['Hedgehogs eat beetles and worms.',1,'f'],['Hedgehogs are the cutest animals.',0,'o'],['My cat is called Max.',0,'t'],
 ['Hedgehogs roll into a ball when scared.',1,'f'],['Hedgehog spines are the best thing ever.',0,'o'],['Hedgehogs sleep through the winter.',1,'f'],['I like pizza.',0,'t']];
const GROUPS=['What it looks like','What it eats','Where it lives'];
const SORT=[['It has thousands of sharp spines.',0],['It eats slugs and worms.',1],['It lives in hedges and gardens.',2],['It has a pointed snout.',0],['It hunts for beetles at night.',1],['It sleeps in a nest of leaves.',2]];
/* recounts: [title, events in the right order] */
const TRIPS=[['Our zoo trip',['Last Friday, Class 4 went to the zoo.','First, we got on the coach at school.','Next, we watched the penguins being fed.','After that, we ate lunch by the lake.','Finally, we got back to school, tired and happy.']],
 ['My first swim badge',['On Saturday, I took my 10 metre swim test.','First, I put on my goggles.','Then I swam two widths without stopping.','In the end, I got my badge and felt proud.']]];
/* [plain sentence, [detail, kind: d detail, v vague, x adds nothing / off topic]] */
const DETAIL=[['We saw a waterfall.',[['It roared and sprayed us with cold water.','d'],['It was really good.','v'],['I have a new coat.','x']]],
 ['The penguins were fed.',[['They gulped down silver fish in one go.','d'],['It was nice.','v'],['We have a cat at home.','x']]],
 ['Hedgehogs have spines.',[['They are stiff and sharp and stand up when it is scared.','d'],['They are very interesting.','v'],['I saw a fox once.','x']]],
 ['We ate lunch by the lake.',[['Ducks paddled over to watch our sandwiches.','d'],['It was fun.','v'],['Lakes are full of water.','x']]]];
/* pace rounds: [words in the talk, seconds you have] ; clear pace is about 110–160 words a minute */
const PACE=[[130,60],[260,120],[300,60]],LO=110,HI=160;
VIS.reg('flagrecount',c=>{let A,g,ctl,qa,qn=-1,run=0;const K={};
const NV='#0f172a',GO='#047857',NO='#be123c',WH='#ffffff',RIM='#64748b',SEL='#1d4ed8',CREAM='#fef3c7',CREAMT='#78350f';
const u=n=>Math.round(n*(A.narrow?.94:1.08)),F=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`,hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const leg=()=>['keep','sort','trip','detail','pace','quiz'][A.step];
const fin={keep:()=>K.keep.n>=KEEP.length,sort:()=>K.sort.n>=SORT.length,trip:()=>K.trip.t>=TRIPS.length,detail:()=>K.detail.n>=DETAIL.length,pace:()=>K.pace.r>=PACE.length};
const red=()=>A.col.dark?'#fda4af':NO;
function paper(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function setF(n,w,al){g.font=F(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function lines(t,x,y,w,n){const L=[];let s='';t.split(' ').forEach(q=>{const k=s?s+' '+q:q;if(g.measureText(k).width>w&&s){L.push(s);s=q}else s=k});L.push(s);
 const lh=u(n)*1.25;L.forEach((v,i)=>g.fillText(v,x,y+(i-(L.length-1)/2)*lh))}
function card(r,t,o){o=o||{};g.fillStyle=o.bg||WH;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ring?3.5:1.4;g.strokeStyle=o.ring||RIM;g.stroke();
 if(t!=null){g.fillStyle=o.ink||NV;setF(o.n||16,o.w||700);lines(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||16)}}
function title(t,won){setF(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=u(14)+14,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':WH,ring:won?GO:null});g.fillStyle=NV;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){g.fillStyle=col||A.col.tx;setF(n||15,650);lines(t,A.W/2,y,A.W-26,n||15)}
function wrapUp(t,L){paper();title(t,1);L.forEach((s,i)=>card({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
function cardBox(){const w=Math.min(A.W-24,u(330)),h=u(66);return K.drag&&K.drag.c?{x:K.drag.x-w/2,y:K.drag.y-h/2,w,h}:{x:A.W/2-w/2,y:A.H*.17,w,h}}
/* step 1: keep or leave out */
function bins(){const y=A.H*.56,h=A.H*.32,w=(A.W-36)/2;return[{k:1,x:12,y,w,h,t:'Use in my report'},{k:0,x:24+w,y,w,h,t:'Leave out'}]}
function drawKeep(){const s=K.keep;paper();if(fin.keep())return wrapUp('Report notes ready',['Keep facts you can check.','Leave out opinions (cutest, best).','Leave out things that are not about the topic.']);
 title(`Card ${s.n+1} of 7: a report about hedgehogs`);
 bins().forEach(b=>{card(b,null,{bg:b.k?'#dcfce7':'#f1f5f9',ring:s.bad===b.k?NO:null});g.fillStyle=NV;setF(15,800);lines(b.t,b.x+b.w/2,b.y+b.h/2,b.w-12,15)});
 card(cardBox(),KEEP[s.n][0],{n:17,ring:K.drag?SEL:null});if(s.msg)note(s.msg,A.H*.44,13,red())}
function keep(k){const s=K.keep;if(fin.keep())return;const [t,ans,why]=KEEP[s.n];let m;
 if(k===ans){s.n++;s.bad=null;s.msg='';A.sound.pop();return voice(ans?'Kept: a fact about hedgehogs you can check.':why==='o'?'Left out: that is an opinion.':'Left out: it is not about hedgehogs.')}
 s.bad=k;A.sound.miss();
 if(why==='o')m='That is an opinion: not everyone would agree. A report gives facts you can check.';
 else if(why==='t')m='That is not about hedgehogs. Every fact in a report is about the topic.';
 else m='This is a fact about hedgehogs that you can check. Keep it.';s.msg=m;voice(m)}
/* step 2: group the facts */
function groups(){const y=A.H*.52,h=A.H*.36,gp=8,w=(A.W-24-2*gp)/3;return GROUPS.map((t,j)=>({j,t,x:12+j*(w+gp),y,w,h}))}
function drawSort(){const s=K.sort;paper();if(fin.sort())return wrapUp('Facts in groups',['Looks: spines, snout','Food: slugs, worms, beetles','Home: hedges, gardens, leaf nests']);
 title(`Fact ${s.n+1} of 6: which part of the talk?`);
 groups().forEach(r=>{card(r,null,{bg:['#e0e7ff','#fce7f3','#dcfce7'][r.j],ring:s.bad===r.j?NO:null});g.fillStyle=NV;setF(13,800);lines(r.t,r.x+r.w/2,r.y+u(22),r.w-8,13);
  setF(12,650);g.fillText(`${s.got[r.j]} fact${s.got[r.j]===1?'':'s'}`,r.x+r.w/2,r.y+r.h-u(16))});
 card(cardBox(),SORT[s.n][0],{n:17,ring:K.drag?SEL:null});if(s.msg)note(s.msg,A.H*.43,13,red())}
function sort(j){const s=K.sort;if(fin.sort())return;const [t,ans]=SORT[s.n];let m;
 if(j===ans){s.got[j]++;s.n++;s.bad=null;s.msg='';A.sound.pop();return voice(`Yes: ${GROUPS[j].toLowerCase()}.`)}
 s.bad=j;A.sound.miss();m=`This fact is about ${GROUPS[ans].toLowerCase()}, not ${GROUPS[j].toLowerCase()}. Keep each group together so listeners can follow.`;s.msg=m;voice(m)}
/* step 3: order the recount */
function pile(){const [,E]=TRIPS[K.trip.t],left=E.map((e,i)=>i).filter(i=>i>=K.trip.k),h=u(46),gp=6,y0=A.H*.3;
 const ord=left.slice().sort((a,b)=>((a*7+3)%5)-((b*7+3)%5));return ord.map((i,j)=>({i,t:E[i],x:12,w:A.W-24,h,y:y0+j*(h+gp)}))}
function drawTrip(){const s=K.trip;paper();if(fin.trip())return wrapUp('Both recounts in order',['Start: who, where and when','Middle: what happened, in order','End: how it ended or felt']);
 const [ti,E]=TRIPS[s.t];title(`${ti}: tap what comes next`);
 if(s.k)note(`${s.k} of ${E.length} in order. Last: ${E[s.k-1]}`,A.H*.125,13,A.col.dark?'#6ee7b7':GO);
 if(s.msg)note(s.msg,A.H*.215,13,red());pile().forEach(r=>card(r,r.t,{n:14,bg:s.bad===r.i?'#ffe4e6':CREAM,ink:CREAMT,ring:s.bad===r.i?NO:null}))}
function trip(i){const s=K.trip;if(fin.trip())return;const [,E]=TRIPS[s.t];let m;
 if(i===s.k){s.k++;s.bad=null;s.msg='';A.sound.pop();if(s.k>=E.length){s.t++;s.k=0;return voice('In order: beginning, middle, end.')}return voice(E[i])}
 s.bad=i;A.sound.miss();
 if(s.k===0)m='Start with who, where and when, so listeners know what the recount is about.';
 else if(i===E.length-1)m='That is how it ended. Save it for the end.';
 else m='That happened later. What came before it?';s.msg=m;voice(m)}
/* step 4: add a detail */
function opts(){const [,D]=DETAIL[K.detail.n],k=K.detail.n%3,ord=D.slice(k).concat(D.slice(0,k)),h=u(58),gp=u(9);return ord.map((d,j)=>({t:d[0],kind:d[1],x:14,w:A.W-28,h,y:A.H*.3+j*(h+gp)}))}
function drawDetail(){const s=K.detail;paper();if(fin.detail())return wrapUp('4 details added',['Use your senses: what did you see, hear, feel?','"It was nice" tells the listener nothing.','Every detail is about the topic.']);
 title(`Sentence ${s.n+1} of 4: which detail paints a picture?`);note(DETAIL[s.n][0],A.H*.19,19,A.col.tx);
 opts().forEach(r=>card(r,r.t,{n:15,bg:s.bad===r.t?'#ffe4e6':WH,ring:s.bad===r.t?NO:null}));if(s.msg)note(s.msg,A.H*.89,13,red())}
function detail(t,kind){const s=K.detail;if(fin.detail())return;let m;
 if(kind==='d'){s.n++;s.bad=null;s.msg='';A.sound.pop();return voice(`Yes: "${t}" lets the listener see and hear it.`)}
 s.bad=t;A.sound.miss();m=kind==='v'?`"${t}" is vague: it does not say what you saw, heard or felt.`:`"${t}" does not add to this part of the talk. Pick a detail about it.`;s.msg=m;voice(m)}
/* step 5: pace */
function track(){return{x:A.W*.1,y:A.H*.58,w:A.W*.8}}
const wpmX=v=>{const T=track();return T.x+(v-60)/160*T.w};
function drawPace(){const s=K.pace;paper();if(fin.pace())return wrapUp('Pace sorted',['Clear pace: about 110 to 160 words a minute','Too long? Cut facts; do not talk faster.','Time = words ÷ pace']);
 const [w,sec]=s.cut?[140,60]:PACE[s.r],T=track(),secs=Math.round(w/s.v*60);title(`Talk ${s.r+1} of 3: ${w} words, about ${sec/60} minute${sec>60?'s':''}`);
 const face=s.v>HI?'too fast':s.v<LO?'too slow':'clear';
 g.fillStyle=face==='clear'?'#bbf7d0':'#fecaca';g.beginPath();g.arc(A.W/2,A.H*.24,u(34),0,7);g.fill();g.fillStyle=NV;
 g.beginPath();g.arc(A.W/2-u(11),A.H*.22,3.5,0,7);g.arc(A.W/2+u(11),A.H*.22,3.5,0,7);g.fill();g.strokeStyle=NV;g.lineWidth=2.5;g.beginPath();
 if(face==='clear')g.arc(A.W/2,A.H*.25,u(14),.2*Math.PI,.8*Math.PI);else{g.moveTo(A.W/2-u(12),A.H*.29);g.lineTo(A.W/2+u(12),A.H*.29)}g.stroke();
 note(`${s.v} words a minute: ${face}. Talk takes ${Math.floor(secs/60)} min ${secs%60} s.`,A.H*.39,14);
 g.fillStyle='#bbf7d0';g.fillRect(wpmX(LO),T.y-10,wpmX(HI)-wpmX(LO),20);g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(T.x,T.y);g.lineTo(T.x+T.w,T.y);g.stroke();
 setF(11,700);g.fillStyle=A.col.tx;g.fillText('slow',T.x,T.y+24);g.fillText('fast',T.x+T.w,T.y+24);g.fillText('clear',wpmX(135),T.y+24);
 g.fillStyle=SEL;g.beginPath();g.arc(wpmX(s.v),T.y,u(14),0,7);g.fill();if(s.msg)note(s.msg,A.H*.82,13,s.ok?(A.col.dark?'#6ee7b7':GO):red())}
function setV(v){const s=K.pace;s.v=Math.max(60,Math.min(220,Math.round(v/5)*5));s.msg='';A.cv.setAttribute('aria-label',`Pace ${s.v} words a minute`);A.redraw()}
function check(){const s=K.pace;if(fin.pace())return;const [w,sec]=s.cut?[140,60]:PACE[s.r],secs=w/s.v*60;let m;
 if(!s.cut&&w/HI*60>sec+10){A.sound.miss();m=`Even at ${HI} words a minute, ${w} words take ${Math.round(w/HI*60)} s. Talking faster will lose your listeners. Cut some facts.`;s.msg=m;s.needCut=1;return voice(m)}
 if(s.v>HI)m=`Too fast: at ${s.v} words a minute listeners miss facts. Slow down.`;
 else if(s.v<LO)m=`Too slow: listeners drift off and the talk takes ${Math.round(secs)} s. Speed up a little.`;
 else if(Math.abs(secs-sec)>10)m=`Clear, but the talk takes ${Math.round(secs)} s and you have about ${sec} s. Change the pace.`;
 if(m){A.sound.miss();s.msg=m;return voice(m)}
 s.r++;s.cut=0;s.needCut=0;s.v=200;s.msg='';A.sound.pop();voice(`Clear and on time: ${Math.round(secs)} s.`)}
function cut(){const s=K.pace;if(!s.needCut)return;s.cut=1;s.needCut=0;s.msg='Cut to the 3 best groups of facts: now 140 words.';voice(s.msg)}
function down(p){const k=leg();
 if(k==='trip'&&!fin.trip()){const r=pile().find(r=>hit(p,r));if(r)trip(r.i)}
 if(k==='detail'&&!fin.detail()){const r=opts().find(r=>hit(p,r));if(r)detail(r.t,r.kind)}
 if((k==='keep'&&!fin.keep()||k==='sort'&&!fin.sort())&&hit(p,cardBox())){K.drag={c:1,x:p.x,y:p.y};A.redraw();return true}
 if(k==='pace'&&!fin.pace()&&Math.abs(p.y-track().y)<40){K.drag={v:1};setV(60+(p.x-track().x)/track().w*160);return true}return false}
function move(p){if(!K.drag)return;if(K.drag.v)return setV(60+(p.x-track().x)/track().w*160);K.drag.x=p.x;K.drag.y=p.y;A.redraw()}
function up(p){const d=K.drag;if(!d)return;K.drag=null;const k=leg();if(d.v)return voice(`Pace ${K.pace.v} words a minute.`);
 if(k==='keep'){const b=bins().find(b=>hit(p,b));if(b)return keep(b.k)}
 if(k==='sort'){const b=groups().find(b=>hit(p,b));if(b)return sort(b.j)}A.redraw()}
function clear(){run++;for(const k in K)delete K[k];Object.assign(K,{keep:{n:0},sort:{n:0,got:[0,0,0]},trip:{t:0,k:0},detail:{n:0},pace:{r:0,v:200},drag:null,chk:()=>{}})}
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();K.chk()}
function open(i,first,ok,msg){clear();voice(first);K.chk=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=leg(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='keep'&&!fin.keep()){b('Use it',()=>keep(1),'Use this card in my report');b('Leave out',()=>keep(0),'Leave this card out')}
 if(k==='sort'&&!fin.sort())GROUPS.forEach((t,j)=>b(t,()=>sort(j),`Put the fact in ${t}`));
 if(k==='trip'&&!fin.trip())pile().forEach(r=>b(r.t,()=>trip(r.i),`Next: ${r.t}`));
 if(k==='detail'&&!fin.detail())opts().forEach(r=>b(r.t,()=>detail(r.t,r.kind),`Add: ${r.t}`));
 if(k==='pace'&&!fin.pace()){b('Slower',()=>setV(K.pace.v-10),'Slower by 10 words a minute');b('Faster',()=>setV(K.pace.v+10),'Faster by 10 words a minute');b('Try the talk',check);if(K.pace.needCut)b('Cut facts',cut,'Cut to the 3 best groups of facts')}}
const steps=[
{h:'Facts, not opinions',p:'A report gives facts about one topic. A fact can be checked. An opinion is what someone thinks. Drag each card into a box.',
predict:{q:'"Hedgehogs are the cutest animals." Does it go in a report?',opts:['yes, it is about hedgehogs','no, it is an opinion'],ans:1},task:'Sort all 7 cards',
show:()=>auto(0,KEEP.map(q=>()=>keep(q[1])),550),go:()=>open(0,'Drag the card into a box.',fin.keep,'Facts on the topic only.')},
{h:'Group the facts',p:'Put facts that go together in one group. Then talk about one group at a time, so listeners can follow.',task:'Group all 6 facts',
show:()=>auto(1,SORT.map(q=>()=>sort(q[1])),550),go:()=>open(1,'Drag the fact into a group.',fin.sort,'One group at a time.')},
{h:'Beginning, middle, end',p:'A recount tells what happened, in order. Start with who, where and when. Then the events. Then how it ended.',
predict:{q:'What comes first in a recount?',opts:['the most exciting part','who, where and when'],ans:1},task:'Order both recounts',
show:()=>auto(2,TRIPS.flatMap(T=>T[1].map(()=>()=>trip(K.trip.k))),450),go:()=>open(2,'Tap what comes next.',fin.trip,'Time words help: first, next, after that, finally.')},
{h:'Add a detail',p:'A good detail helps listeners see, hear or feel it. Pick the detail that paints a picture.',
predict:{q:'Which detail helps more: "It was really good" or "It roared and sprayed us"?',opts:['It was really good','It roared and sprayed us'],ans:1},task:'Add all 4 details',
show:()=>auto(3,DETAIL.map(q=>()=>detail(q[1][0][0],'d')),600),go:()=>open(3,'Tap the best detail.',fin.detail,'Show, with your senses.')},
{h:'Find your pace',p:'Speak at a pace listeners can follow: about 110 to 160 words a minute. Drag the dot, then try the talk. Time = words ÷ pace.',task:'Give all 3 talks',
show:()=>auto(4,[()=>setV(130),check,()=>setV(130),check,check,cut,()=>setV(140),check],500),go:()=>open(4,'Drag the dot to set your pace, then try the talk.',fin.pace,'Clear beats fast.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.chk()});
const QS=[
{q:'Which belongs in a report about owls?',a:'Owls hunt at night.',o:[['Owls are the best birds.','That is an opinion. A report gives facts you can check.'],['My gran has a parrot.','That is not about owls.']]},
{q:'How should a recount start?',a:'Who, where and when',o:[['The funniest moment','Save the big moment for the middle. Start with who, where and when.'],['How it ended','The ending goes last, so the story is in order.']]},
{q:'Which detail is best? "We went to the beach. ___"',a:'Cold waves crashed over our feet.',o:[['It was nice.','"Nice" is vague. Say what you saw, heard or felt.'],['Beaches are by the sea.','Everyone knows that. Pick a detail from your day.']]},
{q:'Your talk is 280 words and you have 1 minute. What should you do?',a:'Cut some facts',o:[['Talk really fast','At 280 words a minute, listeners will miss most facts.'],['Keep going after the time','Your listeners and the next speaker need you to finish on time.']]},
{q:'At 120 words a minute, how long does a 240-word talk take?',a:'2 minutes',o:[['1 minute','Time = words ÷ pace: 240 ÷ 120 = 2 minutes.'],['4 minutes','You divide, not multiply: 240 ÷ 120 = 2.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qa.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(m,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const k=leg();if(k==='quiz'){paper();title('Challenge',1);['Facts on the topic','Grouped and in order','Details that paint a picture','A clear pace'].forEach((t,i)=>note(t,A.H*(.26+i*.15),18));return}
 ({keep:drawKeep,sort:drawSort,trip:drawTrip,detail:drawDetail,pace:drawPace})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.75,tall:1.3,draw,onStep:B=>{qa.hidden=B.step!==5;ctl.hidden=B.step===5;pads()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Talk buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pads()}}).start()})})();
