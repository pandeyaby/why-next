/* Flagship – The Doppler effect (ages 16–18; A-level physics: f' = f·v/(v ∓ vs) for a moving source; Δλ/λ ≈ v/c, red-shift). */
(()=>{
const V=340,F0=600;
const CALC=[[600,68,1],[600,68,0],[450,85,0]];        /* f, vs (m/s), listener ahead (1) or behind (0) */
const GAL=[3000,6000,-300],HA=656.3,C=3e5;             /* galaxy speeds in km/s (negative = approaching), H-alpha rest wavelength */
const PICK=[['The source is moving to the right.',2],['A listener on the left hears a higher pitch.',1],['Every listener hears the true pitch.',0],['A listener on the right hears a lower pitch.',1]];
const R=Math.round,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),f1=v=>(Math.round(v*10)/10).toString();
VIS.reg('flagdopp',c=>{let A,g,pad,chal,qi=-1,ep=0;
const S={};
const INK='#0f172a',OK='#047857',NO='#be123c',RING='#4338ca',SRC='#b45309',CARD='#ffffff',RIM='#64748b';
const z=v=>R(v*(A.narrow?.94:1.05)),fo=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`;
const part=()=>['wave','calc','siren','red','read','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const LEN={calc:CALC.length,red:GAL.length,read:PICK.length,wave:1,siren:1},over=k=>S[k].n>=LEN[k];
const pen=()=>A.col.dark?'#e2e8f0':INK;
function bg(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tx(n,w,al){g.font=fo(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function card(r,t,o){o=o||{};g.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.rim?3.5:1.3;g.strokeStyle=o.rim||RIM;g.stroke();if(t!=null){g.fillStyle=o.fg||INK;tx(o.n||16,o.w||750);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-10)}}
function top(t,won){tx(14,800);const w=Math.min(A.W-8,g.measureText(t).width+24),h=z(14)+14,y=A.H*.025;card({x:A.W/2-w/2,y,w,h},null,{bg:won?'#d1fae5':CARD,rim:won?OK:null});g.fillStyle=INK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function line(t,y,n,col){g.fillStyle=col||pen();tx(n||14,650);g.fillText(t,A.W/2,y,A.W-16)}
function fin(t,L){bg();top(t,1);L.forEach((s,i)=>line(s,A.H*(.25+i*.15),16))}
function you(x,y){g.fillStyle=OK;g.beginPath();g.arc(x,y,z(8),0,7);g.fill();g.fillStyle=pen();tx(11,800);g.fillText('you',x,y+z(17))}
function track(y){return{x:z(28),y,w:A.W-z(56),h:z(26)}}
function slider(T,u,bad,lab){g.fillStyle='#e0e7ff';A.paint.rrect(T.x,T.y,T.w,T.h,12);g.fill();g.strokeStyle=bad?NO:RIM;g.lineWidth=bad?3:1.2;g.stroke();
 const x=T.x+u*T.w;g.fillStyle=RING;g.beginPath();g.arc(x,T.y+T.h/2,z(14),0,7);g.fill();g.strokeStyle=CARD;g.lineWidth=2.5;g.stroke();g.fillStyle=pen();tx(12,700,'left');g.fillText(lab,T.x,T.y-z(11))}
/* wavefront snapshot: source at (x,y) now, speed ratio r = vs/v to the right, spacing L px, n rings, inside clip box */
function rings(x,y,r,L,n,box,dir){g.save();g.beginPath();g.rect(box.x,box.y,box.w,box.h);g.clip();g.strokeStyle=RING;g.lineWidth=2;
 for(let k=1;k<=n;k++){g.globalAlpha=1-k/(n+2);g.beginPath();g.arc(x-(dir||1)*r*k*L,y,k*L,0,7);g.stroke()}g.globalAlpha=1;g.fillStyle=SRC;g.beginPath();g.arc(x,y,z(9),0,7);g.fill();g.restore()}
/* step 1: bunched ahead, stretched behind */
function drawWave(){const s=S.wave;bg();if(over('wave'))return fin('Speed 0.5 v: gap ahead halved',['λ ahead = λ₀(1 − vs/v) = 0.5 λ₀','λ behind = λ₀(1 + vs/v) = 1.5 λ₀','wave speed v is the same both ways']);
 top('Drag the source speed: make the gap ahead half of λ₀');const box={x:8,y:A.H*.12,w:A.W-16,h:A.H*.55};g.fillStyle=A.col.dark?'#111827':'#fff';g.fillRect(box.x,box.y,box.w,box.h);
 const r=s.r,L=Math.min(box.w,box.h)*.13,x=box.x+box.w*.62,y=box.y+box.h/2;rings(x,y,r,L,7,box);
 g.strokeStyle=SRC;g.lineWidth=3;g.beginPath();g.moveTo(x+z(12),y);g.lineTo(x+z(12)+r*z(60),y);g.stroke();
 line(`ahead: λ = ${(1-r).toFixed(2)} λ₀ · f = ${R(F0/(1-r))} Hz`,A.H*.72,13,OK);line(`behind: λ = ${(1+r).toFixed(2)} λ₀ · f = ${R(F0/(1+r))} Hz`,A.H*.77,13,SRC);
 slider(track(A.H*.86),r/.8,s.bad,`vs = ${r.toFixed(2)} v   (source emits ${F0} Hz)`)}
function setR(v){S.wave.r=cl(Math.round(v*20)/20,0,.8);A.redraw()}
function checkWave(){const s=S.wave;if(over('wave'))return;let m;if(Math.abs(s.r-.5)<.01){s.n=1;s.bad=0;A.sound.pop();return speak('vs = 0.5 v: each new wavefront starts half a wavelength nearer the last one, so λ ahead = 0.5 λ₀ and f doubles. Behind, λ = 1.5 λ₀.')}
 s.bad=1;A.sound.miss();m=s.r<.5?`At ${s.r.toFixed(2)} v the gap ahead is ${(1-s.r).toFixed(2)} λ₀. Faster: the source must catch up half a wavelength each period.`:`At ${s.r.toFixed(2)} v the gap ahead is only ${(1-s.r).toFixed(2)} λ₀. Slow down.`;speak(m)}
/* step 2: the formula, with three tempting wrong answers */
const fmtHz=v=>(Math.round(v*10)/10)+' Hz';
function answers(){const [f,vs,ahead]=CALC[S.calc.n],ok=f*V/(V+(ahead?-vs:vs)),swap=f*V/(V+(ahead?vs:-vs)),spd=ahead?f*(V+vs)/V:f*(V-vs)/V;return [[ok,0],[swap,1],[spd,2]]}
function cboxes(){const n=3,gp=10,h=z(56),w=A.W-28,r=S.calc.n%3;return [0,1,2].map(j=>({x:14,y:A.H*.42+((j+r)%3)*(h+gp),w,h,j}))}
function drawCalc(){const s=S.calc;bg();if(over('calc'))return fin('All 3 frequencies found',["approaching: f' = f·v/(v − vs)","receding: f' = f·v/(v + vs)",'v stays 340 m/s']);
 const [f,vs,ahead]=CALC[s.n];top(`Listener ${s.n+1} of 3: what frequency is heard?`);line(`source ${f} Hz, moving at ${vs} m/s ${ahead?'towards':'away from'} the listener`,A.H*.14,14);line('speed of sound v = 340 m/s',A.H*.2,13);
 const box={x:8,y:A.H*.24,w:A.W-16,h:A.H*.15};rings(box.x+box.w*(ahead?.4:.6),box.y+box.h/2,vs/V,box.h*.22,6,box,ahead?1:-1);you(box.x+box.w-z(18),box.y+box.h/2-z(6));
 const A2=answers();cboxes().forEach(r=>card(r,fmtHz(A2[r.j][0]),{n:18,rim:s.bad===r.j?NO:null,bg:s.bad===r.j?'#ffe4e6':CARD}))}
function choose(j){const s=S.calc;if(over('calc'))return;const [f,vs,ahead]=CALC[s.n];let m;
 if(!j){s.n++;s.bad=null;A.sound.pop();return speak(`f' = ${f} × 340 ÷ (340 ${ahead?'−':'+'} ${vs}) = ${fmtHz(f*V/(V+(ahead?-vs:vs)))}.`)}
 s.bad=j;A.sound.miss();
 if(j===1)m=`That is the ${ahead?'receding':'approaching'} answer. ${ahead?'Approaching squashes λ, so divide by v − vs: the pitch goes up.':'Moving away stretches λ, so divide by v + vs: the pitch goes down.'}`;
 else m=`That treats the sound as travelling at ${ahead?'v + vs':'v − vs'}. The wave speed stays 340 m/s; the source changes λ, not v.`;speak(m)}
/* step 3: a passing siren heard from beside the road */
const SV=30,SF=700,DIST=60;
const heard=x=>{const dx=-x,cs=dx/Math.hypot(dx,DIST);return SF*V/(V-SV*cs)};
function drawSiren(){const s=S.siren;bg();if(over('siren'))return fin('True pitch when it is level with you',['approaching: above 700 Hz','level with you: exactly 700 Hz','moving away: below 700 Hz']);
 top('Drag the ambulance: where do you hear exactly 700 Hz?');const ry=A.H*.2,X=x=>A.W/2+x/220*(A.W/2-z(20));
 g.fillStyle=A.col.dark?'#334155':'#cbd5e1';g.fillRect(0,ry-z(14),A.W,z(28));g.fillStyle=SRC;A.paint.rrect(X(s.x)-z(18),ry-z(10),z(36),z(20),5);g.fill();g.fillStyle=CARD;tx(11,800);g.fillText('→',X(s.x),ry+1);
 you(A.W/2,ry+z(40));g.strokeStyle=RIM;g.setLineDash([4,4]);g.lineWidth=1.2;g.beginPath();g.moveTo(X(s.x),ry);g.lineTo(A.W/2,ry+z(32));g.stroke();g.setLineDash([]);
 const gx={x:z(36),y:A.H*.36,w:A.W-z(50),h:A.H*.36},Y=f=>gx.y+gx.h-(f-630)/140*gx.h;g.strokeStyle=RIM;g.lineWidth=1;g.strokeRect(gx.x,gx.y,gx.w,gx.h);
 g.fillStyle=pen();tx(11,600,'right');[650,700,750].forEach(f=>{g.fillText(f,gx.x-4,Y(f));g.globalAlpha=.3;g.beginPath();g.moveTo(gx.x,Y(f));g.lineTo(gx.x+gx.w,Y(f));g.stroke();g.globalAlpha=1});
 g.save();g.beginPath();g.rect(gx.x,gx.y,gx.w,gx.h);g.clip();g.strokeStyle=RING;g.lineWidth=3;g.beginPath();for(let x=-200;x<=200;x+=4){const px=gx.x+(x+200)/400*gx.w;g.lineTo(px,Y(heard(x)))}g.stroke();
 const px=gx.x+(s.x+200)/400*gx.w;g.fillStyle=SRC;g.beginPath();g.arc(px,Y(heard(s.x)),z(7),0,7);g.fill();g.restore();
 line(`heard: ${f1(heard(s.x))} Hz   (siren ${SF} Hz, ${SV} m/s)`,A.H*.77,14,s.bad?NO:pen());slider(track(A.H*.86),(s.x+200)/400,s.bad,`ambulance ${s.x<0?-s.x+' m before':s.x>0?s.x+' m past':'level with'} you`)}
function setX(x){S.siren.x=cl(Math.round(x/5)*5,-200,200);A.redraw()}
function checkSiren(){const s=S.siren;if(over('siren'))return;let m;if(!s.x){s.n=1;s.bad=0;A.sound.pop();return speak('Level with you the ambulance moves across your line of sight, not towards you, so you hear the true 700 Hz. The fall is smooth because only the part of its velocity towards you counts.')}
 s.bad=1;A.sound.miss();m=s.x<0?`${f1(heard(s.x))} Hz is still above 700: part of its velocity is towards you, so waves are squashed.`:`${f1(heard(s.x))} Hz is below 700: it is already moving away, so waves are stretched.`;speak(m)}
/* step 4: match a galaxy's spectrum */
const lam=v=>HA*(1+v/C),LX=l=>{const a=z(16);return a+(l-645)/30*(A.W-2*a)};
function strip(y,l,lab){const a=z(16),w=A.W-2*a,h=z(40);for(let i=0;i<w;i+=2){const L=645+i/w*30;g.fillStyle=`hsl(${cl(40-(L-645)*1.4,0,40)},90%,${A.col.dark?45:55}%)`;g.fillRect(a+i,y,2,h)}
 g.fillStyle='#000';g.fillRect(LX(l)-2,y,4,h);g.fillStyle=pen();tx(12,700,'left');g.fillText(lab,a,y-z(10))}
function drawRed(){const s=S.red;bg();if(over('red'))return fin('All 3 galaxies measured',GAL.map(v=>`${v>0?'receding':'approaching'} ${Math.abs(v)} km/s → ${f1(lam(v))} nm`));
 const v=GAL[s.n];top(`Galaxy ${s.n+1} of 3: match its hydrogen line`);strip(A.H*.18,lam(v),`galaxy: line at ${f1(lam(v))} nm`);strip(A.H*.36,lam(s.v),`your model: ${s.v} km/s → ${f1(lam(s.v))} nm`);
 g.strokeStyle=pen();g.setLineDash([5,4]);g.lineWidth=1.5;g.beginPath();g.moveTo(LX(HA),A.H*.15);g.lineTo(LX(HA),A.H*.36+z(44));g.stroke();g.setLineDash([]);line(`lab (rest) line ${HA} nm`,A.H*.36+z(56),12);
 g.fillStyle=pen();tx(11,600);[650,660,670].forEach(l=>g.fillText(l,LX(l),A.H*.36+z(74)));line('Δλ/λ ≈ v/c,  c = 300 000 km/s',A.H*.68,14);slider(track(A.H*.86),(s.v+3000)/12000,s.bad,'model speed: drag (negative = approaching)')}
function setV(v){S.red.v=cl(Math.round(v/100)*100,-3000,9000);A.redraw()}
function checkRed(){const s=S.red;if(over('red'))return;const v=GAL[s.n];let m;
 if(s.v===v){s.n++;s.bad=0;s.v=0;A.sound.pop();return speak(`${Math.abs(v)} km/s ${v>0?'away: red-shift, longer λ':'towards us: blue-shift, shorter λ'}. Δλ = ${f1(lam(v)-HA)} nm = ${HA} × ${v}/300000.`)}
 s.bad=1;A.sound.miss();if(s.v===-v&&v)m=`Right size, wrong way: ${v>0?'a galaxy moving away shifts lines to longer λ (red)':'a galaxy moving towards us shifts lines to shorter λ (blue)'}.`;
 else m=`Your line is at ${f1(lam(s.v))} nm; the galaxy's is at ${f1(lam(v))} nm. Δλ/λ = v/c: ${lam(s.v)<lam(v)?'more':'less'} speed away.`;speak(m)}
/* step 5: read wavefront diagrams */
function panels(){const gp=8,w=(A.W-20-2*gp)/3,h=Math.min(w*1.1,A.H*.42),r=S.read.n%3;return [0,1,2].map(j=>({x:10+((j+r)%3)*(w+gp),y:A.H*.36,w,h,j}))}
function drawRead(){const s=S.read;bg();if(over('read'))return fin('All 4 read',['bunched side: source moving that way, higher f','stretched side: lower f','one centre: source still']);
 top(`Diagram ${s.n+1} of 4: tap the one that fits`);card({x:10,y:A.H*.14,w:A.W-20,h:z(50)},PICK[s.n][0],{bg:'#fef3c7',fg:'#78350f',n:15});
 panels().forEach(p=>{card(p,null,{rim:s.bad===p.j?NO:null});rings(p.x+p.w/2,p.y+p.h/2,[0,.45,.45][p.j],p.w*.075,5,p,p.j===1?-1:1)})}
const KIND=['still: one centre','moving left','moving right'];
function read(j){const s=S.read;if(over('read'))return;const want=PICK[s.n][1];let m;if(j===want){s.n++;s.bad=null;A.sound.pop();return speak(`Yes: ${KIND[j]}.`)}
 s.bad=j;A.sound.miss();m=j===0?'Those rings share one centre, so that source is not moving and every listener hears the true pitch.':`That source is ${KIND[j]}: its rings bunch on the ${j===1?'left':'right'}, where the pitch is higher, and stretch on the ${j===1?'right':'left'}.`;speak(m)}
/* input */
function down(p){const m=part();if(m==='calc'&&!over('calc')){const r=cboxes().find(r=>hit(p,r));if(r)choose(r.j);return false}
 if(m==='read'&&!over('read')){const r=panels().find(r=>hit(p,r));if(r)read(r.j);return false}
 if(['wave','siren','red'].includes(m)&&!over(m)){S.hold=1;move(p);return true}return false}
function move(p){if(!S.hold)return;const m=part(),T=track(0),u=cl((p.x-T.x)/T.w,0,1);if(m==='wave')setR(u*.8);if(m==='siren')setX(u*400-200);if(m==='red')setV(u*12000-3000)}
function up(){if(!S.hold)return;S.hold=0;({wave:checkWave,siren:checkSiren,red:checkRed})[part()]()}
function reset(){ep++;for(const k in S)delete S[k];Object.assign(S,{wave:{n:0,r:.2},calc:{n:0},siren:{n:0,x:-150},red:{n:0,v:0},read:{n:0},hold:0,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
function begin(i,first,ok,msg){reset();speak(first);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=ep;acts.forEach((f,j)=>setTimeout(()=>{if(me===ep)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const m=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='wave'&&!over('wave')){b('slower',()=>setR(S.wave.r-.05),'Source slower by 0.05 v');b('faster',()=>setR(S.wave.r+.05),'Source faster by 0.05 v');b('Check',checkWave,'Check the source speed')}
 if(m==='calc'&&!over('calc'))cboxes().sort((x,y)=>x.y-y.y).forEach(r=>b(fmtHz(answers()[r.j][0]),()=>choose(r.j),'Heard frequency '+fmtHz(answers()[r.j][0])));
 if(m==='siren'&&!over('siren')){b('← 20 m',()=>setX(S.siren.x-20),'Move the ambulance back 20 metres');b('← 5 m',()=>setX(S.siren.x-5),'Move the ambulance back 5 metres');b('5 m →',()=>setX(S.siren.x+5),'Move the ambulance on 5 metres');b('20 m →',()=>setX(S.siren.x+20),'Move the ambulance on 20 metres');b('Check',checkSiren,'Check: true pitch here')}
 if(m==='red'&&!over('red')){[-1000,-100,100,1000].forEach(d=>b((d>0?'+':'−')+Math.abs(d),()=>setV(S.red.v+d),`Model speed ${d>0?'plus':'minus'} ${Math.abs(d)} km/s`));b('Check',checkRed,'Check the match')}
 if(m==='read'&&!over('read'))panels().sort((x,y)=>x.x-y.x).forEach(p=>b(KIND[p.j],()=>read(p.j),'Diagram: source '+KIND[p.j]))}
const steps=[
{h:'Bunched ahead, stretched behind',p:'Each wavefront spreads out from where the source was when it was made. A moving source chases its own waves, so they bunch up ahead and spread out behind.',
predict:{q:'The source moves right. Where are the wavefronts closest together?',opts:['behind it, on the left','ahead of it, on the right'],ans:1},task:'Make the gap ahead half of λ₀',
show:()=>play(0,[()=>{setR(.5);checkWave()}],500),go:()=>begin(0,'Drag the speed until the gap ahead is half the normal wavelength.',()=>over('wave'),'Shorter λ ahead means higher f ahead.')},
{h:'The formula',p:"The wave still travels at v through the air, so a shorter wavelength means a higher frequency: f' = f·v/(v − vs) when the source approaches, and f·v/(v + vs) when it moves away.",
predict:{q:'Ahead of a moving source, how fast does its sound travel?',opts:['faster: v + vs','at v, the same as behind'],ans:1},task:'Find all 3 frequencies',
show:()=>play(1,CALC.map(()=>()=>choose(0)),600),go:()=>begin(1,'Tap the frequency the listener hears.',()=>over('calc'),'Approaching: v − vs. Receding: v + vs.')},
{h:'A passing siren',p:'You stand beside a road. Only the part of the velocity along your line of sight counts, so the pitch falls smoothly as the ambulance passes.',
predict:{q:'As an ambulance comes towards you and passes, the pitch you hear…',opts:['gets higher as it gets closer','is high, then falls as it passes'],ans:1},task:'Find where you hear 700 Hz',
show:()=>play(2,[()=>{setX(0);checkSiren()}],500),go:()=>begin(2,'Drag the ambulance and watch the pitch graph.',()=>over('siren'),'True pitch when there is no motion towards you.')},
{h:'Red-shift',p:'Light shows the same effect. A galaxy moving away stretches its light, so its spectral lines move to longer wavelengths: red-shift. For v much less than c, Δλ/λ ≈ v/c.',
predict:{q:'A galaxy is moving away from us. Its lines shift towards…',opts:['shorter wavelengths (blue)','longer wavelengths (red)'],ans:1},task:'Measure all 3 galaxies',
show:()=>play(3,GAL.map(v=>()=>{setV(v);checkRed()}),600),go:()=>begin(3,'Drag the model speed until the two lines match.',()=>over('red'),'Away: red-shift. Towards: blue-shift.')},
{h:'Read the wavefronts',p:'In a wavefront diagram the centres of the rings show where the source has been. Bunched rings are on the side it is moving towards.',task:'Read all 4 diagrams',
show:()=>play(4,PICK.map(q=>()=>read(q[1])),500),go:()=>begin(4,'Tap the diagram that fits the sentence.',()=>over('read'),'Bunched = towards = higher pitch.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:"A 500 Hz source moves towards you at 40 m/s (v = 340 m/s). What do you hear?",a:'about 567 Hz',o:[['about 447 Hz','That is the receding value. Approaching uses v − vs: 500 × 340/300.'],['about 559 Hz','That uses (v + vs)/v, as if the sound sped up. Use v/(v − vs).']]},
{q:'Why does a siren drop in pitch as it passes?',a:'its waves reach you stretched once it moves away',o:[['it gets quieter','Loudness and pitch are different. Pitch depends on frequency.'],['the sound slows down behind it','The speed of sound in the air stays the same; the wavelength changes.']]},
{q:'A line at 500.0 nm is seen at 505.0 nm from a galaxy. Roughly how fast is it moving?',a:'3000 km/s away',o:[['3000 km/s towards us','Longer wavelength means red-shift: moving away.'],['5 km/s away','Use Δλ/λ = v/c: 5/500 × 300 000 = 3000 km/s.']]},
{q:'Where do you hear the true siren pitch?',a:'when it is level with you',o:[['just before it reaches you','Before it is level, part of its velocity is still towards you.'],['never','When it is level, its velocity is across your line of sight, so f is unchanged.']]},
{q:'Which wavefront pattern shows a source moving left?',a:'rings bunched on the left',o:[['rings bunched on the right','Rings bunch on the side the source moves towards.'],['rings with one centre','One centre means the source is still.']]}];
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,0],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(m,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb');if(!m)A.win();else A.sound.miss();
 fb.innerHTML=(!m?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(!m?'Yes.':m)}
function draw(){const m=part();if(m==='quiz'){bg();top('Challenge',1);line("f' = f·v/(v ∓ vs)   ·   Δλ/λ ≈ v/c",A.H*.5,17);return}
 ({wave:drawWave,calc:drawCalc,siren:drawSiren,red:drawRed,read:drawRead})[m]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Doppler buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
