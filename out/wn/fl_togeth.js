/* Flagship – correlation vs causation (ages 8–10; NC England Y3–6 working scientifically: use results to draw simple
   conclusions and identify evidence that supports or refutes ideas; NGSS 3–5 crosscutting concepts Patterns and Cause
   and effect). Reveal a week of beach days where ice creams and sunburns rise and fall together, then run two
   experiments (close the van, hide the sun) to find the hidden cause; choose which way round a cause works; test lucky
   socks over ten games; and sort claims into "a fair test showed it" or "only seen together". */
(()=>{
 const DAYS=[['Mon',1,9,6],['Tue',0,2,1],['Wed',1,10,7],['Thu',0,3,0],['Fri',1,8,5]];   // day, sunny?, ice creams, sunburns
 const DIR=[['More fire engines come','The fire is big',['The engines make the fire bigger','A big fire makes them send more engines'],1],
  ['Umbrellas are up','It is raining',['Rain makes people open umbrellas','Umbrellas make it rain'],0],
  ['People wear coats','The day is cold',['Coats make the day cold','A cold day makes people put coats on'],1],
  ['The bins are full of wrappers','The park is full of people',['Lots of people leave lots of wrappers','Wrappers bring people to the park'],0]];
 const SOCK=[[1,0,1,0,1],[0,1,1,0,1]];   // game results with socks, without socks: 3 of 5 each
 const CLAIM=[['Two plants, same pot, soil and light. Only the watered one grew.',0],['Children with bigger feet read better.',1],
  ['Same toy car, same ramp. Raise the ramp: it rolls further every time.',0],['Towns with more shops have more dogs.',1],
  ['Two ice cubes. Only the one in the warm room melted fast.',0],['People with sun hats have more freckles.',1]];
 VIS.reg('flagtogeth',c=>{let A,ctl,quizBox;c.fig.classList.add('young');
  const S={run:0,seen:[],asked:false,sun:1,van:1,tried:{van:false,sun:false},k:0,games:[[],[]],socks:1,piles:[[],[]],say:'',wrong:false,hook:()=>{}};
  const stage=()=>['week','hunt','dir','luck','claim','chal'][A.step];
  const px=n=>Math.round(n*(A.narrow?1:1.12));
  const INK='#172033',SOFT='#475569',ICE='#be185d',ICEBG='#fce7f3',BURN='#b45309',BURNBG='#fef3c7',SKY='#e0f2fe',GOOD='#047857',BAD='#b91c1c',RIM='#64748b',CARD='#ffffff';
  function write(g,s,x,y,n,col,w,al){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-14)}
  function wrapLines(g,s,maxW,n,w){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;const L=[];let line='';s.split(' ').forEach(t=>{const tryL=line?line+' '+t:t;if(line&&g.measureText(tryL).width>maxW){L.push(line);line=t}else line=tryL});L.push(line);return L}
  function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
  const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
  function note(g){if(!S.say)return;const L=wrapLines(g,(S.wrong?'✗ ':'✓ ')+S.say,A.W-48,14),lh=px(14)+6,h=L.length*lh+14,y=A.H-h-6;box(g,{x:12,y,w:A.W-24,h},CARD,S.wrong?BAD:GOOD,3);L.forEach((l,i)=>write(g,l,A.W/2,y+7+lh*(i+.5),14,INK))}
  const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
  const miss=t=>{S.wrong=true;S.say=t;A.sound.miss();speak(t);A.redraw()};
  const hit=t=>{S.wrong=false;S.say=t;A.sound.pop()};
  function sunIcon(g,x,y,r,on){if(on){g.fillStyle='#f59e0b';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#f59e0b';g.lineWidth=3;for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3);g.lineTo(x+Math.cos(a)*r*1.7,y+Math.sin(a)*r*1.7);g.stroke()}}
   else{g.fillStyle='#94a3b8';[[-.5,.1,.6],[.2,-.2,.75],[.7,.15,.5]].forEach(([dx,dy,s])=>{g.beginPath();g.arc(x+dx*r*1.4,y+dy*r,r*s*1.2,0,7);g.fill()})}}
  // ---- layout ----
  const colR=k=>{const w=(A.W-24)/5;return{x:12+k*w,y:A.H*.04,w:w-4,h:A.H*.56}};
  const sunR=()=>({x:A.W*.06,y:A.H*.05,w:A.W*.36,h:A.H*.24}),vanR=()=>({x:A.W*.56,y:A.H*.05,w:A.W*.38,h:A.H*.24});
  const optR=k=>({x:14,y:A.H*(.36+k*.2),w:A.W-28,h:px(58)});
  const rowR=k=>({x:12,y:A.H*(.2+k*.2),w:A.W-24,h:A.H*.16});
  const pileR=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.4,w,h:A.H*.34}};
  function bars(g,x,y0,full,ice,burn,showN,u){const bw=Math.max(10,full*.36),unit=A.H*(u||.03);g.fillStyle=ICE;g.fillRect(x-bw-2,y0-ice*unit,bw,ice*unit);g.fillStyle=BURN;g.fillRect(x+2,y0-burn*unit,bw,burn*unit);
   if(showN){write(g,ice,x-bw/2-2,y0-ice*unit-px(9),12,ICE,900);write(g,burn,x+bw/2+2,y0-burn*unit-px(9),12,BURN,900)}}
  function scene(g){const v=stage();
   if(v==='week'){const y0=A.H*.56;DAYS.forEach((d,k)=>{const r=colR(k);box(g,r,S.seen[k]?CARD:'#f1f5f9',RIM,1.5);write(g,d[0],r.x+r.w/2,r.y+px(14),13,INK,900);sunIcon(g,r.x+r.w/2,r.y+px(38),px(9),d[1]);
     if(S.seen[k])bars(g,r.x+r.w/2,y0,r.w,d[2],d[3],true);else write(g,'tap',r.x+r.w/2,r.y+r.h*.7,14,SOFT,800)});
    g.fillStyle=ICE;g.fillRect(16,A.H*.63,14,14);write(g,'ice creams sold',36,A.H*.63+7,13,INK,800,'left');g.fillStyle=BURN;g.fillRect(A.W*.55,A.H*.63,14,14);write(g,'sunburns',A.W*.55+20,A.H*.63+7,13,INK,800,'left')}
   if(v==='hunt'){const s=sunR(),w=vanR();box(g,s,S.sun?BURNBG:'#e2e8f0',RIM,2);sunIcon(g,s.x+s.w/2,s.y+s.h*.42,px(13),S.sun);write(g,S.sun?'sun out':'sun hidden',s.x+s.w/2,s.y+s.h*.86,13,INK,900);
    box(g,w,S.van?ICEBG:'#e2e8f0',RIM,2);g.fillStyle=S.van?ICE:'#94a3b8';A.paint.rrect(w.x+w.w*.2,w.y+w.h*.22,w.w*.6,w.h*.38,6);g.fill();g.fillStyle=INK;[.32,.68].forEach(f=>{g.beginPath();g.arc(w.x+w.w*f,w.y+w.h*.64,5,0,7);g.fill()});write(g,S.van?'van open':'van closed',w.x+w.w/2,w.y+w.h*.86,13,INK,900);
    const ice=S.van?(S.sun?9:2):0,burn=S.sun?6:1,y0=A.H*.7;bars(g,A.W/2,y0,A.W*.3,ice,burn,true,.03);write(g,'ice creams',A.W/2-A.W*.11,y0+px(12),12,ICE,900);write(g,'sunburns',A.W/2+A.W*.11,y0+px(12),12,BURN,900)}
   if(v==='dir'){const R=DIR[S.k];if(!R){write(g,'Find what changes first. That is the cause.',A.W/2,A.H*.3,15,INK);return}
    const top={x:14,y:A.H*.04,w:A.W-28,h:A.H*.26};box(g,top,SKY,RIM,2);write(g,R[0],A.W/2,top.y+top.h*.3,15,INK,900);write(g,'goes with',A.W/2,top.y+top.h*.55,12,SOFT,800);write(g,R[1],A.W/2,top.y+top.h*.8,15,INK,900);
    R[2].forEach((o,k)=>{const q=optR(k);box(g,q,CARD,RIM,2.5);wrapLines(g,o,q.w-20,14).forEach((l,i,a)=>write(g,l,q.x+q.w/2,q.y+q.h/2+(i-(a.length-1)/2)*px(18),14,INK,800))})}
   if(v==='luck'){write(g,S.socks?'Wearing lucky socks':'No lucky socks',A.W/2,A.H*.08,16,INK,900);
    ['with socks','without'].forEach((t,k)=>{const r=rowR(k);box(g,r,k?'#f1f5f9':ICEBG,RIM,2);write(g,t,r.x+10,r.y+px(13),13,INK,900,'left');const n=S.games[k].filter(x=>x).length;write(g,`${n} won of ${S.games[k].length}`,r.x+r.w-10,r.y+px(13),13,INK,900,'right');
     for(let i=0;i<5;i++){const x=r.x+r.w*(.14+i*.18),y=r.y+r.h*.66,res=S.games[k][i];g.beginPath();g.arc(x,y,px(12),0,7);g.fillStyle=res==null?'#ffffff':res?GOOD:'#cbd5e1';g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();if(res!=null)write(g,res?'W':'L',x,y,12,res?'#ffffff':INK,900)}});
    const pr=rowR(2);box(g,{x:A.W*.25,y:pr.y,w:A.W*.5,h:px(44)},GOOD,GOOD,2);write(g,'Play a game',A.W/2,pr.y+px(22),15,'#ffffff',900)}
   if(v==='claim'){const R=CLAIM[S.k];const top={x:14,y:A.H*.04,w:A.W-28,h:A.H*.32};box(g,top,CARD,RIM,2);
    if(R)wrapLines(g,R[0],top.w-24,14).forEach((l,i,a)=>write(g,l,A.W/2,top.y+top.h/2+(i-(a.length-1)/2)*px(19),14,INK,800));else write(g,'All sorted!',A.W/2,top.y+top.h/2,18,GOOD,900);
    [['fair test showed it',S.piles[0]],['only seen together',S.piles[1]]].forEach(([t,list],k)=>{const q=pileR(k);box(g,q,k?'#f1f5f9':'#dcfce7',k?RIM:GOOD,2.5);write(g,t,q.x+q.w/2,q.y+px(16),A.narrow?12:14,INK,900);write(g,list.length?'✓'.repeat(list.length):'tap here',q.x+q.w/2,q.y+q.h*.6,16,k?SOFT:GOOD,900)})}}
  function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f0f9ff',C.dark?.04:.5);g.fillRect(0,0,A.W,A.H);
   if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
   if(stage()==='chal')write(g,'Together is not the same as because.',A.W/2,A.H/2,15,INK);else scene(g);note(g);A.fx.draw(g)}
  // ---- moves ----
  function reveal(k){if(S.seen[k])return;S.seen[k]=true;const d=DAYS[k];hit(`${d[0]}: ${d[1]?'sunny':'cloudy'}, ${d[2]} ice creams, ${d[3]} sunburns.`);refresh()}
  function answerWeek(i){if(S.seen.filter(Boolean).length<5)return;if(i!==0)return miss(i===1?'Look again: the tall pink bars sit next to the tall orange bars.':'They do not stay the same. Both are high on sunny days and low on cloudy days.');S.asked=true;hit('Yes. When one goes up, so does the other. They go together.');refresh()}
  function toggle(which){if(which==='van'){S.van=1-S.van;if(!S.van&&S.sun)S.tried.van=true}else{S.sun=1-S.sun;if(!S.sun)S.tried.sun=true}
   const ice=S.van?(S.sun?9:2):0,burn=S.sun?6:1;hit(which==='van'?(S.van?`Van open: ${ice} ice creams.`:`Van closed: no ice creams, but still ${burn} sunburns.`):(S.sun?`Sun out: ${burn} sunburns.`:`Sun hidden: just ${ice} ice creams and ${burn} sunburn.`));refresh()}
  function chooseDir(k){const R=DIR[S.k];if(!R)return;if(k!==R[3])return miss(`Ask which happens first. ${R[2][R[3]]}.`);hit(`${R[2][k]}.`);S.k++;refresh()}
  function setSocks(on){S.socks=on?1:0;hit(on?'Socks on.':'Socks off.');refresh()}
  function play(){const k=S.socks?0:1;if(S.games[k].length>=5)return miss(k?'Five games without socks done. Put the socks on.':'Five games with socks done. Take the socks off.');const res=SOCK[k][S.games[k].length];S.games[k].push(res);hit(res?'Won!':'Lost.');refresh()}
  function sortClaim(k){const R=CLAIM[S.k];if(!R)return;if(k!==R[1])return miss(R[1]?'No one changed one thing to test it. Something else, like age or town size, could cause both.':'Only one thing was changed and the rest kept the same. That fair test shows the cause.');S.piles[k].push(S.k);hit(k?'Only seen together: there may be a hidden cause.':'A fair test: one change, and the result changed.');S.k++;refresh()}
  function refresh(){const v=stage();let s='';
   if(v==='week')s=S.seen.filter(Boolean).length<5?`Days shown: ${S.seen.filter(Boolean).length} of 5. Tap a day to see its ice creams and sunburns.`:S.asked?'Ice creams and sunburns go together.':'When ice creams go up, what do sunburns do?';
   else if(v==='hunt')s=`Sun ${S.sun?'out':'hidden'}, van ${S.van?'open':'closed'}. Ice creams ${S.van?(S.sun?9:2):0}, sunburns ${S.sun?6:1}.`;
   else if(v==='dir')s=DIR[S.k]?`${DIR[S.k][0]} goes with ${DIR[S.k][1]}. Which causes which?`:'All four worked out.';
   else if(v==='luck')s=`Socks ${S.socks?'on':'off'}. With socks: ${S.games[0].filter(x=>x).length} won of ${S.games[0].length}. Without: ${S.games[1].filter(x=>x).length} won of ${S.games[1].length}.`;
   else if(v==='claim')s=CLAIM[S.k]?`Claim: ${CLAIM[S.k][0]} Fair test, or only seen together?`:'All six sorted.';else s='Challenge.';
   speak((S.say?S.say+' ':'')+s);buttons();S.hook()}
  function buttons(){if(!ctl)return;ctl.innerHTML='';const v=stage(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
   if(v==='week'){DAYS.forEach((d,k)=>{if(!S.seen[k])add(d[0],()=>reveal(k),`Show ${d[0]}`)});if(S.seen.filter(Boolean).length===5&&!S.asked)['go up too','go down','stay the same'].forEach((t,i)=>add(t,()=>answerWeek(i),`Sunburns ${t}`))}
   if(v==='hunt'){add(S.van?'Close the van':'Open the van',()=>toggle('van'));add(S.sun?'Hide the sun':'Bring the sun out',()=>toggle('sun'))}
   if(v==='dir'&&DIR[S.k])DIR[S.k][2].forEach((o,k)=>add(o,()=>chooseDir(k)));
   if(v==='luck'){add(S.socks?'Take socks off':'Put socks on',()=>setSocks(!S.socks));add('Play a game',play)}
   if(v==='claim'&&CLAIM[S.k]){add('fair test showed it',()=>sortClaim(0),'A fair test showed the cause');add('only seen together',()=>sortClaim(1),'Only seen going together')}A.redraw()}
  function down(p){const v=stage();
   if(v==='week'){const k=[0,1,2,3,4].find(k=>inside(p,colR(k)));if(k!=null)reveal(k)}
   if(v==='hunt'){if(inside(p,sunR()))toggle('sun');else if(inside(p,vanR()))toggle('van')}
   if(v==='dir'){const k=[0,1].find(k=>inside(p,optR(k)));if(k!=null)chooseDir(k)}
   if(v==='luck'){const k=[0,1].find(k=>inside(p,rowR(k)));if(k!=null)setSocks(k===0);else if(inside(p,{x:A.W*.25,y:rowR(2).y,w:A.W*.5,h:px(44)}))play()}
   if(v==='claim'){const k=[0,1].find(k=>inside(p,pileR(k)));if(k!=null)sortClaim(k)}return false}
  // ---- steps ----
  const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
  const play_=fs=>{const id=++S.run,gap=A.reduced()?15:300;fs.forEach((f,i)=>setTimeout(()=>{if(id===S.run)f()},i*gap))};
  const reset=()=>{S.run++;S.hook=()=>{};S.seen=[];S.asked=false;S.sun=1;S.van=1;S.tried={van:false,sun:false};S.k=0;S.games=[[],[]];S.socks=1;S.piles=[[],[]];S.say='';S.wrong=false};
  const steps=[
   {h:'Things that go together',p:'Here are five days at the beach. Tap each day to see how many ice creams were sold and how many people got sunburn.',
    task:'Show 5 days, then answer',show:()=>{steps[0].go();play_(DAYS.map((d,k)=>()=>reveal(k)).concat([()=>answerWeek(0)]))},go:()=>{reset();refresh();S.hook=whenDone(0,()=>S.asked,'They rise and fall together. Scientists call this a correlation.')}},
   {h:'Hunt for the cause',p:'Does ice cream cause sunburn? Test it. Close the van, then hide the sun. Watch both bars.',
    predict:{q:'Does eating ice cream cause sunburn?',opts:['Yes: more ice cream, more sunburn','No: something else causes both'],ans:1},
    task:'Run both tests',show:()=>{steps[1].go();play_([()=>toggle('van'),()=>toggle('van'),()=>toggle('sun')])},go:()=>{reset();refresh();S.hook=whenDone(1,()=>S.tried.van&&S.tried.sun,'No van, same sunburn. No sun, less of both. The sun is the hidden cause.')}},
   {h:'Which way round?',p:'Sometimes one thing does cause the other. Ask which one happens first. Tap the right way round.',
    predict:{q:'Big fires have lots of fire engines. Do the engines make the fire bigger?',opts:['Yes: more engines, bigger fire','No: a big fire makes them send more'],ans:1},
    task:'Work out 4 pairs',show:()=>{steps[2].go();play_(DIR.map(R=>()=>chooseDir(R[3])))},go:()=>{reset();refresh();S.hook=whenDone(2,()=>S.k>=DIR.length,'The cause comes first: fire, rain, cold and crowds.')}},
   {h:'Just luck?',p:'Mia won 2 games in her lucky socks. Play 5 games with the socks and 5 without. Then compare.',
    predict:{q:'Mia won 2 games in a row in her lucky socks. Do the socks help?',opts:['Yes: 2 wins in a row','Can\'t tell yet: test more games'],ans:1},
    task:'Play 10 games',show:()=>{steps[3].go();const g=[];for(let i=0;i<5;i++)g.push(play);g.push(()=>setSocks(false));for(let i=0;i<5;i++)g.push(play);play_(g)},go:()=>{reset();refresh();S.hook=whenDone(3,()=>S.games[0].length===5&&S.games[1].length===5,'3 wins of 5 with socks, 3 of 5 without. The socks made no difference: the 2 wins were luck.')}},
   {h:'Prove it fairly',p:'To show a cause, change one thing and keep the rest the same. Is each claim a fair test, or only seen together?',
    task:'Sort 6 claims',show:()=>{steps[4].go();play_(CLAIM.map(R=>()=>sortClaim(R[1])))},go:()=>{reset();refresh();S.hook=whenDone(4,()=>S.k>=CLAIM.length,'Only the fair tests show a cause. The others just go together.')}},
   {h:'Challenge',p:'',go:()=>{reset();ask()}}];
  steps.forEach(x=>{if(x.task)x.onPredict=()=>S.hook()});
  // ---- challenge: every wrong option names the slip ----
  const Q=[['Hot days have more ice creams and more sunburn. What causes the sunburn?','the hot sun',[['the ice creams','together'],['the ice cream van','together']]],
   ['Children with bigger feet read better. Why?','older children have bigger feet and read better',[['big feet help you read','together'],['reading makes feet grow','backwards']]],
   ['Lots of umbrellas go with rain. Which is true?','rain makes people open umbrellas',[['umbrellas make it rain','backwards'],['it is just luck','luck']]],
   ['Tom scored twice in his new boots. What should he do to test the boots?','play lots of games with and without them',[['keep the boots: they work','few'],['buy two more pairs','few']]],
   ['Which shows that water makes a plant grow?','two plants the same, only one watered',[['big plants are in wet gardens','together'],['one plant, watered every day','nofair']]],
   ['Towns with more shops have more dogs. What is the best answer?','bigger towns have more of both',[['shops make people buy dogs','together'],['dogs make shops open','backwards']]]];
  function why(tag){let m='Two things can go together without one causing the other.';
   if(tag==='together')m='They only go together. A third thing, like the sun or age or size, causes both.';
   if(tag==='backwards')m='That is the wrong way round. Ask which thing happens first.';
   if(tag==='luck')m='It happens every time it rains, so it is not luck. Rain comes first.';
   if(tag==='few')m='Two goals is too few to tell. Test lots of games with and without, then compare.';
   if(tag==='nofair')m='With only one plant there is nothing to compare. Keep two plants the same and water one.';
   return m}
  let qn=-1,run=0;
  function ask(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
   quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const r=quizBox.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},r,w);e.onclick=()=>mark(tag,ans)});speak('Challenge: '+q);A.redraw()}
  function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=quizBox.querySelector('.fl-fb');
   if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
  A=FK.shell(c,{steps,ratio:.62,tall:1,draw,onStep:A=>{quizBox.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
   init:A=>{const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Test buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
  A.start()})})();
