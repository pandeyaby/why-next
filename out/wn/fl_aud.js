/* Flagship – choosing form and tone for your audience (9–10): name the purpose of a writing task, pick the form that
   fits it, turn a tone dial until a message suits its reader, swap hard words so a younger reader can follow, and find
   the lines in a letter that break its form or tone. The Challenge targets the usual slips: purpose mixed up with
   topic, the wrong text type, chatty openings to officials, and thinking formal is always best. */
(()=>{const PUR=['inform','persuade','entertain','instruct'],DEF={inform:'Inform means giving facts.',persuade:'Persuade means getting a reader to agree or act.',entertain:'Entertain means making a reader enjoy it.',instruct:'Instruct means telling someone how to do something.'},
P0=[['Get the head teacher to agree to a bike rack.',1,'the head to say yes'],['Tell your cousin how to plant a sunflower seed.',3,'your cousin to follow steps'],['Make your friends laugh with a story about a lost sock.',2,'your friends to enjoy it'],['Tell parents what happened on the class trip.',0,'parents to know what happened']],
FORMS=['letter','report','instructions','review','story'],FWHY={letter:'A letter is to one reader: Dear… at the top, a sign-off at the end.',report:'A report gives facts under headings.',instructions:'Instructions are numbered steps that start with bossy verbs.',review:'A review gives an opinion, reasons and a rating.',story:'A story has characters, a setting and a plot.'},
P1=[['Ask the head for a bike rack',0],['All about our local birds, with headings and facts',1],['How to fold a paper plane',2],['Is the new film worth seeing?',3],['A dragon who is scared of the dark',4]],
TONE=['Hiya!! Can we nab the hall on Friday? Ta!','Hi! Can we use the hall on Friday? Thanks!','Hello. Please could we use the hall on Friday? Thank you.','Dear Ms Shah, Please may we use the hall on Friday? Thank you.','Dear Sir or Madam, I am writing to ask whether we may use the hall on Friday. Yours faithfully'],
TL=['very chatty','chatty','polite','formal','very formal'],RD=[['your best friend',0,1],['a teacher you know',2,3],['the town council',4,4]],
SIMP=[[['Precipitation','Rain'],['descends','falls'],['from'],['enormous','huge'],['cumulonimbus','storm'],['clouds.']],[['Mammals'],['nourish','feed'],['their'],['offspring','babies'],['with'],['milk.']]],
LET=[['Dear Mrs Patel,',0],['Hiya, it is me lol.',1,'tone','“Hiya” and “lol” are far too chatty for the head teacher.'],['Many of us cycle, but there is nowhere safe to leave our bikes.',0],['Once upon a time, a lonely bike lived by the gate.',1,'form','“Once upon a time” starts a story, not a letter asking for something.'],['A bike rack would keep bikes safe and clear the path.',0],['Step 1: get a spanner. Step 2: build it.',1,'form','Numbered steps are instructions. This letter persuades.'],['Please could we have one by the summer?',0],['Yours sincerely, Class 5',0]];
VIS.reg('flagaud',c=>{let A,ctl,chal,qi=-1,streak=0;
const S={};
const view=()=>['pur','form','tone','simp','letter','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.redraw();
const font=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
function word(g,s,x,y,n,wt,al){g.font=font(n,wt);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y)}
function tile(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=warn?3.5:1.5;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function lines(g,t,w,n,wt){g.font=font(n,wt);const L=[];let l='';t.split(' ').forEach(z=>{const q=l?l+' '+z:z;if(g.measureText(q).width>w&&l){L.push(l);l=z}else l=q});L.push(l);return L}
function wrap(g,t,x,y,w,n,wt,al){const L=lines(g,t,w,n,wt);L.forEach((l,i)=>word(g,l,x,y+(i-(L.length-1)/2)*px(n)*1.3,n,wt,al));return L.length}
/* small page outlines so each form looks like itself */
function page(g,f,x,y,s){const C=A.col,L=(a,b,w)=>{g.fillRect(x+a*s,y+b*s,w*s,s*.05)};g.fillStyle=C.pn;A.paint.rrect(x-s*.5,y-s*.62,s,s*1.24,4);g.fill();g.lineWidth=1.5;g.strokeStyle=C.tx;g.stroke();g.fillStyle=A.alpha(C.tx,.55);
 if(f==='letter'){L(.12,-.5,.3);L(.12,-.42,.3);L(-.4,-.25,.35);[-.12,.0,.12,.24].forEach(b=>L(-.4,b,.8));L(-.4,.42,.3)}
 if(f==='report'){g.fillRect(x-s*.4,y-s*.52,s*.8,s*.1);[[-.32],[.08]].forEach(([b])=>{g.fillRect(x-s*.4,y+b*s,s*.45,s*.07);L(-.4,b+.12,.8);L(-.4,b+.22,.7)})}
 if(f==='instructions'){[-.42,-.18,.06,.3].forEach((b,i)=>{g.beginPath();g.arc(x-s*.32,y+b*s+s*.03,s*.07,0,7);g.fill();L(-.18,b,.58)})}
 if(f==='review'){for(let i=0;i<5;i++){g.fillStyle=i<4?A.mix(C.pn,C.or,.85):A.alpha(C.tx,.2);g.fillRect(x+(-.42+i*.17)*s,y-s*.5,s*.13,s*.13)}g.fillStyle=A.alpha(C.tx,.55);[-.2,-.08,.04,.16,.28].forEach(b=>L(-.4,b,.8))}
 if(f==='story'){g.fillRect(x-s*.25,y-s*.52,s*.5,s*.08);[-.3,-.18,-.06].forEach(b=>L(-.4,b,.8));[.12,.24,.36].forEach(b=>L(-.4,b,.8))}}
const chipR=(i,n,y,h)=>{const w=(A.W-20-(n-1)*8)/n;return{x:10+i*(w+8),y,w,h}};
const formR=i=>{const row=i<3?0:1,n=row?2:3,j=row?i-3:i,w=Math.min((A.W-40)/3,A.W*.3),gap=(A.W-n*w)/(n+1);return{x:gap+j*(w+gap),y:A.H*(row?.68:.38),w,h:A.H*.28}};
const trackX=t=>A.W*.1+t*(A.W*.8/4),TY=()=>A.H*.62;
function simpLayout(g){const rs=[],w=A.W-30;let x=15,y=A.H*.36;g.font=font(16,800);SIMP[Math.min(S.round,1)].forEach((wd,i)=>{const t=S.sw[i]?wd[1]:wd[0],tw=g.measureText(t).width+px(18);if(x+tw>15+w){x=15;y+=px(46)}rs.push({x,y,w:tw,h:px(38),t});x+=tw+8});return rs}
function letLayout(g){const rs=[],w=A.W-30,n=12;let y=A.H*.1;LET.forEach((l,i)=>{const L=lines(g,l[0],w-16,n,600),h=L.length*px(n)*1.3+10;rs.push({x:15,y,w,h});y+=h+5});return rs}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){wrap(g,'Before you write, ask: who will read it, and why am I writing?',W/2,H*.35,W*.85,17,800);wrap(g,'Then pick the form, the tone and the words to fit.',W/2,H*.6,W*.85,15,700);return}
 if(v==='pur'){const k=Math.min(S.round,P0.length-1),b={x:10,y:H*.06,w:W-20,h:H*.3};tile(g,b,C.pn,1,false);word(g,'The writing task',W/2,b.y+px(16),12,700);wrap(g,S.round<P0.length?P0[k][0]:'4 tasks, 4 purposes.',W/2,b.y+b.h*.58,b.w-24,17,800);
  word(g,'What is its purpose?',W/2,H*.48,14,700);PUR.forEach((p,i)=>{const r=chipR(i,4,H*.56,H*.16),dn=S.got.includes(i);tile(g,r,dn?C.gr:C.cy,dn?.3:.12,S.oops===i);word(g,p,r.x+r.w/2,r.y+r.h/2,A.narrow?12:14,800)});
  S.got.forEach((i,j)=>word(g,`${j+1}. ${PUR[i]}`,10+j*(W-20)/4+(W-20)/8,H*.86,12,700))}
 if(v==='form'){const k=Math.min(S.round,P1.length-1),b={x:W*.12,y:H*.04,w:W*.76,h:H*.24},x=S.drag?S.dx-b.w/2:b.x,y=S.drag?S.dy-b.h/2:b.y;
  FORMS.forEach((f,i)=>{const r=formR(i),dn=S.got.includes(i);tile(g,r,dn?C.gr:C.vi,dn?.25:.08,S.oops===i);page(g,f,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w*.5,r.h*.55));word(g,f,r.x+r.w/2,r.y+r.h*.9,A.narrow?11:13,800)});
  tile(g,{x,y,w:b.w,h:b.h},C.or,C.dark?.3:.18,false);wrap(g,S.round<P1.length?P1[k][0]:'Every task has its form.',x+b.w/2,y+b.h/2,b.w-20,15,800)}
 if(v==='tone'){const k=Math.min(S.round,RD.length-1),b={x:10,y:H*.13,w:W-20,h:H*.3};word(g,S.round<RD.length?`Writing to ${RD[k][0]}`:'3 readers, 3 tones',W/2,H*.06,16,800);tile(g,b,C.pn,1,S.oops!=null);wrap(g,TONE[S.t],W/2,b.y+b.h/2,b.w-24,15,600);
  g.fillStyle=A.alpha(C.tx,.25);g.fillRect(trackX(0),TY()-3,W*.8,6);TL.forEach((l,i)=>{g.fillStyle=C.tx;g.fillRect(trackX(i)-1,TY()-12,2,24);if(i%2===0||!A.narrow)word(g,l,trackX(i),TY()+px(26),A.narrow?10:12,700)});
  const kx=S.drag?S.dx:trackX(S.t);g.fillStyle=A.mix(C.pn,C.cy,.6);g.beginPath();g.arc(kx,TY(),px(16),0,7);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke();
  word(g,'chatty',trackX(0),TY()-px(30),11,700);word(g,'formal',trackX(4),TY()-px(30),11,700);word(g,`Tone: ${TL[S.t]}`,W/2,H*.82,15,800)}
 if(v==='simp'){word(g,'Make it easy for a 6-year-old',W/2,H*.07,16,800);word(g,'Tap a hard word to swap it',W/2,H*.15,12,600);
  simpLayout(g).forEach((r,i)=>{const wd=SIMP[Math.min(S.round,1)][i],hard=wd.length>1&&!S.sw[i];tile(g,r,S.sw[i]?C.gr:hard?C.or:C.pn,S.sw[i]?.3:hard&&S.hint?.35:.12,S.oops===i);word(g,r.t,r.x+r.w/2,r.y+r.h/2,16,800)});
  const n=SIMP[Math.min(S.round,1)].filter(w=>w.length>1).length,d=S.sw.filter(Boolean).length,bw=W*.7;word(g,'Easy to read',W/2,H*.72,12,700);tile(g,{x:W*.15,y:H*.76,w:bw,h:px(16)},C.pn,1,false);
  g.fillStyle=A.mix(C.pn,C.gr,.7);g.fillRect(W*.15+2,H*.76+2,(bw-4)*(d/n),px(16)-4);word(g,S.round<2?`Sentence ${S.round+1} of 2`:'Both sentences are easy now',W/2,H*.9,13,700)}
 if(v==='letter'){word(g,'To the head teacher: asking for a bike rack',W/2,H*.05,A.narrow?12:14,800);letLayout(g).forEach((r,i)=>{const l=LET[i],f=S.found.includes(i);tile(g,r,f?C.rd:C.pn,f?.14:1,S.oops===i);wrap(g,l[0],r.x+8,r.y+r.h/2,r.w-16,12,600,'left');
   if(f){g.strokeStyle=C.rd;g.lineWidth=2;g.beginPath();g.moveTo(r.x+6,r.y+r.h/2);g.lineTo(r.x+r.w-6,r.y+r.h/2);g.stroke();g.fillStyle=C.pn;A.paint.rrect(r.x+r.w-px(48),r.y-6,px(44),px(16),4);g.fill();g.stroke();word(g,l[2],r.x+r.w-px(26),r.y+2,10,800)}})}
 A.fx.draw(g)}
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);R()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();R();S.want()};
const tick=t=>{S.oops=null;A.sound.tick();tell(t);pad();R()};
function pickPur(i){if(S.round>=P0.length)return;const[,ok,goal]=P0[S.round];if(i!==ok)return bad(`${DEF[PUR[i]]} Here you want ${goal}, so the purpose is to ${PUR[ok]}.`,i);
 S.got.push(i);S.round++;S.round<P0.length?tick(`Yes, ${PUR[i]}. Next task.`):good('Inform, persuade, entertain, instruct: the purpose is what you want the reader to do or feel.')}
function pickForm(i){if(S.round>=P1.length)return;const ok=P1[S.round][1];if(i!==ok)return bad(`${FWHY[FORMS[i]]} This task needs a ${FORMS[ok]}.`,i);
 S.got.push(i);S.round++;S.round<P1.length?tick(`Yes, a ${FORMS[i]}. ${FWHY[FORMS[i]]}`):good('Letter, report, instructions, review and story: each purpose has a form that fits.')}
function setT(t){S.t=Math.max(0,Math.min(4,t));S.oops=null;tell(`Tone: ${TL[S.t]}. “${TONE[S.t]}”`);pad();R()}
function send(){if(S.round>=RD.length)return;const[r,lo,hi]=RD[S.round];if(S.t<lo)return bad(`Too chatty for ${r}. Turn the dial towards formal.`,1);if(S.t>hi)return bad(`Too stiff for ${r}. Turn the dial towards chatty.`,1);
 S.round++;if(S.round<RD.length){A.sound.tick();S.oops=null;tell(`Good tone for ${r}. Now: ${RD[S.round][0]}.`);pad();return R()}good('Same message, three tones: chatty for a friend, polite for a teacher, very formal for the council.')}
function swap(i){if(S.round>=2)return;const wd=SIMP[S.round][i];if(wd.length<2)return bad(`“${wd[0]}” is fine for a 6-year-old. Find a longer, harder word.`,i);if(S.sw[i])return;S.sw[i]=1;
 const left=SIMP[S.round].filter((w,j)=>w.length>1&&!S.sw[j]).length;if(left){A.sound.tick();S.oops=null;tell(`“${wd[0]}” becomes “${wd[1]}”. ${left} more to go.`);pad();return R()}
 S.round++;if(S.round<2){S.sw=[];tick(`Easy now! Next sentence.`);return}good('“Rain falls from huge storm clouds.” “Mammals feed their babies with milk.” Same facts, easier words.')}
function spot(i){if(S.found.includes(i)||S.found.length>=3)return;const l=LET[i];if(!l[1])return bad(`That line fits a polite letter asking for something. Look for one that is too chatty or in the wrong form.`,i);
 S.found.push(i);S.found.length<3?tick(`Found one (${l[2]}). ${l[3]}`):good(`${l[3]} All 3 found: one tone slip and two form slips.`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='pur'&&S.round<P0.length)PUR.forEach((p,i)=>B(p,()=>pickPur(i),`Purpose: ${p}`));
 if(v==='form'&&S.round<P1.length)FORMS.forEach((f,i)=>B(f,()=>pickForm(i),`Form: ${f}`));
 if(v==='tone'&&S.round<RD.length){B('More chatty',()=>setT(S.t-1));B('More formal',()=>setT(S.t+1));B('Send it',send,`Send to ${RD[S.round][0]}`)}
 if(v==='simp'&&S.round<2)SIMP[S.round].forEach((w,i)=>{if(w.length>1&&!S.sw[i])B(w[0],()=>swap(i),`Swap ${w[0]}`)});
 if(v==='simp'&&S.round<2)B(S.hint?'Hide hard words':'Show hard words',()=>{S.hint=!S.hint;R();pad()});
 if(v==='letter'&&S.found.length<3)LET.forEach((l,i)=>{if(!S.found.includes(i))B(`Line ${i+1}`,()=>spot(i),`Line ${i+1}: ${l[0]}`)})}
function down(p){const v=view(),g=A.ctx;
 if(v==='pur'){PUR.forEach((_,i)=>{if(hit(p,chipR(i,4,A.H*.56,A.H*.16)))pickPur(i)});return false}
 if(v==='form'){if(S.round<P1.length&&hit(p,{x:A.W*.12,y:A.H*.04,w:A.W*.76,h:A.H*.24})){S.drag=1;S.dx=p.x;S.dy=p.y;R();return true}FORMS.forEach((_,i)=>{if(hit(p,formR(i)))pickForm(i)});return false}
 if(v==='tone'){if(S.round<RD.length&&Math.abs(p.y-TY())<px(30)){S.drag=1;S.dx=p.x;R();return true}return false}
 if(v==='simp'){simpLayout(g).forEach((r,i)=>{if(hit(p,r))swap(i)});return false}
 if(v==='letter'){letLayout(g).forEach((r,i)=>{if(hit(p,r))spot(i)});return false}return false}
function move(p){if(!S.drag)return;S.dx=view()==='tone'?Math.max(trackX(0),Math.min(trackX(4),p.x)):p.x;S.dy=p.y;R()}
function up(p){const v=view();if(!S.drag)return;S.drag=null;if(v==='tone')return setT(Math.round((Math.max(trackX(0),Math.min(trackX(4),p.x))-trackX(0))/(A.W*.2)));
 const i=FORMS.findIndex((_,i)=>hit(p,formR(i)));if(i<0){tell('Drop the task on a form.');return R()}pickForm(i)}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},round:0,oops:null,got:[],t:2,sw:[],found:[],drag:null,hint:false})};
const steps=[
{h:'Who is it for, and why?',p:'Every piece of writing has a purpose: to inform, persuade, entertain or instruct. Tap the purpose of each task.',task:'Name 4 purposes',
 show:()=>{steps[0].go();play(P0.map(([,i])=>()=>pickPur(i)),700)},
 go:()=>{reset();tell('Task 1: get the head teacher to agree to a bike rack. What is the purpose?');pad();S.want=check(0,()=>S.round>=P0.length,'The purpose is what you want the reader to do or feel.')}},
{h:'Pick the form',p:'The form is the kind of text. Drag each task onto the form that suits it, or tap a form.',predict:{q:'You want the head to agree to a bike rack. Which form?',opts:['A letter','A story','Instructions'],ans:0},task:'Match 5 tasks to forms',
 show:()=>{steps[1].go();play(P1.map(([,i])=>()=>pickForm(i)),600)},
 go:()=>{reset();tell('Task: ask the head for a bike rack. Which form?');pad();S.want=check(1,()=>S.round>=P1.length,'Purpose first, then the form that fits it.')}},
{h:'Tone dial',p:'Tone is how friendly or formal the writing sounds. Slide the dial until the message suits the reader, then send it.',predict:{q:'Writing to the town council, where should the dial be?',opts:['Very formal','Very chatty','It does not matter'],ans:0},task:'Set the tone for 3 readers',
 show:()=>{steps[2].go();play([()=>setT(0),send,()=>setT(3),send,()=>setT(4),send],450)},
 go:()=>{reset();tell('Writing to your best friend. Set the tone, then send.');pad();S.want=check(2,()=>S.round>=RD.length,'Same message, different tone for each reader.')}},
{h:'For a younger reader',p:'Your reader is 6. Keep the facts, but swap hard words for easy ones. Tap a hard word.',task:'Make 2 sentences easy',
 show:()=>{steps[3].go();play([0,1,3,4].map(i=>()=>swap(i)).concat([1,3].map(i=>()=>swap(i))),500)},
 go:()=>{reset();tell('Precipitation descends from enormous cumulonimbus clouds. Make it easy for a 6-year-old.');pad();S.want=check(3,()=>S.round>=2,'Same facts, simpler words, for a younger audience.')}},
{h:'Spot what does not fit',p:'This letter asks the head for a bike rack. Three lines have the wrong tone or the wrong form. Tap them.',task:'Find the 3 lines that do not fit',
 show:()=>{steps[4].go();play([1,3,5].map(i=>()=>spot(i)),800)},
 go:()=>{reset();tell('A letter to the head teacher. Find 3 lines that do not fit.');pad();S.want=check(4,()=>S.found.length>=3,'A chatty line and two lines from other forms.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You want the council to fix the park swings. What is your purpose?',[['To persuade','ok'],['To inform','inform'],['To entertain','ent']]],
 ['Which form tells someone how to bake a cake?',[['Instructions','ok'],['A review','review'],['A story','story']]],
 ['You are writing to the town council. Which opening fits?',[['Dear Sir or Madam,','ok'],['Hiya!!','chatty'],['Once upon a time,','tale']]],
 ['Your reader is 6. Which sentence is better?',[['Rain falls from big clouds.','ok'],['Precipitation descends from cumulonimbus clouds.','hard'],['Rain falls lol.','lol']]],
 ['What should a film review do?',[['Give your opinion and reasons','ok'],['Only list facts','facts'],['Give numbered steps','steps']]],
 ['Is the most formal tone always the best?',[['No, it depends on the reader','ok'],['Yes, always','always'],['No, chatty is always best','never']]]];
function hintFor(t){let m='Ask two things: who will read it, and what do I want them to do?';
 if(t==='inform')m='Informing just gives facts. You want the council to act, so you persuade.';
 if(t==='ent')m='Entertaining is for enjoyment. You want something fixed, so you persuade.';
 if(t==='review')m='A review gives an opinion. A recipe needs steps, so it is instructions.';
 if(t==='story')m='A story has a plot. Baking needs numbered steps: instructions.';
 if(t==='chatty')m='“Hiya” is for friends. A council letter opens “Dear Sir or Madam”.';
 if(t==='tale')m='“Once upon a time” opens a story, not a letter.';
 if(t==='hard')m='Those words are too hard for a 6-year-old. Keep the facts, use easy words.';
 if(t==='lol')m='Easy words, yes, but “lol” is text speak and drops the facts.';
 if(t==='facts')m='Facts help, but a review must give an opinion and reasons.';
 if(t==='steps')m='Steps are for instructions. A review says what you thought and why.';
 if(t==='always')m='Very formal to a best friend sounds odd. Match the tone to the reader.';
 if(t==='never')m='Chatty to the council sounds rude. Match the tone to the reader.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
