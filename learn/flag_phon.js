/* Flagship – single letter sounds (ages 4–6): flip letter tiles to hear the sound each letter makes (not its name),
   drag a picture to the letter it starts with, put the missing short vowel in the middle of a CVC word, sort words by
   whether the vowel is short or says its name, then a quick-sounds round. Every drag has a big button twin. */
(()=>{
const SD={s:['sss','sun','☀️'],a:['a','apple','🍎'],t:['t','tent','⛺'],p:['p','pig','🐷'],m:['mmm','moon','🌙'],d:['d','dog','🐶'],c:['k','cat','🐱'],
 f:['fff','fish','🐟'],b:['b','bus','🚌'],h:['h','hat','🎩'],e:['e','egg','🥚'],i:['i','insect','🐞'],o:['o','octopus','🐙'],u:['u','umbrella','☂️'],
 n:['nnn','nose','👃'],r:['rrr','rabbit','🐇'],l:['lll','leaf','🍃'],v:['vvv','van','🚐'],g:['g','goat','🐐']};
const NM={s:'ess',a:'ay',t:'tee',p:'pee',m:'em',d:'dee',c:'see',e:'ee',i:'eye',o:'oh',u:'you'};
const PIC={cat:'🐱',fish:'🐟',bus:'🚌',hat:'🎩',bed:'🛏️',pig:'🐷',dog:'🐶',sun:'☀️',go:'🏃',me:'🙋',hi:'👋',nut:'🌰',moon:'🌙',van:'🚐',nose:'👃',leaf:'🍃',rabbit:'🐇',tent:'⛺',egg:'🥚',goat:'🐐',insect:'🐞'};
const FLIP=['s','a','t','p','m','d'],VOW=['a','e','i','o','u'];
const FIRST=[['cat','s','c','t'],['fish','p','h','f'],['bus','d','b','p'],['hat','a','m','h']];
const MID=['cat','bed','pig','dog','sun'];
const LONG=[['go',1],['dog',0],['me',1],['bed',0],['hi',1],['pig',0]];
const QUICK=[['s','sun','fish','van'],['d','dog','bus','pig'],['m','moon','nose','leaf'],['r','rabbit','hat','tent'],['g','goat','egg','sun']];
VIS.reg('flagphon',c=>{let A,pad,cbox,k=0,run=0,cq=-1;c.fig.classList.add('young');
const st={seen:new Set(),r:0,won:0,hot:-1,bad:-1,drag:null,msg:'',want:()=>{}};
const kind=()=>['flip','first','mid','long','quick','chal'][A.step];
const big=n=>Math.round(n*(A.narrow?1:1.2)),tell=t=>{st.msg=t;c.say(t);A.cv.setAttribute('aria-label',t)};
const goal={flip:4,first:3,mid:3,long:4,quick:4};
const vName=v=>NM[v]||v,sp=w=>w.split('').join('-');
/* what sits in each box, and what waits in the tray */
function boxes(){const K=kind(),r=st.r;
 if(K==='flip')return FLIP.map(L=>({big:L,small:st.seen.has(L)?`says ${SD[L][0]}`:'tap me',pic:st.seen.has(L)?SD[L][2]:''}));
 if(K==='first'){const f=FIRST[r%4];return f.slice(1).map(L=>({big:L,small:'',pic:''}))}
 if(K==='mid')return VOW.map(v=>({big:v,small:SD[v][1],pic:SD[v][2]}));
 if(K==='long')return[{big:'short sound',small:'apple, egg, insect…',pic:'🐙'},{big:'says its name',small:'ay, ee, eye, oh, you',pic:'🗣️'}];
 if(K==='quick'){const q=QUICK[r%5],o=q.slice(1),s=r%3;return o.slice(s).concat(o.slice(0,s)).map(w=>({big:'',small:w,pic:PIC[w],w}))}
 return[]}
function tray(){const K=kind(),r=st.r;if(st.won>=(goal[K]||99))return null;
 if(K==='first'){const w=FIRST[r%4][0];return{pic:PIC[w],txt:w}}
 if(K==='mid'){const w=MID[r%5];return{pic:PIC[w],txt:w[0]+' _ '+w[2]}}
 if(K==='long'){const w=LONG[r%6][0];return{pic:PIC[w],txt:w}}
 if(K==='quick')return{pic:'',txt:QUICK[r%5][0],huge:1};return null}
function rect(i,n){const cols=n===6?3:n,rows=n===6?2:1,top=A.H*.04,hh=A.H*(K2()?.74:.6)/rows,w=A.W/cols,col=i%cols,row=Math.floor(i/cols);
 return{x:col*w+4,y:top+row*hh+3,w:w-8,h:hh-6}}
const K2=()=>kind()==='flip';
const trayAt=()=>({x:A.W/2,y:A.H*.82});
function hit(p){const b=boxes();for(let i=0;i<b.length;i++){const z=rect(i,b.length);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y&&p.y<z.y+z.h)return i}return -1}
function txt(g,t,x,y,n,col,w,max){g.font=`${w||800} ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,max||A.W-10)}
function emo(g,e,x,y,n){g.font=`${big(n)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);const b=boxes();
 if(kind()==='chal'){txt(g,'Letters make sounds.',W/2,H*.4,20,C.tx);txt(g,'m says mmm, like moon',W/2,H*.55,15,C.mu,700);return}
 b.forEach((o,i)=>{const z=rect(i,b.length),cx=z.x+z.w/2,on=i===st.hot,bad=i===st.bad;
  g.fillStyle=A.mix(C.pn,bad?'#fecaca':on?'#bbf7d0':'#ffffff',C.dark?.12:.7);A.paint.rrect(z.x,z.y,z.w,z.h,16);g.fill();
  g.lineWidth=on||bad?5:2;g.strokeStyle=bad?C.rd:on?C.gr:A.mix(C.tx,C.pn,.55);g.stroke();
  const L=o.big.length>2?15:o.pic?34:46;
  if(o.big)txt(g,o.big,cx,z.y+z.h*(o.pic?.28:.42),L,C.tx,800,z.w-8);
  if(o.pic)emo(g,o.pic,cx,z.y+z.h*(o.big?.58:.42),o.big?22:34);
  if(o.small)txt(g,o.small,cx,z.y+z.h*.85,12,C.mu,700,z.w-6)});
 const t=tray(),d=st.drag;if(t){const p=d&&d.x!=null?d:trayAt();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.2:.6);A.paint.shadow(10,3,.2);A.paint.rrect(p.x-58,p.y-36,116,72,18);g.fill();A.paint.noShadow();
  g.strokeStyle=C.vi;g.lineWidth=3;g.stroke();if(t.huge)txt(g,t.txt,p.x,p.y,40,C.tx);else{if(t.pic)emo(g,t.pic,p.x-28,p.y,26);txt(g,t.txt,p.x+(t.pic?18:0),p.y,17,C.tx,800,70)}}
 else if(st.msg)txt(g,st.msg.split('.')[0]+'.',W/2,H*.82,14,C.tx,700);A.fx.draw(g)}
function blink(i,bad){st.hot=bad?-1:i;st.bad=bad?i:-1;const r=run;setTimeout(()=>{if(r===run){st.hot=st.bad=-1;A.redraw()}},500);A.redraw()}
function no(i,t){A.sound.miss();blink(i,1);tell(t)}
function yes(i,t){A.sound.pop();blink(i,0);st.won++;st.r++;tell(t);st.want();keys()}
/* what happens when a box is picked (by drop, tap or button) */
function pick(i){const K=kind();if(K==='chal'||st.won>=(goal[K]||99))return;const r=st.r;
 if(K==='flip'){const L=FLIP[i];if(st.seen.has(L)){tell(`${L} says ${SD[L][0]}, like ${SD[L][1]}. Tap a new tile.`);return}st.seen.add(L);A.sound.tick();blink(i,0);
  tell(`${L} says ${SD[L][0]}, like ${SD[L][1]}. Its name is ${NM[L]}, but in words it says ${SD[L][0]}.`);st.won=st.seen.size;st.want();return}
 if(K==='first'){const[w,...o]=FIRST[r%4],L=o[i],need=w[0];if(L===need)return yes(i,`Yes! ${w} starts with ${SD[need][0]}. The letter ${L} says ${SD[need][0]}.`);
  if(w==='cat'&&L==='s')return no(i,'The name of c is see, but s is the one that says sss. Say cat slowly: k-a-t. c says k.');
  if(L==='d'&&need==='b')return no(i,'d faces the other way. d says d, like dog. Bus starts with b, b, b.');
  return no(i,`${L} says ${SD[L][0]}, like ${SD[L][1]}. Say ${w} slowly. What is the very first sound?`)}
 if(K==='mid'){const w=MID[r%5],v=VOW[i],made=w[0]+v+w[2];if(v===w[1])return yes(i,`Yes! ${sp(w)}, ${w}. The middle sound is ${v}, like ${SD[v][1]}.`);
  return no(i,`You made ${sp(made)}. That is not ${w}. Say ${w} slowly and listen to the middle. Is it like ${SD[w[1]][1]}?`)}
 if(K==='long'){const[w,lg]=LONG[r%6],v=w.match(/[aeiou]/)[0];if(i===lg)return yes(i,lg?`Yes! In ${w}, the ${v} says its name, ${vName(v)}.`:`Yes! In ${w}, the ${v} is short, like ${SD[v][1]}.`);
  return no(i,lg?`Listen: ${w}. The ${v} says ${vName(v)}. That is its name, so it is not short.`:`Listen: ${sp(w)}. The ${v} is short, like ${SD[v][1]}. It does not say ${vName(v)}.`)}
 if(K==='quick'){const L=QUICK[r%5][0],w=boxes()[i].w;if(w[0]===L)return yes(i,`Yes! ${w} starts with ${SD[L][0]}.`);
  return no(i,`${w} starts with ${SD[w[0]][0]}. Find the one that starts with ${SD[L][0]}.`)}}
function keys(){if(!pad)return;pad.innerHTML='';const K=kind();if(K==='chal'||st.won>=(goal[K]||99))return;const b=boxes();
 b.forEach((o,i)=>{const lab=K==='flip'?`Tile ${o.big}`:K==='first'?`Starts with ${o.big}`:K==='mid'?`Middle ${o.big}`:K==='long'?(i?'Says its name':'Short sound'):`${o.small}`;
  const B=c.el('button',{type:'button',class:'lbtn ghost'},pad,lab);B.onclick=()=>pick(i)})}
function down(p){if(kind()==='chal')return false;const t=tray(),q=trayAt();if(t&&Math.hypot(p.x-q.x,p.y-q.y)<64){st.drag={x:null,y:null,x0:p.x,y0:p.y};return true}
 const i=hit(p);if(i>=0)pick(i);return false}
function move(p){const d=st.drag;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=st.drag;st.drag=null;if(!d)return;const i=hit(p);if(d.x!=null&&i>=0)pick(i);else if(d.x!=null)tell('Drag it up onto a box, or tap a button.');A.redraw()}
const fin=(n,m)=>()=>{if(A.step===n&&st.won>=goal[kind()]&&(!steps[n].predict||A.pred[n]!=null))A.done(m+A.reveal(n))};
function auto(fns){const me=++run;fns.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},A.reduced()?20+j*30:300+j*420))}
const reset=(n,m,say)=>{run++;Object.assign(st,{seen:new Set(),r:0,won:0,hot:-1,bad:-1,drag:null,msg:''});st.want=fin(n,m);tell(say);keys()};
const right=()=>{const K=kind(),r=st.r;if(K==='first'){const f=FIRST[r%4];return f.indexOf(f[0][0])-1}if(K==='mid')return VOW.indexOf(MID[r%5][1]);
 if(K==='long')return LONG[r%6][1];if(K==='quick')return boxes().findIndex(o=>o.w[0]===QUICK[r%5][0]);return 0};
const steps=[
{h:'Name or sound?',p:'Every letter has a name and a sound. Tap a tile to flip it. Say the sound, short and pure: mmm, not muh.',
 predict:{q:'This letter is m. Its name is em. What sound starts moon?',opts:['em','mmm'],ans:1},task:'Flip 4 tiles',
 show:()=>{steps[0].go();auto([0,1,4,5].map(i=>()=>pick(i)))},go:()=>reset(0,'A letter’s name is not its sound. m is called em, but it says mmm.','Six letter tiles. Tap one to see what it says.')},
{h:'First sounds',p:'Look at the picture. Say the word slowly. Drag it to the letter that makes its first sound.',
 predict:{q:'The letter c is called see. What does it say at the start of cat?',opts:['sss, like its name','k, as in cat'],ans:1},task:'Match 3 pictures',
 show:()=>{steps[1].go();auto([1,2,3].map(()=>()=>pick(right())))},go:()=>reset(1,'The first sound tells you the first letter.','Which letter starts cat?')},
{h:'Middle sounds',p:'The middle letter is missing. Say the word slowly, then pick the vowel: a, e, i, o or u.',
 predict:{q:'Bed has a sound in the middle. Which letter is it?',opts:['i','e','a'],ans:1},task:'Fill 3 words',
 show:()=>{steps[2].go();auto([1,2,3].map(()=>()=>pick(right())))},go:()=>reset(2,'Each vowel has a short sound: a apple, e egg, i insect, o octopus, u umbrella.','c _ t. Which vowel makes cat?')},
{h:'Short or name?',p:'A vowel can be short, like o in dog. Or it can say its name, like o in go. Sort each word.',
 predict:{q:'In the word go, what does the o say?',opts:['o, like octopus','oh, its name'],ans:1},task:'Sort 4 words',
 show:()=>{steps[3].go();auto([1,2,3,4].map(()=>()=>pick(right())))},go:()=>reset(3,'A vowel can be short, or say its own name.','Is the o in go short, or does it say its name?')},
{h:'Quick sounds',p:'A letter pops up. Tap the picture that starts with its sound. Go as fast as you can!',task:'Get 4 right',
 show:()=>{steps[4].go();auto([1,2,3,4].map(()=>()=>pick(right())))},go:()=>reset(4,'You know your sounds fast!','s says sss. Which picture starts with sss?')},
{h:'Challenge',p:'',go:()=>{run++;st.won=99;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.want()});
const QS=[['m is called em. What sound starts moon?',[['mmm','ok'],['em','name'],['muh','uh']]],
 ['Which letter does bus start with?',[['b','ok'],['d','flip'],['p','near']]],
 ['Which word has a short a, like apple?',[['cat','ok'],['cot','vowel'],['cake','long']]],
 ['In go, what does the o say?',[['oh, its name','ok'],['o, like octopus','short'],['g','first']]],
 ['What sound does s make at the start of sun?',[['sss','ok'],['ess','name'],['suh','uh']]],
 ['In bed, what is the middle sound?',[['e, like egg','ok'],['i, like insect','ei'],['b','first']]]];
function why(t){let m='Say the word slowly and listen to each sound.';
 if(t==='name')m='That is the letter’s name. Its sound is short, like the start of the word.';
 if(t==='uh')m='Keep it pure: mmm and sss, with no uh on the end. Muh would make moon sound like muh-oon.';
 if(t==='flip')m='b and d look alike but face different ways. d says d, like dog. Bus starts with b.';
 if(t==='near')m='p and b feel alike in your mouth, but p is a puff. Bus starts with b.';
 if(t==='vowel')m='Cot has o in the middle, like octopus. Cat has a, like apple.';
 if(t==='long')m='In cake, the a says its name, ay. Short a is a, like apple, as in cat.';
 if(t==='short')m='Short o is the o in dog. In go, the o says its name: oh.';
 if(t==='first')m='That letter is not a vowel in the middle. Listen for the vowel sound.';
 if(t==='ei')m='e and i sound close. e is like egg; i is like insect. Bed has e.';return m}
function quiz(){cq++;const[q,ops]=QS[cq%QS.length],s=cq%3;cbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cbox.querySelector('.fl-pick');ops.slice(s).concat(ops.slice(0,s)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){cbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cbox.querySelector('.fl-fb'),ok=t==='ok';if(ok){k++;A.win()}else{k=0;A.sound.miss()}
 fb.innerHTML=(ok?`✓ Yes! You heard the sound. Run of ${k}.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{cbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
