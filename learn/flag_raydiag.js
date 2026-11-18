/* Flagship: drawing ray diagrams (ages 12–13; NC England KS3 physics: ray model for mirror images, refraction and the
   convex lens). Aim at a star, place a mirror image, pick refracted paths, fire through a glass
   block, focus two lenses. Every drag has a button twin. */
(()=>{
const {Q0,RAD,N,snell,CASES,BLOCK,DISTS,LENS,QS}=RAYART.D;
VIS.reg('flagraydiag',c=>{let A,P,pad,chal,qx=-1,wins=0;const S={check:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.1)),ff=n=>`700 ${u(n)}px system-ui,sans-serif`;
const near=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function put(s,x,y,n,col,al){P.font=ff(n);P.fillStyle=col||Q0.ink;P.textAlign=al||'center';P.textBaseline='middle';P.fillText(String(s),x,y,A.W-14)}
function breakUp(s,max,n){P.font=ff(n);const rows=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&P.measureText(t).width>max){rows.push(cur);cur=w}else cur=t}rows.push(cur);return rows}
function slab(r,fill,edge,lw){P.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);P.fill();if(edge){P.strokeStyle=edge;P.lineWidth=lw||2;P.stroke()}}
function slabText(r,s,n,col){const L=breakUp(s,r.w-12,n),lh=u(n)+4;L.forEach((l,i)=>put(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function title(s,ok){const L=breakUp(s,A.W-32,13),r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.09,L.length*(u(13)+4)+12)};slab(r,ok?Q0.won:Q0.note,ok?Q0.good:Q0.navy);slabText(r,s,13,ok?Q0.good:Q0.ink);return r.y+r.h}
function verdict(){if(!S.msg)return;const L=breakUp((S.bad?'✗ ':'✓ ')+S.msg,A.W-40,13),lh=u(13)+5,h=L.length*lh+10,y=A.H-h-6;slab({x:10,y,w:A.W-20,h},Q0.card,S.bad?Q0.bad:Q0.good,3);L.forEach((l,i)=>put(l,A.W/2,y+5+lh*(i+.5),13))}
const seg=(...a)=>RAYART.seg(P,...a),arrowAt=(x1,y1,x2,y2,col)=>RAYART.arrow(P,x1,y1,x2,y2,col,u(9)),ray=(x1,y1,x2,y2,col,dash)=>{seg(x1,y1,x2,y2,col||Q0.beam,3,dash);if(!dash)arrowAt(x1,y1,x2,y2,col||Q0.beam)},candle=(x,y,a)=>RAYART.candle(P,x,y,a,u(1));
const describe=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.bad=true;S.msg=s;A.sound.miss();refresh()};
const hit=s=>{S.bad=false;S.msg=s;A.sound.pop()};




const stage=()=>['mirror','image','bend','block','lens','chal'][A.step];
/* step 1: law of reflection */
const hitPt=()=>({x:A.W/2,y:A.H*.68}),arm=()=>Math.min(A.W*.42,A.H*.48);
function drawMirror(){const ok=S.i===50,o=hitPt(),L=arm(),tb=title(ok?'Angle of incidence = angle of reflection = 50°, both measured from the normal.':'Drag the torch until the reflected ray hits the star.',ok);
 P.fillStyle=Q0.silver;P.fillRect(16,o.y,A.W-32,u(8));seg(o.x,o.y,o.x,o.y-L*1.05,Q0.grey,2,[6,5]);put('normal',o.x,o.y-L*1.05-u(9),11,Q0.grey);
 const s={x:o.x-L*Math.sin(S.i*RAD),y:o.y-L*Math.cos(S.i*RAD)},e={x:o.x+L*Math.sin(S.i*RAD),y:o.y-L*Math.cos(S.i*RAD)},t={x:o.x+L*Math.sin(50*RAD),y:o.y-L*Math.cos(50*RAD)};
 put('★',t.x,t.y,26,Q0.gold);ray(s.x,s.y,o.x,o.y);ray(o.x,o.y,e.x,e.y);P.fillStyle=Q0.ink;P.beginPath();P.arc(s.x,s.y,u(11),0,7);P.fill();
 P.strokeStyle=Q0.navy;P.lineWidth=2;P.beginPath();P.arc(o.x,o.y,u(34),-Math.PI/2-S.i*RAD,-Math.PI/2);P.stroke();P.beginPath();P.arc(o.x,o.y,u(40),-Math.PI/2,-Math.PI/2+S.i*RAD);P.stroke();
 put(`incidence i = ${S.i}°`,18,tb+u(14),12,Q0.navy,'left');put(`reflection r = ${S.i}°`,A.W-18,tb+u(30),12,Q0.navy,'right');put(`angle to mirror = ${90-S.i}°`,o.x,o.y+u(24),11,Q0.grey)}
function aim(i){i=Math.max(10,Math.min(80,Math.round(i/10)*10));if(i===S.i)return;S.i=i;A.sound.tick();
 if(i===50)hit('Star hit: i = r = 50°. The 40° to the mirror surface is not the angle of incidence.');else{S.bad=false;S.msg=`i = ${i}°, so r = ${i}°. ${i<50?'The reflected ray is too steep: tilt the torch further from the normal.':'The reflected ray is too low: bring the torch closer to the normal.'}`}refresh()}
/* step 2: image in a plane mirror */
const mx=()=>A.W/2,cm=()=>(A.W/2-30)/48,objY=()=>A.H*.5,eye=()=>({x:A.W/2-cm()*28,y:A.H*.74});
function drawImage(){const done=S.k>=DISTS.length,d=DISTS[Math.min(S.k,1)];if(done)S.g=d;const end=title(done?'Each image is as far behind the mirror as the object is in front, and the same size.':`Candle ${d} cm in front. Drag the ghost to where the reflected rays seem to come from.`,done);
 const X=mx(),k=cm(),oy=objY(),E=eye();P.fillStyle=Q0.silver;P.fillRect(X-3,end+u(10),6,A.H*.82-end-u(10));
 const ox=X-d*k,ix=X+d*k;candle(ox,oy,1);RAYART.eye(P,E.x,E.y,u(1));[oy-u(30),oy-u(12)].forEach(sy=>{const t=(X-ix)/(E.x-ix),qy=sy+t*(E.y-sy);ray(ox,sy,X,qy);ray(X,qy,E.x,E.y);seg(X,qy,X+S.g*k,qy+(sy-qy)*(S.g/d),Q0.grey,2,[6,5])});
 const gx=X+S.g*k;candle(gx,oy,.45);put(`ghost: ${S.g} cm behind`,Math.min(A.W-60,gx),oy+u(16),11,Q0.navy);
 put(`${d} cm`,(ox+X)/2,oy+u(34),11,Q0.grey)}
function ghostTo(g,final){g=Math.max(5,Math.min(45,Math.round(g/5)*5));const ch=g!==S.g;S.g=g;if(ch)A.sound.tick();if(final)judge();else refresh()}
function judge(){const d=DISTS[S.k];if(d==null)return;
 if(S.g===d){S.k++;S.g=10;hit(`Yes: ${d} cm behind, where the reflected rays traced back (dashed) meet.`);return refresh()}
 miss(S.g<d?`At ${S.g} cm the dashed lines do not line up with the reflected rays. The image is as far behind as the candle is in front.`:`${S.g} cm is too far: ${S.g===2*d?'that is the distance from the candle to its image, not from the mirror. ':''}the image is ${d} cm behind the mirror.`)}
/* step 3: which way does it bend */
const ORD=[[0,1,2],[2,0,1],[1,2,0]];
function paths(cs){const g=cs.a==='air';return cs.i===0?[{ang:0,tag:'ok'},{ang:22,tag:'normalBend'},{ang:-22,tag:'normalBend'}]:[{ang:snell(cs.i,1,N),tag:g?'ok':'wayRound'},{ang:cs.i,tag:'noBend'},{ang:snell(cs.i,N,1)||cs.i+25,tag:g?'wayRound':'ok'}]}
function candEnds(){const cs=CASES[S.c];if(!cs)return[];const o={x:A.W/2,y:A.H*.48},L=Math.min(A.W*.4,A.H*.3);return ORD[S.c].map((j,n)=>{const p=paths(cs)[j],R=L*(1-.2*n);return{...p,x:o.x+R*Math.sin(p.ang*RAD),y:o.y+R*Math.cos(p.ang*RAD)}})}
function drawBend(){const cs=CASES[S.c],done=!cs;title(done?'Into glass (slower): bends towards the normal. Out into air: away from it. Along the normal: no bend.':`${cs.t}: tap the path the light really takes.`,done);
 const o={x:A.W/2,y:A.H*.48},L=Math.min(A.W*.4,A.H*.3);P.fillStyle=Q0.glass;if(!done){if(cs.b==='glass')P.fillRect(12,o.y,A.W-24,L+u(10));else P.fillRect(12,o.y-L-u(10),A.W-24,L+u(10))}
 seg(12,o.y,A.W-12,o.y,Q0.ink,2);seg(o.x,o.y-L,o.x,o.y+L,Q0.grey,2,[6,5]);if(done)return;put(cs.a,22,o.y-u(14),12,Q0.grey,'left');put(cs.b,22,o.y+u(14),12,Q0.grey,'left');
 const s={x:o.x-L*Math.sin(cs.i*RAD),y:o.y-L*Math.cos(cs.i*RAD)};ray(s.x,s.y,o.x,o.y);
 candEnds().forEach((e,j)=>{seg(o.x,o.y,e.x,e.y,S.pick===j?(e.tag==='ok'?Q0.good:Q0.bad):Q0.rule,3,[7,5]);P.fillStyle=Q0.card;P.strokeStyle=Q0.navy;P.lineWidth=2;P.beginPath();P.arc(e.x,e.y,u(15),0,7);P.fill();P.stroke();put('ABC'[j],e.x,e.y,13)})}
function choose(j){const e=candEnds()[j];if(!e)return;A.sound.tick();S.pick=j;const cs=CASES[S.c];
 if(e.tag==='ok'){const r=cs.i?Math.round(snell(cs.i,cs.a==='air'?1:N,cs.b==='air'?1:N)):0;S.c++;S.pick=null;hit(cs.i?`${cs.i}° in ${cs.a} becomes ${r}° in ${cs.b}: ${cs.b==='glass'?'towards':'away from'} the normal.`:'Along the normal the light slows down but does not change direction.');return refresh()}
 miss(e.tag==='noBend'?'Light changes speed at the boundary, so a ray at an angle changes direction.':e.tag==='normalBend'?'A ray along the normal hits the boundary square on: it slows down but goes straight on.':cs.b==='glass'?'Glass is denser: light slows down and bends TOWARDS the normal, not away.':'Leaving glass, light speeds up and bends AWAY from the normal.')}
/* step 4: glass block */
function drawBlock(){const all=S.fired.length>=3;title(all?'Towards the normal going in, away by the same amount coming out: the ray leaves parallel to the one that went in.':'Fire at 3 angles. Compare the ray that comes out with the ray that went in.',all);
 const top=A.H*.4,bot=A.H*.6,x0=A.W*.12,x1=A.W*.88,cx=A.W*.36,y9=chipB(0).y-u(8);P.fillStyle=Q0.glass;P.fillRect(x0,top,x1-x0,bot-top);P.strokeStyle=Q0.navy;P.lineWidth=2;P.strokeRect(x0,top,x1-x0,bot-top);
 const i=S.ang,r=snell(i,1,N),si=Math.sin(i*RAD)||1e-6,co=Math.cos(i*RAD),L=Math.min((top-A.H*.2)/co,(cx-16)/si),sx=cx-L*si,sy=top-L*co,ex=cx+(bot-top)*Math.tan(r*RAD),out=Math.min((y9-bot)/co,(A.W-16-ex)/si),oy=bot+out*co;
 seg(cx,top-u(30),cx,top+u(30),Q0.grey,2,[5,4]);seg(ex,bot-u(30),ex,bot+u(30),Q0.grey,2,[5,4]);
 seg(cx,top,cx+(oy-top)*Math.tan(i*RAD),oy,Q0.rule,2,[6,5]);ray(sx,sy,cx,top);ray(cx,top,ex,bot);ray(ex,bot,ex+out*si,oy);
 put(`in: ${i}°`,Math.max(30,sx),sy-u(10),11,Q0.navy);put(`inside: ${Math.round(r)}°`,x1-u(6),top+u(14),11,Q0.navy,'right');put(`out: ${i}°`,Math.min(A.W-40,ex+out*si+u(8)),oy-u(10),11,Q0.navy,'left');
 BLOCK.forEach((a,j)=>{const b=chipB(j);slab(b,S.fired.includes(a)?Q0.won:Q0.card,S.fired.includes(a)?Q0.good:Q0.navy,2);put(a+'°',b.x+b.w/2,b.y+b.h/2,14)})}
const chipB=j=>{const w=Math.min(u(64),(A.W-52)/4);return{x:A.W/2-2*w-12+j*(w+8),y:A.H*.84-u(46),w,h:u(40)}};
function fire(a){A.sound.tick();S.ang=a;if(!S.fired.includes(a))S.fired.push(a);const r=Math.round(snell(a,1,N));S.bad=false;
 S.msg=a?`${a}° in → ${r}° inside → ${a}° out: parallel to the ray that went in, but shifted.`:'0°: along the normal, no bending at either face.';if(S.fired.length===3)A.sound.pop();refresh()}
/* step 5: convex lens */
const lx=()=>A.W*.3,fpx=()=>A.W*LENS[S.lens].f;
function drawLens(){const done=S.lens>=LENS.length,li=Math.min(S.lens,1);title(done?'Parallel rays meet at the principal focus. A fatter lens bends more: shorter focal length.':`Move the screen until the rays make one sharp dot (${LENS[S.lens].t}).`,done);
 const X=lx(),cy=A.H*.5,h=A.H*.16;seg(16,cy,A.W-16,cy,Q0.rule,1);const F=X+A.W*LENS[li].f,fat=li===1;if(done)S.scr=F;
 P.fillStyle=Q0.glass;P.strokeStyle=Q0.navy;P.lineWidth=2;P.beginPath();P.ellipse(X,cy,fat?u(16):u(8),h*1.3,0,0,7);P.fill();P.stroke();
 const sx=S.scr;[-h,0,h].forEach(y0=>{ray(16,cy+y0,X,cy+y0);const yy=cy+y0*(1-(sx-X)/(F-X));seg(X,cy+y0,sx,yy,Q0.beam,3);if(sx<F)arrowAt(X,cy+y0,sx,yy,Q0.beam)});
 put('F',F,cy+u(16),12,Q0.navy);P.fillStyle=Q0.ink;P.fillRect(sx-3,cy-h*1.5,6,h*3);const spot=Math.abs(h*(1-(sx-X)/(F-X)))*2;put(spot<3?'sharp dot':`blur ${Math.round(spot)} px`,Math.min(A.W-50,sx+u(4)),cy-h*1.5-u(10),11,Q0.navy)}
const snapScr=x=>{const X=lx(),st=A.W*.04;return Math.max(X+st,Math.min(A.W-24,X+Math.round((x-X)/st)*st))};
function screenTo(x,final){const v=snapScr(x);if(v!==S.scr){S.scr=v;A.sound.tick()}if(final)focusCheck();else refresh()}
function focusCheck(){if(S.lens>=LENS.length)return;const F=lx()+fpx();
 if(Math.abs(S.scr-F)<A.W*.02){S.lens++;S.scr=lx()+A.W*.5;hit(S.lens===1?'Sharp: the rays cross at the focus. Now try the fat lens.':'The fat lens focuses much closer: shorter focal length.');return refresh()}
 miss(S.scr<F?'The rays have not met yet: move the screen further away.':'The rays crossed and are spreading again: move the screen closer.')}
/* pointer */
let drag=null;
function down(p){const m=stage();drag=null;
 if(m==='mirror'&&p.y<hitPt().y){drag='aim';move(p);return true}
 if(m==='image'&&S.k<DISTS.length&&p.x>mx()){drag='ghost';move(p);return true}
 if(m==='bend'){const j=candEnds().findIndex(e=>Math.hypot(p.x-e.x,p.y-e.y)<u(26));if(j>=0){choose(j);return true}}
 if(m==='block'){const j=BLOCK.findIndex((a,k)=>near(p,chipB(k)));if(j>=0){fire(BLOCK[j]);return true}}
 if(m==='lens'&&S.lens<LENS.length&&p.x>lx()+10){drag='scr';move(p);return true}return false}
function move(p){if(drag==='aim'){const o=hitPt();aim(Math.atan2(o.x-p.x,o.y-p.y)/RAD)}if(drag==='ghost')ghostTo((p.x-mx())/cm());if(drag==='scr')screenTo(p.x)}
function up(){if(drag==='ghost')judge();if(drag==='scr')focusCheck();drag=null}
function draw(){P.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);P.fillRect(0,0,A.W,A.H);if(A.col.dark){P.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);P.fill()}
 const m=stage();if(m==='mirror')drawMirror();if(m==='image')drawImage();if(m==='bend')drawBend();if(m==='block')drawBlock();if(m==='lens')drawLens();
 if(m==='chal')title('Measure from the normal, trace reflected rays back, and know which way light bends.');
 verdict();A.fx.draw(P)}
function refresh(){const m=stage();let s='Challenge.';
 if(m==='mirror')s=`Incidence ${S.i}°, reflection ${S.i}°, angle to the mirror ${90-S.i}°. Star at 50° from the normal.`;
 if(m==='image')s=S.k<DISTS.length?`Candle ${DISTS[S.k]} cm in front of the mirror. Ghost image placed ${S.g} cm behind.`:'Both images placed.';
 if(m==='bend')s=CASES[S.c]?`${CASES[S.c].t}, ${CASES[S.c].i}° to the normal. Paths A, B and C to choose from.`:'All three cases done.';
 if(m==='block')s=`Glass block. Ray in at ${S.ang}°, ${Math.round(snell(S.ang,1,N))}° inside, out at ${S.ang}°. Angles tried: ${S.fired.join(', ')||'none'}.`;
 if(m==='lens')s=S.lens<LENS.length?`${LENS[S.lens].t}: screen ${Math.round((S.scr-lx())/A.W*100)}, focus ${Math.round(LENS[S.lens].f*100)} units from the lens.`:'Both focused.';
 describe((S.msg?S.msg+' ':'')+s);buttons();S.check()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='mirror'){b('Torch: −10° (nearer the normal)',()=>aim(S.i-10));b('Torch: +10° (further from the normal)',()=>aim(S.i+10))}
 if(m==='image'&&S.k<DISTS.length){b('Ghost 5 cm nearer the mirror',()=>ghostTo(S.g-5,1));b('Ghost 5 cm further back',()=>ghostTo(S.g+5,1))}
 if(m==='bend'&&CASES[S.c])['A','B','C'].forEach((n,j)=>b('Path '+n,()=>choose(j)));
 if(m==='block')BLOCK.forEach(a=>b('Fire at '+a+'°',()=>fire(a)));
 if(m==='lens'&&S.lens<LENS.length){b('Screen nearer the lens',()=>screenTo(S.scr-A.W*.04,1));b('Screen further away',()=>screenTo(S.scr+A.W*.04,1))}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const timed=(fs,gap)=>{const id=++S.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===S.run)f()},(j+1)*(A.reduced()?30:gap)))};
const clean=()=>{S.run=(S.run||0)+1;Object.assign(S,{check:()=>{},i:20,k:0,g:10,c:0,pick:null,ang:20,fired:[],lens:0,scr:A.W*.8,msg:'',bad:false})};
const steps=[
{h:'Angles from the normal',p:'The normal is a line at 90° to the mirror where the ray hits. Ray-diagram angles are measured from the normal.',
predict:{q:'A ray meets a mirror at 30° to the mirror surface. What is the angle of incidence?',opts:['60°','30°','90°'],ans:0},
task:'Hit the star',show:()=>{steps[0].go();timed([()=>aim(30),()=>aim(40),()=>aim(50)],380)},go:()=>{clean();refresh();S.check=finish(0,()=>S.i===50,'i = r.')}},
{h:'Where is the image?',p:'Your eye traces reflected rays back in straight lines. The image is where they meet, behind the mirror.',
predict:{q:'A candle is 20 cm in front of a plane mirror. Where is its image?',opts:['20 cm behind the mirror','On the mirror surface','40 cm behind the mirror'],ans:0},
task:'Place both images',show:()=>{steps[1].go();timed([()=>ghostTo(20,1),()=>ghostTo(35,1)],600)},go:()=>{clean();refresh();S.check=finish(1,()=>S.k>=DISTS.length,'Same distance behind.')}},
{h:'Bending at a boundary',p:'Light slows down in glass and speeds up in air. At an angle, that change of speed changes its direction: refraction.',
task:'Choose the path in 3 cases',show:()=>{steps[2].go();timed([0,1,2].map(n=>()=>{const j=candEnds().findIndex(e=>e.tag==='ok');choose(j)}),450)},go:()=>{clean();refresh();S.check=finish(2,()=>S.c>=CASES.length,'Towards, away, straight.')}},
{h:'Through a glass block',p:'Now the ray goes into a block and out the other side.',
predict:{q:'A ray goes through a rectangular glass block. The ray that comes out is…',opts:['parallel to the ray that went in','bent even more than inside','sent back the way it came'],ans:0},
task:'Fire at 3 different angles',show:()=>{steps[3].go();timed([()=>fire(0),()=>fire(40),()=>fire(60)],420)},go:()=>{clean();refresh();S.check=finish(3,()=>S.fired.length>=3,'Out parallel to in.')}},
{h:'Focusing with a convex lens',p:'A convex lens is thicker in the middle. It bends parallel rays to meet at one point: the principal focus.',
predict:{q:'A fatter convex lens focuses parallel light…',opts:['closer to the lens','further from the lens','at the same place'],ans:0},
task:'Focus both lenses',show:()=>{steps[4].go();timed([()=>screenTo(lx()+A.W*LENS[0].f,1),()=>screenTo(lx()+A.W*LENS[1].f,1)],600)},go:()=>{clean();refresh();S.check=finish(4,()=>S.lens>=LENS.length,'Fatter lens, shorter focal length.')}},
{h:'Challenge',p:'',go:()=>{clean();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.check()});
function why(tag){let m='Draw the normal first and measure from it.';
 if(tag==='surface')m='That angle is measured from the mirror surface. Ray-diagram angles are measured from the normal: 90° minus the angle to the surface.';
 if(tag==='double')m='The angle of reflection equals the angle of incidence; it is not the angle between the two rays.';
 if(tag==='wayRound')m='Other way round: light slows in glass and bends towards the normal; it bends away when it speeds up into air.';
 if(tag==='noBend')m='At an angle, a change of speed always changes direction. Only a ray along the normal goes straight on.';
 if(tag==='alongNormal')m='Along the normal the ray meets the boundary square on. It slows down but does not change direction.';
 if(tag==='reflect')m='Most light goes into clear glass, and along the normal it carries straight on.';
 if(tag==='toMirror')m='2 m is the distance to the mirror. The image is another 2 m behind it, so you are 4 m from your image.';
 if(tag==='half')m='The image is not halfway. It is as far behind the mirror as you are in front: 2 m + 2 m = 4 m.';
 if(tag==='realRays')m='No light passes behind a mirror, so lines there are dashed: they show where rays seem to come from.';
 if(tag==='onGlass')m='The image is behind the glass, as far back as the object is in front. Dashed lines show where it is.';
 return m}
function next(){qx++;const [qq,ans,bad]=QS[qx%QS.length],all=[[ans,'ok']].concat(bad),r=qx%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>score(tag,ans)});describe('Challenge: '+qq);A.redraw()}
function score(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){wins++;A.win()}else{wins=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+wins+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;P=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ray diagram lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
