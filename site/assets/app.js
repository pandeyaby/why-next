/* Why Next? site: navigation, reveal motion, demo and kitchen-table ideas.
   No network calls except loading data/demo.json from this site. */
(function () {
  'use strict';
  var ROOT = document.documentElement;
  var VIEWER = ROOT.getAttribute('data-viewer') || 'https://pandeyaby.github.io/why-next/out/viewer.html';
  var BASE = ROOT.getAttribute('data-base') || '';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var soft = function (s, o) { return window.WhyNextSoften(s, o); };
  var ages = function (a) { return a[0] === a[1] ? 'age\u00a0' + a[0] : 'ages\u00a0' + a[0] + '\u2060–\u2060' + a[1]; };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ICON = { check: '<svg aria-hidden="true"><use href="#i-check"/></svg>', arrow: '<svg aria-hidden="true"><use href="#i-arrow"/></svg>', ring: '<svg aria-hidden="true"><use href="#i-ring"/></svg>' };

  /* ---------- nav: mobile menu + scrolled state ---------- */
  (function () {
    var btn = $('.menu-btn'), panel = $('#menu'), nav = $('.nav');
    if (btn && panel) {
      btn.hidden = false;
      var set = function (open) {
        btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open;
        btn.querySelector('span').textContent = open ? 'Close' : 'Menu';
        if (open) { var f = panel.querySelector('a'); if (f) f.focus(); }
      };
      btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
      });
      window.addEventListener('resize', function () { if (window.innerWidth >= 900) set(false); });
    }
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  })();

  /* ---------- reveal on scroll ---------- */
  (function () {
    var els = $$('.reveal');
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  })();

  /* ---------- demo ---------- */
  var data, state = { area: null, answers: [null, null, null] };
  function childName() { return (($('#childname') || {}).value || '').replace(/[^\p{L}\p{M}' -]/gu, '').trim(); }
  function personal(q) {
    var n = childName(), who = n ? esc(n) : 'your child';
    var out = soft(q).replace(/\{\{name\}\}/g, '<span class="who">' + who + '</span>');
    return !n ? out.replace(/^<span class="who">your child/, '<span class="who">Your child') : out;
  }
  function renderAreas() {
    var box = $('#areas');
    box.innerHTML = data.areas.map(function (a, i) {
      return '<button type="button" class="area" role="radio" aria-checked="false" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
        '<span class="area-icon" aria-hidden="true">' + esc(a.icon) + '</span><span class="area-name">' + esc(a.label) + '</span>' +
        '<span class="area-meta">' + a.count + ' topics</span></button>';
    }).join('');
    var btns = $$('.area', box);
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
    $$('.area').forEach(function (b) { var on = +b.dataset.i === i; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
    renderQuestions();
    $('#qs-wrap').hidden = false; $('#results-wrap').hidden = true;
    if (scroll) $('#qs-wrap').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  var CHOICES = [['yes', 'Yes, confidently'], ['some', 'Getting there'], ['no', 'Not yet']];
  function renderQuestions() {
    var a = data.areas[state.area];
    $('#questions').innerHTML = a.probes.map(function (p, k) {
      var n = data.nodes[p.t];
      return '<fieldset class="q" id="q' + k + '"><legend><span class="q-meta">Question ' + (k + 1) + ' of 3 · usually ' + ages(n.a) + '</span>' +
        '<span class="q-topic">' + esc(n.n) + '</span></legend><p class="q-text">' + personal(p.q) + '</p><div class="choices">' +
        CHOICES.map(function (c) {
          return '<label class="choice"><input type="radio" name="a' + k + '" value="' + c[0] + '"' + (state.answers[k] === c[0] ? ' checked' : '') + '><span>' + c[1] + '</span></label>';
        }).join('') + '</div></fieldset>';
    }).join('');
    a.probes.forEach(function (p, k) {
      $$('input[name="a' + k + '"]').forEach(function (r) {
        r.addEventListener('change', function () {
          state.answers[k] = r.value; $('#q' + k).classList.add('answered');
          if (state.answers.every(Boolean)) renderResults(k === 2);
        });
      });
    });
  }
  function refreshNames() {
    if (state.area === null) return;
    data.areas[state.area].probes.forEach(function (p, k) { var el = $('#q' + k + ' .q-text'); if (el) el.innerHTML = personal(p.q); });
    if (state.answers.every(Boolean)) renderResults(false);
  }
  function renderResults(scroll) {
    var a = data.areas[state.area], r = window.WhyNextInfer(data, state.area, state.answers);
    var N = function (i) { return data.nodes[i]; }, subj = esc(a.label.toLowerCase());
    var name = childName(), who = name ? esc(name) : 'your child', Who = name ? esc(name) : 'Your child';
    var html = '';
    r.notes.forEach(function (nt) {
      html += '<p class="note"><strong>Worth a second look:</strong> ' + esc(N(nt.later).n) + ' builds on ' + esc(N(nt.earlier).n) +
        ', so we’ve counted ' + esc(N(nt.earlier).n) + ' as done. Gaps like this are common, and often where a quick recap helps most.</p>';
    });
    var mc = r.masteredCount, pct = Math.round(100 * mc / a.count);
    html += '<p class="res-summary">' + Who + (r.estimated.length ? ' likely has about <strong>' : ' has the groundwork for <strong>') + mc + '</strong> of the ' + a.count + ' ' + subj + ' topics on the map' + (r.estimated.length ? ' in place' : '') +
      (pct >= 5 ? ' (roughly ' + pct + '%)' : '') + ', and <strong>' + r.upNextCount + '</strong> ' + (r.upNextCount === 1 ? 'topic is' : 'topics are') + ' within reach right now.</p>';
    html += '<p class="res-est">' + (r.estimated.length ? 'This is an estimate. ' : '') + '<strong>' + r.confirmed.length + '</strong> ' + (r.confirmed.length === 1 ? 'follows' : 'follow') + ' directly from your answers' +
      (r.estimated.length ? '; the other <strong>' + r.estimated.length + '</strong> are earlier ' + subj + ' topics we’d expect at this level, leaving out anything after a “not yet” or “getting there”.' : '.') +
      ' Their level looks like about age ' + r.level + '.</p>';
    var ids = Object.keys(a.topics).map(Number).sort(function (x, y) { return N(x).a[0] - N(y).a[0] || (N(x).n < N(y).n ? -1 : 1); });
    var C = new Set(r.confirmed), E = new Set(r.estimated), U = new Set(r.upNextAll), L = new Set(r.comingUpAll);
    html += '<div class="mapstrip" aria-hidden="true">' + ids.map(function (i) {
      return '<i data-s="' + (C.has(i) ? 'm' : E.has(i) ? 'e' : U.has(i) ? 'u' : L.has(i) ? 'c' : '') + '" title="' + esc(N(i).n) + '"></i>';
    }).join('') + '</div>';
    var rest = a.count - C.size - E.size - U.size - L.size;
    html += '<ul class="legend" aria-label="Map key, one square per ' + esc(a.label) + ' topic, youngest first">' +
      '<li><i style="background:var(--green)"></i>From your answers (' + C.size + ')</li><li><i style="background:var(--green-2)"></i>Estimated (' + E.size + ')</li>' +
      '<li><i style="background:var(--coral)"></i>Up next (' + U.size + ')</li><li><i style="background:var(--blue-2)"></i>Coming up (' + L.size + ')</li>' +
      '<li><i style="background:#E6D9C6"></i>Later (' + rest + ')</li></ul>';
    html += '<div class="cols">';
    // mastered
    html += '<section class="col col-m" aria-labelledby="cm"><h4 id="cm">' + ICON.check + ' Mastered</h4><p class="col-sub">What we think is already in place.</p>';
    if (!mc) html += '<p class="more">Nothing in this subject yet, and that’s fine. Everyone starts somewhere.</p>';
    if (r.confirmed.length) {
      var cs = r.confirmed.slice(0, 4);
      html += '<p class="mgroup">From your answers</p><ul class="mlist">' + cs.map(function (i) { return '<li>' + esc(N(i).n) + '<span>' + ages(N(i).a) + '</span></li>'; }).join('') + '</ul>';
      if (r.confirmed.length > cs.length) html += '<p class="more">+ ' + (r.confirmed.length - cs.length) + ' more they rest on.</p>';
    }
    if (r.estimated.length) {
      var es = r.estimated.slice(0, 3);
      html += '<p class="mgroup">Probably in place too</p><ul class="mlist est">' + es.map(function (i) { return '<li>' + esc(N(i).n) + '<span>' + ages(N(i).a) + '</span></li>'; }).join('') + '</ul>';
      if (r.estimated.length > es.length) html += '<p class="more">+ ' + (r.estimated.length - es.length) + ' more, estimated from their level.</p>';
    }
    if (!r.baselineCovered) html += '<p class="more">We’ve assumed the groundwork before “' + esc(N(r.baseline).n) + '” is in place.</p>';
    html += '</section>';
    // up next
    html += '<section class="col col-u" aria-labelledby="cu"><h4 id="cu">' + ICON.arrow + ' Up next</h4><p class="col-sub">Ready now: what these rely on is in place.' +
      (r.upNextCount > r.upNext.length ? ' Showing ' + r.upNext.length + ' of ' + r.upNextCount + ', closest to their level first.' : '') + '</p>';
    html += r.upNext.map(function (u, k) {
      var t = a.topics[u.i], n = N(u.i), why;
      if (u.from) why = '<p class="why"><strong>Why now?</strong> It builds on <strong>' + esc(N(u.from.p).n) + '</strong>. ' + soft(u.from.r) + '</p>';
      else if (u.flag === 'some') why = '<p class="why">You said ' + who + ' is getting there, so this is the one to finish first.</p>';
      else why = '<p class="why">A good starting point: it doesn’t depend on earlier ' + subj + ' topics.</p>';
      var flag = u.flag === 'some' ? '<span class="flag">You said: getting there</span>' : u.flag === 'no' ? '<span class="flag">You said: not yet</span>' : '';
      return '<article class="tcard" style="animation-delay:' + (k * 60) + 'ms"><b>' + esc(n.n) + '</b><span class="age">' + ages(n.a) + '</span> ' + flag + why +
        (t.w ? '<p class="w">Unlocks ' + t.w + ' later ' + (t.w === 1 ? 'topic' : 'topics') + '</p>' : '') + '</article>';
    }).join('');
    if (r.upNextCount > r.upNext.length) html += '<p class="more">The other ' + (r.upNextCount - r.upNext.length) + ' are in the <a href="' + VIEWER + '">full map</a>.</p>';
    html += '</section>';
    // coming up
    html += '<section class="col col-c" aria-labelledby="cc"><h4 id="cc">' + ICON.ring + ' Coming up</h4><p class="col-sub">Where the next steps lead, within about two years.</p>';
    html += r.comingUp.map(function (c, k) {
      var n = N(c.i);
      return '<article class="tcard" style="animation-delay:' + (200 + k * 60) + 'ms"><b>' + esc(n.n) + '</b><span class="age">' + ages(n.a) + '</span><p class="why">After <strong>' + esc(N(c.via.p).n) + '</strong>. ' + soft(c.via.r) + '</p></article>';
    }).join('') || '<p class="more">' + (r.level >= 16 ? 'They’re close to the end of this subject on the map. The up-next topics are the last big steps.' : 'Nothing else opens up within two years of these steps alone. Finish the up-next topics first.') + '</p>';
    html += '</section></div>';
    if (r.upNext.length) {
      var top = r.upNext[0], tt = a.topics[top.i], cl = tt.cl !== null ? data.clusters[tt.cl] : null;
      html += '<div class="res-kt"><p class="kt-k">Tonight at the kitchen table</p><h4>' + esc(N(top.i).n) + '</h4>' +
        (cl ? '<p class="kt-sum"><strong>The bigger picture (' + esc(data.domains[N(top.i).d]) + ', from age ' + cl.a + '):</strong> ' + soft(cl.s).replace(/^Your child/, Who) + '</p>' : '') +
        '<div class="kt-q"><b>Quick check</b>' + personal(tt.q) + '</div>' +
        (tt.ev ? '<p class="kt-src"><strong>“Got it” looks like:</strong> ' + soft(tt.ev) + '</p>' : '') + '</div>';
    }
    html += '<div class="res-foot"><p>A starting point for a conversation, not an assessment. Every topic and reason above comes from the open dataset; Key Stage references are shown as ages.</p>' +
      '<p><a href="' + VIEWER + '">Open the full map</a> · <button type="button" class="linkbtn" id="again">Start again</button></p></div>';
    $('#results').innerHTML = html;
    $('#results-wrap').hidden = false;
    $('#results-title').textContent = (name ? name + '’s' : 'Your child’s') + ' ' + a.label.toLowerCase() + ' map';
    var dots = $$('.mapstrip i'), k = 0;
    (function step() {
      for (var j = 0; j < (reduce ? dots.length : 10) && k < dots.length; j++, k++) if (dots[k].dataset.s) dots[k].className = dots[k].dataset.s;
      if (k < dots.length) requestAnimationFrame(step);
    })();
    $('#again').addEventListener('click', function () {
      state.answers = [null, null, null]; renderQuestions(); $('#results-wrap').hidden = true;
      var first = $('#questions input'); if (first) first.focus();
    });
    if (scroll) $('#results-wrap').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  /* ---------- kitchen table ---------- */
  function kitchenCard(x) {
    return '<p class="kt-k">' + esc(x.d) + ' · from age ' + x.a + '</p><h3>' + esc(x.n) + ' <span class="age">' + ages(x.ages) + '</span></h3>' +
      '<p class="kt-sum">' + soft(x.s) + '</p><div class="kt-q"><b>Quick check</b>' + personal(x.q) + '</div>' +
      '<p class="mini-h">What “got it” looks like</p><ul class="kt-ev">' + x.ev.map(function (e) { return '<li>' + soft(e, { sentence: false }) + '</li>'; }).join('') + '</ul>' +
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
    var nm = $('#childname'); if (nm) nm.addEventListener('input', refreshNames);
  }
  var inline = document.getElementById('whynext-data');
  if (inline) start(JSON.parse(inline.textContent));
  else {
    var loaded = false, load = function () {
      if (loaded) return; loaded = true;
      fetch(BASE + 'data/demo.json').then(function (r) { return r.json(); }).then(start).catch(function () {
        $('#areas').innerHTML = '<p class="note">The demo data couldn’t be loaded. You can still <a href="' + VIEWER + '">explore the full map</a>.</p>';
      });
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (x) { return x.isIntersecting; })) { io.disconnect(); load(); } }, { rootMargin: '900px 0px' });
      ['#try', '#kitchen'].forEach(function (s) { var el = $(s); if (el) io.observe(el); });
    } else load();
  }
})();
