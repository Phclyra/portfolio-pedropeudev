/* Modo claro / noturno. O atributo data-theme é aplicado cedo (script inline no <head>) para evitar "flash". */
(function () {
  var KEY = 'pref-theme', root = document.documentElement;
  function effective() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paint(btn) { btn.setAttribute('aria-pressed', String(effective() === 'dark')); }
  window.Theme = { init: function () {
    var btn = document.getElementById('themeBtn'); if (!btn) return;
    paint(btn);
    btn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      paint(btn);
    });
  } };
})();
