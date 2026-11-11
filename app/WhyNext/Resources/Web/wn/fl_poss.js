/* Flagship – apostrophes for possession (ages 6–8, singular owners). Drag the ' into the right gap (dog's bone), sort
   plural -s from belongs-to 's, find the owner, fix wrong or missing marks, and say "the hat that belongs to Ben" short. */
(()=>{
/* add the mark: [owner, thing] */
const ADD=[['dog','bone'],['girl','hat'],['Sam','kite']];
/* sort: [words, 0 = more than one (just s), 1 = belongs to ('s)] */
const SORT=[['three cats',0],["the cat's bed",1],['two hats',0],["Mum's car",1],['lots of bugs',0],["the bug's legs",1]];
/* whose is it: [phrase, owner index into WHO, thing] */
const WHO=['Mia','the cat','Leo'];
const READ=[["the cat's ball",1,'ball'],["Mia's cat",0,'cat'],["Leo's book",2,'book']];
/* fix it: [words, index of wrong word or -1, fixed word, why] */
const FIX=[[['The','dogs','bone','is','big.'],1,"dog's",'The bone belongs to the dog, so it needs dog\'s.'],
 [['I','have','two',"apple's."],3,'apples.','More than one apple is just apples. Nothing belongs to it.'],
 [["Ben's",'hat','is','red.'],-1,'','Ben\'s hat is right: the hat belongs to Ben.']];
/* say it short: [long way, owner, thing] */
const SHORT=[['the hat that belongs to Ben','Ben','hat'],['the bone that belongs to the dog','dog','bone'],['the bike that belongs to Zara','Zara','bike']];
VIS.reg('flagposs',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,grab:null,bad:-1,ok:-1,put:-1,bin:-1,slots:[],tray:[],fixed:0}),S=fresh();
const part=()=>['add','sort','read','fix','short','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(z=>{const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q});L.push(s);const h=sz(n)*1.22;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function box(g,r,on,bad,good){const C=A.col;g.fillStyle=good?A.alpha(C.gr,.18):C.dark?'#1e293b':'#fffbeb';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
 g.strokeStyle=bad?C.rd:good?C.gr:on?C.vi:C.mu;g.lineWidth=bad||on||good?5:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
function row(n,y,h,max){const{W}=A,gap=10,w=Math.min((W-20-gap*(n-1))/n,max||190),x0=(W-n*w-gap*(n-1))/2;return Array.from({length:n},(_,k)=>({x:x0+k*(w+gap),y,w,h}))}
/* tiny pictures: every owner and thing is concrete */
const K='#1f2937';function pic(g,k,x,y,r){g.save();g.lineWidth=2;g.strokeStyle=K;const O=(a,b,rr,f)=>{g.fillStyle=f;g.beginPath();g.arc(x+a*r,y+b*r,rr*r,0,7);g.fill();g.stroke()};k=k.replace('the ','');
 if(/Mia|girl|Leo|Sam|boy/.test(k)){const girl=/Mia|girl/.test(k);if(girl){O(-.85,-.2,.35,'#7c2d12');O(.85,-.2,.35,'#7c2d12')}O(0,0,.75,'#f1c27d');g.fillStyle='#7c2d12';g.beginPath();g.arc(x,y-r*.15,r*.76,Math.PI*1.05,Math.PI*1.95);g.fill();
  g.fillStyle=K;g.beginPath();g.arc(x-r*.27,y+r*.05,r*.08,0,7);g.arc(x+r*.27,y+r*.05,r*.08,0,7);g.fill();g.beginPath();g.arc(x,y+r*.2,r*.3,.2*Math.PI,.8*Math.PI);g.stroke()}
 else if(k==='cat'||k==='dog'){const c=k==='cat'?'#9ca3af':'#b45309';g.fillStyle=c;g.beginPath();if(k==='cat'){g.moveTo(x-r*.7,y-r*.3);g.lineTo(x-r*.55,y-r*.95);g.lineTo(x-r*.15,y-r*.6);g.moveTo(x+r*.7,y-r*.3);g.lineTo(x+r*.55,y-r*.95);g.lineTo(x+r*.15,y-r*.6)}else{g.ellipse(x-r*.72,y,r*.25,r*.5,.3,0,7);g.ellipse(x+r*.72,y,r*.25,r*.5,-.3,0,7)}g.fill();
  O(0,0,.7,c);g.fillStyle=K;g.beginPath();g.arc(x-r*.25,y-r*.1,r*.08,0,7);g.arc(x+r*.25,y-r*.1,r*.08,0,7);g.arc(x,y+r*.2,r*.1,0,7);g.fill();if(k==='cat'){g.beginPath();for(const d of[-1,1]){g.moveTo(x+d*r*.2,y+r*.25);g.lineTo(x+d*r*.75,y+r*.15);g.moveTo(x+d*r*.2,y+r*.3);g.lineTo(x+d*r*.75,y+r*.4)}g.stroke()}}
 else if(k==='ball'){O(0,0,.6,'#ef4444');g.strokeStyle='#fff';g.beginPath();g.arc(x-r*.6,y,r*.6,-1,1);g.stroke()}
 else if(k==='bone'){g.fillStyle='#f5f5f4';g.fillRect(x-r*.55,y-r*.15,r*1.1,r*.3);g.strokeRect(x-r*.55,y-r*.15,r*1.1,r*.3);[[-.6,-.18],[-.6,.18],[.6,-.18],[.6,.18]].forEach(([a,b])=>O(a,b,.2,'#f5f5f4'))}
 else if(k==='hat'){g.fillStyle='#2563eb';g.beginPath();g.moveTo(x-r*.4,y+r*.3);g.lineTo(x-r*.3,y-r*.5);g.lineTo(x+r*.3,y-r*.5);g.lineTo(x+r*.4,y+r*.3);g.closePath();g.fill();g.stroke();g.fillRect(x-r*.75,y+r*.25,r*1.5,r*.18);g.strokeRect(x-r*.75,y+r*.25,r*1.5,r*.18)}
 else if(k==='kite'){g.fillStyle='#db2777';g.beginPath();g.moveTo(x,y-r*.75);g.lineTo(x+r*.45,y-r*.1);g.lineTo(x,y+r*.55);g.lineTo(x-r*.45,y-r*.1);g.closePath();g.fill();g.stroke();g.beginPath();g.moveTo(x,y+r*.55);g.quadraticCurveTo(x+r*.4,y+r*.75,x+r*.1,y+r*.95);g.stroke()}
 else if(k==='book'){g.fillStyle='#16a34a';g.fillRect(x-r*.5,y-r*.6,r,r*1.2);g.strokeRect(x-r*.5,y-r*.6,r,r*1.2);g.fillStyle='#f5f5f4';g.fillRect(x-r*.35,y-r*.35,r*.7,r*.2)}g.restore()}
/* the "belongs to" picture: owner badge, arrow, thing badge */
function owns(g,owner,thing,y,lit){const C=A.col,W=A.W,r=Math.min(W,A.H)*.07;g.fillStyle=A.alpha(C.vi,.18);g.beginPath();g.arc(W*.28,y,r,0,7);g.fill();g.strokeStyle=C.vi;g.lineWidth=3;g.stroke();
 txt(g,owner,W*.28,y+r*1.6,W*.3,13);g.fillStyle=A.alpha(C.or,.2);A.paint.rrect(W*.72-r,y-r,r*2,r*2,10);g.fill();g.strokeStyle=C.or;g.stroke();txt(g,thing,W*.72,y+r*1.6,W*.3,13);
 g.strokeStyle=lit?C.gr:C.mu;g.lineWidth=lit?4:2;g.setLineDash(lit?[]:[6,5]);g.beginPath();g.moveTo(W*.28+r*1.2,y);g.lineTo(W*.72-r*1.3,y);g.stroke();g.setLineDash([]);
 g.beginPath();g.moveTo(W*.72-r*1.3,y);g.lineTo(W*.72-r*1.3-10,y-7);g.lineTo(W*.72-r*1.3-10,y+7);g.closePath();g.fillStyle=lit?C.gr:C.mu;g.fill();txt(g,'belongs to',W/2,y-r*.55,W*.3,11,C.mu,600);
 pic(g,owner,W*.28,y,r*.9);pic(g,thing,W*.72,y,r*.9)}
/* add: letter tiles of owner+s with a gap before every letter; the apostrophe drops into one gap */
function addLay(){const[o]=ADD[S.k],w=o+'s',n=w.length,t=Math.min(46,(A.W-40)/(n+1.6)),x0=(A.W-n*t)/2,y=A.H*.5;
 return{w,t,y,tiles:[...w].map((ch,i)=>({ch,x:x0+i*t,y,w:t-4,h:t*1.2})),gaps:Array.from({length:n+1},(_,i)=>({i,x:x0+i*t-2,y}))}}
const markAt=()=>S.grab&&S.grab.x!=null?{x:S.grab.x,y:S.grab.y}:{x:A.W/2,y:A.H*.82};
function drawAdd(g){const[o,th]=ADD[S.k],L=addLay(),C=A.col,done=S.put>=0;owns(g,o,th,A.H*.17,done);
 L.tiles.forEach((t,i)=>{box(g,{x:t.x+(done&&i>=S.put?L.t*.45:0),y:t.y-t.h/2,w:t.w,h:t.h},false,false,done);txt(g,t.ch,t.x+(done&&i>=S.put?L.t*.45:0)+t.w/2,t.y,t.w,22)});
 if(done){const x=L.gaps[S.put].x+L.t*.2;txt(g,"'",x,L.y-6,30,34,C.gr,900)}else L.gaps.forEach(gp=>{g.fillStyle=S.bad===gp.i?C.rd:A.alpha(C.vi,.45);g.fillRect(gp.x-1.5,gp.y-L.t*.55,3,L.t*1.1)});
 txt(g,th,A.W/2+(L.w.length/2)*L.t+L.t*1.1,L.y,90,20,C.tx);
 if(!done){const m=markAt();box(g,{x:m.x-28,y:m.y-32,w:56,h:64},!!S.grab,false,false);txt(g,"'",m.x,m.y+12,40,64,C.vi,900)}}
function placeMark(gap){if(part()!=='add'||S.n>=3||S.wait||S.put>=0)return;const[o]=ADD[S.k],want=o.length;
 if(gap!==want){const w=o+'s',res=w.slice(0,gap)+"'"+w.slice(gap);let m=`${res}? `;
  m+=gap===w.length?`The mark after the s means more than one ${o}. Here there is one ${o}.`:gap<want?`Do not split the name. Write all of ${o}, then ', then s.`:'';return miss(m,gap)}
 S.put=gap;next(`${o}'s ${ADD[S.k][1]}. The ${ADD[S.k][1]} belongs to the ${o}.`.replace('the Sam','Sam'))}
/* sort: one card in the middle, two bins */
const binR=()=>row(2,A.H*.6,A.H*.34,260),cardAt=()=>{const w=Math.min(A.W*.6,260),h=A.H*.2;return S.grab&&S.grab.x!=null?{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h}:{x:(A.W-w)/2,y:A.H*.2,w,h}};
const BIN=['More than one: just s',"Belongs to: 's"];
function drawSort(g){txt(g,'Is it more than one, or does something belong?',A.W/2,A.H*.07,A.W-24,14);binR().forEach((r,j)=>{box(g,r,false,S.bad===j,S.bin===j);txt(g,BIN[j],r.x+r.w/2,r.y+r.h/2,r.w-14,15)});
 if(S.k<SORT.length&&S.n<goal()){const r=cardAt();box(g,r,!!S.grab,false,false);txt(g,SORT[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-12,20)}}
function sortTo(j){if(part()!=='sort'||S.n>=goal()||S.wait)return;const[w,k]=SORT[S.k];if(j!==k)return miss(k?`${w}: something belongs to the owner, so it needs 's.`:`${w}: this just means more than one. No apostrophe.`,j);
 S.bin=j;next(`${w}: ${k?'belongs to':'more than one'}.`)}
/* read: drag the thing to its owner */
const ownR=()=>row(3,A.H*.52,A.H*.42),thingAt=()=>{const s=Math.min(A.W,A.H)*.17;return S.grab&&S.grab.x!=null?{x:S.grab.x-s/2,y:S.grab.y-s/2,w:s,h:s}:{x:A.W/2-s/2,y:A.H*.2,w:s,h:s}};
function drawRead(g){const[ph,,th]=READ[S.k],C=A.col;txt(g,`Read: ${ph}. Who owns the ${th}?`,A.W/2,A.H*.07,A.W-20,15);
 ownR().forEach((r,j)=>{box(g,r,!!S.grab,S.bad===j,S.ok===j);const R=Math.min(r.w,r.h)*.22;pic(g,WHO[j],r.x+r.w/2,r.y+r.h*.4,R*1.4);txt(g,WHO[j],r.x+r.w/2,r.y+r.h*.82,r.w-8,14)});
 if(S.ok<0){const t=thingAt();g.fillStyle=A.alpha(C.or,.25);A.paint.rrect(t.x,t.y,t.w,t.h,12);g.fill();g.strokeStyle=C.or;g.lineWidth=3;A.paint.rrect(t.x,t.y,t.w,t.h,12);g.stroke();pic(g,th,t.x+t.w/2,t.y+t.h*.4,t.w*.33);txt(g,th,t.x+t.w/2,t.y+t.h*.86,t.w-6,12)}}
function giveTo(j){if(part()!=='read'||S.n>=3||S.wait||S.ok>=0)return;const[ph,o,th]=READ[S.k];
 if(j!==o)return miss(`Look for the word with 's. In "${ph}" that is ${WHO[o]}, so the ${th} belongs to ${WHO[o]}.`,j);S.ok=j;next(`Yes! ${WHO[o]} owns the ${th}.`)}
/* fix: tap the wrong word, or tap No mistake */
function fixWords(){const[ws]=FIX[S.k],g=A.ctx;g.font=`700 ${sz(20)}px system-ui`;const sp=12,wd=ws.map(w=>g.measureText(w).width+22),tot=wd.reduce((a,b)=>a+b,0)+sp*(ws.length-1);
 let x=(A.W-Math.min(tot,A.W-20))/2;const sc=Math.min(1,(A.W-20)/tot);return ws.map((w,i)=>{const r={x,y:A.H*.36,w:wd[i]*sc,h:A.H*.18};x+=(wd[i]+sp)*sc;return r})}
const okR=()=>{const w=Math.min(220,A.W*.5);return{x:(A.W-w)/2,y:A.H*.66,w,h:A.H*.18}};
function drawFix(g){const[ws,bad,good]=FIX[S.k];txt(g,'Find the mistake and tap it.',A.W/2,A.H*.08,A.W-20,15);
 fixWords().forEach((r,i)=>{const w=S.fixed&&i===bad?good:ws[i];box(g,r,false,S.bad===i,S.fixed&&i===bad);txt(g,w,r.x+r.w/2,r.y+r.h/2,r.w+20,19)});
 const o=okR();box(g,o,false,S.bad===-2,S.fixed&&bad<0);txt(g,'No mistake',o.x+o.w/2,o.y+o.h/2,o.w-10,16)}
function fixAt(i){if(part()!=='fix'||S.n>=goal()||S.wait||S.fixed)return;const[ws,bad,good,why]=FIX[S.k];
 if(i===99)i=-1;if(i!==bad)return miss(i<0?`Look again. ${ws[bad]} is wrong.`:bad<0?`${ws[i]} is right. Look again: is there any mistake at all?`:`${ws[i]} is fine. Find the word that is wrong.`,i<0?-2:i);S.fixed=1;next(why)}
/* short: fill two slots from a tray of word tiles */
function shortTray(k){const[,o,t]=SHORT[k];return[o+"'s",t+"'s",o,t].map((w,i,a)=>a[(i+k)%4])}
const slotR=()=>row(2,A.H*.34,A.H*.18,170),tileR=()=>row(4,A.H*.68,A.H*.18,140);
function drawShort(g){const[lng]=SHORT[S.k];txt(g,`Say it short: ${lng}`,A.W/2,A.H*.1,A.W-20,15);
 slotR().forEach((r,j)=>{box(g,r,false,S.bad===j,S.fixed);txt(g,S.slots[j]||'?',r.x+r.w/2,r.y+r.h/2,r.w-8,20,S.slots[j]?A.col.tx:A.col.mu)});
 tileR().forEach((r,j)=>{const w=S.tray[j];if(!w||S.slots.includes(w))return;const d=S.grab&&S.grab.i===j&&S.grab.x!=null?{...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2}:r;box(g,d,!!(S.grab&&S.grab.i===j),false,false);txt(g,w,d.x+d.w/2,d.y+d.h/2,d.w-6,18)})}
function tile(w){if(part()!=='short'||S.n>=3||S.wait||S.fixed||S.slots.includes(w))return;S.slots.push(w);A.sound.tick();A.redraw();if(S.slots.length<2)return tell(`${w}. What comes next?`);
 const[,o,t]=SHORT[S.k],[a,b]=S.slots;if(a===o+"'s"&&b===t){S.fixed=1;return next(`${a} ${b}. Short and clear.`)}
 let m=`The owner comes first, then 's, then the thing: ${o}'s ${t}.`;if(a===o&&b===t)m=`${o} ${t} needs 's to show it belongs: ${o}'s ${t}.`;if(a===t+"'s")m=`${t}'s ${b}? The ${t} does not own anything. ${o}'s ${t}.`;
 S.slots=[];miss(m,0)}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){owns(g,'Sam','kite',H*.3,1);txt(g,"Sam's kite: the owner, then 's, then the thing.",W/2,H*.72,W-30,16);return}
 if(S.n>=goal()){txt(g,wrap(),W/2,H*.5,W-30,17);return A.fx.draw(g)}
 ({add:drawAdd,sort:drawSort,read:drawRead,fix:drawFix,short:drawShort})[v](g);A.fx.draw(g)}
const goal=()=>({add:3,sort:4,read:3,fix:3,short:3}[part()]||99);
const wrap=()=>({add:"Owner, then ', then s: dog's bone.",sort:"Just s means more than one. 's means belongs to.",read:"The word with 's is the owner.",fix:"Use 's only when something belongs.",short:"Ben's hat is short for the hat that belongs to Ben."}[part()]);
const miss=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()};
function deal(){S.grab=null;S.put=-1;S.bin=-1;S.ok=-1;S.fixed=0;S.slots=[];if(part()==='short')S.tray=shortTray(S.k)}
function next(t){S.n++;A.sound.pop();if(S.n<goal()){const k=S.k;S.wait=1;setTimeout(()=>{if(S.k!==k)return;S.wait=0;S.k++;deal();tell(t+' Next one.');buttons();A.redraw()},fast()?5:800);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.n>=goal()||S.wait)return;
 if(v==='add'){const[o]=ADD[S.k],w=o+'s';[w.length-1,w.length,1].map((_,j,a)=>a[(j+S.k*2)%3]).forEach(i=>B(w.slice(0,i)+"'"+w.slice(i),()=>placeMark(i),`Put the apostrophe here: ${w.slice(0,i)}'${w.slice(i)}`))}
 if(v==='sort')BIN.forEach((b,j)=>B(b,()=>sortTo(j),`${SORT[S.k][0]}: ${b}`));
 if(v==='read')WHO.forEach((w,j)=>B(w,()=>giveTo(j),`Give the ${READ[S.k][2]} to ${w}`));
 if(v==='fix'){FIX[S.k][0].forEach((w,i)=>B(w,()=>fixAt(i),`Fix the word ${w}`));B('No mistake',()=>fixAt(99))}
 if(v==='short')S.tray.forEach(w=>{if(!S.slots.includes(w))B(w,()=>{tile(w);buttons()},`Add the word ${w}`)})}
function down(p){const v=part();if(S.n>=goal()||S.wait)return false;
 if(v==='add'){const m=markAt();if(Math.hypot(p.x-m.x,p.y-m.y)<44){S.grab={x:null,x0:p.x,y0:p.y};return true}const L=addLay(),gp=L.gaps.find(q=>Math.abs(p.x-q.x)<L.t*.3&&Math.abs(p.y-L.y)<L.t*.7);if(gp){placeMark(gp.i);buttons()}}
 if(v==='sort'&&inside(p,cardAt())){S.grab={x:null,x0:p.x,y0:p.y};return true}if(v==='sort'){const j=binR().findIndex(r=>inside(p,r));if(j>=0)sortTo(j)}
 if(v==='read'){if(inside(p,thingAt())){S.grab={x:null,x0:p.x,y0:p.y};return true}const j=ownR().findIndex(r=>inside(p,r));if(j>=0)giveTo(j)}
 if(v==='fix'){const i=fixWords().findIndex(r=>inside(p,r));if(i>=0)fixAt(i);else if(inside(p,okR()))fixAt(99)}
 if(v==='short'){const i=tileR().findIndex((r,j)=>inside(p,r)&&!S.slots.includes(S.tray[j]));if(i>=0){S.grab={i,x:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,v=part();S.grab=null;if(!d)return A.redraw();
 if(v==='add'){if(d.x==null)return A.redraw();const L=addLay();let best=-1,bd=40;L.gaps.forEach(gp=>{const e=Math.abs(p.x-gp.x);if(e<bd&&Math.abs(p.y-L.y)<70){bd=e;best=gp.i}});if(best>=0)placeMark(best);else A.redraw();buttons()}
 if(v==='sort'){const j=binR().findIndex(r=>inside(p,r));if(j>=0)sortTo(j);else A.redraw()}
 if(v==='read'){const j=ownR().findIndex(r=>inside(p,r));if(j>=0)giveTo(j);else A.redraw()}
 if(v==='short'){const w=S.tray[d.i];if(d.x==null||slotR().some(r=>inside(p,r)))tile(w);else A.redraw();buttons()}}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(fns,gap){const k=++run;fns.forEach((f,j)=>setTimeout(()=>{if(k===run)f()},fast()?j*60+30:(j+1)*gap))}
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const steps=[
{h:'Add the apostrophe',p:"Drag the ' into the right gap. Or tap a button.",task:'Fix 3 owners',
 show:()=>{steps[0].go();auto([0,1,2].map(()=>()=>placeMark(ADD[S.k][0].length)),1000)},
 go:()=>{restart();tell('The bone belongs to the dog. Where does the apostrophe go?');buttons();S.hook=finish(0,"Write the owner, then ', then s.")}},
{h:'More than one, or belongs?',p:'Drag each card to a box.',predict:{q:'Three cats sat on a mat. Does cats need an apostrophe?',opts:["Yes: cat's","No: it just means more than one"],ans:1},task:'Sort 4 cards',
 show:()=>{steps[1].go();auto([0,1,2,3].map(()=>()=>sortTo(SORT[S.k][1])),1000)},
 go:()=>{restart();tell('Three cats, or the cat\'s bed?');buttons();S.hook=finish(1,"Just s means more than one. 's means it belongs.")}},
{h:'Whose is it?',p:"Read the words. Drag the thing to its owner.",predict:{q:"In Mia's cat, who owns who?",opts:['The cat owns Mia','Mia owns the cat'],ans:1},task:'Give 3 things back',
 show:()=>{steps[2].go();auto([0,1,2].map(()=>()=>giveTo(READ[S.k][1])),1000)},
 go:()=>{restart();tell(`Read: ${READ[0][0]}.`);buttons();S.hook=finish(2,"The word with 's is the owner.")}},
{h:'Fix it',p:'Tap the word with the mistake. Some are right!',task:'Check 3 sentences',
 show:()=>{steps[3].go();auto([0,1,2].map(()=>()=>{const b=FIX[S.k][1];fixAt(b<0?99:b)}),1000)},
 go:()=>{restart();tell('The dogs bone is big. Is there a mistake?');buttons();S.hook=finish(3,"Only use 's when something belongs.")}},
{h:'Say it short',p:'Tap two words to say it the short way.',task:'Make 3 short phrases',
 show:()=>{steps[4].go();auto([0,1,2].map(()=>()=>{tile(SHORT[S.k][1]+"'s");tile(SHORT[S.k][2]);buttons()}),1000)},
 go:()=>{restart();tell(`${SHORT[0][0]}. Say it short.`);buttons();S.hook=finish(4,"Owner's, then the thing: Ben's hat.")}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[["Which shows the ball belongs to the dog?",[["the dog's ball",'ok'],["the dogs' ball",'after'],["the dogs ball",'none']]],
 ['Which is right for more than one cup?',[['two cups','ok'],["two cup's",'plural'],["two cups'",'after']]],
 ["Tom's coat. Who owns the coat?",[['Tom','ok'],['The coat','order'],['Nobody','none']]],
 ['Which is the short way to say: the bed that belongs to Kim?',[["Kim's bed",'ok'],["bed's Kim",'order'],['Kim bed','none']]],
 ['Which sentence is right?',[["The girl's hat is blue.",'ok'],["The girl's like hats.",'plural'],['The girls hat is blue.','none']]]];
function why(t){let m="The owner, then 's, then the thing.";
 if(t==='after')m="The mark goes right after the owner, before the s. After the s means many owners.";if(t==='plural')m="More than one is just s. Use 's only when something belongs.";
 if(t==='order')m="The word with 's is the owner. It comes first.";if(t==='none')m="Without 's we cannot tell it belongs. Add 's to the owner.";return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const bx=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},bx,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?"✓ Yes! That 's shows who owns it.":'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
