---------------------------- MODULE WhyNextState ----------------------------
(* Model of learn/learn_panel.js reelPick/reelMark + learn/learn_core.js
   progress store, and their Swift twins (ReelRotation.pick, ReelCard).
   FIXED=FALSE models the code as it was on cd05747; TRUE models the
   sanitised reads. Storage can be corrupted at any time (bad JSON shape). *)
EXTENDS Naturals, FiniteSets, TLC
CONSTANTS Reels, FIXED, MaxScore
NaN == 99  \* stands for JavaScript NaN (Math.max(score, garbage))
Kinds  == {"arr", "null", "str", "obj"}          \* shape of wn_reels_seen[tid]
PKinds == {"ok", "null", "badbest"}              \* shape of the progress store
Status == {"none", "unknown", "known", "practising", "mastered"}
Rank(s) == CASE s = "mastered" -> 2 [] s \in {"practising","known"} -> 1 [] OTHER -> 0
VARIABLES kind, seen, shown, cycle, crashed,
          pkind, status, best, practised, prevBest, prevRank
vars == <<kind, seen, shown, cycle, crashed, pkind, status, best, practised, prevBest, prevRank>>

Init == /\ kind = "arr" /\ seen = {} /\ shown = "none" /\ cycle = {} /\ crashed = FALSE
        /\ pkind = "ok" /\ status = "none" /\ best = 0 /\ practised = FALSE
        /\ prevBest = 0 /\ prevRank = 0

\* ---- reels ----
ReadSeen == IF kind = "arr" THEN seen ELSE {}      \* sanitised read
RawCrash == ~FIXED /\ kind # "arr"                 \* null.tid / str.push / obj.includes throw
Pick(skip) ==
  /\ ~crashed
  /\ IF RawCrash THEN crashed' = TRUE /\ UNCHANGED <<kind, seen, shown, cycle>>
     ELSE LET s0   == ReadSeen
              pool == (Reels \ s0) \ skip
              s1   == IF pool = {} THEN {} ELSE s0
              cyc  == IF pool = {} THEN {} ELSE cycle
              p2   == IF (Reels \ skip) = {} THEN Reels ELSE Reels \ skip
              cand == IF pool = {} THEN p2 ELSE pool
          IN \E r \in cand : /\ shown' = r /\ seen' = s1 \cup {r} /\ kind' = "arr"
                             /\ cycle' = cyc \cup {r} /\ crashed' = FALSE
                             /\ Assert(r \notin cyc, "repeat before all seen")
  /\ UNCHANGED <<pkind, status, best, practised, prevBest, prevRank>>
Visit   == Pick({})
Another == shown # "none" /\ Pick({shown})
CorruptSeen == /\ \E k \in Kinds : kind' = k
               /\ cycle' = {}   \* memory legitimately lost; a fresh cycle starts
               /\ UNCHANGED <<seen, shown, crashed, pkind, status, best, practised, prevBest, prevRank>>

\* ---- progress ----
PCrash == ~FIXED /\ pkind = "null"                  \* P.progress[id] on null throws
LoadBest == best
Snap == prevBest' = best /\ prevRank' = Rank(status)
Practice ==
  /\ ~crashed
  /\ IF PCrash THEN crashed' = TRUE /\ UNCHANGED <<status, practised, pkind, best>>
     ELSE /\ status' = IF FIXED /\ status \in {"none","unknown"} THEN "practising"
                       ELSE IF status = "none" THEN "practising" ELSE status
          /\ practised' = TRUE /\ UNCHANGED <<pkind, best>> /\ crashed' = FALSE
  /\ Snap /\ UNCHANGED <<kind, seen, shown, cycle>>
Master ==
  /\ ~crashed
  /\ \E sc \in 0..MaxScore, pass \in BOOLEAN :
       IF PCrash THEN crashed' = TRUE /\ UNCHANGED <<status, best, pkind>>
       ELSE LET b == LoadBest IN
            /\ best' = IF b = NaN THEN NaN ELSE IF sc > b THEN sc ELSE b
            /\ status' = IF pass \/ status = "mastered" THEN "mastered" ELSE "practising"
            /\ pkind' = "ok" /\ crashed' = FALSE
  /\ practised' = TRUE /\ Snap /\ UNCHANGED <<kind, seen, shown, cycle>>
ToggleKnown ==   \* button only rendered when status # mastered
  /\ ~crashed /\ status # "mastered"
  /\ status' = IF status # "known" THEN "known"
                ELSE IF FIXED /\ practised THEN "practising" ELSE "unknown"
  /\ prevRank' = Rank(status') /\ prevBest' = best   \* user's own choice: not a regression
  /\ UNCHANGED <<kind, seen, shown, cycle, crashed, pkind, best, practised>>
CorruptProg == \* destroyed data may be forgotten, but must not crash or poison later writes
  /\ \E k \in PKinds : /\ pkind' = k
                       /\ prevBest' = IF k = "ok" THEN best ELSE 0
                       /\ prevRank' = IF k = "ok" THEN Rank(status) ELSE 0
  /\ best' = IF pkind' = "badbest" THEN (IF FIXED THEN 0 ELSE NaN) ELSE best   \* fixed load drops junk best
  /\ UNCHANGED <<kind, seen, shown, cycle, crashed, status, practised>>

Next == Visit \/ Another \/ CorruptSeen \/ Practice \/ Master \/ ToggleKnown \/ CorruptProg
Spec == Init /\ [][Next]_vars

\* ---- invariants ----
NoCrash        == ~crashed
NofN           == /\ shown = "none" \/ shown \in Reels         \* "i+1 of N" indexes a real reel
                  /\ seen \subseteq Reels /\ Cardinality(seen) <= Cardinality(Reels)
BestNumeric    == best \in 0..MaxScore
BestMonotonic  == best = NaN \/ prevBest = NaN \/ best >= prevBest
NoRegression   == Rank(status) >= prevRank
PractisedShows == practised => status \in {"practising","mastered","known"}
=============================================================================
