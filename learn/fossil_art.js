/* Line drawings of fossils for the fossils-as-evidence lab (flag_fossev.js; bundled in the main learn.js so the lazy lab file stays small): icon(ctx, kind, x, y, size) draws coral,
   a fern leaf, a mammoth molar, a coiled shell or a three-toed footprint; foot(ctx, toes, x, y, size) draws a horse foot. */
const FOSART={INK:'#0f172a',
icon(Z,k,x,y,r){Z.save();Z.strokeStyle=Z.fillStyle=FOSART.INK;Z.lineWidth=Math.max(1.5,r/9);Z.lineCap='round';Z.beginPath();
 if(k==='coral'){[[0,0,-.2,-.9],[-.1,-.45,-.6,-.8],[0,-.3,.55,-.75],[.3,-.55,.45,-1]].forEach(([a,b,c2,d])=>{Z.moveTo(x+a*r,y+r*.6+b*r);Z.lineTo(x+c2*r,y+r*.6+d*r)});Z.moveTo(x-r*.7,y+r*.6);Z.lineTo(x+r*.7,y+r*.6)}
 if(k==='fern'){Z.moveTo(x,y+r*.9);Z.lineTo(x,y-r*.9);for(let i=0;i<5;i++){const yy=y+r*.6-i*r*.33,l=r*(.75-i*.12);Z.moveTo(x,yy);Z.lineTo(x-l,yy-r*.22);Z.moveTo(x,yy);Z.lineTo(x+l,yy-r*.22)}}
 if(k==='tooth'){Z.rect(x-r*.75,y-r*.5,r*1.5,r);for(let i=1;i<5;i++){Z.moveTo(x-r*.75+i*r*.3,y-r*.5);Z.lineTo(x-r*.75+i*r*.3,y+r*.5)}}
 if(k==='shell'){for(let a=0;a<14;a+=.2){const rr=r*.9*a/14,px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;a?Z.lineTo(px,py):Z.moveTo(px,py)}}
 if(k==='print'){Z.arc(x,y+r*.35,r*.3,0,7);[[-.5,-.35],[0,-.6],[.5,-.35]].forEach(([a,b])=>{Z.moveTo(x+a*r*.4,y+r*.1);Z.lineTo(x+a*r,y+b*r)})}
 Z.stroke();Z.restore()},
foot(Z,n,x,y,r){Z.save();Z.fillStyle='#e7e5e4';Z.strokeStyle=FOSART.INK;Z.lineWidth=2;Z.fillRect(x-r*.18,y-r,r*.36,r*1.1);Z.strokeRect(x-r*.18,y-r,r*.36,r*1.1);
 const w=n===1?r*.7:r*.24,gap=n===1?0:r*.06,tot=n*w+(n-1)*gap;for(let i=0;i<n;i++){const tx=x-tot/2+i*(w+gap),big=n===1||(n===3&&i===1)||(n===4&&(i===1||i===2));Z.beginPath();Z.rect(tx,y+r*.1,w,big?r*.45:r*.32);Z.fill();Z.stroke()}Z.restore()}};
