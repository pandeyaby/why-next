/* Data for flagastro (what astronauts do, ages 5–7). Sources: NASA "What Is an Astronaut?" (NASA Knows!, grades K-4),
   NASA "International Space Station Facts and Figures" (orbits about 400 km up, about 16 times a day, crewed since
   November 2000) and "Living in Space" / "Exercising in Space" (about 2 hours of exercise a day, sleeping bags fixed to
   the wall, drinks from pouches, tortillas because crumbs float); NASA Apollo 11 mission overview (20 July 1969, Neil
   Armstrong then Buzz Aldrin; 12 people walked on the Moon, 1969–1972); ESA "Spacesuits" (air to breathe, pressure,
   protection from heat and cold); FAI 100 km (Kármán) line for the edge of space; airliners cruise about 10–12 km up;
   Moon surface gravity about 1/6 of Earth's (NASA Moon fact sheet: 1.62 m/s² against 9.81 m/s²). */
const AST=(()=>{
/* scene 1: suit up (good parts keep the astronaut alive outside, traps do not) */
const SUIT=[{t:'Helmet',good:true,why:'The helmet holds air round the head and the visor blocks strong sunlight.'},
 {t:'Air backpack',good:true,why:'The backpack gives air to breathe. There is no air in space.'},
 {t:'Sun hat',good:false,why:'A sun hat lets no air in. Out in space you need a helmet full of air.'},
 {t:'Thick gloves',good:true,why:'Gloves keep hands safe from the very hot and very cold.'},
 {t:'Swim goggles',good:false,why:'Goggles do not cover the nose and mouth. The astronaut could not breathe.'},
 {t:'Space boots',good:true,why:'Boots are part of the suit, so the air cannot leak out.'}];
/* scene 2: how high? ladder of stops, in km above the ground */
const STOPS=[{t:'Ground',km:0},{t:'Planes fly',km:10},{t:'Space starts',km:100},{t:'Space station',km:400}];
const TRIPS=[{to:2,ask:'Fly to where space starts'},{to:1,ask:'Fly to where planes fly'},{to:3,ask:'Fly to the space station'}];
/* scene 3: life on the space station: two ways, one is how it is done in space */
const LIFE=[{need:'Drink',icon:'drink',opts:['A cup','A pouch with a straw'],ans:1,why:'In a cup the water floats out in wobbly balls. A pouch and straw keep it in.'},
 {need:'Sleep',icon:'sleep',opts:['A bed with a pillow','A sleeping bag tied to the wall'],ans:1,why:'Nothing stays on a bed up there. The bag is tied on so the astronaut does not float about.'},
 {need:'Eat',icon:'eat',opts:['A slice of bread','A tortilla wrap'],ans:1,why:'Bread makes crumbs that float into eyes and machines. A wrap makes almost no crumbs.'},
 {need:'Keep fit',icon:'fit',opts:['Rest all day','Exercise about 2 hours a day'],ans:1,why:'Floating is easy for bones and muscles, so they get weak. Exercise keeps them strong.'}];
/* scene 4: jump heights (Moon gravity is about 1/6 of Earth's, so the same jump goes about 6 times as high) */
const JUMP={earth:30,moon:180},TIMES=[2,6,100];
const ROBOT=[{say:'Astronauts live on the Moon today.',ok:false,fix:'No one lives on the Moon. Twelve people walked on it long ago, and astronauts today live on the space station.'},
 {say:'In 1969 Neil Armstrong was the first person to walk on the Moon.',ok:true,fix:'Yes. Neil Armstrong stepped onto the Moon on 20 July 1969, then Buzz Aldrin.'},
 {say:'An astronaut can take off the helmet outside the space station.',ok:false,fix:'Never. There is no air in space. The helmet and backpack give the astronaut air.'},
 {say:'The space station goes round the Earth about 16 times a day.',ok:true,fix:'Yes. It goes round about once every hour and a half.'},
 {say:'There is no gravity at the space station, so things float.',ok:false,fix:'Gravity is still there. The station and everything in it fall round the Earth together, so things float.'}];
const DESC=[
 'An astronaut and six things to wear. Tap the 4 things that keep the astronaut safe in space.',
 'A rocket and a tall ladder of heights: ground, planes, space starts, space station. Drag the rocket up or down, or use the buttons.',
 'Life on the space station. For each job, tap the way astronauts do it in space.',
 'An astronaut on Earth and on the Moon. Tap Jump on Earth and Jump on the Moon, then choose how many times higher.',
 'A robot says things about astronauts. Buttons: Right or Slip.'];
const DONE=[
 'A helmet, an air backpack, gloves and boots: the suit carries its own air.',
 'Planes fly about 10 km up, space starts about 100 km up and the space station is about 400 km up.',
 'In space, water floats, crumbs float and bones get weak, so astronauts use pouches, wraps, tied-on bags and exercise.',
 'The Moon pulls less, so the same jump goes about 6 times as high.',
 'The robot slipped three times: nobody lives on the Moon, helmets stay on, and gravity is still there.'];
const QS=[
 {q:'Why does an astronaut wear a helmet in space?',a:'There is no air to breathe in space',o:[['To keep the Sun off, like a sun hat','air'],['Space is windy','air']]},
 {q:'Where do astronauts live and work today?',a:'On the space station, going round the Earth',o:[['In houses on the Moon','moon'],['On the Sun','moon']]},
 {q:'Who was the first person to walk on the Moon?',a:'Neil Armstrong, in 1969',o:[['Nobody has ever walked on the Moon','never'],['An astronaut last year','never']]},
 {q:'How do astronauts drink on the space station?',a:'From a pouch with a straw',o:[['From an open cup','cup'],['From a tap into a glass','cup']]},
 {q:'Which is higher up: planes, or the space station?',a:'The space station, about 40 times higher',o:[['Planes','high'],['They are the same height','high']]},
 {q:'Why do astronauts exercise every day?',a:'To keep their bones and muscles strong',o:[['They are bored','fit'],['To stop them floating','fit']]},
 {q:'Why can you jump higher on the Moon?',a:'The Moon pulls you less than the Earth does',o:[['There is no gravity on the Moon','grav'],['The Moon is bouncy','grav']]}];
/* small pictures drawn on the lab canvas */
function paintIcon(g,kind,x,y,u){g.save();g.lineCap='round';g.lineJoin='round';const P='#111827';
 const circle=(cx,cy,r,f,s)=>{g.beginPath();g.arc(cx,cy,r,0,7);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=2;g.stroke()}};
 if(kind==='drink'){g.fillStyle='#bfdbfe';g.fillRect(x-u*.3,y-u*.3,u*.6,u*.7);g.strokeStyle=P;g.lineWidth=2;g.strokeRect(x-u*.3,y-u*.3,u*.6,u*.7);g.beginPath();g.moveTo(x+u*.1,y-u*.3);g.lineTo(x+u*.2,y-u*.6);g.stroke()}
 if(kind==='sleep'){g.fillStyle='#c4b5fd';A2(g,x-u*.25,y-u*.55,u*.5,u*1.1,u*.2);g.fill();g.strokeStyle=P;g.lineWidth=2;g.stroke();circle(x,y-u*.35,u*.16,'#fcd34d',P)}
 if(kind==='eat'){g.fillStyle='#fde68a';g.beginPath();g.ellipse(x,y,u*.5,u*.32,0,0,7);g.fill();g.strokeStyle='#92400e';g.lineWidth=2;g.stroke();[[-.2,-.05],[.1,.1],[.25,-.1]].forEach(([a,b])=>circle(x+a*u,y+b*u,u*.04,'#b45309'))}
 if(kind==='fit'){g.strokeStyle=P;g.lineWidth=3;g.beginPath();g.moveTo(x-u*.5,y);g.lineTo(x+u*.5,y);g.stroke();[-.5,.5].forEach(d=>{g.fillStyle='#475569';g.fillRect(x+d*u-u*.08,y-u*.22,u*.16,u*.44)})}
 if(kind==='rocket'){g.fillStyle='#e5e7eb';g.beginPath();g.moveTo(x,y-u);g.quadraticCurveTo(x+u*.35,y-u*.4,x+u*.3,y+u*.5);g.lineTo(x-u*.3,y+u*.5);g.quadraticCurveTo(x-u*.35,y-u*.4,x,y-u);g.fill();g.strokeStyle=P;g.lineWidth=2;g.stroke();
  circle(x,y-u*.25,u*.13,'#60a5fa',P);g.fillStyle='#dc2626';[[-1],[1]].forEach(([s])=>{g.beginPath();g.moveTo(x+s*u*.3,y+u*.1);g.lineTo(x+s*u*.55,y+u*.6);g.lineTo(x+s*u*.3,y+u*.5);g.fill()})}
 if(kind==='flame'){g.fillStyle='#f97316';g.beginPath();g.moveTo(x-u*.2,y);g.lineTo(x,y+u*.6);g.lineTo(x+u*.2,y);g.fill()}
 if(kind==='plane'){g.fillStyle='#64748b';g.beginPath();g.ellipse(x,y,u*.5,u*.1,0,0,7);g.fill();g.beginPath();g.moveTo(x-u*.05,y);g.lineTo(x-u*.25,y+u*.35);g.lineTo(x+u*.1,y);g.fill()}
 if(kind==='station'){g.fillStyle='#1d4ed8';g.fillRect(x-u*.7,y-u*.15,u*.4,u*.3);g.fillRect(x+u*.3,y-u*.15,u*.4,u*.3);g.fillStyle='#cbd5e1';g.fillRect(x-u*.3,y-u*.08,u*.6,u*.16);g.strokeStyle=P;g.lineWidth=1.5;g.strokeRect(x-u*.3,y-u*.08,u*.6,u*.16)}
 if(kind==='earth'){circle(x,y,u*.5,'#3b82f6');g.fillStyle='#16a34a';g.beginPath();g.ellipse(x-u*.15,y-u*.1,u*.18,u*.25,.4,0,7);g.fill();g.beginPath();g.ellipse(x+u*.2,y+u*.15,u*.15,u*.12,0,0,7);g.fill()}
 if(kind==='moon'){circle(x,y,u*.5,'#d1d5db',P);circle(x-u*.15,y-u*.1,u*.1,'#9ca3af');circle(x+u*.18,y+u*.15,u*.07,'#9ca3af')}
 g.restore()}
function A2(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
/* an astronaut: suit parts drawn only when worn (on = list of SUIT indexes) */
function paintAstro(g,x,y,u,on){g.save();const P='#111827',has=i=>on.includes(i);g.lineWidth=2;g.strokeStyle=P;
 if(has(1)){g.fillStyle='#94a3b8';A2(g,x-u*.55,y-u*.2,u*1.1,u*1.1,u*.15);g.fill();g.stroke()}
 g.fillStyle='#f8fafc';A2(g,x-u*.42,y-u*.25,u*.84,u*1.15,u*.2);g.fill();g.stroke();
 g.fillStyle='#f8fafc';g.fillRect(x-u*.38,y+u*.9,u*.3,u*.7);g.fillRect(x+u*.08,y+u*.9,u*.3,u*.7);g.strokeRect(x-u*.38,y+u*.9,u*.3,u*.7);g.strokeRect(x+u*.08,y+u*.9,u*.3,u*.7);
 if(has(5)){g.fillStyle='#475569';g.fillRect(x-u*.42,y+u*1.45,u*.38,u*.22);g.fillRect(x+u*.04,y+u*1.45,u*.38,u*.22)}
 g.fillStyle='#f8fafc';g.fillRect(x-u*.7,y-u*.15,u*.28,u*.75);g.fillRect(x+u*.42,y-u*.15,u*.28,u*.75);g.strokeRect(x-u*.7,y-u*.15,u*.28,u*.75);g.strokeRect(x+u*.42,y-u*.15,u*.28,u*.75);
 if(has(3)){g.fillStyle='#ea580c';g.beginPath();g.arc(x-u*.56,y+u*.7,u*.17,0,7);g.arc(x+u*.56,y+u*.7,u*.17,0,7);g.fill()}
 g.fillStyle='#fcd34d';g.beginPath();g.arc(x,y-u*.55,u*.3,0,7);g.fill();g.stroke();g.fillStyle=P;g.beginPath();g.arc(x-u*.1,y-u*.58,u*.04,0,7);g.arc(x+u*.1,y-u*.58,u*.04,0,7);g.fill();
 if(has(0)){g.fillStyle='rgba(147,197,253,.55)';g.beginPath();g.arc(x,y-u*.55,u*.45,0,7);g.fill();g.stroke()}
 if(has(2)){g.fillStyle='#b45309';g.beginPath();g.ellipse(x,y-u*.82,u*.55,u*.1,0,0,7);g.fill()}
 if(has(4)){g.fillStyle='#0ea5e9';g.fillRect(x-u*.25,y-u*.66,u*.5,u*.14)}
 g.restore()}
return{paintIcon,paintAstro,SUIT,STOPS,TRIPS,LIFE,JUMP,TIMES,ROBOT,DESC,DONE,QS}})();
