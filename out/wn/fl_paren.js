/* Flagship – Brackets and dashes for parenthesis (ages 9–10; NC England, English Appendix 2, Year 5: "brackets, dashes or
   commas to indicate parenthesis"). Lift test, pairs, choosing how loud the aside is, closing the pair, proofreading. */
(()=>{
/* sentence parts: before, aside, after (no full stop: it is added when drawn) */
const LIFT=[[['The oldest building','built in 1642','stands in the town square'],1],[['We ate lunch','at Pizza Palace','the one by the river'],2],[['In the end','after three long hours','we reached the top'],1],[['Mrs Shah','our head teacher','is retiring'],1]];
const PAIR=[['The oldest building','built in 1642','stands in the town square'],['Our dog','a scruffy terrier called Max','loves the beach'],['We ate lunch at Pizza Palace','the one by the river','']];
const MARKS=[['The prize','a brand-new bike','went to me',1,'really stand out'],['The museum','open 9 till 5','is free',0,'be a quiet side note'],['My aunt','who lives in Leeds','is a vet',2,'flow with the sentence'],['Then the lights went out','all of them','at once',1,'really stand out'],['Add the eggs','two large ones','and stir',0,'be a quiet side note']];
const CLOSE=[['My brother','who is older than me','lives in London',2],['The film','the best I have seen all year','was on TV',1],['Our teacher','Mr Hale','has a pet snake',0]];
const FIX=[['Mr Cole (our coach) shouted.','Mr Cole (our coach shouted.','one'],['Mr Cole (our coach) shouted.','Mr Cole – our coach) shouted.','mix'],
 ['The cake – all three layers of it – vanished.','The cake – all three layers of it, vanished.','mix'],['The cake – all three layers of it – vanished.','The – cake all three layers of it – vanished.','lift'],
 ['We swam in the lake (it was freezing).','We swam in the lake (it was freezing.)','stop'],['Jo, my cousin, can juggle.','Jo, my cousin can juggle.','one']];
const PN=['brackets','dashes','commas'],TILE=['( )','– –',', ,'],FEEL=['keep it quiet, like a whisper','make it stand out most','keep it in the flow'];
/* join a sentence with a pair of marks k (0 brackets, 1 dashes, 2 commas, -1 none) around the aside */
function mk(b,a,f,k){const end=f?' '+f+'.':'.';if(k<0)return [b,a,f].filter(Boolean).join(' ')+'.';
 if(k===0)return `${b} (${a})${end}`;if(k===1)return f?`${b} – ${a} – ${f}.`:`${b} – ${a}.`;return f?`${b}, ${a}, ${f}.`:`${b}, ${a}.`}
const words=t=>t?t.split(' '):[];
VIS.reg('flagparen',c=>{let A,g,pad,chal,qi=-1,ep=0;
const S={};
const INK='#0f172a',OK='#047857',NO='#be123c',HL='#fef3c7',HLT='#78350f',CHIP='#ede9fe',CHT='#3730a3',CARD='#ffffff',RIM='#64748b',SEL='#4338ca';
const z=v=>Math.round(v*(A.narrow?.94:1.06)),font=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const part=()=>['lift','pair','marks','close','fix','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const D={lift:LIFT,pair:PAIR,marks:MARKS,close:CLOSE,fix:FIX},over=k=>S[k].n>=D[k].length;
function bg(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tx(n,w,al){g.font=font(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function box(r,t,o){o=o||{};g.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.rim?3.5:1.3;g.strokeStyle=o.rim||RIM;g.stroke();
 if(t!=null){g.fillStyle=o.fg||INK;tx(o.n||16,o.w||750);wrap(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||16)}}
/* centred text, wrapped onto as many lines as it needs */
function wrap(t,x,y,w,n){const L=[];let cur='';t.split(' ').forEach(q=>{const k=cur?cur+' '+q:q;if(g.measureText(k).width>w&&cur){L.push(cur);cur=q}else cur=k});L.push(cur);
 const lh=z(n)*1.25;L.forEach((s,i)=>g.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function head(t,won){tx(14,800);const w=Math.min(A.W-8,g.measureText(t).width+24),h=z(14)+14,y=A.H*.025;box({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':CARD,rim:won?OK:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function say2(t,y,n,col){g.fillStyle=col||A.col.tx;tx(n||14,650);wrap(t,A.W/2,y,A.W-24,n||14)}
function done(t,L){bg();head(t,1);L.forEach((s,i)=>box({x:10,y:A.H*(.13+i*.21),w:A.W-20,h:A.H*.18},s,{n:15,bg:'#ecfdf5'}))}
/* lay word chips out in rows from y; each token {t, tap, hl}; returns the bottom edge */
function flow(T,y,n){g.font=font(n||17,750);const h=z(n||17)+z(18),gp=z(6);let x=10;T.forEach(t=>{const w=g.measureText(t.t).width+z(14);if(x+w>A.W-10&&x>10){x=10;y+=h+z(7)}t.r={x,y,w,h};x+=w+gp});return y+h}
function chips(T){T.forEach(t=>{const r=t.r;g.fillStyle=t.hl?HL:t.tap?CARD:'transparent';A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();if(t.tap||t.hl){g.lineWidth=t.sel?3:1.2;g.strokeStyle=t.sel?SEL:t.bad?NO:RIM;g.stroke()}
 g.fillStyle=t.hl?HLT:t.tap?INK:A.col.tx;tx(17,750);g.fillText(t.t,r.x+r.w/2,r.y+r.h/2+1)})}
/* step 1: lift test */
function cards(){const n=3,gp=z(10),h=z(56),top=A.H*.33;return [0,1,2].map(j=>({x:14,y:top+j*(h+gp),w:A.W-28,h,j}))}
function drawLift(){const s=S.lift;bg();if(over('lift'))return done('All 4 asides found',LIFT.map(([p,k])=>k===2?mk(p[0]+' '+p[1],p[2],'',0):mk(p[0],p[1],p[2],2)));
 const [p]=LIFT[s.n];head(`Sentence ${s.n+1} of 4: which part can you lift out?`);say2(mk(p[0],p[1],p[2],-1),A.H*.2,16);
 cards().forEach(r=>box(r,p[r.j],{rim:s.bad===r.j?NO:null,bg:s.bad===r.j?'#ffe4e6':CARD}));if(s.rest)say2(s.rest,A.H*.88,14,s.bad!=null?NO:OK)}
function lift(j){const s=S.lift;if(over('lift'))return;const [p,k]=LIFT[s.n],rest=p.filter((_,i)=>i!==j).join(' ')+'.';let m;
 if(j===k){s.n++;s.bad=null;s.rest='';A.sound.pop();return speak(`Lift it out: “${rest}” still makes sense. “${p[k]}” is the extra information.`)}
 s.bad=j;s.rest='Without it: “'+rest+'”';A.sound.miss();m=`Without “${p[j]}” you get “${rest}” That is not a complete sentence, so “${p[j]}” belongs to the main sentence.`;speak(m)}
/* step 2: put a pair of brackets round the aside */
function pairToks(){const [b,a,f]=PAIR[S.pair.n],T=[];[...words(b),...words(a),...words(f)].forEach((t,i)=>T.push({t,tap:1,i}));
 const s=S.pair;T.forEach(t=>{t.sel=t.i===s.o||t.i===s.c;t.bad=s.bad&&t.sel});return T}
function drawPair(){const s=S.pair;bg();if(over('pair'))return done('All 3 asides bracketed',PAIR.map(p=>mk(p[0],p[1],p[2],0)));
 head(`Sentence ${s.n+1} of 3: tap the first and last extra words`);const T=pairToks();T.push({t:'.'});const bot=flow(T,A.H*.16);chips(T);
 T.forEach(t=>{const r=t.r;g.fillStyle=SEL;tx(22,800);if(t.i===s.o)g.fillText('(',r.x-z(2),r.y+r.h/2);if(t.i===s.c)g.fillText(')',r.x+r.w+z(2),r.y+r.h/2)});
 say2(s.o==null?'Tap the first word of the extra information: ( goes before it.':'Now tap its last word: ) goes after it.',bot+z(30),14);
 if(s.msg)say2(s.msg,A.H*.84,14,NO)}
function pick(i){const s=S.pair;if(over('pair'))return;const [b,a,f]=PAIR[s.n],a0=words(b).length,a1=a0+words(a).length-1,W=[...words(b),...words(a),...words(f)];let m;
 s.bad=0;s.msg='';if(s.o==null){s.o=i;A.sound.tick();return speak(`( before “${W[i]}”. Now tap the last extra word.`)}
 let o=Math.min(s.o,i),cl=Math.max(s.o,i);s.c=cl;s.o=o;
 if(o===a0&&cl===a1){s.n++;s.o=s.c=null;A.sound.pop();return speak(mk(b,a,f,0)+' Lift out the brackets and the sentence still works.')}
 const rest=W.filter((_,k)=>k<o||k>cl).join(' ')+'.';s.bad=1;A.sound.miss();
 m=`You bracketed “${W.slice(o,cl+1).join(' ')}”, leaving “${rest}” `+(o!==a0?`The extra words start at “${W[a0]}”.`:`The extra words end at “${W[a1]}”.`);s.msg=m;s.o=s.c=null;speak(m)}
/* step 3: brackets, dashes or commas? */
function tiles(){const gp=10,w=Math.min(z(110),(A.W-20-2*gp)/3),h=z(60),all=3*w+2*gp;return [0,1,2].map(j=>({x:A.W/2-all/2+j*(w+gp),y:A.H*.72,w,h,j}))}
function drawMarks(){const s=S.marks;bg();if(over('marks'))return done('All 5 sentences punctuated',MARKS.slice(0,4).map(q=>mk(q[0],q[1],q[2],q[3])));
 const q=MARKS[s.n];head(`Sentence ${s.n+1} of 5: make the extra words ${q[4]}`);
 const T=[...words(q[0]).map(t=>({t})),{t:'▢',sl:1},...words(q[1]).map(t=>({t,hl:1})),{t:'▢',sl:1},...words(q[2]).map(t=>({t})),{t:'.'}];flow(T,A.H*.17);chips(T);
 T.filter(t=>t.sl).forEach(t=>{g.strokeStyle=s.bad!=null?NO:SEL;g.lineWidth=2;g.setLineDash([4,3]);g.strokeRect(t.r.x+3,t.r.y+3,t.r.w-6,t.r.h-6);g.setLineDash([])});
 say2('Drag a pair of marks onto the sentence',A.H*.64,13);
 tiles().forEach(r=>box(S.hold&&S.hold.j===r.j?{...r,x:S.hold.x-r.w/2,y:S.hold.y-r.h/2}:r,TILE[r.j],{bg:CHIP,fg:CHT,n:26,w:800,rim:s.bad===r.j?NO:S.hold&&S.hold.j===r.j?SEL:null}))}
function mark(j){const s=S.marks;if(over('marks'))return;const q=MARKS[s.n],want=q[3];let m;
 if(j===want){s.n++;s.bad=null;A.sound.pop();return speak(mk(q[0],q[1],q[2],j)+` Yes: ${PN[j]} ${FEEL[j]}.`)}
 s.bad=j;A.sound.miss();m=`${PN[j][0].toUpperCase()+PN[j].slice(1)} are correct punctuation, but they ${FEEL[j]}. To make it ${q[4]}, use ${PN[want]}.`;speak(m)}
/* step 4: close the pair */
const OPEN=['(','–',','],SHUT=[')','–',','],ONE=['bracket','dash','comma'];
function closeToks(){const [b,a,f,k]=CLOSE[S.close.n],T=[];words(b).forEach((t,i,L)=>T.push({t:i===L.length-1&&k===2?t+',':t}));if(k<2)T.push({t:OPEN[k]});
 [...words(a),...words(f)].forEach((t,i)=>T.push({t,tap:1,i,bad:S.close.bad===i}));T.push({t:'.'});return T}
function drawClose(){const s=S.close;bg();if(over('close'))return done('All 3 pairs closed',CLOSE.map(q=>mk(q[0],q[1],q[2],q[3])));
 const k=CLOSE[s.n][3];head(`Sentence ${s.n+1} of 3: where does the closing ${SHUT[k]} go?`);const T=closeToks(),bot=flow(T,A.H*.16);chips(T);
 say2(`Tap the word the closing ${ONE[k]} goes after.`,bot+z(30),14);if(s.msg)say2(s.msg,A.H*.82,14,NO)}
function shut(i){const s=S.close;if(over('close'))return;const [b,a,f,k]=CLOSE[s.n],A2=words(a),F=words(f),last=A2.length-1;let m;
 if(i===last){s.n++;s.bad=null;s.msg='';A.sound.pop();return speak(mk(b,a,f,k)+' The pair goes round the extra words, and the sentence works without them.')}
 const W=[...A2,...F],rest=[b,...W.slice(i+1)].join(' ')+'.';s.bad=i;A.sound.miss();
 m=i<last?`That shuts the pair too early: “${A2.slice(i+1).join(' ')}” is left outside. Lift out the pair and you get “${rest}”`:`That swallows “${F.slice(0,i-last).join(' ')}” from the main sentence, leaving “${rest}”`;s.msg=m;speak(m)}
/* step 5: proofread */
function opts(){const q=FIX[S.fix.n],h=z(64),gp=z(12),r=S.fix.n%2;return [q[0],q[1]].map((t,j)=>({t,j,x:14,w:A.W-28,h,y:A.H*.3+((j+r)%2)*(h+gp)}))}
function drawFix(){const s=S.fix;bg();if(over('fix'))return done('All 6 checked',['Brackets and dashes come in pairs.','Never mix ( with –.','A full stop goes after the ) here.']);
 head(`Check ${s.n+1} of 6: tap the sentence punctuated correctly`);opts().forEach(r=>box(r,r.t,{n:16,rim:s.bad===r.j?NO:null,bg:s.bad===r.j?'#ffe4e6':CARD}))}
const SLIP={one:'One mark is missing: brackets, dashes and commas for parenthesis come in pairs.',mix:'The pair is mixed. Open and close with the same kind of mark.',
 lift:'The dash is in the wrong place: lift out the words between the dashes and the sentence must still make sense.',stop:'The extra words are part of the sentence, so the full stop goes after the closing bracket.'};
function fix(j){const s=S.fix;if(over('fix'))return;const q=FIX[s.n];if(j){s.bad=j;A.sound.miss();return speak(SLIP[q[2]])}s.n++;s.bad=null;A.sound.pop();speak(`Yes: ${q[0]}`)}
/* input */
function down(p){const m=part();
 if(m==='lift'&&!over('lift')){const r=cards().find(r=>hit(p,r));if(r)lift(r.j)}
 if(m==='pair'&&!over('pair')){const t=pairToks();flow(t,A.H*.16);const h=t.find(t=>hit(p,t.r));if(h)pick(h.i)}
 if(m==='close'&&!over('close')){const t=closeToks();flow(t,A.H*.16);const h=t.find(t=>t.tap&&hit(p,t.r));if(h)shut(h.i)}
 if(m==='fix'&&!over('fix')){const r=opts().find(r=>hit(p,r));if(r)fix(r.j)}
 if(m==='marks'&&!over('marks')){const r=tiles().find(r=>hit(p,r));if(r){S.hold={j:r.j,x:p.x,y:p.y};return true}}return false}
function move(p){if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){const h=S.hold;if(!h)return;S.hold=null;(p.y<A.H*.6||hit(p,tiles()[h.j]))?mark(h.j):A.redraw()}
function reset(){ep++;for(const k in S)delete S[k];Object.assign(S,{lift:{n:0},pair:{n:0},marks:{n:0},close:{n:0},fix:{n:0},hold:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,first,ok,msg){reset();speak(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=ep;acts.forEach((f,j)=>setTimeout(()=>{if(me===ep)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='lift'&&!over('lift'))LIFT[S.lift.n][0].forEach((t,j)=>b(t,()=>lift(j),'Lift out: '+t));
 if(m==='pair'&&!over('pair')){const [x,y,z2]=PAIR[S.pair.n];[...words(x),...words(y),...words(z2)].forEach((t,i)=>b(t,()=>pick(i),(S.pair.o==null?'Bracket opens before ':'Bracket closes after ')+t))}
 if(m==='marks'&&!over('marks'))TILE.forEach((t,j)=>b(PN[j],()=>mark(j),'Use '+PN[j]));
 if(m==='close'&&!over('close')){const [,a,f,k]=CLOSE[S.close.n];[...words(a),...words(f)].forEach((t,i)=>b(t,()=>shut(i),`Closing ${ONE[k]} after ${t}`))}
 if(m==='fix'&&!over('fix'))opts().sort((x,y)=>x.y-y.y).forEach(r=>b(r.t,()=>fix(r.j)))}
const steps=[
{h:'The lift test',p:'Parenthesis is extra information added inside a sentence. If you lift it out, the sentence still makes sense. Tap the part you could lift out.',
predict:{q:'“My brother who is older than me lives in London.” Which part can you lift out?',opts:['lives in London','who is older than me'],ans:1},task:'Find all 4 asides',
show:()=>play(0,LIFT.map(([,k])=>()=>lift(k)),600),go:()=>begin(0,'Tap the part you could lift out.',()=>over('lift'),'Extra information can be lifted out.')},
{h:'Brackets come in pairs',p:'Brackets go round the extra words: ( before the first one and ) after the last one. If the aside comes at the end, the full stop goes after the ).',
predict:{q:'How many brackets does one piece of extra information need?',opts:['one, at the start','two: one each side'],ans:1},task:'Bracket all 3 asides',
show:()=>play(1,PAIR.flatMap(p=>{const a0=words(p[0]).length,a1=a0+words(p[1]).length-1;return[()=>pick(a0),()=>pick(a1)]}),450),go:()=>begin(1,'Tap the first extra word.',()=>over('pair'),'Brackets always come in pairs.')},
{h:'How loud is the aside?',p:'Brackets, dashes and commas can all mark parenthesis. Dashes make the extra words stand out most. Brackets make them quietest. Commas sit in between.',
predict:{q:'Which pair makes the extra words stand out most?',opts:['brackets ( )','dashes – –'],ans:1},task:'Punctuate all 5 sentences',
show:()=>play(2,MARKS.map(q=>()=>mark(q[3])),500),go:()=>begin(2,'Drag the pair that fits.',()=>over('marks'),'Dashes shout, brackets whisper, commas flow.')},
{h:'Close the pair',p:'The first mark is in. Find where the extra information ends, then put the closing mark there. Lift test: the sentence must still work.',task:'Close all 3 pairs',
show:()=>play(3,CLOSE.map(q=>()=>shut(words(q[1]).length-1)),600),go:()=>begin(3,'Tap the word the closing mark goes after.',()=>over('close'),'Open, extra words, close.')},
{h:'Proofread',p:'Each pair of sentences has one right and one wrong. Look for a missing mark, a mixed pair or a full stop in the wrong place.',task:'Check all 6',
show:()=>play(4,FIX.map(()=>()=>fix(0)),500),go:()=>begin(4,'Tap the correct sentence.',()=>over('fix'),'Pairs match, and the lift test works.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'Which sentence uses brackets correctly?',a:'Sam (my best friend) is here.',o:[['Sam (my best friend is here.','One bracket is missing: they come in pairs.'],['Sam my (best friend) is here.','Lift out “best friend” and “Sam my is here” makes no sense.']]},
{q:'You want the extra words to really stand out. Which do you use?',a:'dashes',o:[['brackets','Brackets are correct but quiet. Dashes make words stand out most.'],['full stops','A full stop ends a sentence. It cannot mark extra words inside one.']]},
{q:'Where does the closing comma go? “Our cat, a fluffy Persian sleeps all day.”',a:'after Persian',o:[['after cat','That comma is already there. The second one closes the pair.'],['after sleeps','Then “sleeps” is lifted out too, and “Our cat all day” makes no sense.']]},
{q:'Which is punctuated correctly?',a:'We met at the park (the big one).',o:[['We met at the park (the big one.)','The full stop goes after the closing bracket.'],['We met at the park – the big one).','Do not mix a dash with a bracket.']]},
{q:'What is parenthesis?',a:'extra information you could lift out',o:[['the most important words','The main sentence must work without it, so it is not the key part.'],['a kind of bracket only','Brackets are one way to show it. Dashes and commas can too.']]}];
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,0],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(m,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const m=part();if(m==='quiz'){bg();head('Challenge',1);say2('( brackets )   – dashes –   , commas ,',A.H*.5,18);return}
 ({lift:drawLift,pair:drawPair,marks:drawMarks,close:drawClose,fix:drawFix})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Punctuation buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
