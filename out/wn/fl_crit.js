/* Flagship – knowing what good looks like, success criteria (ages 6–7): compare a plain card that has every part with a
   sparkly one that misses them and tap what makes the good one good; build the class list of what a good card needs,
   leaving out pretty extras; tick Ben's "finished" card off against the list to find the missing part; fix three cards
   by dragging in what the list says is missing; then make a card from blank while the list ticks itself.
   The Challenge targets the usual slips: pretty means good, done means finished without checking, the list is only for
   the end, longer is better, and a model is something to copy word for word. Every drag has a button twin. */
(()=>{
const NEED=[['to','Who it is to','To Gran'],['words','Kind words','Happy birthday!'],['pic','A picture','cake'],['from','Who it is from','From Sam']];
const DECK=[['Who it is to',1,'Gran needs to know the card is for her.'],['Glitter',0,'Glitter is pretty, but a card with no glitter can still be a good card.'],
 ['Kind words',1,'The words are the message. Without them it is just a picture.'],['Lots of pink',0,'Any colour is fine. Colour is not on the list.'],
 ['A picture',1,'A picture makes it a card to look at, not just a note.'],['Who it is from',1,'Without a name, Gran will not know who sent it!']];
const FIX=[['Mia','words'],['Leo','from'],['Ava','to']];
VIS.reg('flagcrit',c=>{let A,pad,box,qi=-1,run=0;c.fig.classList.add('young');const S={};
const part=()=>['spot','list','tick','fix','make','quiz'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const big=n=>Math.round(n*(A.narrow?1:1.15));
function write(g,t,x,y,n,al,col,wt){g.font=`${wt||800} ${big(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function panel(g,r,col,a,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* where each part lives on a card r */
function spot(r,k){const w=r.w,h=r.h;return k==='to'?{x:r.x+w*.05,y:r.y+h*.04,w:w*.6,h:h*.16}:k==='pic'?{x:r.x+w*.28,y:r.y+h*.22,w:w*.44,h:h*.34}:
 k==='words'?{x:r.x+w*.06,y:r.y+h*.58,w:w*.88,h:h*.16}:{x:r.x+w*.38,y:r.y+h*.78,w:w*.58,h:h*.17}}
function cake(g,x,y,s){const C=A.col;g.fillStyle=A.alpha(C.pk,.55);g.fillRect(x-s*.4,y-s*.05,s*.8,s*.42);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-s*.4,y-s*.05,s*.8,s*.42);
 g.fillStyle=A.alpha(C.or,.8);g.fillRect(x-s*.04,y-s*.35,s*.08,s*.3);g.strokeRect(x-s*.04,y-s*.35,s*.08,s*.3);g.fillStyle=C.am;g.beginPath();g.ellipse(x,y-s*.43,s*.05,s*.09,0,0,7);g.fill()}
/* a card: has = parts drawn; holes = draw a dashed gap where a part is missing; sparkle = glitter stars */
function card(g,r,has,o){o=o||{};const C=A.col,f=Math.max(10,Math.min(17,r.w*.085));panel(g,r,C.am,.12,o.ring?4:2.5);
 if(o.sparkle){g.font=`${Math.round(f*1.2)}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle=C.vi;[[.15,.3],[.85,.2],[.2,.85],[.8,.6],[.5,.1],[.12,.6],[.88,.88]].forEach(([u,v])=>g.fillText('✦',r.x+r.w*u,r.y+r.h*v))}
 NEED.forEach(([k,,said])=>{const s=spot(r,k);if(has.includes(k)){if(k==='pic')cake(g,s.x+s.w/2,s.y+s.h*.55,Math.min(s.w,s.h*1.4));
   else{g.font=`800 ${Math.round(f)}px system-ui,sans-serif`;g.textBaseline='middle';g.fillStyle=C.tx;g.textAlign=k==='from'?'right':k==='to'?'left':'center';
    const nm=k==='from'?'From '+(o.who||'Sam'):said;g.fillText(nm,k==='from'?s.x+s.w:k==='to'?s.x:s.x+s.w/2,s.y+s.h/2,r.w*.9)}
   if((o.found||[]).includes(k)){g.lineWidth=3;g.strokeStyle=C.gr;A.paint.rrect(s.x-3,s.y-3,s.w+6,s.h+6,8);g.stroke()}}
  else if(o.holes){g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=C.mu;A.paint.rrect(s.x,s.y,s.w,s.h,6);g.stroke();g.setLineDash([])}})}
/* the success-criteria list with a box per row: 'yes' tick, 'no' cross, or empty */
function checklist(g,r,marks,now){const C=A.col,rh=r.h/4;write(g,'Our list',r.x+r.w/2,r.y-14,13);
 NEED.forEach(([k,label],i)=>{const y=r.y+i*rh,b=Math.min(rh*.7,30),m=marks[k];if(now===k){g.fillStyle=A.alpha(C.cy,.18);A.paint.rrect(r.x,y+2,r.w,rh-4,8);g.fill()}
  g.lineWidth=2;g.strokeStyle=C.tx;A.paint.rrect(r.x+4,y+(rh-b)/2,b,b,6);g.stroke();
  if(m)write(g,m==='yes'?'✓':'✗',r.x+4+b/2,y+rh/2,17,'center',m==='yes'?C.gr:C.rd,900);write(g,label,r.x+b+12,y+rh/2,12,'left',C.tx,700)})}
/* ---- layout ---- */
const twin=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.66,w*1.55);return{x:12+i*(w+12),y:A.H*.2,w,h}};
const main=()=>A.narrow?{x:A.W*.03,y:A.H*.11,w:A.W*.52,h:A.H*.5}:{x:A.W*.04,y:A.H*.13,w:A.W*.42,h:A.H*.56};
const listR=()=>A.narrow?{x:A.W*.58,y:A.H*.15,w:A.W*.41,h:A.H*.42}:{x:A.W*.52,y:A.H*.16,w:A.W*.44,h:A.H*.44};
const chip=i=>{if(A.narrow){const w=(A.W-36)/2;return{x:12+i*(w+12),y:A.H*.68,w,h:A.H*.16}}const L=listR(),w=(L.w-8)/2;return{x:L.x+i*(w+8),y:L.y+L.h+10,w,h:Math.min(A.H*.14,60)}};
const TRAY=['to','words','pic','from','glitter'];
const trayR=i=>{const gap=6,w=(A.W-gap*6)/5;return{x:gap+i*(w+gap),y:A.H*.76,w,h:A.H*.2}};
const deckR=()=>{const w=Math.min(A.W*.62,280);return{x:A.W/2-w/2,y:A.H*.13,w,h:A.H*.16}};
const binR=i=>({x:10+i*(A.W/2),y:A.H*.4,w:A.W/2-20,h:A.H*.56});
const label=k=>k==='glitter'?'glitter':NEED.find(n=>n[0]===k)[1].toLowerCase();
const trayName=k=>k==='glitter'?'Glitter':k==='pic'?'Picture':k==='words'?'Words':k==='to'?'To ...':'From ...';
/* ---- drawing ---- */
function paint(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fdf2f8',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){const r={x:W*.3,y:H*.2,w:W*.4,h:H*.62};card(g,r,['to','words','pic','from'],{});write(g,'Know the list. Check with the list.',W/2,H*.1,15);return}
 if(v==='spot'){[0,1].forEach(i=>{const r=twin(i);write(g,i?'Card B':'Card A',r.x+r.w/2,r.y-14,14);card(g,r,i?['to','words','pic','from']:['pic'],{sparkle:!i,found:i?S.found:[]})});
  write(g,S.found.length>=4?'Card B has all 4 things!':`Found ${S.found.length} of 4 on Card B`,W/2,H*.06,15);return A.fx.draw(g)}
 if(v==='list'){if(S.k<DECK.length){const d=S.drag&&S.drag.x!=null?S.drag:null,r=deckR(),q=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;panel(g,q,C.cy,.16,3);write(g,DECK[S.k][0],q.x+q.w/2,q.y+q.h/2,17)}
  else write(g,'Our list is ready!',W/2,H*.2,17);
  ['On our list','Not needed'].forEach((t,i)=>{const b=binR(i);panel(g,b,i?C.mu:C.gr,S.bad===i?.3:.1,S.bad===i?4:2);write(g,t,b.x+b.w/2,b.y+20,14);
   S.bins[i].forEach((n,j)=>write(g,(i?'✗ ':'✓ ')+n,b.x+b.w/2,b.y+48+j*Math.min(26,b.h*.18),12,'center',C.tx,700))});return A.fx.draw(g)}
 if(v==='tick'){const r=main();write(g,'Ben: "My card is done!"',W/2,H*.05,14);card(g,r,['to','pic','from'],{who:'Ben',holes:S.r>=4});checklist(g,listR(),S.marks,NEED[S.r]&&NEED[S.r][0]);
  if(S.r<4)[['✓ It is there',C.gr],['✗ Missing',C.rd]].forEach(([t,cl],i)=>{const b=chip(i);panel(g,b,cl,S.bad===i?.32:.12);write(g,t,b.x+b.w/2,b.y+b.h/2,12)});return A.fx.draw(g)}
 if(v==='fix'||v==='make'){const r=main(),who=v==='fix'?FIX[Math.min(S.r,2)][0]:'Sam';write(g,v==='fix'?(S.r>=3?'All 3 cards fixed!':`${who}'s card. What is missing?`):'Make your card. Watch the list.',W/2,H*.05,14);
  card(g,r,S.has,{who,holes:true,sparkle:S.glit,ring:S.flash});const marks={};NEED.forEach(([k])=>{if(S.has.includes(k))marks[k]='yes';else if(v==='fix')marks[k]='no'});checklist(g,listR(),marks);
  TRAY.forEach((k,i)=>{if(S.drag&&S.drag.k===k&&S.drag.x!=null)return;const b=trayR(i),used=k!=='glitter'&&S.has.includes(k);panel(g,b,k==='glitter'?C.vi:C.or,used?.04:.16);write(g,trayName(k),b.x+b.w/2,b.y+b.h/2,11,'center',C.tx,800)});
  if(S.drag&&S.drag.x!=null){const b=trayR(TRAY.indexOf(S.drag.k));panel(g,{...b,x:S.drag.x-b.w/2,y:S.drag.y-b.h/2},C.ac,.3,3);write(g,trayName(S.drag.k),S.drag.x,S.drag.y,11)}return A.fx.draw(g)}}
/* ---- actions ---- */
function find(k){if(part()!=='spot'||S.found.includes(k))return;S.found.push(k);A.sound.pop();const l=NEED.find(n=>n[0]===k)[1];say(`Yes! Card B has ${l.toLowerCase()}. Card A does not.`);A.redraw();buttons();S.want()}
function sparkles(){if(part()!=='spot')return;A.sound.miss();say('The sparkles are pretty. But Card A does not say who it is to, has no words, and no name. Pretty is not the same as good.')}
function sortTo(bin){if(part()!=='list'||S.k>=DECK.length)return;const[t,on,why]=DECK[S.k];
 if((bin===0)!==!!on){A.sound.miss();S.bad=bin;say((on?'That one is needed. ':'Not needed. ')+why);setTimeout(()=>{S.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 S.bins[bin].push(t);S.k++;A.sound.tick();say(why);A.redraw();buttons();S.want()}
function judge(yes){if(part()!=='tick'||S.r>=4)return;const[k,label]=NEED[S.r],there=k!=='words';
 if(yes!==there){A.sound.miss();S.bad=yes?0:1;say(there?`Look again. ${label} is on Ben's card. Point to it.`:`Look again. Can you see any kind words on Ben's card? There are none.`);setTimeout(()=>{S.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 S.marks[k]=yes?'yes':'no';S.r++;A.sound.tick();say(yes?`${label}: tick.`:`${label}: missing! Ben's card is not done yet.`);A.redraw();buttons();S.want()}
function add(k){const v=part();if(v!=='fix'&&v!=='make')return;if(v==='fix'&&S.r>=3)return;
 if(k==='glitter'){S.glit=1;A.sound.miss();say(v==='fix'?'Glitter is not on the list. Look for the box with a cross.':'Glitter is fine if you like it. But it does not tick a box on the list.');return A.redraw()}
 if(S.has.includes(k)){A.sound.miss();say(`This card already has ${label(k)}. Look at the list for the missing one.`);return A.redraw()}
 const want=v==='fix'?FIX[S.r][1]:null;if(want&&k!==want){A.sound.miss();say(`Look at the list. ${label(k)} already has a tick. Find the cross.`);return A.redraw()}
 S.has.push(k);A.sound.pop();S.flash=1;
 if(v==='fix'){say(`Added ${label(k)}. Now every box has a tick.`);setTimeout(()=>{S.r++;S.flash=0;S.glit=0;if(S.r<3)S.has=NEED.map(n=>n[0]).filter(x=>x!==FIX[S.r][1]);A.redraw();buttons();S.want()},A.reduced()?20:700)}
 else{const left=NEED.filter(n=>!S.has.includes(n[0])).map(n=>n[1].toLowerCase());say(left.length?`Tick! Still to do: ${left.join(', ')}.`:'Every box is ticked. Your card is done!');buttons();S.want()}A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='spot'){NEED.forEach(([k,l])=>{if(!S.found.includes(k))B(l,()=>find(k),`On Card B: ${l}`)});B('Sparkles',sparkles,'The sparkles on Card A')}
 if(v==='list'&&S.k<DECK.length){B('✓ On our list',()=>sortTo(0),`${DECK[S.k][0]}: on our list`);B('✗ Not needed',()=>sortTo(1),`${DECK[S.k][0]}: not needed`)}
 if(v==='tick'&&S.r<4){B('✓ It is there',()=>judge(true),`${NEED[S.r][1]} is on Ben's card`);B('✗ Missing',()=>judge(false),`${NEED[S.r][1]} is missing`)}
 if((v==='fix'&&S.r<3)||(v==='make'&&S.has.length<4))TRAY.forEach(k=>B('Add '+trayName(k),()=>add(k),'Add '+label(k)+' to the card'))}
/* ---- pointer ---- */
function down(p){const v=part();
 if(v==='spot'){const b=twin(1);NEED.forEach(([k])=>{if(inside(p,spot(b,k)))find(k)});if(inside(p,twin(0)))sparkles();return false}
 if(v==='list'&&S.k<DECK.length&&inside(p,deckR())){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 if(v==='tick'){[0,1].forEach(i=>{if(inside(p,chip(i)))judge(i===0)});return false}
 if(v==='fix'||v==='make'){const i=TRAY.findIndex((k,i)=>inside(p,trayR(i)));if(i>=0){S.drag={k:TRAY[i],x:null,y:null,x0:p.x,y0:p.y};return true}}
 return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag,v=part();S.drag=null;if(!d)return;
 if(v==='list'){if(d.x==null){say('Drag the card to a box, or use the buttons.');return A.redraw()}if(p.y>A.H*.36)sortTo(p.x<A.W/2?0:1);else A.redraw()}
 if(v==='fix'||v==='make'){if(d.x==null||inside(p,main()))add(d.k);else A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(fns,gap){const me=++S.v;fns.forEach((f,j)=>setTimeout(()=>{if(me===S.v)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function fresh(){const v=(S.v||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{v,want:()=>{},found:[],k:0,bins:[[],[]],bad:-1,r:0,marks:{},has:[],glit:0,flash:0,drag:null})}
const steps=[
{h:'What a good one looks like',p:'Here are two birthday cards for Gran. One is a good one. Look closely. What does the good one have?',predict:{q:'Which is the better birthday card?',opts:['Card B: it has To, words and From','Card A: it sparkles'],ans:0},task:'Tap the 4 things that make Card B good',
 show:()=>{steps[0].go();play(NEED.map(n=>()=>find(n[0])),420)},
 go:()=>{fresh();say('Two cards for Gran. Tap the good things on Card B.');buttons();S.want=ready(0,()=>S.found.length>=4,'A good card says who it is to, has kind words and a picture, and says who it is from.')}},
{h:'Make our list',p:'This list is called success criteria. It says what a good card needs. Is each card on the list, or not needed?',task:'Sort all 6 cards',
 show:()=>{steps[1].go();play(DECK.map(d=>()=>sortTo(d[1]?0:1)),380)},
 go:()=>{fresh();say('Drag each card to On our list or Not needed.');buttons();S.want=ready(1,()=>S.k>=DECK.length,'Our list has 4 things. Pretty extras are fine, but they are not on it.')}},
{h:'Tick it off',p:'Ben says his card is done. Check it with the list, one line at a time. Is it there?',predict:{q:'Ben says his card is done. Is it?',opts:['Check it with the list first','Yes, it looks nice'],ans:0},task:'Check all 4 lines',
 show:()=>{steps[2].go();play(NEED.map(n=>()=>judge(n[0]!=='words')),420)},
 go:()=>{fresh();say('Is the first thing on the list on Ben\'s card?');buttons();S.want=ready(2,()=>S.r>=4,'The list found the gap: no kind words. Ben can add them now.')}},
{h:'Fix it',p:'Each card has one thing missing. Find the cross on the list. Drag in the part that fixes it.',task:'Fix 3 cards',
 show:()=>{steps[3].go();play(FIX.map(f=>()=>add(f[1])),900)},
 go:()=>{fresh();S.has=NEED.map(n=>n[0]).filter(x=>x!==FIX[0][1]);say("Mia's card. Find the cross on the list.");buttons();S.want=ready(3,()=>S.r>=3,'The list tells you just what to add.')}},
{h:'Look first',p:'Now make your own card. Look at the list before you start, then watch it tick as you go.',predict:{q:'When should you look at the list?',opts:['Before I start, and at the end','Only when I have finished'],ans:0},task:'Make a card that ticks every box',
 show:()=>{steps[4].go();play(['pic','to','words','from'].map(k=>()=>add(k)),420)},
 go:()=>{fresh();say('A blank card. Drag parts onto it.');buttons();S.want=ready(4,()=>S.has.length>=4,'Look first so you know the aim. Check at the end so you know you got there.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Before you make a card, what helps most?',[['Know what a good one needs','ok'],['Start as fast as you can','rush'],['Get out the glitter','pretty']]],
 ['Jo\'s card has a picture and From Jo. What is missing?',[['Who it is to, and kind words','ok'],['Nothing, it is done','done'],['More glitter','pretty']]],
 ['A good sentence needs a capital letter, finger spaces and a full stop. Kim writes "the cat sat." What is missing?',[['A capital letter','ok'],['A full stop','looked'],['Nothing','done']]],
 ['Which one is on the list for a good sentence?',[['A full stop at the end','ok'],['Written in pink','pretty'],['Very, very long','long']]],
 ['You finish your card. What do you do now?',[['Check it with the list','ok'],['Give it to Gran straight away','done'],['Make it bigger','long']]],
 ['Why look at a good one before you start?',[['To see what I am aiming for','ok'],['To copy it word for word','copy'],['It does not help','rush']]]];
function why(t){let m='Look at the list. It says what a good one needs.';
 if(t==='rush')m='Rushing in is how parts get missed. Know what good looks like first.';
 if(t==='pretty')m='Pretty is nice, but it is not on the list. Good means it has what it needs.';
 if(t==='done')m='Feeling done is not the same as done. Tick it off with the list to be sure.';
 if(t==='looked')m='Look again: the full stop is there. The first word has no capital letter.';
 if(t==='long')m='Bigger or longer is not on the list. Check each thing the list asks for.';
 if(t==='copy')m='A good one shows what to aim for. Then you make your own, with your own words.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>pick(t,b)});say('Challenge: '+q);A.redraw()}
function pick(t,b){box.querySelectorAll('.fl-pick button').forEach(z=>z.disabled=true);const ok=t==='ok',fb=box.querySelector('.fl-fb');b.classList.add(ok?'ok':'no');
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${run} right in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw:paint,onStep:A=>{box.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
