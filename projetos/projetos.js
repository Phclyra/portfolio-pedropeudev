/* Página: Projetos. Mostra o print real do site; se o arquivo não existir, o cartão mantém o fundo em gradiente. */
window.Page = { init: function () {
  document.querySelectorAll('.shot img').forEach(function (img) {
    img.addEventListener('error', function () { img.classList.add('hidden'); });
  });
} };
