/* Flagship – communication vocabulary (7–11): style slider, sort replies, I-statements, compromise, conflict words. */
(()=>{const M=Math;
 const DIAL=[{z:'Passive',say:'Um… it’s OK. Keep it.',me:'😶',them:'😏',out:'Jo keeps it. Kai’s need is never said.'},
 {z:'Assertive',say:'That’s my pencil. Please give it back.',me:'🙂',them:'🙂',out:'Jo gives it back. Both feel respected.'},
 {z:'Aggressive',say:'GIVE IT BACK NOW, YOU THIEF!',me:'😠',them:'😢',out:'Jo feels attacked and fights back.'}];
 const SORT=[['Fine… you can have my turn.',0],['I was here first. Please wait your turn.',1],['Move, or you’ll be sorry!',2],
 ['I don’t want to play that. Can we choose together?',1],['(Says nothing and looks at the floor.)',0],['That idea is stupid, and so are you.',2]];
 const DESC=['is quiet and gives in','says what it needs, calmly and kindly','is loud, mean or a threat'];
 const WHY=(r,b)=>r===b?`Yes: it ${DESC[r]}.`:(r===0&&b===1?'Quiet or nice is not the same as assertive. ':r===1&&b===2?'Saying no calmly is allowed. ':r===2&&b===1?'Strong is not the same as mean. ':'')+`It ${DESC[r]}, so not ${DIAL[b].z.toLowerCase()}.`;
 const ISTM=[{sit:'Sam keeps talking over you.',slots:[[['upset','ok'],['like you are rude','blame'],['fine, really','hide']],[['you talk over me','ok'],['you are so annoying','label'],['you always ruin it','always']],[['take turns to talk?','ok'],['just stop being you?','attack'],['forget it?','hide']]]},
 {sit:'Mia borrowed your book and lost it.',slots:[[['sad','ok'],['that you are careless','blame'],['nothing, it’s fine','hide']],[['my book gets lost','ok'],['you are so messy','label'],['you never look after things','always']],[['look for it together?','ok'],['never be friends again?','attack'],['not talk about it?','hide']]]}];
 const LEAD=['I feel','when','Could we'],IWHY={blame:'“I feel like you are…” hides a blame. Use a feeling word, like upset.',hide:'Hiding what you feel or need is passive. Say it, calmly.',
 label:'That names the person, not the action. Say what they did.',always:'“Always” and “never” make people argue back. Say what happened.',attack:'That is an attack: aggressive. Ask for one fair thing.'};
 const WORDS=[['conflict','⚡','Two friends both want the last swing. They start to argue.','a disagreement or argument'],
 ['negotiate','🗣️','They talk it through: “What if you go first, then me?”','the two sides talking to find a deal'],
 ['mediate','🧑‍🏫','A helper stands in the middle and helps each one listen.','a third person helping both sides listen'],
 ['resolution','🤝','They agree to take turns. The problem is solved.','the fix that ends the problem'],
 ['boundary','✋','“Please ask before you take my things.”','a line you set for how others treat you']];
 const SC=[3,0,4,2,1];
VIS.reg('flagassert',c=>{let A,pad,quiz;
 const S={tok:0,chips:[],cb:()=>{}};
 const stage=()=>['dial','sort','istm','share','words','quiz'][A.step];
 const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
 const sz=n=>A.narrow?n:M.round(n*1.15),F=(w,n)=>`${w} ${sz(n)}px system-ui,sans-serif`;
 const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function box(g,r,col,a,bold){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=bold?3.5:1.6;g.stroke()}
 function write(g,t,x,y,n,col,wt,al){g.font=F(wt||700,n);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function para(g,t,x,y,w,n,col,wt,al){g.font=F(wt||600,n);g.fillStyle=col;g.textBaseline='middle';g.textAlign=al||'left';const lh=sz(n)*1.3,out=[];let ln='';
 for(const w0 of t.split(' ')){const tr=ln?ln+' '+w0:w0;if(ln&&g.measureText(tr).width>w){out.push(ln);ln=w0}else ln=tr}out.push(ln);
 const y0=y-(out.length-1)*lh/2;out.forEach((l,i)=>g.fillText(l,x,y0+i*lh));return out.length}
 const face=(g,e,x,y,n)=>{g.font=`${M.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)};
 const tag=(t,x,y,bg)=>A.paint.label(t,x,y,{font:F(800,12),bg});
 const EM=['😶','🙂','😠'],DK=['#155e75','#047857','#b91c1c'],zone=t=>t<1/3?0:t<2/3?1:2,STY=()=>[A.col.cy,A.col.gr,A.col.rd];
 const trackR=()=>({x:28,y:A.H-70,w:A.W-56,h:22});
 function drawDial(g){const C=A.col,W=A.W,z=zone(S.t),D=DIAL[z],zc=STY()[z];
 write(g,'Jo took Kai’s pencil without asking.',W/2,18,14,C.tx,800);
 const bw=M.min(W-28,380),bh=A.narrow?66:62,by=36;box(g,{x:(W-bw)/2,y:by,w:bw,h:bh},zc,.13,true);
 para(g,'Kai: “'+D.say+'”',W/2,by+bh/2,bw-24,z===0?13:z===2?16:15,C.tx,z===2?900:z===0?500:700,'center');
 const top=by+bh+8,fh=A.H-top-100,s=M.min(70,fh*.62),py=top+fh*.48;
 face(g,'🧒',W*.27,py,s*(z===0?.78:z===2?1.12:1));face(g,D.me,W*.27+s*.45,py-s*.42,s*.4);
 face(g,'🧑',W*.73,py,s);face(g,D.them,W*.73+s*.45,py-s*.42,s*.4);
 write(g,'Kai',W*.27,py+s*.62,12,C.tx,700);write(g,'Jo',W*.73,py+s*.62,12,C.tx,700);
 tag(D.out,W/2,top+fh-4,DK[z]);
 const r=trackR();STY().forEach((col,i)=>{g.fillStyle=A.alpha(col,.32);g.fillRect(r.x+r.w*i/3,r.y,r.w/3,r.h)});
 write(g,'quieter',r.x,r.y-11,11,C.tx,600,'left');write(g,'louder',r.x+r.w,r.y-11,11,C.tx,600,'right');
 DIAL.forEach((d,i)=>write(g,d.z+(S.seen[i]?' ✓':''),r.x+r.w*(i+.5)/3,r.y+r.h+17,12,C.tx,800));
 const kx=r.x+S.t*r.w;g.fillStyle=zc;g.beginPath();g.arc(kx,r.y+r.h/2,16,0,7);g.fill();g.strokeStyle=C.pn;g.lineWidth=3;g.stroke()}
 function setDial(t){S.t=M.max(0,M.min(1,t));const z=zone(S.t);if(!S.seen[z]){S.seen[z]=1;A.sound.tick()}const D=DIAL[z];
 note(`${D.z}: “${D.say}” ${D.out}`+[' Quiet keeps the peace, but the problem stays.',' Calm, clear and kind.',' Louder is not stronger.'][z])}
 const binR=()=>{const gp=8,w=(A.W-24-2*gp)/3,h=A.H*.42;return[0,1,2].map(i=>({x:12+i*(w+gp),y:A.H-h-8,w,h}))};
 const cardR=()=>{const w=M.min(A.W-36,360),h=A.narrow?74:70;return{x:(A.W-w)/2,y:32,w,h}};
 function drawSort(g){const C=A.col,cols=STY();write(g,`Sorted ${S.k} of 6`,A.W/2,15,13,C.tx,800);
 binR().forEach((b,i)=>{box(g,b,cols[i],S.wrong===i?.28:.11,S.wrong===i);write(g,DIAL[i].z,b.x+b.w/2,b.y+16,13,C.tx,800);face(g,EM[i],b.x+b.w/2,b.y+42,24);
 S.bins[i].forEach((k,j)=>write(g,SORT[k][0].split(' ').slice(0,2).join(' ')+'…',b.x+b.w/2,b.y+68+j*20,11,C.tx,600))});
 if(S.k<6){let r=cardR();if(S.grab&&S.at)r={...r,x:S.at.x-r.w/2,y:S.at.y-r.h/2};A.paint.shadow(10,3,.2);box(g,r,C.vi,.16,!!S.grab);A.paint.noShadow();
 para(g,SORT[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-24,15,C.tx,700,'center')}
 else face(g,'🎉',A.W/2,62,40)}
 function place(b){if(S.k>=6)return;const[t,real]=SORT[S.k];
 if(b===real){S.bins[b].push(S.k);S.k++;S.wrong=null;A.sound.pop();return note(WHY(real,b)+(S.k<6?' Next reply.':''))}
 S.wrong=b;A.sound.miss();note(WHY(real,b))}
 const turn=(ops,n)=>ops.map((o,i)=>[...o,i]).slice(n%3).concat(ops.map((o,i)=>[...o,i]).slice(0,n%3));
 function drawI(g){const C=A.col,R=ISTM[S.ri],W=A.W,n=S.pick.length;write(g,`Problem ${S.ri+1} of 2: ${R.sit}`,W/2,16,13,C.tx,800);
 let y=34;const sh=A.narrow?38:40;R.slots.forEach((ops,i)=>{const lead=LEAD[i];const got=S.pick[i],r={x:14,y,w:W-28,h:sh};
 box(g,r,got!=null?C.gr:i===n?C.or:C.mu,got!=null?.15:.06,i===n);write(g,lead+' '+(got!=null?ops[got][0]:'…'),r.x+12,r.y+sh/2,14,C.tx,got!=null?800:600,'left');y+=sh+6});
 S.chips=[];if(n<3){const ops=turn(R.slots[n],n+S.ri),h=A.narrow?44:48;y+=8;
 ops.forEach((o,j)=>{const r=A.narrow?{x:14,y:y+j*(h+7),w:W-28,h}:{x:14+j*((W-28+8)/3),y,w:(W-28+8)/3-8,h};S.chips.push({...r,o:o[2]});
 box(g,r,S.wrong===o[1]?C.rd:C.cy,.12,S.wrong===o[1]);para(g,o[0],r.x+r.w/2,r.y+h/2,r.w-14,13,C.tx,700,'center')})}
 else tag('I-statement ready!',W/2,y+24,DK[1])}
 function choose(o){const R=ISTM[S.ri],n=S.pick.length;if(n>=3)return;const[t,tg]=R.slots[n][o];
 if(tg!=='ok'){S.wrong=tg;A.sound.miss();return note(IWHY[tg])}
 S.wrong=null;S.pick.push(o);A.sound.pop();
 if(S.pick.length<3)return note(`${LEAD[n]} ${t}. Good.`);
 S.ok2[S.ri]=1;const ri=S.ri;note(`“I feel ${R.slots[0][0][0]} when ${R.slots[1][0][0]}. Could we ${R.slots[2][0][0]}” Feeling, action, fair ask, no blame.`);
 if(ri===0)later([()=>{if(S.ri===0&&S.pick.length===3&&!S.ok2[1]){S.ri=1;S.pick=[];note('Next problem.')}}],1300)}
 const barR=()=>({x:28,y:A.H*.6,w:A.W-56,h:36});
 const mood=m=>m>=8?'😊':m>0?'😐':'😞';
 function drawShare(g){const C=A.col,W=A.W,r=barR(),tg=S.tag,fb=20-tg,x=r.x+tg/20*r.w;
 write(g,'Break: 20 minutes. Ava wants tag, Ben wants football.',W/2,16,13,C.tx,800);
 const s=M.min(56,r.y*.38),py=r.y*.5;face(g,'🏃',W*.25,py,s);face(g,mood(tg),W*.25+s*.5,py-s*.4,s*.42);face(g,'⚽',W*.75,py,s);face(g,mood(fb),W*.75+s*.5,py-s*.4,s*.42);
 write(g,`Ava, tag: ${tg} min`,W*.25,py+s*.7,13,C.tx,800);write(g,`Ben, football: ${fb} min`,W*.75,py+s*.7,13,C.tx,800);
 g.fillStyle=A.alpha(C.cy,.45);g.fillRect(r.x,r.y,x-r.x,r.h);g.fillStyle=A.alpha(C.or,.45);g.fillRect(x,r.y,r.x+r.w-x,r.h);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(r.x,r.y,r.w,r.h);
 for(let m=0;m<=20;m+=5)write(g,String(m),r.x+m/20*r.w,r.y+r.h+14,10,C.tx,600);
 g.fillStyle=C.vi;A.paint.rrect(x-9,r.y-12,18,r.h+24,8);g.fill();
 const k=tg%20?tg>=8&&fb>=8?1:0:2;tag(['One gives up much more','Compromise: each gave up a little','One wins, one loses'][k],W/2,r.y+r.h+40,['#b45309',DK[1],DK[2]][k])}
 function setTag(m){m=M.max(0,M.min(20,M.round(m)));if(m===S.tag)return;S.tag=m;S.moved=1;const fb=20-m;
 note(m===0||fb===0?`${m===0?'Ava':'Ben'} gets nothing: that is giving in.`:m>=8&&fb>=8?'Both give up a little and both get some. That is a compromise.':'One gives up much more. Make it fairer.')}
 function chipL(g){g.font=F(800,13);const h=A.narrow?38:42,out=[];let x=12,y=8;
 WORDS.forEach(([w],i)=>{if(S.match[i]!=null)return;const cw=g.measureText(w).width+26;if(x+cw>A.W-12){x=12;y+=h+6}out.push({x,y,w:cw,h,i});x+=cw+8});return out}
 function sceneL(){const top=A.narrow?96:58,gp=6,h=(A.H-top-6)/5-gp;return SC.map((wi,s)=>({x:12,y:top+s*(h+gp),w:A.W-24,h,s,wi}))}
 function drawWords(g){const C=A.col;S.chipR=chipL(g);
 sceneL().forEach(r=>{const got=Object.keys(S.match).find(k=>S.match[k]===r.s),bad=S.wrong===r.s;box(g,r,got!=null?C.gr:bad?C.rd:C.mu,got!=null?.14:bad?.2:.06,got!=null||bad);
 const e=M.min(r.h*.7,34);face(g,WORDS[r.wi][1],r.x+8+e/2,r.y+r.h/2,e);para(g,(got!=null?WORDS[got][0]+': ':'')+WORDS[r.wi][2],r.x+e+18,r.y+r.h/2,r.w-e-26,12,C.tx,got!=null?700:600)});
 S.chipR.forEach(q=>{let r=q;if(S.hold===q.i&&S.at&&S.from&&M.hypot(S.at.x-S.from.x,S.at.y-S.from.y)>8)r={...q,x:S.at.x-q.w/2,y:S.at.y-q.h/2};
 box(g,r,S.hold===q.i?C.or:C.vi,.18,S.hold===q.i);write(g,WORDS[q.i][0],r.x+r.w/2,r.y+r.h/2,13,C.tx,800)})}
 function matchW(i,s){if(S.match[i]!=null)return;const want=SC[s];S.hold=null;
 if(want===i){S.match[i]=s;S.wrong=null;A.sound.pop();return note(`Yes: ${WORDS[i][0]} means ${WORDS[i][3]}.`)}
 S.wrong=s;A.sound.miss();
 note(/^(mn|nm)$/.test(WORDS[i][0][0]+WORDS[want][0][0])?'Close! Negotiate is the two friends talking. Mediate needs a helper in the middle.':`Not here: ${WORDS[i][0]} means ${WORDS[i][3]}. This scene shows ${WORDS[want][3]}.`)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);const m=stage();
 if(m==='dial')drawDial(g);if(m==='sort')drawSort(g);if(m==='istm')drawI(g);if(m==='share')drawShare(g);if(m==='words')drawWords(g);if(m==='quiz')face(g,'💬',W/2,H/2,72);A.fx.draw(g)}
 function note(msg){const m=stage();let t='';
 if(m==='dial')t=`Styles tried: ${S.seen.reduce((a,b)=>a+b)} of 3.`;
 if(m==='sort')t=S.k<6?`Reply ${S.k+1} of 6: ${SORT[S.k][0]}`:'All sorted.';
 if(m==='istm')t=S.pick.length<3?`${ISTM[S.ri].sit} Pick a "${LEAD[S.pick.length]}" line.`:'';
 if(m==='share')t=`Ava ${S.tag} minutes, Ben ${20-S.tag} minutes.`;
 if(m==='words')t=`Matched ${Object.keys(S.match).length} of 5.`+(S.hold!=null?` Holding ${WORDS[S.hold][0]}.`:'');
 tell((msg?msg+' ':'')+t);controls();S.cb()}
 function controls(){if(!A||!pad)return;pad.innerHTML='';const m=stage(),b=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},pad,t);e.onclick=f};
 if(m==='dial'||m==='sort'&&S.k<6)DIAL.forEach((d,i)=>b(`${EM[i]} ${d.z}`,m==='dial'?()=>setDial((i+.5)/3):()=>place(i),(m==='dial'?'Make Kai’s reply ':'This reply is ')+d.z.toLowerCase()));
 if(m==='istm'&&S.pick.length<3){const n=S.pick.length;turn(ISTM[S.ri].slots[n],n+S.ri).forEach(o=>b(`${LEAD[n]} ${o[0]}`,()=>choose(o[2])))}
 if(m==='share'){b('◀ More football',()=>setTag(S.tag-2));b('More tag ▶',()=>setTag(S.tag+2))}
 if(m==='words'){const i=WORDS.findIndex((_,k)=>S.match[k]==null);if(i>=0)SC.forEach((wi,s)=>b(`${WORDS[i][0]} → ${WORDS[wi][1]}`,()=>matchW(i,s),`${WORDS[i][0]}: ${WORDS[wi][2]}`))}
 A.redraw()}
 function down(p){const m=stage();S.at=p;S.from=p;
 if(m==='dial'){const r=trackR();if(p.y>r.y-30&&p.y<r.y+r.h+30){S.grab='knob';setDial((p.x-r.x)/r.w);return true}return false}
 if(m==='sort'){if(S.k<6&&hit(p,cardR())){S.grab='card';A.redraw();return true}const b=binR().findIndex(r=>hit(p,r));if(b>=0)place(b);return false}
 if(m==='istm'){const q=S.chips.find(r=>hit(p,r));if(q)choose(q.o);return false}
 if(m==='share'){const r=barR();if(p.y>r.y-24&&p.y<r.y+r.h+24){S.grab='bar';setTag((p.x-r.x)/r.w*20);return true}return false}
 if(m==='words'){const q=(S.chipR||[]).find(r=>hit(p,r));if(q){S.hold=q.i;note(`Holding ${WORDS[q.i][0]}. Now tap or drop on a scene.`);return true}
 const r=sceneL().find(r=>hit(p,r));if(r&&S.hold!=null)matchW(S.hold,r.s);return false}return false}
 function move(p){S.at=p;const m=stage();if(m==='dial'&&S.grab){const r=trackR();S.t=M.max(0,M.min(1,(p.x-r.x)/r.w));const z=zone(S.t);if(!S.seen[z])setDial(S.t)}
 if(m==='share'&&S.grab){const r=barR();setTag((p.x-r.x)/r.w*20)}A.redraw()}
 function up(p){const m=stage(),g=S.grab,moved=S.from&&M.hypot(p.x-S.from.x,p.y-S.from.y)>10;S.grab=null;S.at=null;
 if(m==='dial'&&g)setDial(S.t);
 if(m==='sort'&&g==='card'){const b=binR().findIndex(r=>hit(p,r));if(b>=0)place(b);else{if(moved)note('Drop the reply in a box.');A.redraw()}}
 if(m==='words'&&S.hold!=null&&moved){const r=sceneL().find(r=>hit(p,r));if(r)matchW(S.hold,r.s);else A.redraw()}}
 const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=S.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
 const reset=()=>{S.tok++;S.cb=()=>{};Object.assign(S,{t:.12,seen:[0,0,0],grab:null,k:0,bins:[[],[],[]],wrong:null,ri:0,pick:[],chips:[],ok2:[0,0],tag:20,moved:0,match:{},hold:null,at:null})};
 const steps=[
 {h:'Three ways to say it',p:'Jo took Kai’s pencil. Slide Kai’s reply from quiet to loud, or tap a style, and watch what Jo does.',
 predict:{q:'Kai wants the pencil back. Is shouting the strongest way to get it?',opts:['Yes, louder works best','No, calm and clear works best'],ans:1},task:'Try all 3 styles, then stop on the one that works',
 show:()=>{steps[0].go();later([()=>setDial(.1),()=>setDial(.9),()=>setDial(.5)],600)},go:()=>{reset();S.seen[0]=1;note();S.cb=check(0,()=>S.seen.every(x=>x)&&zone(S.t)===1&&!S.grab,'Assertive: say what you need, calmly and with respect.')}},
 {h:'Sort the replies',p:'Is each reply passive, assertive or aggressive? Drag it into a box, or tap a box.',task:'Sort all 6 replies',
 show:()=>{steps[1].go();later(SORT.map(x=>()=>place(x[1])),450)},go:()=>{reset();note();S.cb=check(1,()=>S.k===6,'Passive gives in, aggressive attacks, assertive is calm and clear.')}},
 {h:'Build an I-statement',p:'Say how you feel, what happened and what you need. Tap a piece for each line.',
 predict:{q:'Sam keeps talking over you. Which start keeps things calm?',opts:['“You always…”','“I feel…”'],ans:1},task:'Build 2 I-statements',
 show:()=>{steps[2].go();const pk=()=>choose(0);later([pk,pk,pk,()=>{S.ri=1;S.pick=[];note()},pk,pk,pk],420)},go:()=>{reset();note();S.cb=check(2,()=>S.ok2[0]&&S.ok2[1],'I feel… when… could we…? No blame, just the facts and a fair ask.')}},
 {h:'Find a compromise',p:'Break is 20 minutes. Ava wants tag. Ben wants football. Drag the purple line to share the time.',
 predict:{q:'What is a compromise?',opts:['One friend gives in','Both give up a little'],ans:1},task:'Share the break so both get at least 8 minutes',
 show:()=>{steps[3].go();later([()=>setTag(16),()=>setTag(12),()=>setTag(10)],500)},go:()=>{reset();note();S.cb=check(3,()=>S.moved&&S.tag>=8&&S.tag<=12&&!S.grab,'Compromise: both give up a little, so both get some.')}},
 {h:'Conflict words',p:'Match each word to the scene that shows it. Drag a word onto a scene, or tap the word and then the scene.',task:'Match all 5 words',
 show:()=>{steps[4].go();later(WORDS.map((_,i)=>()=>matchW(i,SC.indexOf(i))),450)},go:()=>{reset();note();S.cb=check(4,()=>Object.keys(S.match).length===5,'Conflict, negotiate, mediate, resolution, boundary: now you can name each part.')}},
 {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>S.cb()});
 const QS=[['Someone pushes in front of you in the lunch line. Which reply is assertive?','🍽️',[['“Excuse me, I was here. Please go to the back.”','ok'],['Say nothing and let them stay.','passive'],['“Get out or I’ll push you!”','aggro']]],
 ['Which one is an I-statement?','🗨️',[['“I feel left out when I’m not picked.”','ok'],['“You make me feel left out.”','blame'],['“You never pick me, ever!”','blame']]],
 ['Two friends want to watch different films. Which is a compromise?','🎬',[['Watch one today and the other next time.','ok'],['One friend just gives in.','givein'],['Shout until the other one agrees.','aggro']]],
 ['After a fight, a teacher helps two pupils listen to each other. The teacher is…','🧑‍🏫',[['mediating','ok'],['negotiating','mixup'],['being passive','mixup']]],
 ['Leo says, “It doesn’t matter, I don’t mind,” but he does mind. Leo is being…','😶',[['passive','ok'],['assertive','nice'],['aggressive','mixup']]]];
 function slip(tg){let m='Look for the reply that is calm, clear and kind.';
 if(tg==='passive')m='That keeps things quiet, but your need is never said. That is passive.';
 if(tg==='aggro')m='That is loud, mean or a threat. That is aggressive.';
 if(tg==='blame')m='That starts with “you” and blames. An I-statement starts “I feel… when…”.';
 if(tg==='givein')m='If one person just gives in, that is not a compromise. In a compromise both give a little.';
 if(tg==='mixup')m='Negotiate is the two sides talking; mediate is a helper in the middle; passive is giving in quietly.';
 if(tg==='nice')m='Quiet and nice is not assertive. Assertive says the need out loud, calmly.';
 return m}
 let qn=-1,run=0;
 function ask(){qn++;const[q,e,ops]=QS[qn%QS.length],sh=qn%3;
 quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(tg)});tell('Challenge: '+q);A.redraw()}
 function judge(tg){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tg==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes!':'✗ '+slip(tg)}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 A=FK.shell(c,{steps,ratio:.64,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
 reset();A.gest({down,move,up});controls()}});
 A.start()})})();
