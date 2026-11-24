/* Flagship – spending and saving: needs and wants (ages 6-7; PSHE Association KS1 L10-L13). Drag eight things into
   Need or Want (sweets are a want however much you want them), shop with 10 pounds and find the needs must go in the
   basket first, save 2 pounds a week in a jar for a 10 pound kite while the sweet shop tempts, tap the safe places to
   keep money, and choose between wants with 5 pounds, seeing what you give up. Data and drawings: spend_art.js. */
(()=>{const D=SPD;
VIS.reg('flagspend',c=>{let A,P,pad,cq,qn=-1,run=0,hold=null;const S={};c.fig.classList.add('young');
const MODES=['sort','shop','save','safe','choose','quiz'],mode=()=>MODES[A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const GBP=n=>`£${n}`;
/* ---------- 1. need or want ---------- */
let BOX=[],CARD=null;
function drop(b){const s=S.so,it=D.SORT[s.i];if(!it)return;
 if(b!==it.n){s.no=b;A.sound.miss();
  if(it.t==='Sweets')return tell('Wanting sweets a lot does not make them a need. We can live and stay well without them. Sweets are a want.',true);
  return tell(it.n?`We must have ${it.t.toLowerCase()} to live and stay well. It is a need.`:`A ${it.t.toLowerCase()} is nice to have, but we can live without it. It is a want.`,true)}
 s.i++;s.no=-1;s.got[b].push(it.e);A.sound.pop();tell(`${it.t}: ${b?'a need.':'a want.'}`,false)}
function drawSort(){const s=S.so,it=D.SORT[s.i],y0=P.strip(it?`Card ${s.i+1} of 8: ${it.t}. Need or want?`:D.DONE[0],it?(S.bad?'no':''):'ok',S.note,S.bad),g=A.ctx;
 const bh=Math.min((A.H-y0)*.42,170),by=A.H-bh-8,gp=10,bw=(A.W-16-gp)/2;
 BOX=[1,0].map((n,j)=>{const r={n,x:8+j*(bw+gp),y:by,w:bw,h:bh};P.card(r,'',{no:s.no===n});P.text(n?'Need':'Want',r.x+bw/2,r.y+P.sz(18),18,'center','#0f172a');
  s.got[n].forEach((e,k)=>D.emo(g,e,r.x+bw*(.14+(k%4)*.24),r.y+bh*.5+Math.floor(k/4)*Math.min(34,bh*.24),Math.min(28,bw/6)));return r});
 if(it){const cs=Math.min(by-y0-14,A.W*.34,150),x=hold?hold.x-cs/2:A.W/2-cs/2,y=hold?hold.y-cs/2:y0+4;CARD={x,y,w:cs,h:cs};P.card(CARD,'',{sel:!!hold});D.emo(g,it.e,x+cs/2,y+cs*.42,cs*.5);P.text(it.t,x+cs/2,y+cs*.86,14,'center','#0f172a')}else CARD=null}
/* ---------- 2. the shop ---------- */
let SHELF=[];
const spent=()=>S.sh.bag.reduce((t,i)=>t+D.SHOP[i].p,0),needsIn=()=>D.SHOP.every((x,i)=>!x.n||S.sh.bag.includes(i));
function shop(i){const h=S.sh,x=D.SHOP[i];
 if(h.bag.includes(i)){h.bag=h.bag.filter(j=>j!==i);A.sound.tick();return tell(`${x.t} back on the shelf. You have ${GBP(D.PURSE-spent())} left.`,false)}
 if(spent()+x.p>D.PURSE){A.sound.miss();const miss=D.SHOP.filter((y,j)=>y.n&&!h.bag.includes(j)).map(y=>y.t.toLowerCase());
  return tell(`Not enough money: ${x.t.toLowerCase()} costs ${GBP(x.p)} and you have ${GBP(D.PURSE-spent())} left.${miss.length&&h.bag.some(j=>!D.SHOP[j].n)?` You still need ${miss.join(' and ')}. Put a want back: needs come first.`:''}`,true)}
 h.bag.push(i);A.sound.pop();tell(`${x.t} in the basket (${x.n?'a need':'a want'}). ${GBP(D.PURSE-spent())} left.`,false)}
function drawShop(){const h=S.sh,ok=needsIn(),y0=P.strip(ok?D.DONE[1]:`Money left: ${GBP(D.PURSE-spent())}. Get everything you need.`,ok?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const gp=8,cols=A.narrow?3:5,w=(A.W-16-gp*(cols-1))/cols,rows=Math.ceil(D.SHOP.length/cols),h0=Math.min((A.H-y0-60)/rows-gp,w*1.1);
 SHELF=D.SHOP.map((x,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:y0+Math.floor(i/cols)*(h0+gp),w,h:h0};const inB=h.bag.includes(i);P.card(r,'',{ok:inB});
  D.emo(g,x.e,r.x+w/2,r.y+h0*.36,Math.min(w,h0)*.38);P.text(x.t,r.x+w/2,r.y+h0*.7,13,'center','#0f172a');P.text(GBP(x.p),r.x+w/2,r.y+h0*.88,15,'center','#0f172a');return r});
 const by=A.H-56;D.emo(g,'🧺',26,by+14,28);P.text(`Basket: ${GBP(spent())} of ${GBP(D.PURSE)}`,48,by+14,15,'left');P.meter(8,by+34,A.W-16,14,spent(),D.PURSE,'#16a34a')}
/* ---------- 3. saving up ---------- */
let JAR=null,SWEET=null;
function save(){const v=S.sv;if(v.jar>=D.KITE)return;v.wk++;v.jar+=D.WEEK;A.sound.pop();tell(v.jar>=D.KITE?`Week ${v.wk}: ${GBP(v.jar)} in the jar. That is enough. You bought the kite!`:`Week ${v.wk}: saved. ${GBP(v.jar)} in the jar, ${GBP(D.KITE-v.jar)} to go.`,false)}
function sweets(){const v=S.sv;if(v.jar>=D.KITE)return;v.wk++;v.ate++;A.sound.miss();tell(`Week ${v.wk}: yum, but that ${GBP(D.WEEK)} is gone now. It does not come back. The jar still has ${GBP(v.jar)}.`,true)}
function drawSave(){const v=S.sv,ok=v.jar>=D.KITE,y0=P.strip(ok?D.DONE[2]:`Week ${v.wk}. Jar: ${GBP(v.jar)} of ${GBP(D.KITE)} for the kite.`,ok?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const gp=10,w=(A.W-16-gp*2)/3,h=Math.min(A.H-y0-12,w*1.5);JAR={x:8,y:y0+4,w,h};SWEET={x:8+2*(w+gp),y:y0+4,w,h};
 P.card(JAR,'',{sel:!ok});D.jar(g,JAR.x+w*.2,JAR.y+h*.1,w*.6,h*.55,v.jar,D.KITE,A.col.dark);P.text(`Save ${GBP(D.WEEK)}`,JAR.x+w/2,JAR.y+h*.82,15,'center','#0f172a');
 D.emo(g,ok?'🪁':'🪁',8+w+gp+w/2,y0+4+h*.35,Math.min(w,h)*.5);P.text(`Kite ${GBP(D.KITE)}`,8+w+gp+w/2,y0+4+h*.75,16,'center');if(ok)P.text('Bought!',8+w+gp+w/2,y0+4+h*.9,15,'center');else D.emo(g,'🔒',8+w+gp+w*.8,y0+4+h*.15,Math.min(w,h)*.18);
 P.card(SWEET,'');D.emo(g,'🍭',SWEET.x+w/2,SWEET.y+h*.35,Math.min(w,h)*.42);P.text(`Spend ${GBP(D.WEEK)}`,SWEET.x+w/2,SWEET.y+h*.82,15,'center','#0f172a')}
/* ---------- 4. keep it safe ---------- */
let SPOT=[];
function place(i){const k=S.kp,x=D.PLACES[i];if(k.got.includes(i))return;if(!x.ok){k.no=i;A.sound.miss();return tell(x.why,true)}k.got.push(i);k.no=-1;A.sound.pop();tell(`${x.t}: a safe place for money. ${k.got.length} of 3.`,false)}
function drawSafe(){const k=S.kp,ok=k.got.length>=3,y0=P.strip(ok?D.DONE[3]:`Safe places found: ${k.got.length} of 3.`,ok?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const gp=8,cols=A.narrow?2:3,w=(A.W-16-gp*(cols-1))/cols,rows=Math.ceil(D.PLACES.length/cols),h=Math.min((A.H-y0-8)/rows-gp,w*.9);
 SPOT=D.PLACES.map((x,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:y0+Math.floor(i/cols)*(h+gp),w,h};P.card(r,'',{ok:k.got.includes(i),no:k.no===i});D.emo(g,x.e,r.x+w/2,r.y+h*.4,Math.min(w,h)*.42);P.text(x.t,r.x+w/2,r.y+h*.82,13,'center','#0f172a');return r})}
/* ---------- 5. choosing between wants ---------- */
let WANT=[];
const used=()=>S.ch.pick.reduce((t,i)=>t+D.WANTS[i].p,0),stuck=()=>D.WANTS.every((x,i)=>S.ch.pick.includes(i)||used()+x.p>D.LEFT)&&S.ch.pick.length>0;
function choose(i){const h=S.ch,x=D.WANTS[i];if(stuck())return;if(h.pick.includes(i))return;
 if(used()+x.p>D.LEFT){A.sound.miss();return tell(`The ${x.t.toLowerCase()} costs ${GBP(x.p)}, but you only have ${GBP(D.LEFT-used())} left. You cannot have every want.`,true)}
 h.pick.push(i);A.sound.pop();const gave=D.WANTS.filter((y,j)=>!h.pick.includes(j)).map(y=>'the '+y.t.toLowerCase());
 tell(stuck()?`You chose ${h.pick.map(j=>'the '+D.WANTS[j].t.toLowerCase()).join(' and ')}, so you go without ${gave.join(' and ')} this time. That is OK.`:`${x.t}: ${GBP(D.LEFT-used())} left.`,false)}
function drawChoose(){const h=S.ch,ok=stuck(),y0=P.strip(ok?D.DONE[4]:`You have ${GBP(D.LEFT-used())}. Choose your wants.`,ok?'ok':S.bad?'no':'',S.note,S.bad),g=A.ctx;
 const gp=10,w=(A.W-16-gp*2)/3,hh=Math.min(A.H-y0-56,w*1.3);
 WANT=D.WANTS.map((x,i)=>{const r={i,x:8+i*(w+gp),y:y0+4,w,h:hh},on=h.pick.includes(i);P.card(r,'',{ok:on,dim:ok&&!on});D.emo(g,x.e,r.x+w/2,r.y+hh*.38,Math.min(w,hh)*.4);P.text(x.t,r.x+w/2,r.y+hh*.7,14,'center','#0f172a');P.text(GBP(x.p),r.x+w/2,r.y+hh*.88,16,'center','#0f172a');return r});
 P.text(`Spent: ${GBP(used())} of ${GBP(D.LEFT)}`,8,A.H-44,15,'left');P.meter(8,A.H-28,A.W-16,16,used(),D.LEFT,'#16a34a')}
/* ---------- wiring ---------- */
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#1c1917':'#fffbeb';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){P.strip('Challenge: needs, wants and saving','ok');D.emo(g,'🐷',A.W/2,A.H*.58,Math.min(A.W,A.H)*.34);return}
 ({sort:drawSort,shop:drawShop,save:drawSave,safe:drawSafe,choose:drawChoose})[m]();A.fx.draw(g)}
function down(p){const m=mode();
 if(m==='sort'){if(hit(p,CARD)){hold={x:p.x,y:p.y};return true}const b=BOX.find(r=>hit(p,r));if(b)drop(b.n);return false}
 if(m==='shop'){const r=SHELF.find(r=>hit(p,r));if(r)shop(r.i)}
 if(m==='save'){if(hit(p,JAR))save();else if(hit(p,SWEET))sweets()}
 if(m==='safe'){const r=SPOT.find(r=>hit(p,r));if(r)place(r.i)}
 if(m==='choose'){const r=WANT.find(r=>hit(p,r));if(r)choose(r.i)}return false}
function move(p){if(hold){hold={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!hold)return;hold=null;const b=BOX.find(r=>hit(p,r));if(b)drop(b.n);else A.redraw()}
function fresh(){run++;hold=null;for(const k in S)delete S[k];Object.assign(S,{so:{i:0,no:-1,got:{0:[],1:[]}},sh:{bag:[]},sv:{jar:0,wk:0,ate:0},kp:{got:[],no:-1},ch:{pick:[]},note:null,bad:false,check:()=>{}})}
function tell(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
const watch=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=watch(i,ok);controls();A.redraw()}
function play(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!pad)return;pad.innerHTML='';const m=mode(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='sort'&&D.SORT[S.so.i]){Bt('Need',()=>drop(1),`${D.SORT[S.so.i].t} is a need`);Bt('Want',()=>drop(0),`${D.SORT[S.so.i].t} is a want`)}
 if(m==='shop')D.SHOP.forEach((x,i)=>Bt(`${S.sh.bag.includes(i)?'Put back':'Buy'} ${x.t.toLowerCase()} ${GBP(x.p)}`,()=>shop(i)));
 if(m==='save'&&S.sv.jar<D.KITE){Bt(`Save ${GBP(D.WEEK)}`,save,`Save ${GBP(D.WEEK)} in the jar`);Bt(`Spend ${GBP(D.WEEK)} on sweets`,sweets)}
 if(m==='safe')D.PLACES.forEach((x,i)=>{if(!S.kp.got.includes(i))Bt(x.t,()=>place(i),`Keep money: ${x.t}`)});
 if(m==='choose'&&!stuck())D.WANTS.forEach((x,i)=>{if(!S.ch.pick.includes(i))Bt(`${x.t} ${GBP(x.p)}`,()=>choose(i),`Choose the ${x.t.toLowerCase()} for ${GBP(x.p)}`)})}
const steps=[
{h:'Need or want?',p:D.TXT[0],predict:{q:'Are sweets a need?',opts:['Yes, I really want them','No, they are a want'],ans:1},task:'Put all 8 cards in the right box',
 show:()=>play(0,D.SORT.map(x=>[380,()=>drop(x.n)])),go:()=>begin(0,()=>S.so.i>=D.SORT.length)},
{h:'Needs first',p:D.TXT[1],predict:{q:'You have £10. Bread, milk and apples cost £5. The robot is £8. Can you buy it all?',opts:['Yes, £10 is lots','No, that is £13'],ans:1},task:'Get bread, milk and apples',
 show:()=>play(1,[[450,()=>shop(0)],[450,()=>shop(1)],[450,()=>shop(2)]]),go:()=>begin(1,needsIn)},
{h:'Saving up',p:D.TXT[2],task:'Save up for the £10 kite',
 show:()=>play(2,[0,1,2,3,4].map(()=>[380,save])),go:()=>begin(2,()=>S.sv.jar>=D.KITE)},
{h:'Keep it safe',p:D.TXT[3],task:'Find the 3 safe places',
 show:()=>play(3,D.PLACES.map((x,i)=>[400,()=>{if(x.ok)place(i)}]).filter((_,i)=>D.PLACES[i].ok)),go:()=>begin(3,()=>S.kp.got.length>=3)},
{h:'Choosing',p:D.TXT[4],task:'Spend your £5 on wants',
 show:()=>play(4,[[450,()=>choose(1)],[450,()=>choose(2)]]),go:()=>begin(4,stuck)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function slip(t){let m='Needs come first, then wants. Save a little at a time, and keep money safe.';
 if(t==='want')m='Wanting something a lot does not make it a need. We can live without sweets, so they are a want.';
 if(t==='need')m='A warm coat in winter keeps us well. We must have it, so it is a need.';
 if(t==='first')m='Buy the needs first. If you buy the toy first, there may be no money left for food.';
 if(t==='gone')m='Once money is spent, it is gone. It does not come back to your jar.';
 if(t==='save')m='Small amounts add up: 2 pounds a week for 3 weeks is 6 pounds.';
 if(t==='safe')m='Money left out or in a pocket with a hole can be lost. Keep it in a money box or a bank.';
 if(t==='all')m='Money runs out, so you cannot have every want. Choosing one means going without another.';
 return m}
function ask(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function answer(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{cq.hidden=X.step!==5;pad.hidden=X.step===5;controls()},
 init:X=>{A=X;P=D.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spending and saving lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
