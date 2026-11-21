/* Data for flagbeat (hearing the beat in songs, ages 2–3; EYFS Development Matters 2021 Communication and Language,
   birth to three: enjoy singing, music and toys that make sounds; Expressive Arts and Design, birth to three: move and
   dance to music, explore and respond to different sounds; 3 and 4 year olds: play instruments with increasing control;
   Letters and Sounds (DfES 2007) Phase 1 Aspect 3 body percussion and Aspect 4 rhythm and rhyme). The idea taught: a
   song has a steady beat, like a clock (tick, tick, tick); you can tap, clap or stomp in time with it; the beat can get
   faster or slower, and it can stop, and when it stops you stop; you can copy a short clap pattern of 2 or 3 claps.
   Slips it targets: tapping all the time instead of on the beat, keeping the old speed when the beat changes, carrying
   on when the music stops, and clapping too many or too few when copying. */
const BEA=(()=>{
/* the songs are traditional nursery rhymes; beats are the strong words a grown-up would clap on */
const DUKE={line:'Oh, the grand old Duke of York',beats:['Oh','grand','Duke','York','had','thou','men','up'],P:650,need:4};
/* faster: four big elephant steps, then six quick mouse steps (periods in ms) */
const SPEED={line:'Row, row, row your boat… then faster!',per:[800,800,800,800,400,400,400,400,400,400],slow:2,fast:2};
/* stop: three beats of song, then two beats of quiet; P is the period in ms */
const FREEZE={line:'Dance, dance… and FREEZE!',pat:[1,1,1,0,0],P:450,need:2};
/* copy my claps: what Teddy does, k = clap or stomp */
const COPY=[{k:'clap',n:2},{k:'clap',n:3},{k:'stomp',n:2}];
const BODY={clap:{e:'👏',t:'Clap'},stomp:{e:'🦶',t:'Stomp'},pat:{e:'🦵',t:'Pat knees'}};
const PLAY={slow:900,fast:450};
const DESC=[
 'The Duke marches along 8 hearts. Each heart lights up on the beat. A big drum to tap.',
 'Hearts far apart for slow elephant steps, then close together for fast mouse steps. A big drum to tap.',
 'Three hearts, then two stop signs. Tap on the hearts. Stop on the stop signs.',
 'Teddy claps or stomps. Then it is your turn. Two buttons: Clap and Stomp.',
 'Hearts light up on a beat. Pick clap, stomp or pat knees, and slow or fast, then tap along.'];
const DONE=[
 'You tapped with the beat. The beat is steady, like a clock: tick, tick, tick.',
 'When the beat got faster, your taps got faster too. Big slow steps, then quick little steps.',
 'When the music stopped, you stopped. The beat can stop, so we listen and freeze.',
 'You copied Teddy: the same number, and clap or stomp, just like Teddy.',
 ''];
const QS=[
 {q:'The music stops. What do you do?',a:'🧊 Freeze',o:[['👏 Keep clapping','stop'],['🏃 Run around','stop']]},
 {q:'Teddy claps 2 times. Your turn!',a:'👏 👏',o:[['👏','count'],['👏 👏 👏','count']]},
 {q:'An elephant walks. What beat?',a:'🐘 Slow: stomp … stomp',o:[['🐭 Fast: tap tap tap','speed'],['🔇 No beat','steady']]},
 {q:'A mouse runs. What beat?',a:'🐭 Fast: tap tap tap',o:[['🐘 Slow: stomp … stomp','speed'],['🔇 No beat','steady']]},
 {q:'Which beat is steady, like a clock?',a:'❤️ · ❤️ · ❤️ · ❤️',o:[['❤️❤️ · · · ❤️ · ❤️','steady'],['❤️ · · · ❤️❤️❤️','steady']]},
 {q:'The song gets faster. Your claps…',a:'⏩ get faster too',o:[['🐢 stay slow','speed'],['🛑 stop','stop']]}];
return{DUKE,SPEED,FREEZE,COPY,BODY,PLAY,DESC,DONE,QS}})();
