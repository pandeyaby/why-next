/* Flagship – parts of plant and animal cells (ages 11–12; NC England KS3 Biology: functions of the cell wall, membrane,
 cytoplasm, nucleus, vacuole, mitochondria and chloroplasts; plant vs animal cells; ribosomes). Build an animal cell, a leaf
 cell and a root cell, match six jobs to parts, reach ×400 on a light microscope and sort what it shows, and fill a vacuole. */
(()=>{
 const P=[['membrane','cell membrane'],['cytoplasm','cytoplasm'],['nucleus','nucleus'],['mito','mitochondria'],['ribo','ribosomes'],['wall','cell wall'],['chloro','chloroplasts'],['vac','vacuole']];
 const NAME=Object.fromEntries(P);
 const ANIMAL=['membrane','cytoplasm','nucleus','mito','ribo'];
 const NOTA={wall:'Animal cells have no cell wall. The thin membrane is their outer layer.',chloro:'Animal cells have no chloroplasts. Animals eat food; they cannot photosynthesise.',vac:'Animal cells have no large permanent vacuole. Only small, short-lived ones.'};
 const PLANTS=[['leaf cell',['wall','chloro','vac']],['root cell',['wall','vac']]];
 const JOBS=[['Releases energy from glucose in respiration','mito',{chloro:'Chloroplasts trap light to make glucose. Mitochondria release the energy from it.',nucleus:'The nucleus holds the genes. Respiration happens in the mitochondria.'}],
 ['Controls what goes in and out of the cell','membrane',{wall:'The wall is strong but lets almost everything through. The membrane controls what passes.',nucleus:'The nucleus controls the cell, not the traffic at its edge.'}],
 ['Holds the genes (DNA) and controls the cell','nucleus',{mito:'Mitochondria release energy. The genes are in the nucleus.',cytoplasm:'Reactions happen in the cytoplasm. DNA is in the nucleus.'}],
 ['Makes proteins','ribo',{nucleus:'The nucleus holds the instructions, but ribosomes build the proteins.',mito:'Mitochondria release energy. Ribosomes make proteins.'}],
 ['Absorbs light to make food by photosynthesis','chloro',{mito:'Mitochondria use food. Chloroplasts make it, using light.',vac:'The vacuole stores sap. Chloroplasts hold the green chlorophyll.'}],
 ['Strengthens the cell and stops it bursting','wall',{membrane:'The membrane is thin and flexible. The cellulose wall gives strength.',vac:'The vacuole pushes outwards; the wall holds firm against it.'}]];
 const SCOPE=[['nucleus',0],['cell wall',0],['chloroplasts',0],['ribosomes',1],['detail inside a mitochondrion',1]];
 VIS.reg('flagorganel',c=>{let A,keys,quiz;
 const K={run:0,cell:[],pi:0,ji:0,lens:4,si:0,pile:[0,0],water:2,goal:0,hl:'',note:'',bad:false,then:()=>{}};
 const part=()=>['animal','plant','job','scope','vac','chal'][A.step];
 const fz=n=>Math.round(n*(A.narrow?1:1.1));
 const INK='#172033',DIM='#475569',RIM='#64748b',WHITE='#ffffff',RIGHT='#047857',WRONG='#b91c1c',CYTO='#fef9c3',NUC='#7c3aed',MITO='#ea580c',CHL='#16a34a',SAP='#bae6fd',WALL='#65a30d';
 function tx(g,s,x,y,n,col,al){g.font=`800 ${fz(n)}px system-ui,sans-serif`;g.fillStyle=col;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(String(s),x,y,A.W-12)}
 function brk(g,s,max,n){g.font=`800 ${fz(n)}px system-ui,sans-serif`;const out=[];let r='';s.split(' ').forEach(w=>{const t=r?r+' '+w:w;if(r&&g.measureText(t).width>max){out.push(r);r=w}else r=t});out.push(r);return out}
 function para(g,s,x,y,max,n,col){const L=brk(g,s,max,n);L.forEach((l,i)=>tx(g,l,x,y+(i-(L.length-1)/2)*fz(n+4),n,col))}
 function card(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
 const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function note(g){if(!K.note)return;const L=brk(g,(K.bad?'✗ ':'✓ ')+K.note,A.W-44,13),lh=fz(13)+6,h=L.length*lh+12,y=A.H-h-6;card(g,{x:10,y,w:A.W-20,h},WHITE,K.bad?WRONG:RIGHT,3);L.forEach((l,i)=>tx(g,l,A.W/2,y+6+lh*(i+.5),13,INK))}
 const read=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
 const no=s=>{K.bad=true;K.note=s;A.sound.miss();read(s);A.redraw()};
 const ok=s=>{K.bad=false;K.note=s;A.sound.pop()};
  const cellBox=()=>A.narrow?{x:12,y:A.H*.08,w:A.W-24,h:A.H*.42}:{x:16,y:A.H*.1,w:A.W*.58,h:A.H*.66};
 const trayR=i=>{if(A.narrow){const w=(A.W-36)/3;return{x:12+(i%3)*(w+6),y:A.H*.54+Math.floor(i/3)*(A.H*.1),w,h:A.H*.088}}const w=(A.W*.36-8)/2;return{x:A.W*.62+(i%2)*(w+8),y:A.H*.1+Math.floor(i/2)*(A.H*.165),w,h:A.H*.15}};
 function drawCell(g,has,plant,opt){opt=opt||{};const B=cellBox(),cx=B.x+B.w/2,cy=B.y+B.h/2,rw=Math.min(B.w*.42,B.h*.75),rh=B.h*.4,hl=n=>K.hl===n,sw=opt.squeeze||0;
 const ring=(pad,col,w,dash)=>{g.strokeStyle=col;g.lineWidth=w;g.setLineDash(dash||[]);g.beginPath();plant?A.paint.rrect(cx-rw-pad,cy-rh-pad,2*(rw+pad),2*(rh+pad),10):g.ellipse(cx,cy,rw+pad,rh+pad,0,0,7);g.stroke();g.setLineDash([])};
 if(has.includes('wall')){g.strokeStyle=hl('wall')?'#f59e0b':WALL;g.lineWidth=10;g.beginPath();A.paint.rrect(cx-rw-7,cy-rh-7,2*(rw+7),2*(rh+7),12);g.stroke()}
 const mw=rw*(1-sw),mh=rh*(1-sw);g.fillStyle=has.includes('cytoplasm')?(hl('cytoplasm')?'#fde68a':CYTO):'#f8fafc';g.beginPath();plant?A.paint.rrect(cx-mw,cy-mh,2*mw,2*mh,8):g.ellipse(cx,cy,mw,mh,0,0,7);g.fill();
 if(has.includes('membrane')){g.strokeStyle=hl('membrane')?'#f59e0b':'#1e293b';g.lineWidth=hl('membrane')?4:2;g.beginPath();plant?A.paint.rrect(cx-mw,cy-mh,2*mw,2*mh,8):g.ellipse(cx,cy,mw,mh,0,0,7);g.stroke()}else ring(0,RIM,1.5,[5,4]);
 if(has.includes('vac')){const f=opt.fill==null?1:opt.fill,vw=mw*(.35+.6*f),vh=mh*(.35+.55*f);g.fillStyle=hl('vac')?'#7dd3fc':SAP;g.beginPath();A.paint.rrect(cx+mw*.1-vw*.55,cy-vh*.85,vw*1.1,vh*1.7,10);g.fill();g.strokeStyle='#0284c7';g.lineWidth=1.5;g.stroke()}
 const nuc=plant?[cx-mw*.72,cy-mh*.55,Math.min(mw,mh)*.2]:[cx-rw*.3,cy-rh*.05,Math.min(rw,rh)*.3];
 if(has.includes('nucleus')){g.fillStyle=hl('nucleus')?'#a78bfa':NUC;g.beginPath();g.arc(nuc[0],nuc[1],nuc[2],0,7);g.fill();g.fillStyle='#ddd6fe';g.beginPath();g.arc(nuc[0]+nuc[2]*.2,nuc[1]-nuc[2]*.2,nuc[2]*.3,0,7);g.fill()}
 if(has.includes('mito'))[[.5,-.45],[.62,.4],[-.45,.62]].forEach(([u,v])=>{const x=cx+mw*u*(plant?1.05:1),y=cy+mh*v*(plant?1.1:1),r=Math.min(mw,mh)*.12;g.fillStyle=hl('mito')?'#fb923c':MITO;g.beginPath();g.ellipse(x,y,r*1.6,r,.4,0,7);g.fill();g.strokeStyle='#fff7ed';g.lineWidth=1.5;g.beginPath();g.moveTo(x-r,y);for(let k=0;k<4;k++)g.lineTo(x-r+k*r*.6+r*.3,y+(k%2?-r*.5:r*.5));g.stroke()});
 if(has.includes('ribo'))[[-.1,.7],[.2,-.7],[.75,0],[-.7,.3],[.35,.72],[-.25,-.65],[.05,.45],[-.6,-.2]].forEach(([u,v])=>{g.fillStyle=hl('ribo')?'#f43f5e':'#334155';g.beginPath();g.arc(cx+mw*u*.95,cy+mh*v*.95,hl('ribo')?3.5:2.2,0,7);g.fill()});
 if(has.includes('chloro'))[[-.35,-.82],[.2,-.82],[.7,-.8],[-.82,.1],[.82,.05],[-.3,.82],[.3,.82]].forEach(([u,v])=>{g.fillStyle=hl('chloro')?'#4ade80':CHL;g.beginPath();g.ellipse(cx+mw*u,cy+mh*v,Math.min(mw,mh)*.14,Math.min(mw,mh)*.08,0,0,7);g.fill()});
 if(opt.title)tx(g,opt.title,cx,B.y-fz(8),13,INK)}
 function tray(g,want){P.forEach(([k,t],i)=>{const r=trayR(i),on=want&&want.includes(k);card(g,r,on?'#dcfce7':WHITE,on?RIGHT:RIM,on?3:2);para(g,t,r.x+r.w/2,r.y+r.h/2,r.w-8,12,INK)})}
 function scope(g){const B=cellBox(),cx=B.x+B.w/2,cy=B.y+B.h/2,R=Math.min(B.w,B.h)*.48,z=K.lens/4;g.save();g.beginPath();g.arc(cx,cy,R,0,7);g.fillStyle='#ecfccb';g.fill();g.clip();
 const cw=10*z,chh=6*z;for(let y=cy-R-chh;y<cy+R+chh;y+=chh)for(let x=cx-R-cw+((Math.round((y-cy)/chh)%2)*cw/2);x<cx+R+cw;x+=cw){g.strokeStyle=WALL;g.lineWidth=Math.max(1,z*.25);g.strokeRect(x,y,cw,chh);if(z>=2.5){g.fillStyle=NUC;g.beginPath();g.arc(x+cw*.25,y+chh*.4,chh*.12,0,7);g.fill()}if(z>=10){g.fillStyle=CHL;[.6,.8].forEach(u=>{g.beginPath();g.ellipse(x+cw*u,y+chh*.25,chh*.07,chh*.04,0,0,7);g.fill()})}}
 g.restore();g.strokeStyle='#1e293b';g.lineWidth=4;g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();tx(g,`eyepiece ×10 × objective ×${K.lens} = ×${10*K.lens}`,cx,B.y-fz(8),13,INK)}
 const lensR=i=>trayR(i),topR=()=>A.narrow?{x:12,y:A.H*.54,w:A.W-24,h:A.H*.088}:{x:A.W*.62,y:A.H*.1,w:A.W*.36,h:A.H*.15},binR=i=>A.narrow?{x:12+i*((A.W-30)/2+6),y:A.H*.645,w:(A.W-30)/2,h:A.H*.14}:{x:A.W*.62,y:A.H*(.3+i*.22),w:A.W*.36,h:A.H*.18};
 function scene(g){const v=part();
 if(v==='animal'){drawCell(g,K.cell,false,{title:K.cell.length<5?`Animal cell: ${K.cell.length} of 5 parts`:'Animal cell complete'});tray(g,K.cell)}
 if(v==='plant'){const pc=PLANTS[K.pi];drawCell(g,K.cell,true,{title:pc?`Plant ${pc[0]}: add its extra parts`:'Leaf and root cells built'});tray(g,K.cell)}
 if(v==='job'){const j=JOBS[K.ji];drawCell(g,P.map(p=>p[0]),true,{title:j?j[0]:'All 6 jobs matched'});tray(g,null)}
 if(v==='scope'){scope(g);if(K.lens<40)[4,10,40].forEach((l,i)=>{const r=lensR(i);card(g,r,K.lens===l?'#dcfce7':WHITE,K.lens===l?RIGHT:RIM,2.5);para(g,`objective ×${l}`,r.x+r.w/2,r.y+r.h/2,r.w-8,11,INK)});
 else{const s=SCOPE[K.si],r0=topR();card(g,r0,s?'#fef3c7':WHITE,'#b45309',2.5);para(g,s?s[0]:'All 5 sorted',r0.x+r0.w/2,r0.y+r0.h/2,r0.w-12,13,s?INK:RIGHT);
 ['light microscope shows it','too small: electron microscope'].forEach((t,i)=>{const r=binR(i);card(g,r,'#f1f5f9',i?DIM:RIGHT,2.5);para(g,t+(K.pile[i]?` (${K.pile[i]})`:''),r.x+r.w/2,r.y+r.h/2,r.w-10,12,INK)})}}
 if(v==='vac'){drawCell(g,P.map(p=>p[0]),true,{fill:K.water/4,squeeze:K.water===0?.18:K.water===1?.08:0,title:['Floppy: membrane pulls off the wall','Soft','Partly firm','Nearly firm','Firm (turgid)'][K.water]});
 [['add water',0],['remove water',1]].forEach(([t,i])=>{const r=trayR(i);card(g,r,WHITE,RIM,2.5);para(g,t,r.x+r.w/2,r.y+r.h/2,r.w-8,11,INK)})}}
 function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.05:.5);g.fillRect(0,0,A.W,A.H);if(C.dark){g.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);g.fill()}
 if(part()==='chal'){drawCell(g,P.map(p=>p[0]),true,{title:'Every part has a job.'})}else scene(g);note(g);A.fx.draw(g)}
 function addPart(k){const v=part();
 if(v==='animal'){if(K.cell.includes(k))return no(`The ${NAME[k]} is already in.`);if(!ANIMAL.includes(k))return no(NOTA[k]);K.cell.push(k);ok(`${NAME[k]} added.`);return update()}
 const pc=PLANTS[K.pi];if(!pc)return;if(K.cell.includes(k))return no(`The ${NAME[k]} is already in. Plant cells keep every animal-cell part, mitochondria too.`);
 if(!pc[1].includes(k))return no('Root cells grow in dark soil, so they have no chloroplasts. Not every plant cell is green.');
 K.cell.push(k);ok(`${NAME[k]} added to the ${pc[0]}.`);if(pc[1].every(x=>K.cell.includes(x))){K.pi++;if(PLANTS[K.pi])K.cell=ANIMAL.slice();ok(pc[0]==='leaf cell'?'Leaf cell done. Now a root cell from underground.':'Root cell done: wall and vacuole, but no chloroplasts.')}update()}
 function jobPick(k){const j=JOBS[K.ji];if(!j)return;K.hl=k;if(k!==j[1])return no(j[2][k]||`The ${NAME[k]} does not do that job.`);ok(`${NAME[k]}: ${j[0].toLowerCase()}.`);K.ji++;update()}
 function setLens(l){if(K.lens>=40)return;K.lens=l;if(l===40)ok('×10 × ×40 = ×400. Now the nucleus, wall and chloroplasts show.');else{K.bad=false;K.note=`×10 × ×${l} = ×${10*l}. Zoom in more.`}update()}
 function sortTo(i){const s=SCOPE[K.si];if(!s||K.lens<40)return;if(i!==s[1])return no(s[1]?`${s[0]} is too small for a light microscope. You need an electron microscope.`:`The ${s[0]} shows clearly at ×400 with a light microscope.`);K.pile[i]++;ok(i?'Electron microscope only.':'Visible at ×400.');K.si++;update()}
 function water(d){const w=K.water+d;if(w>4)return no('The cell wall stops it swelling more. It cannot burst: it is already firm.');if(w<0)return no('The vacuole is nearly empty. The membrane has already pulled away from the wall.');K.water=w;
 K.bad=false;K.note=w===4?'Firm: the full vacuole presses the cytoplasm against the wall.':w===0?'Floppy: the vacuole shrank and the membrane pulled away from the wall. The plant wilts.':'';if(w===4&&K.goal===0)K.goal=1;if(w===0&&K.goal===1)K.goal=2;update()}
 function update(){const v=part();let s='';
 if(v==='animal'||v==='plant')s=`Parts in the cell: ${K.cell.map(k=>NAME[k]).join(', ')||'none'}. `+(v==='animal'?'Build an animal cell.':PLANTS[K.pi]?`Build a plant ${PLANTS[K.pi][0]}.`:'Done.');
 else if(v==='job')s=JOBS[K.ji]?`Job: ${JOBS[K.ji][0]}. Which part does it?`:'All six matched.';
 else if(v==='scope')s=K.lens<40?`Magnification ×${10*K.lens}. Reach ×400.`:SCOPE[K.si]?`${SCOPE[K.si][0]}: light microscope or electron microscope?`:'All five sorted.';
 else if(v==='vac')s=`Vacuole water level ${K.water} of 4. `+(K.goal===0?'Make the cell firm.':K.goal===1?'Now let it go floppy.':'Both done.');else s='Challenge.';
 read((K.note?K.note+' ':'')+s);controls();K.then()}
 function controls(){if(!keys)return;keys.innerHTML='';const v=part(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);e.onclick=f};
 if((v==='animal'&&K.cell.length<5)||(v==='plant'&&PLANTS[K.pi]))P.forEach(([k,t])=>b(t,()=>addPart(k),`Add ${t}`));
 if(v==='job'&&JOBS[K.ji])P.forEach(([k,t])=>b(t,()=>jobPick(k),`${t} does this job`));
 if(v==='scope'){if(K.lens<40)[4,10,40].forEach(l=>b(`objective ×${l}`,()=>setLens(l),`Use the ×${l} objective`));else if(SCOPE[K.si])['light microscope','electron microscope'].forEach((t,i)=>b(t,()=>sortTo(i),`Sort: ${t}`))}
 if(v==='vac'&&K.goal<2){b('Add water',()=>water(1),'Add water to the vacuole');b('Remove water',()=>water(-1),'Remove water from the vacuole')}A.redraw()}
 function down(p){const v=part(),i=[...P.keys()].find(i=>inR(p,trayR(i)));
 if((v==='animal'||v==='plant')&&i!=null){addPart(P[i][0]);return true}
 if(v==='job'&&i!=null){jobPick(P[i][0]);return true}
 if(v==='scope'){if(K.lens<40){if(i!=null&&i<3){setLens([4,10,40][i]);return true}}else{const b=[0,1].find(b=>inR(p,binR(b)));if(b!=null){sortTo(b);return true}}}
 if(v==='vac'&&(i===0||i===1)){water(i?-1:1);return true}return false}
 const close=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
 const play=fs=>{const id=++K.run,gap=A.reduced()?20:330;fs.forEach((f,k)=>setTimeout(()=>{if(id===K.run)f()},k*gap))};
 const fresh=(cell)=>{K.run++;Object.assign(K,{then:()=>{},cell:cell||[],pi:0,ji:0,lens:4,si:0,pile:[0,0],water:2,goal:0,hl:'',note:'',bad:false})};
 const steps=[
 {h:'Build an animal cell',p:'Tap the parts an animal cell has. Some parts in the tray belong only to plant cells.',
 predict:{q:'Does an animal cell have a cell wall?',opts:['No: its outer layer is the membrane','Yes: every cell has a wall','Yes, but a thin one'],ans:0},
 task:'Add 5 parts',show:()=>{steps[0].go();play(ANIMAL.map(k=>()=>addPart(k)))},go:()=>{fresh();update();K.then=close(0,()=>K.cell.length>=5,'Membrane, cytoplasm, nucleus, mitochondria and ribosomes: no wall, no chloroplasts, no big vacuole.')}},
 {h:'Build plant cells',p:'A plant cell starts with every animal-cell part. Add what a leaf cell has, then what a root cell has.',
 predict:{q:'Do plant cells have mitochondria?',opts:['Yes: plant cells respire too','No: chloroplasts do that job','Only at night'],ans:0},
 task:'Build 2 plant cells',show:()=>{steps[1].go();play(PLANTS.flatMap(pc=>pc[1].map(k=>()=>addPart(k))))},go:()=>{fresh(ANIMAL.slice());update();K.then=close(1,()=>K.pi>=PLANTS.length,'Leaf cells add a wall, chloroplasts and a vacuole. Root cells have no chloroplasts.')}},
 {h:'Who does what?',p:'Read each job. Tap the part that does it, in the tray.',
 task:'Match 6 jobs',show:()=>{steps[2].go();play(JOBS.map(j=>()=>jobPick(j[1])))},go:()=>{fresh();update();K.then=close(2,()=>K.ji>=JOBS.length,'Each part has its own job: energy, entry, control, proteins, food and strength.')}},
 {h:'Under the microscope',p:'Magnification = eyepiece × objective. Reach ×400, then sort what a light microscope can show.',
 predict:{q:'Can a school light microscope show ribosomes?',opts:['No: they are far too small','Yes, at ×400','Yes: they are the biggest part'],ans:0},
 task:'Zoom and sort 5',show:()=>{steps[3].go();play([()=>setLens(40)].concat(SCOPE.map(s=>()=>sortTo(s[1]))))},go:()=>{fresh();update();K.then=close(3,()=>K.si>=SCOPE.length,'At ×400 you see the nucleus, wall and chloroplasts. Ribosomes need an electron microscope.')}},
 {h:'Fill the vacuole',p:'The vacuole holds cell sap. Add water until the cell is firm, then remove it until the plant would wilt.',
 predict:{q:'You keep adding water to a plant cell. What happens?',opts:['It gets firm; the wall stops it bursting','It bursts','Nothing changes'],ans:0},
 task:'Firm, then floppy',show:()=>{steps[4].go();play([1,1,-1,-1,-1,-1].map(d=>()=>water(d)))},go:()=>{fresh();update();K.then=close(4,()=>K.goal>=2,'A full vacuole keeps the cell firm against its wall. Lose the water and the plant wilts.')}},
 {h:'Challenge',p:'',go:()=>{fresh();quizNext()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>K.then()});
 // challenge: every wrong answer names its slip
 const Q=[['Which part controls what enters and leaves a cell?','The cell membrane',[['The cell wall','wall'],['The nucleus','nuc']]],
 ['Where does aerobic respiration happen?','In the mitochondria',[['In the chloroplasts','chl'],['In the vacuole','vac']]],
 ['Which part do animal cells NOT have?','A cell wall',[['Mitochondria','mito'],['A cell membrane','memb']]],
 ['A root hair cell has no chloroplasts. Why?','It grows in the dark soil',[['Roots are not made of cells','nocell'],['Only flowers have chloroplasts','flower']]],
 ['Eyepiece ×10, objective ×40. What is the total magnification?','×400',[['×50','add'],['×4','div']]],
 ['What do mitochondria do with energy?','Release it from glucose',[['Make it from nothing','make'],['Store it as light','light']]]];
 function slip(tag){let m='Match the part to its job.';
 if(tag==='wall')m='The wall gives strength but lets almost everything through. The membrane controls entry and exit.';
 if(tag==='nuc')m='The nucleus controls the cell through its genes. The membrane decides what crosses the edge.';
 if(tag==='chl')m='Chloroplasts make glucose by photosynthesis. Respiration releases its energy in the mitochondria.';
 if(tag==='vac')m='The vacuole stores cell sap. Respiration happens in the mitochondria.';
 if(tag==='mito')m='Animal cells need mitochondria to release energy. It is the cell wall they lack.';
 if(tag==='memb')m='Every cell has a membrane. Animal cells lack a cell wall.';
 if(tag==='nocell')m='Every part of a plant is made of cells. Root cells simply get no light.';
 if(tag==='flower')m='Chloroplasts are in green parts, mostly leaves. Root cells are underground: none.';
 if(tag==='add')m='Magnifications multiply, not add: 10 × 40 = 400.';
 if(tag==='div')m='Multiply the two lenses: 10 × 40 = ×400.';
 if(tag==='make')m='Energy cannot be made. Mitochondria release energy stored in glucose.';
 if(tag==='light')m='Chloroplasts absorb light. Mitochondria release energy from glucose in respiration.';
 return m}
 let qn=-1,run=0;
 function quizNext(){qn++;const [q,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),k=qn%3,order=all.slice(k).concat(all.slice(0,k));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,w);e.onclick=()=>mark(tag,ans)});read('Challenge: '+q);A.redraw()}
 function mark(tag,ans){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const good=tag==='ok',fb=quiz.querySelector('.fl-fb');
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ans+'. Streak: '+run+'.':'✗ '+slip(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quizNext}
 A=FK.shell(c,{steps,ratio:.6,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;controls()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}});
 A.start()})})();
