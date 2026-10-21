/* Ponto de entrada: inicializa os módulos compartilhados e depois o script da página (Page.init, se existir). */
document.addEventListener('DOMContentLoaded', function () {
  Lang.init(); Theme.init(); UI.init();
  if (window.Page && typeof Page.init === 'function') Page.init();
});
