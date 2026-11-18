/* Data for the critical regions lab (flag_critr.js; bundled in the main learn.js so the lab file stays small).
   Model under H₀: X ~ B(20, 0.3). Cumulative values to 4 d.p.: P(X ≤ 1) = 0.0076, P(X ≤ 2) = 0.0355, P(X ≤ 3) = 0.1071,
   P(X ≤ 8) = 0.8867, P(X ≤ 9) = 0.9520, P(X ≤ 10) = 0.9829. So at 5%: upper tail X ≥ 10 (4.80%), lower tail X ≤ 2 (3.55%);
   two-tailed at 5% (2.5% per tail): X ≤ 1 or X ≥ 11 (0.764% + 1.714% ≈ 2.48%). */
const CRITRART=(()=>{
const N=20,P0=.3,ALPHA=.05;
const PMF=(()=>{const o=[Math.pow(1-P0,N)];for(let k=0;k<N;k++)o.push(o[k]*(N-k)/(k+1)*P0/(1-P0));return o})();
const le=x=>PMF.slice(0,Math.max(0,x+1)).reduce((a,b)=>a+b,0),ge=x=>1-le(x-1);
const K={paper:'#fbfdff',ink:'#0f172a',dim:'#334155',axis:'#475569',bar:'#93c5fd',barEdge:'#1e40af',hot:'#c2410c',hotBg:'#fed7aa',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',sel:'#1d4ed8',selBg:'#dbeafe',hint:'#fff7ed'};
/* table tasks: [title, rows shown, right row, tail] */
const TABLE=[['H₁: p > 0.3 (upper tail). Tap the row you need.',[6,7,8,9,10,11,12],9,'up'],['H₁: p < 0.3 (lower tail). Tap the row you need.',[0,1,2,3,4,5,6],2,'low']];
/* decisions: [critical region text, lower end or -1, upper start or 99, observed x] */
const DECIDE=[['X ≥ 10',-1,10,12],['X ≥ 10',-1,10,10],['X ≥ 10',-1,10,9],['X ≤ 2',2,99,2],['X ≤ 2',2,99,3],['X ≤ 1 or X ≥ 11',1,11,10]];
/* actual significance level: [region, lower, upper, options (first right), why each wrong option is wrong] */
const ACTUAL=[['X ≥ 10',-1,10,['4.80%','5%','11.33%'],['5% is α, the limit. The region holds only P(X ≥ 10) = 4.80%.','11.33% is P(X ≥ 9). The region starts at 10.']],
 ['X ≤ 2',2,99,['3.55%','5%','10.71%'],['5% is α, the limit. The region holds P(X ≤ 2) = 3.55%.','10.71% is P(X ≤ 3). The region stops at 2.']],
 ['X ≤ 1 or X ≥ 11',1,11,['2.48%','5%','1.71%'],['5% is α. Add the two tails: 0.764% + 1.714% ≈ 2.48%.','1.71% is only the upper tail. Add the lower tail, 0.76%, too.']]];
const QS=[['H₀: p = 0.3, H₁: p > 0.3, n = 20, 5%. Critical region?','X ≥ 10',[['X ≥ 9','big'],['X ≥ 11','small']]],
 ['P(X ≤ 9) = 0.9520. Upper critical value at 5%?','10',[['9','off1'],['0.952','prob']]],
 ['Two-tailed test at 5%. How much probability may each tail hold?','At most 2.5%',[['At most 5%','split'],['Exactly 2.5%','exact']]],
 ['The critical region is X ≥ 10. You observe X = 10. Conclusion?','Reject H₀',[['Do not reject H₀','edge'],['H₁ is proved true','prove']]],
 ['Critical region X ≥ 10 for B(20, 0.3). Actual significance level?','4.80%',[['5%','alpha'],['95.2%','comp']]],
 ['H₀: p = 0.3, H₁: p < 0.3, n = 20, 5%. Critical region?','X ≤ 2',[['X ≤ 3','big'],['X ≥ 10','tail']]]];
return{N,P0,ALPHA,PMF,le,ge,K,TABLE,DECIDE,ACTUAL,QS}})();
