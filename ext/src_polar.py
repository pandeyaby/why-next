from dsl import T, C, P, R, L, M
GE = "Geometry"
CA = "Calculus"
MC = "Matrices & Complex Numbers"

# ---------------------------------------------------------------- trigonometric prerequisites (wave 4)
T("po_compound_angles", P, GE, "Compound-angle and double-angle formulae", "17-18",
  "Prove and use the addition formulae for sin(A ± B), cos(A ± B) and tan(A ± B), and derive the double-angle formulae, including cos 2A = 2cos²A − 1 = 1 − 2sin²A",
  ["Uses sin(A + B) to find the exact value of sin 75°",
   "Derives the three forms of cos 2A",
   "Rewrites cos²θ in terms of cos 2θ"],
  "If {{name}} needs the exact value of cos 15°, can they find it using a compound-angle formula?",
  ["F-TF.9"],
  [("gt_unit_circle", "h", "Uses sine and cosine of any angle"),
   ("gt_pythagorean_identity", "h", "Converts between the forms of cos 2A"),
   ("gt_exact_trig", "s", "Combines exact values of standard angles")])

T("po_double_angle_equations", P, GE, "Solving equations with double-angle formulae", "17-18",
  "Solve trigonometric equations such as sin 2θ = sin θ or cos 2θ = cos θ by rewriting with double-angle formulae and factorising, finding all solutions in a given interval",
  ["Rewrites sin 2θ as 2 sin θ cos θ and factorises",
   "Solves a quadratic in cos θ arising from cos 2θ",
   "Finds all solutions in 0 ≤ θ < 2π"],
  "If {{name}} needs to solve sin 2θ = cos θ for 0 ≤ θ < 2π, can they find every solution?",
  [],
  [("po_compound_angles", "h", "Uses the double-angle formulae"),
   ("gt_trig_equations", "h", "Finds all solutions of a trigonometric equation in an interval"),
   ("al_quad_factor_solve", "s", "Solves the resulting quadratic by factorising")])

# ---------------------------------------------------------------- the polar coordinate system
T("po_system", R, GE, "Polar coordinates", "16-18",
  "Locate points with polar coordinates (r, θ), using a pole and an initial line with θ measured anticlockwise in radians, and recognise that a point has many polar representations",
  ["Plots points given in polar coordinates",
   "Gives two different polar coordinates for the same point",
   "Explains the role of the pole and the initial line"],
  "If {{name}} is given the point (3, 2π/3) in polar coordinates, can they plot it and give another pair of polar coordinates for the same point?",
  [],
  [("gt_radians", "h", "Angles are measured in radians"),
   ("gt_unit_circle", "h", "Measures angles anticlockwise from the initial line"),
   ("gt_bearings", "s", "Bearings also locate points by distance and direction"),
   ("mt_qUGMyMYn9m", "s", "Builds on angles as amounts of turn")])

T("po_convert_points", P, GE, "Converting points between polar and Cartesian coordinates", "16-18",
  "Convert between polar and Cartesian coordinates using x = r cos θ, y = r sin θ, r = √(x² + y²) and tan θ = y/x, choosing θ in the correct quadrant",
  ["Converts (4, π/6) to Cartesian coordinates",
   "Converts (−2, 2) to polar coordinates",
   "Explains why tan⁻¹(y/x) alone can give the wrong angle"],
  "If {{name}} is given the Cartesian point (−3, −3), can they find its polar coordinates with θ in the right quadrant?",
  [],
  [("po_system", "h", "Works with polar coordinates"),
   ("gt_unit_circle", "h", "Uses x = r cos θ and y = r sin θ"),
   ("gt_trig_symmetry", "h", "Chooses the angle in the correct quadrant")])

T("po_convert_equations", P, GE, "Converting equations between polar and Cartesian form", "17-18",
  "Convert curve equations between polar and Cartesian form using r² = x² + y², x = r cos θ and y = r sin θ, recognising circles and lines in either form",
  ["Shows that r = 4 cos θ is a circle and finds its centre and radius",
   "Converts y = x² to polar form",
   "Converts r = 2 sec θ to a straight line"],
  "If {{name}} is given the polar equation r = 6 sin θ, can they find its Cartesian equation and describe the curve?",
  [],
  [("po_convert_points", "h", "Uses the conversion formulae"),
   ("gt_circle_equation", "h", "Recognises the Cartesian equation of a circle"),
   ("gt_pythagorean_identity", "s", "Simplifies expressions in sin θ and cos θ")])

T("po_polar_parametric", C, GE, "Polar curves as parametric curves", "17-18",
  "Treat a polar curve r = f(θ) as the parametric curve x = f(θ)cos θ, y = f(θ)sin θ with parameter θ",
  ["Writes a polar curve in parametric form",
   "Plots points of a polar curve from its parametric form",
   "Explains why this allows methods for parametric curves to be used"],
  "If {{name}} is given r = 1 + cos θ, can they write parametric equations for x and y in terms of θ?",
  [],
  [("po_convert_points", "h", "Uses x = r cos θ and y = r sin θ"),
   ("sr_parametric_curves", "h", "Uses parametric equations with a parameter")])

# ---------------------------------------------------------------- polar curves
T("po_standard_curves", R, GE, "Standard polar curves", "17-18",
  "Recognise and sketch standard polar curves: circles r = a and r = 2a cos θ, half-lines θ = α, spirals r = aθ, cardioids r = a(1 + cos θ) and roses r = a sin nθ",
  ["Sketches r = 3 and θ = π/4",
   "Sketches a spiral and a cardioid",
   "Matches polar equations to their curves"],
  "If {{name}} is shown four polar curves, can they match each to its equation and explain their choice?",
  [],
  [("po_system", "h", "Plots points in polar coordinates"),
   ("gt_trig_graphs", "h", "Uses the behaviour of sine and cosine")])

T("po_r_theta_graphs", R, GE, "Graphs of r against θ", "17-18",
  "Use a Cartesian graph of r against θ to see where r is greatest, smallest and zero, and so to sketch the corresponding polar curve",
  ["Draws the graph of r = 2 + cos θ against θ",
   "Reads off the maximum and minimum values of r",
   "Uses the graph to sketch the polar curve"],
  "If {{name}} has a graph of r against θ, can they use it to sketch the polar curve?",
  [],
  [("po_system", "h", "Interprets r and θ as polar coordinates"),
   ("gt_trig_graphs", "h", "Sketches graphs of trigonometric functions")])

T("po_symmetry", P, GE, "Symmetry of polar curves", "17-18",
  "Use symmetry to sketch polar curves and simplify calculations: if replacing θ by −θ leaves r unchanged, the curve is symmetric about the initial line",
  ["Tests a polar curve for symmetry in the initial line",
   "Tests for symmetry in the line θ = π/2",
   "Uses symmetry to sketch half a curve and reflect it"],
  "If {{name}} is given r = 2 + 3 cos θ, can they explain why the curve is symmetric about the initial line?",
  [],
  [("po_standard_curves", "h", "Recognises symmetric polar curves"),
   ("gt_trig_symmetry", "h", "Uses cos(−θ) = cos θ and sin(−θ) = −sin θ")])

T("po_sketching", P, GE, "Sketching polar curves", "17-18",
  "Sketch polar curves by finding where r is greatest, smallest and zero, using symmetry and tangents at the pole, and keeping to r ≥ 0 when that convention is used",
  ["Finds the values of θ where r = 0",
   "Sketches r = 2 sin 2θ for r ≥ 0",
   "Labels the greatest value of r"],
  "If {{name}} is given r = 3 cos 2θ, can they sketch the curve and show where it passes through the pole?",
  [],
  [("po_standard_curves", "h", "Builds on standard polar curves"),
   ("po_convert_points", "h", "Plots points from polar coordinates"),
   ("gt_trig_equations", "h", "Solves r = 0 for θ"),
   ("po_symmetry", "s", "Uses symmetry to reduce the work"),
   ("po_r_theta_graphs", "s", "Uses the graph of r against θ")])

T("po_families", R, GE, "Families of polar curves", "17-18",
  "Investigate how parameters change families of polar curves, such as limaçons r = a + b cos θ (with a dimple, cusp or inner loop) and roses r = a sin nθ (n petals for odd n, 2n petals for even n)",
  ["Describes how r = a + b cos θ changes as a/b changes",
   "Predicts the number of petals of a rose curve",
   "Uses technology to test a conjecture about a family of curves"],
  "If {{name}} is exploring r = a + 2 cos θ, can they describe how the shape changes as a increases from 1 to 5?",
  [],
  [("po_sketching", "h", "Sketches individual polar curves"),
   ("fm_transformations", "s", "Explores how parameters change graphs")])

T("po_intersections", P, GE, "Intersections of polar curves", "17-18",
  "Find where two polar curves meet by solving r₁(θ) = r₂(θ), checking the pole separately because it can be reached at different values of θ",
  ["Finds the intersections of r = 1 + cos θ and r = 3 cos θ",
   "Explains why the pole must be checked separately",
   "Gives intersections in polar coordinates"],
  "If {{name}} has a cardioid and a circle in polar form, can they find all their points of intersection?",
  [],
  [("po_sketching", "h", "Sketches the curves to see the intersections"),
   ("gt_trig_equations", "h", "Solves the resulting trigonometric equation"),
   ("po_double_angle_equations", "s", "Some intersection equations need double-angle formulae")])

T("po_modelling", M, GE, "Modelling with polar coordinates", "17-18",
  "Choose polar coordinates for contexts with a natural centre, such as radar, navigation, spiral growth or the paths of points on rotating objects, and explain when polar form is simpler than Cartesian",
  ["Describes a radar position in polar coordinates",
   "Models a spiral with a polar equation",
   "Explains why a circle about the pole is simpler in polar form"],
  "If {{name}} is describing the position of ships on a radar screen, can they explain why polar coordinates are a natural choice?",
  [],
  [("po_convert_equations", "h", "Moves between polar and Cartesian descriptions"),
   ("po_standard_curves", "h", "Uses standard polar curves as models"),
   ("fm_modelling_cycle", "s", "Follows the modelling cycle")])

# ---------------------------------------------------------------- calculus in polar coordinates
T("po_trig_integrals", P, CA, "Integrating sin² and cos² with double-angle identities", "17-18",
  "Integrate sin²θ, cos²θ and sin θ cos θ by rewriting them with double-angle formulae, as needed for polar areas",
  ["Integrates cos²θ using cos²θ = ½(1 + cos 2θ)",
   "Integrates sin²(3θ)",
   "Evaluates a definite integral of sin²θ over 0 to π"],
  "If {{name}} needs to find the integral of sin²θ from 0 to π, can they choose an identity that makes it integrable?",
  [],
  [("po_compound_angles", "h", "Rewrites squares with double-angle formulae"),
   ("ca_integrate_standard", "h", "Integrates sin and cos"),
   ("ca_substitution", "s", "Integrates cos 2θ as a reverse chain rule")])

T("po_area_formula", C, CA, "Area enclosed by a polar curve", "17-18",
  "Derive the area formula A = ½∫r²dθ by adding thin sectors of area ½r²δθ, and set up area integrals for polar regions",
  ["Explains the formula as a sum of thin sectors",
   "Chooses the limits for a region",
   "Sets up the integral for the area of a loop"],
  "If {{name}} wants the area inside one loop of a polar curve, can they explain where ½∫r²dθ comes from?",
  [],
  [("gt_arc_sector", "h", "Uses the sector area formula ½r²θ"),
   ("ca_definite_integral", "h", "The area is a definite integral"),
   ("po_sketching", "h", "Uses a sketch to choose the limits"),
   ("ca_riemann_sums", "s", "Adds thin pieces as in a Riemann sum")])

T("po_area_calc", P, CA, "Calculating areas in polar coordinates", "17-18",
  "Calculate areas enclosed by polar curves, such as the cardioid r = a(1 + cos θ) with area 3πa²/2 or one petal of a rose curve",
  ["Calculates the area enclosed by a cardioid",
   "Calculates the area of one petal of r = sin 3θ",
   "Uses symmetry to simplify an area calculation"],
  "If {{name}} is given r = 2(1 + cos θ), can they find the area it encloses?",
  [],
  [("po_area_formula", "h", "Applies the polar area formula"),
   ("po_trig_integrals", "h", "Integrates squared trigonometric terms"),
   ("po_symmetry", "s", "Uses symmetry to halve the integral")])

T("po_area_between", P, CA, "Areas between polar curves", "17-18",
  "Find the area of a region inside one polar curve and outside another, using intersections to find the limits",
  ["Finds the limits from the points of intersection",
   "Finds the area inside a circle and outside a cardioid",
   "Splits a region into parts with different curves"],
  "If {{name}} has r = 3 cos θ and r = 1 + cos θ, can they find the area inside the first curve but outside the second?",
  [],
  [("po_area_calc", "h", "Calculates polar areas"),
   ("po_intersections", "h", "Finds the limits from intersections"),
   ("ca_area_between", "s", "Extends areas between curves in Cartesian form")])

T("po_tangents", P, CA, "Tangents to polar curves", "17-18",
  "Find points on a polar curve where the tangent is parallel or perpendicular to the initial line by solving dy/dθ = 0 or dx/dθ = 0 for x = r cos θ, y = r sin θ",
  ["Finds where the tangent to a cardioid is parallel to the initial line",
   "Finds where the tangent is perpendicular to the initial line",
   "Interprets the results on a sketch"],
  "If {{name}} is given r = 1 + cos θ, can they find the points where the tangent is parallel to the initial line?",
  [],
  [("po_polar_parametric", "h", "Treats the curve parametrically"),
   ("sr_parametric_differentiation", "h", "Uses parametric differentiation"),
   ("ca_product_rule", "h", "Differentiates r(θ)cos θ and r(θ)sin θ")])

# ---------------------------------------------------------------- link to complex numbers (wave 3)
T("po_complex_link", C, MC, "Polar coordinates and modulus–argument form", "17-18",
  "Connect polar coordinates with modulus–argument form: the complex number with modulus r and argument θ sits at the polar point (r, θ), but the conventions differ (polar work often uses 0 ≤ θ < 2π and sometimes negative r, while the principal argument lies in −π < θ ≤ π)",
  ["Writes a complex number as a polar point and back",
   "Compares the principal argument with polar angle conventions",
   "Converts a polar point with θ outside (−π, π] or negative r into a principal argument"],
  "If {{name}} is given z = −1 + i√3, can they write it in modulus–argument form and as polar coordinates, and explain the link?",
  ["N-CN.4"],
  [("po_convert_points", "h", "Converts between polar and Cartesian coordinates"),
   ("cx_polar_form", "h", "Uses modulus–argument form"),
   ("cx_argand", "s", "Points in the Argand diagram are the Cartesian picture")])

T("po_complex_loci", P, MC, "Polar equations of loci in the Argand diagram", "17-18",
  "Write loci in the Argand diagram as polar equations, such as |z| = 3 as r = 3, arg z = π/4 as θ = π/4 and |z − a| = a (for real a > 0) as r = 2a cos θ",
  ["Writes |z| = 3 and arg z = π/4 as polar equations",
   "Shows that |z − 2| = 2 has polar equation r = 4 cos θ",
   "Sketches a locus from its polar equation"],
  "If {{name}} is given the locus |z − 3| = 3, can they find its polar equation?",
  [],
  [("po_complex_link", "h", "Links complex numbers to polar coordinates"),
   ("cx_loci", "h", "Uses loci in the Argand diagram"),
   ("po_convert_equations", "h", "Converts Cartesian equations to polar form")])

T("po_complex_regions", P, MC, "Regions in the Argand diagram in polar form", "17-18",
  "Describe and find the area of regions such as 1 ≤ |z| ≤ 2 with 0 ≤ arg z ≤ π/3 as sectors of annuli in polar coordinates",
  ["Shades a region given by modulus and argument conditions",
   "Finds the area of a sector of an annulus",
   "Writes inequalities for a given shaded region"],
  "If {{name}} is given the region 2 ≤ |z| ≤ 3 and π/6 ≤ arg z ≤ π/2, can they sketch it and find its area?",
  [],
  [("po_complex_loci", "h", "Builds on polar equations of loci"),
   ("gt_arc_sector", "h", "Uses sector areas")])
