/* Flagship – noticing good things, gratitude (ages 8–9; PSHE Association KS2 mental health; DfE Relationships and
   Health Education 2019; NHS Five Ways to Wellbeing "take notice"; Emmons and McCullough 2003). Scenes: pick three good
   things from a mixed day into a jar, match each good thing to the person who made it happen, sort big and small good
   things, hold a sad feeling and a good thing side by side, and write a specific thank-you note. Data in
   learn/glad_art.js. */
(()=>{const {DAY,HELP,PEOPLE,SIZES,BINS2,BOTH,THANKS,QS}=GLAD;
VIS.reg('flagglad',c=>{let A,pad,box,turn=-1,gen=0;const K={};
const NIB='#172554',YEP='#047857',NOPE='#b91c1c',EDGE='#6b7280',GLOW='#7c3aed',HONEY='#fbbf24',FT='px system-ui,sans-serif';
const room=()=>['jar','who','size','both','note','quiz'][A.step];
const up=n=>A.narrow?n:Math.round(n*1.1);
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.05:.45);g.fillRect(0,0,A.W,A.H)}
function head(t,y,o){o=o||{};const g=A.ctx;let n=up(o.n||14);g.font=`800 ${n}${FT}`;let w=g.measureText(t).width+28;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FT}`;w=g.measureText(t).width+28}
 const h=n+15,x=Math.max(5,(A.W-w)/2);g.fillStyle=o.bg||'#ffffff';A.paint.rrect(x,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?YEP:o.no?NOPE:EDGE;g.stroke();
 g.fillStyle=NIB;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1,A.W-14)}
function split(t,max,g){const rows=[''];for(const w of t.split(' ')){const k=rows.length-1,s=rows[k]?rows[k]+' '+w:w;if(g.measureText(s).width>max&&rows[k])rows.push(w);else rows[k]=s}return rows}
function slab(r,icon,text,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.no?NOPE:o.ok?YEP:o.on?GLOW:EDGE;g.stroke();g.textAlign='center';g.textBaseline='middle';
 const side=o.row&&icon;if(icon){g.font=`${Math.round(side?Math.min(r.h*.55,30):Math.min(r.h*.32,r.w*.32))}${FT}`;g.fillStyle='#000';g.fillText(icon,side?r.x+22:r.x+r.w/2,side?r.y+r.h/2:r.y+r.h*.27)}
 if(text){const n=Math.round(Math.max(11,Math.min(up(o.n||13),r.h*.16+4))),L0=side?r.x+40:r.x,Wd=side?r.w-46:r.w;g.font=`800 ${n}${FT}`;g.fillStyle=NIB;const L=split(text,Wd-10,g).slice(0,3),cy=side||!icon?r.y+r.h/2:r.y+r.h*.68;
  if(side)g.textAlign='left';L.forEach((s,j)=>g.fillText(s,side?L0:L0+Wd/2,cy+(j-(L.length-1)/2)*(n+2),Wd-8))}}
function grid(n,top,h,per,gap){per=per||n;gap=gap||8;const w=Math.min(165,(A.W-gap*(per+1))/per),x0=(A.W-(w*per+gap*(per-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%per)*(w+gap),y:top+Math.floor(i/per)*(h+gap),w,h}))}
function rows(n,top,h,left,width){return Array.from({length:n},(_,i)=>({i,x:left,y:top+i*(h+8),w:width,h}))}
const lc=t=>/^(Dad|Leo|Ms|My)\b/.test(t)&&!/^My/.test(t)?t:t.charAt(0).toLowerCase()+t.slice(1);
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. three good things into the jar */
const jarR=()=>{const w=Math.min(A.W*.46,240),h=A.H*.3;return{x:(A.W-w)/2,y:A.H*.07,w,h}},dayR=()=>grid(8,A.H*.43,A.narrow?A.H*.25:A.H*.24,4);
function drawJar(){const s=K.a,g=A.ctx,j=jarR();sky();
 g.fillStyle=A.col.dark?'#e0f2fe':'#f0f9ff';A.paint.rrect(j.x,j.y,j.w,j.h,22);g.fill();g.lineWidth=s.hot?4:2.5;g.strokeStyle=s.hot?GLOW:'#0369a1';g.stroke();
 g.fillStyle='#0369a1';A.paint.rrect(j.x+j.w*.2,j.y-8,j.w*.6,14,6);g.fill();
 g.fillStyle=NIB;g.font=`800 ${up(13)}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillText(`Good things jar: ${s.in.length}`,j.x+j.w/2,j.y+18);
 s.in.forEach((k,m)=>{g.font=`${Math.round(j.h*.26)}${FT}`;g.fillStyle='#000';g.fillText(DAY[k][0],j.x+j.w*(.2+.3*(m%3)),j.y+j.h*(.52+.3*Math.floor(m/3)))});
 dayR().forEach(r=>{if(s.in.includes(r.i)||(K.drag&&K.drag.k===r.i))return;slab(r,DAY[r.i][0],DAY[r.i][1],{no:s.bad===r.i,on:s.pick===r.i,n:12})});
 if(K.drag){const d=K.drag,r=dayR()[0];slab({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},DAY[d.k][0],DAY[d.k][1],{on:1,n:12})}}
function drop(k){const s=K.a;if(s.in.includes(k))return;s.pick=null;
 if(!DAY[k][2]){s.bad=k;A.sound.miss();return tell(`${DAY[k][1]} was not a good thing, and that is fine to say. Gratitude means noticing what did go well, not pretending the bad bits were good.`)}
 s.in.push(k);s.bad=null;A.sound.pop();tell(s.in.length>=3?`Three good things: ${s.in.map(i=>lc(DAY[i][1])).join(', ')}. Even a day with bad bits has good things in it.`:`${DAY[k][1]}: into the jar. ${s.in.length} of 3.`)}
/* 2. who made it happen? */
const giftR=()=>rows(4,A.H*.06,A.H*.15,8,A.W*.56),personR=()=>rows(4,A.H*.06,A.H*.15,A.W*.56+18,A.W*.44-26);
function drawWho(){const s=K.b,g=A.ctx;sky();
 giftR().forEach((r,i)=>{const got=s.link[i];slab(r,HELP[i][0],HELP[i][1]+(got!=null?' ← '+PEOPLE[got]:''),{row:1,ok:got!=null,no:s.bad===i,on:s.hot===i,n:13})});
 personR().forEach((r,m)=>{if(s.link.includes(m)||(K.drag&&K.drag.m===m))return;slab(r,'🙋',PEOPLE[m],{row:1,on:s.pick===m,bg:'#ede9fe',n:13})});
 if(K.drag){const d=K.drag,r=personR()[0];slab({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},'🙋',PEOPLE[d.m],{row:1,on:1,bg:'#ede9fe',n:13})}
 const all=s.link.every(v=>v!=null);head(all?'Every good thing had a person behind it':'Drag each person to the good thing they made happen',A.H*.78,{ok:all,n:12});
 if(all)head('And more: farmers grew the apple, a shop sold it',A.H*.9,{n:12,bg:'#fef9c3'})}
function link(m,i){const s=K.b;if(s.link.includes(m)||s.link[i]!=null)return;s.pick=null;
 if(HELP[i][2]!==PEOPLE[m]){s.bad=i;A.sound.miss();return tell(`${PEOPLE[m]} did not do that one. Think: who did ${lc(HELP[i][1])} need?`)}
 s.link[i]=m;s.bad=null;A.sound.pop();tell(`${HELP[i][1]}: thanks to ${PEOPLE[m].replace(/^The /,'the ')}.`+(s.link.every(v=>v!=null)?' Good things rarely just happen. Someone usually made them happen.':''))}
/* 3. big and small */
const binR=()=>grid(2,A.H*.05,A.H*.27),thingR=()=>grid(6,A.H*.42,A.narrow?A.H*.17:A.H*.24,A.narrow?3:3);
function drawSize(){const s=K.c;sky();
 binR().forEach((r,b)=>{const n=s.in.filter(i=>SIZES[i][2]===b).length;slab(r,BINS2[b][0],`${BINS2[b][1]}${n?' ('+n+')':''}`,{on:s.hot===b,bg:b?'#e0f2fe':'#fef3c7',n:14})});
 thingR().forEach(r=>{if(s.in.includes(r.i)||(K.drag&&K.drag.k===r.i))return;slab(r,SIZES[r.i][0],SIZES[r.i][1],{no:s.bad===r.i,on:s.pick===r.i,n:12})});
 if(K.drag){const d=K.drag,r=thingR()[0];slab({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},SIZES[d.k][0],SIZES[d.k][1],{on:1,n:12})}
 if(s.in.length>=6)head('Both boxes go in the gratitude jar',A.H*.92,{ok:1,n:12})}
function sizeUp(k,b){const s=K.c;if(s.in.includes(k))return;s.pick=null;
 if(SIZES[k][2]!==b){s.bad=k;A.sound.miss();return tell(SIZES[k][2]?`${SIZES[k][1]} is a small, everyday good thing. Small things count too.`:`${SIZES[k][1]} is a big, special event.`)}
 s.in.push(k);s.bad=null;A.sound.pop();tell(`${SIZES[k][1]}: ${BINS2[b][1].toLowerCase()}.`+(s.in.length>=6?' Small everyday things happen far more often, so noticing them gives you lots to be glad about.':''))}
/* 4. two feelings at once */
const sayR=()=>rows(3,A.H*.3,A.H*.18,A.W*.05,A.W*.9);
function drawBoth(){const s=K.d;sky();
 if(s.k>=BOTH.length){head('Sad and glad can sit side by side',A.H*.1,{ok:1});BOTH.forEach((b,j)=>head(b.opts[0][0],A.H*(.32+j*.2),{n:12,bg:'#ecfdf5'}));return}
 const B=BOTH[s.k];head(`${s.k+1} of 3: ${B.s}`,A.H*.08,{n:14,bg:'#fee2e2'});head('Which is honest and grateful?',A.H*.19,{n:12});
 sayR().forEach((r,j)=>{const o=B.opts[s.ord[j]];slab(r,'',o[0],{no:s.bad===s.ord[j],n:13})})}
function feel(j){const s=K.d;if(s.k>=BOTH.length)return;const o=BOTH[s.k].opts[s.ord[j]];
 if(o[1]!=='ok'){s.bad=s.ord[j];A.sound.miss();return tell(o[1]==='fake'?'That pretends the sad feeling away. Gratitude does not mean faking happy: name the feeling too.':o[1]==='ban'?'Being thankful does not ban sad feelings. Both can be true at once.':'That misses every good thing. Look for one small thing, or one person who helped.')}
 s.k++;s.bad=null;A.sound.pop();tell(`Yes: ${o[0]}`+(s.k<BOTH.length?' Next one.':' Gratitude sits next to other feelings; it does not replace them.'))}
/* 5. a specific thank-you note */
const noteR=()=>({x:A.W*.06,y:A.H*.05,w:A.W*.88,h:A.H*.36}),bitR=()=>rows(3,A.H*.47,A.H*.13,A.W*.06,A.W*.88);
function drawNote(){const s=K.e,g=A.ctx,n=noteR();sky();
 if(s.k>=THANKS.length){head('Two specific thank-yous written',A.H*.1,{ok:1});THANKS.forEach((t,j)=>head(`${t.who}: thank you, you ${t.what[0][0]}.`,A.H*(.35+j*.2),{n:12,bg:'#ecfdf5'}));return}
 const T=THANKS[s.k];slab(n,'💌','',{bg:'#fff7ed'});g.textAlign='left';g.fillStyle=NIB;g.font=`800 ${up(14)}${FT}`;
 const lines=[`Dear ${T.who},`,`Thank you: you ${s.what!=null?T.what[s.what][0]:'…'}.`,s.how!=null?T.how[s.how][0]:'…'];
 lines.forEach((t,j)=>split(t,n.w-28,g).slice(0,2).forEach((u,q)=>g.fillText(u,n.x+14,n.y+n.h*.42+j*(up(14)+10)+q*(up(14)+2))));
 const part=s.what==null?T.what:T.how;head(s.what==null?'What did they do? Tap one':'How did it help? Tap one',A.H*.44-6,{n:12});
 bitR().forEach((r,j)=>{const o=part[s.ord[j]];slab(r,'',o[0],{no:s.bad===s.ord[j],n:13})})}
function pickBit(j){const s=K.e;if(s.k>=THANKS.length)return;const T=THANKS[s.k],stage=s.what==null?'what':'how',o=T[stage][s.ord[j]];
 if(o[1]!=='ok'){s.bad=s.ord[j];A.sound.miss();return tell(o[1]==='vague'?`"${o[0]}" is vague. Say exactly what they did or how it helped.`:o[1]==='off'?'That is not something to thank them for. Pick what they did for you.':'That is not a thank-you. It asks for something back.')}
 s[stage]=s.ord[j];s.bad=null;A.sound.pop();
 if(stage==='how'){const done=`Dear ${T.who}, thank you: you ${T.what[s.what][0]}. ${o[0]}`;s.k++;s.what=null;s.how=null;return tell(done+(s.k<THANKS.length?' Next note.':' Specific thanks say who, what they did and how it helped.'))}
 tell(`You ${o[0]}. Now say how it helped.`)}
function draw(){const k=room();if(k==='quiz'){sky();head('Challenge',A.H*.18,{ok:1});head('🫙 Notice · name · thank',A.H*.5,{n:15});return}
 ({jar:drawJar,who:drawWho,size:drawSize,both:drawBoth,note:drawNote})[k]();A.fx.draw(A.ctx)}
function down(p){const k=room();
 if(k==='jar'){const s=K.a,r=dayR().find(r=>over(p,r)&&!s.in.includes(r.i));if(r){K.drag={k:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(over(p,jarR())&&s.pick!=null)drop(s.pick);return false}
 if(k==='who'){const s=K.b,r=personR().find(r=>over(p,r)&&!s.link.includes(r.i));if(r){K.drag={m:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const g=giftR().find(r=>over(p,r));if(g&&s.pick!=null)link(s.pick,g.i);return false}
 if(k==='size'){const s=K.c,r=thingR().find(r=>over(p,r)&&!s.in.includes(r.i));if(r){K.drag={k:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const b=binR().find(r=>over(p,r));if(b&&s.pick!=null)sizeUp(s.pick,b.i);return false}
 if(k==='both'){const r=sayR().find(r=>over(p,r));if(r)feel(r.i);return false}
 if(k==='note'){const r=bitR().find(r=>over(p,r));if(r)pickBit(r.i);return false}return false}
function move(p){const d=K.drag;if(!d)return;d.x=p.x;d.y=p.y;const k=room();
 if(k==='jar')K.a.hot=over(p,jarR());if(k==='who'){const g=giftR().find(r=>over(p,r));K.b.hot=g?g.i:-1}if(k==='size'){const b=binR().find(r=>over(p,r));K.c.hot=b?b.i:-1}A.redraw()}
function lift(p){const d=K.drag;if(!d)return;K.drag=null;const k=room(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;
 if(k==='jar'){K.a.hot=false;if(over(p,jarR()))return drop(d.k);if(tap){K.a.pick=d.k;return tell(`Picked ${lc(DAY[d.k][1])}. Tap the jar to add it.`)}}
 if(k==='who'){K.b.hot=-1;const g=giftR().find(r=>over(p,r));if(g)return link(d.m,g.i);if(tap){K.b.pick=d.m;return tell(`Picked ${PEOPLE[d.m]}. Now tap the good thing they made happen.`)}}
 if(k==='size'){K.c.hot=-1;const b=binR().find(r=>over(p,r));if(b)return sizeUp(d.k,b.i);if(tap){K.c.pick=d.k;return tell(`Picked ${lc(SIZES[d.k][1])}. Now tap Big or Small.`)}}A.redraw()}
function reset(){gen++;for(const k in K)delete K[k];Object.assign(K,{a:{in:[],bad:null,pick:null,hot:false},b:{link:[null,null,null,null],bad:null,pick:null,hot:-1},c:{in:[],bad:null,pick:null,hot:-1},
 d:{k:0,ord:[1,0,2],bad:null},e:{k:0,ord:[2,0,1],what:null,how:null,bad:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){reset();tell(desc);K.hook=watch(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=room(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='jar'&&K.a.in.length<3)DAY.forEach((d,i)=>{if(!K.a.in.includes(i))Bt(`${d[0]} ${d[1]} → jar`,()=>drop(i),`Put ${d[1]} in the good things jar`)});
 if(k==='who'){const i=K.b.link.indexOf(null);if(i>=0)PEOPLE.forEach((w,m)=>{if(!K.b.link.includes(m))Bt(`${w} → ${HELP[i][1]}`,()=>link(m,i),`${w} made ${HELP[i][1]} happen`)})}
 if(k==='size'){const i=SIZES.findIndex((x,q)=>!K.c.in.includes(q));if(i>=0)BINS2.forEach((b,q)=>Bt(`${SIZES[i][1]} → ${b[1]}`,()=>sizeUp(i,q)))}
 if(k==='both'&&K.d.k<BOTH.length)K.d.ord.forEach((q,j)=>Bt(BOTH[K.d.k].opts[q][0],()=>feel(j)));
 if(k==='note'&&K.e.k<THANKS.length){const T=THANKS[K.e.k],part=K.e.what==null?T.what:T.how;K.e.ord.forEach((q,j)=>Bt(part[q][0],()=>pickBit(j)))}}
const steps=[
{h:'Three good things',p:'A mixed day: some good bits, some bad bits. Drag three good things into the jar, or tap a card and then the jar.',
 task:'Put 3 good things in the jar',show:()=>auto(0,[()=>drop(0),()=>drop(2),()=>drop(7)],700),
 go:()=>enter(0,'A day with eight moments, good and bad, and an empty good things jar.',()=>K.a.in.length>=3,'Even a day with a lost pencil and a grazed knee had good things in it. You had to look for them.')},
{h:'Who made it happen?',p:'Behind most good things is a person. Drag each person to the good thing they made happen.',
 predict:{q:'Your lunch was in your bag. Who made that happen?',opts:['Nobody, it was just there','Someone packed it, and others grew and sold the food'],ans:1},task:'Match all 4 people',
 show:()=>auto(1,[0,1,2,3].map(i=>()=>link(i,i)),600),
 go:()=>open1()},
{h:'Big and small',p:'Sort each good thing: a big, special event or a small, everyday one.',
 predict:{q:'Do small good things count?',opts:['No, only big things count','Yes, small things count too'],ans:1},task:'Sort all 6',
 show:()=>auto(2,SIZES.map((x,i)=>()=>sizeUp(i,x[2])),500),
 go:()=>enter(2,'Two boxes: big good thing and small good thing. Six good things to sort.',()=>K.c.in.length>=6,'Big events are rare; small good things happen every day. Noticing them is the habit that helps.')},
{h:'Sad and glad',p:'Something bad happened. Pick the answer that is honest about the feeling and still notices a good thing.',
 task:'Answer all 3',show:()=>auto(3,[()=>feel(1),()=>feel(1),()=>feel(1)],900),
 go:()=>enter(3,'We lost the football match. Three things you could say.',()=>K.d.k>=BOTH.length,'Gratitude does not mean pretending. You can be sad and glad at the same time.')},
{h:'Say a specific thank you',p:'Write a thank-you note. Tap what they did, then how it helped. Specific beats vague.',
 task:'Write 2 notes',show:()=>auto(4,[()=>pickBit(1),()=>pickBit(1),()=>pickBit(1),()=>pickBit(1)],800),
 go:()=>enter(4,'A note to Ms Cole. Dear Ms Cole, thank you…',()=>K.e.k>=THANKS.length,'A specific thank-you names what the person did and how it helped. It means more to them than thanks for everything.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
function open1(){enter(1,'Four good things and four people: Dad, Leo, Ms Cole and the bus driver.',()=>K.b.link.every(v=>v!=null),'Each good thing had someone behind it. Gratitude notices the people, not just the things.')}
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.hook()});
function why(t){let m='Look again: notice the good thing and the person behind it.';
 if(t==='big')m='Small good things count too, and they happen every day.';
 if(t==='fake')m='Gratitude does not mean pretending to be happy. Name the sad feeling as well.';
 if(t==='none')m='Even on a bad day, look for one small good thing.';
 if(t==='nobody')m='Good things rarely just appear. Someone packed it, grew it or sold it.';
 if(t==='vague')m='Vague thanks say little. Say what they did and how it helped.';
 if(t==='ban')m='Being thankful does not ban sadness. Both feelings can be there.';
 if(t==='sum')m='3 things a night for 7 nights is 3 × 7 = 21.';
 return m}
function quiz(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:S=>{box.hidden=S.step!==5;pad.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Gratitude buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});controls()}}).start()})})();
