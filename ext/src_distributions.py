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
  [("pb_expected_value", "h", "Var(X) = E(X²) − [E(X)]² is built from two expected values, each a sum of value × probability"),
   ("st_standard_deviation", "s", "The standard deviation of a data set is extended to a probability distribution")])

T("dt_linear_combinations", P, PR, "Expectation and variance of combined random variables", "17-18",
  "Use E(aX + b) = aE(X) + b, Var(aX + b) = a²Var(X), E(X ± Y) = E(X) ± E(Y) and, for independent variables, Var(X ± Y) = Var(X) + Var(Y)",
  ["Finds the mean and variance of 3X + 2",
   "Explains why Var(X − Y) adds the variances",
   "Distinguishes X₁ + X₂ from 2X"],
  "If {{name}} knows the mean and variance of one bag's mass, can they find the mean and variance of the total mass of two independent bags, and explain why it differs from doubling one bag?",
  [],
  [("dt_variance_rv", "h", "The rules combine the variances of individual random variables"),
   ("pb_independence", "h", "Var(X + Y) = Var(X) + Var(Y) holds only when X and Y are independent")])

T("dt_normal_combinations", P, PR, "Combining independent normal variables", "17-18",
  "Use the fact that sums and differences of independent normal variables are normal to find probabilities, such as the chance that the total mass of four items exceeds a limit",
  ["Finds the distribution of X + Y for independent normals",
   "Finds P(X > Y) by considering X − Y",
   "Finds the distribution of the total of n items"],
  "If {{name}} knows the masses of apples and of the box are normally distributed, can they find the probability that a box of six apples weighs more than 1.2 kg?",
  [],
  [("dt_linear_combinations", "h", "The mean and variance of the total or difference come from the combination rules"),
   ("st_normal_probabilities", "h", "Once the combined normal is known, probabilities are found as areas under the curve")])

# ---------------------------------------------------------------- Poisson distribution
T("dt_poisson_conditions", C, PR, "When a Poisson model fits", "16-18",
  "State the conditions for a Poisson model (events occur singly, independently and at a constant average rate in a fixed interval of time or space) and decide whether a context meets them",
  ["States the conditions for a Poisson model",
   "Decides whether arrivals, defects or calls fit the model",
   "Contrasts a Poisson count with a binomial count of successes in n trials"],
  "If {{name}} models the number of emails arriving in an hour, can they explain what must be true for a Poisson model to be suitable?",
  [],
  [("pb_distributions", "h", "The Poisson is a probability distribution for counts of events in an interval"),
   ("pb_independence", "h", "A Poisson model needs events that occur independently of one another"),
   ("ht_binomial_conditions", "s", "Poisson conditions are compared with binomial ones, where the number of trials is fixed")])

T("dt_poisson_probabilities", P, PR, "Poisson probabilities", "16-18",
  "Calculate P(X = r) = e^(−λ)λʳ/r! for X ~ Po(λ), by formula and with technology",
  ["Calculates P(X = 2) for X ~ Po(3.5)",
   "Explains what λ represents in context",
   "Uses a calculator's Poisson function"],
  "If {{name}} knows a shop averages 4 customers every 10 minutes, can they find the probability that exactly 6 arrive in a 10-minute period?",
  ["S-MD.3"],
  [("dt_poisson_conditions", "h", "The formula gives correct probabilities only when the Poisson conditions hold"),
   ("pb_permutations", "h", "The r! in the formula uses factorial notation from counting arrangements"),
   ("ca_exp_derivative", "s", "The factor e^(−λ) uses the exponential constant e and its powers")])

T("dt_poisson_cumulative", P, PR, "Cumulative Poisson probabilities", "16-18",
  "Find P(X ≤ r), P(X ≥ r) and probabilities of ranges for a Poisson variable using cumulative functions, taking care with inequalities for a discrete variable",
  ["Finds P(X ≥ 3) as 1 − P(X ≤ 2)",
   "Converts 'more than 5' to 1 − P(X ≤ 5)",
   "Finds P(2 ≤ X ≤ 6)"],
  "If {{name}} needs the probability of at least 3 breakdowns in a month for X ~ Po(1.8), can they find it from cumulative probabilities?",
  [],
  [("dt_poisson_probabilities", "h", "P(X ≤ r) adds the individual Poisson probabilities for 0, 1, 2, … up to r"),
   ("ht_binomial_cumulative", "s", "Turning P(X > 3) into 1 − P(X ≤ 3) is handled exactly as for binomial variables")])

T("dt_poisson_mean_variance", P, PR, "Mean and variance of a Poisson distribution", "16-18",
  "Use E(X) = Var(X) = λ for a Poisson distribution, and compare a sample's mean and variance as a check on whether a Poisson model is plausible",
  ["States the mean and variance of Po(λ)",
   "Calculates the sample mean and variance of count data",
   "Judges whether similar mean and variance support a Poisson model"],
  "If {{name}} has counts of daisies in 50 quadrats with mean 2.1 and variance 6.3, can they explain what this suggests about a Poisson model?",
  ["S-MD.2"],
  [("dt_poisson_probabilities", "h", "The single parameter λ in the Poisson formula turns out to be both its mean and variance"),
   ("dt_variance_rv", "h", "Var(X) = λ is a variance of a random variable, as defined for any distribution"),
   ("pb_expected_value", "s", "λ is the expected value, the long-run mean number of events per interval")])

T("dt_poisson_rate_scaling", P, PR, "Changing the interval for a Poisson rate", "16-18",
  "Scale the Poisson parameter in proportion to the length of the interval, for example from 3 per hour to 1.5 per half-hour or 72 per day",
  ["Rescales λ for a different time interval",
   "Rescales λ for an area or length",
   "Finds a probability for the rescaled interval"],
  "If {{name}} knows faults occur at 0.8 per metre of cable, can they find the probability of no faults in a 5-metre length?",
  [],
  [("dt_poisson_probabilities", "h", "After rescaling λ, probabilities for the new interval come from the Poisson formula"),
   ("mt_kLQOzZYrd5", "s", "λ is a rate such as 3 per hour, so it scales with the interval like a compound unit")])

T("dt_poisson_sums", C, PR, "Sums of independent Poisson variables", "17-18",
  "Use the result that if X ~ Po(λ) and Y ~ Po(μ) are independent then X + Y ~ Po(λ + μ), and recognise when the result does not apply",
  ["Finds the distribution of the total of two independent counts",
   "Calculates a probability for the combined count",
   "Explains why independence is needed"],
  "If {{name}} knows one call centre averages 3 calls a minute and another 5, can they find the probability of more than 10 calls in total in a minute?",
  [],
  [("dt_poisson_rate_scaling", "h", "Both rates must refer to the same interval before they are added"),
   ("pb_independence", "h", "X + Y ~ Po(λ + μ) holds only when the two counts are independent"),
   ("dt_linear_combinations", "s", "Means and variances add for independent variables, which matches Po(λ + μ)")])

T("dt_poisson_approx_binomial", P, PR, "Poisson approximation to the binomial", "17-18",
  "Approximate B(n, p) by Po(np) when n is large and p is small, and judge when the approximation is reasonable",
  ["States when the approximation is appropriate",
   "Approximates P(X ≤ 2) for B(500, 0.004)",
   "Compares the approximation with the exact binomial value"],
  "If {{name}} needs the probability that more than 3 of 1000 parts are faulty when each has a 0.2% chance of being faulty, can they use a suitable approximation?",
  [],
  [("ht_binomial_mean_variance", "h", "The approximating Poisson uses the binomial mean np as its parameter λ"),
   ("dt_poisson_cumulative", "h", "Approximate probabilities are then found from cumulative Poisson values"),
   ("ht_binomial_shape", "s", "A binomial with small p is strongly skewed, like a Poisson, which is why it works")])

T("dt_normal_approx_poisson", P, PR, "Normal approximation to the Poisson", "17-18",
  "Approximate Po(λ) by N(λ, λ) when λ is large, applying a continuity correction",
  ["Checks that λ is large enough for the approximation",
   "Applies a continuity correction to P(X ≥ 30)",
   "Compares with the exact Poisson value using technology"],
  "If {{name}} needs P(X > 60) for X ~ Po(50), can they use a normal approximation with a continuity correction?",
  [],
  [("dt_poisson_mean_variance", "h", "The approximating normal N(λ, λ) uses the Poisson mean and variance"),
   ("ht_normal_approx_binomial", "h", "The continuity correction is applied exactly as in the normal approximation to the binomial")])

T("dt_poisson_critique", M, PR, "Judging Poisson assumptions in context", "17-18",
  "Critique a Poisson model in context, identifying clustering, a changing rate or events that are not independent, and use a variance much larger than the mean as evidence against the model",
  ["Identifies why a rate may not be constant",
   "Explains how clustering breaks independence",
   "Uses sample mean and variance to question a model"],
  "If {{name}} models goals in football matches as Poisson, can they explain which assumptions might fail and how the data could show it?",
  [],
  [("dt_poisson_conditions", "h", "Each condition, such as a constant rate, is checked against the context"),
   ("dt_poisson_mean_variance", "s", "A sample variance much larger than the mean is evidence against a Poisson model")])

# ---------------------------------------------------------------- geometric distribution
T("dt_geometric", C, PR, "The geometric distribution", "17-18",
  "Model the number of trials up to and including the first success with X ~ Geo(p), where P(X = r) = (1 − p)^(r − 1)p, under the same independence and constant-probability assumptions as the binomial",
  ["Explains why the probabilities form a geometric sequence",
   "Calculates P(X = 4) for p = 0.2",
   "States the assumptions for the model in context"],
  "If {{name}} rolls a die until a six appears, can they find the probability that the first six is on the fifth roll?",
  ["S-MD.3"],
  [("ht_binomial_conditions", "h", "Geometric trials share the binomial assumptions of independence and constant probability"),
   ("al_geo_seq", "h", "The probabilities p, (1 − p)p, (1 − p)²p, … form a geometric sequence"),
   ("sr_sum_to_infinity", "s", "Summing that geometric sequence to infinity shows the probabilities total 1")])

T("dt_geometric_cumulative", P, PR, "Cumulative geometric probabilities", "17-18",
  "Use P(X > r) = (1 − p)ʳ and P(X ≤ r) = 1 − (1 − p)ʳ for a geometric variable, and solve for the number of trials needed to reach a given probability",
  ["Explains why P(X > r) = (1 − p)ʳ",
   "Finds the probability that the first success takes more than 10 trials",
   "Finds the least n with P(X ≤ n) > 0.9 using logarithms"],
  "If {{name}} has a 15% chance of winning each game, can they find how many games are needed for a 90% chance of at least one win?",
  [],
  [("dt_geometric", "h", "P(X > r) = (1 − p)ʳ follows from needing r failures in a row"),
   ("al_geo_series", "s", "P(X ≤ r) is a finite geometric series, which simplifies to 1 − (1 − p)ʳ"),
   ("fm_logarithms", "s", "Solving (1 − p)ʳ < 0.05 for the number of trials uses logarithms")])

T("dt_geometric_mean", P, PR, "Mean and variance of the geometric distribution", "17-18",
  "Use E(X) = 1/p and Var(X) = (1 − p)/p² for a geometric distribution and interpret the mean as the long-run average waiting time",
  ["Calculates the expected number of trials for p = 0.25",
   "Calculates the variance",
   "Interprets the mean in context"],
  "If {{name}} knows 1 in 8 cereal boxes contains a prize, can they find the expected number of boxes needed to get the first prize?",
  ["S-MD.2"],
  [("dt_geometric", "h", "E(X) = 1/p and Var(X) = (1 − p)/p² summarise the geometric distribution"),
   ("dt_variance_rv", "h", "The variance is a variance of a random variable, as defined for any distribution")])

T("dt_choose_model", M, PR, "Choosing a discrete or continuous model", "17-18",
  "Choose between binomial, Poisson, geometric and normal models for a context by identifying what is counted or measured and which assumptions are reasonable",
  ["Matches contexts to suitable distributions",
   "Justifies the choice from the assumptions",
   "Explains why a given model is unsuitable"],
  "If {{name}} is given four situations (faults per roll of cloth, heights, attempts until a pass, heads in 20 tosses), can they choose and justify a model for each?",
  [],
  [("dt_poisson_conditions", "h", "A Poisson model is chosen for counts of random events at a constant rate"),
   ("dt_geometric", "h", "A geometric model is chosen for the number of trials until the first success"),
   ("ht_binomial_conditions", "h", "A binomial model is chosen for a count of successes in a fixed number of trials"),
   ("st_normal_distribution", "s", "A normal model is considered for measured, continuous data that are roughly symmetric")])

# ---------------------------------------------------------------- tests with the Poisson distribution
T("dt_poisson_test", P, DS, "Hypothesis test for a Poisson mean", "17-18",
  "Test a claim about a Poisson rate with H₀: λ = λ₀, rescaling λ₀ for the observation period and using a critical region or p-value from the Poisson distribution",
  ["Writes hypotheses about a rate in context",
   "Finds a critical region for a one-tailed test",
   "Concludes in context from an observed count"],
  "If {{name}} knows a road averaged 2 accidents a month and there were 12 in the 3 months after a speed camera was installed, can they test whether the rate has changed?",
  [],
  [("dt_poisson_cumulative", "h", "Tail probabilities under H₀ are found from cumulative Poisson values"),
   ("ht_critical_regions", "h", "The decision can be made by finding the critical region for the Poisson count"),
   ("ht_p_values", "h", "The decision can instead be made by comparing a p-value with the significance level"),
   ("dt_poisson_rate_scaling", "h", "The null rate λ₀ is rescaled to the length of the observation period"),
   ("ht_binomial_test", "s", "The steps of the test follow the same structure as a binomial test")])

T("dt_poisson_errors", P, DS, "Type I and type II errors in Poisson tests", "17-18",
  "Calculate the probability of a type I error (the actual significance level) and of a type II error for a given alternative value of λ in a Poisson test",
  ["Finds the actual significance level of a Poisson test",
   "Finds P(type II error) when λ takes a stated value",
   "Explains how the errors trade off"],
  "If {{name}} has a critical region X ≥ 9 for testing λ = 4, can they find the probability of each type of error when the true rate is 7?",
  [],
  [("dt_poisson_test", "h", "The error probabilities are calculated from the Poisson test's critical region"),
   ("ht_errors", "h", "The definitions of type I and type II errors are applied to a Poisson test"),
   ("ht_actual_significance", "s", "The type I error probability is the actual significance level")])

# ---------------------------------------------------------------- estimation and the t-distribution
T("dt_unbiased_estimates", P, DS, "Unbiased estimates of population mean and variance", "16-18",
  "Use x̄ to estimate μ and s² = Σ(x − x̄)²/(n − 1) to estimate σ², explaining why dividing by n − 1 removes the bias of dividing by n",
  ["Calculates s² from summary statistics",
   "Explains why dividing by n underestimates σ² on average",
   "Chooses the correct calculator output for an estimate"],
  "If {{name}} has the lengths of 12 sampled bolts, can they find unbiased estimates of the population mean and variance and explain the n − 1?",
  [],
  [("st_standard_deviation", "h", "The variance of a data set is adjusted to estimate the population variance"),
   ("st_population_sample", "h", "Estimating μ and σ² means telling sample statistics from population parameters"),
   ("st_sampling_variability", "s", "Estimates vary from sample to sample, and unbiased ones are right on average")])

T("dt_degrees_freedom", C, DS, "Degrees of freedom", "17-18",
  "Explain degrees of freedom as the number of values free to vary once constraints are fixed, why a t-test on n values uses n − 1, and how a contingency table gives (r − 1)(c − 1)",
  ["Explains why n deviations from x̄ have n − 1 degrees of freedom",
   "Finds degrees of freedom for t and chi-squared tests",
   "Describes how degrees of freedom change the shape of a distribution"],
  "If {{name}} is told 5 numbers have mean 10, can they explain how many of the numbers can be chosen freely and link this to degrees of freedom?",
  [],
  [("dt_unbiased_estimates", "h", "The n − 1 divisor in s² is the first example of losing one degree of freedom"),
   ("ht_chi_squared", "s", "Generalises the degrees of freedom used in chi-squared tests")])

T("dt_t_distribution", C, DS, "The t-distribution", "17-18",
  "Explain that when σ is estimated by s from a small sample of a normal population, (x̄ − μ)/(s/√n) follows a t-distribution with n − 1 degrees of freedom, which has heavier tails than the normal and approaches it as n grows",
  ["Explains why replacing σ by s changes the distribution",
   "Compares t critical values with 1.96",
   "Describes how the t-distribution changes with degrees of freedom"],
  "If {{name}} has only 8 measurements and an estimated standard deviation, can they explain why a t-distribution is used instead of the normal?",
  [],
  [("ht_sample_mean_distribution", "h", "The t-statistic replaces σ by s in the standardised sample mean"),
   ("dt_unbiased_estimates", "h", "s, the unbiased estimate of σ, is what makes the distribution t rather than normal"),
   ("dt_degrees_freedom", "h", "Each t-distribution is indexed by its degrees of freedom, n − 1 for one sample"),
   ("st_normal_distribution", "s", "The t-distribution is compared with the normal curve, having heavier tails")])

T("dt_one_sample_t", P, DS, "One-sample t-test", "17-18",
  "Test a claim about the mean of a normal population with unknown variance using t = (x̄ − μ₀)/(s/√n) with n − 1 degrees of freedom, for one- and two-tailed tests",
  ["Calculates the t statistic",
   "Finds the critical value from tables or technology",
   "Concludes in context"],
  "If {{name}} has 10 measured fill volumes from bottles labelled 500 ml, can they test whether the mean is less than 500 ml?",
  [],
  [("dt_t_distribution", "h", "The null distribution of the test statistic is a t-distribution with n − 1 degrees of freedom"),
   ("ht_normal_mean_test", "h", "The t-test follows the z-test for a mean, with s replacing σ"),
   ("ht_tails", "s", "The wording of the claim decides whether the t-test is one- or two-tailed")])

T("dt_t_interval", P, DS, "Confidence intervals using the t-distribution", "17-18",
  "Construct and interpret a confidence interval x̄ ± t·s/√n for a population mean when σ is unknown, and explain why it is wider than the corresponding z-interval",
  ["Calculates a 95% t-interval",
   "Interprets the interval in context",
   "Explains why small samples give wider intervals"],
  "If {{name}} has the reaction times of 9 people, can they construct a 95% confidence interval for the population mean?",
  ["S-IC.4"],
  [("dt_t_distribution", "h", "The interval uses a t critical value with n − 1 degrees of freedom"),
   ("ht_confidence_intervals", "h", "The z-interval x̄ ± z·σ/√n is adapted by replacing z with t and σ with s")])

T("dt_paired_t", P, DS, "Paired t-test", "17-18",
  "Analyse paired data (such as before-and-after measurements on the same people) by testing the mean of the differences with a one-sample t-test",
  ["Calculates the differences and their mean and standard deviation",
   "Writes hypotheses about the mean difference",
   "Concludes in context"],
  "If {{name}} has 12 students' scores before and after a revision course, can they test whether the course improved scores on average?",
  [],
  [("dt_one_sample_t", "h", "The paired test is a one-sample t-test applied to the list of differences"),
   ("st_study_types", "s", "Recognising a matched-pairs design, such as before and after, decides the method"),
   ("st_randomised_experiments", "s", "Pairing removes variation between subjects when comparing two treatments")])

T("dt_two_sample_z", P, DS, "Comparing two means with a z-test", "17-18",
  "Test for a difference between two population means using z = (x̄ − ȳ)/√(σ₁²/n₁ + σ₂²/n₂) when the variances are known or the samples are large",
  ["Explains where the standard error of the difference comes from",
   "Calculates the test statistic",
   "Concludes in context"],
  "If {{name}} has large samples of journey times on two routes, can they test whether the mean times differ?",
  [],
  [("dt_normal_combinations", "h", "The difference of two independent sample means is normal with added variances"),
   ("ht_normal_mean_test", "h", "The test follows the structure of the z-test for a single mean")])

T("dt_two_sample_t", P, DS, "Two-sample t-test", "17-18",
  "Compare the means of two independent groups with a two-sample t-test, using a pooled variance when the population variances can be assumed equal, and interpret the result for an experiment",
  ["Calculates a pooled estimate of variance",
   "Calculates the t statistic with n₁ + n₂ − 2 degrees of freedom",
   "Concludes whether the treatments differ"],
  "If {{name}} has plant heights from 8 plants given a fertiliser and 10 plants without it, can they test whether the fertiliser increases mean height?",
  ["S-IC.5"],
  [("dt_one_sample_t", "h", "The two-sample test extends the one-sample t-test to compare two groups"),
   ("dt_linear_combinations", "h", "The variance of x̄ − ȳ is the sum of the two variances, even though the means are subtracted"),
   ("dt_two_sample_z", "s", "The z-test for two means is the model when variances are known"),
   ("ht_randomisation_test", "s", "A randomisation test compares the same two groups by simulation")])

T("dt_t_assumptions", M, DS, "Checking assumptions for t procedures", "17-18",
  "Check the assumptions behind t procedures (random independent samples, approximate normality and, for a pooled test, similar variances) using plots and summary statistics, and judge how robust a conclusion is",
  ["Checks a sample for skew and outliers before using t",
   "Explains why a large sample relaxes the normality condition",
   "Explains when a pooled test is inappropriate"],
  "If {{name}} has a small, strongly skewed sample with an outlier, can they explain whether a t-test is appropriate?",
  [],
  [("dt_one_sample_t", "h", "The checks are for the conditions behind the t-test already used"),
   ("st_outliers", "s", "Outliers strongly affect s, so they are checked before using a t procedure"),
   ("st_distribution_shape", "s", "Approximate normality is judged from the shape of a dot plot or histogram")])

T("dt_paired_vs_two_sample", M, DS, "Choosing paired or two-sample methods", "17-18",
  "Decide whether data are paired or come from independent samples, and explain how pairing reduces variability and changes the test",
  ["Classifies designs as paired or independent",
   "Explains why analysing paired data as independent loses power",
   "Chooses the correct test for a given design"],
  "If {{name}} is given an experiment with left and right hands of the same people, can they explain which t-test to use and why?",
  [],
  [("dt_paired_t", "h", "The paired test, on differences within each pair, is one of the two methods compared"),
   ("dt_two_sample_t", "h", "The two-sample test is the other method, for independent groups"),
   ("ht_choose_test", "s", "Choosing between paired and two-sample tests extends choosing a test for the data")])

# ---------------------------------------------------------------- chi-squared extensions
T("dt_chi_fit_distributions", P, DS, "Goodness of fit to binomial and Poisson models", "17-18",
  "Test the fit of a binomial or Poisson model to frequency data, estimating a parameter from the data when needed and reducing the degrees of freedom by one for each estimated parameter",
  ["Calculates expected frequencies from a Poisson model",
   "Combines classes so that expected frequencies are at least 5",
   "Reduces the degrees of freedom for an estimated parameter"],
  "If {{name}} has the number of goals per match in 100 matches, can they test whether a Poisson model fits?",
  [],
  [("ht_goodness_of_fit", "h", "The goodness-of-fit test is extended to binomial and Poisson models"),
   ("dt_poisson_probabilities", "h", "Expected frequencies for a Poisson model are probabilities times the total"),
   ("dt_degrees_freedom", "h", "One degree of freedom is lost for each parameter estimated from the data"),
   ("ht_binomial_probabilities", "s", "Expected frequencies for a binomial model are binomial probabilities times the total")])

T("dt_chi_contributions", M, DS, "Interpreting contributions in a chi-squared test", "17-18",
  "Use the individual (O − E)²/E contributions in a contingency table to describe which cells drive a significant association and in which direction",
  ["Identifies the cells with the largest contributions",
   "Compares observed and expected values in those cells",
   "Writes a conclusion describing the nature of the association"],
  "If {{name}} has found a significant association between age group and preferred news source, can they use the contributions to describe the association?",
  [],
  [("ht_chi_squared", "h", "The overall statistic is broken down into the (O − E)²/E contribution from each cell"),
   ("ht_conclusions", "s", "The largest contributions are described in context in the test's conclusion")])
