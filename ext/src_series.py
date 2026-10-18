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
  [("al_arith_series", "h", "Sigma notation writes series compactly"),
   ("mt_HRKzwEQJgO", "h", "The general term is an nth-term rule"),
   ("al_geo_seq", "s", "Geometric series are also written this way")])

T("sr_sigma_properties", P, AL, "Manipulating sums in sigma notation", "16-18",
  "Split and combine sums, take out constant factors, change the starting index, and use Σr = n(n + 1)/2 to evaluate sums",
  ["Writes Σ(3r + 2) as 3Σr + Σ2",
   "Evaluates a sum that starts at r = 5",
   "Uses Σr to evaluate a sum"],
  "If {{name}} needs Σ(4r − 1) from r = 11 to 30, can they evaluate it by splitting the sum?",
  [],
  [("sr_sigma", "h", "Manipulates sigma notation"),
   ("al_arith_series", "h", "Σr is an arithmetic series")])

T("sr_standard_sums", P, AL, "Standard sums of squares and cubes", "17-18",
  "Use the formulae for Σr² and Σr³ together with Σr to find sums of polynomial expressions in r",
  ["Uses Σr² to sum the first 20 squares",
   "Finds a formula for Σr(r + 1)",
   "Factorises a result into a neat form"],
  "If {{name}} needs the sum 1×2 + 2×3 + … + n(n + 1), can they find a formula using standard sums?",
  [],
  [("sr_sigma_properties", "h", "Combines sums using linearity"),
   ("al_poly_multiply", "h", "Expands general terms before summing")])

T("sr_induction", M, AL, "Proof by induction", "17-18",
  "Prove statements about all positive integers, such as series formulae, by induction: a base case, an inductive step assuming the result for n = k, and a conclusion",
  ["Proves Σr = n(n + 1)/2 by induction",
   "Writes a clear inductive step",
   "Explains why both parts of the proof are needed"],
  "If {{name}} is asked to prove a sum formula for all n, can they write a complete proof by induction?",
  [],
  [("sr_sigma_properties", "h", "Series formulae are the usual first proofs"),
   ("mt_j5YqQnN6xe", "s", "Builds on constructing mathematical arguments"),
   ("al_identities", "s", "Uses algebraic manipulation in proofs")])

T("sr_partial_fractions", P, AL, "Partial fractions", "16-18",
  "Split a rational expression with linear factors in the denominator (including a repeated factor) into partial fractions by substitution or equating coefficients",
  ["Splits 5/((x + 1)(x − 4)) into partial fractions",
   "Handles a repeated linear factor",
   "Checks the result by recombining"],
  "If {{name}} needs to integrate or expand 3/((x − 1)(x + 2)), can they first split it into partial fractions?",
  [],
  [("al_algebraic_fractions", "h", "Reverses adding algebraic fractions"),
   ("al_sys_elimination", "s", "Equating coefficients gives simultaneous equations")])

T("sr_differences", P, AL, "Summing series by the method of differences", "17-18",
  "Sum series whose terms can be written as differences, such as 1/(r(r + 1)) = 1/r − 1/(r + 1), so that most terms cancel",
  ["Writes a general term as a difference",
   "Shows the cancellation in a sum",
   "Finds the limit of the sum as n → ∞"],
  "If {{name}} needs Σ 1/(r(r + 1)) from 1 to n, can they use partial fractions to make the terms cancel?",
  [],
  [("sr_partial_fractions", "h", "Terms are split with partial fractions"),
   ("sr_sigma_properties", "h", "Manipulates sums"),
   ("sr_partial_sums", "s", "The limit of the sum is the limit of the partial sums")])

# ---------------------------------------------------------------- convergence
T("sr_sequence_behaviour", C, AL, "Increasing, decreasing and periodic sequences", "16-18",
  "Describe sequences as increasing, decreasing or periodic, and justify the description from the rule",
  ["Shows a sequence is increasing using uₙ₊₁ − uₙ",
   "Identifies the period of a periodic sequence",
   "Classifies sequences given by recurrence relations"],
  "If {{name}} has the rule uₙ₊₁ = 1/uₙ with u₁ = 2, can they describe how the sequence behaves?",
  [],
  [("al_recursive_seq", "h", "Analyses sequences defined by rules")])

T("sr_sequence_limits", C, AL, "Convergent and divergent sequences", "16-18",
  "Decide whether a sequence converges to a limit or diverges, find simple limits such as (n + 1)/n → 1, and find the limit of a convergent recurrence",
  ["Finds the limit of a sequence given by a formula",
   "Finds the limit of uₙ₊₁ = 0.5uₙ + 3",
   "Gives an example of a divergent sequence"],
  "If {{name}} sees the sequence 1/2, 2/3, 3/4, …, can they say what it approaches and justify it?",
  [],
  [("sr_sequence_behaviour", "h", "Builds on describing sequence behaviour"),
   ("ca_limits_infinity", "s", "Uses limits at infinity")])

T("sr_partial_sums", C, AL, "Partial sums and convergent series", "16-18",
  "Treat a series as the sequence of its partial sums Sₙ, and say a series converges when the partial sums approach a limit",
  ["Calculates partial sums of a series",
   "Explains when an infinite series has a sum",
   "Explains why terms tending to 0 is not enough on its own"],
  "If {{name}} adds 1/2 + 1/4 + 1/8 + …, can they use partial sums to explain why the total approaches 1?",
  [],
  [("sr_sigma", "h", "Partial sums are written with sigma notation"),
   ("sr_sequence_limits", "h", "Convergence of a series is convergence of its partial sums")])

T("sr_sum_to_infinity", P, AL, "Sum to infinity of a geometric series", "16-18",
  "Use S∞ = a/(1 − r) for a geometric series with |r| < 1, explaining why the series diverges otherwise",
  ["Calculates a sum to infinity",
   "Explains the condition |r| < 1",
   "Finds the first term given S∞ and r"],
  "If {{name}} bounces a ball that rises to 60% of its previous height each time, can they find the total distance travelled?",
  [],
  [("al_geo_series", "h", "Takes the limit of the finite sum formula"),
   ("sr_partial_sums", "h", "Defines the infinite sum as a limit")])

T("sr_recurring_decimals", P, AL, "Recurring decimals as geometric series", "16-18",
  "Write recurring decimals as geometric series and use the sum to infinity to convert them to fractions",
  ["Writes 0.333… as a geometric series",
   "Converts 0.272727… to a fraction",
   "Explains why 0.999… = 1"],
  "If {{name}} is told 0.999… equals 1, can they use a geometric series to explain why?",
  [],
  [("sr_sum_to_infinity", "h", "Uses the sum to infinity"),
   ("mt_hlGKg5M7qJ", "s", "Builds on converting decimals and fractions")])

T("sr_series_models", M, AL, "Modelling with geometric series", "16-18",
  "Use geometric series to model savings, loan repayments and repeated drug doses, including the long-term level approached when there is a sum to infinity",
  ["Models monthly savings with a geometric series",
   "Finds the long-term amount of a drug in the body",
   "Comments on the assumptions of the model"],
  "If {{name}} takes a 100 mg dose daily and 30% remains the next day, can they find the level it settles at?",
  ["A-SSE.4"],
  [("al_geo_series", "h", "Models use finite geometric sums"),
   ("sr_sum_to_infinity", "s", "Long-term levels are sums to infinity"),
   ("fm_exp_growth_model", "s", "Compound growth is exponential")])

T("sr_divergence", C, AL, "Why some series diverge: the harmonic series", "17-18",
  "Show that the harmonic series 1 + 1/2 + 1/3 + … diverges by grouping terms, even though its terms tend to zero",
  ["Groups terms to show each group exceeds 1/2",
   "Explains why the partial sums grow without bound",
   "Contrasts it with a convergent series"],
  "If {{name}} is told the terms of 1 + 1/2 + 1/3 + … get smaller and smaller, can they explain why the sum still grows forever?",
  [],
  [("sr_partial_sums", "h", "Analyses partial sums"),
   ("mt_j5YqQnN6xe", "s", "Uses a mathematical argument")])

# ---------------------------------------------------------------- binomial expansion
T("sr_pascal", C, AL, "Pascal's triangle and binomial coefficients", "16-18",
  "Build Pascal's triangle, link its entries to ⁿCᵣ, and use its patterns and symmetry",
  ["Builds the first seven rows",
   "Matches entries to ⁿCᵣ",
   "Explains why each entry is the sum of the two above"],
  "If {{name}} builds Pascal's triangle, can they explain why the numbers match the counts of combinations?",
  ["A-APR.5"],
  [("pb_permutations", "h", "Entries are combinations ⁿCᵣ"),
   ("mt_fxPtngwUfz", "s", "Uses number patterns")])

T("sr_binomial_expansion", P, AL, "Binomial expansion for positive integer powers", "16-18",
  "Expand (a + b)ⁿ for a positive integer n using binomial coefficients, including expressions such as (2 − 3x)⁵",
  ["Expands (1 + x)⁴",
   "Expands (2 − 3x)⁵ correctly with signs and powers",
   "Explains where the coefficients come from"],
  "If {{name}} needs to expand (2x + 1)⁶, can they do it without multiplying out six brackets?",
  ["A-APR.5"],
  [("sr_pascal", "h", "Coefficients come from Pascal's triangle or ⁿCᵣ"),
   ("al_poly_multiply", "h", "Generalises multiplying brackets"),
   ("al_exponent_laws", "h", "Simplifies powers of terms")])

T("sr_binomial_terms", P, AL, "Finding a term or coefficient in a binomial expansion", "16-18",
  "Use the general term ⁿCᵣ aⁿ⁻ʳ bʳ to find a particular coefficient, including the term independent of x in expansions such as (x + 2/x)⁸",
  ["Finds the coefficient of x³ in (1 + 2x)¹⁰",
   "Finds the term independent of x",
   "Finds an unknown constant given a coefficient"],
  "If {{name}} needs only the x⁴ term in (3 − x)⁹, can they find it without the full expansion?",
  ["A-APR.5"],
  [("sr_binomial_expansion", "h", "Uses the general term of the expansion"),
   ("al_zero_negative_exp", "h", "Handles negative powers such as 1/x")])

T("sr_binomial_approximation", P, AL, "Approximating with binomial expansions", "16-18",
  "Use the first few terms of a binomial expansion to approximate values such as 1.02¹⁰ and judge the accuracy of the approximation",
  ["Approximates 1.01⁸ from (1 + x)⁸",
   "Explains why later terms are small",
   "Compares the approximation with a calculator value"],
  "If {{name}} needs 0.98⁶ to 4 decimal places without a calculator, can they use a binomial expansion?",
  [],
  [("sr_binomial_expansion", "h", "Truncates a binomial expansion")])

T("sr_binomial_general", P, AL, "Binomial expansion for any rational power", "17-18",
  "Expand (1 + x)ⁿ for negative and fractional n as an infinite series valid for |x| < 1, including (a + bx)ⁿ and expressions split into partial fractions",
  ["Expands (1 + x)⁻¹ and recognises a geometric series",
   "Expands √(4 + x) and states its validity",
   "Expands a rational function using partial fractions"],
  "If {{name}} expands (1 − 2x)^(−1/2), can they find the first four terms and say for which x it is valid?",
  [],
  [("sr_binomial_expansion", "h", "Extends the binomial expansion"),
   ("al_rational_exponents", "h", "Uses fractional powers"),
   ("sr_sum_to_infinity", "s", "Validity is a convergence condition like |r| < 1"),
   ("sr_partial_fractions", "s", "Rational functions are split first")])

# ---------------------------------------------------------------- power series (calculus)
T("sr_polynomial_approx", C, CA, "Approximating functions with polynomials", "17-18",
  "Approximate a function near a point by a polynomial whose value and derivatives match there, starting from the tangent line and adding a quadratic term",
  ["Finds a quadratic matching f, f′ and f″ at x = 0",
   "Compares tangent and quadratic approximations on a graph",
   "Explains why matching more derivatives improves the fit"],
  "If {{name}} graphs cos x near 0, can they find a quadratic that fits it better than the tangent line?",
  [],
  [("ca_linear_approx", "h", "Extends linear approximation"),
   ("ca_second_derivative", "h", "Matches second derivatives")])

T("sr_maclaurin", P, CA, "Maclaurin series", "17-18",
  "Derive Maclaurin series from derivatives at 0, f(x) = f(0) + f′(0)x + f″(0)x²/2! + …, and know the series for eˣ, sin x, cos x and ln(1 + x)",
  ["Derives the series for eˣ",
   "Derives the first terms for sin x",
   "Writes the general term using sigma notation"],
  "If {{name}} is asked to find a series for eˣ, can they derive it from the derivatives at 0?",
  [],
  [("sr_polynomial_approx", "h", "Generalises polynomial approximation"),
   ("sr_sigma", "h", "Series are written in sigma notation"),
   ("ca_exp_derivative", "h", "Uses the derivative of eˣ"),
   ("ca_trig_derivative", "h", "Uses the derivatives of sin and cos"),
   ("ca_ln_derivative", "s", "Uses the derivative of ln x")])

T("sr_maclaurin_validity", C, CA, "Range of validity of Maclaurin series", "17-18",
  "Recognise that some Maclaurin series converge for all x (eˣ, sin x) while others converge only on an interval (ln(1 + x) for −1 < x ≤ 1, 1/(1 − x) for |x| < 1)",
  ["States the range of validity of standard series",
   "Shows a series failing outside its range",
   "Links 1/(1 − x) to a geometric series"],
  "If {{name}} uses the series for ln(1 + x) at x = 3, can they explain why the answer is nonsense?",
  [],
  [("sr_maclaurin", "h", "Concerns Maclaurin series"),
   ("sr_sum_to_infinity", "h", "The geometric series is the model case")])

T("sr_series_from_known", P, CA, "Building new series from known series", "17-18",
  "Find series for new functions by substituting into, multiplying, differentiating or integrating known Maclaurin series",
  ["Finds the series for e^(2x) by substitution",
   "Finds the series for x sin x",
   "Differentiates a series term by term"],
  "If {{name}} knows the series for eˣ, can they quickly write the series for e^(−x²)?",
  [],
  [("sr_maclaurin", "h", "Starts from known series"),
   ("ca_chain_rule", "s", "Substitution parallels composite functions")])

T("sr_series_approximations", P, CA, "Using series to approximate values and limits", "17-18",
  "Use truncated series to estimate values such as e^0.1, to justify small-angle approximations (sin x ≈ x, cos x ≈ 1 − x²/2), and to find limits such as (sin x)/x as x → 0",
  ["Estimates e^0.1 from the first terms",
   "Justifies sin x ≈ x for small x",
   "Finds a limit using series"],
  "If {{name}} needs the limit of (1 − cos x)/x² as x → 0, can they use series to find it?",
  [],
  [("sr_maclaurin", "h", "Uses truncated Maclaurin series"),
   ("ca_limits", "s", "Finds limits")])

T("sr_series_accuracy", R, CA, "Accuracy of truncated series", "17-18",
  "Compare truncated series with the true function graphically and numerically, seeing that accuracy improves with more terms and near the centre of expansion",
  ["Graphs successive approximations to sin x",
   "Tabulates the error at several x values",
   "Explains where the approximation is best"],
  "If {{name}} graphs 1, 1 + x and 1 + x + x²/2 against eˣ, can they describe where each is accurate?",
  [],
  [("sr_maclaurin", "h", "Assesses truncated series"),
   ("fm_precision", "s", "Judges accuracy")])

T("sr_taylor", P, CA, "Taylor series about a point", "17-18",
  "Find Taylor series about x = a, such as ln x about x = 1, and use them to approximate values near a",
  ["Finds the series for ln x about x = 1",
   "Writes a series in powers of (x − a)",
   "Approximates a value near a"],
  "If {{name}} needs ln 1.1, can they use a series about x = 1 rather than about 0?",
  [],
  [("sr_maclaurin", "h", "Generalises Maclaurin series to any centre"),
   ("fm_transformations", "s", "Shifting the centre is a translation")])

T("sr_sums_and_integrals", C, CA, "Comparing sums with integrals", "17-18",
  "Compare a sum with an integral using rectangles, for example bounding 1 + 1/2 + … + 1/n with ln n to explain why the harmonic series diverges",
  ["Draws rectangles comparing a sum with an area",
   "Bounds a sum between two integrals",
   "Uses the comparison to explain divergence"],
  "If {{name}} draws rectangles under y = 1/x, can they explain why the harmonic series grows like ln n?",
  [],
  [("ca_riemann_sums", "h", "Uses rectangle area approximations"),
   ("ca_integrate_standard", "h", "Uses ∫ 1/x dx = ln x"),
   ("sr_divergence", "s", "Gives another view of the harmonic series")])

T("sr_partial_fraction_integration", P, CA, "Integrating with partial fractions", "17-18",
  "Integrate rational functions by splitting them into partial fractions, giving answers in terms of logarithms",
  ["Integrates 1/((x + 1)(x + 2))",
   "Evaluates a definite integral and simplifies logarithms",
   "Handles a repeated factor"],
  "If {{name}} needs ∫ 3/((x − 1)(x + 2)) dx, can they split it and integrate?",
  [],
  [("sr_partial_fractions", "h", "The integrand is split first"),
   ("ca_integrate_standard", "h", "Uses ∫ 1/x dx = ln|x|")])

# ---------------------------------------------------------------- parametric equations
T("sr_parametric_curves", R, FM, "Parametric equations of curves", "17-18",
  "Describe curves with parametric equations x = f(t), y = g(t), plot them, and convert to Cartesian form by eliminating the parameter, including circles x = r cos t, y = r sin t",
  ["Plots a curve from a table of t values",
   "Eliminates t to find a Cartesian equation",
   "Writes parametric equations for a circle"],
  "If {{name}} is given x = 2t, y = t², can they sketch the curve and find its Cartesian equation?",
  [],
  [("fm_function_notation", "h", "Uses x and y as functions of t"),
   ("gt_unit_circle", "h", "Circle parametrisations use cos t and sin t"),
   ("gt_pythagorean_identity", "s", "Eliminating t often uses sin²t + cos²t = 1"),
   ("al_sys_substitution", "s", "Eliminating the parameter is substitution")])

T("sr_parametric_modelling", M, FM, "Modelling motion with parametric equations", "17-18",
  "Model motion such as projectiles with parametric equations in time, and interpret the parameter, domain and features of the curve in context",
  ["Writes parametric equations for a projectile",
   "Finds when and where it lands",
   "Comments on the limits of the model"],
  "If {{name}} models a ball thrown at 20 m/s at 30°, can they write parametric equations and find its range?",
  [],
  [("sr_parametric_curves", "h", "Uses parametric equations"),
   ("mo_projectiles", "h", "Applies projectile motion"),
   ("fm_modelling_cycle", "s", "Follows the modelling cycle")])

T("sr_parametric_differentiation", P, CA, "Parametric differentiation", "17-18",
  "Find dy/dx = (dy/dt)/(dx/dt) for a parametric curve and use it to find tangents, normals and stationary points",
  ["Finds dy/dx for x = t², y = t³",
   "Finds the equation of a tangent at a given t",
   "Finds stationary points of a parametric curve"],
  "If {{name}} is given a curve in terms of t, can they find the gradient at t = 2 without converting to Cartesian form?",
  [],
  [("sr_parametric_curves", "h", "Differentiates parametric curves"),
   ("ca_chain_rule", "h", "The formula follows from the chain rule"),
   ("ca_tangents_normals", "s", "Finds tangents and normals")])

T("sr_parametric_integration", P, CA, "Area under a parametric curve", "17-18",
  "Find the area under a parametric curve using ∫ y (dx/dt) dt, changing the limits to values of t",
  ["Sets up the integral in terms of t",
   "Changes the limits correctly",
   "Finds the area enclosed by a loop"],
  "If {{name}} needs the area under x = t², y = 2t from x = 0 to x = 4, can they set up and evaluate the integral in t?",
  [],
  [("sr_parametric_curves", "h", "Works with parametric curves"),
   ("ca_substitution", "h", "The method is a change of variable"),
   ("ca_definite_integral", "h", "Areas are definite integrals")])
