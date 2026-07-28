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
    nombre: 'Nuvora Aurea',
    tipo: 'colchon',
    imagen: 'images/aurea-frontal.webp',
    medidas: [
      { label: '75 × 190 cm', precio: 228.78 },
      { label: '75 × 200 cm', precio: 240.22 },
      { label: '80 × 190 cm', precio: 240.83 },
      { label: '80 × 200 cm', precio: 252.88 },
      { label: '90 × 190 cm', precio: 253.52 },
      { label: '90 × 200 cm', precio: 266.20 },
      { label: '105 × 190 cm', precio: 288.57 },
      { label: '105 × 200 cm', precio: 303.01 },
      { label: '110 × 190 cm', precio: 303.01 },
      { label: '110 × 200 cm', precio: 318.15 },
      { label: '120 × 190 cm', precio: 333.30 },
      { label: '120 × 200 cm', precio: 349.96 },
      { label: '135 × 190 cm', precio: 356.15 },
      { label: '135 × 200 cm', precio: 373.96 },
      { label: '140 × 190 cm', precio: 373.96 },
      { label: '140 × 200 cm', precio: 392.65 },
      { label: '150 × 190 cm', precio: 389.43 },
      { label: '150 × 200 cm', precio: 408.91 },
      { label: '160 × 190 cm', precio: 428.52 },
      { label: '160 × 200 cm', precio: 449.96 },
      { label: '180 × 190 cm', precio: 477.99 },
      { label: '180 × 200 cm', precio: 492.78 },
      { label: '200 × 190 cm', precio: 524.87 },
      { label: '200 × 200 cm', precio: 541.10 }
    ]
  },
  'mouth-tape': {
    nombre: 'Mouth Tape Nuvora',
    tipo: 'accesorio',
    imagen: 'images/mouth-tape.webp',
    medidas: [{ label: 'Caja · 30 tiras', precio: 10 }]
  },
  'tiras-nasales': {
    nombre: 'Tiras Nasales Nuvora',
    tipo: 'accesorio',
    imagen: 'images/tiras-nasales.webp',
    medidas: [{ label: 'Caja · 30 tiras', precio: 10 }]
  }
  /* Canapés y Nuvora Serenity están en "Próximamente":
     no se pueden comprar, por eso no aparecen aquí. */
};

/* Cupones válidos (se validan en el servidor, no en el navegador) */
const CUPONES = {
  'NUVORA10': { descuento: 0.10, etiqueta: '−10 % (NUVORA10)' }
};

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
  let hayColchon = false;

  items.forEach(function (it) {
    const prod = CATALOGO[String(it.id || '')];
    if (!prod) throw new Error('Producto no disponible: ' + it.id);

    const idx = parseInt(it.size, 10) || 0;
    const medida = prod.medidas[idx];
    if (!medida) throw new Error('Medida no válida para ' + prod.nombre);

    let qty = parseInt(it.qty, 10) || 1;
    if (qty < 1) qty = 1;
    if (qty > 10) qty = 10;

    if (prod.tipo === 'colchon') hayColchon = true;

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

  return { lineas, hayColchon, cupon: cup, codigoCupon: cup ? codigo : null };
}

module.exports = { CATALOGO, CUPONES, aCentimos, construirPedido };
