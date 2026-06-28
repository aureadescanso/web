/* =============================================
   AUREA DESCANSO — Cesta de la compra
   localStorage + panel lateral, sin dependencias
   ============================================= */
(function () {
  'use strict';
  var KEY = 'aurea_cart_v1';
  /* Prefijo para que los enlaces e imágenes funcionen también desde /blog/ */
  var BASE = /\/blog\//.test(window.location.pathname) ? '../' : '';
  function rel(src) {
    return (BASE && src.indexOf('http') !== 0 && src.indexOf('../') !== 0) ? BASE + src : src;
  }
  /* Traducción con texto de respaldo en español */
  function T(key, fb) {
    return (window.AureaI18n && window.AureaI18n.t(key)) || fb;
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function persist(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {}
  }
  function fmt(n) { return n.toLocaleString('es-ES') + ' €'; }
  /* Escapa texto antes de insertarlo como HTML (defensa frente a datos manipulados en localStorage) */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
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
      if (found) found.qty += 1;
      else { line.qty = 1; this.items.push(line); }
      persist(this.items);
      refresh();
      open();
    },
    setQty: function (i, q) {
      if (q <= 0) this.items.splice(i, 1);
      else this.items[i].qty = q;
      persist(this.items);
      refresh();
    },
    count: function () {
      return this.items.reduce(function (a, it) { return a + it.qty; }, 0);
    },
    total: function () {
      return this.items.reduce(function (a, it) { return a + it.price * it.qty; }, 0);
    },
    hasColchon: function () {
      return this.items.some(function (it) { return it.type === 'colchon'; });
    },
    clear: function () {
      this.items = [];
      persist(this.items);
      refresh();
    }
  };
  window.AureaCart = Cart;

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
      foot.innerHTML = '<a class="cart__shop" href="' + BASE + 'colchones.html">' +
        T('cart.shop', 'Ver colchones') + ' &rarr;</a>';
      return;
    }

    var html = '';
    Cart.items.forEach(function (it, i) {
      html +=
        '<div class="cart__item">' +
          '<img class="cart__img" src="' + esc(rel(it.img)) + '" alt="">' +
          '<div class="cart__info">' +
            '<span class="cart__name">' + esc(it.name) + '</span>' +
            '<span class="cart__meta">' + esc(it.sizeLabel) + '</span>' +
            '<div class="cart__qty">' +
              '<button type="button" data-act="minus" data-i="' + i + '" aria-label="Restar unidad">&minus;</button>' +
              '<span>' + it.qty + '</span>' +
              '<button type="button" data-act="plus" data-i="' + i + '" aria-label="Sumar unidad">+</button>' +
              '<button type="button" class="cart__del" data-act="del" data-i="' + i + '">' + T('cart.remove', 'Eliminar') + '</button>' +
            '</div>' +
          '</div>' +
          '<span class="cart__price">' + fmt(it.price * it.qty) + '</span>' +
        '</div>';
    });
    if (Cart.hasColchon()) {
      html +=
        '<div class="cart__item cart__item--gift">' +
          '<img class="cart__img" src="' + rel('images/mouth-tape.jpg') + '" alt="Mouth Tape Aurea">' +
          '<div class="cart__info">' +
            '<span class="cart__name">Mouth Tape Aurea · 30 tiras</span>' +
            '<span class="cart__meta">' + T('cart.gift', 'Regalo por tu colchón · Valorado en 10 €') + '</span>' +
          '</div>' +
          '<span class="cart__price cart__price--gift">GRATIS</span>' +
        '</div>';
    }
    body.innerHTML = html;

    foot.innerHTML =
      '<div class="cart__total"><span>' + T('cart.total', 'Total (envío incluido)') + '</span><strong>' + fmt(Cart.total()) + '</strong></div>' +
      '<a class="cart__checkout" href="' + BASE + 'checkout.html">' + T('cart.checkout', 'Tramitar pedido') + '</a>' +
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

  window.AureaCartOpen = open;
})();
