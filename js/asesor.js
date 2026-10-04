/* =============================================
   NUVORA DESCANSO — Asesor de descanso
   =============================================
   Un test de ocho preguntas que recomienda colchón, almohada y canapé,
   en la medida de la cama del cliente, y le enseña cuánto se ahorra si
   se lo lleva todo en pack.

   Quién decide qué:
   · La RECOMENDACIÓN la decide este fichero, con reglas fijas y el
     catálogo real (window.NuvoraCatalog). Siempre la misma respuesta
     para las mismas preguntas, y nunca un producto o un precio que no
     existan.
   · La EXPLICACIÓN también se escribe aquí, a partir de las mismas
     respuestas: sin IA ni llamadas a ningún servidor.

   Los precios salen del catálogo y el descuento del pack se calcula
   igual que en la cesta, el checkout y el servidor: por línea y
   redondeando a céntimos, para que lo que se enseña cuadre con lo que
   se cobra.
   ============================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('asesor');
    if (!root) return;
    var CATALOG = window.NuvoraCatalog;
    if (!CATALOG || !CATALOG.aurea) return;

    var PACK_RATE = window.NuvoraPackRate || 0.12;
    var COLCHONES = ['aurea', 'aurea-muelles', 'supreme'];
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ══════════════════════════════════════════════
       PREGUNTAS
       ══════════════════════════════════════════════ */
    var ICONOS = {
      quien:   '<path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M17 3.5a4 4 0 0 1 0 7"/><path d="M22 21c0-3-1.8-5.5-4.5-6.5"/>',
      postura: '<path d="M3 18h18"/><path d="M3 14h18v4"/><path d="M6.5 14a2.5 2.5 0 1 1 0-5"/><path d="M10 11h8a3 3 0 0 1 3 3"/>',
      peso:    '<path d="M6 7h12l2 13H4z"/><path d="M9.5 7a2.5 2.5 0 0 1 5 0"/>',
      temp:    '<path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z"/>',
      tacto:   '<path d="M7 11V6a2 2 0 0 1 4 0v5"/><path d="M11 10V4a2 2 0 0 1 4 0v6"/><path d="M15 10V6.5a2 2 0 0 1 4 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L3 16a2 2 0 0 1 3.2-2.4L7 15"/>',
      presu:   '<circle cx="12" cy="12" r="9"/><path d="M15 9.5a3.5 3.5 0 1 0 0 5"/><path d="M7.5 11h5M7.5 13h5"/>',
      medida:  '<path d="M3 7h18v10H3z"/><path d="M7 7v3M11 7v4M15 7v3M19 7v4"/>',
      extras:  '<path d="M20 12v9H4v-9"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'
    };

    var PREGUNTAS = [
      { id: 'quien', titulo: '¿Para quién es el colchón?',
        ayuda: 'Si dormís dos, lo que hace uno lo nota el otro. Eso cambia mucho la elección.',
        opciones: [
          { v: 'solo',   t: 'Solo para mí' },
          { v: 'pareja', t: 'Para dos',      d: 'Comparto la cama' }
        ] },
      { id: 'postura', titulo: '¿Cómo duermes casi siempre?',
        ayuda: 'La postura decide dónde tiene que ceder el colchón y dónde sujetar.',
        opciones: [
          { v: 'lado',       t: 'De lado' },
          { v: 'espalda',    t: 'Boca arriba' },
          { v: 'boca-abajo', t: 'Boca abajo' },
          { v: 'mueve',      t: 'Me muevo mucho', d: 'Cambio de postura toda la noche' }
        ] },
      { id: 'peso', titulo: '¿Cuánto pesas, más o menos?',
        ayuda: 'Si dormís dos, piensa en quien más pese: es quien más le exige al colchón.',
        opciones: [
          { v: 'p1', t: 'Menos de 60 kg' },
          { v: 'p2', t: 'Entre 60 y 80 kg' },
          { v: 'p3', t: 'Entre 80 y 100 kg' },
          { v: 'p4', t: 'Más de 100 kg' }
        ] },
      { id: 'temp', titulo: 'Por la noche, ¿cómo vas de temperatura?',
        ayuda: 'Hay materiales que guardan el calor y otros que lo dejan escapar.',
        opciones: [
          { v: 'calor',      t: 'Paso calor' },
          { v: 'normal',     t: 'Ni frío ni calor' },
          { v: 'frio',       t: 'Soy friolero' },
          { v: 'estacional', t: 'Depende de la época', d: 'Calor en verano, frío en invierno' }
        ] },
      { id: 'tacto', titulo: '¿Qué sensación te gusta al tumbarte?',
        ayuda: 'No hay una buena y otra mala: es cuestión de gusto, y cuenta.',
        opciones: [
          { v: 'abrazo', t: 'Que me abrace',          d: 'Notar cómo se adapta a mí' },
          { v: 'medio',  t: 'Un punto intermedio' },
          { v: 'firme',  t: 'Firme, que no me hunda', d: 'Notar sujeción y moverme sin esfuerzo' }
        ] },
      { id: 'presu', titulo: '¿Cuánto quieres invertir?',
        ayuda: 'Te recomendaremos lo que mejor te va dentro de lo que buscas.',
        opciones: [
          { v: 'ajustado',   t: 'Lo justo',    d: 'Buena calidad al mejor precio' },
          { v: 'equilibrio', t: 'Equilibrio',  d: 'Pagar más solo si se nota' },
          { v: 'top',        t: 'Lo mejor',    d: 'El colchón más completo' }
        ] },
      { id: 'medida', tipo: 'medida', titulo: '¿Qué medida tiene tu cama?',
        ayuda: 'Ancho por largo, en centímetros. Así te enseñamos el precio exacto.' },
      { id: 'extras', tipo: 'extras', titulo: '¿Qué más necesitas?',
        ayuda: 'Te decimos cuál te va mejor y, si te lo llevas todo, cuánto te ahorras.' }
    ];
    var TOTAL = PREGUNTAS.length;

    /* ══════════════════════════════════════════════
       MOTOR DE RECOMENDACIÓN
       ══════════════════════════════════════════════
       Cada respuesta suma o resta puntos a cada colchón. Gana el que
       más suma; si empatan, el más barato. Las reglas salen de lo que
       dicen las propias fichas: el viscoelástico acoge y es el de mejor
       precio; el de muelles es más firme, más fresco y aísla a la
       pareja; el Supreme tiene dos caras —lana para el invierno,
       algodón para el verano— y muelles de 18 cm. */
    /* Ojo con el Supreme: es bueno en casi todo, y en un sistema de puntos
       lo que suma un poco en todas las respuestas acaba ganando a lo que es
       el mejor en algo. Por eso solo puntúa fuerte en lo que de verdad lo
       distingue —las dos caras y los muelles de 18 cm— y resta cuando el
       cliente pide no pagar de más. Antes se llevaba el 43 % de las
       recomendaciones, siendo 280 € más caro que el Aurea. */
    var REGLAS = {
      quien: {
        solo:   { 'aurea': 4 },
        pareja: { 'aurea-muelles': 14, 'supreme': 14 }
      },
      postura: {
        lado:         { 'aurea': 14, 'supreme': 7, 'aurea-muelles': 2 },
        espalda:      { 'aurea-muelles': 9, 'supreme': 6, 'aurea': 6 },
        'boca-abajo': { 'aurea-muelles': 13, 'supreme': 4, 'aurea': -5 },
        mueve:        { 'aurea-muelles': 10, 'supreme': 6 }
      },
      peso: {
        p1: { 'aurea': 12, 'supreme': 2, 'aurea-muelles': -2 },
        p2: { 'aurea': 6, 'aurea-muelles': 6, 'supreme': 6 },
        p3: { 'aurea-muelles': 10, 'supreme': 10 },
        p4: { 'aurea-muelles': 13, 'supreme': 15, 'aurea': -8 }
      },
      temp: {
        calor:      { 'aurea-muelles': 12, 'supreme': 8, 'aurea': -8 },
        normal:     {},
        frio:       { 'aurea': 8, 'supreme': 6 },
        estacional: { 'supreme': 22, 'aurea-muelles': 4 }
      },
      tacto: {
        abrazo: { 'aurea': 16, 'supreme': 6 },
        medio:  { 'aurea': 6, 'aurea-muelles': 6, 'supreme': 6 },
        firme:  { 'aurea-muelles': 16, 'supreme': 6, 'aurea': -8 }
      },
      presu: {
        ajustado:   { 'aurea': 14, 'aurea-muelles': 6, 'supreme': -24 },
        /* "Pagar más solo si se nota": por defecto el más barato, y que
           sean las otras respuestas las que justifiquen subir. */
        equilibrio: { 'aurea': 8, 'aurea-muelles': 3, 'supreme': -12 },
        top:        { 'supreme': 24, 'aurea-muelles': 4 }
      }
    };

    /* Por qué encaja cada colchón con cada respuesta. Solo se enseñan
       los motivos de las respuestas que le han sumado puntos al ganador. */
    var MOTIVOS = {
      'aurea': {
        'quien:solo':      { t: 'Duermes solo', d: 'no necesitas aislar los movimientos de nadie, así que puedes quedarte con el colchón que más se adapta a ti.' },
        'postura:lado':    { t: 'Duermes de lado', d: 'los 2 cm de viscoelástica dejan entrar el hombro y la cadera, que es donde más se carga al dormir de lado.' },
        'postura:espalda': { t: 'Duermes boca arriba', d: 'la espuma HR de 28 kg/m³ sujeta la parte baja de la espalda sin que te hundas.' },
        'peso:p1':         { t: 'Por tu peso', d: 'un colchón más firme apenas cedería contigo; la viscoelástica sí se adapta.' },
        'peso:p2':         { t: 'Por tu peso', d: 'la mezcla de viscoelástica y núcleo HR da el punto justo entre adaptación y sujeción.' },
        'temp:frio':       { t: 'Eres friolero', d: 'la viscoelástica conserva el calor del cuerpo.' },
        'tacto:abrazo':    { t: 'Te gusta que te abrace', d: 'es exactamente la sensación de la viscoelástica: se amolda a ti.' },
        'tacto:medio':     { t: 'Buscas un punto intermedio', d: 'tiene firmeza media: ni te hundes ni lo notas duro.' },
        'presu:ajustado':  { t: 'El mejor precio', d: 'es el colchón más ajustado de la gama, con el mismo tejido, acolchado y garantía que los demás.' },
        'presu:equilibrio':{ t: 'Sin pagar de más', d: 'tiene lo esencial de un buen colchón sin cobrarte por lo que no vas a notar.' }
      },
      'aurea-muelles': {
        'quien:pareja':       { t: 'Dormís dos', d: 'cada muelle va en su funda y trabaja por separado: no notarás cuando tu pareja se mueva o se levante.' },
        'postura:lado':       { t: 'Duermes de lado', d: 'el acolchado de fibra recibe el hombro y los muelles mantienen la columna recta.' },
        'postura:espalda':    { t: 'Duermes boca arriba', d: 'los muelles ensacados reparten el peso de forma uniforme por toda la superficie.' },
        'postura:boca-abajo': { t: 'Duermes boca abajo', d: 'te conviene un apoyo más firme para que la cadera no se hunda, y es firmeza media-firme.' },
        'postura:mueve':      { t: 'Te mueves mucho', d: 'los muelles responden rápido y cambiar de postura no cuesta esfuerzo.' },
        'peso:p2':            { t: 'Por tu peso', d: 'el núcleo de muelles da una sujeción firme sin resultar duro.' },
        'peso:p3':            { t: 'Por tu peso', d: 'los muelles ensacados sujetan mejor que una espuma y se deforman menos con los años.' },
        'peso:p4':            { t: 'Por tu peso', d: 'los muelles ensacados sujetan mejor que una espuma y se deforman menos con los años.' },
        'temp:calor':         { t: 'Pasas calor', d: 'entre los muelles circula el aire, en vez de quedarse debajo del cuerpo.' },
        'temp:estacional':    { t: 'Calor en verano', d: 'la ventilación de los muelles se agradece en las noches de calor.' },
        'tacto:medio':        { t: 'Buscas un punto intermedio', d: 'tiene algo más de sujeción que el viscoelástico, sin llegar a ser duro.' },
        'tacto:firme':        { t: 'Prefieres un tacto firme', d: 'es media-firme, un punto por encima del Aurea viscoelástico.' },
        'presu:ajustado':     { t: 'Un salto pequeño', d: 'por poco más que el viscoelástico ganas aislamiento entre los dos lados y ventilación.' },
        'presu:equilibrio':   { t: 'Equilibrio', d: 'pagas un poco más que por el viscoelástico, y se nota en frescor y en aislamiento.' },
        'presu:top':          { t: 'Calidad sin excesos', d: 'te da muelles ensacados sin llegar al precio del Supreme.' }
      },
      'supreme': {
        'quien:pareja':     { t: 'Dormís dos', d: 'su carcasa de muelles ensacados de 18 cm aísla los movimientos de cada lado de la cama.' },
        'postura:lado':     { t: 'Duermes de lado', d: 'la viscoelástica y el viscogel de las capas de arriba acogen el hombro y la cadera.' },
        'postura:espalda':  { t: 'Duermes boca arriba', d: 'los muelles de 18 cm reparten el peso y la capa ElioSupport® estabiliza la base.' },
        'postura:boca-abajo': { t: 'Duermes boca abajo', d: 'los muelles de 18 cm dan un apoyo estable para que la cadera no se hunda.' },
        'postura:mueve':    { t: 'Te mueves mucho', d: 'los muelles ensacados responden rápido a cada cambio de postura.' },
        'peso:p1':          { t: 'Por tu peso', d: 'sus capas de acogida se adaptan aunque peses poco.' },
        'peso:p2':          { t: 'Por tu peso', d: 'combina acogida arriba y sujeción de muelles abajo.' },
        'peso:p3':          { t: 'Por tu peso', d: 'los 18 cm de muelles ensacados dan la sujeción más sólida de la gama.' },
        'peso:p4':          { t: 'Por tu peso', d: 'los 18 cm de muelles ensacados dan la sujeción más sólida de la gama.' },
        'temp:calor':       { t: 'Pasas calor', d: 'la cara de verano es de algodón natural y el viscogel acumula menos calor que la viscoelástica normal.' },
        'temp:frio':        { t: 'Eres friolero', d: 'la cara de invierno lleva pura lana, que retiene el calor.' },
        'temp:estacional':  { t: 'Calor en verano, frío en invierno', d: 'tiene dos caras: lana para el invierno y algodón para el verano. Le das la vuelta al cambiar de estación.' },
        'tacto:abrazo':     { t: 'Te gusta que te abrace', d: 'sus capas de viscoelástica y viscogel se adaptan al cuerpo.' },
        'tacto:medio':      { t: 'Buscas un punto intermedio', d: 'combina acogida en las capas de arriba con la sujeción de los muelles.' },
        'tacto:firme':      { t: 'Te gusta notar sujeción', d: 'los muelles de 18 cm dan una base firme y estable.' },
        'presu:top':        { t: 'Buscas lo mejor', d: 'es nuestro colchón más completo: once capas repartidas en dos caras.' }
      }
    };

    function puntuar(r) {
      var p = { 'aurea': 50, 'aurea-muelles': 50, 'supreme': 50 };
      var aportes = { 'aurea': [], 'aurea-muelles': [], 'supreme': [] };
      Object.keys(REGLAS).forEach(function (preg) {
        var regla = REGLAS[preg][r[preg]] || {};
        COLCHONES.forEach(function (c) {
          var n = regla[c] || 0;
          p[c] += n;
          if (n > 0) aportes[c].push({ clave: preg + ':' + r[preg], n: n });
        });
      });
      return { puntos: p, aportes: aportes };
    }

    /* "150 × 190 cm" → 150 */
    function anchoDe(label) { var m = /(\d+)\s*×/.exec(label); return m ? parseInt(m[1], 10) : 0; }
    function indiceDe(producto, label) {
      var s = CATALOG[producto].sizes;
      for (var i = 0; i < s.length; i++) if (s[i].label === label) return i;
      return -1;
    }

    /* La almohada, por el ancho de la cama. En camas de 180 y 200 van
       dos de 90 en vez de una sola larga. */
    function almohadaMedida(ancho) {
      if (ancho <= 80)  return { idx: 0, qty: 1 };
      if (ancho <= 120) return { idx: 1, qty: 1 };
      if (ancho <= 140) return { idx: 2, qty: 1 };
      if (ancho <= 160) return { idx: 3, qty: 1 };
      return { idx: 1, qty: 2 };
    }

    function recomendar(r) {
      var res = puntuar(r);
      var precioBase = function (c) { return CATALOG[c].sizes[Math.max(0, indiceDe(c, r.medida))].price; };
      var ranking = COLCHONES.slice().sort(function (a, b) {
        var d = res.puntos[b] - res.puntos[a];
        return d !== 0 ? d : precioBase(a) - precioBase(b);
      });
      var gana = ranking[0];

      var motivos = res.aportes[gana]
        .sort(function (a, b) { return b.n - a.n; })
        .map(function (a) { return MOTIVOS[gana][a.clave]; })
        .filter(Boolean)
        .slice(0, 4);

      /* Almohada: Tencel si hay calor; carbono activo en el resto */
      var almohada = (r.temp === 'calor' || r.temp === 'estacional') ? 'almohada-nuvora-tencel' : 'almohada-nuvora';
      var ancho = anchoDe(r.medida);
      var am = almohadaMedida(ancho);

      /* El canapé tiene que existir en la misma medida exacta. Para 75 y
         80 cm de ancho no se fabrica. */
      var canapeId = 'canape-nuvora-' + (r.color || 'blanco');
      var canapeIdx = CATALOG[canapeId] ? indiceDe(canapeId, r.medida) : -1;

      return {
        ranking: ranking,
        puntos: res.puntos,
        colchon: gana,
        alternativa: ranking[1],
        motivos: motivos,
        colchonIdx: indiceDe(gana, r.medida),
        almohada: almohada,
        almohadaIdx: am.idx,
        almohadaQty: am.qty,
        canape: canapeIdx >= 0 ? canapeId : null,
        canapeIdx: canapeIdx,
        canapeExiste: canapeIdx >= 0
      };
    }

    /* Avisos honestos: lo que conviene saber antes de comprar */
    function aviso(r, rec) {
      var c = rec.colchon;
      if (c === 'aurea' && (r.temp === 'calor' || r.temp === 'estacional')) {
        return 'Si pasas mucho calor, el Aurea Muelles Ensacados es más fresco: entre los muelles circula el aire.';
      }
      if (c === 'aurea' && r.quien === 'pareja') {
        return 'Si os molesta notar al otro, el de muelles ensacados aísla mejor los movimientos de cada lado.';
      }
      if (c === 'supreme') {
        return 'Tiene dos caras, así que hay que darle la vuelta dos veces al año, al cambiar de estación. Es lo que permite tener una para cada época.';
      }
      if (c === 'aurea-muelles' && r.tacto === 'abrazo') {
        return 'Si lo que más buscas es que te abrace, el Aurea viscoelástico se adapta más al cuerpo.';
      }
      return '';
    }

    /* ══════════════════════════════════════════════
       UTILIDADES
       ══════════════════════════════════════════════ */
    function fmt(n) {
      return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    }
    function esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
    }
    function icono(id, cls) {
      return '<svg class="' + (cls || 'as-ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS[id] || '') + '</svg>';
    }
    function mayus(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
    function ruta(id, idx) { return window.NuvoraRuta ? window.NuvoraRuta(id, idx) : '/'; }
    /* Precio con el descuento del pack, igual que la cesta y el servidor */
    function conPack(precio) { return Math.round(precio * (1 - PACK_RATE) * 100) / 100; }

    /* ══════════════════════════════════════════════
       ESTADO Y PINTADO
       ══════════════════════════════════════════════ */
    var resp = {};
    var paso = -1;          /* -1 = portada del test */
    var stage = root.querySelector('[data-as-stage]');

    function cambiar(html, foco) {
      stage.classList.remove('is-in');
      var pintar = function () {
        stage.innerHTML = html;
        /* Forzar reflujo para que la animación de entrada arranque */
        void stage.offsetWidth;
        stage.classList.add('is-in');
        var f = stage.querySelector(foco || '[data-as-focus]');
        if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
        var top = root.getBoundingClientRect().top + window.pageYOffset - 90;
        if (Math.abs(window.pageYOffset - top) > 140) {
          window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
        }
      };
      if (reduce) pintar(); else setTimeout(pintar, 160);
    }

    function cabecera(i) {
      var pct = Math.round((i / TOTAL) * 100);
      return (
        '<div class="as-top">' +
          (i > 0
            ? '<button type="button" class="as-back" data-as-back>' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>Atrás</button>'
            : '<span></span>') +
          '<span class="as-count">Pregunta ' + (i + 1) + ' de ' + TOTAL + '</span>' +
        '</div>' +
        '<div class="as-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '" aria-label="Progreso del test">' +
          '<span style="width:' + pct + '%"></span>' +
        '</div>'
      );
    }

    function pintarPregunta(i) {
      paso = i;
      var q = PREGUNTAS[i];
      var html = cabecera(i) +
        '<div class="as-q">' +
          icono(q.id, 'as-q__ico') +
          '<h2 class="as-q__title" tabindex="-1" data-as-focus>' + esc(q.titulo) + '</h2>' +
          '<p class="as-q__help">' + esc(q.ayuda) + '</p>';

      if (q.tipo === 'medida') html += htmlMedida();
      else if (q.tipo === 'extras') html += htmlExtras();
      else {
        html += '<div class="as-opts as-opts--' + q.opciones.length + '">';
        q.opciones.forEach(function (o) {
          var sel = resp[q.id] === o.v;
          html +=
            '<button type="button" class="as-opt' + (sel ? ' is-sel' : '') + '" data-as-opt="' + esc(o.v) + '" aria-pressed="' + sel + '">' +
              '<span class="as-opt__txt"><strong>' + esc(o.t) + '</strong>' + (o.d ? '<small>' + esc(o.d) + '</small>' : '') + '</span>' +
              '<span class="as-opt__dot" aria-hidden="true"></span>' +
            '</button>';
        });
        html += '</div>';
      }
      html += '</div>';
      cambiar(html);
    }

    /* — Medida — */
    var POPULARES = ['90 × 190 cm', '105 × 190 cm', '135 × 190 cm', '150 × 190 cm', '160 × 200 cm', '180 × 200 cm'];
    function htmlMedida() {
      var actual = resp.medida || '';
      var h = '<div class="as-sizes">';
      POPULARES.forEach(function (m) {
        var sel = actual === m;
        h += '<button type="button" class="as-size' + (sel ? ' is-sel' : '') + '" data-as-size="' + esc(m) + '" aria-pressed="' + sel + '">' + esc(m.replace(' cm', '')) + '<small>cm</small></button>';
      });
      h += '</div>';
      var todas = CATALOG.aurea.sizes.map(function (s) { return s.label; });
      var otra = actual && POPULARES.indexOf(actual) < 0;
      h += '<label class="as-sizesel"><span>¿Otra medida?</span><select data-as-sizesel>' +
        '<option value="">Elige entre las 24 medidas</option>' +
        todas.map(function (m) {
          return '<option value="' + esc(m) + '"' + (otra && actual === m ? ' selected' : '') + '>' + esc(m) + '</option>';
        }).join('') +
        '</select></label>';
      h += '<div class="as-sizefoot">' +
        '<button type="button" class="as-link" data-as-size="?">Aún no lo sé</button>' +
        '<a class="as-link" href="/blog/medidas-de-colchones" target="_blank" rel="noopener">Cómo medir tu cama &rarr;</a>' +
      '</div>';
      return h;
    }

    /* — Complementos y comentario — */
    var COLORES = [
      { v: 'blanco',   t: 'Blanco',   c: '#F2EDE4' },
      { v: 'cambrian', t: 'Cambrian', c: '#B6A78F' },
      { v: 'wengue',   t: 'Wengué',   c: '#49362C' }
    ];
    function htmlExtras() {
      var ancho = anchoDe(resp.medida || '150 × 190 cm');
      var sinCanape = ancho < 90;
      if (sinCanape) resp.canapeOn = false;
      if (resp.canapeOn === undefined) resp.canapeOn = true;
      if (resp.almohadaOn === undefined) resp.almohadaOn = true;
      if (!resp.color) resp.color = 'blanco';

      var h = '<div class="as-extras">' +
        '<div class="as-extra' + (resp.canapeOn ? ' is-sel' : '') + (sinCanape ? ' is-off' : '') + '">' +
          '<button type="button" class="as-extra__head" data-as-toggle="canapeOn" aria-pressed="' + !!resp.canapeOn + '"' + (sinCanape ? ' disabled' : '') + '>' +
            '<span class="as-check" aria-hidden="true"></span>' +
            '<span><strong>Canapé abatible</strong><small>' +
              (sinCanape ? 'No lo fabricamos para camas de 75 y 80 cm' : 'La base, con todo el espacio de debajo para guardar') +
            '</small></span>' +
          '</button>' +
          (sinCanape ? '' :
            '<div class="as-colors" role="group" aria-label="Acabado del canapé">' +
              COLORES.map(function (c) {
                var sel = resp.color === c.v;
                return '<button type="button" class="as-color' + (sel ? ' is-sel' : '') + '" data-as-color="' + c.v + '" aria-pressed="' + sel + '"' + (resp.canapeOn ? '' : ' tabindex="-1"') + '>' +
                  '<span style="background:' + c.c + '"></span>' + c.t + '</button>';
              }).join('') +
            '</div>') +
        '</div>' +
        '<div class="as-extra' + (resp.almohadaOn ? ' is-sel' : '') + '">' +
          '<button type="button" class="as-extra__head" data-as-toggle="almohadaOn" aria-pressed="' + !!resp.almohadaOn + '">' +
            '<span class="as-check" aria-hidden="true"></span>' +
            '<span><strong>Almohada</strong><small>Te diremos cuál va con cómo duermes</small></span>' +
          '</button>' +
        '</div>' +
      '</div>';

      h += '<button type="button" class="as-go" data-as-finish>Ver mi recomendación' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</button>';
      return h;
    }

    /* — Pantalla intermedia: mientras se calcula y se pide el texto — */
    function pintarCalculando() {
      paso = TOTAL;
      cambiar(
        '<div class="as-calc" role="status" aria-live="polite">' +
          '<div class="as-calc__orb" aria-hidden="true"><span></span><span></span><span></span></div>' +
          '<p class="as-calc__line" data-as-calcline>Analizando tus respuestas…</p>' +
        '</div>'
      );
      var frases = ['Comparando los tres colchones…', 'Ajustando la medida y los complementos…', 'Preparando tu recomendación…'];
      frases.forEach(function (f, k) {
        setTimeout(function () {
          var l = stage.querySelector('[data-as-calcline]');
          if (l) l.textContent = f;
        }, 420 * (k + 1));
      });
    }

    /* ══════════════════════════════════════════════
       RESULTADO
       ══════════════════════════════════════════════ */
    var rec = null;

    function nombreCorto(id) {
      return ({ 'aurea': 'Aurea', 'aurea-muelles': 'Aurea Muelles', 'supreme': 'Supreme' })[id] || CATALOG[id].name;
    }

    function rasgos(r) {
      var t = [];
      t.push(r.quien === 'pareja' ? 'dormís dos' : 'duermes solo');
      t.push(({ lado: 'duermes de lado', espalda: 'duermes boca arriba', 'boca-abajo': 'duermes boca abajo', mueve: 'te mueves mucho por la noche' })[r.postura]);
      var temp = ({ calor: 'pasas calor', frio: 'eres friolero', estacional: 'pasas calor en verano y frío en invierno' })[r.temp];
      if (temp) t.push(temp);
      else if (r.tacto === 'abrazo') t.push('te gusta que el colchón te abrace');
      else if (r.tacto === 'firme') t.push('prefieres un tacto firme');
      return t.slice(0, 3);
    }
    function lista(arr) {
      return arr.length < 2 ? (arr[0] || '') : arr.slice(0, -1).join(', ') + ' y ' + arr[arr.length - 1];
    }

    /* La explicación en prosa: unos párrafos, como te lo contaríamos en tienda */
    function explicacion(r, rc) {
      var nombre = CATALOG[rc.colchon].name;
      var p1 = 'Por lo que nos cuentas, ' + lista(rasgos(r)) + ', el ' + nombre + ' es el que mejor encaja contigo. ' +
        (rc.motivos[0] ? mayus(rc.motivos[0].d) : '');
      var alm = rc.almohada === 'almohada-nuvora-tencel'
        ? 'la de Tencel, que absorbe la humedad y se mantiene fresca toda la noche'
        : 'la de carbono activo, que absorbe los olores y conserva la funda limpia más tiempo';
      var p2 = 'Para completarlo, la almohada que te va es ' + alm + '.' +
        (rc.canape && r.canapeOn ? ' Y el canapé en ' + COLORES.filter(function (c) { return 'canape-nuvora-' + c.v === rc.canape; })[0].t.toLowerCase() +
          ', en tu misma medida, para ganar todo el espacio de debajo de la cama.' : '');
      return [p1, p2];
    }

    function tarjetaProducto(id, idx, etiqueta, qty) {
      var p = CATALOG[id];
      var s = p.sizes[idx];
      var img = p.images && p.images[0] ? p.images[0] : '';
      return (
        '<article class="as-prod">' +
          '<a class="as-prod__img" href="' + esc(ruta(id, idx)) + '"><img src="' + esc(img.replace(/\.webp$/, '-md.webp')) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" data-as-fallback="' + esc(img) + '"></a>' +
          '<div class="as-prod__body">' +
            '<span class="as-prod__kind">' + esc(etiqueta) + '</span>' +
            '<h4 class="as-prod__name"><a href="' + esc(ruta(id, idx)) + '">' + esc(p.name) + '</a></h4>' +
            '<span class="as-prod__size">' + esc(s.label) + (qty > 1 ? ' · ' + qty + ' unidades' : '') + '</span>' +
          '</div>' +
          '<span class="as-prod__price">' + fmt(s.price * (qty || 1)) + '</span>' +
        '</article>'
      );
    }

    function pintarResultado() {
      rec = recomendar(resp);
      var r = resp;
      var c = CATALOG[rec.colchon];
      var cs = c.sizes[rec.colchonIdx];
      var alt = CATALOG[rec.alternativa];
      var altIdx = indiceDe(rec.alternativa, r.medida);
      var top = rec.puntos[rec.ranking[0]];
      var avisoTxt = aviso(r, rec);
      var medidaSupuesta = !!r.medidaSupuesta;

      /* — Barras de afinidad: relativas al ganador, sin porcentajes
         inventados. Lo que se enseña es el orden y la distancia. — */
      var etiquetasRank = ['Tu mejor opción', 'También te encaja', 'Menos indicado para ti'];
      var barras = rec.ranking.map(function (id, k) {
        var w = Math.max(14, Math.round((rec.puntos[id] / top) * 100));
        return (
          '<a class="as-rank' + (k === 0 ? ' is-top' : '') + '" href="' + esc(ruta(id, indiceDe(id, r.medida))) + '">' +
            '<span class="as-rank__name">' + esc(nombreCorto(id)) + '<small>' + etiquetasRank[k] + '</small></span>' +
            '<span class="as-rank__bar"><span style="--w:' + w + '%"></span></span>' +
            '<span class="as-rank__price">' + fmt(CATALOG[id].sizes[indiceDe(id, r.medida)].price) + '</span>' +
          '</a>'
        );
      }).join('');

      var motivosHtml = rec.motivos.map(function (m) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>' +
          '<span><strong>' + esc(m.t) + ':</strong> ' + esc(m.d) + '</span></li>';
      }).join('');

      /* — Pack — */
      var lineasPack = [
        { id: rec.colchon, idx: rec.colchonIdx, qty: 1 },
        rec.canapeExiste ? { id: rec.canape, idx: rec.canapeIdx, qty: 1 } : null,
        { id: rec.almohada, idx: rec.almohadaIdx, qty: rec.almohadaQty }
      ].filter(Boolean);
      var hayPack = rec.canapeExiste;
      var suelto = 0, enPack = 0;
      lineasPack.forEach(function (l) {
        var pr = CATALOG[l.id].sizes[l.idx].price;
        suelto += pr * l.qty;
        enPack += conPack(pr) * l.qty;
      });
      suelto = Math.round(suelto * 100) / 100;
      enPack = Math.round(enPack * 100) / 100;
      var ahorro = Math.round((suelto - enPack) * 100) / 100;
      var eligioTodo = r.canapeOn && r.almohadaOn;

      var packHtml;
      if (hayPack) {
        packHtml =
          '<section class="as-pack" aria-labelledby="asPackT">' +
            '<span class="as-pack__eyebrow">' + (eligioTodo ? 'Tu pack de descanso' : '¿Y si te lo llevas todo?') + '</span>' +
            '<h3 class="as-pack__title" id="asPackT">' +
              (eligioTodo ? 'Todo junto, un 12 % menos' : 'Con canapé y almohada, el pack te ahorra ' + fmt(ahorro)) +
            '</h3>' +
            '<ul class="as-pack__list">' +
              lineasPack.map(function (l) {
                var pp = CATALOG[l.id];
                return '<li><span>' + esc(pp.name) + '<small>' + esc(pp.sizes[l.idx].label) + (l.qty > 1 ? ' · ' + l.qty + ' uds.' : '') + '</small></span>' +
                  '<span>' + fmt(pp.sizes[l.idx].price * l.qty) + '</span></li>';
              }).join('') +
            '</ul>' +
            '<div class="as-pack__sum">' +
              '<span class="as-pack__was">Por separado <s>' + fmt(suelto) + '</s></span>' +
              '<span class="as-pack__now">' + fmt(enPack) + '</span>' +
              '<span class="as-pack__save">Ahorras ' + fmt(ahorro) + '</span>' +
            '</div>' +
            '<button type="button" class="as-pack__btn" data-as-addpack>Añadir el pack a la cesta</button>' +
            '<p class="as-pack__fine">Envío gratis, 30 noches de prueba y el descuento aplicado ya en la cesta.</p>' +
          '</section>';
      } else {
        packHtml =
          '<section class="as-pack as-pack--soft">' +
            '<span class="as-pack__eyebrow">Sobre el pack</span>' +
            '<h3 class="as-pack__title">Para camas de ' + anchoDe(r.medida) + ' cm no hay canapé</h3>' +
            '<p class="as-pack__fine">El pack con descuento lleva colchón, canapé y almohada, y el canapé empieza en 90 cm de ancho. Puedes llevarte el colchón y la almohada igualmente.</p>' +
            '<button type="button" class="as-pack__btn" data-as-addpack>Añadir colchón y almohada</button>' +
          '</section>';
      }

      /* — Complementos — */
      var compl = '';
      compl += tarjetaProducto(rec.almohada, rec.almohadaIdx, 'Tu almohada', rec.almohadaQty);
      if (rec.canapeExiste && r.canapeOn) compl += tarjetaProducto(rec.canape, rec.canapeIdx, 'Tu canapé', 1);

      var porQueAlm = rec.almohada === 'almohada-nuvora-tencel'
        ? 'Funda de Tencel: absorbe la humedad y se mantiene fresca, que es lo que pide quien pasa calor.'
        : 'Funda de carbono activo: absorbe los olores en vez de taparlos.';
      var notaAlm = rec.almohadaQty > 1 ? ' En una cama de ' + anchoDe(r.medida) + ' van mejor dos de 90 que una larga.' : '';
      var notaBocaAbajo = r.postura === 'boca-abajo' ? ' Durmiendo boca abajo, colócala baja.' : '';

      var html =
        '<div class="as-res">' +
          '<div class="as-res__hero">' +
            '<div class="as-res__media">' +
              '<img src="' + esc(c.images[0]) + '" alt="' + esc(c.name) + '" fetchpriority="high" decoding="async">' +
              '<span class="as-res__badge">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.9 6.9L22 9.6l-5.4 4.7L18.2 22 12 18.3 5.8 22l1.6-7.7L2 9.6l7.1-.7z"/></svg>' +
                'Tu mejor opción</span>' +
            '</div>' +
            '<div class="as-res__info">' +
              '<span class="as-res__eyebrow">Tu recomendación</span>' +
              '<h2 class="as-res__name" tabindex="-1" data-as-focus>' + esc(c.name) + '</h2>' +
              '<p class="as-res__sum">' + esc(c.resumen || '') + '</p>' +
              '<div class="as-res__price"><strong>' + fmt(cs.price) + '</strong><span>' + esc(cs.label) +
                (medidaSupuesta ? ' · la medida más habitual; cámbiala en la ficha' : '') + '</span></div>' +
              '<div class="as-res__ctas">' +
                '<button type="button" class="as-btn as-btn--solid" data-as-add="colchon">Añadir a la cesta</button>' +
                '<a class="as-btn as-btn--ghost" href="' + esc(ruta(rec.colchon, rec.colchonIdx)) + '">Ver el colchón</a>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="as-res__grid">' +
            '<section class="as-card as-why">' +
              '<h3 class="as-card__title">Por qué este y no otro</h3>' +
              '<ul class="as-why__list">' + motivosHtml + '</ul>' +
              (avisoTxt ? '<p class="as-why__note"><strong>Ten en cuenta:</strong> ' + esc(avisoTxt) + '</p>' : '') +
            '</section>' +

            '<section class="as-card as-ai">' +
              '<h3 class="as-card__title">' +
                '<span class="as-ai__spark" aria-hidden="true">✦</span>Lo que te diríamos en tienda' +
              '</h3>' +
              '<div class="as-ai__body is-ready">' +
                explicacion(r, rec).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
              '</div>' +
            '</section>' +
          '</div>' +

          '<section class="as-card as-ranks">' +
            '<h3 class="as-card__title">Cómo encaja cada colchón contigo</h3>' +
            '<p class="as-card__sub">Comparado con tus respuestas, en ' + esc(r.medida) + '.</p>' +
            barras +
            '<p class="as-alt">Si dudas, el <a href="' + esc(ruta(rec.alternativa, altIdx)) + '">' + esc(alt.name) + '</a> es tu segunda opción' +
              (rec.puntos[rec.alternativa] >= top - 6 ? ', y está muy cerca' : '') + '.</p>' +
          '</section>' +

          '<section class="as-card as-compl">' +
            '<h3 class="as-card__title">Lo que lo completa</h3>' +
            '<p class="as-card__sub">' + esc(porQueAlm + notaAlm + notaBocaAbajo) + '</p>' +
            '<div class="as-compl__list">' + compl + '</div>' +
          '</section>' +

          packHtml +

          '<div class="as-res__foot">' +
            '<button type="button" class="as-link" data-as-restart>Volver a empezar</button>' +
            '<span>Recomendación orientativa. Con las 30 noches de prueba, si no aciertas, lo recogemos gratis.</span>' +
          '</div>' +
        '</div>';

      paso = TOTAL + 1;
      cambiar(html);
      guardarEnUrl();
    }

    /* ══════════════════════════════════════════════
       CESTA
       ══════════════════════════════════════════════ */
    function linea(id, idx) {
      var p = CATALOG[id];
      return {
        id: id, name: p.name, type: p.type,
        sizeIdx: idx, sizeLabel: p.sizes[idx].label,
        price: p.sizes[idx].price, img: p.images[0]
      };
    }
    function anadirColchon() {
      if (!window.NuvoraCart) return;
      window.NuvoraCart.add(linea(rec.colchon, rec.colchonIdx));
    }
    function anadirPack() {
      if (!window.NuvoraCart || !window.NuvoraCart.addMany) return;
      var lineas = [linea(rec.colchon, rec.colchonIdx)];
      if (rec.canapeExiste) lineas.push(linea(rec.canape, rec.canapeIdx));
      /* Dos almohadas en camas grandes: se añade la línea dos veces y la
         cesta la agrupa en una con cantidad 2 */
      for (var k = 0; k < rec.almohadaQty; k++) lineas.push(linea(rec.almohada, rec.almohadaIdx));
      window.NuvoraCart.addMany(lineas);
    }

    /* ══════════════════════════════════════════════
       ENLACE COMPARTIBLE
       ══════════════════════════════════════════════
       El resultado queda en la dirección (#r=...): si se recarga o se
       comparte, se vuelve a ver la misma recomendación. */
    var CLAVES = ['quien', 'postura', 'peso', 'temp', 'tacto', 'presu'];
    function guardarEnUrl() {
      var partes = CLAVES.map(function (k) { return resp[k]; });
      partes.push(resp.medida.replace(/\s|cm/g, ''));
      partes.push(resp.canapeOn ? (resp.color || 'blanco') : '-');
      partes.push(resp.almohadaOn ? 'a' : '-');
      try { history.replaceState(null, '', '#r=' + partes.join('.')); } catch (e) {}
    }
    function leerDeUrl() {
      var m = /#r=([^&]+)/.exec(location.hash || '');
      if (!m) return false;
      var p = decodeURIComponent(m[1]).split('.');
      if (p.length !== 9) return false;
      var r = {};
      for (var i = 0; i < CLAVES.length; i++) {
        var k = CLAVES[i];
        if (!REGLAS[k][p[i]]) return false;
        r[k] = p[i];
      }
      var mm = /^(\d+)×(\d+)$/.exec(p[6]);
      if (!mm) return false;
      r.medida = mm[1] + ' × ' + mm[2] + ' cm';
      if (indiceDe('aurea', r.medida) < 0) return false;
      r.canapeOn = p[7] !== '-';
      r.color = r.canapeOn && /^(blanco|cambrian|wengue)$/.test(p[7]) ? p[7] : 'blanco';
      r.almohadaOn = p[8] === 'a';
      resp = r;
      return true;
    }

    /* ══════════════════════════════════════════════
       INTERACCIÓN
       ══════════════════════════════════════════════ */
    function siguiente() {
      if (paso < TOTAL - 1) pintarPregunta(paso + 1);
    }

    root.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('button, a') : null;
      if (!t || !root.contains(t)) return;

      if (t.hasAttribute('data-as-start')) { pintarPregunta(0); return; }
      if (t.hasAttribute('data-as-back'))  { if (paso > 0) pintarPregunta(paso - 1); return; }

      if (t.hasAttribute('data-as-opt')) {
        var q = PREGUNTAS[paso];
        resp[q.id] = t.getAttribute('data-as-opt');
        stage.querySelectorAll('[data-as-opt]').forEach(function (b) {
          var on = b === t;
          b.classList.toggle('is-sel', on);
          b.setAttribute('aria-pressed', on);
        });
        setTimeout(siguiente, reduce ? 0 : 260);
        return;
      }

      if (t.hasAttribute('data-as-size')) {
        var v = t.getAttribute('data-as-size');
        if (v === '?') { resp.medida = '150 × 190 cm'; resp.medidaSupuesta = true; }
        else { resp.medida = v; resp.medidaSupuesta = false; }
        stage.querySelectorAll('[data-as-size]').forEach(function (b) {
          b.classList.toggle('is-sel', b === t && v !== '?');
        });
        setTimeout(siguiente, reduce ? 0 : 260);
        return;
      }

      if (t.hasAttribute('data-as-toggle')) {
        var key = t.getAttribute('data-as-toggle');
        resp[key] = !resp[key];
        var box = t.parentNode;
        box.classList.toggle('is-sel', resp[key]);
        t.setAttribute('aria-pressed', resp[key]);
        box.querySelectorAll('[data-as-color]').forEach(function (b) {
          if (resp[key]) b.removeAttribute('tabindex'); else b.setAttribute('tabindex', '-1');
        });
        return;
      }

      if (t.hasAttribute('data-as-color')) {
        resp.color = t.getAttribute('data-as-color');
        resp.canapeOn = true;
        var caja = t.closest('.as-extra');
        if (caja) {
          caja.classList.add('is-sel');
          var head = caja.querySelector('[data-as-toggle]');
          if (head) head.setAttribute('aria-pressed', 'true');
        }
        stage.querySelectorAll('[data-as-color]').forEach(function (b) {
          var on = b === t;
          b.classList.toggle('is-sel', on);
          b.setAttribute('aria-pressed', on);
          b.removeAttribute('tabindex');
        });
        return;
      }

      if (t.hasAttribute('data-as-finish')) {
        pintarCalculando();
        setTimeout(pintarResultado, reduce ? 300 : 1650);
        return;
      }

      if (t.hasAttribute('data-as-add'))     { anadirColchon(); return; }
      if (t.hasAttribute('data-as-addpack')) { anadirPack(); return; }

      if (t.hasAttribute('data-as-restart')) {
        resp = {};
        try { history.replaceState(null, '', location.pathname); } catch (e2) {}
        pintarPregunta(0);
      }
    });

    root.addEventListener('change', function (e) {
      var sel = e.target;
      if (sel && sel.hasAttribute && sel.hasAttribute('data-as-sizesel') && sel.value) {
        resp.medida = sel.value;
        resp.medidaSupuesta = false;
        stage.querySelectorAll('[data-as-size]').forEach(function (b) { b.classList.remove('is-sel'); });
        setTimeout(siguiente, reduce ? 0 : 200);
      }
    });

    /* Si falta la copia mediana de una foto, se pide la original. Va
       aquí y no como onerror en la etiqueta porque la política de
       seguridad de la web bloquea el código en línea. */
    root.addEventListener('error', function (e) {
      var img = e.target;
      if (img && img.tagName === 'IMG' && img.getAttribute('data-as-fallback')) {
        var orig = img.getAttribute('data-as-fallback');
        img.removeAttribute('data-as-fallback');
        img.src = orig;
      }
    }, true);

    /* Arranque: si la dirección trae un resultado, se enseña directamente */
    if (leerDeUrl()) {
      paso = TOTAL + 1;
      pintarResultado();
    } else {
      stage.classList.add('is-in');
    }

    /* Si alguien ya está en /asesor y pega otro enlace compartido, solo
       cambia el #: sin esto la página no se enteraría */
    window.addEventListener('hashchange', function () {
      if (leerDeUrl()) {
        paso = TOTAL + 1;
        pintarResultado();
        root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }
    });

    /* Para las pruebas automáticas */
    window.__NuvoraAsesor = { recomendar: recomendar, puntuar: puntuar, REGLAS: REGLAS };
  });
})();
