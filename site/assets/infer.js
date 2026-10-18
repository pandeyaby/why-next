/* Why Next? demo inference: a pure function over the real graph in data/demo.json.
   Works in the browser (window.WhyNextInfer) and in Node via vm (see build/test_infer.cjs).

   Mastered has two tiers:
     confirmed  - the "yes" topics plus everything they depend on (follows logically from the answers)
     estimated  - other topics in the same strand that start at a younger age than a "yes" topic (or 2+ years
                  younger in the subject's other strands), unless they sit on or after a "not yet"/"getting there" topic. This is an estimate and the UI says so.
   Up next  = not mastered, every step in this subject already mastered, within ~1 year of the inferred level.
   Coming up = builds on an up-next topic, at most one other step missing, within ~2 years of the inferred level. */
(function (root) {
  'use strict';
  function infer(demo, areaIndex, answers) {
    var area = demo.areas[areaIndex], nodes = demo.nodes, topics = area.topics, probes = area.probes;
    var inArea = function (i) { return Object.prototype.hasOwnProperty.call(topics, i); };
    var age = function (i) { return nodes[i].a[0]; };
    var ids = Object.keys(topics).map(Number);
    var post = {};
    ids.forEach(function (i) { topics[i].pre.forEach(function (p) { if (inArea(p[0])) (post[p[0]] = post[p[0]] || []).push(i); }); });
    var below = function (start) {             // start plus everything in this subject that builds on it
      var s = new Set([start]), st = [start];
      while (st.length) (post[st.pop()] || []).forEach(function (j) { if (!s.has(j)) { s.add(j); st.push(j); } });
      return s;
    };
    var cmp = function (ka, kb) { for (var k = 0; k < ka.length; k++) if (ka[k] !== kb[k]) return kb[k] - ka[k]; return 0; };

    // 1. confirmed
    var C = new Set(), notes = [];
    probes[0].anc.forEach(function (i) { C.add(i); });          // groundwork before question 1 is assumed
    probes.forEach(function (p, k) { if (answers[k] === 'yes') { C.add(p.t); p.anc.forEach(function (i) { C.add(i); }); } });
    probes.forEach(function (p, k) {
      if (answers[k] !== 'yes' && C.has(p.t)) {
        var j = probes.findIndex(function (q, jj) { return jj > k && answers[jj] === 'yes' && q.anc.indexOf(p.t) >= 0; });
        notes.push({ kind: 'mismatch', earlier: p.t, later: probes[j].t });
      }
    });
    // 2. blocked: a "not yet"/"getting there" topic and everything after it
    var blocked = new Set();
    probes.forEach(function (p, k) { if (answers[k] !== 'yes' && !C.has(p.t)) below(p.t).forEach(function (i) { blocked.add(i); }); });
    // 3. estimated
    var E = new Set();
    probes.forEach(function (p, k) {
      if (answers[k] !== 'yes') return;
      var d = nodes[p.t].d, a = age(p.t);
      ids.forEach(function (i) {
        if (C.has(i) || blocked.has(i)) return;
        // same strand: anything that starts younger; other strands of this subject: two or more years younger
        if ((nodes[i].d === d && age(i) < a) || age(i) < a - 1) E.add(i);
      });
    });
    var M = new Set(C); E.forEach(function (i) { M.add(i); });
    // inferred level
    var L = 0;
    probes.forEach(function (p, k) { if (answers[k] === 'yes' || (answers[k] === 'some' && !C.has(p.t))) L = Math.max(L, age(p.t)); });
    if (!L) L = age(probes[0].t);
    var probeDomains = {};
    probes.forEach(function (p) { probeDomains[nodes[p.t].d] = true; });
    // 2 = builds on something they have; 1 = a starting point of this subject they're ready for; 0 = not yet
    var ready = function (i) {
      var pre = topics[i].pre, linked = false, anyInArea = false;
      for (var k = 0; k < pre.length; k++) {
        var p = pre[k][0];
        if (inArea(p)) anyInArea = true;
        if (M.has(p)) { if (inArea(p)) linked = true; continue; }
        if (inArea(p)) return 0;
        if (age(p) > L) return 0;              // a step in another subject that is ahead of their level
      }
      if (linked) return 2;
      return (!anyInArea && probeDomains[nodes[i].d]) ? 1 : 0;
    };
    var bestPre = function (i, pool) {
      var best = null;
      topics[i].pre.forEach(function (pr) {
        if (!pool.has(pr[0])) return;
        var s = (inArea(pr[0]) ? 1000 : 0) + (C.has(pr[0]) ? 100 : 0) + age(pr[0]) + (topics[pr[0]] ? topics[pr[0]].w / 1000 : 0);
        if (!best || s > best.s) best = { p: pr[0], r: demo.reasons[pr[1]], s: s };
      });
      return best && { p: best.p, r: best.r };
    };
    var flagged = {};
    probes.forEach(function (p, k) { if (!M.has(p.t)) flagged[p.t] = answers[k]; });
    var rd = {};
    var frontier = ids.filter(function (i) {
      if (M.has(i) || age(i) > L + 1) return false;
      rd[i] = ready(i); return rd[i] > 0;
    });
    probes.forEach(function (p, k) {          // "getting there" is up next once every earlier question is covered
      var earlierOk = probes.slice(0, k).every(function (q) { return M.has(q.t); });
      if (answers[k] === 'some' && earlierOk && !M.has(p.t) && frontier.indexOf(p.t) < 0) { frontier.push(p.t); rd[p.t] = 2; }
    });
    var rankUp = function (i) {
      var f = flagged[i] === 'some' ? 3 : flagged[i] === 'no' ? 2 : 0, b = bestPre(i, M);
      return [f, rd[i] || 0, b && C.has(b.p) ? 1 : 0, -Math.abs(age(i) - L), topics[i].w];
    };
    frontier.sort(function (a, b) { return cmp(rankUp(a), rankUp(b)); });
    var upShown = frontier.slice(0, 4), shownSet = new Set(upShown), MU = new Set(M);
    frontier.forEach(function (i) { MU.add(i); });
    var later = [], missing = {};
    ids.forEach(function (i) {
      if (MU.has(i) || age(i) > L + 2) return;
      var pre = topics[i].pre, viaShown = false, miss = 0;
      for (var k = 0; k < pre.length; k++) {
        var p = pre[k][0];
        if (shownSet.has(p)) viaShown = true;
        if (MU.has(p)) continue;
        if (inArea(p) || age(p) > L + 1) miss++;
      }
      if (viaShown && miss <= 1) { later.push(i); missing[i] = miss; }
    });
    later.sort(function (a, b) { return cmp([-missing[a], -age(a), topics[a].w], [-missing[b], -age(b), topics[b].w]); });
    var per = {}, comingUp = [];
    later.forEach(function (i) {
      if (comingUp.length >= 4) return;
      var via = bestPre(i, shownSet); if (!via) return;
      per[via.p] = (per[via.p] || 0) + 1;
      if (per[via.p] <= 2) comingUp.push({ i: i, via: via });
    });
    var isProbe = function (i) { return probes.some(function (p) { return p.t === i; }) ? 1 : 0; };
    var confirmed = ids.filter(function (i) { return C.has(i); })
      .sort(function (a, b) { return cmp([isProbe(a), age(a), topics[a].w], [isProbe(b), age(b), topics[b].w]); });
    var estimated = ids.filter(function (i) { return E.has(i); })
      .sort(function (a, b) { return cmp([age(a), topics[a].w], [age(b), topics[b].w]); });
    return {
      level: L, confirmed: confirmed, estimated: estimated, masteredCount: confirmed.length + estimated.length,
      upNext: upShown.map(function (i) { return { i: i, flag: flagged[i] || null, from: bestPre(i, M) }; }),
      upNextAll: frontier, upNextCount: frontier.length,
      comingUp: comingUp, comingUpAll: later, notes: notes, baseline: probes[0].t, baselineCovered: M.has(probes[0].t)
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = infer; else root.WhyNextInfer = infer;
})(this);
