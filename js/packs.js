/* =============================================
   NUVORA DESCANSO — Configurador de packs
   =============================================
   Monta un pack con tres productos que ya existen en el
   catálogo (js/shop.js): colchón + canapé + almohada.

   El descuento del pack NO se calcula aquí para cobrar:
   esta página solo lo enseña. Al tramitar el pedido, el
   checkout y el servidor vuelven a comprobar que el pedido
   lleva los tres tipos y aplican el −12 % sobre precios
   propios. Aquí nunca se envía un importe.
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var root = document.getElementById('packCfg');
  if (!root) return;

  var CATALOG = window.NuvoraCatalog;
  var PACK = window.NuvoraPack;
  if (!CATALOG || !PACK) return;

  /* Todos los colchones comprables, en orden de precio. Comparten las
     mismas 24 medidas, así que al cambiar de modelo se conserva la
     medida elegida. Si mañana entra otro colchón, basta añadirlo aquí.
     La etiqueta es corta a propósito: en el panel no cabe el nombre
     completo de cada modelo. */
  var CORES = [
    { id: 'aurea',         label: 'Aurea viscoelástico' },
    { id: 'aurea-muelles', label: 'Aurea muelles' },
    { id: 'supreme',       label: 'Supreme doble cara' }
  ];
  var PILLOW  = 'almohada-nuvora';
  var COLORS  = ['canape-nuvora-blanco', 'canape-nuvora-cambrian', 'canape-nuvora-wengue'];

  /* Si faltara cualquiera de las piezas, no montamos nada */
  var missing = [PILLOW]
    .concat(CORES.map(function (c) { return c.id; }))
    .concat(COLORS)
    .filter(function (id) { return !CATALOG[id]; });
  if (missing.length) return;

  var RATE = PACK.rate;

  var state = {
    core: 0,
    mattress: CATALOG[CORES[0].id].defaultSize || 0,
    color: 0,
    base: CATALOG[COLORS[0]].defaultSize || 0,
    pillow: CATALOG[PILLOW].defaultSize || 0
  };

  function mattressProduct() { return CATALOG[CORES[state.core].id]; }

  function fmt(n) {
    return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }
  /* Escapa antes de insertar como HTML */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* "150 × 190 cm" → "150 × 190": para comparar colchón y canapé */
  function dims(label) {
    var m = /(\d+)\s*×\s*(\d+)/.exec(label);
    return m ? m[1] + '×' + m[2] : null;
  }
  function baseProduct() { return CATALOG[COLORS[state.color]]; }

  /* ── Selectores de medida ── */
  var selMattress = document.getElementById('packMattressSize');
  var selBase     = document.getElementById('packBaseSize');

  function fillSelect(el, product, selected) {
    el.innerHTML = '';
    product.sizes.forEach(function (s, i) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = s.label + ' · ' + fmt(s.price);
      if (i === selected) opt.selected = true;
      el.appendChild(opt);
    });
  }

  fillSelect(selMattress, mattressProduct(), state.mattress);
  fillSelect(selBase, baseProduct(), state.base);

  /* ── Modelo de colchón ── */
  var coresBox = document.getElementById('packCores');
  if (coresBox) {
    CORES.forEach(function (c, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'swatch swatch--text' + (i === state.core ? ' is-active' : '');
      btn.setAttribute('aria-pressed', i === state.core ? 'true' : 'false');
      btn.setAttribute('aria-label', 'Colchón ' + CATALOG[c.id].name);
      btn.innerHTML = '<span class="swatch__label">' + esc(c.label) + '</span>';
      btn.addEventListener('click', function () {
        state.core = i;
        coresBox.querySelectorAll('.swatch').forEach(function (s) {
          s.classList.remove('is-active');
          s.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        /* Los tres modelos comparten medidas: el índice se conserva */
        fillSelect(selMattress, mattressProduct(), state.mattress);
        render();
      });
      coresBox.appendChild(btn);
    });
  }

  /* Al cambiar el colchón, buscamos el canapé de la misma medida */
  selMattress.addEventListener('change', function () {
    state.mattress = parseInt(selMattress.value, 10) || 0;
    var target = dims(mattressProduct().sizes[state.mattress].label);
    var sizes = baseProduct().sizes;
    for (var i = 0; i < sizes.length; i++) {
      if (dims(sizes[i].label) === target) {
        state.base = i;
        selBase.value = String(i);
        break;
      }
    }
    render();
  });

  selBase.addEventListener('change', function () {
    state.base = parseInt(selBase.value, 10) || 0;
    render();
  });

  /* ── Acabado del canapé ── */
  var colorsBox = document.getElementById('packColors');
  COLORS.forEach(function (id, i) {
    var p = CATALOG[id];
    var variant = (p.variants || []).filter(function (v) { return v.id === id; })[0];
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch' + (i === state.color ? ' is-active' : '');
    btn.setAttribute('aria-label', 'Acabado ' + (p.color || ''));
    btn.setAttribute('aria-pressed', i === state.color ? 'true' : 'false');
    btn.innerHTML = '<span class="swatch__dot" style="background:' +
      ((variant && variant.swatch) || '#ccc') + '"></span>' +
      '<span class="swatch__label">' + (p.color || '') + '</span>';
    btn.addEventListener('click', function () {
      state.color = i;
      /* Todos los acabados comparten medidas, así que el índice se conserva */
      colorsBox.querySelectorAll('.swatch').forEach(function (s) {
        s.classList.remove('is-active');
        s.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      fillSelect(selBase, baseProduct(), state.base);
      render();
    });
    colorsBox.appendChild(btn);
  });

  /* ── Medida de la almohada ── */
  var pillowBox = document.getElementById('packPillowSizes');
  CATALOG[PILLOW].sizes.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'size-pill' + (i === state.pillow ? ' is-active' : '');
    b.textContent = s.label;
    b.setAttribute('aria-pressed', i === state.pillow ? 'true' : 'false');
    b.addEventListener('click', function () {
      state.pillow = i;
      pillowBox.querySelectorAll('.size-pill').forEach(function (p) {
        p.classList.remove('is-active');
        p.setAttribute('aria-pressed', 'false');
      });
      b.classList.add('is-active');
      b.setAttribute('aria-pressed', 'true');
      render();
    });
    pillowBox.appendChild(b);
  });

  /* ── Pintado ── */
  var itemColchon  = document.getElementById('packItemColchon');
  var itemCanape   = document.getElementById('packItemCanape');
  var itemAlmohada = document.getElementById('packItemAlmohada');
  var elWas   = document.getElementById('packWas');
  var elNow   = document.getElementById('packNow');
  var elSave  = document.getElementById('packSave');
  var elWarn  = document.getElementById('packSizeWarn');
  var elColor = document.getElementById('packColorName');

  function paintItem(el, product, sizeIdx) {
    var size = product.sizes[sizeIdx];
    el.querySelector('[data-sel]').textContent = 'Medida: ' + size.label;
    el.querySelector('[data-price]').textContent = fmt(size.price);
  }

  function render() {
    var base = baseProduct();
    var colchon = mattressProduct();

    paintItem(itemColchon, colchon, state.mattress);
    paintItem(itemCanape, base, state.base);
    paintItem(itemAlmohada, CATALOG[PILLOW], state.pillow);

    /* El colchón cambia de nombre y de enlace según el núcleo */
    var hrefColchon = window.NuvoraRuta(CORES[state.core].id);
    itemColchon.querySelectorAll('[data-link]').forEach(function (a) { a.setAttribute('href', hrefColchon); });
    var nombreColchon = itemColchon.querySelector('[data-name]');
    if (nombreColchon) nombreColchon.textContent = colchon.name;

    /* El canapé cambia de nombre, foto y enlace según el acabado */
    var href = window.NuvoraRuta(COLORS[state.color]);
    itemCanape.querySelectorAll('[data-link]').forEach(function (a) { a.setAttribute('href', href); });
    itemCanape.querySelector('[data-name]').textContent = base.name;
    var img = itemCanape.querySelector('[data-img]');
    img.setAttribute('src', base.images[0]);
    img.setAttribute('alt', base.name);
    elColor.textContent = base.color || '';

    /* Aviso si el colchón y el canapé no miden lo mismo */
    var dm = dims(colchon.sizes[state.mattress].label);
    var db = dims(base.sizes[state.base].label);
    elWarn.hidden = !(dm && db && dm !== db);

    var suelto = colchon.sizes[state.mattress].price +
                 base.sizes[state.base].price +
                 CATALOG[PILLOW].sizes[state.pillow].price;
    var pack = suelto * (1 - RATE);

    elWas.textContent = fmt(suelto);
    elNow.textContent = fmt(pack);
    elSave.textContent = 'Ahorras ' + fmt(suelto - pack) + ' (−' + Math.round(RATE * 100) + ' %)';
  }

  /* ── Añadir el pack completo a la cesta ── */
  var addBtn = document.getElementById('packAdd');
  addBtn.addEventListener('click', function () {
    if (!window.NuvoraCart || !window.NuvoraCart.addMany) return;
    var base = baseProduct();
    window.NuvoraCart.addMany([
      line(CORES[state.core].id, mattressProduct(), state.mattress),
      line(COLORS[state.color], base, state.base),
      line(PILLOW, CATALOG[PILLOW], state.pillow)
    ]);
  });

  function line(id, product, sizeIdx) {
    return {
      id: id,
      name: product.name,
      type: product.type,
      sizeIdx: sizeIdx,
      sizeLabel: product.sizes[sizeIdx].label,
      price: product.sizes[sizeIdx].price,
      img: product.images[0]
    };
  }

  render();
});
