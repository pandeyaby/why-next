/* Flagship – identity and belonging in adolescence (ages 12–13, PSHE Association KS3 Programme of Study: identity, the
   influences on it, self-concept and self-esteem, the impact of social media and social comparison; RSE/Health guidance
   (DfE 2019) on positive relationships and online life). Place parts of Jo's identity on a personal ring and a group ring,
   trace each part to its influence, slide real-life moments between "fitting in" and "belonging", flip polished posts to
   see what social comparison hides, then scrub a timeline from age 8 to 16 to watch identity develop. Targets the slips
   that identity is one fixed thing, that fitting in and belonging are the same, that feeds show the whole of someone's
   life, and that changing interests means you were "fake" before. */
(()=>{const FACE='Nunito,ui-rounded,system-ui,sans-serif';
const PARTS=[{s:'Loves drawing comics',k:'drawing',g:0},{s:'In a Polish-British family',k:'family',g:1},{s:'Thinks fairness matters',k:'fairness',g:0},
 {s:'Plays for the Year 8 football team',k:'football',g:1},{s:'Gets nervous speaking in class',k:'nervous',g:0},{s:'Sings in the school choir',k:'choir',g:1}];
const SRC=['Family','Friends','Media','Own experience'];
const ROOTS=[{s:'Speaks Polish with her grandma',a:0},{s:'Wears the same trainers as her group',a:1},{s:'Wants skin like a filtered influencer',a:2},{s:'Took up drums after a taster lesson',a:3}];
const MOMENTS=[{n:'Kai',s:'Kai laughs at jokes he finds mean, so the group keeps him around.',b:0},{n:'Priya',s:"Priya's friends know she hates horror, so they pick a comedy for movie night.",b:1},
 {n:'Sam',s:'Sam hides that he loves ballet from his team.',b:0},{n:'Ellie',s:'At choir, Ellie can be quiet one week and silly the next, and still feels welcome.',b:1}];
const POSTS=[{f:'Perfect beach day, best life!',r:'One sunny hour from a rainy week.'},{f:'Woke up like this',r:'Took 40 tries, a ring light and a filter.'},{f:'Obsessed with these new headphones',r:'Paid post: the brand sent them for free.'}];
const AGES=[{y:8,i:'dinosaurs, cartoons',p:'Cubs, class 3B',v:'fairness, kindness'},{y:12,i:'comics, football',p:'football team, choir',v:'fairness, kindness'},{y:16,i:'drums, graphic design',p:'a band, art club',v:'fairness, kindness, honesty'}];
VIS.reg('flagbelong',c=>{let X,ctl,chal,qk=-1,row=0;const M={};
const phase=()=>['web','roots','scale','feed','time','quiz'][X.step];
const note=s=>{c.say(s);if(X)X.cv.setAttribute('aria-label',s)};
const px=n=>Math.round(n*(X.narrow?1.1:1.12)),again=()=>X.redraw();
function wrapTo(g,s,maxW){const out=[];let ln='';for(const w of s.split(' ')){const t=ln?ln+' '+w:w;if(ln&&g.measureText(t).width>maxW){out.push(ln);ln=w}else ln=t}if(ln)out.push(ln);return out}
function label(g,s,x,y,n,o={}){g.font=`${o.w||700} ${px(n)}px ${FACE}`;g.fillStyle=o.c||X.col.tx;g.textAlign=o.al||'center';g.textBaseline='middle';
 const ls=o.mw?wrapTo(g,s,o.mw):[s],lh=px(n)*1.25;ls.forEach((l,i)=>g.fillText(l,x,y+(i-(ls.length-1)/2)*lh));return ls.length*lh}
function box(g,b,s,n,o={}){const K=X.col;X.paint.rrect(b.x,b.y,b.w,b.h,12);g.fillStyle=o.bg||K.pn;g.fill();g.lineWidth=o.on?3.5:1.8;g.strokeStyle=o.ln||K.tx;g.stroke();
 if(s)label(g,s,b.x+b.w/2,b.y+b.h/2,n,{mw:b.w-18,w:o.w,c:o.c})}
const inside=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function stack(n,y0,y1,each){const gap=8,h=Math.min(each||70,(y1-y0-(n-1)*gap)/n);return[...Array(n)].map((_,i)=>({x:14,y:y0+i*(h+gap),w:X.W-28,h}))}
/* step 0: identity web */
function drawWeb(g){const{W,H,col:K}=X,cx=W/2,cy=H*.6,ro=Math.min(W*.44,H*.36),ri=ro*.5;M.cx=cx;M.cy=cy;M.ro=ro;M.ri=ri;
 g.beginPath();g.arc(cx,cy,ro,0,7);g.fillStyle=X.mix(K.pn,K.cy,.14);g.fill();g.lineWidth=2;g.strokeStyle=K.cy;g.stroke();
 g.beginPath();g.arc(cx,cy,ri,0,7);g.fillStyle=X.mix(K.pn,K.am,.2);g.fill();g.strokeStyle=K.am;g.stroke();
 label(g,'Personal',cx,cy-ri+16,12,{c:K.mu,w:800});label(g,'Groups',cx,cy-ri-(ro-ri)/2,12,{c:K.mu,w:800});
 const per=M.placed.filter(j=>!PARTS[j].g),grp=M.placed.filter(j=>PARTS[j].g);
 const tag=(k,x,y,cl)=>{g.font=`800 ${px(12)}px ${FACE}`;const tw=g.measureText(PARTS[k].k).width+16;X.paint.rrect(x-tw/2,y-12,tw,24,12);g.fillStyle=K.pn;g.fill();g.strokeStyle=cl;g.lineWidth=2;g.stroke();label(g,PARTS[k].k,x,y,12,{w:800})};
 per.forEach((k,n)=>tag(k,cx,cy-ri*.38+n*ri*.48,K.am));
 grp.forEach((k,n)=>{const a=[2.55,.59,1.57][n],r=(ri+ro)/2;tag(k,cx+Math.cos(a)*r,cy+Math.sin(a)*r,K.cy)});
 const nx=M.i<PARTS.length?PARTS[M.i]:null;
 if(nx){const b={x:14,y:14,w:W-28,h:X.narrow?58:50};M.chip=M.hold?{...b,x:M.hold.x-b.w/2,y:M.hold.y-b.h/2}:b;box(g,M.chip,`${nx.s}: inner ring or outer ring?`,14,{w:800,on:!!M.hold,ln:K.vi})}
 else label(g,'Six parts, two rings: one person, many sides.',W/2,34,15,{w:800,mw:W-24})}
function ring(p){const d=Math.hypot(p.x-M.cx,p.y-M.cy);return d<=M.ri?0:d<=M.ro+8?1:-1}
function place(k,g){if(phase()!=='web'||k!==M.i)return;const P=PARTS[k];
 if(g!==P.g)return miss(P.g?`"${P.s}" is a group Jo belongs to, so it sits on the outer ring of social identity.`:`"${P.s}" is about Jo herself (a trait, value or interest), so it goes on the inner ring of personal identity.`);
 M.placed.push(k);M.i++;X.sound.tick();if(M.i===PARTS.length)return hit('Personal identity is your traits, values and interests. Social identity is the groups you belong to. Jo has both.');note(`Placed. Next: ${PARTS[M.i].s}`);pads();again()}
/* step 1: roots of identity */
function drawRoots(g){const{W,H,col:K}=X,cur=ROOTS[Math.min(M.j,3)];
 label(g,M.j<4?'Where did this part of Jo come from?':'Every part has a root.',W/2,22,15,{w:800});
 M.card={x:14,y:42,w:W-28,h:52};box(g,M.card,M.j<4?cur.s:'Family, friends, media and her own experience all shape Jo.',14,{bg:X.mix(K.pn,K.vi,.12),ln:K.vi,w:800});
 const bw=(W-38)/2,bh=X.narrow?48:44,by=H-bh*2-22;M.srcs=SRC.map((_,i)=>({x:14+(i%2)*(bw+10),y:by+Math.floor(i/2)*(bh+8),w:bw,h:bh}));
 const doneR=ROOTS.slice(0,M.j);doneR.forEach((r,n)=>{const y=110+n*((by-120)/4);box(g,{x:14,y,w:W-28,h:Math.min(48,(by-130)/4)},`${r.s}  ←  ${SRC[r.a]}`,13,{bg:X.mix(K.pn,K.gr,.12),ln:K.gr})});
 M.srcs.forEach((b,i)=>box(g,b,SRC[i],14,{w:800,on:M.tap===i,ln:M.tap===i?K.rd:K.tx}))}
function root(i){if(phase()!=='roots'||M.j>=4)return;const r=ROOTS[M.j];M.tap=i;
 if(i!==r.a){const why=['Family passes on language, culture and traditions.','Friends shape what we wear and how we talk, because we want to match our group.','Media, like adverts and influencers, shows edited images that set standards.','Trying something yourself and enjoying it is your own experience.'][r.a];return miss(`Not quite: ${why} Which influence fits "${r.s}"?`)}
 M.j++;M.tap=-1;burst();if(M.j<4){X.sound.pop();note(`Yes: ${SRC[r.a]}. Next: ${ROOTS[M.j].s}`);pads();return again()}hit('Identity is shaped by family, friends, media and your own choices, usually all at once.')}
/* step 2: fitting in vs belonging scale */
function drawScale(g){const{W,H,col:K}=X,m=MOMENTS[Math.min(M.q,3)],y=H*.62,x0=24,x1=W-24;M.track={x0,x1,y};
 label(g,M.q<4?`Moment ${M.q+1} of 4: drag the dot to a side`:'All 4 moments placed.',W/2,22,15,{w:800});
 box(g,{x:14,y:42,w:W-28,h:X.narrow?84:66},M.q<4?m.s:'Belonging means people accept the real you. Fitting in means changing yourself to be accepted.',14,{w:800,bg:X.mix(K.pn,K.am,.12),ln:K.am});
 g.fillStyle=X.mix(K.pn,K.rd,.18);g.fillRect(x0,y-8,(x1-x0)/2,16);g.fillStyle=X.mix(K.pn,K.gr,.22);g.fillRect(W/2,y-8,(x1-x0)/2,16);g.strokeStyle=K.tx;g.lineWidth=1.5;g.strokeRect(x0,y-8,x1-x0,16);
 label(g,'Fitting in',x0+(x1-x0)/4,y-34,14,{w:900,c:K.rd});label(g,'changing yourself to be accepted',x0+(x1-x0)/4,y+40,12,{mw:(x1-x0)/2-10,c:K.tx});
 label(g,'Belonging',W/2+(x1-x0)/4,y-34,14,{w:900,c:K.gr});label(g,'accepted as you are',W/2+(x1-x0)/4,y+40,12,{mw:(x1-x0)/2-10,c:K.tx});
 M.log.forEach((b,n)=>{const side=M.log.slice(0,n).filter(z=>z===b).length;label(g,MOMENTS[n].n,(b?W/2:x0)+(x1-x0)/4,y+76+side*24,13,{w:900,c:b?K.gr:K.rd})});
 if(M.q<4){g.beginPath();g.arc(M.dot,y,16,0,7);g.fillStyle=K.vi;g.fill();g.lineWidth=3;g.strokeStyle=K.pn;g.stroke()}}
function judge(b){if(phase()!=='scale'||M.q>=4)return;const m=MOMENTS[M.q];M.dot=X.W/2;
 if(b!==m.b)return miss(m.b?'Here nobody has to change or hide anything. That is belonging: being accepted as you are.':'This person is changing or hiding part of themselves to stay in the group. That is fitting in, not belonging.');
 M.log.push(b);M.q++;X.sound.tick();if(M.q===4)return hit('Fitting in asks you to change. Belonging lets you be yourself.');note(`Placed. Moment ${M.q+1}: ${MOMENTS[M.q].s}`);pads();again()}
/* step 3: social comparison feed */
function drawFeed(g){const{W,H,col:K}=X,mood=.25+M.seen.size*.25;label(g,`Tap each post to see behind it. ${M.seen.size} of 3`,W/2,22,15,{w:800,mw:W-20});
 stack(3,42,H-80,96).forEach((b,i)=>{const o=M.seen.has(i);box(g,b,o?'Behind it: '+POSTS[i].r:POSTS[i].f,14,{w:o?800:700,bg:o?X.mix(K.pn,K.cy,.16):X.mix(K.pn,K.vi,.08),ln:o?K.cy:K.tx});M.hit.push({b,i})});
 const by=H-48;label(g,"Jo's mood",14,by-12,12,{al:'left',c:K.mu});g.fillStyle=X.mix(K.pn,K.tx,.08);g.fillRect(14,by,W-28,16);g.fillStyle=mood<.6?K.am:K.gr;g.fillRect(14,by,(W-28)*mood,16);g.strokeStyle=K.tx;g.lineWidth=1.5;g.strokeRect(14,by,W-28,16)}
function flip(i){if(phase()!=='feed'||M.seen.has(i))return;M.seen.add(i);X.sound.pop();if(M.seen.size===3)return hit('Feeds show highlights, edits and adverts. Comparing your everyday life to them is not a fair test.');note(`Behind it: ${POSTS[i].r}`);pads();again()}
/* step 4: timeline */
function drawTime(g){const{W,H,col:K}=X,a=AGES[M.at],x0=30,x1=W-30,y=H-40;M.line={x0,x1,y};label(g,`Jo at ${a.y}`,W/2,24,18,{w:900});
 const rows=[['Interests',a.i,K.am],['Groups',a.p,K.cy],['Values',a.v,K.gr]];stack(3,48,y-44,84).forEach((b,n)=>{const[t,s,cl]=rows[n];box(g,b,`${t}: ${s}`,14,{bg:X.mix(K.pn,cl,.16),ln:cl,w:800})});
 g.strokeStyle=K.tx;g.lineWidth=3;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 AGES.forEach((q,n)=>{const x=x0+n*(x1-x0)/2;g.beginPath();g.arc(x,y,n===M.at?14:9,0,7);g.fillStyle=M.went.has(n)?K.vi:K.pn;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();label(g,`${q.y}`,x,y-26,13,{w:900})})}
function goAge(n){if(phase()!=='time')return;M.at=n;M.went.add(n);X.sound.tick();if(M.went.size===3&&!M.ok){M.ok=1;return hit('Interests and groups changed a lot; core values stayed steady and grew. Identity develops; it is not fixed at 12.')}note(`Jo at ${AGES[n].y}: interests ${AGES[n].i}; groups ${AGES[n].p}; values ${AGES[n].v}.`);pads();again()}
function draw(A){const{ctx:g,W,H,col:K}=A,v=phase();g.fillStyle=A.mix(K.pn,K.cy,K.dark?.03:.05);g.fillRect(0,0,W,H);M.hit=[];
 if(v==='quiz'){box(g,{x:16,y:H*.14,w:W-32,h:H*.72},'You are many things at once, shaped by many influences, and still growing. Belonging means being accepted as you.',16,{w:800});return}
 ({web:drawWeb,roots:drawRoots,scale:drawScale,feed:drawFeed,time:drawTime})[v](g);A.fx.draw(g)}
const miss=s=>{X.sound.miss();note(s);again()},hit=s=>{X.sound.pop();note(s);pads();again();M.test()};
const burst=()=>{X.fx.add(10,i=>({x:X.W/2,y:X.H*.35,vx:Math.cos(i*.63)*130,vy:Math.sin(i*.63)*130,life:.55,r:3,col:X.col.vi}));X.kick()};
function pads(){if(!ctl)return;ctl.innerHTML='';const v=phase(),btn=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},ctl,t);b.onclick=f};
 if(v==='web'&&M.i<PARTS.length){btn('Inner ring: personal',()=>place(M.i,0),`Personal identity: ${PARTS[M.i].s}`);btn('Outer ring: groups',()=>place(M.i,1),`Social identity: ${PARTS[M.i].s}`)}
 if(v==='roots'&&M.j<4)SRC.forEach((s,i)=>btn(s,()=>root(i)));
 if(v==='scale'&&M.q<4){btn('Fitting in',()=>judge(0));btn('Belonging',()=>judge(1))}
 if(v==='feed')POSTS.forEach((p,i)=>{if(!M.seen.has(i))btn(`Look behind: ${p.f}`,()=>flip(i))});
 if(v==='time')AGES.forEach((a,n)=>btn(`Age ${a.y}`,()=>goAge(n)))}
let held=null;
function down(p){const v=phase();
 if(v==='web'){if(inside(p,M.chip)){held={x:p.x,y:p.y};M.hold={x:p.x,y:p.y};again();return true}const r=ring(p);if(r>=0&&M.i<PARTS.length){place(M.i,r);return true}return false}
 if(v==='scale'&&M.q<4&&Math.abs(p.y-M.track.y)<40){held={x:p.x,y:p.y};M.dot=Math.max(M.track.x0,Math.min(M.track.x1,p.x));again();return true}
 if(v==='time'&&Math.abs(p.y-M.line.y)<40){held={x:p.x,y:p.y};scrub(p.x);return true}
 if(v==='roots'){const i=(M.srcs||[]).findIndex(b=>inside(p,b));if(i>=0){root(i);return true}return false}
 if(v==='feed'){const h=M.hit.find(o=>inside(p,o.b));if(h){flip(h.i);return true}}return false}
function scrub(x){const L=M.line,n=Math.round(Math.max(0,Math.min(1,(x-L.x0)/(L.x1-L.x0)))*2);if(n!==M.at||!M.went.has(n))goAge(n)}
function move(p){if(!held)return;const v=phase();if(v==='web'){M.hold={x:p.x,y:p.y};again()}else if(v==='scale'){M.dot=Math.max(M.track.x0,Math.min(M.track.x1,p.x));again()}else if(v==='time')scrub(p.x)}
function up(p){if(!held)return;const v=phase();held=null;
 if(v==='web'){M.hold=null;const r=p?ring(p):-1;if(r>=0)return place(M.i,r);return again()}
 if(v==='scale'&&M.q<4){return judge(M.dot>=X.W/2?1:0)}}
const finish=(n,ok,msg)=>()=>{if(X.step===n&&ok()&&(!steps[n].predict||X.pred[n]!=null))X.done(msg+X.reveal(n))};
const seq=(list,ms)=>{const tk=++M.tk;list.forEach((f,j)=>setTimeout(()=>{if(tk===M.tk)f()},X.reduced()?j*30+30:(j+1)*ms))};
const reset=o=>{const tk=(M.tk||0)+1;for(const k in M)delete M[k];Object.assign(M,{tk,test:()=>{},hit:[]},o);held=null};
const steps=[
{h:'Many sides of you',p:'Identity is the answer to "who am I?" Some parts are about you alone. Others are groups you belong to. Put each part of Jo on a ring.',
 predict:{q:'Is a person\'s identity one thing or many?',opts:['Many parts at once','One main thing','Just their friend group'],ans:0},task:'Place all 6 parts of Jo',
 show:()=>{steps[0].go();seq(PARTS.map((P,k)=>()=>place(k,P.g)),550)},
 go:()=>{reset({i:0,placed:[]});note(`${PARTS[0].s}. Tap the inner ring for personal or the outer ring for groups.`);pads();M.test=finish(0,()=>M.i>=PARTS.length,'Personal and social identity together make up who Jo is.')}},
{h:'Where it comes from',p:'Nobody builds an identity alone. Tap the influence that shaped each part of Jo.',task:'Trace 4 parts to their roots',
 show:()=>{steps[1].go();seq(ROOTS.map(r=>()=>root(r.a)),800)},
 go:()=>{reset({j:0,tap:-1});note(`${ROOTS[0].s}. Which influence?`);pads();M.test=finish(1,()=>M.j>=4,'Family, friends, media and experience all shape identity.')}},
{h:'Fitting in or belonging?',p:'Fitting in and belonging sound alike, but they are not. Drag the dot to the side that fits each moment.',
 predict:{q:'Kai changes how he acts so a group will like him. Is that belonging?',opts:['No, that is fitting in','Yes, he is in the group','Yes, if they are popular'],ans:0},task:'Place all 4 moments',
 show:()=>{steps[2].go();seq(MOMENTS.map(m=>()=>judge(m.b)),800)},
 go:()=>{reset({q:0,log:[],dot:X.W/2});note(`Moment 1: ${MOMENTS[0].s} Drag the dot left for fitting in or right for belonging.`);pads();M.test=finish(2,()=>M.q>=4,'Belonging is being accepted as you are.')}},
{h:'Behind the post',p:'Jo scrolls and her mood drops. Tap each post to see what the picture leaves out.',
 predict:{q:'Why might Jo feel worse after scrolling?',opts:['She compares her normal day to other people\'s best bits','Her life really is worse','She is not trying hard enough'],ans:0},task:'Look behind all 3 posts',
 show:()=>{steps[3].go();seq([0,1,2].map(i=>()=>flip(i)),800)},
 go:()=>{reset({seen:new Set()});note('Three posts. Tap one to see what is behind it.');pads();M.test=finish(3,()=>M.seen.size===3,'Social comparison is unfair when one side is edited.')}},
{h:'Still growing',p:'Drag along the timeline to see Jo at 8, 12 and 16. Watch what changes and what stays.',
 predict:{q:'Jo\'s interests at 16 are not the ones she had at 8. What does that show?',opts:['Identity keeps developing as you grow','She was fake at 8','Her real self is the 8-year-old one'],ans:0},task:'Visit all 3 ages',
 show:()=>{steps[4].go();seq([()=>goAge(1),()=>goAge(2)],900)},
 go:()=>{reset({at:0,went:new Set([0])});note(`Jo at 8: interests ${AGES[0].i}. Drag along the line or tap an age.`);pads();M.test=finish(4,()=>M.went.size===3,'Trying new things is how identity develops.')}},
{h:'Challenge',p:'',go:()=>{reset({});pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.test()});
const BANK=[['Which is part of social identity?',[['Being in the school orchestra','ok'],['Being curious','trait'],['Loving maths puzzles','trait2']]],
 ['Leah stops wearing her headscarf at school so she will fit in. What is going on?',[['She is fitting in, not belonging','ok'],['She has found where she belongs','same'],['Nothing, identity does not matter','none']]],
 ['Which influence is the media?',[['An advert showing one "perfect" body type','ok'],['Your grandad teaching you to cook','fam'],['Your friends all liking the same band','pal']]],
 ['Ravi feels bad after seeing a friend\'s holiday photos. What is a helpful thought?',[['I am seeing one good moment, not their whole life','ok'],['My life is boring and always will be','fixed'],['I should post something better','race']]],
 ['At 14, Mo quits football to start coding club. What does that show?',[['Identity can change as you try new things','ok'],['He was never really sporty','fake'],['He has lost his identity','lost']]],
 ['Where do you most truly belong?',[['Where people accept you as you are','ok'],['Wherever the popular group is','pop'],['Anywhere you can copy others','copy']]]];
function why(t){let m='Identity has many parts, comes from many influences and keeps developing.';
 if(t==='trait'||t==='trait2')m='That is a personal trait or interest. Social identity is about the groups you belong to.';
 if(t==='same')m='Changing or hiding part of yourself to be accepted is fitting in. Belonging means you would not have to.';
 if(t==='none')m='Identity matters to wellbeing. Hiding a part of yourself can make you feel you do not belong.';
 if(t==='fam')m='A grandparent teaching you is a family influence. Media means adverts, TV, games and social media.';
 if(t==='pal')m='Sharing a band with friends is a friends (peer) influence. Media is content made to reach lots of people.';
 if(t==='fixed')m='That is unfair social comparison. Holiday photos are highlights, not someone\'s whole life.';
 if(t==='race')m='Trying to beat their post keeps the comparison going. Remember that you are seeing a highlight.';
 if(t==='fake'||t==='lost')m='Changing interests is normal in adolescence. Exploring is how identity develops.';
 if(t==='pop'||t==='copy')m='Copying others or chasing status is fitting in. Belonging is where you can be yourself.';
 return m}
function pose(){qk++;const[q,ops]=BANK[qk%BANK.length],sh=qk%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>mark(t)});note('Challenge: '+q);again()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;X.win()}else{row=0;X.sound.miss()}fb.innerHTML=(ok?'Yes! In a row: '+row+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=pose}
X=FK.shell(c,{steps,ratio:.62,tall:1.55,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset({});
  A.gest({down,move,up});pads()}});
X.start()})})();
