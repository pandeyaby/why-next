/* Flagship – stereotypes and individual differences (ages 9–11): flip twelve boys labelled "loves football"; break
   three stereotypes with a counter-example; slide two groups' maths scores into one line and see them mix; spot the
   stereotypes in a list, nice ones included; answer one calmly. Then a challenge on the usual slips. */
(()=>{const mn=Math.min,mx=Math.max;
const BOYS=[['⚽','Jay','football',1],['🩰','Tom','ballet',0],['⚽','Ravi','football',1],['♟️','Ben','chess',0],['🎨','Ola','drawing',0],['⚽','Max','football',1],
 ['🍳','Kenji','cooking',0],['⚽','Luis','football',1],['📚','Finn','reading',0],['⚽','Dev','football',1],['🏊','Sami','swimming',0],['⚽','Noah','football',1]];
const CLAIMS=['“Boys don’t cry.”','“Old people can’t use phones.”','“Girls aren’t good at maths.”'];
const PEOPLE=[['👦','Leo, 10','cried when his dog died',0],['👵','Nan Rose, 80','loves knitting',-1],['🧓','Grandad Ray, 74','runs a gaming video channel',1],
 ['⚽','Sam, 9','plays football',-1],['👧','Amira, 11','won the school maths contest',2],['🎨','Zoe, 10','loves art',-1]];
const MISS=['Leo is a boy who cries, so he breaks “Boys don’t cry.”','Grandad Ray is old and runs a video channel, so he breaks it.','Amira won the maths contest, so she breaks it.'];
const GIRLS=[4,7,8,9,10,11,11,12,12,13,14,15,16,18,19],BSC=[3,6,8,9,10,10,11,12,12,13,14,15,16,17,19];
const LIST=[['Girls are kinder than boys.',1,'It says every girl is kinder: one idea for a whole group, even if it sounds nice.'],
 ['Ayo is the fastest runner in our class.',0,'That is about one person, Ayo. It is not about a whole group.'],
 ['Old people are bad with technology.',1,'It says all old people are the same. Grandad Ray would disagree.'],
 ['Some children in my class like chess.',0,'“Some” is not “all”. It does not say everyone in a group is the same.'],
 ['People who wear glasses are clever.',1,'A compliment can still be a stereotype. It judges a whole group by one thing about them.'],
 ['Our class has 14 girls and 16 boys.',0,'That is a fact you can count. It says nothing about what people are like.'],
 ['Boys are messy.',1,'It puts one label on every boy. Lots of boys are tidy.'],
 ['My grandma can’t hear well, so I speak clearly.',0,'That is about one person you know, not about all grandmas.']];
const TALK=[['⚽','Ella','“You can’t go in goal. Girls can’t catch.”',[['Priya catches loads in netball. Let her try.','ok','A counter-example plus a fair chance: that is how to answer a stereotype.'],['You’re so mean! I’m telling!','attack','Shouting at Ella starts a fight. Calmly give a counter-example instead.'],['Say nothing and pick someone else.','quiet','Silence lets the stereotype win. A calm counter-example helps Priya.']]],
 ['🩰','Kai','“Ballet is for girls, Tom.”',[['Laugh along with Kai.','join','Laughing along spreads the stereotype and hurts Tom.'],['Lots of boys dance. Tom is great at it.','ok','You named real people the idea leaves out. That breaks the stereotype.'],['Tom should quit, then.','agree','Agreeing makes Tom give up something he loves because of a label.']]],
 ['📺','An advert','“Trucks for boys! Dolls for girls!”',[['That’s just how it is.','accept','It is not a rule. Plenty of girls love trucks and boys love dolls.'],['Boys who like dolls are weird.','label','That is a new stereotype on top of the first one. People can like any toy.'],['Toys are for anyone who likes them.','ok','Yes. Liking trucks or dolls depends on the person, not on being a boy or a girl.']]]];
VIS.reg('flagstereo',c=>{let A,ctl,chal,ask=-1,streak=0;
const S={tok:0,want:()=>{},flip:[],broke:[],bad:-1,drag:null,t:0,seen:[],found:[],talk:0};
const at=()=>['flip','counter','mix','spot','talk','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function say(g,t,x,y,n,k,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y)}
function lines(g,t,x,y,mw,n,k,w){g.font=`${w||600} ${f(n)}px system-ui,sans-serif`;const out=[];let l='';t.split(' ').forEach(z=>{const s=l?l+' '+z:z;if(g.measureText(s).width>mw&&l){out.push(l);l=z}else l=s});out.push(l);
 out.forEach((s,i)=>say(g,s,x,y+(i-(out.length-1)/2)*f(n)*1.25,n,k,w))}
function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||1.5;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const hit=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// layouts
const boy=i=>{const cols=A.narrow?3:6,rows=12/cols,w=(A.W-12)/cols,h=A.H*.78/rows;return{x:6+(i%cols)*w+3,y:A.H*.04+Math.floor(i/cols)*h+3,w:w-6,h:h-6}};
const claimBox=()=>({x:8,y:8,w:A.W-16,h:A.H*.2});
const person=i=>{const cols=A.narrow?2:3,w=(A.W-12)/cols,top=A.H*.34,h=(A.H*.64)/(6/cols);return{x:6+(i%cols)*w+3,y:top+Math.floor(i/cols)*h+3,w:w-6,h:h-6}};
const ax=()=>({x0:34,x1:A.W-22}),sx=v=>ax().x0+(ax().x1-ax().x0)*v/20;
const track=()=>({x:A.W*.12,y:A.H*.84,w:A.W*.76});
// every pupil's dot: girls row, boys row, or one merged line (stacked where scores tie) as t goes 0 → 1
function dots(){const all=GIRLS.map((v,i)=>({v,g:0,i})).concat(BSC.map((v,i)=>({v,g:1,i:i+15}))),count={},K={};
 all.slice().sort((a,b)=>a.i*7%30-b.i*7%30).forEach(d=>K[d.i]=count[d.v]=(count[d.v]||0)+1);
 return all.map(d=>{const k=K[d.i],y0=A.H*(d.g?.47:.27),y1=A.H*.66-(k-1)*f(15);return{...d,x:sx(d.v)+(d.g?3:-3)*(1-S.t),y:y0+(y1-y0)*S.t}})}
const item=i=>A.narrow?{x:8,y:A.H*.015+i*A.H*.113,w:A.W-16,h:A.H*.103}:{x:8+(i%2)*(A.W/2),y:A.H*.04+Math.floor(i/2)*A.H*.23,w:A.W/2-16,h:A.H*.2};
const scene=()=>({x:8,y:8,w:A.W-16,h:A.H*.34}),bubble=i=>({x:8,y:A.H*.42+i*A.H*.19,w:A.W-16,h:A.H*.16});
function shape(g,x,y,r,kind,col){g.fillStyle=col;g.beginPath();if(kind)g.rect(x-r,y-r,r*2,r*2);else g.arc(x,y,r,0,7);g.fill()}
function draw(A){const{ctx:g,W,H,col:C}=A,v=at();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){lines(g,'Same group. Different people. Look at the person, not the label.',W/2,H*.45,W*.8,16,C.tx,800);return}
 if(v==='flip'){const n=S.flip.length,fit=S.flip.filter(i=>BOYS[i][3]).length;
  BOYS.forEach(([e,nm,like,ok],i)=>{const r=boy(i),up=S.flip.includes(i);card(g,r,A.alpha(up?(ok?C.gr:C.or):C.vi,up?.22:.14),C.tx);
   if(!up){say(g,'👦',r.x+r.w/2,r.y+r.h*.35,20);lines(g,'loves football?',r.x+r.w/2,r.y+r.h*.72,r.w-6,10,C.tx,700);return}
   say(g,e,r.x+r.w/2,r.y+r.h*.25,18);say(g,nm,r.x+r.w/2,r.y+r.h*.5,12,C.tx,800);lines(g,ok?'✓ loves football':'✗ loves '+like,r.x+r.w/2,r.y+r.h*.77,r.w-6,10,C.tx,700)});
  say(g,`Flipped ${n} of 12 · the label fits ${fit} · it doesn’t fit ${n-fit}`,W/2,H*.91,12,C.tx,800)}
 if(v==='counter'){const k=mn(S.broke.length,2),r=claimBox(),done=S.broke.length>=3;card(g,r,A.alpha(done?C.gr:C.rd,.14),S.bad===99?C.rd:C.tx,S.bad===99?3:1.5);
  lines(g,done?'All three stereotypes broken!':CLAIMS[S.broke.length],r.x+r.w/2,r.y+r.h*.42,r.w-20,16,C.tx,800);say(g,`Broken: ${S.broke.length} of 3`,r.x+r.w/2,r.y+r.h*.82,11,C.tx,700);
  say(g,'Drag the person who proves it wrong ⬆',W/2,H*.28,11,C.tx,700);
  PEOPLE.forEach(([e,nm,d,b],i)=>{let q=person(i);const used=S.broke.includes(b);if(S.drag&&S.drag.i===i)q={...q,x:S.drag.x-q.w/2,y:S.drag.y-q.h/2};
   card(g,q,A.alpha(used?C.gr:C.cy,used?.25:.12),S.bad===i?C.rd:C.tx,S.bad===i?3:1.5);say(g,e+' '+nm,q.x+q.w/2,q.y+q.h*.3,12,C.tx,800);lines(g,d,q.x+q.w/2,q.y+q.h*.68,q.w-10,11,C.tx,600)})}
 if(v==='mix'){const a=ax();g.strokeStyle=A.alpha(C.tx,.5);g.lineWidth=2;g.beginPath();g.moveTo(a.x0,H*.74);g.lineTo(a.x1,H*.74);g.stroke();
  [0,5,10,15,20].forEach(s=>say(g,String(s),sx(s),H*.77,10,C.tx,600));say(g,'maths score out of 20',W/2,H*.8,10,C.tx,600);
  if(S.t<.5){say(g,'● Girls',6,H*.2,11,C.tx,800,'left');say(g,'■ Boys',6,H*.4,11,C.tx,800,'left')}
  say(g,'Girls ● 4 to 19, average 11.9   Boys ■ 3 to 19, average 11.7',W/2,H*.06,A.narrow?9:11,C.tx,700);
  dots().forEach(d=>{const hide=S.t>.95&&!S.seen.includes(d.i);shape(g,d.x,d.y,f(6),d.g,hide?C.mu:d.g?C.or:C.vi);if(hide)say(g,'?',d.x,d.y,9,C.pn,900)});
  const t=track();g.fillStyle=A.alpha(C.tx,.2);A.paint.rrect(t.x,t.y-4,t.w,8,4);g.fill();A.paint.ball(t.x+t.w*S.t,t.y,f(13),C.vi);
  say(g,'two groups',t.x,t.y+f(22),10,C.tx,700);say(g,'one line',t.x+t.w,t.y+f(22),10,C.tx,700)}
 if(v==='spot'){LIST.forEach(([s,st],i)=>{const r=item(i),got=S.found.includes(i),bad=S.bad===i;card(g,r,A.alpha(got?C.gr:bad?C.rd:C.cy,got||bad?.22:.1),bad?C.rd:C.tx,bad?3:1.5);
   lines(g,(got?'🏷️ ':'')+s,r.x+r.w/2,r.y+r.h/2,r.w-14,12,C.tx,700)});say(g,`Stereotypes found: ${S.found.length} of 4`,W/2,H*.985-f(6),11,C.tx,800)}
 if(v==='talk'){const k=mn(S.talk,2),[e,who,line,ops]=TALK[k],r=scene(),done=S.talk>=3;card(g,r,A.alpha(done?C.gr:C.or,.16),S.bad===99?C.rd:C.tx,S.bad===99?3:1.5);
  if(done)lines(g,'Three calm answers. Counter-examples beat labels.',r.x+r.w/2,r.y+r.h/2,r.w-20,15,C.tx,800);
  else{say(g,e+' '+who+' says:',r.x+r.w/2,r.y+r.h*.25,13,C.tx,800);lines(g,line,r.x+r.w/2,r.y+r.h*.62,r.w-20,15,C.tx,800);
   ops.forEach(([t],i)=>{let q=bubble(i);if(S.drag&&S.drag.i===i)q={...q,x:S.drag.x-q.w/2,y:S.drag.y-q.h/2};card(g,q,A.alpha(S.bad===i?C.rd:C.vi,.16),S.bad===i?C.rd:C.tx,S.bad===i?3:1.5);lines(g,'💬 '+t,q.x+q.w/2,q.y+q.h/2,q.w-14,12,C.tx,700)})}}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);ctrl();A.redraw()},yep=t=>{A.sound.pop();speak(t);ctrl();A.redraw();S.want()};
function flip(i){if(at()!=='flip'||i<0||S.flip.includes(i))return;S.flip.push(i);const[,nm,like,ok]=BOYS[i];A.sound.tick();
 speak(ok?`${nm} does love football. The label fits him.`:`${nm} loves ${like}, not football. The label is wrong for him.`);ctrl();A.redraw();if(S.flip.length>=12)yep('All 12 flipped: the label fits 6 boys and is wrong for 6. A stereotype treats them all the same.')}
function use(i){S.drag=null;if(at()!=='counter'||i<0||S.broke.length>=3)return A.redraw();const want=S.broke.length,[,nm,d,b]=PEOPLE[i];
 if(b!==want){S.bad=i;return nope(b<0?`${nm} ${d}. That says nothing against ${CLAIMS[want]}, so it can’t break it. ${MISS[want]}`:`${nm} breaks a different one. ${MISS[want]}`)}
 S.bad=-1;S.broke.push(b);yep(`${MISS[b]} One real person is enough to show an “all” idea is wrong.`)}
function slide(t){S.t=mx(0,mn(1,t));A.redraw();if(S.t>.95)speak('One line. The circles and squares are mixed all the way through. Tap three dots: can you guess who is a girl or a boy?')}
function peek(i){if(S.t<=.95||S.seen.includes(i))return;S.seen.push(i);const d=dots().find(z=>z.i===i);A.sound.tick();speak(`Score ${d.v}: a ${d.g?'boy':'girl'}. The score does not tell you which.`);ctrl();A.redraw();if(S.seen.length>=3)S.want()}
function spot(i){if(at()!=='spot'||S.found.includes(i))return;const[s,st,why]=LIST[i];
 if(!st){S.bad=i;return nope(`Not a stereotype. ${why}`)}S.bad=-1;S.found.push(i);if(S.found.length>=4)yep(`${why} You found all four.`);else{A.sound.pop();speak(why);ctrl();A.redraw()}}
function answer(i){S.drag=null;if(at()!=='talk'||S.talk>=3||i<0)return A.redraw();const[t,tag,why]=TALK[S.talk][3][i];
 if(tag!=='ok'){S.bad=i;return nope(why)}S.bad=-1;S.talk++;yep(why)}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=at(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='flip'&&S.flip.length<12){B('🔄 Flip the next card',()=>flip(BOYS.findIndex((_,i)=>!S.flip.includes(i))));}
 if(v==='counter'&&S.broke.length<3){c.el('p',{class:'fl-tk'},ctl,'Who proves '+CLAIMS[S.broke.length]+' wrong?');PEOPLE.forEach(([e,nm],i)=>{if(!S.broke.includes(PEOPLE[i][3]))B(e+' '+nm,()=>use(i),'Use '+nm)})}
 if(v==='mix'){B(S.t>.95?'↔ Split into two groups':'↔ Mix into one line',()=>{const to=S.t>.95?0:1;A.tween(S,{t:to},700,'io',()=>slide(to))});
  if(S.t>.95){const ds=dots().filter(d=>!S.seen.includes(d.i)).sort((a,b)=>b.v-a.v);if(ds.length)B('👆 Reveal the top dot left ('+ds[0].v+')',()=>peek(ds[0].i))}}
 if(v==='spot')LIST.forEach(([s],i)=>{if(!S.found.includes(i))B(s,()=>spot(i),'Stereotype? '+s)});
 if(v==='talk'&&S.talk<3)TALK[S.talk][3].forEach(([t],i)=>B('💬 '+t,()=>answer(i),'Answer: '+t));A.redraw()}
function down(p){const v=at();
 if(v==='flip'){const i=BOYS.findIndex((_,i)=>hit(p,boy(i)));if(i>=0)flip(i);return false}
 if(v==='counter'){const i=PEOPLE.findIndex((x,i)=>!S.broke.includes(x[3])&&hit(p,person(i)));if(i>=0){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(v==='mix'){const t=track();if(Math.abs(p.y-t.y)<f(30)){S.drag={mix:1};slide((p.x-t.x)/t.w);return true}
  if(S.t>.95){const d=dots().find(d=>Math.hypot(d.x-p.x,d.y-p.y)<f(12));if(d)peek(d.i)}return false}
 if(v==='spot'){const i=LIST.findIndex((_,i)=>hit(p,item(i)));if(i>=0)spot(i);return false}
 if(v==='talk'&&S.talk<3){const i=[0,1,2].find(i=>hit(p,bubble(i)));if(i!=null){S.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}return false}
function move(p){if(!S.drag)return;if(S.drag.mix){const t=track();return slide((p.x-t.x)/t.w)}S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=at();if(!d)return;if(d.mix){S.drag=null;ctrl();return}
 const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(v==='counter')return use(tap||hit(p,claimBox())?d.i:-1);
 if(v==='talk')return answer(tap||hit(p,scene())?d.i:-1)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const k=++S.tok;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{S.tok++;Object.assign(S,{want:()=>{},flip:[],broke:[],bad:-1,drag:null,t:0,seen:[],found:[],talk:0})};
const top3=()=>dots().sort((a,b)=>b.v-a.v).slice(0,3).map(d=>d.i);
const steps=[
{h:'Twelve boys, one label',p:'A stereotype is a fixed idea that everyone in a group is the same. Here every boy has the label “loves football”. Tap each card to meet the real person.',
 predict:{q:'How many of these 12 boys will really love football?',opts:['All 12','Some, not all'],ans:1},task:'Flip all 12 cards',
 show:()=>{steps[0].go();play(BOYS.map((_,i)=>()=>flip(i)),220)},go:()=>{reset();speak('Tap a card to flip it.');ctrl();S.want=fin(0,()=>S.flip.length>=12,'The label fitted half of them. A stereotype ignores the rest.')}},
{h:'Break it with a counter-example',p:'A counter-example is one real person who proves an “all” idea wrong. Drag the right person onto each stereotype.',task:'Break all three stereotypes',
 show:()=>{steps[1].go();play([0,2,4].map(i=>()=>use(i)),700)},go:()=>{reset();speak('Drag a person onto the stereotype they prove wrong.');ctrl();S.want=fin(1,()=>S.broke.length>=3,'One counter-example is enough to break an “all” idea.')}},
{h:'Inside a group, between groups',p:'These are maths scores from one class: girls are circles, boys are squares. Slide them into one line, then tap three dots to see who they are.',
 predict:{q:'If everyone lines up by score, what happens?',opts:['Girls and boys split apart','They mix all the way through'],ans:1},task:'Mix the line and reveal three dots',
 show:()=>{steps[2].go();A.tween(S,{t:1},600,'io',()=>{slide(1);play(top3().map(i=>()=>peek(i)),450)})},go:()=>{reset();speak('Drag the purple ball along the slider to mix the groups.');ctrl();S.want=fin(2,()=>S.t>.95&&S.seen.length>=3,'Scores run from 3 or 4 up to 19 in each group, but the averages differ by 0.2.')}},
{h:'Spot the stereotypes',p:'Four of these are stereotypes. Watch out: some sound nice. Tap the ones that put one label on a whole group.',
 predict:{q:'“People who wear glasses are clever.” Is that a stereotype?',opts:['No, it is a compliment','Yes, it labels a whole group'],ans:1},task:'Find all four stereotypes',
 show:()=>{steps[3].go();play([0,2,4,6].map(i=>()=>spot(i)),600)},go:()=>{reset();speak('Tap a sentence that is a stereotype.');ctrl();S.want=fin(3,()=>S.found.length>=4,'Nice or nasty, a stereotype still ignores the person.')}},
{h:'Speak up, calmly',p:'A calm counter-example works better than a fight. Drag the best reply onto what was said, or tap it.',task:'Answer all three',
 show:()=>{steps[4].go();play([0,1,2].map(i=>()=>answer(i)),700)},go:()=>{reset();speak('Drag a reply onto the speech box.');ctrl();S.want=fin(4,()=>S.talk>=3,'Name the person the label leaves out, and stay kind.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['What is a stereotype?',[['A fixed idea that everyone in a group is the same','ok'],['A true fact about one person','one'],['A rule a school makes','rule']]],
 ['Someone says “Girls aren’t good at maths.” Which is the best counter-example?',[['Amira won the maths contest','ok'],['Some boys like maths','offpoint'],['Maths is hard for everyone','vague']]],
 ['“All Asian kids are good at maths.” It sounds nice. Is it a stereotype?',[['Yes: it says a whole group is the same','ok'],['No: it is a compliment','nice'],['No: it is true for some','some']]],
 ['In the class lab, how did girls’ and boys’ maths scores compare?',[['They overlapped; the spread inside each group was far bigger','ok'],['Every boy scored higher','between'],['You could tell a score from the group','predict']]],
 ['Kai says “Ballet is for girls.” What could Tom say?',[['I love ballet, and loads of boys dance.','ok'],['Kai, you’re stupid.','attack'],['Fine, I’ll quit.','giveup']]]];
function why(tag){let m='Ask: does it say everyone in a group is the same?';
 if(tag==='one')m='A fact about one person is not a stereotype. A stereotype is about a whole group.';
 if(tag==='rule')m='A rule tells you what to do. A stereotype is an idea that everyone in a group is the same.';
 if(tag==='offpoint')m='Boys liking maths says nothing about girls. You need a girl who is good at maths.';
 if(tag==='vague')m='That does not name anyone. A counter-example is one real person who proves the idea wrong.';
 if(tag==='nice')m='Compliments can be stereotypes too. Pupils who struggle with maths feel they have failed the label.';
 if(tag==='some')m='True for some is not true for all. Saying “all” is what makes it a stereotype.';
 if(tag==='between')m='No: the dots mixed all the way through, and the averages were 11.9 and 11.7.';
 if(tag==='predict')m='No: a score of 12 could be a girl or a boy. The group did not tell you the person.';
 if(tag==='attack')m='Name-calling starts a fight and changes no minds. A calm counter-example works better.';
 if(tag==='giveup')m='Giving up lets the label decide for Tom. He can keep dancing and say so.';
 return m}
function quiz(){ask++;const[q,ops]=QS[ask%QS.length],turn=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: you looked at the person, not the label.':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
