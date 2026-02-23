/* =============================================
   AUREA DESCANSO — Cinematic Experience JS
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ══════════════════════════════════════════════
     SCROLL PROGRESS BAR
     ══════════════════════════════════════════════ */
  var progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!progressBar) return;
    var scrolled = window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (max > 0) progressBar.style.width = ((scrolled / max) * 100) + '%';
  }


  /* ══════════════════════════════════════════════
     CUSTOM CURSOR
     ══════════════════════════════════════════════ */
  var cursor = document.getElementById('customCursor');

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    var curX = -100, curY = -100;
    var rafCursor;

    document.addEventListener('mousemove', function (e) {
      curX = e.clientX;
      curY = e.clientY;
    });

    function tickCursor() {
      cursor.style.left = curX + 'px';
      cursor.style.top  = curY + 'px';
      rafCursor = requestAnimationFrame(tickCursor);
    }
    tickCursor();

    // Ampliar al pasar por interactivos
    document.querySelectorAll('a, button, [href], .producto').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('is-hover'); });
    });
  }


  /* ══════════════════════════════════════════════
     HEADER SCROLL
     ══════════════════════════════════════════════ */
  var header = document.getElementById('header');

  function onScroll() {
    var y = window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 10);
    updateScrollProgress();
    heroParallax(y);
    revealBridgeText(y);
  }
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ══════════════════════════════════════════════
     MOBILE MENU
     ══════════════════════════════════════════════ */
  var burger     = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');

  burger.addEventListener('click', function () {
    var open = mobileMenu.classList.toggle('is-open');
    burger.classList.toggle('is-active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      burger.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });


  /* ══════════════════════════════════════════════
     SMOOTH SCROLL
     ══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ══════════════════════════════════════════════
     FADE-IN ON SCROLL (secciones generales)
     ══════════════════════════════════════════════ */
  var animated = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animated.forEach(function (el) { io.observe(el); });
  } else {
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  }


  /* ══════════════════════════════════════════════
     HERO — CANVAS DE PARTÍCULAS
     Algodón/plumas suaves flotando hacia arriba
     ══════════════════════════════════════════════ */
  (function () {
    var canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, RAF;
    var particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Número de partículas proporcional al viewport
    var COUNT = Math.min(55, Math.max(20, Math.floor(window.innerWidth / 22)));

    for (var i = 0; i < COUNT; i++) {
      particles.push(makeParticle(true));
    }

    function makeParticle(randomY) {
      var r = 2.5 + Math.random() * 4.5;
      return {
        x:    Math.random() * W,
        y:    randomY ? Math.random() * H : H + r,
        r:    r,
        // velocidad vertical (hacia arriba) muy suave
        vy:   -(0.25 + Math.random() * 0.45),
        // deriva lateral suave
        drift: Math.random() * Math.PI * 2,
        driftAmp:  0.3 + Math.random() * 0.4,
        driftSpeed: 0.006 + Math.random() * 0.01,
        // opacidad muy baja — efecto nube algodón
        op:   0.04 + Math.random() * 0.1,
        // variación de tamaño (respiración)
        breathPhase: Math.random() * Math.PI * 2,
        breathSpeed: 0.008 + Math.random() * 0.006
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Movimiento
        p.drift += p.driftSpeed;
        p.breathPhase += p.breathSpeed;
        p.x += Math.sin(p.drift) * p.driftAmp;
        p.y += p.vy;

        // Respiración del tamaño (±15%)
        var breathR = p.r * (1 + 0.15 * Math.sin(p.breathPhase));

        // Reciclar al salir por arriba
        if (p.y + breathR < 0) {
          particles[i] = makeParticle(false);
          continue;
        }
        // Reciclar bordes horizontales
        if (p.x < -breathR * 2)   p.x = W + breathR;
        if (p.x >  W + breathR * 2) p.x = -breathR;

        // Dibujar como círculo con gradiente radial difuso (efecto algodón)
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, breathR * 2.5);
        g.addColorStop(0,   'rgba(180, 188, 210, ' + p.op + ')');
        g.addColorStop(0.6, 'rgba(180, 188, 210, ' + (p.op * 0.5) + ')');
        g.addColorStop(1,   'rgba(180, 188, 210, 0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, breathR * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      RAF = requestAnimationFrame(draw);
    }
    draw();

    // Pausar animación cuando el hero sale del viewport (ahorro CPU)
    var heroEl = document.getElementById('hero');
    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!RAF) draw();
        } else {
          cancelAnimationFrame(RAF);
          RAF = null;
        }
      }, { threshold: 0 }).observe(heroEl);
    }
  })();


  /* ══════════════════════════════════════════════
     HERO — TYPEWRITER
     Escribe "Duerme como nunca." letra a letra
     ══════════════════════════════════════════════ */
  var typeTextEl  = document.getElementById('heroTypeText');
  var typeCursor  = document.querySelector('.hero__type-cursor');
  var heroSub     = document.getElementById('heroSub');
  var heroButtons = document.getElementById('heroButtons');
  var FULL_TEXT   = 'Duerme como nunca.';
  var typeIdx     = 0;

  function typeNext() {
    if (!typeTextEl) return;
    typeTextEl.textContent += FULL_TEXT[typeIdx];
    typeIdx++;
    if (typeIdx < FULL_TEXT.length) {
      // Velocidad irregular para efecto más humano
      var delay = typeIdx < 7 ? 90 + Math.random() * 60
                              : 55 + Math.random() * 50;
      setTimeout(typeNext, delay);
    } else {
      // Texto completo → esconder cursor → revelar subtítulo y botones
      setTimeout(function () {
        if (typeCursor) typeCursor.classList.add('is-done');
        if (heroSub) {
          heroSub.style.transitionDelay = '0s';
          heroSub.classList.add('is-visible');
        }
        if (heroButtons) {
          heroButtons.style.transitionDelay = '0.22s';
          heroButtons.classList.add('is-visible');
        }
      }, 500);
    }
  }
  // Arrancar el typewriter 500ms después de que carga la página
  setTimeout(typeNext, 500);


  /* ══════════════════════════════════════════════
     HERO — PARALLAX (texto más lento que fondo)
     ══════════════════════════════════════════════ */
  var heroContent = document.getElementById('heroContent');
  var heroEl      = document.getElementById('hero');

  function heroParallax(scrollY) {
    if (!heroContent || !heroEl) return;
    var heroH = heroEl.offsetHeight;
    if (scrollY < heroH) {
      // El texto se eleva suavemente: 8% del scroll → efecto profundidad
      heroContent.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
      // Fade out del contenido hero al acercarse al final de la sección
      heroContent.style.opacity = Math.max(0, 1 - scrollY / (heroH * 0.68)).toString();
    }
  }


  /* ══════════════════════════════════════════════
     ESCENA 2 — BRIDGE TEXT: "Cuando cierras los ojos..."
     Se revela al hacer scroll hacia la transición
     ══════════════════════════════════════════════ */
  var bridgeText = document.getElementById('bridgeText');
  var bridgeEl   = document.getElementById('gradientBridge');

  function revealBridgeText(scrollY) {
    if (!bridgeText || !bridgeEl) return;
    var rect = bridgeEl.getBoundingClientRect();
    // Aparecer cuando el puente está en la mitad inferior del viewport
    if (rect.top < window.innerHeight * 0.65) {
      bridgeText.classList.add('is-visible');
    }
  }

  // Llamada inicial por si la página carga scrolleada
  revealBridgeText(window.pageYOffset);


  /* ══════════════════════════════════════════════
     ESCENA 3 — ESTRELLAS en la sección Conoce Aurea
     ══════════════════════════════════════════════ */
  (function () {
    var starsEl = document.getElementById('conoceStars');
    if (!starsEl) return;

    var frag = document.createDocumentFragment();
    var COUNT = 65;

    for (var i = 0; i < COUNT; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      var size    = 1 + Math.random() * 2.5;
      var opacity = 0.15 + Math.random() * 0.65;
      var dur     = 2.5 + Math.random() * 5;
      var delay   = Math.random() * 6;

      s.style.cssText =
        'left:'                + (Math.random() * 100) + '%;' +
        'top:'                 + (Math.random() * 100) + '%;' +
        'width:'               + size + 'px;'  +
        'height:'              + size + 'px;'  +
        '--star-op:'           + opacity + ';' +
        'animation-duration:'  + dur   + 's;'  +
        'animation-delay:'     + delay + 's;';

      frag.appendChild(s);
    }
    starsEl.appendChild(frag);
  })();


  /* ══════════════════════════════════════════════
     ONDAS REACTIVAS AL MOUSE
     Las ondas se deforman sutilmente con el cursor
     ══════════════════════════════════════════════ */
  (function () {
    var conoceEl = document.getElementById('conoce');
    var wavesEl  = document.getElementById('conoceWaves');
    if (!conoceEl || !wavesEl) return;

    conoceEl.addEventListener('mousemove', function (e) {
      var rect = this.getBoundingClientRect();
      var mx   = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5 a 0.5
      var my   = (e.clientY - rect.top)   / rect.height - 0.5;
      // Desplazamiento vertical del contenedor de ondas + leve escala horizontal
      wavesEl.style.transform =
        'translateY(' + (my * 20) + 'px) scaleX(' + (1 + mx * 0.018) + ')';
    });

    conoceEl.addEventListener('mouseleave', function () {
      wavesEl.style.transform = '';
    });
  })();


  /* ══════════════════════════════════════════════
     PRODUCTOS — EFECTO TILT 3D
     Las tarjetas se inclinan siguiendo el cursor
     ══════════════════════════════════════════════ */
  (function () {
    // Solo en dispositivos con puntero preciso
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var cards = document.querySelectorAll('.producto--tilt');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = this.getBoundingClientRect();
        var mx   = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5 a 0.5
        var my   = (e.clientY - rect.top)   / rect.height - 0.5;

        // Máximo ±5 grados
        var rotX = -(my * 10);
        var rotY =   mx * 10;

        // Sombra dinámica que sigue al cursor
        var shadowX = mx * 24;
        var shadowY = my * 24;

        this.style.transition = 'transform 0.12s ease, box-shadow 0.12s ease';
        this.style.transform  =
          'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.025)';
        this.style.boxShadow  =
          shadowX + 'px ' + (shadowY + 8) + 'px 40px rgba(0, 0, 0, 0.10)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transition = 'transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out)';
        this.style.transform  = '';
        this.style.boxShadow  = '';
      });
    });
  })();


  /* ══════════════════════════════════════════════
     TESTIMONIOS — Fade + dots + auto-rotate + swipe
     ══════════════════════════════════════════════ */
  (function () {
    var slidesContainer = document.getElementById('testimoniosSlides');
    var dotsContainer   = document.getElementById('testimoniosDots');
    if (!slidesContainer || !dotsContainer) return;

    var slides  = slidesContainer.querySelectorAll('.testimonio');
    var total   = slides.length;
    var current = 0;
    var timer;

    // Construir dots
    for (var i = 0; i < total; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'testimonios__dot' + (idx === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Testimonio ' + (idx + 1));
        dot.addEventListener('click', function () { goTo(idx); resetTimer(); });
        dotsContainer.appendChild(dot);
      })(i);
    }

    function goTo(index) {
      slides[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      dotsContainer.querySelectorAll('.testimonios__dot').forEach(function (d, idx) {
        d.classList.toggle('is-active', idx === current);
      });
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        if (!document.hidden) goTo((current + 1) % total);
      }, 6000);
    }
    resetTimer();

    // Swipe táctil
    var startX = 0;
    slidesContainer.addEventListener('touchstart', function (e) {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });
    slidesContainer.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && current < total - 1) { goTo(current + 1); resetTimer(); }
        else if (diff < 0 && current > 0)    { goTo(current - 1); resetTimer(); }
      }
    }, { passive: true });
  })();


  /* ══════════════════════════════════════════════
     COUNTERS ANIMADOS
     ══════════════════════════════════════════════ */
  (function () {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      if (el.getAttribute('data-done') === '1') return;
      el.setAttribute('data-done', '1');

      var isDecimal = el.hasAttribute('data-decimal');
      var target    = parseInt(el.getAttribute('data-target'), 10);
      var prefix    = el.getAttribute('data-prefix') || '';
      var start     = null;

      function ease(t) { return 1 - Math.pow(1 - t, 4); }

      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 2000, 1);
        var v = ease(p) * target;
        el.textContent = isDecimal
          ? (v / 10).toFixed(1) + '\u2605'
          : prefix + Math.floor(v).toLocaleString('es-ES');
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = isDecimal
            ? (target / 10).toFixed(1) + '\u2605'
            : prefix + target.toLocaleString('es-ES');
        }
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  })();


  /* ══════════════════════════════════════════════
     BENEFICIOS — Scrollytelling
     Sticky scroll 3 actos en desktop.
     IntersectionObserver por acto en móvil.
     ══════════════════════════════════════════════ */
  (function () {
    var track    = document.getElementById('beneficiosTrack');
    var acts     = document.querySelectorAll('.beneficios__act');
    var dots     = document.querySelectorAll('.beneficios__progress-dot');
    if (!track || !acts.length) return;

    var reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var activeIdx = 0; /* acto 0 ya tiene is-active en HTML */

    /* ─── Cambia el acto visible con animación direccional ─── */
    function setAct(idx) {
      if (idx === activeIdx) return;
      var prevIdx  = activeIdx;
      var goingFwd = idx > prevIdx;
      activeIdx = idx;

      acts.forEach(function (act, i) {
        act.classList.remove('is-active', 'is-prev');
        if (i === idx) {
          act.classList.add('is-active');
        } else if (i === prevIdx && goingFwd) {
          /* El acto que sale sube cuando avanzamos */
          act.classList.add('is-prev');
        }
        /* Al retroceder el acto saliente baja (estado por defecto translateY(44px)) */
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === idx);
      });
    }

    /* ═══ DESKTOP: scroll dentro del track ══════════════════ */
    if (!isMobile) {

      function onScrollDesktop() {
        var rect        = track.getBoundingClientRect();
        var scrollRange = track.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) { setAct(0); return; }
        var scrolled  = -rect.top;
        var progress  = Math.max(0, Math.min(1, scrolled / scrollRange));
        /* 3 actos iguales: 0-33%, 33-66%, 66-100% */
        setAct(Math.min(2, Math.floor(progress * 3)));
      }

      /* Activar el primer acto cuando el track entra en pantalla */
      if ('IntersectionObserver' in window) {
        var entryObs = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            entryObs.disconnect();
            onScrollDesktop();
          }
        }, { threshold: 0.05 });
        entryObs.observe(track);
      }

      window.addEventListener('scroll', onScrollDesktop, { passive: true });
      onScrollDesktop(); /* estado inicial */

      /* Click en puntos de progreso: scroll al acto correspondiente */
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var step        = parseInt(this.getAttribute('data-step'), 10);
          var trackTop    = track.getBoundingClientRect().top + window.pageYOffset;
          var scrollRange = track.offsetHeight - window.innerHeight;
          var target      = trackTop + (step / 3) * scrollRange;
          window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
        });
      });

    } else {
      /* ═══ MÓVIL: IntersectionObserver por acto ══════════════ */
      if ('IntersectionObserver' in window) {
        var actObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        }, { threshold: 0.25 });
        acts.forEach(function (act) { actObs.observe(act); });
      } else {
        acts.forEach(function (act) { act.classList.add('is-visible'); });
      }
    }

  })();

  /* ── fin BENEFICIOS ── fin ── */
  void (function () {
    /* bloque eliminado — lógica en scrollytelling IIFE arriba */
    if (true) return; /* early exit inmediato */

    /* ─── 1. CINEMÁTICA DE ENTRADA ─────────────────── */
    var cinemaOverlay = document.getElementById('beneficiosCinemaOverlay');
    var titleEl       = document.getElementById('beneficiosTitle');
    var cursorEl      = document.getElementById('beneficiosCursor');
    var underlinePath = section.querySelector('.beneficios__underline-path');
    var subtitleEl    = document.getElementById('beneficiosSubtitle');
    var TEXT          = '¿Por qué Aurea?';
    var entryDone     = false;

    function startCinematicEntry() {
      if (entryDone) return;
      entryDone = true;

      if (reduced) {
        if (cinemaOverlay) cinemaOverlay.classList.add('is-revealed');
        if (titleEl) { titleEl.textContent = TEXT; titleEl.classList.add('is-typing', 'is-morphed'); }
        if (cursorEl) cursorEl.style.display = 'none';
        if (underlinePath) underlinePath.classList.add('is-drawn');
        if (subtitleEl) subtitleEl.classList.add('is-focused');
        return;
      }

      /* Fase 1: fade del overlay negro */
      setTimeout(function () {
        if (cinemaOverlay) cinemaOverlay.classList.add('is-revealed');
      }, 250);

      /* Fase 2: aparece cursor parpadeante */
      setTimeout(function () {
        if (cursorEl) cursorEl.classList.add('is-active');
        if (titleEl)  { titleEl.textContent = ''; titleEl.classList.add('is-typing'); }
      }, 1000);

      /* Fase 3: typewriter letra a letra */
      var typeStart = 1380;
      for (var i = 0; i < TEXT.length; i++) {
        (function (idx, delay) {
          setTimeout(function () {
            if (titleEl) titleEl.textContent = TEXT.slice(0, idx + 1);
          }, delay);
        })(i, typeStart + i * 62);
      }

      /* Fase 4: morph a serif + ocultar cursor + dibujar línea */
      var morphAt = typeStart + TEXT.length * 62 + 320;
      setTimeout(function () {
        if (cursorEl) cursorEl.classList.remove('is-active');
        if (titleEl)  titleEl.classList.add('is-morphed');
        setTimeout(function () {
          if (underlinePath) underlinePath.classList.add('is-drawn');
        }, 180);
      }, morphAt);

      /* Fase 5: subtítulo blur-to-focus */
      setTimeout(function () {
        if (subtitleEl) subtitleEl.classList.add('is-focused');
      }, morphAt + 650);
    }

    if ('IntersectionObserver' in window) {
      var entryObs = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        entryObs.disconnect();
        startCinematicEntry();
      }, { threshold: 0.15 });
      entryObs.observe(section);
    } else {
      startCinematicEntry();
    }

    /* ─── 2. CANVAS ONDAS SINUSOIDALES + HALO ─────── */
    (function () {
      var canvas = document.getElementById('beneficiosCanvas');
      var halo   = document.getElementById('beneficiosCursorHalo');
      if (!canvas || reduced) return;

      var ctx = canvas.getContext('2d');
      var W = 0, H = 0, RAF = null;
      var targetMX = 0.5, targetMY = 0.5;
      var currentMX = 0.5, currentMY = 0.5;
      var t = 0;

      var WAVES = [
        { amp: 18, freq: 0.009, speed: 0.013, op: 0.07, r: 26, g: 58, b: 107 },
        { amp: 12, freq: 0.013, speed: 0.019, op: 0.05, r: 13, g: 27, b: 62  },
        { amp: 22, freq: 0.006, speed: 0.009, op: 0.04, r: 26, g: 58, b: 107 }
      ];

      function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize, { passive: true });

      function onMouseMove(e) {
        var rect = section.getBoundingClientRect();
        targetMX = (e.clientX - rect.left) / rect.width;
        targetMY = (e.clientY - rect.top)  / rect.height;
        if (halo) {
          halo.style.opacity = '1';
          halo.style.left    = (e.clientX - rect.left) + 'px';
          halo.style.top     = (e.clientY - rect.top)  + 'px';
        }
      }
      function onMouseLeave() {
        targetMX = 0.5; targetMY = 0.5;
        if (halo) halo.style.opacity = '0';
      }

      if (isFine) {
        section.addEventListener('mousemove',  onMouseMove,  { passive: true });
        section.addEventListener('mouseleave', onMouseLeave);
      }

      function drawFrame() {
        if (!W || !H) { RAF = requestAnimationFrame(drawFrame); return; }

        currentMX += (targetMX - currentMX) * 0.04;
        currentMY += (targetMY - currentMY) * 0.04;

        ctx.clearRect(0, 0, W, H);

        for (var w = 0; w < WAVES.length; w++) {
          var wv = WAVES[w];
          var distort = (currentMX - 0.5) * 28;
          ctx.beginPath();
          for (var x = 0; x <= W; x += 2) {
            var nx = x / W;
            var mouseInfluence = Math.exp(-Math.pow(nx - currentMX, 2) / 0.08) * currentMY * 18;
            var y = H * 0.5
                  + Math.sin(x * wv.freq + t * wv.speed) * wv.amp
                  + Math.cos(x * wv.freq * 0.7 + t * wv.speed * 1.3) * (wv.amp * 0.4)
                  + mouseInfluence
                  + distort * Math.sin(x * wv.freq * 2);
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
          ctx.fillStyle = 'rgba(' + wv.r + ',' + wv.g + ',' + wv.b + ',' + wv.op + ')';
          ctx.fill();
        }
        t++;
        RAF = requestAnimationFrame(drawFrame);
      }

      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          if (!W || !H) resize();
          if (!RAF) drawFrame();
        } else {
          cancelAnimationFrame(RAF); RAF = null;
        }
      }, { threshold: 0 }).observe(section);
    })();

    /* ─── 3. STAGGER DE TARJETAS ────────────────────── */
    (function () {
      var cards = document.querySelectorAll('#beneficiosGrid .beneficio');
      if (!cards.length) return;

      if ('IntersectionObserver' in window) {
        var cardObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var idx   = parseInt(entry.target.getAttribute('data-card-idx') || '0', 10);
            var delay = (reduced || !isDesktop) ? 0 : idx * 200;
            setTimeout(function () { entry.target.classList.add('is-visible'); }, delay);
            cardObs.unobserve(entry.target);
          });
        }, { threshold: 0.15 });
        cards.forEach(function (card, i) {
          card.setAttribute('data-card-idx', i);
          cardObs.observe(card);
        });
      } else {
        cards.forEach(function (c) { c.classList.add('is-visible'); });
      }
    })();

    /* ─── 4. TILT 3D EN TARJETAS ────────────────────── */
    (function () {
      if (!isFine || reduced) return;
      var cards = document.querySelectorAll('#beneficiosGrid .beneficio');

      cards.forEach(function (card) {
        function onMove(e) {
          var rect = card.getBoundingClientRect();
          var mx = (e.clientX - rect.left) / rect.width  - 0.5;
          var my = (e.clientY - rect.top)  / rect.height - 0.5;
          card.style.transition = 'transform 0.1s ease, box-shadow 0.1s ease';
          card.style.transform  = 'perspective(800px) rotateX(' + (-my * 14) + 'deg) rotateY(' + (mx * 14) + 'deg) translateZ(12px)';
          card.style.boxShadow  = (-mx * 20) + 'px ' + (-my * 20 + 8) + 'px 40px rgba(13,27,62,0.15)';
        }
        function onLeave() {
          card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.6s cubic-bezier(0.16,1,0.3,1)';
          card.style.transform  = '';
          card.style.boxShadow  = '';
        }
        card.addEventListener('mousemove',  onMove);
        card.addEventListener('mouseleave', onLeave);
      });
    })();

    /* ─── 5. CONTADORES CINEMATOGRÁFICOS ──────────────── */
    (function () {
      var counters = document.querySelectorAll('#beneficiosGrid .beneficio__counter');
      if (!counters.length) return;

      function animateCounter(el) {
        var target   = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1800;
        var startTs  = null;
        function ease(t) { return 1 - Math.pow(1 - t, 3); }
        function step(ts) {
          if (!startTs) startTs = ts;
          var progress = Math.min((ts - startTs) / duration, 1);
          el.textContent = Math.round(ease(progress) * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
            el.style.transition = 'color 0.15s, text-shadow 0.15s';
            el.style.color = '#1a3a6b';
            el.style.textShadow = '0 0 14px rgba(26,58,107,0.45)';
            setTimeout(function () { el.style.textShadow = ''; }, 420);
          }
        }
        if (reduced) { el.textContent = target; return; }
        requestAnimationFrame(step);
      }

      if ('IntersectionObserver' in window) {
        var cntObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            cntObs.unobserve(entry.target);
          });
        }, { threshold: 0.35 });
        counters.forEach(function (el) { cntObs.observe(el); });
      } else {
        counters.forEach(animateCounter);
      }
    })();

    /* ─── 6. RIPPLE + ACORDEÓN AL CLICK ──────────────── */
    (function () {
      var cards = document.querySelectorAll('#beneficiosGrid .beneficio');

      cards.forEach(function (card) {
        function activate(e) {
          var isOpen = card.classList.contains('is-expanded');

          /* Ripple (solo click con ratón) */
          if (e.type === 'click' && e.clientX && !reduced) {
            var rect   = card.getBoundingClientRect();
            var ripple = document.createElement('span');
            ripple.className  = 'beneficio__ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top  = (e.clientY - rect.top)  + 'px';
            card.appendChild(ripple);
            setTimeout(function () { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 800);
          }

          /* Colapsar todas las demás */
          cards.forEach(function (c) {
            if (c !== card) {
              c.classList.remove('is-expanded');
              c.setAttribute('aria-expanded', 'false');
              var exp = c.querySelector('.beneficio__expanded');
              if (exp) exp.setAttribute('aria-hidden', 'true');
            }
          });

          /* Toggle este */
          if (isOpen) {
            card.classList.remove('is-expanded');
            card.setAttribute('aria-expanded', 'false');
            var exp = card.querySelector('.beneficio__expanded');
            if (exp) exp.setAttribute('aria-hidden', 'true');
          } else {
            card.classList.add('is-expanded');
            card.setAttribute('aria-expanded', 'true');
            var exp = card.querySelector('.beneficio__expanded');
            if (exp) exp.setAttribute('aria-hidden', 'false');
          }
        }

        card.addEventListener('click', activate);
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(e); }
        });
      });
    })();

    /* ─── 7. BARRA DE PROGRESO DE SCROLL ────────────── */
    (function () {
      var bar = document.getElementById('beneficiosScrollProgress');
      if (!bar) return;

      function update() {
        var rect    = section.getBoundingClientRect();
        var sectionH = section.offsetHeight;
        var viewH    = window.innerHeight;
        var scrolled = -rect.top;
        var total    = sectionH - viewH;
        var pct      = Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0));
        bar.style.height = (pct * 100) + '%';
      }

      window.addEventListener('scroll', update, { passive: true });
      update();
    })();

  })();

});
