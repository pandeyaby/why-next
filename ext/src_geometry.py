from dsl import T, C, P, R, L, M
D = "Geometry"

# ---------------------------------------------------------------- angle reasoning and proof
T("gt_angle_reasoning", M, D, "Giving reasons in angle problems", "12-14",
  "Solve multi-step angle problems by chaining angle facts (on a line, at a point, vertically opposite, parallel lines, triangle sum), stating the geometric reason for every step",
  ["Finds an unknown angle in a diagram with parallel lines and a triangle",
   "Writes a correct reason for each step",
   "Spots a step where a reason is missing or wrong"],
  "If {{name}} finds a missing angle in a diagram with parallel lines, can they write down the geometric reason for every step?",
  ["7.G.5", "KS3.Maths.Geo.10", "KS3.Maths.Geo.11"],
  [("mt_tedML_iu4Y", "h", "Uses KS3 angle facts at a point and on a line"),
   ("mt_H_pNJ3ZI_S", "h", "Uses angles in parallel lines"),
   ("mt_j5YqQnN6xe", "s", "Builds on constructing mathematical arguments")])

T("gt_bearings", P, D, "Bearings", "13-15",
  "Measure, draw and calculate three-figure bearings, including back bearings found with parallel-line angle facts",
  ["Measures a bearing on a map",
   "Calculates a back bearing",
   "Draws a scale diagram of a journey on given bearings"],
  "If {{name}} knows a boat sails on a bearing of 070° from A to B, can they find the bearing of A from B?",
  ["KS3.Maths.Geo.3"],
  [("mt_H_pNJ3ZI_S", "h", "Back bearings use co-interior and alternate angles"),
   ("mt_Jf8xcX4UTq", "h", "Uses accurate angle measurement and scale drawings")])

T("gt_definitions", L, D, "Precise geometric definitions", "14-16",
  "State precise definitions of angle, circle, perpendicular and parallel lines and line segment, built from point, line, distance and arc, and explain why precise definitions are needed in proof",
  ["Writes a precise definition of a circle",
   "Spots a flaw in an imprecise definition",
   "Uses definitions to justify a statement"],
  "If {{name}} defines a circle as 'a round shape', can they improve the definition so it would work in a proof?",
  ["HSG-CO.A.1"],
  [("mt_WtIFJSCQIT", "h", "Builds on KS3 geometric terms and notation")])

T("gt_proof_lines_angles", M, D, "Proving theorems about lines and angles", "14-16",
  "Write proofs that vertical angles are equal, that alternate and corresponding angles are equal when lines are parallel, and that points on a perpendicular bisector are equidistant from the endpoints",
  ["Proves that vertically opposite angles are equal",
   "Writes a two-column or paragraph proof",
   "Distinguishes a proof from checking examples"],
  "If {{name}} is asked to prove that vertically opposite angles are always equal, can they write a proof that works for every case?",
  ["HSG-CO.C.9"],
  [("gt_angle_reasoning", "h", "Proof formalises reasoned angle chains"),
   ("gt_definitions", "h", "Proofs rely on precise definitions"),
   ("al_justify_steps", "s", "Justifying each step was practised in algebra")])

T("gt_counterexamples", M, D, "Conjectures, counterexamples and proof", "14-16",
  "Distinguish checking examples from proving, disprove false conjectures with a single counterexample, and explain why a general argument is needed",
  ["Finds a counterexample to a false geometric claim",
   "Explains why many examples do not prove a statement",
   "Turns a conjecture into a precise statement"],
  "If {{name}} hears that 'any quadrilateral with equal sides is a square', can they disprove it with one example?",
  [],
  [("mt_j5YqQnN6xe", "h", "Builds on constructing mathematical arguments"),
   ("mt_DNYQLahbfa", "s", "Counterexamples often come from quadrilateral properties")])

# ---------------------------------------------------------------- transformations and congruence
T("gt_rigid_motions", C, D, "Rigid motions and what they preserve", "14-16",
  "Define rotations, reflections and translations precisely, and compare transformations that preserve distance and angle (rigid motions) with those that do not, such as enlargements and stretches",
  ["Defines a rotation by centre and angle",
   "Explains why a reflection preserves lengths",
   "Classifies transformations by what they preserve"],
  "If {{name}} compares a reflection with an enlargement, can they say which keeps lengths the same and why?",
  ["HSG-CO.A.2", "HSG-CO.A.4"],
  [("mt_K0Y15w48SY", "h", "Builds on performing transformations on a grid"),
   ("gt_definitions", "h", "Uses precise definitions of perpendicular and parallel")])

T("gt_transform_sequences", P, D, "Sequences of transformations", "14-16",
  "Perform and describe sequences of transformations that map one figure onto another, find a single equivalent transformation, and show that order can matter",
  ["Maps a shape onto another with a reflection then a translation",
   "Finds a single transformation equivalent to two reflections",
   "Shows that reversing the order gives a different result"],
  "If {{name}} reflects a triangle in the y-axis then the x-axis, can they find a single transformation that does the same?",
  ["HSG-CO.A.5", "8.G.2"],
  [("gt_rigid_motions", "h", "Sequences are built from rigid motions")])

T("gt_centres", P, D, "Finding centres of rotation and enlargement", "14-16",
  "Find the centre and angle of a rotation and the centre and scale factor of an enlargement from an object and its image, using construction and coordinates",
  ["Finds a centre of rotation using perpendicular bisectors",
   "Finds a centre of enlargement by drawing rays",
   "Fully describes a transformation"],
  "If {{name}} is given a shape and its rotated image, can they find the centre of rotation?",
  ["KS3.Maths.Geo.8"],
  [("mt_K0Y15w48SY", "h", "Builds on describing transformations"),
   ("mt_y-BuQAfw4B", "h", "Builds on enlargement"),
   ("mt_ZrsqGVG-Wt", "s", "Perpendicular bisectors locate centres of rotation")])

T("gt_fractional_negative_enlarge", P, D, "Fractional and negative scale factors", "14-16",
  "Enlarge shapes using fractional scale factors (making them smaller) and negative scale factors (image on the opposite side of the centre, inverted)",
  ["Enlarges a shape by scale factor ½",
   "Enlarges a shape by scale factor −2",
   "Describes an enlargement with a negative scale factor"],
  "If {{name}} enlarges a triangle by scale factor −1 about the origin, can they predict where it ends up?",
  [],
  [("mt_y-BuQAfw4B", "h", "Extends enlargement to new scale factors"),
   ("mt_uDJY0X0hgo", "s", "Negative scale factors use directed numbers")])

T("gt_congruence_rigid", C, D, "Congruence defined by rigid motions", "15-17",
  "Define two figures as congruent when a sequence of rigid motions maps one onto the other, and use this to decide congruence and identify corresponding parts",
  ["Shows two triangles are congruent by describing rigid motions",
   "Identifies corresponding sides and angles",
   "Explains why congruent triangles have all corresponding parts equal"],
  "If {{name}} is given two triangles on a grid, can they show they're congruent by describing a sequence of rigid motions?",
  ["HSG-CO.B.6", "HSG-CO.B.7"],
  [("gt_transform_sequences", "h", "Congruence is defined by sequences of rigid motions"),
   ("mt_167X6Ax8P7", "h", "Builds on KS3 congruence criteria")])

T("gt_congruence_why", C, D, "Why the congruence criteria work", "15-17",
  "Explain why SSS, SAS, ASA and RHS guarantee congruence using rigid motions, and show with a counterexample why SSA does not",
  ["Explains why SAS guarantees congruence",
   "Constructs two different triangles with the same SSA information",
   "Chooses the right criterion for a pair of triangles"],
  "If {{name}} is told two triangles share two sides and a non-included angle, can they show the triangles might not be congruent?",
  ["HSG-CO.B.8"],
  [("gt_congruence_rigid", "h", "Criteria are justified using rigid motions"),
   ("gt_counterexamples", "s", "SSA is disproved by counterexample")])

T("gt_congruence_proofs", M, D, "Writing congruence proofs", "15-17",
  "Prove that triangles are congruent using a named criterion, and use congruence to prove further facts such as equal lengths or angles",
  ["Writes a congruence proof with reasons",
   "Uses congruent triangles to prove two segments are equal",
   "Explains which criterion was used and why"],
  "If {{name}} is asked to prove that the diagonals of a kite cross at right angles, can they use congruent triangles to do it?",
  ["HSG-SRT.B.5", "KS3.Maths.Geo.6"],
  [("mt_167X6Ax8P7", "h", "Uses the congruence criteria"),
   ("gt_proof_lines_angles", "h", "Builds on writing proofs with reasons")])

T("gt_proof_triangles", M, D, "Proving theorems about triangles", "15-17",
  "Prove theorems about triangles: interior angles sum to 180°, base angles of isosceles triangles are equal, the midpoint segment is parallel to the third side and half its length, and medians meet at a point",
  ["Proves the angle sum of a triangle using parallel lines",
   "Proves base angles of an isosceles triangle are equal",
   "Explains the midsegment theorem"],
  "If {{name}} is asked to prove that a triangle's angles add to 180°, can they do it using a parallel line?",
  ["HSG-CO.C.10"],
  [("gt_proof_lines_angles", "h", "Uses proved facts about parallel lines"),
   ("gt_congruence_proofs", "h", "Isosceles theorems use congruent triangles")])

T("gt_proof_parallelograms", M, D, "Proving properties of parallelograms", "15-17",
  "Prove that opposite sides and angles of a parallelogram are equal, that its diagonals bisect each other, and that a parallelogram with equal diagonals is a rectangle",
  ["Proves opposite sides of a parallelogram are equal",
   "Proves the diagonals bisect each other",
   "Proves a condition for a parallelogram to be a rectangle"],
  "If {{name}} is told a parallelogram's diagonals are equal, can they prove it must be a rectangle?",
  ["HSG-CO.C.11"],
  [("gt_congruence_proofs", "h", "Proofs use congruent triangles"),
   ("mt_DNYQLahbfa", "s", "Builds on KS3 properties of quadrilaterals")])

T("gt_formal_constructions", P, D, "Formal constructions and why they work", "15-17",
  "Carry out formal constructions (copy an angle, bisect segments and angles, perpendiculars, parallels, inscribed equilateral triangle, square and hexagon) and justify them with congruence",
  ["Copies an angle with compass and straightedge",
   "Constructs a regular hexagon inscribed in a circle",
   "Justifies the angle bisector construction with congruent triangles"],
  "If {{name}} bisects an angle with compasses, can they explain using congruent triangles why the construction works?",
  ["HSG-CO.D.12", "HSG-CO.D.13"],
  [("mt_ZrsqGVG-Wt", "h", "Builds on KS3 standard constructions"),
   ("gt_congruence_why", "h", "Justification uses congruence criteria")])

T("gt_loci", P, D, "Loci", "14-16",
  "Construct loci of points a fixed distance from a point or line, equidistant from two points or two lines, and shade regions that satisfy several conditions",
  ["Draws the locus of points 3 cm from a line segment",
   "Shades the region closer to A than B and within 5 cm of C",
   "Solves a practical loci problem such as placing a phone mast"],
  "If {{name}} must place a mast within 4 km of a town and equally far from two roads, can they use loci to find the possible positions?",
  [],
  [("mt_ZrsqGVG-Wt", "h", "Loci use perpendicular and angle bisector constructions")])

# ---------------------------------------------------------------- similarity
T("gt_dilations", C, D, "Properties of dilations", "15-17",
  "Verify that a dilation maps lines to parallel lines (or leaves lines through the centre unchanged) and multiplies all lengths by the scale factor",
  ["Shows that a dilated segment is parallel to the original",
   "Explains why lines through the centre are unchanged",
   "Checks that every length is scaled by k"],
  "If {{name}} dilates a triangle by scale factor 3 from a point outside it, can they say what happens to the side lengths and the directions of the sides?",
  ["HSG-SRT.A.1", "HSG-SRT.A.1.a", "HSG-SRT.A.1.b"],
  [("mt_y-BuQAfw4B", "h", "Builds on enlargement"),
   ("gt_rigid_motions", "s", "Contrasts dilations with rigid motions")])

T("gt_similarity_transformations", C, D, "Similarity via transformations", "15-17",
  "Define figures as similar when a sequence of rigid motions and dilations maps one onto the other, and explain that similar triangles have equal angles and proportional sides",
  ["Shows two figures are similar by describing transformations",
   "Explains why angles are preserved under dilation",
   "Uses proportional sides to test similarity"],
  "If {{name}} is given two triangles of different sizes, can they show they're similar by describing transformations?",
  ["HSG-SRT.A.2", "8.G.4"],
  [("gt_dilations", "h", "Dilations are the new ingredient in similarity"),
   ("gt_congruence_rigid", "h", "Similarity extends the transformation view of congruence")])

T("gt_aa_similarity", C, D, "The AA criterion for similar triangles", "15-17",
  "Establish that two triangles with two pairs of equal angles are similar, and use the criterion to identify similar triangles in diagrams with parallel lines",
  ["Explains why AA is enough to prove similarity",
   "Identifies similar triangles formed by a line parallel to one side",
   "States the scale factor between similar triangles"],
  "If {{name}} sees two triangles that share an angle and have parallel sides, can they explain why the triangles are similar?",
  ["HSG-SRT.A.3", "8.G.5"],
  [("gt_similarity_transformations", "h", "AA follows from the transformation definition"),
   ("mt_J03RFlVdas", "h", "Two equal angles force the third to be equal")])

T("gt_similar_lengths", P, D, "Lengths in similar shapes", "14-16",
  "Find missing lengths in similar triangles and shapes, including overlapping triangles, by finding a scale factor or setting up a proportion",
  ["Finds a missing side using a scale factor",
   "Separates overlapping similar triangles and labels corresponding sides",
   "Sets up and solves a proportion equation"],
  "If {{name}} has a smaller triangle inside a larger one with a parallel side, can they find a missing length?",
  ["KS3.Maths.Geo.9"],
  [("mt_y-BuQAfw4B", "h", "Builds on similarity as enlargement"),
   ("mt_5mIcmKRCgA", "h", "Uses direct proportion"),
   ("mt_QhFEDyIwSO", "s", "Proportions often need solving as equations")])

T("gt_area_volume_scale", P, D, "Area and volume scale factors", "15-17",
  "Use the facts that if lengths scale by k then areas scale by k² and volumes by k³ to solve problems about similar shapes and solids",
  ["Finds the area of an enlarged shape",
   "Finds a length scale factor from a volume ratio",
   "Explains why doubling lengths multiplies volume by 8"],
  "If {{name}} has two similar jugs and one is twice as tall, can they work out how many times more it holds?",
  [],
  [("gt_similar_lengths", "h", "Starts from the length scale factor"),
   ("mt_hCVPYlF-7Y", "h", "Uses squares and cubes and their roots")])

T("gt_similarity_proofs", M, D, "Proving theorems with similarity", "16-18",
  "Prove theorems using similar triangles, such as the side-splitter theorem and a proof of Pythagoras' theorem from the altitude to the hypotenuse",
  ["Proves that a line parallel to one side divides the others proportionally",
   "Proves Pythagoras' theorem using similar triangles",
   "Writes a similarity proof with reasons"],
  "If {{name}} draws the altitude to the hypotenuse of a right triangle, can they use similar triangles to prove Pythagoras' theorem?",
  ["HSG-SRT.B.4"],
  [("gt_aa_similarity", "h", "Proofs identify similar triangles by AA"),
   ("gt_congruence_proofs", "h", "Builds on writing geometric proofs")])

# ---------------------------------------------------------------- Pythagoras and trigonometry
T("gt_pythag_proof", M, D, "Proving Pythagoras' theorem and its converse", "14-16",
  "Explain a proof of Pythagoras' theorem (for example by rearranging areas) and use the converse to test whether a triangle is right-angled",
  ["Explains an area-based proof",
   "Tests whether 7, 24, 25 forms a right triangle",
   "Explains the difference between the theorem and its converse"],
  "If {{name}} is given a triangle with sides 9, 12 and 15, can they decide whether it is right-angled and explain the logic?",
  ["8.G.6"],
  [("mt_1VmTUxBrNd", "h", "Builds on applying Pythagoras' theorem"),
   ("mt_tAJH5BrpOx", "s", "Area-based proofs use area formulae")])

T("gt_3d_trig", P, D, "Pythagoras and trigonometry in 3-D", "15-17",
  "Find lengths and angles in 3-D shapes by identifying right-angled triangles, such as the space diagonal of a cuboid and the angle between a line and a plane",
  ["Calculates the length of the diagonal of a cuboid",
   "Finds the angle between a diagonal and the base",
   "Sketches the right triangle needed"],
  "If {{name}} has a box 30 × 40 × 120 cm, can they work out whether a 1.3 m rod fits inside diagonally?",
  ["8.G.7"],
  [("mt_1VmTUxBrNd", "h", "Uses Pythagoras' theorem"),
   ("gt_trig_problems", "h", "Uses right-triangle trigonometry"),
   ("mt_nRksLqt-iR", "s", "Requires visualising 3-D shapes")])

T("gt_trig_similar", C, D, "Why trigonometric ratios work", "14-16",
  "Explain that sine, cosine and tangent are well defined because all right triangles with the same acute angle are similar, so their side ratios are equal",
  ["Explains why the ratio opposite/hypotenuse is the same in similar triangles",
   "Measures ratios in different-sized triangles to check",
   "Defines sin, cos and tan as ratios"],
  "If {{name}} draws two different-sized right triangles with a 35° angle, can they explain why the ratio of opposite to hypotenuse is the same?",
  ["HSG-SRT.C.6", "KS3.Maths.Geo.14"],
  [("mt_KB_Czd7RQH", "h", "Builds on using sin, cos and tan"),
   ("gt_similar_lengths", "h", "The explanation rests on similar triangles")])

T("gt_complementary_trig", C, D, "Sine and cosine of complementary angles", "15-17",
  "Explain and use the relationship sin θ = cos(90° − θ) in right triangles",
  ["Explains the relationship using one right triangle",
   "Uses it to simplify an expression",
   "Finds an unknown angle from sin x = cos 20°"],
  "If {{name}} is told sin x = cos 25°, can they find x and explain why?",
  ["HSG-SRT.C.7"],
  [("gt_trig_similar", "h", "Uses the ratio definitions")])

T("gt_trig_problems", P, D, "Angles of elevation and depression", "14-16",
  "Solve real-world problems with right-triangle trigonometry and Pythagoras, including angles of elevation and depression, choosing the correct ratio",
  ["Finds the height of a building from an angle of elevation",
   "Draws a correct diagram from a word problem",
   "Rounds answers sensibly"],
  "If {{name}} stands 50 m from a tree and measures an angle of elevation of 32°, can they work out the tree's height?",
  ["HSG-SRT.C.8"],
  [("mt_KB_Czd7RQH", "h", "Applies right-triangle trigonometry"),
   ("gt_bearings", "s", "Some problems combine bearings and trig")])

T("gt_exact_trig", P, D, "Exact trigonometric values", "15-17",
  "Derive and recall exact values of sin, cos and tan for 0°, 30°, 45°, 60° and 90° from special triangles, giving answers in surd form",
  ["Derives sin 60° from an equilateral triangle",
   "Derives tan 45° from an isosceles right triangle",
   "Uses exact values to give a length in surd form"],
  "If {{name}} has no calculator, can they work out the exact value of cos 30° from a triangle?",
  ["F-TF.3"],
  [("gt_trig_similar", "h", "Uses ratio definitions in special triangles"),
   ("mt_1VmTUxBrNd", "h", "Special triangle sides come from Pythagoras"),
   ("al_surds", "h", "Answers are in surd form")])

T("gt_area_sine", P, D, "Area of a triangle using ½ab sin C", "15-17",
  "Derive and use the formula area = ½ab sin C for any triangle, using two sides and the included angle",
  ["Derives the formula from base × height",
   "Calculates the area of a non-right triangle",
   "Finds an angle given the area and two sides"],
  "If {{name}} has a triangular field with sides 80 m and 65 m meeting at 70°, can they find its area?",
  ["HSG-SRT.D.9"],
  [("mt_KB_Czd7RQH", "h", "The height is found with sine"),
   ("mt_ML5t7n2-U8", "h", "Builds on area = ½ × base × height")])

T("gt_sine_rule", P, D, "The sine rule", "15-17",
  "Prove and use the sine rule a/sin A = b/sin B = c/sin C to find missing sides and angles in non-right-angled triangles",
  ["Uses the sine rule to find a side",
   "Uses the sine rule to find an angle",
   "Explains when the sine rule is the right tool"],
  "If {{name}} knows two angles and one side of a triangle, can they find another side?",
  ["HSG-SRT.D.10", "HSG-SRT.D.11"],
  [("gt_area_sine", "h", "The sine rule follows from equal area expressions"),
   ("mt_QhFEDyIwSO", "s", "Finding unknowns means solving equations")])

T("gt_cosine_rule", P, D, "The cosine rule", "15-17",
  "Prove and use the cosine rule a² = b² + c² − 2bc cos A to find a side from two sides and the included angle, or an angle from three sides",
  ["Finds a side from two sides and the included angle",
   "Finds an angle from three sides",
   "Explains how the rule reduces to Pythagoras at 90°"],
  "If {{name}} knows all three sides of a triangle, can they find the largest angle?",
  ["HSG-SRT.D.10", "HSG-SRT.D.11"],
  [("mt_KB_Czd7RQH", "h", "Uses cosine"),
   ("mt_1VmTUxBrNd", "h", "Generalises Pythagoras' theorem"),
   ("al_formula_powers", "s", "Finding a side requires rearranging and square roots")])

T("gt_choose_trig", M, D, "Choosing the right trigonometric tool", "15-17",
  "Decide whether a problem needs right-triangle trigonometry, Pythagoras, the sine rule or the cosine rule from the information given, and solve multi-step problems",
  ["Explains which rule fits each set of given information",
   "Solves a problem needing two different rules",
   "Checks answers for plausibility"],
  "If {{name}} is given a surveying problem with two angles and a distance, can they choose the right rule and explain the choice?",
  ["HSG-SRT.D.11"],
  [("gt_sine_rule", "h", "Choosing requires knowing the sine rule"),
   ("gt_cosine_rule", "h", "Choosing requires knowing the cosine rule"),
   ("gt_trig_problems", "h", "Right-triangle methods are one of the options")])

T("gt_trig_graphs", R, D, "Graphs of sine, cosine and tangent", "15-17",
  "Sketch and interpret the graphs of y = sin x, y = cos x and y = tan x for angles in degrees, identifying period, amplitude, symmetries and asymptotes",
  ["Sketches y = sin x from 0° to 360°",
   "Uses the graph to find two angles with the same sine",
   "Explains why tan x has asymptotes"],
  "If {{name}} knows sin 30° = 0.5, can they use the graph to find another angle between 0° and 360° with the same sine?",
  ["F-IF.7e"],
  [("mt_KB_Czd7RQH", "h", "Graphs extend the trig ratios"),
   ("fm_key_features", "h", "Uses key features of graphs")])

T("gt_radians", C, D, "Radian measure", "16-18",
  "Define a radian as the angle subtended by an arc equal in length to the radius, convert between degrees and radians, and use radians in arc length s = rθ",
  ["Explains why 2π radians make a full turn",
   "Converts 135° to radians",
   "Uses s = rθ"],
  "If {{name}} wraps a piece of string the length of a radius round a circle, can they explain what angle it makes at the centre?",
  ["F-TF.1"],
  [("mt_svFa6_mjO_", "h", "Uses circumference 2πr"),
   ("gt_arc_sector", "h", "Radians simplify arc-length formulae")])

T("gt_unit_circle", C, D, "The unit circle", "16-18",
  "Use the unit circle to define sine and cosine for any angle as the coordinates of a point on the circle, explaining signs in each quadrant",
  ["Finds sin and cos of 150° from the unit circle",
   "Explains why cos is negative in the second quadrant",
   "Relates the unit circle to right-triangle definitions"],
  "If {{name}} sees a point on the unit circle at 210°, can they say what its coordinates tell them about sin 210° and cos 210°?",
  ["F-TF.2"],
  [("gt_radians", "h", "Angles on the unit circle are measured in radians"),
   ("gt_exact_trig", "h", "Exact values give key points on the circle"),
   ("mt_R4AY0LKxfl", "s", "Uses coordinates in all four quadrants")])

T("gt_trig_symmetry", C, D, "Symmetry and periodicity of trig functions", "16-18",
  "Use the unit circle to explain that sine and cosine are periodic with period 2π, that cosine is even and sine is odd, and identities such as sin(π − θ) = sin θ",
  ["Explains why sin(θ + 2π) = sin θ",
   "Explains why cos(−θ) = cos θ",
   "Uses symmetry to find related angles"],
  "If {{name}} knows sin(π/6) = ½, can they use symmetry to find sin(5π/6) and explain why?",
  ["F-TF.4"],
  [("gt_unit_circle", "h", "Symmetries are read from the unit circle"),
   ("gt_trig_graphs", "h", "Symmetries are visible on the graphs")])

T("gt_pythagorean_identity", P, D, "The identity sin²θ + cos²θ = 1", "16-18",
  "Prove sin²θ + cos²θ = 1 from the unit circle and Pythagoras, and use it to find one ratio from another and the quadrant",
  ["Proves the identity",
   "Finds cos θ given sin θ and the quadrant",
   "Uses the identity to simplify expressions"],
  "If {{name}} knows sin θ = 3/5 and θ is obtuse, can they find cos θ?",
  ["F-TF.8"],
  [("gt_unit_circle", "h", "The proof uses the unit circle"),
   ("mt_1VmTUxBrNd", "h", "The identity is Pythagoras on the unit circle")])

T("gt_trig_equations", P, D, "Solving trigonometric equations", "16-18",
  "Solve equations such as 2 sin x = 1 or cos 2x = 0.3 in a given interval, using inverse trig functions and symmetry to find every solution",
  ["Finds all solutions of sin x = 0.5 in 0 ≤ x < 2π",
   "Interprets solutions in context",
   "Explains why a calculator gives only one answer"],
  "If {{name}} solves sin x = 0.5 and gets 30°, can they find all the other solutions between 0° and 360°?",
  ["F-TF.7"],
  [("gt_trig_symmetry", "h", "Further solutions come from symmetry"),
   ("fm_inverse_functions", "h", "Uses inverse trig functions")])

T("gt_periodic_models", P, D, "Modelling periodic phenomena", "16-18",
  "Choose and fit trigonometric functions of the form y = A sin(B(x − C)) + D to periodic data such as tides, daylight hours or a Ferris wheel, interpreting amplitude, period and midline",
  ["Identifies amplitude, period and midline from data",
   "Writes a sine model for a Ferris wheel",
   "Uses the model to predict a value"],
  "If {{name}} has tide heights that rise and fall every 12.4 hours, can they write a sine model and use it to predict the height at a given time?",
  ["F-TF.5"],
  [("gt_trig_graphs", "h", "Models are built from trig graphs"),
   ("fm_transformations", "h", "A, B, C and D are graph transformations"),
   ("gt_radians", "s", "Many models use radian measure")])

# ---------------------------------------------------------------- circles
T("gt_circle_parts", L, D, "Chords, arcs, sectors, segments and tangents", "13-15",
  "Identify and use the vocabulary of circles beyond radius and diameter: chord, arc (minor and major), sector, segment, tangent",
  ["Labels each part on a diagram",
   "Distinguishes a sector from a segment",
   "Draws a tangent touching a circle at one point"],
  "If {{name}} is shown a slice of pizza and the piece cut off by a straight line, can they name each correctly?",
  [],
  [("mt_xq3YHZ2zeR", "h", "Builds on radius, diameter and circumference")])

T("gt_arc_sector", P, D, "Arc length and sector area", "14-16",
  "Calculate arc lengths and sector areas as fractions of the circumference and area of a circle, and solve problems involving composite shapes",
  ["Calculates the arc length for a 72° sector",
   "Calculates a sector area",
   "Finds the angle given the arc length"],
  "If {{name}} has a pizza slice with a 45° angle from a 30 cm pizza, can they find the length of its crust?",
  ["HSG-C.B.5"],
  [("mt_svFa6_mjO_", "h", "Uses circumference and area of a circle"),
   ("gt_circle_parts", "h", "Requires arc and sector vocabulary"),
   ("mt_xAf2bu9wYK", "h", "The sector is a fraction of the whole circle")])

T("gt_circle_angles", C, D, "Circle theorems: angles", "15-17",
  "Use circle theorems about angles: the angle at the centre is twice the angle at the circumference, angles in the same segment are equal, the angle in a semicircle is 90°, and opposite angles of a cyclic quadrilateral sum to 180°",
  ["Finds angles using the centre-circumference theorem",
   "Identifies a cyclic quadrilateral and uses its property",
   "Gives the theorem name as a reason"],
  "If {{name}} sees a triangle drawn in a semicircle, can they say what the angle opposite the diameter must be and why?",
  ["HSG-C.A.2"],
  [("gt_circle_parts", "h", "Theorems use chord, arc and segment vocabulary"),
   ("gt_angle_reasoning", "h", "Solutions chain facts with reasons"),
   ("mt_J03RFlVdas", "h", "Uses angle sums of triangles and quadrilaterals")])

T("gt_circle_tangents", C, D, "Circle theorems: tangents and chords", "15-17",
  "Use theorems that a tangent is perpendicular to the radius, two tangents from a point are equal, the perpendicular from the centre bisects a chord, and the alternate segment theorem",
  ["Finds an angle using tangent ⟂ radius",
   "Uses equal tangents to find a length",
   "Applies the alternate segment theorem"],
  "If {{name}} sees two tangents drawn from a point to a circle, can they explain why the tangents are the same length?",
  ["HSG-C.A.2"],
  [("gt_circle_parts", "h", "Uses tangent and chord vocabulary"),
   ("gt_angle_reasoning", "h", "Solutions chain facts with reasons")])

T("gt_circle_proofs", M, D, "Proving circle theorems", "16-18",
  "Prove circle theorems, such as the angle at the centre theorem and the angle in a semicircle, using isosceles triangles formed by radii",
  ["Proves the angle at the centre is twice the angle at the circumference",
   "Proves the angle in a semicircle is 90°",
   "Identifies the isosceles triangles a proof relies on"],
  "If {{name}} joins the centre to a point on the circle, can they use the isosceles triangles to prove the angle in a semicircle is a right angle?",
  ["HSG-C.A.2"],
  [("gt_circle_angles", "h", "Proves the theorems already used"),
   ("gt_proof_triangles", "h", "Uses isosceles triangle facts in proof")])

T("gt_inscribed_circles", P, D, "Inscribed and circumscribed circles", "16-18",
  "Construct the incircle and circumcircle of a triangle using angle bisectors and perpendicular bisectors, and prove properties of a cyclic quadrilateral",
  ["Constructs the circumcircle of a triangle",
   "Constructs the incircle",
   "Explains why the perpendicular bisectors meet at the circumcentre"],
  "If {{name}} needs a circle that passes through three villages, can they construct it and explain why it works?",
  ["HSG-C.A.3"],
  [("gt_formal_constructions", "h", "Uses bisector constructions"),
   ("gt_circle_angles", "h", "Uses cyclic quadrilateral properties")])

T("gt_circles_similar", C, D, "All circles are similar", "15-17",
  "Prove that any two circles are similar by a translation and a dilation, and explain why this makes π the same ratio for every circle",
  ["Describes transformations mapping one circle onto another",
   "Explains why circumference ÷ diameter is constant",
   "Finds the scale factor between two circles"],
  "If {{name}} is asked why π is the same for a coin and for the Earth's equator, can they explain using similarity?",
  ["HSG-C.A.1"],
  [("gt_similarity_transformations", "h", "Similarity is defined by transformations"),
   ("mt_svFa6_mjO_", "s", "Connects to the circumference formula")])

# ---------------------------------------------------------------- coordinate geometry
T("gt_partition_segment", P, D, "Midpoints and dividing a segment in a ratio", "14-16",
  "Find the midpoint of a segment and the point that divides it in a given ratio using coordinates",
  ["Finds the midpoint of a segment",
   "Finds the point dividing AB in the ratio 2:3",
   "Explains the method with a diagram"],
  "If {{name}} has points A(1, 2) and B(11, 7), can they find the point two-fifths of the way from A to B?",
  ["HSG-GPE.B.6"],
  [("mt_R4AY0LKxfl", "h", "Uses coordinates in four quadrants"),
   ("mt_nOCPx5qw0Z", "h", "Uses division in a ratio")])

T("gt_coord_area", P, D, "Perimeter and area from coordinates", "14-16",
  "Calculate perimeters and areas of polygons from vertex coordinates using the distance formula and decomposition",
  ["Finds the perimeter of a triangle from its vertices",
   "Finds the area of a quadrilateral by decomposing it",
   "Explains each step"],
  "If {{name}} is given the coordinates of a field's four corners, can they find its perimeter and area?",
  ["HSG-GPE.B.7"],
  [("mt_1VmTUxBrNd", "h", "Distances use Pythagoras"),
   ("mt_tAJH5BrpOx", "h", "Uses area formulae"),
   ("mt_R4AY0LKxfl", "h", "Uses coordinates")])

T("gt_coord_proofs", M, D, "Proving properties with coordinates", "15-17",
  "Use coordinates to prove simple geometric theorems, such as showing a quadrilateral is a parallelogram or rectangle, or a point lies on a circle",
  ["Proves a quadrilateral is a parallelogram using gradients",
   "Proves a triangle is right-angled using gradients or distances",
   "Proves a point lies on a circle"],
  "If {{name}} is given four vertices, can they prove whether the shape is a rectangle?",
  ["HSG-GPE.B.4"],
  [("al_parallel_perp", "h", "Uses gradient criteria for parallel and perpendicular lines"),
   ("mt_1VmTUxBrNd", "h", "Uses distances"),
   ("gt_partition_segment", "h", "Uses midpoints")])

T("gt_circle_equation", P, D, "The equation of a circle", "15-17",
  "Derive the equation of a circle with centre (a, b) and radius r from Pythagoras, and find centre and radius from equations, including by completing the square",
  ["Writes the equation of a circle with given centre and radius",
   "Reads centre and radius from (x − 3)² + (y + 1)² = 16",
   "Completes the square to find centre and radius"],
  "If {{name}} is given x² + y² − 6x + 4y − 3 = 0, can they find the centre and radius?",
  ["HSG-GPE.A.1"],
  [("mt_1VmTUxBrNd", "h", "The equation is Pythagoras' theorem"),
   ("al_complete_square", "h", "General forms need completing the square")])

T("gt_tangent_equation", P, D, "Equation of a tangent to a circle", "16-18",
  "Find the equation of the tangent to a circle at a given point using the perpendicular gradient to the radius",
  ["Finds the gradient of the radius",
   "Finds the perpendicular gradient",
   "Writes the tangent equation"],
  "If {{name}} is given the circle x² + y² = 25 and the point (3, 4), can they find the equation of the tangent there?",
  [],
  [("gt_circle_equation", "h", "Requires the circle's centre"),
   ("al_parallel_perp", "h", "Uses perpendicular gradients"),
   ("gt_circle_tangents", "h", "Tangent is perpendicular to radius")])

# ---------------------------------------------------------------- area and volume
T("gt_surface_area", P, D, "Surface area of prisms and cylinders", "13-15",
  "Calculate the surface area of prisms and cylinders from nets, including the curved surface of a cylinder",
  ["Draws the net of a cylinder and labels its dimensions",
   "Calculates the surface area of a triangular prism",
   "Solves a problem such as the label area of a can"],
  "If {{name}} wants to make a label for a can 12 cm tall and 7 cm across, can they work out the label's area?",
  ["7.G.6"],
  [("mt_vnJEztczji", "h", "Surface area is the area of the net"),
   ("mt_svFa6_mjO_", "h", "Cylinders need circle area and circumference"),
   ("mt_tAJH5BrpOx", "h", "Uses area formulae")])

T("gt_cone_sphere", P, D, "Volume of cones, pyramids and spheres", "14-16",
  "Use formulae for the volume of pyramids and cones (⅓ × base area × height) and spheres (4/3 πr³) to solve problems, including composite solids",
  ["Calculates the volume of a cone",
   "Calculates the volume of a hemisphere",
   "Finds a missing dimension from a volume"],
  "If {{name}} has an ice-cream cone topped by a hemisphere, can they work out the total volume?",
  ["8.G.9", "HSG-GMD.A.3"],
  [("mt_tAJH5BrpOx", "h", "Builds on volume of prisms"),
   ("mt_svFa6_mjO_", "h", "Uses circle area")])

T("gt_curved_surfaces", P, D, "Surface area of cones and spheres", "15-17",
  "Calculate the curved surface area of cones (πrl) and spheres (4πr²), finding the slant height with Pythagoras when needed",
  ["Calculates the surface area of a sphere",
   "Finds slant height then curved surface area of a cone",
   "Solves a composite surface area problem"],
  "If {{name}} has a conical party hat of radius 8 cm and height 15 cm, can they find how much card it needs?",
  [],
  [("gt_cone_sphere", "h", "Uses the same solids"),
   ("gt_surface_area", "h", "Builds on surface area of prisms"),
   ("mt_1VmTUxBrNd", "h", "Slant height comes from Pythagoras")])

T("gt_volume_arguments", C, D, "Why the volume formulae work", "16-18",
  "Give informal arguments for formulae for circumference, circle area, and volumes of cylinders, pyramids, cones and spheres using dissection and Cavalieri's principle",
  ["Explains why a cone is one-third of a cylinder",
   "Uses Cavalieri's principle to compare two solids",
   "Explains the 'slicing' argument for circle area"],
  "If {{name}} stacks coins straight and then slanted, can they explain why the volume is the same using Cavalieri's principle?",
  ["HSG-GMD.A.1", "HSG-GMD.A.2"],
  [("gt_cone_sphere", "h", "Justifies the formulae already used"),
   ("mt_5TBUFnCy5-", "s", "Builds on volume as additive")])

T("gt_cross_sections", R, D, "Cross-sections and solids of revolution", "15-17",
  "Identify the shapes of cross-sections of 3-D solids and the solids generated by rotating 2-D shapes about an axis",
  ["Describes cross-sections of a cone at different angles",
   "Identifies the solid made by rotating a rectangle",
   "Sketches a cross-section of a pyramid"],
  "If {{name}} spins a right triangle about one of its shorter sides, can they name the solid it traces out?",
  ["HSG-GMD.B.4", "7.G.3"],
  [("mt_nRksLqt-iR", "h", "Uses properties of 3-D shapes")])

T("gt_geometric_modelling", P, D, "Modelling with geometry: density and design", "15-17",
  "Model real objects with geometric solids to solve design problems, including density calculations such as mass from volume and population density from area",
  ["Models a tree trunk as a cylinder to estimate its mass",
   "Calculates population density from area",
   "Designs a container to meet constraints"],
  "If {{name}} models a log as a cylinder and knows the density of wood, can they estimate its mass?",
  ["HSG-MG.A.1", "HSG-MG.A.2", "HSG-MG.A.3"],
  [("gt_cone_sphere", "h", "Models use volume formulae"),
   ("pm_density", "h", "Uses density = mass ÷ volume"),
   ("mt_yqZiX6vS7D", "s", "Builds on real-world modelling")])

# ---------------------------------------------------------------- vectors
T("gt_vectors_notation", R, D, "Column vectors and vector arithmetic", "14-16",
  "Represent vectors as column vectors and directed line segments, and add, subtract and multiply vectors by scalars, linking to translations",
  ["Adds two column vectors and draws the result",
   "Multiplies a vector by a scalar",
   "Describes a translation with a column vector"],
  "If {{name}} walks 3 right and 2 up, then 1 right and 5 down, can they write the overall journey as one column vector?",
  ["N-VM.1", "N-VM.4a", "N-VM.5a"],
  [("mt_K0Y15w48SY", "h", "Translations are described with vectors"),
   ("mo_scalar_vector", "s", "Vectors have magnitude and direction")])

T("gt_vector_proofs", M, D, "Vector geometry proofs", "16-18",
  "Use vector algebra to prove geometric results such as points being collinear or lines being parallel",
  ["Expresses a path in terms of given vectors",
   "Shows two vectors are parallel",
   "Proves three points are collinear"],
  "If {{name}} is given a parallelogram described with vectors a and b, can they prove the diagonals bisect each other?",
  [],
  [("gt_vectors_notation", "h", "Uses vector arithmetic"),
   ("al_equivalent_expr", "h", "Simplifies vector expressions algebraically"),
   ("mo_vectors_resolve", "s", "Vectors were combined in physics")])
