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
   (RGPD y art. 22.2 LSSI). Cada plataforma se trata distinto porque no
   se comportan igual:

     · TikTok: no se descarga nada hasta que la persona acepta. Su SDK
       permite dejar la cola preparada sin cargarlo, así que el navegador
       ni siquiera contacta con TikTok.
     · Meta: su SDK sí se carga y se inicializa siempre, porque de otro
       modo Meta no reconoce la instalación. A cambio, no se le manda
       NINGÚN evento sin consentimiento y se le borran las cookies.

   En los dos casos, sin permiso no se comunica ni una visita, ni una
   ficha de producto, ni una compra.

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

  /* ── Código base del píxel de Meta ──
     Este es el código tal cual lo entrega Facebook, sin tocar: se carga
     siempre, en todas las páginas, que es lo que exige Meta para dar la
     instalación por buena y lo que busca su comprobador.

     El consentimiento se resuelve más abajo, no aquí. */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
    n.queue = []; t = b.createElement(e); t.async = !0;
    t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  /* Solo se inicializa. NO se llama a `track` hasta que haya
     consentimiento, y un evento que no se dispara no se envía.

     No se usa la API `consent` de Meta a propósito: en la versión actual
     de su SDK, puesto el `revoke` antes del `init` el píxel no llega a
     registrarse, y puesto después se queda mudo aunque luego se conceda
     el permiso. Ninguna de las dos formas sirve. */
  window.fbq('init', PIXEL_META);

  /* Red de seguridad: si el `init` llegara a plantar sus cookies, se
     borran mientras no haya consentimiento. Se comprueba varias veces
     porque el SDK termina de cargar después de esta línea. */
  function limpiarCookiesMeta() {
    ['_fbp', '_fbc'].forEach(function (c) {
      if (document.cookie.indexOf(c + '=') < 0) return;
      var host = location.hostname;
      var dominios = ['', host, '.' + host, host.replace(/^www\./, '.')];
      dominios.forEach(function (d) {
        document.cookie = c + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }
  var vigilante = null;
  function vigilarCookies() {
    if (vigilante) return;
    limpiarCookiesMeta();
    var veces = 0;
    vigilante = setInterval(function () {
      limpiarCookiesMeta();
      if (++veces > 20) { clearInterval(vigilante); vigilante = null; }
    }, 500);
  }
  if (leerConsentimiento() !== 'granted') vigilarCookies();

  /* No se incluye el <noscript><img> del código original: ese pide la
     imagen a Facebook nada más abrir la página, saltándose el aviso de
     cookies, y sin JavaScript no hay forma de preguntar. Como tampoco
     se puede comprar sin JavaScript, no se pierde ninguna medición. */

  var tiktokArrancado = false;
  function arrancarTikTok() {
    if (tiktokArrancado || !window.ttq) return;
    tiktokArrancado = true;
    window.ttq.load(PIXEL_TIKTOK);
    window.ttq.grantConsent();
    window.ttq.page();
  }

  /* El píxel de Meta ya está inicializado desde el principio, para que
     Meta lo dé por instalado. Lo único que falta al aceptar es dejar de
     borrarle las cookies y mandarle la primera visita. */
  var metaArrancado = false;
  function arrancarMeta() {
    if (metaArrancado || !window.fbq) return;
    metaArrancado = true;
    if (vigilante) { clearInterval(vigilante); vigilante = null; }
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
      /* A Meta no se le manda ni un evento más, y se le vuelven a borrar
         las cookies por si había aceptado antes y ha cambiado de opinión. */
      metaArrancado = false;
      vigilarCookies();
      cerrarAviso();
    }
  };

  /* ── Aviso de cookies ──
     Aparece solo si la persona no ha contestado todavía, pero puede
     reabrirse siempre desde la galleta. */
  var aviso = null;

  function cerrarAviso() {
    mostrarGalleta();
    if (!aviso) return;
    aviso.classList.remove('is-open');
    var el = aviso;
    aviso = null;
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 400);
  }

  function T(k, fb) {
    return (window.NuvoraI18n && window.NuvoraI18n.t(k)) || fb;
  }

  function montarAviso(forzar) {
    if (aviso) return;
    if (!forzar && leerConsentimiento() !== null) return;
    ocultarGalleta();
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

  /* ── La galleta ──
     Siempre visible, se haya contestado o no. El RGPD exige que retirar
     el consentimiento sea tan fácil como darlo, y esconder esa opción
     dentro de la política de cookies no lo es. El puntito de la esquina
     dice en qué estado estás sin tener que abrir nada. */
  var galleta = null;

  function ocultarGalleta() { if (galleta) galleta.classList.add('is-hidden'); }
  function mostrarGalleta() {
    if (!galleta) return;
    galleta.classList.remove('is-hidden');
    pintarGalleta();
  }
  function pintarGalleta() {
    if (!galleta) return;
    var estado = leerConsentimiento();
    galleta.classList.toggle('is-granted', estado === 'granted');
    var texto = estado === 'granted'
      ? T('ck.dotOn', 'Cookies aceptadas · pulsa para cambiarlo')
      : estado === 'denied'
        ? T('ck.dotOff', 'Cookies rechazadas · pulsa para cambiarlo')
        : T('ck.dot', 'Preferencias de cookies');
    galleta.setAttribute('aria-label', texto);
    galleta.setAttribute('title', texto);
  }

  function montarGalleta() {
    if (galleta) return;
    galleta = document.createElement('button');
    galleta.type = 'button';
    galleta.className = 'ckdot';
    galleta.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M12 2.6a9.4 9.4 0 1 0 9.4 9.4 3.4 3.4 0 0 1-4.2-4.6A3.4 3.4 0 0 1 12 2.6z" ' +
          'stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<circle cx="9" cy="9.4" r="1.15" fill="currentColor"/>' +
        '<circle cx="8.4" cy="14.6" r="1.05" fill="currentColor"/>' +
        '<circle cx="13.4" cy="13.2" r="1.3" fill="currentColor"/>' +
        '<circle cx="12.6" cy="17.6" r="0.9" fill="currentColor"/>' +
      '</svg>' +
      '<span class="ckdot__state" aria-hidden="true"></span>';
    galleta.addEventListener('click', function () { montarAviso(true); });
    document.body.appendChild(galleta);
    pintarGalleta();
  }

  /* Para poder abrirlo desde un enlace de la política de cookies */
  window.NuvoraConsent.abrir = function () { montarAviso(true); };

  document.addEventListener('DOMContentLoaded', function () {
    montarGalleta();
    setTimeout(function () { montarAviso(false); }, 700);
  });

  /* El evento ViewContent lo dispara js/shop.js cuando ya ha resuelto
     qué producto y qué medida se están viendo: este archivo carga en el
     <head> y aquí todavía no existe el catálogo. */
})();
