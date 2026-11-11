/* Flagship – reading high-frequency words by sight (ages 5–8): tap the tricky part of a common exception word (the ai
   in said) and mark it with a heart, catch flashed words and tell was from saw, build tricky words from letter tiles
   (no "sed" or "thay"), spot the words in real sentences, and sort words you can sound out from words with a tricky
   part. Drag or tap; every move also has a button. */
(()=>{
const HEART=[['said',['s','ai','d'],1,'ai says e here, like in bed'],['was',['w','a','s'],1,'a says o here, like in hot'],['you',['y','ou'],1,'ou says oo here, like in zoo'],
 ['the',['th','e'],1,'e says uh here, not e as in egg'],['they',['th','ey'],1,'ey says ay here, like in play'],['of',['o','f'],1,'f says v here, like in van']];
const FLASH=[['was',['saw','was','way']],['the',['then','he','the']],['of',['of','off','for']],['said',['sad','sand','said']],['come',['came','come','cone']]];
const SPELL=[['said',['s','e','a','d','i'],{e:'It sounds like sed, but we write ai in the middle: s, a, i, d.'}],['was',['o','w','s','a','z'],{o:'It sounds like wos, but we write a: w, a, s.',z:'The end sounds like z, but we write s: w, a, s.'}],
 ['they',['a','t','y','h','e'],{a:'It sounds like thay, but we write ey at the end: t, h, e, y.'}]];
const SENT=[['Mum said we can go to the park','said'],['The cat was on the mat','was'],['Do you want to come and play','you'],['They ran to the big red bus','They']];
const SORT=[['and',0],['said',1],['it',0],['was',1],['can',0],['you',1],['big',0],['the',1]];
VIS.reg('flagsight',c=>{let A,row,qa,qn=-1,run=0;c.fig.classList.add('young');
const base=()=>({want:()=>{},won:0,r:0,hit:false,cover:false,got:0,used:[],sel:-1,grab:null,bad:-1,ci:0}),S=base();
const part=()=>['heart','flash','spell','spot','sort','quiz'][A.step],slow=()=>!A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.15));
const tell=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function word(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function chip(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=edge;g.lineWidth=lw||3;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const paper=()=>A.col.dark?'#1e293b':'#eff6ff',isIn=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const target=()=>({heart:4,flash:4,spell:3,spot:4,sort:8}[part()]||9);
/* ---- 1 find the tricky part ---- */
function gBox(i,n){const w=Math.min((A.W-40)/n,120),h=Math.min(A.H*.3,120);return{x:(A.W-n*w-(n-1)*10)/2+i*(w+10),y:A.H*.2,w,h}}
function drawHeart(g){const C=A.col,[w,gs,k,why]=HEART[S.r%HEART.length];word(g,`Read: ${w}`,A.W/2,A.H*.09,16,C.tx);
 gs.forEach((t,i)=>{const r=gBox(i,gs.length),tr=S.hit&&i===k;chip(g,r,tr?A.alpha(C.rd,.18):paper(),S.bad===i?C.rd:tr?C.rd:C.tx,S.bad===i||tr?6:3);word(g,t,r.x+r.w/2,r.y+r.h/2,34,C.tx,900);if(tr){g.font=`${fz(26)}px system-ui`;g.fillText('❤️',r.x+r.w/2,r.y-14)}});
 word(g,S.hit?`Tricky part: ${why}.`:'Which part does not say its usual sound?',A.W/2,A.H*.64,14,C.tx,700);word(g,S.hit?'Learn this bit by heart.':'Tap it.',A.W/2,A.H*.74,13,C.mu,700)}
function tapPart(i){if(part()!=='heart'||S.won>=target()||S.hit)return;const[w,gs,k,why]=HEART[S.r%HEART.length];
 if(i!==k)return oops(`${gs[i]} says its usual sound in ${w}. Look for the part that does not.`,i);S.hit=true;A.sound.pop();tell(`Yes! In ${w}, ${why}. That is the tricky part.`);row&&keys();A.redraw();
 setTimeout(()=>{if(part()==='heart')win(`You found the tricky part of ${w}.`)},slow()?700:20)}
/* ---- 2 flash words ---- */
function cardBox(){return{x:A.W*.22,y:A.H*.08,w:A.W*.56,h:A.H*.3}}
function opBox(i){const w=Math.min((A.W-40)/3,150),h=Math.min(A.H*.2,84);return{x:(A.W-3*w-20)/2+i*(w+10),y:A.H*.62,w,h}}
function drawFlash(g){const C=A.col,[w,ops]=FLASH[S.r%FLASH.length],r=cardBox();chip(g,r,S.cover?A.alpha(C.vi,.2):paper(),C.tx,3);word(g,S.cover?'?':w,r.x+r.w/2,r.y+r.h/2,40,C.tx,900);
 word(g,S.cover?'Which word did you see?':'Look fast!',A.W/2,A.H*.5,14,C.tx,700);ops.forEach((o,i)=>{const b=opBox(i);chip(g,b,paper(),S.bad===i?C.rd:C.tx,S.bad===i?6:3);word(g,o,b.x+b.w/2,b.y+b.h/2,22,C.tx,800)})}
let fl=0;function flash(){S.cover=false;const k=++fl;A.redraw();setTimeout(()=>{if(k===fl&&part()==='flash'){S.cover=true;A.redraw()}},slow()?1200:30)}
function pickFlash(i){if(part()!=='flash'||S.won>=target())return;const[w,ops]=FLASH[S.r%FLASH.length],o=ops[i];
 if(o!==w){const why=w==='was'&&o==='saw'?'Saw has the same letters the other way round. Was starts with w.':`That is ${o}. Look at every letter: ${w} is ${w.split('').join(', ')}.`;return oops(why,i)}
 A.sound.tick();win(`Yes, ${w}! You knew it at a glance.`,()=>flash())}
/* ---- 3 build the word ---- */
function slotBox(i,n){const w=Math.min((A.W-40)/n,84);return{x:(A.W-n*w-(n-1)*8)/2+i*(w+8),y:A.H*.14,w,h:Math.min(A.H*.2,84)}}
function tileBox(i){const w=Math.min((A.W-40)/5,84),h=Math.min(A.H*.2,84);return{x:(A.W-5*w-32)/2+i*(w+8),y:A.H*.64,w,h}}
function drawSpell(g){const C=A.col,[w,ts]=SPELL[S.r%SPELL.length],n=w.length;word(g,`Build the word you hear: ${w}`,A.W/2,A.H*.06,14,C.tx,700);
 for(let i=0;i<n;i++){const r=slotBox(i,n);chip(g,r,i<S.got?A.alpha(C.gr,.2):paper(),i===S.got?C.vi:C.mu,i===S.got?5:2);if(i<S.got)word(g,w[i],r.x+r.w/2,r.y+r.h/2,32,C.tx,900)}
 ts.forEach((t,i)=>{if(S.used.includes(i))return;let r=tileBox(i);if(S.grab&&S.grab.i===i&&S.grab.x!=null)r={...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2};chip(g,r,paper(),S.bad===i?C.rd:C.tx,S.bad===i?6:3);word(g,t,r.x+r.w/2,r.y+r.h/2,30,C.tx,900)})}
function useTile(i){if(part()!=='spell'||S.won>=target()||S.used.includes(i))return;const[w,ts,trap]=SPELL[S.r%SPELL.length],t=ts[i];
 if(t!==w[S.got]){return oops(trap[t]||`Not ${t} yet. Say ${w} slowly. What comes after ${S.got?w.slice(0,S.got):'the start'}?`,i)}
 S.used.push(i);S.got++;A.sound.tick();if(S.got>=w.length)return win(`${w.split('').join(', ')} spells ${w}!`);tell(`${w.slice(0,S.got)}… what comes next?`);keys();A.redraw()}
/* ---- 4 spot it in a sentence ---- */
function wordBoxes(){const[s]=SENT[S.r%SENT.length],ws=s.split(' '),g=A.ctx;g.font=`800 ${fz(20)}px system-ui,sans-serif`;let x=12,y=A.H*.3;const out=[],h=Math.min(A.H*.15,60);
 ws.forEach(t=>{const w=g.measureText(t).width+26;if(x+w>A.W-12){x=12;y+=h+10}out.push({x,y,w,h,t});x+=w+8});return out}
function drawSpot(g){const C=A.col,[,t]=SENT[S.r%SENT.length];word(g,`Find the word: ${t}`,A.W/2,A.H*.12,18,C.tx,900);
 wordBoxes().forEach((b,i)=>{chip(g,b,paper(),S.bad===i?C.rd:C.tx,S.bad===i?6:2);word(g,b.t,b.x+b.w/2,b.y+b.h/2,20,C.tx,800)})}
function tapWord(i){if(part()!=='spot'||S.won>=target())return;const[,t]=SENT[S.r%SENT.length],b=wordBoxes()[i];if(!b)return;
 if(b.t!==t)return oops(`That word is ${b.t}. Look for ${t}: it starts with ${t[0].toLowerCase()}.`,i);A.sound.tick();win(`Yes, ${t}! You read it in a real sentence.`)}
/* ---- 5 sound it out or tricky? ---- */
function binBox(k){const w=Math.min(A.W*.44,220),h=Math.min(A.H*.24,100);return{x:A.W/2-w-8+k*(w+16),y:A.H*.64,w,h}}
const sortCard=()=>{let r={x:A.W*.3,y:A.H*.14,w:A.W*.4,h:A.H*.26};if(S.grab&&S.grab.x!=null)r={...r,x:S.grab.x-r.w/2,y:S.grab.y-r.h/2};return r};
function drawSort(g){const C=A.col;if(S.ci<SORT.length){const r=sortCard();chip(g,r,paper(),C.tx,3);word(g,SORT[S.ci][0],r.x+r.w/2,r.y+r.h/2,36,C.tx,900)}
 word(g,`${S.ci} of ${SORT.length} sorted`,A.W/2,A.H*.52,13,C.mu,700);[['🔤 Sound it out',0],['❤️ Tricky part',1]].forEach(([t,k])=>{const r=binBox(k);chip(g,r,paper(),S.bad===k?C.rd:C.tx,S.bad===k?6:3);word(g,t,r.x+r.w/2,r.y+r.h/2,16,C.tx)})}
function drop(k){if(part()!=='sort'||S.ci>=SORT.length)return;const[w,a]=SORT[S.ci];
 if(k!==a)return oops(a?`${w} has a tricky part. ${(HEART.find(h=>h[0]===w)||[,,,'one part does not say its usual sound'])[3]}.`:`${w.split('').join('-')}: every letter says its usual sound, so you can sound it out. Still learn to read it fast.`,k);
 S.ci++;S.won++;A.sound.tick();if(S.won>=target()){tell('All sorted. Some common words sound out, some have a tricky part.');keys();A.redraw();return S.want()}tell(`Yes, ${w}: ${a?'tricky part':'sound it out'}. Next word.`);keys();A.redraw()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'said · was · the',W/2,H*.4,28,C.tx,900);word(g,'Read them in a blink.',W/2,H*.62,15);return}
 if(S.won>=target()&&v!=='sort'){word(g,{heart:'Most of the word sounds out. Learn the tricky part.',flash:'Fast reading: know it at a glance.',spell:'Tricky words: write the tricky part.',spot:'You read sight words in sentences.'}[v],W/2,H/2,15);return A.fx.draw(g)}
 ({heart:drawHeart,flash:drawFlash,spell:drawSpell,spot:drawSpot,sort:drawSort})[v](g);A.fx.draw(g)}
function oops(t,b){A.sound.miss();S.bad=b==null?-1:b;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},slow()?900:10);A.redraw()}
function fresh(){S.hit=false;S.got=0;S.used=[];S.sel=-1;S.grab=null}
function win(t,then){S.won++;S.r++;A.sound.pop();if(S.won<target()){fresh();tell(t+' Here is another.');then&&then()}else tell(t);keys();A.redraw();S.want()}
function keys(){if(!row)return;row.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},row,t);b.onclick=fn};if(v==='quiz'||S.won>=target())return;
 if(v==='heart'&&!S.hit)HEART[S.r%HEART.length][1].forEach((t,i)=>B(t,()=>tapPart(i),`Part ${t} is the tricky part`));
 if(v==='flash')FLASH[S.r%FLASH.length][1].forEach((o,i)=>B(o,()=>pickFlash(i),`I saw ${o}`));
 if(v==='spell')SPELL[S.r%SPELL.length][1].forEach((t,i)=>{if(!S.used.includes(i))B(t,()=>useTile(i),`Add the letter ${t}`)});
 if(v==='spot')wordBoxes().forEach((b,i)=>B(b.t,()=>tapWord(i),`Tap the word ${b.t}`));
 if(v==='sort'){B('🔤 Sound it out',()=>drop(0),'Put it in sound it out');B('❤️ Tricky part',()=>drop(1),'Put it in tricky part')}}
function down(p){const v=part();if(S.won>=target())return false;
 if(v==='heart'){const n=HEART[S.r%HEART.length][1].length,i=[...Array(n).keys()].find(i=>isIn(p,gBox(i,n)));if(i!=null)tapPart(i);return false}
 if(v==='flash'){const i=[0,1,2].find(i=>isIn(p,opBox(i)));if(i!=null)pickFlash(i);return false}
 if(v==='spell'){const i=SPELL[S.r%SPELL.length][1].findIndex((t,i)=>!S.used.includes(i)&&isIn(p,tileBox(i)));if(i>=0){S.grab={i,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(v==='spot'){const i=wordBoxes().findIndex(b=>isIn(p,b));if(i>=0)tapWord(i);return false}
 if(v==='sort'){const k=[0,1].find(k=>isIn(p,binBox(k)));if(k!=null){drop(k);return false}if(isIn(p,sortCard())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const d=S.grab,v=part();S.grab=null;if(!d)return;
 if(v==='spell'){if(d.x==null||p.y<A.H*.5)useTile(d.i);A.redraw();return}
 if(v==='sort'){const k=[0,1].find(k=>isIn(p,binBox(k)));if(k!=null)drop(k);A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
let gen=0;function auto(list,gap){const k=++gen;list.forEach((fn,j)=>setTimeout(()=>{if(k===gen)fn()},slow()?(j+1)*(gap||260):j*40+30))}
const reset=()=>{gen++;fl++;Object.assign(S,base())};
const steps=[
{h:'Find the tricky part',p:'Most of a word sounds out. A tricky word has one part that does not say its usual sound. Tap that part.',predict:{q:'Does said rhyme with paid?',opts:['Yes, like paid','No, it says sed'],ans:1},task:'Find 4 tricky parts',
 show:()=>{steps[0].go();auto([0,1,2,3].map(()=>()=>tapPart(HEART[S.r%HEART.length][2])),900)},go:()=>{reset();tell('Read: said. Tap the tricky part.');keys();S.want=ready(0,()=>S.won>=4,'Sound out the rest, learn the tricky part by heart.')}},
{h:'Was or saw?',p:'A word shows for a moment, then hides. Which word was it? Look at every letter.',predict:{q:'was and saw have the same letters. Are they the same word?',opts:['Yes, same letters','No, the order is different'],ans:1},task:'Catch 4 flash words',
 show:()=>{steps[1].go();auto([0,1,2,3].map(()=>()=>{const[w,o]=FLASH[S.r%FLASH.length];pickFlash(o.indexOf(w))}),500)},go:()=>{reset();flash();tell('Look fast! Then tap the word you saw.');keys();S.want=ready(1,()=>S.won>=4,'Same letters in a new order make a new word.')}},
{h:'Build the word',p:'Tap or drag the letters in order to build the word. Watch out: it does not always look how it sounds.',task:'Build 3 tricky words',
 show:()=>{steps[2].go();const fns=[];SPELL.forEach(([w,ts])=>{const used=[];w.split('').forEach(ch=>{const i=ts.findIndex((t,j)=>t===ch&&!used.includes(j));used.push(i);fns.push(()=>useTile(i))})});auto(fns,300)},
 go:()=>{reset();tell('Build: said.');keys();S.want=ready(2,()=>S.won>=3,'Write the tricky part the way it looks, not how it sounds.')}},
{h:'Spot it in a sentence',p:'Sight words are in every book. Find the word in the sentence and tap it.',task:'Find 4 words',
 show:()=>{steps[3].go();auto([0,1,2,3].map(()=>()=>{const[s,t]=SENT[S.r%SENT.length];tapWord(s.split(' ').indexOf(t))}),500)},go:()=>{reset();tell('Find the word: said.');keys();S.want=ready(3,()=>S.won>=4,'You spotted them fast in real sentences.')}},
{h:'Sound it out or tricky?',p:'Some words we see a lot sound out fine. Some have a tricky part. Drag each word to a box, or tap a box.',predict:{q:'We see and all the time. Is and a tricky word?',opts:['Yes, all sight words are tricky','No, we can sound it out'],ans:1},task:'Sort 8 words',
 show:()=>{steps[4].go();auto(SORT.map(([,a])=>()=>drop(a)),300)},go:()=>{reset();tell('Is it sound it out, or tricky?');keys();S.want=ready(4,()=>S.won>=8,'Sound out what you can. Learn the tricky part.')}},
{h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which part of said is tricky?',[['ai, it says e','ok'],['s, at the start','s'],['d, at the end','d']]],
 ['The word is w, a, s. Which word is it?',[['was','ok'],['saw','saw'],['wish','wish']]],
 ['How do we write the word that sounds like sed?',[['said','ok'],['sed','sed'],['sad','sad']]],
 ['Can you sound out the word and?',[['Yes, a-n-d','ok'],['No, it is tricky','trick'],['No, guess it','guess']]],
 ['You get stuck on the word the. What helps most?',[['Read it lots until it is quick','ok'],['Guess from the picture','pic'],['Skip it','skip']]]];
function hint(t){let m='Look at every letter, then read it again.';
 if(t==='s')m='s says s as usual. The ai in the middle says e: that is the tricky part.';if(t==='d')m='d says d as usual. Look at the ai in the middle.';
 if(t==='saw')m='saw is s, a, w. This word starts with w, so it is was.';if(t==='wish')m='wish has an i and a sh. Read each letter: w, a, s is was.';
 if(t==='sed')m='It sounds like sed, but the tricky part is written ai: said.';if(t==='sad')m='sad is s-a-d. The word that sounds like sed is said.';
 if(t==='trick')m='a-n-d: every letter says its usual sound. It is common, not tricky.';if(t==='guess')m='No need to guess. Sound it out: a-n-d, and.';
 if(t==='pic')m='The picture cannot tell you the word the. Read it many times until you know it in a blink.';if(t==='skip')m='the is in almost every sentence. Practise it until it is quick.';return m}
function pose(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const pick=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},pick,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You read it by sight.':'✗ '+hint(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qa.hidden=A.step!==5;row.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
