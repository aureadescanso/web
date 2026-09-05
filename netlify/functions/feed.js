/* =============================================
   FEED DE PRODUCTO — Google Merchant Center
   =============================================
   Devuelve el catálogo en el formato RSS 2.0 que espera Google
   Shopping. Se genera desde _catalogo.js, la misma fuente que usa el
   cobro, así que el precio del anuncio nunca puede diferir del que se
   cobra (motivo nº1 de suspensión de una cuenta de Merchant Center).

   Cada medida es una oferta con su propio id; todas las medidas de un
   mismo producto comparten `item_group_id` para que Google las agrupe
   como variantes en vez de tratarlas como productos duplicados.

   URL del feed:  https://nuvoradescanso.com/.netlify/functions/feed
   (en Merchant Center se da de alta como feed programado diario)

   PENDIENTE antes de publicar: Google exige un identificador de
   producto. Al ser fabricación propia sin código de barras, se envía
   `identifier_exists: no` + `mpn`. Si algún día hay GTIN/EAN, añadirlo.
   ============================================= */

const { CATALOGO } = require('./_catalogo');

const TIENDA = 'Nuvora Descanso';
const DOMINIO = process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://nuvoradescanso.com';

/* Categoría de Google por tipo de producto */
/* Dirección propia de cada producto. Tiene que coincidir con el mapa
   RUTAS de js/shop.js: si aquí apuntara a otro sitio, Merchant Center
   mandaría a los compradores a una página que no existe. */
const RUTAS = {
  'supreme':                '/colchones/nuvora-supreme',
  'aurea':                  '/colchones/nuvora-aurea',
  'aurea-muelles':          '/colchones/nuvora-aurea-muelles',
  'canape-nuvora-blanco':   '/canapes/canape-nuvora-blanco',
  'canape-nuvora-cambrian': '/canapes/canape-nuvora-cambrian',
  'canape-nuvora-wengue':   '/canapes/canape-nuvora-wengue',
  'almohada-nuvora':        '/almohadas/almohada-nuvora'
};

const CATEGORIA = {
  colchon:  '4437',  /* Muebles > Dormitorio > Colchones */
  canape:   '505764', /* Muebles > Dormitorio > Bases y somieres */
  almohada: '2take', /* se corrige abajo */
  accesorio: '569'
};
CATEGORIA.almohada = '2986'; /* Hogar y jardín > Ropa de cama > Almohadas */

/* Texto libre nuestro, para segmentar campañas */
const TIPO = {
  colchon: 'Descanso > Colchones',
  canape: 'Descanso > Canapés',
  almohada: 'Descanso > Almohadas',
  accesorio: 'Descanso > Complementos'
};

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c];
  });
}

/* Descripción corta y honesta por producto. Google rechaza las
   descripciones vacías y penaliza las que solo repiten el título. */
const DESCRIPCION = {
  'aurea': 'Colchón viscoelástico con núcleo HR de 28 kg/m³, 2 cm de viscoelástica adaptable y 30 cm de altura. Fabricado en España.',
  'aurea-muelles': 'Colchón con núcleo de muelles ensacados individualmente y acolchado de fibra hueca: independencia de lechos, mayor transpirabilidad y firmeza media-firme. Fabricado en España.',
  'supreme': 'Colchón de gama alta y doble cara: pura lana para el invierno y algodón natural para el verano, sobre carcasa de muelles ensacados de 18 cm con viscogel. Fabricado en España.',
  'almohada-nuvora': 'Almohada de viscoelástica perforada de 50 kg/m³, firmeza media y funda técnica desenfundable y lavable.',
  'canape-nuvora-blanco': 'Canapé abatible con acabado blanco, apertura asistida por pistones de gas y hasta 1.000 litros de almacenaje.',
  'canape-nuvora-cambrian': 'Canapé abatible con acabado cambrian tipo roble, apertura asistida por pistones de gas y hasta 1.000 litros de almacenaje.',
  'canape-nuvora-wengue': 'Canapé abatible con acabado wengué marrón oscuro, apertura asistida por pistones de gas y hasta 1.000 litros de almacenaje.'
};

function items() {
  const out = [];
  Object.keys(CATALOGO).forEach(function (id) {
    const p = CATALOGO[id];
    const desc = DESCRIPCION[id] || p.nombre;
    p.medidas.forEach(function (m, i) {
      out.push({
        id: id + '-' + i,
        grupo: id,
        titulo: p.nombre + ' ' + m.label,
        descripcion: desc + ' Medida ' + m.label + '.',
        /* El enlace abre la ficha con la medida anunciada ya elegida */
        enlace: DOMINIO + RUTAS[id] + '?size=' + i,
        /* Merchant Center no admite WebP: se sirve la copia JPEG */
        imagen: DOMINIO + '/images/feed/' + p.imagen.replace(/^images\//, '').replace(/\.webp$/, '.jpg'),
        precio: m.precio.toFixed(2) + ' EUR',
        categoria: CATEGORIA[p.tipo] || '',
        tipo: TIPO[p.tipo] || '',
        medida: m.label,
        mpn: (id + '-' + m.label).replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()
      });
    });
  });
  return out;
}

function xml() {
  const filas = items().map(function (it) {
    return '' +
      '    <item>\n' +
      '      <g:id>' + esc(it.id) + '</g:id>\n' +
      '      <g:item_group_id>' + esc(it.grupo) + '</g:item_group_id>\n' +
      '      <g:title>' + esc(it.titulo) + '</g:title>\n' +
      '      <g:description>' + esc(it.descripcion) + '</g:description>\n' +
      '      <g:link>' + esc(it.enlace) + '</g:link>\n' +
      '      <g:image_link>' + esc(it.imagen) + '</g:image_link>\n' +
      '      <g:availability>in_stock</g:availability>\n' +
      '      <g:condition>new</g:condition>\n' +
      '      <g:price>' + esc(it.precio) + '</g:price>\n' +
      '      <g:brand>' + esc(TIENDA) + '</g:brand>\n' +
      '      <g:mpn>' + esc(it.mpn) + '</g:mpn>\n' +
      '      <g:identifier_exists>no</g:identifier_exists>\n' +
      '      <g:google_product_category>' + esc(it.categoria) + '</g:google_product_category>\n' +
      '      <g:product_type>' + esc(it.tipo) + '</g:product_type>\n' +
      '      <g:size>' + esc(it.medida) + '</g:size>\n' +
      '      <g:shipping>\n' +
      '        <g:country>ES</g:country>\n' +
      '        <g:service>Envío gratuito (3–5 días)</g:service>\n' +
      '        <g:price>0.00 EUR</g:price>\n' +
      '      </g:shipping>\n' +
      '    </item>';
  }).join('\n');

  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n' +
    '  <channel>\n' +
    '    <title>' + esc(TIENDA) + '</title>\n' +
    '    <link>' + esc(DOMINIO) + '</link>\n' +
    '    <description>Colchones, canapés y almohadas fabricados en España.</description>\n' +
    filas + '\n' +
    '  </channel>\n' +
    '</rss>\n';
}

exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      /* Merchant Center lo descarga una vez al día: una hora de caché sobra */
      'Cache-Control': 'public, max-age=3600'
    },
    body: xml()
  };
};

/* Para poder generarlo también a mano: node netlify/functions/feed.js */
if (require.main === module) console.log(xml());
