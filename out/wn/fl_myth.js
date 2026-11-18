/* Flagship – why "learning styles" is a myth (ages 10–11, Learning to Learn; metacognition and self-regulated learning,
   EEF 2018/2021). Meet three learners with real likes, run a toy crossover test of the meshing hypothesis (Pashler,
   McDaniel, Rohrer and Bjork 2008), match the method to the topic, compare words alone with words plus pictures (dual
   coding, Mayer's multimedia principle) and compare study plans a week later (retrieval practice). Numbers are a toy
   model that follows the direction of the research, not real data. */
(()=>{
VIS.reg('flagmyth',c=>{let A,bar,cq,turn=-1,row=0;const T={};
const part=()=>['meet','test','fit','dual','plan','quiz'][A.step];
const note=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const px=n=>Math.round(n*(A.narrow?1:1.15)),paint=()=>A.redraw();
const KIDS=[['Mia','pictures'],['Leo','listening'],['Ava','doing']];
const FIT=[['The shape of a country','pic','map'],['How a French word sounds','ear','sound'],['How to tie a knot','do','hands']];
const PLANS=[['Re-read notes 3 times',3],['Study in "my style"',3],['Test yourself, then check',6]];
function label(g,s,x,y,n,col,al,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-16)}
function barH(g,x,y,w,h,v,col,name){const K=A.col;A.paint.rrect(x,y,w,h,6);g.fillStyle=A.mix(K.pn,K.mu,.12);g.fill();
 if(v>0){A.paint.rrect(x,y,w*v/10,h,6);g.fillStyle=col;g.fill()}label(g,name,x,y-px(10),12,K.tx,'left');if(v>0)label(g,v+' of 10',x+w+6,y+h/2,12,K.tx,'left',800)}
function person(g,x,y,r,col,name,sub){const K=A.col;g.beginPath();g.arc(x,y-r*.6,r*.45,0,7);g.fillStyle=col;g.fill();A.paint.rrect(x-r*.6,y-r*.05,r*1.2,r*.9,r*.3);g.fill();
 label(g,name,x,y+r*1.15,14,K.tx);if(sub)label(g,sub,x,y+r*1.55,12,K.mu,'center',600)}
function draw(A){const{ctx:g,W,H,col:K}=A,v=part(),cs=[K.cy,K.or,K.vi];g.fillStyle=A.mix(K.pn,K.vi,K.dark?.04:.06);g.fillRect(0,0,W,H);
 const bw=Math.min(W*.6,320),bx=(W-bw)/2-20;
 if(v==='meet'){label(g,'Everyone has things they like',W/2,22,15);KIDS.forEach(([n,l],i)=>person(g,W*(i+1)/4,H*.5,Math.min(W*.17,H*.24),cs[i],n,T.seen[i]?'likes '+l:'tap me'));}
 if(v==='test'){label(g,'Learn a map: pictures or words?',W/2,20,15);
  if(!T.run)label(g,'Tap Run the test',W/2,H*.5,14,K.mu);
  else{const r=[['"Picture" kids, shown a picture',7,K.cy],['"Picture" kids, told in words',4,K.or],['"Listening" kids, shown a picture',7,K.cy],['"Listening" kids, told in words',4,K.or]];
   r.forEach(([n,s,col],i)=>barH(g,bx,H*.2+i*H*.19,bw,H*.07,s,col,n));label(g,'Score out of 10, a toy model',W/2,H-14,11,K.mu)}}
 if(v==='fit'){const f=FIT[Math.min(T.ok,2)];label(g,`Topic ${Math.min(T.ok+1,3)} of 3`,W/2,22,13,K.mu);label(g,f[0],W/2,H*.42,18,K.tx,'center',800);label(g,'Which way fits this topic best?',W/2,H*.6,14,K.mu)}
 if(v==='dual'){label(g,'Remembered a day later',W/2,20,15);barH(g,bx,H*.35,bw,H*.1,T.w,K.or,'Words only');barH(g,bx,H*.65,bw,H*.1,T.p,K.cy,'Words and pictures')}
 if(v==='plan'){label(g,'Remembered a week later',W/2,20,15);PLANS.forEach(([n,s],i)=>barH(g,bx,H*.24+i*H*.25,bw,H*.09,T.tried[i]?s:0,[K.or,K.vi,K.gr][i],n))}
 if(v==='quiz'){label(g,'Your favourite way is fine to like',W/2,H*.3,15);label(g,'The topic picks the best way',W/2,H*.47,15);label(g,'Test yourself and use pictures',W/2,H*.64,15,K.mu)}
 A.fx.draw(g)}
const no=s=>{A.sound.miss();note(s);paint()},yes=s=>{A.sound.pop();note(s);keys();paint();T.want()};
function meet(i){if(part()!=='meet'||T.seen[i])return;T.seen[i]=1;const[n,l]=KIDS[i],k=T.seen.filter(Boolean).length;
 if(k<3){A.sound.pop();note(`${n} likes ${l}. That is a real like. Meet the others.`);return paint()}yes(`${n} likes ${l}. Liking a way is real. The question is: do we learn more when lessons match our like?`)}
function runTest(){if(part()!=='test'||T.run)return;T.run=1;A.kick();yes('Both groups did better with the picture, and both did worse with words. Matching the lesson to the "style" made no difference. The map is a picture-y topic for everyone.')}
function fit(k){if(part()!=='fit'||T.ok>=3)return;const f=FIT[T.ok];
 if(k!==f[1])return no(k==='pic'?`A picture cannot show how a word sounds or how a knot feels. ${f[0]} needs ${f[2]}.`:k==='ear'?`Hearing about it is weak here. ${f[0]} needs ${f[2]}.`:`Doing does not fit this one best. ${f[0]} needs ${f[2]}.`);
 T.ok++;if(T.ok<3){A.sound.pop();note(`Yes, ${f[0].toLowerCase()} needs ${f[2]}, for everyone. Next topic.`);keys();return paint()}yes('Yes. The topic picks the best way, not the learner\u2019s style.')}
function dual(k){if(part()!=='dual')return;if(k==='w'&&!T.w){T.w=4;A.sound.tick();note('Words only: 4 of 10 facts remembered.')}else if(k==='p'&&!T.p){T.p=7;A.sound.tick();note('Words and pictures: 7 of 10 facts remembered.')}else return;
 if(T.w&&T.p)return yes('Words and pictures together beat words alone, for every learner. Two kinds of clue give your memory two ways back.');keys();paint()}
function plan(i){if(part()!=='plan'||T.tried[i])return;T.tried[i]=1;A.sound.tick();const k=T.tried.filter(Boolean).length;
 if(k<3){note(i===2?'Testing yourself: 6 of 10 a week later.':`${PLANS[i][0]}: only 3 of 10 a week later.`);keys();return paint()}yes('Testing yourself won. Studying in "my style" did no better than re-reading.')}
function keys(){if(!bar)return;bar.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t);b.onclick=fn};
 if(v==='meet')KIDS.forEach(([n],i)=>{if(!T.seen[i])B('Meet '+n,()=>meet(i))});
 if(v==='test'&&!T.run)B('Run the test',runTest,'Run the test: teach a map to both groups');
 if(v==='fit'&&T.ok<3){const o=[['Look at a picture','pic'],['Listen to it','ear'],['Try it with your hands','do']],r=T.ok%3;o.slice(r).concat(o.slice(0,r)).forEach(([s,k])=>B(s,()=>fit(k)))}
 if(v==='dual'){if(!T.w)B('Teach with words only',()=>dual('w'));if(!T.p)B('Teach with words and pictures',()=>dual('p'))}
 if(v==='plan')PLANS.forEach(([n],i)=>{if(!T.tried[i])B(n,()=>plan(i))})}
function down(p){if(part()!=='meet')return false;const i=Math.floor(p.x/A.W*4-.5);if(i>=0&&i<3&&Math.abs(p.y-A.H*.5)<A.H*.3){meet(i);return true}return false}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=++T.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===T.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const clean=o=>{const t=(T.tok||0)+1;Object.keys(T).forEach(k=>delete T[k]);Object.assign(T,{tok:t,want:()=>{},seen:[0,0,0],run:0,ok:0,w:0,p:0,tried:[0,0,0]},o)};
const steps=[
{h:'Real likes',p:'Mia, Leo and Ava each have a favourite way to learn. Tap each one.',task:'Meet all 3 learners',
 show:()=>{steps[0].go();later([0,1,2].map(i=>()=>meet(i)),600)},
 go:()=>{clean();note('Tap Mia, Leo and Ava to see what each one likes.');keys();T.want=ok(0,()=>T.seen.every(Boolean),'Liking a way to learn is real.')}},
{h:'Test the claim',p:'The claim: you learn more when a lesson matches your style. Teach a map to "picture" kids and "listening" kids, in pictures and in words.',predict:{q:'What will the test show?',opts:['Both groups do best with the picture','Each group does best in its own style','Words win for everyone'],ans:0},task:'Run the test',
 show:()=>{steps[1].go();later([runTest],700)},
 go:()=>{clean();note('Tap Run the test.');keys();T.want=ok(1,()=>T.run,'Matching lessons to styles did not help.')}},
{h:'The topic decides',p:'Some topics are best seen, some heard, some done. Pick the way that fits each topic.',task:'Match 3 topics',
 show:()=>{steps[2].go();later(FIT.map(f=>()=>fit(f[1])),700)},
 go:()=>{clean();note('Which way fits this topic best?');keys();T.want=ok(2,()=>T.ok>=3,'The topic picks the method.')}},
{h:'Words and pictures',p:'Teach the same 10 facts two ways. Which way do people remember better?',predict:{q:'Which lesson will people remember more of?',opts:['Words and pictures together','Words only','Both the same'],ans:0},task:'Teach both ways',
 show:()=>{steps[3].go();later([()=>dual('w'),()=>dual('p')],700)},
 go:()=>{clean();note('Try both ways of teaching.');keys();T.want=ok(3,()=>T.w&&T.p,'Words plus pictures help everyone.')}},
{h:'What works for all',p:'Three study plans, same time. Which leaves the most in your memory a week later?',predict:{q:'Which plan helps most a week later?',opts:['Test yourself, then check','Study in your style','Re-read 3 times'],ans:0},task:'Try all 3 plans',
 show:()=>{steps[4].go();later([0,1,2].map(i=>()=>plan(i)),600)},
 go:()=>{clean();note('Try each study plan.');keys();T.want=ok(4,()=>T.tried.every(Boolean),'Testing yourself helps every learner.')}},
{h:'Challenge',p:'',go:()=>{clean();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.want()});
const QS=[['Zoe says, "I am a visual learner, so I can\u2019t learn from listening." What is true?',[['She can learn from listening too','ok'],['She can only learn from pictures','only'],['She should stop listening in class','stop']]],
 ['What did careful tests of learning styles find?',[['Matching lessons to styles did not help','ok'],['Matched lessons doubled scores','double'],['Only visual learners are real','visual']]],
 ['You need to learn how a bird song sounds. What is the best way?',[['Listen to it','ok'],['Look at a photo of the bird','pic'],['Read a list of facts','read']]],
 ['Which helps almost everyone remember more?',[['Words and pictures together','ok'],['Only the way you like best','like'],['Reading the page again','reread']]],
 ['Is it OK to have a favourite way to learn?',[['Yes, likes are real, but they do not decide how you learn best','ok'],['No, likes are made up','fake'],['Yes, so always learn that way','always']]],
 ['Which study plan works best a week later?',[['Test yourself, then check','ok'],['Study in your style','like'],['Re-read three times','reread']]]];
function tip(t){let m='Learning styles are a myth: the topic and good habits matter, not a style label.';
 if(t==='only')m='Everyone learns through seeing, hearing and doing. A label does not switch any of them off.';
 if(t==='stop')m='Listening still works for her. Stopping would just mean missing the lesson.';
 if(t==='double')m='No careful test found that. When lessons matched styles, scores stayed the same.';
 if(t==='visual')m='No style is special. Pictures help most people when the topic is picture-y.';
 if(t==='pic'||t==='read')m='A sound has to be heard. The topic decides the best way to learn it.';
 if(t==='like')m='Learning in your favourite way did no better in tests. Pictures plus words and self-testing helped everyone.';
 if(t==='reread')m='Re-reading feels easy but fades fast. Testing yourself makes memories last.';
 if(t==='fake')m='Your likes are real. They just do not make you learn more.';
 if(t==='always')m='Liking a way is fine, but always using it can mean picking the wrong way for the topic.';
 return m}
function ask(){turn++;const[q,ops]=QS[turn%QS.length],rot=turn%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=cq.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>score(t)});note('Challenge: '+q);paint()}
function score(t){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),good=t==='ok';
 if(good){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+row+'.':'Not quite. '+tip(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{cq.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);clean();
  A.gest({down,move:()=>{},up:()=>{}});keys()}});
A.start()})})();
