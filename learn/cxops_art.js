/* Data for the adding, subtracting and multiplying complex numbers flagship (flagcxops), ages 16–18. Pearson Edexcel
   A level Further Mathematics (9FM0) Core Pure 1, 2.1: "add, subtract and multiply complex numbers in the form x + iy";
   2.3: Argand diagrams, addition and subtraction as vectors; AQA 7367 B2: i² = −1 and arithmetic of complex numbers;
   multiplication by i is a rotation of +90° about O; |zw| = |z||w| and arg(zw) = arg z + arg w. Each pair is [re, im]. */
const CXO=(()=>{
const ADD={z:[2,1],goal:[5,3],start:[1,-1]};
const SUB={z:[4,3],goal:[1,-2],start:[0,0]};
const ROT={z:[3,1],goal:[-3,-1]};
const FOIL={a:[2,3],b:[4,-1],cells:[
 {q:'2 × 4',opts:[['8','ok'],['6','add'],['2','add']]},
 {q:'2 × (−i)',opts:[['−2i','ok'],['2i','sign'],['−2','drop']]},
 {q:'3i × 4',opts:[['12i','ok'],['7i','add'],['12','drop']]},
 {q:'3i × (−i)',opts:[['−3i²','ok'],['−3i','drop'],['3i²','sign']]}],
 final:[['11 + 10i','ok'],['5 + 10i','plus1'],['8 − 3i','cross']]};
const MUL={z:[1,1],goal:[0,4],start:[1,0]};
const QS=[
 {q:'(3 + 2i) + (1 − 5i) = ?',a:'4 − 3i',o:[['4 + 7i','sign'],['4 − 3i²','keepi']]},
 {q:'(5 + i) − (2 − 3i) = ?',a:'3 + 4i',o:[['3 − 2i','minus'],['7 − 2i','minus']]},
 {q:'(1 + 2i)(3 + i) = ?',a:'1 + 7i',o:[['5 + 7i','plus1'],['3 + 2i','cross']]},
 {q:'i × (2 + 5i) = ?',a:'−5 + 2i',o:[['5 + 2i','plus1'],['2 + 5i²','keepi']]},
 {q:'|z| = 2 and |w| = 3. What is |zw|?',a:'6',o:[['5','modadd'],['√13','modadd']]},
 {q:'(2 + i)(2 − i) = ?',a:'5',o:[['3','plus1'],['4 − i²','keepi']]}];
return{ADD,SUB,ROT,FOIL,MUL,QS}})();
