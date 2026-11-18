/* Flagship: adding and subtracting mixed numbers with like denominators (ages 9–10). Fraction bars: join two mixed
   numbers and swap 5 fifths for a whole; take away wholes and parts; break a whole to regroup before subtracting;
   change to improper fractions; count on along a number line; then a challenge. Text and sums are in mixd_art.js. */
(()=>{
const D=MIXD;
VIS.reg('flagmixd',c=>{let A,cx,bar,quizEl,round=-1,token=0,grab=null;const s={};
function ink(){const q=A.col;return{text:q.tx,quiet:q.mu,back:q.pn,dark:q.dark,dk:'#111827',whole:'#fbbf24',part:'#67e8f9',partB:'#c4b5fd',edge:'#1f2937',gone:q.dark?'#475569':'#cbd5e1',okc:'#166534',noc:'#9f1239',band:q.dark?'#3730a3':'#e0e7ff',line:q.dark?'#e2e8f0':'#334155',dot:'#db2777'}}
const z=n=>A.narrow?n:Math.round(n*1.15);
const tellAll=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(t,x,y,n,col,wt,al){cx.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;cx.textAlign=al||'center';cx.textBaseline='middle';cx.fillStyle=col;cx.fillText(String(t),x,y,A.W-12)}
function wrapTo(t,w,n){cx.font=`700 ${z(n)}px system-ui,sans-serif`;const rows=[];let r='';for(const wd of String(t).split(' ')){const nx=r?r+' '+wd:wd;if(r&&cx.measureText(nx).width>w){rows.push(r);r=wd}else r=nx}rows.push(r);return rows}
function pill(x,y,w,h,fill,edge){A.paint.rrect(x,y,w,h,7);cx.fillStyle=fill;cx.fill();if(edge){cx.lineWidth=2;cx.strokeStyle=edge;cx.stroke()}}
function head(t){const k=ink(),rows=wrapTo(t,A.W-36,13),lh=z(17),h=rows.length*lh+12;pill(9,7,A.W-18,h,k.band);rows.forEach((r,i)=>txt(r,A.W/2,13+lh*(i+.5),13,k.dark?'#f8fafc':k.dk));return 7+h+z(10)}
function foot(){if(!s.msg)return;const k=ink(),rows=wrapTo((s.err?'✗ ':'✓ ')+s.msg,A.W-40,12),lh=z(16),h=rows.length*lh+10,y=A.H-h-7;pill(9,y,A.W-18,h,'#ffffff',s.err?k.noc:k.okc);rows.forEach((r,i)=>txt(r,A.W/2,y+5+lh*(i+.5),12,s.err?k.noc:k.dk))}
const wrong=t=>{s.err=true;s.msg=t;A.sound.miss();tellAll(t);A.redraw()};
const right=t=>{s.err=false;s.msg=t;A.sound.pop();tellAll(t);A.redraw();s.check()};
const note=t=>{s.err=false;s.msg=t;tellAll(t);A.redraw()};
const mixed=(w,p,d)=>p?(w?`${w} ${p}/${d}`:`${p}/${d}`):String(w);
/* one row of fraction bars: wholes then parts; gone pieces are drawn as dashed ghosts. Returns hit boxes. */
function row(y,wh,pa,den,unit,col,label){const k=ink(),h=z(30),gap=z(5),pw=unit/den,hits=[];let x=15;
 wh.forEach((gone,i)=>{if(gone){cx.strokeStyle=k.gone;cx.setLineDash([4,3]);cx.lineWidth=1.5;cx.strokeRect(x,y,unit,h);cx.setLineDash([])}else{pill(x,y,unit,h,k.whole,k.edge);txt('1',x+unit/2,y+h/2,12,k.dk,900)}hits.push({x,y,w:unit,h,k:'w',i});x+=unit+gap});
 pa.forEach((gone,i)=>{if(gone){cx.strokeStyle=k.gone;cx.setLineDash([3,3]);cx.lineWidth=1.5;cx.strokeRect(x,y,pw,h);cx.setLineDash([])}else{cx.fillStyle=col||k.part;cx.fillRect(x,y,pw,h);cx.strokeStyle=k.edge;cx.lineWidth=1.5;cx.strokeRect(x,y,pw,h)}hits.push({x,y,w:pw,h,k:'p',i});x+=pw+z(2)});
 if(label)txt(label,15,y+h+z(13),12,k.text,800,'left');return hits}
function unitFor(wholes,parts,den){const avail=A.W-30-wholes*z(5)-parts*z(2);return Math.min(z(74),avail/(wholes+parts/den+.01))}
const live=a=>a.filter(g=>!g).length;
/* step 1: add, then regroup */
function showAdd(top){const k=ink(),y1=top+z(14),y2=top+z(96)+(s.dragY||0);
 if(!s.joined){const u=unitFor(2,3,5);txt('2 3/5',A.W-15,y1-z(6),13,k.text,900,'right');row(y1,[0,0],[0,0,0],5,u,k.part);txt('1 4/5',A.W-15,y2-z(6),13,k.text,900,'right');s.dragBox={x:0,y:y2-z(10),w:A.W,h:z(48)};row(y2,[0],[0,0,0,0],5,u,k.partB);txt('drag me up ↑',A.W/2,y2+z(46),11,k.quiet,700);return}
 const w=s.sum.w,p=s.sum.p,u=unitFor(w,p,5);row(y1,Array(w).fill(0),Array(p).fill(0),5,u,k.part,`${w} wholes and ${p} fifths = ${mixed(w,p,5)}`);
 if(p>=5){const x=15+w*(u+z(5));cx.strokeStyle=k.dot;cx.lineWidth=3;cx.strokeRect(x-3,y1-3,5*(u/5+z(2))+4,z(30)+6);txt('5 fifths make a whole: tap them',A.W/2,y1+z(66),12,k.text,800)}
 else txt(s.swapped?'swapped 5 fifths for 1 whole':'',A.W/2,y1+z(66),12,k.text,800)}
function join(){if(s.joined)return;s.joined=1;s.dragY=0;s.sum={w:3,p:7};A.sound.tick();tools();note('Wholes: 2 + 1 = 3. Fifths: 3 + 4 = 7. That is 3 7/5, but 7 fifths is more than a whole.')}
function swap(){if(s.swapped)return;let m='';if(!s.joined)m='Put the two numbers together first, then look at the fifths.';else if(s.sum.p<5)m=`Only ${s.sum.p} fifths are left. You need 5 fifths to make a whole.`;if(m){wrong(m);return}
 s.sum.w++;s.sum.p-=5;s.swapped=1;A.sound.tick();right('5 fifths make 1 whole, so 3 7/5 = 4 2/5. The bottom number stays 5.')}
/* steps 2 and 3: take away pieces */
function showTake(top,den,goalW,goalP,col){const k=ink(),y=top+z(26),u=unitFor(s.wh.length,s.pa.length,den);s.hits=row(y,s.wh,s.pa,den,u,col);
 const lw=live(s.wh),lp=live(s.pa);txt(`taken: ${s.tw} of ${goalW} whole${goalW>1?'s':''}, ${s.tp} of ${goalP} part${goalP>1?'s':''}`,A.W/2,y+z(56),12,k.text,800);
 txt(`left: ${mixed(lw,lp,den)}`,A.W/2,y+z(80),15,k.text,900)}
function takeWhole(goal,i){if(s.tw>=goal){wrong(`You only take away ${goal} whole${goal>1?'s':''}. The rest stay.`);return}i=i==null?s.wh.lastIndexOf(false):i;if(i<0||s.wh[i])return;s.wh[i]=true;s.tw++;A.sound.tick();after()}
function takePart(goal,den,i){let m='';if(s.tp>=goal)m=`You only take away ${goal} ${D.NAME[den]}. The rest stay.`;else if(!live(s.pa))m=`No ${D.NAME[den]} left to take. Tap a whole to break it into ${den} ${D.NAME[den]} first.`;if(m){wrong(m);return}
 i=i==null||s.pa[i]?s.pa.lastIndexOf(false):i;s.pa[i]=true;s.tp++;A.sound.tick();after()}
function breakWhole(den){const i=s.wh.lastIndexOf(false);if(i<0)return;if(live(s.pa)>=s.goalP-s.tp){wrong(`There are enough ${D.NAME[den]} already. Only break a whole when the parts run out.`);return}
 s.wh.splice(i,1);for(let j=0;j<den;j++)s.pa.push(false);s.broke=(s.broke||0)+1;A.sound.tick();note(`One whole is now ${den} ${D.NAME[den]}: ${mixed(live(s.wh),live(s.pa),den)}, the same amount. Now take the ${D.NAME[den]}.`)}
function after(){const st=s.stepCfg;if(s.tw===st.w&&s.tp===st.p){right(st.win);return}note(`Left: ${mixed(live(s.wh),live(s.pa),st.den)}. Keep going.`)}
/* step 4: improper fractions */
function showImp(top){let y=top+z(16);const k=ink(),q=s.q;
 if(q<2){const [w,p]=q?[1,4]:[2,3],u=unitFor(w+0,p+w*5,5);let x=15;const h=z(30);s.hits=[];
  for(let i=0;i<w;i++){if(s.cut[i]){for(let j=0;j<5;j++){cx.fillStyle=k.whole;cx.fillRect(x+j*u/5,y,u/5,h);cx.strokeStyle=k.edge;cx.lineWidth=1.5;cx.strokeRect(x+j*u/5,y,u/5,h)}}else{pill(x,y,u,h,k.whole,k.edge);txt('1',x+u/2,y+h/2,12,k.dk,900)}s.hits.push({x,y,w:u,h,k:'w',i});x+=u+z(5)}
  for(let j=0;j<p;j++){cx.fillStyle=k.part;cx.fillRect(x,y,u/5,h);cx.strokeStyle=k.edge;cx.strokeRect(x,y,u/5,h);x+=u/5+z(2)}
  const seen=s.cut.slice(0,w).filter(Boolean).length*5+p;txt(`${q?'1 4/5':'2 3/5'}: fifths counted so far ${seen}${seen===w*5+p?' (all)':''}`,A.W/2,y+z(56),12,k.text,800)}
 else{const u=Math.min(z(26),(A.W-30)/5.6);for(let j=0;j<22;j++){const r=Math.floor(j/5),cl=j%5,x=A.W/2-2.6*u+cl*u*1.05,yy=y+r*(z(26)+4);cx.fillStyle=r<4?k.whole:k.part;cx.fillRect(x,yy,u,z(26));cx.strokeStyle=k.edge;cx.strokeRect(x,yy,u,z(26))}txt('22 fifths, in rows of 5',A.W/2,y+5*(z(26)+4)+z(12),12,k.text,800);y+=5*(z(26)+4)-z(60)}
 if(q<3)txt(['2 3/5 = ? fifths','1 4/5 = ? fifths','13/5 + 9/5 = 22/5 = ?'][q],A.W/2,y+z(100),14,k.text,900);
 s.got.forEach((g,i)=>txt(g,A.W/2,y+z(q<3?126:104)+i*z(18),12,k.text,800))}
function cutBar(i){if(s.q>1||s.cut[i]||i>=(s.q?1:2))return;s.cut[i]=true;A.sound.tick();note('That whole is 5 fifths.');}
function pickImp(v){const [name,ans,,why]=D.IMP[s.q];if(v!==ans){wrong(why[v]||`Not ${v}. Count the fifths.`);return}s.got.push(`${name} = ${ans}`);A.sound.tick();s.q++;s.cut=[];tools();
 if(s.q===3){right('2 3/5 = 13/5 and 1 4/5 = 9/5. 13/5 + 9/5 = 22/5, and 22 = 4 × 5 + 2, so 4 2/5.');return}note(`${name} = ${ans}. Next one.`)}
/* step 5: the number line */
function lineBox(top){const x0=z(24),x1=A.W-z(24),y=top+(A.H-top)*.42;return{x0,x1,y,step:(x1-x0)/25}}
function showLine(top){const k=ink(),L=s.f=lineBox(top);cx.strokeStyle=k.line;cx.lineWidth=3;cx.beginPath();cx.moveTo(L.x0,L.y);cx.lineTo(L.x1,L.y);cx.stroke();
 for(let i=0;i<=25;i++){const x=L.x0+i*L.step,big=i%5===0;cx.lineWidth=big?3:1.5;cx.beginPath();cx.moveTo(x,L.y-(big?z(10):z(5)));cx.lineTo(x,L.y+(big?z(10):z(5)));cx.stroke();if(big)txt(i/5,x,L.y+z(24),13,k.text,900)}
 s.hops.forEach(([a,b])=>{const xa=L.x0+a*L.step,xb=L.x0+b*L.step,hgt=Math.min(z(60),Math.abs(b-a)*L.step*.6+z(10));cx.strokeStyle=b-a>=5?'#d97706':'#0891b2';cx.lineWidth=3;cx.beginPath();cx.moveTo(xa,L.y);cx.quadraticCurveTo((xa+xb)/2,L.y-hgt*2,xb,L.y);cx.stroke()});
 const X=L.x0+s.pos*L.step;cx.fillStyle=k.dot;cx.beginPath();cx.arc(X,L.y,z(11),0,7);cx.fill();cx.strokeStyle='#ffffff';cx.lineWidth=2;cx.stroke();
 txt(`at ${mixed(Math.floor(s.pos/5),s.pos%5,5)}`,A.W/2,L.y+z(56),15,k.text,900);txt('1 2/5 cups of oats + 2 3/5 cups more',A.W/2,L.y-z(78),12,k.text,800)}
function hop(n){const to=s.pos+n;if(to<7){wrong('Start at 1 2/5 and only jump forwards: this is adding.');return}if(to>20){wrong(`That goes past the answer. After 2 wholes you only need 3 more fifths.`);return}s.hops.push([s.pos,to]);s.pos=to;A.sound.tick();land()}
function land(){if(s.pos===20){right('1 2/5 + 2 = 3 2/5, then 3 more fifths make 4. So 1 2/5 + 2 3/5 = 4 cups.');return}tellAll(`At ${mixed(Math.floor(s.pos/5),s.pos%5,5)}.`);A.redraw()}
const part=()=>['add','take','regroup','imp','line','quiz'][A.step];
const TAKE={take:{den:4,w:3,p:1,win:'5 3/4 − 3 1/4: 5 − 3 = 2 wholes and 3/4 − 1/4 = 2/4. So 2 2/4, which is 2 1/2.'},regroup:{den:6,w:1,p:5,win:'4 2/6 − 1 5/6 = 2 3/6. Breaking a whole gave 8 sixths, and 8 − 5 = 3.'}};
function render(a){cx=a.ctx;const k=ink(),w=part();cx.fillStyle=k.back;cx.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){txt('Adding and subtracting mixed numbers',A.W/2,A.H*.34,16,k.text,900);txt('wholes · parts · regroup',A.W/2,A.H*.5,13,k.quiet,700);A.fx.draw(cx);return}
 const top=head(s.title||'');if(w==='add')showAdd(top);else if(w==='take')showTake(top,4,3,1,k.part);else if(w==='regroup')showTake(top,6,1,5,k.partB);else if(w==='imp')showImp(top);else showLine(top);foot();A.fx.draw(cx)}
function blank(o){token++;grab=null;for(const key in s)delete s[key];Object.assign(s,{msg:'',err:false,check:()=>{},joined:0,dragY:0,sum:null,wh:[],pa:[],tw:0,tp:0,q:0,cut:[],got:[],pos:7,hops:[]},o||{})}
function demo(i,acts){const me=token;acts.forEach((f,j)=>setTimeout(()=>{if(me===token&&A.step===i)f()},A.reduced()?30*(j+1):300*(j+1)))}
const passWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!bar)return;bar.innerHTML='';const w=part(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},bar,t).onclick=f};
 if(w==='add'){if(!s.joined)b('Put them together',join);b('Swap 5 fifths for 1 whole',swap)}
 if(w==='take'){b('Take away a whole',()=>takeWhole(3));b('Take away a quarter',()=>takePart(1,4))}
 if(w==='regroup'){b('Take away a whole',()=>takeWhole(1));b('Take away a sixth',()=>takePart(5,6));b('Break a whole into sixths',()=>breakWhole(6))}
 if(w==='imp'&&s.q<3){if(s.q<2)b('Cut a whole into fifths',()=>cutBar(s.cut.indexOf(undefined)<0?s.cut.length:s.cut.indexOf(undefined)));D.IMP[s.q][2].forEach(v=>b(String(v)+(s.q<2?' fifths':''),()=>pickImp(v)))}
 if(w==='line'){b('Jump 1 whole',()=>hop(5));b('Jump 1 fifth',()=>hop(1))}}
const hit=(p,r)=>p.x>=r.x-3&&p.x<=r.x+r.w+3&&p.y>=r.y-8&&p.y<=r.y+r.h+8;
function down(p){const w=part();if(w==='quiz')return false;
 if(w==='add'){if(!s.joined&&s.dragBox&&hit(p,s.dragBox)){grab={y:p.y};return true}if(s.joined)swap();return true}
 if(w==='take'||w==='regroup'){const st=TAKE[w],r=(s.hits||[]).find(r=>hit(p,r));if(!r)return true;if(r.k==='w'){if(s.wh[r.i])return true;if(w==='regroup'&&s.tw>=1)breakWhole(6);else takeWhole(st.w,r.i)}else if(!s.pa[r.i])takePart(st.p,st.den,r.i);return true}
 if(w==='imp'){const r=(s.hits||[]).find(r=>hit(p,r));if(r)cutBar(r.i);return true}
 if(w==='line'){grab={line:1};return true}return true}
function move(p){if(!grab)return;const w=part();if(w==='add'&&grab.y!=null){s.dragY=Math.min(0,p.y-grab.y);A.redraw()}
 if(w==='line'){const L=s.f;s.drag=Math.max(0,Math.min(25,Math.round((p.x-L.x0)/L.step)));if(s.drag>=7&&s.drag<=20&&s.drag!==s.pos){s.pos=s.drag;A.redraw()}}}
function up(){const g=grab;grab=null;if(!g)return;const w=part();if(w==='add'){if(s.dragY<-z(40))join();else{s.dragY=0;A.redraw()}}
 if(w==='line'){if(s.drag>20){wrong('That goes past the answer. After 2 wholes you only need 3 more fifths.');return}land()}}
const steps=[
{h:'Add and regroup',p:D.STEPP[0],
 predict:{q:'2 3/5 + 1 4/5 = ?',opts:['3 7/10','3 2/5','4 2/5'],ans:2},
 task:'Join the numbers, then make a whole from the fifths',show:()=>demo(0,[join,swap]),
 go:()=>{blank({title:D.TITLE[0]});tellAll(D.SAY[0]);tools();s.check=passWhen(0,()=>s.swapped,D.DONE[0])}},
{h:'Take away',p:D.STEPP[1],
 task:'Take away 3 1/4',show:()=>demo(1,[()=>takeWhole(3),()=>takeWhole(3),()=>takeWhole(3),()=>takePart(1,4)]),
 go:()=>{blank({title:D.TITLE[1],wh:Array(5).fill(false),pa:Array(3).fill(false),stepCfg:TAKE.take,goalP:1});tellAll(D.SAY[1]);tools();s.check=passWhen(1,()=>s.tw===3&&s.tp===1,D.DONE[1])}},
{h:'Break a whole',p:D.STEPP[2],
 predict:{q:'4 2/6 − 1 5/6 = ?',opts:['3 3/6','2 3/6','3 7/6'],ans:1},
 task:'Take away 1 5/6',show:()=>demo(2,[()=>takeWhole(1),()=>takePart(5,6),()=>takePart(5,6),()=>breakWhole(6),()=>takePart(5,6),()=>takePart(5,6),()=>takePart(5,6)]),
 go:()=>{blank({title:D.TITLE[2],wh:Array(4).fill(false),pa:Array(2).fill(false),stepCfg:TAKE.regroup,goalP:5});tellAll(D.SAY[2]);tools();s.check=passWhen(2,()=>s.tw===1&&s.tp===5,D.DONE[2])}},
{h:'Improper fractions',p:D.STEPP[3],
 task:'Change both numbers to fifths, then back',show:()=>demo(3,[()=>cutBar(0),()=>cutBar(1),()=>pickImp(13),()=>cutBar(0),()=>pickImp(9),()=>pickImp('4 2/5')]),
 go:()=>{blank({title:D.TITLE[3]});tellAll(D.SAY[3]);tools();s.check=passWhen(3,()=>s.q===3,D.DONE[3])}},
{h:'Number line',p:D.STEPP[4],
 task:'Land on the answer',show:()=>demo(4,[()=>hop(5),()=>hop(5),()=>hop(1),()=>hop(1),()=>hop(1)]),
 go:()=>{blank({title:D.TITLE[4]});tellAll(D.SAY[4]);tools();s.check=passWhen(4,()=>s.pos===20,D.DONE[4])}},
{h:'Challenge',p:'',go:()=>{blank();quiz()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>s.check()});
function quiz(){round++;const [q,opts]=D.QZ[round%D.QZ.length],k=round%3;quizEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=quizEl.querySelector('.fl-pick');opts.slice(k).concat(opts.slice(0,k)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},r,o).onclick=()=>score(t)});tellAll('Challenge: '+q);A.redraw()}
let run=0;function score(t){quizEl.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${run} in a row.`:'✗ '+(D.WHY[t]||'Try that lab step again.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.35,draw:render,onStep:A=>{quizEl.hidden=A.step!==5;bar.hidden=A.step===5;tools()},
 init:A=>{cx=A.ctx;const holder=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fraction controls'},holder);quizEl=c.el('div',{class:'fl-chal'},A.below);blank();
  A.gest({down,move,up});tools()}});
A.start()})})();
