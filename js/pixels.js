/* =============================================
   NUVORA DESCANSO — Píxeles de publicidad + consentimiento
   =============================================
   Dos plataformas comparten este archivo:
     · TikTok (píxel DA7KU5JC77U208UL93F0, "alfredo")
     · Meta   (píxel 1465349585647608, Facebook e Instagram)

   El código base de ambos se sirve desde aquí, y no en línea dentro del
   HTML, para no tener que abrir la CSP con 'unsafe-inline': con
   `script-src 'self'` basta, y solo se añaden los dominios de TikTok y
   de Meta para sus scripts remotos y sus envíos.

   IMPORTANTE — consentimiento: los píxeles instalan cookies de
   publicidad, así que en España necesitan el permiso previo del usuario
   (RGPD y art. 22.2 LSSI). Por eso NO se descarga ningún SDK hasta que
   la persona acepta en el aviso: si rechaza, o si no contesta, el
   navegador ni siquiera contacta con TikTok ni con Meta, y por tanto no
   se les entrega la IP del visitante.

   Eventos que se mandan (todos pasan por window.NuvoraTrack, que
   comprueba el consentimiento antes de disparar):
     ViewContent      · al abrir una ficha de producto
     AddToCart        · al añadir algo a la cesta
     InitiateCheckout · al pulsar "Tramitar pedido"
     CompletePayment  · al volver de Stripe con el pago hecho
   Meta usa los mismos nombres salvo el último, que allí se llama
   Purchase: la traducción está en EVENTO_META.
   ============================================= */
(function () {
  'use strict';

  var PIXEL_TIKTOK = 'DA7KU5JC77U208UL93F0';
  var PIXEL_META = '1465349585647608';
  var KEY = 'nuvora_consent_v1';

  function leerConsentimiento() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function guardarConsentimiento(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  /* ── Código base del píxel de TikTok (el que da TikTok) ── */
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

  /* ── Código base del píxel de Meta (el que da Meta) ──
     Es el mismo que entrega Facebook, con un solo cambio: la línea que
     insertaba el <script> de fbevents.js se ha movido a arrancarMeta().
     Así la cola `fbq.queue` existe desde el principio, pero el SDK no se
     descarga hasta que hay consentimiento. */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  /* No se incluye el <noscript><img> del píxel de Meta que viene en el
     código original: ese pide la imagen a Facebook nada más abrir la
     página, sin pasar por el aviso de cookies. Sin JavaScript no hay
     forma de pedir permiso, así que tampoco puede haber seguimiento. */

  var tiktokArrancado = false;
  function arrancarTikTok() {
    if (tiktokArrancado || !window.ttq) return;
    tiktokArrancado = true;
    window.ttq.load(PIXEL_TIKTOK);
    window.ttq.grantConsent();
    window.ttq.page();
  }

  var metaArrancado = false;
  function arrancarMeta() {
    if (metaArrancado || !window.fbq) return;
    metaArrancado = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    var p = document.getElementsByTagName('script')[0];
    p.parentNode.insertBefore(s, p);
    window.fbq('init', PIXEL_META);
    window.fbq('track', 'PageView');
  }

  function arrancarPixeles() {
    arrancarTikTok();
    arrancarMeta();
  }

  if (leerConsentimiento() === 'granted') arrancarPixeles();

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

  /* Meta llama Purchase a lo que TikTok llama CompletePayment. El resto
     de nombres coinciden. */
  var EVENTO_META = { CompletePayment: 'Purchase' };

  /* Nuestras líneas van en el formato de TikTok (content_id, price…);
     Meta espera otro (id, item_price…). Aquí se traducen. */
  function contenidosMeta(contents) {
    return (contents || []).map(function (c) {
      return { id: c.content_id, quantity: c.quantity || 1, item_price: c.price };
    });
  }

  /* ── Envío del evento por los dos caminos ──
     El mismo `event_id` va al píxel del navegador y a la Events API del
     servidor. TikTok los cruza y cuenta UNA sola conversión, aunque le
     lleguen las dos copias. Si el navegador tiene un bloqueador, la
     copia del servidor llega igual.
     A Meta se le pasa ese mismo identificador como `eventID`: hoy solo
     recibe la copia del navegador, pero si algún día se activa su
     Conversions API la deduplicación ya está preparada. */
  window.NuvoraTrack = function (evento, datos) {
    if (leerConsentimiento() !== 'granted') return;
    datos = datos || {};
    var id = datos.event_id || nuevoId();
    var valor = datos.value;
    var moneda = datos.currency || 'EUR';

    /* 1 · Píxel de TikTok, en el navegador */
    if (window.ttq) {
      arrancarTikTok();
      try {
        window.ttq.track(evento, {
          contents: datos.contents,
          value: valor,
          currency: moneda
        }, { event_id: id });
      } catch (e) {}
    }

    /* 2 · Píxel de Meta, en el navegador */
    if (window.fbq) {
      arrancarMeta();
      try {
        var cont = contenidosMeta(datos.contents);
        window.fbq('track', EVENTO_META[evento] || evento, {
          content_type: 'product',
          content_ids: cont.map(function (c) { return c.id; }),
          contents: cont,
          value: valor,
          currency: moneda
        }, { eventID: id });
      } catch (e) {}
    }

    /* 3 · Events API de TikTok, desde nuestro servidor */
    try {
      var cuerpo = JSON.stringify({
        event: evento,
        event_id: id,
        value: valor,
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
      arrancarPixeles();
      cerrarAviso();
    },
    rechazar: function () {
      guardarConsentimiento('denied');
      if (window.ttq) window.ttq.revokeConsent();
      /* Meta ni siquiera se ha cargado, pero por si acaso: */
      if (window.fbq && metaArrancado) window.fbq('consent', 'revoke');
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
            'Usamos cookies de <strong>TikTok</strong> y <strong>Meta</strong> para medir la publicidad y ' +
            'saber qué anuncios funcionan. Sin ellas la web va igual de bien. Puedes cambiar de opinión ' +
            'cuando quieras en la <a href="' + base + 'cookies.html">política de cookies</a>.') +
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
