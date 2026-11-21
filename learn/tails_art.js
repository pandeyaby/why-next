/* Data for the one-tailed and two-tailed tests flagship (flagtails), ages 16–18. A level Mathematics (DfE 2014
   content O2, R4; Edexcel/OCR/AQA statistics): binomial hypothesis tests, one- and two-tailed alternatives, the
   significance level split between both tails for a two-tailed test. All probabilities are exact for X ~ B(30, 0.5),
   computed by TAILS.pmf below: P(X ≥ 20) = 4.94%, P(X ≥ 21) = 2.14%, P(X ≤ 9) = 2.14%, P(X ≤ 10) = 4.94%,
   P(X ≥ 22) = 0.81%, P(X ≥ 20 or X ≤ 10) = 9.87%. */
const TAILS=(()=>{const N=30,P0=.5;
function pmf(n,p){const o=[];let c=1;for(let k=0;k<=n;k++){o.push(c*Math.pow(p,k)*Math.pow(1-p,n-k));c=c*(n-k)/(k+1)}return o}
const PM=pmf(N,P0),up=c=>PM.slice(c).reduce((a,b)=>a+b,0),dn=c=>PM.slice(0,c+1).reduce((a,b)=>a+b,0);
const pc=v=>(100*v).toFixed(2)+'%';
const CLAIMS=[['The coin is biased.',2],['This coin lands heads more often than tails.',0],['After the fix, fewer than 10% of phones are faulty.',1],
 ['The proportion of left-handers has changed from 10%.',2],['A dice shows a six less often than 1 in 6.',1],['The new drug cures more than 30% of patients.',0]];
const BINS=['H₁: p > p₀ (upper tail)','H₁: p < p₀ (lower tail)','H₁: p ≠ p₀ (two tails)'];
const WHICH=[{say:'Claim: fewer heads than tails. α = 5%.',side:'lo',a:.05},{say:'Claim: the coin is unfair. α = 10%.',side:'both',a:.10},{say:'Claim: more heads than tails. α = 1%.',side:'hi',a:.01}];
/* the largest critical region in one tail with probability at most a */
const cutHi=a=>{let c=N;while(c>0&&up(c-1)<=a)c--;return c},cutLo=a=>{let c=-1;while(c<N&&dn(c+1)<=a)c++;return c};
const QS=[
 {q:'“The coin is biased.” Which alternative hypothesis?',a:'H₁: p ≠ 0.5',o:[['H₁: p > 0.5','dir'],['H₁: p < 0.5','dir']]},
 {q:'A two-tailed test at 5%. What probability goes in each tail?',a:'At most 2.5%',o:[['At most 5%','whole'],['At most 10%','whole']]},
 {q:'X ~ B(30, 0.5), 20 heads. P(X ≥ 20) = 4.94%. Two-tailed at 5%: reject H₀?',a:'No: 4.94% is more than 2.5%',o:[['Yes: 4.94% is less than 5%','whole'],['Yes: 20 is more than 15','eye']]},
 {q:'Why must you choose one or two tails before seeing the data?',a:'Choosing after looking about doubles the chance of a false alarm',o:[['It makes the sums easier','easy'],['It does not matter when you choose','peek']]},
 {q:'“Fewer than 10% of phones are faulty after the fix.” Which test?',a:'One-tailed, H₁: p < 0.1',o:[['Two-tailed, H₁: p ≠ 0.1','both'],['One-tailed, H₁: p > 0.1','dir']]},
 {q:'Two-tailed 5%, X ~ B(30, 0.5). What is the critical region?',a:'X ≤ 9 or X ≥ 21',o:[['X ≥ 20','whole'],['X ≤ 10 or X ≥ 20','whole']]}];
return{N,P0,PM,up,dn,pc,CLAIMS,BINS,WHICH,cutHi,cutLo,QS}})();
