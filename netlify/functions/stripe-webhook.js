/* =============================================
   WEBHOOK DE STRIPE — confirma el cobro y avisa del pedido
   =============================================
   Stripe llama aquí cuando un pago se completa DE VERDAD.
   Es la única fuente fiable: no te fíes de que el cliente
   llegue a la página de "gracias" (puede cerrar el navegador).

   Variables de entorno (Netlify → Environment variables):
     STRIPE_SECRET_KEY      sk_live_...
     STRIPE_WEBHOOK_SECRET  whsec_...  (te lo da Stripe al crear el webhook)
     PEDIDOS_EMAIL          (opcional) a dónde mandar el aviso
     RESEND_API_KEY         (opcional) para enviar el email del pedido

   Sin RESEND_API_KEY el pedido queda registrado en el log de Netlify
   y en el panel de Stripe, que ya te envía su propio aviso por email.
   ============================================= */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método no permitido' };
  }

  const firma = event.headers['stripe-signature'];
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;

  let evt;
  try {
    if (!secreto) throw new Error('Falta STRIPE_WEBHOOK_SECRET');
    /* El cuerpo debe verificarse SIN parsear: si Netlify lo trae en
       base64, se decodifica antes. La firma evita avisos falsos. */
    const cuerpo = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64')
      : event.body;
    evt = stripe.webhooks.constructEvent(cuerpo, firma, secreto);
  } catch (err) {
    console.error('Firma de webhook no válida:', err.message);
    return { statusCode: 400, body: 'Firma no válida' };
  }

  if (evt.type !== 'checkout.session.completed') {
    return { statusCode: 200, body: 'ok' };
  }

  try {
    /* Se recuperan las líneas reales cobradas */
    const sesion = evt.data.object;
    const completa = await stripe.checkout.sessions.retrieve(sesion.id, {
      expand: ['line_items']
    });

    const envio = completa.collected_information
      ? completa.collected_information.shipping_details
      : completa.shipping_details;
    const dir = envio && envio.address ? envio.address : {};

    const pedido = {
      referencia: completa.client_reference_id || completa.id,
      total: (completa.amount_total / 100).toFixed(2) + ' €',
      email: completa.customer_details ? completa.customer_details.email : '',
      telefono: completa.customer_details ? completa.customer_details.phone : '',
      nombre: (envio && envio.name) || (completa.customer_details && completa.customer_details.name) || '',
      direccion: [dir.line1, dir.line2, dir.postal_code, dir.city, dir.state, dir.country]
        .filter(Boolean).join(', '),
      articulos: (completa.line_items && completa.line_items.data || []).map(function (li) {
        return li.quantity + ' × ' + li.description + ' — ' + (li.amount_total / 100).toFixed(2) + ' €';
      }),
      cupon: (completa.metadata && completa.metadata.cupon) || '(ninguno)'
    };

    /* Queda registrado siempre en los logs de Netlify */
    console.log('PEDIDO PAGADO:', JSON.stringify(pedido, null, 2));

    /* Aviso por email, si está configurado el servicio de envío */
    const destino = process.env.PEDIDOS_EMAIL || 'nuvoradescanso@gmail.com';
    if (process.env.RESEND_API_KEY) {
      const html =
        '<h2>Nuevo pedido ' + pedido.referencia + '</h2>' +
        '<p><strong>Total cobrado:</strong> ' + pedido.total + '</p>' +
        '<h3>Artículos</h3><ul><li>' + pedido.articulos.join('</li><li>') + '</li></ul>' +
        '<h3>Enviar a</h3>' +
        '<p><strong>' + pedido.nombre + '</strong><br>' + pedido.direccion + '</p>' +
        '<p>Email: ' + pedido.email + '<br>Teléfono: ' + (pedido.telefono || '—') + '</p>' +
        '<p>Cupón: ' + pedido.cupon + '</p>';

      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Nuvora <onboarding@resend.dev>',
          to: [destino],
          subject: 'Nuevo pedido ' + pedido.referencia + ' — ' + pedido.total,
          html: html
        })
      });
      if (!r.ok) console.error('No se pudo enviar el email:', await r.text());
    }

    return { statusCode: 200, body: 'ok' };

  } catch (err) {
    /* Se responde 200 igualmente: el cobro ya está hecho y no queremos
       que Stripe reintente en bucle. El fallo queda en el log. */
    console.error('Error procesando el pedido:', err);
    return { statusCode: 200, body: 'ok (con error interno)' };
  }
};
