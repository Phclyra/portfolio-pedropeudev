/* Página: Contato. Botão "Copiar número". */
window.Page = { init: function () {
  var b = document.getElementById('copyPhone'); if (!b) return;
  b.addEventListener('click', function () {
    var old = b.textContent;
    function done() { b.textContent = document.documentElement.lang === 'en' ? 'Copied!' : 'Copiado!'; setTimeout(function () { b.textContent = old; }, 1800); }
    try { navigator.clipboard.writeText('+5581983641665').then(done, function () {}); } catch (e) {}
  });
} };
