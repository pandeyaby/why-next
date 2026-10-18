/* Why Next? demo inference. Pure function over the real graph in data/demo.json.
   Works in the browser (window.WhyNextInfer) and in Node (module.exports) for testing. */
(function (root) {
  'use strict';
  function infer(demo, areaIndex, answers) {
    var area = demo.areas[areaIndex], nodes = demo.nodes, topics = area.topics;
    var inArea = function (i) { return Object.prototype.hasOwnProperty.call(topics, i); };
    var age = function (i) { return nodes[i].a[0]; };
    var M = new Set(), notes = [];
    var probes = area.probes;
    // Baseline: the groundwork before the first question is assumed.
    probes[0].anc.forEach(function (i) { M.add(i); });
    probes.forEach(function (p, k) {
      if (answers[k] === 'yes') { M.add(p.t); p.anc.forEach(function (i) { M.add(i); }); }
    });
    // Answers that don't line up (a later "yes" implies an earlier "not yet"/"getting there").
    probes.forEach(function (p, k) {
      if (answers[k] !== 'yes' && M.has(p.t)) {
        var later = probes.findIndex(function (q, j) { return j > k && answers[j] === 'yes' && q.anc.indexOf(p.t) >= 0; });
        notes.push({ kind: 'mismatch', earlier: p.t, later: probes[later].t });
      }
    });
    var maxAgeM = 0;
    M.forEach(function (i) { if (inArea(i)) maxAgeM = Math.max(maxAgeM, age(i)); });
    if (maxAgeM === 0) maxAgeM = age(probes[0].t);
    var probeDomains = {};
    probes.forEach(function (p) { probeDomains[nodes[p.t].d] = true; });
    // 2 = builds directly on something they have; 1 = a starting point of this area they're ready for; 0 = not yet
    var ready = function (i, have) {
      var pre = topics[i].pre, linked = false, anyInArea = false;
      for (var k = 0; k < pre.length; k++) {
        var p = pre[k][0];
        if (inArea(p)) anyInArea = true;
        if (have.has(p)) { if (inArea(p)) linked = true; continue; }
        if (inArea(p)) return 0;                // an unmet step in this area
        if (age(p) > maxAgeM) return 0;         // an unmet step elsewhere that is ahead of where they are
      }
      if (linked) return 2;
      return (!anyInArea && probeDomains[nodes[i].d] && age(i) <= maxAgeM + 1) ? 1 : 0;
    };
    var bestPre = function (i, pool) {           // the most recent prerequisite they have, with its real reason
      var best = null;
      topics[i].pre.forEach(function (pr) {
        if (!pool.has(pr[0])) return;
        var score = (inArea(pr[0]) ? 100 : 0) + age(pr[0]) + (topics[pr[0]] ? topics[pr[0]].w / 1000 : 0);
        if (!best || score > best.s) best = { p: pr[0], r: demo.reasons[pr[1]], s: score };
      });
      return best && { p: best.p, r: best.r };
    };
    var ids = Object.keys(topics).map(Number);
    var rd = {};
    var frontier = ids.filter(function (i) { if (M.has(i)) return false; rd[i] = ready(i, M); return rd[i] > 0; });
    var flagged = {};
    probes.forEach(function (p, k) { if (!M.has(p.t)) flagged[p.t] = answers[k]; });
    // A probe marked "getting there" is up next even if one of its steps isn't recorded yet.
    // (only when every earlier question is already covered, so we never skip a step).
    probes.forEach(function (p, k) {
      var earlierOk = probes.slice(0, k).every(function (q) { return M.has(q.t); });
      if (answers[k] === 'some' && earlierOk && !M.has(p.t) && frontier.indexOf(p.t) < 0) { frontier.push(p.t); rd[p.t] = 2; }
    });
    var rankUp = function (i) {
      var f = flagged[i] === 'some' ? 3 : flagged[i] === 'no' ? 2 : 0;
      var b = bestPre(i, M); var recency = b ? age(b.p) : 0;
      return [f, rd[i] || 0, recency, topics[i].w, -age(i)];
    };
    var cmp = function (ka, kb) { for (var k = 0; k < ka.length; k++) if (ka[k] !== kb[k]) return kb[k] - ka[k]; return 0; };
    frontier.sort(function (a, b) { return cmp(rankUp(a), rankUp(b)); });
    var upShown = frontier.slice(0, 4);
    var U = new Set(frontier), MU = new Set(M);
    frontier.forEach(function (i) { MU.add(i); });
    var shownSet = new Set(upShown);
    // Coming up: topics that build on what's shown as up next; fewest other missing steps first.
    var later = [], missing = {};
    ids.forEach(function (i) {
      if (MU.has(i)) return;
      var pre = topics[i].pre, viaShown = false, miss = 0;
      for (var k = 0; k < pre.length; k++) {
        var p = pre[k][0];
        if (shownSet.has(p)) viaShown = true;
        if (MU.has(p)) continue;
        if (inArea(p)) miss++; else if (age(p) > maxAgeM + 1) miss++;
      }
      if (viaShown && miss <= 1) { later.push(i); missing[i] = miss; }
    });
    later.sort(function (a, b) { return cmp([-missing[a], -age(a), topics[a].w], [-missing[b], -age(b), topics[b].w]); });
    // Keep it varied: at most two items hanging off the same up-next topic.
    var per = {}, comingUp = [];
    later.forEach(function (i) {
      if (comingUp.length >= 4) return;
      var via = bestPre(i, shownSet); if (!via) return;
      per[via.p] = (per[via.p] || 0) + 1;
      if (per[via.p] <= 2) comingUp.push({ i: i, via: via });
    });
    var mastered = ids.filter(function (i) { return M.has(i); });
    mastered.sort(function (a, b) {
      var pa = probes.some(function (p) { return p.t === a; }) ? 1 : 0, pb = probes.some(function (p) { return p.t === b; }) ? 1 : 0;
      return cmp([pa, age(a), topics[a].w], [pb, age(b), topics[b].w]);
    });
    return {
      mastered: mastered, masteredCount: mastered.length,
      upNext: upShown.map(function (i) { return { i: i, flag: flagged[i] || null, from: bestPre(i, M) }; }),
      upNextCount: frontier.length, upNextAll: frontier,
      comingUp: comingUp, comingUpAll: later, notes: notes, baseline: probes[0].t
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = infer; else root.WhyNextInfer = infer;
})(this);
