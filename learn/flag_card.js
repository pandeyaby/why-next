/* Flagship – writing a card: To, a message and From (English, Writing Composition, ages 4-5; Development Matters
   2021 Reception Literacy, EYFS 2024 ELG Writing, NC England Y1-Y2 Writing composition). The learner drags word
   tags onto real cards: To and the right name at the top (not their own name, not From), a message that fits the
   picture (cake, present, poorly face), Love from and their own name at the bottom, a whole card built part by part,
   then each card into the envelope with the name after To (not the sender's). Data and drawings: card_art.js. */
(()=>{const K=CRD;
VIS.reg('flagcard',c=>{let A,tray,chal,qn=-1,tick=0,hold=null;const S={};c.fig.classList.add('young');
const STEPS=['to','fit','sign','build','post','quiz'],cur=()=>STEPS[A.step];
const isIn=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const px=n=>A.narrow?n:Math.round(n*1.1),night=()=>A.col.dark;
let TOK=[],TGT=[],POSTCARD=null;
function wrapLine(t,max,font){const g=A.ctx;g.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&g.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
/* the instruction at the top, with the last reply under it; returns the first free y */
function head(t,tone){const g=A.ctx,f=`800 ${px(17)}${K.FONT}`,R=wrapLine(t,A.W-34,f),lh=px(17)*1.3,h=R.length*lh+14;
 g.fillStyle=tone==='ok'||tone==='quiz'?(night()?'#14532d':'#dcfce7'):tone==='no'?(night()?'#7f1d1d':'#fee2e2'):(night()?'#1e293b':'#ffffff');K.box(g,8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'||tone==='quiz'?K.OK:tone==='no'?K.NO:K.RIM;g.stroke();g.font=f;g.fillStyle=night()?'#f1f5f9':K.INK;g.textAlign='left';g.textBaseline='top';R.forEach((r,i)=>g.fillText(r,17,15+i*lh));
 /* a fixed-height reply area: the card stays still when a reply appears */
 let y=h+14;const rows=A.narrow?3:2;if(S.say){const f2=`700 ${px(15)}${K.FONT}`,R2=wrapLine(S.say,A.W-34,f2).slice(0,rows);g.font=f2;g.fillStyle=S.bad?(night()?'#fca5a5':K.NO):(night()?'#86efac':K.OK);R2.forEach((r,i)=>g.fillText(r,17,y+i*px(15)*1.3))}if(tone!=='quiz')y+=rows*px(15)*1.3+6;return y}
/* word tags sit in a tray at the bottom: one row on a wide screen, a column on a phone */
function trayRects(n){const gap=8,cols=A.narrow?1:n,rows=Math.ceil(n/cols),h=A.narrow?44:56,w=(A.W-16-gap*(cols-1))/cols,top=A.H-8-rows*h-(rows-1)*gap;
 return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const spin=(list,k)=>{const s=(k+1)%list.length;return list.slice(s).concat(list.slice(0,s))};
/* what each tag is, round by round */
function tagsFor(m,k){const C=K.CARDS[k];if(m==='to')return spin([[`To ${C.to}`,'ok'],[`To ${C.from}`,'self'],[`From ${C.to}`,'word']],k);
 if(m==='sign')return spin([[`Love from ${C.from}`,'ok'],[`Love from ${C.to}`,'who'],[`To ${C.from}`,'word2']],k);
 if(m==='post')return[[`To ${C.to}`,'card']];
 if(m==='fit')return[[K.CARDS[1].msg,1],[K.CARDS[2].msg,2],[K.CARDS[0].msg,0]];
 return[[K.CARDS[1].msg,1],[`Love from ${K.CARDS[1].from}`,2],[`To ${K.CARDS[1].to}`,0]]}
const envNames=k=>spin([[K.CARDS[k].to,'ok'],[K.CARDS[k].from,'env'],[K.OTHER[k],'other']],k+1);
/* judge putting tag i on target j; returns 'ok' or the slip */
function judge(m,i,j){const T=tagsFor(m,S.k)[i];
 if(m==='to')return T[1];
 if(m==='sign'){if(T[1]!=='ok')return T[1];return j===2?'ok':'place'}
 if(m==='post')return envNames(S.k)[j][1];
 if(m==='fit')return T[1]===j?'ok':'fit';
 const want=T[1];if(want===j)return'ok';return want===2&&j===0?'place':want===0&&j===2?'tobottom':'mid'}
function place(i,j){const m=cur();if(S.fin||S.wait)return;if(m==='fit'||m==='build'){if(S.used.includes(i))return;if(S.filled[j]!=null)return say('That place is full. Choose an empty one.',true)}
 const r=judge(m,i,j);S.sel=null;if(r!=='ok'){S.miss={i,j};A.sound.miss();return say(why(r),true)}
 S.miss=null;A.sound.pop();
 if(m==='fit'||m==='build'){S.used.push(i);S.filled[j]=i;const left=3-S.used.length;if(!left){S.fin=true;return say(m==='fit'?'Every message fits its card.':'The whole card is ready.',false)}return say(`Yes! ${left} more to go.`,false)}
 S.done=true;S.wait=true;say(m==='to'?'Yes. That tells who the card is for.':m==='sign'?'Yes. Now Gran knows who it is from.'.replace('Gran',K.CARDS[S.k].to):'Yes. That is the name after To.',false);const t0=tick;
 setTimeout(()=>{if(t0!==tick)return;S.wait=false;S.done=false;S.k++;if(S.k>=3){S.fin=true;return say('All 3 cards done!',false)}say(`Next: ${K.CARDS[S.k].from}\u2019s card for ${K.CARDS[S.k].to}.`,false)},800)}
/* tap a tag to hold it, then tap a target; one-target steps place it straight away */
function pickTag(i){if(S.fin||S.wait)return;if((cur()==='fit'||cur()==='build')&&S.used.includes(i))return;if(cur()==='to')return place(i,0);S.sel=i;A.sound.tick();say(`Holding \u201C${tagsFor(cur(),S.k)[i][0]}\u201D. Now choose where it goes.`,false)}
function pickTarget(j){if(S.sel==null){if(cur()==='post')return place(0,j);return say('First pick a tag at the bottom.',true)}place(S.sel,j)}
/* ---- painting ---- */
function oneCard(y0,lines,bad){const tr=trayRects(3),bottom=tr[0].y-10,h=Math.min(bottom-y0,A.narrow?260:300),w=Math.min(A.W-16,h*1.45),r={x:(A.W-w)/2,y:y0,w,h};
 const C=K.CARDS[cur()==='build'?1:Math.min(S.k,2)];K.card(A.ctx,r,{pic:C.pic,lines,bad,lit:S.sel!=null});return r}
function paintTo(){const C=K.CARDS[Math.min(S.k,2)],y0=head(S.fin?K.DONE[0]:`${C.from} makes ${K.KIND[C.kind]} for ${C.to}. Drag the right tag to the top. (${S.k+1} of 3)`,S.fin?'ok':S.bad?'no':'');
 const r=oneCard(y0,S.done||S.fin?[`To ${C.to}`]:[],S.miss?0:undefined);TGT=[K.slots(r)[0]];paintTags()}
function paintSign(){const C=K.CARDS[Math.min(S.k,2)],y0=head(S.fin?K.DONE[2]:`${C.from} made this card. Drag the right Love from tag to its place. (${S.k+1} of 3)`,S.fin?'ok':S.bad?'no':'');
 const r=oneCard(y0,[`To ${C.to}`,C.msg,S.done||S.fin?`Love from ${C.from}`:''],S.miss?S.miss.j:undefined);TGT=K.slots(r);paintTags()}
function paintBuild(){const y0=head(S.fin?K.DONE[3]:`Mia makes a thank-you card for Dad. Drag each part to its place: ${S.used.length} of 3.`,S.fin?'ok':S.bad?'no':''),T=tagsFor('build',0);
 const r=oneCard(y0,[0,1,2].map(j=>S.filled[j]!=null?T[S.filled[j]][0]:''),S.miss?S.miss.j:undefined);TGT=K.slots(r);paintTags()}
function paintFit(){const y0=head(S.fin?K.DONE[1]:`Drag each message onto the card it fits: ${S.used.length} of 3.`,S.fin?'ok':S.bad?'no':''),g=A.ctx,tr=trayRects(3),gap=10,bottom=tr[0].y-10;
 const w=(A.W-16-2*gap)/3,h=Math.min(bottom-y0,w*1.6,240),T=tagsFor('fit',0);TGT=[0,1,2].map(j=>({x:8+j*(w+gap),y:y0,w,h}));
 TGT.forEach((r,j)=>{const C=K.CARDS[j];g.fillStyle=S.miss&&S.miss.j===j?'#fee2e2':'#fffbeb';g.strokeStyle=S.miss&&S.miss.j===j?K.NO:S.sel!=null?'#1d4ed8':K.RIM;g.lineWidth=S.sel!=null||(S.miss&&S.miss.j===j)?4:2;K.box(g,r.x,r.y,r.w,r.h,10);g.fill();g.stroke();
  K.emo(g,C.pic,r.x+r.w/2,r.y+r.h*.3,Math.min(r.w,r.h)*.36);g.font=`800 ${px(13)}${K.FONT}`;g.fillStyle=K.INK;g.textAlign='center';g.textBaseline='middle';g.fillText(`To ${C.to}`,r.x+r.w/2,r.y+r.h*.6,r.w-8);
  if(S.filled[j]!=null){const t=T[S.filled[j]][0],R=wrapLine(t,r.w-10,`800 ${px(13)}${K.FONT}`);g.fillStyle='#be185d';R.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h*.78+i*px(13)*1.2,r.w-8))}});paintTags()}
function paintPost(){const C=K.CARDS[Math.min(S.k,2)],y0=head(S.fin?K.DONE[4]:`Post ${C.from}\u2019s card. Drag the card into the right envelope. (${S.k+1} of 3)`,S.fin?'ok':S.bad?'no':''),g=A.ctx,tr=trayRects(1),gap=10;
 const w=(A.W-16-2*gap)/3,h=Math.min(w*.7,tr[0].y-y0-20),E=envNames(Math.min(S.k,2));TGT=[0,1,2].map(j=>({x:8+j*(w+gap),y:y0+6,w,h}));
 TGT.forEach((r,j)=>K.envelope(g,r,E[j][0],{ok:S.done&&E[j][1]==='ok',no:S.miss&&S.miss.j===j}));
 /* the finished card waiting to be posted, between the envelopes and its tag */
 if(!S.fin&&!S.done){const top=y0+h+18,room=tr[0].y-12-top,ch=Math.min(room,A.narrow?200:230),cw=Math.min(A.W-16,ch*1.45);POSTCARD=ch>80?{x:(A.W-cw)/2,y:top,w:cw,h:ch}:null;if(POSTCARD&&!hold)K.card(g,POSTCARD,{pic:C.pic,lines:[`To ${C.to}`,C.msg,`Love from ${C.from}`]})}
 if(!S.fin)paintTags()}
function paintTags(){const g=A.ctx;if(S.fin){TOK=[];return}const T=tagsFor(cur(),S.k),R=trayRects(T.length);TOK=R.map((r,i)=>({i,...r}));
 TOK.forEach((r,i)=>{if(hold&&hold.i===i)return;K.tag(g,r,T[i][0],{sel:S.sel===i,no:S.miss&&S.miss.i===i,used:(cur()==='fit'||cur()==='build')&&S.used.includes(i)})});
 if(hold){const r=TOK[hold.i];K.tag(g,{x:hold.x-r.w/2,y:hold.y-r.h/2,w:r.w,h:r.h},T[hold.i][0],{sel:true})}}
const PAINT={to:paintTo,fit:paintFit,sign:paintSign,build:paintBuild,post:paintPost};
function draw(){const g=A.ctx;g.fillStyle=night()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=cur();
 if(m==='quiz'){const y0=head('Challenge: cards and envelopes','quiz'),h=Math.min(A.H-y0-16,240),w=Math.min(A.W-16,h*1.45);K.card(g,{x:(A.W-w)/2,y:y0,w,h},{pic:'\u{1F382}',lines:['To Gran','Happy birthday!','Love from Sam']});return}
 PAINT[m]();A.fx.draw(g)}
/* ---- pointer: drag a tag onto a target, or tap ---- */
function down(p){if(cur()==='post'&&!S.fin&&!S.wait&&isIn(p,POSTCARD)){hold={i:0,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const t=TOK.find(b=>isIn(p,b));if(t&&!S.fin&&!((cur()==='fit'||cur()==='build')&&S.used.includes(t.i))){hold={i:t.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
 const j=TGT.findIndex(b=>isIn(p,b));if(j>=0)pickTarget(j);return false}
function move(p){if(hold){hold.x=p.x;hold.y=p.y;A.redraw()}}
function up(p){if(!hold)return;const h=hold;hold=null;if(Math.hypot(p.x-h.x0,p.y-h.y0)<8)return pickTag(h.i);const j=TGT.findIndex(b=>isIn(p,b));if(j>=0)place(h.i,j);else A.redraw()}
function clear(){tick++;hold=null;POSTCARD=null;for(const k in S)delete S[k];Object.assign(S,{k:0,sel:null,miss:null,used:[],filled:[null,null,null],done:false,wait:false,fin:false,say:null,bad:false,goal:()=>{}})}
function say(t,bad){S.say=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.goal()}
function open(i){clear();c.say(K.DESC[i]);A.cv.setAttribute('aria-label',K.DESC[i]);S.goal=()=>{if(A.step===i&&S.fin&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(K.DONE[i]+A.reveal(i))};keys();A.redraw()}
function play(i,acts,gap){steps[i].go();const t0=tick;acts.reduce((t,f)=>{t+=gap||600;setTimeout(()=>{if(t0===tick)f()},t);return t},0)}
const okTag=(m,k)=>tagsFor(m,k).findIndex(x=>x[1]==='ok');
const SPOT=['at the top','in the middle','at the bottom'];
/* the same moves as buttons, for keyboards and switch users */
function keys(){if(!tray)return;tray.innerHTML='';const m=cur(),add=(t,f,l,on)=>{const b=c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t);if(on!=null)b.setAttribute('aria-pressed',String(on));b.onclick=f};
 if(m==='quiz'||S.fin)return;const T=tagsFor(m,S.k);
 if(m!=='post')T.forEach(([t],i)=>{if((m==='fit'||m==='build')&&S.used.includes(i))return;add(t,()=>pickTag(i),m==='to'?`Put ${t} at the top of the card`:`Pick the tag ${t}`,m==='to'?null:S.sel===i)});
 if(m==='post')envNames(S.k).forEach(([n],j)=>add(`Envelope: ${n}`,()=>pickTarget(j),`Put the card in the envelope for ${n}`));
 if(S.sel!=null&&(m==='sign'||m==='build'))[0,1,2].forEach(j=>add(`Put it ${SPOT[j]}`,()=>pickTarget(j)));
 if(S.sel!=null&&m==='fit')K.CARDS.forEach((C,j)=>add(`On the ${K.KIND[C.kind]}`,()=>pickTarget(j)))}
const steps=[
{h:'Who is it for?',p:K.TXT[0],predict:{q:'Sam makes a card for Gran. Which name goes after To?',opts:['Sam','Gran'],ans:1},task:'Put the right To tag on 3 cards',
 show:()=>play(0,[0,1,2].map(k=>()=>place(okTag('to',k),0)),1100),go:()=>open(0)},
{h:'Say why',p:K.TXT[1],task:'Put each message on the card it fits',
 show:()=>play(1,tagsFor('fit',0).map((x,i)=>()=>place(i,x[1]))),go:()=>open(1)},
{h:'Who is it from?',p:K.TXT[2],predict:{q:'Where does Love from Sam go?',opts:['At the top of the card','At the bottom of the card'],ans:1},task:'Sign 3 cards at the bottom',
 show:()=>play(2,[0,1,2].map(k=>()=>place(okTag('sign',k),2)),1100),go:()=>open(2)},
{h:'Build a card',p:K.TXT[3],task:'Put To, the message and Love from in their places',
 show:()=>play(3,tagsFor('build',0).map((x,i)=>()=>place(i,x[1]))),go:()=>open(3)},
{h:'Post it',p:K.TXT[4],predict:{q:'Whose name goes on the envelope?',opts:['The person who made the card','The person the card is for'],ans:1},task:'Post 3 cards in the right envelopes',
 show:()=>play(4,[0,1,2].map(k=>()=>place(0,envNames(k).findIndex(x=>x[1]==='ok'))),1100),go:()=>open(4)},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.goal()});
/* a reply for each slip */
function why(tag){let m='A card says who it is for, why you are sending it and who it is from.';
 if(tag==='self')m='That is your own name. After To goes the name of the person the card is for.';
 if(tag==='word')m='From tells who sent it. At the top, write To and the name of the person it is for.';
 if(tag==='fit')m='That does not fit. A cake means birthday, a present means thank you, a poorly face means get well soon.';
 if(tag==='who')m='That is the other person\u2019s name. After Love from, write your own name.';
 if(tag==='word2')m='To goes at the top. At the bottom, write Love from and your own name.';
 if(tag==='place')m='Love from goes at the bottom, after the message. The top is for To.';
 if(tag==='tobottom')m='To goes at the top, so the reader sees first who the card is for.';
 if(tag==='mid')m='The message goes in the middle, between To and Love from.';
 if(tag==='env')m='That is the name of the person who made it. The envelope gets the name after To.';
 if(tag==='other')m='Look at the card: it says To and a name. Find the envelope with that name.';
 if(tag==='cap')m='A name starts with a capital letter, then small letters: Gran.';
 return m}
function quiz(){qn++;const Q=K.QS[qn%K.QS.length],opts=spin([[Q.a,'ok'],...Q.o],qn);
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function check(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=quiz;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;keys()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Card lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});keys()}}).start()})})();
