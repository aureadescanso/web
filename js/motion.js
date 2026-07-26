/* =============================================
   NUVORA DESCANSO — Capa de movimiento
   1) Cascada automática en rejillas (sin data-delay a mano)
   2) Tipos de revelado según el elemento (tarjeta / imagen / título)
   3) La foto del producto VUELA de la tarjeta a la ficha
      (View Transitions: el nombre debe existir en las dos páginas)
   Se carga después de main.js y sustituye su observer genérico.
   ============================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Avisa a main.js de que esta capa se encarga del revelado */
  window.__nuvoraMotion = true;

  document.addEventListener('DOMContentLoaded', function () {

    /* ── 1 y 2. Revelado con cascada y variantes ──
       En vez de que todo suba 20 px igual, cada tipo de elemento
       entra a su manera y los hermanos de una rejilla se encadenan. */
    (function () {
      var items = document.querySelectorAll('[data-animate]');
      if (!items.length) return;

      /* Deduce cómo debe entrar cada elemento por lo que ES */
      function variantOf(el) {
        if (el.hasAttribute('data-anim')) return el.getAttribute('data-anim');
        if (el.classList.contains('pcard') || el.classList.contains('bcard') ||
            el.classList.contains('producto') || el.classList.contains('seal')) return 'card';
        if (el.classList.contains('section-title') ||
            el.classList.contains('promesa__head')) return 'title';
        if (el.tagName === 'IMG' || el.querySelector(':scope > img')) return 'wipe';
        return 'up';
      }

      /* Posición dentro de su grupo → retardo en cascada */
      var groups = {};
      Array.prototype.forEach.call(items, function (el) {
        el.setAttribute('data-anim', variantOf(el));

        /* Si ya trae data-delay escrito a mano, se respeta */
        if (el.hasAttribute('data-delay')) return;

        var parent = el.parentNode;
        var key = groups[parent] ? parent : null;
        if (!key) {
          groups[parent] = { n: 0, node: parent };
          key = parent;
        }
        var siblings = parent.querySelectorAll(':scope > [data-animate]');
        if (siblings.length > 1) {
          var idx = Array.prototype.indexOf.call(siblings, el);
          /* cascada corta: se nota, pero no se hace esperar */
          el.setAttribute('data-delay', String(Math.min(idx, 5) * 90));
        }
      });

      if (reduce || !('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(items, function (el) { el.classList.add('is-visible'); });
        return;
      }

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

      Array.prototype.forEach.call(items, function (el) { io.observe(el); });

      /* Red de seguridad: nada puede quedarse invisible.
         Si un elemento queda POR ENCIMA de la ventana (scroll muy rápido,
         llegada con enlace #ancla o restauración de posición), el observer
         puede no haberlo visto nunca: se muestra sin animación. */
      function rescue() {
        Array.prototype.forEach.call(items, function (el) {
          if (el.classList.contains('is-visible')) return;
          if (el.getBoundingClientRect().bottom < 0) {
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      }
      window.addEventListener('scroll', rescue, { passive: true });
      window.addEventListener('load', rescue);
      setTimeout(rescue, 500);
    })();


    /* ── 3. La foto vuela de la tarjeta a la ficha ──
       View Transitions exige el MISMO view-transition-name en la página
       de origen y en la de destino. La ficha ya lo tiene (.pdp__main img);
       aquí se lo ponemos —solo al hacer clic— a la imagen elegida. */
    (function () {
      if (reduce || !document.startViewTransition) return;

      var links = document.querySelectorAll('.pcard__media, .producto__img, .pcard__name a, .producto__name a');
      if (!links.length) return;

      function markHero(link) {
        /* Busca la imagen de esa tarjeta (el enlace del título no la contiene) */
        var card = link.closest('.pcard, .producto');
        var img = link.querySelector('img') || (card && card.querySelector('img'));
        if (!img) return;
        /* El nombre debe ser único en la página */
        document.querySelectorAll('[style*="view-transition-name"]').forEach(function (n) {
          n.style.viewTransitionName = '';
        });
        img.style.viewTransitionName = 'hero-product';
      }

      Array.prototype.forEach.call(links, function (link) {
        link.addEventListener('click', function () { markHero(link); });
      });

      /* Al volver atrás, se limpia para no dejar nombres duplicados */
      window.addEventListener('pageswap', function () {
        document.querySelectorAll('[style*="view-transition-name"]').forEach(function (n) {
          n.style.viewTransitionName = '';
        });
      });
    })();

  });
})();
