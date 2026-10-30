/* Flagship – describing aloud (ages 4–8): give Kit the details (colour, size, shape, pattern) until she can pick your
   secret toy, and see that vague words like "nice" cross nothing out; drag the voice dial so the back row hears you
   without shouting; tell an event in order (First, Next, Then, Last); sort sense words; describe a person with "with". */
(()=>{
const TOYS={items:[{c:'red',z:'big',s:'ball',d:'plain'},{c:'red',z:'small',s:'ball',d:'spotty'},{c:'blue',z:'big',s:'ball',d:'spotty'},
 {c:'red',z:'small',s:'block',d:'plain'},{c:'red',z:'big',s:'block',d:'spotty'},{c:'blue',z:'small',s:'ball',d:'plain'}],keys:['c','z','s','d'],targets:[1,4],
 chips:[['red','c','red'],['blue','c','blue'],['big','z','big'],['small','z','small'],['ball','s','ball'],['block','s','block'],['spotty','d','spotty'],['plain','d','plain'],['nice'],['fun']],
 name:t=>`${t.z} ${t.c} ${t.d} ${t.s}`};
const FOLK={items:[{h:'yellow',t:'hat',g:'glasses',j:'green'},{h:'yellow',t:'no hat',g:'glasses',j:'purple'},{h:'brown',t:'hat',g:'no glasses',j:'purple'},
 {h:'brown',t:'hat',g:'glasses',j:'green'},{h:'yellow',t:'hat',g:'no glasses',j:'purple'},{h:'brown',t:'no hat',g:'glasses',j:'green'}],keys:['h','t','g','j'],targets:[3,4],
 chips:[['yellow hair','h','yellow'],['brown hair','h','brown'],['with a hat','t','hat'],['no hat','t','no hat'],['with glasses','g','glasses'],['no glasses','g','no glasses'],['green top','j','green'],['purple top','j','purple'],['kind'],['lovely']],
 name:t=>`person with ${t.h} hair, ${t.t==='hat'?'a hat':'no hat'}, ${t.g==='glasses'?'glasses':'no glasses'} and a ${t.j} top`};
const LEVEL=['whisper','quiet voice','clear voice','big clear voice','shout'],ROOMS=[[0,1,2],[1,2,3]];
const EVENTS=[['Put my coat on','Walk to the park','Go down the slide','Go home for tea'],['Mix the cake','Bake it','Put candles on','Sing and eat it']],SLOT=['First','Next','Then','Last'];
const SENSE=['See','Hear','Smell','Touch'],WORDS=[['blue sea',0,'Blue is a colour. You see colours with your eyes.'],['gulls squawk',1,'Squawk is a sound. You hear it with your ears.'],
 ['salty air',2,'You smell the salty air with your nose.'],['hot sand',3,'Hot is how the sand feels on your feet. That is touch.'],['waves crash',1,'You can see waves, but crash is a sound. Crash is a hear word.'],['suncream smells of coconut',2,'Smells of tells you it is a smell word.']];
VIS.reg('flagdesc',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},r:0,won:0,said:[],vol:1,heard:-1,placed:[],deck:[],grab:null,sel:0,sorted:[],tip:-1}),S=B0();
const mode=()=>['toy','voice','order','sense','folk','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?1:1.15)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const G=()=>mode()==='folk'?FOLK:TOYS,tgt=()=>G().items[G().targets[Math.min(S.r,1)]];
function txt(g,t,x,y,n,al,col){g.font=`800 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function box(g,x,y,w,h,col,a){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=col;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,12);g.stroke()}
const left=()=>{const g=G();return g.items.map((t,i)=>i).filter(i=>S.said.every(([k,v])=>g.items[i][k]===v))};
function shade(n){const C=A.col;return{red:'#dc2626',blue:'#2563eb',yellow:'#facc15',brown:'#7c3f12',green:'#16a34a',purple:'#7c3aed'}[n]}
function toy(g,t,x,y,u){const r=u*(t.z==='big'?.36:.22),col=shade(t.c);
 if(t.s==='ball')A.paint.ball(x,y,r,col);else{g.fillStyle=col;g.fillRect(x-r,y-r,2*r,2*r);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x-r,y-r,2*r,2*r)}
 if(t.d==='spotty'){g.fillStyle='#fff';[[-.4,-.3],[.35,-.1],[-.1,.4]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*r,y+b*r,r*.16,0,7);g.fill()})}}
function person(g,t,x,y,u){const r=u*.2,C=A.col;g.fillStyle=shade(t.j);A.paint.rrect(x-r*1.3,y+r*.9,r*2.6,r*1.6,8);g.fill();
 g.fillStyle='#f2c9a0';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle=shade(t.h);g.beginPath();g.arc(x,y-r*.25,r*1.02,Math.PI,0);g.fill();
 if(t.g==='glasses'){g.strokeStyle='#111';g.lineWidth=2;[-.4,.4].forEach(d=>{g.beginPath();g.arc(x+d*r,y+r*.1,r*.3,0,7);g.stroke()})}
 if(t.t==='hat'){g.fillStyle=C.or;g.fillRect(x-r*1.3,y-r*1.05,r*2.6,r*.25);g.fillRect(x-r*.75,y-r*1.75,r*1.5,r*.75)}}
function cards(g){const{W,H}=A,G0=G(),L=left(),cw=(W-28)/3,ch=H*.25,u=Math.min(cw,ch*1.4);
 G0.items.forEach((t,i)=>{const x=10+(i%3)*(cw+4),y=H*.15+Math.floor(i/3)*(ch+6),me=i===G0.targets[Math.min(S.r,1)],out=!L.includes(i);
  box(g,x,y,cw,ch,me?A.col.am:A.col.ln,out?.04:.14);g.globalAlpha=out?.25:1;(mode()==='folk'?person:toy)(g,t,x+cw/2,y+ch*.46,u);g.globalAlpha=1;
  if(out){g.strokeStyle=A.col.rd;g.lineWidth=4;g.beginPath();g.moveTo(x+10,y+10);g.lineTo(x+cw-10,y+ch-10);g.stroke()}
  if(me)txt(g,'yours',x+cw/2,y+ch-fs(10),11)});
 txt(g,S.said.length?'You said: '+S.said.map(s=>s[2]).join(', '):'Kit cannot see which one is yours',W/2,H*.08,13);
 txt(g,`Kit thinks it could be ${L.length} of them`,W/2,H*.86,14)}
function room(g){const{W,H}=A,C=A.col,need=ROOMS[S.r%2];txt(g,'You',W*.12,H*.5,14);g.fillStyle=C.am;g.beginPath();g.arc(W*.12,H*.4,fs(16),0,7);g.fill();
 need.forEach((n,i)=>{const x=W*(.34+i*.22),ok=S.heard>=0&&S.heard>=n,loud=S.heard===4;
  for(let k=0;k<2;k++){const y=H*(.28+k*.22);g.fillStyle=C.cy;g.beginPath();g.arc(x,y,fs(15),0,7);g.fill();txt(g,S.heard<0?'':loud?'ouch':ok?'yes':'?',x,y,11,'center','#fff')}
  txt(g,['front','middle','back'][i],x,H*.62,12)});
 const x0=W*.1,x1=W*.9,y=H*.8;g.strokeStyle=C.ln;g.lineWidth=8;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 LEVEL.forEach((l,i)=>{const x=x0+(x1-x0)*i/4;g.fillStyle=i===4?C.rd:C.mu;g.beginPath();g.arc(x,y,5,0,7);g.fill()});
 const kx=x0+(x1-x0)*(S.vol)/4;A.paint.ball(kx,y,fs(15),S.vol===4?C.rd:C.gr);txt(g,LEVEL[S.vol],W/2,H*.92,14)}
function deckDraw(g){const{W,H}=A,C=A.col,ev=EVENTS[S.r%2],cw=(W-30)/2,ch=H*.13;
 S.deck.forEach((k,j)=>{if(S.grab&&S.grab.k===k)return;const x=10+(j%2)*(cw+10),y=H*.12+Math.floor(j/2)*(ch+6);box(g,x,y,cw,ch,C.vi,.14);txt(g,ev[k],x+cw/2,y+ch/2,12)});
 SLOT.forEach((s,i)=>{const y=H*(.5+i*.12),k=S.placed[i];box(g,10,y,W-20,H*.1,S.tip===i?C.rd:C.gr,k==null?.05:.18);txt(g,s+':',22,y+H*.05,13,'left');if(k!=null)txt(g,ev[k],W*.6,y+H*.05,12)});
 if(S.grab)txt(g,ev[S.grab.k],S.grab.x,S.grab.y,13,'center',C.vi)}
function senseDraw(g){const{W,H}=A,C=A.col,w=WORDS[S.sel];if(w){box(g,W*.15,H*.08,W*.7,H*.2,C.am,.16);txt(g,w[0],W/2,H*.18,15)}
 const bw=(W-30)/2,bh=H*.27;SENSE.forEach((s,i)=>{const x=10+(i%2)*(bw+10),y=H*.34+Math.floor(i/2)*(bh+6);box(g,x,y,bw,bh,S.tip===i?C.rd:C.cy,.12);txt(g,s,x+bw/2,y+fs(16),14);
  S.sorted.filter(j=>WORDS[j][1]===i).forEach((j,n)=>txt(g,WORDS[j][0],x+bw/2,y+fs(38)+n*fs(17),11))})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Who? What? Where? When? How did it feel?',W/2,H/2,15);return}
 if(S.won>=2){txt(g,doneText(),W/2,H/2,14);return A.fx.draw(g)}
 if(v==='toy'||v==='folk')cards(g);if(v==='voice')room(g);if(v==='order')deckDraw(g);if(v==='sense')senseDraw(g);A.fx.draw(g)}
function doneText(){return{toy:'Details help: colour, size, shape and pattern.',voice:'A clear, strong voice. Not a shout.',order:'First, Next, Then, Last.',sense:'Say what you see, hear, smell and touch.',folk:'Use "with": with a hat, with glasses.'}[mode()]}
const miss=(t,r)=>{A.sound.miss();S.tip=r==null?-1:r;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:700);A.redraw()};
function win(t){S.won++;S.r++;A.sound.pop();if(S.won>=lastN())speak(t);else{speak(t+' Next one.');setup()}buttons();A.redraw();S.want()}
const lastN=()=>mode()==='sense'?1:2;
function setup(){S.said=[];S.heard=-1;S.vol=1;S.placed=[];S.deck=mode()==='order'?[2,0,3,1]:[];S.sel=0;S.sorted=[]}
function say(ch){const v=mode();if((v!=='toy'&&v!=='folk')||S.won>=2)return;const[w,k,val]=ch,t=tgt();
 if(!k)return miss(`"${w}" does not tell Kit what it looks like. Nothing is crossed out. Say a colour, a size or a shape.`);
 if(t[k]!==val)return miss(`Look again: yours is not ${w}. That would make Kit cross out yours!`);
 if(S.said.some(s=>s[0]===k))return speak('You said that already.');const n0=left().length;S.said.push([k,val,w]);const n=left().length;A.sound.tick();
 if(n===1)return win(`Kit says: is it the ${G().name(t)}? Yes! Your details helped.`);speak(n===n0?`Kit knew that already. Try another detail.`:`Kit crossed some out. ${n} left.`);A.redraw()}
function auto(){const v=mode();if((v!=='toy'&&v!=='folk')||S.won>=2)return;const t=tgt(),k=G().keys.find(k=>!S.said.some(s=>s[0]===k));if(!k)return;say(G().chips.find(c=>c[1]===k&&c[2]===t[k]))}
function setVol(n){if(mode()!=='voice'||S.won>=2)return;S.vol=Math.max(0,Math.min(4,n));S.heard=-1;A.sound.tick();speak(LEVEL[S.vol]);A.redraw()}
function talk(){if(mode()!=='voice'||S.won>=2)return;const need=ROOMS[S.r%2][2];S.heard=S.vol;
 if(S.vol===4)return miss('That is shouting. Everyone hears, but it hurts their ears. Go one step down.');
 if(S.vol<need)return miss(S.vol<2?'A whisper only reaches the front. Speak up so the back row hears.':'The back row cannot hear yet. Use a stronger, clear voice.');
 win(`The back row heard your ${LEVEL[S.vol]}, and nobody covered their ears.`)}
function place(k){if(mode()!=='order'||S.won>=2)return;const i=S.placed.length,ev=EVENTS[S.r%2];if(k==null)k=i;
 if(k!==i){return miss(k===3?`"${ev[k]}" is how it ends. Save it for Last.`:k<i?'That card is placed already.':`Before "${ev[k]}" comes "${ev[i]}". Tell it the way it happened.`,i)}
 S.placed.push(k);S.deck=S.deck.filter(x=>x!==k);A.sound.tick();if(S.placed.length===4)return win(`First, next, then, last. Now Kit can picture it.`);speak(`${SLOT[i]}: ${ev[k]}.`);A.redraw()}
function sort(i){if(mode()!=='sense'||S.won>=1)return;const w=WORDS[S.sel];if(!w)return;if(i==null)i=w[1];
 if(i!==w[1])return miss(w[2],i);S.sorted.push(S.sel);S.sel++;A.sound.tick();if(S.sel>=WORDS.length)return win('Sense words help a listener see, hear and feel your place.');speak(`${SENSE[i]}. Next: ${WORDS[S.sel][0]}.`);buttons();A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='toy'||v==='folk')G().chips.forEach(ch=>B(ch[0],()=>say(ch),'Say '+ch[0]));
 if(v==='voice'){B('− quieter',()=>setVol(S.vol-1));B('+ louder',()=>setVol(S.vol+1));B('Speak now',talk,'Speak to the room')}
 if(v==='order')B('Put the next card',()=>place(S.deck.length?S.deck[0]:null),'Put the first card in the tray in the next empty space');
 if(v==='sense')SENSE.forEach((s,i)=>B(s,()=>sort(i),'Put it in '+s))}
function down(p){const v=mode(),{W,H}=A;if(S.won>=lastN())return false;
 if(v==='voice'&&p.y>H*.7){S.grab={vol:1};move(p);return true}
 if(v==='order'){const cw=(W-30)/2,ch=H*.13;const j=S.deck.findIndex((k,j)=>{const x=10+(j%2)*(cw+10),y=H*.12+Math.floor(j/2)*(ch+6);return p.x>x&&p.x<x+cw&&p.y>y&&p.y<y+ch});
  if(j<0)return false;S.grab={k:S.deck[j],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
 if(v==='sense'&&p.y>H*.34){const bw=(W-30)/2,bh=H*.27;sort((p.x>10+bw?1:0)+(p.y>H*.34+bh+6?2:0))}return false}
function move(p){if(!S.grab)return;if(S.grab.vol){const x0=A.W*.1,x1=A.W*.9,n=Math.round((p.x-x0)/(x1-x0)*4);if(n!==S.vol&&n>=0&&n<=4)setVol(n);return}S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;S.grab=null;if(!d)return;if(d.vol)return talk();if(Math.hypot(p.x-d.x0,p.y-d.y0)<8||p.y>A.H*.48)place(d.k);else A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*300))}
const fresh=()=>{run++;Object.assign(S,B0());setup()},rep=(n,f)=>[...Array(n)].map(()=>f);
const steps=[
{h:'Give details',p:'Kit cannot see your toy. Tap words to tell her about it. Each good detail crosses some out.',
 predict:{q:'You say, "It is nice." Can Kit find your toy?',opts:['Yes, she knows now','No: nice does not say what it looks like'],ans:1},task:'Help Kit find your toy, twice',
 show:()=>{steps[0].go();play(rep(8,auto))},go:()=>{fresh();speak('Tell Kit about your toy.');buttons();S.want=check(0,()=>S.won>=2,'Colour, size, shape and pattern help Kit picture it.')}},
{h:'Loud enough',p:'Drag the dial, or use the buttons. Then speak. Can the back row hear you?',
 predict:{q:'The back row cannot hear you. What helps most?',opts:['Shout as loud as I can','A clear, strong voice'],ans:1},task:'Make the back row hear, in 2 rooms',
 show:()=>{steps[1].go();play([()=>setVol(2),talk,()=>setVol(3),talk])},go:()=>{fresh();speak('Make the back row hear you.');buttons();S.want=check(1,()=>S.won>=2,'Speak up, but do not shout.')}},
{h:'Tell it in order',p:'Drag each card down, or tap it. Put them in the order they happened.',
 predict:{q:'Does the order you tell it matter?',opts:['No, any order is fine','Yes: Kit needs to know what came first'],ans:1},task:'Tell 2 events in order',
 show:()=>{steps[2].go();play([...[0,1,2,3].map(k=>()=>place(k)),...[0,1,2,3].map(k=>()=>place(k))])},go:()=>{fresh();speak('Put the cards in order.');buttons();S.want=check(2,()=>S.won>=2,'First, next, then, last helps a listener follow.')}},
{h:'Sense words',p:'At the beach. Is it something you see, hear, smell or touch? Tap a box.',task:'Sort all 6 words',
 show:()=>{steps[3].go();play(WORDS.map(()=>()=>sort()))},go:()=>{fresh();speak('Sort the beach words.');buttons();S.want=check(3,()=>S.won>=1,'Sense words help a listener be there with you.')}},
{h:'Describe a person',p:'Kit is looking for someone. Use "with" to add details: with a hat, with glasses.',task:'Help Kit find the person, twice',
 show:()=>{steps[4].go();play(rep(8,auto))},go:()=>{fresh();speak('Tell Kit about the person.');buttons();S.want=check(4,()=>S.won>=2,'"With a hat" and "with glasses" are details Kit can see.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which tells Kit the most about your dog?',[['A big brown dog with a red collar','ok'],['A nice dog','vague'],['A dog','bare']]],
 ['The back row cannot hear you. What should you do?',[['Speak up in a clear voice','ok'],['Shout as loud as you can','shout'],['Speak faster','fast']]],
 ['Which comes First when you tell about planting a seed?',[['Dig a hole','ok'],['Water it','mid'],['It grows into a flower','end']]],
 ['"The bells ring." Is that a see, hear or touch word?',[['Hear','ok'],['See','seebell'],['Touch','touch']]],
 ['Which sentence says how you felt and why?',[['I felt happy because Gran came','ok'],['Gran came','nofeel'],['I felt happy','nowhy']]]];
function why(t){let m='Think about what helps the listener picture it.';
 if(t==='vague')m='Nice does not tell Kit what the dog looks like. Say its size, colour and what it has.';
 if(t==='bare')m='Just "a dog" could be any dog. Add details like big, brown, with a red collar.';
 if(t==='shout')m='Shouting hurts ears. A clear, strong voice reaches the back.';
 if(t==='fast')m='Speaking fast makes it harder to follow. Slow down and speak up.';
 if(t==='mid')m='You water it after it is in the soil. First you dig a hole.';
 if(t==='end')m='Growing is how it ends. Tell it Last.';
 if(t==='seebell')m='You may see a bell, but ring is a sound. Ring is a hear word.';
 if(t==='touch')m='Ring is a sound, so it is a hear word, not touch.';
 if(t==='nofeel')m='That says what happened, but not how you felt.';
 if(t==='nowhy')m='Good feeling word! Add because to say why.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That helps the listener.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
