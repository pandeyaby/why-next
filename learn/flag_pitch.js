/* Flagship – pitch of sounds (ages 8–9): twang a ruler over a table edge at four lengths (shorter vibrates faster, so the
   pitch is higher), make one elastic band thinner and tighter to reach the highest note, blow across four bottles and put
   their notes in order (more water leaves a shorter column of air, so a higher note), hit a drum softly and hard (louder,
   but the same pitch), then sort features of objects into high or low pitch.
   The Challenge targets the usual slips: high means loud, thick or loose bands are higher, the most air gives the highest
   note, bigger vibrations mean higher pitch, and sound without vibration. Real notes play only if the sound button is on. */
(()=>{
const LENS=[25,20,15,10],THICK=[1,1.5,2.2],TIGHT=[1,1.4,1.9],WATER=[.6,.2,.8,.4];
const SORT=[['A short ruler twang',0],['A long ruler twang',1],['A thin, tight band',0],['A thick, loose band',1],['A bottle with lots of water (blow)',0],['A big, loose drum skin',1]];
VIS.reg('flagpitch',c=>{let A,keys,box,qk=-1,good=0,AC=null;const T={};
const part=()=>['ruler','band','bottle','drum','sort','quiz'][A.step];
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function write(g,s,x,y,n,w,al){g.font=`${w||800} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-14)}
function box2(g,r,col,a,line){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=line||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
function play(f,vol,dur){if(!A.sound.on())return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),gn=AC.createGain(),t=AC.currentTime;o.type='triangle';o.frequency.setValueAtTime(f,t);gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(vol,t+.01);gn.gain.exponentialRampToValueAtTime(.0001,t+(dur||.8));o.connect(gn).connect(AC.destination);o.start(t);o.stop(t+(dur||.8)+.05)}catch(e){}}
/* how high a note is, on a 0-1 scale (log of frequency between 60 and 900 Hz) */
const level=f=>Math.max(0,Math.min(1,Math.log(f/60)/Math.log(15)));
const rulerF=L=>400*Math.pow(10/L,2),bandF=()=>150*THICK[T.thin]*TIGHT[T.tight],bottleF=w=>110/(1-w);
function meter(g,f,lab){const C=A.col,x=A.W-34,y0=A.H*.16,h=A.H*.62;g.lineWidth=2;g.strokeStyle=C.tx;g.fillStyle=A.alpha(C.cy,.12);A.paint.rrect(x-9,y0,18,h,9);g.fill();g.stroke();
 write(g,'high',x,y0-12,10,700);write(g,'low',x,y0+h+12,10,700);if(f==null)return;const y=y0+h*(1-level(f));g.fillStyle=C.vi;g.beginPath();g.arc(x,y,9,0,7);g.fill();g.stroke();if(lab)write(g,lab,x-14,y,11,700,'right')}
/* vibration: T.amp fades 1 to 0 while T.t runs 0 to 1 over T.dur seconds */
const wob=fv=>T.amp*Math.sin(2*Math.PI*fv*T.t*T.dur);
function pluck(fv,ms){T.amp=1;T.t=0;T.dur=ms/1000;A.tween(T,{amp:0,t:1},A.reduced()?1:ms,'lin')}
function render(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'Sounds come from vibrations',W/2,H*.3,17);write(g,'Faster vibrations: higher pitch',W/2,H*.47,16);write(g,'Bigger vibrations: louder',W/2,H*.64,16);return}
 if(v==='ruler'){const L=LENS[T.li],ty=H*.5,ex=W*.32,u=(W*.58-ex*0)/30,len=L*u*.95,f=rulerF(L),d=wob(f/40)*H*.12;
  g.fillStyle=A.alpha('#a16207',.55);g.fillRect(0,ty+6,ex,H*.3);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(-2,ty+6,ex+2,H*.3);write(g,'table',ex/2,ty+H*.17,11,700);
  g.fillStyle=C.tx;g.fillRect(ex-60,ty-12,40,12);
  g.lineCap='round';[[12,C.tx],[8,'#facc15']].forEach(([lw,s])=>{g.lineWidth=lw;g.strokeStyle=s;g.beginPath();g.moveTo(ex-70,ty);g.lineTo(ex,ty);g.quadraticCurveTo(ex+len*.55,ty+d*.3,ex+len,ty+d);g.stroke()});
  write(g,`Sticking out: ${L} cm`,W*.42,H*.1,15);write(g,`Tried ${T.tried.length} of 3 lengths`,W*.42,H*.2,12,700);meter(g,T.f,T.f?(T.f>150?'high':T.f>90?'middle':'low'):'');
  write(g,'Drag to change the length. Tap to twang.',W*.45,H*.92,11,600);return A.fx.draw(g)}
 if(v==='band'){const y=H*.45,x0=W*.1,x1=W*.78,d=wob(bandF()/45)*H*.1;g.fillStyle=A.alpha('#a16207',.35);A.paint.rrect(x0-14,y+16,x1-x0+28,H*.26,10);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
  g.fillStyle=A.alpha(C.tx,.85);g.beginPath();g.arc((x0+x1)/2,y+H*.13,H*.07,0,7);g.fill();
  const lw=[10,6,3][T.thin];[[lw+4,C.tx],[lw,'#f97316']].forEach(([w,s])=>{g.lineWidth=w;g.strokeStyle=s;g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo((x0+x1)/2,y+d,x1,y);g.stroke()});
  [x0,x1].forEach(x=>{g.fillStyle=C.tx;g.fillRect(x-5,y-16,10,32)});
  write(g,`${['Thick','Medium','Thin'][T.thin]} band, ${['loose','tighter','very tight'][T.tight]}`,W*.44,H*.1,15);write(g,T.top?'The highest note!':'Find the highest note, then pluck it',W*.44,H*.8,12,700);meter(g,T.f);return A.fx.draw(g)}
 if(v==='bottle'){write(g,T.order.length>=4?'Low to high: all in order!':`Tap the bottles from lowest note to highest (${T.order.length} of 4)`,W/2,H*.07,13);
  WATER.forEach((w,i)=>{const r=bottleR(i),wy=r.y+r.h*(1-w),done=T.order.includes(i),k=T.order.indexOf(i);g.fillStyle=A.alpha(C.cy,.55);g.fillRect(r.x+3,wy,r.w-6,r.y+r.h-wy-3);
   g.lineWidth=i===T.cur?4:2.5;g.strokeStyle=done?C.gr:C.tx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.strokeRect(r.x+r.w*.32,r.y-r.h*.18,r.w*.36,r.h*.18);
   if(T.blow===i){g.lineWidth=2;g.strokeStyle=C.tx;for(let j=0;j<3;j++){g.beginPath();g.arc(r.x+r.w/2,r.y-r.h*.2,10+j*7+wob(3)*3,Math.PI*1.15,Math.PI*1.85);g.stroke()}}
   write(g,done?['1st','2nd','3rd','4th'][k]:'air',r.x+r.w/2,done?r.y+r.h+16:(r.y+wy)/2,12,800)});return A.fx.draw(g)}
 if(v==='drum'){const cx=W*.42,cy=H*.5,rw=W*.26,d=wob(4)*H*.05*(T.hard?1:.3);g.fillStyle=A.alpha(C.rd,.35);g.fillRect(cx-rw,cy,rw*2,H*.25);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(cx-rw,cy,rw*2,H*.25);
  g.fillStyle=A.alpha('#fef3c7',.9);g.beginPath();g.ellipse(cx,cy+d,rw,H*.06,0,0,7);g.fill();g.stroke();
  write(g,'Hit soft and hit hard. What changes?',W*.44,H*.08,14);write(g,'soft',cx-rw*.5,cy+H*.14,12);write(g,'hard',cx+rw*.5,cy+H*.14,12);const vol=T.hit?(T.hard?.95:.3)*Math.max(.2,T.amp):0;
  g.fillStyle=A.alpha(C.or,.8);g.fillRect(W*.06,H*.88-H*.5*vol,22,H*.5*vol);g.strokeRect(W*.06,H*.38,22,H*.5);write(g,'loud',W*.06+11,H*.33,10,700);meter(g,T.hit?220:null,T.hit?'same':'');
  write(g,`Soft: ${T.soft?'✓':'-'}   Hard: ${T.hard2?'✓':'-'}`,W*.44,H*.92,12,700);return A.fx.draw(g)}
 if(v==='sort'){const it=SORT[Math.min(T.round,SORT.length-1)];write(g,T.round>=SORT.length?'All 6 sorted!':it[0],W/2,H*.15,16);
  ['High pitch','Low pitch'].forEach((t,b)=>{const r=binR(b);box2(g,r,b?C.vi:C.cy,.1);write(g,t,r.x+r.w/2,r.y+18,13);T.sorted.filter(x=>x[1]===b).forEach((x,j)=>write(g,SORT[x[0]][0],r.x+r.w/2,r.y+42+j*sz(17),10,600))});A.fx.draw(g)}}
const bottleR=i=>{const w=A.W/4,bw=Math.min(w*.56,70),h=A.H*.5;return{x:i*w+(w-bw)/2,y:A.H*.3,w:bw,h}};
const binR=b=>{const gap=10,w=(A.W-gap*3)/2;return{x:gap+b*(w+gap),y:A.H*.3,w,h:A.H*.66}};
/* step 0 */
function setL(i){i=Math.max(0,Math.min(LENS.length-1,i));if(i===T.li)return;T.li=i;T.f=null;A.sound.tick();voice(`The ruler sticks out ${LENS[i]} cm. Twang it.`);A.redraw()}
function twang(){const L=LENS[T.li],f=rulerF(L);T.f=f;pluck(f/40,1100);play(f,.08,.9);if(!T.tried.includes(L))T.tried.push(L);
 voice(`${L} cm: ${f>150?'fast vibrations, a high note':f>90?'medium vibrations, a middle note':'slow vibrations, a low note'}.`+(T.tried.length>=2?' Shorter ruler, faster vibrations, higher pitch.':''));keyPad();T.want()}
/* step 1 */
function setBand(k,dv){if(k==='thin')T.thin=Math.max(0,Math.min(2,T.thin+dv));else T.tight=Math.max(0,Math.min(2,T.tight+dv));T.f=null;A.sound.tick();voice(`${['Thick','Medium','Thin'][T.thin]} band, ${['loose','tighter','very tight'][T.tight]}. Pluck it to hear.`);A.redraw()}
function pluckBand(){const f=bandF();T.f=f;pluck(f/45,1000);play(f,.08,.8);T.top=T.thin===2&&T.tight===2;
 voice(T.top?'Thin and very tight: the fastest vibrations and the highest note!':T.thin<2&&T.tight<2?'Try thinner and tighter for a higher note.':T.thin<2?'Higher. Now try a thinner band.':'Higher. Now make it tighter.');keyPad();T.want()}
/* step 2 */
function tapBottle(i){if(T.order.length>=4||T.order.includes(i))return;T.cur=i;T.blow=i;const f=bottleF(WATER[i]);pluck(3,700);play(f,.07,.6);
 const want=WATER.map((w,j)=>j).filter(j=>!T.order.includes(j)).sort((a,b)=>WATER[a]-WATER[b])[0];
 if(i!==want){A.sound.miss();voice(`Listen: that note is higher. It has less air above the water, so the air vibrates faster. Find one with more air.`);return A.redraw()}
 T.order.push(i);voice(T.order.length>=4?'Lowest to highest! More water means less air, and a shorter air column gives a higher note.':`Yes. Next lowest: the bottle with the most air left.`);A.redraw();keyPad();T.want()}
/* step 3 */
function hit(hard){T.hit=1;T.hard=hard;if(hard)T.hard2=1;else T.soft=1;pluck(4,1000);play(220,hard?.2:.025,.8);
 voice(hard?'Hard hit: bigger vibrations, a louder sound. The pitch stays the same.':'Soft hit: small vibrations, a quiet sound. Same pitch.');keyPad();T.want()}
/* step 4 */
function sortAs(b){if(T.round>=SORT.length)return;const[name,ans]=SORT[T.round];
 if(b!==ans){A.sound.miss();voice(ans?`Not high: ${name.toLowerCase()} vibrates slowly, so it makes a low note.`:`Not low: ${name.toLowerCase()} vibrates fast, so it makes a high note.`);return}
 T.sorted.push([T.round,b]);T.round++;A.sound.pop();voice(`Yes, ${b?'low':'high'} pitch.`+(T.round<SORT.length?' Next one.':''));A.redraw();keyPad();T.want()}
function keyPad(){if(!keys)return;keys.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(v==='ruler'){B('Shorter',()=>setL(T.li+1),'Make the ruler stick out less');B('Longer',()=>setL(T.li-1),'Make the ruler stick out more');B('Twang',twang,'Twang the ruler')}
 if(v==='band'){B('Thinner',()=>setBand('thin',1),'Use a thinner band');B('Thicker',()=>setBand('thin',-1),'Use a thicker band');B('Tighter',()=>setBand('tight',1),'Stretch the band tighter');B('Looser',()=>setBand('tight',-1),'Make the band looser');B('Pluck',pluckBand,'Pluck the band')}
 if(v==='bottle'&&T.order.length<4)WATER.forEach((w,i)=>{if(!T.order.includes(i))B('Bottle '+(i+1),()=>tapBottle(i),`Blow across bottle ${i+1}`)});
 if(v==='drum'){B('Soft hit',()=>hit(0),'Hit the drum softly');B('Hard hit',()=>hit(1),'Hit the drum hard')}
 if(v==='sort'&&T.round<SORT.length){B('High pitch',()=>sortAs(0),'Sort it as high pitch');B('Low pitch',()=>sortAs(1),'Sort it as low pitch')}}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function grab(p){const v=part();
 if(v==='ruler'){T.moved=0;return true}
 if(v==='band'){pluckBand();return false}
 if(v==='bottle'){WATER.forEach((w,i)=>{const r=bottleR(i);if(inR(p,{x:r.x-8,y:r.y-r.h*.2,w:r.w+16,h:r.h*1.3}))tapBottle(i)});return false}
 if(v==='drum'){hit(p.x>A.W*.42?1:0);return false}
 if(v==='sort'){[0,1].forEach(b=>{if(inR(p,binR(b)))sortAs(b)});return false}return false}
function slide(p){if(part()!=='ruler')return;T.moved=1;const ex=A.W*.32,u=A.W*.58/30,L=(p.x-ex)/(u*.95);let best=0;LENS.forEach((l,i)=>{if(Math.abs(l-L)<Math.abs(LENS[best]-L))best=i});setL(best)}
const okWhen=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(list){const me=(T.run=(T.run||0)+1);let j=0;(function go(){if(me!==T.run||j>=list.length)return;const[f,ms]=list[j++];f();setTimeout(go,A.reduced()?40:ms)})()}
function clean(){const r=(T.run||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{run:r,want:()=>{},li:0,f:null,tried:[],amp:0,t:0,dur:1,thin:0,tight:0,top:false,order:[],cur:-1,blow:-1,hit:0,hard:0,soft:0,hard2:0,round:0,sorted:[]})}
const steps=[
{h:'Twang the ruler',p:'Hold a ruler on a table and twang the end. It vibrates. Change how far it sticks out.',predict:{q:'You make the ruler stick out less. The twang will be…',opts:['Higher','Lower','The same'],ans:0},task:'Twang 3 lengths',
 show:()=>{steps[0].go();chain([[twang,700],[()=>setL(2),150],[twang,700],[()=>setL(3),150],[twang,700]])},
 go:()=>{clean();voice('The ruler sticks out 25 cm. Twang it, then try shorter.');keyPad();T.want=okWhen(0,()=>T.tried.length>=3,'A shorter ruler vibrates faster, so its pitch is higher.')}},
{h:'Thin and tight',p:'An elastic band over a box makes a note. Change how thick and how tight it is.',predict:{q:'Which band makes the highest note?',opts:['A thin, tight one','A thick, loose one','A thick, tight one'],ans:0},task:'Find the highest note',
 show:()=>{steps[1].go();chain([[()=>setBand('thin',1),250],[()=>setBand('thin',1),250],[()=>setBand('tight',1),250],[()=>setBand('tight',1),250],[pluckBand,400]])},
 go:()=>{clean();voice('A thick, loose band. Pluck it, then change it.');keyPad();T.want=okWhen(1,()=>T.top,'Thinner and tighter bands vibrate faster and make higher notes.')}},
{h:'Bottle band',p:'Blow across the top of each bottle. The air inside vibrates. Put the notes in order.',predict:{q:'Blowing across bottles, which one makes the highest note?',opts:['The one with the most water','The one with the least water','They all sound the same'],ans:0},task:'Order 4 bottles',
 show:()=>{steps[2].go();chain(WATER.map((w,i)=>i).sort((a,b)=>WATER[a]-WATER[b]).map(i=>[()=>tapBottle(i),450]))},
 go:()=>{clean();voice('Tap the bottle with the lowest note first.');keyPad();T.want=okWhen(2,()=>T.order.length>=4,'Less air means a shorter column of air, faster vibrations and a higher note.')}},
{h:'Loud is not high',p:'Hit the same drum softly, then hard. Watch the loudness bar and the pitch dot.',predict:{q:'You hit the same drum harder. What changes?',opts:['It gets louder, same pitch','It gets higher','It gets lower'],ans:0},task:'Hit soft, then hard',
 show:()=>{steps[3].go();chain([[()=>hit(0),900],[()=>hit(1),500]])},
 go:()=>{clean();voice('Hit the drum softly, then hard.');keyPad();T.want=okWhen(3,()=>T.soft&&T.hard2,'Bigger vibrations are louder. The pitch only changes if the vibrations get faster or slower.')}},
{h:'High or low?',p:'Use what you found. Sort each one into high pitch or low pitch.',task:'Sort all 6',
 show:()=>{steps[4].go();chain(SORT.map(s=>[()=>sortAs(s[1]),300]))},
 go:()=>{clean();voice('Is it a high note or a low note?');keyPad();T.want=okWhen(4,()=>T.round>=SORT.length,'Short, thin, tight and small things vibrate faster and sound higher.')}},
{h:'Challenge',p:'',go:()=>{clean();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['A ruler sticks out less, then you twang it. What happens to the pitch?',[['It gets higher','ok'],['It gets lower','lower'],['Only the loudness changes','louder']]],
 ['Which elastic band makes the lowest note?',[['A thick, loose band','ok'],['A thin, tight band','thintight'],['A thin, loose band','thinloose']]],
 ['You hit a drum harder. What changes?',[['It gets louder','ok'],['It gets higher','highloud'],['It gets lower','lowloud']]],
 ['You blow across bottles. Which makes the highest note?',[['The one with most water','ok'],['The one with least water','moreair'],['The biggest bottle','bigbottle']]],
 ['What makes every sound?',[['Something vibrating','ok'],['Something getting hot','hot'],['Air keeping still','still']]],
 ['Faster vibrations make…',[['A higher pitch','ok'],['A lower pitch','fastlow'],['A quieter sound','fastquiet']]]];
function slip(t){let m='Think about how fast it vibrates.';
 if(t==='lower')m='A shorter ruler vibrates faster, so the note gets higher, not lower.';
 if(t==='louder')m='The pitch changes too. Shorter means faster vibrations and a higher note.';
 if(t==='thintight')m='Thin and tight bands vibrate fastest, so they make the highest note.';
 if(t==='thinloose')m='Thin bands are higher. The thick, loose one vibrates slowest, so it is lowest.';
 if(t==='highloud')m='Loud is not high. A harder hit makes bigger vibrations, so it is louder at the same pitch.';
 if(t==='lowloud')m='A harder hit only makes bigger vibrations. That is louder, but not lower.';
 if(t==='moreair')m='Blowing makes the air vibrate. Least water means the most air and the lowest note.';
 if(t==='bigbottle')m='The bottles are the same size. It is the length of air inside that sets the pitch.';
 if(t==='hot')m='Sounds come from vibrations, not heat. Touch your throat as you hum and feel it buzz.';
 if(t==='still')m='Still air makes no sound. Something has to vibrate.';
 if(t==='fastlow')m='Slow vibrations are low. Fast vibrations make a high pitch.';
 if(t==='fastquiet')m='How fast sets the pitch. How big the vibrations are sets the loudness.';
 return m}
function askQ(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>reply(t)});voice('Challenge: '+q);A.redraw()}
function reply(t){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+good+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=askQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:render,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;keyPad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);clean();A.gest({down:grab,move:slide,up:()=>{if(part()==='ruler'&&!T.moved)twang()}});keyPad()}});
A.start()})})();
