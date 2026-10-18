from dsl import T, C, P, R, L, M
AL = "Algebra"
CA = "Calculus"
FM = "Functions & Modeling"

# ---------------------------------------------------------------- notation and finite sums (wave 3)
T("sr_sigma", L, AL, "Sigma notation", "16-18",
  "Read, write and evaluate sums in sigma notation, identifying the general term and the limits of summation",
  ["Writes 3 + 7 + 11 + … + 43 in sigma notation",
   "Evaluates a short sum given in sigma notation",
   "Explains what the index and limits mean"],
  "If {{name}} sees Σ (2r + 1) from r = 1 to 10, can they explain what it means and evaluate it?",
  [],
  [("al_arith_series", "h", "Sigma notation writes sums such as arithmetic series compactly with a general term"),
   ("mt_HRKzwEQJgO", "h", "The general term after Σ is an nth-term rule, such as 3r + 1"),
   ("al_geo_seq", "s", "Geometric series are also written with sigma notation, with general term arʳ⁻¹")])

T("sr_sigma_properties", P, AL, "Manipulating sums in sigma notation", "16-18",
  "Split and combine sums, take out constant factors, change the starting index, and use Σr = n(n + 1)/2 to evaluate sums",
  ["Writes Σ(3r + 2) as 3Σr + Σ2",
   "Evaluates a sum that starts at r = 5",
   "Uses Σr to evaluate a sum"],
  "If {{name}} needs Σ(4r − 1) from r = 11 to 30, can they evaluate it by splitting the sum?",
  [],
  [("sr_sigma", "h", "Splitting sums and taking out constants are rules for working with sigma notation"),
   ("al_arith_series", "h", "Σr = n(n + 1)/2 is the sum of the arithmetic series 1 + 2 + … + n")])

T("sr_standard_sums", P, AL, "Standard sums of squares and cubes", "17-18",
  "Use the formulae for Σr² and Σr³ together with Σr to find sums of polynomial expressions in r",
  ["Uses Σr² to sum the first 20 squares",
   "Finds a formula for Σr(r + 1)",
   "Factorises a result into a neat form"],
  "If {{name}} needs the sum 1×2 + 2×3 + … + n(n + 1), can they find a formula using standard sums?",
  [],
  [("sr_sigma_properties", "h", "Sums of polynomials in r are split into multiples of Σr³, Σr² and Σr"),
   ("al_poly_multiply", "h", "General terms such as r(r + 1)² are expanded before the standard sums are used")])

T("sr_induction", M, AL, "Proof by induction", "17-18",
  "Prove statements about all positive integers, such as series formulae, by induction: a base case, an inductive step assuming the result for n = k, and a conclusion",
  ["Proves Σr = n(n + 1)/2 by induction",
   "Writes a clear inductive step",
   "Explains why both parts of the proof are needed"],
  "If {{name}} is asked to prove a sum formula for all n, can they write a complete proof by induction?",
  [],
  [("sr_sigma_properties", "h", "Series formulae such as Σr = n(n + 1)/2 are the usual first statements proved by induction"),
   ("mt_j5YqQnN6xe", "s", "An induction proof is a structured argument with a base case, inductive step and conclusion"),
   ("al_identities", "s", "The inductive step needs algebra to show the k + 1 case follows from the k case")])

T("sr_partial_fractions", P, AL, "Partial fractions", "16-18",
  "Split a rational expression with linear factors in the denominator (including a repeated factor) into partial fractions by substitution or equating coefficients",
  ["Splits 5/((x + 1)(x − 4)) into partial fractions",
   "Handles a repeated linear factor",
   "Checks the result by recombining"],
  "If {{name}} needs to integrate or expand 3/((x − 1)(x + 2)), can they first split it into partial fractions?",
  [],
  [("al_algebraic_fractions", "h", "Partial fractions reverse adding algebraic fractions over a common denominator"),
   ("al_sys_elimination", "s", "Equating coefficients gives simultaneous equations for the numerators A and B")])

T("sr_differences", P, AL, "Summing series by the method of differences", "17-18",
  "Sum series whose terms can be written as differences, such as 1/(r(r + 1)) = 1/r − 1/(r + 1), so that most terms cancel",
  ["Writes a general term as a difference",
   "Shows the cancellation in a sum",
   "Finds the limit of the sum as n → ∞"],
  "If {{name}} needs Σ 1/(r(r + 1)) from 1 to n, can they use partial fractions to make the terms cancel?",
  [],
  [("sr_partial_fractions", "h", "Terms such as 1/(r(r + 1)) are split into partial fractions so they cancel in pairs"),
   ("sr_sigma_properties", "h", "The sum is written out in sigma notation so the cancelling terms can be seen"),
   ("sr_partial_sums", "s", "The sum to infinity is the limit of the partial sums left after cancelling")])

# ---------------------------------------------------------------- convergence
T("sr_sequence_behaviour", C, AL, "Increasing, decreasing and periodic sequences", "16-18",
  "Describe sequences as increasing, decreasing or periodic, and justify the description from the rule",
  ["Shows a sequence is increasing using uₙ₊₁ − uₙ",
   "Identifies the period of a periodic sequence",
   "Classifies sequences given by recurrence relations"],
  "If {{name}} has the rule uₙ₊₁ = 1/uₙ with u₁ = 2, can they describe how the sequence behaves?",
  [],
  [("al_recursive_seq", "h", "Whether a sequence increases, decreases or repeats is read from its recursive rule")])

T("sr_sequence_limits", C, AL, "Convergent and divergent sequences", "16-18",
  "Decide whether a sequence converges to a limit or diverges, find simple limits such as (n + 1)/n → 1, and find the limit of a convergent recurrence",
  ["Finds the limit of a sequence given by a formula",
   "Finds the limit of uₙ₊₁ = 0.5uₙ + 3",
   "Gives an example of a divergent sequence"],
  "If {{name}} sees the sequence 1/2, 2/3, 3/4, …, can they say what it approaches and justify it?",
  [],
  [("sr_sequence_behaviour", "h", "Increasing and decreasing behaviour helps decide whether a sequence settles to a limit"),
   ("ca_limits_infinity", "s", "Finding the limit of (n + 1)/n uses the same reasoning as limits of functions as x → ∞")])

T("sr_partial_sums", C, AL, "Partial sums and convergent series", "16-18",
  "Treat a series as the sequence of its partial sums Sₙ, and say a series converges when the partial sums approach a limit",
  ["Calculates partial sums of a series",
   "Explains when an infinite series has a sum",
   "Explains why terms tending to 0 is not enough on its own"],
  "If {{name}} adds 1/2 + 1/4 + 1/8 + …, can they use partial sums to explain why the total approaches 1?",
  [],
  [("sr_sigma", "h", "Each partial sum Sₙ is written in sigma notation up to n terms"),
   ("sr_sequence_limits", "h", "A series converges when its sequence of partial sums converges")])

T("sr_sum_to_infinity", P, AL, "Sum to infinity of a geometric series", "16-18",
  "Use S∞ = a/(1 − r) for a geometric series with |r| < 1, explaining why the series diverges otherwise",
  ["Calculates a sum to infinity",
   "Explains the condition |r| < 1",
   "Finds the first term given S∞ and r"],
  "If {{name}} bounces a ball that rises to 60% of its previous height each time, can they find the total distance travelled?",
  [],
  [("al_geo_series", "h", "S∞ = a/(1 − r) is the limit of the finite sum formula as n grows, when |r| < 1"),
   ("sr_partial_sums", "h", "The sum to infinity is defined as the limit of the partial sums")])

T("sr_recurring_decimals", P, AL, "Recurring decimals as geometric series", "16-18",
  "Write recurring decimals as geometric series and use the sum to infinity to convert them to fractions",
  ["Writes 0.333… as a geometric series",
   "Converts 0.272727… to a fraction",
   "Explains why 0.999… = 1"],
  "If {{name}} is told 0.999… equals 1, can they use a geometric series to explain why?",
  [],
  [("sr_sum_to_infinity", "h", "0.333… is written as 3/10 + 3/100 + … and summed to infinity"),
   ("mt_hlGKg5M7qJ", "s", "Converting between fractions and decimals gives a check on the series method")])

T("sr_series_models", M, AL, "Modelling with geometric series", "16-18",
  "Use geometric series to model savings, loan repayments and repeated drug doses, including the long-term level approached when there is a sum to infinity",
  ["Models monthly savings with a geometric series",
   "Finds the long-term amount of a drug in the body",
   "Comments on the assumptions of the model"],
  "If {{name}} takes a 100 mg dose daily and 30% remains the next day, can they find the level it settles at?",
  ["A-SSE.4"],
  [("al_geo_series", "h", "Savings and loan payments over n years are finite geometric sums"),
   ("sr_sum_to_infinity", "s", "The long-term level of a repeated drug dose is a sum to infinity"),
   ("fm_exp_growth_model", "s", "Compound interest grows by a constant factor, which gives the common ratio of the series")])

T("sr_divergence", C, AL, "Why some series diverge: the harmonic series", "17-18",
  "Show that the harmonic series 1 + 1/2 + 1/3 + … diverges by grouping terms, even though its terms tend to zero",
  ["Groups terms to show each group exceeds 1/2",
   "Explains why the partial sums grow without bound",
   "Contrasts it with a convergent series"],
  "If {{name}} is told the terms of 1 + 1/2 + 1/3 + … get smaller and smaller, can they explain why the sum still grows forever?",
  [],
  [("sr_partial_sums", "h", "The harmonic series diverges because its partial sums grow without limit"),
   ("mt_j5YqQnN6xe", "s", "Grouping terms to show the sum exceeds any number is a general mathematical argument")])

# ---------------------------------------------------------------- binomial expansion
T("sr_pascal", C, AL, "Pascal's triangle and binomial coefficients", "16-18",
  "Build Pascal's triangle, link its entries to ⁿCᵣ, and use its patterns and symmetry",
  ["Builds the first seven rows",
   "Matches entries to ⁿCᵣ",
   "Explains why each entry is the sum of the two above"],
  "If {{name}} builds Pascal's triangle, can they explain why the numbers match the counts of combinations?",
  ["A-APR.5"],
  [("pb_permutations", "h", "Each entry of Pascal's triangle is a combination ⁿCᵣ counting choices of r from n"),
   ("mt_fxPtngwUfz", "s", "Each row is built by adding pairs of entries above, a number pattern")])

T("sr_binomial_expansion", P, AL, "Binomial expansion for positive integer powers", "16-18",
  "Expand (a + b)ⁿ for a positive integer n using binomial coefficients, including expressions such as (2 − 3x)⁵",
  ["Expands (1 + x)⁴",
   "Expands (2 − 3x)⁵ correctly with signs and powers",
   "Explains where the coefficients come from"],
  "If {{name}} needs to expand (2x + 1)⁶, can they do it without multiplying out six brackets?",
  ["A-APR.5"],
  [("sr_pascal", "h", "The coefficients of (a + b)ⁿ come from row n of Pascal's triangle or from ⁿCᵣ"),
   ("al_poly_multiply", "h", "The expansion is a shortcut for multiplying out n brackets of (a + b)"),
   ("al_exponent_laws", "h", "Terms such as (−3x)⁴ are simplified with the laws of exponents")])

T("sr_binomial_terms", P, AL, "Finding a term or coefficient in a binomial expansion", "16-18",
  "Use the general term ⁿCᵣ aⁿ⁻ʳ bʳ to find a particular coefficient, including the term independent of x in expansions such as (x + 2/x)⁸",
  ["Finds the coefficient of x³ in (1 + 2x)¹⁰",
   "Finds the term independent of x",
   "Finds an unknown constant given a coefficient"],
  "If {{name}} needs only the x⁴ term in (3 − x)⁹, can they find it without the full expansion?",
  ["A-APR.5"],
  [("sr_binomial_expansion", "h", "A single term is found from the general term ⁿCᵣ aⁿ⁻ʳ bʳ without full expansion"),
   ("al_zero_negative_exp", "h", "Finding the term independent of x in (x + 2/x)⁸ means tracking negative powers of x")])

T("sr_binomial_approximation", P, AL, "Approximating with binomial expansions", "16-18",
  "Use the first few terms of a binomial expansion to approximate values such as 1.02¹⁰ and judge the accuracy of the approximation",
  ["Approximates 1.01⁸ from (1 + x)⁸",
   "Explains why later terms are small",
   "Compares the approximation with a calculator value"],
  "If {{name}} needs 0.98⁶ to 4 decimal places without a calculator, can they use a binomial expansion?",
  [],
  [("sr_binomial_expansion", "h", "Approximating 1.02¹⁰ keeps the first few terms of the expansion of (1 + 0.02)¹⁰")])

T("sr_binomial_general", P, AL, "Binomial expansion for any rational power", "17-18",
  "Expand (1 + x)ⁿ for negative and fractional n as an infinite series valid for |x| < 1, including (a + bx)ⁿ and expressions split into partial fractions",
  ["Expands (1 + x)⁻¹ and recognises a geometric series",
   "Expands √(4 + x) and states its validity",
   "Expands a rational function using partial fractions"],
  "If {{name}} expands (1 − 2x)^(−1/2), can they find the first four terms and say for which x it is valid?",
  [],
  [("sr_binomial_expansion", "h", "The positive-integer expansion is extended to negative and fractional powers as an infinite series"),
   ("al_rational_exponents", "h", "Expansions such as (1 + x)^(1/2) use fractional powers, read as roots"),
   ("sr_sum_to_infinity", "s", "The condition |x| < 1 is a convergence condition like |r| < 1 for geometric series"),
   ("sr_partial_fractions", "s", "Rational expressions are split into partial fractions before each part is expanded")])

# ---------------------------------------------------------------- power series (calculus)
T("sr_polynomial_approx", C, CA, "Approximating functions with polynomials", "17-18",
  "Approximate a function near a point by a polynomial whose value and derivatives match there, starting from the tangent line and adding a quadratic term",
  ["Finds a quadratic matching f, f′ and f″ at x = 0",
   "Compares tangent and quadratic approximations on a graph",
   "Explains why matching more derivatives improves the fit"],
  "If {{name}} graphs cos x near 0, can they find a quadratic that fits it better than the tangent line?",
  [],
  [("ca_linear_approx", "h", "The tangent-line approximation is the first step, matching value and gradient"),
   ("ca_second_derivative", "h", "Adding a quadratic term matches the second derivative as well")])

T("sr_maclaurin", P, CA, "Maclaurin series", "17-18",
  "Derive Maclaurin series from derivatives at 0, f(x) = f(0) + f′(0)x + f″(0)x²/2! + …, and know the series for eˣ, sin x, cos x and ln(1 + x)",
  ["Derives the series for eˣ",
   "Derives the first terms for sin x",
   "Writes the general term using sigma notation"],
  "If {{name}} is asked to find a series for eˣ, can they derive it from the derivatives at 0?",
  [],
  [("sr_polynomial_approx", "h", "Maclaurin series continue matching derivatives at 0 to every order"),
   ("sr_sigma", "h", "The infinite series is written with sigma notation and a general term"),
   ("ca_exp_derivative", "h", "The series for eˣ uses the fact that every derivative of eˣ is eˣ"),
   ("ca_trig_derivative", "h", "The series for sin x and cos x use their cycling derivatives"),
   ("ca_ln_derivative", "s", "The series for ln(1 + x) starts from its derivative 1/(1 + x)")])

T("sr_maclaurin_validity", C, CA, "Range of validity of Maclaurin series", "17-18",
  "Recognise that some Maclaurin series converge for all x (eˣ, sin x) while others converge only on an interval (ln(1 + x) for −1 < x ≤ 1, 1/(1 − x) for |x| < 1)",
  ["States the range of validity of standard series",
   "Shows a series failing outside its range",
   "Links 1/(1 − x) to a geometric series"],
  "If {{name}} uses the series for ln(1 + x) at x = 3, can they explain why the answer is nonsense?",
  [],
  [("sr_maclaurin", "h", "The question is for which values of x each known Maclaurin series converges"),
   ("sr_sum_to_infinity", "h", "1/(1 − x) = 1 + x + x² + … is a geometric series valid only for |x| < 1")])

T("sr_series_from_known", P, CA, "Building new series from known series", "17-18",
  "Find series for new functions by substituting into, multiplying, differentiating or integrating known Maclaurin series",
  ["Finds the series for e^(2x) by substitution",
   "Finds the series for x sin x",
   "Differentiates a series term by term"],
  "If {{name}} knows the series for eˣ, can they quickly write the series for e^(−x²)?",
  [],
  [("sr_maclaurin", "h", "New series are built from the standard series for eˣ, sin x, cos x and ln(1 + x)"),
   ("ca_chain_rule", "s", "Substituting 2x or x² into a known series parallels forming a composite function")])

T("sr_series_approximations", P, CA, "Using series to approximate values and limits", "17-18",
  "Use truncated series to estimate values such as e^0.1, to justify small-angle approximations (sin x ≈ x, cos x ≈ 1 − x²/2), and to find limits such as (sin x)/x as x → 0",
  ["Estimates e^0.1 from the first terms",
   "Justifies sin x ≈ x for small x",
   "Finds a limit using series"],
  "If {{name}} needs the limit of (1 − cos x)/x² as x → 0, can they use series to find it?",
  [],
  [("sr_maclaurin", "h", "The first few terms of a Maclaurin series give the approximation"),
   ("ca_limits", "s", "Limits such as (sin x)/x as x → 0 are found by replacing sin x with its series")])

T("sr_series_accuracy", R, CA, "Accuracy of truncated series", "17-18",
  "Compare truncated series with the true function graphically and numerically, seeing that accuracy improves with more terms and near the centre of expansion",
  ["Graphs successive approximations to sin x",
   "Tabulates the error at several x values",
   "Explains where the approximation is best"],
  "If {{name}} graphs 1, 1 + x and 1 + x + x²/2 against eˣ, can they describe where each is accurate?",
  [],
  [("sr_maclaurin", "h", "Truncated Maclaurin series are compared with the true function on graphs and in tables"),
   ("fm_precision", "s", "Judging when a truncated series is accurate enough uses ideas of precision")])

T("sr_taylor", P, CA, "Taylor series about a point", "17-18",
  "Find Taylor series about x = a, such as ln x about x = 1, and use them to approximate values near a",
  ["Finds the series for ln x about x = 1",
   "Writes a series in powers of (x − a)",
   "Approximates a value near a"],
  "If {{name}} needs ln 1.1, can they use a series about x = 1 rather than about 0?",
  [],
  [("sr_maclaurin", "h", "A Taylor series repeats the Maclaurin method with derivatives at x = a instead of 0"),
   ("fm_transformations", "s", "Expanding about x = a is like translating the graph so that a moves to the origin")])

T("sr_sums_and_integrals", C, CA, "Comparing sums with integrals", "17-18",
  "Compare a sum with an integral using rectangles, for example bounding 1 + 1/2 + … + 1/n with ln n to explain why the harmonic series diverges",
  ["Draws rectangles comparing a sum with an area",
   "Bounds a sum between two integrals",
   "Uses the comparison to explain divergence"],
  "If {{name}} draws rectangles under y = 1/x, can they explain why the harmonic series grows like ln n?",
  [],
  [("ca_riemann_sums", "h", "Rectangles of width 1 under or over y = 1/x link the sum to an area"),
   ("ca_integrate_standard", "h", "The area under y = 1/x from 1 to n is found with ∫1/x dx = ln n"),
   ("sr_divergence", "s", "Since ln n grows without limit, the integral gives a second proof the harmonic series diverges")])

T("sr_partial_fraction_integration", P, CA, "Integrating with partial fractions", "17-18",
  "Integrate rational functions by splitting them into partial fractions, giving answers in terms of logarithms",
  ["Integrates 1/((x + 1)(x + 2))",
   "Evaluates a definite integral and simplifies logarithms",
   "Handles a repeated factor"],
  "If {{name}} needs ∫ 3/((x − 1)(x + 2)) dx, can they split it and integrate?",
  [],
  [("sr_partial_fractions", "h", "The rational function is first split into partial fractions with linear denominators"),
   ("ca_integrate_standard", "h", "Each partial fraction such as A/(x + 2) integrates to A ln|x + 2|")])

# ---------------------------------------------------------------- parametric equations
T("sr_parametric_curves", R, FM, "Parametric equations of curves", "17-18",
  "Describe curves with parametric equations x = f(t), y = g(t), plot them, and convert to Cartesian form by eliminating the parameter, including circles x = r cos t, y = r sin t",
  ["Plots a curve from a table of t values",
   "Eliminates t to find a Cartesian equation",
   "Writes parametric equations for a circle"],
  "If {{name}} is given x = 2t, y = t², can they sketch the curve and find its Cartesian equation?",
  [],
  [("fm_function_notation", "h", "Writing x = f(t) and y = g(t) treats each coordinate as a function of the parameter t"),
   ("gt_unit_circle", "h", "The circle x = r cos t, y = r sin t comes from the unit-circle definition of sine and cosine"),
   ("gt_pythagorean_identity", "s", "Eliminating t from trigonometric parametric equations often uses sin²t + cos²t = 1"),
   ("al_sys_substitution", "s", "Eliminating the parameter means making t the subject of one equation and substituting")])

T("sr_parametric_modelling", M, FM, "Modelling motion with parametric equations", "17-18",
  "Model motion such as projectiles with parametric equations in time, and interpret the parameter, domain and features of the curve in context",
  ["Writes parametric equations for a projectile",
   "Finds when and where it lands",
   "Comments on the limits of the model"],
  "If {{name}} models a ball thrown at 20 m/s at 30°, can they write parametric equations and find its range?",
  [],
  [("sr_parametric_curves", "h", "A projectile's path is written as parametric equations with time as the parameter"),
   ("mo_projectiles", "h", "Horizontal and vertical motion treated separately give the two parametric equations"),
   ("fm_modelling_cycle", "s", "Interpreting the parameter's domain and validating the model follow the modelling cycle")])

T("sr_parametric_differentiation", P, CA, "Parametric differentiation", "17-18",
  "Find dy/dx = (dy/dt)/(dx/dt) for a parametric curve and use it to find tangents, normals and stationary points",
  ["Finds dy/dx for x = t², y = t³",
   "Finds the equation of a tangent at a given t",
   "Finds stationary points of a parametric curve"],
  "If {{name}} is given a curve in terms of t, can they find the gradient at t = 2 without converting to Cartesian form?",
  [],
  [("sr_parametric_curves", "h", "The curve is given by x and y as functions of t, which are differentiated separately"),
   ("ca_chain_rule", "h", "dy/dx = (dy/dt) ÷ (dx/dt) follows from the chain rule, since dy/dt = (dy/dx)(dx/dt)"),
   ("ca_tangents_normals", "s", "The gradient found is used to write tangent and normal equations as before")])

T("sr_parametric_integration", P, CA, "Area under a parametric curve", "17-18",
  "Find the area under a parametric curve using ∫ y (dx/dt) dt, changing the limits to values of t",
  ["Sets up the integral in terms of t",
   "Changes the limits correctly",
   "Finds the area enclosed by a loop"],
  "If {{name}} needs the area under x = t², y = 2t from x = 0 to x = 4, can they set up and evaluate the integral in t?",
  [],
  [("sr_parametric_curves", "h", "The area is under a curve given by x and y as functions of t"),
   ("ca_substitution", "h", "Replacing dx by (dx/dt) dt is a change of variable, as in integration by substitution"),
   ("ca_definite_integral", "h", "The area is a definite integral, with x-limits changed into values of t")])
