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
    if re.search(r"spring|extension|elastic|hooke", x, re.I):
        k, e = r.choice([20, 25, 40, 50]), r.choice([0.1, 0.2, 0.4]); return dict(worked=(f"A spring with k = {k} N/m stretched {e} m", ["Force = spring constant × extension (F = ke).", f"F = {k} × {e} = {fmt(k * e)} N.", f"Elastic energy stored = ½ × {k} × {e}² = {fmt(0.5 * k * e * e)} J."]), say=f"For example, a {k} N/m spring stretched {e} m needs {fmt(k * e)} N.", applied=[spot(f"the force to stretch a {k} N/m spring by {e} m", k * e, [k / e, k + e], "F = k × e.")])
    if re.search(r"pressure", x, re.I):
        h = r.choice([2, 5, 10, 20]); return dict(worked=(f"Pressure {h} m under water", ["p = ρ × g × h.", "Water: ρ = 1000 kg/m³, g = 10 N/kg.", f"p = 1000 × 10 × {h} = {1000 * 10 * h} Pa.", "Deeper means more water above pushing down, so more pressure."]), say=f"For example, {h} m down in water the extra pressure is {fmt(10000 * h)} Pa.", applied=[spot(f"the water pressure {h} m deep (ρ = 1000, g = 10)", 10000 * h, [1000 * h, 10 * h], "Multiply density, g and depth.")])
    if re.search(r"gravitation|orbit|satellite|kepler", x, re.I):
        return dict(worked=("Doubling the distance between two masses", ["Gravitational force F = Gm₁m₂/r².", "Double r: r² becomes 4 times bigger.", "So the force becomes a quarter as big."]), say=None, applied=[mc("Two moons are pulled together with force F. If the distance between them triples, what is the force?", ["F/9", "F/3", "3F"], "Inverse square.", "Force ∝ 1/r², so 1/3² = 1/9.")])
    if re.search(r"projectile|thrown|launched", x, re.I):
        tt = r.choice([1, 2, 3]); return dict(worked=(f"A ball rolls off a table and lands after {tt} s", ["Horizontal and vertical motion are independent.", f"Vertical: it falls ½ × 10 × {tt}² = {5 * tt * tt} m.", "Horizontal speed stays the same (no air resistance).", "So the path is a curve (a parabola)."]), say=None, applied=[spot(f"how far a ball falls in {tt} s from rest (g = 10)", 5 * tt * tt, [10 * tt, 10 * tt * tt], "s = ½gt².")])
    if re.search(r"circular|centripetal", x, re.I):
        v, rr = r.choice([2, 4, 6]), r.choice([1, 2, 4]); return dict(worked=(f"{m} kg moving at {v} m/s in a circle of radius {rr} m", ["The velocity keeps changing direction, so it is accelerating.", f"a = v²/r = {v * v}/{rr} = {fmt(v * v / rr)} m/s² towards the centre.", f"F = m × a = {m} × {fmt(v * v / rr)} = {fmt(m * v * v / rr)} N."]), say=None, applied=[spot(f"the centripetal acceleration at {v} m/s on a {rr} m circle", v * v / rr, [v / rr, v * rr], "a = v²/r.")])
    if re.search(r"slope|incline|normal", x, re.I):
        return dict(worked=(f"A {m} kg box resting on a slope", [f"Its weight is {m * 10} N, straight down.", "The slope pushes back at right angles: the normal force.", "Friction acts up the slope and stops it sliding.", "These three forces are balanced, so the box stays still."]), say=None, applied=[mc("A box sits still on a ramp. What stops it sliding down?", ["Friction up the slope", "The normal force pulling down", "Its weight pushing up"], "It isn't moving.", "Friction balances the part of the weight along the slope.")])
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
CHAINS = [(r"Ocean|whale|dolphin|seal|shark|coral|deep", [["Plankton", "producer"], ["Small fish", "herbivore"], ["Seal", "carnivore"], ["Orca", "top predator"]]),
          (r"Polar|Arctic|Antarctic|penguin|bear", [["Algae", "producer"], ["Krill", "herbivore"], ["Penguin", "carnivore"], ["Leopard seal", "top predator"]]),
          (r"Rainforest", [["Leaves", "producer"], ["Caterpillar", "herbivore"], ["Frog", "carnivore"], ["Snake", "top predator"]]),
          (r"Insect|Minibeast", [["Rose leaf", "producer"], ["Aphid", "herbivore"], ["Ladybird", "carnivore"], ["Blackbird", "top predator"]])]
ECO = [(r"Ocean", ("Fish", "Seals", "plankton")), (r"Polar|Arctic|Antarctic|penguin", ("Penguins", "Leopard seals", "krill")), (r"Rainforest", ("Insects", "Frogs", "leaves")), (r"Insect|Minibeast", ("Aphids", "Ladybirds", "rose leaves"))]
def _pick(L, x, d):
    return next((v for k, v in L if re.search(k, x, re.I)), d)
def t_chain(t, r, x): return dict(vis=dict(chain=_pick(CHAINS, t["domain"] + " " + x, [["Grass", "producer"], ["Rabbit", "herbivore"], ["Fox", "carnivore"]])))
def t_hab(t, r, x):
    p = _pick(ECO, t["domain"] + " " + x, None); return dict(vis=dict(prey=p[0], pred=p[1], food=p[2])) if p else {}
def t_plate(t, r, x): return dict(vis=dict(mode="slide" if re.search(r"earthquake|seismic|fault", x, re.I) and not re.search(r"volcan", x, re.I) else "together"))
def t_body(t, r, x): return dict(vis=dict(system=_pick([(r"breath|lung|respir", "respiratory"), (r"heart|blood|circulat", "circulatory"), (r"skeleton|bone|skull", "skeletal"), (r"brain|nerve|sense", "nervous")], x, "digestive")))
def t_cell(t, r, x): return dict(vis=dict(kind="plant" if re.search(r"plant|photosynth|leaf|chloroplast", x, re.I) else "animal"))
SCI_T = {"foodchain": t_chain, "habitats": t_hab, "plates": t_plate, "body": t_body, "cells": t_cell}
