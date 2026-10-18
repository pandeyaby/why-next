from dsl import T, C, P, R, L, M
DS = "Data & Statistics"
PR = "Probability"

# ---------------------------------------------------------------- the binomial distribution (wave 3)
T("ht_binomial_conditions", C, PR, "When a binomial model fits", "16-18",
  "State the conditions for a binomial model (a fixed number of independent trials, two outcomes, constant probability of success) and decide whether a context meets them",
  ["Lists the four conditions",
   "Decides whether a context is binomial and justifies it",
   "Defines the random variable X ~ B(n, p) in context"],
  "If {{name}} counts how many of 20 seeds germinate, can they explain what must be assumed for a binomial model to apply?",
  [],
  [("pb_independence", "h", "A binomial model needs trials that are independent, so one result does not change the next"),
   ("pb_distributions", "h", "The binomial is a particular probability distribution for a count of successes")])

T("ht_binomial_probabilities", P, PR, "Binomial probabilities", "16-18",
  "Calculate P(X = r) = ⁿCᵣ pʳ(1 − p)ⁿ⁻ʳ, explaining where each factor comes from, and use technology for binomial probabilities",
  ["Explains why the ⁿCᵣ factor is needed",
   "Calculates the probability of exactly 3 heads in 8 tosses",
   "Uses a calculator's binomial function"],
  "If {{name}} guesses every answer on a 10-question multiple-choice test with 4 options, can they find the probability of getting exactly 5 right?",
  ["S-MD.3"],
  [("ht_binomial_conditions", "h", "The formula gives correct probabilities only when the binomial conditions hold"),
   ("pb_permutations", "h", "ⁿCᵣ counts the different orders in which r successes can occur in n trials"),
   ("pb_dependent_trees", "s", "Each term multiplies probabilities along one path, as on a tree diagram")])

T("ht_binomial_cumulative", P, PR, "Cumulative binomial probabilities", "16-18",
  "Find P(X ≤ r), P(X ≥ r) and P(a ≤ X ≤ b) for a binomial distribution using cumulative functions, taking care with inequalities on a discrete variable",
  ["Finds P(X ≥ 4) as 1 − P(X ≤ 3)",
   "Converts 'fewer than 6' to P(X ≤ 5)",
   "Finds the probability of a range of values"],
  "If {{name}} needs the probability of at least 4 successes in 12 trials, can they rewrite it using P(X ≤ 3)?",
  [],
  [("ht_binomial_probabilities", "h", "P(X ≤ r) adds the individual binomial probabilities from 0 up to r"),
   ("mt_XfyqXLqzpx", "h", "P(X ≥ r) is found as 1 − P(X ≤ r − 1), using complementary events")])

T("ht_binomial_mean_variance", P, PR, "Mean and variance of a binomial distribution", "16-18",
  "Use E(X) = np and Var(X) = np(1 − p) for a binomial distribution and interpret the mean as the long-run average count",
  ["Calculates the mean and standard deviation of B(50, 0.3)",
   "Interprets np in context",
   "Explains why the variance is largest when p = 0.5"],
  "If {{name}} knows 30% of customers buy dessert, can they work out the expected number and spread out of 50 customers?",
  ["S-MD.2"],
  [("ht_binomial_probabilities", "h", "E(X) = np and Var(X) = np(1 − p) summarise the binomial distribution's probabilities"),
   ("pb_expected_value", "h", "np is the expected value of the count, the long-run average number of successes")])

T("ht_binomial_shape", R, PR, "Shape of binomial distributions", "16-18",
  "Sketch and describe how the shape of B(n, p) depends on n and p — symmetric when p = 0.5, skewed when p is near 0 or 1, and more bell-shaped as n grows",
  ["Sketches B(10, 0.5) and B(10, 0.1)",
   "Describes the effect of increasing n",
   "Links shape to whether a normal approximation is reasonable"],
  "If {{name}} graphs B(20, 0.5) and B(20, 0.1), can they describe and explain the difference in shape?",
  [],
  [("ht_binomial_probabilities", "h", "Each bar of the graph is a binomial probability, so their pattern shows the shape"),
   ("st_distribution_shape", "s", "Words such as symmetric and positively skewed describe how the shape changes with p")])

T("ht_binomial_critique", M, PR, "Judging binomial assumptions in context", "16-18",
  "Critique a binomial model in context, identifying where independence or constant probability may fail (e.g. seeds in the same tray, free throws when tired), and describe the effect on conclusions",
  ["Identifies an assumption that may fail",
   "Explains why the failure matters",
   "Suggests how data collection could reduce the problem"],
  "If {{name}} models a basketball player's 20 free throws as binomial, can they explain why the model might not be realistic?",
  [],
  [("ht_binomial_conditions", "h", "Each condition is checked against the context to see where it might fail"),
   ("ht_binomial_probabilities", "s", "Comparing binomial predictions with real data shows how far the model is off")])

T("ht_normal_approx_binomial", P, PR, "Normal approximation to the binomial", "17-18",
  "Approximate B(n, p) by N(np, np(1 − p)) when n is large and p is not too close to 0 or 1, applying a continuity correction",
  ["Checks that a normal approximation is appropriate",
   "Applies a continuity correction to P(X ≤ 40)",
   "Compares the approximation with the exact binomial value"],
  "If {{name}} needs P(X ≥ 60) for X ~ B(100, 0.55), can they use a normal approximation correctly?",
  [],
  [("ht_binomial_mean_variance", "h", "The approximating normal uses mean np and variance np(1 − p)"),
   ("st_normal_probabilities", "h", "Probabilities are then found as areas under the normal curve"),
   ("ht_binomial_shape", "s", "A binomial becomes bell-shaped for large n with p near 0.5, which justifies the approximation")])

# ---------------------------------------------------------------- logic and language of tests
T("ht_test_logic", C, DS, "The logic of a hypothesis test", "16-18",
  "Explain the logic of a hypothesis test: assume a model (the null hypothesis), ask how surprising the data would be under it, and treat a very surprising result as evidence against the model, never as proof",
  ["Explains why the null model is assumed true during the test",
   "Explains what makes a result 'surprising'",
   "Explains why a test cannot prove a hypothesis"],
  "If {{name}} sees a coin land heads 16 times in 20 tosses, can they explain how a test would decide whether to doubt that it is fair?",
  ["S-IC.2"],
  [("st_model_consistency", "h", "Asking whether data are surprising under a model formalises checking whether a model fits"),
   ("st_sampling_variability", "h", "Whether a result is surprising is judged against normal sample-to-sample variation")])

T("ht_hypotheses", L, DS, "Null and alternative hypotheses", "16-18",
  "Write null and alternative hypotheses about a population parameter (e.g. H₀: p = 0.25, H₁: p > 0.25), distinguishing parameters from sample statistics",
  ["Writes H₀ and H₁ for a context",
   "Explains why hypotheses use p and not the sample proportion",
   "Chooses the direction of H₁ from the claim"],
  "If {{name}} wants to test a claim that a new drug helps more than 40% of patients, can they write suitable hypotheses?",
  [],
  [("ht_test_logic", "h", "H₀ states the model assumed true, and H₁ the change being looked for"),
   ("st_population_sample", "h", "Hypotheses are about a population parameter such as p, not the sample result")])

T("ht_significance_level", C, DS, "Significance level", "16-18",
  "Explain the significance level as the threshold probability for rejecting the null hypothesis (often 5% or 1%), chosen before collecting data, and explain the effect of choosing a smaller level",
  ["Explains what a 5% significance level means",
   "Explains why the level is set in advance",
   "Explains the trade-off of using 1% instead of 5%"],
  "If {{name}} is told a test used a 1% significance level, can they explain what that means and why someone might choose it?",
  [],
  [("ht_test_logic", "h", "The significance level sets how unlikely a result must be under H₀ to count as surprising")])

T("ht_test_statistic", C, DS, "Test statistics and their null distribution", "16-18",
  "Identify a suitable test statistic (such as the number of successes) and its distribution if the null hypothesis is true",
  ["States the test statistic for a context",
   "Writes its distribution under H₀, e.g. X ~ B(20, 0.5)",
   "Explains why the distribution assumes H₀"],
  "If {{name}} tests whether a dice shows six more often than it should, can they state the test statistic and its distribution under H₀?",
  [],
  [("ht_hypotheses", "h", "The null distribution of the test statistic comes from assuming H₀ is true"),
   ("ht_binomial_conditions", "h", "The first null distributions met are binomial, so the conditions for a binomial must hold")])

T("ht_p_values", C, DS, "p-values", "16-18",
  "Calculate a p-value as the probability, assuming H₀, of a result at least as extreme as the one observed, compare it with the significance level, and avoid common misinterpretations",
  ["Calculates a p-value from a binomial distribution",
   "Compares a p-value with the significance level",
   "Explains why a p-value is not the probability that H₀ is true"],
  "If {{name}} gets a p-value of 0.03, can they explain what it means and what it does not mean?",
  [],
  [("ht_test_statistic", "h", "The p-value is a tail probability calculated from the null distribution"),
   ("ht_significance_level", "h", "H₀ is rejected when the p-value is below the significance level"),
   ("ht_binomial_cumulative", "h", "A binomial p-value such as P(X ≥ 9) is a cumulative probability")])

T("ht_critical_regions", P, DS, "Critical regions and critical values", "16-18",
  "Find the critical region for a test (the values of the test statistic that lead to rejecting H₀) and decide the outcome by checking whether the observed value lies in it",
  ["Finds a critical region for a one-tailed binomial test",
   "Identifies the critical value",
   "Uses the critical region to reach a decision"],
  "If {{name}} tests H₀: p = 0.3 against H₁: p > 0.3 with 20 trials at 5%, can they find the critical region?",
  [],
  [("ht_test_statistic", "h", "The critical region is the set of test-statistic values that would lead to rejecting H₀"),
   ("ht_significance_level", "h", "The critical region is chosen so its probability under H₀ is at most the significance level"),
   ("ht_binomial_cumulative", "h", "Binomial critical values are found by checking cumulative probabilities against the level")])

T("ht_actual_significance", P, DS, "Actual significance level for discrete tests", "16-18",
  "Explain why a binomial critical region usually has a probability below the nominal significance level, and calculate this actual significance level",
  ["Calculates the probability of the critical region under H₀",
   "Explains why it differs from 5%",
   "Links the actual level to the chance of a wrong rejection"],
  "If {{name}} finds a critical region of X ≥ 9, can they calculate its actual significance level and explain why it isn't exactly 5%?",
  [],
  [("ht_critical_regions", "h", "The actual significance level is the probability under H₀ of landing in the critical region")])

T("ht_tails", C, DS, "One-tailed and two-tailed tests", "16-18",
  "Choose a one-tailed or two-tailed test from the wording of the claim before seeing data, and split the significance level between both tails for a two-tailed test",
  ["Decides between one and two tails from a claim",
   "Splits 5% into 2.5% in each tail",
   "Explains why the choice must be made before looking at data"],
  "If {{name}} is testing whether a coin is biased, without saying which way, can they explain why a two-tailed test is needed?",
  [],
  [("ht_hypotheses", "h", "Whether H₁ says 'greater', 'less' or 'different' decides one or two tails"),
   ("ht_significance_level", "h", "In a two-tailed test, the significance level is split equally between the two tails")])

T("ht_binomial_test", P, DS, "Hypothesis test for a binomial proportion", "16-18",
  "Carry out a complete hypothesis test for a binomial proportion: hypotheses, null distribution, p-value or critical region, decision and conclusion in context",
  ["Carries out a one-tailed test",
   "Carries out a two-tailed test",
   "States a conclusion in context without claiming proof"],
  "If {{name}} hears that 7 out of 10 people preferred a new cola when 50% was expected, can they carry out a test at 5% and state a conclusion?",
  [],
  [("ht_p_values", "h", "The decision can be made by comparing a binomial p-value with the significance level"),
   ("ht_critical_regions", "h", "The decision can instead be made by checking whether the result lies in the critical region"),
   ("ht_tails", "h", "The wording of the claim decides whether the binomial test is one- or two-tailed")])

T("ht_conclusions", M, DS, "Writing conclusions to hypothesis tests", "16-18",
  "Write conclusions that refer to the context, the evidence and the significance level ('there is sufficient evidence at the 5% level to suggest…'), avoiding claims that H₀ has been proved or accepted",
  ["Writes a conclusion in context",
   "Corrects a conclusion that says 'this proves'",
   "Explains the difference between 'not rejecting' and 'accepting' H₀"],
  "If {{name}} reads a conclusion saying 'the test proves the coin is fair', can they explain what is wrong and rewrite it?",
  [],
  [("ht_binomial_test", "h", "A conclusion states in context what the decision of the test means"),
   ("st_evaluating_reports", "s", "Careful wording avoids the overstated claims criticised when judging reports")])

T("ht_errors", C, DS, "Type I and type II errors", "17-18",
  "Define type I errors (rejecting a true H₀) and type II errors (failing to reject a false H₀), find the probability of a type I error, and explain the trade-off between them",
  ["Defines both errors in context",
   "States that P(type I error) equals the actual significance level",
   "Explains how reducing one error tends to increase the other"],
  "If {{name}} thinks about a medical test for a disease, can they describe a type I and a type II error and say which is worse here?",
  [],
  [("ht_actual_significance", "h", "The probability of a type I error equals the actual significance level of the test"),
   ("ht_binomial_test", "h", "Type I and type II errors are the two ways a test's decision can be wrong")])

T("ht_power", C, DS, "Power of a test", "17-18",
  "Explain power as the probability of rejecting H₀ when it is false (1 − P(type II error)), and describe how sample size, significance level and effect size affect it",
  ["Defines power",
   "Calculates P(type II error) for a given alternative",
   "Explains why larger samples increase power"],
  "If {{name}} runs a small trial that finds 'no significant effect', can they explain why low power means this isn't strong evidence of no effect?",
  [],
  [("ht_errors", "h", "Power is 1 − P(type II error), the chance of correctly rejecting a false H₀")])

# ---------------------------------------------------------------- tests with the normal distribution
T("ht_sample_mean_distribution", C, DS, "The distribution of the sample mean", "17-18",
  "Explain that sample means vary less than individual values, that X̄ ~ N(μ, σ²/n) for normal populations (approximately for large n), and interpret σ/√n as the standard error",
  ["Explains why sample means vary less than individual values",
   "Calculates the standard error",
   "Uses the distribution of X̄ to find a probability"],
  "If {{name}} knows individual bags of crisps vary with standard deviation 2 g, can they explain why the mean of 25 bags varies much less?",
  [],
  [("st_normal_distribution", "h", "Sample means of a normal population follow a normal distribution, N(μ, σ²/n)"),
   ("st_sampling_variability", "h", "The variance σ²/n puts a number on how sample means vary less with larger samples"),
   ("st_standard_deviation", "h", "The standard error σ/√n is a standard deviation of the sample mean")])

T("ht_normal_mean_test", P, DS, "Hypothesis test for a normal mean", "17-18",
  "Test a claim about a population mean using z = (x̄ − μ₀)/(σ/√n), with critical values or p-values, for one- and two-tailed tests",
  ["Calculates the test statistic",
   "Uses critical values such as 1.645 and 1.96",
   "Concludes in context"],
  "If {{name}} is told a machine fills bottles to a mean of 500 ml and a sample of 30 averages 497 ml, can they test whether the mean has fallen?",
  [],
  [("ht_sample_mean_distribution", "h", "The test statistic uses the distribution of x̄ under H₀, with standard error σ/√n"),
   ("st_z_scores", "h", "x̄ is standardised to z = (x̄ − μ₀)/(σ/√n) before comparing with critical values"),
   ("ht_tails", "h", "The claim decides whether the critical value is one-tailed or two-tailed"),
   ("ht_p_values", "h", "The decision uses a p-value or critical value, as in the binomial test")])

T("ht_proportion_z_test", P, DS, "Large-sample test for a proportion", "17-18",
  "Test a claim about a population proportion with a large sample, using a normal approximation for the sample proportion and checking that the conditions hold",
  ["Checks large-sample conditions",
   "Calculates a z statistic for a proportion",
   "Compares the result with an exact binomial test"],
  "If {{name}} surveys 400 voters and 54% support a policy, can they test whether support is above 50%?",
  [],
  [("ht_normal_approx_binomial", "h", "The sample count is approximated by a normal distribution when n is large"),
   ("ht_binomial_test", "h", "A large-sample test for p extends the binomial test, where exact calculation becomes awkward"),
   ("ht_normal_mean_test", "s", "The z-statistic and decision follow the same steps as the test for a normal mean")])

T("ht_confidence_intervals", P, DS, "Confidence intervals for a mean", "17-18",
  "Construct and interpret a confidence interval for a population mean as x̄ ± z·σ/√n, explaining what the confidence level means and how the interval relates to a two-tailed test",
  ["Calculates a 95% confidence interval",
   "Interprets the interval correctly",
   "Explains how a larger sample changes the width"],
  "If {{name}} finds a 95% confidence interval of 12.1 to 13.5, can they explain what the 95% refers to?",
  ["S-IC.4"],
  [("ht_sample_mean_distribution", "h", "The interval x̄ ± z·σ/√n is built from the standard error of the sample mean"),
   ("st_margin_of_error", "h", "z·σ/√n is the margin of error, now calculated from a formula rather than by simulation")])

# ---------------------------------------------------------------- other tests and judgement
T("ht_correlation_test", P, DS, "Testing for correlation", "17-18",
  "Test whether a population correlation coefficient ρ is zero using the sample value r and a table of critical values for the sample size and significance level",
  ["Writes hypotheses about ρ",
   "Finds the critical value for given n and significance level",
   "Concludes in context and avoids claiming causation"],
  "If {{name}} finds r = 0.42 from 15 pairs of data, can they test at 5% whether there is evidence of positive correlation?",
  [],
  [("st_correlation_coefficient", "h", "The test asks whether a sample value of r is strong enough to suggest ρ ≠ 0"),
   ("ht_tails", "h", "Testing for positive, negative or any correlation decides one or two tails"),
   ("ht_critical_regions", "h", "r is compared with a critical value from a table for the sample size"),
   ("fm_correlation_causation", "s", "A significant correlation still does not show that one variable causes the other")])

T("ht_randomisation_test", P, DS, "Randomisation tests for comparing groups", "16-18",
  "Use a randomisation (re-allocation) simulation to judge whether a difference between two treatment groups is significant, and estimate a p-value from the simulation",
  ["Explains why group labels are shuffled",
   "Estimates a p-value from a simulated distribution",
   "Decides whether a difference is significant"],
  "If {{name}} finds a fertiliser group grew 3 cm taller on average, can they use a re-randomisation simulation to judge whether this could be chance?",
  ["S-IC.5"],
  [("st_randomised_experiments", "h", "Comparing treatment groups in a randomised experiment is the setting for the test"),
   ("pb_simulation", "h", "The group labels are re-shuffled many times by simulation to see what chance alone gives"),
   ("ht_p_values", "h", "The p-value is estimated as the proportion of shuffles at least as extreme as the result")])

T("ht_chi_squared", P, DS, "Chi-squared test for independence", "17-18",
  "Test whether two categorical variables are associated using a chi-squared test on a contingency table, calculating expected frequencies and comparing the statistic with a critical value",
  ["Calculates expected frequencies",
   "Calculates the chi-squared statistic and degrees of freedom",
   "Concludes about association in context"],
  "If {{name}} has a table of year group against preferred lunch option, can they test whether choice is independent of year group?",
  [],
  [("st_two_way_tables", "h", "The observed counts are arranged in a two-way contingency table"),
   ("pb_independence", "h", "Expected counts assume independence, using P(A and B) = P(A) × P(B)"),
   ("ht_critical_regions", "h", "The chi-squared statistic is compared with a critical value for its degrees of freedom")])

T("ht_goodness_of_fit", P, DS, "Chi-squared goodness-of-fit test", "17-18",
  "Test whether observed frequencies fit a proposed distribution (such as a fair die or a stated ratio) by comparing observed and expected frequencies with a chi-squared statistic",
  ["Calculates expected frequencies from a model",
   "Combines classes when expected frequencies are small",
   "Concludes whether the model fits"],
  "If {{name}} rolls a die 120 times and records the counts for each face, can they test whether the die is fair?",
  [],
  [("pb_expected_frequency", "h", "Expected frequencies under the proposed distribution are probability × total count"),
   ("ht_critical_regions", "h", "The statistic is compared with a chi-squared critical value at the chosen level"),
   ("ht_chi_squared", "s", "The statistic Σ(O − E)²/E is the same one used in the test for independence")])

T("ht_choose_test", M, DS, "Choosing an appropriate hypothesis test", "17-18",
  "Choose a suitable test (binomial, normal mean, proportion, correlation or chi-squared) for a question and data type, and check the test's conditions",
  ["Matches questions to tests",
   "Checks conditions before testing",
   "Explains why a test is not appropriate for given data"],
  "If {{name}} has four research questions, can they choose a suitable test for each and justify it?",
  [],
  [("ht_binomial_test", "h", "The binomial test is the choice for a count of successes in a fixed number of trials"),
   ("ht_normal_mean_test", "h", "The normal mean test is the choice for a claim about a mean with known σ"),
   ("ht_correlation_test", "h", "The correlation test is the choice for a question about association in paired data"),
   ("ht_chi_squared", "s", "The chi-squared test is the choice for association between two categorical variables")])

T("ht_practical_significance", M, DS, "Statistical versus practical significance", "17-18",
  "Distinguish a statistically significant result from a practically important one, explaining how very large samples can make tiny effects significant",
  ["Explains why a tiny difference can be significant with a huge sample",
   "Uses effect size as well as p-value",
   "Evaluates a headline based on a significant result"],
  "If {{name}} reads that a diet 'significantly' reduced weight by 0.2 kg in 10 000 people, can they explain why this might not matter?",
  [],
  [("ht_p_values", "h", "A tiny p-value shows strong evidence of an effect but says nothing about its size"),
   ("st_evaluating_reports", "h", "Asking whether an effect matters in practice is part of judging reports"),
   ("ht_power", "s", "Very large samples have high power, so they can make tiny effects significant")])

T("ht_multiple_testing", M, DS, "Multiple testing and p-hacking", "17-18",
  "Explain why running many tests at 5% will produce some 'significant' results by chance, recognise p-hacking and selective reporting, and explain the role of replication",
  ["Estimates how many false positives to expect from 20 tests",
   "Explains what p-hacking is",
   "Explains why replication matters"],
  "If {{name}} hears a study tested 20 foods and found one 'linked to cancer' at 5%, can they explain why this may be a false positive?",
  [],
  [("ht_errors", "h", "Each test at 5% has a 5% chance of a type I error, so many tests produce false positives"),
   ("ht_practical_significance", "s", "Judging research claims includes asking how many tests were run before one was significant")])
