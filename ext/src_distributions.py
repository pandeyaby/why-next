from dsl import T, C, P, R, L, M
DS = "Data & Statistics"
PR = "Probability"

# ---------------------------------------------------------------- random variables (wave 4)
T("dt_variance_rv", P, PR, "Variance of a discrete random variable", "16-18",
  "Calculate the variance of a discrete random variable as Var(X) = E(X²) − [E(X)]² and its standard deviation, and interpret both as measures of spread of the distribution",
  ["Calculates E(X²) from a probability table",
   "Finds Var(X) and the standard deviation",
   "Compares the spread of two distributions with the same mean"],
  "If {{name}} has the probability distribution for the score on a biased spinner, can they find its variance and standard deviation?",
  [],
  [("pb_expected_value", "h", "Variance is defined using expected values"),
   ("st_standard_deviation", "s", "Extends standard deviation from data to distributions")])

T("dt_linear_combinations", P, PR, "Expectation and variance of combined random variables", "17-18",
  "Use E(aX + b) = aE(X) + b, Var(aX + b) = a²Var(X), E(X ± Y) = E(X) ± E(Y) and, for independent variables, Var(X ± Y) = Var(X) + Var(Y)",
  ["Finds the mean and variance of 3X + 2",
   "Explains why Var(X − Y) adds the variances",
   "Distinguishes X₁ + X₂ from 2X"],
  "If {{name}} knows the mean and variance of one bag's mass, can they find the mean and variance of the total mass of two independent bags, and explain why it differs from doubling one bag?",
  [],
  [("dt_variance_rv", "h", "Combines variances of random variables"),
   ("pb_independence", "h", "Adding variances requires independent variables")])

T("dt_normal_combinations", P, PR, "Combining independent normal variables", "17-18",
  "Use the fact that sums and differences of independent normal variables are normal to find probabilities, such as the chance that the total mass of four items exceeds a limit",
  ["Finds the distribution of X + Y for independent normals",
   "Finds P(X > Y) by considering X − Y",
   "Finds the distribution of the total of n items"],
  "If {{name}} knows the masses of apples and of the box are normally distributed, can they find the probability that a box of six apples weighs more than 1.2 kg?",
  [],
  [("dt_linear_combinations", "h", "Uses the mean and variance of a combination"),
   ("st_normal_probabilities", "h", "Finds probabilities from the resulting normal")])

# ---------------------------------------------------------------- Poisson distribution
T("dt_poisson_conditions", C, PR, "When a Poisson model fits", "16-18",
  "State the conditions for a Poisson model (events occur singly, independently and at a constant average rate in a fixed interval of time or space) and decide whether a context meets them",
  ["States the conditions for a Poisson model",
   "Decides whether arrivals, defects or calls fit the model",
   "Contrasts a Poisson count with a binomial count of successes in n trials"],
  "If {{name}} models the number of emails arriving in an hour, can they explain what must be true for a Poisson model to be suitable?",
  [],
  [("pb_distributions", "h", "A Poisson model is a particular probability distribution"),
   ("pb_independence", "h", "Requires events to occur independently"),
   ("ht_binomial_conditions", "s", "Compares with the conditions for a binomial model")])

T("dt_poisson_probabilities", P, PR, "Poisson probabilities", "16-18",
  "Calculate P(X = r) = e^(−λ)λʳ/r! for X ~ Po(λ), by formula and with technology",
  ["Calculates P(X = 2) for X ~ Po(3.5)",
   "Explains what λ represents in context",
   "Uses a calculator's Poisson function"],
  "If {{name}} knows a shop averages 4 customers every 10 minutes, can they find the probability that exactly 6 arrive in a 10-minute period?",
  ["S-MD.3"],
  [("dt_poisson_conditions", "h", "The formula applies only when the model fits"),
   ("pb_permutations", "h", "Uses factorial notation for r!"),
   ("ca_exp_derivative", "s", "Uses the exponential constant e")])

T("dt_poisson_cumulative", P, PR, "Cumulative Poisson probabilities", "16-18",
  "Find P(X ≤ r), P(X ≥ r) and probabilities of ranges for a Poisson variable using cumulative functions, taking care with inequalities for a discrete variable",
  ["Finds P(X ≥ 3) as 1 − P(X ≤ 2)",
   "Converts 'more than 5' to 1 − P(X ≤ 5)",
   "Finds P(2 ≤ X ≤ 6)"],
  "If {{name}} needs the probability of at least 3 breakdowns in a month for X ~ Po(1.8), can they find it from cumulative probabilities?",
  [],
  [("dt_poisson_probabilities", "h", "Sums individual Poisson probabilities"),
   ("ht_binomial_cumulative", "s", "Same inequality handling as for binomial variables")])

T("dt_poisson_mean_variance", P, PR, "Mean and variance of a Poisson distribution", "16-18",
  "Use E(X) = Var(X) = λ for a Poisson distribution, and compare a sample's mean and variance as a check on whether a Poisson model is plausible",
  ["States the mean and variance of Po(λ)",
   "Calculates the sample mean and variance of count data",
   "Judges whether similar mean and variance support a Poisson model"],
  "If {{name}} has counts of daisies in 50 quadrats with mean 2.1 and variance 6.3, can they explain what this suggests about a Poisson model?",
  ["S-MD.2"],
  [("dt_poisson_probabilities", "h", "Describes the Poisson distribution"),
   ("dt_variance_rv", "h", "Uses the variance of a random variable"),
   ("pb_expected_value", "s", "Interprets λ as the long-run mean count")])

T("dt_poisson_rate_scaling", P, PR, "Changing the interval for a Poisson rate", "16-18",
  "Scale the Poisson parameter in proportion to the length of the interval, for example from 3 per hour to 1.5 per half-hour or 72 per day",
  ["Rescales λ for a different time interval",
   "Rescales λ for an area or length",
   "Finds a probability for the rescaled interval"],
  "If {{name}} knows faults occur at 0.8 per metre of cable, can they find the probability of no faults in a 5-metre length?",
  [],
  [("dt_poisson_probabilities", "h", "Applies Poisson probabilities to the new interval"),
   ("mt_kLQOzZYrd5", "s", "Treats the parameter as a rate in compound units")])

T("dt_poisson_sums", C, PR, "Sums of independent Poisson variables", "17-18",
  "Use the result that if X ~ Po(λ) and Y ~ Po(μ) are independent then X + Y ~ Po(λ + μ), and recognise when the result does not apply",
  ["Finds the distribution of the total of two independent counts",
   "Calculates a probability for the combined count",
   "Explains why independence is needed"],
  "If {{name}} knows one call centre averages 3 calls a minute and another 5, can they find the probability of more than 10 calls in total in a minute?",
  [],
  [("dt_poisson_rate_scaling", "h", "Combines rates over the same interval"),
   ("pb_independence", "h", "The result holds only for independent variables"),
   ("dt_linear_combinations", "s", "Means and variances add, consistent with Po(λ + μ)")])

T("dt_poisson_approx_binomial", P, PR, "Poisson approximation to the binomial", "17-18",
  "Approximate B(n, p) by Po(np) when n is large and p is small, and judge when the approximation is reasonable",
  ["States when the approximation is appropriate",
   "Approximates P(X ≤ 2) for B(500, 0.004)",
   "Compares the approximation with the exact binomial value"],
  "If {{name}} needs the probability that more than 3 of 1000 parts are faulty when each has a 0.2% chance of being faulty, can they use a suitable approximation?",
  [],
  [("ht_binomial_mean_variance", "h", "Uses np as the Poisson mean"),
   ("dt_poisson_cumulative", "h", "Calculates the approximating Poisson probabilities"),
   ("ht_binomial_shape", "s", "A binomial with small p is strongly skewed, like a Poisson")])

T("dt_normal_approx_poisson", P, PR, "Normal approximation to the Poisson", "17-18",
  "Approximate Po(λ) by N(λ, λ) when λ is large, applying a continuity correction",
  ["Checks that λ is large enough for the approximation",
   "Applies a continuity correction to P(X ≥ 30)",
   "Compares with the exact Poisson value using technology"],
  "If {{name}} needs P(X > 60) for X ~ Po(50), can they use a normal approximation with a continuity correction?",
  [],
  [("dt_poisson_mean_variance", "h", "The approximating normal has mean and variance λ"),
   ("ht_normal_approx_binomial", "h", "Uses the same continuity-correction method")])

T("dt_poisson_critique", M, PR, "Judging Poisson assumptions in context", "17-18",
  "Critique a Poisson model in context, identifying clustering, a changing rate or events that are not independent, and use a variance much larger than the mean as evidence against the model",
  ["Identifies why a rate may not be constant",
   "Explains how clustering breaks independence",
   "Uses sample mean and variance to question a model"],
  "If {{name}} models goals in football matches as Poisson, can they explain which assumptions might fail and how the data could show it?",
  [],
  [("dt_poisson_conditions", "h", "Critiques the Poisson conditions"),
   ("dt_poisson_mean_variance", "s", "Compares the sample mean and variance as evidence")])

# ---------------------------------------------------------------- geometric distribution
T("dt_geometric", C, PR, "The geometric distribution", "17-18",
  "Model the number of trials up to and including the first success with X ~ Geo(p), where P(X = r) = (1 − p)^(r − 1)p, under the same independence and constant-probability assumptions as the binomial",
  ["Explains why the probabilities form a geometric sequence",
   "Calculates P(X = 4) for p = 0.2",
   "States the assumptions for the model in context"],
  "If {{name}} rolls a die until a six appears, can they find the probability that the first six is on the fifth roll?",
  ["S-MD.3"],
  [("ht_binomial_conditions", "h", "Uses the same assumptions about independent trials"),
   ("al_geo_seq", "h", "The probabilities form a geometric sequence"),
   ("sr_sum_to_infinity", "s", "Shows that the probabilities sum to 1")])

T("dt_geometric_cumulative", P, PR, "Cumulative geometric probabilities", "17-18",
  "Use P(X > r) = (1 − p)ʳ and P(X ≤ r) = 1 − (1 − p)ʳ for a geometric variable, and solve for the number of trials needed to reach a given probability",
  ["Explains why P(X > r) = (1 − p)ʳ",
   "Finds the probability that the first success takes more than 10 trials",
   "Finds the least n with P(X ≤ n) > 0.9 using logarithms"],
  "If {{name}} has a 15% chance of winning each game, can they find how many games are needed for a 90% chance of at least one win?",
  [],
  [("dt_geometric", "h", "Sums geometric probabilities"),
   ("al_geo_series", "s", "The cumulative probability is a finite geometric series"),
   ("fm_logarithms", "s", "Solves for the number of trials with logarithms")])

T("dt_geometric_mean", P, PR, "Mean and variance of the geometric distribution", "17-18",
  "Use E(X) = 1/p and Var(X) = (1 − p)/p² for a geometric distribution and interpret the mean as the long-run average waiting time",
  ["Calculates the expected number of trials for p = 0.25",
   "Calculates the variance",
   "Interprets the mean in context"],
  "If {{name}} knows 1 in 8 cereal boxes contains a prize, can they find the expected number of boxes needed to get the first prize?",
  ["S-MD.2"],
  [("dt_geometric", "h", "Describes the geometric distribution"),
   ("dt_variance_rv", "h", "Uses the mean and variance of a random variable")])

T("dt_choose_model", M, PR, "Choosing a discrete or continuous model", "17-18",
  "Choose between binomial, Poisson, geometric and normal models for a context by identifying what is counted or measured and which assumptions are reasonable",
  ["Matches contexts to suitable distributions",
   "Justifies the choice from the assumptions",
   "Explains why a given model is unsuitable"],
  "If {{name}} is given four situations (faults per roll of cloth, heights, attempts until a pass, heads in 20 tosses), can they choose and justify a model for each?",
  [],
  [("dt_poisson_conditions", "h", "Knows when a Poisson model fits"),
   ("dt_geometric", "h", "Knows when a geometric model fits"),
   ("ht_binomial_conditions", "h", "Knows when a binomial model fits"),
   ("st_normal_distribution", "s", "Considers a normal model for measured data")])

# ---------------------------------------------------------------- tests with the Poisson distribution
T("dt_poisson_test", P, DS, "Hypothesis test for a Poisson mean", "17-18",
  "Test a claim about a Poisson rate with H₀: λ = λ₀, rescaling λ₀ for the observation period and using a critical region or p-value from the Poisson distribution",
  ["Writes hypotheses about a rate in context",
   "Finds a critical region for a one-tailed test",
   "Concludes in context from an observed count"],
  "If {{name}} knows a road averaged 2 accidents a month and there were 12 in the 3 months after a speed camera was installed, can they test whether the rate has changed?",
  [],
  [("dt_poisson_cumulative", "h", "Finds probabilities from the null distribution"),
   ("ht_critical_regions", "h", "Uses a critical region to make the decision"),
   ("ht_p_values", "h", "Can decide using a p-value instead"),
   ("dt_poisson_rate_scaling", "h", "Rescales the null rate for the observation period"),
   ("ht_binomial_test", "s", "Follows the same structure as a binomial test")])

T("dt_poisson_errors", P, DS, "Type I and type II errors in Poisson tests", "17-18",
  "Calculate the probability of a type I error (the actual significance level) and of a type II error for a given alternative value of λ in a Poisson test",
  ["Finds the actual significance level of a Poisson test",
   "Finds P(type II error) when λ takes a stated value",
   "Explains how the errors trade off"],
  "If {{name}} has a critical region X ≥ 9 for testing λ = 4, can they find the probability of each type of error when the true rate is 7?",
  [],
  [("dt_poisson_test", "h", "Works with the critical region of a Poisson test"),
   ("ht_errors", "h", "Applies the definitions of type I and type II errors"),
   ("ht_actual_significance", "s", "The type I error probability is the actual significance level")])

# ---------------------------------------------------------------- estimation and the t-distribution
T("dt_unbiased_estimates", P, DS, "Unbiased estimates of population mean and variance", "16-18",
  "Use x̄ to estimate μ and s² = Σ(x − x̄)²/(n − 1) to estimate σ², explaining why dividing by n − 1 removes the bias of dividing by n",
  ["Calculates s² from summary statistics",
   "Explains why dividing by n underestimates σ² on average",
   "Chooses the correct calculator output for an estimate"],
  "If {{name}} has the lengths of 12 sampled bolts, can they find unbiased estimates of the population mean and variance and explain the n − 1?",
  [],
  [("st_standard_deviation", "h", "Extends the calculation of spread"),
   ("st_population_sample", "h", "Distinguishes sample statistics from population parameters"),
   ("st_sampling_variability", "s", "Sample statistics vary from sample to sample")])

T("dt_degrees_freedom", C, DS, "Degrees of freedom", "17-18",
  "Explain degrees of freedom as the number of values free to vary once constraints are fixed, why a t-test on n values uses n − 1, and how a contingency table gives (r − 1)(c − 1)",
  ["Explains why n deviations from x̄ have n − 1 degrees of freedom",
   "Finds degrees of freedom for t and chi-squared tests",
   "Describes how degrees of freedom change the shape of a distribution"],
  "If {{name}} is told 5 numbers have mean 10, can they explain how many of the numbers can be chosen freely and link this to degrees of freedom?",
  [],
  [("dt_unbiased_estimates", "h", "The n − 1 divisor is the first example"),
   ("ht_chi_squared", "s", "Generalises the degrees of freedom used in chi-squared tests")])

T("dt_t_distribution", C, DS, "The t-distribution", "17-18",
  "Explain that when σ is estimated by s from a small sample of a normal population, (x̄ − μ)/(s/√n) follows a t-distribution with n − 1 degrees of freedom, which has heavier tails than the normal and approaches it as n grows",
  ["Explains why replacing σ by s changes the distribution",
   "Compares t critical values with 1.96",
   "Describes how the t-distribution changes with degrees of freedom"],
  "If {{name}} has only 8 measurements and an estimated standard deviation, can they explain why a t-distribution is used instead of the normal?",
  [],
  [("ht_sample_mean_distribution", "h", "Builds on the distribution of the sample mean"),
   ("dt_unbiased_estimates", "h", "Uses s as an estimate of σ"),
   ("dt_degrees_freedom", "h", "The distribution is indexed by degrees of freedom"),
   ("st_normal_distribution", "s", "Compared with the standard normal curve")])

T("dt_one_sample_t", P, DS, "One-sample t-test", "17-18",
  "Test a claim about the mean of a normal population with unknown variance using t = (x̄ − μ₀)/(s/√n) with n − 1 degrees of freedom, for one- and two-tailed tests",
  ["Calculates the t statistic",
   "Finds the critical value from tables or technology",
   "Concludes in context"],
  "If {{name}} has 10 measured fill volumes from bottles labelled 500 ml, can they test whether the mean is less than 500 ml?",
  [],
  [("dt_t_distribution", "h", "Uses the t-distribution as the null distribution"),
   ("ht_normal_mean_test", "h", "Adapts the z-test for a mean"),
   ("ht_tails", "s", "Chooses a one- or two-tailed alternative")])

T("dt_t_interval", P, DS, "Confidence intervals using the t-distribution", "17-18",
  "Construct and interpret a confidence interval x̄ ± t·s/√n for a population mean when σ is unknown, and explain why it is wider than the corresponding z-interval",
  ["Calculates a 95% t-interval",
   "Interprets the interval in context",
   "Explains why small samples give wider intervals"],
  "If {{name}} has the reaction times of 9 people, can they construct a 95% confidence interval for the population mean?",
  ["S-IC.4"],
  [("dt_t_distribution", "h", "Uses t critical values"),
   ("ht_confidence_intervals", "h", "Adapts the z-interval for a mean")])

T("dt_paired_t", P, DS, "Paired t-test", "17-18",
  "Analyse paired data (such as before-and-after measurements on the same people) by testing the mean of the differences with a one-sample t-test",
  ["Calculates the differences and their mean and standard deviation",
   "Writes hypotheses about the mean difference",
   "Concludes in context"],
  "If {{name}} has 12 students' scores before and after a revision course, can they test whether the course improved scores on average?",
  [],
  [("dt_one_sample_t", "h", "Applies a one-sample t-test to the differences"),
   ("st_study_types", "s", "Recognises a matched-pairs design"),
   ("st_randomised_experiments", "s", "Pairing controls for variation between subjects")])

T("dt_two_sample_z", P, DS, "Comparing two means with a z-test", "17-18",
  "Test for a difference between two population means using z = (x̄ − ȳ)/√(σ₁²/n₁ + σ₂²/n₂) when the variances are known or the samples are large",
  ["Explains where the standard error of the difference comes from",
   "Calculates the test statistic",
   "Concludes in context"],
  "If {{name}} has large samples of journey times on two routes, can they test whether the mean times differ?",
  [],
  [("dt_normal_combinations", "h", "The difference of sample means is normal"),
   ("ht_normal_mean_test", "h", "Follows the structure of a z-test for a mean")])

T("dt_two_sample_t", P, DS, "Two-sample t-test", "17-18",
  "Compare the means of two independent groups with a two-sample t-test, using a pooled variance when the population variances can be assumed equal, and interpret the result for an experiment",
  ["Calculates a pooled estimate of variance",
   "Calculates the t statistic with n₁ + n₂ − 2 degrees of freedom",
   "Concludes whether the treatments differ"],
  "If {{name}} has plant heights from 8 plants given a fertiliser and 10 plants without it, can they test whether the fertiliser increases mean height?",
  ["S-IC.5"],
  [("dt_one_sample_t", "h", "Extends the t-test to two samples"),
   ("dt_linear_combinations", "h", "The variance of a difference adds the variances"),
   ("dt_two_sample_z", "s", "The z-test version comes first when σ is known"),
   ("ht_randomisation_test", "s", "A randomisation test compares the same two groups by simulation")])

T("dt_t_assumptions", M, DS, "Checking assumptions for t procedures", "17-18",
  "Check the assumptions behind t procedures (random independent samples, approximate normality and, for a pooled test, similar variances) using plots and summary statistics, and judge how robust a conclusion is",
  ["Checks a sample for skew and outliers before using t",
   "Explains why a large sample relaxes the normality condition",
   "Explains when a pooled test is inappropriate"],
  "If {{name}} has a small, strongly skewed sample with an outlier, can they explain whether a t-test is appropriate?",
  [],
  [("dt_one_sample_t", "h", "Checks the conditions of t procedures"),
   ("st_outliers", "s", "Identifies outliers that affect s"),
   ("st_distribution_shape", "s", "Judges normality from the shape of the data")])

T("dt_paired_vs_two_sample", M, DS, "Choosing paired or two-sample methods", "17-18",
  "Decide whether data are paired or come from independent samples, and explain how pairing reduces variability and changes the test",
  ["Classifies designs as paired or independent",
   "Explains why analysing paired data as independent loses power",
   "Chooses the correct test for a given design"],
  "If {{name}} is given an experiment with left and right hands of the same people, can they explain which t-test to use and why?",
  [],
  [("dt_paired_t", "h", "Knows the paired test"),
   ("dt_two_sample_t", "h", "Knows the two-sample test"),
   ("ht_choose_test", "s", "Extends choosing a suitable test")])

# ---------------------------------------------------------------- chi-squared extensions
T("dt_chi_fit_distributions", P, DS, "Goodness of fit to binomial and Poisson models", "17-18",
  "Test the fit of a binomial or Poisson model to frequency data, estimating a parameter from the data when needed and reducing the degrees of freedom by one for each estimated parameter",
  ["Calculates expected frequencies from a Poisson model",
   "Combines classes so that expected frequencies are at least 5",
   "Reduces the degrees of freedom for an estimated parameter"],
  "If {{name}} has the number of goals per match in 100 matches, can they test whether a Poisson model fits?",
  [],
  [("ht_goodness_of_fit", "h", "Extends the goodness-of-fit test"),
   ("dt_poisson_probabilities", "h", "Calculates expected frequencies from a Poisson model"),
   ("dt_degrees_freedom", "h", "Adjusts degrees of freedom for estimated parameters"),
   ("ht_binomial_probabilities", "s", "Calculates expected frequencies from a binomial model")])

T("dt_chi_contributions", M, DS, "Interpreting contributions in a chi-squared test", "17-18",
  "Use the individual (O − E)²/E contributions in a contingency table to describe which cells drive a significant association and in which direction",
  ["Identifies the cells with the largest contributions",
   "Compares observed and expected values in those cells",
   "Writes a conclusion describing the nature of the association"],
  "If {{name}} has found a significant association between age group and preferred news source, can they use the contributions to describe the association?",
  [],
  [("ht_chi_squared", "h", "Interprets the chi-squared statistic cell by cell"),
   ("ht_conclusions", "s", "Writes conclusions in context")])
