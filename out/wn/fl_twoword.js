/* Flagship – putting two words together (English, Speaking & Listening, ages 2-3; CDC 2022 milestones, Development
   Matters 2021, Brown 1973 stage I meanings, Cleave et al. 2015 recasts). A toddler joins two word cards to ask and tell
   (more milk, all gone, bye car), to say who does what (dog run), drags a shoe, a sock and a hat to their owners (Daddy
   shoe), picks the two words for where a toy is (teddy bed), then the grown-up picks the reply that says it back a
   little longer. Data and drawings: twoword_art.js. */
(()=>{const D=TW;
VIS.reg('flagtwoword',c=>{let A,tray,quiz,qi=-1,gen=0,drag=null;const S={};c.fig.classList.add('young');
const KINDS=['ask','who','own','where','back','quiz'],kind=()=>KINDS[A.step];
const big=n=>Math.round(A.narrow?n:n*1.12),dk=()=>A.col.dark,txt=()=>dk()?'#f8fafc':D.INK;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let HITS=[],SLOTS=[],PEOPLE=[],ITEM=null;
/* the right answer moves round the three places, so it is not always first */
const spin=(ok,wrong,k)=>{const all=[[ok,'ok'],...wrong],s=(k+2)%all.length;return all.slice(s).concat(all.slice(0,s))};
/* the top strip: what to do now, then the last reply */
function head(t,tone){const g=A.ctx,f=`800 ${big(17)}${D.FONT}`;g.font=f;const R=D.wrap(g,t,A.W-36),lh=big(17)*1.3,h=R.length*lh+14;
 g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#0f172a':'#ffffff');D.rr(g,8,8,A.W-16,h,12);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?D.OK:tone==='no'?D.NO:D.RIM;g.stroke();g.fillStyle=txt();g.textAlign='left';g.textBaseline='top';R.forEach((r,i)=>g.fillText(r,18,15+i*lh));
 let y=h+12;const rows=A.narrow?2:1;if(S.msg){g.font=`700 ${big(15)}${D.FONT}`;g.fillStyle=S.bad?(dk()?'#fca5a5':D.NO):(dk()?'#86efac':D.OK);D.wrap(g,S.msg,A.W-36).slice(0,rows).forEach((r,i)=>g.fillText(r,18,y+i*big(15)*1.3))}
 return y+rows*big(15)*1.3+6}
/* a word card with its picture */
function card(r,w,e,st){const g=A.ctx;g.fillStyle=st==='no'?'#fee2e2':st==='ok'?'#dcfce7':'#ffffff';D.rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=st?4:2;g.strokeStyle=st==='no'?D.NO:st==='ok'?D.OK:D.RIM;g.stroke();
 if(e)D.emo(g,e,r.x+r.w/2,r.y+r.h*.36,Math.min(r.w,r.h)*.38);let n=big(e?19:16),R;for(;;){g.font=`800 ${n}${D.FONT}`;R=D.wrap(g,w,r.w-14);if(R.length*n*1.2<=(e?r.h*.4:r.h-10)||n<=12)break;n--}
 g.fillStyle=D.INK;g.textAlign='center';g.textBaseline='middle';const y=e?r.y+r.h*.77:r.y+r.h/2;R.forEach((s,i)=>g.fillText(s,r.x+r.w/2,y+(i-(R.length-1)/2)*n*1.2))}
function grid(n,top,cols,maxH){const gap=10,rows=Math.ceil(n/cols),w=(A.W-16-gap*(cols-1))/cols,h=Math.max(44,Math.min((A.H-top-8)/rows-gap,maxH));return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
/* ---- steps 1 and 2: build two words from four cards ---- */
const BUILD={ask:D.ASK,who:D.WHO};
function place(j){const B=S.b,list=BUILD[kind()];if(B.k>=list.length||B.wait)return;const R=list[B.k],w=R.t[j],at=B.got.length;
 if(B.got.includes(w))return;if(!R.a.includes(w)){B.miss=j;A.sound.miss();return say(why('fit',R,w),true)}
 if(R.a[at]!==w){B.miss=j;A.sound.miss();return say(why('order',R,w),true)}
 B.got.push(w);B.miss=-1;A.sound.pop();if(B.got.length<2)return say(`${w}... and one more word.`,false);
 B.wait=true;say(`Yes! \u201C${R.a.join(' ')}\u201D`,false);const g0=gen;setTimeout(()=>{if(g0!==gen)return;B.wait=false;B.k++;B.got=[];say(B.k>=list.length?'All 3 said with two words!':'Next one.',false)},700)}
function paintBuild(){const B=S.b,list=BUILD[kind()],fin=B.k>=list.length,R=list[Math.min(B.k,list.length-1)],g=A.ctx;
 const y0=head(fin?D.DONE[A.step]:`${R.cue} (${B.k+1} of 3)`,fin?'ok':S.bad?'no':''),sh=(A.H-y0)*(A.narrow?.36:.4),r={x:8,y:y0,w:A.W-16,h:sh};D.scene(g,r,R.sc,dk());
 const sw=Math.min(150,(A.W-40)/2),sy=r.y+r.h+10,sH=big(46);SLOTS=[0,1].map(i=>({x:A.W/2-sw-6+i*(sw+12),y:sy,w:sw,h:sH}));
 SLOTS.forEach((s,i)=>{const w=fin?R.a[i]:B.got[i];g.setLineDash(w?[]:[7,6]);g.lineWidth=2.5;g.strokeStyle=w?D.OK:D.RIM;g.fillStyle=w?(dk()?'#14532d':'#dcfce7'):(dk()?'#1e293b':'#f8fafc');D.rr(g,s.x,s.y,s.w,s.h,12);g.fill();g.stroke();g.setLineDash([]);
  g.font=`800 ${big(20)}${D.FONT}`;g.fillStyle=w?txt():(dk()?'#cbd5e1':'#475569');g.textAlign='center';g.textBaseline='middle';g.fillText(w||(i?'word 2':'word 1'),s.x+s.w/2,s.y+s.h/2)});
 if(fin){HITS=[];return}HITS=grid(4,sy+sH+12,A.narrow?2:4,120);HITS.forEach((b,i)=>{const w=R.t[i];if(B.got.includes(w))return;const at=drag&&drag.i===i?{...b,x:drag.x-b.w/2,y:drag.y-b.h/2}:b;card(at,w,D.E[w],B.miss===i?'no':'')})}
/* ---- step 3: drag each thing to the person who has the other one ---- */
const OWNORDER=[2,0,1];
function give(p){const O=S.o;if(O.k>=3||O.wait)return;const it=D.OWN[OWNORDER[O.k]],who=D.OWN[p];
 if(who!==it){O.miss=p;A.sound.miss();return say(`${who.n} has a ${who.k} on, not a ${it.k}. Who has one ${it.k}?`,true)}
 O.miss=-1;O.wait=true;A.sound.pop();O.done.push(p);say(`Yes! \u201C${it.say}\u201D`,false);const g0=gen;setTimeout(()=>{if(g0!==gen)return;O.wait=false;O.k++;say(O.k>=3?'All 3 things are back with their owners.':'Here is the next one.',false)},800)}
function paintOwn(){const O=S.o,fin=O.k>=3,g=A.ctx,it=fin?null:D.OWN[OWNORDER[O.k]];
 const y0=head(fin?D.DONE[2]:`Whose ${it.k} is this? Drag it to them. (${O.k+1} of 3)`,fin?'ok':S.bad?'no':''),w=(A.W-36)/3,h=Math.min((A.H-y0)*.5,w*1.25);
 PEOPLE=D.OWN.map((x,i)=>{const b={i,x:8+i*(w+10),y:y0,w,h},on=O.done.includes(i);g.fillStyle=on?(dk()?'#14532d':'#dcfce7'):O.miss===i?'#fee2e2':(dk()?'#1e293b':'#f1f5f9');D.rr(g,b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=on||O.miss===i?4:1.5;g.strokeStyle=on?D.OK:O.miss===i?D.NO:D.RIM;g.stroke();
  const s=Math.min(b.w*.42,b.h*.34);D.emo(g,x.e,b.x+b.w/2,b.y+b.h*.3,s);D.emo(g,x.ke,b.x+b.w*.3,b.y+b.h*.64,s*.55);if(!on){g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=D.RIM;g.beginPath();g.arc(b.x+b.w*.7,b.y+b.h*.64,s*.36,0,7);g.stroke();g.setLineDash([])}D.emo(g,x.ke,b.x+b.w*.7,b.y+b.h*.64,s*.55,on?1:.35);
  g.font=`800 ${big(16)}${D.FONT}`;g.fillStyle=O.miss===i?D.INK:txt();g.textAlign='center';g.textBaseline='middle';g.fillText(on?x.say:x.n,b.x+b.w/2,b.y+b.h*.88);return b});
 if(fin){ITEM=null;return}const s=Math.min(A.W*.16,90),home={x:A.W/2,y:y0+h+(A.H-y0-h)/2};ITEM={...home,r:s*.75};const at=drag?drag:home;
 g.fillStyle=dk()?'#334155':'#ffffff';g.beginPath();g.arc(at.x,at.y,s*.7,0,7);g.fill();g.lineWidth=2;g.strokeStyle=D.RIM;g.stroke();D.emo(g,it.ke,at.x,at.y,s*.8)}
/* ---- steps 4 and 5: choose the words ---- */
const PICK={where:D.WHERE,back:D.BACK};
function choose(j){const P=S.p,list=PICK[kind()];if(P.k>=list.length||P.wait)return;const R=list[P.k],[,tag]=spin(R.ok,R.o,P.k)[j];
 if(tag!=='ok'){P.miss=j;A.sound.miss();return say(why(tag,R),true)}P.miss=-1;P.wait=true;A.sound.pop();P.said=true;say(kind()==='back'?`Yes. Then the child says, \u201C${R.more}\u201D`:`Yes! \u201C${R.ok}\u201D`,false);
 const g0=gen;setTimeout(()=>{if(g0!==gen)return;P.wait=false;P.said=false;P.k++;say(P.k>=list.length?'All 3 done!':'Next one.',false)},kind()==='back'?1100:800)}
function paintPick(){const P=S.p,list=PICK[kind()],fin=P.k>=list.length,R=list[Math.min(P.k,list.length-1)],g=A.ctx,bk=kind()==='back';
 const y0=head(fin?D.DONE[A.step]:bk?`The child says \u201C${R.kid}\u201D. What do you say back? (${P.k+1} of 3)`:`${R.cue} (${P.k+1} of 3)`,fin?'ok':S.bad?'no':''),sh=(A.H-y0)*(bk?.48:.4),r={x:8,y:y0,w:A.W-16,h:sh};
 if(!bk)D.scene(g,r,R.sc,dk());else{g.fillStyle=dk()?'#1e293b':'#fef9c3';D.rr(g,r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=D.RIM;g.lineWidth=1.5;g.stroke();D.scene(g,{x:r.x+r.w*.62,y:r.y+6,w:r.w*.38-6,h:r.h-12},R.sc,dk());
  const n=big(15),bw=r.w*.58;let y=r.y+8;y+=D.bubble(g,r.x+8,y,bw*.7,'\u{1F9D2} '+R.kid,n,dk(),'kid')+6;if(P.said||fin){y+=D.bubble(g,r.x+8+bw*.12,y,bw*.88,'\u{1F9D1} '+R.ok,n,dk(),'adult')+6;D.bubble(g,r.x+8,y,bw*.7,'\u{1F9D2} '+R.more,n,dk(),'kid')}}
 if(fin){HITS=[];return}const opts=spin(R.ok,R.o,P.k);HITS=grid(3,r.y+r.h+10,A.narrow?1:3,bk?96:84);HITS.forEach((b,i)=>card(b,opts[i][0],null,P.miss===i?'no':''))}
/* ---- wiring ---- */
const PAINT={ask:paintBuild,who:paintBuild,own:paintOwn,where:paintPick,back:paintPick},TAP={ask:place,who:place,where:choose,back:choose};
function draw(){const g=A.ctx;g.fillStyle=dk()?'#0f172a':'#fffbeb';g.fillRect(0,0,A.W,A.H);const m=kind();
 if(m==='quiz'){const y0=head('Challenge: two words','ok'),r={x:8,y:y0,w:A.W-16,h:(A.H-y0)*.8};D.scene(g,r,['cup','dogrun','teddybed'][Math.max(0,qi)%3],dk());return}
 PAINT[m]();A.fx.draw(g)}
function down(p){const m=kind();if(m==='own'&&ITEM&&Math.hypot(p.x-ITEM.x,p.y-ITEM.y)<ITEM.r){drag={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 if(BUILD[m]){const b=HITS.find(q=>hit(p,q));if(b&&!S.b.got.includes(BUILD[m][Math.min(S.b.k,2)].t[b.i])){drag={i:b.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 const b=HITS.find(q=>hit(p,q));if(b&&TAP[m])TAP[m](b.i);return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const d=drag,tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;drag=null;
 if(kind()==='own'){const b=PEOPLE.find(q=>hit(p,q));if(b)give(b.i);else{if(tap)say('Drag it up to the person who has the other one.',false);A.redraw()}return}
 if(tap||SLOTS.some(s=>hit(p,s)))place(d.i);else A.redraw()}
function fresh(){gen++;drag=null;for(const k in S)delete S[k];Object.assign(S,{b:{k:0,got:[],miss:-1,wait:false},o:{k:0,done:[],miss:-1,wait:false},p:{k:0,miss:-1,wait:false,said:false},msg:null,bad:false,check:()=>{}})}
function say(t,bad){S.msg=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function start(i,met){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};buttons();A.redraw()}
/* Show me: one right move each beat, skipping beats while a reply is showing */
function play(i,busy,act,fin){steps[i].go();const g0=gen,tick=()=>{if(g0!==gen||fin())return;if(!busy())act();setTimeout(tick,320)};setTimeout(tick,320)}
const buildAct=()=>{const R=BUILD[kind()][S.b.k];place(R.t.indexOf(R.a[S.b.got.length]))};
const pickAct=()=>{const R=PICK[kind()][S.p.k];choose(spin(R.ok,R.o,S.p.k).findIndex(x=>x[1]==='ok'))};
function buttons(){if(!tray)return;tray.innerHTML='';const m=kind(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(BUILD[m]&&S.b.k<3){const R=BUILD[m][S.b.k];R.t.forEach((w,j)=>{if(!S.b.got.includes(w))add(w,()=>place(j),`Say the word ${w}`)})}
 if(m==='own'&&S.o.k<3){const it=D.OWN[OWNORDER[S.o.k]];D.OWN.forEach((x,i)=>add(`To ${x.n}`,()=>give(i),`Give the ${it.k} to ${x.n}`))}
 if(PICK[m]&&S.p.k<3){const R=PICK[m][S.p.k];spin(R.ok,R.o,S.p.k).forEach(([t],j)=>add(t,()=>choose(j),m==='back'?`Say back: ${t}`:`Say: ${t}`))}}
const steps=[
{h:'More, all gone, bye',p:D.TXT[0],predict:{q:'The cup is empty. Your child says \u201Cmilk\u201D. What can a second word add?',opts:['Nothing more','What they want: \u201Cmore milk\u201D'],ans:1},task:'Make 3 two-word asks',
 show:()=>play(0,()=>S.b.wait,buildAct,()=>S.b.k>=3),go:()=>start(0,()=>S.b.k>=3)},
{h:'Who does it',p:D.TXT[1],task:'Say who, then what they do, 3 times',show:()=>play(1,()=>S.b.wait,buildAct,()=>S.b.k>=3),go:()=>start(1,()=>S.b.k>=3)},
{h:'Whose is it',p:D.TXT[2],task:'Drag 3 things to their owners',show:()=>play(2,()=>S.o.wait,()=>give(OWNORDER[S.o.k]),()=>S.o.k>=3),go:()=>start(2,()=>S.o.k>=3)},
{h:'Where is it',p:D.TXT[3],predict:{q:'Teddy is in bed. Your child says \u201Cteddy bed\u201D. Is that wrong because it has no \u201Cin the\u201D?',opts:['Yes, it is wrong','No, two words is a great start'],ans:1},task:'Pick the two words 3 times',
 show:()=>play(3,()=>S.p.wait,pickAct,()=>S.p.k>=3),go:()=>start(3,()=>S.p.k>=3)},
{h:'Say it back',p:D.TXT[4],predict:{q:'Your child says \u201Ccar go\u201D. What helps them learn the next words most?',opts:['Ask them to say the whole sentence','Say it back a bit longer'],ans:1},task:'Choose what to say back 3 times',
 show:()=>play(4,()=>S.p.wait,pickAct,()=>S.p.k>=3),go:()=>start(4,()=>S.p.k>=3)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* each slip gets its own reply */
function why(tag,R,w){let m='Two words that fit the picture say the most.';
 if(tag==='fit')m=w?`There is no ${w} here. Look at the picture: \u201C${R.a.join(' ')}\u201D.`:'One word does not fit the picture. Look again.';
 if(tag==='order')m=w?`We say \u201C${R.a[0]}\u201D first: \u201C${R.a.join(' ')}\u201D.`:'The words are the wrong way round. Say it the way grown-ups do.';
 if(tag==='one')m='One word is a start. Add a second word to say more.';
 if(tag==='fix')m='Asking for the whole sentence can stop the talk. Say it back yourself, a bit longer.';
 if(tag==='flat')m='With no words back, there is nothing new to copy. Say it back with a word or two more.';
 if(tag==='long')m='That is too long to copy. Say their words back with just one or two more.';
 return m}
function next(){qi++;const Q=D.QS[qi%D.QS.length],opts=spin(Q.a,Q.o,qi);
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.78,tall:1.55,draw,onStep:X=>{quiz.hidden=X.step!==5;tray.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Two words lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
