/* Flagship: multimedia presentations (ages 10–11). Sam's made-up talk "Save our school pond": drag the visual that
   shows each main point, cut a slide that copies the script down to key words, tap away distracting extras, choose
   the right media for each kind of information, and show each slide at the moment Sam reaches its point. Text in deck_art.js. */
(()=>{
const T=DECK;
VIS.reg('flagdeck',c=>{let A,x2,pad,qz,turn=-1,gen=0,held=null;const v={};
const tone=()=>{const q=A.col;return{fg:q.tx,dim:q.mu,pane:q.pn,night:q.dark,navy:'#0f172a',slide:'#ffffff',rim:q.dark?'#cbd5e1':'#334155',pick:'#db2777',bar1:'#0e7490',bar2:'#f59e0b',pond:'#93c5fd',reed:'#15803d',strip:q.dark?'#312e81':'#ede9fe',ok:'#166534',no:'#9f1239',ghost:q.dark?'#64748b':'#94a3b8'}};
const sz=n=>A.narrow?n:Math.round(n*1.1);
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function say(t,x,y,n,col,w,al,max){x2.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;x2.textAlign=al||'center';x2.textBaseline='middle';x2.fillStyle=col;x2.fillText(String(t),x,y,max||A.W-10)}
function fold(t,max,n,w){x2.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;const out=[];let row='';for(const word of String(t).split(' ')){const nx=row?row+' '+word:word;if(row&&x2.measureText(nx).width>max){out.push(row);row=word}else row=nx}out.push(row);return out}
function card(x,y,w,h,fill,edge,r,lw){A.paint.rrect(x,y,w,h,r==null?6:r);x2.fillStyle=fill;x2.fill();if(edge){x2.lineWidth=lw||2;x2.strokeStyle=edge;x2.stroke()}}
function strip(t){const k=tone(),R=fold(t,A.W-34,13),lh=sz(17),h=R.length*lh+12;card(8,6,A.W-16,h,k.strip);R.forEach((r,i)=>say(r,A.W/2,12+lh*(i+.5),13,k.night?'#f8fafc':k.navy));return 6+h+sz(8)}
function verdict(){if(!v.msg)return;const k=tone(),R=fold((v.no?'✗ ':'✓ ')+v.msg,A.W-38,12),lh=sz(16),h=R.length*lh+10,y=A.H-h-6;card(8,y,A.W-16,h,'#ffffff',v.no?k.no:k.ok);R.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),12,v.no?k.no:k.navy))}
const nope=t=>{v.no=true;v.msg=t;A.sound.miss();voice(t);A.redraw()};
const good=t=>{v.no=false;v.msg=t;A.sound.pop();voice(t);A.redraw();v.check()};
const info=t=>{v.no=false;v.msg=t;voice(t);A.redraw()};
/* little pictures for slides: kind 0 chart, 1 frogspawn, 2 map, 3 cat, 4 title, 5 thank you */
function pic(kind,x,y,w,h){const k=tone();card(x,y,w,h,k.slide,k.rim,5,1.5);const cx=x+w/2,cy=y+h/2,m=Math.min(w,h);
 if(kind===0){const b=y+h*.82;x2.strokeStyle=k.navy;x2.lineWidth=1.5;x2.beginPath();x2.moveTo(x+w*.18,y+h*.12);x2.lineTo(x+w*.18,b);x2.lineTo(x+w*.9,b);x2.stroke();x2.fillStyle=k.bar1;x2.fillRect(x+w*.28,b-h*.6,w*.2,h*.6);x2.fillStyle=k.bar2;x2.fillRect(x+w*.6,b-h*.3,w*.2,h*.3);
  if(m>50){say('4 m',x+w*.38,b-h*.66,10,k.navy,800);say('2 m',x+w*.7,b-h*.36,10,k.navy,800)}return}
 if(kind===1){x2.fillStyle='#d1fae5';x2.fillRect(x+3,y+3,w-6,h-6);for(let i=0;i<9;i++){const a=i*2.4,r=m*.11,px_=cx+Math.cos(a)*m*.07*(i%4+1),py=cy+Math.sin(a)*m*.05*(i%4+1);x2.fillStyle='#f8fafc';x2.beginPath();x2.arc(px_,py,r,0,7);x2.fill();x2.strokeStyle='#64748b';x2.lineWidth=1;x2.stroke();x2.fillStyle=k.navy;x2.beginPath();x2.arc(px_,py,r*.32,0,7);x2.fill()}return}
 if(kind===2){x2.fillStyle=k.pond;x2.beginPath();x2.ellipse(cx,cy,w*.32,h*.28,0,0,7);x2.fill();x2.strokeStyle='#1e3a8a';x2.lineWidth=1.5;x2.stroke();x2.strokeStyle=k.reed;x2.lineWidth=2.5;[[-.36,-.2],[.34,-.18],[.05,.36]].forEach(([a,b])=>{const X=cx+a*w,Y=cy+b*h;x2.beginPath();x2.moveTo(X-5,Y-5);x2.lineTo(X+5,Y+5);x2.moveTo(X+5,Y-5);x2.lineTo(X-5,Y+5);x2.stroke()});return}
 if(kind===3){x2.fillStyle='#fdba74';x2.beginPath();x2.arc(cx,cy+m*.05,m*.26,0,7);x2.fill();[[-1],[1]].forEach(([s])=>{x2.beginPath();x2.moveTo(cx+s*m*.24,cy-m*.08);x2.lineTo(cx+s*m*.2,cy-m*.34);x2.lineTo(cx+s*m*.06,cy-m*.18);x2.fill()});x2.fillStyle=k.navy;x2.beginPath();x2.arc(cx-m*.09,cy,m*.03,0,7);x2.arc(cx+m*.09,cy,m*.03,0,7);x2.fill();return}
 say(kind===4?'Save our':'Thank you!',cx,cy-(kind===4?m*.12:0),m>50?13:10,k.navy,900,'center',w-6);if(kind===4)say('school pond',cx,cy+m*.14,m>50?13:10,k.navy,900,'center',w-6)}
/* step 1: visuals onto points */
function showMatch(top){const k=tone(),rowH=sz(54),sw=Math.min(sz(96),A.W*.3);v.slots=[];
 T.POINTS.forEach((p,i)=>{const y=top+i*(rowH+6),sel=v.sel===i;card(8,y,A.W-16,rowH,k.night?'#1e293b':'#f8fafc',sel?k.pick:k.ghost,8,sel?3:1.5);
  fold(`${i+1}. ${p}`,A.W-sw-40,13,800).forEach((r,j,a)=>say(r,18,y+rowH/2+(j-(a.length-1)/2)*sz(16),13,k.fg,800,'left'));
  const sx=A.W-sw-16,sy=y+5;if(v.put[i]!=null)pic(v.put[i],sx,sy,sw,rowH-10);else{x2.setLineDash([4,3]);x2.strokeStyle=k.ghost;x2.lineWidth=1.5;x2.strokeRect(sx,sy,sw,rowH-10);x2.setLineDash([]);say('drop here',sx+sw/2,sy+(rowH-10)/2,11,k.dim,700)}
  v.slots.push({x:8,y,w:A.W-16,h:rowH,i})});
 const ty=top+3*(rowH+6)+sz(6),cw=(A.W-16-3*6)/4,ch=sz(52);v.cards=[];
 T.VIS.forEach((it,j)=>{if(v.used.includes(j))return;let x=8+j*(cw+6),y=ty;if(held&&held.j===j&&held.moved){x=held.x-cw/2;y=held.y-ch/2}pic(j,x,y,cw,ch);if(v.pickV===j){x2.strokeStyle=k.pick;x2.lineWidth=3;x2.strokeRect(x-2,y-2,cw+4,ch+4)}v.cards.push({x:8+j*(cw+6),y:ty,w:cw,h:ch,j})})}
function putV(slot,j){let m='';const want=T.VIS[j][1];if(want<0)m=T.VISWHY[3];else if(v.put[slot]!=null)m=`Point ${slot+1} already has its visual.`;else if(want!==slot)m=`Not for "${T.POINTS[slot]}". ${T.VISWHY[j]}`;
 v.pickV=null;if(m){nope(m);tools();return}v.put[slot]=j;v.used.push(j);A.sound.tick();tools();
 if(v.used.length===3){good('Chart for the shrinking pond, photo for the eggs, map for the reeds. The cat shows none of the points, so it stays off.');return}info(T.VISWHY[j])}
/* step 2: cut the script */
function showWords(top){const k=tone(),x=14,w=A.W-28;let y=top+sz(4);v.rows=[];card(x-4,y-4,w+8,A.H-y-sz(70),k.slide,k.rim,8,1.5);
 T.WORDS.forEach(([t,keep],i)=>{const cut=v.cut.includes(i),R=fold(t,w-20,i===0?15:12,i===0?900:700),h=R.length*sz(i===0?19:16)+8;
  if(cut){x2.globalAlpha=.35}R.forEach((r,j)=>say(r,x+8,y+4+sz(i===0?19:16)*(j+.5),i===0?15:12,k.navy,i===0?900:700,'left'));x2.globalAlpha=1;
  if(cut){x2.strokeStyle=k.no;x2.lineWidth=2;R.forEach((r,j)=>{const yy=y+4+sz(i===0?19:16)*(j+.5);x2.beginPath();x2.moveTo(x+6,yy);x2.lineTo(x+8+Math.min(w-16,x2.measureText(r).width),yy);x2.stroke()})}
  v.rows.push({x,y,w,h,i});y+=h+sz(6)});
 const left=T.WORDS.filter((_,i)=>!v.cut.includes(i)).map(([t])=>t).join(' ').split(' ').length;say(`${left} words on the slide`,A.W/2,y+sz(12),12,k.navy,800)}
function cutW(i){const [t,keep]=T.WORDS[i];if(v.cut.includes(i))return;let m='';if(keep)m=i===0?'Keep the title: it tells listeners what the slide is about.':'Keep the key numbers: 4 m to 2 m is the evidence listeners need to see.';if(m){nope(m);return}
 v.cut.push(i);A.sound.tick();tools();if(v.cut.length===3){good('Only the title and the key numbers are left. Sam says the rest, so the slide supports the talk instead of repeating it.');return}info('Cut. Sam can say that part out loud.')}
/* step 3: help or distract */
const SPOT=[[.5,.1],[.5,.55],[.5,.93],[.88,.12],[.12,.82],[.88,.82]];
function showExtras(top){const k=tone(),x=10,w=A.W-20,h=A.H-top-sz(70),y=top;card(x,y,w,h,k.slide,k.rim,8,1.5);v.spots=[];
 const at=i=>[x+SPOT[i][0]*w,y+SPOT[i][1]*h],gone=i=>v.off.includes(i);
 if(!gone(0)){const [a,b]=at(0);say('Our pond is shrinking',a,b,14,k.navy,900)}
 if(!gone(1)){const cw=Math.min(w*.5,sz(170)),chh=h*.55,[a,b]=at(1);pic(0,a-cw/2,b-chh/2,cw,chh)}
 if(!gone(2)){const [a,b]=at(2);say('pond width (m) · 2023 · 2025',a,b,11,k.navy,800)}
 if(!gone(3)){const [a,b]=at(3),r=sz(16);x2.fillStyle='#facc15';x2.beginPath();for(let j=0;j<10;j++){const ang=j*Math.PI/5-Math.PI/2,rr=j%2?r*.45:r;x2.lineTo(a+Math.cos(ang)*rr,b+Math.sin(ang)*rr)}x2.closePath();x2.fill();x2.strokeStyle=k.navy;x2.lineWidth=1;x2.stroke();say('↻',a+r+4,b-r+4,12,k.navy,900)}
 if(!gone(4)){const [a,b]=at(4),s=sz(46);pic(3,a-s/2,b-s/2,s,s)}
 if(!gone(5)){const [a,b]=at(5);say('♫ loud',a,b,14,k.navy,900)}
 T.EXTRA.forEach((_,i)=>{if(gone(i))return;const [a,b]=at(i),hw=i===1?Math.min(w*.26,sz(85)):sz(46),hh=i===1?h*.28:sz(18);v.spots.push({x:a-hw,y:b-hh,w:hw*2,h:hh*2,i})});
 say(`${3-T.EXTRA.filter((e,i)=>!e[1]&&gone(i)).length} distractions left`,A.W/2,y+h+sz(14),12,k.fg,800)}
function drop(i){const [name,helps,why]=T.EXTRA[i];if(v.off.includes(i))return;let m='';if(helps)m=`Keep the ${name}. ${why}`;if(m){nope(m);return}
 v.off.push(i);A.sound.tick();tools();const left=T.EXTRA.filter((e,j)=>!e[1]&&!v.off.includes(j)).length;if(!left){good('The title, chart and labels are left. Nothing on the slide competes with the idea that the pond is shrinking.');return}info(`Removed the ${name}. ${why}`)}
/* step 4: choose the media */
function showMedia(top){const k=tone(),it=T.INFO[v.q];v.tiles=[];
 if(it){const R=fold(it[0],A.W-60,14,900),h=R.length*sz(19)+16;card(20,top,A.W-40,h,k.night?'#1e293b':'#f8fafc',k.rim,8,1.5);R.forEach((r,j)=>say(r,A.W/2,top+8+sz(19)*(j+.5),14,k.fg,900))}
 else say('All five chosen',A.W/2,top+sz(20),14,k.fg,900);
 const y0=top+sz(74),cols=A.narrow?2:3,tw=(A.W-20-(cols-1)*8)/cols,th=sz(40);T.MEDIA.forEach((m,i)=>{const x=10+(i%cols)*(tw+8),y=y0+Math.floor(i/cols)*(th+8);card(x,y,tw,th,k.night?'#334155':'#f1f5f9',k.rim,8,1.5);say(m,x+tw/2,y+th/2,12,k.night?'#f8fafc':k.navy,800,'center',tw-8);v.tiles.push({x,y,w:tw,h:th,i})});
 say(`${v.q} of ${T.INFO.length} done`,A.W/2,y0+Math.ceil(T.MEDIA.length/cols)*(th+8)+sz(10),12,k.fg,800)}
function chooseM(i){const it=T.INFO[v.q];if(!it)return;if(i!==it[1]){nope(it[2][i]||'Think about what kind of information it is.');return}v.q++;A.sound.tick();tools();
 if(v.q===T.INFO.length){good('Chart for change, map for place, clip for sound, photo for looks, and nothing extra for a simple fact.');return}info(`Yes: ${T.MEDIA[i]}.`)}
/* step 5: timing */
function showTiming(top){const k=tone(),ln=T.LINES[v.q];const R=fold(ln?`Sam: “${ln[0]}”`:'Sam has finished.',A.W-40,13,800),bh=R.length*sz(17)+12;card(14,top,A.W-28,bh,k.night?'#1e293b':'#fef9c3',k.rim,10,1.5);R.forEach((r,j)=>say(r,A.W/2,top+6+sz(17)*(j+.5),13,k.night?'#f8fafc':k.navy,800));
 const sw=Math.min(A.W*.5,sz(170)),sh=sw*.6,sy=top+bh+sz(8);const kinds=[4,0,1,2,5];if(v.on!=null)pic(kinds[v.on],(A.W-sw)/2,sy,sw,sh);else{card((A.W-sw)/2,sy,sw,sh,'#0f172a',k.rim,5,1.5);say('screen',A.W/2,sy+sh/2,12,'#e2e8f0',700)}
 const ty=sy+sh+sz(12),tw=(A.W-20-4*6)/5,th=tw*.62;v.thumbs=[];kinds.forEach((kd,i)=>{const x=10+i*(tw+6);pic(kd,x,ty,tw,th);if(v.on===i){x2.strokeStyle=k.pick;x2.lineWidth=3;x2.strokeRect(x-2,ty-2,tw+4,th+4)}v.thumbs.push({x,y:ty,w:tw,h:th,i})});
 say(`line ${Math.min(v.q+1,5)} of 5`,A.W/2,ty+th+sz(14),12,k.fg,800)}
function showS(i){const ln=T.LINES[v.q];if(!ln)return;let m='';if(i!==ln[1])m=i>ln[1]?`The ${T.SLIDES[i]} slide is for a later point. Sam is not there yet.`:`The ${T.SLIDES[i]} slide was for an earlier point. Move on with Sam.`;if(m){nope(m);return}
 v.on=i;v.q++;A.sound.tick();if(v.q===T.LINES.length){good('Every slide appeared just as Sam reached its point, so eyes and ears were on the same idea.');return}info(`The ${T.SLIDES[i]} slide is up.`)}
const part=()=>['match','words','extras','media','timing','quiz'][A.step];
function paint(a){x2=a.ctx;const k=tone(),w=part();x2.fillStyle=k.pane;x2.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){say('Multimedia presentations',A.W/2,A.H*.34,16,k.fg,900);say('the right visual · at the right time',A.W/2,A.H*.5,13,k.dim,700);A.fx.draw(x2);return}
 const top=strip(v.title||'');({match:showMatch,words:showWords,extras:showExtras,media:showMedia,timing:showTiming})[w](top);verdict();A.fx.draw(x2)}
function clear(o){gen++;held=null;Object.keys(v).forEach(z=>delete v[z]);Object.assign(v,{msg:'',no:false,check:()=>{},put:{},used:[],cut:[],off:[],q:0,on:null,sel:null,pickV:null},o||{})}
function play(i,acts){const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen&&A.step===i)f()},A.reduced()?30*(j+1):320*(j+1)))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!pad)return;pad.innerHTML='';const w=part(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},pad,t).onclick=f};
 if(w==='match'){const slot=[0,1,2].find(i=>v.put[i]==null);if(slot!=null)T.VIS.forEach(([name],j)=>{if(!v.used.includes(j))b(`Point ${slot+1}: ${name}`,()=>putV(slot,j))})}
 if(w==='words')T.WORDS.forEach(([t],i)=>{if(!v.cut.includes(i))b(`Cut “${t.length>28?t.slice(0,26)+'…':t}”`,()=>cutW(i))});
 if(w==='extras')T.EXTRA.forEach(([name],i)=>{if(!v.off.includes(i))b(`Remove the ${name}`,()=>drop(i))});
 if(w==='media'&&T.INFO[v.q])T.MEDIA.forEach((m,i)=>b(m,()=>chooseM(i)));
 if(w==='timing'&&T.LINES[v.q])T.SLIDES.forEach((s,i)=>b(`Show the ${s} slide`,()=>showS(i)))}
const over=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const w=part();if(w==='quiz')return false;
 if(w==='match'){const cd=(v.cards||[]).find(r=>over(p,r));if(cd){held={j:cd.j,x:p.x,y:p.y,sx:p.x,sy:p.y,moved:false};return true}const sl=(v.slots||[]).find(r=>over(p,r));if(sl&&v.pickV!=null)putV(sl.i,v.pickV);return true}
 if(w==='words'){const r=(v.rows||[]).find(r=>over(p,r));if(r)cutW(r.i);return true}
 if(w==='extras'){const r=(v.spots||[]).find(r=>over(p,r));if(r)drop(r.i);return true}
 if(w==='media'){const r=(v.tiles||[]).find(r=>over(p,r));if(r)chooseM(r.i);return true}
 if(w==='timing'){const r=(v.thumbs||[]).find(r=>over(p,r));if(r)showS(r.i);return true}return true}
function move(p){if(!held)return;if(Math.abs(p.x-held.sx)+Math.abs(p.y-held.sy)>8)held.moved=true;held.x=p.x;held.y=p.y;if(held.moved)A.redraw()}
function up(p){const h=held;held=null;if(!h)return;if(!h.moved){v.pickV=h.j;info(`Picked the ${T.VIS[h.j][0]}. Now tap a point.`);return}const sl=(v.slots||[]).find(r=>over(p,r));if(sl)putV(sl.i,h.j);else A.redraw()}
const steps=[
{h:'A visual for each point',p:T.STEPP[0],
 predict:{q:'Sam\'s point: "The pond is half as wide as it was in 2023." Which visual makes it clearest?',opts:['A cute photo of a frog','A bar chart of the width each year','The sentence typed on the slide'],ans:1},
 task:'Give each point the visual that shows it',show:()=>play(0,[()=>putV(0,0),()=>putV(1,1),()=>putV(2,2)]),
 go:()=>{clear({title:T.TITLE[0]});voice(T.SAY[0]);tools();v.check=finish(0,()=>v.used.length===3,T.DONE[0])}},
{h:'Key words, not a script',p:T.STEPP[1],
 predict:{q:'Which slide helps listeners follow Sam best?',opts:['Every word Sam will say','A title and the key numbers','A slide with no words at all'],ans:1},
 task:'Cut the slide down to key words',show:()=>play(1,[()=>cutW(1),()=>cutW(3),()=>cutW(4)]),
 go:()=>{clear({title:T.TITLE[1]});voice(T.SAY[1]);tools();v.check=finish(1,()=>v.cut.length===3,T.DONE[1])}},
{h:'Help or distract?',p:T.STEPP[2],
 task:'Remove the three distractions',show:()=>play(2,[()=>drop(3),()=>drop(4),()=>drop(5)]),
 go:()=>{clear({title:T.TITLE[2]});voice(T.SAY[2]);tools();v.check=finish(2,()=>T.EXTRA.every((e,i)=>e[1]||v.off.includes(i)),T.DONE[2])}},
{h:'The right media',p:T.STEPP[3],
 task:'Pick the media for all five',show:()=>play(3,T.INFO.map(it=>()=>chooseM(it[1]))),
 go:()=>{clear({title:T.TITLE[3]});voice(T.SAY[3]);tools();v.check=finish(3,()=>v.q===T.INFO.length,T.DONE[3])}},
{h:'The right moment',p:T.STEPP[4],
 task:'Show each slide as Sam reaches it',show:()=>play(4,T.LINES.map(l=>()=>showS(l[1]))),
 go:()=>{clear({title:T.TITLE[4]});voice(T.SAY[4]);tools();v.check=finish(4,()=>v.q===T.LINES.length,T.DONE[4])}},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>v.check()});
function next(){turn++;const [q,opts]=T.QZ[turn%T.QZ.length],r0=turn%3;qz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qz.querySelector('.fl-pick');opts.slice(r0).concat(opts.slice(0,r0)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});voice('Challenge: '+q);A.redraw()}
let row=0;function judge(t){qz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${row} in a row.`:'✗ '+(T.WHY[t]||'Look back at that lab step.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.45,draw:paint,onStep:A=>{qz.hidden=A.step!==5;pad.hidden=A.step===5;tools()},
 init:A=>{x2=A.ctx;const under=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Presentation controls'},under);qz=c.el('div',{class:'fl-chal'},A.below);clear();
  A.gest({down,move,up});tools()}});
A.start()})})();
