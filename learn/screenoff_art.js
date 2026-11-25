/* Data and drawings for flagscreenoff (screen time: knowing when to switch off; Personal & Social, Self-Regulation,
   ages 4-5). Sources: DfE Development Matters (2021), Reception PSED ('know and talk about the different factors that
   support their overall health and wellbeing: ... sensible amounts of screen time, having a good sleep routine'); WHO
   (2019) Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years (ages 3-4: sitting
   at screens no more than 1 hour a day, less is better); AAP (2016) Media and Young Minds (screen-free meals and
   bedrooms; a family media plan); RCPCH (2019) The health impacts of screen time (no screens in the hour before bed).
   Slips it targets: begging for one more show, hiding the tablet or carrying on when the timer rings; thinking a
   screen in bed helps you fall asleep; screens at the dinner table; putting screen time at meals or bedtime, or all day;
   throwing, shouting or switching it back on when the cross feeling comes; using a phone or tablet without asking. */
const SCR=(()=>{
/* step 1: the timer rings (three moments to stop) */
const STOP=[{cue:'Ding! The timer rings.',st:{timer:'ring'},o:[['One more show!','more'],['Hide it under the cushion','hide']]},
 {cue:'The show ends.',st:{timer:'end'},o:[['Start the next show','more'],['Keep it on with no sound','carry']]},
 {cue:'Dad says, \u201CTime to stop.\u201D',st:{timer:'dad'},o:[['Pretend not to hear','carry'],['Cry for one more','more']]}];
const STOP_OK='Switch it off';
const STOP_WHY={more:'One more show is more sitting, and the next time it is just as hard to stop. Switch off now.',
 hide:'Hiding it means the tablet is still on. The timer said stop, so switch it off.',
 carry:'Carrying on means the screen is still on. Stopping is the rule we agreed. Switch it off.'};
/* step 2: bedtime, with the hour before bed screen-free */
const BED=[{e:'\u{1F6C1}',t:'Bath',ok:1},{e:'\u{1F4F1}',t:'Tablet game',ok:0},{e:'\u{1FAA5}',t:'Brush teeth',ok:1},{e:'\u{1F4FA}',t:'TV cartoon',ok:0},{e:'\u{1F4D6}',t:'Story book',ok:1},{e:'\u{1F634}',t:'Sleep',ok:2}];
/* step 3: dinner table; s = a screen to switch off */
const MEAL=[{e:'\u{1F4FA}',t:'TV',s:1,x:.18,y:.2},{e:'\u{1F35D}',t:'Dinner',s:0,x:.5,y:.62},{e:'\u{1F4F1}',t:'Phone',s:1,x:.78,y:.62},{e:'\u{1F964}',t:'Cup',s:0,x:.3,y:.66},{e:'\u{1F4BB}',t:'Tablet',s:1,x:.68,y:.24},{e:'\u{1F33C}',t:'Flowers',s:0,x:.45,y:.3}];
/* step 4: plan a day: six parts of the day; ok = a fine time for one short show */
const DAY=[{e:'\u{1F963}',t:'Breakfast',ok:0,why:'meal'},{e:'\u2600\uFE0F',t:'Morning',ok:1},{e:'\u{1F96A}',t:'Lunch',ok:0,why:'meal'},{e:'\u{1F333}',t:'Afternoon',ok:1},{e:'\u{1F35D}',t:'Dinner',ok:0,why:'meal'},{e:'\u{1F319}',t:'Bedtime',ok:0,why:'bed'}];
const SHOWS=2;
/* step 5: the cross feeling after switching off */
const CALM=[{t:'Take a big breath',ok:1},{t:'Throw the remote',ok:0,k:'throw'},{t:'Say \u201CBye, TV!\u201D',ok:1},{t:'Switch it back on',ok:0,k:'sneak'},{t:'Choose what to do next',ok:1},{t:'Shout and kick',ok:0,k:'shout'}];
const FACE=['\u{1F620}','\u{1F610}','\u{1F642}','\u{1F604}'];
const CALM_WHY={throw:'Throwing can break the remote or hurt someone. The cross feeling is OK, but we do not throw. Try a big breath.',
 sneak:'Switching it back on breaks the rule, and stopping gets harder. Say bye to the screen instead.',
 shout:'Shouting and kicking do not make the cross feeling go away. A big breath helps it get smaller.'};
const DESC=['A child watching a tablet, and a sand timer. Tap what to do when it is time to stop, 3 times.',
 'Bedtime. Six cards. Tap the 3 things to do before sleep, then tap Sleep. Screens keep you awake.',
 'A dinner table with a TV, a tablet and a phone switched on. Tap each screen to switch it off.',
 'A day in six parts. Drag the TV sticker, or tap a part of the day, to choose 2 times for a short show.',
 'The screen is off and the child feels cross. Tap the 3 things that help the cross feeling get smaller.'];
const TXT=['When the timer rings, switch it off.','No screens in the hour before bed.','Screens off at meals.','A little screen time, lots of play.','Feeling cross is OK. Breathe, say bye, choose.'];
const DONE=['You switched it off every time: when the timer rang, when the show ended and when Dad said stop.',
 'Bath, teeth, a story, then sleep. No screens before bed, so sleep comes quickly.',
 'All the screens are off. Now everyone can talk and eat together.',
 'Two short shows, in the morning and the afternoon. Not at meals, not at bedtime, and lots of time to play.',
 'Breathe, say bye, choose what is next. The cross feeling got smaller, all by itself.'];
const QS=[{q:'The timer rings. What do you do?',a:'Switch the screen off',o:[['Ask for one more show','more'],['Hide the tablet','hide']]},
 {q:'Is a tablet in bed good for sleep?',a:'No, it keeps my brain awake',o:[['Yes, it makes me sleepy','bed'],['Yes, if the sound is off','bed']]},
 {q:'Where do screens go at dinner?',a:'Off, so we can talk and eat',o:[['On the table, so I can watch','meal'],['On my lap','meal']]},
 {q:'You want to use Mum\u2019s phone. What first?',a:'Ask a grown-up',o:[['Just take it','ask'],['Take it and hide','ask']]},
 {q:'You watched a show. What is good to do next?',a:'Run, jump or play outside',o:[['Watch another show','sit'],['Sit and play a tablet game','sit']]},
 {q:'The TV goes off and you feel cross. What helps?',a:'Take a big breath',o:[['Throw the remote','cross'],['Turn it back on','cross']]},
 {q:'When is a good time for a short show?',a:'In the afternoon',o:[['At dinner','meal'],['In bed','bed']]},
 {q:'Dad says, \u201CTime to stop.\u201D The show has 1 minute left. What is fair?',a:'Finish the show, then switch off',o:[['Start a new show','more'],['Pretend not to hear','more']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',F='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* a tablet: glowing picture when on, dark glass when off */
function tablet(g,x,y,w,on){const h=w*.68;g.fillStyle='#1e293b';rr(g,x-w/2,y-h/2,w,h,w*.07);g.fill();
 if(on){g.fillStyle='#38bdf8';rr(g,x-w*.44,y-h*.4,w*.88,h*.8,4);g.fill();g.fillStyle='#fde047';g.beginPath();g.arc(x-w*.2,y-h*.12,w*.09,0,7);g.fill();g.fillStyle='#22c55e';g.fillRect(x-w*.44,y+h*.14,w*.88,h*.26);emo(g,'\u{1F430}',x+w*.16,y,w*.26)}
 else{g.fillStyle='#0b1220';rr(g,x-w*.44,y-h*.4,w*.88,h*.8,4);g.fill();g.strokeStyle='#475569';g.lineWidth=2;g.beginPath();g.moveTo(x-w*.3,y-h*.3);g.lineTo(x-w*.12,y-h*.3);g.stroke()}}
/* a sand timer; ring adds bell lines */
function timer(g,x,y,s,mode){g.strokeStyle=INK;g.lineWidth=3;g.fillStyle='#fef3c7';g.beginPath();g.moveTo(x-s*.35,y-s*.5);g.lineTo(x+s*.35,y-s*.5);g.lineTo(x,y);g.lineTo(x+s*.35,y+s*.5);g.lineTo(x-s*.35,y+s*.5);g.lineTo(x,y);g.closePath();g.fill();g.stroke();
 g.fillStyle='#d97706';g.beginPath();g.moveTo(x-s*.25,y+s*.5);g.lineTo(x+s*.25,y+s*.5);g.lineTo(x,y+s*.18);g.closePath();g.fill();
 if(mode==='ring'){g.strokeStyle='#dc2626';g.lineWidth=3;[1,1.35].forEach(k=>{g.beginPath();g.arc(x,y,s*.6*k,-.7,.7);g.stroke();g.beginPath();g.arc(x,y,s*.6*k,Math.PI-.7,Math.PI+.7);g.stroke()})}}
/* the sofa scene for step 1 and the calm step */
function sofa(g,r,st,dk){g.fillStyle=dk?'#334155':'#e0e7ff';rr(g,r.x,r.y,r.w,r.h,12);g.fill();const s=Math.min(r.h*.55,r.w*.22),cx=r.x+r.w*.3,cy=r.y+r.h*.58;
 g.fillStyle='#7c3aed';rr(g,cx-s*.95,cy-s*.1,s*1.9,s*.75,s*.2);g.fill();emo(g,st.face||'\u{1F600}',cx,cy-s*.2,s*.85);
 tablet(g,r.x+r.w*.62,cy,Math.min(r.w*.26,s*1.5),!st.off);
 if(st.timer==='ring'||st.timer==='end'||st.timer==='dad'){if(st.timer==='dad')emo(g,'\u{1F468}',r.x+r.w*.88,cy-s*.15,s*.8);else timer(g,r.x+r.w*.88,cy,s*.75,st.timer==='ring'&&!st.off?'ring':'')}
 if(st.next)emo(g,st.next,r.x+r.w*.88,r.y+r.h*.25,s*.5)}
/* the bedroom for step 2: awake eyes and a glowing screen if a screen was chosen */
function bed(g,r,st,dk){g.fillStyle=dk?'#1e1b4b':'#c7d2fe';rr(g,r.x,r.y,r.w,r.h,12);g.fill();const s=Math.min(r.h*.5,r.w*.2);
 emo(g,'\u{1F319}',r.x+r.w*.85,r.y+r.h*.25,s*.6);g.fillStyle='#f8fafc';rr(g,r.x+r.w*.12,r.y+r.h*.55,r.w*.5,r.h*.3,10);g.fill();g.fillStyle='#fb7185';rr(g,r.x+r.w*.2,r.y+r.h*.6,r.w*.42,r.h*.25,8);g.fill();
 emo(g,st.awake?'\u{1F633}':st.sleep?'\u{1F634}':'\u{1F642}',r.x+r.w*.18,r.y+r.h*.52,s*.75);
 if(st.awake){g.fillStyle='rgba(56,189,248,.35)';g.beginPath();g.arc(r.x+r.w*.45,r.y+r.h*.45,s*.6,0,7);g.fill();emo(g,'\u{1F4F1}',r.x+r.w*.45,r.y+r.h*.45,s*.45)}
 if(st.sleep)emo(g,'\u{1F4A4}',r.x+r.w*.3,r.y+r.h*.25,s*.45)}
function PEN(A){const sz=n=>A.narrow?n:Math.round(n*1.12),g=()=>A.ctx,dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':INK;
 function wrap(t,max,font){const c=g();c.font=font;const out=[];let line='';for(const w of String(t).split(' ')){const nx=line?line+' '+w:w;if(line&&c.measureText(nx).width>max){out.push(line);line=w}else line=nx}if(line)out.push(line);return out}
 function strip(t,tone,note,bad){const c=g(),font=`800 ${sz(17)}${F}`,L=wrap(t,A.W-34,font),lh=sz(17)*1.3,h=L.length*lh+14;
  c.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');rr(c,8,8,A.W-16,h,10);c.fill();
  c.lineWidth=tone?2.5:1.2;c.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;c.stroke();c.font=font;c.fillStyle=fg();c.textAlign='left';c.textBaseline='top';L.forEach((r,i)=>c.fillText(r,17,15+i*lh));
  let y=8+h+6;if(note){const f2=`700 ${sz(15)}${F}`,L2=wrap(note,A.W-34,f2).slice(0,3);c.font=f2;c.fillStyle=bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>c.fillText(r,17,y+i*sz(15)*1.3));y+=L2.length*sz(15)*1.3+6}return y}
 function card(r,word,o){o=o||{};const c=g();c.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.sel?'#dbeafe':o.dim?'#e2e8f0':'#ffffff';rr(c,r.x,r.y,r.w,r.h,12);c.fill();
  c.lineWidth=o.no||o.ok||o.sel?4:1.8;c.strokeStyle=o.no?NO:o.ok?OK:o.sel?'#1d4ed8':RIM;c.stroke();if(!word)return;
  let n=sz(o.n||17),L;for(;;){L=wrap(word,r.w-14,`800 ${n}${F}`);if(L.length*n*1.2<=r.h-6||n<=12)break;n--}
  c.font=`800 ${n}${F}`;c.fillStyle=INK;c.textAlign='center';c.textBaseline='middle';const cy=r.y+r.h/2;L.forEach((s,i)=>c.fillText(s,r.x+r.w/2,cy+(i-(L.length-1)/2)*n*1.2))}
 function text(t,x,y,n,align,col){const c=g();c.font=`800 ${sz(n)}${F}`;c.fillStyle=col||fg();c.textAlign=align||'left';c.textBaseline='middle';c.fillText(t,x,y)}
 return{wrap,strip,card,text,sz,fg}}
return{STOP,STOP_OK,STOP_WHY,BED,MEAL,DAY,SHOWS,CALM,FACE,CALM_WHY,DESC,TXT,DONE,QS,emo,rr,tablet,timer,sofa,bed,PEN}})();
