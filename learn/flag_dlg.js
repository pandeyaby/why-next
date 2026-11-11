/* Flagship: writing character and dialogue (ages 11-14; CCSS W.6-8.3, KS3 writing). Punctuate speech so the reader can
   hear it; start a new paragraph for each new speaker; swap adverb-heavy tags for action beats that show feeling; tell two
   characters apart by voice alone; then pick endings that reflect rather than just stop. */
(()=>{
const LINE_A=[['g','“'],['t','Don’t open it'],['g',','],['g','”'],['t',' Mia whispered'],['g','.']];
const LINE_B=[['t','“Why not'],['g','?'],['t','” Leo asked'],['g','.']];
const TOKS=['“','”',',','.','?'],NAME={'“':'opening speech mark','”':'closing speech mark',',':'comma','.':'full stop','?':'question mark'};
const WHY={
 'a1.':'A full stop would end the sentence, but “Mia whispered” is still part of it. Use a comma inside the speech marks.',
 'a1”':'Put the punctuation first, then close the speech. The comma sits inside the closing mark.',
 'a1?':'Mia is not asking anything, so no question mark. A comma links her words to the tag.',
 'a0':'Speech starts with an opening mark, the one that curls like a 66: “',
 'a2':'Now close the speech with the 99-shaped mark: ”',
 'a3':'The whole sentence ends after the tag, so it needs a full stop.',
 'b0,':'Leo is asking a question. A question mark replaces the comma inside the speech marks.',
 'b0':'Leo is asking. Use a question mark inside the closing speech mark.',
 'b1':'The sentence ends after “Leo asked”, so finish with a full stop.'};
const TALK=[['Leo','“Gran, is that your old diary?”',0],['Gran','“Put it down, love.”',1],['Gran','She lifted it gently from his hands.',0],['Leo','“Why? What’s in it?”',1],
 ['Gran','“Things I never told your mum.”',1],['Leo','Leo stared at the faded cover.',1],['Leo','“Tell me one thing,” he said.',0]];
const BEATS=[['“I’m fine,” Gran said nervously.','“I’m fine.” Gran’s cup rattled on its saucer.','nervous'],
 ['“Get out,” Kez yelled angrily.','Kez slammed her locker. “Get out.”','angry'],
 ['“I did it,” Leo said proudly.','Leo held the trophy over his head. “I did it.”','proud']];
const VOICES=[['Kez','#fde68a','blunt and quick'],['Mr Ashby','#bfdbfe','formal and careful']];
const SAYS=[['“Nope. Not doing it.”',0],['“I would prefer, if possible, to wait until morning.”',1],['“Whatever. You go.”',0],['“That is most kind of you, thank you.”',1],['“Move. Now.”',0],['“I must say, I find this rather alarming.”',1]];
const ENDS=[['Mia shut the diary and they went downstairs for tea.',0,'This just stops the action. Nothing shows what the day meant.'],
 ['Mia never looked at the attic the same way again. Some secrets, she decided, are gifts.',1,'Yes: it looks back and says what changed in Mia.'],
 ['Then the doorbell rang. THE END.',0,'A new event at the last second is not a reflection. It leaves the story hanging.'],
 ['Leo still thinks about Gran’s voice that night, how it shook, and how brave she was to tell him.',1,'Yes: it reflects on Gran and on what Leo learned.'],
 ['It was all a dream.',0,'A dream ending cancels the story. The reader feels cheated.']];
VIS.reg('flagdlg',c=>{let A,pad,cq,ci=-1;const S={};
const INK='#0f172a',OK='#047857',BAD='#b91c1c',RIM='#64748b',SEL='#1d4ed8',PAPER='#fffdf6';
const now=()=>['punct','paras','beats','voice','ends','chal'][A.step];
const fnt=(px,w)=>`${w||600} ${Math.round(A.narrow?px:px*1.12)}px system-ui,sans-serif`;
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H)}
function wrap(t,w,px,wt){const g=A.ctx;g.font=fnt(px,wt);const out=[];let row='';for(const word of t.split(' ')){const tr=row?row+' '+word:word;if(row&&g.measureText(tr).width>w){out.push(row);row=word}else row=tr}out.push(row);return out}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.good||o.bad||o.sel?3.5:1.5;g.strokeStyle=o.good?OK:o.bad?BAD:o.sel?SEL:RIM;g.stroke();
 if(!t)return;const px=o.px||14,rows=wrap(t,r.w-(o.pad||14),px,o.wt);g.fillStyle=INK;g.textAlign=o.left?'left':'center';g.textBaseline='middle';const x=o.left?r.x+(o.pad||14)/2:r.x+r.w/2;rows.forEach((s,i)=>g.fillText(s,x,r.y+r.h/2+(i-(rows.length-1)/2)*px*1.25))}
function banner(t,ok){const g=A.ctx;g.font=fnt(12,800);const w=Math.min(A.W-10,g.measureText(t).width+24);box({x:(A.W-w)/2,y:6,w,h:28},t,{px:12,wt:800,good:ok})}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1 punctuate */
function gaps(){const out=[];[LINE_A,LINE_B].forEach((L,li)=>L.forEach((x,j)=>{if(x[0]==='g')out.push({li,j,want:x[1]})}));return out}
function lay(){const g=A.ctx,px=A.narrow?17:19,R=[];g.font=fnt(px,700);[LINE_A,LINE_B].forEach((L,li)=>{let x=14,y=A.H*(li?.44:.2);L.forEach((p,j)=>{let w=p[0]==='g'?28:g.measureText(p[1]).width;if(x+w>A.W-14){x=14;y+=px*2.5}R.push({li,j,x,y,w,kind:p[0],txt:p[1]});x+=w+5})});return R}
function tray(){const n=TOKS.length,w=Math.min(60,(A.W-20-(n-1)*8)/n),x0=(A.W-(n*w+(n-1)*8))/2;return TOKS.map((t,i)=>({x:x0+i*(w+8),y:A.H*.66,w,h:52,t}))}
function drawPunct(){const P=S.p,g=A.ctx,G=gaps();ground();banner(P.k>=G.length?'Both lines punctuated':`Gap ${P.k+1} of ${G.length}: drag or tap the mark that fits`,P.k>=G.length);
 let gi=0;lay().forEach(r=>{const px=A.narrow?17:19;g.font=fnt(px,700);g.textBaseline='middle';g.textAlign='left';
  if(r.kind==='t'){g.fillStyle=A.col.tx;g.fillText(r.txt,r.x,r.y)}else{const k=gi++,filled=k<P.k,cur=k===P.k;box({x:r.x,y:r.y-17,w:r.w,h:34},filled?r.txt:'',{px:20,wt:800,good:filled,sel:cur,bad:cur&&P.bad,fill:filled?'#dcfce7':'#ffffff'})}});
 tray().forEach(r=>{const d=S.drag&&S.drag.t===r.t?S.drag:null;box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{px:28,wt:800,sel:!!d})})}
function drop(t){const P=S.p,G=gaps();if(P.k>=G.length)return;const gp=G[P.k],line=gp.li?'b':'a',slot=gp.li?(gp.j===1?0:1):[0,2,3,5].indexOf(gp.j);
 if(t!==gp.want){P.bad=1;A.sound.miss();return say(WHY[line+slot+t]||WHY[line+slot])}
 P.k++;P.bad=0;A.sound.pop();say(P.k>=G.length?'“Don’t open it,” Mia whispered. “Why not?” Leo asked. Punctuation goes inside the speech marks, and the tag starts with a small letter.':`Yes: ${NAME[t]}. Next gap.`)}
/* 2 new speaker, new line */
function rows(){const n=TALK.length,h=Math.min(48,(A.H*.8-(n-1)*6)/n);return TALK.map((_,i)=>({x:10,y:A.H*.13+i*(h+6),w:A.W-20,h}))}
function drawParas(){const Q=S.q,g=A.ctx,need=TALK.filter(x=>x[2]).length;ground();banner(Q.on.length>=need?'Every new speaker has a new line':`Tap where a new paragraph starts (${Q.on.length} of ${need})`,Q.on.length>=need);
 rows().forEach((r,i)=>{const[who,t]=TALK[i],ind=i===0||Q.on.includes(i),dx=ind?22:0;box({...r,x:r.x+dx,w:r.w-dx},t,{px:13,left:1,good:Q.on.includes(i),bad:Q.bad===i,fill:who==='Gran'?'#fce7f3':'#e0f2fe'});
  if(ind){g.fillStyle=A.col.dark?'#93c5fd':SEL;g.font=fnt(15,800);g.textAlign='left';g.textBaseline='middle';g.fillText('¶',r.x+2,r.y+r.h/2)}})}
function brk(i){const Q=S.q,need=TALK.filter(x=>x[2]).length;if(i===0||Q.on.includes(i)||Q.on.length>=need)return;const[who,,nw]=TALK[i];
 if(!nw){Q.bad=i;A.sound.miss();return say(i===2?'Gran is still the one talking and acting here. Her action stays in her paragraph.':'Leo’s action and his words belong together, so this stays in Leo’s paragraph.')}
 Q.on.push(i);Q.bad=null;A.sound.pop();say(`New paragraph: now ${who} is in focus.`+(Q.on.length>=need?' New speaker, new line. A character’s actions sit with their own words.':''))}
/* 3 action beats */
function pair(){const w=A.W-20,h=Math.min(78,A.H*.2);return[{x:10,y:A.H*.36,w,h},{x:10,y:A.H*.36+h+14,w,h}]}
function drawBeats(){const B=S.b,g=A.ctx;ground();if(B.k>=BEATS.length){banner('All 3 lines now show the feeling',1);BEATS.forEach((x,i)=>box({x:10,y:A.H*.16+i*(A.H*.25),w:A.W-20,h:A.H*.2},x[1],{px:14,good:1}));return}
 banner(`Line ${B.k+1} of 3: which one shows the feeling?`);const[tell,show,feel]=BEATS[B.k];g.fillStyle=A.col.tx;g.font=fnt(13,700);g.textAlign='center';g.fillText(`Feeling to get across: ${feel}`,A.W/2,A.H*.25);
 const order=B.k%2?[show,tell]:[tell,show];pair().forEach((r,i)=>box(r,order[i],{px:15,bad:B.bad===order[i]}))}
function beat(t){const B=S.b;if(B.k>=BEATS.length)return;const[tell,show,feel]=BEATS[B.k];
 if(t===tell){B.bad=t;A.sound.miss();return say(`This tells us the character is ${feel} with an adverb. Readers believe it more when an action shows it.`)}
 B.k++;B.bad=null;A.sound.pop();say(`Yes. The action shows ${feel} without naming it.`+(B.k>=BEATS.length?' Use said, or an action beat, and let the action carry the feeling.':''))}
/* 4 voices */
function bins(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
const deal=()=>({x:A.W*.06,y:A.H*.2,w:A.W*.88,h:A.H*.24});
function drawVoice(){const V=S.v,g=A.ctx;ground();banner(V.k>=SAYS.length?'All 6 lines matched by voice':`Line ${V.k+1} of 6: who says it? Drag or tap a name`,V.k>=SAYS.length);
 bins().forEach((r,j)=>{const[n,col,how]=VOICES[j];box(r,null,{fill:col});g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=fnt(15,800);g.fillText(n,r.x+r.w/2,r.y+8);g.font=fnt(11,600);g.fillText(how,r.x+r.w/2,r.y+30);
  g.font=fnt(20,800);g.fillText('✓'.repeat(SAYS.slice(0,V.k).filter(x=>x[1]===j).length),r.x+r.w/2,r.y+r.h*.6)});
 if(V.k<SAYS.length){const r=deal(),d=S.drag&&S.drag.card?S.drag:null;box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,SAYS[V.k][0],{px:16,bad:V.bad,sel:!!d})}}
function match(j){const V=S.v;if(V.k>=SAYS.length)return;const[t,who]=SAYS[V.k];
 if(j!==who){V.bad=1;A.sound.miss();return say(who?'Long, polite sentences with words like “prefer” and “rather” sound like Mr Ashby, not Kez.':'Short, blunt words like this are Kez’s voice. Mr Ashby would never say it so bluntly.')}
 V.k++;V.bad=0;A.sound.pop();say(`Yes, ${VOICES[who][0]}.`+(V.k>=SAYS.length?' Each character’s words, sentence length and manners show who they are, even without a tag.':''))}
/* 5 endings */
function cards(){const n=ENDS.length,h=Math.min(64,(A.H*.78-(n-1)*8)/n);return ENDS.map((_,i)=>({x:10,y:A.H*.14+i*(h+8),w:A.W-20,h}))}
function drawEnds(){const E=S.e,g=A.ctx,need=ENDS.filter(x=>x[1]).length;ground();banner(E.got.length>=need?'Both reflective endings found':`Tap the endings that reflect (${E.got.length} of ${need})`,E.got.length>=need);
 cards().forEach((r,i)=>box(r,ENDS[i][0],{px:13,good:E.got.includes(i),bad:E.bad===i}))}
function endPick(i){const E=S.e,need=ENDS.filter(x=>x[1]).length;if(E.got.includes(i)||E.got.length>=need)return;const[,ok,why]=ENDS[i];
 if(!ok){E.bad=i;A.sound.miss();return say(why)}E.got.push(i);E.bad=null;A.sound.pop();say(why+(E.got.length>=need?' A reflective ending looks back at what the events meant.':''))}
/* frame */
function draw(){const s=now();if(s==='chal'){ground();banner('Challenge',1);box({x:16,y:A.H*.4,w:A.W-32,h:60},'Speech marks, new lines, action beats, voice, reflection.',{px:14});return}
 ({punct:drawPunct,paras:drawParas,beats:drawBeats,voice:drawVoice,ends:drawEnds})[s]();A.fx.draw(A.ctx)}
function down(p){const s=now();
 if(s==='punct'){const t=tray().find(r=>hit(p,r));if(t){S.drag={t:t.t,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(s==='paras'){const i=rows().findIndex(r=>hit(p,r));if(i>=0)brk(i);return false}
 if(s==='beats'){if(S.b.k>=BEATS.length)return false;const[tell,show]=BEATS[S.b.k],order=S.b.k%2?[show,tell]:[tell,show],i=pair().findIndex(r=>hit(p,r));if(i>=0)beat(order[i]);return false}
 if(s==='voice'){if(S.v.k>=SAYS.length)return false;if(hit(p,deal())){S.drag={card:1,x:p.x,y:p.y};return true}const j=bins().findIndex(r=>hit(p,r));if(j>=0)match(j);return false}
 if(s==='ends'){const i=cards().findIndex(r=>hit(p,r));if(i>=0)endPick(i)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;if(d.card){const j=bins().findIndex(r=>hit(p,r));if(j>=0)match(j);else A.redraw();return}
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return drop(d.t);const L=lay().filter(r=>r.kind==='g'),r=L[S.p.k];if(r&&Math.abs(p.x-(r.x+r.w/2))<44&&Math.abs(p.y-r.y)<44)drop(d.t);else{A.redraw();say('Drop the mark on the blue gap.')}}
function reset(){for(const k in S)delete S[k];Object.assign(S,{p:{k:0,bad:0},q:{on:[],bad:null},b:{k:0,bad:null},v:{k:0,bad:0},e:{got:[],bad:null},drag:null,cb:()=>{},run:(S.run||0)+1})}
function say(t){if(t){c.say(t);A.cv.setAttribute('aria-label',t)}A.redraw();buttons();S.cb()}
const doneWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,d,ok,msg){reset();say(d);S.cb=doneWhen(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const r0=S.run;acts.forEach((a,j)=>setTimeout(()=>{if(r0===S.run)a()},(A.reduced()?40:ms)*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const s=now(),B=(t,fn,lab)=>{c.el('button',{type:'button',class:'lbtn','aria-label':lab||t},pad,t).onclick=fn};
 if(s==='punct'&&S.p.k<gaps().length)TOKS.forEach(t=>B(t,()=>drop(t),`Put a ${NAME[t]} in the gap`));
 if(s==='paras')TALK.forEach((x,i)=>{if(i&&!S.q.on.includes(i))B(`¶ before: ${x[1].slice(0,22)}…`,()=>brk(i),`New paragraph before: ${x[1]}`)});
 if(s==='beats'&&S.b.k<BEATS.length){const[tell,show]=BEATS[S.b.k];(S.b.k%2?[show,tell]:[tell,show]).forEach(t=>B(t,()=>beat(t)))}
 if(s==='voice'&&S.v.k<SAYS.length)VOICES.forEach((v,j)=>B(v[0],()=>match(j),`${v[0]} says it`));
 if(s==='ends')ENDS.forEach((x,i)=>{if(!S.e.got.includes(i))B(x[0].slice(0,30)+'…',()=>endPick(i),`Ending: ${x[0]}`)})}
const goodEnds=ENDS.map((x,i)=>x[1]?i:-1).filter(i=>i>=0),goodBreaks=TALK.map((x,i)=>x[2]?i:-1).filter(i=>i>=0);
const steps=[
{h:'Punctuate speech',p:'Speech marks show the exact words a character says. Fill each blue gap with the mark that fits.',
 predict:{q:'“Don’t open it_” Mia whispered. What goes in the gap?',opts:['A full stop, because her words end there','A comma, because the sentence goes on'],ans:1},task:'Fill all 6 gaps',
 show:()=>play(0,gaps().map(x=>()=>drop(x.want)),450),
 go:()=>open(0,'Two lines of speech with six blue gaps. Marks to use: opening speech mark, closing speech mark, comma, full stop, question mark.',()=>S.p.k>=gaps().length,'The comma or question mark goes inside the closing speech mark.')},
{h:'New speaker, new line',p:'Leo and Gran are talking, but it is all one block. Tap each line where a new paragraph must start.',task:'Find the 4 new paragraphs',
 show:()=>play(1,goodBreaks.map(i=>()=>brk(i)),450),
 go:()=>open(1,'Seven lines of a scene between Leo and Gran, all in one block.',()=>S.q.on.length>=goodBreaks.length,'Each change of speaker starts a new paragraph.')},
{h:'Show, with action beats',p:'An adverb like “nervously” tells the reader. An action beat shows it. Tap the line that shows the feeling.',
 predict:{q:'Which line makes Gran’s nerves easier to believe?',opts:['“I’m fine,” Gran said nervously.','“I’m fine.” Gran’s cup rattled on its saucer.'],ans:1},task:'Choose the showing line 3 times',
 show:()=>play(2,BEATS.map(x=>()=>beat(x[1])),550),
 go:()=>open(2,'Two versions of a line. One tells the feeling with an adverb, one shows it with an action.',()=>S.b.k>=BEATS.length,'Action beats show feeling and tell us who is speaking.')},
{h:'Hear the voice',p:'Kez is blunt and quick. Mr Ashby is formal and careful. Drag each line to the person who would say it.',task:'Match all 6 lines',
 show:()=>play(3,SAYS.map(x=>()=>match(x[1])),450),
 go:()=>open(3,'Two characters: Kez, blunt and quick, and Mr Ashby, formal and careful. A line of speech to match.',()=>S.v.k>=SAYS.length,'How a character talks shows who they are.')},
{h:'End with reflection',p:'A strong ending looks back on what happened and what it meant. Tap the 2 endings that reflect.',
 predict:{q:'Which kind of ending is stronger for this story?',opts:['A twist, like “It was all a dream”','A look back at what changed in the character'],ans:1},task:'Find the 2 reflective endings',
 show:()=>play(4,goodEnds.map(i=>()=>endPick(i)),500),
 go:()=>open(4,'Five possible endings for Mia and Leo’s story.',()=>S.e.got.length>=goodEnds.length,'Reflection, not just the last event.')},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[{q:'Which line is punctuated correctly?',a:'“Wait here,” said Mum.',o:[['“Wait here.” said Mum.','stop'],['“Wait here”, said Mum.','outside']]},
 {q:'Two characters are talking. When do you start a new paragraph?',a:'Each time the speaker changes',o:[['Only when the scene changes','scene'],['After every sentence','every']]},
 {q:'Which line best shows that Raj is scared?',a:'Raj gripped the rail. “Is it safe?”',o:[['“Is it safe?” Raj exclaimed fearfully.','adverb'],['“I am very scared,” said Raj.','tell']]},
 {q:'How can a reader tell two characters apart in dialogue with no tags?',a:'Each one has their own way of talking',o:[['They cannot, so tag every line','tagall'],['Make them both talk the same','same']]},
 {q:'Which is the strongest ending?',a:'One that shows what the events meant to the narrator',o:[['“And then I woke up.”','dream'],['A new problem in the last line','twist']]},
 {q:'Which tag is usually best for plain speech?',a:'said',o:[['chortled','fancy'],['exclaimed loudly','adverb']]}];
function why(t){let m='Speech goes in speech marks, each speaker gets a new line, and actions show what words do not say.';
 if(t==='stop')m='A full stop inside the marks ends the sentence too soon. Use a comma when a tag like “said Mum” follows.';
 if(t==='outside')m='The comma belongs inside the closing speech mark, next to the spoken words.';
 if(t==='scene')m='Dialogue needs a new paragraph every time the speaker changes, not only at a new scene.';
 if(t==='every')m='One speaker’s words and actions stay together. Only a change of speaker starts a new paragraph.';
 if(t==='adverb')m='An adverb like “fearfully” tells the feeling. An action beat, like gripping a rail, shows it.';
 if(t==='tell')m='Saying “I am scared” names the feeling flatly. People rarely say it like that; show it through action.';
 if(t==='tagall')m='Tagging every line slows the reader. Distinct voices and the new-line rule show who is speaking.';
 if(t==='same')m='If everyone sounds the same, characters blur. Word choice and sentence length give each a voice.';
 if(t==='dream')m='A dream ending cancels everything that happened. Readers feel cheated.';
 if(t==='twist')m='A new problem at the end leaves the story unfinished. Reflect on what the events meant instead.';
 if(t==='fancy')m='Unusual tags pull the reader’s eye away from the words. “Said” almost disappears, which is what you want.';return m}
function nextQ(){ci++;const Q=QS[ci%QS.length],all=[[Q.a,'ok'],...Q.o],r=(ci+2)%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const p=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 p.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';p.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:B=>{cq.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dialogue lab buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
