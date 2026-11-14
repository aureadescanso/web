/* =============================================
   NUVORA DESCANSO — Portada: escena con puntos y fábrica animada
   =============================================
   · CONJUNTO DESTACADO: cada punto de la foto es un producto. Al pasar
     el cursor, enfocarlo o tocarlo se enciende su ficha; hasta que el
     visitante toca algo, los puntos se van encendiendo solos.
   · FÁBRICA: el vídeo se usa también, muy desenfocado, como ambiente de
     toda la sección; el marco se endereza al hacer scroll; las cifras
     cuentan y el mapa se dibuja al entrar en pantalla.
   Todo es adorno sobre un HTML que ya se lee sin este fichero.
   ============================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var sinMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ══════════════════════════════════════════════
       CONJUNTO DESTACADO
       ══════════════════════════════════════════════ */
    (function () {
      var raiz = document.getElementById('conjunto');
      if (!raiz) return;
      var puntos = [].slice.call(raiz.querySelectorAll('.look__dot'));
      var fichas = [].slice.call(raiz.querySelectorAll('.look__card'));
      var fila = raiz.querySelector('.look__cards');
      if (!puntos.length || !fichas.length) return;

      var actual = puntos[0].getAttribute('data-look');
      var tocado = false, ronda = null;
      function enFila() { return window.matchMedia('(max-width: 900px)').matches; }

      function encender(clave, desdeFila) {
        actual = clave;
        puntos.forEach(function (p) {
          var si = p.getAttribute('data-look') === clave;
          p.classList.toggle('is-active', si);
          p.setAttribute('aria-pressed', si ? 'true' : 'false');
        });
        fichas.forEach(function (f) {
          var si = f.getAttribute('data-look') === clave;
          f.classList.toggle('is-active', si);
          /* En móvil las fichas van en fila: se lleva a la vista la elegida,
             salvo que el cambio venga precisamente de deslizar la fila */
          if (si && !desdeFila && enFila() && fila) {
            fila.scrollTo({ left: f.offsetLeft - (fila.clientWidth - f.offsetWidth) / 2, behavior: sinMovimiento ? 'auto' : 'smooth' });
          }
        });
      }

      function parar() { tocado = true; if (ronda) { clearInterval(ronda); ronda = null; } }

      puntos.forEach(function (p) {
        var clave = p.getAttribute('data-look');
        p.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { parar(); encender(clave); } });
        p.addEventListener('focus', function () { parar(); encender(clave); });
        p.addEventListener('click', function () { parar(); encender(clave); });
      });
      fichas.forEach(function (f) {
        var clave = f.getAttribute('data-look');
        f.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { parar(); encender(clave); } });
        f.addEventListener('focusin', function () { parar(); encender(clave); });
      });

      /* Móvil: al deslizar las fichas con el dedo, se enciende el punto
         de la que queda centrada */
      if (fila) {
        var espera;
        fila.addEventListener('scroll', function () {
          if (!enFila()) return;
          clearTimeout(espera);
          espera = setTimeout(function () {
            var centro = fila.scrollLeft + fila.clientWidth / 2, mejor = null, dist = Infinity;
            fichas.forEach(function (f) {
              var d = Math.abs(f.offsetLeft + f.offsetWidth / 2 - centro);
              if (d < dist) { dist = d; mejor = f; }
            });
            if (mejor && mejor.getAttribute('data-look') !== actual) encender(mejor.getAttribute('data-look'), true);
          }, 90);
        }, { passive: true });
        fila.addEventListener('pointerdown', parar, { passive: true });
      }

      /* Mientras nadie toca nada, los puntos se encienden por turnos:
         enseña que la foto es interactiva. Solo con la sección a la vista. */
      if (!sinMovimiento && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          if (tocado) return;
          if (en[0].isIntersecting && !ronda) {
            ronda = setInterval(function () {
              var i = puntos.map(function (p) { return p.getAttribute('data-look'); }).indexOf(actual);
              encender(puntos[(i + 1) % puntos.length].getAttribute('data-look'));
            }, 3200);
          } else if (!en[0].isIntersecting && ronda) {
            clearInterval(ronda); ronda = null;
          }
        }, { threshold: 0.35 }).observe(raiz);
      }
      encender(actual, true);
    })();

    /* ══════════════════════════════════════════════
       FÁBRICA
       ══════════════════════════════════════════════ */
    (function () {
      var seccion = document.getElementById('fabrica');
      if (!seccion) return;
      var video = seccion.querySelector('.fabrica__video');
      var marco = seccion.querySelector('.fabrica__frame');
      var ambiente = seccion.querySelector('.fabrica__ambiente');
      var mapa = seccion.querySelector('.fabrica__mapa');
      var cifras = [].slice.call(seccion.querySelectorAll('[data-cuenta]'));
      var aLaVista = false;

      /* — Ambiente: fotogramas del vídeo en un lienzo diminuto que el CSS
           estira y desenfoca. Pintar 10 veces por segundo sobra: es una
           mancha de color, no una imagen. — */
      var ctx = ambiente && ambiente.getContext && ambiente.getContext('2d');
      if (ctx && video) { ambiente.width = 48; ambiente.height = 86; }
      var ultimoAmbiente = 0;

      /* — Marco: llega girado y se endereza según avanza la sección — */
      function inclinar() {
        if (!marco || sinMovimiento) return;
        var r = seccion.getBoundingClientRect(), alto = window.innerHeight || 1;
        /* 0 cuando asoma por abajo · 1 cuando su centro pasa el de la pantalla */
        var p = (alto - r.top) / (alto / 2 + r.height / 2);
        p = Math.max(0, Math.min(1.35, p));
        marco.style.setProperty('--giro', (-14 + 14 * Math.min(1, p) + (p > 1 ? (p - 1) * 10 : 0)).toFixed(2) + 'deg');
        marco.style.setProperty('--cabeceo', (5 - 5 * Math.min(1, p)).toFixed(2) + 'deg');
      }

      var raf = null;
      function cuadro(t) {
        raf = null;
        if (!aLaVista) return;
        inclinar();
        if (video && video.duration) {
          marco.style.setProperty('--avance', (video.currentTime / video.duration).toFixed(3));
          if (ctx && video.readyState >= 2 && t - ultimoAmbiente > 100) {
            ultimoAmbiente = t;
            try { ctx.drawImage(video, 0, 0, ambiente.width, ambiente.height); ambiente.classList.add('is-vivo'); } catch (e) {}
          }
        }
        raf = requestAnimationFrame(cuadro);
      }
      function arrancar() { if (!raf && aLaVista && !document.hidden) raf = requestAnimationFrame(cuadro); }

      /* — Cifras: cuentan desde cero una sola vez — */
      var contado = false;
      function contar() {
        if (contado) return;
        contado = true;
        if (sinMovimiento) return;
        var t0 = performance.now(), DUR = 1500;
        cifras.forEach(function (c) { c.textContent = '0'; });
        (function paso() {
          var p = Math.min(1, (performance.now() - t0) / DUR), s = 1 - Math.pow(1 - p, 3);
          cifras.forEach(function (c) { c.textContent = String(Math.round(parseInt(c.getAttribute('data-cuenta'), 10) * s)); });
          if (p < 1) requestAnimationFrame(paso);
        })();
      }

      if (!('IntersectionObserver' in window)) {
        aLaVista = true; arrancar(); if (mapa) mapa.classList.add('is-dibujado');
        return;
      }
      new IntersectionObserver(function (en) {
        aLaVista = en[0].isIntersecting;
        if (aLaVista) arrancar();
        /* Fuera de pantalla, el vídeo descansa: batería y datos */
        if (video && video.currentSrc) {
          if (aLaVista) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
          else video.pause();
        }
      }, { threshold: 0 }).observe(seccion);
      document.addEventListener('visibilitychange', arrancar);

      var texto = seccion.querySelector('.fabrica__cifras');
      if (texto) {
        var o1 = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { contar(); o1.disconnect(); } }, { threshold: 0.6 });
        o1.observe(texto);
      }
      if (mapa) {
        var o2 = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { mapa.classList.add('is-dibujado'); o2.disconnect(); } }, { threshold: 0.4 });
        o2.observe(mapa);
      }
    })();
  });
})();
