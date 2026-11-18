/* Flagship: communicating with light and sound (ages 6-7; NGSS 1-PS4-4 with K-2-ETS1 design and test). Walk a friend
   out of earshot, tighten a string phone, test and fix it, share a torch code, pick light or sound.
   Distinct from flagmedium (sound through materials) and flagvib (what vibrates). */
(()=>{
VIS.reg('flagsignal',c=>{let A,ctl,ask,qk=-1,tick=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',OKG='#047857',BAD='#b91c1c',ANA='#7c3aed',BEN='#c2410c',CUP='#0ea5e9',STR='#78350f';
const CODE=[[1,'Yes'],[2,'No'],[3,'Come here']];
const ASKS=[3,2,1];
const FAULTS=[{n:'floppy string',t:'The string was floppy. Pull it tight.'},{n:'string on the fence',t:'The string was rubbing on the fence. Move it off.'},{n:'hand on the string',t:'A hand was squeezing the string. Let go.'}];
const SPOTS=[['Ben is round the corner of the house',1,'Sound spreads round corners. Light goes straight, so the wall blocks it.'],
 ['It is dark and Ben is far across a big field',0,'A torch shines far in the dark, much further than a shout.'],
 ['The playground is very noisy',0,'Noise covers a voice. Ben can still see a flash.'],
 ['Ben is asleep with his eyes shut',1,'Shut eyes see no light. A bell can wake him.'],
 ['Ben is behind a closed door',1,'A knock goes through a door. Light cannot.'],
 ['Ben is far away, looking at your window',0,'He can see a torch in your window from far off.']];
const which=()=>['far','string','fix','torch','pick','chal'][A.step];
const bnd=(v,a,b)=>v<a?a:v>b?b:v,TT='The string is tight now. Talk into your cup.';
function chip(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?14:16);g.font=`800 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+18;
 while(w>A.W-8&&f>10){f--;g.font=`800 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+18}const h=f+13,l=bnd(x-w/2,4,A.W-w-4);
 g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();g.lineWidth=o.good?3:o.bad?3:1.5;g.strokeStyle=o.good?OKG:o.bad?BAD:'#64748b';g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function sky(night){const g=A.ctx;g.fillStyle=night?'#1e293b':A.mix(A.col.pn,'#ecfeff',A.col.dark?.1:.6);g.fillRect(0,0,A.W,A.H);
 g.fillStyle=night?'#334155':A.mix(A.col.pn,'#dcfce7',A.col.dark?.15:.7);g.fillRect(0,A.H*.8,A.W,A.H*.2)}
/* a child standing on baseline y */
function kid(x,y,h,col,name,face){const g=A.ctx,r=h*.16;g.lineCap='round';g.strokeStyle='#d4a373';g.lineWidth=Math.max(3,h*.07);
 g.beginPath();g.moveTo(x-h*.06,y-h*.4);g.lineTo(x-h*.09,y);g.moveTo(x+h*.06,y-h*.4);g.lineTo(x+h*.09,y);g.stroke();
 g.fillStyle=col;A.paint.rrect(x-h*.13,y-h*.72,h*.26,h*.36,h*.06);g.fill();
 g.fillStyle='#d4a373';g.beginPath();g.arc(x,y-h*.72-r,r,0,7);g.fill();g.fillStyle=INK;
 g.beginPath();g.arc(x-r*.35+(face||0)*r*.2,y-h*.72-r,Math.max(1.5,r*.12),0,7);g.arc(x+r*.35+(face||0)*r*.2,y-h*.72-r,Math.max(1.5,r*.12),0,7);g.fill();
 if(name)chip(name,x,y+14,{f:11})}
function cup(x,y,s,flip){const g=A.ctx;g.fillStyle=CUP;g.beginPath();const d=flip?-1:1;g.moveTo(x,y-s*.5);g.lineTo(x+d*s,y-s*.3);g.lineTo(x+d*s,y+s*.3);g.lineTo(x,y+s*.5);g.closePath();g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
/* 0: too far to hear */
function benX(d){return A.W*.18+d/10*A.W*.74}
function drawFar(){sky();const F=Z.far,base=A.H*.8,h=A.H*.4,bx=benX(F.d),g=A.ctx;kid(A.W*.1,base,h,ANA,'you');kid(bx,base,h,BEN,'Ben',-1);
 if(F.wave>0){const reach=Math.min(bx-A.W*.14,F.wave*A.W),lvl=hear(F.d);g.strokeStyle=lvl===2?OKG:lvl===1?'#ca8a04':BAD;
  for(let i=0;i<4;i++){const r=reach-i*22;if(r<10)continue;g.globalAlpha=Math.max(.12,(1-r/(A.W*.85)))*(1-i*.2);g.lineWidth=3;g.beginPath();g.arc(A.W*.14,base-h*.85,r,-.5,.5);g.stroke()}g.globalAlpha=1}
 for(let s=1;s<=10;s++){const x=benX(s);g.fillStyle=s<=2?OKG:s<=5?'#ca8a04':BAD;g.beginPath();g.arc(x,base+34,s===F.d?8:5,0,7);g.fill()}
 chip(`Ben is ${F.d} big steps away`,A.W/2,A.H*.08,{good:F.lost});if(F.msg)chip(F.msg,bx,base-h*1.25,{f:12,good:hear(F.d)>0,bad:hear(F.d)===0})}
function hear(d){return d<=2?2:d<=5?1:0}
function stepBen(k){const F=Z.far;F.d=bnd(F.d+k,1,10);F.msg='';A.sound.tick();tell(`Ben is ${F.d} big steps away. Say hello to test.`)}
function shout(){const F=Z.far;F.wave=0;F.msg='';A.sound.whoosh();A.tween(F,{wave:1},700,'out',()=>{const l=hear(F.d);F.msg=['…?','hello','HELLO!'][l];
 if(l===0)F.lost=1;tell(l===2?`Ben is close. He hears HELLO loud and clear.`:l===1?`Ben is ${F.d} steps away. Your voice is quieter now, but he can just hear it.`:`Ben is ${F.d} steps away. Your voice got too quiet on the way. Ben hears nothing. You need a better way.`)})}
/* 1: build a string telephone */
function drawString(){sky();const S=Z.str,g=A.ctx,base=A.H*.8,h=A.H*.38,ax=A.W*.12,bx=A.W*.86,cy=base-h*.62;kid(ax,base,h,ANA,'you');kid(bx,base,h,BEN,'Ben',-1);
 cup(ax+A.W*.04,cy,A.W*.03);cup(bx-A.W*.04,cy,A.W*.03,1);const x0=ax+A.W*.07,x1=bx-A.W*.07,sag=S.slack*A.H*.32;
 g.strokeStyle=STR;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,cy);g.quadraticCurveTo((x0+x1)/2,cy+sag*2,x1,cy);g.stroke();
 if(S.wave>0){const stop=S.slack>.2?.35:1,u=Math.min(S.wave,stop);for(let i=0;i<5;i++){const t=u-i*.04;if(t<0)continue;const x=x0+(x1-x0)*t,y=(1-t)*(1-t)*cy+2*(1-t)*t*(cy+sag*2)+t*t*cy;g.fillStyle=A.alpha(OKG,1-i*.18);g.beginPath();g.arc(x,y,6-i,0,7);g.fill()}}
 chip(S.slack>.2?'The string is floppy':'The string is tight',A.W/2,A.H*.08,{good:S.slack<=.2,bad:S.slack>.2});
 chip('drag Ben to pull',bx,A.H*.2,{f:10});if(S.msg)chip(S.msg,A.W/2,A.H*.92,{f:12,good:S.ok})}
function setSlack(v){const S=Z.str;S.slack=bnd(v,0,1);S.msg='';S.ok=0;A.redraw()}
function talk(){const S=Z.str;S.wave=0;S.msg='';A.sound.pop();A.tween(S,{wave:1},900,'io',()=>{if(S.slack>.2){S.msg='Ben hears nothing';tell('A floppy string does not pass on the shake. Ben hears nothing. Try it tight.')}
 else{S.msg='Ben hears: hello!';S.ok=1;tell('Your voice shook the cup. The tight string carried the shake to Ben’s cup, and he heard you.')}})}
/* 2: test and fix */
function drawFix(){sky();const X=Z.fix,g=A.ctx,base=A.H*.8,h=A.H*.38,ax=A.W*.1,bx=A.W*.88,cy=base-h*.62,x0=ax+A.W*.07,x1=bx-A.W*.07;kid(ax,base,h,ANA,'you');kid(bx,base,h,BEN,'Ben',-1);
 cup(ax+A.W*.04,cy,A.W*.03);cup(bx-A.W*.04,cy,A.W*.03,1);const sag=X.ok[0]?0:A.H*.12,fx=x0+(x1-x0)*.45,hx=x0+(x1-x0)*.75;
 g.fillStyle='#a16207';g.fillRect(fx-7,cy-(X.ok[1]?A.H*.02:-A.H*.02),14,base-cy+(X.ok[1]?A.H*.02:-A.H*.02));
 g.strokeStyle=STR;g.lineWidth=2.5;g.beginPath();g.moveTo(x0,cy);g.quadraticCurveTo((x0+x1)/2,cy+sag*2,x1,cy);g.stroke();
 if(!X.ok[2]){g.fillStyle='#d4a373';g.beginPath();g.arc(hx,cy+sag*.5,A.W*.025,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}
 const marks=[[(x0+x1)/2,cy+sag+28],[fx,cy-34],[hx,cy+sag*.5+34]];FAULTS.forEach((f,i)=>{if(!X.ok[i]&&X.seen[i])chip((i+1)+'. '+f.n,marks[i][0],marks[i][1],{f:11,bad:1})});
 if(X.wave>0){const stops=[.12,.45,.75],first=X.ok.findIndex(v=>!v),lim=first<0?1:stops[first],u=Math.min(X.wave,lim),x=x0+(x1-x0)*u;g.fillStyle=OKG;g.beginPath();g.arc(x,cy+(first===0?sag*.4:0),7,0,7);g.fill()}
 chip(X.pass?'Test passed: Ben hears you':`Faults fixed: ${X.ok.filter(Boolean).length} of 3`,A.W/2,A.H*.08,{good:X.pass})}
function test(){const X=Z.fix;X.wave=0;A.sound.pop();A.tween(X,{wave:1},520,'io',()=>{const first=X.ok.findIndex(v=>!v);
 if(first<0){X.pass=1;tell('Test passed. Ben hears every word. You tested, fixed what was wrong and tested again.');return}
 X.seen[first]=1;tell(`Test failed. The shake stopped at the ${FAULTS[first].n}. Tap it to fix it, then test again.`)})}
function fixIt(i){const X=Z.fix;if(X.ok[i])return tell(`The ${FAULTS[i].n} is already fixed.`);if(!X.seen[i]){A.sound.miss();return tell('Test it first to see where the message stops.')}
 X.ok[i]=1;X.wave=0;A.sound.pop();tell(FAULTS[i].t.replace(/\.[^.]*$/,'.')+' Fixed. Test again.')}
function fixNext(){const X=Z.fix,i=X.ok.findIndex((v,j)=>!v&&X.seen[j]);if(i>=0)fixIt(i);else test()}
/* 3: torch code */
function drawTorch(){sky(1);const T=Z.torch,g=A.ctx,base=A.H*.8,h=A.H*.34;kid(A.W*.12,base,h,ANA,'you');kid(A.W*.84,base,h,BEN,'Ben',-1);
 const tx=A.W*.2,ty=base-h*.6;g.fillStyle='#64748b';A.paint.rrect(tx-A.W*.02,ty-8,A.W*.05,16,4);g.fill();
 if(T.on){g.fillStyle='rgba(253,224,71,.55)';g.beginPath();g.moveTo(tx+A.W*.03,ty-8);g.lineTo(A.W*.8,ty-A.H*.1);g.lineTo(A.W*.8,ty+A.H*.1);g.lineTo(tx+A.W*.03,ty+8);g.closePath();g.fill()}
 for(let i=0;i<T.n;i++){g.fillStyle='#fde047';g.beginPath();g.arc(A.W*.4+i*26,A.H*.3,9,0,7);g.fill()}
 if(T.code)CODE.forEach(([n,w],i)=>chip(`${'●'.repeat(n)} ${w}`,A.W*(.2+i*.3),A.H*.18,{f:11}));else chip('Ben has no code card',A.W*.5,A.H*.18,{f:11,bad:1});
 chip(T.k<ASKS.length?`Send: ${CODE[ASKS[T.k]-1][1]}`:'All 3 messages read',A.W/2,A.H*.07,{good:T.k>=ASKS.length,bg:'#ffffff'});
 if(T.msg)chip(T.msg,A.W*.72,A.H*.45,{f:11,good:T.good,bad:!T.good})}
function flash(){const T=Z.torch;if(T.n>=3)return tell('3 flashes is the most. Tap Send.');T.n++;T.on=1;T.msg='';A.sound.tick();A.redraw();const t0=tick;setTimeout(()=>{if(t0===tick){T.on=0;A.redraw()}},260);tell(`${T.n} flash${T.n>1?'es':''}. Tap Send when you are done.`)}
function send(){const T=Z.torch;if(!T.n)return tell('Tap the torch to flash it first.');const n=T.n;T.n=0;
 if(!T.code){T.msg='What does that mean?';T.good=0;A.sound.miss();return tell(`Ben saw ${n} flash${n>1?'es':''}, but he does not know what they mean. You both need the same code.`)}
 const want=ASKS[T.k],read=CODE[n-1][1];if(n!==want){T.msg='Ben reads: '+read;T.good=0;A.sound.miss();return tell(`You flashed ${n} time${n>1?'s':''}, so Ben read "${read}". Count the flashes for "${CODE[want-1][1]}".`)}
 T.k++;T.msg='Ben reads: '+read;T.good=1;A.sound.pop();tell(`Ben counted ${n} flash${n>1?'es':''} and read "${read}".`+(T.k>=ASKS.length?' A code works because you both agreed it first.':''))}
function share(){Z.torch.code=1;Z.torch.msg='';A.sound.pop();tell('Now Ben has the same code card: 1 flash is Yes, 2 flashes is No, 3 flashes is Come here.')}
function sendN(n){const T=Z.torch;T.n=0;for(let i=0;i<n;i++)flash();send()}
/* 4: light or sound? */
function binsP(){return[{t:'Light',v:0,x:A.W*.05,y:A.H*.56,w:A.W*.42,h:A.H*.34},{t:'Sound',v:1,x:A.W*.53,y:A.H*.56,w:A.W*.42,h:A.H*.34}]}
function drawPick(){sky();const P=Z.pick,g=A.ctx;if(P.k<SPOTS.length)chip(SPOTS[P.k][0],A.W/2,A.H*.3,{f:A.narrow?13:17});
 binsP().forEach(b=>{g.fillStyle=A.alpha(b.v?'#2563eb':'#ca8a04',.16);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=b.v?'#2563eb':'#a16207';g.lineWidth=2.5;g.stroke();
  const cx=b.x+b.w/2,cy=b.y+b.h*.42;if(b.v){g.fillStyle='#2563eb';g.beginPath();g.arc(cx,cy,b.h*.16,Math.PI,0);g.lineTo(cx+b.h*.2,cy+b.h*.1);g.lineTo(cx-b.h*.2,cy+b.h*.1);g.closePath();g.fill()}
  else{g.fillStyle='#64748b';A.paint.rrect(cx-b.h*.25,cy-8,b.h*.3,16,4);g.fill();g.fillStyle='rgba(234,179,8,.8)';g.beginPath();g.moveTo(cx+b.h*.05,cy-8);g.lineTo(cx+b.h*.35,cy-b.h*.16);g.lineTo(cx+b.h*.35,cy+b.h*.16);g.lineTo(cx+b.h*.05,cy+8);g.fill()}
  chip(b.t,cx,b.y+b.h*.82,{f:13})});
 chip(P.k>=SPOTS.length?'You chose the right signal every time':`Place ${P.k+1} of ${SPOTS.length}: light or sound?`,A.W/2,A.H*.08,{good:P.k>=SPOTS.length})}
function choose(v){const P=Z.pick;if(P.k>=SPOTS.length)return;const [t,best,why]=SPOTS[P.k];if(v!==best){A.sound.miss();return tell(`Think again. ${why}`)}P.k++;A.sound.pop();tell(`${best?'Sound':'Light'}. ${why}`)}
function draw(){const k=which();if(k==='chal'){sky();kid(A.W*.25,A.H*.8,A.H*.45,ANA,'you');kid(A.W*.75,A.H*.8,A.H*.45,BEN,'Ben',-1);chip('Challenge',A.W/2,A.H*.1,{good:1});return}
 ({far:drawFar,string:drawString,fix:drawFix,torch:drawTorch,pick:drawPick})[k]();A.fx.draw(A.ctx)}
function down(p){const k=which();if(k==='far'){if(p.y>A.H*.55&&p.x>A.W*.16){Z.drag=1;Z.far.d=bnd(Math.round((p.x-A.W*.18)/(A.W*.74)*10),1,10);Z.far.msg='';A.redraw();return true}shout();return false}
 if(k==='string'){if(p.x>A.W*.6){Z.drag=1;Z.x0=p.x;Z.s0=Z.str.slack;return true}talk();return false}
 if(k==='fix'){const X=Z.fix,cy=A.H*.8-A.H*.38*.62,x0=A.W*.17,x1=A.W*.81,pts=[(x0+x1)/2,x0+(x1-x0)*.45,x0+(x1-x0)*.75];
  const i=pts.findIndex(x=>Math.abs(p.x-x)<A.W*.09&&Math.abs(p.y-cy)<A.H*.25);if(i>=0&&X.seen[i]&&!X.ok[i])fixIt(i);else test();return false}
 if(k==='torch'){if(p.x<A.W*.35)flash();else send();return false}
 if(k==='pick'){const b=binsP().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)choose(b.v);return false}return false}
function move(p){if(!Z.drag)return;const k=which();if(k==='far'){const d=bnd(Math.round((p.x-A.W*.18)/(A.W*.74)*10),1,10);if(d!==Z.far.d){Z.far.d=d;Z.far.msg='';A.sound.tick();A.redraw()}}
 if(k==='string')setSlack(Z.s0-(p.x-Z.x0)/(A.W*.12))}
function up(){if(Z.drag&&which()==='far')tell(`Ben is ${Z.far.d} big steps away. Say hello to test.`);if(Z.drag&&which()==='string')tell(Z.str.slack>.2?'The string is still floppy.':TT);Z.drag=0}
function fresh(){tick++;for(const k in Z)delete Z[k];Object.assign(Z,{far:{d:2,wave:0,msg:'',lost:0},str:{slack:1,wave:0,msg:'',ok:0},fix:{ok:[0,0,0],seen:[0,0,0],wave:0,pass:0},
 torch:{n:0,on:0,code:0,k:0,msg:'',good:0},pick:{k:0},drag:0,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();Z.check()}
const reach=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();c.say(desc);A.cv.setAttribute('aria-label',desc);btns();Z.check=reach(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='far'){B('Ben steps back',()=>stepBen(1),'Ben takes one big step further away');B('Ben comes closer',()=>stepBen(-1),'Ben takes one big step closer');B('Say hello',shout)}
 if(k==='string'){B('Pull tight',()=>{setSlack(0);tell(TT)});B('Let it go floppy',()=>{setSlack(1);tell('The string is floppy again.')});B('Talk into the cup',talk)}
 if(k==='fix'){B('Test the phone',test);FAULTS.forEach((f,i)=>{if(Z.fix.seen[i]&&!Z.fix.ok[i])B('Fix the '+f.n,()=>fixIt(i))})}
 if(k==='torch'){if(!Z.torch.code)B('Share the code',share,'Give Ben the same code card');B('Flash the torch',flash);B('Send',send,'Finish the message and let Ben read it')}
 if(k==='pick'){B('Light',()=>choose(0));B('Sound',()=>choose(1))}}
const steps=[
{h:'Too far to hear',p:'Ben walks away from you. Drag Ben, or tap Ben steps back. Then say hello.',
 predict:{q:'Ben walks far away. When your voice gets to him, it will be…',opts:['louder','quieter','just the same'],ans:1},task:'Make Ben too far away to hear you',
 show:()=>auto(0,[shout,()=>stepBen(2),shout,()=>stepBen(4),shout],750),
 go:()=>begin(0,'You and Ben stand 2 big steps apart in a park. Dots show steps up to 10.',()=>Z.far.lost,'A voice gets quieter the further it goes.')},
{h:'Make a string phone',p:'Two cups joined by a string. Drag Ben back to pull the string, or tap Pull tight. Then talk.',
 predict:{q:'Which string will carry your voice to Ben?',opts:['a floppy string','a tight string','both the same'],ans:1},task:'Get your hello to Ben',
 show:()=>auto(1,[talk,()=>{setSlack(0);tell(TT)},talk],1100),
 go:()=>begin(1,'A string telephone: one cup by you, one by Ben, and a floppy string between.',()=>Z.str.ok,'A tight string carries the shake from cup to cup.')},
{h:'Test it and fix it',p:'This phone does not work yet. Test it, find where the message stops, fix that part, and test again.',task:'Fix every fault until the test passes',
 show:()=>auto(2,[test,()=>fixIt(0),test,()=>fixIt(1),test,()=>fixIt(2),test],620),
 go:()=>begin(2,'A string telephone with some faults. Tap Test the phone to try it.',()=>Z.fix.pass,'Test, find the problem, fix it, test again.')},
{h:'Torch signals',p:'It is dark. Ben can see your torch. Tap the torch to flash it, then tap Send.',
 predict:{q:'Ben has no code card. You flash 3 times. Ben will think…',opts:['come here','he will not know what it means','yes'],ans:1},task:'Send all 3 messages',
 show:()=>auto(3,[()=>sendN(3),share,()=>sendN(3),()=>sendN(2),()=>sendN(1)],900),
 go:()=>begin(3,'Night. You hold a torch. Ben is far away and can see it.',()=>Z.torch.k>=ASKS.length,'Light can carry a message when you both know the code.')},
{h:'Light or sound?',p:'For each place, choose a light signal or a sound signal. Tap a box.',
 predict:{q:'Ben is round the corner of the house. What reaches him?',opts:['the torch light','a loud bell','neither'],ans:1},task:'Choose for all 6 places',
 show:()=>auto(4,SPOTS.map(([,v])=>()=>choose(v)),450),
 go:()=>begin(4,'A place card and two boxes: Light and Sound.',()=>Z.pick.k>=SPOTS.length,'Choose light or sound to suit the place.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
 {q:'Why can Ben not hear you when he is very far away?',a:'Your voice gets quieter as it goes',o:[['Sound stops at 5 steps','stop'],['Sound only goes 2 steps','stop']]},
 {q:'How do you make a string phone work best?',a:'Keep the string tight',o:[['Let the string hang loose','slack'],['Hold the string in your hand','touch']]},
 {q:'Your string phone test fails. What next?',a:'Find what stopped it, fix it, test again',o:[['Give up, it can never work','quit'],['Shout louder without fixing it','quit']]},
 {q:'You flash a torch 3 times. Why does Ben need the code first?',a:'So you both know what 3 flashes means',o:[['So the torch is brighter','bright'],['He does not need it','code']]},
 {q:'Ben is round a corner. Which signal can reach him?',a:'A sound, like a bell',o:[['A torch light','straight'],['A wave of your hand','straight']]},
 {q:'The playground is very noisy. Which is best?',a:'A light or a wave he can see',o:[['Talking quietly','noise'],['A small bell','noise']]}];
function why(t){let m='Light and sound can both carry a message over a distance.';
 if(t==='stop')m='Sound does not stop at one place. It gets quieter and quieter the further it goes.';
 if(t==='slack')m='A floppy string does not pass the shake along. Keep it tight.';
 if(t==='touch')m='Touching or squeezing the string stops the shake, so the message stops there.';
 if(t==='quit')m='Engineers test, find the part that went wrong, fix it, then test again.';
 if(t==='bright')m='A brighter torch is easier to see, but Ben still needs the code to know what the flashes mean.';
 if(t==='code')m='Without the same code, flashes are just flashes. You both have to agree what they mean.';
 if(t==='straight')m='Light goes in straight lines, so a wall blocks it. Sound can spread round the corner.';
 if(t==='noise')m='Loud noise covers up quiet sounds. In a noisy place, a signal Ben can see works better.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Signal controls'},box);ask=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
