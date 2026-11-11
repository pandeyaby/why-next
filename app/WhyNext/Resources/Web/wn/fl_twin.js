/* Flagship – alternative spellings for sounds (ages 6–9). Year 2 spellings for sounds a child already knows: the or
   sound is spelled a before l and ll (ball, walk), the u sound is spelled o in mother and Monday, the shun sound at the
   end is tion (station), and homophones sound the same but are spelled differently and mean different things (see,
   sea; here, hear; there, their). Drop a letter in a gap, build a word from parts, hook the right end carriage onto a
   train and finish a sentence with the right twin word. Every drag and tap has a big button twin. */
(()=>{
const GAP=[['b','ll','ball','⚽'],['w','lk','walk','🚶'],['t','lk','talk','🗣️'],['c','ll','call','📞']];
const BUILD=[['mother','👩',['m','o','th','er']],['brother','👦',['br','o','th','er']],['Monday','📅',['M','o','n','d','ay']],['nothing','📭',['n','o','th','i','ng']]];
const TRAIN=[['sta','station','🚉'],['po','potion','🧪'],['lo','lotion','🧴'],['ac','action','🎬']];
const TWIN=[['I can ___ a big ship.','see','sea','👀','see is what your eyes do. It has two e’s, like two eyes.'],
 ['Fish swim in the ___.','sea','see','🌊','sea is the big salty water. It has ea, like beach.'],
 ['Come and sit ___ with me.','here','hear','🪑','here is a place. It hides inside there and where.'],
 ['I can ___ the drum.','hear','here','🥁','You hear with your ear, and hear has ear in it.'],
 ['Put the box over ___.','there','their','📦','there is a place word: t + here.'],
 ['The kids put on ___ coats.','their','there','🧥','their means it belongs to them: their coats.']];
VIS.reg('flagtwin',c=>{let A,ctl,chal,q=-1,streak=0,tok=0;c.fig.classList.add('young');
const S={};const reset=()=>Object.assign(S,{n:0,got:0,need:4,miss:null,shown:null,parts:[],hold:null,wait:0,fast:0,then:()=>{}});
const mode=()=>['meet','gap','build','train','twin','quiz'][A.step];
const z=v=>Math.round(v*(A.narrow?1:1.14)),slow=()=>A.reduced()||S.fast;
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(s,x,y,size,col,wt,maxw){const g=A.ctx;g.font=`${wt||800} ${z(size)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const rows=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&maxw&&g.measureText(t).width>maxw){rows.push(cur);cur=w}else cur=t}rows.push(cur);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*z(size)*1.3))}
function emo(e,x,y,s){const g=A.ctx;g.font=`${z(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function card(r,tint,line,dash){const g=A.ctx,C=A.col,col={good:C.gr,bad:C.rd,warm:C.am,cool:C.cy,soft:C.vi}[tint];g.save();
 if(!dash){A.paint.shadow(6,2,.14);g.fillStyle=col?A.mix(C.pn,col,.2):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([8,6]);g.lineWidth=line||2;g.strokeStyle=col||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke();g.restore()}
const answer=()=>{const k=mode();return k==='gap'?'a':k==='train'?'tion':k==='twin'?TWIN[S.n][1]:null};
const choices=()=>{const k=mode();return k==='gap'?['a','or','aw']:k==='train'?['tion','shun','chun']:k==='twin'?[TWIN[S.n][1],TWIN[S.n][2]].sort():[]};
function pieces(){const k=mode(),ch=choices(),n=ch.length,w=Math.min(z(k==='twin'?130:104),(A.W-30-(n-1)*12)/n),h=z(66),x0=(A.W-(n*w+(n-1)*12))/2,y=A.H*.76;
 return ch.map((v,i)=>{const d=S.hold;if(d&&d.v===v&&d.x!=null)return{v,x:d.x-w/2,y:d.y-h/2,w,h};return{v,x:x0+i*(w+12),y,w,h}})}
function slot(){const k=mode(),w=z(k==='train'?118:k==='twin'?128:76),h=z(70);if(k==='gap')return{x:A.W/2-w/2,y:A.H*.36,w,h};
 if(k==='train')return{x:A.W/2+z(6),y:A.H*.38,w,h};return{x:A.W/2-w/2,y:A.H*(k==='twin'?.36:.5),w,h}}
function tray(){const it=BUILD[S.n],all=it[2].concat('u').map((v,i)=>[v,(v.charCodeAt(0)*7+i*5)%13]).sort((a,b)=>a[1]-b[1]).map(a=>a[0]);
 const n=all.length,gap=8,w=Math.min(z(72),(A.W-24-(n-1)*gap)/n),x0=(A.W-(n*w+(n-1)*gap))/2;return all.map((v,i)=>({v,x:x0+i*(w+gap),y:A.H*.72,w,h:z(64)}))}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,k=mode();
 if(k==='quiz'){write('Same sound, different spelling. Think about the meaning, then pick.',W/2,H*.45,18,C.tx,800,W-40);return}
 if(k==='meet'){write('Sounds you know, new ways to spell them',W/2,H*.08,17,C.tx,900,W-24);
  [['⚽','ball','a','a says or'],['👩','mother','o','o says u'],['🚉','station','tion','tion says shun']].forEach(([e,w,bit,lab],i)=>{const r={x:12,y:H*.17+i*H*.27,w:W-24,h:H*.24};card(r,['warm','cool','soft'][i]);
   emo(e,r.x+r.h*.55,r.y+r.h/2,36);g.font=`900 ${z(30)}px system-ui,sans-serif`;const at=w.indexOf(bit),x0=r.x+r.h*1.1,y=r.y+r.h*.4;g.textAlign='left';g.textBaseline='middle';
   const a=g.measureText(w.slice(0,at)).width,b=g.measureText(bit).width;g.fillStyle=A.alpha(C.am,.32);g.fillRect(x0+a-2,y-z(19),b+4,z(38));g.fillStyle=C.tx;g.fillText(w,x0,y);
   g.font=`700 ${z(16)}px system-ui,sans-serif`;g.fillStyle=C.mu;g.fillText(lab,x0,r.y+r.h*.78)});return}
 if(k==='build'){const it=BUILD[S.n];emo(it[1],W/2,H*.13,46);write(`Build “${it[0]}”. Tap the parts in order.`,W/2,H*.28,16,C.tx,800,W-24);
  const P=it[2],gap=6,w=Math.min(z(70),(W-24-(P.length-1)*gap)/P.length),x0=(W-(P.length*w+(P.length-1)*gap))/2;
  P.forEach((p,i)=>{const r={x:x0+i*(w+gap),y:H*.4,w,h:z(70)},on=i<S.parts.length;card(r,on?(p==='o'?'warm':'good'):'',2.5,!on);if(on)write(p,r.x+w/2,r.y+r.h/2,28,C.tx,900)});
  if(S.parts.length<P.length)tray().forEach(r=>{const used=S.parts.includes(r.v);if(used)return;card(r,S.miss===r.v?'bad':'cool',2.5);write(r.v,r.x+r.w/2,r.y+r.h/2,26,C.tx,900)});
  else write(`In ${it[0]}, o says u.`,W/2,H*.78,18,C.tx,900,W-30);A.fx.draw(g);return}
 const s=slot(),filled=S.shown;
 if(k==='gap'){const it=GAP[S.n];emo(it[3],W/2,H*.15,50);g.font=`900 ${z(44)}px system-ui,sans-serif`;g.textBaseline='middle';g.fillStyle=C.tx;
  g.textAlign='right';g.fillText(it[0],s.x-6,s.y+s.h/2);g.textAlign='left';g.fillText(it[1],s.x+s.w+6,s.y+s.h/2);
  write('Which letters spell the or sound here?',W/2,H*.6,15,C.mu,700,W-24)}
 if(k==='train'){const it=TRAIN[S.n];emo(it[2],W/2,H*.13,48);const e={x:s.x-z(118)-z(14),y:s.y,w:z(118),h:s.h};card(e,'warm',3);write(it[0],e.x+e.w/2,e.y+e.h/2,30,C.tx,900);
  g.fillStyle=C.mu;g.fillRect(e.x+e.w,s.y+s.h*.45,z(14),5);[e,s].forEach(r=>[.25,.75].forEach(f=>{g.beginPath();g.arc(r.x+r.w*f,r.y+r.h+z(9),z(8),0,7);g.fill()}));
  write(`Hook on the end that says shun to make ${it[1]}.`,W/2,H*.62,15,C.mu,700,W-24)}
 if(k==='twin'){const it=TWIN[S.n];emo(it[3],W/2,H*.13,48);const [a,b]=it[0].split('___');const q=slot();write(a.trim()||' ',W/2,q.y-z(22),22,C.tx,800,W-30);write(b.trim()||' ',W/2,q.y+q.h+z(24),22,C.tx,800,W-30)}
 card(s,filled?'good':S.miss==='slot'?'bad':'warm',3,!filled);if(filled)write(filled,s.x+s.w/2,s.y+s.h/2,k==='twin'?26:30,C.tx,900);
 if(!filled)pieces().forEach(r=>{card(r,S.miss===r.v?'bad':'soft',3);write(r.v,r.x+r.w/2,r.y+r.h/2,k==='twin'?24:28,C.tx,900)});
 A.fx.draw(g)}
function oops(t,v){A.sound.miss();S.miss=v;speak(t);setTimeout(()=>{S.miss=null;A.redraw()},slow()?10:1300);A.redraw()}
function point(t){S.got++;A.sound.pop();speak(t);buttons();A.redraw();
 if(S.got>=S.need)return S.then();const was=S.n,mine=tok;S.wait=1;setTimeout(()=>{if(mine!==tok||S.n!==was)return;S.n++;S.shown=null;S.parts=[];S.wait=0;speak('Next one.');buttons();A.redraw()},slow()?5:1400)}
function pick(v){const k=mode();if(S.wait||S.got>=S.need||!answer())return;
 if(v!==answer()){if(k==='gap')return oops(v==='or'?`or is one way to spell the or sound, like fork. Before l or ll, it is a: ${GAP[S.n][2]}.`:`aw spells the or sound in saw and draw, but before l or ll we use a: ${GAP[S.n][2]}.`,v);
  if(k==='train')return oops(v==='shun'?`shun is how it sounds, not how it is spelled. At the end of ${TRAIN[S.n][1]}, write tion.`:`chun is not a spelling for shun. The end of ${TRAIN[S.n][1]} is t-i-o-n.`,v);
  const it=TWIN[S.n];return oops(`Same sound, wrong meaning. ${it[4]}`,v)}
 S.shown=v;if(k==='gap')point(`${GAP[S.n][2]}: a says or before l.`);else if(k==='train')point(`${TRAIN[S.n][1]}: the end says shun, spelled tion.`);
 else{const it=TWIN[S.n];point(`${it[0].replace('___',it[1])} ${it[4]}`)}}
function place(v){if(mode()!=='build'||S.wait||S.got>=S.need)return;const it=BUILD[S.n],want=it[2][S.parts.length];
 if(v!==want)return oops(v==='u'&&want==='o'?`You hear u, but in ${it[0]} the u sound is spelled o.`:`Not yet. Say ${it[0]} slowly: what part comes next?`,v);
 S.parts.push(v);A.sound.tick();if(S.parts.length<it[2].length){speak(`${S.parts.join('')}… what comes next?`);buttons();return A.redraw()}
 point(`${it[0]}: o says u here.`)}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=mode(),mk=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=f};
 if(k==='quiz'||k==='meet'||S.got>=S.need||S.wait)return;
 if(k==='build')tray().forEach(r=>{if(!S.parts.includes(r.v))mk(r.v,()=>place(r.v),`Add ${r.v} to ${BUILD[S.n][0]}`)});
 else{const it=k==='gap'?GAP[S.n][0]+'_'+GAP[S.n][1]:k==='train'?TRAIN[S.n][0]+'_':TWIN[S.n][0];choices().forEach(v=>mk(v,()=>pick(v),`Fill ${it} with ${v}`))}}
const inR=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const k=mode();if(S.wait||S.got>=S.need)return false;
 if(k==='build'){const r=tray().find(r=>!S.parts.includes(r.v)&&inR(p,r,4));if(r)place(r.v);return false}
 if(!answer()||S.shown)return false;const r=pieces().find(r=>inR(p,r,8));if(!r)return false;S.hold={v:r.v,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold;S.hold=null;if(!d)return;if(d.x==null||inR(p,slot(),26))return pick(d.v);oops('Drop it in the dashed gap.','slot')}
const finish=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function right(){const k=mode();if(k==='build')return place(BUILD[S.n][2][S.parts.length]);return pick(answer())}
const show=i=>()=>{steps[i].go();S.fast=1;const mine=++tok,run=()=>{if(mine!==tok||S.got>=S.need)return;if(!S.wait)right();setTimeout(run,60)};setTimeout(run,30)};
const fresh=()=>{tok++;reset()};
const steps=[
{h:'New spellings for old sounds',p:'You know these sounds. Now learn new ways to write them. In ball, a says or. In mother, o says u. At the end of station, tion says shun.',
 go:()=>{fresh();speak('ball: a says or. mother: o says u. station: tion says shun.')}},
{h:'a before l',p:'Before l or ll, the or sound is often spelled a: all, ball, walk, talk. Drag the letters into the gap.',predict:{q:'Ball has the or sound. How do we spell it?',opts:['or, like fork: borl','a, like all: ball'],ans:1},task:'Spell 4 words',show:show(1),
 go:()=>{fresh();speak('Drag a, or or aw into the gap, or tap a button.');buttons();S.then=finish(1,'Before l or ll, the or sound is spelled a: ball, walk, talk, call.')}},
{h:'o says u',p:'In some words the u sound is spelled o. Build each word from its parts, in order.',predict:{q:'You hear u in mother: m-u-th-er. Is it spelled with u?',opts:['Yes: muther','No, with o: mother'],ans:1},task:'Build 4 words',show:show(2),
 go:()=>{fresh();speak('Tap the parts in order to build the word.');buttons();S.then=finish(2,'mother, brother, Monday, nothing: the u sound is spelled o.')}},
{h:'The shun ending',p:'Lots of words end with the sound shun. We spell it tion. Hook the right end carriage onto the train.',predict:{q:'Station ends with shun. How is that end spelled?',opts:['shun','tion'],ans:1},task:'Finish 4 trains',show:show(3),
 go:()=>{fresh();speak('Drag the end carriage that says shun onto the train.');buttons();S.then=finish(3,'The shun sound at the end is spelled tion: station, potion, lotion, action.')}},
{h:'Sound twins',p:'Homophones sound the same but have different spellings and meanings. Read the whole sentence, then drop in the word that fits.',predict:{q:'Hear and here sound the same. Are they spelled the same?',opts:['Yes, same sound, same spelling','No: hear is for ears, here is a place'],ans:1},task:'Finish 6 sentences',show:show(4),
 go:()=>{fresh();S.need=6;speak('Read the sentence. Drag the word that fits into the gap.');buttons();S.then=finish(4,'see and sea, here and hear, there and their: the meaning tells you the spelling.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QS=[['“I like to ___ to school.” Which spelling?',[['walk','ok'],['work','work'],['wawk','aw']]],
 ['“I can ___ the birds sing.” Which word?',[['hear','ok'],['here','place'],['heer','ee']]],
 ['Which is the right spelling of the word for a train stop?',[['station','ok'],['stashun','shun'],['stayshon','on']]],
 ['Which word has the u sound spelled o?',[['brother','ok'],['bus','plainu'],['box','boxo']]],
 ['“The children ate ___ lunch.” Which word?',[['their','ok'],['there','there'],['they','they']]],
 ['Which word spells the or sound with a?',[['talk','ok'],['fork','fork'],['saw','saw']]]];
function why(t){let m='Say the word, think about what it means, then check the spelling.';
 if(t==='work')m='work is a different word: a job. The or sound before l is spelled a: walk.';if(t==='aw')m='aw spells or in saw, but before l we write a: walk.';
 if(t==='place')m='here is a place. You hear with your ear, so the listening word is hear.';if(t==='ee')m='heer is not a word. The listening word has ear in it: hear.';
 if(t==='shun')m='shun is the sound. At the end of a word it is spelled tion: station.';if(t==='on')m='The end sounds like shun and is spelled tion: s-t-a-tion.';
 if(t==='plainu')m='bus has the u sound spelled u. Look for an o that says u, as in brother.';if(t==='boxo')m='In box, o says o, as in hot. In brother, o says u.';
 if(t==='there')m='there is a place, like here. The lunch belongs to them, so it is their.';if(t==='they')m='They lunch does not make sense. Belongs to them: their lunch.';
 if(t==='fork')m='fork spells the or sound with or. Before l, the or sound is a: talk.';if(t==='saw')m='saw spells the or sound with aw. Before l, it is a: talk.';return m}
function ask(){q++;const [txt,ops]=QS[q%QS.length],r=q%3;chal.innerHTML=`<p><b>${txt}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});speak('Challenge: '+txt);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
