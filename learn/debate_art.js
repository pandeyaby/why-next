/* Data for flagdebate (formal debates, ages 12–14; DfE 2013 KS3 English spoken language: 'participating in formal
   debates and structured discussions, summarising and/or building on what has been said'). Format: World Schools
   Debating Championships rules (WSDC, 2026 edition) as taught by Debate England: two teams of three, proposition
   first and turns alternate; 8-minute main speeches; points of information only between the 1st and 7th minute;
   4-minute reply speeches by the 1st or 2nd speaker, opposition reply first and proposition last; no new
   arguments in a reply, though a new example for an existing argument is allowed. Sides are given, not chosen.
   Slips it targets: arguing only the side you believe, the opposition opening, the opposition getting the last
   word, straw-man and personal-attack rebuttals, answering a point with an unrelated one, offering a POI in
   protected time or in a reply, and saving a new argument for the reply. The motion and arguments are for practice. */
const DEBATE=(()=>{
const MOTION='This House would start secondary school at 10 am.';
const CARDS=[['Teenage body clocks run later, so pupils would be more awake.',0],['A later start clashes with parents’ work hours.',1],['Pupils who sleep more concentrate better in lessons.',0],
 ['After-school clubs and sport would finish in the dark.',1],['Fewer pupils would arrive late.',0],['Many teenagers would just go to bed later.',1]];
const SPEECH=['1st Proposition','1st Opposition','2nd Proposition','2nd Opposition','3rd Proposition','3rd Opposition','Opposition reply','Proposition reply'];
const MIX=[3,6,0,5,7,1,4,2];
const REB=[{said:'Teenage body clocks run later, so a 10 am start fits how they sleep.',opts:[['They say teenage body clocks run later. But many will just go to bed later too, so they gain little sleep.','ok'],['They say teenagers are too lazy to get up, which is an insult.','straw'],['The last speaker clearly stays up too late herself.','person']]},
 {said:'Pupils who sleep more do better in exams.',opts:[['They link sleep to results. We agree sleep matters, but a later start does not promise more sleep, so it does not promise better results.','ok'],['School dinners should be healthier too.','off'],['They think sleep is the only thing that matters in exams. That is silly.','straw']]},
 {said:'Fewer pupils would be late.',opts:[['They say fewer pupils would be late. But younger children still start at 9, so families would need two school runs.','ok'],['Their team is always late anyway.','person'],['School uniforms cost too much.','off']]}];
const NOTES=[['Clash: would a later start really mean more sleep?',1],['Clash: does more sleep mean better results?',1],['Clash: what happens to families and clubs?',1],['A brand-new argument: buses would cost less',0],['A new example for our sleep argument',1]];
const TXT=['A debate argues about one statement called the motion. The proposition argues for it and the opposition argues against it. Your side is given to you, so you argue it as well as you can.',
 'In World Schools debating, three speakers on each side take turns, and the proposition opens. Then each side gives a reply speech, opposition first, so the proposition has the last word.',
 'Rebuttal means answering the other side. First sum up their point fairly, in a sentence. Then show why it fails. Attack the argument, never the person.',
 'A point of information is a short question to the speaker from the other side. It may only be offered between the 1st and 7th minute of an 8-minute speech, never in a reply.',
 'A reply speech sums up the clashes: the big questions both sides argued. It must not bring in a new argument, but a new example for an old argument is fine.'];
const DESC=['The motion sits at the top, with one argument card and two zones: proposition and opposition. Drag the card to the side it helps, or use the buttons.',
 'Eight speech cards, mixed up, and eight empty slots. Tap the speeches in the order they are given.',
 'The other side has just made a point. Three replies are below. Drag the best reply into Your reply, or tap it.',
 'Two time bars: an 8-minute main speech and a 4-minute reply speech. Tap every minute when a point of information is allowed.',
 'Five notes from the debate. Tap each note to put it in your reply speech or leave it out, then check your reply.'];
const DONE=['Proposition argues for the motion and opposition against it, whatever you believe yourself.',
 'Prop, Opp, Prop, Opp, Prop, Opp, then the opposition reply and the proposition reply: the proposition speaks first and last.',
 'Each good reply summed up the point fairly, then showed why it fails. No straw men, no attacks on the speaker.',
 'Points of information: minutes 2 to 7 of a main speech only. The first and last minute are protected, and replies have none.',
 'Your reply sums up the three clashes and adds a new example for an old argument, with no new argument.'];
const MSG={wrongSide:(t,s)=>s?`“${t}” argues against the motion: it is a reason not to start at 10 am. It belongs to the opposition.`:`“${t}” is a reason to start at 10 am, so it helps the proposition.`,
 order:(want,got)=>got===1&&want===0?'The proposition always opens: their first speaker says what the motion means.':want===6&&got===7?'Replies flip: the opposition replies first, so the proposition gets the last word.':want<6&&got>=6?'Reply speeches come after all six main speeches.':`Next is the ${SPEECH[want]}. The sides take turns.`,
 straw:'That twists their point into something they never said. That is a straw man. Sum it up fairly first.',
 person:'That attacks the speaker, not the argument. It wins nothing with judges. Answer what they said.',
 off:'That is a new topic. It does not answer their point at all, so their point still stands.',
 first:'The first minute is protected, so the speaker can set out their case without being stopped.',
 last:'The last minute is protected, so the speaker can finish without being stopped.',
 reply:'Reply speeches have no points of information at all.',
 newArg:'A reply speech cannot bring in a new argument. The other side would have no chance to answer it.',
 dropped:'A reply speech should cover every big clash. One is missing.',
 example:'A new example that supports an argument you already made is allowed in a reply.'};
const QS=[{q:'What is the motion in a debate?',a:'The statement both sides argue for and against',o:[['The name of the winning team','motion'],['The first speaker’s own opinion','motion']]},
 {q:'In World Schools debating, who speaks first?',a:'The first proposition speaker',o:[['The first opposition speaker','order'],['The chair','order']]},
 {q:'When can a point of information be offered in an 8-minute speech?',a:'Between the 1st and 7th minute',o:[['At any time','poi'],['Only in the last minute','poi']]},
 {q:'They say homework helps memory. Which answer is fair rebuttal?',a:'“They say homework helps memory, but long tasks late at night cut the sleep memory needs.”',o:[['“They think homework is fun, which is silly.”','straw'],['“They clearly never do their own homework.”','person']]},
 {q:'Can a reply speech bring in a brand-new argument?',a:'No: it sums up the clashes already argued',o:[['Yes: save the best till last','newarg'],['Yes, if it is short','newarg']]},
 {q:'Who gives the last speech of the debate?',a:'The proposition reply speaker',o:[['The opposition reply speaker','order'],['The 3rd opposition speaker','order']]},
 {q:'You are put on the side you disagree with. What do you do?',a:'Argue it as well as you can',o:[['Refuse to speak','side'],['Argue the other side instead','side']]}];
/* canvas UI: wrapped text, a banner with a feedback line, cards and tap targets */
const ui=(getA,getG,S)=>{const OK='#047857',NO='#b91c1c',RIM='#64748b',PX='px system-ui,sans-serif';let A,g;const sync=()=>{A=getA();g=getG()},fz=n=>A.narrow?n:Math.round(n*1.1),dk=()=>A.col.dark,fg=()=>dk()?'#f1f5f9':'#0f172a';
 function wrap(t,max,font){g.font=font;const o=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(cur&&g.measureText(tr).width>max){o.push(cur);cur=w}else cur=tr}if(cur)o.push(cur);return o}
 function banner(t,tone){const font=`700 ${fz(15)}${PX}`,L=wrap(t,A.W-34,font),lh=fz(15)*1.3,h=L.length*lh+16;
  g.fillStyle=tone==='ok'?(dk()?'#14532d':'#dcfce7'):tone==='no'?(dk()?'#7f1d1d':'#fee2e2'):(dk()?'#1e293b':'#ffffff');A.paint.rrect(8,8,A.W-16,h,12);g.fill();
  g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'?OK:tone==='no'?NO:RIM;g.stroke();g.font=font;g.fillStyle=fg();g.textAlign='left';g.textBaseline='top';L.forEach((r,i)=>g.fillText(r,17,16+i*lh));
  let y=8+h+6;if(S.note){const f2=`700 ${fz(13)}${PX}`,L2=wrap(S.note,A.W-36,f2).slice(0,4);g.font=f2;g.fillStyle=S.bad?(dk()?'#fca5a5':NO):(dk()?'#86efac':OK);L2.forEach((r,i)=>g.fillText(r,18,y+i*fz(13)*1.3));y+=L2.length*fz(13)*1.3+6}return y}
 function card(r,t,st){st=st||{};g.fillStyle=st.no?'#fee2e2':st.ok?'#dcfce7':st.on?'#ede9fe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=st.no||st.ok||st.on?3:1.4;g.strokeStyle=st.no?NO:st.ok?OK:st.on?'#6d28d9':RIM;g.stroke();
  let n=fz(st.n||13),L;for(;;){L=wrap(t,r.w-14,`700 ${n}${PX}`);if(L.length*n*1.25<=r.h-6||n<=9)break;n--}g.font=`700 ${n}${PX}`;g.fillStyle='#0f172a';g.textAlign='center';g.textBaseline='middle';L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*n*1.25))}
 const w=f=>(...a)=>{sync();return f(...a)};return{wrap:w(wrap),banner:w(banner),card:w(card),fz:n=>{sync();return fz(n)},fg:()=>{sync();return fg()},dk:()=>{sync();return dk()}}};
return{ui,MOTION,CARDS,SPEECH,MIX,REB,NOTES,TXT,DESC,DONE,MSG,QS}})();
