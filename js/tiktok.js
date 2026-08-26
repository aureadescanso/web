/* =============================================
   NUVORA DESCANSO — Píxel de TikTok + consentimiento
   =============================================
   El código base de TikTok se sirve desde este archivo, y no en línea
   dentro del HTML, para no tener que abrir la CSP con 'unsafe-inline':
   con `script-src 'self'` basta, y solo se añade el dominio de TikTok
   para el script remoto y sus envíos.

   IMPORTANTE — consentimiento: el píxel instala cookies de publicidad,
   así que en España necesita el permiso previo del usuario (RGPD y
   art. 22.2 LSSI). Por eso arranca con `holdConsent()`: se carga pero
   NO envía nada hasta que la persona acepta en el aviso. Si rechaza, o
   si no contesta, no se envía ni un evento.

   Eventos que se mandan (todos pasan por window.NuvoraTrack, que
   comprueba el consentimiento antes de disparar):
     ViewContent      · al abrir una ficha de producto
     AddToCart        · al añadir algo a la cesta
     InitiateCheckout · al pulsar "Tramitar pedido"
     CompletePayment  · al volver de Stripe con el pago hecho
   ============================================= */
(function () {
  'use strict';

  var PIXEL = 'DA7KU5JC77U208UL93F0';
  var KEY = 'nuvora_consent_v1';

  function leerConsentimiento() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function guardarConsentimiento(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  /* ── Código base del píxel (el que da TikTok) ── */
  !function (w, d, t) {
    w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"], ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]); ttq.instance = function (t) {
      for (
        var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e
    }, ttq.load = function (e, n) {
      var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner; ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = r, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {}; n = document.createElement("script")
        ; n.type = "text/javascript", n.async = !0, n.src = r + "?sdkid=" + e + "&lib=" + t; e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(n, e)
    };

    /* Ojo: aquí NO se llama a ttq.load(). Solo se deja preparada la cola
       de eventos. Mientras no haya consentimiento no se descarga el SDK
       de TikTok, así que el navegador ni siquiera contacta con sus
       servidores y no se expone la IP del visitante. */
    ttq.holdConsent();
  }(window, document, 'ttq');

  var arrancado = false;
  function arrancarPixel() {
    if (arrancado || !window.ttq) return;
    arrancado = true;
    window.ttq.load(PIXEL);
    window.ttq.grantConsent();
    window.ttq.page();
  }

  if (leerConsentimiento() === 'granted') arrancarPixel();

  /* ── API para el resto del sitio ── */
  /* ── Identificadores que mejoran la atribución ── */
  var TTCLID_KEY = 'nuvora_ttclid';

  /* El id del clic viene en la URL del anuncio y se pierde al navegar:
     se guarda para poder mandarlo también en la compra. */
  (function () {
    var m = /[?&]ttclid=([^&]+)/.exec(window.location.search);
    if (m) { try { localStorage.setItem(TTCLID_KEY, decodeURIComponent(m[1])); } catch (e) {} }
  })();

  function ttclid() {
    try { return localStorage.getItem(TTCLID_KEY) || ''; } catch (e) { return ''; }
  }
  /* Cookie que planta el propio píxel de TikTok */
  function ttp() {
    var m = /(?:^|;\s*)_ttp=([^;]+)/.exec(document.cookie);
    return m ? decodeURIComponent(m[1]) : '';
  }
  function nuevoId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'e-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  /* ── Envío del evento por los dos caminos ──
     El mismo `event_id` va al píxel del navegador y a la Events API del
     servidor. TikTok los cruza y cuenta UNA sola conversión, aunque le
     lleguen las dos copias. Si el navegador tiene un bloqueador, la
     copia del servidor llega igual. */
  window.NuvoraTrack = function (evento, datos) {
    if (leerConsentimiento() !== 'granted') return;
    datos = datos || {};
    var id = datos.event_id || nuevoId();

    /* 1 · Píxel del navegador */
    if (window.ttq) {
      arrancarPixel();
      try {
        window.ttq.track(evento, {
          contents: datos.contents,
          value: datos.value,
          currency: datos.currency || 'EUR'
        }, { event_id: id });
      } catch (e) {}
    }

    /* 2 · Events API, desde nuestro servidor */
    try {
      var cuerpo = JSON.stringify({
        event: evento,
        event_id: id,
        value: datos.value,
        contents: datos.contents,
        url: window.location.href,
        referrer: document.referrer || '',
        ttp: ttp(),
        ttclid: ttclid(),
        /* El correo va en claro hasta NUESTRO servidor, por HTTPS, y allí
           se cifra en SHA-256 antes de salir hacia TikTok. */
        email: datos.email || '',
        phone: datos.phone || ''
      });
      /* sendBeacon sobrevive al cambio de página (el checkout redirige a
         Stripe justo después de InitiateCheckout). */
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/.netlify/functions/tiktok-evento',
          new Blob([cuerpo], { type: 'application/json' }));
      } else {
        fetch('/.netlify/functions/tiktok-evento', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: cuerpo,
          keepalive: true
        }).catch(function () {});
      }
    } catch (e) {}
  };

  window.NuvoraConsent = {
    estado: leerConsentimiento,
    aceptar: function () {
      guardarConsentimiento('granted');
      arrancarPixel();
      cerrarAviso();
    },
    rechazar: function () {
      guardarConsentimiento('denied');
      if (window.ttq) window.ttq.revokeConsent();
      cerrarAviso();
    }
  };

  /* ── Aviso de cookies ──
     Solo aparece si la persona no ha contestado todavía. */
  var aviso = null;

  function cerrarAviso() {
    if (!aviso) return;
    aviso.classList.remove('is-open');
    var el = aviso;
    aviso = null;
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
  }

  function T(k, fb) {
    return (window.NuvoraI18n && window.NuvoraI18n.t(k)) || fb;
  }

  function montarAviso() {
    if (leerConsentimiento() !== null) return;
    var base = /\/blog\//.test(window.location.pathname) ? '../' : '';

    aviso = document.createElement('div');
    aviso.className = 'ckbar';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-live', 'polite');
    aviso.setAttribute('aria-label', T('ck.aria', 'Aviso de cookies'));
    aviso.innerHTML =
      '<div class="ckbar__inner">' +
        '<p class="ckbar__text" data-i18n-html="ck.text">' +
          T('ck.text',
            'Usamos cookies de <strong>TikTok</strong> para medir la publicidad y saber qué anuncios ' +
            'funcionan. Sin ellas la web va igual de bien. Puedes cambiar de opinión cuando quieras en la ' +
            '<a href="' + base + 'cookies.html">política de cookies</a>.') +
        '</p>' +
        '<div class="ckbar__btns">' +
          '<button type="button" class="ckbar__no" data-no data-i18n="ck.no">' +
            T('ck.no', 'Rechazar') + '</button>' +
          '<button type="button" class="ckbar__yes" data-yes data-i18n="ck.yes">' +
            T('ck.yes', 'Aceptar') + '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(aviso);
    if (window.NuvoraI18n && window.NuvoraI18n.set) {
      window.NuvoraI18n.set(window.NuvoraI18n.lang());
    }
    aviso.querySelector('[data-yes]').addEventListener('click', window.NuvoraConsent.aceptar);
    aviso.querySelector('[data-no]').addEventListener('click', window.NuvoraConsent.rechazar);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { if (aviso) aviso.classList.add('is-open'); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(montarAviso, 700);
  });

  /* El evento ViewContent lo dispara js/shop.js cuando ya ha resuelto
     qué producto y qué medida se están viendo: este archivo carga en el
     <head> y aquí todavía no existe el catálogo. */
})();
