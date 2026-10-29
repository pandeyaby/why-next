/* Flagship – expressing and justifying opinions (ages 4–6): build the spoken frame "I think … because …" by dragging
   word cards into a speech bubble in order; pick a reason that really backs the opinion (not "because I just do" and not
   an off-topic fact); swap a vague reason ("it is good") for a clear one that tells the listener something; answer a
   friend politely with "I agree / I disagree, because …"; then build a short opinion talk with two reasons and an ending
   ("So …"). Challenge on the usual slips: no reason, a circular reason, an off-topic reason, a vague reason, rudeness. */
(()=>{
const BUILD=[['I think','dogs are fun','because they play with me.'],['I think','apples are yummy','because they are sweet.'],['I think','the slide is the best','because it goes fast!']];
const TALK=[['I think pandas are the best animal','because they roll and play','and they munch bamboo all day.','So pandas are my favourite!'],
 ['I think we should plant a tree','because birds can nest in it','and it gives us shade.','So let us plant one today!']];
const PICK={
 why:[['I think the park is fun because…',[['I can go on the swings.','ok'],['I just do.','just'],['it is Tuesday.','off']]],
  ['I think cats are the best pets because…',[['they are soft and they purr.','ok'],['I said so.','just'],['the sky is blue.','off']]],
  ['I think rain is fun because…',[['I can jump in puddles.','ok'],['it is.','just'],['I had toast.','off']]]],
 clear:[['I like this book because…',[['it has a funny dragon in it.','ok'],['it is good.','vague'],['it is a book.','same']]],
  ['I think football is the best game because…',[['I love scoring goals.','ok'],['it is nice.','vague'],['it is football.','same']]],
  ['I think bath time is great because…',[['I play with my toy boat.','ok'],['it is great.','same'],['it is good.','vague']]]],
 reply:[['Mia: I think rain is fun because I can jump in puddles.',[['I disagree, because I get cold and wet.','ok'],['You are wrong!','rude'],['No, because I just don’t.','just']]],
  ['Leo: I think dinosaurs are scary because they have big teeth.',[['I agree, because sharp teeth look scary.','ok'],['That is silly!','rude'],['I agree, because I just do.','just']]],
  ['Ava: I think winter is the best because of the snow.',[['I disagree, because I love the beach in summer.','ok'],['Winter is dumb.','rude'],['I disagree, because it is.','same']]]]};
const FACE={why:'🙂',clear:'🙂',reply:'🧒'};
VIS.reg('flagopine',c=>{let A,ctl,chal,qn=-1,streak=0;c.fig.classList.add('young');
const S={run:0,want:()=>{},k:0,done:0,got:[],bad:'',drag:null,last:'',said:''};
const kind=()=>['build','why','clear','reply','talk','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function font(g,n,w){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`}
function lines(g,t,maxW){const out=[];let cur='';t.split(' ').forEach(w=>{const s=cur?cur+' '+w:w;if(g.measureText(s).width>maxW&&cur){out.push(cur);cur=w}else cur=s});if(cur)out.push(cur);return out}
function write(g,t,x,y,n,maxW,col,w,al){font(g,n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const ls=lines(g,t,maxW),lh=f(n)*1.3;
 ls.forEach((l,i)=>g.fillText(l,x,y+(i-(ls.length-1)/2)*lh));return ls.length*lh}
function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const inside=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// the cards on show: for build/talk the pieces not yet used (in a mixed-up order), for the pick steps the three answers
function deck(){const v=kind();if(v==='build'||v==='talk'){const set=(v==='build'?BUILD:TALK)[S.k];if(!set)return[];const order=set.map((_,i)=>i).sort((a,b)=>((a*7+S.k*3)%5)-((b*7+S.k*3)%5));
  return order.filter(i=>!S.got.includes(i)).map(i=>({t:set[i],i}))}
 const r=(PICK[v]||[])[S.k];return r?r[1].map(([t,tag],i)=>({t,tag,i})).sort((a,b)=>((a.i+S.k)%3)-((b.i+S.k)%3)):[]}
function slots(){const n=deck().length,gap=f(8),h=f(A.narrow?46:42),top=A.H-(n*(h+gap))-f(10);return deck().map((d,j)=>({...d,r:{x:12,y:top+j*(h+gap),w:A.W-24,h}}))}
const bubble=()=>{const sl=slots(),top=sl.length?sl[0].r.y:A.H*.8;return{x:12,y:f(30),w:A.W-24,h:Math.max(f(70),Math.min(A.H*.42,top-f(48)-f(30)))}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'I think … because …',W/2,H*.32,22,W-30,C.tx,800);write(g,'A reason tells why.',W/2,H*.52,18,W-30,C.tx,700);write(g,'Agree or disagree kindly.',W/2,H*.68,18,W-30,C.tx,700);return}
 const sets={build:BUILD,talk:TALK,why:PICK.why,clear:PICK.clear,reply:PICK.reply}[v];
 write(g,S.k<sets.length?`${v==='reply'?'Friend':'Turn'} ${S.k+1} of ${sets.length}`:'All done!',14,f(14),12,W,C.tx,700,'left');
 const b=bubble();card(g,b,A.alpha(S.bad?C.rd:C.cy,.1),S.bad?C.rd:C.tx,S.bad?3:2);g.beginPath();g.moveTo(b.x+30,b.y+b.h);g.lineTo(b.x+44,b.y+b.h+14);g.lineTo(b.x+58,b.y+b.h);g.fillStyle=C.tx;g.fill();
 let text='';if(S.k>=sets.length)text=S.last;
 else if(v==='build'||v==='talk'){const set=sets[S.k];text=set.map((p,i)=>S.got.includes(i)?p:'_____').join('  ')}
 else{const[q]=sets[S.k];text=v==='reply'?q:q+' ___'}
 write(g,(v==='reply'||S.k>=sets.length?'':FACE.why+' ')+text,b.x+b.w/2,b.y+b.h/2,A.narrow?17:19,b.w-24,C.tx,700);
 if(S.said)write(g,S.said,W/2,b.y+b.h+f(30),13,W-30,C.tx,800);
 slots().forEach(s=>{let r=s.r;if(S.drag&&S.drag.i===s.i)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(g,r,A.alpha(C.vi,.16),C.tx,2);write(g,s.t,r.x+r.w/2,r.y+r.h/2,A.narrow?15:16,r.w-16,C.tx,700)});
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();S.bad='x';say(t);ctrl();A.redraw()};
function good(t,n){A.sound.pop();S.bad='';S.done++;S.said='✓ '+{build:'Opinion and reason!',why:'A real reason!',talk:'Great talk!',clear:'Nice and clear!',reply:'Kind, with a reason!'}[kind()];say(t);S.k++;S.got=[];if(S.k>=n){S.last=t}ctrl();A.redraw();S.want()}
// build and talk: the pieces must go in speaking order; a piece out of order gets the reason why
function place(i){const v=kind();if(v!=='build'&&v!=='talk')return;const set=(v==='build'?BUILD:TALK)[S.k];if(!set||S.got.includes(i))return;S.drag=null;const need=S.got.length;
 if(i!==need){const want=set[need];
  if(v==='build')return nope(need===0?`Start with “I think”, so everyone knows it is what you think.`:need===1?`Say what you think first: “${want}”. The reason comes after.`:'The reason goes last.');
  return nope(need===0?'Start by saying what you think.':need===1?`Give your first reason next: “${want}”.`:need===2?`Add one more reason with “and” before you finish.`:'')}
 S.got.push(i);A.sound.tick();if(S.got.length<set.length){say(set.slice(0,S.got.length).join(' '));S.bad='';ctrl();return A.redraw()}
 good(set.join(' '),(v==='build'?BUILD:TALK).length)}
function why(tag,v){
 if(tag==='just')return v==='reply'?'“Because I just do” does not tell your friend why. Give a real reason.':'“Because I just do” is not a reason. A reason tells why you think it.';
 if(tag==='off')return'That is true, maybe, but it is not about the opinion. The reason must tell why.';
 if(tag==='vague')return'“It is good” does not tell us much. What is good about it? Say the thing you like.';
 if(tag==='same')return'That just says the same thing again. A reason must tell us something new.';
 if(tag==='rude')return'You can disagree, but say it kindly and give your reason: “I disagree, because…”';
 return'Look again at what the reason tells us.'}
function pick(i){const v=kind(),r=(PICK[v]||[])[S.k];if(!r)return;S.drag=null;const[q,ops]=r,[t,tag]=ops[i];
 if(tag!=='ok')return nope(why(tag,v));good(v==='reply'?t:q.replace('…',' '+t),PICK[v].length)}
function choose(d){if(kind()==='build'||kind()==='talk')place(d.i);else pick(d.i)}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 const ds=deck();if(ds.length)c.el('p',{class:'fl-tk'},ctl,v==='build'||v==='talk'?'Which part comes next?':'Pick the best one:');ds.forEach(d=>B(d.t,()=>choose(d),(v==='build'||v==='talk'?'Next part: ':'Choose: ')+d.t));A.redraw()}
function down(p){const s=slots().find(s=>inside(p,s.r));if(!s)return false;S.drag={i:s.i,x:p.x,y:p.y,x0:p.x,y0:p.y,d:s};return true}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8,b=bubble(),hit=inside(p,{x:b.x,y:b.y-20,w:b.w,h:b.h+60});
 if(tap||hit)return choose(d.d);S.drag=null;say('Drop the card in the speech bubble, or tap it.');A.redraw()}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*40+30:(j+1)*420))}
const okAt=v=>PICK[v].map(([,ops])=>()=>pick(ops.findIndex(o=>o[1]==='ok')));
const reset=()=>{S.run++;Object.assign(S,{want:()=>{},k:0,done:0,got:[],bad:'',drag:null,last:'',said:''})};
const steps=[
{h:'I think … because …',p:'An opinion is what you think. Drag the cards into the bubble in order, or tap them: first “I think”, then what you think, then why.',task:'Build three opinions',
 show:()=>{steps[0].go();chain(BUILD.flatMap(s=>s.map((_,i)=>()=>place(i))))},go:()=>{reset();say('Drag the first part into the speech bubble.');ctrl();S.want=fin(0,()=>S.done>=3,'I think says it is your opinion. Because brings in the reason.')}},
{h:'A reason tells why',p:'After “because” comes a reason. It must tell why you think it. Drag the best reason into the bubble.',
 predict:{q:'Is “because I just do” a reason?',opts:['Yes','No'],ans:1},task:'Give three opinions a real reason',
 show:()=>{steps[1].go();chain(okAt('why'))},go:()=>{reset();say('Pick the reason that tells why.');ctrl();S.want=fin(1,()=>S.done>=3,'A real reason is about the opinion and tells why.')}},
{h:'Make it clear',p:'“It is good” is a weak reason. A clear reason says what you like, so others can picture it.',
 predict:{q:'Which reason tells your friend more?',opts:['because it is good','because it has a funny dragon'],ans:1},task:'Pick three clear reasons',
 show:()=>{steps[2].go();chain(okAt('clear'))},go:()=>{reset();say('Pick the clear reason.');ctrl();S.want=fin(2,()=>S.done>=3,'Clear reasons name the thing: a dragon, goals, a toy boat.')}},
{h:'Agree or disagree',p:'Your friend gives an opinion. You can agree or disagree. Be kind, and give your own reason.',
 predict:{q:'Mia likes rain. Ben does not. Is one of them wrong?',opts:['Yes, one is wrong','No, both can have reasons'],ans:1},task:'Answer three friends',
 show:()=>{steps[3].go();chain(okAt('reply'))},go:()=>{reset();say('What could you say back?');ctrl();S.want=fin(3,()=>S.done>=3,'People can think different things. Say “I agree” or “I disagree”, then because.')}},
{h:'Tell the group',p:'Now say a longer opinion: what you think, a reason, one more reason with “and”, then an ending with “So”.',task:'Build two opinion talks',
 show:()=>{steps[4].go();chain(TALK.flatMap(s=>s.map((_,i)=>()=>place(i))))},go:()=>{reset();say('Drag the first part into the bubble.');ctrl();S.want=fin(4,()=>S.done>=2,'Opinion, reasons, then an ending that says it again.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one gives an opinion and a reason?',[['I think owls are cool because they fly at night.','ok'],['I think owls are cool.','noreason'],['Owls are cool because I just do.','circle']]],
 ['“I like the beach because…” Which reason is best?',[['I can build sandcastles.','ok'],['it is good.','vague2'],['my hat is red.','off2']]],
 ['Tom says: “I think pizza is the best because it is cheesy.” What is a kind way to disagree?',[['I disagree, because I like pasta more.','ok'],['Pizza is yucky, you are wrong!','rude2'],['I disagree, because I just do.','circle2']]],
 ['Which word joins an opinion to its reason?',[['because','ok'],['and then','then'],['the end','end']]]];
function slip(t){let m='Check: is there an opinion, and a reason that tells why?';
 if(t==='noreason')m='That is an opinion, but there is no reason. Add “because…” to tell why.';
 if(t==='circle')m='“Because I just do” is not a real reason. Say why owls are cool.';
 if(t==='vague2')m='“It is good” is a weak reason. Say what is good: sandcastles!';
 if(t==='off2')m='Your hat has nothing to do with the beach. The reason must tell why you like it.';
 if(t==='rude2')m='You can disagree, but “you are wrong” is not kind. Say “I disagree, because…”';
 if(t==='circle2')m='That is polite, but there is no real reason. Tell Tom why you like something else.';
 if(t==='then')m='“And then” tells what happens next in a story. “Because” brings in the reason.';
 if(t==='end')m='“The end” finishes a story. “Because” joins the opinion to its reason.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! An opinion with a real reason.':'✗ '+slip(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
