/* =============================================
   NUVORA DESCANSO — Página de pedido confirmado
   Comprueba contra la pasarela que el pago existe
   de verdad antes de dar el pedido por bueno.
   ============================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var cargando = document.getElementById('graciasLoading');
    var ok       = document.getElementById('graciasOk');
    var sinPago  = document.getElementById('graciasSinPago');
    if (!cargando || !ok || !sinPago) return;

    /* Solo puede verse un estado a la vez */
    function mostrar(el) {
      cargando.hidden = true;
      ok.hidden = true;
      sinPago.hidden = true;
      el.hidden = false;
    }

    var sid = new URLSearchParams(window.location.search).get('sid');
    if (!sid) { mostrar(sinPago); return; }

    fetch('/.netlify/functions/verificar-pago?sid=' + encodeURIComponent(sid))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.pagado) { mostrar(sinPago); return; }

        /* TikTok: compra completada. Se mide ANTES de vaciar la cesta,
           que es de donde salen las líneas y el importe. El correo lo
           confirma la pasarela, así que es el dato más fiable que
           podemos mandar para que TikTok atribuya la venta. */
        if (window.NuvoraTrack && window.NuvoraCart) {
          var correo = d.email || '';
          if (!correo) {
            try { correo = sessionStorage.getItem('nuvora_email') || ''; } catch (e) {}
          }
          var items = window.NuvoraCart.items || [];
          window.NuvoraTrack('CompletePayment', {
            contents: items.map(function (l) {
              return {
                content_id: l.id,
                content_type: 'product',
                content_name: l.name,
                price: l.price,
                quantity: l.qty || 1
              };
            }),
            value: Math.round(window.NuvoraCart.total() * 100) / 100,
            currency: 'EUR',
            email: correo
          });
          try { sessionStorage.removeItem('nuvora_email'); } catch (e) {}
        }

        /* Pago confirmado: se vacía la cesta (aquí, no antes de pagar) */
        if (window.NuvoraCart && window.NuvoraCart.clear) window.NuvoraCart.clear();

        if (d.referencia) {
          var ref = document.getElementById('graciasRef');
          ref.textContent = 'Pedido ' + d.referencia + (d.total ? ' · ' + d.total : '');
          ref.hidden = false;
        }
        if (d.email) {
          document.getElementById('graciasLead').textContent =
            'Hemos recibido tu pago correctamente. Te hemos enviado la confirmación y la factura a ' + d.email + '.';
        }
        mostrar(ok);

        /* La URL lleva el identificador de la sesión: se limpia para que
           no se comparta ni se quede en el historial. */
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, '', window.location.pathname);
        }
      })
      .catch(function () { mostrar(sinPago); });
  });
})();
