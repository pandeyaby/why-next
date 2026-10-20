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
    except Exception as ex:  # noqa: BLE001
        errs.append(f"{t}: {ex}")
    return errs
