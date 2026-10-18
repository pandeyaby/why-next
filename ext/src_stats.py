from dsl import T, C, P, R, L, M
DS = "Data & Statistics"
PR = "Probability"

# ---------------------------------------------------------------- data, displays, averages, spread
T("st_statistical_questions", C, DS, "Statistical questions and variability", "11-13",
  "Recognise a statistical question as one that expects variability in the answers (e.g. 'How tall are students in my class?') and understand that a data set has a distribution described by centre, spread and shape",
  ["Sorts questions into statistical and non-statistical",
   "Explains why 'How old am I?' is not a statistical question",
   "Describes a data set using centre and spread"],
  "If {{name}} is given 'How many pets does each student have?' and 'How many pets do I have?', can they say which is statistical and why?",
  ["6.SP.1", "6.SP.2"],
  [("mt_fmm-P17Vka", "h", "Uses the vocabulary of statistical analysis"),
   ("mt_eKJG-0eC6D", "s", "Builds on collecting and displaying data")])

T("st_data_types", C, DS, "Types of data", "11-13",
  "Classify data as categorical or numerical, and numerical data as discrete or continuous, and choose suitable displays for each type",
  ["Classifies shoe size, height and eye colour",
   "Explains why height is continuous",
   "Chooses a suitable chart for each type"],
  "If {{name}} collects favourite sports, number of siblings and reaction times, can they classify each type of data?",
  ["KS3.Maths.Stat.1"],
  [("mt_fmm-P17Vka", "h", "Uses statistical vocabulary"),
   ("mt_eKJG-0eC6D", "s", "Display choice depends on data type")])

T("st_dot_plots_histograms", R, DS, "Dot plots and histograms", "11-13",
  "Display numerical data on dot plots and equal-width histograms, and read off features such as clusters, gaps and peaks",
  ["Draws a dot plot of a small data set",
   "Groups data into equal classes and draws a histogram",
   "Describes clusters and gaps"],
  "If {{name}} has the times 25 students took to run a lap, can they draw a histogram and describe what it shows?",
  ["6.SP.4", "S-ID.1"],
  [("mt_eKJG-0eC6D", "h", "Builds on frequency tables and charts"),
   ("st_data_types", "h", "Histograms are for continuous or grouped data")])

T("st_frequency_averages", P, DS, "Averages from frequency tables", "12-14",
  "Calculate the mean, median and mode from ungrouped frequency tables",
  ["Calculates the mean from a frequency table",
   "Finds the median position in a frequency table",
   "Checks the answer is plausible"],
  "If {{name}} has a table of how many goals were scored in 30 matches, can they find the mean number of goals?",
  ["KS3.Maths.Stat.1"],
  [("mt_Cg8VPguS_V", "h", "Extends calculating the mean"),
   ("mt_eKJG-0eC6D", "h", "Data are presented in frequency tables")])

T("st_grouped_mean", P, DS, "Estimating the mean from grouped data", "13-15",
  "Estimate the mean from grouped frequency tables using midpoints, identify the modal class and the class containing the median, and explain why the mean is an estimate",
  ["Uses midpoints to estimate the mean",
   "Identifies the modal class",
   "Explains why the answer is only an estimate"],
  "If {{name}} has heights grouped in 10 cm classes, can they estimate the mean height and explain why it's not exact?",
  ["KS3.Maths.Stat.1"],
  [("st_frequency_averages", "h", "Extends frequency-table averages to grouped data")])

T("st_choose_average", M, DS, "Choosing an average and the effect of outliers", "12-14",
  "Choose the most appropriate average for a data set and context, explaining how outliers and skew affect the mean more than the median",
  ["Explains why median is better for house prices",
   "Shows how one outlier changes the mean",
   "Justifies a choice of average in context"],
  "If {{name}} sees that one employee earns £1 million, can they explain why the median salary is more useful than the mean?",
  ["6.SP.5d"],
  [("mt_XSXnTQoQ4l", "h", "Builds on comparing measures of centre"),
   ("mt_Cg8VPguS_V", "h", "Requires calculating the mean")])

T("st_mad", P, DS, "Mean absolute deviation", "11-13",
  "Calculate and interpret the mean absolute deviation as the average distance of data values from the mean",
  ["Calculates the MAD of a small data set",
   "Compares variability of two data sets using MAD",
   "Explains what a larger MAD means"],
  "If {{name}} compares two basketball players' points per game, can they use the MAD to say whose scoring is more consistent?",
  ["6.SP.5c"],
  [("mt_Cg8VPguS_V", "h", "Deviations are measured from the mean"),
   ("mt_RWUY7_IXvw", "s", "Uses absolute value as distance")])

T("st_quartiles", P, DS, "Quartiles and interquartile range", "13-15",
  "Find the lower quartile, median, upper quartile and interquartile range of a data set, and explain why IQR is resistant to outliers",
  ["Finds the quartiles of an ordered list",
   "Calculates the IQR",
   "Explains why IQR is better than range when there are outliers"],
  "If {{name}} has a list of 11 test scores, can they find the quartiles and the IQR?",
  ["6.SP.5c"],
  [("mt_XSXnTQoQ4l", "h", "Builds on median and range")])

T("st_box_plots", R, DS, "Box plots", "13-15",
  "Draw and interpret box plots from the five-number summary, reading off median, quartiles and range",
  ["Draws a box plot from a five-number summary",
   "Reads the median and IQR from a box plot",
   "Explains what the length of the box represents"],
  "If {{name}} is shown a box plot of reaction times, can they read off the median and the IQR?",
  ["6.SP.4", "S-ID.1"],
  [("st_quartiles", "h", "Box plots display quartiles")])

T("st_compare_box_plots", M, DS, "Comparing distributions with box plots", "14-16",
  "Compare two distributions using box plots, commenting on centre (median) and spread (IQR) in context",
  ["Writes a comparison of medians in context",
   "Writes a comparison of IQRs in context",
   "Draws a conclusion supported by both"],
  "If {{name}} sees box plots for two classes' test scores, can they write two sentences comparing them in context?",
  ["S-ID.2"],
  [("st_box_plots", "h", "Requires reading box plots"),
   ("mt_XSXnTQoQ4l", "h", "Builds on comparing distributions by centre and spread")])

T("st_cumulative_frequency", R, DS, "Cumulative frequency graphs", "14-16",
  "Draw cumulative frequency graphs from grouped data and use them to estimate the median, quartiles and the number above or below a value",
  ["Plots cumulative frequency at upper class boundaries",
   "Estimates median and IQR from the graph",
   "Estimates how many values exceed a given value"],
  "If {{name}} has grouped data on journey times, can they draw a cumulative frequency graph and estimate the median?",
  [],
  [("st_quartiles", "h", "Estimates quartiles from the curve"),
   ("st_grouped_mean", "s", "Uses grouped frequency tables")])

T("st_frequency_density", R, DS, "Histograms with unequal class widths", "15-17",
  "Draw and interpret histograms with unequal class widths using frequency density = frequency ÷ class width, and estimate frequencies from areas",
  ["Calculates frequency densities",
   "Draws a histogram with unequal widths",
   "Estimates a frequency from part of a bar"],
  "If {{name}} has a histogram with bars of different widths, can they explain why the tallest bar may not have the most data?",
  [],
  [("st_dot_plots_histograms", "h", "Extends equal-width histograms"),
   ("st_grouped_mean", "h", "Works with grouped frequency data"),
   ("mt_kLQOzZYrd5", "s", "Frequency density is a rate (per unit width)")])

T("st_distribution_shape", C, DS, "Shape of a distribution", "14-16",
  "Describe distributions as symmetric, positively or negatively skewed, or bimodal, and explain how shape affects the relative positions of mean and median",
  ["Identifies skew from a histogram",
   "Predicts whether mean or median is larger for skewed data",
   "Explains a bimodal shape in context"],
  "If {{name}} sees a histogram of incomes with a long tail to the right, can they say which is bigger, the mean or the median, and why?",
  ["S-ID.3"],
  [("st_dot_plots_histograms", "h", "Shape is read from displays"),
   ("st_choose_average", "h", "Links shape to the choice of average")])

T("st_outliers", P, DS, "Identifying outliers", "15-17",
  "Use the 1.5 × IQR rule to identify outliers, show them on box plots, and decide whether to keep or remove them in context",
  ["Calculates outlier fences",
   "Marks outliers on a box plot",
   "Argues whether an outlier is an error or genuine"],
  "If {{name}} finds a reaction time of 3.2 s among values near 0.3 s, can they test whether it's an outlier and decide what to do with it?",
  ["S-ID.3"],
  [("st_box_plots", "h", "Outlier rules use quartiles"),
   ("st_distribution_shape", "h", "Outliers are part of describing shape")])

T("st_standard_deviation", P, DS, "Standard deviation", "15-17",
  "Calculate (with technology) and interpret the standard deviation as a typical distance from the mean, and compare it with IQR and MAD",
  ["Calculates standard deviation with a calculator",
   "Compares spread of two sets using standard deviation",
   "Explains when IQR is preferable"],
  "If {{name}} compares the daily temperatures of two cities with the same mean, can they use standard deviation to say which is more variable?",
  ["S-ID.2"],
  [("st_mad", "h", "Builds on measuring spread from the mean"),
   ("mt_hCVPYlF-7Y", "h", "Uses squares and square roots")])

T("st_two_way_tables", R, DS, "Two-way tables and relative frequencies", "13-15",
  "Construct and interpret two-way tables of categorical data, calculating joint, marginal and conditional relative frequencies to look for associations",
  ["Completes a two-way table from information",
   "Calculates row and column relative frequencies",
   "Describes whether there is an association"],
  "If {{name}} has survey data on age group and favourite music, can they build a two-way table and see if the two are linked?",
  ["8.SP.4", "S-ID.5"],
  [("mt_Cqm8iy48UI", "h", "Builds on reading tables"),
   ("mt_xAf2bu9wYK", "h", "Relative frequencies express one quantity as a fraction of another")])

T("st_time_series", R, DS, "Time series", "13-15",
  "Plot and interpret time series graphs, describing trends and seasonal patterns and making cautious predictions",
  ["Plots a time series",
   "Describes trend and seasonal variation",
   "Explains why predictions far ahead are unreliable"],
  "If {{name}} sees monthly ice-cream sales over three years, can they describe the trend and the seasonal pattern?",
  [],
  [("mt_bESTSBB0wK", "h", "Builds on line graphs")])

T("st_misleading_graphs", M, DS, "Spotting misleading graphs and statistics", "13-15",
  "Identify ways graphs and statistics mislead — truncated axes, unequal intervals, 3-D effects, cherry-picked data, inappropriate averages — and redraw a fair version",
  ["Identifies a truncated axis",
   "Explains how a pictogram can exaggerate",
   "Redraws a misleading graph fairly"],
  "If {{name}} sees an advert graph where one bar looks twice as tall but the axis starts at 90, can they explain why it's misleading?",
  ["S-IC.6"],
  [("mt_eKJG-0eC6D", "h", "Requires reading charts"),
   ("mt_bESTSBB0wK", "s", "Applies to line and pie charts")])

T("st_correlation_coefficient", C, DS, "Interpreting the correlation coefficient", "15-17",
  "Interpret the correlation coefficient r as a measure of the strength and direction of a linear association between −1 and 1, recognising that r can be near zero for a strong nonlinear pattern and is affected by outliers",
  ["Matches scatter plots to values of r",
   "Explains what r = −0.9 means in context",
   "Explains why r ≈ 0 does not mean no relationship"],
  "If {{name}} is told the correlation between hours of revision and score is 0.85, can they explain what that does and does not show?",
  ["S-ID.8"],
  [("mt_8atyuvPUZc", "h", "Builds on describing correlation from scatter graphs"),
   ("fm_line_fit", "h", "r measures how well points follow a straight line")])

T("st_least_squares", P, DS, "The least-squares regression line", "16-18",
  "Use technology to find the least-squares regression line, explain that it minimises the sum of squared residuals, and interpret its gradient and intercept in context",
  ["Finds a regression line with technology",
   "Explains what 'least squares' means",
   "Interprets the gradient in context"],
  "If {{name}} uses a calculator to find a regression line for arm span against height, can they explain what the gradient means?",
  ["S-ID.6.a", "S-ID.6.c", "S-ID.7"],
  [("fm_line_fit", "h", "Formalises fitting a line by eye"),
   ("fm_residuals", "h", "Least squares minimises squared residuals"),
   ("st_correlation_coefficient", "s", "r and the regression line are reported together")])

T("st_nonlinear_fit", P, DS, "Fitting non-linear models to data", "16-18",
  "Fit quadratic and exponential functions to data with technology, compare them with a linear fit using residuals, and choose the most appropriate model",
  ["Fits an exponential model to population data",
   "Compares residual plots of two models",
   "Justifies a choice of model in context"],
  "If {{name}} has data on a cooling cup of tea, can they decide whether a linear or exponential model fits better?",
  ["S-ID.6.a", "S-ID.6.b"],
  [("fm_residuals", "h", "Models are compared using residuals"),
   ("fm_exp_growth_model", "h", "Uses exponential models"),
   ("fm_quadratic_model", "s", "Uses quadratic models")])

# ---------------------------------------------------------------- sampling and inference
T("st_population_sample", C, DS, "Populations and samples", "12-14",
  "Distinguish a population from a sample, explain why samples are used, and understand that a sample is only valid for a population if it is representative",
  ["Identifies the population and sample in a study",
   "Explains why a census is not always possible",
   "Explains what 'representative' means"],
  "If {{name}} surveys 50 students to find out about the whole school, can they name the population and sample and explain one risk?",
  ["7.SP.1"],
  [("st_statistical_questions", "h", "Sampling answers statistical questions")])

T("st_sampling_methods", P, DS, "Random sampling methods", "13-15",
  "Describe and carry out simple random, systematic and stratified sampling, and explain why random selection helps produce representative samples",
  ["Describes how to choose a simple random sample",
   "Calculates numbers for a stratified sample",
   "Compares methods for a given situation"],
  "If {{name}} needs a sample of 40 from a school of 800 with different year sizes, can they work out a stratified sample?",
  ["7.SP.1"],
  [("st_population_sample", "h", "Methods select a sample from a population"),
   ("mt_Zt30Gxi-qp", "s", "Random selection gives each member an equal chance"),
   ("mt_nOCPx5qw0Z", "s", "Stratified samples use proportional division")])

T("st_bias", C, DS, "Bias in samples and surveys", "13-15",
  "Identify sources of bias such as convenience samples, voluntary response, leading questions and non-response, and suggest improvements",
  ["Explains why surveying a gym about exercise habits is biased",
   "Rewrites a leading question",
   "Suggests how to reduce non-response"],
  "If {{name}} sees a survey of shoppers at 10 am on a weekday, can they explain who is left out and how that could bias results?",
  ["7.SP.1"],
  [("st_population_sample", "h", "Bias is about samples not representing the population")])

T("st_survey_design", M, DS, "Designing data collection", "13-15",
  "Plan a data collection: write clear unbiased questions with suitable response options, choose a sampling method, and pilot the questionnaire",
  ["Writes a question with non-overlapping response boxes",
   "Chooses and justifies a sampling method",
   "Identifies a problem from a pilot"],
  "If {{name}} wants to find out how much screen time students have, can they design a good question and a fair sampling plan?",
  [],
  [("st_bias", "h", "Good design avoids bias"),
   ("st_sampling_methods", "h", "A plan includes a sampling method"),
   ("mt_Ae56umVlTT", "s", "Builds on forming testable questions")])

T("st_sample_inference", P, DS, "Inferring about a population from a sample", "13-15",
  "Use data from a random sample to estimate population characteristics, such as scaling a sample proportion up to a population",
  ["Estimates the number in a population from a sample proportion",
   "Explains why the estimate may be wrong",
   "Compares estimates from different samples"],
  "If {{name}} finds that 12 of 50 sampled students walk to school, can they estimate how many of the 900 students do?",
  ["7.SP.2"],
  [("st_sampling_methods", "h", "Inference needs a random sample"),
   ("mt_5mIcmKRCgA", "h", "Scaling uses proportion")])

T("st_capture_recapture", P, DS, "Capture–recapture estimates", "14-16",
  "Use the capture–recapture method to estimate the size of an animal population, stating the assumptions it relies on",
  ["Calculates a population estimate from capture data",
   "States assumptions of the method",
   "Explains how violating an assumption changes the estimate"],
  "If {{name}} marks 40 fish, then catches 50 later of which 8 are marked, can they estimate the number of fish in the lake?",
  [],
  [("st_sample_inference", "h", "Capture–recapture is inference from samples"),
   ("mt_5mIcmKRCgA", "h", "The estimate uses equal proportions")])

T("st_sampling_variability", C, DS, "Sampling variability and sample size", "14-16",
  "Explain that different random samples give different results, that this variation shrinks as sample size grows, and generate multiple samples to see it",
  ["Simulates several samples and compares their means",
   "Explains why larger samples give more consistent estimates",
   "Judges whether a difference could be due to chance"],
  "If {{name}} takes ten samples of 5 and ten samples of 50, can they predict which set of sample means will vary more?",
  ["7.SP.2", "S-IC.1"],
  [("st_sample_inference", "h", "Variability affects how far estimates can be trusted"),
   ("pb_simulation", "s", "Simulation generates repeated samples")])

T("st_study_types", C, DS, "Surveys, experiments and observational studies", "15-17",
  "Distinguish sample surveys, observational studies and randomised experiments, and explain that only randomised experiments can establish cause and effect",
  ["Classifies studies by type",
   "Explains the role of random assignment",
   "Explains why an observational study cannot prove causation"],
  "If {{name}} reads that coffee drinkers live longer, can they explain what kind of study that probably was and what it can't show?",
  ["S-IC.3"],
  [("st_bias", "h", "Study design aims to avoid bias"),
   ("fm_correlation_causation", "h", "Distinguishes association from causation"),
   ("mt_ArVBEpMAPk", "s", "Experiments control variables")])

T("st_margin_of_error", C, DS, "Estimates and margin of error", "16-18",
  "Use sample survey data to estimate a population mean or proportion, and develop a margin of error through simulation",
  ["Estimates a population proportion from a sample",
   "Uses simulation to find a likely range of results",
   "Interprets a margin of error in a news report"],
  "If {{name}} reads that 52% of voters support a candidate ± 3%, can they explain what the ± 3% means?",
  ["S-IC.4"],
  [("st_sampling_variability", "h", "Margin of error quantifies sampling variability"),
   ("pb_simulation", "h", "The margin is developed by simulation"),
   ("st_standard_deviation", "s", "Spread of sample results is measured with standard deviation")])

T("st_randomised_experiments", P, DS, "Comparing treatments in experiments", "16-18",
  "Use data from a randomised experiment to compare two treatments, using simulation to decide whether a difference is larger than chance would produce",
  ["Calculates the difference in means between groups",
   "Uses re-randomisation to see what chance produces",
   "Concludes whether the difference is significant"],
  "If {{name}} finds a new fertiliser group grew 3 cm taller on average, can they use simulation to judge whether that could be chance?",
  ["S-IC.5"],
  [("st_study_types", "h", "Applies to randomised experiments"),
   ("pb_simulation", "h", "Uses simulation of random assignment")])

T("st_model_consistency", M, DS, "Testing whether a model fits results", "16-18",
  "Decide whether a probability model is consistent with observed results, for example by simulating outcomes from a fair coin and comparing",
  ["Simulates outcomes from a model",
   "Compares an observed result with simulated results",
   "Decides whether the model should be questioned"],
  "If {{name}} spins a coin 50 times and gets 34 heads, can they use simulation to decide whether the coin is probably fair?",
  ["S-IC.2"],
  [("pb_simulation", "h", "Uses simulation of the model"),
   ("pb_expected_frequency", "h", "Compares observed with expected outcomes")])

T("st_evaluating_reports", M, DS, "Evaluating statistical claims in reports", "16-18",
  "Evaluate reports and news stories that use data, checking study type, sample, measures used, graphs and whether conclusions are justified",
  ["Identifies the study type behind a headline",
   "Spots an unjustified causal claim",
   "Writes a critique of a data-based article"],
  "If {{name}} reads a headline that 'video games make children violent', can they ask the right questions about the data behind it?",
  ["S-IC.6"],
  [("st_study_types", "h", "Evaluation depends on study design"),
   ("st_misleading_graphs", "h", "Reports often use graphs"),
   ("st_margin_of_error", "s", "Claims should account for sampling error")])

# ---------------------------------------------------------------- normal distribution
T("st_normal_distribution", C, DS, "The normal distribution", "16-18",
  "Recognise normally distributed data as symmetric and bell-shaped, described by mean and standard deviation, and use the 68–95–99.7 rule to estimate proportions",
  ["Sketches a normal curve with mean and standard deviation marked",
   "Uses the 68–95–99.7 rule",
   "Recognises data sets for which a normal model is not appropriate"],
  "If {{name}} is told heights have mean 170 cm and standard deviation 8 cm, can they estimate the percentage between 162 and 178 cm?",
  ["S-ID.4"],
  [("st_standard_deviation", "h", "The curve is described by mean and standard deviation"),
   ("st_distribution_shape", "h", "Normal is a particular symmetric shape")])

T("st_z_scores", P, DS, "Standardising with z-scores", "16-18",
  "Calculate z-scores to compare values from different distributions and to locate values on a normal curve",
  ["Calculates a z-score",
   "Compares performances on two different tests",
   "Interprets a negative z-score"],
  "If {{name}} scored 72 on a test with mean 60 and SD 8, and 80 on another with mean 75 and SD 5, can they say which result was better?",
  ["S-ID.4"],
  [("st_normal_distribution", "h", "z-scores measure distance from the mean in standard deviations")])

T("st_normal_probabilities", P, DS, "Normal probabilities with technology", "16-18",
  "Use calculators, spreadsheets or tables to find areas under the normal curve and so estimate population percentages",
  ["Finds the proportion above a value",
   "Finds the proportion between two values",
   "Finds a value given a percentage"],
  "If {{name}} knows battery lifetimes are normal with mean 500 h and SD 40 h, can they find the proportion lasting over 580 h?",
  ["S-ID.4"],
  [("st_z_scores", "h", "Probabilities are found from standardised values"),
   ("pb_addition_rule", "s", "Areas combine using probability rules")])

# ---------------------------------------------------------------- probability
T("pb_expected_frequency", P, PR, "Expected frequency", "12-14",
  "Calculate the expected number of times an outcome will occur as probability × number of trials, and compare expected with observed results",
  ["Calculates expected sixes in 300 rolls",
   "Compares expected and observed frequencies",
   "Explains why results rarely match exactly"],
  "If {{name}} rolls a dice 120 times, can they work out how many 4s to expect and explain why they probably won't get exactly that?",
  ["7.SP.6"],
  [("mt_Zt30Gxi-qp", "h", "Uses the probability of a single outcome"),
   ("mt_sHJqh6UUya", "h", "Builds on experimental probability")])

T("pb_simulation", P, PR, "Designing probability simulations", "12-14",
  "Design and use simulations with random number generators, coins or spreadsheets to estimate probabilities of compound events",
  ["Designs a simulation for a real situation",
   "Runs the simulation and estimates a probability",
   "Explains how more trials improve the estimate"],
  "If {{name}} wants to estimate the chance that a family of four children has at least three girls, can they design a coin simulation?",
  ["7.SP.8c"],
  [("mt_sHJqh6UUya", "h", "Simulations estimate probabilities by relative frequency"),
   ("mt_GDtFU5fyUv", "s", "Simulated events are compound events")])

T("pb_mutually_exclusive", C, PR, "Mutually exclusive events and the OR rule", "13-15",
  "Identify mutually exclusive events and use P(A or B) = P(A) + P(B) for them, recognising when events are not mutually exclusive",
  ["Decides whether two events are mutually exclusive",
   "Uses the addition rule correctly",
   "Explains why the rule fails for overlapping events"],
  "If {{name}} picks a card, can they explain why P(king or heart) isn't simply P(king) + P(heart)?",
  ["KS3.Maths.Prob.4"],
  [("mt_XfyqXLqzpx", "h", "Builds on mutually exclusive outcomes summing to 1"),
   ("mt_1YwOCMMwD8", "h", "Overlap is shown with Venn diagrams")])

T("pb_independence", C, PR, "Independent events and the AND rule", "14-16",
  "Explain what it means for events to be independent and use P(A and B) = P(A) × P(B) for independent events, including on tree diagrams",
  ["Decides whether two events are independent",
   "Calculates P(A and B) for independent events",
   "Uses a tree diagram for two independent events"],
  "If {{name}} flips a coin and rolls a dice, can they find the probability of a head and a six and explain why they multiply?",
  ["S-CP.2"],
  [("mt_GDtFU5fyUv", "h", "Builds on tree diagrams"),
   ("mt_TgHxujL81r", "h", "Uses multiplication of fractions")])

T("pb_sample_space_sets", C, PR, "Events as subsets of a sample space", "14-16",
  "Describe events as subsets of a sample space using unions, intersections and complements, with set notation",
  ["Lists the sample space and identifies an event",
   "Uses A ∪ B, A ∩ B and A′ correctly",
   "Shades regions of a Venn diagram"],
  "If {{name}} rolls a dice, can they describe the event 'even and greater than 3' using set notation?",
  ["S-CP.1"],
  [("mt_1YwOCMMwD8", "h", "Builds on sets and Venn diagrams"),
   ("mt_GDtFU5fyUv", "h", "Builds on generating sample spaces")])

T("pb_addition_rule", P, PR, "The general addition rule", "15-17",
  "Use P(A or B) = P(A) + P(B) − P(A and B) and interpret the answer in context",
  ["Calculates P(A or B) for overlapping events",
   "Explains why the intersection is subtracted",
   "Checks with a Venn diagram"],
  "If {{name}} knows 60% of students play sport, 40% play music and 25% do both, can they find the percentage who do at least one?",
  ["S-CP.7"],
  [("pb_mutually_exclusive", "h", "Generalises the OR rule"),
   ("pb_sample_space_sets", "h", "Uses unions and intersections")])

T("pb_dependent_trees", P, PR, "Tree diagrams for dependent events", "15-17",
  "Use tree diagrams for events without replacement, where probabilities on second branches depend on the first outcome, and apply the general multiplication rule",
  ["Draws a tree for picking two sweets without replacement",
   "Calculates the probability of two of the same colour",
   "Explains why second-branch probabilities change"],
  "If {{name}} takes two socks from a drawer without looking, can they find the probability that both are black?",
  ["S-CP.8"],
  [("pb_independence", "h", "Contrasts dependent with independent events"),
   ("mt_GDtFU5fyUv", "h", "Builds on tree diagrams")])

T("pb_conditional_tables", P, PR, "Conditional probability from tables and Venn diagrams", "15-17",
  "Find conditional probabilities from two-way tables and Venn diagrams by restricting to the given condition",
  ["Finds P(A given B) from a two-way table",
   "Finds a conditional probability from a Venn diagram",
   "Explains how the denominator changes"],
  "If {{name}} has a table of students by year and lunch choice, can they find the probability a Year 9 student chose pasta?",
  ["S-CP.4", "S-CP.6"],
  [("st_two_way_tables", "h", "Uses two-way tables"),
   ("mt_1YwOCMMwD8", "h", "Uses Venn diagrams")])

T("pb_conditional_formula", C, PR, "Conditional probability and independence", "16-18",
  "Use P(A | B) = P(A and B) ÷ P(B), and test independence by checking whether P(A | B) = P(A)",
  ["Calculates a conditional probability with the formula",
   "Tests two events for independence",
   "Explains independence in context"],
  "If {{name}} has data on smoking and lung disease, can they decide whether the two are independent?",
  ["S-CP.3", "S-CP.5"],
  [("pb_conditional_tables", "h", "Formalises conditional probability from tables"),
   ("pb_independence", "h", "Independence is defined via conditional probability")])

T("pb_test_accuracy", M, PR, "False positives and medical tests", "16-18",
  "Use two-way tables or tree diagrams to find the probability that a positive test result is correct, explaining why rare conditions give many false positives",
  ["Builds a table for a test with given accuracy",
   "Calculates P(condition | positive)",
   "Explains a surprising result in plain language"],
  "If {{name}} is told a test is 95% accurate for a condition 1 in 1000 people have, can they explain why most positives are false?",
  ["S-CP.5"],
  [("pb_conditional_tables", "h", "Uses conditional probability from tables"),
   ("pb_dependent_trees", "s", "Tree diagrams give an alternative method")])

T("pb_counting", P, PR, "The product rule for counting", "13-15",
  "Use the product rule to count outcomes, such as the number of possible codes or outfits",
  ["Counts 4-digit PIN codes",
   "Counts outfits from choices of tops and trousers",
   "Explains why choices multiply"],
  "If {{name}} has 3 starters, 4 mains and 2 desserts on a menu, can they work out how many different meals are possible?",
  [],
  [("mt_gu0NPDvlhY", "h", "Builds on systematic listing")])

T("pb_permutations", P, PR, "Permutations and combinations", "16-18",
  "Count arrangements and selections using factorials, permutations and combinations, and use them to calculate probabilities",
  ["Calculates the number of ways to arrange 5 books",
   "Distinguishes when order matters",
   "Uses combinations to find a lottery probability"],
  "If {{name}} picks 3 students from 10 for a team, can they work out how many teams are possible and whether order matters?",
  ["S-CP.9"],
  [("pb_counting", "h", "Builds on the product rule")])

T("pb_distributions", R, PR, "Probability distributions", "16-18",
  "Define a random variable, build a probability distribution table and graph it, from theory or from observed frequencies",
  ["Builds the distribution of the total of two dice",
   "Checks probabilities sum to 1",
   "Graphs a distribution"],
  "If {{name}} rolls two dice and adds them, can they build the full probability distribution of the total?",
  ["S-MD.1", "S-MD.3", "S-MD.4"],
  [("pb_sample_space_sets", "h", "Distributions summarise a sample space"),
   ("st_dot_plots_histograms", "s", "Distributions are graphed like data")])

T("pb_expected_value", P, PR, "Expected value", "16-18",
  "Calculate the expected value of a random variable as the probability-weighted mean, and interpret it as a long-run average",
  ["Calculates expected value from a distribution",
   "Interprets expected value in a game",
   "Explains why expected value need not be a possible outcome"],
  "If {{name}} plays a game paying £5 with probability 0.1 and costing £1 to play, can they work out the expected gain?",
  ["S-MD.2"],
  [("pb_distributions", "h", "Uses a probability distribution"),
   ("pb_expected_frequency", "h", "Extends expected frequency to values")])

T("pb_decisions", M, PR, "Using probability to make decisions", "16-18",
  "Use expected values and probabilities to compare strategies and to make or judge fair decisions, such as insurance, games and random selection",
  ["Compares two strategies by expected value",
   "Decides whether a game is fair",
   "Explains a fair way to select a winner"],
  "If {{name}} is offered extended warranty for a phone, can they use probabilities and costs to decide whether it's worth it?",
  ["S-MD.5", "S-MD.6", "S-MD.7"],
  [("pb_expected_value", "h", "Decisions compare expected values")])
