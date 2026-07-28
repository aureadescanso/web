/* =============================================
   VERIFICAR PAGO — comprueba una sesión de Checkout
   =============================================
   La usa gracias.html para no dar por bueno un pedido
   solo porque alguien escriba la URL de la página.
   Devuelve lo mínimo: si está pagado y la referencia.
   ============================================= */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  const cabeceras = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  const sid = (event.queryStringParameters || {}).sid || '';

  if (!sid || !/^cs_[A-Za-z0-9_]+$/.test(sid)) {
    return { statusCode: 400, headers: cabeceras, body: JSON.stringify({ pagado: false }) };
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return { statusCode: 500, headers: cabeceras, body: JSON.stringify({ pagado: false }) };
  }

  try {
    const s = await stripe.checkout.sessions.retrieve(sid);
    const pagado = s.payment_status === 'paid' || s.payment_status === 'no_payment_required';
    return {
      statusCode: 200,
      headers: cabeceras,
      body: JSON.stringify({
        pagado: pagado,
        referencia: pagado ? (s.client_reference_id || '') : '',
        total: pagado ? (s.amount_total / 100).toFixed(2).replace('.', ',') + ' €' : '',
        email: pagado && s.customer_details ? s.customer_details.email : ''
      })
    };
  } catch (err) {
    console.error('No se pudo verificar la sesión:', err.message);
    return { statusCode: 200, headers: cabeceras, body: JSON.stringify({ pagado: false }) };
  }
};
