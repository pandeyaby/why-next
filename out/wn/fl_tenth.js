/* Flagship: tenths (ages 7-8). Cut one whole into 10 equal parts, judge fair tenths, hop along a 0-1 line
   in tenths, share bars between 10 children, swap 10 tenths for 1 whole. Every tap or drag has a button twin. */
(()=>{
const UNEVEN=[.06,.14,.08,.12,.05,.13,.09,.11,.07,.15];
const JUDGE=[{n:10,fair:1,len:1},{n:10,fair:0,len:1},{n:8,fair:0,len:1},{n:10,fair:1,len:.6}];
const HOPS=[3,7,10];
const SHARE=[{n:1,o:[['1/10','ok'],['10/1','flip'],['1/100','hund']]},{n:3,o:[['1/3','unit'],['3/10','ok'],['3/100','hund']]},{n:7,o:[['10/7','flip'],['1/7','unit'],['7/10','ok']]}];
const MAKE=[{s:0,t:12,ask:'Make 12 tenths'},{s:9,t:11,ask:'Make 1 whole and 1 tenth'},{s:0,t:23,ask:'Make 2 wholes and 3 tenths'}];
const KIDS=['#7c3aed','#0891b2','#d97706','#16a34a','#db2777','#2563eb','#dc2626','#65a30d','#9333ea','#0d9488'];
VIS.reg('flagtenth',c=>{let A,box,chal,qi=-1,run=0;const S={};
const mode=()=>['cut','judge','hop','share','make','chal'][A.step];
const snd=k=>A.sound[k](),paintNow=()=>A.redraw(),both=()=>{paintNow();buttons()};
function tell(msg){c.say(msg);if(A)A.cv.setAttribute('aria-label',msg)}
const tenths=n=>n===10?'10/10 = 1 whole':n+'/10';
function words(msg,x,y,px,ink,bold){const g=A.ctx,sz=Math.round(px*(A.narrow?1:1.12)),max=A.W-24;g.font=`${bold||700} ${sz}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=ink||A.col.tx;
 if(g.measureText(msg).width<=max){g.fillText(msg,x,y);return}const cut=msg.lastIndexOf(' ',Math.ceil(msg.length/2)+4);g.fillText(msg.slice(0,cut),x,y-sz*.62,max);g.fillText(msg.slice(cut+1),x,y+sz*.62,max)}
function slab(r,fill,edge,w){const g=A.ctx;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=fill;g.fill();g.lineWidth=w||2;g.strokeStyle=edge||A.col.tx;g.stroke()}
const hit=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* a bar of parts: widths are fractions of the bar; shade(i) gives the fill for part i or null */
function bar(x,y,w,h,widths,shade){const g=A.ctx,C=A.col;let at=x;widths.forEach((f,i)=>{const pw=w*f,fill=shade&&shade(i);g.fillStyle=fill||A.alpha(C.cy,.08);g.fillRect(at,y,pw,h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(at,y,pw,h);at+=pw})}
const even=n=>Array(n).fill(1/n);
const barBox=()=>({x:16,y:A.H*.3,w:A.W-32,h:Math.min(A.H*.22,90)});
const pick=(i,n)=>{const gap=10,w=Math.min(170,(A.W-24-(n-1)*gap)/n),h=Math.min(A.H*.17,72),x=(A.W-n*w-(n-1)*gap)/2;return{x:x+i*(w+gap),y:A.H*.76,w,h}};
function choices(list,lit){list.forEach((t,i)=>{const r=pick(i,list.length);slab(r,S.no===i?A.alpha(A.col.rd,.25):lit===i?A.alpha(A.col.gr,.3):A.alpha(A.col.vi,.13));words(t,r.x+r.w/2,r.y+r.h/2,17,A.col.tx,800)})}
function paint(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.3);g.fillRect(0,0,W,H);
 ({cut:drawCut,judge:drawJudge,hop:drawHop,share:drawShare,make:drawMake,chal:drawChal})[mode()](g,W,H,C);A.fx.draw(g)}
function drawCut(g,W,H,C){const b=barBox();bar(b.x,b.y,b.w,b.h,even(10),i=>i<S.n?A.alpha(C.vi,.55):null);
 for(let i=0;i<S.n;i++)words('1/10',b.x+b.w*(i+.5)/10,b.y-14,A.narrow?10:12,C.tx,700);
 words(S.n?`Shaded: ${tenths(S.n)}`:'1 whole bar, cut into 10 equal parts',W/2,H*.1,17,C.tx,800);
 words(S.n>=10?'All 10 tenths make 1 whole.':'Tap the bar to shade one more tenth.',W/2,H*.72,15,S.n>=10?C.gr:C.tx,700)}
function drawJudge(g,W,H,C){if(S.r>=JUDGE.length){words('Tenths: 10 parts, and every part the same size.',W/2,H*.4,16,C.tx,800);return}
 const J=JUDGE[S.r],b=barBox(),w=b.w*J.len;bar(b.x+(b.w-w)/2,b.y,w,b.h,J.fair?even(J.n):J.n===10?UNEVEN:even(J.n),()=>null);
 words(S.done?S.why:`Bar ${S.r+1} of ${JUDGE.length}: is it cut into tenths?`,W/2,H*.12,15,C.tx,800);choices(['Tenths','Not tenths'],S.done?(J.fair?0:1):null)}
const line=()=>{const x0=26,x1=A.W-26;return{x0,x1,y:A.H*.5,step:(x1-x0)/10}};
function drawHop(g,W,H,C){const L=line(),goal=HOPS[Math.min(S.r,2)];g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(L.x0,L.y);g.lineTo(L.x1,L.y);g.stroke();
 for(let i=0;i<=10;i++){const x=L.x0+i*L.step,big=i===0||i===10;g.lineWidth=big?3:2;g.beginPath();g.moveTo(x,L.y-(big?14:9));g.lineTo(x,L.y+(big?14:9));g.stroke();
  if(!A.narrow||i===goal||(i%2===0&&Math.abs(i-goal)!==1))words(i===0?'0':i===10?'1':i+'/10',x,L.y+30,A.narrow?11:13,i===goal?C.vi:C.tx,i===goal?800:600)}
 if(S.r<3){const gx=L.x0+goal*L.step;g.fillStyle=C.vi;g.beginPath();g.moveTo(gx,L.y-20);g.lineTo(gx,L.y-50);g.lineTo(gx+20,L.y-43);g.lineTo(gx,L.y-36);g.fill()}
 const fx=S.dragX!=null?S.dragX:L.x0+S.pos*L.step;g.font=`${A.narrow?30:36}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText('🐸',fx,L.y-26);
 words(S.r>=3?'From 0 to 1 is 10 hops of 1/10.':`Hop to ${goal===10?'1 whole':goal+'/10'}. You are at ${S.pos===10?'1':S.pos?S.pos+'/10':'0'}.`,W/2,H*.12,16,C.tx,800);
 words('Drag the frog, or tap left or right of it.',W/2,H*.8,13,C.mu,600)}
function drawShare(g,W,H,C){if(S.r>=3){words('Share by 10: each child gets that many tenths.',W/2,H*.4,16,C.tx,800);return}
 const Q=SHARE[S.r],rows=Q.n,h=Math.min(28,H*.4/rows-6),top=H*.2;for(let k=0;k<rows;k++)bar(16,top+k*(h+6),W-32,h,even(10),i=>S.done?A.alpha(KIDS[i],i===0?.85:.3):null);
 words(S.done?`Child 1 gets 1/10 of each bar: ${Q.n}/10.`:`Share ${Q.n} bar${Q.n>1?'s':''} between 10 children. Each gets…`,W/2,H*.1,15,C.tx,800);choices(Q.o.map(o=>o[0]),S.done?Q.o.findIndex(o=>o[1]==='ok'):null)}
const total=()=>S.w*10+S.t;
const pile=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.17,72);return{x:12+i*(w+12),y:A.H*.76,w,h}};
function drawMake(g,W,H,C){if(S.r>=3){words('10 tenths swap for 1 whole. 1 whole breaks into 10 tenths.',W/2,H*.4,16,C.tx,800);return}
 const M=MAKE[S.r],bw=Math.min(W*.42,170),bh=30;for(let k=0;k<S.w;k++)bar(16,H*.22+k*(bh+6),bw,bh,[1],()=>A.alpha(C.gr,.55));
 bar(W-16-bw,H*.22,bw,bh,even(10),i=>i<S.t?A.alpha(C.vi,.6):null);words(`${S.w} whole${S.w===1?'':'s'}`,16+bw/2,H*.18,13,C.tx,700);words(`${S.t} tenth${S.t===1?'':'s'}`,W-16-bw/2,H*.18,13,C.tx,700);
 words(S.done?`${M.t} tenths = ${Math.floor(M.t/10)} and ${M.t%10}/10.`:`${M.ask}. You have ${total()} tenths.`,W/2,H*.1,15,C.tx,800);
 ['+1 whole','+1 tenth'].forEach((t,i)=>{const r=pile(i);slab(r,A.alpha(i?C.vi:C.gr,.15));words(t,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)})}
function drawChal(g,W,H,C){const b=barBox();bar(b.x,b.y,b.w,b.h,even(10),i=>i<3?A.alpha(C.vi,.55):null);words('3 of 10 equal parts: 3/10',W/2,H*.72,16,C.tx,800)}
function oops(i){S.no=i;setTimeout(()=>{S.no=null;paintNow()},A.reduced()?10:800)}
function shade(){if(mode()!=='cut'||S.n>=10)return;S.n++;snd(S.n===10?'pop':'tick');
 tell(S.n===1?'That is one tenth: 1 of 10 equal parts. We write 1/10.':S.n===5?'5/10. That is half the bar, too.':S.n===10?'10/10. Ten tenths make 1 whole.':`${S.n} tenths: ${S.n}/10.`);both();S.want()}
function judge(i){if(mode()!=='judge'||S.done||S.r>=JUDGE.length)return;const J=JUDGE[S.r],right=J.fair?0:1;
 if(i!==right){snd('miss');oops(i);tell(J.fair?(J.len<1?'A short bar can be cut into tenths too. 10 equal parts are tenths.':'Count them: 10 parts, all the same size. These are tenths.'):J.n===10?'Count them: 10 parts, but look at the sizes. Tenths must be equal.':'The parts are equal, but count them: only 8. Tenths need 10.');return paintNow()}
 S.done=1;snd('pop');S.why=J.fair?'Yes: 10 equal parts, so each part is 1/10.':J.n===10?'Right: 10 parts, but not equal. Not tenths.':'Right: 8 equal parts are eighths, not tenths.';tell(S.why);both()}
function hop(d){if(mode()!=='hop'||S.done||S.r>=3)return;S.pos=Math.max(0,Math.min(10,S.pos+d));landed()}
function landed(){const goal=HOPS[S.r];if(S.pos===goal){S.done=1;snd('pop');tell(goal===10?'9/10 and 1/10 more is 10/10. That is 1 whole.':`You are on ${goal}/10.`)}
 else if(S.pos>goal){snd('miss');tell(`Too far: you are on ${S.pos===10?'1':S.pos+'/10'}. Hop back 1/10.`)}else{snd('tick');tell(`${S.pos?S.pos+'/10':'0'}. ${goal-S.pos} more tenth${goal-S.pos>1?'s':''} to go.`)}both()}
function share(i){if(mode()!=='share'||S.done||S.r>=3)return;const Q=SHARE[S.r],t=Q.o[i][1];
 if(t!=='ok'){snd('miss');oops(i);tell(t==='flip'?`${Q.o[i][0]} is more than 1 whole. Each child gets less than a bar.`:t==='unit'?`1/${Q.n} would be sharing 1 bar between ${Q.n}. Here 10 children share.`:'Hundredths are 100 equal parts. We cut each bar into 10.');return paintNow()}
 S.done=1;snd('pop');tell(`Cut each bar into 10. Each child gets 1 tenth of each bar: ${Q.n}/10.`);both()}
function add(k){if(mode()!=='make'||S.done||S.r>=3)return;const M=MAKE[S.r];
 if(k>0){if(k===10)S.w++;else S.t++;if(S.t===10){S.t=0;S.w++;snd('whoosh');tell('10 tenths make 1 whole. Swap them for 1 whole bar.')}else snd('tick')}
 else{if(!S.t&&S.w){S.w--;S.t=10;tell('1 whole is 10 tenths. Break it up.')}if(S.t){S.t--;snd('tick')}}
 if(total()===M.t){S.done=1;snd('pop');tell(`Yes: ${M.t} tenths is ${Math.floor(M.t/10)} whole${M.t>19?'s':''} and ${M.t%10} tenth${M.t%10===1?'':'s'}.`)}
 else if(total()>M.t){snd('miss');tell(`Too many: ${total()} tenths. Take 1 tenth away.`)}both()}
function next(){const v=mode(),end={judge:JUDGE.length-1,hop:2,share:2,make:2}[v];if(!S.done||S.r>end)return;S.r++;S.done=0;S.no=null;snd('step');
 if(v==='make'&&S.r<3){S.w=0;S.t=MAKE[S.r].s}
 if(S.r>end){both();return S.want()}tell(v==='judge'?'Next bar.':v==='hop'?`Now hop to ${HOPS[S.r]===10?'1 whole':HOPS[S.r]+'/10'}.`:v==='share'?`Now share ${SHARE[S.r].n} bars.`:MAKE[S.r].ask+'.');both()}
function buttons(){if(!box)return;box.innerHTML='';const v=mode(),mk=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},box,t);b.onclick=f};
 if(v==='cut'){if(S.n<10)mk('Shade 1 more tenth',shade);return}const end={judge:JUDGE.length-1,hop:2,share:2,make:2}[v];if(end==null||S.r>end)return;
 if(S.done){mk(S.r<end?'Next one':'Finish',next);return}
 if(v==='judge')['Tenths','Not tenths'].forEach((t,i)=>mk(t,()=>judge(i)));
 if(v==='hop'){mk('Hop back 1/10',()=>hop(-1));mk('Hop on 1/10',()=>hop(1))}
 if(v==='share')SHARE[S.r].o.forEach((o,i)=>mk(o[0],()=>share(i),'Each child gets '+o[0]));
 if(v==='make'){mk('+1 whole',()=>add(10));mk('+1 tenth',()=>add(1));mk('−1 tenth',()=>add(-1))}}
function down(p){const v=mode();if(S.done&&v!=='cut'){next();return false}
 if(v==='cut'&&hit(p,barBox()))shade();
 if(v==='judge'&&S.r<JUDGE.length)[0,1].forEach(i=>{if(hit(p,pick(i,2)))judge(i)});
 if(v==='share'&&S.r<3)[0,1,2].forEach(i=>{if(hit(p,pick(i,3)))share(i)});
 if(v==='make'&&S.r<3)[0,1].forEach(i=>{if(hit(p,pile(i)))add(i?1:10)});
 if(v==='hop'&&S.r<3){const L=line(),fx=L.x0+S.pos*L.step;if(Math.abs(p.x-fx)<30&&Math.abs(p.y-L.y)<70){S.dragX=p.x;S.sx=p.x;return true}hop(p.x>fx?1:-1)}return false}
function move(p){if(S.dragX!=null){const L=line();S.dragX=Math.max(L.x0,Math.min(L.x1,p.x));paintNow()}}
function up(p){if(S.dragX==null)return;const L=line(),moved=Math.abs(p.x-S.sx)>8;S.dragX=null;if(!moved)return paintNow();const to=Math.round((Math.max(L.x0,Math.min(L.x1,p.x))-L.x0)/L.step);if(to!==S.pos){S.pos=to;landed()}else paintNow()}
const when=(n,test,line)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(line+A.reveal(n))};
function auto(n,acts){steps[n].go();const id=++S.id;acts.forEach((f,j)=>setTimeout(()=>{if(id===S.id)f()},A.reduced()?30*(j+1):(j+1)*260))}
function fresh(){const id=(S.id||0)+1;for(const k in S)delete S[k];Object.assign(S,{id,want:()=>{},n:0,r:0,done:0,pos:0,w:0,t:0,no:null,dragX:null})}
const steps=[
{h:'Cut into tenths',p:'Cut 1 whole bar into 10 equal parts. Each part is one tenth. We write it 1/10.',
 predict:{q:'One bar is cut into 10 equal parts. What is each part called?',opts:['One ten','One tenth','One half'],ans:1},task:'Shade 10 tenths to make 1 whole',
 show:()=>auto(0,Array(10).fill(shade)),
 go:()=>{fresh();tell('Tap the bar to shade one tenth.');buttons();S.want=when(0,()=>S.n>=10,'Ten tenths make 1 whole: 10/10 = 1.')}},
{h:'Fair tenths?',p:'Tenths need two things: 10 parts, and every part the same size.',
 predict:{q:'A bar has 10 parts, but some are bigger. Is each part a tenth?',opts:['Yes, there are 10 parts','No, the parts must be equal','Only the big parts'],ans:1},task:'Judge 4 bars',
 show:()=>auto(1,JUDGE.flatMap(J=>[()=>judge(J.fair?0:1),next])),
 go:()=>{fresh();tell('Bar 1. Is it cut into tenths?');buttons();S.want=when(1,()=>S.r>=JUDGE.length,'Tenths are 10 equal parts.')}},
{h:'Hop in tenths',p:'A number line from 0 to 1 has 10 equal hops. Each hop is 1/10.',
 predict:{q:'The frog is on 9/10. It hops 1/10 more. Where is it now?',opts:['9/11','10/100','10/10, which is 1'],ans:2},task:'Hop to 3 targets',
 show:()=>auto(2,[3,4,3].flatMap(k=>[...Array(k).fill(()=>hop(1)),next])),
 go:()=>{fresh();tell('Hop to 3/10.');buttons();S.want=when(2,()=>S.r>=3,'Count on in tenths: 9/10, then 10/10 = 1.')}},
{h:'Share by 10',p:'Share bars fairly between 10 children. Cut each bar into 10 equal parts. Each child gets 1 part from each bar.',
 predict:{q:'Share 3 bars between 10 children. Each child gets…',opts:['1/3 of a bar','3/10 of a bar','3 bars'],ans:1},task:'Share 3 times',
 show:()=>auto(3,SHARE.flatMap(Q=>[()=>share(Q.o.findIndex(o=>o[1]==='ok')),next])),
 go:()=>{fresh();tell('Share 1 bar between 10 children.');buttons();S.want=when(3,()=>S.r>=3,'Share 7 bars between 10: 7/10 each.')}},
{h:'Wholes and tenths',p:'When you have 10 tenths, swap them for 1 whole. 12 tenths is 1 whole and 2 tenths.',task:'Make 3 numbers',
 show:()=>auto(4,[()=>add(10),()=>add(1),()=>add(1),next,()=>add(1),()=>add(1),next,()=>add(10),()=>add(10),()=>add(1),()=>add(1),()=>add(1),next]),
 go:()=>{fresh();tell('Make 12 tenths.');buttons();S.want=when(4,()=>S.r>=3,'10 tenths swap for 1 whole.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A bar is cut into 10 equal parts. What is each part?',[['One tenth','ok'],['One ten','ten'],['One hundredth','hund']]],
 ['How many tenths make 1 whole?',[['10','ok'],['1','one'],['100','hund2']]],
 ['4/10 and 1/10 more is…',[['5/10','ok'],['5/20','addbot'],['4/11','bot1']]],
 ['3 bars are shared between 10 children. Each child gets…',[['3/10 of a bar','ok'],['1/3 of a bar','unit'],['10/3 bars','flip']]],
 ['Which bar is cut into tenths?',[['10 equal parts','ok'],['10 parts of different sizes','uneven'],['8 equal parts','eight']]],
 ['15 tenths is the same as…',[['1 whole and 5 tenths','ok'],['15 wholes','wholes'],['1 whole and 15 tenths','noswap']]],
 ['Count back in tenths: 1, 9/10, 8/10, …',[['7/10','ok'],['7/9','den'],['8/9','den2']]]];
function why(t){let m='Tenths are 10 equal parts of 1 whole.';
 if(t==='ten')m='Ten is a number of things. One tenth is 1 of 10 equal parts of a whole.';
 if(t==='hund')m='A hundredth is 1 of 100 equal parts. 10 equal parts give tenths.';
 if(t==='one')m='1 tenth is only one part. It takes 10 tenths to fill the whole.';
 if(t==='hund2')m='100 hundredths make 1 whole. For tenths you need 10.';
 if(t==='addbot')m='Do not add the bottoms. They stay tenths: 4 tenths and 1 tenth is 5 tenths, 5/10.';
 if(t==='bot1')m='The bottom number says the parts are tenths. It stays 10. Add the tops: 5/10.';
 if(t==='unit')m='1/3 is sharing 1 bar between 3. Here 3 bars go to 10 children: 3/10 each.';
 if(t==='flip')m='10/3 is more than 3 bars. Each child gets less than 1 bar: 3/10.';
 if(t==='uneven')m='Count them: 10 parts, but the sizes differ. Tenths must be equal.';
 if(t==='eight')m='8 equal parts are eighths. Tenths need 10 equal parts.';
 if(t==='wholes')m='15 tenths is not 15 bars. 10 tenths make 1 whole, so 15 tenths is 1 whole and 5 tenths.';
 if(t==='noswap')m='After 10 tenths make 1 whole, only 5 tenths are left: 1 whole and 5 tenths.';
 if(t==='den')m='The bottom stays 10. Take 1 tenth away from 8/10: 7/10.';
 if(t==='den2')m='Counting back changes the top, not the bottom. After 8/10 comes 7/10.';
 return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],turn=(qi*2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');[...ops.slice(turn),...ops.slice(0,turn)].forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);paintNow()}
function grade(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const out=chal.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;snd('miss')}out.innerHTML=(good?`✓ Right! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';out.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{chal.hidden=A.step!==5;box.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);box=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
