/* Display-only softening of dataset text (the dataset itself is untouched).
   - English Key Stage references become ages, with the KS term and US grades in a tooltip.
   - Sentences get a capital letter and a full stop.
   Returns escaped HTML. Mirrored in build/build_site.py for the static parts of the page. */
(function (root) {
  'use strict';
  var KS = {
    1: { a: '5–7', adj: 'early-primary', tip: 'Key Stage 1 in England (Years 1–2), about US kindergarten to grade 1' },
    2: { a: '7–11', adj: 'primary', tip: 'Key Stage 2 in England (Years 3–6), about US grades 2–5' },
    3: { a: '11–14', adj: 'early-secondary', tip: 'Key Stage 3 in England (Years 7–9), about US grades 6–8' },
    4: { a: '14–16', adj: 'mid-secondary', tip: 'Key Stage 4 in England (Years 10–11), about US grades 9–10' }
  };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  function soften(text, opts) {
    var s = String(text);
    s = s.replace(/\bUS (KS[1-4])\b/g, '$1').replace(/\b(KS[1-4]) US\b/g, '$1');
    var out = [], last = 0, re = /\b(?:(at|from|since|during|by|in) )?(upper )?(?:(an?|the) )?KS([1-4])\b(\s*)/gi, m;
    while ((m = re.exec(s))) {
      var prep = m[1], upper = m[2], art = m[3], k = KS[m[4]], space = m[5];
      var next = s.slice(m.index + m[0].length);
      var ages = upper ? '9–11' : k.a;
      var rep;
      var endsPhrase = !next || /^[.,;:)\u2014\u2013-]|^(as|and|or|is|was|but|so|to|with)\b/i.test(next);
      if (prep && prep.toLowerCase() !== 'in' && !art) rep = { lead: prep + ' ', t: 'ages ' + ages, trail: space };
      else if (prep && !art && endsPhrase) rep = { lead: 'at ', t: 'ages ' + ages, trail: space };
      else {
        var a = art ? (/^an?$/i.test(art) ? (/^[aeiou]/i.test(k.adj) ? 'an' : 'a') : art) : '';
        if (art && art[0] === art[0].toUpperCase()) a = a.charAt(0).toUpperCase() + a.slice(1);
        rep = { lead: (prep ? prep + ' ' : '') + (a ? a + ' ' : ''), t: (upper ? 'upper-' : '') + k.adj + ' (ages ' + ages + ')', trail: space };
      }
      out.push(esc(s.slice(last, m.index)) + esc(rep.lead) + '<span class="ks" title="' + esc(k.tip) + '">' + esc(rep.t) + '</span>' + esc(rep.trail));
      last = m.index + m[0].length;
    }
    out.push(esc(s.slice(last)));
    var html = out.join('');
    html = html.replace(/\bYear ([1-9]|1[0-3])\b/g, function (w, n) { n = +n; return w + ' (age ' + (n + 4) + '–' + (n + 5) + ')'; });
    if (!opts || opts.sentence !== false) {
      html = html.replace(/^((?:<span class="ks" title="[^"]*">)?)([a-z])/, function (w, tag, c) { return tag + c.toUpperCase(); });
      if (!/[.!?)]$|<\/span>\)$/.test(html.trim()) && !/[.!?]$/.test(s.trim())) html = html.replace(/\s*$/, '.');
    }
    return html;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = soften; else root.WhyNextSoften = soften;
})(this);
