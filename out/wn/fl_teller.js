/* Flagship – characters' viewpoints and responses (ages 6–8; CCSS RL.1.6, RL.2.6, RL.2.3, RL.2.9; NC England Y1–2 reading).
   Find who is telling a story from I or he/she (and not be fooled by I inside speech marks), match each reaction to the
   character whose wants explain it, tap the sentence that shows how a character responded, and compare two characters. */
(()=>{
const TELL=[['I huffed and I puffed, but the brick house did not fall down.',['the wolf','the third pig','the farmer'],0],
 ['The bears came home. I hid under the blanket and shook.',['Goldilocks','Baby Bear'],0],
 ['Somebody broke my little chair! And my porridge is all gone!',['Mummy Bear','Baby Bear','Goldilocks'],1],
 ['"You can\'t catch me!" I called, and I ran and ran.',['the fox','the Gingerbread Man'],1],
 ['Jack climbed the beanstalk. He saw a castle in the clouds.',['Jack','the giant','someone outside the story'],2]];
const VOICE=[['I found a shiny shell on the beach.',0],['Max kicked the ball over the fence.',1],['My gran and I baked bread.',0],
 ['"I am lost," said the little duck.',1],['We hid in the den until dark.',0],['She whispered, "I can see the fox."',1],
 ['The giant stomped, and they all ran.',1],['Nobody saw me take the last cookie.',0]],VBIN=['a character: I, me, we','outside teller: he, she, they'];
const VIEWS=[['It starts to rain at the picnic.',['Duck loves water','Cat hates wet fur'],[['Hooray! Puddles!',0],['Oh no, my fur is soaked!',1],['I will hide under the table.',1],['Now I can swim in the pond.',0]]],
 ['The big race is called off.',['Mia trained all year','Leo was scared to run'],[['Phew! My tummy can stop wobbling.',1],['All that training, and no race!',0],['Can we race next week instead?',0]]]];
const SEEN=VIEWS.flatMap((v,e)=>v[2].map(l=>[e,...l]));
const RESP=[['Pip',['The bridge broke.','Pip looked at the wide river.','She tied logs together and made a raft.','The sun went down.'],2,0],
 ['Sam',['It was a windy day.','Sam\'s kite got stuck in a tree.','He asked his big sister to help.','The tree was very tall.'],2,1],
 ['Mo',['Mo lost his hat at the park.','The park was big and green.','He went back and looked under every bench.','Birds sang.'],2,0],
 ['Ella',['Ella\'s tower fell down.','She built it again, wider at the bottom.','Her dog barked.','The blocks were red.'],1,0]];
const CMP=[['met a hungry animal that wanted to eat them',0],['built a strong brick house',1],['ran away from everyone',2],
 ['trusted the sly fox',2],['was safe at the end',1],['is the main character',0]],CBIN=['both','the pig','Gingerbread Man'];
VIS.reg('flagteller',c=>{let A,tray,cq,qi=-1,ver=0;const T={};
const DARK='#0f172a',GOOD='#047857',OOPS='#b91c1c',EDGE='#64748b',HOLD='#1d4ed8',SKY='#e0f2fe',SKYI='#075985',ROSE='#ffe4e6',SUN='#fef9c3',SUNI='#854d0e';
const BC=[[SUN,SUNI],[SKY,SKYI],['#dcfce7','#166534']];
const u=v=>Math.round(v*(A.narrow?.94:1.08)),ff=(v,w)=>`${w||700} ${u(v)}px system-ui,sans-serif`,mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const part=()=>['tell','voice','view','resp','cmp','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#f1f5f9';g.fillRect(0,0,A.W,A.H)}
function rows(t,w,n){const g=A.ctx;g.font=ff(n);const out=[''];t.split(' ').forEach(x=>{const y=out[out.length-1]?out[out.length-1]+' '+x:x;if(g.measureText(y).width>w&&out[out.length-1])out.push(x);else out[out.length-1]=y});return out}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.line?3.5:1.6;g.strokeStyle=o.line||EDGE;g.stroke();
 if(t==null)return;const n=o.n||16,L=rows(t,r.w-16,n),lh=u(n)*1.25;g.fillStyle=o.ink||DARK;g.font=ff(n,o.w);mid(g);L.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh))}
function banner(t,y,won){const g=A.ctx;let n=15;g.font=ff(n,800);while(g.measureText(t).width+26>A.W-8&&n>10){n--;g.font=ff(n,800)}const w=g.measureText(t).width+24,h=u(n)+15;
 box({x:A.W/2-w/2,y:y-h/2,w,h},null,{bg:won?'#d1fae5':'#fff',line:won?GOOD:null});g.fillStyle=DARK;g.font=ff(n,800);mid(g);g.fillText(t,A.W/2,y+1)}
function line(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(n||14,600);mid(g);g.fillText(t,A.W/2,y,A.W-12)}
const story=()=>({x:12,y:A.H*.14,w:A.W-24,h:A.H*.26});
function stack(list,y,h){const gap=8,hh=Math.min(h,(A.H-y-8-gap*(list.length-1))/list.length);return list.map((t,i)=>({x:20,y:y+i*(hh+gap),w:A.W-40,h:hh,t,i}))}
function bins(names,y){const n=names.length,gap=6,w=(A.W-16-gap*(n-1))/n;return names.map((t,j)=>({x:8+j*(w+gap),y,w,h:A.H-y-8,t,j}))}
function drawBins(names,y,cnt,bad,last){const g=A.ctx;bins(names,y).forEach(b=>{box(b,null,{bg:BC[b.j][0],line:bad===b.j?OOPS:null});g.fillStyle=BC[b.j][1];g.font=ff(13,800);g.textAlign='center';g.textBaseline='top';
 rows(b.t,b.w-8,13).forEach((l,i)=>g.fillText(l,b.x+b.w/2,b.y+6+i*u(16)));g.fillStyle=DARK;g.font=ff(13,600);(last[b.j]||[]).slice(-4).forEach((l,i)=>g.fillText(l,b.x+b.w/2,b.y+u(46)+i*u(19),b.w-6));
 g.font=ff(22,800);g.textBaseline='bottom';g.fillText(String(cnt[b.j]||0),b.x+b.w/2,b.y+b.h-6)})}
const moving=r=>T.hold?{...r,x:T.hold.x-r.w/2,y:T.hold.y-r.h/2}:r;
const chipAt=()=>({x:16,y:A.H*.15,w:A.W-32,h:A.H*.2});
const short=t=>{const w=t.replace(/["!.,?]/g,'').split(' ');return w.slice(0,2).join(' ')+(w.length>2?'…':'')};
/* who is telling? */
function drawTell(){const s=T.tell;back();if(s.n>=TELL.length){banner('All 5 tellers found',A.H*.07,1);line('I, me, my: a character tells it.',A.H*.4,16);line('He, she, they: a teller outside the story.',A.H*.5,16);return}
 const [t,opts]=TELL[s.n];banner(`Story ${s.n+1} of 5: who is telling it?`,A.H*.07);box(story(),t,{n:18,bg:'#fffbeb'});
 stack(opts,A.H*.45,u(50)).forEach(r=>box(r,r.t,{bg:s.bad===r.i?ROSE:'#fff',line:s.bad===r.i?OOPS:null}));if(s.note)line(s.note,A.H*.43-u(6),13)}
function tell(i){const s=T.tell;if(s.n>=TELL.length)return;const [t,opts,k]=TELL[s.n];
 if(i!==k){s.bad=i;A.sound.miss();return speak(k===2?`The words say he, not I. ${opts[i]} is in the story, but the teller is outside it.`:opts[i]==='someone outside the story'?`Look for I or my. A character is telling this one.`:`${opts[i]} is in the story, but would ${opts[i]} say these words? Think about who says I here.`)}
 s.n++;s.bad=null;A.sound.pop();s.note=`Yes: ${opts[k]}`;speak(`Yes, ${opts[k]} tells it.`+(k===2?' It says he, so the teller is outside the story.':' The teller says I.')+(s.n>=TELL.length?' All 5 found.':''))}
/* I or he? */
function drawVoice(){const s=T.voice;back();banner(s.n>=VOICE.length?'All 8 sorted':`Line ${s.n+1} of 8: who is telling it?`,A.H*.07,s.n>=VOICE.length);
 const last=[[],[]];VOICE.slice(0,s.n).forEach(v=>last[v[1]].push(short(v[0])));drawBins(VBIN,A.H*.42,[last[0].length,last[1].length],s.bad,last);
 if(s.n<VOICE.length)box(moving(chipAt()),VOICE[s.n][0],{n:17,bg:'#fffbeb',line:T.hold?HOLD:null})}
function voice(j){const s=T.voice;if(s.n>=VOICE.length)return;const [t,k]=VOICE[s.n],quote=/"/.test(t);
 if(j!==k){s.bad=j;A.sound.miss();return speak(quote&&k?'The I is inside the speech marks, so a character is talking. The teller says "said" or "whispered": an outside teller.':k?'There is no I outside speech marks. The teller is not in the story.':'The teller says I, me, my or we, so the teller is a character in the story.')}
 s.n++;s.bad=null;A.sound.pop();speak(`${k?'Outside teller':'A character tells it'}.`+(quote?' The I is only in what someone says.':'')+(s.n>=VOICE.length?' All 8 sorted.':''))}
/* same event, two views */
function drawView(){const s=T.view;back();if(s.n>=SEEN.length){banner('All 7 matched',A.H*.07,1);line('Same event, different feelings.',A.H*.4,16);line('What a character wants shapes how they feel.',A.H*.5,15);return}
 const [e,t]=SEEN[s.n],[ev,who]=VIEWS[e];banner(`Event: ${ev}`,A.H*.07);box(moving(chipAt()),`"${t}"`,{n:18,bg:'#fff',line:T.hold?HOLD:null});
 line('Who would say it? Drag it to them.',A.H*.4,13);bins(who,A.H*.45).forEach(b=>{box(b,b.t,{n:16,w:800,bg:BC[b.j][0],ink:BC[b.j][1],line:s.bad===b.j?OOPS:null})});if(s.note)line(s.note,A.H*.93,13)}
function view(j){const s=T.view;if(s.n>=SEEN.length)return;const [e,t,k]=SEEN[s.n],who=VIEWS[e][1];
 if(j!==k){s.bad=j;A.sound.miss();return speak(`Think about what they want. ${who[k]}, so "${t}" fits them. ${who[j]}, so they would feel differently.`)}
 s.n++;s.bad=null;A.sound.pop();s.note=`${who[k]}: "${t}"`;speak(`Yes. ${who[k]}, so they would say "${t}"`+(s.n>=SEEN.length?' All 7 matched.':''))}
/* how did they respond? */
function drawResp(){const s=T.resp;back();if(s.n>=RESP.length){banner('All 4 responses found',A.H*.07,1);line('A response is what a character does',A.H*.42,16);line('about the problem.',A.H*.5,16);return}
 const [who,lines]=RESP[s.n];banner(`Story ${s.n+1} of 4: how did ${who} respond?`,A.H*.07);
 stack(lines,A.H*.15,u(58)).forEach(r=>box(r,r.t,{n:16,bg:s.bad===r.i?ROSE:'#fffbeb',line:s.bad===r.i?OOPS:null}))}
function resp(i){const s=T.resp;if(s.n>=RESP.length)return;const [who,lines,k,prob]=RESP[s.n];
 if(i!==k){s.bad=i;A.sound.miss();return speak(i===prob?`That is the problem. Find what ${who} did about it.`:`That tells us about the place or the day. Find what ${who} did.`)}
 s.n++;s.bad=null;A.sound.pop();speak(`Yes: "${lines[k]}" shows how ${who} responded to "${lines[prob]}"`+(s.n>=RESP.length?' All 4 found.':''))}
/* compare two characters */
function drawCmp(){const s=T.cmp;back();banner(s.n>=CMP.length?'All 6 compared':`Fact ${s.n+1} of 6: who did this?`,A.H*.07,s.n>=CMP.length);
 const last=[[],[],[]];CMP.slice(0,s.n).forEach(v=>last[v[1]].push(short(v[0])));drawBins(CBIN,A.H*.42,last.map(l=>l.length),s.bad,last);
 if(s.n<CMP.length)box(moving(chipAt()),CMP[s.n][0],{n:17,bg:'#fff',line:T.hold?HOLD:null})}
function cmp(j){const s=T.cmp;if(s.n>=CMP.length)return;const [t,k]=CMP[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return speak(k===0?`Both stories have this. The wolf and the fox both wanted a meal, and each is the hero of their own story.`:k===1?`Only the third pig did this. The Gingerbread Man never built a house.`:`Only the Gingerbread Man did this. The pig stayed inside the brick house.`)}
 s.n++;s.bad=null;A.sound.pop();speak(`${['Both','Only the pig','Only the Gingerbread Man'][k]}: ${t}.`+(s.n>=CMP.length?' All 6 compared.':''))}
function draw(){const k=part();if(k==='quiz'){back();banner('Challenge',A.H*.25,1);banner('who tells it · how they feel · what they do',A.H*.55);return}
 ({tell:drawTell,voice:drawVoice,view:drawView,resp:drawResp,cmp:drawCmp})[k]();A.fx.draw(A.ctx)}
function press(p){const k=part(),grab=()=>{T.hold={x:p.x,y:p.y};return true};
 if(k==='tell'&&T.tell.n<TELL.length){const r=stack(TELL[T.tell.n][1],A.H*.45,u(50)).find(r=>on(p,r));if(r)tell(r.i);return false}
 if(k==='resp'&&T.resp.n<RESP.length){const r=stack(RESP[T.resp.n][1],A.H*.15,u(58)).find(r=>on(p,r));if(r)resp(r.i);return false}
 const tgt={voice:[VBIN,voice,T.voice.n<VOICE.length,.42],view:[SEEN[T.view.n]?VIEWS[SEEN[T.view.n][0]][1]:[],view,T.view.n<SEEN.length,.45],cmp:[CBIN,cmp,T.cmp.n<CMP.length,.42]}[k];
 if(!tgt||!tgt[2])return false;if(on(p,chipAt()))return grab();const b=bins(tgt[0],A.H*tgt[3]).find(r=>on(p,r));if(b)tgt[1](b.j);return false}
function slide(p){if(T.hold){T.hold.x=p.x;T.hold.y=p.y;A.redraw()}}
function letgo(p){if(!T.hold)return;T.hold=null;const k=part(),tgt={voice:[VBIN,voice,.42],view:[SEEN[T.view.n]?VIEWS[SEEN[T.view.n][0]][1]:[],view,.45],cmp:[CBIN,cmp,.42]}[k];
 const b=tgt&&bins(tgt[0],A.H*tgt[2]).find(r=>on(p,r));if(b)tgt[1](b.j);else A.redraw()}
function fresh(){ver++;for(const k in T)delete T[k];Object.assign(T,{tell:{n:0},voice:{n:0},view:{n:0},resp:{n:0},cmp:{n:0},hold:null,test:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();T.test()}
function begin(i,desc,ok,msg){fresh();speak(desc);T.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function pad(){if(!tray)return;tray.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(k==='tell'&&T.tell.n<TELL.length)TELL[T.tell.n][1].forEach((t,i)=>b(t,()=>tell(i),`${t} is telling the story`));
 if(k==='voice'&&T.voice.n<VOICE.length)VBIN.forEach((t,j)=>b(t,()=>voice(j),`${VOICE[T.voice.n][0]} Told by ${t}`));
 if(k==='view'&&T.view.n<SEEN.length){const e=SEEN[T.view.n];VIEWS[e[0]][1].forEach((t,j)=>b(t.split(' ')[0],()=>view(j),`${t.split(' ')[0]} would say: ${e[1]}`))}
 if(k==='resp'&&T.resp.n<RESP.length)RESP[T.resp.n][1].forEach((t,i)=>b(`${i+1}`,()=>resp(i),`Sentence ${i+1}: ${t}`));
 if(k==='cmp'&&T.cmp.n<CMP.length)CBIN.forEach((t,j)=>b(t,()=>cmp(j),`${CMP[T.cmp.n][0]}: ${t}`))}
const steps=[
{h:'Who is telling?',p:'Every story has a teller. If the teller says I, me or my, a character is telling it. Read the story and tap the teller.',
predict:{q:'A story says: Jack climbed the beanstalk. Who is telling it?',opts:['Jack','someone outside the story'],ans:1},task:'Find all 5 tellers',
show:()=>auto(0,TELL.map(x=>()=>tell(x[2])),600),
go:()=>begin(0,'I huffed and I puffed, but the brick house did not fall down. Who is telling it?',()=>T.tell.n>=TELL.length,'I means a character is telling it.')},
{h:'I or he?',p:'Look at the words outside the speech marks. I, me, we: a character tells it. He, she, they: the teller is outside the story. Drag each line to a box.',
predict:{q:'"I am lost," said the little duck. Who is telling the story?',opts:['the duck: it says I','an outside teller'],ans:1},task:'Sort all 8 lines',
show:()=>auto(1,VOICE.map(v=>()=>voice(v[1])),420),
go:()=>begin(1,'I found a shiny shell on the beach. Drag it to a box.',()=>T.voice.n>=VOICE.length,'Only the I outside speech marks tells you the teller.')},
{h:'Same event, two views',p:'Two characters can feel very different about the same thing. What does each one want? Drag each line to the character who would say it.',task:'Match all 7 lines',
show:()=>auto(2,SEEN.map(x=>()=>view(x[2])),480),
go:()=>begin(2,'It starts to rain at the picnic. Who would say: Hooray! Puddles!',()=>T.view.n>=SEEN.length,'Their wants explain their feelings.')},
{h:'How did they respond?',p:'A character responds to a problem by what they do. Tap the sentence that shows what the character did about it.',task:'Find all 4',
show:()=>auto(3,RESP.map(x=>()=>resp(x[2])),650),
go:()=>begin(3,'How did Pip respond when the bridge broke? Tap the sentence.',()=>T.resp.n>=RESP.length,'The response is the action, not the problem.')},
{h:'Compare two characters',p:'The third little pig and the Gingerbread Man both meet a hungry animal. Drag each fact: did both do it, or only one?',task:'Compare all 6',
show:()=>auto(4,CMP.map(x=>()=>cmp(x[1])),480),
go:()=>begin(4,'Met a hungry animal that wanted to eat them. Both, the pig, or the Gingerbread Man?',()=>T.cmp.n>=CMP.length,'Same problem, different choices.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.test()});
const QS=[
{q:'A story says: I climbed the hill and saw the sea. Who is telling it?',a:'a character in the story',o:[['someone outside the story','outside'],['the sea','thing']]},
{q:'A story says: Red Riding Hood walked into the woods. Who is telling it?',a:'someone outside the story',o:[['Red Riding Hood','named'],['the woods','thing']]},
{q:'"I am cold," said the bear. Who is telling this story?',a:'someone outside the story',o:[['the bear: it says I','speech'],['you cannot tell','none']]},
{q:'Rain starts. Duck says "Hooray!" Cat says "Oh no!" Why?',a:'They want different things.',o:[['One of them is wrong.','wrong'],['Rain makes everyone happy.','one']]},
{q:'Ana fell off her bike. Which sentence shows how she responded?',a:'She got back on and tried again.',o:[['She fell off her bike.','problem'],['Her bike was blue.','detail']]},
{q:'The pig and the Gingerbread Man both met a hungry animal. What was different?',a:'The pig built a strong house; the Gingerbread Man trusted the fox.',o:[['Nothing was different.','same'],['They both got eaten.','facts']]}];
function hint(t){let m='Look back at the story words.';
 switch(t){case 'outside':m='The teller says I, so the teller is a character in the story.';break;
 case 'thing':m='A place or a thing cannot tell this story. Look for who says I.';break;
 case 'named':m='The story says Red Riding Hood, not I. Someone outside the story is telling it.';break;
 case 'speech':m='The I is inside speech marks: the bear is talking. "said the bear" is the outside teller.';break;
 case 'none':m='You can tell: "said the bear" comes from a teller outside the story.';break;
 case 'wrong':m='Neither is wrong. They feel different because they want different things.';break;
 case 'one':m='Cat does not feel happy. One event can make two characters feel different.';break;
 case 'problem':m='That is the problem. The response is what Ana did next.';break;
 case 'detail':m='That is a detail. Find what Ana did about falling off.';break;
 case 'same':m='They chose differently: one built, one trusted the fox.';break;
 case 'facts':m='Check the stories: the wolf did not eat the third pig.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+hint(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{cq.hidden=B.step!==5;tray.hidden=B.step===5;pad()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:letgo});pad()}}).start()})})();
