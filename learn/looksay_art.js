/* Data and drawings for flaglooksay (Remembering where things are: look, say, check; Learning to Learn, ages 3-4).
   Sources: DfE Development Matters (2021) Characteristics of Effective Learning (playing and exploring; creating and
   thinking critically); Harvard Center on the Developing Child (2014) 'Enhancing and Practicing Executive Function
   Skills with Children from Infancy to Adolescence' (ages 3-5: hiding games and matching games build working memory);
   EEF (2021) Early Years evidence store, self-regulation and executive function; Gathercole and Alloway (2008)
   'Working Memory and Learning' (young children hold only a few things at once; naming it out loud helps keep it).
   Slips it targets: a quick peek instead of a good look; vague words (over there, under a cup) instead of a place word
   and a landmark; mixing up two hidden things; giving up instead of looking again to check; leaving things in a new
   place every day. */
const LKS=(()=>{
/* cups: a colour name, the paint, and a white mark so the cups differ by more than colour */
const CUPS=[{n:'red',c:'#dc2626',mk:'\u2605'},{n:'blue',c:'#2563eb',mk:'\u25CF'},{n:'yellow',c:'#ca8a04',mk:'\u25B2'},{n:'green',c:'#15803d',mk:'\u25A0'}];
const TOYS={teddy:'\u{1F9F8}',ball:'\u26BD',duck:'\u{1F986}',key:'\u{1F511}',cookie:'\u{1F36A}',car:'\u{1F697}'};
/* rounds per step: how many cups, and which toy sits under which cup */
const LOOK=[{cups:3,toy:'teddy',at:1,peek:true},{cups:3,toy:'ball',at:2},{cups:3,toy:'duck',at:0}];
const SAY=[{cups:4,toy:'key',at:0},{cups:4,toy:'cookie',at:3},{cups:4,toy:'car',at:1}];
const TWO=[{cups:4,a:['teddy',2],b:['ball',0]},{cups:4,a:['duck',3],b:['key',1]}];
/* the room for 'look again': three places and what sits there */
const ROOM=[{n:'by the door',pic:'\u{1F6AA}',toy:'\u{1F45F}',t:'shoes'},{n:'on the bed',pic:'\u{1F6CF}\uFE0F',toy:'\u{1F9E2}',t:'hat'},{n:'on the shelf',pic:'\u{1F4DA}',toy:'\u{1F9F8}',t:'teddy'}];
/* homes for 'same home': each thing has its own home with a picture label */
const HOMES=[{n:'the shoe rack',pic:'\u{1F45F}',toy:'\u{1F45F}',t:'shoes'},{n:'the coat hook',pic:'\u{1F9E5}',toy:'\u{1F9E5}',t:'coat'},{n:'the book box',pic:'\u{1F4D6}',toy:'\u{1F4D6}',t:'book'}];
const DESC=['Three cups. A toy is under one cup. Look, then hide the cups and tap the cup with the toy. 3 goes.',
 'Four cups. Pick the words that say where the toy is, then find it. 3 goes.',
 'Two toys under four cups. Look, hide, wait for the count, then find each toy. 2 goes.',
 'A room with a door, a bed and a shelf. Look where things are, then drag each thing back.',
 'Three homes: a shoe rack, a coat hook and a book box. Put each thing in its home, then find it the next day.'];
const TXT=['Take a good look before it is hidden.','Say the place: under the red cup.','Say it again while you wait.','Wrong? Look again and check.','Same home every day: easy to find.'];
const DONE=['A good long look helps you find it. A quick peek is easy to forget.',
 'Under the red cup says which cup. Over there could be anywhere.',
 'Saying both places while you wait kept the teddy and the ball apart.',
 'Every thing is back. When you were not sure, you looked again to check.',
 'Each thing has its own home, so you knew where to look the next day.'];
const QS=[{q:'Mum hides the teddy under a cup. What do you do first?',a:'Look where it goes',o:[['Look away','away'],['Guess later','guess']]},
 {q:'Which words help you remember?',a:'Under the red cup',o:[['Over there','vague'],['Under a cup','which']]},
 {q:'You lift a cup and it is empty. What now?',a:'Look again and check',o:[['Say it is gone','quit'],['Stop playing','quit']]},
 {q:'Where are your shoes easy to find?',a:'In their home by the door',o:[['Where I drop them','homeq'],['Somewhere new each day','homeq']]},
 {q:'Gran hides a key and a cookie. What helps?',a:'Say both places',o:[['Say one place','both'],['Look at the window','away']]},
 {q:'You have to wait. What helps you keep it?',a:'Say the place again',o:[['Think about lunch','away'],['Close my eyes and nap','away']]},
 {q:'Dad peeks for one blink. Will he remember?',a:'Maybe not, a peek is easy to forget',o:[['Yes, a peek is best','peek'],['Yes, always','peek']]},
 {q:'Your book is on the floor. What do you do?',a:'Put it back in the book box',o:[['Leave it there','homeq'],['Hide it in the bath','homeq']]}];
/* ---------- drawings ---------- */
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',FONT='px system-ui,sans-serif';
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=INK;g.fillText(e,x,y)}
function box(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* a cup on a mat: lift 0 sits on the table, lift 1 is raised to show what is under it */
function cup(g,r,C,st){const lift=st.lift||0,base=r.y+r.h;g.fillStyle=st.dark?'#334155':'#e2e8f0';g.beginPath();g.ellipse(r.x+r.w/2,base-4,r.w*.48,10,0,0,Math.PI*2);g.fill();
 if(st.toy&&lift>0)emo(g,st.toy,r.x+r.w/2,base-r.h*.28,Math.min(r.w,r.h)*.42);
 if(st.empty&&lift>0){g.font=`800 16${FONT}`;g.fillStyle=st.dark?'#fca5a5':NO;g.textAlign='center';g.fillText('empty',r.x+r.w/2,base-r.h*.22)}
 const top=r.y+r.h*.12-lift*r.h*.55,bot=base-6-lift*r.h*.55,cx=r.x+r.w/2,wt=r.w*.3,wb=r.w*.46;
 g.fillStyle=C.c;g.strokeStyle=st.ok?OK:st.no?NO:st.sel?'#1d4ed8':(st.dark?'#f1f5f9':INK);g.lineWidth=st.ok||st.no||st.sel?5:2;
 g.beginPath();g.moveTo(cx-wt,top);g.lineTo(cx+wt,top);g.lineTo(cx+wb,bot);g.lineTo(cx-wb,bot);g.closePath();g.fill();g.stroke();
 g.fillStyle='#ffffff';g.font=`800 ${Math.round(r.w*.22)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(C.mk,cx,(top+bot)/2)}
/* a place in the room or a home, with its picture, a name and room for a thing */
function spot(g,r,pic,name,st){g.fillStyle=st.ok?(st.dark?'#14532d':'#dcfce7'):st.no?(st.dark?'#7f1d1d':'#fee2e2'):(st.dark?'#1e293b':'#ffffff');g.strokeStyle=st.ok?OK:st.no?NO:st.sel?'#1d4ed8':RIM;g.lineWidth=st.ok||st.no||st.sel?4:2;box(g,r.x,r.y,r.w,r.h,12);g.fill();g.stroke();
 emo(g,pic,r.x+r.w/2,r.y+r.h*.28,Math.min(r.w*.4,r.h*.34));g.font=`800 ${Math.round(Math.min(16,r.w/8))}${FONT}`;g.fillStyle=st.dark?'#f1f5f9':INK;g.textAlign='center';g.textBaseline='middle';g.fillText(name,r.x+r.w/2,r.y+r.h*.56,r.w-8);
 if(st.toy)emo(g,st.toy,r.x+r.w/2,r.y+r.h*.8,Math.min(r.w*.3,r.h*.26))}
/* a big word tag or thing tile for the tray */
function tile(g,r,t,st){g.fillStyle=st.sel?'#dbeafe':st.no?'#fee2e2':st.used?'#e2e8f0':'#ffffff';g.strokeStyle=st.sel?'#1d4ed8':st.no?NO:RIM;g.lineWidth=st.sel||st.no?4:2;box(g,r.x,r.y,r.w,r.h,12);g.fill();g.stroke();
 if(st.pic){emo(g,st.pic,r.x+r.h*.55,r.y+r.h/2,r.h*.6)}let k=18;g.font=`800 ${k}${FONT}`;const room=r.w-(st.pic?r.h*1.1:0)-12;while(g.measureText(t).width>room&&k>12){k--;g.font=`800 ${k}${FONT}`}
 g.fillStyle=st.used?'#475569':INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+(st.pic?r.h*1.1:0)+room/2+6,r.y+r.h/2)}
return{CUPS,TOYS,LOOK,SAY,TWO,ROOM,HOMES,DESC,TXT,DONE,QS,INK,OK,NO,RIM,FONT,emo,box,cup,spot,tile}})();
