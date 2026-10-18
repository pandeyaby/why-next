from dsl import T, C, P, R, L, M
D = "Matrices & Complex Numbers"

# ---------------------------------------------------------------- matrices (wave 3)
T("mx_notation", R, D, "Matrices: notation and order", "16-18",
  "Use a matrix as a rectangular array of numbers, state its order (rows × columns), refer to entries by position, and use matrices to store data such as tables of sales or results",
  ["States the order of a given matrix",
   "Identifies the entry in row 2, column 3",
   "Represents a data table as a matrix"],
  "If {{name}} records a shop's sales of 3 products over 4 days, can they write it as a matrix and state its order?",
  ["N-VM.6"],
  [("gt_vectors_notation", "h", "A column vector is a matrix with one column, so matrices extend familiar notation"),
   ("st_two_way_tables", "s", "Rows and columns of a data table, such as sales by shop and day, can be stored as a matrix")])

T("mx_add_scalar", P, D, "Adding matrices and scalar multiples", "16-18",
  "Add and subtract matrices of the same order and multiply a matrix by a scalar, interpreting the results in context",
  ["Adds two 2×3 matrices",
   "Explains why matrices of different orders cannot be added",
   "Doubles every payoff in a game matrix"],
  "If {{name}} has matrices of sales for two weeks, can they find the total and the effect of a 10% increase?",
  ["N-VM.7", "N-VM.8"],
  [("mx_notation", "h", "Adding and scaling work entry by entry, so matrices must have the same order")])

T("mx_multiply", P, D, "Multiplying matrices", "16-18",
  "Multiply matrices using row-by-column products, decide when a product exists from the orders, and state the order of the result",
  ["Multiplies two 2×2 matrices",
   "Multiplies a 2×3 matrix by a 3×1 matrix",
   "Decides whether a product is defined"],
  "If {{name}} has a matrix of quantities bought and a matrix of prices, can they multiply them to find total costs?",
  ["N-VM.8"],
  [("mx_notation", "h", "Whether a product exists depends on the orders: columns of the first must equal rows of the second"),
   ("mx_add_scalar", "s", "Row-by-column products are learned after the simpler entry-by-entry operations")])

T("mx_properties", C, D, "Properties of matrix multiplication", "16-18",
  "Show that matrix multiplication is not commutative but is associative and distributive over addition, and explain what this means for algebra with matrices",
  ["Finds AB and BA and shows they differ",
   "Checks associativity for three matrices",
   "Explains why (A + B)² ≠ A² + 2AB + B² in general"],
  "If {{name}} multiplies two matrices in both orders, can they explain why the answers differ and what that means for algebra?",
  ["N-VM.9"],
  [("mx_multiply", "h", "Testing AB against BA and (AB)C against A(BC) needs fluent matrix multiplication"),
   ("al_equivalent_expr", "s", "The laws are compared with those for numbers, where ab = ba always holds")])

T("mx_identity_zero", C, D, "Zero and identity matrices", "16-18",
  "Explain that the zero matrix and the identity matrix I play the roles of 0 and 1 in matrix addition and multiplication",
  ["Writes the 2×2 and 3×3 identity matrices",
   "Shows that AI = IA = A",
   "Explains the role of the zero matrix"],
  "If {{name}} multiplies a matrix by I, can they explain why nothing changes and how I is like the number 1?",
  ["N-VM.10"],
  [("mx_multiply", "h", "AI = IA = A is checked by multiplying, which shows I acts like the number 1")])

T("mx_determinant", P, D, "Determinant of a 2×2 matrix", "16-18",
  "Calculate the determinant ad − bc of a 2×2 matrix and identify singular matrices (determinant zero)",
  ["Calculates a determinant",
   "Finds the value of k that makes a matrix singular",
   "Explains what 'singular' means"],
  "If {{name}} is given a matrix containing an unknown k, can they find the value of k that makes it singular?",
  [],
  [("mx_notation", "h", "ad − bc is calculated from the entries a, b, c and d in their positions"),
   ("al_create_equations", "s", "Finding the value of k that makes a matrix singular means solving det = 0")])

T("mx_inverse", P, D, "Inverse of a 2×2 matrix", "16-18",
  "Find the inverse of a non-singular 2×2 matrix, check that AA⁻¹ = I, and explain why a matrix with determinant zero has no inverse",
  ["Finds an inverse using the formula",
   "Checks the result by multiplication",
   "Explains why singular matrices have no inverse"],
  "If {{name}} is asked to undo a transformation given by a matrix, can they find the inverse matrix and check it?",
  ["N-VM.10", "A-REI.9"],
  [("mx_determinant", "h", "The inverse formula divides by the determinant, so a zero determinant means no inverse"),
   ("mx_identity_zero", "h", "An inverse is defined by AA⁻¹ = I, so the identity matrix must be understood")])

T("mx_inverse_product", C, D, "Inverse of a product", "17-18",
  "Prove and use (AB)⁻¹ = B⁻¹A⁻¹, explaining the reversed order with the 'socks and shoes' idea",
  ["Verifies the result with numerical matrices",
   "Proves it using associativity",
   "Explains why the order reverses"],
  "If {{name}} puts on socks then shoes, can they use this to explain why (AB)⁻¹ = B⁻¹A⁻¹?",
  [],
  [("mx_inverse", "h", "The result is about inverting a product, so 2×2 inverses must be secure"),
   ("mx_properties", "h", "The proof regroups (AB)(B⁻¹A⁻¹) as A(BB⁻¹)A⁻¹ using associativity")])

T("mx_matrix_vector", P, D, "Matrices acting on vectors", "16-18",
  "Multiply a column vector by a matrix of suitable order to produce a new vector, and see the matrix as an operation on vectors",
  ["Multiplies a 2×2 matrix by a column vector",
   "Finds the images of several points",
   "Explains the result as moving points"],
  "If {{name}} multiplies the vector (1, 2) by a matrix, can they plot the original and image points and describe what happened?",
  ["N-VM.11"],
  [("mx_multiply", "h", "A matrix times a column vector is a row-by-column product with a one-column result"),
   ("gt_vectors_notation", "h", "The matrix acts on column vectors, turning each one into a new column vector")])

T("mx_transformations", C, D, "2×2 matrices as transformations", "16-18",
  "Find and use matrices for reflections, rotations, enlargements and stretches, using the images of the unit vectors to build the matrix",
  ["Finds the matrix for a reflection in y = x",
   "Builds a matrix from the images of (1, 0) and (0, 1)",
   "Writes the matrix for a rotation by θ"],
  "If {{name}} needs the matrix for a 90° rotation about the origin, can they build it from where the unit vectors go?",
  ["N-VM.12"],
  [("mx_matrix_vector", "h", "Transforming a shape means multiplying each position vector by the matrix"),
   ("gt_transform_sequences", "h", "Reflections, rotations and enlargements described geometrically are now written as matrices"),
   ("gt_unit_circle", "s", "A rotation matrix contains cos θ and sin θ, the coordinates of the rotated unit vector")])

T("mx_det_area", C, D, "Determinant as area scale factor", "16-18",
  "Interpret the absolute value of a determinant as the area scale factor of a transformation and a negative determinant as a change of orientation",
  ["Finds the image area of a shape using the determinant",
   "Explains what a negative determinant means",
   "Explains why a singular matrix squashes the plane onto a line"],
  "If {{name}} transforms a triangle of area 5 by a matrix with determinant −3, can they find the new area and explain the sign?",
  ["N-VM.12"],
  [("mx_transformations", "h", "The area scale factor describes what a transformation matrix does to shapes"),
   ("mx_determinant", "h", "|ad − bc| is the area scale factor, and its sign shows whether orientation flips"),
   ("gt_area_volume_scale", "s", "An area scale factor was met with similar shapes, where it is k²")])

T("mx_composite", P, D, "Composite transformations as matrix products", "16-18",
  "Represent a sequence of transformations by a matrix product, explaining why BA means 'A first, then B'",
  ["Finds a single matrix for two successive transformations",
   "Explains the order of the product",
   "Identifies the single transformation equivalent to a composite"],
  "If {{name}} reflects a shape then rotates it, can they find one matrix for both and explain the order of multiplication?",
  [],
  [("mx_transformations", "h", "Each transformation in the sequence is written as its own matrix first"),
   ("mx_properties", "h", "BA and AB usually differ because matrix multiplication is not commutative")])

T("mx_invariants", C, D, "Invariant points and lines", "17-18",
  "Find invariant points and lines of a transformation by solving matrix equations, and distinguish lines of invariant points from invariant lines",
  ["Finds the line of invariant points of a reflection",
   "Finds invariant lines through the origin",
   "Explains the difference between the two ideas"],
  "If {{name}} has a shear matrix, can they find which points and lines it leaves unchanged?",
  [],
  [("mx_transformations", "h", "Invariant points and lines are properties of a transformation matrix"),
   ("al_sys_elimination", "h", "Finding invariant points means solving Mx = x, a pair of simultaneous equations")])

T("mx_matrix_equation", R, D, "Writing a linear system as a matrix equation", "16-18",
  "Represent a system of linear equations as a single matrix equation Ax = b, identifying the coefficient matrix and the vector of unknowns",
  ["Writes a 2×2 system as a matrix equation",
   "Writes a 3×3 system as a matrix equation",
   "Explains what each part represents"],
  "If {{name}} has two simultaneous equations, can they write them as one matrix equation?",
  ["A-REI.8"],
  [("mx_matrix_vector", "h", "Ax is a matrix acting on the vector of unknowns, giving the left-hand sides"),
   ("al_sys_elimination", "h", "The systems written as Ax = b are the ones already solved by elimination")])

T("mx_solve_inverse", P, D, "Solving systems with inverse matrices", "16-18",
  "Solve linear systems by x = A⁻¹b, and relate a zero determinant to systems with no solution or infinitely many solutions",
  ["Solves a 2×2 system using an inverse",
   "Checks the solution by substitution",
   "Explains what a zero determinant says about the system"],
  "If {{name}} solves a system with an inverse matrix and finds the determinant is zero, can they explain what this means for the solutions?",
  ["A-REI.9"],
  [("mx_matrix_equation", "h", "The method starts by writing the system as Ax = b with a coefficient matrix A"),
   ("mx_inverse", "h", "Multiplying both sides by A⁻¹ gives x = A⁻¹b, so the inverse must be found first"),
   ("al_sys_types", "s", "A zero determinant matches the parallel or identical lines met as systems with no unique solution")])

T("mx_3x3", P, D, "3×3 determinants and inverses with technology", "17-18",
  "Find 3×3 determinants and inverses, by hand for determinants and with technology for inverses, and use them to solve three-variable systems",
  ["Calculates a 3×3 determinant by cofactor expansion",
   "Uses a calculator to find a 3×3 inverse",
   "Solves a 3×3 system with an inverse"],
  "If {{name}} has three equations in three unknowns, can they solve them with a matrix inverse on a calculator?",
  ["A-REI.9"],
  [("mx_solve_inverse", "h", "The x = A⁻¹b method is extended from 2×2 systems to three equations in three unknowns"),
   ("al_sys_three", "h", "The three-variable systems solved by elimination are now solved with a 3×3 inverse")])

T("mx_planes", C, D, "Arrangements of three planes and consistency", "17-18",
  "Go beyond the unique-solution case to classify how three planes can meet (a sheaf through a common line, or inconsistent arrangements such as a prism or parallel planes), linking a zero determinant to these non-unique cases",
  ["Describes possible arrangements of three planes",
   "Decides whether a system is consistent",
   "Links a zero determinant to non-unique solutions"],
  "If {{name}} finds a 3×3 system has a zero determinant, can they describe how the three planes might be arranged?",
  [],
  [("mx_3x3", "h", "A zero 3×3 determinant signals that the three planes do not meet at a single point"),
   ("al_sys_types", "s", "The 2×2 cases of no solution or infinitely many are generalised to arrangements of planes")])

T("mx_networks", R, D, "Matrices for data and networks", "16-18",
  "Use matrices to represent networks and data, such as adjacency matrices for routes, and interpret products and powers of matrices (e.g. counting two-step routes)",
  ["Writes the adjacency matrix of a network",
   "Uses A² to count two-step routes",
   "Interprets a matrix product in a data context"],
  "If {{name}} has a map of direct flights between cities, can they use a matrix to count routes with exactly one change?",
  ["N-VM.6"],
  [("mx_multiply", "h", "Squaring an adjacency matrix counts two-step routes through row-by-column products"),
   ("mx_notation", "h", "Each entry of the adjacency matrix records the routes from one node to another")])

T("mx_3d_transformations", C, D, "Transformations in three dimensions", "17-18",
  "Use 3×3 matrices for reflections in coordinate planes and rotations about coordinate axes, and interpret the determinant as a volume scale factor",
  ["Writes the matrix for a reflection in the plane z = 0",
   "Writes the matrix for a rotation about the z-axis",
   "Interprets a 3×3 determinant as a volume scale factor"],
  "If {{name}} needs to rotate a 3-D model 90° about the z-axis, can they write the matrix and check it keeps volume the same?",
  [],
  [("mx_transformations", "h", "Building 2×2 matrices from the images of unit vectors is extended to three dimensions"),
   ("mx_3x3", "h", "A 3×3 determinant gives the volume scale factor of a 3-D transformation")])

# ---------------------------------------------------------------- complex numbers
T("cx_number_system", C, D, "The complex number system", "16-18",
  "Describe a complex number as a + bi with real part a and imaginary part b, place real and imaginary numbers within the complex numbers, and use the fact that two complex numbers are equal only if their real and imaginary parts are equal",
  ["Identifies real and imaginary parts",
   "Explains how the real numbers sit inside the complex numbers",
   "Uses equality of complex numbers to find unknowns"],
  "If {{name}} is told 3 + yi = x − 2i, can they find x and y and explain why?",
  ["N-CN.1"],
  [("al_complex_solutions", "h", "Complex numbers a + bi were first met as the solutions of quadratics with negative discriminant"),
   ("mt_b4lbTOJYwI", "s", "The complex numbers extend the chain of number sets from naturals to reals")])

T("cx_arithmetic", P, D, "Adding, subtracting and multiplying complex numbers", "16-18",
  "Add, subtract and multiply complex numbers using i² = −1 and the usual laws of algebra",
  ["Adds and subtracts complex numbers",
   "Multiplies (2 + 3i)(1 − i)",
   "Squares a complex number"],
  "If {{name}} multiplies (3 + 2i)(1 − 4i), can they simplify the result to a + bi?",
  ["N-CN.2"],
  [("cx_number_system", "h", "Adding and multiplying work on the real and imaginary parts of numbers in the form a + bi"),
   ("al_poly_multiply", "h", "Multiplying (a + bi)(c + di) is expanded like a pair of brackets, then i² is replaced by −1")])

T("cx_powers_i", P, D, "Powers of i", "16-18",
  "Find powers of i using the repeating cycle i, −1, −i, 1, and simplify expressions containing high powers of i",
  ["Lists i¹ to i⁸",
   "Simplifies i²⁷",
   "Explains why the pattern repeats every four powers"],
  "If {{name}} is asked for i¹⁰⁰, can they find it quickly and explain the pattern?",
  [],
  [("cx_arithmetic", "h", "Each power of i comes from multiplying the previous one by i, using i² = −1"),
   ("al_exponent_laws", "h", "Writing i³⁰ as (i⁴)⁷ × i² uses the laws of exponents to find its place in the cycle")])

T("cx_conjugates", P, D, "Complex conjugates and division", "16-18",
  "Find the conjugate of a complex number, use zz* = |z|², and divide complex numbers by multiplying the numerator and denominator by the conjugate",
  ["Finds z* and zz*",
   "Divides (3 + i) by (1 − 2i)",
   "Explains why multiplying by the conjugate gives a real denominator"],
  "If {{name}} needs to write (2 + i)/(3 − i) in the form a + bi, can they do it and explain the method?",
  ["N-CN.3"],
  [("cx_arithmetic", "h", "Multiplying z by its conjugate z* uses complex multiplication and gives a real number"),
   ("al_special_products", "s", "(a + bi)(a − bi) has the difference-of-two-squares structure"),
   ("al_surds", "s", "Dividing by multiplying top and bottom by the conjugate mirrors rationalising a surd denominator")])

T("cx_equating_parts", P, D, "Solving equations by equating parts", "16-18",
  "Solve equations involving complex numbers by equating real and imaginary parts, including finding square roots of complex numbers",
  ["Finds the square roots of 3 + 4i",
   "Solves z + 2z* = 6 − i",
   "Checks solutions by substitution"],
  "If {{name}} is asked for the square roots of −5 + 12i, can they set up and solve equations for the real and imaginary parts?",
  [],
  [("cx_arithmetic", "h", "Expanding (a + bi)² = 3 + 4i needs complex multiplication before parts are equated"),
   ("cx_conjugates", "s", "Equations involving z* are rewritten with z = x + iy before equating parts"),
   ("al_sys_substitution", "h", "Equating real and imaginary parts gives two simultaneous equations, often solved by substitution")])

T("cx_argand", R, D, "The Argand diagram", "16-18",
  "Represent complex numbers as points or vectors on an Argand diagram with real and imaginary axes",
  ["Plots several complex numbers",
   "Reads a complex number from a diagram",
   "Shows z and z* and describes their relationship"],
  "If {{name}} plots 3 + 2i and its conjugate, can they describe the geometric relationship between them?",
  ["N-CN.4"],
  [("cx_number_system", "h", "The real and imaginary parts of a + bi become the coordinates (a, b)"),
   ("mt_hVpGOEz2kG", "h", "Plotting points on an Argand diagram uses ordinary coordinate axes, relabelled real and imaginary")])

T("cx_geometric_operations", R, D, "Complex arithmetic on the Argand diagram", "16-18",
  "Represent addition, subtraction and conjugation geometrically on the Argand diagram, treating complex numbers as vectors",
  ["Shows z + w as a parallelogram",
   "Shows z − w as a vector",
   "Explains conjugation as a reflection"],
  "If {{name}} plots z and w, can they show z + w and z − w on the diagram?",
  ["N-CN.5"],
  [("cx_argand", "h", "Sums, differences and conjugates are drawn as points and arrows on the Argand diagram"),
   ("gt_vectors_notation", "h", "Complex numbers add and subtract like column vectors, drawn head to tail"),
   ("cx_conjugates", "s", "The conjugate is shown as the reflection of a point in the real axis")])

T("cx_modulus_argument", P, D, "Modulus and argument", "16-18",
  "Find the modulus |z| and argument arg z of a complex number, choosing the argument in the correct quadrant (−π < θ ≤ π)",
  ["Finds the modulus of 3 − 4i",
   "Finds the argument of a number in the second quadrant",
   "Explains why tan⁻¹(b/a) alone can give the wrong argument"],
  "If {{name}} finds arg(−1 + i), can they get the right quadrant and explain why the calculator's answer needs adjusting?",
  ["N-CN.4"],
  [("cx_argand", "h", "The modulus is the length of the line from the origin, and the argument is its angle"),
   ("gt_unit_circle", "h", "Choosing the argument in the right quadrant uses the signs of cosine and sine around the circle"),
   ("gt_radians", "h", "Arguments are given in radians, in the principal range −π < θ ≤ π")])

T("cx_polar_form", R, D, "Modulus–argument form", "16-18",
  "Write complex numbers in modulus–argument form r(cos θ + i sin θ), convert between this and a + bi, and explain why both describe the same number",
  ["Writes 1 + i√3 in modulus–argument form",
   "Converts back to a + bi",
   "Explains why both forms describe the same point"],
  "If {{name}} is given 2(cos π/3 + i sin π/3), can they write it as a + bi and plot it?",
  ["N-CN.4"],
  [("cx_modulus_argument", "h", "r(cos θ + i sin θ) is written from the modulus r and argument θ"),
   ("gt_exact_trig", "s", "Exact values such as cos(π/3) = ½ turn modulus–argument form into exact a + bi form")])

T("cx_polar_multiplication", P, D, "Multiplying and dividing in modulus–argument form", "17-18",
  "Multiply and divide complex numbers in modulus–argument form by multiplying or dividing moduli and adding or subtracting arguments, and interpret multiplication as an enlargement with a rotation",
  ["Multiplies two numbers in modulus–argument form",
   "Divides two numbers in modulus–argument form",
   "Describes multiplication by i as a rotation by π/2"],
  "If {{name}} multiplies a complex number by 2i, can they describe the effect on the Argand diagram?",
  ["N-CN.5"],
  [("cx_polar_form", "h", "Products are found by multiplying moduli and adding arguments in modulus–argument form"),
   ("cx_arithmetic", "h", "The rule is checked by multiplying the same numbers in a + bi form")])

T("cx_distance_midpoint", P, D, "Distance and midpoint in the complex plane", "16-18",
  "Find the distance between two complex numbers as the modulus of their difference, and the midpoint as their average",
  ["Calculates |z − w|",
   "Finds the midpoint of two complex numbers",
   "Explains |z − w| geometrically"],
  "If {{name}} has two complex numbers, can they find the distance between them on the Argand diagram?",
  ["N-CN.6"],
  [("cx_modulus_argument", "h", "The distance between z and w is the modulus |z − w| of their difference"),
   ("cx_geometric_operations", "h", "z − w is drawn as the vector from w to z on the Argand diagram"),
   ("gt_partition_segment", "s", "The midpoint (z + w)/2 matches the coordinate midpoint formula")])

T("cx_loci", R, D, "Loci in the Argand diagram", "17-18",
  "Sketch loci such as |z − a| = r (a circle), |z − a| = |z − b| (a perpendicular bisector) and arg(z − a) = θ (a half-line), and shade regions defined by inequalities",
  ["Sketches |z − 2i| = 3",
   "Sketches |z − 1| = |z + i|",
   "Shades a region satisfying two conditions"],
  "If {{name}} is given |z − 3| ≤ 2 and arg z ≤ π/4, can they shade the region on an Argand diagram?",
  [],
  [("cx_distance_midpoint", "h", "|z − a| = r is the set of points a fixed distance r from a, a circle"),
   ("gt_loci", "s", "Loci such as the perpendicular bisector of two points were drawn in geometry"),
   ("gt_circle_equation", "s", "Writing |z − a| = r in x and y gives the Cartesian equation of a circle")])

T("cx_factorising", P, D, "Factorising polynomials over the complex numbers", "16-18",
  "Extend factorising to complex numbers, for example x² + 4 = (x + 2i)(x − 2i), and use factorisation to find all roots of a polynomial",
  ["Factorises x² + 9 over the complex numbers",
   "Factorises a quadratic with complex roots",
   "Explains how factors relate to roots"],
  "If {{name}} is asked to factorise x² + 25, can they do it using complex numbers?",
  ["N-CN.8"],
  [("cx_arithmetic", "h", "Checking x² + 4 = (x + 2i)(x − 2i) means expanding with complex multiplication"),
   ("al_diff_squares", "h", "x² + 4 is factorised as x² − (2i)², a difference of two squares"),
   ("al_poly_division", "s", "Once one factor is found, the factor theorem and division find the rest")])

T("cx_fta", C, D, "The fundamental theorem of algebra", "16-18",
  "State that every polynomial of degree n has exactly n complex roots counted with multiplicity, and show that this holds for quadratics",
  ["States the theorem",
   "Shows every quadratic has two complex roots, counted with multiplicity",
   "Predicts the number of roots of a quartic"],
  "If {{name}} is told a quartic has two real roots, can they explain how many complex roots it must have in total?",
  ["N-CN.9"],
  [("cx_factorising", "h", "Factorising over the complex numbers shows that every quadratic has two roots"),
   ("al_poly_zeros", "h", "Real roots appear as x-intercepts, while non-real roots do not appear on the graph")])

T("cx_conjugate_roots", P, D, "Solving polynomial equations with complex roots", "17-18",
  "Use the fact that non-real roots of real polynomials occur in conjugate pairs to solve cubics and quartics given one complex root",
  ["Finds the other roots of a cubic given one complex root",
   "Forms a quadratic factor from a conjugate pair",
   "Explains why the conjugate must also be a root"],
  "If {{name}} is told 2 + i is a root of a cubic with real coefficients, can they find the other two roots?",
  [],
  [("cx_fta", "h", "Knowing a cubic has three roots tells how many remain once a conjugate pair is found"),
   ("cx_conjugates", "h", "If a + bi is a root of a real polynomial, its conjugate a − bi is also a root"),
   ("al_poly_division", "h", "The conjugate pair gives a real quadratic factor, which is divided out to find the rest")])

T("cx_roots_coefficients", P, D, "Roots and coefficients of polynomials", "17-18",
  "Relate the sum and product of the roots of a polynomial to its coefficients, and form equations whose roots are transformed versions of the roots of a given equation",
  ["Writes the sum and product of the roots of a quadratic",
   "Uses the relations for a cubic",
   "Forms an equation whose roots are double the original roots"],
  "If {{name}} knows the roots of x² − 5x + 3 = 0 are α and β, can they find α² + β² without solving?",
  [],
  [("al_poly_zeros", "h", "Each root α gives a factor (x − α), so expanding links the roots to the coefficients"),
   ("cx_fta", "s", "The relations hold for all n complex roots, not just the real ones"),
   ("al_identities", "s", "Forming new equations uses identities such as α² + β² = (α + β)² − 2αβ")])

T("cx_de_moivre", P, D, "De Moivre's theorem", "17-18",
  "Use de Moivre's theorem (r(cos θ + i sin θ))ⁿ = rⁿ(cos nθ + i sin nθ) to calculate powers of complex numbers",
  ["Calculates (1 + i)⁸",
   "Shows (−1 + √3 i)³ = 8",
   "Proves the theorem for positive integers by induction"],
  "If {{name}} needs (1 + i)¹⁰, can they use modulus–argument form to find it without expanding?",
  ["N-CN.5"],
  [("cx_polar_multiplication", "h", "Multiplying z by itself n times multiplies the modulus and adds the argument each time"),
   ("sr_induction", "s", "The theorem for positive integers n is proved by induction on the power n")])

T("cx_nth_roots", P, D, "nth roots of complex numbers", "17-18",
  "Find the n nth roots of a complex number, including roots of unity, and show that they form a regular polygon on the Argand diagram",
  ["Finds the cube roots of 8",
   "Finds the fifth roots of unity",
   "Explains why the roots form a regular polygon"],
  "If {{name}} solves z³ = 1, can they find all three roots and describe their pattern on the Argand diagram?",
  [],
  [("cx_de_moivre", "h", "Finding nth roots reverses de Moivre's theorem: take the nth root of r and divide the argument by n"),
   ("gt_radians", "h", "The n roots have arguments spaced 2π/n apart, forming a regular polygon")])

T("cx_exponential_form", R, D, "Exponential form of a complex number", "17-18",
  "Write complex numbers as re^(iθ) using Euler's formula e^(iθ) = cos θ + i sin θ, and use this form for multiplication and powers",
  ["Writes 1 + i in exponential form",
   "Uses e^(iπ) = −1",
   "Multiplies numbers in exponential form"],
  "If {{name}} is shown e^(iπ) + 1 = 0, can they explain where it comes from using modulus–argument form?",
  [],
  [("cx_polar_form", "h", "re^(iθ) is a shorter way of writing the modulus–argument form r(cos θ + i sin θ)"),
   ("sr_maclaurin", "s", "Euler's formula can be motivated by comparing Maclaurin series"),
   ("al_exponent_laws", "h", "Multiplying re^(iα) by se^(iβ) adds the exponents, which is why arguments add")])
