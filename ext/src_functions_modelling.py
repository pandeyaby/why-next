from dsl import T, C, P, R, L, M
D = "Functions & Modeling"

# ---------------------------------------------------------------- proportion, power laws and the modelling cycle
T("fm_direct_variation", C, D, "Constant of proportionality (y = kx)", "13-15",
  "Represent a directly proportional relationship by an equation y = kx, find the constant of proportionality from data, and recognise its graph as a straight line through the origin",
  ["Finds k from a pair of values",
   "Writes the equation for a proportional relationship",
   "Explains why the graph goes through (0, 0)"],
  "If {{name}} knows 5 litres of fuel costs £7.50, can they write an equation for the cost of any amount of fuel and explain what the constant means?",
  ["7.RP.2c", "KS3.Maths.Ratio.9"],
  [("mt_5mIcmKRCgA", "h", "KS3 direct proportion is now written as the equation y = kx with a constant k"),
   ("mt_FspV_imUGK", "h", "The graph of y = kx is the straight line through the origin met in proportion graphs")])

T("fm_inverse_variation", C, D, "Inverse proportion equations (y = k/x)", "14-16",
  "Represent inversely proportional relationships by y = k/x (xy = k), recognise the shape of the graph, and use it in contexts such as speed and time, or gas pressure and volume",
  ["Checks for inverse proportion by testing if xy is constant",
   "Writes y = k/x from data",
   "Sketches the graph and explains why it never meets the axes"],
  "If {{name}} knows a journey takes 3 hours at 40 mph, can they work out how long it takes at 60 mph and explain the relationship?",
  ["KS3.Maths.Ratio.9"],
  [("fm_direct_variation", "h", "y = k/x is contrasted with y = kx: as one quantity doubles, the other halves"),
   ("mt_5mIcmKRCgA", "h", "KS3 inverse proportion, such as more workers taking less time, is written as y = k/x")])

T("fm_power_laws", C, D, "Square and inverse-square relationships", "16-18",
  "Recognise and use relationships where one quantity is proportional to the square or inverse square of another (y = kx², y = k/x²), predicting the effect of doubling or halving the input",
  ["Predicts that doubling x quadruples y when y ∝ x²",
   "Predicts that doubling x quarters y when y ∝ 1/x²",
   "Finds k from data and writes the relationship"],
  "If {{name}} is told light intensity follows an inverse-square law, can they predict how bright a lamp looks from twice as far away?",
  [],
  [("fm_inverse_variation", "h", "y = k/x² extends inverse proportion, so doubling x divides y by four rather than two"),
   ("al_quad_function", "s", "y = kx² is the simplest quadratic function, a parabola with its vertex at the origin")])

T("fm_linearise", P, D, "Linearising data to test a relationship", "16-18",
  "Test whether data follow a suspected non-linear relationship by plotting a transformed variable (e.g. y against x² or against 1/x) and checking for a straight line through the origin",
  ["Chooses what to plot to test y ∝ x²",
   "Finds the constant from the gradient of the linearised graph",
   "Explains why a straight line is easier to judge than a curve"],
  "If {{name}} suspects a pendulum's period squared is proportional to its length, can they say what graph to plot to check?",
  [],
  [("fm_power_laws", "h", "Choosing to plot y against x² or 1/x depends on knowing which power law is suspected"),
   ("fm_line_fit", "h", "The transformed data are judged by whether a line of best fit through the origin fits well")])

T("fm_gradient_area", C, D, "Physical meaning of gradient and area", "15-17",
  "Interpret the gradient of a graph as a rate (speed on a distance–time graph, acceleration on a velocity–time graph, power on an energy–time graph) and the area under a graph as an accumulated quantity (distance under a velocity–time graph)",
  ["States what the gradient means for several physics graphs",
   "Calculates distance from the area under a velocity–time graph",
   "Checks units: gradient units are y-units per x-unit"],
  "If {{name}} sees a velocity–time graph for a cyclist, can they explain what the slope and the area under the line each tell you?",
  [],
  [("fm_avg_rate", "h", "Reading a gradient as speed or acceleration uses the gradient as a rate of change"),
   ("mt_q-1a86ydgU", "h", "Speed as gradient of a distance–time graph is the first example"),
   ("fm_units", "s", "Dividing or multiplying the axis units shows what a gradient or area represents")])

T("fm_iterative_model", P, D, "Step-by-step models in a spreadsheet", "15-18",
  "Build a simple iterative model in a spreadsheet or short program where each row updates from the previous one (e.g. new balance = old balance × 1.03, new velocity = old velocity + a × Δt) and compare it with real data",
  ["Sets up a recursive update rule in a spreadsheet",
   "Changes a parameter and observes the effect",
   "Compares model output with measured data"],
  "If {{name}} sets up a spreadsheet where each row is one second of a falling ball, can they write the rule that updates its speed and see how air resistance changes the result?",
  ["MP.4"],
  [("al_recursive_seq", "h", "Each spreadsheet row updates from the one before, which is a recursive rule applied repeatedly"),
   ("fm_linear_model", "s", "Adding a fixed amount each step is the simplest model to build iteratively")])

T("fm_modelling_cycle", M, D, "The modelling cycle", "15-18",
  "Carry out the full modelling cycle: identify variables and assumptions, formulate a model, compute, interpret results in context, validate against reality and revise the model",
  ["States the assumptions behind a model",
   "Checks model predictions against data",
   "Revises a model and explains why"],
  "If {{name}} builds a model for how long a phone battery lasts, can they explain the assumptions they made and how they'd check and improve it?",
  ["MP.4"],
  [("mt_yqZiX6vS7D", "h", "Primary real-world modelling is extended to the full cycle of assumptions, validation and revision"),
   ("fm_interpret_params", "h", "Validating a model means checking that its parameters make sense in the situation"),
   ("fm_units", "s", "Choosing quantities and units is part of formulating a model")])

T("fm_quadratic_model", P, D, "Modelling with quadratic functions", "16-18",
  "Use quadratic functions to model situations such as projectile height, area optimisation and revenue, finding and interpreting maximum or minimum values and roots",
  ["Builds a quadratic model for an area-maximising problem",
   "Finds the maximum of a projectile's height and when it lands",
   "Interprets roots and vertex in context"],
  "If {{name}} has 20 m of fencing to make a rectangular pen, can they model the area with a quadratic and find the biggest possible pen?",
  ["A-CED.2", "F-IF.4"],
  [("al_quad_vertex_form", "h", "The maximum height or best area is read from the turning point in vertex form"),
   ("fm_interpret_params", "h", "The roots and turning point are interpreted in context, such as when a ball lands"),
   ("al_quad_problems", "s", "Forming quadratic equations from contexts is the related equation skill")])
