/* Flagship – alternative spellings for known sounds (ages 6–8). One sound can have more than one spelling (a grapheme):
   post words into sound houses (j = j, g, ge, dge; s = s, c, ce; n = n, kn, gn), tap every letter that makes the sound
   (the k in knot is silent, so kn says n), drag dge or ge onto the end of a word by the vowel sound before it, and use
   the letter after c to decide if it says k or s. Every drag has a big button twin. */
(()=>{
const HOME=[{snd:'j',ways:'j  g  ge  dge',ex:'jam'},{snd:'s',ways:'s  c  ce',ex:'sun'},{snd:'n',ways:'n  kn  gn',ex:'net'}];
const POST=[['cage','ge',0],['city','c',1],['knee','kn',2],['giraffe','g',0],['mice','ce',1],['gnome','gn',2]];
const HUNT=[{w:'knot',pic:'🪢',snd:'n',hit:[0,1],tip:'k makes no sound in knot. k and n together say n.'},
 {w:'wrap',pic:'🎁',snd:'r',hit:[0,1],tip:'w makes no sound in wrap. w and r together say r.'},
 {w:'badge',pic:'📛',snd:'j',hit:[2,3,4],tip:'d, g and e together say j at the end of badge.'},
 {w:'treasure',pic:'💰',snd:'zh',hit:[4],tip:'In treasure, s says zh, like the middle of television.'}];
const ENDS=[{pre:'ba',w:'badge',pic:'📛',ans:'dge',v:'short a, like in bad'},{pre:'ca',w:'cage',pic:'🐦',ans:'ge',v:'long a, like in day'},
 {pre:'fu',w:'fudge',pic:'🍫',ans:'dge',v:'short u, like in up'},{pre:'hu',w:'huge',pic:'🐘',ans:'ge',v:'long u, like in you'}];
const CEES=[['cat',0],['city',1],['cup',0],['ice',1],['fancy',1],['cot',0]];
VIS.reg('flagaltsp',c=>{let A,pad,quiz,qn=-1,run=0,row=0;c.fig.classList.add('young');
const blank=()=>({at:0,got:0,need:3,bad:-1,lit:[],held:null,hot:[],after:()=>{},fast:0}),T=blank();
const kind=()=>['hello','houses','hunt','ends','cees','quiz'][A.step];
const px=v=>Math.round(v*(A.narrow?1:1.12)),quick=()=>A.reduced()||T.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function word(g,s,x,y,w,size,col,weight){g.font=`${weight||700} ${px(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[''];String(s).split(' ').forEach(p=>{const k=out.length-1,try_=out[k]?out[k]+' '+p:p;if(out[k]&&g.measureText(try_).width>w)out.push(p);else out[k]=try_});
 const step=px(size)*1.28;out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*step))}
function pic(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function tile(g,r,hue,edge){const C=A.col,h={ok:C.gr,no:C.rd,hot:C.am,sky:C.cy,lav:C.vi}[hue];g.save();A.paint.shadow(5,2,.12);
 g.fillStyle=h?A.mix(C.pn,h,.18):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();g.lineWidth=edge||(h?3:1.5);g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
const houses=()=>{const gap=8,w=(A.W-20-gap*2)/3,h=A.H*.36;return HOME.map((_,i)=>({x:10+i*(w+gap),y:A.H*.58,w,h}))};
const flying=()=>{const w=Math.min(A.W*.6,px(240)),h=px(70),d=T.held;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.3)-h/2,w,h}};
const letters=()=>{const L=HUNT[T.at].w.length,gap=6,w=Math.min(px(62),(A.W-24-gap*(L-1))/L),x0=(A.W-(w*L+gap*(L-1)))/2;return[...Array(L)].map((_,i)=>({x:x0+i*(w+gap),y:A.H*.42,w,h:px(78)}))};
const gapBox=()=>{const w=px(96),h=px(76);return{x:A.W/2-w/2+px(36),y:A.H*.27,w,h}};
const magnets=()=>{const w=px(110),h=px(72),gap=A.W*.12;return['dge','ge'].map((s,i)=>{const d=T.held;if(d&&d.i===i&&d.x!=null)return{x:d.x-w/2,y:d.y-h/2,w,h,s};return{x:A.W/2-w-gap/2+i*(w+gap),y:A.H*.7,w,h,s}})};
const pads=()=>{const gap=10,w=(A.W-24-gap)/2;return[0,1].map(i=>({x:12+i*(w+gap),y:A.H*.62,w,h:A.H*.3}))};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,k=kind();
 if(k==='quiz'){word(g,'One sound, more than one spelling. Read the letters, then say the sound.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(k==='hello'){word(g,'The j sound has lots of spellings',W/2,H*.09,W-30,18,C.tx,800);
  [['jam','j','🍓'],['giraffe','g','🦒'],['cage','ge','🐦'],['bridge','dge','🌉']].forEach(([w,gr,e],i)=>{const cw=(W-30)/2,r={x:10+(i%2)*(cw+10),y:H*.2+Math.floor(i/2)*(H*.34),w:cw,h:H*.3};tile(g,r,'lav');
   pic(g,e,r.x+r.w/2,r.y+r.h*.3,px(34));const at=w.indexOf(gr);g.font=`800 ${px(24)}px system-ui,sans-serif`;const full=g.measureText(w).width,a=g.measureText(w.slice(0,at)).width,b=g.measureText(gr).width;
   const x0=r.x+r.w/2-full/2,y=r.y+r.h*.72;g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(w,x0,y);g.fillStyle=A.alpha(C.am,.3);g.fillRect(x0+a-2,y-px(16),b+4,px(32));g.fillStyle=C.tx;g.fillText(gr,x0+a,y)});return}
 if(k==='houses'){word(g,'Drag the word to the house of its sound, or tap a house.',W/2,H*.07,W-24,16,C.tx,800);const hs=houses();T.hot=hs;
  hs.forEach((r,i)=>{tile(g,r,T.bad===i?'no':'sky',3);word(g,HOME[i].snd+' sound',r.x+r.w/2,r.y+px(20),r.w-8,17,C.tx,900);word(g,HOME[i].ways,r.x+r.w/2,r.y+px(46),r.w-8,13,C.mu,700);
   T.lit.filter(j=>POST[j][2]===i).forEach((j,q)=>word(g,'✓ '+POST[j][0],r.x+r.w/2,r.y+px(74)+q*px(22),r.w-8,14,C.tx,700))});
  if(T.got<T.need){const r=flying();tile(g,r,'hot',3);word(g,POST[T.at][0],r.x+r.w/2,r.y+r.h/2,r.w-16,26,C.tx,900)}}
 if(k==='hunt'){const h=HUNT[T.at];pic(g,h.pic,W/2,H*.15,px(46));word(g,`${h.w}: tap every letter that makes the ${h.snd} sound.`,W/2,H*.29,W-24,16,C.tx,800);
  const ls=letters();T.hot=ls;ls.forEach((r,i)=>{const on=T.lit.includes(i);tile(g,r,on?'ok':T.bad===i?'no':'',2.5);word(g,h.w[i],r.x+r.w/2,r.y+r.h/2,r.w,30,C.tx,900)});
  if(T.lit.length===h.hit.length)word(g,h.tip,W/2,H*.78,W-30,15,C.tx,800)}
 if(k==='ends'){const e=ENDS[T.at],gb=gapBox();pic(g,e.pic,W/2,H*.13,px(48));
  g.font=`900 ${px(34)}px system-ui,sans-serif`;g.textAlign='right';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(e.pre,gb.x-6,gb.y+gb.h/2);g.save();g.setLineDash([7,6]);g.strokeStyle=T.bad===9?C.rd:C.am;g.lineWidth=3;A.paint.rrect(gb.x,gb.y,gb.w,gb.h,14);g.stroke();g.restore();
  if(T.lit.includes(T.at))word(g,e.ans,gb.x+gb.w/2,gb.y+gb.h/2,gb.w,32,C.gr,900);
  word(g,`The vowel sound is a ${e.v}. Drag dge or ge into the gap.`,W/2,H*.52,W-24,15,C.tx,700);
  if(!T.lit.includes(T.at)){const ms=magnets();T.hot=ms;ms.forEach((r,i)=>{tile(g,r,T.bad===i?'no':'lav',3);word(g,r.s,r.x+r.w/2,r.y+r.h/2,r.w,28,C.tx,900)})}else T.hot=[]}
 if(k==='cees'){word(g,'Look at the letter after c. Does c say k or s?',W/2,H*.07,W-24,16,C.tx,800);const ps=pads();T.hot=ps;
  [['k','like cat','🐱'],['s','like sun','🐍']].forEach(([s,l,e],i)=>{const r=ps[i];tile(g,r,T.bad===i?'no':i?'sky':'hot',3);pic(g,e,r.x+r.w/2,r.y+r.h*.3,px(34));word(g,`c says ${s}`,r.x+r.w/2,r.y+r.h*.62,r.w-8,18,C.tx,900);word(g,l,r.x+r.w/2,r.y+r.h*.84,r.w-8,14,C.mu,700)});
  if(T.got<T.need){const w=CEES[T.at][0];g.font=`900 ${px(40)}px system-ui,sans-serif`;const full=g.measureText(w).width,x0=W/2-full/2,y=H*.33,ci=w.indexOf('c');
   const pre=g.measureText(w.slice(0,ci+1)).width,nx=g.measureText(w[ci+1]).width;g.fillStyle=A.alpha(C.cy,.28);g.fillRect(x0+pre-3,y-px(26),nx+6,px(52));
   g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(w,x0,y);word(g,`after c: ${w[ci+1]}`,W/2,H*.47,W-30,15,C.mu,700)}}
 A.fx.draw(g)}
function wrong(t,j){A.sound.miss();T.bad=j;tell(t);setTimeout(()=>{T.bad=-1;A.redraw()},quick()?10:1300);A.redraw()}
function scored(t){T.got++;A.sound.pop();tell(t);controls();A.redraw();T.after()}
function house(i){if(kind()!=='houses'||T.got>=T.need)return;const [w,gr,h]=POST[T.at];
 if(i!==h)return wrong(`Say “${w}”. The ${gr} makes the ${HOME[h].snd} sound, so it lives in the ${HOME[h].snd} house.`,i);
 T.lit.push(T.at);T.at++;scored(`${w}: ${gr} says ${HOME[h].snd}.`+(T.got+1<T.need?' Next word.':''))}
function letter(i){if(kind()!=='hunt'||T.got>=T.need)return;const h=HUNT[T.at];if(T.lit.includes(i))return;
 if(!h.hit.includes(i))return wrong(`${h.w[i]} is not part of the ${h.snd} sound in ${h.w}. Look again.`,i);
 T.lit.push(i);if(T.lit.length<h.hit.length){A.sound.tick();tell(`Yes, ${h.w[i]} is part of it. Is there another letter with it?`);controls();return A.redraw()}
 const was=T.at,tk=run;scored(`${h.w}: ${h.tip}`);if(T.got<T.need)setTimeout(()=>{if(tk!==run||T.at!==was)return;T.at++;T.lit=[];tell('Next word.');controls();A.redraw()},quick()?5:1500)}
function ending(s){if(kind()!=='ends'||T.got>=T.need||T.lit.includes(T.at))return;const e=ENDS[T.at];
 if(s!==e.ans)return wrong(e.ans==='dge'?`The ${e.v} is short. After a short vowel sound, use dge: ${e.w}.`:`The ${e.v} is long. After a long vowel sound, just ge: ${e.w}.`,s==='dge'?0:1);
 T.lit.push(T.at);const was=T.at,tk=run;scored(`${e.w}: ${e.ans} after a ${e.ans==='dge'?'short':'long'} vowel sound.`);
 if(T.got<T.need)setTimeout(()=>{if(tk!==run||T.at!==was)return;T.at++;tell('Next word.');controls();A.redraw()},quick()?5:1400)}
function cee(say){if(kind()!=='cees'||T.got>=T.need)return;const [w,soft]=CEES[T.at],nx=w[w.indexOf('c')+1];
 if(say!==soft)return wrong(soft?`In ${w}, c comes before ${nx}. Before e, i or y, c says s.`:`In ${w}, c comes before ${nx}. That is not e, i or y, so c says k.`,say);
 T.at++;scored(`${w}: c says ${soft?'s':'k'} before ${nx}.`)}
function controls(){if(!pad)return;pad.innerHTML='';const k=kind(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(k==='quiz'||k==='hello'||T.got>=T.need)return;
 if(k==='houses'){const w=POST[T.at][0];HOME.forEach((h,i)=>B(h.snd+' house',()=>house(i),`Post ${w} in the ${h.snd} sound house`))}
 if(k==='hunt'){const h=HUNT[T.at];h.w.split('').forEach((ch,i)=>{if(!T.lit.includes(i))B(ch,()=>letter(i),`Letter ${i+1} of ${h.w}: ${ch}`)})}
 if(k==='ends'&&!T.lit.includes(T.at)){const e=ENDS[T.at];['dge','ge'].forEach(s=>B(s,()=>ending(s),`Finish ${e.pre} with ${s}`))}
 if(k==='cees'){const w=CEES[T.at][0];B('c says k',()=>cee(0),`In ${w}, c says k`);B('c says s',()=>cee(1),`In ${w}, c says s`)}}
const hit=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const k=kind();if(k==='quiz'||k==='hello'||T.got>=T.need)return false;
 if(k==='houses'&&hit(p,flying(),6)){T.held={x:null,x0:p.x,y0:p.y};return true}
 if(k==='ends'){const i=magnets().findIndex(r=>hit(p,r,8));if(i>=0&&!T.lit.includes(T.at)){T.held={i,x:null,x0:p.x,y0:p.y};return true}return false}
 const i=T.hot.findIndex(r=>hit(p,r,3));if(i<0)return false;if(k==='houses')house(i);if(k==='hunt')letter(i);if(k==='cees')cee(i);return false}
function move(p){const d=T.held;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=T.held,k=kind();T.held=null;if(!d)return;
 if(k==='ends'){const s=['dge','ge'][d.i];if(d.x==null||hit(p,gapBox(),24))return ending(s);wrong('Drop the letters into the dashed gap at the end of the word.',9);return}
 if(d.x==null){tell('Drag the word into a house, or tap a house.');return A.redraw()}const i=houses().findIndex(r=>hit(p,r,14));if(i>=0)house(i);else{tell('Drop the word on one of the houses.');A.redraw()}}
const finish=(i,msg)=>()=>{if(A.step===i&&T.got>=T.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const k=++run,go=()=>{if(k!==run||T.got>=T.need)return;f();setTimeout(go,70)};setTimeout(go,30)}
const clear=()=>{run++;Object.assign(T,blank())};
function nextRight(){const k=kind();if(k==='houses')return house(POST[T.at][2]);if(k==='hunt'){const h=HUNT[T.at],i=h.hit.find(j=>!T.lit.includes(j));if(i!=null)return letter(i)}
 if(k==='ends')return ending(ENDS[T.at].ans);if(k==='cees')return cee(CEES[T.at][1])}
const demo=i=>()=>{steps[i].go();T.fast=1;auto(nextRight)};
const steps=[
{h:'One sound, many spellings',p:'A sound can be written in more than one way. The j sound is j in jam, g in giraffe, ge in cage and dge in bridge. The letters that make one sound are called a grapheme.',
 go:()=>{clear();tell('The j sound: j in jam, g in giraffe, ge in cage, dge in bridge.')}},
{h:'Sound houses',p:'Each house is one sound. Say the word, listen for the sound, and post it in the right house.',predict:{q:'Can one sound have more than one spelling?',opts:['No, each sound has just one','Yes, like j, g, ge and dge'],ans:1},task:'Post 6 words',show:demo(1),
 go:()=>{clear();T.need=6;tell('Say the word. Drag it to its sound house, or tap a house.');controls();T.after=finish(1,'ge and g say j, c and ce say s, kn and gn say n.')}},
{h:'Hidden letters',p:'Some spellings have a letter you do not hear. Tap every letter that makes the sound, even the quiet one.',predict:{q:'In knot, do you say the k?',opts:['Yes: k-not','No: kn says n'],ans:1},task:'Find the sound in 4 words',show:demo(2),
 go:()=>{clear();T.need=4;tell('Tap every letter that makes the sound.');controls();T.after=finish(2,'kn says n, wr says r, dge says j, and s can say zh.')}},
{h:'dge or ge?',p:'At the end of a word, the j sound is spelled dge or ge. Listen to the vowel sound just before it.',predict:{q:'After a short vowel sound, like the a in bad, which ending?',opts:['ge','dge'],ans:1},task:'Finish 4 words',show:demo(3),
 go:()=>{clear();T.need=4;tell('Drag dge or ge into the gap, or tap a button.');controls();T.after=finish(3,'Short vowel sound: dge (badge, fudge). Long vowel sound: ge (cage, huge).')}},
{h:'Soft c',p:'c can say k or s. Look at the next letter. Before e, i or y, c says s, as in city and ice.',predict:{q:'In city, does c say k like in cat?',opts:['Yes, c always says k','No, here c says s'],ans:1},task:'Read 6 c words',show:demo(4),
 go:()=>{clear();T.need=6;tell('Look at the letter after c. Tap c says k or c says s.');controls();T.after=finish(4,'Before e, i or y, c says s. Before other letters it says k.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.after()});
const QS=[['Read “gnome”. What is the first sound?',[['n','ok'],['g','sayg'],['k','k']]],
 ['Read “cell”. What sound does the c make?',[['s','ok'],['k','hard'],['ch','ch']]],
 ['Which ending makes “hu_” say huge?',[['ge','ok'],['dge','long'],['j','endj']]],
 ['Read “wrong”. Do you say the w?',[['No, wr says r','ok'],['Yes, w-rong','sayw'],['Only if you say it loud','loud']]],
 ['In “treasure”, what sound does the s make?',[['zh, like in television','ok'],['s, like in sun','s'],['sh, like in ship','sh']]],
 ['Which word has the j sound spelled dge?',[['bridge','ok'],['jump','plainj'],['giant','gj']]]];
function why(t){let m='Say the word, then find the letters that make the sound.';
 if(t==='sayg')m='In gnome the g makes no sound. gn says n, like in gnat.';if(t==='k')m='There is no k in gnome. gn at the start says n.';
 if(t==='hard')m='c is before e here. Before e, i or y, c says s: cell.';if(t==='ch')m='c on its own does not say ch. Before e it says s.';
 if(t==='long')m='The u in huge is long, like in you. After a long vowel sound, just ge.';if(t==='endj')m='English words almost never end in j. At the end, the j sound is ge or dge.';
 if(t==='sayw')m='In wrong the w is quiet. wr says r, like in write.';if(t==='loud')m='Saying it loud does not change it. wr always says r.';
 if(t==='s')m='Say treasure slowly. The s sounds like the middle of television: zh.';if(t==='sh')m='Close! But it is the softer buzzy sound zh, as in television.';
 if(t==='plainj')m='jump has the j sound, but it is spelled with j. Look for d, g, e together.';if(t==='gj')m='giant spells the j sound with g. dge comes after a short vowel: bridge.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});controls()}});
A.start()})})();
