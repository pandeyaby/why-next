/* Flagship – fronted adverbials and commas (ages 8–9): tap the chunk that tells when, where or how (an adverbial can be
   a whole phrase, not just an -ly word); drag that adverbial to the front and watch the capital letter move and a comma
   appear; tap the gap where the comma belongs after a longer opener ("Later that day,"); judge six sentences, including
   a comma wedged between subject and verb and an end adverbial that needs none; then sort openers into when, where and
   how. Challenge on the usual slips: comma inside the phrase, no comma, a comma after the subject, a lower-case start. */
(()=>{
const FIND=[[['The fox','crept','through the garden','at midnight.'],3,'when',{0:'who',1:'verb',2:'where'}],
 [['Tom','whistled','happily','on the bus.'],2,'how',{0:'who',1:'verb',3:'where'}],
 [['We','had a picnic','under the old oak tree','after lunch.'],2,'where',{0:'who',1:'verb',3:'when'}]];
const KIND={who:'tells who did it',verb:'is the action, the verb',where:'tells where',when:'tells when',how:'tells how'};
const MOVE=[[['the fox','crept through the garden','at midnight'],2],[['the children','ran home','later that day'],2],[['a troll','was waiting','under the bridge'],2]];
const GAPS=[[['Before','breakfast','she','packed','her','bag.'],2],[['Later','that','day','the','children','ran','home.'],3],
 [['Quietly','the','fox','moved','closer.'],1],[['Under','the','bridge','a','troll','was','waiting.'],3]];
const JUDGE=[['After lunch, we played football.',1,'Yes: opener, comma, then the rest.'],['After lunch we played football.',0,'The fronted adverbial "After lunch" needs a comma after it.'],
 ['The children, ran home after school.',0,'No opener here. Never put a comma between who did it and the verb.'],['Silently, the cat watched the bird.',1,'Yes: a one-word opener still takes a comma.'],
 ['In, the morning we left.',0,'The comma splits "In the morning" in half. It goes after "morning".'],['We played football after lunch.',1,'Yes: an adverbial at the end needs no comma.']];
const BINS=['⏰ When','📍 Where','🏃 How'];
const OPEN=[['Next week,',0],['Under the bridge,',1],['As fast as he could,',2],['Before dawn,',0],['In the dark cave,',1],['Silently,',2]];
VIS.reg('flagfront',c=>{let A,keys,qz,qi=-1,inrow=0;
const Z={tok:0,cb:()=>{},f:0,fok:0,mv:0,mok:0,done:false,g:0,gok:0,j:0,o:0,bad:-1,grab:null,lastMsg:''};
const part=()=>['find','move','gap','judge','sort','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fz=v=>Math.round(v*(A.narrow?1.05:1.22));
function txt(g,s,x,y,v,col,w,al){g.font=`${w||700} ${fz(v)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W*.94)}
function box(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke()}
const within=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function flow(list,top,v){const g=A.ctx;g.font=`700 ${fz(v)}px system-ui,sans-serif`;const pad=12,gap=8,h=fz(v)+18,out=[];let x=8,y=top;
 list.forEach(s=>{const w=g.measureText(s).width+pad*2;if(x+w>A.W-8&&x>8){x=8;y+=h+gap}out.push({x,y,w,h});x+=w+gap});
 const rows={};out.forEach(r=>{(rows[r.y]=rows[r.y]||[]).push(r)});Object.values(rows).forEach(rs=>{const end=rs[rs.length-1],sh=(A.W-8-(end.x+end.w))/2;rs.forEach(r=>r.x+=sh)});return out}
const frontR=()=>({x:A.W*.06,y:A.H*.08,w:A.W*.88,h:A.H*.16});
const binR=k=>{const w=(A.W-24)/3;return{x:6+k*(w+6),y:A.H*.6,w,h:A.H*.32}};
const twoR=k=>({x:k?A.W/2+4:8,y:A.H*.6,w:A.W/2-12,h:A.H*.32});
const cardBox=()=>({x:A.W*.06,y:A.H*.12,w:A.W*.88,h:A.H*.28});
function gapsOf(){const G=GAPS[Z.g%4],g=A.ctx;let v=14,sp,ws,all;
 do{g.font=`700 ${fz(v)}px system-ui,sans-serif`;sp=A.narrow?Math.max(12,fz(v)):fz(22);ws=G[0].map(s=>g.measureText(s).width);all=ws.reduce((a,b)=>a+b,0)+sp*(ws.length-1)}while(all>A.W-16&&--v>8);
 let x=Math.max(8,(A.W-all)/2);const mid=[],gx=[];ws.forEach((w,i)=>{mid.push(x+w/2);x+=w;if(i<ws.length-1)gx.push(x+sp/2);x+=sp});return{mid,gx,y:A.H*.45,v}}
function cap(s){return s[0].toUpperCase()+s.slice(1)}
function fronted(M){const[p,k]=M,adv=p[k],rest=p.filter((_,i)=>i!==k);return cap(adv)+', '+rest.join(' ')+'.'}
function draw(A){const{ctx:g,W,H,col:C}=A,m=part();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.32);g.fillRect(0,0,W,H);
 if(m==='quiz'){txt(g,'⏰📍🏃  Opener + comma',W/2,H*.4,17,C.tx,800);txt(g,'After lunch, we played.',W/2,H*.58,14);return}
 if(m==='find'){const F=FIND[Z.f%3];txt(g,'Which part tells '+F[2].toUpperCase()+'?',W/2,H*.14,15,C.tx,800);flow(F[0],H*.32,13).forEach((r,i)=>{box(g,r,A.alpha(Z.bad===i?C.rd:C.cy,.13),Z.bad===i?C.rd:C.tx,Z.bad===i?3:2);txt(g,F[0][i],r.x+r.w/2,r.y+r.h/2,13)});
  txt(g,'Found: '+Z.fok+' of 3',W/2,H*.9,11,C.tx,600)}
 if(m==='move'){const M=MOVE[Z.mv%3],F=frontR();box(g,F,A.alpha(C.gr,.12),Z.done?C.gr:C.tx,Z.done?3:2);txt(g,Z.done?fronted(M):'Drag the adverbial here',W/2,F.y+F.h/2,Z.done?13:12,C.tx,Z.done?800:600);
  if(!Z.done){txt(g,M[0].map((s,i)=>i?s:cap(s)).join(' ')+'.',W/2,H*.34,12,C.tx,600);flow(M[0],H*.48,13).forEach((r,i)=>{if(Z.grab&&Z.grab.i===i)return;box(g,r,A.alpha(Z.bad===i?C.rd:C.or,.15),Z.bad===i?C.rd:C.tx);txt(g,M[0][i],r.x+r.w/2,r.y+r.h/2,13)})}
  else txt(g,'✓ capital letter moves, comma after the opener',W/2,H*.4,11,C.gr,800);
  if(Z.grab)txt(g,M[0][Z.grab.i],Z.grab.x,Z.grab.y,14,C.tx,800);txt(g,'Fronted: '+Z.mok+' of 3',W/2,H*.9,11,C.tx,600)}
 if(m==='gap'){const G=GAPS[Z.g%4],L=gapsOf();txt(g,'Tap where the comma goes.',W/2,H*.15,14,C.tx,800);G[0].forEach((s,i)=>txt(g,s,L.mid[i],L.y,L.v));
  L.gx.forEach((x,i)=>{const isBad=Z.bad===i+1;g.fillStyle=isBad?C.rd:A.alpha(C.tx,.3);g.beginPath();g.arc(x,L.y+fz(22),isBad?7:5,0,7);g.fill();if(isBad)txt(g,',',x,L.y+fz(4),18,C.rd,800)});
  if(Z.lastMsg)txt(g,Z.lastMsg,W/2,H*.7,12,C.gr,800);txt(g,'Commas placed: '+Z.gok+' of 4',W/2,H*.9,11,C.tx,600)}
 if(m==='judge'){const b=[twoR(0),twoR(1)];box(g,b[0],A.alpha(C.rd,.1),C.tx);box(g,b[1],A.alpha(C.gr,.14),C.tx);txt(g,'✗ Needs fixing',b[0].x+b[0].w/2,b[0].y+b[0].h/2,13,C.tx,800);txt(g,'✓ Correct',b[1].x+b[1].w/2,b[1].y+b[1].h/2,13,C.tx,800);
  if(Z.j<JUDGE.length){const r=cardBox(),d=Z.grab;if(d)txt(g,JUDGE[Z.j][0],d.x,d.y,12,C.tx,800);else{box(g,r,A.alpha(C.cy,.12),Z.bad>=0?C.rd:C.tx,Z.bad>=0?3:2);txt(g,JUDGE[Z.j][0],W/2,r.y+r.h/2,13,C.tx,800)}}
  else txt(g,'All judged!',W/2,H*.26,16,C.tx,800);txt(g,'Judged: '+Z.j+' of '+JUDGE.length,W/2,H*.48,11,C.tx,600)}
 if(m==='sort'){BINS.forEach((b,k)=>{const r=binR(k);box(g,r,A.alpha([C.cy,C.vi,C.or][k],.14),Z.bad===k?C.rd:C.tx,Z.bad===k?4:2);txt(g,b,r.x+r.w/2,r.y+r.h/2,12,C.tx,800)});
  if(Z.o<OPEN.length){const r=cardBox(),d=Z.grab;if(d)txt(g,OPEN[Z.o][0],d.x,d.y,13,C.tx,800);else{box(g,r,A.alpha(C.gr,.12));txt(g,OPEN[Z.o][0]+' …',W/2,r.y+r.h/2,15,C.tx,800)}}
  else txt(g,'All sorted!',W/2,H*.26,16,C.tx,800);txt(g,'Sorted: '+Z.o+' of '+OPEN.length,W/2,H*.48,11,C.tx,600)}
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();tell(t);A.redraw()},yep=t=>{A.sound.pop();tell(t);keyset();A.redraw();Z.cb()};
const after=f=>{const t=Z.tok;setTimeout(()=>{if(t===Z.tok){f();keyset();A.redraw()}},A.reduced()?20:700)};
function find(i){if(Z.fok>=3)return;const F=FIND[Z.f%3];if(i!==F[1]){Z.bad=i;return nope('"'+F[0][i].replace('.','')+'" '+KIND[F[3][i]]+'. Find the part that tells '+F[2]+'.')}
 Z.bad=-1;Z.fok++;yep('Yes! "'+F[0][i].replace('.','')+'" is an adverbial. It tells '+F[2]+'.');if(Z.fok<3)after(()=>Z.f++)}
function front(i){Z.grab=null;if(Z.mok>=3||Z.done)return A.redraw();const M=MOVE[Z.mv%3];
 if(i!==M[1]){Z.bad=i;return nope(i===0?'"'+M[0][0]+'" tells who. The adverbial tells when or where.':'"'+M[0][1]+'" is the action. Move the part that tells when or where.')}
 Z.bad=-1;Z.done=true;Z.mok++;yep(fronted(M)+' The opener gets a capital letter and a comma.');if(Z.mok<3)after(()=>{Z.mv++;Z.done=false})}
function comma(k){if(Z.gok>=4)return;const G=GAPS[Z.g%4],w=G[0];
 if(k!==G[1]){Z.bad=k;Z.lastMsg='';return nope(k<G[1]?'That splits the opener "'+w.slice(0,G[1]).join(' ')+'". Put the comma after the whole phrase.':'That comes after "'+w[k-1]+'". The comma goes straight after the opener, before "'+w[G[1]]+'".')}
 Z.bad=-1;Z.gok++;Z.lastMsg=w.slice(0,G[1]).join(' ')+', '+w.slice(G[1]).join(' ');yep(Z.gok>=4?'Four commas, each after the whole opener.':'Yes! '+Z.lastMsg);if(Z.gok<4)after(()=>{Z.g++;Z.lastMsg=''})}
function judge(ok){Z.grab=null;if(Z.j>=JUDGE.length)return A.redraw();const[,right,why]=JUDGE[Z.j];
 if(ok!==right){Z.bad=ok;return nope((right?'This one is correct. ':'This one needs fixing. ')+why)}Z.bad=-1;Z.j++;yep(why)}
function sortTo(k){Z.grab=null;if(Z.o>=OPEN.length)return A.redraw();const[s,want]=OPEN[Z.o];
 if(k!==want){Z.bad=k;return nope('"'+s.replace(',','')+'" '+['tells when it happens','tells where it happens','tells how it is done'][want]+'. Try the '+BINS[want].slice(2)+' box.')}
 Z.bad=-1;Z.o++;yep('Yes, '+BINS[want].slice(2).toLowerCase()+'.')}
function keyset(){if(!keys)return;keys.innerHTML='';const m=part(),K=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=f};
 if(m==='find'&&Z.fok<3)FIND[Z.f%3][0].forEach((s,i)=>K(s,()=>find(i),'Choose: '+s));
 if(m==='move'&&!Z.done&&Z.mok<3)MOVE[Z.mv%3][0].forEach((s,i)=>K('Move "'+s+'" to the front',()=>front(i)));
 if(m==='gap'&&Z.gok<4){const w=GAPS[Z.g%4][0];w.slice(0,-1).forEach((s,i)=>K(', after "'+s+'"',()=>comma(i+1),'Comma after '+s))}
 if(m==='judge'&&Z.j<JUDGE.length){K('✗ Needs fixing',()=>judge(0),'Needs fixing: '+JUDGE[Z.j][0]);K('✓ Correct',()=>judge(1),'Correct: '+JUDGE[Z.j][0])}
 if(m==='sort'&&Z.o<OPEN.length)BINS.forEach((b,k)=>K(b,()=>sortTo(k),b.slice(2)+': '+OPEN[Z.o][0]))}
function down(p){const m=part();
 if(m==='find'){flow(FIND[Z.f%3][0],A.H*.32,13).forEach((r,i)=>{if(within(p,r))find(i)});return false}
 if(m==='move'&&!Z.done){const rs=flow(MOVE[Z.mv%3][0],A.H*.48,13);for(let i=0;i<rs.length;i++)if(within(p,rs[i])){Z.grab={i,x:p.x,y:p.y};A.redraw();return true}return false}
 if(m==='gap'){const L=gapsOf();let bi=-1,bd=1e9;L.gx.forEach((x,i)=>{const d=Math.hypot(p.x-x,(p.y-L.y-fz(10))*.5);if(d<bd){bd=d;bi=i}});if(bd<fz(26))comma(bi+1);return false}
 if((m==='judge'&&Z.j<JUDGE.length||m==='sort'&&Z.o<OPEN.length)&&within(p,cardBox())){Z.grab={x:p.x,y:p.y};return true}return false}
function move(p){if(!Z.grab)return;Z.grab.x=p.x;Z.grab.y=p.y;A.redraw()}
function up(p){if(!Z.grab)return;const m=part();
 if(m==='move'){const F=frontR();if(within(p,{x:F.x,y:F.y-10,w:F.w,h:F.h+30}))return front(Z.grab.i)}
 if(m==='judge')for(let k=0;k<2;k++)if(within(p,twoR(k)))return judge(k);
 if(m==='sort')for(let k=0;k<3;k++)if(within(p,binR(k)))return sortTo(k);Z.grab=null;A.redraw()}
const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const run=(fs,ms)=>{const t=++Z.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===Z.tok)f()},A.reduced()?j*30+30:(j+1)*ms))};
const wipe=()=>{Z.tok++;Object.assign(Z,{cb:()=>{},f:0,fok:0,mv:0,mok:0,done:false,g:0,gok:0,j:0,o:0,bad:-1,grab:null,lastMsg:''})};
const idle=()=>{};
const steps=[
{h:'Find the adverbial',p:'An adverbial tells when, where or how something happens. It can be one word or a whole phrase. Tap it.',
 predict:{q:'Can an adverbial be more than one word?',opts:['No, it is one word like "quickly"','Yes, it can be a phrase'],ans:1},task:'Find 3 adverbials',
 show:()=>{steps[0].go();const f=()=>find(FIND[Z.f%3][1]);run([f,idle,idle,f,idle,idle,f],330)},
 go:()=>{wipe();tell('The fox crept through the garden at midnight. Which part tells when?');keyset();Z.cb=finish(0,()=>Z.fok>=3,'Adverbials tell when, where or how. Many are phrases.')}},
{h:'Move it to the front',p:'Drag the adverbial to the front box, or tap its button. Watch what changes.',
 predict:{q:'Move "at midnight" to the front. What else changes?',opts:['Nothing else','A capital letter and a comma'],ans:1},task:'Front 3 adverbials',
 show:()=>{steps[1].go();const f=()=>front(MOVE[Z.mv%3][1]);run([f,idle,idle,f,idle,idle,f],330)},
 go:()=>{wipe();tell('Drag the adverbial to the front.');keyset();Z.cb=finish(1,()=>Z.mok>=3,'A fronted adverbial starts the sentence, so it takes the capital letter, and a comma follows it.')}},
{h:'Place the comma',p:'The comma goes after the whole fronted adverbial, before the rest of the sentence. Tap the gap.',
 predict:{q:'"Later that day the children ran home." The comma goes after…',opts:['Later','day'],ans:1},task:'Place 4 commas',
 show:()=>{steps[2].go();const f=()=>comma(GAPS[Z.g%4][1]);run([f,idle,idle,f,idle,idle,f,idle,idle,f],250)},
 go:()=>{wipe();tell('Before breakfast she packed her bag. Where does the comma go?');keyset();Z.cb=finish(2,()=>Z.gok>=4,'The comma marks where the opener ends.')}},
{h:'Correct or not?',p:'Drag each sentence to a box, or tap a button. Look for the opener and its comma.',task:'Judge all 6',
 show:()=>{steps[3].go();run(JUDGE.map(J=>()=>judge(J[1])),330)},
 go:()=>{wipe();tell('Is it correct, or does it need fixing?');keyset();Z.cb=finish(3,()=>Z.j>=JUDGE.length,'Comma after a fronted adverbial. No comma between who did it and the verb.')}},
{h:'When, where or how?',p:'Fronted adverbials help you vary how sentences start. Sort each opener by what it tells.',task:'Sort all 6 openers',
 show:()=>{steps[4].go();run(OPEN.map(o=>()=>sortTo(o[1])),330)},
 go:()=>{wipe();tell('Next week. When, where or how?');keyset();Z.cb=finish(4,()=>Z.o>=OPEN.length,'Mix when, where and how openers so your sentences do not all start the same way.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.cb()});
const QS=[['Which sentence is punctuated correctly?',[['Later that day, the children ran home.','ok'],['Later, that day the children ran home.','split'],['Later that day the children ran home.','none']]],
 ['Which is the fronted adverbial? "In the dark cave, a bat hung upside down."',[['In the dark cave','ok'],['a bat','who'],['hung upside down','verb']]],
 ['Which sentence needs no comma?',[['The fox ran home at midnight.','ok'],['At midnight the fox ran home.','none2'],['Quietly the fox ran home.','none3']]],
 ['"Silently, the cat crept closer." What does "Silently" tell us?',[['How','ok'],['When','when'],['Where','where']]],
 ['Which is correct?',[['After school, we went swimming.','ok'],['We, went swimming after school.','subj'],['after school, we went swimming.','lower']]],
 ['Why use fronted adverbials?',[['To vary how sentences start','ok'],['To make every sentence longer','long'],['So you never need a full stop','stop']]]];
function why(t){let m='Put the comma after the whole fronted adverbial.';
 if(t==='split')m='The comma splits "Later that day" in half. It goes after "day".';
 if(t==='none')m='"Later that day" is fronted, so it needs a comma after it.';
 if(t==='who')m='"a bat" is who the sentence is about. The adverbial tells where.';
 if(t==='verb')m='"hung upside down" is the action. The opener tells where.';
 if(t==='none2')m='"At midnight" is fronted, so that one needs a comma.';
 if(t==='none3')m='"Quietly" is a one-word opener. It still needs a comma.';
 if(t==='when')m='"Silently" tells how the cat moved, not when.';
 if(t==='where')m='"Silently" is about how, not a place.';
 if(t==='subj')m='Never put a comma between who did it and the verb.';
 if(t==='lower')m='A sentence starts with a capital letter, even when an adverbial comes first.';
 if(t==='long')m='Longer is not the aim. Fronting varies the start of a sentence.';
 if(t==='stop')m='Every sentence still ends with a full stop.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});tell('Challenge: '+q);A.redraw()}
function score(t){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+inrow+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:A=>{qz.hidden=A.step!==5;keys.hidden=A.step===5;keyset()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keyset()}});
A.start()})})();
