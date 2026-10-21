/* Página: Início
   - texto que se digita sozinho (frases vêm do dicionário: hero.roles, separadas por "|")
   - duplica a faixa de tecnologias para o loop infinito
   - oculta a foto se o arquivo não carregar */
window.Page = { init: function () {
  var a = document.getElementById('avatar');
  if (a) a.addEventListener('error', function () { a.classList.add('hidden'); });

  var m = document.getElementById('marquee');
  if (m) m.innerHTML += m.innerHTML;

  var el = document.getElementById('typed'); if (!el) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function phrases() { var l = document.documentElement.lang.indexOf('en') === 0 ? 'en' : 'pt'; return (I18N[l]['hero.roles'] || '').split('|'); }
  if (reduce) { el.textContent = phrases()[0] || ''; return; }
  var i = 0, n = 0, del = false;
  (function tick() {
    var list = phrases(), full = list[i % list.length] || '';
    n += del ? -1 : 1; el.textContent = full.slice(0, Math.max(n, 0));
    var d = del ? 35 : 75;
    if (!del && n >= full.length) { del = true; d = 1600; }
    else if (del && n <= 0) { del = false; i++; d = 350; }
    setTimeout(tick, d);
  })();
} };
