/* Data for the p-values flagship (flagpval), ages 16–18. A level Mathematics (DfE subject content, Statistics:
   "conduct a statistical hypothesis test for the proportion in the binomial distribution and interpret the results in
   context"; "understand ... p-value"); ASA (2016) Statement on Statistical Significance and P-Values. Probabilities
   are exact binomial sums, computed here and checked against Python (math.comb). */
const PVAL=(()=>{
const C=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};
const pmf=(n,p)=>Array.from({length:n+1},(_,k)=>C(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k));
const tailUp=(P,x)=>P.slice(x).reduce((a,b)=>a+b,0),tailDn=(P,x)=>P.slice(0,x+1).reduce((a,b)=>a+b,0);
const pct=v=>(100*v).toFixed(2)+'%';
/* two settings: a die suspected of too many sixes (upper tail) and a machine claimed to make fewer faults (lower tail) */
const DIE={name:'die',n:30,p0:1/6,p0s:'1/6',H1:'p > 1/6',side:'up',show:16,story:'Sam thinks a die lands on six too often. He rolls it 30 times. X = number of sixes. H₀: p = 1/6, H₁: p > 1/6.'};
const MACH={name:'machine',n:25,p0:.2,p0s:'0.2',H1:'p < 0.2',side:'dn',show:12,story:'A new machine is claimed to make fewer faulty parts than the old rate of 0.2. In 25 parts, X = number faulty. H₀: p = 0.2, H₁: p < 0.2.'};
[DIE,MACH].forEach(S=>S.P=pmf(S.n,S.p0));
const SHADE=[{S:DIE,x:10},{S:MACH,x:1}];
const DECIDE=[{x:8,a:.05},{x:9,a:.05},{x:10,a:.05},{x:10,a:.01}];
const MEAN={ask:'Sam gets p = 0.03. Sort each statement',zones:['True','False'],cards:[
 {t:'If H₀ were true, a result this extreme or more would happen about 3% of the time',to:0},
 {t:'There is a 3% chance that H₀ is true',to:1,why:'The p-value is worked out assuming H₀ is true. It cannot then be the chance that H₀ is true.'},
 {t:'At the 5% level, reject H₀',to:0},
 {t:'The die must be very biased',to:1,why:'A small p-value says the result is unusual under H₀. It says nothing about how big the bias is.'},
 {t:'At the 1% level, do not reject H₀',to:0},
 {t:'There is a 97% chance that H₁ is true',to:1,why:'1 − p is not the chance that H₁ is true. The p-value is a probability about data, given H₀.'}]};
const QS=[
 {q:'X ~ B(30, 1/6) under H₀, H₁: p > 1/6, and Sam sees 9 sixes. What is the p-value?',a:'P(X ≥ 9) = 5.06%',o:[['P(X = 9) = 3.09%','equal'],['P(X ≤ 9) = 98.03%','side']]},
 {q:'The p-value is 5.06% and α = 5%. What do you conclude?',a:'Do not reject H₀: not enough evidence that the die favours six',o:[['Reject H₀, because 5.06% is close to 5%','close'],['Accept that H₀ is true','prove']]},
 {q:'p = 0.02. Which sentence is right?',a:'If H₀ is true, results this extreme or more happen about 2% of the time',o:[['There is a 2% chance H₀ is true','prob'],['There is a 98% chance H₁ is true','prob']]},
 {q:'H₁: p < 0.2 and 1 faulty part in 25. Which probability is the p-value?',a:'P(X ≤ 1) = 2.74%',o:[['P(X ≥ 1) = 99.62%','side'],['P(X = 1) = 2.36%','equal']]},
 {q:'Test A gives p = 0.001 and test B gives p = 0.04. What can you say?',a:'A’s result is more surprising under its H₀, but neither p says how big the effect is',o:[['A has a bigger effect than B','size'],['A’s H₀ is 40 times less likely to be true','prob']]},
 {q:'At α = 5%, the critical region is X ≥ 10. Sam sees X = 11. What is true of the p-value?',a:'It is at most 5%, because 11 is in the critical region',o:[['It is more than 5%, because 11 is above 10','close'],['It equals P(X = 11)','equal']]}];
return{pmf,tailUp,tailDn,pct,DIE,MACH,SHADE,DECIDE,MEAN,QS}})();
