/* Flagship – many cultures, traditions and beliefs (ages 9–11): sort a culture iceberg (what you can see above the
   water, what people believe below it); match festivals from different faiths and countries to the shared reason behind
   them; hear the other child's side when a habit looks "weird"; sort curious questions from put-downs and stereotypes;
   and trace everyday things (paper, the digits 0–9, potatoes, coffee) back to the cultures that first made them.
   Every drag or tap has a button twin, and the canvas label always says what just happened. */
(()=>{
const ICE=[['Food people eat',0],['Beliefs about right and wrong',1],['Clothes for special days',0],['Why a festival matters',1],
 ['Music and dance',0],['How to show respect to elders',1],['The language people speak',0],['What makes a good life',1]];
const FEST=[['Diwali: rows of little lamps called diyas',0],['Lunar New Year: red envelopes and a family feast',1],['Chuseok: Korean families share the new rice',2],
 ['Hanukkah: one more candle each night for 8 nights',0],['Nowruz: the new year starts on the first day of spring',1],['Pongal: rice boils until the pot spills over',2],['Sukkot: meals in a hut hung with fruit',2]];
const FESTWHY=['a festival of lights','the start of a new year','a thank-you for the harvest'];
const VIEW=[{a:'Sam',b:'Aiko',said:'You take your shoes off at home? Odd!',side:'In Japan most homes are shoes-off. Shoes inside feel odd to me!'},
 {a:'Ben',b:'Priya',said:'You eat rice with your hand? Weird!',side:'My family eats with the right hand. It is how we feel the food.'},
 {a:'Ivy',b:'Kenji',said:'Fish and soup for breakfast? Strange!',side:'That is a normal breakfast at my gran\'s house. Cold cereal is new to me!'},
 {a:'Leo',b:'Amara',said:'Why call Mrs Ade Auntie? She is not your aunt!',side:'In my family we call grown-ups Auntie to show respect. First names feel rude to me.'}];
const TALK=[['What does this festival mean to your family?',0],['Ew, your lunch smells weird.',1],['Everyone from China eats rice every day, right?',2],
 ['Can you teach me to say hello in your language?',0],['That is a strange thing to wear.',1],['How do you celebrate at your house?',0],['People from your country are all good at maths.',2],['Your name is too hard. I will call you Jo.',1]];
const TALKBIN=['Curious and kind','Put-down','Stereotype'],TALKWHY=['asks to learn, with respect','makes fun of something new','treats everyone in a group as the same'];
const REG=['China','India','Mexico and Central America','Andes, South America','Ethiopia, Africa'];
const ORIG=[['Paper',0,'Paper was first made in China about 2000 years ago.'],['The digits 0 to 9',1,'Our digits, with zero, began in India and came west through Arabic scholars.'],
 ['Corn (maize)',2,'Farmers in Mexico grew corn from a wild grass about 9000 years ago.'],['Potatoes',3,'Potatoes were first farmed high in the Andes, in Peru and Bolivia.'],
 ['The coffee plant',4,'The coffee plant first grew wild in the hills of Ethiopia.'],['Tea',0,'Tea leaves were first brewed in south-west China.']];
VIS.reg('flagcult',c=>{let A,keys,qa,qk=-1,tok=0,chain=0;
const fresh=()=>({want:()=>{},won:0,r:0,grab:null,bad:-1,v:0,heard:false,placed:[]}),S=fresh();
const mode=()=>['ice','fest','view','talk','orig','quiz'][A.step],rm=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.12));
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({ice:6,fest:6,view:4,talk:6,orig:5}[mode()]||9);
function word(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function split(g,t,maxw,n){g.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[''];t.split(' ').forEach(w=>{const k=out.length-1,nx=out[k]?out[k]+' '+w:w;if(g.measureText(nx).width>maxw&&out[k])out.push(w);else out[k]=nx});return out}
function block(g,t,x,y,n,maxw,col){const ls=split(g,t,maxw,n),lh=fz(n)*1.25;ls.forEach((l,i)=>word(g,l,x,y+(i-(ls.length-1)/2)*lh,n,col))}
function box(g,r,warn,fill){const C=A.col;g.fillStyle=fill||(C.dark?'#1e293b':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=warn?C.rd:C.ln;g.lineWidth=warn?5:2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* the card being sorted: drag it, or tap it then tap a bin */
const deck=()=>({ice:ICE,fest:FEST,talk:TALK,orig:ORIG}[mode()]);
function cardRect(){const g=A.ctx,t=deck()[S.r%deck().length][0],ls=split(g,t,A.W*.7,15),w=Math.min(A.W-20,Math.max(...ls.map(l=>g.measureText(l).width))+30),h=fz(15)*(1.3+ls.length*1.25),y=mode()==='ice'?A.H*.03:A.H*.04;
 return S.grab&&S.grab.x!=null?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:(A.W-w)/2,y,w,h}}
function drawCard(g){const r=cardRect();A.paint.shadow(10,3,.2);box(g,r,false,A.col.dark?'#334155':'#fef3c7');A.paint.noShadow();block(g,deck()[S.r%deck().length][0],r.x+r.w/2,r.y+r.h/2,15,A.W*.7,A.col.dark?'#f8fafc':'#111827')}
/* ---- 1 iceberg ---- */
const sea=()=>A.H*.5;
function iceBins(){return[{x:A.W*.18,y:A.H*.3,w:A.W*.64,h:sea()-A.H*.3},{x:A.W*.06,y:sea()+4,w:A.W*.88,h:A.H*.48}]}
function drawIce(g){const C=A.col,W=A.W,H=A.H,y0=sea(),top=H*.2;g.fillStyle='#e0f2fe';g.fillRect(0,top,W,y0-top);g.fillStyle=C.dark?'#7dd3fc':'#bae6fd';g.fillRect(0,y0,W,H-y0);
 g.fillStyle='#f8fafc';g.strokeStyle='#64748b';g.lineWidth=2;g.beginPath();g.moveTo(W*.5,H*.25);g.lineTo(W*.72,y0);g.lineTo(W*.95,H*.92);g.lineTo(W*.5,H*.99);g.lineTo(W*.05,H*.9);g.lineTo(W*.28,y0);g.closePath();g.fill();g.stroke();
 const b=iceBins();word(g,'Above: you can see it',W/2,top+fz(10),12,'#0f172a',800);word(g,'Below: hidden, but it shapes the rest',W/2,y0+fz(12),12,'#0f172a',800);
 S.placed.forEach(([t,k],i)=>{const n=S.placed.filter((q,j)=>q[1]===k&&j<i).length;word(g,t,W/2,k?y0+fz(34)+n*fz(17):b[0].y+fz(26)+n*fz(15),11,'#1e293b',700)});
 if(S.bad>=0){g.strokeStyle=C.rd;g.lineWidth=5;const r=b[S.bad];A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
 drawCard(g);word(g,`${S.won} of ${need()} sorted`,W-12,H-fz(10),11,'#0f172a',700,'right')}
/* ---- 2 festivals ---- */
function festBins(){const n=3,gp=8,w=(A.W-20-gp*2)/n,h=A.H*.38;return[0,1,2].map(k=>({x:10+k*(w+gp),y:A.H*.56,w,h}))}
const ICON=['🪔','🎆','🌾'];
function drawFest(g){const C=A.col;festBins().forEach((r,k)=>{box(g,r,S.bad===k);word(g,ICON[k],r.x+r.w/2,r.y+fz(20),20);block(g,['Festival of lights','A new year begins','Harvest thanks'][k],r.x+r.w/2,r.y+fz(50),13,r.w-12);
  const got=S.placed.filter(p=>p[1]===k);got.forEach((p,i)=>word(g,p[0].split(':')[0],r.x+r.w/2,r.y+fz(80)+i*fz(16),11,C.mu,700))});
 drawCard(g);word(g,`${S.won} of ${need()} matched`,A.W/2,A.H*.5,12,C.mu,700)}
/* ---- 3 two sides ---- */
function bubble(g,t,x,y,w,col){const ls=split(g,t,w-20,13),h=fz(13)*(1+ls.length*1.25);box(g,{x:x-w/2,y:y-h/2,w,h},false,col);ls.forEach((l,i)=>word(g,l,x,y+(i-(ls.length-1)/2)*fz(13)*1.25,13,'#111827'))}
function face(g,x,y,r,col,smile,name){A.paint.ball(x,y,r,col);g.fillStyle='#111';[-1,1].forEach(s=>{g.beginPath();g.arc(x+s*r*.32,y-r*.15,r*.09,0,7);g.fill()});
 g.strokeStyle='#111';g.lineWidth=Math.max(2,r*.09);g.beginPath();if(smile)g.arc(x,y+r*.08,r*.36,.4,2.7);else{g.moveTo(x-r*.3,y+r*.38);g.lineTo(x+r*.3,y+r*.3)}g.stroke();word(g,name,x,y+r+fz(12),12,A.col.tx,800)}
const kidA=()=>({x:A.W*.22,y:A.H*.74}),kidB=()=>({x:A.W*.78,y:A.H*.74});
function drawView(g){const C=A.col,p=VIEW[S.v%VIEW.length],r=A.H*.08,bw=A.narrow?A.W*.9:A.W*.56;
 face(g,kidA().x,kidA().y,r,C.or,S.heard,p.a);face(g,kidB().x,kidB().y,r,C.cy,true,p.b);
 bubble(g,p.a+': '+(S.heard?'Oh! That is new to me. Tell me more!':p.said),A.narrow?A.W/2:A.W*.32,A.H*.16,bw,S.heard?'#dcfce7':'#fee2e2');
 if(S.heard)bubble(g,p.b+': '+p.side,A.narrow?A.W/2:A.W*.66,A.H*.42,bw,'#e0f2fe');else word(g,`Tap ${p.b} to hear the other side`,A.W/2,A.H*.42,13,C.mu,700);
 word(g,`${S.won} of ${need()} heard`,A.W/2,A.H*.97,11,C.mu,700)}
function hear(){if(mode()!=='view'||S.won>=need()||S.heard)return;const p=VIEW[S.v%VIEW.length],t=++chain;S.heard=true;S.won++;A.sound.pop();
 tell(`${p.b}: ${p.side} ${p.a} now asks to learn more.`);A.redraw();buttons();
 setTimeout(()=>{if(t!==chain)return;S.v++;S.heard=false;buttons();A.redraw();S.want()},rm()?20:850)}
/* ---- 4 talk ---- */
function talkBins(){const n=3,gp=8,w=(A.W-20-gp*2)/n,h=A.H*.3;return[0,1,2].map(k=>({x:10+k*(w+gp),y:A.H*.64,w,h}))}
function drawTalk(g){const C=A.col;talkBins().forEach((r,k)=>{box(g,r,S.bad===k,[C.dark?'#14532d':'#dcfce7',C.dark?'#7f1d1d':'#fee2e2',C.dark?'#713f12':'#fef9c3'][k]);
  word(g,['💬','👎','🏷️'][k],r.x+r.w/2,r.y+r.h*.3,20);block(g,TALKBIN[k],r.x+r.w/2,r.y+r.h*.68,13,r.w-10)});drawCard(g);word(g,`${S.won} of ${need()} sorted`,A.W/2,A.H*.56,12,C.mu,700)}
/* ---- 5 origins ---- */
function regBins(){const w=A.narrow?(A.W-30)/2:(A.W-40)/3,h=A.H*(A.narrow?.15:.2),at=A.narrow?[[1,0],[0,1],[0,2],[1,1],[1,2]]:[[2,0],[1,0],[0,0],[0,1],[1,1]],top=A.H*(A.narrow?.4:.4);
 return at.map(([col,row])=>({x:10+col*(w+10)+(A.narrow&&row===0?-(w+10)/2:0),y:top+row*(h+10),w,h}))}
function drawOrig(g){const C=A.col;regBins().forEach((r,k)=>{box(g,r,S.bad===k,C.dark?'#1e3a5f':'#e0f2fe');block(g,REG[k],r.x+r.w/2,r.y+r.h*.35,13,r.w-12);
  const got=S.placed.filter(p=>p[1]===k).map(p=>p[0]).join(', ');if(got)block(g,got,r.x+r.w/2,r.y+r.h*.75,11,r.w-12,C.tx)});
 drawCard(g);word(g,`${S.won} of ${need()} traced`,A.W/2,A.H*.33,12,C.mu,700)}
/* ---- filing ---- */
function file(k){const v=mode();if(!deck()||S.won>=need())return;const[t,ans]=deck()[S.r%deck().length];
 if(k!==ans){let m='';
  if(v==='ice')m=ans?`"${t}" is hidden: you cannot see a belief, but it shapes the food, clothes and festivals.`:`"${t}" is something you can see or hear, so it sits above the water.`;
  if(v==='fest')m=`${t.split(':')[0]} is ${FESTWHY[ans]}. Different cultures can share the same reason to celebrate.`;
  if(v==='talk')m=`This one ${TALKWHY[ans]}. ${ans===0?'It asks to learn more, so it is curious and kind.':ans===1?'It makes the other child feel odd for being different.':'It says everyone in a group is the same, which is never true.'}`;
  if(v==='orig')m=`Not there. ${ORIG[S.r%ORIG.length][2]}`;
  return miss(m,k)}
 S.placed.push([t.split(':')[0].replace(/ \(.*\)/,''),k]);const done=v==='orig'?ORIG[S.r%ORIG.length][2]:v==='fest'?`Yes! ${t.split(':')[0]} is ${FESTWHY[k]}.`:v==='talk'?`Yes! It ${TALKWHY[k]}.`:`Yes! ${k?'Hidden below the water.':'You can see it.'}`;
 S.won++;S.r++;A.sound.pop();tell(S.won<need()?done+' Next one.':done);buttons();A.redraw();S.want()}
function miss(t,b){A.sound.miss();S.bad=b==null?-1:b;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},rm()?10:900);A.redraw()}
const bins=()=>({ice:iceBins,fest:festBins,talk:talkBins,orig:regBins}[mode()]||(()=>[]))();
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
 if(v==='quiz'){['🪔','🎆','🌾','🍵','🌽'].forEach((e,i)=>word(g,e,W*(.15+i*.175),H*.38,28));word(g,'Curious, not judging.',W/2,H*.7,16,C.tx,800);return}
 if(S.won>=need()){block(g,{ice:'Most of a culture is below the water.',fest:'Different ways, same big reasons.',view:'Normal depends on where you grew up.',talk:'Ask to learn, not to judge.',orig:'Your day is full of ideas from other cultures.'}[v],W/2,H/2,16,W-40);return A.fx.draw(g)}
 ({ice:drawIce,fest:drawFest,view:drawView,talk:drawTalk,orig:drawOrig})[v](g);A.fx.draw(g)}
function buttons(){if(!keys)return;keys.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz'||S.won>=need())return;
 if(v==='ice')['Above: can see','Below: hidden'].forEach((t,i)=>B(t,()=>file(i),i?'Below the water: hidden':'Above the water: you can see it'));
 if(v==='fest')['🪔 Lights','🎆 New year','🌾 Harvest'].forEach((t,i)=>B(t,()=>file(i),['Festival of lights','A new year begins','Harvest thanks'][i]));
 if(v==='view'&&!S.heard){const p=VIEW[S.v%VIEW.length];B(`Hear ${p.b}'s side`,hear)}
 if(v==='talk')TALKBIN.forEach((t,i)=>B(t,()=>file(i)));
 if(v==='orig')REG.forEach((t,i)=>B(t,()=>file(i),'From '+t))}
function down(p){const v=mode();if(S.won>=need())return false;
 if(v==='view'){const r=A.H*.1;if(Math.hypot(p.x-kidB().x,p.y-kidB().y)<r*1.4)hear();else if(Math.hypot(p.x-kidA().x,p.y-kidA().y)<r*1.4&&!S.heard)miss(`${VIEW[S.v%VIEW.length].a} has said what they think. Tap ${VIEW[S.v%VIEW.length].b} to hear the other side.`);return false}
 if(!deck())return false;if(hit(p,cardRect())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}const k=bins().findIndex(r=>hit(p,r));if(k>=0)file(k);return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.x==null){tell('Now tap the place it belongs.');return A.redraw()}const k=bins().findIndex(r=>hit(p,r));if(k>=0)file(k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},rm()?j*40+30:(j+1)*(gap||300)))}
const reset=()=>{tok++;chain++;Object.assign(S,fresh())};
const steps=[
{h:'The culture iceberg',p:'A culture is the way of life a group shares. Some of it you can see. Drag each card above or below the water.',predict:{q:'Is a culture mostly what you can see, like food and clothes?',opts:['Yes, that is most of it','No, most of it is hidden'],ans:1},task:'Sort 6 cards',
 show:()=>{steps[0].go();demo(ICE.slice(0,6).map(([,k])=>()=>file(k)),320)},go:()=>{reset();tell('Can you see it, or is it hidden?');buttons();S.want=ready(0,()=>S.won>=6,'Beliefs sit below and shape what you see.')}},
{h:'Same reason, different ways',p:'Festivals look different around the world. Many share a reason. Match each one to its big idea.',task:'Match 6 festivals',
 show:()=>{steps[1].go();demo(FEST.slice(0,6).map(([,k])=>()=>file(k)),320)},go:()=>{reset();tell('What is this festival for?');buttons();S.want=ready(1,()=>S.won>=6,'Lights, new years and harvests are shared ideas.')}},
{h:'Strange to whom?',p:'A habit can look odd when it is new to you. Tap the other child to hear their side.',predict:{q:'Is the way your family does things the normal way?',opts:['Yes, it is how most people do it','It is one normal way of many'],ans:1},task:'Hear 4 sides',
 show:()=>{steps[2].go();demo([0,1,2,3].map(()=>hear),1000)},go:()=>{reset();tell('Someone thinks a habit is weird.');buttons();S.want=ready(2,()=>S.won>=4,'Weird often just means new to me.')}},
{h:'Curious or unkind?',p:'Some questions open a door. Some shut it. Sort each thing a child says.',predict:{q:'Is it rude to ask about someone\'s culture?',opts:['Yes, best not to ask','No, if you ask with respect'],ans:1},task:'Sort 6 comments',
 show:()=>{steps[3].go();demo(TALK.slice(0,6).map(([,k])=>()=>file(k)),320)},go:()=>{reset();tell('Curious, put-down, or stereotype?');buttons();S.want=ready(3,()=>S.won>=6,'Kind questions help you learn.')}},
{h:'Where did it come from?',p:'Lots of things you use every day came from other cultures. Drag each one to where it began.',predict:{q:'Where were the digits 0 to 9 we use first made?',opts:['In Europe','In India'],ans:1},task:'Trace 5 things',
 show:()=>{steps[4].go();demo(ORIG.slice(0,5).map(([,k])=>()=>file(k)),360)},go:()=>{reset();tell('Where did this begin?');buttons();S.want=ready(4,()=>S.won>=5,'Learning from others made all our lives richer.')}},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Priya eats rice with her right hand at lunch. What is a curious, kind thing to say?',[['Is that how your family eats? Can you show me?','ok'],['That is messy and weird.','weird'],['Say nothing, but pull a face.','face']]],
 ['Which part of a culture is hardest to see?',[['What people believe matters most','ok'],['The food they cook','food'],['The clothes they wear on festival days','clothes']]],
 ['Diwali and Hanukkah are both festivals of lights. What does this show?',[['Different cultures can share the same big idea','ok'],['They are the same festival','same'],['One of them is the real one','real']]],
 ['Why does a class with many cultures help everyone learn?',[['You meet more ideas, words and ways to solve problems','ok'],['Everyone has to give up their own culture','giveup'],['It makes no difference','nothing']]],
 ['Someone says: "Everyone from Japan eats sushi every day." What is wrong?',[['It treats a whole country as if everyone is the same','ok'],['Nothing, it is a fact','fact'],['It is fine, because sushi is nice','nice']]],
 ['Your habits seem strange to a child from far away. What does that show?',[['Normal depends on where you grew up','ok'],['Your way is the right way','right'],['Their way is wrong','wrong']]]];
function reason(t){return{weird:'Calling it weird is a put-down. Ask about it instead: you might learn a new way.',face:'A face says "weird" without words. Show interest with a kind question.',
 food:'You can see and taste food. Beliefs and values sit below the water, and they shape the food.',clothes:'You can see clothes. What people believe and value is hidden, like the base of an iceberg.',
 same:'They come from different faiths and stories. They share an idea, light, not a story.',real:'Each one is real for the people who keep it. Cultures can share an idea in their own ways.',
 giveup:'Nobody has to give up their culture. Sharing adds ideas; it does not take any away.',nothing:'More cultures means more ideas, words and ways of seeing a problem. Everyone gains.',
 fact:'People in one country are all different. That is a stereotype, not a fact.',nice:'Even a nice-sounding idea treats everyone in a group as the same. That is a stereotype.',
 right:'Your way is normal where you grew up. It is one way, not the only right way.',wrong:'Different is not wrong. Their way is normal where they grew up, just like yours.'}[t]||'Think: does it ask to learn, and does it treat each person as their own?'}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);A.redraw()}
let run=0;
function grade(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Curious and fair.':'✗ '+reason(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
