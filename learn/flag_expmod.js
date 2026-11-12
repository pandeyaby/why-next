/* Flagship – Modelling exponential growth (ages 15–17; CCSS F-LE.2 "construct exponential functions … given a description
   of a relationship, or two input-output pairs", F-BF.1a). */
(()=>{
const FIT=[[200,800,2,'bacteria','hour',4.5,2],[1000,1331,3,'£ savings','year',1.5,1.1],[5000,7200,2,'followers','month',1.6,1.2]];
const STORY=[['£500 invested at 4% compound interest a year.',[['500','4','1.04'],['1.04','0.04','1.4'],['years','percent','pounds']]],
['Town: 12,000 people in 2018, growing 3% a year.',[['12000','2018','3'],['1.03','0.03','3'],['years since 2018','the year, e.g. 2030','people']]],
['A video has 800 views; views triple every day.',[['800','3','2400'],['3','1.03','0.3'],['days','views','hours']]],
['40 virus cases, rising 25% a week.',[['40','25','1.25'],['1.25','0.25','25'],['weeks','cases','days']]]];
const SLOT=['a (start)','b (factor)','t counts'];
const WHEN=[[500,1.04,700,'year'],[800,3,100000,'day'],[40,1.25,500,'week']];
const SANE=[['Cases after 3 weeks: 40·1.25³ ≈ 78',0],['Cases after 100 weeks: ≈ 2 × 10¹¹ people',1],['£500 at 4% after 10 years: ≈ £740',0],['Video views after 30 days: ≈ 1.6 × 10¹⁷',1],['Town in 2030: 12000·1.03¹² ≈ 17,100 people',0],['100 bacteria doubling hourly for 3 days: ≈ 4.7 × 10²³',1]];
const TWO=[[2,450,5,1518.75,['1.5','3.375','1.125'],['200','450','300'],['noroot','divide'],['late','onestep']],
[1,1100,3,1331,['1.1','1.21','1.105'],['1000','1100','909'],['noroot','divide'],['late','twice']],
[2,72,4,162,['1.5','2.25','1.625'],['32','72','48'],['noroot','divide'],['late','onestep']]];
const ab=Math.abs,mx=Math.max,mn=Math.min,rd=Math.round;
VIS.reg('flagexpmod',c=>{let A,row,box,qq=-1,gen=0;
const Z={};
const INK='#0f172a',GOOD='#047857',BAD='#be123c',GRID='#94a3b8',CURVE='#4338ca',DOT='#b45309',CARD='#ffffff';
const s=v=>rd(v*(A.narrow?.92:1.05)),ff=(v,w)=>`${w||800} ${s(v)}px system-ui,sans-serif`;
const part=()=>['fit','story','when','sane','two','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const fmt=v=>v>=1e6?v.toExponential(2).replace('e+',' × 10^'):v>=100?rd(v).toLocaleString('en-GB'):(+v.toFixed(2)).toString();
const no=()=>A.sound.miss(),yes=()=>A.sound.pop();
function fin(L){base();cap('All done',1);L.forEach((t,i)=>txt(t,A.H*(.25+i*.14),17))}
function base(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function plate(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.rim?3.5:1.4;g.strokeStyle=o.rim||'#64748b';g.stroke();
 if(t==null)return;g.fillStyle=o.fg||INK;g.font=ff(o.n||16,o.w||750);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-10)}
function cap(t,won){const g=A.ctx;let n=15;g.font=ff(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=ff(n)}const w=g.measureText(t).width+26;
 plate({x:A.W/2-w/2,y:A.H*.025,w,h:s(n)+14},t,{bg:won?'#d1fae5':CARD,rim:won?GOOD:null,n,w:800})}
function txt(t,y,n,col){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=ff(n||14,650);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
function frame(){return{x:s(46),y:A.H*.2,w:A.W-s(46)-12,h:A.H*.5}}
function seg(x1,y1,x2,y2){const g=A.ctx;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
function plot(a,b,tmax,ymax,pts,mark){const g=A.ctx,F=frame(),D=A.col.dark,X=t=>F.x+t/tmax*F.w,Y=v=>F.y+F.h-mn(1.05,v/ymax)*F.h;
 g.fillStyle=D?'#111827':'#fff';g.fillRect(F.x,F.y,F.w,F.h);g.strokeStyle=GRID;g.lineWidth=1;g.font=ff(11,600);g.fillStyle=A.col.tx;g.globalAlpha=.4;
 for(let t=0;t<=tmax;t++)seg(X(t),F.y,X(t),F.y+F.h);for(let k=0;k<=4;k++)seg(F.x,Y(ymax*k/4),F.x+F.w,Y(ymax*k/4));g.globalAlpha=1;
 g.textAlign='center';g.textBaseline='top';for(let t=0;t<=tmax;t+=tmax>8?3:1)g.fillText(t,X(t),F.y+F.h+3);g.textAlign='right';g.textBaseline='middle';for(let k=0;k<=4;k++)g.fillText(fmt(ymax*k/4),F.x-4,Y(ymax*k/4));
 g.save();g.beginPath();g.rect(F.x,F.y-2,F.w,F.h+4);g.clip();g.strokeStyle=D?'#a5b4fc':CURVE;g.lineWidth=3;g.beginPath();for(let i=0;i<=120;i++){const t=tmax*i/120;g.lineTo(X(t),Y(a*b**t))}g.stroke();g.restore();
 (pts||[]).forEach(([t,v])=>{g.fillStyle=DOT;g.beginPath();g.arc(X(t),Y(v),s(7),0,7);g.fill();g.strokeStyle=CARD;g.lineWidth=2;g.stroke()});
 if(mark!=null){const M=D?'#34d399':GOOD;g.strokeStyle=g.fillStyle=M;g.lineWidth=3;g.setLineDash([6,4]);seg(X(mark),F.y,X(mark),F.y+F.h);g.setLineDash([]);g.beginPath();g.arc(X(mark),F.y+F.h,s(11),0,7);g.fill()}
 return{F,X,Y}}
function track(){return{x:s(30),y:A.H*.86,w:A.W-s(60),h:s(26)}}
function drawFit(){const st=Z.fit;base();if(st.n>=FIT.length)return fin(FIT.map(q=>`${q[0]}·${q[6]}ᵗ`));
 const q=FIT[st.n],b=st.b,T=track(),g=A.ctx;cap(`Data ${st.n+1} of 3: drag b to hit both dots`);
 plot(q[0],b,q[2]+1,q[1]*1.6,[[0,q[0]],[q[2],q[1]]]);txt(`y = ${q[0]} · ${b.toFixed(2)}ᵗ   (t in ${q[4]}s)`,A.H*.13,16);
 txt(`t = ${q[2]}: model ${fmt(q[0]*b**q[2])}, data ${fmt(q[1])}`,A.H*.78,13);
 g.fillStyle='#e0e7ff';A.paint.rrect(T.x,T.y,T.w,T.h,12);g.fill();g.strokeStyle=st.bad?BAD:'#64748b';g.lineWidth=st.bad?3:1.4;g.stroke();
 const x=T.x+(b-1)/(q[5]-1)*T.w;g.fillStyle=CURVE;g.beginPath();g.arc(x,T.y+T.h/2,s(15),0,7);g.fill();g.fillStyle=CARD;g.font=ff(10,800);g.textAlign='center';g.textBaseline='middle';g.fillText('b',x,T.y+T.h/2+1)}
function setB(v){const st=Z.fit;if(st.n>=FIT.length)return;const q=FIT[st.n];st.b=mx(1,mn(q[5],rd(v*100)/100));A.redraw()}
function testB(){const st=Z.fit;if(st.n>=FIT.length)return;const q=FIT[st.n],want=q[6],got=q[0]*st.b**q[2],ratio=q[1]/q[0];
 if(ab(st.b-want)<.005){st.n++;st.bad=0;yes();if(st.n<FIT.length)st.b=1.3;return say(`b = ${want}: ${q[0]} × ${want}^${q[2]} = ${fmt(q[1])}. It fits.`)}
 st.bad=1;no();if(ab(st.b-ratio)<.015)return say(`${ratio.toFixed(2)} is the change over ${q[2]} ${q[4]}s. b is for ONE ${q[4]}: b^${q[2]} = ${ratio.toFixed(2)}.`);
 say(`b = ${st.b.toFixed(2)} gives ${fmt(got)} at t = ${q[2]}, not ${fmt(q[1])}: ${got<q[1]?'raise':'lower'} b.`)}
function holes(){const gp=8,w=(A.W-20-gp*2)/3;return SLOT.map((t,j)=>({x:10+j*(w+gp),y:A.H*.38,w,h:s(62),t,j}))}
function chips(){const st=Z.story,q=STORY[st.n],k=st.k,o=q[1][k],gp=8,w=mn(s(170),(A.W-20-gp*2)/3),h=s(54),all=3*w+2*gp,r=(st.n+k+1)%3;return o.map((t,j)=>({t,j,w,h,y:A.H*.7,x:A.W/2-all/2+((j+r)%3)*(w+gp)}))}
function drawStory(){const st=Z.story;base();if(st.n>=STORY.length)return fin(STORY.map(q=>`${q[1][0][0]}·${q[1][1][0]}ᵗ`));
 const q=STORY[st.n];cap(`Story ${st.n+1} of 4: build y = a · bᵗ`);plate({x:10,y:A.H*.13,w:A.W-20,h:s(56)},q[0],{bg:'#fef3c7',fg:'#78350f',n:15});
 holes().forEach(h=>{const done=h.j<st.k;plate(h,done?q[1][h.j][0]:h.j===st.k?'?':'',{bg:done?'#d1fae5':CARD,rim:h.j===st.k?(st.bad!=null?BAD:CURVE):null,n:done&&h.j===2?13:18});
  const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(12,700);g.textAlign='center';g.textBaseline='bottom';g.fillText(h.t,h.x+h.w/2,h.y-3,h.w)});
 txt(`Choose ${SLOT[st.k]}`,A.H*.62,13);chips().forEach(r=>plate(Z.hold&&Z.hold.j===r.j?{...r,x:Z.hold.x-r.w/2,y:Z.hold.y-r.h/2}:r,r.t,{bg:'#ede9fe',fg:'#3730a3',n:16,rim:Z.hold&&Z.hold.j===r.j?CURVE:st.bad===r.j?BAD:null}))}
function fill(j){const st=Z.story;if(st.n>=STORY.length)return;const q=STORY[st.n],k=st.k,t=q[1][k][j];
 if(j){st.bad=j;no();let m;
  if(k===0)m=/^(4|25|3)$/.test(t)?`${t} is the rate. a is the amount at t = 0.`:t==='2018'?'2018 is when t = 0, not an amount.':`${t} comes after the start. a is the amount at t = 0.`;
  else if(k===1)m=/^0\./.test(t)?`× ${t} shrinks it. r% growth is × (1 + r/100) = ${q[1][1][0]}.`:t==='1.4'?'4% is 0.04, so b = 1.04.':t==='1.03'?'Tripling is × 3 a day.':`× ${t} a step is far too big: b = 1 + r/100 = ${q[1][1][0]}.`;
  else m=/the year/.test(t)?'t = 2030 means 2030 years of growth. Count from 2018: t = 12.':`t counts the steps the rate is per: ${q[1][2][0]}.`;
  return say(m)}
 st.bad=null;yes();st.k++;if(st.k>2){st.n++;st.k=0;return say(`y = ${q[1][0][0]} · ${q[1][1][0]}ᵗ, t in ${q[1][2][0]}.`)}say(`${SLOT[k]}: ${t}.`)}
const first=q=>{let t=0;while(q[0]*q[1]**t<q[2])t++;return t};
function drawWhen(){const st=Z.when;base();if(st.n>=WHEN.length)return fin(WHEN.map(q=>`${fmt(q[2])} at t = ${first(q)}`));
 const q=WHEN[st.n],g=A.ctx;cap(`Question ${st.n+1} of 3: first t with y ≥ ${fmt(q[2])}`);txt(`y = ${q[0]} · ${q[1]}ᵗ   (t in ${q[3]}s)`,A.H*.13,16);
 const P=plot(q[0],q[1],14,q[2]*2,null,st.t);g.strokeStyle=A.col.dark?'#fda4af':BAD;g.setLineDash([4,4]);g.lineWidth=2;seg(P.F.x,P.Y(q[2]),P.F.x+P.F.w,P.Y(q[2]));g.setLineDash([]);
 txt(`t = ${st.t}: ${fmt(q[0]*q[1]**st.t)}   target ${fmt(q[2])}`,A.H*.8,14)}
function moveT(t){const st=Z.when;if(st.n>=WHEN.length)return;st.t=mx(0,mn(14,t));A.redraw()}
function testT(){const st=Z.when;if(st.n>=WHEN.length)return;const q=WHEN[st.n],ans=first(q),v=q[0]*q[1]**st.t;
 if(st.t===ans){st.n++;yes();const t=st.t;st.t=0;return say(`t = ${t}: ${fmt(v)}; t = ${t-1} gives only ${fmt(q[0]*q[1]**(t-1))}.`)}
 no();say(v<q[2]?`t = ${st.t} gives ${fmt(v)}: not there yet.`:`t = ${st.t} gives ${fmt(v)}, but it passed ${fmt(q[2])} earlier. Find the FIRST time.`)}
function pens(){const y=A.H*.42,gp=10,w=(A.W-20-gp)/2;return['Reasonable','Model breaks down'].map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,t,j}))}
function drawSane(){const st=Z.sane,g=A.ctx,end=st.n>=SANE.length;base();cap(end?'All 6 judged':`Prediction ${st.n+1} of 6: does it make sense?`,end);
 pens().forEach(b=>{g.fillStyle=b.j?'#ffe4e6':'#dcfce7';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=st.bad===b.j?BAD:b.j?'#9f1239':'#14532d';g.lineWidth=st.bad===b.j?4:2;g.stroke();
  g.fillStyle=INK;g.font=ff(14,800);g.textAlign='center';g.textBaseline='top';g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-6);g.font=ff(11,600);
  SANE.slice(0,st.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0].split(':')[0],b.x+b.w/2,b.y+s(28)+i*s(17),b.w-6))});
 if(!end){const w=mn(A.W-20,s(420)),y=A.H*.13,[l1,l2]=SANE[st.n][0].split(': ');plate({x:A.W/2-w/2,y,w,h:s(70)});txt(l1,y+s(22),14,INK);txt(l2,y+s(48),15,INK)}}
function judge(j){const st=Z.sane;if(st.n>=SANE.length)return;const [t,want]=SANE[st.n];
 if(j!==want){st.bad=j;no();return say(want?'Check the size: real limits (people, food, space) stop growth long before this.':'A short time and a believable size: the model is fine here.')}
 st.n++;st.bad=null;yes();say(`${t.split(':')[0]}: ${want?'model breaks down':'reasonable'}.`)}
function picks(){const st=Z.two,q=TWO[st.n],o=st.k?q[5]:q[4],gp=8,w=mn(s(130),(A.W-20-gp*2)/3),h=s(56),all=3*w+2*gp,r=(st.n+st.k+2)%3;return o.map((t,j)=>({t,j,w,h,y:A.H*.74,x:A.W/2-all/2+((j+r)%3)*(w+gp)}))}
function drawTwo(){const st=Z.two;base();if(st.n>=TWO.length)return fin(TWO.map(q=>`${q[5][0]}·${q[4][0]}ᵗ`));
 const q=TWO[st.n],b=+q[4][0],a=+q[5][0];cap(`Pair ${st.n+1} of 3: find ${st.k?'a':'b'}`);plot(st.k?a:-1e9,b,q[2]+1,q[3]*1.4,[[q[0],q[1]],[q[2],q[3]]]);
 txt(st.k?`b = ${q[4][0]}. a is the value at t = 0:`:`(${q[0]}, ${q[1]}) and (${q[2]}, ${q[3]}): b?`,A.H*.13,14);
 picks().forEach(r=>plate(r,r.t,{bg:'#e0e7ff',fg:'#3730a3',n:18,rim:st.bad===r.j?BAD:null}))}
function solve(j){const st=Z.two;if(st.n>=TWO.length)return;const q=TWO[st.n],k=st.k,d=q[2]-q[0];
 if(j){st.bad=j;no();const tag=(k?q[7]:q[6])[j-1];return say({noroot:`That is the change over ${d} steps. One step: the ${d===2?'square':'cube'} root.`,divide:`Growth multiplies; you can't share it out by dividing. b^${d} = ${fmt(q[3]/q[1])}: take the root.`,late:`${q[1]} is the value at t = ${q[0]}, not 0. Divide by b^${q[0]}.`,twice:`t = ${q[0]} is one step from the start: divide by b once.`,onestep:`That undoes one step; t = ${q[0]} needs ÷ b^${q[0]}.`}[tag])}
 st.bad=null;yes();if(!k){st.k=1;return say(`b = ${q[4][0]}: ${q[4][0]}^${d} = ${fmt(q[3]/q[1])}.`)}st.k=0;st.n++;say(`a = ${q[1]} ÷ ${q[4][0]}^${q[0]} = ${q[5][0]}.`)}
function draw(){const m=part();if(m==='quiz'){base();cap('Challenge',1);txt('y = a · bᵗ: build it, fit it, use it, doubt it',A.H*.5,15);return}({fit:drawFit,story:drawStory,when:drawWhen,sane:drawSane,two:drawTwo})[m]();A.fx.draw(A.ctx)}
function press(p){const m=part();
 if(m==='fit'&&Z.fit.n<FIT.length){const T=track();if(p.y>T.y-s(24)&&p.y<T.y+T.h+s(24)){Z.drag='b';setB(1+(p.x-T.x)/T.w*(FIT[Z.fit.n][5]-1));return true}return false}
 if(m==='story'&&Z.story.n<STORY.length){const r=chips().find(r=>on(p,r));if(r){Z.hold={j:r.j,x:p.x,y:p.y};return true}return false}
 if(m==='when'&&Z.when.n<WHEN.length){const F=frame();if(p.y>F.y&&p.y<F.y+F.h+s(30)){Z.drag='t';moveT(rd((p.x-F.x)/F.w*14));return true}return false}
 if(m==='sane'&&Z.sane.n<SANE.length){const b=pens().find(r=>on(p,r));if(b)judge(b.j);return false}
 if(m==='two'&&Z.two.n<TWO.length){const r=picks().find(r=>on(p,r));if(r)solve(r.j)}return false}
function dragTo(p){const m=part();if(Z.drag==='b'){const T=track();setB(1+(p.x-T.x)/T.w*(FIT[Z.fit.n][5]-1))}else if(Z.drag==='t'){const F=frame();moveT(rd((p.x-F.x)/F.w*14))}else if(Z.hold){Z.hold.x=p.x;Z.hold.y=p.y;A.redraw()}}
function letGo(p){const m=part();if(Z.drag){const d=Z.drag;Z.drag=null;d==='b'?testB():testT();return}const h=Z.hold;if(!h)return;Z.hold=null;
 (p.y<A.H*.58||on(p,chips()[h.j]))?fill(h.j):A.redraw()}
function init0(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{fit:{n:0,b:1.3},story:{n:0,k:0},when:{n:0,t:0},sane:{n:0},two:{n:0,k:0},hold:null,drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctrl();Z.check()}
function open(i,first,ok,msg){init0();say(first);Z.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function run(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function ctrl(){if(!row)return;row.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(m==='fit'&&Z.fit.n<FIT.length){[-.1,-.01,.01,.1].forEach(d=>b((d>0?'+':'−')+ab(d),()=>setB(Z.fit.b+d),`b ${d>0?'up':'down'} by ${ab(d)}, now ${Z.fit.b.toFixed(2)}`));b('Check b',testB,`Check b = ${Z.fit.b.toFixed(2)}`)}
 if(m==='story'&&Z.story.n<STORY.length)chips().sort((x,y)=>x.x-y.x).forEach(r=>b(r.t,()=>fill(r.j),`${SLOT[Z.story.k]}: ${r.t}`));
 if(m==='when'&&Z.when.n<WHEN.length){b('t − 1',()=>moveT(Z.when.t-1),`t down, now ${Z.when.t}`);b('t + 1',()=>moveT(Z.when.t+1),`t up, now ${Z.when.t}`);b('This t',testT,`Answer t = ${Z.when.t}`)}
 if(m==='sane'&&Z.sane.n<SANE.length)['Reasonable','Model breaks down'].forEach((t,j)=>b(t,()=>judge(j),`${SANE[Z.sane.n][0]}: ${t}`));
 if(m==='two'&&Z.two.n<TWO.length)picks().sort((x,y)=>x.x-y.x).forEach(r=>b(r.t,()=>solve(r.j),`${Z.two.k?'a':'b'} = ${r.t}`))}
const steps=[
{h:'Fit the factor to the data',p:'In y = a · bᵗ, a is the start and b the factor for one time step. Drag b until the curve hits both dots.',
predict:{q:'Bacteria go from 200 to 800 in 2 hours. What is the hourly factor b?',opts:['4, because 800 ÷ 200 = 4','2, because 2 × 2 = 4 over two hours'],ans:1},task:'Fit all 3 data sets',
show:()=>run(0,FIT.flatMap(q=>[()=>{Z.fit.b=q[6];A.redraw()},()=>testB()]),450),
go:()=>open(0,'Bacteria: 200, then 800 two hours later. Drag b.',()=>Z.fit.n>=FIT.length,'b is the factor for one step: bⁿ is the change over n steps.')},
{h:'From a story to a model',p:'Pick a (the amount at t = 0), then b (the factor per step), then what t counts.',
predict:{q:'A town has 12,000 people in 2018. For the year 2030, t is…',opts:['2030','12, the years since 2018'],ans:1},task:'Build all 4 models',
show:()=>run(1,STORY.flatMap(()=>[0,1,2].map(()=>()=>fill(0))),330),
go:()=>open(1,'£500 at 4% a year. Choose a.',()=>Z.story.n>=STORY.length,'a at t = 0, b = 1 + r/100 per step, t counts those steps.')},
{h:'Use the model to predict',p:'Drag the green marker to the first whole time step on or above the dashed target.',
predict:{q:'£500 at 4% compound interest. When does it first pass £700?',opts:['after 10 years: 40% ÷ 4%','after 9 years: interest earns interest'],ans:1},task:'Answer all 3 questions',
show:()=>run(2,WHEN.flatMap(q=>[()=>moveT(first(q)),()=>testT()]),500),
go:()=>open(2,'£500 at 4%: drag t to the first year above £700.',()=>Z.when.n>=WHEN.length,'Interest earns interest, so it gets there sooner.')},
{h:'Is the prediction reasonable?',p:'The model multiplies forever; real things run out of people, food or space. Tap Reasonable or Model breaks down.',
predict:{q:'Can virus cases keep rising 25% a week for two years?',opts:['yes, the model says so','no: there are only so many people'],ans:1},task:'Judge all 6 predictions',
show:()=>run(3,SANE.map(x=>()=>judge(x[1])),450),
go:()=>open(3,'Virus cases after 3 weeks: about 78. Judge it.',()=>Z.sane.n>=SANE.length,'Short times only; check sizes against limits.')},
{h:'Two points, neither at t = 0',p:'Divide to get bⁿ, take the root for b, then divide back to t = 0 for a. Tap b, then a.',task:'Find all 3 models',
show:()=>run(4,TWO.flatMap(()=>[()=>solve(0),()=>solve(0)]),550),
go:()=>open(4,'Points (2, 450) and (5, 1518.75). Tap b.',()=>Z.two.n>=TWO.length,'Ratio, root, then divide back to t = 0.')},
{h:'Challenge',p:'',go:()=>{init0();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>Z.check()});
const QS=[
{q:'£2000 at 5% compound interest a year. Value after t years?',a:'2000 · 1.05ᵗ',o:[['2000 · 0.05ᵗ','rate'],['2000 + 1.05t','add']]},
{q:'A population triples in 2 years. What is the yearly factor?',a:'√3 ≈ 1.73',o:[['3','whole'],['1.5','split']]},
{q:'Cases were 100 in 2020 and grow 10% a year. Cases in 2026?',a:'100 · 1.1⁶ ≈ 177',o:[['100 · 1.1²⁰²⁶','year'],['100 + 6 × 10 = 160','add']]},
{q:'A value is 300 at t = 1 and 675 at t = 3. What is a?',a:'200',o:[['300','late'],['450','fwd']]},
{q:'A model predicts 10⁹ rabbits on a small island in 20 years. Comment?',a:'Unreasonable: food and space run out first.',o:[['Fine: the maths is correct.','trust'],['Wrong: exponential models never work.','never']]}];
function clue(t){let m='Check a, b and t.';switch(t){case 'rate':m='0.05 is the rate. Growth multiplies by 1 + 0.05 = 1.05.';break;case 'add':m='Compound growth multiplies; adding gives a line.';break;
 case 'whole':m='That is the change over all the steps. One step is the root.';break;case 'split':m='Growth multiplies: 1.5 × 1.5 = 2.25, not 3. Take the square root.';break;
 case 'year':m='t is years since the start: 2026 − 2020 = 6, not 2026.';break;case 'late':m='300 is the value at t = 1. b = √(675/300) = 1.5, so a = 300 ÷ 1.5 = 200.';break;
 case 'fwd':m='You multiplied by b. To go back to t = 0, divide by b.';break;case 'trust':m='Right arithmetic is not enough: check real limits.';break;case 'never':m='They work well for a while, then limits take over.'}return m}
function quiz(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();const m=ok?'':clue(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{box.hidden=B.step!==5;row.hidden=B.step===5;ctrl()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Model controls'},w);box=c.el('div',{class:'fl-chal'},A.below);init0();A.gest({down:press,move:dragTo,up:letGo});ctrl()}}).start()})})();
