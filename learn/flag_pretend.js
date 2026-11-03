/* Flagship – playing with what I know (ages 2–3, pretend play): act out cooking in the order we do it at home, let one
   thing stand for another (a block is a phone), sort play things into the doctor, kitchen and shop corners, match the
   words people say to the play, and turn one box into a car, a bed and a house. The Challenge is for the grown-up and
   child together and targets the usual worries: that pretend is a mistake, that it needs real toys, and that copying is wrong. */
(()=>{const SOUP=[['pan','Get the pan'],['carrot','Put in a carrot'],['spoon','Stir with the spoon'],['bowl','Pour it in a bowl']],SPOT=[2,3,0,1],
ITEMS=['block','box','stick'],JOBS=[['phone','Ring ring! Hello!'],['car','Brrm brrm! Off we go!'],['spoon','Stir, stir. Yum!']],
CORN=[['doctor','thermometer'],['kitchen','pan'],['shop','basket']],PROPS=[['plaster',0],['coins',2],['bowl',1],['thermometer',0],['basket',2],['pan',1]],
SAYS=[['Open wide and say ahh.',0],['That is 2 coins, please.',2],['Dinner is ready! It is hot.',1]],MAKES=['car','bed','house'];
VIS.reg('flagpretend',c=>{let A,ctl,chal,qi=-1,streak=0;c.fig.classList.add('young');
const S={};
const view=()=>['soup','swap','sort','say','box','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2)),R=()=>A.redraw();
/* words are drawn in the theme text colour over pale fills, so they read in light and dark themes */
function word(g,s,x,y,n,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function tile(g,r,col,a,warn){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=warn?4:2;g.strokeStyle=warn?A.col.rd:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const poly=(g,q)=>{g.beginPath();q.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath()};
/* flat drawings of everyday things, centred on x,y, about 2s across */
function pic(g,n,x,y,s){const C=A.col,f=(c,a)=>{g.fillStyle=A.mix(C.pn,c,a);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke()},rr=(a,b,w,h,r)=>{A.paint.rrect(a,b,w,h,r)},ci=(a,b,r)=>{g.beginPath();g.arc(a,b,r,0,7)};
 if(n==='pan'){rr(x+s*.3,y-s*.1,s*.75,s*.22,s*.1);f(C.tx,.5);ci(x-s*.2,y,s*.6);f(C.cy,.4);ci(x-s*.2,y,s*.45);f(C.cy,.2)}
 if(n==='carrot'){poly(g,[[x-s*.32,y-s*.35],[x+s*.32,y-s*.35],[x,y+s*.8]]);f(C.or,.6);poly(g,[[x,y-s*.35],[x-s*.3,y-s*.85],[x+s*.05,y-s*.6],[x+s*.3,y-s*.85]]);f(C.gr,.55)}
 if(n==='spoon'){rr(x-s*.08,y-s*.2,s*.16,s*.95,s*.08);f(C.vi,.4);g.beginPath();g.ellipse(x,y-s*.45,s*.26,s*.34,0,0,7);f(C.vi,.4)}
 if(n==='bowl'){g.beginPath();g.moveTo(x-s*.75,y-s*.15);g.arc(x,y-s*.15,s*.75,0,Math.PI);g.closePath();f(C.pk,.4);g.beginPath();g.ellipse(x,y-s*.15,s*.75,s*.14,0,0,7);f(C.or,.35)}
 if(n==='block'){rr(x-s*.5,y-s*.5,s,s,s*.08);f(C.gr,.45);rr(x-s*.3,y-s*.3,s*.6,s*.6,s*.06);f(C.gr,.25)}
 if(n==='box'){const w=s*1.4,h=s,d=s*.35,X=x-w/2-d/2,Y=y-h/2+d/2;g.beginPath();g.rect(X,Y,w,h);f(C.or,.35);poly(g,[[X,Y],[X+d,Y-d],[X+w+d,Y-d],[X+w,Y]]);f(C.or,.55);poly(g,[[X+w,Y],[X+w+d,Y-d],[X+w+d,Y+h-d],[X+w,Y+h]]);f(C.or,.2)}
 if(n==='stick'){poly(g,[[x-s*.85,y+s*.3],[x+s*.8,y-s*.38],[x+s*.86,y-s*.24],[x-s*.79,y+s*.44]]);f(C.or,.75)}
 if(n==='phone'){rr(x-s*.35,y-s*.65,s*.7,s*1.3,s*.12);f(C.vi,.45);rr(x-s*.24,y-s*.5,s*.48,s*.85,s*.05);f(C.pn,0);ci(x,y+s*.5,s*.07);f(C.tx,.5)}
 if(n==='car'){poly(g,[[x-s*.4,y-s*.15],[x-s*.2,y-s*.5],[x+s*.3,y-s*.5],[x+s*.5,y-s*.15]]);f(C.cy,.3);rr(x-s*.85,y-s*.18,s*1.7,s*.5,s*.12);f(C.rd,.4);ci(x-s*.45,y+s*.35,s*.18);f(C.tx,.7);ci(x+s*.45,y+s*.35,s*.18);f(C.tx,.7)}
 if(n==='plaster'){rr(x-s*.85,y-s*.25,s*1.7,s*.5,s*.25);f(C.or,.35);rr(x-s*.3,y-s*.17,s*.6,s*.34,s*.05);f(C.pn,0)}
 if(n==='thermometer'){rr(x-s*.12,y-s*.8,s*.24,s*1.35,s*.12);f(C.pn,0);rr(x-s*.04,y-s*.2,s*.08,s*.75,s*.04);f(C.rd,.7);ci(x,y+s*.6,s*.22);f(C.rd,.7)}
 if(n==='coins'){[[-.35,.15],[.3,.2],[0,-.25]].forEach(([a,b])=>{ci(x+a*s,y+b*s,s*.36);f(C.or,.55);ci(x+a*s,y+b*s,s*.22);f(C.or,.35)})}
 if(n==='basket'){g.beginPath();g.arc(x,y-s*.1,s*.5,Math.PI,0);g.lineWidth=4;g.strokeStyle=C.tx;g.stroke();poly(g,[[x-s*.75,y-s*.1],[x+s*.75,y-s*.1],[x+s*.55,y+s*.65],[x-s*.55,y+s*.65]]);f(C.or,.4)}
 if(n==='bed'){rr(x-s*.85,y-s*.2,s*1.7,s*.45,s*.08);f(C.vi,.35);rr(x-s*.8,y-s*.4,s*.5,s*.25,s*.1);f(C.pn,0)}
 if(n==='house'){poly(g,[[x-s*.8,y-s*.1],[x,y-s*.8],[x+s*.8,y-s*.1]]);f(C.rd,.4);g.beginPath();g.rect(x-s*.65,y-s*.1,s*1.3,s*.8);f(C.or,.35);g.beginPath();g.rect(x-s*.15,y+s*.25,s*.3,s*.45);f(C.tx,.4)}}
/* the box after it becomes something: the same box, with a few pretend parts added */
function bigBox(g,x,y,s,m){const C=A.col;pic(g,'box',x,y,s);const f=(c,a)=>{g.fillStyle=A.mix(C.pn,c,a);g.fill();g.lineWidth=2.5;g.strokeStyle=C.tx;g.stroke()};
 if(m==='car'){[[-.45,.6],[.35,.6]].forEach(([a,b])=>{g.beginPath();g.arc(x+a*s,y+b*s,s*.2,0,7);f(C.tx,.7)});g.beginPath();g.arc(x+s*.1,y-s*.62,s*.16,0,7);g.lineWidth=4;g.strokeStyle=C.tx;g.stroke()}
 if(m==='bed'){A.paint.rrect(x-s*.75,y-s*.62,s*.5,s*.22,s*.1);f(C.pn,0);g.beginPath();g.rect(x-s*.2,y-s*.32,s*.62,s*.75);f(C.vi,.45)}
 if(m==='house'){poly(g,[[x-s*.95,y-s*.3],[x-s*.05,y-s*1.05],[x+s*.85,y-s*.3]]);f(C.rd,.4);g.beginPath();g.rect(x-s*.32,y,s*.3,s*.5);f(C.tx,.4)}}
const grid=i=>({x:A.W*.06+(i%2)*A.W*.46,y:A.H*.16+Math.floor(i/2)*A.H*.4,w:A.W*.42,h:A.H*.36});
const low=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.62,w,h:A.H*.34}};
const top=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.13,w,h:A.H*.3}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=view(),s=Math.min(W,H)*.1;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Pretend is how little ones think',W/2,H*.3,17,800);word(g,'A block can be a phone',W/2,H*.48,19,800);word(g,'They copy what they see you do',W/2,H*.66,16,700);return}
 if(v==='soup'){SPOT.forEach((k,i)=>{const r=grid(i),[n,t]=SOUP[k],dn=k<S.round;tile(g,r,dn?C.gr:C.cy,dn?.3:.1,S.oops===k);pic(g,n,r.x+r.w/2,r.y+r.h*.44,s*1.1);word(g,n,r.x+r.w/2,r.y+r.h*.88,13,800);
  if(dn){g.fillStyle=C.pn;g.beginPath();g.arc(r.x+px(20),r.y+px(20),px(14),0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();word(g,String(k+1),r.x+px(20),r.y+px(21),13,800)}});
  word(g,S.round<4?`${S.round+1}. ${SOUP[S.round][1]}`:'Soup is ready! Yum!',W/2,H*.07,16,800)}
 if(v==='swap'){ITEMS.forEach((n,i)=>{if(S.used[n]!=null||S.drag===n)return;const r=top(i);tile(g,r,C.or,.1,false);pic(g,n,r.x+r.w/2,r.y+r.h*.44,s*.9);word(g,n,r.x+r.w/2,r.y+r.h*.86,13,800)});
  JOBS.forEach(([j],i)=>{const r=low(i),it=Object.keys(S.used).find(k=>S.used[k]===i);tile(g,r,it?C.gr:C.vi,it?.25:.08,false);
   if(it){pic(g,it,r.x+r.w/2,r.y+r.h*.42,s*.9);word(g,`${it} = ${j}`,r.x+r.w/2,r.y+r.h*.86,12,800)}else{g.globalAlpha=.55;pic(g,j,r.x+r.w/2,r.y+r.h*.42,s*.8);g.globalAlpha=1;word(g,`a ${j}`,r.x+r.w/2,r.y+r.h*.86,13,800)}});
  word(g,S.n<3?'Drag a thing down to a game':'3 pretend things!',W/2,H*.06,15,800);word(g,'Pretend it is…',W/2,H*.55,13,700);
  if(S.drag)pic(g,S.drag,S.dx,S.dy,s)}
 if(v==='sort'){CORN.forEach(([n,ic],i)=>{const r=low(i);tile(g,r,[C.cy,C.or,C.vi][i],.12,S.oops===i);pic(g,ic,r.x+r.w/2,r.y+r.h*.42,s*.75);word(g,n,r.x+r.w/2,r.y+r.h*.86,14,800);
   const k=PROPS.filter((p,j)=>j<S.round&&p[1]===i).length;if(k)word(g,k+' in',r.x+r.w-px(22),r.y+px(16),12,800)});
  if(S.round<PROPS.length){const[n]=PROPS[S.round],x=S.drag?S.dx:W/2,y=S.drag?S.dy:H*.33;pic(g,n,x,y,s*1.3);if(!S.drag)word(g,`a ${n}`,W/2,H*.5,15,800)}
  word(g,S.round<PROPS.length?'Where does it go? Drag it down.':'All put away!',W/2,H*.07,15,800)}
 if(v==='say'){const k=Math.min(S.round,SAYS.length-1),b={x:W*.08,y:H*.1,w:W*.84,h:H*.34};tile(g,b,C.pn,1,false);poly(g,[[W*.45,b.y+b.h-1],[W*.55,b.y+b.h-1],[W*.5,b.y+b.h+H*.06]]);g.fillStyle=C.pn;g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
  wrap(g,S.round<SAYS.length?`“${SAYS[k][0]}”`:'You talked like them all!',W/2,b.y+b.h/2,b.w-px(24),18);
  CORN.forEach(([n,ic],i)=>{const r=low(i);tile(g,r,[C.cy,C.or,C.vi][i],.12,S.oops===i);pic(g,ic,r.x+r.w/2,r.y+r.h*.42,s*.75);word(g,n,r.x+r.w/2,r.y+r.h*.86,14,800)});word(g,'Who says it?',W/2,H*.57,13,700)}
 if(v==='box'){bigBox(g,W/2,H*.36,Math.min(W,H)*.2,S.m);word(g,S.m?`The box is a ${S.m}!`:'Just a box…',W/2,H*.07,17,800);
  MAKES.forEach((m,i)=>{const r=low(i);r.y=H*.7;r.h=H*.27;tile(g,r,C.vi,S.made.includes(m)?.25:.08,false);pic(g,m,r.x+r.w/2,r.y+r.h*.4,s*.7);word(g,`a ${m}`,r.x+r.w/2,r.y+r.h*.84,13,800)})}
 A.fx.draw(g)}
function wrap(g,t,x,y,w,n){g.font=`800 ${px(n)}px system-ui,sans-serif`;const L=[];let l='';t.split(' ').forEach(z=>{const q=l?l+' '+z:z;if(g.measureText(q).width>w&&l){L.push(l);l=z}else l=q});L.push(l);
 L.forEach((l,i)=>word(g,l,x,y+(i-(L.length-1)/2)*px(n)*1.3,n,800))}
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);R()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();R();S.want()};
/* step 0 */
const WHY=['The soup cooks in a pan, so the pan comes first.','The pan needs food in it. Put in the carrot.','Stir the soup with the spoon before you eat it.','Pour it in the bowl last. Then eat!'];
function pickSoup(k){if(S.round>=4)return;if(k!==S.round)return bad(`Not yet. ${WHY[S.round]}`,k);S.round++;
 if(S.round<4){A.sound.tick();S.oops=null;tell(`Yes! ${SOUP[k][1]}. Next: ${SOUP[S.round][1].toLowerCase()}.`);pad();return R()}good('Yes! Pan, carrot, stir, bowl. Just like at home.')}
/* step 1 */
function use(it,j){if(S.used[it]!=null||Object.values(S.used).includes(j))return;S.used[it]=j;S.n++;const[jn,sd]=JOBS[j];if(S.n<3){A.sound.tick();tell(`The ${it} is a ${jn}! ${sd}`);pad();return R()}good(`The ${it} is a ${jn}! ${sd} Every thing became a new thing.`)}
/* step 2 */
function put(i){if(S.round>=PROPS.length)return;const[n,ok]=PROPS[S.round];
 if(i!==ok)return bad({plaster:'A plaster helps a hurt knee. It goes to the doctor.',thermometer:'A doctor uses this to check if you are hot.',coins:'Coins are for paying. They go to the shop.',basket:'We put food in a basket at the shop.',bowl:'We eat soup from a bowl in the kitchen.',pan:'We cook in a pan in the kitchen.'}[n],i);
 S.round++;good(`Yes! The ${n} goes in the ${CORN[ok][0]} play.`)}
/* step 3 */
function who(i){if(S.round>=SAYS.length)return;const[t,ok]=SAYS[S.round];if(i!==ok)return bad(['A doctor looks in your mouth and says “Open wide”.','At the kitchen we cook and eat. Who says it is hot?','At the shop we pay with coins.'][ok],i);S.round++;good(`Yes! The ${CORN[ok][0]} says that.`)}
/* step 4 */
function make(m){if(S.made.includes(m)&&S.m===m)return;S.m=m;if(!S.made.includes(m))S.made.push(m);A.sound.tick();
 if(S.made.length<3){tell(`The box is a ${m} now! ${{car:'Brrm brrm!',bed:'Night night!',house:'Knock knock!'}[m]}`);pad();return R()}good(`The same box was a car, a bed and a house!`)}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='soup'&&S.round<4)SPOT.forEach(k=>B(SOUP[k][0],()=>pickSoup(k),`Use the ${SOUP[k][0]}`));
 if(v==='swap'&&S.n<3){const it=ITEMS.find(n=>S.used[n]==null);JOBS.forEach(([j],i)=>{if(!Object.values(S.used).includes(i))B(`${it} → ${j}`,()=>use(it,i),`Pretend the ${it} is a ${j}`)})}
 if((v==='sort'&&S.round<PROPS.length)||(v==='say'&&S.round<SAYS.length))CORN.forEach(([n],i)=>B(n,()=>v==='sort'?put(i):who(i),v==='sort'?`Put it in the ${n} play`:`The ${n} says it`));
 if(v==='box')MAKES.forEach(m=>B(`a ${m}`,()=>make(m),`Make the box a ${m}`))}
function down(p){const v=view();
 if(v==='soup'){SPOT.forEach((k,i)=>{if(hit(p,grid(i)))pickSoup(k)});return false}
 if(v==='swap'){const i=ITEMS.findIndex((n,i)=>S.used[n]==null&&hit(p,top(i)));if(i<0)return false;S.drag=ITEMS[i];S.dx=p.x;S.dy=p.y;R();return true}
 if(v==='sort'){if(S.round<PROPS.length&&Math.hypot(p.x-A.W/2,p.y-A.H*.33)<A.W*.25){S.drag=1;S.dx=p.x;S.dy=p.y;R();return true}CORN.forEach((_,i)=>{if(hit(p,low(i)))put(i)});return false}
 if(v==='say'){CORN.forEach((_,i)=>{if(hit(p,low(i)))who(i)});return false}
 if(v==='box'){MAKES.forEach((m,i)=>{const r=low(i);r.y=A.H*.7;r.h=A.H*.27;if(hit(p,r))make(m)});return false}return false}
function move(p){if(!S.drag)return;S.dx=p.x;S.dy=p.y;R()}
function up(p){const v=view(),d=S.drag;S.drag=null;if(!d)return;const j=[0,1,2].find(i=>hit(p,low(i)));
 if(j==null){tell(v==='swap'?'Drop it on a game at the bottom.':'Drop it on a play corner.');return R()}
 if(v==='swap'){if(Object.values(S.used).includes(j)){tell(`That game has a thing. Try another one.`);return R()}use(d,j)}else put(j)}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},round:0,oops:null,used:{},n:0,drag:null,m:null,made:[]})};
const steps=[
{h:'Pretend soup',p:'Let’s cook pretend soup, like at home. Tap the things in the right order.',task:'Cook in 4 steps',
 show:()=>{steps[0].go();play([0,1,2,3].map(k=>()=>pickSoup(k)),800)},
 go:()=>{reset();tell('Pretend soup. What do we need first?');pad();S.want=check(0,()=>S.round>=4,'Pan, carrot, stir, bowl.')}},
{h:'This can be that',p:'In pretend play, one thing can be something else. Drag a thing to a game.',predict:{q:'Can a block be a phone in pretend play?',opts:['Yes, in pretend','No, it needs a real phone','Only if it rings'],ans:0},task:'Make 3 pretend things',
 show:()=>{steps[1].go();play([()=>use('block',0),()=>use('box',1),()=>use('stick',2)],900)},
 go:()=>{reset();tell('A block, a box and a stick. What can they be?');pad();S.want=check(1,()=>S.n>=3,'A block, a box and a stick became a phone, a car and a spoon.')}},
{h:'Play corners',p:'We play what we see. Where do we see each thing? Drag it to the doctor, the kitchen or the shop.',task:'Put away 6 things',
 show:()=>{steps[2].go();play(PROPS.map(([,i])=>()=>put(i)),650)},
 go:()=>{reset();tell('A plaster. Where does it go?');pad();S.want=check(2,()=>S.round>=PROPS.length,'Doctor, kitchen and shop things, just like real life.')}},
{h:'Talk like them',p:'In pretend play we say what people say. Who says this?',task:'Match 3 things people say',
 show:()=>{steps[3].go();play(SAYS.map(([,i])=>()=>who(i)),900)},
 go:()=>{reset();tell(`Who says: ${SAYS[0][0]}`);pad();S.want=check(3,()=>S.round>=SAYS.length,'Children copy the words they hear.')}},
{h:'One box, lots of games',p:'A big box. What can it be? Tap a game to change it.',predict:{q:'Can one box be lots of things?',opts:['Yes, lots of things','No, it is just a box','Only one thing'],ans:0},task:'Make the box 3 things',
 show:()=>{steps[4].go();play(MAKES.map(m=>()=>make(m)),900)},
 go:()=>{reset();tell('Just a box. What can it be?');pad();S.want=check(4,()=>S.made.length>=3,'One box: a car, a bed and a house.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Mia holds a banana to her ear and says “Hello!” What is she doing?',[['Pretending it is a phone','ok'],['Making a mistake','mistake'],['Being silly, so stop her','stop']]],
 ['Pretend soup. What do we do first?',[['Get the pan','ok'],['Eat it','order'],['Wash the bowl','end']]],
 ['Who says “Open wide”?',[['A doctor','ok'],['A shop helper','shop'],['A cook','cook']]],
 ['Does pretend play need real toys?',[['No, a block can be a phone','ok'],['Yes, only real toys','real'],['Yes, it must look the same','look']]],
 ['Ben stirs a pretend pot, just like you do. What is he doing?',[['Copying what he saw','ok'],['Making a mess','mess'],['Doing it wrong','wrong']]],
 ['Where do coins go in pretend play?',[['The shop','ok'],['The doctor','doctor'],['The kitchen','kitchen']]]];
function hintFor(t){let m='Think about what you see people do at home and at the shops.';
 if(t==='mistake')m='It is not a mistake. She knows it is a banana. She is pretending it is a phone.';
 if(t==='stop')m='Pretend is good thinking. Join in: “Hello! Who is calling?”';
 if(t==='order')m='We cannot eat it yet. First get the pan, then cook.';
 if(t==='end')m='Washing up comes at the end. First get the pan.';
 if(t==='shop')m='A shop helper takes the coins. A doctor looks in your mouth.';
 if(t==='cook')m='A cook says “Dinner is ready”. A doctor says “Open wide”.';
 if(t==='real')m='No real toys needed. A block, a box or a stick can be lots of things.';
 if(t==='look')m='It does not have to look the same. A stick can be a spoon.';
 if(t==='mess')m='He is not just messing. He is copying what he saw you do.';
 if(t==='wrong')m='Copying is how little ones learn. He is playing what he knows.';
 if(t==='doctor')m='A doctor checks you. We pay with coins at the shop.';
 if(t==='kitchen')m='We cook in the kitchen. We pay with coins at the shop.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);R()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'Yes, that’s right. In a row: '+streak+'.':'Not this time. '+hintFor(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
