#!/usr/bin/env bash
# Model-check verify/WhyNextState.tla with TLC. Needs java + tla2tools.jar
# (TLA2TOOLS=/path/to/tla2tools.jar; default /home/box/tla/tla2tools.jar).
# 1) FIXED=TRUE must pass every invariant.  2) FIXED=FALSE (the code before the
# fix) must break each storage invariant: proves the model can see the bugs.
set -u; cd "$(dirname "$0")"; J=${TLA2TOOLS:-/home/box/tla/tla2tools.jar}; T=$(mktemp -d)
tlc(){ java -XX:+UseParallelGC -cp "$J" tlc2.TLC -metadir "$T/m$RANDOM" -config "$1" -workers auto -deadlock -noGenerateSpecTE WhyNextState.tla 2>&1; }
cfg(){ printf 'CONSTANTS\n Reels = {r1,r2,r3}\n FIXED = %s\n MaxScore = 2\nSPECIFICATION Spec\nINVARIANTS %s\n' "$1" "$2" > "$T/c.cfg"; echo "$T/c.cfg"; }
fail=0
out=$(tlc "$(cfg TRUE 'NoCrash NofN BestNumeric BestMonotonic NoRegression PractisedShows')")
if grep -q "No error has been found" <<<"$out"; then echo "ok   fixed model: all invariants hold ($(grep -o "[0-9]* distinct states found" <<<"$out" | tail -1))"; else echo "FAIL fixed model"; echo "$out" | sed -n '/Error/,$p' | head -60; fail=1; fi
for inv in NoCrash BestNumeric PractisedShows; do
  out=$(tlc "$(cfg FALSE "$inv")")
  if grep -q "Invariant $inv is violated" <<<"$out"; then echo "ok   old code violates $inv (as expected)"; else echo "FAIL old code no longer violates $inv"; fail=1; fi
done
rm -rf "$T"; exit $fail
