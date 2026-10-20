"""Science tuners (see tune.py)."""
import re
from items import mc
from tune_num import fmt, spot
def t_gas(t, r, x):
    T = r.choice([200, 250, 350, 400]); return dict(vis=dict(temp=T, n=r.choice([20, 30, 40])), worked=(f"Heating a gas from 300 K to {T + 200} K", ["Hotter particles move faster.", "They hit the walls harder and more often.", f"At fixed volume, pressure rises by about {T + 200}/300 ≈ {(T + 200) / 300:.1f} times."]),
                say=None, applied=[])
STATES = [("water", 0, 100), ("chocolate", 34, 160), ("wax", 60, 370), ("iron", 1538, 2862), ("butter", 32, 150), ("salt", 801, 1465)]
def t_states(t, r, x):
    s = next((s for s in STATES if re.search(s[0], x, re.I)), STATES[0]); n, mp, bp = s
    return dict(vis=dict(name=n, mp=mp, bp=bp, min=mp - 20, max=bp + 10, temp=mp - 5), worked=(f"Heating {n}", [f"Below {mp} °C, {n} is a solid: particles vibrate in place.", f"At {mp} °C it melts: particles start to slide past each other.", f"At {bp} °C it boils: particles escape as a gas."]),
                say=f"For example, {n} melts at {mp} °C.", applied=[mc(f"{n.capitalize()} melts at {mp} °C and boils at {bp} °C. What state is it at {(mp + bp) // 2} °C?", ["Liquid", "Solid", "Gas"], "Is it between the melting and boiling points?", f"{(mp + bp) // 2} °C is between {mp} and {bp} °C, so it is a liquid.")])
def t_acid(t, r, x):
    return dict(vis=dict(acid=1, indicator=True), applied=[mc("A metal is dropped into acid and fizzes. A lit splint gives a squeaky pop. Which gas formed?", ["Hydrogen", "Carbon dioxide", "Oxygen"], "Which gas pops?", "Hydrogen burns with a squeaky pop."),
                mc("Universal indicator turns purple in a solution. What is its pH most likely to be?", ["13", "7", "2"], "Purple is at the alkali end.", "Purple means a strong alkali, around pH 13.")])
def t_force(t, r, x):
    m = r.choice([2, 4, 5, 10, 20]); f = r.choice([10, 20, 30, 40])
    if re.search(r"weight|gravity|falling|mass vs", x, re.I):
        g = 10; return dict(vis=dict(m=m), worked=(f"Weight of a {m} kg bag", ["Weight = mass × gravitational field strength.", f"On Earth g ≈ {g} N/kg.", f"W = {m} × {g} = {m * g} N.", f"On the Moon (g ≈ 1.6 N/kg) it would weigh {m * 1.6:g} N, but its mass is still {m} kg."]),
                            say=f"For example, a {m} kg mass weighs about {m * g} N on Earth.", applied=[spot(f"the weight of a {m} kg mass on Earth (g = 10 N/kg)", m * g, [m, m / g], "W = m × g.")])
    if re.search(r"speed|distance|velocity|graph", x, re.I):
        d, tt = r.choice([(100, 20), (60, 12), (300, 50), (400, 80)]); return dict(worked=(f"{d} m in {tt} s", ["Speed = distance ÷ time.", f"{d} ÷ {tt} = {fmt(d / tt)} m/s.", "On a distance–time graph this is the gradient of the line."]),
                            say=f"For example, {d} m in {tt} s is {fmt(d / tt)} m/s.", applied=[spot(f"the speed for {d} m in {tt} s", d / tt, [d * tt, tt / d], "Distance ÷ time.")])
    if re.search(r"resultant|balanced|unbalanced", x, re.I):
        a, b = r.randint(5, 30), r.randint(5, 30); return dict(vis=dict(f=max(a, b)), worked=(f"{a} N right and {b} N left", ["Forces in opposite directions subtract.", f"{a} − {b} = {a - b} N.", "Balanced (0 N): no change in motion." if a == b else f"Resultant {abs(a - b)} N to the {'right' if a > b else 'left'}: the object speeds up that way."]),
                            say=f"For example, {a} N right and {b} N left give {abs(a - b)} N overall.", applied=[spot(f"the resultant of {a} N right and {b} N left", abs(a - b), [a + b, (a + b) / 2], "Opposite forces subtract.")])
    if re.search(r"friction|air resistance|drag", x, re.I):
        mu = r.choice([0.1, 0.2, 0.3, 0.5]); return dict(vis=dict(mu=mu, f=f, m=m), worked=(f"Friction on a {m} kg block", ["Friction opposes motion.", f"Weight = {m} × 10 = {m * 10} N.", f"Friction ≈ {mu} × {m * 10} = {fmt(mu * m * 10)} N.", f"Push {f} N: resultant = {fmt(f - mu * m * 10)} N."]),
                            say=f"For example, friction on a {m} kg block can be about {fmt(mu * m * 10)} N.", applied=[spot(f"the resultant when you push a block with {f} N against {fmt(mu * m * 10)} N of friction", f - mu * m * 10, [f + mu * m * 10, f], "Friction acts the other way, so subtract.")])
    if re.search(r"momentum", x, re.I):
        v = r.randint(2, 9); return dict(worked=(f"{m} kg at {v} m/s", ["Momentum = mass × velocity.", f"p = {m} × {v} = {m * v} kg m/s."]), say=None, applied=[spot(f"the momentum of {m} kg moving at {v} m/s", m * v, [m + v, m / v], "p = m × v.")])
    a = f / m
    return dict(vis=dict(f=f, m=m), worked=(f"Push {f} N on a {m} kg cart", ["F = m × a, so a = F ÷ m.", f"a = {f} ÷ {m} = {fmt(a)} m/s².", "Friction lowers the resultant force, so the real acceleration is smaller."]),
                say=f"For example, {f} N on {m} kg gives {fmt(a)} m/s².", applied=[spot(f"the acceleration of a {m} kg cart pushed with {f} N (no friction)", a, [f * m, m / f], "a = F ÷ m.")])
def t_wave(t, r, x):
    if re.search(r"reflect|mirror|ray", x, re.I):
        i = r.choice([20, 30, 35, 40, 50, 60]); return dict(worked=(f"A ray hits a mirror at {i}° to the normal", ["Draw the normal at 90° to the mirror.", f"Angle of incidence = {i}°.", f"Angle of reflection = angle of incidence = {i}°."]), say=f"For example, a ray at {i}° reflects at {i}°.",
                            applied=[spot(f"the angle of reflection for a ray at {i}° to the normal", i, [90 - i, 180 - i], "Angles are measured from the normal and are equal.")])
    if re.search(r"pitch|loud|sound|hear|vibrat", x, re.I):
        f = r.choice([200, 440, 880, 1000]); return dict(vis=dict(f=2), worked=(f"A {f} Hz note", [f"{f} Hz means {f} vibrations each second.", f"Doubling to {2 * f} Hz gives a higher pitch (one octave up).", "A bigger amplitude makes it louder, not higher."]), say=f"For example, {2 * f} Hz sounds higher than {f} Hz.",
                            applied=[mc(f"A note changes from {f} Hz to {2 * f} Hz. What changes?", ["It sounds higher", "It sounds louder", "It sounds lower"], "Frequency sets pitch.", "Higher frequency means higher pitch.")])
    f, lam = r.randint(2, 10), r.choice([0.5, 1, 2, 3]); v = f * lam
    return dict(worked=(f"A wave with frequency {f} Hz and wavelength {fmt(lam)} m", ["Wave speed = frequency × wavelength.", f"v = {f} × {fmt(lam)} = {fmt(v)} m/s."]), say=None,
                applied=[spot(f"the speed of a wave with frequency {f} Hz and wavelength {fmt(lam)} m", v, [f / lam, f + lam], "v = f × λ.")])
