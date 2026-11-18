/* Flagship – giving and receiving feedback (ages 9–11). Sort comments into vague, hurtful and helpful; build feedback
   for real work from a specific star and a specific next step; choose how to respond when you get feedback (listen,
   ask, thank, not defend); and decide which suggestions to use, ask about or set aside for your task. */
(()=>{
const BINS=['Vague','Hurtful','Helpful'];
const SORT=[["It's good.",0],['This is rubbish.',1],["Your first line, 'The door creaked open', made me want to read on.",2],['Change it.',0],["You're so bad at spelling.",1],['Put a label on the diagram so I know which part is the lung.',2]];
const BUILD=[{who:'Ava',e:'📖',work:'Story opening: “It was a dark night. Ava ran.”',star:[["Your short sentence 'Ava ran.' makes it feel fast and scary.",'ok'],["It's great!",'vague'],["You're a brilliant writer.",'person']],
  step:[['Add one sound she hears, so I can picture the night.','ok'],['Make it better.','vague'],["It's too short and boring.",'blunt']]},
 {who:'Leo',e:'🖼️',work:'Poster: “Save water!” in a big blue heading, with a picture of a tap.',star:[['The big blue heading is easy to read from far away.','ok'],['Cool poster.','vague'],['You always do nice posters.','person']],
  step:[['Add one fact with a number, like how much water a shower uses.','ok'],['It needs more stuff.','vague'],['The writing is messy, as usual.','blunt']]}];
const GET=[{fb:"Your graph has no title, so I didn't know what it showed.",ops:[['Thanks. What title would make it clear?','ok'],["Well, YOUR graph isn't perfect either.",'attack'],['Everyone else forgot too.','excuse']]},
 {fb:'The middle of your story was hard to follow.',ops:[['Which part lost you?','ok'],["You just didn't read it properly.",'blame'],["Fine. I'll delete the whole thing.",'quit']]},
 {fb:'You spoke a bit fast. I missed your last fact.',ops:[["Thanks. I'll pause after each fact.",'ok'],["I was nervous, so it doesn't count.",'excuse'],['Whatever, I like it fast.','dismiss']]}];
const TASK='Your task: write a letter to the head teacher asking for a school garden.';
const DEC=[['Say how a garden would help pupils, like learning where food comes from.',0],['Turn it into a comic strip instead!',2],['Your second reason is confusing.',1],["Start with 'Dear Mrs Patel'.",0]];
const ACTS=['Use it','Ask about it','Set it aside'];
VIS.reg('flaggivefb',c=>{let A,pad,quiz,qn=-1,run=0,row=0;
const fresh=()=>({at:0,got:0,need:3,bad:-1,part:0,hand:null,hot:[],placed:[],mood:.5,work:.5,after:()=>{},fast:0}),S=fresh();
const mode=()=>['hi','sort','build','get','decide','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1:1.1)),fast=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function wrap(g,s,x,y,w,size,col,wt){g.font=`${wt||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[''];String(s).split(' ').forEach(p=>{const k=L.length-1,t=L[k]?L[k]+' '+p:p;if(L[k]&&g.measureText(t).width>w)L.push(p);else L[k]=t});
 L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*z(size)*1.28))}
function box(g,r,tone,lw){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi,pk:C.pk}[tone];g.save();A.paint.shadow(5,2,.12);g.fillStyle=h?A.mix(C.pn,h,.15):C.pn;
 A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.lineWidth=lw||(h?3:1.5);g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
/* layout: a card on top, three option pads below (columns for short labels, rows for long ones) */
const top=()=>({x:12,y:A.H*.05,w:A.W-24,h:A.H*.33});
function pads(rows){const d=S.hand,y0=A.H*.43,gap=8;return[0,1,2].map(i=>{let r;if(rows){const h=(A.H*.55-gap*2)/3;r={x:12,y:y0+i*(h+gap),w:A.W-24,h}}
 else{const w=(A.W-24-gap*2)/3;r={x:12+i*(w+gap),y:A.H*.6,w,h:A.H*.37}}
 if(d&&d.pad&&d.i===i&&d.x!=null)return{...r,x:d.x-r.w/2,y:d.y-r.h/2};return r})}
const held=()=>{const r=top(),d=S.hand;if(d&&!d.pad&&d.x!=null){const w=Math.min(r.w,z(300)),h=z(90);return{x:d.x-w/2,y:d.y-h/2,w,h}}return r};
const opts=()=>{const m=mode();if(m==='build'){const b=BUILD[S.at];return(S.part?b.step:b.star)}if(m==='get')return GET[S.at].ops;return null};
function bars(g){const C=A.col,w=(A.W-36)/2,y=A.H*.32;[['Work gets better',S.work,C.gr],["They'll help again",S.mood,C.cy]].forEach(([l,v,col],i)=>{const x=12+i*(w+12);
 g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(x,y,w,z(14),7);g.fill();g.fillStyle=col;A.paint.rrect(x,y,Math.max(z(14),w*v),z(14),7);g.fill();wrap(g,l,x+w/2,y-z(12),w,12,C.tx,700)})}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();
 if(m==='quiz'){wrap(g,'Helpful feedback is specific and about the work. When you get feedback: listen, ask, thank, then decide.',W/2,H*.45,W-40,17,C.tx,800);return}
 if(m==='hi'){const r={x:12,y:H*.06,w:W-24,h:H*.4};box(g,r,'am',2.5);wrap(g,'⭐ A star: say exactly what worked.',W/2,r.y+r.h*.3,r.w-20,17,C.tx,800);wrap(g,'➜ A step: say exactly what to try next.',W/2,r.y+r.h*.7,r.w-20,17,C.tx,800);
  const q={x:12,y:H*.53,w:W-24,h:H*.4};box(g,q,'cy',2.5);wrap(g,'Getting feedback? Listen, ask, thank, then decide what to use.',W/2,q.y+q.h/2,q.w-24,17,C.tx,800);return}
 if(m==='sort'){wrap(g,'Drag the comment to its box, or tap a box.',W/2,H*.47,W-30,14,C.mu,700);const ps=pads(0);S.hot=ps;
  ps.forEach((r,i)=>{box(g,r,S.bad===i?'no':['am','pk','ok'][i],3);wrap(g,BINS[i],r.x+r.w/2,r.y+z(18),r.w-8,16,C.tx,900);
   S.placed.filter(j=>SORT[j][1]===i).forEach((j,k)=>wrap(g,'✓ '+SORT[j][0].slice(0,18)+(SORT[j][0].length>18?'…':''),r.x+r.w/2,r.y+z(52)+k*z(34),r.w-8,11,C.tx,600))});
  if(S.got<S.need){const r=held();box(g,r,'vi',3);wrap(g,'“'+SORT[S.at][0]+'”',r.x+r.w/2,r.y+r.h/2,r.w-24,16,C.tx,800)}}
 if(m==='build'){const b=BUILD[S.at],r=top();box(g,r,'',2);wrap(g,b.e+' '+b.who+'’s '+b.work,W/2,r.y+r.h*.25,r.w-20,14,C.tx,800);
  const pick=(k,y,lab)=>{const v=S.placed[k];wrap(g,v!=null?lab+' '+v:lab+' …',W/2,y,r.w-20,13,v!=null?C.tx:C.mu,v!=null?800:600)};
  pick(0,r.y+r.h*.58,'⭐');pick(1,r.y+r.h*.85,'➜');
  if(S.placed.length<2){const ps=pads(1),o=opts();S.hot=ps;ps.forEach((p,i)=>{box(g,p,S.bad===i?'no':S.part?'cy':'am',2.5);wrap(g,o[i][0],p.x+p.w/2,p.y+p.h/2,p.w-20,14,C.tx,700)});
   wrap(g,S.part?'Pick a step: drag it up to the work, or tap it.':'Pick a star: drag it up to the work, or tap it.',W/2,H*.405,W-20,12,C.mu,700)}else S.hot=[]}
 if(m==='get'){const r={x:12,y:H*.04,w:W-24,h:H*.2};box(g,r,'pk',2.5);wrap(g,'💬 “'+GET[S.at].fb+'”',W/2,r.y+r.h/2,r.w-20,15,C.tx,800);bars(g);
  if(S.got<S.need&&S.placed.length===0){const ps=pads(1),o=opts();S.hot=ps;ps.forEach((p,i)=>{box(g,p,S.bad===i?'no':'vi',2.5);wrap(g,o[i][0],p.x+p.w/2,p.y+p.h/2,p.w-20,14,C.tx,700)})}else S.hot=[]}
 if(m==='decide'){wrap(g,TASK,W/2,H*.47,W-30,13,C.mu,700);const ps=pads(0);S.hot=ps;
  ps.forEach((r,i)=>{box(g,r,S.bad===i?'no':['ok','cy','am'][i],3);wrap(g,ACTS[i],r.x+r.w/2,r.y+z(18),r.w-8,15,C.tx,900);
   S.placed.filter(j=>DEC[j][1]===i).forEach((j,k)=>wrap(g,'✓ '+DEC[j][0].slice(0,16)+'…',r.x+r.w/2,r.y+z(50)+k*z(34),r.w-8,11,C.tx,600))});
  if(S.got<S.need){const r=held();box(g,r,'vi',3);wrap(g,'“'+DEC[S.at][0]+'”',r.x+r.w/2,r.y+r.h/2,r.w-24,16,C.tx,800)}}
 A.fx.draw(g)}
function no(t,j){A.sound.miss();S.bad=j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1400);A.redraw()}
function yes(t){S.got++;A.sound.pop();say(t);ctl();A.redraw();S.after()}
function soon(f,ms){const k=run,at=S.at;setTimeout(()=>{if(k!==run||S.at!==at||S.got>=S.need)return;f()},fast()?5:ms)}
function sort(i){if(mode()!=='sort'||S.got>=S.need)return;const [t,b]=SORT[S.at];
 if(i!==b){let m=`Think: does “${t}” say what worked or what to change, and is it about the work?`;
  if(b===2&&i===0)m='Look again: it names the exact part and why, so the writer can use it. That is specific, not vague.';
  if(b===0&&i===2)m=`“${t}” is not unkind, but it does not say what worked or how to change it, so it cannot help.`;
  if(b===1&&i===0)m=`“${t}” is worse than vague: it hurts and gives nothing to fix.`;
  if(b===1&&i===2)m='Being blunt is not the same as being helpful. It is about the person, not the work. Try: check the spelling of because in line 2.';
  if(b===0&&i===1)m=`“${t}” is not mean, just empty. It does not hurt, but it does not help either.`;return no(m,i)}
 S.placed.push(S.at);S.at++;yes(`${BINS[b]}.`+(b===2?' It names the part and says why or how.':b===1?' It attacks, and gives nothing to fix.':' Kind or not, it gives nothing to use.'))}
function build(i){if(mode()!=='build'||S.got>=S.need||S.placed.length>=2)return;const b=BUILD[S.at],[t,k]=opts()[i];
 if(k!=='ok'){let m='Pick the one that names a part of the work.';
  if(k==='vague')m=S.part?'Make it better how? A step says exactly what to try, so they can do it today.':'That is kind but vague. It does not say what worked, so they cannot do it again.';
  if(k==='person')m='That praises the person, not the work. Name the part that worked.';
  if(k==='blunt')m='It points at a problem but gives no way to fix it, so it stings and does not help.';return no(m,i)}
 S.placed.push(t);A.sound.tick();if(!S.part){S.part=1;say('Good star. Now pick a step.');ctl();return A.redraw()}
 yes(`Feedback for ${b.who}: a specific star and a specific step.`);soon(()=>{S.at++;S.part=0;S.placed=[];say('Next piece of work.');ctl();A.redraw()},1600)}
function get(i){if(mode()!=='get'||S.got>=S.need||S.placed.length)return;const [t,k]=GET[S.at].ops[i];
 if(k!=='ok'){S.mood=Math.max(.1,S.mood-.15);let m='Listen first. Then ask, thank, and decide.';
  if(k==='attack')m='Hitting back turns it into a fight, and nothing gets fixed. Feedback is about the graph, not about you.';
  if(k==='excuse')m='An excuse may be true, but it stops you using the tip. Listen to the point, then decide.';
  if(k==='blame')m='Blaming the reader closes the door. Ask which part lost them, so you know what to fix.';
  if(k==='quit')m='One tricky part does not mean the whole story is bad. Ask which part, and fix just that.';
  if(k==='dismiss')m='Brushing it off means the next audience misses your facts too. Thank them, and try a pause.';return no(m,i)}
 S.placed=[t];S.mood=Math.min(1,S.mood+.2);A.tween(S,{work:Math.min(1,S.work+.17)},fast()?1:600);yes(`“${t}” You listened, asked or thanked, and now you can make it better.`);
 soon(()=>{S.at++;S.placed=[];say('Next comment.');ctl();A.redraw()},1500)}
function decide(i){if(mode()!=='decide'||S.got>=S.need)return;const [t,a]=DEC[S.at];
 if(i!==a){let m='Ask: does it fit my task, and do I know what to change?';
  if(a===0)m='It fits a letter asking for a garden, and it says exactly what to add. Use it.';
  if(a===2)m='Your task is a letter. A comic would not be a letter, so thank them and set it aside.';
  if(a===1)m='You cannot fix “confusing” until you know which words. Ask: which part lost you?';return no(m,i)}
 S.placed.push(S.at);S.at++;yes(`${ACTS[a]}.`+(a===2?' You can still say thanks.':a===1?' Then you know what to fix.':' It fits the task.'))}
const choose=i=>({sort,build,get,decide}[mode()]||(()=>{}))(i);
function ctl(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if(m==='sort')BINS.forEach((b,i)=>B(b,()=>sort(i),`Put “${SORT[S.at][0]}” in ${b}`));
 if(m==='decide')ACTS.forEach((b,i)=>B(b,()=>decide(i),`${b}: “${DEC[S.at][0]}”`));
 if((m==='build'&&S.placed.length<2)||(m==='get'&&!S.placed.length))opts().forEach(([t],i)=>B(t,()=>choose(i),(m==='build'?(S.part?'Step: ':'Star: '):'Reply: ')+t))}
const over=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;
 if((m==='sort'||m==='decide')&&over(p,held(),4)){S.hand={pad:0,x:null,x0:p.x,y0:p.y};return true}
 const i=S.hot.findIndex(r=>over(p,r,3));if(i<0)return false;S.hand={pad:1,i,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.hand;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hand;S.hand=null;if(!d)return;const m=mode();
 if(!d.pad){if(d.x==null){say('Drag the card to a box, or tap a box.');return A.redraw()}const i=pads(0).findIndex(r=>over(p,r,10));if(i>=0)return choose(i);say('Drop the card on a box.');return A.redraw()}
 if(d.x==null||m==='sort'||m==='decide')return choose(d.i);if(p.y<A.H*.4)return choose(d.i);say('Drag it up to the top, or just tap it.');A.redraw()}
const fin=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++run,go=()=>{if(k!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function best(){const m=mode();if(m==='sort')return sort(SORT[S.at][1]);if(m==='decide')return decide(DEC[S.at][1]);
 if(m==='build'&&S.placed.length<2)return build(opts().findIndex(o=>o[1]==='ok'));if(m==='get'&&!S.placed.length)return get(opts().findIndex(o=>o[1]==='ok'))}
const demo=i=>()=>{steps[i].go();S.fast=1;auto(best)};
const steps=[
{h:'A star and a step',p:'Feedback tells someone how their work lands. Helpful feedback has a star (exactly what worked) and a step (exactly what to try next). It is about the work, not the person.',
 go:()=>{reset();say('A star says exactly what worked. A step says exactly what to try next.')}},
{h:'Vague, hurtful or helpful?',p:'Read each comment. Could the person use it to improve their work? Sort it.',predict:{q:'Is “It’s good.” helpful feedback?',opts:['Yes, it is kind','Not much: it does not say what worked'],ans:1},task:'Sort 6 comments',show:demo(1),
 go:()=>{reset();S.need=6;say('Drag the comment to Vague, Hurtful or Helpful, or tap a box.');ctl();S.after=fin(1,'Helpful comments name the exact part and say why or how. Vague ones give nothing to use, and hurtful ones attack the person.')}},
{h:'Build your feedback',p:'Choose a star, then a step, for each piece of work. Pick the ones that point at a real part of the work.',task:'Give feedback on 2 pieces of work',show:demo(2),
 go:()=>{reset();S.need=2;say('Pick a star for the work: drag it up or tap it.');ctl();S.after=fin(2,'A good star names what worked; a good step says exactly what to try. Both are about the work.')}},
{h:'Getting feedback',p:'Now someone gives you feedback. Your first move matters. Watch what happens to your work, and to whether they will help you again.',predict:{q:'Someone points out a problem in your work. The best first move is to…',opts:['Explain why it is not your fault','Listen, then ask or say thanks'],ans:1},task:'Reply to 3 comments',show:demo(3),
 go:()=>{reset();S.need=3;say('Choose your reply: drag it up or tap it.');ctl();S.after=fin(3,'Listen, ask a question, say thanks. Excuses and hitting back stop the work from getting better.')}},
{h:'Use it, ask, or set aside?',p:'You do not have to do every suggestion. Check each one against your task. Use it, ask about it, or thank them and set it aside.',predict:{q:'Do you have to change everything someone suggests?',opts:['Yes, or it is rude','No: think about each point'],ans:1},task:'Decide on 4 suggestions',show:demo(4),
 go:()=>{reset();S.need=4;say(TASK+' Drag each suggestion to Use it, Ask about it or Set it aside.');ctl();S.after=fin(4,'Use what fits your task, ask about what is unclear, and thank them for the rest.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which is the most helpful star for a poem?',[["The word 'crackled' lets me hear the fire.",'ok'],['Great poem!','vague'],["You're the best at poems.",'person']]],
 ['Which is the most helpful step for a science report?',[['Add the units, cm, to your table.','ok'],['Try harder next time.','vague'],['Your table is a mess.','blunt']]],
 ['Your friend says your comic is hard to read. What do you say first?',[['Which panel was hard to read?','ok'],["Yours isn't great either.",'attack'],['I ran out of time.','excuse']]],
 ['Your task is a recipe. A friend says, “Make it a poem!” What do you do?',[['Thank them and set it aside: it must be a recipe','ok'],['Change it to a poem, or they will be upset','obey'],['Tell them it is a silly idea','rude']]],
 ['Why is “It’s good” not enough as feedback?',[['It does not say what worked, so it cannot be repeated','ok'],['It is too unkind','unkind'],['Feedback should only list mistakes','only']]],
 ['Mo says, “Your ending is boring.” How could he say it better?',[['The ending stops fast. Could Kit say how she feels?','ok'],['Your ending is really, really boring.','blunt'],['It is fine, I guess.','vague']]]];
function why(t){let m='Helpful feedback names a part of the work and says what to keep or try.';
 if(t==='vague')m='Kind, but it does not say which part. The person cannot use it.';if(t==='person')m='That is about the person, not the work. Name the part that worked.';
 if(t==='blunt')m='It says something is wrong but not how to fix it, so it stings and does not help.';if(t==='attack')m='Hitting back starts a fight. Ask which part, so you can fix it.';
 if(t==='excuse')m='The reason may be true, but it stops you hearing the tip. Listen first.';if(t==='obey')m='You decide. If it does not fit your task, you can thank them and set it aside.';
 if(t==='rude')m='You can say no without being unkind. Say thanks, then set it aside.';if(t==='unkind')m='It is not unkind at all. The problem is it is vague: nobody can use it.';
 if(t==='only')m='No: good feedback also names what worked, so the person can do it again.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const bx=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},bx,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctl()}});
A.start()})})();
