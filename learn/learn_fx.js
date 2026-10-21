/* Why Next? visual cues for progress: per-topic progress rings and a subtle mastery celebration (skipped under reduced motion). */
const LEARN_FX=(()=>{
function progress(id){if(LEARN.mastered(id)||LEARN.known(id))return 1;const les=LEARN.L[id];if(!les)return 0;const pr=LEARN.prog(id);
 const p=Object.keys(pr.practice||{}).length/(les.practice?les.practice.length:les.np||1),m=(pr.best||0)/(les.mastery?les.mastery.draw:les.md||1);return Math.min(.95,p*.5+m*.5)}
function ring(id,size=18){const v=progress(id),r=size/2-2.5,C=2*Math.PI*r,pc=Math.round(v*100);
 return `<svg class="pring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" role="img" aria-label="Progress ${pc}%"><title>Progress ${pc}%</title><circle cx="${size/2}" cy="${size/2}" r="${r}" class="pr-bg"/><circle cx="${size/2}" cy="${size/2}" r="${r}" class="pr-fg${v>=1?' done':''}" stroke-dasharray="${(C*v).toFixed(2)} ${C.toFixed(2)}" transform="rotate(-90 ${size/2} ${size/2})"/></svg>`}
function sync(id){const h=document.querySelector('.lhead svg.pring');if(h)h.outerHTML=ring(id,24);
 for(const b of document.querySelectorAll(`.item[data-id="${CSS.escape(id)}"] .lbs`)){const a=b.querySelector('.age');b.innerHTML=(a?a.outerHTML:'')+LEARN.badge(id)}}
function celebrate(host){if(!host)return;host.classList.add('fx-win');if(VIS.reduced())return;const b=document.createElement('span');b.className='fx-burst';b.setAttribute('aria-hidden','true');
 for(let i=0;i<12;i++){const d=document.createElement('i');d.style.setProperty('--a',i*30+'deg');b.appendChild(d)}host.prepend(b);setTimeout(()=>b.remove(),1400)}
return{sync,progress,ring,celebrate}})();
