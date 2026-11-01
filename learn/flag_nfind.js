/* Flagship – non-fiction text features (ages 6–9), with one book, "All About Frogs": tap a line on the contents page to
   jump to a chapter; look words up in the index (ABC order, page numbers) and drop a new word into its ABC place; drag
   bold words onto their meanings in the glossary; sort questions to the feature that answers them; then name how a page
   is built (list, time order, question and answer). Every drag or tap has a big button twin; the canvas label says what
   just happened. */
(()=>{
const CONT=[['What is a frog?',2],['Where frogs live',6],['What frogs eat',10],['How frogs grow',14],['Frogs in danger',18]];
const CQ=[[2,'what frogs eat'],[3,'how a frog grows up'],[1,'where frogs live']];
const IDX=[['eggs','14, 15'],['food','10, 11'],['jump','4'],['pond','6, 7'],['skin','3'],['tadpole','15, 16'],['tongue','11']];
const IQ=[4,5];
const GLOS=[['amphibian','an animal that lives in water and on land'],['tadpole','a baby frog with a tail, living in water'],['webbed','with skin between the toes, for swimming']];
const ASK=[['Find the chapter on frog homes',0],['Which pages tell you about eggs?',1],['What does “spawn” mean?',2],['How many chapters are in the book?',0],['Find the page that says “croak”',1],['What does “predator” mean?',2]];
const TOOLS=['📑 Contents','🔤 Index','📖 Glossary'],TOOLN=['contents page','index','glossary'];
const TOOLWHY=['The contents page lists the chapters in page order. It does not list every word or say what words mean.','The index lists words in ABC order with their page numbers. It does not say what a word means.','The glossary says what a word means. It does not list the chapters.'];
const PAGES=[['Frog facts',['• Frogs have no tail.','• Frogs lay eggs.','• Some frogs can climb trees.'],0],['How a frog grows',['First, an egg.','Next, a tadpole.','Then, a froglet.','Last, a frog!'],1],
 ['Frog questions',['Q: Can frogs breathe through skin?','A: Yes, they can.','Q: Do frogs drink?','A: They soak it in through their skin.'],2]];
const SHAPES=[['📋','List','A list gives facts that can go in any order, often with bullet points.'],['⏱️','Time order','Time order tells steps in order, with words like first, next, then and last.'],['❓','Question and answer','A question-and-answer page asks a question, then answers it.']];
VIS.reg('flagnfind',c=>{let A,pad,qb,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const fresh=()=>({next:()=>{},n:0,deck:[],grab:null,bad:-1,glow:-1,open:-1,rows:IDX.slice(),placed:false,matched:[],sorted:[]}),S=fresh();
const mode=()=>['cont','idx','glos','tool','build','quiz'][A.step],quick=()=>A.reduced();
const goal=()=>({cont:3,idx:3,glos:3,tool:6,build:3}[mode()]||99);
const fs=n=>Math.round(n*(A.narrow?1.1:1.18));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(g,t,x,y,n,o){o=o||{};g.font=`${o.w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(t,x,y,o.mw||A.W-12)}
/* split a label over lines that fit width mw (at most 3) */
function lines(g,t,x,y,n,mw,o){o=o||{};g.font=`${o.w||700} ${fs(n)}px system-ui,sans-serif`;const out=[];let cur='';
 t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>mw&&cur){out.push(cur);cur=w}else cur=tr});out.push(cur);
 const L=out.slice(0,3),gap=fs(n)*1.15;L.forEach((l,i)=>put(g,l,x,y+(i-(L.length-1)/2)*gap,n,{...o,mw}))}
function glyph(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function plate(g,r,fill,line,w,rad){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,rad==null?10:rad);g.fill();g.lineWidth=w||2;g.strokeStyle=line;g.stroke()}
const on=(p,r)=>r&&p.x>=r.x-4&&p.x<=r.x+r.w+4&&p.y>=r.y-4&&p.y<=r.y+r.h+4;
const line=()=>A.mix(A.col.tx,A.col.pn,.38),paper=()=>A.col.dark?'#1f2937':'#fffdf7',wash=(h,k)=>A.mix(A.col.pn,h,A.col.dark?.2:k||.55);
const lift=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
/* the open book page fills most of the canvas */
const page=()=>({x:A.W*.05,y:A.H*.15,w:A.W*.9,h:A.H*.62});
const contRow=i=>{const P=page(),h=P.h*.15;return{x:P.x+8,y:P.y+P.h*.17+i*(h+4),w:P.w-16,h}};
const idxRow=i=>{const P=page(),n=S.rows.length,h=Math.min(P.h*.11,(P.h*.86)/n-3);return{x:P.x+8,y:P.y+P.h*.12+i*(h+3),w:P.w-16,h}};
const newWord=()=>({x:A.W*.3,y:A.H*.82,w:A.W*.4,h:A.H*.1});
const chip=i=>{const w=(A.W-40)/3;return{x:14+i*(w+6),y:A.H*.18,w,h:A.H*.11}};
const meaning=i=>({x:A.W*.05,y:A.H*(.4+i*.17),w:A.W*.9,h:A.H*.14});
const tbin=i=>{const w=(A.W-28)/3;return{x:7+i*(w+7),y:A.H*.04,w,h:A.H*.4}};
const askCard=()=>{const w=Math.min(A.W*.9,380);return{x:A.W/2-w/2,y:A.H*.66,w,h:A.H*.24}};
const mini=()=>({x:A.W*.08,y:A.H*.04,w:A.W*.84,h:A.H*.56});
const shape=i=>{const w=(A.W-28)/3;return{x:7+i*(w+7),y:A.H*.68,w,h:A.H*.26}};
function bookTop(g,t){put(g,t,A.W/2,A.H*.07,13,{mw:A.W-16})}
function drawCont(g){const C=A.col,P=page(),q=CQ[Math.min(S.n,2)];bookTop(g,S.n>=3?'You found all 3 chapters! 🎉':`Find the page about ${q[1]}.`);
 plate(g,P,paper(),line());put(g,'Contents',P.x+P.w/2,P.y+P.h*.08,14,{w:800});
 CONT.forEach((r,i)=>{const b=contRow(i),hot=i===S.glow,bad=i===S.bad,opn=i===S.open;plate(g,b,opn?wash('#bbf7d0',.6):'transparent',bad?C.rd:hot||opn?C.vi:A.alpha(C.mu,.5),bad||hot||opn?3:1,6);
  put(g,r[0],b.x+8,b.y+b.h/2,12,{al:'left',mw:b.w*.7});put(g,String(r[1]),b.x+b.w-10,b.y+b.h/2,13,{al:'right',w:800})});
 if(S.open>=0)put(g,`➡️ Turn to page ${CONT[S.open][1]}`,A.W/2,A.H*.86,13,{col:C.tx,w:800})}
function drawIdx(g){const C=A.col,P=page(),last=S.n>=2&&!S.placed;bookTop(g,S.n>=3?'The index is in ABC order. 🎉':last?'Drag “legs” (page 5) to its ABC place.':`Find “${IDX[IQ[S.n]][0]}” in the index.`);
 plate(g,P,paper(),line());put(g,'Index',P.x+P.w/2,P.y+P.h*.06,14,{w:800});
 S.rows.forEach((r,i)=>{const b=idxRow(i),hot=i===S.glow,bad=i===S.bad,opn=i===S.open;plate(g,b,opn?wash('#bbf7d0',.6):'transparent',bad?C.rd:hot||opn?C.vi:A.alpha(C.mu,.45),bad||hot||opn?3:1,6);
  put(g,r[0],b.x+10,b.y+b.h/2,12,{al:'left',w:800,mw:b.w*.5});put(g,r[1],b.x+b.w-10,b.y+b.h/2,12,{al:'right'})});
 if(last){const r=lift(newWord());plate(g,r,wash('#fde68a',.7),S.bad===99?C.rd:C.vi,3);put(g,'legs   5',r.x+r.w/2,r.y+r.h/2,13,{w:800})}}
function drawGlos(g){const C=A.col;lines(g,'A frog is an amphibian. It starts as a tadpole. Its webbed feet help it swim.',A.W/2,A.H*.075,12,A.W-20);
 GLOS.forEach((w,i)=>{if(S.matched.includes(i))return;const r=S.grab&&S.grab.k===i?lift(chip(i)):chip(i);plate(g,r,wash('#bae6fd',.6),S.deck[0]===i?C.vi:line(),S.deck[0]===i?3:2);put(g,w[0],r.x+r.w/2,r.y+r.h/2,13,{w:900,mw:r.w-6})});
 put(g,'Glossary',A.W/2,A.H*.35,14,{w:800});
 GLOS.forEach((w,i)=>{const r=meaning(i),got=S.matched.includes(i);plate(g,r,got?wash('#bbf7d0',.6):paper(),i===S.bad?C.rd:i===S.glow?C.vi:line(),i===S.bad||i===S.glow?3:1);
  put(g,(got?w[0]+': ':'… : ')+w[1],r.x+10,r.y+r.h/2,11,{al:'left',w:got?800:600,mw:r.w-16})})}
function drawTool(g){const C=A.col;TOOLS.forEach((t,i)=>{const r=tbin(i);plate(g,r,wash(['#fde68a','#bae6fd','#e9d5ff'][i]),i===S.glow?C.vi:line(),i===S.glow?4:2);put(g,t,r.x+r.w/2,r.y+20,12,{w:800,mw:r.w-6});
  S.sorted.filter(k=>ASK[k][1]===i).forEach((k,j)=>glyph(g,'✅',r.x+r.w/2,r.y+r.h*(.45+.22*j),Math.min(r.w*.2,26)))});
 put(g,`Sorted: ${S.n} of 6`,A.W/2,A.H*.55,13);const k=S.deck[0];if(k==null)return;const r=lift(askCard());plate(g,r,paper(),S.bad===k?C.rd:line(),S.bad===k?4:2);
 put(g,ASK[k][0],r.x+r.w/2,r.y+r.h/2,13,{w:800,mw:r.w-14})}
function drawBuild(g){const C=A.col,M=mini(),pg=PAGES[Math.min(S.n,2)];plate(g,M,paper(),line());put(g,pg[0],M.x+M.w/2,M.y+M.h*.13,15,{w:900,mw:M.w-14});
 g.fillStyle=A.alpha(C.vi,.6);g.fillRect(M.x+M.w*.2,M.y+M.h*.22,M.w*.6,2);pg[1].forEach((l,i)=>put(g,l,M.x+14,M.y+M.h*(.38+i*.15),12,{al:'left',mw:M.w-24}));
 put(g,'⬆ heading',M.x+M.w-8,M.y+M.h*.27,10,{al:'right',col:C.mu,w:600});
 SHAPES.forEach((s,i)=>{const r=shape(i);plate(g,r,i===S.bad?wash('#fecaca',.5):paper(),i===S.bad?C.rd:i===S.glow?C.vi:line(),i===S.bad||i===S.glow?4:2);glyph(g,s[0],r.x+r.w/2,r.y+r.h*.32,r.h*.3);lines(g,s[1],r.x+r.w/2,r.y+r.h*.74,11,r.w-8,{w:800})});
 if(S.n>=3)put(g,'You named all 3! 🎉',A.W/2,A.H*.63,13,{col:C.tx,w:800})}
function drawQuiz(g){const P=page();plate(g,P,paper(),line());glyph(g,'🐸',A.W/2,P.y+P.h*.4,P.h*.36);put(g,'All About Frogs',A.W/2,P.y+P.h*.8,16,{w:900});bookTop(g,'Contents · Index · Glossary · Headings')}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,A.W,A.H);
 ({cont:drawCont,idx:drawIdx,glos:drawGlos,tool:drawTool,build:drawBuild,quiz:drawQuiz}[mode()])(g);A.fx.draw(g)}
function ping(i){S.glow=i;const v=gen;setTimeout(()=>{if(v===gen){S.glow=-1;A.redraw()}},420)}
function nope(t){A.sound.miss();tell(t);A.redraw()}
function yes(t){S.n++;S.bad=-1;A.sound.pop();tell(t);keys();A.redraw();S.next()}
/* contents: tap chapter row i */
function chapter(i){if(S.n>=3)return;ping(i);const q=CQ[S.n];if(i!==q[0]){S.bad=i;S.open=-1;return nope(`That line says “${CONT[i][0]}”. That is not about ${q[1]}. Find the words that match.`)}
 S.open=i;yes(`Yes! “${CONT[i][0]}” starts on page ${CONT[i][1]}. Turn to page ${CONT[i][1]}.`)}
/* index: tap row i to look up the target word */
function look(i){if(S.n>=2)return;ping(i);const w=IDX[IQ[S.n]][0],r=S.rows[i];if(r[0]!==w){S.bad=i;S.open=-1;
 return nope(`That says “${r[0]}”. “${w}” starts with ${w[0]}. The index is in ABC order, so look where the ${w[0]} words are.`)}S.open=i;yes(`“${w}” is on page${r[1].includes(',')?'s':''} ${r[1]}.`)}
/* index: put "legs" in at row position at (it belongs after jump, before pond) */
function place(at){if(S.n!==2||S.placed)return;ping(at);const want=IDX.findIndex(r=>r[0]>'legs');
 if(at!==want){S.bad=99;const nb=at<want?S.rows[at][0]:S.rows[at-1][0];return nope(`Not there. “legs” starts with l. In ABC order l comes after j (jump) and before p (pond), not ${at<want?'before':'after'} “${nb}”.`)}
 S.rows.splice(at,0,['legs','5']);S.placed=true;S.open=at;yes('“legs” goes after “jump” and before “pond”: j, l, p in ABC order.')}
function slotAt(p){const n=S.rows.length;for(let i=0;i<n;i++){const b=idxRow(i);if(p.y<b.y+b.h/2)return i}return n}
/* glossary: word k onto meaning i */
function define(k,i){if(S.matched.includes(k)||S.n>=3)return;ping(i);if(k!==i){S.bad=i;return nope(`“${GLOS[k][0]}” does not mean ${GLOS[i][1]}. Read the page again: what does “${GLOS[k][0]}” tell you about a frog?`)}
 S.matched.push(k);S.deck=S.deck.filter(x=>x!==k);yes(`“${GLOS[k][0]}” means ${GLOS[k][1]}.`)}
function toolSort(i){const k=S.deck[0];if(k==null)return;ping(i);if(ASK[k][1]!==i){S.bad=k;return nope(`Not the ${TOOLN[i]}. ${TOOLWHY[i]}`)}S.sorted.push(S.deck.shift());yes(`${TOOLS[i]}: ${TOOLWHY[i].split('.')[0].replace(/^The /,'the ')}.`)}
function nameIt(i){if(S.n>=3)return;ping(i);const pg=PAGES[S.n];if(pg[2]!==i){S.bad=i;return nope(`Not ${SHAPES[i][1].toLowerCase()}. ${SHAPES[pg[2]][2]} Look at how the lines go.`)}
 const v=gen;yes(`Yes! ${SHAPES[i][2]}`);if(S.n<3)setTimeout(()=>{if(v===gen){S.bad=-1;keys();A.redraw()}},quick()?10:300)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='cont')CONT.forEach((r,i)=>B(`${r[0]} … ${r[1]}`,`Contents: ${r[0]}, page ${r[1]}`,()=>chapter(i)));
 if(m==='idx'&&S.n<2)S.rows.forEach((r,i)=>B(`${r[0]} … ${r[1]}`,`Index: ${r[0]}, pages ${r[1]}`,()=>look(i)));
 if(m==='idx'&&S.n===2)[[0,'eggs'],[3,'jump'],[5,'skin']].forEach(([at,w])=>B(`Put “legs” after ${w}`,`Put legs after ${w}`,()=>place(at+1)));
 if(m==='glos'&&S.deck.length){const k=S.deck[0];GLOS.forEach((w,i)=>B(`${GLOS[k][0]} = ${w[1]}`,`${GLOS[k][0]} means ${w[1]}`,()=>define(k,i)))}
 if(m==='tool'&&S.deck.length)TOOLS.forEach((t,i)=>B(t,`${ASK[S.deck[0]][0]}: ${TOOLN[i]}`,()=>toolSort(i)));
 if(m==='build')SHAPES.forEach((s,i)=>B(s[0]+' '+s[1],`This page is built as ${s[1]}`,()=>nameIt(i)))}
function down(p){const m=mode();if(m==='quiz'||S.n>=goal())return false;
 if(m==='cont'){const i=CONT.findIndex((_,j)=>on(p,contRow(j)));if(i>=0)chapter(i);return false}
 if(m==='idx'){if(S.n===2){if(on(p,newWord())){S.grab={k:0,x:null,x0:p.x,y0:p.y};return true}return false}const i=S.rows.findIndex((_,j)=>on(p,idxRow(j)));if(i>=0)look(i);return false}
 if(m==='glos'){const k=GLOS.findIndex((_,j)=>!S.matched.includes(j)&&on(p,chip(j)));if(k>=0){S.deck=[k,...S.deck.filter(x=>x!==k)];keys();S.grab={k,x:null,x0:p.x,y0:p.y};A.redraw();return true}
  const i=GLOS.findIndex((_,j)=>on(p,meaning(j)));if(i>=0&&S.deck.length)define(S.deck[0],i);return false}
 if(m==='tool'){if(S.deck.length&&on(p,askCard())){S.grab={k:0,x:null,x0:p.x,y0:p.y};return true}const i=TOOLS.findIndex((_,j)=>on(p,tbin(j)));if(i>=0)toolSort(i);return false}
 if(m==='build'){const i=SHAPES.findIndex((_,j)=>on(p,shape(j)));if(i>=0)nameIt(i)}return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,m=mode();S.grab=null;if(!d)return;const moved=d.x!=null;if(!moved)return A.redraw();
 if(m==='idx'){if(!on(p,page())){tell('Drop “legs” on the index page, where it fits in ABC order.');return A.redraw()}return place(slotAt(p))}
 if(m==='glos'){const i=GLOS.findIndex((_,j)=>on(p,meaning(j)));if(i<0){tell('Drop the bold word on a meaning in the glossary.');return A.redraw()}return define(d.k,i)}
 if(m==='tool'){const i=TOOLS.findIndex((_,j)=>on(p,tbin(j)));if(i<0){tell('Drop the question on Contents, Index or Glossary.');return A.redraw()}return toolSort(i)}}
const close=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},quick()?j*40+30:(j+1)*(ms||550)))}
const clear=more=>{gen++;Object.assign(S,fresh(),more||{})};
const steps=[
{h:'Contents page',p:'The contents page lists the chapters and the page each one starts on. Tap the line you need.',predict:{q:'Where is the contents page in a book?',opts:['At the back','At the front'],ans:1},task:'Find 3 chapters',
 show:()=>{steps[0].go();play([()=>chapter(2),()=>chapter(3),()=>chapter(1)])},go:()=>{clear();tell('Contents page. Find the page about what frogs eat.');keys();S.next=close(0,()=>S.n>=3,'The contents page is at the front. It lists chapters in page order.')}},
{h:'Index',p:'The index is at the back. It lists words in ABC order, with the pages they are on. Find each word, then add a new one.',predict:{q:'How are the words in an index put in order?',opts:['In the order they come in the book','In ABC order'],ans:1},task:'Find 2 words, place 1',
 show:()=>{steps[1].go();play([()=>look(4),()=>look(5),()=>place(3)])},go:()=>{clear();tell('Index page. Find skin.');keys();S.next=close(1,()=>S.n>=3,'The index is in ABC order, so you can find a word fast.')}},
{h:'Glossary',p:'Bold words are special words. Drag each bold word onto what it means in the glossary.',predict:{q:'You see a word in bold. Where can you find out what it means?',opts:['On the contents page','In the glossary'],ans:1},task:'Match 3 bold words',
 show:()=>{steps[2].go();play([()=>define(0,0),()=>define(1,1),()=>define(2,2)])},go:()=>{clear({deck:[0,1,2]});tell('Drag amphibian onto its meaning.');keys();S.next=close(2,()=>S.n>=3,'The glossary says what the special words mean.')}},
{h:'Which one helps?',p:'Each question needs a different part of the book. Drag it to Contents, Index or Glossary.',task:'Sort 6 questions',
 show:()=>{steps[3].go();play([0,1,2,3,4,5].map(()=>()=>toolSort(ASK[S.deck[0]][1])),420)},go:()=>{clear({deck:[0,1,2,3,4,5]});tell('Find the chapter on frog homes. Which part helps?');keys();S.next=close(3,()=>S.n>=6,'Contents for chapters, index for words and pages, glossary for meanings.')}},
{h:'How is it built?',p:'Each page has a heading that says what it is about. Read the page, then tap how it is built.',task:'Name 3 pages',
 show:()=>{steps[4].go();play([()=>nameIt(0),()=>nameIt(1),()=>nameIt(2)],700)},go:()=>{clear();tell('Frog facts. Is it a list, time order, or question and answer?');keys();S.next=close(4,()=>S.n>=3,'Fact books can be a list, in time order, or questions and answers.')}},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['You want the chapter on frog homes. Where do you look first?',[['The contents page','ok'],['The glossary','glos'],['The last page of the story','last']]],
 ['The index says: pond 6, 7. What does that tell you?',[['Pages 6 and 7 are about ponds','ok'],['Pond is chapter 6','chap'],['There are 7 ponds','count']]],
 ['What does a glossary tell you?',[['What words mean','ok'],['The page each chapter starts on','cont'],['Who wrote the book','auth']]],
 ['These words are in an index. Which one comes first?',[['bird','ok'],['frog','abcf'],['snake','abcs']]],
 ['A page says: First, an egg. Next, a tadpole. Last, a frog. How is it built?',[['Time order','ok'],['A list','list'],['Question and answer','qa']]],
 ['What is a heading for?',[['It says what that part is about','ok'],['It is the last word on the page','lastw'],['It says what a word means','hmean']]]];
function why(t){let m='Look back at the lab: contents, index, glossary and headings.';
 if(t==='glos')m='The glossary says what words mean. Chapters are listed on the contents page at the front.';
 if(t==='last')m='Fact books have a contents page at the front. Start there to find a chapter.';
 if(t==='chap')m='The numbers in an index are page numbers, not chapter numbers. Turn to page 6 or 7.';
 if(t==='count')m='Index numbers are pages, not how many there are. Pond is on pages 6 and 7.';
 if(t==='cont')m='That is the contents page. The glossary tells you what words mean.';
 if(t==='auth')m='The author is on the cover. The glossary tells you what words mean.';
 if(t==='abcf')m='Look at the first letter: b, f, s. In ABC order b comes first, so bird is first.';
 if(t==='abcs')m='s comes late in the alphabet. b comes first, so bird is first.';
 if(t==='list')m='First, next and last are time words. The steps must go in order, so it is time order.';
 if(t==='qa')m='There are no questions on that page. First, next and last show time order.';
 if(t==='lastw')m='A heading goes at the top of a part. It tells you what that part is about.';
 if(t==='hmean')m='Meanings are in the glossary. A heading tells you what that part of the page is about.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${right?'✓ Yes! You know your way round a fact book.':'✗ '+why(t)}${right?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
