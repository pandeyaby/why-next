/* Flagship – staying safe around dogs (ages 4–5; EYFS ELG Managing Self, 'explain the reasons for rules, know right from
   wrong and try to behave accordingly'; Dogs Trust Be Dog Smart; Kennel Club 'Become a tree'): say hello in the right order, stroke the side, read a dog's body, leave busy dogs alone, be a
   tree when a strange dog runs up. Data and pictures: dogsafe_art.js. */
(()=>{const D=DOGSAFE;
VIS.reg('flagdogsafe',c=>{let A,P,ctl,chal,qn=-1,epoch=0;const S={};c.fig.classList.add('young');
const part=()=>['hello','stroke','mood','busy','tree','chal'][A.step];
const isIn=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f0f9ff';g.fillRect(0,0,A.W,A.H);g.fillStyle=A.col.dark?'#14532d':'#bbf7d0'}
function grass(y){const g=A.ctx;g.fillStyle=A.col.dark?'#14532d':'#bbf7d0';g.fillRect(0,y,A.W,6)}
/* ---------- 1. say hello in the right order ---------- */
let CARD=[];
function pick(i){const s=S.hl,C=D.HELLO[i];if(s.seq.length>=3||s.seq.includes(i))return;
 if(C.n<0){s.bad=i;A.sound.miss();return say(C.why,true)}if(C.n!==s.seq.length){s.bad=i;A.sound.miss();return say(s.seq.length===0?'Wait! Ask the owner first. Not every dog wants to say hello.':'First let the dog sniff the back of your hand. Then it knows you.',true)}
 s.seq.push(i);s.bad=null;A.sound.pop();say(['The owner says: yes, you can. Some owners say no, and that is fine.','The dog sniffs the back of your hand. Now it knows you.','Gentle strokes on its side. The dog wags. Well done!'][C.n])}
function drawHello(){const s=S.hl,n=s.seq.length,fin=n>=3,t=P.banner(fin?D.DONE[0]:`Tap the steps in order. ${n} of 3.`,fin?'ok':s.bad!=null?'no':'',S.note,S.bad);
 const ch=Math.min(46,A.H*.1),gap=6,top=A.H-3*(ch+gap)-4,gy=top-10,ph=gy-t,g=A.ctx;grass(gy);
 P.child(A.W*.9,gy,ph*.85,'stand','#0f766e');const dx=A.W*.5;P.dog(dx,gy,Math.min(ph*.75,A.W*.28),{mouth:n?'open':'shut',tail:n?'wag':'low',ears:'up',look:'away'});
 if(n>=1){g.fillStyle='#ffffff';g.strokeStyle='#64748b';g.lineWidth=1.5;const bw=Math.min(150,A.W*.34),bx=Math.min(A.W-bw-6,A.W*.9-bw/2);A.paint.rrect(bx,t,bw,26,10);g.fill();g.stroke();g.font=`800 ${P.sz(12)}${P.F}`;g.fillStyle=P.INK;g.textAlign='center';g.textBaseline='middle';g.fillText('Yes, you can.',bx+bw/2,t+13)}
 const kx=n>=2?A.W*.2:A.W*.12;P.child(kx,gy,ph*.62,n>=2?'reach':'stand','#7c3aed');if(n===2)P.hand(dx+Math.min(ph*.75,A.W*.28)*.62,gy-ph*.42,Math.max(16,ph*.12));
 const cw=(A.W-16-gap)/2;CARD=D.MIX.map((i,j)=>({i,x:8+(j%2)*(cw+gap)+(j===4?(cw+gap)/2:0),y:top+Math.floor(j/2)*(ch+gap),w:cw,h:ch}));
 CARD.forEach(r=>{const k=s.seq.indexOf(r.i);P.card(r,(k>=0?`${k+1}. `:'')+D.HELLO[r.i].t,{ok:k>=0,no:s.bad===r.i,n:14})})}
/* ---------- 2. gentle strokes on the side ---------- */
let HIT=null;
function touch(k){const s=S.st,Sp=D.SPOTS.find(x=>x.k===k);if(s.n>=3)return;if(k==='hug'){s.bad='hug';A.sound.miss();return say('Most dogs do not like hugs. Arms around its neck make a dog feel trapped. Stroke its side instead.',true)}
 if(!Sp.ok){s.bad=k;A.sound.miss();return say(Sp.why,true)}s.n++;s.bad='';if(HIT&&!s.drag){s.hx=HIT.body.x+HIT.body.w*(.3+.2*s.n);s.hy=HIT.body.y+HIT.body.h*.3}A.sound.pop();say(`Stroke ${s.n} of 3. Gentle, slow strokes on its side.`+(s.n>=3?' The dog leans in: it likes that.':''))}
function drawStroke(){const s=S.st,fin=s.n>=3,t=P.banner(fin?D.DONE[1]:`Give 3 gentle strokes. ${s.n} of 3.`,fin?'ok':s.bad?'no':'',S.note,S.bad);
 const gy=A.H-14,sz=Math.min(A.W*.55,(gy-t)*1.25);grass(gy);HIT=P.dog(A.W*.5,gy,sz,{mouth:fin?'open':'shut',tail:s.n?'wag':'low',ears:s.bad?'back':'up'});
 const g=A.ctx;g.font=`800 ${P.sz(12)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='bottom';g.fillText('side',HIT.body.x+HIT.body.w/2,HIT.body.y-2);
 const u=Math.max(36,sz*.2);P.hand(s.hx==null?A.W*.12:s.hx,s.hy==null?t+u:s.hy,u)}
/* ---------- 3. how does the dog feel ---------- */
let ZONE=[],HAND=null;
function judge(z){const s=S.md,M=D.MOODS[s.i];if(!M)return;const want=M.ok?0:1;if(z!==want){s.bad=true;A.sound.miss();return say((M.ok?'Look again: this dog is happy. ':'Look again: this dog wants space. ')+D.MWHY[s.i],true)}
 s.pile[z]++;s.i++;s.bad=false;A.sound.pop();say(D.MWHY[s.i-1]+(s.i<6?' Next dog.':''))}
function drawMood(){const s=S.md,M=D.MOODS[s.i],t=P.banner(M?`Dog ${s.i+1} of 6. How does it feel?`:D.DONE[2],M?(s.bad?'no':''):'ok',S.note,S.bad);
 const zh=Math.min(A.H*.2,90),zt=A.H-zh-8,g=A.ctx;ZONE=[{x:8,y:zt,w:A.W/2-12,h:zh},{x:A.W/2+4,y:zt,w:A.W/2-12,h:zh}];
 ZONE.forEach((r,z)=>{g.fillStyle=P.dk()?(z?'#450a0a':'#052e16'):(z?'#fee2e2':'#dcfce7');A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=z?P.NO:P.OK;g.lineWidth=3;g.stroke();
  g.font=`800 ${P.sz(15)}${P.F}`;g.fillStyle=P.fg();g.textAlign='center';g.textBaseline='middle';g.fillText(z?'Leave me alone':'Happy to say hello',r.x+r.w/2,r.y+r.h*.38);g.font=`700 ${P.sz(12)}${P.F}`;g.fillText(`${s.pile[z]} dog${s.pile[z]===1?'':'s'}`,r.x+r.w/2,r.y+r.h*.72)});
 if(M){const cw=Math.min(A.W*.7,340),chh=zt-t-10,d=s.drag;HAND={x:d?d.x-cw/2:(A.W-cw)/2,y:d?d.y-chh/2:t+2,w:cw,h:chh};P.card(HAND,M.t,{n:15,top:1,sel:!!d});
  P.dog(HAND.x+cw*.5,HAND.y+chh*.62,Math.min(cw*.5,chh*.8),M.f)}else HAND=null}
/* ---------- 4. leave busy dogs alone ---------- */
let PAN=[];
function mark(j){const s=S.bz,Dg=D.DOGS[j];if(s.got.includes(j))return;if(!Dg.busy){s.bad=-1;s.ok=1;A.sound.tick();return say(Dg.why+' Now find the dogs to leave alone.')}
 s.got.push(j);s.bad=-1;A.sound.pop();say(Dg.why+` ${s.got.length} of 3 found.`)}
function drawBusy(){const s=S.bz,fin=s.got.length>=3,t=P.banner(fin?D.DONE[3]:`Tap the dogs to leave alone. ${s.got.length} of 3.`,fin?'ok':'',S.note,false);
 const narrow=A.W<520,cols=narrow?2:4,rows=narrow?2:1,gap=8,pw=(A.W-16-gap*(cols-1))/cols,ph=(A.H-t-8-gap*(rows-1))/rows;
 PAN=D.DOGS.map((_,j)=>({j,x:8+(j%cols)*(pw+gap),y:t+Math.floor(j/cols)*(ph+gap),w:pw,h:ph}));
 PAN.forEach(r=>{const Dg=D.DOGS[r.j],got=s.got.includes(r.j);P.card(r,(got?'Leave alone: ':'')+Dg.t,{n:13,top:1,no:got,ok:!Dg.busy&&s.ok});P.dog(r.x+r.w*.45,r.y+r.h*.62,Math.min(r.w*.62,r.h*.6),Dg.f)})}
/* ---------- 5. be a tree ---------- */
let TC=[];
function tree(i){const s=S.tr,T=D.TREE[i];if(s.got.length>=3||s.got.includes(i))return;
 if(!T.ok){s.bad=i;s.dx=Math.max(.45,s.dx-.08);s.pose=T.k==='run'?'run':T.k==='wave'?'wave':'stand';A.sound.miss();return say(T.why+' The dog comes closer.',true)}
 s.got.push(i);s.bad=null;s.pose=s.got.length>=3?'feet':T.k==='fold'?'fold':T.k==='feet'?'feet':'stand';A.sound.pop();
 say(s.got.length>=3?'You are a tree: still, arms folded, looking at your feet. The dog sniffs, gets bored and trots away. Now walk away slowly and tell a grown-up.':`${T.t}: yes. ${3-s.got.length} more.`)}
function drawTree(){const s=S.tr,fin=s.got.length>=3,t=P.banner(fin?D.DONE[4]:`Be a tree! Tap the 3 right things. ${s.got.length} of 3.`,fin?'ok':s.bad!=null?'no':'',S.note,S.bad);
 const ch=Math.min(48,A.H*.1),gap=6,cols=A.W<520?2:3,rows=6/cols,top=A.H-rows*(ch+gap)-4,gy=top-8,ph=gy-t;grass(gy);
 P.child(A.W*.25,gy,ph*.8,s.pose,'#2563eb');const dz=Math.min(ph*.7,A.W*.3);P.dog(A.W*(fin?.8:s.dx),gy,dz,fin?{look:'away',tail:'low',ears:'up'}:{mouth:'open',tail:'wag',ears:'up',look:'away'});
 const cw=(A.W-16-gap*(cols-1))/cols;TC=D.TREE.map((T,i)=>({i,x:8+(i%cols)*(cw+gap),y:top+Math.floor(i/cols)*(ch+gap),w:cw,h:ch}));
 TC.forEach(r=>P.card(r,D.TREE[r.i].t,{n:14,ok:s.got.includes(r.i),no:s.bad===r.i}))}
/* ---------- wiring ---------- */
function draw(){wash();const m=part();if(m==='chal'){P.banner('Challenge: staying safe around dogs','ok');P.dog(A.W*.5,A.H*.8,Math.min(A.W*.4,A.H*.6),{mouth:'open',tail:'wag',ears:'up'});return}
 ({hello:drawHello,stroke:drawStroke,mood:drawMood,busy:drawBusy,tree:drawTree})[m]();A.fx.draw(A.ctx)}
function down(p){const m=part();
 if(m==='hello'){const r=CARD.find(r=>isIn(p,r));if(r)pick(r.i);return false}
 if(m==='stroke'){const s=S.st;if(s.n>=3||!HIT)return false;if(isIn(p,HIT.head)){touch('head');return false}if(isIn(p,HIT.tail)){touch('tail');return false}s.drag={d:0};s.hx=p.x;s.hy=p.y;A.redraw();return true}
 if(m==='mood'){if(HAND&&isIn(p,HAND)){S.md.drag={x:p.x,y:p.y};return true}const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)judge(z);return false}
 if(m==='busy'){const r=PAN.find(r=>isIn(p,r));if(r)mark(r.j);return false}
 if(m==='tree'){const r=TC.find(r=>isIn(p,r));if(r)tree(r.i);return false}return false}
function move(p){const m=part();if(m==='stroke'&&S.st.drag){const s=S.st;if(isIn(p,HIT.body)&&s.hx!=null)s.drag.d+=Math.hypot(p.x-s.hx,p.y-s.hy);s.hx=p.x;s.hy=p.y;
  if(isIn(p,HIT.head)){s.drag=null;return touch('head')}if(s.drag.d>HIT.body.w*.6){s.drag.d=0;touch('side')}A.redraw()}
 if(m==='mood'&&S.md.drag){S.md.drag.x=p.x;S.md.drag.y=p.y;A.redraw()}}
function up(p){const m=part();if(m==='stroke'&&S.st.drag){S.st.drag=null;A.redraw()}
 if(m==='mood'&&S.md.drag){S.md.drag=null;const z=ZONE.findIndex(r=>isIn(p,r));if(z>=0)judge(z);else{A.redraw();say('Drop the dog card on a box.')}}}
function fresh(){epoch++;for(const k in S)delete S[k];Object.assign(S,{hl:{seq:[],bad:null},st:{n:0,bad:'',drag:null,hx:null,hy:null},md:{i:0,pile:[0,0],bad:false,drag:null},
 bz:{got:[],bad:-1,ok:0},tr:{got:[],bad:null,pose:'stand',dx:.75},note:null,bad:false,check:()=>{}})}
function say(t,bad){S.note=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finish=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(D.DONE[i]+A.reveal(i))};
function enter(i,ok){fresh();c.say(D.DESC[i]);A.cv.setAttribute('aria-label',D.DESC[i]);S.check=finish(i,ok);buttons();A.redraw()}
function demo(i,list){steps[i].go();const e=epoch;let t=0;list.forEach(([ms,f])=>{t+=ms;setTimeout(()=>{if(e===epoch)f()},t)})}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(m==='hello'&&S.hl.seq.length<3)D.MIX.forEach(i=>{if(!S.hl.seq.includes(i))B(D.HELLO[i].t,()=>pick(i))});
 if(m==='stroke'&&S.st.n<3){B('✋ Stroke its side',()=>touch('side'),'Stroke the dog gently on its side');B('Touch its face',()=>touch('head'));B('Grab its tail',()=>touch('tail'));B('Hug it',()=>touch('hug'),'Give the dog a hug')}
 if(m==='mood'&&D.MOODS[S.md.i]){const M=D.MOODS[S.md.i];B('😊 Happy to say hello',()=>judge(0),`${M.t}: happy to say hello`);B('✋ Leave me alone',()=>judge(1),`${M.t}: leave me alone`)}
 if(m==='busy'&&S.bz.got.length<3)D.DOGS.forEach((Dg,j)=>{if(!S.bz.got.includes(j))B(Dg.t,()=>mark(j),`Dog: ${Dg.t}`)});
 if(m==='tree'&&S.tr.got.length<3)D.TREE.forEach((T,i)=>{if(!S.tr.got.includes(i))B(T.t,()=>tree(i))})}
const steps=[
{h:'Say hello the safe way',p:D.TXT[0],predict:{q:'You see a dog you like. What do you do first?',opts:['Run up and stroke it','Ask its owner'],ans:1},task:'Put the 3 steps in order',
 show:()=>demo(0,[0,1,2].map(n=>[450,()=>pick(D.HELLO.findIndex(h=>h.n===n))])),go:()=>enter(0,()=>S.hl.seq.length>=3)},
{h:'Gentle hands',p:D.TXT[1],predict:{q:'Do dogs like big hugs?',opts:['Yes, all dogs love hugs','Most dogs do not'],ans:1},task:'Give 3 gentle strokes on its side',
 show:()=>demo(1,[[400,()=>touch('side')],[450,()=>touch('side')],[450,()=>touch('side')]]),go:()=>enter(1,()=>S.st.n>=3)},
{h:'How does the dog feel?',p:D.TXT[2],predict:{q:'A dog is wagging its tail. Is it always happy?',opts:['Yes, always','No, look at the whole dog'],ans:1},task:'Sort all 6 dogs',
 show:()=>demo(2,D.MOODS.map(M=>[350,()=>judge(M.ok?0:1)])),go:()=>enter(2,()=>S.md.i>=6)},
{h:'Busy dogs',p:D.TXT[3],task:'Find the 3 dogs to leave alone',
 show:()=>demo(3,[0,1,3].map(j=>[450,()=>mark(j)])),go:()=>enter(3,()=>S.bz.got.length>=3)},
{h:'Be a tree',p:D.TXT[4],predict:{q:'A dog you do not know runs at you. What do you do?',opts:['Run away fast','Stand still like a tree'],ans:1},task:'Tap the 3 things a tree does',
 show:()=>demo(4,[0,2,4].map(i=>[450,()=>tree(i)])),go:()=>enter(4,()=>S.tr.got.length>=3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
function why(t){let m='Ask first, sniff then stroke, leave busy dogs alone, and be a tree if a dog runs up.';
 if(t==='run')m='Do not run. Running up can scare a dog, and running away looks like chase. Stop, and ask or be a tree.';
 if(t==='hug')m='Most dogs do not like hugs or faces close to theirs. Let the dog sniff your hand, then stroke its side.';
 if(t==='face')m='Keep your hands away from a dog\u2019s eyes, mouth and ears. Stroke its side.';
 if(t==='tail')m='Never pull a tail: it hurts. Stroke the dog gently on its side.';
 if(t==='wag')m='A wagging tail is not enough. Growling and showing teeth mean the dog wants you to stay away.';
 if(t==='busy')m='A dog that is eating may snap to keep its food. Leave it alone until it has finished.';
 if(t==='scream')m='Screaming and waving make a dog more excited. Be a quiet, still tree.';
 if(t==='yawn')m='A dog that yawns and turns away is worried, not sleepy. Leave it alone.';
 if(t==='sniff')m='The dog sniffs the back of your hand. That is how it gets to know you.';
 return m}
function ask(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function grade(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;P=D.SHAPES(A);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dog safety lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}}).start()})})();
