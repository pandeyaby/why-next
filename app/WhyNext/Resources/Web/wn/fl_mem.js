/* Flagship – how memory works (ages 11–12): overload a 4-slot working-memory desk, chunk FBIBBCUSA using what long-term
   memory already knows, space reviews to beat a model forgetting curve, compare re-reading with recall (Roediger & Karpicke 2006)
   and link a new word to known ideas so it has more cues. */
(()=>{const mn=Math.min,mx=Math.max,ex=Math.exp;
 const ITEMS=['7','dog','blue','42','map','sun','ice'];
 const LET='FBIBBCUSA'.split(''),KNOWN=['FBI','BBC','USA'];
 const S0=1.5,GROW=2.2,LINE=.4,DAYS=7;
 const RK=[['Read 4 times',83,40],['Read 3, recall 1',78,56],['Read 1, recall 3',71,61]];
 const NODES=[['photo = light, as in photograph',1],['the bus leaves at 8',0],['synthesis = putting together',1],['my football team won',0],['plants need sunlight to grow',1]];
 const NOPE=['','A bus time does not link to the word, so it will not help you find it.','','A football score has nothing to do with plants, so it gives you no path back.',''];
 const NXY=[[.26,.15],[.74,.15],[.74,.47],[.26,.79],[.74,.79]];
VIS.reg('flagmem',c=>{let A,pad,chal,read;
 const S={desk:[],drop:[],k:0,cuts:[],rev:[],shown:[0,0],links:[],bad:null,want:()=>{},run:0,Q:null};
 const say=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(read)read.textContent=t}};
 const mode=()=>['desk','chunk','curve','recall','link','quiz'][A.step];
 const tint=(k,a)=>A.alpha(k,a),Z=z=>A.narrow?z:z+2;
 const write=(x,t,X,Y,z,k,w,al)=>{x.font=`${w||700} ${Z(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-16)};
 const panel=(x,R,k,thick,fill)=>{x.fillStyle=tint(k,fill||.13);A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill();x.strokeStyle=k;x.lineWidth=thick?4:2;x.stroke()};
 const hit=(p,R)=>p.x>R.x&&p.x<R.x+R.w&&p.y>R.y&&p.y<R.y+R.h,blip=t=>{A.sound.miss();say(t);A.redraw()};
 const slotR=i=>{const g=8,w=(A.W-20-3*g)/4,h=mn(54,A.H*.13);return{x:10+i*(w+g),y:A.H*.13,w,h}};
 const nextR=()=>({x:A.W*.2,y:A.H*.36,w:A.W*.6,h:mn(56,A.H*.13)});
 const tileR=i=>{const w=(A.W-20)/9;return{x:10+i*w+2,y:A.H*.12,w:w-4,h:mn(52,A.H*.13)}};
 const G=()=>({x:44,y:A.H*.1,w:A.W-58,h:A.H*.6});
 const pieces=()=>{const out=[];let s=0;[...S.cuts].sort((a,b)=>a-b).concat(8).forEach(k=>{out.push(LET.slice(s,k+1).join(''));s=k+1});return out};
 const need=P=>P.reduce((n,p)=>n+(KNOWN.includes(p)?1:p.length),0);
 function ret(t){let last=0,s=S0;[...S.rev].sort((a,b)=>a-b).forEach(d=>{if(d<=t){last=d;s=d===0?s:s*GROW}});return ex(-(t-last)/s)}
 function curve(){let lo=1,at=-1;for(let t=0;t<=DAYS+1e-9;t+=.05){const r=ret(t);if(r<lo)lo=r;if(r<LINE&&at<0)at=t}return{lo,at}}
 const nodeP=i=>({x:NXY[i][0]*A.W,y:NXY[i][1]*A.H*.92}),MID=()=>({x:.26*A.W,y:.47*A.H*.92});
 const nodeR=i=>{const P=nodeP(i),w=A.W*.46,h=mn(64,A.H*.16);return{x:P.x-w/2,y:P.y-h/2,w,h}};
 function wrap(x,t,X,Y,w,z,k){x.font=`700 ${Z(z)}px system-ui,sans-serif`;const W=t.split(' '),L=[];let s='';W.forEach(q=>{const u=s?s+' '+q:q;if(x.measureText(u).width>w&&s){L.push(s);s=q}else s=u});L.push(s);
  L.forEach((l,j)=>write(x,l,X,Y+(j-(L.length-1)/2)*Z(z+3),z,k))}
 function deskV(x){const C=A.col;write(x,'Working memory: your desk',A.W/2,A.H*.06,14,C.tx,800);
  for(let i=0;i<4;i++){const R=slotR(i),it=S.desk[i];panel(x,R,it?C.vi:C.mu,0,it?.2:.05);write(x,it||'empty',R.x+R.w/2,R.y+R.h/2,it?18:12,it?C.tx:C.mu,800)}
  const N=nextR(),done=S.k>=ITEMS.length;panel(x,N,done?C.mu:C.cy,!done);write(x,done?'No more items':'Hold next: '+ITEMS[S.k],N.x+N.w/2,N.y+N.h/2,16,C.tx,800);
  if(S.drop.length)write(x,'Pushed off the desk: '+S.drop.join(', '),A.W/2,A.H*.56,14,C.rd,800);
  const y0=A.H*.64,n=36,cw=(A.W-20)/12;write(x,'Long-term memory: a huge store',A.W/2,y0,13,C.mu,800);
  for(let i=0;i<n;i++){x.fillStyle=tint(C.gr,.25);A.paint.rrect(10+(i%12)*cw+2,y0+12+Math.floor(i/12)*16,cw-4,12,3);x.fill()}
  write(x,'…and far more',A.W/2,y0+70,12,C.mu,700)}
 function chunkV(x){const C=A.col,P=pieces(),n=need(P),ok=n<=4;write(x,'Remember this string',A.W/2,A.H*.06,14,C.tx,800);
  LET.forEach((l,i)=>{const R=tileR(i);panel(x,R,C.cy,0);write(x,l,R.x+R.w/2,R.y+R.h/2,18,C.tx,900);
   if(S.cuts.includes(i)){x.strokeStyle=C.rd;x.lineWidth=4;x.beginPath();x.moveTo(R.x+R.w+2,R.y-6);x.lineTo(R.x+R.w+2,R.y+R.h+6);x.stroke()}});
  write(x,'Tap a letter to cut after it',A.W/2,A.H*.31,12,C.mu,700);
  let y=A.H*.4;P.forEach(p=>{const k=KNOWN.includes(p);write(x,`${p}  →  ${k?'1 slot (you know it)':p.length+' slots'}`,A.W/2,y,15,k?C.gr:C.tx,800);y+=Z(22)});
  write(x,`Desk slots needed: ${n} of 4`,A.W/2,A.H*.88,17,ok?C.gr:C.rd,900)}
 function curveV(x){const C=A.col,g=G(),X=t=>g.x+t/DAYS*g.w,Y=r=>g.y+(1-r)*g.h,cv=curve();
  x.strokeStyle=C.mu;x.lineWidth=1.5;x.strokeRect(g.x,g.y,g.w,g.h);
  for(let d=0;d<=DAYS;d++)write(x,String(d),X(d),g.y+g.h+12,12,C.mu,700);write(x,'day',g.x-22,g.y+g.h+12,11,C.mu,700);
  write(x,'100%',g.x-22,g.y+6,11,C.mu,700);write(x,'40%',g.x-22,Y(LINE),11,C.rd,800);
  x.setLineDash([6,5]);x.strokeStyle=C.rd;x.beginPath();x.moveTo(g.x,Y(LINE));x.lineTo(g.x+g.w,Y(LINE));x.stroke();x.setLineDash([]);
  x.strokeStyle=tint(C.mu,.6);x.lineWidth=2;x.beginPath();for(let t=0;t<=DAYS;t+=.05){const r=ex(-t/S0);t?x.lineTo(X(t),Y(r)):x.moveTo(X(t),Y(r))}x.stroke();
  x.strokeStyle=C.vi;x.lineWidth=3.5;x.beginPath();for(let t=0;t<=DAYS+1e-9;t+=.05){const r=ret(t);t?x.lineTo(X(t),Y(r)):x.moveTo(X(t),Y(r))}x.stroke();
  S.rev.forEach(d=>{x.fillStyle=C.gr;x.beginPath();x.arc(X(d),Y(1),7,0,7);x.fill()});
  const ok=cv.at<0;write(x,'A simple model, not real data. Grey = no reviews.',A.W/2,A.H*.06,12,C.mu,700);
  write(x,`Reviews: ${S.rev.length} of 3   Lowest: ${Math.round(cv.lo*100)}%`,A.W/2,A.H*.8,15,C.tx,800);
  write(x,ok?'Stays above the line all week ✓':`Drops below the line on day ${cv.at.toFixed(1)}`,A.W/2,A.H*.89,15,ok?C.gr:C.rd,900)}
 function recallV(x){const C=A.col,g={x:10,y:A.H*.14,w:A.W-20,h:A.H*.56},hw=(g.w-10)/2,bw=(hw-16)/3,K=[C.mu,C.cy,C.gr];
  write(x,'Students learned a short text (Roediger & Karpicke, 2006)',A.W/2,A.H*.06,12,C.mu,700);
  [['After 5 minutes',1],['After 1 week',2]].forEach(([lab,j],s)=>{const x0=g.x+s*(hw+10),on=S.shown[s];write(x,lab,x0+hw/2,g.y,14,C.tx,800);
   RK.forEach((r,i)=>{const bx=x0+8+i*bw,h=on?r[j]/100*(g.h-40):0,by=g.y+g.h-h;x.fillStyle=tint(K[i],on?.75:.12);x.fillRect(bx+3,on?by:g.y+20,bw-6,on?h:g.h-40);
    write(x,on?r[j]+'%':'?',bx+bw/2,on?by-10:g.y+g.h/2,14,C.tx,900)})});
  RK.forEach((r,i)=>{x.fillStyle=tint(K[i],.75);x.fillRect(14,A.H*.76+i*Z(20)-6,12,12);write(x,r[0],32,A.H*.76+i*Z(20),13,C.tx,700,'left')})}
 function linkV(x){const C=A.col,M=MID();NODES.forEach((nd,i)=>{if(S.links.includes(i)){const P=nodeP(i);x.strokeStyle=C.gr;x.lineWidth=4;x.beginPath();x.moveTo(M.x,M.y);x.lineTo(P.x,P.y);x.stroke()}});
  const cw=A.W*.46,ch=mn(64,A.H*.16),bg=A.mix(C.pn,'#e0e7ff',C.dark?.04:.35),box=R=>{x.fillStyle=bg;A.paint.rrect(R.x,R.y,R.w,R.h,10);x.fill()};box({x:M.x-cw/2,y:M.y-ch/2,w:cw,h:ch});panel(x,{x:M.x-cw/2,y:M.y-ch/2,w:cw,h:ch},C.vi,1,.25);write(x,'photosynthesis',M.x,M.y,16,C.tx,900);
  NODES.forEach((nd,i)=>{const R=nodeR(i),on=S.links.includes(i);box(R);panel(x,R,on?C.gr:S.bad===i?C.rd:C.cy,on||S.bad===i,on?.25:.12);wrap(x,nd[0],R.x+R.w/2,R.y+R.h/2,R.w-10,12,C.tx)});
  write(x,`Cues linked: ${S.links.length} of 3`,A.W/2,A.H*.92,15,S.links.length>=3?C.gr:C.tx,900)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=mode();x.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.04:.35);x.fillRect(0,0,W,H);
  const f={desk:deskV,chunk:chunkV,curve:curveV,recall:recallV,link:linkV}[v];if(f)f(x);else{x.textAlign='center';x.textBaseline='middle';x.fillStyle='#000';x.font=`${mn(W,H)*.3}px system-ui`;x.fillText(S.Q?S.Q.big:'🧠',W/2,H/2)}A.fx.draw(x)}
 function hold(){if(S.k>=ITEMS.length)return blip('That was the last item.');S.desk.push(ITEMS[S.k++]);let m='';if(S.desk.length>4){const o=S.desk.shift();S.drop.push(o);m=`The desk was full, so "${o}" got pushed off.`;A.sound.miss()}else A.sound.tick();report(m)}
 function cut(i){if(i<0||i>7)return;const k=S.cuts.indexOf(i);k<0?S.cuts.push(i):S.cuts.splice(k,1);A.sound.tick();const P=pieces();report(need(P)<=4?'Now it fits: '+P.join(' ')+'.':'')}
 function review(d){const k=S.rev.indexOf(d);if(k>=0)S.rev.splice(k,1);else{if(S.rev.length>=3)return blip('Only 3 reviews allowed. Tap a green dot day again to remove it.');S.rev.push(d)}A.sound.tick();report()}
 function reveal(s){if(S.shown[s])return;S.shown[s]=1;A.sound.pop();report(s?'After a week, the recall group remembered most: 61% against 40%.':'After 5 minutes, re-reading looked best: 83%.')}
 function link(i){if(S.links.includes(i))return;if(!NODES[i][1]){S.bad=i;return blip(NOPE[i])}S.bad=null;S.links.push(i);A.sound.pop();report('Linked. That is one more path back to the word.')}
 function report(msg){const v=mode();let t;
  if(v==='desk')t=`Desk holds: ${S.desk.join(', ')||'nothing'}. ${S.drop.length} pushed off.`;
  else if(v==='chunk'){const P=pieces();t=`Chunks: ${P.join(' ')}. Slots needed ${need(P)} of 4.`}
  else if(v==='curve'){const cv=curve();t=`Reviews on day ${[...S.rev].sort().join(', ')||'none'}. Lowest point ${Math.round(cv.lo*100)} percent. `+(cv.at<0?'Above the line all week.':'Drops below the line on day '+cv.at.toFixed(1)+'.')}
  else if(v==='recall')t=`Results shown: ${S.shown[0]?'5 minutes: read 4 times 83, read 3 recall 1 78, recall 3 times 71 percent. ':''}${S.shown[1]?'1 week: 40, 56 and 61 percent.':''}`||'Tap a test to see the results.';
  else if(v==='link')t=`Linked to photosynthesis: ${S.links.map(i=>NODES[i][0]).join('; ')||'nothing yet'}.`;
  else t='Challenge time.';say((msg?msg+' ':'')+t);sync();S.want()}
 function sync(){if(!A||!pad)return;pad.innerHTML='';const v=mode();
  const K=(t,f,off,lab)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':lab||null},pad,t);e.disabled=!!off;e.onclick=f};
  if(v==='desk')K(S.k<ITEMS.length?'Hold next item: '+ITEMS[S.k]:'No more items',hold,S.k>=ITEMS.length);
  if(v==='chunk')LET.slice(0,8).forEach((l,i)=>K((S.cuts.includes(i)?'Join ':'Cut ')+'after '+l+(i+1),()=>cut(i),0,(S.cuts.includes(i)?'Join':'Cut')+` after letter ${i+1}, ${l}`));
  if(v==='curve')for(let d=1;d<DAYS;d++)K((S.rev.includes(d)?'✓ ':'')+'Day '+d,()=>review(d),0,(S.rev.includes(d)?'Remove review on':'Review on')+' day '+d);
  if(v==='recall'){K('Show 5-minute test',()=>reveal(0),S.shown[0]);K('Show 1-week test',()=>reveal(1),S.shown[1])}
  if(v==='link')NODES.forEach((nd,i)=>K(nd[0],()=>link(i),S.links.includes(i),'Link: '+nd[0]));A.redraw()}
 const fin=(st,ok,msg)=>()=>{if(A.step===st&&ok()&&(!steps[st].predict||A.pred[st]!=null))A.done(msg()+A.reveal(st))};
 const later=(fs,gap)=>{const r=S.run;fs.forEach((f,j)=>setTimeout(()=>{if(r===S.run)f()},A.reduced()?j*20:j*gap))};
 const reset=()=>{S.run++;S.want=()=>{};S.Q=null;S.bad=null};
 const steps=[
  {h:'A small desk',p:'Working memory is what you hold in mind right now, like a small desk. Hold items one by one and watch.',
   predict:{q:'How many separate things can working memory hold at once?',opts:['About 4','About 20'],ans:0},task:'Hold six items',
   show:()=>{steps[0].go();later([0,1,2,3,4,5].map(()=>hold),380)},go:()=>{reset();S.desk=[];S.drop=[];S.k=0;report();S.want=fin(0,()=>S.k>=6,()=>'The desk holds about 4 things. New ones push old ones off, unless you store them in long-term memory.')}},
  {h:'Chunk it',p:'Nine letters will not fit on a 4-slot desk. Cut the string into pieces you already know.',task:'Fit the string on the desk',
   show:()=>{steps[1].go();later([()=>cut(2),()=>cut(5)],600)},go:()=>{reset();S.cuts=[];report();S.want=fin(1,()=>pieces().join()==='FBI,BBC,USA',()=>'FBI, BBC and USA each take 1 slot because long-term memory already knows them. Knowledge makes the desk feel bigger.')}},
  {h:'The forgetting curve',p:'You learn something on day 0. Tap days to review it. Keep it above the line until day 7 with 3 reviews or fewer.',
   predict:{q:'With no review at all, how much is left after one day?',opts:['Most of it','Much less: forgetting is fastest at first'],ans:1},task:'Keep the memory above the line all week',
   show:()=>{steps[2].go();later([()=>review(1),()=>review(3)],700)},go:()=>{reset();S.rev=[];report();S.want=fin(2,()=>curve().at<0,()=>'Forgetting is normal and fast at first. Each review makes the next drop slower, so the gaps can grow.')}},
  {h:'Re-read or recall?',p:'Three groups had the same time. Some re-read. Some shut the text and wrote what they could recall. Show both tests.',
   predict:{q:'Which group remembers most a week later?',opts:['Read it 4 times','Read once, then recalled 3 times'],ans:1},task:'Show both test results',
   show:()=>{steps[3].go();later([()=>reveal(0),()=>reveal(1)],900)},go:()=>{reset();S.shown=[0,0];report();S.want=fin(3,()=>S.shown[0]&&S.shown[1],()=>'Re-reading felt easy and familiar, and those students felt most sure, but recalling built the memory that lasted.')}},
  {h:'Connect it',p:'A new word is easier to find later if it links to things you know. Tap the ideas that really connect to it.',task:'Link three real cues',
   show:()=>{steps[4].go();later([0,2,4].map(i=>()=>link(i)),500)},go:()=>{reset();S.links=[];report();S.want=fin(4,()=>S.links.length>=3,()=>'Each real link is a cue: a path your mind can follow back to the word.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.want()});
 const QZ={wm:['Someone reads you a 12-digit code once. Why is it hard to hold?','📞',[['Working memory holds only about 4 things','ok'],['Long-term memory is full','full'],['You are bad at memory','bad']]],
  curve:['When do you forget fastest after a lesson?','📉',[['In the first day or so','ok'],['Evenly, a bit each day','even'],['Only after a month','month']]],
  reread:['Why does re-reading feel useful?','📖',[['The page feels familiar, so it feels known','ok'],['It is the best way to remember','best'],['It tests what you can recall','tests']]],
  plan:['Test on Friday next week. Best plan?','🗓️',[['Short recall quizzes on a few spread-out days','ok'],['Re-read all of it on Thursday night','cram'],['Read it 5 times today','mass']]],
  chunk:['Why is 1 9 4 5 easy to hold if you know history?','🧩',[['It is one chunk: the year 1945','ok'],['Numbers are always easy','easy'],['It has only small digits','small']]],
  forget:['You forgot half a lesson by next week. What does that mean?','🧠',[['Forgetting is normal. Recall it to rebuild it','ok'],['You will never learn it','never'],['Re-read it until it looks familiar','fam']]]};
 let qn=-1,stars=0;
 function ask(){qn++;const K=Object.keys(QZ),k=K[qn%K.length],rot=qn%3,[q,big,ops]=QZ[k];S.Q={big};
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});say('Challenge: '+q);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'full':m='Long-term memory is huge. The limit is the small desk of working memory.';break;
   case 'bad':m='Everyone has a small working memory. It is how brains work, not a flaw.';break;
   case 'even':m='The curve drops steeply at first, then levels off.';break;
   case 'month':m='Most forgetting happens early, often within a day.';break;
   case 'best':m='Re-reading felt best but lost after a week: 40% against 61% for recall.';break;
   case 'tests':m='Re-reading never asks you to recall. The text is in front of you.';break;
   case 'cram':m='One late re-read feels good but fades fast. Spread out recall instead.';break;
   case 'mass':m='Doing it all in one day gives no spacing, so the forgetting curve wins.';break;
   case 'easy':m='Random digits are hard. Meaning from long-term memory makes the chunk.';break;
   case 'small':m='Small digits still take 4 slots unless you know them as one thing.';break;
   case 'never':m='Forgetting is normal. Each recall makes the memory stronger and slower to fade.';break;
   default:m='Looking familiar is not the same as knowing it. Recall it with the book shut.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const v=mode();
  if(v==='desk'){if(hit(p,nextR()))hold();return false}
  if(v==='chunk'){const i=LET.findIndex((l,i)=>hit(p,tileR(i)));if(i>=0&&i<8)cut(i);return false}
  if(v==='curve'){const g=G();if(p.x>g.x&&p.x<g.x+g.w+10&&p.y>g.y-10&&p.y<g.y+g.h+30){const d=Math.round((p.x-g.x)/g.w*DAYS);if(d>=1&&d<DAYS)review(d)}return false}
  if(v==='recall'){S.shown[0]?reveal(1):reveal(0);return false}
  if(v==='link'){const i=NODES.findIndex((n,i)=>hit(p,nodeR(i)));if(i>=0)link(i);return false}return false}
 A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;read.hidden=A.step===5;pad.hidden=A.step===5;sync()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);read=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);
   A.gest({down,move:()=>{},up:()=>A.redraw()});sync()}});
 A.start()})})();
