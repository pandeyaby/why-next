/* Why Next? Learn: parameterised items. An item with "params" gets fresh numbers each time it is shown.
   Expressions are limited to digits, single-letter variables and + - * / % ( ) comparisons (checked by learn/validate_lessons.py). */
const LEARN_GEN=(()=>{
const SAFE=/^[a-z0-9+\-*/%(). <>=!&|]+$/;
function ev(expr,v){if(!SAFE.test(expr))throw new Error('unsafe expression');const k=Object.keys(v);return Function(...k,`"use strict";return (${expr});`)(...k.map(x=>v[x]))}
const fmt=x=>{const r=Math.round(x*100)/100;return (r<0?'−':'')+String(Math.abs(r))};
function fill(s,v){return s.replace(/\{=([^}]+)\}/g,(_,e)=>fmt(ev(e,v))).replace(/\{([a-z])\}/g,(_,k)=>k in v?fmt(v[k]):_)}
const rnd=(lo,hi)=>lo+Math.floor(Math.random()*(hi-lo+1));
function make(it){if(!it.params)return it;let v;
 for(let t=0;t<500;t++){v={};for(const[k,[lo,hi]]of Object.entries(it.params))v[k]=rnd(lo,hi);if(!it.where||ev(it.where,v))break}
 const o=Object.assign({},it,{prompt:fill(it.prompt,v),hint:fill(it.hint,v),explain:fill(it.explain,v),vars:v});
 if(it.choices)o.choices=it.choices.map(c=>fill(c,v));if(it.type==='numeric')o.answer=ev(String(it.answer),v);return o}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* draw a mastery set: `draw` items from the pool, always including at least one parameterised item */
function drawSet(m){const pool=shuffle(m.pool),gen=pool.filter(x=>x.params),out=[];if(gen.length)out.push(gen[0]);
 for(const it of pool){if(out.length>=m.draw)break;if(!out.includes(it))out.push(it)}return shuffle(out).map(make)}
return{ev,fill,make,drawSet,shuffle,fmt}})();
