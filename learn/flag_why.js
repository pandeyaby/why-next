/* Flagship – understanding why (ages 8–9): bundle ten ones into a ten to see what the carried 1 really is, test the
   rule "multiplying makes bigger" until it breaks, sort facts, real reasons and fake reasons, rebuild a forgotten
   fact (7 × 8) by splitting an array two ways, and link each new idea to an old one it is like. Every drag or tap
   has a button too. */
(()=>{const mn=Math.min,mx=Math.max,hy=Math.hypot;
 const MUL=[['×3',3],['×2',2],['×1',1],['×0',0],['×½',.5]];
 const MSG={3:'6 × 3 = 18. Three groups of 6: bigger.',2:'6 × 2 = 12. Two groups of 6: bigger.',1:'6 × 1 = 6. One group of 6 is just 6: not bigger! The rule breaks.',0:'6 × 0 = 0. No groups of 6 at all: smaller! The rule breaks.',.5:'6 × ½ = 3. Half of one group of 6: smaller! The rule breaks.'};
 const CARDS=[['Plants need light.',0],['Plants need light because they use it to make their food.',1],['Plants need light because that is the rule.',2],['We carry because ten ones make one ten.',1],
  ['We carry because the teacher says so.',2],['Puddles dry up.',0],['Puddles dry up because the water evaporates into the air.',1],['Puddles dry up because they just do.',2]];
 const BINS=[['📌 Fact','what is true'],['💡 Real why','how it works'],['🚫 Fake why','explains nothing']];
 const WHYBAD=['That says what is true, but not why. There is no “because”.','That gives a real reason: it says how it works.','“Because that is the rule”, “the teacher says so” or “they just do” sounds like a reason, but it does not explain how anything works.'];
 const NEW=[['10 tens make 1 hundred',0],['Half of 8 is 4',1],['My shadow on the wall',2],['4 × 3 is the same as 3 × 4',3]];
 const OLD=[['10 ones make 1 ten','grouping in tens'],['Sharing sweets fairly between 2','sharing equally'],['Blocking a torch with my hand','light being blocked'],['Turning an array on its side','turning an array']];
VIS.reg('flagwhy',c=>{let A,pad,chal,q=-1,gen=0;
 const S={frame:0,bund:0,broke:[],tried:-1,card:[],split:-1,splits:[],link:[],bad:-1,held:null,want:()=>{}};
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const view=()=>['carry','rule','sort','split','link','quiz'][A.step];
 const X=f=>f*A.W,Y=f=>f*A.H,big=z=>A.narrow?z:z+4;
 const txt=(x,s,px,py,z,k,w,al)=>{x.font=`${w||700} ${big(z)}px system-ui,sans-serif`;x.textAlign=al||'center';x.textBaseline='middle';x.fillStyle=k;x.fillText(s,px,py,A.W-12)};
 function wrap(x,s,px,py,maxW,z,k,w){x.font=`${w||700} ${big(z)}px system-ui,sans-serif`;const ws=s.split(' '),L=[];let l='';ws.forEach(t=>{if(l&&x.measureText(l+' '+t).width>maxW){L.push(l);l=t}else l=l?l+' '+t:t});L.push(l);
  const lh=big(z)*1.3;L.forEach((t,i)=>txt(x,t,px,py+(i-(L.length-1)/2)*lh,z,k,w))}
 const box=(x,r,k,f,th)=>{x.fillStyle=A.alpha(k,f==null?.15:f);A.paint.rrect(r.x,r.y,r.w,r.h,12);x.fill();x.strokeStyle=k;x.lineWidth=th||2;x.stroke()};
 const bad=t=>{A.sound.miss();tell(t);A.redraw()};
 const yes=t=>{A.sound.pop();tell(t);pads();A.redraw();S.want()};
 const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 // ---- 0: what the carried 1 is ----
 const ones=()=>12-S.frame-(S.bund?10:0),tens=()=>3+S.bund;
 const cube=()=>mn(X(.06),Y(.075));
 const oneAt=i=>{const s=cube();return{x:X(.4)+(i%3)*(s+6),y:Y(.24)+Math.floor(i/3)*(s+6),w:s,h:s}};
 const slotAt=i=>{const s=cube();return{x:X(.7)+(i%2)*(s+6),y:Y(.24)+Math.floor(i/2)*(s+6),w:s,h:s}};
 const frameR=()=>{const a=slotAt(0),b=slotAt(9);return{x:a.x-8,y:a.y-8,w:b.x+b.w-a.x+16,h:b.y+b.h-a.y+16}};
 function carryV(x){const C=A.col,s=cube();txt(x,'27 + 15 = ?',A.W/2,Y(.06),17,C.tx,800);
  txt(x,'Tens',X(.17),Y(.16),13,C.tx,800);txt(x,'Ones',X(.4)+s*1.5+6,Y(.16),13,C.tx,800);txt(x,'Make a ten',frameR().x+frameR().w/2,Y(.16),13,C.tx,800);
  for(let r=0;r<tens();r++){const rx=X(.04)+r*mx(18,X(.07)),rh=s*5+24;for(let k=0;k<10;k++){x.fillStyle=r>=3?C.gr:C.cy;x.fillRect(rx,Y(.24)+k*rh/10,mx(12,X(.05)),rh/10-2)}}
  for(let i=0;i<ones();i++){const r=oneAt(i);if(S.held&&i===ones()-1)continue;x.fillStyle=C.am;A.paint.rrect(r.x,r.y,r.w,r.h,4);x.fill();x.strokeStyle=C.tx;x.lineWidth=1.5;x.stroke()}
  if(!S.bund){box(x,frameR(),C.vi,.08);for(let i=0;i<10;i++){const r=slotAt(i);x.strokeStyle=A.alpha(C.tx,.5);x.lineWidth=1;x.strokeRect(r.x,r.y,r.w,r.h);if(i<S.frame){x.fillStyle=C.am;x.fillRect(r.x+2,r.y+2,r.w-4,r.h-4)}}}
  if(S.held){x.fillStyle=C.am;x.fillRect(S.held.x-s/2,S.held.y-s/2,s,s)}
  const done=S.bund;txt(x,done?'4 tens and 2 ones = 42':`Ones: ${ones()+S.frame}. Ten ones can make one ten.`,A.W/2,Y(.88),14,done?C.gr:C.tx,800);
  if(done)txt(x,'The carried 1 is one ten, worth 10.',A.W/2,Y(.95),12,C.tx,700)}
 function moveOne(){if(S.bund)return bad(`Only ${ones()} ones are left. You need ten to make a ten, so they stay as ones.`);if(ones()<=0)return;S.frame++;A.sound.tick();
  if(S.frame<10){tell(`${S.frame} in the ten-frame.`);return A.redraw()}S.frame=0;S.bund=1;yes('Ten ones make one ten! It moves to the tens. That is the 1 you carry.')}
 // ---- 1: does the rule always work? ----
 const chip=i=>{const w=(A.W-12*6)/5;return{x:12+i*(w+12),y:Y(.8),w,h:mx(48,Y(.13))}};
 function ruleV(x){const C=A.col;txt(x,'Rule: “Multiplying always makes a number bigger.”',A.W/2,Y(.06),13,C.tx,800);
  const base=Y(.66),u=Y(.022),bw=X(.18);const v=S.tried<0?null:6*S.tried;
  x.fillStyle=A.alpha(C.mu,.6);x.fillRect(X(.22),base-6*u,bw,6*u);txt(x,'6',X(.22)+bw/2,base+14,13,C.tx,800);
  if(v!=null){const k=v>6?C.gr:C.rd;x.fillStyle=A.alpha(k,.7);x.fillRect(X(.6),base-v*u,bw,mx(2,v*u));txt(x,String(v),X(.6)+bw/2,base+14,13,C.tx,800);txt(x,v>6?'bigger':v===6?'the same':'smaller',X(.6)+bw/2,base-v*u-14,12,C.tx,700)}
  else txt(x,'Drop a number here',X(.69),base-40,12,C.tx,600);
  x.strokeStyle=C.tx;x.lineWidth=2;x.beginPath();x.moveTo(X(.1),base);x.lineTo(X(.9),base);x.stroke();
  txt(x,`Rule breakers found: ${S.broke.length} of 3`,A.W/2,Y(.13),13,S.broke.length>=3?C.gr:C.tx,800);
  MUL.forEach(([t,m],i)=>{let r=chip(i);if(S.held&&S.held.i===i)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};box(x,r,S.broke.includes(m)?C.rd:C.cy,.18);txt(x,t,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)})}
 function test(i){S.held=null;const m=MUL[i][1];S.tried=m;A.sound.tick();if(m<=1&&!S.broke.includes(m)){S.broke.push(m);return yes(MSG[m])}tell(MSG[m]);A.redraw()}
 // ---- 2: fact, real why, or not a reason ----
 const bin=k=>{const w=(A.W-16)/3-6;return{x:8+k*(w+9),y:Y(.62),w,h:Y(.34)}};
 const cardR=()=>({x:X(.06),y:Y(.12),w:X(.88),h:Y(.36)});
 function sortV(x){const C=A.col,left=CARDS.findIndex((_,i)=>S.card[i]==null);
  BINS.forEach(([t,u],k)=>{const r=bin(k),col=[C.cy,C.gr,C.rd][k];box(x,r,col,S.bad===k?.3:.12,3);txt(x,t,r.x+r.w/2,r.y+20,12,C.tx,800);txt(x,u,r.x+r.w/2,r.y+42,10,C.tx,600);txt(x,String(S.card.filter(v=>v===k).length),r.x+r.w/2,r.y+r.h-20,16,C.tx,800)});
  if(left<0)return txt(x,'Only real reasons tell how it works.',A.W/2,Y(.3),14,C.gr,800);
  let r=cardR();if(S.held)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};box(x,r,C.am,C.dark?.2:.25);wrap(x,CARDS[left][0],r.x+r.w/2,r.y+r.h/2,r.w-24,15,C.tx,700);
  txt(x,`Card ${left+1} of ${CARDS.length}: drag it to a box`,A.W/2,Y(.05),12,C.tx,700)}
 function sortCard(k){S.held=null;const i=CARDS.findIndex((_,i)=>S.card[i]==null);if(i<0||k<0)return A.redraw();const a=CARDS[i][1];
  if(k!==a){S.bad=k;return bad(WHYBAD[a])}S.bad=-1;S.card[i]=k;yes(['A fact: it says what is true.','A real why: it says how it works.','A fake why: it sounds like a reason, but explains nothing.'][a])}
 // ---- 3: rebuild 7 × 8 by splitting ----
 const grid=()=>{const g=mn(X(.84)/8,Y(.56)/7);return{x:(A.W-g*8)/2,y:Y(.12),g}};
 function splitV(x){const C=A.col,{x:gx,y:gy,g}=grid(),k=S.split;txt(x,'Forgot 7 × 8? Split it into facts you know.',A.W/2,Y(.05),13,C.tx,800);
  for(let r=0;r<7;r++)for(let cI=0;cI<8;cI++){x.fillStyle=k>0&&r>=k?C.vi:C.cy;x.beginPath();x.arc(gx+cI*g+g/2,gy+r*g+g/2,g*.32,0,7);x.fill()}
  if(k>0){const y=gy+k*g;x.strokeStyle=C.rd;x.lineWidth=4;x.setLineDash([8,5]);x.beginPath();x.moveTo(gx-8,y);x.lineTo(gx+g*8+8,y);x.stroke();x.setLineDash([]);
   txt(x,`${k} × 8 = ${k*8}   and   ${7-k} × 8 = ${(7-k)*8}`,A.W/2,gy+g*7+22,14,C.tx,800);txt(x,`${k*8} + ${(7-k)*8} = 56`,A.W/2,gy+g*7+48,16,C.gr,800)}
  else txt(x,'Drag between two rows to split',A.W/2,gy+g*7+24,13,C.tx,700);
  txt(x,`Different splits tried: ${S.splits.length} of 2`,A.W/2,Y(.95),12,S.splits.length>=2?C.gr:C.tx,700)}
 function setSplit(k){S.held=null;k=mx(1,mn(6,k));S.split=k;A.sound.tick();const fresh=!S.splits.includes(k);if(fresh)S.splits.push(k);
  if(fresh&&S.splits.length===2)return yes(`${k} rows of 8 and ${7-k} rows of 8 still make 56. Same dots, so the same answer.`);
  tell(`${k} × 8 = ${k*8} and ${7-k} × 8 = ${(7-k)*8}. Together 56.`);A.redraw()}
 // ---- 4: that's like when... ----
 const oldAt=k=>{const w=(A.W-30)/2,h=Y(.2);return{x:10+(k%2)*(w+10),y:Y(.52)+Math.floor(k/2)*(h+10),w,h}};
 const newR=()=>({x:X(.1),y:Y(.13),w:X(.8),h:Y(.25)});
 function linkV(x){const C=A.col,left=NEW.findIndex((_,i)=>S.link[i]==null);
  OLD.forEach(([t],k)=>{const r=oldAt(k),used=S.link.includes(k);box(x,r,used?C.gr:C.vi,used?.25:.12);wrap(x,t,r.x+r.w/2,r.y+r.h/2,r.w-14,12,C.tx,700)});
  txt(x,'Old ideas you know',A.W/2,Y(.47),12,C.tx,800);
  if(left<0)return txt(x,'Every new idea links to an old one!',A.W/2,Y(.25),14,C.gr,800);
  let r=newR();if(S.held)r={...r,x:S.held.x-r.w/2,y:S.held.y-r.h/2};box(x,r,C.am,.25);txt(x,'New idea:',r.x+r.w/2,r.y+18,11,C.tx,700);wrap(x,NEW[left][0],r.x+r.w/2,r.y+r.h/2+8,r.w-20,15,C.tx,800);
  txt(x,'That’s like when…?',A.W/2,Y(.05),13,C.tx,800)}
 function link(k){S.held=null;const i=NEW.findIndex((_,i)=>S.link[i]==null);if(i<0||k<0)return A.redraw();const a=NEW[i][1];
  if(k!==a)return bad(`That old idea is about ${OLD[k][1]}. This new one is about ${OLD[a][1]}.`);S.link[i]=k;yes(`“${NEW[i][0]}” is like “${OLD[k][0]}”. Both are about ${OLD[k][1]}.`)}
 function draw(A){const{ctx:x,W,H,col:C}=A,v=view();x.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);x.fillRect(0,0,W,H);
  const f={carry:carryV,rule:ruleV,sort:sortV,split:splitV,link:linkV}[v];if(f)f(x);else{txt(x,'🤔',W/2,H*.45,52,C.tx);txt(x,'But why?',W/2,H*.15,18,C.tx,800)}A.fx.draw(x)}
 function pads(){if(!pad)return;pad.innerHTML='';const v=view(),B=(t,f,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);b.onclick=f};
  if(v==='carry')B('➡ Move a one to the ten-frame',moveOne);
  if(v==='rule')MUL.forEach(([t],i)=>B('6 '+t,()=>test(i),'Test 6 '+t));
  if(v==='sort'&&CARDS.some((_,i)=>S.card[i]==null))BINS.forEach(([t],k)=>B(t,()=>sortCard(k)));
  if(v==='split')for(let k=1;k<7;k++)B(`${k} + ${7-k} rows`,()=>setSplit(k),`Split after row ${k}`);
  if(v==='link'&&NEW.some((_,i)=>S.link[i]==null))OLD.forEach(([t],k)=>B(t,()=>link(k)))}
 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const play=(fs,ms)=>{const g=++gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===gen)f()},j*ms))};
 const reset=()=>{gen++;S.want=()=>{};S.held=null;S.bad=-1};
 const steps=[
  {h:'What is the carried 1?',p:'27 + 15: the ones make 7 + 5 = 12. Move the ones into the ten-frame and see what happens.',
   predict:{q:'When you carry the 1 in 27 + 15, what is that 1 worth?',opts:['1','10'],ans:1},task:'Make a ten from the ones',
   show:()=>{steps[0].go();play([...Array(10)].map(()=>moveOne),220)},
   go:()=>{reset();S.frame=0;S.bund=0;tell('12 ones. Move them into the ten-frame.');pads();S.want=fin(0,()=>S.bund,'You carry because ten ones make one ten.')}},
  {h:'Does the rule always work?',p:'Some people learn: “multiplying makes bigger.” Test it. Drag a number onto the scale, or tap a button.',
   predict:{q:'Is 6 × ½ bigger than 6?',opts:['Yes, multiplying makes bigger','No, it is smaller'],ans:1},task:'Find three numbers that break the rule',
   show:()=>{steps[1].go();play([2,3,4].map(i=>()=>test(i)),700)},
   go:()=>{reset();S.broke=[];S.tried=-1;tell('Test the rule on 6.');pads();S.want=fin(1,()=>S.broke.length>=3,'Knowing why (× means groups of) shows when the rule breaks.')}},
  {h:'Fact, reason or not?',p:'A fact says what is true. A real why says how it works. Some “reasons” explain nothing. Sort each card.',
   predict:{q:'“We carry because that is the rule.” Is that a real reason?',opts:['Yes, it has because','No, it does not say how'],ans:1},task:'Sort all eight cards',
   show:()=>{steps[2].go();play(CARDS.map(cd=>()=>sortCard(cd[1])),480)},
   go:()=>{reset();S.card=[];tell('Fact, real why, or fake why?');pads();S.want=fin(2,()=>S.card.filter(v=>v!=null).length>=8,'A real reason says how it works.')}},
  {h:'Rebuild a fact',p:'If you know why, you can rebuild a fact you forgot. 7 × 8 is 7 rows of 8. Split the rows into facts you know.',task:'Split it two different ways',
   show:()=>{steps[3].go();play([5,2].map(k=>()=>setSplit(k)),900)},
   go:()=>{reset();S.split=-1;S.splits=[];tell('Split the 7 rows of 8.');pads();S.want=fin(3,()=>S.splits.length>=2,'Same dots, same total: 56.')}},
  {h:'That’s like when…',p:'Link a new idea to an old one you know. Drag the new idea onto the old idea it is like.',task:'Link all four new ideas',
   show:()=>{steps[4].go();play(NEW.map(n=>()=>link(n[1])),600)},
   go:()=>{reset();S.link=[];tell('Which old idea is it like?');pads();S.want=fin(4,()=>S.link.filter(v=>v!=null).length>=4,'Linking new to old helps you see why.')}},
  {h:'Challenge',p:'',go:()=>{reset();quiz()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
 const QZ=[['Why does 30 + 40 = 70?',[['3 tens and 4 tens make 7 tens, and 7 tens is 70.','ok'],['Because 30 + 40 is 70.','circle'],['Because it says so in the answer book.','boss']]],
  ['Why do we wear coats in winter?',[['A coat keeps the warmth from your body in.','ok'],['Because coats come in lots of colours.','off'],['Because it is a rule.','rule']]],
  ['Why is 6 × ½ smaller than 6?',[['It means half of one group of 6, which is 3.','ok'],['It is not. Multiplying makes bigger.','myth'],['Because the numbers are small.','off']]],
  ['Why does a ball fall when you let go?',[['Gravity pulls it down towards the Earth.','ok'],['Because it falls.','circle'],['Because balls are round.','off']]],
  ['Why is 7 × 8 the same as 8 × 7?',[['They are the same array, turned on its side.','ok'],['Because the teacher told me.','boss'],['Because 7 and 8 are close.','off']]]];
 let stars=0;
 function quiz(){q++;const[ask,o]=QZ[q%QZ.length],r=q%3;
  chal.innerHTML=`<p><b>${ask}</b></p><p>Which answer really explains why?</p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([t,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>mark(tag)});tell('Challenge: '+ask);A.redraw()}
 function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes! It says how it works.';break;
   case 'circle':m='That just says the fact again with “because” in front. It does not say how.';break;
   case 'boss':m='Who told you is not a reason. A real why says how it works, so you could explain it to them.';break;
   case 'rule':m='“It is a rule” stops the question. Ask what the rule is for.';break;
   case 'myth':m='That rule only works for numbers bigger than 1. Half of one group of 6 is 3.';break;
   default:m='That is true, or sounds true, but it has nothing to do with the question.'}
  const ok=tag==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
  fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Stars: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
 function down(p){const v=view();S.held=null;
  if(v==='carry'){if(!S.bund&&[...Array(ones()).keys()].some(i=>inside(p,oneAt(i)))){S.held={x:p.x,y:p.y};A.redraw();return true}if(S.bund&&[...Array(ones()).keys()].some(i=>inside(p,oneAt(i))))moveOne();return false}
  if(v==='rule'){const i=MUL.findIndex((_,i)=>inside(p,chip(i)));if(i>=0){S.held={i,x:p.x,y:p.y};return true}return false}
  if(v==='sort'&&CARDS.some((_,i)=>S.card[i]==null)&&inside(p,cardR())){S.held={x:p.x,y:p.y};return true}
  if(v==='split'){const{x:gx,y:gy,g}=grid();if(p.x>gx-20&&p.x<gx+g*8+20&&p.y>gy&&p.y<gy+g*7){S.held={x:p.x,y:p.y};S.split=mx(1,mn(6,Math.round((p.y-gy)/g)));A.redraw();return true}return false}
  if(v==='link'&&NEW.some((_,i)=>S.link[i]==null)&&inside(p,newR())){S.held={x:p.x,y:p.y};return true}return false}
 function move(p){if(!S.held)return;S.held.x=p.x;S.held.y=p.y;if(view()==='split'){const{y:gy,g}=grid();const k=mx(1,mn(6,Math.round((p.y-gy)/g)));if(k!==S.split){S.split=k;A.sound.tick()}}A.redraw()}
 function up(p){const v=view(),h=S.held;if(!h)return;S.held=null;
  if(v==='carry'){if(inside(p,frameR()))return moveOne();return A.redraw()}
  if(v==='rule'){if(p.y<Y(.72))return test(h.i);return A.redraw()}
  if(v==='sort'){const k=[0,1,2].find(k=>inside(p,bin(k)));return sortCard(k==null?-1:k)}
  if(v==='split')return setSplit(S.split)
  if(v==='link'){const k=[0,1,2,3].find(k=>inside(p,oldAt(k)));return link(k==null?-1:k)}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
