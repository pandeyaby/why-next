/* Flagship – segmenting words into sounds for spelling (ages 4–7). Sound boxes (Elkonin boxes): say the word slowly,
   give each sound its own box, then write a letter or letters for each box. Pick the strip with one box per sound,
   drop the vowel into the empty middle box, put back the lost sound in a blend (fog → frog), and spell whole words
   with letter tiles, where sh, ck and ch fill one box. Every drag has a big button twin. */
(()=>{
const COUNT=[{w:'cat',e:'🐱',s:['c','a','t']},{w:'ship',e:'🚢',s:['sh','i','p']},{w:'frog',e:'🐸',s:['f','r','o','g']},
 {w:'egg',e:'🥚',s:['e','gg']},{w:'fish',e:'🐟',s:['f','i','sh']},{w:'tent',e:'⛺',s:['t','e','n','t']}];
const MID=[{w:'cat',e:'🐱',v:'a'},{w:'bed',e:'🛏️',v:'e'},{w:'pig',e:'🐷',v:'i'},{w:'dog',e:'🐶',v:'o'},{w:'sun',e:'☀️',v:'u'}];
const VOW=['a','e','i','o','u'],SAYV={a:'a, as in apple',e:'e, as in egg',i:'i, as in ink',o:'o, as in on',u:'u, as in up'};
const BLEND=[{w:'frog',e:'🐸',gap:1,ops:['r','l','g']},{w:'stop',e:'🛑',gap:1,ops:['t','p','n']},{w:'hand',e:'✋',gap:2,ops:['n','m','d']},{w:'tent',e:'⛺',gap:2,ops:['n','s','k']}];
const SPELL=[{w:'ship',e:'🚢',s:['sh','i','p'],ops:['s','h','sh','i','p']},{w:'duck',e:'🦆',s:['d','u','ck'],ops:['d','ck','k','u','o']},{w:'chick',e:'🐤',s:['ch','i','ck'],ops:['c','ch','i','e','ck']}];
VIS.reg('flagsegbox',c=>{let A,pad,quiz,qn=-1,run=0,row=0;c.fig.classList.add('young');
const fresh=()=>({at:0,got:0,need:3,bad:-1,fill:[],held:null,hot:[],after:()=>{},fast:0,shown:0}),S=fresh();
const mode=()=>['hi','count','mid','blend','spell','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1:1.12)),fast=()=>A.reduced()||S.fast;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,s,x,y,w,size,col,wt){g.font=`${wt||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[''];String(s).split(' ').forEach(p=>{const k=L.length-1,t=L[k]?L[k]+' '+p:p;if(L[k]&&g.measureText(t).width>w)L.push(p);else L[k]=t});
 L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*z(size)*1.3))}
function emo(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(g,r,tone,lw,dash){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi}[tone];g.save();if(!dash){A.paint.shadow(5,2,.12);g.fillStyle=h?A.mix(C.pn,h,.16):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([7,6]);g.lineWidth=lw||(h?3:1.5);g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
/* the row of sound boxes for the current word */
function boxes(n,y){const gap=8,w=Math.min(z(76),(A.W-30-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return[...Array(n)].map((_,i)=>({x:x0+i*(w+gap),y:y||A.H*.3,w,h:z(70)}))}
function tiles(list,y,h){const n=list.length,gap=8,w=Math.min(z(92),(A.W-20-gap*(n-1))/n),x0=(A.W-(w*n+gap*(n-1)))/2,d=S.held;
 return list.map((v,i)=>d&&d.i===i&&d.x!=null?{x:d.x-w/2,y:d.y-(h||z(64))/2,w,h:h||z(64),v}:{x:x0+i*(w+gap),y:y||A.H*.74,w,h:h||z(64),v})}
const word=()=>({count:COUNT,mid:MID,blend:BLEND,spell:SPELL}[mode()]||[])[S.at];
const strips=()=>{const gap=8,w=(A.W-20-gap*2)/3;return[2,3,4].map((n,i)=>{const d=S.held;if(d&&d.i===i&&d.x!=null)return{x:d.x-w/2,y:d.y-z(40),w,h:z(80),v:n};return{x:10+i*(w+gap),y:A.H*.68,w,h:z(80),v:n}})};
const zone=()=>({x:10,y:A.H*.06,w:A.W-20,h:A.H*.5});
function letters(g,r,s,col){txt(g,s,r.x+r.w/2,r.y+r.h/2,r.w,s.length>1?26:32,col||A.col.tx,900)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode(),wd=word();
 if(m==='quiz'){txt(g,'Say the word slowly. One box for each sound. Then write the letters for each sound.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(m==='hi'){emo(g,'☀️',W/2,H*.15,z(54));txt(g,'sun',W/2,H*.31,W,22,C.mu,800);const b=boxes(3,H*.42);['s','u','n'].forEach((s,i)=>{card(g,b[i],'cy',3);letters(g,b[i],s)});
  txt(g,'s … u … n: three sounds, three boxes',W/2,H*.7,W-30,17,C.tx,800);txt(g,'Say it slowly, like stretching a rubber band.',W/2,H*.84,W-30,14,C.mu,700);return}
 emo(g,wd.e,W/2,H*.1,z(46));
 if(m==='count'){txt(g,wd.w,W/2,H*.2,W,22,C.mu,800);
  if(S.shown){const b=boxes(wd.s.length,H*.3);b.forEach((r,i)=>{card(g,r,'ok',3);letters(g,r,wd.s[i])});txt(g,`${wd.s.join(' … ')}: ${wd.s.length} sounds`,W/2,H*.53,W-30,16,C.tx,800)}
  else txt(g,'How many sounds? Drag the strip with one box for each sound up here, or tap it.',W/2,H*.4,W-40,15,C.tx,800);
  const st=strips();S.hot=st;st.forEach((r,i)=>{card(g,r,S.bad===i?'no':'vi',3);const n=r.v,bw=Math.min(z(24),(r.w-20)/n-4);for(let k=0;k<n;k++){g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x+r.w/2-(n*(bw+4))/2+k*(bw+4)+2,r.y+z(12),bw,bw)}
   txt(g,n+' boxes',r.x+r.w/2,r.y+r.h-z(18),r.w-6,15,C.tx,800)})}
 if(m==='mid'){const b=boxes(3);const done=S.fill.includes(S.at);
  b.forEach((r,i)=>{if(i===1&&!done){card(g,r,S.bad===9?'no':'am',3,1);txt(g,'?',r.x+r.w/2,r.y+r.h/2,r.w,28,C.mu,800)}else{card(g,r,i===1?'ok':'cy',3);letters(g,r,wd.w[i])}});
  txt(g,done?`${wd.w[0]} … ${wd.v} … ${wd.w[2]}: ${wd.w}`:`Say ${wd.w} slowly. What sound is in the middle?`,W/2,H*.56,W-30,16,C.tx,800);
  if(!done){const t=tiles(VOW);S.hot=t;t.forEach((r,i)=>{card(g,r,S.bad===i?'no':'vi',3);letters(g,r,r.v)})}else S.hot=[]}
 if(m==='blend'){const n=wd.w.length,b=boxes(n),done=S.fill.includes(S.at);
  b.forEach((r,i)=>{if(i===wd.gap&&!done){card(g,r,S.bad===9?'no':'am',3,1);txt(g,'?',r.x+r.w/2,r.y+r.h/2,r.w,28,C.mu,800)}else{card(g,r,i===wd.gap?'ok':'cy',3);letters(g,r,wd.w[i])}});
  const lost=wd.w.slice(0,wd.gap)+wd.w.slice(wd.gap+1);
  txt(g,done?`${wd.w.split('').join(' … ')}: both sounds are there.`:`Max wrote “${lost}”. Say ${wd.w} slowly. Which sound did he miss?`,W/2,H*.56,W-30,16,C.tx,800);
  if(!done){const t=tiles(wd.ops);S.hot=t;t.forEach((r,i)=>{card(g,r,S.bad===i?'no':'vi',3);letters(g,r,r.v)})}else S.hot=[]}
 if(m==='spell'){const b=boxes(wd.s.length);b.forEach((r,i)=>{const f=S.fill[i];if(f==null){card(g,r,i===S.fill.length?(S.bad===9?'no':'am'):'cy',2,1)}else{card(g,r,'ok',3);letters(g,r,f)}});
  txt(g,S.fill.length>=wd.s.length?`${wd.s.join(' … ')}: ${wd.w}`:`Spell ${wd.w}. Fill the boxes from left to right.`,W/2,H*.56,W-30,16,C.tx,800);
  if(S.fill.length<wd.s.length){const t=tiles(wd.ops);S.hot=t;t.forEach((r,i)=>{card(g,r,S.bad===i?'no':'vi',3);letters(g,r,r.v)})}else S.hot=[]}
 A.fx.draw(g)}
function miss(t,j){A.sound.miss();S.bad=j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1300);A.redraw()}
function point(t){S.got++;A.sound.pop();say(t);pad_();A.redraw();S.after()}
function later(f,ms){const k=run,at=S.at;setTimeout(()=>{if(k!==run||S.at!==at||S.got>=S.need)return;f()},fast()?5:ms)}
function next(){S.at++;S.fill=[];S.shown=0;say('Next word.');pad_();A.redraw()}
function count(i){if(mode()!=='count'||S.got>=S.need||S.shown)return;const wd=COUNT[S.at],n=[2,3,4][i],k=wd.s.length;
 if(n!==k){let m=`Say it slowly: ${wd.s.join(' … ')}. That is ${k} sounds, so ${k} boxes.`;
  if(n>k&&wd.w.length>k)m=`${wd.w} has ${wd.w.length} letters but ${k} sounds: ${wd.s.join(' … ')}. ${wd.s.find(s=>s.length>1)} is one sound, so it gets one box.`;
  if(n<k&&wd.s.length===4)m=`Listen for two sounds side by side: ${wd.s.join(' … ')}. Each one needs its own box, so ${k} boxes.`;return miss(m,i)}
 S.shown=1;point(`${wd.w}: ${wd.s.join(' … ')}. ${k} sounds, ${k} boxes.`);later(next,1500)}
function vowel(i){if(mode()!=='mid'||S.got>=S.need||S.fill.includes(S.at))return;const wd=MID[S.at],v=VOW[i];
 if(v!==wd.v)return miss(`${wd.w[0]}-${v}-${wd.w[2]} is not ${wd.w}. Say ${wd.w} slowly: the middle sound is ${SAYV[wd.v]}.`,i);
 S.fill.push(S.at);point(`${wd.w}: the middle sound is ${wd.v}. Every word needs its vowel sound.`);later(next,1300)}
function blend(i){if(mode()!=='blend'||S.got>=S.need||S.fill.includes(S.at))return;const wd=BLEND[S.at],v=wd.ops[i],want=wd.w[wd.gap];
 if(v!==want)return miss(`Put ${v} in and it says ${wd.w.slice(0,wd.gap)+v+wd.w.slice(wd.gap+1)}, not ${wd.w}. Stretch ${wd.w}: ${wd.w.split('').join(' … ')}.`,i);
 S.fill.push(S.at);point(`${wd.w}: ${wd.w.split('').join(' … ')}. Two sounds side by side, and you hear both.`);later(next,1400)}
function spell(i){if(mode()!=='spell'||S.got>=S.need)return;const wd=SPELL[S.at],v=wd.ops[i],k=S.fill.length,want=wd.s[k];if(k>=wd.s.length)return;
 if(v!==want){let m=`Say ${wd.w} slowly. Sound ${k+1} is ${want}. Find the tile that writes it.`;
  if(want.length>1&&want.includes(v))m=`${want} is one sound, so it goes in one box as one tile. ${v} on its own says something else.`;
  else if(v.length>1&&k<wd.s.length&&!wd.s.includes(v))m=`${v} does not fit here. Listen: ${wd.s.join(' … ')}.`;
  else if(wd.s.includes(v))m=`${v} is in ${wd.w}, but not yet. Fill the boxes in order: sound ${k+1} first.`;return miss(m,i)}
 S.fill.push(v);A.sound.tick();if(S.fill.length<wd.s.length){say(`${v}. Next sound.`);return A.redraw()}
 point(`${wd.w}: ${wd.s.join(' … ')}. ${wd.s.length} sounds, ${wd.s.length} boxes.`);later(next,1500)}
const pick=i=>({count,mid:vowel,blend,spell}[mode()]||(()=>{}))(i);
function pad_(){if(!pad)return;pad.innerHTML='';const m=mode(),wd=word(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if(m==='count'&&!S.shown)[2,3,4].forEach((n,i)=>B(n+' boxes',()=>count(i),`${wd.w} has ${n} sounds`));
 if(m==='mid'&&!S.fill.includes(S.at))VOW.forEach((v,i)=>B(v,()=>vowel(i),`Put ${v} in the middle box of ${wd.w}`));
 if(m==='blend'&&!S.fill.includes(S.at))wd.ops.forEach((v,i)=>B(v,()=>blend(i),`Put the missing sound ${v} back into ${wd.w}`));
 if(m==='spell'&&S.fill.length<wd.s.length)wd.ops.forEach((v,i)=>B(v,()=>spell(i),`Write ${v} in the next box of ${wd.w}`))}
const inside=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;const i=S.hot.findIndex(r=>inside(p,r,4));if(i<0)return false;S.held={i,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.held;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.held;S.held=null;if(!d)return;if(d.x==null)return pick(d.i);
 if(inside(p,zone(),10))return pick(d.i);say(mode()==='count'?'Drop the strip up by the picture.':'Drop the tile on the boxes.');A.redraw()}
const done=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++run,go=()=>{if(k!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function right(){const m=mode(),wd=word();if(!wd)return;if(m==='count'&&!S.shown)return count(wd.s.length-2);if(m==='mid'&&!S.fill.includes(S.at))return vowel(VOW.indexOf(wd.v));
 if(m==='blend'&&!S.fill.includes(S.at))return blend(wd.ops.indexOf(wd.w[wd.gap]));if(m==='spell'&&S.fill.length<wd.s.length)return spell(wd.ops.indexOf(wd.s[S.fill.length]))}
const demo=i=>()=>{steps[i].go();S.fast=1;auto(right)};
const steps=[
{h:'Sound boxes',p:'To spell a word, say it slowly and split it into its sounds. This is called segmenting. Each sound gets its own box. Then you write the letters for each box.',
 go:()=>{reset();say('sun: s, u, n. Three sounds, three boxes.')}},
{h:'One box for each sound',p:'Say the word slowly. Count the sounds, not the letters. Pick the strip with one box for each sound.',predict:{q:'ship has 4 letters. How many sound boxes does it need?',opts:['4, one for each letter','3: sh … i … p'],ans:1},task:'Count the sounds in 4 words',show:demo(1),
 go:()=>{reset();S.need=4;say('How many sounds? Drag the right strip up to the picture, or tap it.');pad_();S.after=done(1,'Count sounds, not letters: sh and gg are one sound each. In frog and tent you hear two sounds side by side.')}},
{h:'The middle sound',p:'The middle sound is easy to miss. Say the word slowly and listen for the vowel sound in the middle.',predict:{q:'Can you spell cat as c, t?',opts:['Yes, ct is fine','No, cat needs its middle sound a'],ans:1},task:'Fill the middle box in 4 words',show:demo(2),
 go:()=>{reset();S.need=4;say('Drag a vowel into the middle box, or tap one.');pad_();S.after=done(2,'Every word has a vowel sound. Stretch the word to hear it: c … a … t.')}},
{h:'Two sounds side by side',p:'In frog, f and r sit side by side. You hear both. Stretch the word so no sound gets lost.',predict:{q:'Max spells frog as fog. Is that right?',opts:['Yes, f says fr','No, the r sound is missing'],ans:1},task:'Put back 3 lost sounds',show:demo(3),
 go:()=>{reset();S.need=3;say('Which sound is missing? Drag it into the empty box, or tap it.');pad_();S.after=done(3,'In a blend like fr, st or nd, each sound gets its own box and its own letter.')}},
{h:'Spell it',p:'Now spell the whole word. Say a sound, find its letters, put them in the box. Some sounds need two letters, like sh, ch and ck.',predict:{q:'To spell ship, which goes in the first box?',opts:['s, then h in the next box','sh, both in one box'],ans:1},task:'Spell 3 words',show:demo(4),
 go:()=>{reset();S.need=3;say('Tap the letters for each sound, from left to right.');pad_();S.after=done(4,'One box for each sound, and a box can hold two letters: sh, ck, ch.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['How many sounds in “dog”?',[['3: d … o … g','ok'],['2: d … g','vowel'],['1: dog','whole']]],
 ['How many sounds in “shop”?',[['3: sh … o … p','ok'],['4: s … h … o … p','split'],['2: sh … op','rime']]],
 ['Mia writes “pt” for pot. What is missing?',[['The middle sound o','ok'],['A capital letter','caps'],['Nothing, it is right','vowel']]],
 ['Which spelling has every sound of “stop”?',[['s t o p','ok'],['s o p','blend'],['t o p','first']]],
 ['How many boxes for “duck”?',[['3: d … u … ck','ok'],['4: d … u … c … k','split'],['5, one per letter','letters']]],
 ['Ben spells “bus” as b, u, s, but writes the letter names: bee, you, ess. What should he do?',[['Write the sound, not the name: b … u … s','ok'],['Write the names faster','faster'],['Add a letter for each name','names']]]];
function why(t){let m='Say the word slowly. Give each sound its own box.';
 if(t==='vowel')m='Every word has a vowel sound in it. Stretch it: d … o … g. The middle sound o needs a box.';
 if(t==='whole')m='dog is one word, but it has three sounds. Say it slowly: d … o … g.';
 if(t==='split')m='Two letters can make one sound. sh is one sound and ck is one sound, so each gets one box.';
 if(t==='rime')m='op is two sounds, o and p. Stretch it more: sh … o … p.';if(t==='caps')m='The spelling is missing a sound, not a capital. Say p … o … t: the o is lost.';
 if(t==='blend')m='Say stop slowly: s … t … o … p. The t comes right after s, and you hear it.';if(t==='first')m='Listen to the very start: s comes first, then t. Both sounds get a box.';
 if(t==='letters')m='Count sounds, not letters. ck makes one sound, so duck has 3 boxes.';
 if(t==='faster')m='Speed is not the slip. In a word, b says b, not bee. Write the sound.';if(t==='names')m='The name bee is not the sound. One sound, one box: b … u … s.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pad_()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad_()}});
A.start()})})();
