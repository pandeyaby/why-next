from dsl import T, C, P, R, L, M
D = "Functions & Modeling"

T("fm_function_def", C, D, "What makes a function", "13-15",
  "Understand a function as a rule that assigns exactly one output to each input, and recognise functions in tables, mappings, graphs (vertical line test) and descriptions",
  ["Decides whether a table or mapping represents a function",
   "Uses the vertical line test on a graph",
   "Gives a real-world example and non-example of a function"],
  "If {{name}} sees a table where the input 3 gives both 5 and 7, can they explain why that isn't a function?",
  ["8.F.1", "F-IF.1"],
  [("mt_fxPtngwUfz", "h", "Relating corresponding terms of two patterns is the primary seed of input–output thinking"),
   ("mt_2jbUekyTu4", "s", "Extending table patterns builds the habit of reading inputs and outputs"),
   ("mt_-3udyo6VyB", "h", "Tables of values and their graphs are the main representations of functions")])

T("fm_function_notation", R, D, "Function notation", "14-16",
  "Use and interpret function notation f(x), evaluate f(a) for given inputs, and interpret statements like f(3) = 10 in context",
  ["Evaluates f(4) for f(x) = 2x² − 1",
   "Solves f(x) = 7 for a given function",
   "Interprets h(2) = 15 in a context such as height after 2 seconds"],
  "If {{name}} is told h(t) gives a ball's height after t seconds, can they explain what h(2) = 15 means?",
  ["F-IF.2"],
  [("fm_function_def", "h", "Notation names a rule that is already understood as a function"),
   ("al_evaluate_negatives", "h", "Evaluating f(a) is substituting a into the rule, including negative inputs such as f(−2)")])

T("fm_domain_range", C, D, "Domain and range", "14-16",
  "Identify the domain (allowed inputs) and range (possible outputs) of a function from its graph, rule or context, including restrictions that come from the situation",
  ["States the domain and range from a graph",
   "Identifies a sensible domain for a real-world model",
   "Explains why √x has a restricted domain"],
  "If {{name}} models the cost of buying x concert tickets, can they explain why x can't be −2 or 3.5?",
  ["F-IF.1", "F-IF.5"],
  [("fm_function_notation", "h", "Domain and range describe which inputs x can go into f and which outputs f(x) can come out")])

T("fm_compare_representations", R, D, "Comparing functions across representations", "13-15",
  "Compare properties of two functions each given in a different way — table, graph, equation or verbal description — such as which has the greater rate of change or starting value",
  ["Compares rates of change from a table and an equation",
   "Translates a verbal description into a graph",
   "Decides which of two plans is better for a given input"],
  "If {{name}} is shown one phone plan as a table and another as an equation, can they decide which is cheaper for 300 minutes?",
  ["8.F.2", "F-IF.9"],
  [("fm_function_def", "h", "Comparison requires seeing each representation as the same kind of object"),
   ("mt_z5iwdZyeDr", "s", "Moving between words, algebra, tables and graphs was started at KS3")])

T("fm_linear_nonlinear", C, D, "Linear versus nonlinear functions", "13-15",
  "Distinguish linear functions (constant rate of change, straight-line graph, y = mx + b) from nonlinear ones, using tables of differences, graphs and equations",
  ["Checks a table for constant first differences",
   "Gives an example of a nonlinear function (e.g. area of a square)",
   "Explains why y = x² is not linear"],
  "If {{name}} is shown the areas of squares with sides 1, 2, 3, 4, can they explain why this relationship isn't linear?",
  ["8.F.3"],
  [("fm_function_def", "h", "Sorting functions into linear and nonlinear assumes each input gives exactly one output"),
   ("mt_GZuoYaDdWd", "s", "Curved quadratic graphs are the first familiar examples of nonlinear functions"),
   ("mt_WBdHkc2HTf", "h", "Linear functions are recognised by straight-line graphs with a constant gradient")])

T("fm_qualitative_graphs", R, D, "Sketching and describing qualitative graphs", "13-15",
  "Describe a relationship qualitatively from a graph (increasing, decreasing, constant, steeper, levelling off) and sketch a graph from a verbal story",
  ["Tells the story of a graph in words",
   "Sketches a graph for a described situation (e.g. filling a bath)",
   "Matches graphs to situations and justifies the match"],
  "If {{name}} is told 'I ran to the bus stop, waited, then rode the bus home', can they sketch a distance–time graph without numbers?",
  ["8.F.5"],
  [("fm_function_def", "h", "Qualitative graphs describe how an output depends on an input"),
   ("mt_OUv-QXmW7_", "h", "Telling the story of a journey from a distance–time graph is the first graph-story skill")])

T("fm_key_features", R, D, "Key features of graphs", "14-16",
  "Interpret key features of graphs and tables in context — intercepts, intervals where the function increases or decreases, maximums and minimums, symmetry and end behaviour — and sketch graphs showing them",
  ["Identifies intercepts and turning points in context",
   "Describes intervals of increase and decrease",
   "Sketches a graph from a list of features"],
  "If {{name}} looks at a graph of temperature over a day, can they identify when it was warmest and over what times it was rising?",
  ["F-IF.4"],
  [("fm_qualitative_graphs", "h", "Words such as increasing and levelling off are made precise as intervals, maximums and intercepts"),
   ("fm_function_notation", "h", "Features such as f(0) as the intercept are stated using function notation")])

T("fm_avg_rate", P, D, "Average rate of change", "14-16",
  "Calculate and interpret the average rate of change of a function over an interval as (f(b) − f(a))/(b − a), with units, and estimate it from a graph",
  ["Calculates average rate of change from a table or graph",
   "States the units of a rate of change",
   "Compares rates over different intervals for a nonlinear function"],
  "If {{name}} sees a car travelled 30 km in the first half hour and 80 km by 1.5 hours, can they work out its average speed between those times?",
  ["F-IF.6"],
  [("fm_key_features", "h", "Rate of change describes how steeply the graph rises or falls"),
   ("mt_-3udyo6VyB", "h", "Rise over run between two points is the gradient calculation"),
   ("mt_kLQOzZYrd5", "s", "An average rate of change carries a compound unit, such as km/h or £ per item")])

T("fm_linear_model", P, D, "Building a linear model from a context", "14-16",
  "Construct a linear function to model a situation from a description, two data points or a table, identifying the rate of change and initial value",
  ["Writes a linear model for a taxi fare or phone plan",
   "Builds a model from two data points",
   "Uses the model to predict a value"],
  "If {{name}} is told a plumber charges £40 call-out plus £30 per hour, can they write a function for the cost and use it to find the cost of 2.5 hours?",
  ["8.F.4", "F-BF.1a", "F-LE.2"],
  [("fm_function_def", "h", "A model expresses one quantity as a function of another, such as cost as a function of hours"),
   ("mt_WBdHkc2HTf", "h", "The gradient and intercept of a straight line become the rate and starting value of the model"),
   ("mt_yqZiX6vS7D", "s", "Primary real-world modelling is extended to writing a linear function for the situation")])

T("fm_interpret_params", C, D, "Interpreting parameters in a model", "15-17",
  "Interpret the parameters of linear and exponential models — slope, intercept, initial value, growth factor — in terms of the situation, with units",
  ["Explains the meaning of the slope and intercept of a fitted line",
   "Explains the meaning of a and b in a·bᵗ",
   "Identifies when a parameter's value doesn't make sense in context"],
  "If {{name}} sees the model T = 20 + 3m for the temperature of water heated for m minutes, can they explain what 20 and 3 mean?",
  ["F-LE.5", "S-ID.7"],
  [("fm_linear_model", "h", "Interpreting slope and intercept with units needs experience of building linear models"),
   ("al_interpret_parts", "h", "Interpreting parts of an expression in context is the algebraic skill")])

T("fm_units", M, D, "Using units to guide models", "14-16",
  "Use units to understand problems, choose and convert units consistently in formulas, and check that an answer's units make sense (dimensional reasoning)",
  ["Tracks units through a multi-step calculation",
   "Detects an error because the units don't match",
   "Chooses sensible units and scales for a graph"],
  "If {{name}} calculates a speed and ends up with units of 'km × hours', can they tell something has gone wrong?",
  ["N-Q.1", "N-Q.2"],
  [("mt_kLQOzZYrd5", "h", "Compound units such as m/s and g/cm³ are the main case where units guide a calculation"),
   ("mt_tpT9brpI6D", "h", "Formulas need consistent units, so converting such as cm to m or minutes to hours comes first")])

T("fm_precision", M, D, "Choosing appropriate precision", "14-16",
  "Choose a level of accuracy appropriate to the measurements and the purpose, using significant figures and recognising that a calculated answer can't be more precise than its data",
  ["Rounds to an appropriate number of significant figures",
   "Explains why a calculator answer of 12.34567 m is over-precise",
   "States measurement uncertainty"],
  "If {{name}} measures a table as 1.2 m by 0.8 m and the calculator shows an area of 0.96000 m², can they say how precisely they should report it?",
  ["N-Q.3", "KS3.Sci.WS.VUSN.5"],
  [("mt_VVn1IXjkzn", "h", "Rounding to significant figures is the tool used to state an answer to suitable precision"),
   ("mt_Psun-u_lPf", "s", "Accurate measurement in science sets the limits on precision")])

T("fm_line_fit", P, D, "Fitting a line to data", "14-16",
  "Fit a straight line to a scatter plot that suggests a linear relationship, judge the fit by eye, write its equation and use it to make predictions (interpolation vs extrapolation)",
  ["Draws a line of best fit and writes its equation",
   "Uses the equation to predict a value",
   "Explains why extrapolating far beyond the data is risky"],
  "If {{name}} plots height against arm span for the class, can they draw a line of best fit, write its equation and predict someone's arm span?",
  ["8.SP.2", "8.SP.3", "S-ID.6.a"],
  [("mt_8atyuvPUZc", "h", "KS3 scatter graphs and lines of best fit drawn by eye are extended to writing the line's equation"),
   ("al_line_from_points", "h", "The fitted line's equation is written from two points on the line, as for any straight line")])

T("fm_residuals", P, D, "Residuals and judging a fit", "16-18",
  "Calculate and plot residuals (observed − predicted) to judge whether a linear model is appropriate, and use technology to compute and interpret the correlation coefficient",
  ["Calculates residuals from a model",
   "Interprets a residual plot with a pattern as a poor fit",
   "Interprets a correlation coefficient"],
  "If {{name}} sees a residual plot shaped like a U, can they explain what that says about using a straight line for the data?",
  ["S-ID.6.b", "S-ID.8"],
  [("fm_line_fit", "h", "A residual is the vertical gap between a data point and the fitted line, so a line is needed first")])

T("fm_correlation_causation", M, D, "Correlation is not causation", "15-17",
  "Distinguish correlation from causation, identify possible confounding variables, and explain what kind of study would be needed to show a cause",
  ["Explains why ice-cream sales and drownings are correlated",
   "Names a confounding variable in a given example",
   "Describes why a controlled experiment can show causation"],
  "If {{name}} reads that people who own more books get better grades, can they explain why buying books might not be the cause?",
  ["S-ID.9"],
  [("mt_8atyuvPUZc", "h", "Recognising correlation on a scatter graph comes before asking whether one variable causes the other"),
   ("mt_ArVBEpMAPk", "s", "Showing a cause needs an experiment that controls other variables, unlike an observational study")])

T("fm_linear_vs_exp", C, D, "Linear versus exponential growth", "15-17",
  "Distinguish situations that change by equal differences (linear) from those that change by equal factors (exponential), and explain why exponential growth eventually exceeds any linear growth",
  ["Classifies situations as linear or exponential",
   "Shows equal differences vs equal ratios in a table",
   "Explains why an exponential eventually overtakes a linear function"],
  "If {{name}} is offered £100 a day for 30 days or 1p doubled every day, can they explain which is better and why?",
  ["F-LE.1a", "F-LE.1b", "F-LE.1c", "F-LE.3"],
  [("fm_linear_model", "h", "Linear models with equal differences are the half of the comparison already met"),
   ("al_exp_functions", "h", "Comparing models requires knowing how exponential graphs behave, not just linear ones")])

T("fm_exp_growth_model", P, D, "Modelling exponential growth", "15-17",
  "Build exponential models a·bᵗ for growth situations — compound interest, population, viral spread — from a description or two data points, and use them to predict",
  ["Writes a compound interest model",
   "Builds a model from a starting value and percentage growth",
   "Predicts a value and comments on reasonableness"],
  "If {{name}} invests £500 at 4% compound interest, can they write a model and predict how much there will be after 10 years?",
  ["F-LE.2", "F-BF.1a"],
  [("fm_linear_vs_exp", "h", "Choosing an exponential model requires recognising equal-factor change"),
   ("al_exp_expressions", "h", "An exponential model a·bᵗ uses the start value and growth factor read from an expression")])

T("fm_exp_decay", P, D, "Modelling exponential decay", "15-17",
  "Build and use exponential decay models with factors between 0 and 1 — depreciation, medicine in the bloodstream, cooling towards room temperature, half-life — and interpret half-life",
  ["Writes a decay model from a percentage decrease",
   "Uses repeated halving to model half-life",
   "Predicts when a quantity falls below a threshold"],
  "If {{name}} is told a car loses 15% of its value each year, can they model its value and estimate when it will be worth half the original price?",
  ["F-LE.1c", "F-LE.2"],
  [("fm_exp_growth_model", "h", "Decay models have the same a·bᵗ structure as growth models but with 0 < b < 1")])

T("fm_inverse_functions", P, D, "Inverse functions", "15-17",
  "Find the inverse of a simple function by solving y = f(x) for x, understand it as 'undoing' the function, and recognise its graph as a reflection in y = x",
  ["Finds the inverse of f(x) = 3x − 5",
   "Verifies f(f⁻¹(x)) = x",
   "Sketches a function and its inverse"],
  "If {{name}} has a function that converts °C to °F, can they find the function that converts back?",
  ["F-BF.4a"],
  [("fm_function_notation", "h", "The inverse is written f⁻¹(x) and defined by f⁻¹(f(x)) = x, so notation is needed"),
   ("mt_3qrCtdoVAU", "h", "Finding an inverse means rearranging y = f(x) to make x the subject, as with a formula"),
   ("mt_VUQNveSYjQ", "s", "Inverse operations are the arithmetic version of inverse functions")])

T("fm_logarithms", C, D, "Logarithms as inverse exponentials", "16-18",
  "Understand logarithms as the inverse of exponential functions (log_b(x) = y means bʸ = x), and use them to solve exponential equations such as a·bᶜᵗ = d",
  ["Converts between exponential and logarithmic form",
   "Solves 2ˣ = 10 using logarithms",
   "Finds the time for an investment to double"],
  "If {{name}} needs to know exactly when a population growing by 3% a year doubles, can they set it up and solve with logarithms?",
  ["F-LE.4", "F-BF.5"],
  [("fm_exp_decay", "h", "Finding when a decay or growth model reaches a value is the main use of logarithms here"),
   ("fm_inverse_functions", "h", "log_b(x) is defined as the inverse of bˣ, so the idea of an inverse function is needed"),
   ("al_exp_equations", "s", "Solving 2ˣ = 32 by matching bases shows what logarithms do when no common base exists")])

T("fm_combine_functions", P, D, "Combining and composing functions", "15-17",
  "Build new functions by adding, subtracting, multiplying functions and by composition f(g(x)), interpreting each in context",
  ["Combines cost and revenue functions into a profit function",
   "Evaluates f(g(2)) and finds f(g(x))",
   "Explains that f(g(x)) and g(f(x)) are usually different"],
  "If {{name}} has a function for the cost of making x items and another for the revenue, can they build a function for profit?",
  ["F-BF.1b", "F-BF.1c"],
  [("fm_function_notation", "h", "Sums, products and compositions such as f(g(x)) are written and evaluated in function notation")])

T("fm_transformations", R, D, "Transforming graphs of functions", "15-17",
  "Identify the effect on a graph of replacing f(x) by f(x) + k, f(x + k), k·f(x) and f(kx), and use transformations to write equations for shifted graphs",
  ["Describes the shift caused by f(x) + 3 and f(x − 2)",
   "Describes a stretch caused by 2f(x)",
   "Writes the equation of a transformed parabola"],
  "If {{name}} knows the graph of y = x², can they sketch y = (x − 3)² + 1 and describe how it moved?",
  ["F-BF.3"],
  [("fm_key_features", "h", "Following how intercepts and turning points move shows the effect of each transformation"),
   ("mt_SH7QgFl8-v", "s", "Translations and reflections on a grid are the geometric precursor")])

T("fm_piecewise", R, D, "Piecewise and step functions", "15-17",
  "Interpret and graph piecewise-defined functions, step functions and absolute value functions for situations such as tax bands, postage or parking charges",
  ["Graphs a piecewise linear function",
   "Interprets a step graph for parking charges",
   "Writes a piecewise rule from a description"],
  "If {{name}} sees parking costs £2 for up to 1 hour, £3.50 for up to 2 hours and £5 for longer, can they draw the graph and explain why it has steps?",
  ["F-IF.7b"],
  [("fm_key_features", "h", "Piecewise graphs are read by their features on each interval"),
   ("fm_domain_range", "h", "Each piece of the rule applies only on its own part of the domain, such as 0 ≤ x < 10")])
