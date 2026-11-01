/* Flagship – heavy and light, full and empty (ages 3–4): put two things on a balance and see the heavier side go DOWN
   and the lighter side go UP; find that big does not always mean heavy (a big balloon is lighter than a small stone);
   fill and empty a cup to full, empty and half full with a halfway line; then name how full a jar, bowl or cup is.
   Challenge on the usual slips: bigger means heavier, "up means heavier", nearly full called full, a little left called empty. */
(()=>{
const HEAVIER=[[['📕','book',6,1],['🪶','feather',1,1]],[['🍎','apple',3,1],['🧱','brick',9,1]],[['🍉','melon',8,1.25],['🍒','cherry',1,.75]]];
const TRICKY=[[['🎈','balloon',1,1.6],['🪨','stone',7,.7]],[['🔨','hammer',8,.8],['📦','empty box',1,1.6]],[['🧽','sponge',1,1.5],['🥫','tin of beans',6,.75]]];
const LIGHTER=[[['🎃','pumpkin',8,1.3],['🍃','leaf',1,.8]],[['🧽','sponge',1,1.3],['🪨','stone',7,.8]],[['🍌','banana',2,1],['🍉','melon',8,1.2]]];
const AIMS=[[1,'full'],[0,'empty'],[.5,'half full']],POTS=[['jar',1],['bowl',0],['cup',.5],['jar',0],['bowl',.5],['cup',1]];
VIS.reg('flagheavy',c=>{let A,pad,quiz,qn=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,want:()=>{},k:0,on:[0,0],tilt:0,wrong:-1,got:0,lvl:.25,aim:0,pot:0,hold:null,spill:0};
const view=()=>['pair','tricky','light','fill','name','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.1:1.25));
function word(g,s,x,y,n,col,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function box(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(x,y,w,h,14);g.stroke()}
const within=(p,x,y,w,h)=>p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h;
const list=()=>view()==='tricky'?TRICKY:view()==='light'?LIGHTER:HEAVIER,pair=()=>list()[Math.min(S.k,2)];
const askLight=()=>view()==='light';
const cardAt=i=>({x:A.W*(i?.56:.06),y:A.H*.03,w:A.W*.38,h:A.H*.27});
function beam(){const cx=A.W/2,cy=A.H*.47,L=A.W*.3,a=S.tilt*.22,drop=A.H*.13;
 return{cx,cy,L,a,pans:[{x:cx-L*Math.cos(a),y:cy-L*Math.sin(a)+drop},{x:cx+L*Math.cos(a),y:cy+L*Math.sin(a)+drop}],drop}}
function settle(){const[l,r]=pair(),wl=S.on[0]?l[2]:0,wr=S.on[1]?r[2]:0,to=wl===wr?0:wr>wl?1:-1;A.tween(S,{tilt:to},A.reduced()?1:700,'back')}
function drawScale(g){const C=A.col,b=beam(),[l,r]=pair();g.strokeStyle=C.tx;g.lineWidth=3;
 g.fillStyle=A.alpha(C.or,.35);g.beginPath();g.moveTo(b.cx,b.cy);g.lineTo(b.cx-A.W*.07,A.H*.86);g.lineTo(b.cx+A.W*.07,A.H*.86);g.closePath();g.fill();g.stroke();
 g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(b.pans[0].x,b.pans[0].y-b.drop);g.lineTo(b.pans[1].x,b.pans[1].y-b.drop);g.stroke();g.lineCap='butt';
 b.pans.forEach((p,i)=>{const w=A.W*.17;g.lineWidth=1.5;g.beginPath();g.moveTo(p.x,p.y-b.drop);g.lineTo(p.x-w/2,p.y);g.moveTo(p.x,p.y-b.drop);g.lineTo(p.x+w/2,p.y);g.stroke();
  g.fillStyle=A.alpha(i?C.vi:C.cy,.3);g.beginPath();g.ellipse(p.x,p.y,w/2,A.H*.03,0,0,7);g.fill();g.lineWidth=S.wrong===i?4:2;g.strokeStyle=S.wrong===i?C.rd:C.tx;g.stroke();g.strokeStyle=C.tx;
  const it=i?r:l;if(S.on[i])word(g,it[0],p.x,p.y-A.H*.075*it[3],32*it[3])});
 if(S.on[0]&&S.on[1]){const d=S.tilt>.5?1:S.tilt<-.5?0:-1;if(d>=0){word(g,'⬇ down',b.pans[d].x,b.pans[d].y+A.H*.07,12,C.tx,800);word(g,'⬆ up',b.pans[1-d].x,b.pans[1-d].y+A.H*.07,12,C.tx,800)}}}
function vessel(g,kind,lv,x,y,w,h){const C=A.col,cw=kind==='jar'?w*.5:kind==='bowl'?w:w*.7,ch=kind==='jar'?h:kind==='bowl'?h*.5:h*.75,bx=x+(w-cw)/2,by=y+(h-ch);
 g.save();A.paint.rrect(bx,by,cw,ch,kind==='bowl'?ch*.45:10);g.clip();if(lv>0){g.fillStyle=A.alpha(C.cy,.55);g.fillRect(bx,by+ch*(1-lv),cw,ch*lv+2)}g.restore();
 g.lineWidth=3;g.strokeStyle=C.tx;A.paint.rrect(bx,by,cw,ch,kind==='bowl'?ch*.45:10);g.stroke();return{bx,by,cw,ch}}
function paint(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'⬇ heavier   ⬆ lighter',W/2,H*.36,18,C.tx,800);word(g,'full · half full · empty',W/2,H*.56,15,C.tx,700);return}
 if(v==='pair'||v==='tricky'||v==='light'){const p=pair();p.forEach((it,i)=>{const r=cardAt(i);box(g,r.x,r.y,r.w,r.h,A.alpha(i?C.vi:C.cy,.12),C.tx);
   if(!S.on[i]&&!(S.hold&&S.hold.i===i))word(g,it[0],r.x+r.w/2,r.y+r.h*.45,34*it[3]);word(g,S.on[i]?'on the scale':it[1],r.x+r.w/2,r.y+r.h*.86,11,C.tx,600)});
  drawScale(g);if(S.hold)word(g,p[S.hold.i][0],S.hold.x,S.hold.y,26*p[S.hold.i][3]);
  word(g,(askLight()?'Which is lighter?':'Which is heavier?')+'  Done '+S.got+' of 3',W/2,H*.94,13,C.tx,800)}
 if(v==='fill'){const r=vessel(g,'cup',S.lvl,W*.25,H*.08,W*.5,H*.7);g.setLineDash([7,6]);g.lineWidth=2;g.strokeStyle=C.tx;const hy=r.by+r.ch/2;g.beginPath();g.moveTo(r.bx-14,hy);g.lineTo(r.bx+r.cw+14,hy);g.stroke();g.setLineDash([]);
  word(g,'half',r.bx+r.cw+34,hy,11,C.tx,700);word(g,'top',r.bx+r.cw+30,r.by+8,11,C.tx,700);
  word(g,'Make it '+AIMS[Math.min(S.aim,2)][1].toUpperCase(),W/2,H*.86,16,C.tx,800);word(g,'Done '+S.aim+' of 3',W/2,H*.95,11,C.tx,600)}
 if(v==='name'){const[k,lv]=POTS[S.pot%POTS.length];vessel(g,k,lv,W*.3,H*.06,W*.4,H*.5);word(g,'Is it full, half full or empty?',W/2,H*.63,14,C.tx,800);
  ['Full','Half full','Empty'].forEach((t,i)=>{const w=(W-30)/3,x=6+i*(w+9);box(g,x,H*.71,w,H*.2,A.alpha(C.gr,.16),S.wrong===i?C.rd:C.tx,S.wrong===i?4:2);word(g,t,x+w/2,H*.81,16,C.tx,800)});
  word(g,'Right: '+S.got+' of 3',W/2,H*.96,11,C.tx,600)}
 A.fx.draw(g)}
const miss=t=>{A.sound.miss();tell(t);A.redraw()},hit=t=>{A.sound.pop();tell(t);keys();A.redraw();S.want()};
function place(i){S.hold=null;if(S.on[i]||S.got>=3)return A.redraw();S.on[i]=1;S.wrong=-1;A.sound.tick();settle();const it=pair()[i];
 tell(S.on[1-i]?`Both on. Which side went down?`:`The ${it[1]} is on. Its side goes down. Now put on the other one.`);keys();A.redraw()}
function choose(i){if(S.got>=3)return;const p=pair(),me=p[i],other=p[1-i];if(!(S.on[0]&&S.on[1]))return miss('Put both on the scale first. Then look which side goes down.');
 const heavy=me[2]>other[2];if(heavy!==!askLight()){S.wrong=i;
  if(askLight())return miss(`The ${me[1]} side went down, so the ${me[1]} is heavier. The lighter one goes up.`);
  return miss(me[3]>other[3]?`The ${me[1]} looks bigger, but its side went up. Up means lighter. Big things can be light.`:`The ${me[1]} side went up. The heavier side goes down.`)}
 S.wrong=-1;S.got++;const msg=askLight()?`Yes! The ${me[1]} went up. It is lighter than the ${other[1]}.`:`Yes! The ${me[1]} went down. It is heavier than the ${other[1]}.`;
 if(S.got<3){const t=S.tok;setTimeout(()=>{if(t===S.tok){S.k=S.got;S.on=[0,0];S.tilt=0;keys();A.redraw()}},A.reduced()?20:700)}hit(msg)}
function pour(d){if(S.aim>=3)return;const was=S.lvl;S.lvl=Math.max(0,Math.min(1,Math.round((S.lvl+d)*4)/4));A.sound.tick();
 if(d>0&&was>=1){A.fx.add(10,i=>({x:A.W*(.35+i*.03),y:A.H*.1,vx:(i%2?1:-1)*80,vy:-60,g:600,life:.7,r:3,col:A.col.cy}));tell('It is full! Any more spills over the top.')}
 else tell(S.lvl>=1?'Water at the top.':S.lvl<=0?'No water left.':S.lvl===.5?'Water at the half line.':S.lvl>.5?'Above the half line.':'A little water.');A.redraw()}
function check(){if(S.aim>=3)return;const[g,n]=AIMS[S.aim],l=S.lvl;if(l===g){S.aim++;return hit(n==='full'?'Full: right up to the top.':n==='empty'?'Empty: nothing inside at all.':'Half full: water up to the middle line.')}
 if(n==='full')return miss(l>=.75?'Nearly! Full means right up to the top. Pour in a bit more.':'Not full yet. Keep pouring until the water reaches the top.');
 if(n==='empty')return miss(l<=.25?'A little water is still in. Empty means none at all.':'Pour it all out. Empty means nothing inside.');
 miss(l>.5?'Too much. Half full stops at the middle line.':'Not yet. Fill up to the middle line.')}
function nameIt(i){if(S.got>=3)return;const lv=POTS[S.pot%POTS.length][1],ans=lv===1?0:lv===0?2:1;
 if(i!==ans){S.wrong=i;return miss(ans===0?'The water is right at the top, so it is full.':ans===2?'There is no water inside, so it is empty.':'The water stops in the middle, so it is half full.')}
 S.wrong=-1;S.got++;S.pot++;hit(['Full!','Half full!','Empty!'][i]+' You named it.')}
function keys(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='pair'||v==='tricky'||v==='light'){if(S.got>=3)return;const p=pair();p.forEach((it,i)=>{if(!S.on[i])B(it[0]+' On',()=>place(i),'Put the '+it[1]+' on the scale')});
  if(S.on[0]&&S.on[1])p.forEach((it,i)=>B(it[0]+' '+(askLight()?'Lighter':'Heavier'),()=>choose(i),'The '+it[1]+' is '+(askLight()?'lighter':'heavier')))}
 if(v==='fill'&&S.aim<3){B('💧 Pour in',()=>pour(.25),'Pour in some water');B('↩ Pour out',()=>pour(-.25),'Pour out some water');B('✔ Done',check,'Check the cup')}
 if(v==='name')['Full','Half full','Empty'].forEach((t,i)=>B(t,()=>nameIt(i)))}
function down(p){const v=view();
 if(v==='pair'||v==='tricky'||v==='light'){for(let i=0;i<2;i++){const r=cardAt(i);if(!S.on[i]&&within(p,r.x,r.y,r.w,r.h)){S.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}
  const b=beam();b.pans.forEach((q,i)=>{if(Math.hypot(p.x-q.x,p.y-q.y)<A.W*.12&&S.on[i])choose(i)});return false}
 if(v==='fill'){S.hold={fill:1};move(p);return true}
 if(v==='name')for(let i=0;i<3;i++){const w=(A.W-30)/3;if(within(p,6+i*(w+9),A.H*.71,w,A.H*.2))nameIt(i)}return false}
function move(p){const h=S.hold;if(!h)return;if(h.fill){const top=A.H*.08+A.H*.7*.25,ht=A.H*.7*.75,l=Math.max(0,Math.min(1,Math.round((1-(p.y-top)/ht)*4)/4));if(l!==S.lvl){S.lvl=l;A.sound.tick();A.redraw()}return}h.x=p.x;h.y=p.y;A.redraw()}
function up(p){const h=S.hold;if(!h)return;S.hold=null;if(h.fill){pour(0);return}const far=Math.hypot(p.x-h.x0,p.y-h.y0);if(far<12||p.y>A.H*.33)return place(h.i);A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const run=(fns,ms)=>{const t=++S.tok;fns.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const fresh=()=>{S.tok++;Object.assign(S,{want:()=>{},k:0,on:[0,0],tilt:0,wrong:-1,got:0,lvl:.25,aim:0,pot:0,hold:null})};
const _=()=>{};
const pairShow=n=>()=>{steps[n].go();const L=n===2?LIGHTER:n===1?TRICKY:HEAVIER,pk=k=>{const[a,b]=L[k],hv=a[2]>b[2]?0:1;return n===2?1-hv:hv};
 run([0,1,2].flatMap(k=>[()=>place(0),()=>place(1),()=>choose(pk(k)),_,_]),330)};
const steps=[
{h:'Up or down?',p:'Put a thing on each side of the scale. Drag it, or tap it. Watch which side goes down.',
 predict:{q:'A book and a feather go on the scale. The heavier one goes…',opts:['Up','Down'],ans:1},task:'Find the heavier one, 3 times',show:pairShow(0),
 go:()=>{fresh();tell('Put the book and the feather on the scale.');keys();S.want=ok(0,()=>S.got>=3,'The heavier side goes down. The lighter side goes up.')}},
{h:'Big but light',p:'Some big things are light. Some small things are heavy. The scale tells you.',
 predict:{q:'A big balloon and a small stone. Which is heavier?',opts:['The big balloon','The small stone'],ans:1},task:'Find the heavier one, 3 times',show:pairShow(1),
 go:()=>{fresh();tell('Put the balloon and the stone on the scale.');keys();S.want=ok(1,()=>S.got>=3,'Big does not always mean heavy. You have to feel it, or use the scale.')}},
{h:'Which is lighter?',p:'Lighter is the one that goes up. Put both on, then pick the lighter one.',task:'Find the lighter one, 3 times',show:pairShow(2),
 go:()=>{fresh();tell('Which is lighter? Put both on the scale.');keys();S.want=ok(2,()=>S.got>=3,'The lighter thing goes up.')}},
{h:'Fill it up',p:'Pour water in or out. Drag up and down on the cup too. Then tap Done.',task:'Make it full, then empty, then half full',
 show:()=>{steps[3].go();const i=()=>pour(.25),o=()=>pour(-.25);run([i,i,i,check,o,o,o,o,check,i,i,check],300)},
 go:()=>{fresh();tell('Make the cup full.');keys();S.want=ok(3,()=>S.aim>=3,'Full is to the top, empty is none, half full is to the middle.')}},
{h:'Full, half or empty?',p:'Look at the water. Is it full, half full or empty?',task:'Get 3 right',
 show:()=>{steps[4].go();run([()=>nameIt(0),_,()=>nameIt(2),_,()=>nameIt(1)],330)},
 go:()=>{fresh();tell('Is the jar full, half full or empty?');keys();S.want=ok(4,()=>S.got>=3,'You can name full, half full and empty.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A big balloon and a small stone. Which is heavier?',[['The small stone','ok'],['The big balloon','big'],['They are the same','same']]],
 ['On the scale, one side goes down. That side is…',[['Heavier','ok'],['Lighter','updown'],['Empty','noside']]],
 ['The cup has water right up to the top. It is…',[['Full','ok'],['Empty','empt'],['Half full','halfw']]],
 ['The cup has a little water at the bottom. Is it empty?',[['No, some is left','ok'],['Yes, it is empty','little'],['Yes, it is full','fullw']]],
 ['Which is lighter: a feather or a book?',[['The feather','ok'],['The book','book'],['You cannot tell','cant']]],
 ['The water comes up to the middle of the jug. It is…',[['Half full','ok'],['Full','nearly'],['Empty','midempty']]]];
function slip(t){let m='Heavier goes down, lighter goes up. Full is to the top, empty is none.';
 if(t==='big')m='The balloon is big, but it is full of air. The stone is small but heavy. Big does not mean heavy.';
 if(t==='same')m='Put them on the scale: the stone side goes down. They are not the same.';
 if(t==='updown')m='The heavy side pulls down. The side that goes up is the lighter one.';
 if(t==='noside')m='Both sides have something on. The side that goes down has the heavier thing.';
 if(t==='empt')m='Empty means no water. Water to the top means full.';
 if(t==='halfw')m='Half full stops at the middle. Water to the top is full.';
 if(t==='little')m='A little water is still water. Empty means none at all.';
 if(t==='fullw')m='Full is right to the top. A little at the bottom is not full.';
 if(t==='book')m='The book pulls the scale down. The feather is lighter.';
 if(t==='cant')m='Hold one in each hand, or use a scale: the feather is lighter.';
 if(t==='nearly')m='Full means right to the top. The middle is half full.';
 if(t==='midempty')m='There is water in it, so it is not empty. The middle is half full.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+streak+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
