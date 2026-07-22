/* =============================================
   NUVORA DESCANSO — Blog
   1) Índice: filtro por categoría
   2) Artículo: barra de progreso de lectura
   3) Artículo: índice lateral con scrollspy
   4) Artículo: compartir
   Sin dependencias, ES5, misma estética del resto.
   ============================================= */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Filtro por categoría (blog.html) ── */
  (function () {
    var box = document.getElementById('blogFilter');
    var grid = document.getElementById('blogGrid');
    if (!box || !grid) return;

    var chips = box.querySelectorAll('.blogfilter__chip');
    var cards = grid.querySelectorAll('.bcard');
    var empty = document.getElementById('blogEmpty');

    function apply(filter) {
      var shown = 0;
      Array.prototype.forEach.call(cards, function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('is-filtered', !match);
        if (match) {
          shown++;
          if (!reduce) {
            card.classList.remove('is-entering');
            /* reinicia la animación de entrada */
            void card.offsetWidth;
            card.classList.add('is-entering');
          }
        }
      });
      if (empty) empty.hidden = shown > 0;
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        Array.prototype.forEach.call(chips, function (c) {
          c.classList.remove('is-active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');
        apply(chip.getAttribute('data-filter'));
      });
    });
  })();

  /* ── 2 a 5. Solo en páginas de artículo ── */
  var article = document.querySelector('.article-content__inner');
  if (!article) return;

  /* ── 2. Portada ilustrada en la cabecera ── */
  (function () {
    var hero = document.querySelector('.article-hero');
    if (!hero || hero.querySelector('.article-hero__cover')) return;
    var slug = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    if (!slug) return;

    var fig = document.createElement('div');
    fig.className = 'article-hero__cover';
    var img = document.createElement('img');
    img.src = '../images/blog/' + slug + '.svg';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    /* si no existe portada para este artículo, no se muestra nada */
    img.onerror = function () { fig.remove(); };
    fig.appendChild(img);
    hero.appendChild(fig);
  })();

  /* ── 2. Barra de progreso de lectura ── */
  (function () {
    var bar = document.createElement('div');
    bar.className = 'readbar';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var done = -rect.top;
      var p = total > 0 ? Math.min(Math.max(done / total, 0), 1) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  /* ── 3. Índice lateral con scrollspy ── */
  (function () {
    var heads = article.querySelectorAll('h2[id]');
    if (heads.length < 3) return;

    var rail = document.createElement('nav');
    rail.className = 'tocrail';
    rail.setAttribute('aria-label', 'Índice del artículo');

    var links = [];
    Array.prototype.forEach.call(heads, function (h) {
      var a = document.createElement('a');
      a.className = 'tocrail__item';
      a.href = '#' + h.id;
      a.textContent = h.textContent.trim();
      rail.appendChild(a);
      links.push(a);
    });
    document.body.appendChild(rail);

    function onScroll() {
      var top = article.getBoundingClientRect().top;
      /* muestra el índice solo mientras se lee el cuerpo del artículo */
      rail.classList.toggle('is-on', top < 0 && top > -(article.offsetHeight - 400));

      var current = 0;
      Array.prototype.forEach.call(heads, function (h, i) {
        if (h.getBoundingClientRect().top < 140) current = i;
      });
      links.forEach(function (a, i) {
        a.classList.toggle('is-current', i === current);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ── 4. Compartir ── */
  (function () {
    var cta = article.querySelector('.article-cta');
    var box = document.createElement('div');
    box.className = 'artshare';

    var url = window.location.href.split('#')[0];
    var title = (document.querySelector('.article-hero__title') || document.querySelector('h1') || {}).textContent || document.title;
    title = title.trim();

    var html =
      '<span class="artshare__label">Compartir</span>' +
      '<a class="artshare__btn" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=' +
        encodeURIComponent(title + ' — ' + url) + '">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5.2-.4v-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.6.6 1.9.5 2.3.5a2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2z"/></svg>' +
        'WhatsApp</a>' +
      '<a class="artshare__btn" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(url) + '">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V7c0-.7.5-.9.8-.9h2V3h-2.6C11.4 3 10.7 5 10.7 6.3v2.2H9V12h1.7v9H14v-9h2.4l.3-3.5H14z"/></svg>' +
        'Facebook</a>' +
      '<button class="artshare__btn" type="button" id="artCopy">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>' +
        '<span>Copiar enlace</span></button>';
    box.innerHTML = html;

    if (cta && cta.parentNode) cta.parentNode.insertBefore(box, cta);
    else article.appendChild(box);

    var copyBtn = document.getElementById('artCopy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var label = copyBtn.querySelector('span');
        function done() {
          copyBtn.classList.add('is-done');
          label.textContent = '¡Copiado!';
          setTimeout(function () {
            copyBtn.classList.remove('is-done');
            label.textContent = 'Copiar enlace';
          }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(done, function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = url;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    }
  })();

})();
