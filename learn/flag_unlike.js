/* Flagship: adding and subtracting fractions with different denominators (ages 9–10; National Curriculum in England,
   Year 5 fractions: "add and subtract fractions with the same denominator and denominators that are multiples of the
   same number"; CCSS 5.NF.A.1). Tap a fraction bar to cut every piece into 2, 3, 4… smaller equal pieces (an equivalent
   fraction), add only when both bars have the same size pieces, place 1/2 + 1/3 on a twelfths number line, find the
   lowest common denominator for 1/4 + 1/6, and take 1/3 away from 5/6. Every canvas tap has a button twin. */
(()=>{
const INK='#0f172a',GREY='#475569',RULE='#1e3a8a',PAPER='#ffffff',OKC='#047857',NOC='#b91c1c',TINT='#eef2ff',YES='#dcfce7',EMPTY='#f1f5f9';
const BLUE='#1d4ed8',ORNG='#c2410c',HATCH='#94a3b8';
const gcd=(a,b)=>b?gcd(b,a%b):a,lcm=(a,b)=>a*b/gcd(a,b);
const PIECE={2:'halves',3:'thirds',4:'quarters',5:'fifths',6:'sixths',8:'eighths',9:'ninths',10:'tenths',12:'twelfths',15:'fifteenths',16:'sixteenths',18:'eighteenths',20:'twentieths',24:'twenty-fourths'};
const pieces=d=>PIECE[d]||d+'ths';
const fr=(n,d)=>n+'/'+d;
/* each bar task: two fractions, an operation, and whether only the lowest common denominator counts */
const SUMS={0:{a:[1,2],b:[1,4],op:'+'},1:{a:[1,3],b:[1,4],op:'+'},3:{a:[1,4],b:[1,6],op:'+',lowest:true},4:{a:[5,6],b:[1,3],op:'−'}};
const MAXK=6;
VIS.reg('flagunlike',c=>{let A,X,pad,box,qi=-1,streak=0;const S={after:()=>{}};
const z=v=>Math.round(v*(A.narrow?1:1.12)),face=v=>`700 ${z(v)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(s,x,y,v,col,al){X.font=face(v);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)}
function lines(s,w,v){X.font=face(v);const out=[];let cur='';for(const word of String(s).split(' ')){const t=cur?cur+' '+word:word;if(cur&&X.measureText(t).width>w){out.push(cur);cur=word}else cur=t}out.push(cur);return out}
function card(r,fill,edge,lw){X.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,8);X.fill();if(edge){X.strokeStyle=edge;X.lineWidth=lw||2;X.stroke()}}
function headline(s,good){const L=lines(s,A.W-34,13),lh=z(13)+4,r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.1,L.length*lh+12)};card(r,good?YES:TINT,good?OKC:RULE);L.forEach((l,i)=>say(l,A.W/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,13,good?OKC:INK));return r.y+r.h}
function footer(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=z(13)+5,h=L.length*lh+10,y=A.H-h-6;card({x:10,y,w:A.W-20,h},PAPER,S.bad?NOC:OKC,3);L.forEach((l,i)=>say(l,A.W/2,y+5+lh*(i+.5),13))}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const yes=s=>{S.bad=false;S.msg=s;A.sound.pop();refresh()};
const mode=()=>[0,1,3,4].includes(A.step)?'bars':A.step===2?'line':'quiz';
const job=()=>SUMS[A.step];
const now=i=>{const f=i?job().b:job().a,k=S.k[i];return [f[0]*k,f[1]*k]};
/* one fraction bar: d*k equal pieces, n*k shaded */
function bar(r,n,d,col,cross){X.fillStyle=EMPTY;X.fillRect(r.x,r.y,r.w,r.h);const w=r.w/d;
 for(let i=0;i<n;i++){X.fillStyle=col;X.fillRect(r.x+i*w,r.y,w,r.h);if(cross&&i>=n-cross){X.fillStyle=HATCH;X.fillRect(r.x+i*w,r.y,w,r.h);X.strokeStyle=PAPER;X.lineWidth=2;X.beginPath();X.moveTo(r.x+i*w+3,r.y+3);X.lineTo(r.x+(i+1)*w-3,r.y+r.h-3);X.stroke()}}
 X.strokeStyle=PAPER;X.lineWidth=d>16?1:2;for(let i=1;i<d;i++){X.beginPath();X.moveTo(r.x+i*w,r.y);X.lineTo(r.x+i*w,r.y+r.h);X.stroke()}
 X.strokeStyle=INK;X.lineWidth=2;X.strokeRect(r.x,r.y,r.w,r.h)}
function drawBars(){const J=job(),top=headline(S.ok?S.win:J.lowest?`${fr(...J.a)} + ${fr(...J.b)}. Tap a bar to cut its pieces smaller. Find the smallest number of pieces that works for both.`:`${fr(...J.a)} ${J.op} ${fr(...J.b)}. Tap a bar to cut its pieces smaller. ${J.op==='+'?'Add':'Take away'} when the pieces match.`,S.ok);
 const lw=z(64),bx=14+lw,bw=A.W-bx-16,bh=z(34),gap=A.narrow?z(30):z(26);let y=top+gap*.7;S.hit=[];
 [0,1].forEach(i=>{const [n,d]=now(i),col=i?ORNG:BLUE,r={x:bx,y,w:bw,h:bh};bar(r,n,d,col);say(fr(n,d),14+lw/2,y+bh/2,17,col);
  say(S.k[i]>1?`${fr(...(i?J.b:J.a))} cut into ${pieces(d)}`:'tap to cut',bx+bw/2,y+bh+z(10),11,GREY);S.hit.push({x:r.x,y:r.y-6,w:r.w,h:r.h+14});
  y+=bh+gap;if(!i)say(J.op,14+lw/2,y-gap/2+2,20,INK)});
 if(J.lowest){const row=(m,yy,col)=>{let s=`${m}s: `;for(let j=1;j<=MAXK;j++)s+=(m*j)+(j<MAXK?'  ':'');say(s,A.W/2,yy,12,col)};row(J.a[1],y-z(4),BLUE);row(J.b[1],y+z(13),ORNG);y+=z(24)}
 if(S.res){const {na,nb,d}=S.res,r={x:bx,y:y+z(4),w:bw,h:bh};X.fillStyle=EMPTY;X.fillRect(r.x,r.y,r.w,r.h);const w=r.w/d;
  if(J.op==='+'){bar(r,na+nb,d,BLUE);X.fillStyle=ORNG;X.fillRect(r.x+na*w,r.y,nb*w,r.h);X.strokeStyle=PAPER;X.lineWidth=2;for(let i=1;i<d;i++){X.beginPath();X.moveTo(r.x+i*w,r.y);X.lineTo(r.x+i*w,r.y+r.h);X.stroke()}X.strokeStyle=INK;X.strokeRect(r.x,r.y,r.w,r.h)}
  else bar(r,na,d,BLUE,nb);
  const v=J.op==='+'?na+nb:na-nb,g=gcd(v,d);say('= '+fr(v,d)+(g>1?' = '+fr(v/g,d/g):''),A.W/2,r.y+bh+z(14),15,OKC)}}
function cut(i){A.sound.tick();if(S.ok)return;S.k[i]=S.k[i]%MAXK+1;S.res=null;const [n,d]=now(i),f=i?job().b:job().a;
 S.bad=false;S.msg=S.k[i]===1?`Back to ${fr(n,d)}.`:`${fr(...f)} = ${fr(n,d)}: the same amount, cut into ${S.k[i]} times as many pieces.`;refresh()}
function combine(){if(S.ok)return;const J=job(),[na,da]=now(0),[nb,db]=now(1);
 if(da!==db)return oops(`Not yet: ${pieces(da)} and ${pieces(db)} are different sizes, so ${J.op==='+'?'adding':'taking away'} the tops means nothing. Cut until both bars have the same number of pieces.`);
 S.res={na,nb,d:da};const v=J.op==='+'?na+nb:na-nb;
 if(J.lowest&&da!==lcm(J.a[1],J.b[1])){S.bad=false;S.msg=`${fr(na,da)} + ${fr(nb,db)} = ${fr(v,da)} is right, but ${lcm(J.a[1],J.b[1])} is smaller and both ${J.a[1]} and ${J.b[1]} go into it. Tap a bar to change its cuts.`;S.res=null;A.sound.tick();return refresh()}
 S.ok=true;const g=gcd(v,da);S.win=J.op==='+'?`${fr(...J.a)} + ${fr(...J.b)} = ${fr(na,da)} + ${fr(nb,da)} = ${fr(v,da)}${g>1?' = '+fr(v/g,da/g):''}. Same-size pieces, then add the tops.`:`${fr(...J.a)} − ${fr(...J.b)} = ${fr(na,da)} − ${fr(nb,da)} = ${fr(v,da)}${g>1?' = '+fr(v/g,da/g):''}. The bottom number stays ${da}.`;
 yes(J.op==='+'?`${na} ${pieces(da)} and ${nb} more make ${v} ${pieces(da)}.`:`${na} ${pieces(da)} take away ${nb} leaves ${v}.`)}
/* step 2: where does 1/2 + 1/3 land? */
const lineGeo=()=>({x:z(30),w:A.W-2*z(30),y:A.H*(A.narrow?.5:.52)});
function drawLine(){const G=lineGeo();headline(S.ok?'1/2 = 6/12 and 1/3 = 4/12. 6 + 4 = 10, so 1/2 + 1/3 = 10/12 = 5/6. Not 2/5.':'Drag the dot to where 1/2 + 1/3 lands. Each small step is 1/12.',S.ok);
 X.strokeStyle=INK;X.lineWidth=3;X.beginPath();X.moveTo(G.x,G.y);X.lineTo(G.x+G.w,G.y);X.stroke();
 for(let i=0;i<=12;i++){const x=G.x+G.w*i/12,big=i%6===0;X.lineWidth=big?3:1.5;X.beginPath();X.moveTo(x,G.y-(big?12:7));X.lineTo(x,G.y+(big?12:7));X.stroke()}
 say('0',G.x,G.y+z(26),14);say('1/2',G.x+G.w/2,G.y+z(26),14);say('1',G.x+G.w,G.y+z(26),14);
 const seg=(a,b,yy,col,t)=>{X.fillStyle=col;X.fillRect(G.x+G.w*a/12,yy,G.w*(b-a)/12,z(16));say(t,G.x+G.w*(a+b)/24,yy-z(9),12,col)};
 seg(0,6,G.y-z(70),BLUE,'1/2 = 6/12');if(S.ok||S.tries>1)seg(6,10,G.y-z(70),ORNG,'1/3 = 4/12');
 if(S.ghost!=null){const gx=G.x+G.w*S.ghost/12;X.fillStyle=NOC;X.beginPath();X.arc(gx,G.y+z(46),5,0,7);X.fill();say('2/5',gx,G.y+z(60),12,NOC)}
 const mx=G.x+G.w*S.mark/12;X.fillStyle=S.ok?OKC:RULE;X.beginPath();X.arc(mx,G.y,z(13),0,7);X.fill();X.strokeStyle=PAPER;X.lineWidth=3;X.stroke();say(S.mark+'/12',mx,G.y-z(28),14,S.ok?OKC:RULE);S.dot={x:mx-24,y:G.y-24,w:48,h:48}}
function moveMark(m){if(S.ok)return;S.mark=Math.max(0,Math.min(12,m));S.bad=false;S.msg='';refresh()}
function checkMark(){if(S.ok)return;S.tries++;const m=S.mark;
 if(m===10){S.ok=true;return yes('10/12: 6 twelfths and 4 more. The tops add; the twelfths stay twelfths.')}
 if(m===5){S.ghost=4.8;return oops(`${m}/12 is close to 2/5, the "add the tops and the bottoms" answer. But 1/2 alone is 6/12, so the total must be past the middle.`)}
 if(m===6)return oops('6/12 is only the 1/2. You still need to add 1/3, which is 4 twelfths.');
 if(m===4)return oops('4/12 is only the 1/3. Start from 1/2 = 6/12 and add 4 more twelfths.');
 if(m===7)return oops('7/12 adds just 1 twelfth to the half. 1/3 is bigger: it is 4 of the twelfths.');
 if(m>10)return oops(`${m}/12 is too far. 1/2 = 6/12 and 1/3 = 4/12, so count on 4 from 6.`);
 oops(`${m}/12 is short. 1/2 = 6/12 and 1/3 = 4/12, so count on 4 from 6.`)}
/* pointer */
function down(p){const m=mode();
 if(m==='bars'&&S.hit){const f=S.hit.findIndex(r=>inside(p,r));if(f>=0){cut(f);return true}}
 if(m==='line'&&!S.ok){const G=lineGeo();if(Math.abs(p.y-G.y)<40&&p.x>G.x-30&&p.x<G.x+G.w+30){S.drag=true;moveMark(Math.round((p.x-G.x)/G.w*12));return true}}return false}
function move(p){if(!S.drag)return;const G=lineGeo();moveMark(Math.round((p.x-G.x)/G.w*12))}
function up(){S.drag=false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='bars')drawBars();if(m==='line')drawLine();
 if(m==='quiz'){headline('Make the pieces the same size, then add or take away the tops. The bottom number stays.');const lw=z(60),bx=14+lw,bw=A.W-bx-16,bh=z(30);bar({x:bx,y:A.H*.36,w:bw,h:bh},2,4,BLUE);say('2/4',14+lw/2,A.H*.36+bh/2,16,BLUE);bar({x:bx,y:A.H*.36+bh+z(24),w:bw,h:bh},1,4,ORNG);say('1/4',14+lw/2,A.H*.36+bh*1.5+z(24),16,ORNG)}
 footer();A.fx.draw(X)}
function refresh(){const m=mode();let s='Challenge.';
 if(m==='bars'){const J=job(),[na,da]=now(0),[nb,db]=now(1);s=`Top bar ${fr(na,da)}, bottom bar ${fr(nb,db)}, ${da===db?'same size pieces':'different size pieces'}.${S.ok?' Done: '+S.win:''}`}
 if(m==='line')s=`Number line from 0 to 1 in twelfths. Dot at ${S.mark}/12.`;
 announce((S.msg?S.msg+' ':'')+s);buttons();S.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='bars'&&!S.ok){const J=job();b(`Cut ${fr(...J.a)} bar`,()=>cut(0),`Cut the ${fr(...J.a)} bar into smaller pieces`);b(`Cut ${fr(...J.b)} bar`,()=>cut(1),`Cut the ${fr(...J.b)} bar into smaller pieces`);b(J.op==='+'?'Add':'Take away',combine)}
 if(m==='line'&&!S.ok){b('← 1/12',()=>moveMark(S.mark-1),'Move the dot back one twelfth');b('1/12 →',()=>moveMark(S.mark+1),'Move the dot on one twelfth');b('Check',checkMark,'Check the dot')}
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const reset=()=>{S.run=(S.run||0)+1;Object.assign(S,{after:()=>{},k:[1,1],res:null,ok:false,win:'',mark:0,tries:0,ghost:null,drag:false,msg:'',bad:false})};
const cuts=(i,n)=>Array.from({length:n},()=>()=>cut(i));
const steps=[
{h:'Same-size pieces',p:'You can only add pieces that are the same size. Cut the halves into quarters, then add.',
predict:{q:'What is 1/2 + 1/4?',opts:['3/4','2/6','2/4'],ans:0},
task:'Make the pieces match, then add',show:()=>{steps[0].go();replay([...cuts(0,1),combine],500)},go:()=>{reset();refresh();S.after=check(0,()=>S.ok,'Halves became quarters.')}},
{h:'Cut both bars',p:'Thirds and quarters: neither fits into the other. Cut both bars until the pieces match.',
task:'Add 1/3 + 1/4',show:()=>{steps[1].go();replay([...cuts(0,3),...cuts(1,2),combine],380)},go:()=>{reset();refresh();S.after=check(1,()=>S.ok,'Both became twelfths.')}},
{h:'Check on a number line',p:'Adding the tops and the bottoms gives 1/2 + 1/3 = 2/5. Is that even bigger than 1/2?',
predict:{q:'Is 1/2 + 1/3 equal to 2/5?',opts:['No, 2/5 is less than 1/2','Yes, 1 + 1 = 2 and 2 + 3 = 5','Only on a number line'],ans:0},
task:'Put the dot on 1/2 + 1/3',show:()=>{steps[2].go();replay([...Array.from({length:10},()=>()=>moveMark(S.mark+1)),checkMark],170)},go:()=>{reset();refresh();S.after=check(2,()=>S.ok,'5/6, not 2/5.')}},
{h:'The smallest bottom number',p:'For 1/4 + 1/6, look at the multiples of 4 and 6. The first number in both lists is the lowest common denominator.',
task:'Add using the lowest common denominator',show:()=>{steps[3].go();replay([...cuts(0,2),...cuts(1,1),combine],450)},go:()=>{reset();refresh();S.after=check(3,()=>S.ok,'Twelfths: the smallest.')}},
{h:'Taking away',p:'Subtracting works the same way. Make the pieces match, then take away the tops.',
predict:{q:'What is 5/6 − 1/3?',opts:['1/2','4/3','4/6'],ans:0},
task:'Take 1/3 away from 5/6',show:()=>{steps[4].go();replay([...cuts(1,1),combine],500)},go:()=>{reset();refresh();S.after=check(4,()=>S.ok,'3/6, which is 1/2.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const QS=[['1/2 + 1/4 = ?','3/4',[['2/6','addBottoms'],['2/4','topsOnly']]],
['1/3 + 1/6 = ?','3/6, which is 1/2',[['2/9','addBottoms'],['2/6','topsOnly']]],
['What is the lowest common denominator for 1/4 + 1/6?','12',[['10','sumDenoms'],['6','notMultiple']]],
['3/4 + 1/2 = ?','5/4, which is 1 1/4',[['4/6','addBottoms'],['5/8','doubleBottom']]],
['5/6 − 1/3 = ?','3/6, which is 1/2',[['4/3','subBottoms'],['4/6','topsOnly']]],
['Is 1/2 + 1/3 more or less than 1?','Less: it is 5/6',[['Exactly 1','wholeGuess'],['More: two fractions make more than one','twoParts']]]];
function why(tag){let m='Cut the pieces until both fractions have the same denominator, then add or take away the numerators.';
 if(tag==='addBottoms')m='Adding the bottoms changes the piece size. 1/2 + 1/4 cannot be 2/6, because 2/6 is less than 1/2 on its own.';
 if(tag==='topsOnly')m='You changed the bottom number but not the top. 1/2 = 2/4 and 1/3 = 2/6: cut every piece, so the top grows too.';
 if(tag==='sumDenoms')m='4 + 6 = 10, but 4 does not go into 10. The common denominator must be a multiple of both: 12, 24, 36 …';
 if(tag==='notMultiple')m='Quarters cannot be cut into sixths, because 4 does not go into 6. Use 12: 4 × 3 and 6 × 2.';
 if(tag==='doubleBottom')m='3/4 + 2/4 keeps quarters: the pieces do not shrink when you add. 5/4 is one whole and 1/4.';
 if(tag==='subBottoms')m='Taking away the bottoms makes no sense: 6 − 3 changes the piece size. Use sixths: 5/6 − 2/6 = 3/6.';
 if(tag==='wholeGuess')m='1/2 = 3/6 and 1/3 = 2/6. Together that is 5/6, one sixth short of a whole.';
 if(tag==='twoParts')m='Each part is half or less. 3/6 + 2/6 = 5/6, which is less than 6/6.';
 return m}
function ask(){qi++;const [qq,ans,bad]=QS[qi%QS.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});announce('Challenge: '+qq);A.redraw()}
function mark(tag,ans){box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=box.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.62,tall:1.08,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Fraction lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
