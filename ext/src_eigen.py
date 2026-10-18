from dsl import T, C, P, R, L, M
MC = "Matrices & Complex Numbers"
GE = "Geometry"

# ---------------------------------------------------------------- vectors in three dimensions (wave 4, prerequisites for eigenvectors, lines and planes)
T("v3_vectors_3d", R, GE, "Vectors in three dimensions", "16-18",
  "Represent vectors in three dimensions as column vectors and with i, j, k notation, find the vector between two points from their position vectors, and calculate magnitudes with √(x² + y² + z²)",
  ["Writes a vector in both column and i, j, k form",
   "Finds the vector from A to B by subtracting position vectors",
   "Calculates the magnitude of a 3-D vector"],
  "If {{name}} has the points A(1, 2, −1) and B(4, 0, 5), can they find the vector from A to B and its length?",
  ["N-VM.1", "N-VM.2"],
  [("gt_vectors_notation", "h", "Extends column vectors from two to three dimensions"),
   ("gt_3d_trig", "h", "The magnitude uses Pythagoras in three dimensions"),
   ("mo_scalar_vector", "s", "Builds on vectors having magnitude and direction")])

T("v3_unit_vectors", P, GE, "Unit vectors and parallel vectors", "16-18",
  "Find a unit vector in the direction of a given vector, and decide whether vectors are parallel by checking whether one is a scalar multiple of the other",
  ["Finds the unit vector in the direction of (2, −1, 2)",
   "Shows that two vectors are parallel",
   "Finds the value of a constant that makes two vectors parallel"],
  "If {{name}} is given the vectors (3, −6, 9) and (−1, 2, k), can they find k so that the vectors are parallel?",
  [],
  [("v3_vectors_3d", "h", "Uses 3-D vectors and their magnitudes"),
   ("gt_vector_proofs", "s", "Extends the parallel-vector test used in vector proofs")])

T("v3_scalar_product", P, GE, "The scalar (dot) product", "17-18",
  "Calculate the scalar product a·b = a₁b₁ + a₂b₂ + a₃b₃ = |a||b|cos θ, and use a·b = 0 to test whether vectors are perpendicular",
  ["Calculates a scalar product from components",
   "Shows that two vectors are perpendicular",
   "Explains how the two forms of the scalar product are related"],
  "If {{name}} is given the vectors (2, −1, 3) and (1, 5, 1), can they decide whether the vectors are perpendicular?",
  [],
  [("v3_vectors_3d", "h", "Works with components and magnitudes of vectors"),
   ("gt_cosine_rule", "s", "The cosine rule links the two forms of the scalar product")])

T("v3_angle_between", P, GE, "Angle between two vectors", "17-18",
  "Find the angle between two vectors using cos θ = a·b/(|a||b|), including angles in 3-D shapes",
  ["Finds the angle between two 3-D vectors",
   "Finds an angle in a cuboid using vectors",
   "Explains why a negative scalar product gives an obtuse angle"],
  "If {{name}} has the vertices of a triangle in 3-D, can they find one of its angles using vectors?",
  [],
  [("v3_scalar_product", "h", "Rearranges the scalar product to find the angle"),
   ("gt_trig_equations", "s", "Finds an angle from its cosine")])

T("v3_line_equation", R, GE, "Vector equation of a line", "17-18",
  "Write the equation of a line as r = a + tb in two or three dimensions, interpret a and b, and convert between vector, parametric and Cartesian forms",
  ["Writes the vector equation of the line through two points",
   "Finds the point on a line for a given parameter",
   "Converts a vector equation to Cartesian form"],
  "If {{name}} is given the points (1, 0, 2) and (3, 4, −1), can they write a vector equation of the line through them and check whether (5, 8, −4) lies on it?",
  [],
  [("v3_vectors_3d", "h", "Uses position and direction vectors"),
   ("v3_unit_vectors", "h", "Any multiple of the direction vector gives the same line"),
   ("al_line_from_points", "s", "Generalises the equation of a straight line"),
   ("sr_parametric_curves", "s", "The parameter t works as in parametric equations")])

T("v3_line_intersections", P, GE, "Intersecting, parallel and skew lines", "17-18",
  "Decide whether two lines in 3-D are parallel, intersect or are skew by comparing direction vectors and solving for the parameters, and find any point of intersection",
  ["Finds the point where two lines meet",
   "Shows that two lines are skew",
   "Explains why skew lines cannot happen in two dimensions"],
  "If {{name}} is given two lines in vector form, can they show whether they intersect, are parallel or are skew?",
  [],
  [("v3_line_equation", "h", "Works with vector equations of lines"),
   ("al_sys_elimination", "h", "Solves simultaneous equations for the parameters"),
   ("al_sys_types", "s", "An inconsistent system shows the lines do not meet")])

T("v3_line_angles", P, GE, "Angle between two lines", "17-18",
  "Find the acute angle between two lines using the scalar product of their direction vectors",
  ["Finds the angle between two intersecting lines",
   "Explains why only the direction vectors matter",
   "Gives the acute angle when the scalar product is negative"],
  "If {{name}} has two lines in vector form, can they find the acute angle between them?",
  [],
  [("v3_line_equation", "h", "Uses the direction vectors of lines"),
   ("v3_angle_between", "h", "Finds the angle between the direction vectors")])

T("v3_vector_product", P, GE, "The vector (cross) product", "17-18",
  "Calculate the vector product a × b, a vector perpendicular to both a and b with magnitude |a||b|sin θ, and use it to find normals and areas",
  ["Calculates a × b using the determinant layout",
   "Checks the result is perpendicular to both vectors",
   "Uses |a × b| to find the area of a triangle"],
  "If {{name}} has two direction vectors in a plane, can they find a vector perpendicular to both?",
  [],
  [("v3_scalar_product", "h", "Checks perpendicularity with the scalar product"),
   ("mx_3x3", "s", "Uses the same pattern as a 3×3 determinant"),
   ("gt_area_sine", "s", "The magnitude matches the ½ab sin C area idea")])

T("v3_plane_equation", R, GE, "Equations of a plane", "17-18",
  "Write the equation of a plane in the forms r·n = a·n, ax + by + cz = d and r = a + sb + tc, and identify a normal vector",
  ["Finds the Cartesian equation of a plane from a point and a normal",
   "Converts between vector and Cartesian forms",
   "Finds the plane through three points"],
  "If {{name}} has three points that are not on one line, can they find the Cartesian equation of the plane through them?",
  [],
  [("v3_scalar_product", "h", "A normal is perpendicular to every vector in the plane"),
   ("v3_line_equation", "h", "Extends vector equations from lines to planes"),
   ("v3_vector_product", "s", "Finds a normal from two direction vectors"),
   ("al_sys_three", "s", "A plane is the graph of a linear equation in three variables")])

T("v3_line_plane", P, GE, "Where a line meets a plane", "17-18",
  "Find the point where a line meets a plane, decide whether a line is parallel to or lies in a plane, and find the angle between a line and a plane",
  ["Finds the point of intersection of a line and a plane",
   "Shows that a line is parallel to a plane",
   "Finds the angle between a line and a plane using the normal"],
  "If {{name}} has a line and a plane, can they find where the line crosses the plane and the angle between them?",
  [],
  [("v3_plane_equation", "h", "Uses equations of planes"),
   ("v3_line_angles", "s", "Uses angles between direction vectors and normals")])

T("v3_plane_intersections", P, GE, "Intersections of planes and angles between planes", "17-18",
  "Find the line of intersection of two planes and the angle between two planes using their normals",
  ["Finds the line of intersection of two planes",
   "Finds the angle between two planes",
   "Explains why parallel planes have parallel normals"],
  "If {{name}} has two plane equations, can they find their line of intersection and the angle between the planes?",
  [],
  [("v3_plane_equation", "h", "Uses the normals and equations of planes"),
   ("al_sys_three", "h", "Solves two equations in three unknowns for a line of solutions"),
   ("mx_planes", "s", "Builds on arrangements of planes and consistency")])

T("v3_distances", P, GE, "Shortest distances to lines and planes", "17-18",
  "Find the shortest distance from a point to a line and from a point to a plane, using perpendicularity and the scalar product",
  ["Finds the foot of the perpendicular from a point to a line",
   "Finds the distance from a point to a plane",
   "Explains why the shortest distance is perpendicular"],
  "If {{name}} has a point and a plane, can they find how far the point is from the plane?",
  [],
  [("v3_line_plane", "h", "Finds where a perpendicular line meets the plane"),
   ("v3_scalar_product", "h", "Uses a·b = 0 to find the perpendicular")])

# ---------------------------------------------------------------- matrix tools
T("ev_transpose", P, MC, "The transpose of a matrix", "16-18",
  "Find the transpose of a matrix, use (AB)ᵀ = BᵀAᵀ, and recognise symmetric matrices as those with Aᵀ = A",
  ["Writes the transpose of a 2×3 matrix",
   "Checks (AB)ᵀ = BᵀAᵀ for a numerical example",
   "Identifies symmetric matrices"],
  "If {{name}} is given two matrices, can they show that the transpose of their product is the product of the transposes in reverse order?",
  [],
  [("mx_multiply", "h", "Uses matrix multiplication"),
   ("mx_notation", "s", "Rows and columns swap, so the order of the matrix changes")])

T("ev_matrix_powers", P, MC, "Powers of a matrix", "17-18",
  "Calculate powers of a square matrix by repeated multiplication, spot patterns, and prove a formula for Aⁿ by induction",
  ["Calculates A² and A³",
   "Conjectures a formula for Aⁿ from a pattern",
   "Proves the formula by induction"],
  "If {{name}} is given the matrix with rows (1, 2) and (0, 1), can they find a formula for its nth power and prove it?",
  ["N-VM.8"],
  [("mx_multiply", "h", "Multiplies matrices repeatedly"),
   ("mx_properties", "h", "Uses associativity of matrix multiplication"),
   ("sr_induction", "s", "Proves the general formula by induction")])

T("ev_transition_matrices", P, MC, "Transition matrices and Markov chains", "17-18",
  "Model a system that moves between states with fixed probabilities using a transition matrix, find the state distribution after n steps, and estimate the long-run distribution",
  ["Writes a transition matrix from a description",
   "Finds the distribution after three steps",
   "Estimates the long-run distribution with technology"],
  "If {{name}} knows the probabilities that a customer switches between two brands each month, can they predict the market shares after six months?",
  [],
  [("ev_matrix_powers", "h", "Uses powers of the transition matrix"),
   ("mx_matrix_vector", "h", "Applies the matrix to a state vector"),
   ("pb_conditional_formula", "s", "Entries are conditional probabilities")])

# ---------------------------------------------------------------- eigenvalues and eigenvectors
T("ev_eigen_meaning", C, MC, "Eigenvectors and eigenvalues", "17-18",
  "Explain that an eigenvector of a square matrix A is a non-zero vector v with Av = λv, so its direction is unchanged or reversed, and that λ is the corresponding eigenvalue",
  ["Checks whether a given vector is an eigenvector",
   "Finds the eigenvalue for a given eigenvector",
   "Explains why the zero vector is excluded"],
  "If {{name}} is given a matrix and the vector (1, 2), can they check whether it is an eigenvector and find the eigenvalue?",
  ["N-VM.11"],
  [("mx_matrix_vector", "h", "Multiplies a matrix by a vector"),
   ("mx_invariants", "h", "Invariant lines through the origin motivate eigenvectors"),
   ("v3_unit_vectors", "s", "Av = λv means Av is parallel to v")])

T("ev_characteristic_equation", P, MC, "The characteristic equation", "17-18",
  "Derive the characteristic equation det(A − λI) = 0 from Av = λv and solve it to find the eigenvalues of a 2×2 matrix",
  ["Explains why A − λI must be singular",
   "Forms the characteristic equation of a 2×2 matrix",
   "Solves it to find the eigenvalues"],
  "If {{name}} is given a 2×2 matrix, can they form its characteristic equation and find its eigenvalues?",
  [],
  [("ev_eigen_meaning", "h", "Starts from the definition Av = λv"),
   ("mx_determinant", "h", "Uses the determinant of a 2×2 matrix"),
   ("mx_identity_zero", "h", "Writes λv as λIv"),
   ("al_quad_formula", "h", "Solves the quadratic characteristic equation")])

T("ev_eigenvectors_2x2", P, MC, "Finding eigenvectors of a 2×2 matrix", "17-18",
  "Find an eigenvector for each eigenvalue of a 2×2 matrix by solving (A − λI)v = 0, recognising that the equations are dependent",
  ["Finds an eigenvector for each eigenvalue",
   "Explains why the two equations give the same line",
   "Checks the answer by calculating Av"],
  "If {{name}} has found that a matrix has eigenvalues 2 and 5, can they find an eigenvector for each?",
  [],
  [("ev_characteristic_equation", "h", "Needs the eigenvalues first"),
   ("al_sys_types", "h", "Solves a system with infinitely many solutions")])

T("ev_eigen_geometry", C, MC, "Interpreting eigenvalues geometrically", "17-18",
  "Interpret eigenvectors of a 2×2 transformation as directions of invariant lines through the origin and eigenvalues as scale factors along them (λ = 1 gives a line of invariant points, λ < 0 a reversal, λ = 0 a collapse onto a line)",
  ["Links eigenvectors to invariant lines through the origin",
   "Interprets eigenvalues of a reflection and a stretch",
   "Explains why a rotation through 90° has no real eigenvectors"],
  "If {{name}} is given the eigenvalues and eigenvectors of a transformation, can they describe what it does to the plane?",
  ["N-VM.12"],
  [("ev_eigenvectors_2x2", "h", "Uses eigenvectors of 2×2 matrices"),
   ("mx_transformations", "h", "Interprets matrices as transformations"),
   ("mx_invariants", "s", "Builds on invariant points and lines")])

T("ev_trace_det", P, MC, "Trace, determinant and eigenvalues", "17-18",
  "Use the facts that the eigenvalues sum to the trace and multiply to the determinant, and that a zero eigenvalue means the matrix is singular",
  ["Checks eigenvalues against the trace and determinant",
   "Writes the characteristic equation as λ² − (trace)λ + det = 0",
   "Explains why a singular matrix has an eigenvalue of 0"],
  "If {{name}} knows a 2×2 matrix has trace 7 and determinant 10, can they find its eigenvalues without the matrix entries?",
  [],
  [("ev_characteristic_equation", "h", "Rewrites the characteristic equation"),
   ("cx_roots_coefficients", "s", "Uses sums and products of roots")])

T("ev_complex_eigenvalues", C, MC, "Complex and repeated eigenvalues", "17-18",
  "Recognise that a real 2×2 matrix can have complex conjugate eigenvalues (as for a rotation) or a repeated eigenvalue with only one independent eigenvector (as for a shear), and interpret each case",
  ["Finds the complex eigenvalues of a rotation matrix",
   "Relates the modulus and argument of the eigenvalues to the transformation",
   "Shows that a shear has only one eigenvector direction"],
  "If {{name}} is given the matrix for a rotation of 60°, can they find its eigenvalues and explain why there are no real eigenvectors?",
  [],
  [("ev_eigen_geometry", "h", "Explains the missing real eigenvectors"),
   ("cx_conjugate_roots", "h", "Complex roots of a real quadratic come in conjugate pairs"),
   ("cx_modulus_argument", "s", "Interprets complex eigenvalues by modulus and argument")])

T("ev_eigen_3x3", P, MC, "Eigenvalues and eigenvectors of a 3×3 matrix", "17-18",
  "Find the eigenvalues of a 3×3 matrix from a cubic characteristic equation, using the factor theorem or technology, and find the corresponding eigenvectors",
  ["Forms the characteristic equation of a 3×3 matrix",
   "Factorises the cubic to find the eigenvalues",
   "Finds an eigenvector for each eigenvalue"],
  "If {{name}} is told that 2 is an eigenvalue of a 3×3 matrix, can they find the other eigenvalues and all the eigenvectors?",
  [],
  [("ev_eigenvectors_2x2", "h", "Extends the method from 2×2 matrices"),
   ("mx_3x3", "h", "Uses 3×3 determinants"),
   ("al_poly_division", "h", "Factorises the cubic with the factor theorem"),
   ("v3_vectors_3d", "h", "Eigenvectors are 3-D vectors"),
   ("v3_vector_product", "s", "An eigenvector can be found as a vector product of two rows")])

T("ev_diagonalisation", P, MC, "Diagonalising a matrix", "17-18",
  "Write a matrix as A = PDP⁻¹, with eigenvectors as the columns of P and eigenvalues on the diagonal of D, and know that this needs a full set of independent eigenvectors",
  ["Forms P and D for a 2×2 matrix",
   "Checks that PDP⁻¹ gives A",
   "Explains why a shear cannot be diagonalised"],
  "If {{name}} has found the eigenvalues and eigenvectors of a 2×2 matrix, can they write it in the form PDP⁻¹?",
  [],
  [("ev_eigenvectors_2x2", "h", "The columns of P are eigenvectors"),
   ("mx_inverse", "h", "Finds P⁻¹"),
   ("ev_complex_eigenvalues", "s", "Repeated eigenvalues may prevent diagonalisation")])

T("ev_powers_diagonal", P, MC, "Matrix powers by diagonalisation", "17-18",
  "Use Aⁿ = PDⁿP⁻¹ to find a general formula for powers of a diagonalisable matrix and to describe its long-run behaviour",
  ["Explains why PDP⁻¹ repeated n times gives PDⁿP⁻¹",
   "Finds a formula for Aⁿ",
   "Describes what happens to Aⁿ as n grows"],
  "If {{name}} has diagonalised a matrix, can they find a formula for its 20th power?",
  [],
  [("ev_diagonalisation", "h", "Needs the matrix in the form PDP⁻¹"),
   ("ev_matrix_powers", "h", "Extends direct calculation of powers")])

T("ev_symmetric", C, MC, "Symmetric matrices and orthogonal eigenvectors", "17-18",
  "Recognise that a real symmetric matrix has real eigenvalues and perpendicular eigenvectors, so it can be diagonalised with an orthogonal matrix P where P⁻¹ = Pᵀ",
  ["Shows that the eigenvectors of a symmetric matrix are perpendicular",
   "Normalises eigenvectors to form an orthogonal matrix",
   "Writes A = PDPᵀ"],
  "If {{name}} is given a 2×2 symmetric matrix, can they diagonalise it with an orthogonal matrix?",
  [],
  [("ev_diagonalisation", "h", "Special case of diagonalisation"),
   ("ev_transpose", "h", "Uses transposes and symmetric matrices"),
   ("v3_scalar_product", "h", "Checks that eigenvectors are perpendicular"),
   ("ev_eigen_3x3", "s", "Applies to 3×3 symmetric matrices too")])

T("ev_cayley_hamilton", P, MC, "The Cayley–Hamilton theorem", "17-18",
  "Use the Cayley–Hamilton theorem (a square matrix satisfies its own characteristic equation) to express powers and the inverse of a matrix in terms of lower powers",
  ["Verifies the theorem for a 2×2 matrix",
   "Uses it to write A³ in terms of A and I",
   "Uses it to find A⁻¹"],
  "If {{name}} knows a matrix satisfies A² − 5A + 6I = 0, can they use this to find A⁻¹?",
  [],
  [("ev_characteristic_equation", "h", "Substitutes the matrix into its characteristic equation"),
   ("ev_matrix_powers", "h", "Works with powers of the matrix"),
   ("mx_inverse", "s", "Checks the result against the 2×2 inverse formula")])

T("ev_long_run", M, MC, "Long-term behaviour from eigenvalues", "17-18",
  "Use eigenvalues and eigenvectors to predict the long-run behaviour of matrix models such as Markov chains and stage-structured populations: an eigenvalue of 1 gives a steady state, and the largest eigenvalue sets the growth rate",
  ["Finds the steady state of a Markov chain as an eigenvector",
   "Uses the dominant eigenvalue to describe long-run growth",
   "Explains why other terms die away"],
  "If {{name}} has a transition matrix for brand switching, can they find the long-run market shares as an eigenvector?",
  [],
  [("ev_transition_matrices", "h", "Models systems with matrices"),
   ("ev_powers_diagonal", "h", "Uses PDⁿP⁻¹ to see which terms dominate"),
   ("mx_networks", "s", "Extends matrix models of networks and data")])
