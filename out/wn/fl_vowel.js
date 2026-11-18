/* Flagship – vowel digraphs (ages 4–7). Join the two vowel letters that make one sound and see the sound buttons change
   (r-ai-n: 4 letters, 3 sounds), build words in phoneme frames with one box per sound, choose ai or ay and oi or oy by
   where the sound sits in the word, sort oo words by their long (moon) or short (book) sound, and post words into sound
   houses where ee and ea, ai and ay, oa and oe share a sound. Every drag has a big button twin. */
(()=>{
const JOIN=[{w:'rain',pic:'🌧️',at:1},{w:'tree',pic:'🌳',at:2},{w:'boat',pic:'⛵',at:1}];
const FRAME=[{w:'coin',pic:'🪙',g:['c','oi','n'],x:['o','i']},{w:'seed',pic:'🌱',g:['s','ee','d'],x:['e','ea']},{w:'moon',pic:'🌙',g:['m','oo','n'],x:['o','u']}];
const SPOT=[{pre:'pl',post:'',ans:'ay',pair:['ai','ay'],pic:'🛝',w:'play'},{pre:'tr',post:'n',ans:'ai',pair:['ai','ay'],pic:'🚂',w:'train'},{pre:'b',post:'',ans:'oy',pair:['oi','oy'],pic:'👦',w:'boy'},{pre:'s',post:'l',ans:'oi',pair:['oi','oy'],pic:'🪴',w:'soil'}];
const OO=[['food','🍲',0],['foot','🦶',1],['spoon','🥄',0],['look','👀',1],['zoo','🦓',0],['good','👍',1]];
const HOUSE=[['ee','ee, ea'],['ai','ai, ay'],['oa','oa, oe']],MAIL=[['tree','ee',0],['sea','ea',0],['rain','ai',1],['day','ay',1],['boat','oa',2],['toe','oe',2]];
const NEED=[3,3,3,6,6];
VIS.reg('flagvowel',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({k:0,n:0,busy:0,bad:-1,drag:null,after:()=>{},joined:0,fill:[],tray:[],put:'',fast:0}),S=blank();
const phase=()=>['join','frame','spot','oo','house','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),quick=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,maxw,px,col,wt){g.font=`${wt||800} ${z(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){rows.push(cur);cur=w}else cur=n});rows.push(cur);
 rows.forEach((s,i)=>g.fillText(s,x,y+(i-(rows.length-1)/2)*z(px)*1.22))}
function pic(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(g,r,fill,edge,lw){g.save();A.paint.shadow(6,2,.14);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=lw||2.5;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
const isV=ch=>'aeiou'.includes(ch);
/* letter tiles of the JOIN word; once joined, the two digraph letters share one wide tile */
function letters(){const it=JOIN[S.k%3],L=[...it.w],n=L.length,s=Math.min(z(66),(A.W-30)/(n+.3*(n-1))),gap=s*.3,y=A.H*.32;let x=(A.W-(n*s+(n-1)*gap))/2;
 return L.map((ch,i)=>{const r={ch,i,x,y,w:s,h:s*1.15};x+=s+(S.joined&&i===it.at?gap*.12:gap);return r})}
const hooks=()=>{const T=letters();return T.slice(0,-1).map((r,i)=>({i,x:(r.x+r.w+T[i+1].x)/2,y:r.y+r.h+z(26)}))};
function soundButtons(g,T,at){const C=A.col;let i=0;while(i<T.length){const two=S.joined&&i===at,a=T[i],b=two?T[i+1]:a,y=a.y+a.h+z(14);g.fillStyle=two?C.vi:C.tx;
 if(two){A.paint.rrect(a.x+6,y-3,b.x+b.w-a.x-12,7,4);g.fill()}else{g.beginPath();g.arc(a.x+a.w/2,y,z(5),0,7);g.fill()}i+=two?2:1}}
/* phoneme frame: one box per sound; tray tiles underneath */
function boxes(){const n=3,w=Math.min(z(92),(A.W-40)/3.3),h=z(74),y=A.H*.36,x0=(A.W-(n*w+(n-1)*w*.15))/2;return Array.from({length:n},(_,j)=>({x:x0+j*w*1.15,y,w,h}))}
function trayRects(list){const n=list.length,w=Math.min(z(80),(A.W-24-(n-1)*10)/n),h=z(64),x0=(A.W-(n*w+(n-1)*10))/2;return list.map((_,j)=>({x:x0+j*(w+10),y:A.H-h-14,w,h}))}
function wordRow(){const it=SPOT[S.k%4],parts=[...it.pre].map(t=>({t})).concat([{t:S.put,gap:1}]).concat([...it.post].map(t=>({t}))),s=Math.min(z(64),(A.W-30)/(parts.length+1.4)),y=A.H*.36;
 const tw=parts.reduce((a,p)=>a+(p.gap?s*1.7:s),0)+(parts.length-1)*s*.2;let x=(A.W-tw)/2;return parts.map(p=>{const w=p.gap?s*1.7:s,r={...p,x,y,w,h:s*1.15};x+=w+s*.2;return r})}
function bins(n){const w=(A.W-24-(n-1)*10)/n,h=z(n>2?92:104);return Array.from({length:n},(_,j)=>({x:12+j*(w+10),y:A.H-h-12,w,h}))}
const centre=()=>({x:A.W/2,y:A.H*.36});
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),d=S.drag;
 if(p==='quiz'){txt(g,'Two vowel letters, one sound: ai, ay, ee, ea, oa, oe, oo, oi, oy.',W/2,H*.45,W-40,18);return}
 if(p==='join'){const it=JOIN[S.k%3],T=letters();pic(g,it.pic,W/2,H*.13,z(50));
  T.forEach((r,i)=>{const dig=S.joined&&(i===it.at||i===it.at+1),bad=S.bad===i;card(g,r,bad?A.mix(C.pn,C.rd,.22):dig?A.mix(C.pn,C.vi,.2):isV(r.ch)?A.mix(C.pn,C.am,.12):C.pn,bad?C.rd:dig?C.vi:C.ln,dig?3.5:2.5);txt(g,r.ch,r.x+r.w/2,r.y+r.h/2,r.w,34,C.tx,800)});
  soundButtons(g,T,it.at);if(!S.joined)hooks().forEach(h=>{g.strokeStyle=C.am;g.lineWidth=2.5;g.fillStyle=C.pn;g.beginPath();g.arc(h.x,h.y,z(15),0,7);g.fill();g.stroke();txt(g,'+',h.x,h.y,z(20),18,C.tx)});
  if(d&&d.x!=null){g.strokeStyle=C.vi;g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(d.x0,d.y0);g.lineTo(d.x,d.y);g.stroke()}
  txt(g,S.joined?`${it.w}: ${it.w.length} letters, ${it.w.length-1} sounds`:'Which two letters make one sound?',W/2,H*.72,W-30,16,C.tx)}
 if(p==='frame'){const it=FRAME[S.k%3],B=boxes(),R=trayRects(S.tray);pic(g,it.pic,W/2,H*.15,z(52));
  B.forEach((r,j)=>{const t=S.fill[j];card(g,r,t?A.mix(C.pn,C.gr,.14):A.alpha(C.cy,.06),t?C.gr:C.cy,t?3:2);if(t)txt(g,t,r.x+r.w/2,r.y+r.h/2,r.w,30,C.tx);else if(j===S.fill.length){g.fillStyle=A.alpha(C.cy,.5);g.beginPath();g.arc(r.x+r.w/2,r.y+r.h-z(10),z(4),0,7);g.fill()}});
  txt(g,S.fill.length>=3?`${it.w}: ${it.g.join('-')}`:'One box for each sound.',W/2,H*.58,W-30,15,C.tx);
  S.tray.forEach((t,j)=>{if(d&&d.j===j&&d.x!=null)return;const bad=S.bad===j;card(g,R[j],bad?A.mix(C.pn,C.rd,.22):C.pn,bad?C.rd:C.am,3);txt(g,t,R[j].x+R[j].w/2,R[j].y+R[j].h/2,R[j].w,26,C.tx)});
  if(d&&d.x!=null){const r=R[d.j];card(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},C.pn,C.am,3);txt(g,S.tray[d.j],d.x,d.y,r.w,26,C.tx)}}
 if(p==='spot'){const it=SPOT[S.k%4],T=wordRow(),R=trayRects(it.pair);pic(g,it.pic,W/2,H*.15,z(52));
  T.forEach(r=>{card(g,r,r.gap?(S.put?A.mix(C.pn,C.gr,.16):A.alpha(C.am,.08)):C.pn,r.gap?(S.put?C.gr:C.am):C.ln,r.gap?3:2);if(r.t)txt(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w,30,C.tx)});
  txt(g,it.post?'The sound is in the middle.':'The sound is at the end.',W/2,H*.6,W-30,15,C.tx);
  it.pair.forEach((t,j)=>{if(d&&d.j===j&&d.x!=null)return;const bad=S.bad===j;card(g,R[j],bad?A.mix(C.pn,C.rd,.22):C.pn,bad?C.rd:C.vi,3);txt(g,t,R[j].x+R[j].w/2,R[j].y+R[j].h/2,R[j].w,28,C.tx)});
  if(d&&d.x!=null){const r=R[d.j];card(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},C.pn,C.vi,3);txt(g,it.pair[d.j],d.x,d.y,r.w,28,C.tx)}}
 if(p==='oo'||p==='house'){const B=bins(p==='oo'?2:3),cur=p==='oo'?OO[S.k]:MAIL[S.k];
  B.forEach((r,j)=>{card(g,r,S.bad===j?A.mix(C.pn,C.rd,.2):A.alpha(j?C.vi:C.cy,.1),S.bad===j?C.rd:j?C.vi:C.cy,3);
   if(p==='oo'){pic(g,j?'📖':'🌙',r.x+r.w/2,r.y+r.h*.36,z(34));txt(g,j?'oo in book':'oo in moon',r.x+r.w/2,r.y+r.h-z(16),r.w-8,14,C.tx)}
   else{pic(g,'🏠',r.x+r.w/2,r.y+r.h*.3,z(28));txt(g,'says '+HOUSE[j][0],r.x+r.w/2,r.y+r.h*.62,r.w-6,14,C.tx);txt(g,HOUSE[j][1],r.x+r.w/2,r.y+r.h-z(13),r.w-6,12,C.tx,700)}});
  const done=p==='oo'?OO.slice(0,S.k).map(o=>o[0]):MAIL.slice(0,S.k).map(o=>o[0]);txt(g,done.length?'Sorted: '+done.join(', '):'',W/2,H*.09,W-30,13,C.tx,700);
  if(cur){const at=d&&d.x!=null?d:centre(),r={x:at.x-z(84),y:at.y-z(44),w:z(168),h:z(88)};card(g,r,C.pn,C.am,3);
   if(p==='oo'){pic(g,cur[1],at.x-z(44),at.y,z(36));txt(g,cur[0],at.x+z(26),at.y,z(96),26,C.tx)}else{const w=cur[0],i=w.indexOf(cur[1]);txt(g,w,at.x,at.y-z(6),z(150),28,C.tx);
    g.font=`800 ${z(28)}px system-ui,sans-serif`;const full=g.measureText(w).width,x0=at.x-full/2+g.measureText(w.slice(0,i)).width,ww=g.measureText(cur[1]).width;g.fillStyle=C.vi;A.paint.rrect(x0,at.y+z(14),ww,5,3);g.fill()}}}
 A.fx.draw(g)}
function miss(t,j){A.sound.miss();S.bad=j==null?-1:j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1100);A.redraw()}
function win(t,next){S.n++;A.sound.pop();say(t);buttons();A.redraw();S.after();if(S.n<NEED[A.step]&&next){const g0=gen,k0=S.k;S.busy=1;setTimeout(()=>{if(g0!==gen||S.k!==k0)return;S.busy=0;next();buttons();A.redraw()},quick()?5:1300)}}
function join(i){if(phase()!=='join'||S.busy||S.joined)return;const it=JOIN[S.k%3],L=it.w;
 if(i!==it.at){const a=L[i],b=L[i+1];return miss(isV(a)&&isV(b)?`${a} and ${b} are both vowels, but here they are two sounds.`:`${a} and ${b} are two sounds. Say them: ${a}… ${b}… Find the two letters that make one sound.`,i)}
 S.joined=1;const pts=[...L.slice(0,i)].concat([L.substr(i,2)]).concat([...L.slice(i+2)]);win(`${L.substr(i,2)} is one sound. ${pts.join('-')}: ${L.length} letters, ${pts.length} sounds.`,()=>{S.k++;S.joined=0;say(`${JOIN[S.k%3].w}. Join the two letters that make one sound.`)})}
function newFrame(){const it=FRAME[S.k%3];S.fill=[];S.tray=[it.g[1],it.g[2],it.x[0],it.g[0],it.x[1]]}
function place(j){if(phase()!=='frame'||S.busy||S.fill.length>=3)return;const it=FRAME[S.k%3],t=S.tray[j],want=it.g[S.fill.length];if(t==null)return;
 if(t!==want){if(it.x.includes(t)&&want.length===2&&want.includes(t))return miss(`${t} on its own makes a short sound. In ${it.w}, two letters make the middle sound: ${want}.`,j);
  if(t.length===2&&want.length===2)return miss(`${t} can make that sound too, but ${it.w} is spelt with ${want}.`,j);if(it.x.includes(t))return miss(`${t} on its own is not one of the sounds in ${it.w}. Say it slowly: ${it.g.join('-')}.`,j);return miss(`Say it slowly: ${it.g.join('-')}. Which sound comes next?`,j)}
 S.fill.push(t);S.tray.splice(j,1);A.sound.tick();if(S.fill.length<3){say(`${t}. Next sound?`);buttons();return A.redraw()}
 win(`${it.w}: ${it.g.join('-')}. 3 sounds, 3 boxes, ${it.w.length} letters.`,()=>{S.k++;newFrame();say(`${FRAME[S.k%3].w}. Fill one box for each sound.`)})}
function choose(j){if(phase()!=='spot'||S.busy||S.put)return;const it=SPOT[S.k%4],t=it.pair[j];
 if(t!==it.ans)return miss(it.post?`${t} usually goes at the end of a word. In the middle, use ${it.ans}: ${it.w}.`:`${t} usually goes in the middle of a word. At the end, use ${it.ans}: ${it.w}.`,j);
 S.put=t;win(`${it.w}! ${it.ans} ${it.post?'in the middle':'at the end'}.`,()=>{S.k++;S.put='';const nx=SPOT[S.k%4];say(`${nx.w}. Which spelling?`)})}
function post(j){const p=phase();if((p!=='oo'&&p!=='house')||S.busy)return;const list=p==='oo'?OO:MAIL,cur=list[S.k];if(!cur)return;
 if(p==='oo'){if(cur[2]!==j)return miss(`Say it: ${cur[0]}. ${cur[2]?'A short oo, like book.':'A long oo, like moon.'}`,j)}
 else if(cur[2]!==j)return miss(`${cur[0]} has ${cur[1]}. ${cur[1]} says ${HOUSE[cur[2]][0]}, so it lives in the ${HOUSE[cur[2]][0]} house.`,j);
 S.k++;win(p==='oo'?`${cur[0]}: ${cur[2]?'short oo, like book':'long oo, like moon'}.`:`${cur[0]}: ${cur[1]} says ${HOUSE[cur[2]][0]}.`)}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=NEED[A.step]||S.busy)return;
 if(p==='join'&&!S.joined){const L=JOIN[S.k%3].w;[...L].slice(0,-1).forEach((ch,i)=>B(`${ch} + ${L[i+1]}`,()=>join(i),`Join ${ch} and ${L[i+1]}`))}
 if(p==='frame')S.tray.forEach((t,j)=>B(t,()=>place(j),`Put ${t} in the next box`));
 if(p==='spot'&&!S.put)SPOT[S.k%4].pair.forEach((t,j)=>B(t,()=>choose(j),`Fill the gap with ${t}`));
 if(p==='oo')[['🌙 oo in moon','moon'],['📖 oo in book','book']].forEach(([t,l],j)=>B(t,()=>post(j),'Sounds like '+l));
 if(p==='house')HOUSE.forEach((h,j)=>B('🏠 '+h[0],()=>post(j),'Post it to the '+h[0]+' house'))}
const within=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h,grown=r=>({x:r.x-24,y:r.y-24,w:r.w+48,h:r.h+48}),near=(q,o,r)=>Math.hypot(q.x-o.x,q.y-o.y)<r;
function down(q){const p=phase();if(p==='quiz'||S.busy)return false;
 if(p==='join'){if(S.joined)return false;const h=hooks().find(o=>near(q,o,z(22)));if(h){join(h.i);return false}const t=letters().find(r=>within(q,r));if(!t)return false;S.drag={i:t.i,x0:t.x+t.w/2,y0:t.y+t.h/2,x:null};return true}
 if(p==='frame'||p==='spot'){const list=p==='frame'?S.tray:SPOT[S.k%4].pair,j=trayRects(list).findIndex(r=>within(q,r));if(j<0)return false;S.drag={j,x:null,x0:q.x,y0:q.y};return true}
 if(p==='oo'||p==='house'){const j=bins(p==='oo'?2:3).findIndex(r=>within(q,r));if(j>=0){post(j);return false}if(near(q,centre(),z(90))){S.drag={x:null,x0:q.x,y0:q.y};return true}}return false}
function move(q){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag,p=phase();S.drag=null;if(!d)return A.redraw();
 if(p==='join'){const t=letters().find(r=>within(q,grown(r)));if(t&&Math.abs(t.i-d.i)===1)return join(Math.min(t.i,d.i));if(d.x!=null)say('Drag from one letter to the letter next to it.');return A.redraw()}
 if(p==='frame'){if(d.x==null||within(q,grown(boxes()[Math.min(2,S.fill.length)])))return place(d.j);say('Drop it in the next empty box.');return A.redraw()}
 if(p==='spot'){const gp=wordRow().find(r=>r.gap);if(d.x==null||within(q,grown(gp)))return choose(d.j);say('Drop it in the gap.');return A.redraw()}
 if(d.x==null)return A.redraw();const j=bins(p==='oo'?2:3).findIndex(r=>within(q,grown(r)));if(j>=0)post(j);else{say('Drop the card on a box.');A.redraw()}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=NEED[i]&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++gen,go=()=>{if(k!==gen||S.n>=NEED[A.step])return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function oneMove(){const p=phase();if(S.busy)return;if(p==='join')return join(JOIN[S.k%3].at);if(p==='frame')return place(S.tray.indexOf(FRAME[S.k%3].g[S.fill.length]));
 if(p==='spot'){const it=SPOT[S.k%4];return choose(it.pair.indexOf(it.ans))}if(p==='oo')return post(OO[S.k][2]);if(p==='house')return post(MAIL[S.k][2])}
const show=i=>()=>{steps[i].go();S.fast=1;auto(oneMove)};
const steps=[
{h:'Two letters, one sound',p:'Drag from one letter to the next, or tap a + between them, to join the two letters that make one sound.',predict:{q:'How many sounds are in rain?',opts:['4, one for each letter','3: r-ai-n'],ans:1},task:'Join the sound in 3 words',show:show(0),
 go:()=>{reset();say('rain. Join the two letters that make one sound.');buttons();S.after=finish(0,'A vowel digraph is two letters that make one sound. Count sounds, not letters.')}},
{h:'One box, one sound',p:'Drag a tile into the next box, or tap it. Each box holds one sound, even if it has two letters.',predict:{q:'coin has 4 letters. How many sound boxes does it need?',opts:['4 boxes','3 boxes'],ans:1},task:'Build 3 words',show:show(1),
 go:()=>{reset();newFrame();say('coin. Fill one box for each sound.');buttons();S.after=finish(1,'The digraph shares one box: c-oi-n, s-ee-d, m-oo-n.')}},
{h:'Middle or end?',p:'Drag ai or ay (or oi or oy) into the gap. Look where the gap is.',predict:{q:'Which spelling usually goes at the end of a word?',opts:['ai, like plai','ay, like play'],ans:1},task:'Fix 3 words',show:show(2),
 go:()=>{reset();say('play. Which spelling?');buttons();S.after=finish(2,'ay and oy usually go at the end (play, boy). ai and oi go in the middle (train, soil).')}},
{h:'Moon or book?',p:'Say the word. Is it a long oo, like moon, or a short oo, like book? Drag the card to a box.',predict:{q:'Do moon and book have the same oo sound?',opts:['Yes, the same','No, two sounds'],ans:1},task:'Sort 6 oo words',show:show(3),
 go:()=>{reset();say('food. Long oo or short oo?');buttons();S.after=finish(3,'oo can be long, as in moon and food, or short, as in book and foot.')}},
{h:'Sound houses',p:'Some sounds have two spellings. Post each word into the house for its sound.',task:'Post 6 words',show:show(4),
 go:()=>{reset();say('tree. Which sound house?');buttons();S.after=finish(4,'ee and ea both say ee. ai and ay both say ai. oa and oe both say oa.')}},
{h:'Challenge',p:'',go:()=>{reset();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['How many sounds are in boat?',[['3: b-oa-t','ok'],['4: b-o-a-t','letters'],['2: b-oat','chunk']]],
 ['Which word is spelt right?',[['play','ok'],['plai','aiend'],['pla','single']]],
 ['Which word has the same oo sound as book?',[['foot','ok'],['moon','long'],['boat','oa']]],
 ['Which two spellings both say ee?',[['ee and ea','ok'],['ee and ai','mix'],['oa and oe','other']]],
 ['coin: which letters make the middle sound?',[['oi','ok'],['oy','oyin'],['o','single']]]];
function why(t){let m='Two vowel letters can make one sound.';
 if(t==='letters')m='Count sounds, not letters. oa is two letters but one sound: b-oa-t.';if(t==='chunk')m='Too few. Say it slowly: b, oa, t. That is 3 sounds.';
 if(t==='aiend')m='ai usually goes in the middle. At the end of a word, use ay: play.';if(t==='single')m='One letter is not enough here. The long sound needs two letters.';
 if(t==='long')m='moon has a long oo. book and foot share the short oo.';if(t==='oa')m='boat has oa, not oo. Listen for the short oo in book: foot.';
 if(t==='mix')m='ai says ai, as in rain. ee and ea both say ee: tree, sea.';if(t==='other')m='oa and oe both say oa, as in boat and toe. For ee, it is ee and ea.';
 if(t==='oyin')m='oy usually goes at the end, like boy. In the middle, use oi: coin.';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You can spot a vowel digraph.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
