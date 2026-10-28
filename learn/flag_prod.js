/* Flagship – the product rule (ages 17–18): grow a u-by-v rectangle and watch the two strips (u·Δv and v·Δu) swamp the
   tiny corner as h shrinks; test the tempting u′v′ against the true slope of x²·x³; build d(x²eˣ)/dx card by card and
   factorise it; slide a tangent along y = x sin x to find where it is flat; then differentiate x³ ln x, factorise and
   solve dy/dx = 0. */
(()=>{const E=Math.exp,S=Math.sin,Co=Math.cos,f2=x=>{const r=Math.round(x*100)/100;return(r<0?'−':'')+Math.abs(r)},cl=(v,a,b)=>Math.max(a,Math.min(b,v));
 const BUILD=[{q:'u = x², so u′ = ?',o:[['2x',''],['x','Power rule: bring the 2 down and drop the power by one, so u′ = 2x.'],['2','Bring the 2 down but keep an x: u′ = 2x¹ = 2x.']]},
  {q:'v = eˣ, so v′ = ?',o:[['x·eˣ⁻¹','The power rule is for xⁿ. eˣ has x in the power, and its derivative is eˣ itself.'],['eˣ',''],['0','eˣ is not a constant; it grows, so its slope is not 0.']]},
  {q:'dy/dx = u v′ + v u′ = ?',o:[['2x·eˣ','That is only u′v′. The rule has two terms: u v′ + v u′.'],['2x + eˣ','You differentiated each factor and added. For a product use u v′ + v u′.'],['x²eˣ + 2x eˣ','']]},
  {q:'Factorise x²eˣ + 2x eˣ',o:[['x eˣ(x + 2)',''],['eˣ(x + 2)','Both terms share an x as well as eˣ: x eˣ(x + 2).'],['x²eˣ(2x)','Factorising pulls out what both terms share; this multiplies them instead.']]}];
 const LN=[{q:'y = x³ ln x. dy/dx = ?',o:[['3x²·(1/x) = 3x','That is u′v′ only. Use u v′ + v u′ = x³·(1/x) + ln x·3x².'],['3x² ln x + x²',''],['3x² ln x','You dropped u v′ = x³·(1/x) = x².']]},
  {q:'Factorise 3x² ln x + x²',o:[['3x²(ln x + 1)','3x² does not go into x² a whole number of times. Take out x²: x²(3 ln x + 1).'],['x²(3 ln x + 1)',''],['x³(3 ln x + 1)','x³ is not a factor of x². Take out x².']]},
  {q:'dy/dx = 0 with x > 0 when…',o:[['x = 0','ln x is not defined at 0, and x > 0 here. Set 3 ln x + 1 = 0.'],['x = 1/3','ln x = −1/3, so undo ln with e: x = e^(−1/3).'],['x = e^(−1/3) ≈ 0.72','']]}];
VIS.reg('flagprod',c=>{let A,pad,quiz;
 const K={h:1.2,x:1.5,seen:{},b:0,miss:-1,t:.8,flat:0,drag:null,gen:0,want:()=>{}};
 const st=()=>['area','test','build','tan','ln','quiz'][A.step];
 const fz=(n,w)=>`${w||700} ${Math.round(n*(A.narrow?1:1.15))}px system-ui,sans-serif`;
 function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 function txt(g,t,x,y,n,col,w,al){g.font=fz(n,w);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
 const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const gR=()=>A.narrow?{x:6,y:6,w:A.W-12,h:A.H*.55}:{x:6,y:6,w:A.W*.56,h:A.H-12};
 const pR=()=>A.narrow?{x:6,y:A.H*.57,w:A.W-12,h:A.H*.43-6}:{x:A.W*.58+4,y:6,w:A.W*.42-14,h:A.H-12};
 const VIEW={area:[0,5,0,4],test:[0,3.2,0,420],build:[-4.5,1,-1,3],tan:[0,3.4,-2,3],ln:[0,1.7,-.3,1.4]};
 function M(){const r=gR(),[a,b,c0,d]=VIEW[st()],sx=(r.w-24)/(b-a),sy=(r.h-24)/(d-c0);return{X:x=>r.x+12+(x-a)*sx,Y:y=>r.y+r.h-12-(y-c0)*sy,ix:px=>a+(px-r.x-12)/sx,sx,sy}}
 function axes(g,m){const C=A.col,r=gR(),[a,b,c0,d]=VIEW[st()];g.fillStyle=A.alpha(C.mu,.07);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();
  g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=1.5;g.beginPath();const y0=m.Y(cl(0,c0,d)),x0=m.X(cl(0,a,b));g.moveTo(r.x,y0);g.lineTo(r.x+r.w,y0);g.moveTo(x0,r.y);g.lineTo(x0,r.y+r.h);g.stroke()}
 function curve(g,m,f,a,b,col,w,dash){const r=gR();g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.strokeStyle=col;g.lineWidth=w||3;if(dash)g.setLineDash(dash);g.beginPath();
  for(let i=0;i<=180;i++){const x=a+(b-a)*i/180,y=f(x);i?g.lineTo(m.X(x),m.Y(y)):g.moveTo(m.X(x),m.Y(y))}g.stroke();g.restore()}
 const trR=()=>{const p=pR();return{x:p.x+18,y:p.y+p.h-46,w:p.w-36,h:30}};
 function slider(g,v,lo,hi,lab,marks){const C=A.col,r=trR(),X=t=>r.x+(t-lo)/(hi-lo)*r.w,yy=r.y+r.h/2;g.strokeStyle=A.alpha(C.tx,.6);g.lineWidth=3;g.beginPath();g.moveTo(r.x,yy);g.lineTo(r.x+r.w,yy);g.stroke();
  (marks||[]).forEach(([t,l])=>{g.lineWidth=1.5;g.beginPath();g.moveTo(X(t),yy-6);g.lineTo(X(t),yy+6);g.stroke();txt(g,l,X(t),yy+16,10,C.tx,600)});A.paint.ball(X(v),yy,11,C.or);txt(g,lab,r.x,r.y-8,11,C.tx,800,'left')}
 const sval=(p,lo,hi)=>{const r=trR();return lo+cl((p.x-r.x)/r.w,0,1)*(hi-lo)};
 const cR=j=>{const p=pR(),h=Math.min(40,p.h*.17);return{x:p.x+8,y:p.y+p.h*.4+j*(h+7),w:p.w-16,h}};
 function cards(g,set){const C=A.col,p=pR();if(K.b>=set.length)return;const s=set[K.b];txt(g,s.q,p.x+p.w/2,p.y+p.h*.3,12,C.tx,800);
  s.o.forEach(([t],j)=>{const r=cR(j),bad=K.miss===j;g.fillStyle=A.alpha(bad?C.rd:C.cy,.14);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=bad?3:1.5;g.stroke();txt(g,t,r.x+r.w/2,r.y+r.h/2,14,C.tx,800)})}
 const corner=()=>.5*K.h/(3.5+.5*K.h);
 function areaV(g){const C=A.col,r=gR(),p=pR(),m=M(),u=3,v=2,du=K.h,dv=.5*K.h,X0=m.X(0),Y0=m.Y(0);
  const rect=(x,y,w,h,col,a)=>{g.fillStyle=A.alpha(col,a);g.fillRect(m.X(x),m.Y(y+h),w*m.sx,h*m.sy);g.strokeStyle=col;g.lineWidth=1.5;g.strokeRect(m.X(x),m.Y(y+h),w*m.sx,h*m.sy)};
  g.fillStyle=A.alpha(C.mu,.07);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();rect(0,0,u,v,C.cy,.25);rect(u,0,du,v,C.am,.4);rect(0,v,u,dv,C.vi,.4);rect(u,v,du,dv,C.rd,.6);
  txt(g,'uv',m.X(u/2),m.Y(v/2),15,C.tx,800);txt(g,'v·Δu',m.X(u+du/2),m.Y(v/2),11,C.tx,800);txt(g,'u·Δv',m.X(u/2),m.Y(v+dv/2),11,C.tx,800);
  txt(g,'u = 3 (grows at 1),  v = 2 (grows at 0.5)',X0+6,m.Y(3.7),11,C.tx,700,'left');
  const ex=u*dv+v*du+du*dv;txt(g,'ΔA = u·Δv + v·Δu + Δu·Δv',p.x+p.w/2,p.y+16,12,C.tx,800);
  txt(g,`${f2(u*dv)} + ${f2(v*du)} + ${f2(du*dv)} = ${f2(ex)}`,p.x+p.w/2,p.y+p.h*.2,13,C.tx,700);
  txt(g,`ΔA ÷ h = ${f2(ex/K.h)}   (u v′ + v u′ = 3.5)`,p.x+p.w/2,p.y+p.h*.36,13,C.gr,800);
  txt(g,`corner = ${(corner()*100).toFixed(1)}% of ΔA`,p.x+p.w/2,p.y+p.h*.52,13,corner()<.03?C.gr:C.rd,800);slider(g,K.h,0,1.5,'h (drag)',[[0,'0'],[.5,'0.5'],[1,'1'],[1.5,'1.5']])}
 function testV(g){const C=A.col,p=pR(),m=M(),x=K.x;axes(g,m);const bw=Math.min(36,gR().w/8);
  [[5*x**4,C.gr,'true'],[6*x**3,C.rd,'u′v′'],[3*x**4+2*x**4,C.cy,'uv′+vu′']].forEach(([val,col,l],i)=>{const bx=m.X(.6+i*.9);g.fillStyle=A.alpha(col,.55);const top=m.Y(Math.min(val,420));g.fillRect(bx-bw/2,top,bw,m.Y(0)-top);txt(g,l,bx,m.Y(0)-10,10,C.tx,800);txt(g,f2(val),bx,top-10,11,C.tx,800)});
  txt(g,'y = x²·x³ = x⁵',p.x+p.w/2,p.y+16,13,C.tx,800);txt(g,`at x = ${f2(x)}: true slope 5x⁴ = ${f2(5*x**4)}`,p.x+p.w/2,p.y+p.h*.22,12,C.gr,800);
  txt(g,`u′v′ = 2x·3x² = ${f2(6*x**3)}`,p.x+p.w/2,p.y+p.h*.36,12,C.rd,700);txt(g,`checked x = 1, 2, 3: ${Object.keys(K.seen).length} of 3`,p.x+p.w/2,p.y+p.h*.5,11,C.tx,700);
  slider(g,x,.5,3,'x (drag)',[[1,'1'],[2,'2'],[3,'3']])}
 function buildV(g){const C=A.col,p=pR(),m=M();axes(g,m);curve(g,m,x=>x*x*E(x),-4.5,1,C.ac,3);if(K.b>=4){curve(g,m,x=>x*E(x)*(x+2),-4.5,1,C.gr,2.5,[7,5]);
   [[0,0],[-2,4*E(-2)]].forEach(([x,y])=>{g.fillStyle=C.or;g.beginPath();g.arc(m.X(x),m.Y(y),6,0,7);g.fill()});txt(g,'dy/dx = 0 at x = 0 and x = −2',p.x+p.w/2,p.y+p.h*.55,12,C.tx,700)}
  txt(g,'y = x²eˣ    u = x², v = eˣ',p.x+p.w/2,p.y+16,13,C.tx,800);txt(g,['','u′ = 2x','… v′ = eˣ','dy/dx = x²eˣ + 2x eˣ','= x eˣ(x + 2) ✓'][K.b],p.x+p.w/2,p.y+p.h*.16,13,C.gr,800);cards(g,BUILD)}
 const yt=x=>x*S(x),mt=x=>S(x)+x*Co(x);
 function tanV(g){const C=A.col,p=pR(),m=M(),x=K.t,y=yt(x),s=mt(x);axes(g,m);curve(g,m,yt,0,3.4,C.ac,3);curve(g,m,X=>y+Co(x)*(X-x),x-.8,x+.8,A.alpha(C.rd,.9),2,[6,5]);curve(g,m,X=>y+s*(X-x),x-1,x+1,C.gr,3);
  A.paint.ball(m.X(x),m.Y(y),9,C.or);txt(g,'y = x sin x',p.x+p.w/2,p.y+16,13,C.tx,800);txt(g,`x = ${f2(x)}   slope = sin x + x cos x = ${f2(s)}`,p.x+p.w/2,p.y+p.h*.2,12,Math.abs(s)<.25?C.gr:C.tx,800);
  txt(g,`dashed red: u′v′ = cos x = ${f2(Co(x))}  (wrong)`,p.x+p.w/2,p.y+p.h*.34,11,C.tx,700);txt(g,K.flat?'Flat! sin x + x cos x = 0 (tan x = −x)':'Find the flat tangent between 1 and 3',p.x+p.w/2,p.y+p.h*.48,12,K.flat?C.gr:C.tx,800);
  slider(g,x,0,3.4,'x (drag the point or this)',[[1,'1'],[2,'2'],[3,'3']])}
 function lnV(g){const C=A.col,p=pR(),m=M();axes(g,m);curve(g,m,x=>x**3*Math.log(x),.01,1.7,C.ac,3);if(K.b>=3){const x=E(-1/3);g.fillStyle=C.or;g.beginPath();g.arc(m.X(x),m.Y(x**3*Math.log(x)),7,0,7);g.fill();txt(g,'minimum at x ≈ 0.72',m.X(x),m.Y(x**3*Math.log(x))-18,11,C.tx,800)}
  txt(g,'y = x³ ln x   (x > 0)',p.x+p.w/2,p.y+16,13,C.tx,800);txt(g,['','dy/dx = 3x² ln x + x²','= x²(3 ln x + 1)','x = e^(−1/3) ✓'][K.b],p.x+p.w/2,p.y+p.h*.16,13,C.gr,800);cards(g,LN)}
 function draw(A){const{ctx:g,W,H,col:C}=A,s=st();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);
  if(s==='quiz'){txt(g,'(uv)′ = u v′ + v u′',W/2,H/2,22,C.tx,800);return}({area:areaV,test:testV,build:buildV,tan:tanV,ln:lnV})[s](g);A.fx.draw(g)}
 function setH(h){K.h=cl(h,.02,1.5);status()}
 function setX(x){K.x=cl(x,.5,3);for(const k of[1,2,3])if(Math.abs(K.x-k)<.06){K.x=k;if(!K.seen[k]){K.seen[k]=1;A.sound.pop()}}status()}
 function setT(x){K.t=cl(x,0,3.4);if(!K.flat&&K.t>1&&K.t<3&&Math.abs(mt(K.t))<.25){K.flat=1;A.sound.pop()}status()}
 function pick(set,j){if(K.b>=set.length)return;const o=set[K.b].o[j];if(o[1]){K.miss=j;A.sound.miss();tell(o[1]);A.redraw();return}K.miss=-1;K.b++;A.sound.pop();status(o[0]+' ✓')}
 function status(pre){const s=st();let t='';
  if(s==='area')t=`h = ${f2(K.h)}. Corner is ${(corner()*100).toFixed(1)}% of the extra area; ΔA ÷ h = ${f2((3*.5*K.h+2*K.h+.5*K.h*K.h)/K.h)}.`;
  if(s==='test')t=`x = ${f2(K.x)}: true slope ${f2(5*K.x**4)}, u′v′ gives ${f2(6*K.x**3)}. Checked ${Object.keys(K.seen).length} of 3.`;
  if(s==='build')t=K.b<4?BUILD[K.b].q:'dy/dx = x eˣ(x + 2), zero at x = 0 and x = −2.';
  if(s==='tan')t=`x = ${f2(K.t)}, slope ${f2(mt(K.t))}.`+(K.flat?' Flat tangent found.':'');
  if(s==='ln')t=K.b<3?LN[K.b].q:'Minimum at x = e^(−1/3).';
  tell((pre?pre+' ':'')+t);ctl();K.want()}
 function ctl(){if(!A||!pad)return;pad.innerHTML='';const s=st(),B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':al||null},pad,t);e.onclick=f};
  if(s==='area'){B('h ÷ 2',()=>setH(K.h/2));B('h × 2',()=>setH(K.h*2))}
  if(s==='test')[1,2,3].forEach(k=>B(`x = ${k}`,()=>setX(k)));
  if(s==='tan'){B('◀ −0.1',()=>setT(K.t-.1));B('◀ −0.02',()=>setT(K.t-.02));B('+0.02 ▶',()=>setT(K.t+.02));B('+0.1 ▶',()=>setT(K.t+.1))}
  const set=s==='build'?BUILD:s==='ln'?LN:null;if(set&&K.b<set.length)set[K.b].o.forEach((o,j)=>B(String.fromCharCode(65+j),()=>pick(set,j),o[0]));A.redraw()}
 const ok=(n,cond,msg)=>()=>{if(A.step===n&&cond()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg()+A.reveal(n))};
 const seq=(fs,gp)=>{const g=K.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===K.gen)f()},A.reduced()?j*20:j*gp))};
 const init=()=>{K.gen++;K.want=()=>{};K.miss=-1;K.b=0;K.drag=null};
 const steps=[
  {h:'Two strips and a corner',p:'A rectangle has sides u and v. When x grows by h, u grows by Δu and v by Δv. Drag h down and watch the corner.',
   predict:{q:'Is the derivative of uv just u′ × v′?',opts:['Yes, multiply the derivatives','No, two strips add up'],ans:1},task:'Shrink h until the corner is under 3% of ΔA',
   show:()=>{steps[0].go();seq([.6,.3,.15,.08].map(h=>()=>setH(h)),350)},go:()=>{init();K.h=1.2;status();K.want=ok(0,()=>corner()<.03,()=>'As h → 0 the corner vanishes: (uv)′ = u v′ + v u′.')}},
  {h:'Test the tempting rule',p:'y = x²·x³ is just x⁵, so we know its slope is 5x⁴. Check u′v′ against it.',
   predict:{q:'For y = x²·x³, does u′v′ = (2x)(3x²) give the right slope?',opts:['Yes, it should','No, it is wrong'],ans:1},task:'Check at x = 1, 2 and 3',
   show:()=>{steps[1].go();seq([1,2,3].map(k=>()=>setX(k)),400)},go:()=>{init();K.x=1.5;K.seen={};status();K.want=ok(1,()=>Object.keys(K.seen).length>=3,()=>'u′v′ fails every time; u v′ + v u′ = 3x⁴ + 2x⁴ = 5x⁴ matches.')}},
  {h:'Build d(x²eˣ)/dx',p:'Let u = x² and v = eˣ. Pick each piece, then factorise.',
   predict:{q:'v = eˣ. What is v′?',opts:['x·eˣ⁻¹','eˣ'],ans:1},task:'Pick all four cards',
   show:()=>{steps[2].go();seq([0,1,2,0].map(j=>()=>pick(BUILD,j)),400)},go:()=>{init();status();K.want=ok(2,()=>K.b>=4,()=>'Factorised, x eˣ(x + 2) = 0 gives the turning points at once.')}},
  {h:'A tangent on x sin x',p:'Drag the point. The green tangent uses the product rule; the dashed red one uses u′v′.',task:'Find where the tangent is flat, between x = 1 and 3',
   show:()=>{steps[3].go();seq([1.4,1.8,2.03].map(x=>()=>setT(x)),400)},go:()=>{init();K.t=.8;K.flat=0;status();K.want=ok(3,()=>K.flat,()=>'Flat at x ≈ 2.03, where sin x + x cos x = 0.')}},
  {h:'Differentiate, factorise, solve',p:'y = x³ ln x. Use the product rule, take out the common factor, then solve dy/dx = 0.',task:'Pick all three cards',
   show:()=>{steps[4].go();seq([1,1,2].map(j=>()=>pick(LN,j)),400)},go:()=>{init();status();K.want=ok(4,()=>K.b>=3,()=>'Factorising first makes dy/dx = 0 easy to solve.')}},
  {h:'Challenge',p:'',go:()=>{init();quiz.next()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>K.want()});
 const QZ=[['d/dx (x sin x) = ?',[['sin x + x cos x','ok'],['cos x','uv'],['x cos x','half']]],
  ['d/dx (x² ln x) = ?',[['2x ln x + x','ok'],['2x · (1/x) = 2','uv'],['2x ln x','half']]],
  ['d/dx (x eˣ) = ?',[['eˣ(x + 1)','ok'],['eˣ','uv'],['x eˣ⁻¹','pow']]],
  ['d/dx (x³ cos x) = ?',[['3x² cos x − x³ sin x','ok'],['3x² cos x + x³ sin x','sign'],['−3x² sin x','uv']]],
  ['y = (2x + 1)(x − 3). dy/dx at x = 1?',[['−1','ok'],['2','uv'],['−4','half']]],
  ['d/dx (eˣ sin x) = ?',[['eˣ(sin x + cos x)','ok'],['eˣ cos x','uv'],['eˣ(sin x − cos x)','sign']]]];
 quiz=(()=>{let n=-1,run=0,box;const next=()=>{n++;const[q,ops]=QZ[n%QZ.length],r=n%3;box.hidden=false;
   box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
   const row=box.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tg])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(tg)});tell('Challenge: '+q)};
  const grade=tg=>{box.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=box.querySelector('.fl-fb');let m;
   switch(tg){case 'ok':m='Correct.';break;
    case 'uv':m='That is u′v′, the derivatives multiplied. The product rule is u v′ + v u′.';break;
    case 'half':m='You have only one of the two terms. Add the other: u v′ + v u′.';break;
    case 'pow':m='The power rule does not apply to eˣ. Its derivative is eˣ.';break;
    default:m='Check the sign: d/dx cos x = −sin x, but d/dx sin x = +cos x.'}
   const good=tg==='ok';if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next};
  return{set:b=>box=b,next}})();
 function down(p){const s=st(),r=trR(),near=p.y>r.y-14&&p.y<r.y+r.h+14&&p.x>r.x-16&&p.x<r.x+r.w+16;
  if(s==='area'&&near){K.drag='h';setH(sval(p,0,1.5));return true}
  if(s==='test'&&near){K.drag='x';setX(sval(p,.5,3));return true}
  if(s==='tan'){if(near){K.drag='t';setT(sval(p,0,3.4));return true}if(inR(p,gR())){K.drag='g';setT(M().ix(p.x));return true}}
  const set=s==='build'?BUILD:s==='ln'?LN:null;if(set)for(let j=0;j<3;j++)if(inR(p,cR(j))){pick(set,j);break}return false}
 function move(p){const s=st();if(K.drag==='h')setH(sval(p,0,1.5));else if(K.drag==='x')setX(sval(p,.5,3));else if(K.drag==='t')setT(sval(p,0,3.4));else if(K.drag==='g')setT(M().ix(p.x))}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{const q=A.step===5;quizBox.hidden=!q;pad.hidden=q;ctl()},
  init:A=>{const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);quizBox=c.el('div',{class:'fl-chal'},A.below);quiz.set(quizBox);
   A.gest({down,move,up:()=>{K.drag=null}});ctl()}});
 let quizBox;A.start()})})();
