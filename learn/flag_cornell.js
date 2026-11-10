/* Flagship – taking useful notes (ages 11–12; Cornell notes, retrieval practice): key words, own words, clear shorthand,
   a Cornell page, cover and test yourself. Not flaggist (main ideas, ages 7–10). */
(()=>{const mn=Math.min,mx=Math.max;
const SRC='Bees carry pollen from flower to flower , which helps plants make seeds and fruit , so many of the crops that we eat depend on them .'.split(' ');
const KEY=['pollen','seeds','fruit','crops'],FILL=new Set(['and','from','to',',','which','helps','so','many','of','the','that','we','on','them','.']);
const PARA=[['Bee numbers have fallen in some places because of habitat loss, pesticides and disease.','Bees ↓ in places: lost habitat, pesticides, disease','Bees are dying out everywhere because of pesticides',[0,1,2]],
 ['Honeybees tell each other where food is by doing a waggle dance.','Honeybees dance to show where food is','Honeybees dance when they are happy',[2,0,1]],
 ['One honeybee colony can hold tens of thousands of worker bees.','1 colony = tens of 1000s of workers','A colony has about 100 bees',[1,2,0]]].map(([t,ok,mean,o])=>{const c=[[t,'copy'],[ok,'ok'],[mean,'mean']];return[t,...o.map(i=>c[i])]});
const TOK=[['bees','b',0],['carry pollen','carry p.',0],['from flower to flower','flower → flower',1],['and this leads to','→',1],['more','↑',1],['seeds and fruit','seeds + fruit',1]],LIMIT=52;
const PIECE=[['Why do bees matter?',0],['carry pollen → seeds + fruit; many crops depend on them',1],['What harms bees?',0],['↓ in places: habitat loss, pesticides, disease',1],['Bees pollinate crops we need, but their numbers are falling in places.',2]];
const ZONE=['Cue questions','Notes','Summary'];
const ZMISS=['Questions go in the cue column, for testing yourself later.','The notes column holds the short facts from the lesson.','The summary sums up the page in a sentence or two, written last.'];
const QUIZ=[['Why do bees matter?',['They carry pollen, so crops make seeds and fruit','They make honey for people','They sting pests'],0],['What harms bees?',['Rain and cold winters only','Habitat loss, pesticides and disease','Too many flowers'],1],['How do honeybees share where food is?',['By buzzing loudly','By leaving a smell trail only','By doing a waggle dance'],2]];
VIS.reg('flagcornell',c=>{let A,au,row,quiz,qn=-1,gen=0;const N={};
const INK='#0f172a',OK='#047857',NO='#b91c1c',GREY='#64748b',SEL='#4338ca',Z=['#ede9fe','#f0fdf4','#fef9c3'];
const fo=(n,w)=>`${w||700} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.15);
const stage=()=>['pick','para','short','page','test','chal'][A.step];
const mid=g=>{g.textAlign='center';g.textBaseline='middle'};
function base(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function lines(t,w,n){const g=A.ctx;g.font=fo(n);const L=[];let s='';for(const v of t.split(' ')){const tr=s?s+' '+v:v;if(g.measureText(tr).width>w&&s){L.push(s);s=v}else s=tr}L.push(s);return L}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.ok||o.bad||o.on?3.5:1.5;g.strokeStyle=o.ok?OK:o.bad?NO:o.on?SEL:GREY;g.stroke();
 let n=sz(o.n||13),L=lines(t,r.w-14,n);while(L.length*(n+4)>r.h-6&&n>9){n--;L=lines(t,r.w-14,n)}g.fillStyle=INK;g.font=fo(n);mid(g);L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*(n+4)))}
function head(t,ok,bad){const g=A.ctx;let n=sz(13);g.font=fo(n,800);let w=g.measureText(t).width+22;while(w>A.W-10&&n>9){n--;g.font=fo(n,800);w=g.measureText(t).width+22}const x=A.W/2-w/2,y=6;
 g.fillStyle='#fff';A.paint.rrect(x,y,w,n+14,10);g.fill();g.lineWidth=ok||bad?3:1.5;g.strokeStyle=ok?OK:bad?NO:GREY;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,A.W/2,y+(n+14)/2+1)}
function zbox(r,j,bad){const g=A.ctx;g.fillStyle=Z[j];A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=bad?NO:GREY;g.lineWidth=bad?3:1.5;g.stroke();g.fillStyle=INK;g.font=fo(sz(12),800);g.textAlign='left';g.textBaseline='top';g.fillText(ZONE[j],r.x+6,r.y+5)}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. key words, not every word */
function chips(){const g=A.ctx,n=sz(A.narrow?14:16),out=[];g.font=fo(n);let x=10,y=A.H*.16;SRC.forEach((w,i)=>{const ww=g.measureText(w).width+16;if(x+ww>A.W-10){x=10;y+=n+20}out.push({i,w,x,y,ww,h:n+12,n});x+=ww+6});return out}
function drawPick(){const s=N.k,g=A.ctx;base();const got=KEY.every(k=>s.on.some(i=>SRC[i]===k)),done=got&&s.on.length<=8;head(done?'Note made: '+s.on.length+' words':`Your note: ${s.on.length} words (8 or fewer, all key ideas)`,done,s.on.length>8);
 chips().forEach(r=>{const on=s.on.includes(r.i);g.fillStyle=on?'#e0e7ff':'#fff';A.paint.rrect(r.x,r.y,r.ww,r.h,8);g.fill();g.lineWidth=on||s.bad===r.i?3:1;g.strokeStyle=on?SEL:s.bad===r.i?NO:GREY;g.stroke();g.fillStyle=INK;g.font=fo(r.n);mid(g);g.fillText(r.w,r.x+r.ww/2,r.y+r.h/2+1)});
 card({x:10,y:A.H*.72,w:A.W-20,h:A.H*.22},s.on.length?'Notes: '+s.on.slice().sort((a,b)=>a-b).map(i=>SRC[i]).join(' · '):'Notes: (tap words to add them)',{bg:Z[1],ok:done,n:14})}
function pick(i){const s=N.k,w=SRC[i];if(s.on.includes(i)){s.on=s.on.filter(x=>x!==i);au.tick();return say(`${w} taken out.`)}
 if(FILL.has(w)){s.bad=i;au.miss();return say(`"${w}" carries no meaning on its own. Notes keep the words that hold the idea.`)}
 s.on.push(i);s.bad=null;au.tick();const got=KEY.filter(k=>s.on.some(j=>SRC[j]===k)).length;
 say(s.on.length>8?`${s.on.length} words: that is copying. Take out words you would not miss.`:`${w} added. Key ideas: ${got} of 4.`+(got===4&&s.on.length<=8?' A short note with every key idea.':''))}
/* 2. own words, same meaning */
const opts=()=>{const h=mn(74,A.H*.17);return[0,1,2].map(i=>({i,x:10,y:A.H*.36+i*(h+8),w:A.W-20,h}))};
function drawPara(){const s=N.p;base();if(s.k>=3){head('3 notes written',1);card({x:10,y:A.H*.3,w:A.W-20,h:A.H*.4},'Own words make you think. Copying feels safe but you learn less.',{bg:Z[1],n:15});return}
 const q=PARA[s.k];head(`Sentence ${s.k+1} of 3: drag the best note up, or tap it`);card({x:10,y:A.H*.12,w:A.W-20,h:A.H*.2},'Text: '+q[0],{bg:'#f1f5f9',n:14});
 opts().forEach(r=>{if(N.drag&&N.drag.i===r.i)return;card(r,q[1+r.i][0],{bad:s.bad===r.i})});if(N.drag){const d=N.drag,r=opts()[d.i];card({...r,x:d.x-r.w/2,y:d.y-r.h/2},q[1+d.i][0],{on:1})}}
function choose(i){const s=N.p;if(s.k>=3)return;const [t,kind]=PARA[s.k][1+i];
 if(kind==='copy'){s.bad=i;au.miss();return say('Copied word for word: it looks complete, but you did not think, so it sticks less.')}
 if(kind==='mean'){s.bad=i;au.miss();return say('New words, but the meaning changed. Check the text: '+PARA[s.k][0])}
 s.k++;s.bad=null;au.pop();say('Yes: short, in your own words, and it keeps the meaning.'+(s.k>=3?' 3 done.':''))}
/* 3. shorthand you can still read */
function tokR(){const g=A.ctx,n=sz(15),out=[];g.font=fo(n,800);let x=10,y=A.H*.3;TOK.forEach((t,i)=>{const w=g.measureText(N.s.alt[i]?t[1]:t[0]).width+20;if(x+w>A.W-10){x=10;y+=n+26}out.push({i,x,y,w,h:n+16,n});x+=w+8});return out}
const noteText=()=>TOK.map((t,i)=>N.s.alt[i]?t[1]:t[0]).join(' ');
function drawShort(){const s=N.s,g=A.ctx;base();const len=noteText().length,bad=TOK.some((t,i)=>s.alt[i]&&!t[2]),ok=len<=LIMIT&&!bad;
 head(ok?`${len} characters and still clear`:`Tap phrases to shorten: ${len} characters (aim ${LIMIT})`,ok,bad);
 tokR().forEach(r=>{const a=s.alt[r.i],unclear=a&&!TOK[r.i][2];g.fillStyle=unclear?'#fee2e2':a?'#dcfce7':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=unclear||a?3:1.5;g.strokeStyle=unclear?NO:a?OK:GREY;g.stroke();
  g.fillStyle=INK;g.font=fo(r.n,800);mid(g);g.fillText(a?TOK[r.i][1]:TOK[r.i][0],r.x+r.w/2,r.y+r.h/2+1)});
 const w=A.W-20,bx=10,by=A.H*.8;g.fillStyle=A.col.dark?'#334155':'#e2e8f0';g.fillRect(bx,by,w,16);g.fillStyle=len<=LIMIT?OK:'#d97706';g.fillRect(bx,by,w*mn(1,len/76),16);g.strokeStyle=A.col.tx;g.beginPath();g.moveTo(bx+w*LIMIT/76,by-6);g.lineTo(bx+w*LIMIT/76,by+22);g.stroke();
 g.fillStyle=A.col.tx;g.font=fo(sz(11));g.textAlign='left';g.textBaseline='top';g.fillText('length of the note',bx,by+22)}
function flip(i){const s=N.s;s.alt[i]=!s.alt[i];const t=TOK[i];au.tick();if(s.alt[i]&&!t[2]){au.miss();return say(`"${t[1]}": next week will you know what it meant? Keep key words whole.`)}
 const len=noteText().length;say(s.alt[i]?`${t[0]} becomes ${t[1]}. ${len} characters.`:`${t[0]} written out again. ${len} characters.`)}
/* 4. the Cornell page */
function zones(){const top=A.H*.3,h=A.H*.44,cw=A.W*.34;return[{x:8,y:top,w:cw,h},{x:14+cw,y:top,w:A.W-22-cw,h},{x:8,y:top+h+6,w:A.W-16,h:A.H-top-h-12}]}
const pieceR=()=>({x:20,y:A.H*.09,w:A.W-40,h:A.H*.17});
function drawPage(){const s=N.c,g=A.ctx;base();zones().forEach((r,j)=>{zbox(r,j,s.bad===j);let y=r.y+24;g.font=fo(sz(11));
  PIECE.slice(0,s.k).filter(p=>p[1]===j).forEach(p=>lines(p[0],r.w-12,sz(11)).forEach(l=>{if(y<r.y+r.h-6){g.fillText(l,r.x+6,y);y+=sz(11)+3}}))});
 if(s.k>=PIECE.length){head('Cornell page complete',1);return}head(`Piece ${s.k+1} of ${PIECE.length}: drag it to its place`);
 const r=pieceR(),d=N.drag;card(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,PIECE[s.k][0],{on:!!d,n:14})}
function place(j){const s=N.c;if(s.k>=PIECE.length)return;const [t,z]=PIECE[s.k];if(j!==z){s.bad=j;au.miss();return say(ZMISS[z])}
 s.k++;s.bad=null;au.pop();say(`Into ${ZONE[j]}.`+(s.k>=PIECE.length?' Questions on the left, notes on the right, a summary at the bottom.':''))}
/* 5. cover and test yourself */
const coverR=()=>{const z=zones()[1];return{x:z.x,y:z.y,w:z.w,h:z.h}};
const cueR=()=>{const z=zones()[0],h=mn(70,(z.h-30)/3);return QUIZ.map((q,i)=>({i,x:z.x+4,y:z.y+26+i*(h+4),w:z.w-8,h}))};
const ansR=()=>{const z=zones()[2],w=(A.W-28)/3;return[0,1,2].map(i=>({i,x:8+i*(w+6),y:z.y+4,w,h:z.h-8}))};
function drawTest(){const s=N.t,g=A.ctx;base();const done=s.got.length>=3;head(done?'3 answered from memory':s.cover?'Notes covered. Tap a cue question, then answer':'First cover the notes: drag the cover or tap it',done);
 const Zs=zones();[0,1].forEach(j=>zbox(Zs[j],j));
 g.font=fo(sz(11));let y=Zs[1].y+24;[PIECE[1][0],PIECE[3][0],'waggle dance = where food is'].forEach(t=>lines(t,Zs[1].w-12,sz(11)).forEach(l=>{g.fillStyle=INK;g.textAlign='left';g.fillText(l,Zs[1].x+6,y);y+=sz(11)+4}));
 if(s.cover){const r=coverR(),x=r.x+(N.drag&&N.drag.cov?mn(0,N.drag.x-N.drag.x0):0);g.fillStyle='#334155';A.paint.rrect(x,r.y,r.w,r.h,10);g.fill();g.fillStyle='#fff';g.font=fo(sz(13),800);mid(g);g.fillText('covered',x+r.w/2,r.y+r.h/2)}
 else{const r=coverR();g.setLineDash([6,5]);g.strokeStyle=SEL;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.setLineDash([])}
 cueR().forEach(r=>card(r,QUIZ[r.i][0],{ok:s.got.includes(r.i),on:s.q===r.i,n:12}));
 if(s.q!=null)ansR().forEach(r=>card(r,QUIZ[s.q][1][r.i],{bad:s.bad===r.i,n:12}))}
function cover(on){N.t.cover=on;au.tick();say(on?'Notes covered. Now answer from memory.':'Notes showing.')}
function cue(i){const s=N.t;if(s.got.includes(i))return;if(!s.cover){au.miss();return say('Cover the notes first, or you are only rereading, not testing yourself.')}s.q=i;s.bad=null;au.tick();say(QUIZ[i][0])}
function answer(j){const s=N.t;if(s.q==null)return;const [q,o,a]=QUIZ[s.q];if(j!==a){s.bad=j;au.miss();return say('Not quite. A wrong try still helps memory. Have another go.')}
 s.got.push(s.q);s.q=null;s.bad=null;au.pop();say(`Right: ${o[a]}.`+(s.got.length>=3?' Answering from memory makes it stick better than rereading.':''))}
function draw(){const k=stage();if(k==='chal'){base();head('Challenge',1);card({x:20,y:A.H*.35,w:A.W-40,h:A.H*.25},'Key words, own words, clear shorthand, cue questions, summary, test yourself',{n:14});return}
 ({pick:drawPick,para:drawPara,short:drawShort,page:drawPage,test:drawTest})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='pick'){const r=chips().find(r=>p.x>=r.x&&p.x<=r.x+r.ww&&p.y>=r.y-3&&p.y<=r.y+r.h+3);if(r)pick(r.i);return false}
 if(k==='para'&&N.p.k<3){const r=opts().find(r=>hit(p,r));if(r){N.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='short'){const r=tokR().find(r=>hit(p,r));if(r)flip(r.i);return false}
 if(k==='page'&&N.c.k<PIECE.length){if(hit(p,pieceR())){N.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const j=zones().findIndex(z=>hit(p,z));if(j>=0)place(j);return false}
 if(k==='test'){const s=N.t;if(s.q!=null){const a=ansR().find(r=>hit(p,r));if(a){answer(a.i);return false}}const c2=cueR().find(r=>hit(p,r));if(c2){cue(c2.i);return false}
  if(hit(p,coverR())||hit(p,{x:A.W*.4,y:0,w:A.W*.6,h:A.H})){N.drag={cov:1,x:p.x,x0:p.x,y0:p.y};return true}}return false}
function move(p){const d=N.drag;if(!d)return;d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=N.drag;if(!d)return;N.drag=null;const k=stage(),tap=Math.hypot(p.x-d.x0,p.y-(d.y0||p.y))<10;
 if(k==='para'){if(tap||p.y<A.H*.34)choose(d.i);else A.redraw();return}
 if(k==='page'){const j=zones().findIndex(z=>hit(p,z));if(j>=0)place(j);else A.redraw();return}
 if(k==='test'){if(tap)cover(!N.t.cover);else if(p.x-d.x0<-40&&N.t.cover)cover(false);else if(!N.t.cover)cover(true);else A.redraw()}}
function fresh(){gen++;for(const k in N)delete N[k];Object.assign(N,{k:{on:[],bad:null},p:{k:0,bad:null},s:{alt:TOK.map(()=>false)},c:{k:0,bad:null},t:{cover:false,q:null,got:[],bad:null},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();N.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();say(desc);N.hook=watch(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function btns(){if(!row)return;row.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},row,t).onclick=f};
 if(k==='pick')SRC.forEach((w,i)=>{if(!/^[,.]$/.test(w))B((N.k.on.includes(i)?'✓ ':'')+w,()=>pick(i),`${N.k.on.includes(i)?'Remove':'Add'} the word ${w}`)});
 if(k==='para'&&N.p.k<3)PARA[N.p.k].slice(1).forEach((o,i)=>B(`Note ${i+1}`,()=>choose(i),`Use note ${i+1}: ${o[0]}`));
 if(k==='short')TOK.forEach((t,i)=>B(N.s.alt[i]?t[1]:t[0],()=>flip(i),`Swap ${t[0]} and ${t[1]}`));
 if(k==='page'&&N.c.k<PIECE.length)ZONE.forEach((z,j)=>B(z,()=>place(j),`Put it in ${z}`));
 if(k==='test'){const s=N.t;B(s.cover?'Uncover notes':'Cover notes',()=>cover(!s.cover));QUIZ.forEach((q,i)=>{if(!s.got.includes(i))B(q[0],()=>cue(i))});if(s.q!=null)QUIZ[s.q][1].forEach((o,j)=>B(o,()=>answer(j)))}}
const steps=[
{h:'Key words, not every word',p:'Tap the words worth keeping: every key idea, in as few words as you can.',
 predict:{q:'Which notes help more a week later?',opts:['The teacher\'s sentences copied word for word','Short notes in your own words'],ans:1},task:'Make a note of 8 words or fewer with all 4 key ideas',
 show:()=>demo(0,[0,2,12,14,20,24].map(i=>()=>pick(i)),380),
 go:()=>open(0,'A sentence about bees, one tappable word at a time, and an empty notes box.',()=>KEY.every(k=>N.k.on.some(i=>SRC[i]===k))&&N.k.on.length<=8,'A few words held the whole idea. The rest was glue.')},
{h:'Own words, same meaning',p:'Pick the note in your own words that still says what the text says.',task:'Write all 3 notes',
 show:()=>demo(1,[1,2,0].map(i=>()=>choose(i)),700),
 go:()=>open(1,'A sentence from a text about bees and three possible notes.',()=>N.p.k>=3,'Rewriting makes you think. Check the meaning stays the same.')},
{h:'Shorthand you can read',p:'Tap a phrase to swap in shorthand. Keep it short but clear for next week.',
 predict:{q:'Is the shortest note always the best?',opts:['Yes, fewest letters wins','No, you must still understand it later'],ans:1},task:`Get the note to ${LIMIT} characters or fewer, all clear`,
 show:()=>demo(2,[2,3,4,5].map(i=>()=>flip(i)),500),
 go:()=>open(2,'A note in full words. Each phrase can be swapped for shorthand.',()=>noteText().length<=LIMIT&&!TOK.some((t,i)=>N.s.alt[i]&&!t[2]),'Symbols for linking words, whole words for key ideas.')},
{h:'The Cornell page',p:'Cue questions on the left, notes on the right, a summary at the bottom. Drag each piece to its place.',task:'Place all 5 pieces',
 show:()=>demo(3,PIECE.map(p=>()=>place(p[1])),550),
 go:()=>open(3,'A blank Cornell page: cue questions, notes and summary. A piece of writing to place.',()=>N.c.k>=PIECE.length,'Questions, short notes, and a summary written last.')},
{h:'Cover and test yourself',p:'Cover the notes. Answer each cue question from memory, then check.',
 predict:{q:'Which helps more for a test next week?',opts:['Reading my notes again three times','Covering them and answering my cue questions'],ans:1},task:'Answer all 3 cue questions with the notes covered',
 show:()=>demo(4,[()=>cover(true),...QUIZ.flatMap((q,i)=>[()=>cue(i),()=>answer(q[2])])],420),
 go:()=>open(4,'Cue questions on the left, notes on the right, and a cover for the notes.',()=>N.t.got.length>=3,'Testing yourself from cue questions beats rereading.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>N.hook()});
const QS=[
 {q:'Your teacher talks fast. What should you write?',a:'Key words and short phrases in my own words',o:[['Every word they say','copy'],['Nothing: I will remember','none']]},
 {q:'Text: "Water expands when it freezes." Which note is best?',a:'water freezes → expands',o:[['water shrinks when frozen','mean'],['w → e','short']]},
 {q:'What goes in the cue column of a Cornell page?',a:'Questions to test myself',o:[['A copy of the notes','cue'],['The date only','cue']]},
 {q:'When do you write the summary?',a:'At the end, in a sentence or two',o:[['Before the lesson starts','summary'],['Never: notes are enough','summary']]},
 {q:'The night before a test, what helps most?',a:'Cover the notes and answer my cue questions',o:[['Read my notes again three times','reread'],['Copy my notes out neatly','copy']]},
 {q:'Which shorthand is safe to use?',a:'→ for "leads to"',o:[['p for "photosynthesis"','short'],['Made-up letters for every word','short']]}];
function why(t){let m='Good notes are short, in your own words, and built for self-testing.';
 if(t==='copy')m='Copying every word feels thorough, but you do not think, so you remember less.';
 if(t==='none')m='Memory fades fast. A few key words now save the lesson for later.';
 if(t==='mean')m='That changes the meaning. Own words must still say what the text says.';
 if(t==='short')m='Too short to read later. Use symbols for links, keep key words whole.';
 if(t==='cue')m='The cue column holds questions for quizzing yourself.';
 if(t==='summary')m='Write the summary last, when you can see the whole page.';
 if(t==='reread')m='Rereading feels easy and fools you. Answering from memory makes it stick.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pr=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},pr,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else au.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{quiz.hidden=B.step!==5;row.hidden=B.step===5;btns()},
 init:B=>{A=B;au=A.sound;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Note-taking buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
