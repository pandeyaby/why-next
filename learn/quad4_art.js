/* Data for the four-quadrant coordinates lab (flag_quad4.js; bundled in the main learn.js like decdiv_art.js so the lab file
   stays under 20 KB). Points are [x, y] on a −5..5 grid. fmt([x, y]) writes "(−3, 2)" with a true minus sign, and
   quad([x, y]) names the quadrant in plain words (or says the point is on an axis). */
const Q4ART={
fmt(p){const f=v=>(v<0?'−':'')+Math.abs(v);return`(${f(p[0])}, ${f(p[1])})`},
quad(p){const[x,y]=p;if(!x&&!y)return'the origin';if(!x)return'on the y-axis';if(!y)return'on the x-axis';return(y>0?'top ':'bottom ')+(x>0?'right':'left')},
PLOT:[[-3,2],[4,-1],[-2,-4]],
READ:[{p:[-4,3],opts:[['(−4, 3)','ok'],['(3, −4)','swap'],['(4, 3)','dropNeg']]},
 {p:[2,-5],opts:[['(2, −5)','ok'],['(−5, 2)','swap'],['(−2, −5)','signFlip']]},
 {p:[-1,-3],opts:[['(−1, −3)','ok'],['(1, 3)','dropNeg'],['(−3, −1)','swap']]}],
SHAPE:[{name:'rectangle',given:[[-3,2],[2,2],[2,-1]],miss:[-3,-1]},{name:'square',given:[[-2,1],[1,1],[1,-2]],miss:[-2,-2]}],
DIST:[{a:[-3,1],b:[4,1],opts:[['7','ok'],['1','subNeg'],['4','endOnly']]},
 {a:[2,-4],b:[2,1],opts:[['5','ok'],['3','subNeg'],['1','endOnly']]},
 {a:[-5,-2],b:[-1,-2],opts:[['4','ok'],['6','addNeg'],['1','endOnly']]}],
bank:[['Which quadrant is (−3, −5) in?','Bottom left',[['Top right','signIgnored'],['Bottom right','xSign']]],
['To plot (2, −4), how do you move from (0, 0)?','2 right, then 4 down',[['4 right, then 2 down','swap'],['2 left, then 4 up','signFlip']]],
['A point is 3 left and 5 up from the origin. What are its coordinates?','(−3, 5)',[['(5, −3)','swap'],['(3, 5)','dropNeg']]],
['How long is the line from (−2, 3) to (6, 3)?','8',[['4','subNeg'],['6','endOnly']]],
['Three corners of a square are (−1, 1), (2, 1) and (2, −2). Where is the fourth?','(−1, −2)',[['(−2, −1)','swap'],['(1, −2)','dropNeg']]],
['Which point is on the y-axis?','(0, −4)',[['(−4, 0)','axisMix'],['(−4, −4)','axisMix']]],
['Which point is furthest left?','(−5, 2)',[['(−2, 5)','negOrder'],['(2, −5)','negOrder']]]],
WHY:{signIgnored:'The signs tell you the quadrant. A negative x is left of the y-axis, and a negative y is below the x-axis: both negative is bottom left.',
 xSign:'Look at the x sign as well as the y sign. −3 is left of the origin, so the point is on the left.',
 signFlip:'A minus sign changes the direction: negative x goes left, negative y goes down. Positive goes right and up.',
 dropNeg:'The minus sign matters. (3, 5) is right of the y-axis; 3 left of the origin is x = −3.',
 endOnly:'The length is the number of squares from one end to the other, not one of the coordinates. Count across zero.',
 addNeg:'Both ends are on the same side of zero, so do not add. From −5 to −1 is 4 squares: −1 − (−5) = 4.',
 axisMix:'On the y-axis the point has not moved left or right, so its x-coordinate is 0. (−4, 0) is on the x-axis.',
 negOrder:'Furthest left means the smallest x. −5 is further left than −2, and a positive x is to the right.'}};
