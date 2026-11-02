/* Flagship – matrices for data and networks (ages 16–18). Fill an adjacency matrix from a road map (two-way, then
   one-way), draw the roads a matrix describes, find two-step routes by tapping the middle place and match them to an
   entry of A², read the A² diagonal as a degree, and tune a price so quantity × price matrices hit a revenue target. */
(()=>{
const N='ABCD';
const ROADS=[[[0,1],[0,2],[1,2],[1,3],[2,3]],[[0,1],[1,2],[2,0],[3,2]]];   /* lap 0 two-way, lap 1 one-way arcs */
const MAP2=[[0,1],[0,3],[1,2],[1,3]];                                        /* the matrix to draw in step 2 */
const PAIRS=[[0,3],[1,2],[2,3]],DEG=[1,0,2],QTY=[[4,2,3],[5,3,1]],GOALS=[23,26,29];
const adj=(R,dir)=>{const M=[0,1,2,3].map(()=>[0,0,0,0]);R.forEach(([i,j])=>{M[i][j]=1;if(!dir)M[j][i]=1});return M};
const BASE=adj(ROADS[0]),sq=(M,i,j)=>M[i].reduce((s,v,k)=>s+v*M[k][j],0);
VIS.reg('flagroute',c=>{let A,pad,chal,ver=0,qn=-1,streak=0;
const fresh=()=>({after:()=>{},got:0,lap:0,cur:1,sel:-1,M:adj([],1),mids:[],joined:[],v:1,hold:false,flash:-1,oops:-1,auto:0}),S=fresh();
const mode=()=>['fill','draw','two','diag','shop','quiz'][A.step],need=()=>({fill:2,draw:4,two:3,diag:3,shop:3}[mode()]||99);
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(g,t,x,y,px,col,al){g.font=`700 ${Math.round(px*(A.narrow?1:1.12))}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-10)}
function tile(g,r,bg,ln,w){g.fillStyle=bg;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=w||2;g.strokeStyle=ln;g.stroke()}
const hit=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const ink=()=>A.mix(A.col.tx,A.col.pn,.45),card=()=>A.col.dark?'#1e293b':'#ffffff',tint=h=>A.mix(A.col.pn,h,A.col.dark?.25:.55);
const wide=()=>A.W>A.H*1.15;
/* layout: map box and matrix box, side by side on wide screens, stacked on phones */
const mapBox=()=>wide()?{x:10,y:10,w:A.W*.46,h:A.H*.62}:{x:10,y:8,w:A.W-20,h:A.H*.4};
const matBox=()=>wide()?{x:A.W*.52,y:14,w:A.W*.44,h:A.H*.6}:{x:A.W*.18,y:A.H*.45,w:A.W*.64,h:A.H*.38};
function spot(i){const b=mapBox(),dx=b.w*.28,dy=b.h*.3;return{x:b.x+b.w/2+(i%2?dx:-dx)+(i===2?-b.w*.06:i===1?b.w*.06:0),y:b.y+b.h/2+(i>1?dy:-dy)}}
const rad=()=>Math.max(22,Math.min(A.W,A.H)*.055);
function cellR(i,j){const b=matBox(),s=Math.min(b.w,b.h)/4.6,x0=b.x+b.w/2-2*s+s*.3,y0=b.y+b.h/2-2*s+s*.3;return{x:x0+j*s,y:y0+i*s,w:s*.9,h:s*.9}}
function road(g,a,b,col,arrow){const p=spot(a),q=spot(b),r=rad(),L=Math.hypot(q.x-p.x,q.y-p.y),ux=(q.x-p.x)/L,uy=(q.y-p.y)/L;
 const sx=p.x+ux*r,sy=p.y+uy*r,ex=q.x-ux*r,ey=q.y-uy*r;g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.stroke();
 if(arrow){g.fillStyle=col;g.beginPath();g.moveTo(ex,ey);g.lineTo(ex-ux*14-uy*8,ey-uy*14+ux*8);g.lineTo(ex-ux*14+uy*8,ey-uy*14-ux*8);g.fill()}}
function places(g,lit){const C=A.col;[0,1,2,3].forEach(i=>{const p=spot(i),on=lit&&lit.includes(i),bad=S.oops===i+10;
 g.fillStyle=on?tint('#bbf7d0'):card();g.beginPath();g.arc(p.x,p.y,rad(),0,7);g.fill();g.lineWidth=bad||S.flash===i+10?4:2.5;g.strokeStyle=bad?C.rd:S.flash===i+10?C.vi:ink();g.stroke();word(g,N[i],p.x,p.y,18,C.tx)})}
function matrix(g,M,label){const C=A.col;for(let i=0;i<4;i++)for(let j=0;j<4;j++){const r=cellR(i,j),me=S.cur===i*4+j&&mode()==='fill',bad=S.oops===i*4+j;
  tile(g,r,i===j?A.mix(card(),C.pn,.5):M[i][j]?tint('#bfdbfe'):card(),bad?C.rd:me?C.vi:ink(),bad||me?4:1.5);word(g,String(M[i][j]),r.x+r.w/2,r.y+r.h/2,17,C.tx)}
 const a=cellR(0,0);for(let k=0;k<4;k++){word(g,N[k],a.x+a.w/2+k*(a.w/0.9),a.y-12,12,C.tx);word(g,N[k],a.x-12,a.y+a.h/2+k*(a.h/0.9),12,C.tx)}
 if(label)word(g,label,a.x-26,a.y+a.h*2.2,14,C.tx,'right')}
function paintFill(g){const R=ROADS[S.lap%2];R.forEach(([a,b])=>road(g,a,b,ink(),S.lap%2===1));places(g);matrix(g,S.M,'A =');
 word(g,S.lap%2?'One-way roads: row = from, column = to':'Two-way roads: 1 = a road joins them',A.W/2,A.H*.92,13)}
function paintDraw(g){const M=adj(MAP2);S.joined.forEach(([a,b])=>road(g,a,b,A.col.gr));places(g,S.sel>=0?[S.sel]:null);matrix(g,M,'A =');
 word(g,`Roads drawn: ${S.joined.length} of 4. Tap one place, then another.`,A.W/2,A.H*.92,13)}
function paintTwo(g){const C=A.col,[a,b]=PAIRS[S.lap%3];ROADS[0].forEach(([x,y])=>road(g,x,y,ink()));
 S.mids.forEach(m=>{road(g,a,m,C.gr);road(g,m,b,C.gr)});places(g,[a,b]);
 word(g,`Two-step routes from ${N[a]} to ${N[b]}: ${S.mids.length} found`,A.W/2,wide()?A.H*.72:A.H*.5,15);
 if(S.got>S.lap){const rA=BASE[a],cB=BASE.map(r=>r[b]);word(g,`(A²) ${N[a]}${N[b]} = row ${N[a]} · column ${N[b]}`,A.W/2,A.H*.6+(wide()?A.H*.2:0),13);
  word(g,rA.map((v,k)=>`${v}×${cB[k]}`).join(' + ')+` = ${sq(BASE,a,b)}`,A.W/2,A.H*.68+(wide()?A.H*.2:0),15)}
 else word(g,`Tap a middle place X so that ${N[a]}→X→${N[b]} uses two roads`,A.W/2,A.H*.6,13)}
const nums=i=>{const w=(A.W-40)/5;return{x:12+i*(w+4),y:A.H*.8,w,h:A.H*.12}};
function paintDiag(g){const C=A.col,n=DEG[S.lap%3];ROADS[0].forEach(([x,y])=>road(g,x,y,ink()));places(g,[n]);
 word(g,`What is the diagonal entry (A²) ${N[n]}${N[n]}?`,A.W/2,wide()?A.H*.72:A.H*.52,15);
 if(S.got>S.lap)word(g,`${N[n]} has ${sq(BASE,n,n)} roads, so ${sq(BASE,n,n)} routes go out and straight back.`,A.W/2,A.H*.62+(wide()?A.H*.06:0),13);
 for(let k=0;k<5;k++){const r=nums(k);tile(g,r,S.got>S.lap&&k===sq(BASE,n,n)?tint('#bbf7d0'):card(),S.oops===k?C.rd:S.flash===k?C.vi:ink(),S.oops===k?4:2);word(g,String(k),r.x+r.w/2,r.y+r.h/2,20,C.tx)}}
const bar=()=>({x:28,y:A.H*.82,w:A.W-56,h:A.H*.08}),cash=()=>[QTY[0][0]*2+QTY[0][1]*3+QTY[0][2]*S.v,QTY[1][0]*2+QTY[1][1]*3+QTY[1][2]*S.v];
function paintShop(g){const C=A.col,y=A.H*.12,col=k=>A.W*(.16+k*.13);word(g,'Q (cups sold)',A.W*.29,y-4,12);['tea','cake','juice'].forEach((t,k)=>word(g,t,col(k),y+18,12));
 QTY.forEach((r,i)=>{word(g,['Sat','Sun'][i],A.W*.06,y+46+i*30,13,C.tx);r.forEach((v,k)=>word(g,String(v),col(k),y+46+i*30,17))});
 word(g,'×',A.W*.57,y+60,20);word(g,'P (£)',A.W*.69,y-4,12);['2','3',String(S.v)].forEach((v,k)=>word(g,v,A.W*.69,y+24+k*28,17,k===2?C.vi:C.tx));
 word(g,'=',A.W*.79,y+60,20);const R=cash();word(g,'QP',A.W*.9,y-4,12);R.forEach((v,i)=>word(g,'£'+v,A.W*.9,y+46+i*30,17));
 word(g,`Sat = 4×2 + 2×3 + 3×${S.v} = £${R[0]}`,A.W/2,A.H*.5,14);word(g,`Target for Saturday: £${GOALS[S.lap%3]}${R[0]===GOALS[S.lap%3]?' ✓':''}`,A.W/2,A.H*.6,15);
 const b=bar(),f=(S.v-1)/5;tile(g,b,card(),ink());for(let v=1;v<=6;v++)word(g,'£'+v,b.x+(v-1)/5*b.w,b.y+b.h+12,11);
 g.fillStyle=C.vi;g.beginPath();g.arc(b.x+f*b.w,b.y+b.h/2,Math.max(15,b.h*.45),0,7);g.fill();word(g,'£'+S.v,b.x+f*b.w,b.y+b.h/2,12,'#ffffff');word(g,'Drag the juice price',A.W/2,b.y-14,13)}
function paintQuiz(g){const M=adj(ROADS[0]);ROADS[0].forEach(([x,y])=>road(g,x,y,ink()));places(g);matrix(g,M,'A =')}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);
 ({fill:paintFill,draw:paintDraw,two:paintTwo,diag:paintDiag,shop:paintShop,quiz:paintQuiz}[mode()])(g);A.fx.draw(g)}
function blink(k){S.flash=k;const v=ver;setTimeout(()=>{if(v===ver){S.flash=-1;A.redraw()}},420)}
function miss(t,k){S.oops=k;A.sound.miss();tell(t);A.redraw()}
function win(t){S.got++;S.oops=-1;A.sound.pop();tell(t);keys();A.redraw();S.after()}
const later=(f,ms)=>{const v=ver;setTimeout(()=>{if(v===ver){f();keys();A.redraw()}},A.reduced()?20:(S.auto?250:ms))};
/* step 1: toggle one entry; check it against the map, then check the whole matrix */
function flip(k){const i=k>>2,j=k&3,dir=S.lap%2===1,T=adj(ROADS[S.lap%2],dir);if(S.got>S.lap||S.got>=2)return;S.cur=k;blink(-1);
 if(i===j)return miss(`${N[i]} to ${N[i]}: no road loops back to the same place, so the diagonal stays 0.`,k);
 S.M[i][j]^=1;S.oops=-1;const v=S.M[i][j];
 if(v&&!T[i][j]){A.sound.miss();S.oops=k;tell(dir&&T[j][i]?`The arrow goes ${N[j]}→${N[i]}, not ${N[i]}→${N[j]}. Row ${N[i]}, column ${N[j]} stays 0.`:`No road joins ${N[i]} and ${N[j]}, so that entry should be 0.`);return A.redraw()}
 if(S.M.every((r,a)=>r.every((x,b)=>x===T[a][b]))){win(dir?'Done. One-way roads give a matrix that is not symmetric.':'Done. Every two-way road appears twice, so A is symmetric: A = Aᵀ.');
  if(S.got<2)later(()=>{S.lap++;S.M=adj([],1);S.cur=1;tell('Now the roads are one-way. Row = from, column = to.')},1600);return}
 A.sound.tick();tell(v?(dir?`${N[i]}→${N[j]}: row ${N[i]}, column ${N[j]} = 1.`:`${N[i]}–${N[j]} road. Row ${N[i]}, column ${N[j]} = 1.`+(S.M[j][i]?'':` Row ${N[j]}, column ${N[i]} needs a 1 too.`)):`Set back to 0.`);A.redraw()}
const step=d=>{let k=S.cur;do{k=(k+d+16)%16}while((k>>2)===(k&3));S.cur=k;tell(`Selected row ${N[k>>2]}, column ${N[k&3]}: ${S.M[k>>2][k&3]}.`);keys();A.redraw()};
/* step 2: join two places; the matrix says whether that road exists */
function join(a,b){if(S.got>=4||a===b)return;const M=adj(MAP2),key=[Math.min(a,b),Math.max(a,b)];S.sel=-1;
 if(S.joined.some(r=>r[0]===key[0]&&r[1]===key[1]))return tell(`${N[a]}–${N[b]} is already drawn.`);
 if(!M[a][b])return miss(`Row ${N[a]}, column ${N[b]} is 0, so there is no ${N[a]}–${N[b]} road.`,a+10);
 S.joined.push(key);win(`Row ${N[a]}, column ${N[b]} is 1 and so is row ${N[b]}, column ${N[a]}: one two-way road.`)}
function pick(i){if(mode()==='draw'){if(S.sel<0){S.sel=i;A.sound.tick();tell(`${N[i]} chosen. Tap the other end.`);return A.redraw()}return join(S.sel,i)}
 if(mode()==='two')via(i)}
/* step 3: a middle place X works when both roads a–X and X–b exist */
function via(m){const[a,b]=PAIRS[S.lap%3];if(S.got>S.lap||S.got>=3)return;blink(m+10);
 if(m===a||m===b)return miss(`${N[a]}→${N[m]}→${N[b]} would need a road from ${N[m]} to itself. There is none.`,m+10);
 if(S.mids.includes(m))return tell(`Via ${N[m]} is already counted.`);
 if(!BASE[a][m]||!BASE[m][b])return miss(`No road ${!BASE[a][m]?N[a]+'–'+N[m]:N[m]+'–'+N[b]}, so there is no route via ${N[m]}.`,m+10);
 S.mids.push(m);S.oops=-1;A.sound.tick();tell(`${N[a]}→${N[m]}→${N[b]} works. Any more? Tap another place, or That's all.`);keys();A.redraw()}
function enough(){const[a,b]=PAIRS[S.lap%3],n=sq(BASE,a,b);if(S.got>S.lap)return;
 if(S.mids.length<n)return miss(`Not yet: ${n-S.mids.length} more middle place works.`,-1);
 win(`${n} two-step routes, and (A²) ${N[a]}${N[b]} = ${n}. Row ${N[a]} · column ${N[b]} counts them.`);if(S.got<3)later(()=>{S.lap++;S.mids=[];const[x,y]=PAIRS[S.lap];tell(`Now from ${N[x]} to ${N[y]}.`)},1700)}
function guess(k){const n=DEG[S.lap%3],d=sq(BASE,n,n);if(S.got>S.lap||S.got>=3)return;blink(k);
 if(k!==d)return miss(k===0?`Not 0: ${N[n]}→X→${N[n]} goes out along a road and straight back. Count ${N[n]}'s roads.`:`Count the roads at ${N[n]}: each one gives one out-and-back route.`,k);
 win(`(A²) ${N[n]}${N[n]} = ${d}, the number of roads at ${N[n]} (its degree).`);if(S.got<3)later(()=>{S.lap++;tell(`Now place ${N[DEG[S.lap]]}.`)},1500)}
function price(v,quiet){S.v=Math.max(1,Math.min(6,v));A.redraw();if(quiet||S.got>S.lap||S.got>=3)return;const R=cash()[0],G=GOALS[S.lap%3];
 if(R!==G)return tell(`Juice £${S.v}: Saturday makes £${R}. ${R<G?'Too low: raise it.':'Too high: lower it.'}`);
 win(`£${S.v} juice: 4×2 + 2×3 + 3×${S.v} = £${G}. Row Sat · P hits the target.`);if(S.got<3)later(()=>{S.lap++;tell(`New target: £${GOALS[S.lap]}.`)},1400)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.got>=need())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='fill'){const i=S.cur>>2,j=S.cur&3;B('◀','Previous entry',()=>step(-1));B('▶','Next entry',()=>step(1));B(`Flip ${N[i]}${N[j]} (now ${S.M[i][j]})`,`Flip row ${N[i]} column ${N[j]}`,()=>flip(S.cur))}
 if(m==='draw')[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]].forEach(([a,b])=>{if(!S.joined.some(r=>r[0]===a&&r[1]===b))B(`${N[a]}–${N[b]}`,`Join ${N[a]} and ${N[b]}`,()=>join(a,b))});
 if(m==='two'&&S.got<=S.lap){[0,1,2,3].forEach(i=>B('Via '+N[i],'Route via '+N[i],()=>via(i)));B("That's all","That's all the routes",enough)}
 if(m==='diag'&&S.got<=S.lap)[0,1,2,3,4].forEach(k=>B(String(k),'Answer '+k,()=>guess(k)));
 if(m==='shop'){B('− £1','Lower juice price',()=>price(S.v-1));B('+ £1','Raise juice price',()=>price(S.v+1))}}
const xPrice=p=>{const b=bar();return Math.round(1+(p.x-b.x)/b.w*5)};
function down(p){const m=mode();if(m==='quiz'||S.got>=need())return false;
 if(m==='fill'){for(let k=0;k<16;k++)if(hit(p,cellR(k>>2,k&3))){flip(k);keys();break}}
 if(m==='draw'||m==='two'){const i=[0,1,2,3].find(k=>Math.hypot(p.x-spot(k).x,p.y-spot(k).y)<rad()+8);if(i!=null)pick(i)}
 if(m==='diag'){const k=[0,1,2,3,4].find(k=>hit(p,nums(k)));if(k!=null)guess(k)}
 if(m==='shop'&&hit(p,{...bar(),y:bar().y-22,h:bar().h+44})){S.hold=true;price(xPrice(p),true);return true}return false}
function move(p){if(S.hold)price(xPrice(p),true)}
function up(p){if(!S.hold)return;S.hold=false;price(xPrice(p))}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,ms){const k=++ver;list.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*40+30:(j+1)*(ms||600)))}
const begin=x=>{ver++;Object.assign(S,fresh(),x||{});keys()};
const steps=[
{h:'Map to matrix',p:'Entry (row i, column j) is 1 when a road goes from i to j, and 0 when it does not. Tap entries to fill A.',predict:{q:'The A–B road is two-way. Row A, column B is 1. What is row B, column A?',opts:['0: each road is written once','1: it is written both ways'],ans:1},task:'Fill 2 matrices',
 show:()=>{steps[0].go();S.auto=1;const L=[];[0,1].forEach(d=>{adj(ROADS[d],d).forEach((r,i)=>r.forEach((v,j)=>{if(v)L.push(i*4+j)}));L.push(-1,-1)});demo(L.map(k=>()=>{if(k>=0)flip(k)}),240)},
 go:()=>{begin({M:adj([],1)});tell('Tap an entry to flip it between 0 and 1.');S.after=finish(0,()=>S.got>=2,'Two-way roads make A symmetric; one-way roads need not.')}},
{h:'Matrix to map',p:'Read the matrix and draw the roads it describes. Tap a place, then the place at the other end.',predict:{q:'This matrix equals its transpose. What does that tell you?',opts:['Every road is two-way','Every place has a road'],ans:0},task:'Draw 4 roads',
 show:()=>{steps[1].go();S.auto=1;demo(MAP2.map(([a,b])=>()=>join(a,b)),500)},go:()=>{begin();tell('Read A. Tap two places to join them.');S.after=finish(1,()=>S.got>=4,'Each 1 above the diagonal is one road; the matching 1 below it is the same road.')}},
{h:'Two-step routes',p:'How many routes go from one place to another using exactly two roads? Tap each middle place that works.',predict:{q:'What does entry (i, j) of A² count?',opts:['Routes from i to j with exactly two roads','The road from i to j, squared'],ans:0},task:'Count routes for 3 pairs',
 show:()=>{steps[2].go();S.auto=1;demo([()=>via(1),()=>via(2),enough,()=>{},()=>{},()=>via(0),()=>via(3),enough,()=>{},()=>{},()=>via(1),enough],300)},
 go:()=>{begin();tell('From A to D. Tap a middle place.');S.after=finish(2,()=>S.got>=3,'(A²) ij = row i · column j: each 1×1 pair is a middle place.')}},
{h:'The diagonal of A²',p:'(A²) ii counts routes that leave i and come back in two steps. Pick the value.',predict:{q:'Place B has three roads. What is (A²) BB?',opts:['0, no road from B to B','3, one out-and-back per road'],ans:1},task:'Answer for 3 places',
 show:()=>{steps[3].go();S.auto=1;demo(DEG.map(n=>()=>guess(sq(BASE,n,n))),700)},go:()=>{begin();tell('What is (A²) BB?');S.after=finish(3,()=>S.got>=3,'For a two-way map, the diagonal of A² lists each degree.')}},
{h:'Data matrices',p:'Q holds cups sold, P holds prices. QP gives the takings for each day. Set the juice price to hit the target.',predict:{q:'Q is 2×3 and P is 3×1. What size is QP?',opts:['2×1','3×3','They cannot be multiplied'],ans:0},task:'Hit 3 targets',
 show:()=>{steps[4].go();S.auto=1;demo([2,3,'w',4,'w',5].map(v=>v==='w'?()=>{}:()=>price(v)),500)},go:()=>{begin();tell('Target £23. Drag the juice price.');S.after=finish(4,()=>S.got>=3,'(m×n)(n×p) gives m×p: one total per row of Q.')}},
{h:'Challenge',p:'',go:()=>{begin();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),bits=()=>[0,1,2,3].map(()=>ri(0,1));
/* fresh question: 0 entry of A², 1 product size, 2 one-way entry, 3 takings */
function make(kind){if(kind===0){let r,cl,d,s,t;do{r=bits();cl=bits();d=r.reduce((a,v,k)=>a+v*cl[k],0);s=r.reduce((a,v)=>a+v,0);t=s+cl.reduce((a,v)=>a+v,0)}while(d<1||d===s||d===t||s===t);
  return[`Row i of A is (${r.join(', ')}) and column j is (${cl.join(', ')}). What is (A²) ij?`,[[String(d),'ok'],[String(s),'row'],[String(t),'add']]]}
 if(kind===1){let m,n,p;do{m=ri(2,5);n=ri(2,5);p=ri(1,5)}while(m===n||n===p||m===p);return[`A is ${m}×${n} and B is ${n}×${p}. What size is AB?`,[[`${m}×${p}`,'ok'],[`${n}×${n}`,'inner'],[`${p}×${m}`,'swap']]]}
 if(kind===2){const[x,y]=[['P','Q'],['R','S'],['K','L']][ri(0,2)];return[`One-way map: row ${x}, column ${y} is 1, but row ${y}, column ${x} is 0. What does that mean?`,[[`A road from ${x} to ${y} only`,'ok'],[`A road from ${y} to ${x} only`,'back'],['A two-way road','two']]]}
 let a,b,x,y;do{a=ri(2,6);b=ri(2,6);x=ri(2,5);y=ri(2,5)}while(a*x+b*y===(a+b)*(x+y)||a===b);return[`Q = (${a} ${b}) cups, P = (${x}, ${y}) pounds per cup. What is QP?`,[['£'+(a*x+b*y),'ok'],['£'+(a+b)*(x+y),'sum'],['£'+(a*x*b*y),'mult']]]}
function why(t){let m='Use row · column: multiply matching entries, then add.';
 if(t==='row')m='That only adds row i. Multiply each entry by the matching entry of column j first.';
 if(t==='add')m='Adding every 1 counts roads, not routes. A route needs both roads, so multiply pairs.';
 if(t==='inner')m='The inner sizes must match and then disappear: (m×n)(n×p) is m×p.';
 if(t==='swap')m='Rows come from the first matrix and columns from the second, so the order matters.';
 if(t==='back')m='Row is where the road starts and column is where it ends.';
 if(t==='two')m='A two-way road would put a 1 in both places. Here one entry is 0.';
 if(t==='sum')m='Each quantity pairs with its own price: multiply pairs, then add. Do not total each list first.';
 if(t==='mult')m='The two products are added, not multiplied: a×x + b×y.';return m}
function ask(){qn++;const[q,ops]=make(qn%4),r=ri(0,2);
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Correct. Streak: '+streak+'.':'✗ '+why(t)} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
