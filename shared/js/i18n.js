/* Internacionalização (PT/EN). Dicionários ficam em window.I18N (shared/i18n e pasta de cada página). */
(function () {
  var KEY = 'pref-lang', dict = (window.I18N = window.I18N || { pt: {}, en: {} });
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function initial() {
    var s = saved(); if (s === 'pt' || s === 'en') return s;
    return (navigator.language || 'pt').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en';
  }
  function t(k, l) { return (dict[l] && dict[l][k]) || (dict.pt && dict.pt[k]) || ''; }
  function apply(l) {
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (n) { var v = t(n.dataset.i18n, l); if (v) n.textContent = v; });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (n) {
      n.dataset.i18nAttr.split(';').forEach(function (p) {
        var a = p.split(':'), v = t(a[1], l); if (v) n.setAttribute(a[0], v);
      });
    });
    var ti = t('meta.title', l); if (ti) document.title = ti;
    var md = document.querySelector('meta[name="description"]'), d = t('meta.desc', l); if (md && d) md.content = d;
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
  }
  function set(l) { try { localStorage.setItem(KEY, l); } catch (e) {} apply(l); }
  window.Lang = { init: function () {
    apply(initial());
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.lang); }); });
  } };
})();
