/* Flagship – Healthy lifestyle choices (ages 9–11; England NC Year 6 'the impact of diet, exercise, drugs and lifestyle
   on the way their bodies function'). Run and rest to see the heart and lungs answer the muscles; train for 8 weeks and
   watch the resting rate fall while each beat pumps more; build 60 active minutes from short bursts; keep a day's free
   sugar under 24 g; time 4 sweets to cut acid attacks on teeth; breathe smoky air and see carbon monoxide take an
   oxygen seat. Data and drawings: lifechoice_art.js. Every canvas tap has a button twin below. */
(()=>{const H=LIFE;
VIS.reg('flaglifechoice',c=>{let A,P,bar,qz,qi=-1,run=0;const S={};
const mode=()=>['heart','train','active','sugar','acid','smoke','quiz'][A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function room(){const g=A.ctx;g.fillStyle=A.col.dark?'#0c1424':'#f0fdf4';g.fillRect(0,0,A.W,A.H)}
/* ---------- 1. heart at work ---------- */
let MOVE=null,SIT=null;
function exercise(){const h=S.hb;h.hr=Math.min(176,h.hr+16);h.br=Math.min(44,h.br+6);h.peak=Math.max(h.peak,h.hr);A.sound.pop();
 note(h.hr>=170?'Top speed for now. Your muscles are using oxygen as fast as the blood can bring it. Rest now.':`Running. Heart ${h.hr} beats a minute, breathing ${h.br} breaths a minute.`,false)}
function rest(){const h=S.hb;if(h.peak<H.PEAK){A.sound.miss();return note('Your heart is already near its resting rate. Run first, then see what rest does.',true)}
 h.hr=Math.max(H.REST,h.hr-14);h.br=Math.max(18,h.br-5);A.sound.tick();note(`Resting. Heart down to ${h.hr} beats a minute: the muscles need less oxygen now.`,false)}
function drawHeart(){const h=S.hb,y0=P.strip(h.peak>=H.PEAK&&h.hr<H.CALM?H.DONE[0]:h.peak<H.PEAK?`Run until your heart passes ${H.PEAK} beats a minute.`:`Now rest until it drops below ${H.CALM}.`,h.peak>=H.PEAK&&h.hr<H.CALM?'ok':S.bad?'no':'',S.note,S.bad);
 const th=Math.min(A.H*.24,120),ty=A.H-th-8,mid=(y0+ty)/2,s=Math.min(A.W*.22,(ty-y0)*.8,150)*(1+(h.hr-H.REST)/400);
 H.heart(A.ctx,A.W*.25,mid,s,h.hr>=H.PEAK?'#dc2626':'#ef4444');P.text(`${h.hr} beats a minute`,A.W*.25,mid+s*.48,15,'center');
 H.lungs(A.ctx,A.W*.72,mid-8,Math.min(A.W*.22,(ty-y0)*.7,140),h.br>24);P.text(`${h.br} breaths a minute`,A.W*.72,mid+Math.min(A.W*.22,(ty-y0)*.7,140)*.5,15,'center');
 const w=(A.W-24)/2;MOVE={x:8,y:ty,w,h:th};SIT={x:16+w,y:ty,w,h:th};P.card(MOVE,'🏃 Run on the spot',{n:18,sel:h.peak<H.PEAK});P.card(SIT,'🪑 Sit and rest',{n:18,sel:h.peak>=H.PEAK&&h.hr>=H.CALM})}
/* ---------- 2. a trained heart ---------- */
let WEEKS=[];
function train(i){const t=S.tr;if(t.n>=4||i<t.n)return;if(i!==t.n){A.sound.miss();return note(`Training builds up week by week. Fill block ${t.n+1} first.`,true)}
 t.n++;const v=H.TRAIN[t.n];A.sound.pop();note(`After ${t.n*2} weeks: resting heart ${v.hr} beats a minute, ${v.ml} ml of blood a beat, still about ${(v.hr*v.ml/1000).toFixed(1)} litres a minute.`,false)}
function drawTrain(){const t=S.tr,v=H.TRAIN[t.n],y0=P.strip(t.n>=4?H.DONE[1]:`Weeks of daily activity: ${t.n*2} of 8. Tap the next block.`,t.n>=4?'ok':S.bad?'no':'',S.note,S.bad);
 const bh=Math.min(A.H*.2,90),by=A.H-bh-8,mid=(y0+by)/2,s=Math.min(A.W*.2,(by-y0)*.75,130);H.heart(A.ctx,A.W*.22,mid,s,'#dc2626');
 const tx=A.W*.4;P.text(`Resting: ${v.hr} beats/min`,tx,mid-P.sz(15)*1.4,15);P.text(`Each beat: ${v.ml} ml`,tx,mid,15);P.meter(tx,mid+P.sz(15),A.W-tx-12,12,v.ml,60,'#0ea5e9');
 const gp=8,w=(A.W-16-gp*3)/4;WEEKS=[0,1,2,3].map(i=>{const r={i,x:8+i*(w+gp),y:by,w,h:bh};P.card(r,`Weeks ${i*2+1}–${i*2+2}${i<t.n?' ✓':''}`,{n:14,ok:i<t.n,sel:i===t.n,no:S.bad&&i===t.n+1});return r})}
/* ---------- 3. sixty active minutes ---------- */
let CARDS=[];
function act(i){const a=S.ac,x=H.ACT[i];if(a.used.includes(i)||a.min>=60)return;
 if(!x.ok){a.no=i;A.sound.miss();return note(x.why,true)}a.used.push(i);a.no=-1;a.min+=x.m;A.sound.pop();note(`${x.t}: +${x.m} minutes. ${x.why}`,false)}
function drawActive(){const a=S.ac,y0=P.strip(a.min>=60?H.DONE[2]:`Active minutes today: ${a.min} of 60. Tap what makes you puff.`,a.min>=60?'ok':S.bad?'no':'',S.note,S.bad);
 P.meter(12,y0+4,A.W-24,16,a.min,60,'#16a34a',60);const top=y0+30,cols=A.narrow?2:3,rows=Math.ceil(H.ACT.length/cols),gp=8,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-top-8-gp*(rows-1))/rows,96);
 CARDS=H.ACT.map((x,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:top+Math.floor(i/cols)*(h+gp),w,h};P.card(r,`${x.t} · ${x.m} min`,{n:15,ok:a.used.includes(i),no:a.no===i});return r})}
/* ---------- 4. free sugar budget ---------- */
let FOODS=[];
function eat(i){const s=S.su,f=H.FOOD[i];if(s.got.includes(i)||s.got.length>=4)return;
 if(s.g+f.g>H.LIMIT){s.no=i;A.sound.miss();return note(f.g>H.LIMIT?`${f.t}: about ${f.g} g of free sugar, more than the whole day's ${H.LIMIT} g on its own.`:`${f.t} would take you to ${s.g+f.g} g, over ${H.LIMIT} g. Choose something with less free sugar.`,true)}
 s.got.push(i);s.no=-1;s.g+=f.g;A.sound.pop();
 note(f.fruit?'0 g: the sugar inside a whole apple is not free sugar.':f.milk?'0 g: the natural sugar in plain milk is not free sugar.':/juice/.test(f.t)?`+${f.g} g: juicing frees the fruit's sugar, so juice counts.`:`${f.t}: +${f.g} g. ${s.g} g so far.`,false)}
function drawSugar(){const s=S.su,ok=s.got.length>=4&&s.g<=H.LIMIT,y0=P.strip(ok?H.DONE[3]:`Choices: ${s.got.length} of 4. Free sugar: ${s.g} g of ${H.LIMIT} g.`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 P.meter(12,y0+4,A.W-24,16,s.g,H.LIMIT,s.g>H.LIMIT*.8?'#f59e0b':'#16a34a');const top=y0+30,cols=A.narrow?2:4,rows=Math.ceil(H.FOOD.length/cols),gp=8,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-top-8-gp*(rows-1))/rows,90);
 FOODS=H.FOOD.map((f,i)=>{const r={i,x:8+(i%cols)*(w+gp),y:top+Math.floor(i/cols)*(h+gp),w,h};P.card(r,`${f.t} · ${f.g} g`,{n:14,ok:s.got.includes(i),no:s.no===i});return r})}
/* ---------- 5. acid attacks ---------- */
let SLOT=[];
const hours=()=>S.ad.at.filter(n=>n>0).length;
function sweet(k){const d=S.ad;if(d.n>=H.SWEETS)return;d.at[k]++;d.n++;const hr=hours();
 if(d.n<H.SWEETS){A.sound.pop();return note(`${d.n} of ${H.SWEETS} sweets eaten. Teeth under acid attack for up to ${hr} hour${hr>1?'s':''}.`,false)}
 if(hr>1){A.sound.miss();return note(`4 sweets at ${hr} different times: up to ${hr} hours of acid. Clear and try to make it 1.`,true)}
 A.sound.pop();note('4 sweets, 1 sugar time: up to 1 hour of acid.',false)}
function clearDay(){S.ad={at:Array(H.SLOTS.length).fill(0),n:0};A.sound.tick();note('Day cleared. 4 sweets to place.',false)}
function drawAcid(){const d=S.ad,ok=d.n>=H.SWEETS&&hours()===1,y0=P.strip(ok?H.DONE[4]:`Sweets placed: ${d.n} of ${H.SWEETS}. Hours of acid attack: up to ${hours()}.`,ok?'ok':S.bad?'no':'',S.note,S.bad);
 const n=H.SLOTS.length,cols=A.narrow?4:8,rows=n/cols,gp=6,w=(A.W-16-gp*(cols-1))/cols,h=Math.min((A.H-y0-12-gp*(rows-1))/rows,170);
 SLOT=H.SLOTS.map((t,k)=>{const r={k,x:8+(k%cols)*(w+gp),y:y0+4+Math.floor(k/cols)*(h+gp),w,h};P.card(r,'',{sel:k===H.LUNCH,no:S.bad&&d.at[k]>0});
  P.text(t,r.x+w/2,r.y+P.sz(13),13,'center','#0f172a');H.tooth(A.ctx,r.x+w/2,r.y+h*.5,Math.min(w*.6,h*.4),d.at[k]>0);
  P.text(d.at[k]?`🍬×${d.at[k]}`:'',r.x+w/2,r.y+h-P.sz(13),13,'center','#0f172a');return r})}
/* ---------- 6. smoke and oxygen ---------- */
let AIR=[],CELLR=[];
function breathe(smoky){const m=S.sm;m.seats=Array(H.CELLS).fill('O');if(smoky)H.CO.forEach(i=>m.seats[i]='CO');m[smoky?'smoky':'clean']=true;m.air=smoky?'smoky':'clean';A.sound.whoosh();
 note(smoky?'Smoky air: carbon monoxide grabbed a seat. It holds on over 200 times more tightly than oxygen, so the seat stays taken.':`Clean air: all ${H.CELLS} seats carry oxygen to the muscles.`,false)}
function poke(i){const m=S.sm;if(!m.air)return note('Breathe in first, clean air or smoky air.',true);
 note(m.seats[i]==='CO'?'Carbon monoxide will not let go of this seat, so this cell brings no oxygen.':'This cell carries oxygen to the muscles and brain.',m.seats[i]==='CO')}
function drawSmoke(){const m=S.sm,y0=P.strip(m.clean&&m.smoky?H.DONE[5]:'Breathe clean air, then smoky air.',m.clean&&m.smoky?'ok':S.bad?'no':'',S.note,S.bad);
 const th=Math.min(A.H*.16,70),gp=8,w=(A.W-24)/2;AIR=[{s:0,x:8,y:y0+2,w,h:th},{s:1,x:16+w,y:y0+2,w,h:th}];P.card(AIR[0],'🌳 Breathe clean air',{n:16,sel:m.air==='clean'});P.card(AIR[1],'🚬 Breathe smoky air',{n:16,sel:m.air==='smoky'});
 const top=y0+th+12,cols=5,cw=(A.W-16)/cols,ch=Math.min((A.H-top-P.sz(16)*2-8)/2,cw),r=Math.min(cw,ch)*.32;
 CELLR=[...Array(H.CELLS).keys()].map(i=>{const x=8+(i%cols+.5)*cw,y=top+(Math.floor(i/cols)+.5)*ch;H.cell(A.ctx,x,y,r,m.seats[i]);return{i,x:x-r*1.3,y:y-r*1.3,w:r*2.6,h:r*2.6}});
 const o=m.seats.filter(s=>s==='O').length;P.text(m.air?`Oxygen carried: ${o} of ${H.CELLS} seats`:'No breath yet',A.W/2,A.H-P.sz(16),16,'center')}
/* ---------- wiring ---------- */
function draw(){room();const m=mode();if(m==='quiz'){P.strip('Challenge: your body and your choices','ok');H.heart(A.ctx,A.W/2,A.H*.55,Math.min(A.W,A.H)*.32);return}
 ({heart:drawHeart,train:drawTrain,active:drawActive,sugar:drawSugar,acid:drawAcid,smoke:drawSmoke})[m]();A.fx.draw(A.ctx)}
function tap(p){const m=mode();
 if(m==='heart'){if(inR(p,MOVE))exercise();else if(inR(p,SIT))rest()}
 if(m==='train'){const r=WEEKS.find(z=>inR(p,z));if(r)train(r.i)}
 if(m==='active'){const r=CARDS.find(z=>inR(p,z));if(r)act(r.i)}
 if(m==='sugar'){const r=FOODS.find(z=>inR(p,z));if(r)eat(r.i)}
 if(m==='acid'){const r=SLOT.find(z=>inR(p,z));if(r)sweet(r.k)}
 if(m==='smoke'){const a=AIR.find(z=>inR(p,z));if(a)breathe(!!a.s);else{const r=CELLR.find(z=>inR(p,z));if(r)poke(r.i)}}return false}
function fresh(){run++;for(const k in S)delete S[k];Object.assign(S,{hb:{hr:H.REST,br:18,peak:H.REST},tr:{n:0},ac:{min:0,used:[],no:-1},su:{g:0,got:[],no:-1},
 ad:{at:Array(H.SLOTS.length).fill(0),n:0},sm:{air:null,clean:false,smoky:false,seats:Array(H.CELLS).fill(null)},note:null,bad:false,test:()=>{}})}
function note(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.test()}
const check=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(H.DONE[i]+A.reveal(i))};
function begin(i,ok){fresh();c.say(H.DESC[i]);A.cv.setAttribute('aria-label',H.DESC[i]);S.test=check(i,ok);controls();A.redraw()}
function demo(i,list){steps[i].go();const e=run;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===run)f()},t)})}
function controls(){if(!bar)return;bar.innerHTML='';const m=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(m==='heart'){B('Run on the spot',exercise);B('Sit and rest',rest)}
 if(m==='train'&&S.tr.n<4)B(`Add weeks ${S.tr.n*2+1}–${S.tr.n*2+2}`,()=>train(S.tr.n),`Add weeks ${S.tr.n*2+1} to ${S.tr.n*2+2} of daily activity`);
 if(m==='active'&&S.ac.min<60)H.ACT.forEach((x,i)=>{if(!S.ac.used.includes(i))B(`${x.t} (${x.m} min)`,()=>act(i))});
 if(m==='sugar'&&S.su.got.length<4)H.FOOD.forEach((f,i)=>{if(!S.su.got.includes(i))B(`${f.t} (${f.g} g)`,()=>eat(i))});
 if(m==='acid'){if(S.ad.n<H.SWEETS)H.SLOTS.forEach((t,k)=>B(t,()=>sweet(k),`Eat a sweet at ${t}`));B('Clear the day',clearDay)}
 if(m==='smoke'){B('Breathe clean air',()=>breathe(false));B('Breathe smoky air',()=>breathe(true))}}
const steps=[
{h:'Your heart at work',p:H.TXT[0],task:'Run until your heart passes 120, then rest below 100',
 show:()=>demo(0,[[350,exercise],[350,exercise],[350,exercise],[350,exercise],[400,rest],[400,rest],[400,rest],[400,rest]]),go:()=>begin(0,()=>S.hb.peak>=H.PEAK&&S.hb.hr<H.CALM)},
{h:'A trained heart',p:H.TXT[1],predict:{q:'After 8 weeks of being active every day, what happens to your resting heart rate?',opts:['It goes up: the heart is worn out','It goes down: each beat pumps more blood'],ans:1},task:'Add all 8 weeks of activity',
 show:()=>demo(1,[0,1,2,3].map(i=>[400,()=>train(i)])),go:()=>begin(1,()=>S.tr.n>=4)},
{h:'Sixty active minutes',p:H.TXT[2],predict:{q:'Do your 60 active minutes have to be done in one go?',opts:['Yes, or they do not count','No, short bursts add up'],ans:1},task:'Reach 60 active minutes',
 show:()=>demo(2,[0,2,4,5].map(i=>[450,()=>act(i)])),go:()=>begin(2,()=>S.ac.min>=60)},
{h:'A free sugar budget',p:H.TXT[3],predict:{q:'Does the sugar in a whole apple count towards your 24 g of free sugar?',opts:['Yes, all sugar counts','No, sugar inside whole fruit is not free sugar'],ans:1},task:'Choose 4 things and stay at 24 g or less',
 show:()=>demo(3,[0,2,4,5].map(i=>[450,()=>eat(i)])),go:()=>begin(3,()=>S.su.got.length>=4&&S.su.g<=H.LIMIT)},
{h:'Acid attacks on teeth',p:H.TXT[4],predict:{q:'Same 4 sweets. Which is kinder to your teeth?',opts:['One every hour: less sugar at a time','All 4 with lunch: one acid attack'],ans:1},task:'Eat all 4 sweets with only 1 hour of acid',
 show:()=>demo(4,[0,1,2,3].map(()=>[400,()=>sweet(H.LUNCH)])),go:()=>begin(4,()=>S.ad.n>=H.SWEETS&&hours()===1)},
{h:'Smoke and oxygen',p:H.TXT[5],task:'Breathe clean air, then smoky air',
 show:()=>demo(5,[[500,()=>breathe(false)],[700,()=>breathe(true)]]),go:()=>begin(5,()=>S.sm.clean&&S.sm.smoky)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.test()});
function slip(t){let m='Choices you repeat every day change how the heart, lungs, teeth and blood work.';
 if(t==='up')m='Working muscles need more oxygen, so the heart beats faster and you breathe faster to bring it.';
 if(t==='worn')m='Exercise makes the heart muscle stronger. Each beat pumps more blood, so it needs fewer beats at rest.';
 if(t==='sit')m='Active minutes make you breathe harder and warm up. Sitting still does not count, however exciting the screen is.';
 if(t==='once')m='Short bursts add up: a 15-minute walk, a 20-minute bike ride and playground games all count towards 60.';
 if(t==='fruit')m='Sugar inside whole fruit and in plain milk is not free sugar. Juice is, because juicing frees the sugar.';
 if(t==='juice')m='A 330 ml can of cola has about 35 g of sugar. That is more than the 24 g limit for ages 7 to 10 in one go.';
 if(t==='graze')m='Each time you have sugar, acid attacks teeth for up to an hour. Four sugar times means four attacks.';
 if(t==='lungs')m='Carbon monoxide in smoke takes oxygen’s place in the blood, and the heart has to work harder. It is not just the lungs.';
 return m}
function quiz(){qi++;const Q=H.QS[qi%H.QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:X=>{qz.hidden=X.step!==6;bar.hidden=X.step===6;controls()},
 init:X=>{A=X;P=H.PEN(A);const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lifestyle lab buttons'},w);qz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:tap});controls()}}).start()})})();
