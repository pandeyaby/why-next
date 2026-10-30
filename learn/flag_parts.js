/* Flagship – structural terminology (ages 8–9): name the part of a text (stanza, chapter, scene, act) from how the page
   looks; tap each stanza of a poem and count stanzas, not lines; order the parts of a play, a novel and a poem from
   biggest to smallest; put four chapters in order using the clues that point back to earlier chapters; and say how each
   stanza of a poem builds on the one before. Every canvas tap has a button twin. */
(()=>{
const TERMS=['Stanza','Chapter','Scene','Act'];
const PAGES=[{kind:'poem',head:'',body:['The sea lies still beneath the sun,','the gulls drift slowly, one by one.','','Then clouds roll in, the wind grows loud,','the waves rise up, grey, wild and proud.'],mark:[0,1],ans:0},
 {kind:'novel',head:'Chapter 3: The Gate',body:['Still holding the key, Ama pushed back','the ivy. Behind it was a tiny gate,','green with moss and locked tight.'],mark:[-1],ans:1},
 {kind:'play',head:'SCENE 2. Gran’s kitchen.',body:['AMA: Gran, what is this key for?','GRAN: (laughing) Ah. That is a long story.','(She puts the kettle on.)'],mark:[-1],ans:2},
 {kind:'play',head:'ACT 2',body:['Scene 1. The garden, at night.','Scene 2. The shed, next morning.','Scene 3. The secret garden.'],mark:[-1],ans:3}];
const WRONG={0:'Stanzas are in poems. ',1:'Chapters are big parts of a novel or story book. ',2:'Scenes are parts of a play. ',3:'An act is a big part of a play that holds several scenes. '};
const POEMS=[{t:'The Sea',st:[3,3,3]},{t:'Night Fox',st:[4,4]}];
const STACKS=[{t:'a play',parts:['Play','Act','Scene','Line']},{t:'a novel',parts:['Novel','Chapter','Paragraph','Sentence']},{t:'a poem',parts:['Poem','Stanza','Line']}];
const CHS=[['Ama finds a rusty key under a loose stone in Gran’s shed.',''],
 ['Ama tries the key in every door of the house. None of them opens.','This chapter needs the key. Which chapter shows where the key came from?'],
 ['Still holding the key, Ama spots a tiny locked gate behind the ivy.','"Still holding the key" and no door has opened yet. What must come before this?'],
 ['The gate creaks open onto a garden nobody has seen for years.','This chapter opens "the gate". Which chapter first shows us the gate?']];
const SHUF=[2,0,3,1];
const SEA=['The sea lies still beneath the sun, / the gulls drift slowly, one by one, / the little boat sleeps on the sand.',
 'Then clouds roll in, the wind grows loud, / the waves rise up, grey, wild and proud, / the little boat is pulled from land.',
 'Next day the sea lies still once more, / but empty is the sandy shore: / no little boat. Just sea and sand.'];
const BUILD=[{q:'How does stanza 2 build on stanza 1?',o:[['It changes the mood: the calm sea turns into a storm.','ok'],['It says the same thing again in new words.','same'],['It starts a new poem about something else.','new']]},
 {q:'How does stanza 3 build on stanzas 1 and 2?',o:[['It goes back to the still sea of stanza 1, but the boat from stanza 2 is gone.','ok'],['It is only about the storm in stanza 2.','storm'],['It has no link to the earlier stanzas.','new']]}];
VIS.reg('flagparts',c=>{let A,pad,quiz,qi=-1,tok=0;
const fresh0=()=>({want:()=>{},r:0,won:0,bad:-1,marked:[],order:[],picked:-1}),S=fresh0();
const at=()=>['name','count','stack','chapters','build','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?.95:1.08)),RM=()=>A.reduced();
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function put(g,t,x,y,n,o){o=o||{};g.font=`${o.wt||700} ${z(n)}px ${o.serif?'Georgia,serif':'system-ui,sans-serif'}`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.max||A.W-20)}
function flow(g,t,x,y,w,n,o){o=o||{};g.font=`${o.wt||600} ${z(n)}px system-ui,sans-serif`;const L=[];let cur='';t.split(' ').forEach(wd=>{const q=cur?cur+' '+wd:wd;if(g.measureText(q).width>w&&cur){L.push(cur);cur=wd}else cur=q});L.push(cur);
 const h=z(n)*1.28;L.forEach((s,i)=>put(g,s,x,y+(i-(L.length-1)/2)*h,n,{wt:o.wt||600,al:o.al,col:o.col}));return L.length*h}
function panel(g,x,y,w,h,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=warn?A.col.rd:col;g.lineWidth=warn?4:2.5;A.paint.rrect(x,y,w,h,12);g.stroke()}
function drawName(g){const{W,H}=A,C=A.col,pg=PAGES[S.r%PAGES.length];panel(g,12,H*.04,W-24,H*.56,C.mu,.08);let y=H*.04+z(22);
 if(pg.head){put(g,pg.head,24,y,14,{al:'left',wt:800});y+=z(26)}
 pg.body.forEach((l,i)=>{if(!l){y+=z(10);return}const hl=pg.kind==='poem'&&pg.mark.includes(i);if(hl){g.fillStyle=A.alpha(C.am,.3);g.fillRect(18,y-z(10),W-36,z(20))}
  put(g,l,24,y,12.5,{al:'left',wt:500,serif:pg.kind!=='play',col:pg.kind==='play'&&/^\(/.test(l)?C.mu:C.tx});y+=z(21)});
 put(g,pg.kind==='poem'?'What is the highlighted part called?':'What is this whole part called?',W/2,H*.66,13.5,{wt:800});
 const bw=(W-50)/4;TERMS.forEach((t,i)=>{const x=10+i*(bw+10);panel(g,x,H*.73,bw,H*.18,C.vi,.14,S.bad===i);put(g,t,x+bw/2,H*.82,14,{wt:800,max:bw-6})})}
function stanzaBoxes(){const{W,H}=A,p=POEMS[S.r%2],n=p.st.length,gap=z(10),lh=z(13),top=H*.12,out=[];let y=top;p.st.forEach((k,i)=>{out.push({x:20,y,w:W-40,h:k*lh+8});y+=k*lh+8+gap});return out}
function drawCount(g){const{W,H}=A,C=A.col,p=POEMS[S.r%2];put(g,p.t,W/2,H*.06,15,{wt:800,serif:1});
 stanzaBoxes().forEach((b,i)=>{const on=S.marked.includes(i);panel(g,b.x,b.y,b.w,b.h,on?C.gr:C.mu,on?.22:.06);
  for(let k=0;k<p.st[i];k++){g.fillStyle=A.alpha(C.tx,.55);g.fillRect(b.x+14,b.y+6+k*z(13)+z(5),(b.w-60)*(.6+.35*Math.abs(Math.sin(i*3+k*1.7))),3)}
  if(on)put(g,String(S.marked.indexOf(i)+1),b.x+b.w-18,b.y+b.h/2,16,{wt:800,col:C.gr})});
 const lines=p.st.reduce((a,b)=>a+b,0);put(g,`${lines} lines. Tap each stanza to number it.`,W/2,H*.8,12.5,{col:C.mu,wt:600});
 put(g,'Then tap the number of stanzas below.',W/2,H*.87,12.5,{col:C.mu,wt:600})}
const choicesCount=()=>{const p=POEMS[S.r%2],n=p.st.length,l=p.st.reduce((a,b)=>a+b,0);return[n,n+1,l].sort((a,b)=>a-b)};
function stackRects(){const{W,H}=A,s=STACKS[S.r%3],n=s.parts.length,cw=(W-20-(n-1)*8)/n;return SHUF.filter(i=>i<n).map((pi,k)=>({pi,x:10+k*(cw+8),y:H*.16,w:cw,h:H*.18}))}
function drawStack(g){const{W,H}=A,C=A.col,s=STACKS[S.r%3];put(g,`The parts of ${s.t}`,W/2,H*.07,15,{wt:800});
 stackRects().forEach(r=>{const used=S.order.includes(r.pi);panel(g,r.x,r.y,r.w,r.h,used?C.mu:C.ac,used?.05:.14,S.bad===r.pi);put(g,s.parts[r.pi],r.x+r.w/2,r.y+r.h/2,13,{wt:800,col:used?C.mu:C.tx,max:r.w-6})});
 put(g,'Biggest',W*.14,H*.44,12,{col:C.mu,wt:600});put(g,'Smallest',W*.86,H*.44,12,{col:C.mu,wt:600});
 S.order.forEach((pi,k)=>{const n=s.parts.length,w=(W-40)*(1-k/(n+1)),x=(W-w)/2,y=H*.5+k*H*.11;panel(g,x,y,w,H*.09,C.gr,.18);put(g,s.parts[pi],W/2,y+H*.045,13,{wt:800})})}
function chRects(){const{W,H}=A,ch=H*.17;return SHUF.map((ci,k)=>({ci,x:10,y:H*.04+k*(ch+6),w:W-20,h:ch}))}
function drawChapters(g){const{W,H}=A,C=A.col;chRects().forEach(r=>{const k=S.order.indexOf(r.ci);panel(g,r.x,r.y,r.w,r.h,k>=0?C.gr:C.ac,k>=0?.2:.1,S.bad===r.ci);
  put(g,k>=0?`Ch ${k+1}`:'?',r.x+28,r.y+r.h/2,15,{wt:800,col:k>=0?C.gr:C.mu});flow(g,CHS[r.ci][0],r.x+56,r.y+r.h/2,r.w-70,12,{al:'left'})});
 put(g,`Tap the chapters in story order (${S.order.length} of 4)`,W/2,H*.85,12.5,{col:C.mu,wt:600})}
function drawBuild(g){const{W,H}=A,C=A.col,cols=[C.cy,C.vi,C.cy],k=Math.min(S.r,1);let y=H*.04;
 SEA.forEach((s,i)=>{const hot=i===k+1,h=H*.2;panel(g,10,y,W-20,h,cols[i],hot?.22:.07);put(g,`Stanza ${i+1}`,22,y+z(12),11.5,{al:'left',wt:800,col:C.mu});
  flow(g,s.split(' / ').join(' '),W/2,y+h/2+z(6),W-44,11.5,{wt:hot?700:500});y+=h+6});
 put(g,BUILD[k].q,W/2,H*.73,13,{wt:800});put(g,'Pick an answer below.',W/2,H*.8,12,{col:C.mu,wt:600})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=at();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){panel(g,W*.3,H*.15,W*.4,H*.65,C.mu,.08);[0,1,2,3].forEach(i=>{g.fillStyle=A.alpha(C.tx,.4);g.fillRect(W*.34,H*(.25+i*.12),W*.32*(i%2?.7:1),4)});return}
 if(S.won>=need())return flow(g,wrapUp(),W/2,H/2,W-40,15,{wt:800}),A.fx.draw(g);
 ({name:drawName,count:drawCount,stack:drawStack,chapters:drawChapters,build:drawBuild})[v](g);A.fx.draw(g)}
const need=()=>({name:4,count:2,stack:3,chapters:1,build:2}[at()]||9);
function wrapUp(){return{name:'Poems have stanzas, novels have chapters, and plays have acts and scenes.',count:'Count the groups, not the lines. A stanza is a group of lines.',stack:'Big parts hold smaller parts: an act holds scenes, a chapter holds paragraphs.',chapters:'Each chapter builds on the ones before. The clues point back.',build:'Each stanza builds on the last: it changes the mood, then echoes the start.'}[at()]}
const slip=(t,i)=>{A.sound.miss();S.bad=i==null?-1:i;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},RM()?10:900);A.redraw()};
function score(t,done){S.won++;S.r++;A.sound.pop();S.marked=[];S.order=[];say(S.won<need()?t+' Next one.':t);pads();A.redraw();if(S.won>=need())S.want()}
function nameIt(i){if(at()!=='name'||S.won>=4)return;const pg=PAGES[S.r%PAGES.length];if(i==null)i=pg.ans;
 if(i!==pg.ans){const hint={poem:'This is a poem: short lines in groups with a gap between.',novel:'This is a novel: a numbered heading and full sentences in a paragraph.',play:pg.ans===3?'The heading says ACT 2, and it lists three scenes inside it.':'Character names, colons and stage directions in brackets mean a play. The heading says SCENE 2.'}[pg.kind];return slip(WRONG[i]+hint,i)}
 score(`Yes: ${TERMS[i].toLowerCase()}.`)}
function markSt(i){if(at()!=='count'||S.won>=2)return;if(i==null)i=[...Array(POEMS[S.r%2].st.length).keys()].find(k=>!S.marked.includes(k));if(i==null||S.marked.includes(i))return;S.marked.push(i);A.sound.tick();say(`Stanza ${S.marked.length}.`);A.redraw()}
function countIs(n){if(at()!=='count'||S.won>=2)return;const p=POEMS[S.r%2],ok=p.st.length,l=p.st.reduce((a,b)=>a+b,0);if(n==null)n=ok;
 if(n===l)return slip(`${l} is the number of lines. A stanza is a group of lines, so count the groups.`);
 if(n!==ok)return slip(`Count the groups between the gaps. Tap each stanza to number it.`);score(`Yes: ${ok} stanzas and ${l} lines.`)}
function stackTap(pi){if(at()!=='stack'||S.won>=3)return;const s=STACKS[S.r%3],nxt=S.order.length;if(pi==null)pi=nxt;if(S.order.includes(pi))return;
 if(pi!==nxt){const big=s.parts[nxt],me=s.parts[pi];return slip(`${me} is not next. The ${big.toLowerCase()} is bigger: it holds ${s.parts[nxt+1]?s.parts[nxt+1].toLowerCase()+'s':'the rest'}.`,pi)}
 S.order.push(pi);A.sound.tick();if(S.order.length>=s.parts.length)return score(s.parts.join(' → ')+'.');say(`${s.parts[pi]}. What is next in size?`);A.redraw()}
function chTap(ci){if(at()!=='chapters'||S.won>=1)return;const nxt=S.order.length;if(ci==null)ci=nxt;if(S.order.includes(ci))return;
 if(ci!==nxt)return slip(nxt===0?'Start with the chapter that needs nothing before it. Where does the key first appear?':CHS[ci][1],ci);
 S.order.push(ci);A.sound.tick();if(S.order.length>=4)return score('Key, doors, gate, garden: each chapter builds on the last.');say(`Chapter ${nxt+1}. Which comes next?`);A.redraw()}
const buildOpts=()=>{const b=BUILD[Math.min(S.r,1)].o,r=S.r%3;return b.slice(r).concat(b.slice(0,r))};
function buildPick(i){if(at()!=='build'||S.won>=2)return;const O=buildOpts();if(i==null)i=O.findIndex(o=>o[1]==='ok');const t=O[i][1];
 if(t!=='ok')return slip({same:'Look again: stanza 1 is calm and stanza 2 is a storm. The mood changes.',new:'The same sea and the same little boat come back, so the stanzas are linked.',storm:'Stanza 3 says "still once more": that points back to stanza 1, the calm sea.'}[t]);
 score(S.r===0?'Yes: calm turns to storm.':'Yes: the still sea returns, but the boat is gone.')}
function pads(){if(!pad)return;pad.innerHTML='';const v=at(),Bt=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=need())return;
 if(v==='name')TERMS.forEach((t,i)=>Bt(t,()=>nameIt(i)));
 if(v==='count'){POEMS[S.r%2].st.forEach((k,i)=>Bt(`Stanza block ${i+1}`,()=>markSt(i),`Number the stanza that is block ${i+1}`));choicesCount().forEach(n=>Bt(`${n} stanzas`,()=>countIs(n)))}
 if(v==='stack'){const P=STACKS[S.r%3].parts;SHUF.filter(i=>i<P.length).forEach(i=>Bt(P[i],()=>stackTap(i)))}
 if(v==='chapters')SHUF.forEach(i=>Bt(CHS[i][0].split(' ').slice(0,4).join(' ')+'…',()=>chTap(i),CHS[i][0]));
 if(v==='build')buildOpts().forEach(([t],i)=>Bt(t,()=>buildPick(i)))}
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=at(),{W,H}=A;if(S.won>=need())return false;
 if(v==='name'&&p.y>H*.72){const bw=(W-50)/4,i=Math.floor((p.x-10)/(bw+10));if(i>=0&&i<4)nameIt(i)}
 if(v==='count'){const i=stanzaBoxes().findIndex(b=>inR(p,b));if(i>=0)markSt(i)}
 if(v==='stack'){const r=stackRects().find(r=>inR(p,r));if(r)stackTap(r.pi)}
 if(v==='chapters'){const r=chRects().find(r=>inR(p,r));if(r)chTap(r.ci)}
 return false}
const tick=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fns,gap){const k=++tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},RM()?j*40+30:(j+1)*(gap||280)))}
const clean=()=>{tok++;Object.assign(S,fresh0())};
const steps=[
{h:'Name the part',p:'Writers split long texts into parts, and each kind of text has its own word. Look at the page and tap its name.',
 predict:{q:'A poem has groups of lines with a gap between them. What is one group called?',opts:['A paragraph','A stanza'],ans:1},task:'Name 4 parts correctly',
 show:()=>{steps[0].go();auto([0,1,2,3].map(()=>()=>nameIt()))},go:()=>{clean();say('What is this part called?');pads();S.want=tick(0,()=>S.won>=4,'Stanza for poems, chapter for novels, act and scene for plays.')}},
{h:'Count the stanzas',p:'Tap each stanza to number it. Then tap how many stanzas the poem has.',
 predict:{q:'A poem has 9 lines in 3 groups. How many stanzas does it have?',opts:['9','3'],ans:1},task:'Count the stanzas in 2 poems',
 show:()=>{steps[1].go();auto([()=>markSt(),()=>markSt(),()=>markSt(),()=>countIs(),()=>markSt(),()=>markSt(),()=>countIs()],240)},go:()=>{clean();say('Tap each stanza.');pads();S.want=tick(1,()=>S.won>=2,'A stanza is a group of lines, so you count the groups.')}},
{h:'Big to small',p:'Big parts hold smaller parts. Tap the parts in order, from the biggest to the smallest.',
 predict:{q:'In a play, which is bigger?',opts:['A scene: it holds acts','An act: it holds scenes'],ans:1},task:'Order the parts of a play, a novel and a poem',
 show:()=>{steps[2].go();const f=[];[4,4,3].forEach(n=>{for(let i=0;i<n;i++)f.push(()=>stackTap())});auto(f,200)},go:()=>{clean();say('Biggest first.');pads();S.want=tick(2,()=>S.won>=3,'Play, act, scene, line. Novel, chapter, paragraph, sentence.')}},
{h:'Chapters build',p:'These four chapters are mixed up. Use the clues that point back to put them in order.',
 predict:{q:'Chapter 3 starts "Still holding the key". What must an earlier chapter tell us?',opts:['Where the key came from','Nothing: each chapter stands alone'],ans:0},task:'Put the 4 chapters in story order',
 show:()=>{steps[3].go();auto([0,1,2,3].map(()=>()=>chTap()))},go:()=>{clean();say('Which chapter comes first?');pads();S.want=tick(3,()=>S.won>=1,'Later chapters build on earlier ones, so look for clues that point back.')}},
{h:'Stanza by stanza',p:'Read the poem. Each stanza builds on the one before. Choose how.',task:'Explain how stanzas 2 and 3 build',
 show:()=>{steps[4].go();auto([()=>buildPick(),()=>buildPick()],400)},go:()=>{clean();say(BUILD[0].q);pads();S.want=tick(4,()=>S.won>=2,'Stanza 2 changes the mood, and stanza 3 echoes stanza 1 with a twist.')}},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A play script says "ACT 1, SCENE 3". Which part is bigger?',[['Act 1','ok'],['Scene 3','scene'],['They are the same size','same']]],
 ['A poem has 16 lines in 4 groups. How many stanzas is that?',[['4','ok'],['16','lines'],['20','add']]],
 ['Which text is split into chapters?',[['A novel','ok'],['A poem','poem'],['A play script','play']]],
 ['Chapter 5 says "Ama’s cut knee still hurt." What does this tell you?',[['An earlier chapter showed how she hurt it','ok'],['Chapter 5 is the first chapter','first'],['Nothing: chapters are not linked','alone']]],
 ['What do you call a group of lines in a poem?',[['A stanza','ok'],['A chapter','chap'],['A scene','scn']]]];
function why(t){let m='Think about which kind of text it is, and what its parts are called.';
 if(t==='scene')m='An act is a big part that holds several scenes, so Act 1 is bigger.';
 if(t==='same')m='They are not the same size: one act holds several scenes.';
 if(t==='lines')m='16 is the number of lines. Each group of lines is one stanza, so there are 4.';
 if(t==='add')m='Do not add lines and groups. Count the groups: 4 stanzas.';
 if(t==='poem')m='Poems are split into stanzas, not chapters.';
 if(t==='play')m='Plays are split into acts and scenes, not chapters.';
 if(t==='first')m='"Still hurt" points back to something that happened before, so it is not the first chapter.';
 if(t==='alone')m='Chapters build on each other. "Still hurt" points back to an earlier chapter.';
 if(t==='chap')m='Chapters are parts of a novel. In a poem, a group of lines is a stanza.';
 if(t==='scn')m='Scenes are parts of a play. In a poem, a group of lines is a stanza.';
 return m}
function nextQ(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>verdict(t)});say('Challenge: '+q);A.redraw()}
let hits=0;
function verdict(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){hits++;A.win()}else{hits=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct.':'✗ '+why(t)}${ok?` Streak: ${hits}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move:()=>{},up:()=>{}});pads()}});
A.start()})})();
