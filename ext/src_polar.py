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
  [("gt_unit_circle", "h", "The proof uses coordinates of points on the unit circle at angles A and B"),
   ("gt_pythagorean_identity", "h", "cos²A − sin²A becomes 2cos²A − 1 or 1 − 2sin²A using sin²A + cos²A = 1"),
   ("gt_exact_trig", "s", "Values such as sin 75° are found exactly by combining exact values for 45° and 30°")])

T("po_double_angle_equations", P, GE, "Solving equations with double-angle formulae", "17-18",
  "Solve trigonometric equations such as sin 2θ = sin θ or cos 2θ = cos θ by rewriting with double-angle formulae and factorising, finding all solutions in a given interval",
  ["Rewrites sin 2θ as 2 sin θ cos θ and factorises",
   "Solves a quadratic in cos θ arising from cos 2θ",
   "Finds all solutions in 0 ≤ θ < 2π"],
  "If {{name}} needs to solve sin 2θ = cos θ for 0 ≤ θ < 2π, can they find every solution?",
  [],
  [("po_compound_angles", "h", "Equations are rewritten by replacing sin 2θ with 2sin θ cos θ or a form of cos 2θ"),
   ("gt_trig_equations", "h", "Finds all solutions of a trigonometric equation in an interval"),
   ("al_quad_factor_solve", "s", "Rewriting cos 2θ often gives a quadratic in cos θ or sin θ, solved by factorising")])

# ---------------------------------------------------------------- the polar coordinate system
T("po_system", R, GE, "Polar coordinates", "16-18",
  "Locate points with polar coordinates (r, θ), using a pole and an initial line with θ measured anticlockwise in radians, and recognise that a point has many polar representations",
  ["Plots points given in polar coordinates",
   "Gives two different polar coordinates for the same point",
   "Explains the role of the pole and the initial line"],
  "If {{name}} is given the point (3, 2π/3) in polar coordinates, can they plot it and give another pair of polar coordinates for the same point?",
  [],
  [("gt_radians", "h", "The angle θ in polar coordinates is usually measured in radians"),
   ("gt_unit_circle", "h", "θ is measured anticlockwise from the initial line, as on the unit circle"),
   ("gt_bearings", "s", "Bearings also locate a point by a distance and a direction, though measured differently"),
   ("mt_qUGMyMYn9m", "s", "θ is an amount of turn from the initial line, and adding a full turn gives the same point")])

T("po_convert_points", P, GE, "Converting points between polar and Cartesian coordinates", "16-18",
  "Convert between polar and Cartesian coordinates using x = r cos θ, y = r sin θ, r = √(x² + y²) and tan θ = y/x, choosing θ in the correct quadrant",
  ["Converts (4, π/6) to Cartesian coordinates",
   "Converts (−2, 2) to polar coordinates",
   "Explains why tan⁻¹(y/x) alone can give the wrong angle"],
  "If {{name}} is given the Cartesian point (−3, −3), can they find its polar coordinates with θ in the right quadrant?",
  [],
  [("po_system", "h", "Each point is given by its distance r from the pole and its angle θ"),
   ("gt_unit_circle", "h", "x = r cos θ and y = r sin θ scale the unit-circle coordinates by r"),
   ("gt_trig_symmetry", "h", "tan θ = y/x has solutions in two quadrants, so the correct one must be chosen")])

T("po_convert_equations", P, GE, "Converting equations between polar and Cartesian form", "17-18",
  "Convert curve equations between polar and Cartesian form using r² = x² + y², x = r cos θ and y = r sin θ, recognising circles and lines in either form",
  ["Shows that r = 4 cos θ is a circle and finds its centre and radius",
   "Converts y = x² to polar form",
   "Converts r = 2 sec θ to a straight line"],
  "If {{name}} is given the polar equation r = 6 sin θ, can they find its Cartesian equation and describe the curve?",
  [],
  [("po_convert_points", "h", "Substituting x = r cos θ, y = r sin θ and r² = x² + y² converts the whole equation"),
   ("gt_circle_equation", "h", "Converted equations are recognised as circles from the Cartesian form (x − a)² + (y − b)² = r²"),
   ("gt_pythagorean_identity", "s", "r²cos²θ + r²sin²θ simplifies to r² using sin²θ + cos²θ = 1, recovering x² + y² = r²")])

T("po_polar_parametric", C, GE, "Polar curves as parametric curves", "17-18",
  "Treat a polar curve r = f(θ) as the parametric curve x = f(θ)cos θ, y = f(θ)sin θ with parameter θ",
  ["Writes a polar curve in parametric form",
   "Plots points of a polar curve from its parametric form",
   "Explains why this allows methods for parametric curves to be used"],
  "If {{name}} is given r = 1 + cos θ, can they write parametric equations for x and y in terms of θ?",
  [],
  [("po_convert_points", "h", "x = r cos θ and y = r sin θ turn r = f(θ) into a pair of equations in θ"),
   ("sr_parametric_curves", "h", "The polar curve is then handled as a parametric curve, with θ playing the role of the parameter t")])

# ---------------------------------------------------------------- polar curves
T("po_standard_curves", R, GE, "Standard polar curves", "17-18",
  "Recognise and sketch standard polar curves: circles r = a and r = 2a cos θ, half-lines θ = α, spirals r = aθ, cardioids r = a(1 + cos θ) and roses r = a sin nθ",
  ["Sketches r = 3 and θ = π/4",
   "Sketches a spiral and a cardioid",
   "Matches polar equations to their curves"],
  "If {{name}} is shown four polar curves, can they match each to its equation and explain their choice?",
  [],
  [("po_system", "h", "Each curve is sketched by plotting points (r, θ) for a range of angles"),
   ("gt_trig_graphs", "h", "Cardioids and roses take their shape from how sine and cosine rise and fall")])

T("po_r_theta_graphs", R, GE, "Graphs of r against θ", "17-18",
  "Use a Cartesian graph of r against θ to see where r is greatest, smallest and zero, and so to sketch the corresponding polar curve",
  ["Draws the graph of r = 2 + cos θ against θ",
   "Reads off the maximum and minimum values of r",
   "Uses the graph to sketch the polar curve"],
  "If {{name}} has a graph of r against θ, can they use it to sketch the polar curve?",
  [],
  [("po_system", "h", "The height on the graph is the distance r from the pole at each angle θ"),
   ("gt_trig_graphs", "h", "The graph of r = a(1 + cos θ) against θ is a cosine graph stretched and shifted up")])

T("po_symmetry", P, GE, "Symmetry of polar curves", "17-18",
  "Use symmetry to sketch polar curves and simplify calculations: if replacing θ by −θ leaves r unchanged, the curve is symmetric about the initial line",
  ["Tests a polar curve for symmetry in the initial line",
   "Tests for symmetry in the line θ = π/2",
   "Uses symmetry to sketch half a curve and reflect it"],
  "If {{name}} is given r = 2 + 3 cos θ, can they explain why the curve is symmetric about the initial line?",
  [],
  [("po_standard_curves", "h", "Cardioids and roses are standard curves with clear lines of symmetry"),
   ("gt_trig_symmetry", "h", "Using cos(−θ) = cos θ shows that curves in cos θ are symmetric about the initial line")])

T("po_sketching", P, GE, "Sketching polar curves", "17-18",
  "Sketch polar curves by finding where r is greatest, smallest and zero, using symmetry and tangents at the pole, and keeping to r ≥ 0 when that convention is used",
  ["Finds the values of θ where r = 0",
   "Sketches r = 2 sin 2θ for r ≥ 0",
   "Labels the greatest value of r"],
  "If {{name}} is given r = 3 cos 2θ, can they sketch the curve and show where it passes through the pole?",
  [],
  [("po_standard_curves", "h", "Knowing standard shapes such as the cardioid guides the sketch of new curves"),
   ("po_convert_points", "h", "Key points, such as where θ = 0, π/2 and π, are plotted from their polar coordinates"),
   ("gt_trig_equations", "h", "Solving r = 0 for θ gives the directions of the tangents at the pole"),
   ("po_symmetry", "s", "Symmetry about the initial line means only half the curve needs plotting"),
   ("po_r_theta_graphs", "s", "The graph of r against θ shows where r is greatest, smallest and zero")])

T("po_families", R, GE, "Families of polar curves", "17-18",
  "Investigate how parameters change families of polar curves, such as limaçons r = a + b cos θ (with a dimple, cusp or inner loop) and roses r = a sin nθ (n petals for odd n, 2n petals for even n)",
  ["Describes how r = a + b cos θ changes as a/b changes",
   "Predicts the number of petals of a rose curve",
   "Uses technology to test a conjecture about a family of curves"],
  "If {{name}} is exploring r = a + 2 cos θ, can they describe how the shape changes as a increases from 1 to 5?",
  [],
  [("po_sketching", "h", "Each member, such as a limaçon with a dimple or loop, is sketched by finding where r is largest, smallest and zero"),
   ("fm_transformations", "s", "Changing a and b in r = a + b cos θ is explored like a parameter transforming a graph")])

T("po_intersections", P, GE, "Intersections of polar curves", "17-18",
  "Find where two polar curves meet by solving r₁(θ) = r₂(θ), checking the pole separately because it can be reached at different values of θ",
  ["Finds the intersections of r = 1 + cos θ and r = 3 cos θ",
   "Explains why the pole must be checked separately",
   "Gives intersections in polar coordinates"],
  "If {{name}} has a cardioid and a circle in polar form, can they find all their points of intersection?",
  [],
  [("po_sketching", "h", "A sketch of both curves shows how many intersections to expect"),
   ("gt_trig_equations", "h", "Setting r₁(θ) = r₂(θ) gives a trigonometric equation to solve in the interval"),
   ("po_double_angle_equations", "s", "Equations such as a sin 2θ = a cos θ need the double-angle formulae")])

T("po_modelling", M, GE, "Modelling with polar coordinates", "17-18",
  "Choose polar coordinates for contexts with a natural centre, such as radar, navigation, spiral growth or the paths of points on rotating objects, and explain when polar form is simpler than Cartesian",
  ["Describes a radar position in polar coordinates",
   "Models a spiral with a polar equation",
   "Explains why a circle about the pole is simpler in polar form"],
  "If {{name}} is describing the position of ships on a radar screen, can they explain why polar coordinates are a natural choice?",
  [],
  [("po_convert_equations", "h", "Models move between polar and Cartesian descriptions to choose the simpler one"),
   ("po_standard_curves", "h", "Spirals and circles are standard polar curves used as models"),
   ("fm_modelling_cycle", "s", "Choosing coordinates, solving and checking against the context follow the modelling cycle")])

# ---------------------------------------------------------------- calculus in polar coordinates
T("po_trig_integrals", P, CA, "Integrating sin² and cos² with double-angle identities", "17-18",
  "Integrate sin²θ, cos²θ and sin θ cos θ by rewriting them with double-angle formulae, as needed for polar areas",
  ["Integrates cos²θ using cos²θ = ½(1 + cos 2θ)",
   "Integrates sin²(3θ)",
   "Evaluates a definite integral of sin²θ over 0 to π"],
  "If {{name}} needs to find the integral of sin²θ from 0 to π, can they choose an identity that makes it integrable?",
  [],
  [("po_compound_angles", "h", "sin²θ = ½(1 − cos 2θ) and cos²θ = ½(1 + cos 2θ) come from the double-angle formulae"),
   ("ca_integrate_standard", "h", "After rewriting, the terms are integrated with the standard results for sin and cos"),
   ("ca_substitution", "s", "∫cos 2θ dθ = ½sin 2θ is a reverse chain rule, a simple substitution")])

T("po_area_formula", C, CA, "Area enclosed by a polar curve", "17-18",
  "Derive the area formula A = ½∫r²dθ by adding thin sectors of area ½r²δθ, and set up area integrals for polar regions",
  ["Explains the formula as a sum of thin sectors",
   "Chooses the limits for a region",
   "Sets up the integral for the area of a loop"],
  "If {{name}} wants the area inside one loop of a polar curve, can they explain where ½∫r²dθ comes from?",
  [],
  [("gt_arc_sector", "h", "Each thin slice is approximately a sector of a circle, with area ½r²δθ from ½r²θ"),
   ("ca_definite_integral", "h", "Adding sectors in the limit gives the definite integral ½∫r²dθ"),
   ("po_sketching", "h", "A sketch shows which range of θ traces the region exactly once, giving the limits"),
   ("ca_riemann_sums", "s", "Adding thin sectors and taking a limit mirrors adding rectangles in a Riemann sum")])

T("po_area_calc", P, CA, "Calculating areas in polar coordinates", "17-18",
  "Calculate areas enclosed by polar curves, such as the cardioid r = a(1 + cos θ) with area 3πa²/2 or one petal of a rose curve",
  ["Calculates the area enclosed by a cardioid",
   "Calculates the area of one petal of r = sin 3θ",
   "Uses symmetry to simplify an area calculation"],
  "If {{name}} is given r = 2(1 + cos θ), can they find the area it encloses?",
  [],
  [("po_area_formula", "h", "Each area is found by evaluating ½∫r²dθ between suitable limits"),
   ("po_trig_integrals", "h", "Squaring r gives terms in cos²θ or sin²nθ, integrated with double-angle identities"),
   ("po_symmetry", "s", "For a symmetric curve, integrating over half the range and doubling saves work")])

T("po_area_between", P, CA, "Areas between polar curves", "17-18",
  "Find the area of a region inside one polar curve and outside another, using intersections to find the limits",
  ["Finds the limits from the points of intersection",
   "Finds the area inside a circle and outside a cardioid",
   "Splits a region into parts with different curves"],
  "If {{name}} has r = 3 cos θ and r = 1 + cos θ, can they find the area inside the first curve but outside the second?",
  [],
  [("po_area_calc", "h", "Each curve's area over the range is calculated as a polar area"),
   ("po_intersections", "h", "The limits of integration are the angles where the curves meet"),
   ("ca_area_between", "s", "Subtracting the inner area from the outer one mirrors areas between Cartesian curves")])

T("po_tangents", P, CA, "Tangents to polar curves", "17-18",
  "Find points on a polar curve where the tangent is parallel or perpendicular to the initial line by solving dy/dθ = 0 or dx/dθ = 0 for x = r cos θ, y = r sin θ",
  ["Finds where the tangent to a cardioid is parallel to the initial line",
   "Finds where the tangent is perpendicular to the initial line",
   "Interprets the results on a sketch"],
  "If {{name}} is given r = 1 + cos θ, can they find the points where the tangent is parallel to the initial line?",
  [],
  [("po_polar_parametric", "h", "The curve is written as x = r cos θ, y = r sin θ with θ as the parameter"),
   ("sr_parametric_differentiation", "h", "Horizontal tangents come from dy/dθ = 0 and vertical ones from dx/dθ = 0"),
   ("ca_product_rule", "h", "r(θ)cos θ and r(θ)sin θ are products, differentiated with the product rule")])

# ---------------------------------------------------------------- link to complex numbers (wave 3)
T("po_complex_link", C, MC, "Polar coordinates and modulus–argument form", "17-18",
  "Connect polar coordinates with modulus–argument form: the complex number with modulus r and argument θ sits at the polar point (r, θ), but the conventions differ (polar work often uses 0 ≤ θ < 2π and sometimes negative r, while the principal argument lies in −π < θ ≤ π)",
  ["Writes a complex number as a polar point and back",
   "Compares the principal argument with polar angle conventions",
   "Converts a polar point with θ outside (−π, π] or negative r into a principal argument"],
  "If {{name}} is given z = −1 + i√3, can they write it in modulus–argument form and as polar coordinates, and explain the link?",
  ["N-CN.4"],
  [("po_convert_points", "h", "Both polar points and complex numbers convert to Cartesian form with r cos θ and r sin θ"),
   ("cx_polar_form", "h", "A complex number r(cos θ + i sin θ) sits at the polar point (r, θ)"),
   ("cx_argand", "s", "The Argand diagram gives the Cartesian picture of the same points")])

T("po_complex_loci", P, MC, "Polar equations of loci in the Argand diagram", "17-18",
  "Write loci in the Argand diagram as polar equations, such as |z| = 3 as r = 3, arg z = π/4 as θ = π/4 and |z − a| = a (for real a > 0) as r = 2a cos θ",
  ["Writes |z| = 3 and arg z = π/4 as polar equations",
   "Shows that |z − 2| = 2 has polar equation r = 4 cos θ",
   "Sketches a locus from its polar equation"],
  "If {{name}} is given the locus |z − 3| = 3, can they find its polar equation?",
  [],
  [("po_complex_link", "h", "Treating z as the polar point (r, θ) turns |z| into r and arg z into θ"),
   ("cx_loci", "h", "Circles and half-lines in the Argand diagram are the loci being rewritten"),
   ("po_convert_equations", "h", "|z − a| = a is converted from its Cartesian circle equation to r = 2a cos θ")])

T("po_complex_regions", P, MC, "Regions in the Argand diagram in polar form", "17-18",
  "Describe and find the area of regions such as 1 ≤ |z| ≤ 2 with 0 ≤ arg z ≤ π/3 as sectors of annuli in polar coordinates",
  ["Shades a region given by modulus and argument conditions",
   "Finds the area of a sector of an annulus",
   "Writes inequalities for a given shaded region"],
  "If {{name}} is given the region 2 ≤ |z| ≤ 3 and π/6 ≤ arg z ≤ π/2, can they sketch it and find its area?",
  [],
  [("po_complex_loci", "h", "The boundaries of each region are polar equations of loci such as r = 1 and θ = π/3"),
   ("gt_arc_sector", "h", "The area of a sector of an annulus is a difference of two sector areas ½r²θ")])
