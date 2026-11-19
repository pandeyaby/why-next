/* Data for flagskew (shape of a distribution, ages 14–16). Sources: CCSS HSS-ID.A.2 and A.3 (compare shape, centre and
   spread; interpret differences in shape) and 6.SP.A.2; AQA GCSE Statistics 8382 (shape of a distribution: symmetrical,
   positive and negative skew; bimodal); von Hippel (2005) "Mean, median, and skew: correcting a textbook rule", Journal
   of Statistics Education 13(2): the mean usually, but not always, lies on the tail side of the median. Slips it
   targets: naming skew by the side of the peak instead of the tail, thinking the mean and median always match, thinking
   a bimodal shape is one group, and thinking skew means the data is wrong. */
const SKW=(()=>{
const SHAPES=['Symmetric','Positive skew','Negative skew','Bimodal'];
/* scene 1: name the shape. counts for values 1..9; the answer is an index into SHAPES */
const NAME=[
 {n:[6,9,7,5,3,2,1,1,1],a:1},
 {n:[1,2,4,7,9,7,4,2,1],a:0},
 {n:[1,1,1,2,3,5,7,9,6],a:2},
 {n:[2,6,8,4,2,4,8,6,2],a:3},
 {n:[9,8,5,3,2,1,1,0,1],a:1},
 {n:[1,1,2,2,3,4,6,9,8],a:2}];
/* scene 2: build each shape by dragging bars. g1 is the moment skewness */
const BUILD=[{want:1,say:'a positive skew (tail to the right)'},{want:2,say:'a negative skew (tail to the left)'},{want:0,say:'a symmetric shape'}];
const START=[3,3,3,3,3,3,3,3,3];
const SHOW=[[3,8,8,6,4,3,2,1,1],[1,1,2,3,4,6,8,8,3],[1,3,5,7,8,7,5,3,1]];
/* scene 3: two groups (walkers and runners at a parkrun, minutes). gap between the group centres, in bars */
const RUN={c0:2,sd:1.1,peak:9,bars:12,start:2,min0:16,step:3};
/* scene 4: match the real data to its shape */
const CONTEXT=[
 {t:'Yearly pay of everyone in the UK',a:1,why:'Most people earn a middling amount, and a few earn far more, so the tail runs to the right.'},
 {t:'Heights of 15-year-old girls',a:0,why:'Heights pile up round the middle and thin out evenly on both sides.'},
 {t:'Age at death in the UK',a:2,why:'Most people die old, and fewer die young, so the tail runs to the left.'},
 {t:'Heights of everyone at a primary school, staff and pupils',a:3,why:'Two groups, children and adults, each have their own peak.'},
 {t:'Marks on a very easy test',a:2,why:'Most marks are near the top, with a few low marks trailing to the left.'},
 {t:'Number of goals in a football match',a:1,why:'Most games have 0 to 3 goals and a few have many, so the tail runs right.'}];
/* scene 5: which line is the mean? counts for values 1..9 and what is asked */
const SPOT=[
 {n:[10,8,4,2,2,2,2,2,3],ask:'mean'},
 {n:[3,2,2,2,2,2,4,8,10],ask:'mean'},
 {n:[8,10,5,3,2,2,2,2,2],ask:'median'},
 {n:[2,2,2,2,2,3,5,10,8],ask:'median'}];
const QS=[
 {q:'A histogram has its peak on the left and a long tail to the right. What is its shape?',a:'Positive skew',o:[['Negative skew','peakside'],['Symmetric','tailblind']]},
 {q:'Data is negatively skewed. Where is the mean, compared with the median?',a:'Usually lower than the median',o:[['Usually higher than the median','wayround'],['Always equal to the median','alwayssame']]},
 {q:'Times to finish a race have two clear peaks. What is the best explanation?',a:'Two groups, such as walkers and runners',o:[['A mistake in the data','mistake'],['One group with a big spread','onegroup']]},
 {q:'House prices in a town are positively skewed. Which average best shows a typical price?',a:'The median',o:[['The mean','pulled'],['The highest price','other']]},
 {q:'A distribution is symmetric with one peak. How do the mean and median compare?',a:'They are about the same',o:[['The mean is much higher','wayround'],['The median is much higher','wayround']]},
 {q:'Marks on a hard test bunch at the low end with a few high marks. What shape is it?',a:'Positive skew',o:[['Negative skew','peakside'],['Bimodal','onegroup']]}];
const SLIP={
 peakside:'Skew is named after the tail, not the peak. The long thin tail is on the right, so it is positive skew.',
 tailblind:'A symmetric shape has matching sides. This one has a long tail on one side, so it is skewed.',
 wayround:'The mean is pulled towards the tail. In negative skew the tail is on the left, so the mean is usually lower.',
 alwayssame:'The mean and median only match when the shape is symmetric. Skew pulls the mean towards the tail.',
 mistake:'Two peaks are not a mistake. They usually mean the data mixes two groups with different typical values.',
 onegroup:'One group with a big spread gives one wide hump. Two separate peaks point to two groups.',
 pulled:'The few very high prices drag the mean up, so the median shows a typical price better.',
 other:'The highest value is an extreme, not a typical value. For skewed data use the median.'};
const DESC=[
 'A histogram of 9 bars. Decide if its shape is symmetric, positive skew, negative skew or bimodal.',
 'A histogram of 9 bars you can drag up and down, with the mean and median marked. Build each shape.',
 'A histogram of parkrun finishing times for walkers and runners. Move the walkers\' times and watch the shape.',
 'A card describes some real data. Choose the shape its histogram would have.',
 'A skewed histogram with two lines, A and B. One is the mean and one is the median.'];
const DONE=['Skew is named after the tail.','The mean follows the tail.','Two groups make two peaks.','Real data has real shapes.','The mean sits on the tail side.'];
return{SHAPES,NAME,BUILD,START,SHOW,RUN,CONTEXT,SPOT,QS,SLIP,DESC,DONE}})();
