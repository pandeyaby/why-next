"""Content checks for the "visual" field of a lesson (imported by validate_lessons.py)."""
import re

I, N, S, B, L = int, (int, float), str, bool, list
OPTS = {
    "counters": {"mode": S, "n": I, "a": I, "b": I}, "tenframe": {"a": I, "b": I, "op": S},
    "array": {"rows": I, "cols": I, "split": I, "label": S}, "share": {"total": I, "groups": I, "show": I},
    "fracbar": {"d": I, "shade": I, "compare": I, "compareShade": I, "pie": B}, "numline": {"d": I, "max": I, "start": I},
    "balance": {"mode": S, "a": I, "b": I, "c": I, "left": L, "right": I}, "bidmas": {"expr": S},
    "longmul": {"a": I, "b": I}, "longdiv": {"a": I, "b": I},
    "plot": {"mode": S, "f": S, "a": N, "xr": L, "yr": L, "p": L, "q": L, "h": N, "normal": B, "equal": B, "label": S, "step": N, "start": N},
    "rate": {"f": S, "a": N, "b": N, "xr": L, "yr": L, "ux": S, "uy": S, "step": N}, "power": {"n": I},
    "particles": {"mp": N, "bp": N, "temp": N, "name": S, "mix": B, "density": B, "min": N, "max": N},
    "atom": {"p": I, "n": I, "e": I}, "ptable": {"highlight": S, "z": I},
    "balancer": {"left": L, "right": L, "lock": B, "names": dict, "masses": B},
    "area": {"mode": S, "f": S, "F": S, "a": N, "b": N, "n": I, "method": S, "xr": L, "yr": L, "ar": L, "step": N, "start": N, "c": I, "at": N, "point": L, "label": S, "ux": S, "uy": S, "tu": S},
    "sorter": {"bins": L, "items": L}, "phscale": {"ph": I}, "energy": {"dh": I, "ea": I, "reactants": S, "products": S},
    "placevalue": {"n": N}, "percent": {"p": I, "of": N, "mode": S}, "coords": {"max": I, "x": I, "y": I, "target": L}, "wholes": {"a": I, "b": I}, "thermo": {"min": I, "max": I, "t": N, "step": N, "from": N},
    "journey": {"pts": L, "tu": S, "du": S, "start": N, "step": N},
    "expo": {"mode": S, "base": I, "n": I, "m": I, "k": I, "a": I, "op": S}, "roots": {"k": I, "p": I, "xr": L, "yr": L},
    "grid": {"a": L, "b": L}, "symbols": {"a": I, "b": I, "op": S}, "sealed": {"left": L, "right": L, "gas": L, "names": dict},
    "circuit": {"items": L}, "light": {"items": L}, "vlt": {"graphs": L, "x": N}, "polyterms": {"terms": L},
    "tiles": {"a": L, "b": L, "op": S}, "states": {"items": L}, "separate": {"mix": L}, "matlab": {"materials": L, "job": L},
    "objects": {"objects": L}, "squares": {"n": I}, "slopes": {"m": N, "start": N}, "vectors": {"a": L, "b": L},
    "problab": {"kind": S, "labels": L, "p": L}, "statlab": {"vals": L, "max": I, "target": N}, "numzoom": {"neg": B, "start": N, "target": N},
    "graphlab": {"f": S, "a": N, "b": N, "c": N, "xr": L, "yr": L, "equal": B, "targets": L}, "geolab": {"pts": L, "grid": I, "area": N}, "matrixlab": {"m": L},
    "gaslab": {"n": I, "temp": N, "vol": N}, "reactlab": {"acid": I, "indicator": B}, "wavelab": {"a": N, "f": N, "v": N, "target": L}, "platelab": {"mode": S, "speed": N, "years": N}, "celllab": {"kind": S}, "cyclelab": {"heat": N, "cold": N}, "chainlab": {"chain": L}, "flagderiv": {"step": I}, "flagplace": {"step": I}, "flagfrac": {"step": I}, "flagneg": {"step": I}, "flageq": {"step": I}, "flagline": {"step": I}, "flagarea": {"step": I}, "flagatom": {"step": I}, "flagacid": {"step": I}, "flagstate": {"step": I}, "flagprob": {"step": I}, "flagpyth": {"step": I}, "flagenergy": {"step": I}, "flagcirc": {"step": I}, "flagwave": {"step": I}, "flagnuc": {"step": I}, "flagshell": {"step": I}, "flagcov": {"step": I}, "flagunit": {"step": I}, "flagwread": {"step": I}, "flagsub": {"step": I}, "flagfact": {"step": I}, "flagexp": {"step": I}, "flagequiv": {"step": I}, "flagcarbon": {"step": I}, "flaghydro": {"step": I}, "flagformula": {"step": I}, "flagalk": {"step": I}, "flaghomo": {"step": I}, "flagptab": {"step": I}, "flagfgroup": {"step": I}, "flagalkene": {"step": I}, "flagafrac": {"step": I}, "flagtan": {"step": I}, "bodylab": {"system": S}, "ecolab": {"prey": S, "pred": S, "food": S, "b": N, "k": N, "d": N, "e": N, "n0": N, "p0": N}, "forcelab": {"f": N, "m": N, "mu": N, "zone": L},
    "formula": {"name": S, "expr": S, "vars": dict, "pic": S, "what": S, "unit": S},
}
SAFE_F = re.compile(r"^[x0-9+\-*/(). ]+$")
SUB = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")

def formula(f):
    f = f.translate(SUB); i = 0
    def grp():
        nonlocal i; m = {}
        while i < len(f) and f[i] != ")":
            if f[i] == "(":
                i += 1; sub = grp(); i += 1
            else:
                s = re.match(r"[A-Z][a-z]?", f[i:])
                if not s: raise ValueError(f"bad formula {f}")
                i += len(s.group()); sub = {s.group(): 1}
            d = re.match(r"\d+", f[i:]); k = int(d.group()) if d else 1
            if d: i += len(d.group())
            for x, n in sub.items(): m[x] = m.get(x, 0) + n * k
        return m
    return grp()

def check(v):
    """Return a list of problems with one lesson's visual spec."""
    t, o, errs = v["type"], v["opts"], []
    spec = OPTS[t]
    for k, val in o.items():
        if k not in spec: errs.append(f"{t}: unknown option {k}")
        elif not isinstance(val, spec[k]) or (spec[k] in (I, N) and isinstance(val, bool)): errs.append(f"{t}: option {k} has the wrong type")
    if errs: return errs
    try:
        if t == "balance" and o.get("mode", "solve") == "solve":
            a, b, c = o["a"], o["b"], o["c"]
            if not (a >= 1 and 0 <= b < c and (c - b) % a == 0): errs.append("balance: need a ≥ 1, 0 ≤ b < c and a whole-number solution")
        if t == "balance" and o.get("mode") == "equal" and not o.get("left"): errs.append("balance equal: needs left parts")
        if t == "bidmas":
            e = o["expr"]
            if not re.fullmatch(r"[\d\s()\[\]+\-−×÷*/.]+", e): errs.append("bidmas: expression has characters the stepper can't handle")
            else: eval(e.replace("−", "-").replace("×", "*").replace("÷", "/").replace("[", "(").replace("]", ")"), {"__builtins__": {}})
        if t in ("plot", "rate") and "f" in o:
            if not SAFE_F.match(o["f"]): errs.append(f"{t}: f must be a simple expression in x")
            else:
                f = eval("lambda x: " + o["f"], {"__builtins__": {}})
                for x in (o.get("a", 1) + 0.37, o.get("b", 2) + 0.21): f(x)
        if t == "plot" and o.get("mode", "tangent") != "line" and "f" not in o: errs.append("plot: needs f")
        if t == "longdiv" and not (o["b"] > 1 and o["a"] > o["b"]): errs.append("longdiv: need a > b > 1")
        if t == "longmul" and not (o["a"] > 9 and o["b"] > 9): errs.append("longmul: both numbers need 2+ digits")
        if t == "balancer":
            sides = [[(formula(f), k) for f, k in o[s]] for s in ("left", "right")]
            tally = lambda sd: {x: sum(m.get(x, 0) * k for m, k in sd) for m0, _ in sd for x in m0}
            if o.get("lock") and tally(sides[0]) != tally(sides[1]): errs.append("balancer: a locked equation must be balanced")
        if t == "fracbar" and not (1 <= o.get("d", 4) <= 12 and o.get("shade", 1) <= o.get("d", 4)): errs.append("fracbar: need 1 ≤ shade ≤ d ≤ 12")
        if t == "particles" and not o.get("mp", 0) < o.get("bp", 100): errs.append("particles: need mp < bp")
        if t == "atom" and not all(0 <= o.get(k, 0) <= 20 for k in "pne"): errs.append("atom: counts must be 0-20")
        if t == "area":
            m = o.get("mode", "riemann")
            if m not in ("riemann", "definite", "velocity", "ftc", "family"): errs.append(f"area: unknown mode {m}")
            for k in ("f", "F"):
                if k in o:
                    if not SAFE_F.match(o[k]): errs.append(f"area: {k} must be a simple expression in x")
                    else:
                        g = eval("lambda x: " + o[k], {"__builtins__": {}})
                        for i in range(21): g(o.get("xr", [0, 4])[0] + i * (o.get("xr", [0, 4])[1] - o.get("xr", [0, 4])[0]) / 20 + 1e-3)
            if ("F" if m == "family" else "f") not in o: errs.append(f"area {m}: needs {'F' if m == 'family' else 'f'}")
            if m == "riemann" and not (o.get("a", 0) < o.get("b", 2) and 1 <= o.get("n", 4) <= 40 and o.get("method", "left") in ("left", "right", "mid", "trap")): errs.append("area riemann: need a < b, 1 ≤ n ≤ 40 and a known method")
        if t == "sorter":
            bins, items = o["bins"], o["items"]
            if not (2 <= len(bins) <= 4 and all(isinstance(x, str) for x in bins)): errs.append("sorter: need 2-4 bin names")
            if not (4 <= len(items) <= 10 and all(len(i) == 2 and isinstance(i[0], str) and isinstance(i[1], int) and 0 <= i[1] < len(bins) for i in items)): errs.append("sorter: need 4-10 [label, bin] items")
            elif {i[1] for i in items} != set(range(len(bins))): errs.append("sorter: every bin needs at least one item")
            elif len({i[0] for i in items}) != len(items): errs.append("sorter: duplicate cards")
        if t == "phscale" and not 0 <= o.get("ph", 7) <= 14: errs.append("phscale: ph 0-14")
        if t == "energy" and not (-80 <= o.get("dh", -40) <= 80 and o.get("dh", -40) % 10 == 0): errs.append("energy: dh is a multiple of 10 in -80..80")
        if t == "placevalue" and not (abs(o["n"] * 1000 - round(o["n"] * 1000)) < 1e-9 and 0 < o["n"] < 1e5): errs.append("placevalue: n needs at most 3 decimal places and < 100000")
        if t == "percent" and not 0 <= o.get("p", 25) <= 100: errs.append("percent: p 0-100")
        if t == "thermo" and not o.get("min", -20) <= o.get("t", 20) <= o.get("max", 50): errs.append("thermo: need min ≤ t ≤ max")
        if t == "journey":
            pts = o["pts"]
            if not (pts[0][0] == 0 and all(b[0] > a[0] for a, b in zip(pts, pts[1:])) and all(p[1] >= 0 for p in pts)): errs.append("journey: times must start at 0 and increase; distances ≥ 0")
        if t == "formula":
            e, V = o["expr"], o["vars"]
            if not re.fullmatch(r"[a-z\d\s()+\-−×÷]+", e): errs.append("formula: expression has characters the stepper can't handle")
            elif set(re.findall(r"[a-z]", e)) != set(V): errs.append("formula: letters and vars differ")
            else:
                for k, r in V.items():
                    if not (len(r) == 3 and r[0] <= r[2] <= r[1]): errs.append(f"formula: var {k} needs [min, max, start]")
                for pick in (0, 1, 2):
                    env = {k: r[pick] for k, r in V.items()}
                    eval(re.sub(r"[a-z]", lambda m: str(env[m.group()]), e).replace("−", "-").replace("×", "*").replace("÷", "/"), {"__builtins__": {}})
        if t == "expo" and o.get("mode", "laws") not in ("laws", "ladder", "root"): errs.append("expo: unknown mode")
        if t == "expo" and o.get("op", "mul") not in ("mul", "div", "pow"): errs.append("expo: op is mul, div or pow")
        if t == "roots" and o.get("k", 2) not in (2, 3): errs.append("roots: k is 2 or 3")
        if t == "grid" and not all(isinstance(x, int) for x in o["a"] + o["b"]): errs.append("grid: coefficients are whole numbers")
        if t == "sealed":
            sides = [[(formula(f), k) for f, k in o[x]] for x in ("left", "right")]
            tl = lambda sd: {e: sum(m.get(e, 0) * k for m, k in sd) for m0, _ in sd for e in m0}
            if tl(sides[0]) != tl(sides[1]): errs.append("sealed: the equation must be balanced")
            if sum(sum(m.values()) * k for m, k in sides[0]) > 24: errs.append("sealed: at most 24 atoms")
            if not set(o.get("gas", [])) <= {f for f, _ in o["left"] + o["right"]}: errs.append("sealed: gas must be one of the formulas")
        if t in ("circuit", "light") and not (4 <= len(o["items"]) <= 10 and all(len(i) == 2 and isinstance(i[0], str) and isinstance(i[1], int) and 0 <= i[1] <= (1 if t == "circuit" else 2) for i in o["items"])): errs.append(f"{t}: need 4-10 [name, class] items")
        if t == "symbols" and not (0 <= o.get("b", 2) <= o.get("a", 7) <= 10 and o.get("op", "-") in "+-"): errs.append("symbols: need 0 ≤ b ≤ a ≤ 10 and op + or -")
        if t == "vlt" and not set(o.get("graphs", [])) <= {"line", "parab", "circle", "side", "cubic"}: errs.append("vlt: unknown graph")
        if t == "polyterms" and not (1 <= len(o.get("terms", [[1, 0]])) <= 5 and all(len(x) == 2 and 0 <= x[1] <= 5 and x[0] for x in o.get("terms", [[1, 0]]))): errs.append("polyterms: 1-5 [coef, power] terms")
        if t == "tiles" and not all(len(o.get(k, [0, 0, 0])) == 3 and all(abs(v) <= 6 for v in o.get(k, [0, 0, 0])) for k in "ab"): errs.append("tiles: a and b are [x², x, 1] coefficients up to 6")
        if t == "states" and not all(len(i) == 2 and i[1] in (0, 1, 2) for i in o["items"]): errs.append("states: items are [name, 0 solid | 1 liquid | 2 gas]")
        if t == "separate" and not all(len(m) == 2 and m[1] in ("sieve", "filter", "evaporate", "magnet", "none") for m in o["mix"]): errs.append("separate: mix items are [name, method]")
        if t == "matlab" and not all(len(m) >= 2 and isinstance(m[1], dict) and set(m[1]) <= {"bend", "water", "light", "scratch", "shine"} for m in o["materials"]): errs.append("matlab: materials are [name, {test: bool}, colour]")
        if t == "slopes" and o.get("start", 1) not in (-3, -2, -1, -.5, -1/3, 0, 1/3, .5, 1, 2, 3): errs.append("slopes: start must be one of the slider slopes")
    except Exception as ex:  # noqa: BLE001
        errs.append(f"{t}: {ex}")
    return errs
