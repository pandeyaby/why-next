/* Flagship – understanding drama and performance (ages 11–14): direct one line ("I'm fine.") with voice, pause and body
   until the audience reads the subtext; light three scenes; block an actor by stage directions (stage left is the
   audience's right); match set designs to a director's aim; sort two productions of Macbeth's dagger by interpretation. */
(()=>{
const CUE={voice:['bright and warm','quiet and flat','sharp and loud'],pause:['no pause','a long pause first','snaps back at once'],body:['smiles at Tom','looks down, turns away','folds arms, glares']};
const MEAN=['she means it','she is hurt but hiding it','she is angry'],GOAL=[1,2];
const LIGHT=['warm, bright wash','cold blue, dim','one tight spotlight'],LWHY=['Warm, bright light feels safe and shows the whole stage.','Cold, dim blue light feels eerie and hides detail.','A tight spotlight cuts her off from everyone and pulls every eye to her.'];
const SCN=[['A wedding party full of friends',0],['A ghost appears at midnight',1],['Alone, she tells the audience her secret thoughts',2]];
const NOTE=[['downstage left',2,2],['upstage right',0,0],['upstage left',0,2]],ROW=['upstage','mid-stage','downstage'],COLA=['left','middle','right'];
const SETS=['Detailed real kitchen','Bare stage, one chair','Tilted walls, strange colours'],SWHY=['A detailed, real room makes the audience feel they are watching real life (naturalism).','A bare stage lets scenes change in seconds and puts the focus on the actors.','Tilted walls and strange colours show a mind out of balance (expressionism).'];
const AIMS=[['The audience should feel they are spying on a real family at home',0],['The play jumps between 12 places, so scene changes must be quick',1],['Show that the hero’s mind is falling apart',2]];
const PROD=[['A glowing dagger is projected in the air, and the audience sees it too',0],['The air is empty; his hand shakes as he reaches for nothing',1],['A witch walks on and holds the dagger up to him',0],['Only his sweating face in a spotlight, and the sound of a heartbeat',1]],BIN=['The dagger is really there','The dagger is in his mind'];
VIS.reg('flagstage',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},r:0,won:0,cue:{voice:-1,pause:-1,body:-1},read:-1,lt:0,lit:-1,pos:[1,1],grab:null,set:-1,pi:0,sorted:[],tip:-1,shown:0}),S=B0();
const mode=()=>['line','light','block','set','prod','quiz'][A.step];
const fs=n=>Math.round(n*(A.narrow?.95:1.1)),R=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,n,col,al){g.font=`700 ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function wrap(g,t,x,y,mw,n,col){g.font=`700 ${fs(n)}px system-ui,sans-serif`;const rows=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>mw&&cur){rows.push(cur);cur=w}else cur=tr}rows.push(cur);
 rows.forEach((r,i)=>txt(g,r,x,y+(i-(rows.length-1)/2)*fs(n)*1.25,n,col))}
function card(g,x,y,w,h,col,a){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=col;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,10);g.stroke()}
const SG=()=>({x:A.W*.08,y:A.H*.12,w:A.W*.84,h:A.H*.56});
function stage(g,light){const{x,y,w,h}=SG(),C=A.col;g.fillStyle='#3f2a1d';g.fillRect(x,y,w,h);
 const L=light==null?-1:light;if(L===0){g.fillStyle='rgba(255,196,110,.45)';g.fillRect(x,y,w,h)}if(L===1){g.fillStyle='rgba(20,40,110,.65)';g.fillRect(x,y,w,h)}
 if(L===2){g.fillStyle='rgba(0,0,0,.7)';g.fillRect(x,y,w,h);g.fillStyle=A.paint.rad(x+w/2,y+h*.6,4,h*.4,[[0,'rgba(255,255,230,.85)'],[1,'rgba(255,255,230,0)']]);g.fillRect(x,y,w,h)}
 g.fillStyle='#9f1239';g.fillRect(x-A.W*.06,y-8,A.W*.08,h+8);g.fillRect(x+w-A.W*.02,y-8,A.W*.08,h+8);g.fillRect(x-A.W*.06,y-14,w+A.W*.12,14);
 txt(g,'AUDIENCE',A.W/2,y+h+fs(18),12,C.mu)}
function actor(g,x,y,u,pose){g.fillStyle='#f5d0b0';g.beginPath();g.arc(x,y-u*1.1,u*.32,0,7);g.fill();g.fillStyle='#0e7490';A.paint.rrect(x-u*.35,y-u*.75,u*.7,u*1.1,6);g.fill();
 g.strokeStyle='#0e7490';g.lineWidth=u*.16;g.lineCap='round';g.beginPath();
 if(pose===0){g.moveTo(x-u*.35,y-u*.6);g.lineTo(x-u*.8,y-u*.9);g.moveTo(x+u*.35,y-u*.6);g.lineTo(x+u*.8,y-u*.9)}
 else if(pose===2){g.moveTo(x-u*.4,y-u*.45);g.lineTo(x+u*.4,y-u*.45)}else{g.moveTo(x-u*.35,y-u*.6);g.lineTo(x-u*.45,y);g.moveTo(x+u*.35,y-u*.6);g.lineTo(x+u*.45,y)}g.stroke();g.lineCap='butt'}
function drawLine(g){const{W,H}=A,C=A.col,s=SG();stage(g,null);txt(g,`Make the audience think: ${MEAN[GOAL[Math.min(S.r,1)]]}`,W/2,H*.05,13);
 actor(g,s.x+s.w*.62,s.y+s.h*.8,s.h*.25,S.cue.body);actor(g,s.x+s.w*.3,s.y+s.h*.8,s.h*.25,0);txt(g,'Tom',s.x+s.w*.3,s.y+s.h*.93,11,'#fff');txt(g,'Sarah: “I’m fine.”',s.x+s.w*.62,s.y+s.h*.18,14,'#fff');
 const lines=Object.keys(CUE).map(k=>`${k}: ${S.cue[k]<0?'?':CUE[k][S.cue[k]]}`);lines.forEach((l,i)=>txt(g,l,W/2,H*(.8+i*.065),12))}
function drawLight(g){const{W,H}=A,C=A.col,s=SG(),sc=SCN[Math.min(S.r,2)];stage(g,S.lt);actor(g,s.x+s.w/2,s.y+s.h*.8,s.h*.25,1);wrap(g,'Scene: '+sc[0],W/2,H*.05,W-30,13);
 const y=H*.85,x0=W*.15,x1=W*.85;g.strokeStyle=C.ln;g.lineWidth=8;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 LIGHT.forEach((l,i)=>{const x=x0+(x1-x0)*i/2;g.fillStyle=C.mu;g.beginPath();g.arc(x,y,5,0,7);g.fill()});A.paint.ball(x0+(x1-x0)*S.lt/2,y,fs(14),C.am);txt(g,LIGHT[S.lt],W/2,H*.94,13)}
function cell(r,k){const s=SG();return{x:s.x+s.w*k/3,y:s.y+s.h*r/3,w:s.w/3,h:s.h/3}}
function drawBlock(g){const{W,H}=A,C=A.col,s=SG(),n=NOTE[Math.min(S.r,2)];stage(g,null);txt(g,`Director: “Move to ${n[0]}.”`,W/2,H*.05,14);
 for(let r=0;r<3;r++)for(let k=0;k<3;k++){const q=cell(r,k);g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.5;g.strokeRect(q.x,q.y,q.w,q.h);if(S.tip===r*3+k){g.fillStyle='rgba(220,38,38,.45)';g.fillRect(q.x,q.y,q.w,q.h)}}
 txt(g,'upstage (back)',s.x+s.w/2,s.y+fs(10),11,'#fff');txt(g,'downstage (front)',s.x+s.w/2,s.y+s.h-fs(10),11,'#fff');
 if(S.shown){txt(g,'stage right',s.x+s.w/6,s.y+s.h/2,11,'#fde68a');txt(g,'stage left',s.x+s.w*5/6,s.y+s.h/2,11,'#fde68a')}
 const p=S.grab&&S.grab.x!=null?S.grab:{x:cell(...S.pos).x+s.w/6,y:cell(...S.pos).y+s.h/6+s.h*.08};actor(g,p.x,p.y,s.h*.12,1)}
function drawSet(g){const{W,H}=A,C=A.col,aim=AIMS[Math.min(S.r,2)];wrap(g,'Director: '+aim[0],W/2,H*.09,W-30,13);const cw=(W-40)/3,ch=H*.5;
 SETS.forEach((t,i)=>{const x=10+i*(cw+10),y=H*.24;card(g,x,y,cw,ch,S.tip===i?C.rd:C.vi,.1);const cx=x+cw/2,cy=y+ch*.42;g.strokeStyle=C.tx;g.lineWidth=2;
  if(i===0){g.strokeRect(cx-cw*.3,cy-ch*.2,cw*.6,ch*.35);g.strokeRect(cx-cw*.2,cy-ch*.12,cw*.15,ch*.12);g.strokeRect(cx+cw*.05,cy,cw*.2,ch*.15)}
  if(i===1){g.beginPath();g.moveTo(cx-8,cy);g.lineTo(cx-8,cy+ch*.15);g.moveTo(cx+8,cy);g.lineTo(cx+8,cy+ch*.15);g.moveTo(cx-10,cy);g.lineTo(cx+10,cy);g.lineTo(cx+10,cy-ch*.12);g.stroke()}
  if(i===2){g.save();g.translate(cx,cy);g.rotate(-.25);g.fillStyle=A.alpha(C.pk,.5);g.fillRect(-cw*.3,-ch*.2,cw*.3,ch*.4);g.fillStyle=A.alpha(C.gr,.5);g.fillRect(0,-ch*.2,cw*.3,ch*.4);g.restore()}
  wrap(g,t,cx,y+ch*.82,cw-8,11)})}
function drawProd(g){const{W,H}=A,C=A.col,p=PROD[S.pi];txt(g,'Macbeth: “Is this a dagger which I see before me?”',W/2,H*.05,12);if(p){card(g,12,H*.1,W-24,H*.2,C.am,.15);wrap(g,p[0],W/2,H*.2,W-44,13)}
 const bw=(W-30)/2,bh=H*.6;BIN.forEach((t,i)=>{const x=10+i*(bw+10),y=H*.36;card(g,x,y,bw,bh,S.tip===i?C.rd:C.cy,S.tip===i?.3:.1);wrap(g,t,x+bw/2,y+fs(20),bw-10,12);
  S.sorted.filter(j=>PROD[j][1]===i).forEach((j,n)=>txt(g,`Production ${'ABCD'[j]}`,x+bw/2,y+fs(56)+n*fs(22),12))})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){stage(g,2);actor(g,W/2,SG().y+SG().h*.8,SG().h*.25,1);return}
 if(S.won>=lastN()){wrap(g,doneText(),W/2,H/2,W-40,15);return A.fx.draw(g)}
 ({line:drawLine,light:drawLight,block:drawBlock,set:drawSet,prod:drawProd})[v](g);A.fx.draw(g)}
const lastN=()=>({line:2,light:3,block:3,set:3,prod:1}[mode()]||9);
function doneText(){return{line:'The words never changed. Voice, pause and body made the meaning (the subtext).',light:'Light sets mood and tells the audience where to look.',block:'Stage left and right are the actor’s, facing the audience. Downstage is nearest the audience.',set:'A set is a choice that serves the director’s idea.',prod:'Same script, two readings. The text supports both: “a dagger of the mind”.'}[mode()]}
const miss=(t,i)=>{A.sound.miss();S.tip=i==null?-1:i;speak(t);setTimeout(()=>{S.tip=-1;A.redraw()},R()?10:800);A.redraw()};
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){speak(t+' Next one.');S.cue={voice:-1,pause:-1,body:-1};S.read=-1;S.lt=0;S.set=-1}else speak(t);buttons();A.redraw();S.want()}
function cue(k,i){if(mode()!=='line'||S.won>=2)return;S.cue[k]=i;S.read=-1;A.sound.tick();speak(`${k}: ${CUE[k][i]}.`);A.redraw()}
function perform(){if(mode()!=='line'||S.won>=2)return;const v=Object.values(S.cue),goal=GOAL[Math.min(S.r,1)];
 if(v.some(x=>x<0))return miss('Choose a voice, a pause and a body action first.');
 if(new Set(v).size>1){const K=Object.keys(CUE),b=K.find(k=>S.cue[k]!==S.cue.voice);return miss(`Mixed signals: ${CUE.voice[S.cue.voice]} but ${CUE[b][S.cue[b]]}. The audience is unsure. Make every choice point the same way.`)}
 S.read=v[0];if(v[0]!==goal)return miss(`The audience reads: ${MEAN[v[0]]}. You wanted: ${MEAN[goal]}.`);
 win(`The audience reads: ${MEAN[goal]}. Same two words, new meaning.`)}
function autoLine(){const g=GOAL[Math.min(S.r,1)];['voice','pause','body'].forEach(k=>cue(k,g));perform()}
function setLt(i){if(mode()!=='light'||S.won>=3)return;S.lt=Math.max(0,Math.min(2,i));A.sound.tick();speak(LIGHT[S.lt]);A.redraw()}
function lightsUp(){if(mode()!=='light'||S.won>=3)return;const sc=SCN[Math.min(S.r,2)];if(S.lt!==sc[1])return miss(`${LWHY[S.lt]} That does not suit: ${sc[0].toLowerCase()}.`);win(LWHY[S.lt])}
function moveTo(r,k){if(mode()!=='block'||S.won>=3)return;const n=NOTE[Math.min(S.r,2)];S.pos=[r,k];A.sound.tick();
 if(r===n[1]&&k===n[2]){S.shown=1;return win(`Yes: ${n[0]}. From the seats, stage left is on the audience’s right.`)}
 if(r===n[1]&&k===2-n[2]&&k!==1)return miss('That is the mirror image. Stage left and right are the actor’s left and right as they face the audience, so they swap for you in the seats.',r*3+k);
 if(k===n[2]&&r!==n[1])return miss(r===0?'That is upstage, at the back. Downstage is nearest the audience: old stages sloped down towards the seats.':'Downstage is nearest the audience; upstage is at the back.',r*3+k);
 miss(`Not ${n[0]}. Row first (upstage is the back), then side (stage left is the audience’s right).`,r*3+k)}
function autoBlock(){const n=NOTE[Math.min(S.r,2)];moveTo(n[1],n[2])}
function pickSet(i){if(mode()!=='set'||S.won>=3)return;const aim=AIMS[Math.min(S.r,2)];if(i==null)i=aim[1];if(i!==aim[1])return miss(`${SWHY[i]} That is not what this director needs.`,i);win(SWHY[i])}
function sortProd(b){if(mode()!=='prod'||S.won>=1)return;const p=PROD[S.pi];if(!p)return;if(b==null)b=p[1];
 if(b!==p[1])return miss(p[1]?'Nobody else can see this dagger. The production suggests guilt is making him see it.':'The audience sees the dagger too, so the production says it is really there, sent by dark forces.',b);
 S.sorted.push(S.pi);S.pi++;A.sound.tick();if(S.pi>=PROD.length)return win('Both readings use Shakespeare’s exact words.');speak(`Yes. Next: production ${'ABCD'[S.pi]}.`);A.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='line'){Object.keys(CUE).forEach(k=>CUE[k].forEach((t,i)=>B(t,()=>cue(k,i),`${k}: ${t}`)));B('▶ Perform the line',perform)}
 if(v==='light'){LIGHT.forEach((t,i)=>B(t,()=>setLt(i)));B('💡 Lights up',lightsUp)}
 if(v==='block')for(let r=0;r<3;r++)for(let k=0;k<3;k++)B(`${ROW[r]}, ${COLA[k]}`,()=>moveTo(r,k),`Move to ${ROW[r]}, on the ${COLA[k]} as the audience sees it`);
 if(v==='set')SETS.forEach((t,i)=>B(t,()=>pickSet(i)));
 if(v==='prod')BIN.forEach((t,i)=>B(t,()=>sortProd(i)))}
function down(p){const v=mode(),{W,H}=A,s=SG();if(S.won>=lastN())return false;
 if(v==='light'&&p.y>H*.75){S.grab={lt:1};move(p);return true}
 if(v==='block'&&p.x>s.x&&p.x<s.x+s.w&&p.y>s.y&&p.y<s.y+s.h){S.grab={x:p.x,y:p.y};return true}
 if(v==='set'&&p.y>H*.24&&p.y<H*.74)pickSet(Math.min(2,Math.floor((p.x-10)/((W-20)/3))));
 if(v==='prod'&&p.y>H*.36)sortProd(p.x>W/2?1:0);
 if(v==='line'&&p.x>s.x+s.w*.45&&p.y>s.y&&p.y<s.y+s.h)cue('body',(S.cue.body+1)%3);return false}
function move(p){if(!S.grab)return;if(S.grab.lt){const x0=A.W*.15,x1=A.W*.85,n=Math.round((p.x-x0)/(x1-x0)*2);if(n!==S.lt&&n>=0&&n<=2)setLt(n);return}S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;S.grab=null;if(!d)return;if(d.lt)return lightsUp();const s=SG(),k=Math.floor((p.x-s.x)/(s.w/3)),r=Math.floor((p.y-s.y)/(s.h/3));if(r>=0&&r<3&&k>=0&&k<3)moveTo(r,k);else A.redraw()}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*320))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Same words, new meaning',p:'Tom forgot Sarah’s birthday. He asks if she is OK. She says, “I’m fine.” Choose her voice, pause and body, then perform.',
 predict:{q:'The script only says “I’m fine.” Can the audience still understand she is not fine?',opts:['No: the words say she is fine','Yes: voice, pause and body can show it'],ans:1},task:'Make the audience read 2 different meanings',
 show:()=>{steps[0].go();play([autoLine,autoLine])},go:()=>{fresh();speak('Direct Sarah’s line.');buttons();S.want=check(0,()=>S.won>=2,'The meaning under the words is the subtext, and actors’ choices show it.')}},
{h:'Light the scene',p:'Drag the lighting dial, or tap a button, then bring the lights up.',task:'Light 3 scenes',
 show:()=>{steps[1].go();play(SCN.flatMap(s=>[()=>setLt(s[1]),lightsUp]))},go:()=>{fresh();speak('Light the scene.');buttons();S.want=check(1,()=>S.won>=3,'Lighting sets the mood and steers the audience’s eyes.')}},
{h:'Blocking',p:'You are looking at the stage from the seats. Drag the actor to where the director says, or use the buttons.',
 predict:{q:'The director says “Move stage left.” From the audience’s seats, which way does the actor go?',opts:['To the audience’s left','To the audience’s right'],ans:1},task:'Follow 3 stage directions',
 show:()=>{steps[2].go();play([autoBlock,autoBlock,autoBlock])},go:()=>{fresh();speak('Follow the director’s note.');buttons();S.want=check(2,()=>S.won>=3,'Blocking is the planned movement and position of actors.')}},
{h:'Set design',p:'Each director has an aim. Tap the set that serves it best.',task:'Match 3 aims to a set',
 show:()=>{steps[3].go();play([0,1,2].map(()=>()=>pickSet()))},go:()=>{fresh();speak('Choose a set.');buttons();S.want=check(3,()=>S.won>=3,'Naturalistic, minimal or expressionist: each set tells the audience how to read the play.')}},
{h:'Two productions',p:'Macbeth sees a dagger before he kills the king. Four productions stage it. What does each one suggest?',task:'Sort all 4 productions',
 show:()=>{steps[4].go();play(PROD.map(()=>()=>sortProd()))},go:()=>{fresh();speak('Sort the productions.');buttons();S.want=check(4,()=>S.won>=1,'A production is an interpretation of the script.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['An actor stands stage right. Where is she, seen from the audience?',[['On the audience’s left','ok'],['On the audience’s right','mirror'],['At the back of the stage','updown']]],
 ['The script says “I love you.” The actor says it flatly, looking away. What is the audience most likely to think?',[['He may not mean it','ok'],['He loves her, because the words say so','words'],['Nothing: only words carry meaning','only']]],
 ['A director lights a character alone in a tight spotlight. What is the effect?',[['It isolates her and draws our eyes to her','ok'],['It makes the scene feel safe and cheerful','warm'],['It has no effect on meaning','nolight']]],
 ['Two productions use the same script but one shows the ghost and one does not. Which is faithful to the script?',[['Both can be, if the text supports each reading','ok'],['Only the one that shows the ghost','literal'],['Neither, because they differ','differ']]],
 ['Where is downstage?',[['The part nearest the audience','ok'],['The back of the stage','back'],['Below the stage','below']]]];
function why(t){let m='Think about what the audience sees and hears.';
 if(t==='mirror')m='Stage right is the actor’s right as they face you, so it is on your left.';
 if(t==='updown')m='Right and left are sides; the back is upstage.';
 if(t==='words')m='Delivery can contradict the words. A flat voice and turning away suggest he does not mean it.';
 if(t==='only')m='Tone, pause and body language carry meaning too. That is the subtext.';
 if(t==='warm')m='Warm, full light feels safe. A tight spotlight isolates and focuses attention.';
 if(t==='nolight')m='Lighting shapes mood and focus, so it changes how we read the scene.';
 if(t==='literal')m='The script can support more than one staging. Faithful means true to the text, not one fixed version.';
 if(t==='differ')m='Productions always differ. The question is whether the choices are supported by the text.';
 if(t==='back')m='The back is upstage. Downstage is nearest the audience.';
 if(t==='below')m='Downstage is not under the stage: it is the front, nearest the audience.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
