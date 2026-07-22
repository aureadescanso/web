/* =============================================
   NUVORA DESCANSO — Cinematic Experience JS
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
  function heroTitle() {
    return (window.NuvoraI18n && window.NuvoraI18n.t('hero.title')) || 'Duerme como nunca.';
  }
  var FULL_TEXT   = heroTitle();
  var typeIdx     = 0;

  /* Al cambiar de idioma, el título se actualiza al instante (sin re-teclear) */
  window.addEventListener('nuvora:lang', function () {
    if (!typeTextEl) return;
    if (typeIdx >= FULL_TEXT.length) {
      FULL_TEXT = heroTitle();
      typeIdx = FULL_TEXT.length;
      typeTextEl.textContent = FULL_TEXT;
    } else {
      FULL_TEXT = heroTitle();
    }
  });

  function typeNext() {
    if (!typeTextEl) return;
    typeTextEl.textContent += FULL_TEXT[typeIdx];
    typeIdx++;
    if (typeIdx < FULL_TEXT.length) {
      // Velocidad irregular para efecto más humano (ágil: el hero no debe hacerse esperar)
      var delay = typeIdx < 7 ? 55 + Math.random() * 35
                              : 32 + Math.random() * 28;
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
          heroButtons.style.transitionDelay = '0.12s';
          heroButtons.classList.add('is-visible');
        }
      }, 180);
    }
  }
  // Arrancar el typewriter 300ms después de que carga la página
  setTimeout(typeNext, 300);


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
     TESTIMONIOS — Stagger Cards
     ══════════════════════════════════════════════ */
  (function () {
    var stage = document.getElementById('staggerStage');
    var prevBtn = document.getElementById('staggerPrev');
    var nextBtn = document.getElementById('staggerNext');
    if (!stage) return;

    var testimonials = [
      { quote: 'Llevaba años con dolor de espalda. Desde que tengo el Nuvora Aurea, duermo como nunca. La diferencia se nota desde la primera noche.', cite: 'María López — Madrid', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face' },
      { quote: 'El proceso de compra fue sencillísimo. Llegó en 3 días, lo saqué de la caja y en minutos estaba listo. Estamos encantados.', cite: 'Carlos García — Barcelona', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Probé las 100 noches convencida de que lo devolvería. Ocho meses después, sigo durmiendo de maravilla.', cite: 'Ana Ruiz — Valencia', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Mi pareja se mueve mucho por la noche. Con el Nuvora Serenity, no me entero. La independencia de lechos es real.', cite: 'Javier Moreno — Sevilla', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Nos costó decidir, pero la garantía de 5 años nos convenció. Tres años después, está como el primer día.', cite: 'Laura y Pablo — Bilbao', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face' },
      { quote: 'He probado colchones de 1.500 €. Este de 499 € los supera con creces. Eliminar intermediarios se nota.', cite: 'Fernando Díaz — Málaga', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Sufro de calor por las noches y este colchón transpira de verdad: no acumula calor y por fin duermo del tirón hasta la mañana.', cite: 'Carmen Vega — Zaragoza', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Lo compré para mi madre. Tiene 72 años y dice que no dormía tan bien desde joven. Eso no tiene precio.', cite: 'Roberto Sanz — A Coruña', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Soy fisioterapeuta y lo recomiendo a mis pacientes. La firmeza media es perfecta para la columna.', cite: 'Elena Torres — Murcia', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Pedí un sábado, llegó el martes. Desempaquetar fue casi divertido. Calidad brutal por ese precio.', cite: 'Diego Herrera — Valladolid', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Después de comparar 20 marcas online, Nuvora fue la que mejor relación calidad-precio ofrecía. Acerté.', cite: 'Sofía Martín — Alicante', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=96&h=96&fit=crop&crop=face' },
      { quote: 'Lo mejor: sin tienda física, sin vendedor presionando. Compras tranquilo y si no te gusta, te lo recogen.', cite: 'Marcos Peña — Granada', img: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=96&h=96&fit=crop&crop=face' }
    ];

    var cardSize = window.matchMedia('(min-width: 640px)').matches ? 340 : 270;

    function handleResize() {
      cardSize = window.matchMedia('(min-width: 640px)').matches ? 340 : 270;
      render();
    }
    window.addEventListener('resize', handleResize);

    function handleMove(steps) {
      if (steps > 0) {
        for (var i = 0; i < steps; i++) {
          testimonials.push(testimonials.shift());
        }
      } else {
        for (var i = 0; i < Math.abs(steps); i++) {
          testimonials.unshift(testimonials.pop());
        }
      }
      render();
    }

    function render() {
      stage.innerHTML = '';
      var half = Math.floor(testimonials.length / 2);

      testimonials.forEach(function (t, index) {
        var position = index - half;
        var isCenter = position === 0;

        var card = document.createElement('div');
        card.className = 'stagger__card' + (isCenter ? ' is-center' : '');

        var offsetX = (cardSize / 1.5) * position;
        var offsetY = isCenter ? -55 : (position % 2 ? 12 : -12);
        var rot = isCenter ? 0 : (position % 2 ? 2.5 : -2.5);

        card.style.width = cardSize + 'px';
        card.style.height = cardSize + 'px';
        card.style.transform = 'translate(-50%, -50%) translateX(' + offsetX + 'px) translateY(' + offsetY + 'px) rotate(' + rot + 'deg)';

        if (isCenter) {
          card.style.boxShadow = '0px 8px 0px 4px var(--border)';
        }

        card.innerHTML =
          '<img class="stagger__avatar" src="' + t.img + '" alt="' + t.cite.split('—')[0].trim() + '" loading="lazy">' +
          '<p class="stagger__quote">&ldquo;' + t.quote + '&rdquo;</p>' +
          '<cite class="stagger__cite">— ' + t.cite + '</cite>';

        (function (pos) {
          card.addEventListener('click', function () { handleMove(pos); });
        })(position);

        stage.appendChild(card);
      });
    }

    render();

    if (prevBtn) prevBtn.addEventListener('click', function () { handleMove(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { handleMove(1); });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      var rect = stage.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowRight') handleMove(1);
      if (e.key === 'ArrowLeft') handleMove(-1);
    });

    // Touch swipe on stage
    var touchStartX = 0;
    stage.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].screenX;
      if (diff > 50) handleMove(1);
      if (diff < -50) handleMove(-1);
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
     REVEAL TEXT — "NUVORA" letter animation
     ══════════════════════════════════════════════ */
  (function () {
    var container = document.getElementById('revealText');
    if (!container) return;

    var letters = container.querySelectorAll('.reveal-letter');
    var LETTER_DELAY = 100;    // ms between each letter entrance
    var SPRING_SETTLE = 700;   // ms for spring animation to complete
    var SWEEP_DELAY = 60;      // ms between each gold flash
    var hasRevealed = false;

    // Set hover background images from data-img
    letters.forEach(function (el) {
      var imgUrl = el.getAttribute('data-img');
      if (imgUrl) {
        el.addEventListener('mouseenter', function () {
          el.style.backgroundImage = 'url(' + imgUrl + ')';
        });
        el.addEventListener('mouseleave', function () {
          el.style.backgroundImage = '';
          el.style.webkitTextFillColor = '';
          el.style.backgroundPosition = '';
        });
      }
    });

    function revealSequence() {
      if (hasRevealed) return;
      hasRevealed = true;

      // Phase 1: Spring entrance for each letter
      letters.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('is-revealed');
        }, i * LETTER_DELAY);
      });

      // Phase 2: Gold color flash on each letter after all have settled
      var lastDelay = (letters.length - 1) * LETTER_DELAY;
      var sweepStart = lastDelay + SPRING_SETTLE;

      letters.forEach(function (el, i) {
        setTimeout(function () {
          el.classList.add('is-sweeping');
        }, sweepStart + (i * SWEEP_DELAY));
      });
    }

    // Trigger on scroll into view
    if ('IntersectionObserver' in window) {
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealSequence();
            rio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      rio.observe(container);
    } else {
      // Fallback: reveal immediately
      revealSequence();
    }
  })();


  /* ══════════════════════════════════════════════
     BLOG — Animated Card Stack
     ══════════════════════════════════════════════ */
  (function () {
    var stage = document.getElementById('cardStackStage');
    var nextBtn = document.getElementById('cardStackNext');
    if (!stage) return;

    var articles = [
      {
        href: 'blog/viscoelastico-o-muelles.html',
        img: 'images/blog/viscoelastico-o-muelles.svg',
        time: '9 min',
        tag: 'Guía de compra',
        title: '¿Viscoelástico o muelles ensacados?',
        desc: 'La comparativa honesta'
      },
      {
        href: 'blog/mejores-colchones-calidad-precio.html',
        img: 'images/blog/mejores-colchones-calidad-precio.svg',
        time: '9 min',
        tag: 'Colchones',
        title: 'Mejores colchones calidad-precio',
        desc: 'Guía para no pagar de más'
      },
      {
        href: 'blog/cada-cuanto-cambiar-colchon.html',
        img: 'images/blog/cada-cuanto-cambiar-colchon.svg',
        time: '7 min',
        tag: 'Consejos',
        title: '¿Cada cuánto se cambia el colchón?',
        desc: 'Las 7 señales claras'
      },
      {
        href: 'blog/como-elegir-canape-abatible.html',
        img: 'images/blog/como-elegir-canape-abatible.svg',
        time: '8 min',
        tag: 'Canapés',
        title: 'Cómo elegir un canapé abatible',
        desc: 'La guía sin errores'
      }
    ];

    // Position presets: [scale, yOffset from bottom]
    var positions = [
      { scale: 1,    y: 12  },  // front
      { scale: 0.95, y: -16 },  // middle
      { scale: 0.90, y: -44 }   // back
    ];

    var order = articles.map(function (_, i) { return i; });

    function buildCard(article) {
      return '<a href="' + article.href + '">' +
        '<div class="stack-card__img">' +
          '<img class="stack-card__photo" src="' + article.img + '" alt="' + article.title + '" loading="lazy">' +
          '<div class="stack-card__img-overlay"></div>' +
          '<span class="stack-card__tag">' + article.tag + '</span>' +
          '<span class="stack-card__time">' + article.time + '</span>' +
        '</div>' +
        '<div class="stack-card__body">' +
          '<div class="stack-card__text">' +
            '<div class="stack-card__title">' + article.title + '</div>' +
            '<div class="stack-card__desc">' + article.desc + '</div>' +
          '</div>' +
          '<span class="stack-card__read">Leer <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><path d="M9.5 18L15.5 12L9.5 6"/></svg></span>' +
        '</div>' +
      '</a>';
    }

    function render() {
      stage.innerHTML = '';
      // Show only the first 3 from order
      var visible = order.slice(0, 3);

      visible.forEach(function (articleIdx, stackPos) {
        var pos = positions[stackPos] || positions[2];
        var card = document.createElement('div');
        card.className = 'stack-card';
        card.innerHTML = buildCard(articles[articleIdx]);
        card.style.zIndex = 3 - stackPos;
        card.style.transform = 'translate(-50%, 0) translateY(' + pos.y + 'px) scale(' + pos.scale + ')';
        stage.appendChild(card);
      });
    }

    function animateNext() {
      var cards = stage.querySelectorAll('.stack-card');
      if (!cards.length) return;

      // Exit first card
      cards[0].classList.add('is-exiting');

      // After exit animation, cycle order and re-render
      setTimeout(function () {
        order.push(order.shift());
        render();
      }, 500);
    }

    render();

    if (nextBtn) {
      nextBtn.addEventListener('click', animateNext);
    }

    // Touch swipe on stage
    var swipeStartX = 0;
    stage.addEventListener('touchstart', function (e) {
      swipeStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var diff = swipeStartX - e.changedTouches[0].screenX;
      if (diff > 50) animateNext();
    }, { passive: true });
  })();


  /* ══════════════════════════════════════════════
     LOGO CLOUD — Duplicate items for seamless loop
     ══════════════════════════════════════════════ */
  (function () {
    var track = document.getElementById('logoCloudTrack');
    if (!track) return;
    // Clone all items once to create the seamless loop
    var items = track.innerHTML;
    track.innerHTML = items + items;
  })();

});
