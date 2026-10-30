/* Flagship – similarities and differences (ages 5–7): tap Same or Different for Mia and Sam; drag facts into a Venn
   diagram (Mia only, both, Sam only); build three different families in the house; pick a kind, curious reply to a
   difference; find what four celebrations all share. Big targets, short words, every canvas action has a button. */
(()=>{
const PAIR=[['Mia is 6. Sam is 6.',0,'They are both 6, so that is the same.'],
 ['Mia has curly hair. Sam has straight hair.',1,'Curly and straight are not the same. That is a difference.'],
 ['Mia likes to paint. Sam likes to paint.',0,'They both like to paint. That is the same.'],
 ['At home Mia speaks Polish. Sam speaks English.',1,'Polish and English are two different languages.'],
 ['Mia is sad when she falls. Sam is sad when he falls.',0,'They both feel sad. Feelings are often the same.'],
 ['Mia has a cat. Sam has a dog.',1,'A cat and a dog are not the same pet.']];
const VENN=[['Has a cat',0],['Likes to paint',1],['Has a dog',2],['Speaks English',1],['Speaks Polish',0],['Is 6',1]];
const ZONE=['Mia only','Both','Sam only'];
const ROLES=['Mum','Mum','Dad','Gran','Grandad','Big sister'];
const FAM=[{who:'Kit',t:'Kit lives with her two mums.',need:{Mum:2}},{who:'Ravi',t:'Ravi lives with his gran.',need:{Gran:1}},
 {who:'Leo',t:'Leo lives with his dad and his big sister.',need:{Dad:1,'Big sister':1}}];
const MEET=[{t:'Jun eats his lunch with chopsticks.',ok:'Cool! Can you show me how?',bad:[['That is a weird way to eat.','odd'],['Use a fork like me.','copy']]},
 {t:'Zofia says "Cześć!" It means hello in Polish.',ok:'Cześć! Can you teach me more words?',bad:[['Talk normal.','normal'],['I am not playing with you.','leave']]},
 {t:'Amira wears a headscarf called a hijab.',ok:'Hi Amira! Do you want to play tag?',bad:[['Take it off to play.','off'],['You look funny.','odd']]}];
const PARTY=['Diwali','Eid','Christmas','Lunar New Year'];
const THINGS=[['Special food',1,''],['Family and friends together',1,''],['A tree with lights',0,'Only Christmas has a tree.'],
 ['Red lanterns',0,'Red lanterns are for Lunar New Year.'],['Clay lamps (diyas)',0,'Clay lamps are for Diwali.'],['Looking for the new moon',0,'The new moon tells people when Eid starts.']];
VIS.reg('flagalike',c=>{let A,pad,quiz,qi=-1,seq=0;c.fig.classList.add('young');
const blank=()=>({want:()=>{},k:0,won:0,flash:-1,sorted:[],drag:null,home:[],fi:0,mi:0,picks:[],meetPick:-1}),S=blank();
const view=()=>['pair','venn','home','meet','party','quiz'][A.step];
const pt=n=>Math.round(n*(A.narrow?1:1.12)),RM=()=>A.reduced();
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function word(g,t,x,y,n,col,wt){g.font=`${wt||800} ${pt(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-20)}
function lines(g,t,x,y,w,n){g.font=`700 ${pt(n)}px system-ui,sans-serif`;const out=[];let cur='';t.split(' ').forEach(wd=>{const z=cur?cur+' '+wd:wd;if(g.measureText(z).width>w&&cur){out.push(cur);cur=wd}else cur=z});out.push(cur);
 const h=pt(n)*1.3;out.forEach((s,i)=>word(g,s,x,y+(i-(out.length-1)/2)*h,n,null,700))}
function box(g,x,y,w,h,col,a,hot){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,16);g.fill();g.strokeStyle=hot?A.col.rd:col;g.lineWidth=hot?5:3;A.paint.rrect(x,y,w,h,16);g.stroke()}
function face(g,x,y,r,col,curly,name){if(curly){g.fillStyle=A.mix(col,'#000000',.35);for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*.15);g.beginPath();g.arc(x+Math.cos(a)*r,y+Math.sin(a)*r,r*.32,0,7);g.fill()}}
 else{g.fillStyle=A.mix(col,'#000000',.35);g.beginPath();g.arc(x,y-r*.1,r*1.05,Math.PI,0);g.fill()}
 A.paint.ball(x,y,r,col);g.fillStyle='#fff';[-.35,.35].forEach(d=>{g.beginPath();g.arc(x+d*r,y-r*.12,r*.13,0,7);g.fill()});g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.arc(x,y+r*.12,r*.36,.25,Math.PI-.25);g.stroke();
 if(name)word(g,name,x,y+r+pt(13),13)}
const R0=()=>Math.min(A.W/12,36);
function drawPair(g){const{W,H}=A,C=A.col;face(g,W*.25,H*.14,R0(),C.pk,1,'Mia');face(g,W*.75,H*.14,R0(),C.ac,0,'Sam');
 const f=PAIR[S.k];if(f){box(g,10,H*.3,W-20,H*.22,C.am,.14);lines(g,f[0],W/2,H*.41,W-40,15)}
 const bw=(W-30)/2;['Same','Different'].forEach((t,i)=>{const x=10+i*(bw+10);box(g,x,H*.6,bw,H*.3,i?C.vi:C.gr,.16,S.flash===i);word(g,t,x+bw/2,H*.75,18)});
 word(g,`${Math.min(S.k,PAIR.length)} of ${PAIR.length}`,W/2,H*.96,12,C.mu,600)}
const ring=()=>{const{W,H}=A,r=Math.min(W*.3,H*.3);return{r,y:H*.62,x0:W/2-r*.5,x1:W/2+r*.5}};
const zoneAt=x=>x<A.W*.42?0:x>A.W*.58?2:1;
function drawVenn(g){const{W,H}=A,C=A.col,o=ring();[[o.x0,C.pk],[o.x1,C.ac]].forEach(([x,col])=>{g.fillStyle=A.alpha(col,.13);g.beginPath();g.arc(x,o.y,o.r,0,7);g.fill();g.strokeStyle=col;g.lineWidth=3;g.stroke()});
 word(g,'Mia',o.x0-o.r*.45,o.y-o.r-pt(10),14);word(g,'Sam',o.x1+o.r*.45,o.y-o.r-pt(10),14);word(g,'↑ Both ↑',W/2,o.y+o.r+pt(12),12,C.tx,700);
 const cnt=[0,0,0];S.sorted.forEach(j=>{const z=VENN[j][1],x=z===0?o.x0-o.r*.42:z===2?o.x1+o.r*.42:W/2;word(g,VENN[j][0],x,o.y-o.r*.4+cnt[z]*pt(20),11,C.tx,700);cnt[z]++});
 if(S.flash>=0){const x=S.flash===0?o.x0-o.r*.4:S.flash===2?o.x1+o.r*.4:W/2;g.strokeStyle=C.rd;g.lineWidth=4;g.beginPath();g.arc(x,o.y,o.r*.35,0,7);g.stroke()}
 const it=VENN[S.k];if(it){const d=S.drag,cw=Math.min(W*.6,220),ch=pt(38),x=d?d.x-cw/2:W/2-cw/2,y=d?d.y-ch/2:H*.06;box(g,x,y,cw,ch,C.am,.25);word(g,it[0],x+cw/2,y+ch/2,15)}
 if(!S.drag&&it)word(g,'Drag it into a circle',W/2,H*.06+pt(52),12,C.mu,600)}
const tileRect=i=>{const{W,H}=A,cw=(W-40)/3,ch=H*.16;return{x:10+(i%3)*(cw+10),y:H*.6+Math.floor(i/3)*(ch+10),w:cw,h:ch}};
function drawHome(g){const{W,H}=A,C=A.col,f=FAM[S.fi]||FAM[2];g.fillStyle=A.alpha(C.am,.15);g.strokeStyle=C.am;g.lineWidth=4;
 g.beginPath();g.moveTo(W*.12,H*.24);g.lineTo(W*.5,H*.06);g.lineTo(W*.88,H*.24);g.lineTo(W*.88,H*.52);g.lineTo(W*.12,H*.52);g.closePath();g.fill();g.stroke();
 word(g,f.t,W/2,H*.56,13);const inside=[f.who].concat(S.home.map(i=>ROLES[i]));
 inside.forEach((n,j)=>{const x=W/2+(j-(inside.length-1)/2)*Math.min(W*.2,80);face(g,x,H*.34,R0()*.72,j?C.vi:C.gr,j%2,null);word(g,n,x,H*.47,11)});
 ROLES.forEach((n,i)=>{const r=tileRect(i),on=S.home.includes(i);box(g,r.x,r.y,r.w,r.h,on?C.gr:C.mu,on?.3:.1,S.flash===i);word(g,n,r.x+r.w/2,r.y+r.h/2,13)})}
function drawMeet(g){const{W,H}=A,C=A.col,m=MEET[Math.min(S.mi,2)];face(g,W*.18,H*.14,R0()*1.05,[C.gr,C.pk,C.vi][Math.min(S.mi,2)],S.mi===1,['Jun','Zofia','Amira'][Math.min(S.mi,2)]);
 box(g,W*.34,H*.04,W*.62,H*.24,C.am,.12);lines(g,m.t,W*.65,H*.16,W*.56,13);
 meetOpts().forEach(([t],i)=>{const y=H*(.4+i*.19);box(g,10,y,W-20,H*.16,S.meetPick===i?C.gr:C.ac,.12,S.flash===i);lines(g,t,W/2,y+H*.08,W-40,13)})}
function meetOpts(){const m=MEET[Math.min(S.mi,2)],all=[[m.ok,'ok']].concat(m.bad),r=S.mi%3;return all.slice(r).concat(all.slice(0,r))}
const thingRect=i=>{const{W,H}=A,cw=(W-30)/2,ch=H*.13;return{x:10+(i%2)*(cw+10),y:H*.42+Math.floor(i/2)*(ch+8),w:cw,h:ch}};
function drawParty(g){const{W,H}=A,C=A.col,cols=[C.am,C.gr,C.rd,C.vi];PARTY.forEach((p,i)=>{const cw=(W-50)/4,x=10+i*(cw+10);box(g,x,H*.05,cw,H*.2,cols[i],.14);lines(g,p,x+cw/2,H*.15,cw-8,11)});
 word(g,'What do all 4 have?',W/2,H*.33,14);THINGS.forEach(([t],i)=>{const r=thingRect(i),on=S.picks.includes(i);box(g,r.x,r.y,r.w,r.h,on?C.gr:C.ac,on?.3:.1,S.flash===i);lines(g,t,r.x+r.w/2,r.y+r.h/2,r.w-12,12)})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){face(g,W*.38,H*.45,R0()*1.3,C.pk,1,'Mia');face(g,W*.62,H*.45,R0()*1.3,C.ac,0,'Sam');return}
 if(S.won>=goal()){lines(g,endLine(),W/2,H/2,W-40,15);return A.fx.draw(g)}
 ({pair:drawPair,venn:drawVenn,home:drawHome,meet:drawMeet,party:drawParty})[v](g);A.fx.draw(g)}
const goal=()=>({pair:1,venn:1,home:3,meet:3,party:1}[view()]||9);
function endLine(){return{pair:'Friends can be the same in some ways and different in others.',venn:'Mia and Sam share lots, and they still have differences.',home:'Families are made in lots of ways. They are all families.',meet:'Ask and find out. Differences are interesting.',party:'Different days, the same good things: food and people we love.'}[view()]}
const oops=(t,i)=>{A.sound.miss();S.flash=i==null?-1:i;tell(t);setTimeout(()=>{S.flash=-1;A.redraw()},RM()?10:850);A.redraw()};
function gotIt(t){S.won++;A.sound.pop();tell(t);keys();A.redraw();S.want()}
function judgePair(b){if(view()!=='pair'||S.won>=1)return;const f=PAIR[S.k];if(!f)return;if(b==null)b=f[1];
 if(b!==f[1])return oops(f[2],b);S.k++;A.sound.tick();if(S.k>=PAIR.length)return gotIt('All 6 done. Some things are the same and some are different.');tell(f[2]+' Next one.');A.redraw()}
function place(z){if(view()!=='venn'||S.won>=1)return;const it=VENN[S.k];if(!it)return;if(z==null)z=it[1];
 if(z!==it[1]){const m=it[1]===1?`${it[0]}: Mia and Sam both do. It goes in the middle.`:`${it[0]}: only ${it[1]?'Sam':'Mia'}. It goes in ${it[1]?'Sam':'Mia'}'s side.`;return oops(m,z)}
 S.sorted.push(S.k);S.k++;A.sound.tick();if(S.k>=VENN.length)return gotIt('Done! The middle shows what they share.');tell(`Yes, ${ZONE[z]}. Next: ${VENN[S.k][0]}.`);A.redraw()}
function toggle(i){if(view()!=='home'||S.won>=3)return;const j=S.home.indexOf(i);if(j>=0)S.home.splice(j,1);else S.home.push(i);A.sound.tick();tell(`${ROLES[i]} ${j>=0?'out of':'in'} the house.`);keys();A.redraw()}
function homeDone(){if(view()!=='home'||S.won>=3)return;const f=FAM[S.fi],have={};S.home.forEach(i=>have[ROLES[i]]=(have[ROLES[i]]||0)+1);
 for(const r in f.need)if((have[r]||0)<f.need[r])return oops(`${f.t} Add ${f.need[r]-(have[r]||0)>1?'more':'a'} ${r}.`);
 for(const r in have)if(have[r]>(f.need[r]||0))return oops(`${f.t} Take ${r} out.`);
 const msg=`${f.who}'s home is a family.`;S.fi++;S.home=[];if(S.fi<3){S.won++;A.sound.pop();tell(msg+' Next home.');keys();A.redraw()}else gotIt(msg)}
function buildFor(fi){const f=FAM[fi],out=[];for(const r in f.need){let n=f.need[r];ROLES.forEach((x,i)=>{if(x===r&&n>0){out.push(i);n--}})}return out}
function answer(i){if(view()!=='meet'||S.won>=3)return;const O=meetOpts();if(i==null)i=O.findIndex(o=>o[1]==='ok');S.meetPick=i;const tag=O[i][1];
 if(tag!=='ok')return oops({odd:'Different is not weird. It is just a different way.',copy:'There is more than one good way. Ask to learn his way.',normal:'Polish is normal for Zofia. Ask her to teach you a word.',leave:'Leaving her out hurts. A new word is a fun thing to learn.',off:'Amira can play in her hijab. Ask her to play.'}[tag],i);
 S.mi++;S.meetPick=-1;S.won++;A.sound.pop();tell(S.won<3?'Kind and curious! Next one.':'Kind and curious every time.');keys();if(S.won>=3)S.want();A.redraw()}
function pickThing(i){if(view()!=='party'||S.won>=1)return;if(i==null)i=THINGS.findIndex((t,j)=>t[1]&&!S.picks.includes(j));const t=THINGS[i];
 if(!t[1])return oops(t[2]+' It is not in all 4.',i);if(S.picks.includes(i))return;S.picks.push(i);A.sound.tick();
 if(S.picks.length>=2)return gotIt('Special food, and family and friends together: all 4 have them.');tell(`Yes! All 4 have ${t[0].toLowerCase()}. Find one more.`);A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const v=view(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=goal())return;
 if(v==='pair'){K('Same',()=>judgePair(0));K('Different',()=>judgePair(1))}
 if(v==='venn')ZONE.forEach((z,i)=>K(z,()=>place(i),`Put it in ${z}`));
 if(v==='home'){ROLES.forEach((n,i)=>K((S.home.includes(i)?'− ':'+ ')+n,()=>toggle(i),`${S.home.includes(i)?'Take out':'Put in'} ${n}`));K('Done ✓',homeDone,'This family is done')}
 if(v==='meet')meetOpts().forEach(([t],i)=>K(t,()=>answer(i)));
 if(v==='party')THINGS.forEach(([t],i)=>K(t,()=>pickThing(i)))}
function down(p){const v=view(),{W,H}=A;if(S.won>=goal())return false;
 if(v==='pair'&&p.y>H*.58)judgePair(p.x>W/2?1:0);
 if(v==='venn'){if(p.y<H*.2){S.drag={x:p.x,y:p.y};A.redraw();return true}if(p.y>H*.3)place(zoneAt(p.x))}
 if(v==='home'){const i=ROLES.findIndex((n,j)=>{const r=tileRect(j);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(i>=0)toggle(i);else if(p.y<H*.52)homeDone()}
 if(v==='meet'&&p.y>H*.4){const i=Math.floor((p.y-H*.4)/(H*.19));if(i>=0&&i<3)answer(i)}
 if(v==='party'){const i=THINGS.findIndex((t,j)=>{const r=thingRect(j);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(i>=0)pickThing(i)}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d){A.redraw();return}if(p.y>A.H*.3)place(zoneAt(p.x));else A.redraw()}
const watch=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(fns,gap){const k=++seq;fns.forEach((fn,j)=>setTimeout(()=>{if(k===seq)fn()},RM()?j*40+30:(j+1)*(gap||260)))}
const reset=()=>{seq++;Object.assign(S,blank())};
const steps=[
{h:'Same or different?',p:'Mia and Sam are best friends. Read each card. Is it the same, or different? Tap a box.',
 predict:{q:'Mia and Sam are best friends. Are they the same in every way?',opts:['Yes, the same in every way','No, some things are different'],ans:1},task:'Sort all 6 cards',
 show:()=>{steps[0].go();chain(PAIR.map(()=>()=>judgePair()))},go:()=>{reset();tell('Same or different?');keys();S.want=watch(0,()=>S.won>=1,'Best friends share lots, and they are still different.')}},
{h:'The two circles',p:'This is a Venn diagram. Mia is one circle and Sam is the other. Things they both have go in the middle, where the circles cross.',
 predict:{q:'Mia speaks Polish at home and English at school. Sam speaks English. Where does "Speaks English" go?',opts:['Only in Sam’s circle','In the middle: both'],ans:1},task:'Put all 6 cards in the right place',
 show:()=>{steps[1].go();chain(VENN.map(()=>()=>place()))},go:()=>{reset();tell('Drag the card into a circle.');keys();S.want=watch(1,()=>S.won>=1,'You can share some things and be different in others.')}},
{h:'All kinds of families',p:'Read who lives in the home. Tap people to put them in the house. Then tap Done.',
 predict:{q:'Kit lives with her two mums. Is that a family?',opts:['No, not a real family','Yes, it is a family'],ans:1},task:'Build all 3 families',
 show:()=>{steps[2].go();const acts=[];[0,1,2].forEach(fi=>{buildFor(fi).forEach(i=>acts.push(()=>toggle(i)));acts.push(homeDone)});chain(acts,240)},
 go:()=>{reset();tell(FAM[0].t+' Build it.');keys();S.want=watch(2,()=>S.won>=3,'Two mums, a gran, a dad and a sister: all of them are families.')}},
{h:'Ask and find out',p:'A friend does something in a different way. What is a kind thing to say? Tap it.',
 predict:{q:'Jun eats with chopsticks. Is that the wrong way to eat?',opts:['Yes, he should use a fork','No, it is just a different way'],ans:1},task:'Choose a kind reply 3 times',
 show:()=>{steps[3].go();chain([0,1,2].map(()=>()=>answer()))},go:()=>{reset();tell(MEET[0].t);keys();S.want=watch(3,()=>S.won>=3,'Asking to learn is kind, and you learn something new.')}},
{h:'Party time',p:'Here are 4 special days. People do different things on each one. Find the 2 things that all 4 have.',task:'Find the 2 things all 4 share',
 show:()=>{steps[4].go();chain([0,1].map(()=>()=>pickThing()))},go:()=>{reset();tell('What do all 4 special days have?');keys();S.want=watch(4,()=>S.won>=1,'The days are different, and the good things are the same.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Ben has a wheelchair. Tom does not. What is the same about them?',[['They both like to play','ok'],['Nothing is the same','none'],['They are the same in every way','all']]],
 ['Lily lives with her grandad. Is that a family?',[['Yes, it is a family','ok'],['No, a family needs a mum','mum'],['Only if there is a dad','mum']]],
 ['Ana says "Hola!" It means hello in Spanish. What do you say?',[['Hola! What else can you say?','ok'],['Say it in English!','normal'],['That is a funny word','odd']]],
 ['Mia and Sam are both 6. In a Venn diagram, where does "Is 6" go?',[['In the middle','ok'],['Only in Mia’s circle','side'],['Outside both circles','out']]],
 ['Raj has Diwali. Ella has Christmas. What do both days have?',[['Special food with family','ok'],['A tree with lights','tree'],['Nothing the same','none']]]];
function why(t){let m='Look for what is the same and what is different.';
 if(t==='none')m='Look again. People who look different still share lots, like liking to play.';
 if(t==='all')m='No two people are the same in every way. Look for the differences too.';
 if(t==='mum')m='Families come in many kinds. A grandad and a child are a family.';
 if(t==='normal')m='Spanish is normal for Ana. Ask her to teach you more.';
 if(t==='odd')m='Different is not funny or weird. It is interesting.';
 if(t==='side')m='Both of them are 6, so it goes where the circles cross.';
 if(t==='out')m='Outside is for things neither has. Both are 6, so it goes in the middle.';
 if(t==='tree')m='Only Christmas has a tree. Diwali has clay lamps. Both have special food.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
let run2=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` ${run2} in a row.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
