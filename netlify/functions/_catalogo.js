/* =============================================
   CATÁLOGO DEL SERVIDOR — la única fuente de precios
   =============================================
   SEGURIDAD: el navegador solo dice QUÉ quiere comprar
   (id + índice de medida). El precio SIEMPRE sale de aquí.
   Nunca confiar en un importe enviado por el cliente:
   cualquiera podría manipularlo y pagar 0,01 €.

   Si cambias precios en js/shop.js, cámbialos también aquí.
   ============================================= */

const CATALOGO = {
  'aurea': {
    nombre: 'Nuvora Aurea Viscoelástico',
    tipo: 'colchon',
    imagen: 'images/aurea-frontal.webp',
    medidas: [
      { label: '75 × 190 cm', precio: 205.34 },
      { label: '75 × 200 cm', precio: 215.61 },
      { label: '80 × 190 cm', precio: 216.16 },
      { label: '80 × 200 cm', precio: 226.97 },
      { label: '90 × 190 cm', precio: 227.54 },
      { label: '90 × 200 cm', precio: 238.93 },
      { label: '105 × 190 cm', precio: 259.01 },
      { label: '105 × 200 cm', precio: 271.96 },
      { label: '110 × 190 cm', precio: 271.96 },
      { label: '110 × 200 cm', precio: 285.55 },
      { label: '120 × 190 cm', precio: 299.15 },
      { label: '120 × 200 cm', precio: 314.11 },
      { label: '135 × 190 cm', precio: 319.66 },
      { label: '135 × 200 cm', precio: 335.64 },
      { label: '140 × 190 cm', precio: 335.64 },
      { label: '140 × 200 cm', precio: 352.42 },
      { label: '150 × 190 cm', precio: 349.53 },
      { label: '150 × 200 cm', precio: 367.02 },
      { label: '160 × 190 cm', precio: 384.62 },
      { label: '160 × 200 cm', precio: 403.86 },
      { label: '180 × 190 cm', precio: 429.02 },
      { label: '180 × 200 cm', precio: 442.29 },
      { label: '200 × 190 cm', precio: 471.09 },
      { label: '200 × 200 cm', precio: 485.66 }
    ]
  },
  /* Las dos almohadas comparten núcleo, medidas y precio: solo cambia
     el tejido de la funda. Se dejan escritas por separado en vez de
     derivar una de otra porque este fichero es el que valida lo que se
     cobra, y aquí conviene que no haya nada calculado. */
  'almohada-nuvora': {
    nombre: 'Almohada viscoelástica Nuvora · Carbono activo',
    tipo: 'almohada',
    imagen: 'images/almohada-carbono.webp',
    medidas: [
      { label: '70 × 40 cm', precio: 44.90 },
      { label: '90 × 40 cm', precio: 54.90 },
      { label: '135 × 40 cm', precio: 64.90 },
      { label: '150 × 40 cm', precio: 69.90 }
    ]
  },
  'almohada-nuvora-tencel': {
    nombre: 'Almohada viscoelástica Nuvora · Tencel',
    tipo: 'almohada',
    imagen: 'images/almohada-tencel.webp',
    medidas: [
      { label: '70 × 40 cm', precio: 44.90 },
      { label: '90 × 40 cm', precio: 54.90 },
      { label: '135 × 40 cm', precio: 64.90 },
      { label: '150 × 40 cm', precio: 69.90 }
    ]
  }
  /* Los Complementos (Mouth Tape, Tiras Nasales) están desactivados
     temporalmente: no se pueden comprar, por eso no aparecen aquí. */
};

/* Nuvora Aurea con núcleo de muelles ensacados: mismas medidas que el
   viscoelástico y 39,33 € más cada una. Se calcula a partir de la tarifa
   del viscoelástico, igual que en js/shop.js, para que no se puedan
   desincronizar. */
const SUPLEMENTO_MUELLES = 39.33;
CATALOGO['aurea-muelles'] = {
  nombre: 'Nuvora Aurea Muelles Ensacados',
  tipo: 'colchon',
  imagen: 'images/aurea-frontal.webp',
  medidas: CATALOGO['aurea'].medidas.map(m => ({
    label: m.label,
    precio: Math.round((m.precio + SUPLEMENTO_MUELLES) * 100) / 100
  }))
};

/* Nuvora Supreme (gama alta, doble cara): 280 € más que el colchón más
   barato —el Aurea viscoelástico— en cada medida. Debe coincidir con
   SUPREME_EXTRA en js/shop.js. */
const SUPREME_EXTRA = 280;
CATALOGO['supreme'] = {
  nombre: 'Nuvora Supreme',
  tipo: 'colchon',
  imagen: 'images/supreme-frontal.webp',
  medidas: CATALOGO['aurea'].medidas.map(m => ({
    label: m.label,
    precio: Math.round((m.precio + SUPREME_EXTRA) * 100) / 100
  }))
};

/* Canapé abatible Nuvora: mismo modelo en tres acabados.
   Las medidas y los índices deben coincidir con js/shop.js. */
const CANAPE_MEDIDAS = [
  { label: '90 × 180 cm', precio: 300 },
  { label: '90 × 190 cm', precio: 300 },
  { label: '90 × 200 cm', precio: 315 },
  { label: '105 × 180 cm', precio: 305 },
  { label: '105 × 190 cm', precio: 305 },
  { label: '105 × 200 cm', precio: 325 },
  { label: '110 × 180 cm', precio: 320 },
  { label: '110 × 190 cm', precio: 320 },
  { label: '110 × 200 cm', precio: 335 },
  { label: '120 × 180 cm', precio: 320 },
  { label: '120 × 190 cm', precio: 320 },
  { label: '120 × 200 cm', precio: 335 },
  { label: '135 × 180 cm', precio: 335 },
  { label: '135 × 190 cm', precio: 335 },
  { label: '135 × 200 cm', precio: 355 },
  { label: '140 × 180 cm', precio: 335 },
  { label: '140 × 190 cm', precio: 335 },
  { label: '140 × 200 cm', precio: 350 },
  { label: '150 × 180 cm', precio: 345 },
  { label: '150 × 190 cm', precio: 345 },
  { label: '150 × 200 cm', precio: 360 },
  { label: '160 × 180 cm', precio: 355 },
  { label: '160 × 190 cm', precio: 355 },
  { label: '160 × 200 cm', precio: 375 },
  { label: '180 × 180 cm', precio: 595 },
  { label: '180 × 190 cm', precio: 595 },
  { label: '180 × 200 cm', precio: 615 },
  { label: '200 × 180 cm', precio: 610 },
  { label: '200 × 190 cm', precio: 610 },
  { label: '200 × 200 cm', precio: 630 }
];
[
  ['canape-nuvora-blanco', 'Blanco', 'blanco'],
  ['canape-nuvora-cambrian', 'Cambrian', 'cambrian'],
  ['canape-nuvora-wengue', 'Wengué', 'wengue']
].forEach(function ([id, color, archivo]) {
  CATALOGO[id] = {
    nombre: 'Canapé abatible Nuvora – ' + color,
    tipo: 'canape',
    imagen: 'images/canape-' + archivo + '.webp',
    medidas: CANAPE_MEDIDAS.map(m => ({ ...m }))
  };
});

/* Cupones válidos (se validan en el servidor, no en el navegador) */
const CUPONES = {
  'NUVORA10': { descuento: 0.10, etiqueta: '−10 % (NUVORA10)' }
};

/* Pack de descanso: colchón + canapé + almohada en el mismo pedido
   llevan un −12 % automático. No acumulable con cupón: se aplica el
   mayor de los dos. Debe coincidir con PACK_DISCOUNT en js/shop.js. */
const PACK = { descuento: 0.12, etiqueta: '−12 % (pack de descanso)' };

/* Convierte a céntimos, que es como Stripe maneja los importes */
function aCentimos(euros) {
  return Math.round(euros * 100);
}

/* Valida el pedido recibido y devuelve las líneas con precios reales.
   Lanza un error si algo no cuadra. */
function construirPedido(items, cupon) {
  if (!Array.isArray(items) || !items.length) {
    throw new Error('El pedido está vacío');
  }
  if (items.length > 20) {
    throw new Error('Demasiadas líneas en el pedido');
  }

  const lineas = [];
  const tipos = new Set();

  items.forEach(function (it) {
    const prod = CATALOGO[String(it.id || '')];
    if (!prod) throw new Error('Producto no disponible: ' + it.id);

    const idx = parseInt(it.size, 10) || 0;
    const medida = prod.medidas[idx];
    if (!medida) throw new Error('Medida no válida para ' + prod.nombre);

    let qty = parseInt(it.qty, 10) || 1;
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;

    tipos.add(prod.tipo);

    lineas.push({
      id: it.id,
      nombre: prod.nombre,
      medida: medida.label,
      imagen: prod.imagen,
      precio: medida.precio,
      qty: qty
    });
  });

  /* Cupón: solo si existe de verdad */
  const codigo = String(cupon || '').trim().toUpperCase();
  const cup = CUPONES[codigo] || null;

  /* Pack automático: colchón + canapé + almohada en el mismo pedido */
  const hayPack = tipos.has('colchon') && tipos.has('canape') && tipos.has('almohada');

  /* No acumulables: gana el descuento mayor */
  let descuento = null;
  if (hayPack && (!cup || PACK.descuento >= cup.descuento)) descuento = PACK;
  else if (cup) descuento = cup;

  return {
    lineas,
    hayPack,
    descuento,
    cupon: cup,
    codigoCupon: cup ? codigo : null
  };
}

module.exports = { CATALOGO, CUPONES, PACK, aCentimos, construirPedido };
