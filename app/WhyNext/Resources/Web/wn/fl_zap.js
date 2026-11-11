/* Flagship – using electricity safely (ages 6–7; NC Y4 Electricity: working safely with electricity). Mains or battery,
   1.5 V against a socket, water, kitchen dangers, pull the plug not the cable, kites and power lines. */
(()=>{
const IT=[['Lamp',0],['Torch',1],['TV',0],['Remote',1],['Toaster',0],['Toy car',1]];
const WHY=IT.map(([k,j])=>j?`A ${k.toLowerCase()} has batteries inside. It has no cable.`:`A ${k==='TV'?'TV':k.toLowerCase()} has a cable and a plug. It uses the wall socket.`);
const SPOT=[['Toaster',1,'A fork in a plugged-in toaster! Metal lets electricity reach your hand. Unplug it and ask a grown-up.'],
 ['Socket',1,'Too many plugs in one socket can get hot and start a fire.'],['Lamp cable',1,'The cable is broken. You can see the wires. Do not touch it. Tell a grown-up.'],
 ['TV',0,'The TV is plugged in and the cable is fine. That is safe.'],['Torch',0,'A torch runs on small batteries. That is safe.'],['Remote',0,'A remote has tiny batteries. That is safe to hold.']];
VIS.reg('flagzap',c=>{let A,pads,quiz,qn=-1,run=0;c.fig.classList.add('young');const Z={};let g;const B=()=>g.beginPath(),M=(x,y)=>g.moveTo(x,y),L=(x,y)=>g.lineTo(x,y);
const scene=()=>['sort','strong','water','spot','unplug','kite','quiz'][A.step];
const speak=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const tell=t=>{speak(t);buttons();again()};const fz=n=>Math.round(n*(A.narrow?1.05:1.2)),again=()=>A.redraw();
function word(g,s,x,y,n,colr,wt,al){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-14)}
const inR=(p,r)=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-6&&p.y<r.y+r.h+6;
function box(g,r,fill,lw,stroke){A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fillStyle=fill;g.fill();g.lineWidth=lw||2.5;g.strokeStyle=stroke||A.col.tx;g.stroke()}
const ink=()=>A.col.tx;
/* simple pictures, drawn in a box of size s centred on x,y */
function icon(g,k,x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.lineWidth=2.5/s;g.strokeStyle=ink();g.lineJoin='round';
 const sh=f=>{g.fillStyle=f;g.fill();g.stroke()};
 if(k==='Lamp'){B();M(-.25,-.1);L(.25,-.1);L(.15,-.4);L(-.15,-.4);g.closePath();sh('#f4c20d');B();M(0,-.1);L(0,.3);g.stroke();B();g.rect(-.2,.3,.4,.08);sh('#9aa3ad')}
 if(k==='Torch'){B();g.rect(-.35,-.1,.45,.2);sh('#1d5fc4');B();M(.1,-.16);L(.25,-.2);L(.25,.2);L(.1,.16);g.closePath();sh('#9aa3ad')}
 if(k==='TV'){B();g.rect(-.38,-.32,.76,.5);sh('#33414f');B();M(-.12,.34);L(0,.18);L(.12,.34);g.stroke()}
 if(k==='Remote'){B();g.rect(-.12,-.38,.24,.76);sh('#33414f');g.fillStyle='#e34b4b';B();g.arc(0,-.24,.05,0,7);g.fill();g.fillStyle='#e6e6e6';[-.05,.1,.25].forEach(t=>{B();g.arc(0,t,.04,0,7);g.fill()})}
 if(k==='Toaster'){B();g.rect(-.35,-.18,.7,.4);sh('#c9ced4');g.fillStyle=ink();g.fillRect(-.22,-.16,.16,.04);g.fillRect(.06,-.16,.16,.04);
  if(scene()==='spot'){g.strokeStyle='#6b7280';g.lineWidth=4/s;B();M(-.14,-.17);L(-.02,-.46);g.stroke();g.lineWidth=2.5/s;g.strokeStyle=ink()}}
 if(k==='Toy car'){B();g.rect(-.36,-.08,.72,.2);sh('#d62828');B();g.rect(-.18,-.24,.34,.16);sh('#d62828');[-.2,.2].forEach(t=>{B();g.arc(t,.14,.08,0,7);sh('#222')})}
 if(k==='Socket'){B();g.rect(-.36,0,.72,.3);sh('#f5f5f5');for(let j=0;j<4;j++){B();g.rect(-.32+j*.16,-.36+(j%2)*.08,.13,.34);sh('#33414f')}}
 if(k==='Lamp cable'){B();M(-.4,.1);g.quadraticCurveTo(-.2,-.2,-.04,0);g.lineWidth=5/s;g.stroke();B();M(.06,0);g.quadraticCurveTo(.2,.2,.4,-.05);g.stroke();
  g.lineWidth=2/s;g.strokeStyle='#c46a12';[-.03,0,.03].forEach(d=>{B();M(-.04,d);L(.06,d*1.6);g.stroke()})}
 if(k==='Hairdryer'){B();g.arc(-.05,-.1,.18,0,7);sh('#7a3f9e');B();g.rect(.1,-.18,.24,.16);sh('#7a3f9e');B();g.rect(-.12,.05,.12,.3);sh('#7a3f9e')}
 g.restore()}
/* ---- step 1: sort ---- */
const card=i=>{const cols=A.narrow?3:6,w=Math.min((A.W-20)/cols-8,120),h=w*.9,r=Math.floor(i/cols),cl=i%cols,x0=(A.W-(cols*(w+8)-8))/2;return{x:x0+cl*(w+8),y:12+r*(h+8),w,h}};
const bin=j=>{const w=A.W*.44;return{x:j?A.W-w-A.W*.04:A.W*.04,y:A.H*.62,w,h:A.H*.34}};
/* ---- step 3: kitchen ---- */
const spot=i=>{const cols=3,w=Math.min((A.W-24)/cols-8,170),h=Math.min(w*.95,A.H*.38),r=Math.floor(i/cols),cl=i%cols,x0=(A.W-(cols*(w+8)-8))/2;return{x:x0+cl*(w+8),y:A.H*.06+r*(h+10),w,h}};
function draw(A){const{W,H,col:K}=A,v=scene();g=A.ctx;g.fillStyle=A.mix(K.pn,K.am,K.dark?.05:.08);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Wall sockets are strong. Keep away from water.',W/2,H*.3,15);word(g,'Pull the plug, not the cable.',W/2,H*.48,15);word(g,'Fly kites far from power lines.',W/2,H*.66,15);return}
 if(v==='sort'){[0,1].forEach(j=>{const b=bin(j);box(g,b,A.alpha(j?K.cy:K.am,.18),Z.flash===j?4:2.5);word(g,j?'Uses batteries':'Plugs in the wall',b.x+b.w/2,b.y+18,13);
   Z.put.filter(i=>IT[i][1]===j).forEach((i,m)=>{const s=Math.min(b.h*.42,b.w/3.4),x=b.x+s*.6+m*(s*1.05)+6,y=b.y+b.h*.62;icon(g,IT[i][0],x,y,s*.9)})});
  IT.forEach(([k],i)=>{if(Z.put.includes(i))return;const r=card(i);box(g,r,Z.sel===i?A.alpha(K.ac,.2):K.pn,Z.sel===i?4:2);icon(g,k,r.x+r.w/2,r.y+r.h*.42,r.h*.7);word(g,k,r.x+r.w/2,r.y+r.h-12,11,0,700)})}
 if(v==='strong'){const X0=W*.12,XW=W*.84,b1=H*.36,b2=H*.66;word(g,'How strong is the push?',W/2,H*.1,15);
  [[b1,'Battery',1.5,'1.5 volts',Z.seen.b],[b2,'Wall socket',230,'over 100 volts',Z.seen.s]].forEach(([y,n,vv,lab,on])=>{word(g,n,X0,y-26,13,K.tx,800,'left');g.strokeStyle=ink();g.lineWidth=2;g.strokeRect(X0,y-12,XW,24);
   if(on){const f=Math.min(1,vv/230)*Z.grow[n==='Battery'?0:1];g.fillStyle=n==='Battery'?'#2f9b47':'#d62828';g.fillRect(X0,y-12,Math.max(3,XW*f),24);word(g,lab,X0+XW,y+28,13,K.tx,800,'right')}
   else word(g,'Tap to see',X0+XW/2,y,12,K.mu,700)});
  word(g,Z.msg,W/2,H*.9,13,0,700)}
 if(v==='water'){const sx=W*.2,sy=H*.55;g.fillStyle=A.alpha(K.cy,.35);B();g.ellipse(sx,sy,W*.14,H*.1,0,0,7);g.fill();g.strokeStyle=ink();g.lineWidth=2.5;g.stroke();word(g,'Sink',sx,sy+H*.16,12);
icon(g,'Hairdryer',Z.hx,H*.45,Math.min(W*.2,H*.36));word(g,'Hairdryer',Z.hx,H*.45+Math.min(W*.2,H*.36)*.5+16,12);
  const hr=handR();box(g,hr,Z.dry?A.alpha(K.gr,.2):A.alpha(K.cy,.2));word(g,Z.dry?'Dry hands':'Wet hands',hr.x+hr.w/2,hr.y+hr.h*.3,12);
  if(!Z.dry)for(let i=0;i<5;i++){g.fillStyle='#1d5fc4';B();g.arc(hr.x+hr.w*(.2+i*.15),hr.y+hr.h*.7,5,0,7);g.fill()}
  const tr=towelR();box(g,tr,'#f4c20d');word(g,'Towel',tr.x+tr.w/2,tr.y+tr.h/2,12,'#111',800);
  if(Z.hx<W*.55){g.setLineDash([6,5]);g.strokeStyle=K.rd;g.lineWidth=3;B();M(sx+W*.14,sy);L(Z.hx-30,H*.45);g.stroke();g.setLineDash([])}
  word(g,Z.msg,W/2,H*.95,13,0,700)}
 if(v==='spot'){SPOT.forEach(([k,d],i)=>{const r=spot(i),f=Z.found.includes(i),s=Z.safe.includes(i);box(g,r,f?A.alpha(K.rd,.18):s?A.alpha(K.gr,.18):K.pn,f||s?4:2,f?K.rd:s?K.gr:K.tx);
   icon(g,k,r.x+r.w/2,r.y+r.h*.42,Math.min(r.w,r.h)*.7);
   word(g,f?'Danger!':s?'Safe':k,r.x+r.w/2,r.y+r.h-14,12,f?K.rd:K.tx,800)});word(g,`Dangers found: ${Z.found.length} of 3`,W/2,H*.93,13)}
 if(v==='unplug'){const s=sock();g.fillStyle='#f5f5f5';g.strokeStyle=ink();g.lineWidth=2.5;g.fillRect(s.x,s.y,s.w,s.h);g.strokeRect(s.x,s.y,s.w,s.h);
  const sw=swR();g.fillStyle=Z.off?'#9aa3ad':'#d62828';g.fillRect(sw.x,sw.y,sw.w,sw.h);g.strokeRect(sw.x,sw.y,sw.w,sw.h);word(g,Z.off?'Off':'On',sw.x+sw.w/2,sw.y+sw.h+14,12);
  const p=plugR();g.fillStyle='#33414f';A.paint.rrect(p.x,p.y,p.w,p.h,8);g.fill();g.stroke();word(g,'Plug',p.x+p.w/2,p.y+p.h/2,12,'#fff',800);
  g.lineWidth=7;g.strokeStyle=Z.tug?K.rd:ink();B();M(p.x+p.w,p.y+p.h/2);g.bezierCurveTo(p.x+p.w+W*.15,p.y+p.h*1.6,W*.7,H*.85,W*.82,H*.62);g.stroke();
  word(g,'Cable',W*.62,H*.8,12);icon(g,'Lamp',W*.86,H*.48,Math.min(W*.18,H*.34));word(g,Z.msg,W/2,H*.95,13,0,700)}
 if(v==='kite'){g.fillStyle=A.alpha(K.gr,.25);g.fillRect(0,H*.78,W,H*.22);
  [W*.08,W*.36].forEach(x=>{g.strokeStyle=ink();g.lineWidth=4;B();M(x,H*.78);L(x,H*.2);M(x-16,H*.24);L(x+16,H*.24);g.stroke()});
  g.lineWidth=2;[H*.24,H*.3].forEach(y=>{B();M(0,y+6);g.quadraticCurveTo(W*.22,y+26,W*.44,y+6);g.stroke()});word(g,'Power lines',W*.22,H*.12,12);
  const sr=safeR();g.setLineDash([8,6]);g.strokeStyle=K.gr;g.lineWidth=3;g.strokeRect(sr.x,sr.y,sr.w,sr.h);g.setLineDash([]);word(g,'Open park',sr.x+sr.w/2,sr.y+sr.h+14,12);
  g.save();g.translate(Z.kx,Z.ky);B();M(0,-26);L(18,0);L(0,26);L(-18,0);g.closePath();g.fillStyle='#e34b4b';g.fill();g.lineWidth=2.5;g.strokeStyle=ink();g.stroke();g.restore();
  g.lineWidth=1.5;B();M(Z.kx,Z.ky+26);L(Z.kx+10,H*.78);g.stroke();word(g,Z.msg,W/2,H*.93,13,0,700)}
 A.fx.draw(g)}
const handR=()=>({x:A.W*.06,y:A.H*.06,w:A.W*.3,h:A.H*.2}),towelR=()=>({x:A.W*.42,y:A.H*.07,w:A.W*.2,h:A.H*.16});
const sock=()=>({x:A.W*.08,y:A.H*.2,w:A.W*.24,h:A.H*.5}),swR=()=>{const s=sock();return{x:s.x+s.w*.62,y:s.y+s.h*.12,w:s.w*.26,h:s.h*.16}};
const plugR=()=>{const s=sock();return{x:s.x+s.w*.12+Z.px,y:s.y+s.h*.45,w:s.w*.6,h:s.h*.3}};
const safeR=()=>({x:A.W*.56,y:A.H*.14,w:A.W*.38,h:A.H*.5});
const oops=s=>{A.sound.miss();Z.msg='Not safe';tell(s)},yay=(s,m)=>{A.sound.pop();Z.msg=m||'';tell(s);Z.want()};
function place(j){const i=Z.sel;if(i==null)return;if(IT[i][1]!==j){Z.flash=j;A.sound.miss();return tell('Look again. '+WHY[i])}
 Z.put.push(i);Z.flash=-1;Z.sel=IT.findIndex((x,k)=>!Z.put.includes(k));if(Z.sel<0)Z.sel=null;A.sound.tick();tell(WHY[i]+(Z.sel==null?' All sorted!':''));Z.want()}
function meter(k){if(Z.seen[k])return;Z.seen[k]=1;const n=k==='b'?0:1;Z.grow[n]=0;A.tween(Z.grow,{[n]:1},900,'out');
 yay(k==='b'?'The battery bar is tiny: 1.5 volts. Small batteries are safe to hold.':'The wall socket bar is huge: over 100 volts. That is strong enough to hurt you badly.')}
function dryHands(){if(Z.dry)return;Z.dry=1;A.sound.tick();Z.msg='Hands are dry';tell('Your hands are dry now.'+(Z.hx<A.W*.55?' Now move the hairdryer away from the sink.':''));Z.want()}
function moveDryer(){if(Z.hx>=A.W*.55)return;A.tween(Z,{hx:A.W*.78},600,'out',()=>{Z.msg='Away from water';tell('The hairdryer is far from the sink now.'+(Z.dry?'':' Now dry your hands.'));Z.want()})}
function pick(i){if(Z.found.includes(i)||Z.safe.includes(i))return;const[k,d,why]=SPOT[i];if(d){Z.found.push(i);A.sound.pop();tell(why);Z.want()}else{Z.safe.push(i);A.sound.tick();tell(why)}}
function switchOff(){if(Z.off)return;Z.off=1;A.sound.tick();Z.msg='Switched off';tell('The switch is off. Now hold the plug and pull it out.')}
function pullPlug(){if(Z.out)return;if(!Z.off){return oops('Switch off at the wall first, then pull the plug.')}Z.out=1;Z.tug=0;A.tween(Z,{px:A.W*.22},600,'out',()=>yay('You switched off and pulled the plug, not the cable. Safe!','Unplugged safely'))}
function tugCable(){if(Z.out)return;Z.tug=1;oops('Pulling the cable can break the wires inside. Hold the plug instead.')}
function flyKite(x,y){const r=safeR();Z.kx=x;Z.ky=y;if(inR({x,y},r)){A.sound.pop();Z.msg='Safe place!';Z.ok=1;tell('The open park is far from the power lines. That is a safe place for a kite.');Z.want()}
 else if(x<A.W*.5){Z.ok=0;oops('Too close to the power lines! A kite string can carry electricity. Fly it in the open park.')}else{again()}}
function buttons(){if(!pads)return;pads.innerHTML='';const v=scene(),bt=(t,fn)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'},pads,t);b.onclick=fn};
 if(v==='sort'&&Z.sel!=null){bt(`${IT[Z.sel][0]}: plugs in the wall`,()=>place(0));bt(`${IT[Z.sel][0]}: uses batteries`,()=>place(1))}
 if(v==='strong'){if(!Z.seen.b)bt('Test the battery',()=>meter('b'));if(!Z.seen.s)bt('Test the wall socket',()=>meter('s'))}
 if(v==='water'){if(!Z.dry)bt('Dry hands on the towel',dryHands);if(Z.hx<A.W*.55)bt('Move the hairdryer away',moveDryer)}
 if(v==='spot')SPOT.forEach(([k],i)=>{if(!Z.found.includes(i)&&!Z.safe.includes(i))bt(k,()=>pick(i))});
 if(v==='unplug'&&!Z.out){if(!Z.off)bt('Switch off',switchOff);bt('Pull the plug',pullPlug);bt('Pull the cable',tugCable)}
 if(v==='kite'&&!Z.ok){bt('Fly it in the open park',()=>{const r=safeR();A.tween(Z,{kx:r.x+r.w/2,ky:r.y+r.h/2},600,'out',()=>flyKite(Z.kx,Z.ky))});bt('Fly it by the power lines',()=>flyKite(A.W*.22,A.H*.35))}}
let drag=null;
function down(p){const v=scene();
 if(v==='sort'){for(let i=0;i<IT.length;i++)if(!Z.put.includes(i)&&inR(p,card(i))){Z.sel=i;A.sound.tick();tell(`${IT[i][0]}. Plug or batteries?`);return false}[0,1].forEach(j=>{if(inR(p,bin(j)))place(j)});return false}
 if(v==='strong'){if(p.y<A.H*.5)meter('b');else meter('s');return false}
 if(v==='water'){if(inR(p,towelR())||inR(p,handR())){dryHands();return false}if(Math.abs(p.x-Z.hx)<A.W*.14&&Math.abs(p.y-A.H*.45)<A.H*.22){drag='dryer';return true}return false}
 if(v==='spot'){SPOT.forEach((x,i)=>{if(inR(p,spot(i)))pick(i)});return false}
 if(v==='unplug'){if(inR(p,swR())){switchOff();return false}if(inR(p,plugR())){drag='plug';return true}if(p.x>plugR().x+plugR().w&&p.y>A.H*.45){tugCable();return false}return false}
 if(v==='kite'&&!Z.ok&&Math.hypot(p.x-Z.kx,p.y-Z.ky)<46){drag='kite';return true}return false}
function move(p){if(drag==='dryer'){Z.hx=Math.max(A.W*.3,Math.min(A.W*.86,p.x));again()}if(drag==='kite'){Z.kx=p.x;Z.ky=Math.min(p.y,A.H*.74);again()}
 if(drag==='plug'&&p.x>plugR().x+plugR().w*1.4)drag='pulled'}
function up(){if(drag==='dryer'&&Z.hx>=A.W*.55)moveDryer();if(drag==='kite')flyKite(Z.kx,Z.ky);if(drag==='pulled'||drag==='plug')pullPlug();drag=null}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++Z.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===Z.tok)fn()},A.reduced()?j*40+40:(j+1)*ms))};
const fresh=()=>{const t=(Z.tok||0)+1;Object.keys(Z).forEach(k=>delete Z[k]);Object.assign(Z,{tok:t,want:()=>{},put:[],sel:0,flash:-1,seen:{},grow:[0,0],dry:0,hx:A.W*.42,found:[],safe:[],off:0,out:0,tug:0,px:0,kx:A.W*.22,ky:A.H*.36,ok:0,msg:''});drag=null};
const steps=[
{h:'Plug or batteries?',p:'Some things plug into the wall. Some use batteries. Tap a thing, then tap its box.',task:'Sort all six things',
 show:()=>{steps[0].go();seq([0,1,2,3,4,5].map(i=>()=>{Z.sel=i;place(IT[i][1])}),450)},
 go:()=>{fresh();tell('Six things. Do they plug in the wall, or use batteries?');Z.want=ok(0,()=>Z.put.length===6,'Plugs use the wall socket. Batteries go inside.')}},
{h:'How strong?',p:'Electricity from a wall socket is called mains electricity. Test a battery and a wall socket.',predict:{q:'A small battery and a wall socket. Which one is stronger?',opts:['The wall socket, by far','The battery','They are the same'],ans:0},task:'Test both',
 show:()=>{steps[1].go();seq([()=>meter('b'),()=>meter('s')],700)},
 go:()=>{fresh();Z.msg='';tell('A battery and a wall socket. Which gives the bigger push?');Z.want=ok(1,()=>Z.seen.b&&Z.seen.s,'Mains electricity from the wall is strong enough to hurt you.')}},
{h:'Water and electricity',p:'Water can carry electricity to you. Keep wet hands and water away from plugs.',predict:{q:'Your hands are wet. Is it OK to touch a plug if you are quick?',opts:['No, dry them first','Yes, if you are quick','Yes, water washes it off'],ans:0},task:'Dry your hands and move the hairdryer away',
 show:()=>{steps[2].go();seq([dryHands,moveDryer],700)},
 go:()=>{fresh();Z.msg='Wet hands, by the sink';tell('Wet hands, and a hairdryer by the sink. Make it safe.');Z.want=ok(2,()=>Z.dry&&Z.hx>=A.W*.55,'Dry hands, and keep electric things away from water.')}},
{h:'Spot the danger',p:'Look at each thing in the kitchen. Tap the three that are not safe.',task:'Find all three dangers',
 show:()=>{steps[3].go();seq([0,1,2].map(i=>()=>pick(i)),600)},
 go:()=>{fresh();tell('Six things in a kitchen. Three of them are not safe. Find them.');Z.want=ok(3,()=>Z.found.length===3,'A fork in a toaster, too many plugs and a broken cable are all dangers.')}},
{h:'Unplug the safe way',p:'Switch off at the wall. Then hold the plug and pull. Do not pull the cable.',predict:{q:'To unplug a lamp, what do you hold?',opts:['The plug','The cable','Either one is fine'],ans:0},task:'Switch off, then pull out the plug',
 show:()=>{steps[4].go();seq([switchOff,pullPlug],700)},
 go:()=>{fresh();Z.msg='The lamp is on';tell('A lamp is plugged in and switched on. Unplug it the safe way.');Z.want=ok(4,()=>Z.out,'Switch off, then pull the plug.')}},
{h:'Kites and power lines',p:'Power lines carry very strong electricity. Never fly a kite near them, and never climb a pylon.',task:'Fly the kite in a safe place',
 show:()=>{steps[5].go();seq([()=>{const r=safeR();A.tween(Z,{kx:r.x+r.w/2,ky:r.y+r.h/2},500,'out',()=>flyKite(Z.kx,Z.ky))}],400)},
 go:()=>{fresh();Z.msg='Drag the kite';tell('The kite is by the power lines. Drag it to a safe place.');Z.want=ok(5,()=>Z.ok,'Kites go far from power lines.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.want()});
const QS=[['Which is stronger: a toy battery or a wall socket?',[['The wall socket','ok'],['The toy battery','batt'],['They are the same','same']]],
 ['Your hands are wet. What do you do before you touch a switch?',[['Dry my hands','ok'],['Be very quick','quick'],['Nothing, water is fine','fine']]],
 ['Toast is stuck in the toaster. What do you do?',[['Ask a grown-up to unplug it','ok'],['Get it out with a fork','fork'],['Shake it while it is on','shake']]],
 ['How do you unplug a lamp?',[['Switch off, then pull the plug','ok'],['Pull the cable','cable'],['Pull it while it is on','on']]],
 ['Your kite is stuck in a power line. What do you do?',[['Leave it and tell a grown-up','ok'],['Climb up to get it','climb'],['Pull the string hard','string']]],
 ['A cable is broken and you can see wires. What do you do?',[['Do not touch it, tell a grown-up','ok'],['Wrap it in paper','paper'],['Plug it in to test it','test']]]];
function why(t){let m='Electricity from the wall is strong. Keep safe.';
 if(t==='batt')m=`A toy battery is only about 1.5 volts. A wall socket is over 100 volts.`;
 if(t==='same')m=`They are not the same. The wall socket is far, far stronger.`;
 if(t==='quick')m=`Being quick does not help. Water carries electricity to you straight away. Dry your hands first.`;
 if(t==='fine')m=`Water can carry electricity to you. Always dry your hands first.`;
 if(t==='fork')m=`A metal fork lets electricity reach your hand. Never put metal in a toaster.`;
 if(t==='shake')m=`It is still plugged in. Ask a grown-up to switch off and unplug it first.`;
 if(t==='cable')m=`Pulling the cable can break the wires inside. Hold the plug.`;
 if(t==='on')m=`Switch off at the wall first. Then pull the plug.`;
 if(t==='climb')m=`Never climb a pole or pylon. Power lines can hurt you even if you do not touch them.`;
 if(t==='string')m=`The string can carry electricity from the line to you. Let go and tell a grown-up.`;
 if(t==='paper')m=`Paper does not make it safe. Do not touch it. A grown-up must fix it or throw it away.`;
 if(t==='test')m=`A broken cable can give you a shock. Never plug it in. Tell a grown-up.`;
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);again()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(right?'Yes! In a row: '+run+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==6;pads.hidden=A.step===6;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();
  A.gest({down,move,up});buttons()}});
A.start()})})();
