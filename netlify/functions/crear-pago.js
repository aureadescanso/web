/* =============================================
   CREAR PAGO — genera la sesión de Stripe Checkout
   =============================================
   El navegador manda QUÉ quiere comprar (id + medida + cantidad).
   Los PRECIOS los pone este servidor desde _catalogo.js.

   Variable de entorno necesaria (Netlify → Environment variables):
     STRIPE_SECRET_KEY   sk_live_... (o sk_test_... para pruebas)
   ============================================= */

/* Se crea al usarse, no al cargar el archivo: así, si falta la clave,
   se responde con un mensaje claro en vez de reventar la función. */
function getStripe() {
  return require('stripe')(process.env.STRIPE_SECRET_KEY);
}
const { aCentimos, construirPedido } = require('./_catalogo');

const CORS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
};

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Falta STRIPE_SECRET_KEY en las variables de entorno');
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: 'La pasarela de pago no está configurada todavía.' })
    };
  }

  try {
    const datos = JSON.parse(event.body || '{}');
    const { lineas, hayColchon, cupon, codigoCupon } = construirPedido(datos.items, datos.cupon);

    /* Origen de la web, para las URLs de vuelta */
    const origen = process.env.URL || process.env.DEPLOY_PRIME_URL ||
                   (event.headers.origin || 'https://nuvoradescanso.com');

    /* Líneas de producto con el precio REAL del servidor */
    const line_items = lineas.map(function (l) {
      let precio = l.precio;
      let sufijo = '';
      if (cupon) {
        precio = precio * (1 - cupon.descuento);
        sufijo = ' · ' + cupon.etiqueta;
      }
      return {
        quantity: l.qty,
        price_data: {
          currency: 'eur',
          unit_amount: aCentimos(precio),
          product_data: {
            name: l.nombre,
            description: l.medida + sufijo,
            images: [origen + '/' + l.imagen]
          }
        }
      };
    });

    /* Regalo: Mouth Tape con cualquier colchón (a 0 €, para que se vea) */
    if (hayColchon) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: 0,
          product_data: {
            name: 'Mouth Tape Nuvora · 30 tiras',
            description: 'Regalo por tu colchón — valorado en 10 €'
          }
        }
      });
    }

    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: line_items,

      /* Los métodos de pago (tarjeta, Bizum...) son los que tengas
         activados en el panel de Stripe. Activa Bizum en:
         Stripe → Configuración → Métodos de pago. */

      locale: 'es',
      currency: 'eur',

      /* Datos que necesitas para enviar el pedido */
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['ES'] },
      phone_number_collection: { enabled: true },
      customer_email: datos.email || undefined,

      /* Envío gratuito a España peninsular */
      shipping_options: [{
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'eur' },
          display_name: 'Envío gratuito (3–5 días laborables)',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 5 }
          }
        }
      }],

      /* Referencia interna para localizar el pedido */
      client_reference_id: 'NUV-' + new Date().getFullYear() + '-' +
        Math.floor(10000 + Math.random() * 89999),

      metadata: {
        cupon: codigoCupon || '',
        resumen: lineas.map(function (l) {
          return l.nombre + ' (' + l.medida + ') x' + l.qty;
        }).join(' | ').slice(0, 480),
        regalo_mouth_tape: hayColchon ? 'si' : 'no'
      },

      /* Factura automática con los datos fiscales del cliente */
      invoice_creation: { enabled: true },

      success_url: origen + '/gracias.html?sid={CHECKOUT_SESSION_ID}',
      cancel_url: origen + '/checkout.html?cancelado=1'
    });

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ url: session.url }) };

  } catch (err) {
    console.error('Error al crear el pago:', err);
    /* Los errores de validación sí se le cuentan al cliente;
       los internos no, para no filtrar detalles. */
    const esValidacion = /Producto no disponible|Medida no válida|pedido está vacío|Demasiadas/.test(err.message || '');
    return {
      statusCode: esValidacion ? 400 : 500,
      headers: CORS,
      body: JSON.stringify({
        error: esValidacion ? err.message : 'No se ha podido iniciar el pago. Inténtalo de nuevo.'
      })
    };
  }
};
