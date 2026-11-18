/* Data for the cumulative binomial lab (flag_bcum.js; bundled in the main learn.js so the lab file stays small).
   A level Mathematics (DfE 2014 content, Statistics 2.4: calculate probabilities using the binomial distribution, including
   cumulative probabilities). X ~ B(12, 0.3) unless the lab changes p. pmf/cdf are computed exactly here and rounded to 4 d.p.
   only for display. WORDS: [phrase, lo, hi, slip]. TAILS: [event, k for 1 − P(X ≤ k), slip for k + 1]. RANGES: [event, top,
   bottom, slip]. CONTEXT: [situation, [[expression, ok 1/0, why]]]. */
const BCUMART=(()=>{const N=12;
const nCr=(n,r)=>{let v=1;for(let i=1;i<=r;i++)v=v*(n-r+i)/i;return v};
const pmf=(k,p,n=N)=>nCr(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k);
const cdf=(k,p,n=N)=>{let s=0;for(let i=0;i<=Math.min(k,n);i++)s+=pmf(i,p,n);return k<0?0:Math.min(1,s)};
const f4=v=>(Math.round(v*1e4)/1e4).toFixed(4);
const WORDS=[['at least 4',4,12,'"At least 4" keeps 4 itself, so it starts at 4, not 5.'],['fewer than 6',0,5,'"Fewer than 6" leaves 6 out: it stops at 5.'],
 ['more than 3',4,12,'"More than 3" leaves 3 out: it starts at 4.'],['between 3 and 7 inclusive',3,7,'Inclusive means both ends count: 3 and 7 are both in.'],['no more than 2',0,2,'"No more than 2" means 2 or fewer: 0, 1 and 2.']];
const TAILS=[['P(X ≥ 4)',3,'1 − P(X ≤ 4) also takes away 4 itself. "At least 4" keeps 4, so take away only 0 to 3.'],
 ['P(X > 5)',5,'"More than 5" already leaves 5 out, so take away 0 to 5: 1 − P(X ≤ 5).'],['P(X ≥ 1)',0,'"At least 1" is everything except 0: 1 − P(X ≤ 0).']];
const RANGES=[['P(3 ≤ X ≤ 7)',7,2,'Take away P(X ≤ 2), not P(X ≤ 3): 3 is inside the range and must stay.'],
 ['P(2 < X < 6)',5,2,'Strict on both sides: keep 3, 4, 5. That is P(X ≤ 5) − P(X ≤ 2).'],['P(4 ≤ X < 9)',8,3,'Keep 4 to 8: P(X ≤ 8) − P(X ≤ 3). The 9 is left out and the 4 is kept.']];
const CONTEXT=[['12 seeds, each grows with probability 0.3. Find P(at least 2 grow).',[['1 − P(X ≤ 1)',1,'At least 2 is everything except 0 and 1.'],['1 − P(X ≤ 2)',0,'That also removes 2, but "at least 2" keeps 2.'],['P(X ≤ 2)',0,'That is "at most 2", the other tail.']]],
 ['12 free throws, each scores with probability 0.3. Find P(fewer than 3 score).',[['P(X ≤ 2)',1,'Fewer than 3 is 0, 1 or 2.'],['P(X ≤ 3)',0,'That includes 3, but "fewer than 3" leaves 3 out.'],['1 − P(X ≤ 2)',0,'That is "at least 3", the opposite event.']]],
 ['12 emails, each is spam with probability 0.3. Find P(4 to 6 are spam, inclusive).',[['P(X ≤ 6) − P(X ≤ 3)',1,'Keep 4, 5 and 6: remove 0 to 3 from 0 to 6.'],['P(X ≤ 6) − P(X ≤ 4)',0,'That removes 4, but 4 is inside the range.'],['P(X ≤ 6) − P(X ≤ 4) + 1',0,'Probabilities cannot go above 1. Remove 0 to 3 instead.']]],
 ['12 bulbs, each fails with probability 0.3. Find P(more than 1 fails).',[['1 − P(X ≤ 1)',1,'More than 1 is 2 or more: everything except 0 and 1.'],['1 − P(X ≤ 0)',0,'That keeps 1, but "more than 1" leaves 1 out.'],['P(X ≥ 1)',0,'That is "at least 1", which includes exactly 1.']]]];
const BANK=[['Write P(X ≥ 7) using a cumulative probability.','1 − P(X ≤ 6)',[['1 − P(X ≤ 7)','tail7'],['P(X ≤ 7)','wrongside']]],
 ['"Fewer than 9 successes" is…','P(X ≤ 8)',[['P(X ≤ 9)','incl9'],['P(X < 8)','short']]],
 ['P(5 ≤ X ≤ 10) equals…','P(X ≤ 10) − P(X ≤ 4)',[['P(X ≤ 10) − P(X ≤ 5)','drop5'],['P(X ≤ 10) − P(X ≤ 4) − P(X = 5)','extra']]],
 ['X ~ B(12, 0.3). P(X ≤ 3) = 0.4925. What is P(X ≥ 4)?','0.5075',[['0.4925','same'],['1.4925','over']]],
 ['p rises from 0.3 to 0.5 with n = 12. What happens to P(X ≤ 3)?','It falls',[['It rises','rises'],['It stays the same','same3']]],
 ['"At most 2 fail" when X counts failures is…','P(X ≤ 2)',[['P(X < 2)','strict'],['1 − P(X ≤ 2)','flip']]]];
const WHY={tail7:'"At least 7" keeps 7, so take away 0 to 6 only: 1 − P(X ≤ 6).',wrongside:'P(X ≤ 7) is the lower tail. "At least 7" is the upper tail.',
 incl9:'"Fewer than 9" leaves 9 out, so it stops at 8.',short:'P(X < 8) stops at 7; "fewer than 9" includes 8.',drop5:'Taking away P(X ≤ 5) removes 5, which is inside the range.',
 extra:'P(X ≤ 10) − P(X ≤ 4) already keeps exactly 5 to 10. Do not remove 5 again.',same:'0.4925 is P(X ≤ 3). The complement is 1 − 0.4925 = 0.5075.',
 over:'Probabilities never exceed 1. Subtract from 1: 1 − 0.4925.',rises:'Bigger p moves the distribution right, so the lower tail shrinks: 0.4925 falls to about 0.0730.',
 same3:'Changing p changes every bar. With p = 0.5 the lower tail is only about 0.0730.',strict:'"At most 2" includes 2: P(X ≤ 2), not P(X < 2).',flip:'1 − P(X ≤ 2) is "more than 2", the opposite event.'};
return{N,nCr,pmf,cdf,f4,WORDS,TAILS,RANGES,CONTEXT,BANK,WHY}})();
