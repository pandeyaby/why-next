/* Data for the cells, tissues and organs flagship (flagtissue), ages 7–9 (topic evidence; BBC Bitesize KS2/KS3 'Cells,
   tissues and organs'; NC England KS3 Biology 'the hierarchical organisation of multicellular organisms: from cells to
   tissues to organs to systems to organisms'). Cells are the tiny building blocks; a tissue is a group of the same kind
   of cell doing one job; an organ is made of different tissues working together; organs work together in an organ
   system; the systems together make the body. Slips it targets: thinking cells can be seen with the eye, mixing any
   cells into a tissue, an organ made of one tissue, organs put in the wrong system, and tissue bigger than organ. */
const TIS=(()=>{
const ZOOM=[{t:'Body',s:'Your whole body'},{t:'Organ system',s:'The circulatory system: heart and blood vessels'},{t:'Organ',s:'The heart, an organ'},{t:'Tissue',s:'Muscle tissue in the heart wall'},{t:'Cell',s:'One muscle cell, much too small to see by eye'}];
const KINDS=[{k:'muscle',t:'Muscle cell',c:'#dc2626'},{k:'nerve',t:'Nerve cell',c:'#ca8a04'},{k:'lining',t:'Lining cell',c:'#2563eb'}];
const TRAY=['muscle','nerve','lining','muscle','lining','nerve','muscle','nerve','muscle','lining','nerve','lining'];
const BUILD=[{k:'muscle',t:'muscle tissue',job:'squeezes and moves'},{k:'nerve',t:'nerve tissue',job:'carries messages'}];
const NEED=3;
const TISSUES=[{k:'muscle',t:'Muscle tissue',job:'churns the food',in:1},{k:'lining',t:'Lining tissue',job:'makes stomach juices',in:1},{k:'bone',t:'Bone tissue',job:'holds you up',in:0},{k:'nerve',t:'Nerve tissue',job:'tells the muscle when to squeeze',in:1}];
const SYSTEMS=['Circulatory','Digestive','Breathing'];
const ORGANS=[{t:'Heart',s:0},{t:'Stomach',s:1},{t:'Lungs',s:2},{t:'Blood vessels',s:0},{t:'Intestines',s:1},{t:'Windpipe',s:2}];
const JOBS=['moves blood round the body','breaks down food','takes in air'];
const LEVELS=['Cell','Tissue','Organ','Organ system','Body'];
const MIX=[2,0,4,1,3];
const T={
 zoomMiss:'Tap the part with the dashed ring to zoom in on it.',
 sameKind:(have,want)=>`That is a ${have}. A tissue is a group of similar cells doing one job, so ${want} is built from ${want.replace(' tissue','')} cells.`,
 bone:'The stomach has no bone. An organ is made of the tissues its job needs.',
 sys:[
  'The heart pumps blood. It belongs to the circulatory system, with the blood vessels.',
  'The stomach breaks down food. It belongs to the digestive system.',
  'The lungs take in air. They belong to the breathing system, with the windpipe.',
  'Blood vessels carry the blood that the heart pumps: circulatory system.',
  'The intestines take in food after the stomach: digestive system.',
  'The windpipe carries air to the lungs: breathing system.'],
 order:[
  'Start with the smallest: one cell.',
  'A tissue is a group of many cells, so it comes after the cell.',
  'An organ is made of several tissues, so it comes after tissue.',
  'An organ system is made of several organs working together, so it comes after the organ.',
  'The whole body is the biggest: all the systems together.']};
const DESC=[
 'A body outline with the heart in a dashed ring. Zoom from the body down to one cell.',
 'A tray of 12 cells: muscle cells, nerve cells and lining cells, and an empty tissue box.',
 'An empty stomach and four tissues: muscle, lining, bone and nerve.',
 'Six organs and three organ systems: circulatory, digestive and breathing.',
 'Five cards: cell, tissue, organ, organ system and body, and five spaces from smallest to biggest.'];
const DONE=[
 'Body, organ system, organ, tissue, cell. Your body is built from cells far too small to see with your eyes alone.',
 'Muscle tissue is built from muscle cells and nerve tissue from nerve cells. A tissue is a group of similar cells doing one job.',
 'Muscle, lining and nerve tissue make the stomach. An organ is made of different tissues working together.',
 'Heart and blood vessels, stomach and intestines, lungs and windpipe. Organs work together in an organ system.',
 'Cell, tissue, organ, organ system, body. Each level is made of lots of the one before it.'];
const QS=[
 {q:'What is a tissue?',a:'A group of similar cells doing one job',o:[['All sorts of cells mixed up','mix'],['One big cell','one']]},
 {q:'Which is bigger?',a:'An organ',o:[['A tissue','size'],['A cell','size']]},
 {q:'The stomach is made of muscle, lining and nerve tissue. So the stomach is…',a:'An organ',o:[['A tissue','organ'],['A cell','organ']]},
 {q:'Which system are the lungs part of?',a:'The breathing system',o:[['The circulatory system','sys'],['The digestive system','sys']]},
 {q:'Can you see one of your cells with just your eyes?',a:'No, you need a microscope',o:[['Yes, if you look closely','see'],['Yes, they are as big as a grain of rice','see']]},
 {q:'The heart and blood vessels work together. They make…',a:'An organ system',o:[['A tissue','organ'],['One cell','size']]}];
return{ZOOM,KINDS,TRAY,BUILD,NEED,TISSUES,SYSTEMS,ORGANS,JOBS,LEVELS,MIX,T,DESC,DONE,QS}})();
