/* Flagship: combining information from two texts (ages 9–10; CCSS RI.4.9, integrate information from two texts on the
   same topic). Two short hedgehog texts sit side by side. Drag each fact into Only A, Both or Only B; decide which text
   answers a question; settle a disagreement with a third source; build a combined summary that says each fact once and
   adds nothing new; then join A and B with “Both texts say”, “Text B adds” or “However”. Buttons do every action too. */
(()=>{
const {K,TEXTA,TEXTB,SORT,ASK,CLASH,SUM,LINKS,JOIN,JOINWHY,QS}=TWOTEXTART;
const KEEP=SUM.map((s,i)=>s[1]?i:-1).filter(i=>i>=0),ZONES=['Only A','Both','Only B'],ZC=[[K.a,K.aBg],[K.both,K.bothBg],[K.b,K.bBg]];
VIS.reg('flagtwotext',c=>{let A,g,ctl,chal,run=0,ver=0,cq=-1;
const st={fin:()=>{}};
const stage=()=>['sort','ask','clash','sum','join','quiz'][A.step];
const s=n=>Math.round(n*Math.min(1.2,Math.max(1,A.W/380)));
function setF(n,w){g.font=`${w||700} ${s(n)}px system-ui,sans-serif`}
function put(t,x,y,n,col,w,al){setF(n,w);g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(t),x,y)}
function card(x,y,w,h,f,e,lw){A.paint.rrect(x,y,w,h,s(10));g.fillStyle=f;g.fill();if(e){g.strokeStyle=e;g.lineWidth=lw||2;g.stroke()}}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function split(t,max,n,w){setF(n,w);const out=[];let line='';String(t).split(' ').forEach(x=>{const y=line?line+' '+x:x;if(line&&g.measureText(y).width>max){out.push(line);line=x}else line=y});out.push(line);return out}
/* a block of wrapped text; returns its bottom */
function para(t,x,y,max,n,col,w,al){const L=split(t,max,n,w),lh=s(n*1.35);L.forEach((r,i)=>put(r,al==='left'?x:x+max/2,y+lh*(i+.5),n,col,w,al));return y+L.length*lh}
function head(t,ok){const L=split(t,A.W-s(40),14,800),lh=s(19),h=L.length*lh+s(12);card(s(10),s(10),A.W-s(20),h,ok?K.yesBg:'#fef9c3',ok?K.yes:'#a16207',2);
 L.forEach((r,i)=>put(r,A.W/2,s(16)+lh*(i+.5),14,ok?K.yes:K.ink,800));return s(10)+h}
function texts(t,glow){const gap=s(8),w=(A.W-s(20)-gap)/2;let bottom=t;[[TEXTA,K.a,K.aBg],[TEXTB,K.b,K.bBg]].forEach(([T,col,bg],k)=>{const x=s(10)+k*(w+gap),L=split(T[1],w-s(14),11,600),h=s(24)+L.length*s(15)+s(8);
  card(x,t,w,h,'#ffffff',col,glow===k||glow===2?4:1.5);card(x,t,w,s(20),bg,null);put(T[0],x+w/2,t+s(10),10,col,900);L.forEach((r,i)=>put(r,x+s(7),t+s(24)+s(15)*(i+.5),11,K.ink,600,'left'));bottom=Math.max(bottom,t+h)});return bottom}
function note(){if(!st.say)return;const L=split((st.bad?'✗ ':'✓ ')+st.say,A.W-s(44),13,700),lh=s(18),h=L.length*lh+s(12),y=A.H-h-s(10);
 card(s(12),y,A.W-s(24),h,st.bad?K.noBg:'#ffffff',st.bad?K.no:K.yes,2.5);L.forEach((r,i)=>put(r,A.W/2,y+s(6)+lh*(i+.5),13,st.bad?K.no:K.ink,700))}
const wrong=m=>{st.bad=true;st.say=m;A.sound.miss();sync()};
const right=m=>{st.bad=false;st.say=m;A.sound.pop()};
function step1(total,last){st.n++;if(st.n>=total){st.won=true;st.say=last}sync()}
/* step 0: sort facts into a Venn diagram */
function drop(z){if(st.won)return;const f=SORT[st.n];if(z!==f[2])return wrong(f[3]);st.placed.push(st.n);right(f[3]);step1(SORT.length,'Both texts, only A, only B: every fact placed.')}
/* step 1: which text answers the question */
function answer(k){if(st.won)return;const q=ASK[st.n];if(k!==q[1])return wrong(q[2]);st.glow=q[1];right(q[2]);step1(ASK.length,'You know where to look for each answer.')}
/* step 2: the texts disagree */
function settle(k){if(st.won)return;const q=CLASH[st.n],ord=order(q[1].length,st.n);const pick=ord[k];if(pick)return wrong(q[2][pick-1]);right(st.n?'Write the range the checked source gives.':'A third source can settle it.');step1(CLASH.length,'Disagreement checked and settled with a third source.')}
/* step 3: build the summary */
function choose(i){if(st.won||st.kept.includes(i)||st.out.includes(i))return;const x=SUM[i];if(!x[1]){st.out.push(i);return wrong(x[2])}st.kept.push(i);right(x[2]);if(KEEP.every(j=>st.kept.includes(j))){st.won=true;st.say='Five sentences: every fact once, nothing made up.'}sync()}
/* step 4: linking words */
function link(k){if(st.won)return;const j=JOIN[st.n];if(k!==j[2])return wrong(`${JOINWHY[j[2]]} Use “${LINKS[j[2]]}”.`);st.joined.push(j[3]);right(j[3]);step1(JOIN.length,'A paragraph that credits both texts.')}
const order=(n,r)=>{const a=[...Array(n).keys()],k=r%n;return a.slice(k).concat(a.slice(0,k))};
function paintSort(t,b){let y=texts(t+s(6),-1)+s(10);const done=st.won,f=SORT[Math.min(st.n,SORT.length-1)],cw=A.W-s(60),ch=s(36);
 if(!done){const d=st.drag,x=d?d.x-cw/2:s(30),yy=d?d.y-ch/2:y;card(x,yy,cw,ch,K.card,K.ink,d?3.5:2);put(f[0],x+cw/2,yy+ch/2,13,K.ink,800);st.chip={x:s(30),y,w:cw,h:ch}}else st.chip=null;
 y+=ch+s(12);const zw=(A.W-s(20)-s(12))/3,zh=Math.max(s(90),b-y-s(4));st.zones=ZONES.map((z,k)=>{const x=s(10)+k*(zw+s(6)),r={x,y,w:zw,h:zh,k};card(x,y,zw,zh,ZC[k][1],ZC[k][0],k===1?3:2);put(z,x+zw/2,y+s(14),12,ZC[k][0],900);
  st.placed.filter(i=>SORT[i][2]===k).forEach((i,j)=>{const cy=y+s(34)+j*s(24);card(x+s(5),cy-s(10),zw-s(10),s(20),'#ffffff',ZC[k][0],1);put(SORT[i][1],x+zw/2,cy,11,K.ink,700)});return r})}
function tiles(labels,y,cols){const gp=s(8),w=(A.W-s(20)-gp*(cols-1))/cols;return labels.map((t,k)=>{const L=split(t,w-s(16),13,800),h=Math.max(s(46),L.length*s(18)+s(14)),r={x:s(10)+(k%cols)*(w+gp),y:y,w,h,k};return{r,L}})}
function drawTiles(T,y,cols){let rowH=0,yy=y;const out=[];T.forEach((o,k)=>{if(k&&k%cols===0){yy+=rowH+s(8);rowH=0}o.r.y=yy;rowH=Math.max(rowH,o.r.h)});
 T.forEach(o=>{card(o.r.x,o.r.y,o.r.w,o.r.h,'#ffffff',K.a,2.5);o.L.forEach((l,i)=>put(l,o.r.x+o.r.w/2,o.r.y+o.r.h/2+(i-(o.L.length-1)/2)*s(18),13,K.a,800));out.push(o.r)});return out}
function paintAsk(t){let y=texts(t+s(6),st.glow)+s(12);if(st.won){st.btns=[];return}const q=ASK[st.n];y=para(q[0],s(20),y,A.W-s(40),15,K.ink,800)+s(10);
 st.btns=drawTiles(tiles(['Text A','Text B','Both texts'],y,3),y,3);put(`Question ${st.n+1} of ${ASK.length}`,A.W/2,st.btns[0].y+st.btns[0].h+s(16),12,K.soft,700)}
function paintClash(t){let y=t+s(12);const q=CLASH[Math.min(st.n,CLASH.length-1)];
 [['Text A','about 5,000 spines',K.a,K.aBg],['Text B','about 7,000 spines',K.b,K.bBg]].forEach(([h,v,col,bg],k)=>{const w=(A.W-s(28))/2,x=s(10)+k*(w+s(8));card(x,y,w,s(54),bg,col,2);put(h,x+w/2,y+s(16),11,col,900);put(v,x+w/2,y+s(37),14,K.ink,800)});
 y+=s(54)+s(10);if(st.n>=1){card(s(10),y,A.W-s(20),s(46),K.bothBg,K.both,2.5);put('Third source: a wildlife trust',A.W/2,y+s(13),11,K.both,900);put('“between 5,000 and 7,000 spines”',A.W/2,y+s(32),13,K.ink,800);y+=s(56)}
 if(st.won){st.btns=[];para('An adult has about 5,000 to 7,000 spines.',s(20),y+s(6),A.W-s(40),15,K.yes,800);return}
 y=para(q[0],s(20),y,A.W-s(40),13,K.ink,800)+s(8);const ord=order(q[1].length,st.n);st.btns=drawTiles(tiles(ord.map(i=>q[1][i]),y,1),y,1)}
function paintSum(t,b){let y=t+s(10);const kept=SUM.map((x,i)=>i).filter(i=>st.kept.includes(i));const L=kept.length?split(kept.map(i=>SUM[i][0]).join(' '),A.W-s(44),12,700):['Tap a sentence to add it.'];
 const h=s(26)+L.length*s(16)+s(6);card(s(10),y,A.W-s(20),h,K.yesBg,K.yes,2);put(`Our summary: ${st.kept.length} of ${KEEP.length}`,A.W/2,y+s(12),11,K.yes,900);L.forEach((r,i)=>put(r,s(22),y+s(26)+s(16)*(i+.5),12,kept.length?K.ink:K.soft,700,'left'));y+=h+s(10);
 st.btns=[];SUM.forEach((x,i)=>{if(st.kept.includes(i))return;const no=st.out.includes(i),Lr=split(x[0],A.W-s(44),12,700),hh=Lr.length*s(16)+s(12);if(y+hh>b)return;const r={x:s(10),y,w:A.W-s(20),h:hh,i};
  card(r.x,y,r.w,hh,no?K.noBg:'#ffffff',no?K.no:K.frame,no?2:1.5);Lr.forEach((l,j)=>put(l,s(22),y+s(6)+s(16)*(j+.5),12,no?K.no:K.ink,700,'left'));if(!no)st.btns.push(r);y+=hh+s(6)})}
function paintJoin(t,b){let y=t+s(10);if(!st.won){const j=JOIN[st.n];[['Text A says',j[0],K.a,K.aBg],['Text B says',j[1],K.b,K.bBg]].forEach(([h,v,col,bg])=>{const L=split(v,A.W-s(44),13,800),hh=s(20)+L.length*s(17)+s(6);
  card(s(10),y,A.W-s(20),hh,bg,col,2);put(h,s(22),y+s(11),11,col,900,'left');L.forEach((l,i)=>put(l,s(22),y+s(20)+s(17)*(i+.5),13,K.ink,800,'left'));y+=hh+s(6)});
  y+=s(4);st.btns=drawTiles(tiles(LINKS,y,1),y,1);y=st.btns[st.btns.length-1].y+st.btns[st.btns.length-1].h+s(10)}else st.btns=[];
 if(st.joined.length){const L=split(st.joined.join(' '),A.W-s(44),12,700);card(s(10),y,A.W-s(20),s(22)+L.length*s(16),K.yesBg,K.yes,2);put('Our paragraph',A.W/2,y+s(11),11,K.yes,900);L.forEach((r,i)=>put(r,s(22),y+s(22)+s(16)*(i+.5),12,K.ink,700,'left'))}}
function draw(){g.fillStyle=A.col.dark?'#0f172a':K.paper;g.fillRect(0,0,A.W,A.H);g.fillStyle=K.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);g.fill();
 const m=stage(),H={sort:['Is the fact in Text A, Text B or both? Drag it.','Every fact sorted.'],ask:['Which text answers the question?','Questions matched to texts.'],clash:['The texts disagree. What now?','Settled with a third source.'],
  sum:['Tap the sentences that belong in one summary of both texts.','Summary built.'],join:['Pick the words that join A and B.','Paragraph joined.'],quiz:['Combining texts challenge','']};
 const t=head(H[m][st.won?1:0]||H[m][0],st.won),b=A.H-(st.say?s(74):s(12));
 if(m==='sort')paintSort(t,b);if(m==='ask')paintAsk(t);if(m==='clash')paintClash(t);if(m==='sum')paintSum(t,b);if(m==='join')paintJoin(t,b);
 if(m==='quiz')para('Same fact in other words: both. New detail: adds. Numbers clash: check a third source. Say each fact once, and add nothing from outside the texts.',s(20),t+s(16),A.W-s(40),14,K.soft,700);note();A.fx.draw(g)}
function down(p){const m=stage();if(st.won)return false;
 if(m==='sort'){if(inside(p,st.chip)){st.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const z=(st.zones||[]).find(r=>inside(p,r));if(z){drop(z.k);return true}return false}
 const r=(st.btns||[]).find(q=>inside(p,q));if(!r)return false;if(m==='ask')answer(r.k);if(m==='clash')settle(r.k);if(m==='sum')choose(r.i);if(m==='join')link(r.k);return true}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const z=(st.zones||[]).find(r=>inside(p,r));if(z)drop(z.k);else A.redraw()}
function sync(){const m=stage();let d='Challenge.';
 if(m==='sort')d=st.won?'All seven facts sorted.':`Fact: ${SORT[st.n][0]} Only A, Both, or Only B?`;
 if(m==='ask')d=st.won?'All five questions matched.':`Question: ${ASK[st.n][0]} Text A, Text B or both?`;
 if(m==='clash')d=st.won?'Settled: about 5,000 to 7,000 spines.':CLASH[st.n][0];
 if(m==='sum')d=`Summary has ${st.kept.length} of ${KEEP.length} sentences: ${st.kept.map(i=>SUM[i][0]).join(' ')}`;
 if(m==='join')d=st.won?'Paragraph: '+st.joined.join(' '):`Text A says ${JOIN[st.n][0]}. Text B says ${JOIN[st.n][1]}. Which linking words fit?`;
 const msg=(st.say?st.say+' ':'')+d;c.say(msg);A.cv.setAttribute('aria-label',msg);controls();st.fin()}
function controls(){if(!ctl)return;ctl.innerHTML='';const m=stage(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},ctl,t).onclick=()=>{fn();sync()}};if(st.won)return A.redraw();
 if(m==='sort')ZONES.forEach((z,k)=>b(z,()=>drop(k)));if(m==='ask')['Text A','Text B','Both texts'].forEach((z,k)=>b(z,()=>answer(k)));
 if(m==='clash'){const q=CLASH[st.n];order(q[1].length,st.n).forEach((i,k)=>b(q[1][i],()=>settle(k)))}
 if(m==='sum')SUM.forEach((x,i)=>{if(!st.kept.includes(i)&&!st.out.includes(i))b('Add: '+x[0],()=>choose(i))});if(m==='join')LINKS.forEach((z,k)=>b(z,()=>link(k)));A.redraw()}
const finished=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const demo=(fns,ms)=>{const id=ver;fns.forEach((f,j)=>setTimeout(()=>{if(id===ver){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function fresh(){ver++;Object.assign(st,{fin:()=>{},won:false,say:'',bad:false,n:0,drag:null,placed:[],glow:-1,kept:[],out:[],joined:[],btns:[],zones:[],chip:null})}
const steps=[
{h:'Both, only A, only B',p:'Two texts about one topic share some facts and each has facts of its own. A fact can be in both even when the words differ: “come out at night” and “nocturnal” say the same thing.',
predict:{q:'Text A: “come out at night”. Text B: “nocturnal”. Where does “hunt at night” go?',opts:['Only A','Both'],ans:1},
task:'Sort 7 facts',show:()=>{steps[0].go();demo(SORT.map(f=>()=>drop(f[2])),480)},go:()=>{fresh();sync();st.fin=finished(0,()=>st.won,'Same idea in other words counts as both.')}},
{h:'Which text answers it?',p:'Before you write, know where each answer is. Some questions need one text. Others need both, because each text holds part of the answer.',
predict:{q:'“What do hedgehogs eat?” Which do you need?',opts:['Text A','Both texts'],ans:1},
task:'Match 5 questions',show:()=>{steps[1].go();demo(ASK.map(q=>()=>answer(q[1])),520)},go:()=>{fresh();sync();st.fin=finished(1,()=>st.won,'Some answers are split across both texts.')}},
{h:'When texts disagree',p:'Sometimes two texts give different facts. Do not just pick one. Check a third source you can trust, then write what it supports.',
task:'Settle the disagreement',show:()=>{steps[2].go();demo([()=>settle(order(3,0).indexOf(0)),()=>settle(order(3,1).indexOf(0))],700)},go:()=>{fresh();sync();st.fin=finished(2,()=>st.won,'Checked, not guessed.')}},
{h:'One summary from two texts',p:'A combined summary takes the key facts from both texts. Say each fact once, join facts that go together, and leave out opinions and facts that neither text gives.',
task:'Build the summary',show:()=>{steps[3].go();demo(KEEP.map(i=>()=>choose(i)),460)},go:()=>{fresh();sync();st.fin=finished(3,()=>st.won,'Every fact once, nothing invented.')}},
{h:'Join the texts',p:'Linking words show how the texts relate. “Both texts say” for the same fact. “Text B adds” for a new detail. “However” when they disagree.',
predict:{q:'Text A: 5,000 spines. Text B: 7,000 spines. Which words fit?',opts:['Text B adds …','However, Text B says …'],ans:1},
task:'Join 4 pairs',show:()=>{steps[4].go();demo(JOIN.map(j=>()=>link(j[2])),560)},go:()=>{fresh();sync();st.fin=finished(4,()=>st.won,'The paragraph shows what each text gave.')}},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.fin()});
function pose(){cq++;const [q,ok,bad]=QS[cq%QS.length],all=[[ok,'ok']].concat(bad),k=cq%all.length,ord=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ok)});c.say('Challenge: '+q);A.cv.setAttribute('aria-label','Challenge: '+q);A.redraw()}
function mark(tag,ok){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';let m='Ask how the texts relate: same fact, new detail, or a clash to check.';
 if(tag==='words')m='Look past the wording: do they give the same fact, or does one add or contradict something?';
 if(tag==='first')m='Reading a text first does not make it right. When numbers clash, check a third source.';
 if(tag==='add')m='Both numbers describe the same thing, so adding them gives a number neither text says.';
 if(tag==='one')m='Each text has part of the answer. Use both to get it all.';
 if(tag==='repeat')m='Saying a fact twice adds nothing. Combine means each fact once.';
 if(tag==='opinion')m='That is an opinion, not information from either text.';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+run+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Combining texts lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
