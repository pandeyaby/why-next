/* Flagship: preventing erosion (ages 7–8). Sort water from wind erosion, rain on four model hills (bare, grass, a wall,
   terraces) with the same rain each time, drag a hedge until it shelters a field from the wind, choose fixes for four
   real problems, judge three children, then a challenge. Data, hill drawing and screen-reader text are in erode_art.js. */
(()=>{
const {AGENT,COVER,FIX,KIDS,QZ,WHY,H,hill}=ERART;
const K={ink:'#111827',mid:'#374151',sheet:'#fefce8',rim:'#1f2937',win:'#166534',winBg:'#dcfce7',err:'#9f1239',hint:'#e0f2fe',sky:'#dbeafe',field:'#fde68a',crop:'#15803d'};
VIS.reg('flagerode',c=>{let A,X,bar,chal,round=-1,tok=0;const T={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.12));
const voice=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
function txt(s,x,y,n,col,wt,al){X.font=`${wt||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function split(s,w,n){X.font=`700 ${u(n)}px system-ui,sans-serif`;const rows=[];let row='';String(s).split(' ').forEach(wd=>{const t2=row?row+' '+wd:wd;if(row&&X.measureText(t2).width>w){rows.push(row);row=wd}else row=t2});rows.push(row);return rows}
function slab(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,10);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const part=()=>['agent','tray','wind','fix','kids','quiz'][A.step];
function head(s,ok){const R=split(s,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),R.length*lh+14);slab(12,10,A.W-24,h,ok?K.winBg:K.hint,ok?K.win:K.rim);R.forEach((r,i)=>txt(r,A.W/2,10+h/2+(i-(R.length-1)/2)*lh,14,ok?K.win:K.ink));return 10+h}
function note(){if(!T.msg)return;const R=split((T.bad?'✗ ':'✓ ')+T.msg,A.W-48,13),lh=u(13)+5,h=R.length*lh+12,y=A.H-h-10;slab(12,y,A.W-24,h,'#ffffff',T.bad?K.err:K.win,3);R.forEach((r,i)=>txt(r,A.W/2,y+6+lh*(i+.5),13,T.bad?K.err:K.ink))}
const wrong=m=>{T.bad=true;T.msg=m;A.sound.miss();sync()};
const right=m=>{T.bad=false;T.msg=m;A.sound.pop()};
/* water or wind */
function drawAgent(t0,b0){const cw=Math.min(u(260),A.W*.8),ch=u(60),d=T.drag;T.card={x:A.W/2-cw/2,y:t0+u(8),w:cw,h:ch};const bw=(A.W-u(36))/2,bh=Math.min(u(160),b0-t0-ch-u(36)),by=b0-bh;
 T.bins=['Water carries it','Wind carries it'].map((n,i)=>{const r={x:u(12)+i*(bw+u(12)),y:by,w:bw,h:bh,i};slab(r.x,by,bw,bh,i?'#fef3c7':'#dbeafe',K.rim,2);txt(i?'💨':'💧',r.x+bw/2,by+u(20),18);txt(n,r.x+bw/2,by+u(44),13,K.ink,900);
  AGENT.slice(0,T.k).filter(a=>a[1]===i).forEach((a,j)=>split(a[0],bw-u(14),10).forEach((ln,m,F)=>txt(ln,r.x+bw/2,by+u(70)+j*u(28)+(m-(F.length-1)/2)*u(12),10,K.win,800)));return r});
 if(T.k>=AGENT.length)return;const x=d?d.x-cw/2:T.card.x,y=d?d.y-ch/2:T.card.y;slab(x,y,cw,ch,'#ffffff',d?'#1d4ed8':K.rim,d?3.5:2.5);const F=split(AGENT[T.k][0],cw-u(20),15);F.forEach((ln,j)=>txt(ln,x+cw/2,y+ch/2+(j-(F.length-1)/2)*u(18),15,K.ink,900))}
function bin(b){if(T.won)return;const a=AGENT[T.k];if(b!==a[1])return wrong(a[2]);T.k++;A.sound.tick();right(`${a[0]}: ${b?'wind':'water'}.`);if(T.k>=AGENT.length){T.won=true;T.msg='Running water, waves and wind all carry soil and sand away. That is erosion.'}sync()}
/* the rain tray */
function drawTray(t0,b0){const n=COVER.length,gw=(A.W-u(24))/n,gh=u(50);T.tiles=COVER.map((cv,i)=>{const r={x:u(12)+i*gw+u(2),y:t0+u(4),w:gw-u(4),h:gh,i},sel=T.pick===i,done=T.res[i]!=null;
  slab(r.x,r.y,r.w,r.h,sel?'#fef9c3':done?K.winBg:'#ffffff',sel?'#1d4ed8':done?K.win:K.rim,sel?3:2);split(cv[0],r.w-u(8),11).forEach((ln,j,F)=>txt(ln,r.x+r.w/2,r.y+u(done?16:25)+(j-(F.length-1)/2)*u(13),11,K.ink,800));if(done)txt(T.res[i]+' g',r.x+r.w/2,r.y+r.h-u(10),12,K.win,900);return r});
 const top=t0+gh+u(70),bot=b0-u(18),x0=u(16),x1=A.W*.72;T.hillX=[x0,x1];X.fillStyle=K.sky;X.fillRect(u(12),t0+gh+u(10),A.W-u(24),bot-t0-gh-u(10));hill(X,x0,x1,top,bot,T.pick,0);
 const cx=A.W*.86,cup={x:cx-u(32),y:bot-u(64),w:u(64),h:u(64)},got=(T.res[T.pick]!=null?COVER[T.pick][1]:COVER[T.pick][1]*T.rain);X.fillStyle='#ffffff';X.fillRect(cup.x,cup.y,cup.w,cup.h);X.fillStyle='#92400e';const lv=cup.h*got/90;X.fillRect(cup.x,cup.y+cup.h-lv,cup.w,lv);
 X.strokeStyle=K.rim;X.lineWidth=2;X.strokeRect(cup.x,cup.y,cup.w,cup.h);txt('catch tray',cx,cup.y-u(22),11,K.ink,900);txt(Math.round(got)+' g',cx,cup.y-u(8),12,K.ink,900);
 const cy=t0+gh+u(40);T.cloud={x:T.cx-u(46),y:cy-u(26),w:u(92),h:u(52)};X.fillStyle='#ffffff';X.strokeStyle='#64748b';X.lineWidth=2;[[-24,4,18],[0,-6,24],[24,4,18]].forEach(([dx,dy,r])=>{X.beginPath();X.arc(T.cx+u(dx),cy+u(dy),u(r),0,7);X.fill();X.stroke()});
 if(T.raining){X.strokeStyle='#2563eb';X.lineWidth=2;for(let k=0;k<7;k++){const rx=T.cx-u(30)+k*u(10);X.beginPath();X.moveTo(rx,cy+u(26)+(k%2)*u(6));X.lineTo(rx-u(3),cy+u(40)+(k%2)*u(6));X.stroke()}}
 txt('same rain each time',A.W-u(18),t0+gh+u(22),11,K.mid,800,'right');txt(`rain ${Math.round(T.rain*100)}%`,A.W-u(18),t0+gh+u(38),12,K.ink,900,'right');if(T.res[T.pick]==null&&!T.won)txt('drag me',T.cx,cy+u(2),10,K.ink,900)}
function choose(i){if(T.won)return;T.pick=i;T.rain=T.res[i]!=null?1:0;T.raining=false;A.sound.tick();T.msg=T.res[i]!=null?`${COVER[i][0]} already tested: ${T.res[i]} g.`:'';T.bad=false;sync()}
function pour(d){if(T.won||T.res[T.pick]!=null)return;T.rain=Math.min(1,T.rain+d);T.raining=T.rain<1;if(T.rain>=1){const cv=COVER[T.pick];T.res[T.pick]=cv[1];A.sound.tick();right(`${cv[0]}: ${cv[1]} g washed off. ${cv[2]}`);
  if(T.res.filter(x=>x!=null).length===COVER.length){T.won=true;T.msg='Most soil lost: bare (80 g). Least: grass (10 g). Steps and a wall helped too.'}sync()}else A.redraw()}
/* the windbreak */
const REACH=.46;
function drawWind(t0,b0){const gy=b0-u(40),hh=Math.max(u(64),Math.min(u(120),(gy-t0)*.4)),fx=f=>u(12)+(A.W-u(24))*f;X.fillStyle=K.sky;X.fillRect(u(12),t0+u(4),A.W-u(24),gy-t0-u(4));X.fillStyle='#a16207';X.fillRect(u(12),gy,A.W-u(24),u(26));
 X.fillStyle=K.field;X.fillRect(fx(T.f0),gy-u(6),fx(T.f1)-fx(T.f0),u(8));for(let k=0;k<9;k++){const x=fx(T.f0+(T.f1-T.f0)*(k+.5)/9);X.strokeStyle=K.crop;X.lineWidth=2;X.beginPath();X.moveTo(x,gy-u(6));X.lineTo(x,gy-u(24));X.stroke();X.fillStyle=K.crop;X.beginPath();X.ellipse(x,gy-u(26),u(4),u(7),0,0,7);X.fill()}
 txt('field',fx((T.f0+T.f1)/2),gy+u(13),12,'#ffffff',900);const s0=Math.max(T.f0,T.hx),s1=Math.min(T.f1,T.hx+REACH);if(s1>s0){X.fillStyle='rgba(22,101,52,.16)';const ch=Math.min(gy-t0-u(40),hh*1.5);X.fillRect(fx(T.hx),gy-ch,fx(Math.min(.99,T.hx+REACH))-fx(T.hx),ch);txt('calm air',Math.min(fx(T.hx+REACH/2),A.W-u(40)),gy-ch+u(12),11,K.win,900)}
 for(let k=0;k<4;k++){const y=gy-u(40)-k*u(34);txt('wind →',fx(.08),y,12,K.mid,900)}
 X.fillStyle='rgba(146,64,14,.75)';for(let k=0;k<40;k++){const f=T.f0+(T.f1-T.f0)*((k*37)%100)/100;if(f>=s0&&f<=s1&&s1>s0)continue;X.beginPath();X.arc(fx(f)+u(6),gy-u(30)-((k*53)%60)*u(1),u(2.2),0,7);X.fill()}
 const hx=fx(T.hx);X.fillStyle='#14532d';X.fillRect(hx-u(5),gy-hh*.35,u(10),hh*.35);X.fillStyle='#16a34a';X.beginPath();X.ellipse(hx,gy-hh*.62,u(22),hh*.4,0,0,7);X.fill();X.strokeStyle=K.rim;X.lineWidth=1.5;X.stroke();
 T.hedge={x:hx-u(34),y:gy-hh-u(14),w:u(68),h:hh+u(30)};txt('hedge',hx,gy-hh-u(8),11,K.ink,900);txt(`${T.cover}% of the field sheltered`,A.W/2,t0+u(16),12,K.ink,900)}
function measure(){const s0=Math.max(T.f0,T.hx),s1=Math.min(T.f1,T.hx+REACH);T.cover=Math.max(0,Math.round(100*(s1-s0)/(T.f1-T.f0)))}
function slide(f){if(T.won)return;T.hx=Math.max(.05,Math.min(.95,f));measure();A.redraw()}
function settle(){if(T.won)return;measure();if(T.cover>=99){T.won=true;A.sound.tick();T.msg='The hedge meets the wind first and calms the air behind it, about 10 times its height.';return sync()}
 if(T.hx>T.f1-.02)return wrong('The hedge is past the field. The wind hits the field before it reaches the hedge.');if(T.hx>T.f0)return wrong(`Only ${T.cover}% sheltered. The soil before the hedge still blows away. Move it to the windy side.`);
 wrong(`Too far away. Calm air only reaches about 10 times the hedge's height, so ${100-T.cover}% of the field still blows.`)}
/* pick a fix, and who is right */
function drawChoice(t0,b0,set,kid){const [stem,opts]=set,F=split(stem,A.W-u(30),15);F.forEach((s,j)=>txt(s,A.W/2,t0+u(16)+j*u(19),15,K.ink,900));const y0=t0+u(10)+F.length*u(19),h=Math.min(u(70),(b0-y0)/3-u(6));
 T.opts=opts.map((o,i)=>{const r={x:u(16),y:y0+i*(h+u(6)),w:A.W-u(32),h,i};slab(r.x,r.y,r.w,h,'#ffffff',K.rim,2);if(kid){X.fillStyle=['#bae6fd','#fde68a','#d9f99d'][i];X.beginPath();X.arc(r.x+u(26),r.y+h/2,u(15),0,7);X.fill();txt(o[0],r.x+u(26),r.y+h/2,11,K.ink,800)}
  const L=split(kid?o[1]:o[0],r.w-u(kid?70:30),14);L.forEach((ln,j)=>txt(ln,kid?r.x+u(52):A.W/2,r.y+h/2+(j-(L.length-1)/2)*u(18),14,K.ink,700,kid?'left':'center'));return r})}
function answer(i){if(T.won)return;const kid=part()==='kids',set=(kid?KIDS:FIX)[T.k],o=set[1][i],why=kid?o[2]:o[1];if(why)return wrong(kid?`${o[0]} is not right. ${why}`:why);
 right(kid?`${o[0]} is right.`:o[0]+'.');T.k++;if(T.k>=(kid?3:4)){T.won=true;T.msg=kid?'Wind and water carry land away; plants, steps and windbreaks slow them.':'Hold the soil with plants, slow the water with steps, and block the wind where it comes from.'}sync()}
function draw(){X.fillStyle=A.col.dark?'#1f2937':K.sheet;X.fillRect(0,0,A.W,A.H);X.fillStyle=K.sheet;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const g=part(),y=head(T.won?H[g][1]:H[g][0],T.won),b=A.H-(T.msg?u(70):u(12));
 if(g==='agent')drawAgent(y,b);if(g==='tray')drawTray(y,b);if(g==='wind')drawWind(y,b);if(g==='fix')drawChoice(y+u(4),b,FIX[Math.min(T.k,3)]);if(g==='kids')drawChoice(y+u(4),b,KIDS[Math.min(T.k,2)],1);
 if(g==='quiz')hill(X,u(20),A.W-u(20),y+u(50),Math.min(b,y+u(200)),1,0);note();A.fx.draw(X)}
function down(p){const g=part();if(T.won&&g!=='quiz')return false;
 if(g==='agent'){if(inside(p,T.card)){T.drag={x:p.x,y:p.y};A.redraw();return true}const r=(T.bins||[]).find(z=>inside(p,z));if(r){bin(r.i);return true}}
 if(g==='tray'){const r=(T.tiles||[]).find(z=>inside(p,z));if(r){choose(r.i);return true}if(inside(p,T.cloud)){T.drag={rain:1,x:p.x};return true}}
 if(g==='wind'&&inside(p,T.hedge)){T.drag={hedge:1};return true}
 if(g==='fix'||g==='kids'){const r=(T.opts||[]).find(z=>inside(p,z));if(r){answer(r.i);return true}}
 return false}
function move(p){const d=T.drag;if(!d)return;if(d.rain){const nx=Math.max(u(50),Math.min(T.hillX[1]+u(10),p.x)),over=nx>T.hillX[0]&&nx<T.hillX[1];if(over)pour(Math.abs(nx-T.cx)/((T.hillX[1]-T.hillX[0])*1.6));T.cx=nx;T.raining=over&&T.rain<1;return A.redraw()}
 if(d.hedge)return slide((p.x-u(12))/(A.W-u(24)));d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=T.drag;T.drag=null;if(!d)return;if(d.rain){T.raining=false;return sync()}if(d.hedge)return settle();const r=(T.bins||[]).find(z=>inside(p,z));if(r)return bin(r.i);sync()}
function sync(){voice((T.msg?T.msg+' ':'')+ERART.say(part(),T));keys();T.after()}
function keys(){if(!bar)return;bar.innerHTML='';const g=part(),b=(s,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},bar,s).onclick=()=>{fn();sync()}};
 if(!T.won){if(g==='agent')['Water','Wind'].forEach((n,i)=>b(n,()=>bin(i)));
  if(g==='tray'){COVER.forEach((cv,i)=>{if(T.res[i]==null&&T.pick!==i)b('Try: '+cv[0],()=>choose(i))});if(T.res[T.pick]==null)b('Make it rain',()=>pour(.5))}
  if(g==='wind'){b('◀ Hedge left',()=>{slide(T.hx-.05);settle()});b('Hedge right ▶',()=>{slide(T.hx+.05);settle()})}
  if(g==='fix')FIX[T.k][1].forEach((o,i)=>b(o[0],()=>answer(i)));
  if(g==='kids')KIDS[T.k][1].forEach((o,i)=>b(o[0]+' is right',()=>answer(i)))}
 A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){tok++;Object.assign(T,{after:()=>{},won:false,msg:'',bad:false,drag:null,k:0,pick:0,rain:0,raining:false,res:[null,null,null,null],cx:A.W*.2,f0:.5,f1:.92,hx:.8,cover:0,reach:REACH});measure()}
const steps=[
{h:'What carries land away?',p:'Erosion is when soil, sand or rock is carried away. Water and wind do most of the carrying.',
predict:{q:'Rain falls hard on a bare hill. Where does the soil go?',opts:['It stays where it is','It washes downhill','It sinks deeper'],ans:1},
task:'Sort all 5 cards',show:()=>{steps[0].go();seq(AGENT.map(a=>()=>bin(a[1])),380)},go:()=>{fresh();sync();T.after=check(0,()=>T.won,'Water and wind carry land away.')}},
{h:'Test four hills',p:'Scientists test fixes fairly: the same hill, the same rain, and only one thing changed. Here only the cover changes.',
predict:{q:'Which hill will lose the least soil?',opts:['Bare soil','Grass','They all lose the same'],ans:1},
task:'Rain on all 4 hills',show:()=>{steps[1].go();seq([0,1,2,3].flatMap(i=>[()=>choose(i),()=>pour(.5),()=>pour(.5)]),260)},go:()=>{fresh();sync();T.after=check(1,()=>T.won,'Grass 10 g, steps 20 g, wall 30 g, bare 80 g.')}},
{h:'Stop the wind',p:'A hedge or a row of trees is a windbreak. The air behind it is calm for about 10 times its height.',
predict:{q:'Where should the hedge go to shelter the field?',opts:['On the side the wind comes from','On the side the wind blows to','In the middle of the field'],ans:0},
task:'Shelter the whole field',show:()=>{steps[2].go();seq([()=>{slide(.47);settle()}],400)},go:()=>{fresh();sync();T.after=check(2,()=>T.won,'Windbreak on the windy side.')}},
{h:'Pick the fix',p:'Different places need different fixes. Choose the one that stops the soil or sand where it starts to move.',
task:'Fix all 4 problems',show:()=>{steps[3].go();seq(FIX.map(()=>()=>answer(FIX[T.k][1].findIndex(o=>!o[1]))),420)},go:()=>{fresh();sync();T.after=check(3,()=>T.won,'Four problems, four fixes.')}},
{h:'Check the facts',p:'Three children talk about erosion. Only one is right each time.',
task:'Find who is right 3 times',show:()=>{steps[4].go();seq(KIDS.map(()=>()=>answer(KIDS[T.k][1].findIndex(o=>!o[2]))),420)},go:()=>{fresh();sync();T.after=check(4,()=>T.won,'Facts checked.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.after()});
let run2=0;
function quiz(){round++;const [qq,ok,bad]=QZ[round%QZ.length],all=[[ok,'ok']].concat(bad),r=round%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},g,w).onclick=()=>score(tag,ok)});voice('Challenge: '+qq);A.redraw()}
function score(tag,ok){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),win=tag==='ok';let m=WHY[tag]||'Hold the soil, slow the water, block the wind.';
 if(tag==='bare')m='Bare soil loses the most: no leaves soften the rain and no roots hold the soil.';
 if(tag==='fair')m='Not fair. Change only one thing, the cover, and give every hill the same rain.';
 if(tag==='side')m='The windbreak goes on the side the wind comes from, so the wind is slowed before it reaches the field.';
 if(win){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=`${win?'✓ Yes: '+ok+'. In a row: '+run2+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;bar.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Erosion lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
