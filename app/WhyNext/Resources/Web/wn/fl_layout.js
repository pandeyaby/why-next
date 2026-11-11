/* Flagship: layout devices in informational writing (ages 10-11). Sub-headings, lists, tables, columns, fix a leaflet.
   Every gesture has a button twin. */
(()=>{
const SECS=[['Hedgehogs eat beetles, worms and caterpillars. They hunt at night and may roam two kilometres for food.',0],
 ['Most hedgehogs hibernate from about November to March. Their heart slows right down and they live on stored fat.',1],
 ['Cut a hole 13 cm wide at the bottom of your fence, so hedgehogs can travel from garden to garden.',2]];
const HEADS=[['Food',0,''],['Winter sleep',1,''],['Helping them travel',2,''],['Interesting facts',-1,'Too vague: every section is a fact. A sub-heading names what this section is about.'],
 ['Hedgehogs eat beetles at night.',-2,'That is a full sentence from the text. A sub-heading is a short label, not a sentence.']];
const DEV=['• Bullet points','1. Numbered lists','▦ Tables','¶ Paragraphs'];
const CARDS=[['Kit for pond dipping: net, tray, jar, notebook',0],['How to build a hedgehog house: cut, fold, fix, cover',1],
 ['Size, food and lifespan of three garden birds',2],['Why a hedgehog rolls into a ball when it is scared',3],['Steps to clean a bird bath safely',1]];
const FOR=['separate items in no set order','steps that must happen in order','several things compared on the same features','ideas linked by because and so'];
const ROWS=['Hedgehog','Bat','Squirrel'],COLS=['Food','Hibernates?'];
const FACTS=[['Hedgehogs hunt beetles and worms.',0,0,'Beetles, worms'],['Bats hibernate in caves and lofts.',1,1,'Yes'],['Squirrels eat nuts and seeds.',2,0,'Nuts, seeds'],
 ['Hedgehogs sleep through winter under leaf piles.',0,1,'Yes'],['Bats catch moths and other insects.',1,0,'Insects'],['Squirrels stay active all winter.',2,1,'No']];
const TIPS=[['Leave out a shallow dish of water',0,'Water helps in dry weather.'],['Feed them milk or bread',1,'Milk upsets their stomachs; bread is poor food.'],
 ['Check bonfire piles before lighting',0,'Hedgehogs nest in stick piles.'],['Scatter slug pellets',1,'Slug pellets can harm hedgehogs.']];
const PARTS=[['Title: Hedgehog Helper',0,'Fine: a short title gives the topic at once.',''],
 ['Sub-heading: This part is about the places where hedgehogs like to make nests',1,'Fixed: now "Nest spots". Sub-headings are short labels.','Nest spots'],
 ['Bullets: • Fill the bowl • Put it out at dusk • Wash the bowl • Choose a quiet spot',1,'Fixed: these are steps, so now they are numbered, in order.','1 Choose a spot  2 Fill the bowl  3 Put it out at dusk  4 Wash it'],
 ['Bullets: • beetles • worms • caterpillars',0,'Fine: separate items suit bullets.',''],
 ['Table with no headers: Hedgehog | Yes / Bat | Yes',1,'Fixed: column headers now say what each column means.','Animal | Hibernates?']];
VIS.reg('flaglayout',c=>{let A,bar,qbox,qn=-1,gen=0,streak=0;
const fresh=()=>({after:()=>{},n:0,put:[],hold:null,bad:-1,sel:-1,glow:-1,fx:[],dx:0}),S=fresh();
const part=()=>['head','dev','table','cols','fix','quiz'][A.step],quick=()=>A.reduced(),px=n=>Math.round(n*(A.narrow?1:1.12));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function word(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-10)}
/* wrapped text, returns the height used */
function flow(g,t,x,y,w,n,col,wt){g.font=`${wt||500} ${px(n)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='top';g.fillStyle=col||A.col.tx;const lh=px(n)*1.3,ls=[];let ln='';
 for(const v of t.split(' ')){const t2=ln?ln+' '+v:v;if(g.measureText(t2).width>w&&ln){ls.push(ln);ln=v}else ln=t2}if(ln)ls.push(ln);ls.forEach((l,i)=>g.fillText(l,x,y+i*lh));return ls.length*lh}
function mid(g,t,cx,cy,w,n,col,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;const ls=[];let ln='';for(const v of t.split(' ')){const t2=ln?ln+' '+v:v;if(g.measureText(t2).width>w&&ln){ls.push(ln);ln=v}else ln=t2}ls.push(ln);
 const lh=px(n)*1.25;ls.forEach((l,i)=>word(g,l,cx,cy+(i-(ls.length-1)/2)*lh,n,col,wt))}
function box(g,r,fill,line,lw,dash){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();if(dash)g.setLineDash([6,5]);g.lineWidth=lw||2;g.strokeStyle=line;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.setLineDash([])}
const hit=(p,r)=>r&&p.x>=r.x-4&&p.x<=r.x+r.w+4&&p.y>=r.y-4&&p.y<=r.y+r.h+4;
const page=()=>A.col.dark?'#0f172a':'#fff',line=()=>A.mix(A.col.tx,A.col.pn,.45),tint=h=>A.mix(A.col.pn,h,A.col.dark?.2:.55);
const follow=r=>S.hold&&S.hold.x!=null?{...r,x:S.hold.x-r.w/2,y:S.hold.y-r.h/2}:r;
/* step 1: sections with empty sub-heading slots, heading chips below */
const chipR=()=>{const cols=A.narrow?2:3,w=(A.W-16)/cols,h=40,y0=S.cy||A.H*.66;return HEADS.map((_,i)=>i===4?{x:11,y:y0+2*(h+6),w:A.W-22,h}:{x:8+(i%cols)*w+3,y:y0+Math.floor(i/cols)*(h+6),w:w-6,h})};
function drawHead(g){const C=A.col;let y=8;S.rects=[];
 SECS.forEach((s,i)=>{const slot={x:10,y,w:A.W-20,h:30},got=S.put[i];box(g,slot,got!=null?tint('#bbf7d0'):A.alpha(C.vi,.06),i===S.glow?C.vi:got!=null?C.gr:line(),i===S.glow?4:2,got==null);
  word(g,got!=null?HEADS[got][0]:'Sub-heading?',20,y+15,14,got!=null?C.tx:C.mu,got!=null?900:600,'left');
  const h=flow(g,s[0],16,y+36,A.W-32,12,C.tx);S.rects[i]=slot;y+=40+h});S.cy=y+4;
 chipR().forEach((r,k)=>{if(S.put.includes(k))return;const q=S.hold&&S.hold.k===k?follow(r):r;box(g,q,page(),S.bad===k?C.rd:S.sel===k?C.ac:line(),S.bad===k||S.sel===k?4:2);mid(g,HEADS[k][0],q.x+q.w/2,q.y+q.h/2,q.w-10,12,C.tx,700)})}
function place(k,i){if(S.n>=3||S.put.includes(k))return;const h=HEADS[k];if(i==null)i=S.put.findIndex(v=>v==null)<0?S.put.length:S.put.findIndex(v=>v==null);
 if(h[1]<0){S.bad=k;A.sound.miss();say('Not that one. '+h[2]);return A.redraw()}
 if(h[1]!==i){S.bad=k;A.sound.miss();say(`"${h[0]}" sums up section ${h[1]+1}, not section ${i+1}. Read what section ${i+1} is about.`);return A.redraw()}
 S.put[i]=k;S.n++;S.bad=-1;S.sel=-1;A.sound.pop();say(`Yes: "${h[0]}" labels section ${i+1}.${S.n<3?' Next section.':' Every section has a clear sub-heading.'}`);twins();A.redraw();S.after()}
/* step 2: sort content cards into devices */
const binR=()=>{const w=(A.W-24)/2,h=A.H*.17;return DEV.map((_,i)=>({x:8+(i%2)*(w+8),y:8+Math.floor(i/2)*(h+8),w,h}))};
const cardR=()=>{const w=Math.min(A.W-30,420);return{x:A.W/2-w/2,y:A.H*.6,w,h:A.H*.2}};
function drawDev(g){const C=A.col;binR().forEach((r,i)=>{box(g,r,tint(['#bfdbfe','#fde68a','#ddd6fe','#bbf7d0'][i]),i===S.glow?C.vi:line(),i===S.glow?4:2);word(g,DEV[i],r.x+r.w/2,r.y+20,14,C.tx,900);
  const got=S.put.filter(p=>p[1]===i).length;if(got)word(g,'✓'.repeat(got),r.x+r.w/2,r.y+r.h-18,15,C.gr,900)});
 if(S.n<5){const r=follow(cardR());box(g,r,page(),S.bad>=0?C.rd:line(),S.bad>=0?4:2);flow(g,CARDS[S.n][0],r.x+12,r.y+12,r.w-24,13,C.tx,700);word(g,'Drag me to a box',r.x+r.w/2,r.y+r.h-12,11,C.mu,600)}
 else word(g,'All five sorted.',A.W/2,A.H*.7,15,C.gr,800)}
function sort(i){if(S.n>=5)return;const cd=CARDS[S.n],j=cd[1];S.glow=i;
 if(i!==j){S.bad=1;A.sound.miss();say(`Not quite. ${DEV[i].replace(/^\S+ /,'')} are for ${FOR[i]}, but this card has ${FOR[j]}.`+(j===1&&!i?' Bullets lose the order.':''));return A.redraw()}
 S.put.push([S.n,i]);S.n++;S.bad=-1;A.sound.pop();say(`Yes: ${FOR[i]}, so ${DEV[i].replace(/^\S+ /,'').toLowerCase()} fit.`);twins();A.redraw();S.after()}
/* step 3: table cells */
function grid(){const x0=A.narrow?8:A.W*.08,w=A.W-2*x0,cw=[w*.3,w*.38,w*.32],y0=A.H*.04,rh=Math.min(A.H*.1,52);return{x0,y0,rh,cw,w}}
const cellR=(r,k)=>{const T=grid();return{x:T.x0+T.cw[0]+(k?T.cw[1]:0),y:T.y0+(r+1)*T.rh,w:T.cw[k+1],h:T.rh}};
function drawTable(g){const C=A.col,T=grid(),x1=T.x0+T.cw[0];box(g,{x:T.x0,y:T.y0,w:T.w,h:T.rh*4},page(),line());
 g.fillStyle=tint('#ddd6fe');g.fillRect(T.x0+1,T.y0+1,T.w-2,T.rh-1);word(g,'Animal',T.x0+T.cw[0]/2,T.y0+T.rh/2,13,C.tx,900);
 COLS.forEach((h,k)=>{const q=cellR(-1,k);word(g,h,q.x+q.w/2,q.y+q.h/2,13,C.tx,900)});
 ROWS.forEach((n,r)=>{word(g,n,T.x0+T.cw[0]/2,T.y0+(r+1.5)*T.rh,13,C.tx,800);COLS.forEach((_,k)=>{const q=cellR(r,k),f=FACTS.find(F=>F[1]===r&&F[2]===k&&S.put.includes(F));
  if(S.bad===r*2+k){g.fillStyle=A.alpha(C.rd,.25);g.fillRect(q.x+2,q.y+2,q.w-4,q.h-4)}if(f)word(g,f[3],q.x+q.w/2,q.y+q.h/2,12.5,C.tx,700)})});
 g.strokeStyle=line();g.lineWidth=1.5;g.beginPath();for(let r=1;r<4;r++){g.moveTo(T.x0,T.y0+r*T.rh);g.lineTo(T.x0+T.w,T.y0+r*T.rh)}
 [x1,x1+T.cw[1]].forEach(x=>{g.moveTo(x,T.y0);g.lineTo(x,T.y0+4*T.rh)});g.stroke();
 if(S.n<6){const r={x:12,y:A.H*.68,w:A.W-24,h:A.H*.14};box(g,r,tint('#fde68a'),line());mid(g,`Fact ${S.n+1} of 6: “${FACTS[S.n][0]}”`,A.W/2,r.y+r.h/2,r.w-16,13,C.tx,800);word(g,'Tap the cell where it belongs',A.W/2,A.H*.89,12,C.mu,600)}
 else mid(g,'Table complete: compare down a column at a glance.',A.W/2,A.H*.76,A.W-30,14,C.gr,800)}
function cellAt(p){for(let r=0;r<3;r++)for(let k=0;k<2;k++)if(hit(p,cellR(r,k)))return[r,k];return null}
function file(r,k){if(S.n>=6)return;const f=FACTS[S.n];if(r!==f[1]||k!==f[2]){S.bad=r*2+k;A.sound.miss();
  say(r!==f[1]?`That is the ${ROWS[r]} row. This fact is about the ${ROWS[f[1]]}: find its row header first.`:`Right row, wrong column. This fact is about ${f[2]?'winter (Hibernates?)':'food'}, so use the ${COLS[f[2]]} column.`);return A.redraw()}
 S.put.push(f);S.n++;S.bad=-1;A.sound.pop();say(`Yes: ${ROWS[r]}, ${COLS[k]}. The cell says "${f[3]}": tables use short notes, not full sentences.`);twins();A.redraw();S.after()}
/* step 4: swipe tips into Do / Don't columns */
const tipR=()=>{const w=Math.min(A.W*.7,320);return{x:A.W/2-w/2+S.dx,y:A.H*.66,w,h:A.H*.16}};
function drawCols(g){const C=A.col,w=A.W/2-12;[0,1].forEach(i=>{const r={x:8+i*(w+8),y:8,w,h:A.H*.54};box(g,r,tint(i?'#fecaca':'#bbf7d0'),i===S.glow?C.vi:line(),i===S.glow?4:2);
  word(g,i?'✗ Don\'t':'✓ Do',r.x+r.w/2,r.y+20,15,C.tx,900);S.put.filter(t=>t[1]===i).forEach((t,j)=>flow(g,'• '+t[0],r.x+8,r.y+42+j*px(12)*3.1,r.w-16,12,C.tx,600))});
 if(S.n<4){const r=tipR();box(g,r,page(),S.bad>=0?C.rd:line(),S.bad>=0?4:2);mid(g,TIPS[S.n][0],r.x+r.w/2,r.y+r.h/2-8,r.w-14,13,C.tx,800);word(g,'⟵ Do   |   Don\'t ⟶',r.x+r.w/2,r.y+r.h-12,11,C.mu,600)}
 else mid(g,'Two columns: the reader compares Do and Don\'t side by side.',A.W/2,A.H*.74,A.W-30,13,C.gr,800)}
function swipe(i){if(S.n>=4)return;const t=TIPS[S.n];S.dx=0;S.glow=i;if(i!==t[1]){S.bad=1;A.sound.miss();say(`Not that column. ${t[2]}`);return A.redraw()}
 S.put.push(t);S.n++;S.bad=-1;A.sound.pop();say(`Yes, ${i?'Don\'t':'Do'}. ${t[2]}`);twins();A.redraw();S.after()}
/* step 5: fix the leaflet */
function slabs(){const y0=8,h=(A.H*.86)/PARTS.length;return PARTS.map((_,i)=>({x:8,y:y0+i*h,w:A.W-16,h:h-6}))}
function drawFix(g){const C=A.col;slabs().forEach((r,i)=>{const P=PARTS[i],done=S.fx.includes(i);box(g,r,done?tint('#bbf7d0'):page(),i===S.bad?C.rd:i===S.sel?C.ac:done?C.gr:line(),i===S.bad||i===S.sel||done?3:1.5);
  flow(g,done&&P[3]?'✓ '+P[3]:P[0],r.x+10,r.y+8,r.w-20,i===0?14:12.5,C.tx,i===0||i===1?800:500)});
 word(g,`Slips fixed: ${S.fx.filter(i=>PARTS[i][1]).length} of 3`,A.W/2,A.H*.94,13,C.tx,800)}
function fix(i){const P=PARTS[i],fixed=S.fx.filter(j=>PARTS[j][1]).length;if(fixed>=3)return;S.sel=i;
 if(!P[1]){S.bad=i;A.sound.miss();say(P[2]+' Look for a slip somewhere else.');return A.redraw()}
 if(S.fx.includes(i))return;S.fx.push(i);S.n++;S.bad=-1;A.sound.pop();say(P[2]);twins();A.redraw();S.after()}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);
 ({head:drawHead,dev:drawDev,table:drawTable,cols:drawCols,fix:drawFix,quiz:drawFix}[part()])(g);A.fx.draw(g)}
function twins(){if(!bar)return;bar.innerHTML='';const m=part(),B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},bar,t);b.onclick=f};
 if(m==='head'&&S.n<3){const i=S.put.findIndex(v=>v==null)<0?S.put.length:S.put.findIndex(v=>v==null);HEADS.forEach((h,k)=>{if(!S.put.includes(k))B(h[0],`Use "${h[0]}" as the sub-heading for section ${i+1}`,()=>place(k,i))})}
 if(m==='dev'&&S.n<5)DEV.forEach((d,i)=>B(d,`Put this card in ${d}`,()=>sort(i)));
 if(m==='table'&&S.n<6)ROWS.forEach((r,ri)=>COLS.forEach((h,k)=>B(`${r} · ${h}`,`Put the fact in the ${r} row, ${h} column`,()=>file(ri,k))));
 if(m==='cols'&&S.n<4){B('⟵ Do','Put this tip in the Do column',()=>swipe(0));B('Don\'t ⟶','Put this tip in the Don\'t column',()=>swipe(1))}
 if(m==='fix')PARTS.forEach((p,i)=>{if(!S.fx.includes(i))B(`Check part ${i+1}`,`Check part ${i+1}: ${p[0]}`,()=>fix(i))})}
function down(p){const m=part();if(m==='quiz')return false;
 if(m==='head'){const k=chipR().findIndex((r,k)=>!S.put.includes(k)&&hit(p,r));if(k>=0){S.hold={k,x:p.x,y:p.y};S.sel=k;A.redraw();return true}
  const i=(S.rects||[]).findIndex(r=>hit(p,r));if(i>=0&&S.sel>=0&&S.put[i]==null)place(S.sel,i);return false}
 if(m==='dev'){if(S.n<5&&hit(p,cardR())){S.hold={k:0,x:p.x,y:p.y};return true}const i=binR().findIndex(r=>hit(p,r));if(i>=0)sort(i);return false}
 if(m==='table'){const q=cellAt(p);if(q)file(q[0],q[1]);return false}
 if(m==='cols'){if(S.n<4&&hit(p,tipR())){S.hold={x0:p.x};return true}return false}
 if(m==='fix'){const i=slabs().findIndex(r=>hit(p,r));if(i>=0)fix(i);return false}return false}
function move(p){const m=part();if(!S.hold)return;if(m==='cols'){S.dx=p.x-S.hold.x0;return A.redraw()}S.hold.x=p.x;S.hold.y=p.y;A.redraw()}
function up(p){const m=part(),h=S.hold;S.hold=null;if(!h)return;
 if(m==='head'){const i=(S.rects||[]).findIndex(r=>hit(p,r));if(i>=0&&S.put[i]==null)place(h.k,i);else{say(`"${HEADS[h.k][0]}" picked up. Tap a section to place it.`);A.redraw()}}
 if(m==='dev'){const i=binR().findIndex(r=>hit(p,r));if(i>=0)sort(i);else A.redraw()}
 if(m==='cols'){const d=S.dx;if(Math.abs(d)>A.W*.12)swipe(d<0?0:1);else{S.dx=0;A.redraw()}}}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const v=++gen;list.forEach((f,j)=>setTimeout(()=>{if(v===gen)f()},quick()?j*40+30:(j+1)*(ms||450)))}
const start=()=>{gen++;Object.assign(S,fresh())};
const steps=[
{h:'Sub-headings guide the reader',p:'A sub-heading is a short label that says what one section is about. Drag each one onto its section, or tap it and then tap the section.',predict:{q:'Which makes a better sub-heading?',opts:['A short label for the section','The first sentence of the section'],ans:0},task:'Label all 3 sections',
 show:()=>{steps[0].go();play([0,1,2].map(i=>()=>place(i,i)),600)},go:()=>{start();say('Three sections, no sub-headings yet. Pick a label for section 1.');twins();S.after=finish(0,()=>S.n>=3,'Short sub-headings let a reader jump straight to the section they need.')}},
{h:'Pick the device',p:'Layout devices suit different content. Drag each card to the device that fits it best.',predict:{q:'How should you set out the steps to build a hedgehog house?',opts:['Bullet points','A numbered list'],ans:1},task:'Sort all 5 cards',
 show:()=>{steps[1].go();play(CARDS.map(cd=>()=>sort(cd[1])),550)},go:()=>{start();say('Card 1: '+CARDS[0][0]+'. Which device fits?');twins();S.after=finish(1,()=>S.n>=5,'Separate items: bullets. Steps in order: numbers. Comparing features: a table. Linked reasons: a paragraph.')}},
{h:'Build a table',p:'A table has row headers down the side and column headers across the top. Each fact goes where its row and its column meet.',predict:{q:'Why put these facts in a table?',opts:['Tables always look neater','The reader can compare one feature across all three animals'],ans:1},task:'File all 6 facts',
 show:()=>{steps[2].go();play(FACTS.map(f=>()=>file(f[1],f[2])),450)},go:()=>{start();say('Fact 1: '+FACTS[0][0]+' Tap the cell where it belongs.');twins();S.after=finish(2,()=>S.n>=6,'Row header plus column header finds the cell. Read down the Hibernates? column to compare at a glance.')}},
{h:'Columns side by side',p:'Two columns let a reader compare two sets of points. Swipe each tip left into Do or right into Don\'t.',task:'Place all 4 tips',
 show:()=>{steps[3].go();play(TIPS.map(t=>()=>swipe(t[1])),550)},go:()=>{start();say('Tip 1: '+TIPS[0][0]+'. Swipe left for Do, right for Don\'t.');twins();S.after=finish(3,()=>S.n>=4,'Each column has a header, so the reader knows which list they are in.')}},
{h:'Fix the leaflet',p:'This leaflet has three layout slips. Tap each part to check it. Parts that already work stay as they are.',task:'Fix 3 slips',
 show:()=>{steps[4].go();play([1,2,4].map(i=>()=>fix(i)),700)},go:()=>{start();say('Tap a part of the leaflet to check its layout.');twins();S.after=finish(4,()=>S.fx.filter(i=>PARTS[i][1]).length>=3,'Short sub-heading, numbered steps and a headed table: now the reader can find things fast.')}},
{h:'Challenge',p:'',go:()=>{start();S.fx=[0,1,2,3,4];ask()}}];
const QS=[['You write the rules of a board game, in the order players do them. Which device fits?',[['A numbered list','ok'],['Bullet points','bul'],['A table','tab']]],
 ['Which is the best sub-heading for a section about what foxes eat?',[['What foxes eat','ok'],['Foxes are clever animals that live almost everywhere','long'],['More facts','vague']]],
 ['You compare the height, speed and food of four dinosaurs. Which device fits?',[['A table','ok'],['A numbered list','num'],['A paragraph','para']]],
 ['In a table, where do you look to find what a column is about?',[['The column header at the top','ok'],['The last row','last'],['The row headers down the side','row']]],
 ['You explain why the sea is salty, using because and so. Which device fits?',[['A paragraph','ok'],['Bullet points','bul2'],['A table','tab2']]]];
function hint(t){let m='Think about what the reader needs to do with the content.';
 if(t==='bul')m='Bullets lose the order. The players need step 1 before step 2, so number the steps.';
 if(t==='tab'||t==='tab2')m='A table compares several things on the same features. There is nothing to line up here.';
 if(t==='long')m='That is a whole sentence, and not about food. A sub-heading is a short label.';
 if(t==='vague')m='Too vague: it does not tell the reader what the section is about.';
 if(t==='num')m='Numbers are for steps in order. Four dinosaurs on three features need rows and columns.';
 if(t==='para')m='In a paragraph the reader must hunt for each number. A table lines the features up to compare.';
 if(t==='last'||t==='row')m='Row headers name each row. The column header, across the top, names the column.';
 if(t==='bul2')m='An explanation joins ideas with because and so. Bullets break those links, so use a paragraph.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>score(t)});say('Challenge: '+q);A.redraw()}
function score(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Correct. Streak: '+streak+'.':'✗ '+hint(t)} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
A=FK.shell(c,{steps,ratio:.7,tall:1.5,draw,onStep:A=>{qbox.hidden=A.step!==5;bar.hidden=A.step===5;twins()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);bar=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});twins()}});
A.start()})})();
