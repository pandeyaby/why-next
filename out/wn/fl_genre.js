/* Flagship: writing across genres (ages 11-14). Spot the form from its conventions, build a formal letter in order,
   match salutation to sign-off, turn prose into a script, and break a sentence into lines of poetry. */
(()=>{
VIS.reg('flaggenre',c=>{let A,bar,box,q=-1,run=0;const K={};
const view=()=>['form','letter','sign','script','poem','quiz'][A.step];
const sfx=k=>A.sound[k](),paintNow=()=>A.redraw(),sync=()=>{paintNow();keys()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const fnt=(px,wt,mono)=>`${wt||700} ${Math.round(px*(A.narrow?1:1.12))}px ${mono?'ui-monospace,Menlo,monospace':'system-ui,sans-serif'}`;
function word(t,x,y,px,ink,wt,al){const g=A.ctx;g.font=fnt(px,wt);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;g.fillText(t,x,y,A.W-14)}
function wrap(t,x,y,mw,px,o){o=o||{};const g=A.ctx;g.font=fnt(px,o.wt||600,o.mono);g.textAlign=o.al||'left';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;let n=0;
 t.split('\n').forEach(par=>{let ln='';par.split(' ').forEach(w=>{const tr=ln?ln+' '+w:w;if(g.measureText(tr).width>mw&&ln){g.fillText(ln,x,y+n*px*1.45);n++;ln=w}else ln=tr});g.fillText(ln,x,y+n*px*1.45);n++});return n}
function panel(x,y,w,h,edge,fill){const g=A.ctx;A.paint.rrect(x,y,w,h,10);g.fillStyle=fill||A.col.pn;g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const page=()=>({x:A.W*.05,y:A.H*.11,w:A.W*.9,h:A.H*.84});
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.05:.3);g.fillRect(0,0,W,H);
 ({form:dForm,letter:dLetter,sign:dSign,script:dScript,poem:dPoem,quiz:dQuiz})[view()](g,W,H,C);A.fx.draw(g)}
/* ---- 1: name the form from its conventions ---- */
const FORMS=['Script','Poem','Formal letter','Talk notes'];
const FR=[['MAYA: (whispering) Is it gone?\nTOM: (at the window) I think so.',0,'Speaker names in capitals, a colon and stage directions in brackets: that is a script.'],
 ['Dear Sir or Madam,\nI am writing to complain about the bus service on Route 12.',2,'A salutation and a formal opening that gives the reason for writing: that is a formal letter.'],
 ['The bus is late again,\nthe rain keeps drumming,\nand still I wait.',1,'Short lines that break before the sentence ends are lineation, so it is a poem.'],
 ['• Hook: "Imagine a town with no bins."\n• Point 1: litter costs £2m a year\n• End: ask for questions',3,'Bullet points and short phrases to glance at while speaking: those are notes for a talk.']];
const fbin=i=>{const w=A.W*.44,h=A.H*.2;return{x:A.W*(i%2?.53:.03),y:A.H*(.56+(i>1?.22:0)),w,h}};
function dForm(g,W,H,C){for(let i=0;i<4;i++){const b=fbin(i),got=K.placed.filter(f=>FR[f][1]===i).length;panel(b.x,b.y,b.w,b.h,K.bad===i+1?C.rd:got?C.gr:C.mu,A.alpha(got?C.gr:C.pn,got?.18:1));word(FORMS[i],b.x+b.w/2,b.y+b.h*.38,14,C.tx,800);if(got)word('✓ sorted',b.x+b.w/2,b.y+b.h*.7,12)}
 if(K.fi<4){const w=W*.9,x=W*.05+K.dx,y=H*.1;panel(x,y,w,H*.4,C.tx);wrap(FR[K.fi][0],x+12,y+22,w-24,13,{mono:1})}
 word(K.fi<4?`Fragment ${K.fi+1} of 4: which form is it?`:'All 4 forms found from their conventions.',W/2,H*.05,14,C.tx,800)}
function pickForm(i){if(view()!=='form'||K.fi>=4)return;K.dx=0;const[,ans,why]=FR[K.fi];
 if(i!==ans){K.bad=i+1;setTimeout(()=>{K.bad=0;paintNow()},A.reduced()?10:700);sfx('miss');let m=`Not a ${FORMS[i].toLowerCase()}. Look at the layout: ${why}`;speak(m);return paintNow()}
 K.placed.push(K.fi);K.fi++;sfx('pop');speak(why);sync();K.want()}
/* ---- 2: build a formal letter ---- */
const PARTS=['Your address and the date','Their name and address','Dear Ms Patel,','Opening: why you are writing','Main paragraphs: your points','Yours sincerely, and your name'];
const NEXT=['your own address and the date go first, top right','next comes the reader\'s name and address, on the left','then the salutation, Dear Ms Patel,','then an opening paragraph that says why you are writing','then the main paragraphs that make your points','last, the sign-off and your name'];
const ORDER=[3,5,1,4,0,2];
function slot(i){const P=page(),x=P.x+12,w=P.w-24,y=P.y+[14,P.h*.15,P.h*.32,P.h*.43,P.h*.58,P.h*.8][i],h=[P.h*.12,P.h*.12,P.h*.07,P.h*.11,P.h*.18,P.h*.12][i];return i?{x,y,w:i===1?w*.6:w,h}:{x:x+w*.45,y,w:w*.55,h}}
function dLetter(g,W,H,C){const P=page();panel(P.x,P.y,P.w,P.h,C.tx);word(`Letter: ${K.lt} of 6 parts in place`,W/2,H*.05,14,C.tx,800);
 for(let i=0;i<6;i++){const s=slot(i);if(i<K.lt){g.fillStyle=A.alpha(C.gr,.16);g.fillRect(s.x,s.y,s.w,s.h);wrap(PARTS[i],i?s.x+6:s.x+s.w-6,s.y+12,s.w-12,12,{al:i?'left':'right',wt:700})}
  else{g.setLineDash([5,5]);g.strokeStyle=C.mu;g.lineWidth=1.5;g.strokeRect(s.x,s.y,s.w,s.h);g.setLineDash([])}}}
function placePart(i){if(view()!=='letter'||K.lt>=6)return;if(i!==K.lt){sfx('miss');let m=`"${PARTS[i]}" is not next. In a formal letter, ${NEXT[K.lt]}.`;return speak(m)}
 K.lt++;sfx('pop');speak(K.lt>=6?'Every part is in place: addresses, date, salutation, opening, main paragraphs, sign-off.':`Yes: ${PARTS[i]}.`);sync();K.want()}
/* ---- 3: salutation and sign-off ---- */
const OFFS=['Yours faithfully','Yours sincerely','Love from'];
const SAL=[['Dear Sir or Madam,',0,'name not known'],['Dear Mr Khan,',1,'name known'],['Hi Gran,',2,'family or friend']];
const SM=[["'Yours sincerely' goes with a name. With 'Dear Sir or Madam' you do not know it, so use 'Yours faithfully'.","'Love from' is for family and friends, not an official you have never met."],
 ["You named the reader, Mr Khan, so use 'Yours sincerely'. Keep 'Yours faithfully' for 'Dear Sir or Madam'.","Mr Khan is a formal reader. 'Love from' is too personal; use 'Yours sincerely'."],
 ["Gran would find a formal sign-off stiff. A personal letter can end warmly, like 'Love from'.","'Yours sincerely' is for formal letters. Gran gets a warm, informal ending like 'Love from'."]];
function dSign(g,W,H,C){const P={x:W*.05,y:H*.12,w:W*.9,h:H*.48};panel(P.x,P.y,P.w,P.h,C.tx);word(`Letter ${Math.min(K.si+1,3)} of 3: choose the sign-off`,W/2,H*.05,14,C.tx,800);
 const s=SAL[Math.min(K.si,2)];word(s[0],P.x+14,P.y+26,15,C.tx,800,'left');for(let i=0;i<3;i++){g.fillStyle=C.mu;g.fillRect(P.x+14,P.y+56+i*20,P.w*(.8-i*.12),5)}
 word(K.si>2||K.got>K.si?OFFS[s[1]]+',':'_______________ ,',P.x+14,P.y+P.h-30,15,K.got>K.si||K.si>2?C.tx:C.mu,800,'left');
 word('Rule so far:',W*.07,H*.67,13,C.tx,800,'left');for(let i=0;i<Math.min(K.si,3);i++)word(`${SAL[i][2][0].toUpperCase()+SAL[i][2].slice(1)} → ${OFFS[SAL[i][1]]}`,W*.07,H*.73+i*22,13,C.tx,600,'left')}
function signOff(i){if(view()!=='sign'||K.si>=3)return;const s=SAL[K.si];if(i!==s[1]){sfx('miss');const w=[0,1,2].filter(j=>j!==s[1]);let m=SM[K.si][w.indexOf(i)];return speak(m)}
 K.got=K.si+1;sfx('pop');speak(`Yes: "${s[0]}" ends "${OFFS[i]}".`);paintNow();const k=K.k;setTimeout(()=>{if(k!==K.k)return;K.si++;sync();K.want()},A.reduced()?10:350)}
/* ---- 4: prose into a script ---- */
const FIX=['names','marks','said','dirs'],FIXL=['Add speaker names','Take out speech marks','Take out "he said"','Put actions in brackets'];
function scriptLines(){const f=K.fx,q=f.marks?'':'"';
 return[(f.names?'MAYA: ':'')+(f.dirs?'(whispering) ':'')+q+'Is it gone?'+q+(f.said?'':' Maya whispered.'),
  f.dirs?'(TOM peers out of the window.)':'Tom peered out of the window.',
  (f.names?'TOM: ':'')+q+'I think so.'+q+(f.said?'':' he said.')]}
function dScript(g,W,H,C){const P=page(),n=FIX.filter(k=>K.fx[k]).length;panel(P.x,P.y,P.w,P.h*.62,C.tx);word(`Prose → script: ${n} of 4 changes`,W/2,H*.05,14,C.tx,800);
 let y=P.y+24;scriptLines().forEach(l=>{y+=wrap(l,P.x+14,y,P.w-28,14,{mono:1})*14*1.45+10});
 FIX.forEach((k,i)=>word(`${K.fx[k]?'✓':'○'} ${FIXL[i]}`,P.x+8,P.y+P.h*.7+i*24,13,K.fx[k]?C.tx:C.mu,700,'left'))}
function fix(k){if(view()!=='script'||K.fx[k])return;K.fx[k]=1;sfx('pop');const n=FIX.filter(x=>K.fx[x]).length;
 speak(['Speaker names go on the left, in capitals, with a colon.','A script needs no speech marks: the name shows who speaks.','No "he said" in a script; the name already tells us.','Actions and tone go in brackets as stage directions.'][FIX.indexOf(k)]+(n>=4?' Now it is a script an actor can read.':''));sync();K.want()}
function scriptMiss(){sfx('miss');let m='A script never adds "she replied". The speaker name does that job, so take reporting clauses out.';speak(m)}
/* ---- 5: line breaks in a poem ---- */
const WORDS='The rain keeps drumming on the roof of the bus and I wait for the bell'.split(' ');
const CUTS=[[3,1,'drumming'],[5,0,'on the'],[7,0,'roof of'],[9,1,'bus'],[10,0,'and'],[12,1,'wait']];
function dPoem(g,W,H,C){const P=page(),lines=[[]];WORDS.forEach((w,i)=>{lines[lines.length-1].push(w);if(K.br.includes(i)&&i<WORDS.length-1)lines.push([])});
 panel(P.x,P.y,P.w,P.h*.66,C.tx);word(`Lines: ${lines.length} (aim for 4)`,W/2,H*.05,14,C.tx,800);let y=P.y+26;
 lines.forEach(l=>{y+=wrap(l.join(' '),P.x+16,y,P.w-32,15,{wt:600})*15*1.45+6});
 word(K.br.length>=3?'Each line ends on a strong word.':'End lines on strong words.',W/2,P.y+P.h*.76,13,C.tx,700);word('Tap a word to end a line after it.',W/2,P.y+P.h*.84,12,C.mu,600)}
function cut(j){if(view()!=='poem'||K.br.length>=3)return;const[i,ok,lab]=CUTS[j];if(K.br.includes(i))return;
 if(!ok){sfx('miss');let m=`Ending on "${lab.split(' ').pop()}" leaves the line hanging on a small word. Line breaks usually work best after a strong noun or verb.`;return speak(m)}
 K.br.push(i);sfx('pop');speak(K.br.length>=3?'Four lines, each ending on a strong word: drumming, bus, wait, bell.':`Good break after "${lab}".`);sync();K.want()}
function dQuiz(g,W,H,C){const P=page();panel(P.x,P.y+H*.1,P.w,H*.5,C.tx);['MAYA: (quietly) Hello?','Dear Sir or Madam,','• Hook  • Point 1','The rain keeps drumming'].forEach((t,i)=>word(t,W/2,H*(.3+i*.09),13,C.tx,700));word('Form, register, conventions',W/2,H*.12,15,C.tx,800)}
/* ---- controls and gestures ---- */
function keys(){if(!bar)return;bar.innerHTML='';const v=view(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},bar,t).onclick=f};
 if(v==='form'&&K.fi<4)FORMS.forEach((f,i)=>b(f,()=>pickForm(i),`It is a ${f.toLowerCase()}`));
 if(v==='letter'&&K.lt<6)ORDER.filter(i=>i>=K.lt).forEach(i=>b(PARTS[i],()=>placePart(i),`Place next: ${PARTS[i]}`));
 if(v==='sign'&&K.si<3)OFFS.forEach((o,i)=>b(o,()=>signOff(i),`Sign off with ${o}`));
 if(v==='script'){FIX.forEach((k,i)=>{if(!K.fx[k])b(FIXL[i],()=>fix(k))});b('Add "she replied"',scriptMiss,'Add she replied after a line')}
 if(v==='poem'&&K.br.length<3)CUTS.forEach(([i,,lab],j)=>{if(!K.br.includes(i))b(`Break after “${lab}”`,()=>cut(j),`End a line after ${lab}`)})}
function down(p){const v=view();K.gx=p.x;
 if(v==='form'&&K.fi<4){for(let i=0;i<4;i++)if(inside(p,fbin(i)))return pickForm(i),false;if(p.y<A.H*.5){K.drag=1;return true}}
 if(v==='letter'&&K.lt<6){for(let i=K.lt;i<6;i++)if(inside(p,slot(i))){sfx('tick');let m=`This space is for part ${i+1}. Next to place: ${NEXT[K.lt]}.`;speak(m)}}
 if(v==='poem'){const g=A.ctx,P=page();g.font=fnt(15,600);let x=P.x+16,y=P.y+26,best=-1;WORDS.forEach((w,i)=>{const ww=g.measureText(w+' ').width;if(x+ww>P.x+P.w-16){x=P.x+16;y+=15*1.45}if(Math.abs(p.y-y)<16&&p.x>=x&&p.x<=x+ww)best=i;x+=ww;if(K.br.includes(i)){x=P.x+16;y+=15*1.45+6}});
  const j=CUTS.findIndex(c=>c[0]===best||(c[2].includes(' ')&&c[0]-1===best));if(j>=0)cut(j)}return false}
function move(p){if(!K.drag)return;K.dx=p.x-K.gx;paintNow()}
function up(p){if(!K.drag)return;K.drag=0;const pt={x:p.x,y:p.y};K.dx=0;for(let i=0;i<4;i++)if(inside(pt,fbin(i)))return pickForm(i);paintNow()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,acts,gap){steps[n].go();const k=++K.k;acts.forEach((f,j)=>setTimeout(()=>{if(k===K.k)f()},A.reduced()?30*(j+1):(j+1)*(gap||380)))}
function reset(){const k=(K.k||0)+1;for(const x in K)delete K[x];Object.assign(K,{k,want:()=>{},bad:0,dx:0,drag:0,fi:0,placed:[],lt:0,si:0,got:0,fx:{},br:[]})}
const steps=[
{h:'Name the form',p:'Every form has conventions: the layout and features readers expect. Use them to spot the form.',
 predict:{q:'Which clue tells you a text is a script?',opts:['Lots of describing words','Speaker names and stage directions','It rhymes'],ans:1},task:'Sort all 4 fragments by form',
 show:()=>play(0,[0,2,1,3].map(i=>()=>pickForm(i))),go:()=>{reset();speak('Read the fragment. Which form is it?');keys();K.want=finish(0,()=>K.fi>=4,'You named each form from its conventions, not its topic.')}},
{h:'Build a formal letter',p:'A formal letter has a fixed layout. Put the six parts in order.',
 predict:{q:'In a UK formal letter, where does your own address go?',opts:['At the bottom, after your name','Top right, above the date','It is left out'],ans:1},task:'Place all 6 parts in order',
 show:()=>play(1,[0,1,2,3,4,5].map(i=>()=>placePart(i))),go:()=>{reset();speak('Press the part that comes next in the letter.');keys();K.want=finish(1,()=>K.lt>=6,'Addresses, date, salutation, opening, body, sign-off: readers expect this order.')}},
{h:'Salutation and sign-off',p:'The salutation (how you greet the reader) decides the sign-off. Match them.',
 predict:{q:'You start "Dear Sir or Madam". How do you sign off?',opts:['Yours sincerely','Yours faithfully','Cheers'],ans:1},task:'Choose the sign-off for all 3 letters',
 show:()=>play(2,[0,1,2].map(i=>()=>signOff(i)),450),go:()=>{reset();speak(`Letter 1 starts: ${SAL[0][0]} Choose the sign-off.`);keys();K.want=finish(2,()=>K.si>=3,'Name not known: faithfully. Name known: sincerely. Family: a warm ending.')}},
{h:'Prose into a script',p:'A story shows speech with speech marks and "he said". A script shows it differently. Make the changes.',
 predict:{q:'In a script, how do you show who is speaking?',opts:['Speech marks and "she said"','A new paragraph','Their name before the line'],ans:2},task:'Make all 4 changes',
 show:()=>play(3,FIX.map(k=>()=>fix(k))),go:()=>{reset();speak('Make the changes that turn this story extract into a script.');keys();K.want=finish(3,()=>FIX.every(k=>K.fx[k]),'Names, no speech marks, no reporting clauses, directions in brackets.')}},
{h:'Break it into lines',p:'In a poem, where a line ends matters. This is lineation. Split the sentence into 4 lines.',
 predict:{q:'Where does a line of poetry usually end best?',opts:['On a strong word, like a noun or verb','On a small word like "the" or "of"','Anywhere: it never matters'],ans:0},task:'Make 4 lines that end on strong words',
 show:()=>play(4,[0,3,5].map(j=>()=>cut(j))),go:()=>{reset();speak('Choose where each line ends.');keys();K.want=finish(4,()=>K.br.length>=3,'Strong line endings give each line its own weight.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
const QS=[['Which is a convention of a script?',[['Speaker names and stage directions','ok'],['Speech marks round every line','marks'],['A salutation and a sign-off','letter']]],
 ['A letter starts "Dear Sir or Madam". Which sign-off?',[['Yours faithfully','ok'],['Yours sincerely','sincere'],['Love from','love']]],
 ['A letter starts "Dear Ms Patel". Which sign-off?',[['Yours sincerely','ok'],['Yours faithfully','faith'],['See ya','chat']]],
 ['Notes for a talk should be...',[['Short bullet points to glance at','ok'],['Every word written out to read aloud','readout'],['One long paragraph','para']]],
 ['Which line of a poem has the strongest ending?',[['The rain keeps drumming','ok'],['The rain keeps drumming on the','the'],['The rain keeps drumming on','on']]],
 ['Which register suits a formal letter to the council?',[['Formal: full sentences, no slang','ok'],['Chatty, with emojis','emoji'],['Text speak, like "pls"','txt']]],
 ['In a script, where do actions go?',[['In brackets, as stage directions','ok'],['In speech marks','quote'],['After "he said"','said']]]];
function slip(t){let m='Check the conventions of that form: its layout and features.';
 if(t==='marks')m='Scripts drop speech marks. The speaker name on the left shows who is talking.';
 if(t==='letter')m='A salutation and sign-off belong to a letter. A script uses speaker names and stage directions.';
 if(t==='sincere')m="'Yours sincerely' goes with a named reader. 'Dear Sir or Madam' means the name is not known: 'Yours faithfully'.";
 if(t==='love')m="'Love from' is for family and friends. An unknown official gets 'Yours faithfully'.";
 if(t==='faith')m="You named Ms Patel, so it is 'Yours sincerely'. 'Faithfully' pairs with 'Dear Sir or Madam'.";
 if(t==='chat')m="'See ya' is far too informal for a formal letter. Match the register: 'Yours sincerely'.";
 if(t==='readout')m='Reading out a full script sounds flat and loses eye contact. Notes are short prompts you glance at.';
 if(t==='para')m='A long paragraph is hard to find your place in while speaking. Use short bullet points.';
 if(t==='the')m='Ending on "the" leaves the line hanging on a small word. "drumming" is a stronger ending.';
 if(t==='on')m='Ending on "on" breaks the phrase "on the roof" in a weak place. End on "drumming".';
 if(t==='emoji')m='Emojis are informal. A letter to the council needs a formal register.';
 if(t==='txt')m='Text speak breaks the formal register. Write words in full, in complete sentences.';
 if(t==='quote')m='Speech marks show spoken words in a story, not actions, and scripts do not use them at all.';
 if(t==='said')m='Scripts have no "he said". Actions go in brackets as stage directions.';return m}
function ask(){q++;const[qq,ops]=QS[q%QS.length],turn=(q+1)%3;box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');[...ops.slice(turn),...ops.slice(0,turn)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});speak('Challenge: '+qq);paintNow()}
function judge(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(ok?`✓ Yes! ${run} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.8,tall:1.25,draw:paint,onStep:A=>{box.hidden=A.step!==5;bar.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
