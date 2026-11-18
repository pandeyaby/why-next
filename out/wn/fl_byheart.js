/* Flagship – learning songs and rhymes by heart (ages 3–4; Development Matters: remember and sing entire songs,
   Reception: learn rhymes, poems and songs). Say it again, rhyme finishes the line, hide the words, actions, one line at a time, sing it again tomorrow. */
(()=>{
const TW=['Twinkle, twinkle, little star,','How I wonder what you are!','Up above the world so high,','Like a diamond in the sky.'];
const RHY=[['Hickory, dickory, dock,','The mouse ran up the …',['Clock','Shoe','Bed'],'Clock','dock'],
 ['Humpty Dumpty sat on a wall,','Humpty Dumpty had a great …',['Cake','Fall','Bed'],'Fall','wall'],
 ['The cow jumped over the moon,','The dish ran away with the …',['Cup','Fork','Spoon'],'Spoon','moon']];
const HIDE=[9,4,8,3,6,1,7,2,5,0],WD=(TW[0]+' '+TW[1]).replace(/[,!]/g,'').split(' ');
const INCY=[['Incy Wincy spider climbed up the water spout.','up'],['Down came the rain and washed the spider out.','rain'],
 ['Out came the sun and dried up all the rain.','sun'],['And Incy Wincy spider climbed up the spout again.','up']];
const ACT=[['up','Climb fingers up','Spider'],['rain','Wiggle fingers down','Cloud'],['sun','Arms make a big sun','Sun']];
const DAY=['Today','Tomorrow','Next day'],FADE=[.5,.25,.1];
VIS.reg('flagbyheart',c=>{let A,ctl,chal,qi=-1,streak=0,g;c.fig.classList.add('young');const S={};
const P=()=>g.beginPath();
const view=()=>['again','rhyme','hide','act','line','sleep','chal'][A.step];
const note=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const tellAll=t=>{note(t);pads();A.redraw()};const px=n=>Math.round(n*(A.narrow?1.05:1.2));
function txt(s,x,y,n,o){o=o||{};g.font=`${o.w||800} ${px(n)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.mw||A.W-16)}
const hit=(p,r)=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-6&&p.y<r.y+r.h+6;
function card(r,fill,lw,dash){A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=fill;g.fill();if(dash)g.setLineDash([7,5]);g.lineWidth=lw||2.5;g.strokeStyle=A.col.tx;g.stroke();g.setLineDash([])}
function starPath(x,y,r){P();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;g.lineTo(x+q*Math.cos(a),y+q*Math.sin(a))}g.closePath()}
/* little pictures in a box of size s centred on x,y */
function pic(k,x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineWidth=2.5/s;g.strokeStyle=A.col.tx;g.lineJoin='round';
 const f=c=>{g.fillStyle=c;g.fill();g.stroke()};
 if(k==='Clock'){P();g.arc(0,0,.36,0,7);f('#f4f1e8');g.strokeStyle='#333';P();g.moveTo(0,0);g.lineTo(0,-.24);g.moveTo(0,0);g.lineTo(.16,.06);g.stroke()}
 if(k==='Shoe'){P();g.moveTo(-.38,.15);g.lineTo(-.38,-.15);g.lineTo(-.1,-.15);g.lineTo(.05,0);g.lineTo(.36,.04);g.lineTo(.38,.15);g.closePath();f('#a0522d')}
 if(k==='Bed'){P();g.rect(-.38,-.04,.76,.18);f('#5b7fd1');P();g.rect(-.38,-.24,.1,.44);f('#8a5a2b');P();g.ellipse(-.16,-.1,.1,.06,0,0,7);f('#fff')}
 if(k==='Fall'){P();g.rect(-.38,.12,.76,.24);f('#b5543c');P();g.ellipse(.06,-.1,.15,.2,.5,0,7);f('#fff7e0');P();g.moveTo(.01,-.1);g.lineTo(.07,-.05);g.lineTo(.03,0);g.stroke();
  g.lineWidth=1.5/s;P();g.moveTo(-.2,-.3);g.lineTo(-.2,-.12);g.moveTo(-.28,-.24);g.lineTo(-.28,-.06);g.stroke()}
 if(k==='Cake'){P();g.rect(-.3,-.06,.6,.32);f('#f2a7c3');P();g.rect(-.03,-.3,.06,.22);f('#5b7fd1');g.fillStyle='#f4a200';P();g.arc(0,-.36,.05,0,7);g.fill()}
 if(k==='Cup'){P();g.moveTo(-.24,-.2);g.lineTo(.18,-.2);g.lineTo(.12,.24);g.lineTo(-.18,.24);g.closePath();f('#2f9b47');P();g.arc(.22,0,.1,-1.4,1.4);g.stroke()}
 if(k==='Fork'){P();g.rect(-.04,-.02,.08,.4);f('#9aa3ad');[-.12,-.04,.04,.12].forEach(t=>{P();g.rect(t-.02,-.36,.04,.32);f('#9aa3ad')})}
 if(k==='Spoon'){P();g.ellipse(0,-.2,.14,.18,0,0,7);f('#9aa3ad');P();g.rect(-.04,-.02,.08,.4);f('#9aa3ad')}
 if(k==='Spider'){g.lineWidth=2/s;for(let i=0;i<4;i++){const t=-.15+i*.1;P();g.moveTo(0,t);g.lineTo(-.34,t-.1+i*.07);g.moveTo(0,t);g.lineTo(.34,t-.1+i*.07);g.stroke()}
  P();g.arc(0,0,.16,0,7);f('#333');g.fillStyle='#fff';[-.06,.06].forEach(t=>{P();g.arc(t,-.04,.04,0,7);g.fill()})}
 if(k==='Cloud'){P();g.arc(-.14,-.08,.16,0,7);g.arc(.1,-.12,.2,0,7);f('#c7d3df');g.strokeStyle='#1d5fc4';g.lineWidth=4/s;[-.18,0,.18].forEach(t=>{P();g.moveTo(t,.18);g.lineTo(t-.04,.32);g.stroke()})}
 if(k==='Sun'){g.strokeStyle='#c27b00';for(let i=0;i<8;i++){const a=i*Math.PI/4;P();g.moveTo(.24*Math.cos(a),.24*Math.sin(a));g.lineTo(.38*Math.cos(a),.38*Math.sin(a));g.stroke()}
  g.strokeStyle=A.col.tx;P();g.arc(0,0,.18,0,7);f('#f4c20d')}
 g.restore()}
/* where things sit */
const tile=(i,n)=>{n=n||3;const w=Math.min((A.W-24)/n-10,150),h=Math.min(w,A.H*.36),x0=(A.W-(n*(w+10)-10))/2;return{x:x0+i*(w+10),y:A.H*.58,w,h}};
const chip=i=>{const row=i<5?0:1,k=i%5,w=(A.W-24)/5-6;return{x:12+k*(w+6),y:A.H*(.3+row*.24),w,h:A.H*.17}};
const starR=()=>({x:A.W/2-A.H*.22,y:A.H*.2,w:A.H*.44,h:A.H*.44});
function draw(A){const{W,H,col:K}=A,v=view();g=A.ctx;g.fillStyle=A.mix(K.pn,K.vi||K.ac,K.dark?.05:.06);g.fillRect(0,0,W,H);
 if(v==='chal'){starPath(W/2,H*.3,H*.12);g.fillStyle='#f4c20d';g.fill();g.lineWidth=2.5;g.strokeStyle=K.tx;g.stroke();
  txt('Say it again and again.',W/2,H*.56,15);txt('One line at a time.',W/2,H*.7,15);txt('Sing it again tomorrow.',W/2,H*.84,15);return}
 if(v==='again'){txt(TW[0],W/2,H*.1,15);const r=starR(),cx=r.x+r.w/2,cy=r.y+r.h/2,rad=r.w/2;
  starPath(cx,cy,rad);g.fillStyle=K.pn;g.fill();g.save();starPath(cx,cy,rad);g.clip();g.fillStyle='#f4c20d';g.fillRect(cx-rad,cy+rad-2*rad*S.glow,2*rad,2*rad*S.glow);g.restore();
  starPath(cx,cy,rad);g.lineWidth=3;g.strokeStyle=K.tx;g.stroke();
  for(let i=0;i<3;i++){const x=W/2+(i-1)*44,y=H*.8;P();g.arc(x,y,15,0,7);g.fillStyle=i<S.said?'#2f9b47':K.pn;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();txt(String(i+1),x,y,12,{c:i<S.said?'#fff':K.tx})}
  txt(S.msg,W/2,H*.93,13,{w:700})}
 if(v==='rhyme'){if(S.r<3){const[a,b,ops]=RHY[S.r];txt(a,W/2,H*.12,15);txt(b,W/2,H*.26,15);txt(`Rhyme ${S.r+1} of 3`,W/2,H*.4,12,{c:K.mu,w:700});
   ops.forEach((k,i)=>{const t=tile(i);card(t,S.bad===i?A.alpha('#d62828',.15):K.pn,S.bad===i?4:2.5);pic(k,t.x+t.w/2,t.y+t.h*.42,t.h*.68);txt(k,t.x+t.w/2,t.y+t.h-13,12)})}
  else{txt('All three rhymes done!',W/2,H*.3,16);RHY.forEach((x,i)=>{const t=tile(i);pic(x[3],t.x+t.w/2,t.y+t.h*.4,t.h*.66);txt(`${x[4]} – ${x[3].toLowerCase()}`,t.x+t.w/2,t.y+t.h-10,12)})}}
 if(v==='hide'){txt(S.h<10?'Say the line. Fill the gaps.':'You said it from memory!',W/2,H*.12,15);
  WD.forEach((w,i)=>{const r=chip(i),gone=HIDE.slice(0,S.h).includes(i);card(r,gone?A.alpha(K.cy,.12):K.pn,2,gone);if(!gone)txt(w,r.x+r.w/2,r.y+r.h/2,11,{mw:r.w-6})});
  txt(`Hidden: ${S.h} of 10`,W/2,H*.86,13,{w:700})}
 if(v==='act'){const sx=W*.2,top=H*.12,bot=H*.86;g.fillStyle='#9aa3ad';g.fillRect(sx-12,top,24,bot-top);g.lineWidth=2;g.strokeStyle=K.tx;g.strokeRect(sx-12,top,24,bot-top);
  if(S.rain){g.fillStyle='#1d5fc4';for(let i=0;i<6;i++)g.fillRect(sx-6+(i%2)*6,top+(i*37+S.t*90)%(bot-top-12),4,10)}
  pic('Spider',sx,bot-(bot-top-30)*S.sy-18,56);if(S.sun)pic('Sun',W*.42,H*.18,70);if(S.rain)pic('Cloud',W*.42,H*.14,74);
  const line=S.l<4?INCY[S.l][0]:'You did all the actions!';txt(`Line ${Math.min(S.l+1,4)} of 4`,W*.68,H*.26,12,{c:K.mu,w:700});
  const words=line.split(' '),half=Math.ceil(words.length/2);[0,1].forEach(j=>txt((j?words.slice(half):words.slice(0,half)).join(' '),W*.68,H*(.34+j*.08),13,{mw:W*.6}));
  ACT.forEach(([k,lab,ic],i)=>{const t=actR(i);card(t,S.bad===i?A.alpha('#d62828',.15):K.pn,S.bad===i?4:2.5);pic(ic,t.x+t.w*.22,t.y+t.h/2,t.h*.7);txt(lab,t.x+t.w*.62,t.y+t.h/2,11,{w:700,mw:t.w*.7})})}
 if(v==='line'){TW.forEach((ln,i)=>{const y=H*(.14+i*.17),on=i<S.k,now=S.beat===i;
   starPath(W*.1,y,13);g.fillStyle=on?'#f4c20d':K.pn;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();
   if(now){g.fillStyle=A.alpha(K.ac,.18);g.fillRect(W*.17,y-16,W*.8,32)}txt(on?ln:'…',W*.2,y,14,{al:'left',c:on?K.tx:K.mu,w:on?800:600})});
  txt(S.msg,W/2,H*.9,13,{w:700})}
 if(v==='sleep'){const cw=(W-40)/3;DAY.forEach((d,i)=>{const x=20+i*cw,bx=x+cw*.25,bw=cw*.5,by=H*.18,bh=H*.52,lv=S.lv[i];
   txt(d,x+cw/2,H*.1,13);g.lineWidth=2;g.strokeStyle=K.tx;g.strokeRect(bx,by,bw,bh);
   if(lv!=null){g.fillStyle=lv>.95?'#2f9b47':'#f4a200';g.fillRect(bx,by+bh*(1-lv),bw,bh*lv);txt(`${Math.round(lv*100)}%`,x+cw/2,by+bh+16,12,{w:700})}
   const mo=S.mo[i];if(mo!=null){const y=by+bh*(1-mo);g.fillStyle='#c25400';g.fillRect(bx-6,y-3,bw+12,6);txt(`Woke up: ${Math.round(mo*100)}%`,x+cw/2,by+bh+34,11,{w:700,mw:cw-4})}
   if(i===S.d){g.lineWidth=4;g.strokeStyle=K.ac;g.strokeRect(bx-5,by-5,bw+10,bh+10)}
   if(i<S.d)txt('Zzz',x+cw,H*.34,13,{c:K.mu,w:700})});
  txt(S.msg,W/2,H*.93,13,{w:700})}
 A.fx.draw(g)}
const actR=i=>{const h=Math.min(A.H*.13,56),w=Math.min(A.W*.6,260);return{x:A.W*.36,y:A.H*.5+i*(h+8),w,h}};
const ohno=(t,i)=>{A.sound.miss();S.bad=i;tellAll(t)},good=t=>{A.sound.pop();S.bad=-1;tellAll(t);S.want()};
/* actions */
function sayIt(){if(S.said>=3)return;S.said++;A.tween(S,{glow:S.said/3},500,'out');A.sound.tick();
 S.msg=['','Once. Say it again!','Twice. It is getting easier.','Three times. You know it now!'][S.said];
 const t=['','Once. The words are still new. Say it again!','Twice. Did it feel easier? Once more!','Three times! Now you can say it without help.'][S.said];S.said===3?good(t):tellAll(t)}
function choose(i){if(S.r>=3)return;const[a,b,ops,ans,end]=RHY[S.r];
 if(ops[i]!==ans)return ohno(`${ops[i]} does not sound like ${end}. Listen to the end: ${end}… which one sounds the same?`,i);
 S.r++;good(`${ans} rhymes with ${end}! The rhyme helps you remember the word.`+(S.r<3?' Next rhyme.':''))}
function hide(){if(S.h>=10)return;S.h+=2;A.sound.tick();S.h<10?tellAll(`${S.h} words hidden. Say the whole line. Your memory fills the gaps.`):good('All ten words are hidden, and you can still say it. It is in your memory now!')}
function act(i){if(S.l>=4)return;const want=INCY[S.l][1],k=ACT[i][0];if(k!==want)return ohno(`Listen to the words: ${INCY[S.l][0]} Which action matches?`,i);
 S.bad=-1;S.rain=k==='rain';S.sun=k==='sun';const to=k==='up'?1:0;A.tween(S,{sy:to},700,'out');if(S.rain)A.tween(S,{t:1},900);
 S.l++;A.sound.pop();if(S.l<4)tellAll(`${ACT[i][1]}! Doing it helps you remember the line. Next line.`);else good('Every line has an action. The actions help the words come back.')}
function addLine(){if(S.k>=4)return;if(S.k>0&&!S.sung){A.sound.miss();S.msg='Sing from the start first';return tellAll('Sing from the start first, so the new line joins on to the old ones.')}
 S.k++;S.sung=0;A.sound.tick();S.msg='New line!';tellAll(`New line: ${TW[S.k-1]} Now sing from the start.`)}
function singAll(fast){if(!S.k||S.beat!=null)return;const k=S.tok;let i=0;const go=()=>{if(k!==S.tok)return;if(i<S.k){S.beat=i++;A.redraw();setTimeout(go,A.reduced()?10:fast?110:350)}else{S.beat=null;S.sung=1;
  if(S.k===4){S.msg='All four lines!';good('You sang all four lines from the start. One line at a time works!')}else{S.msg=`${S.k} lines`;A.sound.pop();tellAll(`You sang ${S.k} line${S.k>1?'s':''} from the start. Add the next line.`)}}};go()}
function sing(){if(S.sang[S.d])return;S.sang[S.d]=1;S.lv[S.d]=1;S.msg=`Sang it ${S.sang.filter(Boolean).length} time${S.d?'s':''}`;
 S.d===2?good('Three days of singing. Now it sticks, and it fades much less.'):(A.sound.pop(),tellAll(S.d?'Back to full! It faded less this time. Now go to sleep.':'You know it all today. Now go to sleep.'))}
function sleep(){if(S.d>=2)return;if(!S.sang[S.d]){A.sound.miss();S.msg='Sing it first';return tellAll('Sing it today first. Each day you sing it, it sticks better.')}
 S.lv[S.d+1]=S.mo[S.d+1]=S.lv[S.d]-FADE[S.d];S.d++;A.sound.tick();S.msg='Good morning!';tellAll(`Good morning! You still know ${Math.round(S.lv[S.d]*100)}% of it. Some faded in the night. Sing it again!`)}
function pads(){if(!ctl)return;ctl.innerHTML='';const v=view(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=fn};
 if(v==='again'&&S.said<3)b('Say it together',sayIt);
 if(v==='rhyme'&&S.r<3)RHY[S.r][2].forEach((k,i)=>b(k,()=>choose(i)));
 if(v==='hide'&&S.h<10)b('Hide two words',hide);
 if(v==='act'&&S.l<4)ACT.forEach((x,i)=>b(x[1],()=>act(i)));
 if(v==='line'&&!(S.k===4&&S.sung)){if(S.k<4)b('Learn the next line',addLine);if(S.k)b('Sing from the start',()=>singAll())}
 if(v==='sleep'&&!(S.d===2&&S.sang[2])){if(!S.sang[S.d])b('Sing it',sing);if(S.d<2)b('Go to sleep',sleep)}}
function down(p){const v=view();
 if(v==='again'&&hit(p,starR()))sayIt();
 if(v==='rhyme')[0,1,2].forEach(i=>{if(hit(p,tile(i)))choose(i)});
 if(v==='hide'&&p.y>A.H*.25&&p.y<A.H*.8)hide();
 if(v==='act')ACT.forEach((x,i)=>{if(hit(p,actR(i)))act(i)});
 if(v==='line'&&p.y<A.H*.8)S.k&&!S.sung?singAll():addLine();
 if(v==='sleep'&&p.y<A.H*.85)S.sang[S.d]?sleep():sing();return false}
const doneIf=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*60+60:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;for(const k in S)delete S[k];Object.assign(S,{tok:t,want:()=>{},said:0,glow:0,r:0,bad:-1,h:0,l:0,sy:0,t:0,rain:0,sun:0,k:0,sung:0,beat:null,d:0,lv:[0,null,null],mo:[],sang:[0,0,0],msg:''})};
const steps=[
{h:'Say it again',p:'Say the line together three times. Each time the star fills up, just like your memory.',task:'Say it three times',
 show:()=>{steps[0].go();later([sayIt,sayIt,sayIt],500)},
 go:()=>{reset();S.msg='Tap the star';tellAll('Twinkle, twinkle, little star. Say it with me, then say it again.');S.want=doneIf(0,()=>S.said===3,'Saying it again and again puts it in your memory.')}},
{h:'Rhymes help',p:'The end of a rhyme sounds like the line before. Listen, then tap the word that fits.',predict:{q:'Hickory, dickory, dock. The mouse ran up the … what?',opts:['Clock','Shoe','Bed'],ans:0},task:'Finish all three rhymes',
 show:()=>{steps[1].go();later(RHY.map(x=>()=>choose(x[2].indexOf(x[3]))),600)},
 go:()=>{reset();tellAll('Listen to the rhyme. Which word comes at the end?');S.want=doneIf(1,()=>S.r===3,'Dock, clock. Wall, fall. Moon, spoon. Rhymes help the words come back.')}},
{h:'Hide the words',p:'A grown-up hides two words at a time. You say the whole line, gaps and all.',predict:{q:'We hide the words, two at a time. Can you still say the line?',opts:['Yes, my memory fills the gaps','No, I need to see every word','Only the first word'],ans:0},task:'Hide all ten words',
 show:()=>{steps[2].go();later([hide,hide,hide,hide,hide],450)},
 go:()=>{reset();tellAll('Here is the start of Twinkle, Twinkle. Hide two words, then say it all.');S.want=doneIf(2,()=>S.h===10,'When the words are gone, your memory does the work.')}},
{h:'Do the actions',p:'Incy Wincy Spider has an action for each line. Tap the action that matches the words.',task:'Do an action for every line',
 show:()=>{steps[3].go();later(INCY.map(x=>()=>act(ACT.findIndex(a=>a[0]===x[1]))),700)},
 go:()=>{reset();tellAll('Incy Wincy spider climbed up the water spout. Which action?');S.want=doneIf(3,()=>S.l===4,'Actions and words together are easier to remember.')}},
{h:'One line at a time',p:'Learn one line. Sing from the start. Then add the next line.',predict:{q:'A song has four lines. What is the best way to learn it?',opts:['One line at a time','All four at once, one time','Only the last line'],ans:0},task:'Learn all four lines',
 show:()=>{steps[4].go();later([0,0,0,0].flatMap(()=>[addLine,()=>singAll(1)]),560)},
 go:()=>{reset();S.msg='Tap Learn the next line';tellAll('Twinkle, Twinkle has four lines. Learn the first one.');S.want=doneIf(4,()=>S.k===4&&S.sung,'Small bits, joined on from the start, make the whole song.')}},
{h:'Sing it tomorrow',p:'A night of sleep makes some of a song fade. Singing it again the next day makes it stick.',predict:{q:'You learn a song today. Tomorrow, how much will you know?',opts:['Some of it, so sing it again','All of it, for ever','None of it, it is all gone'],ans:0},task:'Sing it on all three days',
 show:()=>{steps[5].go();later([sing,sleep,sing,sleep,sing],600)},
 go:()=>{reset();S.msg='Sing it today';tellAll('Today is the first day with a new song. Sing it, then go to sleep.');S.want=doneIf(5,()=>S.sang[2],'Sing it today, tomorrow and the next day. Then it stays.')}},
{h:'Challenge',p:'',go:()=>{reset();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You want to learn a new song. What helps?',[['Sing it lots of times','ok'],['Hear it only once','once'],['Never sing it','never']]],
 ['Humpty Dumpty sat on a wall. Humpty Dumpty had a great …',[['Fall','ok'],['Cake','cake'],['Sock','sock']]],
 ['A song is too long to learn. What can you do?',[['Learn one line at a time','ok'],['Learn it all at once','all'],['Give up','give']]],
 ['Which helps you remember Incy Wincy Spider?',[['Doing the actions','ok'],['Sitting very still','still'],['Covering your ears','ears']]],
 ['You learned a song today. What should you do tomorrow?',[['Sing it again','ok'],['Nothing, I know it','know'],['Learn a new one instead','new']]]];
function why(t){let m='Say it again, a bit at a time, and sing it again tomorrow.';
 if(t==='once')m=`Once is not enough. Say it again and again, and it sticks.`;
 if(t==='never')m=`Singing it is how it gets into your memory.`;
 if(t==='cake')m=`Cake does not sound like wall. Wall, fall: they rhyme.`;
 if(t==='sock')m=`Sock does not sound like wall. Listen to the end of the line before.`;
 if(t==='all')m=`All at once is too much. Learn one line, then add the next.`;
 if(t==='give')m=`Do not give up. Learn one small line, then add another.`;
 if(t==='still')m=`Moving helps. The actions help the words come back.`;
 if(t==='ears')m=`You need to hear the song. Listen and do the actions.`;
 if(t==='know')m=`Some of it fades in the night. Sing it again tomorrow to keep it.`;
 if(t==='new')m=`Sing the old one again first, so it stays.`;
 return m}
function askQ(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});note('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(yes?'Yes! In a row: '+streak+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=askQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move:()=>{},up:()=>{}});pads()}});
A.start()})})();
