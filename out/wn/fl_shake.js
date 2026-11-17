/* Flagship: earthquake-resistant design (ages 9–11). Push a pin-jointed frame, then brace it into triangles; brace a
   tower with an open ground floor and run a shake test; fit rubber bearings (base isolation) and shake again; order the
   tsunami warning chain; pick the safe escape route on a coast map; then a challenge. Text and data are in shake_art.js. */
(()=>{
const D=SHAKE,N=D.FLOORS,FLOOR=['G','1','2','3','4'];
VIS.reg('flagshake',c=>{let A,cx,bar,quizEl,round=-1,token=0,grab=null;const s={};
function pal(){const q=A.col;return{text:q.tx,quiet:q.mu,back:q.pn,dark:q.dark,ink:'#111827',steel:q.dark?'#cbd5e1':'#334155',wall:'#fef3c7',glass:'#bae6fd',brace:'#b45309',crack:'#be123c',
 ground:q.dark?'#57534e':'#d6d3d1',sea:q.dark?'#1e40af':'#93c5fd',land:q.dark?'#3f6212':'#d9f99d',hill:q.dark?'#65a30d':'#a3e635',okc:'#166534',noc:'#9f1239',band:q.dark?'#3730a3':'#e0e7ff',rubber:'#1f2937',pick:'#7c3aed'}}
const px=n=>A.narrow?n:Math.round(n*1.15);
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(t,x,y,n,col,wt,align){cx.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;cx.textAlign=align||'center';cx.textBaseline='middle';cx.fillStyle=col;cx.fillText(String(t),x,y,A.W-12)}
function lines(t,w,n){cx.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let cur='';String(t).split(' ').forEach(wd=>{const tryit=cur?cur+' '+wd:wd;if(cur&&cx.measureText(tryit).width>w){out.push(cur);cur=wd}else cur=tryit});out.push(cur);return out}
function card(x,y,w,h,fill,edge,lw){A.paint.rrect(x,y,w,h,8);cx.fillStyle=fill;cx.fill();if(edge){cx.lineWidth=lw||2;cx.strokeStyle=edge;cx.stroke()}}
function tagAt(t,x,y){const k=pal();cx.font=`800 ${px(11)}px system-ui,sans-serif`;const w=cx.measureText(t).width+12,h=px(20);card(x-w/2,y-h/2,w,h,'#ffffff',k.ink,1.5);write(t,x,y,11,k.ink,800)}
function banner(t){const k=pal(),rows=lines(t,A.W-36,13),lh=px(17),h=rows.length*lh+12;card(9,7,A.W-18,h,k.band);rows.forEach((r,i)=>write(r,A.W/2,13+lh*(i+.5),13,k.dark?'#f8fafc':k.ink));return 7+h+px(8)}
function footer(){if(!s.text)return;const k=pal(),rows=lines((s.bad?'✗ ':'✓ ')+s.text,A.W-40,12),lh=px(16),h=rows.length*lh+10,y=A.H-h-7;card(9,y,A.W-18,h,'#ffffff',s.bad?k.noc:k.okc);rows.forEach((r,i)=>write(r,A.W/2,y+5+lh*(i+.5),12,s.bad?k.noc:k.ink))}
const oops=t=>{s.bad=true;s.text=t;A.sound.miss();say(t);A.redraw()};
const yes=t=>{s.bad=false;s.text=t;A.sound.pop();say(t);A.redraw();s.check()};
const tell=t=>{s.bad=false;s.text=t;say(t);A.redraw()};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* ground shaking: a 1.8 s burst that fades in and out; the end callback judges the result */
function shake(end){if(A.reduced()){s.sh={t:.9,dur:1.8};A.redraw();setTimeout(()=>{s.sh=null;end()},40);return}s.sh={t:0,dur:1.8,end};A.sound.whoosh();A.kick()}
const wave=()=>{if(!s.sh)return 0;const u=s.sh.t/s.sh.dur;return Math.sin(u*Math.PI)*Math.sin(s.sh.t*2*Math.PI*2.6)};
function groundStrip(y,off){const k=pal();cx.fillStyle=k.ground;cx.fillRect(0,y,A.W,A.H-y);cx.strokeStyle=k.steel;cx.lineWidth=2;cx.beginPath();for(let x=-20;x<A.W+20;x+=14){cx.moveTo(x+off,y+12);cx.lineTo(x+off+8,y+2)}cx.stroke();cx.beginPath();cx.moveTo(0,y);cx.lineTo(A.W,y);cx.stroke()}
/* step 1: the pin-jointed frame */
function frameBox(top){const L=Math.min(A.W*.34,A.H-top-px(120)),yb=top+px(24)+L,x0=A.W/2-L/2;return{L,yb,x0}}
function showFrame(top){const k=pal(),f=s.f=frameBox(top),dx=s.dx,rise=Math.sqrt(Math.max(0,f.L*f.L-dx*dx)),P=[[f.x0,f.yb],[f.x0+f.L,f.yb],[f.x0+f.L+dx,f.yb-rise],[f.x0+dx,f.yb-rise]];
 groundStrip(f.yb,0);cx.strokeStyle=k.steel;cx.lineWidth=px(7);cx.lineCap='round';cx.beginPath();[[1,2],[2,3],[3,0]].forEach(([a,b])=>{cx.moveTo(...P[a]);cx.lineTo(...P[b])});cx.stroke();
 if(s.braced){cx.strokeStyle=k.brace;cx.lineWidth=px(6);cx.beginPath();cx.moveTo(...P[0]);cx.lineTo(...P[2]);cx.stroke();cx.fillStyle='rgba(180,83,9,.16)';cx.beginPath();cx.moveTo(...P[0]);cx.lineTo(...P[1]);cx.lineTo(...P[2]);cx.closePath();cx.fill()}
 P.forEach(([x,y])=>{cx.fillStyle='#ffffff';cx.strokeStyle=k.ink;cx.lineWidth=2;cx.beginPath();cx.arc(x,y,px(6),0,7);cx.fill();cx.stroke()});
 const deg=Math.round(Math.asin(clamp(dx/f.L,-1,1))*180/Math.PI);write(s.braced?(Math.abs(deg)<2?'braced: two triangles, it stays square':'braced'):(Math.abs(deg)<2?'square frame, 4 pin joints':`leaning ${Math.abs(deg)}°`),A.W/2,f.yb+px(30),12,k.dark?'#f8fafc':k.ink,800)}
function pushTop(){const f=s.f||{L:200};if(!s.braced){A.tween(s,{dx:f.L*.45},500,'out');s.loose=1;A.sound.tick();tell(D.MSG[0]);return}
 s.dx=3;A.redraw();setTimeout(()=>{s.dx=0;A.redraw()},180);firm()}
function firm(){if(s.firm)return;s.firm=1;if(s.loose)yes(D.MSG[1]);else tell('It hardly moves. Now compare with no brace.')}
function addBrace(){if(s.braced)return;if(!s.loose){oops(D.MSG[2]);return}A.tween(s,{dx:0},300,'out');s.braced=1;A.sound.tick();tell(D.MSG[3])}
/* step 2: the tower with an open ground floor */
function towerBox(top){const yG=A.H-px(70),fh=Math.min((yG-top-px(16))/N,px(48)),tw=Math.min(A.W*.42,px(210));return{yG,fh,tw,x0:A.W/2-tw/2}}
function drift(i){const w=wave();if(s.brace[i])return w*1.5;return w*s.f.fh*(.32+.5*(N-i)/N)}
function showTower(top){const k=pal(),f=s.f=towerBox(top),g=wave()*px(9);groundStrip(f.yG,g);let off=g;s.rects=[];
 for(let i=0;i<N;i++){const d=drift(i),yb=f.yG-i*f.fh,yt=yb-f.fh,a=[f.x0+off,yb],b=[f.x0+f.tw+off,yb],cc=[f.x0+f.tw+off+d,yt],dd=[f.x0+off+d,yt];
  cx.fillStyle=i===0?k.glass:k.wall;cx.beginPath();[a,b,cc,dd].forEach((p,j)=>j?cx.lineTo(...p):cx.moveTo(...p));cx.closePath();cx.fill();cx.strokeStyle=k.steel;cx.lineWidth=3;cx.stroke();
  if(i>0){cx.fillStyle=k.glass;for(let w=0;w<3;w++){const wx=f.x0+off+d*.5+f.tw*(.14+w*.29);cx.fillRect(wx,yt+f.fh*.28,f.tw*.14,f.fh*.4)}}
  if(s.brace[i]){cx.strokeStyle=k.brace;cx.lineWidth=px(4);cx.beginPath();cx.moveTo(...a);cx.lineTo(...cc);cx.moveTo(...b);cx.lineTo(...dd);cx.stroke()}
  if(s.cracked&&s.cracked.includes(i)){cx.strokeStyle=k.crack;cx.lineWidth=3;cx.beginPath();const cxm=f.x0+off+f.tw*.5;cx.moveTo(cxm-12,yt+4);cx.lineTo(cxm+2,yt+f.fh*.4);cx.lineTo(cxm-6,yt+f.fh*.6);cx.lineTo(cxm+10,yb-4);cx.stroke()}
  tagAt(i?FLOOR[i]:'G shops',f.x0-px(30),yb-f.fh/2);s.rects.push({x:f.x0,y:yt,w:f.tw,h:f.fh,i});off+=d}
 write(s.sh?'shaking…':`${s.brace.filter(Boolean).length} of ${N} floors braced`,A.W/2,f.yG+px(28),12,k.dark?'#f8fafc':k.ink,800)}
function toggleBrace(i){if(s.sh)return;s.brace[i]=!s.brace[i];s.cracked=null;A.sound.tick();say(`${i?'Floor '+FLOOR[i]:'The ground floor'} is ${s.brace[i]?'now braced':'no longer braced'}. ${s.brace.filter(Boolean).length} of ${N} floors braced.`);s.text='';A.redraw()}
function testTower(){if(s.sh)return;s.text='';s.cracked=null;say('Shake test running.');shake(judgeTower)}
function judgeTower(){const open=[...Array(N).keys()].filter(i=>!s.brace[i]),names=open.map(i=>i?'floor '+FLOOR[i]:'the ground floor').join(', ');let m='';
 if(!open.length){s.passed=1;yes(D.MSG[4]);return}
 s.cracked=open;
 if(open.length===N)m='Every floor racked over and cracked. Nothing stops the frames leaning. Brace the floors.';
 else if(open.length===1&&open[0]===0)m='The open ground floor folded. It holds up every floor above, so it takes the biggest push. Brace it.';
 else if(open.includes(0))m=`Still leaning: ${names}. The open ground floor is the weakest of all, so brace that one too.`;
 else m=`The ground floor held, but ${names} still leaned and cracked. Brace every floor.`;oops(m)}
/* step 3: base isolation */
function isoBox(top){const yG=A.H-px(78),bw=Math.min(A.W*.5,px(240)),bh=Math.min((yG-top-px(40))/3,px(46));return{yG,bw,bh,x0:A.W/2-bw/2,feet:[.08,.5,.92]}}
function showIso(top){const k=pal(),f=s.f=isoBox(top),g=wave()*px(16),iso=s.pads.every(Boolean),body=iso?wave()*px(3):g,shiver=iso?0:wave()*px(5);groundStrip(f.yG,g);
 const base=f.yG-px(14);s.slots=f.feet.map(t=>[f.x0+f.bw*t,base+px(7)]);
 s.slots.forEach(([x,y],i)=>{const X=x+(s.pads[i]?g:g);if(s.pads[i]){card(X-px(14),y-px(7),px(28),px(14),k.rubber,k.dark?'#e2e8f0':null);write('rubber',X,y+px(18),9,k.dark?'#f8fafc':k.ink,700)}else{cx.strokeStyle=k.pick;cx.setLineDash([4,3]);cx.lineWidth=2;cx.strokeRect(X-px(14),y-px(7),px(28),px(14));cx.setLineDash([])}});
 const bx=f.x0+body;cx.fillStyle=k.steel;cx.fillRect(bx-6,base-px(8),f.bw+12,px(8));
 for(let i=0;i<3;i++){const yb=base-px(8)-i*f.bh,lean=shiver*(i+1)*.5;cx.fillStyle=k.wall;cx.beginPath();cx.moveTo(bx,yb);cx.lineTo(bx+f.bw,yb);cx.lineTo(bx+f.bw+lean,yb-f.bh);cx.lineTo(bx+lean,yb-f.bh);cx.closePath();cx.fill();cx.strokeStyle=k.steel;cx.lineWidth=3;cx.stroke();
  cx.strokeStyle=k.brace;cx.lineWidth=2;cx.beginPath();cx.moveTo(bx,yb);cx.lineTo(bx+f.bw+lean,yb-f.bh);cx.moveTo(bx+f.bw,yb);cx.lineTo(bx+lean,yb-f.bh);cx.stroke()}
 const ty=base-px(8)-2*f.bh-f.bh*.25,tx=bx+f.bw*.5+shiver*1.4;cx.fillStyle='#78350f';cx.fillRect(tx-px(22),ty,px(44),px(5));
 if(s.vase==='down'){cx.fillStyle='#db2777';cx.beginPath();cx.ellipse(tx+px(30),ty+f.bh*.22,px(11),px(5),0,0,7);cx.fill()}else{cx.fillStyle='#db2777';const sw=s.sh&&!iso?wave()*.35:0;cx.save();cx.translate(tx,ty);cx.rotate(sw);cx.beginPath();cx.moveTo(-px(6),0);cx.lineTo(px(6),0);cx.lineTo(px(8),-px(16));cx.lineTo(-px(8),-px(16));cx.closePath();cx.fill();cx.restore()}
 write(s.sh?'shaking…':`${s.pads.filter(Boolean).length} of 3 columns on rubber bearings`,A.W/2,f.yG+px(30),12,k.dark?'#f8fafc':k.ink,800)}
function addPad(i){if(s.sh)return;if(i==null)i=s.pads.indexOf(false);if(i<0||s.pads[i])return;s.pads[i]=true;s.vase='up';s.text='';A.sound.tick();say(`Bearing fitted. ${s.pads.filter(Boolean).length} of 3 columns on rubber bearings.`);A.redraw()}
function testIso(){if(s.sh)return;s.vase='up';s.text='';say('Shake test running.');shake(judgeIso)}
function judgeIso(){const n=s.pads.filter(Boolean).length;let m='';if(n===3){s.calm=1;yes(D.MSG[5]);return}
 s.vase='down';if(n===0){s.fixedTry=1;tell(D.MSG[6]);return}
 m=`Only ${n} of 3 columns sit on bearings. The others are still fixed to the ground and pass the shaking straight up. Fit all three.`;oops(m)}
/* step 4: tsunami warning chain */
const ORDER=[3,0,4,1,2];
function showChain(top){const k=pal(),gap=px(6),cw=(A.W-30-gap)/2,ch=px(38);s.cards=[];write('warning chain',15+cw/2,top+px(8),11,k.text,800);write('cards to place',15+cw+gap+cw/2,top+px(8),11,k.text,800);
 for(let j=0;j<5;j++){const y=top+px(22)+j*(ch+gap),x=15;if(j<s.placed.length){const id=s.placed[j];card(x,y,cw,ch,'#dcfce7',k.okc);lines(`${j+1}. ${D.CHAIN[id][0]}`,cw-12,11).forEach((r,q,all)=>write(r,x+cw/2,y+ch/2+(q-(all.length-1)/2)*px(14),11,k.ink,800))}else{cx.strokeStyle=k.quiet;cx.setLineDash([5,4]);cx.lineWidth=1.5;cx.strokeRect(x,y,cw,ch);cx.setLineDash([]);write(String(j+1),x+cw/2,y+ch/2,12,k.text,800)}}
 ORDER.filter(id=>!s.placed.includes(id)).forEach((id,j)=>{const x=15+cw+gap,y=top+px(22)+j*(ch+gap);card(x,y,cw,ch,s.wrong===id?'#ffe4e6':'#ffffff',s.wrong===id?k.noc:k.ink);lines(D.CHAIN[id][0],cw-12,11).forEach((r,q,all)=>write(r,x+cw/2,y+ch/2+(q-(all.length-1)/2)*px(14),11,k.ink,800));s.cards.push({x,y,w:cw,h:ch,id})})}
function place(id){if(s.placed.includes(id))return;const want=s.placed.length;if(id!==want){s.wrong=id;oops(`Not yet: "${D.CHAIN[id][0]}". ${D.CHAIN[id][1]}`);return}s.wrong=null;s.placed.push(id);A.sound.tick();tools();
 if(s.placed.length===5){yes(D.MSG[7]);return}tell(`${want+1}. ${D.CHAIN[id][0]}. What comes next?`)}
/* step 5: the escape route map */
function mapBox(top){const size=Math.min(A.W-30,A.H-top-px(70)),x0=(A.W-size)/2;return{x0,y0:top,size,at:(x,y)=>[x0+x*size/10,top+y*size/10]}}
function showMap(top){const k=pal(),m=s.f=mapBox(top),[X0,Y0]=m.at(0,0);cx.save();cx.beginPath();cx.rect(X0,Y0,m.size,m.size);cx.clip();cx.fillStyle=k.land;cx.fillRect(X0,Y0,m.size,m.size);cx.fillStyle=k.sea;cx.beginPath();cx.moveTo(...m.at(0,0));cx.lineTo(...m.at(1.3,0));cx.bezierCurveTo(...m.at(1.6,4),...m.at(.9,7),...m.at(1.2,10));cx.lineTo(...m.at(0,10));cx.closePath();cx.fill();
 cx.strokeStyle=k.sea;cx.lineWidth=px(8);cx.beginPath();cx.moveTo(...m.at(1.1,9.7));cx.bezierCurveTo(...m.at(4,9.4),...m.at(6,8.2),...m.at(10,8.4));cx.stroke();
 [[2.6,'#84cc16'],[1.7,'#65a30d'],[.9,'#4d7c0f']].forEach(([r,col])=>{const [hx,hy]=m.at(8.4,2.2);cx.fillStyle=k.dark?col:k.hill;cx.globalAlpha=k.dark?.7:.55;cx.beginPath();cx.arc(hx,hy,r*m.size/10,0,7);cx.fill();cx.globalAlpha=1});cx.restore();
 s.paths=D.ROUTES.map(([,, ,pts],i)=>{const P=pts.map(p=>m.at(...p)),on=s.route===i;cx.strokeStyle=on?(i===1?(k.dark?'#4ade80':k.okc):(k.dark?'#fb7185':k.noc)):(k.dark?'#f8fafc':k.ink);cx.lineWidth=px(on?7:5);cx.setLineDash(on?[]:[10,6]);cx.lineCap='round';cx.beginPath();P.forEach((p,j)=>j?cx.lineTo(...p):cx.moveTo(...p));cx.stroke();cx.setLineDash([]);return P});
 const [sx,sy]=m.at(3,6);cx.fillStyle='#ffffff';cx.strokeStyle=k.ink;cx.lineWidth=2;cx.beginPath();cx.arc(sx,sy,px(9),0,7);cx.fill();cx.stroke();
 tagAt('school (you)',sx,sy-px(20));tagAt('sea',...m.at(.6,3));tagAt('harbour 2 m',...m.at(2.6,9.1));tagAt('hilltop 40 m',...m.at(8.2,1));tagAt('bridge 3 m',...m.at(6.6,7.6));tagAt('river',...m.at(9,9.2))}
function segDist(p,a,b){const vx=b[0]-a[0],vy=b[1]-a[1],t=clamp(((p.x-a[0])*vx+(p.y-a[1])*vy)/(vx*vx+vy*vy||1),0,1);return Math.hypot(p.x-a[0]-t*vx,p.y-a[1]-t*vy)}
function pickRoute(i){s.route=i;A.sound.tick();if(i===1){yes(D.MSG[8]);return}oops(D.ROUTES[i][2])}
const scene=()=>['frame','tower','iso','chain','map','quiz'][A.step];
function render(a){cx=a.ctx;const k=pal(),w=scene();cx.fillStyle=k.back;cx.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){write('Earthquake-resistant design',A.W/2,A.H*.34,17,k.text,900);write('brace · isolate · warn · plan',A.W/2,A.H*.5,13,k.quiet,700);A.fx.draw(cx);return}
 const top=banner(s.title||'');({frame:showFrame,tower:showTower,iso:showIso,chain:showChain,map:showMap})[w](top);footer();A.fx.draw(cx)}
function blank(o){token++;grab=null;for(const key in s)delete s[key];Object.assign(s,{text:'',bad:false,check:()=>{},dx:0,braced:0,loose:0,firm:0,brace:Array(N).fill(false),cracked:null,pads:[false,false,false],vase:'up',placed:[],wrong:null,route:null},o||{})}
function demo(i,acts,gapMs){const me=token;acts.forEach((f,j)=>setTimeout(()=>{if(me===token&&A.step===i)f()},A.reduced()?40*(j+1):(gapMs||280)*(j+1)))}
const passWhen=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!bar)return;bar.innerHTML='';const w=scene(),b=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},bar,t).onclick=f};
 if(w==='frame'){b('Push the top',pushTop);b('Add a diagonal brace',addBrace)}
 if(w==='tower'){for(let i=0;i<N;i++)b(i?`Brace floor ${FLOOR[i]}`:'Brace the ground floor',()=>toggleBrace(i));b('Run the shake test',testTower)}
 if(w==='iso'){b('Fit a rubber bearing',()=>addPad());b('Run the shake test',testIso)}
 if(w==='chain')ORDER.filter(id=>!s.placed.includes(id)).forEach(id=>b(`Next: ${D.CHAIN[id][0]}`,()=>place(id)));
 if(w==='map')D.ROUTES.forEach(([n],i)=>b(`Take ${n}`,()=>pickRoute(i)))}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const w=scene();if(w==='quiz')return false;
 if(w==='frame'){const f=s.f;if(f&&p.x>f.x0-f.L*.6&&p.x<f.x0+f.L*1.6&&p.y>f.yb-f.L-30&&p.y<f.yb+10){grab={x:p.x,dx:s.dx,far:0};return true}return true}
 if(w==='tower'){const r=(s.rects||[]).find(r=>inside(p,{x:r.x-px(40),y:r.y,w:r.w+px(80),h:r.h}));if(r)toggleBrace(r.i);return true}
 if(w==='iso'){(s.slots||[]).forEach(([x,y],i)=>{if(Math.hypot(p.x-x,p.y-y)<px(26))addPad(i)});return true}
 if(w==='chain'){const r=(s.cards||[]).find(r=>inside(p,r));if(r)place(r.id);return true}
 if(w==='map'){let best=-1,bd=px(22);(s.paths||[]).forEach((P,i)=>{for(let j=1;j<P.length;j++){const d=segDist(p,P[j-1],P[j]);if(d<bd){bd=d;best=i}}});if(best>=0)pickRoute(best);return true}return true}
function move(p){if(!grab||scene()!=='frame')return;const d=p.x-grab.x,L=s.f.L;grab.far=Math.max(grab.far,Math.abs(d));s.dx=s.braced?clamp(d*.03,-3,3):clamp(grab.dx+d,-L*.55,L*.55);A.redraw()}
function up(){const g=grab;grab=null;if(!g||scene()!=='frame')return;const L=s.f.L;
 if(!s.braced&&Math.abs(s.dx)>L*.25){s.loose=1;tell(`It leans ${Math.round(Math.abs(Math.asin(clamp(s.dx/L,-1,1))*180/Math.PI))}° and stays there: the pin joints turn like hinges. Now add a brace.`)}
 else if(s.braced&&g.far>25){s.dx=0;firm()}else A.redraw()}
const steps=[
{h:'Square or triangle?',p:D.STEPP[0],
 predict:{q:'You push the top of a square frame sideways. Which shape will hold firm?',opts:['the square, it has more sides','the square with a diagonal brace','both lean the same'],ans:1},
 task:'Push the frame, brace it, push again',show:()=>demo(0,[pushTop,addBrace,pushTop],420),
 go:()=>{blank({title:D.TITLE[0]});say(D.SAY[0]);tools();s.check=passWhen(0,()=>s.loose&&s.firm,D.DONE[0])}},
{h:'Brace the tower',p:D.STEPP[1],
 predict:{q:'There is only time to brace one floor this week. Which floor matters most?',opts:['the top floor','the open ground floor','they all matter the same'],ans:1},
 task:'Brace the tower until it passes the shake test',show:()=>demo(1,[...[0,1,2,3,4].map(i=>()=>{if(!s.brace[i])toggleBrace(i)}),testTower],240),
 go:()=>{blank({title:D.TITLE[1]});say(D.SAY[1]);tools();s.check=passWhen(1,()=>s.passed,D.DONE[1])}},
{h:'Rubber bearings',p:D.STEPP[2],
 predict:{q:'Rubber bearings under the building will make the shaking inside…',opts:['worse, because it can slide','much gentler','exactly the same'],ans:1},
 task:'Fit bearings under every column, then shake',show:()=>demo(2,[()=>addPad(),()=>addPad(),()=>addPad(),testIso],300),
 go:()=>{blank({title:D.TITLE[2]});say(D.SAY[2]);tools();s.check=passWhen(2,()=>s.calm,D.DONE[2])}},
{h:'Tsunami warning',p:D.STEPP[3],
 task:'Put the warning chain in order',show:()=>demo(3,[0,1,2,3,4].map(id=>()=>place(id)),300),
 go:()=>{blank({title:D.TITLE[3]});say(D.SAY[3]);tools();s.check=passWhen(3,()=>s.placed.length===5,D.DONE[3])}},
{h:'Get out safely',p:D.STEPP[4],
 predict:{q:'You are on the beach and feel a long, strong earthquake. No siren yet. What do you do?',opts:['wait for the siren','go to high ground now','go and look at the sea'],ans:1},
 task:'Pick the safe way out',show:()=>demo(4,[()=>pickRoute(1)]),
 go:()=>{blank({title:D.TITLE[4]});say(D.SAY[4]);tools();s.check=passWhen(4,()=>s.route===1,D.DONE[4])}},
{h:'Challenge',p:'',go:()=>{blank();quiz()}}];
steps.forEach(st=>{if(st.task)st.onPredict=()=>s.check()});
function quiz(){round++;const [q,opts]=D.QZ[round%D.QZ.length],k=round%3;quizEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizEl.querySelector('.fl-pick');opts.slice(k).concat(opts.slice(0,k)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function mark(t){quizEl.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${streak} in a row.`:'✗ '+(D.WHY[t]||'Try that lab step again.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw:render,onStep:A=>{quizEl.hidden=A.step!==5;bar.hidden=A.step===5;tools()},
 init:A=>{cx=A.ctx;const holder=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Building controls'},holder);quizEl=c.el('div',{class:'fl-chal'},A.below);blank();
  A.every(dt=>{if(!s.sh||!s.sh.end)return false;s.sh.t+=dt;if(s.sh.t>=s.sh.dur){const f=s.sh.end;s.sh=null;f();return true}return true});
  A.gest({down,move,up});tools()}});
A.start()})})();
