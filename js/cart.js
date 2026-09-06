/* =============================================
   NUVORA DESCANSO — Cesta de la compra
   localStorage + panel lateral, sin dependencias
   ============================================= */
(function () {
  'use strict';
  var KEY = 'nuvora_cart_v1';

  /* Tope de unidades por línea. Tiene que ser el mismo que el del
     servidor (netlify/functions/_catalogo.js), porque allí se acota sin
     avisar: si aquí se dejaran poner quince, la cesta enseñaría quince
     y la pasarela cobraría diez. */
  var MAX_QTY = 10;

  /* Descuento del pack. Vive aquí y no en shop.js porque hay páginas
     —la portada, el blog, las legales— que cargan la cesta sin cargar
     shop.js, y la cesta tiene que saber sumar en todas. shop.js lo lee
     de aquí. El servidor guarda el suyo aparte, porque no puede fiarse
     de lo que diga el navegador. */
  var PACK_RATE = 0.12;
  window.NuvoraPackRate = PACK_RATE;
  /* Traducción con texto de respaldo en español */
  function T(key, fb) {
    return (window.NuvoraI18n && window.NuvoraI18n.t(key)) || fb;
  }

  function load() {
    var guardadas;
    try { guardadas = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
    /* Una cesta guardada antes de poner el tope puede traer más
       unidades de las que acepta el servidor. Se recortan al leerla,
       o volvería a enseñarse un total que no se va a cobrar. */
    guardadas.forEach(function (it) {
      if (it && it.qty > MAX_QTY) it.qty = MAX_QTY;
    });
    return guardadas;
  }
  function persist(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }
  /* Siempre con dos decimales: sin forzarlos, 335 salía como "335 €" y
     54,90 como "54,9 €", que en una tienda queda a medio escribir. */
  function fmt(n) {
    return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }

  /* Lo que se va a cobrar. Se calcula igual que en el checkout y que en
     el servidor: el descuento se aplica a cada línea y se redondea
     ahí, no sobre la suma, o no cuadran los céntimos. */
  function totalACobrar() {
    var rate = Cart.isPack() ? PACK_RATE : 0;
    var t = Cart.items.reduce(function (a, it) {
      return a + (Math.round(it.price * (1 - rate) * 100) / 100) * it.qty;
    }, 0);
    return Math.round(t * 100) / 100;
  }
  /* Escapa texto antes de insertarlo como HTML (defensa frente a datos manipulados en localStorage) */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Avisa al píxel de TikTok, si el visitante ha aceptado las cookies */
  function medir(evento, lineas) {
    if (!window.NuvoraTrack) return;
    var total = lineas.reduce(function (a, l) { return a + l.price * (l.qty || 1); }, 0);
    window.NuvoraTrack(evento, {
      contents: lineas.map(function (l) {
        return {
          content_id: l.id,
          content_type: 'product',
          content_name: l.name,
          price: l.price,
          quantity: l.qty || 1
        };
      }),
      value: Math.round(total * 100) / 100,
      currency: 'EUR'
    });
  }

  var Cart = {
    items: load(),
    /* línea: { id, name, sizeLabel, sizeIdx, price, img, type } */
    add: function (line) {
      var found = null;
      this.items.forEach(function (it) {
        if (it.id === line.id && it.sizeIdx === line.sizeIdx) found = it;
      });
      if (found) found.qty = Math.min(found.qty + 1, MAX_QTY);
      else { line.qty = 1; this.items.push(line); }
      persist(this.items);
      refresh();
      medir('AddToCart', [line]);
      open();
    },
    setQty: function (i, q) {
      if (q <= 0) this.items.splice(i, 1);
      else this.items[i].qty = Math.min(q, MAX_QTY);
      persist(this.items);
      refresh();
    },
    count: function () {
      return this.items.reduce(function (a, it) { return a + it.qty; }, 0);
    },
    total: function () {
      return this.items.reduce(function (a, it) { return a + it.price * it.qty; }, 0);
    },
    /* ¿La cesta forma un pack de descanso? (colchón + canapé + almohada)
       El descuento real lo aplican el checkout y el servidor. */
    isPack: function () {
      var t = {};
      this.items.forEach(function (it) { t[it.type] = true; });
      return !!(t.colchon && t.canape && t.almohada);
    },
    /* Añade varias líneas de una vez sin abrir y cerrar el panel en cada una */
    addMany: function (lines) {
      var self = this;
      lines.forEach(function (line) {
        var found = null;
        self.items.forEach(function (it) {
          if (it.id === line.id && it.sizeIdx === line.sizeIdx) found = it;
        });
        if (found) found.qty = Math.min(found.qty + 1, MAX_QTY);
        else { line.qty = 1; self.items.push(line); }
      });
      persist(this.items);
      refresh();
      medir('AddToCart', lines);
      open();
    },
    clear: function () {
      this.items = [];
      persist(this.items);
      refresh();
    }
  };
  window.NuvoraCart = Cart;

  /* ── Panel lateral ── */
  var drawer = null, overlay = null;

  function build() {
    if (drawer) return;
    overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.addEventListener('click', close);
    drawer = document.createElement('aside');
    drawer.className = 'cart';
    drawer.setAttribute('aria-label', 'Cesta de la compra');
    drawer.innerHTML =
      '<div class="cart__head">' +
        '<span class="cart__title">' + T('cart.title', 'Tu cesta') + '</span>' +
        '<button class="cart__close" type="button" aria-label="Cerrar cesta">&#10005;</button>' +
      '</div>' +
      '<div class="cart__body"></div>' +
      '<div class="cart__foot"></div>';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    drawer.querySelector('.cart__close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function open() { build(); render(); document.body.classList.add('cart-open'); }
  function close() { document.body.classList.remove('cart-open'); }

  function render() {
    build();
    var body = drawer.querySelector('.cart__body');
    var foot = drawer.querySelector('.cart__foot');

    if (!Cart.items.length) {
      body.innerHTML = '<p class="cart__empty">' + T('cart.empty', 'Tu cesta está vacía.') +
        '<br>' + T('cart.emptysub', 'El buen descanso te espera.') + '</p>';
      foot.innerHTML = '<a class="cart__shop" href="/colchones">' +
        T('cart.shop', 'Ver colchones') + ' &rarr;</a>';
      return;
    }

    var html = '';
    Cart.items.forEach(function (it, i) {
      html +=
        '<div class="cart__item">' +
          '<img class="cart__img" src="' + esc(it.img) + '" alt="">' +
          '<div class="cart__info">' +
            '<span class="cart__name">' + esc(it.name) + '</span>' +
            '<span class="cart__meta">' + esc(it.sizeLabel) + '</span>' +
            '<div class="cart__qty">' +
              '<button type="button" data-act="minus" data-i="' + i + '" aria-label="Restar unidad">&minus;</button>' +
              '<span>' + it.qty + '</span>' +
              '<button type="button" data-act="plus" data-i="' + i + '" aria-label="Sumar unidad"' +
                (it.qty >= MAX_QTY ? ' disabled title="Máximo ' + MAX_QTY + ' unidades por pedido"' : '') +
              '>+</button>' +
              '<button type="button" class="cart__del" data-act="del" data-i="' + i + '">' + T('cart.remove', 'Eliminar') + '</button>' +
            '</div>' +
          '</div>' +
          '<span class="cart__price">' + fmt(it.price * it.qty) + '</span>' +
        '</div>';
    });
    if (Cart.isPack()) {
      html +=
        '<div class="cart__item cart__item--gift">' +
          '<div class="cart__info">' +
            '<span class="cart__name">' + T('cart.pack', 'Pack de descanso completo') + '</span>' +
            '<span class="cart__meta">' + T('cart.packsub', 'Colchón + canapé + almohada: −12 % al tramitar el pedido') + '</span>' +
          '</div>' +
          '<span class="cart__price cart__price--gift">&minus;12 %</span>' +
        '</div>';
    }
    body.innerHTML = html;

    /* El total es el que se va a pagar. Antes salía la suma sin
       descuento justo debajo del aviso de "−12 %", que se contradecían
       a la vista. */
    var aCobrar = totalACobrar();
    var ahorro = Math.round((Cart.total() - aCobrar) * 100) / 100;

    foot.innerHTML =
      (ahorro > 0
        ? '<div class="cart__total cart__total--was"><span>' + T('cart.subtotal', 'Subtotal') + '</span>' +
          '<span>' + fmt(Cart.total()) + '</span></div>'
        : '') +
      '<div class="cart__total"><span>' + T('cart.total', 'Total (envío incluido)') + '</span><strong>' + fmt(aCobrar) + '</strong></div>' +
      '<a class="cart__checkout" href="/checkout.html">' + T('cart.checkout', 'Tramitar pedido') + '</a>' +
      '<button class="cart__continue" type="button">' + T('cart.continue', 'Seguir comprando') + '</button>';
    foot.querySelector('.cart__continue').addEventListener('click', close);

    body.querySelectorAll('button[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = parseInt(b.getAttribute('data-i'), 10);
        var act = b.getAttribute('data-act');
        if (act === 'plus')  Cart.setQty(i, Cart.items[i].qty + 1);
        if (act === 'minus') Cart.setQty(i, Cart.items[i].qty - 1);
        if (act === 'del')   Cart.setQty(i, 0);
        render();
      });
    });
  }

  function refresh() {
    var badge = document.getElementById('cartBadge');
    if (badge) {
      var n = Cart.count();
      badge.textContent = n;
      badge.hidden = n === 0;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('cartBtn');
    if (btn) btn.addEventListener('click', open);
    refresh();
  });

  window.NuvoraCartOpen = open;
})();
