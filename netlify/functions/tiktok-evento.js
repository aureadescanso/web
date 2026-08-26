/* =============================================
   EVENTS API DE TIKTOK — envío desde el servidor
   =============================================
   El píxel del navegador se pierde con bloqueadores de anuncios, con
   la protección de seguimiento de Safari y con parte del tráfico de
   iPhone. Esta función manda los mismos eventos desde el servidor, que
   no se bloquea, y añade la IP y el user-agent reales.

   DEDUPLICACIÓN: cada evento lleva un `event_id` que se genera en el
   navegador y se manda por los dos caminos, píxel y API. TikTok lo usa
   para contar una sola conversión cuando llegan las dos copias. Por eso
   el nombre del evento tiene que ser EL MISMO en js/tiktok.js y aquí.

   VARIABLE DE ENTORNO NECESARIA (Netlify → Environment variables):
     TIKTOK_ACCESS_TOKEN   el token que genera TikTok en
                           Herramientas → Eventos → tu píxel → Events API
   Sin esa variable la función responde 200 y no hace nada: así el
   navegador nunca ve un error por algo que no afecta a la compra.
   ============================================= */

const crypto = require('crypto');

const PIXEL_ID = 'DA7KU5JC77U208UL93F0';
const ENDPOINT = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

/* Solo estos eventos: la función es pública y no queremos que se pueda
   inventar cualquier cosa en la cuenta de anuncios. */
const EVENTOS = [
  'ViewContent', 'AddToCart', 'InitiateCheckout',
  'AddPaymentInfo', 'PlaceAnOrder', 'CompletePayment'
];

const CORS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
};

/* TikTok exige los datos personales en SHA-256, en minúsculas y sin
   espacios alrededor. */
function hash(v) {
  if (!v) return undefined;
  return crypto.createHash('sha256')
    .update(String(v).trim().toLowerCase())
    .digest('hex');
}

/* Teléfono: TikTok lo quiere en formato E.164 antes de cifrarlo */
function hashTelefono(v) {
  if (!v) return undefined;
  let t = String(v).replace(/[^\d+]/g, '');
  if (!t) return undefined;
  if (t[0] !== '+') t = '+34' + t.replace(/^0+/, '');  /* España por defecto */
  return crypto.createHash('sha256').update(t).digest('hex');
}

function numero(v, max) {
  const n = parseFloat(v);
  if (!isFinite(n) || n < 0 || n > max) return undefined;
  return Math.round(n * 100) / 100;
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Método no permitido' }) };
  }
  if (!process.env.TIKTOK_ACCESS_TOKEN) {
    /* Todavía sin token: no es un fallo del visitante */
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: false, motivo: 'sin_token' }) };
  }
  if ((event.body || '').length > 20000) {
    return { statusCode: 413, headers: CORS, body: JSON.stringify({ error: 'Cuerpo demasiado grande' }) };
  }

  try {
    const d = JSON.parse(event.body || '{}');

    if (EVENTOS.indexOf(d.event) === -1) {
      return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Evento no admitido' }) };
    }

    const h = event.headers || {};
    /* La IP real del visitante la pone Netlify en estas cabeceras */
    const ip = (h['x-nf-client-connection-ip'] ||
                (h['x-forwarded-for'] || '').split(',')[0] || '').trim();

    const contenidos = Array.isArray(d.contents) ? d.contents.slice(0, 20).map(function (c) {
      return {
        content_id: String(c.content_id || '').slice(0, 100),
        content_type: 'product',
        content_name: String(c.content_name || '').slice(0, 200),
        price: numero(c.price, 100000),
        quantity: Math.min(Math.max(parseInt(c.quantity, 10) || 1, 1), 50)
      };
    }) : [];

    const usuario = {
      ip: ip || undefined,
      user_agent: h['user-agent'] || undefined,
      ttp: d.ttp || undefined,          /* cookie _ttp del navegador */
      ttclid: d.ttclid || undefined,    /* id del clic en el anuncio */
      email: hash(d.email),
      phone: hashTelefono(d.phone),
      external_id: hash(d.external_id)
    };
    Object.keys(usuario).forEach(function (k) {
      if (usuario[k] === undefined) delete usuario[k];
    });

    const cuerpo = {
      event_source: 'web',
      event_source_id: PIXEL_ID,
      data: [{
        event: d.event,
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(d.event_id || '').slice(0, 100) || undefined,
        user: usuario,
        page: {
          url: String(d.url || '').slice(0, 1000) || undefined,
          referrer: String(d.referrer || '').slice(0, 1000) || undefined
        },
        properties: {
          currency: 'EUR',
          value: numero(d.value, 100000),
          contents: contenidos.length ? contenidos : undefined
        }
      }]
    };

    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Access-Token': process.env.TIKTOK_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cuerpo)
    });
    const respuesta = await r.json();

    /* TikTok responde 200 con code != 0 cuando algo no le cuadra */
    if (respuesta && respuesta.code !== 0) {
      console.error('TikTok Events API:', respuesta.code, respuesta.message);
    }

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ ok: respuesta.code === 0 })
    };

  } catch (err) {
    console.error('Error enviando el evento a TikTok:', err);
    /* Nunca se le devuelve un error al navegador: esto es medición,
       no puede entorpecer la navegación ni la compra. */
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: false }) };
  }
};
