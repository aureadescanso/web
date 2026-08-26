/* =============================================
   NUVORA DESCANSO — Shop JS
   Catálogo · Ficha de producto · Checkout
   ============================================= */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ══════════════════════════════════════════════
     CATÁLOGO
     ══════════════════════════════════════════════ */
  var CATALOG = {
    'aurea': {
      type: 'colchon',
      typeLabel: 'Colchón viscoelástico',
      name: 'Nuvora Aurea',
      desc: 'Colchón viscoelástico de gama alta: 2 cm de viscoelástica que se adaptan a tu cuerpo y alivian los puntos de presión, sobre un núcleo HR de 28 kg/m³ que sujeta sin hundir. Acolchado tapa a tapa, 30 cm de altura y tejido transpirable para dormir fresco.',
      rating: '4,8',
      reviews: 412,
      images: [
        'images/aurea-frontal.webp',
        'images/aurea-perspectiva.webp',
        'images/aurea-lateral.webp',
        'images/aurea-asas.webp',
        'images/aurea-capas.webp'
      ],
      sizes: [
        { label: '75 × 190 cm',  price: 205.34 },
        { label: '75 × 200 cm',  price: 215.61 },
        { label: '80 × 190 cm',  price: 216.16 },
        { label: '80 × 200 cm',  price: 226.97 },
        { label: '90 × 190 cm',  price: 227.54 },
        { label: '90 × 200 cm',  price: 238.93 },
        { label: '105 × 190 cm', price: 259.01 },
        { label: '105 × 200 cm', price: 271.96 },
        { label: '110 × 190 cm', price: 271.96 },
        { label: '110 × 200 cm', price: 285.55 },
        { label: '120 × 190 cm', price: 299.15 },
        { label: '120 × 200 cm', price: 314.11 },
        { label: '135 × 190 cm', price: 319.66 },
        { label: '135 × 200 cm', price: 335.64 },
        { label: '140 × 190 cm', price: 335.64 },
        { label: '140 × 200 cm', price: 352.42 },
        { label: '150 × 190 cm', price: 349.53 },
        { label: '150 × 200 cm', price: 367.02 },
        { label: '160 × 190 cm', price: 384.62 },
        { label: '160 × 200 cm', price: 403.86 },
        { label: '180 × 190 cm', price: 429.02 },
        { label: '180 × 200 cm', price: 442.29 },
        { label: '200 × 190 cm', price: 471.09 },
        { label: '200 × 200 cm', price: 485.66 }
      ],
      defaultSize: 16,
      cutaway: {
        sub: 'Seis capas reales sobre un núcleo HR de alta densidad: la viscoelástica te acoge y el núcleo te sujeta, sin hundirte.',
        chips: ['Altura total: 30 cm aprox.', 'Acolchado tapa a tapa', 'Platabanda en tejido stretch', '4 asas verticales'],
        layers: [
          { group: 'Acolchado', name: 'Tejido stretch',     spec: '300 g/m², suave y elástico',        t: 12, color: '#F2E7CE', tex: 'quilt' },
          { group: 'Acolchado', name: 'Viscoelástica',      spec: '2 cm que se adaptan a tu cuerpo',    t: 22, color: '#E2C181', tex: 'visco' },
          { group: 'Acolchado', name: 'Fibra hueca',        spec: 'Acolchado mullido y transpirable',  t: 14, color: '#FDFCF8', tex: 'fiber' },
          { group: 'Acolchado', name: 'Espuma HR',          spec: '1,3 cm de transición progresiva',   t: 15, color: '#CBD9F1', tex: 'hr' },
          { group: 'Núcleo',    name: 'Núcleo HR 28 kg/m³', spec: '25 cm de soporte de alta densidad', t: 95, color: '#8CA7DA', tex: 'core' },
          { group: 'Base',      name: 'Base reforzada',     spec: 'Tejido inferior antideslizante',    t: 9,  color: '#C7B79A', tex: 'quilt' }
        ]
      },
      experience: {
        scenes: [
          {
            img: 'images/aurea-frontal.webp',
            alt: 'Colchón Nuvora Aurea de frente en un dormitorio cálido',
            kicker: 'Experiencia Aurea',
            title: 'Diseñado para presidir tu dormitorio',
            text: 'Tejido stretch de 300 g/m² con acolchado tapa a tapa y platabanda firmada. Sigue bajando y tócalo con los ojos.',
            hotspots: [
              { x: 68, y: 66, title: 'Platabanda acolchada', text: 'El lateral en tejido stretch acolchado mantiene la forma del colchón año tras año y remata el diseño con la firma Nuvora.' },
              { x: 45, y: 50, title: 'Tejido stretch 300 g/m²', text: 'Suave, elástico y cosido tapa a tapa: el acolchado no se desplaza con el uso, año tras año.' }
            ]
          },
          {
            img: 'images/aurea-perspectiva.webp',
            alt: 'Colchón Nuvora Aurea en perspectiva mostrando su altura',
            kicker: 'Presencia real',
            title: '30 centímetros que <em>se notan</em>',
            text: 'Bajo la superficie, un núcleo HR de 28 kg/m³ y 25 cm de grosor: soporte de alta densidad que no se rinde.',
            hotspots: [
              { x: 58, y: 62, title: 'Núcleo HR 28 kg/m³', text: '25 cm de espuma de alta resiliencia. La densidad es lo que separa un colchón que dura 10 años de uno que dura 5.' },
              { x: 36, y: 42, title: 'Viscoelástica de 2 cm', text: 'Se amolda a tu cuerpo y libera los puntos de presión de espalda, caderas y hombros mientras duermes.' }
            ]
          },
          {
            img: 'images/aurea-asas.webp',
            alt: 'Detalle de las asas verticales del colchón Nuvora Aurea',
            kicker: 'Los detalles',
            title: 'Lo que otras marcas <em>no enseñan</em>',
            text: 'Cuatro asas verticales cosidas a la platabanda para girarlo sin esfuerzo. Pruébalo 30 noches: si no te enamora, lo recogemos gratis.',
            cta: 'Añadir a la cesta',
            hotspots: [
              { x: 53, y: 46, title: '4 asas verticales', text: 'Girarlo 180° cada pocos meses para repartir el desgaste deja de ser un castigo: dos personas lo hacen en menos de un minuto.' },
              { x: 15, y: 52, title: 'Acolchado tapa a tapa', text: 'Cada capa va cosida al tejido, no suelta. Por eso la superficie sigue uniforme tras miles de noches.' }
            ]
          }
        ]
      },
      details: [
        {
          title: 'Composición y tecnología',
          html: '<ul>' +
            '<li>Núcleo de espuma HR de 28 kg/m³ de densidad y 25 cm de grosor: soporte consistente y duradero.</li>' +
            '<li><strong>Capa de confort:</strong> tejido stretch de 300 g/m², 2 cm de viscoelástica y fibra hueca, cosidos tapa a tapa para que el acolchado no se desplace.</li>' +
            '<li>Tejido transpirable que regula la humedad y ayuda a disipar el calor corporal durante la noche.</li>' +
            '<li>Platabanda en tejido stretch con 4 asas verticales para mover y girar el colchón con facilidad.</li>' +
            '<li>Altura total del colchón terminado: 30 cm aprox. Firmeza: media.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 3–5 días laborables.</li>' +
            '<li>Llega comprimido al vacío y enrollado; se expande en 24 horas.</li>' +
            '<li>30 noches de prueba: si no te convence, lo recogemos gratis y te devolvemos el importe íntegro.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre hundimientos superiores a 2,5 cm e irregularidades del núcleo.</li>' +
            '<li>Sin letra pequeña: gestión directa con nosotros, sin intermediarios.</li>' +
          '</ul>'
        }
      ]
    },

    'serenity': {
      type: 'colchon',
      comingSoon: true,
      typeLabel: 'Colchón híbrido de muelles ensacados',
      name: 'Nuvora Serenity',
      desc: 'Firmeza media-alta con muelles ensacados individualmente y doble capa de viscoelástica. Máxima transpirabilidad e independencia de lechos: el colchón para parejas exigentes.',
      rating: '4,9',
      reviews: 287,
      images: ['images/producto2.jpg'],
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
            '<li>30 noches de prueba con recogida y reembolso gratuitos.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre muelles, núcleo, hundimientos e irregularidades.</li>' +
            '<li>Atención directa de fábrica, respuesta en menos de 48 h.</li>' +
          '</ul>'
        }
      ]
    },

    'mouth-tape': {
      type: 'accesorio',
      typeLabel: 'Accesorio de descanso',
      name: 'Mouth Tape Nuvora',
      desc: '30 tiras adhesivas de tejido transpirable que mantienen la boca cerrada mientras duermes y fomentan la respiración nasal: menos ronquidos, menos boca seca y un despertar con más energía. Sin medicamentos ni ingredientes activos.',
      rating: '4,7',
      reviews: 86,
      images: ['images/mouth-tape.webp'],
      box3d: true,
      cutImg: 'images/mouth-tape-cut.webp',
      /* Complementos desactivados temporalmente: no se enlaza ni se puede
         abrir la ficha. Se conserva la ficha completa para reactivarla. */
      hidden: true,
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
          title: 'Disponibilidad',
          html: '<ul>' +
            '<li>Producto temporalmente no disponible en la tienda.</li>' +
            '<li><a href="colchones.html">Ver colchones</a></li>' +
          '</ul>'
        }
      ]
    },

    'tiras-nasales': {
      type: 'accesorio',
      typeLabel: 'Accesorio de descanso',
      name: 'Tiras Nasales Nuvora',
      desc: '30 tiras nasales flexibles que abren suavemente las fosas nasales desde fuera: más flujo de aire, menos ronquidos y una respiración más fácil durante toda la noche. Sin medicamentos, aptas para el uso diario.',
      rating: '4,6',
      reviews: 54,
      images: ['images/tiras-nasales.webp'],
      box3d: true,
      cutImg: 'images/tiras-nasales-cut.webp',
      /* Complementos desactivados temporalmente (ver 'mouth-tape'). */
      hidden: true,
      sizes: [
        { label: 'Caja · 30 tiras', price: 10 }
      ],
      defaultSize: 0,
      details: [
        {
          title: 'Qué son y cómo funcionan',
          html: '<ul>' +
            '<li>Tiras flexibles que se adhieren sobre el puente de la nariz y abren las fosas nasales desde fuera, de forma mecánica.</li>' +
            '<li>Más flujo de aire al instante: respiración más fácil y menos ronquidos.</li>' +
            '<li>Adhesivo suave con la piel, cómodo durante toda la noche.</li>' +
            '<li>Sin medicamentos ni ingredientes activos. Uso externo.</li>' +
          '</ul>'
        },
        {
          title: 'Modo de empleo',
          html: '<ul>' +
            '<li>1. Lava y seca bien la piel de la nariz.</li>' +
            '<li>2. Retira el protector de la tira.</li>' +
            '<li>3. Céntrala sobre el puente de la nariz, justo encima de las aletas.</li>' +
            '<li>4. Presiona unos segundos para fijarla.</li>' +
            '<li>5. Retírala por la mañana, mejor con agua tibia.</li>' +
            '<li><strong>Importante:</strong> no usar sobre piel irritada o con heridas, ni en niños pequeños.</li>' +
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
          title: 'El dúo de la respiración nasal',
          html: '<ul>' +
            '<li>Combínalas con el <a href="producto.html?m=mouth-tape">Mouth Tape Nuvora</a>: las tiras abren la nariz y el tape mantiene la boca cerrada. Respiración nasal completa toda la noche.</li>' +
          '</ul>'
        }
      ]
    },

    'almohada-nuvora': {
      type: 'almohada',
      typeLabel: 'Almohada viscoelástica',
      name: 'Almohada viscoelástica Nuvora',
      desc: 'La pieza que le falta a tu descanso. Núcleo de viscoelástica perforada que se amolda a tu cuello en segundos y vuelve a su sitio cada noche, con funda de tejido técnico transpirable, desenfundable y lavable. Si te levantas con el cuello cargado, empieza por aquí.',
      images: ['images/almohada-nuvora.webp'],
      compare: false,
      sizes: [
        { label: '70 × 40 cm',  price: 44.90 },
        { label: '90 × 40 cm',  price: 54.90 },
        { label: '135 × 40 cm', price: 64.90 },
        { label: '150 × 40 cm', price: 69.90 }
      ],
      defaultSize: 1,
      details: [
        {
          title: 'Características principales',
          html: '<ul>' +
            '<li>Núcleo de <strong>viscoelástica perforada</strong> de 50 kg/m³: se adapta al peso de la cabeza y recupera la forma al levantarte.</li>' +
            '<li><strong>Altura de 12 cm</strong> con perfil ergonómico: mantiene el cuello alineado con la columna.</li>' +
            '<li>Canales de ventilación que evacúan el calor y la humedad durante la noche.</li>' +
            '<li>Funda exterior <strong>desenfundable con cremallera</strong> y lavable a 30 °C.</li>' +
            '<li>Tratamiento antiácaros y antibacteriano: apta para pieles sensibles y alérgicos.</li>' +
          '</ul>'
        },
        {
          title: 'Materiales',
          html: '<ul>' +
            '<li><strong>Núcleo:</strong> espuma viscoelástica de 50 kg/m³ con perforación vertical.</li>' +
            '<li><strong>Funda:</strong> tejido técnico transpirable con cremallera perimetral.</li>' +
            '<li><strong>Certificación:</strong> OEKO-TEX® Standard 100, libre de sustancias nocivas.</li>' +
            '<li>Fabricada en España, en nuestra propia fábrica.</li>' +
          '</ul>'
        },
        {
          title: 'Medidas disponibles',
          html: '<ul>' +
            '<li><strong>70 × 40 cm</strong> — camas de 70, 80 y 90 cm</li>' +
            '<li><strong>90 × 40 cm</strong> — camas de 90 y 105 cm</li>' +
            '<li><strong>135 × 40 cm</strong> — camas de 135 y 140 cm</li>' +
            '<li><strong>150 × 40 cm</strong> — camas de 150 y 160 cm</li>' +
            '<li>Altura: 12 cm · Peso aproximado: 1,2 kg (70 cm)</li>' +
          '</ul>'
        },
        {
          title: 'Nivel de firmeza',
          html: '<ul>' +
            '<li><strong>Firmeza media (6/10).</strong> El punto medio que funciona para la mayoría.</li>' +
            '<li><strong>Recomendada si duermes de lado o boca arriba:</strong> rellena el hueco del hombro sin empujar la cabeza hacia delante.</li>' +
            '<li>Si duermes boca abajo, elige la medida más ancha y colócala baja: notarás menos tensión cervical.</li>' +
          '</ul>'
        },
        {
          title: 'Beneficios principales',
          html: '<ul>' +
            '<li>Alivia la presión en cuello y hombros desde la primera noche.</li>' +
            '<li>Mantiene la alineación cervical y reduce los despertares por mala postura.</li>' +
            '<li>Transpirable: menos calor acumulado bajo la cabeza.</li>' +
            '<li>Higiénica: funda lavable y tratamiento antiácaros.</li>' +
            '<li>Sin deformaciones: la viscoelástica de 50 kg/m³ no se apelmaza.</li>' +
          '</ul>'
        },
        {
          title: 'Envío, prueba y cuidados',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 3–5 días laborables.</li>' +
            '<li><strong>30 noches de prueba:</strong> si no es la tuya, la recogemos y te devolvemos el importe.</li>' +
            '<li>Airea el núcleo 24 h al recibirla. No lavar el núcleo: solo la funda, a 30 °C.</li>' +
            '<li>Secar al aire, sin secadora ni lavado en seco.</li>' +
          '</ul>'
        }
      ]
    }
  };

  /* ══════════════════════════════════════════════
     CANAPÉ ABATIBLE NUVORA — un mismo modelo, tres acabados.
     Se generan aquí para que las medidas, los precios y las
     fichas técnicas no se puedan desincronizar entre colores.
     ══════════════════════════════════════════════ */
  (function () {
    /* 30 medidas: 10 anchos × 3 fondos (180, 190 y 200 cm).
       Los índices deben coincidir con CANAPE_MEDIDAS en
       netlify/functions/_catalogo.js. */
    var SIZES = [
      { label: '90 × 180 cm',  price: 300 },
      { label: '90 × 190 cm',  price: 300 },
      { label: '90 × 200 cm',  price: 315 },
      { label: '105 × 180 cm', price: 305 },
      { label: '105 × 190 cm', price: 305 },
      { label: '105 × 200 cm', price: 325 },
      { label: '110 × 180 cm', price: 320 },
      { label: '110 × 190 cm', price: 320 },
      { label: '110 × 200 cm', price: 335 },
      { label: '120 × 180 cm', price: 320 },
      { label: '120 × 190 cm', price: 320 },
      { label: '120 × 200 cm', price: 335 },
      { label: '135 × 180 cm', price: 335 },
      { label: '135 × 190 cm', price: 335 },
      { label: '135 × 200 cm', price: 355 },
      { label: '140 × 180 cm', price: 335 },
      { label: '140 × 190 cm', price: 335 },
      { label: '140 × 200 cm', price: 350 },
      { label: '150 × 180 cm', price: 345 },
      { label: '150 × 190 cm', price: 345 },
      { label: '150 × 200 cm', price: 360 },
      { label: '160 × 180 cm', price: 355 },
      { label: '160 × 190 cm', price: 355 },
      { label: '160 × 200 cm', price: 375 },
      { label: '180 × 180 cm', price: 595 },
      { label: '180 × 190 cm', price: 595 },
      { label: '180 × 200 cm', price: 615 },
      { label: '200 × 180 cm', price: 610 },
      { label: '200 × 190 cm', price: 610 },
      { label: '200 × 200 cm', price: 630 }
    ];

    var COLORS = [
      {
        id: 'canape-nuvora-blanco',
        color: 'Blanco',
        swatch: '#F2EDE4',
        file: 'blanco',
        claim: 'El acabado que agranda el dormitorio.',
        desc: 'Gana hasta 1.000 litros de almacenaje sin que se note. El acabado blanco refleja la luz y hace que la habitación respire: ideal en dormitorios pequeños o de estilo nórdico. Estructura reforzada, apertura asistida con pistones de gas y tapa transpirable que cuida tu colchón.',
        note: 'El blanco es nuestro acabado más vendido: combina con cualquier textil y no pasa de moda.'
      },
      {
        id: 'canape-nuvora-cambrian',
        color: 'Cambrian',
        swatch: '#B6A78F',
        file: 'cambrian',
        claim: 'Madera cálida, sin el precio de la madera maciza.',
        desc: 'El acabado Cambrian imita la veta del roble natural con un tono cálido y luminoso que encaja tanto en un dormitorio rústico como en uno contemporáneo. Debajo, hasta 1.000 litros de almacenaje y una apertura asistida que se abre con dos dedos.',
        note: 'Cambrian es el término medio perfecto: aporta calidez sin oscurecer la habitación.'
      },
      {
        id: 'canape-nuvora-wengue',
        color: 'Wengué',
        swatch: '#49362C',
        file: 'wengue',
        claim: 'Marrón oscuro con carácter.',
        desc: 'Un marrón chocolate profundo que aporta peso visual y contrasta con la ropa de cama clara. El acabado wengué es el favorito en dormitorios amplios y de estilo clásico. Con la misma estructura reforzada, la misma apertura asistida y los mismos 1.000 litros de almacenaje.',
        note: 'Wengué disimula el uso diario mejor que ningún otro acabado.'
      }
    ];

    COLORS.forEach(function (c) {
      CATALOG[c.id] = {
        type: 'canape',
        typeLabel: 'Canapé abatible',
        name: 'Canapé abatible Nuvora – ' + c.color,
        color: c.color,
        model: 'canape-nuvora',
        desc: c.desc,
        images: [
          'images/canape-' + c.file + '.webp',
          'images/canape-' + c.file + '-detalle.webp'
        ],
        compare: false,
        sizes: SIZES.slice(),
        /* 30 medidas son demasiadas para pastillas: desplegable */
        sizeUi: 'select',
        defaultSize: 19, /* 150 × 190 cm */
        variants: COLORS.map(function (v) {
          return { id: v.id, label: v.color, swatch: v.swatch };
        }),
        details: [
          {
            title: 'Características principales',
            html: '<ul>' +
              '<li><strong>Hasta 1.000 litros de almacenaje</strong> bajo la cama: la ropa de temporada deja de ocupar armario.</li>' +
              '<li><strong>Apertura asistida</strong> con dos pistones de gas: se levanta con una mano y se queda arriba solo.</li>' +
              '<li><strong>Tapa 3D transpirable</strong> tapizada: deja pasar el aire y alarga la vida de tu colchón.</li>' +
              '<li><strong>Estructura reforzada</strong> con travesaños de acero y refuerzo central: nada de crujidos.</li>' +
              '<li><strong>Acabado ' + c.color + '</strong> con canto ABS termosellado, resistente a golpes y humedad.</li>' +
              '<li>Fondo de melamina hidrófuga forrado: la ropa guardada no coge olor.</li>' +
            '</ul>'
          },
          {
            title: 'Materiales y acabado',
            html: '<ul>' +
              '<li><strong>Cuerpo:</strong> melamina hidrófuga de 16 mm en acabado ' + c.color + '.</li>' +
              '<li><strong>Cantos:</strong> ABS termosellado de 1 mm en todo el perímetro.</li>' +
              '<li><strong>Herrajes:</strong> acero lacado con doble pistón de gas por lateral.</li>' +
              '<li><strong>Tapa:</strong> tablero tapizado en tejido 3D transpirable gris perla.</li>' +
              '<li><strong>Patas:</strong> 4 patas de 8 cm con base antideslizante (incluidas).</li>' +
              '<li>' + c.note + '</li>' +
            '</ul>'
          },
          {
            title: 'Medidas disponibles',
            html: '<ul>' +
              SIZES.map(function (s) {
                return '<li>' + s.label + ' — ' + s.price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €</li>';
              }).join('') +
              '<li>Altura del cuerpo: 34 cm · Altura total con patas: 42 cm.</li>' +
              '<li>Profundidad útil de almacenaje: 26 cm.</li>' +
            '</ul>'
          },
          {
            title: 'Envío y entrega',
            html: '<ul>' +
              '<li><strong>Envío gratuito</strong> a toda España peninsular en 5–7 días laborables.</li>' +
              '<li>Te avisamos por teléfono para acordar el día y la franja horaria de entrega.</li>' +
              '<li>Necesitas un hueco de acceso de al menos 80 cm de ancho.</li>' +
              '<li>Devolución gratuita durante los primeros 30 días.</li>' +
            '</ul>'
          },
          {
            title: 'Garantía',
            html: '<ul>' +
              '<li><strong>5 años</strong> de garantía en estructura y mecanismo de elevación.</li>' +
              '<li><strong>2 años</strong> en tapizado y acabados frente a defectos de fabricación.</li>' +
              '<li>Repuestos de pistones y herrajes disponibles de por vida.</li>' +
            '</ul>'
          },
          {
            title: 'Combina con tu colchón',
            html: '<ul>' +
              '<li>Elige el canapé en la misma medida que tu colchón: si tu colchón es de 150 × 190 cm, tu canapé también.</li>' +
              '<li>¿Aún no tienes colchón? Mira el <a href="producto.html?m=aurea">Nuvora Aurea</a> o llévate los dos en un <a href="packs.html">pack de descanso</a> y ahorra un 12 %.</li>' +
            '</ul>'
          }
        ]
      };
    });
  })();


  /* ══════════════════════════════════════════════
     NUVORA AUREA — dos núcleos, mismas medidas.
     El de muelles ensacados cuesta 50 € más en CADA medida y
     se calcula a partir del viscoelástico para que las tarifas
     no se puedan desincronizar. Ambos se enlazan como variantes.
     ══════════════════════════════════════════════ */
  (function () {
    var SUPLEMENTO = 50;
    var visco = CATALOG['aurea'];
    if (!visco) return;

    CATALOG['aurea-muelles'] = {
      type: 'colchon',
      typeLabel: 'Colchón de muelles ensacados',
      name: 'Nuvora Aurea Muelles Ensacados',
      desc: 'El mismo Aurea, con núcleo de muelles ensacados individualmente. Cada muelle trabaja por su cuenta: si tu pareja se mueve, tú no te enteras. Más aireado que la espuma y con un punto más de firmeza, para quien duerme caluroso o busca un soporte más firme.',
      images: [
        'images/aurea-frontal.webp',
        'images/aurea-perspectiva.webp',
        'images/aurea-lateral.webp',
        'images/aurea-asas.webp'
      ],
      /* Mismas medidas que el viscoelástico, 50 € más cada una */
      sizes: visco.sizes.map(function (s) {
        return { label: s.label, price: s.price + SUPLEMENTO };
      }),
      defaultSize: visco.defaultSize,
      details: [
        {
          title: 'Composición y tecnología',
          html: '<ul>' +
            '<li><strong>Núcleo de muelles ensacados individualmente:</strong> cada muelle va en su propia funda de tejido y se hunde solo donde recibe peso.</li>' +
            '<li><strong>Independencia de lechos:</strong> los movimientos de un lado de la cama no se transmiten al otro.</li>' +
            '<li><strong>Más transpirable que la espuma:</strong> el aire circula entre los muelles y el calor no se queda debajo del cuerpo.</li>' +
            '<li><strong>Refuerzo perimetral:</strong> puedes sentarte en el borde sin que se venza.</li>' +
            '<li>Capa de confort acolchada tapa a tapa y tejido transpirable, igual que en el viscoelástico.</li>' +
            '<li>Firmeza: media-firme, un punto por encima de la versión viscoelástica.</li>' +
          '</ul>'
        },
        {
          title: '¿Viscoelástico o muelles?',
          html: '<ul>' +
            '<li><strong>Elige muelles ensacados</strong> si dormís dos y os molestan los movimientos del otro, si eres caluroso o si prefieres una acogida más firme.</li>' +
            '<li><strong>Elige <a href="producto.html?m=aurea">viscoelástico</a></strong> si duermes de lado, buscas que el colchón te abrace y quieres el precio más ajustado.</li>' +
            '<li>Las dos versiones comparten medidas, garantía y las 30 noches de prueba. Si te equivocas, lo recogemos gratis.</li>' +
            '<li>¿Sigues con dudas? Lo desarrollamos en la <a href="blog/viscoelastico-o-muelles.html">guía de viscoelástico o muelles</a>.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular en 3–5 días laborables.</li>' +
            '<li>30 noches de prueba: si no te convence, lo recogemos gratis y te devolvemos el importe íntegro.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre hundimientos superiores a 2,5 cm y la rotura de muelles.</li>' +
            '<li>Sin letra pequeña: gestión directa con nosotros, sin intermediarios.</li>' +
          '</ul>'
        }
      ]
    };

    /* Selector de núcleo en las dos fichas (etiquetas, sin muestra de color) */
    var NUCLEOS = [
      { id: 'aurea',         label: 'Viscoelástico' },
      { id: 'aurea-muelles', label: 'Muelles ensacados' }
    ];
    CATALOG['aurea'].variantLabel = 'Elige el núcleo';
    CATALOG['aurea'].variantName = 'Viscoelástico';
    CATALOG['aurea'].variants = NUCLEOS;
    CATALOG['aurea-muelles'].variantLabel = 'Elige el núcleo';
    CATALOG['aurea-muelles'].variantName = 'Muelles ensacados';
    CATALOG['aurea-muelles'].variants = NUCLEOS;

    /* ══════════════════════════════════════════════
       NUVORA SUPREME — gama alta, doble cara.
       Tarifa: 280 € más que el colchón más barato (el Aurea
       viscoelástico) en cada una de las 24 medidas.
       ══════════════════════════════════════════════ */
    var SUPREME_EXTRA = 280;
    CATALOG['supreme'] = {
      type: 'colchon',
      typeLabel: 'Colchón de muelles ensacados · doble cara',
      name: 'Nuvora Supreme',
      desc: 'Nuestro colchón más completo. Once capas repartidas en dos caras: en invierno duermes sobre pura lana; cuando aprieta el calor le das la vuelta y duermes sobre algodón natural. Debajo, una carcasa de muelles ensacados de 18 cm con viscogel y ElioSupport® que reparte el peso y aísla los movimientos del otro lado de la cama.',
      images: [
        'images/supreme-frontal.webp',
        'images/supreme-ambiente.webp',
        'images/supreme-lateral.webp',
        'images/supreme-esquina.webp',
        'images/supreme-tacto.webp',
        /* Despiece fotográfico. Va aquí y no junto al esquema de capas
           porque su numeración es la de la foto, no la de nuestra lista. */
        'images/supreme-capas.webp'
      ],
      sizes: visco.sizes.map(function (s) {
        return { label: s.label, price: s.price + SUPREME_EXTRA };
      }),
      defaultSize: visco.defaultSize,

      /* Despiece: 11 capas en tres bloques. Los grosores del dibujo son
         orientativos —las capas finas no se verían a escala real—, por eso
         se avisa en los distintivos. */
      cutaway: {
        sub: 'Once capas y dos caras para dormir. Elige una estación y mira cómo cambia el colchón: al pasar a verano se voltea, igual que harías en casa.',
        chips: ['Doble cara: invierno y verano', 'Muelles ensacados de 18 cm', 'Viscogel de 2 cm', 'Esquema orientativo, no a escala'],
        seasons: [
          { key: 'Cara invierno', label: 'Invierno', note: 'Pura lana: retiene el calor y te aísla del frío.' },
          { key: 'Cara verano',   label: 'Verano',   note: 'Cotton natural: fresco, transpirable y seco.' }
        ],
        flipOn: 'Cara verano',
        layers: [
          { group: 'Cara invierno', name: 'Tejido viscosa',        spec: '400 g/m², tacto sedoso',              t: 11,  color: '#F4EAD2', tex: 'quilt' },
          { group: 'Cara invierno', name: 'Viscoelástica',         spec: '1,6 cm que se amoldan al cuerpo',      t: 24,  color: '#E2C181', tex: 'visco' },
          { group: 'Cara invierno', name: 'Pura lana',             spec: '100 g: calor natural en invierno',     t: 19,  color: '#FBF6EA', tex: 'fiber' },
          { group: 'Cara invierno', name: 'Eliocell Plus®',        spec: '2,6 cm de acogida progresiva',         t: 36,  color: '#DCE6F7', tex: 'hr' },
          { group: 'Núcleo',        name: 'Viscogel',              spec: '2 cm que disipan el calor',            t: 28,  color: '#B9CDEB', tex: 'visco' },
          { group: 'Núcleo',        name: 'Carcasa de muelles',    spec: '18 cm ensacados individualmente',      t: 104, color: '#8CA7DA', tex: 'core' },
          { group: 'Núcleo',        name: 'ElioSupport®',          spec: '2 cm de base estabilizadora',          t: 28,  color: '#A9BFE4', tex: 'hr' },
          { group: 'Cara verano',   name: 'Eliocell Plus®',        spec: '1,3 cm de acogida más firme',          t: 19,  color: '#DCE6F7', tex: 'hr' },
          { group: 'Cara verano',   name: 'Fibra hipoalergénica',  spec: '200 g, apta para alérgicos',           t: 22,  color: '#FDFCF8', tex: 'fiber' },
          { group: 'Cara verano',   name: 'Cotton Natural',        spec: 'Algodón que respira en verano',        t: 14,  color: '#F7F2E6', tex: 'mesh' },
          { group: 'Cara verano',   name: 'Tejido viscosa',        spec: '400 g/m², tacto sedoso',               t: 11,  color: '#F4EAD2', tex: 'quilt' }
        ]
      },

      details: [
        {
          title: 'Composición, capa a capa',
          html: '<ul>' +
            '<li><strong>Cara de invierno:</strong> tejido viscosa 400 g/m² · viscoelástica 1,6 cm · pura lana 100 g · Eliocell Plus® 2,6 cm.</li>' +
            '<li><strong>Núcleo:</strong> viscogel 2 cm · carcasa de muelles ensacados 18 cm · ElioSupport® 2 cm.</li>' +
            '<li><strong>Cara de verano:</strong> Eliocell Plus® 1,3 cm · fibra hipoalergénica 200 g · Cotton Natural · tejido viscosa 400 g/m².</li>' +
            '<li>Suman <strong>27,5 cm</strong> las capas con espesor declarado, más los tejidos, la lana y la fibra.</li>' +
          '</ul>'
        },
        {
          title: 'Las dos caras: cuándo voltearlo',
          html: '<ul>' +
            '<li><strong>Cara de invierno (lana):</strong> la lana retiene el calor corporal y te aísla del frío. Úsala de octubre a abril, más o menos.</li>' +
            '<li><strong>Cara de verano (algodón):</strong> el Cotton Natural evacúa la humedad y da sensación de fresco. Úsala en los meses de calor.</li>' +
            '<li><strong>Cómo voltearlo:</strong> dos veces al año, al cambiar de estación. Aprovecha y gíralo también cabeza-pies para repartir el desgaste.</li>' +
            '<li>Las dos caras están completamente acabadas: no hay una cara «buena» y otra «mala».</li>' +
          '</ul>'
        },
        {
          title: 'Qué aporta cada tecnología',
          html: '<ul>' +
            '<li><strong>Muelles ensacados:</strong> cada muelle va en su funda y se hunde solo donde recibe peso. Si tu pareja se mueve, tú no lo notas.</li>' +
            '<li><strong>Viscogel:</strong> viscoelástica con gel, que se adapta como la visco pero acumula menos calor.</li>' +
            '<li><strong>Eliocell Plus®:</strong> espuma de acogida que suaviza la transición entre el acolchado y los muelles.</li>' +
            '<li><strong>ElioSupport®:</strong> capa base que estabiliza la carcasa y evita que los muelles trabajen contra el somier.</li>' +
            '<li><strong>Pura lana y Cotton Natural:</strong> fibras naturales, cada una para su estación.</li>' +
          '</ul>'
        },
        {
          title: 'Medidas disponibles',
          html: '<ul>' +
            '<li>24 medidas, de <strong>75 × 190 cm</strong> a <strong>200 × 200 cm</strong>, las mismas que el resto de nuestros colchones.</li>' +
            '<li>Elige la medida arriba para ver su precio exacto.</li>' +
            '<li>Se fabrica bajo pedido en nuestra planta de España.</li>' +
          '</ul>'
        },
        {
          title: 'Envío y devoluciones',
          html: '<ul>' +
            '<li>Envío gratuito a toda España peninsular.</li>' +
            '<li><strong>30 noches de prueba:</strong> si no te convence, lo recogemos gratis y te devolvemos el importe íntegro.</li>' +
            '<li>Al ser un colchón de muelles, llega en plano: no se comprime ni se enrolla.</li>' +
          '</ul>'
        },
        {
          title: 'Garantía',
          html: '<ul>' +
            '<li>5 años de garantía completa contra defectos de fabricación.</li>' +
            '<li>Cubre hundimientos superiores a 2,5 cm y la rotura de muelles.</li>' +
            '<li>Sin letra pequeña: gestión directa con nosotros, sin intermediarios.</li>' +
          '</ul>'
        }
      ]
    };
  })();

  /* El configurador de packs (js/packs.js) lee el catálogo desde aquí */
  window.NuvoraCatalog = CATALOG;

  function formatPrice(n) {
    return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  }

  /* ── Etiquetas de la ficha para buscadores y redes ──
     producto.html es una sola plantilla para todos los productos, así que
     el HTML sale con un título genérico. Aquí se sustituye por el del
     producto y, sobre todo, se declara la URL canónica con su ?m=: sin
     ella Google puede tratar todas las fichas como la misma página. */
  var URL_BASE = 'https://nuvoradescanso.com/';
  function metaTag(sel, attr, valor, crear) {
    var el = document.head.querySelector(sel);
    if (!el) {
      if (!crear) return;
      el = document.createElement(crear.tag);
      Object.keys(crear.attrs).forEach(function (k) { el.setAttribute(k, crear.attrs[k]); });
      document.head.appendChild(el);
    }
    el.setAttribute(attr, valor);
  }
  function setSeo(product, id) {
    var url = URL_BASE + 'producto.html?m=' + encodeURIComponent(id);
    var img = product.images && product.images[0] ? URL_BASE + product.images[0] : '';
    var desc = String(product.desc || '').replace(/\s+/g, ' ').trim().slice(0, 155);

    metaTag('link[rel="canonical"]', 'href', url,
      { tag: 'link', attrs: { rel: 'canonical' } });
    metaTag('meta[name="description"]', 'content', desc,
      { tag: 'meta', attrs: { name: 'description' } });
    metaTag('meta[property="og:title"]', 'content', product.name + ' | Nuvora Descanso',
      { tag: 'meta', attrs: { property: 'og:title' } });
    metaTag('meta[property="og:description"]', 'content', desc,
      { tag: 'meta', attrs: { property: 'og:description' } });
    metaTag('meta[property="og:url"]', 'content', url,
      { tag: 'meta', attrs: { property: 'og:url' } });
    if (img) {
      metaTag('meta[property="og:image"]', 'content', img,
        { tag: 'meta', attrs: { property: 'og:image' } });
    }
  }

  /* Precio de referencia en tienda física: nuestro precio es un 35 % menor.
     REQUISITO LEGAL: debe poder justificarse como PVP real de tienda física. */
  var STORE_DISCOUNT = 0.40;
  function storePrice(n) {
    return n / (1 - STORE_DISCOUNT);
  }

  /* ── Pack de descanso ──
     Un pedido con colchón + canapé + almohada lleva un −12 % automático.
     No es acumulable con el cupón: se aplica el mayor de los dos.
     El servidor repite este mismo cálculo en netlify/functions/_catalogo.js;
     si cambias el porcentaje aquí, cámbialo también allí. */
  var PACK_DISCOUNT = 0.12;
  function isPackOrder(lines) {
    var t = {};
    lines.forEach(function (l) { t[l.type] = true; });
    return !!(t.colchon && t.canape && t.almohada);
  }
  window.NuvoraPack = { rate: PACK_DISCOUNT, isPack: isPackOrder };

  /* Escapa texto antes de insertarlo como HTML (defensa frente a datos manipulados en localStorage) */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cuenta suave entre dos números (para el precio al cambiar de medida) */
  function tweenNumber(from, to, dur, onStep) {
    if (prefersReduced || from === to) { onStep(to); return; }
    var start = null;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      /* Durante la cuenta se redondea (queda más limpio), pero el último
         fotograma debe ser el importe exacto: si no, 205,34 € acaba
         mostrándose como 205,00 €. */
      onStep(p < 1 ? Math.round(from + (to - from) * eased) : to);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
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

    /* Producto inexistente, o categoría desactivada temporalmente
       (hidden: true → Complementos), → volver al catálogo */
    if (!product || product.hidden) {
      window.location.replace('colchones.html');
      return;
    }

    /* Producto "Próximamente": teaser inmersivo en vez de la ficha normal */
    if (product.comingSoon) {
      document.title = product.name + ' · Próximamente | Nuvora Descanso';
      setSeo(product, id);
      var t = function (k, fb) { return (window.NuvoraI18n && window.NuvoraI18n.t(k)) || fb; };
      var tape = '';
      for (var ti = 0; ti < 10; ti++) {
        tape += '<span>Próximamente</span><span class="soon-dot">✦</span><span>' + product.name +
                '</span><span class="soon-dot">✦</span><span>Coming soon</span><span class="soon-dot">✦</span>';
      }
      root.classList.add('pdp--soon');
      root.innerHTML =
        '<section class="soonx">' +
          '<div class="soonx__bg" style="background-image:url(\'' + product.images[0] + '\')"></div>' +
          '<div class="soonx__veil"></div>' +
          '<div class="tape tape--1"><div class="tape__track">' + tape + '</div></div>' +
          '<div class="tape tape--2"><div class="tape__track">' + tape + '</div></div>' +
          '<div class="soonx__content">' +
            '<span class="soonx__eyebrow"><span class="soonx__dot" aria-hidden="true"></span>' +
              '<span data-i18n="soon.badge">Próximamente</span></span>' +
            '<h1 class="soonx__title">' + product.name + '</h1>' +
            '<p class="soonx__price" data-i18n="soon.price">Precio por desvelar</p>' +
            '<p class="soonx__lead" data-i18n="soon.lead">' + t('soon.lead', '') + '</p>' +
            '<form class="soonx__form" id="soonForm" novalidate>' +
              '<input type="email" id="soonEmail" required autocomplete="email" placeholder="Tu correo" data-i18n-ph="soon.email_ph">' +
              '<button type="submit" data-i18n="soon.notify">Avísame del lanzamiento</button>' +
            '</form>' +
            '<p class="soonx__note" data-i18n="soon.note">Sé el primero en saberlo. Sin spam, solo el aviso de lanzamiento.</p>' +
            '<p class="soonx__ok" id="soonOk" hidden data-i18n="soon.ok">¡Estás en la lista! Te avisaremos el día del lanzamiento.</p>' +
            '<a class="soonx__back" href="colchones.html" data-i18n="nav.colchones">Colchones</a>' +
          '</div>' +
        '</section>';

      var soonForm = document.getElementById('soonForm');
      soonForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var emailEl = document.getElementById('soonEmail');
        var email = emailEl.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailEl.focus(); return; }
        /* Registrar el interés enviándonos un email con su dirección */
        window.location.href = 'mailto:nuvoradescanso@gmail.com?subject=' +
          encodeURIComponent('Lista de espera — ' + product.name) +
          '&body=' + encodeURIComponent('Avisadme del lanzamiento del ' + product.name + ' en: ' + email);
        soonForm.hidden = true;
        document.getElementById('soonOk').hidden = false;
      });

      if (window.NuvoraI18n) window.NuvoraI18n.set(window.NuvoraI18n.lang());
      return;
    }

    var CATEGORY = {
      colchon:  { page: 'colchones.html', label: 'Colchones' },
      canape:   { page: 'canapes.html',   label: 'Canapés' },
      almohada: { page: 'almohadas.html', label: 'Almohadas' }
    };
    var cat = CATEGORY[product.type] || CATEGORY.colchon;
    var catalogPage  = cat.page;
    var catalogLabel = cat.label;
    /* La medida puede venir en la URL (?m=…&size=…): así los anuncios de
       Google Shopping y los enlaces compartidos abren la ficha con la
       medida y el precio que se anunciaron. */
    var selectedSize = product.defaultSize || 0;
    var sizeParam = parseInt(getParam('size'), 10);
    if (!isNaN(sizeParam) && product.sizes[sizeParam]) selectedSize = sizeParam;

    document.title = product.name + ' | Nuvora Descanso';
    setSeo(product, id);

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

    /* — Mouth Tape: bolsa 3D flotante en lugar de la imagen plana — */
    if (product.box3d) {
      var mainBox = document.querySelector('.pdp__main');
      if (mainBox) {
        var cutSrc = product.cutImg || product.images[0];
        var bagLayers = '';
        for (var bl = 0; bl < 7; bl++) {
          bagLayers += '<img class="mtbag__layer" src="' + cutSrc + '" alt="" draggable="false">';
        }
        mainBox.classList.add('pdp__main--3d');
        mainBox.innerHTML =
          '<div class="mtbag" role="img" aria-label="Bolsa de Mouth Tape Nuvora flotando en 3D">' +
            '<div class="mtbag__stage">' +
              '<div class="mtbag__sway">' +
                bagLayers +
                '<div class="mtbag__sheen" style="-webkit-mask-image:url(' + cutSrc + ');mask-image:url(' + cutSrc + ')"></div>' +
              '</div>' +
            '</div>' +
          '</div>';
      }
      if (thumbsEl) thumbsEl.style.display = 'none';
    }

    /* — Info — */
    document.getElementById('pdpType').textContent = product.typeLabel;
    document.getElementById('pdpName').textContent = product.name;
    document.getElementById('pdpDesc').textContent = product.desc;

    /* — Medidas + precio — */
    var priceEl = document.getElementById('pdpPrice');
    var sizesEl = document.getElementById('pdpSizes');

    var shownPrice = product.sizes[selectedSize].price;
    function renderPrice(animate) {
      var price = product.sizes[selectedSize].price;
      if (animate) {
        tweenNumber(shownPrice, price, 420, function (v) {
          priceEl.textContent = formatPrice(v);
        });
      } else {
        priceEl.textContent = formatPrice(price);
      }
      shownPrice = price;

      /* Comparativa con el precio de tienda física (−35 %) */
      var wasEl = document.getElementById('pdpWas');
      var offEl = document.getElementById('pdpOff');
      var cmpEl = document.getElementById('pdpCompareNote');
      var showCompare = product.compare !== false && !product.comingSoon;
      if (wasEl && offEl) {
        wasEl.hidden = !showCompare;
        offEl.hidden = !showCompare;
        if (showCompare) {
          wasEl.textContent = formatPrice(storePrice(price));
          offEl.textContent = '−' + Math.round(STORE_DISCOUNT * 100) + ' %';
        }
      }
      if (cmpEl) cmpEl.hidden = !showCompare;

      /* Coste por noche durante la garantía: reencuadra el precio */
      var perEl = document.getElementById('pdpPerNight');
      if (perEl) {
        if (product.type === 'almohada') {
          perEl.innerHTML = 'Con <strong>30 noches de prueba</strong>: si no es la tuya, la recogemos gratis';
        } else if (product.type === 'canape') {
          perEl.innerHTML = 'Hasta <strong>1.000 litros de almacenaje</strong> bajo la cama';
        } else {
          var years = 5;
          var perNight = (price / (years * 365)).toFixed(2).replace('.', ',');
          perEl.innerHTML = 'Sale a <strong>' + perNight + ' € por noche</strong> durante los ' +
            years + ' años de garantía';
        }
      }

      var bbPrice = document.getElementById('buyBarPrice');
      if (bbPrice) bbPrice.textContent = formatPrice(price);
    }

    /* — Variantes del mismo modelo —
       Con `swatch` se pinta la muestra de color (acabados del canapé);
       sin él, solo la etiqueta (núcleo del colchón). Al elegir otra
       se abre su ficha. */
    (function () {
      var wrap = document.getElementById('pdpVariants');
      if (!wrap || !product.variants || product.variants.length < 2) return;
      wrap.hidden = false;
      var rotulo = product.variantLabel || 'Elige tu acabado';
      var labelEl = document.getElementById('pdpVariantLabel');
      if (labelEl) labelEl.textContent = rotulo;
      var nameEl = document.getElementById('pdpVariantName');
      if (nameEl) nameEl.textContent = product.variantName || product.color || '';
      var box = document.getElementById('pdpSwatches');
      product.variants.forEach(function (v) {
        var current = v.id === id;
        var el = document.createElement(current ? 'span' : 'a');
        el.className = 'swatch' + (current ? ' is-active' : '') + (v.swatch ? '' : ' swatch--text');
        if (!current) el.setAttribute('href', 'producto.html?m=' + encodeURIComponent(v.id));
        el.setAttribute('title', v.label);
        el.setAttribute('aria-label', rotulo + ': ' + v.label);
        if (current) el.setAttribute('aria-current', 'true');
        el.innerHTML = (v.swatch ? '<span class="swatch__dot" style="background:' + v.swatch + '"></span>' : '') +
                       '<span class="swatch__label">' + esc(v.label) + '</span>';
        box.appendChild(el);
      });
    })();

    if (product.sizeUi === 'select') {
      /* Catálogos largos (el canapé tiene 30 medidas): un desplegable
         ocupa menos y se maneja mejor en móvil que 30 pastillas. */
      var sel = document.createElement('select');
      sel.className = 'size-select';
      sel.setAttribute('aria-label', 'Medida');
      product.sizes.forEach(function (s, i) {
        var opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = s.label + ' · ' + formatPrice(s.price);
        if (i === selectedSize) opt.selected = true;
        sel.appendChild(opt);
      });
      sel.addEventListener('change', function () {
        selectedSize = parseInt(sel.value, 10) || 0;
        renderPrice(true);
      });
      sizesEl.appendChild(sel);
    } else {
      product.sizes.forEach(function (s, i) {
        var b = document.createElement('button');
        b.className = 'size-pill' + (i === selectedSize ? ' is-active' : '');
        b.textContent = s.label;
        b.addEventListener('click', function () {
          selectedSize = i;
          sizesEl.querySelectorAll('.size-pill').forEach(function (p) { p.classList.remove('is-active'); });
          b.classList.add('is-active');
          /* "Pop" de la pastilla elegida */
          b.classList.remove('is-pop');
          void b.offsetWidth; /* reinicia la animación */
          b.classList.add('is-pop');
          renderPrice(true);
        });
        sizesEl.appendChild(b);
      });
    }
    renderPrice();

    /* — Comprar ahora → checkout directo — */
    function goCheckout() {
      window.location.href =
        'checkout.html?m=' + encodeURIComponent(id) + '&size=' + selectedSize;
    }
    document.getElementById('pdpBuy').addEventListener('click', goCheckout);

    /* — Añadir a la cesta — */
    function addCurrentToCart() {
      if (!window.NuvoraCart) return;
      window.NuvoraCart.add({
        id: id,
        name: product.name,
        type: product.type,
        sizeIdx: selectedSize,
        sizeLabel: product.sizes[selectedSize].label,
        price: product.sizes[selectedSize].price,
        img: product.images[0]
      });
    }
    var addBtn = document.getElementById('pdpAddCart');
    if (addBtn && window.NuvoraCart) {
      addBtn.addEventListener('click', addCurrentToCart);
    }

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

    /* — Colchón, canapé y almohada: aviso de ahorro con el pack — */
    if (product.type === 'colchon' || product.type === 'canape' || product.type === 'almohada') {
      var buyWrap = document.querySelector('.pdp__buy');
      if (buyWrap) {
        var packNote = document.createElement('div');
        packNote.className = 'pdp__gift';
        packNote.innerHTML =
          '<svg class="pdp__gift-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M21 8H3v12h18zM3 8l2-4h14l2 4M12 4v16"/>' +
          '</svg>' +
          '<span class="pdp__gift-text"><strong>Combina y ahorra un 12 %:</strong> ' +
          'llévate este producto dentro de un <a href="packs.html">pack de descanso</a> ' +
          '(colchón + canapé + almohada) y paga menos que comprándolos por separado.</span>';
        buyWrap.parentNode.insertBefore(packNote, buyWrap.nextSibling);
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

    /* — Journey: almohadas — */
    if (product.type === 'almohada') {
      var pj2 = document.getElementById('journeyStep2When');
      if (pj2) pj2.textContent = 'Días 3–5';
      var pj4 = document.getElementById('journeyStep4');
      if (pj4) {
        pj4.querySelector('.journey__when').textContent = 'Cada semana';
        pj4.querySelector('.journey__what').textContent = 'Funda lavable';
        pj4.querySelector('.journey__how').textContent  = 'Desenfunda con la cremallera y lávala a 30 °C. El núcleo, ni tocarlo.';
      }
      var pt3 = document.getElementById('trustYears');
      if (pt3) pt3.querySelector('strong').textContent = '2 años';
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
      if (img.indexOf('http') !== 0) img = 'https://nuvoradescanso.com/' + img;
      var ld = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'description': product.desc,
        'image': img,
        'brand': { '@type': 'Brand', 'name': 'Nuvora Descanso' },
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'EUR',
          'lowPrice': String(Math.min.apply(null, prices)),
          'highPrice': String(Math.max.apply(null, prices)),
          'availability': 'https://schema.org/InStock',
          'url': 'https://nuvoradescanso.com/producto.html?m=' + id
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

      /* Proyección oblicua: cara superior + frente + lateral por capa.
         Menos profundidad = proporción de colchón real, no de tablero. */
      var W = 340, DX = 54, DY = 26, PAD = 12;
      var sumT = 0;
      cw.layers.forEach(function (l) { sumT += l.t; });
      /* Al explotar: hueco normal entre capas, hueco grande entre grupos */
      var offsets = [], acc = 0;
      cw.layers.forEach(function (l, i) {
        if (i > 0) acc += (l.group !== cw.layers[i - 1].group) ? 30 : 13;
        offsets.push(acc);
      });
      var vbW = W + DX + PAD * 2;
      var vbH = DY + sumT + acc + PAD * 2 + 16;

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
          '<path d="M0 0H7M0 0V7" stroke="rgba(20,30,60,0.28)" stroke-width="0.8"/>' +
        '</pattern>' +
        '<linearGradient id="cw-sheen" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="rgba(255,255,255,0.28)"/>' +
          '<stop offset="0.65" stop-color="rgba(255,255,255,0)"/>' +
        '</linearGradient>' +
        '<filter id="cw-blur" x="-50%" y="-50%" width="200%" height="200%">' +
          '<feGaussianBlur stdDeviation="6"/>' +
        '</filter>';
      svg.appendChild(defs);

      /* Sombra de apoyo bajo la pila */
      var shadow = document.createElementNS(NS, 'ellipse');
      shadow.setAttribute('cx', PAD + (W + DX) / 2);
      shadow.setAttribute('cy', vbH - 10);
      shadow.setAttribute('rx', (W + DX) / 2.1);
      shadow.setAttribute('ry', 8);
      shadow.setAttribute('fill', 'rgba(0,0,0,0.32)');
      shadow.setAttribute('filter', 'url(#cw-blur)');
      svg.appendChild(shadow);

      var stageEl  = document.getElementById('cutawayStage');
      var labelsEl = document.getElementById('cutawayLabels');
      /* Las capas van en su propio grupo: así, en los colchones de doble
         cara, se voltean ellas y la sombra del suelo se queda abajo. */
      var pile = document.createElementNS(NS, 'g');
      pile.setAttribute('class', 'cutaway__pile');
      svg.appendChild(pile);
      var slabs = [], labels = [], blocks = [];
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
        var topPts = [[x, y], [x + DX, y - DY], [x + DX + W, y - DY], [x + W, y]];
        poly(topPts, shade(l.color, 0.28));
        if (l.tex) poly(topPts, 'url(#cwp-' + l.tex + ')'); /* la textura también en la cara visible */

        var front = document.createElementNS(NS, 'rect');
        front.setAttribute('x', x);
        front.setAttribute('y', y);
        front.setAttribute('width', W);
        front.setAttribute('height', l.t);
        front.setAttribute('rx', '2.5');
        front.setAttribute('fill', l.color);
        front.setAttribute('stroke', 'rgba(10,17,40,0.14)');
        front.setAttribute('stroke-width', '0.6');
        slab.appendChild(front);

        var sheen = document.createElementNS(NS, 'rect');
        sheen.setAttribute('x', x);
        sheen.setAttribute('y', y);
        sheen.setAttribute('width', W);
        sheen.setAttribute('height', l.t);
        sheen.setAttribute('rx', '2.5');
        sheen.setAttribute('fill', 'url(#cw-sheen)');
        slab.appendChild(sheen);

        if (l.tex) {
          var texRect = document.createElementNS(NS, 'rect');
          texRect.setAttribute('x', x);
          texRect.setAttribute('y', y);
          texRect.setAttribute('width', W);
          texRect.setAttribute('height', l.t);
          texRect.setAttribute('rx', '2.5');
          texRect.setAttribute('fill', 'url(#cwp-' + l.tex + ')');
          slab.appendChild(texRect);
        }
        poly([[x + W, y], [x + W + DX, y - DY], [x + W + DX, y + l.t - DY], [x + W, y + l.t]], shade(l.color, -0.22));

        pile.appendChild(slab);
        slabs.push(slab);
        y += l.t;

        if (l.group !== lastGroup) {
          var gh = document.createElement('li');
          gh.className = 'cutaway__group';
          gh.textContent = l.group;
          labelsEl.appendChild(gh);
          lastGroup = l.group;
          blocks.push({ header: gh, items: [] });
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
        blocks[blocks.length - 1].items.push(li);
      });

      /* Al voltear no basta con invertir la lista entera: el título de
         cada bloque tiene que seguir encima de sus capas. Se invierte el
         orden de los bloques y el de las capas dentro de cada uno. */
      function setLabelOrder(flipped) {
        var pos = 0;
        var bs = flipped ? blocks.slice().reverse() : blocks;
        bs.forEach(function (b) {
          b.header.style.order = pos++;
          var its = flipped ? b.items.slice().reverse() : b.items;
          its.forEach(function (it) { it.style.order = pos++; });
        });
      }
      setLabelOrder(false);

      stageEl.appendChild(svg);

      /* Las capas se separan al entrar la sección en pantalla */
      function setExploded(on) {
        slabs.forEach(function (slab, i) {
          slab.style.transitionDelay = (i * 55) + 'ms';
          slab.style.transform = on ? 'translateY(' + offsets[i] + 'px)' : 'translateY(0)';
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

      /* Hover sincronizado capa ↔ etiqueta, con estación seleccionable */
      var currentSeason = null;

      function applySeason() {
        if (!currentSeason) {
          stageEl.classList.remove('has-active');
          slabs.forEach(function (s) { s.classList.remove('is-active'); });
          labels.forEach(function (l) { l.classList.remove('is-active'); });
          return;
        }
        stageEl.classList.add('has-active');
        cw.layers.forEach(function (l, i) {
          var on = l.group === currentSeason;
          slabs[i].classList.toggle('is-active', on);
          labels[i].classList.toggle('is-active', on);
        });
      }

      function setActive(i, on) {
        if (!on) { applySeason(); return; }
        stageEl.classList.add('has-active');
        slabs.forEach(function (s) { s.classList.remove('is-active'); });
        labels.forEach(function (l) { l.classList.remove('is-active'); });
        slabs[i].classList.add('is-active');
        labels[i].classList.add('is-active');
      }
      slabs.concat(labels).forEach(function (el) {
        el.addEventListener('mouseenter', function () {
          setActive(parseInt(el.getAttribute('data-i'), 10), true);
        });
        el.addEventListener('mouseleave', function () { setActive(-1, false); });
      });

      /* — Colchones de doble cara: selector de estación —
         Al elegir la cara de verano el dibujo se voltea, igual que
         harías con el colchón en casa, y las etiquetas se invierten. */
      var seasonsEl = document.getElementById('cutawaySeasons');
      if (seasonsEl && cw.seasons && cw.seasons.length) {
        seasonsEl.hidden = false;
        var noteEl = document.getElementById('cutawaySeasonNote');
        cw.seasons.forEach(function (s, i) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'cutaway__season' + (i === 0 ? ' is-active' : '');
          b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
          b.textContent = s.label;
          b.addEventListener('click', function () {
            seasonsEl.querySelectorAll('.cutaway__season').forEach(function (o) {
              o.classList.remove('is-active');
              o.setAttribute('aria-pressed', 'false');
            });
            b.classList.add('is-active');
            b.setAttribute('aria-pressed', 'true');
            currentSeason = s.key;
            var voltear = cw.flipOn === s.key;
            stageEl.classList.toggle('is-flipped', voltear);
            setLabelOrder(voltear);
            if (noteEl) noteEl.textContent = s.note || '';
            applySeason();
          });
          seasonsEl.appendChild(b);
        });
        /* Arranca en la primera cara, resaltada */
        currentSeason = cw.seasons[0].key;
        if (noteEl) noteEl.textContent = cw.seasons[0].note || '';
        applySeason();
      }
    })();

    /* — Experiencia inmersiva: cine de scroll con hotspots — */
    (function () {
      var xp = product.experience;
      var section = document.getElementById('pdpXp');
      if (!section || !xp) return;
      section.hidden = false;

      var n = xp.scenes.length;
      var html = '<div class="xp__sticky"><div class="xp__stage">';
      xp.scenes.forEach(function (sc, i) {
        html += '<figure class="xp__scene" data-i="' + i + '">' +
          '<img src="' + sc.img + '" alt="' + sc.alt + '"' + (i > 0 ? ' loading="lazy"' : '') + '>';
        sc.hotspots.forEach(function (h, j) {
          html += '<button type="button" class="xp__spot" style="left:' + h.x + '%;top:' + h.y + '%" ' +
            'data-s="' + i + '" data-h="' + j + '" aria-label="' + h.title + '"><span></span></button>';
        });
        html += '</figure>';
      });
      html += '</div>' +
        '<div class="xp__caption" id="xpCaption">' +
          '<span class="xp__kicker"></span>' +
          '<h2 class="xp__title"></h2>' +
          '<p class="xp__text"></p>' +
          '<button type="button" class="xp__cta" id="xpCta"></button>' +
        '</div>' +
        '<div class="xp__rail">' +
          xp.scenes.map(function (_, i) { return '<span class="xp__dot" data-i="' + i + '"></span>'; }).join('') +
        '</div>' +
        '<div class="xp__hint" id="xpHint">Sigue bajando' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>' +
        '</div>' +
        '<div class="xp__card" id="xpCard" hidden>' +
          '<button class="xp__card-close" type="button" aria-label="Cerrar">&#10005;</button>' +
          '<h3></h3><p></p>' +
        '</div>';
      section.innerHTML = html;

      var scenes  = section.querySelectorAll('.xp__scene');
      var imgs    = section.querySelectorAll('.xp__scene img');
      var dots    = section.querySelectorAll('.xp__dot');
      var caption = document.getElementById('xpCaption');
      var hint    = document.getElementById('xpHint');
      var card    = document.getElementById('xpCard');
      var stage   = section.querySelector('.xp__stage');
      var current = -1;

      function setCaption(i) {
        var sc = xp.scenes[i];
        caption.classList.remove('is-swap');
        void caption.offsetWidth; /* reinicia la animación */
        caption.querySelector('.xp__kicker').textContent = sc.kicker;
        caption.querySelector('.xp__title').innerHTML = sc.title;
        caption.querySelector('.xp__text').textContent = sc.text;
        var cta = document.getElementById('xpCta');
        if (sc.cta) { cta.textContent = sc.cta; caption.classList.add('has-cta'); }
        else caption.classList.remove('has-cta');
        caption.classList.add('is-swap');
        dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
        card.hidden = true;
      }

      document.getElementById('xpCta').addEventListener('click', addCurrentToCart);

      function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

      function update() {
        var rect = section.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height - vh;
        var prog = clamp(-rect.top / total, 0, 1);
        if (hint) hint.classList.toggle('is-gone', prog > 0.02);

        var seg = 1 / n;
        scenes.forEach(function (scene, i) {
          var start = i * seg, end = start + seg;
          var op;
          if (i === 0 && prog <= start) op = 1;
          else if (i === n - 1 && prog >= end) op = 1;
          else {
            var fadeIn  = clamp((prog - (start - 0.07)) / 0.07, 0, 1);
            var fadeOut = clamp(((end + 0.07) - prog) / 0.07, 0, 1);
            op = Math.min(fadeIn, fadeOut);
          }
          scene.style.opacity = op;
          scene.style.zIndex = op > 0.5 ? 2 : 1;
          /* Ken Burns: zoom lento dentro de su tramo */
          var local = clamp((prog - start) / seg, 0, 1);
          imgs[i].style.transform = 'scale(' + (1.12 - 0.12 * local) + ')';
        });

        var idx = clamp(Math.floor(prog * n), 0, n - 1);
        if (idx !== current) { current = idx; setCaption(idx); }
      }

      var ticking = false;
      function onScroll() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(function () { update(); ticking = false; });
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update();

      /* Parallax sutil con el ratón */
      if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
        section.addEventListener('mousemove', function (e) {
          var r = section.getBoundingClientRect();
          var mx = (e.clientX / window.innerWidth - 0.5) * 14;
          var my = (e.clientY / window.innerHeight - 0.5) * 8;
          stage.style.transform = 'translate(' + (-mx) + 'px,' + (-my) + 'px) scale(1.02)';
        });
        section.addEventListener('mouseleave', function () {
          stage.style.transform = '';
        });
      }

      /* Hotspots → tarjeta de especificación */
      section.querySelectorAll('.xp__spot').forEach(function (spot) {
        spot.addEventListener('click', function (e) {
          e.stopPropagation();
          var h = xp.scenes[+spot.getAttribute('data-s')].hotspots[+spot.getAttribute('data-h')];
          card.querySelector('h3').textContent = h.title;
          card.querySelector('p').textContent = h.text;
          card.hidden = false;
        });
      });
      card.querySelector('.xp__card-close').addEventListener('click', function () {
        card.hidden = true;
      });
      section.addEventListener('click', function (e) {
        if (!card.hidden && !card.contains(e.target)) card.hidden = true;
      });
    })();
  })();

  /* ══════════════════════════════════════════════
     CHECKOUT  (checkout.html?m=...&size=...)
     ══════════════════════════════════════════════ */
  (function () {
    var form = document.getElementById('chkForm');
    if (!form) return;

    /* — Construir las líneas del pedido —
       Modo compra directa: checkout.html?m=<id>&size=<i>
       Modo cesta: sin parámetros → lee de NuvoraCart */
    var lines = [];
    var fromCart = false;
    var directId = getParam('m');

    if (directId && CATALOG[directId]) {
      var p = CATALOG[directId];
      var sIdx = parseInt(getParam('size') || String(p.defaultSize || 0), 10);
      if (isNaN(sIdx) || sIdx < 0 || sIdx >= p.sizes.length) sIdx = 0;
      lines.push({
        id: directId, name: p.name, type: p.type,
        sizeIdx: sIdx,
        sizeLabel: p.sizes[sIdx].label, price: p.sizes[sIdx].price,
        img: p.images[0], qty: 1
      });
    } else if (window.NuvoraCart && window.NuvoraCart.items.length) {
      fromCart = true;
      lines = window.NuvoraCart.items.map(function (it) {
        return {
          id: it.id, name: it.name, type: it.type,
          sizeIdx: it.sizeIdx || 0,
          sizeLabel: it.sizeLabel, price: it.price, img: it.img, qty: it.qty
        };
      });
    } else {
      window.location.replace('colchones.html');
      return;
    }

    var subtotal = lines.reduce(function (a, l) { return a + l.price * l.qty; }, 0);

    /* — Pintar resumen — */
    var itemsBox = document.getElementById('chkItems');
    var itemsHtml = '';
    lines.forEach(function (l) {
      itemsHtml +=
        '<div class="chk-item">' +
          '<div class="chk-item__img"><img src="' + esc(l.img) + '" alt=""></div>' +
          '<div>' +
            '<div class="chk-item__name">' + esc(l.name) + '</div>' +
            '<div class="chk-item__meta">' + esc(l.sizeLabel) +
              (l.qty > 1 ? ' · ' + l.qty + ' uds.' : '') + '</div>' +
          '</div>' +
          '<span class="chk-item__price">' + formatPrice(l.price * l.qty) + '</span>' +
        '</div>';
    });
    /* Pack de descanso: el pedido lleva colchón + canapé + almohada.
       El mismo cálculo se repite en el servidor (netlify/functions/_catalogo.js). */
    var packOn = isPackOrder(lines);
    if (packOn) {
      itemsHtml +=
        '<div class="chk-item chk-item--pack">' +
          '<div>' +
            '<div class="chk-item__name">Pack de descanso completo</div>' +
            '<div class="chk-item__meta">Colchón + canapé + almohada en el mismo pedido</div>' +
          '</div>' +
          '<span class="chk-gift-price">−' + Math.round(PACK_DISCOUNT * 100) + ' %</span>' +
        '</div>';
    }
    itemsBox.innerHTML = itemsHtml;

    /* — Descuentos: pack automático y cupón NUVORA10, no acumulables — */
    var couponApplied = false;
    function tt(k, fb) { return (window.NuvoraI18n && window.NuvoraI18n.t(k)) || fb; }
    function renderTotals() {
      var packAmount   = packOn ? subtotal * PACK_DISCOUNT : 0;
      var couponAmount = couponApplied ? subtotal * 0.10 : 0;
      /* Se aplica el mayor de los dos, nunca los dos a la vez */
      var discount = Math.round(Math.max(packAmount, couponAmount) * 100) / 100;
      var total = subtotal - discount;
      document.getElementById('chkSubtotal').textContent = formatPrice(subtotal);
      var dRow = document.getElementById('chkDiscountRow');
      if (dRow) {
        dRow.hidden = discount <= 0;
        if (discount > 0) {
          var label = dRow.querySelector('span');
          if (label) {
            if (packAmount >= couponAmount) {
              /* Etiqueta fija: no debe reescribirla el motor de idiomas */
              label.removeAttribute('data-i18n');
              label.textContent = 'Descuento pack (−' + Math.round(PACK_DISCOUNT * 100) + ' %)';
            } else {
              label.setAttribute('data-i18n', 'chk.discount');
              label.textContent = tt('chk.discount', 'Descuento');
            }
          }
          document.getElementById('chkDiscount').textContent = '−' + formatPrice(discount);
        }
      }
      document.getElementById('chkTotal').textContent = formatPrice(total);
    }
    renderTotals();

    var couponBtn = document.getElementById('chkCouponBtn');
    var couponInput = document.getElementById('chkCoupon');
    var couponMsg = document.getElementById('chkCouponMsg');
    if (couponBtn && couponInput) {
      couponBtn.addEventListener('click', function () {
        var code = couponInput.value.trim().toUpperCase();
        if (code === 'NUVORA10') {
          couponApplied = true;
          couponMsg.textContent = packOn
            ? 'Tu pedido ya tiene el −' + Math.round(PACK_DISCOUNT * 100) + ' % de pack, que es mayor. Los descuentos no se acumulan.'
            : tt('chk.coupon_ok', 'Código NUVORA10 aplicado: −10 %');
          couponMsg.className = 'chk-coupon__msg is-ok';
          couponInput.disabled = true;
          couponBtn.disabled = true;
        } else {
          couponApplied = false;
          couponMsg.textContent = tt('chk.coupon_bad', 'Código no válido');
          couponMsg.className = 'chk-coupon__msg is-bad';
        }
        renderTotals();
      });
      couponInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); couponBtn.click(); }
      });
    }

    /* Los datos de tarjeta se introducen en la pasarela de Stripe,
       no aquí: por eso esta página ya no valida ni formatea tarjetas. */

    /* — Consentimiento legal (obligatorio) — */
    var consentBox   = document.getElementById('chkLegal');
    var consentLabel = document.getElementById('chkConsent');
    if (consentBox) {
      consentBox.addEventListener('change', function () {
        if (consentBox.checked) consentLabel.classList.remove('has-error');
      });
    }

    /* — Validación — */
    function setError(input, on) {
      input.classList.toggle('is-invalid', on);
      var field = input.closest('.chk-field');
      if (field) field.classList.toggle('has-error', on);
      return !on;
    }

    function validate() {
      var ok = true;

      var email = document.getElementById('chkEmail');
      var emailVal = email.value.trim();

      /* Email es obligatorio */
      if (!emailVal) {
        ok = setError(email, true) && ok;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        ok = setError(email, true) && ok;
      } else {
        ok = setError(email, false) && ok;
      }

      /* Consentimiento legal obligatorio */
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

    /* — Envío del pedido a Stripe Checkout —
       El cliente NO introduce la tarjeta aquí: se le lleva a la página
       segura de Stripe. Nosotros solo mandamos QUÉ quiere comprar; el
       precio lo pone el servidor (netlify/functions/_catalogo.js). */
    function mostrarErrorPago(msg) {
      var caja = document.getElementById('chkPayError');
      if (!caja) {
        caja = document.createElement('p');
        caja.id = 'chkPayError';
        caja.className = 'chk-payerror';
        caja.setAttribute('role', 'alert');
        var btnBox = document.getElementById('chkSubmit');
        if (btnBox && btnBox.parentNode) btnBox.parentNode.insertBefore(caja, btnBox);
        else form.appendChild(caja);
      }
      caja.textContent = msg;
      caja.hidden = false;
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
      var errBox = document.getElementById('chkPayError');
      if (errBox) errBox.hidden = true;

      var emailEl = document.getElementById('chkEmail');

      fetch('/.netlify/functions/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map(function (l) {
            return { id: l.id, size: l.sizeIdx || 0, qty: l.qty || 1 };
          }),
          cupon: couponApplied ? 'NUVORA10' : '',
          email: emailEl ? emailEl.value.trim() : ''
        })
      })
      .then(function (r) {
        return r.json().then(function (d) {
          if (!r.ok) throw new Error(d.error || 'No se ha podido iniciar el pago.');
          return d;
        });
      })
      .then(function (d) {
        if (!d.url) throw new Error('Respuesta inesperada de la pasarela.');
        /* La cesta se vacía al volver de Stripe con el pago hecho
           (lo hace gracias.html), no antes: si cancela, la conserva. */
        window.location.href = d.url;
      })
      .catch(function (err) {
        btn.disabled = false;
        btn.classList.remove('is-loading');
        mostrarErrorPago(err.message || 'No se ha podido conectar con la pasarela de pago.');
      });
    });
  })();

});

