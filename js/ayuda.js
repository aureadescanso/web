/* =============================================
   NUVORA DESCANSO — Ayuda flotante
   =============================================
   Un asistente de opciones fijas, sin IA y sin servidor: el visitante
   elige entre unas pocas preguntas y recibe la respuesta escrita aquí,
   con el enlace a la página que la desarrolla. No guarda nada.

   Las respuestas repiten lo que dicen las páginas a las que enlazan
   (condiciones de venta, packs, asesor). Si allí cambia algo, cambiarlo
   aquí también.
   ============================================= */
(function () {
  'use strict';

  var INICIO = ['¡Hola! Soy el asesor de Nuvora.', '¿En qué te ayudo?'];

  var TEMAS = {
    elegir: {
      boton: 'Elegir colchón', oro: true,
      yo: 'Quiero elegir colchón',
      texto: ['Ocho preguntas sobre cómo duermes y te digo cuál de nuestros tres colchones encaja contigo, en la medida de tu cama. Es un minuto y no hay que registrarse.'],
      enlaces: [['Hacer el test', '/asesor'], ['Ver los colchones', '/colchones']]
    },
    pack: {
      boton: 'Packs y ofertas',
      yo: '¿Qué ofertas hay?',
      texto: ['Si te llevas colchón, canapé y almohada en el mismo pedido, el 12 % de descuento se aplica solo.', 'Y en tu primera compra, el código NUVORA10 te da un 10 %. No se acumulan: se aplica el mayor.'],
      enlaces: [['Montar mi pack', '/packs']]
    },
    envio: {
      boton: 'Envío y devoluciones',
      yo: '¿Cómo van el envío y las devoluciones?',
      texto: ['El envío es gratis a España peninsular: los colchones llegan en 3–5 días laborables y los canapés en 5–7.', 'Tienes 30 noches para probar el colchón. Si no te convence, te devolvemos el importe íntegro. Tienes las condiciones completas en el enlace.'],
      enlaces: [['Ver las condiciones', '/condiciones-venta']]
    },
    pedido: {
      boton: 'Mi pedido',
      yo: '¿Cómo va mi pedido?',
      texto: ['Escríbenos con tu número de pedido (empieza por NUV- y está en el correo de confirmación) y te decimos cómo va.'],
      enlaces: [['Preguntar por mi pedido', 'mailto:nuvoradescanso@gmail.com?subject=Estado%20de%20mi%20pedido']]
    },
    contacto: {
      boton: 'Hablar con nosotros',
      yo: 'Prefiero hablar con una persona',
      texto: ['Escríbenos a nuvoradescanso@gmail.com y te contestamos desde la fábrica.'],
      enlaces: [['Escribir un correo', 'mailto:nuvoradescanso@gmail.com']]
    }
  };
  var ORDEN = ['elegir', 'pack', 'envio', 'pedido', 'contacto'];

  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }
  var LUNA = '<svg class="ayuda__luna" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var EQUIS = '<svg class="ayuda__x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  document.addEventListener('DOMContentLoaded', function () {
    var caja = el('div', 'ayuda');
    var boton = el('button', 'ayuda__btn');
    boton.type = 'button';
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', 'ayudaPanel');
    boton.setAttribute('aria-label', 'Abrir la ayuda');
    boton.innerHTML = LUNA + EQUIS;

    var panel = el('div', 'ayuda__panel');
    panel.id = 'ayudaPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ayuda de Nuvora Descanso');
    var cab = el('div', 'ayuda__cab');
    cab.innerHTML = '<span class="ayuda__avatar">' + LUNA + '</span>';
    var quien = el('span');
    quien.appendChild(el('strong', null, 'Asesor Nuvora'));
    quien.appendChild(el('small', null, 'Respuestas rápidas · sin esperas'));
    cab.appendChild(quien);
    var charla = el('div', 'ayuda__charla');
    charla.setAttribute('aria-live', 'polite');
    var ops = el('div', 'ayuda__ops');
    panel.appendChild(cab); panel.appendChild(charla); panel.appendChild(ops);
    caja.appendChild(panel); caja.appendChild(boton);
    document.body.appendChild(caja);

    function decir(texto, mio) {
      var m = el('p', 'ayuda__msg' + (mio ? ' ayuda__msg--yo' : ''), texto);
      charla.appendChild(m);
      charla.scrollTop = charla.scrollHeight;
      return m;
    }
    function opciones(sin) {
      ops.innerHTML = '';
      ORDEN.forEach(function (k) {
        if (k === sin) return;
        var b = el('button', 'ayuda__op' + (TEMAS[k].oro ? ' ayuda__op--oro' : ''), TEMAS[k].boton);
        b.type = 'button';
        b.addEventListener('click', function () { responder(k); });
        ops.appendChild(b);
      });
    }
    function responder(k) {
      var t = TEMAS[k];
      decir(t.yo, true);
      t.texto.forEach(function (x) { decir(x); });
      var m = el('p', 'ayuda__msg');
      t.enlaces.forEach(function (e, i) {
        if (i) m.appendChild(document.createTextNode(' · '));
        var a = el('a', null, e[0] + ' →');
        a.href = e[1];
        m.appendChild(a);
      });
      charla.appendChild(m);
      charla.scrollTop = charla.scrollHeight;
      opciones(k);
    }

    var saludado = false;
    function abrir(si) {
      caja.classList.toggle('is-abierta', si);
      boton.setAttribute('aria-expanded', si ? 'true' : 'false');
      boton.setAttribute('aria-label', si ? 'Cerrar la ayuda' : 'Abrir la ayuda');
      if (si && !saludado) {
        saludado = true;
        INICIO.forEach(function (x) { decir(x); });
        opciones();
      }
    }
    boton.addEventListener('click', function () { abrir(!caja.classList.contains('is-abierta')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && caja.classList.contains('is-abierta')) { abrir(false); boton.focus(); }
    });
    /* Cerrar al pulsar fuera. No vale mirar si el clic cae dentro de la
       caja: al elegir una opción los botones se vuelven a pintar y el que
       se pulsó ya no está en la página cuando el clic llega aquí. */
    var dentro = false;
    caja.addEventListener('click', function () { dentro = true; });
    document.addEventListener('click', function () {
      if (dentro) { dentro = false; return; }
      if (caja.classList.contains('is-abierta')) abrir(false);
    });
  });
})();
