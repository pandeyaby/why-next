/* Flagship: online identity and misinformation (ages 12-13; PSHE Association KS3 media literacy and digital resilience,
   RSE statutory guidance "online and media"). Like posts and watch a recommendation feed narrow into a filter bubble,
   tune how shocking a post is and see how far it spreads, check an unknown site by reading laterally, tap the
   manipulation tricks in a viral post, and decide what to post, ask about first, or not post. Not flagnetsafe (7-9). */
(()=>{
VIS.reg('flagfeed',c=>{let A,bar,qa,qk=-1,run=0;const F={};
const INK='#0f172a',OK='#047857',BAD='#b91c1c',SLATE='#64748b';
const CATS=[['Games','#a78bfa'],['Football','#86efac'],['Music','#f9a8d4'],['Animals','#fcd34d'],['Science','#7dd3fc'],['Cooking','#fdba74'],['Art','#c4b5fd'],['News','#cbd5e1']];
const CHECKS=[['Read its About page',0,'The About page says "trusted experts". A site can say anything about itself.'],
 ['Scroll down for more',0,'More of the same post. Staying on the page only shows what it wants you to see.'],
 ['New tab: who runs this site?',1,'Other sites say it is run by a company that sells pills. It has a reason to scare you.'],
 ['New tab: search the claim',1,'Cancer Research UK says there is no evidence that cold water causes cancer.'],
 ['Count the likes',0,'40,000 likes shows it is popular, not that it is true.']];
const BITS=[['SHARE before they delete this!!!',1,'rush'],['A new study',0,''],['shows cold water',0,''],['doctors are HIDING from you.',1,'anger'],
 ['100% PROVEN.',1,'sure'],['My cousin tried it.',1,'story'],['Posted 2 hours ago.',0,'']];
const TRICK={rush:'Rush: it wants you to share before you think.',anger:'Anger and fear: strong feelings stop us checking.',sure:'Too sure: real science rarely says 100%.',story:'One story: what happened to one person is not evidence.'};
const POSTS=[['Your own drawing of a dragon',0,'It is yours, so you can choose to share it.'],['A group photo from Mia\'s party',1,'Others are in it. Ask them first; some may not want it online.'],
 ['A friend\'s home address in a comment',2,'Never share where someone lives. That is private and can put them at risk.'],['A funny photo of your brother asleep',1,'He did not know it was taken. Ask him before anyone else sees it.'],
 ['A mean comment you would not say to a face',2,'Be the same person online as offline. If you would not say it face to face, do not post it.'],
 ['A screenshot of a private chat, to laugh at someone',2,'It was sent to you in trust. Sharing it to mock them breaks that trust.']];
const stage=()=>['feed','spread','lateral','flags','consent','chal'][A.step];
const cap=(v,a,b)=>v<a?a:v>b?b:v;
function lab(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?13:15);g.font=`${o.b||800} ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+16;
 while(w>(o.max||A.W-8)&&f>10){f--;g.font=`${o.b||800} ${f}px system-ui,sans-serif`;w=g.measureText(t).width+16}const h=o.h||f+12,l=o.left?x:cap(x-w/2,4,A.W-w-4);
 g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?BAD:SLATE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function bg(){const g=A.ctx;g.fillStyle=A.col.pn;g.fillRect(0,0,A.W,A.H)}
/* step 0: a feed that learns from likes. Six slots shared out by weight (largest remainder). */
function slots(){const W=F.feed.w,sum=W.reduce((a,b)=>a+b,0),raw=W.map(v=>v/sum*6),n=raw.map(Math.floor);let left=6-n.reduce((a,b)=>a+b,0);
 raw.map((v,i)=>[v-n[i],i]).sort((a,b)=>b[0]-a[0]||a[1]-b[1]).forEach(([,i])=>{if(left>0){n[i]++;left--}});const out=[];n.forEach((k,i)=>{for(let j=0;j<k;j++)out.push(i)});return out}
function feedBox(i){const cols=A.narrow?2:3,w=(A.W-16-(cols-1)*8)/cols,h=A.H*(A.narrow?.17:.25);return{x:8+(i%cols)*(w+8),y:A.H*.14+Math.floor(i/cols)*(h+8),w,h}}
function drawFeed(){bg();const S=slots(),kinds=new Set(S).size;S.forEach((k,i)=>{const b=feedBox(i),g=A.ctx;g.fillStyle=CATS[k][1];A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=INK;g.lineWidth=1;g.stroke();
  g.fillStyle=INK;g.font=`800 ${A.narrow?14:16}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(CATS[k][0],b.x+b.w/2,b.y+b.h*.4);g.font='600 12px system-ui,sans-serif';g.fillText('tap to like ♥',b.x+b.w/2,b.y+b.h*.72)});
 lab(`Kinds of post in your feed: ${kinds} of 8`,A.W/2,A.H*.06,{ok:F.feed.likes>=4,no:kinds<=2});lab(`Likes: ${F.feed.likes}`,A.W/2,A.H*.94,{f:12})}
function like(k){const D=F.feed;D.w[k]*=2;D.likes++;A.sound.pop();const kinds=new Set(slots()).size;
 say(`You liked ${CATS[k][0]}. The app shows more of what you like, so your feed now has ${kinds} kind${kinds>1?'s':''} of post.`+(kinds<=3?' This narrowing is called a filter bubble.':''))}
function widen(){const D=F.feed,k=D.w.indexOf(Math.min(...D.w));D.w[k]*=4;A.sound.tick();say(`You searched for ${CATS[k][0]} on purpose. Choosing new things widens the feed again.`)}
/* step 1: how far a post spreads; each person who sees it shares with s more, for 4 rounds */
function reach(s){let t=1,p=1;for(let r=0;r<4;r++){p*=s;t+=p}return t}
function drawSpread(){bg();const S=F.sp,g=A.ctx,n=Math.min(reach(S.s),160),cx=A.W/2,cy=A.H*.5;let i=0;
 for(let r=0;r<=4&&i<n;r++){const ring=r?Math.min(Math.pow(S.s,r),n-i):1,R=r*Math.min(A.W,A.H)*.09;for(let j=0;j<ring&&i<n;j++,i++){const a=j/ring*6.283+r;
  g.fillStyle=r===0?'#f59e0b':S.s>=3?'#f87171':'#60a5fa';g.beginPath();g.arc(cx+Math.cos(a)*R*1.35,cy+Math.sin(a)*R,r?3.5:8,0,7);g.fill()}}
 lab(['','Calm and true','A bit surprising','Shocking','Very shocking','OUTRAGE!'][S.s],A.W/2,A.H*.07,{});lab(`Each person shares to ${S.s}. After 4 rounds: ${reach(S.s)} people`,A.W/2,A.H*.93,{ok:reach(S.s)>=100,f:12})}
function setShock(s){const S=F.sp;S.s=cap(s,1,5);A.sound.tick();const r=reach(S.s);
 say(`Shock level ${S.s}: each person shares to ${S.s}, so it reaches ${r} people in 4 rounds.`+(r>=100?' Shocking posts get shared more, true or not.':''))}
/* step 2: reading laterally */
function tabs(){const h=A.H*.125,y0=A.H*.28;return CHECKS.map((c,i)=>({i,x:8,y:y0+i*(h+4),w:A.W-16,h}))}
function drawLat(){bg();const L=F.lat,g=A.ctx;lab('HealthTruthNow: "Cold water causes cancer!"',A.W/2,A.H*.08,{no:1,f:13});
 lab(`Useful checks found: ${L.found.size} of 2`,A.W/2,A.H*.185,{ok:L.found.size>=2});
 tabs().forEach(t=>{const tried=L.tried.has(t.i),off=CHECKS[t.i][1];g.fillStyle=tried?(off?'#bbf7d0':'#fecaca'):'#ffffff';A.paint.rrect(t.x,t.y,t.w,t.h,8);g.fill();g.strokeStyle=SLATE;g.lineWidth=1.5;g.stroke();
  g.fillStyle=INK;g.font=`700 ${A.narrow?13:15}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillText((tried?(off?'✓ ':'✗ '):'')+CHECKS[t.i][0],t.x+12,t.y+t.h/2,t.w-20)})}
function check(i){const L=F.lat,[t,off,res]=CHECKS[i];L.tried.add(i);if(off){L.found.add(i);A.sound.pop()}else A.sound.miss();say(res+(off?' That is reading sideways: checking what others say.':''))}
/* step 3: tap the tricks */
function bits(){const out=[];let x=10,y=A.H*.2;const g=A.ctx,f=A.narrow?14:16,h=f+16;g.font=`700 ${f}px system-ui,sans-serif`;
 BITS.forEach((b,i)=>{const w=Math.min(A.W-20,g.measureText(b[0]).width+18);if(x+w>A.W-10){x=10;y+=h+10}out.push({i,x,y,w,h});x+=w+8});return out}
function drawFlags(){bg();const T=F.tr,g=A.ctx;bits().forEach(b=>{const[t,flag]=BITS[b.i],hit=T.hit.has(b.i),miss=T.miss===b.i;g.fillStyle=hit?'#fecaca':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,8);g.fill();
  g.strokeStyle=hit?BAD:miss?SLATE:'#94a3b8';g.lineWidth=hit?3:1.5;g.stroke();g.fillStyle=INK;g.font=`700 ${A.narrow?14:16}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(t,b.x+b.w/2,b.y+b.h/2+1,b.w-12)});
 lab(`Tricks found: ${T.hit.size} of 4`,A.W/2,A.H*.08,{ok:T.hit.size>=4});const tr=[...T.hit].map(i=>TRICK[BITS[i][2]].split(':')[0]);if(tr.length)lab(tr.join(' · '),A.W/2,A.H*.9,{f:11})}
function tap(i){const T=F.tr,[t,flag,k]=BITS[i];if(!flag){T.miss=i;A.sound.miss();return say(`"${t}" is plain information you could check. It is not a trick on its own.`)}
 if(T.hit.has(i))return say('Already found. '+TRICK[k]);T.hit.add(i);T.miss=-1;A.sound.pop();say(TRICK[k])}
/* step 4: post, ask first or do not post */
function zones(){return['Post','Ask first','Do not post'].map((t,v)=>({t,v,x:A.W*(.03+v*.33),y:A.H*.55,w:A.W*.28,h:A.H*.3}))}
function drawConsent(){bg();const P=F.cs,g=A.ctx;if(P.k<POSTS.length)lab(POSTS[P.k][0],A.W/2,A.H*.3,{f:A.narrow?14:17});
 zones().forEach(z=>{g.fillStyle=['#bbf7d0','#fde68a','#fecaca'][z.v];A.paint.rrect(z.x,z.y,z.w,z.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=2;g.stroke();
  g.fillStyle=INK;g.font=`800 ${A.narrow?13:15}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(z.t,z.x+z.w/2,z.y+z.h/2,z.w-8)});
 lab(P.k>=POSTS.length?'All 6 decided':`${P.k+1} of ${POSTS.length}: what would you do?`,A.W/2,A.H*.08,{ok:P.k>=POSTS.length})}
function decide(v){const P=F.cs;if(P.k>=POSTS.length)return;const[t,best,why]=POSTS[P.k];if(v!==best){A.sound.miss();return say(`Think again. ${why}`)}P.k++;A.sound.pop();say(`${['Post','Ask first','Do not post'][best]}. ${why}`)}
function draw(){const s=stage();if(s==='chal'){bg();lab('Challenge',A.W/2,A.H*.1,{ok:1});lab('Stop · Check · Think · Share?',A.W/2,A.H*.5,{f:16});return}
 ({feed:drawFeed,spread:drawSpread,lateral:drawLat,flags:drawFlags,consent:drawConsent})[s]();A.fx.draw(A.ctx)}
const inside=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function down(p){const s=stage();if(s==='feed'){const S=slots(),i=S.findIndex((k,j)=>inside(p,feedBox(j)));if(i>=0)like(S[i]);return false}
 if(s==='spread'){F.drag=1;F.x0=p.x;F.s0=F.sp.s;return true}
 if(s==='lateral'){const t=tabs().find(t=>inside(p,t));if(t)check(t.i);return false}
 if(s==='flags'){const b=bits().find(b=>inside(p,b));if(b)tap(b.i);return false}
 if(s==='consent'){const z=zones().find(z=>inside(p,z));if(z)decide(z.v);return false}return false}
function move(p){if(F.drag&&stage()==='spread'){const s=cap(F.s0+Math.round((p.x-F.x0)/(A.W*.15)),1,5);if(s!==F.sp.s){F.sp.s=s;A.sound.tick();A.redraw()}}}
function up(){if(F.drag&&stage()==='spread')setShock(F.sp.s);F.drag=0}
function fresh(){run++;for(const k in F)delete F[k];Object.assign(F,{feed:{w:CATS.map(()=>1),likes:0},sp:{s:1},lat:{tried:new Set(),found:new Set()},tr:{hit:new Set(),miss:-1},cs:{k:0},drag:0,ping:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();tools();F.ping()}
const met=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();say(desc);F.ping=met(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function tools(){if(!bar)return;bar.innerHTML='';const s=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(s==='feed'){[0,1,2].forEach(k=>B('Like '+CATS[k][0],()=>like(k),'Like a '+CATS[k][0]+' post'));B('Search something new',widen,'Search for a kind of post you rarely see')}
 if(s==='spread'){B('Less shocking',()=>setShock(F.sp.s-1));B('More shocking',()=>setShock(F.sp.s+1))}
 if(s==='lateral')CHECKS.forEach((c,i)=>B(c[0],()=>check(i)));
 if(s==='flags')BITS.forEach((b,i)=>B(b[0],()=>tap(i),'Tap the words: '+b[0]));
 if(s==='consent'){B('Post',()=>decide(0));B('Ask first',()=>decide(1));B('Do not post',()=>decide(2))}}
const steps=[
{h:'Your feed learns',p:'This is your feed. Tap a post to like it, or use the Like buttons. Watch how the feed changes.',
 predict:{q:'You like 4 gaming posts in a row. Your feed will show…',opts:['the same mix as before','more gaming, less of everything else','only news'],ans:1},task:'Like 4 posts',
 show:()=>auto(0,[0,0,0,0].map(k=>()=>like(k)),600),
 go:()=>begin(0,'A feed of six posts on six different topics.',()=>F.feed.likes>=4,'The app feeds you more of what you like. Your view gets narrower: a filter bubble.')},
{h:'Why false posts spread',p:'Drag sideways on the picture, or use the buttons, to make the post more or less shocking.',
 predict:{q:'On average, which spreads further and faster online?',opts:['true stories','false stories','both the same'],ans:1},task:'Make a post reach 100 people or more',
 show:()=>auto(1,[2,3,4].map(s=>()=>setShock(s)),900),
 go:()=>begin(1,'One post in the middle. Each person who sees it shares it to 1 more person.',()=>reach(F.sp.s)>=100,'Shocking, surprising posts get shared most, whether or not they are true.')},
{h:'Read sideways',p:'You meet this claim on a site you do not know. Choose checks. Which ones tell you something real?',
 predict:{q:'Best first step to check a site you do not know?',opts:['read its About page','see what other sites say about it','count its likes'],ans:1},task:'Find the 2 useful checks',
 show:()=>auto(2,[0,2,3].map(i=>()=>check(i)),900),
 go:()=>begin(2,'A scary health claim and five ways to check it.',()=>F.lat.found.size>=2,'Leave the page and check what others say. Fact-checkers call this lateral reading.')},
{h:'Spot the tricks',p:'This post went viral. Tap each part that tries to push your feelings instead of giving evidence.',task:'Find all 4 tricks',
 show:()=>auto(3,[0,3,4,5].map(i=>()=>tap(i)),700),
 go:()=>begin(3,'A viral post split into parts you can tap.',()=>F.tr.hit.size>=4,'Rush, strong feelings, being too sure and one story are signs to stop and check.')},
{h:'Ask before you post',p:'For each one, choose Post, Ask first or Do not post. Tap a box or a button.',task:'Decide all 6',
 show:()=>auto(4,POSTS.map(([,v])=>()=>decide(v)),500),
 go:()=>begin(4,'A post idea and three boxes: Post, Ask first, Do not post.',()=>F.cs.k>=POSTS.length,'Other people\'s faces and details are theirs. Ask first, and be the same person online as off.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>F.ping()});
const QS=[
 {q:'Your feed only shows one kind of post now. Why?',a:'The app shows more of what you liked',o:[['That is all there is online','all'],['Your phone is broken','all']]},
 {q:'A post makes you very angry. What is the best move?',a:'Pause and check it before sharing',o:[['Share it fast so others know','rush'],['It must be true if it feels so strong','feel']]},
 {q:'How do fact-checkers check a site they do not know?',a:'Open new tabs and see what others say',o:[['Read the site\'s About page','about'],['Count the likes and shares','likes']]},
 {q:'Why do clever people fall for false posts?',a:'Feelings and repeats make claims feel true',o:[['Only silly people fall for them','smart'],['False posts are always easy to spot','smart']]},
 {q:'You took a photo of your friends. What first?',a:'Ask them before you post it',o:[['Post it, you took it','own'],['Post it, then delete if they mind','own']]},
 {q:'A post has 50,000 likes. Is it true?',a:'Likes do not show if it is true',o:[['Yes, so many people agree','likes'],['Yes, the app would remove it','all']]}];
function why(t){let m='Stop, check the source, and think before you share.';
 if(t==='all')m='Apps rank posts by what you click and like. There is much more out there than your feed shows.';
 if(t==='rush')m='Rushing is what false posts want. A pause to check stops most of them.';
 if(t==='feel')m='Strong feelings are not evidence. Posts that anger or scare us are often built to spread.';
 if(t==='about')m='A site can say anything about itself. Check what other, trusted sources say about it.';
 if(t==='likes')m='Popular is not the same as true. Lots of likes can come from a shocking post or from bots.';
 if(t==='smart')m='Everyone can be fooled. Repeats and strong feelings make a claim feel true, even for clever people.';
 if(t==='own')m='The people in the photo have a say. Once it is posted, others can copy it, so ask first.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{qa.hidden=B.step!==5;bar.hidden=B.step===5;tools()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Feed controls'},wrap);qa=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});tools()}}).start()})})();
