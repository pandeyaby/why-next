/* Flagship – forms of poetry and performance (ages 7–10): sort three poems into haiku, narrative poem and free verse,
   fill a feature chart (rhymes? tells a story? 5-7-5?), clap the syllables of a haiku and fix its middle line to 7,
   find the character, problem, ending and rhyme in a narrative poem, then choose volume, pace and intonation for each
   line of a spooky poem and perform it to a listener. Every tap on the canvas has a button twin. */
(()=>{
const FORM=['Haiku','Narrative poem','Free verse'];
const POEMS=[{f:0,t:'Frog',l:['Old frog on a stone','one splash breaks the silver pond','then the ripples rest']},
 {f:1,t:'Tom and the Boat',l:['Tom took the boat at break of day,','the wind blew hard and drove him far;','he rowed all night to find the bay','and came home steering by a star.']},
 {f:2,t:'Rain',l:['Rain','taps the window','like it wants','to come in','and read my book.']}];
const SORTWHY=['It has 3 short lines of 5, 7 and 5 syllables about one moment. That is a haiku.','Tom has a problem and gets home: a story with a character, so it is a narrative poem.','No regular rhyme, no steady beat, lines of any length: that is free verse.'];
const FEAT=['Rhymes','Tells a story','5-7-5'],TRUTH=[[0,0,1],[1,1,0],[0,0,0]];
const FWHY=[['A haiku does not need to rhyme. Stone, pond, rest do not rhyme.','A haiku shows one moment, not a whole story.','Count it: Old frog on a stone is 5, the middle is 7, the last is 5.'],
 ['Day and bay rhyme, and far and star rhyme.','Tom sets off, has a problem, then gets home. That is a story.','Its lines have 8 or 9 syllables, so it is not 5-7-5.'],
 ['Rain, window, wants, in, book: no regular rhyme. That is free verse.','It is one picture of rain, not a story with a problem.','Rain is 1 syllable. The lines are free, not 5-7-5.']];
const MID=[['one','splash','breaks','the','pond'],['one','big','splash','breaks','the','pond'],['one','splash','breaks','the','sil-ver','pond']];
const HL=[['Old','frog','on','a','stone'],null,['then','the','rip-ples','rest']];
const syl=ws=>ws.reduce((n,w)=>n+w.split('-').length,0);
const NQ=[['Tap the line that names the character.',0,'A character is a person or animal in the story. Look for a name.'],['Tap the line with the problem.',1,'The problem is what goes wrong for Tom. What drove him far?'],
 ['Tap the line that shows how it ends.',3,'The ending is the last thing that happens. Does Tom get home?'],['Tap the line that rhymes with line 1 (day).',2,'Rhymes share an end sound. Day … which line ends with -ay?']];
const SPOOK=[{l:'Creep… creep… the cat comes near.',o:['🤫 Soft and slow','📢 Loud and fast','🙂 Normal and quick'],a:0,v:[.25,1,.6],p:[.5,1.4,1.1],w:'Creeping is quiet. Loud and fast gives the cat away.'},
 {l:'Who is that knocking at my door?',o:['⤵️ Voice goes down at the end','⤴️ Voice goes up at the end','📢 Shout every word'],a:1,v:[.6,.6,1],p:[1,1,1.2],w:'It is a question, so your voice rises at the end.'},
 {l:'BANG! The door flies open wide!',o:['🤫 Whisper it','📢 Loud and fast','🐢 Slow and soft'],a:1,v:[.2,1,.3],p:[.7,1.5,.5],w:'BANG and the ! show something sudden and loud.'},
 {l:'And then… all… is… still.',o:['📢 Loud and fast','🙂 Normal, no stops','⏸️ Soft, with pauses at the dots'],a:2,v:[1,.6,.25],p:[1.4,1,.45],w:'The dots ask for pauses, and still means quiet.'}];
VIS.reg('flagpoem',c=>{let A,pad,qb,qn=-1,run=0,ver=0;
const S={};const fresh=()=>Object.assign(S,{at:[-1,-1,-1],drag:null,grid:[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],bad:null,mid:0,clap:[0,0,0],beat:null,nq:0,wrong:-1,pf:[-1,-1,-1,-1],sel:0,played:false,ph:0,want:()=>{}});fresh();
const mode=()=>['sort','chart','haiku','story','perform','quiz'][A.step];
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const z=n=>Math.round(n*(A.narrow?1:1.15));
function say(g,t,x,y,n,col,wt,al){g.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y)}
const bg=(h,k)=>A.mix(A.col.pn,h,A.col.dark?k*.3:k);
function box(g,b,f,e,r){g.fillStyle=f;A.paint.rrect(b.x,b.y,b.w,b.h,r||12);g.fill();g.lineWidth=2;g.strokeStyle=e||A.mix(A.col.tx,A.col.pn,.55);g.stroke()}
const inside=(p,b)=>p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const cur=()=>S.at.findIndex(v=>v<0);
const binB=j=>{const w=(A.W-40)/3;return{x:10+j*(w+10),y:A.H*.68,w,h:A.H*.28}};
const cardB=()=>({x:10,y:A.H*.03,w:A.W-20,h:A.H*.6});
const cellB=(r,k)=>{const x0=A.W*.3,w=(A.W-x0-10)/3,h=A.H*.2;return{x:x0+k*w+3,y:A.H*.2+r*(h+6),w:w-6,h}};
const lineY=i=>A.H*(.12+i*.26),rowB=i=>({x:10,y:A.H*(.05+i*.235),w:A.W-20,h:A.H*.21});
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=bg('#ede9fe',.3);g.fillRect(0,0,W,H);
 if(m==='sort'){const i=cur();FORM.forEach((f,j)=>{const b=binB(j);box(g,b,bg(['#dcfce7','#dbeafe','#fce7f3'][j],.9));say(g,f,b.x+b.w/2,b.y+20,12,C.tx,800);S.at.forEach((v,k)=>{if(v===j)say(g,'✓ '+POEMS[k].t,b.x+b.w/2,b.y+b.h*.62,11,C.tx)})});
  if(i>=0){const P=POEMS[i],b=cardB(),d=S.drag,bx=d?{...b,x:d.x-b.w/2,y:d.y-b.h*.2,}:b;box(g,bx,bg('#ffffff',.97));say(g,P.t,bx.x+bx.w/2,bx.y+20,15,C.tx,900);
   const n=P.l.length,gap=Math.min(26,(bx.h-50)/n);P.l.forEach((l,k)=>say(g,l,bx.x+bx.w/2,bx.y+46+k*gap,13,C.tx,600))}else say(g,'All 3 poems sorted!',W/2,H*.3,15,C.tx,800)}
 if(m==='chart'){FEAT.forEach((f,k)=>{const b=cellB(0,k);say(g,f,b.x+b.w/2,H*.12,12,C.tx,800)});['Frog','Tom','Rain'].forEach((n,r)=>{const b=cellB(r,0);say(g,`${n}`,10,b.y+b.h/2-8,13,C.tx,800,'left');say(g,FORM[r],10,b.y+b.h/2+10,10,C.mu,700,'left');
   FEAT.forEach((f,k)=>{const v=S.grid[r][k],cb=cellB(r,k),bad=v>=0&&v!==TRUTH[r][k];box(g,cb,v<0?bg('#ffffff',.9):bad?bg('#fee2e2',1):bg('#dcfce7',1),bad?C.rd:0,10);say(g,v<0?'?':v?'Yes':'No',cb.x+cb.w/2,cb.y+cb.h/2,15,C.tx,900)})})}
 if(m==='haiku'){const L=[HL[0],MID[S.mid],HL[2]],tg=[5,7,5];L.forEach((ws,i)=>{const y=lineY(i),n=syl(ws);box(g,{x:10,y:y-H*.09,w:W-20,h:H*.22},bg(i===1?'#fef3c7':'#ffffff',.95));say(g,ws.join(' ').replace(/-/g,''),W/2,y-H*.03,14,C.tx,800);
   for(let k=0;k<n;k++){const x=W/2+(k-(n-1)/2)*Math.min(30,(W-90)/n),on=S.clap[i]&&(!S.beat||S.beat.i!==i||k<S.beat.k);g.fillStyle=on?(n===tg[i]?C.gr:C.am):A.mix(C.ln,C.pn,.3);g.beginPath();g.arc(x,y+H*.055,8,0,7);g.fill()}
   if(S.clap[i])say(g,`${n} / ${tg[i]}`,W-22,y+H*.055,13,C.tx,900,'right')});if(S.clap.every(v=>v))say(g,`Total ${syl(HL[0])+syl(MID[S.mid])+syl(HL[2])} syllables`,W/2,H*.94,13,C.tx,800)}
 if(m==='story'){const P=POEMS[1];P.l.forEach((l,i)=>{const b=rowB(i),q=NQ[Math.min(S.nq,3)];box(g,b,i===S.wrong?bg('#fee2e2',1):bg('#ffffff',.95),i===S.wrong?C.rd:0);say(g,l,W/2,b.y+b.h/2,13,C.tx,700);
   const tags=NQ.slice(0,S.nq).filter(x=>x[1]===i).map(x=>['character','problem','ending','rhyme'][NQ.indexOf(x)]);if(tags.length)say(g,'✓ '+tags.join(', '),b.x+b.w-6,b.y+12,10,C.tx,800,'right')});
  say(g,S.nq<4?NQ[S.nq][0]:'Character, problem, ending, rhyme: a story told as a poem.',W/2,H*.98-8,12,C.tx,800)}
 if(m==='perform'){SPOOK.forEach((s,i)=>{const b=rowB(i),o=S.pf[i];box(g,b,i===S.sel?bg('#fef3c7',1):bg('#ffffff',.95),i===S.sel?C.am:0);say(g,s.l,b.x+10,b.y+16,12,C.tx,800,'left');say(g,o<0?'Tap to choose a voice':s.o[o],b.x+10,b.y+36,11,C.mu,700,'left');
   if(o>=0){const v=s.v[o],p=s.p[o],y=b.y+b.h*.78,x0=b.x+10,x1=b.x+b.w-40;g.strokeStyle=C.ac;g.lineWidth=2;g.beginPath();for(let x=x0;x<=x1;x+=2){const u=(x-x0)/(x1-x0),pause=i===3&&o===2&&((u*4)%1)>.75;g.lineTo(x,y-(pause?0:Math.sin(u*40*p+S.ph)*v*9))}g.stroke();
    if(i===1)say(g,o===1?'⤴️':o===0?'⤵️':'📢',b.x+b.w-22,y,14,C.tx);if(S.played)say(g,o===s.a?'😮':'😕',b.x+b.w-22,b.y+18,18,C.tx)}})}
 if(m==='quiz'){say(g,'📜 Haiku · Narrative · Free verse',W/2,H*.35,15,C.tx,800);say(g,'Name the form. Plan the voice.',W/2,H*.55,13,C.mu)}A.fx.draw(g)}
/* actions */
function sortTo(j){const i=cur();if(i<0)return;if(POEMS[i].f===j){S.at[i]=j;A.sound.pop();speak(SORTWHY[i]);S.want()}else{A.sound.miss();speak(`Not ${FORM[j].toLowerCase()}. `+(j===0?'A haiku has 3 lines of 5, 7 and 5 syllables.':j===1?'A narrative poem tells a story with a character and a problem.':'Free verse has no regular rhyme or beat.'))}keys();A.redraw()}
function cell(r,k){const v=S.grid[r][k]=S.grid[r][k]===1?0:1;if(v===TRUTH[r][k]){A.sound.tick();speak(`${FORM[r]}, ${FEAT[k]}: ${v?'yes':'no'}.`)}else{A.sound.miss();speak(FWHY[r][k])}if(S.grid.every((row,i)=>row.every((x,j)=>x===TRUTH[i][j])))S.want();keys();A.redraw()}
function clap(i){S.clap[i]=1;const ws=i===1?MID[S.mid]:HL[i],n=syl(ws),k=ver,b=S.beat={i,k:0};A.sound.tick();
 A.tween(b,{k:n},A.reduced()?1:n*160,'out',()=>{if(k!==ver)return;S.beat=null;speak(`${ws.join(' ').replace(/-/g,'')}: ${ws.map(w=>w.replace(/-/g,' ')).join(', ')}. ${n} syllables${i===1&&n!==7?`, but the middle line needs 7. ${n<7?'Add':'Take away'} ${Math.abs(7-n)}.`:'.'}`);S.want();A.redraw()})}
function swap(k){S.mid=k;S.clap[1]=0;A.sound.tick();speak(`Middle line: ${MID[k].join(' ').replace(/-/g,'')}. Clap it to count.`);keys();A.redraw()}
function story(i){if(S.nq>=4)return;const q=NQ[S.nq];if(i===q[1]){S.nq++;S.wrong=-1;A.sound.pop();speak(['Yes: Tom is the character.','Yes: the wind blew hard and drove him far.','Yes: he came home steering by a star.','Yes: day and bay rhyme.'][S.nq-1]);S.want()}
 else{S.wrong=i;A.sound.miss();speak(S.nq===3&&i===0?'That is the day line itself. Find another line ending in -ay.':q[2])}keys();A.redraw()}
function voice(i,o){S.pf[i]=o;S.played=false;S.sel=Math.min(3,S.pf.indexOf(-1)<0?i:S.pf.indexOf(-1));A.sound.tick();speak(`Line ${i+1}: ${SPOOK[i].o[o]}.`);keys();A.redraw()}
function perform(){if(S.pf.includes(-1))return speak('Choose a voice for every line first.');S.played=true;const k=ver,o={t:0};A.tween(o,{t:1},A.reduced()?1:1600,'io',()=>{if(k!==ver)return;const bad=SPOOK.findIndex((s,i)=>S.pf[i]!==s.a);
 if(bad<0){A.sound.pop();speak('The listener gasps at BANG and holds still at the end. Your voice matched the words.');S.want()}else{A.sound.miss();speak(`Line ${bad+1} confused the listener. ${SPOOK[bad].w}`)}keys();A.redraw()});A.every(()=>{if(k!==ver||!S.played||o.t>=1)return false;S.ph+=.35;return true})}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost sm'},pad,t).onclick=f};
 if(m==='sort'&&cur()>=0)FORM.forEach((f,j)=>B(`Put it in ${f}`,()=>sortTo(j)));
 if(m==='chart')S.grid.forEach((row,r)=>row.forEach((v,k)=>{if(v!==TRUTH[r][k])B(`${['Frog','Tom','Rain'][r]}: ${FEAT[k]}? ${v===1?'→ No':'→ Yes'}`,()=>cell(r,k))}));
 if(m==='haiku'){[0,1,2].forEach(i=>B(`👏 Clap line ${i+1}`,()=>clap(i)));MID.forEach((ws,k)=>{if(k!==S.mid)B(`Try: ${ws.join(' ').replace(/-/g,'')}`,()=>swap(k))})}
 if(m==='story'&&S.nq<4)POEMS[1].l.forEach((l,i)=>B(`Line ${i+1}: ${l}`,()=>story(i)));
 if(m==='perform'){SPOOK[S.sel].o.forEach((o,k)=>B(`Line ${S.sel+1}: ${o}`,()=>voice(S.sel,k)));B('🔀 Next line',()=>{S.sel=(S.sel+1)%4;keys();A.redraw()});B('🎭 Perform',perform)}}
function down(p){const m=mode();if(m==='sort'&&cur()>=0){if(inside(p,cardB())){S.drag={x:p.x,y:p.y};return true}const j=[0,1,2].find(k=>inside(p,binB(k)));if(j!=null)sortTo(j);return false}
 if(m==='chart'){for(let r=0;r<3;r++)for(let k=0;k<3;k++)if(inside(p,cellB(r,k)))cell(r,k);return false}
 if(m==='haiku'){const i=[0,1,2].find(k=>Math.abs(p.y-lineY(k)-A.H*.02)<A.H*.11);if(i===1&&S.clap[1]&&syl(MID[S.mid])!==7)swap((S.mid+1)%3);else if(i!=null)clap(i);return false}
 if(m==='story'){const i=[0,1,2,3].find(k=>inside(p,rowB(k)));if(i!=null)story(i);return false}
 if(m==='perform'){const i=[0,1,2,3].find(k=>inside(p,rowB(k)));if(i!=null){if(S.sel===i)voice(i,(S.pf[i]+1)%3);else{S.sel=i;keys();A.redraw()}}return false}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const j=[0,1,2].find(k=>inside(p,binB(k)));if(j!=null)sortTo(j);A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const reset=(n,f,msg,t)=>{ver++;fresh();S.want=ok(n,f,msg);speak(t);keys()};
function later(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*30+10:j*gap+200))}
const steps=[
{h:'Spot the form',p:'Poems come in different forms. Drag each poem to its form, or tap a form box.',
 predict:{q:'A poem has no rhyme and no steady beat. Is it still a poem?',opts:['No, poems must rhyme','Yes, it can be free verse','Only if it has 3 lines'],ans:1},task:'Sort all 3 poems',
 show:()=>{steps[0].go();later([0,1,2].map(j=>()=>sortTo(j)),500)},go:()=>reset(0,()=>S.at.every(v=>v>=0),'Haiku: 3 lines, 5-7-5. Narrative: a story. Free verse: no regular rhyme or beat.','Poem 1 of 3.')},
{h:'Feature chart',p:'Each form has its own features. Tap a box to say Yes or No.',task:'Fill the chart correctly',
 show:()=>{steps[1].go();later([0,1,2].flatMap(r=>[0,1,2].map(k=>()=>{S.grid[r][k]=TRUTH[r][k]===1?0:1;cell(r,k)})),120)},go:()=>reset(1,()=>S.grid.every((row,i)=>row.every((x,j)=>x===TRUTH[i][j])),'Only the narrative poem rhymes and tells a story. Only the haiku is 5-7-5.','Nine boxes to fill.')},
{h:'Clap a haiku',p:'A haiku has 3 lines. Count syllables, the beats in words, not the words. Clap each line. Then fix the middle line.',
 predict:{q:'How many syllables are in the middle line of a haiku?',opts:['5, like the others','7','17'],ans:1},task:'Make it 5-7-5 and clap all 3 lines',
 show:()=>{steps[2].go();later([()=>clap(0),()=>swap(2),()=>clap(1),()=>clap(2)],700)},go:()=>reset(2,()=>S.mid===2&&S.clap.every(v=>v)&&!S.beat,'5, 7, 5: seventeen syllables. Sil-ver adds the 2 beats the line needed.','The middle line is too short.')},
{h:'Find the story',p:'A narrative poem tells a story. It has a character, a problem and an ending, often with rhyme. Tap the line that answers each question.',task:'Find all 4 parts',
 show:()=>{steps[3].go();later(NQ.map(q=>()=>story(q[1])),400)},go:()=>reset(3,()=>S.nq>=4,'Tom, the wind, the way home and the rhymes make a story poem.','Tom and the Boat.')},
{h:'Perform it',p:'When you perform a poem, your voice shows what it means. Pick a voice for each line: volume, pace and intonation. Then press Perform.',
 predict:{q:'How should you read "Creep… creep… the cat comes near"?',opts:['As loud as you can','Soft and slow','Fast, to get it done'],ans:1},task:'Choose a voice for all 4 lines and Perform',
 show:()=>{steps[4].go();later([...SPOOK.map((s,i)=>()=>voice(i,s.a)),perform],300)},go:()=>reset(4,()=>S.played&&SPOOK.every((s,i)=>S.pf[i]===s.a),'Soft for creeping, rising for a question, loud for BANG, pauses for stillness.','A spooky poem to perform.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A poem has 3 lines of 5, 7 and 5 syllables. What form is it?',[['Haiku','ok'],['Narrative poem','story'],['Free verse','count']]],
 ['A poem tells how a girl lost her kite and found it again. What form is it?',[['Narrative poem','ok'],['Haiku','count'],['Not a poem, because it tells a story','story']]],
 ['A poem has no rhyme and no steady beat. Is it a poem?',[['Yes, it can be free verse','ok'],['No, poems must rhyme','rhyme'],['Only if it has 17 syllables','count']]],
 ['How many syllables are in "butterfly"?',[['3','ok'],['1','count'],['9','count']]],
 ['How do you read "Shh… the baby is asleep"?',[['Soft and slow','ok'],['Loud and fast','voice'],['Shout the last word','voice']]],
 ['How does your voice go at the end of "Is anyone there?"',[['Up','ok'],['Down','q'],['It stays flat','q']]]];
function why(t){let m='Look at the features: rhyme, story, syllable count.';
 if(t==='count')m='Count syllables, the beats you clap, not letters or words. A haiku is 5-7-5 syllables.';
 if(t==='story')m='A poem that tells a story with a character and a problem is a narrative poem. It is still a poem.';
 if(t==='rhyme')m='Poems do not have to rhyme. Free verse has no regular rhyme or beat.';
 if(t==='voice')m='Match your voice to the words: quiet words soft and slow, sudden words loud.';
 if(t==='q')m='A question usually ends with your voice going up. That is intonation.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Yes! ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
