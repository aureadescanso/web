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
      typeLabel: 'Colchón viscoelástico · doble cara',
      name: 'Aurea Serenity',
      desc: 'Doble cara invierno-verano con núcleo HR de 28 kg/m³ de densidad. La cara de invierno acoge con 2 cm de viscoelástica y acolchado tapa a tapa; la de verano, con tejido 3D transpirable, mantiene el frescor las noches de calor.',
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
      cutaway: {
        sub: 'Ocho capas reales y dos caras según la estación: gira el colchón y tendrás un colchón mullido para el invierno y otro fresco para el verano.',
        chips: ['Altura total: 30 cm aprox.', 'Acolchado tapa a tapa', 'Platabanda en tejido stretch', '4 asas verticales'],
        layers: [
          { group: 'Cara de invierno', name: 'Tejido stretch',      spec: '300 g/m², suave y elástico',            t: 12, color: '#F2E7CE', tex: 'quilt' },
          { group: 'Cara de invierno', name: 'Viscoelástica',       spec: '2 cm que se adaptan a tu cuerpo',       t: 20, color: '#E2C181', tex: 'visco' },
          { group: 'Cara de invierno', name: 'Fibra hueca',         spec: 'Acolchado mullido y aislante',          t: 13, color: '#FDFCF8', tex: 'fiber' },
          { group: 'Cara de invierno', name: 'Espuma HR',           spec: '1,3 cm de transición progresiva',       t: 15, color: '#CBD9F1', tex: 'hr' },
          { group: 'Núcleo',           name: 'Núcleo HR 28 kg/m³',  spec: '25 cm de soporte de alta densidad',     t: 95, color: '#8CA7DA', tex: 'core' },
          { group: 'Cara de verano',   name: 'Espuma HR',           spec: '0,5 cm de acogida ligera',              t: 11, color: '#CBD9F1', tex: 'hr' },
          { group: 'Cara de verano',   name: 'Fibra transpirable',  spec: 'Regula la humedad durante la noche',    t: 13, color: '#FDFCF8', tex: 'fiber' },
          { group: 'Cara de verano',   name: 'Tejido 3D',           spec: 'Máxima ventilación en noches cálidas',  t: 12, color: '#A9B6CA', tex: 'mesh' }
        ]
      },
      details: [
        {
          title: 'Composición y tecnología',
          html: '<ul>' +
            '<li>Núcleo de espuma HR de 28 kg/m³ de densidad y 25 cm de grosor: soporte consistente y duradero.</li>' +
            '<li><strong>Cara de invierno:</strong> tejido stretch de 300 g/m², 2 cm de viscoelástica, fibra y 1,3 cm de espuma HR, con acolchado tapa a tapa.</li>' +
            '<li><strong>Cara de verano:</strong> tejido 3D transpirable, fibra y 0,5 cm de espuma HR para dormir fresco en las noches de calor.</li>' +
            '<li>Platabanda en tejido stretch con 4 asas verticales para girar y voltear el colchón con facilidad.</li>' +
            '<li>Altura total del colchón terminado: 30 cm aprox. Firmeza: media.</li>' +
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
    },

    'mouth-tape': {
      type: 'accesorio',
      typeLabel: 'Accesorio de descanso',
      name: 'Mouth Tape Aurea',
      desc: '30 tiras adhesivas de tejido transpirable que mantienen la boca cerrada mientras duermes y fomentan la respiración nasal: menos ronquidos, menos boca seca y un despertar con más energía. Sin medicamentos ni ingredientes activos.',
      rating: '4,7',
      reviews: 86,
      images: ['images/mouth-tape.jpg'],
      sizes: [
        { label: 'Caja · 30 tiras', price: 10 }
      ],
      defaultSize: 0,
      details: [
        {
          title: 'Qué es y cómo funciona',
          html: '<ul>' +
            '<li>Tiras adhesivas que mantienen la boca cerrada durante la noche y fomentan la respiración nasal, la forma natural de respirar al dormir.</li>' +
            '<li>Tejido transpirable, cómodo y suave con la piel.</li>' +
            '<li>Adhesivo seguro, apto para el uso nocturno y fácil de retirar.</li>' +
            '<li>Sin medicamentos ni ingredientes activos. Uso externo.</li>' +
          '</ul>'
        },
        {
          title: 'Modo de empleo',
          html: '<ul>' +
            '<li>1. Asegúrate de que la piel esté limpia y seca.</li>' +
            '<li>2. Retira el protector de la tira.</li>' +
            '<li>3. Colócala sobre el centro de los labios.</li>' +
            '<li>4. Presiona suavemente.</li>' +
            '<li>5. Retira al despertar.</li>' +
            '<li><strong>Importante:</strong> no usar con congestión nasal, dificultad para respirar por la nariz, ni en niños. Si tienes apnea del sueño diagnosticada, consulta antes con tu médico.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío a toda España peninsular en 3–5 días laborables.</li>' +
            '<li>Devolución gratuita durante los primeros 30 días si la caja está sin abrir.</li>' +
          '</ul>'
        },
        {
          title: 'De regalo con tu colchón',
          html: '<ul>' +
            '<li>Con la compra de cualquier colchón Aurea, una caja de Mouth Tape (30 tiras) va <strong>de regalo</strong> en tu pedido, sin hacer nada.</li>' +
            '<li><a href="colchones.html">Ver colchones</a></li>' +
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
    if (product.type === 'accesorio') {
      catalogPage = 'colchones.html#regalo';
      catalogLabel = 'Accesorios';
    }
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
      var price = product.sizes[selectedSize].price;
      priceEl.textContent = formatPrice(price);

      /* Coste por noche durante la garantía: reencuadra el precio */
      var perEl = document.getElementById('pdpPerNight');
      if (perEl) {
        if (product.type === 'accesorio') {
          perEl.innerHTML = '<strong>Gratis</strong> con la compra de cualquier colchón';
        } else {
          var years = product.type === 'canape' ? 5 : 10;
          var perNight = (price / (years * 365)).toFixed(2).replace('.', ',');
          perEl.innerHTML = 'Sale a <strong>' + perNight + ' € por noche</strong> durante los ' +
            years + ' años de garantía';
        }
      }

      var bbPrice = document.getElementById('buyBarPrice');
      if (bbPrice) bbPrice.textContent = formatPrice(price);
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
    function goCheckout() {
      window.location.href =
        'checkout.html?m=' + encodeURIComponent(id) + '&size=' + selectedSize;
    }
    document.getElementById('pdpBuy').addEventListener('click', goCheckout);

    /* — Barra de compra fija (móvil): aparece al perder de vista el botón — */
    var buyBar = document.getElementById('buyBar');
    if (buyBar) {
      document.getElementById('buyBarName').textContent = product.name;
      document.getElementById('buyBarBtn').addEventListener('click', goCheckout);
      if ('IntersectionObserver' in window) {
        var bbIo = new IntersectionObserver(function (entries) {
          var e = entries[0];
          var pastIt = e.boundingClientRect.top < 0;
          buyBar.classList.toggle('is-visible', !e.isIntersecting && pastIt);
        }, { threshold: 0 });
        bbIo.observe(document.getElementById('pdpBuy'));
      }
    }

    /* — Solo colchones: regalo Mouth Tape + enlace al comparador — */
    if (product.type === 'colchon') {
      var buyWrap = document.querySelector('.pdp__buy');
      if (buyWrap) {
        var gift = document.createElement('div');
        gift.className = 'pdp__gift';
        gift.innerHTML =
          '<svg class="pdp__gift-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
            '<rect x="3" y="8" width="18" height="4"/><rect x="5" y="12" width="14" height="9"/>' +
            '<path d="M12 8v13M12 8c0-2.2-1.8-4-4-4-1.5 0-2.5 1-2.5 2C5.5 7.2 7.5 8 12 8zm0 0c0-2.2 1.8-4 4-4 1.5 0 2.5 1 2.5 2 0 1.2-2 2-6.5 2z"/>' +
          '</svg>' +
          '<span class="pdp__gift-text"><strong>De regalo con tu colchón:</strong> ' +
          '<a href="producto.html?m=mouth-tape">Mouth Tape Aurea</a> (30 tiras), valorado en 10 €. ' +
          'Respira por la nariz, ronca menos. Se añade solo a tu pedido.</span>';
        buyWrap.parentNode.insertBefore(gift, buyWrap.nextSibling);
      }
      var trustEl = document.querySelector('.pdp__trust');
      if (trustEl) {
        var vsLink = document.createElement('a');
        vsLink.className = 'pdp__vs-link';
        vsLink.href = 'colchones.html#comparador';
        vsLink.innerHTML = '¿Dudas entre Serenity y Celestial? Compáralos cara a cara &rarr;';
        trustEl.parentNode.insertBefore(vsLink, trustEl.nextSibling);
      }
    }

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

    /* — Adaptación para accesorios (Mouth Tape) — */
    if (product.type === 'accesorio') {
      var aj3 = document.getElementById('journeyStep3');
      if (aj3) {
        aj3.querySelector('.journey__when').textContent = 'Primeros 30 días';
        aj3.querySelector('.journey__what').textContent = 'Devolución gratuita';
        aj3.querySelector('.journey__how').textContent  = 'Si no es para ti y la caja está sin abrir, te devolvemos el importe.';
      }
      var aj4 = document.getElementById('journeyStep4');
      if (aj4) {
        aj4.querySelector('.journey__when').textContent = 'Cada noche';
        aj4.querySelector('.journey__what').textContent = 'Respiración nasal';
        aj4.querySelector('.journey__how').textContent  = 'Tejido transpirable y adhesivo apto para uso nocturno. Sin medicamentos.';
      }
      var at2 = document.getElementById('trustNights');
      if (at2) {
        at2.querySelector('strong').textContent = '30 días';
        at2.querySelector('span').textContent = 'devolución';
      }
      var at3 = document.getElementById('trustYears');
      if (at3) {
        at3.querySelector('strong').textContent = 'Sin';
        at3.querySelector('span').textContent = 'medicamentos';
      }
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

    /* — JSON-LD de producto (precio y estrellas en Google) — */
    (function () {
      var prices = product.sizes.map(function (s) { return s.price; });
      var img = product.images[0];
      if (img.indexOf('http') !== 0) img = 'https://aureadescanso.com/' + img;
      var ld = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'description': product.desc,
        'image': img,
        'brand': { '@type': 'Brand', 'name': 'Aurea Descanso' },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating.replace(',', '.'),
          'reviewCount': String(product.reviews)
        },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'EUR',
          'lowPrice': String(Math.min.apply(null, prices)),
          'highPrice': String(Math.max.apply(null, prices)),
          'availability': 'https://schema.org/InStock',
          'url': 'https://aureadescanso.com/producto.html?m=' + id
        }
      };
      var tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.textContent = JSON.stringify(ld);
      document.head.appendChild(tag);
    })();

    /* — Corte por capas (solo productos con cutaway) — */
    (function () {
      var cw = product.cutaway;
      var section = document.getElementById('pdpCutaway');
      if (!section || !cw) return;
      section.hidden = false;
      document.getElementById('cutawaySub').textContent = cw.sub;

      var chipsEl = document.getElementById('cutawayChips');
      cw.chips.forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'cutaway__chip';
        s.innerHTML =
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' + c;
        chipsEl.appendChild(s);
      });

      /* Proyección oblicua: cara superior + frente + lateral por capa */
      var W = 300, DX = 78, DY = 38, GAP = 17, PAD = 10;
      var sumT = 0;
      cw.layers.forEach(function (l) { sumT += l.t; });
      var vbW = W + DX + PAD * 2;
      var vbH = DY + sumT + GAP * (cw.layers.length - 1) + PAD * 2;

      function shade(hex, f) {
        var n = parseInt(hex.slice(1), 16);
        var r = (n >> 16) & 255, gr = (n >> 8) & 255, b = n & 255;
        function c(v) {
          v = f > 0 ? v + (255 - v) * f : v * (1 + f);
          return Math.round(Math.min(255, Math.max(0, v)));
        }
        return 'rgb(' + c(r) + ',' + c(gr) + ',' + c(b) + ')';
      }

      var NS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 ' + vbW + ' ' + vbH);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', 'Capas del ' + product.name);

      /* Texturas por material: pespunte, visco, fibra, espuma HR, núcleo y malla 3D */
      var defs = document.createElementNS(NS, 'defs');
      defs.innerHTML =
        '<pattern id="cwp-quilt" width="30" height="14" patternUnits="userSpaceOnUse">' +
          '<path d="M0 11 Q 7.5 3 15 11 T 30 11" fill="none" stroke="rgba(140,110,40,0.32)" stroke-width="1.1"/>' +
        '</pattern>' +
        '<pattern id="cwp-visco" width="16" height="14" patternUnits="userSpaceOnUse">' +
          '<circle cx="4" cy="4" r="1.4" fill="rgba(120,90,20,0.22)"/>' +
          '<circle cx="12" cy="10" r="1.4" fill="rgba(120,90,20,0.22)"/>' +
        '</pattern>' +
        '<pattern id="cwp-fiber" width="22" height="12" patternUnits="userSpaceOnUse">' +
          '<ellipse cx="5" cy="4" rx="3.6" ry="1.7" fill="rgba(27,45,91,0.09)"/>' +
          '<ellipse cx="16" cy="9" rx="3.6" ry="1.7" fill="rgba(27,45,91,0.09)"/>' +
        '</pattern>' +
        '<pattern id="cwp-hr" width="10" height="10" patternUnits="userSpaceOnUse">' +
          '<path d="M-2 12 L12 -2" stroke="rgba(27,45,91,0.18)" stroke-width="1"/>' +
        '</pattern>' +
        '<pattern id="cwp-core" width="20" height="22" patternUnits="userSpaceOnUse">' +
          '<path d="M5 0 q5 5.5 0 11 q-5 5.5 0 11" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="1.4"/>' +
          '<path d="M15 0 q5 5.5 0 11 q-5 5.5 0 11" fill="none" stroke="rgba(255,255,255,0.26)" stroke-width="1.4"/>' +
        '</pattern>' +
        '<pattern id="cwp-mesh" width="7" height="7" patternUnits="userSpaceOnUse">' +
          '<path d="M0 0H7M0 0V7" stroke="rgba(20,30,60,0.24)" stroke-width="0.8"/>' +
        '</pattern>';
      svg.appendChild(defs);

      var stageEl  = document.getElementById('cutawayStage');
      var labelsEl = document.getElementById('cutawayLabels');
      var slabs = [], labels = [];
      var y = PAD + DY;
      var lastGroup = null;

      cw.layers.forEach(function (l, i) {
        var slab = document.createElementNS(NS, 'g');
        slab.setAttribute('class', 'cutaway-slab');
        slab.setAttribute('data-i', i);
        var x = PAD;

        function poly(points, fill) {
          var p = document.createElementNS(NS, 'polygon');
          p.setAttribute('points', points.map(function (pt) { return pt.join(','); }).join(' '));
          p.setAttribute('fill', fill);
          slab.appendChild(p);
        }
        poly([[x, y], [x + DX, y - DY], [x + DX + W, y - DY], [x + W, y]], shade(l.color, 0.28));
        var front = document.createElementNS(NS, 'rect');
        front.setAttribute('x', x);
        front.setAttribute('y', y);
        front.setAttribute('width', W);
        front.setAttribute('height', l.t);
        front.setAttribute('fill', l.color);
        front.setAttribute('stroke', 'rgba(10,17,40,0.12)');
        front.setAttribute('stroke-width', '0.6');
        slab.appendChild(front);
        if (l.tex) {
          var texRect = document.createElementNS(NS, 'rect');
          texRect.setAttribute('x', x);
          texRect.setAttribute('y', y);
          texRect.setAttribute('width', W);
          texRect.setAttribute('height', l.t);
          texRect.setAttribute('fill', 'url(#cwp-' + l.tex + ')');
          slab.appendChild(texRect);
        }
        poly([[x + W, y], [x + W + DX, y - DY], [x + W + DX, y + l.t - DY], [x + W, y + l.t]], shade(l.color, -0.22));

        svg.appendChild(slab);
        slabs.push(slab);
        y += l.t;

        if (l.group !== lastGroup) {
          var gh = document.createElement('li');
          gh.className = 'cutaway__group';
          gh.textContent = l.group;
          labelsEl.appendChild(gh);
          lastGroup = l.group;
        }
        var li = document.createElement('li');
        li.className = 'cutaway__label';
        li.setAttribute('data-i', i);
        li.innerHTML =
          '<span class="cutaway__num">' + (i + 1) + '</span>' +
          '<span class="cutaway__lname">' + l.name + '</span>' +
          '<span class="cutaway__lspec">' + l.spec + '</span>';
        labelsEl.appendChild(li);
        labels.push(li);
      });

      stageEl.appendChild(svg);

      /* Las capas se separan al entrar la sección en pantalla */
      function setExploded(on) {
        slabs.forEach(function (slab, i) {
          slab.style.transitionDelay = (i * 60) + 'ms';
          slab.style.transform = on ? 'translateY(' + (i * GAP) + 'px)' : 'translateY(0)';
        });
      }
      setExploded(false);
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { setExploded(true); io.disconnect(); }
          });
        }, { threshold: 0.3 });
        io.observe(section);
      } else {
        setExploded(true);
      }

      /* Hover sincronizado capa ↔ etiqueta */
      function setActive(i, on) {
        stageEl.classList.toggle('has-active', on);
        slabs.forEach(function (s) { s.classList.remove('is-active'); });
        labels.forEach(function (l) { l.classList.remove('is-active'); });
        if (on && i >= 0) {
          slabs[i].classList.add('is-active');
          labels[i].classList.add('is-active');
        }
      }
      slabs.concat(labels).forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          setActive(parseInt(el.getAttribute('data-i'), 10), true);
        });
        el.addEventListener('mouseleave', function () { setActive(-1, false); });
      });
    })();
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

    /* — Regalo con cada colchón: Mouth Tape — */
    if (product.type === 'colchon' && CATALOG['mouth-tape']) {
      var giftItem = document.createElement('div');
      giftItem.className = 'chk-item chk-item--gift';
      giftItem.innerHTML =
        '<div class="chk-item__img"><img src="' + CATALOG['mouth-tape'].images[0] + '" alt="Mouth Tape Aurea"></div>' +
        '<div>' +
          '<div class="chk-item__name">Mouth Tape Aurea · 30 tiras</div>' +
          '<div class="chk-item__meta">Regalo por tu colchón · Valorado en 10 €</div>' +
        '</div>' +
        '<span class="chk-gift-price">GRATIS</span>';
      var firstItem = document.querySelector('.chk-item');
      firstItem.parentNode.insertBefore(giftItem, firstItem.nextSibling);
    }

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

    /* — Consentimiento legal (obligatorio) — */
    var consentBox   = document.getElementById('chkLegal');
    var consentLabel = document.getElementById('chkConsent');
    if (consentBox) {
      consentBox.addEventListener('change', function () {
        if (consentBox.checked) consentLabel.classList.remove('has-error');
      });
    }

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

      if (consentBox && !consentBox.checked) {
        consentLabel.classList.add('has-error');
        ok = false;
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
