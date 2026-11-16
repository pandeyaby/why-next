/* Flagship: invasive species (ages 9–11; NC England Y6 evolution and inheritance / Y4 "environments can change and this can
   sometimes pose dangers to living things"; NGSS 3-LS4-4 and 5-ESS3-1). Run a model wood where grey squirrels meet red ones,
   drag a cane toad to the beetles it was meant to eat and to the native animals it poisons, compare 24 rabbits in a field
   with and without hunters, sort the four kinds of harm, and choose what really stops the spread. Drag or tap, or use buttons. */
(()=>{
const P={ink:'#0f172a',soft:'#334155',paper:'#ffffff',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',badBg:'#ffe4e6',hint:'#f0f9ff',rim:'#1e293b',
 red:'#b91c1c',grey:'#475569',leaf:'#dcfce7',leafInk:'#14532d',grass:'#86efac',bare:'#d6c7a1',toad:'#a16207',pick:'#1d4ed8'};
const D=INVART;
VIS.reg('flaginvade',c=>{let A,X,btns,quiz,qn=-1,run=0;const S={after:()=>{}};
const k=n=>Math.round(n*(A.narrow?1:1.12));
function txt(s,x,y,n,col,al,wt){X.font=`${wt||700} ${k(n)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n){X.font=`700 ${k(n)}px system-ui,sans-serif`;const L=[];let row='';
 String(s).split(' ').forEach(word=>{const t=row?row+' '+word:word;if(row&&X.measureText(t).width>w){L.push(row);row=word}else row=t});L.push(row);return L}
function card(x,y,w,h,fill,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function inbox(s,r,n,col,wt){const L=lines(s,r.w-12,n),lh=k(n)+3;L.forEach((t,i)=>txt(t,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function head(s,won){const L=lines(s,A.W-40,13),lh=k(13)+4,h=Math.max(k(32),L.length*lh+12);card(10,8,A.W-20,h,won?P.goodBg:P.hint,won?P.good:P.rim,2,8);
 L.forEach((t,i)=>txt(t,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?P.good:P.ink));return 8+h}
function foot(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-44,12),lh=k(12)+5,h=L.length*lh+10,y=A.H-h-8;
 card(10,y,A.W-20,h,P.paper,S.bad?P.bad:P.good,3,8);L.forEach((t,i)=>txt(t,A.W/2,y+5+lh*(i+.5),12,S.bad?P.bad:P.ink))}
const tell=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const no=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const yes=s=>{S.bad=false;S.msg=s;A.sound.pop();refresh()};
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const panel=t=>{const y=t+k(10);return{x:14,y,w:A.W-28,h:A.H-y-k(78)}};
/* step 0: squirrels in a model wood */
function year(){if(S.won||S.yr>=8)return;S.yr++;A.sound.tick();if(S.yr>=8){S.won=true;return yes(D.SQ.say[8])}S.bad=false;S.msg=`Year ${S.yr}: ${D.SQ.say[S.yr]}`;refresh()}
function drawWood(t){const r=panel(t);card(r.x,r.y,r.w,r.h,P.leaf,P.leafInk,2,12);S.woodHit=r;
 txt('A model wood: squirrels each year',A.W/2,r.y+k(14),12,P.leafInk);const base=r.y+r.h-k(26),top=r.y+k(80),sc=(base-top)/120,n=9,gw=(r.w-40)/n,bw=Math.min(k(14),gw*.36);
 X.strokeStyle=P.soft;X.lineWidth=1.5;X.beginPath();X.moveTo(r.x+24,base);X.lineTo(r.x+r.w-12,base);X.stroke();
 for(let i=0;i<n;i++){const x=r.x+28+gw*i+gw/2;txt(i,x,base+k(12),11,P.soft,'center',600);if(i>S.yr)continue;
  const rh=D.SQ.red[i]*sc,gh=D.SQ.grey[i]*sc;X.fillStyle=P.red;X.fillRect(x-bw-1,base-rh,bw,rh);X.fillStyle=P.grey;X.fillRect(x+1,base-gh,bw,gh)}
 const lx=r.x+r.w/2-k(110);card(lx,r.y+k(28),k(220),k(26),P.paper,P.rim,1.5,8);X.fillStyle=P.red;X.fillRect(lx+k(10),r.y+k(36),k(12),k(10));
 txt(`Red: ${D.SQ.red[S.yr]}`,lx+k(28),r.y+k(41),11,P.red,'left',800);X.fillStyle=P.grey;X.fillRect(lx+k(116),r.y+k(36),k(12),k(10));
 txt(`Grey: ${D.SQ.grey[S.yr]}`,lx+k(134),r.y+k(41),11,P.grey,'left',800);
 txt(S.won?`Year ${S.yr}`:`Year ${S.yr}: tap the wood for the next year`,r.x+r.w/2,r.y+k(66),11,P.leafInk,'center',600)}
/* step 1: where does the cane toad go? */
function drop(i){if(S.won||S.used.has(i))return;const t=D.TOAD[i];S.used.add(i);A.sound.tick();
 if(S.used.size>=3&&S.used.has(0)){S.won=true;return yes(t[2]+' The toads spread instead: millions now live across northern Australia.')}
 S.bad=false;S.msg=t[2]+(S.used.has(0)?'':' Now try the beetles.');refresh()}
function spots(t){const y0=t+k(12),g=k(8),w=(A.W-28-g)/2,h=Math.min(k(64),(A.H-y0-k(150))/2-g);return D.TOAD.map((d,i)=>({x:14+(i%2)*(w+g),y:y0+Math.floor(i/2)*(h+g),w,h,i}))}
function drawToad(t){S.spotHit=spots(t);S.spotHit.forEach(r=>{const d=D.TOAD[r.i],u=S.used.has(r.i),cane=d[1]==='cane';
  card(r.x,r.y,r.w,r.h,u?(cane?'#fef9c3':P.badBg):(cane?'#ecfccb':P.paper),u?(cane?'#854d0e':P.bad):P.rim,u?3:1.5,10);
  inbox(d[0]+(u?(cane?' (out of reach)':' (poisoned)'):''),r,12,u?(cane?'#713f12':P.bad):P.ink,800)});
 const last=S.spotHit[S.spotHit.length-1],ty=last.y+last.h+k(18),cx=S.drag?S.drag.x:A.W/2,cy=S.drag?S.drag.y:ty+k(20),rr=k(18);
 S.toadHit={x:A.W/2-rr*2,y:ty,w:rr*4,h:rr*2.6};X.fillStyle=P.toad;X.strokeStyle='#422006';X.lineWidth=2;X.beginPath();X.ellipse(cx,cy,rr*1.3,rr*.85,0,0,7);X.fill();X.stroke();
 X.fillStyle='#fde68a';for(const dx of[-.5,.5]){X.beginPath();X.arc(cx+dx*rr,cy-rr*.6,rr*.28,0,7);X.fill();X.stroke()}
 X.fillStyle='#422006';[[-.6,.1],[.3,.3],[.7,-.1],[-.1,-.2]].forEach(([a,b])=>{X.beginPath();X.arc(cx+a*rr,cy+b*rr,2.5,0,7);X.fill()});
 if(!S.drag)txt('Cane toad: drag me',A.W/2,cy+rr+k(10),11,P.soft)}
/* step 2: rabbits with and without hunters */
function season(){if(S.won||S.ry>=5)return;S.ry++;A.sound.tick();const w=D.RAB.wild[S.ry],h=D.RAB.home[S.ry];
 if(S.ry>=5){S.won=true;return yes(`Year 5: ${w.toLocaleString('en-GB')} rabbits with no hunters, but still about ${h} where foxes, stoats and buzzards hunt them. The grass is gone.`)}
 S.bad=false;S.msg=`Year ${S.ry}: ${w.toLocaleString('en-GB')} with no hunters, ${h} with hunters.`;refresh()}
function field(r,n,ttl,eaten){card(r.x,r.y,r.w,r.h,P.paper,P.rim,1.5,10);txt(ttl,r.x+r.w/2,r.y+k(14),11,P.ink,'center',800);
 const gx=4,gy=4,cw=(r.w-16)/gx,ch=(r.h-k(60))/gy;for(let i=0;i<16;i++){const x=r.x+8+(i%gx)*cw,y=r.y+k(28)+Math.floor(i/gx)*ch;X.fillStyle=i<eaten?P.bare:P.grass;X.fillRect(x+1,y+1,cw-2,ch-2)}
 const dots=Math.min(n,64);X.fillStyle='#57534e';for(let j=0;j<dots;j++){const a=(j*137.5)%360*Math.PI/180,q=Math.sqrt((j+.5)/64);X.beginPath();X.arc(r.x+r.w/2+Math.cos(a)*q*(r.w/2-14),r.y+k(28)+(r.h-k(60))/2+Math.sin(a)*q*((r.h-k(60))/2-6),2.6,0,7);X.fill()}
 txt(`Year ${S.ry}: ${n.toLocaleString('en-GB')}`,r.x+r.w/2,r.y+r.h-k(16),12,P.ink,'center',800)}
function drawRabbits(t){const r=panel(t),g=k(8),w=(r.w-g)/2;S.fieldHit=r;const n=D.RAB.wild[S.ry];
 field({x:r.x,y:r.y,w,h:r.h},D.RAB.home[S.ry],'With hunters',0);field({x:r.x+w+g,y:r.y,w,h:r.h},n,'No hunters',Math.min(16,Math.floor(n/360)));
}
/* step 3: sort the harm */
function sort(card_,bin){if(S.won||S.put[card_]!=null)return;S.sel=null;const cd=D.CARDS[card_];
 if(cd[1]!==bin)return no(`Not quite. "${cd[0]}": ask what it does to native wildlife. Does it take food, spread a germ, escape hunters, or kill them?`);
 S.put[card_]=bin;A.sound.pop();S.bad=false;S.msg=`${cd[0]}: ${D.HARM[bin].toLowerCase()}.`;
 if(D.CARDS.every((_,i)=>S.put[i]!=null)){S.won=true;S.msg='Invaders harm natives in four ways: they take food, spread disease, escape hunters, and eat or poison natives.'}refresh()}
function drawHarm(t){const y0=t+k(8),g=k(6),cols=A.narrow?2:3,w=(A.W-28-g*(cols-1))/cols,ch=k(40);S.cardHit=[];let n=0;
 D.CARDS.forEach((cd,i)=>{if(S.put[i]!=null)return;const x=14+(n%cols)*(w+g),y=y0+Math.floor(n/cols)*(ch+g);n++;const on=S.sel===i,r=S.drag&&S.drag.c===i?{x:S.drag.x-w/2,y:S.drag.y-ch/2,w,h:ch}:{x,y,w,h:ch};
  card(r.x,r.y,w,ch,on?'#dbeafe':P.paper,on?P.pick:P.rim,on?3:1.5,8);inbox(cd[0],r,10,P.ink,700);S.cardHit.push({x,y,w,h:ch,i})});
 const rows=Math.ceil(D.CARDS.length/cols),by=y0+rows*(ch+g)+k(6),bw=(A.W-28-g)/2,bh=Math.min(k(66),(A.H-by-k(70))/2-g);
 S.binHit=D.HARM.map((s,i)=>{const x=14+(i%2)*(bw+g),y=by+Math.floor(i/2)*(bh+g),got=D.CARDS.filter((_,j)=>S.put[j]===i).length;
  card(x,y,bw,bh,got?P.goodBg:P.hint,got?P.good:P.rim,got?3:1.5,10);inbox(s+(got?` (${got})`:''),{x,y,w:bw,h:bh},12,got?P.good:P.ink,800);return{x,y,w:bw,h:bh,i}})}
/* step 4: stop the spread */
function act(i){if(S.won||S.ok.has(i))return;const a=D.ACT[i];if(!a[1])return no(a[2]);S.ok.add(i);
 if(S.ok.size===3){S.won=true;return yes('Stopping invaders arriving is far easier than getting rid of them later.')}S.bad=false;S.msg=a[2]+` ${3-S.ok.size} more.`;A.sound.tick();refresh()}
function drawAct(t){const y0=t+k(10),g=k(8),w=(A.W-28-g)/2,h=Math.min(k(56),(A.H-y0-k(70))/3-g);S.actHit=D.ACT.map((a,i)=>{const x=14+(i%2)*(w+g),y=y0+Math.floor(i/2)*(h+g),on=S.ok.has(i);
  card(x,y,w,h,on?P.goodBg:P.paper,on?P.good:P.rim,on?3:1.5,10);inbox((on?'✓ ':'')+a[0],{x,y,w,h},11,on?P.good:P.ink,on?800:600);return{x,y,w,h,i}})}
/* input */
const mode=()=>['wood','toad','rabbit','harm','act','quiz'][A.step];
function down(p){const m=mode(),find=L=>(L||[]).find(r=>hit(p,r));
 if(m==='wood'&&hit(p,S.woodHit)){year();return true}
 if(m==='toad'){if(hit(p,S.toadHit)&&!S.won){S.drag={x:p.x,y:p.y};A.redraw();return true}const r=find(S.spotHit);if(r){drop(r.i);return true}}
 if(m==='rabbit'&&hit(p,S.fieldHit)){season();return true}
 if(m==='harm'){const cd=find(S.cardHit);if(cd){S.sel=cd.i;S.drag={c:cd.i,x:p.x,y:p.y};A.sound.tick();refresh();return true}const b=find(S.binHit);if(b&&S.sel!=null){sort(S.sel,b.i);return true}}
 if(m==='act'){const r=find(S.actHit);if(r){act(r.i);return true}}
 return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d){A.redraw();return}const m=mode();
 if(m==='toad'){const r=(S.spotHit||[]).find(q=>hit(p,q));if(r)drop(r.i);else A.redraw()}
 if(m==='harm'){const r=(S.binHit||[]).find(q=>hit(p,q));if(r)sort(d.c,r.i);else A.redraw()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const m=mode();let t;
 if(m==='wood'){t=head(S.won?'Reds fell as greys rose: less food and a deadly germ.':'Grey squirrels from America arrive in a wood of red squirrels. Run 8 years.',S.won);drawWood(t)}
 if(m==='toad'){t=head(S.won?'The toads missed the beetles and poisoned native hunters.':'Drag the cane toad to the beetles it was meant to eat, then to 2 native animals.',S.won);drawToad(t)}
 if(m==='rabbit'){t=head(S.won?'With no hunters and lots of grass, numbers explode.':'24 rabbits in each field. Tap a field to let a year pass. Run 5 years.',S.won);drawRabbits(t)}
 if(m==='harm'){t=head(S.won?'Four ways invaders harm native wildlife.':'Drag each card to the kind of harm. Or tap a card, then a box.',S.won);drawHarm(t)}
 if(m==='act'){t=head(S.won?'Stop invaders before they spread.':'Which of these really help? Tap the 3 that do.',S.won);drawAct(t)}
 if(m==='quiz'){t=head('Brought by people, no checks in the new place, harm to native wildlife.');drawWood(t)}
 foot();A.fx.draw(X)}
function refresh(){const m=mode();let d='Challenge.';
 if(m==='wood')d=`Year ${S.yr} of 8. Red squirrels ${D.SQ.red[S.yr]}, grey squirrels ${D.SQ.grey[S.yr]}.`;
 if(m==='toad')d='Places tried: '+([...S.used].map(i=>D.TOAD[i][0]).join(', ')||'none')+'.';
 if(m==='rabbit')d=`Year ${S.ry} of 5. With hunters ${D.RAB.home[S.ry]} rabbits; no hunters ${D.RAB.wild[S.ry]} rabbits.`;
 if(m==='harm')d='Sorted: '+(D.CARDS.filter((_,i)=>S.put[i]!=null).map(c_=>c_[0]).join('; ')||'none')+(S.sel!=null?`. Picked: ${D.CARDS[S.sel][0]}.`:'.');
 if(m==='act')d='Helpful actions found: '+([...S.ok].map(i=>D.ACT[i][0]).join('; ')||'none')+'.';
 tell((S.msg?S.msg+' ':'')+d);pad();S.after()}
function pad(){if(!btns)return;btns.innerHTML='';const m=mode(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},btns,t).onclick=()=>{fn();refresh()}};
 if(m==='wood'&&!S.won)b('Next year',year);
 if(m==='toad'&&!S.won)D.TOAD.forEach((d,i)=>{if(!S.used.has(i))b('Move the toad to: '+d[0],()=>drop(i))});
 if(m==='rabbit'&&!S.won)b('Next year',season);
 if(m==='harm'&&!S.won){if(S.sel==null)D.CARDS.forEach((cd,i)=>{if(S.put[i]==null)b('Pick: '+cd[0],()=>{S.sel=i;A.sound.tick()})});
  else{D.HARM.forEach((s,i)=>b('Put it in: '+s,()=>sort(S.sel,i)));b('Pick another card',()=>{S.sel=null})}}
 if(m==='act'&&!S.won)D.ACT.forEach((a,i)=>{if(!S.ok.has(i))b(a[0],()=>act(i))});
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run){f();refresh()}},(j+1)*(A.reduced()?30:ms)))};
function clear(){run++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,yr:0,used:new Set(),drag:null,ry:0,put:{},sel:null,ok:new Set()})}
const steps=[
{h:'Red squirrels meet grey',p:'Red squirrels are native to Britain: they have lived there for thousands of years. In the 1870s people brought grey squirrels from North America and let them go in parks.',
predict:{q:'Grey squirrels arrive in a wood full of red squirrels. What happens to the reds?',opts:['Nothing: there is room for both','The reds go down as the greys go up','The greys die out because the wood is new to them'],ans:1},
task:'Run the wood for 8 years',show:()=>{steps[0].go();auto([1,2,3,4,5,6,7,8].map(()=>year),300)},go:()=>{clear();refresh();S.after=finish(0,()=>S.won,'Greys took the food and spread squirrelpox.')}},
{h:'The cane toad plan',p:'In 1935 about 100 cane toads, first from South America, were brought from Hawaii to Queensland, Australia, to eat beetles that damage sugar cane. Cane toads have poison glands in their skin.',
predict:{q:'What do you think the cane toads did?',opts:['Ate the beetles and saved the crop','Ignored the beetles, spread and poisoned native animals','Died out in the hot weather'],ans:1},
task:'Try the toad with the beetles and 2 native animals',show:()=>{steps[1].go();auto([()=>drop(1),()=>drop(0),()=>drop(2)],700)},go:()=>{clear();refresh();S.after=finish(1,()=>S.won,'A plan to fix one pest made a far worse one.')}},
{h:'Rabbits with no hunters',p:'In 1859, 24 rabbits from England were let go on a farm in Australia. A mother rabbit can have several litters of babies a year.',
predict:{q:'24 rabbits are let go where nothing hunts them. After a few years there are about…',opts:['24, the same as before','A few hundred','Thousands, then millions'],ans:2},
task:'Run both fields for 5 years',show:()=>{steps[2].go();auto([1,2,3,4,5].map(()=>season),350)},go:()=>{clear();refresh();S.after=finish(2,()=>S.won,'No hunters, fast breeding: millions of rabbits.')}},
{h:'How invaders cause harm',p:'An invasive species is a living thing people moved to a new place, by accident or on purpose, that spreads and harms the wildlife there.',
task:'Sort all 7 cards by the kind of harm',show:()=>{steps[3].go();auto(D.CARDS.map((cd,i)=>()=>sort(i,cd[1])),330)},go:()=>{clear();refresh();S.after=finish(3,()=>S.won,'Food, disease, no hunters, eating or poisoning.')}},
{h:'Stopping the spread',p:'Once an invader has spread it is very hard to remove. The best plan is to stop it arriving or catch it early.',
task:'Tap the 3 actions that really help',show:()=>{steps[4].go();auto([0,1,2].map(i=>()=>act(i)),450)},go:()=>{clear();refresh();S.after=finish(4,()=>S.won,'Keep pets in, clean kit, report sightings.')}},
{h:'Challenge',p:'',go:()=>{clear();S.yr=8;S.won=true;next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function next(){qn++;const [q,ans,wr]=D.bank[qn%D.bank.length],all=[[ans,'ok']].concat(wr),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,ans)});tell('Challenge: '+q);A.redraw()}
let run2=0;
function judge(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';let m=D.WHYM[tag]||'Think about where the species came from and what it does to native wildlife.';
 if(tag==='native')m='A native species belongs in a place naturally. Invaders were brought from somewhere else by people.';
 if(tag==='fight')m='Greys win without fighting: they eat the food first and carry squirrelpox, which kills reds.';
 if(tag==='beetles')m='Cane beetles live high up the cane, out of reach. The toads never controlled them.';
 if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run2+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:B=>{quiz.hidden=B.step!==5;btns.hidden=B.step===5;pad()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Invasive species lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
