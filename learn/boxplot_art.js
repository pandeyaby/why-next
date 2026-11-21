/* Data for flagboxplot (Box plots, ages 13–15). Sources: CCSS 6.SP.B.4 (display numerical data in box plots) and
   S-ID.A.1/A.2 (compare centre and spread of two or more data sets); DfE (2013) GCSE mathematics subject content S4
   (box plots; compare distributions using median and interquartile range); AQA and Edexcel GCSE mark schemes on
   comparing box plots (one comparison of an average and one of spread, in context). Quartiles use the median-of-halves
   rule taught in lesson 850, so each of the four parts of a box plot holds a quarter of the values. Slips it targets:
   a longer part holds more data, the median is the centre of the box, IQR read as Q3, range read as the maximum, and
   judging a group by its single highest value. */
const BXP=(()=>{
const NAMES=['Min','Q1','Median','Q3','Max'];
/* scene 1: place the five markers; axis 0-50 */
const DRAW={lo:0,hi:50,step:5,start:[0,10,30,35,50],sets:[
 {what:'Homework time (minutes)',five:[5,12,18,25,40]},
 {what:'Plant heights (cm)',five:[8,20,24,27,45]},
 {what:'Wait for a bus (minutes)',five:[2,6,15,33,48]}]};
/* scene 2: 12 values each, so each part of the plot holds exactly 3. five = [min, Q1, median, Q3, max] */
const SPLIT={lo:0,hi:45,step:5,sets:[
 {what:'Minutes to get to school',data:[4,6,7,9,10,11,13,14,16,22,30,41],five:[4,8,12,19,41]},
 {what:'Marks in a quiz (out of 45)',data:[3,12,20,26,28,30,32,33,35,37,39,42],five:[3,23,31,36,42]}]};
const PART=['left whisker','left part of the box','right part of the box','right whisker'];
/* scene 3: read values off a plot */
const READ={lo:0,hi:50,step:5,plots:[
 {what:'Reaction times (hundredths of a second)',five:[12,20,26,31,44]},
 {what:'Daily rainfall (mm)',five:[6,15,18,30,41]}],qs:[
 {p:0,q:'What is the median?',a:'26',o:[['25.5','centre'],['28','mid']]},
 {p:0,q:'What is the interquartile range (IQR)?',a:'11',o:[['31','q3'],['32','range']]},
 {p:0,q:'What is the range?',a:'32',o:[['44','max'],['11','iqr']]},
 {p:1,q:'What is the median?',a:'18',o:[['22.5','centre'],['23.5','mid']]},
 {p:1,q:'What is the IQR?',a:'15',o:[['30','q3'],['35','range']]},
 {p:1,q:'What is the range?',a:'35',o:[['41','max'],['15','iqr']]}]};
/* scene 4: compare two classes' test scores, axis 0-100 */
const COMP={lo:0,hi:100,step:10,A:[35,52,60,66,80],B:[20,45,55,72,95],qs:[
 {q:'Which class has the higher median?',a:'Class A (60)',o:[['Class B (95)','top'],['Class B (55)','box']]},
 {q:'Which class is more consistent?',a:'Class A: IQR 14',o:[['Class B: IQR 27','long'],['Class B: top score 95','top']]},
 {q:'Which comparison is fair?',a:'A did better on average and more consistently',o:[['B did better: its top score is higher','top'],['B is more consistent: its box is longer','long']]}]};
const FIX={
 centre:'That is the middle of the box. The median is the line inside the box, and it need not be in the centre.',
 mid:'That is halfway between min and max. Read the median line itself.',
 q3:'That is Q3 on its own. The IQR is a difference: Q3 − Q1.',
 range:'That is the range (max − min). The IQR only spans the box: Q3 − Q1.',
 max:'That is the largest value. The range is a difference: max − min.',
 iqr:'That is the IQR, the width of the box. The range runs whisker end to whisker end.',
 top:'One very high score does not tell you about the whole class. Compare the medians.',
 box:'Read the median line inside each box, then compare the two.',
 long:'A longer box means more spread, so less consistent. The smaller IQR is more consistent.'};
const ROBOT=[
 {say:'The median is always in the middle of the box.',ok:false,fix:'It can sit anywhere inside the box. Here it is near Q1.'},
 {say:'Each whisker holds about a quarter of the values.',ok:true,fix:'Right. Each whisker and each half of the box holds about 25%.'},
 {say:'A longer box means more people are in it.',ok:false,fix:'Each half of the box still holds 25%. Longer means more spread out.'},
 {say:'The IQR is the width of the box: Q3 − Q1.',ok:true,fix:'Right. It is the spread of the middle half of the data.'},
 {say:'The top value is 46, so most values are near 46.',ok:false,fix:'One value says little about the rest. Half the values are below the median, 22.'}];
const DESC=[
 'A number line with five markers: Min, Q1, Median, Q3 and Max. Drag each marker, or pick it with a button and step it, to the value given.',
 'A dot plot of 12 values above its box plot. Tap each of the four parts of the box plot to count the dots in it.',
 'A box plot on a number line. Three answers below. Tap the right one.',
 'Two box plots of test scores, Class A above Class B. Three answers below. Tap the right one.',
 'A robot says something about box plots. Tap Right or Slip.'];
const DONE=[
 'All 3 box plots drawn: whiskers to min and max, a box from Q1 to Q3, a line at the median.',
 'Every part held 3 of the 12 values: a quarter each, however long or short it looks.',
 'Median: read the line. IQR: Q3 − Q1. Range: max − min.',
 'Compare an average (the median) and a spread (the IQR), never just the top score.',
 'The robot slipped 3 times: the centre of the box, box length and one top value.'];
const QS=[
 {q:'A box plot has Q1 = 14 and Q3 = 30. What is the IQR?',a:'16',o:[['30','q3'],['44','add']]},
 {q:'A box plot runs from a minimum of 3 to a maximum of 50. What is the range?',a:'47',o:[['50','max'],['53','add']]},
 {q:'The left whisker is twice as long as the right one. Which holds more of the data?',a:'Neither: a quarter each',o:[['The left whisker','long'],['The right whisker','long']]},
 {q:'A box goes from 20 to 40 and its middle line is at 26. What is the median?',a:'26',o:[['30','centre'],['20','centre']]},
 {q:'X: median 50, IQR 8. Y: median 50, IQR 20. Which group is more consistent?',a:'X',o:[['Y','spread'],['Neither: the medians match','spread']]},
 {q:'Which five values does a box plot show?',a:'min, Q1, median, Q3, max',o:[['mean, mode, median, range, IQR','five'],['min, mean, median, mode, max','five']]}];
return{NAMES,DRAW,SPLIT,PART,READ,COMP,FIX,ROBOT,DESC,DONE,QS}})();
