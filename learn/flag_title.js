/* Flagship – titles of works (ages 10–11; CCSS L.5.2d): whole works in italics (underlined by hand), parts in quotation
   marks, title capitals, styling each title, and consistent styling. */
(()=>{
const SORT=[["Charlotte's Web",'a book',0],['Jabberwocky','a poem inside a book',1],['Frozen','a film',0],['Let It Go','one song from the film',1],
 ['The Guardian','a newspaper',0],['Bees Return to City Parks','one article in the paper',1],['Thriller','an album',0],['The Boy Who Lived','chapter 1 of a book',1]];
const HOW=['italics','underline','quotation marks'];
const MED=[['I read The Hobbit last summer.','The Hobbit','a book','typed',0],['We watched Paddington at school.','Paddington','a film','handwritten',1],
 ['Snow Day is the poem I wrote.','Snow Day','a poem','handwritten',2],['Here Comes the Sun is my best song.','Here Comes the Sun','a song','typed',2]];
const CAPS=[['the lion, the witch and the wardrobe',[0,1,3,6]],['james and the giant peach',[0,3,4]],['where the wild things are',[0,2,3,4]]];
const SMALL={the:'The is a little word in the middle of the title, so it stays small.',and:'And is a little joining word, so it stays small.'};
const FIX=[['In',['Moana',0,'a film'],', the song',["How Far I'll Go",1,'a song in the film'],'is my favourite.'],
 ['In',['Matilda',0,'a book'],',',['The Reader of Books',1,'a chapter'],'is chapter 1.'],
 ['The poem',['Autumn Leaves',1,'a poem in the magazine'],'was printed in',['The Week Junior',0,'a magazine'],'.']];
const REV=[['I loved',['Wonder','i'],'by R. J. Palacio.',''],['My friend thinks',['Wonder','q'],'is too sad.','Wonder is the same whole book, so it keeps its italics.'],
 ['Chapter 1,',['Ordinary','q'],'is funny.',''],['The film of',['Wonder','p'],'came out in 2017.','The film is a whole work too: italics, not plain.'],
 ['I will reread',['wonder','i'],'soon.','A title keeps its capitals: Wonder, not wonder.']];
const SLIPS=[1,3,4];
VIS.reg('flagtitle',c=>{let A,X,bar,chal,qi=-1,gen=0;const S={};
const INK='#111827',CARD='#ffffff',EDGE='#4b5563',OK='#15803d',BAD='#b91c1c',HI='#1d4ed8',WHOLE='#dbeafe',PART='#fef3c7';
const stage=()=>['sort','med','caps','fix','rev','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),fnt=(n,w,it)=>`${it?'italic ':''}${w||700} ${u(n)}px system-ui,sans-serif`;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say1(t,x,y,n,col,w){X.font=fnt(n,w);X.fillStyle=col||INK;X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function wrap(t,max,n,w){X.font=fnt(n,w);const L=[];let s='';t.split(' ').forEach(d=>{const z=s?s+' '+d:d;if(s&&X.measureText(z).width>max){L.push(s);s=d}else s=z});if(s)L.push(s);return L}
function para(t,x,y,max,n,col,w){const L=wrap(t,max,n,w),lh=u(n)*1.3;L.forEach((s,i)=>say1(s,x,y+(i-(L.length-1)/2)*lh,n,col,w))}
function tile(r,t,o){o=o||{};X.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||EDGE;X.stroke();if(t)para(t,r.x+r.w/2,r.y+r.h/2+1,r.w-12,o.n||16,o.ink,o.w||800)}
function ground(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function banner(t,won){X.font=fnt(14,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(14)+16;tile({x:A.W/2-w/2,y:A.H*.02,w,h},'',{r:h/2,bg:won?'#dcfce7':CARD,edge:won?OK:null});say1(t,A.W/2,A.H*.02+h/2+1,14,INK,800)}
/* rich line: parts are [text, style] with style p plain, i italics, u underline, q quotation marks, x wrong (red) */
function rich(parts,cx,cy,max,n,col){const W=[];parts.forEach(([t,s])=>{const q=s==='q'||s==='xq';(q?'“'+t+'”':t).split(' ').forEach(w=>{if(w)W.push([w,s])})});const meas=([w,s])=>{X.font=fnt(n,700,s==='i'||s==='xi');return X.measureText(w).width},g=k=>/^[,.]/.test(k[0])?0:u(n)*.32,L=[[]];let lw=0;W.forEach(k=>{const m=meas(k);if(L[L.length-1].length&&lw+g(k)+m>max){L.push([]);lw=0}L[L.length-1].push(k);lw+=(lw?g(k):0)+m});const lh=u(n)*1.45;L.forEach((ln,i)=>{const tw=ln.reduce((a,k,j)=>a+meas(k)+(j?g(k):0),0);let x=cx-tw/2;const y=cy+(i-(L.length-1)/2)*lh; ln.forEach((k,j)=>{const m=meas(k),s=k[1];if(j)x+=g(k);X.font=fnt(n,700,s==='i'||s==='xi');X.fillStyle=s[0]==='x'?BAD:(col||INK);X.textAlign='left';X.textBaseline='middle';X.fillText(k[0],x,y);  if(s==='u'||s[0]==='x')X.fillRect(x,y+u(n)*.55,m,2);x+=m})})}
/* ---- 1: whole work or part of a work ---- */
const bins=()=>[{k:0,x:u(12),y:A.H*.13,w:A.W/2-u(18),h:A.H*.4},{k:1,x:A.W/2+u(6),y:A.H*.13,w:A.W/2-u(18),h:A.H*.4}];
const home=()=>({x:A.W/2-A.W*.3,y:A.H*.66,w:A.W*.6,h:A.H*.2});
function drawSort(){const s=S.sort,end=s.i>=SORT.length;ground();banner(end?'8 titles sorted':`Title ${s.i+1} of 8: whole work or part?`,end);bins().forEach(b=>{tile(b,'',{bg:b.k?PART:WHOLE,edge:s.bad===b.k?BAD:null});say1(b.k?'Part of a work':'Whole work',b.x+b.w/2,b.y+u(16),14,INK,800); say1(b.k?'“quotation marks”':'italics',b.x+b.w/2,b.y+u(36),14,INK,b.k?700:600); s.made.filter(m=>m[2]===b.k).forEach((m,j)=>rich([[m[0],b.k?'q':'i']],b.x+b.w/2,b.y+u(60)+j*u(21),b.w-10,12))});if(end)return;const t=SORT[s.i],h=home(),r=s.drag?{...h,x:s.drag.x-h.w/2,y:s.drag.y-h.h/2}:h;tile(r,'',{edge:HI});say1(t[0],r.x+r.w/2,r.y+r.h*.38,17,INK,800);say1(t[1],r.x+r.w/2,r.y+r.h*.72,13,'#374151',600);if(!s.drag)say1('Drag the card to a box, or tap a box',A.W/2,A.H*.94,12,A.col.tx,600)}
function sortTo(k){const s=S.sort;if(s.i>=SORT.length)return;const t=SORT[s.i];if(k===t[2]){s.made.push(t);s.i++;s.bad=null;A.sound.pop();return note(`${t[0]} is ${t[1]}: ${k?'a part, so “'+t[0]+'”':'a whole work, so italics'}.`+(s.i>=SORT.length?' All 8 sorted. Fame does not decide: whole or part does.':''))}
 s.bad=k;A.sound.miss();let m=`${t[0]} is ${t[1]}. It stands alone: italics.`;if(t[2])m=`${t[0]} is ${t[1]}, inside a bigger work: quotation marks.`;note(m)}
/* ---- 2: typed or handwritten ---- */
const hTiles=()=>HOW.map((t,j)=>({j,x:u(14),y:A.H*.5+j*A.H*.15,w:A.W-u(28),h:A.H*.12}));
function look(m,j,bad){const st=['i','u','q'][j];const [pre,post]=m[0].split(m[1]);return[[pre.trim(),'p'],[m[1],bad?'x'+st:st],[post.trim(),'p']]}
function drawMed(){const s=S.med,end=s.i>=MED.length;ground();banner(end?'Typed: italics. By hand: underline.':`Sentence ${s.i+1} of 4`,end);if(end){s.made.forEach((r,j)=>rich(r,A.W/2,A.H*(.22+j*.19),A.W-u(30),15,A.col.tx));return}
 const m=MED[s.i];tile({x:u(14),y:A.H*.1,w:A.W-u(28),h:A.H*.27},'',{edge:HI});rich(s.try||[[m[0],'p']],A.W/2,A.H*.19,A.W-u(44),16);say1(`${m[1]} is ${m[2]}. This is ${m[3]}.`,A.W/2,A.H*.32,13,'#374151',600);say1('How should the title look?',A.W/2,A.H*.43,14,A.col.tx,700);hTiles().forEach(q=>tile(q,'',{bg:s.bad===q.j?'#fee2e2':CARD,edge:s.bad===q.j?BAD:null}));hTiles().forEach(q=>rich([[HOW[q.j],['i','u','q'][q.j]]],q.x+q.w/2,q.y+q.h/2,q.w-10,16))}
function medPick(j){const s=S.med;if(s.i>=MED.length)return;const m=MED[s.i],want=m[4];if(j===want){s.made.push(look(m,j));s.i++;s.bad=null;s.try=null;A.sound.pop();return note(`Yes: ${HOW[j]}.`+(s.i>=MED.length?' All 4 done. Parts take quotation marks typed or by hand.':''))}
 s.bad=j;s.try=look(m,j,1);A.sound.miss();let m2;if(want===2)m2=`${m[1]} is ${m[2]}, a part: quotation marks, typed or by hand.`;else if(j===2)m2=`${m[1]} is ${m[2]}, a whole work, not a part. ${want?'By hand, underline it.':'Typed, use italics.'}`;else m2=want?'You cannot write italics with a pencil, so underline by hand.':'Underlining is the handwriting stand-in. Typed, use italics.';note(m2)}
/* ---- 3: capital letters in a title ---- */
function chips(){const t=CAPS[S.caps.i];if(!t)return[];X.font=fnt(19,700);const out=[];let x=0,y=A.H*.3,max=A.W-u(28);t[0].split(' ').forEach((w,j)=>{const cw=X.measureText(w).width+u(18);if(x&&x+cw>max){x=0;y+=u(58)}out.push({w0:w,j,x:u(14)+x,y,w:cw,h:u(46)});x+=cw+u(10)});return out}
const up1=w=>w[0].toUpperCase()+w.slice(1);
function drawCaps(){const s=S.caps,end=s.i>=CAPS.length;ground();banner(end?'Main words take capitals':`Title ${s.i+1} of 3: tap the words that need a capital`,end);if(end){s.made.forEach((t,j)=>rich([[t,'i']],A.W/2,A.H*(.25+j*.2),A.W-u(30),18,A.col.tx));return}
 chips().forEach(q=>{const on=s.on.includes(q.j);tile(q,on?up1(q.w0):q.w0,{n:19,w:700,bg:on?'#dcfce7':s.bad===q.j?'#fee2e2':CARD,edge:on?OK:s.bad===q.j?BAD:null})});say1(`${CAPS[s.i][1].length-s.on.length} more to find`,A.W/2,A.H*.82,14,A.col.tx,700)}
function capTap(j){const s=S.caps;if(s.i>=CAPS.length)return;const t=CAPS[s.i],W=t[0].split(' '),w=W[j].replace(/,$/,'');if(s.on.includes(j))return;if(t[1].includes(j)){s.on.push(j);s.bad=null;A.sound.pop();let why=j===0?'it is the first word':j===W.length-1?`it is the last word${w==='are'?', and a verb':''}`:'it is a main word'; if(s.on.length===t[1].length){const done=W.map((x,k)=>t[1].includes(k)?up1(x):x).join(' ');s.made.push(done);s.i++;s.on=[];return note(`${done}. ${up1(w)}: ${why}.`+(s.i>=CAPS.length?' All 3 titles fixed.':''))}return note(`${up1(w)} gets a capital: ${why}.`)}
 s.bad=j;A.sound.miss();let m=SMALL[w]||`${w} is a little word, so it stays small.`;note(m)}
/* ---- 4: drag a style onto each title ---- */
const fTargets=()=>[0,1].map(j=>({j,x:u(14)+j*(A.W/2-u(7)),y:A.H*.42,w:A.W/2-u(21),h:A.H*.2}));
const tokens=()=>[{k:0,x:A.W*.08,y:A.H*.74,w:A.W*.38,h:A.H*.13},{k:1,x:A.W*.54,y:A.H*.74,w:A.W*.38,h:A.H*.13}];
function fParts(){const f=FIX[S.fix.i];let k=0;return f.map(p=>{if(!Array.isArray(p))return[p,'p'];const st=S.fix.set[k++];return[p[0],st==null?'p':st===p[1]?(st?'q':'i'):(st?'xq':'xi')]})}
function drawFix(){const s=S.fix,end=s.i>=FIX.length;ground();banner(end?'Every title styled':`Sentence ${s.i+1} of 3: style both titles`,end);if(end){s.made.forEach((r,j)=>rich(r,A.W/2,A.H*(.22+j*.22),A.W-u(30),15,A.col.tx));return}
 tile({x:u(10),y:A.H*.11,w:A.W-u(20),h:A.H*.26},'',{});rich(fParts(),A.W/2,A.H*.24,A.W-u(36),16);const T=FIX[s.i].filter(Array.isArray);fTargets().forEach(q=>{const st=s.set[q.j];tile(q,'',{bg:st==null?CARD:st===T[q.j][1]?'#dcfce7':'#fee2e2',edge:s.pick!=null?HI:null});rich([[T[q.j][0],st==null?'p':st?'q':'i']],q.x+q.w/2,q.y+q.h*.38,q.w-10,14);say1(T[q.j][2],q.x+q.w/2,q.y+q.h*.78,11,'#374151',600)});tokens().forEach(q=>{const r=s.drag&&s.drag.k===q.k?{...q,x:s.drag.x-q.w/2,y:s.drag.y-q.h/2}:q;tile(r,'',{bg:q.k?PART:WHOLE,edge:s.pick===q.k?HI:null});rich([[q.k?'quotation marks':'italics',q.k?'q':'i']],r.x+r.w/2,r.y+r.h/2,r.w-8,15)})}
function stamp(j,k){const s=S.fix;if(s.i>=FIX.length)return;const T=FIX[s.i].filter(Array.isArray),t=T[j];s.set[j]=k;s.pick=null;if(k===t[1]){A.sound.pop();if(s.set[0]===T[0][1]&&s.set[1]===T[1][1]){s.made.push(fParts());s.i++;s.set=[];return note('Both titles styled: whole in italics, part in quotation marks.'+(s.i>=FIX.length?' All 3 sentences done.':''))}return note(`${t[0]} is ${t[2]}: ${k?'quotation marks':'italics'}.`)}
 A.sound.miss();let m=`${t[0]} is ${t[2]}, a whole work: italics, not quotation marks.`;if(t[1])m=`${t[0]} is ${t[2]}, a part: quotation marks.`;note(m)}
/* ---- 5: find the slips in a review ---- */
const rRows=()=>REV.map((r,j)=>({j,x:u(10),y:A.H*.12+j*A.H*.165,w:A.W-u(20),h:A.H*.145}));
function drawRev(){const s=S.rev,end=s.found.length>=SLIPS.length;ground();banner(end?'Same title, same style, every time':`Tap the lines with a slip (${s.found.length} of 3)`,end);rRows().forEach(q=>{const r=REV[q.j],f=s.found.includes(q.j);tile(q,'',{bg:f?'#dcfce7':CARD,edge:f?OK:null}); const t=f?[r[1][0].replace(/^w/,'W'),'i']:r[1];rich([[r[0],'p'],t,[r[2],'p']],q.x+q.w/2,q.y+q.h/2,q.w-14,15)})}
function revTap(j){const s=S.rev;if(s.found.length>=SLIPS.length||s.found.includes(j))return;if(SLIPS.includes(j)){s.found.push(j);A.sound.pop();return note(REV[j][3]+(s.found.length>=SLIPS.length?' All 3 slips fixed: Wonder is in italics every time.':''))}
 A.sound.miss();let m=j===2?'That line is right: Ordinary is a chapter, a part.':'That line is right: Wonder, a whole book, in italics.';note(m)}
/* ---- input ---- */
function down(p){const k=stage();if(k==='sort'&&S.sort.i<SORT.length){if(hit(p,home())){S.sort.drag={x:p.x,y:p.y};A.redraw();return true}const b=bins().find(b=>hit(p,b));if(b)sortTo(b.k)}
 if(k==='med'){const q=hTiles().find(q=>hit(p,q));if(q)medPick(q.j)}
 if(k==='caps'){const q=chips().find(q=>hit(p,q));if(q)capTap(q.j)}
 if(k==='fix'&&S.fix.i<FIX.length){const t=tokens().find(q=>hit(p,q));if(t){S.fix.drag={k:t.k,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}const q=fTargets().find(q=>hit(p,q));if(q&&S.fix.pick!=null)stamp(q.j,S.fix.pick)}
 if(k==='rev'){const q=rRows().find(q=>hit(p,q));if(q)revTap(q.j)}return false}
function move(p){const d=(S.sort&&S.sort.drag)||(S.fix&&S.fix.drag);if(d){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){if(S.sort.drag){S.sort.drag=null;const b=p&&bins().find(b=>hit(p,b));if(b)sortTo(b.k);else A.redraw();return}
 const d=S.fix.drag;if(!d)return;S.fix.drag=null;const q=p&&fTargets().find(q=>hit(p,q));if(q)return stamp(q.j,d.k);if(p&&Math.hypot(p.x-d.sx,p.y-d.sy)<u(12)){S.fix.pick=d.k;note(`${d.k?'Quotation marks':'Italics'} picked. Now tap a title.`)}else A.redraw()}
function clear(){gen++;for(const q in S)delete S[q];S.sort={i:0,made:[]};S.med={i:0,made:[]};S.caps={i:0,on:[],made:[]};S.fix={i:0,set:[],made:[]};S.rev={found:[]};S.cb=()=>{}}
function note(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.cb()}
function open(i,first,ready,msg){clear();note(first);S.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!bar)return;bar.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};if(k==='sort'&&S.sort.i<SORT.length){const t=SORT[S.sort.i][0];b('Whole work: italics',()=>sortTo(0),`${t} is a whole work`);b('Part: quotation marks',()=>sortTo(1),`${t} is part of a work`)}
 if(k==='med'&&S.med.i<MED.length)HOW.forEach((h,j)=>b(h,()=>medPick(j),`Show the title with ${h}`));if(k==='caps'&&S.caps.i<CAPS.length)CAPS[S.caps.i][0].split(' ').forEach((w,j)=>{if(!S.caps.on.includes(j))b(w,()=>capTap(j),`Give ${w.replace(',','')} a capital`)});if(k==='fix'&&S.fix.i<FIX.length)FIX[S.fix.i].filter(Array.isArray).forEach((t,j)=>{b(`${t[0]}: italics`,()=>stamp(j,0),`Put ${t[0]} in italics`);b(`${t[0]}: “ ”`,()=>stamp(j,1),`Put ${t[0]} in quotation marks`)});if(k==='rev'&&S.rev.found.length<SLIPS.length)REV.forEach((r,j)=>{if(!S.rev.found.includes(j))b(`Line ${j+1}`,()=>revTap(j),`Slip in: ${r[0]} ${r[1][0]} ${r[2]}`)})}
const steps=[
{h:'Whole work or part?',p:'A whole work stands alone: a book, film, album, newspaper or TV series. Its title goes in italics. A part sits inside a whole work: a poem, song, chapter, article or episode. It takes quotation marks.',
predict:{q:'Let It Go is a very famous song. How do you show its title?',opts:['Italics: it is famous','Quotation marks: it is one song'],ans:1},task:'Sort all 8 titles',
show:()=>play(0,SORT.map(t=>()=>sortTo(t[2])),550),go:()=>open(0,"Charlotte's Web is a book. Drag it into a box.",()=>S.sort.i>=SORT.length,'Whole: italics. Part: quotation marks.')},
{h:'Typed or by hand?',p:'You cannot write italics with a pencil, so by hand you underline a whole work. Parts take quotation marks either way.',
predict:{q:'You are writing by hand about the film Paddington. What do you do?',opts:['Put Paddington in quotation marks','Underline Paddington'],ans:1},task:'Style all 4 titles',
show:()=>play(1,MED.map(m=>()=>medPick(m[4])),650),go:()=>open(1,'I read The Hobbit last summer. This is typed. Pick a style.',()=>S.med.i>=MED.length,'Underlining stands in for italics.')},
{h:'Capitals in a title',p:'First and last words take capitals, and so do main words: nouns, verbs, adjectives. Little words in the middle (the, and, in, of, a) stay small.',
predict:{q:'In Where the Wild Things Are, does are get a capital?',opts:['No: it is a short word','Yes: it is a verb and the last word'],ans:1},task:'Fix all 3 titles',
show:()=>play(2,CAPS.flatMap(t=>t[1].map(j=>()=>capTap(j))),420),go:()=>open(2,'Tap each word in this title that needs a capital.',()=>S.caps.i>=CAPS.length,'Little words in the middle stay small.')},
{h:'Style the titles',p:'A sentence can name a whole work and a part of it. Drag a style onto each title, or tap a style, then a title.',task:'Style all 3 sentences',
show:()=>play(3,FIX.flatMap(f=>f.filter(Array.isArray).map((t,j)=>()=>stamp(j,t[1]))),600),go:()=>open(3,'In Moana, the song How Far I\'ll Go is my favourite. Style both titles.',()=>S.fix.i>=FIX.length,'Whole in italics, part in quotation marks.')},
{h:'Keep it the same',p:'Use the same style every time a title comes up, and keep its capitals. Tap each line that breaks the pattern.',task:'Find all 3 slips',
show:()=>play(4,SLIPS.map(j=>()=>revTap(j)),650),go:()=>open(4,'A book review. Wonder is a book. Tap the lines with a slip.',()=>S.rev.found.length>=SLIPS.length,'Consistent style, every time.')},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[
{q:'How do you show a book title when you type it?',a:'Italics',o:[['Quotation marks','Those are for parts, like a chapter. A book is a whole work: italics.'],['Capital letters only','Capitals, yes, but a typed book title also needs italics.']]},
{q:'How do you show the title of one song?',a:'Quotation marks',o:[['Italics','Italics are for whole works, like the album. One song is a part.'],['Underline it','Underlining is for whole works, by hand. A song is a part.']]},
{q:'By hand, how do you show the film Paddington?',a:'Underline it',o:[['Quotation marks','A film is a whole work, not a part. By hand, underline it.'],['Leave it plain','Plain text hides that it is a title.']]},
{q:'Which title has the right capitals?',a:'The Cat in the Hat',o:[['The Cat In The Hat','In and the are little words in the middle, so they stay small.'],['The cat in the hat','Cat and Hat are main words, so they need capitals.']]},
{q:'A newspaper and one article in it. Which takes quotation marks?',a:'The article',o:[['The newspaper','The newspaper is the whole work: italics. The article is a part.'],['Both','Only the part does. The newspaper takes italics.']]},
{q:'A story says Wonder twice. One is in italics. How should the other look?',a:'Italics too',o:[['Quotation marks','It is the same whole book, so the same style: italics.'],['Plain, to save time','Every mention needs its style, not just the first.']]}];
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,''],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>judge(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why)}
function draw(){const k=stage();if(k==='quiz'){ground();banner('Challenge',1);rich([['Whole work:','p'],['italics','i'],['· By hand:','p'],['underline','u'],['· Part:','p'],['quotation marks','q']],A.W/2,A.H*.5,A.W-u(40),16,A.col.tx);return}
 ({sort:drawSort,med:drawMed,caps:drawCaps,fix:drawFix,rev:drawRev})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==5;bar.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Title style buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}}).start()})})();
