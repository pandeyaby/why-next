/* Flagship – diphthongs and complex vowels (ages 5–6; NC England Year 1 spelling, English Appendix 1: ou (out), ow
   (cow and snow), ue and ew (blue, flew), ie (pie), aw and au (saw, sauce), and -y at the end (very, happy); Year 2 y as
   igh at the end (cry, fly); Common Core RF.1.3c / RF.2.3b vowel teams). Hear that ow can say two sounds, see that two
   spellings share one sound, drop the vowel team into a word gap, sort y endings by beats, and pick between sound-alikes. */
(()=>{
/* ow words: 0 = ow as in cow, 1 = ow as in snow */
const OW=[['cow',0],['snow',1],['town',0],['grow',1],['owl',0],['show',1],['down',0],['slow',1]];
const OWH=['ow in cow','ow in snow'];
/* one sound, two spellings: 0 = ou / ow (cow), 1 = ew / ue (blue), 2 = aw / au (saw) */
const TEAM=[['cloud',0],['flew',1],['claw',2],['shout',0],['glue',1],['sauce',2],['brown',0],['chew',1],['draw',2]];
const TEAMH=['ou ow: cow','ew ue: blue','aw au: saw'];
/* clue, word with * for the team, team, whole word */
const GAP=[['It says moo.','c*','ow','cow'],['A bird did this in the sky.','fl*','ew','flew'],['A cat has a sharp one.','cl*','aw','claw'],
 ['It is white and floats in the sky.','cl*d','ou','cloud'],['You can eat it. It has a crust.','p*','ie','pie']];
const TEAMS=['ow','ou','ew','aw','ie'];
/* made-up or real words a wrong team makes, so the feedback can say which */
const REAL={flow:'Water can flow, but a bird flew.',flaw:'A flaw is a mistake, but a bird flew.',paw:'A dog has a paw. You eat a pie.',caw:'A crow says caw. A cow says moo.',pew:'A pew is a long seat in a church.',pow:'Pow is the sound of a bang.'};
/* y words: 0 = y says ee, 1 = y says igh; beats */
const YS=[['happy',0,2],['fly',1,1],['funny',0,2],['sky',1,1],['baby',0,2],['cry',1,1],['sunny',0,2],['my',1,1]];
const YH=['y says ee: happy','y says igh: my'];
/* sentence with ___, right word, sound-alike, what the sound-alike means */
const ALIKE=[['The wind ___ my hat off.','blew','blue','blue is a colour.'],['A rose is a ___.','flower','flour','flour is the white powder for bread.'],
 ['Mix the ___ to make bread.','flour','flower','a flower grows in the garden.'],['She ___ her shoes.','tied','tide','the tide is the sea coming in and out.']];
VIS.reg('flagglide',c=>{let A,G,keys,chal,qn=-1,ver=0,held=null;const S={};
const INK='#1c1917',CARD='#ffffff',RIM='#78716c',OK='#15803d',BAD='#b91c1c',HOLD='#1d4ed8',TEAMBG='#ede9fe',TEAMINK='#5b21b6';
const HOUSE=['#fef3c7','#dbeafe','#dcfce7'];
const px=n=>Math.round(n*(A.narrow?1:1.12)),font=(n,w)=>`${w||800} ${px(n)}px system-ui,sans-serif`;
const STEPS=['ow','team','gap','y','alike','quiz'],now=()=>STEPS[A.step],LIST={ow:OW,team:TEAM,gap:GAP,y:YS,alike:ALIKE},finished=k=>S[k].i>=LIST[k].length;
const hit=(p,r,pad=0)=>!!r&&p.x>=r.x-pad&&p.x<=r.x+r.w+pad&&p.y>=r.y-pad&&p.y<=r.y+r.h+pad;
function ground(){G.fillStyle=A.col.dark?'#1c1917':'#fffbeb';G.fillRect(0,0,A.W,A.H)}
function write(t,x,y,n,w,col){G.fillStyle=col||INK;G.font=font(n,w);G.textAlign='center';G.textBaseline='middle';G.fillText(t,x,y,A.W-16)}
function rect(r,t,o){o=o||{};G.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||12);G.fill();G.lineWidth=o.rim?4:2;G.strokeStyle=o.rim||RIM;if(o.dash)G.setLineDash([7,5]);G.stroke();G.setLineDash([]);
 if(t!=null)write(t,r.x+r.w/2,r.y+r.h/2+1,o.n||26,o.w,o.ink)}
function head(t,good){G.font=font(15);const w=Math.min(A.W-10,G.measureText(t).width+30),h=px(15)+16,y=A.H*.03;rect({x:A.W/2-w/2,y,w,h},null,{bg:good?'#dcfce7':CARD,rim:good?OK:null,rr:h/2});write(t,A.W/2,y+h/2+1,15)}
function note(t,y){G.fillStyle=A.col.tx;G.font=font(16,700);G.textAlign='center';G.textBaseline='middle';
 const words=t.split(' '),rows=[''];words.forEach(w=>{const s=rows[rows.length-1]?rows[rows.length-1]+' '+w:w;if(G.measureText(s).width>A.W-30)rows.push(w);else rows[rows.length-1]=s});
 rows.forEach((r,k)=>G.fillText(r,A.W/2,y+k*px(22)))}
/* ---- sorting houses (steps 1, 2 and 4) ---- */
function houses(n){const g=10,w=(A.W-g*(n+1))/n;return[...Array(n)].map((_,j)=>({x:g+j*(w+g),y:A.H*.44,w,h:A.H*.53,j}))}
const cardAt=()=>{const w=Math.min(A.W-90,px(160));return{x:A.W/2-w/2,y:A.H*.17,w,h:px(58)}};
function drawSort(k,names,total){const s=S[k],list=LIST[k];ground();
 head(finished(k)?`All ${total} sorted`:`Word ${s.i+1} of ${total}: which house?`,finished(k));
 houses(names.length).forEach(b=>{rect(b,null,{bg:HOUSE[b.j],rim:s.miss===b.j?BAD:'#a16207'});G.fillStyle=INK;G.font=font(names.length>2?13:15);G.textAlign='center';G.textBaseline='top';
  const [a,bb]=names[b.j].split(': ');G.fillText(a,b.x+b.w/2,b.y+8,b.w-8);if(bb)G.fillText(bb,b.x+b.w/2,b.y+8+px(17),b.w-8);
  G.font=font(17,700);list.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>G.fillText(x[0]+(k==='y'?' '+'•'.repeat(x[2]):''),b.x+b.w/2,b.y+px(bb?44:30)+m*px(23),b.w-8))});
 if(!finished(k)){const r=cardAt(),d=held;rect(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,list[s.i][0],{rim:d?HOLD:null,n:30})}}
function sortTo(k,j){const s=S[k],list=LIST[k];if(finished(k))return;const [w,right]=list[s.i];
 if(j!==right){s.miss=j;A.sound.miss();return tell(wrongSort(k,w,right))}
 s.i++;s.miss=null;A.sound.pop();tell(rightSort(k,w,right)+(finished(k)?' All sorted.':''))}
function wrongSort(k,w,r){
 if(k==='ow')return r?`Say ${w} with the cow sound: it is not a word. ow in ${w} says the sound in snow. ow has two sounds, so try both.`:`Say ${w} with the snow sound: it is not a word. ow in ${w} says the sound in cow. ow has two sounds, so try both.`;
 if(k==='team'){const t=w.match(/ou|ow|ew|ue|aw|au/)[0];return `${w} has ${t}. ${t} says the same sound as in ${['cow','blue','saw'][r]}. Two spellings, one sound.`}
 return r?`${w} has one beat. At the end of a one-beat word, y says igh, like my.`:`${w} has two beats: ${w.slice(0,-2)}-${w.slice(-2)}. At the end of a longer word, y says ee, like happy.`}
function rightSort(k,w,r){if(k==='ow')return `${w}: ${OWH[r]}.`;if(k==='team')return `${w}: the same sound as ${['cow','blue','saw'][r]}.`;return `${w}: ${YH[r].split(':')[0]}.`}
/* ---- step 3: drop the team into the gap ---- */
function wordCells(pat,y){const parts=pat.split(''),n=parts.length,g=px(8),w=Math.min(px(58),(A.W-30-g*(n-1))/n),x0=A.W/2-(n*w+g*(n-1))/2;return parts.map((ch,j)=>({ch,x:x0+j*(w+g),y,w,h:px(62)}))}
function teamKeys(){const n=TEAMS.length,g=8,w=Math.min(px(62),(A.W-20-g*(n-1))/n),x0=A.W/2-(n*w+g*(n-1))/2;return TEAMS.map((t,j)=>({t,j,x:x0+j*(w+g),y:A.H*.74,w,h:px(58)}))}
function drawGap(){const s=S.gap;ground();if(finished('gap')){head('All 5 words made',1);GAP.forEach((q,m)=>write(`${q[3]}: ${q[2]}`,A.W/2,A.H*(.24+m*.15),22,800,A.col.tx));return}
 const q=GAP[s.i];head(`Word ${s.i+1} of 5: drag the sound into the gap`);note(q[0],A.H*.19);
 wordCells(q[1],A.H*.36).forEach(r=>r.ch==='*'?rect(r,s.tried||'?',{dash:1,bg:s.tried?'#fee2e2':'#f5f5f4',rim:s.tried?BAD:null,ink:s.tried?BAD:'#57534e'}):rect(r,r.ch));
 teamKeys().forEach(b=>{const d=held&&held.j===b.j;rect(d?{...b,x:held.x-b.w/2,y:held.y-b.h/2}:b,b.t,{bg:TEAMBG,ink:TEAMINK,rim:d?HOLD:TEAMINK,n:24})})}
function fill(t){const s=S.gap;if(finished('gap'))return;const [,pat,ok,word]=GAP[s.i];
 if(t!==ok){s.tried=t;A.sound.miss();const made=pat.replace('*',t);return tell(REAL[made]?REAL[made]+` ${word} needs ${ok}.`:`${made} does not match the clue. Read it again: ${word} needs ${ok}.`)}
 s.i++;s.tried=null;A.sound.pop();tell(`${pat.replace('*',ok)}: ${ok} makes one sound.`+(finished('gap')?' All 5 made.':''))}
/* ---- step 5: sound-alikes ---- */
const pairOrder=i=>i%2?[ALIKE[i][2],ALIKE[i][1]]:[ALIKE[i][1],ALIKE[i][2]];
function pairKeys(){const w=Math.min(px(140),(A.W-40)/2);return[0,1].map(j=>({j,x:A.W/2+(j?10:-w-10),y:A.H*.62,w,h:px(60)}))}
function drawAlike(){const s=S.alike;ground();if(finished('alike')){head('All 4 sentences done',1);ALIKE.forEach((q,m)=>note(q[0].replace('___',q[1]),A.H*(.22+m*.18)));return}
 const q=ALIKE[s.i];head(`Sentence ${s.i+1} of 4: they sound the same`);note(q[0],A.H*.3);
 pairOrder(s.i).forEach((v,j)=>rect(pairKeys()[j],v,{rim:s.miss===v?BAD:null,n:26}))}
function choose(v){const s=S.alike;if(finished('alike'))return;const [t,ok,other,means]=ALIKE[s.i];
 if(v!==ok){s.miss=v;A.sound.miss();return tell(`${other} sounds the same, but ${means} ${t.replace('___',ok)}`)}
 s.i++;s.miss=null;A.sound.pop();tell(t.replace('___',ok)+(finished('alike')?' All 4 done.':''))}
function draw(){const k=now();if(k==='quiz'){ground();head('Challenge',1);write('cow · snow · blue · saw · my · happy',A.W/2,A.H*.5,18,800,A.col.tx);return}
 if(k==='gap')drawGap();else if(k==='alike')drawAlike();else drawSort(k,k==='ow'?OWH:k==='team'?TEAMH:YH,LIST[k].length);A.fx.draw(G)}
const sortN=()=>({ow:2,team:3,y:2})[now()];
function down(p){const k=now();if(STEPS.indexOf(k)>4||finished(k))return false;
 if(sortN()){if(hit(p,cardAt())){held={x:p.x,y:p.y};return true}const b=houses(sortN()).find(r=>hit(p,r));if(b)sortTo(k,b.j);return false}
 if(k==='gap'){const b=teamKeys().find(r=>hit(p,r));if(b){held={j:b.j,x:p.x,y:p.y};return true}return false}
 const b=pairKeys().find(r=>hit(p,r));if(b)choose(pairOrder(S.alike.i)[b.j]);return false}
function move(p){if(held){held.x=p.x;held.y=p.y;A.redraw()}}
function up(p){const d=held;if(!d)return;held=null;const k=now();
 if(sortN()){const b=houses(sortN()).find(r=>hit(p,r));if(b)sortTo(k,b.j);else A.redraw();return}
 if(k==='gap'){const gap=wordCells(GAP[S.gap.i][1],A.H*.36).find(r=>r.ch==='*');if(hit(p,gap,24)||hit(p,teamKeys()[d.j]))fill(TEAMS[d.j]);else A.redraw()}}
function reset(){ver++;held=null;for(const k in S)delete S[k];STEPS.slice(0,5).forEach(k=>S[k]={i:0});S.check=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function open(i,first,isDone,msg){reset();tell(first);S.check=()=>{if(A.step===i&&isDone()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,moves,gap){steps[i].go();const me=ver;moves.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},gap*(j+1)))}
function buttons(){if(!keys)return;keys.innerHTML='';const k=now(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(sortN()&&!finished(k)){const w=LIST[k][S[k].i][0];(k==='ow'?OWH:k==='team'?TEAMH:YH).forEach((h,j)=>add(h,()=>sortTo(k,j),`${w}: ${h}`))}
 if(k==='gap'&&!finished('gap'))TEAMS.forEach(t=>add(t,()=>fill(t),`Put ${t} in the gap`));
 if(k==='alike'&&!finished('alike'))pairOrder(S.alike.i).forEach(v=>add(v,()=>choose(v),`Fill the gap with ${v}`))}
const steps=[
{h:'ow says two sounds',p:'ow can say the sound in cow or the sound in snow. Say the word both ways. Pick the one that is a real word.',
predict:{q:'Does ow say the same sound in cow and in snow?',opts:['Yes, the same','No, two sounds'],ans:1},task:'Sort all 8 ow words',
show:()=>play(0,OW.map(x=>()=>sortTo('ow',x[1])),420),
go:()=>open(0,'Word: cow. Drag it to a house, or use the buttons.',()=>finished('ow'),'ow has two sounds. Try both and listen for a real word.')},
{h:'Two spellings, one sound',p:'Some sounds have two spellings. ou and ow can say the sound in cow. ew and ue say the sound in blue. aw and au say the sound in saw.',
predict:{q:'cloud has ou and cow has ow. Do they have the same sound?',opts:['No, different','Yes, the same'],ans:1},task:'Sort all 9 words',
show:()=>play(1,TEAM.map(x=>()=>sortTo('team',x[1])),380),
go:()=>open(1,'Word: cloud. Houses: ou ow as in cow, ew ue as in blue, aw au as in saw.',()=>finished('team'),'Different letters can make the same sound.')},
{h:'Fill the gap',p:'Read the clue. Drag the two letters that make the vowel sound into the gap.',task:'Make all 5 words',
show:()=>play(2,GAP.map(q=>()=>fill(q[2])),650),
go:()=>open(2,'It says moo. c, gap. Choose ow, ou, ew, aw or ie.',()=>finished('gap'),'Two letters, one sound: c-ow, fl-ew, cl-aw, cl-ou-d, p-ie.')},
{h:'y at the end',p:'Clap the word. If it has one beat, y at the end says igh, like my. If it has two beats, y says ee, like happy.',
predict:{q:'Does the y in my sound like the y in happy?',opts:['Yes, the same','No, it is different'],ans:1},task:'Sort all 8 y words',
show:()=>play(3,YS.map(x=>()=>sortTo('y',x[1])),420),
go:()=>open(3,'Word: happy. Houses: y says ee, y says igh.',()=>finished('y'),'One beat: y says igh. Two beats: y says ee.')},
{h:'Sound the same',p:'blue and blew sound the same, but they mean different things. Read the sentence. Pick the word that makes sense.',
predict:{q:'blue and blew sound the same. Do they mean the same?',opts:['Yes','No'],ans:1},task:'Finish all 4 sentences',
show:()=>play(4,ALIKE.map(q=>()=>choose(q[1])),650),
go:()=>open(4,'The wind ___ my hat off. Choices: blew or blue.',()=>finished('alike'),'Same sound, different spelling, different meaning.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which word has ow like in snow?',a:'grow',o:[['town','cowsound'],['grew','ewsound']]},
{q:'Which word has the same sound as cow?',a:'shout',o:[['show','snowsound'],['shoot','oosound']]},
{q:'Which word has the same sound as blue?',a:'grew',o:[['grow','snowsound'],['claw','awsound']]},
{q:'In which word does y say igh?',a:'sky',o:[['funny','twobeats'],['yes','ystart']]},
{q:'A cat has sharp ___. Which spelling is right?',a:'claws',o:[['clows','owclaw'],['clewz','ewclaw']]},
{q:'Grandad ___ out the candles.',a:'blew',o:[['blue','colour'],['blow','past']]}];
function why(t){let m='Say the word out loud and listen to the vowel sound in the middle.';
 switch(t){case 'cowsound':m='town has ow like in cow. Say snow: grow has that sound.';break;
 case 'snowsound':m='Here ow says the sound in snow, not the sound in cow.';break;
 case 'ewsound':m='grew has ew, the sound in blue, not the sound in snow.';break;
 case 'oosound':m='shoot has oo, like moon. cow and shout share the ow sound.';break;
 case 'awsound':m='claw has aw, the sound in saw. blue and grew share a sound.';break;
 case 'twobeats':m='funny has two beats, so y says ee. sky has one beat, so y says igh.';break;
 case 'ystart':m='At the start of yes, y is not a vowel. It says y as in yo-yo.';break;
 case 'owclaw':m='ow does not make the sound in claw. claw is spelt with aw, like saw.';break;
 case 'ewclaw':m='ew says the sound in blue. claw has aw, and claws ends in s.';break;
 case 'colour':m='blue is a colour. The wind or Grandad blew: it is the past of blow.';break;
 case 'past':m='It already happened, so use blew, not blow.';break}
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.08,draw,onStep:B=>{chal.hidden=B.step!==5;keys.hidden=B.step===5;buttons()},
 init:B=>{A=B;G=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Vowel sound buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
