/* =============================================
   AUREA DESCANSO — Shop JS
   Catálogo · Ficha de producto · Checkout
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ══════════════════════════════════════════════
     CATÁLOGO
     ══════════════════════════════════════════════ */
  var CATALOG = {
    'serenity': {
      type: 'colchon',
      typeLabel: 'Colchón viscoelástico',
      name: 'Aurea Serenity',
      desc: 'Firmeza media con viscoelástica de alta densidad y capa de gel refrescante. Adaptabilidad progresiva que abraza el cuerpo sin hundirlo, ideal para quienes duermen de lado o boca arriba.',
      rating: '4,8',
      reviews: 412,
      images: [
        'images/producto1.jpg',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80'
      ],
      sizes: [
        { label: '90 × 190 cm',  price: 499 },
        { label: '135 × 190 cm', price: 549 },
        { label: '150 × 190 cm', price: 599 },
        { label: '160 × 200 cm', price: 649 },
        { label: '180 × 200 cm', price: 699 }
      ],
      defaultSize: 2,
      details: [
        {
          title: 'Composición y tecnología',
          html: '<ul>' +
            '<li>Núcleo HR de alta resiliencia de 18 cm: soporte firme y duradero.</li>' +
            '<li>Capa de viscoelástica de 5 cm con partículas de gel refrescante.</li>' +
            '<li>Tejido Strech Premium con tratamiento antiácaros e hipoalergénico.</li>' +
            '<li>Altura total: 25 cm. Firmeza: media (6/10). Independencia de lechos alta.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 3–5 días laborables.</li>' +
            '<li>Llega comprimido al vacío y enrollado; se expande en 24 horas.</li>' +
            '<li>100 noches de prueba: si no te convence, lo recogemos gratis y te devolvemos el importe íntegro.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>10 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre hundimientos superiores a 2,5 cm e irregularidades del núcleo.</li>' +
            '<li>Sin letra pequeña: gestión directa con nosotros, sin intermediarios.</li>' +
          '</ul>'
        }
      ]
    },

    'celestial': {
      type: 'colchon',
      typeLabel: 'Colchón híbrido de muelles ensacados',
      name: 'Aurea Celestial',
      desc: 'Firmeza media-alta con muelles ensacados individualmente y doble capa de viscoelástica. Máxima transpirabilidad e independencia de lechos: el colchón para parejas exigentes.',
      rating: '4,9',
      reviews: 287,
      images: [
        'images/producto2.jpg',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
        'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80'
      ],
      sizes: [
        { label: '90 × 190 cm',  price: 699 },
        { label: '135 × 190 cm', price: 749 },
        { label: '150 × 190 cm', price: 799 },
        { label: '160 × 200 cm', price: 849 },
        { label: '180 × 200 cm', price: 899 }
      ],
      defaultSize: 3,
      details: [
        {
          title: 'Composición y tecnología',
          html: '<ul>' +
            '<li>Más de 600 muelles ensacados individualmente (medida 150×190).</li>' +
            '<li>Doble capa de viscoelástica de 3 + 2 cm para una acogida progresiva.</li>' +
            '<li>Refuerzo perimetral: aprovechamiento total de la superficie.</li>' +
            '<li>Altura total: 30 cm. Firmeza: media-alta (7,5/10). Transpirabilidad máxima.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 3–5 días laborables.</li>' +
            '<li>Entrega en domicilio con aviso previo por SMS.</li>' +
            '<li>100 noches de prueba con recogida y reembolso gratuitos.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>10 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre muelles, núcleo, hundimientos e irregularidades.</li>' +
            '<li>Atención directa de fábrica, respuesta en menos de 48 h.</li>' +
          '</ul>'
        }
      ]
    },

    'canape-atlas': {
      type: 'canape',
      typeLabel: 'Canapé abatible de madera',
      name: 'Canapé Atlas',
      desc: 'Canapé abatible con tapa de madera de roble y gran capacidad de almacenaje. Apertura asistida por pistones de gas de doble refuerzo y base transpirable para cuidar tu colchón.',
      rating: '4,7',
      reviews: 156,
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80'
      ],
      sizes: [
        { label: '90 × 190 cm',  price: 399 },
        { label: '135 × 190 cm', price: 459 },
        { label: '150 × 190 cm', price: 499 },
        { label: '160 × 200 cm', price: 549 }
      ],
      defaultSize: 2,
      details: [
        {
          title: 'Materiales y capacidad',
          html: '<ul>' +
            '<li>Estructura de acero lacado con tapa 3D transpirable de madera de roble.</li>' +
            '<li>Capacidad de almacenaje de hasta 1.000 litros (medida 150×190).</li>' +
            '<li>Pistones de gas reforzados: apertura suave con una sola mano.</li>' +
            '<li>Altura del cajón: 32 cm. Patas antideslizantes incluidas.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y montaje',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 5–7 días laborables.</li>' +
            '<li>Montaje sencillo en menos de 30 minutos; manual e herramientas incluidas.</li>' +
            '<li>Devolución gratuita durante los primeros 30 días.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía en estructura y mecanismo de apertura.</li>' +
            '<li>Repuestos disponibles de por vida.</li>' +
          '</ul>'
        }
      ]
    },

    'canape-eter': {
      type: 'canape',
      typeLabel: 'Canapé abatible tapizado',
      name: 'Canapé Éter',
      desc: 'Canapé abatible tapizado en tejido antimanchas con cabecero a juego opcional. Diseño minimalista de líneas suaves que eleva cualquier dormitorio, con almacenaje XXL.',
      rating: '4,8',
      reviews: 98,
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
        'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=1200&q=80'
      ],
      sizes: [
        { label: '135 × 190 cm', price: 519 },
        { label: '150 × 190 cm', price: 559 },
        { label: '160 × 200 cm', price: 609 },
        { label: '180 × 200 cm', price: 659 }
      ],
      defaultSize: 1,
      details: [
        {
          title: 'Materiales y capacidad',
          html: '<ul>' +
            '<li>Tapizado en tejido técnico antimanchas disponible en 4 colores.</li>' +
            '<li>Tapa 3D transpirable con apertura de gran ángulo (suelo visible).</li>' +
            '<li>Almacenaje XXL: 35 cm de profundidad útil.</li>' +
            '<li>Esquinas redondeadas de seguridad.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y montaje',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 5–7 días laborables.</li>' +
            '<li>Servicio opcional de montaje en domicilio.</li>' +
            '<li>Devolución gratuita durante los primeros 30 días.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía en estructura y mecanismo de apertura.</li>' +
            '<li>Tapizado garantizado contra defectos durante 2 años.</li>' +
          '</ul>'
        }
      ]
    }
  };

  function formatPrice(n) {
    return n.toLocaleString('es-ES') + ' €';
  }

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  /* ══════════════════════════════════════════════
     FICHA DE PRODUCTO  (producto.html?m=...)
     ══════════════════════════════════════════════ */
  (function () {
    var root = document.getElementById('pdpRoot');
    if (!root) return;

    var id = getParam('m');
    var product = CATALOG[id];

    /* Producto inexistente → volver al catálogo */
    if (!product) {
      window.location.replace('colchones.html');
      return;
    }

    var catalogPage  = product.type === 'canape' ? 'canapes.html' : 'colchones.html';
    var catalogLabel = product.type === 'canape' ? 'Canapés' : 'Colchones';
    var selectedSize = product.defaultSize || 0;

    document.title = product.name + ' | Aurea Descanso';

    /* — Migas — */
    document.getElementById('pdpCrumbCat').setAttribute('href', catalogPage);
    document.getElementById('pdpCrumbCat').textContent = catalogLabel;
    document.getElementById('pdpCrumbName').textContent = product.name;

    /* — Galería — */
    var mainImg = document.getElementById('pdpMainImg');
    mainImg.src = product.images[0];
    mainImg.alt = product.name;

    var thumbsEl = document.getElementById('pdpThumbs');
    product.images.forEach(function (src, i) {
      var b = document.createElement('button');
      b.className = 'pdp__thumb' + (i === 0 ? ' is-active' : '');
      b.setAttribute('aria-label', 'Imagen ' + (i + 1));
      b.innerHTML = '<img src="' + src + '" alt="" loading="lazy">';
      b.addEventListener('click', function () {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 180);
        thumbsEl.querySelectorAll('.pdp__thumb').forEach(function (t) { t.classList.remove('is-active'); });
        b.classList.add('is-active');
      });
      thumbsEl.appendChild(b);
    });

    /* — Info — */
    document.getElementById('pdpType').textContent = product.typeLabel;
    document.getElementById('pdpName').textContent = product.name;
    document.getElementById('pdpDesc').textContent = product.desc;
    document.getElementById('pdpRatingNote').textContent =
      product.rating + ' · ' + product.reviews + ' valoraciones verificadas';

    /* — Medidas + precio — */
    var priceEl = document.getElementById('pdpPrice');
    var sizesEl = document.getElementById('pdpSizes');

    function renderPrice() {
      priceEl.textContent = formatPrice(product.sizes[selectedSize].price);
    }

    product.sizes.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'size-pill' + (i === selectedSize ? ' is-active' : '');
      b.textContent = s.label;
      b.addEventListener('click', function () {
        selectedSize = i;
        sizesEl.querySelectorAll('.size-pill').forEach(function (p) { p.classList.remove('is-active'); });
        b.classList.add('is-active');
        renderPrice();
      });
      sizesEl.appendChild(b);
    });
    renderPrice();

    /* — Comprar → checkout — */
    document.getElementById('pdpBuy').addEventListener('click', function () {
      window.location.href =
        'checkout.html?m=' + encodeURIComponent(id) + '&size=' + selectedSize;
    });

    /* — Journey: tiempos según tipo de producto — */
    if (product.type === 'canape') {
      var j2 = document.getElementById('journeyStep2When');
      if (j2) j2.textContent = 'Días 5–7';
      var j3 = document.getElementById('journeyStep3');
      if (j3) {
        j3.querySelector('.journey__when').textContent = 'Primeros 30 días';
        j3.querySelector('.journey__what').textContent = 'Devolución gratuita';
        j3.querySelector('.journey__how').textContent  = 'Si no encaja en tu dormitorio, lo recogemos sin coste.';
      }
      var j4 = document.getElementById('journeyStep4');
      if (j4) {
        j4.querySelector('.journey__when').textContent = 'Hasta 2031';
        j4.querySelector('.journey__what').textContent = '5 años de garantía';
        j4.querySelector('.journey__how').textContent  = 'Estructura y mecanismo cubiertos. Repuestos de por vida.';
      }
      var t2 = document.getElementById('trustNights');
      if (t2) {
        t2.querySelector('strong').textContent = '30 días';
        t2.querySelector('span').textContent = 'devolución';
      }
      var t3 = document.getElementById('trustYears');
      if (t3) t3.querySelector('strong').textContent = '5 años';
    }

    /* — Acordeón de detalles — */
    var accEl = document.getElementById('pdpAccordion');
    product.details.forEach(function (d, i) {
      var item = document.createElement('div');
      item.className = 'accordion__item' + (i === 0 ? ' is-open' : '');
      item.innerHTML =
        '<button class="accordion__btn" type="button" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
          d.title +
          '<span class="accordion__icon" aria-hidden="true">' +
            '<svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 1v10M1 6h10"/></svg>' +
          '</span>' +
        '</button>' +
        '<div class="accordion__panel"><div class="accordion__content">' + d.html + '</div></div>';
      accEl.appendChild(item);
    });

    function setPanelHeight(item) {
      var panel = item.querySelector('.accordion__panel');
      panel.style.maxHeight = item.classList.contains('is-open')
        ? panel.scrollHeight + 'px'
        : '0px';
    }

    accEl.querySelectorAll('.accordion__item').forEach(function (item) {
      setPanelHeight(item);
      item.querySelector('.accordion__btn').addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        this.setAttribute('aria-expanded', open ? 'true' : 'false');
        setPanelHeight(item);
      });
    });
  })();

  /* ══════════════════════════════════════════════
     CHECKOUT  (checkout.html?m=...&size=...)
     ══════════════════════════════════════════════ */
  (function () {
    var form = document.getElementById('chkForm');
    if (!form) return;

    var id = getParam('m');
    var product = CATALOG[id];
    if (!product) {
      window.location.replace('colchones.html');
      return;
    }

    var sizeIdx = parseInt(getParam('size') || '0', 10);
    if (isNaN(sizeIdx) || sizeIdx < 0 || sizeIdx >= product.sizes.length) sizeIdx = 0;
    var size  = product.sizes[sizeIdx];
    var total = size.price;

    /* — Pintar resumen — */
    document.getElementById('chkImg').src = product.images[0];
    document.getElementById('chkImg').alt = product.name;
    document.getElementById('chkName').textContent = product.name;
    document.getElementById('chkMeta').textContent = size.label + ' · 1 unidad';
    document.getElementById('chkPrice').textContent    = formatPrice(size.price);
    document.getElementById('chkSubtotal').textContent = formatPrice(size.price);
    document.getElementById('chkTotal').textContent    = formatPrice(total);

    /* — Tabs de método de pago — */
    var tabs    = document.querySelectorAll('.pay-tab');
    var methods = document.querySelectorAll('.pay-method');
    var activeMethod = 'card';

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activeMethod = this.getAttribute('data-method');
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        this.classList.add('is-active');
        methods.forEach(function (m) {
          m.classList.toggle('is-active', m.getAttribute('data-method') === activeMethod);
        });
      });
    });

    /* — Formateo de campos de tarjeta — */
    var cardNum = document.getElementById('cardNumber');
    var cardExp = document.getElementById('cardExpiry');
    var cardCvc = document.getElementById('cardCvc');

    cardNum.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 19);
      this.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    cardExp.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 4);
      this.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v;
    });
    cardCvc.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 4);
    });

    /* — Validación — */
    function luhn(num) {
      var sum = 0, dbl = false;
      for (var i = num.length - 1; i >= 0; i--) {
        var d = parseInt(num.charAt(i), 10);
        if (dbl) { d *= 2; if (d > 9) d -= 9; }
        sum += d; dbl = !dbl;
      }
      return sum % 10 === 0;
    }

    function setError(input, on) {
      input.classList.toggle('is-invalid', on);
      var field = input.closest('.chk-field');
      if (field) field.classList.toggle('has-error', on);
      return !on;
    }

    function validate() {
      var ok = true;

      form.querySelectorAll('[data-required]').forEach(function (input) {
        /* Los campos de tarjeta solo cuentan si el método activo es tarjeta */
        if (input.hasAttribute('data-card') && activeMethod !== 'card') {
          setError(input, false);
          return;
        }
        ok = setError(input, input.value.trim() === '') && ok;
      });

      var email = document.getElementById('chkEmail');
      if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        ok = setError(email, true) && ok;
      }

      if (activeMethod === 'card') {
        var digits = cardNum.value.replace(/\s/g, '');
        if (digits.length < 13 || !luhn(digits)) ok = setError(cardNum, true) && ok;

        var exp = cardExp.value.split('/');
        var mm = parseInt(exp[0], 10), yy = parseInt(exp[1], 10);
        var expOk = exp.length === 2 && mm >= 1 && mm <= 12 && !isNaN(yy);
        if (expOk) {
          var now = new Date();
          var curYY = now.getFullYear() % 100;
          var curMM = now.getMonth() + 1;
          expOk = yy > curYY || (yy === curYY && mm >= curMM);
        }
        if (!expOk) ok = setError(cardExp, true) && ok;

        if (cardCvc.value.length < 3) ok = setError(cardCvc, true) && ok;
      }

      return ok;
    }

    /* Limpiar error al teclear */
    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('input', function () { setError(input, false); });
    });

    /* — Envío del pedido —
       NOTA: procesamiento SIMULADO. Para cobrar pagos reales,
       sustituir simulatePayment() por la integración con la
       pasarela (Stripe Checkout, Redsys, etc.). Nunca procesar
       tarjetas reales con este formulario sin pasarela PCI. */
    function simulatePayment() {
      return new Promise(function (resolve) { setTimeout(resolve, 1800); });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstErr = form.querySelector('.is-invalid');
        if (firstErr) firstErr.focus();
        return;
      }

      var btn = document.getElementById('chkSubmit');
      btn.disabled = true;
      btn.classList.add('is-loading');

      simulatePayment().then(function () {
        var ref = 'AUR-' + new Date().getFullYear() + '-' +
          Math.floor(10000 + Math.random() * 89999);
        document.getElementById('chkRef').textContent = 'Pedido ' + ref;

        document.getElementById('chkMain').style.display = 'none';
        var success = document.getElementById('chkSuccess');
        success.classList.add('is-visible');
        var steps = document.querySelectorAll('.checkout__step');
        if (steps.length) steps[steps.length - 1].classList.add('is-active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  })();

});
