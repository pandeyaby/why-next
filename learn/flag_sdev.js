/* Flagship: standard deviation (ages 15–17; CCSS HSS-ID.A.2, AQA GCSE Statistics 8382, A-level Statistics). Balance the
   mean so signed distances cancel, square each distance, add → divide by n → square root in the right order, drag one
   value out to see an outlier swell the SD, then add 10 and double every value. Every drag or tap has a button twin. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',rule:'#334155',paper:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',tip:'#eef2ff',
 fill:'#1d4ed8',soft:'#dbeafe',gold:'#b45309',goldSoft:'#fde68a',tag:'#7c2d12',neg:'#be123c',band:'#fef3c7'};
const {mean,sd,r2,D0,D3}=SDART;
VIS.reg('flagsdev',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const fz=n=>Math.round(n*(A.narrow?1:1.12));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${fz(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-16)};
function lines(s,maxW,n){X.font=`700 ${fz(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function panel(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?8:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function head(s,won){const L=lines(s,A.W-40,13),lh=fz(13)+4,h=Math.max(fz(40),L.length*lh+14);panel(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.rule);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function foot(){if(!G.msg)return;const L=lines((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,13),lh=fz(13)+5,h=L.length*lh+10,y=A.H-h-8;
 panel(10,y,A.W-20,h,K.paper,G.bad?K.no:K.ok,3);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),13,G.bad?K.no:K.ink))}
function chips(y,list,h){const n=list.length,w=(A.W-28-8*(n-1))/n;return list.map(([l,k],i)=>{const x=14+i*(w+8);panel(x,y,w,h,K.paper,K.gold,2);say(l,x+w/2,y+h/2,12,K.tag);return{x,y,w,h,k}})}
const announce=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{G.bad=true;G.msg=s;A.sound.miss();refresh()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();refresh()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const X0=()=>22,XW=()=>A.W-44,toV=(x,lo,hi)=>lo+(x-X0())/XW()*(hi-lo),toX=(v,lo,hi)=>X0()+XW()*(v-lo)/(hi-lo);
const fmt=v=>(v<0?'−':'+')+Math.abs(v);
/* ---- step 0: balance at the mean ---- */
const signed=m=>D0.reduce((s,v)=>s+v-m,0);
function setM(m){if(G.won)return;G.m=Math.max(0,Math.min(10,Math.round(m*2)/2));const t=signed(G.m);
 if(t===0){G.won=true;return yes('At 5 the distances cancel: −3 −1 −1 −1 + 0 + 0 + 2 + 4 = 0. At the mean they always add to 0, so they cannot measure spread.')}
 G.bad=false;G.msg=`Balance at ${G.m}: signed distances add to ${r2(t)}. ${t>0?'More pull to the right.':'More pull to the left.'}`;refresh()}
function drawMean(){const top=head(G.won?'The mean is the balance point: the + and − distances from it add to 0.':'Drag the ▲ (or use the buttons) to the balance point of these 8 scores.',G.won);
 const ay=top+fz(104);SDART.axis(X,X0(),XW(),0,10,ay,1,fz);SDART.dots(X,D0,X0(),XW(),0,10,ay-4,fz(7),K.fill);
 const mx=toX(G.m,0,10);X.fillStyle=K.gold;X.beginPath();X.moveTo(mx,ay+fz(20));X.lineTo(mx-fz(10),ay+fz(36));X.lineTo(mx+fz(10),ay+fz(36));X.closePath();X.fill();say(`m = ${G.m}`,mx,ay+fz(46),12,K.tag);
 D0.forEach((v,k)=>{const y=ay+fz(64)+k*fz(14),x=toX(v,0,10),d=v-G.m,col=d<0?K.neg:K.fill;X.strokeStyle=col;X.lineWidth=2.5;X.beginPath();X.moveTo(mx,y);X.lineTo(x,y);X.stroke();if(d){X.beginPath();X.arc(x,y,3,0,7);X.fillStyle=col;X.fill()}
  say(d?fmt(d):'0',d<0?Math.min(mx,x)-6:Math.max(mx,x)+6,y,10,col,d<0?'right':'left')});
 say(`signed distances add to ${r2(signed(G.m))}`,A.W/2,ay+fz(64)+8*fz(14)+fz(10),14,G.won?K.ok:K.ink);G.lineHit={x:0,y:top,w:A.W,h:fz(160)}}
/* ---- step 1: square each distance ---- */
function sq(k){if(G.won||G.sq[k])return;G.sq[k]=true;A.sound.tick();const d=D0[k]-5;
 if(G.sq.every(Boolean)){G.won=true;return yes('9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32. Squares are never negative, so nothing cancels.')}
 G.bad=false;G.msg=`(${D0[k]} − 5)² = ${fmt(d).replace('+','')}² = ${d*d}.${d<0?' A minus squared is positive.':''}`;refresh()}
function drawSq(){const top=head(G.won?'Squaring turns every distance positive: the far scores now count much more.':'Tap each score to square its distance from the mean, 5.',G.won);
 const rh=fz(30),u=fz(6);G.sqHit=D0.map((v,k)=>{const y=top+fz(6)+k*rh,d=v-5,on=G.sq[k];panel(14,y+1,A.W-28,rh-3,on?K.soft:K.paper,on?K.fill:K.rule,1.5,6);
  say(`${v} − 5 = ${d<0?'−'+(-d):d}`,24,y+rh/2,13,d<0?K.neg:K.ink,'left');
  if(on){const s=Math.abs(d)*u;X.fillStyle=K.gold;X.fillRect(A.W*.6-s/2,y+rh/2-s/2,s,s);say(`${d*d}`,A.W-26,y+rh/2,14,K.fill,'right')}else say('tap to square',A.W-26,y+rh/2,11,K.dim,'right');
  return{x:14,y,w:A.W-28,h:rh,k}});
 const tot=D0.reduce((s,v,k)=>s+(G.sq[k]?(v-5)**2:0),0);say(`total of squares so far: ${tot}`,A.W/2,top+fz(6)+8*rh+fz(14),14,G.won?K.ok:K.ink)}
/* ---- step 2: add, divide, root ---- */
function op(k){if(G.won)return;const s=G.st;
 if(k==='add'){if(s>0)return oops('Already added: the total is 32.');G.st=1;A.sound.tick();G.bad=false;G.msg='Total of squares = 32. Now share it over the 8 scores.';return refresh()}
 if(k==='div'){if(s===0)return oops('Add the squares first: one total, then share it over the 8 scores.');if(s>1)return oops('Already divided: 32 ÷ 8 = 4.');G.st=2;A.sound.tick();G.bad=false;G.msg='32 ÷ 8 = 4. This is the variance, in marks squared.';return refresh()}
 if(k==='root'){if(s===0)return oops('Rooting each square just gives back the distances, and they cancel. Add the squares first.');
  if(s===1)return oops('√32 = 5.66 is too big: a total grows with more data. Divide by n = 8 first, then take the root.');G.st=3;G.won=true;return yes('√4 = 2. The standard deviation is 2 marks: a typical distance from the mean.')}
 if(s<2)return oops('Not finished: the SD comes from the total of squares, divided by n, then square rooted.');
 oops('4 is the variance, in marks squared. Take the square root to get back to marks: √4 = 2.')}
function drawOrder(){const top=head(G.won?'SD = √( total of squared distances ÷ n ). Root last, so the units are marks again.':'Turn the squares 9, 1, 1, 1, 0, 0, 4, 16 into the SD. Tap the steps in order.',G.won);
 const rows=[['squares','9 1 1 1 0 0 4 16',true],['add them','total 32',G.st>=1],['÷ n','32 ÷ 8 = 4 (variance)',G.st>=2],['√','√4 = 2 (SD)',G.st>=3]],rh=fz(44);
 rows.forEach(([l,v,on],i)=>{const y=top+fz(8)+i*(rh+6);panel(14,y,A.W-28,rh,on?K.okBg:'#f1f5f9',on?K.ok:K.rule,1.5);say(l,26,y+rh/2,13,K.ink,'left');say(on?v:'?',A.W-26,y+rh/2,14,on?K.ok:K.dim,'right')});
 G.opHit=chips(top+fz(8)+4*(rh+6)+fz(6),[['Add','add'],['÷ n','div'],['√','root'],['Stop','stop']],fz(40))}
/* ---- step 3: one value moves out ---- */
const D3now=()=>D3.slice(0,4).concat([G.v]);
function setV(v){if(G.won)return;G.v=Math.max(7,Math.min(16,Math.round(v)));const s=sd(D3now());
 if(s>4){G.won=true;return yes(`With ${G.v}, the SD is ${r2(s)}, about 3 times the 1.41 it started at. One far value is squared, so it dominates.`)}
 G.bad=false;G.msg=`Last value ${G.v}: mean ${r2(mean(D3now()))}, SD ${r2(s)}.`;refresh()}
function band(a,lo,hi,ay){const m=mean(a),s=sd(a),x1=toX(Math.max(lo,m-s),lo,hi),x2=toX(Math.min(hi,m+s),lo,hi);X.fillStyle=K.band;X.fillRect(x1,ay-fz(70),x2-x1,fz(70));
 X.strokeStyle=K.gold;X.lineWidth=2;X.beginPath();X.moveTo(toX(m,lo,hi),ay-fz(74));X.lineTo(toX(m,lo,hi),ay);X.stroke();say(`mean ${r2(m)} · SD ${r2(s)}`,A.W/2,ay+fz(40),15,K.fill);say('shaded: mean ± 1 SD',A.W/2,ay+fz(60),11,K.dim)}
function drawOut(){const top=head(G.won?'Squaring makes far values count heavily, so one outlier can swell the SD.':'Drag the last score to the right until the SD is more than 4.',G.won);
 const ay=top+fz(150),a=D3now();band(a,0,16,ay);SDART.axis(X,X0(),XW(),0,16,ay,2,fz);SDART.dots(X,a.slice(0,4),X0(),XW(),0,16,ay-4,fz(8),K.fill);SDART.dots(X,[G.v],X0(),XW(),0,16,ay-4,fz(10),K.neg);
 G.lineHit={x:0,y:top,w:A.W,h:fz(170)}}
/* ---- step 4: shift and stretch ---- */
function tf(k){if(G.won)return;if(G.ops.includes(k))return oops(k==='add'?'10 is already added. Now double every score.':'Already doubled. Now add 10 to every score.');
 const s0=sd(G.arr);G.arr=G.arr.map(v=>k==='add'?v+10:v*2);G.ops.push(k);A.sound.tick();const s1=sd(G.arr);
 const t=k==='add'?`+10 moves every score, and the mean, by 10. The distances do not change: SD stays ${r2(s1)}.`:`×2 doubles every distance from the mean: SD ${r2(s0)} → ${r2(s1)}.`;
 if(G.ops.length===2){G.won=true;return yes(t)}yes(t)}
function drawShift(){const top=head(G.won?'Adding a number to every value leaves the SD alone. Multiplying every value by k multiplies the SD by k.':'Add 10 to every score, then double every score. Watch the SD.',G.won);
 const ay=top+fz(130);band(G.arr,0,40,ay);SDART.axis(X,X0(),XW(),0,40,ay,5,fz);SDART.dots(X,G.arr,X0(),XW(),0,40,ay-4,fz(3.5),K.fill);
 G.tfHit=chips(ay+fz(76),[['+10 to all','add'],['×2 all','dbl']],fz(40))}
/* ---- input, drawing, controls ---- */
const mode=()=>['mean','sq','order','out','shift','quiz'][A.step];
function down(p){const m=mode(),hit=a=>(a||[]).find(r=>inside(p,r));let r;
 if(m==='mean'&&inside(p,G.lineHit)){setM(toV(p.x,0,10));G.drag=1;return true}
 if(m==='sq'&&(r=hit(G.sqHit))){sq(r.k);return true}
 if(m==='order'&&(r=hit(G.opHit))){op(r.k);return true}
 if(m==='out'&&inside(p,G.lineHit)){setV(toV(p.x,0,16));G.drag=1;return true}
 if(m==='shift'&&(r=hit(G.tfHit))){tf(r.k);return true}
 return false}
function move(p){const m=mode();if(!G.drag)return;if(m==='mean')setM(toV(p.x,0,10));if(m==='out')setV(toV(p.x,0,16))}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();if(m==='mean')drawMean();if(m==='sq')drawSq();if(m==='order')drawOrder();if(m==='out')drawOut();if(m==='shift')drawShift();
 if(m==='quiz'){head('Standard deviation is a typical distance from the mean.');const y=A.H*.45;['square the distances','add, ÷ n, then √','+k: same SD · ×k: SD × k'].forEach((r,i)=>say(r,A.W/2,y+i*fz(30),16,K.fill))}
 foot();A.fx.draw(X)}
function refresh(){const m=mode();let d='Challenge.';
 if(m==='mean')d=`Scores ${D0.join(', ')}. Balance point at ${G.m}; signed distances add to ${r2(signed(G.m))}.`;
 if(m==='sq')d=`Squared: ${D0.map((v,k)=>G.sq[k]?`${v} gives ${(v-5)**2}`:null).filter(Boolean).join('; ')||'none yet'}.`;
 if(m==='order')d=['Squares ready.','Total 32.','Variance 4.','SD 2.'][G.st];
 if(m==='out')d=`Scores 3, 4, 5, 6, ${G.v}. Mean ${r2(mean(D3now()))}, SD ${r2(sd(D3now()))}.`;
 if(m==='shift')d=`Scores ${G.arr.join(', ')}. Mean ${r2(mean(G.arr))}, SD ${r2(sd(G.arr))}.`;
 announce((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=fn};
 if(m==='mean'&&!G.won){b('◀ 0.5',()=>setM(G.m-.5),'Move the balance point left 0.5');b('0.5 ▶',()=>setM(G.m+.5),'Move the balance point right 0.5')}
 if(m==='sq'&&!G.won)D0.forEach((v,k)=>{if(!G.sq[k])b(`Square ${v} − 5`,()=>sq(k),`Square the distance of score ${k+1}, ${v}, from 5`)});
 if(m==='order'&&!G.won)[['Add the squares','add'],['Divide by n','div'],['Square root','root'],['Stop here','stop']].forEach(([l,k])=>b(l,()=>op(k)));
 if(m==='out'&&!G.won){b('Last score −1',()=>setV(G.v-1));b('Last score +1',()=>setV(G.v+1))}
 if(m==='shift'&&!G.won){b('Add 10 to all',()=>tf('add'));b('Double all',()=>tf('dbl'))}
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const replay=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok)f()},(j+1)*(A.reduced()?30:ms)))};
function fresh(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,m:2,sq:D0.map(()=>false),st:0,v:7,arr:D0.slice(),ops:[],drag:0})}
const steps=[
{h:'Distances from the mean',p:'Spread is about how far scores sit from the mean. Each score has a signed distance: + to the right, − to the left.',
predict:{q:'Add up every signed distance from the mean. What do you get?',opts:['0','7, the range','5, the mean'],ans:0},
task:'Move the balance point to the mean',show:()=>{steps[0].go();replay([5,4,3,2,1,0].map(i=>()=>setM(5-i*.5)),450)},go:()=>{fresh();refresh();G.after=settle(0,()=>G.won,'Mean 5, total 0.')}},
{h:'Square the distances',p:'Squaring makes every distance positive, so nothing cancels. Far scores count much more.',
predict:{q:'Why square the distances?',opts:['So + and − cannot cancel','To make the numbers bigger','Because the mean is squared'],ans:0},
task:'Square all eight distances',show:()=>{steps[1].go();replay(D0.map((v,k)=>()=>sq(k)),400)},go:()=>{fresh();refresh();G.after=settle(1,()=>G.won,'Total 32.')}},
{h:'Add, divide, root',p:'Add the squares, divide by the number of scores n, then take the square root. That is the standard deviation (SD).',
task:'Turn the squares into the SD',show:()=>{steps[2].go();replay([()=>op('add'),()=>op('div'),()=>op('root')],800)},go:()=>{fresh();refresh();G.after=settle(2,()=>G.won,'SD = 2.')}},
{h:'One far value',p:'Scores 3, 4, 5, 6, 7 have SD 1.41. Move the 7 further out.',
predict:{q:'The 7 moves out to 15. What happens to the SD?',opts:['It about triples','It stays the same: only one score moved','It goes up by 8'],ans:0},
task:'Drag the last score until the SD is over 4',show:()=>{steps[3].go();replay([9,11,13,15].map(v=>()=>setV(v)),600)},go:()=>{fresh();refresh();G.after=settle(3,()=>G.won,'SD over 4.')}},
{h:'Shift and stretch',p:'What happens to the SD when every score changes in the same way?',
predict:{q:'Add 10 to every score. The SD was 2. What is it now?',opts:['2','12','20'],ans:0},
task:'Add 10 to every score, then double every score',show:()=>{steps[4].go();replay([()=>tf('add'),()=>tf('dbl')],1000)},go:()=>{fresh();refresh();G.after=settle(4,()=>G.won,'2, then 4.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
const BANK=SDART.bank;
function why(tag){let m='SD = √( total of squared distances ÷ n ): a typical distance from the mean.';
 if(tag==='noRoot')m='That is the variance, in squared units. Take the square root to get the SD.';
 if(tag==='signedSum')m='Signed distances always add to 0 at the mean. Square them first: 4 + 0 + 4 = 8, 8 ÷ 3 = 2.67, √2.67 = 1.63.';
 if(tag==='rootFirst')m='Root last. √50 ÷ 8 = 0.88 divides after rooting. Divide first: 50 ÷ 8 = 6.25, then √6.25 = 2.5.';
 if(tag==='scaleNoChange')m='Multiplying every value by 3 stretches every distance by 3, so the SD is 2 × 3 = 6.';
 if(tag==='scaleSquare')m='18 is 2 × 9. Variance is multiplied by 3² = 9, but the SD only by 3: 2 × 3 = 6.';
 if(tag==='shiftAdds')m='Adding 5 to every value slides the whole set along. Every distance from the mean is the same, so the SD stays 2.';
 if(tag==='sdIsMean')m='Every value equals the mean, so every distance is 0 and the SD is 0. The SD is not the mean.';
 if(tag==='bigIsTight'||tag==='needMean')m='A smaller SD means scores sit closer to the mean. SD measures spread on its own, so class A is more tightly packed.';
 return m}
function ask(){qi++;const [q,right,wrongs]=BANK[qi%BANK.length],all=[[right,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,right)});announce('Challenge: '+q);A.redraw()}
let run=0;
function mark(tag,right){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+run+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Standard deviation lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up:()=>{G.drag=0}})}}).start()})})();
