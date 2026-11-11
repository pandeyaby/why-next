/* Flagship – blending sounds to read words (ages 4–7). Say each sound pure (sss, not suh), drive the blending car under
   the sound buttons to push the sounds together into a word, join two letters that make one sound (sh, ch, ck), read
   every sound to tell bag from big, and blend words with two consonants side by side (f-r-o-g). Every drag has a twin. */
(()=>{
const PURE={s:'sss',u:'u',n:'nnn',p:'p',i:'i',g:'g',h:'h',a:'a',t:'t',m:'mmm',c:'k',e:'e',b:'b',d:'d',f:'fff',r:'rrr',o:'o',sh:'sh',ch:'ch',ck:'k'};
const UH={s:'suh',u:'you',n:'nuh',p:'puh',i:'eye',g:'guh',h:'huh',a:'ay',t:'tuh'};
const UHWHY={s:'No uh on the end. Hiss it: sss.',u:'You is the letter name. The sound is u, like up.',n:'No uh on the end. Hum it: nnn.',p:'Keep it tiny: p. Puh adds an extra sound.',
 i:'Eye is the letter name. The sound is i, like insect.',g:'Keep it short: g. Guh adds uh.',h:'Just a breath: h. Huh adds uh.',a:'Ay is the letter name. The sound is a, like apple.',t:'Keep it tiny: t. Tuh adds uh.'};
const SAY=[[['s','u','n'],'sun','☀️'],[['p','i','g'],'pig','🐷'],[['h','a','t'],'hat','🎩']];
const DRIVE=[[['m','a','p'],'map','🗺️'],[['c','u','p'],'cup','☕'],[['b','e','d'],'bed','🛏️']];
const LONG=[[['f','r','o','g'],'frog','🐸'],[['s','t','o','p'],'stop','🛑'],[['c','r','a','b'],'crab','🦀']];
/* join: word, picture, index of the first letter of each two-letter sound */
const JOIN=[['ship','🚢',[0]],['fish','🐟',[2]],['chick','🐤',[0,3]]];
const CHECK=[['bag','👜',['big','bag','bog']],['pin','📌',['pan','pen','pin']],['dog','🐶',['dog','dig','dug']]];
VIS.reg('flagblend',c=>{let A,pad,quiz,qn=-1,run=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({hook:()=>{},wait:0,n:0,k:0,g:[],said:0,car:0,merge:0,word:'',pic:'',opts:[],bad:-1,grab:null,lets:[],J:[],todo:[],slip:''}),S=fresh();
const part=()=>['say','drive','join','check','long','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced();
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,w,n,col,wt){g.font=`${wt||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;const L=[];let s='';
 t.split(' ').forEach(z=>{const q=s?s+' '+z:z;if(g.measureText(q).width>w&&s){L.push(s);s=z}else s=q});L.push(s);const h=sz(n)*1.22;L.forEach((r,i)=>g.fillText(r,x,y+(i-(L.length-1)/2)*h))}
function emo(g,e,x,y,s){g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* tiles: one per grapheme; a two-letter sound gets a wider tile and a dash, not a dot */
function tiles(){const n=S.g.length,units=S.g.reduce((a,x)=>a+(x.length>1?1.6:1),0)+.22*(n-1),u=Math.min(sz(64),(A.W-28)/units),gap=u*.22,h=u*1.12;
 let x=(A.W-(units*u))/2;const y=A.H*(A.narrow?.17:.14);return S.g.map((t,i)=>{const w=u*(t.length>1?1.6:1),r={x,y,w,h,t,u,cx:x+w/2};x+=w+gap;return r})}
const track=()=>{const T=tiles(),a=T[0],b=T[T.length-1];return{x0:a.x-a.u*.2,x1:b.x+b.w+a.u*.2,y:a.y+a.h+a.u*1.05}};
const carX=()=>{const k=track();return k.x0+(k.x1-k.x0)*S.car};
function cards(n){const w=Math.min(sz(150),(A.W-24-(n-1)*10)/n),h=sz(58),y=A.H*(A.narrow?.66:.66),x0=(A.W-(w*n+10*(n-1)))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+10),y,w,h}))}
function card(g,t,r,bad,big){const C=A.col;g.save();A.paint.shadow(8,3,.18);g.fillStyle=bad?A.mix(C.pn,C.rd,.18):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();
 g.strokeStyle=bad?C.rd:C.vi;g.lineWidth=bad?4:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore();txt(g,t,r.x+r.w/2,r.y+r.h/2,r.w-10,big||22,C.tx,800)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=part();if(v==='quiz'){txt(g,'Blend the sounds: say each one, then push them together.',W/2,H*.45,W-40,17);return}
 if(v!=='check'){const T=tiles();
  T.forEach((r,i)=>{const lit=i<S.said,now=(v==='say'&&i===S.said)||(v==='join'&&S.bad===i);g.save();A.paint.shadow(6,2,.15);
   g.fillStyle=S.bad===i?A.mix(C.pn,C.rd,.2):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();g.lineWidth=now?4:2;g.strokeStyle=S.bad===i?C.rd:now?C.vi:C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore();
   txt(g,r.t,r.cx,r.y+r.h*.5,r.w,Math.round(r.u*.62/(A.narrow?1:1.15)),C.tx,800);
   const by=r.y+r.h+r.u*.32;g.fillStyle=lit?C.gr:C.mu;if(r.t.length>1){A.paint.rrect(r.cx-r.w*.3,by-4,r.w*.6,8,4);g.fill()}else{g.beginPath();g.arc(r.cx,by,r.u*.1+2,0,7);g.fill()}
   if(lit&&S.merge<1){const k=S.merge,cx=r.cx+(W/2-r.cx)*k,cy=r.y-r.u*.42;g.globalAlpha=1-k;g.fillStyle=A.alpha(C.cy,.2);A.paint.rrect(cx-r.u*.48,cy-r.u*.24,r.u*.96,r.u*.48,r.u*.24);g.fill();
    txt(g,PURE[r.t]||r.t,cx,cy,r.u*.94,Math.round(r.u*.3/(A.narrow?1:1.15)),C.tx);g.globalAlpha=1}});
  if(v==='drive'||v==='long'){const k=track(),u=T[0].u;g.strokeStyle=C.mu;g.lineWidth=u*.16;g.lineCap='round';g.beginPath();g.moveTo(k.x0,k.y);g.lineTo(k.x1,k.y);g.stroke();
   g.fillStyle=C.mu;g.beginPath();g.moveTo(k.x1+u*.1,k.y-u*.22);g.lineTo(k.x1+u*.42,k.y);g.lineTo(k.x1+u*.1,k.y+u*.22);g.fill();
   g.save();g.translate(carX(),k.y-u*.3);g.scale(-1,1);emo(g,'🚗',0,0,Math.round(u*.8));g.restore();if(!S.said&&!S.grab)txt(g,'Drag the car →',W/2,k.y+u*.75,W-20,14,C.mu)}
  if(v==='say'&&S.said<S.g.length){cards(2).forEach((r,j)=>card(g,`"${S.opts[j]}"`,r,S.bad===j));txt(g,`How does ${S.g[S.said]} sound?`,W/2,H*(A.narrow?.58:.56),W-20,16)}
  if(S.merge>0){g.globalAlpha=Math.min(1,S.merge);const y=H*(A.narrow?.84:.8);emo(g,S.pic,W/2-sz(70),y,sz(52));txt(g,S.word,W/2+sz(30),y,W/2,40,C.tx,800);g.globalAlpha=1}
  else if(v==='say'&&S.said>=S.g.length){const y=H*.8;emo(g,S.pic,W/2-sz(60),y,sz(46));txt(g,S.g.map(t=>PURE[t]).join(' – '),W/2+sz(40),y,W/2,24,C.tx,800)}}
 else{const y=H*(A.narrow?.32:.3);g.fillStyle=A.alpha(C.cy,.12);g.beginPath();g.arc(W/2,y,sz(62),0,7);g.fill();emo(g,S.pic,W/2,y,sz(72));
  txt(g,'Which word is this picture?',W/2,H*(A.narrow?.56:.56),W-20,16);cards(3).forEach((r,j)=>{if(S.grab&&S.grab.j===j&&S.grab.x!=null)return;card(g,S.opts[j],r,S.bad===j,28)});
  if(S.grab&&S.grab.x!=null){const r=cards(3)[0];card(g,S.opts[S.grab.j],{x:S.grab.x-r.w/2,y:S.grab.y-r.h/2,w:r.w,h:r.h},false,28)}}
 A.fx.draw(g)}
const miss=(t,j)=>{A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()};
function deal(){const v=part();Object.assign(S,{said:0,car:0,merge:0,bad:-1,grab:null,slip:'',go:0});
 if(v==='say'){const[gs,w,p]=SAY[S.k];S.g=gs.slice();S.word=w;S.pic=p;sayOpts()}
 if(v==='drive'||v==='long'){const[gs,w,p]=(v==='drive'?DRIVE:LONG)[S.k];S.g=gs.slice();S.word=w;S.pic=p}
 if(v==='join'){const[w,p,st]=JOIN[S.k];S.word=w;S.pic=p;S.lets=w.split('');S.J=[];S.todo=st.slice();rebuild()}
 if(v==='check'){const[w,p,o]=CHECK[S.k];S.word=w;S.pic=p;S.opts=o.slice(S.k).concat(o.slice(0,S.k))}}
function sayOpts(){const t=S.g[S.said];if(!t)return;const o=[PURE[t],UH[t]];S.opts=(S.k+S.said)%2?o.reverse():o}
function rebuild(){S.g=[];S.map=[];for(let i=0;i<S.lets.length;i++){S.map.push(i);if(S.J.includes(i)){S.g.push(S.lets[i]+S.lets[i+1]);i++}else S.g.push(S.lets[i])}}
const goal=()=>3;
function next(t){S.n++;A.sound.pop();if(S.n<goal()){const k=S.k,r=run;S.wait=1;setTimeout(()=>{if(S.k!==k||r!==run)return;S.wait=0;S.k++;deal();tell(t+' Next word.');buttons();A.redraw()},fast()?5:800);tell(t)}else{tell(t);buttons()}A.redraw();S.hook()}
function blendUp(){A.tween(S,{merge:1},fast()?1:700,'out')}
/* step 1: pick the pure sound for the lit letter */
function sayPick(j){if(part()!=='say'||S.n>=3||S.wait||S.said>=S.g.length)return;const t=S.g[S.said];if(S.opts[j]!==PURE[t])return miss(UHWHY[t]||'Say the sound, not the name.',j);
 S.said++;A.sound.tick();if(S.said<S.g.length){sayOpts();tell(`${PURE[t]}. Now the next sound.`);buttons();A.redraw()}else next(`${S.g.map(x=>PURE[x]).join(', ')}. Short, pure sounds for ${S.word}.`)}
/* the car says each sound as it passes the button, then pushes them together at the end */
function drove(){if(S.merge>0)return;const T=tiles(),x=carX();let got=0;while(S.said<S.g.length&&x>=T[S.said].cx){S.said++;got=1}
 if(got){A.sound.tick();tell(S.g.slice(0,S.said).map(t=>PURE[t]).join('… ')+'…')}
 if(S.car>=.98&&S.said>=S.g.length&&S.n<3&&!S.wait){S.car=1;blendUp();const v=part();next(`${S.g.map(t=>PURE[t]).join('-')}: push them together… ${S.word}!`+(v==='long'?` Both ${S.g[0]} and ${S.g[1]} are said.`:''))}A.redraw()}
function step(){if(!(part()==='drive'||part()==='long')||S.n>=3||S.wait||S.merge>0)return;const T=tiles(),k=track(),to=S.said<S.g.length?(T[S.said].cx-k.x0)/(k.x1-k.x0)+.01:1;
 A.tween(S,{car:Math.min(1,to)},fast()?1:400,'out',()=>{drove();buttons()})}
/* join two letters that make one sound */
function joinTap(i){if(part()!=='join'||S.n>=3||S.wait)return;const li=S.map[i],t=S.g[i];if(t.length>1)return tell(`${t} is already one sound.`);
 const s=S.todo.includes(li)?li:S.todo.includes(li-1)?li-1:-1;if(s<0)return miss(`${t} makes its own sound here. Find two letters that make one sound.`,i);
 S.todo=S.todo.filter(z=>z!==s);S.J.push(s);rebuild();A.sound.tick();
 if(S.todo.length){tell(`${S.lets[s]+S.lets[s+1]} is one sound. Is there another?`);buttons();A.redraw();return}
 S.said=S.g.length;blendUp();next(`${S.g.map(t=>PURE[t]).join('-')}: ${S.lets.length} letters but ${S.g.length} sounds. ${S.word}!`)}
/* read every sound: pick the word that matches the picture */
function choose(j){if(part()!=='check'||S.n>=3||S.wait)return;const w=S.opts[j],tg=S.word;if(w===tg){S.opts=[w,w,w].map((x,i)=>i===j?x:S.opts[i]);return next(`${tg.split('').join('-')}, ${tg}. Every sound matches the picture.`)}
 const i=[...tg].findIndex((ch,z)=>ch!==w[z]);miss(`${w} is ${w.split('').join('-')}. Check the ${['first','middle','last'][i]} sound: ${tg[i]}, not ${w[i]}.`,j)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='quiz'||S.n>=goal())return;
 if(v==='say'&&S.said<S.g.length)S.opts.forEach((o,j)=>B(o,()=>sayPick(j),`Say it: ${o}`));
 if((v==='drive'||v==='long')&&S.merge===0)B(S.said<S.g.length?'Drive ▶':'Push together ▶',step,S.said<S.g.length?'Drive the car to the next sound':'Push the sounds together');
 if(v==='join')S.g.forEach((t,i)=>{if(t.length<2)B(t,()=>joinTap(i),`Letter ${t}: join it with its partner`)});
 if(v==='check')S.opts.forEach((o,j)=>B(o,()=>choose(j),`The picture is ${o}`))}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=part();if(S.n>=goal()||S.wait)return false;
 if(v==='say'){const j=cards(2).findIndex(r=>inside(p,r));if(j>=0)sayPick(j)}
 if(v==='join'){const i=tiles().findIndex(r=>inside(p,{x:r.x,y:r.y-10,w:r.w,h:r.h+r.u*.6}));if(i>=0)joinTap(i)}
 if(v==='drive'||v==='long'){const k=track(),u=tiles()[0].u;if(S.merge===0&&Math.abs(p.y-k.y)<u*1.1&&p.x>carX()-u*.9){S.grab={x0:p.x,c0:S.car};return true}}
 if(v==='check'){const j=cards(3).findIndex(r=>inside(p,r));if(j>=0){S.grab={j,x:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){const d=S.grab;if(!d)return;const v=part();
 if(v==='check'){if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}return}
 const k=track();if(p.x<d.x0-30&&S.car<.05&&!S.slip){S.slip=1;tell('Blend from left to right. The first sound comes first.')}S.car=Math.max(S.car,Math.min(1,d.c0+(p.x-d.x0)/(k.x1-k.x0)));drove()}
function up(p){const d=S.grab;S.grab=null;if(!d)return;const v=part();
 if(v==='check'){if(d.x==null)return choose(d.j);const y=A.H*(A.narrow?.32:.3);if(Math.hypot(p.x-A.W/2,p.y-y)<sz(80))choose(d.j);else A.redraw();return}
 buttons();A.redraw()}
const finish=(n,msg)=>()=>{if(A.step===n&&S.n>=goal()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(f,gap){const k=++run,tick=()=>{if(k!==run||S.n>=goal())return;f();setTimeout(tick,fast()?40:gap)};setTimeout(tick,fast()?30:gap)}
const restart=()=>{run++;Object.assign(S,fresh());if(A)deal()};
const glide=()=>{if(!S.wait&&!S.go&&S.merge===0){S.go=1;A.tween(S,{car:1},fast()?1:650,'io',drove)}};
const steps=[
{h:'Pure sounds',p:'Each letter has a sound. Say it short, with no extra uh. Tap the right way to say it.',task:'Say the sounds in 3 words',
 show:()=>{steps[0].go();auto(()=>sayPick(S.opts.indexOf(PURE[S.g[S.said]])),250)},
 go:()=>{restart();tell('Sun. How does s sound?');buttons();S.hook=finish(0,'Pure sounds are short: sss, not suh. Then they join up.')}},
{h:'Blend it',p:'Drag the car under the sound buttons. Say each sound, then push them together.',predict:{q:'You say m… a… p and stop. Have you read the word?',opts:['Yes, I said the sounds','Not yet: push them together, map'],ans:1},task:'Blend 3 words',
 show:()=>{steps[1].go();auto(glide,250)},
 go:()=>{restart();tell('Drive the car from left to right.');buttons();S.hook=finish(1,'Say the sounds, then push them together to hear the word.')}},
{h:'Two letters, one sound',p:'Some letters team up: s and h make sh. Tap a letter in each team.',predict:{q:'Ship has 4 letters. How many sounds?',opts:['4, one for each letter','3: sh, i, p'],ans:1},task:'Join the teams in 3 words',
 show:()=>{steps[2].go();auto(()=>{const s=S.todo[0];if(s!=null)joinTap(S.map.indexOf(s))},350)},
 go:()=>{restart();tell('Ship. Which two letters make one sound?');buttons();S.hook=finish(2,'sh, ch and ck are two letters with one sound. Count sounds, not letters.')}},
{h:'Read every sound',p:'Do not guess from the first letter. Drag the word to the picture, or tap it.',task:'Match 3 pictures',
 show:()=>{steps[3].go();auto(()=>choose(S.opts.indexOf(S.word)),350)},
 go:()=>{restart();tell('Look at the picture. Read each word, all the way.');buttons();S.hook=finish(3,'Big and bag start the same. Read every sound to be sure.')}},
{h:'Two consonants',p:'In frog, f and r sit side by side. Say both, then blend.',predict:{q:'Frog starts f, r. What do you say?',opts:['Just f: f-o-g','Both: f-r-o-g'],ans:1},task:'Blend 3 longer words',
 show:()=>{steps[4].go();auto(glide,250)},
 go:()=>{restart();tell('Frog. Drive the car and keep every sound.');buttons();S.hook=finish(4,'Keep both sounds: f-r-o-g, s-t-o-p.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.hook()});
const QS=[['Blend: d-o-g. Which word?',[['dog','ok'],['god','order'],['dig','vowel']]],['How many sounds in chip?',[['3: ch-i-p','ok'],['4: c-h-i-p','split'],['2: ch-p','drop']]],
 ['Blend: s-t-o-p. Which word?',[['stop','ok'],['sop','drop'],['spot','order']]],['How should you say the first sound in mat?',[['mmm','ok'],['muh','uh'],['em','name']]],
 ['Blend: th-i-n. Which word?',[['thin','ok'],['tin','split'],['then','vowel']]],['The picture is a bag. Which word?',[['bag','ok'],['big','vowel'],['gab','order']]]];
function why(t){let m='Say each sound, then push them together.';
 if(t==='order')m='Blend from left to right. The first sound comes first.';if(t==='vowel')m='Check the middle sound too. a, e, i, o and u change the word.';
 if(t==='split')m='Two letters can make one sound: sh, ch, th, ck. Count them as one.';if(t==='drop')m='Keep every sound. When two consonants sit together, say both.';
 if(t==='uh')m='No extra uh. Muh-a-tuh is hard to blend. Say mmm.';if(t==='name')m='Em is the letter name. To read, use the sound: mmm.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! Every sound, blended.':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});A.every(()=>{const v=part();if((v==='drive'||v==='long')&&S.car>0&&S.merge===0)drove();return false});buttons()}});
A.start()})})();
