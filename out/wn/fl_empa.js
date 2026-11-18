/* Flagship: sympathy versus empathy (12-13). Climb down to Jas, cross out shrink-and-fix lines, ask open questions,
   reflect feeling and meaning, spot compassion fatigue in a helper's week. */
(()=>{
const HOLE=[['Jas: “We’re moving away in June. I have to leave everyone.”',
  [['“That sounds really hard. Leaving everyone you know is a lot.”',2],['“Oh no, poor you. That’s a shame.”',1],['“At least you’ll get a bigger bedroom!”',0]]],
 ['Jas: “Mum says I’ll make new friends, like that fixes it.”',
  [['“Cheer up, it’s not the end of the world.”',0],['“So it feels like nobody gets how much you’ll miss people?”',2],['“Aw, I feel so sorry for you.”',1]]],
 ['Jas: “I just keep thinking about my last day.”',
  [['“I’m sorry. Anyway, did you see the match?”',1],['“Try not to think about it.”',0],['“I can see why that day is on your mind. Want to tell me about it?”',2]]],
 ['Jas: “Thanks for listening. Nobody else has.”',
  [['“I’m here. You don’t have to go through this on your own.”',2],['“Well, you should have told me sooner.”',0],['“That’s sad that nobody listened.”',1]]]];
const HWHY=['Silver lining. “At least” shrinks the feeling, so Jas feels less heard.','Sympathy: feeling sorry from a distance. Kind, but it keeps you at the top.'];
const DRAFT=[['That sounds really hard.',0],['At least it’s not forever.',1,'“At least” makes her feeling smaller.'],['I’d hate leaving my friends too.',0],['Don’t be sad.',1,'Telling someone not to feel something does not stop it. It tells them to hide it.'],
 ['Just make new friends online.',1,'A quick fix before she has finished says “stop sharing”.'],['I’m here if you want to talk.',0],['You’ll get over it.',1,'This rushes her feeling and judges it as too much.']];
const ASK=[['“Are you OK?”',0,'“Yeah, fine.”'],['“What’s been the hardest part?”',1,'“Honestly? Not knowing anyone. And leaving Gran, she lives next door.”'],['“Is it Leeds?”',0,'“Yes.”'],
 ['“How are you feeling about it today?”',1,'“Worse than yesterday. I keep looking at the house and thinking it won’t be ours.”'],['“Did your mum tell you yesterday?”',0,'“Mm.”'],['“What do you think you’ll miss most?”',1,'“The walk to school with you lot. Silly, but that’s it.”']];
const MIRROR=[['“I’ve packed my room and it doesn’t feel like home any more.”',[['“So it’s starting to feel real, and that’s unsettling?”',1],['“I’ve packed my room and it doesn’t feel like home any more?”',0,'parrot'],['“When we moved, I loved packing!”',0,'me']]],
 ['“Gran cried when we told her. I didn’t know what to say.”',[['“You should buy her some flowers.”',0,'fix'],['“That sounds painful, seeing Gran upset and feeling stuck for words.”',1],['“Gran cried?”',0,'parrot']]],
 ['“Part of me is excited, which makes me feel guilty.”',[['“Don’t feel guilty, it’s fine.”',0,'fix'],['“My cousin moved and she was fine.”',0,'me'],['“So you’ve got mixed feelings: excited and guilty at the same time?”',1]]]];
const MWHY={parrot:'Repeating her exact words is an echo. Say the meaning in your own words and name the feeling.',me:'This turns the talk to your story. Keep the focus on her for now.',fix:'Advice too soon. Show you understand first; later, ask if she wants ideas.'};
const WEEK=[['Mon: Felt sad for Amir after his news, then went to football.',0,'Feeling for someone, then getting on with your day, is healthy.'],['Tue: Phone buzzed and my stomach dropped. Another problem.',1,'Dreading messages is a warning sign. Helping has become a weight.'],
 ['Wed: Lay awake going over everyone’s worries.',1,'Losing sleep over others’ problems is a warning sign.'],['Thu: Told Mum I was worried about Jas.',0,'Sharing a heavy worry with a trusted adult protects you both.'],
 ['Fri: Snapped at my brother for nothing.',1,'Getting irritable is a sign of being worn out from caring.'],['Sat: Amir told me something sad and I felt nothing.',1,'Feeling numb when people share is a sign you need to recharge.'],['Sun: Said “I can talk tomorrow, I need tonight off.”',0,'A kind boundary keeps you able to help. That is protecting yourself.']];
VIS.reg('flagempa',c=>{let A,ctl,chq,qn=-1;const G={};
const DK='#0f172a',YES='#047857',NO='#b91c1c',EDGE='#64748b',FOC='#1d4ed8';
const stage=()=>['hole','draft','ask','mirror','week','chal'][A.step];
const font=(px,w)=>`${w||600} ${Math.round(A.narrow?px:px*1.1)}px system-ui,sans-serif`;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.07:.42);g.fillRect(0,0,A.W,A.H)}
function split(t,w,px){const g=A.ctx;g.font=font(px);const L=[];let cur='';t.split(' ').forEach(x=>{const nx=cur?cur+' '+x:x;if(cur&&g.measureText(nx).width>w){L.push(cur);cur=x}else cur=nx});L.push(cur);return L}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=o.y||o.n||o.f?3.5:1.5;g.strokeStyle=o.y?YES:o.n?NO:o.f?FOC:EDGE;g.stroke();
 if(!t)return;const px=o.px||13,L=split(t,r.w-14,px);g.fillStyle=DK;g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*px*1.25));
 if(o.strike){g.strokeStyle=NO;g.lineWidth=2.5;const y=r.y+r.h/2;g.beginPath();g.moveTo(r.x+10,y);g.lineTo(r.x+r.w-10,y);g.stroke()}}
function head(t,ok){const g=A.ctx;g.font=font(12,800);const w=Math.min(A.W-10,g.measureText(t).width+24);tile({x:(A.W-w)/2,y:6,w,h:28},t,{px:12,y:ok})}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function meter(v,label,y){const g=A.ctx,x=A.W*.15,w=A.W*.7;g.fillStyle=A.alpha(A.col.mu,.3);A.paint.rrect(x,y,w,14,7);g.fill();g.fillStyle=YES;A.paint.rrect(x,y,Math.max(14,w*v),14,7);g.fill();g.fillStyle=A.col.tx;g.font=font(11,700);g.textAlign='center';g.textBaseline='bottom';g.fillText(label,A.W/2,y-3)}
/* 1 the hole */
function opts3(top){const h=Math.min(58,A.H*.12),w=A.W-20;return[0,1,2].map(i=>({x:10,y:top+i*(h+8),w,h}))}
function drawHole(){const H=G.h,g=A.ctx;bg();const n=HOLE.length,done=H.k>=n;head(done?'You are down there with Jas':`Reply ${H.k+1} of ${n}: tap the reply that feels with her`,done);
 const hx=A.W*.72,top=A.H*.1,bot=A.H*.42,hw=A.W*.22;g.fillStyle=A.col.dark?'#334155':'#a8a29e';g.fillRect(hx-hw/2,top+20,hw,bot-top-20);g.fillStyle=A.col.dark?'#1e293b':'#78716c';g.fillRect(hx-hw/2+6,top+26,hw-12,bot-top-32);
 g.strokeStyle='#92400e';g.lineWidth=3;for(let i=0;i<=n;i++){const y=top+26+i*(bot-top-40)/n;g.beginPath();g.moveTo(hx-14,y);g.lineTo(hx+14,y);g.stroke()}
 const who=(x,y,col,t)=>{g.beginPath();g.arc(x,y,16,0,7);g.fillStyle=col;g.fill();g.strokeStyle='#334155';g.lineWidth=2;g.stroke();g.fillStyle=DK;g.font=font(11,800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)};
 who(hx,bot-14,'#fbcfe8','Jas');const yy=top+10+H.k*(bot-top-40)/n;who(H.k?hx:hx+hw/2+20,H.k?Math.min(yy,bot-48):top+12,'#bfdbfe','You');
 if(done){tile({x:10,y:A.H*.5,w:A.W-20,h:70},'Empathy is feeling with someone. You need no perfect words, just to stay.',{px:13,y:1});return}
 const[jas,ch]=HOLE[H.k];g.fillStyle=A.col.tx;g.font=font(12,700);g.textAlign='left';g.textBaseline='top';split(jas,A.W*.55,12).forEach((s,i)=>g.fillText(s,10,A.H*.12+i*16));
 opts3(A.H*.46).forEach((r,i)=>tile(r,ch[i][0],{px:13,n:H.bad===i}))}
function climb(i){const H=G.h;if(H.k>=HOLE.length)return;const kind=HOLE[H.k][1][i][1];
 if(kind<2){H.bad=i;A.sound.miss();return tell(HWHY[kind])}H.k++;H.bad=null;A.sound.pop();tell(H.k>=HOLE.length?'You are down with her. Empathy says: I see how hard this is, and you are not alone.':'Empathy: you named how it feels. Down one rung.')}
/* 2 cross out */
function lines(){const n=DRAFT.length,h=Math.min(46,(A.H*.72-(n-1)*6)/n);return DRAFT.map((_,i)=>({x:12,y:A.H*.2+i*(h+6),w:A.W-24,h}))}
function drawDraft(){const D=G.d,g=A.ctx,need=DRAFT.filter(x=>x[1]).length;bg();head(D.x.length>=need?'Only the listening lines are left':`Cross out the shrink-or-fix lines (${D.x.length} of ${need})`,D.x.length>=need);
 meter(.25+.75*D.x.length/need,'how heard Jas feels',A.H*.15);lines().forEach((r,i)=>tile(r,DRAFT[i][0],{px:13,strike:D.x.includes(i),n:D.bad===i,bg:D.x.includes(i)?'#fee2e2':'#ffffff'}))}
function strike(i){const D=G.d,need=DRAFT.filter(x=>x[1]).length;if(D.x.includes(i)||D.x.length>=need)return;const[t,bad,why]=DRAFT[i];
 if(!bad){D.bad=i;A.sound.miss();return tell(`Keep “${t}” It listens without judging or fixing.`)}D.x.push(i);D.bad=null;A.sound.pop();tell(why+(D.x.length>=need?' What is left: name it, feel with her, stay.':''))}
/* 3 open questions */
function qgrid(){const w=(A.W-30)/2,h=Math.min(54,A.H*.12);return ASK.map((_,i)=>({x:10+(i%2)*(w+10),y:A.H*.56+Math.floor(i/2)*(h+8),w,h}))}
function drawAsk(){const Q=G.q,g=A.ctx,need=ASK.filter(x=>x[1]).length;bg();head(Q.got.length>=need?'3 open questions found':`Tap questions to ask Jas (open ones found: ${Q.got.length} of ${need})`,Q.got.length>=need);
 const said=Q.last==null?'…':ASK[Q.last][2],r={x:12,y:A.H*.13,w:A.W-24,h:A.H*.24};tile(r,'Jas: '+said,{px:14,bg:'#fce7f3',y:Q.last!=null&&ASK[Q.last][1]});
 meter(Math.min(1,Q.words/40),'how much Jas opens up',A.H*.45);qgrid().forEach((b,i)=>tile(b,ASK[i][0],{px:12,y:Q.got.includes(i),n:Q.tried.includes(i)&&!ASK[i][1]}))}
function ask(i){const Q=G.q,need=ASK.filter(x=>x[1]).length;if(Q.got.length>=need)return;const[t,open,ans]=ASK[i];Q.last=i;if(!Q.tried.includes(i))Q.tried.push(i);
 if(!open){A.sound.miss();return tell(`${t} is closed. Jas answers in one word: ${ans} Try What or How.`)}
 if(!Q.got.includes(i)){Q.got.push(i);Q.words+=ans.split(' ').length}A.sound.pop();tell(`Open question, so Jas says more: ${ans}`+(Q.got.length>=need?' Open questions let her lead.':''))}
/* 4 reflect */
function drawMirror(){const M=G.m,g=A.ctx;bg();if(M.k>=MIRROR.length){head('3 reflections that hit the feeling',1);tile({x:10,y:A.H*.35,w:A.W-20,h:80},'Say back the meaning in your own words and name the feeling. Then let her correct you.',{px:14,y:1});return}
 head(`Jas says ${M.k+1} of 3: tap the best reflection`);const[said,ch]=MIRROR[M.k];tile({x:12,y:A.H*.12,w:A.W-24,h:A.H*.2},said,{px:14,bg:'#fce7f3'});opts3(A.H*.4).forEach((r,i)=>tile(r,ch[i][0],{px:13,n:M.bad===i}))}
function mirror(i){const M=G.m;if(M.k>=MIRROR.length)return;const[t,ok,why]=MIRROR[M.k][1][i];if(!ok){M.bad=i;A.sound.miss();return tell(MWHY[why])}
 M.k++;M.bad=null;A.sound.pop();tell('Yes: her meaning in your words, with the feeling named.'+(M.k>=MIRROR.length?' Reflecting shows you really heard.':''))}
/* 5 helper's week */
function days(){const n=WEEK.length,h=Math.min(46,(A.H*.76-(n-1)*6)/n);return WEEK.map((_,i)=>({x:12,y:A.H*.2+i*(h+6),w:A.W-24,h}))}
function drawWeek(){const W=G.w,g=A.ctx,need=WEEK.filter(x=>x[1]).length;bg();head(W.got.length>=need?'All 4 warning signs found':`Kai’s week: tap the warning signs (${W.got.length} of ${need})`,W.got.length>=need);
 meter(1-.2*W.got.length,'Kai’s energy',A.H*.15);days().forEach((r,i)=>tile(r,WEEK[i][0],{px:12,y:W.got.includes(i)||(W.ok.includes(i)),n:W.bad===i,bg:W.got.includes(i)?'#fef3c7':'#ffffff'}))}
function sign(i){const W=G.w,need=WEEK.filter(x=>x[1]).length;if(W.got.includes(i)||W.got.length>=need)return;const[t,warn,why]=WEEK[i];
 if(!warn){W.bad=i;if(!W.ok.includes(i))W.ok.push(i);A.sound.tick();return tell('Not a warning sign. '+why)}W.got.push(i);W.bad=null;A.sound.pop();tell(why+(W.got.length>=need?' This is compassion fatigue. Kai needs rest, limits and a trusted adult to share the load.':''))}
/* frame */
function draw(){const s=stage();if(s==='chal'){bg();head('Challenge',1);tile({x:16,y:A.H*.4,w:A.W-32,h:60},'Feel with them, do not shrink or fix, open up, reflect, look after yourself.',{px:13});return}
 ({hole:drawHole,draft:drawDraft,ask:drawAsk,mirror:drawMirror,week:drawWeek})[s]();A.fx.draw(A.ctx)}
function down(p){const s=stage(),at=rs=>rs.findIndex(r=>inside(p,r));
 if(s==='hole'&&G.h.k<HOLE.length){const i=at(opts3(A.H*.46));if(i>=0)climb(i)}
 if(s==='draft'){const i=at(lines());if(i>=0)strike(i)}
 if(s==='ask'){const i=at(qgrid());if(i>=0)ask(i)}
 if(s==='mirror'&&G.m.k<MIRROR.length){const i=at(opts3(A.H*.4));if(i>=0)mirror(i)}
 if(s==='week'){const i=at(days());if(i>=0)sign(i)}return false}
function clear(){for(const k in G)delete G[k];Object.assign(G,{h:{k:0,bad:null},d:{x:[],bad:null},q:{got:[],tried:[],last:null,words:4},m:{k:0,bad:null},w:{got:[],ok:[],bad:null},cb:()=>{},id:(G.id||0)+1})}
function tell(t){if(t){c.say(t);A.cv.setAttribute('aria-label',t)}A.redraw();btns();G.cb()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,d,ok,msg){clear();tell(d);G.cb=finish(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const id=G.id;acts.forEach((a,j)=>setTimeout(()=>{if(id===G.id)a()},(A.reduced()?40:ms)*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const s=stage(),B=(t,fn,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},ctl,t).onclick=fn};
 if(s==='hole'&&G.h.k<HOLE.length)HOLE[G.h.k][1].forEach((x,i)=>B(x[0],()=>climb(i),'Reply: '+x[0]));
 if(s==='draft')DRAFT.forEach((x,i)=>{if(!G.d.x.includes(i))B('✗ '+x[0],()=>strike(i),'Cross out: '+x[0])});
 if(s==='ask')ASK.forEach((x,i)=>B(x[0],()=>ask(i),'Ask: '+x[0]));
 if(s==='mirror'&&G.m.k<MIRROR.length)MIRROR[G.m.k][1].forEach((x,i)=>B(x[0],()=>mirror(i),'Reflect: '+x[0]));
 if(s==='week')WEEK.forEach((x,i)=>{if(!G.w.got.includes(i))B(x[0].split(':')[0]+': sign?',()=>sign(i),'Warning sign? '+x[0])})}
const idx=(L,f)=>L.map((x,i)=>f(x)?i:-1).filter(i=>i>=0);
const steps=[
{h:'Feel with, not sorry for',p:'Jas feels stuck in a hole. Sympathy calls down from the top. Empathy climbs down and stays. Tap the reply that feels with her.',
 predict:{q:'“At least you’ll get a bigger bedroom!” What does it do?',opts:['It cheers her up, so it is empathy','It shrinks her feeling, so she feels less heard'],ans:1},task:'Climb down with 4 empathic replies',
 show:()=>auto(0,HOLE.map(x=>()=>climb(x[1].findIndex(r=>r[1]===2))),550),
 go:()=>begin(0,'Jas is at the bottom of a hole. You are at the top. Three replies to choose from.',()=>G.h.k>=HOLE.length,'Empathy names how it feels for her and stays with her.')},
{h:'Cross out shrink-and-fix',p:'Some lines in this draft shrink Jas’s feeling or rush to fix it. Tap to cross them out.',task:'Cross out all 4',
 show:()=>auto(1,idx(DRAFT,x=>x[1]).map(i=>()=>strike(i)),450),
 go:()=>begin(1,'A draft reply to Jas, seven lines.',()=>G.d.x.length>=4,'No “at least”, no “don’t be sad”, no quick fix.')},
{h:'Questions that open up',p:'Closed questions get one word. Open questions let Jas say more. Tap questions and watch how much she says.',
 predict:{q:'Which will get Jas talking more?',opts:['“Are you OK?”','“What’s been the hardest part?”'],ans:1},task:'Find the 3 open questions',
 show:()=>auto(2,idx(ASK,x=>x[1]).map(i=>()=>ask(i)),600),
 go:()=>begin(2,'Six questions you could ask Jas. A meter shows how much she opens up.',()=>G.q.got.length>=3,'What and How questions open the door.')},
{h:'Reflect it back',p:'Reflecting means saying back what someone means in your own words, and naming the feeling.',task:'Choose 3 reflections',
 show:()=>auto(3,MIRROR.map(x=>()=>mirror(x[1].findIndex(r=>r[1]))),600),
 go:()=>begin(3,'Jas says something. Three possible replies.',()=>G.m.k>=MIRROR.length,'Paraphrase plus feeling, not echo, advice or your own story.')},
{h:'Look after the listener',p:'Kai helps lots of friends. Caring for too long can wear you out: compassion fatigue. Tap the warning signs.',
 predict:{q:'Does a good friend have to be there for everyone, all the time?',opts:['Yes, or they are not a real friend','No: limits keep you able to help'],ans:1},task:'Find the 4 warning signs',
 show:()=>auto(4,idx(WEEK,x=>x[1]).map(i=>()=>sign(i)),500),
 go:()=>begin(4,'Seven diary lines from Kai’s week, and an energy bar.',()=>G.w.got.length>=4,'Numb, dreading, sleepless, snappy: time to rest and get support.')},
{h:'Challenge',p:'',go:()=>{clear();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[{q:'Your friend failed a test they worked hard for. Which reply shows empathy?',a:'“That’s gutting after all that work.”',o:[['“At least it’s only one test.”','least'],['“Oh, poor you.”','pity']]},
 {q:'Which question is open?',a:'“How did it feel when they said that?”',o:[['“Did it upset you?”','closed'],['“Was it at lunch?”','closed']]},
 {q:'Your friend says, “I’m so tired of arguing with Dad.” Which is a good reflection?',a:'“It sounds exhausting, like it never stops.”',o:[['“You’re so tired of arguing with Dad?”','echo'],['“Just stay in your room.”','fix']]},
 {q:'What is the difference between sympathy and empathy?',a:'Sympathy feels sorry for; empathy feels with',o:[['There is no difference','same'],['Empathy means agreeing with them','agree']]},
 {q:'Which is a sign of compassion fatigue?',a:'Feeling numb when friends share problems',o:[['Feeling sad for a friend, then carrying on','normal'],['Telling a trusted adult about a worry','adult']]},
 {q:'A friend tells you something that worries you about their safety. What do you do?',a:'Listen, then tell a trusted adult',o:[['Keep it secret to stay trusted','secret'],['Try to fix it all yourself','alone']]}];
function fb(t){let m='Empathy is feeling with someone: listen, reflect and stay, and look after yourself too.';
 if(t==='least')m='“At least” shrinks the feeling. Name how hard it is instead.';
 if(t==='pity')m='“Poor you” is sympathy: feeling sorry from a distance. Empathy names what it is like for them.';
 if(t==='closed')m='That can be answered yes or no. Open questions start with How or What.';
 if(t==='echo')m='Repeating their exact words is an echo. Put the meaning in your own words and name the feeling.';
 if(t==='fix')m='Advice too soon tells them to stop sharing. Understand first, then ask if they want ideas.';
 if(t==='same')m='Sympathy stays outside; empathy tries to understand the feeling from inside.';
 if(t==='agree')m='You can understand how someone feels without agreeing with what they did or think.';
 if(t==='normal')m='Feeling sad for a friend and then getting on with your day is healthy, not fatigue.';
 if(t==='adult')m='Sharing a heavy worry with a trusted adult is protecting yourself, not a warning sign.';
 if(t==='secret')m='Safety worries must go to a trusted adult, even if you promised.';
 if(t==='alone')m='You are not meant to carry it alone. A trusted adult can help in ways a friend cannot.';return m}
function nextQ(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const p=chq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 p.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+fb(t))+' <button type="button" class="linkish">Next one →</button>';p.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':fb(t))}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:B=>{chq.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Empathy lab buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down});btns()}}).start()})})();
