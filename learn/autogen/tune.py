"""Topic-specific tuning for starter lessons: numbers, worked examples, lab settings and applied questions
are chosen from each topic's own words (e.g. 'one-digit' gives one-digit numbers), seeded by the topic id."""
import re
from items import mc
from tune_num import *
from tune_num import fmt, spot, digits, within, nd
from tune_sci import *
def t_coord(t, r, x):
    four = re.search(r"four|all|negative|quadrant", x, re.I); px, py = r.randint(1, 7) * (r.choice([-1, 1]) if four else 1), r.randint(1, 7) * (r.choice([-1, 1]) if four else 1)
    v = dict(target=[abs(px), abs(py)]) if not four else {}
    return dict(vis=v, worked=(f"Plot ({px}, {py})", [f"Start at the origin (0, 0).", f"Go {'right' if px > 0 else 'left'} {abs(px)} along the x-axis.", f"Then go {'up' if py > 0 else 'down'} {abs(py)}.", f"Mark the point ({px}, {py})."]),
                say=f"For example, ({px}, {py}) is {abs(px)} {'right' if px > 0 else 'left'} and {abs(py)} {'up' if py > 0 else 'down'}.", applied=[mc(f"Which point is {abs(px)} {'right' if px > 0 else 'left'} and {abs(py)} {'up' if py > 0 else 'down'} from the origin?", [f"({px}, {py})", f"({py}, {px})", f"({-px}, {py})"], "Across first, then up or down.", f"Across {px}, then {py}: ({px}, {py}).") if px != py else None])
def t_lin(t, r, x):
    m, c = r.choice([-2, -1, 2, 3, 1]), r.randint(-3, 4); tg = [[0, c], [2, 2 * m + c]]
    return dict(vis=dict(targets=tg), worked=(f"y = {m}x {'+' if c >= 0 else '−'} {abs(c)}", [f"When x = 0: y = {c}, so it crosses the y-axis at (0, {c}).", f"When x = 2: y = {m} × 2 {'+' if c >= 0 else '−'} {abs(c)} = {2 * m + c}.", f"The gradient is {m}: each step right, y changes by {m}.", f"Join (0, {c}) and (2, {2 * m + c}) with a straight line."]),
                say=f"For example, y = {m}x {'+' if c >= 0 else '−'} {abs(c)} has gradient {m} and crosses the y-axis at {c}.", applied=[spot(f"y when x = 3 for y = {m}x {'+' if c >= 0 else '−'} {abs(c)}", 3 * m + c, [m + 3 + c, 3 * (m + c)], "Multiply by the gradient first, then add the intercept.")])
def t_quad(t, r, x):
    if re.search(r"difference of (two )?squares", x, re.I):
        k, m = r.randint(2, 5), r.randint(1, 7); return dict(vis=dict(targets=[[-m / k, 0], [m / k, 0]]) if m % k == 0 else {}, worked=(f"Factorise {k * k}x² − {m * m}", [f"{k * k}x² = ({k}x)² and {m * m} = {m}².", "Use a² − b² = (a + b)(a − b).", f"So {k * k}x² − {m * m} = ({k}x + {m})({k}x − {m}).", f"Check: ({k}x)² − {k * m}x + {k * m}x − {m * m} = {k * k}x² − {m * m}."]),
                    say=f"For example, {k * k}x² − {m * m} = ({k}x + {m})({k}x − {m}).", applied=[mc(f"Which is {k * k}x² − {m * m} factorised?", [f"({k}x + {m})({k}x − {m})", f"({k}x − {m})²", f"({k * k}x + {m})(x − {m})"], "Write each part as a square.", f"Both parts are squares, so it is ({k}x + {m})({k}x − {m}).")])
    if re.search(r"completing the square", x, re.I):
        h, c = r.randint(1, 5), r.randint(1, 9); return dict(worked=(f"Complete the square: x² + {2 * h}x + {c}", [f"Halve {2 * h}: {h}.", f"(x + {h})² = x² + {2 * h}x + {h * h}.", f"So x² + {2 * h}x + {c} = (x + {h})² {'+' if c - h * h >= 0 else '−'} {abs(c - h * h)}.", f"The turning point is (−{h}, {c - h * h})."]),
                    say=f"For example, x² + {2 * h}x + {c} = (x + {h})² {'+' if c - h * h >= 0 else '−'} {abs(c - h * h)}.", applied=[spot(f"the minimum value of x² + {2 * h}x + {c}", c - h * h, [c, h * h - c], "Complete the square and read the constant.")])
    p, q = r.sample([-4, -3, -2, -1, 1, 2, 3], 2); b, c = -(p + q), p * q
    return dict(vis=dict(targets=[[p, 0], [q, 0]]), worked=(f"x² {'+' if b >= 0 else '−'} {abs(b)}x {'+' if c >= 0 else '−'} {abs(c)} = 0", [f"Find two numbers that multiply to {c} and add to {b}: {-p} and {-q}.", f"Factorise: (x {'−' if p > 0 else '+'} {abs(p)})(x {'−' if q > 0 else '+'} {abs(q)}) = 0.", f"So x = {p} or x = {q}.", f"The graph crosses the x-axis at {p} and {q}."]),
                say=f"For example, x² {'+' if b >= 0 else '−'} {abs(b)}x {'+' if c >= 0 else '−'} {abs(c)} = 0 has roots {p} and {q}.", applied=[spot(f"the larger root of x² {'+' if b >= 0 else '−'} {abs(b)}x {'+' if c >= 0 else '−'} {abs(c)} = 0", max(p, q), [-max(p, q), -min(p, q)], "The roots have the opposite signs to the numbers in the brackets.")])
def t_seq(t, r, x):
    a, d = r.randint(1, 9), r.randint(2, 7); s = [a + d * i for i in range(5)]
    return dict(vis=dict(targets=[[1, a], [3, a + 2 * d]]), worked=(", ".join(map(str, s[:4])) + ", …", [f"The terms go up by {d} each time.", f"So the nth term starts with {d}n.", f"{d} × 1 = {d}, but the first term is {a}: adjust by {a - d}.", f"nth term = {d}n {'+' if a - d >= 0 else '−'} {abs(a - d)}."]),
                say=f"For example, {', '.join(map(str, s[:4]))} goes up by {d}.", applied=[spot(f"the 10th term of {', '.join(map(str, s[:4]))}, …", a + 9 * d, [a + 10 * d, 10 * d], "Use the nth term with n = 10.")])
def t_eq(t, r, x):
    a, xv, b = r.randint(2, 6), r.randint(2, 9), r.randint(1, 12); c = a * xv + b
    return dict(vis=dict(a=a, b=b, c=c), worked=(f"{a}x + {b} = {c}", [f"Subtract {b} from both sides: {a}x = {c - b}.", f"Divide both sides by {a}: x = {xv}.", f"Check: {a} × {xv} + {b} = {c}."]),
                say=f"For example, {a}x + {b} = {c} gives x = {xv}.", applied=[spot(f"x in {a}x + {b} = {c}", xv, [(c + b) / a, c - b], "Undo the + first, then the ×.")])
def t_expr(t, r, x):
    a, b = r.randint(2, 6), r.randint(1, 9)
    return dict(worked=(f"Expand {a}(x + {b})", [f"Multiply x by {a}: {a}x.", f"Multiply {b} by {a}: {a * b}.", f"So {a}(x + {b}) = {a}x + {a * b}.", f"Check with x = 1: {a} × {1 + b} = {a * (1 + b)} and {a} + {a * b} = {a + a * b}."]),
                say=f"For example, {a}(x + {b}) = {a}x + {a * b}.", applied=[mc(f"Which is {a}(x + {b}) expanded?", [f"{a}x + {a * b}", f"{a}x + {b}", f"x + {a * b}"], "Multiply both terms.", f"{a} × x and {a} × {b}: {a}x + {a * b}.")])
def t_pyth(t, r, x):
    a, b, c = r.choice([(3, 4, 5), (6, 8, 10), (5, 12, 13), (8, 15, 17), (9, 12, 15)])
    trig = re.search(r"trig|sin|cos|tan|soh", x, re.I); s = (1, 1)
    v = dict(pts=[[1, 1], [1 + min(a, 8), 1], [1, 1 + min(b, 6)]])
    w = (f"Sides {a} and {b}", [f"a² + b² = c².", f"{a}² + {b}² = {a * a} + {b * b} = {c * c}.", f"c = √{c * c} = {c}."] + ([f"The angle opposite {a}: sin = {a}/{c}."] if trig else []))
    return dict(vis=v, worked=w, say=f"For example, a right triangle with sides {a} and {b} has a hypotenuse of {c}.", applied=[spot(f"the hypotenuse when the shorter sides are {a} and {b}", c, [a + b, c * c], "Square, add, then square root.")])
def t_ang(t, r, x):
    a, b = r.randint(30, 80), r.randint(30, 80)
    return dict(worked=(f"Angles {a}° and {b}°", [f"Angles in a triangle add to 180°.", f"{a}° + {b}° = {a + b}°.", f"Missing angle = 180° − {a + b}° = {180 - a - b}°."]), say=f"For example, if two angles are {a}° and {b}°, the third is {180 - a - b}°.",
                applied=[spot(f"the third angle of a triangle with {a}° and {b}°", 180 - a - b, [360 - a - b, 90 - a + b], "Triangle angles total 180°.")])
def t_area(t, r, x):
    w, h = r.randint(2, 6), r.randint(2, 4); tri = re.search(r"triangl", x, re.I); par = re.search(r"parallelogram", x, re.I)
    A = w * h / 2 if tri else w * h; nm = "triangle" if tri else "parallelogram" if par else "rectangle"
    pts = [[1, 1], [1 + w, 1], [1, 1 + h]] if tri else [[1, 1], [1 + w, 1], [2 + w, 1 + h], [2, 1 + h]] if par else [[1, 1], [1 + w, 1], [1 + w, 1 + h], [1, 1 + h]]
    return dict(vis=dict(pts=pts, area=A), worked=(f"Area of a {nm}, base {w}, height {h}", ["Area = base × height" + (" ÷ 2." if tri else "."), f"{w} × {h} = {w * h}" + (f", then ÷ 2 = {fmt(A)}." if tri else "."), f"Area = {fmt(A)} square units."]),
                say=f"For example, a {nm} with base {w} and height {h} has area {fmt(A)}.", applied=[spot(f"the area of a {nm} with base {w} and height {h}", A, [2 * (w + h), w * h * 2 if tri else w + h], "Area is not the perimeter.")])
def t_vol(t, r, x):
    a, b, c = r.randint(2, 6), r.randint(2, 5), r.randint(2, 4)
    return dict(worked=(f"Cuboid {a} × {b} × {c}", [f"Volume = length × width × height.", f"{a} × {b} = {a * b} cubes in one layer.", f"{c} layers: {a * b} × {c} = {a * b * c} cubic units."]), say=f"For example, a {a} × {b} × {c} cuboid holds {a * b * c} unit cubes.",
                applied=[spot(f"the volume of a {a} × {b} × {c} cuboid", a * b * c, [a + b + c, 2 * (a * b + b * c + a * c)], "Multiply all three lengths.")])
def t_circ(t, r, x):
    R = r.randint(2, 9)
    return dict(worked=(f"Circle with radius {R}", [f"Diameter = 2 × {R} = {2 * R}.", f"Circumference = π × {2 * R} ≈ {3.14 * 2 * R:.1f}.", f"Area = π × {R}² ≈ 3.14 × {R * R} ≈ {3.14 * R * R:.1f}."]), say=f"For example, a circle of radius {R} has area about {3.14 * R * R:.1f}.",
                applied=[spot(f"the diameter of a circle with radius {R}", 2 * R, [R / 2, R * R], "The diameter goes all the way across.")], vis=dict(a=min(R, 5)))
def t_prob(t, r, x):
    kind = "coin" if re.search(r"coin|head|tail", x, re.I) else "spinner" if re.search(r"spinner", x, re.I) else "dice"
    n = {"coin": 2, "dice": 6, "spinner": 4}[kind]; tr = r.choice([60, 120, 300])
    return dict(vis=dict(kind=kind), worked=(f"A fair {kind}, {tr} trials", [f"There are {n} equally likely outcomes.", f"P(one outcome) = 1/{n}.", f"Expected count of one outcome in {tr} trials = {tr} × 1/{n} = {tr // n}.", "Real results wobble around this; more trials wobble less."]),
                say=f"For example, a fair {kind} gives each outcome a chance of 1/{n}.", applied=[spot(f"how many times to expect one outcome in {tr} throws of a fair {kind}", tr // n, [tr // 2 if n != 2 else tr // 4, n], f"Multiply the trials by 1/{n}.")])
def t_prob2(t, r, x):
    s = r.randint(3, 11); ways = 6 - abs(7 - s)
    return dict(worked=(f"P(two dice total {s})", ["There are 6 × 6 = 36 equally likely pairs.", f"Pairs that make {s}: " + ", ".join(f"{i}+{s - i}" for i in range(1, 7) if 1 <= s - i <= 6) + ".", f"That is {ways} pairs, so P = {ways}/36."]),
                say=f"For example, two dice total {s} in {ways} of 36 ways.", applied=[spot(f"the number of ways two dice can total {s}", ways, [ways + 1, s - 1 if s - 1 != ways else s], "List the pairs in order.")])
def t_stat(t, r, x):
    v = sorted(r.randint(2, 18) for _ in range(5)); mean = sum(v) / 5
    return dict(vis=dict(vals=v + [r.randint(2, 18)], target=round(mean)), worked=("Data: " + ", ".join(map(str, v)), [f"Mean: ({' + '.join(map(str, v))}) ÷ 5 = {sum(v)} ÷ 5 = {mean:g}.", f"Median: the middle value in order is {v[2]}.", f"Range: {v[-1]} − {v[0]} = {v[-1] - v[0]}."]),
                say=f"For example, for {', '.join(map(str, v))} the median is {v[2]}.", applied=[spot(f"the mean of {', '.join(map(str, v))}", mean, [v[2] if v[2] != mean else v[2] + 1, sum(v)], "Add them all, then divide by how many.")])
def t_count(t, r, x):
    n = min(within(x, 10), 20); k = r.randint(3, min(n, 10))
    return dict(vis=dict(n=k), worked=(f"Count {k} counters", ["Touch each counter once.", "Say one number for each: " + ", ".join(str(i) for i in range(1, k + 1)) + ".", f"The last number says how many: {k}."]), say=f"For example, counting {k} things ends on {k}.", applied=[])
def t_meas(t, r, x):
    pairs = [("cm", "mm", 10), ("m", "cm", 100), ("kg", "g", 1000), ("l", "ml", 1000), ("km", "m", 1000)]
    big, small, f = next((p for p in pairs if re.search(rf"\b{p[1]}\b|\b{p[0]}\b", x)), r.choice(pairs)); v = r.randint(2, 9) + r.choice([0, .5])
    return dict(vis=dict(start=3, target=round(v % 10, 1)), worked=(f"{fmt(v)} {big} in {small}", [f"1 {big} = {f} {small}.", f"{fmt(v)} × {f} = {fmt(v * f)}.", f"So {fmt(v)} {big} = {fmt(v * f)} {small}."]), say=f"For example, {fmt(v)} {big} = {fmt(v * f)} {small}.",
                applied=[spot(f"{fmt(v)} {big} in {small}", v * f, [v * f / 10, v * f * 10], f"1 {big} is {f} {small}.")])
def t_fn(t, r, x):
    a, b = r.randint(2, 5), r.randint(-4, 5); k = r.randint(1, 4)
    return dict(vis=dict(targets=[[0, b], [2, 2 * a + b]]), worked=(f"f(x) = {a}x {'+' if b >= 0 else '−'} {abs(b)}", [f"f({k}) means put x = {k}.", f"{a} × {k} = {a * k}.", f"{a * k} {'+' if b >= 0 else '−'} {abs(b)} = {a * k + b}, so f({k}) = {a * k + b}."]),
                say=f"For example, if f(x) = {a}x {'+' if b >= 0 else '−'} {abs(b)} then f({k}) = {a * k + b}.", applied=[spot(f"f({k + 1}) for f(x) = {a}x {'+' if b >= 0 else '−'} {abs(b)}", a * (k + 1) + b, [a + k + 1 + b, a * (k + 1 + b)], "Multiply first, then add.")])
def t_diff(t, r, x):
    n, c = r.randint(2, 5), r.randint(2, 6); xv = r.randint(1, 3)
    return dict(worked=(f"Differentiate {c}x^{n}", [f"Multiply by the power: {c} × {n} = {c * n}.", f"Lower the power by 1: x^{n - 1}.", f"dy/dx = {c * n}x^{n - 1}." if n > 2 else f"dy/dx = {c * n}x.", f"At x = {xv} the gradient is {c * n * xv ** (n - 1)}."]),
                say=f"For example, the derivative of {c}x^{n} is {c * n}x^{n - 1}.", applied=[spot(f"the gradient of y = {c}x^{n} at x = {xv}", c * n * xv ** (n - 1), [c * xv ** n, c * n * xv ** n], "Differentiate first, then substitute.")])
def t_integ(t, r, x):
    b = r.randint(2, 4); return dict(vis=dict(b=b) if b <= 2 else {}, worked=(f"∫ from 0 to {b} of x² dx", ["The antiderivative of x² is x³/3.", f"At {b}: {b ** 3}/3. At 0: 0.", f"Area = {b ** 3}/3 ≈ {b ** 3 / 3:.2f}."]), say=None,
                applied=[spot(f"∫ from 0 to {b} of 2x dx", b * b, [2 * b, b * b * 2], "The antiderivative of 2x is x².")])
def t_expo(t, r, x):
    m, n = r.randint(2, 5), r.randint(2, 4); return dict(vis=dict(m=m, n=n), worked=(f"a^{m} × a^{n}", [f"a^{m} is {m} a's multiplied; a^{n} is {n} more.", f"Together: {m} + {n} = {m + n} a's.", f"So a^{m} × a^{n} = a^{m + n}."]), say=f"For example, 2^{m} × 2^{n} = 2^{m + n} = {2 ** (m + n)}.",
                applied=[spot(f"2^{m} × 2^{n}", 2 ** (m + n), [2 ** (m * n), 4 ** (m + n) if m + n < 6 else 2 ** (m + n - 1)], "Add the powers.")])
def t_vec(t, r, x):
    a, b = r.choice([(3, 4), (6, 8), (5, 12)]); return dict(vis=dict(a=[a, 0], b=[0, b]), worked=(f"Walk {a} east then {b} north", [f"Displacement vector = ({a}, {b}).", f"Magnitude = √({a}² + {b}²) = √{a * a + b * b} = {int((a * a + b * b) ** .5)}.", f"Distance walked = {a} + {b} = {a + b}."]), say=None,
                applied=[spot(f"the size of the displacement after {a} east and {b} north", int((a * a + b * b) ** .5), [a + b, a * b], "Use Pythagoras on the vector.")])
T = {"multiplication-written": t_mulw, "division-written": t_divw, "multiplication": t_mul, "add-subtract": t_addsub, "place-value": t_pv, "percent": t_pct, "fractions": t_frac, "ratio": t_ratio, "negatives": t_neg,
     "coordinates": t_coord, "linear-graphs": t_lin, "functions": t_fn, "quadratic": t_quad, "sequences": t_seq, "equations": t_eq, "expressions": t_expr, "pythagoras": t_pyth, "angles": t_ang, "area": t_area,
     "volume": t_vol, "circles": t_circ, "probability": t_prob, "probability-two": t_prob2, "statistics": t_stat, "inquiry": t_stat, "counting": t_count, "measurement": t_meas, "gas": t_gas, "matter": t_gas,
     **SCI_T, "states": t_states, "acids": t_acid, "forces": t_force, "energy": t_force, "waves": t_wave, "differentiation": t_diff, "calculus": t_diff, "integration": t_integ, "exponential": t_expo, "vectors": t_vec}
def tune(a, t, rng):
    f = T.get(a["name"]); x = t["name"] + " " + t["description"]
    if not f: return {}
    try: out = f(t, rng, x)
    except (ValueError, ZeroDivisionError, IndexError): return {}
    out["applied"] = [i for i in out.get("applied", []) if i]; return out
