/* =============================================
   NUVORA DESCANSO — Black Friday: "apagamos la luz"
   =============================================
   Un modo de evento para toda la web. Durante el Black Friday la web
   se queda a oscuras —negro y oro— y el cliente la recorre de noche:
   la portada se ilumina con una linterna que sigue al cursor, hay
   cielo de estrellas, cuenta atrás y un interruptor para volver a
   encender la luz.

   SE ENCIENDE Y SE APAGA SOLO, por fecha. No hay que publicar nada el
   día del evento ni acordarse de quitarlo después: fuera de las fechas
   de CONFIG este fichero no hace nada.

   Fases:
     aviso   → la web sigue igual; solo cambia la banda de arriba, con
               la cuenta atrás hasta que empieza.
     evento  → la web entera a oscuras.

   Para verlo antes de tiempo, añadir a cualquier dirección:
     ?bf=evento   ?bf=aviso   ?bf=no (vuelve a lo que toque por fecha)
   La elección se recuerda mientras dure la pestaña.

   Este fichero se carga en el <head>, antes de pintar, para que las
   páginas no parpadeen en blanco al navegar durante el evento.
   ============================================= */
(function () {
  'use strict';

  var CONFIG = {
    /* INTERRUPTOR GENERAL. Con false, el público no ve nada aunque
       lleguen las fechas: solo se ve con ?bf=evento (vista previa).
       Ponerlo a true cuando la oferta y las fechas estén confirmadas. */
    publico: false,

    /* Hora peninsular. En noviembre España va una hora por delante de UTC. */
    aviso:  '2026-11-20T00:00:00+01:00',
    inicio: '2026-11-27T00:00:00+01:00',   /* viernes */
    fin:    '2026-12-01T00:00:00+01:00',   /* acaba el lunes 30 a medianoche */

    fechas: 'Del 27 al 30 de noviembre',

    /* Pantalla de entrada. El número es el mismo −40 % que ya enseñan las
       fichas frente al precio de tienda física (STORE_DISCOUNT en
       js/shop.js): si allí cambia, cambiarlo también aquí. */
    telon: {
      cifra: '−40%',
      antes: 'Hasta',
      base: 'frente al precio de tienda física',
      extra: '+ 12 % extra en packs de descanso',
      boton: 'Entrar',
      segundos: 9          /* se abre sola pasado este tiempo */
    },

    /* Lo que se anuncia. Solo ofertas que existen de verdad y que el
       servidor aplica al cobrar: si aquí se promete algo que el pago no
       hace, el cliente lo descubre en el peor momento. */
    ofertas: [
      { titulo: 'Pack de descanso', texto: '−12 % en colchón + canapé + almohada', enlace: '/packs' },
      { titulo: 'Código NUVORA10',  texto: '−10 % en tu primera compra',           enlace: '/colchones' }
    ],
    banda: [
      'Black Friday Nuvora',
      'Apagamos la luz',
      'Pack de descanso −12 %',
      'Envío gratis y 30 noches de prueba'
    ],
    bandaAviso: [
      'Black Friday Nuvora',
      'El viernes 27 apagamos la luz',
      'Directo de fábrica a tu casa'
    ]
  };

  /* Páginas que se quedan con la luz encendida: pago y textos legales.
     Donde se paga, nada de efectos. */
  var CON_LUZ = /^\/(checkout|gracias|pedido|aviso-legal|privacidad|cookies|condiciones-venta|ejemplo-factura)(\.html)?\/?$/;

  var html = document.documentElement;
  var CLAVE = 'nuvora_bf', CLAVE_LUZ = 'nuvora_bf_luz', CLAVE_VISTO = 'nuvora_bf_visto';

  function leer(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function guardar(k, v) { try { v === null ? sessionStorage.removeItem(k) : sessionStorage.setItem(k, v); } catch (e) {} }

  /* ── ¿En qué fase estamos? ── */
  var forzada = /[?&]bf=(evento|aviso|no)\b/.exec(location.search);
  if (forzada) guardar(CLAVE, forzada[1] === 'no' ? null : forzada[1]);
  var prueba = leer(CLAVE);

  var ahora = Date.now();
  var tAviso = Date.parse(CONFIG.aviso), tInicio = Date.parse(CONFIG.inicio), tFin = Date.parse(CONFIG.fin);
  var fase = prueba || !CONFIG.publico ? (prueba || '') :
    (ahora >= tInicio && ahora < tFin ? 'evento' :
     ahora >= tAviso && ahora < tInicio ? 'aviso' : '');
  if (!fase) return;

  /* En una prueba la cuenta atrás no tiene fecha real a la que ir: se
     le da una de mentira para poder ver el reloj andando. */
  var meta = fase === 'evento' ? tFin : tInicio;
  if (prueba && meta <= ahora) meta = ahora + 3 * 86400000 + 7 * 3600000 + 42 * 60000;

  var sinMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conLuz = CON_LUZ.test(location.pathname);
  var puedeNoche = fase === 'evento' && !conLuz;
  var luzEncendida = leer(CLAVE_LUZ) === '1';
  /* Al pedir la vista previa por la dirección se enseña la entrada otra vez */
  if (forzada) guardar(CLAVE_VISTO, null);
  /* La pantalla de entrada solo se ve una vez, en la primera página de
     la visita. Se tapa la web desde ya (bf-telon) para que no asome
     antes de que la pantalla esté montada. */
  var hacerTelon = puedeNoche && !leer(CLAVE_VISTO);
  var hacerApagon = false;
  if (hacerTelon) { luzEncendida = false; guardar(CLAVE_LUZ, null); html.classList.add('bf-telon'); }

  html.classList.add('bf', 'bf-' + fase);
  if (puedeNoche && !luzEncendida && !hacerApagon) html.classList.add('bf-noche');

  /* ── Cambiar de luz a noche (o al revés) con un círculo que se abre ── */
  function cambiarLuz(noche, x, y, lento) {
    function aplicar() { html.classList.toggle('bf-noche', noche); pintarMarca(); }
    if (sinMovimiento || typeof document.startViewTransition !== 'function') { aplicar(); return; }
    html.style.setProperty('--bf-x', x + 'px');
    html.style.setProperty('--bf-y', y + 'px');
    html.classList.add('bf-vt');
    html.classList.toggle('bf-vt-lento', !!lento);
    var t;
    try { t = document.startViewTransition(aplicar); } catch (e) { aplicar(); html.classList.remove('bf-vt'); return; }
    var fin = function () { html.classList.remove('bf-vt', 'bf-vt-lento'); };
    t.finished.then(fin, fin);
    /* Si el navegador se salta la animación (pestaña en segundo plano),
       el cambio se aplica igual: que no quede un error suelto en consola */
    if (t.ready && t.ready.catch) t.ready.catch(function () {});
    if (t.updateCallbackDone && t.updateCallbackDone.catch) t.updateCallbackDone.catch(function () {});
  }

  /* ── Icono de la pestaña y color del navegador ── */
  var iconoOriginal = null;
  function pintarMarca() {
    var noche = html.classList.contains('bf-noche');
    var icono = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
    if (icono) {
      if (iconoOriginal === null) iconoOriginal = icono.getAttribute('href');
      icono.setAttribute('href', noche
        ? 'data:image/svg+xml,' + encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/>' +
            '<text x="32" y="46" font-family="Georgia,serif" font-size="40" font-weight="600" fill="#D4AF37" text-anchor="middle">N</text></svg>')
        : iconoOriginal);
    }
    var tema = document.querySelector('meta[name="theme-color"]');
    if (!tema) {
      tema = document.createElement('meta');
      tema.setAttribute('name', 'theme-color');
      document.head.appendChild(tema);
    }
    tema.setAttribute('content', noche || fase === 'aviso' || fase === 'evento' ? '#000000' : '#14224A');
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function dos(n) { return n < 10 ? '0' + n : String(n); }

  /* ── Cuenta atrás: un solo reloj para todos los marcadores ── */
  var relojes = [];
  function tic() {
    var falta = Math.max(0, meta - Date.now());
    var d = Math.floor(falta / 86400000);
    var h = Math.floor(falta / 3600000) % 24;
    var m = Math.floor(falta / 60000) % 60;
    var s = Math.floor(falta / 1000) % 60;
    var v = { d: dos(d), h: dos(h), m: dos(m), s: dos(s) };
    relojes.forEach(function (r) {
      for (var k in v) {
        var el = r.querySelector('[data-bf="' + k + '"]');
        if (el && el.textContent !== v[k]) el.textContent = v[k];
      }
    });
    /* Al llegar a cero cambia la fase: se recarga para que la web pase
       sola de aviso a evento, o de evento a normal. */
    if (falta === 0 && !prueba) { clearInterval(intervalo); setTimeout(function () { location.reload(); }, 1200); }
  }
  var intervalo;

  function relojHtml(clase) {
    function caja(k, rotulo) {
      return '<span class="bf-reloj__u"><b data-bf="' + k + '">00</b><i>' + rotulo + '</i></span>';
    }
    return '<span class="bf-reloj ' + clase + '" role="timer" aria-label="' +
        (fase === 'evento' ? 'Tiempo que queda de Black Friday' : 'Tiempo que falta para el Black Friday') + '">' +
      '<span class="bf-reloj__t">' + (fase === 'evento' ? 'Termina en' : 'Empieza en') + '</span>' +
      caja('d', 'días') + caja('h', 'h') + caja('m', 'min') + caja('s', 's') +
    '</span>';
  }

  /* ── Fechas: salen de CONFIG.inicio y CONFIG.fin, no se escriben a mano ── */
  var DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function dias() {
    var lista = [], HORA = 3600000, DIA = 86400000;
    /* +1 h: la hora peninsular de invierno, para leer el día con getUTC* */
    var hoy = Math.floor((Date.now() + HORA) / DIA);
    for (var t = tInicio; t < tFin && lista.length < 10; t += DIA) {
      var d = new Date(t + HORA);
      lista.push({ dia: DIAS[d.getUTCDay()], n: d.getUTCDate(), mes: MESES[d.getUTCMonth()],
                   hoy: Math.floor((t + HORA) / DIA) === hoy });
    }
    return lista;
  }

  /* Tira de entradas, una por día; la de hoy va encendida */
  function entradasHtml() {
    return '<span class="bf-dias" aria-label="' + esc(CONFIG.fechas) + '">' +
      dias().map(function (d) {
        return '<span class="bf-dia' + (d.hoy ? ' is-hoy' : '') + '" aria-hidden="true">' +
                 '<i>' + d.dia + '</i><b>' + d.n + '</b><i>' + d.mes + '</i>' +
               '</span>';
      }).join('') +
    '</span>';
  }

  /* Dos cintas cruzadas que corren en sentidos contrarios */
  function cintasHtml(clase) {
    var d = dias();
    var trozo = '<b>Black Friday</b><i>✦</i>' +
      d.map(function (x) { return '<span>' + x.dia + ' ' + x.n + ' ' + x.mes + '</span><i>✦</i>'; }).join('') +
      '<span>' + d.length + ' noches</span><i>✦</i>';
    var pista = '';
    for (var k = 0; k < 6; k++) pista += trozo;
    return '<div class="bf-cintas ' + (clase || '') + '" aria-hidden="true">' +
      '<div class="bf-cinta bf-cinta--oro"><div class="bf-cinta__p">' + pista + '</div></div>' +
      '<div class="bf-cinta bf-cinta--negra"><div class="bf-cinta__p">' + pista + '</div></div>' +
    '</div>';
  }

  /* ── Firmamento: el cielo estrellado que hay detrás de toda la web ── */
  function firmamento() {
    if (!puedeNoche) return;
    var capa = document.createElement('div');
    capa.className = 'bf-firmamento';
    capa.setAttribute('aria-hidden', 'true');
    capa.innerHTML = '<canvas></canvas>';
    document.body.insertBefore(capa, document.body.firstChild);
    var lienzo = capa.querySelector('canvas');
    var ctx = lienzo.getContext && lienzo.getContext('2d');
    if (!ctx) return;
    pintarCielo(lienzo, ctx, { densidad: 4200, paralaje: true, quien: function () { return html.classList.contains('bf-noche'); } });
  }

  /* Motor de estrellas, compartido por el firmamento y la pantalla de
     entrada. Inspirado en los techos de estrellas de los coches de lujo:
     puntos de luz muy finos, de un blanco cálido, que titilan despacio y
     sin estridencias. De tarde en tarde, una fugaz. Devuelve una función
     para pararlo. */
  function pintarCielo(lienzo, ctx, op) {
    var W = 0, H = 0, dpr = 1, estrellas = [], fugaz = null, raf = null, parado = false;
    /* Solo blancos cálidos: ningún azul */
    var COLORES = ['#FFFFFF', '#FFF9EF', '#FFF3DE', '#FFEBC8'];

    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = lienzo.clientWidth; H = lienzo.clientHeight;
      if (!W || !H) return;
      lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(340, Math.round(W * H / op.densidad));
      estrellas = [];
      for (var i = 0; i < n; i++) {
        var z = Math.random();              /* 0 lejos · 1 cerca */
        var viva = Math.random() < 0.06;    /* unas pocas, algo más brillantes */
        estrellas.push({
          x: Math.random() * W, y: Math.random() * H, z: z,
          r: viva ? 0.85 + Math.random() * 0.35 : 0.35 + z * 0.4,
          a: viva ? 0.95 : 0.22 + z * 0.45,
          f: Math.random() * 6.283, v: 0.15 + Math.random() * 0.55,
          c: COLORES[Math.floor(Math.random() * COLORES.length)],
          viva: viva
        });
      }
    }

    function cuadro(t) {
      ctx.clearRect(0, 0, W, H);
      var sy = op.paralaje ? (window.pageYOffset || 0) : 0;
      for (var i = 0; i < estrellas.length; i++) {
        var e = estrellas[i];
        /* Al bajar por la página, apenas se desplazan: un techo, no un viaje */
        var y = e.y - sy * (0.01 + e.z * 0.03);
        y = ((y % H) + H) % H;
        var tw = 0.62 + 0.38 * Math.sin(e.f + t * 0.001 * e.v);
        if (e.viva) {
          /* Halo muy suave, como la fibra óptica tras la tapicería */
          var g = ctx.createRadialGradient(e.x, y, 0, e.x, y, e.r * 4.5);
          g.addColorStop(0, 'rgba(255,244,222,0.22)'); g.addColorStop(1, 'rgba(255,244,222,0)');
          ctx.globalAlpha = tw; ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(e.x, y, e.r * 4.5, 0, 6.283); ctx.fill();
        }
        ctx.globalAlpha = e.a * tw;
        ctx.fillStyle = e.c;
        ctx.beginPath(); ctx.arc(e.x, y, e.r, 0, 6.283); ctx.fill();
      }
      if (fugaz) {
        fugaz.p += 0.016;
        var x = fugaz.x + fugaz.dx * fugaz.p, fy = fugaz.y + fugaz.dy * fugaz.p;
        var cola = ctx.createLinearGradient(x, fy, x - fugaz.dx * 0.18, fy - fugaz.dy * 0.18);
        cola.addColorStop(0, 'rgba(255,246,228,0.7)'); cola.addColorStop(1, 'rgba(255,246,228,0)');
        ctx.globalAlpha = Math.sin(Math.min(1, fugaz.p) * 3.1416);
        ctx.strokeStyle = cola; ctx.lineWidth = 0.9; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, fy); ctx.lineTo(x - fugaz.dx * 0.18, fy - fugaz.dy * 0.18); ctx.stroke();
        if (fugaz.p >= 1) fugaz = null;
      } else if (!sinMovimiento && Math.random() < 0.0012) {
        fugaz = { x: W * (0.1 + Math.random() * 0.6), y: H * Math.random() * 0.4,
                  dx: W * (0.16 + Math.random() * 0.12), dy: H * (0.06 + Math.random() * 0.08), p: 0 };
      }
      ctx.globalAlpha = 1;
    }

    function bucle(t) { cuadro(t); raf = requestAnimationFrame(bucle); }
    function arrancar() {
      if (parado || raf || document.hidden || (op.quien && !op.quien())) return;
      if (sinMovimiento) { cuadro(0); return; }
      raf = requestAnimationFrame(bucle);
    }
    function parar() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    medir();
    var re;
    function alMedir() { clearTimeout(re); re = setTimeout(function () { medir(); if (sinMovimiento) cuadro(0); }, 150); }
    window.addEventListener('resize', alMedir, { passive: true });
    function alVer() { document.hidden ? parar() : arrancar(); }
    document.addEventListener('visibilitychange', alVer);
    var ojo = null;
    if (op.quien) {
      ojo = new MutationObserver(function () { op.quien() ? arrancar() : parar(); });
      ojo.observe(html, { attributes: true, attributeFilter: ['class'] });
    }
    arrancar();
    return function () {
      parado = true; parar();
      window.removeEventListener('resize', alMedir);
      document.removeEventListener('visibilitychange', alVer);
      if (ojo) ojo.disconnect();
    };
  }

  /* ── Banda de arriba ── */
  function banda() {
    var caja = document.querySelector('.announce');
    var pista = caja && caja.querySelector('.announce__track');
    if (!pista) return;
    var frases = fase === 'evento' ? CONFIG.banda : CONFIG.bandaAviso;
    var una = frases.map(function (f, i) {
      return '<span class="announce__item' + (i === 0 ? ' bf-oro' : '') + '">' + esc(f) + '</span>' +
             '<span class="announce__sep" aria-hidden="true">✦</span>';
    }).join('');
    /* Repetida para que la marquesina no enseñe el final */
    pista.innerHTML = una + una + una + una;
    caja.insertAdjacentHTML('beforeend', relojHtml('bf-reloj--banda'));
    relojes.push(caja.querySelector('.bf-reloj'));
  }

  /* ── Interruptor de la luz, en la cabecera ── */
  function interruptor() {
    if (!puedeNoche) return;
    var logo = document.querySelector('.header__logo');
    if (!logo || !logo.parentNode) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'bf-interruptor';
    b.innerHTML =
      '<svg class="bf-interruptor__luna" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>' +
      '<svg class="bf-interruptor__sol" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    /* Se rotula con el estado al que se va: la clase cambia un instante
       después, dentro de la animación */
    function rotular(noche) {
      b.setAttribute('aria-label', noche ? 'Encender la luz' : 'Apagar la luz');
      b.setAttribute('title', noche ? 'Encender la luz' : 'Apagar la luz');
      b.setAttribute('aria-pressed', noche ? 'true' : 'false');
    }
    b.addEventListener('click', function () {
      var noche = !html.classList.contains('bf-noche');
      var r = b.getBoundingClientRect();
      guardar(CLAVE_LUZ, noche ? null : '1');
      cambiarLuz(noche, r.left + r.width / 2, r.top + r.height / 2);
      rotular(noche);
    });
    logo.parentNode.insertBefore(b, logo.nextSibling);
    rotular(html.classList.contains('bf-noche'));
  }

  /* ── Portada: titular, reloj grande y ofertas ── */
  function portada() {
    var hero = document.getElementById('hero');
    var contenido = document.getElementById('heroContent');
    var botones = document.getElementById('heroButtons');
    if (!hero || !contenido || fase !== 'evento') return;

    var titulo = contenido.querySelector('.hero__title');
    if (titulo) {
      titulo.insertAdjacentHTML('beforebegin',
        '<p class="bf-marca"><span class="bf-marca__n">Black Friday</span>' +
        entradasHtml() + '</p>');
    }

    var bloque = document.createElement('div');
    bloque.className = 'bf-portada';
    bloque.innerHTML =
      '<p class="bf-portada__lema">Apagamos la luz. Cuatro noches para estrenar descanso.</p>' +
      relojHtml('bf-reloj--grande') +
      '<div class="bf-ofertas">' +
        CONFIG.ofertas.map(function (o) {
          return '<a class="bf-oferta" href="' + esc(o.enlace) + '">' +
                   '<strong>' + esc(o.titulo) + '</strong><span>' + esc(o.texto) + '</span>' +
                 '</a>';
        }).join('') +
      '</div>';
    if (botones) contenido.insertBefore(bloque, botones);
    else contenido.appendChild(bloque);
    relojes.push(bloque.querySelector('.bf-reloj'));

    hero.insertAdjacentHTML('afterend', cintasHtml('bf-cintas--portada'));
    cielo(hero);
    linterna(hero);
  }

  /* ── Cielo: estrellas que titilan y, de vez en cuando, una fugaz ── */
  function cielo(hero) {
    var lienzo = document.createElement('canvas');
    lienzo.className = 'bf-cielo';
    lienzo.setAttribute('aria-hidden', 'true');
    var fondo = hero.querySelector('.hero__bg');
    hero.insertBefore(lienzo, fondo ? fondo.nextSibling : hero.firstChild);
    var ctx = lienzo.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, dpr = 1, estrellas = [], fugaz = null, raf = null, visible = true;

    function medir() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = lienzo.offsetWidth; H = lienzo.offsetHeight;
      lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(110, Math.round(W * H / 11000));
      estrellas = [];
      for (var i = 0; i < n; i++) {
        estrellas.push({
          x: Math.random() * W,
          /* Más estrellas arriba: abajo está el colchón */
          y: Math.pow(Math.random(), 1.7) * H,
          r: Math.random() < 0.06 ? 0.9 + Math.random() * 0.3 : 0.35 + Math.random() * 0.45,
          fase: Math.random() * 6.283,
          vel: 0.15 + Math.random() * 0.5,
          oro: Math.random() < 0.1
        });
      }
    }

    function pintar(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < estrellas.length; i++) {
        var e = estrellas[i];
        var brillo = 0.45 + 0.4 * (0.5 + 0.5 * Math.sin(e.fase + t * 0.001 * e.vel));
        ctx.globalAlpha = brillo * (1 - e.y / H * 0.75);
        ctx.fillStyle = e.oro ? '#FFEBC8' : '#FFFFFF';
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, 6.283);
        ctx.fill();
      }
      if (fugaz) {
        fugaz.p += 0.022;
        var x = fugaz.x + fugaz.dx * fugaz.p, y = fugaz.y + fugaz.dy * fugaz.p;
        var g = ctx.createLinearGradient(x, y, x - fugaz.dx * 0.22, y - fugaz.dy * 0.22);
        g.addColorStop(0, 'rgba(255,244,214,0.95)');
        g.addColorStop(1, 'rgba(255,244,214,0)');
        ctx.globalAlpha = Math.sin(Math.min(1, fugaz.p) * 3.1416);
        ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - fugaz.dx * 0.22, y - fugaz.dy * 0.22); ctx.stroke();
        if (fugaz.p >= 1) fugaz = null;
      } else if (Math.random() < 0.004) {
        fugaz = { x: W * (0.15 + Math.random() * 0.6), y: H * Math.random() * 0.3,
                  dx: W * (0.25 + Math.random() * 0.2), dy: H * (0.12 + Math.random() * 0.12), p: 0 };
      }
      ctx.globalAlpha = 1;
    }

    function bucle(t) {
      pintar(t);
      raf = requestAnimationFrame(bucle);
    }
    function arrancar() {
      if (raf || sinMovimiento) return;
      if (visible && !document.hidden && html.classList.contains('bf-noche')) raf = requestAnimationFrame(bucle);
    }
    function parar() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    medir();
    if (sinMovimiento) pintar(0);
    window.addEventListener('resize', function () { medir(); if (sinMovimiento) pintar(0); }, { passive: true });
    document.addEventListener('visibilitychange', function () { document.hidden ? parar() : arrancar(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        visible ? arrancar() : parar();
      }, { threshold: 0 }).observe(hero);
    }
    /* El interruptor enciende y apaga también el cielo */
    new MutationObserver(function () {
      html.classList.contains('bf-noche') ? arrancar() : parar();
    }).observe(html, { attributes: true, attributeFilter: ['class'] });
    arrancar();
  }

  /* ── Linterna: la foto de la portada está a oscuras y se ilumina
        donde apunta el cursor. Sin ratón, la luz se pasea sola. ── */
  function linterna(hero) {
    var fondo = hero.querySelector('.hero__bg');
    var foto = fondo && fondo.querySelector('img');
    if (!foto) return;
    var luz = foto.cloneNode(false);
    luz.className = 'bf-luz';
    luz.removeAttribute('fetchpriority');
    luz.setAttribute('aria-hidden', 'true');
    fondo.appendChild(luz);

    var x = 0.5, y = 0.62, hx = 0.5, hy = 0.62, conPuntero = false, ultimo = 0, raf = null;

    function mover(e) {
      var r = hero.getBoundingClientRect();
      hx = (e.clientX - r.left) / r.width;
      hy = (e.clientY - r.top) / r.height;
      conPuntero = true; ultimo = performance.now();
    }
    hero.addEventListener('pointermove', mover, { passive: true });
    hero.addEventListener('pointerdown', mover, { passive: true });

    function paso(t) {
      /* Sin puntero (móvil) o tras unos segundos quieto: paseo lento */
      if (!conPuntero || t - ultimo > 3500) {
        hx = 0.5 + 0.3 * Math.sin(t * 0.00042);
        hy = 0.6 + 0.16 * Math.sin(t * 0.00067 + 1.3);
      }
      x += (hx - x) * 0.09; y += (hy - y) * 0.09;
      luz.style.setProperty('--lx', (x * 100).toFixed(2) + '%');
      luz.style.setProperty('--ly', (y * 100).toFixed(2) + '%');
      raf = requestAnimationFrame(paso);
    }
    function arrancar() {
      if (!raf && !sinMovimiento && !document.hidden && html.classList.contains('bf-noche')) raf = requestAnimationFrame(paso);
    }
    function parar() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    document.addEventListener('visibilitychange', function () { document.hidden ? parar() : arrancar(); });
    new MutationObserver(function () {
      html.classList.contains('bf-noche') ? arrancar() : parar();
    }).observe(html, { attributes: true, attributeFilter: ['class'] });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en[0].isIntersecting ? arrancar() : parar(); }, { threshold: 0 }).observe(hero);
    }
    arrancar();
  }

  /* ── Pantalla de entrada: la cifra se forma con miles de motas de oro
        que llegan volando, y se apartan al pasar el cursor ── */
  function telon() {
    var T = CONFIG.telon;
    var caja = document.createElement('div');
    caja.className = 'bf-entrada';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-modal', 'true');
    caja.setAttribute('aria-label', 'Black Friday Nuvora: ' + T.antes + ' ' + T.cifra + ' ' + T.base);
    caja.innerHTML =
      '<div class="bf-entrada__rayos" aria-hidden="true"></div>' +
      '<canvas class="bf-entrada__cielo" aria-hidden="true"></canvas>' +
      '<canvas class="bf-entrada__oro" aria-hidden="true"></canvas>' +
      '<div class="bf-entrada__c">' +
        '<img class="bf-entrada__logo" src="/images/nuvoradescanso-sm.webp" alt="Nuvora Descanso">' +
        '<p class="bf-entrada__k">Black Friday</p>' +
        '<p class="bf-entrada__antes">' + esc(T.antes) + '</p>' +
        /* El hueco reserva el sitio de la cifra; la pinta el lienzo. El
           texto queda dentro para lectores de pantalla y por si no hay lienzo. */
        '<p class="bf-entrada__cifra"><span>' + esc(T.cifra) + '</span></p>' +
        '<p class="bf-entrada__base">' + esc(T.base) + '</p>' +
        '<p class="bf-entrada__extra">' + esc(T.extra) + '</p>' +
        relojHtml('bf-reloj--grande') +
        '<button type="button" class="bf-entrada__btn"><span>' + esc(T.boton) + '</span><i aria-hidden="true"></i></button>' +
      '</div>' +
      cintasHtml('bf-cintas--entrada');
    document.body.appendChild(caja);
    var relojEntrada = caja.querySelector('.bf-reloj');
    relojes.push(relojEntrada);

    var lienzoCielo = caja.querySelector('.bf-entrada__cielo');
    var pararCielo = lienzoCielo.getContext ? pintarCielo(lienzoCielo, lienzoCielo.getContext('2d'), { densidad: 3400 }) : null;
    var boton = caja.querySelector('.bf-entrada__btn');
    var lienzo = caja.querySelector('.bf-entrada__oro');
    var hueco = caja.querySelector('.bf-entrada__cifra');
    var ctx = lienzo.getContext && lienzo.getContext('2d');
    var W = 0, H = 0, dpr = 1, motas = [], polvo = [], raf = null, t0 = 0, saliendo = false, cerrado = false;
    var raton = { x: -999, y: -999 };
    var FUENTE = '"Playfair Display", Georgia, serif';

    function formar() {
      if (!ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = caja.clientWidth; H = caja.clientHeight;
      lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* La cifra se dibuja en un lienzo aparte y se leen sus píxeles:
         cada punto relleno es el destino de una mota. */
      var r = hueco.getBoundingClientRect(), c0 = caja.getBoundingClientRect();
      var aw = Math.max(1, Math.round(r.width)), ah = Math.max(1, Math.round(r.height));
      var aux = document.createElement('canvas');
      aux.width = aw; aux.height = ah;
      var a = aux.getContext('2d');
      var cuerpo = ah * 0.84;
      a.font = '600 ' + cuerpo + 'px ' + FUENTE;
      /* Que quepa a lo ancho */
      var ancho = a.measureText(T.cifra).width;
      if (ancho > aw * 0.98) { cuerpo *= aw * 0.98 / ancho; a.font = '600 ' + cuerpo + 'px ' + FUENTE; }
      a.textAlign = 'center'; a.textBaseline = 'middle'; a.fillStyle = '#fff';
      a.fillText(T.cifra, aw / 2, ah / 2);
      var px;
      try { px = a.getImageData(0, 0, aw, ah).data; } catch (e) { hueco.classList.remove('is-lienzo'); return; }

      var tope = W < 700 ? 2600 : 5200, paso = 2, puntos;
      do {
        puntos = [];
        for (var y = 0; y < ah; y += paso) for (var x = 0; x < aw; x += paso) {
          if (px[(y * aw + x) * 4 + 3] > 128) puntos.push(x, y);
        }
        paso++;
      } while (puntos.length / 2 > tope);
      /* Lectura en blanco o con ruido: no hay cifra que formar */
      if (puntos.length / 2 < 300) { motas = []; hueco.classList.remove('is-lienzo'); return; }

      var ox = r.left - c0.left, oy = r.top - c0.top, viejas = motas;
      motas = [];
      for (var i = 0; i < puntos.length; i += 2) {
        var v = viejas[i / 2];
        var ang = Math.random() * 6.283, lejos = Math.max(W, H) * (0.55 + Math.random() * 0.5);
        var tono = (puntos[i] / aw + puntos[i + 1] / ah) / 2;
        motas.push({
          x: v ? v.x : W / 2 + Math.cos(ang) * lejos,
          y: v ? v.y : H / 2 + Math.sin(ang) * lejos,
          vx: 0, vy: 0, tx: ox + puntos[i], ty: oy + puntos[i + 1],
          /* Llegan de izquierda a derecha, como si se escribiera */
          espera: v ? 0 : 250 + (puntos[i] / aw) * 900 + Math.random() * 350,
          g: 1 + Math.random() * 0.9,
          tono: tono,
          color: Math.min(4, 1 + Math.floor(tono * 3.4 + Math.random() * 0.6))
        });
      }
      if (!polvo.length) {
        for (var k = 0; k < (W < 700 ? 40 : 90); k++) {
          polvo.push({ x: Math.random() * W, y: Math.random() * H, r: 0.5 + Math.random() * 1.6,
                       v: 0.12 + Math.random() * 0.35, f: Math.random() * 6.283, a: 0.15 + Math.random() * 0.45 });
        }
      }
      hueco.classList.add('is-lienzo');
    }

    var TONOS = ['#FFF6D2', '#F3DC8A', '#E3C155', '#D4AF37', '#B8922A'];
    function pintar(t) {
      if (!t0) t0 = t;
      var dt = t - t0, i, m;
      ctx.clearRect(0, 0, W, H);

      /* Polvo de oro subiendo despacio */
      ctx.fillStyle = '#E9C85A';
      for (var k = 0; k < polvo.length; k++) {
        var p = polvo[k];
        p.y -= p.v; p.f += 0.01; p.x += Math.sin(p.f) * 0.25;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.f * 3));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* Física */
      for (i = 0; i < motas.length; i++) {
        m = motas[i];
        if (saliendo) { m.vx *= 1.04; m.vy *= 1.04; m.x += m.vx; m.y += m.vy; continue; }
        if (dt < m.espera) continue;
        var ax = (m.tx - m.x) * 0.055, ay = (m.ty - m.y) * 0.055;
        var dx = m.x - raton.x, dy = m.y - raton.y, dist = dx * dx + dy * dy;
        if (dist < 8100) { var f = (8100 - dist) / 8100 * 2.6, l = Math.sqrt(dist) || 1; ax += dx / l * f; ay += dy / l * f; }
        m.vx = (m.vx + ax) * 0.8; m.vy = (m.vy + ay) * 0.8;
        m.x += m.vx; m.y += m.vy;
      }

      /* Pintado por tonos (pocas veces se cambia de color) y un brillo
         que cruza la cifra cada pocos segundos */
      var brillo = ((dt % 4200) / 4200) * 1.6 - 0.3;
      for (var c = 0; c < TONOS.length; c++) {
        ctx.fillStyle = TONOS[c];
        for (i = 0; i < motas.length; i++) {
          m = motas[i];
          var tono = Math.abs(m.tono - brillo) < 0.06 ? 0 : m.color;
          if (tono === c) ctx.fillRect(m.x, m.y, m.g, m.g);
        }
      }
      raf = requestAnimationFrame(pintar);
    }

    function quieto() {
      /* Sin movimiento: la cifra ya formada, sin animación */
      ctx.clearRect(0, 0, W, H);
      for (var j = 0; j < motas.length; j++) {
        motas[j].x = motas[j].tx; motas[j].y = motas[j].ty;
        ctx.fillStyle = TONOS[motas[j].color];
        ctx.fillRect(motas[j].x, motas[j].y, motas[j].g, motas[j].g);
      }
    }

    function arrancar() {
      if (cerrado) return;
      formar();
      if (!ctx || !motas.length) return;
      if (sinMovimiento) quieto();
      else if (!raf) raf = requestAnimationFrame(pintar);
    }
    /* Se espera a la tipografía de la marca para que la cifra salga con ella */
    var listo = false;
    function unaVez() { if (!listo) { listo = true; arrancar(); caja.classList.add('is-lista'); } }
    if (document.fonts && document.fonts.load) {
      document.fonts.load('600 80px "Playfair Display"').then(unaVez, unaVez);
      setTimeout(unaVez, 1500);
    } else unaVez();

    var reajuste;
    function alCambiarTamano() { clearTimeout(reajuste); reajuste = setTimeout(function () { if (listo) arrancar(); }, 180); }
    window.addEventListener('resize', alCambiarTamano, { passive: true });
    caja.addEventListener('pointermove', function (e) {
      var c0 = caja.getBoundingClientRect(); raton.x = e.clientX - c0.left; raton.y = e.clientY - c0.top;
    }, { passive: true });
    caja.addEventListener('pointerleave', function () { raton.x = raton.y = -999; });

    function cerrar() {
      if (cerrado) return;
      cerrado = true;
      clearTimeout(solo);
      document.removeEventListener('keydown', tecla);
      window.removeEventListener('resize', alCambiarTamano);
      /* Las motas salen despedidas mientras la pantalla se desvanece */
      for (var i = 0; i < motas.length; i++) {
        var m = motas[i], dx = m.x - W / 2, dy = m.y - H / 2, l = Math.sqrt(dx * dx + dy * dy) || 1;
        m.vx = dx / l * (2 + Math.random() * 5); m.vy = dy / l * (2 + Math.random() * 5) - 1;
      }
      saliendo = true;
      caja.classList.add('is-saliendo');
      html.classList.remove('bf-telon');
      setTimeout(function () {
        if (raf) cancelAnimationFrame(raf);
        if (typeof pararCielo === 'function') pararCielo();
        var n = relojes.indexOf(relojEntrada);
        if (n >= 0) relojes.splice(n, 1);
        if (caja.parentNode) caja.parentNode.removeChild(caja);
      }, sinMovimiento ? 0 : 900);
    }
    function tecla(e) { if (e.key === 'Escape') cerrar(); }
    boton.addEventListener('click', cerrar);
    document.addEventListener('keydown', tecla);
    try { boton.focus({ preventScroll: true }); } catch (e) {}
    /* Nadie se queda atrapado: pasado un rato, se abre sola */
    caja.style.setProperty('--bf-espera', T.segundos + 's');
    var solo = setTimeout(cerrar, T.segundos * 1000);
  }

  /* ── Montaje ── */
  function montar() {
    firmamento();
    banda();
    interruptor();
    portada();
    pintarMarca();
    tic();
    intervalo = setInterval(tic, 1000);

    if (hacerTelon) {
      guardar(CLAVE_VISTO, '1');
      telon();
    } else if (hacerApagon) {
      guardar(CLAVE_VISTO, '1');
      /* Un instante con la web encendida, y se va la luz desde el logo */
      setTimeout(function () {
        var logo = document.querySelector('.header__logo-img');
        var r = logo ? logo.getBoundingClientRect() : { left: innerWidth / 2, top: 0, width: 0, height: 0 };
        cambiarLuz(true, r.left + r.width / 2, r.top + r.height / 2, true);
        var b = document.querySelector('.bf-interruptor');
        if (b) { b.setAttribute('aria-pressed', 'true'); b.setAttribute('aria-label', 'Encender la luz'); b.setAttribute('title', 'Encender la luz'); }
      }, 700);
    } else if (puedeNoche) {
      guardar(CLAVE_VISTO, '1');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
