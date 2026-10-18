/* Why Next? draft site: demo + kitchen-table ideas. No network calls except loading data/demo.json. */
(function () {
  'use strict';
  var VIEWER = 'https://pandeyaby.github.io/why-next/out/viewer.html';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var GLOSS = { KS1: 'Key Stage 1: ages 5–7 in England', KS2: 'Key Stage 2: ages 7–11 in England', KS3: 'Key Stage 3: ages 11–14 in England', KS4: 'Key Stage 4: ages 14–16 in England' };
  var rich = function (s) { return esc(s).replace(/\bKS[1-4]\b/g, function (k) { return '<abbr title="' + GLOSS[k] + '">' + k + '</abbr>'; }); };
  var ages = function (a) { return a[0] === a[1] ? 'age\u00a0' + a[0] : 'ages\u00a0' + a[0] + '\u2060–\u2060' + a[1]; };
  var data, state = { area: null, answers: [null, null, null] };

  function childName() {
    var v = ($('#childname') || {}).value || '';
    v = v.replace(/[^\p{L}\p{M}' -]/gu, '').trim();
    return v;
  }
  function personal(q) {
    var n = childName(), who = n ? esc(n) : 'your child';
    var out = rich(q).replace(/\{\{name\}\}/g, '<span class="who">' + who + '</span>');
    return out.charAt(0) === '<' && !n ? out.replace('>your child', '>Your child') : out;
  }

  /* ---------- areas ---------- */
  function renderAreas() {
    var box = $('#areas');
    box.innerHTML = data.areas.map(function (a, i) {
      return '<button type="button" class="area" role="radio" aria-checked="false" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
        '<span class="area-icon" aria-hidden="true">' + esc(a.icon) + '</span>' +
        '<span class="area-name">' + esc(a.label) + '</span>' +
        '<span class="area-meta">' + a.count + ' topics</span></button>';
    }).join('');
    var btns = box.querySelectorAll('.area');
    btns.forEach(function (b) {
      b.addEventListener('click', function () { pickArea(+b.dataset.i, true); });
      b.addEventListener('keydown', function (e) {
        var i = +b.dataset.i, n = btns.length, j = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % n;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        if (e.key === 'Home') j = 0; if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); btns[j].focus(); pickArea(j, false); }
      });
    });
  }
  function pickArea(i, scroll) {
    state.area = i; state.answers = [null, null, null];
    document.querySelectorAll('.area').forEach(function (b) {
      var on = +b.dataset.i === i; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1;
    });
    renderQuestions();
    $('#qs-wrap').hidden = false; $('#results-wrap').hidden = true;
    if (scroll) $('#qs-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- questions ---------- */
  var CHOICES = [['yes', 'Yes, confidently'], ['some', 'Getting there'], ['no', 'Not yet']];
  function renderQuestions() {
    var a = data.areas[state.area];
    $('#questions').innerHTML = a.probes.map(function (p, k) {
      var n = data.nodes[p.t];
      return '<fieldset class="q" id="q' + k + '"><legend><span class="q-meta">Question ' + (k + 1) + ' of 3 · usually ' + ages(n.a) + '</span>' +
        '<span class="q-topic">' + esc(n.n) + '</span></legend>' +
        '<p class="q-text">' + personal(p.q) + '</p><div class="choices">' +
        CHOICES.map(function (c) {
          return '<label class="choice"><input type="radio" name="a' + k + '" value="' + c[0] + '"' + (state.answers[k] === c[0] ? ' checked' : '') + '><span>' + c[1] + '</span></label>';
        }).join('') + '</div></fieldset>';
    }).join('');
    a.probes.forEach(function (p, k) {
      document.querySelectorAll('input[name="a' + k + '"]').forEach(function (r) {
        r.addEventListener('change', function () {
          state.answers[k] = r.value; $('#q' + k).classList.add('answered');
          if (state.answers.every(Boolean)) renderResults(k === 2);
        });
      });
    });
  }
  function refreshNames() {
    if (state.area === null) return;
    var a = data.areas[state.area];
    a.probes.forEach(function (p, k) { var el = $('#q' + k + ' .q-text'); if (el) el.innerHTML = personal(p.q); });
    if (state.answers.every(Boolean)) renderResults(false);
  }

  /* ---------- results ---------- */
  function renderResults(scroll) {
    var a = data.areas[state.area], r = window.WhyNextInfer(data, state.area, state.answers);
    var N = function (i) { return data.nodes[i]; };
    var name = childName(), who = name ? esc(name) : 'your child', Who = name ? esc(name) : 'Your child';
    var html = '';
    r.notes.forEach(function (nt) {
      html += '<p class="note"><strong>Worth a second look:</strong> ' + esc(N(nt.later).n) + ' builds on ' + esc(N(nt.earlier).n) +
        ', so we’ve counted ' + esc(N(nt.earlier).n) + ' as done. Gaps like this are common and often where a quick recap helps most.</p>';
    });
    html += '<p class="res-summary">' + Who + ' has the groundwork for <strong>' + r.masteredCount + '</strong> of the ' + a.count + ' ' + esc(a.label.toLowerCase()) +
      ' topics on the map. <strong>' + r.upNextCount + '</strong> ' + (r.upNextCount === 1 ? 'topic is' : 'topics are') + ' within reach right now.</p>';
    // map strip: every topic in this area, oldest steps first
    var ids = Object.keys(a.topics).map(Number).sort(function (x, y) { return N(x).a[0] - N(y).a[0] || (N(x).n < N(y).n ? -1 : 1); });
    var M = new Set(r.mastered), U = new Set(r.upNextAll), C = new Set(r.comingUpAll);
    html += '<div class="mapstrip" aria-hidden="true">' + ids.map(function (i) {
      return '<i data-s="' + (M.has(i) ? 'm' : U.has(i) ? 'u' : C.has(i) ? 'c' : '') + '" title="' + esc(N(i).n) + '"></i>';
    }).join('') + '</div>';
    var later = a.count - r.masteredCount - U.size - C.size;
    html += '<ul class="legend" aria-label="Map key"><li><i style="background:var(--green)"></i>Mastered (' + r.masteredCount + ')</li><li><i style="background:var(--coral)"></i>Up next (' + U.size + ')</li>' +
      '<li><i style="background:#7D93D6"></i>Coming up (' + C.size + ')</li><li><i style="background:#E7DCCD"></i>Later (' + later + ')</li></ul>';
    html += '<p class="sr-only" style="position:absolute;left:-9999px">Each square is one ' + esc(a.label) + ' topic, ordered by age.</p>';

    html += '<div class="cols">';
    // mastered
    var mShow = r.mastered.slice(0, 5);
    html += '<section class="col col-m" aria-labelledby="cm"><h4 id="cm"><span aria-hidden="true">✓</span> Mastered</h4><p class="col-sub">Steps your answers tell us are in place.</p>';
    if (mShow.length) {
      html += '<ul class="mlist">' + mShow.map(function (i) { return '<li>' + esc(N(i).n) + '<span>' + ages(N(i).a) + '</span></li>'; }).join('') + '</ul>';
      if (r.masteredCount > mShow.length) html += '<p class="more">and ' + (r.masteredCount - mShow.length) + ' earlier ' + (r.masteredCount - mShow.length === 1 ? 'step' : 'steps') + ' they rest on.</p>';
    } else html += '<p class="more">Nothing in this subject yet, and that’s fine. Everyone starts somewhere.</p>';
    if (!M.has(r.baseline)) html += '<p class="more">We’ve assumed the groundwork that comes before “' + esc(N(r.baseline).n) + '” is in place.</p>';
    html += '</section>';
    // up next
    html += '<section class="col col-u" aria-labelledby="cu"><h4 id="cu"><span aria-hidden="true">→</span> Up next</h4><p class="col-sub">Ready now: what these rely on is in place.' + (r.upNextCount > r.upNext.length ? ' Showing ' + r.upNext.length + ' of ' + r.upNextCount + ', closest to what they know first.' : '') + '</p>';
    html += r.upNext.map(function (u) {
      var t = a.topics[u.i], n = N(u.i), why;
      if (u.from) why = '<p class="why"><strong>Why now?</strong> Builds on <strong>' + esc(N(u.from.p).n) + '</strong>: ' + rich(u.from.r) + '</p>';
      else if (u.flag === 'some') why = '<p class="why">You said ' + who + ' is getting there, so this is the one to finish first.</p>';
      else why = '<p class="why">A starting point in ' + esc(a.label.toLowerCase()) + ': it doesn’t depend on earlier ' + esc(a.label.toLowerCase()) + ' topics.</p>';
      var flag = u.flag === 'some' ? '<span class="flag">You said: getting there</span>' : u.flag === 'no' ? '<span class="flag">You said: not yet</span>' : '';
      return '<article class="tcard"><b>' + esc(n.n) + '</b><span class="age">' + ages(n.a) + '</span> ' + flag + why +
        (t.w ? '<p class="why">' + t.w + ' later ' + (t.w === 1 ? 'topic builds' : 'topics build') + ' on this.</p>' : '') + '</article>';
    }).join('');
    if (r.upNextCount > r.upNext.length) html += '<p class="more">The other ' + (r.upNextCount - r.upNext.length) + ' are in the full map.</p>';
    html += '</section>';
    // coming up
    html += '<section class="col col-c" aria-labelledby="cc"><h4 id="cc"><span aria-hidden="true">○</span> Coming up</h4><p class="col-sub">What the next steps open the door to.</p>';
    html += r.comingUp.map(function (c) {
      var n = N(c.i);
      return '<article class="tcard"><b>' + esc(n.n) + '</b><span class="age">' + ages(n.a) + '</span><p class="why">After <strong>' + esc(N(c.via.p).n) + '</strong>: ' + rich(c.via.r) + '</p></article>';
    }).join('') || '<p class="more">The up-next topics are near the end of this subject on the map.</p>';
    html += '</section></div>';
    // kitchen-table idea for the first up-next topic
    if (r.upNext.length) {
      var top = r.upNext[0], tt = a.topics[top.i], cl = tt.cl !== null ? data.clusters[tt.cl] : null;
      html += '<div class="kt-card" style="margin-top:20px"><p class="kt-k">Tonight at the kitchen table</p><h3>' + esc(N(top.i).n) + '</h3>' +
        (cl ? '<p class="kt-sum"><strong>The bigger picture (' + esc(data.domains[N(top.i).d]) + ', from age ' + cl.a + '):</strong> ' + rich(cl.s).replace(/^Your child/, Who) + '</p>' : '') +
        '<div class="kt-q"><b>Quick check</b>' + personal(tt.q) + '</div>' +
        (tt.ev ? '<p class="kt-src"><strong>Got it looks like:</strong> ' + rich(tt.ev) + '</p>' : '') + '</div>';
    }
    html += '<div class="res-foot"><p>This is a starting point for a conversation, not an assessment. Every topic and reason above comes straight from the open dataset.</p>' +
      '<p><a href="' + VIEWER + '">Open the full map</a> · <button type="button" class="linkbtn" id="again">Start again</button></p></div>';
    $('#results').innerHTML = html;
    $('#results-wrap').hidden = false;
    $('#results-title').textContent = (name ? name + '’s' : 'Your child’s') + ' ' + a.label.toLowerCase() + ' map';
    // fill the strip in, a few at a time
    var dots = document.querySelectorAll('.mapstrip i'), k = 0;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function step() {
      for (var j = 0; j < 12 && k < dots.length; j++, k++) if (dots[k].dataset.s) dots[k].className = dots[k].dataset.s;
      if (k < dots.length) reduce ? step() : requestAnimationFrame(step);
    })();
    $('#again').addEventListener('click', function () {
      state.answers = [null, null, null]; renderQuestions(); $('#results-wrap').hidden = true;
      var first = $('#questions input'); if (first) first.focus();
    });
    if (scroll) $('#results-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- kitchen table ---------- */
  function kitchenCard(x) {
    return '<p class="kt-k">' + esc(x.d) + ' · from age ' + x.a + '</p><h3>' + esc(x.n) + ' <span class="age">' + ages(x.ages) + '</span></h3>' +
      '<p class="kt-sum">' + rich(x.s) + '</p><div class="kt-q"><b>Quick check</b>' + personal(x.q) + '</div>' +
      '<p class="mini-h">What “got it” looks like</p><ul class="kt-ev">' + x.ev.map(function (e) { return '<li>' + rich(e) + '</li>'; }).join('') + '</ul>' +
      '<div class="kt-actions"><p class="kt-src">Summary for parents and quick check, both from the map.</p>' +
      '<button type="button" class="btn-soft" id="kt-next">Another idea</button></div>';
  }
  function initKitchen() {
    var card = $('#kt-card'), list = data.kitchen, i = +(card.dataset.start || 0);
    var bind = function () {
      $('#kt-next').addEventListener('click', function () {
        i = (i + 1 + Math.floor(Math.random() * (list.length - 1))) % list.length;
        card.innerHTML = kitchenCard(list[i]); bind(); $('#kt-next').focus();
      });
    };
    var btn = $('#kt-next'); if (btn) { btn.hidden = false; bind(); }
  }

  function start(d) {
    data = d; renderAreas(); initKitchen();
    var nm = $('#childname'); if (nm) nm.addEventListener('input', function () { refreshNames(); });
  }
  var inline = document.getElementById('whynext-data');
  if (inline) start(JSON.parse(inline.textContent));
  else {
    // Load the demo data (about 190 KB compressed) only when the reader gets near the demo or kitchen sections.
    var loaded = false, load = function () {
      if (loaded) return; loaded = true;
      fetch('data/demo.json').then(function (r) { return r.json(); }).then(start).catch(function () {
        $('#areas').innerHTML = '<p class="note">The demo data couldn’t be loaded. You can still <a href="' + VIEWER + '">explore the full map</a>.</p>';
      });
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (x) { return x.isIntersecting; })) { io.disconnect(); load(); } }, { rootMargin: '800px 0px' });
      ['#try', '#kitchen'].forEach(function (s) { var el = $(s); if (el) io.observe(el); });
    } else load();
  }
})();
