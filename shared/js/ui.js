/* UI compartilhada: menu, link ativo, barra de progresso, contadores, animações de entrada e efeito 3D nos cards. */
window.UI = { init: function () {
  var nav = document.getElementById('nav'), btn = document.getElementById('menuBtn');
  function close() { if (nav) nav.classList.remove('open'); if (btn) btn.setAttribute('aria-expanded', 'false'); }
  if (btn && nav) {
    btn.addEventListener('click', function (e) { e.stopPropagation(); btn.setAttribute('aria-expanded', String(nav.classList.toggle('open'))); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target)) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    matchMedia('(min-width: 820px)').addEventListener('change', close);
  }
  var page = document.body.dataset.page;
  document.querySelectorAll('.nav a[data-page]').forEach(function (a) { if (a.dataset.page === page) a.setAttribute('aria-current', 'page'); });
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* Barra de progresso de rolagem + sombra no cabeçalho */
  var bar = document.getElementById('progress'), head = document.querySelector('.site-header');
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    if (head) head.classList.toggle('scrolled', h.scrollTop > 8);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Entrada ao rolar + contadores */
  function count(el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', t0 = null;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = end + suf; return; }
    (function step(ts) { t0 = t0 || ts; var p = Math.min((ts - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); })(performance.now());
  }
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); document.querySelectorAll('[data-count]').forEach(function (c) { c.textContent = c.dataset.count + (c.dataset.suffix || ''); }); }
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
      if (!e.isIntersecting) return; e.target.classList.add('in');
      e.target.querySelectorAll('[data-count]').forEach(count); io.unobserve(e.target);
    }); }, { threshold: .12 });
    els.forEach(function (e, i) { if (!e.style.getPropertyValue('--d')) e.style.setProperty('--d', (i % 4) * 0.08 + 's'); io.observe(e); });
  }

  /* Efeito 3D sutil (apenas com mouse) */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.tilt').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.setProperty('--ry', (x * 6) + 'deg'); c.style.setProperty('--rx', (-y * 6) + 'deg');
      });
      c.addEventListener('mouseleave', function () { c.style.setProperty('--ry', '0deg'); c.style.setProperty('--rx', '0deg'); });
    });
  }
} };
