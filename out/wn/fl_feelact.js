/* Flagship – feelings versus actions (ages 6–8). A feeling happens inside you; a doing is what your body does, and
   you choose it. Sort feelings from doings, find the kind doings for one cross feeling, slot a pause into the gap
   between the feeling and the doing, and judge feelings (always OK) apart from doings (some are not OK). */
(()=>{
const SORT=[['Cross',0],['Stamp my feet',1],['Scared',0],['Hide under a blanket',1],['Jealous',0],['Grab the toy',1]];
const PILES=['Feeling (inside me)','Doing (my body does it)'];
const MENU=[['Say “I feel cross!”',1,''],['Take 3 big breaths',1,''],['Ask a grown-up for help',1,''],
 ['Kick the tower over',0,'Kicking breaks things. Feeling cross is OK, but this doing is not.'],
 ['Hit her brother',0,'Hitting hurts someone. The feeling is OK; the hitting is not.'],
 ['Shout mean names',0,'Mean names hurt. She can say how she feels without being unkind.']];
const SCENES=[{f:'Jealous',face:'😠',why:'Ali has a new bike.',rush:'Push Ali off the bike',calm:'Say “Wow! Can I have a go later?”'},
 {f:'Scared',face:'😨',why:'A big dog barks at you.',rush:'Throw a stick at the dog',calm:'Stand still and hold your grown-up’s hand'},
 {f:'Sad',face:'😢',why:'You lost the race.',rush:'Rip up your race number',calm:'Tell a friend “I feel sad”'}];
const JUDGE=[['Sam feels jealous of his sister’s present',1,'Feeling jealous is OK. Everyone feels it sometimes.'],
 ['Sam breaks his sister’s present',0,'Breaking her present is a doing that hurts her. That is not OK.'],
 ['Sam says “I wish I had one too”',1,'Saying the feeling in words is a kind doing. That is OK.'],
 ['Zoe feels angry with her friend',1,'Feeling angry is OK. The feeling is not the problem.'],
 ['Zoe kicks her friend',0,'Kicking hurts. Zoe can feel angry and still choose not to kick.']];
VIS.reg('flagfeelact',c=>{let A,ctl,chal,qi=-1,ticket=0,stars=0;c.fig.classList.add('young');
const fresh=()=>({k:0,n:0,goal:3,miss:-1,chosen:[],gap:0,pick:-1,grab:null,zones:[],then:()=>{},quick:0}),S=fresh();
const mode=()=>['meet','sort','menu','gap','judge','quiz'][A.step];
const sz=v=>Math.round(v*(A.narrow?1:1.1)),snappy=()=>A.reduced()||S.quick;
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
/* centred text that wraps to a width */
function txt(g,s,x,y,w,px,col,wt){g.font=`${wt||700} ${sz(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const lines=[''];String(s).split(' ').forEach(word=>{const L=lines.length-1,t=lines[L]?lines[L]+' '+word:word;if(lines[L]&&g.measureText(t).width>w)lines.push(word);else lines[L]=t});
 const lh=sz(px)*1.25;lines.forEach((l,i)=>g.fillText(l,x,y+(i-(lines.length-1)/2)*lh))}
function emo(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* a rounded card; tone picks the tint and edge colour */
function card(g,r,tone,lw){const C=A.col,hue={good:C.gr,bad:C.rd,warm:C.am,cool:C.cy,soft:C.vi}[tone];g.save();A.paint.shadow(6,2,.13);
 g.fillStyle=hue?A.mix(C.pn,hue,.16):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();A.paint.noShadow();g.lineWidth=lw||(hue?3:1.5);g.strokeStyle=hue||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke();g.restore()}
const pair=(top,h)=>{const gap=10,w=(A.W-24-gap)/2;return[{x:12,y:top,w,h},{x:12+w+gap,y:top,w,h}]};
const grid6=()=>{const cols=2,gap=10,h=sz(58),w=(A.W-24-gap)/cols;return MENU.map((_,i)=>({x:12+(i%cols)*(w+gap),y:A.H*.3+Math.floor(i/cols)*(h+gap),w,h}))};
const lone=()=>{const w=Math.min(A.W*.72,sz(300)),h=sz(78),d=S.grab;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.3)-h/2,w,h}};
/* the feeling bubble, the gap and the doing box for the pause step */
const lanes=()=>{const W=A.W,H=A.H,w=W*.3,h=sz(92);return{feel:{x:10,y:H*.24,w,h},hole:{x:10+w+8,y:H*.24,w:W-2*w-36,h},act:{x:W-10-w,y:H*.24,w,h}}};
const stopTile=()=>{const s=sz(70),d=S.grab;if(S.gap){const o=lanes().hole;return{x:o.x+o.w/2-s/2,y:o.y+o.h/2-s/2,w:s,h:s}}return{x:(d&&d.x!=null?d.x:A.W/2)-s/2,y:(d&&d.x!=null?d.y:A.H*.62)-s/2,w:s,h:s}};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();
 if(m==='quiz'){txt(g,'Every feeling is OK. You choose what you do.',W/2,H*.45,W-40,20,C.tx,800);return}
 if(m==='meet'){const x=W/2,y=H*.5,s=sz(70);g.fillStyle=A.alpha(C.vi,.14);g.beginPath();g.arc(x,y-s*.7,s*.55,0,7);g.fill();g.fillStyle=C.vi;g.beginPath();g.arc(x,y-s*.7,s*.4,0,7);g.fill();
  g.beginPath();g.moveTo(x-s*.65,y+s*.9);g.quadraticCurveTo(x,y-s*.5,x+s*.65,y+s*.9);g.closePath();g.fill();emo(g,'❤️',x,y+s*.3,s*.42);
  card(g,{x:12,y:H*.1,w:W*.42,h:sz(70)},'soft');txt(g,'Feeling: it happens inside you',12+W*.21,H*.1+sz(35),W*.38,15,C.tx,800);
  card(g,{x:W*.58-12,y:H*.1,w:W*.42,h:sz(70)},'good');txt(g,'Doing: what your body does',W*.79-12,H*.1+sz(35),W*.38,15,C.tx,800);
  txt(g,'You can feel it and still choose what to do.',W/2,H*.9,W-30,16,C.tx,800)}
 if(m==='sort'){txt(g,'Drag the card to Feeling or Doing, or tap a box.',W/2,H*.06,W-30,16,C.tx,800);const b=pair(H*.6,H*.34);S.zones=b;
  b.forEach((r,i)=>{card(g,r,S.miss===i?'bad':i?'good':'soft',3);txt(g,PILES[i],r.x+r.w/2,r.y+sz(22),r.w-10,15,C.tx,800);
   S.chosen.filter(j=>SORT[j][1]===i).forEach((j,q)=>txt(g,'✓ '+SORT[j][0],r.x+r.w/2,r.y+sz(52)+q*sz(22),r.w-10,13,C.tx,700))});
  if(S.n<S.goal){const r=lone();card(g,r,'warm',3);txt(g,SORT[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,22,C.tx,800)}}
 if(m==='menu'){const ex=12+sz(20),tl=ex+sz(26);emo(g,'😠',ex,H*.13,sz(38));txt(g,'Mia’s tower got knocked down. She feels cross. Tap 3 kind things she can do.',(tl+W-8)/2,H*.13,W-8-tl,15,C.tx,800);
  const rs=grid6();S.zones=rs;rs.forEach((r,i)=>{const got=S.chosen.includes(i);card(g,r,got?'good':S.miss===i?'bad':'',2.5);txt(g,(got?'✓ ':'')+MENU[i][0],r.x+r.w/2,r.y+r.h/2,r.w-14,15,C.tx,700)})}
 if(m==='gap'){const sc=SCENES[S.k],L=lanes();txt(g,sc.why+' Put the STOP in the gap before you do something.',W/2,H*.08,W-24,15,C.tx,800);
  card(g,L.feel,'soft');emo(g,sc.face,L.feel.x+L.feel.w/2,L.feel.y+L.feel.h*.38,sz(36));txt(g,sc.f,L.feel.x+L.feel.w/2,L.feel.y+L.feel.h*.8,L.feel.w-8,15,C.tx,800);
  g.save();g.setLineDash([7,6]);g.strokeStyle=S.miss===9?C.rd:C.am;g.lineWidth=3;A.paint.rrect(L.hole.x,L.hole.y,L.hole.w,L.hole.h,14);g.stroke();g.restore();
  if(!S.gap)txt(g,'gap',L.hole.x+L.hole.w/2,L.hole.y+L.hole.h/2,L.hole.w-6,13,C.mu,700);
  card(g,L.act,S.pick>=0?'good':'');txt(g,S.pick>=0?sc.calm:'What will I do?',L.act.x+L.act.w/2,L.act.y+L.act.h/2,L.act.w-10,13,C.tx,800);
  const t=stopTile();g.fillStyle=C.rd;g.beginPath();for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4,R=t.w/2;g.lineTo(t.x+R+R*Math.cos(a),t.y+R+R*Math.sin(a))}g.closePath();g.fill();
  txt(g,'STOP',t.x+t.w/2,t.y+t.h/2,t.w,15,'#fff',900);
  if(S.gap&&S.pick<0){const rs=pair(H*.72,sz(74));S.zones=rs;[sc.rush,sc.calm].forEach((o,i)=>{card(g,rs[i],S.miss===i?'bad':'warm',2.5);txt(g,o,rs[i].x+rs[i].w/2,rs[i].y+rs[i].h/2,rs[i].w-14,14,C.tx,700)})}
  else if(!S.gap)S.zones=[]}
 if(m==='judge'){txt(g,'Is it OK? Tap OK or Not OK.',W/2,H*.07,W-30,16,C.tx,800);const b=pair(H*.62,H*.3);S.zones=b;
  ['OK ✓','Not OK ✗'].forEach((t,i)=>{card(g,b[i],S.miss===i?'bad':i?'warm':'good',3);txt(g,t,b[i].x+b[i].w/2,b[i].y+b[i].h/2,b[i].w-10,22,C.tx,900)});
  if(S.n<S.goal){const r={x:A.W/2-Math.min(A.W*.8,sz(330))/2,y:H*.2,w:Math.min(A.W*.8,sz(330)),h:sz(96)};card(g,r,'soft',3);txt(g,JUDGE[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-24,18,C.tx,800)}}
 A.fx.draw(g)}
function nope(t,j){A.sound.miss();S.miss=j;speak(t);setTimeout(()=>{S.miss=-1;A.redraw()},snappy()?10:1300);A.redraw()}
function scored(t){S.n++;A.sound.pop();speak(t);buttons();A.redraw();S.then()}
function file(bin){if(mode()!=='sort'||S.n>=S.goal)return;const d=SORT[S.k];
 if(bin!==d[1])return nope(d[1]?`“${d[0]}” is a doing. Your body does it, so you can choose it.`:`“${d[0]}” is a feeling. It happens inside you.`,bin);
 S.chosen.push(S.k);S.k++;scored(`${d[0]}: a ${d[1]?'doing':'feeling'}.`+(S.n+1<S.goal?' Next card.':''))}
function choose(i){if(mode()!=='menu'||S.n>=S.goal||S.chosen.includes(i))return;const o=MENU[i];if(!o[1])return nope(o[2],i);S.chosen.push(i);scored(`Yes: ${o[0]} is a kind doing.`)}
function pause(){if(mode()!=='gap'||S.gap)return;S.gap=1;A.sound.pop();speak('Stop. Breathe. Now choose what to do.');buttons();A.redraw()}
function act(i){if(mode()!=='gap'||!S.gap||S.pick>=0)return;const sc=SCENES[S.k];
 if(i===0)return nope(`That is the fast doing. Feeling ${sc.f.toLowerCase()} is OK, but “${sc.rush}” hurts. Choose again.`,0);
 S.pick=1;const was=S.k,tk=ticket;scored(`${sc.calm}. The pause gave you time to choose.`);
 if(S.n<S.goal)setTimeout(()=>{if(tk!==ticket||S.k!==was)return;Object.assign(S,{k:S.k+1,gap:0,pick:-1});speak('Next one. Put the STOP in the gap.');buttons();A.redraw()},snappy()?5:1500)}
function judge(ok){if(mode()!=='judge'||S.n>=S.goal)return;const j=JUDGE[S.k];if((ok?1:0)!==j[1])return nope(j[2],ok?0:1);S.k++;scored(j[2]+(S.n+1<S.goal?' Next card.':''))}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(m==='quiz'||m==='meet'||S.n>=S.goal)return;
 if(m==='sort'){const t=SORT[S.k][0];B('Feeling',()=>file(0),t+' is a feeling');B('Doing',()=>file(1),t+' is a doing')}
 if(m==='menu')MENU.forEach((o,i)=>{if(!S.chosen.includes(i))B(o[0],()=>choose(i),'Mia could: '+o[0])});
 if(m==='gap'){const sc=SCENES[S.k];if(!S.gap)B('🛑 Put STOP in the gap',pause);else if(S.pick<0){B(sc.rush,()=>act(0));B(sc.calm,()=>act(1))}}
 if(m==='judge'){B('OK ✓',()=>judge(1),JUDGE[S.k][0]+': OK');B('Not OK ✗',()=>judge(0),JUDGE[S.k][0]+': not OK')}}
const inside=(p,r,pad)=>(pad=pad||0,p.x>r.x-pad&&p.x<r.x+r.w+pad&&p.y>r.y-pad&&p.y<r.y+r.h+pad);
function down(p){const m=mode();if(m==='quiz'||m==='meet'||S.n>=S.goal)return false;
 if(m==='sort'&&inside(p,lone(),6)){S.grab={x:null,x0:p.x,y0:p.y};return true}
 if(m==='gap'&&!S.gap&&inside(p,stopTile(),10)){S.grab={x:null,x0:p.x,y0:p.y};return true}
 if(m==='gap'&&!S.gap&&inside(p,lanes().hole,4)){pause();return false}
 const i=S.zones.findIndex(r=>inside(p,r,3));if(i<0)return false;
 if(m==='sort')file(i);if(m==='menu')choose(i);if(m==='gap')act(i);if(m==='judge')judge(i===0);return false}
function move(p){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,m=mode();S.grab=null;if(!d)return;
 if(m==='gap'){if(d.x==null||inside(p,lanes().hole,18))return pause();nope('Drop the STOP sign into the gap between the feeling and the doing.',9);return}
 if(d.x==null){speak('Drag the card into a box, or tap a box.');return A.redraw()}const i=S.zones.findIndex(r=>inside(p,r,16));if(i>=0)file(i);else{speak('Drop the card in one of the boxes.');A.redraw()}}
const wrapUp=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function autoplay(f){const k=++ticket,go=()=>{if(k!==ticket||S.n>=S.goal)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{ticket++;Object.assign(S,fresh())};
function oneMove(){const m=mode();if(m==='sort')return file(SORT[S.k][1]);if(m==='menu')return choose(MENU.findIndex((o,i)=>o[1]&&!S.chosen.includes(i)));
 if(m==='gap'){if(!S.gap)return pause();if(S.pick<0)return act(1)}if(m==='judge')return judge(JUDGE[S.k][1]===1)}
const show=i=>()=>{steps[i].go();S.quick=1;autoplay(oneMove)};
const steps=[
{h:'Feeling and doing',p:'A feeling, like cross or scared, happens inside you. A doing is what your body does, like shouting or hugging. You can feel a big feeling and still choose what you do.',
 go:()=>{reset();speak('A feeling is inside you. A doing is what your body does.')}},
{h:'Feeling or doing?',p:'Sort each card. Is it a feeling inside you, or a doing your body does?',predict:{q:'Is shouting a feeling or a doing?',opts:['A feeling','A doing'],ans:1},task:'Sort 6 cards',show:show(1),
 go:()=>{reset();S.goal=6;speak('Feeling or doing? Drag the card or tap a box.');buttons();S.then=wrapUp(1,'Cross, scared and jealous are feelings. Stamping, hiding and grabbing are doings.')}},
{h:'One feeling, lots of doings',p:'Mia feels cross. Being cross does not pick her doing for her. Find 3 kind things she can choose.',predict:{q:'Mia feels cross. How many things could she do?',opts:['Only one: hit something','Lots of different things'],ans:1},task:'Find 3 kind doings',show:show(2),
 go:()=>{reset();speak('Tap 3 kind things Mia can do.');buttons();S.then=wrapUp(2,'The same feeling can lead to lots of doings. Mia gets to choose a kind one.')}},
{h:'Mind the gap',p:'Between a feeling and a doing there is a gap. Put a STOP in the gap: stop, take a breath, then choose.',predict:{q:'What helps you choose a kind doing when a feeling is big?',opts:['Do the first thing you think of','Stop and breathe, then choose'],ans:1},task:'Pause and choose 3 times',show:show(3),
 go:()=>{reset();speak('Drag the STOP sign into the gap, or tap the button.');buttons();S.then=wrapUp(3,'Stopping makes a gap. In the gap you can choose a doing that does not hurt.')}},
{h:'Feelings are OK',p:'Every feeling is OK, even jealous and angry. A doing can be OK or not OK. Judge each card.',predict:{q:'Is it wrong to feel jealous?',opts:['Yes, it is a bad feeling','No, feelings are OK. Doings can be wrong.'],ans:1},task:'Judge 5 cards',show:show(4),
 go:()=>{reset();S.goal=5;speak('Is it OK? Tap OK or Not OK.');buttons();S.then=wrapUp(4,'Feelings are always OK. Doings that hurt people or things are not OK.')}},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QS=[['Leo feels angry. Which one is a doing he can choose?',[['Tell a grown-up “I feel cross”','ok'],['Angry','word'],['Hit the wall','hurt']]],
 ['Is it OK to feel scared?',[['Yes, all feelings are OK','ok'],['No, brave kids never feel scared','brave'],['Only if no one can see','hide']]],
 ['Pip feels jealous of a friend’s toy. Does Pip have to grab it?',[['No, Pip can stop and choose','ok'],['Yes, the feeling makes Pip do it','must'],['Yes, if the feeling is very big','big']]],
 ['Which one is a feeling?',[['Worried','ok'],['Crying','cry'],['Running away','run']]],
 ['Max hit Kim because he felt cross. What was not OK?',[['The hitting','ok'],['Feeling cross','badfeel'],['Telling a grown-up after','tell']]]];
function why(t){let m='Feelings are OK. You choose the doing.';
 if(t==='word')m='“Angry” is the feeling. A doing is something your body does, like telling a grown-up.';if(t==='hurt')m='Hitting the wall can hurt you. Choose a doing that keeps everyone safe.';
 if(t==='brave')m='Brave people feel scared too. Feeling scared is OK; brave is what you choose to do.';if(t==='hide')m='Feelings are OK even when people can see them.';
 if(t==='must')m='A feeling does not make you do anything. Stop, breathe, then choose.';if(t==='big')m='Big feelings still do not choose for you. A pause gives you time to choose.';
 if(t==='cry')m='Crying is a doing. It shows a feeling, like sad or worried.';if(t==='run')m='Running away is a doing. Worried is the feeling inside.';
 if(t==='badfeel')m='Feeling cross is OK. The hitting is the part that was not OK.';if(t==='tell')m='Telling a grown-up is a good doing. The hitting was not OK.';return m}
function quizNext(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){stars++;A.win()}else{stars=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Stars in a row: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
