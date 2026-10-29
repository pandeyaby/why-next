/* Flagship – starting and ending sentences (ages 5–8): tap the first word to give it a capital letter; drag a full stop
   to the end of the idea (not into the middle); choose the end mark by what a sentence does: tells (.), asks (?) or shows
   a big feeling or a shout (!), with the "What a…" trap that looks like a question; then find where one sentence stops
   and the next starts in a run-on line. Challenge on the usual slips: no capital, no end mark, a capital in the middle,
   a full stop on a question, two sentences run together. */
(()=>{
const CAPS=[['the','cat','sat','on','the','mat'],['my','dog','likes','to','dig'],['we','went','to','the','park']];
const STOPS=[['The','sun','is','hot'],['A','frog','can','jump'],['We','had','fish','for','tea']];
const ASKS=[[['Can','you','see','the','moon'],'?'],[['The','moon','is','round'],'.'],[['Where','is','my','hat'],'?'],[['Dogs','can','swim'],'.']];
const LOUD=[[['What','a','big','cake','this','is'],'!'],[['Ouch,','that','hurts'],'!'],[['Is','it','raining'],'?'],[['I','have','a','red','coat'],'.']];
const SPLIT=[[['We','went','to','the','park','we','fed','the','ducks'],5],[['My','cat','is','black','she','likes','milk'],4],[['It','was','raining','we','got','wet'],3]];
const MARK={'.':'full stop','?':'question mark','!':'exclamation mark'},MOOD={'.':['🙂','telling'],'?':['🤔','asking'],'!':['😮','big feeling or shout']};
const ASKW=/^(can|where|what|who|why|how|is|do|does|are|when)$/i;
VIS.reg('flagstop',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={tok:0,run:0,want:()=>{},k:0,done:0,cap:-1,mark:'',stops:[],bad:-1,drag:null,flash:''};
const at=()=>['cap','stop','ask','loud','split','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.2));
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,k,w,al){g.font=`${w||700} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=k||A.col.tx;g.fillText(t,x,y)}
function box(g,r,fill,edge,lw,dash){g.save();if(dash)g.setLineDash([6,5]);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const inside=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
// the words of the sentence on screen right now, with capitals and inner full stops applied
function shown(){const v=at();
 if(v==='cap')return CAPS[S.k].map((w,i)=>i===0&&S.cap===0?w[0].toUpperCase()+w.slice(1):w);
 if(v==='stop')return STOPS[S.k].slice();
 if(v==='ask')return ASKS[S.k][0].slice();if(v==='loud')return LOUD[S.k][0].slice();
 if(v==='split'){const[w]=SPLIT[S.k];return w.map((x,i)=>(S.stops.includes(i)?x[0].toUpperCase()+x.slice(1):x)+(S.stops.includes(i+1)?'.':''))}return[]}
// flow the word tiles left to right, wrapping on phones; gaps sit between tiles, the end slot after the last one
function layout(){const g=A.ctx,ws=shown(),n=f(A.narrow?20:22),sp=f(16),lh=n*2.3;g.font=`700 ${n}px system-ui,sans-serif`;let x=14,y=A.H*.18;const out=[];
 ws.forEach((w,i)=>{const ww=g.measureText(w).width+f(14);if(x+ww>A.W-14-n*1.6&&i){x=14;y+=lh}out.push({x,y,w:ww,h:n*1.7});x+=ww+sp});
 const L=out[out.length-1]||{x:14,y,w:0,h:n*1.7},end={x:L.x+L.w+6,y:L.y,w:n*1.5,h:n*1.7};
 const gaps=out.map((r,i)=>i?{x:out[i-1].x+out[i-1].w-6,y:out[i-1].y,w:sp+12,h:r.h}:null);gaps.push({x:end.x-8,y:end.y,w:Math.max(end.w+10,A.W-end.x),h:end.h});return{tiles:out,gaps,end,n}}
const chipsFor=()=>({stop:['.'],ask:['.','?','!'],loud:['.','?','!']})[at()]||[];
const chip=i=>{const k=chipsFor().length,s=f(56),gap=f(18),x0=A.W/2-(k*s+(k-1)*gap)/2;return{x:x0+i*(s+gap),y:A.H*.8,w:s,h:s}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=at();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Capital letter at the start.',W/2,H*.38,18,C.tx,800);txt(g,'. ? or ! at the end.',W/2,H*.56,18,C.tx,800);return}
 const sets={cap:CAPS,stop:STOPS,ask:ASKS,loud:LOUD,split:SPLIT}[v];txt(g,`Line ${S.k+1} of ${sets.length}`,14,H*.07,12,C.tx,700,'left');
 const L=layout();L.tiles.forEach((r,i)=>{const ws=shown(),hot=(v==='cap'&&i===0&&S.cap===0)||(v==='split'&&S.stops.includes(i));
  box(g,r,A.alpha(hot?C.gr:C.cy,hot?.25:.12),S.bad===i?C.rd:C.tx,S.bad===i?3:1.5);txt(g,ws[i],r.x+r.w/2,r.y+r.h/2,A.narrow?20:22,C.tx,700)});
 if(v==='split'||v==='cap')txt(g,'.',L.end.x+L.end.w*.3,L.end.y+L.end.h/2,26,C.tx,900);
 else{const m=S.mark;box(g,L.end,A.alpha(m?C.gr:C.or,m?.25:.12),S.bad===99?C.rd:C.tx,S.bad===99?3:2,!m);if(m)txt(g,m,L.end.x+L.end.w/2,L.end.y+L.end.h/2,28,C.tx,900)}
 if(v==='stop'&&S.bad>0&&S.bad<99){const q=L.gaps[S.bad];if(q)txt(g,'.',q.x+q.w/2,q.y+q.h/2,26,C.rd,900)}
 if((v==='ask'||v==='loud')&&S.mark){const[e,w]=MOOD[S.mark];txt(g,e,W/2,H*.6,30);txt(g,w,W/2,H*.6+f(26),13,C.tx,700)}
 if(v==='split')txt(g,`Full stops inside: ${S.stops.length} of 1`,W/2,H*.66,13,C.tx,700);
 if(S.flash)txt(g,S.flash,W/2,H*.72,13,C.tx,800);
 chipsFor().forEach((m,i)=>{if(S.mark)return;let r=chip(i);if(S.drag&&S.drag.m===m)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};box(g,r,A.alpha(C.vi,.22),C.tx,2);txt(g,m,r.x+r.w/2,r.y+r.h/2-2,30,C.tx,900)});
 A.fx.draw(g)}
const nope=t=>{A.sound.miss();speak(t);ctrl();A.redraw()};
function next(n){const k=++S.tok;setTimeout(()=>{if(k!==S.tok)return;S.k++;S.cap=-1;S.mark='';S.stops=[];S.bad=-1;S.flash='';ctrl();A.redraw();S.want()},A.reduced()?10:500)}
function yep(t,n){A.sound.pop();speak(t);S.done++;S.bad=-1;ctrl();A.redraw();if(S.k<n-1)next(n);else S.want()}
function capital(i){if(at()!=='cap'||S.cap===0)return;const ws=CAPS[S.k];
 if(i!==0){S.bad=i;return nope(`“${ws[i]}” is in the middle. Only the first word, “${ws[0]}”, starts with a capital letter.`)}
 S.cap=0;S.flash='Capital letter!';yep(`${ws[0][0].toUpperCase()}${ws[0].slice(1)}: the first word starts with a capital letter.`,CAPS.length)}
function stopAt(gap){if(at()!=='stop'||S.mark)return;const ws=STOPS[S.k];S.drag=null;
 if(gap<ws.length){S.bad=gap;return nope(`“${ws.slice(0,gap).join(' ')}.” stops too soon. The idea is not finished. Put the full stop after the last word.`)}
 S.mark='.';S.flash='Full stop!';yep(`${ws.join(' ')}. The full stop goes after the last word.`,STOPS.length)}
function endWith(m){const v=at();if((v!=='ask'&&v!=='loud')||S.mark)return;const set=v==='ask'?ASKS:LOUD,[ws,want]=set[S.k],s=ws.join(' ');S.drag=null;
 if(m!==want){S.bad=99;let t;
  if(want==='?')t=m==='.'?`“${s}” asks something, so it needs a question mark.${ASKW.test(ws[0])?` “${ws[0]}” at the start is a clue.`:''}`:`It is asking, not shouting. Asking needs a question mark.`;
  else if(want==='.')t=m==='?'?`“${s}” tells you something. It does not ask, so it ends with a full stop.`:`It is calm telling, not a shout or a big feeling, so it ends with a full stop.`;
  else t=m==='?'?`“${s}” starts with ${ws[0]}, but it does not ask anything. It shows surprise, so it needs an exclamation mark.`:`That is a big feeling! A big feeling or a shout needs an exclamation mark.`;
  return nope(t)}
 S.mark=m;yep(`${s}${m} That is ${MOOD[m][1]}, so it ends with a ${MARK[m]}.`,set.length)}
function split(gap){if(at()!=='split'||S.stops.length)return;const[ws,want]=SPLIT[S.k];if(gap<1||gap>=ws.length)return;
 if(gap!==want){S.bad=gap<want?gap-1:gap;return nope(gap<want?`“${ws.slice(0,gap).join(' ')}” is not a whole idea yet. Read on to where the first idea ends.`:`That is too late. “${ws.slice(0,want).join(' ')}” was already a whole idea.`)}
 S.stops=[gap];const a=ws.slice(0,gap).join(' '),b=ws.slice(gap);S.flash='Two sentences!';yep(`${a}. ${b[0][0].toUpperCase()+b[0].slice(1)} ${b.slice(1).join(' ')}. Full stop, then a capital letter for the new sentence.`,SPLIT.length)}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=at(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='cap'&&S.cap<0){c.el('p',{class:'fl-tk'},ctl,'Which word gets the capital letter?');CAPS[S.k].forEach((w,i)=>B(w,()=>capital(i),'Capital letter on '+w))}
 if(v==='stop'&&!S.mark){c.el('p',{class:'fl-tk'},ctl,'Put the full stop after…');STOPS[S.k].forEach((w,i)=>B('“'+w+'”',()=>stopAt(i+1),'Full stop after '+w))}
 if((v==='ask'||v==='loud')&&!S.mark)['.','?','!'].forEach(m=>B(m+' '+MARK[m],()=>endWith(m),'End with a '+MARK[m]));
 if(v==='split'&&!S.stops.length){c.el('p',{class:'fl-tk'},ctl,'The first sentence stops after…');SPLIT[S.k][0].slice(0,-1).forEach((w,i)=>B('“'+w+'”',()=>split(i+1),'Full stop after '+w))}
 A.redraw()}
// a tap or drop on a gap, or on a word (a bigger target for small fingers), means: the sentence stops after that word
function after(p,L,pad){const g=L.gaps.findIndex(r=>r&&inside(p,{x:r.x-pad,y:r.y-pad,w:r.w+2*pad,h:r.h+2*pad}));if(g>0)return g;const t=L.tiles.findIndex(r=>inside(p,{x:r.x,y:r.y-pad,w:r.w,h:r.h+2*pad}));return t>=0?t+1:-1}
function down(p){const v=at(),L=layout();
 if(v==='cap'){const i=L.tiles.findIndex(r=>inside(p,r));if(i>=0)capital(i);return false}
 if(v==='split'){const i=after(p,L,0);if(i>0)split(i);return false}
 if(v==='stop'&&!S.mark){const i=after(p,L,0);if(i>0){stopAt(i);return false}}
 if(S.mark)return false;const ch=chipsFor(),i=ch.findIndex((_,i)=>inside(p,chip(i)));if(i>=0){S.drag={m:ch[i],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag,v=at();if(!d)return;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8,L=layout();
 if(v==='stop'){if(tap){S.drag=null;speak('Drag the full stop to where the sentence ends, or tap a gap.');return A.redraw()}const i=after(p,L,14);if(i>0)return stopAt(i);S.drag=null;return A.redraw()}
 if(tap||inside(p,{x:L.end.x-30,y:L.end.y-30,w:L.end.w+60,h:L.end.h+60})||p.y<A.H*.7)return endWith(d.m);S.drag=null;A.redraw()}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
// a Show me chain: one action every 800 ms, after the previous line has moved on (its own token, so next() can't cancel it)
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*60+30:(j+1)*800))}
const reset=()=>{S.tok++;S.run++;Object.assign(S,{want:()=>{},k:0,done:0,cap:-1,mark:'',stops:[],bad:-1,drag:null,flash:''})};
const steps=[
{h:'A capital letter starts it',p:'A sentence always starts with a capital letter. Tap the word that needs one.',
 predict:{q:'In “the cat sat on the mat”, which words need a capital letter?',opts:['Every word','Just the first word'],ans:1},task:'Give three sentences a capital letter',
 show:()=>{steps[0].go();chain(CAPS.map(()=>()=>capital(0)))},go:()=>{reset();speak('Tap the word that needs a capital letter.');ctrl();S.want=fin(0,()=>S.done>=3,'A capital letter goes on the first word.')}},
{h:'A full stop ends it',p:'A full stop shows the idea is finished. Drag the dot to the right place, or tap the word it goes after.',task:'End three sentences with a full stop',
 show:()=>{steps[1].go();chain(STOPS.map(ws=>()=>stopAt(ws.length)))},go:()=>{reset();speak('Drag the full stop to where the sentence ends.');ctrl();S.want=fin(1,()=>S.done>=3,'The full stop goes after the last word.')}},
{h:'Telling or asking?',p:'A telling sentence ends with a full stop. An asking sentence ends with a question mark. Drag the right mark to the box.',
 predict:{q:'“Where is my hat” ends with…',opts:['a full stop','a question mark'],ans:1},task:'End all four sentences',
 show:()=>{steps[2].go();chain(ASKS.map(([,m])=>()=>endWith(m)))},go:()=>{reset();speak('Drag a full stop or a question mark to the box.');ctrl();S.want=fin(2,()=>S.done>=4,'Telling ends with a full stop. Asking ends with a question mark.')}},
{h:'Big feelings!',p:'An exclamation mark shows a big feeling, a surprise or a shout. Read each one in your head. How does it sound?',
 predict:{q:'“What a big cake this is” ends with…',opts:['a question mark','an exclamation mark'],ans:1},task:'End all four sentences',
 show:()=>{steps[3].go();chain(LOUD.map(([,m])=>()=>endWith(m)))},go:()=>{reset();speak('Pick the mark that fits how it sounds.');ctrl();S.want=fin(3,()=>S.done>=4,'Surprise or a shout gets an exclamation mark.')}},
{h:'Where does it stop?',p:'These lines have two sentences squashed together. Tap the word where the first idea ends. You get a full stop, and the next word gets a capital.',
 predict:{q:'How many sentences are in “We went to the park we fed the ducks”?',opts:['One','Two'],ans:1},task:'Split three lines into two sentences',
 show:()=>{steps[4].go();chain(SPLIT.map(([,g])=>()=>split(g)))},go:()=>{reset();speak('Tap the gap where the first sentence stops.');ctrl();S.want=fin(4,()=>S.done>=3,'One idea, one sentence: full stop, then a capital.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one is written the right way?',[['The bus is late.','ok'],['the bus is late.','nocap'],['The bus is late','nostop']]],
 ['Which mark goes at the end? “Is it time for lunch”',[['? question mark','ok'],['. full stop','tell'],['! exclamation mark','loud']]],
 ['Which mark goes at the end? “What a big dog that is”',[['! exclamation mark','ok'],['? question mark','whatq'],['. full stop','flat']]],
 ['Which one has two sentences written the right way?',[['I ran. I won.','ok'],['I ran I won.','runon'],['I ran. i won.','nocap2']]],
 ['Where does the capital letter go? “my hat is blue.”',[['On the m in my','ok'],['On the h in hat','middle'],['On every word','every']]]];
function why(tag){let m='Look at the start and the end of the sentence again.';
 if(tag==='nocap')m='It needs a capital letter at the start: The, not the.';
 if(tag==='nostop')m='It has a capital, but no mark at the end. Add a full stop to show it is finished.';
 if(tag==='tell')m='“Is it…” asks something, so it needs a question mark, not a full stop.';
 if(tag==='loud')m='It is asking, not shouting. Use a question mark.';
 if(tag==='whatq')m='“What a big dog that is” starts with What, but it does not ask anything. It shows surprise, so use an exclamation mark.';
 if(tag==='flat')m='“What a big dog that is” shows surprise. A full stop sounds too calm. Use an exclamation mark.';
 if(tag==='runon')m='That squashes two ideas together. Put a full stop after ran.';
 if(tag==='nocap2')m='The full stop is right, but the new sentence needs a capital: I won.';
 if(tag==='middle')m='Hat is in the middle. Only the first word starts with a capital letter.';
 if(tag==='every')m='Not every word. Only the first word, and names, start with a capital letter.';
 return m}
function quiz(){ask++;const[q,ops]=QS[ask%QS.length],turn=ask%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
function mark(tag){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Capital at the start, the right mark at the end.':'✗ '+why(tag)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
