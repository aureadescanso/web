/* =============================================
   AUREA DESCANSO — Interacciones premium
   Halo del hero · Cursor magnético · Sellos
   ============================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {

    /* ── 2. Halo de luz que sigue al cursor en el hero ── */
    var hero = document.getElementById('hero');
    if (hero && !reduce && window.matchMedia('(hover: hover)').matches) {
      var glow = document.createElement('div');
      glow.className = 'hero__glow';
      glow.setAttribute('aria-hidden', 'true');
      hero.insertBefore(glow, hero.firstChild);
      var gx = 0, gy = 0, cx = 0, cy = 0, raf = null;
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        gx = e.clientX - r.left;
        gy = e.clientY - r.top;
        if (!raf) raf = requestAnimationFrame(follow);
      });
      function follow() {
        cx += (gx - cx) * 0.12;
        cy += (gy - cy) * 0.12;
        glow.style.transform = 'translate(' + (cx - 270) + 'px,' + (cy - 270) + 'px)';
        if (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5) {
          raf = requestAnimationFrame(follow);
        } else { raf = null; }
      }
    }

    /* ── 5. Cursor magnético en los botones principales ── */
    if (!reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var magnets = document.querySelectorAll('.btn--solid, .pdp__buy-btn, .crossband__btn, .giftband__btn, .header__cta');
      magnets.forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
          var r = el.getBoundingClientRect();
          var mx = e.clientX - r.left - r.width / 2;
          var my = e.clientY - r.top - r.height / 2;
          el.style.transform = 'translate(' + (mx * 0.22) + 'px,' + (my * 0.28) + 'px)';
        });
        el.addEventListener('mouseleave', function () {
          el.style.transform = '';
        });
      });
    }

    /* ── Foco de luz que recorre las bandas navy ── */
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      ['.promesa', '.crossband__inner', '.giftband__inner'].forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (host) {
          host.classList.add('spot-host');
          var g = document.createElement('div');
          g.className = 'spot-glow';
          g.setAttribute('aria-hidden', 'true');
          host.appendChild(g);
          host.addEventListener('mousemove', function (e) {
            var r = host.getBoundingClientRect();
            g.style.transform = 'translate(' + (e.clientX - r.left - 230) + 'px,' +
              (e.clientY - r.top - 230) + 'px)';
          });
        });
      });
    }

    /* ── 7. Sellos: dibujan su icono al entrar en pantalla ── */
    /* Helper genérico: dibuja los iconos de un grupo al entrar en pantalla */
    function drawOnScroll(nodes, prepClass, stagger) {
      if (!nodes.length || !('IntersectionObserver' in window) || reduce) return;
      nodes.forEach(function (n) { n.classList.add(prepClass); });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = Array.prototype.indexOf.call(nodes, e.target);
            setTimeout(function () { e.target.classList.add('is-drawn'); }, i * stagger);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      nodes.forEach(function (n) { io.observe(n); });
    }

    /* 7. Sellos de la home */
    drawOnScroll(document.querySelectorAll('.seal'), 'seal--draw', 140);
    /* 7-bis. Pills de confianza en la ficha (envío · prueba · garantía) */
    drawOnScroll(document.querySelectorAll('.pdp__trust .trust-pill'), 'trust-pill--draw', 130);
  });
})();
