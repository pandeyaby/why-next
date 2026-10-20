/* Why Next? Learn: parameterised items and randomness. An item with "params" gets fresh numbers each time it is shown.
   Expressions are limited to digits, single-letter variables and + - * / % ( ) comparisons (checked by learn/validate_lessons.py).
   For tests, ?seed=N makes all randomness repeatable and ?today=YYYY-MM-DD fixes the date. */
const LEARN_GEN=(()=>{
const SAFE=/^[a-z0-9+\-*/%(). <>=!&|]+$/,Q=new URLSearchParams(location.search);
function mulberry32(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const seed=Q.get('seed'),rand=seed!=null&&/^\d+$/.test(seed)?mulberry32(+seed):Math.random;
const td=Q.get('today'),today=()=>td&&/^\d{4}-\d{2}-\d{2}$/.test(td)?td:new Date().toISOString().slice(0,10);
const addDays=(d,n)=>{const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)};
function ev(expr,v){if(!SAFE.test(expr))throw new Error('unsafe expression');const k=Object.keys(v);return Function(...k,`"use strict";return (${expr});`)(...k.map(x=>v[x]))}
const fmt=x=>{const r=Math.round(x*100)/100;return (r<0?'−':'')+String(Math.abs(r))};
function fill(s,v){return s.replace(/\{=([^}]+)\}/g,(_,e)=>fmt(ev(e,v))).replace(/\{([a-z])\}/g,(_,k)=>k in v?fmt(v[k]):_)}
const rnd=(lo,hi)=>lo+Math.floor(rand()*(hi-lo+1));
function make(it){const o=it.params?inst(it):Object.assign({},it);
 /* shuffle multiple-choice options so the right answer isn't always in the same place */
 if(o.type==='mc'){const ord=shuffle(o.choices.map((_,k)=>k));o.answer=ord.indexOf(o.answer);o.choices=ord.map(k=>o.choices[k])}return o}
function inst(it){let v;
 for(let t=0;t<500;t++){v={};for(const[k,[lo,hi]]of Object.entries(it.params))v[k]=rnd(lo,hi);if(!it.where||ev(it.where,v))break}
 const o=Object.assign({},it,{prompt:fill(it.prompt,v),hint:fill(it.hint,v),explain:fill(it.explain,v),vars:v});
 if(it.choices)o.choices=it.choices.map(c=>fill(c,v));if(it.type==='numeric')o.answer=ev(String(it.answer),v);return o}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* draw n items from a pool, always including at least one parameterised item */
function drawSet(pool,n){pool=shuffle(pool);const gen=pool.filter(x=>x.params),out=[];if(gen.length)out.push(gen[0]);
 for(const it of pool){if(out.length>=n)break;if(!out.includes(it))out.push(it)}return shuffle(out).map(make)}
return{ev,fill,make,drawSet,shuffle,fmt,today,addDays,rand}})();
