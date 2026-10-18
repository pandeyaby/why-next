from dsl import T, C, P, R, L, M
D = "Calculus"
# No standards: CCSS has no calculus standards, and AP Calculus framework
# identifiers are not part of this repository's curricula (see README_EXT.md).

# ---------------------------------------------------------------- limits and the derivative
T("ca_secant_tangent", C, D, "From average to instantaneous rate of change", "16-18",
  "Estimate the gradient of a curve at a point by calculating gradients of chords over shrinking intervals, and explain the tangent gradient as the limit of these chord gradients",
  ["Calculates chord gradients for intervals of 1, 0.1 and 0.01",
   "Spots the value the gradients approach",
   "Explains the difference between average and instantaneous rate"],
  "If {{name}} calculates the gradient of y = x² between x = 3 and x = 3.1, then 3.01, can they predict the gradient at x = 3?",
  [],
  [("fm_avg_rate", "h", "Chord gradients are average rates of change"),
   ("mo_instantaneous_speed", "s", "Tangents to distance–time graphs were met in physics"),
   ("al_line_from_points", "h", "Gradients are calculated from two points")])

T("ca_limits", C, D, "Limits: what a function approaches", "16-18",
  "Understand a limit as the value a function approaches as the input approaches a point, estimate limits from tables and graphs, and handle cases like (x² − 1)/(x − 1) at x = 1",
  ["Estimates a limit from a table of values",
   "Explains why a function can have a limit where it is undefined",
   "Simplifies an expression to find a limit"],
  "If {{name}} sees that (x² − 1)/(x − 1) is undefined at x = 1, can they still find what value it approaches?",
  [],
  [("fm_function_notation", "h", "Limits describe f(x) as x changes"),
   ("al_algebraic_fractions", "s", "Many limits are found by simplifying fractions")])

T("ca_limits_infinity", C, D, "Limits at infinity and asymptotes", "16-18",
  "Describe the behaviour of functions as x grows without bound, including horizontal asymptotes of rational and exponential functions",
  ["Finds the limit of (2x + 1)/x as x → ∞",
   "Explains why e^(−x) approaches 0",
   "Links limits at infinity to horizontal asymptotes"],
  "If {{name}} looks at y = 1/x for very large x, can they explain what value y approaches and why it never reaches it?",
  [],
  [("ca_limits", "h", "Extends limits to unbounded inputs"),
   ("fm_inverse_variation", "h", "Reciprocal graphs show asymptotes"),
   ("al_exp_functions", "s", "Exponential decay approaches an asymptote")])

T("ca_continuity", C, D, "Continuity", "16-18",
  "Define a function as continuous at a point when its limit equals its value there, and identify jumps, holes and asymptotes as discontinuities",
  ["Identifies discontinuities on a graph",
   "Tests continuity of a piecewise function",
   "Explains a real situation with a jump"],
  "If {{name}} sees a graph of parking charges that jumps at each hour, can they explain why it is not continuous?",
  [],
  [("ca_limits", "h", "Continuity is defined with limits"),
   ("fm_piecewise", "h", "Piecewise functions are the main source of jumps")])

T("ca_first_principles", C, D, "The derivative from first principles", "16-18",
  "Define the derivative as the limit of [f(x + h) − f(x)]/h as h → 0 and use it to differentiate simple polynomials",
  ["Writes the first-principles definition",
   "Differentiates x² from first principles",
   "Explains what h represents"],
  "If {{name}} is asked to prove that the derivative of x² is 2x, can they do it from first principles?",
  [],
  [("ca_secant_tangent", "h", "The definition formalises shrinking chords"),
   ("ca_limits", "h", "The derivative is a limit"),
   ("al_poly_multiply", "h", "Expanding (x + h)² needs polynomial multiplication")])

T("ca_notation", L, D, "Derivative notation", "16-18",
  "Use and interpret dy/dx, f′(x), d/dx and d²y/dx², and read them as rates of change with units",
  ["Translates between dy/dx and f′(x)",
   "Gives units for a derivative in context",
   "Reads d²y/dx² as the rate of change of the gradient"],
  "If {{name}} sees dV/dt = −3 for a leaking tank, can they explain in words, with units, what it means?",
  [],
  [("ca_first_principles", "h", "Notation names the derivative"),
   ("fm_units", "s", "Derivatives carry compound units")])

T("ca_gradient_function", R, D, "Sketching the gradient function", "16-18",
  "Sketch the graph of f′(x) from the graph of f(x) by reading where the gradient is positive, negative and zero",
  ["Marks where the gradient is zero",
   "Sketches f′ for a cubic",
   "Matches graphs of functions with their derivatives"],
  "If {{name}} is shown a graph with a hill and a valley, can they sketch the graph of its gradient?",
  [],
  [("ca_secant_tangent", "h", "Reading the gradient at each point relies on the tangent idea"),
   ("ca_first_principles", "s", "The gradient function is the derivative, formalised from first principles"),
   ("fm_key_features", "h", "Uses turning points and intervals of increase")])

# ---------------------------------------------------------------- differentiation rules
T("ca_power_rule", P, D, "Differentiating powers of x", "16-18",
  "Differentiate xⁿ for any rational n, including negative and fractional powers, after rewriting roots and reciprocals as powers",
  ["Differentiates x⁵",
   "Rewrites 1/x² and √x as powers before differentiating",
   "Checks a result with first principles"],
  "If {{name}} needs to differentiate 3/√x, can they rewrite it as a power and differentiate it?",
  [],
  [("ca_notation", "h", "Uses derivative notation"),
   ("al_exponent_laws", "h", "Rewriting needs exponent laws"),
   ("al_rational_exponents", "h", "Roots become fractional powers")])

T("ca_polynomials", P, D, "Differentiating sums and multiples", "16-18",
  "Use the sum and constant-multiple rules to differentiate polynomials and other sums of powers",
  ["Differentiates a cubic polynomial",
   "Expands a product before differentiating",
   "Finds the gradient at a given point"],
  "If {{name}} has y = 2x³ − 5x + 7, can they find the gradient of the curve at x = 2?",
  [],
  [("ca_power_rule", "h", "Each term uses the power rule"),
   ("al_poly_vocab", "h", "Uses terms, coefficients and degree")])

T("ca_tangents_normals", P, D, "Equations of tangents and normals", "16-18",
  "Find the equations of the tangent and normal to a curve at a given point using the derivative and perpendicular gradients",
  ["Finds the gradient at a point",
   "Writes the tangent equation",
   "Writes the normal equation"],
  "If {{name}} has the curve y = x² − 3x at the point (4, 4), can they find the equation of the tangent there?",
  [],
  [("ca_polynomials", "h", "The tangent gradient is the derivative"),
   ("al_line_from_points", "h", "Uses equation of a line from a point and gradient"),
   ("al_parallel_perp", "h", "Normals use perpendicular gradients")])

T("ca_increasing", C, D, "Increasing and decreasing functions", "16-18",
  "Use the sign of the derivative to find intervals where a function is increasing or decreasing",
  ["Finds where a cubic is increasing",
   "Links f′(x) > 0 to an increasing graph",
   "Solves an inequality in f′(x)"],
  "If {{name}} has f(x) = x³ − 12x, can they find where the function is decreasing?",
  [],
  [("ca_polynomials", "h", "Requires finding f′(x)"),
   ("al_quad_ineq", "h", "Intervals come from solving inequalities")])

T("ca_stationary_points", P, D, "Stationary points", "16-18",
  "Find stationary points by solving f′(x) = 0 and classify them by the sign of the gradient either side",
  ["Finds coordinates of stationary points",
   "Classifies points using gradient signs",
   "Checks results against a graph"],
  "If {{name}} has y = x³ − 3x² + 2, can they find and classify its stationary points?",
  [],
  [("ca_polynomials", "h", "Stationary points need f′(x)"),
   ("al_quad_factor_solve", "h", "f′(x) = 0 is often a quadratic equation")])

T("ca_second_derivative", P, D, "The second derivative", "16-18",
  "Find second derivatives and use their sign to classify stationary points as maxima or minima, interpreting d²y/dx² as a rate of change of gradient",
  ["Finds d²y/dx²",
   "Classifies a stationary point with the second derivative",
   "Explains the case where the second derivative is zero"],
  "If {{name}} finds a stationary point where d²y/dx² = −6, can they say whether it's a maximum or minimum and why?",
  [],
  [("ca_stationary_points", "h", "Gives a second way to classify stationary points")])

T("ca_concavity", C, D, "Concavity and points of inflection", "17-18",
  "Describe concave up and down sections of a curve and find points of inflection where concavity changes",
  ["Identifies concave regions on a graph",
   "Finds a point of inflection algebraically",
   "Interprets inflection in context, such as the fastest growth"],
  "If {{name}} sees a graph of an epidemic's total cases, can they find where new cases stopped speeding up?",
  [],
  [("ca_second_derivative", "h", "Concavity is the sign of the second derivative")])

T("ca_curve_sketching", M, D, "Curve sketching with calculus", "17-18",
  "Combine intercepts, stationary points, concavity and end behaviour to sketch curves accurately without technology",
  ["Sketches a cubic with all key features labelled",
   "Uses end behaviour to check the sketch",
   "Explains each feature's source"],
  "If {{name}} is given y = x⁴ − 4x², can they sketch the graph showing all key features?",
  [],
  [("ca_second_derivative", "h", "Uses classified stationary points"),
   ("al_poly_zeros", "h", "Uses roots of polynomials"),
   ("ca_limits_infinity", "s", "End behaviour comes from limits")])

T("ca_optimisation", P, D, "Optimisation problems", "16-18",
  "Set up a function for a quantity to maximise or minimise from a context, differentiate, solve and check the answer is a maximum or minimum that makes sense",
  ["Forms an expression for the volume of an open box",
   "Finds the dimensions giving maximum volume",
   "Checks the solution in context"],
  "If {{name}} cuts squares from the corners of a sheet of card to make an open box, can they find the cut that gives the largest volume?",
  [],
  [("ca_stationary_points", "h", "Optima are stationary points"),
   ("al_create_equations", "h", "Requires forming an equation from a context"),
   ("gt_surface_area", "s", "Many problems involve surface area and volume")])

T("ca_rates_in_context", C, D, "Derivatives as rates in context", "16-18",
  "Interpret derivatives as rates of change in contexts such as marginal cost, population growth and flow rates, with units",
  ["Interprets C′(100) for a cost function",
   "Gives units for a rate of change",
   "Explains the sign of a derivative in context"],
  "If {{name}} is told P′(10) = 250 for a town's population in years, can they explain what that means?",
  [],
  [("ca_notation", "h", "Reads derivative notation as a rate"),
   ("fm_units", "h", "Rates carry units"),
   ("fm_interpret_params", "s", "Builds on interpreting quantities in models")])

T("ca_kinematics_differentiation", P, D, "Velocity and acceleration by differentiation", "16-18",
  "Find velocity and acceleration by differentiating displacement with respect to time, and interpret signs and stationary values",
  ["Differentiates s(t) to find v(t)",
   "Finds when an object is momentarily at rest",
   "Finds the acceleration at a given time"],
  "If {{name}} has s = t³ − 6t² + 9t for a moving particle, can they find when it is momentarily at rest?",
  [],
  [("ca_polynomials", "h", "Requires differentiating polynomials"),
   ("mo_vt_graphs", "h", "Velocity is the gradient of displacement"),
   ("mo_acceleration", "h", "Acceleration is the rate of change of velocity")])

T("ca_exp_derivative", C, D, "The derivative of eˣ", "16-18",
  "Explain that e is the base for which the gradient of eˣ equals its value, so d/dx(eˣ) = eˣ, and differentiate e^(kx)",
  ["Explains why e is special",
   "Differentiates 5e^(2x)",
   "Explains why exponential growth speeds up"],
  "If {{name}} sees that the gradient of y = eˣ at any point equals y, can they explain what that means for growth?",
  [],
  [("ca_first_principles", "h", "The gradient of eˣ is found from the definition"),
   ("fm_exp_growth_model", "h", "Builds on exponential models")])

T("ca_ln_derivative", P, D, "Differentiating ln x", "16-18",
  "Use the inverse relationship with eˣ to show d/dx(ln x) = 1/x, and differentiate logarithmic expressions",
  ["Differentiates ln x and ln(3x)",
   "Uses log laws before differentiating",
   "Explains why ln x has gradient 1/x"],
  "If {{name}} needs to differentiate ln(x²), can they simplify first and get the same answer?",
  [],
  [("ca_exp_derivative", "h", "ln x is the inverse of eˣ"),
   ("fm_logarithms", "h", "Uses logarithm laws")])

T("ca_trig_derivative", P, D, "Differentiating sin x and cos x", "16-18",
  "Differentiate sin x and cos x (in radians), explaining from the graphs why the derivative of sin is cos and why radians are needed",
  ["Differentiates 3 sin x − cos x",
   "Explains the result from gradient graphs",
   "Explains why radians are required"],
  "If {{name}} sketches y = sin x and its gradient graph, can they explain why the derivative is cos x?",
  [],
  [("ca_gradient_function", "h", "The result can be seen from gradient sketches"),
   ("gt_radians", "h", "The rule holds only in radians"),
   ("gt_trig_graphs", "h", "Uses sine and cosine graphs")])

T("ca_chain_rule", P, D, "The chain rule", "17-18",
  "Differentiate composite functions using the chain rule, dy/dx = dy/du × du/dx",
  ["Differentiates (3x + 2)⁵",
   "Differentiates e^(x²)",
   "Identifies the inner and outer function"],
  "If {{name}} needs to differentiate √(1 + x²), can they identify the inner function and apply the chain rule?",
  [],
  [("ca_power_rule", "h", "Outer functions are often powers"),
   ("fm_combine_functions", "h", "Requires understanding composite functions"),
   ("ca_exp_derivative", "s", "Many composites involve exponentials")])

T("ca_product_rule", P, D, "The product rule", "17-18",
  "Differentiate products of functions using d(uv)/dx = u dv/dx + v du/dx",
  ["Differentiates x²eˣ",
   "Differentiates x sin x",
   "Simplifies by factorising the result"],
  "If {{name}} has y = x³ ln x, can they differentiate it with the product rule?",
  [],
  [("ca_power_rule", "h", "Each factor is differentiated"),
   ("ca_exp_derivative", "s", "Products often include exponentials")])

T("ca_quotient_rule", P, D, "The quotient rule", "17-18",
  "Differentiate quotients of functions using the quotient rule and simplify the result",
  ["Differentiates (x + 1)/(x − 2)",
   "Differentiates sin x / x",
   "Simplifies an algebraic fraction derivative"],
  "If {{name}} has y = x²/(x + 1), can they differentiate it and simplify?",
  [],
  [("ca_product_rule", "h", "The quotient rule follows from the product rule"),
   ("ca_chain_rule", "s", "One derivation writes u/v as u·v⁻¹ and uses the chain rule"),
   ("al_algebraic_fractions", "h", "Results are algebraic fractions"),
   ("ca_trig_derivative", "s", "Examples such as sin x / x need trig derivatives")])

T("ca_combining_rules", M, D, "Choosing and combining differentiation rules", "17-18",
  "Decide which rules a function needs and apply them in the right order, checking by simplifying or with technology",
  ["Identifies which rules an expression needs",
   "Differentiates an expression needing chain and product rules",
   "Checks the derivative numerically"],
  "If {{name}} sees y = x² e^(3x), can they plan which rules to use before starting?",
  [],
  [("ca_chain_rule", "h", "One of the rules to choose from"),
   ("ca_product_rule", "h", "One of the rules to choose from"),
   ("ca_quotient_rule", "h", "One of the rules to choose from")])

T("ca_implicit", P, D, "Implicit differentiation", "17-18",
  "Differentiate relations such as x² + y² = 25 implicitly with respect to x and find gradients at points",
  ["Differentiates x² + y² = 25 implicitly",
   "Finds the gradient at a point",
   "Explains why dy/dx appears when differentiating y terms"],
  "If {{name}} has the circle x² + y² = 25, can they find the gradient at (3, 4) without solving for y?",
  [],
  [("ca_chain_rule", "h", "Differentiating y terms uses the chain rule"),
   ("gt_circle_equation", "s", "Circles are a typical implicit relation")])

T("ca_related_rates", P, D, "Connected rates of change", "17-18",
  "Use the chain rule to link rates of change of related quantities, such as how fast the radius of a balloon grows when its volume increases at a known rate",
  ["Writes the relationship between quantities",
   "Links the rates with the chain rule",
   "Interprets the answer with units"],
  "If {{name}} pumps air into a balloon at 50 cm³/s, can they find how fast the radius grows when it is 10 cm?",
  [],
  [("ca_chain_rule", "h", "Connected rates use the chain rule"),
   ("ca_rates_in_context", "h", "Rates are interpreted in context"),
   ("gt_cone_sphere", "s", "Many problems use volume formulae")])

T("ca_linear_approx", C, D, "Small changes and linear approximation", "17-18",
  "Use the tangent line to approximate function values near a point, and estimate small changes with δy ≈ (dy/dx) δx",
  ["Approximates √4.1 using a tangent",
   "Estimates a small change in area",
   "Explains when the approximation is good"],
  "If {{name}} needs √26 without a calculator, can they use the tangent to y = √x at x = 25?",
  [],
  [("ca_tangents_normals", "h", "The approximation uses the tangent line")])

T("ca_numerical_roots", P, D, "Locating roots numerically", "16-18",
  "Locate roots by a change of sign on a continuous function and refine them with iteration or the Newton–Raphson method",
  ["Shows a root lies between 1 and 2 by change of sign",
   "Iterates a formula to find a root",
   "Explains a failure of the method"],
  "If {{name}} needs a root of x³ − 2x − 5 = 0, can they show where it is and find it to 3 decimal places?",
  [],
  [("ca_continuity", "h", "Change of sign needs continuity"),
   ("fm_iterative_model", "h", "Builds on step-by-step iteration"),
   ("ca_tangents_normals", "s", "Newton–Raphson follows tangents")])

# ---------------------------------------------------------------- integration
T("ca_accumulation", C, D, "Net change as accumulated rate", "16-18",
  "Generalise from distance under a velocity–time graph to any rate: the signed area under a rate graph gives the net change in the quantity (water in a tank, money in an account, people in a building), with area below the axis counting as decrease",
  ["Finds the net change in water from an in/out flow-rate graph",
   "Explains why area below the axis means a decrease",
   "Gives units for an accumulated quantity"],
  "If {{name}} sees a graph of water flowing into a tank in litres per minute, can they explain how to find the total water added?",
  [],
  [("fm_gradient_area", "h", "Builds on the physical meaning of area under a graph"),
   ("mo_vt_graphs", "h", "Distance as area under velocity–time is the model case")])

T("ca_riemann_sums", P, D, "Estimating areas with rectangles and trapezia", "16-18",
  "Approximate areas under curves with rectangles and with the trapezium rule, and explain how more strips improve the estimate",
  ["Estimates an area with four rectangles",
   "Applies the trapezium rule",
   "Decides whether an estimate is too high or too low"],
  "If {{name}} estimates the area under y = x² from 0 to 2 with four strips, can they say whether the answer is an over- or underestimate?",
  [],
  [("ca_accumulation", "h", "Estimates accumulated area"),
   ("mt_ML5t7n2-U8", "h", "Uses area of rectangles and triangles"),
   ("al_arith_series", "s", "Strip sums are series")])

T("ca_definite_integral", C, D, "The definite integral", "16-18",
  "Define the definite integral as the limit of sums of strips as their width tends to zero, and use ∫ notation with limits",
  ["Explains the integral as a limit of sums",
   "Reads ∫ notation with limits",
   "Explains why area below the axis counts as negative"],
  "If {{name}} sees ∫₀³ x² dx, can they explain what it means as a limit of rectangles?",
  [],
  [("ca_riemann_sums", "h", "The integral is the limit of strip sums"),
   ("ca_limits", "h", "Uses limits")])

T("ca_antiderivatives", P, D, "Antiderivatives", "16-18",
  "Find antiderivatives (indefinite integrals) of powers of x by reversing differentiation, including the constant of integration",
  ["Integrates x³",
   "Integrates polynomials term by term",
   "Checks by differentiating"],
  "If {{name}} is asked which functions have derivative 6x², can they find them all?",
  [],
  [("ca_polynomials", "h", "Integration reverses differentiation of polynomials")])

T("ca_initial_conditions", C, D, "The constant of integration and initial conditions", "16-18",
  "Explain why integrals include + C, and use a known point or initial value to find C",
  ["Explains why many functions share the same derivative",
   "Finds C from a given point",
   "Sketches a family of antiderivatives"],
  "If {{name}} knows dy/dx = 2x and the curve passes through (1, 5), can they find the equation of the curve?",
  [],
  [("ca_antiderivatives", "h", "+ C arises from antidifferentiation")])

T("ca_ftc", C, D, "The fundamental theorem of calculus", "16-18",
  "Explain the fundamental theorem of calculus — that differentiation and integration are inverse processes — and use it to evaluate definite integrals with antiderivatives",
  ["States the theorem in words",
   "Explains why area grows at a rate equal to the curve's height",
   "Evaluates a definite integral using an antiderivative"],
  "If {{name}} is asked why ∫₀² x² dx can be found from x³/3 rather than by adding rectangles, can they explain the link?",
  [],
  [("ca_definite_integral", "h", "Links the area definition"),
   ("ca_antiderivatives", "h", "Links antiderivatives")])

T("ca_evaluating_integrals", P, D, "Evaluating definite integrals", "16-18",
  "Evaluate definite integrals of polynomials using [F(x)] with limits, and interpret the result as signed area",
  ["Evaluates ∫₁³ (2x + 1) dx",
   "Explains a negative result",
   "Finds total area when the curve crosses the axis"],
  "If {{name}} evaluates ∫₋₁¹ x³ dx and gets 0, can they explain why even though there is area under the curve?",
  [],
  [("ca_ftc", "h", "Evaluation uses the fundamental theorem"),
   ("ca_antiderivatives", "h", "Requires finding antiderivatives")])

T("ca_area_between", P, D, "Areas between curves", "17-18",
  "Find areas between a curve and a line or between two curves by finding intersections and integrating the difference",
  ["Finds intersection points",
   "Integrates top minus bottom",
   "Sketches the region first"],
  "If {{name}} needs the area between y = x² and y = x + 2, can they set up and evaluate the integral?",
  [],
  [("ca_evaluating_integrals", "h", "Uses definite integrals"),
   ("al_intersections", "h", "Limits are intersection points")])

T("ca_kinematics_integration", P, D, "Displacement and velocity by integration", "16-18",
  "Find velocity from acceleration and displacement from velocity by integration, using initial conditions, and distinguish displacement from total distance",
  ["Integrates a(t) to find v(t)",
   "Uses initial velocity to find C",
   "Finds total distance when velocity changes sign"],
  "If {{name}} knows a car's velocity is v = 3t² − 12 m/s, can they find its displacement and total distance in the first 4 s?",
  [],
  [("ca_evaluating_integrals", "h", "Uses definite integrals"),
   ("ca_kinematics_differentiation", "h", "Reverses the differentiation of motion"),
   ("ca_initial_conditions", "h", "Uses initial position and velocity")])

T("ca_integrate_standard", P, D, "Integrating eˣ, 1/x, sin x and cos x", "17-18",
  "Integrate exponential, reciprocal and trigonometric functions using the reverse of their derivatives",
  ["Integrates e^(2x)",
   "Integrates 1/x as ln|x|",
   "Integrates sin x and cos x"],
  "If {{name}} needs ∫ (eˣ + 1/x) dx, can they find it and check by differentiating?",
  [],
  [("ca_antiderivatives", "h", "Extends antidifferentiation"),
   ("ca_ln_derivative", "h", "1/x integrates to ln|x|"),
   ("ca_trig_derivative", "h", "Trig integrals reverse trig derivatives")])

T("ca_substitution", P, D, "Integration by substitution", "17-18",
  "Integrate by substitution, recognising the reverse chain rule pattern f′(g(x))g′(x)",
  ["Spots the reverse chain rule pattern",
   "Integrates 2x(x² + 1)⁵",
   "Changes limits for a definite integral"],
  "If {{name}} sees ∫ x e^(x²) dx, can they choose a substitution and integrate it?",
  [],
  [("ca_chain_rule", "h", "Substitution reverses the chain rule"),
   ("ca_integrate_standard", "h", "Results use standard integrals")])

T("ca_by_parts", P, D, "Integration by parts", "17-18",
  "Integrate products using integration by parts, choosing u and dv/dx sensibly",
  ["Integrates x eˣ",
   "Integrates x sin x",
   "Explains how to choose u"],
  "If {{name}} needs ∫ x cos x dx, can they choose u and integrate it?",
  [],
  [("ca_product_rule", "h", "By parts reverses the product rule"),
   ("ca_integrate_standard", "h", "Uses standard integrals")])

T("ca_volumes_revolution", P, D, "Volumes of revolution", "17-18",
  "Find volumes of solids formed by rotating a region about the x-axis using V = π∫y² dx",
  ["Sets up the integral for a rotated curve",
   "Checks the formula with a cone",
   "Evaluates a volume of revolution"],
  "If {{name}} rotates y = √x from 0 to 4 about the x-axis, can they find the volume of the solid?",
  [],
  [("ca_evaluating_integrals", "h", "Uses definite integrals"),
   ("gt_cross_sections", "h", "Builds on solids of revolution"),
   ("gt_cone_sphere", "s", "Results can be checked against cone and sphere formulae")])

T("ca_average_value", P, D, "Average value of a function", "17-18",
  "Calculate the average value of a function over an interval as the integral divided by the interval width",
  ["Calculates the average of x² on [0, 3]",
   "Interprets average temperature over a day",
   "Explains the link with the mean of data"],
  "If {{name}} has a model for temperature through the day, can they find the average temperature between 6 am and 6 pm?",
  [],
  [("ca_evaluating_integrals", "h", "Uses definite integrals"),
   ("mt_Cg8VPguS_V", "s", "Generalises the mean of a data set")])

T("ca_work_integral", C, D, "Work and energy as integrals", "17-18",
  "Calculate work done by a varying force as the area under a force–distance graph, W = ∫F dx, including the energy stored in a spring",
  ["Finds the work done stretching a spring",
   "Derives E = ½kx² from the integral",
   "Interprets area under a force–distance graph"],
  "If {{name}} knows a spring's force is F = 200x, can they work out the energy stored when it's stretched 0.1 m?",
  [],
  [("ca_evaluating_integrals", "h", "Work is a definite integral"),
   ("en_work_energy", "h", "Applies the work–energy principle"),
   ("mo_hooke_graph", "s", "Spring force grows linearly with extension"),
   ("en_elastic", "s", "Confirms the elastic energy formula")])

# ---------------------------------------------------------------- differential equations
T("ca_de_meaning", C, D, "What a differential equation says", "17-18",
  "Interpret a differential equation as a statement about how a quantity changes, form simple ones from descriptions, and check whether a function is a solution",
  ["Writes dP/dt = kP for 'growth proportional to population'",
   "Checks a proposed solution by substitution",
   "Explains what a family of solutions is"],
  "If {{name}} reads that 'a rumour spreads at a rate proportional to the number who know it', can they write that as a differential equation?",
  [],
  [("ca_rates_in_context", "h", "Equations describe rates"),
   ("ca_initial_conditions", "h", "Solutions are families fixed by initial conditions")])

T("ca_slope_fields", R, D, "Slope fields", "17-18",
  "Sketch and read slope fields for first-order differential equations and draw solution curves through given points",
  ["Draws short gradient segments at grid points",
   "Sketches a solution curve through a point",
   "Matches slope fields to equations"],
  "If {{name}} is given the slope field for dy/dx = x − y, can they sketch the solution through (0, 1)?",
  [],
  [("ca_de_meaning", "h", "Slope fields show the gradient a DE prescribes")])

T("ca_separable", P, D, "Separable differential equations", "17-18",
  "Solve first-order separable differential equations by separating variables and integrating, using an initial condition",
  ["Separates variables",
   "Integrates both sides",
   "Uses an initial condition to find the particular solution"],
  "If {{name}} has dy/dx = 2xy with y = 3 when x = 0, can they solve it?",
  [],
  [("ca_de_meaning", "h", "Solves differential equations"),
   ("ca_integrate_standard", "h", "Uses standard integrals"),
   ("fm_logarithms", "h", "Solutions often involve ln and e")])

T("ca_exponential_de", P, D, "Exponential models from dy/dt = ky", "17-18",
  "Solve dy/dt = ky to obtain y = y₀e^(kt), and use it for growth and decay problems such as populations and radioactive decay",
  ["Derives y = y₀e^(kt)",
   "Finds k from data",
   "Uses the model to predict"],
  "If {{name}} knows a population grows at a rate proportional to its size and doubles in 5 years, can they find the model?",
  [],
  [("ca_separable", "h", "dy/dt = ky is separable"),
   ("ca_exp_derivative", "h", "Recognises eˣ as its own derivative"),
   ("fm_exp_decay", "s", "Connects to decay models met earlier")])

T("ca_newton_cooling", P, D, "Newton's law of cooling", "17-18",
  "Model cooling with dT/dt = −k(T − Tₛ), solve it, and fit the model to experimental cooling data",
  ["Writes the differential equation",
   "Solves for T(t)",
   "Fits k to measured data"],
  "If {{name}} records a cup of tea cooling, can they use Newton's law of cooling to predict when it reaches 40 °C?",
  [],
  [("ca_exponential_de", "h", "The solution is an exponential model"),
   ("en_rate_heat", "h", "Builds on cooling curves")])

T("ca_euler_method", P, D, "Euler's method", "17-18",
  "Approximate solutions to differential equations step by step with Euler's method in a spreadsheet, and explain how step size affects accuracy",
  ["Carries out three Euler steps by hand",
   "Implements Euler's method in a spreadsheet",
   "Compares results for different step sizes"],
  "If {{name}} uses Euler's method with step 0.1 and then 0.01, can they explain which result is more accurate and why?",
  [],
  [("ca_slope_fields", "h", "Euler's method follows the slope field"),
   ("fm_iterative_model", "h", "Builds on step-by-step spreadsheet models"),
   ("ca_linear_approx", "h", "Each step is a tangent-line approximation")])

T("ca_physics_de", C, D, "Differential equations in physics", "17-18",
  "Use differential equations to model physical processes such as radioactive decay, capacitor discharge and falling with air resistance, interpreting terminal values",
  ["Writes a DE for radioactive decay",
   "Explains terminal velocity from dv/dt = 0",
   "Compares a DE model with data"],
  "If {{name}} writes a model for a skydiver with drag, can they explain from the equation why the speed levels off?",
  [],
  [("ca_exponential_de", "h", "Many physical models give exponentials"),
   ("mo_terminal_velocity", "h", "Terminal velocity is where acceleration is zero"),
   ("nu_half_life", "s", "Radioactive decay is a standard example"),
   ("el_capacitor_discharge", "s", "Capacitor discharge is another example")])
