/* Flagship: poetic forms and conventions (11-14). Rhyme scheme (Wordsworth), iambic pentameter (Gray), sonnet forms
   and the volta, end-stopping and enjambment (Whitman), alliteration and internal rhyme (Coleridge). Public domain. */
(()=>{
const STZ=[['I wandered lonely as a cloud','cloud',0],["That floats on high o'er vales and hills",'hills',1],['When all at once I saw a crowd','crowd',0],
 ['A host, of golden daffodils;','daffodils',1],['Beside the lake, beneath the trees,','trees',2],['Fluttering and dancing in the breeze.','breeze',2]];
const SCAN=[['The','cur','few','tolls','the','knell','of','part','ing','day'],['And','all','the','air','a','sol','emn','still','ness','holds']];
const WH='I celebrate myself, and sing myself, And what I assume you shall assume, For every atom belonging to me as good belongs to you.'.split(' ');
const CUTS=[2,4,5,9,12,15,18,20];
const COL=['The','fair','breeze','blew,','the','white','foam','flew,','The','furrow','followed','free;'],FW=[1,6,7,9,10,11],IR=[3,7];
const FORMS={sh:{n:'Shakespearean',plan:[4,4,4,2],turn:12},pe:{n:'Petrarchan',plan:[8,6],turn:8}};
const BLOCK={4:'quatrain',2:'couplet',8:'octave',6:'sestet'},TINT=['#1d4ed8','#7e22ce','#0f766e','#b91c1c'],LET='ABCDEFG';
VIS.reg('flagmetre',c=>{let A,box,cq,n=-1,row=0;const P={};
const sn=()=>A.step,note=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sfx=k=>A.sound[k](),both=()=>{A.redraw();ui()};
function T(t,x,y,px,col,al,wt){const g=A.ctx;g.font=`${wt||700} ${px}px Georgia,serif`;g.textAlign=al||'left';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,al==='center'?A.W-12:al==='right'?x-6:A.W-x-6)}
function tile(x,y,w,h,fill,t,px,ring){const g=A.ctx;A.paint.rrect(x,y,w,h,8);g.fillStyle=fill;g.fill();g.lineWidth=ring?3.5:1.5;g.strokeStyle=ring?(A.col.dark?'#fde047':'#111827'):A.alpha(A.col.tx,.5);g.stroke();
 if(t){g.font=`800 ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(t,x+w/2,y+h/2+1,w-4)}}
const F=()=>A.narrow?14:16,base=()=>A.col.dark?'#334155':'#475569';
/* ---- 0: rhyme scheme ---- */
function d0(g,C){const lh=Math.min(46,A.H/7.2),y0=lh*.7;STZ.forEach(([t,e],i)=>{const y=y0+i*lh,on=i===P.cur,lab=P.lab[i];
 A.paint.rrect(6,y-lh/2+3,A.W-12,lh-6,10);g.fillStyle=on?A.alpha(C.ac,.16):A.alpha(C.tx,.04);g.fill();if(on){g.strokeStyle=C.ac;g.lineWidth=2;g.stroke()}
 tile(12,y-15,34,30,lab==null?C.pn:TINT[lab],lab==null?'':LET[lab],16);if(lab==null){g.strokeStyle=A.alpha(C.tx,.5);g.setLineDash([4,3]);A.paint.rrect(12,y-15,34,30,8);g.stroke();g.setLineDash([])}
 T(t,54,y,F(),C.tx)});T(P.cur<6?'Line '+(P.cur+1)+': which letter?':'Scheme: '+P.lab.map(i=>LET[i]).join(''),A.W/2,A.H-16,15,C.tx,'center',800)}
function letter(k){if(sn()!==0||P.cur>=6)return;const i=P.cur,want=STZ[i][2],used=Math.max(-1,...P.lab.slice(0,i));
 if(k===want){P.lab[i]=k;P.cur++;sfx('pop');note(P.cur<6?`Yes: "${STZ[i][1]}" is ${LET[k]}.`+(k<=used?` It rhymes with an earlier ${LET[k]} line.`:' A new end sound gets a new letter.'):'ABABCC: two alternating rhymes, then a rhyming couplet to close the stanza.');both();P.want();return}
 sfx('miss');let m;if(k>used+1)m=`Use letters in order. The next new sound would be ${LET[used+1]}.`;
 else if(k>want)m=`"${STZ[i][1]}" is not a new sound: it rhymes with "${STZ[STZ.findIndex(s=>s[2]===want)][1]}", so it takes ${LET[want]}.`;
 else m=`Listen to the end sound: "${STZ[i][1]}" does not rhyme with "${STZ[STZ.findIndex(s=>s[2]===k)][1]}".`;note(m)}
/* ---- 1: scansion ---- */
function geo1(){const gap=6,w=(A.W-gap*7)/6,h=Math.min(52,A.H*.12);return SCAN[0].map((_,i)=>({i,x:gap+(i<6?i:i-5)*(w+gap),y:A.H*.2+(i<6?0:h+38),w,h}))}
function d1(g,C){const L=SCAN[P.ln%2];T(`Line ${P.ln%2+1}: ${L.join(' ').replace(/ (few|ing|emn|ness)/g,'$1')}`,A.W/2,A.H*.08,F(),C.tx,'center');
 geo1().forEach(b=>{const on=P.st[b.i];tile(b.x,b.y,b.w,b.h,on?'#b91c1c':base(),L[b.i],A.narrow?15:17,0);T(on?'/':'×',b.x+b.w/2,b.y-12,18,on?(C.dark?'#fca5a5':'#b91c1c'):C.mu,'center',900)});
 if(P.ok){g.strokeStyle=C.dark?'#fde047':'#a16207';g.lineWidth=3;geo1().forEach(b=>{if(b.i%2){g.beginPath();g.moveTo(b.x-geo1()[0].w-4,b.y+b.h+8);g.lineTo(b.x+b.w,b.y+b.h+8);g.stroke()}});T('5 iambs (×/) = iambic pentameter',A.W/2,A.H*.82,15,C.tx,'center',800)}
 T(`Stressed: ${P.st.filter(Boolean).length} of 10 syllables`,A.W/2,A.H*.93,14,C.mu,'center')}
function mark(i){if(sn()!==1||P.ok)return;P.st[i]=!P.st[i];sfx('tick');note(`${SCAN[P.ln%2][i]}: ${P.st[i]?'stressed':'unstressed'}.`);A.redraw()}
function scan(){if(sn()!==1||P.ok)return;const bad=P.st.map((s,i)=>s!==(i%2===1)).reduce((a,b)=>a+b,0),k=P.st.filter(Boolean).length;
 if(!bad){P.ok=1;P.done++;sfx('pop');note(`Every second syllable is stressed: ×/ ×/ ×/ ×/ ×/. That is 5 iambs, so 10 syllables but 5 feet.`+(P.done<2?' Try the next line.':''));both();if(P.done<2)setTimeout(()=>{if(sn()===1){P.ln++;P.ok=0;P.st=Array(10).fill(false);both()}},A.reduced()?50:900);P.want();return}
 sfx('miss');let m=k===5?`Right number of stresses, but ${bad/2} in the wrong place. Say it as da-DUM: the stress falls on syllables 2, 4, 6, 8 and 10.`:
  k<5?`Only ${k} stresses. Pentameter has 5 beats: say the line aloud and tap each loud syllable.`:`${k} stresses is too many. Small words like "the", "of" and "a" are usually unstressed.`;note(m)}
/* ---- 2: sonnets ---- */
function form(){return FORMS[P.f]}
function d2(g,C){const bh=Math.min(22,(A.H-70)/15.5),y0=34;T(`Build a ${form().n} sonnet`,A.W/2,16,F(),C.tx,'center',800);let line=0;
 P.blocks.forEach((b,k)=>{for(let j=0;j<b;j++){const y=y0+line*bh,ch=P.f==='sh'?LET[Math.floor(line/4)*2+(line>=12?0:line%2)]:line<8?'ABBAABBA'[line]:'CDECDE'[line-8];
  A.paint.rrect(70,y,A.W-120,bh-3,5);g.fillStyle=TINT[k%4];g.fill();T(String(line+1),58,y+bh/2,12,C.mu,'right');T(ch,A.W-40,y+bh/2,13,C.tx,'center',800);line++}
  T(BLOCK[b]||'',78,y0+(line-b)*bh+bh/2-1,12,'#fff','left',800)});
 if(P.turn!=null){const y=y0+P.turn*bh-2;g.strokeStyle=C.dark?'#fde047':'#a16207';g.lineWidth=4;g.beginPath();g.moveTo(60,y);g.lineTo(A.W-48,y);g.stroke();T('volta',4,y,12,C.tx,'left',800)}
 T(`${P.blocks.reduce((a,b)=>a+b,0)} of 14 lines`,A.W/2,A.H-14,14,C.mu,'center')}
const total=()=>P.blocks.reduce((a,b)=>a+b,0);
function add(b){if(sn()!==2||P.built)return;if(total()+b>14){sfx('miss');note(`That makes ${total()+b} lines. A sonnet has exactly 14.`);return}
 const plan=form().plan,k=P.blocks.length;if(plan[k]!==b){sfx('miss');note(P.f==='sh'?(b===2?'The couplet comes last: build three quatrains first.':`A ${form().n} sonnet is made of quatrains and a final couplet, not a ${BLOCK[b]}.`):`A Petrarchan sonnet has two parts: an octave of 8 lines, then a sestet of 6.`);return}
 P.blocks.push(b);sfx('pop');if(total()===14){P.built=1;note(`14 lines! Now tap the line where the argument turns: the volta.`)}else note(`${BLOCK[b]} added: ${total()} lines.`);both()}
function turn(i){if(sn()!==2||!P.built||P.fin)return;P.turn=i;const want=form().turn;
 if(i===want){sfx('pop');P.fin=1;P.solved++;note(P.f==='sh'?'Yes: the turn comes at the closing couplet, line 13, which often sums up or twists the argument.':'Yes: the volta comes after the octave, at line 9, where the sestet answers the problem.');both();
  if(P.solved<2)setTimeout(()=>{if(sn()===2){Object.assign(P,{f:'pe',blocks:[],built:0,fin:0,turn:null});note('Now build a Petrarchan sonnet.');both()}},A.reduced()?50:900);P.want();return}
 sfx('miss');note(`Line ${i+1} is inside a block. The volta comes where the form changes: ${P.f==='sh'?'at the final couplet':'between the octave and the sestet'}.`);A.redraw()}
/* ---- 3: line breaks ---- */
function lines3(){const out=[[]];WH.forEach((w,i)=>{out[out.length-1].push(i);if(P.br.has(i)&&i<WH.length-1)out.push([])});return out}
function lay3(){const px=F(),g=A.ctx;g.font=`700 ${px}px Georgia,serif`;const pos=[];let y=28;const tags=[];
 lines3().forEach((L,li)=>{let x=14;L.forEach(i=>{const w=g.measureText(WH[i]).width+12;if(x+w>A.W-8){x=34;y+=34}pos[i]={x,y,w,h:28};x+=w+4});
  const last=WH[L[L.length-1]],mid=L.slice(0,-1).some(i=>/[,;.]$/.test(WH[i]));tags.push({y:y+21,end:/[,;.]$/.test(last),mid,li});y+=52});return{pos,tags}}
function d3(g,C){const{pos,tags}=lay3();WH.forEach((w,i)=>{const p=pos[i];A.paint.rrect(p.x,p.y-p.h/2,p.w,p.h,7);g.fillStyle=P.br.has(i)?A.alpha(C.ac,.25):A.alpha(C.tx,.06);g.fill();
  if(P.br.has(i)){g.strokeStyle=C.ac;g.lineWidth=2;g.stroke()}T(w,p.x+6,p.y+1,F(),C.tx)});
 tags.forEach(t=>{const lab=t.li===tags.length-1?'end-stopped':t.end?'end-stopped':'enjambed';A.paint.label(lab+(t.mid?' · caesura ‖':''),14,t.y,{align:'left',bg:lab==='enjambed'?'#7e22ce':'#0f766e',font:'800 12px system-ui,sans-serif'})})}
function cut(i){if(sn()!==3||i>=WH.length-1)return;if(!P.br.has(i)&&P.br.size>=4){note('Five lines is plenty for this sentence. Join a line first.');return}P.br.has(i)?P.br.delete(i):P.br.add(i);sfx('tick');const L=lines3(),tg=lay3().tags,enj=tg.slice(0,-1).filter(t=>!t.end).length;
 note(`${L.length} line${L.length>1?'s':''}. `+(P.br.has(i)?(/[,;.]$/.test(WH[i])?`The break after "${WH[i]}" falls at a pause: end-stopped.`:`The break after "${WH[i]}" cuts the sentence: the line runs on, so it is enjambed.`):'Break removed.')+(enj?'':' No enjambed line yet.'));both();P.want()}
function ok3(){const tg=lay3().tags;return tg.length>=3&&tg.slice(0,-1).some(t=>!t.end)&&tg.some(t=>t.end)}
/* ---- 4: sound ---- */
function lay4(){const g=A.ctx,px=A.narrow?17:20;g.font=`700 ${px}px Georgia,serif`;let x=14,y=A.H*.22;return COL.map((w,i)=>{if(i===8){x=14;y+=A.H*.2}const ww=g.measureText(w).width+16;if(x+ww>A.W-8){x=14;y+=48}const r={x,y,w:ww,h:38};x+=ww+6;return r})}
function d4(g,C){T(P.ph?'Find the internal rhyme in line 1':'Find the alliteration on the f sound',A.W/2,A.H*.08,F(),C.tx,'center',800);
 lay4().forEach((r,i)=>{const f=P.f4.has(i),ir=P.ir.has(i);tile(r.x,r.y-r.h/2,r.w,r.h,ir?'#7e22ce':f?'#0f766e':base(),COL[i],A.narrow?16:18)});
 T(`f words: ${P.f4.size} of 6`+(P.ph?`   rhyme: ${P.ir.size} of 2`:''),A.W/2,A.H*.85,15,C.tx,'center',700);T('Coleridge, The Rime of the Ancient Mariner (1798)',A.W/2,A.H*.94,12,C.mu,'center')}
function word(i){if(sn()!==4)return;const w=COL[i].replace(/\W/g,'');
 if(!P.ph){if(FW.includes(i)){if(!P.f4.has(i)){P.f4.add(i);sfx('pop')}note(P.f4.size<6?`"${w}" starts with f. ${6-P.f4.size} more.`:'All 6! The repeated f sound is alliteration: it sounds like wind filling the sails. Now find two words in line 1 that rhyme.');if(P.f4.size===6)P.ph=1}
  else{sfx('miss');note(/^b/.test(w)?`"${w}" alliterates too, but on b. Look for words that start with the f sound.`:`"${w}" does not start with an f sound.`)}}
 else{if(IR.includes(i)){P.ir.add(i);sfx('pop');note(P.ir.size<2?`"${w}"... which other word in line 1 rhymes with it?`:'Blew and flew rhyme inside one line: internal rhyme. It speeds the line up like the ship.')}else{sfx('miss');note(FW.includes(i)?`"${w}" alliterates, but it does not rhyme. Listen for the same ending sound inside line 1.`:`"${w}" does not rhyme with another word in line 1.`)}}
 both();P.want()}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);[d0,d1,d2,d3,d4,d0][sn()](g,C);A.fx.draw(g)}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const s=sn();if(s===0){const lh=Math.min(46,A.H/7.2),i=Math.floor((p.y-lh*.7+lh/2)/lh);if(i>=0&&i<6&&i!==P.cur)note(i<P.cur?`Line ${i+1} is done.`:`Label line ${P.cur+1} first: work down in order.`)}
 if(s===1){const b=geo1().find(b=>hit(p,b));if(b)mark(b.i)}
 if(s===2&&P.built){const bh=Math.min(22,(A.H-70)/15.5),i=Math.floor((p.y-34)/bh);if(i>=0&&i<14)turn(i)}
 if(s===3){const{pos}=lay3();const i=pos.findIndex(r=>r&&hit(p,{x:r.x,y:r.y-r.h/2,w:r.w,h:r.h}));if(i>=0)cut(i)}
 if(s===4){const i=lay4().findIndex(r=>hit(p,{x:r.x,y:r.y-r.h/2,w:r.w,h:r.h}));if(i>=0)word(i)}return false}
function ui(){if(!box)return;box.innerHTML='';const s=sn(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},box,t).onclick=f};
 if(s===0)['A','B','C','D'].forEach((t,k)=>b(t,()=>letter(k),`Letter ${t} for line ${P.cur+1}`));
 if(s===1){SCAN[P.ln%2].forEach((t,i)=>b(t,()=>mark(i),`Syllable ${i+1}, ${t}: toggle stress`));b('Check the metre',scan)}
 if(s===2){if(!P.built)[4,2,8,6].forEach(k=>b(`Add a ${BLOCK[k]} (${k})`,()=>add(k)));else[5,9,13].forEach(k=>b(`Volta at line ${k}`,()=>turn(k-1)));b('Start again',()=>{Object.assign(P,{blocks:[],built:0,fin:0,turn:null});both()})}
 if(s===3)CUTS.forEach(i=>b(`${P.br.has(i)?'Join':'Break'} after "${WH[i]}"`,()=>cut(i)));
 if(s===4)COL.forEach((t,i)=>b(t.replace(/\W/g,''),()=>word(i),`Word ${i+1}: ${t.replace(/\W/g,'')}`))}
const gate=(k,cond,msg)=>()=>{if(sn()===k&&cond()&&(!steps[k].predict||A.pred[k]!=null))A.done(msg+A.reveal(k))};
function demo(k,acts,ms){steps[k].go();const id=++row;acts.forEach((f,j)=>setTimeout(()=>{if(id===row)f()},A.reduced()?25*(j+1):(j+1)*(ms||300)))}
function reset(){row++;for(const k in P)delete P[k];Object.assign(P,{want:()=>{},cur:0,lab:[],ln:0,st:Array(10).fill(false),ok:0,done:0,f:'sh',blocks:[],built:0,fin:0,turn:null,solved:0,br:new Set(),f4:new Set(),ir:new Set(),ph:0})}
const odd=[1,3,5,7,9];
const steps=[
{h:'Rhyme scheme',p:'A rhyme scheme gives each new end sound a letter. Lines that rhyme share a letter. Label each line of Wordsworth\u2019s first stanza.',
 predict:{q:'In a rhyme scheme, what does a second A tell you?',opts:['The line rhymes with the first A line','It is the second line','The line is stressed'],ans:0},task:'Give all 6 lines a rhyme letter',
 show:()=>demo(0,[0,1,0,1,2,2].map(k=>()=>letter(k)),380),
 go:()=>{reset();note('Line 1 ends with "cloud". A new sound gets A.');ui();P.want=gate(0,()=>P.cur===6,'ABABCC: alternate rhymes, then a couplet.')}},
{h:'Stress and metre',p:'Metre is the beat pattern of a line. An iamb is one unstressed then one stressed syllable: da-DUM. Five iambs make iambic pentameter.',
 predict:{q:'How many syllables are in a line of iambic pentameter?',opts:['5','10','14'],ans:1},task:'Mark the stressed syllables in 2 lines of Gray\u2019s Elegy, then check',
 show:()=>demo(1,[...odd.map(i=>()=>mark(i)),scan,()=>{},()=>{},()=>{},...odd.map(i=>()=>mark(i)),scan],260),
 go:()=>{reset();note('Tap each syllable that you say more strongly.');ui();P.want=gate(1,()=>P.done>=2,'10 syllables, 5 stresses, 5 iambic feet.')}},
{h:'The sonnet',p:'A sonnet is a 14-line poem, usually in iambic pentameter. Its blocks of lines set up an argument, and the volta is the turn where it shifts.',
 predict:{q:'How many lines does a sonnet have?',opts:['10','14','16'],ans:1},task:'Build a Shakespearean and a Petrarchan sonnet and mark each volta',
 show:()=>demo(2,[()=>add(4),()=>add(4),()=>add(4),()=>add(2),()=>turn(12),()=>{},()=>{},()=>add(8),()=>add(6),()=>turn(8)],380),
 go:()=>{reset();note('Add blocks of lines to make 14.');ui();P.want=gate(2,()=>P.solved>=2,'Quatrains and a couplet, or an octave and a sestet: each turns at a fixed point.')}},
{h:'Line breaks',p:'Free verse has no regular metre or rhyme scheme, so line breaks do the work. An end-stopped line ends at a pause. An enjambed line runs on.',
 predict:{q:'A line that runs on into the next one with no pause is called…',opts:['enjambment','a caesura','a couplet'],ans:0},task:'Break Whitman\u2019s sentence into 3 or more lines: at least one end-stopped and one enjambed',
 show:()=>demo(3,[()=>cut(5),()=>cut(12),()=>cut(18)],500),
 go:()=>{reset();note('Tap a word to break the line after it.');ui();P.want=gate(3,ok3,'Breaks at a pause are end-stopped; breaks mid-sentence are enjambed. A pause inside a line is a caesura.')}},
{h:'Sound devices',p:'Poets pattern sounds as well as lines. Alliteration repeats the first sound of nearby words. Internal rhyme puts a rhyme inside one line.',
 predict:{q:'"Fair", "foam" and "flew" are an example of…',opts:['alliteration','internal rhyme','enjambment'],ans:0},task:'Find the 6 f words, then the internal rhyme in line 1',
 show:()=>demo(4,[...FW.map(i=>()=>word(i)),...IR.map(i=>()=>word(i))],330),
 go:()=>{reset();note('Tap every word that starts with the f sound.');ui();P.want=gate(4,()=>P.ir.size===2,'Alliteration and internal rhyme give the line its speed.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.want()});
const QS=[['How many syllables are in a regular line of iambic pentameter?',[['10','ok'],['5','feet'],['14','sonnet']]],
 ['Which rhyme scheme fits a Shakespearean sonnet?',[['ABAB CDCD EFEF GG','ok'],['ABBAABBA CDECDE','petr'],['AABB CCDD EEFF GG','pairs']]],
 ['Where is the volta in a Petrarchan sonnet?',[['between the octave and the sestet','ok'],['in the final couplet','shturn'],['in the first line','first']]],
 ['"Water, water, every where, / Nor any drop to drink." The first line ends at a comma. It is…',[['end-stopped','ok'],['enjambed','enj'],['a caesura','caes']]],
 ['What is a caesura?',[['a pause in the middle of a line','ok'],['a line that runs on','enj2'],['a two-line rhyme','coup']]],
 ['Which describes free verse?',[['no regular metre or rhyme scheme','ok'],['no line breaks at all','prose'],['always rhymes in couplets','pairs2']]],
 ['"The fair breeze blew, the white foam flew" uses which devices?',[['alliteration and internal rhyme','ok'],['only end rhyme','end'],['onomatopoeia','ono']]]];
function why(t){let m='Check the definition against the line itself.';
 if(t==='feet')m='5 is the number of feet. Each iamb has 2 syllables, so 5 feet make 10 syllables.';
 if(t==='sonnet')m='14 is the number of lines in a sonnet, not the syllables in a line.';
 if(t==='petr')m='ABBAABBA CDECDE is the Petrarchan pattern. Shakespeare uses three alternating quatrains and a couplet.';
 if(t==='pairs')m='Shakespeare\u2019s quatrains alternate (ABAB), not rhyme in pairs.';
 if(t==='shturn')m='The final couplet is the Shakespearean turn. Petrarch turns after line 8.';
 if(t==='first')m='The volta is a turn in the argument, so it comes after the problem is set up.';
 if(t==='enj')m='The comma marks a pause at the line end, so it is end-stopped, not enjambed.';
 if(t==='caes')m='A caesura is a pause inside a line. This pause is at the end of the line.';
 if(t==='enj2')m='A line that runs on is enjambment. A caesura is a pause within a line.';
 if(t==='coup')m='A two-line rhyme is a couplet. A caesura is a pause within a line.';
 if(t==='prose')m='Free verse still has line breaks. It drops regular metre and rhyme, not lines.';
 if(t==='pairs2')m='Rhyming couplets are a fixed pattern. Free verse has no set rhyme scheme.';
 if(t==='end')m='Blew and flew rhyme inside the line, so this is internal rhyme. Fair, foam and flew alliterate.';
 if(t==='ono')m='Onomatopoeia is a word that sounds like its meaning, such as buzz. Here the f sounds alliterate.';
 return m}
function ask(){n++;const[q,ops]=QS[n%QS.length],r=(n*2+2)%3;cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=cq.querySelector('.fl-pick');[...ops.slice(r),...ops.slice(0,r)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},g,o).onclick=()=>pick(t)});note('Challenge: '+q);A.redraw()}
let run=0;function pick(t){cq.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=cq.querySelector('.fl-fb'),y=t==='ok';
 if(y){run++;A.win()}else{run=0;sfx('miss')}fb.innerHTML=(y?`✓ Correct. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{cq.hidden=A.step!==5;box.hidden=A.step===5;ui()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);box=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down});ui()}});
A.start()})})();
