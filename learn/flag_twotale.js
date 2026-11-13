/* Flagship – comparing characters across stories (ages 5–9; Common Core RL.K.9, RL.1.9 and RL.2.9: compare and contrast
   the adventures and experiences of characters in stories; NC England Year 1–2 reading comprehension: discuss and link
   what they read). Two short stories sit side by side. Sort facts into Only Mo / Both / Only Pip, tap the sentence in each
   story that proves a "both" claim, judge same or different, join compare sentences with both, but and too, then catch
   a claim that says "both" when only one story fits. */
(()=>{
const MO=['Mo had a red kite.','The wind took it up into a tree.','Mo felt sad.','His big sister got a ladder.','Mo got his kite back and gave her a hug.'];
const PIP=['Pip the duck had a yellow hat.','She was proud of it.','The wind blew it into the pond.','Pip felt cross.','Frog swam out and got it.','Pip put it on and thanked Frog.'];
/* fact, where it goes (0 only Mo, 1 both, 2 only Pip), Mo line or -1, Pip line or -1 */
const VENN=[['The wind takes a thing',1,1,2],['It gets stuck up a tree',0,1,-1],['A duck',2,-1,0],['Gets help',1,3,4],
 ['Feels sad',0,2,-1],['Gets the thing back',1,4,5],['Helper is a frog',2,-1,4],['Helper is a sister',0,3,-1]];
const VH=['Only Mo','Both','Only Pip'];
/* claim, Mo proof line, Pip proof line */
const PROOF=[['Both lose a thing in the wind.',1,2],['Both feel bad about it.',2,3],['Both get help.',3,4],['Both are kind at the end.',4,5]];
/* question, Mo answer, Pip answer, same? */
const SAME=[['What do they lose?','a kite','a hat',0],['What takes it?','the wind','the wind',1],['How do they feel?','sad','cross',0],
 ['Who helps?','his sister','Frog',0],['Do they get it back?','yes','yes',1]];
/* sentence with ___, right word */
const JOIN=[['___ Mo and Pip lose something in the wind.','Both'],['Mo feels sad, ___ Pip feels cross.','but'],
 ['Mo gets his kite back. Pip gets her hat back ___.','too'],['Mo is helped by his sister, ___ Pip is helped by Frog.','but']];
const LINK=['Both','but','too'];
/* claim, true?, why */
const TRUTH=[['Both stories are about a kite.',0,'Only Mo has a kite. Pip has a hat.'],['Both helpers are animals.',0,'Frog is an animal, but Mo\'s sister is a person.'],
 ['Both characters lose something in the wind.',1,'Mo: the wind took it. Pip: the wind blew it.'],['Both things end up in water.',0,'Only Pip\'s hat goes in the pond. The kite goes up a tree.'],
 ['Both characters say thank you or give a hug.',1,'Mo gives a hug. Pip says thank you.']];
VIS.reg('flagtwotale',c=>{let A,X,keys,tales,quizBox,qi=-1,ver=0,grab=null;const T={};
const INK='#172554',PAGE='#ffffff',EDGE='#64748b',GOOD='#15803d',WRONG='#b91c1c',GRAB='#1d4ed8',MOBG='#fee2e2',PIPBG='#fef9c3',BOTHBG='#dcfce7',LINKBG='#e0e7ff',LINKINK='#3730a3';
const k=n=>Math.round(n*(A.narrow?1:1.1)),typeface=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
const ORDER=['venn','proof','same','join','truth','quiz'],stage=()=>ORDER[A.step],DATA={venn:VENN,proof:PROOF,same:SAME,join:JOIN,truth:TRUTH},over=n=>T[n].at>=DATA[n].length;
const inside=(p,r,m=0)=>!!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
function backdrop(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function lines(t,w){const out=[''];t.split(' ').forEach(s=>{const n=out[out.length-1]?out[out.length-1]+' '+s:s;if(X.measureText(n).width>w&&out[out.length-1])out.push(s);else out[out.length-1]=n});return out}
function panel(r,t,o){o=o||{};X.fillStyle=o.bg||PAGE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?3.5:1.5;X.strokeStyle=o.edge||EDGE;if(o.dash)X.setLineDash([6,5]);X.stroke();X.setLineDash([]);
 if(t==null)return;X.fillStyle=o.ink||INK;X.font=typeface(o.n||16,o.w);X.textAlign='center';X.textBaseline='middle';const L=lines(t,r.w-12),lh=k(o.n||16)*1.2;L.forEach((s,i)=>X.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh))}
function topline(t,won){X.font=typeface(15,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=k(15)+16;panel({x:A.W/2-w/2,y:A.H*.025,w,h,},t,{bg:won?BOTHBG:PAGE,edge:won?GOOD:null,n:15,w:800,r:h/2})}
/* ---- step 1: three boxes ---- */
function bins(){const g=8,w=(A.W-g*4)/3;return VH.map((t,j)=>({x:g+j*(w+g),y:A.H*.42,w,h:A.H*.55,j}))}
const fact=()=>{const w=Math.min(A.W-60,k(240));return{x:A.W/2-w/2,y:A.H*.15,w,h:k(56)}};
function drawVenn(){const s=T.venn;backdrop();topline(over('venn')?'All 8 facts sorted':`Fact ${s.at+1} of 8: Mo, Pip or both?`,over('venn'));
 bins().forEach(b=>{panel(b,null,{bg:[MOBG,BOTHBG,PIPBG][b.j],edge:s.miss===b.j?WRONG:null});X.fillStyle=INK;X.font=typeface(15,800);X.textAlign='center';X.textBaseline='top';X.fillText(VH[b.j],b.x+b.w/2,b.y+8,b.w-6);
  X.font=typeface(12,600);let y=b.y+k(30);VENN.slice(0,s.at).filter(f=>f[1]===b.j).forEach(f=>{const L=lines(f[0],b.w-14),h=L.length*k(14)+6;X.fillStyle=PAGE;A.paint.rrect(b.x+4,y,b.w-8,h,6);X.fill();X.fillStyle=INK;L.forEach((l,i)=>X.fillText(l,b.x+b.w/2,y+3+i*k(14),b.w-10));y+=h+4})});
 if(!over('venn')){const r=fact(),g=grab;panel(g?{...r,x:g.x-r.w/2,y:g.y-r.h/2}:r,VENN[s.at][0],{edge:g?GRAB:'#334155',n:18})}}
function place(j){const s=T.venn;if(over('venn'))return;const [f,ok,m,p]=VENN[s.at];
 if(j!==ok){s.miss=j;A.sound.miss();const mo=m>=0?`Mo: "${MO[m]}"`:'Not in Mo\'s story.',pp=p>=0?`Pip: "${PIP[p]}"`:'Not in Pip\'s story.';
  return report(`${f}? ${mo} ${pp} So it goes in ${VH[ok]}.`)}
 s.at++;s.miss=null;A.sound.pop();report(`${f}: ${VH[ok]}.`+(over('venn')?' All 8 sorted.':''))}
/* ---- step 2: tap the proof in each story ---- */
function storyCards(){const g=8,w=(A.W-g*3)/2,top=A.H*.25,cols=[MO,PIP];X.font=typeface(13,600);
 return cols.map((st,side)=>{let y=top+k(22);const hgt=(A.H-top-k(22)-6)/PIP.length-5;return st.map((t,i)=>{const r={x:g+side*(w+g),y,w,h:Math.min(hgt,k(56)),side,i,t};y+=r.h+5;return r})})}
function drawProof(){const s=T.proof;backdrop();if(over('proof')){topline('All 4 claims proved',1);PROOF.forEach((q,i)=>panel({x:10,y:A.H*(.15+i*.2),w:A.W-20,h:A.H*.17},`${q[0]} Mo: ${MO[q[1]]} Pip: ${PIP[q[2]]}`,{bg:BOTHBG,n:13}));return}
 const q=PROOF[s.at];topline(`Claim ${s.at+1} of 4: find the proof in both`);panel({x:10,y:A.H*.12,w:A.W-20,h:A.H*.1},q[0],{bg:BOTHBG,n:17,w:800});
 X.fillStyle=A.col.tx;X.font=typeface(14,800);X.textAlign='center';X.textBaseline='middle';const C=storyCards();['Mo','Pip'][0]&&['Mo','Pip'].forEach((n,side)=>X.fillText(n,C[side][0].x+C[side][0].w/2,A.H*.25+k(10)));
 C.flat().forEach(r=>{const got=s.got[r.side],bad=s.bad&&s.bad[0]===r.side&&s.bad[1]===r.i;panel(r,r.t,{bg:got&&q[r.side+1]===r.i?BOTHBG:r.side?PIPBG:MOBG,edge:bad?WRONG:got&&q[r.side+1]===r.i?GOOD:null,n:13,w:600})})}
function tapLine(side,i){const s=T.proof;if(over('proof'))return;const q=PROOF[s.at],who=side?'Pip':'Mo',st=side?PIP:MO;
 if(q[side+1]!==i){s.bad=[side,i];A.sound.miss();return report(`"${st[i]}" does not show that. Look for the line where ${who} ${['loses it','feels bad','gets help','is kind'][s.at]}.`)}
 s.got[side]=1;s.bad=null;A.sound.pop();if(s.got[0]&&s.got[1]){s.at++;s.got=[0,0];return report(`Proved in both stories: Mo "${MO[q[1]]}" Pip "${PIP[q[2]]}"`+(over('proof')?' All 4 proved.':''))}
 report(`${who}: "${st[i]}" Now find it in ${side?'Mo':'Pip'}'s story.`)}
/* ---- step 3: same or different ---- */
function sdKeys(){const w=Math.min(k(150),(A.W-40)/2);return['Same','Different'].map((t,j)=>({t,j,x:A.W/2+(j?10:-w-10),y:A.H*.72,w,h:k(56)}))}
function drawSame(){const s=T.same;backdrop();if(over('same')){topline('All 5 compared',1);SAME.forEach((q,i)=>panel({x:10,y:A.H*(.14+i*.17),w:A.W-20,h:A.H*.14},`${q[0]} Mo: ${q[1]}. Pip: ${q[2]}. ${q[3]?'Same':'Different'}.`,{bg:q[3]?BOTHBG:PAGE,n:14}));return}
 const q=SAME[s.at],w=(A.W-30)/2;topline(`Question ${s.at+1} of 5: same or different?`);panel({x:10,y:A.H*.13,w:A.W-20,h:A.H*.12},q[0],{n:18,w:800});
 panel({x:10,y:A.H*.32,w,h:A.H*.3},`Mo: ${q[1]}`,{bg:MOBG,n:20});panel({x:20+w,y:A.H*.32,w,h:A.H*.3},`Pip: ${q[2]}`,{bg:PIPBG,n:20});
 sdKeys().forEach(b=>panel(b,b.t,{edge:s.miss===b.j?WRONG:null,n:20,w:800}))}
function judge(j){const s=T.same;if(over('same'))return;const [qq,m,p,same]=SAME[s.at],ok=same?0:1;
 if(j!==ok){s.miss=j;A.sound.miss();return report(same?`Mo: ${m}. Pip: ${p}. The answers match, so it is the same.`:qq==='How do they feel?'?'Sad and cross are both bad feelings, but they are not the same feeling. Different.':`Mo: ${m}. Pip: ${p}. Those are not the same, so it is different.`)}
 s.at++;s.miss=null;A.sound.pop();report(`${qq} ${same?'Same':'Different'}: ${m} and ${p}.`+(over('same')?' All 5 done.':''))}
/* ---- step 4: join with both, but, too ---- */
function linkKeys(){const g=10,w=Math.min(k(100),(A.W-40)/3);return LINK.map((t,j)=>({t,j,x:A.W/2-(3*w+2*g)/2+j*(w+g),y:A.H*.7,w,h:k(56)}))}
function drawJoin(){const s=T.join;backdrop();if(over('join')){topline('All 4 sentences joined',1);JOIN.forEach((q,i)=>panel({x:10,y:A.H*(.15+i*.2),w:A.W-20,h:A.H*.17},q[0].replace('___',q[1]),{bg:BOTHBG,n:15}));return}
 const q=JOIN[s.at];topline(`Sentence ${s.at+1} of 4: which joining word?`);panel({x:10,y:A.H*.18,w:A.W-20,h:A.H*.3},q[0].replace('___',s.tried?`[${s.tried}?]`:'____'),{n:19,edge:s.tried?WRONG:null});
 linkKeys().forEach(b=>{const g=grab&&grab.j===b.j;panel(g?{...b,x:grab.x-b.w/2,y:grab.y-b.h/2}:b,b.t,{bg:LINKBG,ink:LINKINK,edge:g?GRAB:LINKINK,n:20,w:800})})}
function join(t){const s=T.join;if(over('join'))return;const [sen,ok]=JOIN[s.at];
 if(t!==ok){s.tried=t;A.sound.miss();return report(t==='Both'?'Both goes at the start, before two names that share something.':t==='too'?'too goes at the end, after the second thing that is the same.':'but shows a difference. These two things are the same, not different.')}
 s.at++;s.tried=null;A.sound.pop();report(sen.replace('___',ok)+(over('join')?' All 4 joined.':''))}
/* ---- step 5: true or not? ---- */
function tfKeys(){const w=Math.min(k(150),(A.W-40)/2);return['True','Not true'].map((t,j)=>({t,j,x:A.W/2+(j?10:-w-10),y:A.H*.68,w,h:k(56)}))}
function drawTruth(){const s=T.truth;backdrop();if(over('truth')){topline('All 5 checked',1);TRUTH.forEach((q,i)=>panel({x:10,y:A.H*(.14+i*.17),w:A.W-20,h:A.H*.14},`${q[1]?'True':'Not true'}: ${q[0]}`,{bg:q[1]?BOTHBG:MOBG,n:14}));return}
 topline(`Claim ${s.at+1} of 5: is it true for both?`);panel({x:10,y:A.H*.18,w:A.W-20,h:A.H*.32},TRUTH[s.at][0],{n:20,w:800});tfKeys().forEach(b=>panel(b,b.t,{edge:s.miss===b.j?WRONG:null,n:19,w:800}))}
function check(j){const s=T.truth;if(over('truth'))return;const [cl,yes,why]=TRUTH[s.at],ok=yes?0:1;
 if(j!==ok){s.miss=j;A.sound.miss();return report(yes?`Check both stories. ${why} So it is true for both.`:`Both means in each story. ${why}`)}
 s.at++;s.miss=null;A.sound.pop();report(`${yes?'True':'Not true'}. ${why}`+(over('truth')?' All 5 checked.':''))}
function draw(){const n=stage();if(n==='quiz'){backdrop();topline('Challenge',1);panel({x:20,y:A.H*.4,w:A.W-40,h:A.H*.2},'Mo and the kite · Pip and the hat',{n:17});return}
 ({venn:drawVenn,proof:drawProof,same:drawSame,join:drawJoin,truth:drawTruth})[n]();A.fx.draw(X)}
function down(p){const n=stage();if(n==='quiz'||over(n))return false;
 if(n==='venn'){if(inside(p,fact())){grab={x:p.x,y:p.y};return true}const b=bins().find(r=>inside(p,r));if(b)place(b.j);return false}
 if(n==='proof'){const r=storyCards().flat().find(z=>inside(p,z));if(r)tapLine(r.side,r.i);return false}
 if(n==='same'){const b=sdKeys().find(r=>inside(p,r));if(b)judge(b.j);return false}
 if(n==='join'){const b=linkKeys().find(r=>inside(p,r));if(b){grab={j:b.j,x:p.x,y:p.y};return true}return false}
 const b=tfKeys().find(r=>inside(p,r));if(b)check(b.j);return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){const g=grab;if(!g)return;grab=null;const n=stage();
 if(n==='venn'){const b=bins().find(r=>inside(p,r));if(b)place(b.j);else A.redraw();return}
 if(n==='join'){if(p.y<A.H*.55||inside(p,linkKeys()[g.j]))join(LINK[g.j]);else A.redraw()}}
function wipe(){ver++;grab=null;for(const n in T)delete T[n];ORDER.slice(0,5).forEach(n=>T[n]={at:0});T.proof.got=[0,0];T.after=()=>{}}
function report(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();T.after()}
function enter(i,first,ready,msg){wipe();report(first);T.after=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function controls(){if(!keys)return;keys.innerHTML='';const n=stage(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 tales.style.display=n==='proof'?'none':'grid';if(n==='quiz'||over(n))return;
 if(n==='venn')VH.forEach((t,j)=>add(t,()=>place(j),`${VENN[T.venn.at][0]}: ${t}`));
 if(n==='proof'){const q=PROOF[T.proof.at];[[MO,0,'Mo'],[PIP,1,'Pip']].forEach(([st,side,who])=>{if(!T.proof.got[side])st.forEach((t,i)=>add(`${who} ${i+1}`,()=>tapLine(side,i),`${who}, line ${i+1}: ${t}`))})}
 if(n==='same')['Same','Different'].forEach((t,j)=>add(t,()=>judge(j),`${SAME[T.same.at][0]} ${t}`));
 if(n==='join')LINK.forEach(t=>add(t,()=>join(t),`Fill the gap with ${t}`));
 if(n==='truth')['True','Not true'].forEach((t,j)=>add(t,()=>check(j),`${TRUTH[T.truth.at][0]} ${t}`))}
const steps=[
{h:'Same or different?',p:'Read both stories. Some things happen in both. Some happen in only one. Drag each fact to Only Mo, Both or Only Pip.',
predict:{q:'Mo is a boy and Pip is a duck. Can their stories still be alike?',opts:['No, too different','Yes, they can'],ans:1},task:'Sort all 8 facts',
show:()=>auto(0,VENN.map(f=>()=>place(f[1])),420),
go:()=>enter(0,'Fact: The wind takes a thing. Drag it to a box, or use the buttons.',()=>over('venn'),'A boy and a duck can have stories that are alike.')},
{h:'Find the proof',p:'A claim about both stories needs proof from both. Tap the line in Mo\'s story and the line in Pip\'s story that show it.',
predict:{q:'Someone says only Mo gets help. Are they right?',opts:['Yes, only Mo','No, both get help'],ans:1},task:'Prove all 4 claims',
show:()=>auto(1,PROOF.flatMap(q=>[()=>tapLine(0,q[1]),()=>tapLine(1,q[2])]),450),
go:()=>enter(1,'Claim: Both lose a thing in the wind. Tap the proof in each story.',()=>over('proof'),'Check both stories before you say both.')},
{h:'Same or different',p:'Ask the same question about both stories. Look at the two answers. Are they the same or different?',
predict:{q:'Mo feels sad. Pip feels cross. Is that the same feeling?',opts:['Yes, both feel bad','No, different feelings'],ans:1},task:'Compare all 5',
show:()=>auto(2,SAME.map(q=>()=>judge(q[3]?0:1)),550),
go:()=>enter(2,'What do they lose? Mo: a kite. Pip: a hat.',()=>over('same'),'Things can be alike in one way and different in another.')},
{h:'Both, but, too',p:'Both and too show things that are the same. But shows a difference. Drag the right word into the gap.',
predict:{q:'Which word shows a difference?',opts:['both','but'],ans:1},task:'Join all 4 sentences',
show:()=>auto(3,JOIN.map(q=>()=>join(q[1])),650),
go:()=>enter(3,'___ Mo and Pip lose something in the wind. Choices: Both, but, too.',()=>over('join'),'Both and too: the same. But: different.')},
{h:'True for both?',p:'Both means it is true in each story. Check each claim against both stories.',task:'Check all 5 claims',
show:()=>auto(4,TRUTH.map(q=>()=>check(q[1]?0:1)),600),
go:()=>enter(4,'Both stories are about a kite. True or not true?',()=>over('truth'),'Say both only when each story shows it.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.after()});
const QS=[
{q:'What is the same in both stories?',a:'The wind takes a thing.',o:[['They both lose a kite.','onlymo'],['They both have a sister.','onlymo2']]},
{q:'Which sentence shows a difference?',a:'Mo feels sad, but Pip feels cross.',o:[['Both feel bad.','samebad'],['Mo and Pip both get help.','sameword']]},
{q:'Who helps Pip?',a:'Frog',o:[['Mo\'s sister','mixed'],['Mo','mixed']]},
{q:'How are the endings alike?',a:'Both get the thing back.',o:[['Both get wet.','onlypip'],['Both go up a tree.','onlymo3']]},
{q:'Is this true? Both helpers are animals.',a:'No, the sister is a person.',o:[['Yes, both are animals.','animals'],['Yes, there is a frog.','oneproof']]},
{q:'Finish it: Mo gets his kite back. Pip gets her hat back ___.',a:'too',o:[['but','butsame'],['both','bothplace']]}];
function reason(t){let m='Go back to the two stories and check each one.';
 switch(t){case 'onlymo':m='Only Mo has a kite. Pip has a hat.';break;
 case 'onlymo2':m='Only Mo has a sister. Pip is helped by Frog.';break;
 case 'samebad':m='Both feel bad shows a way they are alike, not a difference.';break;
 case 'sameword':m='Both shows something the same. But shows a difference.';break;
 case 'mixed':m='That is from Mo\'s story. In Pip\'s story, Frog swam out and got the hat.';break;
 case 'onlypip':m='Only the hat went in the pond. The kite went up a tree.';break;
 case 'onlymo3':m='Only the kite went up a tree. Pip\'s hat went in the pond.';break;
 case 'animals':m='Frog is an animal, but Mo\'s sister is a person.';break;
 case 'oneproof':m='One frog is proof for Pip only. Both needs proof from each story.';break;
 case 'butsame':m='but shows a difference. Here both get their thing back, so use too.';break;
 case 'bothplace':m='both goes before two names. At the end of the sentence, use too.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+reason(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':reason(t))}
function storyBlock(){const d=c.el('div',{class:'fl-tales',style:'display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:8px 0;font-size:1.05rem;line-height:1.45'},A.below);
 [['Mo and the Kite',MO],['Pip and the Hat',PIP]].forEach(([h,st])=>{const s=c.el('section',{'aria-label':h},d);c.el('h5',{style:'margin:0 0 4px;font-size:1.05rem'},s,h);const o=c.el('ol',{style:'margin:0;padding-left:1.4em'},s);st.forEach(t=>c.el('li',{},o,t))});return d}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:B=>{quizBox.hidden=B.step!==5;keys.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;c.fig.classList.add('young');tales=storyBlock();const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story compare buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
