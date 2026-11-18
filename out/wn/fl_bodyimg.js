/* Flagship – media, body image and self-esteem (ages 14–15; PSHE KS4 self-concept, media and body image; DfE RSHE 2019). */
(()=>{
/* step 1 edits: [key, button, what it does] */
const EDITS=[['pick','Pick 1 of 30 shots','Posted photos are often the best of many tries. You never see the other 29.'],
 ['light','Soft, warm light','Front light fills in shadows and evens out skin.'],
 ['angle','Low camera angle','A camera held low and tilted makes legs look longer.'],
 ['smooth','Skin smoothing','Smoothing wipes away pores, lines and spots that every real face has.'],
 ['shape','Reshape tool','A warp tool pulls in the waist, and bends the background with it.'],
 ['filter','Face filter','A filter enlarges eyes and narrows the jaw as the photo is taken.']];
/* step 2: [edit shown, clue, where to tap as fractions of the photo [x0,y0,x1,y1], hint] */
const CLUE=[['shape','The waist was pulled in, and the door frame bent with it. Straight lines curving near a body are a giveaway.',[.12,.38,.46,.72],'Look at the straight lines behind the person.'],
 ['smooth','The face has no texture at all. Real skin always has pores, lines or marks.',[.47,.1,.75,.36],'Look closely at the skin on the face.'],
 ['angle','The legs were stretched: the floor line waves near the feet.',[.38,.78,.86,.95],'Look at the floor line near the feet.']];
/* step 3: [moment, 0 = usually posted, 1 = usually not posted] */
const REEL=[['The best of 40 selfies',0],['Messy hair on a Monday',1],['A sunset on holiday',0],['Three hours stuck at the airport',1],['A gym photo in perfect light',0],['Spots on a school day',1],['A new outfit, posed',0]];
/* step 4: [thought, fairer reframe, two traps with why] */
const THINK=[['Her skin is perfect and mine is not.','Her photo was lit, filtered and picked from many. Real skin has texture.',
  ['I should filter my face in every photo.','That keeps you comparing with an edited face. Selfie editing is linked to more body worry.'],
  ['Everyone must notice my skin.','That is the spotlight effect: people notice us far less than we think.']],
 ['My legs look bigger than theirs.','My legs got me through football practice today.',
  ['I will slim my legs in the app before I post.','Editing to match keeps the comparison going.'],
  ['I will not go out until they look different.','Avoiding things feeds the worry.']],
 ['I only got 12 likes, so I look bad.','Likes depend on timing and the app, not on my worth.',
  ['I will delete it and post a better one.','Chasing likes ties your worth to a number you cannot control.'],
  ['Everyone else gets hundreds.','Apps show you the biggest posts most, so it only looks that way.']]];
/* step 5: [habit, 0 = helps, 1 = harms, why] */
const HABIT=[['Follow accounts about hobbies, skills and all body types',0,'A wider feed means fewer appearance comparisons.'],
 ['Zoom in on your own photos to hunt for flaws',1,'Hunting for flaws trains you to see only flaws.'],
 ['Spend less time on appearance-focused apps',0,'In a 2023 trial, cutting social media to an hour a day for three weeks improved how young people felt about their looks.'],
 ['Edit every selfie before posting',1,'Heavy selfie editing is linked to more body worry, not less.'],
 ['Notice when you are comparing, and name it',0,'Naming it (that is a highlight reel) takes some of its power away.'],
  ['Thank your body for what it can do',0,'In studies, focusing on what your body does improves body image.']];
VIS.reg('flagbodyimg',c=>{let A,X,keys,q,qi=-1,ver=0,held=null;const T={};
const INK='#1f2937',CARD='#fff',LINE='#6b7280',YES='#166534',NO='#b91c1c',PICK='#1d4ed8',HL='#dbeafe';
const mode=()=>['studio','spot','reel','think','habit','quiz'][A.step],sz=n=>Math.round(n*(A.narrow?1:1.1)),fnt=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`;
const bp=()=>X.beginPath(),on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wr(t,x,y,n,col,w,max){X.font=fnt(n,w);X.fillStyle=col||INK;X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,max||A.W-20)}
function lines(t,max,n){X.font=fnt(n);const out=[];let cur='';t.split(' ').forEach(w=>{const s=cur?cur+' '+w:w;if(X.measureText(s).width>max&&cur){out.push(cur);cur=w}else cur=s});out.push(cur);return out}
function tile(r,t,o){o=o||{};X.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||12);X.fill();X.lineWidth=o.ring?4:2;X.strokeStyle=o.ring||LINE;X.stroke();
 if(t){const n=o.n||16,L=lines(t,r.w-16,n),lh=sz(n)*1.2;L.forEach((s,i)=>wr(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,o.ink,o.w,r.w-12))}}
function ground(){X.fillStyle=A.col.dark?'#111827':'#f9fafb';X.fillRect(0,0,A.W,A.H)}
function title(t,good){X.font=fnt(15,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=sz(15)+16;tile({x:A.W/2-w/2,y:A.H*.02,w,h},t,{n:15,w:800,rad:h/2,bg:good?'#dcfce7':CARD,ring:good?YES:null})}
/* ---- the photo: a wall, a door frame, a floor line and a simple figure; e holds which edits are on ---- */
function photo(r,e){const W=r.w,H=r.h,x0=r.x,y0=r.y,P=(fx,fy)=>[x0+W*fx,y0+H*fy];X.save();A.paint.rrect(x0,y0,W,H,10);X.clip();
 X.fillStyle='#d6d3d1';X.fillRect(x0,y0,W,H);X.fillStyle='#a8a29e';X.fillRect(x0,y0+H*.86,W,H*.14);
 const bend=e.shape?W*.05:0;X.strokeStyle='#57534e';X.lineWidth=Math.max(3,W*.025);
 for(const fx of[.2,.36]){bp();X.moveTo(...P(fx,0));X.lineTo(...P(fx,.42));X.quadraticCurveTo(x0+W*fx+bend*(fx>.3?1.6:1),y0+H*.55,...P(fx,.68));X.lineTo(...P(fx,.86));X.stroke()}
 X.strokeStyle='#44403c';X.lineWidth=3;bp();for(let k=0;k<=20;k++){const fx=k/20,wave=e.angle&&fx>.42&&fx<.82?Math.sin((fx-.42)*Math.PI*5)*H*.02:0;X.lineTo(x0+W*fx,y0+H*.86+wave)}X.stroke();
 const cx=x0+W*.61,tall=e.angle?1.07:1,top=y0+H*.86-H*.76*tall,body=(fy)=>top+(fy)*H*.76*tall,waist=e.shape?.6:1;
 X.fillStyle='#1d4ed8';bp();X.moveTo(cx-W*.14,body(.3));X.lineTo(cx+W*.14,body(.3));X.lineTo(cx+W*.11*waist,body(.55));X.lineTo(cx+W*.13,body(.68));X.lineTo(cx-W*.13,body(.68));X.lineTo(cx-W*.11*waist,body(.55));X.closePath();X.fill();
 X.fillStyle='#374151';X.fillRect(cx-W*.11,body(.68),W*.09,H*.76*tall*.32);X.fillRect(cx+W*.02,body(.68),W*.09,H*.76*tall*.32);
 const hr=W*.1,hy=body(.16);X.fillStyle='#a16207';bp();X.ellipse(cx,hy,hr*(e.filter?.86:1),hr*1.15,0,0,7);X.fill();X.fillStyle='#3f2a1d';bp();X.ellipse(cx,hy-hr*.7,hr*1.05,hr*.55,0,Math.PI,0);X.fill();
 X.fillStyle='#fff';const er=hr*(e.filter?.26:.17);for(const s of[-1,1]){bp();X.arc(cx+s*hr*.38,hy-hr*.05,er,0,7);X.fill()}X.fillStyle='#111827';for(const s of[-1,1]){bp();X.arc(cx+s*hr*.38,hy-hr*.05,er*.5,0,7);X.fill()}
 if(!e.smooth){X.fillStyle='#713f12';[[-.5,.35],[-.3,.5],[.42,.38],[.2,.55],[-.1,.3],[.55,.15]].forEach(([a,b])=>{bp();X.arc(cx+a*hr,hy+b*hr,Math.max(2.2,hr*.08),0,7);X.fill()})}
 X.strokeStyle='#7c2d12';X.lineWidth=2;bp();X.arc(cx,hy+hr*.35,hr*.35,.2*Math.PI,.8*Math.PI);X.stroke();
 if(e.light){X.fillStyle='rgba(253,224,171,.28)';X.fillRect(x0,y0,W,H)}X.restore();
 X.strokeStyle=LINE;X.lineWidth=2;A.paint.rrect(x0,y0,W,H,10);X.stroke();if(e.pick)tile({x:x0+6,y:y0+6,w:sz(70),h:sz(24)},'1 of 30',{n:12,rad:12})}
/* ---- 1: the edit studio ---- */
function frames(){const g=10,w=(A.W-3*g)/2,h=Math.min(w*1.3,A.H*.5);return[{x:g,y:A.H*.1,w,h},{x:g*2+w,y:A.H*.1,w,h}]}
function chips(){const f=frames()[0],y=f.y+f.h+sz(30),w=(A.W-30)/2,h=sz(46);return EDITS.map((d,j)=>({j,x:10+(j%2)*(w+10),y:y+Math.floor(j/2)*(h+8),w,h}))}
function drawStudio(){const s=T.studio,done=EDITS.every(d=>s.on[d[0]]);ground();title(done?'Same person, very different photo':'Turn on each edit',done);const [a,b]=frames();
 photo(a,{});photo(b,s.on);wr('as they are',a.x+a.w/2,a.y+a.h+sz(14),13,A.col.tx);wr('as posted',b.x+b.w/2,b.y+b.h+sz(14),13,A.col.tx);
 chips().forEach(r=>tile(r,EDITS[r.j][1],{n:14,bg:s.on[EDITS[r.j][0]]?HL:CARD,ring:s.on[EDITS[r.j][0]]?PICK:null}))}
function edit(j){const s=T.studio,[k,,why]=EDITS[j];s.on[k]=!s.on[k];A.sound.tick();say((s.on[k]?'On: ':'Off: ')+why+(EDITS.every(d=>s.on[d[0]])?' All six together: this is how many posted photos are made.':''))}
/* ---- 2: spot the clue ---- */
const big=()=>{const w=Math.min(A.W-40,A.H*.62),h=w*1.15;return{x:A.W/2-w/2,y:A.H*.12,w,h:Math.min(h,A.H*.8)}};
function drawSpot(){const s=T.spot,done=s.i>=CLUE.length;ground();title(done?'Three clues found':`Photo ${s.i+1} of 3: tap the clue it was edited`,done);
 const r=big(),e=done?{shape:1,smooth:1,angle:1}:{[CLUE[s.i][0]]:1};photo(r,e);
 if(s.miss){X.strokeStyle=NO;X.lineWidth=3;bp();X.arc(s.miss.x,s.miss.y,14,0,7);X.stroke()}
 CLUE.slice(0,s.i).forEach(([, ,b])=>{X.strokeStyle=YES;X.lineWidth=3;X.strokeRect(r.x+b[0]*r.w,r.y+b[1]*r.h,(b[2]-b[0])*r.w,(b[3]-b[1])*r.h)})}
function look(p){const s=T.spot;if(s.i>=CLUE.length)return;const r=big(),[, why,b,hint]=CLUE[s.i],fx=(p.x-r.x)/r.w,fy=(p.y-r.y)/r.h;
 if(fx>=b[0]&&fx<=b[2]&&fy>=b[1]&&fy<=b[3]){s.i++;s.miss=null;A.sound.pop();return say(why+(s.i>=CLUE.length?' All three found.':''))}
 s.miss=p;A.sound.miss();const m=`Nothing was changed there. ${hint}`;say(m)}
function lookAt(j){const r=big(),b=CLUE[j][2];look({x:r.x+(b[0]+b[2])/2*r.w,y:r.y+(b[1]+b[3])/2*r.h})}
/* ---- 3: highlight reel or everyday life ---- */
const bins=()=>{const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.36,w,h:A.H*.6}))},deck=()=>({x:A.W/2-sz(130),y:A.H*.12,w:sz(260),h:sz(62)});
function drawReel(){const s=T.reel,done=s.i>=REEL.length;ground();title(done?'The feed is the highlight reel':`Card ${s.i+1} of 7: does it usually get posted?`,done);
 bins().forEach(b=>{tile(b,null,{bg:b.j?'#f3f4f6':'#fef3c7',ring:s.bad===b.j?NO:LINE});wr(b.j?'Usually not posted':'Usually posted',b.x+b.w/2,b.y+sz(16),14,INK,800,b.w-10);
  REEL.slice(0,s.i).filter(v=>v[1]===b.j).forEach((v,m)=>wr(v[0],b.x+b.w/2,b.y+sz(42)+m*sz(22),12,INK,600,b.w-10))});
 if(!done){const r=deck();tile(held?{...r,x:held.x-r.w/2,y:held.y-r.h/2}:r,REEL[s.i][0],{n:17,ring:held?PICK:null})}}
function file(j){const s=T.reel;if(s.i>=REEL.length)return;const [t,ok]=REEL[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();let m=`${t} is exactly the kind of moment people choose to post.`;if(ok)m=`Most people would not post ${t.toLowerCase()}. That part of life stays off the feed.`;return say(m)}
 s.i++;s.bad=null;A.sound.pop();say(`${t}: ${ok?'usually not posted':'usually posted'}.`+(s.i>=REEL.length?' You compare your whole life with other people\u2019s best moments.':''))}
/* ---- 4: a fairer thought ---- */
const opts=i=>{const [,good,a,b]=THINK[i],L=[[good,0],[a[0],1],[b[0],2]],r=i%3;return L.slice(r).concat(L.slice(0,r))};
const optRects=()=>[0,1,2].map(j=>({j,x:12,y:A.H*.36+j*sz(78),w:A.W-24,h:sz(68)}));
function drawThink(){const s=T.think,done=s.i>=THINK.length;ground();title(done?'Three fairer thoughts':`Thought ${s.i+1} of 3: pick the fairer reply`,done);
 if(done)return;
 tile({x:12,y:A.H*.12,w:A.W-24,h:sz(70)},'\u201c'+THINK[s.i][0]+'\u201d',{n:17,bg:'#ede9fe'});
 optRects().forEach((r,j)=>{const [t,k]=opts(s.i)[j];tile(r,t,{n:14,w:600,bg:s.bad===k?'#fee2e2':CARD,ring:s.bad===k?NO:null})})}
function reply(k){const s=T.think;if(s.i>=THINK.length)return;const th=THINK[s.i];
 if(k){s.bad=k;A.sound.miss();const m=th[1+k][1];return say(m)}s.i++;s.bad=null;A.sound.pop();say(`Fairer: ${th[1]}`+(s.i>=THINK.length?' Three thoughts reframed.':''))}
/* ---- 5: habits that help or harm ---- */
const two=()=>{const w=(A.W-36)/2;return[0,1].map(j=>({j,x:12+j*(w+12),y:A.H*.55,w,h:sz(64)}))};
function drawHabit(){const s=T.habit,done=s.i>=HABIT.length;ground();title(done?'Six habits sorted':`Habit ${s.i+1} of 6: helps or harms self-esteem?`,done);
 if(done){HABIT.forEach(([t,g],m)=>wr((g?'✗ ':'✓ ')+t,A.W/2,A.H*(.15+m*.13),12,A.col.tx,600));return}
 tile({x:12,y:A.H*.18,w:A.W-24,h:sz(90)},HABIT[s.i][0],{n:18});two().forEach(b=>tile(b,b.j?'✗ Harms':'✓ Helps',{n:18,bg:b.j?'#fee2e2':'#dcfce7',ring:s.bad===b.j?NO:null}))}
function judge(j){const s=T.habit;if(s.i>=HABIT.length)return;const [t,ok,why]=HABIT[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();let m='This one tends to help. '+why;if(ok)m='This one tends to harm. '+why;return say(m)}s.i++;s.bad=null;A.sound.pop();say(why+(s.i>=HABIT.length?' All six sorted.':''))}
/* ---- input ---- */
function down(p){const k=mode();
 if(k==='studio'){const r=chips().find(r=>on(p,r));if(r)edit(r.j)}
 if(k==='spot'&&on(p,big()))look(p);
 if(k==='reel'){if(T.reel.i<REEL.length&&on(p,deck())){held={x:p.x,y:p.y};return true}const b=bins().find(r=>on(p,r));if(b)file(b.j)}
 if(k==='think'&&T.think.i<THINK.length){const r=optRects().find(r=>on(p,r));if(r)reply(opts(T.think.i)[r.j][1])}
 if(k==='habit'){const b=two().find(r=>on(p,r));if(b)judge(b.j)}return false}
function move(p){if(held){held.x=p.x;held.y=p.y;A.redraw()}}
function up(p){if(!held)return;held=null;const b=bins().find(r=>on(p,r));if(b)file(b.j);else A.redraw()}
function clear(){ver++;held=null;for(const k in T)delete T[k];T.studio={on:{}};['spot','reel','think','habit'].forEach(k=>T[k]={i:0});T.hook=()=>{}}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();T.hook()}
function open(i,first,ready,msg){clear();say(first);T.hook=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function buttons(){if(!keys)return;keys.innerHTML='';const k=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='studio')EDITS.forEach((d,j)=>b(d[1],()=>edit(j),`${d[1]}: turn ${T.studio.on[d[0]]?'off':'on'}`));
 if(k==='spot'&&T.spot.i<CLUE.length)['the door frame','the face','the floor by the feet'].forEach((t,j)=>b(t,()=>lookAt(j),`Check ${t}`));
 if(k==='reel'&&T.reel.i<REEL.length)['Usually posted','Usually not posted'].forEach((t,j)=>b(t,()=>file(j),`${REEL[T.reel.i][0]}: ${t}`));
 if(k==='think'&&T.think.i<THINK.length)opts(T.think.i).forEach(([t,j])=>b(t.length>34?t.slice(0,32)+'…':t,()=>reply(j),t));
 if(k==='habit'&&T.habit.i<HABIT.length)['Helps','Harms'].forEach((t,j)=>b(t,()=>judge(j),`${HABIT[T.habit.i][0]}: ${t}`))}
const steps=[
{h:'How a posted photo is made',p:'Many posted photos were picked from lots of tries, then lit, angled, smoothed, reshaped or filtered. Turn on each edit and watch the right photo change.',
predict:{q:'The photos of influencers you scroll past are mostly…',opts:['How they really look, taken once','Picked, posed and edited'],ans:1},task:'Turn on all six edits',
show:()=>demo(0,EDITS.map((d,j)=>()=>edit(j)),450),go:()=>open(0,'Tap an edit to turn it on.',()=>EDITS.every(d=>T.studio.on[d[0]]),'The person did not change. The photo did.')},
{h:'Spot the edit',p:'Edits leave clues: lines that bend near a body, skin with no texture, a floor that ripples. Tap the clue in each photo.',
predict:{q:'An ad is labelled \u201cretouched\u201d. Does the label stop it making viewers feel worse?',opts:['Yes, the label protects people','Mostly no: studies find labels do little'],ans:1},task:'Find all three clues',
show:()=>demo(1,CLUE.map((x,j)=>()=>lookAt(j)),700),go:()=>open(1,'Photo 1. Tap where it was edited.',()=>T.spot.i>=CLUE.length,'Knowing the clues helps, but a known edit can still sting.')},
{h:'The highlight reel',p:'People post their best moments and skip the rest. Drag each moment to where it usually ends up.',
predict:{q:'Comparing your looks with edited posts usually leaves people feeling…',opts:['Inspired and better about themselves','Worse about their own looks'],ans:1},task:'Sort all 7 moments',
show:()=>demo(2,REEL.map(v=>()=>file(v[1])),450),go:()=>open(2,'The best of 40 selfies. Drag it to a box, or use the buttons.',()=>T.reel.i>=REEL.length,'Upward comparison: your everyday against their best.')},
{h:'A fairer thought',p:'A comparison thought can feel like a fact. Pick the reply that is fair to you and true to how photos are made.',task:'Reframe all 3 thoughts',
show:()=>demo(3,THINK.map(()=>()=>reply(0)),600),go:()=>open(3,'Her skin is perfect and mine is not. Pick a fairer reply.',()=>T.think.i>=THINK.length,'Name the edit, value what your body does, step back from the feed.')},
{h:'Habits that help',p:'Some habits protect self-esteem online and some wear it down. Helps or harms?',task:'Sort all 6 habits',
show:()=>demo(4,HABIT.map(v=>()=>judge(v[1])),450),go:()=>open(4,'Follow accounts about hobbies, skills and all body types?',()=>T.habit.i>=HABIT.length,'Curate the feed, cut the time, notice the comparing.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.hook()});
const QS=[
{q:'What is upward comparison?',a:'Comparing yourself with people who seem better off',o:[['Comparing yourself with people who seem worse off','That is downward comparison. Upward comparison tends to lower mood.'],['Asking a role model for advice','Getting advice is not comparing. Upward means against someone who seems better off.']]},
{q:'Which is a sign a photo was warped?',a:'A door frame bends near the body',o:[['The person is smiling','Smiling is not an edit. Look for straight lines that curve near a body.'],['The photo is in focus','Sharpness is not a clue. Bent lines, missing texture and rippled floors are.']]},
{q:'A retouched ad carries a label saying so. What do studies find?',a:'The label does little to stop people feeling worse',o:[['The label makes the image harmless','Studies found labels did little to reduce body dissatisfaction.'],['The label makes people feel better about their own bodies','In studies, labels did not improve how viewers felt.']]},
{q:'Which habit is linked to better body image?',a:'Spending less time on appearance-focused feeds',o:[['Following more accounts with edited bodies','More edited bodies means more upward comparison, which tends to lower body image.'],['Editing your selfies before posting','Heavy selfie editing is linked to more body worry, not less.']]},
{q:'What does focusing on body functionality mean?',a:'Valuing what your body can do',o:[['Changing how your body looks','Functionality is what your body does, like running or laughing, not its look.'],['Checking your body in the mirror often','Body checking keeps attention on looks.']]},
{q:'Self-esteem is…',a:'How you value yourself overall',o:[['How you look in photos','Looks are only one part of self-esteem, which is your overall sense of your own worth.'],['How many likes you get','Likes depend on timing and the app. Self-esteem is how you value yourself overall.']]}];
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 q.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=q.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>result(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function result(why,a){q.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=q.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=mode();if(k==='quiz'){ground();title('Challenge',1);const [a,b]=frames();photo(a,{});photo(b,{pick:1,light:1,angle:1,smooth:1,shape:1,filter:1});return}
 ({studio:drawStudio,spot:drawSpot,reel:drawReel,think:drawThink,habit:drawHabit})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.7,tall:1.45,draw,onStep:B=>{q.hidden=B.step!==5;keys.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Photo and feed buttons'},w);q=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}}).start()})})();
