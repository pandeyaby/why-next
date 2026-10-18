from dsl import T, C, P, R, L, M
D = "Algebra"

# ---------------------------------------------------------------- expressions
T("al_variable_meaning", C, D, "Letters as variables", "11-12",
  "Understand that a letter in algebra stands for a number (often one that can vary), not for an object — so 3a means 3 × a, not '3 apples' — and that the same letter has the same value throughout an expression",
  ["Explains that a letter represents a number",
   "Avoids the 'fruit salad' misconception (a = apples)",
   "Recognises that a + a must be 2a, not a + b"],
  "If {{name}} sees 'a + b = 10', can they explain that a and b stand for numbers — and give two different pairs of values that work?",
  ["6.EE.6"],
  [("mt_i9rJbuFO3p", "h", "Primary missing-number problems that used letters for unknowns lead into letters as variables"),
   ("mt_YFS7JFk64p", "s", "Finding many pairs for a + b = 10 shows letters can take different values")])

T("al_write_expressions", P, D, "Writing expressions from words", "11-12",
  "Translate verbal descriptions into algebraic expressions, e.g. '5 more than twice a number' → 2n + 5, paying attention to order for subtraction and division",
  ["Writes expressions for phrases like 'three less than n' (n − 3)",
   "Uses brackets when a whole quantity is multiplied",
   "Describes an expression in words"],
  "If {{name}} is told a cinema ticket costs £t and popcorn costs £4, can they write an expression for the cost of 3 tickets and one popcorn?",
  ["6.EE.2a", "6.EE.6"],
  [("al_variable_meaning", "h", "Writing expressions requires knowing what the letter represents"),
   ("mt_KwdjWEmMNo", "h", "Writing 2n + 5 or n/3 correctly needs algebraic notation for multiplying and dividing"),
   ("mt_4WaKWECpcv", "s", "Writing number sentences from problems is the primary precursor")])

T("al_equivalent_expr", C, D, "Equivalent expressions", "11-13",
  "Recognise that two expressions are equivalent when they give the same value for every value of the variable, and test or prove equivalence by substitution and by simplifying",
  ["Identifies equivalent expressions such as 3(x + 2) and 3x + 6",
   "Uses a counter-example to show two expressions are not equivalent",
   "Explains why checking one value is not enough to prove equivalence"],
  "If {{name}} is shown 2(x + 3) and 2x + 3, can they test some values and explain whether these always give the same answer?",
  ["6.EE.3", "6.EE.4"],
  [("mt_nNNVrLqPW3", "h", "Simplifying by collecting like terms is how equivalence is shown"),
   ("mt_vHzVa3SURC", "h", "Testing whether two expressions are equivalent means substituting the same values into both")])

T("al_negative_brackets", P, D, "Expanding brackets with negatives", "12-14",
  "Expand and simplify expressions with negative terms and negative multipliers, such as −3(x − 4) and 5 − 2(x + 1), applying sign rules correctly",
  ["Expands −3(x − 4) to −3x + 12",
   "Simplifies 5 − 2(x + 1) correctly",
   "Explains a common sign error in expanding"],
  "If {{name}} expands 10 − 2(x − 3), can they get 16 − 2x and explain what happens to the −3?",
  ["7.EE.1"],
  [("mt_FX4a2Q8XXN", "h", "Expanding −3(x − 4) extends single-bracket expansion to negative multipliers"),
   ("mt_rxInpOQ74w", "h", "Each term inside the bracket is multiplied using the sign rules, so −3 × −4 gives +12")])

T("al_evaluate_negatives", P, D, "Evaluating expressions with negative values", "12-13",
  "Substitute negative numbers and fractions into expressions with powers and brackets, following the order of operations — e.g. knowing that for x = −3, x² = 9 but −x² = −9",
  ["Evaluates 2x² − 5x for x = −2",
   "Distinguishes (−3)² from −3²",
   "Uses brackets when substituting negatives on a calculator"],
  "If {{name}} works out x² − 4x when x = −1, can they get 5 and explain each step with the negative signs?",
  ["6.EE.2c", "7.NS.3"],
  [("mt_vHzVa3SURC", "h", "Substituting positive values into formulae is extended to negative numbers and fractions"),
   ("mt_rxInpOQ74w", "h", "Squaring or multiplying negative values needs the sign rules, so (−3)² = 9"),
   ("mt_jHgRQ4hR0g", "h", "The order of operations decides that −x² means −(x²), so it is −9 when x = −3")])

T("al_rewrite_meaning", C, D, "Rewriting expressions to reveal meaning", "12-14",
  "Rewrite expressions in different equivalent forms to show something useful about a situation, e.g. a + 0.05a = 1.05a shows that 'increase by 5%' is the same as 'multiply by 1.05'",
  ["Rewrites a percentage increase as a single multiplier",
   "Explains what each form of an expression shows",
   "Chooses the form that best answers a question"],
  "If {{name}} sees that a price p rises by 20%, can they explain why p + 0.2p and 1.2p mean the same thing?",
  ["7.EE.2"],
  [("al_equivalent_expr", "h", "Rewriting a + 0.05a as 1.05a is only valid because the two forms are equivalent for every a"),
   ("mt_iEXqN48w3x", "s", "Percentage increase gives the classic example of a multiplier revealed by rewriting")])

T("al_interpret_parts", C, D, "Interpreting parts of an expression in context", "14-16",
  "Interpret the terms, factors and coefficients of an expression in terms of the situation it models, and view complicated parts as single quantities — e.g. in P(1 + r)ⁿ, P is the starting amount and (1 + r) is the growth factor",
  ["Explains the meaning of each part of a formula in context",
   "Identifies which part of an expression controls the rate of change",
   "Treats a bracketed part as a single quantity"],
  "If {{name}} sees a taxi fare written as 3 + 1.5m, can they explain what the 3 and the 1.5 mean in real life?",
  ["A-SSE.1", "A-SSE.1.a", "A-SSE.1.b"],
  [("al_rewrite_meaning", "h", "Reading P(1 + r)ⁿ in context builds on rewriting expressions so their parts carry meaning"),
   ("mt_z5iwdZyeDr", "s", "Translating situations into algebra is the reverse of interpreting them")])

T("al_see_structure", C, D, "Seeing structure in expressions", "15-17",
  "Spot hidden structure in expressions to rewrite them — e.g. seeing x⁴ − y⁴ as (x²)² − (y²)², or 4x² + 12x + 9 as (2x + 3)² — choosing a form that makes the problem easier",
  ["Recognises a difference of two squares in disguise",
   "Recognises a perfect-square trinomial",
   "Uses substitution (let u = x²) to see a quadratic in disguise"],
  "If {{name}} is asked to factorise x⁴ − 16, can they spot it as a difference of two squares — twice?",
  ["A-SSE.2"],
  [("al_interpret_parts", "h", "Seeing x⁴ − y⁴ as (x²)² − (y²)² relies on treating a chunk of an expression as a single quantity"),
   ("al_diff_squares", "h", "A difference of two squares is the hidden structure most often spotted and used to rewrite")])

# ---------------------------------------------------------------- exponents & radicals
T("al_roots_equations", P, D, "Solving x² = p and x³ = p", "13-15",
  "Use square-root and cube-root symbols to solve equations of the form x² = p and x³ = p, recognising that x² = p has two solutions and that √2 is irrational",
  ["Solves x² = 49 giving both ±7",
   "Solves x³ = −8",
   "Estimates √20 between two whole numbers"],
  "If {{name}} solves x² = 36, can they explain why there are two answers?",
  ["8.EE.2", "KS3.Maths.Num.7"],
  [("mt_hCVPYlF-7Y", "h", "Square and cube roots are introduced alongside square and cube numbers"),
   ("mt_rxInpOQ74w", "h", "The second, negative solution of x² = p comes from the sign rules, since (−7)² = 49 as well")])

T("al_irrational_approx", P, D, "Approximating irrational numbers", "13-15",
  "Locate irrational numbers such as √2, √50 and π on a number line by finding rational approximations, and compare their sizes",
  ["Places √2 between 1.4 and 1.5 on a number line",
   "Orders a list containing integers, fractions and roots",
   "Explains why √2 cannot be written as a fraction"],
  "If {{name}} is asked whether √50 is closer to 7 or 8, can they explain how they know without a calculator?",
  ["8.NS.1", "8.NS.2"],
  [("al_roots_equations", "h", "Approximating √50 means knowing that it is the positive number whose square is 50"),
   ("mt_b4lbTOJYwI", "h", "Telling rational from irrational numbers explains why √2 and π can only be approximated")])

T("al_exponent_laws", P, D, "Laws of exponents", "13-15",
  "Apply the laws of exponents for multiplying, dividing and raising powers to powers — aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ — with numbers and variables",
  ["Simplifies x³ × x⁴ and y⁸ ÷ y²",
   "Simplifies (2x³)²",
   "Explains a law by writing out the repeated multiplication"],
  "If {{name}} is asked to simplify x³ × x⁵, can they explain why the answer is x⁸ and not x¹⁵?",
  ["8.EE.1"],
  [("mt_hCVPYlF-7Y", "h", "The laws generalise squares and cubes to any power, so 5² × 5³ is seen as 5 × 5 × 5 × 5 × 5"),
   ("mt_nNNVrLqPW3", "s", "Simplifying algebraic expressions is the context for the laws")])

T("al_zero_negative_exp", C, D, "Zero and negative exponents", "13-15",
  "Explain why a⁰ = 1 and a⁻ⁿ = 1/aⁿ using patterns and the laws of exponents, and evaluate expressions such as 2⁻³ and 10⁻²",
  ["Uses a halving pattern to explain 2⁰ = 1",
   "Evaluates negative powers as fractions",
   "Simplifies expressions mixing positive and negative exponents"],
  "If {{name}} sees 10⁻², can they explain why that equals 0.01 by continuing the pattern 10², 10¹, 10⁰…?",
  ["8.EE.1"],
  [("al_exponent_laws", "h", "Applying aᵐ ÷ aⁿ = aᵐ⁻ⁿ when n ≥ m is what forces a⁰ = 1 and a⁻ⁿ = 1/aⁿ"),
   ("mt_HLUqHJ9Y7n", "s", "Dividing by ten each step in 1000, 100, 10, … continues the pattern to 10⁰ = 1 and 10⁻¹ = 0.1")])

T("al_sci_notation_ops", P, D, "Calculating with scientific notation", "13-15",
  "Multiply, divide, add and subtract numbers in scientific notation, choose sensible units, and interpret calculator output such as 3.2E-5",
  ["Multiplies (3 × 10⁴)(2 × 10⁵) using exponent laws",
   "Divides numbers in scientific notation",
   "Interprets 'E' notation on a calculator"],
  "If {{name}} needs to find how far light travels in a year (3 × 10⁸ m/s × 3.2 × 10⁷ s), can they do the calculation in scientific notation?",
  ["8.EE.4"],
  [("mt_bO-njVOige", "h", "Calculations require numbers in standard form (scientific notation)"),
   ("al_zero_negative_exp", "s", "Very small numbers such as 3.2 × 10⁻⁵ are written with negative powers of ten"),
   ("al_exponent_laws", "h", "Multiplying and dividing numbers in scientific notation adds and subtracts the powers of ten")])

T("al_rational_exponents", C, D, "Fractional exponents and radicals", "15-17",
  "Explain fractional exponents by extending the exponent laws — a^(1/n) is the nth root of a and a^(m/n) = (ⁿ√a)ᵐ — and rewrite expressions between radical and exponent form",
  ["Evaluates 8^(2/3) and 16^(−1/2)",
   "Rewrites √x³ as x^(3/2)",
   "Explains why 5^(1/2) must equal √5 using exponent laws"],
  "If {{name}} sees 27^(1/3), can they explain why it means the cube root of 27?",
  ["N-RN.1", "N-RN.2"],
  [("al_zero_negative_exp", "h", "Fractional exponents complete the extension of the exponent laws"),
   ("al_roots_equations", "h", "a^(1/n) is defined as the nth root of a, so square and cube roots must already be understood")])

T("al_surds", P, D, "Simplifying surds", "15-17",
  "Simplify and calculate with surds, e.g. √12 = 2√3, √2 × √8 = 4, and rationalise simple denominators",
  ["Simplifies √48 using square factors",
   "Adds like surds such as 2√3 + 5√3",
   "Rationalises 1/√2"],
  "If {{name}} is asked to simplify √72, can they find the largest square factor and write it as 6√2?",
  ["N-RN.2"],
  [("al_roots_equations", "h", "Surds are square roots that are not whole numbers, such as the irrational solutions of x² = 12"),
   ("mt_xhoOWnhtHq", "h", "Simplifying √12 to 2√3 means finding the largest square factor of 12")])

# ---------------------------------------------------------------- linear equations & inequalities
T("al_balance", C, D, "Equations as balance", "11-12",
  "Understand an equation as a statement that two expressions are equal, and that doing the same operation to both sides keeps it balanced — the basis for every solving step",
  ["Explains why adding 5 to only one side breaks an equation",
   "Models an equation with a balance or bar model",
   "Describes each solving step as 'doing the same to both sides'"],
  "If {{name}} sees 3x + 4 = 19 drawn as a balance, can they explain what they're allowed to do to both sides to find x?",
  ["6.EE.5", "6.EE.7"],
  [("mt_oIzycTBeE4", "h", "Treating an equation as a balance depends on reading '=' as 'is the same as', not 'gives the answer'"),
   ("mt_i9rJbuFO3p", "h", "Missing-number problems written as equations with a letter are the equations now balanced"),
   ("mt_XuHmIn2xje", "s", "Primary missing-number problems such as 7 + □ = 12 are the earliest equations solved by balancing"),
   ("mt_VUQNveSYjQ", "s", "Each balancing step applies an inverse operation to both sides, such as subtracting to undo adding")])

T("al_equation_word_problems", P, D, "Solving word problems with linear equations", "12-14",
  "Turn a word problem into a linear equation, solve it, and check the answer makes sense in context",
  ["Defines the variable clearly",
   "Writes and solves a linear equation for a real problem",
   "Checks the solution against the original story"],
  "If {{name}} is told 'the perimeter of a rectangle is 30 cm and its length is 3 cm more than its width', can they write an equation and find the width?",
  ["7.EE.4a", "A-CED.1"],
  [("mt_QhFEDyIwSO", "h", "Once the story is written as an equation, it is solved with the KS3 methods for linear equations"),
   ("al_write_expressions", "h", "Writing the equation requires translating words into expressions")])

T("al_solution_count", C, D, "Equations with one, no or infinitely many solutions", "13-15",
  "Recognise when a linear equation has exactly one solution, no solution (e.g. reduces to 3 = 5) or infinitely many (reduces to an identity like 4 = 4), and create examples of each",
  ["Classifies equations by number of solutions after simplifying",
   "Explains what 0 = 7 tells you",
   "Writes an equation with infinitely many solutions"],
  "If {{name}} simplifies 2(x + 3) = 2x + 6 and gets 6 = 6, can they explain what that says about x?",
  ["8.EE.7a"],
  [("mt_QhFEDyIwSO", "h", "An equation that reduces to 3 = 5 or 4 = 4 is spotted only while carrying out the usual solving steps"),
   ("al_equivalent_expr", "h", "Infinitely many solutions means the two sides are equivalent expressions"),
   ("al_balance", "s", "Thinking of equations as balance helps interpret impossible statements")])

T("al_justify_steps", M, D, "Justifying steps in solving equations", "14-16",
  "Explain each step of solving an equation as following from the step before using properties of equality, and construct a viable argument for why a method works",
  ["Writes a reason beside each line of a solution",
   "Spots and explains an invalid step (e.g. dividing by zero)",
   "Explains why a solution method is valid"],
  "If {{name}} solves 5x − 3 = 2x + 9, can they say why each line follows from the line before?",
  ["A-REI.1"],
  [("al_balance", "h", "Properties of equality are the formal version of keeping balance"),
   ("mt_QhFEDyIwSO", "h", "Justifying each step needs fluent solving of linear equations to know which steps are taken"),
   ("mt_j5YqQnN6xe", "s", "Explaining why each step follows from the last applies general skills in constructing arguments")])

T("al_formula_powers", P, D, "Rearranging formulas with powers and roots", "14-16",
  "Rearrange formulas where the subject is squared, square-rooted, in a fraction or appears with other terms — e.g. make v the subject of KE = ½mv² or r the subject of A = πr²",
  ["Rearranges a formula containing a square",
   "Rearranges a formula with the subject in a denominator",
   "Checks a rearrangement by substituting numbers"],
  "If {{name}} is given A = πr², can they rearrange it to find r when the area is known?",
  ["A-CED.4"],
  [("mt_3qrCtdoVAU", "h", "Rearranging simple formulae at KS3 is extended to subjects that are squared or under a root"),
   ("al_roots_equations", "h", "Making v the subject of KE = ½mv² ends with taking a square root to undo the square")])

T("al_ineq_negative", P, D, "Solving inequalities with negative coefficients", "13-15",
  "Solve linear inequalities including those where you multiply or divide by a negative number, explaining why the inequality sign must reverse, and show the solution set on a number line",
  ["Solves −2x > 6 to get x < −3",
   "Explains the sign reversal with a numerical example",
   "Shows the solution on a number line with open or closed circles"],
  "If {{name}} solves 5 − 3x ≥ 11, can they explain why the inequality flips when they divide by −3?",
  ["7.EE.4b", "A-REI.3"],
  [("mt_i2F1nWxJjv", "h", "Solution sets are shown on a number line, and the sign reversal is seen as reflecting it in zero"),
   ("mt_rxInpOQ74w", "h", "Multiplying both sides by a negative flips their order, which is why the inequality sign reverses")])

T("al_compound_ineq", P, D, "Compound inequalities", "14-16",
  "Solve and graph compound inequalities such as −2 < 3x + 1 ≤ 7, and interpret 'and' versus 'or' solution sets",
  ["Solves a double inequality by acting on all three parts",
   "Graphs 'and' and 'or' solution sets",
   "Lists integer solutions of a compound inequality"],
  "If {{name}} is told a parcel must weigh more than 2 kg but at most 5 kg, can they write and graph that as one inequality?",
  ["A-REI.3"],
  [("al_ineq_negative", "h", "Solving −2 < 3x + 1 ≤ 7 applies the single-inequality steps to all three parts at once")])

T("al_abs_value", P, D, "Absolute value equations and inequalities", "15-17",
  "Interpret absolute value as distance from zero and solve equations and inequalities such as |x − 3| = 5 and |x − 3| < 5",
  ["Interprets |x − 3| as distance from 3",
   "Solves an absolute value equation giving both solutions",
   "Writes |x − 3| < 5 as a compound inequality"],
  "If {{name}} is told a machine part must be within 0.2 mm of 10 mm, can they write this using absolute value and solve it?",
  [],
  [("al_compound_ineq", "h", "|x − 3| < 5 becomes the compound inequality −5 < x − 3 < 5, which is then solved"),
   ("mt_9QzSnn8m80", "s", "Distance from zero on a number line uses positive and negative numbers")])

T("al_create_equations", P, D, "Creating equations and inequalities to solve problems", "14-16",
  "Create equations and inequalities in one variable — linear, simple quadratic and exponential — to represent constraints in a problem, and solve them",
  ["Writes an inequality for a budget constraint",
   "Creates an equation from a geometric context",
   "Interprets the solution in context"],
  "If {{name}} has £50 and wants to buy a £14 game plus as many £3 snacks as possible, can they write an inequality and find the maximum number of snacks?",
  ["A-CED.1"],
  [("al_equation_word_problems", "h", "Turning a linear word problem into an equation is extended to quadratic and exponential constraints"),
   ("al_ineq_negative", "h", "Constraints such as 'at most' or 'at least' are written and solved as inequalities")])

# ---------------------------------------------------------------- linear relationships
T("al_slope_triangles", C, D, "Why slope is constant: similar triangles", "13-15",
  "Use similar right triangles drawn between points on a line to explain why the slope is the same between any two points, and derive y = mx and y = mx + b",
  ["Draws slope triangles of different sizes on the same line",
   "Explains why their rise/run ratios are equal",
   "Derives y = mx for a line through the origin"],
  "If {{name}} draws two different-sized steps under the same straight line, can they explain why they give the same slope?",
  ["8.EE.6"],
  [("mt_-3udyo6VyB", "h", "Calculating gradients from points is where slope is first met"),
   ("mt_1badik7iKJ", "s", "Similar triangles have equal ratios of sides, which is why rise over run is the same anywhere on a line")])

T("al_compare_proportional", P, D, "Comparing proportional relationships", "13-14",
  "Graph proportional relationships, interpret the unit rate as the slope, and compare two relationships given in different forms (table, graph, equation, words)",
  ["Identifies the unit rate in a graph, table and equation",
   "Compares two proportional relationships given in different forms",
   "Explains why a proportional graph passes through the origin"],
  "If {{name}} is told one car uses 6 litres per 100 km and another's fuel use is shown on a graph, can they decide which is more efficient?",
  ["8.EE.5"],
  [("mt_FspV_imUGK", "h", "Proportional relationships graph as lines through the origin, as equivalent ratios did at KS3"),
   ("mt_WBdHkc2HTf", "h", "The unit rate is read as the gradient of the line, so slope on a linear graph is needed")])

T("al_line_from_points", P, D, "Writing the equation of a line", "14-16",
  "Write the equation of a line from its slope and a point, from two points, or from a graph, using slope-intercept or point-slope form",
  ["Finds the equation through (2, 5) and (4, 9)",
   "Uses point-slope form y − y₁ = m(x − x₁)",
   "Checks the equation using both points"],
  "If {{name}} is given the points (1, 3) and (3, 7), can they find the equation of the line through them?",
  ["F-LE.2", "A-CED.2"],
  [("mt_-3udyo6VyB", "h", "Finding the gradient from two plotted points is the first step in writing the line's equation"),
   ("mt_WBdHkc2HTf", "h", "Writing y = mx + c needs m as the gradient and c as the y-intercept of a linear graph")])

T("al_standard_form_line", R, D, "Standard form of a line and intercepts", "14-16",
  "Work with linear equations in the form Ax + By = C, find intercepts to sketch the line quickly, and convert to slope-intercept form",
  ["Finds x- and y-intercepts of 3x + 2y = 12",
   "Converts Ax + By = C to y = mx + c",
   "Chooses the form that suits a context (e.g. budget lines)"],
  "If {{name}} sees 2x + 5y = 20, can they sketch the line quickly by finding where it crosses each axis?",
  ["A-CED.2"],
  [("mt_WBdHkc2HTf", "h", "Converting Ax + By = C to y = mx + c only helps if the meaning of m and c is understood"),
   ("mt_3qrCtdoVAU", "h", "Converting Ax + By = C into y = mx + c is rearranging a formula to make y the subject")])

T("al_parallel_perp", C, D, "Slopes of parallel and perpendicular lines", "15-16",
  "Use slopes to identify parallel lines (equal slopes) and perpendicular lines (slopes multiply to −1), and write equations of lines parallel or perpendicular to a given line",
  ["Identifies parallel lines from their equations",
   "Finds the slope of a perpendicular line",
   "Writes the equation of a line perpendicular to y = 2x + 1 through a given point"],
  "If {{name}} has the line y = 3x − 2, can they write a line that's parallel to it and one that's perpendicular to it?",
  ["HSG-GPE.B.5"],
  [("al_line_from_points", "h", "Writing parallel/perpendicular lines requires writing line equations")])

T("al_graph_solutions", C, D, "A graph shows all solutions", "14-15",
  "Understand that the graph of an equation in two variables is the set of all its solutions plotted on coordinate axes, so every point on the line satisfies the equation and every point off it does not",
  ["Checks whether a point lies on a line by substitution",
   "Explains why a point off the line is not a solution",
   "Connects the primary activity of listing pairs to a continuous graph"],
  "If {{name}} is asked whether (2, 7) lies on y = 3x + 1, can they check without drawing and explain what being 'on the line' means?",
  ["A-REI.10"],
  [("mt_YFS7JFk64p", "h", "Listing pairs that satisfy an equation with two unknowns is the primary seed of this idea"),
   ("mt_-3udyo6VyB", "h", "Plotting points from a table of values shows that each point on the line is a solution pair"),
   ("mt_fxPtngwUfz", "s", "Graphing ordered pairs from two related patterns is the earliest version")])

T("al_intersections", R, D, "Solving f(x) = g(x) with graphs", "15-17",
  "Explain why the x-coordinates where y = f(x) and y = g(x) intersect solve f(x) = g(x), and find approximate solutions using graphs, tables or technology for linear, quadratic and exponential functions",
  ["Finds approximate solutions of x² = x + 3 from graphs",
   "Uses a table of values to narrow down a solution",
   "Explains why the intersection gives a solution"],
  "If {{name}} wants to know when 2ˣ overtakes 3x + 1, can they use graphs or a table to find roughly where?",
  ["A-REI.11"],
  [("al_graph_solutions", "h", "Each graph is the solution set of its own equation, so a shared point satisfies both"),
   ("fm_function_notation", "h", "Writing the problem as f(x) = g(x) needs two expressions named and evaluated as functions"),
   ("mt_Yw27nweoTj", "s", "Reading approximate solutions from a graph uses estimation, then checking by substitution")])

# ---------------------------------------------------------------- systems
T("al_sys_substitution", P, D, "Solving systems by substitution", "14-16",
  "Solve a system of two linear equations by rearranging one equation and substituting into the other, and check the solution in both equations",
  ["Solves y = 2x + 1 and 3x + y = 11 by substitution",
   "Chooses which variable to isolate sensibly",
   "Checks the solution in both equations"],
  "If {{name}} has y = x + 4 and 2x + y = 13, can they substitute and find both values?",
  ["8.EE.8b", "A-REI.6"],
  [("mt_mqgu72aCMz", "h", "KS3 simultaneous equations are now solved by substitution as an algebraic method"),
   ("mt_vHzVa3SURC", "h", "An expression such as 2x + 1 is substituted for y in the other equation, not just a number"),
   ("mt_3qrCtdoVAU", "s", "One equation is first rearranged to make x or y the subject, as with a formula")])

T("al_sys_elimination", P, D, "Solving systems by elimination", "14-16",
  "Solve a system of two linear equations by adding or subtracting multiples of the equations to eliminate a variable, and explain why this produces an equivalent system",
  ["Solves systems where one variable already has matching coefficients",
   "Multiplies one or both equations to create matching coefficients",
   "Explains why adding equations keeps the same solution"],
  "If {{name}} has 3x + 2y = 16 and x − 2y = 0, can they add the equations to eliminate y and find the solution?",
  ["A-REI.5", "A-REI.6"],
  [("mt_mqgu72aCMz", "h", "KS3 simultaneous equations are solved by adding or subtracting multiples to eliminate a variable"),
   ("al_negative_brackets", "s", "Subtracting one equation from another changes every sign in the second equation")])

T("al_sys_types", C, D, "Systems with no or infinitely many solutions", "14-16",
  "Recognise from graphs or algebra when a linear system has one solution (intersecting lines), no solution (parallel lines) or infinitely many (the same line)",
  ["Predicts the number of solutions from slopes and intercepts",
   "Interprets 0 = 5 when eliminating",
   "Writes a system with no solution"],
  "If {{name}} tries to solve y = 2x + 1 and y = 2x + 4, can they explain why there's no solution both algebraically and with a sketch?",
  ["8.EE.8b"],
  [("al_sys_elimination", "h", "A contradiction such as 0 = 5, or an identity 0 = 0, appears during elimination"),
   ("al_solution_count", "h", "Mirrors one-variable equations with no or infinite solutions")])

T("al_sys_word", P, D, "Modelling with systems of equations", "14-16",
  "Set up and solve systems of linear equations for real problems — mixtures, pricing, break-even — and interpret the solution in context",
  ["Defines two variables and writes two equations from a problem",
   "Solves the system using a suitable method",
   "Interprets a break-even point"],
  "If {{name}} hears that 2 adult and 3 child tickets cost £31, and 1 adult and 4 child tickets cost £28, can they find the price of each ticket?",
  ["8.EE.8c", "A-CED.3"],
  [("al_sys_substitution", "h", "The equations set up from a mixture or pricing problem are solved by substitution"),
   ("al_sys_elimination", "s", "Elimination is often the quicker method when both equations are in the form ax + by = c"),
   ("al_equation_word_problems", "h", "Translating each fact in the story into an equation is the same modelling step as for one equation")])

T("al_sys_three", P, D, "Systems of three linear equations", "16-18",
  "Solve systems of three linear equations in three unknowns by elimination, and interpret the solution as the meeting point of three planes",
  ["Reduces a 3×3 system to a 2×2 system",
   "Solves for all three unknowns and checks",
   "Sets up a 3-variable system from a context"],
  "If {{name}} is given three equations about the prices of three different fruits, can they eliminate step by step to find each price?",
  [],
  [("al_sys_elimination", "h", "Three-variable systems are solved by eliminating one variable twice to leave a two-variable system")])

T("al_ineq_two_var", R, D, "Graphing linear inequalities in two variables", "15-16",
  "Graph a linear inequality in two variables as a half-plane, using a dashed or solid boundary line and a test point to decide which side to shade",
  ["Draws the boundary line correctly as solid or dashed",
   "Uses a test point to choose the shaded region",
   "Writes the inequality for a shaded region"],
  "If {{name}} graphs y > 2x − 1, can they explain why the line is dashed and which side gets shaded?",
  ["A-REI.12"],
  [("al_ineq_negative", "h", "Two-variable inequalities extend one-variable inequality solving"),
   ("al_standard_form_line", "h", "The boundary line is often given as Ax + By = C and sketched quickly from its intercepts"),
   ("al_graph_solutions", "s", "A shaded region is the solution set, as a line is for an equation")])

T("al_sys_ineq", P, D, "Systems of linear inequalities", "15-17",
  "Graph systems of linear inequalities to find the feasible region, and interpret points in the region as viable solutions to a constraint problem",
  ["Shades the region satisfying two or more inequalities",
   "Tests whether a point is a viable solution",
   "Interprets a corner point in context"],
  "If {{name}} has at most 10 hours to split between two jobs and needs to earn at least £80, can they graph the possibilities and pick a workable plan?",
  ["A-REI.12", "A-CED.3"],
  [("al_ineq_two_var", "h", "Each constraint is graphed as a half-plane, and the feasible region is where they overlap"),
   ("mt_mqgu72aCMz", "s", "The corners of the feasible region are found by solving pairs of boundary equations simultaneously")])

# ---------------------------------------------------------------- polynomials
T("al_poly_vocab", L, D, "Polynomial vocabulary", "14-15",
  "Use the vocabulary of polynomials — monomial, binomial, trinomial, degree, leading coefficient, constant term, standard form — to describe and classify expressions",
  ["Identifies the degree and leading coefficient",
   "Writes a polynomial in standard form",
   "Classifies expressions as polynomials or not"],
  "If {{name}} sees 5 − 3x² + 2x, can they rewrite it in standard form and name its degree?",
  ["A-SSE.1.a"],
  [("mt_g_fkAqmz72", "h", "KS3 words such as term and coefficient are extended to degree, leading coefficient and constant term"),
   ("al_exponent_laws", "s", "The degree of a term is the sum of its exponents, so x²y³ has degree 5")])

T("al_poly_add_sub", P, D, "Adding and subtracting polynomials", "14-15",
  "Add and subtract polynomials by combining like terms, distributing a subtraction sign across every term of the second polynomial",
  ["Adds two quadratics correctly",
   "Subtracts a polynomial in brackets, changing every sign",
   "Explains why polynomials are closed under addition"],
  "If {{name}} subtracts (2x² − 3x + 1) from (5x² + x − 4), can they get every sign right?",
  ["A-APR.1"],
  [("al_poly_vocab", "h", "Only like terms, with the same variables to the same powers, can be combined when adding"),
   ("al_negative_brackets", "h", "Subtracting a polynomial means distributing the minus sign across every term in the bracket")])

T("al_poly_multiply", P, D, "Multiplying polynomials", "14-16",
  "Multiply polynomials, including a binomial by a trinomial and three binomials, using the distributive property or a grid",
  ["Multiplies (x + 2)(x² − 3x + 1)",
   "Expands (x + 1)(x + 2)(x + 3)",
   "Checks by substituting a value"],
  "If {{name}} multiplies (x − 1)(x² + x + 1), can they show every product and simplify to x³ − 1?",
  ["A-APR.1"],
  [("mt_KhS7K1Mgrw", "h", "Expanding double brackets is extended to a binomial times a trinomial and three binomials"),
   ("al_poly_add_sub", "h", "The many terms of the product are simplified by collecting like terms")])

T("al_special_products", P, D, "Perfect squares and difference of squares", "14-16",
  "Recognise and expand the special products (a + b)² = a² + 2ab + b², (a − b)² and (a + b)(a − b) = a² − b², and use them for quick mental calculations",
  ["Expands (x + 5)² without a grid",
   "Explains why (x + 5)² ≠ x² + 25",
   "Uses 49 × 51 = 50² − 1 for mental arithmetic"],
  "If {{name}} is asked to expand (x + 3)², can they explain why the answer has a middle term and isn't just x² + 9?",
  ["A-SSE.2"],
  [("mt_KhS7K1Mgrw", "h", "(a + b)² and (a + b)(a − b) are double-bracket expansions whose terms follow a fixed pattern")])

T("al_factor_simple_quadratic", P, D, "Factorising x² + bx + c", "14-16",
  "Factorise quadratic expressions of the form x² + bx + c by finding two numbers that multiply to c and add to b, including negative values",
  ["Factorises x² + 7x + 12",
   "Factorises x² − 2x − 15 with negative numbers",
   "Checks by expanding"],
  "If {{name}} is asked to factorise x² + 5x + 6, can they find the two numbers and explain how they chose them?",
  ["A-SSE.2", "A-SSE.3.a"],
  [("mt_uESbzWCZIq", "h", "KS3 factorising by taking out a common factor is extended to factorising into two brackets"),
   ("mt_KhS7K1Mgrw", "h", "Factorising reverses double-bracket expansion, so (x + 2)(x + 3) is recognised in x² + 5x + 6"),
   ("mt_xhoOWnhtHq", "s", "Finding two numbers that multiply to c means listing the factor pairs of c")])

T("al_factor_general_quadratic", P, D, "Factorising ax² + bx + c", "15-17",
  "Factorise quadratic expressions with a leading coefficient other than 1, using grouping or a systematic method",
  ["Factorises 2x² + 7x + 3",
   "Takes out a common factor first where possible",
   "Checks by expanding"],
  "If {{name}} factorises 3x² + 10x + 8, can they show a reliable method and check the answer?",
  ["A-SSE.2"],
  [("al_factor_simple_quadratic", "h", "Factorising x² + bx + c is extended to a leading coefficient other than 1 by grouping")])

T("al_diff_squares", P, D, "Factorising a difference of two squares", "14-16",
  "Factorise expressions of the form a² − b² as (a + b)(a − b), including with coefficients such as 9x² − 25",
  ["Factorises x² − 49",
   "Factorises 4x² − 81y²",
   "Explains why x² + 49 does not factorise this way"],
  "If {{name}} sees x² − 64, can they factorise it instantly and explain the pattern?",
  ["A-SSE.2"],
  [("al_special_products", "h", "Factorising reverses the difference-of-squares special product")])

T("al_poly_division", P, D, "Dividing polynomials and the remainder theorem", "16-18",
  "Divide a polynomial by a linear factor (by long division or inspection) and use the remainder theorem: the remainder on dividing p(x) by (x − a) is p(a), so (x − a) is a factor exactly when p(a) = 0",
  ["Divides a cubic by (x − 2)",
   "Uses p(a) to test whether (x − a) is a factor",
   "Fully factorises a cubic given one factor"],
  "If {{name}} is given p(x) = x³ − 6x² + 11x − 6, can they test whether (x − 1) is a factor without dividing?",
  ["A-APR.2", "A-APR.6"],
  [("al_poly_multiply", "h", "Polynomial division reverses multiplication, finding the factor that multiplies to give p(x)"),
   ("fm_function_notation", "h", "The remainder theorem states that the remainder is p(a), so evaluating p(a) must be familiar")])

T("al_poly_zeros", R, D, "Zeros of polynomials and their graphs", "16-18",
  "Identify the zeros of a factorised polynomial and use them, with the leading term, to sketch a rough graph of the function",
  ["Lists the zeros of (x − 1)(x + 2)(x − 4)",
   "Sketches the graph using zeros and end behaviour",
   "Explains what a repeated factor does to the graph"],
  "If {{name}} sees y = (x + 1)(x − 2)(x − 3), can they sketch roughly what the graph looks like without plotting points?",
  ["A-APR.3"],
  [("al_poly_division", "h", "Each linear factor (x − a) found with the factor theorem gives a zero at x = a"),
   ("al_quad_roots_graph", "h", "Generalises the link between roots and x-intercepts for quadratics")])

T("al_algebraic_fractions", P, D, "Simplifying algebraic fractions", "15-17",
  "Simplify rational expressions by factorising and cancelling common factors, and add, subtract, multiply and divide simple algebraic fractions",
  ["Simplifies (x² − 9)/(x + 3)",
   "Adds 1/x + 2/(x + 1) using a common denominator",
   "Explains why you can't cancel the x in (x + 2)/x"],
  "If {{name}} is asked to simplify (x² + 5x + 6)/(x + 2), can they factorise first and explain what's allowed to cancel?",
  ["A-APR.6"],
  [("al_factor_simple_quadratic", "h", "Cancelling an algebraic fraction needs the numerator and denominator factorised first"),
   ("mt_b7T-CjOYUR", "s", "Cancelling a common factor top and bottom is the same move as simplifying a numerical fraction"),
   ("mt_14T5yPXUq_", "s", "Adding algebraic fractions mirrors adding fractions with unlike denominators")])

T("al_identities", M, D, "Proving algebraic identities", "16-18",
  "Prove that two expressions are identically equal by manipulating one side into the other, and use identities to explain number facts (e.g. the product of two consecutive odd numbers is one less than a multiple of 4)",
  ["Proves an identity by expanding and simplifying",
   "Uses ≡ correctly",
   "Proves a statement about consecutive integers algebraically"],
  "If {{name}} is asked to prove that the sum of three consecutive whole numbers is always a multiple of 3, can they write an algebraic proof?",
  ["A-APR.4"],
  [("al_special_products", "h", "Many identities, such as for consecutive numbers, are proved by expanding special products"),
   ("al_justify_steps", "h", "A proof of an identity needs every step justified, as when explaining steps in solving")])

# ---------------------------------------------------------------- quadratics
T("al_quad_function", C, D, "Quadratic functions and parabolas", "14-16",
  "Describe the features of quadratic functions y = ax² + bx + c — the parabola's direction (sign of a), axis of symmetry, vertex, y-intercept and roots — and graph them from a table or technology",
  ["Predicts whether a parabola opens up or down",
   "Identifies the vertex, axis of symmetry and intercepts on a graph",
   "Graphs a quadratic from a table of values"],
  "If {{name}} sees the graph of y = −x² + 4, can they say which way it opens, where its highest point is and where it crosses the axes?",
  ["F-IF.7a", "F-IF.4"],
  [("mt_GZuoYaDdWd", "h", "Extends KS3 recognition of quadratic graphs to their features"),
   ("fm_function_notation", "s", "Writing y = ax² + bx + c as f(x) treats the quadratic as a function with inputs and outputs")])

T("al_quad_factor_solve", P, D, "Solving quadratics by factorising", "14-16",
  "Solve quadratic equations by rearranging to = 0, factorising and using the zero-product property (if ab = 0 then a = 0 or b = 0)",
  ["Solves x² − 5x + 6 = 0",
   "Rearranges x² = 3x + 10 to = 0 before factorising",
   "Explains why the equation must equal zero first"],
  "If {{name}} solves x² + x − 12 = 0, can they factorise it, find both solutions and explain why the 'zero' matters?",
  ["A-REI.4.b", "A-SSE.3.a"],
  [("al_factor_simple_quadratic", "h", "The equation is solved by factorising the quadratic and setting each factor equal to zero"),
   ("mt_QhFEDyIwSO", "h", "Each factor set equal to zero, such as x − 3 = 0, is a linear equation to solve")])

T("al_quad_sqrt_solve", P, D, "Solving quadratics by square roots", "14-16",
  "Solve quadratics with no x-term or in the form (x + p)² = q by taking square roots, remembering both positive and negative roots",
  ["Solves 3x² = 48",
   "Solves (x − 2)² = 25",
   "Explains why x² = −4 has no real solutions"],
  "If {{name}} solves (x + 1)² = 16, can they find both solutions and explain where the ± comes from?",
  ["A-REI.4.b"],
  [("al_roots_equations", "h", "Solving (x + p)² = q extends solving x² = p, keeping both the positive and negative roots"),
   ("mt_QhFEDyIwSO", "h", "Getting the squared term on its own first uses the same balancing steps as linear equations")])

T("al_complete_square", P, D, "Completing the square", "15-17",
  "Rewrite x² + bx + c in the form (x + p)² + q, use it to solve quadratic equations and to identify the minimum or maximum value of the quadratic",
  ["Completes the square for x² + 6x + 2",
   "Solves a quadratic by completing the square",
   "Reads off the turning point from completed-square form"],
  "If {{name}} rewrites x² − 4x + 7 as (x − 2)² + 3, can they explain why the smallest value it can ever take is 3?",
  ["A-REI.4.a", "A-SSE.3.b"],
  [("al_special_products", "h", "Completing the square writes x² + bx + c using the perfect square (x + b/2)² = x² + bx + b²/4"),
   ("al_quad_sqrt_solve", "h", "After completing the square the equation is solved by square roots")])

T("al_quad_formula", P, D, "The quadratic formula", "15-17",
  "Use the quadratic formula x = (−b ± √(b² − 4ac)) / 2a to solve any quadratic equation, giving exact (surd) or decimal answers, and know it comes from completing the square",
  ["Identifies a, b and c correctly, including signs",
   "Solves a quadratic that does not factorise",
   "Gives answers to a sensible degree of accuracy or in surd form"],
  "If {{name}} needs to solve 2x² + 3x − 4 = 0, can they use the quadratic formula carefully and get both answers?",
  ["A-REI.4.a", "A-REI.4.b"],
  [("al_quad_sqrt_solve", "h", "The ± in the formula is the square-root step of solving (x + p)² = q"),
   ("al_evaluate_negatives", "h", "Substituting negative a, b, c values is error-prone without this skill"),
   ("al_complete_square", "s", "The formula is derived by completing the square on ax² + bx + c = 0")])

T("al_discriminant", C, D, "The discriminant", "15-17",
  "Use the discriminant b² − 4ac to decide whether a quadratic has two, one or no real solutions, and connect this to how many times the parabola meets the x-axis",
  ["Calculates the discriminant",
   "Predicts the number of real solutions",
   "Links the discriminant to the graph's x-intercepts"],
  "If {{name}} works out b² − 4ac for x² + 2x + 5 and gets a negative number, can they explain what that means for the graph?",
  ["A-REI.4.b"],
  [("al_quad_formula", "h", "The discriminant is the expression under the square root in the formula"),
   ("al_quad_function", "s", "Two, one or no real roots match a parabola that crosses, touches or misses the x-axis")])

T("al_quad_choose_method", M, D, "Choosing a method for a quadratic", "15-17",
  "Inspect a quadratic equation and choose an efficient method — square roots, factorising, completing the square or the formula — justifying the choice",
  ["Chooses square roots for x² = k type equations",
   "Recognises when factorising will be quick",
   "Uses the formula when the quadratic does not factorise nicely"],
  "If {{name}} is given four quadratic equations, can they choose the quickest method for each and explain why?",
  ["A-REI.4.b"],
  [("al_quad_factor_solve", "h", "Factorising is the quickest method whenever the quadratic has simple integer roots"),
   ("al_quad_formula", "h", "The formula works for every quadratic, so it is the fallback when factorising fails"),
   ("al_complete_square", "h", "Completing the square is chosen when the turning point is also wanted or b is even")])

T("al_quad_vertex_form", R, D, "Vertex form and turning points", "15-17",
  "Write a quadratic in vertex form y = a(x − h)² + k, read off the turning point and axis of symmetry, and use it to find maximum or minimum values in context",
  ["Converts to vertex form",
   "Reads the turning point from vertex form",
   "Finds the maximum height of a thrown object from its equation"],
  "If {{name}} sees y = −2(x − 3)² + 8, can they say where the top of the curve is and what its maximum value is?",
  ["F-IF.8a", "A-SSE.3.b"],
  [("al_complete_square", "h", "Vertex form a(x − h)² + k is what completing the square produces"),
   ("al_quad_function", "h", "The turning point and axis of symmetry are features of the parabola already described")])

T("al_quad_roots_graph", R, D, "Roots as x-intercepts", "15-16",
  "Connect the solutions of ax² + bx + c = 0 with the x-intercepts of y = ax² + bx + c, and use factorised form to sketch a parabola quickly",
  ["Reads roots from a graph",
   "Sketches y = (x − 1)(x + 3) using intercepts and vertex",
   "Explains why the vertex lies halfway between the roots"],
  "If {{name}} factorises y = x² − 2x − 8 as (x − 4)(x + 2), can they say where it crosses the x-axis and where the vertex is?",
  ["F-IF.8a"],
  [("al_quad_factor_solve", "h", "The x-intercepts are the roots found by solving ax² + bx + c = 0 by factorising"),
   ("al_quad_function", "h", "Sketching from factorised form adds the intercepts to the parabola's shape and direction")])

T("al_quad_problems", P, D, "Solving problems with quadratic equations", "15-17",
  "Form and solve quadratic equations from contexts such as area and projectile height, rejecting solutions that don't make sense",
  ["Forms a quadratic from an area problem",
   "Solves and rejects a negative length",
   "Interprets both times a ball is at a given height"],
  "If {{name}} is told a rectangle's length is 3 cm more than its width and its area is 40 cm², can they form and solve a quadratic and reject the answer that doesn't make sense?",
  ["A-CED.1"],
  [("al_quad_choose_method", "h", "The quadratic formed from an area or projectile context is solved with a suitable method"),
   ("al_equation_word_problems", "h", "Forming the equation from a description is the same modelling step used for linear problems")])

T("al_complex_solutions", C, D, "Complex solutions of quadratics", "16-18",
  "Extend the number system with i (i² = −1) to solve quadratics with negative discriminants, writing complex solutions in the form a ± bi",
  ["Writes √(−9) as 3i",
   "Solves x² + 2x + 5 = 0 giving complex roots",
   "Explains why complex roots come in conjugate pairs"],
  "If {{name}} solves x² + 4 = 0, can they explain what the solutions are now that 'no real solution' isn't the end of the story?",
  ["N-CN.7"],
  [("al_discriminant", "h", "A negative discriminant is exactly when there are no real roots and complex ones are needed"),
   ("al_surds", "s", "√(−12) is simplified to 2i√3 using the same square-factor method as for surds")])

T("al_linear_quadratic_sys", P, D, "Solving linear–quadratic systems", "16-18",
  "Solve a system of one linear and one quadratic equation algebraically by substitution and graphically by intersection, interpreting 0, 1 or 2 solutions",
  ["Substitutes a linear equation into a quadratic",
   "Solves the resulting quadratic",
   "Interprets the number of intersections"],
  "If {{name}} wants to know where the line y = x + 1 meets the curve y = x² − 1, can they solve it algebraically and check on a graph?",
  ["A-REI.7"],
  [("al_sys_substitution", "h", "The linear equation is rearranged and substituted into the quadratic one"),
   ("al_quad_factor_solve", "h", "Substituting the linear equation gives a quadratic, often solved by factorising")])

T("al_quad_ineq", P, D, "Solving quadratic inequalities", "16-18",
  "Solve quadratic inequalities such as x² − x − 6 < 0 by finding the roots and using a sketch of the parabola to choose the correct region",
  ["Finds critical values from the roots",
   "Uses a sketch to choose between and outside the roots",
   "Writes solution sets with correct inequality notation"],
  "If {{name}} solves x² − 9 > 0, can they use a sketch to explain why the answer has two separate parts?",
  [],
  [("al_quad_roots_graph", "h", "The roots and the direction of the parabola show where it lies below or above the x-axis"),
   ("al_compound_ineq", "h", "The answer is written as a compound inequality, such as −2 < x < 3, or as two separate regions")])

T("al_radical_rational_eq", P, D, "Radical and rational equations", "16-18",
  "Solve simple equations involving square roots or algebraic fractions, and explain how extraneous solutions can arise and must be checked",
  ["Solves √(x + 3) = x − 3 and rejects an extraneous root",
   "Solves an equation with algebraic fractions by multiplying through",
   "Explains why squaring both sides can create false solutions"],
  "If {{name}} solves √x = x − 2 and gets two answers, can they check which one actually works and explain why the other appeared?",
  ["A-REI.2"],
  [("al_quad_factor_solve", "h", "Squaring to remove a root or multiplying out fractions often leaves a quadratic to factorise"),
   ("al_algebraic_fractions", "h", "Rational equations are solved by combining or clearing algebraic fractions")])

# ---------------------------------------------------------------- exponentials (algebra side)
T("al_exp_expressions", C, D, "Exponential expressions: start value and growth factor", "14-16",
  "Interpret expressions of the form a·bᵗ as a starting value a multiplied repeatedly by a growth or decay factor b, connecting b to a percentage increase or decrease",
  ["Identifies the initial value and growth factor in 500(1.04)ᵗ",
   "Converts a 15% decrease into a factor of 0.85",
   "Evaluates an exponential expression for a given t"],
  "If {{name}} sees 200 × 1.05ᵗ for money in a savings account, can they explain what the 200 and the 1.05 mean?",
  ["A-SSE.1.b"],
  [("al_exponent_laws", "h", "Rewriting a·bᵗ, for example combining factors over several periods, uses the laws of exponents"),
   ("mt_iEXqN48w3x", "h", "A growth factor such as 1.05 comes from a percentage increase of 5%"),
   ("al_rewrite_meaning", "s", "Rewriting 'increase by 5%' as '× 1.05' is the step that makes the expression exponential")])

T("al_exp_functions", R, D, "Graphs of exponential functions", "15-16",
  "Graph exponential functions y = a·bˣ, describing the y-intercept, growth (b > 1) or decay (0 < b < 1), and the horizontal asymptote",
  ["Sketches growth and decay curves",
   "Identifies the y-intercept as the initial value",
   "Explains why the graph never reaches zero"],
  "If {{name}} graphs y = 3 × 2ˣ and y = 3 × 0.5ˣ, can they describe how the two curves differ and where they cross the y-axis?",
  ["F-IF.7e", "F-IF.8b"],
  [("al_exp_expressions", "h", "The graph plots a·bˣ, so reading a as the start value and b as the factor is needed"),
   ("fm_function_notation", "h", "Exponential models are graphed and evaluated as functions written with f(x)"),
   ("al_zero_negative_exp", "s", "Plotting points for negative x needs values such as 2⁻² = ¼ to see the curve approach zero")])

T("al_exp_rewrite", P, D, "Rewriting exponential expressions", "16-18",
  "Use exponent laws to rewrite exponential expressions to reveal different rates — e.g. 1.15ᵗ ≈ 1.012^(12t) shows a 15% annual rate as about 1.2% monthly",
  ["Converts an annual growth factor to a monthly one",
   "Rewrites 2^(t/3) to show doubling every 3 units",
   "Explains what each equivalent form reveals"],
  "If {{name}} knows a population grows by 20% each year, can they work out roughly what the monthly growth rate is?",
  ["A-SSE.3.c", "F-IF.8b"],
  [("al_exp_functions", "h", "Rewriting changes the form of an exponential function without changing its graph"),
   ("al_rational_exponents", "h", "Writing 1.15ᵗ as (1.15^(1/12))^(12t) needs fractional exponents")])

T("al_exp_equations", P, D, "Solving simple exponential equations", "15-17",
  "Solve exponential equations by writing both sides with the same base (e.g. 2ˣ = 32, 9ˣ = 27) or by using tables, graphs or trial and improvement",
  ["Solves 3ˣ = 81",
   "Solves 4ˣ = 8 by rewriting with base 2",
   "Uses trial and improvement to solve 1.1ˣ = 2"],
  "If {{name}} wants to know how many years until £100 growing at 10% a year doubles, can they set up 1.1ˣ = 2 and find x approximately?",
  ["A-CED.1"],
  [("al_exp_functions", "h", "The equation asks when an exponential function reaches a value"),
   ("al_exponent_laws", "h", "Writing 9ˣ = 27 as 3²ˣ = 3³ uses the power-of-a-power law, so 2x = 3"),
   ("al_rational_exponents", "s", "Answers such as x = 3/2 for 4ˣ = 8 are fractional exponents, read as roots then powers")])

# ---------------------------------------------------------------- sequences
T("al_arith_seq_function", P, D, "Arithmetic sequences as linear functions", "14-16",
  "Write arithmetic sequences explicitly as a(n) = a₁ + (n − 1)d, connect the common difference to the slope of a linear function, and solve problems such as finding which term equals a value",
  ["Writes an explicit rule in function notation",
   "Explains that the common difference is the slope",
   "Finds which term equals a given number"],
  "If {{name}} sees 7, 11, 15, 19, …, can they write a rule for the nth term and explain how it relates to a straight-line graph?",
  ["F-BF.2", "F-LE.2"],
  [("mt_HRKzwEQJgO", "h", "KS3 nth-term rules such as 3n + 2 are rewritten in the form a(n) = a₁ + (n − 1)d"),
   ("fm_function_notation", "h", "Writing a sequence as a(n) treats it as a function of the term number n"),
   ("mt_hBZwbst0ow", "s", "Primary sequences that go up in equal steps are the first arithmetic sequences")])

T("al_geo_seq", P, D, "Geometric sequences", "14-16",
  "Identify geometric sequences by a constant ratio, find the common ratio, and write the nth term as a·rⁿ⁻¹",
  ["Finds the common ratio of 3, 6, 12, 24, …",
   "Writes the nth term of a geometric sequence",
   "Distinguishes arithmetic from geometric sequences"],
  "If {{name}} sees 2, 6, 18, 54, …, can they find the rule and the 8th term?",
  ["F-BF.2", "F-LE.2", "KS3.Maths.Alg.16"],
  [("mt_yXO7lQ9Yn7", "h", "KS3 recognition of sequences with a constant multiplier is made precise with a common ratio"),
   ("mt_hCVPYlF-7Y", "h", "The nth term a·rⁿ⁻¹ uses repeated multiplication written as a power")])

T("al_recursive_seq", R, D, "Recursive rules for sequences", "15-16",
  "Define sequences recursively (aₙ₊₁ = aₙ + d, aₙ₊₁ = r·aₙ, Fibonacci-type rules), translate between recursive and explicit forms, and recognise sequences as functions on the integers",
  ["Writes a recursive rule for an arithmetic and a geometric sequence",
   "Generates terms from a recursive rule including Fibonacci",
   "Converts a recursive rule to an explicit one"],
  "If {{name}} is told 'start at 5, then each term is double the last minus 1', can they write it as a recursive rule and find the first five terms?",
  ["F-IF.3", "F-BF.2"],
  [("al_arith_seq_function", "h", "Adding the common difference each time, aₙ₊₁ = aₙ + d, is the simplest recursive rule"),
   ("al_geo_seq", "h", "Multiplying by the common ratio, aₙ₊₁ = r·aₙ, gives the multiplicative recursive rule"),
   ("mt_yXO7lQ9Yn7", "s", "KS3 term-to-term rules are informal recursive rules, now written with subscripts")])

T("al_geo_seq_exp", C, D, "Geometric sequences and exponential functions", "15-17",
  "Recognise that geometric sequences are exponential functions restricted to whole-number inputs, and construct either from a graph, a description or two input–output pairs",
  ["Explains the link between a·rⁿ⁻¹ and a·bˣ",
   "Builds an exponential function from two data points",
   "Compares discrete and continuous graphs"],
  "If {{name}} sees bacteria doubling every hour, can they describe it as both a sequence and a function and explain the difference?",
  ["F-LE.2", "F-IF.3"],
  [("al_geo_seq", "h", "A geometric sequence is the whole-number version of an exponential function"),
   ("al_exp_functions", "h", "The exponential function a·bˣ is the continuous version that fills in between terms")])

T("al_arith_series", P, D, "Sum of an arithmetic series", "16-18",
  "Derive and use the formula for the sum of the first n terms of an arithmetic series, Sₙ = n/2 (first + last), using Gauss's pairing idea",
  ["Explains the pairing method for 1 + 2 + … + 100",
   "Uses the formula to sum an arithmetic series",
   "Finds the number of terms needed to reach a total"],
  "If {{name}} is asked to add up all the numbers from 1 to 100 quickly, can they explain the pairing trick and turn it into a formula?",
  [],
  [("al_arith_seq_function", "h", "The series adds the terms of an arithmetic sequence, using its first and last terms")])

T("al_geo_series", P, D, "Sum of a finite geometric series", "16-18",
  "Derive the formula for the sum of a finite geometric series by multiplying by r and subtracting, and use it in contexts such as mortgage or savings payments",
  ["Derives Sₙ = a(1 − rⁿ)/(1 − r)",
   "Calculates the sum of a geometric series",
   "Applies the formula to a savings plan"],
  "If {{name}} saves £1 then doubles the amount each day, can they work out the total saved after 20 days without adding every term?",
  ["A-SSE.4"],
  [("al_geo_seq", "h", "The series adds the terms a, ar, ar², …, so the common ratio is needed for the r-multiplying trick"),
   ("al_algebraic_fractions", "s", "The sum is written as the algebraic fraction a(1 − rⁿ)/(1 − r)")])

T("al_quadratic_seq", P, D, "Quadratic sequences", "15-17",
  "Recognise quadratic sequences from constant second differences and find their nth-term rules of the form an² + bn + c",
  ["Calculates first and second differences",
   "Finds the n² coefficient from the second difference",
   "Finds the full nth-term rule"],
  "If {{name}} sees 2, 6, 12, 20, 30, …, can they show it's quadratic and find a rule for the nth term?",
  [],
  [("mt_HRKzwEQJgO", "h", "After subtracting an², the linear sequence left over is found with the usual nth-term method"),
   ("al_quad_function", "s", "Constant second differences are the signature of quadratic functions")])
