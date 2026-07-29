/* =============================================
   ESTADO DEL PEDIDO — Cliente puede ver dónde está
   =============================================
   GET /.netlify/functions/estado-pedido?ref=NUV-2026-12345
   Devuelve: {referencia, email, estado, items, total, fecha, estimado}

   Estados: pagado, preparando, enviado, entregado, cancelado
   ============================================= */

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'GET only' }) };
  }

  const ref = (event.queryStringParameters && event.queryStringParameters.ref) || '';

  if (!ref) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Falta parámetro: ref' }) };
  }

  /* En producción, esto vendría de una base de datos.
     Ahora simulamos con datos en memoria (se pierden al redeploy) */
  const PEDIDOS = {
    'NUV-2026-00001': {
      referencia: 'NUV-2026-00001',
      email: 'cliente@example.com',
      estado: 'enviado',
      items: ['Nuvora Aurea 110×200 cm'],
      total: '318,15 €',
      fecha: '2026-07-29',
      estimado: '2026-08-02',
      tracking: 'https://tracking.correos.es/...'
    }
  };

  const pedido = PEDIDOS[ref.toUpperCase()];

  if (!pedido) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Pedido no encontrado' })
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido)
  };
};
